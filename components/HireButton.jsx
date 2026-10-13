"use client";
import { useRouter } from "next/navigation";
import { IconArrowUpRight as FiArrowUpRight } from "@tabler/icons-react";
import { scrollToSection } from "../utils/sectionNavigation";
export default function HireButton({ targetId = "contact", children = "Hire Me", onClick }) {
 const router=useRouter();const handlePress=(event)=>{onClick?.(event);if(event.defaultPrevented)return;const target=document.getElementById(targetId);if(target)scrollToSection(targetId);else router.push("/#contact")};
 return <button type="button" className="ghbRoot button-primary" onClick={handlePress}>{children}<FiArrowUpRight aria-hidden="true"/></button>;
}
