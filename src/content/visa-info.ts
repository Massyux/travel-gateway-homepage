import type { Locale } from "@/i18n/routing";

export type VisaStatus = "required" | "on-arrival" | "visa-free" | "e-visa";

export type VisaDestination = {
  id: string;
  flag: string;
  name: Record<Locale, string>;
  status: VisaStatus;
  maxStay: Record<Locale, string>;
  fee: Record<Locale, string>;
  processingTime: Record<Locale, string>;
  requirements: Record<Locale, string[]>;
  notes: Record<Locale, string>;
  officialUrl: string;
};

export const visaDestinations: VisaDestination[] = [
  {
    id: "schengen",
    flag: "🇪🇺",
    name: { fr: "Espace Schengen", en: "Schengen Area", ar: "منطقة شنغن" },
    status: "required",
    maxStay: {
      fr: "90 jours sur 180 jours glissants",
      en: "90 days in any 180-day period",
      ar: "90 يومًا في أي فترة 180 يومًا متتالية",
    },
    fee: { fr: "~90 € adulte", en: "~€90 adult", ar: "~90 يورو للبالغين" },
    processingTime: {
      fr: "15 à 30 jours ouvrés",
      en: "15 to 30 working days",
      ar: "من 15 إلى 30 يوم عمل",
    },
    requirements: {
      fr: [
        "Passeport valide 3 mois après la date de retour",
        "Photo biométrique récente",
        "Formulaire de demande de visa signé",
        "Justificatif d'hébergement (hôtel ou invitation)",
        "Itinéraire de voyage et billet aller-retour",
        "Assurance voyage couvrant ≥ 30 000 €",
        "Relevés bancaires des 3 derniers mois",
        "Lettre d'employeur ou justificatif d'activité",
      ],
      en: [
        "Passport valid 3 months after return date",
        "Recent biometric photo",
        "Signed visa application form",
        "Proof of accommodation (hotel or invitation)",
        "Travel itinerary and return ticket",
        "Travel insurance covering ≥ €30,000",
        "Bank statements for the last 3 months",
        "Employer letter or proof of activity",
      ],
      ar: [
        "جواز سفر ساري المفعول 3 أشهر بعد تاريخ العودة",
        "صورة بيومترية حديثة",
        "استمارة طلب التأشيرة موقعة",
        "إثبات الإقامة (فندق أو دعوة)",
        "خط سير الرحلة وتذكرة العودة",
        "تأمين سفر يغطي ≥ 30,000 يورو",
        "كشوف حساب بنكي لآخر 3 أشهر",
        "خطاب من صاحب العمل أو إثبات النشاط",
      ],
    },
    notes: {
      fr: "Déposez votre dossier au centre Capago (Alger, Oran, Constantine). Le visa Schengen donne accès aux 27 pays de l'espace (France, Espagne, Italie, Allemagne, Portugal…).",
      en: "Submit your application at a Capago centre (Algiers, Oran, Constantine). The Schengen visa gives access to 27 countries (France, Spain, Italy, Germany, Portugal…).",
      ar: "قدّم طلبك في مركز كاباغو (الجزائر العاصمة، وهران، قسنطينة). تتيح تأشيرة شنغن الدخول إلى 27 دولة (فرنسا، إسبانيا، إيطاليا، ألمانيا، البرتغال...).",
    },
    officialUrl: "https://france-visas.gouv.fr",
  },
  {
    id: "turkey",
    flag: "🇹🇷",
    name: { fr: "Turquie", en: "Turkey", ar: "تركيا" },
    status: "e-visa",
    maxStay: {
      fr: "30 jours (entrée unique)",
      en: "30 days (single entry)",
      ar: "30 يومًا (دخول واحد)",
    },
    fee: { fr: "~35 USD", en: "~$35 USD", ar: "~35 دولار أمريكي" },
    processingTime: {
      fr: "24 à 48 heures",
      en: "24 to 48 hours",
      ar: "من 24 إلى 48 ساعة",
    },
    requirements: {
      fr: [
        "Passeport ordinaire valide 60 jours après la durée de séjour",
        "Visa valide d'un pays Schengen, Irlande, États-Unis ou Royaume-Uni — OU permis de résidence dans l'un de ces pays (condition obligatoire)",
        "Carte bancaire pour paiement en ligne",
        "Adresse e-mail valide",
      ],
      en: [
        "Ordinary passport valid 60 days beyond the stay period",
        "Valid visa from a Schengen country, Ireland, USA, or UK — OR residence permit in one of these countries (mandatory condition)",
        "Bank card for online payment",
        "Valid email address",
      ],
      ar: [
        "جواز سفر عادي ساري المفعول لمدة 60 يومًا بعد انتهاء فترة الإقامة",
        "تأشيرة سارية من دولة شنغن أو أيرلندا أو الولايات المتحدة أو المملكة المتحدة — أو إذن إقامة في إحدى هذه الدول (شرط إلزامي)",
        "بطاقة بنكية للدفع الإلكتروني",
        "عنوان بريد إلكتروني صالح",
      ],
    },
    notes: {
      fr: "Sans visa Schengen/US/UK valide, vous devez déposer votre demande à l'ambassade de Turquie à Alger. L'e-visa est valable 180 jours à partir de la date d'émission.",
      en: "Without a valid Schengen/US/UK visa, you must apply at the Turkish Embassy in Algiers. The e-visa is valid for 180 days from the issue date.",
      ar: "بدون تأشيرة شنغن/أمريكية/بريطانية سارية، يجب تقديم طلبك في السفارة التركية بالجزائر العاصمة. التأشيرة الإلكترونية صالحة 180 يومًا من تاريخ الإصدار.",
    },
    officialUrl: "https://www.evisa.gov.tr",
  },
  {
    id: "uae",
    flag: "🇦🇪",
    name: { fr: "Dubaï / Émirats arabes unis", en: "Dubai / UAE", ar: "دبي / الإمارات العربية المتحدة" },
    status: "required",
    maxStay: {
      fr: "30 à 90 jours selon le visa choisi",
      en: "30 to 90 days depending on visa type",
      ar: "من 30 إلى 90 يومًا حسب نوع التأشيرة",
    },
    fee: {
      fr: "Visa 30 j : ~270 AED (≈ 9 900 DZD)",
      en: "30-day visa: ~AED 270 (≈ 9,900 DZD)",
      ar: "تأشيرة 30 يومًا: ~270 درهم (≈ 9,900 دج)",
    },
    processingTime: {
      fr: "3 à 5 jours ouvrés",
      en: "3 to 5 working days",
      ar: "من 3 إلى 5 أيام عمل",
    },
    requirements: {
      fr: [
        "Passeport valide 6 mois minimum",
        "Photo d'identité récente fond blanc",
        "Réservation hôtelière confirmée",
        "Billet d'avion aller-retour",
        "Assurance voyage",
        "Relevés bancaires (3 mois)",
      ],
      en: [
        "Passport valid at least 6 months",
        "Recent ID photo on white background",
        "Confirmed hotel reservation",
        "Return airline ticket",
        "Travel insurance",
        "Bank statements (3 months)",
      ],
      ar: [
        "جواز سفر صالح لمدة 6 أشهر على الأقل",
        "صورة هوية حديثة بخلفية بيضاء",
        "حجز فندق مؤكد",
        "تذكرة طيران ذهاب وإياب",
        "تأمين سفر",
        "كشوف حساب بنكي (3 أشهر)",
      ],
    },
    notes: {
      fr: "La demande s'effectue entièrement en ligne. La réponse est transmise par e-mail. Vous pouvez aussi postuler via une agence de voyage agréée aux Émirats.",
      en: "The application is fully online. The response is sent by email. You can also apply through an accredited travel agency in the UAE.",
      ar: "يتم تقديم الطلب إلكترونيًا بالكامل ويُرسل الرد عبر البريد الإلكتروني. يمكنك أيضًا التقديم عبر وكالة سفر معتمدة في الإمارات.",
    },
    officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id",
  },
  {
    id: "canada",
    flag: "🇨🇦",
    name: { fr: "Canada", en: "Canada", ar: "كندا" },
    status: "required",
    maxStay: {
      fr: "Jusqu'à 6 mois (décidé à l'entrée)",
      en: "Up to 6 months (decided at entry)",
      ar: "حتى 6 أشهر (تُحدَّد عند الدخول)",
    },
    fee: { fr: "185 CAD (visa + biométrie)", en: "CAD $185 (visa + biometrics)", ar: "185 دولار كندي (تأشيرة + بيومتري)" },
    processingTime: {
      fr: "4 à 8 semaines",
      en: "4 to 8 weeks",
      ar: "من 4 إلى 8 أسابيع",
    },
    requirements: {
      fr: [
        "Passeport valide pour toute la durée du séjour",
        "Formulaire IMM 5257 (demande de visa visiteur)",
        "Formulaire IMM 5645 (informations sur la famille)",
        "Photo récente aux normes canadiennes",
        "Preuve de liens avec l'Algérie (emploi, famille, biens)",
        "Relevés bancaires démontrant des ressources suffisantes",
        "Itinéraire de voyage",
        "Données biométriques (empreintes + photo)",
      ],
      en: [
        "Passport valid for the entire stay",
        "Form IMM 5257 (visitor visa application)",
        "Form IMM 5645 (family information)",
        "Recent photo meeting Canadian standards",
        "Proof of ties to Algeria (employment, family, assets)",
        "Bank statements showing sufficient funds",
        "Travel itinerary",
        "Biometrics (fingerprints + photo)",
      ],
      ar: [
        "جواز سفر صالح لكامل فترة الإقامة",
        "استمارة IMM 5257 (طلب تأشيرة زيارة)",
        "استمارة IMM 5645 (معلومات عائلية)",
        "صورة حديثة وفق المعايير الكندية",
        "إثبات الارتباط بالجزائر (عمل، أسرة، أصول)",
        "كشوف حساب بنكي تثبت توفر الأموال الكافية",
        "خط سير الرحلة",
        "بيانات بيومترية (بصمات + صورة)",
      ],
    },
    notes: {
      fr: "Toutes les demandes se font en ligne via le portail IRCC (Immigration Canada). Il n'est pas nécessaire de se rendre à l'ambassade pour déposer le dossier, sauf convocation pour biométrie.",
      en: "All applications are submitted online through the IRCC portal (Immigration Canada). No embassy visit is required to submit, except if called for biometrics.",
      ar: "تُقدَّم جميع الطلبات إلكترونيًا عبر بوابة IRCC (الهجرة الكندية). لا يلزم زيارة السفارة لتقديم الملف، إلا إذا استُدعيت لأخذ البيانات البيومترية.",
    },
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html",
  },
  {
    id: "usa",
    flag: "🇺🇸",
    name: { fr: "États-Unis", en: "United States", ar: "الولايات المتحدة الأمريكية" },
    status: "required",
    maxStay: {
      fr: "Jusqu'à 6 mois (décidé à l'entrée)",
      en: "Up to 6 months (decided at entry)",
      ar: "حتى 6 أشهر (تُحدَّد عند الدخول)",
    },
    fee: { fr: "185 USD (non remboursable)", en: "$185 USD (non-refundable)", ar: "185 دولار أمريكي (غير قابل للاسترداد)" },
    processingTime: {
      fr: "Plusieurs semaines à plusieurs mois",
      en: "Several weeks to several months",
      ar: "من عدة أسابيع إلى عدة أشهر",
    },
    requirements: {
      fr: [
        "Passeport valide 6 mois après la date d'entrée",
        "Formulaire DS-160 (demande de visa non-immigrant)",
        "Photo aux normes américaines",
        "Preuve de ressources financières suffisantes",
        "Preuve de liens solides avec l'Algérie (emploi, famille, bien immobilier)",
        "Entretien à l'ambassade américaine à Alger obligatoire",
        "Caution pouvant aller jusqu'à 15 000 USD (décret 2026)",
      ],
      en: [
        "Passport valid 6 months after entry date",
        "DS-160 form (non-immigrant visa application)",
        "US-standard photo",
        "Proof of sufficient financial resources",
        "Proof of strong ties to Algeria (job, family, property)",
        "Mandatory interview at the US Embassy in Algiers",
        "Bond of up to $15,000 USD (2026 executive order)",
      ],
      ar: [
        "جواز سفر صالح 6 أشهر بعد تاريخ الدخول",
        "استمارة DS-160 (طلب تأشيرة غير هجرة)",
        "صورة وفق المعايير الأمريكية",
        "إثبات توفر الموارد المالية الكافية",
        "إثبات الارتباط القوي بالجزائر (عمل، أسرة، عقار)",
        "مقابلة إلزامية في السفارة الأمريكية بالجزائر العاصمة",
        "ضمان مالي يصل إلى 15,000 دولار (مرسوم 2026)",
      ],
    },
    notes: {
      fr: "Depuis janvier 2026, les ressortissants algériens éligibles au visa B1/B2 doivent verser une caution (bond) pouvant atteindre 15 000 USD. Les délais et les conditions peuvent évoluer : consultez le site de l'ambassade avant de planifier votre voyage.",
      en: "Since January 2026, Algerian nationals eligible for a B1/B2 visa must post a bond of up to $15,000 USD. Timelines and conditions may change — check the embassy website before planning your trip.",
      ar: "منذ يناير 2026، يُلزَم المواطنون الجزائريون المؤهلون للحصول على تأشيرة B1/B2 بدفع كفالة مالية تصل إلى 15,000 دولار. قد تتغير الشروط والمهل — راجع موقع السفارة قبل التخطيط لرحلتك.",
    },
    officialUrl: "https://dz.usembassy.gov/visas/",
  },
];

export type VisaFreeEntry = {
  flag: string;
  country: Record<Locale, string>;
  maxStay: Record<Locale, string>;
  type: "visa-free" | "on-arrival";
};

export const visaFreeCountries: VisaFreeEntry[] = [
  { flag: "🇹🇳", country: { fr: "Tunisie", en: "Tunisia", ar: "تونس" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇲🇦", country: { fr: "Maroc", en: "Morocco", ar: "المغرب" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇲🇾", country: { fr: "Malaisie", en: "Malaysia", ar: "ماليزيا" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇪🇨", country: { fr: "Équateur", en: "Ecuador", ar: "الإكوادور" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇬🇲", country: { fr: "Gambie", en: "Gambia", ar: "غامبيا" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇧🇧", country: { fr: "Barbade", en: "Barbados", ar: "باربادوس" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇧🇯", country: { fr: "Bénin", en: "Benin", ar: "بنين" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇸🇷", country: { fr: "Suriname", en: "Suriname", ar: "سورينام" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇭🇹", country: { fr: "Haïti", en: "Haiti", ar: "هايتي" }, maxStay: { fr: "3 mois", en: "3 months", ar: "3 أشهر" }, type: "visa-free" },
  { flag: "🇩🇲", country: { fr: "Dominique", en: "Dominica", ar: "دومينيكا" }, maxStay: { fr: "21 jours", en: "21 days", ar: "21 يومًا" }, type: "visa-free" },
  { flag: "🇲🇱", country: { fr: "Mali", en: "Mali", ar: "مالي" }, maxStay: { fr: "3 mois", en: "3 months", ar: "3 أشهر" }, type: "visa-free" },
  { flag: "🇲🇷", country: { fr: "Mauritanie", en: "Mauritania", ar: "موريتانيا" }, maxStay: { fr: "3 mois", en: "3 months", ar: "3 أشهر" }, type: "visa-free" },
  { flag: "🇳🇮", country: { fr: "Nicaragua", en: "Nicaragua", ar: "نيكاراغوا" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇰🇪", country: { fr: "Kenya", en: "Kenya", ar: "كينيا" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "visa-free" },
  { flag: "🇷🇼", country: { fr: "Rwanda", en: "Rwanda", ar: "رواندا" }, maxStay: { fr: "30 jours", en: "30 days", ar: "30 يومًا" }, type: "visa-free" },
  { flag: "🇯🇴", country: { fr: "Jordanie", en: "Jordan", ar: "الأردن" }, maxStay: { fr: "30 jours", en: "30 days", ar: "30 يومًا" }, type: "on-arrival" },
  { flag: "🇱🇧", country: { fr: "Liban", en: "Lebanon", ar: "لبنان" }, maxStay: { fr: "30 jours", en: "30 days", ar: "30 يومًا" }, type: "on-arrival" },
  { flag: "🇲🇻", country: { fr: "Maldives", en: "Maldives", ar: "جزر المالديف" }, maxStay: { fr: "30 jours", en: "30 days", ar: "30 يومًا" }, type: "on-arrival" },
  { flag: "🇲🇺", country: { fr: "Maurice", en: "Mauritius", ar: "موريشيوس" }, maxStay: { fr: "15 jours", en: "15 days", ar: "15 يومًا" }, type: "on-arrival" },
  { flag: "🇸🇳", country: { fr: "Sénégal", en: "Senegal", ar: "السنغال" }, maxStay: { fr: "90 jours", en: "90 days", ar: "90 يومًا" }, type: "on-arrival" },
];
