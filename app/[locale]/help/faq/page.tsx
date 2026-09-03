"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DocsMiniNav } from "@/components/layout/DocsMiniNav";

const sections = [
  {
    title: "Getting started",
    items: [
      { q: "What is Ceche?", a: "Ceche is a domain marketplace where premium names are bought and sold. The appraisal engine proves value with 16-dimension scoring. The search and scanner tools help you find names. Everything connects to the marketplace." },
      { q: "How does the appraisal engine work?", a: "The appraisal engine uses Ceche's proprietary 16-Dimension Framework to evaluate domains across four categories: Lexical Analysis (30%), Technical Authority (25%), Market Dynamics (25%), and Brandability (20%). Each dimension is scored independently and combined using statistically derived weights." },
      { q: "What TLDs does Ceche support?", a: "Ceche supports .com, .net, .io, and .co domains. The Domain Database tracks pricing and registration data for 2,847 TLDs, but appraisal and marketplace features are currently limited to these four extensions." },
      { q: "How do I create an account?", a: "Click 'Signup Free' in the navigation. Free accounts include 12 appraisals per day, basic SEO Scanner access, and full Help Center access. No credit card required." },
    ],
  },
  {
    title: "Pricing & billing",
    items: [
      { q: "What are the subscription tiers?", a: "Free: 12 appraisals/day, basic SEO Scanner, Help Center. Startup ($79/mo): 30 appraisals/day, full SEO Scanner, Extended Insights ($5-$50/report), Bulk Analyzer, Trademark Monitor, Domain Database, priority support. Enterprise ($129/mo): unlimited appraisals, all Startup features, API access (10,000 calls/day), dedicated account manager, private Slack channel, custom reporting." },
      { q: "How does Try Your Luck pricing work?", a: "Try Your Luck offers mystery domain acquisitions at flat rates: .com ($79), .net ($39), .io ($29), .co ($9), or any TLD ($19 flat). Each acquisition includes a Ceche valuation report with 16-dimension scoring." },
      { q: "What are the marketplace fees?", a: "Standard listing: $5 per domain. Priority listing: $10 per domain (includes 72-hour visibility boost). Commission: 8-15% of final sale price on a sliding scale — 15% for transactions under $500, 12% for $500-$5,000, 10% for $5,000-$50,000, 8% for above $50,000." },
      { q: "Do you offer refunds?", a: "No. All fees for digital goods (reveals, subscriptions, marketplace, Try Your Luck) are non-refundable." },
    ],
  },
  {
    title: "Tools",
    items: [
      { q: "What's the difference between SEO Scanner and Extended Insights?", a: "The SEO Scanner evaluates search visibility, backlink profile, organic traffic history, and keyword relevance — returning results in 3-5 seconds. Extended Insights provides deeper due diligence including trademark screening, comparable sales, and buyer intent scoring." },
      { q: "How does the Bulk Analyzer work?", a: "Upload a CSV with one column (header: 'domain') and one domain per row. Output includes Domain Name, Ceche Valuation, 16-Dimension Score, Priority Score (1-100), Recommended Action, and Estimated Sale Time. Processing time for 5,000 domains is approximately 2 minutes 28 seconds." },
      { q: "How does the Trademark Monitor work?", a: "Add domains to your monitor list from the dashboard. The tool screens new USPTO and WIPO filings daily. You receive email alerts within 24 hours. Severity levels: Critical (identical mark in related class), High (similar mark in different class), Medium (similar mark, different goods), Low (partial match)." },
    ],
  },
  {
    title: "API & integrations",
    items: [
      { q: "How do I authenticate API requests?", a: "Include your API key in the Authorization header as a Bearer token: Authorization: Bearer YOUR_API_KEY. Generate keys from Account Settings > API Keys." },
      { q: "What are the API rate limits?", a: "Free: 100 calls/day. Startup ($79/mo): 500 calls/day. Enterprise ($129/mo): 10,000 calls/day. Rate limit resets daily at 00:00 UTC." },
      { q: "What SDKs are available?", a: "Official SDKs are available for Python, JavaScript/Node.js, Go, and Ruby. Webhook configuration is available for automated notifications with retry logic using exponential backoff." },
    ],
  },
  {
    title: "Account & support",
    items: [
      { q: "How do I contact support?", a: "Premium subscribers receive responses within 4 business hours. Free account users within 24 business hours. Enterprise subscribers can also reach the support team through the private Slack channel." },
      { q: "Can I cancel my subscription?", a: "Yes. Cancel anytime from Account Settings > Billing. You retain Premium access until the end of your current billing cycle. Subscription fees are non-refundable." },
    ],
  },
];

export default function HelpFaqPage() {
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-6 md:gap-16">
        <DocsMiniNav />
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: "#999999" }}>FAQ</p>
          <h1 className="font-serif font-bold leading-[0.85] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111111" }}>
            Frequently<br />asked<span style={{ color: "#9E2A2B" }}>.</span>
          </h1>
          <div className="h-px mb-8" style={{ backgroundColor: "#9E2A2B" }} />
          <p className="text-lg max-w-2xl leading-relaxed mb-12" style={{ color: "#555555" }}>
            Answers to the most common questions about Ceche — pricing, tools, API, marketplace, and account management.
          </p>

          {sections.map((section, si) => (
            <div key={si} className="mb-10 last:mb-0">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-mono tracking-widest uppercase shrink-0" style={{ color: "#999999" }}>{section.title}</span>
                <div className="h-px flex-1" style={{ backgroundColor: "#111111", opacity: 0.06 }} />
              </div>
              <div className="space-y-0">
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const isExpanded = expandedQ === key;
                  return (
                    <div key={ii} className="cursor-pointer" style={{ borderBottom: "1px solid rgba(17,17,17,0.06)" }} onClick={() => setExpandedQ(isExpanded ? null : key)}>
                      <div className="py-5 md:grid md:grid-cols-12 md:gap-8">
                        <div className="md:col-span-2 mb-1 md:mb-0">
                          <span className="block text-lg font-bold" style={{ color: "#111111", opacity: 0.08 }}>{String(si * 10 + ii + 1).padStart(2, "0")}</span>
                        </div>
                        <div className="md:col-span-10">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold" style={{ color: "#111111" }}>{item.q}</h3>
                            <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#CCCCCC", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                          </div>
                          {isExpanded && (
                            <p className="text-sm leading-relaxed mt-3 pt-3 max-w-2xl" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", color: "#666666" }}>{item.a}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="rounded-xl p-6 mt-12" style={{ backgroundColor: "#111111" }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-mono tracking-wider uppercase mb-1" style={{ color: "#F4A261" }}>Still have questions?</p>
                <h3 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>Our support team is here to help</h3>
              </div>
              <a href="/help/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shrink-0" style={{ backgroundColor: "#F4A261", color: "#111111" }}>
                Contact support <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
