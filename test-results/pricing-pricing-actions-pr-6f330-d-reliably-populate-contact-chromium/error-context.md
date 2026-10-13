# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pricing.spec.ts >> pricing actions preserve the homepage and reliably populate contact
- Location: tests\browser\pricing.spec.ts:24:5

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator: locator('#contact').locator('input[name=subject]')
Expected pattern: /Business Website/
Received string:  ""
Timeout: 15000ms

Call log:
  - Expect "toHaveValue" locator('#contact').locator('input[name=subject]') with timeout 15000ms
  - waiting for locator('#contact').locator('input[name=subject]')
    33 × locator resolved to <input value="" required="" type="text" name="subject" class="form-input " id="contact-subject" aria-invalid="false" placeholder="What's this about?"/>
       - unexpected value ""

```

```yaml
- textbox "Subject":
  - /placeholder: What's this about?
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("pricing route, plan switching, Shopify promotion and inquiry links match source behavior", async ({ page }) => {
  4  |   await page.emulateMedia({ reducedMotion: "reduce" });
  5  |   await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  6  |   await expect(page).toHaveURL(/#pricing$/);
  7  |   await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  8  |   await expect(page.locator(".p2__serviceOption")).toHaveCount(5);
  9  |   await expect(page.locator(".p2__serviceIntro h2")).toHaveText("Web Apps, built for you.");
  10 |   await expect(page.locator(".p2__grid .p2__card")).toHaveCount(3);
  11 |   await expect(page.locator(".service-offer--shopify")).toBeVisible();
  12 |   await expect(page.locator(".offer-assurance")).toBeVisible();
  13 |   const inquiryLink = page.getByRole("link", { name: /Get started — Web Apps, Business Website/ });
  14 |   await expect(inquiryLink).toHaveAttribute("href", /subject=Inquiry/);
  15 |   await page.getByRole("button", { name: "Consultation" }).click();
  16 |   await expect(page.locator(".p2__serviceIntro h2")).toHaveText("Consultation, built for you.");
  17 |   await expect(page.locator(".p2__consultationGrid .service-offer")).toHaveCount(2);
  18 |   await expect(page.locator(".p2__trust")).toContainText("Focused, practical guidance");
  19 |   await page.getByRole("button", { name: "Automation" }).click();
  20 |   await expect(page.locator(".p2__serviceIntro h2")).toHaveText("Automation, built for you.");
  21 |   await expect(page.locator(".p2__terms")).toContainText("Third-party subscriptions and usage fees are quoted separately.");
  22 | });
  23 | 
  24 | test("pricing actions preserve the homepage and reliably populate contact", async ({ page }) => {
  25 |   await page.emulateMedia({ reducedMotion: "reduce" });
  26 |   await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  27 |   await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  28 | 
  29 |   const contact = page.locator("#contact");
  30 |   const firstAction = page.getByRole("link", { name: /Get started — Web Apps, Business Website/ });
  31 |   await firstAction.click();
  32 |   await expect(page).toHaveURL(/subject=Inquiry/);
> 33 |   await expect(contact.locator("input[name=subject]")).toHaveValue(/Business Website/);
     |                                                        ^ Error: expect(locator).toHaveValue(expected) failed
  34 |   await expect(page.locator(".cinema-stage")).toBeAttached();
  35 |   await expect.poll(() => page.evaluate(() => Math.abs((document.getElementById("contact")?.getBoundingClientRect().top || 0)) < 260), { timeout: 30000 }).toBeTruthy();
  36 | 
  37 |   await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  38 |   const secondAction = page.getByRole("link", { name: /Request Custom Quote — Web Apps, Web Platform/ });
  39 |   await secondAction.click();
  40 |   await expect(page).toHaveURL(/subject=Inquiry/);
  41 |   await expect(contact.locator("input[name=subject]")).toHaveValue(/Web Platform/);
  42 |   await expect(page.locator(".cinema-stage")).toBeAttached();
  43 | });
  44 | 
  45 | test("pricing cards keep their text crisp while preserving the hover affordance", async ({ page }) => {
  46 |   await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  47 |   const card = page.locator(".p2__card").first();
  48 |   await card.hover();
  49 |   await expect.poll(() => card.evaluate(element => ({ card: getComputedStyle(element).filter, descendants: [...element.querySelectorAll("*")].map(node => getComputedStyle(node).filter).filter(Boolean) }))).toEqual({ card: "none", descendants: [] });
  50 | });
  51 | 
  52 | test("first visit opening is session-scoped and favicon points at the reference asset", async ({ browser }) => {
  53 |   const context = await browser.newContext();
  54 |   const page = await context.newPage();
  55 |   await page.goto("/", { waitUntil: "domcontentloaded" });
  56 |   await expect(page.getByRole("status", { name: "Welcome to the portfolio" })).toBeVisible({ timeout: 30000 });
  57 |   await expect(page.locator("link[rel=icon]").first()).toHaveAttribute("href", /favicon\.jpg/);
  58 |   await expect(page.getByRole("status", { name: "Welcome to the portfolio" })).toBeHidden({ timeout: 10000 });
  59 |   await page.reload({ waitUntil: "domcontentloaded" });
  60 |   await expect(page.getByRole("status", { name: "Welcome to the portfolio" })).toHaveCount(0);
  61 |   await context.close();
  62 | });
  63 | 
```