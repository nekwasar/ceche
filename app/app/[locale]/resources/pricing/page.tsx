import { useTranslations } from "next-intl";

export default function ResourcesPricingPage() {
  const t = useTranslations("pricing");

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold mb-12 text-center">{t("title")}</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-black/10 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <div className="text-3xl font-bold mb-4">$0</div>
            <p className="text-sm text-gray-600">3 appraisals/day</p>
          </div>
          <div className="border border-black/10 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold mb-2">Premium Startup</h3>
            <div className="text-3xl font-bold mb-4">$79<span className="text-sm text-gray-500">/mo</span></div>
            <p className="text-sm text-gray-600">30 appraisals/day</p>
          </div>
          <div className="border border-black/10 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold mb-2">Premium Enterprise</h3>
            <div className="text-3xl font-bold mb-4">$129<span className="text-sm text-gray-500">/mo</span></div>
            <p className="text-sm text-gray-600">Unlimited appraisals</p>
          </div>
        </div>
      </div>
    </main>
  );
}
