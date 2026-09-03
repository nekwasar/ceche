import { getTranslations } from "next-intl/server";

export default async function ResourcesPage() {
  const t = await getTranslations("res.index");

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
        <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
      </div>
    </main>
  );
}
