# Project Blueprint: JAMM Dance Showcase Website

## 1. Project Description
This project consists of a complete overhaul of the official showcase website for the **JAMM Dance** association (currently hosted at `https://www.jammdance.fr/`). The goal is to migrate from a legacy, heavy self-hosted WordPress installation to a modern, high-performance, and cost-effective decoupled architecture. 

This document serves as the master technical specification, constraints checklist, and system prompt context for all code generation, architecture design, and deployment automation.

---

## 2. Technical Stack
The application will be built as a modern static/hybrid application maximizing performance, developer experience, and cost savings:

* **Framework:** Astro (latest version)
* **Component Architecture:** Astro Islands with React (latest version) for isolated dynamic UI parts.
* **Styling:** Tailwind CSS (latest version)
* **End-to-End Testing:** Playwright
* **Deployment & Hosting:** Vercel
* **Domain Management:** Naked domain lifecycle handled independently via o2switch registrar,.
* **Content Management System (CMS):** A lightweight Headless CMS or structured local markdown/JSON schema configured with a Webhook to trigger automated builds when Antoinette updates dynamic contents.

---

## 3. Business & Content Requirements

1.  **Home Page / Landing:**
    * Must feature a hero section with embedded background videos or high-quality dynamic multimedia loops highlighting the dance energy.
    * **Critical Feature:** The most immediate upcoming event or workshop must be dynamically featured at the absolute top/prominent layout position upon site entry.
2.  **Association Presentation:**
    * Detailed history, vision, and organizational values.
    * Integration of mini video clips and rich photo grids accompanying textual descriptions.
3.  **Class Information & Registration:**
    * Clean layout replacing the legacy static flyers with responsive schedules and pricing matrices.
    * Direct call-to-action (CTA) external/internal links for online registrations.
4.  **Teachers Profiles:**
    * A dedicated grid or tabbed section profiling the dance instructors, their backgrounds, and specialties.
5.  **Events Management:**
    * Chronological feed of upcoming workshops (*stages*), events, and news.
    * Archived feed for past events with multimedia galleries (photos/videos).
    * Must be designed for easy autonomous modifications by non-technical managers.

---

## 4. Brand Design & Color Scheme
Extracted directly from the provided high-resolution vector assets of the official JAMM Dance logo, the UI design must adhere strictly to the following core warm-to-cool gradient spectrum:

* **Primary Violet / Purple:** `#8C3AB5` (Vibrant deep violet accent used for foundational structural text headers, active navigational states, and secondary visual containers).
* **Secondary Orange / Gold:** `#F5A623` / `#E56B1A` (Warm sunset gradients bridging orange and yellow, utilized for primary high-conversion call-to-actions, buttons, highlighting upcoming critical events, and decorative background swashes mimicking the logo flow).
* **Dark Accents:** `#1A1A1A` (Rich off-black used for body typography to guarantee AA/AAA accessibility compliance against light backdrops).
* **Background Spaces:** Off-whites and soft cream tints matching the smooth aesthetic of the logo halo to allow seamless illustration integration.
* **Global Design:** The website design is defined in `docs/DESIGN_GUIDELINES.md`, refer to it for every interface developememnt or update.

---

## 5. Development Strategy & Roadmap

Look for docs/PLAN.md

---

## 6. Coding Standards & Agent Constraints
All autonomous agents and human developers working within this codebase must strictly follow these engineering protocols:

* **Language Constraint:** Every string literal, UI text block, button text, notification, alt text, and client-facing copy **MUST BE WRITTEN IN FRENCH** (`lang="fr"`).
* **Keep It Simple, Stupid (KISS):** Avoid over-engineering patterns. Do not build complex state machines where simple props or native URL search params suffice.
* **Dependency Management:** Always utilize the latest stable releases of libraries. Never introduce unvetted third-party npm packages for simple tasks that can be written natively in standard TypeScript or Tailwind CSS.
* **Typography & Semantics:** Strict hierarchical order for headings (`h1` -> `h2` -> `h3`). Never skip heading ranks for stylistic purposes. Utilize semantic tags (`<main>`, `<section>`, `<article>`, `<header>`, `<nav>`).
* **No Emojis in Code or Documentation:** Codebases, commit messages, and documentations must remain fully professional and text-based. Emojis are strictly banned from markdown text, source code comments, and logging outputs.
* **Minimal README Policy:** The primary repository README file must remain terse, hosting only environment setup variables, execution commands (`dev`, `build`, `preview`), and a reference link to this master document.
