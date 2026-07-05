# Project Plan: JAMM Dance Showcase Website

## Phase 1: Core Scaffolding & Dynamic Mock-Ups (Placeholders)

### Tasks

- [x] **Initialize Astro Boilerplate**
  - **Definition of Done:**
    - Astro project is initialized with the latest stable version.
    - Tailwind CSS is integrated and configured with core brand colors (`#8C3AB5`, `#E56B1A`, `#F5A623`, `#1A1A1A`).
    - React integration is configured for dynamic UI islands.
    - Lighthouse performance and accessibility scores are above 95.
- [x] **Setup Global Layout Templates**
  - **Definition of Done:**
    - Responsive navigation header and footer are built with semantic HTML landmarks (`<nav>`, `<footer>`).
    - Standard page layouts wrap all views with French locale properties (`lang="fr"`).
    - The build passes with zero React hydration mismatches.
- [x] **Build Page Shells with Internet Placeholders**
  - **Definition of Done:**
    - The five main views (`Accueil`, `L'Association`, `Les Cours`, `Les Professeurs`, `Evenements`) are accessible via standard routing.
    - Public CDN video streams and placeholder imagery are integrated on the home page.
    - Static text layers use clean formatting with zero emojis.

---

## Phase 2: High-Fidelity Asset Integration

### Tasks

- [x] **Graphic & Identity Migration**
  - **Definition of Done:**
    - Official vector logo SVGs are extracted, optimized, and placed within the global navbar and footer.
    - All temporary visual placeholders are replaced with actual dance association imagery.
    - Media assets enforce a strict layout constraint of `border-radius: 8px;` and use `object-fit: cover;`.
  - **Notes:** Event flyer assets (`soiree-vacance.jpeg`, `stage-yann.png`) copied into `public/assets/events/`. EventCard renders actual image paths from event data with Unsplash fallbacks as safety net.

- [X] **True Copy & Schedule Onboarding**
  - **Definition of Done:**
    - Mock text arrays are removed and replaced with authentic structural French content for schedules, descriptions, and instructor bios.
    - Active registration buttons pulse on user interaction states using a custom fluid curve transition (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## Phase 3: Headless Content Management Integration

### Tasks

- [x] **Schema Definition & Local Data Parsing**
  - **Definition of Done:**
    - Structured JSON/Markdown schema models are implemented containing explicit event keys (`Titre`, `Date`, `Tarif`, `EstMisEnAvant`).
    - Event elements read data dynamically from local data feeds instead of layout hardcoding.
  - **Notes:** Created `src/data/events.json` with full schema per `docs/EVENT_REFACTOR.md`. Created `src/data/events.ts` with TypeScript interfaces (`Event`, `EventLocation`, `EventPricing`, `EventType`). Data fields include: `id`, `type`, `title`, `date`, `displayDate`, `time`, `location`, `description[]`, `pricing[]`, `promotion`, `contact`, `paymentUrl`, `extraInfo`, `image`, `isFeatured`. Events page filters and sorts by date automatically (upcoming vs past).

- [x] **Dynamic Event Highlight Component**
  - **Definition of Done:**
    - A dedicated React dynamic component reads the local event array.
    - The single immediate upcoming event flagged with `EstMisEnAvant=true` is automatically rendered at the absolute top focal layout section upon home page entry.
  - **Notes:** Built `FeaturedEventBanner` Astro component that queries `events.json`, finds closest upcoming event by date, and renders a compact card (flyer image, type badge, date/time/location/pricing glance, CTA). Renders nothing when no upcoming events exist. Home page replaced hardcoded placeholder banner with this dynamic component. Event cards use paymentUrl for registration redirect, fall back to tel: link if none provided.

---

## Phase 4: Quality Assurance & Playwright Suite

### Tasks

- [ ] **Form & Navigation Verification Suite**
  - **Definition of Done:**
    - Automated Playwright E2E testing scenarios are written and execute successfully across simulated mobile and desktop screen viewports.
    - Cross-browser test coverage validates registration links, class filters, and active timeline tabs with a 100% pass rate.

---

## Phase 5: CI/CD Pipeline & DNS Transition

### Tasks

- [ ] **Production Deployment & DNS Record Updates**
  - **Definition of Done:**
    - Git repository branches are linked to an automated cloud hosting workflow (Vercel/Netlify free tier).
    - CNAME and A-records are re-mapped inside the association's o2switch panel to target the production cloud environment.
    - The live URL runs secure SSL certificates natively and passes complete validation tests.
