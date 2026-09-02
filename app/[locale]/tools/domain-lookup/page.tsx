"use client";

import { useState } from "react";
import Link from "next/link";

interface WhoisData {
  domain: string;
  registrar: string;
  registrationDate: string;
  expirationDate: string;
  updatedDate: string;
  nameservers: string[];
  status: string[];
  registrantOrg: string;
  registrantCountry: string;
}

interface DnsRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

export default function DomainLookupPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [whoisData, setWhoisData] = useState<WhoisData | null>(null);
  const [dnsRecords, setDnsRecords] = useState<DnsRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showExtendedModal, setShowExtendedModal] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    // Simulated data - in production this would call the API
    setTimeout(() => {
      setWhoisData({
        domain: searchQuery,
        registrar: "GoDaddy.com, LLC",
        registrationDate: "2015-03-22",
        expirationDate: "2025-03-22",
        updatedDate: "2024-01-15",
        nameservers: ["ns1.example.com", "ns2.example.com"],
        status: ["clientTransferProhibited", "clientUpdateProhibited"],
        registrantOrg: "Example Corp",
        registrantCountry: "US",
      });
      setDnsRecords([
        { type: "A", name: "@", value: "192.0.2.1", ttl: 3600 },
        { type: "A", name: "www", value: "192.0.2.1", ttl: 3600 },
        { type: "MX", name: "@", value: "mail.example.com", ttl: 3600 },
        { type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: 3600 },
        { type: "CNAME", name: "blog", value: "example.com", ttl: 3600 },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #9E2A2B 0%, #7A1F1F 100%)",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
            FREE TOOL
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
            Domain Lookup
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.85)",
              marginBottom: "40px",
              lineHeight: 1.6,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Instant WHOIS data, DNS records, and registration details for any
            domain. Get the intelligence you need in seconds.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              gap: "12px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter domain name (e.g., example.com)"
              style={{
                flex: 1,
                padding: "16px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "2px solid transparent",
                outline: "none",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: "#F4A261",
                color: "#111111",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: 700,
                borderRadius: "8px",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {isLoading ? "Searching..." : "Lookup"}
            </button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 24px" }}>
        {isLoading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "4px solid #E0E0E0",
                borderTopColor: "#9E2A2B",
                borderRadius: "50%",
                margin: "0 auto 16px",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ color: "#666666", fontFamily: "Inter, sans-serif" }}>
              Fetching domain data...
            </p>
          </div>
        )}

        {whoisData && !isLoading && (
          <>
            {/* WHOIS Table */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "32px",
                marginBottom: "32px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "24px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                WHOIS Information
              </h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <tbody>
                  {[
                    ["Domain", whoisData.domain],
                    ["Registrar", whoisData.registrar],
                    ["Registration Date", whoisData.registrationDate],
                    ["Expiration Date", whoisData.expirationDate],
                    ["Last Updated", whoisData.updatedDate],
                    ["Nameservers", whoisData.nameservers.join(", ")],
                    ["Status", whoisData.status.join(", ")],
                    ["Registrant Org", whoisData.registrantOrg],
                    ["Country", whoisData.registrantCountry],
                  ].map(([label, value], i) => (
                    <tr
                      key={label}
                      style={{
                        borderBottom: "1px solid #F0F0F0",
                      }}
                    >
                      <td
                        style={{
                          padding: "14px 0",
                          fontWeight: 600,
                          color: "#111111",
                          width: "180px",
                          verticalAlign: "top",
                        }}
                      >
                        {label}
                      </td>
                      <td style={{ padding: "14px 0", color: "#666666" }}>
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DNS Records Table */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "32px",
                marginBottom: "32px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "24px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                DNS Records
              </h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid #E0E0E0" }}>
                    {["Type", "Name", "Value", "TTL"].map((header) => (
                      <th
                        key={header}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "#111111",
                          fontSize: "13px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dnsRecords.map((record, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid #F0F0F0",
                        backgroundColor: i % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
                      }}
                    >
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#9E2A2B" }}>
                        {record.type}
                      </td>
                      <td style={{ padding: "12px 16px", color: "#111111" }}>
                        {record.name}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          color: "#666666",
                          fontFamily: "monospace",
                          fontSize: "14px",
                        }}
                      >
                        {record.value}
                      </td>
                      <td style={{ padding: "12px 16px", color: "#999999" }}>
                        {record.ttl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Extended Insights CTA */}
            <div
              style={{
                background: "linear-gradient(135deg, #F4A261 0%, #E8944D 100%)",
                borderRadius: "12px",
                padding: "40px",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "12px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Need More Details?
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#111111",
                  marginBottom: "24px",
                  opacity: 0.8,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Get historical data, trademark checks, and comprehensive domain
                intelligence with Extended Insights.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  href="/signup"
                  style={{
                    backgroundColor: "#9E2A2B",
                    color: "#FFFFFF",
                    padding: "14px 28px",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Signup Free
                </Link>
                <Link
                  href="/tools/seo-scanner"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#111111",
                    padding: "14px 28px",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Run SEO Scan
                </Link>
              </div>
            </div>
          </>
        )}

        {!whoisData && !isLoading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#FFFFFF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9E2A2B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "8px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Enter a Domain to Get Started
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#666666",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Search any domain to view WHOIS data, DNS records, and registration
              details.
            </p>
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
