"use client";

import Link from "next/link";

export default function DomainDatabasePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2" }}>
      {/* Large Stat Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #111111 0%, #2A2A2A 100%)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(244,162,97,0.2)",
              color: "#F4A261",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              marginBottom: "24px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            COMPREHENSIVE DATA
          </span>
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1,
              marginBottom: "12px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            2,847
          </div>
          <p
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "24px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            TLDs tracked across all registries
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Access the most comprehensive domain database available. Track
            registrations, expirations, and pricing across every major TLD.
          </p>
        </div>
      </section>

      {/* 2x2 Data Grid */}
      <section style={{ maxWidth: "1000px", margin: "-40px auto 0", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          {[
            {
              value: "420M+",
              label: "Domains Tracked",
              desc: "Active registrations across all TLDs",
            },
            {
              value: "2.1B",
              label: "Historical Records",
              desc: "Registration and expiration history",
            },
            {
              value: "50K+",
              label: "Daily Updates",
              desc: "New registrations processed daily",
            },
            {
              value: "99.9%",
              label: "Uptime",
              desc: "Database availability guarantee",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "32px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#9E2A2B",
                  marginBottom: "8px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.value}
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "6px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.label}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666666",
                  lineHeight: 1.5,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Search Methods */}
      <section style={{ maxWidth: "1000px", margin: "60px auto", padding: "0 24px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#111111",
            textAlign: "center",
            marginBottom: "40px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Search Methods
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            {
              icon: "🔍",
              title: "Single Lookup",
              desc: "Search any domain for instant registration data and availability status.",
            },
            {
              icon: "📋",
              title: "Bulk Check",
              desc: "Upload up to 5,000 domains at once for batch availability analysis.",
            },
            {
              icon: "🔗",
              title: "API Query",
              desc: "Programmatic access via RESTful API with up to 10,000 calls per day.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{item.icon}</div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "8px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666666",
                  lineHeight: 1.6,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Sources */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "60px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111111",
              textAlign: "center",
              marginBottom: "32px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Data Sources
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {[
              { source: "ICANN", desc: "Official domain registration data" },
              { source: "Registry Operators", desc: "Direct TLD zone file access" },
              { source: "WHOIS/RDAP", desc: "Registration and contact information" },
              { source: "Wayback Machine", desc: "Historical content snapshots" },
              { source: "Certificate Transparency", desc: "SSL certificate monitoring" },
              { source: "DNS Resolvers", desc: "Real-time DNS record verification" },
            ].map((item) => (
              <div
                key={item.source}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px",
                  backgroundColor: "#FAF7F2",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#9E2A2B",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#111111",
                      fontSize: "15px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.source}
                  </span>
                  <p
                    style={{
                      color: "#666666",
                      fontSize: "13px",
                      marginTop: "2px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Levels */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#111111",
            textAlign: "center",
            marginBottom: "40px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Access Levels
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            {
              plan: "Free",
              price: "$0",
              features: ["Basic lookup", "3 searches/day", "Limited TLDs"],
            },
            {
              plan: "Startup",
              price: "$79/mo",
              features: ["Full database", "30 searches/day", "CSV export", "Priority support"],
              popular: true,
            },
            {
              plan: "Enterprise",
              price: "$129/mo",
              features: ["Unlimited access", "API (10K calls/day)", "Webhooks", "Custom data"],
            },
          ].map((item) => (
            <div
              key={item.plan}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "32px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: item.popular ? "2px solid #9E2A2B" : "2px solid transparent",
                position: "relative",
              }}
            >
              {item.popular && (
                <span
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#9E2A2B",
                    color: "#FFFFFF",
                    padding: "4px 16px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  POPULAR
                </span>
              )}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "8px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.plan}
              </h3>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#9E2A2B",
                  marginBottom: "20px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.price}
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {item.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #F0F0F0",
                      color: "#666666",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    <span style={{ color: "#27AE60" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #9E2A2B 0%, #7A1F1F 100%)",
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Access the Complete Domain Database
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "32px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          2,847 TLDs, 420M+ domains, real-time data at your fingertips.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/signup"
            style={{
              backgroundColor: "#F4A261",
              color: "#111111",
              padding: "14px 32px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Start Free Trial
          </Link>
          <Link
            href="/tools/domain-lookup"
            style={{
              backgroundColor: "transparent",
              color: "#FFFFFF",
              padding: "14px 32px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              border: "2px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Try Domain Lookup
          </Link>
          <Link
            href="/tools/api"
            style={{
              backgroundColor: "transparent",
              color: "#FFFFFF",
              padding: "14px 32px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              border: "2px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            View API Docs
          </Link>
        </div>
      </section>
    </div>
  );
}
