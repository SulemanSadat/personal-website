"use client";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEventHandler } from "react";
import { scrollToSection } from "../utils/sectionNavigation";

type SectionLinkProps = Omit<ComponentProps<typeof NextLink>, "href" | "onClick"> & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

// Same-document section navigation must not use Next's generic hash offset:
// the pinned project journey owns the position of its virtual Work section.
export default function SectionLink({ href, children, replace, onClick, ...props }: SectionLinkProps) {
  const router = useRouter();
  const hasSection = typeof href === "string" && href.includes("#");
  const handleClick: MouseEventHandler<HTMLAnchorElement> = event => {
    onClick?.(event);
    if (!hasSection || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    const id = decodeURIComponent(url.hash.slice(1));
    // Presence of the destination is the reliable same-document check. Raw
    // pathname comparison breaks when Next.js serves under a basePath.
    if (!document.getElementById(id)) return;
    event.preventDefault();
    if (replace) router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    else router.push(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    document.documentElement.dataset.sectionNavigation = id;
    scrollToSection(id);
    delete document.documentElement.dataset.sectionNavigation;
  };
  return <NextLink {...props} href={href} replace={replace} scroll={hasSection ? false : props.scroll}
    onClick={handleClick}>{children}</NextLink>;
}
