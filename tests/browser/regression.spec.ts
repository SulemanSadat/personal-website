import { test, expect } from "@playwright/test";

test("routes render their intended content without client runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  for (const [path, heading] of [["/", "SULEMAN"], ["/about", "SULEMAN"], ["/portfolio", "SULEMAN"], ["/pricing", "Software, automation"], ["/contact", "SULEMAN"], ["/blog", "Software Engineering & AI Articles"], ["/courses", "Courses"]] as const) {
    const routePage = await page.context().newPage();
    routePage.on("pageerror", error => errors.push(error.message));
    routePage.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await routePage.goto(path, { waitUntil: "domcontentloaded" });
    await expect(routePage.locator("html")).toHaveAttribute("data-hydrated", "true");
    await expect(routePage.locator("body")).toContainText(heading);
    await expect(routePage.locator(".site-shell")).toHaveCount(1);
    await expect(routePage.locator(".site-shell")).toBeVisible();
    await routePage.close();
  }
  expect(errors).toEqual([]);
});

test("skill icon definitions are all rendered and skills controls work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const skills = page.locator(".skills-section");
  await skills.scrollIntoViewIfNeeded();
  await expect(skills.getByText("OpenAI API", { exact: true }).first()).toBeVisible();
  await expect(skills.getByText("Codex", { exact: true }).first()).toBeVisible();
  await expect(skills.locator(".skill-chip svg")).toHaveCount(2 * 31);
  const testimonialControl = page.getByRole("button", { name: "Play testimonials" });
  await testimonialControl.click();
  await expect(page.getByRole("button", { name: "Pause testimonials" })).toBeVisible();
  await page.getByRole("button", { name: "Pause testimonials" }).click();
  await expect(page.getByRole("button", { name: "Play testimonials" })).toBeVisible();
});

test("navigation aliases, pricing inquiries, contact validation and theme persist", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const inquiryLink = page.getByRole("link", { name: /Get started/ }).first();
  const inquiryHref = await inquiryLink.getAttribute("href");
  expect(inquiryHref).toMatch(/subject=/);
  await page.goto(inquiryHref!, { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page).toHaveURL(/subject=/);
  await expect(page.locator("#contact input[name=subject]")).toHaveValue(/Web Apps/);
  await page.locator("#contact input[name=name]").fill("Test Visitor");
  await page.locator("#contact input[name=email]").fill("invalid-email");
  await page.locator("#contact textarea[name=message]").fill("A test message");
  await page.locator("#contact form").evaluate((form: HTMLFormElement) => form.requestSubmit());
  await expect(page.locator("#contact")).toContainText("Email is invalid");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const aliasPage = await page.context().newPage();
  await aliasPage.goto("/about", { waitUntil: "domcontentloaded" });
  await expect(aliasPage.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(aliasPage).toHaveURL(/#about$/);
  await expect(aliasPage.locator("#about").first()).toBeVisible();
});

test("home responsive layouts fit viewport and theme control works", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page.locator(".cinema-portrait img")).toBeVisible();
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth }));
    expect(overflow.width <= width, `horizontal overflow at ${width}: ${JSON.stringify(overflow)}`).toBeTruthy();
  }
  expect(errors).toEqual([]);
});
