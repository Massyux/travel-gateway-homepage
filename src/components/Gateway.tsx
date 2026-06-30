"use client";

import { useTranslations, useLocale } from "next-intl";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { getPlatformUrl } from "@/lib/platformLinks";

export default function Gateway() {
  const t = useTranslations("Gateway");
  const locale = useLocale();

  const cards = [
    {
      key: "b2c" as const,
      tag: t("b2c.tag"),
      title: t("b2c.title"),
      desc: t("b2c.desc"),
      cta: t("b2c.cta"),
      gradient: "from-teal-500 to-teal-600",
    },
    {
      key: "b2b" as const,
      tag: t("b2b.tag"),
      title: t("b2b.title"),
      desc: t("b2b.desc"),
      cta: t("b2b.cta"),
      gradient: "from-navy-700 to-navy-900",
    },
  ];

  return (
    <section className="bg-sand-50 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <RevealOnScroll key={card.key} delay={i * 0.12}>
              <a
                href={getPlatformUrl(card.key, locale)}
                className={`group block h-full rounded-3xl bg-gradient-to-br ${card.gradient} p-8 text-white shadow-2xl shadow-navy-950/20 transition-transform duration-300 hover:-translate-y-1.5 sm:p-10`}
              >
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {card.tag}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-sm text-white/85">{card.desc}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
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
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
