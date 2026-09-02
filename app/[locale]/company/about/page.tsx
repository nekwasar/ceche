"use client";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* Dark Hero */}
      <section style={{ backgroundColor: "#111111", padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(158,42,43,0.25) 0%, transparent 70%)" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <span style={{ display: "block", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", color: "#F4A261", marginBottom: 16 }}>
            About Ceche
          </span>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: "#FFF", lineHeight: 1.1, margin: "0 auto 20px", maxWidth: 560 }}>
            Built for investors who trade on data
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            The domain marketplace where premium names are bought and sold—powered by real intelligence, not guesswork.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
            <a href="/tools/appraisal" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, backgroundColor: "#F4A261", color: "#111111", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Try Appraisal →
            </a>
            <a href="/marketplace" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", color: "#FFF", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Browse Marketplace
            </a>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#EFECE6", borderRadius: 20, padding: "56px 48px" }}>
            <span style={{ display: "block", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", color: "#999", marginBottom: 12 }}>
              Our Origin
            </span>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "#111111", margin: "0 0 24px", lineHeight: 1.15 }}>
              Founded by a domain investor who saw the market needed better data
            </h2>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 16 }}>
              The domain aftermarket generates over $3 billion in annual transactions, yet most marketplaces are opaque, inflated by scrapers, and built on intuition rather than data. Ceche was created to fix that.
            </p>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8 }}>
              We combined the intelligence of a research platform with the transaction mechanics of a marketplace. You evaluate the numbers first—estimated value, health score, CPC, brandability—and the name only appears when you pay to reveal it. Every valuation is backed by a published methodology and a verifiable dataset.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section style={{ padding: "0 0 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 auto" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#9E2A2B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "#FFF" }}>NU</span>
              </div>
            </div>
            <div style={{ flex: "1 1 400px" }}>
              <span style={{ display: "block", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", color: "#999", marginBottom: 8 }}>
                Founder
              </span>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111111", margin: "0 0 12px" }}>
                Nekwasachukwu Ucheokoye
              </h2>
              <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7 }}>
                Domain name investor &amp; reseller managing 100+ domains. Agentic &amp; systems engineer building intelligent infrastructure for the domain industry. Based in Awka, Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — 3 Trimmed */}
      <section style={{ padding: "0 0 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#EFECE6", borderRadius: 20, padding: "56px 48px" }}>
            <span style={{ display: "block", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", color: "#999", marginBottom: 12 }}>
              What We Believe
            </span>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111111", margin: "0 0 40px" }}>
              Three principles that drive every decision
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                {
                  num: "1",
                  title: "Transparency",
                  desc: "We publish our methodology, data sources, and accuracy metrics. Users who understand how we work trust us more than users who are asked to take our word for it.",
                },
                {
                  num: "2",
                  title: "Data Rigor",
                  desc: "Every claim we make is backed by data. Every tool produces measurable outputs. We do not rely on intuition when data is available.",
                },
                {
                  num: "3",
                  title: "Speed",
                  desc: "We ship fast and iterate. Perfection is the enemy of progress—we aim for good enough to ship and improve from there.",
                },
              ].map((v) => (
                <div key={v.num} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: "#9E2A2B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#FFF" }}>{v.num}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111111", margin: "0 0 8px" }}>{v.title}</h3>
                    <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "#111111" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#FFF", marginBottom: 12 }}>
            Ready to find your next domain?
          </h2>
          <p style={{ fontSize: 16, color: "#999", marginBottom: 32 }}>
            Every name is backed by data. The marketplace is open.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="/marketplace" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, backgroundColor: "#F4A261", color: "#111111", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Browse Marketplace →
            </a>
            <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", color: "#FFF", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
