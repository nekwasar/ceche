import { useTranslations } from "next-intl";

export default function PlatformPage() {
  const t = useTranslations("platform");

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
        <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
      </div>
    </main>
  );
}
