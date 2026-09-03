import Link from "next/link";
import { BarChart3, Shield, Layers, FileText } from "lucide-react";

export default function SeoAgenciesPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      {/* Dark Hero */}
      <section className="bg-[#111] py-16 md:py-20 lg:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10 md:mb-12">
            <span className="inline-block px-3.5 py-1.5 bg-[#9E2A2B] text-white rounded-md text-xs font-bold tracking-wider uppercase mb-5">
              For Agencies
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-white">
              Scale Domain
              <br />
              Acquisition for Clients
            </h1>
            <p className="text-base md:text-lg text-white/60 leading-relaxed">
              Expired domain backlink authority scoring, spam penalty recovery
              audits, and bulk tools designed for agency workflows. Handle
              5,000+ domains per project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { value: "5K", label: "Bulk Domains", accent: false },
              { value: "10K", label: "API Calls/Day", accent: false },
              { value: "8–15%", label: "Commission Tiers", accent: false },
              { value: "$5–$50", label: "Reveal Fee", accent: true },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl p-5 md:p-6 text-center ${s.accent ? "bg-[#9E2A2B]" : "bg-white/8"}`}>
                <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-xs text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">Why Agencies Choose Ceche</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[
            { num: "01", title: "Client Results", desc: "Deliver measurable ROI with data-backed domain acquisitions. Show clients exactly why a domain is worth the investment." },
            { num: "02", title: "Time Savings", desc: "Bulk scan 5,000 domains at once and score them across 16 dimensions. What used to take days now takes minutes." },
            { num: "03", title: "Revenue Growth", desc: "Lower commission tiers as volume increases. Earn more per deal with 8–15% tiered commissions and minimum-based pricing." },
          ].map((p) => (
            <div key={p.title} className="border-t-[3px] border-[#9E2A2B] bg-white rounded-b-xl p-6 md:p-8">
              <span className="text-xs font-bold text-[#9E2A2B] tracking-wider">{p.num}</span>
              <h3 className="text-lg font-bold mt-2 mb-3">{p.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Rows */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        {[
          { title: "Expired Domain Authority", desc: "Evaluate backlink profiles of expired domains for acquisition. See dofollow/nofollow ratios, anchor text distribution, and link velocity.", icon: BarChart3 },
          { title: "Spam Recovery Audits", desc: "Identify and recover from Google penalties with detailed analysis. Get actionable recommendations to restore domain health.", icon: Shield },
          { title: "Bulk Analyzer", desc: "Process up to 5,000 domains per batch. Export CSV reports with scores, metrics, and recommendations for client presentations.", icon: Layers },
          { title: "Reporting Dashboard", desc: "White-label reports for client presentations. Schedule automated reports and track acquisition ROI across multiple projects.", icon: FileText },
        ].map((f, i) => (
          <div key={f.title} className={`flex flex-col md:flex-row gap-5 md:gap-12 items-start md:items-center py-6 md:py-8 ${i < 3 ? "border-b border-[#E8E5DF]" : ""}`}>
            <div className="w-14 md:w-16 h-14 md:h-16 rounded-xl bg-[#9E2A2B] flex items-center justify-center shrink-0">
              <f.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed max-w-xl">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Plans for Every Agency</h2>
        <p className="text-base text-[#666] text-center mb-8 md:mb-10">Scale from solo consultant to full-service agency</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            { name: "Free", price: "$0", period: "/3 domains/day", features: ["16-dimension scoring", "SEO Scanner", "Basic insights"], cta: "Get Started", dark: false },
            { name: "Startup", price: "$79", period: "/mo", features: ["12 domains/day", "Extended Insights", "Trademark Monitor", "Priority support"], cta: "Start Trial", dark: true },
            { name: "Enterprise", price: "$129", period: "/mo", features: ["Unlimited scoring", "Bulk Analyzer (5K)", "API (10K calls/day)", "White-label reports"], cta: "Contact Sales", dark: false },
          ].map((p) => (
            <div key={p.name} className={`${p.dark ? "bg-[#111] text-white" : "bg-white text-[#111] border border-[#E8E5DF]"} rounded-xl p-6 md:p-8 flex flex-col`}>
              <h3 className="text-lg font-bold mb-1">{p.name}</h3>
              <div className="flex items-baseline mb-5">
                <span className="text-3xl md:text-4xl font-extrabold">{p.price}</span>
                <span className={`text-sm ml-1 ${p.dark ? "text-white/50" : "text-[#999]"}`}>{p.period}</span>
              </div>
              <ul className="list-none p-0 m-0 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className={`text-sm py-1.5 ${p.dark ? "text-white/80" : "text-[#666]"}`}>✓ {f}</li>
                ))}
              </ul>
              <Link href="/signup" className={`inline-block py-3 px-6 rounded-lg text-sm font-bold no-underline text-center ${p.dark ? "bg-[#9E2A2B] text-white" : "bg-[#111] text-white"}`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#111] to-[#1a1a1a] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to Scale Your Agency?</h2>
        <p className="text-base text-white/60 mb-8">Start with a free account or talk to our team about volume pricing.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-7 py-3.5 bg-[#9E2A2B] text-white rounded-lg text-sm font-bold no-underline text-center">
            Create Free Account
          </Link>
          <Link href="/help/api" className="inline-block px-7 py-3.5 bg-transparent text-[#F4A261] border-2 border-[#F4A261] rounded-lg text-sm font-bold no-underline text-center">
            API Documentation
          </Link>
        </div>
      </section>
    </main>
  );
}
