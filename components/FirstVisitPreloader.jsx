"use client";
import { useEffect, useState } from "react";
import { hasSeenOpeningThisSession, markOpeningSeenThisSession } from "../utils/firstVisitPreloader";

const MAX_WAIT_MS = 6500;

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
      try { await document.fonts?.ready; }
      catch { /* The fallback font is ready to render. */ }
      if (!cancelled) reveal();
    };
    const hero = document.querySelector("[data-hero-essential]");
    if (document.documentElement.dataset.heroReady === "true" || (hero?.complete && hero.naturalWidth > 0)) revealWhenVisuallyReady();
    else window.addEventListener("hero-essential-ready", revealWhenVisuallyReady, { once: true });
    const failsafe = window.setTimeout(reveal, MAX_WAIT_MS);
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
  return <div className="studio-opening" role="status" aria-label="Loading portfolio">
    <span className="opening-spinner" aria-hidden="true" />
    <span className="opening-label">Loading…</span>
  </div>;
}
