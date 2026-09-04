"use client";

import { NextIntlClientProvider } from "next-intl";

export function IntlProvider({
  messages,
  locale,
  children,
}: {
  messages: Record<string, any>;
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      onError={(error) => {
        if (error.code === "MISSING_MESSAGE") {
          console.error(`[i18n] Missing key: ${error.message}`);
        }
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
