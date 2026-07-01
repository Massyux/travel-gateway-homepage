"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { Promo } from "@/generated/prisma/client";
import { pickLocaleField } from "@/lib/localeFields";
import SectionHeading from "./SectionHeading";
import Price from "./Price";

export default function PromoCarouselClient({ promos }: { promos: Promo[] }) {
  const t = useTranslations("Promos");
  const locale = useLocale() as Locale;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", duration: 40 },
    [Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing initial arrow-button state from the embla instance, then subscribing to its own change events (embla-carousel's documented integration pattern)
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="promos" className="py-16 sm:py-28">
      {/* Heading stays padded */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => emblaApi?.scrollPrev()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-colors hover:bg-navy-100"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="rtl:rotate-180">
                <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => emblaApi?.scrollNext()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-colors hover:bg-navy-100"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="rtl:rotate-180">
                <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel — full-width, no side padding so slides bleed to screen edges on mobile */}
      <div className="mt-8 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 pl-5 sm:pl-6">
          {promos.map((promo) => {
            const name = pickLocaleField(locale, promo.nameFr, promo.nameEn, promo.nameAr);
            const location = pickLocaleField(
              locale,
              promo.locationFr,
              promo.locationEn,
              promo.locationAr
            );
            return (
              <div
                key={promo.id}
                className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_44%] lg:flex-[0_0_29%]"
              >
                <article className="group overflow-hidden rounded-2xl bg-white shadow-sm shadow-navy-950/5 ring-1 ring-navy-900/5 transition-shadow hover:shadow-xl">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={promo.image}
                      alt={name}
                      fill
                      sizes="(min-width: 1024px) 29vw, (min-width: 640px) 44vw, 78vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute top-3 start-3 rounded-full bg-teal-500 px-3 py-1 text-xs font-bold text-white shadow">
                      -{promo.discountPercent}%
                    </span>
                    <span className="absolute top-3 end-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy-900">
                      ★ {promo.rating}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">
                      {location}
                    </p>
                    <h3 className="mt-1 font-display text-base font-semibold text-navy-950 leading-snug">
                      {name}
                    </h3>
                    <p className="mt-2 text-navy-950">
                      <Price amountEur={promo.priceEur} className="font-display text-lg font-semibold" />
                      <span className="text-sm text-navy-800/60"> {t("perNight")}</span>
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
