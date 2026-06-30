import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { destinations } from "@/content/destinations";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";

export default async function DestinationsGrid() {
  const t = await getTranslations("Destinations");
  const locale = (await getLocale()) as Locale;

  return (
    <section id="destinations" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-5 sm:auto-rows-[240px] lg:grid-cols-4">
          {destinations.map((dest, i) => (
            <RevealOnScroll
              key={dest.id}
              delay={Math.min(i, 4) * 0.07}
              className={
                dest.size === "lg"
                  ? "col-span-2 row-span-2"
                  : "col-span-2 sm:col-span-1"
              }
            >
              <article className="group relative h-full overflow-hidden rounded-3xl">
                <Image
                  src={dest.image}
                  alt={dest.name[locale]}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/0 to-transparent transition-opacity group-hover:from-navy-950/85" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="font-display text-xl font-semibold">{dest.name[locale]}</p>
                  <p className="text-sm text-white/75">{dest.country[locale]}</p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
