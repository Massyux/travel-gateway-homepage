import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Cairo, Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpButton from "@/components/HelpButton";
import CurrencyProvider from "@/components/CurrencyProvider";
import { getThemeSetting } from "@/lib/getThemeSetting";
import "../globals.css";

// This route reads Promo/FlightOffer/ThemeSetting from the database (via
// page.tsx's children and the theme read below), which admins can edit at
// any time — the page must be rendered per-request, not frozen at build
// time, so admin changes are visible without a redeploy (spec SC-006).
export const dynamic = "force-dynamic";

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const arabicFont = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
});

const brandFont = Poppins({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Silvi Tour — Hôtels, vols & séjours",
  description:
    "Réservez vos hôtels et billets d'avion aux meilleurs prix. Espace voyageurs et espace professionnel dédié aux agences partenaires.",
  icons: {
    icon: "/brand/silvitour-icon.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const theme = await getThemeSetting();

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${displayFont.variable} ${sansFont.variable} ${arabicFont.variable} ${brandFont.variable} h-full antialiased`}
    >
      <head>
        <style>{`:root { --color-navy-600: ${theme.navy600}; --color-teal-500: ${theme.teal500}; }`}</style>
      </head>
      <body className="min-h-full flex flex-col bg-sand-50 text-navy-950 font-sans">
        <NextIntlClientProvider messages={messages}>
          <CurrencyProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <HelpButton />
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
