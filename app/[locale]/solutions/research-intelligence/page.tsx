import Link from "next/link";

export default function ResearchIntelligencePage() {
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
      {/* Document-style Header */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "96px 24px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
            fontSize: 13,
            color: "#999",
          }}
        >
          <span>Solutions</span>
          <span>/</span>
          <span style={{ color: "#9E2A2B", fontWeight: 600 }}>
            Research Intelligence
          </span>
        </div>
        <h1
          style={{
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Deep Domain Analysis
          <br />
          Before Acquisition
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#666",
            lineHeight: 1.7,
            maxWidth: 600,
          }}
        >
          Make informed decisions with comprehensive intelligence reports.
          16-dimension scoring, ownership history, backlink profiles, and
          risk assessment — all in one document.
        </p>
      </section>

      {/* 6 Numbered Sections */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "32px 24px 64px",
        }}
      >
        {[
          {
            num: "01",
            title: "16-Dimension Scoring",
            desc: "Every domain is evaluated across 16 distinct dimensions including brandability, SEO strength, market demand, and risk factors. The composite Buyer Intent Score (0–100) gives you a single number to compare domains.",
            icon: "📊",
          },
          {
            num: "02",
            title: "Ownership History",
            desc: "Complete WHOIS history and ownership transitions. See how many times a domain has changed hands, previous use cases, and any associated reputation issues.",
            icon: "📜",
          },
          {
            num: "03",
            title: "Backlink Profile",
            desc: "Detailed backlink analysis with quality scoring. Dofollow/nofollow ratios, anchor text distribution, referring domains, and link velocity trends over time.",
            icon: "🔗",
          },
          {
            num: "04",
            title: "Traffic Estimates",
            desc: "Monthly traffic predictions based on SEO metrics, keyword rankings, and historical data. Understand the organic potential before you invest.",
            icon: "📈",
          },
          {
            num: "05",
            title: "Valuation Range",
            desc: "Algorithmic pricing with confidence intervals. Compare against recent comparable sales across .com, .io, .co, and .ai to understand fair market value.",
            icon: "💰",
          },
          {
            num: "06",
            title: "Risk Assessment",
            desc: "Trademark conflicts, spam history, Google penalty status, and registration risk analysis. Know the full picture before committing capital.",
            icon: "🛡️",
          },
        ].map((s) => (
          <div
            key={s.num}
            style={{
              display: "flex",
              gap: 24,
              padding: "28px 0",
              borderBottom: "1px solid #E8E5DF",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                backgroundColor: "#9E2A2B",
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {s.num}
            </div>
            <div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {s.icon} {s.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "#666",
                  lineHeight: 1.7,
                }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Comparison Table */}
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
            marginBottom: 32,
          }}
        >
          How Ceche Compares
        </h2>
        <div
          style={{
            backgroundColor: "#FFF",
            borderRadius: 12,
            border: "1px solid #E8E5DF",
            overflow: "hidden",
          }}
        >
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
          >
            <thead>
              <tr style={{ backgroundColor: "#111", color: "#FFF" }}>
                <th
                  style={{
                    padding: "14px 20px",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    padding: "14px 20px",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "#F4A261",
                  }}
                >
                  Ceche
                </th>
                <th
                  style={{
                    padding: "14px 20px",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  Dynadot
                </th>
                <th
                  style={{
                    padding: "14px 20px",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  GoDaddy
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "16-Dimension Scoring",
                  ceche: "✓",
                  dynadot: "✗",
                  godaddy: "✗",
                },
                {
                  feature: "Buyer Intent Score",
                  ceche: "0–100",
                  dynadot: "✗",
                  godaddy: "✗",
                },
                {
                  feature: "Bulk Analysis (5K+)",
                  ceche: "✓",
                  dynadot: "Limited",
                  godaddy: "✗",
                },
                {
                  feature: "API Access",
                  ceche: "10K/day",
                  dynadot: "Basic",
                  godaddy: "Paid add-on",
                },
                {
                  feature: "Trademark Monitor",
                  ceche: "✓",
                  dynadot: "✗",
                  godaddy: "Paid",
                },
                {
                  feature: "Tiered Commission",
                  ceche: "8–15%",
                  dynadot: "Flat",
                  godaddy: "Flat 20%+",
                },
                {
                  feature: "TLDs Analyzed",
                  ceche: "4",
                  dynadot: "10+",
                  godaddy: "10+",
                },
              ].map((r, i) => (
                <tr
                  key={r.feature}
                  style={{
                    borderTop: "1px solid #E8E5DF",
                    backgroundColor: i % 2 === 0 ? "#FAF7F2" : "#FFF",
                  }}
                >
                  <td style={{ padding: "12px 20px", fontWeight: 600 }}>
                    {r.feature}
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      textAlign: "center",
                      color: "#9E2A2B",
                      fontWeight: 700,
                    }}
                  >
                    {r.ceche}
                  </td>
                  <td
                    style={{ padding: "12px 20px", textAlign: "center", color: "#666" }}
                  >
                    {r.dynadot}
                  </td>
                  <td
                    style={{ padding: "12px 20px", textAlign: "center", color: "#666" }}
                  >
                    {r.godaddy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #9E2A2B 0%, #7a1f1f 100%)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#FFF",
            marginBottom: 16,
          }}
        >
          Research Smarter
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.8)",
            marginBottom: 32,
            maxWidth: 500,
            margin: "0 auto 32px",
          }}
        >
          Get deep intelligence on any domain. Start with a free account.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              backgroundColor: "#FFF",
              color: "#9E2A2B",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create Free Account
          </Link>
          <Link
            href="/tools/appraisal"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              backgroundColor: "transparent",
              color: "#FFF",
              border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Try Appraisal Tool
          </Link>
        </div>
      </section>
    </main>
  );
}
