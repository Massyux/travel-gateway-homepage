"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import type { NewsItem, NewsCategory } from "@/lib/fetchNews";

/* ─── category config (light theme) ─── */
const CATEGORIES: {
  value: NewsCategory | "all";
  label: Record<Locale, string>;
  activeCls: string;
}[] = [
  { value: "all",         label: { fr: "Tout",          en: "All",          ar: "الكل"         }, activeCls: "bg-navy-950 text-white border-navy-950" },
  { value: "vols",        label: { fr: "Nouveaux vols", en: "New routes",   ar: "رحلات جديدة" }, activeCls: "bg-sky-600 text-white border-sky-600" },
  { value: "visa",        label: { fr: "Visas",         en: "Visas",        ar: "التأشيرات"   }, activeCls: "bg-rose-600 text-white border-rose-600" },
  { value: "tarifs",      label: { fr: "Tarifs",        en: "Fares",        ar: "التعريفات"   }, activeCls: "bg-amber-500 text-white border-amber-500" },
  { value: "gds",         label: { fr: "GDS & Tech",    en: "GDS & Tech",   ar: "أنظمة الحجز" }, activeCls: "bg-purple-600 text-white border-purple-600" },
  { value: "destination", label: { fr: "Destinations",  en: "Destinations", ar: "الوجهات"     }, activeCls: "bg-teal-600 text-white border-teal-600" },
];

const CAT_BADGE: Record<NewsCategory, { label: Record<Locale, string>; cls: string }> = {
  vols:        { label: { fr: "Vols",        en: "Routes",       ar: "رحلات"   }, cls: "bg-sky-100 text-sky-700 border-sky-200" },
  visa:        { label: { fr: "Visa",        en: "Visa",         ar: "تأشيرة"  }, cls: "bg-rose-100 text-rose-700 border-rose-200" },
  tarifs:      { label: { fr: "Tarifs",      en: "Fares",        ar: "أسعار"   }, cls: "bg-amber-100 text-amber-700 border-amber-200" },
  gds:         { label: { fr: "GDS/Tech",    en: "GDS/Tech",     ar: "تقنية"   }, cls: "bg-purple-100 text-purple-700 border-purple-200" },
  destination: { label: { fr: "Destination", en: "Destination",  ar: "وجهة"    }, cls: "bg-teal-100 text-teal-700 border-teal-200" },
};

// Category fallback images from Unsplash (all pre-approved in next.config)
const CAT_IMAGES: Record<NewsCategory, string> = {
  vols:        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
  visa:        "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=600&q=80",
  gds:         "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  tarifs:      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
  destination: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
};

// Source icons
const SOURCE_ICON: Record<string, string> = {
  "Simple Flying": "✈️", "Aviation Week": "🛫", "eTurboNews": "📰",
  "Amadeus": "💻", "Travelport": "🖥️", "Air Algérie": "🇩🇿",
  "US Embassy Algiers": "🇺🇸", "France-Visas": "🇫🇷",
  "Qatar Airways": "🇶🇦", "ObservAlgérie": "📡", "Algérie360": "📡",
  "TTG Asia": "📱",
};

function NewsCard({ item, locale }: { item: NewsItem; locale: Locale }) {
  const badge = CAT_BADGE[item.category];
  // Use item image if from unsplash, else use category fallback
  const imgSrc =
    item.image?.includes("unsplash.com")
      ? item.image
      : CAT_IMAGES[item.category];

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/55 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-white/80 hover:bg-white/80 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={imgSrc}
          alt={item.title}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 48vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge overlay on image */}
        <span className={`absolute start-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm bg-white/80 ${badge.cls}`}>
          {badge.label[locale]}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-sm font-semibold text-navy-950 leading-snug line-clamp-3 group-hover:text-teal-700 transition-colors">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-xs text-navy-800/60 leading-relaxed line-clamp-2 flex-1">
            {item.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2 text-xs">
          <span className="flex items-center gap-1 text-navy-800/40">
            {SOURCE_ICON[item.source] ?? "📌"} {item.source} · {item.pubDate}
          </span>
          <span className="font-semibold text-teal-600 group-hover:text-teal-700">
            {locale === "ar" ? "←" : "→"}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function TravelNewsClient({ items, locale }: { items: NewsItem[]; locale: Locale }) {
  const [active, setActive] = useState<NewsCategory | "all">("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <>
      {/* Filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => { setActive(cat.value); setShowAll(false); }}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              active === cat.value
                ? cat.activeCls
                : "border-navy-900/20 bg-white/60 text-navy-800 hover:bg-white hover:border-navy-900/40"
            }`}
          >
            {cat.label[locale]}
          </button>
        ))}
        <span className="ms-auto self-center text-xs text-navy-800/40">
          {filtered.length} {locale === "ar" ? "خبر" : locale === "fr" ? "actus" : "articles"}
        </span>
      </div>

      {/* Cards grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <NewsCard key={item.id} item={item} locale={locale} />
        ))}
      </div>

      {/* Load more */}
      {!showAll && filtered.length > 6 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full border border-navy-900/20 bg-white/60 px-6 py-2.5 text-sm font-semibold text-navy-800 backdrop-blur-sm hover:bg-white transition-colors"
          >
            {locale === "ar" ? "عرض المزيد" : locale === "fr" ? "Voir plus d'actualités" : "Load more news"}
          </button>
        </div>
      )}
    </>
  );
}
