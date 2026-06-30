"use client";

import { useTranslations } from "next-intl";
import RevealOnScroll from "./RevealOnScroll";

export default function Newsletter() {
  const t = useTranslations("Newsletter");

  return (
    <section className="px-6 pb-20 sm:pb-28">
      <RevealOnScroll className="mx-auto max-w-4xl rounded-[2.5rem] bg-sand-100 px-8 py-12 text-center sm:px-14 sm:py-14">
        <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-navy-800/70">{t("subtitle")}</p>

        <form
          className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder={t("placeholder")}
            className="w-full rounded-full border border-navy-900/15 bg-white px-5 py-3 text-sm text-navy-950 outline-none transition-shadow focus:ring-2 focus:ring-navy-500"
          />
          <button
            type="submit"
            className="rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-950"
          >
            {t("cta")}
          </button>
        </form>
      </RevealOnScroll>
    </section>
  );
}
