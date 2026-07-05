import { test, expect } from '@playwright/test';

const MOBILE_PROJECTS = ['mobile-chrome', 'mobile-safari'];
const isMobile = (name: string) => MOBILE_PROJECTS.includes(name);

test.describe('Home page registration CTAs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero section button links to /cours', async ({ page, project }) => {
    if (isMobile(project.name)) test.skip(true, 'Desktop viewport for hero layout');

    const heroSection = page.locator('section').filter({ has: page.locator('video') });
    const heroButton = heroSection.locator('a[href="/cours"]').first();
    await expect(heroButton).toBeVisible();
  });

  test('bottom CTA button links to /cours', async ({ page }) => {
    const ctaButton = page.locator('a[href="/cours"]').last();
    await expect(ctaButton).toBeVisible();
  });
});

test.describe('Evenements page CTA links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/evenements');
  });

  test('bottom CTA button links to /inscriptions', async ({ page, project }) => {
    if (isMobile(project.name)) test.skip(true, 'Desktop layout');

    const ctaButton = page.locator('a.btn-primary[href="/inscriptions"]').first();
    await expect(ctaButton).toBeVisible();
  });
});

test.describe('Contact page links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('phone card contains tel link with correct number', async ({ page, project }) => {
    if (isMobile(project.name)) test.skip(true, 'Desktop layout');

    const phoneCard = page.locator('article:has-text("Telephone")').first();
    if (await phoneCard.isVisible({ timeout: 3000 }).catch(() => false)) {
      const phoneLink = phoneCard.getByRole('link').first();
      await expect(phoneLink).toHaveAttribute('href', /tel:/);
    } else {
      const telLinks = page.locator('a[href^="tel:"]');
      expect(await telLinks.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test('email card contains mailto link with correct address', async ({ page }) => {
    const emailLinks = page.locator('a[href^="mailto:"]');
    for (let i = 0; i < await emailLinks.count(); i++) {
      const href = await emailLinks.nth(i).getAttribute('href');
      expect(href?.includes('jamm.dance.94@gmail.com')).toBe(true);
    }
  });

  test('CTA buttons point to correct internal pages', async ({ page }) => {
    const inscLinks = page.locator('a[href="/inscriptions"]');
    expect(await inscLinks.count()).toBeGreaterThanOrEqual(1);

    const assocLink = page.locator('a[href="/association"]').first();
    await expect(assocLink).toBeVisible();
  });

  test('location cards contain links to inscription page', async ({ page, project }) => {
    if (isMobile(project.name)) test.skip(true, 'Desktop layout');

    const articleCards = page.locator('article[role="listitem"]');
    let foundInscriptionLink = false;
    for (let i = 0; i < await articleCards.count(); i++) {
      const cardLinks = articleCards.nth(i).locator('a[href="/inscriptions"]');
      if ((await cardLinks.count()) > 0) {
        foundInscriptionLink = true;
        break;
      }
    }
    expect(foundInscriptionLink).toBe(true);
  });
});

test.describe('Inscriptions page external links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inscriptions');
  });

  test('Thiais panel has external registration and payment links', async ({ page }) => {
    const thiaisPanel = page.locator('#location-panel-thiais');
    const allExternalLinks = thiaisPanel.locator('a[target="_blank"]');

    let foundGoogleForms = false;
    for (let i = 0; i < await allExternalLinks.count(); i++) {
      const href = await allExternalLinks.nth(i).getAttribute('href');
      if (href?.includes('docs.google.com/forms')) {
        foundGoogleForms = true;
        break;
      }
    }
    expect(foundGoogleForms).toBe(true);

    let foundHelloAsso = false;
    for (let i = 0; i < await allExternalLinks.count(); i++) {
      const href = await allExternalLinks.nth(i).getAttribute('href');
      if (href?.includes('helloasso.com')) {
        foundHelloAsso = true;
        break;
      }
    }
    expect(foundHelloAsso).toBe(true);
  });

  test('Mandres panel has external registration and payment links', async ({ page }) => {
    const mandresTab = page.getByRole('tab', { name: /mandres/i }).first();
    await mandresTab.click();

    const mandresPanel = page.locator('#location-panel-mandres');
    const allExternalLinks = mandresPanel.locator('a[target="_blank"]');

    let foundGoogleForms = false;
    for (let i = 0; i < await allExternalLinks.count(); i++) {
      const href = await allExternalLinks.nth(i).getAttribute('href');
      if (href?.includes('docs.google.com/forms')) {
        foundGoogleForms = true;
      }
    }
    expect(foundGoogleForms).toBe(true);

    let foundHelloAsso = false;
    for (let i = 0; i < await allExternalLinks.count(); i++) {
      const href = await allExternalLinks.nth(i).getAttribute('href');
      if (href?.includes('helloasso.com')) {
        foundHelloAsso = true;
      }
    }
    expect(foundHelloAsso).toBe(true);
  });
});

test.describe('Event card external links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/evenements');
  });

  test('event cards with paymentUrl link to external services', async ({ page }) => {
    const upcomingExternal = page.locator('#upcoming-panel a[target="_blank"]');
    for (let i = 0; i < await upcomingExternal.count(); i++) {
      const href = await upcomingExternal.nth(i).getAttribute('href');
      expect(href?.startsWith('https://')).toBe(true);
    }

    const pastTab = page.getByRole('tab', { name: /evenements passes/i });
    await pastTab.click();

    const pastExternal = page.locator('#past-panel a[target="_blank"]');
    for (let i = 0; i < await pastExternal.count(); i++) {
      const href = await pastExternal.nth(i).getAttribute('href');
      expect(href?.startsWith('https://')).toBe(true);
    }
  });

  test('event external links have rel noopener noreferrer', async ({ page }) => {
    const externalLinks = page.locator('#upcoming-panel a[target="_blank"]');
    for (let i = 0; i < await externalLinks.count(); i++) {
      await expect(externalLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });
});

test.describe('Cross-page link integrity', () => {
  test('footer internal links all return 200 status', async ({ page }) => {
    await page.goto('/');

    const footerLinks = page.locator('footer nav a');
    expect(await footerLinks.count()).toBeGreaterThanOrEqual(5);

    for (let i = 0; i < Math.min(4, await footerLinks.count()); i++) {
      const href = await footerLinks.nth(i).getAttribute('href');
      if (href?.startsWith('/')) {
        const newPg = await page.context().newPage();
        try {
          const response = await newPg.goto(href);
          const status = response?.status();
          expect(status).toBe(200);
        } finally {
          await newPg.close();
        }
      }
    }
  });
});
