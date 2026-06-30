import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

function validatePartialOfferInput(body: unknown) {
  if (typeof body !== "object" || body === null) return "Invalid body";
  const b = body as Record<string, unknown>;
  if ("priceEur" in b) {
    if (typeof b.priceEur !== "number" || b.priceEur <= 0) {
      return "priceEur must be greater than 0";
    }
  }
  const stringFields = [
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
  const error = validatePartialOfferInput(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  try {
    const offer = await prisma.flightOffer.update({
      where: { id },
      data: { ...(body as Record<string, unknown>), updatedById: session.sub },
    });
    return NextResponse.json(offer);
  } catch {
    return NextResponse.json({ error: "Flight offer not found" }, { status: 404 });
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
    await prisma.flightOffer.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Flight offer not found" }, { status: 404 });
  }
}
