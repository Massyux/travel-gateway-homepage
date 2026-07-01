"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { agencies, type Agency, type AgencyPackage } from "@/content/agencies-marketplace";
import { formatPrice } from "@/lib/currency";

/* ─── Star rating ─── */
function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "text-lg" : "text-sm";
  return (
    <span className={`flex items-center gap-1 font-semibold text-amber-500 ${cls}`}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span className="text-navy-800/50 font-normal">({rating})</span>
    </span>
  );
}

/* ─── Package card inside the modal ─── */
function PackageCard({ pkg, locale }: { pkg: AgencyPackage; locale: Locale }) {
  return (
    <div className="rounded-2xl bg-sand-50 overflow-hidden ring-1 ring-navy-900/8">
      <div className="relative h-40">
        <Image src={pkg.image} alt={pkg.destination[locale]} fill sizes="40vw" className="object-cover" />
      </div>
      <div className="p-4">
        <p className="font-display text-base font-semibold text-navy-950">{pkg.destination[locale]}</p>
        <p className="text-sm text-navy-800/60">{pkg.duration[locale]}</p>
        <ul className="mt-2 space-y-0.5">
          {pkg.includes[locale].map((item, i) => (
            <li key={i} className="flex gap-1.5 text-xs text-navy-800/80">
              <span className="text-teal-500 shrink-0">✓</span>{item}
            </li>
          ))}
        </ul>
        <p className="mt-3 font-display text-xl font-semibold text-navy-950">
          {formatPrice(pkg.pricePerPerson, "EUR", locale)}
          <span className="text-sm font-normal text-navy-800/60">
            {" "}/ {{ fr: "pers.", en: "person", ar: "شخص" }[locale]}
          </span>
        </p>
        <button
          type="button"
          className="mt-3 w-full rounded-xl bg-teal-500 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
        >
          {{ fr: "Demander un devis", en: "Request a quote", ar: "طلب عرض سعر" }[locale]}
        </button>
      </div>
    </div>
  );
}

/* ─── Agency detail modal ─── */
function AgencyModal({ agency, locale, onClose }: { agency: Agency; locale: Locale; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy-950/60 px-0 sm:px-6" onClick={onClose}>
      <div
        className="w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover */}
        <div className="relative h-48 sm:h-60">
          <Image src={agency.coverImage} alt={agency.name} fill sizes="90vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 end-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            ✕
          </button>
          <div className="absolute bottom-4 start-4 text-white">
            <h2 className="font-display text-2xl font-semibold">{agency.name}</h2>
            <p className="text-sm text-white/80">{agency.city[locale]}, {agency.country[locale]}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Stars rating={agency.rating} size="lg" />
            <span className="text-sm text-navy-800/60">{agency.reviewCount} {{ fr: "avis", en: "reviews", ar: "تقييم" }[locale]}</span>
            <span className="text-sm text-navy-800/60">📍 {agency.address}</span>
            <span className="text-sm text-navy-800/60">📞 {agency.phone}</span>
          </div>

          <p className="mt-4 text-navy-800/80">{agency.description[locale]}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {agency.specialties[locale].map((s) => (
              <span key={s} className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">{s}</span>
            ))}
          </div>

          {/* Packages */}
          <h3 className="mt-6 font-display text-lg font-semibold text-navy-950">
            {{ fr: "Nos voyages organisés", en: "Our organised tours", ar: "جولاتنا المنظمة" }[locale]}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {agency.packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} locale={locale} />
            ))}
          </div>

          {/* Reviews */}
          <h3 className="mt-6 font-display text-lg font-semibold text-navy-950">
            {{ fr: "Avis clients", en: "Client reviews", ar: "تقييمات العملاء" }[locale]}
          </h3>
          <div className="mt-3 space-y-3">
            {agency.reviews.map((r, i) => (
              <div key={i} className="rounded-2xl bg-sand-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-navy-950">{r.author}</span>
                  <span className="text-amber-500 text-sm">{"★".repeat(r.rating)}</span>
                  <span className="text-xs text-navy-800/40">{r.date}</span>
                </div>
                <p className="mt-1 text-sm text-navy-800/80">{r.text[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Agency card in listing ─── */
function AgencyCard({ agency, locale, onSelect }: { agency: Agency; locale: Locale; onSelect: () => void }) {
  const minPrice = Math.min(...agency.packages.map((p) => p.pricePerPerson));
  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm shadow-navy-950/5 ring-1 ring-navy-900/8 hover:shadow-xl transition-shadow"
      onClick={onSelect}
    >
      <div className="relative h-52">
        <Image
          src={agency.coverImage}
          alt={agency.name}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 48vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 start-4 text-white">
          <p className="font-display text-lg font-semibold">{agency.name}</p>
          <p className="text-sm text-white/75">📍 {agency.city[locale]}, {agency.country[locale]}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <Stars rating={agency.rating} />
          <span className="text-xs text-navy-800/50">{agency.reviewCount} {{ fr: "avis", en: "reviews", ar: "تقييم" }[locale]}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {agency.specialties[locale].slice(0, 2).map((s) => (
            <span key={s} className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">{s}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-navy-800/60">
            {{ fr: "À partir de", en: "From", ar: "ابتداءً من" }[locale]}{" "}
            <span className="font-display text-lg font-semibold text-navy-950">{formatPrice(minPrice, "EUR", locale)}</span>
            <span className="text-xs">/ {{ fr: "pers.", en: "person", ar: "شخص" }[locale]}</span>
          </p>
          <span className="rounded-full bg-navy-100 px-3 py-1.5 text-xs font-semibold text-navy-800 group-hover:bg-teal-500 group-hover:text-white transition-colors">
            {{ fr: "Voir les offres →", en: "View offers →", ar: "عرض الباقات ←" }[locale]}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─── Main page ─── */
export default function VoyagesOrganisesPage() {
  const locale = useLocale() as Locale;
  const [search, setSearch] = useState("");
  const [destFilter, setDestFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [selected, setSelected] = useState<Agency | null>(null);

  // All destinations for filter
  const allDests = useMemo(() => {
    const s = new Set<string>();
    agencies.forEach((a) => a.packages.forEach((p) => s.add(p.destination[locale])));
    return Array.from(s);
  }, [locale]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return agencies.filter((a) => {
      if (q && !a.name.toLowerCase().includes(q) && !a.description[locale].toLowerCase().includes(q)) return false;
      if (destFilter !== "all") {
        const hasDest = a.packages.some((p) => p.destination[locale] === destFilter);
        if (!hasDest) return false;
      }
      if (maxPrice !== Infinity) {
        const minP = Math.min(...a.packages.map((p) => p.pricePerPerson));
        if (minP > maxPrice) return false;
      }
      return true;
    });
  }, [search, destFilter, maxPrice, locale]);

  const priceOptions = [
    { label: { fr: "Tous budgets", en: "All budgets", ar: "كل الميزانيات" }[locale], value: Infinity },
    { label: { fr: "< 800 €/pers.", en: "< €800/person", ar: "< 800€/شخص" }[locale], value: 800 },
    { label: { fr: "< 1 200 €/pers.", en: "< €1,200/person", ar: "< 1200€/شخص" }[locale], value: 1200 },
    { label: { fr: "< 2 000 €/pers.", en: "< €2,000/person", ar: "< 2000€/شخص" }[locale], value: 2000 },
  ];

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-navy-950 px-6 py-16 text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="relative z-10">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90">
            {{ fr: "Marketplace agences", en: "Agency marketplace", ar: "سوق الوكالات" }[locale]}
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">
            {{ fr: "Voyages Organisés", en: "Organised Tours", ar: "الرحلات المنظمة" }[locale]}
          </h1>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            {{ fr: "Comparez les meilleures agences partenaires, leurs circuits et leurs tarifs.", en: "Compare the best partner agencies, their tours and prices.", ar: "قارن بين أفضل الوكالات الشريكة وجولاتها وأسعارها." }[locale]}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-30 border-b border-navy-900/10 bg-white/95 backdrop-blur-md px-6 py-4">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-navy-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={{ fr: "Rechercher une agence…", en: "Search an agency…", ar: "ابحث عن وكالة…" }[locale]}
              className="w-full rounded-full border border-navy-900/15 bg-white ps-9 pe-4 py-2 text-sm text-navy-900 outline-none focus:border-teal-500"
            />
          </div>
          {/* Destination */}
          <select
            value={destFilter}
            onChange={(e) => setDestFilter(e.target.value)}
            className="rounded-full border border-navy-900/15 bg-white px-4 py-2 text-sm text-navy-800 outline-none focus:border-teal-500"
          >
            <option value="all">{{ fr: "Toutes destinations", en: "All destinations", ar: "كل الوجهات" }[locale]}</option>
            {allDests.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {/* Price */}
          <select
            value={maxPrice === Infinity ? "Infinity" : String(maxPrice)}
            onChange={(e) => setMaxPrice(e.target.value === "Infinity" ? Infinity : Number(e.target.value))}
            className="rounded-full border border-navy-900/15 bg-white px-4 py-2 text-sm text-navy-800 outline-none focus:border-teal-500"
          >
            {priceOptions.map((o) => (
              <option key={String(o.value)} value={String(o.value)}>{o.label}</option>
            ))}
          </select>
          <span className="text-sm text-navy-800/50">
            {filtered.length} {{ fr: "agence(s)", en: "agency(ies)", ar: "وكالة(وكالات)" }[locale]}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-navy-800/60">
            {{ fr: "Aucune agence ne correspond à ces critères.", en: "No agencies match these filters.", ar: "لا توجد وكالات تتوافق مع هذه المعايير." }[locale]}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((agency) => (
              <AgencyCard
                key={agency.id}
                agency={agency}
                locale={locale}
                onSelect={() => setSelected(agency)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <AgencyModal agency={selected} locale={locale} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
