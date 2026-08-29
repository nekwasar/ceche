import { DollarSign } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "5 appraisals per month",
      "Basic SEO scanner",
      "Partial domain reveal",
      "Community access",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    features: [
      "50 appraisals per month",
      "Full SEO scanner",
      "Extended insights (10/mo)",
      "Email support",
      "API access (1K calls)",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    features: [
      "200 appraisals per month",
      "Full 16-dimension reports",
      "Unlimited extended insights",
      "Priority support",
      "API access (10K calls)",
      "Bulk analyzer",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    features: [
      "Unlimited appraisals",
      "Full 16-dimension reports",
      "Unlimited everything",
      "Dedicated support",
      "API access (unlimited)",
      "Custom integrations",
      "White-label options",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-slate-muted">
            Choose the plan that fits your domain intelligence needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border ${
                plan.highlighted
                  ? "bg-brand text-white border-brand ring-2 ring-accent"
                  : "bg-white border-slate/10"
              }`}
            >
              <h3 className={`font-semibold ${plan.highlighted ? "text-white" : "text-slate"}`}>
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${plan.highlighted ? "text-white" : "text-slate"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-white/60" : "text-slate-muted"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <DollarSign className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-accent" : "text-brand"}`} />
                    <span className={`text-sm ${plan.highlighted ? "text-white/80" : "text-slate-muted"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  plan.highlighted
                    ? "bg-accent text-slate hover:bg-accent-light"
                    : "bg-slate/5 text-slate hover:bg-slate/10"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
