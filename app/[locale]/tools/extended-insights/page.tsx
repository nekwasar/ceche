"use client";

import Link from "next/link";
import PremiumGateModal from "@/components/layout/PremiumGateModal";

export default function ExtendedInsightsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <PremiumGateModal toolName="Extended Insights" />

      {/* Split Hero */}
      <section className="grid grid-cols-1 md:grid-cols-5 min-h-[auto] md:min-h-[500px]">
        {/* Left - Content */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white md:col-span-3">
          <span className="inline-block bg-[#9E2A2B] text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider mb-5 w-fit">
            PREMIUM
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 leading-tight">
            Extended Insights
          </h1>
          <p className="text-base md:text-lg text-[#666] mb-8 leading-relaxed">
            Deep historical data, DNS records, USPTO/WIPO trademark checks, and
            WHOIS/RDAP logs for comprehensive domain research.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#9E2A2B] text-white px-7 py-3.5 rounded-lg text-sm font-bold no-underline w-fit"
          >
            Get Extended Insights
          </Link>
        </div>

        {/* Right - Pricing Table */}
        <div className="flex flex-col justify-center p-8 md:p-10 bg-gradient-to-br from-[#111] to-[#2A2A2A] md:col-span-2">
          <h2 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-7">
            Reveal Pricing
          </h2>
          {[
            { tier: "Basic", price: "$5", desc: "Standard domain value" },
            { tier: "Standard", price: "$10", desc: "Moderate domain value" },
            { tier: "Premium", price: "$25", desc: "High-value domain" },
            { tier: "Enterprise", price: "$50", desc: "Ultra-premium domain" },
          ].map((item) => (
            <div
              key={item.tier}
              className="flex justify-between items-center py-3.5 border-b border-white/10"
            >
              <div>
                <span className="text-white font-semibold text-sm">{item.tier}</span>
                <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
              </div>
              <span className="text-[#F4A261] font-bold text-lg">{item.price}</span>
            </div>
          ))}
          <p className="text-white/40 text-xs mt-5">
            Pricing based on domain value and complexity
          </p>
        </div>
      </section>

      {/* 6 Report Sections */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-10 md:mb-12">
          What&apos;s Included in Your Report
        </h2>
        <div className="flex flex-col gap-4 md:gap-5">
          {[
            { num: "1", title: "Historical Data", desc: "Wayback Machine snapshots and historical content changes over time." },
            { num: "2", title: "DNS Records", desc: "Complete DNS record enumeration including A, MX, NS, TXT, and CNAME." },
            { num: "3", title: "WHOIS / RDAP", desc: "Registration data, domain age, registrar history, and nameserver changes." },
            { num: "4", title: "Trademark Checks", desc: "USPTO and WIPO trademark database conflict detection." },
            { num: "5", title: "SSL Certificate", desc: "Certificate authority, expiry dates, and chain verification." },
            { num: "6", title: "Server Intelligence", desc: "Hosting provider, IP geolocation, and technology stack detection." },
          ].map((item) => (
            <div
              key={item.num}
              className="flex gap-5 md:gap-6 bg-white rounded-xl p-5 md:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <div className="w-12 h-12 bg-[#9E2A2B] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shrink-0">
                {item.num}
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-[#111] mb-1">{item.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* When to Use */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">
            When to Use Extended Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[
              { title: "Domain Acquisition", desc: "Research domain history before making an offer." },
              { title: "Trademark Clearance", desc: "Check for conflicts before launching a brand." },
              { title: "Competitor Analysis", desc: "Understand competitor domain strategies and history." },
              { title: "Portfolio Due Diligence", desc: "Audit your portfolio for hidden risks and opportunities." },
            ].map((item) => (
              <div key={item.title} className="bg-[#FAF7F2] rounded-xl p-5 md:p-6">
                <h3 className="text-base font-bold text-[#111] mb-2">{item.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#F4A261] to-[#E8944D] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-4">
          Unlock Domain Intelligence
        </h2>
        <p className="text-base text-[#111]/80 mb-8">
          Get the complete picture with Extended Insights reports.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="bg-[#9E2A2B] text-white px-8 py-3.5 rounded-lg text-base font-bold no-underline text-center"
          >
            Start Free Trial
          </Link>
          <Link
            href="/tools/domain-lookup"
            className="bg-white text-[#111] px-8 py-3.5 rounded-lg text-base font-semibold no-underline text-center"
          >
            Try Domain Lookup First
          </Link>
        </div>
      </section>
    </div>
  );
}
