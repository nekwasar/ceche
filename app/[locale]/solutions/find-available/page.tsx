import Link from "next/link";

export default function FindAvailablePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      {/* Large Stat Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 text-center">
        <div className="text-7xl md:text-8xl lg:text-[120px] font-black text-[#9E2A2B] leading-none mb-2">4</div>
        <div className="text-base md:text-lg font-semibold text-[#666] mb-3">TLDs Scanned Simultaneously</div>
        <p className="text-base text-[#999] mb-8 md:mb-10">.com · .io · .co · .ai</p>
        <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold leading-tight mb-4">
          Find Available Domains
          <br />
          in Seconds
        </h1>
        <p className="text-base md:text-lg text-[#666] max-w-xl mx-auto leading-relaxed">
          Scan millions of combinations for available domain names. Smart
          suggestions, real-time availability checks, and price comparisons
          across registrars.
        </p>
      </section>

      {/* 2-col: Text + Filter List */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-4">Smart Domain Discovery</h2>
          <p className="text-base text-[#666] leading-relaxed mb-5">
            Enter keywords, industry, or a brand concept and Ceche will
            generate hundreds of available options. Filter by length, TLD,
            price range, and brandability score.
          </p>
          <p className="text-base text-[#666] leading-relaxed mb-8">
            Every result includes a 16-dimension score, so you know which
            domains have real market potential — not just availability.
          </p>
          <Link href="/signup" className="inline-block px-7 py-3.5 bg-[#9E2A2B] text-white rounded-lg text-sm font-bold no-underline">
            Start Searching Free
          </Link>
        </div>

        <div className="bg-white border border-[#E8E5DF] rounded-xl p-6 md:p-7">
          <h3 className="text-base font-bold mb-4 text-[#111]">Filter Options</h3>
          {[
            { label: "TLD", value: ".com, .io, .co, .ai" },
            { label: "Max Length", value: "Up to 15 characters" },
            { label: "Price Range", value: "$8 – $500/yr" },
            { label: "Brandability", value: "High / Medium / Low" },
            { label: "Buyer Intent", value: "Score 0–100" },
            { label: "Availability", value: "Instant check" },
            { label: "Price Comparison", value: "Multi-registrar" },
          ].map((f, i) => (
            <div key={f.label} className={`flex justify-between py-3 text-sm ${i < 6 ? "border-b border-[#E8E5DF]" : ""}`}>
              <span className="font-semibold text-[#111]">{f.label}</span>
              <span className="text-[#666]">{f.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Timeline */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl font-bold text-center mb-8 md:mb-10">Never Miss a Domain</h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          {[
            { step: "1", title: "Set Your Criteria", desc: "Define keywords, TLDs, price range, and brandability thresholds." },
            { step: "2", title: "Monitor & Alert", desc: "Ceche scans daily and alerts you when matching domains appear." },
            { step: "3", title: "Acquire Instantly", desc: "One-click registration or marketplace purchase with escrow protection." },
          ].map((s, i) => (
            <div key={s.step} className="relative flex-1 text-center px-5">
              {i < 2 && (
                <div className="hidden md:block absolute top-7 right-[-8px] w-4 h-0.5 bg-[#9E2A2B] z-10" />
              )}
              <div className="w-14 h-14 rounded-full bg-[#9E2A2B] text-white inline-flex items-center justify-center font-bold text-lg mb-4">
                {s.step}
              </div>
              <h3 className="text-base font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed max-w-[220px] mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tier Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            { name: "Free", price: "$0", features: ["3 domains/day", "Basic scoring", "1 TLD"], highlight: false },
            { name: "Startup", price: "$79/mo", features: ["12 domains/day", "Extended Insights", "4 TLDs"], highlight: true },
            { name: "Enterprise", price: "$129/mo", features: ["Unlimited scoring", "Bulk Analyzer", "API access"], highlight: false },
          ].map((p) => (
            <div key={p.name} className={`${p.highlight ? "bg-[#9E2A2B] text-white" : "bg-white text-[#111] border border-[#E8E5DF]"} rounded-xl p-6 md:p-7 text-center`}>
              {p.highlight && (
                <span className="inline-block px-3 py-1 bg-[#F4A261] text-[#111] rounded text-[11px] font-bold uppercase mb-3">Popular</span>
              )}
              <h3 className="text-lg font-bold mb-2">{p.name}</h3>
              <div className="text-3xl font-extrabold mb-4">{p.price}</div>
              <ul className="list-none p-0 m-0 mb-5">
                {p.features.map((f) => (
                  <li key={f} className={`text-sm py-1.5 ${p.highlight ? "text-white/90" : "text-[#666]"}`}>✓ {f}</li>
                ))}
              </ul>
              <Link href="/signup" className={`inline-block py-2.5 px-6 rounded-lg text-sm font-bold no-underline w-full text-center ${p.highlight ? "bg-white text-[#9E2A2B]" : "bg-[#111] text-white"}`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bulk Scan Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <div className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center p-8 md:p-12">
            <div>
              <span className="inline-block px-2.5 py-1 bg-[#F4A261] text-[#111] rounded text-[11px] font-bold uppercase mb-3">
                Enterprise Feature
              </span>
              <h2 className="text-2xl font-bold mb-3">Bulk Domain Scanner</h2>
              <p className="text-base text-[#666] leading-relaxed mb-3">
                Upload a CSV of up to 5,000 domains and get scored results in
                minutes. Perfect for portfolio audits and prospecting at scale.
              </p>
              <p className="text-sm text-[#999]">
                Available on Enterprise plan ($129/mo). Includes API access with 10,000 calls/day.
              </p>
            </div>
            <div className="bg-[#FAF7F2] rounded-xl p-6 md:p-8 font-mono text-xs leading-relaxed text-[#666]">
              <div className="text-[#9E2A2B] font-bold mb-2">// Bulk scan output</div>
              <div>Domain: startupai.com</div>
              <div>Score: 87/100</div>
              <div>TLD: .com ✓</div>
              <div>Brandability: High</div>
              <div>Price Range: $12–$15/yr</div>
              <div>─────</div>
              <div>Domain: hellocorp.io</div>
              <div>Score: 72/100</div>
              <div>TLD: .io ✓</div>
              <div>Brandability: Medium</div>
              <div>Price Range: $35–$45/yr</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">Find Your Perfect Domain</h2>
        <p className="text-base md:text-lg text-white/70 mb-8">Start with 3 free domain searches per day.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-8 py-4 bg-[#9E2A2B] text-white rounded-lg text-base font-bold no-underline text-center">
            Create Free Account
          </Link>
          <Link href="/tools/seo-scanner" className="inline-block px-8 py-4 bg-transparent text-[#F4A261] border-2 border-[#F4A261] rounded-lg text-base font-bold no-underline text-center">
            Try SEO Scanner
          </Link>
        </div>
      </section>
    </main>
  );
}
