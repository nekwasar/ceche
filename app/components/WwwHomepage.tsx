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
              Type any domain into the search bar above. We'll tell you if it's available, what it's worth, and what you could build with it. No signup required.
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
                  Click "Appraise this name" for the full 16-dimension analysis — pronounceability, trademark risk, historical DNS, brandability score, and estimated value range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Who Ceche Is Built For */}
      <section className="w-full max-w-6xl mx-auto my-12 px-4" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="bg-[#EFECE6] rounded-2xl p-6 md:p-10 border border-black/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">

            {/* Domain Investors */}
            <div className="flex flex-col items-start text-left md:pr-8 md:border-r border-black/10 pb-6 md:pb-0 border-b md:border-b-0">
              <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" style={{ color: "#111111" }} />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: "#999999" }}>
                Domain Investors
              </span>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Find Undervalued Names Fast</h3>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#666666" }}>
                Search thousands of domains, check availability instantly, and appraise the ones that look promising. Our scanner finds names before the market catches on.
              </p>
              <div className="mt-4 pt-3 border-t border-black/5 w-full text-[11px] font-mono flex items-center gap-1.5" style={{ color: "#047857" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Bulk scanning • Drop alerts • Portfolio tracking
              </div>
            </div>

            {/* Startup Founders */}
            <div className="flex flex-col items-start text-left md:px-8 md:border-r border-black/10 pb-6 md:pb-0 border-b md:border-b-0">
              <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-5 h-5" style={{ color: "#111111" }} />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: "#999999" }}>
                Startup Founders
              </span>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Find a Brandable, Risk-Free Name</h3>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#666666" }}>
                You need a name that's easy to say, spell, and won't get you sued. Our 16-dimension engine checks all three before you register — so you pick a name that works as a brand.
              </p>
              <div className="mt-4 pt-3 border-t border-black/5 w-full text-[11px] font-mono" style={{ color: "#999999" }}>
                Brandability index • Trademark check • Clean DNS history
              </div>
            </div>

            {/* SEO Agencies */}
            <div className="flex flex-col items-start text-left md:pl-8">
              <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" style={{ color: "#111111" }} />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: "#999999" }}>
                SEO Agencies
              </span>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Expired Domains with Real Authority</h3>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#666666" }}>
                Find expired or available domains that still carry domain authority and clean backlinks. Our premium scanner shows DA, spam score, and backlink profiles so you start with existing SEO juice.
              </p>
              <div className="mt-4 pt-3 border-t border-black/5 w-full text-[11px] font-mono" style={{ color: "#999999" }}>
                DA scoring • Backlink profiles • Spam recovery audits
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION C: Standard Marketplace — Blind Listings */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              Marketplace
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#111111" }}>
              Premium Domains, Names Hidden
            </h2>
            <p className="text-base max-w-2xl mb-12 leading-relaxed" style={{ color: "#666666" }}>
              Browse our curated inventory of premium domains. You see everything — the score, the value, the CPC, the brandability — except the name itself. No hints. No partial reveals. Just the intelligence.
            </p>

            <div className="grid md:grid-cols-3 gap-0">
              {/* Full Stats */}
              <div className="md:border-r border-black/10 md:pr-8 pb-8 md:pb-0 border-b md:border-b-0">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Full Intelligence, Zero Name</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  Every listing shows estimated value, health score, CPC, brandability, TLD, and keyword intent. You evaluate the numbers — not the name.
                </p>
              </div>

              {/* Pay to Reveal */}
              <div className="md:px-8 md:border-r border-black/10 pb-8 md:pb-0 border-b md:border-b-0">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Pay to Reveal</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  When you're ready, pay the reveal fee to see the actual domain name. Price varies by domain value — from $5 for lower-value names to $50 for premium picks.
                </p>
              </div>

              {/* Register */}
              <div className="md:pl-8">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Register Anywhere</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  After reveal, we give you direct links to register the domain at Dynadot, Namecheap, or Porkbun. You choose where — we don't lock you into a registrar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: Try Your Luck — Spin mechanic */}
      <section className="w-full max-w-6xl mx-auto my-12 px-4" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="bg-[#EFECE6] rounded-2xl p-6 md:p-10 border border-black/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">

            {/* Pick a TLD */}
            <div className="flex flex-col items-start text-left md:pr-8 md:border-r border-black/10 pb-6 md:pb-0 border-b md:border-b-0">
              <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" style={{ color: "#111111" }} />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: "#999999" }}>
                Step 1
              </span>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Pick Your TLD</h3>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#666666" }}>
                Choose .com ($79), .net ($39), .io ($29), or .co ($9). Or skip the selection and pay a flat $19 for any TLD.
              </p>
              <div className="mt-4 pt-3 border-t border-black/5 w-full text-[11px] font-mono" style={{ color: "#999999" }}>
                .com $79 • .net $39 • .io $29 • .co $9 • Flat $19
              </div>
            </div>

            {/* Spin & Pick */}
            <div className="flex flex-col items-start text-left md:px-8 md:border-r border-black/10 pb-6 md:pb-0 border-b md:border-b-0">
              <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                <Box className="w-5 h-5" style={{ color: "#111111" }} />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: "#999999" }}>
                Step 2
              </span>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Spin & Pick a Box</h3>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#666666" }}>
                Three closed boxes appear with a spinning animation. Each box contains a unique premium domain. When it stops, pick one. The other two are gone forever.
              </p>
            </div>

            {/* Reveal & Buy */}
            <div className="flex flex-col items-start text-left md:pl-8">
              <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" style={{ color: "#111111" }} />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: "#999999" }}>
                Step 3
              </span>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Reveal & Buy Now</h3>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#666666" }}>
                Your domain is revealed instantly. It's locked — no one else on the platform can buy it. You're prompted to register it immediately at your preferred registrar.
              </p>
              <div className="mt-4 pt-3 border-t border-black/5 w-full text-[11px] font-mono flex items-center gap-1.5" style={{ color: "#047857" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Domain locked • Exclusive access
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION E: Deep Technical Architecture */}
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
                  Every domain name in our database is encrypted with AES-256-GCM. Even if someone got a full DB dump, they'd see garbage — not your search history.
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
              answer="If you're not signed up, you get 3 appraisals per day. Sign up for free and you get 12 per day. Premium Startup ($79/mo) gets 30 per day, and Premium Enterprise ($129/mo) gets unlimited."
            />
            <FaqItem
              question="What's the difference between name search and appraisal?"
              answer="Name search is free and instant — it tells you if a domain is available, shows WHOIS if taken, or ranks it Premium/Mid/Low if available. Appraisal is the deep 16-dimension analysis that scores pronounceability, trademark risk, brandability, and estimated value."
            />
            <FaqItem
              question="How does Try Your Luck work?"
              answer="Pick a TLD (.com, .net, .io, or .co) and pay the TLD-specific price. Three closed boxes appear with a spinning animation. Pick one when it stops. You get a unique premium domain revealed instantly. It's locked — no one else can buy it. Or pay a flat $19 without selecting a TLD."
            />
            <FaqItem
              question="What happens after I reveal a domain name?"
              answer="After reveal, the domain is yours to evaluate. We show you direct links to register it at Dynadot, Namecheap, or Porkbun. You choose where to register — we don't lock you into a registrar."
            />
            <FaqItem
              question="What's included in the Premium subscription?"
              answer="Premium Startup ($79/mo) gives you 30 appraisals/day plus access to the Domain Scanner (DA, spam score, backlinks), Extended Insights (USPTO/WIPO, trademark history), and Bulk Domain Audit. Enterprise ($129/mo) adds unlimited appraisals, API access, and priority support."
            />
            <FaqItem
              question="Can I sell my domains on Ceche?"
              answer="Yes. List your premium domain on our marketplace. We appraise it, you set the price. Standard listing is $5, priority placement is $10. We take 8-15% commission on successful sales depending on the sale price."
            />
            <FaqItem
              question="Is my search data private?"
              answer="Yes. Domain names you search are encrypted with AES-256-GCM before storage. We don't sell or share search data. Your competition won't see what you're looking at."
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
