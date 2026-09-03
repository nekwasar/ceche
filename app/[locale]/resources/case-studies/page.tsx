"use client";

export default function CaseStudiesPage() {
  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 md:-right-16 text-[200px] md:text-[280px] font-black text-[rgba(158,42,43,0.05)] leading-none font-[Georgia,serif] pointer-events-none select-none">
          CS
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#9E2A2B] mb-5">
            Case Studies
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black text-[#111] leading-[1.05] font-[Georgia,serif] m-0 mb-6">
            Real investors.<br />Real outcomes.
          </h1>

          <div className="w-16 h-[3px] bg-[#F4A261] mb-8" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-[1] min-w-[300px]">
              <p className="text-base md:text-lg text-[#666] leading-relaxed m-0">
                See how domain investors, startups, and portfolio managers use Ceche to make faster, smarter decisions. Every case study is backed by real numbers—no cherry-picked success stories.
              </p>
            </div>
            <div className="flex-[1] min-w-[200px] flex gap-8 md:gap-10 items-start">
              <div>
                <span className="block text-3xl font-bold text-[#9E2A2B] leading-none">4.2K+</span>
                <span className="text-xs text-[#999]">Active Users</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#9E2A2B] leading-none">98%</span>
                <span className="text-xs text-[#999]">Accuracy Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[#EFECE6] rounded-[20px] p-8 md:p-12 lg:p-16 border border-[#E8E5DE]">
            <div className="w-16 h-16 rounded-2xl bg-[#9E2A2B] inline-flex items-center justify-center mb-7">
              <span className="text-[28px]">📊</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111] m-0 mb-4">Case studies coming soon</h2>
            <p className="text-base text-[#666] leading-relaxed max-w-lg mx-auto mb-8">
              We&apos;re documenting how investors are using Ceche&apos;s tools to find undervalued domains, negotiate smarter, and close deals faster. Check back soon for in-depth breakdowns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="/tools/appraisal" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#9E2A2B] text-white font-semibold text-sm no-underline">
                Try Appraisal Tool →
              </a>
              <a href="/marketplace" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#111] text-white font-semibold text-sm no-underline">
                Explore Marketplace
              </a>
              <a href="/pricing" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#9E2A2B] text-[#9E2A2B] font-semibold text-sm no-underline">
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#111] py-12 md:py-16 px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Have a story to share?</h2>
          <p className="text-sm text-[#999] mb-7">We&apos;d love to feature your experience with Ceche.</p>
          <a href="/resources/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4A261] text-[#111] font-semibold text-sm no-underline">
            Get in Touch →
          </a>
        </div>
      </section>
    </main>
  );
}
