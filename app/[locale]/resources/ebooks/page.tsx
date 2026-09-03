"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Download } from "lucide-react";

export default function EbooksPage() {
  const t = useTranslations("res.ebooks");
  const [showModal, setShowModal] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(2);

  useEffect(() => {
    if (!showModal) return;
    const interval = setInterval(() => { setModalCountdown((prev) => { if (prev <= 1) { window.location.href = "/signup"; return 0; } return prev - 1; }); }, 1000);
    return () => clearInterval(interval);
  }, [showModal]);

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      <section className="bg-[#9E2A2B] py-16 md:py-20 lg:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute -top-48 -right-48 w-[500px] md:w-[600px] h-[500px] md:h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(244,162,97,0.3) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-36 -left-36 w-[400px] md:w-[500px] h-[400px] md:h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="block text-[10px] font-mono tracking-[3px] uppercase text-[#F4A261] mb-4">{t("badge")}</span>
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-tight mx-auto mb-5 max-w-2xl">{t("title")}</h1>
          <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-md mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center bg-white rounded-[20px] p-6 md:p-10 lg:p-12 border border-[#E8E5DE]">
            <div className="flex-[1] min-w-[280px] w-full relative">
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#9E2A2B] to-[#7A1F21] rounded-2xl flex flex-col justify-center items-center p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <span className="text-[11px] font-mono tracking-[3px] text-[#F4A261] uppercase mb-4">Ceche Ebook</span>
                <span className="text-xl md:text-[26px] font-bold text-white text-center leading-tight font-[Georgia,serif]">The Domain Investor&apos;s Playbook</span>
                <span className="text-xs text-white/60 mt-3">42 Pages · June 2026</span>
              </div>
            </div>
            <div className="flex-[1] min-w-[280px]">
              <span className="inline-block text-[10px] font-mono tracking-[2px] text-[#9E2A2B] bg-[#EFECE6] px-3 py-1.5 rounded text uppercase mb-4">{t("featured.badge")}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111] m-0 mb-4 leading-tight">{t("featured.title")}</h2>
              <p className="text-sm md:text-base text-[#666] leading-relaxed mb-6">{t("featured.desc")}</p>
              <div className="flex gap-6 md:gap-8 mb-8">
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <span className="block text-2xl font-bold text-[#111]">{t(`featured.stats.${i}.value`)}</span>
                    <span className="text-xs text-[#999]">{t(`featured.stats.${i}.label`)}</span>
                  </div>
                ))}
              </div>
              <button className="px-8 py-3.5 rounded-full bg-[#9E2A2B] text-white font-semibold text-sm border-none cursor-pointer">{t("featured.cta")}</button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111] mb-8 md:mb-10">{t("catalogTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-5 bg-white rounded-2xl p-5 md:p-6 border border-[#E8E5DE] items-start">
                <div className="w-16 md:w-20 h-[88px] md:h-[108px] rounded-lg flex flex-col justify-center items-center shrink-0 p-2" style={{ background: `linear-gradient(135deg, ${i % 2 === 0 ? "#9E2A2B" : "#F4A261"} 0%, ${i % 2 === 0 ? "#9E2A2Bcc" : "#F4A261cc"} 100%)` }}>
                  <span className="text-[8px] font-mono text-white text-center leading-tight">{t(`catalog.${i}.title`).split(" ").slice(0, 3).join(" ")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-bold text-[#111] m-0 mb-2 leading-snug">{t(`catalog.${i}.title`)}</h3>
                  <p className="text-xs text-[#999] mb-3">{t.raw(`catalog.${i}.pages`)} pages · {t(`catalog.${i}.date`)} · {t(`catalog.${i}.downloads`)} downloads</p>
                  <p className="text-xs text-[#666] leading-relaxed mb-4">{t(`catalog.${i}.desc`)}</p>
                  <button onClick={() => setShowModal(true)} className="px-5 py-2.5 rounded-full bg-[#111] text-white font-semibold text-xs border-none cursor-pointer">{t("getCopy")}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EFECE6] py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#111] mb-3">{t("cta.title")}</h2>
          <p className="text-base text-[#666] mb-8">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/resources/blog" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#9E2A2B] text-white font-semibold text-sm no-underline">{t("cta.blog")}</a>
            <a href="/pricing" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#9E2A2B] text-[#9E2A2B] font-semibold text-sm no-underline">{t("cta.pricing")}</a>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 md:p-10 lg:p-14 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-[rgba(158,42,43,0.08)] flex items-center justify-center mx-auto mb-6"><Download className="w-8 h-8 text-[#9E2A2B]" /></div>
            <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-3">{t("modal.title")}</h2>
            <p className="text-sm text-[#666] mb-5 leading-relaxed">{t("modal.desc")}</p>
            <div className="bg-[#FAF7F2] rounded-lg p-3 mb-5"><p className="text-xs text-[#999]">{t("modal.redirecting", { count: modalCountdown })}</p></div>
            <a href="/signup" className="inline-block px-8 py-3.5 bg-[#9E2A2B] text-white rounded-[10px] font-semibold text-sm no-underline mb-3">{t("modal.cta")}</a>
            <div><button onClick={() => setShowModal(false)} className="bg-transparent border-none text-[#999] text-sm cursor-pointer underline">{t("modal.back")}</button></div>
          </div>
        </div>
      )}
    </main>
  );
}
