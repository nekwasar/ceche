"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function EbooksPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(2);

  useEffect(() => {
    if (!showModal) return;
    const interval = setInterval(() => {
      setModalCountdown((prev) => {
        if (prev <= 1) { window.location.href = "/signup"; return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showModal]);

  const catalog = [
    {
      title: "The Domain Appraiser's Toolkit",
      pages: 32,
      date: "Apr 2026",
      downloads: "12K+",
      desc: "A step-by-step guide to valuing domains using data, not guesswork. Covers the 16-Dimension Framework, health scoring, and comparative market analysis.",
      color: "#9E2A2B",
    },
    {
      title: "Blind Marketplace Playbook",
      pages: 28,
      date: "Mar 2026",
      downloads: "8K+",
      desc: "How Ceche's blind bidding system eliminates price inflation and gives buyers an edge. Includes negotiation templates and bid strategy frameworks.",
      color: "#F4A261",
    },
    {
      title: "Portfolio Health Audit Guide",
      pages: 24,
      date: "Feb 2026",
      downloads: "6K+",
      desc: "Run a full health check on your domain portfolio. Identify underperformers, renewal traps, and hidden gems with Ceche's scoring system.",
      color: "#9E2A2B",
    },
    {
      title: "Domain Reselling 101",
      pages: 36,
      date: "Jan 2026",
      downloads: "15K+",
      desc: "From acquisition to close—everything a new domain reseller needs. Pricing strategies, buyer outreach, and closing techniques backed by real data.",
      color: "#F4A261",
    },
  ];

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* Hero — Homepage Style */}
      <section style={{ backgroundColor: "#9E2A2B", padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
        {/* Radial gradients */}
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,162,97,0.3) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <span style={{ display: "block", fontSize: 10, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase", color: "#F4A261", marginBottom: 16 }}>
            Ceche Ebooks
          </span>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: "#FFF", lineHeight: 1.1, margin: "0 auto 20px", maxWidth: 640 }}>
            Go deeper on domain investing
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
            Free guides, frameworks, and playbooks for domain investors at every level.
          </p>
        </div>
      </section>

      {/* Featured Book */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "center", backgroundColor: "#FFF", borderRadius: 20, padding: 48, border: "1px solid #E8E5DE" }}>
            {/* Book Cover */}
            <div style={{ flex: "1 1 300px", position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", background: "linear-gradient(135deg, #9E2A2B 0%, #7A1F21 100%)", borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
                <span style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: 3, color: "#F4A261", textTransform: "uppercase", marginBottom: 16 }}>Ceche Ebook</span>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#FFF", textAlign: "center", lineHeight: 1.2, fontFamily: "Georgia, serif" }}>The Domain Investor&apos;s Playbook</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>42 Pages · June 2026</span>
              </div>
            </div>

            {/* Book Details */}
            <div style={{ flex: "1 1 300px" }}>
              <span style={{ display: "inline-block", fontSize: 10, fontFamily: "monospace", letterSpacing: 2, color: "#9E2A2B", backgroundColor: "#EFECE6", padding: "6px 12px", borderRadius: 4, textTransform: "uppercase", marginBottom: 16 }}>
                Featured
              </span>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: "#111111", margin: "0 0 16px", lineHeight: 1.15 }}>
                The Domain Investor&apos;s Playbook
              </h2>
              <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, marginBottom: 24 }}>
                The definitive guide to buying, valuing, and selling domain names for profit. 42 pages of actionable frameworks, case studies, and Ceche-specific strategies used by top resellers.
              </p>
              <div style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
                <div>
                  <span style={{ display: "block", fontSize: 28, fontWeight: 700, color: "#111111" }}>34K+</span>
                  <span style={{ fontSize: 12, color: "#999" }}>Downloads</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 28, fontWeight: 700, color: "#111111" }}>42</span>
                  <span style={{ fontSize: 12, color: "#999" }}>Pages</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 28, fontWeight: 700, color: "#111111" }}>4.9</span>
                  <span style={{ fontSize: 12, color: "#999" }}>Rating</span>
                </div>
              </div>
              <button style={{ padding: "14px 32px", borderRadius: 999, backgroundColor: "#9E2A2B", color: "#FFF", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer" }}>
                Get Free Copy →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog — 2 Column */}
      <section style={{ padding: "0 0 100px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111111", marginBottom: 40 }}>
            More from Ceche
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 24 }}>
            {catalog.map((book, i) => (
              <div key={i} style={{ display: "flex", gap: 24, backgroundColor: "#FFF", borderRadius: 16, padding: 28, border: "1px solid #E8E5DE", alignItems: "flex-start" }}>
                {/* Mini Cover */}
                <div style={{ width: 80, height: 108, borderRadius: 8, background: `linear-gradient(135deg, ${book.color} 0%, ${book.color}cc 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexShrink: 0, padding: 8 }}>
                  <span style={{ fontSize: 8, fontFamily: "monospace", color: "#FFF", textAlign: "center", lineHeight: 1.2 }}>
                    {book.title.split(" ").slice(0, 3).join(" ")}
                  </span>
                </div>
                {/* Details */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111111", margin: "0 0 8px", lineHeight: 1.3 }}>
                    {book.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#999", marginBottom: 12 }}>
                    {book.pages} pages · {book.date} · {book.downloads} downloads
                  </p>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>
                    {book.desc}
                  </p>
                  <button onClick={() => setShowModal(true)} style={{ padding: "10px 20px", borderRadius: 999, backgroundColor: "#111111", color: "#FFF", fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer" }}>
                    Get Digital Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "#EFECE6" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111111", marginBottom: 12 }}>
            Want more articles and market insights?
          </h2>
          <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
            Our blog covers domain strategy, pricing models, and industry analysis.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="/resources/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, backgroundColor: "#9E2A2B", color: "#FFF", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Read the Blog →
            </a>
            <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 999, border: "1px solid #9E2A2B", color: "#9E2A2B", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.6)" }} onClick={() => setShowModal(false)}>
          <div style={{ backgroundColor: "white", borderRadius: 24, padding: 56, maxWidth: 520, width: "90%", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "rgba(158,42,43,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Download className="w-8 h-8" style={{ color: "#9E2A2B" }} />
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111111", marginBottom: 12 }}>Create an account to download</h2>
            <p style={{ fontSize: 16, color: "#666666", marginBottom: 20, lineHeight: 1.6 }}>
              All Ceche ebooks and guides are free for registered users.
            </p>
            <div style={{ backgroundColor: "#FAF7F2", borderRadius: 8, padding: 12, marginBottom: 20 }}>
              <p style={{ fontSize: 12, color: "#999999" }}>Redirecting to signup in {modalCountdown} seconds...</p>
            </div>
            <a href="/signup" style={{ display: "inline-block", padding: "14px 32px", backgroundColor: "#9E2A2B", color: "white", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none", marginBottom: 12 }}>Create free account</a>
            <div><button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", color: "#999999", fontSize: 14, cursor: "pointer", textDecoration: "underline" }}>Go back</button></div>
          </div>
        </div>
      )}
    </main>
  );
}
