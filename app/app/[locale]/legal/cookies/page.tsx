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
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-sm mb-2" style={{ color: "#999999" }}>
            Effective Date: August 1, 2026 &nbsp;|&nbsp; Last Updated: August 1, 2026
          </p>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "#111111" }}>
            Cookie Policy
          </h1>
          <p className="text-sm mt-3 max-w-2xl" style={{ color: "#666666" }}>
            How Ceche uses cookies and similar technologies. Essential, functional, and analytics only. No advertising cookies.
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
            <LegalSection number="1" title="About Cookies" summary="Cookies are small text files that help the Service function and remember your preferences." id="about" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Cookies are widely used to make websites work efficiently and to provide information to website owners.</li>
                <li>When you access the Service, we and our third-party service providers place cookies on your device.</li>
                <li>Cookies serve several purposes: enabling core functionality, remembering preferences, analyzing usage patterns, and supporting security.</li>
                <li>Similar technologies (web beacons, pixel tags, local storage) may also be used.</li>
              </ol>
            </LegalSection>

            <LegalSection number="2" title="Essential Cookies" summary="Required for the Service to function. Cannot be disabled without impairing the Service." id="essential" onVisible={handleVisible}>
              <p className="mb-3">Essential Cookies enable core functionality such as authentication, security, and session management. They do not require consent.</p>
              <table className="w-full text-sm border-collapse mb-3">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Cookie</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Purpose</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Duration</th>
                  </tr>
                </thead>
                <tbody className="text-sm" style={{ color: "#666666" }}>
                  <tr className="border-b border-black/5"><td className="py-2">ceche_session</td><td className="py-2">Session state and authentication</td><td className="py-2">Session</td></tr>
                  <tr className="border-b border-black/5"><td className="py-2">ceche_csrf</td><td className="py-2">CSRF protection</td><td className="py-2">Session</td></tr>
                  <tr className="border-b border-black/5"><td className="py-2">ceche_auth</td><td className="py-2">Authentication token storage</td><td className="py-2">30 days</td></tr>
                  <tr><td className="py-2">ceche_cookie_consent</td><td className="py-2">Cookie consent preferences</td><td className="py-2">365 days</td></tr>
                </tbody>
              </table>
            </LegalSection>

            <LegalSection number="3" title="Functional Cookies" summary="Remember your preferences and provide enhanced functionality." id="functional" onVisible={handleVisible}>
              <p className="mb-3">Functional Cookies enable the Service to remember your choices and provide personalized features.</p>
              <table className="w-full text-sm border-collapse mb-3">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Cookie</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Purpose</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Duration</th>
                  </tr>
                </thead>
                <tbody className="text-sm" style={{ color: "#666666" }}>
                  <tr className="border-b border-black/5"><td className="py-2">ceche_lang</td><td className="py-2">Language preference</td><td className="py-2">1 year</td></tr>
                  <tr className="border-b border-black/5"><td className="py-2">ceche_theme</td><td className="py-2">UI theme preference</td><td className="py-2">1 year</td></tr>
                  <tr><td className="py-2">ceche_filters</td><td className="py-2">Saved marketplace filters</td><td className="py-2">90 days</td></tr>
                </tbody>
              </table>
            </LegalSection>

            <LegalSection number="4" title="Analytics Cookies" summary="Help us understand how you use the Service. Aggregated, not individually identifying." id="analytics" onVisible={handleVisible}>
              <p className="mb-3">Analytics Cookies collect information about how visitors use the Service. This data is aggregated and does not personally identify you.</p>
              <table className="w-full text-sm border-collapse mb-3">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Cookie</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Purpose</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Duration</th>
                  </tr>
                </thead>
                <tbody className="text-sm" style={{ color: "#666666" }}>
                  <tr className="border-b border-black/5"><td className="py-2">ceche_analytics</td><td className="py-2">Usage analytics and performance</td><td className="py-2">2 years</td></tr>
                  <tr><td className="py-2">ceche_session_id</td><td className="py-2">Session tracking</td><td className="py-2">30 minutes</td></tr>
                </tbody>
              </table>
            </LegalSection>

            <LegalSection number="5" title="Third-Party Cookies" summary="Payment processing cookies from Paystack. We do not use advertising cookies." id="third-party" onVisible={handleVisible}>
              <p className="mb-3">Our payment processor (Paystack) may set cookies during checkout. These are limited to transaction functionality.</p>
              <p className="mb-3"><strong>We do not use:</strong></p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Advertising cookies</li>
                <li>Third-party ad trackers</li>
                <li>Cross-site tracking for marketing</li>
                <li>Cookies that share your domain searches</li>
              </ul>
            </LegalSection>

            <LegalSection number="6" title="Managing Cookies" summary="Control cookies through your browser settings or our consent preferences." id="manage" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
                <li><strong>Browser Controls.</strong> Block or delete cookies in your browser settings. Essential cookies are required for login and checkout.</li>
                <li><strong>Analytics Opt-Out.</strong> You can opt out of analytics cookies. The platform continues to function with only essential cookies.</li>
                <li><strong>Cookie Preferences.</strong> Manage your preferences through the cookie consent banner displayed on your first visit.</li>
              </ol>
            </LegalSection>

            <LegalSection number="7" title="Changes to This Policy" summary="We may update this policy. Material changes will be communicated via email or platform notice." id="changes" onVisible={handleVisible}>
              <ol className="list-decimal pl-5 space-y-3">
                <li>We may update this Cookie Policy from time to time. Material changes will be communicated via email or a prominent notice on the Service.</li>
                <li>The &quot;Last Updated&quot; date indicates when this policy was last revised.</li>
                <li>Continued use of the Service after changes take effect constitutes acceptance of the revised policy.</li>
              </ol>
            </LegalSection>

            <div id="contact-section" className="pt-8 pb-12">
              <h2 className="text-lg font-bold mb-3" style={{ color: "#111111" }}>Contact</h2>
              <p className="text-sm leading-relaxed mb-2" style={{ color: "#666666" }}>
                For cookie questions, contact us at <strong>privacy@ceche.net</strong> or through the <a href="/resources/contact" className="underline" style={{ color: "#111111" }}>Contact page</a>.
              </p>
              <p className="text-sm" style={{ color: "#666666" }}>
                See our <a href="/legal/terms" className="underline" style={{ color: "#111111" }}>Terms of Service</a> and <a href="/legal/privacy" className="underline" style={{ color: "#111111" }}>Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
