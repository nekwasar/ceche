import Link from "next/link";
import { useTranslations } from "next-intl";
import { TrendingUp, Rocket, BarChart3, Search, Microscope, Gem } from "lucide-react";

const icons = [TrendingUp, Rocket, BarChart3, Search, Microscope, Gem];

export default async function SolutionsPage() {
  const t = await import("next-intl/server").then((m) => m.getTranslations("sol.index"));

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#111]">
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] mb-4 leading-tight">{t("title")}</h1>
        <p className="text-base md:text-lg text-[#666] max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed">{t("subtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 text-left">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const Icon = icons[i];
            return (
              <Link key={i} href={t(`personas.${i}.href`)} className="flex flex-col p-6 md:p-8 bg-white rounded-2xl border border-[#E8E5DF] no-underline text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                <span className="text-4xl mb-4 block"><Icon className="w-10 h-10 text-[#9E2A2B]" /></span>
                <h3 className="text-xl font-bold mb-2 text-[#111]">{t(`personas.${i}.title`)}</h3>
                <p className="text-sm text-[#666] leading-relaxed flex-1 mb-5">{t(`personas.${i}.desc`)}</p>
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-2xl md:text-3xl font-extrabold text-[#9E2A2B]">{t(`personas.${i}.stat`)}</span>
                  <span className="text-xs text-[#999]">{t(`personas.${i}.statLabel`)}</span>
                </div>
                <span className="text-sm font-semibold text-[#9E2A2B]">{t("learnMore")}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-[#111] py-12 md:py-16 px-4 md:px-6 text-center">
        <p className="text-base md:text-lg text-[#FAF7F2] mb-5 font-medium">{t("cta.ready")}</p>
        <Link href="/signup" className="inline-block px-8 py-3.5 bg-[#9E2A2B] text-white rounded-lg text-base font-bold no-underline">{t("cta.signup")}</Link>
      </section>
    </main>
  );
}
