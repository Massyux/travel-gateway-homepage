import { getTranslations } from "next-intl/server";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";

type Testimonial = { quote: string; name: string; role: string };

export default async function Testimonials() {
  const t = await getTranslations("Testimonials");
  const items = t.raw("items") as Testimonial[];

  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((item, i) => (
            <RevealOnScroll key={item.name} delay={i * 0.1}>
              <figure className="h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-navy-900/5">
                <p className="text-teal-500 text-2xl leading-none">&ldquo;</p>
                <blockquote className="mt-2 text-navy-900/85">{item.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 font-display text-sm font-semibold text-navy-700">
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-navy-950">{item.name}</span>
                    <span className="block text-xs text-navy-800/60">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
