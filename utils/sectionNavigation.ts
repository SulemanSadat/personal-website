export const legacySections = {
  '/portfolio': 'portfolio', '/pricing': 'pricing', '/about': 'about', '/contact': 'contact',
} as const;

export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth'): void {
  const target = document.getElementById(id);
  if (!target) return;
  const event = new CustomEvent<{ id: string; behavior: ScrollBehavior }>('section-navigation', { cancelable: true, detail: { id, behavior } });
  // The pinned project scene supplies its exact scroll position.
  if (!window.dispatchEvent(event)) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduced ? 'instant' : behavior, block: 'start' });
}
