import { getTranslations, getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { agencies } from "@/content/agencies";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";

export default async function AboutFilialesSection() {
  const t = await getTranslations("About");
  const locale = (await getLocale()) as Locale;

  return (
    <section id="about" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {agencies.map((agency, i) => (
            <RevealOnScroll key={agency.id} delay={Math.min(i, 7) * 0.06}>
              <div className="flex h-full flex-col items-center gap-2 rounded-2xl bg-sand-100 px-4 py-6 text-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="text-teal-500"
                >
                  <path
                    d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                <p className="font-display text-base font-semibold text-navy-950">
                  {agency.city ? agency.city[locale] : agency.country[locale]}
                </p>
                {agency.city && (
                  <p className="text-sm text-navy-800/60">{agency.country[locale]}</p>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
