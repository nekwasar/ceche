import { Check, X, ArrowRight, Star, Shield, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    annualNote: "",
    description: "Get started with basic tools. No credit card required.",
    icon: Star,
    features: [
      { text: "3 appraisals/day (unsigned)", included: true },
      { text: "12 appraisals/day (signed up)", included: true },
      { text: "Name search tool", included: true },
      { text: "Basic WHOIS lookup", included: true },
      { text: "Domain Scanner (DA, spam, backlinks)", included: false },
      { text: "Extended Insights (USPTO/WIPO)", included: false },
      { text: "Bulk Domain Audit", included: false },
      { text: "API access", included: false },
    ],
    cta: "Get Started",
    href: "/signup",
    accent: false,
  },
  {
    name: "Premium Startup",
    monthlyPrice: 79,
    annualPrice: 788,
    annualNote: "saves $160/yr",
    description: "For small teams and serious domain investors.",
    icon: Shield,
    features: [
      { text: "30 appraisals/day", included: true },
      { text: "Name search tool", included: true },
      { text: "Domain Scanner (DA, spam, backlinks)", included: true },
      { text: "Extended Insights (USPTO/WIPO)", included: true },
      { text: "Bulk Domain Audit", included: true },
      { text: "Priority marketplace listing", included: true },
      { text: "API access", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start Premium",
    href: "/signup?plan=startup",
    accent: true,
  },
  {
    name: "Premium Enterprise",
    monthlyPrice: 129,
    annualPrice: 1288,
    annualNote: "saves $260/yr",
    description: "For agencies, professionals, and power users.",
    icon: Crown,
    features: [
      { text: "Unlimited appraisals", included: true },
      { text: "Name search tool", included: true },
      { text: "Domain Scanner (DA, spam, backlinks)", included: true },
      { text: "Extended Insights (USPTO/WIPO)", included: true },
      { text: "Bulk Domain Audit", included: true },
      { text: "Priority marketplace listing", included: true },
      { text: "Full API access", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Start Enterprise",
    href: "/signup?plan=enterprise",
    accent: false,
  },
];

const revealPricing = [
  { tier: "Low", range: "Under $500", fee: "$5" },
  { tier: "Mid", range: "$500 – $5,000", fee: "$10" },
  { tier: "High", range: "$5,001 – $50,000", fee: "$25" },
  { tier: "Premium", range: "$50,001+", fee: "$50" },
];

const tryYourLuck = [
  { tld: ".com", price: 79, popular: true },
  { tld: ".net", price: 39, popular: false },
  { tld: ".io", price: 29, popular: false },
  { tld: ".co", price: 9, popular: false },
  { tld: "Any TLD", price: 19, popular: false },
];

const competitors = [
  { feature: "AI domain valuation", ceche: true, godaddy: false, sedo: false },
  { feature: "16-dimension scoring", ceche: true, godaddy: false, sedo: false },
  { feature: "WHOIS + DNS intel", ceche: true, godaddy: true, sedo: true },
  { feature: "SEO/DA/spam scan", ceche: true, godaddy: false, sedo: false },
  { feature: "Bulk domain audit", ceche: true, godaddy: false, sedo: false },
  { feature: "Trademark monitoring", ceche: true, godaddy: false, sedo: false },
  { feature: "Marketplace reveal model", ceche: true, godaddy: false, sedo: false },
  { feature: "API access", ceche: true, godaddy: true, sedo: false },
  { feature: "Free tier available", ceche: true, godaddy: false, sedo: false },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen text-[#111]" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#111] to-[#9E2A2B] py-12 md:py-16 lg:py-20 px-4 md:px-6 text-center">
        <p className="text-[11px] tracking-[3px] uppercase text-[#F4A261] font-mono mb-3">Pricing</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">Simple, Transparent Pricing</h1>
        <p className="text-base md:text-lg text-white/70 max-w-md mx-auto">Start free. Upgrade when you need more power. Cancel anytime.</p>
      </section>

      {/* Plans */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center -mt-7 mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F4A261] text-[#111] font-bold text-xs px-5 py-2 rounded-full">
            Save up to $260/yr with annual billing
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div key={plan.name} className={`rounded-3xl p-6 md:p-8 lg:p-10 relative flex flex-col ${plan.accent ? "border-[3px] border-[#9E2A2B] shadow-[0_20px_60px_rgba(158,42,43,0.12)]" : "border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"} bg-white`}>
                {plan.accent && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9E2A2B] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${plan.accent ? "bg-[#9E2A2B]" : "bg-[#EFECE6]"}`}>
                    <Icon size={22} color={plan.accent ? "#fff" : "#111"} />
                  </div>
                  <h3 className="text-lg font-bold m-0">{plan.name}</h3>
                </div>

                <div className="mb-2">
                  {plan.monthlyPrice === 0 ? (
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
            <p className="text-[11px] tracking-[3px] uppercase text-[#F4A261] font-mono mb-3">Try Your Luck</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">Spin. Reveal. Own.</h2>
            <p className="text-base text-white/60 max-w-md mx-auto">Pick a TLD, spin 3 boxes, reveal a premium domain locked exclusively for you.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto">
            {tryYourLuck.map((item) => (
              <a key={item.tld} href="/marketplace/try-your-luck" className={`block text-center py-6 md:py-7 px-3 md:px-4 rounded-2xl no-underline transition-all ${item.popular ? "bg-[#F4A261] border-2 border-[#F4A261]" : "bg-white/6 border border-white/10 hover:bg-white/10"}`}>
                <div className="text-xs text-white/50 font-mono mb-1">{item.tld}</div>
                <div className={`text-2xl md:text-3xl font-black ${item.popular ? "text-[#111]" : "text-white"}`}>${item.price}</div>
                {item.popular && <div className="text-[11px] font-bold text-[#111] mt-1 uppercase tracking-wider">Most Popular</div>}
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
            <p className="text-[11px] tracking-[3px] uppercase text-[#999] font-mono mb-2">Marketplace</p>
            <h3 className="text-xl md:text-2xl font-black mb-5 md:mb-6">Reveal Fees</h3>
            <p className="text-xs text-[#666] mb-5 leading-relaxed">Standard listings show stats with the name hidden. Pay a one-time Reveal Fee to see the domain name.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm min-w-[280px]">
                <thead>
                  <tr className="border-b-2 border-[#EFECE6]">
                    <th className="py-2.5 text-left text-[11px] font-bold text-[#999]">Tier</th>
                    <th className="py-2.5 text-left text-[11px] font-bold text-[#999]">Value Range</th>
                    <th className="py-2.5 text-right text-[11px] font-bold text-[#999]">Fee</th>
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
            <p className="text-[11px] tracking-[3px] uppercase text-[#999] font-mono mb-2">For Sellers</p>
            <h3 className="text-xl md:text-2xl font-black mb-5 md:mb-6">Listing Fees</h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap justify-between items-center gap-3 p-4 bg-[#EFECE6] rounded-xl">
                <div>
                  <div className="text-sm font-bold">Standard listing</div>
                  <div className="text-xs text-[#666]">30-day visibility</div>
                </div>
                <div className="text-xl font-black font-mono">$5</div>
              </div>
              <div className="flex flex-wrap justify-between items-center gap-3 p-4 bg-[#EFECE6] rounded-xl border-2 border-[#F4A261]">
                <div>
                  <div className="text-sm font-bold">Priority placement</div>
                  <div className="text-xs text-[#666]">72-hour boost + featured</div>
                </div>
                <div className="text-xl font-black font-mono">$10</div>
              </div>
            </div>
          </div>

          {/* Commission */}
          <div className="bg-white rounded-[20px] p-6 md:p-8 lg:p-9 border border-black/6">
            <p className="text-[11px] tracking-[3px] uppercase text-[#999] font-mono mb-2">Commissions</p>
            <h3 className="text-xl md:text-2xl font-black mb-5 md:mb-6">Seller Commission Rates</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm min-w-[260px]">
                <thead>
                  <tr className="border-b-2 border-[#EFECE6]">
                    <th className="py-2.5 text-left text-[11px] font-bold text-[#999]">Sale Amount</th>
                    <th className="py-2.5 text-right text-[11px] font-bold text-[#999]">Rate</th>
                    <th className="py-2.5 text-right text-[11px] font-bold text-[#999]">Min Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { amount: "$0 – $500", rate: "15%", min: "$10" },
                    { amount: "$501 – $5,000", rate: "12%", min: "$50" },
                    { amount: "$5,001 – $50,000", rate: "10%", min: "$500" },
                    { amount: "$50,001+", rate: "8%", min: "$4,000" },
                  ].map((r) => (
                    <tr key={r.amount} className="border-b border-black/4">
                      <td className="py-3">{r.amount}</td>
                      <td className="py-3 font-bold text-right font-mono">{r.rate}</td>
                      <td className="py-3 text-right font-mono text-[#666]">{r.min}</td>
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
          <p className="text-[11px] tracking-[3px] uppercase text-[#999] font-mono mb-3">Compare</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3">Ceche vs the Competition</h2>
          <p className="text-base text-[#666] max-w-md mx-auto">See how Ceche stacks up against legacy domain platforms.</p>
        </div>

        <div className="bg-white rounded-[20px] overflow-hidden border border-black/6 max-w-3xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm min-w-[500px]">
              <thead>
                <tr className="bg-[#111]">
                  <th className="py-4 px-5 text-left text-sm font-bold text-white w-[40%]">Feature</th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-[#F4A261]">Ceche</th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-white/60">GoDaddy</th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-white/60">Sedo</th>
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
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Ready to Get Started?</h2>
          <p className="text-base text-white/60 max-w-sm mx-auto mb-8">Create a free account in seconds. No credit card required.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/signup" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4A261] text-[#111] font-bold text-sm no-underline">
              Create Free Account <ArrowRight size={16} />
            </a>
            <a href="/help" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent text-white font-semibold text-sm no-underline border border-white/20">
              Visit Help Center
            </a>
            <a href="/tools/domain-lookup" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent text-white font-semibold text-sm no-underline border border-white/20">
              Free Domain Lookup
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
