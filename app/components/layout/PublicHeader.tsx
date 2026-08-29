"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function PublicHeader() {
  const nav = useTranslations("nav");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-bold text-primary">Ceche</a>
          <div className="hidden md:flex items-center gap-6">
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("platform")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm hover:text-primary flex items-center gap-1">
                {nav("platform")}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "platform" && (
                <div className="absolute top-full left-0 w-64 bg-background border border-border rounded-lg shadow-lg p-2 z-50">
                  <a href="/platform/domain-appraiser" className="block px-3 py-2 text-sm rounded hover:bg-muted">
                    <span className="font-medium">Domain Appraiser</span>
                    <span className="block text-xs text-muted-foreground">Score any domain</span>
                  </a>
                  <a href="/platform/domain-scanner" className="block px-3 py-2 text-sm rounded hover:bg-muted">
                    <span className="font-medium">Domain Scanner</span>
                    <span className="block text-xs text-muted-foreground">Find available domains</span>
                  </a>
                  <a href="/platform/domain-marketplace" className="block px-3 py-2 text-sm rounded hover:bg-muted">
                    <span className="font-medium">Marketplace</span>
                    <span className="block text-xs text-muted-foreground">Buy premium domains</span>
                  </a>
                  <a href="/platform/intelligence-profile" className="block px-3 py-2 text-sm rounded hover:bg-muted">
                    <span className="font-medium">Intelligence</span>
                    <span className="block text-xs text-muted-foreground">Deep analysis</span>
                  </a>
                  <a href="/platform/name-suggestions" className="block px-3 py-2 text-sm rounded hover:bg-muted">
                    <span className="font-medium">Name Suggestions</span>
                    <span className="block text-xs text-muted-foreground">Generate ideas</span>
                  </a>
                  <a href="/platform/api" className="block px-3 py-2 text-sm rounded hover:bg-muted">
                    <span className="font-medium">API Access</span>
                    <span className="block text-xs text-muted-foreground">Build with us</span>
                  </a>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("solutions")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm hover:text-primary flex items-center gap-1">
                {nav("solutions")}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "solutions" && (
                <div className="absolute top-full left-0 w-80 bg-background border border-border rounded-lg shadow-lg p-2 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">By Use Case</p>
                      <a href="/solutions/use-cases/find-available-domain-names" className="block px-3 py-2 text-sm rounded hover:bg-muted">Find Available Domains</a>
                      <a href="/solutions/use-cases/research-domain-intelligence" className="block px-3 py-2 text-sm rounded hover:bg-muted">Research Intelligence</a>
                      <a href="/solutions/use-cases/buy-premium-domains" className="block px-3 py-2 text-sm rounded hover:bg-muted">Buy Premium Domains</a>
                    </div>
                    <div>
                      <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">By Industry</p>
                      <a href="/solutions/industries/startups" className="block px-3 py-2 text-sm rounded hover:bg-muted">Startups</a>
                      <a href="/solutions/industries/agencies" className="block px-3 py-2 text-sm rounded hover:bg-muted">Agencies</a>
                      <a href="/solutions/industries/enterprises" className="block px-3 py-2 text-sm rounded hover:bg-muted">Enterprises</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm hover:text-primary flex items-center gap-1">
                {nav("resources")}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "resources" && (
                <div className="absolute top-full right-0 w-80 bg-background border border-border rounded-lg shadow-lg p-2 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">Learn</p>
                      <a href="/resources/blog" className="block px-3 py-2 text-sm rounded hover:bg-muted">Blog</a>
                      <a href="/resources/guides" className="block px-3 py-2 text-sm rounded hover:bg-muted">Guides</a>
                      <a href="/resources/customer-stories" className="block px-3 py-2 text-sm rounded hover:bg-muted">Customer Stories</a>
                    </div>
                    <div>
                      <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">Support</p>
                      <a href="/resources/help-center" className="block px-3 py-2 text-sm rounded hover:bg-muted">Help Center</a>
                      <a href="/resources/contact" className="block px-3 py-2 text-sm rounded hover:bg-muted">Contact</a>
                      <a href="/resources/community" className="block px-3 py-2 text-sm rounded hover:bg-muted">Community</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="/pricing" className="text-sm hover:text-primary">{nav("pricing")}</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a href="/login" className="text-sm hover:text-primary">{nav("login")}</a>
          <a
            href="/signup"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
          >
            {nav("getStarted")}
          </a>
        </div>
      </nav>
    </header>
  );
}
