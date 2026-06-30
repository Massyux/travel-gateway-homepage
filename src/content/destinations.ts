import type { Locale } from "@/i18n/routing";

export type Destination = {
  id: string;
  image: string;
  name: Record<Locale, string>;
  country: Record<Locale, string>;
  size: "lg" | "md";
};

export const destinations: Destination[] = [
  {
    id: "santorini",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2400&q=80",
    name: { fr: "Santorin", en: "Santorini", ar: "سانتوريني" },
    country: { fr: "Grèce", en: "Greece", ar: "اليونان" },
    size: "lg",
  },
  {
    id: "marrakech",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    name: { fr: "Marrakech", en: "Marrakech", ar: "مراكش" },
    country: { fr: "Maroc", en: "Morocco", ar: "المغرب" },
    size: "md",
  },
  {
    id: "kyoto",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
    name: { fr: "Kyoto", en: "Kyoto", ar: "كيوتو" },
    country: { fr: "Japon", en: "Japan", ar: "اليابان" },
    size: "md",
  },
  {
    id: "newyork",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2400&q=80",
    name: { fr: "New York", en: "New York", ar: "نيويورك" },
    country: { fr: "États-Unis", en: "United States", ar: "الولايات المتحدة" },
    size: "lg",
  },
  {
    id: "bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    name: { fr: "Bali", en: "Bali", ar: "بالي" },
    country: { fr: "Indonésie", en: "Indonesia", ar: "إندونيسيا" },
    size: "md",
  },
  {
    id: "dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    name: { fr: "Dubaï", en: "Dubai", ar: "دبي" },
    country: { fr: "Émirats arabes unis", en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
    size: "md",
  },
];
