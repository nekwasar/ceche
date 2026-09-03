import Link from "next/link";
import { useTranslations } from "next-intl";
import { BarChart3, Link2, TrendingUp, DollarSign, Shield } from "lucide-react";

const sectionIcons = [BarChart3, Link2, Link2, TrendingUp, DollarSign, Shield];

export default async function ResearchIntelligencePage() {
  const t = await import("next-intl/server").then((m) => m.getTranslations("sol.research"));

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <div className="flex items-center gap-2 mb-5 text-sm text-[#999]">
          <span>{t("breadcrumb.0")}</span><span>/</span><span className="text-[#9E2A2B] font-semibold">{t("breadcrumb.1")}</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold leading-tight mb-4">{t("title")}</h1>
        <p className="text-base md:text-lg text-[#666] leading-relaxed max-w-xl">{t("desc")}</p>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const Icon = sectionIcons[i];
          return (
            <div key={i} className="flex gap-5 md:gap-6 py-6 md:py-7 border-b border-[#E8E5DF]">
              <div className="w-12 h-12 rounded-[10px] bg-[#9E2A2B] text-white flex items-center justify-center font-extrabold text-sm shrink-0">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><Icon className="w-5 h-5 text-[#9E2A2B]" /> {t(`sections.${i}.title`)}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{t(`sections.${i}.desc`)}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">{t("compareTitle")}</h2>
        <div className="bg-white rounded-xl border border-[#E8E5DF] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[550px]">
              <thead><tr className="bg-[#111] text-white">{[0, 1, 2, 3].map((i) => <th key={i} className={`py-3.5 px-5 ${i === 0 ? "text-left font-semibold" : "text-center font-bold"} ${i === 1 ? "text-[#F4A261]" : ""}`}>{t(`compareHeaders.${i}`)}</th>)}</tr></thead>
              <tbody>{[0, 1, 2, 3, 4, 5, 6].map((i) => <tr key={i} className={`border-t border-[#E8E5DF] ${i % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"}`}><td className="py-3 px-5 font-semibold">{t(`compareRows.${i}.feature`)}</td><td className="py-3 px-5 text-center text-[#9E2A2B] font-bold">{t(`compareRows.${i}.ceche`)}</td><td className="py-3 px-5 text-center text-[#666]">{t(`compareRows.${i}.dynadot`)}</td><td className="py-3 px-5 text-center text-[#666]">{t(`compareRows.${i}.godaddy`)}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7a1f1f] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-base md:text-lg text-white/80 max-w-lg mx-auto mb-8">{t("ctaDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-8 py-4 bg-white text-[#9E2A2B] rounded-lg text-base font-bold no-underline text-center">{t("ctaSignup")}</Link>
          <Link href="/tools/appraisal" className="inline-block px-8 py-4 bg-transparent text-white border-2 border-white/40 rounded-lg text-base font-bold no-underline text-center">{t("ctaAppraise")}</Link>
        </div>
      </section>
    </main>
  );
}
