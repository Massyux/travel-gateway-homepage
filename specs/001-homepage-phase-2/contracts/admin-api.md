# Contract: Admin API (Next.js Route Handlers)

All routes below live under `src/app/api/admin/**/route.ts`. All except
`POST /api/admin/login` require a valid session cookie (enforced by
`middleware.ts`); unauthenticated requests get `401`.

Request/response bodies are JSON. Errors use `{ "error": string }`.

## POST /api/admin/login

Request: `{ "username": string, "password": string }`

Responses:
- `200 { "ok": true }` + sets `silvitour_admin_session` httpOnly/Secure cookie
- `401 { "error": "Identifiants invalides" }`

## POST /api/admin/logout

Clears the session cookie. Response: `200 { "ok": true }`

## GET /api/admin/me

Returns the current admin's identity (for the admin shell header).

Response: `200 { "username": string }` or `401`.

## Promos

- `GET /api/admin/promos` → `200 Promo[]` (ordered by `position`)
- `POST /api/admin/promos` → create. Body: Promo fields minus
  `id/updatedAt/updatedById`. `201 Promo` or `400 { error }` on validation
  failure (see data-model.md validation rules).
- `PATCH /api/admin/promos/:id` → partial update of any editable field.
  `200 Promo` or `400`/`404`.
- `DELETE /api/admin/promos/:id` → `204` or `404`.

## Flight offers

Same shape as Promos, under `/api/admin/offers`:
- `GET /api/admin/offers` → `200 FlightOffer[]`
- `POST /api/admin/offers` → `201 FlightOffer` / `400`
- `PATCH /api/admin/offers/:id` → `200 FlightOffer` / `400` / `404`
- `DELETE /api/admin/offers/:id` → `204` / `404`

## Theme

- `GET /api/admin/theme` → `200 ThemeSetting`
- `PATCH /api/admin/theme` → Body: `{ navy600?: string, teal500?: string }`
  (hex colors, validated against `^#[0-9a-fA-F]{6}$`). `200 ThemeSetting` or
  `400`.

## Public read paths (no new API surface)

The public homepage does **not** call these admin routes. Server Components
(`OffersGrid`, `PromoCarousel`, the root `[locale]/layout.tsx`) read
`Promo`/`FlightOffer`/`ThemeSetting` directly via Prisma at render time, the
same way they currently import from `src/content/*.ts`. This keeps the public
page's data path simple and avoids an unnecessary internal HTTP round-trip.
