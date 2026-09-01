"use client";

import { useState } from "react";
import { ArrowRight, BarChart3, Globe, Shield, Eye } from "lucide-react";

export function Hero() {
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(domain.trim())}`;
    }
  };

  return (
    <section className="bg-brand relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,162,97,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(158,42,43,0.3)_0%,_transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
        <div className="max-w-3xl">
          <h1 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Premium domain names, bought and sold with{" "}
            <span className="text-accent">intelligence</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
            Every listing shows full stats — estimated value, health score, CPC, brandability — but the name stays hidden until you pay to reveal it. No auction inflation. No sniping.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex items-stretch gap-3 max-w-lg">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-muted/40" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Search any domain name, e.g., brand.com"
                className="input-search pl-12"
              />
            </div>
            <button type="submit" className="cta-button flex items-center gap-2 whitespace-nowrap">
              Search Domain
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-10 flex items-center gap-8 text-white/50 text-sm">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-accent/70" />
              <span>Blind Listings</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent/70" />
              <span>16-Dimension Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent/70" />
              <span>Escrow Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
