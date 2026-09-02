import Link from "next/link";

const personas = [
  {
    title: "Domain Investors",
    desc: "Portfolio yield analysis, flipper metrics, and drop-catching alerts. Maximize returns on your domain investments.",
    stat: "8–15%",
    statLabel: "Commission Tiers",
    href: "/solutions/domain-investors",
    icon: "📈",
  },
  {
    title: "Startup Founders",
    desc: "Brandability index, keyword pronounceability, and extension penetration tools. Find the perfect domain for your startup.",
    stat: "16",
    statLabel: "Scoring Dimensions",
    href: "/solutions/startup-founders",
    icon: "🚀",
  },
  {
    title: "SEO Agencies",
    desc: "Expired domain backlink authority scoring and spam penalty recovery audits. Data-driven domain acquisition for agency growth.",
    stat: "10K",
    statLabel: "API Calls/Day",
    href: "/solutions/seo-agencies",
    icon: "📊",
  },
  {
    title: "Find Available Domains",
    desc: "Scan millions of combinations for available domain names. Smart suggestions and real-time availability checks.",
    stat: "4",
    statLabel: "TLDs Scanned",
    href: "/solutions/find-available",
    icon: "🔍",
  },
  {
    title: "Research Intelligence",
    desc: "Deep domain analysis before acquisition. Make informed decisions with comprehensive intelligence reports.",
    stat: "0–100",
    statLabel: "Buyer Intent Score",
    href: "/solutions/research-intelligence",
    icon: "🔬",
  },
  {
    title: "Buy Premium Domains",
    desc: "Acquire high-value domains through escrow-protected transactions. Secure, transparent, and instant.",
    stat: "$5–$50",
    statLabel: "Reveal Fee Range",
    href: "/solutions/buy-premium",
    icon: "💎",
  },
];

export default function SolutionsPage() {
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
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "96px 24px 64px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#111111",
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Solutions for Every Domain Need
        </h1>
        <p
          style={{
            fontSize: 20,
            color: "#666666",
            maxWidth: 640,
            margin: "0 auto 64px",
            lineHeight: 1.6,
          }}
        >
          Whether you invest, build, or broker — Ceche has the tools, data, and
          marketplace to power your domain strategy.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            textAlign: "left",
          }}
        >
          {personas.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 32,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                border: "1px solid #E8E5DF",
                textDecoration: "none",
                color: "#111111",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</span>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#111111",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "#666666",
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: 20,
                }}
              >
                {p.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#9E2A2B",
                  }}
                >
                  {p.stat}
                </span>
                <span style={{ fontSize: 13, color: "#999" }}>
                  {p.statLabel}
                </span>
              </div>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#9E2A2B",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#111111",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 20,
            color: "#FAF7F2",
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          Ready to get started?
        </p>
        <Link
          href="/signup"
          style={{
            display: "inline-block",
            padding: "14px 40px",
            backgroundColor: "#9E2A2B",
            color: "#FFFFFF",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Create Free Account
        </Link>
      </section>
    </main>
  );
}
