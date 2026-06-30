"use client";

import { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import { heroImages } from "@/content/heroImages";
import RevealOnScroll from "./RevealOnScroll";

type StatItem = { value: string; label: string };

export default function TrustBar() {
  const t = useTranslations("Trust");
  const items = t.raw("items") as StatItem[];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div ref={emblaRef} className="absolute inset-0 -z-20 overflow-hidden">
        <div className="flex h-full">
          {heroImages.map((src) => (
            <div key={src} className="relative h-full flex-[0_0_100%]">
              <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-navy-950/80" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {items.map((item, i) => (
          <RevealOnScroll key={item.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-3xl font-semibold text-white sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-white/70">{item.label}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
