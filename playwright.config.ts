import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  timeout: 120000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000", trace: "retain-on-failure", screenshot: "only-on-failure", launchOptions: { executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" } },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: { command: process.env.PLAYWRIGHT_BASE_URL ? `npm run start -- --port ${new URL(process.env.PLAYWRIGHT_BASE_URL).port}` : "npm run dev", url: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000", reuseExistingServer: !process.env.PLAYWRIGHT_BASE_URL, timeout: 120000 },
});

