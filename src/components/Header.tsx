"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import TicketLookupButton from "./TicketLookupButton";
import HeaderBrand from "./HeaderBrand";
import { getPlatformUrl } from "@/lib/platformLinks";

export default function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const b2cUrl = getPlatformUrl("b2c", locale);

  const links = [
    { href: b2cUrl, label: t("voyageOrganise") },
    { href: "#promos", label: t("promos") },
    { href: "#destinations", label: t("destinations") },
    { href: "#offers", label: t("offers") },
    { href: b2cUrl, label: t("visas") },
  ];

  const dark = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-sand-50/90 shadow-sm backdrop-blur-md"
          : "bg-gradient-to-b from-navy-950/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <HeaderBrand dark={dark} />

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link, i) => (
            <a
              key={`${link.href}-${i}`}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                dark ? "text-white/85 hover:text-white" : "text-navy-900/80 hover:text-navy-950"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <TicketLookupButton dark={dark} />
          <CurrencySwitcher dark={dark} />
          <LanguageSwitcher dark={dark} />
          <a
            href={getPlatformUrl("b2b", locale)}
            className={`text-sm font-semibold transition-colors ${
              dark ? "text-white/85 hover:text-white" : "text-navy-900/80 hover:text-navy-950"
            }`}
          >
            {t("pro")}
          </a>
          <a
            href={b2cUrl}
            className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-transform hover:-translate-y-0.5 hover:bg-teal-600"
          >
            {t("bookNow")}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            dark ? "text-white" : "text-navy-950"
          }`}
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
            <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-900/10 bg-sand-50 px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link, i) => (
              <a
                key={`${link.href}-${i}`}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-navy-900"
              >
                {link.label}
              </a>
            ))}
            <a href={getPlatformUrl("b2b", locale)} className="text-base font-semibold text-navy-900">
              {t("pro")}
            </a>
            <a
              href={b2cUrl}
              className="rounded-full bg-teal-500 px-5 py-3 text-center text-base font-semibold text-white"
            >
              {t("bookNow")}
            </a>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <TicketLookupButton />
              <CurrencySwitcher />
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
