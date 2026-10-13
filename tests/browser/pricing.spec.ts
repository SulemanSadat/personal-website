import { test, expect } from "@playwright/test";

test("pricing route, plan switching, Shopify promotion and inquiry links match source behavior", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/#pricing$/);
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page.locator(".p2__serviceOption")).toHaveCount(5);
  await expect(page.locator(".p2__serviceIntro h2")).toHaveText("Web Apps, built for you.");
  await expect(page.locator(".p2__grid .p2__card")).toHaveCount(3);
  await expect(page.locator(".service-offer--shopify")).toBeVisible();
  await expect(page.locator(".offer-assurance")).toBeVisible();
  const inquiryLink = page.getByRole("link", { name: /Get started — Web Apps, Business Website/ });
  await expect(inquiryLink).toHaveAttribute("href", /subject=Inquiry/);
  await page.getByRole("button", { name: "Consultation" }).click();
  await expect(page.locator(".p2__serviceIntro h2")).toHaveText("Consultation, built for you.");
  await expect(page.locator(".p2__consultationGrid .service-offer")).toHaveCount(2);
  await expect(page.locator(".p2__trust")).toContainText("Focused, practical guidance");
  await page.getByRole("button", { name: "Automation" }).click();
  await expect(page.locator(".p2__serviceIntro h2")).toHaveText("Automation, built for you.");
  await expect(page.locator(".p2__terms")).toContainText("Third-party subscriptions and usage fees are quoted separately.");
});

test("pricing actions preserve the homepage and reliably populate contact", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");

  const contact = page.locator("#contact");
  const firstAction = page.getByRole("link", { name: /Get started — Web Apps, Business Website/ });
  await firstAction.click();
  await expect(page).toHaveURL(/subject=Inquiry.*#contact-form$/);
  await expect(contact.locator("input[name=subject]")).toHaveValue(/Business Website/);
  await expect(page.locator(".cinema-stage")).toBeAttached();
  await expect.poll(() => page.evaluate(() => {
    const form = document.getElementById("contact-form")?.getBoundingClientRect();
    return Boolean(form && form.top >= 0 && form.top < innerHeight * .35);
  }), { timeout: 30000 }).toBeTruthy();

  await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  const secondAction = page.getByRole("link", { name: /Request Custom Quote — Web Apps, Web Platform/ });
  await secondAction.click();
  await expect(page).toHaveURL(/subject=Inquiry.*#contact-form$/);
  await expect(contact.locator("input[name=subject]")).toHaveValue(/Web Platform/);
  await expect(page.locator(".cinema-stage")).toBeAttached();
});

test("pricing cards keep their text crisp while preserving the hover affordance", async ({ page }) => {
  await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  const card = page.locator(".p2__card").first();
  await card.hover();
  await expect.poll(() => card.evaluate(element => ({ card: getComputedStyle(element).filter, descendants: [...element.querySelectorAll("*")].map(node => getComputedStyle(node).filter).filter(value => value !== "none") }))).toEqual({ card: "none", descendants: [] });
});

test("first visit opening is session-scoped and favicon points at the reference asset", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "commit" });
  await expect(page.getByRole("status", { name: "Loading portfolio" })).toBeVisible({ timeout: 30000 });
  await expect(page.locator("link[rel=icon]").first()).toHaveAttribute("href", /favicon\.jpg/);
  await expect(page.getByRole("status", { name: "Loading portfolio" })).toBeHidden({ timeout: 10000 });
  await expect(page.locator(".cinema-portrait img")).toHaveJSProperty("complete", true);
  expect(await page.evaluate(() => document.fonts.status)).toBe("loaded");
  await expect(page.getByText("Loading page…")).toHaveCount(0);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("status", { name: "Loading portfolio" })).toHaveCount(0);
  await context.close();
});
