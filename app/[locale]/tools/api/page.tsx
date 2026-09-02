"use client";

import { useState } from "react";
import Link from "next/link";

export default function ApiPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2" }}>
      {/* Simple CTA Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #9E2A2B 0%, #7A1F1F 100%)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#FFFFFF",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              marginBottom: "20px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            DEVELOPER
          </span>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: "16px",
              lineHeight: 1.1,
              fontFamily: "Inter, sans-serif",
            }}
          >
            API Access
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.85)",
              marginBottom: "32px",
              lineHeight: 1.6,
              fontFamily: "Inter, sans-serif",
            }}
          >
            RESTful API for programmatic domain intelligence. Build custom
            integrations, automate workflows, and access all domain data
            programmatically.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                backgroundColor: "#F4A261",
                color: "#111111",
                padding: "14px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Get API Key
            </button>
            <Link
              href="/help/api"
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
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* 3 "What You Can Build" Cards */}
      <section style={{ maxWidth: "1000px", margin: "-40px auto 0", padding: "0 24px", position: "relative", zIndex: 1 }}>
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
          What You Can Build
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            {
              icon: "🔗",
              title: "Domain Portfolio Tracker",
              desc: "Automatically monitor your portfolio for value changes, expiration alerts, and SEO shifts.",
              link: "/tools/domain-lookup",
              linkText: "Try Domain Lookup",
            },
            {
              icon: "📊",
              title: "Market Intelligence Dashboard",
              desc: "Build custom dashboards with real-time domain pricing, trends, and competitive analysis.",
              link: "/tools/bulk-analyzer",
              linkText: "Explore Bulk Analyzer",
            },
            {
              icon: "🛡️",
              title: "Brand Protection System",
              desc: "Automate trademark monitoring and get instant alerts for potential brand conflicts.",
              link: "/tools/trademark-monitor",
              linkText: "See Trademark Monitor",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "32px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{item.icon}</div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "10px",
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
                  marginBottom: "20px",
                  flex: 1,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.desc}
              </p>
              <Link
                href={item.link}
                style={{
                  color: "#9E2A2B",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* API Features */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "60px 24px", marginTop: "60px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
            API Features
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {[
              {
                title: "RESTful API",
                desc: "Full access to all domain intelligence endpoints with standard HTTP methods.",
              },
              {
                title: "Webhooks",
                desc: "Real-time notifications for domain changes and events via webhook callbacks.",
              },
              {
                title: "Rate Limits",
                desc: "10,000 calls per day with Enterprise plan and burst capacity for spikes.",
              },
              {
                title: "SDKs",
                desc: "Official libraries for Python, Node.js, Go, and Ruby with full documentation.",
              },
              {
                title: "Sandbox",
                desc: "Test environment for development and integration testing before going live.",
              },
              {
                title: "Documentation",
                desc: "Complete API reference with code examples, tutorials, and best practices.",
              },
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
                    fontSize: "16px",
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
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #111111 0%, #2A2A2A 100%)",
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
          Ready to Build?
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "32px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Get your API key and start integrating domain intelligence today.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: "#F4A261",
              color: "#111111",
              padding: "14px 32px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Create Free Account
          </button>
          <Link
            href="/help/api"
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

      {/* Create Account Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "40px",
              maxWidth: "480px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#9E2A2B",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "12px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Get Your API Key
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#666666",
                marginBottom: "24px",
                lineHeight: 1.6,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Create a free account to get your API key and start building with
              domain intelligence data.
            </p>
            <Link
              href="/signup"
              style={{
                display: "inline-block",
                backgroundColor: "#9E2A2B",
                color: "#FFFFFF",
                padding: "14px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                marginBottom: "16px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Create Free Account
            </Link>
            <div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#999999",
                  fontSize: "14px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
