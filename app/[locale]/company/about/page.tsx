"use client";

export default function AboutPage() {
  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      {/* Dark Hero */}
      <section className="bg-[#111] py-16 md:py-20 lg:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(158,42,43,0.25) 0%, transparent 70%)" }} />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#F4A261] mb-4">
            About Ceche
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-tight mx-auto mb-5 max-w-lg">
            Built for investors who trade on data
          </h1>
          <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-md mx-auto">
            The domain marketplace where premium names are bought and sold—powered by real intelligence, not guesswork.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8 md:mt-9">
            <a href="/tools/appraisal" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4A261] text-[#111] font-semibold text-sm no-underline">
              Try Appraisal →
            </a>
            <a href="/marketplace" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-semibold text-sm no-underline">
              Browse Marketplace
            </a>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#EFECE6] rounded-[20px] p-8 md:p-12 lg:p-14">
            <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#999] mb-3">
              Our Origin
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111] m-0 mb-6 leading-tight">
              Founded by a domain investor who saw the market needed better data
            </h2>
            <p className="text-sm md:text-base text-[#666] leading-relaxed mb-4">
              The domain aftermarket generates over $3 billion in annual transactions, yet most marketplaces are opaque, inflated by scrapers, and built on intuition rather than data. Ceche was created to fix that.
            </p>
            <p className="text-sm md:text-base text-[#666] leading-relaxed">
              We combined the intelligence of a research platform with the transaction mechanics of a marketplace. You evaluate the numbers first—estimated value, health score, CPC, brandability—and the name only appears when you pay to reveal it. Every valuation is backed by a published methodology and a verifiable dataset.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="pb-12 md:pb-16 lg:pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-full bg-[#9E2A2B] flex items-center justify-center">
                <span className="text-[28px] font-bold text-white">NU</span>
              </div>
            </div>
            <div className="flex-1 min-w-[300px]">
              <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#999] mb-2">
                Founder
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[#111] m-0 mb-3">
                Nekwasachukwu Ucheokoye
              </h2>
              <p className="text-sm text-[#666] leading-relaxed">
                Domain name investor &amp; reseller managing 100+ domains. Agentic &amp; systems engineer building intelligent infrastructure for the domain industry. Based in Awka, Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-12 md:pb-16 lg:pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#EFECE6] rounded-[20px] p-8 md:p-12 lg:p-14">
            <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#999] mb-3">
              What We Believe
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#111] m-0 mb-8 md:mb-10">
              Three principles that drive every decision
            </h2>

            <div className="flex flex-col gap-6 md:gap-8">
              {[
                { num: "1", title: "Transparency", desc: "We publish our methodology, data sources, and accuracy metrics. Users who understand how we work trust us more than users who are asked to take our word for it." },
                { num: "2", title: "Data Rigor", desc: "Every claim we make is backed by data. Every tool produces measurable outputs. We do not rely on intuition when data is available." },
                { num: "3", title: "Speed", desc: "We ship fast and iterate. Perfection is the enemy of progress—we aim for good enough to ship and improve from there." },
              ].map((v) => (
                <div key={v.num} className="flex gap-5 items-start">
                  <div className="w-9 h-9 rounded-lg bg-[#9E2A2B] flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">{v.num}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111] m-0 mb-2">{v.title}</h3>
                    <p className="text-sm text-[#666] leading-relaxed m-0">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to find your next domain?</h2>
          <p className="text-base text-[#999] mb-8">Every name is backed by data. The marketplace is open.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/marketplace" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4A261] text-[#111] font-semibold text-sm no-underline">
              Browse Marketplace →
            </a>
            <a href="/pricing" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-semibold text-sm no-underline">
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
