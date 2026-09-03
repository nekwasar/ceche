"use client";

import { useState } from "react";
import Link from "next/link";

export default function ApiPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Simple CTA Hero */}
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-16 md:py-20 px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/15 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-5">
            DEVELOPER
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            API Access
          </h1>
          <p className="text-base md:text-lg text-white/85 mb-8 leading-relaxed">
            RESTful API for programmatic domain intelligence. Build custom
            integrations, automate workflows, and access all domain data
            programmatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold border-none cursor-pointer"
            >
              Get API Key
            </button>
            <Link
              href="/help/api"
              className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* 3 "What You Can Build" Cards */}
      <section className="max-w-5xl mx-auto -mt-10 px-4 md:px-6 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">
          What You Can Build
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[
            { icon: "🔗", title: "Domain Portfolio Tracker", desc: "Automatically monitor your portfolio for value changes, expiration alerts, and SEO shifts.", link: "/tools/domain-lookup", linkText: "Try Domain Lookup" },
            { icon: "📊", title: "Market Intelligence Dashboard", desc: "Build custom dashboards with real-time domain pricing, trends, and competitive analysis.", link: "/tools/bulk-analyzer", linkText: "Explore Bulk Analyzer" },
            { icon: "🛡️", title: "Brand Protection System", desc: "Automate trademark monitoring and get instant alerts for potential brand conflicts.", link: "/tools/trademark-monitor", linkText: "See Trademark Monitor" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-base md:text-lg font-bold text-[#111] mb-2">{item.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed mb-5 flex-1">{item.desc}</p>
              <Link href={item.link} className="text-[#9E2A2B] font-semibold text-sm no-underline hover:underline">
                {item.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* API Features */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-6 mt-12 md:mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">
            API Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[
              { title: "RESTful API", desc: "Full access to all domain intelligence endpoints with standard HTTP methods." },
              { title: "Webhooks", desc: "Real-time notifications for domain changes and events via webhook callbacks." },
              { title: "Rate Limits", desc: "10,000 calls per day with Enterprise plan and burst capacity for spikes." },
              { title: "SDKs", desc: "Official libraries for Python, Node.js, Go, and Ruby with full documentation." },
              { title: "Sandbox", desc: "Test environment for development and integration testing before going live." },
              { title: "Documentation", desc: "Complete API reference with code examples, tutorials, and best practices." },
            ].map((item) => (
              <div key={item.title} className="bg-[#FAF7F2] rounded-xl p-5 md:p-6">
                <h3 className="text-base font-bold text-[#111] mb-1.5">{item.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#111] to-[#2A2A2A] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Build?
        </h2>
        <p className="text-base text-white/70 mb-8">
          Get your API key and start integrating domain intelligence today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold border-none cursor-pointer"
          >
            Get API Key
          </button>
          <Link
            href="/help/api"
            className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center"
          >
            View API Docs
          </Link>
        </div>
      </section>

      {/* Create Account Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl p-8 md:p-10 max-w-md w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-[#9E2A2B] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-3">Get Your API Key</h2>
            <p className="text-base text-[#666] mb-6 leading-relaxed">
              Create a free account to get your API key and start building with
              domain intelligence data.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-[#9E2A2B] text-white px-8 py-3.5 rounded-lg text-base font-semibold no-underline mb-4"
            >
              Create Free Account
            </Link>
            <div>
              <button
                onClick={() => setShowModal(false)}
                className="bg-transparent border-none text-[#999] text-sm cursor-pointer underline"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
