/**
 * Standard utility function for combining class names
 */
export function cn(...inputs) {
  return inputs.flat().filter(Boolean).join(' ');
}

export function getScrollBehavior() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
}

