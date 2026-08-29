export const locales = ['en', 'fr', 'de', 'es', 'pt', 'ko', 'zh', 'ja', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português',
  ko: '한국어',
  zh: '中文',
  ja: '日本語',
  it: 'Italiano',
};
