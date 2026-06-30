import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const theme = await prisma.themeSetting.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default", navy600: "#28465d", teal500: "#1b9aae" },
  });
  return NextResponse.json(theme);
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const data: { navy600?: string; teal500?: string; updatedById: string } = {
    updatedById: session.sub,
  };

  if ("navy600" in b) {
    if (typeof b.navy600 !== "string" || !HEX_COLOR.test(b.navy600)) {
      return NextResponse.json({ error: "navy600 must be a hex color, e.g. #28465d" }, { status: 400 });
    }
    data.navy600 = b.navy600;
  }
  if ("teal500" in b) {
    if (typeof b.teal500 !== "string" || !HEX_COLOR.test(b.teal500)) {
      return NextResponse.json({ error: "teal500 must be a hex color, e.g. #1b9aae" }, { status: 400 });
    }
    data.teal500 = b.teal500;
  }

  const theme = await prisma.themeSetting.update({ where: { id: "default" }, data });
  return NextResponse.json(theme);
}
