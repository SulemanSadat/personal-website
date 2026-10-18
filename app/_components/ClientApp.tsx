"use client";
import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { Toaster } from "react-hot-toast";
import { scrollToSection } from "../../utils/sectionNavigation";
import Footer from "../../components/Footer";
import ContextMenu from "../../components/ContextMenu";
import StudioExperience from "../../components/StudioExperience";
import StoreProvider from "./StoreProvider";
function RoutedSite({ children }: { children: React.ReactNode }){
 const pathname=usePathname();const searchParams=useSearchParams();const searchKey=searchParams.toString();const previousPath=useRef(pathname);const isHome=pathname==="/";const isNotFound=!["/","/courses","/blog","/about","/portfolio","/pricing","/contact"].includes(pathname);
 useEffect(()=>{document.documentElement.classList.toggle("is-homepage",isHome);return()=>document.documentElement.classList.remove("is-homepage")},[isHome]);
 useEffect(()=>{document.documentElement.dataset.hydrated="true";return()=>{delete document.documentElement.dataset.hydrated}},[]);
 useEffect(()=>{
  const routeChanged=previousPath.current!==pathname;previousPath.current=pathname;let frame=0;
  const navigate=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const hash=window.location.hash;const id=hash.slice(1);const target=id?document.getElementById(id):null;if(target){if(document.documentElement.dataset.sectionNavigation===id){delete document.documentElement.dataset.sectionNavigation;return;}scrollToSection(id,routeChanged?"instant":"smooth");}else if(!hash){window.scrollTo({top:0,behavior:"instant"});if(routeChanged)document.getElementById("main-content")?.focus({preventScroll:true})}})};
  window.addEventListener("hashchange",navigate);window.addEventListener("popstate",navigate);window.addEventListener("homepage-ready",navigate);
  if(!isHome||document.querySelector('[data-home-ready="true"]'))navigate();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener("hashchange",navigate);window.removeEventListener("popstate",navigate);window.removeEventListener("homepage-ready",navigate)}
 },[pathname,isHome,searchKey]);
 return <div className={`site-shell ${isNotFound?"is-notfound":""}`}><a className="skip-link" href="#main-content">Skip to content</a><Navbar/><main className={`site-main ${isNotFound?"site-main--notfound":""}`} id="main-content" tabIndex={-1}><div className="route-content"><Suspense fallback={null}>{children}</Suspense></div></main>{!isNotFound&&<Footer/>}<ContextMenu/><StudioExperience/><Toaster position="top-center" toastOptions={{duration:3500,style:{background:"var(--surface)",color:"var(--ink)",border:"1px solid var(--line)",borderRadius:"12px"}}}/></div>;
}
export default function ClientApp({ children }: { children: React.ReactNode }){return <Suspense fallback={null}><StoreProvider><RoutedSite>{children}</RoutedSite></StoreProvider></Suspense>}
