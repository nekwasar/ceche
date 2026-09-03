"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import PremiumGateModal from "@/components/layout/PremiumGateModal";

export default function ExtendedInsightsPage() {
  const t = useTranslations("tools.insights");

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <PremiumGateModal toolName="Extended Insights" />

      <section className="grid grid-cols-1 md:grid-cols-5 min-h-[auto] md:min-h-[500px]">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white md:col-span-3">
          <span className="inline-block bg-[#9E2A2B] text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider mb-5 w-fit">{t("badge")}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 leading-tight">{t("title")}</h1>
          <p className="text-base md:text-lg text-[#666] mb-8 leading-relaxed">{t("description")}</p>
          <Link href="/signup" className="inline-block bg-[#9E2A2B] text-white px-7 py-3.5 rounded-lg text-sm font-bold no-underline w-fit">{t("cta")}</Link>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-10 bg-gradient-to-br from-[#111] to-[#2A2A2A] md:col-span-2">
          <h2 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-7">{t("revealTitle")}</h2>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center py-3.5 border-b border-white/10">
              <div><span className="text-white font-semibold text-sm">{t(`tiers.${i}.name`)}</span><p className="text-white/50 text-xs mt-0.5">{t(`tiers.${i}.desc`)}</p></div>
              <span className="text-[#F4A261] font-bold text-lg">{t(`tiers.${i}.price`)}</span>
            </div>
          ))}
          <p className="text-white/40 text-xs mt-5">{t("pricingNote")}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-10 md:mb-12">{t("reportTitle")}</h2>
        <div className="flex flex-col gap-4 md:gap-5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-5 md:gap-6 bg-white rounded-xl p-5 md:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="w-12 h-12 bg-[#9E2A2B] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shrink-0">{i + 1}</div>
              <div><h3 className="text-base md:text-lg font-bold text-[#111] mb-1">{t(`sections.${i}.title`)}</h3><p className="text-sm text-[#666] leading-relaxed">{t(`sections.${i}.desc`)}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">{t("useCasesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-[#FAF7F2] rounded-xl p-5 md:p-6">
                <h3 className="text-base font-bold text-[#111] mb-2">{t(`useCases.${i}.title`)}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{t(`useCases.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#F4A261] to-[#E8944D] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-4">{t("ctaTitle")}</h2>
        <p className="text-base text-[#111]/80 mb-8">{t("ctaDescription")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="bg-[#9E2A2B] text-white px-8 py-3.5 rounded-lg text-base font-bold no-underline text-center">{t("startFreeTrial")}</Link>
          <Link href="/tools/domain-lookup" className="bg-white text-[#111] px-8 py-3.5 rounded-lg text-base font-semibold no-underline text-center">{t("tryLookup")}</Link>
        </div>
      </section>
    </div>
  );
}
