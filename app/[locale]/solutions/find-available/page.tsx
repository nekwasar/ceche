import Link from "next/link";

export default function FindAvailablePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF7F2",
        color: "#111111",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Large Stat Hero */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "96px 24px 64px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "#9E2A2B",
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          4
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#666",
            marginBottom: 12,
          }}
        >
          TLDs Scanned Simultaneously
        </div>
        <p style={{ fontSize: 16, color: "#999", marginBottom: 40 }}>
          .com · .io · .co · .ai
        </p>
        <h1
          style={{
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Find Available Domains
          <br />
          in Seconds
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#666",
            maxWidth: 600,
            margin: "0 auto 32px",
            lineHeight: 1.7,
          }}
        >
          Scan millions of combinations for available domain names. Smart
          suggestions, real-time availability checks, and price comparisons
          across registrars.
        </p>
      </section>

      {/* 2-col: Text + Filter List */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            Smart Domain Discovery
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            Enter keywords, industry, or a brand concept and Ceche will
            generate hundreds of available options. Filter by length, TLD,
            price range, and brandability score.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            Every result includes a 16-dimension score, so you know which
            domains have real market potential — not just availability.
          </p>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              backgroundColor: "#9E2A2B",
              color: "#FFF",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Start Searching Free
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#FFF",
            border: "1px solid #E8E5DF",
            borderRadius: 12,
            padding: 28,
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 16,
              color: "#111",
            }}
          >
            Filter Options
          </h3>
          {[
            { label: "TLD", value: ".com, .io, .co, .ai" },
            { label: "Max Length", value: "Up to 15 characters" },
            { label: "Price Range", value: "$8 – $500/yr" },
            { label: "Brandability", value: "High / Medium / Low" },
            { label: "Buyer Intent", value: "Score 0–100" },
            { label: "Availability", value: "Instant check" },
            { label: "Price Comparison", value: "Multi-registrar" },
          ].map((f, i) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom:
                  i < 6 ? "1px solid #E8E5DF" : "none",
                fontSize: 14,
              }}
            >
              <span style={{ fontWeight: 600, color: "#111" }}>
                {f.label}
              </span>
              <span style={{ color: "#666" }}>{f.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Alert Timeline */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Never Miss a Domain
        </h2>
        <div
          style={{
            position: "relative",
            display: "flex",
            gap: 0,
          }}
        >
          {[
            {
              step: "1",
              title: "Set Your Criteria",
              desc: "Define keywords, TLDs, price range, and brandability thresholds.",
            },
            {
              step: "2",
              title: "Monitor & Alert",
              desc: "Ceche scans daily and alerts you when matching domains appear.",
            },
            {
              step: "3",
              title: "Acquire Instantly",
              desc: "One-click registration or marketplace purchase with escrow protection.",
            },
          ].map((s, i) => (
            <div
              key={s.step}
              style={{
                flex: 1,
                position: "relative",
                textAlign: "center",
                padding: "0 20px",
              }}
            >
              {i < 2 && (
                <div
                  style={{
                    position: "absolute",
                    top: 28,
                    right: -8,
                    width: 16,
                    height: 2,
                    backgroundColor: "#9E2A2B",
                    zIndex: 1,
                  }}
                />
              )}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "#9E2A2B",
                  color: "#FFF",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 20,
                  marginBottom: 16,
                }}
              >
                {s.step}
              </div>
              <h3
                style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.6,
                  maxWidth: 220,
                  margin: "0 auto",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tier Grid */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Choose Your Plan
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {[
            {
              name: "Free",
              price: "$0",
              features: ["3 domains/day", "Basic scoring", "1 TLD"],
              highlight: false,
            },
            {
              name: "Startup",
              price: "$79/mo",
              features: ["12 domains/day", "Extended Insights", "4 TLDs"],
              highlight: true,
            },
            {
              name: "Enterprise",
              price: "$129/mo",
              features: ["Unlimited scoring", "Bulk Analyzer", "API access"],
              highlight: false,
            },
          ].map((p) => (
            <div
              key={p.name}
              style={{
                backgroundColor: p.highlight ? "#9E2A2B" : "#FFF",
                color: p.highlight ? "#FFF" : "#111",
                border: p.highlight ? "none" : "1px solid #E8E5DF",
                borderRadius: 12,
                padding: 28,
                textAlign: "center",
              }}
            >
              {p.highlight && (
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    backgroundColor: "#F4A261",
                    color: "#111",
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Popular
                </span>
              )}
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                {p.name}
              </h3>
              <div
                style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}
              >
                {p.price}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 20px",
                }}
              >
                {p.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 14,
                      padding: "6px 0",
                      color: p.highlight
                        ? "rgba(255,255,255,0.9)"
                        : "#666",
                    }}
                  >
                    ✓ {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                style={{
                  display: "inline-block",
                  padding: "10px 24px",
                  backgroundColor: p.highlight ? "#FFF" : "#111",
                  color: p.highlight ? "#9E2A2B" : "#FFF",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bulk Scan Section */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
          backgroundColor: "#FFF",
          borderRadius: 16,
          border: "1px solid #E8E5DF",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
            padding: 48,
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                backgroundColor: "#F4A261",
                color: "#111",
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Enterprise Feature
            </span>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
              Bulk Domain Scanner
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#666",
                lineHeight: 1.7,
                marginBottom: 12,
              }}
            >
              Upload a CSV of up to 5,000 domains and get scored results in
              minutes. Perfect for portfolio audits and prospecting at scale.
            </p>
            <p style={{ fontSize: 14, color: "#999" }}>
              Available on Enterprise plan ($129/mo). Includes API access with
              10,000 calls/day.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#FAF7F2",
              borderRadius: 12,
              padding: 32,
              fontFamily: "monospace",
              fontSize: 13,
              lineHeight: 1.8,
              color: "#666",
            }}
          >
            <div style={{ color: "#9E2A2B", fontWeight: 700, marginBottom: 8 }}>
              // Bulk scan output
            </div>
            <div>Domain: startupai.com</div>
            <div>Score: 87/100</div>
            <div>TLD: .com ✓</div>
            <div>Brandability: High</div>
            <div>Price Range: $12–$15/yr</div>
            <div>─────</div>
            <div>Domain: hellocorp.io</div>
            <div>Score: 72/100</div>
            <div>TLD: .io ✓</div>
            <div>Brandability: Medium</div>
            <div>Price Range: $35–$45/yr</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#111",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: 36, fontWeight: 800, color: "#FFF", marginBottom: 16 }}
        >
          Find Your Perfect Domain
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 32,
          }}
        >
          Start with 3 free domain searches per day.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              backgroundColor: "#9E2A2B",
              color: "#FFF",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create Free Account
          </Link>
          <Link
            href="/tools/seo-scanner"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              backgroundColor: "transparent",
              color: "#F4A261",
              border: "2px solid #F4A261",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Try SEO Scanner
          </Link>
        </div>
      </section>
    </main>
  );
}
