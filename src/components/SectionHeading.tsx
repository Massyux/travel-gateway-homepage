import RevealOnScroll from "./RevealOnScroll";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <RevealOnScroll
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <span className="inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-600">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-navy-800/70">{subtitle}</p>
      )}
    </RevealOnScroll>
  );
}
