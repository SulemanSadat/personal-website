import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getPageMetadata, getStructuredData, socialImage } from "../seo/siteMetadata";

function setMeta(selector: string, attributes: Record<string, string>): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) { element = document.createElement("meta"); document.head.appendChild(element); }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export default function SEO() {
  const pathname = usePathname();
  useEffect(() => {
    const page = getPageMetadata(pathname);
    document.title = page.title;
    setMeta('meta[name="description"]', { name: "description", content: page.description });
    setMeta('meta[name="robots"]', { name: "robots", content: page.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: page.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: page.description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: page.canonical });
    setMeta('meta[property="og:type"]', { property: "og:type", content: page.type });
    setMeta('meta[property="og:image"]', { property: "og:image", content: socialImage });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: socialImage });
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = page.canonical;
    let schema = document.querySelector<HTMLScriptElement>("#page-structured-data");
    if (!schema) { schema = document.createElement("script"); schema.id = "page-structured-data"; schema.type = "application/ld+json"; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify(getStructuredData(pathname));
  }, [pathname]);
  return null;
}
