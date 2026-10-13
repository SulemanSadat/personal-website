import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve("out");
const requiredFiles = ["index.html", "404.html", "manifest.webmanifest", "robots.txt", "sitemap.xml", ".nojekyll", "_next"];

for (const file of requiredFiles) {
  if (!existsSync(resolve(root, file))) throw new Error(`Missing Pages export file: out/${file}`);
}

const home = readFileSync(resolve(root, "index.html"), "utf8");
const manifest = readFileSync(resolve(root, "manifest.webmanifest"), "utf8");
const robots = readFileSync(resolve(root, "robots.txt"), "utf8");
const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
const expectedPrefix = "/personal-website/";

for (const expected of [
  `${expectedPrefix}_next/`,
  `${expectedPrefix}assets/`,
  "https://sulemansadat.github.io/personal-website/",
  "https://sulemansadat.github.io/personal-website/preview.jpg",
]) {
  if (!home.includes(expected)) throw new Error(`Pages home output is missing ${expected}`);
}

if (!manifest.includes('"start_url":"/personal-website/"')) throw new Error("Pages manifest has the wrong start URL");
if (!robots.includes("https://sulemansadat.github.io/personal-website/sitemap.xml")) throw new Error("Pages robots URL is incorrect");
if (!sitemap.includes("https://sulemansadat.github.io/personal-website/")) throw new Error("Pages sitemap URLs are incorrect");

console.log("GitHub Pages static export verified.");
