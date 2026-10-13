"use client";
import { useEffect, useState } from "react";
import { hasSeenOpeningThisSession, markOpeningSeenThisSession } from "../utils/firstVisitPreloader";

const DISPLAY_MS = 520;

export default function FirstVisitPreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (hasSeenOpeningThisSession() || document.documentElement.dataset.opening === "complete") {
      document.documentElement.dataset.opening = "complete";
      const hiddenFrame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(hiddenFrame);
    }
    markOpeningSeenThisSession();
    const started = performance.now();
    let timer;
    let frame;
    const dismiss = () => {
      timer = window.setTimeout(() => {
        document.documentElement.dataset.opening = "complete";
        frame = requestAnimationFrame(() => setVisible(false));
      }, Math.max(0, DISPLAY_MS - (performance.now() - started)));
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", dismiss, { once: true });
    else dismiss();
    const failsafe = window.setTimeout(() => {
      document.documentElement.dataset.opening = "complete";
      setVisible(false);
    }, 1400);
    return () => {
      document.removeEventListener("DOMContentLoaded", dismiss);
      window.clearTimeout(timer);
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
