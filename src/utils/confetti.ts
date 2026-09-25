import confetti from 'canvas-confetti';

/**
 * Fires a short confetti burst from the top-centre of the viewport.
 * Silently skips if the user prefers reduced motion.
 */
export function fireConfetti(): void {
  if (typeof window === 'undefined') return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  console.log('Confetti fired!');
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { x: 0.5, y: 0.1 }, // top-centre of viewport
    ticks: 160,                    // ~1.8s at 60fps before particles fade
    gravity: 1.2,
    scalar: 0.85,
    colors: ['#6B38D4', '#A78BFA', '#C4B5FD', '#FCD34D', '#34D399', '#60A5FA'],
    zIndex: 99999,
  });
}
