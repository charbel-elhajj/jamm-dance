# Setup 301 Redirects for Legacy WordPress URLs

Please update the `astro.config.mjs` file to include permanent 301 redirects for the old WordPress URLs that are currently indexed by Google. This will prevent 404 errors from search results.

Add the `redirects` object to your Astro configuration:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ... your existing config (integrations, site, etc.)
  site: '[https://www.jammdance.fr](https://www.jammdance.fr)',
  redirects: {
    '/inscription-et-tarifs-thiais/': '/inscriptions',
    '/inscription-et-tarifs-thiais': '/inscriptions',
    '/inscription-et-tarifs-mandres-les-roses/': '/inscriptions',
    '/inscription-et-tarifs-mandres-les-roses': '/inscriptions',
    '/inscription-tarifs/': '/inscriptions',
    '/nos-cours/': '/',
    '/actualites/': '/#evenements', // Or wherever your event section is
    '/nous-contacter/': '/#contact', // Or your dedicated contact page
    '/notre-equipe/': '/#equipe'
  }
});
```

Note: Make sure to map these destinations to the actual new routes available in the Astro project.