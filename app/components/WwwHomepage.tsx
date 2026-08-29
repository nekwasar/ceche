"use client";

import { useTranslations } from "next-intl";

export function WwwHomepage() {
  const t = useTranslations("home");

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("title")}</h1>
          <p className="text-xl text-muted-foreground mb-8">{t("subtitle")}</p>
          <a
            href="/signup"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-lg font-medium hover:opacity-90"
          >
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by domain professionals</h2>
          <div className="grid md:grid-cols-4 gap-8 text-muted-foreground">
            <div>
              <p className="text-3xl font-bold text-primary">50K+</p>
              <p className="text-sm">Domains Appraised</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">10K+</p>
              <p className="text-sm">Available Domains Found</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">99.9%</p>
              <p className="text-sm">Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">69ms</p>
              <p className="text-sm">Cold Start</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
