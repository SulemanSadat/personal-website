import { test, expect } from "@playwright/test";

test("opening covers the first HTML paint even before application JavaScript loads", async ({ page }) => {
  await page.route("**/_next/**/*.js", route => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".studio-opening")).toBeVisible();
  await expect(page.locator(".studio-opening")).toContainText("Loading…");
  await expect(page.locator(".studio-opening")).not.toContainText("Suleman Sadat");
  await expect(page.locator(".site-shell")).toBeHidden();
  await expect(page.locator(".bottom-nav")).toBeHidden();
  await expect(page.locator(".studio-opening")).toHaveCSS("background-color", "rgb(5, 7, 10)");
  expect(await page.evaluate(() => document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest(".studio-opening") !== null)).toBe(true);
  await expect(page.locator("html")).toHaveAttribute("data-opening", "pending");
});

test("cold mobile load waits for the essential portrait and defers 3D work", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  let releasePortrait = () => {};
  const portraitGate = new Promise<void>(resolve => { releasePortrait = resolve; });
  await page.route(/hero-portrait\.webp/, async route => { await portraitGate; await route.continue(); });
  await page.goto("/", { waitUntil: "commit" });
  await expect(page.getByRole("status", { name: "Loading portfolio" })).toBeVisible();
  await expect(page.locator(".site-shell")).toBeHidden();
  await expect(page.locator(".cinema-world canvas")).toHaveCount(0);
  releasePortrait();
  await expect(page.locator(".cinema-portrait img")).toHaveJSProperty("complete", true);
  await expect(page.getByRole("status", { name: "Loading portfolio" })).toBeHidden();
  await expect(page.locator(".site-shell")).toBeVisible();
  await expect(page.locator(".cinema-world canvas")).toBeVisible({ timeout: 30000 });
  await context.close();
});

test("desktop cursor, scrollbar and direction-aware header match the studio controls", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() => sessionStorage.setItem("suleman-studio-opening-v1", "seen"));
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page.locator("[data-home-ready=true]")).toBeAttached();
  await expect(page.locator(".compass-sections, .cinema-services")).toHaveCount(0);
  await expect(page.getByRole("scrollbar")).toBeVisible();
  await expect(page.locator("html")).toHaveCSS("scrollbar-width", "none");
  await page.mouse.move(400, 180);
  await expect(page.locator(".studio-cursor")).toHaveCSS("opacity", "1");
  await page.locator(".navbar-logo-link").hover();
  await expect(page.locator(".studio-cursor")).toHaveText("View");
  await page.mouse.move(600, 500);
  await page.mouse.wheel(0, 650);
  await expect(page.locator(".navbar")).toHaveClass(/navbar--hidden/);
  await page.mouse.wheel(0, -180);
  await expect(page.locator(".navbar")).not.toHaveClass(/navbar--hidden/);
  await page.getByRole("scrollbar").focus();
  await page.keyboard.press("End");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(5);
  await expect(page.locator(".footer-brand-name")).toBeVisible();
  await expect(page.locator(".footer-main")).toHaveCSS("display", "grid");
  expect(errors).toEqual([]);
});

for (const [width, height, label] of [[1440,1000,"desktop"], [768,1024,"tablet"], [390,844,"mobile"]] as const) {
  test(`themes, footer and responsive project experience at ${label} size`, async ({ browser }) => {
    for (const theme of ["dark", "light"]) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.addInitScript(value => {
        sessionStorage.setItem("suleman-studio-opening-v1", "seen");
        localStorage.setItem("suleman-portfolio-theme", value);
      }, theme);
      await page.goto("/");
      await expect(page.locator("[data-home-ready=true]")).toBeAttached();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `artifacts/ux/${label}-${theme}-home.png` });
      const mode = page.locator(".cinema-mode");
      await expect(mode).toBeVisible();
      await page.locator(width < 1100 ? ".bottom-nav a[href='/#portfolio']" : ".navigation a[href='/#portfolio']").click();
      await expect.poll(() => page.locator(".tunnel-project:not([hidden])").count()).toBe(1);
      await expect(page.locator(".tunnel-heading")).toHaveCSS("opacity", "0");
      await page.mouse.move(1, height - 1);
      await page.screenshot({ path: `artifacts/ux/${label}-${theme}-work.png` });
      if (width < 1000) await expect(mode).toHaveCount(0);
      const card = page.locator(".tunnel-project:not([hidden])");
      if (width < 1000) {
        const preview = card.locator(".tunnel-project-visual img");
        await expect(preview).toBeVisible();
        const layout = await card.evaluate(element => {
          const image = element.querySelector(".tunnel-project-visual")?.getBoundingClientRect();
          const heading = element.querySelector("h2")?.getBoundingClientRect();
          return { imageHeight: image?.height || 0, imageBottom: image?.bottom || 0, headingTop: heading?.top || 0 };
        });
        expect(layout.imageHeight).toBeGreaterThan(120);
        expect(layout.headingTop).toBeGreaterThanOrEqual(layout.imageBottom);
      }
      if (theme === "light") await expect(card).toHaveCSS("background-color", "rgb(255, 255, 255)");
      await page.locator("#contact").scrollIntoViewIfNeeded();
      if (width < 1000) await expect(mode).toHaveCount(0);
      await page.locator(".footer-container").scrollIntoViewIfNeeded();
      await page.screenshot({ path: `artifacts/ux/${label}-${theme}-footer.png` });
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
      await expect(page.locator(".compass-sections")).toHaveCount(0);
      await page.close();
    }
  });
}

test("repeated section links, pricing selections and history keep the homepage mounted", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() => sessionStorage.setItem("suleman-studio-opening-v1", "seen"));
  let documentLoads = 0;
  page.on("request", request => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) documentLoads++; });
  await page.goto("/");
  await expect(page.locator("[data-home-ready=true]")).toBeAttached();
  const stage = await page.locator(".cinema-stage").elementHandle();
  for (let attempt = 0; attempt < 6; attempt++) {
    await page.locator("#pricing").scrollIntoViewIfNeeded();
    const plan = attempt % 2 ? "Web Platform" : "Business Website";
    await page.getByRole("link", { name: new RegExp(`— Web Apps, ${plan}`) }).click();
    await expect(page.locator("input[name=subject]")).toHaveValue(new RegExp(plan));
    await expect(page.locator("textarea[name=message]")).toHaveValue(new RegExp(plan));
    await expect.poll(() => page.locator("#contact-form").evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(350);
    expect(await stage!.evaluate(el => el.isConnected)).toBe(true);
  }
  await page.goBack();
  await expect(page.locator("input[name=subject]")).toHaveValue(/Business Website/);
  await page.goForward();
  await expect(page.locator("input[name=subject]")).toHaveValue(/Web Platform/);
  await page.locator(".footer-nav a[href='/#portfolio']").click();
  await expect(page.locator(".tunnel-project:not([hidden])")).toHaveCount(1);
  expect(documentLoads).toBe(1);
  await page.goto("/blog");
  await page.locator(".navigation a[href='/#portfolio']").click();
  await expect(page.locator(".tunnel-project:not([hidden])")).toHaveCount(1);
  await expect(page.locator(".site-shell")).toHaveCount(1);
  await expect(page.locator(".navbar")).toHaveCount(1);
  await expect(page.locator("#contact")).toHaveCount(1);
  await page.mouse.move(800, 800);
  await page.mouse.wheel(0, 400);
  await expect.poll(() => page.locator(".navbar").evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0);
  await expect(page.locator(".studio-opening")).toHaveCount(0);
});

test("pricing navigation keeps one guarded route handoff", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("suleman-studio-opening-v1", "seen"));
  await page.goto("/");
  await expect(page.locator("[data-home-ready=true]")).toBeAttached();
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await page.getByRole("link", { name: /Get started — Web Apps, Business Website/ }).click();
  await expect(page.locator("#contact input[name=subject]")).toHaveValue(/Business Website/);
  await expect.poll(() => page.locator("#contact-form").evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(350);
  expect(await page.evaluate(() => document.documentElement.dataset.sectionNavigation || "")).toBe("");
});
