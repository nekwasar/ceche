"use client";

import { useState } from "react";
import { ArrowRight, BarChart3, Globe, TrendingUp, Shield, Zap, Eye } from "lucide-react";

export function Hero() {
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      window.location.href = `/tools/appraisal?domain=${encodeURIComponent(domain.trim())}`;
    }
  };

  return (
    <section className="bg-brand relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,162,97,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(158,42,43,0.3)_0%,_transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-white/80 text-xs font-medium">16-Dimension Intelligence Engine</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Uncover Hidden Domain Value with{" "}
              <span className="text-accent">16-Dimension</span>{" "}
              Intelligence
            </h1>

            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
              Instant SEO audit, algorithmic domain appraisals, extended technical insights, and high-intent unmasking marketplace.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex items-stretch gap-3 max-w-lg">
              <div className="flex-1 relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-muted/40" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter any domain name, e.g., brand.com"
                  className="input-search pl-12"
                />
              </div>
              <button type="submit" className="cta-button flex items-center gap-2 whitespace-nowrap">
                Scan Domain
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-10 flex items-center gap-8 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent/70" />
                <span>USPTO Checks</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent/70" />
                <span>16 Dimensions</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent/70" />
                <span>Real-time Pricing</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">Domain Score</p>
                  <p className="text-white text-3xl font-bold mt-1">87<span className="text-lg text-accent">/100</span></p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-xs uppercase tracking-wider">Estimated Value</p>
                  <p className="text-accent text-2xl font-bold mt-1">$12,400</p>
                  <p className="text-white/40 text-xs">Range: $8,200 — $18,600</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Brandability", score: 92, color: "bg-accent" },
                  { label: "SEO Authority", score: 78, color: "bg-accent-light" },
                  { label: "Commercial Intent", score: 85, color: "bg-accent" },
                  { label: "Pronounceability", score: 88, color: "bg-accent-light" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-white/60 text-xs w-32">{item.label}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-white/80 text-xs font-medium w-8 text-right">{item.score}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-white/40 text-xs">TLD</p>
                  <p className="text-white text-sm font-medium">.com</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Age</p>
                  <p className="text-white text-sm font-medium">12 years</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Confidence</p>
                  <p className="text-white text-sm font-medium">94%</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full 16-dimension breakdown available with Pro plan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 bg-gradient-to-b from-transparent to-canvas" />
    </section>
  );
}
