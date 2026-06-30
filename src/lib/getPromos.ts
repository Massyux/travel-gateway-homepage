import "server-only";
import { prisma } from "@/lib/prisma";
import type { Promo } from "@/generated/prisma/client";

export async function getPromos(): Promise<Promo[]> {
  return prisma.promo.findMany({ orderBy: { position: "asc" } });
}
