import Image from "next/image";

export default function BrandLogo({
  variant = "dark",
  iconSize = 46,
}: {
  variant?: "dark" | "light";
  iconSize?: number;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/brand/silvitour-icon.png"
        alt=""
        width={iconSize}
        height={iconSize}
        priority
        style={{ width: iconSize, height: iconSize }}
      />
      <span
        className={`font-brand text-xl font-extrabold uppercase tracking-wide ${
          variant === "light" ? "text-white" : "text-navy-900"
        }`}
      >
        Silvi<span className="text-teal-500">Tour</span>
      </span>
    </span>
  );
}
