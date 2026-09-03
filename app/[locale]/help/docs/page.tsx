"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DocsMiniNav } from "@/components/layout/DocsMiniNav";

export default function DocsPage() {
  const t = useTranslations("helpDocs");
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-6 md:gap-16">
        <DocsMiniNav />
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: "#999999" }}>{t("badge")}</p>
          <h1 className="font-serif font-bold leading-[0.85] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111111" }}>
            {t("title1")}<br />{t("title2")}<span style={{ color: "#9E2A2B" }}>.</span>
          </h1>
          <div className="h-px mb-8" style={{ backgroundColor: "#9E2A2B" }} />
          <p className="text-lg max-w-2xl leading-relaxed mb-12" style={{ color: "#555555" }}>{t("desc")}</p>

          <div className="space-y-0 mb-12">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="cursor-pointer" style={{ borderBottom: "1px solid rgba(17,17,17,0.06)" }} onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="py-6 md:py-8 md:grid md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-2 mb-2 md:mb-0">
                    <span className="block text-xl font-bold" style={{ color: "#111111", opacity: 0.08 }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="md:col-span-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-serif font-bold" style={{ color: "#111111" }}>{t(`tools.${i}.name`)}</h3>
                      <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#CCCCCC", transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                    </div>
                    <p className="text-xs font-mono mt-1 mb-2" style={{ color: "#9E2A2B" }}>{t(`tools.${i}.pricing`)}</p>
                    {expanded === i && (
                      <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#666666" }}>{t(`tools.${i}.desc`)}</p>
                        <ul className="space-y-1.5 mb-4">{[0, 1, 2, 3].map((fi) => { const feat = t(`tools.${i}.features.${fi}`); if (!feat || feat.startsWith("tools.")) return null; return <li key={fi} className="text-xs flex gap-2" style={{ color: "#888888" }}><span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: "#9E2A2B" }} />{feat}</li>; })}</ul>
                        <a href={[undefined, "/appraise", "/tools/seo-scanner", "/tools/extended-insights", "/tools/bulk-analyzer", "/tools/trademark-monitor", "/tools/domain-database"][i]} className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: "#9E2A2B" }}>{t("openTool")} <ArrowRight className="w-3 h-3" /></a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#999999" }}>{t("tiersTitle")}</span>
              <div className="h-px flex-1" style={{ backgroundColor: "#111111", opacity: 0.06 }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: t(`tiers.${i}.color`) }}>{t(`tiers.${i}.tier`)}</p>
                  <p className="text-2xl font-bold mb-2" style={{ color: "#111111" }}>{t(`tiers.${i}.price`)}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#666666" }}>{t(`tiers.${i}.features`)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: "#111111" }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-mono tracking-wider uppercase mb-1" style={{ color: "#F4A261" }}>{t("needHelp.badge")}</p>
                <h3 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>{t("needHelp.title")}</h3>
              </div>
              <a href="/help/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shrink-0" style={{ backgroundColor: "#F4A261", color: "#111111" }}>
                {t("needHelp.cta")} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
