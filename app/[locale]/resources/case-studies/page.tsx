"use client";

export default function CaseStudiesPage() {
  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* Hero — Editorial Magazine Style */}
      <section style={{ padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
        {/* Giant watermark */}
        <div style={{ position: "absolute", top: -40, right: -60, fontSize: 280, fontWeight: 900, color: "rgba(158,42,43,0.05)", lineHeight: 1, fontFamily: "Georgia, serif", pointerEvents: "none", userSelect: "none" }}>
          CS
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <span style={{ display: "block", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", color: "#9E2A2B", marginBottom: 20 }}>
            Case Studies
          </span>
          <h1 style={{ fontSize: 64, fontWeight: 900, color: "#111111", lineHeight: 1.05, fontFamily: "Georgia, serif", margin: "0 0 24px" }}>
            Real investors.<br />Real outcomes.
          </h1>

          {/* Thin accent divider */}
          <div style={{ width: 64, height: 3, backgroundColor: "#F4A261", marginBottom: 32 }} />

          {/* Two-column bottom: tagline + stats */}
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px" }}>
              <p style={{ fontSize: 18, color: "#666", lineHeight: 1.7, margin: 0 }}>
                See how domain investors, startups, and portfolio managers use Ceche to make faster, smarter decisions. Every case study is backed by real numbers—no cherry-picked success stories.
              </p>
            </div>
            <div style={{ flex: "1 1 200px", display: "flex", gap: 40, alignItems: "flex-start" }}>
              <div>
                <span style={{ display: "block", fontSize: 36, fontWeight: 700, color: "#9E2A2B", lineHeight: 1 }}>4.2K+</span>
                <span style={{ fontSize: 13, color: "#999" }}>Active Users</span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: 36, fontWeight: 700, color: "#9E2A2B", lineHeight: 1 }}>98%</span>
                <span style={{ fontSize: 13, color: "#999" }}>Accuracy Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ backgroundColor: "#EFECE6", borderRadius: 20, padding: "64px 40px", border: "1px solid #E8E5DE" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: "#9E2A2B", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
              <span style={{ fontSize: 28 }}>📊</span>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "#111111", margin: "0 0 16px" }}>
              Case studies coming soon
            </h2>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
              We&apos;re documenting how investors are using Ceche&apos;s tools to find undervalued domains, negotiate smarter, and close deals faster. Check back soon for in-depth breakdowns.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <a href="/tools/appraisal" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, backgroundColor: "#9E2A2B", color: "#FFF", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                Try Appraisal Tool →
              </a>
              <a href="/marketplace" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, backgroundColor: "#111111", color: "#FFF", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                Explore Marketplace
              </a>
              <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, border: "1px solid #9E2A2B", color: "#9E2A2B", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "60px 0 100px", backgroundColor: "#111111" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFF", marginBottom: 12 }}>
            Have a story to share?
          </h2>
          <p style={{ fontSize: 15, color: "#999", marginBottom: 28 }}>
            We&apos;d love to feature your experience with Ceche.
          </p>
          <a href="/resources/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, backgroundColor: "#F4A261", color: "#111111", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            Get in Touch →
          </a>
        </div>
      </section>
    </main>
  );
}
