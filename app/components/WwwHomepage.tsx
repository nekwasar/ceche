"use client";

import { Hero } from "@/components/layout/Hero";
import { BarChart3, Globe, ShoppingCart, Shield, Zap, TrendingUp, ArrowRight } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "16-Dimension Appraisal",
    desc: "Algorithmic domain valuation with 16 intelligence dimensions, pronounceability scoring, and market-based pricing.",
  },
  {
    icon: Globe,
    title: "SEO Scanner",
    desc: "Free domain audit with DA, spam score, backlink profiles, and indexation status across search engines.",
  },
  {
    icon: ShoppingCart,
    title: "Curated Marketplace",
    desc: "Premium domains sorted by commercial intent and SEO authority. Escrow-protected transactions.",
  },
  {
    icon: Shield,
    title: "Trademark Protection",
    desc: "USPTO and WIPO database screening to avoid brand conflicts before acquisition.",
  },
  {
    icon: Zap,
    title: "Real-time Intelligence",
    desc: "Instant analysis with confidence scoring, range estimates, and detailed module breakdowns.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    desc: "Domain market trends, pricing data, and investment signals for informed decisions.",
  },
];

const stats = [
  { value: "50K+", label: "Domains Analyzed" },
  { value: "10K+", label: "Domains Found" },
  { value: "99.9%", label: "Uptime" },
  { value: "69ms", label: "Cold Start" },
];

export function WwwHomepage() {
  return (
    <div>
      <Hero />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-heading">Enterprise-Grade Domain Intelligence</h2>
            <p className="section-subheading">
              Everything you need to discover, evaluate, and acquire premium domain names.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-slate/5 hover:border-brand/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-brand" />
                </div>
                <h3 className="font-semibold text-slate mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</p>
                <p className="mt-2 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Unlock Domain Intelligence?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Start with 5 free appraisals. No credit card required.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="/tools/appraisal" className="cta-button flex items-center gap-2">
                Appraise a Domain
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/resources/pricing" className="cta-button-outline">
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
