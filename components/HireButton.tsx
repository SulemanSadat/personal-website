"use client";
import { useRouter } from "next/navigation";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { IconArrowUpRight as FiArrowUpRight } from "@tabler/icons-react";
import { scrollToSection } from "../utils/sectionNavigation";
interface HireButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  targetId?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
export default function HireButton({ targetId = "contact", children = "Hire Me", onClick, ...buttonProps }: HireButtonProps) {
 const router=useRouter();const handlePress=(event: MouseEvent<HTMLButtonElement>)=>{onClick?.(event);if(event.defaultPrevented)return;const target=document.getElementById(targetId);if(target)scrollToSection(targetId);else router.push("/#contact")};
 return <button {...buttonProps} type="button" className={`ghbRoot button-primary ${buttonProps.className ?? ""}`.trim()} onClick={handlePress}>{children}<FiArrowUpRight aria-hidden="true"/></button>;
}
