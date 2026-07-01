import type { Locale } from "@/i18n/routing";

export type AgencyPackage = {
  id: string;
  destination: Record<Locale, string>;
  duration: Record<Locale, string>;
  pricePerPerson: number;
  image: string;
  includes: Record<Locale, string[]>;
};

export type AgencyReview = {
  author: string;
  rating: number;
  date: string;
  text: Record<Locale, string>;
};

export type Agency = {
  id: string;
  slug: string;
  name: string;
  logo: string;
  coverImage: string;
  city: Record<Locale, string>;
  country: Record<Locale, string>;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  specialties: Record<Locale, string[]>;
  description: Record<Locale, string>;
  packages: AgencyPackage[];
  reviews: AgencyReview[];
};

export const agencies: Agency[] = [
  {
    id: "1",
    slug: "atlas-aventures",
    name: "Atlas Aventures",
    logo: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Alger", en: "Algiers", ar: "الجزائر" },
    country: { fr: "Algérie", en: "Algeria", ar: "الجزائر" },
    address: "12 Rue Didouche Mourad, Alger Centre",
    phone: "+213 21 74 00 11",
    rating: 4.8,
    reviewCount: 312,
    specialties: {
      fr: ["Circuits Méditerranée", "Voyage de noces", "Groupes"],
      en: ["Mediterranean tours", "Honeymoon", "Groups"],
      ar: ["جولات البحر المتوسط", "شهر العسل", "المجموعات"],
    },
    description: {
      fr: "Agence leader en Algérie spécialisée dans les circuits organisés vers l'Europe, la Turquie et la Tunisie. Plus de 20 ans d'expérience au service de vos voyages de rêve.",
      en: "Leading agency in Algeria specialising in organised tours to Europe, Turkey and Tunisia. Over 20 years of experience serving your dream travels.",
      ar: "وكالة رائدة في الجزائر متخصصة في الجولات المنظمة إلى أوروبا وتركيا وتونس. أكثر من 20 عامًا من الخبرة في خدمة أسفاركم.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Istanbul & Cappadoce", en: "Istanbul & Cappadocia", ar: "إسطنبول والأناضول" },
        duration: { fr: "9 jours / 8 nuits", en: "9 days / 8 nights", ar: "9 أيام / 8 ليالٍ" },
        pricePerPerson: 890,
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Vol A/R Alger–Istanbul", "Hôtel 4★ inclus", "Petit-déjeuner + dîner", "Guide francophone", "Montgolfière Cappadoce"],
          en: ["Return flight Algiers–Istanbul", "4★ hotel included", "Breakfast + dinner", "French-speaking guide", "Cappadocia hot air balloon"],
          ar: ["رحلة ذهاب وعودة الجزائر–إسطنبول", "فندق 4 نجوم مشمول", "إفطار وعشاء", "مرشد فرانكفوني", "منطاد كابادوكيا"],
        },
      },
      {
        id: "p2",
        destination: { fr: "Barcelone & Côte Dorée", en: "Barcelona & Costa Dorada", ar: "برشلونة والساحل الذهبي" },
        duration: { fr: "8 jours / 7 nuits", en: "8 days / 7 nights", ar: "8 أيام / 7 ليالٍ" },
        pricePerPerson: 1100,
        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Vol A/R", "Hôtel 4★", "Demi-pension", "Visa Schengen assisté", "Excursion Montserrat"],
          en: ["Return flight", "4★ hotel", "Half-board", "Schengen visa assistance", "Montserrat excursion"],
          ar: ["رحلة ذهاب وعودة", "فندق 4 نجوم", "إقامة بنصف إشراف", "مساعدة في تأشيرة شنغن", "رحلة مونتسيرات"],
        },
      },
    ],
    reviews: [
      { author: "Nadia B.", rating: 5, date: "2026-04-12", text: { fr: "Voyage parfait de A à Z. Le guide Karim était exceptionnel, très professionnel et humain. On recommande à 100% !", en: "Perfect trip from start to finish. Guide Karim was exceptional, very professional and kind. 100% recommended!", ar: "رحلة رائعة من الألف إلى الياء. المرشد كريم كان استثنائيًا. نوصي بها 100%!" } },
      { author: "Mohamed A.", rating: 4, date: "2026-02-28", text: { fr: "Très bonne organisation. Le séjour à Istanbul était magique. Quelques détails logistiques à améliorer mais dans l'ensemble excellent.", en: "Very good organisation. The Istanbul stay was magical. Some logistics to improve but overall excellent.", ar: "تنظيم جيد جدًا. كانت إقامة إسطنبول ساحرة. بعض التفاصيل اللوجستية تحتاج تحسينًا لكن الجودة ممتازة بشكل عام." } },
    ],
  },
  {
    id: "2",
    slug: "raha-travel",
    name: "Raha Travel",
    logo: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Oran", en: "Oran", ar: "وهران" },
    country: { fr: "Algérie", en: "Algeria", ar: "الجزائر" },
    address: "45 Boulevard Maata Mohamed El Habib, Oran",
    phone: "+213 41 33 22 10",
    rating: 4.6,
    reviewCount: 189,
    specialties: {
      fr: ["Dubaï & Golfe", "Hadj & Omra", "Famille"],
      en: ["Dubai & Gulf", "Hajj & Umrah", "Family"],
      ar: ["دبي والخليج", "حج وعمرة", "العائلات"],
    },
    description: {
      fr: "Spécialiste du voyage vers les pays du Golfe depuis 15 ans. Packages Dubaï all-inclusive, circuits Arabie Saoudite et séjours Hadj & Omra.",
      en: "Gulf travel specialist for 15 years. All-inclusive Dubai packages, Saudi Arabia tours and Hajj & Umrah stays.",
      ar: "متخصص في السفر إلى دول الخليج منذ 15 عامًا. باقات دبي الشاملة وجولات المملكة العربية السعودية وإقامات الحج والعمرة.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Dubaï All-Inclusive", en: "Dubai All-Inclusive", ar: "دبي شامل الكل" },
        duration: { fr: "7 jours / 6 nuits", en: "7 days / 6 nights", ar: "7 أيام / 6 ليالٍ" },
        pricePerPerson: 1350,
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Vol A/R + visa", "Hôtel 5★ Dubai Marina", "All inclusive", "Excursion désert 4×4", "Dhow cruise"],
          en: ["Return flight + visa", "5★ Dubai Marina hotel", "All inclusive", "Desert 4×4 excursion", "Dhow cruise"],
          ar: ["رحلة ذهاب وعودة + تأشيرة", "فندق 5 نجوم دبي مارينا", "شامل الكل", "رحلة صحراء 4x4", "رحلة الداو"],
        },
      },
      {
        id: "p2",
        destination: { fr: "Maldives — Lune de miel", en: "Maldives — Honeymoon", ar: "المالديف — شهر عسل" },
        duration: { fr: "8 jours / 7 nuits", en: "8 days / 7 nights", ar: "8 أيام / 7 ليالٍ" },
        pricePerPerson: 2800,
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Vols business class", "Water bungalow 5★", "Pension complète", "Snorkeling & spa", "Transfert en hydravion"],
          en: ["Business class flights", "5★ water bungalow", "Full board", "Snorkeling & spa", "Seaplane transfer"],
          ar: ["رحلات درجة رجال الأعمال", "بنغالو مائي 5 نجوم", "إقامة كاملة", "غطس وسبا", "نقل بطائرة مائية"],
        },
      },
    ],
    reviews: [
      { author: "Amina K.", rating: 5, date: "2026-05-03", text: { fr: "Lune de miel de rêve aux Maldives ! Tout était parfait, le service impeccable. Merci Raha Travel !", en: "Dream honeymoon in the Maldives! Everything was perfect, impeccable service. Thank you Raha Travel!", ar: "شهر عسل حلم في المالديف! كل شيء كان مثاليًا، الخدمة لا تشوبها شائبة. شكرًا Raha Travel!" } },
      { author: "Yacine M.", rating: 4, date: "2026-03-15", text: { fr: "Très bon séjour à Dubaï. Organisation irréprochable, hôtel superbe. Je reviendrai !", en: "Very good stay in Dubai. Flawless organisation, superb hotel. I'll be back!", ar: "إقامة جيدة جدًا في دبي. تنظيم لا غبار عليه، فندق رائع. سأعود!" } },
    ],
  },
  {
    id: "3",
    slug: "sahara-dreams",
    name: "Sahara Dreams Travel",
    logo: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Paris", en: "Paris", ar: "باريس" },
    country: { fr: "France", en: "France", ar: "فرنسا" },
    address: "18 Rue de la Paix, 75001 Paris",
    phone: "+33 1 42 86 55 20",
    rating: 4.9,
    reviewCount: 427,
    specialties: {
      fr: ["Afrique & Sahara", "Trek & Aventure", "Circuits premium"],
      en: ["Africa & Sahara", "Trekking & Adventure", "Premium tours"],
      ar: ["أفريقيا والصحراء", "الرحلات والمغامرة", "جولات مميزة"],
    },
    description: {
      fr: "Agence franco-algérienne fondée à Paris, spécialiste des circuits aventure en Algérie, Maroc et Mauritanie. Groupes francophones depuis 2003.",
      en: "Franco-Algerian agency founded in Paris, specialist in adventure tours in Algeria, Morocco and Mauritania. French-speaking groups since 2003.",
      ar: "وكالة فرنسية-جزائرية تأسست في باريس، متخصصة في جولات المغامرة في الجزائر والمغرب وموريتانيا. مجموعات ناطقة بالفرنسية منذ 2003.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Sahara Algérien — Grand Sud", en: "Algerian Sahara — Deep South", ar: "الصحراء الجزائرية — الجنوب الكبير" },
        duration: { fr: "10 jours / 9 nuits", en: "10 days / 9 nights", ar: "10 أيام / 9 ليالٍ" },
        pricePerPerson: 950,
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Vol domestique inclus", "Campements sous les étoiles", "4×4 + guides Touaregs", "Repas traditionnels", "Ascension Tahat"],
          en: ["Domestic flight included", "Starcamp accommodation", "4×4 + Tuareg guides", "Traditional meals", "Tahat ascent"],
          ar: ["رحلة داخلية مشمولة", "إقامة في مخيمات النجوم", "4×4 + مرشدون طوارق", "وجبات تقليدية", "تسلق جبل تاهات"],
        },
      },
      {
        id: "p2",
        destination: { fr: "Maroc Imperial — 4 villes", en: "Imperial Morocco — 4 cities", ar: "المغرب الإمبراطوري — 4 مدن" },
        duration: { fr: "12 jours / 11 nuits", en: "12 days / 11 nights", ar: "12 يومًا / 11 ليلة" },
        pricePerPerson: 1280,
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Vol + minibus privé", "Riads 4★", "Demi-pension", "Guides locaux agréés", "Nuit désert Merzouga"],
          en: ["Flight + private minibus", "4★ riads", "Half-board", "Licensed local guides", "Merzouga desert night"],
          ar: ["رحلة + حافلة صغيرة خاصة", "رياضات 4 نجوم", "إقامة بنصف إشراف", "مرشدون محليون مرخصون", "ليلة صحراء مرزوكة"],
        },
      },
    ],
    reviews: [
      { author: "Claire D.", rating: 5, date: "2026-01-20", text: { fr: "Incroyable aventure dans le Sahara algérien. Des paysages à couper le souffle et une organisation sans faille. Je recommande vivement !", en: "Incredible adventure in the Algerian Sahara. Breathtaking landscapes and flawless organisation. Highly recommended!", ar: "مغامرة لا تصدق في الصحراء الجزائرية. مناظر خلابة وتنظيم لا تشوبه شائبة. أنصح بها بشدة!" } },
      { author: "Pierre L.", rating: 5, date: "2026-03-08", text: { fr: "Le circuit Maroc était fantastique. Nos guides étaient passionnés et le riad de Marrakech splendide.", en: "The Morocco tour was fantastic. Our guides were passionate and the Marrakech riad was splendid.", ar: "كانت جولة المغرب رائعة. كان مرشدونا متحمسين والرياض في مراكش كان رائعًا." } },
    ],
  },
  {
    id: "4",
    slug: "carthage-voyages",
    name: "Carthage Voyages",
    logo: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Tunis", en: "Tunis", ar: "تونس العاصمة" },
    country: { fr: "Tunisie", en: "Tunisia", ar: "تونس" },
    address: "33 Avenue Habib Bourguiba, Tunis",
    phone: "+216 71 33 44 55",
    rating: 4.5,
    reviewCount: 203,
    specialties: {
      fr: ["Tunisie profonde", "Circuits en famille", "Croisières Méditerranée"],
      en: ["Inland Tunisia", "Family tours", "Mediterranean cruises"],
      ar: ["تونس العميقة", "جولات عائلية", "رحلات بحرية متوسطية"],
    },
    description: {
      fr: "Agence tunisienne de référence pour découvrir la Tunisie authentique et les croisières en Méditerranée depuis Tunis. Expérience locale inégalée.",
      en: "Leading Tunisian agency for discovering authentic Tunisia and Mediterranean cruises from Tunis. Unmatched local expertise.",
      ar: "وكالة تونسية مرجعية لاكتشاف تونس الأصيلة والرحلات البحرية المتوسطية من تونس. خبرة محلية لا مثيل لها.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Grand Tour Tunisie", en: "Great Tunisia Tour", ar: "الجولة الكبرى في تونس" },
        duration: { fr: "8 jours / 7 nuits", en: "8 days / 7 nights", ar: "8 أيام / 7 ليالٍ" },
        pricePerPerson: 480,
        image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Hôtel 4★ pension complète", "Bus climatisé", "Guide bilingue", "Djerba + Matmata + Sidi Bou Said", "Entrées monuments"],
          en: ["4★ full-board hotel", "Air-conditioned bus", "Bilingual guide", "Djerba + Matmata + Sidi Bou Said", "Monument entries"],
          ar: ["فندق 4 نجوم إقامة كاملة", "حافلة مكيفة", "مرشد ثنائي اللغة", "جربة + مطماطة + سيدي بوسعيد", "دخول المعالم"],
        },
      },
    ],
    reviews: [
      { author: "Sabrina R.", rating: 5, date: "2026-04-01", text: { fr: "Un circuit magnifique pour découvrir toute la beauté de la Tunisie. Guide très compétent et accueil chaleureux partout.", en: "A magnificent circuit to discover all the beauty of Tunisia. Very competent guide and warm welcome everywhere.", ar: "جولة رائعة لاكتشاف جمال تونس. مرشد متميز واستقبال دافئ في كل مكان." } },
    ],
  },
  {
    id: "5",
    slug: "orient-express-tours",
    name: "Orient Express Tours",
    logo: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Istanbul", en: "Istanbul", ar: "إسطنبول" },
    country: { fr: "Turquie", en: "Turkey", ar: "تركيا" },
    address: "Sultanahmet Meydanı, 34122 Istanbul",
    phone: "+90 212 511 22 33",
    rating: 4.7,
    reviewCount: 375,
    specialties: {
      fr: ["Turquie complète", "Croisière Égée", "Culture ottomane"],
      en: ["Full Turkey", "Aegean cruise", "Ottoman culture"],
      ar: ["تركيا الشاملة", "رحلة بحرية إيجة", "الثقافة العثمانية"],
    },
    description: {
      fr: "Spécialiste des circuits en Turquie depuis Istanbul, parlant français et arabe. Circuits culturels, balnéaires et gastronomiques dans les plus belles régions turques.",
      en: "Turkey circuit specialist from Istanbul, speaking French and Arabic. Cultural, seaside and gastronomic tours across Turkey's finest regions.",
      ar: "متخصص في جولات تركيا من إسطنبول، ناطق بالفرنسية والعربية. جولات ثقافية وشاطئية وغاسترونومية في أجمل مناطق تركيا.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Turquie en 12 jours", en: "Turkey in 12 days", ar: "تركيا في 12 يومًا" },
        duration: { fr: "12 jours / 11 nuits", en: "12 days / 11 nights", ar: "12 يومًا / 11 ليلة" },
        pricePerPerson: 1050,
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Istanbul + Cappadoce + Pamukkale + Antalya", "Hôtels 4★", "Pension complète", "Transport interurbain inclus", "Guide arabe/français"],
          en: ["Istanbul + Cappadocia + Pamukkale + Antalya", "4★ hotels", "Full board", "Inter-city transport", "Arabic/French guide"],
          ar: ["إسطنبول + كابادوكيا + بامكالي + أنطاليا", "فنادق 4 نجوم", "إقامة كاملة", "مواصلات بين المدن", "مرشد عربي/فرنسي"],
        },
      },
    ],
    reviews: [
      { author: "Faiza T.", rating: 5, date: "2026-03-22", text: { fr: "Agence de confiance avec un guide qui parle arabe parfaitement. On a visité toute la Turquie en 12 jours, c'était inoubliable !", en: "Trustworthy agency with a guide who speaks Arabic perfectly. We visited all of Turkey in 12 days, it was unforgettable!", ar: "وكالة موثوقة مع مرشد يتحدث العربية بطلاقة. زرنا تركيا كاملة في 12 يومًا، لن تُنسى أبدًا!" } },
    ],
  },
  {
    id: "6",
    slug: "med-holidays",
    name: "Med Holidays",
    logo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Marseille", en: "Marseille", ar: "مرسيليا" },
    country: { fr: "France", en: "France", ar: "فرنسا" },
    address: "10 La Canebière, 13001 Marseille",
    phone: "+33 4 91 55 88 00",
    rating: 4.4,
    reviewCount: 142,
    specialties: {
      fr: ["Croisières Méditerranée", "Grèce & Îles", "Croisières familles"],
      en: ["Mediterranean cruises", "Greece & Islands", "Family cruises"],
      ar: ["رحلات بحرية متوسطية", "اليونان والجزر", "رحلات عائلية"],
    },
    description: {
      fr: "Spécialiste des croisières Méditerranée au départ de Marseille. Circuits Grèce, Italie, Espagne et Maroc avec départ depuis les ports français.",
      en: "Mediterranean cruise specialist departing from Marseille. Greece, Italy, Spain and Morocco circuits departing from French ports.",
      ar: "متخصص في الرحلات البحرية المتوسطية انطلاقًا من مرسيليا. جولات اليونان وإيطاليا وإسبانيا والمغرب من الموانئ الفرنسية.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Croisière Grèce & Îles Grecques", en: "Greece & Greek Islands Cruise", ar: "رحلة اليونان والجزر اليونانية" },
        duration: { fr: "10 jours / 9 nuits", en: "10 days / 9 nights", ar: "10 أيام / 9 ليالٍ" },
        pricePerPerson: 1600,
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Cabine océan sur paquebot 5★", "Pension complète à bord", "Escales Santorin + Mykonos + Athènes + Rhodes", "Animations & spectacles"],
          en: ["Ocean cabin on 5★ liner", "Full board onboard", "Stops: Santorini + Mykonos + Athens + Rhodes", "Entertainment & shows"],
          ar: ["كابينة محيطية على باخرة 5 نجوم", "إقامة كاملة على متن السفينة", "محطات سانتوريني + ميكونوس + أثينا + رودس", "فعاليات وعروض"],
        },
      },
    ],
    reviews: [
      { author: "Soraya H.", rating: 4, date: "2026-05-10", text: { fr: "Magnifique croisière ! La cabine était spacieuse et la nourriture excellente. Les escales en Grèce sont à couper le souffle.", en: "Magnificent cruise! The cabin was spacious and the food excellent. The Greek stops are breathtaking.", ar: "رحلة بحرية رائعة! كانت الكابينة فسيحة والطعام ممتازًا. محطات اليونان خلابة." } },
    ],
  },
  {
    id: "7",
    slug: "horizon-travel-group",
    name: "Horizon Travel Group",
    logo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Montréal", en: "Montreal", ar: "مونتريال" },
    country: { fr: "Canada", en: "Canada", ar: "كندا" },
    address: "1550 Rue Metcalfe, Montréal, QC H3A 1X6",
    phone: "+1 514 876 33 20",
    rating: 4.6,
    reviewCount: 98,
    specialties: {
      fr: ["Canada & USA", "Aurores boréales", "Road trips"],
      en: ["Canada & USA", "Northern lights", "Road trips"],
      ar: ["كندا والولايات المتحدة", "الأضواء الشمالية", "رحلات بالسيارة"],
    },
    description: {
      fr: "Agence franco-algérienne à Montréal, spécialiste des road trips en Amérique du Nord et des escapades aurorales au Yukon et en Islande.",
      en: "Franco-Algerian agency in Montreal, specialist in North American road trips and aurora getaways in Yukon and Iceland.",
      ar: "وكالة فرنسية-جزائرية في مونتريال، متخصصة في رحلات أمريكا الشمالية ورحلات الأضواء الشمالية في يوكون وآيسلندا.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Canada de l'Est — Québec & Ontario", en: "Eastern Canada — Quebec & Ontario", ar: "كندا الشرقية — كيبيك وأونتاريو" },
        duration: { fr: "14 jours / 13 nuits", en: "14 days / 13 nights", ar: "14 يومًا / 13 ليلة" },
        pricePerPerson: 2200,
        image: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Vol A/R Europe-Montréal", "Voiture de location incluse", "Hôtels & chalets 4★", "Niagara + Toronto + Québec + Mont-Tremblant", "Excursion baleines"],
          en: ["Return flight Europe-Montreal", "Rental car included", "4★ hotels & chalets", "Niagara + Toronto + Quebec + Mont-Tremblant", "Whale watching excursion"],
          ar: ["رحلة ذهاب وعودة أوروبا-مونتريال", "سيارة إيجار مشمولة", "فنادق وشاليهات 4 نجوم", "نياجرا + تورنتو + كيبيك + مون ترامبلان", "رحلة مشاهدة الحيتان"],
        },
      },
    ],
    reviews: [
      { author: "Djamel K.", rating: 5, date: "2026-02-14", text: { fr: "Voyage inoubliable au Canada. Tout était parfaitement organisé depuis Paris. La route vers les chutes du Niagara était spectaculaire !", en: "Unforgettable trip to Canada. Everything perfectly organised from Paris. The road to Niagara Falls was spectacular!", ar: "رحلة لا تُنسى إلى كندا. كل شيء منظم بشكل مثالي من باريس. الطريق إلى شلالات نياجرا كان مذهلًا!" } },
    ],
  },
  {
    id: "8",
    slug: "nile-valley-tours",
    name: "Nile Valley Tours",
    logo: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Le Caire", en: "Cairo", ar: "القاهرة" },
    country: { fr: "Égypte", en: "Egypt", ar: "مصر" },
    address: "22 Rue Talaat Harb, Le Caire",
    phone: "+20 2 23 95 44 66",
    rating: 4.7,
    reviewCount: 281,
    specialties: {
      fr: ["Égypte antique", "Croisière sur le Nil", "Rives de la Mer Rouge"],
      en: ["Ancient Egypt", "Nile cruise", "Red Sea shores"],
      ar: ["مصر الفرعونية", "رحلة نيلية", "شواطئ البحر الأحمر"],
    },
    description: {
      fr: "L'agence égyptienne de référence pour découvrir les merveilles antiques, les croisières sur le Nil et les plages de Hurghada et Charm el-Cheikh.",
      en: "The reference Egyptian agency for ancient wonders, Nile cruises and beaches of Hurghada and Sharm el-Sheikh.",
      ar: "الوكالة المصرية المرجعية لاكتشاف عجائب الفراعنة والرحلات النيلية وشواطئ الغردقة وشرم الشيخ.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Égypte Pharaonique + Croisière Nil", en: "Pharaonic Egypt + Nile Cruise", ar: "مصر الفرعونية + رحلة نيلية" },
        duration: { fr: "10 jours / 9 nuits", en: "10 days / 9 nights", ar: "10 أيام / 9 ليالٍ" },
        pricePerPerson: 780,
        image: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Pyramides + Sphinx + Louxor + Assouan", "Croisière Nil 5★ (4 nuits)", "Hôtel Le Caire 4★", "Guide archéologue", "Entrées tous sites"],
          en: ["Pyramids + Sphinx + Luxor + Aswan", "5★ Nile cruise (4 nights)", "4★ Cairo hotel", "Archaeologist guide", "All site entries"],
          ar: ["الأهرامات + أبو الهول + الأقصر + أسوان", "رحلة نيلية 5 نجوم (4 ليالٍ)", "فندق القاهرة 4 نجوم", "مرشد آثاري", "دخول جميع المواقع"],
        },
      },
    ],
    reviews: [
      { author: "Nassima B.", rating: 5, date: "2026-04-28", text: { fr: "Voyage extraordinaire en Égypte ! Les pyramides de nuit sous son, lumière et magie... La croisière sur le Nil était absolument sublime.", en: "Extraordinary trip to Egypt! The pyramids at night with sound and light... The Nile cruise was absolutely sublime.", ar: "رحلة استثنائية إلى مصر! الأهرامات ليلًا مع الصوت والضوء... الرحلة النيلية كانت رائعة في المطلق." } },
    ],
  },
  {
    id: "9",
    slug: "costa-holidays",
    name: "Costa Holidays",
    logo: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Barcelone", en: "Barcelona", ar: "برشلونة" },
    country: { fr: "Espagne", en: "Spain", ar: "إسبانيا" },
    address: "Passeig de Gràcia 92, 08008 Barcelone",
    phone: "+34 93 487 22 11",
    rating: 4.5,
    reviewCount: 175,
    specialties: {
      fr: ["Espagne & Portugal", "Andalousie", "Circuits culturels"],
      en: ["Spain & Portugal", "Andalusia", "Cultural tours"],
      ar: ["إسبانيا والبرتغال", "الأندلس", "جولات ثقافية"],
    },
    description: {
      fr: "Agence basée à Barcelone proposant les plus beaux circuits dans la péninsule ibérique. Experts du patrimoine andalou et de la culture hispano-arabe.",
      en: "Barcelona-based agency offering the finest tours across the Iberian peninsula. Experts in Andalusian heritage and Hispano-Arab culture.",
      ar: "وكالة في برشلونة تقدم أجمل الجولات في شبه الجزيرة الإيبيرية. خبراء في التراث الأندلسي والثقافة العربية الإسبانية.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Andalousie — Sur les pas des Maures", en: "Andalusia — In the Footsteps of the Moors", ar: "الأندلس — على خطى العرب" },
        duration: { fr: "9 jours / 8 nuits", en: "9 days / 8 nights", ar: "9 أيام / 8 ليالٍ" },
        pricePerPerson: 980,
        image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Séville + Cordoue + Grenade + Malaga", "Hôtels boutique 4★", "Demi-pension", "Guide spécialisé patrimoine arabe", "Alhambra + Mezquita + Alcazar"],
          en: ["Seville + Cordoba + Granada + Malaga", "4★ boutique hotels", "Half-board", "Arab heritage specialist guide", "Alhambra + Mezquita + Alcazar"],
          ar: ["إشبيلية + قرطبة + غرناطة + مالقة", "فنادق بوتيك 4 نجوم", "إقامة بنصف إشراف", "مرشد متخصص في التراث العربي", "الحمراء + المسجد الكبير + الألكازار"],
        },
      },
    ],
    reviews: [
      { author: "Rachid B.", rating: 5, date: "2026-03-05", text: { fr: "L'Alhambra de Grenade m'a coupé le souffle. Revoir le patrimoine de nos ancêtres en Andalousie était une expérience profondément émouvante.", en: "Granada's Alhambra left me breathless. Seeing our ancestors' heritage in Andalusia was a deeply moving experience.", ar: "قصر الحمراء في غرناطة أبهرني تمامًا. رؤية تراث أجدادنا في الأندلس كانت تجربة عاطفية عميقة." } },
    ],
  },
  {
    id: "10",
    slug: "golden-keys-travel",
    name: "Golden Keys Travel",
    logo: "https://images.unsplash.com/photo-1593604340846-4fbe9763a8f3?auto=format&fit=crop&w=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80",
    city: { fr: "Tlemcen", en: "Tlemcen", ar: "تلمسان" },
    country: { fr: "Algérie", en: "Algeria", ar: "الجزائر" },
    address: "8 Rue Khemisti, Tlemcen",
    phone: "+213 43 27 88 99",
    rating: 4.5,
    reviewCount: 87,
    specialties: {
      fr: ["Maghreb complet", "Voyage spirituel", "Seniors & famille"],
      en: ["Complete Maghreb", "Spiritual travel", "Seniors & families"],
      ar: ["المغرب العربي الكامل", "السياحة الروحية", "كبار السن والعائلات"],
    },
    description: {
      fr: "Agence familiale de Tlemcen spécialisée dans les circuits Maghreb complet (Algérie-Maroc-Tunisie) et les voyages spirituels à La Mecque et Médine.",
      en: "Family agency from Tlemcen specialising in full Maghreb circuits (Algeria-Morocco-Tunisia) and spiritual journeys to Mecca and Medina.",
      ar: "وكالة عائلية من تلمسان متخصصة في جولات المغرب العربي الكاملة (الجزائر-المغرب-تونس) والأسفار الروحية إلى مكة المكرمة والمدينة المنورة.",
    },
    packages: [
      {
        id: "p1",
        destination: { fr: "Grand Tour Maghreb 3 pays", en: "Grand Maghreb Tour — 3 countries", ar: "جولة المغرب العربي الكبرى — 3 دول" },
        duration: { fr: "14 jours / 13 nuits", en: "14 days / 13 nights", ar: "14 يومًا / 13 ليلة" },
        pricePerPerson: 750,
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
        includes: {
          fr: ["Alger + Tlemcen + Fès + Marrakech + Tunis + Djerba", "Hôtels 3–4★", "Demi-pension", "Bus grand confort", "Guide trilingue"],
          en: ["Algiers + Tlemcen + Fez + Marrakech + Tunis + Djerba", "3–4★ hotels", "Half-board", "Comfort coach", "Trilingual guide"],
          ar: ["الجزائر + تلمسان + فاس + مراكش + تونس + جربة", "فنادق 3–4 نجوم", "إقامة بنصف إشراف", "حافلة فاخرة", "مرشد ثلاثي اللغة"],
        },
      },
    ],
    reviews: [
      { author: "Zineb A.", rating: 4, date: "2026-01-30", text: { fr: "Circuit Maghreb très bien organisé. On a découvert Fès et Marrakech pour la première fois et c'était absolument magnifique.", en: "Very well organised Maghreb circuit. We discovered Fez and Marrakech for the first time and it was absolutely magnificent.", ar: "جولة المغرب منظمة جيدًا. اكتشفنا فاس ومراكش لأول مرة وكان ذلك رائعًا للغاية." } },
    ],
  },
];

// Collect all unique destinations across all agency packages
export const allDestinations = Array.from(
  new Set(agencies.flatMap((a) => a.packages.map((p) => p.destination.fr)))
);
