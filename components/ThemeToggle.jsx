"use client";
import { useEffect, useState } from "react";
import { IconMoon as FiMoon, IconSun as FiSun } from "@tabler/icons-react";
const storageKey="suleman-portfolio-theme";
export default function ThemeToggle({className=""}){
 const[theme,setTheme]=useState("light");
 useEffect(()=>{
  const sync=()=>{const next=localStorage.getItem(storageKey)==="dark"?"dark":"light";setTheme(next);document.documentElement.dataset.theme=next;document.querySelector('meta[name="theme-color"]')?.setAttribute("content",next==="light"?"#FFFFFF":"#000000")};
  sync();window.addEventListener("storage",sync);window.addEventListener("portfolio-theme-change",sync);
  return()=>{window.removeEventListener("storage",sync);window.removeEventListener("portfolio-theme-change",sync)};
 },[]);
 const toggle=()=>{const next=theme==="dark"?"light":"dark";try{localStorage.setItem(storageKey,next)}catch{}document.documentElement.dataset.theme=next;document.querySelector('meta[name="theme-color"]')?.setAttribute("content",next==="light"?"#FFFFFF":"#000000");setTheme(next);window.dispatchEvent(new Event("portfolio-theme-change"))};
 return <button type="button" className={`theme-toggle ${className}`.trim()} onClick={toggle} aria-label={`Switch to ${theme==="dark"?"light":"dark"} mode`} title={`Switch to ${theme==="dark"?"light":"dark"} mode`}>{theme==="dark"?<FiSun aria-hidden="true"/>:<FiMoon aria-hidden="true"/>}</button>
}

