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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
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
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-16 md:py-20 px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/15 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-5">
            FREE TOOL
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Domain Lookup
          </h1>
          <p className="text-base md:text-lg text-white/85 mb-8 md:mb-10 leading-relaxed">
            Instant WHOIS data, DNS records, and registration details for any
            domain. Get the intelligence you need in seconds.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              className="flex-1 px-5 py-4 text-base rounded-lg border-2 border-transparent outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 text-base font-bold rounded-lg border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 bg-[#F4A261] text-[#111] whitespace-nowrap"
            >
              {isLoading ? "Searching..." : "Lookup"}
            </button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {isLoading && (
          <div className="text-center py-12 md:py-16">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#9E2A2B] rounded-full mx-auto mb-4 animate-spin" />
            <p className="text-[#666]">Fetching domain data...</p>
          </div>
        )}

        {whoisData && !isLoading && (
          <>
            {/* WHOIS Table */}
            <div className="bg-white rounded-xl p-5 md:p-8 mb-6 md:mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">
                WHOIS Information
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[400px]">
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
                    ].map(([label, value]) => (
                      <tr key={label} className="border-b border-gray-100">
                        <td className="py-3.5 pr-4 font-semibold text-[#111] whitespace-nowrap align-top text-sm">
                          {label}
                        </td>
                        <td className="py-3.5 text-[#666] text-sm">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DNS Records Table */}
            <div className="bg-white rounded-xl p-5 md:p-8 mb-6 md:mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">
                DNS Records
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      {["Type", "Name", "Value", "TTL"].map((header) => (
                        <th
                          key={header}
                          className="py-3 px-4 text-left font-bold text-[#111] text-xs uppercase tracking-wider"
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
                        className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                      >
                        <td className="py-3 px-4 font-semibold text-[#9E2A2B] text-sm">{record.type}</td>
                        <td className="py-3 px-4 text-[#111] text-sm">{record.name}</td>
                        <td className="py-3 px-4 text-[#666] font-mono text-sm break-all">{record.value}</td>
                        <td className="py-3 px-4 text-[#999] text-sm">{record.ttl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Extended Insights CTA */}
            <div className="bg-gradient-to-br from-[#F4A261] to-[#E8944D] rounded-xl p-8 md:p-10 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-[#111] mb-3">
                Need More Details?
              </h3>
              <p className="text-base text-[#111]/80 mb-6">
                Get historical data, trademark checks, and comprehensive domain
                intelligence with Extended Insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/signup"
                  className="bg-[#9E2A2B] text-white px-7 py-3.5 rounded-lg text-sm font-semibold no-underline text-center"
                >
                  Signup Free
                </Link>
                <Link
                  href="/tools/seo-scanner"
                  className="bg-white text-[#111] px-7 py-3.5 rounded-lg text-sm font-semibold no-underline text-center"
                >
                  Run SEO Scan
                </Link>
              </div>
            </div>
          </>
        )}

        {!whoisData && !isLoading && (
          <div className="text-center py-16 md:py-20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9E2A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#111] mb-2">
              Enter a Domain to Get Started
            </h3>
            <p className="text-base text-[#666]">
              Search any domain to view WHOIS data, DNS records, and registration details.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
