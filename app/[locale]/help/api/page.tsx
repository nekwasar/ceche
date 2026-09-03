"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DocsMiniNav } from "@/components/layout/DocsMiniNav";

const endpointData = [
  { method: "POST", path: "/v1/appraise" },
  { method: "POST", path: "/v1/bulk/appraise" },
  { method: "GET", path: "/v1/domain/{name}" },
  { method: "POST", path: "/v1/trademark/check" },
  { method: "POST", path: "/v1/marketplace/list" },
  { method: "POST", path: "/v1/webhooks/register" },
];

export default function HelpApiPage() {
  const t = useTranslations("helpApi");
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

          <div className="mb-8">
            <p className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#999999" }}>{t("baseUrl")}</p>
            <div className="rounded-xl p-4 font-mono text-sm" style={{ backgroundColor: "#111111", color: "#E0E0E0" }}>https://api.ceche.net</div>
          </div>

          <div className="mb-12">
            <p className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#999999" }}>{t("auth")}</p>
            <div className="rounded-xl p-5 font-mono text-xs leading-relaxed overflow-x-auto" style={{ backgroundColor: "#111111", color: "#E0E0E0" }}>
              <span style={{ color: "#888888" }}># Header</span>{'\n'}
              Authorization: Bearer <span style={{ color: "#F4A261" }}>YOUR_API_KEY</span>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#999999" }}>{t("endpoints")}</span>
              <div className="h-px flex-1" style={{ backgroundColor: "#111111", opacity: 0.06 }} />
            </div>
            <div className="space-y-0">
              {endpointData.map((ep, i) => (
                <div key={i} className="cursor-pointer" style={{ borderBottom: "1px solid rgba(17,17,17,0.06)" }} onClick={() => setExpanded(expanded === i ? null : i)}>
                  <div className="py-6 md:py-8 md:grid md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-2 mb-2 md:mb-0">
                      <span className="block text-xl font-bold" style={{ color: "#111111", opacity: 0.08 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded" style={{ backgroundColor: ep.method === "POST" ? "rgba(158,42,43,0.1)" : "rgba(45,106,79,0.1)", color: ep.method === "POST" ? "#9E2A2B" : "#2D6A4F" }}>{ep.method}</span>
                    </div>
                    <div className="md:col-span-10">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-mono mb-1" style={{ color: "#999999" }}>{ep.path}</p>
                        <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#CCCCCC", transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </div>
                      <h3 className="text-lg md:text-xl font-serif font-bold" style={{ color: "#111111" }}>{t(`endpoints.${i}.title`)}</h3>
                      {expanded === i && <p className="text-sm leading-relaxed mt-3 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", color: "#666666" }}>{t(`endpoints.${i}.desc`)}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#999999" }}>{t("rateLimits")}</span>
              <div className="h-px flex-1" style={{ backgroundColor: "#111111", opacity: 0.06 }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: t(`limits.${i}.color`) }}>{t(`limits.${i}.tier`)}</p>
                  <p className="text-lg font-bold" style={{ color: "#111111" }}>{t(`limits.${i}.limit`)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: "#111111" }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-mono tracking-wider uppercase mb-1" style={{ color: "#F4A261" }}>{t("enterprise.badge")}</p>
                <h3 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>{t("enterprise.title")}</h3>
              </div>
              <a href="/platform/api-keys" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shrink-0" style={{ backgroundColor: "#F4A261", color: "#111111" }}>
                {t("enterprise.cta")} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
