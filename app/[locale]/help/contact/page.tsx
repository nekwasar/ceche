"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { DocsMiniNav } from "@/components/layout/DocsMiniNav";

export default function HelpContactPage() {
  const t = useTranslations("helpContact");

  return (
    <main style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-6 md:gap-16">
        <DocsMiniNav />
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-6" style={{ color: "#999999" }}>{t("badge")}</p>
          <h1 className="font-serif font-bold leading-[0.85] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#111111" }}>
            {t("title1")}<br />{t("title2")}<span style={{ color: "#9E2A2B" }}>.</span>
          </h1>
          <div className="h-px mb-8" style={{ backgroundColor: "#9E2A2B" }} />
          <p className="text-lg max-w-2xl leading-relaxed mb-12" style={{ color: "#555555" }}>{t("desc")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-5">
                <div>
                  <label className="text-xs font-bold mb-1.5 block" style={{ color: "#111111" }}>{t("form.name")}</label>
                  <input type="text" placeholder={t("form.namePlaceholder")} className="w-full px-4 py-2.5 rounded-xl text-sm border border-black/10 focus:outline-none focus:border-[#9E2A2B]" style={{ backgroundColor: "#FFFFFF" }} />
                </div>
                <div>
                  <label className="text-xs font-bold mb-1.5 block" style={{ color: "#111111" }}>{t("form.email")}</label>
                  <input type="email" placeholder={t("form.emailPlaceholder")} className="w-full px-4 py-2.5 rounded-xl text-sm border border-black/10 focus:outline-none focus:border-[#9E2A2B]" style={{ backgroundColor: "#FFFFFF" }} />
                </div>
                <div>
                  <label className="text-xs font-bold mb-1.5 block" style={{ color: "#111111" }}>{t("form.subject")}</label>
                  <select className="w-full px-4 py-2.5 rounded-xl text-sm border border-black/10 focus:outline-none focus:border-[#9E2A2B]" style={{ backgroundColor: "#FFFFFF", color: "#666666" }}>
                    {[0, 1, 2, 3, 4].map((i) => <option key={i}>{t(`form.subjects.${i}`)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold mb-1.5 block" style={{ color: "#111111" }}>{t("form.message")}</label>
                  <textarea rows={5} placeholder={t("form.messagePlaceholder")} className="w-full px-4 py-2.5 rounded-xl text-sm border border-black/10 focus:outline-none focus:border-[#9E2A2B] resize-none" style={{ backgroundColor: "#FFFFFF" }} />
                </div>
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all" style={{ backgroundColor: "#9E2A2B", color: "#FFFFFF" }}>
                  {t("form.send")} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold mb-3" style={{ color: "#111111" }}>{t("channels.title")}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(158,42,43,0.08)" }}>
                      <Mail className="w-4 h-4" style={{ color: "#9E2A2B" }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: "#111111" }}>{t("channels.email.title")}</p>
                      <p className="text-xs" style={{ color: "#666666" }}>{t("channels.email.value")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(244,162,97,0.1)" }}>
                      <MessageSquare className="w-4 h-4" style={{ color: "#F4A261" }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: "#111111" }}>{t("channels.slack.title")}</p>
                      <p className="text-xs" style={{ color: "#666666" }}>{t("channels.slack.value")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-3" style={{ color: "#111111" }}>{t("responseTimes.title")}</h3>
                <div className="space-y-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between py-1.5">
                      <span className="text-xs font-medium" style={{ color: "#111111" }}>{t(`responseTimes.times.${i}.tier`)}</span>
                      <span className="text-xs font-mono" style={{ color: t(`responseTimes.times.${i}.color`) }}>{t(`responseTimes.times.${i}.time`)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-3" style={{ color: "#111111" }}>{t("businessHours.title")}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#666666" }}>{t("businessHours.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
