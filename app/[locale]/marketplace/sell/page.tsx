"use client";

import { useState } from "react";

const steps = ["Submit", "Set Price", "Publish"];

const listingFees = [
  { tier: "Standard (.com, .net, .org)", fee: "$5", min: "—" },
  { tier: "Premium (.io, .co, .ai)", fee: "$10", min: "—" },
  { tier: "Ultra-Premium (1-word, brandable)", fee: "$25", min: "—" },
];

const commissions = [
  { tier: "Domains under $5,000", commission: "8%", minimum: "$50" },
  { tier: "Domains $5,000–$50,000", commission: "10%", minimum: "$200" },
  { tier: "Domains over $50,000", commission: "15%", minimum: "Negotiable" },
];

const eligibility = [
  "Domain must be registered and active",
  "You must verify ownership via TXT or CNAME record",
  "No active UDRP or legal disputes",
  "Domain must not be blacklisted for spam",
];

const sellerTools = [
  { title: "Analytics Dashboard", desc: "Track views, offers, and conversion rates for every listing in real time." },
  { title: "Bulk Listing", desc: "Import and manage multiple domain listings at once with CSV upload." },
  { title: "Automated Pricing", desc: "AI-powered suggested pricing based on domain metrics and market trends." },
];

export default function SellPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 pb-20 md:pb-24 lg:pb-32">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#999] block mb-3">
            Marketplace
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111] mb-4">Sell Your Domains</h1>
          <p className="text-base md:text-lg text-[#666] max-w-md">
            List your premium domains on Ceche and reach qualified buyers worldwide.
          </p>
        </div>

        {/* Step Tabs + Content */}
        <section className="mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row gap-0 mb-8 md:mb-10">
            {steps.map((step, i) => (
              <div
                key={step}
                onClick={() => setActiveStep(i)}
                className={`flex-1 py-3.5 px-5 cursor-pointer text-center font-semibold text-sm transition-colors ${
                  i === activeStep
                    ? "bg-[#9E2A2B] text-white"
                    : i < activeStep
                    ? "bg-[#7A1F21] text-white"
                    : "bg-[#EFECE6] text-[#666]"
                } ${i === 0 ? "rounded-t-xl sm:rounded-t-none sm:rounded-l-xl" : ""} ${
                  i === steps.length - 1 ? "rounded-b-xl sm:rounded-b-none sm:rounded-r-xl" : ""
                }`}
              >
                <span className="font-mono mr-2 opacity-60">{String(i + 1).padStart(2, "0")}</span>
                {step}
              </div>
            ))}
          </div>

          <div className="bg-[#EFECE6] rounded-2xl p-6 md:p-8 border border-black/5">
            {activeStep === 0 && (
              <div>
                <h3 className="text-lg font-bold text-[#111] mb-2">Submit Your Domain</h3>
                <p className="text-sm text-[#666] mb-4">
                  Enter your domain name. We&apos;ll run an automatic appraisal and verify ownership via TXT/CNAME record.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="yourdomain.com"
                    className="flex-1 px-4 py-3 rounded-[10px] border border-black/10 bg-white text-sm outline-none"
                  />
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-7 py-3 bg-[#9E2A2B] text-white rounded-[10px] font-semibold text-sm border-none cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div>
                <h3 className="text-lg font-bold text-[#111] mb-2">Set Your Price</h3>
                <p className="text-sm text-[#666] mb-4">
                  Our AI suggests a price based on domain metrics. You can accept or set your own.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#111]">$</span>
                    <input
                      type="text"
                      defaultValue="12,500"
                      className="w-full sm:w-40 px-4 py-3 rounded-[10px] border border-black/10 bg-white text-sm font-semibold outline-none"
                    />
                  </div>
                  <span className="text-xs text-[#999]">Suggested: $12,500</span>
                  <button
                    onClick={() => setActiveStep(2)}
                    className="sm:ml-auto px-7 py-3 bg-[#9E2A2B] text-white rounded-[10px] font-semibold text-sm border-none cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div>
                <h3 className="text-lg font-bold text-[#111] mb-2">Publish Listing</h3>
                <p className="text-sm text-[#666] mb-4">
                  Review your listing details and publish. Your domain goes live within 24 hours.
                </p>
                <button className="px-8 py-3.5 bg-[#047857] text-white rounded-[10px] font-semibold text-sm border-none cursor-pointer">
                  Publish Listing
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Fee Structure */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">Fee Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <h3 className="text-base font-bold text-[#111] mb-3">Listing Fees</h3>
              <div className="bg-[#EFECE6] rounded-[14px] overflow-hidden border border-black/5">
                {listingFees.map((f, i) => (
                  <div
                    key={f.tier}
                    className={`flex items-center justify-between px-5 py-3.5 ${i < listingFees.length - 1 ? "border-b border-black/6" : ""}`}
                  >
                    <span className="text-sm text-[#111]">{f.tier}</span>
                    <div className="flex items-center gap-4 shrink-0 ml-4">
                      <span className="text-sm font-bold text-[#9E2A2B]">{f.fee}</span>
                      <span className="text-xs text-[#999] w-8 text-right">{f.min}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111] mb-3">Commission Rates</h3>
              <div className="bg-[#EFECE6] rounded-[14px] overflow-hidden border border-black/5">
                {commissions.map((c, i) => (
                  <div
                    key={c.tier}
                    className={`flex items-center justify-between px-5 py-3.5 ${i < commissions.length - 1 ? "border-b border-black/6" : ""}`}
                  >
                    <span className="text-sm text-[#111]">{c.tier}</span>
                    <div className="flex items-center gap-4 shrink-0 ml-4">
                      <span className="text-sm font-bold text-[#9E2A2B]">{c.commission}</span>
                      <span className="text-xs text-[#999]">Min: {c.minimum}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">Eligibility Checklist</h2>
          <div className="bg-[#EFECE6] rounded-2xl p-6 md:p-7 border border-black/5">
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {eligibility.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#111]">
                  <span className="text-[#047857] font-bold">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Seller Tools */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">Seller Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sellerTools.map((tool) => (
              <div key={tool.title} className="bg-[#EFECE6] rounded-2xl p-6 md:p-7 border border-black/5">
                <h3 className="text-base font-bold text-[#111] mb-2">{tool.title}</h3>
                <p className="text-xs text-[#666] m-0">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#111] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to sell?</h2>
          <p className="text-base text-white/60 mb-7">List your first domain in under 5 minutes.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/signup" className="inline-block px-8 py-3.5 bg-[#F4A261] text-[#111] rounded-[10px] font-semibold text-sm no-underline text-center">
              Create Account
            </a>
            <a href="/pricing" className="inline-block px-8 py-3.5 border border-white/30 text-white rounded-[10px] font-semibold text-sm no-underline text-center">
              View Pricing
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
