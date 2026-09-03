import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { DocsMiniNav } from "@/components/layout/DocsMiniNav";

export default function HelpPage() {
  const t = useTranslations("helpOverview");

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-6 md:gap-16">
        <DocsMiniNav />
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: "#999999" }}>{t("badge")}</p>
          <h1 className="font-serif font-bold leading-[0.85] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111111" }}>
            How can we<br />help<span style={{ color: "#9E2A2B" }}>.</span>
          </h1>
          <div className="h-px mb-8" style={{ backgroundColor: "#9E2A2B" }} />
          <p className="text-lg max-w-2xl leading-relaxed mb-12" style={{ color: "#555555" }}>
            {t("desc")}
          </p>

          <div className="space-y-0">
            {[0, 1, 2, 3, 4].map((i) => (
              <a key={i} href={t(`sections.${i}.href`)} className="flex items-center justify-between py-5 group" style={{ borderBottom: "1px solid rgba(17,17,17,0.06)", textDecoration: "none" }}>
                <div>
                  <h2 className="text-base font-bold mb-1 group-hover:text-[#9E2A2B] transition-colors" style={{ color: "#111111" }}>{t(`sections.${i}.title`)}</h2>
                  <p className="text-xs" style={{ color: "#888888" }}>{t(`sections.${i}.desc`)}</p>
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
