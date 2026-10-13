"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "./SectionLink";
import { IconArrowUpRight, IconHome, IconLayoutGrid, IconStack2, IconUser, IconMail } from "@tabler/icons-react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { assetPath } from "../lib/site-path";
import { scrollToSection } from "../utils/sectionNavigation";
const logo = assetPath("/assets/Logo.png");
const sections = [["home", "Home", IconHome], ["portfolio", "Work", IconLayoutGrid], ["pricing", "Pricing", IconStack2], ["about", "About", IconUser], ["contact", "Contact", IconMail]];

export default function Navbar() {
 const [hidden,setHidden]=useState(false); const [active,setActive]=useState("home"); const [dragTarget,setDragTarget]=useState(null); const pathname=usePathname(); const router=useRouter();
 const drag=useRef(null);
 useEffect(()=>{const desktop=matchMedia("(min-width: 1100px) and (prefers-reduced-motion: no-preference)");let lastY=scrollY,anchorY=lastY,direction=0,frame;const update=()=>{frame=null;const nextY=Math.max(0,scrollY);const nextDirection=Math.sign(nextY-lastY);if(nextDirection&&nextDirection!==direction){anchorY=lastY;direction=nextDirection}if(!desktop.matches||nextY<96){setHidden(false);anchorY=nextY}else if(nextY>lastY&&nextY-anchorY>18){setHidden(true);anchorY=nextY}else if(nextY<lastY&&anchorY-nextY>10){setHidden(false);anchorY=nextY}lastY=nextY;let current=pathname==="/"?"home":pathname.slice(1);if(pathname==="/")sections.forEach(([id])=>{const node=document.getElementById(id);if(node&&node.getBoundingClientRect().top<=innerHeight*.4)current=id});setActive(current)};const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule)}},[pathname]);

 const itemAt=(x,y)=>document.elementFromPoint(x,y)?.closest?.(".bottom-nav a")?.dataset.section;
 const onPointerDown=event=>{if(event.pointerType==="mouse")return;drag.current={id:event.pointerId,x:event.clientX,y:event.clientY,dragging:false,target:event.currentTarget.dataset.section};};
 const onPointerMove=event=>{const state=drag.current;if(!state||state.id!==event.pointerId)return;const dx=event.clientX-state.x,dy=event.clientY-state.y;if(!state.dragging&&Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.15)state.dragging=true;if(state.dragging){state.target=itemAt(event.clientX,event.clientY)||state.target;setDragTarget(state.target)}};
 const onPointerEnd=event=>{const state=drag.current;if(!state||state.id!==event.pointerId)return;drag.current=null;setDragTarget(null);if(!state.dragging)return;event.preventDefault();const id=state.target;if(!id)return;if(pathname==="/"&&document.getElementById(id)){history.pushState({...history.state,__sectionNavigation:id},"",`#${id}`);scrollToSection(id)}else router.push(`/#${id}`,{scroll:false})};

 return <><header className={`navbar ${hidden?"navbar--hidden":""}`} onFocusCapture={()=>setHidden(false)}><div className="navbar-content"><Link href="/#home" className="navbar-logo-link" aria-label="Suleman Sadat — Home"><Image src={logo} alt="" className="navbar-logo" width={25} height={32}/><span className="navbar-brand">Suleman Sadat<span>ENGINEER & MAKER</span></span></Link><nav aria-label="Main navigation" className="navigation">{sections.map(([id,label])=><Link key={id} href={`/#${id}`} className={`nav-link ${active===id?"active":""}`} aria-current={active===id?"location":undefined}>{id==="portfolio"?"Portfolio":label}{id==="contact"&&<IconArrowUpRight size={14} aria-hidden="true"/>}</Link>)}<Link href="/blog" className={`nav-link ${active==="blog"?"active":""}`} aria-current={active==="blog"?"page":undefined}>Blog</Link></nav><div className="navbar-actions"><ThemeToggle/></div></div></header><nav className={`bottom-nav ${dragTarget?"is-dragging":""}`} aria-label="Bottom navigation" style={{"--active-index":Math.max(0,sections.findIndex(([id])=>id===(dragTarget||active)))}} data-has-active={sections.some(([id])=>id===(dragTarget||active))}>{sections.map(([id,label,Icon])=><Link key={id} href={`/#${id}`} data-section={id} aria-current={active===id?"location":undefined} data-drag-active={dragTarget===id||undefined} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={()=>{drag.current=null;setDragTarget(null)}}><Icon size={20} stroke={1.6} aria-hidden="true"/><span>{label}</span></Link>)}</nav><div className="mobile-theme-toggle"><ThemeToggle/></div></>;
}
