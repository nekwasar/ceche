"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BarChart3, Globe, Lock, Clock, Shield, Zap, TrendingUp, Eye } from "lucide-react";

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

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={8}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black" style={{ color }}>{score}</span>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>{getScoreLabel(score)}</span>
      </div>
    </div>
  );
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
  const allModules = [
    { name: "m1_rdap", label: "Registration Data (RDAP)", icon: <Shield className="w-4 h-4" /> },
    { name: "m2_tld_table", label: "TLD Premium Tier", icon: <Globe className="w-4 h-4" /> },
    { name: "m3_length", label: "Domain Length", icon: <Zap className="w-4 h-4" /> },
    { name: "m4_word_count", label: "Word Count", icon: <BarChart3 className="w-4 h-4" /> },
    { name: "m5_pronounceability", label: "Pronounceability", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "m6_segmenter", label: "Word Segmentation", icon: <Eye className="w-4 h-4" /> },
    { name: "m7_keyword_popularity", label: "Keyword Popularity", icon: <BarChart3 className="w-4 h-4" /> },
    { name: "m8_cpc", label: "Commercial Intent (CPC)", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "m9_search_results", label: "Search Results", icon: <Globe className="w-4 h-4" /> },
    { name: "m10_cross_tld", label: "Cross-TLD Registration", icon: <Globe className="w-4 h-4" /> },
    { name: "m11_trademark", label: "Trademark Check", icon: <Shield className="w-4 h-4" /> },
    { name: "m12_authority", label: "Domain Authority", icon: <Shield className="w-4 h-4" /> },
    { name: "m16_brandability", label: "Brandability Score", icon: <Star className="w-4 h-4" /> },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #9E2A2B 0%, #7A1F20 50%, #5C1818 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, #F4A261 0%, transparent 70%)" }} />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, #F4A261 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "rgba(244,162,97,0.15)", border: "1px solid rgba(244,162,97,0.3)" }}>
              <BarChart3 className="w-4 h-4" style={{ color: "#F4A261" }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: "#F4A261" }}>16-DIMENSION ENGINE</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Domain Appraisal
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Comprehensive valuation across RDAP data, TLD scoring, brandability, commercial intent, and 12 more dimensions.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleAppraise} className="max-w-2xl mx-auto">
            <div className="flex gap-3 p-2 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
              <div className="flex-1 relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "rgba(255,255,255,0.4)" }} />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter domain (e.g. techstart.com)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-sm font-medium outline-none"
                  style={{ backgroundColor: "#FFFFFF", color: "#111111" }}
                />
              </div>
              <button
                type="submit"
                disabled={isAppraising || !domain.trim()}
                className="px-8 py-4 rounded-xl text-sm font-bold transition-all shrink-0 flex items-center gap-2"
                style={{
                  backgroundColor: isAppraising || !domain.trim() ? "rgba(255,255,255,0.2)" : "#F4A261",
                  color: isAppraising || !domain.trim() ? "rgba(255,255,255,0.5)" : "#111111",
                  cursor: isAppraising || !domain.trim() ? "not-allowed" : "pointer",
                }}
              >
                {isAppraising ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4" />
                    Appraise
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Status Bar */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {devBypass ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: "rgba(244,162,97,0.15)" }}>
                <div className="w-2 h-2 rounded-full bg-[#F4A261] animate-pulse" />
                <span className="text-xs font-medium" style={{ color: "#F4A261" }}>Dev mode — unlimited</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{remaining} appraisal{remaining !== 1 ? "s" : ""} left today</span>
                </div>
                {!devBypass && (
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      value={devCode}
                      onChange={(e) => setDevCode(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleDevCode()}
                      placeholder="Dev bypass"
                      className="px-3 py-1.5 rounded-lg text-[10px] font-mono border border-white/20 focus:outline-none focus:border-[#F4A261] w-36"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}
                    />
                    <button
                      type="button"
                      onClick={handleDevCode}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-mono"
                      style={{ backgroundColor: "#F4A261", color: "#111111" }}
                    >
                      Activate
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: "#FEE2E2", color: "#991B1B", border: "1px solid #FECACA" }}>
            <p className="font-bold mb-1">Error</p>
            <p className="text-xs font-mono leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Score Header */}
            <div className="rounded-3xl p-8 md:p-10 mb-8" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreRing score={result.score} size={140} />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: "#111111" }}>{result.domain}</h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${getScoreColor(result.score)}15`, color: getScoreColor(result.score) }}>
                      {getScoreLabel(result.score)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "#F0EDE8", color: "#666666" }}>
                      {result.tld.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "#F0EDE8", color: "#666666" }}>
                      {result.confidence} confidence
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#999999" }}>
                    {Math.round(result.completeness_ratio * 100)}% completeness · {result.weight_profile} weight profile
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "#999999" }}>Estimated Value</p>
                  {isPremium && result.estimated_value ? (
                    <>
                      <p className="text-3xl font-black" style={{ color: "#111111" }}>
                        ${result.estimated_value.toLocaleString()}
                      </p>
                      {result.range_low && result.range_high && (
                        <p className="text-xs font-mono" style={{ color: "#999999" }}>
                          ${result.range_low.toLocaleString()} — ${result.range_high.toLocaleString()}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-3xl font-black" style={{ color: "#CCCCCC" }}>$—</p>
                  )}
                </div>
              </div>
            </div>

            {/* 16 Dimensions Grid */}
            <div className="rounded-3xl overflow-hidden mb-8" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "#111111" }}>
                <h3 className="text-sm font-bold text-white">16-Dimension Analysis</h3>
                {isPremium ? (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: "#047857", color: "#FFFFFF" }}>FULL ACCESS</span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: "rgba(244,162,97,0.2)", color: "#F4A261" }}>3 OF 16 UNLOCKED</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {allModules.map(({ name, label, icon }, idx) => {
                  const mod = modules[name] || { value: null, data: {}, status: "SKIPPED" };
                  const mult = mod.value;
                  const isLocked = !isPremium && idx >= 3;
                  const multStr = mult !== null ? `${mult.toFixed(1)}x` : "—";

                  return (
                    <div
                      key={name}
                      className="flex items-center justify-between px-5 py-4"
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.04)",
                        borderRight: (idx + 1) % 3 !== 0 ? "1px solid rgba(0,0,0,0.04)" : "none",
                        backgroundColor: isLocked ? "#F9F9F9" : "#FFFFFF",
                        opacity: isLocked ? 0.5 : 1,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: isLocked ? "#E5E7EB" : `${getScoreColor((mult || 0) * 20)}15`, color: isLocked ? "#999" : getScoreColor((mult || 0) * 20) }}>
                          {isLocked ? <Lock className="w-3.5 h-3.5" /> : icon}
                        </div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: isLocked ? "#999" : "#111111" }}>{label}</p>
                          {mult !== null && !isLocked && (
                            <p className="text-[10px] font-mono" style={{ color: mult > 1 ? "#047857" : mult < 1 ? "#DC2626" : "#999999" }}>
                              {mult > 1 ? "Above average" : mult < 1 ? "Below average" : "Average"}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-bold font-mono" style={{ color: isLocked ? "#CCC" : mult !== null ? "#111111" : "#999" }}>
                        {isLocked ? "—" : multStr}
                      </span>
                    </div>
                  );
                })}
              </div>

              {!isPremium && (
                <div className="px-6 py-5 text-center" style={{ backgroundColor: "#F9F9F9", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <p className="text-xs mb-3" style={{ color: "#666666" }}>Unlock all 13 remaining dimensions with a premium plan</p>
                  <a href="/pricing" className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: "#9E2A2B" }}>
                    View pricing <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#111111" }}>
                <p className="text-[10px] font-mono tracking-wider uppercase mb-2" style={{ color: "#F4A261" }}>Want WHOIS + DNS data?</p>
                <p className="text-sm font-bold mb-4" style={{ color: "#FFFFFF" }}>Try Domain Lookup — no account required</p>
                <a href="/tools/domain-lookup" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold" style={{ backgroundColor: "#F4A261", color: "#111111" }}>
                  Domain Lookup <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="rounded-2xl p-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-mono tracking-wider uppercase mb-2" style={{ color: "#9E2A2B" }}>Want deeper analysis?</p>
                <p className="text-sm font-bold mb-4" style={{ color: "#111111" }}>Extended Insights — backlinks, trademarks, comparables</p>
                <a href="/tools/extended-insights" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold" style={{ backgroundColor: "#9E2A2B", color: "#FFFFFF" }}>
                  Extended Insights <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* History */}
      {user && history.length > 0 && (
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: "#9E2A2B" }} />
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#999999" }}>Recent Appraisals</p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
              {history.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-[#F9F9F9] transition-colors"
                  style={{ borderBottom: i < history.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}
                  onClick={() => setDomain(item.domain)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getScoreColor(item.score)}10` }}>
                      <span className="text-sm font-bold" style={{ color: getScoreColor(item.score) }}>{item.score}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#111111" }}>{item.domain}</p>
                      <p className="text-[10px] font-mono" style={{ color: "#999999" }}>{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: getScoreColor(item.score) }}>{getScoreLabel(item.score)}</span>
                    <ArrowRight className="w-4 h-4" style={{ color: "#CCC" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={(e) => { if (e.target === e.currentTarget) handleLimitModalClose(); }}>
          <div className="bg-white rounded-3xl p-10 md:p-14 max-w-2xl w-full text-center">
            {modalPhase === "limit" ? (
              <>
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "rgba(158,42,43,0.08)" }}>
                  <Lock className="w-8 h-8" style={{ color: "#9E2A2B" }} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#111111" }}>Daily limit reached</h3>
                <p className="text-base md:text-lg mb-8 max-w-md mx-auto" style={{ color: "#666666" }}>
                  You&apos;ve used all {FREE_LIMIT} appraisals today. Create an account to get {SIGNED_LIMIT} per day.
                </p>
                <button onClick={handleLimitModalContinue} className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold mb-6 cursor-pointer" style={{ backgroundColor: "#9E2A2B", color: "#FFFFFF" }}>
                  Create account <ArrowRight className="w-5 h-5" />
                </button>
                <div>
                  <button onClick={handleLimitModalClose} className="text-sm underline" style={{ color: "#999999" }}>Go back</button>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "rgba(158,42,43,0.08)" }}>
                  <div className="w-8 h-8 border-3 border-[#9E2A2B] border-t-transparent rounded-full animate-spin" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#111111" }}>Redirecting...</h3>
                <p className="text-base md:text-lg mb-6" style={{ color: "#666666" }}>Taking you to account creation.</p>
                <button onClick={handleLimitModalClose} className="text-sm underline" style={{ color: "#999999" }}>Go back</button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
