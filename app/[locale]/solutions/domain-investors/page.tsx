import Link from "next/link";

export default function DomainInvestorsPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      {/* Split Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <span className="inline-block px-3.5 py-1.5 bg-[#9E2A2B] text-white rounded-md text-xs font-bold tracking-wider uppercase mb-5">
            For Investors
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-[52px] font-extrabold leading-tight mb-4">
            Maximize Domain
            <br />
            Investment Returns
          </h1>
          <p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md mb-8">
            Portfolio yield analysis, flipper valuation metrics, drop-catching
            alerts, and commission tiers from 8–15%. Everything you need to
            outperform the market.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/signup" className="inline-block px-7 py-3.5 bg-[#9E2A2B] text-white rounded-lg text-sm font-bold no-underline text-center">
              Start Investing
            </Link>
            <Link href="/pricing" className="inline-block px-7 py-3.5 bg-transparent text-[#9E2A2B] border-2 border-[#9E2A2B] rounded-lg text-sm font-bold no-underline text-center">
              View Pricing
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {[
            { value: "16", label: "Scoring Dimensions" },
            { value: "8–15%", label: "Commission Tiers" },
            { value: "4", label: "TLDs Scanned" },
            { value: "$5–$50", label: "Reveal Fee Range" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#E8E5DF] rounded-xl p-5 md:p-7 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-[#9E2A2B] mb-1">{s.value}</div>
              <div className="text-xs text-[#666]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">The Investor&apos;s Problem</h2>
          <p className="text-base text-[#666] leading-relaxed mb-4">
            Traditional domain investing requires juggling multiple tools,
            paying opaque fees, and guessing at valuations. You lose deals to
            faster buyers and overpay on commissions.
          </p>
          <ul className="text-sm text-[#666] leading-loose pl-5 list-disc">
            <li>No unified scoring model across TLDs</li>
            <li>Hidden fees erode profit margins</li>
            <li>Manual drop-catching misses opportunities</li>
            <li>Commission structures eat into flips</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">The Ceche Solution</h2>
          <p className="text-base text-[#666] leading-relaxed mb-4">
            A single platform with 16-dimension scoring, tiered commissions
            with minimums, real-time alerts, and a marketplace designed for
            investors — not casual buyers.
          </p>
          <ul className="text-sm text-[#666] leading-loose pl-5 list-disc">
            <li>16-dimension scoring on every domain</li>
            <li>Transparent tiered commission: 15%/12%/10%/8%</li>
            <li>Drop-catching alerts for expiring domains</li>
            <li>Bulk scan up to 5,000 domains at once</li>
          </ul>
        </div>
      </section>

      {/* Commission Table */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Tiered Commission Structure</h2>
        <div className="bg-white rounded-xl border border-[#E8E5DF] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[450px]">
              <thead>
                <tr className="bg-[#9E2A2B] text-white">
                  <th className="py-4 px-5 text-left font-bold">Tier</th>
                  <th className="py-4 px-5 text-left font-bold">Commission</th>
                  <th className="py-4 px-5 text-left font-bold">Minimum</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: "Starter", commission: "15%", minimum: "$10" },
                  { tier: "Growth", commission: "12%", minimum: "$50" },
                  { tier: "Pro", commission: "10%", minimum: "$500" },
                  { tier: "Enterprise", commission: "8%", minimum: "$4,000" },
                ].map((r, i) => (
                  <tr key={r.tier} className={`border-t border-[#E8E5DF] ${i % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"}`}>
                    <td className="py-3.5 px-5 font-semibold">{r.tier}</td>
                    <td className="py-3.5 px-5 text-[#9E2A2B] font-bold">{r.commission}</td>
                    <td className="py-3.5 px-5">{r.minimum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Investor Tools */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Tools Built for Investors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "SEO Scanner", desc: "Audit backlink profiles and domain authority in seconds." },
            { title: "Extended Insights", desc: "Go beyond the basics with full 16-dimension deep dives." },
            { title: "Bulk Analyzer", desc: "Score up to 5,000 domains in a single batch run." },
            { title: "Trademark Monitor", desc: "Automated alerts for trademark conflicts on your portfolio." },
          ].map((t) => (
            <div key={t.title} className="bg-white border border-[#E8E5DF] rounded-xl p-5 md:p-6">
              <h3 className="text-base font-bold mb-2 text-[#111]">{t.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Getting Started */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-center mb-8 md:mb-10">Getting Started</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {[
            { step: "1", title: "Create Account", desc: "Sign up free in 30 seconds" },
            { step: "2", title: "Choose Plan", desc: "Free, Startup ($79/mo), or Enterprise ($129/mo)" },
            { step: "3", title: "Scan Domains", desc: "Run SEO Scanner or Bulk Analyzer" },
            { step: "4", title: "Analyze Scores", desc: "Review 16-dimension reports" },
            { step: "5", title: "Acquire & Flip", desc: "Buy, hold, or resell with tiered commissions" },
          ].map((s) => (
            <div key={s.step} className="bg-white border border-[#E8E5DF] rounded-xl p-4 md:p-5 text-center">
              <div className="w-10 h-10 rounded-full bg-[#9E2A2B] text-white inline-flex items-center justify-center font-bold text-base mb-3">
                {s.step}
              </div>
              <h4 className="text-sm font-bold mb-1">{s.title}</h4>
              <p className="text-xs text-[#666]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7a1f1f] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">Start Flipping Smarter</h2>
        <p className="text-base md:text-lg text-white/80 mb-8">Join thousands of investors using Ceche to maximize domain ROI.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-8 py-4 bg-[#F4A261] text-[#111] rounded-lg text-base font-bold no-underline text-center">
            Create Free Account
          </Link>
          <Link href="/marketplace" className="inline-block px-8 py-4 bg-transparent text-white border-2 border-white/40 rounded-lg text-base font-bold no-underline text-center">
            Browse Marketplace
          </Link>
        </div>
      </section>
    </main>
  );
}
