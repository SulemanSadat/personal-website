import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("suleman-studio-opening-v1", "seen"));
});

test.describe("touch navigation", () => {
test.use({ isMobile: true, hasTouch: true });
test("first swipe stays native, drag-select navigation works, and long press has no custom menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("[data-home-ready=true]")).toBeAttached();
  await expect(page.locator(".cinematic-home")).toHaveClass(/is-simple/);
  await expect(page.locator(".cinema-static-grid img").first()).toBeVisible();

  const client = await page.context().newCDPSession(page);
  await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 500 }] });
  await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: 180 }] });
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);

  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  const home = page.getByRole("navigation", { name: "Bottom navigation" }).getByRole("link", { name: "Home", exact: true });
  const pricing = page.getByRole("navigation", { name: "Bottom navigation" }).getByRole("link", { name: "Pricing", exact: true });
  const from = await home.boundingBox(); const to = await pricing.boundingBox();
  await home.dispatchEvent("pointerdown", { pointerId: 7, pointerType: "touch", clientX: from!.x + from!.width / 2, clientY: from!.y + from!.height / 2 });
  await home.dispatchEvent("pointermove", { pointerId: 7, pointerType: "touch", clientX: to!.x + to!.width / 2, clientY: to!.y + to!.height / 2 });
  await home.dispatchEvent("pointerup", { pointerId: 7, pointerType: "touch", clientX: to!.x + to!.width / 2, clientY: to!.y + to!.height / 2 });
  await expect(page).toHaveURL(/#pricing$/);
  await expect.poll(() => page.locator("#pricing").evaluate(element => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(160);

  await page.locator("body").dispatchEvent("contextmenu", { bubbles: true, cancelable: true });
  await expect(page.locator(".context-menu")).toHaveCount(0);
});
for (const theme of ["dark", "light"] as const) {
  test(`mobile controls remain readable and usable in ${theme} theme`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(value => localStorage.setItem("suleman-portfolio-theme", value), theme);
    await page.goto("/");
    await expect(page.locator("[data-home-ready=true]")).toBeAttached();
    await expect(page.locator(".studio-opening")).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);
    const dock = page.getByRole("navigation", { name: "Bottom navigation" });
    const hire = page.getByRole("button", { name: "Hire Me", exact: true });
    for (const [width, height] of [[320, 740], [390, 844], [430, 932], [768, 1024], [844, 390]]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await expect(dock).toBeVisible();
      await expect(hire).toBeVisible();
      await expect(dock).toHaveCSS("background-image", /linear-gradient/);
      expect(await dock.evaluate(element => {
        const reflection = getComputedStyle(element, "::after");
        return {
          border: getComputedStyle(element).borderTopColor,
          reflection: reflection.backgroundImage,
          reflectionOpacity: reflection.opacity,
        };
      })).toEqual(expect.objectContaining({
        border: expect.not.stringMatching(/rgba\(0, 0, 0, 0\)/),
        reflection: expect.stringContaining("linear-gradient"),
        reflectionOpacity: "0.72",
      }));
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const dockRect = await dock.boundingBox();
      const hireRect = await hire.boundingBox();
      expect(dockRect!.x).toBeGreaterThanOrEqual(0);
      expect(dockRect!.x + dockRect!.width).toBeLessThanOrEqual(width);
      expect(hireRect!.y + hireRect!.height).toBeLessThan(dockRect!.y);
      expect(hireRect!.height).toBeGreaterThanOrEqual(44);
      await page.screenshot({ path: `artifacts/mobile-polish/${theme}-${width}.png` });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await hire.tap();
    await expect.poll(() => page.locator("#contact").evaluate(element => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(160);
    await dock.getByRole("link", { name: "Home", exact: true }).tap();
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
    await expect(hire).toBeVisible();
    await dock.getByRole("link", { name: "Pricing", exact: true }).tap();
    await expect.poll(() => page.locator("#pricing").evaluate(element => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(160);
    await expect(dock.getByRole("link", { name: "Pricing", exact: true })).toHaveAttribute("aria-current", "location");
  });
}
});

for (const theme of ["dark", "light"] as const) {
  test(`contact fields use contained accessible focus styling in ${theme} theme`, async ({ page }) => {
    await page.addInitScript(value => localStorage.setItem("suleman-portfolio-theme", value), theme);
    await page.goto("/#contact");
    await expect(page.locator("#contact")).toBeVisible();
    const input = page.locator("#contact input[name=name]");
    await input.focus();
    await expect(input).toBeFocused();
    await expect(input).toHaveCSS("outline-style", "none");
    await expect(input).toHaveCSS("box-shadow", /rgb/);
    await expect(input).toHaveCSS("border-bottom-color", theme === "dark" ? "rgb(238, 241, 245)" : "rgb(23, 23, 23)");
    await page.screenshot({ path: `artifacts/mobile-polish/contact-focus-${theme}.png` });
  });
}

test("desktop controls retain their existing appearance", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("[data-home-ready=true]")).toBeAttached();
  await expect(page.locator(".bottom-nav")).toBeHidden();
  await page.evaluate(() => document.fonts.ready);
  for (const theme of ["dark", "light"]) {
  await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  expect(await page.locator(".cinema-actions .ghbRoot").evaluate(element => {
    const style = getComputedStyle(element);
    return { background: style.backgroundColor, color: style.color, borderRadius: style.borderRadius, padding: style.padding, boxShadow: style.boxShadow };
  })).toEqual({ background: theme === "light" ? "rgb(7, 93, 206)" : "rgb(216, 232, 255)", color: theme === "light" ? "rgb(255, 255, 255)" : "rgb(8, 17, 30)", borderRadius: "0px", padding: "13px 22px", boxShadow: "none" });
  await page.screenshot({ path: `artifacts/mobile-polish/desktop-${theme}.png` });
  }
});
