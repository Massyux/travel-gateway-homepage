import type { Locale } from "@/i18n/routing";

export function pickLocaleField(locale: Locale, fr: string, en: string, ar: string): string {
  switch (locale) {
    case "fr":
      return fr;
    case "ar":
      return ar;
    default:
      return en;
  }
}
