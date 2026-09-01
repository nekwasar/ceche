"use client";

import { useState } from "react";
import { Hero } from "@/components/layout/Hero";
import {
  BarChart3, Globe, Shield, Rocket, Eye, Layers, ArrowRight, Search,
  Users, TrendingUp, Database, ChevronDown, Box, Sparkles,
} from "lucide-react";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-base font-semibold pr-4" style={{ color: "#111111" }}>{question}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: "#999999" }} />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: "#666666" }}>{answer}</p>
      )}
    </div>
  );
}

export function WwwHomepage() {
  return (
    <div>
      <Hero />

      {/* SECTION A: Name Search Tool — the SEO traffic driver */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              Free Tool
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#111111" }}>
              Search Any Domain Name
            </h2>
            <p className="text-base max-w-2xl mb-12 leading-relaxed" style={{ color: "#666666" }}>
              Type any domain into the search bar above. We&apos;ll tell you if it&apos;s available, what it&apos;s worth, and what you could build with it. No signup required.
            </p>

            <div className="grid md:grid-cols-3 gap-0">
              {/* If Taken */}
              <div className="md:border-r border-black/10 md:pr-8 pb-8 md:pb-0 border-b md:border-b-0">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Domain Taken?</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  We show you the WHOIS details — who owns it, when it expires, which registrar they used, and nameserver info. Useful for outreach or waiting for expiry.
                </p>
              </div>

              {/* If Available */}
              <div className="md:px-8 md:border-r border-black/10 pb-8 md:pb-0 border-b md:border-b-0">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Domain Available?</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  We rank it Premium, Mid, or Low — no confusing scores, just a clear label. Plus suggestions for what you could build with the name, and a button to run a full 16-dimension appraisal.
                </p>
              </div>

              {/* Appraise */}
              <div className="md:pl-8">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Deep Appraisal</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  Click &quot;Appraise this name&quot; for the full 16-dimension analysis — pronounceability, trademark risk, historical DNS, brandability score, and estimated value range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Who Ceche Is Built For — HORIZONTAL PERSONA ROWS */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl overflow-hidden">
            {/* Section Header */}
            <div className="px-10 pt-10 pb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
                Built For
              </span>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#111111" }}>
                Three kinds of people, one platform
              </h2>
            </div>

            {/* Persona Rows */}
            <div className="border-t border-black/10">
              {/* Row 1: Domain Investors */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 px-10 py-8 border-b border-black/10 hover:bg-[#E5DFD3]/30 transition-colors">
                <div className="w-14 h-14 bg-[#9E2A2B] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: "#111111" }}>Domain Investors</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    Scan thousands of word combinations, appraise shortlists in seconds, and spot undervalued names before the market catches on. The scanner surfaces DA, spam score, and backlink profiles on every available name.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-2xl font-bold" style={{ color: "#111111" }}>200+</div>
                  <div className="text-xs" style={{ color: "#999999" }}>checks per scan</div>
                </div>
              </div>

              {/* Row 2: Startup Founders */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 px-10 py-8 border-b border-black/10 hover:bg-[#E5DFD3]/30 transition-colors">
                <div className="w-14 h-14 bg-[#9E2A2B] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: "#111111" }}>Startup Founders</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    Find a name that&apos;s easy to say, easy to spell, and safe to use. The 16-dimension engine checks pronounceability, trademark conflicts, and brandability before you commit to a brand.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-2xl font-bold" style={{ color: "#111111" }}>16</div>
                  <div className="text-xs" style={{ color: "#999999" }}>dimensions checked</div>
                </div>
              </div>

              {/* Row 3: SEO Agencies */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 px-10 py-8 hover:bg-[#E5DFD3]/30 transition-colors">
                <div className="w-14 h-14 bg-[#9E2A2B] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: "#111111" }}>SEO Agencies</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    Find expired domains that still carry authority and clean backlinks. The scanner surfaces DA, spam score, and indexation status so you start with existing SEO value, not zero.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-2xl font-bold" style={{ color: "#111111" }}>4</div>
                  <div className="text-xs" style={{ color: "#999999" }}>metrics per domain</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: Marketplace — TWO-COLUMN WITH PRICING TABLE + CTA */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <div className="grid md:grid-cols-5 gap-10 md:gap-12">
              {/* Left: Explanation (3 cols) */}
              <div className="md:col-span-3">
                <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
                  Marketplace
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#111111" }}>
                  Premium names, names hidden
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#666666" }}>
                  Every listing shows full intelligence — estimated value, health score, CPC, brandability, TLD, and keyword intent — everything except the name itself. No hints. No partial reveals. No asterisks.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "#666666" }}>
                  Public marketplaces get scraped the moment a premium name appears. Ceche hides the name and shows the intelligence instead — so value, not visibility, drives the transaction. Investors who read the stats well consistently find names before auction fever inflates them.
                </p>
                <a
                  href="/marketplace"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]"
                >
                  Browse the marketplace
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Right: Pricing Table (2 cols) */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-2xl p-6 border border-black/5">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#111111" }}>
                    Reveal Pricing
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-black/5">
                      <span className="text-sm" style={{ color: "#666666" }}>Under $1,000</span>
                      <span className="text-sm font-bold" style={{ color: "#111111" }}>$5</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-black/5">
                      <span className="text-sm" style={{ color: "#666666" }}>$1K – $10K</span>
                      <span className="text-sm font-bold" style={{ color: "#111111" }}>$10</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-black/5">
                      <span className="text-sm" style={{ color: "#666666" }}>$10K – $50K</span>
                      <span className="text-sm font-bold" style={{ color: "#111111" }}>$25</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm" style={{ color: "#666666" }}>$50K+</span>
                      <span className="text-sm font-bold" style={{ color: "#111111" }}>$50</span>
                    </div>
                  </div>

                  <div className="border-t border-black/10 pt-4 mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#111111" }}>
                      Try Your Luck
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span style={{ color: "#666666" }}>.com</span>
                        <span className="font-bold" style={{ color: "#111111" }}>$79</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "#666666" }}>.net</span>
                        <span className="font-bold" style={{ color: "#111111" }}>$39</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "#666666" }}>.io</span>
                        <span className="font-bold" style={{ color: "#111111" }}>$29</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "#666666" }}>.co</span>
                        <span className="font-bold" style={{ color: "#111111" }}>$9</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-black/5 flex justify-between text-sm">
                      <span style={{ color: "#666666" }}>Any TLD (flat)</span>
                      <span className="font-bold" style={{ color: "#111111" }}>$19</span>
                    </div>
                  </div>

                  <a
                    href="/marketplace/try-your-luck"
                    className="block w-full text-center py-3 rounded-full font-medium text-sm transition-all border border-[#9E2A2B] text-[#9E2A2B] hover:bg-[#9E2A2B] hover:text-white mt-4"
                  >
                    Try Your Luck
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: Try Your Luck — NUMBERED STEP FLOW WITH SQUARES */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: "#111111" }}>
              Spin, pick, own
            </h2>

            {/* Step Flow — Squares, not circles */}
            <div className="flex flex-col md:flex-row md:items-start gap-0">
              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 bg-[#9E2A2B] rounded-2xl flex items-center justify-center mb-5">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Pick your TLD</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  Choose .com ($79), .net ($39), .io ($29), or .co ($9). Or skip the selection and pay a flat $19 for any TLD.
                </p>
              </div>

              {/* Connector 1 */}
              <div className="hidden md:flex items-center justify-center w-12 flex-shrink-0 pt-6">
                <div className="w-full h-[2px] bg-black/10" />
              </div>

              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 bg-[#9E2A2B] rounded-2xl flex items-center justify-center mb-5">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Spin &amp; pick a box</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  Three closed boxes appear with a spinning animation. Each holds a unique premium domain. When it stops, pick one.
                </p>
              </div>

              {/* Connector 2 */}
              <div className="hidden md:flex items-center justify-center w-12 flex-shrink-0 pt-6">
                <div className="w-full h-[2px] bg-black/10" />
              </div>

              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 bg-[#9E2A2B] rounded-2xl flex items-center justify-center mb-5">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Reveal &amp; register</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  Your domain is revealed instantly. It&apos;s locked exclusively for you — no one else can buy it. Register immediately at your preferred registrar.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <a
                href="/marketplace/try-your-luck"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-base transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]"
              >
                Try Your Luck now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: Deep Technical Architecture (kept as-is) */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              Under the Hood
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#111111" }}>
              Built for Speed and Trust
            </h2>
            <p className="text-base max-w-2xl mb-12 leading-relaxed" style={{ color: "#666666" }}>
              Every domain name is encrypted at rest. Every scan runs on real infrastructure. No shortcuts.
            </p>

            <div className="grid md:grid-cols-3 gap-0">
              {/* Goroutine Pool */}
              <div className="md:border-r border-black/10 md:pr-8 pb-8 md:pb-0 border-b md:border-b-0">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>50-Worker Goroutine Pool</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  Our scanner runs 50 concurrent goroutines, each checking DNS records with a 5-second timeout. Results batch-insert 100 at a time. We respect per-TLD rate limits.
                </p>
              </div>

              {/* Encrypted Storage */}
              <div className="md:px-8 md:border-r border-black/10 pb-8 md:pb-0 border-b md:border-b-0">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>AES-256-GCM Encryption</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  Every domain name in our database is encrypted with AES-256-GCM. Even if someone got a full DB dump, they&apos;d see garbage — not your search history.
                </p>
              </div>

              {/* Caching */}
              <div className="md:pl-8">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>In-Memory Caching</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  Repeat queries hit zero-cost bigcache with a 1-hour TTL. Your appraisal results stay fast without re-running the full 16-dimension analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: FAQ */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
            Frequently Asked
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: "#111111" }}>
            Common Questions
          </h2>

          <div className="bg-[#EFECE6] rounded-2xl px-8 border border-black/5">
            <FaqItem
              question="How many free appraisals do I get?"
              answer="If you&apos;re not signed up, you get 3 appraisals per day. Sign up for free and you get 12 per day. Premium Startup ($79/mo) gets 30 per day, and Premium Enterprise ($129/mo) gets unlimited."
            />
            <FaqItem
              question="What&apos;s the difference between name search and appraisal?"
              answer="Name search is free and instant — it tells you if a domain is available, shows WHOIS if taken, or ranks it Premium/Mid/Low if available. Appraisal is the deep 16-dimension analysis that scores pronounceability, trademark risk, brandability, and estimated value."
            />
            <FaqItem
              question="How does Try Your Luck work?"
              answer="Pick a TLD (.com, .net, .io, or .co) and pay the TLD-specific price. Three closed boxes appear with a spinning animation. Pick one when it stops. You get a unique premium domain revealed instantly. It&apos;s locked — no one else can buy it. Or pay a flat $19 without selecting a TLD."
            />
            <FaqItem
              question="What happens after I reveal a domain name?"
              answer="After reveal, the domain is yours to evaluate. We show you direct links to register it at Dynadot, Namecheap, or Porkbun. You choose where to register — we don&apos;t lock you into a registrar."
            />
            <FaqItem
              question="What&apos;s included in the Premium subscription?"
              answer="Premium Startup ($79/mo) gives you 30 appraisals/day plus access to the Domain Scanner (DA, spam score, backlinks), Extended Insights (USPTO/WIPO, trademark history), and Bulk Domain Audit. Enterprise ($129/mo) adds unlimited appraisals, API access, and priority support."
            />
            <FaqItem
              question="Can I sell my domains on Ceche?"
              answer="Yes. List your premium domain on our marketplace. We appraise it, you set the price. Standard listing is $5, priority placement is $10. We take 8-15% commission on successful sales depending on the sale price."
            />
            <FaqItem
              question="Is my search data private?"
              answer="Yes. Domain names you search are encrypted with AES-256-GCM before storage. We don&apos;t sell or share search data. Your competition won&apos;t see what you&apos;re looking at."
            />
          </div>
        </div>
      </section>

      {/* Dot-Matrix World Map Banner */}
      <section className="my-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full bg-[#EFECE6] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                {Array.from({ length: 40 }).map((_, row) =>
                  Array.from({ length: 80 }).map((_, col) => {
                    const x = col * 15;
                    const y = row * 15;
                    const isMapArea =
                      (row > 8 && row < 35 && col > 5 && col < 25) ||
                      (row > 5 && row < 30 && col > 28 && col < 55) ||
                      (row > 10 && row < 38 && col > 55 && col < 75);
                    return (
                      <circle
                        key={`${row}-${col}`}
                        cx={x}
                        cy={y}
                        r={isMapArea ? 1.5 : 0.8}
                        fill={isMapArea ? "#C8C2B8" : "#D8D3CA"}
                        opacity={isMapArea ? 0.8 : 0.3}
                      />
                    );
                  })
                )}
              </svg>
            </div>

            <div className="w-14 h-14 bg-black text-white rounded-xl flex items-center justify-center mx-auto mb-6 relative z-10" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <span className="font-branded text-lg font-bold">C</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10" style={{ color: "#111111" }}>
              Accelerating Domain Liquidity Worldwide
            </h2>

            <p className="max-w-xl mx-auto mb-8 relative z-10" style={{ color: "#666666" }}>
              Real-time intelligence for domain investors, startup founders, and SEO agencies across 9 languages and 4 TLDs.
            </p>

            <a
              href="/tools/appraisal"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors relative z-10"
            >
              Start Appraising
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#111111" }}>
            Ready to find your next domain?
          </h2>
          <p className="mb-8" style={{ color: "#666666" }}>
            Start with 3 free appraisals per day. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/tools/appraisal"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-black text-white hover:bg-neutral-800"
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
        </div>
      </section>
    </div>
  );
}
