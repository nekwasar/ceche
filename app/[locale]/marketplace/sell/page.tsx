"use client";

import { useState } from "react";

const steps = ["Submit", "Set Price", "Publish"];

const listingFees = [
  { tier: "Standard (.com, .net, .org)", fee: "$5", min: "—" },
  { tier: "Premium (.io, .co, .ai)", fee: "$10", min: "—" },
  { tier: "Ultra-Premium (1-word, brandable)", fee: "$25", min: "—" },
];

const commissions = [
  { tier: "Domains under $5,000", commission: "8%", minimum: "$50" },
  { tier: "Domains $5,000–$50,000", commission: "10%", minimum: "$200" },
  { tier: "Domains over $50,000", commission: "15%", minimum: "Negotiable" },
];

const eligibility = [
  "Domain must be registered and active",
  "You must verify ownership via TXT or CNAME record",
  "No active UDRP or legal disputes",
  "Domain must not be blacklisted for spam",
];

const sellerTools = [
  { title: "Analytics Dashboard", desc: "Track views, offers, and conversion rates for every listing in real time." },
  { title: "Bulk Listing", desc: "Import and manage multiple domain listings at once with CSV upload." },
  { title: "Automated Pricing", desc: "AI-powered suggested pricing based on domain metrics and market trends." },
];

export default function SellPage() {
  const [activeStep, setActiveStep] = useState(0);

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
            Sell Your Domains
          </h1>
          <p style={{ fontSize: 18, color: "#666666", maxWidth: 560 }}>
            List your premium domains on Ceche and reach qualified buyers worldwide.
          </p>
        </div>

        <section style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", gap: 0, marginBottom: 40 }}>
            {steps.map((step, i) => (
              <div
                key={step}
                onClick={() => setActiveStep(i)}
                style={{
                  flex: 1,
                  padding: "16px 24px",
                  backgroundColor: i === activeStep ? "#9E2A2B" : i < activeStep ? "#7A1F21" : "#EFECE6",
                  color: i <= activeStep ? "white" : "#666666",
                  cursor: "pointer",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: i === 0 ? "10px 0 0 10px" : i === steps.length - 1 ? "0 10px 10px 0" : 0,
                }}
              >
                <span style={{ fontFamily: "monospace", marginRight: 8, opacity: 0.6 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#EFECE6",
              borderRadius: 16,
              padding: 32,
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            {activeStep === 0 && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 8 }}>Submit Your Domain</h3>
                <p style={{ fontSize: 14, color: "#666666", marginBottom: 16 }}>
                  Enter your domain name. We'll run an automatic appraisal and verify ownership via TXT/CNAME record.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <input
                    type="text"
                    placeholder="yourdomain.com"
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: "1px solid rgba(0,0,0,0.1)",
                      backgroundColor: "white",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={() => setActiveStep(1)}
                    style={{
                      padding: "12px 28px",
                      backgroundColor: "#9E2A2B",
                      color: "white",
                      borderRadius: 10,
                      fontWeight: 600,
                      fontSize: 14,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 8 }}>Set Your Price</h3>
                <p style={{ fontSize: 14, color: "#666666", marginBottom: 16 }}>
                  Our AI suggests a price based on domain metrics. You can accept or set your own.
                </p>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111111" }}>$</span>
                  <input
                    type="text"
                    defaultValue="12,500"
                    style={{
                      width: 160,
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: "1px solid rgba(0,0,0,0.1)",
                      backgroundColor: "white",
                      fontSize: 14,
                      fontWeight: 600,
                      outline: "none",
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#999999" }}>Suggested: $12,500</span>
                  <button
                    onClick={() => setActiveStep(2)}
                    style={{
                      marginLeft: "auto",
                      padding: "12px 28px",
                      backgroundColor: "#9E2A2B",
                      color: "white",
                      borderRadius: 10,
                      fontWeight: 600,
                      fontSize: 14,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginBottom: 8 }}>Publish Listing</h3>
                <p style={{ fontSize: 14, color: "#666666", marginBottom: 16 }}>
                  Review your listing details and publish. Your domain goes live within 24 hours.
                </p>
                <button
                  style={{
                    padding: "14px 32px",
                    backgroundColor: "#047857",
                    color: "white",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 14,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Publish Listing
                </button>
              </div>
            )}
          </div>
        </section>

        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111111", marginBottom: 24 }}>Fee Structure</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111111", marginBottom: 12 }}>Listing Fees</h3>
              <div style={{ backgroundColor: "#EFECE6", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)" }}>
                {listingFees.map((f, i) => (
                  <div
                    key={f.tier}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 80px 80px",
                      padding: "14px 20px",
                      borderBottom: i < listingFees.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#111111" }}>{f.tier}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#9E2A2B", textAlign: "right" }}>{f.fee}</span>
                    <span style={{ fontSize: 12, color: "#999999", textAlign: "right" }}>{f.min}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111111", marginBottom: 12 }}>Commission Rates</h3>
              <div style={{ backgroundColor: "#EFECE6", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)" }}>
                {commissions.map((c, i) => (
                  <div
                    key={c.tier}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 80px 100px",
                      padding: "14px 20px",
                      borderBottom: i < commissions.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#111111" }}>{c.tier}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#9E2A2B", textAlign: "right" }}>{c.commission}</span>
                    <span style={{ fontSize: 12, color: "#999999", textAlign: "right" }}>Min: {c.minimum}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111111", marginBottom: 24 }}>Eligibility Checklist</h2>
          <div
            style={{
              backgroundColor: "#EFECE6",
              borderRadius: 16,
              padding: 28,
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {eligibility.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#111111" }}>
                  <span style={{ color: "#047857", fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111111", marginBottom: 24 }}>Seller Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {sellerTools.map((tool) => (
              <div
                key={tool.title}
                style={{
                  backgroundColor: "#EFECE6",
                  borderRadius: 16,
                  padding: 28,
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111111", marginBottom: 8 }}>{tool.title}</h3>
                <p style={{ fontSize: 13, color: "#666666", margin: 0 }}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            backgroundColor: "#111111",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "white", marginBottom: 12 }}>
            Ready to sell?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>
            List your first domain in under 5 minutes.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <a
              href="/signup"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#F4A261",
                color: "#111111",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Create Account
            </a>
            <a
              href="/pricing"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              View Pricing
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
