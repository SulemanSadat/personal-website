import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('suleman-studio-opening-v1', 'seen'));
});

test('mobile Simple View disclosures support keyboard, themes, reduced motion and desktop resize', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const cards = page.locator('.simple-project');
  await expect(cards.first()).toBeVisible();
  await expect(cards.getByRole('button')).toHaveCount(await cards.count());
  for (const button of await cards.getByRole('button').all()) await expect(button).toHaveAttribute('aria-expanded', 'false');
  const card = cards.first();
  const toggle = card.getByRole('button');
  const panel = card.locator('.simple-project-details');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
  await expect(toggle.getByText('web', { exact: true })).toBeVisible();
  await expect(toggle.getByText('Remote, UK', { exact: true })).toHaveCount(0);
  await expect(toggle.getByText('View details', { exact: true })).toHaveCount(0);
  expect((await card.boundingBox())!.height).toBeLessThanOrEqual(84);
  await expect(card.locator('.simple-project-image')).toHaveCSS('margin-left', '0px');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toBeVisible();
  await expect(card.locator('.simple-project-chevron')).toHaveCSS('transform', /matrix\(-1, 0, 0, -1/);
  await expect(card.getByRole('link', { name: /View project/ })).toBeVisible();
  await expect(card.locator('.tunnel-tech span').last()).toBeVisible();
  const secondCard = cards.nth(1);
  await secondCard.getByRole('button').click();
  await expect(secondCard.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
  await secondCard.getByRole('button').click();
  await toggle.click();
  for (const theme of ['light', 'dark']) {
    await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
    await card.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `artifacts/mobile-simple/${theme}-expanded.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(panel).toBeHidden();
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(cards.nth(1).getByRole('button')).toBeFocused();
  for (const width of [320, 768, 999]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const responsiveCard = cards.nth(2);
    await responsiveCard.scrollIntoViewIfNeeded();
    await responsiveCard.getByRole('button').click();
    await expect(responsiveCard.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    await expect(responsiveCard.locator('.simple-project-details')).toBeVisible();
    await responsiveCard.getByRole('button').click({ position: { x: 18, y: 18 } });
    await expect(responsiveCard.locator('.simple-project-details')).toBeHidden();
    if (width === 320) await page.screenshot({ path: 'artifacts/mobile-simple/collapsed-320.png' });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await card.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'artifacts/mobile-simple/collapsed.png' });
  const footer = page.locator('.footer-container');
  await footer.scrollIntoViewIfNeeded();
  await expect(page.locator('html')).toHaveClass(/mobile-simple-view/);
  await expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
  await expect(footer.locator('.footer-intro-short')).toBeVisible();
  expect((await footer.locator('.footer-main').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ')))).toHaveLength(1);
  const dock = page.getByRole('navigation', { name: 'Bottom navigation' });
  const [footerActionBottom, dockTop] = await Promise.all([
    footer.locator('.back-to-top-button').evaluate(element => element.getBoundingClientRect().bottom),
    dock.evaluate(element => element.getBoundingClientRect().top),
  ]);
  expect(footerActionBottom).toBeLessThan(dockTop);
  await page.screenshot({ path: 'artifacts/mobile-simple/footer.png' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(cards).toHaveCount(7);
  await expect(page.locator('html')).not.toHaveClass(/mobile-simple-view/);
  await expect(footer.getByText('LinkedIn', { exact: true })).toBeHidden();
  await expect(cards.first().locator('.simple-project-details')).toBeHidden();
});

test('motion-enabled Simple View reveals content and restores the 3D journey', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('[data-home-ready=true]')).toBeAttached();
  await expect(page.locator('.cinematic-home')).toHaveClass(/is-simple/);
  await expect(page.getByRole('button', { name: 'Enable 3D journey', exact: true })).toBeVisible();
  const card = page.locator('.simple-project').first();
  await card.scrollIntoViewIfNeeded();
  await card.getByRole('button').click();
  await expect(card.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  await expect(card.locator('.simple-project-details')).toHaveCSS('opacity', '1');
  await expect(card.locator('.simple-project-image')).toHaveCSS('aspect-ratio', '16 / 10');
  const scrollBeforeCollapse = await page.evaluate(() => scrollY);
  const expandedButton = await card.getByRole('button').boundingBox();
  expect(expandedButton).not.toBeNull();
  await page.mouse.click(expandedButton!.x + 20, Math.max(80, expandedButton!.y + 20));
  await expect(card.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  await expect(card.locator('.simple-project-details')).toBeHidden();
  expect(Math.abs(await page.evaluate(() => scrollY) - scrollBeforeCollapse)).toBeLessThan(2);
  await card.getByRole('button').click();
  await page.locator('.contact-header').scrollIntoViewIfNeeded();
  await expect(page.locator('.contact-header')).toHaveCSS('opacity', '1');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.getByRole('button', { name: 'Enable 3D journey', exact: true }).click();
  await expect(page.locator('.cinematic-home')).toHaveClass(/is-cinematic/);
  await expect(page.locator('html')).not.toHaveClass(/mobile-simple-view/);
  await expect(page.locator('.simple-project')).toHaveCount(0);
  await expect(page.locator('.cinema-world canvas')).toBeVisible();
  await page.reload();
  await expect(page.locator('.cinematic-home')).toHaveClass(/is-cinematic/);
});

test('desktop Simple View uses one-open compact project cards and cleans up the signature footer', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.cinematic-home')).toHaveClass(/is-cinematic/);
  await page.getByRole('button', { name: 'Use simple view', exact: true }).click();
  const cards = page.locator('.simple-project');
  await expect(cards.first()).toBeVisible();
  for (const button of await cards.getByRole('button').all()) await expect(button).toHaveAttribute('aria-expanded', 'false');
  expect((await cards.first().boundingBox())!.height).toBeLessThanOrEqual(100);
  await cards.first().getByRole('button').click();
  await expect(cards.first().locator('.simple-project-details')).toBeVisible();
  await cards.first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'artifacts/desktop-simple/portfolio-expanded.png' });
  await cards.nth(1).getByRole('button').click();
  await expect(cards.first().locator('.simple-project-details')).toBeHidden();
  await expect(cards.nth(1).locator('.simple-project-details')).toBeVisible();
  await expect(page.locator('.mega-footer-meta')).toHaveCount(0);
  await expect(page.locator('.mega-footer-name')).toBeAttached();
  await page.locator('.footer-container').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'artifacts/desktop-simple/footer.png' });
});
