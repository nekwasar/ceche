import { useTranslations } from "next-intl";
import { Lock, Timer, DollarSign, Shield } from "lucide-react";

const featureIcons = [Lock, Timer, DollarSign];

export default async function HowUnmaskingWorksPage() {
  const t = await import("next-intl/server").then((m) => m.getTranslations("mp.unmasking"));

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 pb-20 md:pb-24 lg:pb-32">
        <div className="mb-12 md:mb-16">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#999] block mb-3">{t("badge")}</span>
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#111] mb-4">{t("title")}</h1>
          <p className="text-base md:text-lg text-[#666] max-w-md">{t("subtitle")}</p>
        </div>

        <section className="mb-16 md:mb-20">
          <div className="flex flex-col">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`flex gap-5 md:gap-8 py-7 md:py-8 ${i < 4 ? "border-b border-black/8" : ""}`}>
                <div className="w-14 md:w-16 h-14 md:h-16 rounded-2xl bg-[#9E2A2B] text-white flex items-center justify-center text-lg md:text-xl font-bold font-mono shrink-0">{String(i + 1).padStart(2, "0")}</div>
                <div className="pt-1">
                  <h3 className="text-lg md:text-xl font-bold text-[#111] mb-2">{t(`steps.${i}.title`)}</h3>
                  <p className="text-sm md:text-base text-[#666] m-0 leading-relaxed max-w-lg">{t(`steps.${i}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#EFECE6] rounded-2xl p-6 md:p-8 lg:p-10 border border-black/5 mb-12 md:mb-16">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#047857] text-white flex items-center justify-center shrink-0"><Shield className="w-7 h-7" /></div>
            <div>
              <h3 className="text-lg font-bold text-[#111] mb-2">{t("vault.title")}</h3>
              <p className="text-sm text-[#666] m-0 leading-relaxed">{t("vault.desc")}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16">
          {[0, 1, 2].map((i) => {
            const Icon = featureIcons[i];
            return (
              <div key={i} className="bg-[#EFECE6] rounded-[14px] p-5 md:p-6 border border-black/5 text-center">
                <div className="mb-3"><Icon className="w-7 h-7 text-[#9E2A2B] mx-auto" /></div>
                <h4 className="text-sm font-bold text-[#111] mb-1.5">{t(`features.${i}.title`)}</h4>
                <p className="text-xs text-[#666] m-0">{t(`features.${i}.desc`)}</p>
              </div>
            );
          })}
        </section>

        <section className="bg-[#111] rounded-2xl p-8 md:p-12 text-center">
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
