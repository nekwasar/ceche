"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Link2, BarChart3, Shield } from "lucide-react";

const buildIcons = [Link2, BarChart3, Shield];

export default function ApiPage() {
  const t = useTranslations("tools.api");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <section className="bg-gradient-to-br from-[#9E2A2B] to-[#7A1F1F] py-16 md:py-20 px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/15 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-5">{t("badge")}</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">{t("title")}</h1>
          <p className="text-base md:text-lg text-white/85 mb-8 leading-relaxed">{t("description")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setShowModal(true)} className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold border-none cursor-pointer">{t("getKey")}</button>
            <Link href="/help/api" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">{t("readDocs")}</Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto -mt-10 px-4 md:px-6 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">{t("buildTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {[0, 1, 2].map((i) => {
            const Icon = buildIcons[i];
            const links = ["/tools/domain-lookup", "/tools/bulk-analyzer", "/tools/trademark-monitor"];
            return (
              <div key={i} className="bg-white rounded-xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-[#9E2A2B]/10 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-[#9E2A2B]" /></div>
                <h3 className="text-base md:text-lg font-bold text-[#111] mb-2">{t(`buildCards.${i}.title`)}</h3>
                <p className="text-sm text-[#666] leading-relaxed mb-5 flex-1">{t(`buildCards.${i}.desc`)}</p>
                <Link href={links[i]} className="text-[#9E2A2B] font-semibold text-sm no-underline hover:underline">{t(`buildCards.${i}.linkText`)} →</Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-4 md:px-6 mt-12 md:mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111] text-center mb-8 md:mb-10">{t("featuresTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-[#FAF7F2] rounded-xl p-5 md:p-6">
                <h3 className="text-base font-bold text-[#111] mb-1.5">{t(`features.${i}.title`)}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{t(`features.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#111] to-[#2A2A2A] py-12 md:py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-base text-white/70 mb-8">{t("ctaDescription")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => setShowModal(true)} className="bg-[#F4A261] text-[#111] px-8 py-3.5 rounded-lg text-base font-bold border-none cursor-pointer">{t("getKey")}</button>
          <Link href="/help/api" className="bg-transparent text-white px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-white/30 no-underline text-center">{t("viewDocs")}</Link>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] px-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-8 md:p-10 max-w-md w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)]" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-[#9E2A2B] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-3">{t("modal.title")}</h2>
            <p className="text-base text-[#666] mb-6 leading-relaxed">{t("modal.description")}</p>
            <Link href="/signup" className="inline-block bg-[#9E2A2B] text-white px-8 py-3.5 rounded-lg text-base font-semibold no-underline mb-4">{t("modal.cta")}</Link>
            <div><button onClick={() => setShowModal(false)} className="bg-transparent border-none text-[#999] text-sm cursor-pointer underline">{t("modal.back")}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
