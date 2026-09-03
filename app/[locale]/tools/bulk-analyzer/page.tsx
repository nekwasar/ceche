"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import PremiumGateModal from "@/components/layout/PremiumGateModal";

export default function BulkAnalyzerPage() {
  const t = useTranslations("tools.bulk");

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <PremiumGateModal toolName="Bulk Analyzer" />

      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[auto] md:min-h-[480px]">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
          <span className="inline-block bg-[#9E2A2B] text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider mb-5 w-fit">{t("badge")}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 leading-tight">{t("title")}</h1>
          <p className="text-base md:text-lg text-[#666] mb-8 leading-relaxed">{t("description")}</p>
          <Link href="/signup" className="inline-block bg-[#9E2A2B] text-white px-7 py-3.5 rounded-lg text-sm font-bold no-underline w-fit">{t("cta")}</Link>
        </div>
        <div className="flex flex-col justify-center items-center p-8 md:p-10 bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] text-center">
          <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-none mb-2">{t("statValue")}</div>
          <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8">{t("statLabel")}</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F4A261]">{t(`stats.${i}.value`)}</div>
                <div className="text-xs text-white/60 uppercase tracking-wider">{t(`stats.${i}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-10 md:mb-12">{t("howItWorks.title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 md:p-7 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="w-10 h-10 bg-[#9E2A2B] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-extrabold text-base">{i + 1}</div>
              <h3 className="text-sm md:text-base font-bold text-[#111] mb-2">{t(`howItWorks.steps.${i}.title`)}</h3>
              <p className="text-xs md:text-sm text-[#666] leading-relaxed">{t(`howItWorks.steps.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8">{t("outputTitle")}</h2>
          <div className="bg-[#FAF7F2] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[500px]">
                <thead><tr className="bg-[#9E2A2B]">{[0, 1, 2].map((i) => <th key={i} className="py-3.5 px-5 text-left text-white font-bold text-xs uppercase tracking-wider">{t(`outputHeaders.${i}`)}</th>)}</tr></thead>
                <tbody>{[0, 1, 2, 3, 4, 5].map((i) => <tr key={i} className={`border-b border-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-[#FAF7F2]"}`}><td className="py-3.5 px-5 font-semibold text-[#111] text-sm">{t(`outputRows.${i}.0`)}</td><td className="py-3.5 px-5 text-[#666] text-sm">{t(`outputRows.${i}.1`)}</td><td className="py-3.5 px-5 text-[#999] font-mono text-xs">{t(`outputRows.${i}.2`)}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8">{t("priorityTitle")}</h2>
        <div className="flex flex-col gap-3 md:gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <span className="w-28 md:w-40 font-semibold text-[#111] text-sm shrink-0">{t(`dimensions.${i}.name`)}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded"><div className="h-full bg-[#9E2A2B] rounded" style={{ width: `${t.raw(`dimensions.${i}.bar`)}` }} /></div>
              <span className="w-10 text-right font-bold text-[#9E2A2B] text-sm">{t(`dimensions.${i}.weight`)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-4">{t("customTitle")}</h2>
          <p className="text-base text-[#666] leading-relaxed mb-8">{t("customDescription")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-[#FAF7F2] rounded-xl p-5 md:p-6 text-left">
                <h3 className="text-sm font-bold text-[#111] mb-1.5">{t(`modes.${i}.title`)}</h3>
                <p className="text-xs text-[#666] leading-relaxed">{t(`modes.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-base text-white/80 mb-8">{t("ctaDescription")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold no-underline text-center">{t("startTrial")}</Link>
          <Link href="/tools/domain-lookup" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">{t("tryLookup")}</Link>
        </div>
      </section>
    </div>
  );
}
