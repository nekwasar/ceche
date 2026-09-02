import Link from "next/link";

export default function StartupFoundersPage() {
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
      {/* Centered Hero with Badge */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "96px 24px 64px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "6px 14px",
            backgroundColor: "#F4A261",
            color: "#111",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          For Founders
        </span>
        <h1
          style={{
            fontSize: 52,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Build Your Brand
          <br />
          on the Right Domain
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#666",
            lineHeight: 1.7,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          AI-powered brandability scoring, pronounceability analysis, and
          trademark screening — everything you need before you commit to a name.
        </p>
      </section>

      {/* 3-Step Horizontal Process */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 24px 64px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 1fr 80px 1fr",
            alignItems: "start",
            gap: 0,
          }}
        >
          {[
            {
              num: "1",
              title: "Describe Your Brand",
              desc: "Enter a brief description of your startup, industry, and audience.",
            },
            {
              num: "2",
              title: "Score & Compare",
              desc: "Get 16-dimension scores across 4 TLDs with brandability ratings.",
            },
            {
              num: "3",
              title: "Claim Your Domain",
              desc: "Register, buy on marketplace, or set alerts for expiring names.",
            },
          ].map((s, i) => (
            <div key={s.num} style={{ display: "contents" }}>
              <div
                style={{
                  backgroundColor: "#FFF",
                  border: "1px solid #E8E5DF",
                  borderRadius: 12,
                  padding: 28,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "#9E2A2B",
                    color: "#FFF",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 14,
                  }}
                >
                  {s.num}
                </div>
                <h3
                  style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
              {i < 2 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    color: "#ccc",
                    paddingTop: 36,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Alternating Feature Rows */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 24px 64px",
        }}
      >
        {[
          {
            title: "Brandability Index",
            desc: "AI-powered scoring that evaluates brandability, memorability, and market potential. Not just a name — a brand asset.",
            align: "left",
          },
          {
            title: "Pronounceability",
            desc: "Vowel balance, consonant clusters, and bigram frequency analysis ensure your domain is easy to say, spell, and remember.",
            align: "right",
          },
          {
            title: "Extension Penetration",
            desc: "Compare .com, .io, .co, and .ai with market penetration rates. Know which TLD fits your audience before committing.",
            align: "left",
          },
          {
            title: "Social Availability",
            desc: "Check username availability across major platforms alongside your domain search. Secure the full brand identity in one pass.",
            align: "right",
          },
        ].map((f, i) => (
          <div
            key={f.title}
            style={{
              display: "flex",
              flexDirection: i % 2 === 0 ? "row" : "row-reverse",
              gap: 48,
              alignItems: "center",
              marginBottom: 48,
            }}
          >
            <div style={{ flex: 1 }}>
              <h3
                style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: "#666",
                  lineHeight: 1.7,
                }}
              >
                {f.desc}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                height: 200,
                backgroundColor: "#FFF",
                border: "1px solid #E8E5DF",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ccc",
                fontSize: 48,
              }}
            >
              {i === 0 ? "🏷️" : i === 1 ? "🗣️" : i === 2 ? "🌐" : "📱"}
            </div>
          </div>
        ))}
      </section>

      {/* Founder Features Grid */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 24px 64px",
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
          Built for Founders
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          {[
            {
              title: "Competitor Naming",
              desc: "Analyze naming patterns in your industry for competitive insights.",
            },
            {
              title: "Trademark Risk",
              desc: "USPTO and WIPO database screening before brand commitment.",
            },
            {
              title: "Appraisal Tool",
              desc: "Get algorithmic valuations with confidence intervals.",
            },
            {
              title: "SEO Scanner",
              desc: "Evaluate backlink profiles of potential domains instantly.",
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                backgroundColor: "#FFF",
                border: "1px solid #E8E5DF",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                {f.title}
              </h4>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
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
          Find Your Brand Domain
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 32,
            maxWidth: 500,
            margin: "0 auto 32px",
          }}
        >
          Start with a free account. Score unlimited domains across 4 TLDs.
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
            href="/tools/appraisal"
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
            Try Appraisal Tool
          </Link>
        </div>
      </section>
    </main>
  );
}
