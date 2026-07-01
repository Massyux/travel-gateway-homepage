"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/routing";
import type { NewsItem, NewsCategory } from "@/lib/fetchNews";

/* ─── category config ─── */
const CATEGORIES: { value: NewsCategory | "all"; label: Record<Locale, string>; color: string; bg: string }[] = [
  { value: "all",         label: { fr: "Tout",        en: "All",          ar: "الكل"          }, color: "text-white",        bg: "bg-white/20 border-white/30" },
  { value: "vols",        label: { fr: "Nouveaux vols", en: "New routes",   ar: "رحلات جديدة"  }, color: "text-sky-300",      bg: "bg-sky-900/40 border-sky-500/40" },
  { value: "visa",        label: { fr: "Visas",       en: "Visas",        ar: "التأشيرات"     }, color: "text-rose-300",     bg: "bg-rose-900/40 border-rose-500/40" },
  { value: "tarifs",      label: { fr: "Tarifs",      en: "Fares",        ar: "التعريفات"     }, color: "text-amber-300",    bg: "bg-amber-900/40 border-amber-500/40" },
  { value: "gds",         label: { fr: "GDS & Tech",  en: "GDS & Tech",   ar: "أنظمة الحجز"  }, color: "text-purple-300",   bg: "bg-purple-900/40 border-purple-500/40" },
  { value: "destination", label: { fr: "Destinations", en: "Destinations", ar: "الوجهات"       }, color: "text-teal-300",     bg: "bg-teal-900/40 border-teal-500/40" },
];

const CAT_BADGE: Record<NewsCategory, { label: Record<Locale, string>; cls: string }> = {
  vols:        { label: { fr: "Vols",        en: "Routes",       ar: "رحلات"        }, cls: "bg-sky-900/60 text-sky-300 border-sky-500/30" },
  visa:        { label: { fr: "Visa",        en: "Visa",         ar: "تأشيرة"       }, cls: "bg-rose-900/60 text-rose-300 border-rose-500/30" },
  tarifs:      { label: { fr: "Tarifs",      en: "Fares",        ar: "أسعار"        }, cls: "bg-amber-900/60 text-amber-300 border-amber-500/30" },
  gds:         { label: { fr: "GDS/Tech",    en: "GDS/Tech",     ar: "تقنية"        }, cls: "bg-purple-900/60 text-purple-300 border-purple-500/30" },
  destination: { label: { fr: "Destination", en: "Destination",  ar: "وجهة"         }, cls: "bg-teal-900/60 text-teal-300 border-teal-500/30" },
};

function SourceIcon({ source }: { source: string }) {
  const icons: Record<string, string> = {
    "Simple Flying": "✈️",
    "Aviation Week": "🛫",
    "eTurboNews": "📰",
    "Amadeus": "💻",
    "Travelport": "🖥️",
    "Air Algérie": "🇩🇿",
    "US Embassy Algiers": "🇺🇸",
    "France-Visas": "🇫🇷",
    "Qatar Airways": "🇶🇦",
  };
  return <span>{icons[source] ?? "📌"}</span>;
}

function NewsCard({ item, locale }: { item: NewsItem; locale: Locale }) {
  const badge = CAT_BADGE[item.category];

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-navy-900/50 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-navy-900/80 hover:-translate-y-0.5"
    >
      {/* Category stripe */}
      <div className={`flex items-center gap-2 border-b border-white/8 px-4 py-2.5 ${
        item.category === "vols" ? "bg-sky-900/30" :
        item.category === "visa" ? "bg-rose-900/30" :
        item.category === "gds" ? "bg-purple-900/30" :
        item.category === "tarifs" ? "bg-amber-900/30" :
        "bg-teal-900/30"
      }`}>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.cls}`}>
          {badge.label[locale]}
        </span>
        <span className="ms-auto flex items-center gap-1 text-xs text-white/40">
          <SourceIcon source={item.source} />
          {item.source}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-base font-semibold text-white leading-snug line-clamp-3 group-hover:text-teal-300 transition-colors">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-sm text-white/50 leading-relaxed line-clamp-3 flex-1">
            {item.excerpt}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between text-xs text-white/30">
          <span>{item.pubDate}</span>
          <span className="text-teal-400 group-hover:text-teal-300 font-semibold">
            {locale === "ar" ? "اقرأ المزيد ←" : locale === "fr" ? "Lire la suite →" : "Read more →"}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function TravelNewsClient({ items, locale }: { items: NewsItem[]; locale: Locale }) {
  const [active, setActive] = useState<NewsCategory | "all">("all");

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <>
      {/* Category filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActive(cat.value)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              active === cat.value
                ? `${cat.bg} ${cat.color}`
                : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
            }`}
          >
            {cat.label[locale]}
          </button>
        ))}
        <span className="ms-auto self-center text-xs text-white/30">
          {filtered.length} actus
        </span>
      </div>

      {/* Cards grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 9).map((item) => (
          <NewsCard key={item.id} item={item} locale={locale} />
        ))}
      </div>

      {/* Bottom link */}
      {filtered.length > 9 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {}}
            className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            {locale === "ar" ? "عرض المزيد" : locale === "fr" ? "Voir plus d'actualités" : "Load more news"}
          </button>
        </div>
      )}
    </>
  );
}
