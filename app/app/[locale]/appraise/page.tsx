"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

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
  estimated_value: number;
  range_low: number;
  range_high: number;
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
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-lg">
        <svg className="w-12 h-12 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-sm font-medium mb-2">Premium Content</p>
        <button
          onClick={onUpgrade}
          className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90"
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
  const effectColor = effect === "boost" ? "text-green-600" : effect === "penalty" ? "text-red-600" : "text-muted-foreground";
  const multStr = mult !== null ? `${mult}x` : "N/A";

  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
        {module.status === "SKIPPED" && (
          <span className="text-xs bg-muted px-1.5 py-0.5 rounded">N/A</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {isPremium ? (
          <span className={`text-sm font-mono ${effectColor}`}>{multStr}</span>
        ) : (
          <span className="text-sm text-muted-foreground blur-sm">5.0x</span>
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
      setResult(data);
      await fetchHistory();
    } catch {
      setError("Failed to connect to server");
    } finally {
      setIsAppraising(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const modules = result?.modules || {};
  const moduleList = [
    { name: "m1_rdap", label: "Registration Data (RDAP)" },
    { name: "m2_tld_table", label: "TLD Premium Tier" },
    { name: "m3_length", label: "Domain Length" },
    { name: "m4_word_count", label: "Word Count" },
    { name: "m5_pronounceability", label: "Pronounceability" },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Domain Appraiser</h1>
      <p className="text-muted-foreground mb-8">
        Get a comprehensive domain valuation using 16 analysis dimensions including RDAP data, TLD scoring, brandability, commercial intent, and more.
      </p>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="border border-border rounded-lg p-6 mb-8">
        <form onSubmit={handleAppraise} className="flex gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain (e.g., example.com)"
            required
            className="flex-1 border border-border rounded-md px-4 py-2 bg-background"
          />
          <button
            type="submit"
            disabled={isAppraising}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium disabled:opacity-50"
          >
            {isAppraising ? "Appraising..." : "Appraise Domain"}
          </button>
        </form>
      </div>

      {result && (
        <div className="space-y-6">
          {/* Score Header */}
          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{result.domain}</h2>
                <p className="text-muted-foreground">
                  {result.confidence} confidence · {result.completeness_ratio * 100}% completeness
                </p>
              </div>
              <div className="text-right">
                <p className={`text-6xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}
                </p>
                <p className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                  {getScoreLabel(result.score)}
                </p>
              </div>
            </div>

            {/* Estimated Value */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Market Value</p>
                  {isPremium ? (
                    <p className="text-3xl font-bold">${result.estimated_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold blur-sm">$XX,XXX.XX</p>
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  )}
                </div>
                {isPremium && (
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Range: ${result.range_low.toLocaleString()} — ${result.range_high.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 16 Dimension Modules */}
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Analysis Dimensions</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Core Metrics</h4>
                <div className="space-y-1">
                  {moduleList.slice(0, 7).map(({ name, label }) => (
                    <ModuleRow
                      key={name}
                      name={name}
                      label={label}
                      module={modules[name] || { value: null, confidence: 0, data: {}, status: "SKIPPED" }}
                      isPremium={isPremium}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Advanced Metrics</h4>
                <div className="space-y-1">
                  {moduleList.slice(7).map(({ name, label }) => (
                    <ModuleRow
                      key={name}
                      name={name}
                      label={label}
                      module={modules[name] || { value: null, confidence: 0, data: {}, status: "SKIPPED" }}
                      isPremium={isPremium}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Detailed Data */}
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Detailed Intelligence</h3>

            {isPremium ? (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Registration Info</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span>{modules.m1_rdap?.data?.registered ? "Registered" : "Available"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registrar</span>
                      <span>{modules.m1_rdap?.data?.registrar || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age</span>
                      <span>{modules.m1_rdap?.data?.age_years ? `${modules.m1_rdap.data.age_years} years` : "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expiry</span>
                      <span>{modules.m1_rdap?.data?.expiry_date || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Authority & Trust</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ahrefs DR</span>
                      <span>{modules.m12_authority?.data?.ahrefs_dr || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">OPR Score</span>
                      <span>{modules.m12_authority?.data?.opr_score || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wayback Snapshots</span>
                      <span>{modules.m12_authority?.data?.snapshots || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parked</span>
                      <span>{modules.m12_authority?.data?.parked ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Commercial Value</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPC Tier</span>
                      <span>{modules.m8_cpc?.data?.tier || "None"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Keyword Score</span>
                      <span>{modules.m7_keyword_popularity?.data?.domain_score || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trademark Risk</span>
                      <span>{modules.m11_trademark?.data?.severity || "None"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cross-TLD</span>
                      <span>{modules.m10_cross_tld?.data?.is_com ? ".com active" : "Check required"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <PadlockOverlay onUpgrade={() => router.push("/pricing")} />
            )}
          </div>

          {/* Pronounceability Breakdown */}
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Pronounceability Breakdown</h3>
            {isPremium ? (
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Vowel Balance</span>
                    <span>{modules.m5_pronounceability?.data?.vowel_score?.toFixed(1) || "N/A"}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${modules.m5_pronounceability?.data?.vowel_score || 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Consonant Clusters</span>
                    <span>{modules.m5_pronounceability?.data?.cluster_score?.toFixed(1) || "N/A"}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${modules.m5_pronounceability?.data?.cluster_score || 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Bigram Frequency</span>
                    <span>{modules.m5_pronounceability?.data?.bigram_score?.toFixed(1) || "N/A"}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
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

      {/* History */}
      <div className="border border-border rounded-lg mt-8">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-semibold">Recent Appraisals</h2>
        </div>
        {history.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No appraisals yet. Enter a domain above to get started.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer"
                onClick={() => {
                  setDomain(item.domain);
                }}
              >
                <div>
                  <p className="font-medium">{item.domain}</p>
                  <p className="text-sm text-muted-foreground">
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
  );
}
