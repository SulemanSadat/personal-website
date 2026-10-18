import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { getPromotionState } from "../utils/promotion";
import type { PromotionConfig } from "../types/pricing";

export default function PromotionCountdown({ expiresAt }: PromotionConfig) {
  const [now, setNow] = useState<number>(() => Date.now());
  const promotion = getPromotionState(expiresAt, now);
  useEffect(() => {
    if (getPromotionState(expiresAt).status !== "active") return;
    const tick = () => setNow(Date.now());
    const interval = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => { clearInterval(interval); document.removeEventListener("visibilitychange", tick); };
  }, [expiresAt, promotion.status]);

  if (promotion.status === "unconfigured") return <div className="offer-assurance"><FiClock aria-hidden="true" /><span>One-time setup. Scope agreed upfront.</span></div>;
  if (promotion.status === "expired") return <p className="offer-ended" role="status">The promotional booking window has ended. Ask about current availability.</p>;
  return (
    <div className="offer-countdown">
      <div className="offer-countdown-heading"><FiClock aria-hidden="true" /><span>Shopify offer ends in</span></div>
      <div className="offer-clock" role="timer" aria-live="off" aria-label={`${promotion.days} days, ${promotion.hours} hours, ${promotion.minutes} minutes and ${promotion.seconds} seconds remaining`}>
        {(["days", "hours", "minutes", "seconds"] as const).map(unit => <div key={unit}><strong>{String(promotion[unit]).padStart(2, "0")}</strong><span>{unit}</span></div>)}
      </div>
      <p>Ends <time dateTime={expiresAt ?? undefined}>{new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(promotion.deadline)} UTC</time></p>
    </div>
  );
}
