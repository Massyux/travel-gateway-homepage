# Research: Homepage Phase 2 Enhancements

## R1. Persistence layer for offers, promos, theme settings, admin accounts

**Decision**: Prisma ORM + SQLite (file-based, `prisma/dev.db`), via `@prisma/client`.

**Rationale**: This is the project's first feature requiring any persistence
(per spec Assumptions). SQLite needs no external service, no account
provisioning, and no network dependency — it works immediately with
`npm run dev` / `next start` on a normal persistent host. Prisma gives typed
queries and a migration history, which matters once Offer/Promo/ThemeSetting
schemas evolve. The existing stack (Next.js App Router, TypeScript) has no
ORM opinion yet, so Prisma is a clean, mainstream fit.

**Alternatives considered**:
- *Managed Postgres (Neon/Supabase/Vercel Postgres)* — better fit if the site
  is deployed to a serverless/edge host with an ephemeral filesystem, but
  requires external account setup and credentials that aren't available in
  this session. Documented as a follow-up swap: because Prisma abstracts the
  datasource, moving from SQLite to Postgres later is a `schema.prisma`
  datasource change + migration, not a rewrite.
- *Flat JSON files with file-system writes* — avoids a new dependency, but
  loses transactional safety and typed queries, and the constitution's Type
  Safety principle pushes toward a typed data layer for a feature that didn't
  have one before.
- *Redis/KV* — good for ephemeral state, weaker fit for structured
  relational-ish content (offers, promos) and admin accounts.

## R2. Admin authentication

**Decision**: Single/small set of admin accounts stored in the DB
(`AdminUser`), password hashed with `bcryptjs`. On login, issue a signed,
`httpOnly`, `Secure` session cookie containing a JWT (signed with `jose`,
HS256, secret from `ADMIN_SESSION_SECRET` env var). `middleware.ts` (or the
existing `src/proxy.ts` if it already plays that role) verifies the JWT for
any `/admin/**` route (except `/admin/login`) and redirects unauthenticated
requests to the login page.

**Rationale**: No existing staff identity system exists to integrate with
(per spec Assumption). `bcryptjs` is pure-JS (no native bindings — avoids
Windows build-tool friction). `jose` is Edge-runtime-compatible, so the same
verification logic works in Next.js Middleware (which runs on the Edge
runtime) without needing the Node-only `crypto`/`jsonwebtoken` APIs.

**Alternatives considered**:
- *NextAuth.js / Auth.js* — the "standard" answer, but pulls in providers,
  adapters, and route-handler conventions sized for multi-provider/social
  login; overkill for a single internal admin account and adds surface area
  the constitution's "don't add abstractions beyond what the task requires"
  spirit argues against.
- *Basic Auth (HTTP header challenge)* — simplest possible, but no real
  "login" UX and credentials are resent on every request; rejected because
  the spec's acceptance scenarios describe a login flow with feedback.

## R3. Currency conversion

**Decision**: A fixed rate table in `src/lib/currency.ts`
(`{ EUR: 1, USD: ~1.08, DZD: ~145 }`, approximate, manually maintained,
clearly commented as indicative), a React Context (`CurrencyProvider`) that
reads/writes the selection to `localStorage` (default `EUR`), and a
`formatPrice(amountEur: number, currency: Currency, locale: Locale)` helper
using `Intl.NumberFormat` for symbol/format-correct output per locale.

**Rationale**: Matches the spec's explicit choice (fixed rates, no live API)
and FR-005 (persisted, locale-independent). `Intl.NumberFormat` is built into
the JS runtime — no new dependency — and already gives correct RTL-safe
number formatting for `ar`.

**Alternatives considered**: Live FX API — explicitly rejected by the user
during clarification (Q1).

## R4. Theme color editing → public site

**Decision**: `ThemeSetting` is a singleton DB row holding a small, named set
of CSS custom-property overrides (currently `navy-600` and `teal-500`, the
two brand colors actually used for backgrounds/CTAs per `globals.css`). The
root layout (`src/app/[locale]/layout.tsx`) reads the current `ThemeSetting`
on each request (Prisma call in the Server Component) and renders an inline
`<style>` tag that overrides the matching `:root` custom properties defined
in `globals.css`, after the static stylesheet. Tailwind already resolves
those tokens through `@theme inline`, so no component code needs to change —
only the CSS custom property values shift.

**Rationale**: `globals.css` already centralizes the brand palette as CSS
custom properties (`--color-navy-600`, `--color-teal-500`, etc.) consumed via
Tailwind's `@theme inline`. Overriding those same variable names is the
minimal-surface way to make "change the background/theme colors" possible
without rewriting components to read color values from props/context.

**Alternatives considered**: A full design-token editor covering every shade
— rejected as over-scoped for this phase; the spec's acceptance scenario only
requires "a homepage theme color" to be changeable end-to-end, not a full
palette editor (more tokens can be added to the same mechanism later without
a redesign).

## R5. What "offers" means for admin editing (scope of FR-012)

**Decision**: Both `src/content/offers.ts` (`FlightOffer`, used by
`OffersGrid`) and `src/content/promos.ts` (`Promo`, used by `PromoCarousel`)
move to the database and become admin-editable. `destinations.ts` and
`heroImages.ts` remain static files (out of scope — not "offers").

**Rationale**: The original user request ("changer des offres ou en
ajouter") and the spec's FR-004 ("all visible prices (promos, offers)") both
refer to promos and flight offers together as the homepage's price-bearing
content. Treating only one of the two as "offers" would leave half the
visible prices un-editable and contradict FR-004's currency-conversion
requirement, which explicitly covers both.

**Alternatives considered**: Scoping admin editing to `offers.ts` only
(literal FR-014 wording) — rejected because it would leave `promos.ts`
prices both static and excluded from the admin flow while still being
subject to currency conversion, an inconsistent end state.

## R6. Route protection mechanism (Next.js 16 `proxy` convention)

**Decision**: Extend the existing `src/proxy.ts` (which already wraps
`next-intl`'s middleware for locale routing) with an optimistic
session-cookie check for any `/admin/**` path other than `/admin/login`,
redirecting to `/admin/login` when the cookie is missing/invalid. Real
(non-optimistic) verification happens again in every admin Route
Handler/Server Component via a small `requireAdminSession()` helper in
`src/lib/auth.ts`, per the framework's own guidance that the proxy/middleware
layer is for optimistic checks only, not the sole line of defense.

**Rationale**: This codebase's `AGENTS.md` warns that this Next.js build has
breaking changes from training-data assumptions. Reading
`node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` and the
v16 upgrade guide before writing any routing code confirmed: `middleware.ts`
is renamed to `proxy.ts`, **only one `proxy.ts` is supported per project**,
and its runtime is fixed to `nodejs` (not Edge-restricted, unlike historical
Next.js Middleware). Since `src/proxy.ts` already exists and is the one
allowed file, admin protection must be composed into it rather than added as
a second `middleware.ts` file, which this Next.js version would not even
recognize as a routing hook.

**Alternatives considered**: A separate `middleware.ts` — would be silently
ignored by this Next.js version's router (deprecated convention, see v16
upgrade guide's "`middleware` to `proxy`" section); rejected outright once
confirmed via the bundled docs.
