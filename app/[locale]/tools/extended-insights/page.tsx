"use client";

import { useState } from "react";
import Link from "next/link";
import PremiumGateModal from "@/components/layout/PremiumGateModal";

export default function ExtendedInsightsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2" }}>
      <PremiumGateModal toolName="Extended Insights" />

      {/* Split Hero */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          minHeight: "500px",
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
            Extended Insights
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
            Deep historical data, DNS records, USPTO/WIPO trademark checks, and
            WHOIS/RDAP logs for comprehensive domain research.
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
            Get Extended Insights
          </Link>
        </div>

        {/* Right - Pricing Table */}
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
            Reveal Pricing
          </h2>
          {[
            { tier: "Basic", price: "$5", desc: "Standard domain value" },
            { tier: "Standard", price: "$10", desc: "Moderate domain value" },
            { tier: "Premium", price: "$25", desc: "High-value domain" },
            { tier: "Enterprise", price: "$50", desc: "Ultra-premium domain" },
          ].map((item) => (
            <div
              key={item.tier}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div>
                <span
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "15px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item.tier}
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
              <span
                style={{
                  color: "#F4A261",
                  fontWeight: 700,
                  fontSize: "18px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.price}
              </span>
            </div>
          ))}
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "12px",
              marginTop: "20px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Pricing based on domain value and complexity
          </p>
        </div>
      </section>

      {/* 6 Report Sections - Numbered Flow */}
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
          What&apos;s Included in Your Report
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[
            {
              num: "1",
              title: "Historical Data",
              desc: "Wayback Machine snapshots and historical content changes over time.",
            },
            {
              num: "2",
              title: "DNS Records",
              desc: "Complete DNS record enumeration including A, MX, NS, TXT, and CNAME.",
            },
            {
              num: "3",
              title: "WHOIS / RDAP",
              desc: "Registration data, domain age, registrar history, and nameserver changes.",
            },
            {
              num: "4",
              title: "Trademark Checks",
              desc: "USPTO and WIPO trademark database conflict detection.",
            },
            {
              num: "5",
              title: "SSL Certificate",
              desc: "Certificate authority, expiry dates, and chain verification.",
            },
            {
              num: "6",
              title: "Server Intelligence",
              desc: "Hosting provider, IP geolocation, and technology stack detection.",
            },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                display: "flex",
                gap: "24px",
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "28px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#9E2A2B",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "20px",
                  flexShrink: 0,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {item.num}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "18px",
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
                    fontSize: "15px",
                    color: "#666666",
                    lineHeight: 1.6,
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

      {/* When to Use */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "60px 24px" }}>
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
            When to Use Extended Insights
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {[
              {
                title: "Domain Acquisition",
                desc: "Research domain history before making an offer.",
              },
              {
                title: "Trademark Clearance",
                desc: "Check for conflicts before launching a brand.",
              },
              {
                title: "Competitor Analysis",
                desc: "Understand competitor domain strategies and history.",
              },
              {
                title: "Portfolio Due Diligence",
                desc: "Audit your portfolio for hidden risks and opportunities.",
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

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #F4A261 0%, #E8944D 100%)",
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "16px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Unlock Domain Intelligence
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#111111",
            marginBottom: "32px",
            opacity: 0.8,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Get the complete picture with Extended Insights reports.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/signup"
            style={{
              backgroundColor: "#9E2A2B",
              color: "#FFFFFF",
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
              backgroundColor: "#FFFFFF",
              color: "#111111",
              padding: "14px 32px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Try Domain Lookup First
          </Link>
        </div>
      </section>
    </div>
  );
}
