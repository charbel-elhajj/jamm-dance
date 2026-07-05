import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', label: 'Accueil' },
  { path: '/association', label: /association/i },
  { path: '/inscriptions', label: 'Inscriptions' },
  { path: '/professeurs', label: 'Les Professeurs' },
  { path: '/evenements', label: null },
  { path: '/contact', label: 'Contact' },
];

// --- HEADER NAVIGATION ---
for (const pg of PAGES) {
  test(`navigate to "${pg.path}" via header link`, async ({ page, project }) => {
    // Desktop menubar is hidden on mobile viewports - skip this test there
    if (project.name.includes('mobile')) test.skip(true, 'Mobile viewport');

    await page.goto('/');

    const desktopMenu = page.locator('[role="menubar"]');
    let navLink;
    if (pg.label === null) {
      navLink = desktopMenu.locator(`a[href="${pg.path}"]`).first();
    } else {
      navLink = desktopMenu.getByRole('menuitem', { name: pg.label }).first();
    }
    await expect(navLink).toBeVisible({ timeout: 5000 });
    await navLink.click();

    await expect(page).toHaveURL(pg.path);
    await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
  });
}

// --- HOME PAGE STRUCTURE ---
test.describe('Home page structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero section renders with video element and CTA button', async ({ page, project }) => {
    if (project.name.includes('mobile')) test.skip(true, 'Requires desktop viewport');

    const heroSection = page.locator('section').filter({ has: page.locator('video') });
    await expect(heroSection).toBeVisible();

    await expect(page.getByRole('heading', { name: /bienv/i, level: 1 })).toBeVisible();

    const ctaButton = heroSection.locator('a[href="/cours"]').first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('href', '/cours');
  });

  test('dance styles grid renders four styles', async ({ page, project }) => {
    if (project.name.includes('mobile')) test.skip(true, 'Requires desktop viewport');

    const danceCards = page.locator('[role="listitem"]');
    await expect(danceCards).toHaveCount(4);

    await expect(danceCards.nth(0)).toContainText(/salsa/i);
    await expect(danceCards.nth(1)).toContainText(/bachata/i);
    await expect(danceCards.nth(2)).toContainText(/belly dance/i);
  });

  test('bottom CTA section links to cours', async ({ page }) => {
    const ctaLink = page.locator('a[href="/cours"]').last();
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', '/cours');
  });
});

// --- FOOTER NAVIGATION ---
test.describe('Footer navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer quick links are present', async ({ page, project }) => {
    if (project.name.includes('mobile')) test.skip(true, 'Desktop nav structure');

    const footerNav = page.locator('footer nav').first();
    await expect(footerNav).toBeVisible();

    const expectedHrefs = ['/', '/association', '/inscriptions', '/professeurs', '/evenements', '/contact'];
    for (const ref of expectedHrefs) {
      await expect(footerNav.locator(`a[href="${ref}"]`).first()).toBeVisible();
    }
  });

  test('footer contact info contains phone and email links', async ({ page }) => {
    const footer = page.locator('footer');
    const phoneLink = footer.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toHaveAttribute('href', 'tel:+33749828801');

    const emailLink = footer.locator('a[href^="mailto:"]').filter({ hasText: /jamm/ }).first();
    await expect(emailLink).toHaveAttribute('href', 'mailto:jamm.dance.94@gmail.com');
  });

  test('footer copyright displays current year', async ({ page }) => {
    const currentYear = new Date().getFullYear();
    await expect(page.locator('footer').getByText(new RegExp(String(currentYear)))).toBeVisible();
  });
});

// --- COURS REDIRECT ---
test.describe('Cours page redirects to inscriptions', () => {
  test('meta refresh forwards /cours to /inscriptions', async ({ page }) => {
    const response = page.waitForResponse(resp => resp.url().includes('/inscriptions'));
    await page.goto('/cours');
    await response;

    await expect(page).toHaveURL(/\/inscriptions/);
  });
});

// --- LANGUAGE AND LANDMARKS ---
test.describe('Page language and semantic landmarks', () => {
  test('home uses lang="fr"', async ({ page }) => {
    await page.goto('/');
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('fr');
  });

  test('every page has header nav and footer landmarks', async ({ page, project }) => {
    if (project.name.includes('mobile')) test.skip(true, 'Mobile viewport landmark test');

    for (const pg of PAGES) {
      await page.goto(pg.path);

      const header = page.locator('header').first();
      await expect(header).toBeVisible();
      await expect(page.locator('nav').first()).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    }
  });
});
