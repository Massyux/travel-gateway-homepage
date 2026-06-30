"use client";

import { useTranslations, useLocale } from "next-intl";
import RevealOnScroll from "./RevealOnScroll";
import { getPlatformUrl } from "@/lib/platformLinks";

export default function B2BBanner() {
  const t = useTranslations("B2B");
  const locale = useLocale();
  const points = t.raw("points") as string[];

  return (
    <section className="px-6 py-20 sm:py-28">
      <RevealOnScroll className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy-900 to-navy-950 px-8 py-14 text-white sm:px-14 sm:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-navy-200">
              {t("eyebrow")}
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">{t("title")}</h2>
            <p className="mt-4 max-w-xl text-white/75">{t("desc")}</p>
            <a
              href={getPlatformUrl("b2b", locale)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-transform hover:-translate-y-0.5 hover:bg-teal-600"
            >
              {t("cta")}
            </a>
          </div>

          <ul className="space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal-500/90 text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm text-white/85">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>
    </section>
  );
}
