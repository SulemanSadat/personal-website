"use client";
import NextLink from "next/link";
import { scrollToSection } from "../utils/sectionNavigation";

// Same-document section navigation must not use Next's generic hash offset:
// the pinned project journey owns the position of its virtual Work section.
export default function SectionLink({ href, children, replace, ...props }) {
  const hasSection = typeof href === "string" && href.includes("#");
  const handleClick = event => {
    if (!hasSection || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(href, window.location.href);
    if (url.pathname !== window.location.pathname || url.origin !== window.location.origin) return;
    const id = decodeURIComponent(url.hash.slice(1));
    if (!document.getElementById(id)) return;
    event.preventDefault();
    window.history[replace ? "replaceState" : "pushState"]({ ...window.history.state, __sectionNavigation: id }, "", url);
    document.documentElement.dataset.sectionNavigation = id;
    scrollToSection(id);
  };
  return <NextLink {...props} href={href} replace={replace} scroll={hasSection ? false : props.scroll}
    onClick={handleClick}>{children}</NextLink>;
}
