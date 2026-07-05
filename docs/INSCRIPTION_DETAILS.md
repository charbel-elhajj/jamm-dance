# UX Strategy & Architecture: Multi-Location Registrations & Pricing

## 1. Problem Statement
The JAMM Dance association operates in two distinct locations (e.g., Mandres-les-Roses and a second location).
Each location strictly requires:
- Its own class schedule.
- Its own pricing matrix.
- Its own registration form link.
- Its own payment link (e.g., HelloAsso).

It is critical to prevent users from registering or paying for the wrong location.

## 2. Ergonomic Decision: "Single Page with Dynamic Tabs"
Instead of maintaining two separate pages (as seen on the legacy WordPress) or building a very long page prone to scrolling errors, we will implement **a single `/inscriptions` page**.

### Mechanism:
The core of the page will be an interactive React component (a Tab or Toggle switch).
- **Default State:** Prompts the user to select their location via two prominent, clear buttons (e.g., [📍 Location 1] / [📍 Mandres-les-Roses]).
- **State Change:** Clicking a location entirely hides the other location's data and displays the active one.

### Advantages:
1. **Zero Payment Errors:** Users only see the payment buttons for the location they explicitly selected.
2. **Centralized SEO:** A single, strong "Registrations & Pricing" page for Google to index.
3. **Seamless Experience:** Content switching happens instantly on the client side via React, with no page reloads.

## 3. Page Structure (`src/pages/inscriptions.astro`)

- This should replace /cours

### A. Global Header (Shared)
- Title: "Inscriptions & Tarifs" (Registrations & Pricing)
- Short explanatory text: "Please select your location below to view the corresponding schedules and pricing."
- *Optional: Annual association membership fee (if shared and mandatory for everyone).*

### B. The Location Selector (React Component)
- Two large interactive buttons at the top (Pill or Tab style using brand colors).

### C. Dynamic Content (Injected based on selection)
For the active location, display in this order:
1. **Schedule:** (Clear table or list of classes with days/times/teachers).
2. **Pricing:** (Specific pricing grid for the location).
3. **Call-to-Action (Buttons):**
   - Primary Button (Violet): `S'inscrire à [Location Name]` (Link to the registration form).
   - Secondary Button (Orange): `Payer sa cotisation` (Specific HelloAsso link).
4. **Practical Info:** (Exact address, Google Maps embed).

## 4. Data Modeling (Data Structure)
To make this component easily maintainable by the association, data must not be hardcoded in HTML. It should be structured in a separate data feed (e.g., `src/data/locations.json`).

Example of expected structure:
```json
[
  {
    "id": "mandres",
    "name": "Mandres-les-Roses",
    "address": "123 Rue de la Danse, 94520 Mandres-les-Roses",
    "schedulePdf": "/assets/planning-mandres.pdf",
    "pricing": [...],
    "registrationLink": "[https://forms.gle/](https://forms.gle/)...",
    "paymentLink": "[https://helloasso.com/](https://helloasso.com/)..."
  },
  {
    "id": "location2",
    "name": "Location 2",
    "address": "456 Avenue du Rythme, 94xxx Location 2",
    "schedulePdf": "/assets/planning-location2.pdf",
    "pricing": [...],
    "registrationLink": "[https://forms.gle/](https://forms.gle/)...",
    "paymentLink": "[https://helloasso.com/](https://helloasso.com/)..."
  }
]
```

## 5. Definition of Done
[ ] The /inscriptions page exists and renders the tab system.

[ ] Switching from one tab to another instantly updates the registration and payment links.

[ ] A clear visual distinction (e.g., active button color) lets the user know exactly which location is currently selected.

[ ] The component is fully responsive on mobile (pricing tables must scroll horizontally if necessary).

## 6. Wrap up
update "Page C: Les Cours & Tarifs (Schedules & Pricing)" in docs/DESIGN_GUIDELINES.md according to the update you did