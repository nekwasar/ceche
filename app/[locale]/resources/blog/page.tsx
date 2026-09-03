"use client";

import { useTranslations } from "next-intl";

export default function BlogPage() {
  const t = useTranslations("res.blog");

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          <div className="flex-[5] min-w-0">
            <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#9E2A2B] mb-4">{t("badge")}</span>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#111] leading-tight font-[Georgia,serif] m-0">{t("title")}</h1>
            <p className="text-base md:text-lg text-[#666] leading-relaxed mt-5 max-w-md">{t("subtitle")}</p>
          </div>
          <div className="flex-[2] min-w-[180px] pt-2">
            <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#999] mb-3">{t("topicsBadge")}</span>
            <div className="flex flex-col gap-2.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="text-sm text-[#9E2A2B] cursor-pointer font-medium border-b border-transparent hover:border-[#9E2A2B] transition-colors">
                  {t(`categories.${i}`)} →
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-[#EFECE6] py-3.5 mb-12 md:mb-15 border-y border-[#E8E5DE]">
        <div className="flex gap-[60px] whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[0, 1].map((i) => (
            <span key={i} className="text-xs text-[#999] tracking-[2px] uppercase font-mono">{t("marquee")}</span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      <section className="pb-16 md:pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <a key={i} href="#" className="block py-7 md:py-8 border-t border-[#E8E5DE] no-underline text-[#111]">
                <span className="block text-xs text-[#999] font-mono mb-3">{t(`articles.${i}.date`)}</span>
                <h2 className="text-xl md:text-[26px] font-bold leading-snug m-0 text-[#111]">{t(`articles.${i}.title`)}</h2>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{t("cta.title")}</h2>
          <p className="text-base text-[#999] mb-8">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/resources/ebooks" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4A261] text-[#111] font-semibold text-sm no-underline">{t("cta.ebooks")}</a>
            <a href="/pricing" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-semibold text-sm no-underline">{t("cta.pricing")}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
