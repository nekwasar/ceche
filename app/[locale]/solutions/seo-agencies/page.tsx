import Link from "next/link";

export default function SeoAgenciesPage() {
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
      {/* Dark Hero with Stat Cards */}
      <section
        style={{
          background: "#111111",
          padding: "96px 24px 80px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 700, marginBottom: 48 }}>
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
              For Agencies
            </span>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 16,
                color: "#FFF",
              }}
            >
              Scale Domain
              <br />
              Acquisition for Clients
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
              }}
            >
              Expired domain backlink authority scoring, spam penalty recovery
              audits, and bulk tools designed for agency workflows. Handle
              5,000+ domains per project.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {[
              { value: "5K", label: "Bulk Domains", accent: false },
              { value: "10K", label: "API Calls/Day", accent: false },
              { value: "8–15%", label: "Commission Tiers", accent: false },
              { value: "$5–$50", label: "Reveal Fee", accent: true },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  backgroundColor: s.accent ? "#9E2A2B" : "rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: 24,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: "#FFF",
                    marginBottom: 4,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement 3-col */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px",
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
          Why Agencies Choose Ceche
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {[
            {
              title: "Client Results",
              desc: "Deliver measurable ROI with data-backed domain acquisitions. Show clients exactly why a domain is worth the investment.",
              num: "01",
            },
            {
              title: "Time Savings",
              desc: "Bulk scan 5,000 domains at once and score them across 16 dimensions. What used to take days now takes minutes.",
              num: "02",
            },
            {
              title: "Revenue Growth",
              desc: "Lower commission tiers as volume increases. Earn more per deal with 8–15% tiered commissions and minimum-based pricing.",
              num: "03",
            },
          ].map((p) => (
            <div
              key={p.title}
              style={{
                borderTop: "3px solid #9E2A2B",
                backgroundColor: "#FFF",
                borderRadius: "0 0 12px 12px",
                padding: 32,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#9E2A2B",
                  letterSpacing: 1,
                }}
              >
                {p.num}
              </span>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginTop: 8,
                  marginBottom: 12,
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Rows */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {[
          {
            title: "Expired Domain Authority",
            desc: "Evaluate backlink profiles of expired domains for acquisition. See dofollow/nofollow ratios, anchor text distribution, and link velocity.",
            icon: "📊",
          },
          {
            title: "Spam Recovery Audits",
            desc: "Identify and recover from Google penalties with detailed analysis. Get actionable recommendations to restore domain health.",
            icon: "🛡️",
          },
          {
            title: "Bulk Analyzer",
            desc: "Process up to 5,000 domains per batch. Export CSV reports with scores, metrics, and recommendations for client presentations.",
            icon: "⚡",
          },
          {
            title: "Reporting Dashboard",
            desc: "White-label reports for client presentations. Schedule automated reports and track acquisition ROI across multiple projects.",
            icon: "📋",
          },
        ].map((f, i) => (
          <div
            key={f.title}
            style={{
              display: "flex",
              gap: 48,
              alignItems: "center",
              padding: "32px 0",
              borderBottom: i < 3 ? "1px solid #E8E5DF" : "none",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                backgroundColor: "#9E2A2B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                flexShrink: 0,
              }}
            >
              {f.icon}
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, maxWidth: 600 }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Pricing Section */}
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
            marginBottom: 12,
          }}
        >
          Plans for Every Agency
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#666",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Scale from solo consultant to full-service agency
        </p>
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
              period: "/3 domains/day",
              features: [
                "16-dimension scoring",
                "SEO Scanner",
                "Basic insights",
              ],
              cta: "Get Started",
              dark: false,
            },
            {
              name: "Startup",
              price: "$79",
              period: "/mo",
              features: [
                "12 domains/day",
                "Extended Insights",
                "Trademark Monitor",
                "Priority support",
              ],
              cta: "Start Trial",
              dark: true,
            },
            {
              name: "Enterprise",
              price: "$129",
              period: "/mo",
              features: [
                "Unlimited scoring",
                "Bulk Analyzer (5K)",
                "API (10K calls/day)",
                "White-label reports",
              ],
              cta: "Contact Sales",
              dark: false,
            },
          ].map((p) => (
            <div
              key={p.name}
              style={{
                backgroundColor: p.dark ? "#111" : "#FFF",
                color: p.dark ? "#FFF" : "#111",
                border: p.dark ? "none" : "1px solid #E8E5DF",
                borderRadius: 12,
                padding: 32,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                {p.name}
              </h3>
              <div style={{ display: "flex", alignItems: "baseline", marginBottom: 20 }}>
                <span style={{ fontSize: 40, fontWeight: 800 }}>{p.price}</span>
                <span
                  style={{
                    fontSize: 14,
                    color: p.dark ? "rgba(255,255,255,0.5)" : "#999",
                    marginLeft: 4,
                  }}
                >
                  {p.period}
                </span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 24px",
                  flex: 1,
                }}
              >
                {p.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 14,
                      padding: "6px 0",
                      color: p.dark ? "rgba(255,255,255,0.8)" : "#666",
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
                  padding: "12px 24px",
                  backgroundColor: p.dark ? "#9E2A2B" : "#111",
                  color: "#FFF",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Dark CTA Strip */}
      <section
        style={{
          background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: 32, fontWeight: 800, color: "#FFF", marginBottom: 12 }}
        >
          Ready to Scale Your Agency?
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 32,
          }}
        >
          Start with a free account or talk to our team about volume pricing.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              padding: "14px 36px",
              backgroundColor: "#9E2A2B",
              color: "#FFF",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create Free Account
          </Link>
          <Link
            href="/help/api"
            style={{
              display: "inline-block",
              padding: "14px 36px",
              backgroundColor: "transparent",
              color: "#F4A261",
              border: "2px solid #F4A261",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            API Documentation
          </Link>
        </div>
      </section>
    </main>
  );
}
