"use client";

import { useState } from "react";
import { Eye, Search, Filter, ArrowRight, Lock } from "lucide-react";

// Mock data for demonstration
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

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("value");

  const filteredListings = mockListings.filter(
    (l) => activeFilter === "all" || l.tld === `.${activeFilter}`
  );

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
            Marketplace
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#111111" }}>
            Premium Domains
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "#666666" }}>
            Browse our curated inventory. Full stats shown — name hidden. Pay to reveal.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" style={{ color: "#999999" }} />
            <span className="text-sm font-medium" style={{ color: "#666666" }}>Filter:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.value
                  ? "bg-[#9E2A2B] text-white"
                  : "bg-[#EFECE6] text-[#666666] hover:bg-[#E5DFD3]"
              }`}
            >
              {filter.label}
            </button>
          ))}
          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#EFECE6] border border-black/10"
              style={{ color: "#666666" }}
            >
              <option value="value">Sort by Value</option>
              <option value="score">Sort by Score</option>
              <option value="listed">Sort by Listed</option>
            </select>
          </div>
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-[#EFECE6] rounded-2xl p-6 border border-black/5 hover:border-black/10 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Lock className="w-4 h-4" style={{ color: "#999999" }} />
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "#999999" }}>
                      Name Hidden
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E5DFD3]" style={{ color: "#666666" }}>
                      {listing.tld}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E5DFD3]" style={{ color: "#666666" }}>
                      {listing.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase" style={{ color: "#999999" }}>Value</div>
                      <div className="text-lg font-bold" style={{ color: "#111111" }}>{listing.value}</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase" style={{ color: "#999999" }}>Score</div>
                      <div className="text-lg font-bold" style={{ color: "#111111" }}>{listing.score}</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase" style={{ color: "#999999" }}>Health</div>
                      <div className="text-lg font-bold" style={{ color: "#111111" }}>{listing.health}</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase" style={{ color: "#999999" }}>CPC</div>
                      <div className="text-lg font-bold" style={{ color: "#111111" }}>{listing.cpc}</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase" style={{ color: "#999999" }}>DA</div>
                      <div className="text-lg font-bold" style={{ color: "#111111" }}>{listing.da}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs" style={{ color: "#999999" }}>
                    {listing.intent} • Listed {listing.listed}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]">
                    <Eye className="w-4 h-4" />
                    Reveal Name
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-12 bg-[#EFECE6] rounded-2xl p-8 border border-black/5">
          <div className="grid md:grid-cols-3 gap-0">
            <div className="md:border-r border-black/10 md:pr-8 pb-6 md:pb-0 border-b md:border-b-0">
              <h3 className="font-bold mb-1" style={{ color: "#111111" }}>No Name Hints</h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                We show everything except the name. No asterisks, no partial reveals. Just the intelligence.
              </p>
            </div>
            <div className="md:px-8 pb-6 md:pb-0 border-b md:border-b-0">
              <h3 className="font-bold mb-1" style={{ color: "#111111" }}>Pay to Reveal</h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                Reveal price varies by domain value — from $5 for lower-value names to $50 for premium picks.
              </p>
            </div>
            <div className="md:pl-8">
              <h3 className="font-bold mb-1" style={{ color: "#111111" }}>Register Anywhere</h3>
              <p className="text-sm" style={{ color: "#666666" }}>
                After reveal, we link you to Dynadot, Namecheap, or Porkbun. You choose where to register.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
