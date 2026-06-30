import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

function validatePromoInput(body: unknown) {
  if (typeof body !== "object" || body === null) return "Invalid body";
  const b = body as Record<string, unknown>;
  const requiredStrings = [
    "slug",
    "image",
    "nameFr",
    "nameEn",
    "nameAr",
    "locationFr",
    "locationEn",
    "locationAr",
  ];
  for (const key of requiredStrings) {
    if (typeof b[key] !== "string" || (b[key] as string).trim() === "") {
      return `${key} is required`;
    }
  }
  if (typeof b.discountPercent !== "number" || b.discountPercent < 0 || b.discountPercent > 100) {
    return "discountPercent must be between 0 and 100";
  }
  if (typeof b.priceEur !== "number" || b.priceEur <= 0) {
    return "priceEur must be greater than 0";
  }
  if (typeof b.rating !== "number" || b.rating < 0 || b.rating > 5) {
    return "rating must be between 0 and 5";
  }
  return null;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const promos = await prisma.promo.findMany({ orderBy: { position: "asc" } });
  return NextResponse.json(promos);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const error = validatePromoInput(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const b = body as Record<string, unknown>;
  try {
    const promo = await prisma.promo.create({
      data: {
        slug: b.slug as string,
        image: b.image as string,
        discountPercent: b.discountPercent as number,
        priceEur: b.priceEur as number,
        rating: b.rating as number,
        nameFr: b.nameFr as string,
        nameEn: b.nameEn as string,
        nameAr: b.nameAr as string,
        locationFr: b.locationFr as string,
        locationEn: b.locationEn as string,
        locationAr: b.locationAr as string,
        position: typeof b.position === "number" ? b.position : 0,
        updatedById: session.sub,
      },
    });
    return NextResponse.json(promo, { status: 201 });
  } catch {
    return NextResponse.json({ error: "A promo with this slug already exists" }, { status: 400 });
  }
}
