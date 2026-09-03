"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface PremiumGateModalProps {
  toolName: string;
}

export default function PremiumGateModal({ toolName }: PremiumGateModalProps) {
  const t = useTranslations("premiumModal");
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const timer = setTimeout(() => { setIsOpen(true); }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdown((prev) => { if (prev <= 1) { window.location.href = "/signup"; return 0; } return prev - 1; });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4" onClick={() => setIsOpen(false)}>
      <div className="bg-white rounded-xl p-10 max-w-md w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)]" onClick={(e) => e.stopPropagation()}>
        <div className="w-16 h-16 bg-[#9E2A2B] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#111] mb-3">{t("title")}</h2>
        <p className="text-base text-[#666] mb-6 leading-relaxed">{t("description", { toolName })}</p>
        <div className="bg-[#FAF7F2] rounded-lg p-4 mb-6">
          <p className="text-sm text-[#999] mb-2">{t("redirecting", { count: countdown })}</p>
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-[#9E2A2B] rounded transition-all" style={{ width: `${((2 - countdown) / 2) * 100}%` }} />
          </div>
        </div>
        <Link href="/signup" className="inline-block bg-[#9E2A2B] text-white px-8 py-3.5 rounded-lg text-base font-semibold no-underline mb-4">{t("cta")}</Link>
        <div><button onClick={() => setIsOpen(false)} className="bg-transparent border-none text-[#999] text-sm cursor-pointer underline">{t("back")}</button></div>
      </div>
    </div>
  );
}
