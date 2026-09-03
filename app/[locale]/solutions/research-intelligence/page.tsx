import Link from "next/link";
import { BarChart3, Link2, TrendingUp, DollarSign, Shield } from "lucide-react";

export default function ResearchIntelligencePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      {/* Document-style Header */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <div className="flex items-center gap-2 mb-5 text-sm text-[#999]">
          <span>Solutions</span>
          <span>/</span>
          <span className="text-[#9E2A2B] font-semibold">Research Intelligence</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold leading-tight mb-4">
          Deep Domain Analysis
          <br />
          Before Acquisition
        </h1>
        <p className="text-base md:text-lg text-[#666] leading-relaxed max-w-xl">
          Make informed decisions with comprehensive intelligence reports.
          16-dimension scoring, ownership history, backlink profiles, and
          risk assessment — all in one document.
        </p>
      </section>

      {/* 6 Numbered Sections */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        {[
          { num: "01", title: "16-Dimension Scoring", desc: "Every domain is evaluated across 16 distinct dimensions including brandability, SEO strength, market demand, and risk factors. The composite Buyer Intent Score (0–100) gives you a single number to compare domains.", icon: BarChart3 },
          { num: "02", title: "Ownership History", desc: "Complete WHOIS history and ownership transitions. See how many times a domain has changed hands, previous use cases, and any associated reputation issues.", icon: Link2 },
          { num: "03", title: "Backlink Profile", desc: "Detailed backlink analysis with quality scoring. Dofollow/nofollow ratios, anchor text distribution, referring domains, and link velocity trends over time.", icon: Link2 },
          { num: "04", title: "Traffic Estimates", desc: "Monthly traffic predictions based on SEO metrics, keyword rankings, and historical data. Understand the organic potential before you invest.", icon: TrendingUp },
          { num: "05", title: "Valuation Range", desc: "Algorithmic pricing with confidence intervals. Compare against recent comparable sales across .com, .io, .co, and .ai to understand fair market value.", icon: DollarSign },
          { num: "06", title: "Risk Assessment", desc: "Trademark conflicts, spam history, Google penalty status, and registration risk analysis. Know the full picture before committing capital.", icon: Shield },
        ].map((s) => (
          <div key={s.num} className="flex gap-5 md:gap-6 py-6 md:py-7 border-b border-[#E8E5DF]">
            <div className="w-12 h-12 rounded-[10px] bg-[#9E2A2B] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
              {s.num}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <s.icon className="w-5 h-5 text-[#9E2A2B]" /> {s.title}
              </h3>
              <p className="text-sm text-[#666] leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">How Ceche Compares</h2>
        <div className="bg-white rounded-xl border border-[#E8E5DF] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[550px]">
              <thead>
                <tr className="bg-[#111] text-white">
                  <th className="py-3.5 px-5 text-left font-semibold">Feature</th>
                  <th className="py-3.5 px-5 text-center font-bold text-[#F4A261]">Ceche</th>
                  <th className="py-3.5 px-5 text-center font-semibold">Dynadot</th>
                  <th className="py-3.5 px-5 text-center font-semibold">GoDaddy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "16-Dimension Scoring", ceche: "✓", dynadot: "✗", godaddy: "✗" },
                  { feature: "Buyer Intent Score", ceche: "0–100", dynadot: "✗", godaddy: "✗" },
                  { feature: "Bulk Analysis (5K+)", ceche: "✓", dynadot: "Limited", godaddy: "✗" },
                  { feature: "API Access", ceche: "10K/day", dynadot: "Basic", godaddy: "Paid add-on" },
                  { feature: "Trademark Monitor", ceche: "✓", dynadot: "✗", godaddy: "Paid" },
                  { feature: "Tiered Commission", ceche: "8–15%", dynadot: "Flat", godaddy: "Flat 20%+" },
                  { feature: "TLDs Analyzed", ceche: "4", dynadot: "10+", godaddy: "10+" },
                ].map((r, i) => (
                  <tr key={r.feature} className={`border-t border-[#E8E5DF] ${i % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"}`}>
                    <td className="py-3 px-5 font-semibold">{r.feature}</td>
                    <td className="py-3 px-5 text-center text-[#9E2A2B] font-bold">{r.ceche}</td>
                    <td className="py-3 px-5 text-center text-[#666]">{r.dynadot}</td>
                    <td className="py-3 px-5 text-center text-[#666]">{r.godaddy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7a1f1f] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">Research Smarter</h2>
        <p className="text-base md:text-lg text-white/80 max-w-lg mx-auto mb-8">
          Get deep intelligence on any domain. Start with a free account.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-8 py-4 bg-white text-[#9E2A2B] rounded-lg text-base font-bold no-underline text-center">
            Create Free Account
          </Link>
          <Link href="/tools/appraisal" className="inline-block px-8 py-4 bg-transparent text-white border-2 border-white/40 rounded-lg text-base font-bold no-underline text-center">
            Try Appraisal Tool
          </Link>
        </div>
      </section>
    </main>
  );
}
