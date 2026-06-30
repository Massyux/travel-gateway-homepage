import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Espace administrateur — Silvi Tour",
  robots: { index: false, follow: false },
};

// /admin is intentionally outside the [locale] segment (internal staff tool,
// not part of the public translated site — see specs/001-homepage-phase-2).
// Since it's a top-level sibling of [locale], it needs its own root-style
// layout with <html>/<body> (there is no shared app/layout.tsx in this repo).
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full bg-sand-50 font-sans text-navy-950 antialiased">
        {children}
      </body>
    </html>
  );
}
