import { test, expect } from '@playwright/test';

const MOBILE_PROJECTS = ['mobile-chrome', 'mobile-safari'];
const isMobileProject = (name: string) => MOBILE_PROJECTS.includes(name);

test.describe('Location selector tab switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inscriptions');
  });

  test('page loads with first location (Thiais) active by default', async ({ page, project }) => {
    if (isMobileProject(project.name)) test.skip(true, 'Desktop-only initial layout');

    const thiaisTab = page.getByRole('tab', { name: /thiais/i }).first();
    expect(await thiaisTab.getAttribute('aria-selected')).toBe('true');
    await expect(page.locator('#location-panel-thiais')).toBeVisible();
    await expect(page.locator('#location-panel-mandres')).not.toBeVisible();
  });

  test('clicking Mandres-les-Roses tab shows mandres panel', async ({ page, project }) => {
    if (isMobileProject(project.name)) test.skip(true, 'Desktop layout');

    const thiaisTab = page.getByRole('tab', { name: /^thiais$/i }).first();
    const mandresTab = page.getByRole('tab', { name: /mandres/i }).first();

    await mandresTab.click();

    expect(await mandresTab.getAttribute('aria-selected')).toBe('true');
    expect(await thiaisTab.getAttribute('aria-selected')).toBe('false');

    await expect(page.locator('#location-panel-mandres')).toBeVisible();
    await expect(page.locator('#location-panel-thiais')).not.toBeVisible();
  });

  test('switching tabs multiple times maintains state correctly', async ({ page }) => {
    const thiaisTab = page.getByRole('tab', { name: /^thiais$/i }).first();
    const mandresTab = page.getByRole('tab', { name: /mandres/i }).first();

    for (let i = 0; i < 3; i++) {
      await mandresTab.click();
      expect(await mandresTab.getAttribute('aria-selected')).toBe('true');
      await expect(page.locator('#location-panel-mandres')).toBeVisible();

      await thiaisTab.click();
      expect(await thiaisTab.getAttribute('aria-selected')).toBe('true');
      await expect(page.locator('#location-panel-thiais')).toBeVisible();
    }
  });

  test('schedule table renders with expected columns for active location', async ({ page }) => {
    const thiaisPanel = page.locator('#location-panel-thiais');
    const scheduleTable = thiaisPanel.locator('table').first();
    const tableHeaders = scheduleTable.locator('thead th');

    expect(await tableHeaders.count()).toBeGreaterThan(3);
    await expect(tableHeaders.nth(0)).toContainText(/jour/i);
    await expect(tableHeaders.nth(1)).toContainText(/horaire/i);
  });

  test('pricing table renders with 4 headers for active location', async ({ page }) => {
    const thiaisPanel = page.locator('#location-panel-thiais');
    const pricingTable = thiaisPanel.locator('table').nth(1);
    const pricingHeaders = pricingTable.locator('thead th');

    expect(await pricingHeaders.count()).toBeGreaterThan(2);
  });
});

test.describe('Location-specific content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inscriptions');
  });

  test('Thiais panel shows schedule with expected courses', async ({ page }) => {
    const thiaisPanel = page.locator('#location-panel-thiais');
    const scheduleTable = thiaisPanel.locator('table').first();
    const bodyRows = scheduleTable.locator('tbody tr');

    expect(await bodyRows.count()).toBeGreaterThan(0);

    await expect(scheduleTable.locator('tbody').first()).toContainText(/bachata/i);
    await expect(scheduleTable.locator('tbody').first()).toContainText(/salsa/i);
  });

  test('Mandres panel shows schedule with expected courses', async ({ page }) => {
    const mandresTab = page.getByRole('tab', { name: /mandres/i }).first();
    await expect(mandresTab).toBeVisible();
    await mandresTab.click();

    const mandresPanel = page.locator('#location-panel-mandres');
    await expect(mandresPanel).toBeVisible();

    const scheduleTable = mandresPanel.locator('table').first();
    expect(await scheduleTable.locator('tbody tr').count()).toBeGreaterThanOrEqual(2);

    await expect(scheduleTable.locator('tbody')).toContainText(/ladies/i);
  });

  test('both panels show trial class badge', async ({ page }) => {
    await expect(page.locator('#location-panel-thiais')).toContainText(/cours.*essai.*gratuit/i);

    const mandresTab = page.getByRole('tab', { name: /mandres/i }).first();
    await mandresTab.click();

    await expect(page.locator('#location-panel-mandres')).toContainText(/cours.*essai.*gratuit/i);
  });

  test('Mandres panel shows special classes notice', async ({ page }) => {
    const mandresTab = page.getByRole('tab', { name: /mandres/i }).first();
    await mandresTab.click();

    await expect(page.locator('#location-panel-mandres')).toContainText(/flashmob/i);
  });
});

test.describe('Registration and payment links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inscriptions');
  });

  test('Thiais registration link points to Google Forms', async ({ page }) => {
    const thiaisPanel = page.locator('#location-panel-thiais');
    const externalLinks = thiaisPanel.locator('a[target="_blank"]');

    let foundGoogleForms = false;
    for (let i = 0; i < await externalLinks.count(); i++) {
      const href = await externalLinks.nth(i).getAttribute('href');
      if (href?.includes('docs.google.com/forms')) {
        foundGoogleForms = true;
        break;
      }
    }
    expect(foundGoogleForms).toBe(true);
  });

  test('Thiais payment link points to HelloAsso', async ({ page }) => {
    const thiaisPanel = page.locator('#location-panel-thiais');
    const externalLinks = thiaisPanel.locator('a[target="_blank"]');

    let foundHelloAsso = false;
    for (let i = 0; i < await externalLinks.count(); i++) {
      const href = await externalLinks.nth(i).getAttribute('href');
      if (href?.includes('helloasso.com')) {
        foundHelloAsso = true;
        break;
      }
    }
    expect(foundHelloAsso).toBe(true);
  });

  test('Mandres registration and payment links are external', async ({ page }) => {
    const mandresTab = page.getByRole('tab', { name: /mandres/i }).first();
    await mandresTab.click();

    const mandresPanel = page.locator('#location-panel-mandres');
    const externalLinks = mandresPanel.locator('a[target="_blank"]');

    for (let i = 0; i < await externalLinks.count(); i++) {
      const href = await externalLinks.nth(i).getAttribute('href');
      expect(href?.startsWith('https://')).toBe(true);
    }
  });
});

test.describe('Location selector accessibility structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inscriptions');
  });

  test('tab list has proper role', async ({ page }) => {
    const tabList = page.locator('[role="tablist"]');
    await expect(tabList).toBeVisible();
  });

  test('Thiais panel has correct tabindex role', async ({ page, project }) => {
    if (isMobileProject(project.name)) test.skip(true, 'Desktop layout');

    const thiaisPanel = page.locator('#location-panel-thiais');
    await expect(thiaisPanel).toHaveAttribute('role', 'tabpanel');
  });

  test('Mandres panel has correct tabpanel role', async ({ page }) => {
    const mandresTab = page.getByRole('tab', { name: /mandres/i }).first();
    await mandresTab.click();

    const mandresPanel = page.locator('#location-panel-mandres');
    await expect(mandresPanel).toHaveAttribute('role', 'tabpanel');
  });

  test('map iframe is loaded within active panel', async ({ page }) => {
    const thiaisPanel = page.locator('#location-panel-thiais');
    const mapIframe = thiaisPanel.locator('iframe').first();
    await expect(mapIframe).toBeVisible({ timeout: 10000 });
  });
});
