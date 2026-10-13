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
  await expect(page.locator(".cinematic-home")).toHaveClass(/is-cinematic/);
  await expect(page.locator(".cinema-world canvas")).toBeVisible();
  await expect(page.locator(".cinema-world canvas")).toHaveAttribute("data-project-textures", "ready");
  const mode = page.locator(".cinema-mode");
  await expect(mode).toHaveText("Use simple view");
  await mode.tap();
  await expect(page.locator(".cinematic-home")).toHaveClass(/is-simple/);
  await expect(mode).toHaveText("Enable 3D journey");
  await mode.tap();
  await expect(page.locator(".cinematic-home")).toHaveClass(/is-cinematic/);
  await expect(page.locator(".cinema-world canvas")).toBeVisible();

  const dock = page.getByRole("navigation", { name: "Bottom navigation" });
  await dock.getByRole("link", { name: "Work", exact: true }).tap();
  await expect(page).toHaveURL(/#portfolio$/);
  await expect(page.locator(".tunnel-project:not([hidden])")).toHaveCount(1);
  await expect(page.locator(".tunnel-project:not([hidden]) .tunnel-project-visual img")).toBeVisible();
  await expect(page.locator(".cinema-world canvas")).toHaveAttribute("data-project-textures", "ready");
  await dock.getByRole("link", { name: "Home", exact: true }).tap();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);

  const client = await page.context().newCDPSession(page);
  await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 500 }] });
  await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: 180 }] });
  await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await expect(page.locator(".cinematic-home")).toHaveClass(/is-cinematic/);

  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  const home = dock.getByRole("link", { name: "Home", exact: true });
  const pricing = dock.getByRole("link", { name: "Pricing", exact: true });
  const from = await home.boundingBox(); const to = await pricing.boundingBox();
  await home.dispatchEvent("pointerdown", { pointerId: 7, pointerType: "touch", clientX: from!.x + from!.width / 2, clientY: from!.y + from!.height / 2 });
  await page.waitForTimeout(220);
  await home.dispatchEvent("pointermove", { pointerId: 7, pointerType: "touch", clientX: to!.x + to!.width / 2, clientY: to!.y + to!.height / 2 });
  await expect(page).toHaveURL(/#pricing$/);
  await expect.poll(() => page.locator("#pricing").evaluate(element => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(160);
  await expect(pricing).toHaveAttribute("data-drag-active", "true");
  const historyLength = await page.evaluate(() => history.length);
  await home.dispatchEvent("pointermove", { pointerId: 7, pointerType: "touch", clientX: to!.x + to!.width / 2, clientY: to!.y + to!.height / 2 });
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
  await home.dispatchEvent("pointerup", { pointerId: 7, pointerType: "touch", clientX: to!.x + to!.width / 2, clientY: to!.y + to!.height / 2 });
  await expect(page).toHaveURL(/#pricing$/);

  await page.locator("body").dispatchEvent("contextmenu", { bubbles: true, cancelable: true });
  await expect(page.locator(".context-menu")).toHaveCount(0);
});

test("contact introduction is a flush single column on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#contact");
  const header = page.locator("#contact .contact-header");
  const heading = header.locator("#contact-title");
  const intro = header.locator(".contact-subtitle");
  await expect(intro).toBeVisible();
  const [headerBox, headingBox, introBox, formBox] = await Promise.all([
    header.boundingBox(), heading.boundingBox(), intro.boundingBox(),
    page.locator("#contact .contact-form-card").boundingBox(),
  ]);
  expect(Math.abs(headingBox!.x - headerBox!.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(introBox!.x - headingBox!.x)).toBeLessThanOrEqual(1);
  expect(introBox!.width).toBeGreaterThanOrEqual(headerBox!.width - 1);
  expect(formBox!.y).toBeGreaterThan(introBox!.y + introBox!.height);
  await expect(page.getByRole("heading", { name: "Contact Information" })).toHaveCount(0);
  await expect(page.getByText("sadat.fullstack@gmail.com")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
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
