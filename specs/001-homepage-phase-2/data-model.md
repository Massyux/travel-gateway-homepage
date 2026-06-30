# Data Model: Homepage Phase 2 Enhancements

Persisted via Prisma + SQLite (`prisma/schema.prisma`). Non-persisted entities
(Currency Preference, Ticket Lookup Request) are noted at the end.

## AdminUser

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| username | String | unique |
| passwordHash | String | bcrypt hash, never returned to client |
| createdAt | DateTime | default now |

Validation: `username` non-empty, unique; `passwordHash` always set via the
seed script — there is no public registration endpoint.

## Promo

Backs `PromoCarousel` (currently `src/content/promos.ts`).

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| slug | String | unique, stable key (was `id` in static data, e.g. `"santorini"`) |
| image | String | URL |
| discountPercent | Int | e.g. `30` for "-30%" |
| priceEur | Float | base price in EUR; other currencies derived at render time |
| rating | Float | 0–5 |
| nameFr / nameEn / nameAr | String | per-locale name |
| locationFr / locationEn / locationAr | String | per-locale location |
| position | Int | display order, ascending |
| updatedAt | DateTime | auto-updated |
| updatedById | String? | FK → AdminUser.id, nullable (set on edit) |

Validation: `discountPercent` 0–100; `priceEur` > 0; `rating` 0–5; all three
locale variants of name/location required (non-empty) — the constitution's
i18n principle disallows partial-locale content.

## FlightOffer

Backs `OffersGrid` (currently `src/content/offers.ts`).

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | PK |
| slug | String | unique, stable key |
| image | String | URL |
| priceEur | Float | base price in EUR |
| tagFr / tagEn / tagAr | String | per-locale badge text |
| fromFr / fromEn / fromAr | String | per-locale origin |
| toFr / toEn / toAr | String | per-locale destination |
| position | Int | display order, ascending |
| updatedAt | DateTime | auto-updated |
| updatedById | String? | FK → AdminUser.id, nullable |

Validation: `priceEur` > 0; all locale fields required.

## ThemeSetting

Singleton row (`id = "default"`) read by the public layout on every request.

| Field | Type | Notes |
|---|---|---|
| id | String | PK, fixed value `"default"` |
| navy600 | String | hex color, overrides `--color-navy-600` |
| teal500 | String | hex color, overrides `--color-teal-500` |
| updatedAt | DateTime | auto-updated |
| updatedById | String? | FK → AdminUser.id, nullable |

Validation: both color fields must match `^#[0-9a-fA-F]{6}$`.

## Non-persisted entities

- **Currency Preference**: `"EUR" | "USD" | "DZD"`, held in React Context +
  `localStorage` (key `silvitour.currency`), default `"EUR"`. Not a DB table —
  it's per-visitor client state, not admin-managed content.
- **Ticket Lookup Request**: transient form state (ticket/PNR string) in the
  header's expandable input; this phase only shows an acknowledgement message
  and does not persist or transmit the value anywhere (see spec FR-008).

## Relationships

```text
AdminUser 1 ──< Promo        (updatedById, optional)
AdminUser 1 ──< FlightOffer  (updatedById, optional)
AdminUser 1 ──< ThemeSetting (updatedById, optional)
```

## Seed data

The Prisma seed script (`prisma/seed.ts`) MUST:
1. Create one `AdminUser` from `ADMIN_SEED_USERNAME` / `ADMIN_SEED_PASSWORD`
   env vars (hashed), so the admin space is usable immediately after setup.
2. Insert the existing static `promos.ts` and `offers.ts` rows as the initial
   `Promo` / `FlightOffer` rows (with `priceEur` parsed from the current
   `"189€"`-style strings), so the migration to DB-backed content does not
   blank the homepage.
3. Insert the current brand colors (`#28465d` navy-600, `#1b9aae` teal-500)
   as the initial `ThemeSetting` row, so theme rendering is a no-op until an
   admin changes it.
