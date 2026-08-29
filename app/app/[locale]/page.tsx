import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export default function HomePage() {
  const t = useTranslations("home");
  const nav = useTranslations("nav");

  return (
    <main className="min-h-screen">
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-bold text-primary">Ceche</a>
            <div className="hidden md:flex items-center gap-6">
              <a href="/platform" className="text-sm hover:text-primary">{nav("platform")}</a>
              <a href="/solutions" className="text-sm hover:text-primary">{nav("solutions")}</a>
              <a href="/resources" className="text-sm hover:text-primary">{nav("resources")}</a>
              <a href="/pricing" className="text-sm hover:text-primary">{nav("pricing")}</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a href="/login" className="text-sm hover:text-primary">{nav("login")}</a>
            <a href="/signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
              {nav("getStarted")}
            </a>
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("title")}</h1>
          <p className="text-xl text-muted-foreground mb-8">{t("subtitle")}</p>
          <a href="/signup" className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-lg font-medium hover:opacity-90">
            {t("cta")}
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{t("features.appraiser.title")}</h3>
            <p className="text-muted-foreground">{t("features.appraiser.description")}</p>
          </div>
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{t("features.scanner.title")}</h3>
            <p className="text-muted-foreground">{t("features.scanner.description")}</p>
          </div>
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{t("features.marketplace.title")}</h3>
            <p className="text-muted-foreground">{t("features.marketplace.description")}</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>© 2026 Ceche. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
