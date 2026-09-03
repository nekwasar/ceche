"use client";

const features = [
  "Hand-picked by domain experts",
  "Full intelligence report included",
  "Verified ownership and clean history",
  "Instant purchase with secure checkout",
  "Negotiation tools for making offers",
  "Guided transfer with registrar support",
];

const steps = [
  { num: "1", title: "Browse Listings", desc: "Each curated domain includes valuation, SEO metrics, and commercial intent score." },
  { num: "2", title: "Make an Offer", desc: "Buy outright or submit an offer. Our system handles counter-offers automatically." },
  { num: "3", title: "Complete Purchase", desc: "Secure payment. Domain transfers within 24 hours with full support." },
];

export default function CuratedPage() {
  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 pb-20 md:pb-24 lg:pb-32">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20 items-center">
          <div className="lg:col-span-3">
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#999] block mb-3">
              Marketplace
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#111] mb-4 leading-tight">
              Curated Domains
            </h1>
            <p className="text-base md:text-lg text-[#666] mb-6 md:mb-7 leading-relaxed">
              Hand-picked premium domains sorted by commercial intent and SEO authority. Each listing includes a full intelligence report and valuation.
            </p>
            <a
              href="/marketplace/try-your-luck"
              className="inline-block px-8 py-3.5 bg-[#9E2A2B] text-white rounded-[10px] font-semibold text-sm no-underline"
            >
              Try Your Luck Instead
            </a>
          </div>

          {/* Featured Card */}
          <div className="lg:col-span-2 bg-[#EFECE6] rounded-[20px] p-6 md:p-8 lg:p-9 border border-black/5">
            <div className="mb-5 md:mb-6">
              <div className="text-[10px] font-mono text-[#999] uppercase mb-1">Featured Domain</div>
              <div className="text-2xl md:text-[28px] font-bold text-[#9E2A2B] mb-1">██████████.com</div>
              <div className="text-xs text-[#999]">Name hidden until purchase</div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-6">
              {[
                { label: "Valuation", value: "$87,500" },
                { label: "DA Score", value: "72" },
                { label: "Spam Score", value: "0/100" },
                { label: "CPC", value: "$24.80" },
                { label: "Backlinks", value: "14,200" },
                { label: "Age", value: "12 years" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-[10px] font-mono text-[#999] uppercase mb-0.5">{stat.label}</div>
                  <div className="text-lg md:text-xl font-bold text-[#111]">{stat.value}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between py-3.5 px-5 bg-[#111] rounded-xl">
              <span className="text-sm font-semibold text-white">Instant Purchase</span>
              <span className="text-sm font-bold text-[#F4A261]">$87,500</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {features.map((f) => (
              <div key={f} className="bg-[#EFECE6] rounded-[14px] px-5 py-4 md:py-5 border border-black/5 flex items-start gap-3">
                <span className="text-[#047857] font-bold text-base leading-none mt-0.5 shrink-0">✓</span>
                <span className="text-sm text-[#111]">{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-6 md:mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`py-6 md:py-8 px-6 md:px-7 ${i < steps.length - 1 ? "sm:border-r sm:border-black/8 border-b sm:border-b-0 border-black/8 pb-6 sm:pb-0 mb-6 sm:mb-0" : ""}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#9E2A2B] text-white flex items-center justify-center text-xl font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[#111] mb-2">{step.title}</h3>
                <p className="text-sm text-[#666] m-0 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 md:mt-20 bg-[#111] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Browse all curated domains</h2>
          <p className="text-base text-white/60 mb-7">
            Updated weekly with new hand-picked premium domains.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/marketplace" className="inline-block px-8 py-3.5 bg-[#F4A261] text-[#111] rounded-[10px] font-semibold text-sm no-underline text-center">
              View Marketplace
            </a>
            <a href="/marketplace/try-your-luck" className="inline-block px-8 py-3.5 border border-white/30 text-white rounded-[10px] font-semibold text-sm no-underline text-center">
              Try Your Luck
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
