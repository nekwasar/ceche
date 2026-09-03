"use client";

import { useAuth } from "@/lib/auth-context";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function AppHeader() {
  const { user, logout } = useAuth();
  const t = useTranslations("appHeader");

  return (
    <header className="border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-bold text-primary">Ceche</a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm hover:text-primary">{t("home")}</a>
            <a href="/appraise" className="text-sm hover:text-primary">{t("appraise")}</a>
            <a href="/scan" className="text-sm hover:text-primary">{t("scanner")}</a>
            <a href="/marketplace" className="text-sm hover:text-primary">{t("marketplace")}</a>
            <a href="/api-keys" className="text-sm hover:text-primary">{t("apiKeys")}</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <button onClick={() => { logout(); window.location.href = "/login"; }} className="text-sm hover:text-primary">
            {t("logout")}
          </button>
        </div>
      </nav>
    </header>
  );
}
