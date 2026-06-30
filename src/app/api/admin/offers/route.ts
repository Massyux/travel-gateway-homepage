import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

function validateOfferInput(body: unknown) {
  if (typeof body !== "object" || body === null) return "Invalid body";
  const b = body as Record<string, unknown>;
  const requiredStrings = [
    "slug",
    "image",
    "tagFr",
    "tagEn",
    "tagAr",
    "fromFr",
    "fromEn",
    "fromAr",
    "toFr",
    "toEn",
    "toAr",
  ];
  for (const key of requiredStrings) {
    if (typeof b[key] !== "string" || (b[key] as string).trim() === "") {
      return `${key} is required`;
    }
  }
  if (typeof b.priceEur !== "number" || b.priceEur <= 0) {
    return "priceEur must be greater than 0";
  }
  return null;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const offers = await prisma.flightOffer.findMany({ orderBy: { position: "asc" } });
  return NextResponse.json(offers);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const error = validateOfferInput(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const b = body as Record<string, unknown>;
  try {
    const offer = await prisma.flightOffer.create({
      data: {
        slug: b.slug as string,
        image: b.image as string,
        priceEur: b.priceEur as number,
        tagFr: b.tagFr as string,
        tagEn: b.tagEn as string,
        tagAr: b.tagAr as string,
        fromFr: b.fromFr as string,
        fromEn: b.fromEn as string,
        fromAr: b.fromAr as string,
        toFr: b.toFr as string,
        toEn: b.toEn as string,
        toAr: b.toAr as string,
        position: typeof b.position === "number" ? b.position : 0,
        updatedById: session.sub,
      },
    });
    return NextResponse.json(offer, { status: 201 });
  } catch {
    return NextResponse.json({ error: "A flight offer with this slug already exists" }, { status: 400 });
  }
}
