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
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#111111" }}>{title}</h2>
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
  { id: "controller", label: "Data Controller" },
  { id: "collection", label: "Data We Collect" },
  { id: "usage", label: "How We Use Data" },
  { id: "sharing", label: "How We Share Data" },
  { id: "retention", label: "Data Retention" },
  { id: "security", label: "Data Security" },
  { id: "rights", label: "Your Rights" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Changes" },
  { id: "contact-section", label: "Contact" },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("controller");

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
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: "#666666", maxWidth: 640, lineHeight: 1.6 }}>
            How Ceche collects, uses, and protects your data. We encrypt all domain searches with AES-256-GCM. We never sell your data.
          </p>
          <p style={{ fontSize: 13, color: "#9E2A2B", marginTop: 8, fontWeight: 600 }}>
            We reserve the right to modify this policy at any time without prior notification.
          </p>
        </div>

        {/* Mobile TOC */}
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
            <LegalSection number="1" title="Data Controller" summary="Ceche, Inc. is the Data Controller for all personal data processing." id="controller" onVisible={handleVisible}>
              <p style={{ marginBottom: 12 }}>The Data Controller responsible for processing your Personal Data is:</p>
              <p style={{ fontWeight: 700, marginBottom: 12 }}>Ceche, Inc.</p>
              <p style={{ marginBottom: 12 }}>Email: <strong>privacy@ceche.net</strong></p>
              <p>If you are in the EEA, UK, or Switzerland, you may contact our Data Protection Officer at <strong>dpo@ceche.net</strong>.</p>
            </LegalSection>

            <LegalSection number="2" title="Personal Data We Collect" summary="We collect account information, payment data, usage data, domain queries, and API data." id="collection" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Account Information.</strong> Name, email address, encrypted password, company name (optional), job title (optional).</li>
                <li><strong>Payment Information.</strong> Billing name, address, and tokenized card data. We do not store full credit card numbers.</li>
                <li><strong>Usage Data.</strong> IP address, browser type, OS, device type, referring URL, pages visited, click patterns, domain names queried, tool usage frequency, session duration.</li>
                <li><strong>Domain Query Data.</strong> Domain names queried, results returned, reports generated, export actions taken.</li>
                <li><strong>Communication Data.</strong> Name, email, message content from contact form or support channels.</li>
                <li><strong>API Data.</strong> API key identifier, endpoints called, request parameters, response codes, timestamps.</li>
              </ol>
            </LegalSection>

            <LegalSection number="3" title="How We Use Personal Data" summary="We use your data to provide the Service, manage accounts, process payments, and improve the platform." id="usage" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Service Provision.</strong> Providing, maintaining, and improving the Service, including valuations, reports, and marketplace Transactions.</li>
                <li><strong>Account Management.</strong> Creating and managing Accounts, authenticating identity, communicating about Account status.</li>
                <li><strong>Payment Processing.</strong> Processing Subscription Fees, listing fees, and marketplace Transaction payments.</li>
                <li><strong>Service Improvement.</strong> Analyzing usage patterns, identifying trends, developing new features, and improving accuracy of valuations.</li>
                <li><strong>Communication.</strong> Sending transactional emails, responding to support requests, and providing product updates.</li>
                <li><strong>Legal Compliance.</strong> Complying with applicable laws, regulations, and legal processes.</li>
                <li><strong>Security.</strong> Detecting and preventing fraud, abuse, and security incidents.</li>
              </ol>
            </LegalSection>

            <LegalSection number="4" title="How We Share Personal Data" summary="We do not sell your data. We share only with service providers necessary to operate the platform." id="sharing" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>No Sale of Data.</strong> We do not sell, rent, or trade your Personal Data to third parties for their marketing purposes.</li>
                <li><strong>Service Providers.</strong> We share data with providers who assist in operating the Service: payment processing (Paystack), email delivery (Brevo), cloud infrastructure, and analytics.</li>
                <li><strong>Marketplace Participants.</strong> When a Transaction is completed, the buyer and seller exchange contact information necessary to complete the domain transfer.</li>
                <li><strong>Legal Requirements.</strong> We may disclose data when required by law, subpoena, or court order.</li>
                <li><strong>Business Transfers.</strong> In connection with a merger, acquisition, or sale, user data may be transferred. You will be notified.</li>
              </ol>
            </LegalSection>

            <LegalSection number="5" title="Data Retention" summary="We retain data only as long as necessary to provide the Service and meet legal obligations." id="retention" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Account Data.</strong> Retained until Account deletion, plus 30 days for backup.</li>
                <li><strong>Transaction Records.</strong> Retained for 7 years for financial record-keeping and tax compliance.</li>
                <li><strong>Domain Query Data.</strong> Encrypted and retained for your history. Deleted upon Account closure.</li>
                <li><strong>Support Communications.</strong> Retained for 3 years after last interaction.</li>
                <li><strong>API Logs.</strong> Retained for 12 months for security and debugging.</li>
                <li><strong>Analytics Data.</strong> Aggregated and anonymized after 24 months.</li>
              </ol>
            </LegalSection>

            <LegalSection number="6" title="Data Security" summary="We use AES-256-GCM encryption, bcrypt password hashing, and TLS 1.3 for all data in transit." id="security" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Encryption at Rest.</strong> All domain names and sensitive data are encrypted with AES-256-GCM. A database dump reveals nothing usable.</li>
                <li><strong>Password Hashing.</strong> Passwords are hashed with bcrypt (cost factor 12). We never store plaintext passwords.</li>
                <li><strong>Encryption in Transit.</strong> All platform traffic uses TLS 1.3. API keys are hashed at rest with SHA-256.</li>
                <li><strong>Access Controls.</strong> Role-based access controls limit internal access to user data. Access is logged and audited.</li>
                <li><strong>Incident Response.</strong> In the event of a data breach, we will notify affected users within 72 hours as required by applicable law.</li>
              </ol>
            </LegalSection>

            <LegalSection number="7" title="Your Rights (GDPR/CCPA)" summary="You can access, correct, delete, or export your data. Submit requests via the Contact page." id="rights" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Right of Access.</strong> Request a copy of your Personal Data in a structured, commonly used, machine-readable format.</li>
                <li><strong>Right to Rectification.</strong> Correct inaccurate or incomplete Personal Data.</li>
                <li><strong>Right to Erasure.</strong> Request deletion of your Personal Data, subject to legal retention obligations.</li>
                <li><strong>Right to Portability.</strong> Export your data in a structured format.</li>
                <li><strong>Right to Object.</strong> Object to processing for legitimate interests.</li>
                <li><strong>Right to Restrict Processing.</strong> Request restriction of processing in certain circumstances.</li>
                <li><strong>CCPA Rights.</strong> California residents have the right to know what data is collected, request deletion, and opt out of data sales (we do not sell data).</li>
                <li><strong>Submitting Requests.</strong> Contact us via <a href="/help/contact" style={{ color: "#111111", textDecoration: "underline" }}>Contact page</a> or email <strong>privacy@ceche.net</strong>. We respond within 30 days.</li>
              </ol>
            </LegalSection>

            <LegalSection number="8" title="Children's Privacy" summary="The Service is not directed to children under 18. We do not knowingly collect data from children." id="children" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li>The Service is not directed to individuals under 18 years of age. We do not knowingly collect Personal Data from children.</li>
                <li>If we become aware that we have collected data from a child, we will delete it promptly. Contact us at <strong>privacy@ceche.net</strong>.</li>
              </ol>
            </LegalSection>

            <LegalSection number="9" title="Changes to This Policy" summary="We may update this policy. Material changes will be communicated via email or platform notice." id="changes" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li>We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on the Service.</li>
                <li>The &quot;Last Updated&quot; date indicates when this policy was last revised.</li>
                <li>Continued use of the Service after changes take effect constitutes acceptance of the revised policy.</li>
              </ol>
            </LegalSection>

            <div id="contact-section" style={{ paddingTop: 32, paddingBottom: 48 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#111111" }}>Contact</h2>
              <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 8, color: "#666666" }}>
                For privacy questions, contact us at <strong>privacy@ceche.net</strong> or through the <a href="/help/contact" style={{ color: "#111111", textDecoration: "underline" }}>Contact page</a>.
              </p>
              <p style={{ fontSize: 14, color: "#666666" }}>
                See our <a href="/legal/terms" style={{ color: "#111111", textDecoration: "underline" }}>Terms of Service</a> and <a href="/legal/cookies" style={{ color: "#111111", textDecoration: "underline" }}>Cookie Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
