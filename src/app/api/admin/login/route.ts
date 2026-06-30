import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAdminSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  const admin = await prisma.adminUser.findUnique({ where: { username } });
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  await createAdminSession({ sub: admin.id, username: admin.username });
  return NextResponse.json({ ok: true });
}
