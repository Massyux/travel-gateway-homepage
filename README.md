# Silvi Tour — Homepage

Marketing homepage and B2B/B2C gateway for Silvi Tour, built with Next.js
(App Router), TypeScript, Tailwind CSS, and `next-intl` (fr/en/ar).

## Getting started

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

- `NEXT_PUBLIC_B2C_URL` / `NEXT_PUBLIC_B2B_URL` — the existing booking platforms.
- `DATABASE_URL`, `ADMIN_SESSION_SECRET`, `ADMIN_SEED_USERNAME`, `ADMIN_SEED_PASSWORD` —
  required for the admin space (see below).

Then set up the database and start the dev server:

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin space

Clicking the logo in the header reveals an "Espace administrateur" link
(`/admin`). It requires the `ADMIN_SEED_USERNAME` / `ADMIN_SEED_PASSWORD`
credentials from your `.env.local` (created by `prisma db seed`). From there,
an admin can create/edit/delete homepage promos and flight offers, and change
the two brand theme colors — changes are persisted to SQLite (`prisma/dev.db`)
and appear on the public homepage on next load, no redeploy needed.

See [specs/001-homepage-phase-2/](specs/001-homepage-phase-2/) for the full
spec, technical plan, and data model behind this feature.

## Project structure

- `src/app/[locale]/` — the public, translated (fr/en/ar) marketing site.
- `src/app/admin/` — the internal, French-only admin space (outside the
  `[locale]` segment on purpose — see `specs/001-homepage-phase-2/plan.md`).
- `src/app/api/admin/` — admin Route Handlers (auth, promos/offers/theme CRUD).
- `src/components/` — shared UI.
- `src/content/` — remaining static content (destinations, hero images,
  agencies). Promos and flight offers moved to the database in Phase 2.
- `src/lib/` — Prisma client, auth helpers, currency conversion, i18n field
  helpers.
- `prisma/` — schema, migrations, and the seed script.

## Scripts

```bash
npm run dev      # start the dev server (Turbopack)
npm run build    # production build
npm run start    # run the production build
npm run lint     # ESLint
npx tsc --noEmit # type-check
```

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
