import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.jammdance.fr',
  integrations: [react(), tailwind(), sitemap()],
  redirects: {
    // Legacy WordPress registration/tariff pages
    '/inscription-et-tarifs-thiais/': '/inscriptions',
    '/inscription-et-tarifs-thiais': '/inscriptions',
    '/inscription-et-tarifs-mandres-les-roses/': '/inscriptions',
    '/inscription-et-tarifs-mandres-les-roses': '/inscriptions',
    '/inscription-tarifs/': '/inscriptions',

    // Legacy courses page
    '/nos-cours/': '/cours',

    // Legacy news/events page
    '/actualites/': '/evenements',

    // Legacy contact page
    '/nous-contacter/': '/contact',

    // Legacy team/teachers page
    '/notre-equipe/': '/professeurs',
  },
});