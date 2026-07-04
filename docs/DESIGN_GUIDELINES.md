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

### Page C: Les Cours & Tarifs (Schedules & Pricing)
* **Interactive Matrix Table:** Replaces legacy flat flyers with a fully accessible HTML/Tailwind data table. Features smooth client-side filtering pills allowing users to instantly isolate schedules by *Dance Style* or *Day of the Week*.
* **Pricing Cards:** High-contrast containers using white backgrounds and subtle gray shadows. The primary subscription option is visually elevated with a Sunset Orange background gradient CTA button that scales up elegantly on hover (`hover:scale-105`).

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
