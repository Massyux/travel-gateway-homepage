"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function HelpButton() {
  const t = useTranslations("Help");
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 end-6 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-navy-900/10">
          <p className="font-display text-base font-semibold text-navy-950">{t("title")}</p>
          <p className="mt-1 text-sm text-navy-800/70">{t("subtitle")}</p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="https://wa.me/0000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-teal-500/10 px-3 py-2.5 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-500/15"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-white">
                ✓
              </span>
              {t("whatsapp")}
            </a>
            <a
              href="tel:+0000000000"
              className="flex items-center gap-2 rounded-xl bg-navy-100 px-3 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-100/70"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-700 text-white">
                ☎
              </span>
              {t("phone")}
            </a>
            <a
              href="mailto:contact@silvitour.com"
              className="flex items-center gap-2 rounded-xl bg-navy-100 px-3 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-100/70"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-700 text-white">
                ✉
              </span>
              {t("email")}
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("tooltip")}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white shadow-xl shadow-teal-500/40 transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-teal-500/60" />
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 18.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="10.5" r="1" fill="currentColor" />
            <circle cx="12.5" cy="10.5" r="1" fill="currentColor" />
            <circle cx="16" cy="10.5" r="1" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
