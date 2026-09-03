"use client";

import Link from "next/link";
import { Search, FileText, Link2 } from "lucide-react";

export default function DomainDatabasePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Large Stat Hero */}
      <section className="bg-gradient-to-br from-[#111] to-[#2A2A2A] py-16 md:py-20 px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#F4A261]/20 text-[#F4A261] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-6">
            COMPREHENSIVE DATA
          </span>
          <div className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none mb-3">
            2,847
          </div>
          <p className="text-xl md:text-2xl text-white/70 mb-6">
            TLDs tracked across all registries
          </p>
          <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            Access the most comprehensive domain database available. Track
            registrations, expirations, and pricing across every major TLD.
          </p>
        </div>
      </section>

      {/* 2x2 Data Grid */}
      <section className="max-w-5xl mx-auto -mt-10 px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {[
            { value: "420M+", label: "Domains Tracked", desc: "Active registrations across all TLDs" },
            { value: "2.1B", label: "Historical Records", desc: "Registration and expiration history" },
            { value: "50K+", label: "Daily Updates", desc: "New registrations processed daily" },
            { value: "99.9%", label: "Uptime", desc: "Database availability guarantee" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <div className="text-3xl md:text-4xl font-extrabold text-[#9E2A2B] mb-2">{item.value}</div>
              <h3 className="text-base md:text-lg font-bold text-[#111] mb-1.5">{item.label}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Search Methods */}
      <section className="max-w-5xl mx-auto mt-12 md:mt-16 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">
          Search Methods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[
            { icon: Search, title: "Single Lookup", desc: "Search any domain for instant registration data and availability status." },
            { icon: FileText, title: "Bulk Check", desc: "Upload up to 5,000 domains at once for batch availability analysis." },
            { icon: Link2, title: "API Query", desc: "Programmatic access via RESTful API with up to 10,000 calls per day." },
          ].map((item) => (
          <div key={item.title} className="bg-white rounded-xl p-6 md:p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="mb-4"><item.icon className="w-10 h-10 text-[#9E2A2B] mx-auto" /></div>
              <h3 className="text-base md:text-lg font-bold text-[#111] mb-2">{item.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Sources */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-6 mt-12 md:mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8">
            Data Sources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {[
              { source: "ICANN", desc: "Official domain registration data" },
              { source: "Registry Operators", desc: "Direct TLD zone file access" },
              { source: "WHOIS/RDAP", desc: "Registration and contact information" },
              { source: "Wayback Machine", desc: "Historical content snapshots" },
              { source: "Certificate Transparency", desc: "SSL certificate monitoring" },
              { source: "DNS Resolvers", desc: "Real-time DNS record verification" },
            ].map((item) => (
              <div key={item.source} className="flex items-center gap-4 p-4 bg-[#FAF7F2] rounded-lg">
                <div className="w-2 h-2 bg-[#9E2A2B] rounded-full shrink-0" />
                <div>
                  <span className="font-semibold text-[#111] text-sm">{item.source}</span>
                  <p className="text-[#666] text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Levels */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">
          Access Levels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[
            { plan: "Free", price: "$0", features: ["Basic lookup", "3 searches/day", "Limited TLDs"] },
            { plan: "Startup", price: "$79/mo", features: ["Full database", "30 searches/day", "CSV export", "Priority support"], popular: true },
            { plan: "Enterprise", price: "$129/mo", features: ["Unlimited access", "API (10K calls/day)", "Webhooks", "Custom data"] },
          ].map((item) => (
            <div
              key={item.plan}
              className={`bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] relative ${item.popular ? "border-2 border-[#9E2A2B]" : "border-2 border-transparent"}`}
            >
              {item.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#9E2A2B] text-white px-4 py-1 rounded-xl text-xs font-bold">
                  POPULAR
                </span>
              )}
              <h3 className="text-lg font-bold text-[#111] mb-2">{item.plan}</h3>
              <div className="text-2xl md:text-3xl font-extrabold text-[#9E2A2B] mb-5">{item.price}</div>
              <ul className="list-none p-0">
                {item.features.map((f) => (
                  <li key={f} className="py-2 border-b border-gray-100 text-[#666] text-sm flex items-center gap-2">
                    <span className="text-[#27AE60]">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Access the Complete Domain Database
        </h2>
        <p className="text-base text-white/80 mb-8">
          2,847 TLDs, 420M+ domains, real-time data at your fingertips.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold no-underline text-center">
            Start Free Trial
          </Link>
          <Link href="/tools/domain-lookup" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">
            Try Domain Lookup
          </Link>
          <Link href="/tools/api" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">
            View API Docs
          </Link>
        </div>
      </section>
    </div>
  );
}
