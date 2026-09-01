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
    <div ref={ref} id={id} className="scroll-mt-24 border-b border-black/10">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left py-6 flex items-start gap-4 group"
      >
        <span className="text-xs font-mono mt-1 flex-shrink-0 w-6 text-center" style={{ color: "#999999" }}>{number}</span>
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2 group-hover:text-[#9E2A2B] transition-colors" style={{ color: "#111111" }}>{title}</h2>
          <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>{summary}</p>
        </div>
        <ChevronRight
          className="w-4 h-4 mt-1 flex-shrink-0 transition-transform duration-200"
          style={{ color: "#999999", transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: expanded ? "2000px" : "0px", opacity: expanded ? 1 : 0 }}
      >
        <div className="pl-10 pb-6 text-sm leading-relaxed" style={{ color: "#444444" }}>
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
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-sm mb-2" style={{ color: "#999999" }}>
            Effective Date: August 1, 2026 &nbsp;|&nbsp; Last Updated: August 1, 2026
          </p>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "#111111" }}>
            Privacy Policy
          </h1>
          <p className="text-sm mt-3 max-w-2xl" style={{ color: "#666666" }}>
            How Ceche collects, uses, and protects your data. We encrypt all domain searches with AES-256-GCM. We never sell your data.
          </p>
        </div>

        {/* Mobile TOC */}
        <div className="lg:hidden sticky top-16 z-40 bg-[#FAF7F2] -mx-4 px-4 py-3 border-b border-black/10 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
                style={{
                  color: activeSection === item.id ? "#111111" : "#999999",
                  backgroundColor: activeSection === item.id ? "#E5DFD3" : "transparent",
                  border: `1px solid ${activeSection === item.id ? "#111111" : "transparent"}`,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-10 pt-8 lg:pt-0">
          <nav className="hidden lg:block w-56 flex-shrink-0 sticky top-24 self-start">
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#999999" }}>Contents</p>
            <div className="space-y-0.5">
              {toc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left text-sm py-1.5 px-2 rounded transition-all duration-150"
                  style={{
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

          <div className="flex-1 min-w-0">
            <LegalSection number="1" title="Data Controller" summary="Ceche, Inc. is the Data Controller for all personal data processing." id="controller" onVisible={handleVisible}>
              <p className="mb-3">The Data Controller responsible for processing your Personal Data is:</p>
              <p className="font-bold mb-3">Ceche, Inc.</p>
              <p className="mb-3">Email: <strong>privacy@ceche.net</strong></p>
              <p>If you are in the EEA, UK, or Switzerland, you may contact our Data Protection Officer at <strong>dpo@ceche.net</strong>.</p>
            </LegalSection>

            <LegalSection number="2" title="Personal Data We Collect" summary="We collect account information, payment data, usage data, domain queries, and API data." id="collection" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
                <li><strong>Account Information.</strong> Name, email address, encrypted password, company name (optional), job title (optional).</li>
                <li><strong>Payment Information.</strong> Billing name, address, and tokenized card data. We do not store full credit card numbers.</li>
                <li><strong>Usage Data.</strong> IP address, browser type, OS, device type, referring URL, pages visited, click patterns, domain names queried, tool usage frequency, session duration.</li>
                <li><strong>Domain Query Data.</strong> Domain names queried, results returned, reports generated, export actions taken.</li>
                <li><strong>Communication Data.</strong> Name, email, message content from contact form or support channels.</li>
                <li><strong>API Data.</strong> API key identifier, endpoints called, request parameters, response codes, timestamps.</li>
              </ol>
            </LegalSection>

            <LegalSection number="3" title="How We Use Personal Data" summary="We use your data to provide the Service, manage accounts, process payments, and improve the platform." id="usage" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
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
              <ol className="list-decimal pl-5 space-y-3">
                <li><strong>No Sale of Data.</strong> We do not sell, rent, or trade your Personal Data to third parties for their marketing purposes.</li>
                <li><strong>Service Providers.</strong> We share data with providers who assist in operating the Service: payment processing (Paystack), email delivery (Brevo), cloud infrastructure, and analytics.</li>
                <li><strong>Marketplace Participants.</strong> When a Transaction is completed, the buyer and seller exchange contact information necessary to complete the domain transfer.</li>
                <li><strong>Legal Requirements.</strong> We may disclose data when required by law, subpoena, or court order.</li>
                <li><strong>Business Transfers.</strong> In connection with a merger, acquisition, or sale, user data may be transferred. You will be notified.</li>
              </ol>
            </LegalSection>

            <LegalSection number="5" title="Data Retention" summary="We retain data only as long as necessary to provide the Service and meet legal obligations." id="retention" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
                <li><strong>Account Data.</strong> Retained until Account deletion, plus 30 days for backup.</li>
                <li><strong>Transaction Records.</strong> Retained for 7 years for financial record-keeping and tax compliance.</li>
                <li><strong>Domain Query Data.</strong> Encrypted and retained for your history. Deleted upon Account closure.</li>
                <li><strong>Support Communications.</strong> Retained for 3 years after last interaction.</li>
                <li><strong>API Logs.</strong> Retained for 12 months for security and debugging.</li>
                <li><strong>Analytics Data.</strong> Aggregated and anonymized after 24 months.</li>
              </ol>
            </LegalSection>

            <LegalSection number="6" title="Data Security" summary="We use AES-256-GCM encryption, bcrypt password hashing, and TLS 1.3 for all data in transit." id="security" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
                <li><strong>Encryption at Rest.</strong> All domain names and sensitive data are encrypted with AES-256-GCM. A database dump reveals nothing usable.</li>
                <li><strong>Password Hashing.</strong> Passwords are hashed with bcrypt (cost factor 12). We never store plaintext passwords.</li>
                <li><strong>Encryption in Transit.</strong> All platform traffic uses TLS 1.3. API keys are hashed at rest with SHA-256.</li>
                <li><strong>Access Controls.</strong> Role-based access controls limit internal access to user data. Access is logged and audited.</li>
                <li><strong>Incident Response.</strong> In the event of a data breach, we will notify affected users within 72 hours as required by applicable law.</li>
              </ol>
            </LegalSection>

            <LegalSection number="7" title="Your Rights (GDPR/CCPA)" summary="You can access, correct, delete, or export your data. Submit requests via the Contact page." id="rights" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
                <li><strong>Right of Access.</strong> Request a copy of your Personal Data in a structured, commonly used, machine-readable format.</li>
                <li><strong>Right to Rectification.</strong> Correct inaccurate or incomplete Personal Data.</li>
                <li><strong>Right to Erasure.</strong> Request deletion of your Personal Data, subject to legal retention obligations.</li>
                <li><strong>Right to Portability.</strong> Export your data in a structured format.</li>
                <li><strong>Right to Object.</strong> Object to processing for legitimate interests.</li>
                <li><strong>Right to Restrict Processing.</strong> Request restriction of processing in certain circumstances.</li>
                <li><strong>CCPA Rights.</strong> California residents have the right to know what data is collected, request deletion, and opt out of data sales (we do not sell data).</li>
                <li><strong>Submitting Requests.</strong> Contact us via <a href="/resources/contact" className="underline" style={{ color: "#111111" }}>Contact page</a> or email <strong>privacy@ceche.net</strong>. We respond within 30 days.</li>
              </ol>
            </LegalSection>

            <LegalSection number="8" title="Children's Privacy" summary="The Service is not directed to children under 18. We do not knowingly collect data from children." id="children" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
                <li>The Service is not directed to individuals under 18 years of age. We do not knowingly collect Personal Data from children.</li>
                <li>If we become aware that we have collected data from a child, we will delete it promptly. Contact us at <strong>privacy@ceche.net</strong>.</li>
              </ol>
            </LegalSection>

            <LegalSection number="9" title="Changes to This Policy" summary="We may update this policy. Material changes will be communicated via email or platform notice." id="changes" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
                <li>We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on the Service.</li>
                <li>The &quot;Last Updated&quot; date indicates when this policy was last revised.</li>
                <li>Continued use of the Service after changes take effect constitutes acceptance of the revised policy.</li>
              </ol>
            </LegalSection>

            <div id="contact-section" className="pt-8 pb-12">
              <h2 className="text-lg font-bold mb-3" style={{ color: "#111111" }}>Contact</h2>
              <p className="text-sm leading-relaxed mb-2" style={{ color: "#666666" }}>
                For privacy questions, contact us at <strong>privacy@ceche.net</strong> or through the <a href="/resources/contact" className="underline" style={{ color: "#111111" }}>Contact page</a>.
              </p>
              <p className="text-sm" style={{ color: "#666666" }}>
                See our <a href="/legal/terms" className="underline" style={{ color: "#111111" }}>Terms of Service</a> and <a href="/legal/cookies" className="underline" style={{ color: "#111111" }}>Cookie Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
