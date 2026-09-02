"use client";

export default function BlogPage() {
  const articles = [
    { date: "Aug 28, 2026", title: "Why Premium .com Domains Still Outperform New gTLDs" },
    { date: "Aug 21, 2026", title: "The Hidden ROI of Portfolio Health Scores" },
    { date: "Aug 14, 2026", title: "5 Red Flags in Domain Appraisals You're Ignoring" },
    { date: "Aug 07, 2026", title: "How to Price a Domain Without Guessing" },
    { date: "Jul 31, 2026", title: "Blind Auctions vs. Fixed Listings: A Data Comparison" },
    { date: "Jul 24, 2026", title: "Building a Domain Reselling Workflow from Scratch" },
  ];

  const categories = ["Strategy", "Market Data", "Tutorials", "Industry News", "Case Studies"];

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* Hero — 5/7 Split */}
      <section style={{ padding: "80px 0 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Left — 5/7 */}
          <div style={{ flex: "5 1 0", minWidth: 300 }}>
            <span style={{ display: "block", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", color: "#9E2A2B", marginBottom: 16 }}>
              Ceche Blog
            </span>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: "#111111", lineHeight: 1.1, fontFamily: "Georgia, serif", margin: 0 }}>
              Domain intelligence, decoded.
            </h1>
            <p style={{ fontSize: 18, color: "#666", lineHeight: 1.6, marginTop: 20, maxWidth: 520 }}>
              Strategy guides, market analysis, and frameworks for domain investors who trade on data—not intuition.
            </p>
          </div>

          {/* Right — 2/7 */}
          <div style={{ flex: "2 1 0", minWidth: 180, paddingTop: 8 }}>
            <span style={{ display: "block", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", color: "#999", marginBottom: 12 }}>
              Topics
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {categories.map((cat) => (
                <span key={cat} style={{ fontSize: 14, color: "#9E2A2B", cursor: "pointer", fontWeight: 500, borderBottom: "1px solid transparent" }}>
                  {cat} →
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div style={{ overflow: "hidden", backgroundColor: "#EFECE6", padding: "14px 0", marginBottom: 60, borderTop: "1px solid #E8E5DE", borderBottom: "1px solid #E8E5DE" }}>
        <div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", animation: "marquee 30s linear infinite" }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ fontSize: 13, color: "#999", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>
              Domain Valuations · Market Reports · Portfolio Analytics · Blind Marketplace · 16-Dimension Framework · Health Scores · CPC Data · Brandability Index · Try Your Luck ·
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* 3-Column Article Grid */}
      <section style={{ padding: "0 0 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 32 }}>
            {articles.map((a, i) => (
              <a key={i} href="#" style={{ display: "block", padding: "32px 0", borderTop: "1px solid #E8E5DE", textDecoration: "none", color: "#111111" }}>
                <span style={{ display: "block", fontSize: 12, color: "#999", fontFamily: "monospace", marginBottom: 12 }}>
                  {a.date}
                </span>
                <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.25, margin: 0, color: "#111111" }}>
                  {a.title}
                </h2>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "#111111" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#FFF", marginBottom: 12 }}>
            Want the full library?
          </h2>
          <p style={{ fontSize: 16, color: "#999", marginBottom: 32 }}>
            Download our ebooks and go deeper on domain investing.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="/resources/ebooks" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, backgroundColor: "#F4A261", color: "#111111", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Browse Ebooks →
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
