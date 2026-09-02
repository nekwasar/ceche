"use client";

const features = [
  "Hand-picked by domain experts",
  "Full intelligence report included",
  "Verified ownership and clean history",
  "Instant purchase with escrow protection",
  "Negotiation tools for making offers",
  "Guided transfer with registrar support",
];

const steps = [
  { num: "1", title: "Browse Listings", desc: "Each curated domain includes valuation, SEO metrics, and commercial intent score." },
  { num: "2", title: "Make an Offer", desc: "Buy outright or submit an offer. Our system handles counter-offers automatically." },
  { num: "3", title: "Complete Purchase", desc: "Escrow-protected payment. Domain transfers within 24 hours with full support." },
];

export default function CuratedPage() {
  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, marginBottom: 80, alignItems: "center" }}>
          <div>
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
            <h1 style={{ fontSize: 44, fontWeight: 700, color: "#111111", marginBottom: 16, lineHeight: 1.1 }}>
              Curated Domains
            </h1>
            <p style={{ fontSize: 18, color: "#666666", marginBottom: 28, lineHeight: 1.7 }}>
              Hand-picked premium domains sorted by commercial intent and SEO authority. Each listing includes a full intelligence report and valuation.
            </p>
            <a
              href="/marketplace/try-your-luck"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#9E2A2B",
                color: "white",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Try Your Luck Instead
            </a>
          </div>

          <div
            style={{
              backgroundColor: "#EFECE6",
              borderRadius: 20,
              padding: 36,
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: "#999999", textTransform: "uppercase", marginBottom: 4 }}>
                Featured Domain
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#9E2A2B", marginBottom: 4 }}>
                ██████████.com
              </div>
              <div style={{ fontSize: 13, color: "#999999" }}>Name hidden until purchase</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Valuation", value: "$87,500" },
                { label: "DA Score", value: "72" },
                { label: "Spam Score", value: "0/100" },
                { label: "CPC", value: "$24.80" },
                { label: "Backlinks", value: "14,200" },
                { label: "Age", value: "12 years" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: 10, fontFamily: "monospace", color: "#999999", textTransform: "uppercase", marginBottom: 2 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#111111" }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                backgroundColor: "#111111",
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Instant Purchase</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#F4A261" }}>$87,500</span>
            </div>
          </div>
        </div>

        <section style={{ marginBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {features.map((f) => (
              <div
                key={f}
                style={{
                  backgroundColor: "#EFECE6",
                  borderRadius: 14,
                  padding: "20px 24px",
                  border: "1px solid rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <span style={{ color: "#047857", fontWeight: 700, fontSize: 16, lineHeight: 1 }}>✓</span>
                <span style={{ fontSize: 14, color: "#111111" }}>{f}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111111", marginBottom: 32, textAlign: "center" }}>
            How It Works
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                style={{
                  padding: "32px 28px",
                  borderRight: i < steps.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: "#9E2A2B",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111111", marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "#666666", margin: 0, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: 80,
            backgroundColor: "#111111",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "white", marginBottom: 12 }}>
            Browse all curated domains
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>
            Updated weekly with new hand-picked premium domains.
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
              View Marketplace
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
