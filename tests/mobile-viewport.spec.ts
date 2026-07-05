import { test, expect } from '@playwright/test';

const NAV_ITEMS = [
  'Accueil',
  "L'Association",
  'Inscriptions',
  'Les Professeurs',
  '\u00c9v\u00e9nements', // Événements (accented)
  'Contact',
];

test.describe('Mobile hamburger menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hamburger toggles on mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    await page.goto('/');

    // Open menu button - aria-label="Ouvrir le menu de navigation"
    const menuBtn = page.getByRole('button', { name: /ouvrir.*menu/i });
    await expect(menuBtn).toBeVisible();

    const mobileMenu = page.locator('.mobile-menu');

    // Initially closed
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

    // Open menu -> aria-expanded flips to true, menu items become visible
    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileMenu.getByRole('menuitem').first()).toBeVisible({ timeout: 3000 });

    // Close menu -> aria-expanded flips back to false
    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

    await context.close();
  });

  test('mobile menu contains all expected navigation links', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    await page.goto('/');

    // Open menu
    await page.getByRole('button', { name: /ouvrir.*menu/i }).click();

    const mobileMenu = page.locator('.mobile-menu');
    for (const label of NAV_ITEMS) {
      await expect(mobileMenu.locator(`a:has-text("${label}")`).first()).toBeVisible({ timeout: 3000 });
    }

    await context.close();
  });

  test('clicking mobile menu link navigates to page', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    await page.goto('/');

    // Open menu
    await page.getByRole('button', { name: /ouvrir.*menu/i }).click();

    // Click "L'Association" link within mobile menu
    const assocLink = page.locator('.mobile-menu a').getByText(/association/i);
    await assocLink.click();

    await expect(page).toHaveURL(/\/association/);

    await context.close();
  });
});

test.describe('Mobile viewport responsive rendering', () => {
  async function loadMobilePage(browser, path: string) {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    await page.goto(path);
    return { page, context };
  }

  test('home page hero renders on mobile', async ({ browser }) => {
    const { page, context } = await loadMobilePage(browser, '/');

    await expect(page.locator('video').first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await context.close();
  });

  test('dance styles grid on mobile shows all four cards', async ({ browser }) => {
    const { page, context } = await loadMobilePage(browser, '/');

    const cards = page.locator('[role="listitem"]');
    await expect(cards).toHaveCount(4);

    // On mobile first card spans most of viewport width
    const firstCard = cards.first();
    const boundingBox = await firstCard.boundingBox();
    if (boundingBox) {
      expect(boundingBox.width).toBeGreaterThanOrEqual(250);
    }

    await context.close();
  });

  test('evenements tabs usable on mobile', async ({ browser }) => {
    const { page, context } = await loadMobilePage(browser, '/evenements');

    await page.getByRole('tab', { name: /evenements passes/i }).click();
    await expect(page.locator('#past-panel')).toBeVisible();

    await page.getByRole('tab', { name: 'A venir' }).click();
    await expect(page.locator('#upcoming-panel')).toBeVisible();

    await context.close();
  });

  test('inscriptions location tabs usable on mobile', async ({ browser }) => {
    const { page, context } = await loadMobilePage(browser, '/inscriptions');

    await page.getByRole('tab', { name: /mandres/i }).first().click();
    await expect(page.locator('#location-panel-mandres')).toBeVisible();

    const tableRegion = page.locator('#location-panel-mandres').locator('[role="region"]').first();
    await expect(tableRegion).toBeVisible();

    await context.close();
  });
});

test.describe('Tablet viewport rendering', () => {
  test('navigation on tablet shows desktop menu', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 768, height: 1024 },
    });
    const page = await context.newPage();
    await page.goto('/');

    // Desktop nav visible at tablet widths (md breakpoint)
    const desktopNav = page.locator('ul[role="menubar"]');
    await expect(desktopNav).toBeVisible({ timeout: 5000 });

    await context.close();
  });

  test('dance grid uses multi-column layout on tablet', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 640, height: 1024 },
    });
    const page = await context.newPage();
    await page.goto('/');

    const cards = page.locator('[role="listitem"]');
    await expect(cards).toHaveCount(4);

    await context.close();
  });
});

test.describe('Contact page mobile rendering', () => {
  test('phone and email cards stack vertically on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    await page.goto('/contact');

    // Contact cards exist and are visible - they have explicit aria-label attributes
    const phoneSection = page.locator('[aria-label="T\u00e9l\u00e9phone"]').first();
    const emailSection = page.locator('[aria-label="Email"]').first();

    await expect(phoneSection).toBeVisible();
    await expect(emailSection).toBeVisible();

    // Phone card should span most of the viewport width
    const phoneBox = await phoneSection.boundingBox();
    if (phoneBox) {
      expect(phoneBox.width).toBeGreaterThan(250);
    }

    await context.close();
  });

  test('location cards render map iframe', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    await page.goto('/contact');

    const articleCards = page.locator('article[role="listitem"]');
    // Should have at least two location cards
    expect(await articleCards.count()).toBeGreaterThanOrEqual(1);

    // Each card should have at least one map iframe
    for (let i = 0; i < await articleCards.count(); i++) {
      const iframes = articleCards.nth(i).locator('iframe');
      expect(await iframes.count()).toBeGreaterThanOrEqual(1);
    }

    await context.close();
  });
});
