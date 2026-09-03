"use client";

import { useState, useEffect } from "react";

const mockListings = [
  { id: "1", value: "$15,200", score: "92", health: "85/100", cpc: "$8.50", da: "45", tld: ".com", category: "Tech", intent: "High commercial", listed: "2 days ago" },
  { id: "2", value: "$8,400", score: "87", health: "78/100", cpc: "$5.20", da: "32", tld: ".io", category: "SaaS", intent: "High commercial", listed: "5 days ago" },
  { id: "3", value: "$22,100", score: "95", health: "91/100", cpc: "$12.00", da: "58", tld: ".com", category: "Finance", intent: "Premium keyword", listed: "1 day ago" },
  { id: "4", value: "$3,800", score: "74", health: "65/100", cpc: "$2.80", da: "18", tld: ".net", category: "Business", intent: "Medium commercial", listed: "1 week ago" },
  { id: "5", value: "$45,000", score: "98", health: "94/100", cpc: "$18.50", da: "72", tld: ".com", category: "E-commerce", intent: "Premium keyword", listed: "3 hours ago" },
  { id: "6", value: "$6,200", score: "81", health: "72/100", cpc: "$4.10", da: "28", tld: ".co", category: "Startup", intent: "High commercial", listed: "4 days ago" },
];

const filters = [
  { label: "All TLDs", value: "all" },
  { label: ".com", value: "com" },
  { label: ".net", value: "net" },
  { label: ".io", value: "io" },
  { label: ".co", value: "co" },
];

const stats = [
  { label: "Listed Domains", value: "2,847" },
  { label: "Revealed Today", value: "142" },
  { label: "Avg. Domain Value", value: "$12,400" },
  { label: "Total Sold", value: "$3.2M" },
];

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("value");
  const [showModal, setShowModal] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(2);

  useEffect(() => {
    if (!showModal) return;
    const interval = setInterval(() => {
      setModalCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = "/signup";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showModal]);

  const filteredListings = mockListings.filter(
    (l) => activeFilter === "all" || l.tld === `.${activeFilter}`
  );

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 pb-20 md:pb-24 lg:pb-32">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#999] block mb-3">
            Marketplace
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111] mb-4">Premium Domains</h1>
          <p className="text-base md:text-lg text-[#666] max-w-md">
            Browse our curated inventory. Full stats shown — name hidden. Pay to reveal.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#EFECE6] rounded-[14px] px-5 py-4 md:py-5 border border-black/5">
              <div className="text-[11px] font-mono text-[#999] uppercase mb-1.5">{s.label}</div>
              <div className="text-xl md:text-2xl font-bold text-[#111]">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 md:gap-3 mb-5 md:mb-6">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold border-none cursor-pointer transition-colors ${
                activeFilter === filter.value
                  ? "bg-[#9E2A2B] text-white"
                  : "bg-[#EFECE6] text-[#666]"
              }`}
            >
              {filter.label}
            </button>
          ))}
          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold bg-[#EFECE6] border border-black/10 text-[#666] cursor-pointer"
            >
              <option value="value">Sort by Value</option>
              <option value="score">Sort by Score</option>
              <option value="listed">Sort by Listed</option>
            </select>
          </div>
        </div>

        {/* Listings */}
        <div className="flex flex-col gap-3">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-[#EFECE6] rounded-2xl p-5 md:p-6 md:px-7 border border-black/5"
            >
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-3.5">
                <span className="text-[11px] font-mono text-[#999] uppercase">🔒 Name Hidden</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#E5DFD3] text-[#666]">{listing.tld}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#E5DFD3] text-[#666]">{listing.category}</span>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-3 md:mb-3.5">
                {[
                  { label: "Value", val: listing.value },
                  { label: "Score", val: listing.score },
                  { label: "Health", val: listing.health },
                  { label: "CPC", val: listing.cpc },
                  { label: "DA", val: listing.da },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-[10px] font-mono text-[#999] uppercase mb-0.5">{item.label}</div>
                    <div className="text-base md:text-lg font-bold text-[#111]">{item.val}</div>
                  </div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#999]">
                  {listing.intent} • Listed {listing.listed}
                </span>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full font-semibold text-xs md:text-sm border-none cursor-pointer bg-[#9E2A2B] text-white"
                >
                  👁 Reveal Name
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-10 md:mt-12 bg-[#EFECE6] rounded-2xl p-6 md:p-8 border border-black/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:pr-8 md:border-r md:border-black/10">
              <h3 className="text-sm font-bold text-[#111] mb-1.5">No Name Hints</h3>
              <p className="text-xs text-[#666] leading-relaxed m-0">
                We show everything except the name. No asterisks, no partial reveals. Just the intelligence.
              </p>
            </div>
            <div className="md:px-8 md:border-r md:border-black/10">
              <h3 className="text-sm font-bold text-[#111] mb-1.5">Pay to Reveal</h3>
              <p className="text-xs text-[#666] leading-relaxed m-0">
                Reveal price varies by domain value — from $5 for lower-value names to $50 for premium picks.
              </p>
            </div>
            <div className="md:pl-8">
              <h3 className="text-sm font-bold text-[#111] mb-1.5">Register Anywhere</h3>
              <p className="text-xs text-[#666] leading-relaxed m-0">
                After reveal, we link you to Dynadot, Namecheap, or Porkbun. You choose where to register.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a href="/marketplace/curated" className="inline-block px-7 py-3 bg-[#9E2A2B] text-white rounded-lg font-semibold text-sm no-underline text-center">
            Browse Curated
          </a>
          <a href="/marketplace/try-your-luck" className="inline-block px-7 py-3 border border-black/15 text-[#111] rounded-lg font-semibold text-sm no-underline text-center">
            Try Your Luck
          </a>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-[20px] p-8 md:p-10 max-w-[420px] w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-2">Create an Account</h2>
            <p className="text-sm text-[#666] mb-4">Sign up to reveal domain names and make purchases.</p>
            <div className="bg-[#FAF7F2] rounded-lg p-3 mb-4">
              <p className="text-xs text-[#999]">Redirecting to signup in {modalCountdown} seconds...</p>
            </div>
            <a href="/signup" className="inline-block px-8 py-3.5 bg-[#9E2A2B] text-white rounded-[10px] font-semibold text-sm no-underline mb-3">
              Sign Up Free
            </a>
            <div>
              <button
                onClick={() => setShowModal(false)}
                className="bg-transparent border-none text-[#999] text-xs cursor-pointer mt-2"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
