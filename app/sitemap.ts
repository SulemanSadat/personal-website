import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://sulemansadat.com";const routes=[["",1],["about",.8],["portfolio",.9],["pricing",.8],["blog",.7],["contact",.6]] as const;return routes.map(([path,priority])=>({url:path?`${base}/${path}`:`${base}/`,lastModified:new Date("2026-10-09"),priority})) }
