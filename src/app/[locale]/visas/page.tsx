"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { visaDestinations, visaFreeCountries, type VisaDestination } from "@/content/visa-info";

const STATUS_LABELS: Record<string, Record<Locale, string>> = {
  required:    { fr: "Visa obligatoire",    en: "Visa required",    ar: "تأشيرة إلزامية" },
  "e-visa":    { fr: "E-Visa en ligne",     en: "E-Visa online",    ar: "تأشيرة إلكترونية" },
  "on-arrival":{ fr: "Visa à l'arrivée",   en: "Visa on arrival",  ar: "تأشيرة عند الوصول" },
  "visa-free": { fr: "Sans visa",           en: "Visa-free",        ar: "بدون تأشيرة" },
};

const STATUS_COLORS: Record<string, string> = {
  required:     "bg-red-100 text-red-700",
  "e-visa":     "bg-blue-100 text-blue-700",
  "on-arrival": "bg-amber-100 text-amber-700",
  "visa-free":  "bg-green-100 text-green-700",
};

function DestinationCard({ dest, locale }: { dest: VisaDestination; locale: Locale }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy-900/8">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-5 text-start hover:bg-sand-50 transition-colors"
      >
        <span className="text-4xl">{dest.flag}</span>
        <div className="flex-1 min-w-0">
          <p className="font-display text-lg font-semibold text-navy-950">
            {dest.name[locale]}
          </p>
          <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[dest.status]}`}>
            {STATUS_LABELS[dest.status][locale]}
          </span>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`shrink-0 text-navy-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-navy-900/8 px-5 pb-5 pt-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoBlock
              label={{ fr: "Durée max", en: "Max stay", ar: "أقصى مدة" }[locale]}
              value={dest.maxStay[locale]}
              icon="🗓️"
            />
            <InfoBlock
              label={{ fr: "Frais", en: "Fee", ar: "الرسوم" }[locale]}
              value={dest.fee[locale]}
              icon="💶"
            />
            <InfoBlock
              label={{ fr: "Délai", en: "Processing", ar: "مدة المعالجة" }[locale]}
              value={dest.processingTime[locale]}
              icon="⏱️"
            />
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-navy-950">
              {{ fr: "Documents requis", en: "Required documents", ar: "الوثائق المطلوبة" }[locale]}
            </p>
            <ul className="mt-2 space-y-1">
              {dest.requirements[locale].map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-navy-800/80">
                  <span className="mt-0.5 shrink-0 text-teal-500">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {dest.notes[locale] && (
            <div className="mt-4 rounded-xl bg-navy-50 p-4 text-sm text-navy-800/80">
              <span className="font-semibold text-navy-950">ℹ️ </span>
              {dest.notes[locale]}
            </div>
          )}

          <a
            href={dest.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
          >
            {{ fr: "Site officiel", en: "Official site", ar: "الموقع الرسمي" }[locale]}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-xl bg-sand-100 p-3">
      <p className="text-xs font-semibold text-navy-600 uppercase tracking-wide">{icon} {label}</p>
      <p className="mt-1 text-sm font-semibold text-navy-950">{value}</p>
    </div>
  );
}

export default function VisasPage() {
  const locale = useLocale() as Locale;

  const heading = {
    fr: { eyebrow: "Passeport algérien", title: "Informations visas", subtitle: "Conditions d'entrée pour les citoyens algériens — données issues des sources officielles." },
    en: { eyebrow: "Algerian passport", title: "Visa information", subtitle: "Entry conditions for Algerian citizens — data sourced from official authorities." },
    ar: { eyebrow: "جواز السفر الجزائري", title: "معلومات التأشيرات", subtitle: "شروط الدخول للمواطنين الجزائريين — بيانات مستقاة من المصادر الرسمية." },
  }[locale];

  const freeLabel = {
    fr: "Pays accessibles sans visa ou visa à l'arrivée",
    en: "Countries accessible without visa or visa on arrival",
    ar: "الدول المتاحة بدون تأشيرة أو بتأشيرة عند الوصول",
  }[locale];

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero */}
      <div className="bg-navy-950 px-6 py-16 text-center text-white">
        <span className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-semibold text-white/90">
          {heading.eyebrow}
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">{heading.title}</h1>
        <p className="mt-3 text-white/70 max-w-xl mx-auto">{heading.subtitle}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
          {Object.entries(STATUS_LABELS).map(([key, labels]) => (
            <span key={key} className={`rounded-full px-3 py-1 font-semibold ${STATUS_COLORS[key]}`}>
              {labels[locale]}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Main destinations */}
        <div className="flex flex-col gap-4">
          {visaDestinations.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} locale={locale} />
          ))}
        </div>

        {/* Visa-free grid */}
        <h2 className="mt-14 font-display text-2xl font-semibold text-navy-950">{freeLabel}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {visaFreeCountries.map((entry) => (
            <div
              key={entry.country.fr}
              className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-navy-900/8"
            >
              <span className="text-2xl">{entry.flag}</span>
              <div>
                <p className="text-sm font-semibold text-navy-950">{entry.country[locale]}</p>
                <p className="text-xs text-navy-800/60">{entry.maxStay[locale]}</p>
                <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[entry.type]}`}>
                  {STATUS_LABELS[entry.type][locale]}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
          ⚠️ {{ fr: "Les informations présentées sont indicatives. Vérifiez toujours les conditions auprès de l'ambassade ou du consulat compétent avant votre voyage. Les règles peuvent changer sans préavis.", en: "Information presented is indicative. Always verify conditions with the relevant embassy or consulate before traveling. Rules can change without notice.", ar: "المعلومات المقدمة استرشادية. تحقق دائمًا من الشروط لدى السفارة أو القنصلية المختصة قبل سفرك. يمكن أن تتغير القواعد دون إشعار مسبق." }[locale]}
        </p>
      </div>
    </div>
  );
}
