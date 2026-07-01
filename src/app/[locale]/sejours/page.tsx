"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { stays, STAY_TYPES, type StayType } from "@/content/stays";
import { formatPrice } from "@/lib/currency";

const COUNTRY_LIST = Array.from(
  new Map(stays.map((s) => [s.countryCode, s.country])).entries()
);

const PRICE_RANGES = [
  { id: "all",  max: Infinity, label: { fr: "Tous prix",  en: "All prices", ar: "كل الأسعار" } },
  { id: "low",  max: 100,      label: { fr: "< 100 €/nuit", en: "< €100/night", ar: "< 100 €/ليلة" } },
  { id: "mid",  max: 160,      label: { fr: "100–160 €/nuit", en: "€100–160/night", ar: "100–160 €/ليلة" } },
  { id: "high", max: Infinity, label: { fr: "> 160 €/nuit", en: "> €160/night", ar: "> 160 €/ليلة" } },
];

const TYPE_OPTIONS: { value: StayType | "all"; label: Record<Locale, string> }[] = [
  { value: "all",         label: { fr: "Tous types",    en: "All types",   ar: "كل الأنواع" } },
  { value: "villa",       label: STAY_TYPES.villa },
  { value: "appartement", label: STAY_TYPES.appartement },
  { value: "maison-hote", label: STAY_TYPES["maison-hote"] },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
      ★ {rating.toFixed(1)}
    </span>
  );
}

export default function SejoursPage() {
  const locale = useLocale() as Locale;
  const [typeFilter, setTypeFilter] = useState<StayType | "all">("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return stays.filter((s) => {
      if (typeFilter !== "all" && s.type !== typeFilter) return false;
      if (countryFilter !== "all" && s.countryCode !== countryFilter) return false;
      const range = PRICE_RANGES.find((r) => r.id === priceFilter);
      if (range && range.id !== "all") {
        if (range.id === "low" && s.pricePerNight >= 100) return false;
        if (range.id === "mid" && (s.pricePerNight < 100 || s.pricePerNight > 160)) return false;
        if (range.id === "high" && s.pricePerNight <= 160) return false;
      }
      return true;
    });
  }, [typeFilter, countryFilter, priceFilter]);

  const t = {
    title:   { fr: "Séjours", en: "Stays", ar: "الإقامات" }[locale],
    subtitle:{ fr: "Villas, appartements et maisons d'hôtes soigneusement sélectionnés dans les plus belles destinations.", en: "Villas, apartments and guesthouses carefully selected across the finest destinations.", ar: "فيلات وشقق ودور ضيافة مختارة بعناية في أجمل الوجهات." }[locale],
    type:    { fr: "Type", en: "Type", ar: "النوع" }[locale],
    country: { fr: "Pays", en: "Country", ar: "البلد" }[locale],
    price:   { fr: "Budget", en: "Budget", ar: "الميزانية" }[locale],
    allCountries: { fr: "Tous les pays", en: "All countries", ar: "كل الدول" }[locale],
    perNight:{ fr: "/ nuit", en: "/ night", ar: "/ ليلة" }[locale],
    capacity:{ fr: "pers.", en: "guests", ar: "ضيوف" }[locale],
    bedrooms:{ fr: "chambres", en: "bedrooms", ar: "غرف نوم" }[locale],
    noResult:{ fr: "Aucun séjour ne correspond à ces critères.", en: "No stays match these filters.", ar: "لا توجد إقامات تتوافق مع هذه المعايير." }[locale],
    book:    { fr: "Réserver", en: "Book now", ar: "احجز الآن" }[locale],
  };

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <div className="bg-navy-950 px-6 py-16 text-center text-white">
        <span className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-semibold text-white/90">
          {{ fr: "Locations de vacances", en: "Holiday rentals", ar: "تأجير العطل" }[locale]}
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">{t.title}</h1>
        <p className="mt-3 text-white/70 max-w-xl mx-auto">{t.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-30 border-b border-navy-900/10 bg-white/95 backdrop-blur-md px-6 py-4">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-3">
          {/* Type */}
          <div className="flex gap-1 flex-wrap">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTypeFilter(opt.value as StayType | "all")}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  typeFilter === opt.value
                    ? "border-teal-500 bg-teal-500 text-white"
                    : "border-navy-900/15 text-navy-800 hover:bg-navy-100"
                }`}
              >
                {opt.label[locale]}
              </button>
            ))}
          </div>
          {/* Country */}
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="rounded-full border border-navy-900/15 bg-white px-4 py-1.5 text-sm text-navy-800 outline-none focus:border-teal-500"
          >
            <option value="all">{t.allCountries}</option>
            {COUNTRY_LIST.map(([code, name]) => (
              <option key={code} value={code}>{name[locale]}</option>
            ))}
          </select>
          {/* Price */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="rounded-full border border-navy-900/15 bg-white px-4 py-1.5 text-sm text-navy-800 outline-none focus:border-teal-500"
          >
            {PRICE_RANGES.map((r) => (
              <option key={r.id} value={r.id}>{r.label[locale]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-navy-800/60">{t.noResult}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((stay) => (
              <article key={stay.id} className="group overflow-hidden rounded-3xl bg-white shadow-sm shadow-navy-950/5 ring-1 ring-navy-900/8 hover:shadow-xl transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={stay.image}
                    alt={stay.name}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 48vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 start-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy-900">
                    {STAY_TYPES[stay.type][locale]}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">
                        {stay.city[locale]}, {stay.country[locale]}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-navy-950">{stay.name}</h3>
                    </div>
                    <div className="shrink-0 text-end">
                      <StarRating rating={stay.rating} />
                      <p className="text-xs text-navy-800/50">{stay.reviewCount} avis</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-navy-800/70 line-clamp-2">{stay.description[locale]}</p>
                  <div className="mt-3 flex gap-3 text-xs text-navy-800/60">
                    <span>👥 {stay.capacity} {t.capacity}</span>
                    <span>🛏️ {stay.bedrooms} {t.bedrooms}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-display text-xl font-semibold text-navy-950">
                      {formatPrice(stay.pricePerNight, "EUR", locale)}
                      <span className="text-sm font-normal text-navy-800/60"> {t.perNight}</span>
                    </p>
                    <button
                      type="button"
                      className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
                    >
                      {t.book}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
