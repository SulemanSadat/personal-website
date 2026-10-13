"use client";
import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "./SectionLink";
import Image from "next/image";
import { assetPath } from "../lib/site-path";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconArrowDown, IconArrowUpRight, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
const portrait = assetPath("/assets/Confident Tech Founder in Black Outfit.png");
import { projects } from '../data/projects';
import Testimonials from './Testimonials';
import Pricing from '../app/pages/Pricing';
import About from './About';
import Contact from './Contact';
import HireButton from './HireButton';
import { hasSeenOpeningThisSession } from '../utils/firstVisitPreloader';

gsap.registerPlugin(ScrollTrigger);
const World = lazy(() => import('./CinematicWorld'));
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function CinematicHome() {
  const root = useRef(null);
  const stage = useRef(null);
  const intro = useRef(null);
  const sceneTrigger = useRef(null);
  const progress = useRef({ value: 0 });
  const [capable, setCapable] = useState(null);
  const [simple, setSimple] = useState(false);
  const [introDone, setIntroDone] = useState(true);
  const [active, setActive] = useState(-1);
  const [heroInert, setHeroInert] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [homeVisible, setHomeVisible] = useState(true);
  const [theme, setTheme] = useState('dark');
  const cinematic = capable && !simple;
  useEffect(() => {
    const update = () => setHomeVisible(window.scrollY < window.innerHeight * .6);
    const observer = new IntersectionObserver(update);
    observer.observe(stage.current);
    window.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!hasSeenOpeningThisSession()) setIntroDone(false);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (capable === null) return;
    const navigate = event => {
      if (event.detail.id !== 'portfolio' || !sceneTrigger.current) return;
      event.preventDefault();
      intro.current?.kill(); setIntroDone(true);
      const trigger = sceneTrigger.current;
      const rangeStart = mobile ? .34 : .225;
      const rangeSize = mobile ? .62 : .745;
      window.scrollTo({ top: trigger.start + (rangeStart + .48 / projects.length * rangeSize) * (trigger.end - trigger.start), behavior: event.detail.behavior });
    };
    window.addEventListener('section-navigation', navigate);
    const homeRoot = root.current;
    let frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      homeRoot?.setAttribute('data-home-ready', 'true');
      window.dispatchEvent(new Event('homepage-ready'));
    });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('section-navigation', navigate); homeRoot?.removeAttribute('data-home-ready'); };
  }, [capable, cinematic, mobile]);

  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    const frame = requestAnimationFrame(sync);
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => {
      let supported = false;
      try { const canvas = document.createElement('canvas'); const gl = canvas.getContext('webgl2'); supported = Boolean(gl); gl?.getExtension('WEBGL_lose_context')?.loseContext(); } catch { /* Native content remains available. */ }
      setCapable(media.matches && supported);
    };
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const media = matchMedia('(max-width: 999px)');
    const update = () => setMobile(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (!cinematic) return;
    const journeyProgress = progress.current;
    journeyProgress.onFailure = () => setSimple(true);
    let last = -1;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: {
        // Mobile uses a CSS-sticky stage inside a naturally tall section. It
        // retains the journey without ScrollTrigger pinning or touch capture.
        trigger: mobile ? stage.current.parentElement : stage.current,
        start: 'top top', end: mobile ? 'bottom bottom' : () => '+=' + innerHeight * 10,
        pin: !mobile, scrub: mobile ? .35 : .65, invalidateOnRefresh: true,
        onUpdate: self => {
          const p = self.progress;
          setHeroInert(p > (mobile ? .37 : .1));
          journeyProgress.value = p; journeyProgress.invalidate?.();
          const rangeStart = mobile ? .34 : .225;
          const rangeSize = mobile ? .62 : .745;
          const next = p < rangeStart || p > .97 ? -1 : Math.min(projects.length - 1, Math.floor((p - rangeStart) / rangeSize * projects.length));
          if (last !== next) { last = next; setActive(next); }
          root.current?.style.setProperty('--journey-progress', p);
        },
      }});
      sceneTrigger.current = timeline.scrollTrigger;
      if (mobile) {
        timeline.to('.cinema-hero-name', { scale: .82, yPercent: -24, opacity: 0, duration: .28, ease: 'none' }, .04)
          .to('.cinema-portrait', { scale: .78, yPercent: -10, opacity: 0, duration: .3, ease: 'none' }, .06)
          .to('.cinema-copy-left, .cinema-copy-right, .cinema-hero-meta', { opacity: 0, y: -16, duration: .08, ease: 'none' }, .25)
          .to('.cinema-halo', { scale: .4, opacity: 0, duration: .22, ease: 'none' }, 0)
          .fromTo('.cinema-world', { opacity: 0 }, { opacity: 1, duration: .14, ease: 'none' }, .29)
          .fromTo('.tunnel-heading', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .035 }, .27)
          .to('.tunnel-heading', { opacity: 0, duration: .035 }, .305)
          .to('.cinema-world', { opacity: 0, duration: .04 }, .96)
          .fromTo('.tunnel-exit', { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .06 }, .94);
      } else timeline.to('.cinema-hero-name', { scale: .67, y: -90, opacity: 0, duration: .19, ease: 'none' }, 0)
        .to('.cinema-portrait', { scale: .55, yPercent: -9, opacity: 0, duration: .2, ease: 'none' }, .025)
        .to('.cinema-hero-copy, .cinema-hero-meta, .cinema-foot', { opacity: 0, y: -35, duration: .08, ease: 'none' }, 0)
        .to('.cinema-halo', { scale: .4, opacity: 0, duration: .22, ease: 'none' }, 0)
        .fromTo('.cinema-world', { opacity: 0 }, { opacity: 1, duration: .2, ease: 'none' }, .035)
        .fromTo('.tunnel-heading', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: .035 }, .17)
        .to('.tunnel-heading', { opacity: 0, duration: .02 }, .205)
        .to('.cinema-world', { opacity: 0, duration: .04 }, .96)
        .fromTo('.tunnel-exit', { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .06 }, .94);
    }, root);
    return () => { context.revert(); sceneTrigger.current = null; journeyProgress.value = 0; setHeroInert(false); };
    }, [cinematic, mobile]);

  useEffect(() => {
    if (!cinematic || introDone) return;
    if (mobile) return;
    intro.current = gsap.fromTo('.cinema-intro-veil', { opacity: 1 }, { opacity: 0, duration: 2.5, ease: 'power2.inOut', onComplete: () => setIntroDone(true) });
    return () => intro.current?.kill();
  }, [cinematic, introDone, mobile]);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray('.cinema-content .testimonial-card, .cinema-content .p2__grid, .cinema-content .about-photo, .cinema-content .skills-row').forEach((element, index) => {
          gsap.fromTo(element, { y: 65, rotateX: 5, rotateY: index % 2 ? -3 : 3, z: -70 }, { y: 0, rotateX: 0, rotateY: 0, z: 0, ease: 'none', scrollTrigger: { trigger: element, start: 'top 95%', end: 'top 42%', scrub: true } });
        });
        gsap.utils.toArray('.cinema-content .about-story > p').forEach(element => {
          gsap.fromTo(element, { x: 25, opacity: .4 }, { x: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: element, start: 'top 95%', end: 'top 65%', scrub: true } });
        });
        gsap.fromTo('.mega-footer-name', { yPercent: 25, scale: .9 }, { yPercent: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: '.mega-footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });
      }, document.querySelector('.site-shell'));
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    let frame;
    let disposed = false;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh(); });
    };
    const content = root.current?.querySelector('.cinema-content');
    if (!content) return undefined;
    const observer = new ResizeObserver(refresh);
    observer.observe(content);
    document.fonts.ready.then(() => { if (!disposed) refresh(); });
    return () => { disposed = true; observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  const seekProject = index => {
    const trigger = sceneTrigger.current;
    const rangeStart = mobile ? .34 : .225;
    const rangeSize = mobile ? .62 : .745;
    if (trigger) window.scrollTo({ top: trigger.start + (rangeStart + (index + .48) / projects.length * rangeSize) * (trigger.end - trigger.start), behavior: 'instant' });
  };
  const skipIntro = () => { intro.current?.kill(); setIntroDone(true); };

  return <div ref={root} className={`cinematic-home ${cinematic ? 'is-cinematic' : 'is-simple'}`}>
    <div className="cinema-sequence" id="home">
      <span id="portfolio" className="cinema-work-anchor" />
      <section ref={stage} className="cinema-stage" aria-label="Introduction and project journey">
        {cinematic && <div className="cinema-world"><SceneBoundary onFailure={() => setSimple(true)}><Suspense fallback={null}><World progress={progress} theme={theme} mobile={mobile} /></Suspense></SceneBoundary></div>}
        <div className="cinema-vignette" aria-hidden="true" />
        <div className="cinema-hero-meta"><span>INDEPENDENT SOFTWARE ENGINEER</span><span><i /> AVAILABLE FOR SELECT PROJECTS</span></div>
        <div className="cinema-halo" aria-hidden="true" />
        <h1 className="cinema-hero-name">SULEMAN<span>SADAT<span className="cinema-period">.</span></span></h1>
        <div className="cinema-portrait"><Image src={portrait} alt="Suleman Sadat standing with crossed arms in a black suit" width={1024} height={1536} priority /></div>
        <div className="cinema-story">
          <div className="cinema-hero-copy cinema-copy-left"><span className="cinema-kicker">HELLO, I’M SULEMAN.</span><p>Software Engineer<br />Full-Stack Developer</p></div>
          <div className="cinema-hero-copy cinema-copy-right" inert={heroInert}><span className="cinema-cross" aria-hidden="true">+</span><p className="cinema-mobile-statement">Building digital products. Bringing startups to life.</p><div className="cinema-actions"><HireButton /><Link href="/#portfolio">Explore My Work <IconArrowUpRight size={17} /></Link></div></div>
        </div>
        <div className="cinema-foot" inert={heroInert}><a href="#portfolio" onClick={cinematic ? e => { e.preventDefault(); skipIntro(); seekProject(0); } : undefined}><span className="cinema-scroll-icon"><IconArrowDown size={17} /></span> SCROLL TO EXPLORE</a><span>A JOURNEY THROUGH IDEAS, CODE & POSSIBILITY</span><span>01 — 07</span></div>
        {cinematic && <>
          <div className="tunnel-heading" aria-hidden="true"><span className="cinema-kicker">02 / SELECTED WORK</span><p>Ideas become<br /><em>real things.</em></p></div>
          <div className="tunnel-hud" hidden={active < 0}><span>SELECTED WORK / {String(active + 1).padStart(2, '0')} — {String(projects.length).padStart(2, '0')}</span><span>SCROLL TO TRAVEL</span></div>
          <div className="tunnel-projects">{projects.map((project, i) => <article key={project.id} className={`tunnel-project ${i % 2 ? 'on-left' : 'on-right'}`} hidden={active !== i}>
            <span className="cinema-kicker">PROJECT {String(i + 1).padStart(2, '0')} / {project.category}</span><h2>{project.title}</h2><p>{project.description}</p><div className="tunnel-tech">{project.technologies.map((tech, n) => <span key={n}>{tech}</span>)}</div><div className="tunnel-links">{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">View project <IconArrowUpRight size={16} /></a>}{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}</div>
            <div className="tunnel-controls"><button onClick={() => seekProject(Math.max(0, i - 1))} disabled={i === 0} aria-label="Previous project"><IconArrowLeft size={18} /></button><span>{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><button onClick={() => seekProject(Math.min(projects.length - 1, i + 1))} disabled={i === projects.length - 1} aria-label="Next project"><IconArrowRight size={18} /></button></div>
          </article>)}</div>
          <div className="tunnel-exit" aria-hidden="true"><span className="cinema-kicker">BEYOND THE BUILD</span><p>Good work.<br /><em>Lasting relationships.</em></p></div>
          {!mobile && !introDone && <><div className="cinema-intro-veil" aria-hidden="true" /><button className="cinema-skip" onClick={skipIntro}>Skip intro ↗</button></>}
        </>}
        {capable && (!mobile || homeVisible) && <button className="cinema-mode" onClick={() => { skipIntro(); setSimple(!simple); }}>{simple ? 'Enable 3D journey' : 'Use simple view'}</button>}
      </section>
    </div>
    {!cinematic && <section className="cinema-static-work" aria-labelledby="static-work-title"><span className="cinema-kicker">02 / SELECTED WORK</span><h2 id="static-work-title">Ideas become<br /><em>real things.</em></h2><div className="cinema-static-grid">{projects.map((project, i) => <article key={project.id}><a href={project.live || project.github} target="_blank" rel="noopener noreferrer"><Image src={project.image} alt={project.title} loading="lazy" width={800} height={500} /></a><span className="cinema-kicker">{String(i + 1).padStart(2, '0')} / {project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tunnel-tech">{project.technologies.map((tech, n) => <span key={n}>{tech}</span>)}</div><div className="tunnel-links"><a href={project.live} target="_blank" rel="noopener noreferrer">View project ↗</a>{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}</div></article>)}</div></section>}
    <div className="cinema-content">
      <Testimonials autoPlay={false} />
      <Pricing embedded />
      <About embedded />
      <Contact embedded />
    </div>
  </div>;
}






