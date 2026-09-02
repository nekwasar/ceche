"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BarChart3, Globe, Lock, Clock } from "lucide-react";

interface ModuleData {
  value: number | null;
  confidence: number;
  data: Record<string, any>;
  status: string;
}

interface AppraisalResult {
  domain: string;
  sld: string;
  tld: string;
  score: number;
  estimated_value?: number;
  range_low?: number;
  range_high?: number;
  confidence: string;
  completeness_ratio: number;
  weight_profile: string;
  modules: Record<string, ModuleData>;
}

interface AppraisalHistory {
  id: string;
  domain: string;
  score: number;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://77.67.23.30:8080";
const FREE_LIMIT = 3;
const SIGNED_LIMIT = 12;

function getScoreColor(score: number): string {
  if (score >= 80) return "#047857";
  if (score >= 60) return "#D97706";
  if (score >= 40) return "#EA580C";
  return "#DC2626";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Premium";
  if (score >= 60) return "Strong";
  if (score >= 40) return "Moderate";
  return "Developing";
}

export default function AppraisePage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [domain, setDomain] = useState(searchParams.get("domain") || "");
  const [result, setResult] = useState<AppraisalResult | null>(null);
  const [history, setHistory] = useState<AppraisalHistory[]>([]);
  const [isAppraising, setIsAppraising] = useState(false);
  const [error, setError] = useState("");
  const [freeUsed, setFreeUsed] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [modalPhase, setModalPhase] = useState<"limit" | "redirecting">("limit");
  const [devCode, setDevCode] = useState("");
  const [devBypass, setDevBypass] = useState(false);
  const [devToken, setDevToken] = useState<string | null>(null);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const secondTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const BYPASS_CODE = "Y2VjaGUtZGV2LWJ5cGFzcy0yMDI2";

  const handleDevCode = async () => {
    if (devCode === BYPASS_CODE) {
      try {
        const devEmail = `devtest${Date.now()}@ceche.net`;
        const regRes = await fetch(`${API_URL}/api/v1/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: devEmail, password: "DevTest1234!" }),
        });
        if (regRes.ok) {
          const regData = await regRes.json();
          setDevToken(regData.token);
        } else {
          const loginRes = await fetch(`${API_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "dev@ceche.net", password: "Dev1234!" }),
          });
          if (loginRes.ok) {
            const loginData = await loginRes.json();
            setDevToken(loginData.token);
          }
        }
      } catch { /* backend may be down */ }
      setDevBypass(true);
      setFreeUsed(0);
      localStorage.removeItem("ceche_free_appraisals");
    }
  };

  const effectiveToken = devBypass ? devToken : token;
  const isPremium = devBypass || (user?.plan === "starter" || user?.plan === "pro" || user?.plan === "enterprise");
  const dailyLimit = devBypass ? 999 : user ? SIGNED_LIMIT : FREE_LIMIT;
  const remaining = dailyLimit - freeUsed;

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("ceche_free_appraisals");
      const today = new Date().toDateString();
      if (stored) {
        const data = JSON.parse(stored);
        if (data.date === today) {
          setFreeUsed(data.count);
        } else {
          localStorage.setItem("ceche_free_appraisals", JSON.stringify({ date: today, count: 0 }));
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      fetchHistory();
    }
  }, [token]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/appraisals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.appraisals || []);
      }
    } catch { /* ignore */ }
  };

  const incrementFreeCount = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("ceche_free_appraisals");
    let count = 0;
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) count = data.count;
    }
    count += 1;
    localStorage.setItem("ceche_free_appraisals", JSON.stringify({ date: today, count }));
    setFreeUsed(count);
    return count;
  };

  const handleAppraise = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!devBypass && remaining <= 0) {
      setShowLimitModal(true);
      setModalPhase("limit");
      return;
    }

    setIsAppraising(true);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (effectiveToken) headers.Authorization = `Bearer ${effectiveToken}`;
      if (devBypass) headers["X-Dev-Bypass"] = "true";

      const endpoint = effectiveToken ? `${API_URL}/api/v1/appraise` : `${API_URL}/api/v1/appraise/public`;

      let res: Response;
      try {
        res = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify({ domain }) });
      } catch (fetchErr: any) {
        setError(`Connection failed: ${fetchErr.message}. Backend may not be running on ${API_URL}.`);
        return;
      }

      if (!res.ok) {
        let errBody: any;
        try { errBody = await res.json(); } catch {
          const text = await res.text();
          setError(`Server returned ${res.status} ${res.statusText}: ${text.slice(0, 200)}`);
          return;
        }
        const msg = errBody.error?.message || errBody.error || JSON.stringify(errBody);
        setError(`API error (${res.status}): ${msg}`);
        return;
      }

      let data: any;
      try { data = await res.json(); } catch (parseErr: any) {
        setError(`Failed to parse server response: ${parseErr.message}`);
        return;
      }

      setResult(data.metrics || data);

      if (!user && !devBypass) {
        const newCount = incrementFreeCount();
        if (newCount >= FREE_LIMIT) {
          setTimeout(() => setShowLimitModal(true), 1500);
        }
      } else if (token) {
        await fetchHistory();
      }
    } catch (err: any) {
      setError(`Unexpected error: ${err.message || String(err)}`);
    } finally {
      setIsAppraising(false);
    }
  };

  const handleLimitModalContinue = () => {
    setModalPhase("redirecting");
    secondTimer.current = setTimeout(() => { window.location.href = "/signup"; }, 2000);
  };

  const handleLimitModalClose = () => {
    if (redirectTimer.current) clearTimeout(redirectTimer.current);
    if (secondTimer.current) clearTimeout(secondTimer.current);
    setShowLimitModal(false);
    setModalPhase("limit");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F2" }}>
        <p style={{ color: "#999999" }}>Loading...</p>
      </div>
    );
  }

  const modules = result?.modules || {};
  const freeModules = [
    { name: "m2_tld_table", label: "TLD Premium Tier" },
    { name: "m3_length", label: "Domain Length" },
    { name: "m5_pronounceability", label: "Pronounceability" },
  ];
  const premiumModules = [
    { name: "m1_rdap", label: "Registration Data (RDAP)" },
    { name: "m4_word_count", label: "Word Count" },
    { name: "m6_segmenter", label: "Word Segmentation" },
    { name: "m7_keyword_popularity", label: "Keyword Popularity" },
    { name: "m8_cpc", label: "Commercial Intent (CPC)" },
    { name: "m9_search_results", label: "Search Results" },
    { name: "m10_cross_tld", label: "Cross-TLD Registration" },
    { name: "m11_trademark", label: "Trademark Check" },
    { name: "m12_authority", label: "Domain Authority" },
    { name: "m16_brandability", label: "Brandability Score" },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Input hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[10px] font-mono tracking-widest uppercase mb-4 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(158,42,43,0.08)", color: "#9E2A2B" }}>16-Dimension Engine</span>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: "#111111" }}>Domain Appraisal</h1>
          <p className="text-sm max-w-lg mx-auto mb-6" style={{ color: "#666666" }}>Get a comprehensive valuation using 16 analysis dimensions — RDAP data, TLD scoring, brandability, commercial intent, and more.</p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-medium" style={{ backgroundColor: devBypass ? "rgba(244,162,97,0.1)" : remaining > 0 ? "rgba(4,120,87,0.08)" : "rgba(220,38,38,0.08)", color: devBypass ? "#F4A261" : remaining > 0 ? "#047857" : "#DC2626" }}>
            <Clock className="w-3.5 h-3.5" />
            {devBypass ? <span>Dev mode — unlimited appraisals</span> : remaining > 0 ? <span>{remaining} free appraisal{remaining !== 1 ? "s" : ""} remaining today</span> : <span>No free appraisals left — <button onClick={() => setShowLimitModal(true)} className="font-bold underline cursor-pointer">create account</button></span>}
          </div>

          {!devBypass && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <input type="password" value={devCode} onChange={(e) => setDevCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleDevCode()} placeholder="Dev bypass code" className="px-3 py-1.5 rounded-lg text-[10px] font-mono border border-black/10 focus:outline-none focus:border-[#F4A261] w-48" style={{ backgroundColor: "#FFFFFF" }} />
              <button type="button" onClick={handleDevCode} className="px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all" style={{ backgroundColor: "#F4A261", color: "#111111" }}>Activate</button>
            </div>
          )}

          <form onSubmit={handleAppraise} className="flex gap-2 max-w-xl mx-auto">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#999999" }} />
              <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter domain (e.g. example.com)" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-black/10 focus:outline-none focus:border-[#9E2A2B] transition-colors" style={{ backgroundColor: "#FFFFFF" }} />
            </div>
            <button type="submit" disabled={isAppraising || !domain.trim()} className="px-6 py-3 rounded-xl text-sm font-bold transition-all shrink-0" style={{ backgroundColor: isAppraising || !domain.trim() ? "#E5E5E5" : "#9E2A2B", color: isAppraising || !domain.trim() ? "#999999" : "#FFFFFF", cursor: isAppraising || !domain.trim() ? "not-allowed" : "pointer" }}>
              {isAppraising ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Appraising...</span> : <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4" />Appraise</span>}
            </button>
          </form>
        </div>
      </section>

      {error && <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"><div className="p-4 rounded-xl text-sm" style={{ backgroundColor: "#FEE2E2", color: "#991B1B", border: "1px solid #FECACA" }}><p className="font-bold mb-1">Error</p><p className="text-xs font-mono leading-relaxed">{error}</p></div></div>}

      {result && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-6 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)" }}>
                <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "#999999" }}>Score</p>
                <p className="text-4xl font-black" style={{ color: getScoreColor(result.score) }}>{result.score}</p>
                <p className="text-xs font-medium" style={{ color: getScoreColor(result.score) }}>{getScoreLabel(result.score)}</p>
              </div>
              <div className="p-6 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)" }}>
                <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "#999999" }}>Estimated Value</p>
                {isPremium && result.estimated_value ? <p className="text-2xl font-bold" style={{ color: "#111111" }}>${result.estimated_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p> : <p className="text-2xl font-bold" style={{ color: "#CCCCCC" }}>$XX,XXX</p>}
                {isPremium && result.range_low && result.range_high && <p className="text-[10px] font-mono" style={{ color: "#999999" }}>${result.range_low.toLocaleString()} — ${result.range_high.toLocaleString()}</p>}
              </div>
              <div className="p-6 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)" }}>
                <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "#999999" }}>Confidence</p>
                <p className="text-lg font-bold" style={{ color: "#111111" }}>{result.confidence}</p>
                <p className="text-[10px] font-mono" style={{ color: "#999999" }}>{Math.round(result.completeness_ratio * 100)}% completeness</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden mb-8" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="px-5 py-3" style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.06)" }}><h2 className="text-sm font-bold" style={{ color: "#111111" }}>16-Dimension Analysis</h2></div>
              <div className="px-5 py-3" style={{ backgroundColor: "#FAF7F2" }}><p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#999999" }}>Free metrics</p></div>
              {freeModules.map(({ name, label }) => { const mod = modules[name] || { value: null, data: {}, status: "SKIPPED" }; const mult = mod.value; const multStr = mult !== null ? `${mult.toFixed(1)}x` : "N/A"; return (<div key={name} className="flex items-center justify-between px-5 py-2.5" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}><span className="text-xs" style={{ color: "#111111" }}>{label}</span><span className="text-xs font-mono" style={{ color: mult !== null && mult > 1 ? "#047857" : mult !== null && mult < 1 ? "#DC2626" : "#999999" }}>{multStr}</span></div>);})}
              <div className="px-5 py-3" style={{ backgroundColor: "#FAF7F2" }}><p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#999999" }}>Premium metrics</p></div>
              {isPremium ? premiumModules.map(({ name, label }) => { const mod = modules[name] || { value: null, data: {}, status: "SKIPPED" }; const mult = mod.value; const multStr = mult !== null ? `${mult.toFixed(1)}x` : "N/A"; return (<div key={name} className="flex items-center justify-between px-5 py-2.5" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}><span className="text-xs" style={{ color: "#111111" }}>{label}</span><span className="text-xs font-mono" style={{ color: mult !== null && mult > 1 ? "#047857" : mult !== null && mult < 1 ? "#DC2626" : "#999999" }}>{multStr}</span></div>);}) : <div className="px-5 py-8 text-center"><Lock className="w-6 h-6 mx-auto mb-2" style={{ color: "#9E2A2B" }} /><p className="text-xs mb-3" style={{ color: "#666666" }}>Subscribe to unlock premium metrics</p><a href="/pricing" className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: "#9E2A2B" }}>View pricing <ArrowRight className="w-3 h-3" /></a></div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl p-5" style={{ backgroundColor: "#111111" }}><p className="text-xs font-mono tracking-wider uppercase mb-1" style={{ color: "#F4A261" }}>Want WHOIS + DNS data?</p><p className="text-sm font-bold mb-3" style={{ color: "#FFFFFF" }}>Try Domain Lookup — free, no account required</p><a href="/tools/domain-lookup" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold" style={{ backgroundColor: "#F4A261", color: "#111111" }}>Domain Lookup <ArrowRight className="w-3.5 h-3.5" /></a></div>
              <div className="rounded-xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}><p className="text-xs font-mono tracking-wider uppercase mb-1" style={{ color: "#9E2A2B" }}>Want deeper analysis?</p><p className="text-sm font-bold mb-3" style={{ color: "#111111" }}>Get Extended Insights — backlinks, trademarks, comparables</p><a href="/tools/extended-insights" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold" style={{ backgroundColor: "#9E2A2B", color: "#FFFFFF" }}>Extended Insights <ArrowRight className="w-3.5 h-3.5" /></a></div>
            </div>
          </div>
        </section>
      )}

      {user && history.length > 0 && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] font-mono tracking-widest uppercase mb-3" style={{ color: "#999999" }}>Recent appraisals</p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
              {history.map((item) => (<div key={item.id} className="flex items-center justify-between px-5 py-3 cursor-pointer" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }} onClick={() => setDomain(item.domain)}><div><p className="text-sm font-medium" style={{ color: "#111111" }}>{item.domain}</p><p className="text-[10px] font-mono" style={{ color: "#999999" }}>{new Date(item.created_at).toLocaleDateString()}</p></div><div className="flex items-center gap-2"><span className="text-lg font-bold" style={{ color: getScoreColor(item.score) }}>{item.score}</span><span className="text-[10px] font-mono" style={{ color: getScoreColor(item.score) }}>{getScoreLabel(item.score)}</span></div></div>))}
            </div>
          </div>
        </section>
      )}

      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={(e) => { if (e.target === e.currentTarget) handleLimitModalClose(); }}>
          <div className="bg-white rounded-3xl p-10 md:p-14 max-w-2xl w-full text-center">
            {modalPhase === "limit" ? (<><div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "rgba(158,42,43,0.08)" }}><Lock className="w-8 h-8" style={{ color: "#9E2A2B" }} /></div><h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#111111" }}>Free appraisals used</h3><p className="text-base md:text-lg mb-8 max-w-md mx-auto" style={{ color: "#666666" }}>You&apos;ve used all {FREE_LIMIT} free appraisals today. Create a free account to get {SIGNED_LIMIT} appraisals per day.</p><button onClick={handleLimitModalContinue} className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold mb-6 cursor-pointer" style={{ backgroundColor: "#9E2A2B", color: "#FFFFFF" }}>Create free account <ArrowRight className="w-5 h-5" /></button><div><button onClick={handleLimitModalClose} className="text-sm underline" style={{ color: "#999999" }}>Go back</button></div></>) : (<><div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "rgba(158,42,43,0.08)" }}><div className="w-8 h-8 border-3 border-[#9E2A2B] border-t-transparent rounded-full animate-spin" /></div><h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#111111" }}>Redirecting...</h3><p className="text-base md:text-lg mb-6" style={{ color: "#666666" }}>Taking you to account creation.</p><button onClick={handleLimitModalClose} className="text-sm underline" style={{ color: "#999999" }}>Go back</button></>)}
          </div>
        </div>
      )}
    </main>
  );
}
