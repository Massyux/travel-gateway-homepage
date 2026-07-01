import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");
const prisma = new PrismaClient({ adapter: new PrismaPg(url) });

const promos = [
  { slug: "santorini", image: "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=2400&q=80", discountPercent: 30, priceEur: 189, rating: 4.8, nameFr: "Resort vue caldeira", nameEn: "Caldera View Resort", nameAr: "منتجع بإطلالة على الكالديرا", locationFr: "Santorin, Grèce", locationEn: "Santorini, Greece", locationAr: "سانتوريني، اليونان", position: 0 },
  { slug: "marrakech-promo", image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=80", discountPercent: 25, priceEur: 79, rating: 4.7, nameFr: "Riad & spa traditionnel", nameEn: "Traditional Riad & Spa", nameAr: "رياض تقليدي ومنتجع صحي", locationFr: "Marrakech, Maroc", locationEn: "Marrakech, Morocco", locationAr: "مراكش، المغرب", position: 1 },
  { slug: "maldives", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=2400&q=80", discountPercent: 20, priceEur: 349, rating: 4.9, nameFr: "Villa sur pilotis", nameEn: "Overwater Villa", nameAr: "فيلا فوق الماء", locationFr: "Maldives", locationEn: "Maldives", locationAr: "جزر المالديف", position: 2 },
  { slug: "paris-promo", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=80", discountPercent: 15, priceEur: 129, rating: 4.6, nameFr: "Boutique-hôtel design", nameEn: "Design Boutique Hotel", nameAr: "فندق بوتيك بتصميم عصري", locationFr: "Paris, France", locationEn: "Paris, France", locationAr: "باريس، فرنسا", position: 3 },
  { slug: "dubai-promo", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2400&q=80", discountPercent: 22, priceEur: 159, rating: 4.8, nameFr: "Tour all-inclusive 5★", nameEn: "5★ All-Inclusive Tower", nameAr: "برج خمس نجوم شامل كليًا", locationFr: "Dubaï, EAU", locationEn: "Dubai, UAE", locationAr: "دبي، الإمارات", position: 4 },
  { slug: "bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=80", discountPercent: 28, priceEur: 99, rating: 4.7, nameFr: "Villa rizières & piscine", nameEn: "Rice Terrace Pool Villa", nameAr: "فيلا بمسبح وسط حقول الأرز", locationFr: "Ubud, Bali", locationEn: "Ubud, Bali", locationAr: "أوبود، بالي", position: 5 },
];

const offers = [
  { slug: "paris-istanbul", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80", priceEur: 59, tagFr: "Vol direct", tagEn: "Direct flight", tagAr: "رحلة مباشرة", fromFr: "Paris", fromEn: "Paris", fromAr: "باريس", toFr: "Istanbul", toEn: "Istanbul", toAr: "إسطنبول", position: 0 },
  { slug: "lyon-casablanca", image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1600&q=80", priceEur: 89, tagFr: "Bon plan", tagEn: "Best deal", tagAr: "عرض مميز", fromFr: "Lyon", fromEn: "Lyon", fromAr: "ليون", toFr: "Casablanca", toEn: "Casablanca", toAr: "الدار البيضاء", position: 1 },
  { slug: "marseille-dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80", priceEur: 249, tagFr: "Escale courte", tagEn: "Short layover", tagAr: "توقف قصير", fromFr: "Marseille", fromEn: "Marseille", fromAr: "مرسيليا", toFr: "Dubaï", toEn: "Dubai", toAr: "دبي", position: 2 },
  { slug: "paris-bangkok", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=80", priceEur: 399, tagFr: "Long-courrier", tagEn: "Long-haul", tagAr: "رحلة طويلة", fromFr: "Paris", fromEn: "Paris", fromAr: "باريس", toFr: "Bangkok", toEn: "Bangkok", toAr: "بانكوك", position: 3 },
];

async function main() {
  const username = process.env.ADMIN_SEED_USERNAME;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (!username || !password) {
    throw new Error(
      "ADMIN_SEED_USERNAME and ADMIN_SEED_PASSWORD must be set (see .env.example)"
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { username },
    update: {},
    create: { username, passwordHash },
  });
  console.log(`Seeded admin user "${username}"`);

  for (const promo of promos) {
    await prisma.promo.upsert({
      where: { slug: promo.slug },
      update: promo,
      create: promo,
    });
  }
  console.log(`Seeded ${promos.length} promos`);

  for (const offer of offers) {
    await prisma.flightOffer.upsert({
      where: { slug: offer.slug },
      update: offer,
      create: offer,
    });
  }
  console.log(`Seeded ${offers.length} flight offers`);

  await prisma.themeSetting.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default", navy600: "#28465d", teal500: "#1b9aae" },
  });
  console.log("Seeded default theme settings");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
