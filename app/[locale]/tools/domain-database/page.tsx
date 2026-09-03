"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Search, FileText, Link2 } from "lucide-react";

const methodIcons = [Search, FileText, Link2];

export default function DomainDatabasePage() {
  const t = useTranslations("tools.database");

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <section className="bg-gradient-to-br from-[#111] to-[#2A2A2A] py-16 md:py-20 px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#F4A261]/20 text-[#F4A261] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-6">{t("badge")}</span>
          <div className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none mb-3">{t("statValue")}</div>
          <p className="text-xl md:text-2xl text-white/70 mb-6">{t("statLabel")}</p>
          <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed">{t("description")}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto -mt-10 px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <div className="text-3xl md:text-4xl font-extrabold text-[#9E2A2B] mb-2">{t(`stats.${i}.value`)}</div>
              <h3 className="text-base md:text-lg font-bold text-[#111] mb-1.5">{t(`stats.${i}.label`)}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{t(`stats.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-12 md:mt-16 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">{t("methodsTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[0, 1, 2].map((i) => {
            const Icon = methodIcons[i];
            return (
              <div key={i} className="bg-white rounded-xl p-6 md:p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div className="mb-4"><Icon className="w-10 h-10 text-[#9E2A2B] mx-auto" /></div>
                <h3 className="text-base md:text-lg font-bold text-[#111] mb-2">{t(`methods.${i}.title`)}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{t(`methods.${i}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-4 md:px-6 mt-12 md:mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8">{t("sourcesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-[#FAF7F2] rounded-lg">
                <div className="w-2 h-2 bg-[#9E2A2B] rounded-full shrink-0" />
                <div><span className="font-semibold text-[#111] text-sm">{t(`sources.${i}.source`)}</span><p className="text-[#666] text-xs mt-0.5">{t(`sources.${i}.desc`)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">{t("levelsTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[0, 1, 2].map((i) => {
            const isPopular = i === 1;
            return (
              <div key={i} className={`bg-white rounded-xl p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] relative ${isPopular ? "border-2 border-[#9E2A2B]" : "border-2 border-transparent"}`}>
                {isPopular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#9E2A2B] text-white px-4 py-1 rounded-xl text-xs font-bold">{t("popular")}</span>}
                <h3 className="text-lg font-bold text-[#111] mb-2">{t(`plans.${i}.plan`)}</h3>
                <div className="text-2xl md:text-3xl font-extrabold text-[#9E2A2B] mb-5">{t(`plans.${i}.price`)}</div>
                <ul className="list-none p-0">{(t.raw(`plans.${i}.features`) as string[]).map((feature: string, j: number) => <li key={j} className="py-2 border-b border-gray-100 text-[#666] text-sm flex items-center gap-2"><span className="text-[#27AE60]">✓</span>{feature}</li>)}</ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-base text-white/80 mb-8">{t("ctaDescription")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold no-underline text-center">{t("startFreeTrial")}</Link>
          <Link href="/tools/domain-lookup" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">{t("tryLookup")}</Link>
          <Link href="/tools/api" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">{t("viewDocs")}</Link>
        </div>
      </section>
    </div>
  );
}
