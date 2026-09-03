import Link from "next/link";
import { TrendingUp, Rocket, BarChart3, Search, Microscope, Gem } from "lucide-react";

const personas = [
  { title: "Domain Investors", desc: "Portfolio yield analysis, flipper metrics, and drop-catching alerts. Maximize returns on your domain investments.", stat: "8–15%", statLabel: "Commission Tiers", href: "/solutions/domain-investors", icon: TrendingUp },
  { title: "Startup Founders", desc: "Brandability index, keyword pronounceability, and extension penetration tools. Find the perfect domain for your startup.", stat: "16", statLabel: "Scoring Dimensions", href: "/solutions/startup-founders", icon: Rocket },
  { title: "SEO Agencies", desc: "Expired domain backlink authority scoring and spam penalty recovery audits. Data-driven domain acquisition for agency growth.", stat: "10K", statLabel: "API Calls/Day", href: "/solutions/seo-agencies", icon: BarChart3 },
  { title: "Find Available Domains", desc: "Scan millions of combinations for available domain names. Smart suggestions and real-time availability checks.", stat: "4", statLabel: "TLDs Scanned", href: "/solutions/find-available", icon: Search },
  { title: "Research Intelligence", desc: "Deep domain analysis before acquisition. Make informed decisions with comprehensive intelligence reports.", stat: "0–100", statLabel: "Buyer Intent Score", href: "/solutions/research-intelligence", icon: Microscope },
  { title: "Buy Premium Domains", desc: "Acquire high-value domains with secure, transparent transactions. Fast and reliable.", stat: "$5–$50", statLabel: "Reveal Fee Range", href: "/solutions/buy-premium", icon: Gem },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 leading-tight">
          Solutions for Every Domain Need
        </h1>
        <p className="text-base md:text-lg text-[#666] max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed">
          Whether you invest, build, or broker — Ceche has the tools, data, and
          marketplace to power your domain strategy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 text-left">
          {personas.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="flex flex-col p-6 md:p-8 bg-white rounded-2xl border border-[#E8E5DF] no-underline text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
            >
              <span className="text-4xl mb-4 block"><p.icon className="w-10 h-10 text-[#9E2A2B]" /></span>
              <h3 className="text-xl font-bold mb-2 text-[#111]">{p.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed flex-1 mb-5">{p.desc}</p>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-2xl md:text-3xl font-extrabold text-[#9E2A2B]">{p.stat}</span>
                <span className="text-xs text-[#999]">{p.statLabel}</span>
              </div>
              <span className="text-sm font-semibold text-[#9E2A2B]">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#111] py-12 md:py-16 px-4 md:px-6 text-center">
        <p className="text-base md:text-lg text-[#FAF7F2] mb-5 font-medium">
          Ready to get started?
        </p>
        <Link href="/signup" className="inline-block px-8 py-3.5 bg-[#9E2A2B] text-white rounded-lg text-base font-bold no-underline">
          Create Free Account
        </Link>
      </section>
    </main>
  );
}
