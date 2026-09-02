"use client";

import { useState } from "react";
import Link from "next/link";
import PremiumGateModal from "@/components/layout/PremiumGateModal";

export default function BulkAnalyzerPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2" }}>
      <PremiumGateModal toolName="Bulk Analyzer" />

      {/* Split Hero */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "480px",
        }}
      >
        {/* Left - Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 48px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#9E2A2B",
              color: "#FFFFFF",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              marginBottom: "20px",
              width: "fit-content",
              fontFamily: "Inter, sans-serif",
            }}
          >
            ENTERPRISE
          </span>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 800,
              color: "#111111",
              marginBottom: "16px",
              lineHeight: 1.15,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Bulk Analyzer
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "#666666",
              marginBottom: "32px",
              lineHeight: 1.7,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Multi-domain batch evaluation tool for portfolio analysis and
            large-scale domain research. Process thousands of domains in seconds.
          </p>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              backgroundColor: "#9E2A2B",
              color: "#FFFFFF",
              padding: "14px 28px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              width: "fit-content",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Get Bulk Access
          </Link>
        </div>

        {/* Right - Processing Speed */}
        <div
          style={{
            background: "linear-gradient(135deg, #9E2A2B 0%, #7A1F1F 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "48px 36px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1,
              marginBottom: "8px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            5,000
          </div>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "32px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            domains per batch
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { value: "16", label: "Dimensions" },
              { value: "4", label: "TLDs" },
              { value: "<3s", label: "Per Domain" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#F4A261",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Flow */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 24px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#111111",
            textAlign: "center",
            marginBottom: "48px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          How It Works
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {[
            {
              step: "1",
              title: "Upload List",
              desc: "Paste domains or upload a CSV file with up to 5,000 domains.",
            },
            {
              step: "2",
              title: "Configure Scoring",
              desc: "Set custom weights for each of the 16 scoring dimensions.",
            },
            {
              step: "3",
              title: "Process",
              desc: "Our engine evaluates all domains in parallel with priority queuing.",
            },
            {
              step: "4",
              title: "Export Results",
              desc: "Download CSV with scores, pricing data, and priority rankings.",
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "28px",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#9E2A2B",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.step}
              </div>
              <h3
                style={{
                  fontSize: "16px",
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
                  fontSize: "13px",
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

      {/* Output Columns Table */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "60px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
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
            Output Columns
          </h2>
          <div
            style={{
              backgroundColor: "#FAF7F2",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#9E2A2B" }}>
                  {["Column", "Description", "Example"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "14px 20px",
                        textAlign: "left",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Domain", "The domain name analyzed", "example.com"],
                  ["Domain Rating", "Authority score 0-100", "72"],
                  ["SEO Score", "Composite (backlink 40%, traffic 30%, keyword 20%, technical 10%)", "68"],
                  ["Buyer Intent", "Score 0-100 indicating purchase likelihood", "45"],
                  ["Priority Score", "Combined ranking across all dimensions", "High"],
                  ["Estimated Value", "Fair market value range", "$2,400 - $3,600"],
                ].map(([col, desc, ex], i) => (
                  <tr
                    key={col}
                    style={{
                      borderBottom: "1px solid #E8E8E8",
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF7F2",
                    }}
                  >
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: "#111111" }}>
                      {col}
                    </td>
                    <td style={{ padding: "14px 20px", color: "#666666", fontSize: "14px" }}>
                      {desc}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        color: "#999999",
                        fontFamily: "monospace",
                        fontSize: "13px",
                      }}
                    >
                      {ex}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Priority Score Breakdown */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
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
          Priority Score Breakdown
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { dim: "Backlink Profile", weight: "40%", bar: 40 },
            { dim: "Traffic Analysis", weight: "30%", bar: 30 },
            { dim: "Keyword Metrics", weight: "20%", bar: 20 },
            { dim: "Technical SEO", weight: "10%", bar: 10 },
          ].map((item) => (
            <div
              key={item.dim}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span
                style={{
                  width: "160px",
                  fontWeight: 600,
                  color: "#111111",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.dim}
              </span>
              <div style={{ flex: 1, height: "8px", backgroundColor: "#E8E8E8", borderRadius: "4px" }}>
                <div
                  style={{
                    width: `${item.bar}%`,
                    height: "100%",
                    backgroundColor: "#9E2A2B",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <span
                style={{
                  width: "40px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "#9E2A2B",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.weight}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Scoring */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "60px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111111",
              marginBottom: "16px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Custom Scoring
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#666666",
              lineHeight: 1.7,
              marginBottom: "32px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Weight dimensions based on your specific use case. Whether you
            prioritize SEO metrics, traffic potential, or buyer intent, adjust
            the scoring to match your portfolio strategy.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[
              { title: "Investor Mode", desc: "Maximize ROI with traffic and value focus" },
              { title: "Developer Mode", desc: "Prioritize technical metrics and authority" },
              { title: "Brand Mode", desc: "Emphasize trademark safety and memorability" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#FAF7F2",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "6px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
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
          Ready to Scale Your Domain Research?
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "32px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Process up to 5,000 domains per batch with Enterprise access.
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
            Start Enterprise Trial
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
            Try Single Domain Lookup
          </Link>
        </div>
      </section>
    </div>
  );
}
