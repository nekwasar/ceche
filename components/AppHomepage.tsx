"use client";

import { useAuth } from "@/lib/auth-context";
import { useTranslations } from "next-intl";

export function AppHomepage() {
  const { user } = useAuth();
  const t = useTranslations("home.app");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("welcomeBack", { name: user?.name || "User" })}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">{t("plan")}</h3>
          <p className="text-2xl font-bold text-primary capitalize">{user?.plan || "free"}</p>
        </div>
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">{t("quickActions")}</h3>
          <div className="space-y-2">
            <a href="/appraise" className="block text-primary hover:underline">{t("appraiseDomain")}</a>
            <a href="/scan" className="block text-primary hover:underline">{t("startScan")}</a>
            <a href="/marketplace" className="block text-primary hover:underline">{t("browseMarketplace")}</a>
          </div>
        </div>
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">{t("apiKeys")}</h3>
          <a href="/api-keys" className="text-primary hover:underline">{t("manageKeys")}</a>
        </div>
      </div>
    </main>
  );
}
