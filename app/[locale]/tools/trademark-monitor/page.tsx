"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrademarkMonitorPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Split Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[auto] md:min-h-[480px]">
        {/* Left - Content */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
          <span className="inline-block bg-[#9E2A2B] text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider mb-5 w-fit">
            PREMIUM
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 leading-tight">
            Trademark Monitor
          </h1>
          <p className="text-base md:text-lg text-[#666] mb-8 leading-relaxed">
            USPTO/WIPO conflict detection and alerts. Protect your brand with
            proactive trademark monitoring across global databases.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#9E2A2B] text-white px-7 py-3.5 rounded-lg text-sm font-bold no-underline w-fit"
          >
            Start Monitoring
          </Link>
        </div>

        {/* Right - Severity Bar */}
        <div className="flex flex-col justify-center p-8 md:p-10 bg-gradient-to-br from-[#111] to-[#2A2A2A]">
          <h2 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-7">
            Threat Severity Levels
          </h2>
          {[
            { level: "Critical", color: "#E74C3C", desc: "Direct trademark conflict detected" },
            { level: "High", color: "#F4A261", desc: "Similar mark in same industry" },
            { level: "Medium", color: "#F39C12", desc: "Similar name, different class" },
            { level: "Low", color: "#27AE60", desc: "Minor similarity, low risk" },
          ].map((item) => (
            <div key={item.level} className="flex items-center gap-4 py-3.5 border-b border-white/10">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div>
                <span className="text-white font-semibold text-sm">{item.level}</span>
                <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution 2-Column */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Problem */}
          <div className="bg-white rounded-xl p-6 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-t-4 border-[#E74C3C]">
            <h2 className="text-xl md:text-2xl font-bold text-[#E74C3C] mb-5">The Problem</h2>
            <ul className="list-none p-0">
              {[
                "Trademark infringement lawsuits cost $100K+ on average",
                "New domain registrations happen every minute",
                "Manual monitoring is impossible at scale",
                "By the time you notice, damage is done",
              ].map((item, i) => (
                <li key={i} className="py-2.5 border-b border-gray-100 text-[#666] text-sm flex gap-2.5">
                  <span className="text-[#E74C3C]">✕</span>{item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-white rounded-xl p-6 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-t-4 border-[#27AE60]">
            <h2 className="text-xl md:text-2xl font-bold text-[#27AE60] mb-5">Our Solution</h2>
            <ul className="list-none p-0">
              {[
                "Real-time USPTO and WIPO database monitoring",
                "Scan up to 5,000 domains per list",
                "Instant conflict alerts via email and webhook",
                "Risk scoring with confidence levels",
              ].map((item, i) => (
                <li key={i} className="py-2.5 border-b border-gray-100 text-[#666] text-sm flex gap-2.5">
                  <span className="text-[#27AE60]">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4-Step Flow */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-10 md:mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {[
              { step: "1", title: "Add Domains", desc: "Upload your brand domains or keywords to monitor." },
              { step: "2", title: "Set Criteria", desc: "Define industry, geographic scope, and sensitivity." },
              { step: "3", title: "Monitor", desc: "We scan USPTO, EUIPO, and WIPO databases continuously." },
              { step: "4", title: "Get Alerts", desc: "Receive instant notifications for potential conflicts." },
            ].map((item) => (
              <div key={item.step} className="bg-[#FAF7F2] rounded-xl p-5 md:p-7 text-center">
                <div className="w-10 h-10 bg-[#9E2A2B] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-extrabold text-base">
                  {item.step}
                </div>
                <h3 className="text-sm md:text-base font-bold text-[#111] mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Accordion */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8">
          Use Cases
        </h2>
        {[
          { title: "Brand Protection", content: "Monitor for cybersquatting, typosquatting, and brand impersonation across all major TLDs." },
          { title: "Product Launch", content: "Clear trademarks before launching new products or entering new markets." },
          { title: "M&A Due Diligence", content: "Audit trademark risks during mergers, acquisitions, or investment rounds." },
          { title: "Portfolio Management", content: "Protect your domain portfolio from trademark challenges and legal disputes." },
        ].map((item, i) => (
          <div key={item.title} className="bg-white rounded-xl mb-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
            <button
              onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
              className="w-full py-5 px-6 flex justify-between items-center bg-transparent border-none cursor-pointer text-left"
            >
              <span className="text-base font-bold text-[#111]">{item.title}</span>
              <span className="text-xl text-[#9E2A2B] transition-transform" style={{ transform: openAccordion === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            {openAccordion === i && (
              <div className="px-6 pb-5 text-[#666] text-sm leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Pricing Tiers */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              { plan: "Free", price: "$0", features: ["3 unsigned scans/day", "12 signed scans/day", "Basic metrics"] },
              { plan: "Startup", price: "$79/mo", features: ["30 scans/day", "Priority processing", "CSV export", "Email alerts"], popular: true },
              { plan: "Enterprise", price: "$129/mo", features: ["Unlimited scans", "API access (10K calls/day)", "Webhook integration", "Dedicated support"] },
            ].map((item) => (
              <div
                key={item.plan}
                className={`bg-[#FAF7F2] rounded-xl p-6 md:p-8 text-center relative ${item.popular ? "border-2 border-[#9E2A2B]" : "border-2 border-transparent"}`}
              >
                {item.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#9E2A2B] text-white px-4 py-1 rounded-xl text-xs font-bold">
                    POPULAR
                  </span>
                )}
                <h3 className="text-lg font-bold text-[#111] mb-2">{item.plan}</h3>
                <div className="text-3xl font-extrabold text-[#9E2A2B] mb-5">{item.price}</div>
                <ul className="list-none p-0 text-left">
                  {item.features.map((f) => (
                    <li key={f} className="py-2 border-b border-gray-200 text-[#666] text-sm flex items-center gap-2">
                      <span className="text-[#27AE60]">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Protect Your Brand Today
        </h2>
        <p className="text-base text-white/80 mb-8">
          Don&apos;t wait until it&apos;s too late. Start monitoring now.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold no-underline text-center">
            Start Free Trial
          </Link>
          <Link href="/tools/domain-lookup" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">
            Try Domain Lookup
          </Link>
          <Link href="/tools/seo-scanner" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">
            Run SEO Scan
          </Link>
        </div>
      </section>
    </div>
  );
}
