"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ChevronDown, ChevronRight, BarChart3, Globe, ShoppingCart, Users, BookOpen, Shield, Rocket, TrendingUp, Eye, FileSearch, Layers, Database, Gavel, Code } from "lucide-react";
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

const megaMenuData: Record<MegaMenuKey, MegaMenuCategory[]> = {
  products: [
    {
      label: "Intelligence",
      items: [
        { icon: <Globe className="w-5 h-5" />, title: "Domain Lookup", desc: "Free tool: WHOIS data, DNS records.", href: "/tools/domain-lookup" },
        { icon: <BarChart3 className="w-5 h-5" />, title: "16-Dimension Appraisal", desc: "Deep domain valuation with 16 metric breakdowns and market-based pricing.", href: "/appraise" },
        { icon: <Globe className="w-5 h-5" />, title: "Domain Scanner", desc: "Premium tool: DA, spam score, backlink profiles, and indexation status. Requires subscription.", href: "/tools/seo-scanner" },
        { icon: <Eye className="w-5 h-5" />, title: "Extended Insights", desc: "Premium tool: deep DNS records, USPTO/WIPO trademarks, and WHOIS history.", href: "/tools/extended-insights" },
        { icon: <Layers className="w-5 h-5" />, title: "Bulk Domain Audit", desc: "Premium tool: batch process and analyze up to 1000 domains at once.", href: "/tools/bulk-analyzer" },
      ],
    },
    {
      label: "Platform",
      items: [
        { icon: <Code className="w-5 h-5" />, title: "API Access", desc: "RESTful API for programmatic domain intelligence at scale.", href: "/tools/api" },
        { icon: <Shield className="w-5 h-5" />, title: "Trademark Monitor", desc: "USPTO/WIPO conflict detection and automated alerts.", href: "/tools/trademark-monitor" },
        { icon: <Database className="w-5 h-5" />, title: "Domain Database", desc: "Comprehensive TLD registry and expiry tracking.", href: "/tools/domain-database" },
      ],
    },
  ],
  marketplace: [
    {
      label: "Buy Domains",
      items: [
        { icon: <ShoppingCart className="w-5 h-5" />, title: "Standard Marketplace", desc: "Browse premium domains with full stats. Name hidden — pay to reveal.", href: "/marketplace" },
        { icon: <Layers className="w-5 h-5" />, title: "Curated Domains", desc: "Hand-picked premium domains verified by our team.", href: "/marketplace/curated" },
        { icon: <Gavel className="w-5 h-5" />, title: "Try Your Luck", desc: "Pick a TLD, spin 3 boxes, reveal a premium domain. Locked exclusively for you.", href: "/marketplace/try-your-luck" },
      ],
    },
    {
      label: "Sell Domains",
      items: [
        { icon: <TrendingUp className="w-5 h-5" />, title: "List a Domain", desc: "Sell your premium domain on Ceche. $5-$10 listing fee, 8-15% commission.", href: "/marketplace/sell" },
      ],
    },
  ],
  solutions: [
    {
      label: "By Role",
      items: [
        { icon: <TrendingUp className="w-5 h-5" />, title: "Domain Investors", desc: "Portfolio yield tracking, flipper valuation, and drop-catching alerts.", href: "/solutions/domain-investors" },
        { icon: <Rocket className="w-5 h-5" />, title: "Startup Founders", desc: "Brandability index, pronounceability, and extension checking.", href: "/solutions/startup-founders" },
        { icon: <BarChart3 className="w-5 h-5" />, title: "SEO Agencies", desc: "Expired domain backlink authority scoring and spam recovery audits.", href: "/solutions/seo-agencies" },
      ],
    },
    {
      label: "By Need",
      items: [
        { icon: <Globe className="w-5 h-5" />, title: "Find Available Domains", desc: "Scan millions of combinations for available premium names.", href: "/solutions/find-available" },
        { icon: <Eye className="w-5 h-5" />, title: "Research Intelligence", desc: "Deep domain analysis before acquisition decisions.", href: "/solutions/research-intelligence" },
        { icon: <ShoppingCart className="w-5 h-5" />, title: "Buy Premium Domains", desc: "Acquire high-value domains through escrow-protected transactions.", href: "/solutions/buy-premium" },
      ],
    },
  ],
  resources: [
    {
      label: "Explore",
      items: [
        { icon: <BookOpen className="w-5 h-5" />, title: "Blog", desc: "Domain investing tips, platform updates, and industry insights.", href: "/resources/blog" },
        { icon: <FileSearch className="w-5 h-5" />, title: "Ebooks", desc: "In-depth guides on domain valuation, SEO, and brand strategy.", href: "/resources/ebooks" },
        { icon: <Users className="w-5 h-5" />, title: "Case Studies", desc: "Real stories from domain investors and startup founders.", href: "/resources/case-studies" },
      ],
    },
    {
      label: "Support",
      items: [
        { icon: <FileSearch className="w-5 h-5" />, title: "Help Center", desc: "Documentation, FAQs, and getting started guides.", href: "/help" },
        { icon: <BookOpen className="w-5 h-5" />, title: "API Docs", desc: "API reference, authentication, and integration guides.", href: "/help/api" },
        { icon: <Users className="w-5 h-5" />, title: "Contact", desc: "Reach our team for support or partnerships.", href: "/help/contact" },
        { icon: <Globe className="w-5 h-5" />, title: "Changelog", desc: "Product updates and new feature releases.", href: "/changelog" },
      ],
    },
  ],
};

const navTriggers: { key: MegaMenuKey; label: string }[] = [
  { key: "products", label: "Products" },
  { key: "marketplace", label: "Marketplace" },
  { key: "solutions", label: "Solutions" },
  { key: "resources", label: "Resources" },
];

const navLinks: { label: string; href: string }[] = [
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
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
                {navTriggers.map(({ key, label }) => (
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
                      {label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
                        activeMenu === key ? "rotate-180" : ""
                      }`} />
                    </button>
                    {activeMenu === key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                    )}
                  </div>
                ))}
                {navLinks.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-5">
              <button className="hidden md:flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <LanguageSwitcher />
              <a href="/login" className="hidden md:block text-white/80 hover:text-white text-sm font-medium transition-colors">
                Log In
              </a>
              <a href="/signup" className="cta-button hidden sm:inline-flex">
                Signup Free
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
                        {sectionKey === "products" && "Products"}
                        {sectionKey === "marketplace" && "Marketplace"}
                        {sectionKey === "solutions" && "Solutions"}
                        {sectionKey === "resources" && "Resources"}
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
              {navTriggers.map(({ key, label }) => (
                <div key={key}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                    className="w-full flex items-center justify-between py-3 text-white/90 hover:text-white text-base font-medium border-b border-white/10"
                  >
                    {label}
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
                Pricing
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
              <a href="/login" className="block text-white/80 hover:text-white text-base font-medium">
                Log In
              </a>
              <a href="/signup" className="cta-button block text-center">
                Signup Free
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
