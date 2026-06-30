import "server-only";
import { prisma } from "@/lib/prisma";
import type { FlightOffer } from "@/generated/prisma/client";

export async function getFlightOffers(): Promise<FlightOffer[]> {
  return prisma.flightOffer.findMany({ orderBy: { position: "asc" } });
}
