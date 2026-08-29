import { useTranslations } from "next-intl";

export default function PricingPage() {
  const t = useTranslations("pricing");

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold mb-12 text-center">{t("title")}</h1>
        <div className="grid md:grid-cols-4 gap-8">
          {["free", "starter", "pro", "enterprise"].map((plan) => (
            <div key={plan} className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{t(`${plan}.name`)}</h3>
              <div className="text-3xl font-bold mb-4">
                {t(`${plan}.price`)}
                <span className="text-sm text-muted-foreground">{t(`${plan}.period`)}</span>
              </div>
              <ul className="space-y-2">
                {/* Features will be rendered here */}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
