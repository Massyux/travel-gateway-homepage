"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CURRENCIES, type Currency } from "@/lib/currency";

const STORAGE_KEY = "silvitour.currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function isCurrency(value: string | null): value is Currency {
  return !!value && (CURRENCIES as readonly string[]).includes(value);
}

export default function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    // Reading localStorage can only happen client-side; a lazy useState
    // initializer would throw during SSR since `window` isn't defined there.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isCurrency(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from an external store (localStorage) on mount, not derivable any other way under SSR
      setCurrencyState(stored);
    }
  }, []);

  function setCurrency(next: Currency) {
    setCurrencyState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
