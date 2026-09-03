import Link from "next/link";
import { useTranslations } from "next-intl";
import { Gem, Lock, Clock, CreditCard } from "lucide-react";

const trustIcons = [Lock, Clock, CreditCard];

export default async function BuyPremiumPage() {
  const t = await import("next-intl/server").then((m) => m.getTranslations("sol.premium"));

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-[#9E2A2B] inline-flex items-center justify-center text-[28px] mb-6"><Gem className="w-7 h-7 text-white" /></div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">{t("heroTitle")}</h1>
        <p className="text-base md:text-lg text-[#666] leading-relaxed max-w-lg mx-auto">{t("heroDesc")}</p>
      </section>

      <section className="max-w-2xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-5 md:gap-6 relative">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#9E2A2B] text-white flex items-center justify-center font-bold text-base shrink-0">{i + 1}</div>
              {i < 2 && <div className="w-0.5 flex-1 bg-[#E8E5DF] mt-2" />}
            </div>
            <div className="pb-8 md:pb-10">
              <h3 className="text-lg font-bold mb-2">{t(`steps.${i}.title`)}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{t(`steps.${i}.desc`)}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[0, 1, 2].map((i) => {
            const Icon = trustIcons[i];
            return (
              <div key={i} className="bg-white border border-[#E8E5DF] rounded-xl p-6 md:p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#9E2A2B]/10 flex items-center justify-center mx-auto mb-4"><Icon className="w-6 h-6 text-[#9E2A2B]" /></div>
                <h3 className="text-base font-bold mb-2">{t(`trust.${i}.title`)}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{t(`trust.${i}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl font-bold text-center mb-3">{t("pricingTitle")}</h2>
        <p className="text-base text-[#666] text-center mb-8">{t("pricingDesc")}</p>
        <div className="bg-white rounded-xl border border-[#E8E5DF] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[500px]">
              <thead><tr className="bg-[#111] text-white">{[0, 1, 2].map((i) => <th key={i} className="py-3.5 px-5 text-left font-bold">{t(`pricingHeaders.${i}`)}</th>)}</tr></thead>
              <tbody>{[0, 1, 2, 3].map((i) => <tr key={i} className={`border-t border-[#E8E5DF] ${i % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"}`}><td className="py-3.5 px-5 font-semibold">{t(`pricingRows.${i}.type`)}</td><td className="py-3.5 px-5 font-bold text-[#9E2A2B]">{t(`pricingRows.${i}.amount`)}</td><td className="py-3.5 px-5 text-[#666]">{t(`pricingRows.${i}.notes`)}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-base md:text-lg text-white/70 max-w-lg mx-auto mb-8">{t("ctaDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/marketplace" className="inline-block px-8 py-4 bg-[#9E2A2B] text-white rounded-lg text-base font-bold no-underline text-center">{t("ctaMarketplace")}</Link>
          <Link href="/pricing" className="inline-block px-8 py-4 bg-transparent text-[#F4A261] border-2 border-[#F4A261] rounded-lg text-base font-bold no-underline text-center">{t("ctaPricing")}</Link>
        </div>
      </section>
    </main>
  );
}
