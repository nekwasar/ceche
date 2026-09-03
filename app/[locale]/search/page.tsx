"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, ArrowRight, Globe, CheckCircle, XCircle } from "lucide-react";

interface SearchResult {
  domain: string;
  available: boolean;
  tld: string;
  rating?: "premium" | "mid" | "low";
  suggestions?: string[];
  whois?: { registrar: string; expiry: string; nameservers: string[]; registrant: string; };
}

export default function SearchPage() {
  const t = useTranslations("search");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [domain, setDomain] = useState(query);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  useEffect(() => { if (query) { setDomain(query); handleSearch(query); } }, [query]);

  const handleSearch = async (searchDomain?: string) => {
    const d = searchDomain || domain;
    if (!d.trim()) return;
    setLoading(true); setResult(null);
    setTimeout(() => {
      const tld = d.includes(".") ? d.split(".").pop() : "com";
      const isAvailable = Math.random() > 0.4;
      setResult({
        domain: d, available: isAvailable, tld: tld || "com",
        rating: isAvailable ? (["premium", "mid", "low"] as const)[Math.floor(Math.random() * 3)] : undefined,
        suggestions: isAvailable ? ["SaaS product landing page", "Tech startup brand", "Cloud infrastructure tool", "Developer documentation hub"] : undefined,
        whois: !isAvailable ? { registrar: "GoDaddy.com, LLC", expiry: "2027-03-15", nameservers: ["ns1.example.com", "ns2.example.com"], registrant: "REDACTED FOR PRIVACY" } : undefined,
      });
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); handleSearch(); };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          <form onSubmit={handleSubmit} className="flex items-stretch gap-3">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#999999" }} />
              <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder={t("placeholder")} className="w-full pl-12 pr-4 py-4 rounded-2xl border border-black/10 bg-white text-base focus:outline-none focus:border-[#9E2A2B] transition-colors" style={{ color: "#111111" }} />
            </div>
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-medium text-sm transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21] disabled:opacity-50">
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
              {t("button")}
            </button>
          </form>
        </div>

        {loading && <div className="text-center py-12"><div className="w-8 h-8 border-2 border-[#999999] border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-sm" style={{ color: "#666666" }}>{t("loading", { domain })}</p></div>}

        {result && !loading && (
          <div>
            <div className="bg-[#EFECE6] rounded-2xl p-8 border border-black/5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                {result.available ? <CheckCircle className="w-6 h-6" style={{ color: "#047857" }} /> : <XCircle className="w-6 h-6" style={{ color: "#9E2A2B" }} />}
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "#111111" }}>{result.domain}</h1>
                  <p className="text-sm" style={{ color: "#666666" }}>{result.available ? t("available") : t("taken")}</p>
                </div>
              </div>
              {result.available && result.rating && (
                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "#999999" }}>{t("rating")}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${result.rating === "premium" ? "bg-[#047857] text-white" : result.rating === "mid" ? "bg-[#F4A261] text-white" : "bg-[#E5DFD3] text-[#666666]"}`}>{result.rating}</span>
                  </div>
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider block mb-2" style={{ color: "#999999" }}>{t("buildWith")}</span>
                    <div className="grid grid-cols-2 gap-2">{result.suggestions?.map((s) => <div key={s} className="text-sm px-3 py-2 bg-white rounded-lg border border-black/5" style={{ color: "#666666" }}>{s}</div>)}</div>
                  </div>
                  <a href={`/tools/appraisal?domain=${encodeURIComponent(result.domain)}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]">
                    {t("appraise")}<ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
              {!result.available && result.whois && (
                <div className="mt-6 pt-6 border-t border-black/10">
                  <span className="text-xs font-mono uppercase tracking-wider block mb-4" style={{ color: "#999999" }}>{t("whoisTitle")}</span>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[t("whoisLabels.0"), t("whoisLabels.1"), t("whoisLabels.2"), t("whoisLabels.3")].map((label, i) => {
                      const values = [result.whois.registrar, result.whois.expiry, result.whois.registrant, result.whois.nameservers.join(", ")];
                      return <div key={i}><div className="font-mono text-xs uppercase" style={{ color: "#999999" }}>{label}</div><div style={{ color: "#111111" }}>{values[i]}</div></div>;
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`/tools/appraisal?domain=${encodeURIComponent(result.domain)}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-black text-black hover:bg-black hover:text-white transition-all">{t("fullAppraisal")}<ArrowRight className="w-3.5 h-3.5" /></a>
              <button onClick={() => navigator.clipboard.writeText(result.domain)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-black/10 hover:border-black/30 transition-all" style={{ color: "#666666" }}>{t("copyDomain")}</button>
            </div>
          </div>
        )}

        {!result && !loading && <div className="text-center py-12"><Globe className="w-12 h-12 mx-auto mb-4" style={{ color: "#E5DFD3" }} /><p className="text-sm" style={{ color: "#999999" }}>{t("empty")}</p></div>}
      </div>
    </main>
  );
}
