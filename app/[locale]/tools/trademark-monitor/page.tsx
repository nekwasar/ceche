"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function TrademarkMonitorPage() {
  const t = useTranslations("tools.trademark");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[auto] md:min-h-[480px]">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
          <span className="inline-block bg-[#9E2A2B] text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider mb-5 w-fit">{t("badge")}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 leading-tight">{t("title")}</h1>
          <p className="text-base md:text-lg text-[#666] mb-8 leading-relaxed">{t("description")}</p>
          <Link href="/signup" className="inline-block bg-[#9E2A2B] text-white px-7 py-3.5 rounded-lg text-sm font-bold no-underline w-fit">{t("cta")}</Link>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-10 bg-gradient-to-br from-[#111] to-[#2A2A2A]">
          <h2 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-7">{t("severityTitle")}</h2>
          {[0, 1, 2, 3].map((i) => {
            const colors = ["#E74C3C", "#F4A261", "#F39C12", "#27AE60"];
            return (
              <div key={i} className="flex items-center gap-4 py-3.5 border-b border-white/10">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: colors[i] }} />
                <div><span className="text-white font-semibold text-sm">{t(`levels.${i}.level`)}</span><p className="text-white/50 text-xs mt-0.5">{t(`levels.${i}.desc`)}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-xl p-6 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-t-4 border-[#E74C3C]">
            <h2 className="text-xl md:text-2xl font-bold text-[#E74C3C] mb-5">{t("problemTitle")}</h2>
            <ul className="list-none p-0">{[0, 1, 2, 3].map((i) => <li key={i} className="py-2.5 border-b border-gray-100 text-[#666] text-sm flex gap-2.5"><span className="text-[#E74C3C]">✕</span>{t(`problems.${i}`)}</li>)}</ul>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-t-4 border-[#27AE60]">
            <h2 className="text-xl md:text-2xl font-bold text-[#27AE60] mb-5">{t("solutionTitle")}</h2>
            <ul className="list-none p-0">{[0, 1, 2, 3].map((i) => <li key={i} className="py-2.5 border-b border-gray-100 text-[#666] text-sm flex gap-2.5"><span className="text-[#27AE60]">✓</span>{t(`solutions.${i}`)}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-10 md:mb-12">{t("howItWorks.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-[#FAF7F2] rounded-xl p-5 md:p-7 text-center">
                <div className="w-10 h-10 bg-[#9E2A2B] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-extrabold text-base">{i + 1}</div>
                <h3 className="text-sm md:text-base font-bold text-[#111] mb-2">{t(`howItWorks.steps.${i}.title`)}</h3>
                <p className="text-xs md:text-sm text-[#666] leading-relaxed">{t(`howItWorks.steps.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8">{t("useCasesTitle")}</h2>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl mb-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
            <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full py-5 px-6 flex justify-between items-center bg-transparent border-none cursor-pointer text-left">
              <span className="text-base font-bold text-[#111]">{t(`useCases.${i}.title`)}</span>
              <span className="text-xl text-[#9E2A2B] transition-transform" style={{ transform: openAccordion === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            {openAccordion === i && <div className="px-6 pb-5 text-[#666] text-sm leading-relaxed">{t(`useCases.${i}.content`)}</div>}
          </div>
        ))}
      </section>

      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">{t("pricingTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[0, 1, 2].map((i) => {
              const isPopular = i === 1;
              return (
                <div key={i} className={`bg-[#FAF7F2] rounded-xl p-6 md:p-8 text-center relative ${isPopular ? "border-2 border-[#9E2A2B]" : "border-2 border-transparent"}`}>
                  {isPopular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#9E2A2B] text-white px-4 py-1 rounded-xl text-xs font-bold">{t("popular")}</span>}
                  <h3 className="text-lg font-bold text-[#111] mb-2">{t(`plans.${i}.plan`)}</h3>
                  <div className="text-3xl font-extrabold text-[#9E2A2B] mb-5">{t(`plans.${i}.price`)}</div>
                  <ul className="list-none p-0 text-left">{(t.raw(`plans.${i}.features`) as string[]).map((feature: string, j: number) => <li key={j} className="py-2 border-b border-gray-200 text-[#666] text-sm flex items-center gap-2"><span className="text-[#27AE60]">✓</span>{feature}</li>)}</ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-base text-white/80 mb-8">{t("ctaDescription")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold no-underline text-center">{t("startFreeTrial")}</Link>
          <Link href="/tools/domain-lookup" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">{t("tryLookup")}</Link>
          <Link href="/tools/seo-scanner" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">{t("runScan")}</Link>
        </div>
      </section>
    </div>
  );
}
