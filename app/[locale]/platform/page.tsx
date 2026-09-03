"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t("welcome", { name: user?.name || "User" })}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">{t("plan")}</h3>
          <p className="text-2xl font-bold text-primary capitalize">{user?.plan || "free"}</p>
        </div>
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">{t("apiKeys")}</h3>
          <a href="/api-keys" className="text-primary hover:underline">{t("manageKeys")}</a>
        </div>
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">{t("quickActions")}</h3>
          <div className="space-y-2">
            <a href="/appraise" className="block text-primary hover:underline">{t("appraise")}</a>
            <a href="/scan" className="block text-primary hover:underline">{t("scan")}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
