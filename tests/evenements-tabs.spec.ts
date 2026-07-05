import { test, expect } from '@playwright/test';

const skipOnMobile = (projectName: string) => {
  if (projectName.includes('mobile')) test.skip(true, 'Mobile viewport');
};

test.describe('Events timeline tab switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/evenements');
  });

  test('page loads with A venir tab active by default', async ({ page }) => {
    const upcomingTab = page.getByRole('tab', { name: 'A venir' });
    const pastTab = page.getByRole('tab', { name: /evenements passes/i });

    await expect(upcomingTab).toBeVisible();
    await expect(pastTab).toBeVisible();
    await expect(upcomingTab).toHaveAttribute('aria-selected', 'true');
    await expect(pastTab).toHaveAttribute('aria-selected', 'false');

    await expect(page.locator('#upcoming-panel')).toBeVisible();
    await expect(page.locator('#past-panel')).not.toBeVisible();
  });

  test('clicking Events passes tab shows past events panel', async ({ page }) => {
    const pastTab = page.getByRole('tab', { name: /evenements passes/i });
    const upcomingTab = page.getByRole('tab', { name: 'A venir' });

    await pastTab.click();

    await expect(pastTab).toHaveAttribute('aria-selected', 'true');
    await expect(upcomingTab).toHaveAttribute('aria-selected', 'false');

    await expect(page.locator('#past-panel')).toBeVisible();
    await expect(page.locator('#upcoming-panel')).not.toBeVisible();
  });

  test('clicking A venir tab restores upcoming panel', async ({ page }) => {
    const pastTab = page.getByRole('tab', { name: /evenements passes/i });
    const upcomingTab = page.getByRole('tab', { name: 'A venir' });

    await pastTab.click();
    await expect(page.locator('#past-panel')).toBeVisible();

    await upcomingTab.click();
    await expect(page.locator('#upcoming-panel')).toBeVisible();
    await expect(page.locator('#past-panel')).not.toBeVisible();
  });

  test('both tabs can be toggled multiple times without breaking', async ({ page }) => {
    const upcomingTab = page.getByRole('tab', { name: 'A venir' });
    const pastTab = page.getByRole('tab', { name: /evenements passes/i });

    for (let i = 0; i < 3; i++) {
      await pastTab.click();
      await expect(page.locator('#past-panel')).toBeVisible();
      await expect(page.locator('#upcoming-panel')).not.toBeVisible();

      await upcomingTab.click();
      await expect(page.locator('#upcoming-panel')).toBeVisible();
      await expect(page.locator('#past-panel')).not.toBeVisible();
    }
  });

  test('tablist has correct accessibility attributes', async ({ page }) => {
    const tabList = page.locator('[role="tablist"]');
    await expect(tabList).toHaveAttribute('aria-label', /filtre/i);
  });
});

test.describe('Events page content validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/evenements');
  });

  test('featured event banner renders when featured event exists', async ({ page }) => {
    const featuredSection = page.locator('section.bg-gradient-to-r').first();
    if (await featuredSection.isVisible()) {
      await expect(featuredSection).toContainText(/a ne pas manquer/i);
    }
  });

  test('timeline tab panels have proper role attributes', async ({ page }) => {
    await expect(page.locator('#upcoming-panel')).toHaveAttribute('role', 'tabpanel');
    await expect(page.locator('#past-panel')).toHaveAttribute('role', 'tabpanel');
  });

  test('bottom CTA section links to inscriptions', async ({ page }) => {
    const ctaLink = page.locator('a.btn-primary[href="/inscriptions"]').first();
    if (await ctaLink.isVisible()) {
      await expect(ctaLink).toHaveAttribute('href', '/inscriptions');
    } else {
      const altCta = page.locator('a[href="/inscriptions"]').last();
      await expect(altCta).toBeVisible();
    }
  });
});
