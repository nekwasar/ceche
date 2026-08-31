import { Check, X, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Get started with basic tools. No credit card required.",
    features: [
      { text: "3 appraisals/day (not signed up)", included: true },
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
    highlighted: false,
  },
  {
    name: "Premium Startup",
    price: "$79",
    period: "/mo",
    description: "For small teams and serious domain investors.",
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
    highlighted: true,
  },
  {
    name: "Premium Enterprise",
    price: "$129",
    period: "/mo",
    description: "For agencies, professionals, and power users.",
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
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#111111" }}>
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#666666" }}>
            Start free. Upgrade when you need more power.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border ${
                plan.highlighted
                  ? "bg-[#EFECE6] border-[#9E2A2B] shadow-lg"
                  : "bg-[#EFECE6] border-black/5"
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block text-[10px] font-mono tracking-widest uppercase mb-4 px-3 py-1 rounded-full bg-[#9E2A2B] text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-2" style={{ color: "#111111" }}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold" style={{ color: "#111111" }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm" style={{ color: "#999999" }}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className="text-sm mb-8" style={{ color: "#666666" }}>
                {plan.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#047857" }} />
                    ) : (
                      <X className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#999999" }} />
                    )}
                    <span
                      className={`text-sm ${feature.included ? "" : "line-through"}`}
                      style={{ color: feature.included ? "#111111" : "#999999" }}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={plan.href}
                className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-medium text-sm transition-all ${
                  plan.highlighted
                    ? "bg-[#9E2A2B] text-white hover:bg-[#7A1F21]"
                    : "border border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Reveal Pricing */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              Marketplace
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#111111" }}>
              Try Your Luck Pricing
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#666666" }}>
              Pick a TLD, spin 3 boxes, reveal a premium domain. Each domain is locked exclusively for you.
            </p>
          </div>

          <div className="bg-[#EFECE6] rounded-2xl p-8 border border-black/5 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { tld: ".com", price: "$79" },
                { tld: ".net", price: "$39" },
                { tld: ".io", price: "$29" },
                { tld: ".co", price: "$9" },
                { tld: "Any TLD", price: "$19", sub: "flat rate" },
              ].map((item) => (
                <div key={item.tld} className="text-center">
                  <div className="text-2xl font-bold mb-1" style={{ color: "#111111" }}>
                    {item.price}
                  </div>
                  <div className="text-sm font-mono" style={{ color: "#666666" }}>
                    {item.tld}
                  </div>
                  {item.sub && (
                    <div className="text-xs mt-1" style={{ color: "#999999" }}>
                      {item.sub}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seller Fees */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              For Sellers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#111111" }}>
              Seller Listing Fees
            </h2>
          </div>

          <div className="bg-[#EFECE6] rounded-2xl p-8 border border-black/5 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Listing Fees</h3>
                <div className="space-y-2 text-sm" style={{ color: "#666666" }}>
                  <div className="flex justify-between">
                    <span>Standard listing</span>
                    <span className="font-mono">$5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority placement</span>
                    <span className="font-mono">$10</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>Commission on Sale</h3>
                <div className="space-y-2 text-sm" style={{ color: "#666666" }}>
                  <div className="flex justify-between">
                    <span>$0 - $500</span>
                    <span className="font-mono">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$501 - $5,000</span>
                    <span className="font-mono">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$5,001 - $50,000</span>
                    <span className="font-mono">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$50,001+</span>
                    <span className="font-mono">8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
