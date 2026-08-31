"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Shield, Lock, Unlock, ArrowRight, BarChart3, Globe, TrendingUp } from "lucide-react";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  if (score >= 40) return "text-orange-600";
  return "text-red-600";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Premium";
  if (score >= 60) return "Strong";
  if (score >= 40) return "Moderate";
  return "Developing";
}

function PadlockOverlay({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">
        <div className="space-y-3 p-4">
          <div className="h-4 bg-canvas-dark rounded w-3/4"></div>
          <div className="h-4 bg-canvas-dark rounded w-1/2"></div>
          <div className="h-4 bg-canvas-dark rounded w-2/3"></div>
          <div className="h-4 bg-canvas-dark rounded w-1/3"></div>
          <div className="h-4 bg-canvas-dark rounded w-3/4"></div>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas/90 rounded-lg">
        <Lock className="w-10 h-10 text-brand mb-3" />
        <p className="text-sm font-medium text-slate mb-2">Premium Content</p>
        <button
          onClick={onUpgrade}
          className="bg-accent text-slate px-4 py-2 rounded-md text-sm font-medium hover:bg-accent-light transition-colors"
        >
          Subscribe to Unlock
        </button>
      </div>
    </div>
  );
}

function ModuleRow({ name, label, module, isPremium }: { name: string; label: string; module: ModuleData; isPremium: boolean }) {
  const mult = module.value;
  const effect = mult !== null && mult > 1 ? "boost" : mult !== null && mult < 1 ? "penalty" : "neutral";
  const effectColor = effect === "boost" ? "text-green-600" : effect === "penalty" ? "text-red-600" : "text-slate-muted";
  const multStr = mult !== null ? `${mult.toFixed(1)}x` : "N/A";

  return (
    <div className="flex items-center justify-between py-2 border-b border-slate/5 last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate">{label}</span>
        {module.status === "SKIPPED" && (
          <span className="text-xs bg-canvas-dark px-1.5 py-0.5 rounded text-slate-muted">N/A</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {isPremium ? (
          <span className={`text-sm font-mono ${effectColor}`}>{multStr}</span>
        ) : (
          <span className="text-sm text-slate-muted blur-sm">5.0x</span>
        )}
        {isPremium && mult !== null && (
          <span className={`text-xs ${effectColor}`}>
            {effect === "boost" ? "↑" : effect === "penalty" ? "↓" : "—"}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AppraisePage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<AppraisalResult | null>(null);
  const [history, setHistory] = useState<AppraisalHistory[]>([]);
  const [isAppraising, setIsAppraising] = useState(false);
  const [error, setError] = useState("");

  const isPremium = user?.plan === "starter" || user?.plan === "pro" || user?.plan === "enterprise";

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

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
    } catch {
      // ignore
    }
  };

  const handleAppraise = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setIsAppraising(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/appraise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ domain }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error?.message || "Appraisal failed");
        return;
      }

      const data = await res.json();
      setResult(data.metrics || data);
      await fetchHistory();
    } catch {
      setError("Failed to connect to server");
    } finally {
      setIsAppraising(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <p className="text-slate-muted">Loading...</p>
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
    <div className="min-h-screen bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate tracking-tight">Domain Appraiser</h1>
          </div>
          <p className="text-slate-muted mb-8">
            Get a comprehensive domain valuation using 16 analysis dimensions including RDAP data, TLD scoring, brandability, commercial intent, and more.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate/10 p-6 mb-8">
          <form onSubmit={handleAppraise} className="flex gap-4">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-muted/40" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter domain (e.g., example.com)"
                required
                className="w-full bg-canvas rounded-lg pl-12 pr-4 py-3 text-slate placeholder-slate-muted/60 border border-slate/10 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isAppraising}
              className="bg-brand text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 hover:bg-brand-dark transition-colors flex items-center gap-2"
            >
              {isAppraising ? "Appraising..." : "Appraise Domain"}
              {!isAppraising && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate">{result.domain}</h2>
                  <p className="text-slate-muted text-sm">
                    {result.confidence} confidence · {Math.round(result.completeness_ratio * 100)}% completeness
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}
                  </p>
                  <p className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                    {getScoreLabel(result.score)}
                  </p>
                </div>
              </div>

              <div className="bg-canvas rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-muted">Estimated Market Value</p>
                    {isPremium && result.estimated_value ? (
                      <p className="text-2xl font-bold text-slate">${result.estimated_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-slate blur-sm">$XX,XXX.XX</p>
                        <Lock className="w-4 h-4 text-brand" />
                      </div>
                    )}
                  </div>
                  {isPremium && result.range_low && result.range_high && (
                    <div className="text-right text-sm text-slate-muted">
                      <p>Range: ${result.range_low.toLocaleString()} — ${result.range_high.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate/10 p-6">
              <h3 className="text-xl font-semibold text-slate mb-4">Analysis Dimensions</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-muted uppercase mb-3">Free Metrics</h4>
                  <div className="space-y-1">
                    {freeModules.map(({ name, label }) => (
                      <ModuleRow
                        key={name}
                        name={name}
                        label={label}
                        module={modules[name] || { value: null, confidence: 0, data: {}, status: "SKIPPED" }}
                        isPremium={true}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-muted uppercase mb-3">Premium Metrics</h4>
                  {isPremium ? (
                    <div className="space-y-1">
                      {premiumModules.map(({ name, label }) => (
                        <ModuleRow
                          key={name}
                          name={name}
                          label={label}
                          module={modules[name] || { value: null, confidence: 0, data: {}, status: "SKIPPED" }}
                          isPremium={isPremium}
                        />
                      ))}
                    </div>
                  ) : (
                    <PadlockOverlay onUpgrade={() => router.push("/pricing")} />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate/10 p-6">
              <h3 className="text-xl font-semibold text-slate mb-4">Detailed Intelligence</h3>

              {isPremium ? (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate">Registration Info</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Status</span>
                        <span className="text-slate">{modules.m1_rdap?.data?.registered ? "Registered" : "Available"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Registrar</span>
                        <span className="text-slate">{modules.m1_rdap?.data?.registrar || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Age</span>
                        <span className="text-slate">{modules.m1_rdap?.data?.age_years ? `${modules.m1_rdap.data.age_years} years` : "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Expiry</span>
                        <span className="text-slate">{modules.m1_rdap?.data?.expiry_date || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate">Authority & Trust</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Ahrefs DR</span>
                        <span className="text-slate">{modules.m12_authority?.data?.ahrefs_dr || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-muted">OPR Score</span>
                        <span className="text-slate">{modules.m12_authority?.data?.opr_score || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Wayback Snapshots</span>
                        <span className="text-slate">{modules.m12_authority?.data?.snapshots || "0"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Parked</span>
                        <span className="text-slate">{modules.m12_authority?.data?.parked ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate">Commercial Value</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-muted">CPC Tier</span>
                        <span className="text-slate">{modules.m8_cpc?.data?.tier || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Keyword Score</span>
                        <span className="text-slate">{modules.m7_keyword_popularity?.data?.domain_score || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Trademark Risk</span>
                        <span className="text-slate">{modules.m11_trademark?.data?.severity || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-muted">Cross-TLD</span>
                        <span className="text-slate">{modules.m10_cross_tld?.data?.is_com ? ".com active" : "Check required"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <PadlockOverlay onUpgrade={() => router.push("/pricing")} />
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate/10 p-6">
              <h3 className="text-xl font-semibold text-slate mb-4">Pronounceability Breakdown</h3>
              {isPremium ? (
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate">Vowel Balance</span>
                      <span className="text-slate-muted">{modules.m5_pronounceability?.data?.vowel_score?.toFixed(1) || "N/A"}/100</span>
                    </div>
                    <div className="w-full bg-canvas-dark rounded-full h-2">
                      <div
                        className="bg-brand h-2 rounded-full"
                        style={{ width: `${modules.m5_pronounceability?.data?.vowel_score || 0}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate">Consonant Clusters</span>
                      <span className="text-slate-muted">{modules.m5_pronounceability?.data?.cluster_score?.toFixed(1) || "N/A"}/100</span>
                    </div>
                    <div className="w-full bg-canvas-dark rounded-full h-2">
                      <div
                        className="bg-brand h-2 rounded-full"
                        style={{ width: `${modules.m5_pronounceability?.data?.cluster_score || 0}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate">Bigram Frequency</span>
                      <span className="text-slate-muted">{modules.m5_pronounceability?.data?.bigram_score?.toFixed(1) || "N/A"}/100</span>
                    </div>
                    <div className="w-full bg-canvas-dark rounded-full h-2">
                      <div
                        className="bg-brand h-2 rounded-full"
                        style={{ width: `${modules.m5_pronounceability?.data?.bigram_score || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <PadlockOverlay onUpgrade={() => router.push("/pricing")} />
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate/10 mt-8">
          <div className="p-4 border-b border-slate/10">
            <h2 className="text-xl font-semibold text-slate">Recent Appraisals</h2>
          </div>
          {history.length === 0 ? (
            <div className="p-8 text-center text-slate-muted">
              No appraisals yet. Enter a domain above to get started.
            </div>
          ) : (
            <div className="divide-y divide-slate/10">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between hover:bg-canvas/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setDomain(item.domain);
                  }}
                >
                  <div>
                    <p className="font-medium text-slate">{item.domain}</p>
                    <p className="text-sm text-slate-muted">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                      {item.score}
                    </p>
                    <p className={`text-xs ${getScoreColor(item.score)}`}>
                      {getScoreLabel(item.score)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
