import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

function validatePartialPromoInput(body: unknown) {
  if (typeof body !== "object" || body === null) return "Invalid body";
  const b = body as Record<string, unknown>;
  if ("discountPercent" in b) {
    if (typeof b.discountPercent !== "number" || b.discountPercent < 0 || b.discountPercent > 100) {
      return "discountPercent must be between 0 and 100";
    }
  }
  if ("priceEur" in b) {
    if (typeof b.priceEur !== "number" || b.priceEur <= 0) {
      return "priceEur must be greater than 0";
    }
  }
  if ("rating" in b) {
    if (typeof b.rating !== "number" || b.rating < 0 || b.rating > 5) {
      return "rating must be between 0 and 5";
    }
  }
  const stringFields = [
    "slug",
    "image",
    "nameFr",
    "nameEn",
    "nameAr",
    "locationFr",
    "locationEn",
    "locationAr",
  ];
  for (const key of stringFields) {
    if (key in b && (typeof b[key] !== "string" || (b[key] as string).trim() === "")) {
      return `${key} must be a non-empty string`;
    }
  }
  return null;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const error = validatePartialPromoInput(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  try {
    const promo = await prisma.promo.update({
      where: { id },
      data: { ...(body as Record<string, unknown>), updatedById: session.sub },
    });
    return NextResponse.json(promo);
  } catch {
    return NextResponse.json({ error: "Promo not found" }, { status: 404 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.promo.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Promo not found" }, { status: 404 });
  }
}
