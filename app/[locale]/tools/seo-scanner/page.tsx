"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PremiumGateModal from "@/components/layout/PremiumGateModal";

export default function SeoScannerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2" }}>
      <PremiumGateModal toolName="SEO Scanner" />

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
            FREE TOOL
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
            SEO Scanner
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
            Free domain and SEO audit with DA, spam score, backlink profiles,
            and indexation status. Get instant insights into any domain&apos;s
            search engine health.
          </p>

          {/* Search Form */}
          <form onSubmit={handleScan} style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter domain to scan"
              style={{
                flex: 1,
                padding: "14px 18px",
                fontSize: "15px",
                borderRadius: "8px",
                border: "2px solid #E0E0E0",
                outline: "none",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <button
              type="submit"
              disabled={isScanning}
              style={{
                backgroundColor: "#9E2A2B",
                color: "#FFFFFF",
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: 700,
                borderRadius: "8px",
                border: "none",
                cursor: isScanning ? "not-allowed" : "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {isScanning ? "Scanning..." : "Scan Now"}
            </button>
          </form>
        </div>

        {/* Right - Scan Limits */}
        <div
          style={{
            background: "linear-gradient(135deg, #9E2A2B 0%, #7A1F1F 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 48px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "32px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Daily Scan Limits
          </h2>
          {[
            { plan: "Free", scans: "3 unsigned / 12 signed", color: "#F4A261" },
            { plan: "Startup", scans: "30 per day", price: "$79/mo", color: "#F4A261" },
            { plan: "Enterprise", scans: "Unlimited", price: "$129/mo", color: "#F4A261" },
          ].map((item) => (
            <div
              key={item.plan}
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "16px 20px",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "15px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item.plan}
                </span>
                <span
                  style={{
                    color: item.color,
                    fontWeight: 700,
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item.price || "Free"}
                </span>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                  marginTop: "4px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.scans}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Flow */}
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {[
            {
              step: "01",
              title: "Enter Domain",
              desc: "Type any domain name into the search bar above.",
            },
            {
              step: "02",
              title: "Run Analysis",
              desc: "Our engine scans 16 dimensions of domain health instantly.",
            },
            {
              step: "03",
              title: "Get Report",
              desc: "View detailed SEO metrics, backlink data, and spam scores.",
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#9E2A2B",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "18px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.step}
              </div>
              <h3
                style={{
                  fontSize: "18px",
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
      </section>

      {/* 6 Scan Result Sections */}
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
            What You Get
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {[
              {
                icon: "📊",
                title: "Domain Authority & Page Authority",
                desc: "DA and PA metrics with historical trends showing domain strength over time.",
              },
              {
                icon: "🔗",
                title: "Backlink Profile",
                desc: "Complete backlink analysis with referring domains and anchor text distribution.",
              },
              {
                icon: "⚠️",
                title: "Spam Score",
                desc: "Machine learning spam detection with penalty risk assessment and recommendations.",
              },
              {
                icon: "🔍",
                title: "Indexation Status",
                desc: "Search engine indexation checks across Google, Bing, and Yandex.",
              },
              {
                icon: "⚡",
                title: "Technical SEO",
                desc: "Core Web Vitals, mobile-friendliness, and structured data analysis.",
              },
              {
                icon: "📈",
                title: "Competitor Analysis",
                desc: "Compare domain metrics against top competitors in your niche.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#FAF7F2",
                  borderRadius: "12px",
                  padding: "28px",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{item.icon}</div>
                <h3
                  style={{
                    fontSize: "17px",
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

      {/* Limitations */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            padding: "40px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#111111",
              marginBottom: "20px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Free Tool Limitations
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "Limited to 3 unsigned scans and 12 signed scans per day",
              "Basic metrics only — no historical data or trend analysis",
              "No bulk scanning or API access",
              "Results may be cached and not real-time",
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #F0F0F0",
                  color: "#666666",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <span style={{ color: "#9E2A2B", fontWeight: 700 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/tools/extended-insights"
            style={{
              display: "inline-block",
              marginTop: "24px",
              color: "#9E2A2B",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Unlock full features with Extended Insights →
          </Link>
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
          Ready for Deeper Analysis?
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "32px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Upgrade to access historical data, bulk scanning, and API integrations.
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
            Create Free Account
          </Link>
          <Link
            href="/tools/extended-insights"
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
            View Extended Insights
          </Link>
        </div>
      </section>
    </div>
  );
}
