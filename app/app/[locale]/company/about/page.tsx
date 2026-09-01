"use client";

import { ArrowRight, Globe, Shield, BarChart3, Users, TrendingUp, Eye, Zap, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>

      {/* Section 1: Hero — Mission + Stat Counters */}
      <section className="py-20" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-mono tracking-widest uppercase mb-4 block" style={{ color: "#F4A261" }}>
            About Ceche
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#FFFFFF" }}>
            The domain marketplace where premium names are bought and sold
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-12" style={{ color: "#999999" }}>
            Every listing shows full intelligence — estimated value, health score, CPC, brandability — but the name stays hidden until you pay to reveal it. No auction inflation. No sniping.
          </p>

          {/* Stat Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "#F4A261" }}>180K+</div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#999999" }}>registered users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "#F4A261" }}>47.3M</div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#999999" }}>domain transactions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "#F4A261" }}>84.7%</div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#999999" }}>valuation accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "#F4A261" }}>28</div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#999999" }}>team members</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <a href="/tools/appraisal" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#F4A261] text-[#111111] hover:bg-[#E9C46A]">
              Explore the Platform
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/company/careers" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all border border-white/30 text-white hover:bg-white/10">
              Open Roles
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
                  The domain aftermarket generates over $3 billion in annual transactions, yet most marketplaces are opaque, inflated by scrapers, and built on intuition rather than data. Real estate has Zillow. Stocks have Bloomberg. Domain names had Sedo and Afternic — marketplaces where visibility inflates prices and everyone sees the same undervalued names.
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: "#666666" }}>
                  Ceche was built to change that. We combined the intelligence of a research platform with the transaction mechanics of a marketplace. You evaluate the numbers first — estimated value, health score, CPC, brandability — and the name only appears when you pay to reveal it.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "#666666" }}>
                  Every valuation is backed by a published methodology (the 16-Dimension Framework), a verifiable dataset (47.3 million confirmed transactions), and a measurable accuracy rate (84.7% within a 20% margin of error). We do not ask you to trust us — we ask you to verify our work.
                </p>

                <h3 className="text-xl font-bold mb-3" style={{ color: "#111111" }}>The insight</h3>
                <p className="text-base leading-relaxed" style={{ color: "#666666" }}>
                  We spent 18 months building the 16-Dimension Valuation Framework, validating it against 47.3 million confirmed transactions, and testing it against competitor tools. When we launched, our valuation accuracy immediately exceeded GoDaddy GoValue (67.2%) and EstiBot (58.9%). We publish our methodology because transparency builds trust. We publish our accuracy reports because accountability drives improvement.
                </p>
              </div>

              {/* Right: Timeline */}
              <div className="md:col-span-2">
                <div className="relative pl-8 border-l-2 border-black/10">
                  {/* 2023 */}
                  <div className="relative mb-10">
                    <div className="absolute -left-[38px] w-4 h-4 rounded-full bg-[#9E2A2B]" />
                    <div className="text-sm font-bold mb-1" style={{ color: "#111111" }}>2023</div>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      Ceche founded. Began building the 16-Dimension Framework. Assembled founding team of domain veterans and data scientists.
                    </p>
                  </div>

                  {/* 2024 */}
                  <div className="relative mb-10">
                    <div className="absolute -left-[38px] w-4 h-4 rounded-full bg-[#9E2A2B]" />
                    <div className="text-sm font-bold mb-1" style={{ color: "#111111" }}>2024</div>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      Launched the platform. 16-Dimension Framework, SEO Scanner, free appraisals. Reached 50,000 users. Published first accuracy report: 84.7%.
                    </p>
                  </div>

                  {/* 2025 */}
                  <div className="relative mb-10">
                    <div className="absolute -left-[38px] w-4 h-4 rounded-full bg-[#9E2A2B]" />
                    <div className="text-sm font-bold mb-1" style={{ color: "#111111" }}>2025</div>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      Launched Marketplace, Bulk Analyzer, Trademark Monitor. Reached 120,000 users. Published 12 ebooks and 200+ blog posts.
                    </p>
                  </div>

                  {/* 2026 */}
                  <div className="relative">
                    <div className="absolute -left-[38px] w-4 h-4 rounded-full bg-[#F4A261]" />
                    <div className="text-sm font-bold mb-1" style={{ color: "#111111" }}>2026</div>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      Launched Extended Insights, Domain Database, API. 180,000 users. 14 updates in 90 days. 28 people across 8 time zones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Team — Grid with Photos + Roles */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
            Our People
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#111111" }}>
            28 people, 8 time zones
          </h2>
          <p className="text-base max-w-2xl mb-12" style={{ color: "#666666" }}>
            Remote-first, async-first. We ship 2+ updates per week and process 2.4 million API requests daily. Every team member has direct access to users and direct responsibility for impact.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <div className="bg-[#EFECE6] rounded-2xl p-6 border border-black/5">
              <div className="w-16 h-16 rounded-full bg-[#9E2A2B] flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">JK</span>
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: "#111111" }}>James Kim</h3>
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "#999999" }}>Co-Founder & CEO</p>
              <p className="text-sm" style={{ color: "#666666" }}>
                Domain investor with 12+ years experience. Managed portfolios of 15,000+ domains. Previously at Sedo and GoDaddy.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-[#EFECE6] rounded-2xl p-6 border border-black/5">
              <div className="w-16 h-16 rounded-full bg-[#9E2A2B] flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">SP</span>
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: "#111111" }}>Sarah Park</h3>
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "#999999" }}>Co-Founder & CTO</p>
              <p className="text-sm" style={{ color: "#666666" }}>
                Data scientist with PhD in computational linguistics. Built NLP pipelines at Bloomberg. Expert in market prediction models.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-[#EFECE6] rounded-2xl p-6 border border-black/5">
              <div className="w-16 h-16 rounded-full bg-[#9E2A2B] flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">MR</span>
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: "#111111" }}>Marcus Rodriguez</h3>
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "#999999" }}>Head of Engineering</p>
              <p className="text-sm" style={{ color: "#666666" }}>
                Full-stack engineer with 10+ years building high-throughput data systems. Previously at Stripe and Plaid. Architected the 50-worker scanner.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-[#EFECE6] rounded-2xl p-6 border border-black/5">
              <div className="w-16 h-16 rounded-full bg-[#9E2A2B] flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">AT</span>
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: "#111111" }}>Aisha Thompson</h3>
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "#999999" }}>Head of Product</p>
              <p className="text-sm" style={{ color: "#666666" }}>
                Product leader with domain industry expertise. Previously at NameBio and Afternic. Drives roadmap based on user feedback and market data.
              </p>
            </div>

            {/* Team Member 5 */}
            <div className="bg-[#EFECE6] rounded-2xl p-6 border border-black/5">
              <div className="w-16 h-16 rounded-full bg-[#9E2A2B] flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">DL</span>
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: "#111111" }}>David Lee</h3>
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "#999999" }}>Lead Data Scientist</p>
              <p className="text-sm" style={{ color: "#666666" }}>
                ML engineer specializing in market prediction. Built the 16-Dimension Valuation Framework. PhD in machine learning from Stanford.
              </p>
            </div>

            {/* Team Member 6 */}
            <div className="bg-[#EFECE6] rounded-2xl p-6 border border-black/5">
              <div className="w-16 h-16 rounded-full bg-[#9E2A2B] flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">RN</span>
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: "#111111" }}>Rachel Nguyen</h3>
              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "#999999" }}>Head of Growth</p>
              <p className="text-sm" style={{ color: "#666666" }}>
                Growth marketer with SaaS expertise. Scaled user base from 0 to 180K. Previously at HubSpot and Intercom.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/company/careers" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#9E2A2B" }}>
              View all open roles
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: Values — Numbered Principles */}
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
              {/* Value 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#9E2A2B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#111111" }}>Transparency</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    We publish our methodology, data sources, and accuracy metrics. We do not hide behind black-box algorithms. Users who understand how we work trust us more than users who are asked to take our word for it.
                  </p>
                  <p className="text-xs mt-2" style={{ color: "#999999" }}>
                    Example: The 16-Dimension Framework is fully documented and publicly available.
                  </p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#9E2A2B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#111111" }}>Data Rigor</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    Every claim we make is backed by data. Every tool produces measurable outputs. Every product decision is informed by quantitative analysis. We do not rely on intuition when data is available.
                  </p>
                  <p className="text-xs mt-2" style={{ color: "#999999" }}>
                    Example: Our accuracy rate is measured against 47.3 million confirmed transactions.
                  </p>
                </div>
              </div>

              {/* Value 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#9E2A2B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#111111" }}>Speed</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    We ship 2+ updates per week. We build, measure, learn, and iterate. Perfection is the enemy of progress; we aim for &quot;good enough to ship&quot; and improve from there.
                  </p>
                  <p className="text-xs mt-2" style={{ color: "#999999" }}>
                    Example: 14 product updates shipped in the last 90 days.
                  </p>
                </div>
              </div>

              {/* Value 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#9E2A2B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#111111" }}>User Focus</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    Every feature starts with a user problem. We talk to users weekly. We read every support ticket. Our roadmap is driven by what users need, not what we think is technically interesting.
                  </p>
                  <p className="text-xs mt-2" style={{ color: "#999999" }}>
                    Example: 1,200+ strategy calls since launch, 94% satisfaction rating.
                  </p>
                </div>
              </div>

              {/* Value 5 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#9E2A2B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">5</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "#111111" }}>Ownership</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    Every team member owns their work end-to-end. Engineers talk to users. Data scientists publish reports. Designers ship code. Everyone is responsible for the impact of their work.
                  </p>
                  <p className="text-xs mt-2" style={{ color: "#999999" }}>
                    Example: Every feature has a single owner who ships it from design through deployment.
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
              href="/tools/appraisal"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]"
            >
              Appraise a Domain
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
