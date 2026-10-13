"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StudioExperience() {
  const pathname = usePathname();
  const cursor = useRef();
  const rail = useRef();
  const dragging = useRef(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (pathname === "/") return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (document.querySelector(".hero-name")) gsap.from(".hero-name > span", { y: 35, opacity: 0, stagger: .1, duration: 1, ease: "power3.out", clearProps: "all" });
      gsap.utils.toArray(".portfolio-header, .about-heading-row, .contact-header, .p2__hero, .skills-heading").forEach(element => {
        gsap.from(element, { y: 32, opacity: .25, duration: .9, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 92%", once: true }, clearProps: "all" });
      });
      gsap.utils.toArray(".project-image").forEach(element => {
        gsap.from(element, { clipPath: "inset(8% 0 0 0)", y: 18, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 94%", once: true }, clearProps: "all" });
      });
      if (document.querySelector(".mega-footer")) {
        gsap.from(".mega-footer-name", { yPercent: 24, opacity: 0, duration: 1.25, ease: "power3.out", scrollTrigger: { trigger: ".mega-footer", start: "top 88%", once: true }, clearProps: "transform,opacity" });
        gsap.from(".mega-footer-meta", { y: 14, opacity: 0, duration: .8, ease: "power2.out", scrollTrigger: { trigger: ".mega-footer", start: "top 84%", once: true }, clearProps: "transform,opacity" });
        gsap.to(".mega-footer-glow", { scale: 1.12, xPercent: 7, ease: "none", scrollTrigger: { trigger: ".mega-footer", start: "top bottom", end: "bottom 82%", scrub: 1 } });
      }
      if (matchMedia("(min-width: 900px)").matches) {
        if (document.querySelector(".hero-name")) gsap.to(".hero-name", { y: 50, scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1 } });
        if (document.querySelector(".about-photo")) gsap.fromTo(".about-photo", { rotateY: -5, y: 25 }, { rotateY: 0, y: -25, ease: "none", scrollTrigger: { trigger: ".about-editorial", start: "top bottom", end: "bottom top", scrub: 1 } });
      }
    });
    const resize = new ResizeObserver(() => ScrollTrigger.refresh());
    resize.observe(document.querySelector("main"));
    return () => { resize.disconnect(); media.revert(); };
  }, [pathname]);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1000px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const element = cursor.current;
      let magnetic = null;
      const moveX = gsap.quickTo(element, "x", { duration: .18, ease: "power3" });
      const moveY = gsap.quickTo(element, "y", { duration: .18, ease: "power3" });
      const move = event => {
        if (!(event.target instanceof Element)) return;
        element.style.opacity = "1";
        moveX(event.clientX); moveY(event.clientY);
        const target = event.target.closest("[data-cursor], a, button");
        const label = target?.dataset.cursor || (target?.matches("a") ? "View" : "");
        element.textContent = label;
        element.classList.toggle("studio-cursor--label", Boolean(label));
        const next = event.target.closest(".button-primary, .theme-toggle, .hero-work-link");
        if (magnetic && magnetic !== next) gsap.to(magnetic, { x: 0, y: 0, duration: .5, ease: "elastic.out(1,.5)" });
        magnetic = next;
        if (magnetic) {
          const rect = magnetic.getBoundingClientRect();
          gsap.to(magnetic, { x: (event.clientX - rect.left - rect.width / 2) * .12, y: (event.clientY - rect.top - rect.height / 2) * .16, duration: .3, overwrite: true });
        }
      };
      const hide = () => { element.style.opacity = "0"; };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerleave", hide);
      document.addEventListener("keydown", hide);
      window.addEventListener("blur", hide);
      return () => { document.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", hide); document.removeEventListener("keydown", hide); window.removeEventListener("blur", hide); element.style.opacity = "0"; moveX.tween.kill(); moveY.tween.kill(); if (magnetic) gsap.set(magnetic, { clearProps: "transform" }); };
    });
    return () => media.revert();
  }, [pathname]);

  useEffect(() => {
    let frame;
    const update = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.round(scrollY / max * 100) : 0);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.documentElement.classList.add("studio-scroll-ready");
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); document.documentElement.classList.remove("studio-scroll-ready"); };
  }, [pathname]);

  const seek = event => {
    const rect = rail.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    window.scrollTo({ top: ratio * (document.documentElement.scrollHeight - innerHeight), behavior: "instant" });
  };
  const onKey = event => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const positions = { Home: 0, End: max, ArrowDown: scrollY + 80, ArrowUp: scrollY - 80, PageDown: scrollY + innerHeight * .8, PageUp: scrollY - innerHeight * .8 };
    if (event.key in positions) { event.preventDefault(); window.scrollTo({ top: positions[event.key], behavior: "instant" }); }
  };
  return <>
    <div ref={cursor} className="studio-cursor" aria-hidden="true" />
    <aside className="scroll-compass" aria-label="Page position">
      <span className="scroll-percent" aria-hidden="true">{String(progress).padStart(2, "0")}</span>
      <div ref={rail} className="scroll-rail" role="scrollbar" tabIndex={0} aria-label="Page scroll progress" aria-controls="main-content" aria-orientation="vertical" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}
        onKeyDown={onKey} onPointerDown={event => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); seek(event); }} onPointerMove={event => { if (dragging.current) seek(event); }} onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }} onLostPointerCapture={() => { dragging.current = false; }}>
        <span className="scroll-thumb" style={{ top: progress + "%" }} />
      </div>
    </aside>
  </>;
}

