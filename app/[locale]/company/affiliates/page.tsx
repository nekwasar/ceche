"use client";

export default function AffiliatesPage() {
  const benefits = [
    { title: "30% Recurring Commission", desc: "Earn on every paying customer you refer—for as long as they stay subscribed. No caps, no limits." },
    { title: "90-Day Cookie Window", desc: "Your referral link tracks visitors for 90 days. Even if they come back weeks later, you still get credit." },
    { title: "Real-Time Dashboard", desc: "Track clicks, signups, and earnings in real time. No guessing, no waiting for monthly reports." },
    { title: "Dedicated Affiliate Support", desc: "Get priority access to our affiliate team. Custom landing pages, promo assets, and campaign guidance." },
    { title: "Instant Payouts", desc: "Get paid monthly via bank transfer or PayPal. No minimum threshold. No delays." },
    { title: "Free Premium Access", desc: "Active affiliates get a free Ceche Pro account. Use the product, sell the product, believe in the product." },
  ];

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* Red-Gradient Hero with Timeline */}
      <section style={{ padding: "100px 0 80px", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #9E2A2B 0%, #7A1F21 50%, #111111 100%)" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,162,97,0.2) 0%, transparent 60%)" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <span style={{ display: "block", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", color: "#F4A261", marginBottom: 16 }}>
            Ceche Affiliates
          </span>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: "#FFF", lineHeight: 1.1, margin: "0 auto 20px", maxWidth: 520 }}>
            Earn by referring domain investors
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 36px" }}>
            Join our affiliate program, share Ceche with your network, and earn recurring commissions on every customer you refer.
          </p>

          {/* Timeline */}
          <div style={{ display: "flex", justifyContent: "center", gap: 0, marginTop: 20, flexWrap: "wrap" }}>
            {[
              { step: "1", label: "Sign up" },
              { step: "2", label: "Share link" },
              { step: "3", label: "Earn 30%" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#F4A261", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>{s.step}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 8, whiteSpace: "nowrap" }}>{s.label}</span>
                </div>
                {i < 2 && (
                  <div style={{ width: 80, height: 2, backgroundColor: "rgba(244,162,97,0.4)", margin: "0 8px", marginBottom: 24 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating Benefits */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 32, alignItems: "flex-start", padding: "36px 0", borderBottom: i < benefits.length - 1 ? "1px solid #E8E5DE" : "none", flexDirection: i % 2 === 0 ? "row" : "row-reverse", flexWrap: "wrap" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: i % 2 === 0 ? "#9E2A2B" : "#EFECE6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: i % 2 === 0 ? "#FFF" : "#9E2A2B" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div style={{ flex: "1 1 300px" }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111111", margin: "0 0 8px" }}>{b.title}</h3>
                <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "#111111" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#FFF", marginBottom: 12 }}>
            Start earning today
          </h2>
          <p style={{ fontSize: 16, color: "#999", marginBottom: 32 }}>
            Sign up for the affiliate program and start referring in minutes.
          </p>
          <a href="https://affiliates.ceche.net/login" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 36px", borderRadius: 999, backgroundColor: "#F4A261", color: "#111111", fontWeight: 700, fontSize: 15, textDecoration: "none", marginBottom: 24 }}>
            Join Affiliate Program →
          </a>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: 13, textDecoration: "none" }}>
              View Pricing
            </a>
            <a href="/help/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: 13, textDecoration: "none" }}>
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
