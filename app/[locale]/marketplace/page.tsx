"use client";

import { useState, useEffect } from "react";

const mockListings = [
  { id: "1", value: "$15,200", score: "92", health: "85/100", cpc: "$8.50", da: "45", tld: ".com", category: "Tech", intent: "High commercial", listed: "2 days ago" },
  { id: "2", value: "$8,400", score: "87", health: "78/100", cpc: "$5.20", da: "32", tld: ".io", category: "SaaS", intent: "High commercial", listed: "5 days ago" },
  { id: "3", value: "$22,100", score: "95", health: "91/100", cpc: "$12.00", da: "58", tld: ".com", category: "Finance", intent: "Premium keyword", listed: "1 day ago" },
  { id: "4", value: "$3,800", score: "74", health: "65/100", cpc: "$2.80", da: "18", tld: ".net", category: "Business", intent: "Medium commercial", listed: "1 week ago" },
  { id: "5", value: "$45,000", score: "98", health: "94/100", cpc: "$18.50", da: "72", tld: ".com", category: "E-commerce", intent: "Premium keyword", listed: "3 hours ago" },
  { id: "6", value: "$6,200", score: "81", health: "72/100", cpc: "$4.10", da: "28", tld: ".co", category: "Startup", intent: "High commercial", listed: "4 days ago" },
];

const filters = [
  { label: "All TLDs", value: "all" },
  { label: ".com", value: "com" },
  { label: ".net", value: "net" },
  { label: ".io", value: "io" },
  { label: ".co", value: "co" },
];

const stats = [
  { label: "Listed Domains", value: "2,847" },
  { label: "Revealed Today", value: "142" },
  { label: "Avg. Domain Value", value: "$12,400" },
  { label: "Total Sold", value: "$3.2M" },
];

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("value");
  const [showModal, setShowModal] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(2);

  useEffect(() => {
    if (!showModal) return;
    const interval = setInterval(() => {
      setModalCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = "/signup";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showModal]);

  const filteredListings = mockListings.filter(
    (l) => activeFilter === "all" || l.tld === `.${activeFilter}`
  );

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>
        <div style={{ marginBottom: 48 }}>
          <span
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#999999",
              display: "block",
              marginBottom: 12,
            }}
          >
            Marketplace
          </span>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: "#111111", marginBottom: 16 }}>
            Premium Domains
          </h1>
          <p style={{ fontSize: 18, color: "#666666", maxWidth: 560 }}>
            Browse our curated inventory. Full stats shown — name hidden. Pay to reveal.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                backgroundColor: "#EFECE6",
                borderRadius: 14,
                padding: "20px 24px",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "#999999", textTransform: "uppercase", marginBottom: 6 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#111111" }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 24 }}>
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              style={{
                padding: "8px 20px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                backgroundColor: activeFilter === filter.value ? "#9E2A2B" : "#EFECE6",
                color: activeFilter === filter.value ? "white" : "#666666",
              }}
            >
              {filter.label}
            </button>
          ))}
          <div style={{ marginLeft: "auto" }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "8px 20px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 600,
                backgroundColor: "#EFECE6",
                border: "1px solid rgba(0,0,0,0.1)",
                color: "#666666",
                cursor: "pointer",
              }}
            >
              <option value="value">Sort by Value</option>
              <option value="score">Sort by Score</option>
              <option value="listed">Sort by Listed</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              style={{
                backgroundColor: "#EFECE6",
                borderRadius: 16,
                padding: "24px 28px",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "#999999", textTransform: "uppercase" }}>
                  🔒 Name Hidden
                </span>
                <span style={{ fontSize: 11, fontFamily: "monospace", padding: "2px 8px", borderRadius: 20, backgroundColor: "#E5DFD3", color: "#666666" }}>
                  {listing.tld}
                </span>
                <span style={{ fontSize: 11, fontFamily: "monospace", padding: "2px 8px", borderRadius: 20, backgroundColor: "#E5DFD3", color: "#666666" }}>
                  {listing.category}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
                {[
                  { label: "Value", val: listing.value },
                  { label: "Score", val: listing.score },
                  { label: "Health", val: listing.health },
                  { label: "CPC", val: listing.cpc },
                  { label: "DA", val: listing.da },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontSize: 10, fontFamily: "monospace", color: "#999999", textTransform: "uppercase", marginBottom: 2 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#111111" }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                <span style={{ fontSize: 12, color: "#999999" }}>
                  {listing.intent} • Listed {listing.listed}
                </span>
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 24px",
                    borderRadius: 24,
                    fontWeight: 600,
                    fontSize: 13,
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#9E2A2B",
                    color: "white",
                  }}
                >
                  👁 Reveal Name
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            backgroundColor: "#EFECE6",
            borderRadius: 16,
            padding: 32,
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            <div style={{ paddingRight: 32, borderRight: "1px solid rgba(0,0,0,0.08)", paddingBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111111", marginBottom: 6 }}>No Name Hints</h3>
              <p style={{ fontSize: 13, color: "#666666", margin: 0 }}>
                We show everything except the name. No asterisks, no partial reveals. Just the intelligence.
              </p>
            </div>
            <div style={{ padding: "0 32px", borderRight: "1px solid rgba(0,0,0,0.08)", paddingBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111111", marginBottom: 6 }}>Pay to Reveal</h3>
              <p style={{ fontSize: 13, color: "#666666", margin: 0 }}>
                Reveal price varies by domain value — from $5 for lower-value names to $50 for premium picks.
              </p>
            </div>
            <div style={{ paddingLeft: 32, paddingBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111111", marginBottom: 6 }}>Register Anywhere</h3>
              <p style={{ fontSize: 13, color: "#666666", margin: 0 }}>
                After reveal, we link you to Dynadot, Namecheap, or Porkbun. You choose where to register.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 16 }}>
          <a
            href="/marketplace/curated"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              backgroundColor: "#9E2A2B",
              color: "white",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Browse Curated
          </a>
          <a
            href="/marketplace/try-your-luck"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              border: "1px solid rgba(0,0,0,0.15)",
              color: "#111111",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Try Your Luck
          </a>
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 40,
              maxWidth: 420,
              width: "90%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111111", marginBottom: 8 }}>
              Create an Account
            </h2>
            <p style={{ fontSize: 14, color: "#666666", marginBottom: 16 }}>
              Sign up to reveal domain names and make purchases.
            </p>
            <div style={{ backgroundColor: "#FAF7F2", borderRadius: 8, padding: 12, marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: "#999999" }}>
                Redirecting to signup in {modalCountdown} seconds...
              </p>
            </div>
            <a
              href="/signup"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#9E2A2B",
                color: "white",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                marginBottom: 12,
              }}
            >
              Sign Up Free
            </a>
            <div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#999999",
                  fontSize: 13,
                  cursor: "pointer",
                  marginTop: 8,
                }}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
