import "server-only";
import { prisma } from "@/lib/prisma";

const DEFAULT_THEME = { navy600: "#28465d", teal500: "#1b9aae" };

export async function getThemeSetting(): Promise<{ navy600: string; teal500: string }> {
  const theme = await prisma.themeSetting.findUnique({ where: { id: "default" } });
  return theme ? { navy600: theme.navy600, teal500: theme.teal500 } : DEFAULT_THEME;
}
