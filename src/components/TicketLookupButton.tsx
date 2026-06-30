"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Status = "idle" | "success" | "empty";

export default function TicketLookupButton({ dark = false }: { dark?: boolean }) {
  const t = useTranslations("TicketLookup");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function close() {
    setOpen(false);
    setValue("");
    setStatus("idle");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) {
      setStatus("empty");
      return;
    }
    setStatus("success");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
          dark
            ? "border-white/30 text-white hover:bg-white/10"
            : "border-navy-900/15 text-navy-900 hover:bg-navy-100"
        }`}
        aria-expanded={open}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V18l-2.5 2v1.5L12 20l4.5 1.5V20L14 18v-4.5l7-2.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
        {t("button")}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, width: 0 }}
            animate={{ opacity: 1, y: 0, width: "auto" }}
            exit={{ opacity: 0, y: -8, width: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute end-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-4 shadow-xl"
          >
            {status === "success" ? (
              <div>
                <p className="text-sm text-navy-800">{t("success")}</p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-3 text-xs font-semibold text-teal-600 hover:underline"
                >
                  OK
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (status === "empty") setStatus("idle");
                  }}
                  placeholder={t("placeholder")}
                  className="w-full rounded-xl border border-navy-900/15 px-3 py-2 text-sm text-navy-900 outline-none focus:border-teal-500"
                  autoFocus
                />
                {status === "empty" && (
                  <p className="text-xs text-red-600">{t("empty")}</p>
                )}
                <button
                  type="submit"
                  className="rounded-xl bg-teal-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
                >
                  {t("submit")}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
