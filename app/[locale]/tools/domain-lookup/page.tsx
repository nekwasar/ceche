"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface WhoisData { domain: string; registrar: string; registrationDate: string; expirationDate: string; updatedDate: string; nameservers: string[]; status: string[]; registrantOrg: string; registrantCountry: string; }
interface DnsRecord { type: string; name: string; value: string; ttl: number; }

export default function DomainLookupPage() {
  const t = useTranslations("tools.lookup");
  const [searchQuery, setSearchQuery] = useState("");
  const [whoisData, setWhoisData] = useState<WhoisData | null>(null);
  const [dnsRecords, setDnsRecords] = useState<DnsRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setWhoisData({ domain: searchQuery, registrar: "GoDaddy.com, LLC", registrationDate: "2015-03-22", expirationDate: "2025-03-22", updatedDate: "2024-01-15", nameservers: ["ns1.example.com", "ns2.example.com"], status: ["clientTransferProhibited", "clientUpdateProhibited"], registrantOrg: "Example Corp", registrantCountry: "US" });
      setDnsRecords([{ type: "A", name: "@", value: "192.0.2.1", ttl: 3600 }, { type: "A", name: "www", value: "192.0.2.1", ttl: 3600 }, { type: "MX", name: "@", value: "mail.example.com", ttl: 3600 }, { type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: 3600 }, { type: "CNAME", name: "blog", value: "example.com", ttl: 3600 }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-16 md:py-20 px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/15 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-5">{t("badge")}</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">{t("title")}</h1>
          <p className="text-base md:text-lg text-white/85 mb-8 md:mb-10 leading-relaxed">{t("description")}</p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("placeholder")} className="flex-1 px-5 py-4 text-base rounded-lg border-2 border-transparent outline-none" />
            <button type="submit" disabled={isLoading} className="px-8 py-4 text-base font-bold rounded-lg border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 bg-[#F4A261] text-[#111] whitespace-nowrap">
              {isLoading ? t("searchingButton") : t("lookupButton")}
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {isLoading && <div className="text-center py-12 md:py-16"><div className="w-12 h-12 border-4 border-gray-200 border-t-[#9E2A2B] rounded-full mx-auto mb-4 animate-spin" /><p className="text-[#666]">{t("loading")}</p></div>}

        {whoisData && !isLoading && (
          <>
            <div className="bg-white rounded-xl p-5 md:p-8 mb-6 md:mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">{t("whoisTitle")}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[400px]">
                  <tbody>
                    {([whoisData.domain, whoisData.registrar, whoisData.registrationDate, whoisData.expirationDate, whoisData.updatedDate, whoisData.nameservers.join(", "), whoisData.status.join(", "), whoisData.registrantOrg, whoisData.registrantCountry] as string[]).map((value, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3.5 pr-4 font-semibold text-[#111] whitespace-nowrap align-top text-sm">{t(`whoisLabels.${i}`)}</td>
                        <td className="py-3.5 text-[#666] text-sm">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 md:p-8 mb-6 md:mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-5 md:mb-6">{t("dnsTitle")}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[500px]">
                  <thead><tr className="border-b-2 border-gray-200">{[0, 1, 2, 3].map((i) => <th key={i} className="py-3 px-4 text-left font-bold text-[#111] text-xs uppercase tracking-wider">{t(`dnsHeaders.${i}`)}</th>)}</tr></thead>
                  <tbody>{dnsRecords.map((r, i) => <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}><td className="py-3 px-4 font-semibold text-[#9E2A2B] text-sm">{r.type}</td><td className="py-3 px-4 text-[#111] text-sm">{r.name}</td><td className="py-3 px-4 text-[#666] font-mono text-sm break-all">{r.value}</td><td className="py-3 px-4 text-[#999] text-sm">{r.ttl}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F4A261] to-[#E8944D] rounded-xl p-8 md:p-10 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-[#111] mb-3">{t("needMore.title")}</h3>
              <p className="text-base text-[#111]/80 mb-6">{t("needMore.description")}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/signup" className="bg-[#9E2A2B] text-white px-7 py-3.5 rounded-lg text-sm font-semibold no-underline text-center">{t("needMore.signup")}</Link>
                <Link href="/tools/seo-scanner" className="bg-white text-[#111] px-7 py-3.5 rounded-lg text-sm font-semibold no-underline text-center">{t("needMore.seoScan")}</Link>
              </div>
            </div>
          </>
        )}

        {!whoisData && !isLoading && (
          <div className="text-center py-16 md:py-20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9E2A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#111] mb-2">{t("empty.title")}</h3>
            <p className="text-base text-[#666]">{t("empty.description")}</p>
          </div>
        )}
      </section>
    </div>
  );
}
