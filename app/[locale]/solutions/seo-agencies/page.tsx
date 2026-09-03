import Link from "next/link";
import { useTranslations } from "next-intl";
import { BarChart3, Shield, Layers, FileText } from "lucide-react";

const featureIcons = [BarChart3, Shield, Layers, FileText];

export default async function SeoAgenciesPage() {
  const t = await import("next-intl/server").then((m) => m.getTranslations("sol.agencies"));

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      <section className="bg-[#111] py-16 md:py-20 lg:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10 md:mb-12">
            <span className="inline-block px-3.5 py-1.5 bg-[#9E2A2B] text-white rounded-md text-xs font-bold tracking-wider uppercase mb-5">{t("badge")}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-white">{t("title")}</h1>
            <p className="text-base md:text-lg text-white/60 leading-relaxed">{t("desc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`rounded-xl p-5 md:p-6 text-center ${i === 3 ? "bg-[#9E2A2B]" : "bg-white/8"}`}>
                <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">{t(`stats.${i}.value`)}</div>
                <div className="text-xs text-white/60">{t(`stats.${i}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">{t("whyTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border-t-[3px] border-[#9E2A2B] bg-white rounded-b-xl p-6 md:p-8">
              <span className="text-xs font-bold text-[#9E2A2B] tracking-wider">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-bold mt-2 mb-3">{t(`why.${i}.title`)}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{t(`why.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        {[0, 1, 2, 3].map((i) => {
          const Icon = featureIcons[i];
          return (
            <div key={i} className={`flex flex-col md:flex-row gap-5 md:gap-12 items-start md:items-center py-6 md:py-8 ${i < 3 ? "border-b border-[#E8E5DF]" : ""}`}>
              <div className="w-14 md:w-16 h-14 md:h-16 rounded-xl bg-[#9E2A2B] flex items-center justify-center shrink-0"><Icon className="w-7 h-7 text-white" /></div>
              <div><h3 className="text-lg font-bold mb-2">{t(`features.${i}.title`)}</h3><p className="text-sm text-[#666] leading-relaxed max-w-xl">{t(`features.${i}.desc`)}</p></div>
            </div>
          );
        })}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">{t("plansTitle")}</h2>
        <p className="text-base text-[#666] text-center mb-8 md:mb-10">{t("plansDesc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[0, 1, 2].map((i) => {
            const isDark = i === 1;
            return (
              <div key={i} className={`${isDark ? "bg-[#111] text-white" : "bg-white text-[#111] border border-[#E8E5DF]"} rounded-xl p-6 md:p-8 flex flex-col`}>
                <h3 className="text-lg font-bold mb-1">{t(`plans.${i}.name`)}</h3>
                <div className="flex items-baseline mb-5"><span className="text-3xl md:text-4xl font-extrabold">{t(`plans.${i}.price`)}</span><span className={`text-sm ml-1 ${isDark ? "text-white/50" : "text-[#999]"}`}>{t(`plans.${i}.period`)}</span></div>
                <ul className="list-none p-0 m-0 mb-6 flex-1">{[0, 1, 2, 3].map((j) => { const feat = t(`plans.${i}.features.${j}`); if (!feat || feat.startsWith("plans.")) return null; return <li key={j} className={`text-sm py-1.5 ${isDark ? "text-white/80" : "text-[#666]"}`}>✓ {feat}</li>; })}</ul>
                <Link href="/signup" className={`inline-block py-3 px-6 rounded-lg text-sm font-bold no-underline text-center ${isDark ? "bg-[#9E2A2B] text-white" : "bg-[#111] text-white"}`}>{t(`plans.${i}.cta`)}</Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#111] to-[#1a1a1a] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{t("ctaTitle")}</h2>
        <p className="text-base text-white/60 mb-8">{t("ctaDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-7 py-3.5 bg-[#9E2A2B] text-white rounded-lg text-sm font-bold no-underline text-center">{t("ctaSignup")}</Link>
          <Link href="/help/api" className="inline-block px-7 py-3.5 bg-transparent text-[#F4A261] border-2 border-[#F4A261] rounded-lg text-sm font-bold no-underline text-center">{t("ctaApi")}</Link>
        </div>
      </section>
    </main>
  );
}
