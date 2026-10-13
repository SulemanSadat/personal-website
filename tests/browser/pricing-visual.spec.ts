import { test, expect } from "@playwright/test";
const sizes = [[1440,1000,"desktop"],[768,1024,"tablet"],[390,844,"mobile"]] as const;
test("capture original and Next pricing sections at matching viewports", async ({ browser, baseURL }) => {
 for (const [width,height,label] of sizes) {
  for (const [name,url] of [["vite","http://127.0.0.1:5173/pricing"],["next",`${baseURL}/pricing`]] as const) {
   const page=await browser.newPage({viewport:{width,height},reducedMotion:"reduce"});
   await page.addInitScript(()=>{sessionStorage.setItem("suleman-studio-opening-v1","seen");localStorage.setItem("suleman-portfolio-theme","dark")});
   await page.goto(url,{waitUntil:"domcontentloaded"});
   await expect(page).toHaveURL(/#pricing$/);
   if(name==="next")await expect(page.locator("html")).toHaveAttribute("data-hydrated","true");
   const pricing=page.locator("#pricing").first();
   await expect(pricing.locator(".p2__title")).toBeVisible();
   await pricing.screenshot({path:`artifacts/visual-regression/pricing-${label}-${name}.png`});
   await page.close();
  }
 }
});
