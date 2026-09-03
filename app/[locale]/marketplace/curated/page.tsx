"use client";

import { useTranslations } from "next-intl";

export default function CuratedPage() {
  const t = useTranslations("mp.curated");

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 pb-20 md:pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20 items-center">
          <div className="lg:col-span-3">
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#999] block mb-3">{t("badge")}</span>
            <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#111] mb-4 leading-tight">{t("title")}</h1>
            <p className="text-base md:text-lg text-[#666] mb-6 md:mb-7 leading-relaxed">{t("subtitle")}</p>
            <a href="/marketplace/try-your-luck" className="inline-block px-8 py-3.5 bg-[#9E2A2B] text-white rounded-[10px] font-semibold text-sm no-underline">{t("tryLuck")}</a>
          </div>
          <div className="lg:col-span-2 bg-[#EFECE6] rounded-[20px] p-6 md:p-8 lg:p-9 border border-black/5">
            <div className="mb-5 md:mb-6">
              <div className="text-[10px] font-mono text-[#999] uppercase mb-1">{t("featured.label")}</div>
              <div className="text-2xl md:text-[28px] font-bold text-[#9E2A2B] mb-1">██████████.com</div>
              <div className="text-xs text-[#999]">{t("featured.hidden")}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-6">
              {["Valuation", "DA Score", "Spam Score", "CPC", "Backlinks", "Age"].map((label) => (
                <div key={label}><div className="text-[10px] font-mono text-[#999] uppercase mb-0.5">{label}</div><div className="text-lg md:text-xl font-bold text-[#111]">{"$" + (label === "Valuation" ? "87,500" : label === "CPC" ? "24.80" : label === "Backlinks" ? "14,200" : label === "Age" ? "12 years" : label === "DA Score" ? "72" : "0/100")}</div></div>
              ))}
            </div>
            <div className="flex items-center justify-between py-3.5 px-5 bg-[#111] rounded-xl">
              <span className="text-sm font-semibold text-white">{t("featured.instant")}</span>
              <span className="text-sm font-bold text-[#F4A261]">$87,500</span>
            </div>
          </div>
        </div>

        <section className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-[#EFECE6] rounded-[14px] px-5 py-4 md:py-5 border border-black/5 flex items-start gap-3">
                <span className="text-[#047857] font-bold text-base leading-none mt-0.5 shrink-0">✓</span>
                <span className="text-sm text-[#111]">{t(`features.${i}`)}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-6 md:mb-8 text-center">{t("howItWorks.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`py-6 md:py-8 px-6 md:px-7 ${i < 2 ? "sm:border-r sm:border-black/8 border-b sm:border-b-0 border-black/8 pb-6 sm:pb-0 mb-6 sm:mb-0" : ""}`}>
                <div className="w-12 h-12 rounded-xl bg-[#9E2A2B] text-white flex items-center justify-center text-xl font-bold mb-4">{i + 1}</div>
                <h3 className="text-base font-bold text-[#111] mb-2">{t(`howItWorks.steps.${i}.title`)}</h3>
                <p className="text-sm text-[#666] m-0 leading-relaxed">{t(`howItWorks.steps.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 md:mt-20 bg-[#111] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
          <p className="text-base text-white/60 mb-7">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/marketplace" className="inline-block px-8 py-3.5 bg-[#F4A261] text-[#111] rounded-[10px] font-semibold text-sm no-underline text-center">{t("cta.marketplace")}</a>
            <a href="/marketplace/try-your-luck" className="inline-block px-8 py-3.5 border border-white/30 text-white rounded-[10px] font-semibold text-sm no-underline text-center">{t("cta.luck")}</a>
          </div>
        </section>
      </div>
    </main>
  );
}
