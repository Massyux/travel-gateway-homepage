import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { fetchTravelNews, type NewsCategory } from "@/lib/fetchNews";
import SectionHeading from "./SectionHeading";
import TravelNewsClient from "./TravelNewsClient";

export default async function TravelNewsSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("News");
  const items = await fetchTravelNews();

  return (
    <section id="news" className="relative overflow-hidden px-6 py-20 sm:py-28" style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 40%, #ccfbf1 100%)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-600">
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-xl text-navy-800/70">{t("subtitle")}</p>
          </div>
          <span className="text-sm text-navy-800/40">
            🔄 {t("refreshNote")}
          </span>
        </div>

        <TravelNewsClient items={items} locale={locale} />
      </div>
    </section>
  );
}
