"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DocsMiniNav } from "@/components/layout/DocsMiniNav";

export default function HelpFaqPage() {
  const t = useTranslations("helpFaq");
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

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

          {[0, 1, 2, 3, 4].map((si) => (
            <div key={si} className="mb-10 last:mb-0">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-mono tracking-widest uppercase shrink-0" style={{ color: "#999999" }}>{t(`sections.${si}.title`)}</span>
                <div className="h-px flex-1" style={{ backgroundColor: "#111111", opacity: 0.06 }} />
              </div>
              <div className="space-y-0">
                {(t.raw(`sections.${si}.items`) as any[] || []).map((item: any, ii: number) => {
                  const key = `${si}-${ii}`;
                  const isExpanded = expandedQ === key;
                  const q = item?.q;
                  if (!q) return null;
                  return (
                    <div key={ii} className="cursor-pointer" style={{ borderBottom: "1px solid rgba(17,17,17,0.06)" }} onClick={() => setExpandedQ(isExpanded ? null : key)}>
                      <div className="py-5 md:grid md:grid-cols-12 md:gap-8">
                        <div className="md:col-span-2 mb-1 md:mb-0">
                          <span className="block text-lg font-bold" style={{ color: "#111111", opacity: 0.08 }}>{String(si * 10 + ii + 1).padStart(2, "0")}</span>
                        </div>
                        <div className="md:col-span-10">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold" style={{ color: "#111111" }}>{q}</h3>
                            <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#CCCCCC", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                          </div>
                          {isExpanded && <p className="text-sm leading-relaxed mt-3 pt-3 max-w-2xl" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", color: "#666666" }}>{item?.a}</p>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="rounded-xl p-6 mt-12" style={{ backgroundColor: "#111111" }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-mono tracking-wider uppercase mb-1" style={{ color: "#F4A261" }}>{t("stillQuestions")}</p>
                <h3 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>{t("supportTeam")}</h3>
              </div>
              <a href="/help/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shrink-0" style={{ backgroundColor: "#F4A261", color: "#111111" }}>
                {t("contactSupport")} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
