"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight } from "lucide-react";

function LegalSection({ number, title, summary, id, children, onVisible }: {
  number: string;
  title: string;
  summary: string;
  id: string;
  children: React.ReactNode;
  onVisible: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(id); },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [id, onVisible]);

  return (
    <div ref={ref} id={id} className="scroll-mt-24" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ width: "100%", textAlign: "left", padding: "24px 0", display: "flex", alignItems: "flex-start", gap: 16, background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontSize: 12, fontFamily: "monospace", marginTop: 2, flexShrink: 0, width: 24, textAlign: "center", color: "#999999" }}>{number}</span>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#111111", transition: "color 0.15s" }}>{title}</h2>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#666666", margin: 0 }}>{summary}</p>
        </div>
        <ChevronRight
          size={16}
          style={{ marginTop: 4, flexShrink: 0, color: "#999999", transition: "transform 0.2s", transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>
      <div style={{
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        maxHeight: expanded ? "2000px" : "0px",
        opacity: expanded ? 1 : 0,
      }}>
        <div style={{ paddingLeft: 40, paddingBottom: 24, fontSize: 14, lineHeight: 1.75, color: "#444444" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const toc = [
  { id: "defined-terms", label: "Defined Terms" },
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "accounts", label: "Accounts & Security" },
  { id: "subscriptions", label: "Subscription Terms" },
  { id: "valuations", label: "Domain Valuations" },
  { id: "marketplace", label: "Marketplace Terms" },
  { id: "commissions", label: "Commissions & Fees" },
  { id: "ip", label: "Intellectual Property" },
  { id: "liability", label: "Disclaimers & Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "disputes", label: "Dispute Resolution" },
  { id: "misc", label: "Miscellaneous" },
  { id: "contact-section", label: "Contact" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("defined-terms");

  const handleVisible = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 32px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, color: "#999999", marginBottom: 8 }}>
            Effective Date: August 1, 2026 &nbsp;|&nbsp; Last Updated: August 1, 2026
          </p>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "#111111", marginBottom: 12 }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 14, color: "#666666", maxWidth: 640, lineHeight: 1.6 }}>
            These Terms of Service (&quot;Agreement&quot;) govern your access to and use of the Ceche domain intelligence platform, marketplace, and related services (collectively, the &quot;Service&quot;).
          </p>
          <p style={{ fontSize: 13, color: "#9E2A2B", marginTop: 8, fontWeight: 600 }}>
            We reserve the right to modify these terms at any time without prior notification. Continued use constitutes acceptance.
          </p>
        </div>

        {/* Mobile TOC — sticky below header */}
        <div className="lg:hidden" style={{ position: "sticky", top: 64, zIndex: 40, backgroundColor: "#FAF7F2", margin: "0 -24px", padding: "12px 24px", borderBottom: "1px solid rgba(0,0,0,0.08)", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 8, minWidth: "max-content" }}>
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  fontSize: 12, padding: "6px 12px", borderRadius: 999, whiteSpace: "nowrap",
                  transition: "all 0.15s", border: "none", cursor: "pointer",
                  color: activeSection === item.id ? "#111111" : "#999999",
                  backgroundColor: activeSection === item.id ? "#E5DFD3" : "transparent",
                  outline: activeSection === item.id ? `1px solid #111111` : "none",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, paddingTop: 32 }}>
          {/* Desktop Sidebar TOC */}
          <nav className="hidden lg:block" style={{ width: 224, flexShrink: 0, position: "sticky", top: 96, alignSelf: "flex-start" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, color: "#999999" }}>Contents</p>
            <div>
              {toc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    width: "100%", textAlign: "left", fontSize: 13, padding: "6px 8px", borderRadius: 6,
                    transition: "all 0.15s", border: "none", cursor: "pointer", marginBottom: 2,
                    color: activeSection === item.id ? "#111111" : "#999999",
                    backgroundColor: activeSection === item.id ? "#E5DFD3" : "transparent",
                    fontWeight: activeSection === item.id ? 600 : 400,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <LegalSection number="1" title="Defined Terms" summary="Key definitions used throughout this Agreement." id="defined-terms" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>&quot;Agreement&quot;</strong> means these Terms of Service, together with the Privacy Policy, Cookie Policy, and any amendments incorporated herein by reference.</li>
                <li><strong>&quot;Ceche,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;</strong> means Ceche, Inc., a Delaware corporation, and its subsidiaries, affiliates, officers, directors, employees, agents, and successors.</li>
                <li><strong>&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;</strong> means any individual or entity that accesses or uses the Service, whether or not registered for an account.</li>
                <li><strong>&quot;Service&quot;</strong> means the Ceche domain intelligence platform, including the website at ceche.net, all web-based tools (SEO Scanner, Extended Insights, Bulk Analyzer, Trademark Monitor, Domain Database, and marketplace), the API, and all related documentation, data, and content.</li>
                <li><strong>&quot;Account&quot;</strong> means a registered user account on the Service, identified by a unique username and password.</li>
                <li><strong>&quot;Subscription&quot;</strong> means a paid plan providing access to premium features, including Premium Startup and Premium Enterprise tiers.</li>
                <li><strong>&quot;Subscription Fee&quot;</strong> means the recurring payment charged for a Subscription, as set forth on the pricing page at ceche.net/pricing.</li>
                <li><strong>&quot;Content&quot;</strong> means all data, text, valuations, reports, analyses, market data, tool outputs, and other information generated by or displayed on the Service.</li>
                <li><strong>&quot;User Content&quot;</strong> means all data, text, files, domain lists, and other materials submitted by a User to the Service.</li>
                <li><strong>&quot;Domain Valuation&quot;</strong> means an estimated market value generated by the Ceche 16-Dimension Valuation Framework or any other valuation tool on the Service.</li>
                <li><strong>&quot;Marketplace&quot;</strong> means the Ceche domain marketplace where Users may list, buy, and sell domain names.</li>
                <li><strong>&quot;Transaction&quot;</strong> means any purchase, sale, or transfer of a domain name facilitated through the Marketplace.</li>
                <li><strong>&quot;Commission&quot;</strong> means the fee charged by Ceche on completed Transactions, as set forth in Section 7.</li>
                <li><strong>&quot;API&quot;</strong> means the Ceche Application Programming Interface providing programmatic access to Service data and functionality.</li>
                <li><strong>&quot;Intellectual Property&quot;</strong> means all patents, copyrights, trademarks, trade secrets, know-how, and other proprietary rights.</li>
              </ol>
            </LegalSection>

            <LegalSection number="2" title="Acceptance of Terms" summary="By using Ceche, you agree to these terms. You must be 18 or older." id="acceptance" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Binding Agreement.</strong> By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Agreement. If you do not agree, you must not access or use the Service.</li>
                <li><strong>Authority.</strong> If you use the Service on behalf of an entity, you represent that you have the authority to bind that entity to this Agreement.</li>
                <li><strong>Age Requirement.</strong> You must be at least 18 years of age to use the Service.</li>
                <li><strong>Modifications.</strong> We reserve the right to modify this Agreement at any time without prior notification. Continued use of the Service after any modification constitutes acceptance of the modified terms.</li>
              </ol>
            </LegalSection>

            <LegalSection number="3" title="Account Registration & Security" summary="You are responsible for your account credentials and all activity under your account." id="accounts" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Registration.</strong> To access certain features, you must create an Account. You agree to provide accurate, current, and complete information during registration.</li>
                <li><strong>Account Security.</strong> You are responsible for maintaining the confidentiality of your Account credentials and for all activities that occur under your Account. You must immediately notify Ceche of any unauthorized use.</li>
                <li><strong>Account Sharing.</strong> Your Account is personal and may not be shared without Ceche&apos;s prior written consent. Premium Enterprise Accounts may permit multiple users under a single Subscription.</li>
                <li><strong>Account Termination.</strong> We reserve the right to suspend or terminate your Account at any time, with or without notice, for conduct that violates this Agreement or is harmful to other Users or Ceche.</li>
              </ol>
            </LegalSection>

            <LegalSection number="4" title="Subscription Terms" summary="Monthly billing, automatic renewal, and our no-refund policy for digital goods." id="subscriptions" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Subscription Plans.</strong> Ceche offers Free, Premium Startup ($79/mo), and Premium Enterprise ($129/mo) tiers. Features and limits are described on the pricing page.</li>
                <li><strong>Billing.</strong> Subscription Fees are billed monthly in advance. All Fees are in USD and are non-refundable.</li>
                <li><strong>Automatic Renewal.</strong> Subscriptions renew automatically at the end of each billing period unless cancelled. Cancel through Account Settings. Cancellation takes effect at the end of the current billing period.</li>
                <li><strong>Refund Policy.</strong> Subscription Fees are non-refundable. If you cancel, you will not receive a prorated refund for the unused portion. If Ceche terminates without cause, we will provide a prorated refund.</li>
                <li><strong>Price Changes.</strong> We reserve the right to change Subscription Fees at any time. Continued use after a price change constitutes acceptance of the new pricing.</li>
                <li><strong>Taxes.</strong> Fees are exclusive of all taxes. You are responsible for paying applicable taxes.</li>
              </ol>
            </LegalSection>

            <LegalSection number="5" title="Domain Valuations" summary="Our valuations are estimates, not guarantees. They should not be relied upon as the sole basis for investment decisions." id="valuations" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Nature of Valuations.</strong> Domain Valuations are estimates based on the 16-Dimension Valuation Framework. They are not appraisals in the legal or financial sense.</li>
                <li><strong>No Guarantee of Accuracy.</strong> Valuations are inherently approximate. Individual valuations may deviate from actual market prices.</li>
                <li><strong>Not Professional Advice.</strong> Valuations are for informational purposes only and do not constitute financial, legal, or investment advice.</li>
                <li><strong>Market Conditions.</strong> Valuations reflect conditions at the time of generation. Do not rely on valuations older than 30 days without re-running.</li>
              </ol>
            </LegalSection>

            <LegalSection number="6" title="Marketplace Terms" summary="Rules for listing, buying, and selling domains through the Ceche Marketplace." id="marketplace" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Marketplace Access.</strong> Available to registered Users. Listing requires a registered Account. Purchasing requires a registered Account and valid payment method.</li>
                <li><strong>Listing Fees.</strong> Standard: $5 per listing. Priority: $10 per listing (includes 72-hour visibility boost). Fees are non-refundable once published.</li>
                <li><strong>Seller Representations.</strong> By listing, you warrant that you own the domain, it is not subject to undisclosed legal proceedings, listing information is accurate, and the domain is available for transfer.</li>
                <li><strong>Buyer Obligations.</strong> Complete the Transaction within the specified timeframe, pay the full price plus Commission, and cooperate with the transfer process.</li>
                <li><strong>Domain Transfers.</strong> Conducted through ICANN-approved procedures. Ceche facilitates but is not a party to the transfer.</li>
                <li><strong>Reveal Fees.</strong> Standard Marketplace listings show full stats with the name hidden. Buyers pay a Reveal Fee ($5–$50 based on value tier) to see the domain name.</li>
              </ol>
            </LegalSection>

            <LegalSection number="7" title="Commissions & Fees" summary="Ceche charges 8–15% commission on completed Marketplace transactions with minimum fee thresholds." id="commissions" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Commission Structure.</strong>
                  <br />Under $500: 15% (minimum $10)
                  <br />$501 – $5,000: 12% (minimum $50)
                  <br />$5,001 – $50,000: 10% (minimum $500)
                  <br />$50,001+: 8% (minimum $4,000)
                </li>
                <li><strong>Commission Calculation.</strong> Calculated on total transaction value including purchase price and additional fees. Deducted from seller proceeds before disbursement.</li>
                <li><strong>Payment Processing.</strong> Third-party payment processor terms apply. Ceche is not responsible for processing errors.</li>
                <li><strong>Disbursement.</strong> Seller proceeds, net of Commission, disbursed within 5 business days of confirmed transfer via ACH.</li>
                <li><strong>Chargebacks.</strong> Ceche may withhold proceeds pending dispute resolution. If resolved for buyer, Ceche may recover disbursed amounts from seller.</li>
              </ol>
            </LegalSection>

            <LegalSection number="8" title="Intellectual Property" summary="Ceche owns the platform. You own your content. API usage has restrictions." id="ip" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Ceche IP.</strong> The Service, including all Content, software, tools, methodologies, trademarks, and trade names, is exclusive property of Ceche. You may not copy, modify, distribute, sell, or lease any part without written consent.</li>
                <li><strong>License to Use.</strong> Subject to compliance, Ceche grants a limited, non-exclusive, non-transferable, revocable license for internal business use. This does not include: sublicensing, reselling, reverse engineering, or developing competing products.</li>
                <li><strong>User Content.</strong> You retain all rights. By submitting, you grant Ceche a non-exclusive, worldwide, royalty-free license to use, store, process, and display solely for providing the Service.</li>
                <li><strong>API Usage.</strong> Responses may not be cached/stored beyond 24 hours, used to build competing products, or shared without consent. Usage must comply with documented rate limits.</li>
              </ol>
            </LegalSection>

            <LegalSection number="9" title="Disclaimers & Limitation of Liability" summary="The Service is provided as-is. Our liability is limited to what you paid us." id="liability" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Disclaimer of Warranties.</strong> THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND. Ceche DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</li>
                <li><strong>No Warranty of Accuracy.</strong> Domain Valuations, market data, and other content are for informational purposes only and should not be relied upon as the sole basis for investment decisions.</li>
                <li><strong>Limitation of Liability.</strong> Ceche&apos;S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</li>
                <li><strong>Exclusion of Damages.</strong> Ceche SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES.</li>
                <li><strong>Third-Party Services.</strong> Ceche IS NOT RESPONSIBLE FOR THE AVAILABILITY, ACCURACY, OR PRACTICES OF THIRD-PARTY SERVICES.</li>
              </ol>
            </LegalSection>

            <LegalSection number="10" title="Indemnification" summary="You agree to indemnify Ceche against claims arising from your use of the Service." id="indemnification" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li>You agree to indemnify, defend, and hold harmless Ceche from claims arising out of: (a) your use of the Service; (b) your violation of this Agreement; (c) your violation of third-party rights; or (d) any Transaction in which you participate.</li>
              </ol>
            </LegalSection>

            <LegalSection number="11" title="Dispute Resolution" summary="Delaware law governs. Disputes resolved by binding arbitration. Class actions waived." id="disputes" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Governing Law.</strong> Delaware law, without conflict of laws principles.</li>
                <li><strong>Arbitration.</strong> Disputes resolved by binding arbitration under AAA Commercial Rules in Wilmington, Delaware, before a single arbitrator.</li>
                <li><strong>Class Action Waiver.</strong> Disputes conducted on an individual basis only. No class actions or class-wide arbitration.</li>
                <li><strong>Injunctive Relief.</strong> Either party may seek injunctive relief for IP infringement.</li>
                <li><strong>Limitation Period.</strong> Claims must be filed within one (1) year of accrual.</li>
              </ol>
            </LegalSection>

            <LegalSection number="12" title="Miscellaneous" summary="Standard legal provisions: entire agreement, severability, waiver, assignment, force majeure." id="misc" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Entire Agreement.</strong> This Agreement, with the Privacy Policy and Cookie Policy, constitutes the entire agreement.</li>
                <li><strong>Severability.</strong> Unenforceable provisions are limited to the minimum extent necessary; remaining provisions remain in effect.</li>
                <li><strong>Waiver.</strong> No waiver of any provision constitutes a continuing waiver.</li>
                <li><strong>Assignment.</strong> You may not assign without written consent. Ceche may assign without restriction.</li>
                <li><strong>Force Majeure.</strong> Ceche is not liable for failures beyond reasonable control.</li>
                <li><strong>Notices.</strong> Email to Account address or certified mail. Deemed received upon transmission or receipt.</li>
                <li><strong>Survival.</strong> Sections 5, 7, 8, 9, 10, and 11 survive termination.</li>
              </ol>
            </LegalSection>

            <div id="contact-section" style={{ paddingTop: 32, paddingBottom: 48 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#111111" }}>Contact</h2>
              <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 8, color: "#666666" }}>
                For questions about these Terms, contact us at <strong>legal@ceche.net</strong> or through the <a href="/help/contact" style={{ color: "#111111", textDecoration: "underline" }}>Contact page</a>.
              </p>
              <p style={{ fontSize: 14, color: "#666666" }}>
                See our <a href="/legal/privacy" style={{ color: "#111111", textDecoration: "underline" }}>Privacy Policy</a> and <a href="/legal/cookies" style={{ color: "#111111", textDecoration: "underline" }}>Cookie Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
