import "server-only";

export type NewsCategory = "vols" | "visa" | "destination" | "gds" | "tarifs";

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  source: string;
  sourceUrl: string;
  pubDate: string;
  image?: string;
  category: NewsCategory;
};

/* ──────────────────────────── helpers ──────────────────────────── */

function stripCdata(s: string): string {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function extractTag(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? stripCdata(m[1]).replace(/<[^>]+>/g, "").trim() : "";
}

function extractLink(block: string): string {
  // Try <link> (atom style can be <link href="..."/>) then plain tag
  const atom = block.match(/<link[^>]*href="([^"]+)"/i);
  if (atom) return atom[1];
  // RSS 2.0: <link> is a text node BUT may be mixed with CDATA
  const m = block.match(/<link>([\s\S]*?)<\/link>/i);
  if (m) return stripCdata(m[1]).trim();
  // Fallback: grab first http URL in <guid>
  const guid = block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i);
  if (guid) return stripCdata(guid[1]).trim();
  return "";
}

function extractImage(block: string): string | undefined {
  // <enclosure url="..." type="image/..."/>
  const enc = block.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image/i);
  if (enc) return enc[1];
  // <media:content url="..."/>
  const media = block.match(/<media:content[^>]+url="([^"]+)"/i);
  if (media) return media[1];
  // <media:thumbnail url="..."/>
  const thumb = block.match(/<media:thumbnail[^>]+url="([^"]+)"/i);
  if (thumb) return thumb[1];
  return undefined;
}

function categorise(title: string, desc: string): NewsCategory {
  const text = (title + " " + desc).toLowerCase();
  if (/visa|passport|entry|permit|immigration|trav(el|eller) doc/.test(text)) return "visa";
  if (/amadeus|sabre|galileo|travelport|gds|distribution|pnr|ndc|booking system|reservation system|ticketing system/.test(text)) return "gds";
  if (/price|fare|tarif|discount|deal|surcharge|fuel|fee|pricing|tarifaire/.test(text)) return "tarifs";
  if (/new route|launch|new flight|new destination|nonstop|direct fly|new service|expansion|nouvelle (ligne|destination|route)|nouveau vol/.test(text)) return "vols";
  return "destination";
}

function formatDate(raw: string): string {
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

/* ──────────────────────────── RSS parse ──────────────────────────── */

function parseRss(
  xml: string,
  source: string,
  sourceUrl: string,
  limit = 5
): NewsItem[] {
  const blocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  return blocks.slice(0, limit).map((block, i) => {
    const title = extractTag(block, "title");
    const link = extractLink(block);
    const pubDate = extractTag(block, "pubDate");
    const description = extractTag(block, "description")
      .replace(/\s+/g, " ")
      .slice(0, 200);
    const image = extractImage(block);
    const category = categorise(title, description);
    return {
      id: `${source}-${i}-${pubDate}`,
      title,
      excerpt: description,
      link,
      source,
      sourceUrl,
      pubDate: formatDate(pubDate),
      image,
      category,
    };
  });
}

/* ──────────────────────────── fallback static news ──────────────── */

const STATIC_NEWS: NewsItem[] = [
  {
    id: "static-1",
    title: "Air Algérie ouvre deux nouvelles lignes Delhi et Shanghai cet hiver",
    excerpt: "Pour la saison hivernale 2026/2027, Air Algérie lancera trois vols hebdomadaires vers Delhi et Shanghai, marquant une expansion stratégique vers l'Asie depuis Alger.",
    link: "https://www.algerie360.com/air-algerie-deux-nouvelles-destinations-en-asie-a-partir-doctobre-2026/",
    source: "Algérie360",
    sourceUrl: "https://www.algerie360.com",
    pubDate: "30 juin 2026",
    // avion en vol décollant vers l'Asie
    image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=800&q=80",
    category: "vols",
  },
  {
    id: "static-2",
    title: "Air Algérie : 5 nouvelles lignes internationales dès octobre 2026",
    excerpt: "Brazzaville, Conakry, Lagos, Tripoli et Koweït rejoignent le réseau international d'Air Algérie à partir du 26 octobre 2026, renforçant les liens avec l'Afrique et le Moyen-Orient.",
    link: "https://observalgerie.com/2026/06/30/voyage/air-algerie-5-nouvelles-lignes-internationales-des-octobre-2026",
    source: "ObservAlgérie",
    sourceUrl: "https://observalgerie.com",
    pubDate: "30 juin 2026",
    // avion en piste / tarmac vue Africa
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    category: "vols",
  },
  {
    id: "static-3",
    title: "Amadeus acquiert SkyLink pour accélérer l'IA dans la billetterie",
    excerpt: "Amadeus a annoncé l'acquisition de SkyLink, startup spécialisée dans l'orchestration IA et l'automatisation conversationnelle. Cette acquisition renforce les capacités d'intelligence artificielle de la plateforme Amadeus.",
    link: "https://amadeus.com/en/newsroom/press-releases/skylink-ai-acquisition",
    source: "Amadeus",
    sourceUrl: "https://amadeus.com",
    pubDate: "11 mai 2026",
    // écran de réservation / interface GDS Amadeus
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    category: "gds",
  },
  {
    id: "static-4",
    title: "Travelport lance TripServices, sa plateforme API pour l'ère de l'IA",
    excerpt: "Travelport a présenté TripServices, une plateforme API de nouvelle génération qui unifie les réservations de vols et d'hébergements via une connexion unique, adaptée aux usages intelligents.",
    link: "https://www.travelport.com/press-releases",
    source: "Travelport",
    sourceUrl: "https://www.travelport.com",
    pubDate: "11 juin 2026",
    // interface tech / tableau de bord numérique
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    category: "gds",
  },
  {
    id: "static-5",
    title: "Riyadh Air étend son réseau : Malaga, Kuala Lumpur et Dhaka",
    excerpt: "La nouvelle compagnie saoudienne Riyadh Air annonce l'ouverture de routes vers Malaga (saisonnière), Kuala Lumpur et Dhaka. Le réseau continue de s'étoffer avec une flotte de Boeing 787-9.",
    link: "https://aviationweek.com/air-transport/airports-networks/routes-networks-latest-rolling-daily-updates-wc-june-29-2026",
    source: "Aviation Week",
    sourceUrl: "https://aviationweek.com",
    pubDate: "1 juil. 2026",
    // Boeing 787 Dreamliner en vol
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80",
    category: "vols",
  },
  {
    id: "static-6",
    title: "Schengen : frais de visa maintenus à 90 € pour 2026",
    excerpt: "Les frais de demande de visa court séjour Schengen restent fixés à 90 € pour les adultes. La procédure pour les Algériens passe par le centre Capago (Alger, Oran, Constantine) depuis 2025.",
    link: "https://france-visas.gouv.fr",
    source: "France-Visas",
    sourceUrl: "https://france-visas.gouv.fr",
    pubDate: "1 janv. 2026",
    // passeport + tampons visa Schengen
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
    category: "visa",
  },
  {
    id: "static-7",
    title: "USA : caution de 15 000 $ imposée aux ressortissants algériens",
    excerpt: "Depuis janvier 2026, les ressortissants algériens éligibles au visa B1/B2 américain doivent déposer une caution (bond) pouvant atteindre 15 000 USD, conformément au décret présidentiel 10998.",
    link: "https://dz.usembassy.gov/visas/",
    source: "US Embassy Algiers",
    sourceUrl: "https://dz.usembassy.gov",
    pubDate: "21 janv. 2026",
    // drapeau américain / ambassade / documents visa USA
    image: "https://images.unsplash.com/photo-1585152968992-d2b9444408cc?auto=format&fit=crop&w=800&q=80",
    category: "visa",
  },
  {
    id: "static-8",
    title: "Condor lance une ligne directe Frankfurt–Le Caire quotidienne",
    excerpt: "La compagnie allemande Condor a inauguré un service quotidien entre Francfort et le Caire, renforçant la connectivité entre l'Allemagne et le Proche-Orient.",
    link: "https://aviationweek.com/air-transport/airports-networks/routes-networks-latest-rolling-daily-updates-wc-june-29-2026",
    source: "Aviation Week",
    sourceUrl: "https://aviationweek.com",
    pubDate: "30 juin 2026",
    // pyramides de Gizeh / Le Caire Egypte
    image: "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?auto=format&fit=crop&w=800&q=80",
    category: "vols",
  },
  {
    id: "static-9",
    title: "Amadeus lance une plateforme publicitaire IA avec Accenture",
    excerpt: "Amadeus a dévoilé une plateforme publicitaire basée sur l'IA, développée avec Accenture. Elle aide les marques de voyage à anticiper les tendances de demande et optimiser automatiquement leurs budgets.",
    link: "https://www.ttgasia.com/2026/06/05/amadeus-launches-ai-driven-travel-advertising-platform-with-accenture/",
    source: "TTG Asia",
    sourceUrl: "https://www.ttgasia.com",
    pubDate: "5 juin 2026",
    // intelligence artificielle / data visualisation / écrans tech
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80",
    category: "gds",
  },
  {
    id: "static-10",
    title: "Singapore Airlines augmente ses vols vers Manchester, Milan et Munich",
    excerpt: "À partir de juillet 2026, Singapore Airlines renforcera ses fréquences vers Manchester, Milan Malpensa, Munich et Londres Gatwick, répondant à une forte demande sur ces axes premium.",
    link: "https://simpleflying.com",
    source: "Simple Flying",
    sourceUrl: "https://simpleflying.com",
    pubDate: "15 juin 2026",
    // Singapore Airlines — avion en vol ou aéroport Changi
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    category: "vols",
  },
  {
    id: "static-11",
    title: "Qatar Airways : fin des extensions automatiques de visa le 7 juin",
    excerpt: "Le ministère de l'Intérieur du Qatar a mis fin au mécanisme d'extension automatique de visa le 7 juin 2026, rétablissant les règles et délais standard de renouvellement.",
    link: "https://www.qatarairways.com/en/travel-alerts.html",
    source: "Qatar Airways",
    sourceUrl: "https://www.qatarairways.com",
    pubDate: "7 juin 2026",
    // Doha skyline / Qatar Airways
    image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=800&q=80",
    category: "visa",
  },
  {
    id: "static-12",
    title: "EasyJet ouvre 13 nouvelles routes hivernales 2026-27 depuis le Royaume-Uni",
    excerpt: "EasyJet a annoncé 13 nouvelles routes pour l'hiver 2026-27, dont le premier service vers Nuremberg. Les liaisons partent de Londres Gatwick, Luton et Manchester.",
    link: "https://simpleflying.com",
    source: "Simple Flying",
    sourceUrl: "https://simpleflying.com",
    pubDate: "29 juin 2026",
    // avion low-cost orange sur piste (EasyJet couleur orange)
    image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=800&q=80",
    category: "vols",
  },
];

/* ──────────────────────────── RSS fetchers ──────────────────────── */

async function fetchFeed(
  url: string,
  source: string,
  sourceUrl: string,
  limit = 4
): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cache 1h
      headers: { "User-Agent": "SilviTour-NewsReader/1.0" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml, source, sourceUrl, limit);
  } catch {
    return [];
  }
}

/* ──────────────────────────── public API ──────────────────────────── */

export async function fetchTravelNews(): Promise<NewsItem[]> {
  const [simpleFlying, eturbonews] = await Promise.all([
    fetchFeed("https://simpleflying.com/feed/", "Simple Flying", "https://simpleflying.com", 5),
    fetchFeed("https://www.eturbonews.com/feed/", "eTurboNews", "https://www.eturbonews.com", 4),
  ]);

  const live = [...simpleFlying, ...eturbonews].filter(
    (item) => item.title.length > 10
  );

  // Merge live + static, deduplicate by title prefix
  const seen = new Set<string>();
  const merged: NewsItem[] = [];

  const addItems = (items: NewsItem[]) => {
    for (const item of items) {
      const key = item.title.slice(0, 30).toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(item);
      }
    }
  };

  addItems(live);
  addItems(STATIC_NEWS);

  return merged.slice(0, 12);
}
