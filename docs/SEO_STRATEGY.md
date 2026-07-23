# SEO Technical Strategy & Implementation Guide

## 1. Objective
Optimize the JAMM Dance Astro/React codebase for Search Engine Optimization (SEO). The focus is on dynamic meta tags, sitemap generation, image optimization, and semantic HTML tailored for local SEO.

## 2. Execution Steps

### Step 1: Create a Dynamic SEO Component
- Create a new component at `src/components/SEO.astro`.
- **Props:** It must accept `title` (string), `description` (string), and `image` (string, optional).
- **Output:** It must render standard meta tags (`<title>`, `<meta name="description">`) and Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type="website"`).
- **Integration:** Update `src/layouts/Layout.astro` to import and use the `<SEO />` component inside the `<head>` tag. Ensure `Layout.astro` accepts these SEO props and passes them down.

### Step 2: Page-Level Meta Data
- Update all existing pages (e.g., `src/pages/index.astro`, `src/pages/inscriptions.astro`) to pass specific, localized `title` and `description` props to the Layout. 
- *Example for Inscriptions:* `title="Inscriptions et Tarifs - Cours de danse | JAMM Dance"`, `description="Consultez les plannings et tarifs de nos cours de Salsa, Bachata et danse orientale à Thiais et Mandres-les-Roses."`

### Step 3: Implement Sitemap
- Ensure the Astro sitemap integration is configured. (Run `npx astro add sitemap --yes` if executing shell commands, or update `astro.config.mjs` directly).
- Verify that `site: 'https://www.jammdance.fr'` is correctly defined in `astro.config.mjs` so the sitemap generates absolute URLs.

### Step 4: Image Optimization & Accessibility (Astro Assets)
- Locate all image renders (especially the flyer images in the Event cards).
- Replace standard HTML `<img>` tags with Astro's native `<Image />` component (`import { Image } from 'astro:assets';`).
- **Crucial:** Ensure EVERY `<Image />` has a highly descriptive `alt` attribute. Bind the `alt` text dynamically to the data (e.g., `alt={"Affiche pour l'événement : " + event.title}`).

### Step 5: Semantic HTML (Local SEO)
- Check the heading hierarchy across the site.
- The homepage must have exactly one `<h1>` containing the core local keywords (e.g., "JAMM Dance : Association de danse à Thiais et Mandres-les-Roses").
- Event titles and Location names should be wrapped in `<h2>` or `<h3>` tags.

## 3. Definition of Done
- [ ] `SEO.astro` is created and integrated into `Layout.astro`.
- [ ] All pages pass unique, localized `title` and `description` props.
- [ ] `astro.config.mjs` includes the sitemap integration and the production URL.
- [ ] Astro `<Image />` is used for all flyers with dynamic, accessible `alt` text.
- [ ] Semantic heading hierarchy is respected.