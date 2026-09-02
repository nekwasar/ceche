"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DocsMiniNav } from "@/components/layout/DocsMiniNav";

const months = [
  {
    label: "September 2026",
    entries: [
      { hash: "93cfccb", title: "Remove careers reference from AGENTS.md", type: "Infrastructure", date: "Sep 1" },
      { hash: "43161d4", title: "Remove careers link from Footer, no careers page exists", type: "Fix", date: "Sep 1" },
      { hash: "64ed1b0", title: "Marketplace-first positioning: Hero and About page updates", type: "Feature", date: "Sep 1" },
      { hash: "cdce5b0", title: "Add edit-only rule: ban bash commands for file editing", type: "Infrastructure", date: "Sep 1" },
    ],
  },
  {
    label: "August 2026",
    entries: [
      { hash: "cfd15e4", title: "Phase 0-9: Critical fixes, backend quality, frontend polish, doc reconciliation, migrations", type: "Feature", date: "Aug 31" },
      { hash: "510c60e", title: "fix: hero h1 font changed to Playball", type: "Fix", date: "Aug 30" },
      { hash: "5ea7324", title: "fix: logo Berkshire Swash, hero h1 Noto Serif 900", type: "Fix", date: "Aug 30" },
      { hash: "0367f43", title: "fix: hero cleanup, logo wordmark, mega menu z-index", type: "Fix", date: "Aug 30" },
      { hash: "b133d48", title: "fix: mega menu hover-based interaction + Tailwind v4 styling", type: "Fix", date: "Aug 30" },
      { hash: "c5b404f", title: "fix: deploy Next.js frontend on port 4321", type: "Infrastructure", date: "Aug 30" },
      { hash: "9a6bc3b", title: "docs: rewrite README to enterprise standard", type: "Documentation", date: "Aug 30" },
      { hash: "13093cd", title: "feat: Phase 3 — Domain Scanner Engine with goroutine pool", type: "Feature", date: "Aug 30" },
      { hash: "3ee5294", title: "feat: Phase 2 complete — encryption, caching, free/premium gating, tests", type: "Feature", date: "Aug 30" },
      { hash: "ff4611b", title: "fix: critical compilation errors + runtime failures + memory leak", type: "Fix", date: "Aug 30" },
      { hash: "90b5840", title: "feat: UI redesign — Enterprise PitchBook-style design system", type: "Feature", date: "Aug 30" },
      { hash: "79ca725", title: "feat: Phase 2 upgrade — 16-dimension scoring + premium content gating", type: "Feature", date: "Aug 29" },
      { hash: "d5c41ff", title: "feat: Phase 2 — Domain Appraiser Engine", type: "Feature", date: "Aug 29" },
      { hash: "b6d20b2", title: "feat: Phase 0+1 retrofit — subdomain architecture + auth restructure", type: "Feature", date: "Aug 29" },
      { hash: "7b44ab6", title: "feat: Phase 1 — Auth frontend with JWT context", type: "Feature", date: "Aug 29" },
      { hash: "d202036", title: "feat: Phase 0 — Project scaffolding and foundation", type: "Feature", date: "Aug 29" },
      { hash: "fa04636", title: "docs: add Korea, China, Japan, Italy locales + complete Phase 8", type: "Documentation", date: "Aug 29" },
      { hash: "cfb6aba", title: "docs: enterprise-grade project documentation", type: "Documentation", date: "Aug 29" },
      { hash: "67196cd", title: "Split monorepo: extract web frontend into its own repository", type: "Infrastructure", date: "Aug 29" },
    ],
  },
  {
    label: "July 2026",
    entries: [
      { hash: "3e68ba5", title: "v0.4.0: AI-powered domain review, website crawler, modern UI redesign", type: "Feature", date: "Jul 20" },
      { hash: "e4eaf37", title: "deploy: canonical URL, systemd services, SSL via Let's Encrypt", type: "Infrastructure", date: "Jul 20" },
      { hash: "bbe8888", title: "blog: Tailwind typography, full markdown rendering, prose dark theme", type: "Feature", date: "Jul 20" },
      { hash: "6ae8f73", title: "content: zero hardcoded content — all pages fetch from MySQL via API", type: "Feature", date: "Jul 20" },
      { hash: "4091660", title: "Phase 2C: blog system — blog index, post, API endpoints, structured data", type: "Feature", date: "Jul 20" },
      { hash: "2873577", title: "Phase 2B: admin panel — dashboard, domains, blog, settings, API keys", type: "Feature", date: "Jul 20" },
      { hash: "687383b", title: "Phase 4: polish — 404 page, loading skeletons, Plausible analytics", type: "Feature", date: "Jul 20" },
      { hash: "0aef166", title: "Phase 3: SEO + comparisons — sitemap, robots, structured data", type: "Feature", date: "Jul 20" },
      { hash: "987ec0d", title: "Phase 2A: public pages — Home, Appraise, Pricing, FAQ with animations", type: "Feature", date: "Jul 20" },
      { hash: "e46f903", title: "security: enterprise-grade auth — bcrypt + env var admin creation", type: "Infrastructure", date: "Jul 20" },
      { hash: "2f7ae12", title: "Phase 1: Foundation — Astro project, MySQL schema, FastAPI admin API", type: "Feature", date: "Jul 20" },
    ],
  },
];

const typeColors: Record<string, string> = {
  Feature: "#9E2A2B",
  Fix: "#2D6A4F",
  Documentation: "#F4A261",
  Infrastructure: "#888888",
};

export default function HelpChangelogPage() {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex gap-16">
        <DocsMiniNav />
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: "#999999" }}>Changelog</p>
          <h1 className="font-serif font-bold leading-[0.85] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111111" }}>
            Every commit,<br />documented<span style={{ color: "#9E2A2B" }}>.</span>
          </h1>
          <div className="h-px mb-8" style={{ backgroundColor: "#9E2A2B" }} />
          <p className="text-lg max-w-2xl leading-relaxed mb-12" style={{ color: "#555555" }}>
            Every update sourced directly from our git history. Real commits, real dates, real descriptions.
          </p>

          {months.map((month, mi) => (
            <div key={mi} className="mb-12 last:mb-0">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-mono tracking-widest uppercase shrink-0" style={{ color: "#999999" }}>{month.label}</span>
                <div className="h-px flex-1" style={{ backgroundColor: "#111111", opacity: 0.06 }} />
              </div>

              <div className="space-y-0">
                {month.entries.map((entry) => {
                  const isExpanded = expandedEntry === entry.hash;
                  const color = typeColors[entry.type] || "#888888";
                  return (
                    <div key={entry.hash} className="cursor-pointer" style={{ borderBottom: "1px solid rgba(17,17,17,0.06)" }} onClick={() => setExpandedEntry(isExpanded ? null : entry.hash)}>
                      <div className="py-5 md:grid md:grid-cols-12 md:gap-8">
                        <div className="md:col-span-2 mb-1 md:mb-0">
                          <span className="text-[10px] font-mono" style={{ color: "#BBBBBB" }}>{entry.hash}</span>
                          <span className="text-[10px] font-mono ml-2" style={{ color: "#999999" }}>{entry.date}</span>
                        </div>
                        <div className="md:col-span-10">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded" style={{ backgroundColor: `${color}11`, color }}>{entry.type}</span>
                          </div>
                          <h3 className="text-base font-bold" style={{ color: "#111111" }}>{entry.title}</h3>
                          {isExpanded && (
                            <p className="text-xs leading-relaxed mt-2 pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", color: "#888888" }}>
                              Committed on {month.label}. View on{' '}
                              <a href={`https://github.com/nekwasar/ceche/commit/${entry.hash}`} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#9E2A2B" }}>GitHub</a>.
                            </p>
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
                <p className="text-xs font-mono tracking-wider uppercase mb-1" style={{ color: "#F4A261" }}>Coming soon</p>
                <h3 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>Auction tracking, mobile app, ML valuation</h3>
              </div>
              <a href="/pricing" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shrink-0" style={{ backgroundColor: "#F4A261", color: "#111111" }}>
                View roadmap <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
