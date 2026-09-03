"use client";

import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("company.about");

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <section className="bg-[#111] py-16 md:py-20 lg:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(158,42,43,0.25) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#F4A261] mb-4">{t("badge")}</span>
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-tight mx-auto mb-5 max-w-lg">{t("title")}</h1>
          <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-md mx-auto">{t("desc")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8 md:mt-9">
            <a href="/tools/appraisal" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4A261] text-[#111] font-semibold text-sm no-underline">{(t.raw("cta") as string[])[0]}</a>
            <a href="/marketplace" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-semibold text-sm no-underline">{(t.raw("cta") as string[])[1]}</a>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#EFECE6] rounded-[20px] p-8 md:p-12 lg:p-14">
            <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#999] mb-3">{t("origin.badge")}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111] m-0 mb-6 leading-tight">{t("origin.title")}</h2>
            <p className="text-sm md:text-base text-[#666] leading-relaxed mb-4">{t("origin.p1")}</p>
            <p className="text-sm md:text-base text-[#666] leading-relaxed">{t("origin.p2")}</p>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16 lg:pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-full bg-[#9E2A2B] flex items-center justify-center"><span className="text-[28px] font-bold text-white">NU</span></div>
            </div>
            <div className="flex-1 min-w-[300px]">
              <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#999] mb-2">{t("founder.label")}</span>
              <h2 className="text-xl md:text-2xl font-bold text-[#111] m-0 mb-3">{t("founder.name")}</h2>
              <p className="text-sm text-[#666] leading-relaxed">{t("founder.bio")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16 lg:pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#EFECE6] rounded-[20px] p-8 md:p-12 lg:p-14">
            <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#999] mb-3">{t("values.badge")}</span>
            <h2 className="text-xl md:text-2xl font-bold text-[#111] m-0 mb-8 md:mb-10">{t("values.title")}</h2>
            <div className="flex flex-col gap-6 md:gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-9 h-9 rounded-lg bg-[#9E2A2B] flex items-center justify-center shrink-0"><span className="text-sm font-bold text-white">{i + 1}</span></div>
                  <div>
                    <h3 className="text-base font-bold text-[#111] m-0 mb-2">{t(`values.items.${i}.title`)}</h3>
                    <p className="text-sm text-[#666] leading-relaxed m-0">{t(`values.items.${i}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{t("cta.title")}</h2>
          <p className="text-base text-[#999] mb-8">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/marketplace" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4A261] text-[#111] font-semibold text-sm no-underline">{t("cta.marketplace")}</a>
            <a href="/pricing" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-semibold text-sm no-underline">{t("cta.pricing")}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
