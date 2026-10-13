import { test, expect } from "@playwright/test";

for (const [width, height, label] of [[1440,1000,"desktop"], [768,1024,"tablet"], [390,844,"mobile"]] as const) {
  test(`compare original and Next home and footer at ${label} size in both themes`, async ({ browser, baseURL }) => {
    for (const theme of ["dark", "light"]) {
      for (const [name, url] of [["vite", "http://127.0.0.1:5173/"], ["next", `${baseURL}/`]]) {
        const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
        await page.addInitScript(value => {
          sessionStorage.setItem("suleman-studio-opening-v1", "seen");
          localStorage.setItem("suleman-portfolio-theme", value);
        }, theme);
        await page.goto(url, { waitUntil: "domcontentloaded" });
        await expect(page.locator(".cinematic-home.is-simple")).toBeAttached();
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await expect(page.locator(".studio-opening")).toHaveCount(0);
        await page.evaluate(() => document.fonts.ready);
        expect(await page.evaluate(() => Array.from(document.fonts).some(font => font.family === "Satoshi" && font.status === "loaded"))).toBe(true);
        await expect(page.locator(".cinema-services")).toHaveCount(0);
        await page.screenshot({ path: `artifacts/visual-regression/${label}-${theme}-${name}-home.png` });
        await page.locator(".footer-container").scrollIntoViewIfNeeded();
        await page.screenshot({ path: `artifacts/visual-regression/${label}-${theme}-${name}-footer.png` });
        await page.close();
      }
    }
  });
}
