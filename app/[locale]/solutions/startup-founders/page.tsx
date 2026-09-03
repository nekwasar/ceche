import Link from "next/link";
import { useTranslations } from "next-intl";
import { Tag, MessageCircle, Globe, Smartphone } from "lucide-react";

const featureIcons = [Tag, MessageCircle, Globe, Smartphone];

export default async function StartupFoundersPage() {
  const t = await import("next-intl/server").then((m) => m.getTranslations("sol.founders"));

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 text-center">
        <span className="inline-block px-3.5 py-1.5 bg-[#F4A261] text-[#111] rounded-md text-xs font-bold tracking-wider uppercase mb-5">{t("badge")}</span>
        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-extrabold leading-tight mb-4">{t("title")}</h1>
        <p className="text-base md:text-lg text-[#666] leading-relaxed max-w-xl mx-auto">{t("desc")}</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative">
              <div className="bg-white border border-[#E8E5DF] rounded-xl p-6 md:p-7 text-center">
                <div className="w-11 h-11 rounded-full bg-[#9E2A2B] text-white inline-flex items-center justify-center font-bold text-base mb-3.5">{i + 1}</div>
                <h3 className="text-base font-bold mb-1.5">{t(`steps.${i}.title`)}</h3>
                <p className="text-xs text-[#666] leading-relaxed">{t(`steps.${i}.desc`)}</p>
              </div>
              {i < 2 && <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 text-2xl text-[#ccc] z-10">→</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        {[0, 1, 2, 3].map((i) => {
          const Icon = featureIcons[i];
          return (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center mb-10 md:mb-12`}>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-3">{t(`features.${i}.title`)}</h3>
                <p className="text-sm md:text-base text-[#666] leading-relaxed">{t(`features.${i}.desc`)}</p>
              </div>
              <div className="flex-1 w-full h-40 md:h-48 bg-white border border-[#E8E5DF] rounded-xl flex items-center justify-center"><Icon className="w-10 h-10 text-[#9E2A2B]" /></div>
            </div>
          );
        })}
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <h2 className="text-2xl font-bold text-center mb-8">{t("builtForTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-[#E8E5DF] rounded-xl p-5 md:p-6">
              <h4 className="text-base font-bold mb-1.5">{t(`builtFor.${i}.title`)}</h4>
              <p className="text-sm text-[#666] leading-relaxed">{t(`builtFor.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-base md:text-lg text-white/70 max-w-lg mx-auto mb-8">{t("ctaDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-8 py-4 bg-[#9E2A2B] text-white rounded-lg text-base font-bold no-underline text-center">{t("ctaSignup")}</Link>
          <Link href="/tools/appraisal" className="inline-block px-8 py-4 bg-transparent text-[#F4A261] border-2 border-[#F4A261] rounded-lg text-base font-bold no-underline text-center">{t("ctaAppraise")}</Link>
        </div>
      </section>
    </main>
  );
}
