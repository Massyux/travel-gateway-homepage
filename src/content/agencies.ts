import type { Locale } from "@/i18n/routing";

export type Agency = {
  id: string;
  /** City label, when the agency has a specific city (vs. country-only). */
  city: Record<Locale, string> | null;
  country: Record<Locale, string>;
};

export const agencies: Agency[] = [
  {
    id: "algiers",
    city: { fr: "Alger", en: "Algiers", ar: "الجزائر العاصمة" },
    country: { fr: "Algérie", en: "Algeria", ar: "الجزائر" },
  },
  {
    id: "rouiba",
    city: { fr: "Rouïba", en: "Rouïba", ar: "الرويبة" },
    country: { fr: "Algérie", en: "Algeria", ar: "الجزائر" },
  },
  {
    id: "niamey",
    city: { fr: "Niamey", en: "Niamey", ar: "نيامي" },
    country: { fr: "Niger", en: "Niger", ar: "النيجر" },
  },
  {
    id: "india",
    city: null,
    country: { fr: "Inde", en: "India", ar: "الهند" },
  },
  {
    id: "dubai",
    city: { fr: "Dubaï", en: "Dubai", ar: "دبي" },
    country: { fr: "Émirats arabes unis", en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
  },
  {
    id: "chad",
    city: null,
    country: { fr: "Tchad", en: "Chad", ar: "تشاد" },
  },
  {
    id: "venice",
    city: { fr: "Venise", en: "Venice", ar: "البندقية" },
    country: { fr: "Italie", en: "Italy", ar: "إيطاليا" },
  },
  {
    id: "paris",
    city: { fr: "Paris", en: "Paris", ar: "باريس" },
    country: { fr: "France", en: "France", ar: "فرنسا" },
  },
];
