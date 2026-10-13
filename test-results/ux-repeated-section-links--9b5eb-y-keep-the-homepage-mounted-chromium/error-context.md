# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ux.spec.ts >> repeated section links, pricing selections and history keep the homepage mounted
- Location: tests\browser\ux.spec.ts:74:5

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator: locator('input[name=subject]')
Expected pattern: /Business Website/
Received string:  ""
Timeout: 15000ms

Call log:
  - Expect "toHaveValue" locator('input[name=subject]') with timeout 15000ms
  - waiting for locator('input[name=subject]')
    33 × locator resolved to <input value="" required="" type="text" name="subject" class="form-input " id="contact-subject" aria-invalid="false" placeholder="What's this about?"/>
       - unexpected value ""

```

```yaml
- textbox "Subject":
  - /placeholder: What's this about?
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test("opening covers the first HTML paint even before application JavaScript loads", async ({ page }) => {
  4   |   await page.route("**/_next/**/*.js", route => route.abort());
  5   |   await page.goto("/", { waitUntil: "domcontentloaded" });
  6   |   await expect(page.locator(".studio-opening")).toBeVisible();
  7   |   expect(await page.evaluate(() => document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest(".studio-opening") !== null)).toBe(true);
  8   |   await expect(page.locator("html")).toHaveAttribute("data-opening", "pending");
  9   | });
  10  | 
  11  | test("desktop cursor, scrollbar and direction-aware header match the studio controls", async ({ page }) => {
  12  |   await page.setViewportSize({ width: 1440, height: 1000 });
  13  |   await page.addInitScript(() => sessionStorage.setItem("suleman-studio-opening-v1", "seen"));
  14  |   const errors: string[] = [];
  15  |   page.on("pageerror", error => errors.push(error.message));
  16  |   page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  17  |   await page.goto("/");
  18  |   await expect(page.locator("[data-home-ready=true]")).toBeAttached();
  19  |   await expect(page.locator(".compass-sections, .cinema-services")).toHaveCount(0);
  20  |   await expect(page.getByRole("scrollbar")).toBeVisible();
  21  |   await expect(page.locator("html")).toHaveCSS("scrollbar-width", "none");
  22  |   await page.mouse.move(400, 180);
  23  |   await expect(page.locator(".studio-cursor")).toHaveCSS("opacity", "1");
  24  |   await page.locator(".navbar-logo-link").hover();
  25  |   await expect(page.locator(".studio-cursor")).toHaveText("View");
  26  |   await page.mouse.move(600, 500);
  27  |   await page.mouse.wheel(0, 650);
  28  |   await expect(page.locator(".navbar")).toHaveClass(/navbar--hidden/);
  29  |   await page.mouse.wheel(0, -180);
  30  |   await expect(page.locator(".navbar")).not.toHaveClass(/navbar--hidden/);
  31  |   await page.getByRole("scrollbar").focus();
  32  |   await page.keyboard.press("End");
  33  |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(5);
  34  |   await expect(page.locator(".footer-brand-name")).toBeVisible();
  35  |   await expect(page.locator(".footer-main")).toHaveCSS("display", "grid");
  36  |   expect(errors).toEqual([]);
  37  | });
  38  | 
  39  | for (const [width, height, label] of [[1440,1000,"desktop"], [768,1024,"tablet"], [390,844,"mobile"]] as const) {
  40  |   test(`themes, footer and home-only 3D control at ${label} size`, async ({ browser }) => {
  41  |     for (const theme of ["dark", "light"]) {
  42  |       const page = await browser.newPage({ viewport: { width, height } });
  43  |       await page.addInitScript(value => {
  44  |         sessionStorage.setItem("suleman-studio-opening-v1", "seen");
  45  |         localStorage.setItem("suleman-portfolio-theme", value);
  46  |       }, theme);
  47  |       await page.goto("/");
  48  |       await expect(page.locator("[data-home-ready=true]")).toBeAttached();
  49  |       await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  50  |       await page.evaluate(() => document.fonts.ready);
  51  |       await page.screenshot({ path: `artifacts/ux/${label}-${theme}-home.png` });
  52  |       const mode = page.locator(".cinema-mode");
  53  |       await expect(mode).toBeVisible();
  54  |       await page.locator(width < 1100 ? ".bottom-nav a[href='/#portfolio']" : ".navigation a[href='/#portfolio']").click();
  55  |       await expect.poll(() => page.locator(".tunnel-project:not([hidden])").count()).toBe(1);
  56  |       await expect(page.locator(".tunnel-heading")).toHaveCSS("opacity", "0");
  57  |       await page.mouse.move(1, height - 1);
  58  |       await page.screenshot({ path: `artifacts/ux/${label}-${theme}-work.png` });
  59  |       if (width < 1000) await expect(mode).toHaveCount(0);
  60  |       const card = page.locator(".tunnel-project:not([hidden])");
  61  |       if (width < 1000) await expect(page.locator(".cinema-hero-meta")).toHaveCSS("opacity", "0");
  62  |       if (theme === "light") await expect(card).toHaveCSS("background-color", "rgb(255, 255, 255)");
  63  |       await page.locator("#contact").scrollIntoViewIfNeeded();
  64  |       if (width < 1000) await expect(mode).toHaveCount(0);
  65  |       await page.locator(".footer-container").scrollIntoViewIfNeeded();
  66  |       await page.screenshot({ path: `artifacts/ux/${label}-${theme}-footer.png` });
  67  |       expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  68  |       await expect(page.locator(".compass-sections")).toHaveCount(0);
  69  |       await page.close();
  70  |     }
  71  |   });
  72  | }
  73  | 
  74  | test("repeated section links, pricing selections and history keep the homepage mounted", async ({ page }) => {
  75  |   await page.setViewportSize({ width: 1440, height: 1000 });
  76  |   await page.addInitScript(() => sessionStorage.setItem("suleman-studio-opening-v1", "seen"));
  77  |   let documentLoads = 0;
  78  |   page.on("request", request => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) documentLoads++; });
  79  |   await page.goto("/");
  80  |   await expect(page.locator("[data-home-ready=true]")).toBeAttached();
  81  |   const stage = await page.locator(".cinema-stage").elementHandle();
  82  |   for (let attempt = 0; attempt < 6; attempt++) {
  83  |     await page.locator("#pricing").scrollIntoViewIfNeeded();
  84  |     const plan = attempt % 2 ? "Web Platform" : "Business Website";
  85  |     await page.getByRole("link", { name: new RegExp(`— Web Apps, ${plan}`) }).click();
> 86  |     await expect(page.locator("input[name=subject]")).toHaveValue(new RegExp(plan));
      |                                                       ^ Error: expect(locator).toHaveValue(expected) failed
  87  |     await expect(page.locator("textarea[name=message]")).toHaveValue(new RegExp(plan));
  88  |     await expect.poll(() => page.locator("#contact").evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(260);
  89  |     expect(await stage!.evaluate(el => el.isConnected)).toBe(true);
  90  |   }
  91  |   await page.goBack();
  92  |   await expect(page.locator("input[name=subject]")).toHaveValue(/Business Website/);
  93  |   await page.goForward();
  94  |   await expect(page.locator("input[name=subject]")).toHaveValue(/Web Platform/);
  95  |   await page.locator(".footer-nav a[href='/#portfolio']").click();
  96  |   await expect(page.locator(".tunnel-project:not([hidden])")).toHaveCount(1);
  97  |   expect(documentLoads).toBe(1);
  98  |   await page.goto("/blog");
  99  |   await page.locator(".navigation a[href='/#portfolio']").click();
  100 |   await expect(page.locator(".tunnel-project:not([hidden])")).toHaveCount(1);
  101 |   await expect(page.locator(".site-shell")).toHaveCount(1);
  102 |   await expect(page.locator(".navbar")).toHaveCount(1);
  103 |   await expect(page.locator("#contact")).toHaveCount(1);
  104 |   await page.mouse.move(800, 800);
  105 |   await page.mouse.wheel(0, 400);
  106 |   await expect.poll(() => page.locator(".navbar").evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0);
  107 |   await expect(page.locator(".studio-opening")).toHaveCount(0);
  108 | });
  109 | 
  110 | test("pricing navigation keeps one guarded route handoff", async ({ page }) => {
  111 |   await page.addInitScript(() => sessionStorage.setItem("suleman-studio-opening-v1", "seen"));
  112 |   await page.goto("/");
  113 |   await expect(page.locator("[data-home-ready=true]")).toBeAttached();
  114 |   await page.locator("#pricing").scrollIntoViewIfNeeded();
  115 |   await page.getByRole("link", { name: /Get started — Web Apps, Business Website/ }).click();
  116 |   await expect(page.locator("#contact input[name=subject]")).toHaveValue(/Business Website/);
  117 |   await expect.poll(() => page.locator("#contact").evaluate(element => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(260);
  118 |   expect(await page.evaluate(() => document.documentElement.dataset.sectionNavigation || "")).toBe("");
  119 | });
  120 | 
```