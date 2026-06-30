# Quickstart: Validate Homepage Phase 2 Enhancements

## Prerequisites

```bash
npm install
cp .env.example .env.local   # ensure DATABASE_URL, ADMIN_SESSION_SECRET,
                              # ADMIN_SEED_USERNAME, ADMIN_SEED_PASSWORD are set
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## P1 — About / filiales

1. Open `http://localhost:3000/fr`, scroll to the About/filiales section.
2. Confirm the trust copy mentions 16+ years of experience and all 8
   locations (Algiers, Rouïba, Niamey, India, Dubai, Chad, Venice, Paris)
   are listed.
3. Repeat at `/en` and `/ar` — confirm translated text and correct RTL
   layout at `/ar`.

**Expected**: identical structure, locale-correct text, no layout breakage.

## P2 — Currency switcher

1. On the homepage, open the currency selector (next to the language
   switcher) and pick `USD`.
2. Confirm every visible price (PromoCarousel, OffersGrid) updates
   immediately, no page reload.
3. Reload the page — `USD` is still selected.
4. Switch locale to `ar` — currency selection (`USD`) is unchanged.

**Expected**: prices reflect the fixed-rate table; selection persists across
reload and is independent of locale.

## P3 — Voir mon billet

1. Click "Voir mon billet" in the header.
2. Confirm an input bar slides out asking for a ticket number / PNR.
3. Submit a value — confirm an inline acknowledgement message appears (no
   navigation, no real lookup).
4. Submit empty — confirm a validation message instead.

**Expected**: no full page reload at any point; bar can be dismissed.

## P4 — Admin space

1. Click the brand logo in the header — confirm an "Espace administrateur"
   button/link appears.
2. Follow it while logged out — confirm you land on a login screen, not
   admin content.
3. Log in with the seeded admin credentials (`ADMIN_SEED_USERNAME` /
   `ADMIN_SEED_PASSWORD`).
4. From the admin shell:
   - Create a new promo or flight offer, fill all 3 locale variants, save —
     confirm it appears on the public homepage on next load.
   - Edit an existing offer's price — confirm the new price (converted) shows
     on the public homepage.
   - Delete an offer — confirm it disappears from the public homepage.
   - Change the `teal500` theme color and save — confirm the public
     homepage's CTA buttons reflect the new color on next load.
5. Log out, then try to `GET`/navigate the admin shell directly — confirm
   you're redirected to login (no stale session access).
6. Restart `npm run dev` — confirm all admin-made changes (offers, theme)
   are still present (proves persistence, not in-memory only).

**Expected**: every change made in the admin shell appears on the public
homepage without a code deploy; unauthenticated access is always blocked;
data survives a server restart.
