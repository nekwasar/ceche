import { Check, X, ArrowRight, Star, Shield, Crown } from "lucide-react";

const brand = {
  brand: "#9E2A2B",
  accent: "#F4A261",
  canvas: "#FAF7F2",
  dark: "#111111",
  muted: "#999999",
  body: "#666666",
  subtle: "#EFECE6",
  subtleAlt: "#E5DFD3",
};

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
    <main style={{ backgroundColor: brand.canvas, minHeight: "100vh", color: brand.dark }}>
      {/* Hero band */}
      <section style={{ background: `linear-gradient(135deg, ${brand.dark} 0%, ${brand.brand} 100%)`, padding: "80px 24px 64px", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: brand.accent, fontFamily: "monospace", marginBottom: 12 }}>Pricing</p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>Simple, Transparent Pricing</h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto" }}>Start free. Upgrade when you need more power. Cancel anytime.</p>
      </section>

      {/* Toggle + Cards */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Annual banner */}
        <div style={{ textAlign: "center", marginTop: -28, marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: brand.accent, color: brand.dark, fontWeight: 700, fontSize: 13, padding: "8px 20px", borderRadius: 999 }}>
            Save up to $260/yr with annual billing
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginBottom: 96 }}>
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div key={plan.name} style={{
                background: plan.accent ? "#fff" : "#fff",
                border: plan.accent ? `3px solid ${brand.brand}` : `1px solid rgba(0,0,0,0.08)`,
                borderRadius: 24,
                padding: 40,
                position: "relative",
                boxShadow: plan.accent ? "0 20px 60px rgba(158,42,43,0.12)" : "0 4px 20px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
              }}>
                {plan.accent && (
                  <span style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: brand.brand, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 1,
                    textTransform: "uppercase", padding: "6px 18px", borderRadius: 999,
                  }}>Most Popular</span>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: plan.accent ? brand.brand : brand.subtle, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} color={plan.accent ? "#fff" : brand.dark} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{plan.name}</h3>
                </div>

                {/* Price */}
                <div style={{ marginBottom: 8 }}>
                  {plan.monthlyPrice === 0 ? (
                    <span style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}>$0</span>
                  ) : (
                    <div>
                      <span style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}>${plan.annualPrice}</span>
                      <span style={{ fontSize: 15, color: brand.muted, marginLeft: 4 }}>/yr</span>
                      <div style={{ fontSize: 13, color: brand.brand, fontWeight: 600, marginTop: 4 }}>=${Math.round(plan.annualPrice / 12)}/mo &middot; {plan.annualNote}</div>
                    </div>
                  )}
                </div>

                <p style={{ fontSize: 14, color: brand.body, marginBottom: 32, lineHeight: 1.5 }}>{plan.description}</p>

                {/* Features */}
                <div style={{ flex: 1 }}>
                  {plan.features.map((f) => (
                    <div key={f.text} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                      {f.included ? (
                        <Check size={16} color={brand.brand} style={{ marginTop: 2, flexShrink: 0 }} />
                      ) : (
                        <X size={16} color={brand.muted} style={{ marginTop: 2, flexShrink: 0 }} />
                      )}
                      <span style={{ fontSize: 14, color: f.included ? brand.dark : brand.muted, textDecoration: f.included ? "none" : "line-through" }}>{f.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href={plan.href} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", padding: "14px 0", borderRadius: 999, fontWeight: 600, fontSize: 14,
                  textDecoration: "none", marginTop: 32, transition: "all 0.2s",
                  background: plan.accent ? brand.brand : "transparent",
                  color: plan.accent ? "#fff" : brand.dark,
                  border: plan.accent ? "none" : `2px solid ${brand.dark}`,
                }}>
                  {plan.cta} <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Try Your Luck */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ background: `linear-gradient(135deg, ${brand.dark} 0%, #2a1520 100%)`, borderRadius: 24, padding: "clamp(32px, 5vw, 64px)" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: brand.accent, fontFamily: "monospace", marginBottom: 12 }}>Try Your Luck</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>Spin. Reveal. Own.</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto" }}>Pick a TLD, spin 3 boxes, reveal a premium domain locked exclusively for you.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
            {tryYourLuck.map((item) => (
              <a key={item.tld} href="/marketplace/try-your-luck" style={{
                display: "block", textAlign: "center", padding: "28px 16px",
                borderRadius: 16, textDecoration: "none", transition: "all 0.2s",
                background: item.popular ? brand.accent : "rgba(255,255,255,0.06)",
                border: item.popular ? `2px solid ${brand.accent}` : "1px solid rgba(255,255,255,0.1)",
              }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontFamily: "monospace" }}>{item.tld}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: item.popular ? brand.dark : "#fff" }}>${item.price}</div>
                {item.popular && <div style={{ fontSize: 11, fontWeight: 700, color: brand.dark, marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>Most Popular</div>}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Reveal Pricing + Seller Fees + Commission */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {/* Reveal Pricing */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: `1px solid rgba(0,0,0,0.06)` }}>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: brand.muted, fontFamily: "monospace", marginBottom: 8 }}>Marketplace</p>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>Reveal Fees</h3>
            <p style={{ fontSize: 13, color: brand.body, marginBottom: 20, lineHeight: 1.6 }}>Standard listings show stats with the name hidden. Pay a one-time Reveal Fee to see the domain name.</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${brand.subtle}` }}>
                  <th style={{ textAlign: "left", padding: "10px 0", fontSize: 12, fontWeight: 700, color: brand.muted }}>Tier</th>
                  <th style={{ textAlign: "left", padding: "10px 0", fontSize: 12, fontWeight: 700, color: brand.muted }}>Value Range</th>
                  <th style={{ textAlign: "right", padding: "10px 0", fontSize: 12, fontWeight: 700, color: brand.muted }}>Fee</th>
                </tr>
              </thead>
              <tbody>
                {revealPricing.map((r) => (
                  <tr key={r.tier} style={{ borderBottom: `1px solid rgba(0,0,0,0.04)` }}>
                    <td style={{ padding: "12px 0", fontSize: 14, fontWeight: 600 }}>{r.tier}</td>
                    <td style={{ padding: "12px 0", fontSize: 14, color: brand.body }}>{r.range}</td>
                    <td style={{ padding: "12px 0", fontSize: 14, fontWeight: 700, textAlign: "right", fontFamily: "monospace" }}>{r.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Listing Fees */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: `1px solid rgba(0,0,0,0.06)` }}>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: brand.muted, fontFamily: "monospace", marginBottom: 8 }}>For Sellers</p>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>Listing Fees</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: brand.subtle, borderRadius: 12 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Standard listing</div>
                  <div style={{ fontSize: 12, color: brand.body }}>30-day visibility</div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "monospace" }}>$5</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: brand.subtle, borderRadius: 12, border: `2px solid ${brand.accent}` }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Priority placement</div>
                  <div style={{ fontSize: 12, color: brand.body }}>72-hour boost + featured</div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "monospace" }}>$10</div>
              </div>
            </div>
          </div>

          {/* Commission Tiers */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: `1px solid rgba(0,0,0,0.06)` }}>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: brand.muted, fontFamily: "monospace", marginBottom: 8 }}>Commissions</p>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24 }}>Seller Commission Rates</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${brand.subtle}` }}>
                  <th style={{ textAlign: "left", padding: "10px 0", fontSize: 12, fontWeight: 700, color: brand.muted }}>Sale Amount</th>
                  <th style={{ textAlign: "right", padding: "10px 0", fontSize: 12, fontWeight: 700, color: brand.muted }}>Rate</th>
                  <th style={{ textAlign: "right", padding: "10px 0", fontSize: 12, fontWeight: 700, color: brand.muted }}>Min Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid rgba(0,0,0,0.04)` }}>
                  <td style={{ padding: "12px 0", fontSize: 14 }}>$0 – $500</td>
                  <td style={{ padding: "12px 0", fontSize: 14, fontWeight: 700, textAlign: "right", fontFamily: "monospace" }}>15%</td>
                  <td style={{ padding: "12px 0", fontSize: 14, textAlign: "right", fontFamily: "monospace", color: brand.body }}>$10</td>
                </tr>
                <tr style={{ borderBottom: `1px solid rgba(0,0,0,0.04)` }}>
                  <td style={{ padding: "12px 0", fontSize: 14 }}>$501 – $5,000</td>
                  <td style={{ padding: "12px 0", fontSize: 14, fontWeight: 700, textAlign: "right", fontFamily: "monospace" }}>12%</td>
                  <td style={{ padding: "12px 0", fontSize: 14, textAlign: "right", fontFamily: "monospace", color: brand.body }}>$50</td>
                </tr>
                <tr style={{ borderBottom: `1px solid rgba(0,0,0,0.04)` }}>
                  <td style={{ padding: "12px 0", fontSize: 14 }}>$5,001 – $50,000</td>
                  <td style={{ padding: "12px 0", fontSize: 14, fontWeight: 700, textAlign: "right", fontFamily: "monospace" }}>10%</td>
                  <td style={{ padding: "12px 0", fontSize: 14, textAlign: "right", fontFamily: "monospace", color: brand.body }}>$500</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 0", fontSize: 14 }}>$50,001+</td>
                  <td style={{ padding: "12px 0", fontSize: 14, fontWeight: 700, textAlign: "right", fontFamily: "monospace" }}>8%</td>
                  <td style={{ padding: "12px 0", fontSize: 14, textAlign: "right", fontFamily: "monospace", color: brand.body }}>$4,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: brand.muted, fontFamily: "monospace", marginBottom: 12 }}>Compare</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, marginBottom: 12 }}>Ceche vs the Competition</h2>
          <p style={{ fontSize: 16, color: brand.body, maxWidth: 480, margin: "0 auto" }}>See how Ceche stacks up against legacy domain platforms.</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: `1px solid rgba(0,0,0,0.06)`, maxWidth: 800, margin: "0 auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: brand.dark }}>
                <th style={{ textAlign: "left", padding: "16px 24px", fontSize: 14, fontWeight: 700, color: "#fff", width: "40%" }}>Feature</th>
                <th style={{ textAlign: "center", padding: "16px 16px", fontSize: 14, fontWeight: 700, color: brand.accent }}>Ceche</th>
                <th style={{ textAlign: "center", padding: "16px 16px", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>GoDaddy</th>
                <th style={{ textAlign: "center", padding: "16px 16px", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>Sedo</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr key={c.feature} style={{ background: i % 2 === 0 ? "#fff" : brand.subtle }}>
                  <td style={{ padding: "14px 24px", fontSize: 14 }}>{c.feature}</td>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    {c.ceche ? <Check size={18} color={brand.brand} style={{ margin: "0 auto" }} /> : <X size={18} color={brand.muted} style={{ margin: "0 auto" }} />}
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    {c.godaddy ? <Check size={18} color="#888" style={{ margin: "0 auto" }} /> : <X size={18} color={brand.muted} style={{ margin: "0 auto" }} />}
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    {c.sedo ? <Check size={18} color="#888" style={{ margin: "0 auto" }} /> : <X size={18} color={brand.muted} style={{ margin: "0 auto" }} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 96px", textAlign: "center" }}>
        <div style={{ background: brand.dark, borderRadius: 24, padding: "clamp(40px, 6vw, 72px) clamp(24px, 4vw, 48px)" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>Ready to Get Started?</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 32, maxWidth: 420, margin: "0 auto 32px" }}>Create a free account in seconds. No credit card required.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/signup" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 999,
              background: brand.accent, color: brand.dark, fontWeight: 700, fontSize: 15, textDecoration: "none",
            }}>Create Free Account <ArrowRight size={16} /></a>
            <a href="/help" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 999,
              background: "transparent", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>Visit Help Center</a>
            <a href="/tools/domain-lookup" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 999,
              background: "transparent", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>Free Domain Lookup</a>
          </div>
        </div>
      </section>
    </main>
  );
}
