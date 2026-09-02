import Link from "next/link";

export default function DomainInvestorsPage() {
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
      {/* Split Hero */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "96px 24px 64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              padding: "6px 14px",
              backgroundColor: "#9E2A2B",
              color: "#FFF",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            For Investors
          </span>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 16,
              color: "#111111",
            }}
          >
            Maximize Domain
            <br />
            Investment Returns
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "#666666",
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: 32,
            }}
          >
            Portfolio yield analysis, flipper valuation metrics, drop-catching
            alerts, and commission tiers from 8–15%. Everything you need to
            outperform the market.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
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
              Start Investing
            </Link>
            <Link
              href="/pricing"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "transparent",
                color: "#9E2A2B",
                border: "2px solid #9E2A2B",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { value: "16", label: "Scoring Dimensions" },
            { value: "8–15%", label: "Commission Tiers" },
            { value: "4", label: "TLDs Scanned" },
            { value: "$5–$50", label: "Reveal Fee Range" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E5DF",
                borderRadius: 12,
                padding: 28,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#9E2A2B",
                  marginBottom: 4,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "#666" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution 2-col */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
        }}
      >
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            The Investor&apos;s Problem
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            Traditional domain investing requires juggling multiple tools,
            paying opaque fees, and guessing at valuations. You lose deals to
            faster buyers and overpay on commissions.
          </p>
          <ul style={{ fontSize: 15, color: "#666", lineHeight: 2, paddingLeft: 20 }}>
            <li>No unified scoring model across TLDs</li>
            <li>Hidden fees erode profit margins</li>
            <li>Manual drop-catching misses opportunities</li>
            <li>Commission structures eat into flips</li>
          </ul>
        </div>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            The Ceche Solution
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            A single platform with 16-dimension scoring, tiered commissions
            with minimums, real-time alerts, and a marketplace designed for
            investors — not casual buyers.
          </p>
          <ul style={{ fontSize: 15, color: "#666", lineHeight: 2, paddingLeft: 20 }}>
            <li>16-dimension scoring on every domain</li>
            <li>Transparent tiered commission: 15%/12%/10%/8%</li>
            <li>Drop-catching alerts for expiring domains</li>
            <li>Bulk scan up to 5,000 domains at once</li>
          </ul>
        </div>
      </section>

      {/* Commission Table */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 24px",
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
          Tiered Commission Structure
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
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 15,
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#9E2A2B", color: "#FFF" }}>
                <th style={{ padding: "16px 24px", textAlign: "left" }}>Tier</th>
                <th style={{ padding: "16px 24px", textAlign: "left" }}>
                  Commission
                </th>
                <th style={{ padding: "16px 24px", textAlign: "left" }}>
                  Minimum
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { tier: "Starter", commission: "15%", minimum: "$10" },
                { tier: "Growth", commission: "12%", minimum: "$50" },
                { tier: "Pro", commission: "10%", minimum: "$500" },
                { tier: "Enterprise", commission: "8%", minimum: "$4,000" },
              ].map((r, i) => (
                <tr
                  key={r.tier}
                  style={{
                    borderTop: "1px solid #E8E5DF",
                    backgroundColor: i % 2 === 0 ? "#FAF7F2" : "#FFF",
                  }}
                >
                  <td style={{ padding: "14px 24px", fontWeight: 600 }}>
                    {r.tier}
                  </td>
                  <td style={{ padding: "14px 24px", color: "#9E2A2B", fontWeight: 700 }}>
                    {r.commission}
                  </td>
                  <td style={{ padding: "14px 24px" }}>{r.minimum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Investor Tools */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 24px",
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
          Tools Built for Investors
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {[
            {
              title: "SEO Scanner",
              desc: "Audit backlink profiles and domain authority in seconds.",
            },
            {
              title: "Extended Insights",
              desc: "Go beyond the basics with full 16-dimension deep dives.",
            },
            {
              title: "Bulk Analyzer",
              desc: "Score up to 5,000 domains in a single batch run.",
            },
            {
              title: "Trademark Monitor",
              desc: "Automated alerts for trademark conflicts on your portfolio.",
            },
          ].map((t) => (
            <div
              key={t.title}
              style={{
                backgroundColor: "#FFF",
                border: "1px solid #E8E5DF",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#111",
                }}
              >
                {t.title}
              </h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Getting Started 5 steps */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 24px",
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
          Getting Started
        </h2>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { step: "1", title: "Create Account", desc: "Sign up free in 30 seconds" },
            { step: "2", title: "Choose Plan", desc: "Free, Startup ($79/mo), or Enterprise ($129/mo)" },
            { step: "3", title: "Scan Domains", desc: "Run SEO Scanner or Bulk Analyzer" },
            { step: "4", title: "Analyze Scores", desc: "Review 16-dimension reports" },
            { step: "5", title: "Acquire & Flip", desc: "Buy, hold, or resell with tiered commissions" },
          ].map((s) => (
            <div
              key={s.step}
              style={{
                flex: 1,
                backgroundColor: "#FFF",
                border: "1px solid #E8E5DF",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#9E2A2B",
                  color: "#FFF",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 12,
                }}
              >
                {s.step}
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                {s.title}
              </h4>
              <p style={{ fontSize: 13, color: "#666" }}>{s.desc}</p>
            </div>
          ))}
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
          Start Flipping Smarter
        </h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>
          Join thousands of investors using Ceche to maximize domain ROI.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              backgroundColor: "#F4A261",
              color: "#111",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create Free Account
          </Link>
          <Link
            href="/marketplace"
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
            Browse Marketplace
          </Link>
        </div>
      </section>
    </main>
  );
}
