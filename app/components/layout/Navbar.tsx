"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ChevronDown, BarChart3, Globe, ShoppingCart, Users, BookOpen, Shield, Zap, TrendingUp, Eye, FileSearch, Layers, Database, Gavel, LineChart } from "lucide-react";

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
        { icon: <BarChart3 className="w-5 h-5" />, title: "Domain Appraiser", desc: "16-dimension valuation engine with algorithmic pricing", href: "/tools/appraisal" },
        { icon: <Globe className="w-5 h-5" />, title: "SEO Scanner", desc: "Free domain audit: DA, spam score, backlink profiles", href: "/tools/seo-scanner" },
        { icon: <Eye className="w-5 h-5" />, title: "Extended Insights", desc: "Historical data, DNS, WHOIS, trademark checks", href: "/tools/extended-insights" },
        { icon: <Layers className="w-5 h-5" />, title: "Bulk Analyzer", desc: "Multi-domain batch evaluation at scale", href: "/tools/bulk-analyzer" },
      ],
    },
    {
      label: "Platform",
      items: [
        { icon: <Zap className="w-5 h-5" />, title: "API Access", desc: "RESTful API for programmatic domain intelligence", href: "/tools/api" },
        { icon: <Shield className="w-5 h-5" />, title: "Trademark Monitor", desc: "USPTO/WIPO conflict detection and alerts", href: "/tools/trademark-monitor" },
        { icon: <Database className="w-5 h-5" />, title: "Domain Database", desc: "Comprehensive TLD registry and expiry tracking", href: "/tools/domain-database" },
      ],
    },
  ],
  marketplace: [
    {
      label: "Buy Domains",
      items: [
        { icon: <ShoppingCart className="w-5 h-5" />, title: "Curated Marketplace", desc: "Premium domains sorted by intent score and authority", href: "/marketplace/curated" },
        { icon: <Gavel className="w-5 h-5" />, title: "Try Your Luck", desc: "Gamified blind drops with unmasking pool", href: "/marketplace/try-your-luck" },
        { icon: <FileSearch className="w-5 h-5" />, title: "How Unmasking Works", desc: "Escrow, anti-front-running, and lock mechanism", href: "/marketplace/how-unmasking-works" },
      ],
    },
    {
      label: "Sell Domains",
      items: [
        { icon: <TrendingUp className="w-5 h-5" />, title: "Seller Portal", desc: "Submit domains with TXT/CNAME verification", href: "/marketplace/sell" },
        { icon: <LineChart className="w-5 h-5" />, title: "Pricing Calculator", desc: "Automated listing fee and valuation estimates", href: "/marketplace/pricing" },
      ],
    },
  ],
  solutions: [
    {
      label: "By Role",
      items: [
        { icon: <TrendingUp className="w-5 h-5" />, title: "Domain Investors", desc: "Portfolio yield, flipper metrics, drop-catching alerts", href: "/solutions/domain-investors" },
        { icon: <Zap className="w-5 h-5" />, title: "Startup Founders", desc: "Brandability index, pronunciation, extension tools", href: "/solutions/startup-founders" },
        { icon: <BarChart3 className="w-5 h-5" />, title: "SEO Agencies", desc: "Expired domain authority, spam recovery audits", href: "/solutions/seo-agencies" },
      ],
    },
    {
      label: "By Need",
      items: [
        { icon: <Globe className="w-5 h-5" />, title: "Find Available Domains", desc: "Scan millions of combinations for available names", href: "/solutions/find-available" },
        { icon: <Eye className="w-5 h-5" />, title: "Research Intelligence", desc: "Deep domain analysis before acquisition", href: "/solutions/research-intelligence" },
        { icon: <ShoppingCart className="w-5 h-5" />, title: "Buy Premium Domains", desc: "Acquire high-value domains through escrow", href: "/solutions/buy-premium" },
      ],
    },
  ],
  resources: [
    {
      label: "Learn",
      items: [
        { icon: <BookOpen className="w-5 h-5" />, title: "16-Dimension Framework", desc: "Comprehensive breakdown of valuation metrics", href: "/resources/16-dimension-framework" },
        { icon: <LineChart className="w-5 h-5" />, title: "Market Trends", desc: "Real-time sales data and domain market trends", href: "/resources/market-trends" },
        { icon: <Globe className="w-5 h-5" />, title: "Blog", desc: "Industry insights, guides, and domain news", href: "/resources/blog" },
      ],
    },
    {
      label: "Support",
      items: [
        { icon: <FileSearch className="w-5 h-5" />, title: "Help Center", desc: "Documentation, FAQs, and getting started guides", href: "/resources/help-center" },
        { icon: <Users className="w-5 h-5" />, title: "Contact", desc: "Reach our team for support or partnerships", href: "/resources/contact" },
        { icon: <Zap className="w-5 h-5" />, title: "Changelog", desc: "Product updates and new feature releases", href: "/resources/changelog" },
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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeMenu]);

  const handleMenuToggle = (key: MegaMenuKey) => {
    setActiveMenu(activeMenu === key ? null : key);
    setActiveCategory(0);
  };

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
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                  <span className="text-slate font-bold text-lg">C</span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">Ceche</span>
              </a>

              <nav className="hidden lg:flex items-center gap-1" ref={menuRef}>
                {navTriggers.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleMenuToggle(key)}
                    className={`nav-trigger px-3 py-2 rounded-md transition-colors ${
                      activeMenu === key ? "bg-white/10 text-accent" : ""
                    }`}
                  >
                    {label}
                    <ChevronDown className={`w-3.5 h-3.5 ml-0.5 transition-transform ${
                      activeMenu === key ? "rotate-180" : ""
                    }`} />
                  </button>
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
        <div className="mega-menu-overlay" onClick={() => setActiveMenu(null)}>
          <div
            className="mega-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                    <span className="text-slate font-bold text-lg">C</span>
                  </div>
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
                <div className="w-64 flex-shrink-0 border-r border-white/10 pr-6 pt-8">
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4 px-3">
                    {activeMenu === "products" && "Products"}
                    {activeMenu === "marketplace" && "Marketplace"}
                    {activeMenu === "solutions" && "Solutions"}
                    {activeMenu === "resources" && "Resources"}
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat, i) => (
                      <button
                        key={cat.label}
                        onClick={() => setActiveCategory(i)}
                        className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                          activeCategory === i
                            ? "bg-white/15 text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {cat.label}
                        {activeCategory === i && (
                          <span className="ml-2 text-accent">→</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 pl-10 pt-8">
                  <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-6">
                    {categories[activeCategory]?.label}
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories[activeCategory]?.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="content-card group"
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-accent mt-0.5 group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <div>
                            <p className="content-card-title group-hover:text-accent transition-colors">
                              {item.title}
                            </p>
                            <p className="content-card-desc">{item.desc}</p>
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
