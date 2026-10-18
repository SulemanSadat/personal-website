"use client";
import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "./SectionLink";
import Image from "next/image";
import { assetPath } from "../lib/site-path";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconArrowDown, IconArrowUpRight, IconArrowLeft, IconArrowRight, IconBulb, IconCode, IconChartBar } from '@tabler/icons-react';
const portrait = assetPath("/assets/hero-portrait.webp");
const mobileProfile = assetPath("/assets/profile.png");
import { projects } from '../data/projects';
import Testimonials from './Testimonials';
import MobileSimpleProject from './MobileSimpleProject';
import Pricing from '../app/pages/Pricing';
import About from './About';
import Contact from './Contact';
import HireButton from './HireButton';
import { hasSeenOpeningThisSession } from '../utils/firstVisitPreloader';

gsap.registerPlugin(ScrollTrigger);
const World = lazy(() => import('./CinematicWorld'));
const viewModeKey = 'suleman-portfolio-view-mode';
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
  const [heroReady, setHeroReady] = useState(false);
  const [theme, setTheme] = useState('light');
  const [expandedProject, setExpandedProject] = useState(null);
  const cinematic = capable && !simple;
  const mobileSimple = mobile && !cinematic;
  const markHeroReady = () => {
    setHeroReady(true);
    if (document.documentElement.dataset.heroReady === 'true') return;
    document.documentElement.dataset.heroReady = 'true';
    window.dispatchEvent(new Event('hero-essential-ready'));
  };
  const decodeHero = async event => {
    try { await event.currentTarget.decode(); }
    catch { /* A loaded image can still be painted when decode() is unavailable. */ }
    markHeroReady();
  };
  const decodeMobileHero = event => {
    if (window.matchMedia('(max-width: 1099px)').matches) decodeHero(event);
  };
  const markMobileHeroReady = () => {
    if (window.matchMedia('(max-width: 1099px)').matches) markHeroReady();
  };
  const decodeDesktopHero = event => {
    if (window.matchMedia('(min-width: 1100px)').matches) decodeHero(event);
  };
  const markDesktopHeroReady = () => {
    if (window.matchMedia('(min-width: 1100px)').matches) markHeroReady();
  };
  useEffect(() => {
    document.documentElement.classList.toggle('mobile-simple-view', mobileSimple);
    return () => document.documentElement.classList.remove('mobile-simple-view');
  }, [mobileSimple]);

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
    if (capable === null || (cinematic && !heroReady)) return;
    const navigate = event => {
      if (event.detail.id !== 'portfolio' || !sceneTrigger.current) return;
      event.preventDefault();
      intro.current?.kill(); setIntroDone(true);
      const trigger = sceneTrigger.current;
      const rangeStart = mobile ? .4 : .225;
      const rangeSize = mobile ? .56 : .745;
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
  }, [capable, cinematic, heroReady, mobile]);

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
    const media = matchMedia('(max-width: 1099px)');
    const update = () => {
      setMobile(media.matches);
      try {
        const savedMode = localStorage.getItem(viewModeKey);
        setSimple(media.matches ? true : savedMode === 'simple');
      } catch { setSimple(media.matches); }
    };
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (!cinematic || !heroReady) return;
    const journeyProgress = progress.current;
    journeyProgress.onFailure = () => setSimple(true);
    let last = -1;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: {
        // Mobile uses a CSS-sticky stage inside a naturally tall section. It
        // retains the journey without ScrollTrigger pinning or touch capture.
        trigger: mobile ? stage.current.parentElement : stage.current,
        start: 'top top', end: mobile ? 'bottom bottom' : () => '+=' + innerHeight * 10,
        pin: !mobile, scrub: mobile ? .28 : .65, invalidateOnRefresh: true,
        onUpdate: self => {
          const p = self.progress;
          setHeroInert(p > (mobile ? .37 : .1));
          journeyProgress.value = p; journeyProgress.invalidate?.();
          const rangeStart = mobile ? .4 : .225;
          const rangeSize = mobile ? .56 : .745;
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
          .fromTo('.cinema-world', { opacity: 0 }, { opacity: 1, duration: .12, ease: 'none' }, .3)
          .fromTo('.tunnel-heading', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .04 }, .27)
          .to('.tunnel-heading', { opacity: 0, duration: .04 }, .36)
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
    }, [cinematic, heroReady, mobile]);

  useEffect(() => {
    if (!cinematic || introDone) return;
    if (mobile) return;
    intro.current = gsap.fromTo('.cinema-intro-veil', { opacity: 1 }, { opacity: 0, duration: 2.5, ease: 'power2.inOut', onComplete: () => setIntroDone(true) });
    return () => intro.current?.kill();
  }, [cinematic, introDone, mobile]);

  useLayoutEffect(() => {
    if (mobileSimple) return;
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
  }, [mobileSimple]);

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

  // Reveal once on entry; content stays readable if observers or animations are unavailable.
  useEffect(() => {
    if (!mobileSimple || !('IntersectionObserver' in window)) return;
    const media = matchMedia('(prefers-reduced-motion: no-preference)');
    let observer;
    const animations = new Set();
    const stop = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const start = () => {
      stop();
      if (!media.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          if (!target.animate || target.contains(document.activeElement)) return;
          const animation = target.animate([
            { opacity: .45, transform: 'translateY(14px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 520, easing: 'cubic-bezier(.22, 1, .36, 1)' });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: .08 });
      root.current.querySelectorAll('.cinema-story, .cinema-static-work > h2, .simple-project, .carousel-heading, .carousel-container, .p2__hero, .p2__card, .about-heading-row, .about-photo, .about-story > p, .skills-heading, .skills-row, .contact-header, .contact-form').forEach(element => observer.observe(element));
    };
    start();
    media.addEventListener('change', start);
    return () => { stop(); media.removeEventListener('change', start); };
  }, [mobileSimple]);

  const seekProject = index => {
    const trigger = sceneTrigger.current;
    const rangeStart = mobile ? .4 : .225;
    const rangeSize = mobile ? .56 : .745;
    if (trigger) window.scrollTo({ top: trigger.start + (rangeStart + (index + .48) / projects.length * rangeSize) * (trigger.end - trigger.start), behavior: 'instant' });
  };
  const skipIntro = () => { intro.current?.kill(); setIntroDone(true); };

  return <div ref={root} className={`cinematic-home ${cinematic ? 'is-cinematic' : 'is-simple'}`}>
    <div className="cinema-sequence" id="home">
      <span id="portfolio" className="cinema-work-anchor" />
      <section ref={stage} className="cinema-stage" aria-label="Introduction and project journey">
        {cinematic && heroReady && <div className="cinema-world"><SceneBoundary onFailure={() => setSimple(true)}><Suspense fallback={null}><World progress={progress} theme={theme} mobile={mobile} /></Suspense></SceneBoundary></div>}
        <div className="cinema-vignette" aria-hidden="true" />
        <div className="mobile-reference-hero">
          <div className="mobile-reference-availability"><i aria-hidden="true" />Available for select projects</div>
          <div className="mobile-reference-intro">
            <p>I turn ideas into digital<br />products that create<br />real impact.</p>
          </div>
          <div className="mobile-reference-dots mobile-reference-dots--top" aria-hidden="true" />
          <div className="mobile-reference-dots mobile-reference-dots--side" aria-hidden="true" />
          <div className="mobile-reference-glow" aria-hidden="true" />
          <div className="mobile-reference-portrait">
            <Image src={mobileProfile} alt="Suleman Sadat, software engineer" width={1254} height={1254} sizes="(max-width: 600px) 94vw, (max-width: 1099px) 68vw, 1px" loading={mobile ? 'eager' : 'lazy'} fetchPriority={mobile ? 'high' : 'low'} data-hero-essential onLoad={decodeMobileHero} onError={markMobileHeroReady} />
          </div>
          <div className="mobile-reference-process" aria-label="Product process: Think, Build, Scale">
            <svg className="mobile-reference-process-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M50 0 C15 14, 84 34, 52 50 C19 66, 86 84, 50 100" />
            </svg>
            <div className="mobile-reference-step">
              <span className="mobile-reference-icon"><IconBulb aria-hidden="true" /></span>
              <span><strong>Think</strong><small>Understand<br />problems</small></span>
            </div>
            <div className="mobile-reference-step">
              <span className="mobile-reference-icon"><IconCode aria-hidden="true" /></span>
              <span><strong>Build</strong><small>Design &amp;<br />develop</small></span>
            </div>
            <div className="mobile-reference-step">
              <span className="mobile-reference-icon"><IconChartBar aria-hidden="true" /></span>
              <span><strong>Scale</strong><small>Create<br />impact</small></span>
            </div>
          </div>
          <div className="mobile-reference-card">
            <div><h1>Suleman Sadat</h1><p>Software Engineer <span aria-hidden="true">·</span> Full-Stack Developer</p></div>
            <Link href="/#portfolio" className="mobile-reference-card-link" aria-label="Explore selected work"><IconArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="cinema-hero-meta"><span>INDEPENDENT SOFTWARE ENGINEER</span><span><i /> AVAILABLE FOR SELECT PROJECTS</span></div>
        <div className="cinema-halo" aria-hidden="true" />
        <h1 className="cinema-hero-name">SULEMAN<span>SADAT<span className="cinema-period">.</span></span></h1>
        <div className="cinema-portrait"><Image src={portrait} alt="Suleman Sadat standing with crossed arms in a black suit" width={1024} height={1536} sizes="(max-width: 999px) 76vw, 50vw" onLoad={decodeDesktopHero} onError={markDesktopHeroReady} /></div>
        <div className="cinema-story">
          <div className="cinema-hero-copy cinema-copy-left"><span className="cinema-kicker">HELLO, I’M SULEMAN.</span><p>Software Engineer<br />Full-Stack Developer</p></div>
          <div className="cinema-hero-copy cinema-copy-right" inert={heroInert}><span className="cinema-cross" aria-hidden="true">+</span><p className="cinema-mobile-statement">Building digital products. Bringing startups to life.</p><div className="cinema-actions"><HireButton /><Link href="/#portfolio">Explore My Work <IconArrowUpRight size={17} /></Link></div></div>
        </div>
        <div className="cinema-foot" inert={heroInert}><a href="#portfolio" onClick={cinematic ? e => { e.preventDefault(); skipIntro(); seekProject(0); } : undefined}><span className="cinema-scroll-icon"><IconArrowDown size={17} /></span> SCROLL TO EXPLORE</a><span>A JOURNEY THROUGH IDEAS, CODE & POSSIBILITY</span><span>01 — 07</span></div>
        {cinematic && <>
          <div className="tunnel-heading" aria-hidden="true"><span className="cinema-kicker">02 / SELECTED WORK</span><p>Ideas become<br /><em>real things.</em></p></div>
          <div className="tunnel-hud" hidden={active < 0}><span>SELECTED WORK / {String(active + 1).padStart(2, '0')} — {String(projects.length).padStart(2, '0')}</span><span>SCROLL TO TRAVEL</span></div>
          <div className="tunnel-projects">{projects.map((project, i) => <article key={project.id} className={`tunnel-project ${i % 2 ? 'on-left' : 'on-right'}`} hidden={active !== i}>
            <div className="tunnel-project-visual"><Image src={project.image} alt={`${project.title} project preview`} width={800} height={500} sizes="(max-width: 999px) 88vw, 1px" /></div>
            <span className="cinema-kicker">PROJECT {String(i + 1).padStart(2, '0')} / {project.category}</span><h2>{project.title}</h2><p>{project.description}</p><div className="tunnel-tech">{project.technologies.map((tech, n) => <span key={n}>{tech}</span>)}</div><div className="tunnel-links">{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">View project <IconArrowUpRight size={16} /></a>}{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}</div>
            <div className="tunnel-controls"><button onClick={() => seekProject(Math.max(0, i - 1))} disabled={i === 0} aria-label="Previous project"><IconArrowLeft size={18} /></button><span>{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><button onClick={() => seekProject(Math.min(projects.length - 1, i + 1))} disabled={i === projects.length - 1} aria-label="Next project"><IconArrowRight size={18} /></button></div>
          </article>)}</div>
          <div className="tunnel-exit" aria-hidden="true"><span className="cinema-kicker">BEYOND THE BUILD</span><p>Good work.<br /><em>Lasting relationships.</em></p></div>
          {!mobile && !introDone && <><div className="cinema-intro-veil" aria-hidden="true" /><button className="cinema-skip" onClick={skipIntro}>Skip intro ↗</button></>}
        </>}
        {capable && (!mobile || homeVisible) && <button className="cinema-mode" onClick={() => { const nextSimple = !simple; skipIntro(); setExpandedProject(null); setSimple(nextSimple); try { localStorage.setItem(viewModeKey, nextSimple ? 'simple' : '3d'); } catch {} }}>{simple ? 'Enable 3D journey' : 'Use simple view'}</button>}
      </section>
    </div>
    {!cinematic && <section className="cinema-static-work" aria-labelledby="static-work-title"><span className="cinema-kicker">02 / SELECTED WORK</span><h2 id="static-work-title">Ideas become<br /><em>real things.</em></h2><div className="cinema-static-grid">{projects.map(project => <MobileSimpleProject key={project.id} project={project} expanded={expandedProject === project.id} onToggle={() => setExpandedProject(current => current === project.id ? null : project.id)} />)}</div></section>}
    <div className="cinema-content">
      <Testimonials autoPlay={false} />
      <Pricing embedded />
      <About embedded />
      <Contact embedded />
    </div>
  </div>;
}






