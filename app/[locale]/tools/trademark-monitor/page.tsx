"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrademarkMonitorPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2" }}>
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
            PREMIUM
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
            Trademark Monitor
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
            USPTO/WIPO conflict detection and alerts. Protect your brand with
            proactive trademark monitoring across global databases.
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
            Start Monitoring
          </Link>
        </div>

        {/* Right - Severity Bar */}
        <div
          style={{
            background: "linear-gradient(135deg, #111111 0%, #2A2A2A 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 36px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "28px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Threat Severity Levels
          </h2>
          {[
            { level: "Critical", color: "#E74C3C", desc: "Direct trademark conflict detected" },
            { level: "High", color: "#F4A261", desc: "Similar mark in same industry" },
            { level: "Medium", color: "#F39C12", desc: "Similar name, different class" },
            { level: "Low", color: "#27AE60", desc: "Minor similarity, low risk" },
          ].map((item) => (
            <div
              key={item.level}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              />
              <div>
                <span
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "15px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item.level}
                </span>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "12px",
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
      </section>

      {/* Problem / Solution 2-Column */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {/* Problem */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "36px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              borderTop: "4px solid #E74C3C",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#E74C3C",
                marginBottom: "20px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              The Problem
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                "Trademark infringement lawsuits cost $100K+ on average",
                "New domain registrations happen every minute",
                "Manual monitoring is impossible at scale",
                "By the time you notice, damage is done",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #F0F0F0",
                    color: "#666666",
                    fontSize: "15px",
                    display: "flex",
                    gap: "10px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <span style={{ color: "#E74C3C" }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "36px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              borderTop: "4px solid #27AE60",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#27AE60",
                marginBottom: "20px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Our Solution
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                "Real-time USPTO and WIPO database monitoring",
                "Scan up to 5,000 domains per list",
                "Instant conflict alerts via email and webhook",
                "Risk scoring with confidence levels",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #F0F0F0",
                    color: "#666666",
                    fontSize: "15px",
                    display: "flex",
                    gap: "10px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <span style={{ color: "#27AE60" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4-Step Flow */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "60px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
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
                title: "Add Domains",
                desc: "Upload your brand domains or keywords to monitor.",
              },
              {
                step: "2",
                title: "Set Criteria",
                desc: "Define industry, geographic scope, and sensitivity.",
              },
              {
                step: "3",
                title: "Monitor",
                desc: "We scan USPTO, EUIPO, and WIPO databases continuously.",
              },
              {
                step: "4",
                title: "Get Alerts",
                desc: "Receive instant notifications for potential conflicts.",
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  backgroundColor: "#FAF7F2",
                  borderRadius: "12px",
                  padding: "28px",
                  textAlign: "center",
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
        </div>
      </section>

      {/* Use Cases Accordion */}
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
          Use Cases
        </h2>
        {[
          {
            title: "Brand Protection",
            content:
              "Monitor for cybersquatting, typosquatting, and brand impersonation across all major TLDs.",
          },
          {
            title: "Product Launch",
            content:
              "Clear trademarks before launching new products or entering new markets.",
          },
          {
            title: "M&A Due Diligence",
            content:
              "Audit trademark risks during mergers, acquisitions, or investment rounds.",
          },
          {
            title: "Portfolio Management",
            content:
              "Protect your domain portfolio from trademark challenges and legal disputes.",
          },
        ].map((item, i) => (
          <div
            key={item.title}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              marginBottom: "12px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
              style={{
                width: "100%",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111111",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  fontSize: "20px",
                  color: "#9E2A2B",
                  transform: openAccordion === i ? "rotate(45deg)" : "none",
                  transition: "transform 0.2s",
                }}
              >
                +
              </span>
            </button>
            {openAccordion === i && (
              <div
                style={{
                  padding: "0 24px 20px",
                  color: "#666666",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Pricing Tiers */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "60px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
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
            Pricing
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              {
                plan: "Free",
                price: "$0",
                features: ["3 unsigned scans/day", "12 signed scans/day", "Basic metrics"],
              },
              {
                plan: "Startup",
                price: "$79/mo",
                features: ["30 scans/day", "Priority processing", "CSV export", "Email alerts"],
                popular: true,
              },
              {
                plan: "Enterprise",
                price: "$129/mo",
                features: [
                  "Unlimited scans",
                  "API access (10K calls/day)",
                  "Webhook integration",
                  "Dedicated support",
                ],
              },
            ].map((item) => (
              <div
                key={item.plan}
                style={{
                  backgroundColor: "#FAF7F2",
                  borderRadius: "12px",
                  padding: "32px",
                  textAlign: "center",
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
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "#9E2A2B",
                    marginBottom: "20px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item.price}
                </div>
                <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                  {item.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #E8E8E8",
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
          Protect Your Brand Today
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "32px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Don&apos;t wait until it&apos;s too late. Start monitoring now.
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
            href="/tools/seo-scanner"
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
            Run SEO Scan
          </Link>
        </div>
      </section>
    </div>
  );
}
