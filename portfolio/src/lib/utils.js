/**
 * Standard utility function for combining class names
 */
export function cn(...inputs) {
  return inputs.flat().filter(Boolean).join(' ');
}

