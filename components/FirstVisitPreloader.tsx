"use client";
import { useEffect, useState } from "react";
import { hasSeenOpeningThisSession, markOpeningSeenThisSession } from "../utils/firstVisitPreloader";

const DESKTOP_MAX_WAIT_MS = 6500;
const MOBILE_MAX_WAIT_MS = 1600;

export default function FirstVisitPreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (hasSeenOpeningThisSession() || document.documentElement.dataset.opening === "complete") {
      document.documentElement.dataset.opening = "complete";
      const hiddenFrame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(hiddenFrame);
    }
    let frame = 0;
    let revealFrame = 0;
    let revealTimer = 0;
    let cancelled = false;
    let finished = false;
    const reveal = () => {
      if (finished) return;
      finished = true;
      markOpeningSeenThisSession();
      document.documentElement.dataset.opening = "revealing";
      frame = requestAnimationFrame(() => {
        revealFrame = requestAnimationFrame(() => {
          revealTimer = window.setTimeout(() => {
            document.documentElement.dataset.opening = "complete";
            setVisible(false);
          }, 240);
        });
      });
    };
    const revealWhenVisuallyReady = async () => {
      if (window.matchMedia("(min-width: 1100px)").matches) {
        try { await document.fonts?.ready; }
        catch { /* The fallback font is ready to render. */ }
      }
      if (!cancelled) reveal();
    };
    const hero = document.querySelector<HTMLImageElement>("[data-hero-essential]");
    if (document.documentElement.dataset.heroReady === "true" || (hero?.complete && hero.naturalWidth > 0)) revealWhenVisuallyReady();
    else window.addEventListener("hero-essential-ready", revealWhenVisuallyReady, { once: true });
    // On a constrained mobile connection, the loader should remain a short
    // transition rather than hold the page hostage while a non-text hero asset
    // decodes. The image keeps its reserved space and can finish normally.
    const maxWait = window.matchMedia("(max-width: 1099px)").matches ? MOBILE_MAX_WAIT_MS : DESKTOP_MAX_WAIT_MS;
    const failsafe = window.setTimeout(reveal, maxWait);
    return () => {
      cancelled = true;
      window.removeEventListener("hero-essential-ready", revealWhenVisuallyReady);
      window.clearTimeout(failsafe);
      window.clearTimeout(revealTimer);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(revealFrame);
    };
  }, []);

  if (!visible) return null;
  return <div className="studio-opening" role="status" aria-live="polite" aria-busy="true" aria-label="Loading portfolio">
    <span className="sr-only">Preparing portfolio…</span>
    <div className="opening-shell" aria-hidden="true">
      <header className="opening-nav">
        <div className="opening-brand">
          <span className="opening-brand-mark" />
          <span className="opening-brand-copy"><i /><i /></span>
        </div>
        <div className="opening-nav-links"><i /><i /><i /><i /><i /></div>
        <span className="opening-nav-action" />
      </header>

      <main className="opening-hero">
        <div className="opening-meta"><span /><span /></div>
        <div className="opening-title" aria-hidden="true"><span /><span /></div>

        <div className="opening-scene" aria-hidden="true">
          <span className="opening-orbit opening-orbit--outer" />
          <span className="opening-orbit opening-orbit--inner" />
          <span className="opening-scene-node opening-scene-node--one" />
          <span className="opening-scene-node opening-scene-node--two" />
        </div>
        <div className="opening-portrait" aria-hidden="true" />

        <div className="opening-copy opening-copy--left"><span className="opening-kicker" /><span /><span /></div>
        <div className="opening-copy opening-copy--right"><b /><span /><span /><span className="opening-cta" /></div>
        <div className="opening-foot"><span /><span /><span /></div>

        <div className="opening-mobile-intro"><span /><span /><span /></div>
        <div className="opening-mobile-process">
          <div><i /><span /></div><div><i /><span /></div><div><i /><span /></div>
        </div>
        <div className="opening-mobile-card"><div><span /><span /></div><i /></div>
        <div className="opening-mobile-dock"><i /><i /><i /><i /><i /></div>
      </main>
    </div>
  </div>;
}
