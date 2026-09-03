"use client";

import Link from "next/link";
import PremiumGateModal from "@/components/layout/PremiumGateModal";

export default function BulkAnalyzerPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <PremiumGateModal toolName="Bulk Analyzer" />

      {/* Split Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[auto] md:min-h-[480px]">
        {/* Left - Content */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
          <span className="inline-block bg-[#9E2A2B] text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider mb-5 w-fit">
            ENTERPRISE
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 leading-tight">
            Bulk Analyzer
          </h1>
          <p className="text-base md:text-lg text-[#666] mb-8 leading-relaxed">
            Multi-domain batch evaluation tool for portfolio analysis and
            large-scale domain research. Process thousands of domains in seconds.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#9E2A2B] text-white px-7 py-3.5 rounded-lg text-sm font-bold no-underline w-fit"
          >
            Get Bulk Access
          </Link>
        </div>

        {/* Right - Processing Speed */}
        <div className="flex flex-col justify-center items-center p-8 md:p-10 bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] text-center">
          <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-none mb-2">
            5,000
          </div>
          <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8">
            domains per batch
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { value: "16", label: "Dimensions" },
              { value: "4", label: "TLDs" },
              { value: "<3s", label: "Per Domain" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F4A261]">{stat.value}</div>
                <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Flow */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-10 md:mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {[
            { step: "1", title: "Upload List", desc: "Paste domains or upload a CSV file with up to 5,000 domains." },
            { step: "2", title: "Configure Scoring", desc: "Set custom weights for each of the 16 scoring dimensions." },
            { step: "3", title: "Process", desc: "Our engine evaluates all domains in parallel with priority queuing." },
            { step: "4", title: "Export Results", desc: "Download CSV with scores, pricing data, and priority rankings." },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-xl p-5 md:p-7 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <div className="w-10 h-10 bg-[#9E2A2B] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-extrabold text-base">
                {item.step}
              </div>
              <h3 className="text-sm md:text-base font-bold text-[#111] mb-2">{item.title}</h3>
              <p className="text-xs md:text-sm text-[#666] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Output Columns Table */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8">
            Output Columns
          </h2>
          <div className="bg-[#FAF7F2] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-[#9E2A2B]">
                    {["Column", "Description", "Example"].map((h) => (
                      <th key={h} className="py-3.5 px-5 text-left text-white font-bold text-xs uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Domain", "The domain name analyzed", "example.com"],
                    ["Domain Rating", "Authority score 0-100", "72"],
                    ["SEO Score", "Composite (backlink 40%, traffic 30%, keyword 20%, technical 10%)", "68"],
                    ["Buyer Intent", "Score 0-100 indicating purchase likelihood", "45"],
                    ["Priority Score", "Combined ranking across all dimensions", "High"],
                    ["Estimated Value", "Fair market value range", "$2,400 - $3,600"],
                  ].map(([col, desc, ex], i) => (
                    <tr key={col} className={`border-b border-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-[#FAF7F2]"}`}>
                      <td className="py-3.5 px-5 font-semibold text-[#111] text-sm">{col}</td>
                      <td className="py-3.5 px-5 text-[#666] text-sm">{desc}</td>
                      <td className="py-3.5 px-5 text-[#999] font-mono text-xs">{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Score Breakdown */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8">
          Priority Score Breakdown
        </h2>
        <div className="flex flex-col gap-3 md:gap-4">
          {[
            { dim: "Backlink Profile", weight: "40%", bar: 40 },
            { dim: "Traffic Analysis", weight: "30%", bar: 30 },
            { dim: "Keyword Metrics", weight: "20%", bar: 20 },
            { dim: "Technical SEO", weight: "10%", bar: 10 },
          ].map((item) => (
            <div
              key={item.dim}
              className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            >
              <span className="w-28 md:w-40 font-semibold text-[#111] text-sm shrink-0">{item.dim}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div className="h-full bg-[#9E2A2B] rounded" style={{ width: `${item.bar}%` }} />
              </div>
              <span className="w-10 text-right font-bold text-[#9E2A2B] text-sm">{item.weight}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Scoring */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-4">
            Custom Scoring
          </h2>
          <p className="text-base text-[#666] leading-relaxed mb-8">
            Weight dimensions based on your specific use case. Whether you
            prioritize SEO metrics, traffic potential, or buyer intent, adjust
            the scoring to match your portfolio strategy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { title: "Investor Mode", desc: "Maximize ROI with traffic and value focus" },
              { title: "Developer Mode", desc: "Prioritize technical metrics and authority" },
              { title: "Brand Mode", desc: "Emphasize trademark safety and memorability" },
            ].map((item) => (
              <div key={item.title} className="bg-[#FAF7F2] rounded-xl p-5 md:p-6 text-left">
                <h3 className="text-sm font-bold text-[#111] mb-1.5">{item.title}</h3>
                <p className="text-xs text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Scale Your Domain Research?
        </h2>
        <p className="text-base text-white/80 mb-8">
          Process up to 5,000 domains per batch with Enterprise access.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold no-underline text-center"
          >
            Start Enterprise Trial
          </Link>
          <Link
            href="/tools/domain-lookup"
            className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center"
          >
            Try Single Domain Lookup
          </Link>
        </div>
      </section>
    </div>
  );
}
