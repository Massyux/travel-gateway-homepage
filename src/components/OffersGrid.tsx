import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getFlightOffers } from "@/lib/getFlightOffers";
import { pickLocaleField } from "@/lib/localeFields";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";
import Price from "./Price";

export default async function OffersGrid() {
  const t = await getTranslations("Offers");
  const locale = (await getLocale()) as Locale;
  const offers = await getFlightOffers();

  return (
    <section id="offers" className="bg-navy-50/0 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} align="center" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, i) => {
            const tag = pickLocaleField(locale, offer.tagFr, offer.tagEn, offer.tagAr);
            const from = pickLocaleField(locale, offer.fromFr, offer.fromEn, offer.fromAr);
            const to = pickLocaleField(locale, offer.toFr, offer.toEn, offer.toAr);
            return (
              <RevealOnScroll key={offer.id} delay={i * 0.08}>
                <article className="group relative h-72 overflow-hidden rounded-3xl shadow-sm shadow-navy-950/10">
                  <Image
                    src={offer.image}
                    alt={`${from} - ${to}`}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                  <span className="absolute top-4 start-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {tag}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="flex items-center gap-2 text-sm font-medium text-white/85">
                      {from}
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="rtl:rotate-180">
                        <path d="M0 5h13M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {to}
                    </p>
                    <p className="mt-2 font-display text-2xl font-semibold">
                      {t("from")} <Price amountEur={offer.priceEur} />
                    </p>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
