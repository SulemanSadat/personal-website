import { test, expect } from "@playwright/test";

test.use({ isMobile: true, hasTouch: true });

test("fresh mobile visit keeps one loader until the optimized portrait is ready", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let releaseImage!: () => void;
  let imageRequested!: () => void;
  const imageGate = new Promise<void>(resolve => { releaseImage = resolve; });
  const requested = new Promise<void>(resolve => { imageRequested = resolve; });
  await page.route("**/_next/image**", async route => {
    const source = new URL(route.request().url()).searchParams.get("url") ?? "";
    if (source.endsWith("/assets/profile.png")) {
      imageRequested();
      await imageGate;
    }
    await route.continue();
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await requested;
  await expect(page.locator(".studio-opening")).toBeVisible();
  await expect(page.getByText("Loading page…")).toHaveCount(0);

  releaseImage();
  await expect(page.locator(".studio-opening")).toHaveCount(0);
  await expect(page.locator(".mobile-reference-portrait img")).toBeVisible();
  await expect(page.locator(".mobile-reference-card")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Bottom navigation" })).toBeVisible();
  await page.locator(".footer-container").scrollIntoViewIfNeeded();
  await expect(page.locator(".footer-container")).toBeVisible();
});
