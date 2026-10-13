import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/site-path";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const routes=[["",1],["about",.8],["portfolio",.9],["pricing",.8],["blog",.7],["contact",.6]] as const;return routes.map(([path,priority])=>({url:absoluteUrl(path?`/${path}`:"/"),lastModified:new Date("2026-10-09"),priority})) }
