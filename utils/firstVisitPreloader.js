const SESSION_KEY = 'suleman-studio-opening-v1';

export function hasSeenOpeningThisSession() {
  try { return sessionStorage.getItem(SESSION_KEY) === 'seen'; }
  catch { return true; }
}

export function markOpeningSeenThisSession() {
  try { sessionStorage.setItem(SESSION_KEY, 'seen'); }
  catch { /* The opening can still run for this page view. */ }
}
