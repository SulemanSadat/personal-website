export type PromotionState =
  | { status: "unconfigured" }
  | { status: "expired"; deadline: number }
  | { status: "active"; deadline: number; days: number; hours: number; minutes: number; seconds: number };

// Only explicit, fixed dates are accepted; a browser visit never starts an offer.
export function getPromotionState(expiresAt: string | null | undefined, now = Date.now()): PromotionState {
  if (typeof expiresAt !== "string" || !/T.*(?:Z|[+-]\d{2}:\d{2})$/i.test(expiresAt)) return { status: "unconfigured" };
  const deadline = Date.parse(expiresAt);
  if (!Number.isFinite(deadline)) return { status: "unconfigured" };
  const seconds = Math.max(0, Math.ceil((deadline - now) / 1000));
  if (seconds === 0) return { status: "expired", deadline };
  return { status: "active", deadline, days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60 };
}
