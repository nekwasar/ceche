const steps = [
  {
    num: "01",
    title: "Browse",
    desc: "Explore our blind marketplace. Full stats shown — domain name hidden. Filter by TLD, category, or valuation range.",
  },
  {
    num: "02",
    title: "Pay to Reveal",
    desc: "When you find a listing you like, pay the reveal fee ($5–$50 based on domain value) to unlock the name.",
  },
  {
    num: "03",
    title: "Reveal & Inspect",
    desc: "The domain name is revealed. You have 5 minutes to inspect and decide. No one else can see or purchase it.",
  },
  {
    num: "04",
    title: "Recheck or Walk Away",
    desc: "If you pass, the domain goes back to the blind pool. If you proceed, it's locked exclusively for you.",
  },
  {
    num: "05",
    title: "Complete or Walk Away",
    desc: "Register the domain through our partner registrars (Dynadot, Namecheap, Porkbun) or walk away. No obligation.",
  },
];

export default function HowUnmaskingWorksPage() {
  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 120px" }}>
        <div style={{ marginBottom: 64 }}>
          <span
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#999999",
              display: "block",
              marginBottom: 12,
            }}
          >
            Marketplace
          </span>
          <h1 style={{ fontSize: 44, fontWeight: 700, color: "#111111", marginBottom: 16 }}>
            How Unmasking Works
          </h1>
          <p style={{ fontSize: 18, color: "#666666", maxWidth: 560 }}>
            Our blind marketplace protects domain names from front-running and sniping. Here's the process.
          </p>
        </div>

        <section style={{ marginBottom: 80 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  gap: 32,
                  padding: "32px 0",
                  borderBottom: i < steps.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    backgroundColor: "#9E2A2B",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: "monospace",
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111111", marginBottom: 8 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 15, color: "#666666", margin: 0, lineHeight: 1.7, maxWidth: 600 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            backgroundColor: "#EFECE6",
            borderRadius: 16,
            padding: 40,
            border: "1px solid rgba(0,0,0,0.05)",
            marginBottom: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: "#047857",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              🛡
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 8 }}>
                Vault Protection
              </h3>
              <p style={{ fontSize: 14, color: "#666666", margin: 0, lineHeight: 1.7 }}>
                All unrevealed domain names are stored in an encrypted vault. No partial names, no asterisks, no hints. The only way to see the name is to pay the reveal fee. This eliminates domain front-running and ensures fair pricing for everyone.
              </p>
            </div>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 64 }}>
          {[
            { icon: "🔒", title: "Encrypted Vault", desc: "Domain names stored with zero-knowledge encryption." },
            { icon: "⏱", title: "5-Minute Lock", desc: "After reveal, you have 5 minutes of exclusive access." },
            { icon: "💰", title: "No Obligation", desc: "Walk away at any point. No commitment required." },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: "#EFECE6",
                borderRadius: 14,
                padding: 24,
                border: "1px solid rgba(0,0,0,0.05)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "#111111", marginBottom: 6 }}>{item.title}</h4>
              <p style={{ fontSize: 13, color: "#666666", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </section>

        <section
          style={{
            backgroundColor: "#111111",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "white", marginBottom: 12 }}>
            Ready to explore?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>
            Browse thousands of premium domains with full intelligence data.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <a
              href="/marketplace"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#F4A261",
                color: "#111111",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Browse Marketplace
            </a>
            <a
              href="/marketplace/try-your-luck"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Try Your Luck
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
