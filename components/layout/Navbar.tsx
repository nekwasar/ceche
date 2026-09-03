"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ChevronDown, ChevronRight, BarChart3, Globe, ShoppingCart, Users, BookOpen, Shield, Rocket, TrendingUp, Eye, FileSearch, Layers, Database, Gavel, Code } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

type MegaMenuKey = "products" | "marketplace" | "solutions" | "resources" | null;

interface MegaMenuItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}

interface MegaMenuCategory {
  label: string;
  items: MegaMenuItem[];
}

function getMegaMenuData(t: any): Record<MegaMenuKey, MegaMenuCategory[]> {
  return {
    products: [
      {
        label: t("categories.intelligence"),
        items: [
          { icon: <Globe className="w-5 h-5" />, title: t("items.domainLookup.title"), desc: t("items.domainLookup.desc"), href: "/tools/domain-lookup" },
          { icon: <BarChart3 className="w-5 h-5" />, title: t("items.appraisal.title"), desc: t("items.appraisal.desc"), href: "/appraise" },
          { icon: <Globe className="w-5 h-5" />, title: t("items.domainScanner.title"), desc: t("items.domainScanner.desc"), href: "/tools/seo-scanner" },
          { icon: <Eye className="w-5 h-5" />, title: t("items.extendedInsights.title"), desc: t("items.extendedInsights.desc"), href: "/tools/extended-insights" },
          { icon: <Layers className="w-5 h-5" />, title: t("items.bulkAudit.title"), desc: t("items.bulkAudit.desc"), href: "/tools/bulk-analyzer" },
        ],
      },
      {
        label: t("categories.platform"),
        items: [
          { icon: <Code className="w-5 h-5" />, title: t("items.apiAccess.title"), desc: t("items.apiAccess.desc"), href: "/tools/api" },
          { icon: <Shield className="w-5 h-5" />, title: t("items.trademarkMonitor.title"), desc: t("items.trademarkMonitor.desc"), href: "/tools/trademark-monitor" },
          { icon: <Database className="w-5 h-5" />, title: t("items.domainDatabase.title"), desc: t("items.domainDatabase.desc"), href: "/tools/domain-database" },
        ],
      },
    ],
    marketplace: [
      {
        label: t("categories.buyDomains"),
        items: [
          { icon: <ShoppingCart className="w-5 h-5" />, title: t("items.standardMarketplace.title"), desc: t("items.standardMarketplace.desc"), href: "/marketplace" },
          { icon: <Layers className="w-5 h-5" />, title: t("items.curatedDomains.title"), desc: t("items.curatedDomains.desc"), href: "/marketplace/curated" },
          { icon: <Gavel className="w-5 h-5" />, title: t("items.tryYourLuck.title"), desc: t("items.tryYourLuck.desc"), href: "/marketplace/try-your-luck" },
        ],
      },
      {
        label: t("categories.sellDomains"),
        items: [
          { icon: <TrendingUp className="w-5 h-5" />, title: t("items.listDomain.title"), desc: t("items.listDomain.desc"), href: "/marketplace/sell" },
        ],
      },
    ],
    solutions: [
      {
        label: t("categories.byRole"),
        items: [
          { icon: <TrendingUp className="w-5 h-5" />, title: t("items.domainInvestors.title"), desc: t("items.domainInvestors.desc"), href: "/solutions/domain-investors" },
          { icon: <Rocket className="w-5 h-5" />, title: t("items.startupFounders.title"), desc: t("items.startupFounders.desc"), href: "/solutions/startup-founders" },
          { icon: <BarChart3 className="w-5 h-5" />, title: t("items.seoAgencies.title"), desc: t("items.seoAgencies.desc"), href: "/solutions/seo-agencies" },
        ],
      },
      {
        label: t("categories.byNeed"),
        items: [
          { icon: <Globe className="w-5 h-5" />, title: t("items.findAvailable.title"), desc: t("items.findAvailable.desc"), href: "/solutions/find-available" },
          { icon: <Eye className="w-5 h-5" />, title: t("items.researchIntelligence.title"), desc: t("items.researchIntelligence.desc"), href: "/solutions/research-intelligence" },
          { icon: <ShoppingCart className="w-5 h-5" />, title: t("items.buyPremium.title"), desc: t("items.buyPremium.desc"), href: "/solutions/buy-premium" },
        ],
      },
    ],
    resources: [
      {
        label: t("categories.explore"),
        items: [
          { icon: <BookOpen className="w-5 h-5" />, title: t("items.blog.title"), desc: t("items.blog.desc"), href: "/resources/blog" },
          { icon: <FileSearch className="w-5 h-5" />, title: t("items.ebooks.title"), desc: t("items.ebooks.desc"), href: "/resources/ebooks" },
          { icon: <Users className="w-5 h-5" />, title: t("items.caseStudies.title"), desc: t("items.caseStudies.desc"), href: "/resources/case-studies" },
        ],
      },
      {
        label: t("categories.support"),
        items: [
          { icon: <FileSearch className="w-5 h-5" />, title: t("items.helpCenter.title"), desc: t("items.helpCenter.desc"), href: "/help" },
          { icon: <BookOpen className="w-5 h-5" />, title: t("items.apiDocs.title"), desc: t("items.apiDocs.desc"), href: "/help/api" },
          { icon: <Users className="w-5 h-5" />, title: t("items.contact.title"), desc: t("items.contact.desc"), href: "/help/contact" },
          { icon: <Globe className="w-5 h-5" />, title: t("items.changelog.title"), desc: t("items.changelog.desc"), href: "/help/changelog" },
        ],
      },
    ],
  };
}

const navTriggerKeys: MegaMenuKey[] = ["products", "marketplace", "solutions", "resources"];

export function Navbar() {
  const t = useTranslations("nav");
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<MegaMenuKey>(null);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const megaMenuData = getMegaMenuData(t);

  const openMenu = useCallback((key: MegaMenuKey) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveMenu(key);
    setActiveCategory(0);
  }, []);

  const closeMenu = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeMenu]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const triggerLabels: Record<MegaMenuKey, string> = {
    products: t("triggers.products"),
    marketplace: t("triggers.marketplace"),
    solutions: t("triggers.solutions"),
    resources: t("triggers.resources"),
    null: "",
  };

  return (
    <>
      <header
        className={`sticky top-0 z-[70] transition-all duration-300 ${
          isScrolled ? "bg-brand shadow-lg" : "bg-brand"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-10">
              <a href="/" className="flex items-center">
                <span className="text-white font-branded text-2xl font-bold tracking-tight">Ceche</span>
              </a>

              <nav className="hidden lg:flex items-center gap-0" ref={navRef}>
                {navTriggerKeys.map((key) => (
                  <div
                    key={key}
                    onMouseEnter={() => openMenu(key)}
                    onMouseLeave={closeMenu}
                    className="relative"
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                        activeMenu === key
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {triggerLabels[key]}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
                        activeMenu === key ? "rotate-180" : ""
                      }`} />
                    </button>
                    {activeMenu === key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                    )}
                  </div>
                ))}
                <a
                  href="/pricing"
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  {t("links.pricing")}
                </a>
              </nav>
            </div>

            {/* Search Bar - Center */}
            <div className="hidden lg:flex flex-1 max-w-md mx-6">
              <form onSubmit={(e) => { e.preventDefault(); const q = (e.target as HTMLFormElement).querySelector('input')?.value; if (q?.trim()) window.location.href = `/search?q=${encodeURIComponent(q.trim())}`; }} className="flex items-center w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder={t("searchPlaceholder") || "Search domains..."}
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-white/40 outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </form>
            </div>

            {/* Right Nav */}
            <div className="flex items-center gap-3 md:gap-4">
              <LanguageSwitcher />
              <a href="/login" className="hidden md:block text-white/80 hover:text-white text-sm font-medium transition-colors">
                {t("links.login")}
              </a>
              <a href="/signup" className="cta-button hidden sm:inline-flex">
                {t("links.signup")}
              </a>

              {mounted && (
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 -mr-2"
              >
                <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
                <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
              </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {activeMenu && (
        <div
          ref={overlayRef}
          className="mega-menu-overlay hidden lg:block"
          onMouseEnter={cancelClose}
          onMouseLeave={closeMenu}
        >
          <div className="mega-menu-panel">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex pt-8 pb-16" style={{ minHeight: "calc(100vh - 64px)" }}>
                <div
                  className="w-64 flex-shrink-0 pr-6 pt-8 pb-8 overflow-y-auto flex flex-col justify-between"
                  style={{ backgroundColor: "#7A1F21" }}
                >
                  {(Object.keys(megaMenuData) as MegaMenuKey[]).map((sectionKey) => (
                    <div key={sectionKey} className="flex-1">
                      <p className="text-white/50 text-sm font-bold uppercase tracking-wider mb-3 px-3">
                        {triggerLabels[sectionKey]}
                      </p>
                      <div className="space-y-1">
                        {megaMenuData[sectionKey]?.map((cat, i) => (
                          <button
                            key={cat.label}
                            onMouseEnter={() => { setActiveMenu(sectionKey); setActiveCategory(i); }}
                            className={`w-full text-left px-3 py-3.5 text-base font-semibold transition-all flex items-center justify-between rounded-lg ${
                              activeMenu === sectionKey && activeCategory === i
                                ? "text-white"
                                : "text-white/70 hover:text-white"
                            }`}
                            style={activeMenu === sectionKey && activeCategory === i ? { backgroundColor: "#9E2A2B" } : {}}
                          >
                            {cat.label}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-1 pl-12">
                  <div className="flex items-start justify-between mb-10">
                    <div>
                      <p className="text-white/50 text-sm font-bold uppercase tracking-wider mb-2">
                        {megaMenuData[activeMenu]?.[activeCategory]?.label}
                      </p>
                      <p className="text-white/60 text-base">
                        {activeMenu === "products" && "Tools and APIs for domain intelligence"}
                        {activeMenu === "marketplace" && "Buy and sell premium domains"}
                        {activeMenu === "solutions" && "Built for your role and workflow"}
                        {activeMenu === "resources" && "Learn and get support"}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveMenu(null)}
                      className="text-white hover:text-white/80 p-1 mt-0.5 flex-shrink-0"
                    >
                      <X className="w-4 h-4" strokeWidth={3} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                    {megaMenuData[activeMenu]?.[activeCategory]?.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="group"
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-accent mt-0.5 group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-white font-bold text-base group-hover:text-accent transition-colors">
                              {item.title}
                            </p>
                            <p className="text-white/50 text-sm leading-relaxed mt-1.5">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-brand lg:hidden overflow-y-auto">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <span className="text-white font-branded text-2xl font-bold tracking-tight">Ceche</span>
            <button
              onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
              className="text-white/70 hover:text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-4 sm:px-6 pb-8">
            <div className="space-y-1">
              {navTriggerKeys.map((key) => (
                <div key={key}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                    className="w-full flex items-center justify-between py-3 text-white/90 hover:text-white text-base font-medium border-b border-white/10"
                  >
                    {triggerLabels[key]}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === key ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpanded === key && (
                    <div className="pl-4 py-2 space-y-3">
                      {megaMenuData[key]?.map((cat) => (
                        <div key={cat.label}>
                          <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
                            {cat.label}
                          </p>
                          <div className="space-y-2">
                            {cat.items.map((item) => (
                              <a
                                key={item.href}
                                href={item.href}
                                className="flex items-start gap-3 py-2"
                                onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                              >
                                <div className="text-accent mt-0.5">{item.icon}</div>
                                <div>
                                  <p className="text-white font-semibold text-sm">{item.title}</p>
                                  <p className="text-white/50 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a href="/pricing" className="flex items-center justify-between py-3 text-white/90 hover:text-white text-base font-medium border-b border-white/10">
                {t("links.pricing")}
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
              <a href="/login" className="block text-white/80 hover:text-white text-base font-medium">
                {t("links.login")}
              </a>
              <a href="/signup" className="cta-button block text-center">
                {t("links.signup")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
