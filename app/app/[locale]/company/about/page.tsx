"use client";

import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>

      {/* Section 1: Hero — What Ceche Does */}
      <section className="py-20" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-mono tracking-widest uppercase mb-4 block" style={{ color: "#F4A261" }}>
            About Ceche
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#FFFFFF" }}>
            The domain marketplace where premium names are bought and sold
          </h1>

          <div className="flex items-center justify-center gap-4 mt-8">
            <a href="/tools/appraisal" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#F4A261] text-[#111111] hover:bg-[#E9C46A]">
              Explore the Platform
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all border border-white/30 text-white hover:bg-white/10">
              Browse Marketplace
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: Origin Story — Two-Column with Timeline */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <div className="grid md:grid-cols-5 gap-12">
              {/* Left: Narrative */}
              <div className="md:col-span-3">
                <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#111111" }}>
                  The marketplace domain investors deserved
                </h2>

                <p className="text-base leading-relaxed mb-4" style={{ color: "#666666" }}>
                  Founded by a domain investor who saw the market needed better data. The domain aftermarket generates over $3 billion in annual transactions, yet most marketplaces are opaque, inflated by scrapers, and built on intuition rather than data.
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: "#666666" }}>
                  Real estate has Zillow. Stocks have Bloomberg. Domain names had Sedo and Afternic — marketplaces where visibility inflates prices and everyone sees the same undervalued names. Ceche was built to change that.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "#666666" }}>
                  We combined the intelligence of a research platform with the transaction mechanics of a marketplace. You evaluate the numbers first — estimated value, health score, CPC, brandability — and the name only appears when you pay to reveal it. Every valuation is backed by a published methodology and a verifiable dataset.
                </p>
              </div>

              {/* Right: Timeline */}
              <div className="md:col-span-2">
                <div className="relative pl-8 border-l-2 border-black/10">
                  <div className="relative mb-10">
                    <div className="absolute -left-[38px] w-4 h-4 rounded-full bg-[#9E2A2B]" />
                    <div className="text-sm font-bold mb-1" style={{ color: "#111111" }}>The Problem</div>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      Domain investors relied on gut instinct. Valuation tools produced numbers without context. Marketplaces inflated prices through visibility.
                    </p>
                  </div>

                  <div className="relative mb-10">
                    <div className="absolute -left-[38px] w-4 h-4 rounded-full bg-[#9E2A2B]" />
                    <div className="text-sm font-bold mb-1" style={{ color: "#111111" }}>The Insight</div>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      Intelligence should prove value before you commit. The name should stay hidden until the stats justify it.
                    </p>
                  </div>

                  <div className="relative mb-10">
                    <div className="absolute -left-[38px] w-4 h-4 rounded-full bg-[#9E2A2B]" />
                    <div className="text-sm font-bold mb-1" style={{ color: "#111111" }}>The Build</div>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      16-Dimension Framework. 50-worker scanner. Blind marketplace. Try Your Luck. Extended Insights. Built from scratch, one feature at a time.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[38px] w-4 h-4 rounded-full bg-[#F4A261]" />
                    <div className="text-sm font-bold mb-1" style={{ color: "#111111" }}>Today</div>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      The platform is live. Every tool works. The marketplace is open. The next feature is already in progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our People — Single Founder */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
            Our People
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#111111" }}>
            Built by one person with a clear vision
          </h2>

          <div className="bg-[#EFECE6] rounded-2xl p-8 border border-black/5 max-w-2xl">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-[#9E2A2B] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">NU</span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "#111111" }}>Nekwasachukwu Ucheokoye</h3>
                <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "#999999" }}>Founder & Builder</p>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  Domain name investor &amp; reseller managing 100+ domains. Agentic &amp; systems engineer. Building the N•Gen Era. Based in Awka, Nigeria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Values — Trimmed to 3 */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              What We Believe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: "#111111" }}>
              Principles that drive every decision
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#9E2A2B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#111111" }}>Transparency</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    We publish our methodology, data sources, and accuracy metrics. We do not hide behind black-box algorithms. Users who understand how we work trust us more than users who are asked to take our word for it.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#9E2A2B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#111111" }}>Data Rigor</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    Every claim we make is backed by data. Every tool produces measurable outputs. We do not rely on intuition when data is available.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#9E2A2B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#111111" }}>Speed</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    We ship fast and iterate. Perfection is the enemy of progress — we aim for &quot;good enough to ship&quot; and improve from there.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#111111" }}>
            The name you&apos;re looking for is already in our database
          </h2>
          <p className="mb-8" style={{ color: "#666666" }}>
            The question is whether you find it first.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]"
            >
              Browse Marketplace
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center px-6 py-3 rounded-full font-medium text-sm transition-all border border-black text-black hover:bg-black hover:text-white"
            >
              View Pricing
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-black/10 text-sm" style={{ color: "#999999" }}>
            <p>
              See our <a href="/legal/terms" className="underline" style={{ color: "#111111" }}>Terms of Service</a>,{" "}
              <a href="/legal/privacy" className="underline" style={{ color: "#111111" }}>Privacy Policy</a>, and{" "}
              <a href="/legal/cookies" className="underline" style={{ color: "#111111" }}>Cookie Policy</a>.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
