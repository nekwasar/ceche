import { useTranslations } from "next-intl";
import { AlertTriangle, ArrowRight, Home } from "lucide-react";

export default function AppraisalLimitPage() {
  const t = useTranslations("limit");

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-[#EFECE6] rounded-2xl flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-8 h-8" style={{ color: "#9E2A2B" }} />
        </div>
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#111111" }}>{t("title")}</h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "#666666" }}>{t("desc")}</p>
        <div className="bg-[#EFECE6] rounded-2xl p-6 border border-black/5 mb-8">
          <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "#999999" }}>{t("currentLimits")}</p>
          <div className="space-y-2 text-sm" style={{ color: "#666666" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <span>{t(`limits.${i}.tier`)}</span>
                <span className="font-mono font-semibold" style={{ color: "#111111" }}>{t(`limits.${i}.value`)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]">
            {t("signup")}<ArrowRight className="w-4 h-4" />
          </a>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all border border-black text-black hover:bg-black hover:text-white">
            <Home className="w-4 h-4" />{t("home")}
          </a>
        </div>
      </div>
    </main>
  );
}
