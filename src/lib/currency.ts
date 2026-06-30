import type { Locale } from "@/i18n/routing";

export const CURRENCIES = ["EUR", "USD", "DZD"] as const;
export type Currency = (typeof CURRENCIES)[number];

/**
 * Fixed, manually maintained, indicative rates (EUR -> currency).
 * Not a live feed — see specs/001-homepage-phase-2/research.md R3.
 * Update occasionally; actual payment always happens on the B2B/B2C platforms.
 */
const RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  DZD: 145,
};

const INTL_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
  ar: "ar",
};

export function convertFromEur(amountEur: number, currency: Currency): number {
  return amountEur * RATES[currency];
}

export function formatPrice(
  amountEur: number,
  currency: Currency,
  locale: Locale
): string {
  const amount = convertFromEur(amountEur, currency);
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "DZD" ? 0 : 2,
  }).format(amount);
}
