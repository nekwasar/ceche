import { ArrowRight } from "lucide-react";
import { DocsMiniNav } from "@/components/layout/DocsMiniNav";

const sections = [
  { title: "Documentation", desc: "Comprehensive guides for every Ceche tool, from domain lookup to bulk analysis.", href: "/help/docs" },
  { title: "API Reference", desc: "RESTful API endpoints for programmatic domain intelligence at scale.", href: "/help/api" },
  { title: "FAQ", desc: "Answers to common questions about pricing, tools, accounts, and more.", href: "/help/faq" },
  { title: "Contact", desc: "Reach our support team for help, feedback, or partnership inquiries.", href: "/help/contact" },
  { title: "Changelog", desc: "Product updates, new features, and platform improvements.", href: "/help/changelog" },
];

export default function HelpPage() {
  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-6 md:gap-16">
        <DocsMiniNav />
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: "#999999" }}>Help Center</p>
          <h1 className="font-serif font-bold leading-[0.85] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111111" }}>
            How can we<br />help<span style={{ color: "#9E2A2B" }}>.</span>
          </h1>
          <div className="h-px mb-8" style={{ backgroundColor: "#9E2A2B" }} />
          <p className="text-lg max-w-2xl leading-relaxed mb-12" style={{ color: "#555555" }}>
            Find documentation, FAQs, and support for all Ceche tools. Use the sidebar to navigate between sections.
          </p>

          <div className="space-y-0">
            {sections.map((s, i) => (
              <a key={i} href={s.href} className="flex items-center justify-between py-5 group" style={{ borderBottom: "1px solid rgba(17,17,17,0.06)", textDecoration: "none" }}>
                <div>
                  <h2 className="text-base font-bold mb-1 group-hover:text-[#9E2A2B] transition-colors" style={{ color: "#111111" }}>{s.title}</h2>
                  <p className="text-xs" style={{ color: "#888888" }}>{s.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 ml-4 group-hover:text-[#9E2A2B] transition-colors" style={{ color: "#CCCCCC" }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
