"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/currency";
import { useCurrency } from "./CurrencyProvider";

export default function Price({
  amountEur,
  className,
}: {
  amountEur: number;
  className?: string;
}) {
  const { currency } = useCurrency();
  const locale = useLocale() as Locale;

  return <span className={className}>{formatPrice(amountEur, currency, locale)}</span>;
}
