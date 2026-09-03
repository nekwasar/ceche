"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Hero } from "@/components/layout/Hero";
import {
  BarChart3, Globe, Shield, Rocket, Eye, Layers, ArrowRight,
  Users, TrendingUp, Database, ChevronDown, Sparkles,
} from "lucide-react";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-base font-semibold pr-4" style={{ color: "#111111" }}>{question}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: "#999999" }} />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: "#666666" }}>{answer}</p>
      )}
    </div>
  );
}

export function WwwHomepage() {
  const t = useTranslations("home");

  return (
    <div>
      <Hero />

      {/* SECTION A: Name Search Tool */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              {t("searchTool.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#111111" }}>
              {t("searchTool.title")}
            </h2>
            <p className="text-base max-w-2xl mb-12 leading-relaxed" style={{ color: "#666666" }}>
              {t("searchTool.description")}
            </p>

            <div className="grid md:grid-cols-3 gap-0">
              <div className="md:border-r border-black/10 md:pr-8 pb-8 md:pb-0 border-b md:border-b-0">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>{t("searchTool.taken.title")}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  {t("searchTool.taken.desc")}
                </p>
              </div>

              <div className="md:px-8 md:border-r border-black/10 pb-8 md:pb-0 border-b md:border-b-0">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>{t("searchTool.available.title")}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  {t("searchTool.available.desc")}
                </p>
              </div>

              <div className="md:pl-8">
                <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5" style={{ color: "#111111" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>{t("searchTool.appraise.title")}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  {t("searchTool.appraise.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Built For */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl overflow-hidden">
            <div className="px-10 pt-10 pb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
                {t("builtFor.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#111111" }}>
                {t("builtFor.title")}
              </h2>
            </div>

            <div className="border-t border-black/10">
              {[
                { key: "investors", icon: <TrendingUp className="w-6 h-6 text-white" /> },
                { key: "founders", icon: <Rocket className="w-6 h-6 text-white" /> },
                { key: "agencies", icon: <Globe className="w-6 h-6 text-white" /> },
              ].map((persona, i) => (
                <div
                  key={persona.key}
                  className={`flex flex-col md:flex-row md:items-center gap-6 px-10 py-8 ${i < 2 ? "border-b border-black/10" : ""} hover:bg-[#E5DFD3]/30 transition-colors`}
                >
                  <div className="w-14 h-14 bg-[#9E2A2B] rounded-2xl flex items-center justify-center flex-shrink-0">
                    {persona.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1" style={{ color: "#111111" }}>
                      {t(`builtFor.${persona.key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                      {t(`builtFor.${persona.key}.desc`)}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-bold" style={{ color: "#111111" }}>
                      {t(`builtFor.${persona.key}.stat`)}
                    </div>
                    <div className="text-xs" style={{ color: "#999999" }}>
                      {t(`builtFor.${persona.key}.statLabel`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: Marketplace */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <div className="grid md:grid-cols-5 gap-10 md:gap-12">
              <div className="md:col-span-3">
                <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
                  {t("marketplace.badge")}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#111111" }}>
                  {t("marketplace.title")}
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#666666" }}>
                  {t("marketplace.desc1")}
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "#666666" }}>
                  {t("marketplace.desc2")}
                </p>
                <a
                  href="/marketplace"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]"
                >
                  {t("marketplace.cta")}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-2xl p-6 border border-black/5">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#111111" }}>
                    {t("marketplace.revealPricingTitle")}
                  </h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { range: "Under $1,000", fee: "$5" },
                      { range: "$1K – $10K", fee: "$10" },
                      { range: "$10K – $50K", fee: "$25" },
                      { range: "$50K+", fee: "$50" },
                    ].map((item) => (
                      <div key={item.range} className="flex justify-between items-center py-2 border-b border-black/5">
                        <span className="text-sm" style={{ color: "#666666" }}>{item.range}</span>
                        <span className="text-sm font-bold" style={{ color: "#111111" }}>{item.fee}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-black/10 pt-4 mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#111111" }}>
                      {t("marketplace.tryYourLuckTitle")}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {[
                        { tld: ".com", price: "$79" },
                        { tld: ".net", price: "$39" },
                        { tld: ".io", price: "$29" },
                        { tld: ".co", price: "$9" },
                      ].map((item) => (
                        <div key={item.tld} className="flex justify-between">
                          <span style={{ color: "#666666" }}>{item.tld}</span>
                          <span className="font-bold" style={{ color: "#111111" }}>{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-black/5 flex justify-between text-sm">
                      <span style={{ color: "#666666" }}>Any TLD (flat)</span>
                      <span className="font-bold" style={{ color: "#111111" }}>$19</span>
                    </div>
                  </div>

                  <a
                    href="/marketplace/try-your-luck"
                    className="block w-full text-center py-3 rounded-full font-medium text-sm transition-all border border-[#9E2A2B] text-[#9E2A2B] hover:bg-[#9E2A2B] hover:text-white mt-4"
                  >
                    {t("marketplace.tryYourLuckCta")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: How It Works */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              {t("howItWorks.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: "#111111" }}>
              {t("howItWorks.title")}
            </h2>

            <div className="flex flex-col md:flex-row md:items-start gap-0">
              {[
                { key: "step1", num: "1" },
                { key: "step2", num: "2" },
                { key: "step3", num: "3" },
              ].map((step, i) => (
                <div key={step.key} className="flex-1 flex flex-col items-center text-center px-6">
                  <div className="w-16 h-16 bg-[#9E2A2B] rounded-2xl flex items-center justify-center mb-5">
                    <span className="text-white text-2xl font-bold">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>
                    {t(`howItWorks.${step.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    {t(`howItWorks.${step.key}.desc`)}
                  </p>
                  {i < 2 && (
                    <div className="hidden md:block w-12 h-[2px] bg-black/10 mt-6" />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="/marketplace/try-your-luck"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-base transition-all bg-[#9E2A2B] text-white hover:bg-[#7A1F21]"
              >
                {t("howItWorks.cta")}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: Under the Hood */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EFECE6] rounded-3xl p-10 md:p-14">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
              {t("underTheHood.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#111111" }}>
              {t("underTheHood.title")}
            </h2>
            <p className="text-base max-w-2xl mb-12 leading-relaxed" style={{ color: "#666666" }}>
              {t("underTheHood.description")}
            </p>

            <div className="grid md:grid-cols-3 gap-0">
              {[
                { key: "goroutine", icon: <Globe className="w-5 h-5" style={{ color: "#111111" }} /> },
                { key: "encryption", icon: <Shield className="w-5 h-5" style={{ color: "#111111" }} /> },
                { key: "caching", icon: <Database className="w-5 h-5" style={{ color: "#111111" }} /> },
              ].map((feature, i) => (
                <div
                  key={feature.key}
                  className={`${i < 2 ? "md:border-r border-black/10 md:pr-8" : "md:pl-8"} pb-8 md:pb-0 ${i < 2 ? "border-b md:border-b-0 border-black/10" : ""}`}
                >
                  <div className="w-10 h-10 bg-[#E5DFD3] rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#111111" }}>
                    {t(`underTheHood.${feature.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                    {t(`underTheHood.${feature.key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: FAQ */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-mono tracking-widest uppercase mb-3 block" style={{ color: "#999999" }}>
            {t("faq.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: "#111111" }}>
            {t("faq.title")}
          </h2>

          <div className="bg-[#EFECE6] rounded-2xl px-8 border border-black/5">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <FaqItem
                key={i}
                question={t(`faq.items.${i}.question`)}
                answer={t(`faq.items.${i}.answer`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* World Map Banner */}
      <section className="my-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full bg-[#EFECE6] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                {Array.from({ length: 40 }).map((_, row) =>
                  Array.from({ length: 80 }).map((_, col) => {
                    const x = col * 15;
                    const y = row * 15;
                    const isMapArea =
                      (row > 8 && row < 35 && col > 5 && col < 25) ||
                      (row > 5 && row < 30 && col > 28 && col < 55) ||
                      (row > 10 && row < 38 && col > 55 && col < 75);
                    return (
                      <circle
                        key={`${row}-${col}`}
                        cx={x}
                        cy={y}
                        r={isMapArea ? 1.5 : 0.8}
                        fill={isMapArea ? "#C8C2B8" : "#D8D3CA"}
                        opacity={isMapArea ? 0.8 : 0.3}
                      />
                    );
                  })
                )}
              </svg>
            </div>

            <div className="w-14 h-14 bg-black text-white rounded-xl flex items-center justify-center mx-auto mb-6 relative z-10" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <span className="font-branded text-lg font-bold">C</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10" style={{ color: "#111111" }}>
              {t("worldMap.title")}
            </h2>

            <p className="max-w-xl mx-auto mb-8 relative z-10" style={{ color: "#666666" }}>
              {t("worldMap.description")}
            </p>

            <a
              href="/tools/appraisal"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors relative z-10"
            >
              {t("worldMap.cta")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#111111" }}>
            {t("cta.title")}
          </h2>
          <p className="mb-8" style={{ color: "#666666" }}>
            {t("cta.description")}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all bg-black text-white hover:bg-neutral-800"
            >
              {t("cta.signup")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center px-6 py-3 rounded-full font-medium text-sm transition-all border border-black text-black hover:bg-black hover:text-white"
            >
              {t("cta.pricing")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
