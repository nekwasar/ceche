import Link from "next/link";
import { useTranslations } from "next-intl";

export default async function FindAvailablePage() {
  const t = await import("next-intl/server").then((m) => m.getTranslations("sol.available"));

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 text-center">
        <div className="text-7xl md:text-8xl lg:text-[120px] font-black text-[#9E2A2B] leading-none mb-2">{t("statValue")}</div>
        <div className="text-base md:text-lg font-semibold text-[#666] mb-3">{t("statLabel")}</div>
        <p className="text-base text-[#999] mb-8 md:mb-10">{t("tlds")}</p>
        <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold leading-tight mb-4">{t("title")}</h1>
        <p className="text-base md:text-lg text-[#666] max-w-xl mx-auto leading-relaxed">{t("desc")}</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("discovery.title")}</h2>
          <p className="text-base text-[#666] leading-relaxed mb-5">{t("discovery.desc1")}</p>
          <p className="text-base text-[#666] leading-relaxed mb-8">{t("discovery.desc2")}</p>
          <Link href="/signup" className="inline-block px-7 py-3.5 bg-[#9E2A2B] text-white rounded-lg text-sm font-bold no-underline">{t("discovery.cta")}</Link>
        </div>
        <div className="bg-white border border-[#E8E5DF] rounded-xl p-6 md:p-7">
          <h3 className="text-base font-bold mb-4 text-[#111]">{t("filters.title")}</h3>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`flex justify-between py-3 text-sm ${i < 6 ? "border-b border-[#E8E5DF]" : ""}`}>
              <span className="font-semibold text-[#111]">{t(`filters.items.${i}.label`)}</span>
              <span className="text-[#666]">{t(`filters.items.${i}.value`)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl font-bold text-center mb-8 md:mb-10">{t("timeline.title")}</h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative flex-1 text-center px-5">
              {i < 2 && <div className="hidden md:block absolute top-7 right-[-8px] w-4 h-0.5 bg-[#9E2A2B] z-10" />}
              <div className="w-14 h-14 rounded-full bg-[#9E2A2B] text-white inline-flex items-center justify-center font-bold text-lg mb-4">{i + 1}</div>
              <h3 className="text-base font-bold mb-2">{t(`timeline.steps.${i}.title`)}</h3>
              <p className="text-sm text-[#666] leading-relaxed max-w-[220px] mx-auto">{t(`timeline.steps.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">{t("plansTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[0, 1, 2].map((i) => {
            const highlight = i === 1;
            return (
              <div key={i} className={`${highlight ? "bg-[#9E2A2B] text-white" : "bg-white text-[#111] border border-[#E8E5DF]"} rounded-xl p-6 md:p-7 text-center`}>
                {highlight && <span className="inline-block px-3 py-1 bg-[#F4A261] text-[#111] rounded text-[11px] font-bold uppercase mb-3">{t("popular")}</span>}
                <h3 className="text-lg font-bold mb-2">{t(`plans.${i}.name`)}</h3>
                <div className="text-3xl font-extrabold mb-4">{t(`plans.${i}.price`)}</div>
                <ul className="list-none p-0 m-0 mb-5">{[0, 1, 2].map((j) => { const feat = t(`plans.${i}.features.${j}`); if (!feat || feat.startsWith("plans.")) return null; return <li key={j} className={`text-sm py-1.5 ${highlight ? "text-white/90" : "text-[#666]"}`}>✓ {feat}</li>; })}</ul>
                <Link href="/signup" className={`inline-block py-2.5 px-6 rounded-lg text-sm font-bold no-underline w-full text-center ${highlight ? "bg-white text-[#9E2A2B]" : "bg-[#111] text-white"}`}>{t("getStarted")}</Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <div className="bg-white rounded-2xl border border-[#E8E5DF] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center p-8 md:p-12">
            <div>
              <span className="inline-block px-2.5 py-1 bg-[#F4A261] text-[#111] rounded text-[11px] font-bold uppercase mb-3">{t("bulk.badge")}</span>
              <h2 className="text-2xl font-bold mb-3">{t("bulk.title")}</h2>
              <p className="text-base text-[#666] leading-relaxed mb-3">{t("bulk.desc")}</p>
              <p className="text-sm text-[#999]">{t("bulk.note")}</p>
            </div>
            <div className="bg-[#FAF7F2] rounded-xl p-6 md:p-8 font-mono text-xs leading-relaxed text-[#666]">
              <div className="text-[#9E2A2B] font-bold mb-2">// Bulk scan output</div>
              <div>Domain: startupai.com</div><div>Score: 87/100</div><div>TLD: .com ✓</div><div>Brandability: High</div><div>Price Range: $12–$15/yr</div>
              <div>─────</div>
              <div>Domain: hellocorp.io</div><div>Score: 72/100</div><div>TLD: .io ✓</div><div>Brandability: Medium</div><div>Price Range: $35–$45/yr</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-16 md:py-20 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-base md:text-lg text-white/70 mb-8">{t("ctaDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="inline-block px-8 py-4 bg-[#9E2A2B] text-white rounded-lg text-base font-bold no-underline text-center">{t("ctaSignup")}</Link>
          <Link href="/tools/seo-scanner" className="inline-block px-8 py-4 bg-transparent text-[#F4A261] border-2 border-[#F4A261] rounded-lg text-base font-bold no-underline text-center">{t("ctaScan")}</Link>
        </div>
      </section>
    </main>
  );
}
