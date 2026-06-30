# Implementation Plan: Homepage Phase 2 Enhancements

**Branch**: `001-homepage-phase-2` | **Date**: 2026-06-30 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-homepage-phase-2/spec.md`

## Summary

Four additions to the existing Next.js homepage: (P1) a static, fully
translated "About us / agencies" section; (P2) a client-side EUR/USD/DZD
currency switcher with fixed conversion rates; (P3) a UI-only "Voir mon
billet" ticket/PNR entry point; (P4) an admin space (login-gated) for
creating/editing/deleting promos and flight offers and changing two brand
theme colors, backed by a new Prisma + SQLite persistence layer (the
project's first). See [research.md](./research.md) for the technology
decisions and [data-model.md](./data-model.md) for the schema.

## Technical Context

**Language/Version**: TypeScript 5, Next.js 16 (App Router), React 19

**Primary Dependencies**: `next-intl` (i18n, existing), Tailwind CSS v4
(existing), `prisma` + `@prisma/client` (new), `bcryptjs` (new, password
hashing), `jose` (new, Edge-compatible JWT for session cookies)

**Storage**: SQLite via Prisma (`prisma/dev.db`), file-based — see
[research.md § R1](./research.md#r1-persistence-layer-for-offers-promos-theme-settings-admin-accounts)

**Testing**: No automated test suite exists in this project yet (per
constitution). Verification is manual via [quickstart.md](./quickstart.md)
across all 3 locales and both authenticated/unauthenticated admin states.

**Target Platform**: Same as the rest of the site — a Node.js server capable
of running `next start` with a writable local filesystem (required for the
SQLite file). Not validated against a serverless/edge deployment target; see
research.md R1 for the Postgres swap path if that target is chosen later.

**Framework version note**: This project runs a Next.js 16 build whose
conventions differ from older training-data assumptions (per `AGENTS.md`) —
confirmed by reading `node_modules/next/dist/docs` before implementation:
`middleware.ts` is renamed to `proxy.ts` (single file per project, already
present at `src/proxy.ts` for next-intl routing — admin route protection is
added to that same file, not a new `middleware.ts`), the `proxy` runtime is
always `nodejs` (not Edge-restricted), and `cookies()`/`headers()`/route
`params` are async-only (`await`-required everywhere, no sync fallback).

**Project Type**: Web application (single Next.js project, no separate
backend) — admin functionality is implemented as Route Handlers + Server
Components within the existing `src/app` tree, not a new service.

**Performance Goals**: No regression to existing homepage load performance
(constitution Principle IV); admin routes are internal/staff-only and not
held to the same marketing-page performance bar.

**Constraints**: Must preserve the constitution's i18n (all 3 locales + RTL),
visual-quality, and B2B/B2C gateway-clarity principles; admin must never be
visible/reachable without explicit logo interaction + authentication.

**Scale/Scope**: Single-tenant (one company), small admin user count
(expected: a handful of staff accounts), single-digit-to-low-dozens of promos
and flight offers — no pagination or multi-tenant concerns in scope.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Premium Visual & UX Quality | New UI (currency switcher, ticket bar, admin shell) reuses existing primitives (`SectionHeading`, `RevealOnScroll`, button/pill styles already in the design system) rather than inventing new visual language. Admin shell is internal-only and may use a simpler utilitarian style without violating the public-facing visual bar. | PASS |
| II. Internationalization & RTL Correctness | P1 content and all public-facing P2/P3 strings ship in `en/fr/ar` via `next-intl`, verified in RTL. Admin shell (staff-only, not a marketing surface) is FR-only for this phase — documented as an explicit, scoped exception, not a silent gap. | PASS (with noted admin-UI exception, not a marketing surface) |
| III. B2B/B2C Gateway Clarity | No changes to `Gateway` or `platformLinks.ts` routing; new features are additive and don't alter the B2B/B2C choice. | PASS |
| IV. Performance & Core Web Vitals | Public homepage Prisma reads (offers/promos/theme) replace static imports with a DB read in Server Components — equivalent request-time cost class (no client-side fetch waterfall added). Currency conversion is pure client-side math, no extra network calls. | PASS |
| V. Type Safety & Consistency | Prisma generates typed models; `Promo`/`FlightOffer` types in `src/content/*.ts` are superseded by Prisma's generated types (old static files removed once DB-backed, not left as dead duplicate types). | PASS |

No unjustified violations — Complexity Tracking section not needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-homepage-phase-2/
├── plan.md              # This file
├── research.md           # Phase 0 output
├── data-model.md          # Phase 1 output
├── quickstart.md          # Phase 1 output
├── contracts/
│   └── admin-api.md       # Phase 1 output
└── tasks.md               # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
prisma/
├── schema.prisma          # AdminUser, Promo, FlightOffer, ThemeSetting
└── seed.ts                # seeds admin user + migrates static content + default theme

src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # existing — add ThemeSetting read + inline <style> override
│   │   └── page.tsx                  # existing — no structural change
│   ├── admin/                        # OUTSIDE [locale] — staff tool, not a public i18n route
│   │   ├── login/page.tsx              # admin login screen (FR-only, see Constitution Check)
│   │   └── (protected)/
│   │       ├── layout.tsx              # admin shell chrome, session check
│   │       ├── page.tsx                # admin dashboard / entry screen
│   │       ├── promos/page.tsx         # Promo CRUD UI
│   │       ├── offers/page.tsx         # FlightOffer CRUD UI
│   │       └── theme/page.tsx          # theme color editor
│   └── api/
│       └── admin/
│           ├── login/route.ts
│           ├── logout/route.ts
│           ├── me/route.ts
│           ├── promos/route.ts          # GET, POST
│           ├── promos/[id]/route.ts     # PATCH, DELETE
│           ├── offers/route.ts          # GET, POST
│           ├── offers/[id]/route.ts     # PATCH, DELETE
│           └── theme/route.ts           # GET, PATCH
├── components/
│   ├── AboutFilialesSection.tsx   # new — P1
│   ├── CurrencySwitcher.tsx       # new — P2, mirrors LanguageSwitcher
│   ├── TicketLookupButton.tsx     # new — P3, header entry point
│   └── BrandLogo.tsx              # modified — click reveals admin entry link
├── content/
│   └── agencies.ts                # new — static P1 data (8 locations)
├── lib/
│   ├── prisma.ts                  # new — Prisma client singleton
│   ├── auth.ts                    # new — session cookie sign/verify (jose), password hashing (bcryptjs)
│   ├── currency.ts                # new — rate table + formatPrice()
│   └── platformLinks.ts           # existing — unchanged
├── i18n/                          # existing — unchanged structure
└── messages/{en,fr,ar}.json       # extended with About/currency/ticket strings

src/proxy.ts                       # EXTENDED, not replaced — this Next.js 16
                                    # build renames `middleware.ts` to a single
                                    # `proxy.ts` (confirmed in node_modules/next/
                                    # dist/docs). The existing file wraps
                                    # next-intl's middleware; admin route
                                    # protection (optimistic JWT cookie check,
                                    # redirect to /admin/login) is added to the
                                    # same function for paths under /admin,
                                    # falling through to next-intl for
                                    # everything else. `/admin` is added to the
                                    # next-intl matcher's exclusion group so
                                    # locale rewriting never touches it.
.env.example                       # extended — DATABASE_URL, ADMIN_SESSION_SECRET,
                                    # ADMIN_SEED_USERNAME, ADMIN_SEED_PASSWORD
```

**Structure Decision**: Single Next.js project (no separate backend service).
Admin lives at `src/app/admin/**`, deliberately outside the `[locale]`
segment — it is an internal staff tool, not part of the public, translated
marketing site, so it should not participate in next-intl's locale
prefixing/redirects. Persistence is added via `prisma/` at the repo root, the
conventional Prisma location. Route protection extends the project's single
allowed `proxy.ts` (Next.js 16 renamed `middleware.ts` → `proxy.ts`; only one
such file is supported per project) rather than introducing a second file
that wouldn't be recognized.

## Complexity Tracking

*No constitution violations requiring justification.*
