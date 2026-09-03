import { Check, X, ArrowRight, Star, Shield, Crown } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PricingPage() {
  const t = await getTranslations("pricingPage");

  const plans = [
    {
      name: t("plans.free.name"),
      annualPrice: 0,
      annualNote: "",
      description: t("plans.free.description"),
      icon: Star,
      features: (t.raw("plans.free.features") as string[]).map((text: string, i: number) => ({
        text,
        included: (t.raw("plans.free.included") as boolean[])[i],
      })),
      cta: t("plans.free.cta"),
      href: "/signup",
      accent: false,
    },
    {
      name: t("plans.startup.name"),
      annualPrice: 788,
      annualNote: t("plans.startup.annualNote"),
      description: t("plans.startup.description"),
      icon: Shield,
      features: (t.raw("plans.startup.features") as string[]).map((text: string, i: number) => ({
        text,
        included: (t.raw("plans.startup.included") as boolean[])[i],
      })),
      cta: t("plans.startup.cta"),
      href: "/signup?plan=startup",
      accent: true,
    },
    {
      name: t("plans.enterprise.name"),
      annualPrice: 1288,
      annualNote: t("plans.enterprise.annualNote"),
      description: t("plans.enterprise.description"),
      icon: Crown,
      features: (t.raw("plans.enterprise.features") as string[]).map((text: string, i: number) => ({
        text,
        included: (t.raw("plans.enterprise.included") as boolean[])[i],
      })),
      cta: t("plans.enterprise.cta"),
      href: "/signup?plan=enterprise",
      accent: false,
    },
  ];

  const revealPricing = (t.raw("fees.reveal.rows") as Array<{ tier: string; range: string; fee: string }>);

  const tryYourLuck = [
    { tld: ".com", price: 79, popular: true },
    { tld: ".net", price: 39, popular: false },
    { tld: ".io", price: 29, popular: false },
    { tld: ".co", price: 9, popular: false },
    { tld: "Any TLD", price: 19, popular: false },
  ];

  const competitors = (t.raw("compare.rows") as string[]).map((feature: string, i: number) => ({
    feature,
    ceche: true,
    godaddy: i === 2 || i === 7,
    sedo: i === 2,
  }));

  return (
    <main className="min-h-screen text-[#111]" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#111] to-[#9E2A2B] py-12 md:py-16 lg:py-20 px-4 md:px-6 text-center">
        <p className="text-[11px] tracking-[3px] uppercase text-[#F4A261] font-mono mb-3">{t("hero.badge")}</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">{t("hero.title")}</h1>
        <p className="text-base md:text-lg text-white/70 max-w-md mx-auto">{t("hero.subtitle")}</p>
      </section>

      {/* Plans */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center -mt-7 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F4A261] text-[#111] font-bold text-xs px-5 py-2 rounded-full">
            {t("annual.banner")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div key={plan.name} className={`rounded-3xl p-6 md:p-8 lg:p-10 relative flex flex-col ${plan.accent ? "border-[3px] border-[#9E2A2B] shadow-[0_20px_60px_rgba(158,42,43,0.12)]" : "border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"} bg-white`}>
                {plan.accent && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9E2A2B] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full">
                    {t("annual.mostPopular")}
                  </span>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${plan.accent ? "bg-[#9E2A2B]" : "bg-[#EFECE6]"}`}>
                    <Icon size={22} color={plan.accent ? "#fff" : "#111"} />
                  </div>
                  <h3 className="text-lg font-bold m-0">{plan.name}</h3>
                </div>

                <div className="mb-2">
                  {plan.annualPrice === 0 ? (
                    <span className="text-4xl md:text-5xl font-black leading-none">$0</span>
                  ) : (
                    <div>
                      <span className="text-4xl md:text-5xl font-black leading-none">${plan.annualPrice}</span>
                      <span className="text-sm text-[#999] ml-1">/yr</span>
                      <div className="text-xs text-[#9E2A2B] font-semibold mt-1">=${Math.round(plan.annualPrice / 12)}/mo · {plan.annualNote}</div>
                    </div>
                  )}
                </div>

                <p className="text-sm text-[#666] mb-6 md:mb-8 leading-relaxed">{plan.description}</p>

                <div className="flex-1">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-start gap-2.5 mb-3">
                      {f.included ? (
                        <Check size={16} color="#9E2A2B" className="mt-0.5 shrink-0" />
                      ) : (
                        <X size={16} color="#999" className="mt-0.5 shrink-0" />
                      )}
                      <span className={`text-sm ${f.included ? "text-[#111]" : "text-[#999] line-through"}`}>{f.text}</span>
                    </div>
                  ))}
                </div>

                <a href={plan.href} className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm no-underline mt-8 transition-all ${plan.accent ? "bg-[#9E2A2B] text-white" : "bg-transparent text-[#111] border-2 border-[#111] hover:bg-[#111] hover:text-white"}`}>
                  {plan.cta} <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Try Your Luck */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="bg-gradient-to-br from-[#111] to-[#2a1520] rounded-3xl p-6 md:p-10 lg:p-16">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-[11px] tracking-[3px] uppercase text-[#F4A261] font-mono mb-3">{t("tryYourLuck.badge")}</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">{t("tryYourLuck.title")}</h2>
            <p className="text-base text-white/60 max-w-md mx-auto">{t("tryYourLuck.subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto">
            {tryYourLuck.map((item) => (
              <a key={item.tld} href="/marketplace/try-your-luck" className={`block text-center py-6 md:py-7 px-3 md:px-4 rounded-2xl no-underline transition-all ${item.popular ? "bg-[#F4A261] border-2 border-[#F4A261]" : "bg-white/6 border border-white/10 hover:bg-white/10"}`}>
                <div className="text-xs text-white/50 font-mono mb-1">{item.tld}</div>
                <div className={`text-2xl md:text-3xl font-black ${item.popular ? "text-[#111]" : "text-white"}`}>${item.price}</div>
                {item.popular && <div className="text-[11px] font-bold text-[#111] mt-1 uppercase tracking-wider">{t("tryYourLuck.mostPopular")}</div>}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Fees Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 md:grid-cols-3">
          {/* Reveal Pricing */}
          <div className="bg-white rounded-[20px] p-6 md:p-8 lg:p-9 border border-black/6">
            <p className="text-[11px] tracking-[3px] uppercase text-[#999] font-mono mb-2">{t("fees.reveal.badge")}</p>
            <h3 className="text-xl md:text-2xl font-black mb-5 md:mb-6">{t("fees.reveal.title")}</h3>
            <p className="text-xs text-[#666] mb-5 leading-relaxed">{t("fees.reveal.description")}</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm min-w-[280px]">
                <thead>
                  <tr className="border-b-2 border-[#EFECE6]">
                    <th className="py-2.5 text-left text-[11px] font-bold text-[#999]">{t("fees.reveal.headers.tier")}</th>
                    <th className="py-2.5 text-left text-[11px] font-bold text-[#999]">{t("fees.reveal.headers.valueRange")}</th>
                    <th className="py-2.5 text-right text-[11px] font-bold text-[#999]">{t("fees.reveal.headers.fee")}</th>
                  </tr>
                </thead>
                <tbody>
                  {revealPricing.map((r) => (
                    <tr key={r.tier} className="border-b border-black/4">
                      <td className="py-3 font-semibold">{r.tier}</td>
                      <td className="py-3 text-[#666]">{r.range}</td>
                      <td className="py-3 font-bold text-right font-mono">{r.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Listing Fees */}
          <div className="bg-white rounded-[20px] p-6 md:p-8 lg:p-9 border border-black/6">
            <p className="text-[11px] tracking-[3px] uppercase text-[#999] font-mono mb-2">{t("fees.listing.badge")}</p>
            <h3 className="text-xl md:text-2xl font-black mb-5 md:mb-6">{t("fees.listing.title")}</h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-center gap-3 p-4 bg-[#EFECE6] rounded-xl">
                <div>
                  <div className="text-sm font-bold">{t("fees.listing.standard.name")}</div>
                  <div className="text-xs text-[#666]">{t("fees.listing.standard.desc")}</div>
                </div>
                <div className="text-xl font-black font-mono">{t("fees.listing.standard.price")}</div>
              </div>
              <div className="flex flex-wrap justify-between items-center gap-3 p-4 bg-[#EFECE6] rounded-xl border-2 border-[#F4A261]">
                <div>
                  <div className="text-sm font-bold">{t("fees.listing.priority.name")}</div>
                  <div className="text-xs text-[#666]">{t("fees.listing.priority.desc")}</div>
                </div>
                <div className="text-xl font-black font-mono">{t("fees.listing.priority.price")}</div>
              </div>
            </div>
          </div>

          {/* Commission */}
          <div className="bg-white rounded-[20px] p-6 md:p-8 lg:p-9 border border-black/6">
            <p className="text-[11px] tracking-[3px] uppercase text-[#999] font-mono mb-2">{t("fees.commission.badge")}</p>
            <h3 className="text-xl md:text-2xl font-black mb-5 md:mb-6">{t("fees.commission.title")}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm min-w-[260px]">
                <thead>
                  <tr className="border-b-2 border-[#EFECE6]">
                    <th className="py-2.5 text-left text-[11px] font-bold text-[#999]">{t("fees.commission.headers.saleAmount")}</th>
                    <th className="py-2.5 text-right text-[11px] font-bold text-[#999]">{t("fees.commission.headers.rate")}</th>
                    <th className="py-2.5 text-right text-[11px] font-bold text-[#999]">{t("fees.commission.headers.minFee")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3].map((i) => (
                    <tr key={i} className="border-b border-black/4">
                      <td className="py-3">{t(`fees.commission.rows.${i}.amount`)}</td>
                      <td className="py-3 font-bold text-right font-mono">{t(`fees.commission.rows.${i}.rate`)}</td>
                      <td className="py-3 text-right font-mono text-[#666]">{t(`fees.commission.rows.${i}.min`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[11px] tracking-[3px] uppercase text-[#999] font-mono mb-3">{t("compare.badge")}</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3">{t("compare.title")}</h2>
          <p className="text-base text-[#666] max-w-md mx-auto">{t("compare.subtitle")}</p>
        </div>

        <div className="bg-white rounded-[20px] overflow-hidden border border-black/6 max-w-3xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[500px]">
              <thead>
                <tr className="bg-[#111]">
                  <th className="py-4 px-5 text-left text-sm font-bold text-white w-[40%]">{t("compare.headers.feature")}</th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-[#F4A261]">{t("compare.headers.ceche")}</th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-white/60">{t("compare.headers.godaddy")}</th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-white/60">{t("compare.headers.sedo")}</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, i) => (
                  <tr key={c.feature} className={i % 2 === 0 ? "bg-white" : "bg-[#EFECE6]"}>
                    <td className="py-3.5 px-5">{c.feature}</td>
                    <td className="py-3.5 px-4 text-center">
                      {c.ceche ? <Check size={18} color="#9E2A2B" className="mx-auto" /> : <X size={18} color="#999" className="mx-auto" />}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {c.godaddy ? <Check size={18} color="#888" className="mx-auto" /> : <X size={18} color="#999" className="mx-auto" />}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {c.sedo ? <Check size={18} color="#888" className="mx-auto" /> : <X size={18} color="#999" className="mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="bg-[#111] rounded-3xl p-8 md:p-12 lg:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">{t("cta.title")}</h2>
          <p className="text-base text-white/60 max-w-sm mx-auto mb-8">{t("cta.description")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/signup" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4A261] text-[#111] font-bold text-sm no-underline">
              {t("cta.signup")} <ArrowRight size={16} />
            </a>
            <a href="/help" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent text-white font-semibold text-sm no-underline border border-white/20">
              {t("cta.help")}
            </a>
            <a href="/tools/domain-lookup" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent text-white font-semibold text-sm no-underline border border-white/20">
              {t("cta.lookup")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
