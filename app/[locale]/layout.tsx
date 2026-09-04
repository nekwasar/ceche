import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { Providers } from "@/components/Providers";
import { SubdomainLayout } from "@/components/layout/SubdomainLayout";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Ceche - Domain Discovery Platform",
  description: "Find premium domains before anyone else",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <SubdomainLayout>{children}</SubdomainLayout>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
