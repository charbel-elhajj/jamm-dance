# UI/UX Design Guidelines: JAMM Dance
## Vibrant & Festive, Modern & Classy

This document serves as the master design blueprint for the JAMM Dance showcase website overhaul. The primary goal is to combine the warm, high-energy, celebratory nature of Latin and Oriental dance genres (**Salsa, Bachata, Belly Dancing, and Oriental Dancing**) with a clean, structured, premium software engineering execution.

---

## 1. Core Visual System & The 60-30-10 Rule

To prevent a high-energy design from looking unorganized or cheap, all interface layouts must adhere strictly to the **60-30-10 Rule**:
* **60% Canvas (Dominant):** Crisp white space and soft, warm cream off-whites (`#FAF7FC`). This forms the premium, spacious foundation that ensures the site feels modern and classy.
* **30% Structure (Secondary):** Deep brand **Violet (`#8C3AB5`)**. Used for primary typography, navigation states, footer structures, and stable interface blocks.
* **10% Accent (Action):** **Sunset Orange (`#E56B1A`)** and **Melted Gold (`#F5A623`)** gradients. Reserved exclusively for high-conversion Call-to-Actions (CTAs), live badges, and highlighting critical notifications.

### Typography
* **Headings:** Bold geometric display sans-serif (e.g., *Syne*, *Clash Display*, or *Montserrat*) to project structural elegance and artistic flair.
* **Body Copy:** Highly readable, neutral sans-serif (e.g., *Inter* or *Plus Jakarta Sans*) with spacious line heights (`leading-relaxed`) to preserve legibility.

### Animation and Fluidity
* Avoid standard hard cuts or simple linear fades.
* All interactive components must utilize an elegant, professional transition curve:
    `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);`
* Incorporate sweeping, smooth curves mimicking the logo's wind strokes as structural divider elements between main layout sections.

---

## 2. Page-by-Page Layout Specifications

### Page A: Accueil (Home Page)
* **Hero Video Section:** Edge-to-edge cinematic frame running a highly optimized, muted, compressed h.264 ambient video loop of the dance classes. A deep violet linear gradient overlay (`linear-gradient(to bottom, rgba(140,58,181,0.4), transparent)`) is placed on top to ensure crisp contrast for heading typography.
* **Immediate Event Anchor:** Located prominently at the top focal point immediately beneath or slightly overlapping the hero canvas. A distinct, high-energy banner leveraging the Sunset Orange accent to instantly capture user attention for the absolute nearest upcoming workshop (*stage*).
* **The Dance Matrix:** A sleek, 4-column responsive grid dividing *Salsa, Bachata, Belly Dancing, and Oriental*. In their idle state, cards show sophisticated, darkened artistic photography of the styles. Upon mouse hover, they fluidly crossfade into dynamic, colorful micro-video previews.

### Page B: L'Association (Presentation)
* **Editorial Flow:** Alternating grid rows balancing detailed narrative blocks on one side with high-quality, vertically-cropped slow-motion multimedia blocks on the other.
* **Atmosphere:** Uses the soft cream background (`#FAF7FC`) to create an inviting, studio-floor warmth while breaking away from cold digital archetypes.

### Page C: Inscriptions et Tarifs (Multi-Location Registrations & Pricing)
* **URL:** `/inscriptions` (replaces the former `/cours`).
* **Location Selector Tabs:** A vanilla JS-driven interactive pill/tab component sits at the top of the page. On load, it shows two prominent location buttons rendered in brand Violet (`#8C3AB5`). The active tab is visually elevated with a solid Violet background and white text; inactive tabs have transparent background with Violet text. Clicking instantly swaps all content client-side with no reload.
* **Annual Membership Notice:** A highlighted banner (`bg-brand-violet/5` with left border accent) displays the mandatory annual association membership fee, shared across both locations.
* **Trial Class Badge:** A Sunset Orange to Gold gradient pill prominently announces free trial classes for each location.
* **Special Classes Notice:** An orange-accented banner appears on locations offering special private classes (Flashmob, ouverture de bal, EVJF, EVG, ...).
* **Schedule Tables:** For each location, a fully accessible HTML/Tailwind data table lists classes by *Jour*, *Horaire*, *Cours*, *Niveau*, and *Professeur*. Row hover states fade to `brand-violet/5`. Level badges use color-coded rounded pills (green for debutant, blue for tous niveaux, yellow for intermediaire, red for avance, purple for enfants).
* **Pricing Tables:** Clean data tables showing annual pricing by frequency (1 to 4 cours/semaine) with columns for "1 personne", "1 personne (-15 ans)", and "2 personnes (meme famille)". Prices in EUR with bold typography. Note about Cheque Vacances and Coupon Sport at the bottom.
* **Call-to-Action Buttons:** Two explicit CTAs per location: (1) Primary Violet button directing to the registration form for that specific location, (2) Secondary Sunset Orange button linking to the corresponding payment gateway (e.g., HelloAsso). Both open in new tabs with `rel="noopener noreferrer"`.
* **Practical Info & Map:** Venue name and full address inside a white card with an embedded Google Maps iframe (`height: 300px`, lazy loaded).
* **Responsiveness:** Tables wrap horizontally via `overflow-x-auto` on mobile. Tabs collapse their map-pin icon on small screens using `hidden sm:inline`.

### Page D: Les Professeurs (Team Profiles)
* **Theatrical Light Effect:** Profile grids feature clean, high-contrast portraits. By default, images use a stylized, elegant duotone or desaturated profile. On hover, the card removes the filter smoothly to reveal full, vibrant, festive colors—simulating stepping into a live stage spotlight.

### Page E: Événements & Stages (Events Feed)
* **Chronological Thread:** A vertical line element acting as a timeline axis, shifting colors dynamically from Violet down into Sunset Orange. Upcoming events appear as clean cards with bold dates anchored on the left, descriptive contents and ticketing CTAs positioned cleanly on the right.

---

## 3. Universal Extensibility Matrix (Default Rules for Future Pages)

Any page created in the future (e.g., a photo gallery, a shop, or a partners list) must automatically follow these standard structural layout constraints to prevent design drifting:

| Layout Category | Technical UI Rule / System Constraint |
| :--- | :--- |
| **New Page Headers** | Height fixed between `200px` and `250px`. Solid Violet (`#8C3AB5`) background with a masked organic curve overlay. Titles must be centered and in French. |
| **Input Fields & Forms** | Pure white input fills with a 1px Charcoal (`#1A1A1A`) border. On focus, the border shifts to `#8C3AB5` with a smooth, soft accent glow outline. |
| **Multimedia Content** | All images and videos must use `object-fit: cover;` accompanied by custom rounded corners clamped precisely at `border-radius: 8px;`. |
| **Section Layout Separation**| No pure black horizontal lines (`<hr>`). Separate major content areas using clean whitespace (vertical padding of `py-16` to `py-24`) or custom SVG wave elements. |
| **Call-to-Action Buttons** | Primary buttons must feature a solid accent background color, bold text uppercase layout, tracking-wide letter spacing, and explicit hover feedback. |

---

## 4. Engineering Restrictions & Rules

* **Language Policy:** Every customer-facing text string, heading, menu link, alternate description image tag, form placeholder, and operational notification **MUST BE WRITTEN IN FRENCH** (`lang="fr"`).
* **KISS Principle:** Keep the source implementation simple. Do not overcomplicate dynamic layouts; leverage native properties or clean React props instead of heavy state lifecycles where possible.
* **No Emojis:** The user interface, markdown documentation, logs, and commit trees are strictly text-only. Professional, classy text aesthetics must be maintained.
