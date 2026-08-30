"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ChevronDown, ChevronRight, BarChart3, Globe, ShoppingCart, Users, BookOpen, Shield, Zap, TrendingUp, Eye, FileSearch, Layers, Database, Gavel, LineChart } from "lucide-react";

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
        { icon: <BarChart3 className="w-5 h-5" />, title: "16-Dimension Appraisal", desc: "Algorithmic domain valuation engine with 16 metric breakdowns and market-based pricing.", href: "/tools/appraisal" },
        { icon: <Globe className="w-5 h-5" />, title: "Free SEO Scanner", desc: "Check DA, spam score, backlink profiles, and indexation status across search engines.", href: "/tools/seo-scanner" },
        { icon: <Eye className="w-5 h-5" />, title: "Extended Insights Tool", desc: "Uncover deep DNS records, USPTO/WIPO trademarks, and WHOIS history.", href: "/tools/extended-insights" },
        { icon: <Layers className="w-5 h-5" />, title: "Bulk Domain Audit", desc: "Batch process and analyze multi-domain lists simultaneously.", href: "/tools/bulk-analyzer" },
      ],
    },
    {
      label: "Platform",
      items: [
        { icon: <Zap className="w-5 h-5" />, title: "API Access", desc: "RESTful API for programmatic domain intelligence at scale.", href: "/tools/api" },
        { icon: <Shield className="w-5 h-5" />, title: "Trademark Monitor", desc: "USPTO/WIPO conflict detection and automated alerts.", href: "/tools/trademark-monitor" },
        { icon: <Database className="w-5 h-5" />, title: "Domain Database", desc: "Comprehensive TLD registry and expiry tracking.", href: "/tools/domain-database" },
      ],
    },
  ],
  marketplace: [
    {
      label: "Buy & Unmask",
      items: [
        { icon: <ShoppingCart className="w-5 h-5" />, title: "Curated Premium Inventory", desc: "Browse hand-picked available domains with visible intent scores.", href: "/marketplace/curated" },
        { icon: <Gavel className="w-5 h-5" />, title: "Try Your Luck Tier", desc: "Gamified blind domain drops across .com, .net, and .co names.", href: "/marketplace/try-your-luck" },
        { icon: <FileSearch className="w-5 h-5" />, title: "How Unmasking Works", desc: "Learn about the 5-minute lock mechanism and instant escrow.", href: "/marketplace/how-unmasking-works" },
      ],
    },
    {
      label: "Sell & List",
      items: [
        { icon: <TrendingUp className="w-5 h-5" />, title: "List Premium Domain", desc: "Submit high-value domains for resale with verification checks.", href: "/marketplace/sell" },
        { icon: <LineChart className="w-5 h-5" />, title: "Seller Fee Structure", desc: "Review listing fees, commission rates, and payout mechanics.", href: "/marketplace/pricing" },
      ],
    },
  ],
  solutions: [
    {
      label: "By Role",
      items: [
        { icon: <TrendingUp className="w-5 h-5" />, title: "Domain Investors", desc: "Portfolio yield tracking, flipper valuation, and drop-catching alerts.", href: "/solutions/domain-investors" },
        { icon: <Zap className="w-5 h-5" />, title: "Startup Founders", desc: "Brandability index, pronounceability, and extension checking.", href: "/solutions/startup-founders" },
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
      label: "Documentation",
      items: [
        { icon: <BookOpen className="w-5 h-5" />, title: "16-Dimension Framework", desc: "Transparent documentation explaining the valuation model.", href: "/resources/16-dimension-framework" },
        { icon: <LineChart className="w-5 h-5" />, title: "Domain Sales Trends", desc: "Historical sales data, TLD liquidity, and market reports.", href: "/resources/market-trends" },
        { icon: <Globe className="w-5 h-5" />, title: "Platform Pricing", desc: "Compare Free Tier features, Extended Insight credits, and seller fees.", href: "/resources/pricing" },
      ],
    },
    {
      label: "Support",
      items: [
        { icon: <FileSearch className="w-5 h-5" />, title: "Help Center", desc: "Documentation, FAQs, and getting started guides.", href: "/resources/help-center" },
        { icon: <Users className="w-5 h-5" />, title: "Contact", desc: "Reach our team for support or partnerships.", href: "/resources/contact" },
        { icon: <Zap className="w-5 h-5" />, title: "Changelog", desc: "Product updates and new feature releases.", href: "/resources/changelog" },
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

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const categories = activeMenu ? megaMenuData[activeMenu] : [];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-brand shadow-lg" : "bg-brand"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-10">
              <a href="/" className="flex items-center">
                <span className="text-white font-bold text-xl tracking-tight">Ceche</span>
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
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <a href="/login" className="hidden md:block text-white/80 hover:text-white text-sm font-medium transition-colors">
                Log In
              </a>
              <a href="/tools/appraisal" className="cta-button hidden sm:inline-flex">
                Appraise Domain
              </a>
            </div>
          </div>
        </div>
      </header>

      {activeMenu && (
        <div
          ref={overlayRef}
          className="mega-menu-overlay"
          onMouseEnter={cancelClose}
          onMouseLeave={closeMenu}
        >
          <div className="mega-menu-panel">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <span className="text-white font-bold text-xl tracking-tight">Ceche</span>
                </div>
                <button
                  onClick={() => setActiveMenu(null)}
                  className="text-white/70 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex min-h-[calc(100vh-4rem)] pb-16">
                <div
                  className="w-56 flex-shrink-0 pr-6 pt-8"
                  style={{ backgroundColor: "#7A1F21" }}
                >
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4 px-3">
                    {activeMenu === "products" && "Products"}
                    {activeMenu === "marketplace" && "Marketplace"}
                    {activeMenu === "solutions" && "Solutions"}
                    {activeMenu === "resources" && "Resources"}
                  </p>
                  <div className="space-y-0">
                    {categories.map((cat, i) => (
                      <button
                        key={cat.label}
                        onMouseEnter={() => setActiveCategory(i)}
                        className={`w-full text-left px-3 py-3 text-sm font-medium transition-all flex items-center justify-between ${
                          activeCategory === i
                            ? "text-white"
                            : "text-white/60 hover:text-white"
                        }`}
                        style={activeCategory === i ? { backgroundColor: "#9E2A2B" } : {}}
                      >
                        {cat.label}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 pl-10 pt-8">
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
                    {categories[activeCategory]?.label}
                  </p>
                  <p className="text-white/50 text-sm mb-8">
                    {activeMenu === "products" && "Tools and APIs for domain intelligence"}
                    {activeMenu === "marketplace" && "Buy and sell premium domains"}
                    {activeMenu === "solutions" && "Built for your role and workflow"}
                    {activeMenu === "resources" && "Learn and get support"}
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                    {categories[activeCategory]?.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="group"
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-accent mt-0.5 group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm group-hover:text-accent transition-colors">
                              {item.title}
                            </p>
                            <p className="text-white/50 text-xs leading-relaxed mt-1">
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
    </>
  );
}
