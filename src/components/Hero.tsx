"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { getPlatformUrl } from "@/lib/platformLinks";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-700 pb-36 pt-40 sm:pb-44 sm:pt-48">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-black leading-tight sm:text-7xl lg:text-8xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2400&q=90')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.3))",
          }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 max-w-xl text-lg text-white/80"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={getPlatformUrl("b2c", locale)}
            className="rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-teal-500/30 transition-transform hover:-translate-y-0.5 hover:bg-teal-600"
          >
            {t("ctaB2c")}
          </a>
          <a
            href={getPlatformUrl("b2b", locale)}
            className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {t("ctaB2b")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
