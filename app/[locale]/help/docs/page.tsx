"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DocsMiniNav } from "@/components/layout/DocsMiniNav";

const tools = [
  { name: "Domain Lookup", href: "/tools/domain-lookup", desc: "Free tool. WHOIS data, DNS records, and registrar information for any domain.", pricing: "Free", features: ["WHOIS lookup", "DNS record export (A, AAAA, MX, TXT, CNAME)", "Registrar detection", "Expiration tracking"] },
  { name: "16-Dimension Appraisal", href: "/appraise", desc: "Deep domain valuation using 16 analysis dimensions — RDAP, TLD scoring, brandability, commercial intent, and more.", pricing: "Free (3 unsigned / 12 signed per day)", features: ["16 scoring dimensions", "Market-based pricing", "Comparable analysis", "Confidence intervals"] },
  { name: "SEO Scanner", href: "/tools/seo-scanner", desc: "Evaluate search visibility, backlink quality, organic traffic, and SEO authority in 3-5 seconds.", pricing: "Premium", features: ["Domain Rating 0-100", "Organic traffic estimates", "Keyword rankings", "SEO Score composite"] },
  { name: "Extended Insights", href: "/tools/extended-insights", desc: "Deep due diligence — 16-dimension valuation, trademark screening, comparable sales, and buyer intent scoring.", pricing: "$5-$50 per report", features: ["6 report sections", "Trademark conflict check", "Buyer Intent Score 0-100", "PDF/JSON export"] },
  { name: "Bulk Domain Audit", href: "/tools/bulk-analyzer", desc: "Upload a CSV of up to 5,000 domains. Get valuations, SEO scores, priority rankings, and recommended actions.", pricing: "Premium ($79+/mo)", features: ["5,000 domains/batch", "Priority Score 1-100", "Custom scoring profiles", "CSV export"] },
  { name: "Trademark Monitor", href: "/tools/trademark-monitor", desc: "Automated USPTO and WIPO screening. Get alerts before a trademark conflict becomes a legal problem.", pricing: "Premium ($79+/mo)", features: ["Daily USPTO/WIPO scanning", "4 severity levels", "Email + SMS alerts", "5,000 domains per list"] },
  { name: "Domain Database", href: "/tools/domain-database", desc: "Registration statistics, pricing history, and renewal costs for 2,847 TLDs. Updated daily from ICANN zone files.", pricing: "Free (current pricing)", features: ["2,847 TLDs tracked", "24-month pricing history", "420+ registrar feeds", "Search by TLD, keyword, or price"] },
];

export default function DocsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-6 md:gap-16">
        <DocsMiniNav />
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: "#999999" }}>Documentation</p>
          <h1 className="font-serif font-bold leading-[0.85] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111111" }}>
            Every tool,<br />documented<span style={{ color: "#9E2A2B" }}>.</span>
          </h1>
          <div className="h-px mb-8" style={{ backgroundColor: "#9E2A2B" }} />
          <p className="text-lg max-w-2xl leading-relaxed mb-12" style={{ color: "#555555" }}>
            The Ceche Help Center covers the SEO Scanner, Extended Insights, Bulk Analyzer, Trademark Monitor, Domain Database, and API. Over 320 articles organized by tool, topic, and difficulty level.
          </p>

          {/* Tool list */}
          <div className="space-y-0 mb-12">
            {tools.map((tool, i) => (
              <div key={i} className="cursor-pointer" style={{ borderBottom: "1px solid rgba(17,17,17,0.06)" }} onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="py-6 md:py-8 md:grid md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-2 mb-2 md:mb-0">
                    <span className="block text-xl font-bold" style={{ color: "#111111", opacity: 0.08 }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="md:col-span-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-serif font-bold" style={{ color: "#111111" }}>{tool.name}</h3>
                      <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#CCCCCC", transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                    </div>
                    <p className="text-xs font-mono mt-1 mb-2" style={{ color: "#9E2A2B" }}>{tool.pricing}</p>
                    {expanded === i && (
                      <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#666666" }}>{tool.desc}</p>
                        <ul className="space-y-1.5 mb-4">
                          {tool.features.map((f, fi) => (
                            <li key={fi} className="text-xs flex gap-2" style={{ color: "#888888" }}>
                              <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: "#9E2A2B" }} />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <a href={tool.href} className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: "#9E2A2B" }}>
                          Open tool <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing tiers */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#999999" }}>Subscription tiers</span>
              <div className="h-px flex-1" style={{ backgroundColor: "#111111", opacity: 0.06 }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { tier: "Free", price: "$0", features: "12 appraisals/day, basic SEO Scanner, Help Center access", color: "#888888" },
                { tier: "Startup", price: "$79/mo", features: "30 appraisals/day, full scanner, Extended Insights, Bulk Analyzer, Trademark Monitor", color: "#F4A261" },
                { tier: "Enterprise", price: "$129/mo", features: "Unlimited appraisals, all Startup features, API (10K calls/day), dedicated support", color: "#9E2A2B" },
              ].map((p, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: p.color }}>{p.tier}</p>
                  <p className="text-2xl font-bold mb-2" style={{ color: "#111111" }}>{p.price}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#666666" }}>{p.features}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Need help */}
          <div className="rounded-xl p-6" style={{ backgroundColor: "#111111" }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-mono tracking-wider uppercase mb-1" style={{ color: "#F4A261" }}>Need help?</p>
                <h3 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>Premium subscribers get 4-hour support</h3>
              </div>
              <a href="/help/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shrink-0" style={{ backgroundColor: "#F4A261", color: "#111111" }}>
                Contact support <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
