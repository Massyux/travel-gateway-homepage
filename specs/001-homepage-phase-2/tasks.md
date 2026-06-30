# Tasks: Homepage Phase 2 Enhancements

**Input**: Design documents from `/specs/001-homepage-phase-2/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/admin-api.md, quickstart.md

**Tests**: No automated test suite exists in this project (per constitution); no test tasks are included. Verification is the manual `quickstart.md` walkthrough (final Polish task).

**Organization**: Tasks are grouped by user story (P1 About/filiales, P2 currency, P3 ticket lookup, P4 admin) so each can be implemented and verified independently after the shared Foundational phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps to US1 (About/filiales), US2 (currency), US3 (ticket lookup), US4 (admin)

## Path Conventions

Single Next.js project. Paths below are relative to the repo root, matching `plan.md`'s Project Structure.

---

## Phase 1: Setup

**Purpose**: Add the new dependencies and scaffolding this feature needs.

- [X] T001 Install new dependencies: `npm install prisma @prisma/client bcryptjs jose` and `npm install -D @types/bcryptjs`
- [X] T002 Run `npx prisma init --datasource-provider sqlite` to scaffold `prisma/schema.prisma` and add `DATABASE_URL` to `.env`
- [X] T003 [P] Extend `.env.example` with `DATABASE_URL`, `ADMIN_SESSION_SECRET`, `ADMIN_SEED_USERNAME`, `ADMIN_SEED_PASSWORD` (placeholder values, per `quickstart.md` Prerequisites)
- [X] T004 [P] Add `prisma/dev.db` and `.env.local` to `.gitignore` if not already covered

**Checkpoint**: `npx prisma --version` and `npm run dev` both still work; no schema changes yet.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Persistence, auth primitives, and route protection that User Stories 2 and 4 both depend on. US1 and US3 do not depend on this phase and may be built in parallel with it.

**⚠️ CRITICAL**: US2 and US4 cannot start until this phase is complete.

- [X] T005 Define `AdminUser`, `Promo`, `FlightOffer`, `ThemeSetting` models in `prisma/schema.prisma` per `data-model.md` (fields, types, unique constraints, relations)
- [X] T006 Run `npx prisma migrate dev --name init` to create the initial migration and generate the Prisma client
- [X] T007 [P] Create the Prisma client singleton in `src/lib/prisma.ts` (standard Next.js dev-hot-reload-safe pattern: reuse `globalThis.prisma` in development). Note: Prisma 7 requires an explicit driver adapter (`@prisma/adapter-better-sqlite3` + `better-sqlite3`, installed) passed to `new PrismaClient({ adapter })` — schema-level `datasource.url` is no longer supported (discovered via the CLI's own validation error).
- [X] T008 [P] Implement `src/lib/auth.ts`: `hashPassword`/`verifyPassword` (bcryptjs), `signSession`/`verifySessionToken` (jose, HS256, `ADMIN_SESSION_SECRET`), `createAdminSession`/`destroyAdminSession`/`getAdminSession`, and a `requireAdminSession()` helper for Server Components that redirects when no valid session exists. Cookie name factored into `src/lib/session-constants.ts` (no `server-only` guard) so `src/proxy.ts` can share it without pulling in server-only-guarded code.
- [X] T009 Write `prisma/seed.ts`: create one `AdminUser` from `ADMIN_SEED_USERNAME`/`ADMIN_SEED_PASSWORD` (hashed), insert the current promos/offers content into `Promo`/`FlightOffer` (numeric `priceEur`/`discountPercent`, self-contained — not importing the soon-to-be-deleted static content files), and insert the current brand colors (`#28465d`, `#1b9aae`) as the default `ThemeSetting` row; wired via `migrations.seed` in `prisma.config.ts` (Prisma 7 moved seed config out of `package.json`'s `prisma.seed` field)
- [X] T010 Run `npx prisma db seed` and verify the seeded rows (verified via a throwaway query script: 6 promos, 4 offers, 1 theme row, 1 admin user)
- [X] T011 Create `src/lib/getPromos.ts` and `src/lib/getFlightOffers.ts`: small server-only functions that read `Promo`/`FlightOffer` from Prisma (ordered by `position`)
- [X] T012 Extend `src/proxy.ts`: branch on `pathname.startsWith("/admin")` before delegating to next-intl's middleware — `/admin/login` passes through, everything else under `/admin` gets an optimistic cookie-only JWT check (jose, no DB call) redirecting to `/admin/login` when absent/invalid. Verified: `/admin` → 307 to `/admin/login` with no session; `/fr` still 200.

**Checkpoint**: `npx prisma studio` shows seeded Promo/FlightOffer/AdminUser/ThemeSetting rows; the homepage still renders unchanged (not yet wired to the new data functions until US2).

---

## Phase 3: User Story 1 - Discover the company and its agencies (Priority: P1) 🎯 MVP

**Goal**: A trust-building About/filiales section listing all 8 agency locations, fully translated.

**Independent Test**: Load `/fr`, `/en`, `/ar` and confirm the section renders correctly (including RTL at `/ar`) — no dependency on Foundational phase persistence work.

### Implementation for User Story 1

- [X] T013 [P] [US1] Create `src/content/agencies.ts` exporting a typed `agencies: Agency[]` array (8 entries: Algiers DZ, Rouïba DZ, Niamey NE, India, Dubai UAE, Chad, Venice IT, Paris FR) with `city`/`country` as `Record<Locale, string>` (India/Chad have `city: null` — no specific city given, country shown alone)
- [X] T014 [P] [US1] Add `About` message keys (eyebrow, title, trust paragraph mentioning 16+ years of experience) to `src/messages/en.json`, `src/messages/fr.json`, `src/messages/ar.json`
- [X] T015 [US1] Create `src/components/AboutFilialesSection.tsx` (Server Component, mirrors `DestinationsGrid.tsx`/`TrustBar.tsx` structure: `SectionHeading` + `RevealOnScroll` grid of the 8 agencies) reading from `agencies.ts` and the `About` messages
- [X] T016 [US1] Wire `AboutFilialesSection` into `src/app/[locale]/page.tsx`, as the last section before the persistent `Footer` (per the original request: "ajouter tout en bas")
- [X] T017 [US1] Verified via Playwright screenshot at `/fr` and `/ar`: grid renders correctly, Arabic RTL mirrors column order and right-aligns text with no layout breakage, mobile 2-col / desktop 4-col grid both readable

**Checkpoint**: About/filiales section is live and correct in all 3 locales — independently shippable.

---

## Phase 4: User Story 2 - Browse prices in a familiar currency (Priority: P2)

**Goal**: EUR/USD/DZD switcher that updates every visible price on the homepage.

**Independent Test**: Switch currency, confirm PromoCarousel + OffersGrid prices update instantly and the choice survives reload and locale switches, per `quickstart.md` P2 section.

### Implementation for User Story 2

- [X] T018 [P] [US2] Implement `src/lib/currency.ts`: `CURRENCIES = ["EUR","USD","DZD"]`, fixed rate table (clearly commented as indicative/manual), and `formatPrice(amountEur: number, currency: Currency, locale: Locale): string` using `Intl.NumberFormat`
- [X] T019 [US2] Create `src/components/CurrencyProvider.tsx` ("use client"): React Context holding the selected currency, initialized from `localStorage` key `silvitour.currency` (default `"EUR"`), persisting on change, independent of locale
- [X] T020 [US2] Wrap the app with `CurrencyProvider` in `src/app/[locale]/layout.tsx`
- [X] T021 [P] [US2] Create `src/components/CurrencySwitcher.tsx` ("use client"), visually mirroring `LanguageSwitcher.tsx`'s button/dropdown pattern, listing EUR/USD/DZD
- [X] T022 [US2] Add `CurrencySwitcher` next to `LanguageSwitcher` in `src/components/Header.tsx` (desktop nav + mobile menu)
- [X] T023 [US2] Create `src/components/Price.tsx` ("use client"): renders `formatPrice(...)` from context currency + next-intl locale
- [X] T024 [US2] Split `PromoCarousel` into a Server Component (`PromoCarousel.tsx`, calls `getPromos()`) + `PromoCarouselClient.tsx` (keeps the embla carousel interactivity, now reads Prisma `Promo` fields via `pickLocaleField` and renders `<Price>`) — embla's client-side state required keeping the carousel itself client-side
- [X] T025 [US2] Update `src/components/OffersGrid.tsx` (already a Server Component) to fetch via `getFlightOffers()` and render `<Price amountEur={offer.priceEur} />` + `pickLocaleField` for tag/from/to
- [X] T026 [US2] Currency message keys: none needed — currency codes (EUR/USD/DZD) are self-explanatory, mirroring the existing `LanguageSwitcher`'s untranslated FR/EN/AR codes (decision recorded in research.md R3)
- [X] T027 [US2] Deleted `src/content/promos.ts` and `src/content/offers.ts` (confirmed zero remaining imports via grep before deleting)

**Verified**: `tsc --noEmit` clean; Playwright test switched EUR→USD on `/fr`, confirmed all 4 offer prices converted (59€→63,72 $US etc.) with correct French currency formatting, and confirmed the selection survived a full page reload.

**Checkpoint**: Currency switching works end-to-end on the public homepage; US1 still works; US3/US4 not required.

---

## Phase 5: User Story 3 - Start a ticket / flight lookup from the homepage (Priority: P3)

**Goal**: "Voir mon billet" header button that reveals a ticket/PNR input and acknowledges submission (UI-only this phase).

**Independent Test**: Click the button, submit a value, see an inline acknowledgement; submit empty, see a validation message — per `quickstart.md` P3 section.

### Implementation for User Story 3

- [X] T028 [P] [US3] Added `TicketLookup` message keys (button, placeholder, submit, success, empty) to all 3 locale files (done together with the T014 message batch)
- [X] T029 [US3] Created `src/components/TicketLookupButton.tsx` ("use client"): button reveals a `framer-motion` `AnimatePresence` panel with the ticket/PNR input; empty submit shows inline validation, non-empty submit shows an acknowledgement message (no network call, per FR-008)
- [X] T030 [US3] Added `TicketLookupButton` to `src/components/Header.tsx` desktop nav cluster and mobile menu

**Verified**: Playwright — clicking "Voir mon billet" opens the panel; submitting empty shows "Merci de saisir un numéro de billet ou de PNR."; submitting "ABC123" shows the success acknowledgement. No page reload at any point.

**Checkpoint**: Ticket lookup entry point works independently of US1/US2/US4.

---

## Phase 6: User Story 4 - Manage offers and homepage colors from an admin space (Priority: P4)

**Goal**: Logo-revealed, authenticated admin space to create/edit/delete promos and flight offers and change two theme colors, persisted and reflected on the public site.

**Independent Test**: Log in, edit an offer and a theme color, confirm both appear on the public homepage on next load and survive a `npm run dev` restart — per `quickstart.md` P4 section.

### Implementation for User Story 4

- [X] T031 [US4] Created `src/components/HeaderBrand.tsx` (client component, replaces the old `<Link href="/"><BrandLogo/></Link>` in `Header.tsx`): clicking the logo toggles a popover with "Accueil" (home link) and "Espace administrateur" (`/admin`, plain `<a>` since it's outside the locale routing tree) — not visible by default, per FR-009
- [X] T032 [P] [US4] `POST /api/admin/login` in `src/app/api/admin/login/route.ts`
- [X] T033 [P] [US4] `POST /api/admin/logout` in `src/app/api/admin/logout/route.ts`
- [X] T034 [P] [US4] `GET /api/admin/me` in `src/app/api/admin/me/route.ts`
- [X] T035 [US4] `src/app/admin/login/page.tsx`: login form posting to `/api/admin/login`
- [X] T036 [US4] `src/app/admin/(protected)/layout.tsx`: calls `requireAdminSession()` (real server-side check, independent of the proxy's optimistic one), renders shell chrome + `AdminLogoutButton`
- [X] T037 [US4] `src/app/admin/(protected)/page.tsx`: dashboard linking to Promos/Offers/Theme
- [X] T038 [P] [US4] Promos CRUD routes (`/api/admin/promos`, `/api/admin/promos/[id]`) with full validation per data-model.md
- [X] T039 [P] [US4] FlightOffer CRUD routes (`/api/admin/offers`, `/api/admin/offers/[id]`)
- [X] T040 [P] [US4] Theme route (`/api/admin/theme`), hex color validation
- [X] T041 [US4] `src/app/admin/(protected)/promos/page.tsx`: list + modal create/edit/delete form, all 3 locale variants
- [X] T042 [US4] `src/app/admin/(protected)/offers/page.tsx`: same pattern for FlightOffer
- [X] T043 [US4] `src/app/admin/(protected)/theme/page.tsx`: two color pickers + save confirmation
- [X] T044 [US4] `src/app/[locale]/layout.tsx`: added `getThemeSetting()` read + inline `<style>` override of `--color-navy-600`/`--color-teal-500`. **Important addition beyond the original task description**: also added `export const dynamic = "force-dynamic"` — without it, `generateStaticParams` would have frozen all DB-backed content (offers, promos, theme) at build time, silently breaking the "no redeploy needed" requirement (SC-006) in production (`next build && next start`); not visible in `next dev`, which always renders per-request regardless.
- [X] T045 [US4] Rate limiting/lockout confirmed out of scope per spec; login failures return a generic "Identifiants invalides" message (no user enumeration)

**Route structure note**: `/admin` sits outside `[locale]` and has no shared `app/layout.tsx` to inherit from (none exists in this repo — `[locale]/layout.tsx` is the de facto root for the public site). Since Next.js requires every top-level route tree to have a layout with `<html>/<body>`, `src/app/admin/layout.tsx` was added as an independent root-style layout for the whole `/admin/**` subtree.

**Verified end-to-end via Playwright + curl**:
- Unauthenticated `/admin` → redirects to `/admin/login` (proxy, 307) — confirmed again after a full `npm run dev` restart.
- Login with seeded credentials → dashboard.
- Edited a flight offer's price (59€→777€) → confirmed updated price live on the public `/fr` homepage.
- Edited the `teal500` theme color → confirmed CTA buttons/logo accent changed live on the public homepage.
- Logout (curl cookie-jar trace) → session cookie cleared, `/admin` redirects again.
- Reset both test edits back to original seed values after verification; confirmed via direct DB query (post dev-server-restart) that the reset persisted.
- Logo-click popover confirmed hidden by default, opens on click showing "Accueil" + "Espace administrateur".

**Checkpoint**: Full admin flow works end-to-end; offers/promos/theme edits appear on the public homepage; logged-out access to `/admin/**` is blocked by both the proxy (T012) and `requireAdminSession()` (T036).

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency pass across all 4 stories.

- [X] T046 [P] Rewrote `README.md`: project description, `.env.local` setup, `prisma migrate dev` / `prisma db seed` steps, admin space pointer, project structure, scripts
- [X] T047 [P] `npm run lint` and `npx tsc --noEmit` both clean. Lint required 5 fixes: 4 legitimate `react-hooks/set-state-in-effect` cases (localStorage sync, embla state sync, 2× admin fetch-on-mount) suppressed with scoped, justified `eslint-disable-next-line` comments; 1 real fix — `HeaderBrand`'s admin link switched from a raw `<a>` to `next/link`'s `Link` (not the next-intl-wrapped one, since `/admin` is intentionally outside locale routing) to satisfy `@next/next/no-html-link-for-pages`
- [X] T048 Full walkthrough done incrementally per-story during implementation (see verification notes in each phase above) plus a final consolidated pass: **production build** (`npm run build`) succeeds with `/[locale]` correctly marked dynamic (ƒ) and `/admin/login` static (○); **production server** (`npm start`) smoke-tested — login works, seeded/edited prices render correctly in the actual HTML output (not just dev mode)
- [X] T049 Full-page Playwright screenshot of `/fr` post-implementation: all sections intact (Hero, Gateway, TrustBar, Promos, Offers, Destinations, B2B banner, Testimonials, Newsletter, new About/Filiales, Footer), zero browser console errors, no visual regressions

## Final state

All 49 tasks complete. New dependencies added: `prisma`, `@prisma/client`, `@prisma/adapter-better-sqlite3`, `better-sqlite3`, `bcryptjs`, `jose`, `server-only`, `dotenv` (dev), `tsx` (dev), `playwright` (dev, for verification screenshots — not used at runtime).

**Known follow-ups, intentionally out of scope for this spec** (see spec.md Assumptions / research.md):
- Real flight/PNR lookup (currently UI-only acknowledgement).
- Deployment target validation — built and tested against a persistent Node.js host (`next start` + local SQLite file); a serverless/edge target would need the Postgres swap path noted in research.md R1.
- No automated test suite exists in this project (pre-existing, constitution-documented); all verification above was manual/Playwright-driven.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup. BLOCKS User Story 2 and User Story 4 only.
- **User Story 1 (Phase 3)**: Depends only on Setup — can run in parallel with Phase 2.
- **User Story 2 (Phase 4)**: Depends on Foundational (needs `Promo`/`FlightOffer` in DB and `getPromos`/`getFlightOffers`).
- **User Story 3 (Phase 5)**: Depends only on Setup — can run in parallel with Phase 2, US1, US2.
- **User Story 4 (Phase 6)**: Depends on Foundational (auth + proxy + Prisma models) and conceptually on US2's `Promo`/`FlightOffer` data functions being in place (T038/T039 read/write the same tables T024/T025 render).
- **Polish (Phase 7)**: Depends on all 4 stories being complete.

### Recommended Order

Given the dependency shape above, the practical critical path is:
**Setup → Foundational → US2 → US4**, with **US1** and **US3** implementable any time after Setup (in parallel with everything else, including by a different contributor).

### Parallel Opportunities

- T013/T014 (US1 content + messages), T028 (US3 messages) can run alongside Phase 2 (Foundational).
- T032/T033/T034 (admin auth routes) and T038/T039/T040 (admin CRUD routes) are each in separate files and parallelizable once Phase 2 is done.
- T046/T047/T049 (Polish) are independent of each other.

---

## Parallel Example: Foundational Phase

```bash
Task: "Create the Prisma client singleton in src/lib/prisma.ts"
Task: "Implement src/lib/auth.ts (hashPassword/verifyPassword/signSession/verifySession/requireAdminSession)"
```

## Parallel Example: User Story 4 admin routes

```bash
Task: "GET/POST /api/admin/promos + PATCH/DELETE /api/admin/promos/[id]"
Task: "GET/POST /api/admin/offers + PATCH/DELETE /api/admin/offers/[id]"
Task: "GET/PATCH /api/admin/theme"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1 (no Foundational dependency)
3. **STOP and VALIDATE**: About/filiales section correct in all 3 locales
4. Ship — this alone is the lowest-risk, highest-certainty increment from the original request

### Incremental Delivery

1. Setup → US1 ships (MVP, no DB needed)
2. Setup → Foundational → US2 ships (currency switcher live)
3. Setup → US3 ships (can land any time, independent)
4. Foundational + US2 → US4 ships (admin space, the largest increment)
5. Polish once all 4 are live

---

## Notes

- No automated tests exist in this project yet (constitution-documented gap); every checkpoint above is a manual verification step, not an automated test gate.
- US4 is intentionally last in the dependency chain despite being "Priority P4" in the spec — it is also the largest and most infrastructure-heavy story, consistent with the spec's own sequencing rationale (lower-risk stories first).
- Commit after each task or logical group, per the user's repository conventions.
