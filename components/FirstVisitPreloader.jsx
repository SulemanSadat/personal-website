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
    let finished = false;
    const dismiss = () => {
      if (finished) return;
      finished = true;
      markOpeningSeenThisSession();
      document.documentElement.dataset.opening = "complete";
      frame = requestAnimationFrame(() => setVisible(false));
    };
    const hero = document.querySelector("[data-hero-essential]");
    if (document.documentElement.dataset.heroReady === "true" || (hero?.complete && hero.naturalWidth > 0)) dismiss();
    else window.addEventListener("hero-essential-ready", dismiss, { once: true });
    const failsafe = window.setTimeout(dismiss, MAX_WAIT_MS);
    return () => {
      window.removeEventListener("hero-essential-ready", dismiss);
      window.clearTimeout(failsafe);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;
  return <div className="studio-opening" role="status" aria-label="Loading portfolio">
    <span className="opening-spinner" aria-hidden="true" />
    <span className="opening-label">Loading…</span>
  </div>;
}
