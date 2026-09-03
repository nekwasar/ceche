import Link from "next/link";
import { useTranslations } from "next-intl";

export default async function DomainInvestorsPage() {
  const t = await import("next-intl/server").then((m) => m.getTranslations("sol.investors"));

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <span className="inline-block px-3.5 py-1.5 bg-[#9E2A2B] text-white rounded-md text-xs font-bold tracking-wider uppercase mb-5">{t("badge")}</span>
          <h1 className="text-3xl md:text-4xl lg:text-[52px] font-extrabold leading-tight mb-4">{t("title")}</h1>
          <p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md mb-8">{t("desc")}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/signup" className="inline-block px-7 py-3.5 bg-[#9E2A2B] text-white rounded-lg text-sm font-bold no-underline text-center">{t("cta.0")}</Link>
            <Link href="/pricing" className="inline-block px-7 py-3.5 bg-transparent text-[#9E2A2B] border-2 border-[#9E2A2B] rounded-lg text-sm font-bold no-underline text-center">{t("cta.1")}</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-[#E8E5DF] rounded-xl p-5 md:p-7 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-[#9E2A2B] mb-1">{t(`stats.${i}.value`)}</div>
              <div className="text-xs text-[#666]">{t(`stats.${i}.label`)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("problem.title")}</h2>
          <p className="text-base text-[#666] leading-relaxed mb-4">{t("problem.desc")}</p>
          <ul className="text-sm text-[#666] leading-loose pl-5 list-disc">{[0, 1, 2, 3].map((i) => <li key={i}>{t(`problem.items.${i}`)}</li>)}</ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("solution.title")}</h2>
          <p className="text-base text-[#666] leading-relaxed mb-4">{t("solution.desc")}</p>
          <ul className="text-sm text-[#666] leading-loose pl-5 list-disc">{[0, 1, 2, 3].map((i) => <li key={i}>{t(`solution.items.${i}`)}</li>)}</ul>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-center mb-8">{t("commission.title")}</h2>
        <div className="bg-white rounded-xl border border-[#E8E5DF] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[450px]">
              <thead><tr className="bg-[#9E2A2B] text-white">{[0, 1, 2].map((i) => <th key={i} className="py-4 px-5 text-left font-bold">{t(`commission.headers.${i}`)}</th>)}</tr></thead>
              <tbody>{[0, 1, 2, 3].map((i) => <tr key={i} className={`border-t border-[#E8E5DF] ${i % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"}`}><td className="py-3.5 px-5 font-semibold">{t(`commission.rows.${i}.tier`)}</td><td className="py-3.5 px-5 text-[#9E2A2B] font-bold">{t(`commission.rows.${i}.commission`)}</td><td className="py-3.5 px-5">{t(`commission.rows.${i}.minimum`)}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-center mb-8">{t("toolsTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-[#E8E5DF] rounded-xl p-5 md:p-6">
              <h3 className="text-base font-bold mb-2 text-[#111]">{t(`tools.${i}.title`)}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{t(`tools.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-center mb-8 md:mb-10">{t("gettingStarted.title")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-[#E8E5DF] rounded-xl p-4 md:p-5 text-center">
              <div className="w-10 h-10 rounded-full bg-[#9E2A2B] text-white inline-flex items-center justify-center font-bold text-base mb-3">{i + 1}</div>
              <h4 className="text-sm font-bold mb-1">{t(`gettingStarted.steps.${i}.title`)}</h4>
              <p className="text-xs text-[#666]">{t(`gettingStarted.steps.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7a1f1f] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-base md:text-lg text-white/80 mb-8">{t("ctaDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-8 py-4 bg-[#F4A261] text-[#111] rounded-lg text-base font-bold no-underline text-center">{t("ctaSignup")}</Link>
          <Link href="/marketplace" className="inline-block px-8 py-4 bg-transparent text-white border-2 border-white/40 rounded-lg text-base font-bold no-underline text-center">{t("ctaMarketplace")}</Link>
        </div>
      </section>
    </main>
  );
}
