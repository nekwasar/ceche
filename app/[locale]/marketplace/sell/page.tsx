"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SellPage() {
  const t = useTranslations("mp.sell");
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 pb-20 md:pb-24 lg:pb-32">
        <div className="mb-8 md:mb-12">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#999] block mb-3">{t("badge")}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111] mb-4">{t("title")}</h1>
          <p className="text-base md:text-lg text-[#666] max-w-md">{t("subtitle")}</p>
        </div>

        <section className="mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row gap-0 mb-8 md:mb-10">
            {[0, 1, 2].map((i) => (
              <div key={i} onClick={() => setActiveStep(i)} className={`flex-1 py-3.5 px-5 cursor-pointer text-center font-semibold text-sm transition-colors ${i === activeStep ? "bg-[#9E2A2B] text-white" : i < activeStep ? "bg-[#7A1F21] text-white" : "bg-[#EFECE6] text-[#666]"} ${i === 0 ? "rounded-t-xl sm:rounded-t-none sm:rounded-l-xl" : ""} ${i === 2 ? "rounded-b-xl sm:rounded-b-none sm:rounded-r-xl" : ""}`}>
                <span className="font-mono mr-2 opacity-60">{String(i + 1).padStart(2, "0")}</span>{t(`steps.${i}`)}
              </div>
            ))}
          </div>
          <div className="bg-[#EFECE6] rounded-2xl p-6 md:p-8 border border-black/5">
            {activeStep === 0 && <div><h3 className="text-lg font-bold text-[#111] mb-2">{t("step0.title")}</h3><p className="text-sm text-[#666] mb-4">{t("step0.desc")}</p><div className="flex flex-col sm:flex-row gap-3"><input type="text" placeholder={t("step0.placeholder")} className="flex-1 px-4 py-3 rounded-[10px] border border-black/10 bg-white text-sm outline-none" /><button onClick={() => setActiveStep(1)} className="px-7 py-3 bg-[#9E2A2B] text-white rounded-[10px] font-semibold text-sm border-none cursor-pointer">{t("step0.cta")}</button></div></div>}
            {activeStep === 1 && <div><h3 className="text-lg font-bold text-[#111] mb-2">{t("step1.title")}</h3><p className="text-sm text-[#666] mb-4">{t("step1.desc")}</p><div className="flex flex-col sm:flex-row sm:items-center gap-3"><div className="flex items-center gap-2"><span className="text-sm font-semibold text-[#111]">$</span><input type="text" defaultValue="12,500" className="w-full sm:w-40 px-4 py-3 rounded-[10px] border border-black/10 bg-white text-sm font-semibold outline-none" /></div><span className="text-xs text-[#999]">{t("step1.suggested")}</span><button onClick={() => setActiveStep(2)} className="sm:ml-auto px-7 py-3 bg-[#9E2A2B] text-white rounded-[10px] font-semibold text-sm border-none cursor-pointer">{t("step1.cta")}</button></div></div>}
            {activeStep === 2 && <div><h3 className="text-lg font-bold text-[#111] mb-2">{t("step2.title")}</h3><p className="text-sm text-[#666] mb-4">{t("step2.desc")}</p><button className="px-8 py-3.5 bg-[#047857] text-white rounded-[10px] font-semibold text-sm border-none cursor-pointer">{t("step2.cta")}</button></div>}
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">{t("fees.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div><h3 className="text-base font-bold text-[#111] mb-3">{t("fees.listing.title")}</h3><div className="bg-[#EFECE6] rounded-[14px] overflow-hidden border border-black/5">{[0, 1, 2].map((i) => <div key={i} className={`flex items-center justify-between px-5 py-3.5 ${i < 2 ? "border-b border-black/6" : ""}`}><span className="text-sm text-[#111]">{t(`fees.listing.tiers.${i}.tier`)}</span><div className="flex items-center gap-4 shrink-0 ml-4"><span className="text-sm font-bold text-[#9E2A2B]">{t(`fees.listing.tiers.${i}.fee`)}</span><span className="text-xs text-[#999] w-8 text-right">{t(`fees.listing.tiers.${i}.min`)}</span></div></div>)}</div></div>
            <div><h3 className="text-base font-bold text-[#111] mb-3">{t("fees.commission.title")}</h3><div className="bg-[#EFECE6] rounded-[14px] overflow-hidden border border-black/5">{[0, 1, 2].map((i) => <div key={i} className={`flex items-center justify-between px-5 py-3.5 ${i < 2 ? "border-b border-black/6" : ""}`}><span className="text-sm text-[#111]">{t(`fees.commission.tiers.${i}.tier`)}</span><div className="flex items-center gap-4 shrink-0 ml-4"><span className="text-sm font-bold text-[#9E2A2B]">{t(`fees.commission.tiers.${i}.commission`)}</span><span className="text-xs text-[#999]">Min: {t(`fees.commission.tiers.${i}.minimum`)}</span></div></div>)}</div></div>
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">{t("eligibility.title")}</h2>
          <div className="bg-[#EFECE6] rounded-2xl p-6 md:p-7 border border-black/5">
            <ul className="m-0 p-0 list-none flex flex-col gap-3">{[0, 1, 2, 3].map((i) => <li key={i} className="flex items-center gap-3 text-sm text-[#111]"><span className="text-[#047857] font-bold">✓</span>{t(`eligibility.items.${i}`)}</li>)}</ul>
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">{t("tools.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[0, 1, 2].map((i) => <div key={i} className="bg-[#EFECE6] rounded-2xl p-6 md:p-7 border border-black/5"><h3 className="text-base font-bold text-[#111] mb-2">{t(`tools.items.${i}.title`)}</h3><p className="text-xs text-[#666] m-0">{t(`tools.items.${i}.desc`)}</p></div>)}</div>
        </section>

        <section className="bg-[#111] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
          <p className="text-base text-white/60 mb-7">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/signup" className="inline-block px-8 py-3.5 bg-[#F4A261] text-[#111] rounded-[10px] font-semibold text-sm no-underline text-center">{t("cta.signup")}</a>
            <a href="/pricing" className="inline-block px-8 py-3.5 border border-white/30 text-white rounded-[10px] font-semibold text-sm no-underline text-center">{t("cta.pricing")}</a>
          </div>
        </section>
      </div>
    </main>
  );
}
