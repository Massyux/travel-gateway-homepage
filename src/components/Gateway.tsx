"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import RevealOnScroll from "./RevealOnScroll";
import { getPlatformUrl } from "@/lib/platformLinks";

const CARDS = [
  {
    key: "b2c" as const,
    // Warm beach / vacation vibes for B2C travellers
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90",
    // Frosted glass tint (teal)
    overlay: "from-teal-500/70 via-teal-600/65 to-teal-700/75",
  },
  {
    key: "b2b" as const,
    // Airplane wing above clouds — professional / travel business feel
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=90",
    // Frosted glass tint (navy)
    overlay: "from-navy-700/75 via-navy-800/70 to-navy-950/80",
  },
];

export default function Gateway() {
  const t = useTranslations("Gateway");
  const locale = useLocale();

  const cards = [
    {
      ...CARDS[0],
      tag: t("b2c.tag"),
      title: t("b2c.title"),
      desc: t("b2c.desc"),
      cta: t("b2c.cta"),
    },
    {
      ...CARDS[1],
      tag: t("b2b.tag"),
      title: t("b2b.title"),
      desc: t("b2b.desc"),
      cta: t("b2b.cta"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-950 px-6 py-20 sm:py-28">
      {/* Section background — high-quality aerial landscape, barely visible
          as a texture behind the dark overlay */}
      <Image
        src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=2800&q=90"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20"
      />
      {/* Subtle gradient over the section BG so cards pop out */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-navy-950/60" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Force white text since section is now dark */}
        <RevealOnScroll className="max-w-2xl mx-auto text-center">
          <span className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-semibold text-white/90">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-white/70">{t("subtitle")}</p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <RevealOnScroll key={card.key} delay={i * 0.12}>
              <a
                href={getPlatformUrl(card.key, locale)}
                className="group relative block h-full min-h-[280px] overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/40 transition-transform duration-300 hover:-translate-y-1.5 sm:min-h-[320px]"
              >
                {/* Card background image */}
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Frosted glass "goutte d'eau" overlay — blurs the image
                    slightly through the semi-transparent tinted layer */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.overlay} backdrop-blur-[3px]`}
                />

                {/* Content on top of the frosted glass */}
                <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white sm:p-10">
                  <div>
                    <span className="inline-block rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
                      {card.tag}
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold drop-shadow-sm sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-white/85 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                    {card.cta}
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                      className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    >
                      <path
                        d="M1 6h14M9 1l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
