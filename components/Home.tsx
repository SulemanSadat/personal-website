"use client";
import { lazy, Suspense } from "react";
import Link from "next/link";
import { IconArrowDown, IconArrowUpRight } from "@tabler/icons-react";
import HireButton from "./HireButton";

const PaperFlight = lazy(() => import("./PaperFlight"));

export default function Home() {
  return (
    <section className="studio-hero" id="home" aria-labelledby="home-title">
      <div className="site-container">
        <div className="hero-topline"><span>INDEPENDENT MIND. THOUGHTFUL CODE.</span><span className="open-to-work"><i aria-hidden="true" />Available for select projects</span></div>
        <div className="hero-composition">
          <div className="hero-editorial">
            <p className="hero-greeting">Hello, I’m</p>
            <h1 id="home-title" className="hero-name"><span>Suleman</span><span>Sadat<span className="name-period">.</span></span></h1>
            <div className="hero-introduction">
              <p className="hero-role">Software Engineer <span aria-hidden="true">/</span><br />Full-Stack Developer</p>
              <p className="hero-description">Building digital products. Bringing startups to life.</p>
              <div className="hero-actions"><HireButton /><Link href="/portfolio" className="hero-work-link">Explore My Work <IconArrowUpRight size={18} aria-hidden="true" /></Link></div>
            </div>
          </div>
          <figure className="hero-art" aria-label="Ideas taking flight: an interactive study of folded paper birds">
            <div className="flight-halo" aria-hidden="true" />
            <svg className="flight-path" viewBox="0 0 600 600" fill="none" aria-hidden="true"><path d="M90 565C-30 374 466 449 397 267C353 152 146 206 202 291C265 386 535 244 545 45" /><circle cx="545" cy="45" r="4" /></svg>
            <span className="art-index" aria-hidden="true">FIG. 01 — A STUDY IN POSSIBILITY</span>
            <Suspense fallback={<div className="flight-loading" aria-hidden="true">↗</div>}><PaperFlight /></Suspense>
            <figcaption><span>Ideas, taking flight.</span><span>IMAGINATION → REALITY</span></figcaption>
          </figure>
        </div>
        <div className="hero-footnote"><a href="#portfolio"><span className="scroll-circle"><IconArrowDown size={17} aria-hidden="true" /></span>Discover selected work</a><span className="hero-edition">WEB APPLICATIONS & AUTOMATION<br /><span>CRAFTED WITH CARE / SULEMAN SADAT</span></span></div>
      </div>
    </section>
  );
}

