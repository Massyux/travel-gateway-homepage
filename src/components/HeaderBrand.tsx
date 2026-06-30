"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import BrandLogo from "./BrandLogo";

/**
 * Clicking the logo reveals a small menu with a Home link and the
 * (otherwise-hidden) admin space entry point, per spec FR-009 — the admin
 * link must never be visible by default.
 */
export default function HeaderBrand({ dark = false }: { dark?: boolean }) {
  const t = useTranslations("BrandMenu");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="rounded-full"
      >
        <BrandLogo variant={dark ? "light" : "dark"} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul
            role="menu"
            className="absolute start-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-navy-900/10 bg-white py-1 shadow-xl"
          >
            <li>
              <Link
                href="/"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-navy-900 hover:bg-navy-100"
              >
                {t("home")}
              </Link>
            </li>
            <li>
              <NextLink
                href="/admin"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-navy-900 hover:bg-navy-100"
              >
                {t("admin")}
              </NextLink>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
