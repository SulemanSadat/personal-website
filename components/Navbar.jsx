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
 const drag=useRef(null); const suppressClick=useRef(false);
 useEffect(()=>{const desktop=matchMedia("(min-width: 1100px) and (prefers-reduced-motion: no-preference)");let lastY=scrollY,anchorY=lastY,direction=0,frame;const update=()=>{frame=null;const nextY=Math.max(0,scrollY);const nextDirection=Math.sign(nextY-lastY);if(nextDirection&&nextDirection!==direction){anchorY=lastY;direction=nextDirection}if(!desktop.matches||nextY<96){setHidden(false);anchorY=nextY}else if(nextY>lastY&&nextY-anchorY>18){setHidden(true);anchorY=nextY}else if(nextY<lastY&&anchorY-nextY>10){setHidden(false);anchorY=nextY}lastY=nextY;let current=pathname==="/"?"home":pathname.slice(1);if(pathname==="/")sections.forEach(([id])=>{const node=document.getElementById(id);if(node&&node.getBoundingClientRect().top<=innerHeight*.4)current=id});setActive(current)};const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule)}},[pathname]);

 const itemAt=(x,y)=>document.elementFromPoint(x,y)?.closest?.(".bottom-nav a")?.dataset.section;
 const clearDrag=()=>{if(drag.current?.timer)window.clearTimeout(drag.current.timer);drag.current=null;setDragTarget(null)};
 const navigateSection=(id,{replace=false,behavior="smooth"}={})=>{if(!id)return;router[replace?"replace":"push"](`/#${id}`,{scroll:false});if(document.getElementById(id))scrollToSection(id,behavior)};
 const onPointerDown=event=>{if(event.pointerType==="mouse")return;const state={id:event.pointerId,x:event.clientX,y:event.clientY,active:false,dragging:false,target:event.currentTarget.dataset.section,timer:0};state.timer=window.setTimeout(()=>{if(drag.current!==state)return;state.active=true;setDragTarget(state.target)},180);drag.current=state};
 const onPointerMove=event=>{const state=drag.current;if(!state||state.id!==event.pointerId)return;const dx=event.clientX-state.x,dy=event.clientY-state.y;if(!state.dragging&&Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){clearDrag();return}if(!state.active)return;const target=itemAt(event.clientX,event.clientY)||state.target;if(target===state.target)return;state.dragging=true;state.target=target;setDragTarget(target);navigateSection(target,{replace:true,behavior:"instant"})};
 const onPointerEnd=event=>{const state=drag.current;if(!state||state.id!==event.pointerId)return;const suppress=state.active&&state.dragging;clearDrag();if(!suppress)return;event.preventDefault();suppressClick.current=true;window.setTimeout(()=>{suppressClick.current=false},0)};
 const onDockClick=event=>{if(!suppressClick.current)return;event.preventDefault();event.stopPropagation()};

 return <><header className={`navbar ${hidden?"navbar--hidden":""}`} onFocusCapture={()=>setHidden(false)}><div className="navbar-content"><Link href="/#home" className="navbar-logo-link" aria-label="Suleman Sadat — Home"><Image src={logo} alt="" className="navbar-logo" width={25} height={32}/><span className="navbar-brand">Suleman Sadat<span>ENGINEER & MAKER</span></span></Link><nav aria-label="Main navigation" className="navigation">{sections.map(([id,label])=><Link key={id} href={`/#${id}`} className={`nav-link ${active===id?"active":""}`} aria-current={active===id?"location":undefined}>{id==="portfolio"?"Portfolio":label}{id==="contact"&&<IconArrowUpRight size={14} aria-hidden="true"/>}</Link>)}<Link href="/blog" className={`nav-link ${active==="blog"?"active":""}`} aria-current={active==="blog"?"page":undefined}>Blog</Link></nav><div className="navbar-actions"><ThemeToggle/></div></div></header><nav className={`bottom-nav ${dragTarget?"is-dragging":""}`} aria-label="Bottom navigation" style={{"--active-index":Math.max(0,sections.findIndex(([id])=>id===(dragTarget||active)))}} data-has-active={sections.some(([id])=>id===(dragTarget||active))}>{sections.map(([id,label,Icon])=><Link key={id} href={`/#${id}`} data-section={id} aria-current={active===id?"location":undefined} data-drag-active={dragTarget===id||undefined} onClick={onDockClick} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={clearDrag}><Icon size={20} stroke={1.6} aria-hidden="true"/><span>{label}</span></Link>)}</nav><div className="mobile-theme-toggle"><ThemeToggle/></div></>;
}
