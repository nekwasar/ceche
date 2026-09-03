"use client";

import { useState } from "react";
import Link from "next/link";
import PremiumGateModal from "@/components/layout/PremiumGateModal";
import { BarChart3, Link2, AlertTriangle, Search, Wrench, TrendingUp } from "lucide-react";

export default function SeoScannerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <PremiumGateModal toolName="SEO Scanner" />

      {/* Split Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[auto] md:min-h-[480px]">
        {/* Left - Content */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
          <span className="inline-block bg-[#9E2A2B] text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider mb-5 w-fit">
            SEO SCANNER
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 leading-tight">
            SEO Scanner
          </h1>
          <p className="text-base md:text-lg text-[#666] mb-8 leading-relaxed">
            Domain and SEO audit with DA, spam score, backlink profiles,
            and indexation status. Get instant insights into any domain&apos;s
            search engine health.
          </p>

          {/* Search Form */}
          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter domain to scan"
              className="flex-1 px-4 py-3.5 text-sm rounded-lg border-2 border-gray-200 outline-none focus:border-[#9E2A2B] transition-colors"
            />
            <button
              type="submit"
              disabled={isScanning}
              className="px-7 py-3.5 text-sm font-bold rounded-lg border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 bg-[#9E2A2B] text-white whitespace-nowrap"
            >
              {isScanning ? "Scanning..." : "Scan Now"}
            </button>
          </form>
        </div>

        {/* Right - Scan Limits */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F]">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8">
            Scan Limits
          </h2>
          {[
            { plan: "Startup", scans: "30 per day", price: "$79/mo" },
            { plan: "Enterprise", scans: "Unlimited", price: "$129/mo" },
          ].map((item) => (
            <div
              key={item.plan}
              className="bg-white/10 rounded-lg p-4 mb-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold text-sm">{item.plan}</span>
                <span className="text-[#F4A261] font-bold text-sm">{item.price}</span>
              </div>
              <p className="text-white/70 text-xs mt-1">{item.scans}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Flow */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-10 md:mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { step: "01", title: "Enter Domain", desc: "Type any domain name into the search bar above." },
            { step: "02", title: "Run Analysis", desc: "Our engine scans 16 dimensions of domain health instantly." },
            { step: "03", title: "Get Report", desc: "View detailed SEO metrics, backlink data, and spam scores." },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-xl p-6 md:p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <div className="w-12 h-12 bg-[#9E2A2B] rounded-full flex items-center justify-center mx-auto mb-5 text-white font-extrabold text-lg">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-[#111] mb-2">{item.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Scan Result Sections */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-10 md:mb-12">
            What You Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {[
              { icon: BarChart3, title: "Domain Authority & Page Authority", desc: "DA and PA metrics with historical trends showing domain strength over time." },
              { icon: Link2, title: "Backlink Profile", desc: "Complete backlink analysis with referring domains and anchor text distribution." },
              { icon: AlertTriangle, title: "Spam Score", desc: "Machine learning spam detection with penalty risk assessment and recommendations." },
              { icon: Search, title: "Indexation Status", desc: "Search engine indexation checks across Google, Bing, and Yandex." },
              { icon: Wrench, title: "Technical SEO", desc: "Core Web Vitals, mobile-friendliness, and structured data analysis." },
              { icon: TrendingUp, title: "Competitor Analysis", desc: "Compare domain metrics against top competitors in your niche." },
            ].map((item) => (
              <div key={item.title} className="bg-[#FAF7F2] rounded-xl p-6 md:p-7">
                <div className="mb-3"><item.icon className="w-8 h-8 text-[#9E2A2B]" /></div>
                <h3 className="text-base font-bold text-[#111] mb-2">{item.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="bg-white rounded-xl p-6 md:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5">
            What&apos;s Included
          </h2>
          <ul className="list-none p-0 m-0">
            {[
              "DA and PA metrics with historical trends",
              "Complete backlink analysis with referring domains",
              "Machine learning spam detection with penalty risk assessment",
              "Search engine indexation checks across Google, Bing, and Yandex",
              "Core Web Vitals, mobile-friendliness, and structured data analysis",
              "Competitor comparison against top domains in your niche",
            ].map((item, i) => (
              <li
                key={i}
                className="py-3 border-b border-gray-100 text-[#666] text-sm flex items-start gap-3"
              >
                <span className="text-[#047857] font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/tools/extended-insights"
            className="inline-block mt-6 text-[#9E2A2B] font-semibold text-sm no-underline hover:underline"
          >
            Need deeper analysis? Try Extended Insights →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready for Deeper Analysis?
        </h2>
        <p className="text-base text-white/80 mb-8">
          Upgrade to access historical data, bulk scanning, and API integrations.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/pricing"
            className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold no-underline text-center"
          >
            View Pricing
          </Link>
          <Link
            href="/tools/extended-insights"
            className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center"
          >
            View Extended Insights
          </Link>
        </div>
      </section>
    </div>
  );
}
