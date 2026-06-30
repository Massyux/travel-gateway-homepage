# Feature Specification: Homepage Phase 2 Enhancements

**Feature Branch**: `001-homepage-phase-2`

**Created**: 2026-06-30

**Status**: Draft

**Input**: User description: "Homepage phase 2 enhancements — 4 user stories: (P1) À propos de nous / filiales section listing 8 agency locations with 16+ years of experience trust copy, fully translated fr/en/ar; (P2) currency switcher (EUR/USD/DZD) affecting displayed prices; (P3) 'Voir mon billet' / flight tracking entry point (ticket number / PNR input) inspired by flightradar24; (P4) admin space entry point revealed by clicking the brand logo, for eventually editing offers and theme colors."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover the company and its agencies (Priority: P1)

A visitor who is unsure whether to trust the site scrolls to an "About us" area and
sees how long the company has operated, and where it has physical agencies, before
deciding to proceed to B2B or B2C booking.

**Why this priority**: Trust-building content is the cheapest, lowest-risk addition
(pure static content, no new interaction model) and directly supports the site's
core marketing/conversion goal. It can ship independently of everything else.

**Independent Test**: Load the homepage in each of the 3 locales (fr/en/ar) and
verify the About/filiales section renders the company tagline and all 8 agency
locations, correctly translated and correctly mirrored in Arabic (RTL).

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage in any supported locale, **When** they reach
   the About/filiales section, **Then** they see a short trust statement
   referencing 16+ years of experience and a list of all 8 agency locations
   (Algiers – Algeria, Rouïba – Algeria, Niamey – Niger, an agency in India, Dubai –
   UAE, an agency in Chad, Venice – Italy, Paris – France).
2. **Given** the visitor has selected Arabic, **When** the About/filiales section
   renders, **Then** all text reads correctly in RTL with no mirrored-layout
   glitches (e.g., list markers, spacing).
3. **Given** the visitor is on a small (mobile) screen, **When** they view the
   section, **Then** all 8 locations remain readable without horizontal scrolling.

---

### User Story 2 - Browse prices in a familiar currency (Priority: P2)

A visitor whose local currency is not EUR wants to see indicative prices (promos,
offers) in USD or DZD instead, without leaving the homepage or losing their place.

**Why this priority**: Currency choice is a meaningful trust/conversion signal for
an international (Algeria, Niger, India, UAE, Chad, Italy, France) customer base,
and is self-contained client-side state — no new content modeling required.

**Independent Test**: Switch the currency selector to USD or DZD and verify every
visible price on the homepage (promos, offers) updates to the new currency without
a page reload, and the choice persists while navigating between locales.

**Acceptance Scenarios**:

1. **Given** a visitor viewing prices in the default currency (EUR), **When** they
   open the currency selector and choose USD, **Then** every price shown on the
   page (promos, offers) is converted and displayed in USD with the correct symbol.
2. **Given** a visitor has selected DZD, **When** they switch the language from
   French to Arabic, **Then** the currency selection (DZD) is preserved.
3. **Given** a returning visitor who previously chose USD, **When** they reload the
   homepage, **Then** USD remains selected (preference is remembered).

---

### User Story 3 - Start a ticket / flight lookup from the homepage (Priority: P3)

A visitor who already booked wants a fast way to check their ticket/PNR status
without hunting for the right platform, similar to how flightradar24 offers an
instant flight lookup box.

**Why this priority**: This is a real, distinct interaction model (expandable
input + submission), so it is sequenced after the two purely presentational
stories. For this phase the lookup is UI-only (acknowledgement message, no real
flight/booking data) — a real lookup destination is a follow-up spec.

**Independent Test**: Click "Voir mon billet" / "Track my flight", confirm an
input bar slides out asking for a ticket number or PNR, type a value, submit, and
verify the visitor sees a clear acknowledgement message without a full page
reload breaking the homepage state.

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage, **When** they click the "Voir mon billet"
   button, **Then** a compact input bar animates out of the button asking for a
   ticket number or PNR.
2. **Given** the input bar is open, **When** the visitor submits a non-empty
   value, **Then** the system shows a clear inline acknowledgement message (no
   real flight/booking lookup is performed in this phase).
3. **Given** the input bar is open, **When** the visitor submits an empty value or
   clicks outside the bar without submitting, **Then** the bar closes/shows a
   validation message without navigating away.

---

### User Story 4 - Manage offers and homepage colors from an admin space (Priority: P4)

A staff member who manages the homepage content wants a discoverable but
non-intrusive way to reach an administration area, log in, and directly add,
edit, or remove promotional offers and change the homepage's background/theme
colors — with changes reflected on the public homepage after saving.

**Why this priority**: This is the largest and riskiest item — it requires
authentication and a real content-editing/persistence layer that does not exist
anywhere in the current codebase (all content is static TypeScript files), so it
is sequenced last, after the lower-risk, purely presentational/client-state
stories.

**Independent Test**: Click the brand logo, log in as an administrator, create or
edit an offer and change a theme color, save, then load the public homepage in a
separate session and verify the offer and color changes are visible there.

**Acceptance Scenarios**:

1. **Given** any visitor on the homepage, **When** they click the brand logo,
   **Then** a button/link to the admin space appears (it is not visible by
   default).
2. **Given** an unauthenticated visitor follows the admin entry point, **When**
   they reach the admin route, **Then** they are challenged to authenticate and
   cannot view or change content without doing so.
3. **Given** an authenticated administrator, **When** they open the offers
   management screen, **Then** they can add a new offer, edit an existing
   offer's fields (name, price, discount, image, location, per-locale text), or
   remove an offer, and the change is saved.
4. **Given** an authenticated administrator, **When** they change a homepage
   theme color (e.g., the primary accent color) and save, **Then** the public
   homepage reflects the new color on next load, for all visitors, without a
   code deployment.
5. **Given** an authenticated administrator makes a change, **When** they save
   it, **Then** the system confirms the save succeeded or shows a clear error if
   it failed (e.g., invalid input, connectivity issue) without losing their
   in-progress edits.

---

### Edge Cases

- What happens if the visitor's browser has JavaScript-dependent state (currency,
  admin reveal) disabled — do the affected features fail gracefully (e.g., default
  currency shown, logo behaves as a normal home link)?
- What happens if a ticket/PNR lookup is submitted with an obviously invalid format
  (e.g., letters where digits are expected)?
- What happens if a visitor switches currency while an animation/carousel
  (PromoCarousel) is mid-transition — do in-flight price labels update correctly?
- What happens to the About/filiales list on very narrow Arabic (RTL) mobile
  viewports — does the 8-item list reflow without breaking the reveal-on-scroll
  animation?
- What happens if an authenticated admin's session expires while they are on the
  admin shell — are they returned to a clear re-authentication prompt rather than a
  broken page?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The homepage MUST display an About/filiales section listing all 8
  agency locations (Algiers, Rouïba, Niamey, India, Dubai, Chad, Venice, Paris)
  with a short trust statement mentioning 16+ years of experience.
- **FR-002**: All About/filiales content MUST be available and correctly
  displayed in all three supported locales (fr/en/ar), including correct RTL
  presentation in Arabic.
- **FR-003**: The homepage MUST provide a currency selector offering EUR, USD,
  and DZD, visually consistent with the existing language switcher.
- **FR-004**: Selecting a currency MUST update all visible prices (promos,
  offers) on the homepage to that currency without a full page reload.
- **FR-005**: The visitor's currency selection MUST be remembered across page
  reloads and MUST be independent of (not reset by) locale switching.
- **FR-006**: Currency conversion MUST use a fixed/approximate rate table
  maintained in the codebase (no live exchange-rate API call); rates are
  indicative only, since actual payment always happens on the existing B2B/B2C
  platforms, not on this homepage.
- **FR-007**: The homepage MUST provide a "Voir mon billet" / flight-tracking
  entry point that reveals an input for a ticket number or PNR without leaving
  the homepage.
- **FR-008**: Submitting the ticket number / PNR is UI-only for this phase: the
  system MUST acknowledge the submission with a clear inline message (no real
  flight-status or booking-platform lookup is performed yet). The destination
  for a real lookup (B2B/B2C platform redirect vs. a flight-status API) is
  explicitly deferred to a follow-up spec once that data source is chosen.
- **FR-009**: The homepage MUST provide an admin-space entry point that only
  appears after the visitor clicks the brand logo (not visible in the default
  state).
- **FR-010**: The admin space MUST require authentication before any content or
  settings are visible or editable.
- **FR-011**: Admin authentication MUST use a dedicated username/password login
  for this phase (no existing staff identity system is assumed to exist yet);
  credentials MUST NOT be stored or transmitted in plain text.
- **FR-012**: The admin space MUST let an authenticated administrator create,
  edit, and delete promotional offers, including per-locale (fr/en/ar) text
  fields, price, discount, rating, and image.
- **FR-013**: The admin space MUST let an authenticated administrator change the
  homepage's theme/background colors, with the result visible to public
  visitors after saving.
- **FR-014**: Offer and theme-color changes made in the admin space MUST be
  persisted (surviving a server restart/redeploy) and MUST be the data source
  the public homepage reads from, replacing the current static
  `src/content/offers.ts` values for offers and the current static color tokens
  for theme.
- **FR-015**: The system MUST log or otherwise make visible which admin
  account made the most recent change to an offer or theme color, for basic
  accountability (no full audit-log UI required in this phase).

### Key Entities

- **Agency / Filiale**: A physical company location — city, country, used only as
  display content (name/city/country) in the About section; no operational data
  (address, phone) implied unless requested later.
- **Currency Preference**: The visitor's chosen display currency (EUR/USD/DZD),
  remembered per-visitor, independent of locale.
- **Ticket Lookup Request**: A ticket number or PNR value submitted by a visitor;
  acknowledged only, no real lookup performed in this phase.
- **Admin Account**: A staff identity (username/password) authorized to access
  the admin space and make content/theme changes.
- **Offer**: A promotional listing (id, per-locale name/location text, price,
  discount, rating, image) — currently static, becomes admin-editable and
  persisted in this phase.
- **Theme Setting**: The homepage's configurable background/accent color
  values — currently static Tailwind tokens, becomes admin-editable and
  persisted in this phase.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of homepage text in the About/filiales section is correctly
  translated and legible (including RTL) across all 3 supported locales.
- **SC-002**: A visitor can change the displayed currency and see all on-page
  prices update in under 1 second, with zero full-page reloads.
- **SC-003**: A visitor can open the ticket/PNR input and submit a value in 2
  clicks or fewer from anywhere on the homepage (header always reachable).
- **SC-004**: 0% of unauthenticated visitors can view or modify admin-only
  content; 100% of admin-space access attempts without valid authentication are
  blocked.
- **SC-005**: The brand logo continues to function as a link back to the
  homepage for all visitors who do not seek the admin entry point (no regression
  to existing navigation behavior).
- **SC-006**: An administrator can publish a new or edited offer, or a new theme
  color, and see it reflected on the public homepage in under 1 minute, with no
  code deployment required.
- **SC-007**: Offer and theme-color data survive a server restart with zero data
  loss (persisted, not held only in memory).

## Assumptions

- The existing `LanguageSwitcher` interaction pattern (button revealing fr/en/ar
  options) is the right visual/interaction model to mirror for the currency
  switcher.
- "Filiale" data (the 8 locations) is limited to city + country for this phase;
  street addresses, phone numbers, and opening hours are out of scope unless
  requested later.
- Currency conversion is indicative/marketing-only (not used for actual checkout,
  which happens on the existing B2B/B2C platforms), so minor rate staleness from
  using fixed, manually-maintained rates is acceptable.
- No existing staff identity/auth system is available to reuse, so a new
  minimal admin login (single or small set of accounts) is introduced
  specifically for this homepage.
- This is the project's first feature requiring server-side persistence; a
  database (or equivalent persistent store) will be introduced where none
  exists today — destinations, promos, and other non-admin-editable content
  remain static files unless a future spec says otherwise.
- No automated test suite exists yet for this project (per the project
  constitution); verification for this feature is manual across the 3 locales,
  both currency states, and both authenticated/unauthenticated admin access.
- Mobile and desktop visitors are both in scope for all 4 stories (per the
  existing site's responsive approach).
