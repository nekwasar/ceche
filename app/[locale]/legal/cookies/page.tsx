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
  { id: "about", label: "About Cookies" },
  { id: "essential", label: "Essential Cookies" },
  { id: "functional", label: "Functional Cookies" },
  { id: "analytics", label: "Analytics Cookies" },
  { id: "third-party", label: "Third-Party Cookies" },
  { id: "manage", label: "Managing Cookies" },
  { id: "changes", label: "Changes" },
  { id: "contact-section", label: "Contact" },
];

export default function CookiesPage() {
  const [activeSection, setActiveSection] = useState("about");

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
            Cookie Policy
          </h1>
          <p style={{ fontSize: 14, color: "#666666", maxWidth: 640, lineHeight: 1.6 }}>
            How Ceche uses cookies and similar technologies. Essential, functional, and analytics only. No advertising cookies.
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
            <LegalSection number="1" title="About Cookies" summary="Cookies are small text files that help the Service function and remember your preferences." id="about" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li>Cookies are widely used to make websites work efficiently and to provide information to website owners.</li>
                <li>When you access the Service, we and our third-party service providers place cookies on your device.</li>
                <li>Cookies serve several purposes: enabling core functionality, remembering preferences, analyzing usage patterns, and supporting security.</li>
                <li>Similar technologies (web beacons, pixel tags, local storage) may also be used.</li>
              </ol>
            </LegalSection>

            <LegalSection number="2" title="Essential Cookies" summary="Required for the Service to function. Cannot be disabled without impairing the Service." id="essential" onVisible={handleVisible}>
              <p style={{ marginBottom: 16 }}>Essential Cookies enable core functionality such as authentication, security, and session management. They do not require consent.</p>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 700, color: "#111111" }}>Cookie</th>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 700, color: "#111111" }}>Purpose</th>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 700, color: "#111111" }}>Duration</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: 14, color: "#666666" }}>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}><td style={{ padding: "10px 0" }}>ceche_session</td><td style={{ padding: "10px 0" }}>Session state and authentication</td><td style={{ padding: "10px 0" }}>Session</td></tr>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}><td style={{ padding: "10px 0" }}>ceche_csrf</td><td style={{ padding: "10px 0" }}>CSRF protection</td><td style={{ padding: "10px 0" }}>Session</td></tr>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}><td style={{ padding: "10px 0" }}>ceche_auth</td><td style={{ padding: "10px 0" }}>Authentication token storage</td><td style={{ padding: "10px 0" }}>30 days</td></tr>
                  <tr><td style={{ padding: "10px 0" }}>ceche_cookie_consent</td><td style={{ padding: "10px 0" }}>Cookie consent preferences</td><td style={{ padding: "10px 0" }}>365 days</td></tr>
                </tbody>
              </table>
            </LegalSection>

            <LegalSection number="3" title="Functional Cookies" summary="Remember your preferences and provide enhanced functionality." id="functional" onVisible={handleVisible}>
              <p style={{ marginBottom: 16 }}>Functional Cookies enable the Service to remember your choices and provide personalized features.</p>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 700, color: "#111111" }}>Cookie</th>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 700, color: "#111111" }}>Purpose</th>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 700, color: "#111111" }}>Duration</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: 14, color: "#666666" }}>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}><td style={{ padding: "10px 0" }}>ceche_lang</td><td style={{ padding: "10px 0" }}>Language preference</td><td style={{ padding: "10px 0" }}>1 year</td></tr>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}><td style={{ padding: "10px 0" }}>ceche_theme</td><td style={{ padding: "10px 0" }}>UI theme preference</td><td style={{ padding: "10px 0" }}>1 year</td></tr>
                  <tr><td style={{ padding: "10px 0" }}>ceche_filters</td><td style={{ padding: "10px 0" }}>Saved marketplace filters</td><td style={{ padding: "10px 0" }}>90 days</td></tr>
                </tbody>
              </table>
            </LegalSection>

            <LegalSection number="4" title="Analytics Cookies" summary="Help us understand how you use the Service. Aggregated, not individually identifying." id="analytics" onVisible={handleVisible}>
              <p style={{ marginBottom: 16 }}>Analytics Cookies collect information about how visitors use the Service. This data is aggregated and does not personally identify you.</p>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 700, color: "#111111" }}>Cookie</th>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 700, color: "#111111" }}>Purpose</th>
                    <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 700, color: "#111111" }}>Duration</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: 14, color: "#666666" }}>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}><td style={{ padding: "10px 0" }}>ceche_analytics</td><td style={{ padding: "10px 0" }}>Usage analytics and performance</td><td style={{ padding: "10px 0" }}>2 years</td></tr>
                  <tr><td style={{ padding: "10px 0" }}>ceche_session_id</td><td style={{ padding: "10px 0" }}>Session tracking</td><td style={{ padding: "10px 0" }}>30 minutes</td></tr>
                </tbody>
              </table>
            </LegalSection>

            <LegalSection number="5" title="Third-Party Cookies" summary="Payment processing cookies from Paystack. We do not use advertising cookies." id="third-party" onVisible={handleVisible}>
              <p style={{ marginBottom: 12 }}>Our payment processor (Paystack) may set cookies during checkout. These are limited to transaction functionality.</p>
              <p style={{ marginBottom: 12 }}><strong>We do not use:</strong></p>
              <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
                <li>Advertising cookies</li>
                <li>Third-party ad trackers</li>
                <li>Cross-site tracking for marketing</li>
                <li>Cookies that share your domain searches</li>
              </ul>
            </LegalSection>

            <LegalSection number="6" title="Managing Cookies" summary="Control cookies through your browser settings or our consent preferences." id="manage" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li><strong>Browser Controls.</strong> Block or delete cookies in your browser settings. Essential cookies are required for login and checkout.</li>
                <li><strong>Analytics Opt-Out.</strong> You can opt out of analytics cookies. The platform continues to function with only essential cookies.</li>
                <li><strong>Cookie Preferences.</strong> Manage your preferences through the cookie consent banner displayed on your first visit.</li>
              </ol>
            </LegalSection>

            <LegalSection number="7" title="Changes to This Policy" summary="We may update this policy. Material changes will be communicated via email or platform notice." id="changes" onVisible={handleVisible}>
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li>We may update this Cookie Policy from time to time. Material changes will be communicated via email or a prominent notice on the Service.</li>
                <li>The &quot;Last Updated&quot; date indicates when this policy was last revised.</li>
                <li>Continued use of the Service after changes take effect constitutes acceptance of the revised policy.</li>
              </ol>
            </LegalSection>

            <div id="contact-section" style={{ paddingTop: 32, paddingBottom: 48 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#111111" }}>Contact</h2>
              <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 8, color: "#666666" }}>
                For cookie questions, contact us at <strong>privacy@ceche.net</strong> or through the <a href="/help/contact" style={{ color: "#111111", textDecoration: "underline" }}>Contact page</a>.
              </p>
              <p style={{ fontSize: 14, color: "#666666" }}>
                See our <a href="/legal/terms" style={{ color: "#111111", textDecoration: "underline" }}>Terms of Service</a> and <a href="/legal/privacy" style={{ color: "#111111", textDecoration: "underline" }}>Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
