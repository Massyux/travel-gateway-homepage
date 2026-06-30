export type Platform = "b2c" | "b2b";

const PLATFORM_URLS: Record<Platform, string> = {
  b2c: process.env.NEXT_PUBLIC_B2C_URL ?? "https://www.silvitour.com/",
  b2b: process.env.NEXT_PUBLIC_B2B_URL ?? "https://agent.silvibooking.com/",
};

export function getPlatformUrl(platform: Platform, locale: string) {
  const url = new URL(PLATFORM_URLS[platform]);
  url.searchParams.set("utm_source", "homepage");
  url.searchParams.set("utm_medium", "gateway");
  url.searchParams.set("lang", locale);
  return url.toString();
}
