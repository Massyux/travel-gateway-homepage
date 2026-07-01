import type { Locale } from "@/i18n/routing";

export type StayType = "villa" | "appartement" | "maison-hote";

export type Stay = {
  id: string;
  name: string;
  type: StayType;
  image: string;
  city: Record<Locale, string>;
  country: Record<Locale, string>;
  countryCode: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  rating: number;
  reviewCount: number;
  description: Record<Locale, string>;
  amenities: Record<Locale, string[]>;
};

export const stays: Stay[] = [
  {
    id: "villa-yasmine-hammamet",
    name: "Villa Yasmine",
    type: "villa",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Hammamet", en: "Hammamet", ar: "الحمامات" },
    country: { fr: "Tunisie", en: "Tunisia", ar: "تونس" },
    countryCode: "TN",
    pricePerNight: 120,
    capacity: 8,
    bedrooms: 4,
    rating: 4.8,
    reviewCount: 64,
    description: {
      fr: "Villa avec piscine privée à 200 m de la mer. Entièrement équipée, vue sur les jardins jasmin, idéale pour les familles.",
      en: "Villa with private pool 200 m from the sea. Fully equipped, jasmine garden views, ideal for families.",
      ar: "فيلا مع مسبح خاص على بُعد 200 م من البحر. مجهزة بالكامل، إطلالة على حدائق الياسمين، مثالية للعائلات.",
    },
    amenities: {
      fr: ["Piscine privée", "Wi-Fi fibre", "Cuisine équipée", "Clim/chauffage", "Parking privé", "Barbecue"],
      en: ["Private pool", "Fiber Wi-Fi", "Equipped kitchen", "A/C & heating", "Private parking", "BBQ"],
      ar: ["مسبح خاص", "واي فاي فائق السرعة", "مطبخ مجهز", "تكييف وتدفئة", "موقف خاص", "شواء"],
    },
  },
  {
    id: "riad-atlas-marrakech",
    name: "Riad Atlas",
    type: "maison-hote",
    image: "https://images.unsplash.com/photo-1539330030160-5d84f7f04896?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Marrakech", en: "Marrakech", ar: "مراكش" },
    country: { fr: "Maroc", en: "Morocco", ar: "المغرب" },
    countryCode: "MA",
    pricePerNight: 85,
    capacity: 6,
    bedrooms: 3,
    rating: 4.9,
    reviewCount: 112,
    description: {
      fr: "Riad authentique au cœur de la médina. Patio orné de zellige, petit-déjeuner marocain inclus, à 5 min de la place Jemaa el-Fna.",
      en: "Authentic riad in the heart of the medina. Zellige-decorated patio, Moroccan breakfast included, 5 min from Jemaa el-Fna.",
      ar: "رياض أصيل في قلب المدينة القديمة. فناء مزين بالزليج، إفطار مغربي مشمول، على بُعد 5 دقائق من ساحة جامع الفنا.",
    },
    amenities: {
      fr: ["Petit-déjeuner inclus", "Wi-Fi", "Patio & fontaine", "Rooftop terrasse", "Service ménage"],
      en: ["Breakfast included", "Wi-Fi", "Patio & fountain", "Rooftop terrace", "Cleaning service"],
      ar: ["إفطار مشمول", "واي فاي", "فناء ونافورة", "تراس علوي", "خدمة تنظيف"],
    },
  },
  {
    id: "appartement-nice-mer",
    name: "Appartement Vue Mer",
    type: "appartement",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Nice", en: "Nice", ar: "نيس" },
    country: { fr: "France", en: "France", ar: "فرنسا" },
    countryCode: "FR",
    pricePerNight: 150,
    capacity: 4,
    bedrooms: 2,
    rating: 4.7,
    reviewCount: 88,
    description: {
      fr: "Appartement moderne avec terrasse face à la mer, à 50 m de la Promenade des Anglais. Vue panoramique sur la Méditerranée.",
      en: "Modern apartment with sea-facing terrace, 50 m from the Promenade des Anglais. Panoramic Mediterranean view.",
      ar: "شقة عصرية بتراس مطل على البحر، على بُعد 50 م من الكورنيش. إطلالة بانورامية على البحر الأبيض المتوسط.",
    },
    amenities: {
      fr: ["Vue mer panoramique", "Terrasse", "Clim", "Wi-Fi", "Parking (option)"],
      en: ["Panoramic sea view", "Terrace", "A/C", "Wi-Fi", "Parking (option)"],
      ar: ["إطلالة بانورامية على البحر", "تراس", "تكييف", "واي فاي", "موقف (اختياري)"],
    },
  },
  {
    id: "villa-djerba-palm",
    name: "Villa Djerba Palm",
    type: "villa",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Djerba", en: "Djerba", ar: "جربة" },
    country: { fr: "Tunisie", en: "Tunisia", ar: "تونس" },
    countryCode: "TN",
    pricePerNight: 95,
    capacity: 10,
    bedrooms: 5,
    rating: 4.6,
    reviewCount: 43,
    description: {
      fr: "Grande villa entourée de palmiers avec piscine chauffée, jardin méditerranéen et accès à une plage privée à 3 min à pied.",
      en: "Large villa surrounded by palm trees with heated pool, Mediterranean garden and access to a private beach 3 min walk away.",
      ar: "فيلا كبيرة محاطة بالنخيل مع مسبح مسخّن وحديقة متوسطية ووصول إلى شاطئ خاص على بُعد 3 دقائق سيرًا.",
    },
    amenities: {
      fr: ["Piscine chauffée", "Accès plage privée", "Jardin 1000 m²", "Barbecue", "Wi-Fi", "Parking 3 voitures"],
      en: ["Heated pool", "Private beach access", "1000 m² garden", "BBQ", "Wi-Fi", "3-car parking"],
      ar: ["مسبح مسخّن", "وصول لشاطئ خاص", "حديقة 1000 م²", "شواء", "واي فاي", "موقف 3 سيارات"],
    },
  },
  {
    id: "casa-andalucia-seville",
    name: "Casa Andalucía",
    type: "maison-hote",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Séville", en: "Seville", ar: "إشبيلية" },
    country: { fr: "Espagne", en: "Spain", ar: "إسبانيا" },
    countryCode: "ES",
    pricePerNight: 110,
    capacity: 6,
    bedrooms: 3,
    rating: 4.8,
    reviewCount: 79,
    description: {
      fr: "Maison d'hôte andalouse du XVIIe siècle avec patio à fontaine, très proche de la cathédrale et de l'Alcazar. Petit-déjeuner andalou inclus.",
      en: "17th century Andalusian guesthouse with fountain patio, very close to the cathedral and Alcázar. Andalusian breakfast included.",
      ar: "دار ضيافة أندلسية من القرن السابع عشر مع فناء بنافورة، قريبة جدًا من الكاتدرائية والقصر. إفطار أندلسي مشمول.",
    },
    amenities: {
      fr: ["Petit-déjeuner inclus", "Patio historique", "Wi-Fi", "Clim", "Visite guidée offerte"],
      en: ["Breakfast included", "Historic patio", "Wi-Fi", "A/C", "Complimentary guided tour"],
      ar: ["إفطار مشمول", "فناء تاريخي", "واي فاي", "تكييف", "جولة مرشدة مجانية"],
    },
  },
  {
    id: "loft-istanbul-bosphore",
    name: "Loft Bosphore",
    type: "appartement",
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Istanbul", en: "Istanbul", ar: "إسطنبول" },
    country: { fr: "Turquie", en: "Turkey", ar: "تركيا" },
    countryCode: "TR",
    pricePerNight: 90,
    capacity: 4,
    bedrooms: 2,
    rating: 4.7,
    reviewCount: 56,
    description: {
      fr: "Loft design avec vue directe sur le Bosphore depuis Beşiktaş. Mobilier contemporain, à 10 min à pied de Dolmabahçe.",
      en: "Design loft with direct Bosphorus view from Beşiktaş. Contemporary furnishings, 10 min walk from Dolmabahçe palace.",
      ar: "شقة عصرية بإطلالة مباشرة على مضيق البوسفور من بيشيكتاش. أثاث معاصر، على بُعد 10 دقائق سيرًا من قصر دولمه بهجة.",
    },
    amenities: {
      fr: ["Vue Bosphore", "Wi-Fi haut débit", "Clim", "Cuisine moderne", "Concierge"],
      en: ["Bosphorus view", "High-speed Wi-Fi", "A/C", "Modern kitchen", "Concierge"],
      ar: ["إطلالة على البوسفور", "واي فاي عالي السرعة", "تكييف", "مطبخ عصري", "كونسيرج"],
    },
  },
  {
    id: "maison-hote-sahara-taghit",
    name: "Dar Taghit",
    type: "maison-hote",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Taghit", en: "Taghit", ar: "تاغيت" },
    country: { fr: "Algérie", en: "Algeria", ar: "الجزائر" },
    countryCode: "DZ",
    pricePerNight: 45,
    capacity: 6,
    bedrooms: 3,
    rating: 4.9,
    reviewCount: 38,
    description: {
      fr: "Maison d'hôte traditionnelle en pisé au cœur des dunes de Taghit, avec coucher de soleil sur l'erg. Excursions chameaux et 4×4 organisées.",
      en: "Traditional adobe guesthouse in the heart of Taghit's dunes, with erg sunset views. Camel and 4x4 excursions arranged.",
      ar: "دار ضيافة تقليدية من الطين في قلب كثبان تاغيت، مع مشاهد غروب الشمس على العرق. رحلات الجمال والسيارات الرباعية متاحة.",
    },
    amenities: {
      fr: ["Vue dunes", "Repas traditionnels inclus", "Excursions organisées", "Terrasse étoilée"],
      en: ["Dune view", "Traditional meals included", "Organised excursions", "Stargazing terrace"],
      ar: ["إطلالة على الكثبان", "وجبات تقليدية مشمولة", "رحلات منظمة", "تراس لمراقبة النجوم"],
    },
  },
  {
    id: "appartement-paris-centre",
    name: "Studio Marais",
    type: "appartement",
    image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Paris", en: "Paris", ar: "باريس" },
    country: { fr: "France", en: "France", ar: "فرنسا" },
    countryCode: "FR",
    pricePerNight: 135,
    capacity: 2,
    bedrooms: 1,
    rating: 4.6,
    reviewCount: 95,
    description: {
      fr: "Studio cosy au cœur du Marais, à 5 min du Centre Pompidou et de la Place des Vosges. Idéal pour un séjour culturel ou romantique.",
      en: "Cosy studio in the heart of Le Marais, 5 min from Centre Pompidou and Place des Vosges. Ideal for a cultural or romantic stay.",
      ar: "استوديو مريح في قلب حي ماريه، على بُعد 5 دقائق من المركز الثقافي بومبيدو وساحة الفوج. مثالي لإقامة ثقافية أو رومانسية.",
    },
    amenities: {
      fr: ["Wi-Fi", "Clim", "Machine à café", "Métro à 2 min", "Épiceries à pied"],
      en: ["Wi-Fi", "A/C", "Coffee machine", "Metro 2 min away", "Grocery shops nearby"],
      ar: ["واي فاي", "تكييف", "آلة قهوة", "مترو على بُعد 2 دقيقة", "محلات بقالة قريبة"],
    },
  },
  {
    id: "villa-bali-jungle",
    name: "Villa Jungle Bali",
    type: "villa",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Ubud, Bali", en: "Ubud, Bali", ar: "أوبود، بالي" },
    country: { fr: "Indonésie", en: "Indonesia", ar: "إندونيسيا" },
    countryCode: "ID",
    pricePerNight: 160,
    capacity: 6,
    bedrooms: 3,
    rating: 4.9,
    reviewCount: 147,
    description: {
      fr: "Villa en bambou avec piscine à débordement sur la jungle tropicale d'Ubud. Yoga matinal inclus, restaurant sur place.",
      en: "Bamboo villa with infinity pool over Ubud's tropical jungle. Morning yoga included, on-site restaurant.",
      ar: "فيلا من الخيزران مع مسبح لانهائي فوق غابة أوبود المدارية. يوغا صباحي مشمول، مطعم في المكان.",
    },
    amenities: {
      fr: ["Piscine à débordement", "Yoga inclus", "Restaurant", "Wi-Fi", "Transfert aéroport"],
      en: ["Infinity pool", "Yoga included", "Restaurant", "Wi-Fi", "Airport transfer"],
      ar: ["مسبح لانهائي", "يوغا مشمول", "مطعم", "واي فاي", "نقل من المطار"],
    },
  },
  {
    id: "chalet-alpes-annecy",
    name: "Chalet Les Cimes",
    type: "villa",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Annecy", en: "Annecy", ar: "آنسي" },
    country: { fr: "France", en: "France", ar: "فرنسا" },
    countryCode: "FR",
    pricePerNight: 185,
    capacity: 8,
    bedrooms: 4,
    rating: 4.7,
    reviewCount: 61,
    description: {
      fr: "Chalet en bois avec sauna et vue sur le lac d'Annecy. Accès ski à 15 min, randonnées au départ de la porte.",
      en: "Wooden chalet with sauna and Lake Annecy views. Ski access 15 min away, hiking trails from the doorstep.",
      ar: "شاليه خشبي مع ساونا وإطلالة على بحيرة آنسي. وصول للتزلج على بُعد 15 دقيقة، مسارات المشي من المدخل.",
    },
    amenities: {
      fr: ["Sauna", "Vue lac", "Cheminée", "Cuisine équipée", "Wi-Fi", "Garage"],
      en: ["Sauna", "Lake view", "Fireplace", "Equipped kitchen", "Wi-Fi", "Garage"],
      ar: ["ساونا", "إطلالة على البحيرة", "مدفأة", "مطبخ مجهز", "واي فاي", "مرآب"],
    },
  },
  {
    id: "villa-doha-marina",
    name: "Villa Doha Marina",
    type: "villa",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Doha", en: "Doha", ar: "الدوحة" },
    country: { fr: "Qatar", en: "Qatar", ar: "قطر" },
    countryCode: "QA",
    pricePerNight: 220,
    capacity: 8,
    bedrooms: 4,
    rating: 4.8,
    reviewCount: 32,
    description: {
      fr: "Villa luxueuse face à la marina de Doha, avec piscine chauffée et espace détente. À 10 min du Musée d'Art Islamique.",
      en: "Luxury villa facing Doha Marina with heated pool and relaxation area. 10 min from the Museum of Islamic Art.",
      ar: "فيلا فاخرة مطلة على مرسى الدوحة مع مسبح مسخّن وفضاء استرخاء. على بُعد 10 دقائق من متحف الفن الإسلامي.",
    },
    amenities: {
      fr: ["Piscine chauffée", "Vue marina", "Wi-Fi fibre", "Home cinéma", "Service conciergerie 24h"],
      en: ["Heated pool", "Marina view", "Fiber Wi-Fi", "Home cinema", "24h concierge service"],
      ar: ["مسبح مسخّن", "إطلالة على المرسى", "واي فاي فائق", "سينما منزلية", "كونسيرج 24 ساعة"],
    },
  },
];

export const STAY_TYPES: Record<StayType, Record<Locale, string>> = {
  villa:         { fr: "Villa",          en: "Villa",         ar: "فيلا" },
  appartement:   { fr: "Appartement",    en: "Apartment",     ar: "شقة" },
  "maison-hote": { fr: "Maison d'hôte", en: "Guesthouse",    ar: "دار ضيافة" },
};
