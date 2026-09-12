import { useState, useEffect } from 'react';
import type { Transition, Variants } from 'motion/react';

// ============================================================================
// GLOBAL EDITORIAL MOTION SYSTEM — BIMA RADEN PORTFOLIO
// Easing: cubic-bezier(0.22, 1, 0.36, 1) — editorial, human, smooth, lightweight
// ============================================================================

export const EDITORIAL_EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const TIMING = {
  fast: 0.2,       // 200ms (buttons, badges, pills, arrows)
  normal: 0.3,     // 300ms (hover states, nav pill transition, mobile menu)
  reveal: 0.6,     // 600ms (scroll reveal, section headings, project items)
  large: 0.75,     // 750ms (hero large typography clip reveal, poster entrance)
} as const;

// Transition presets
export const TRANSITIONS = {
  fast: {
    duration: TIMING.fast,
    ease: EDITORIAL_EASING,
  } as Transition,
  normal: {
    duration: TIMING.normal,
    ease: EDITORIAL_EASING,
  } as Transition,
  reveal: {
    duration: TIMING.reveal,
    ease: EDITORIAL_EASING,
  } as Transition,
  large: {
    duration: TIMING.large,
    ease: EDITORIAL_EASING,
  } as Transition,
};

// React hook to observe prefers-reduced-motion
export function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return reducedMotion;
}

// ============================================================================
// PAGE TRANSITION VARIANTS (Fast, lightweight: ~350ms, subconscious feel)
// ============================================================================
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: EDITORIAL_EASING,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.18,
      ease: 'easeOut',
    },
  },
};

// ============================================================================
// SCROLL REVEAL UTILITIES (Once, when 15-20% enters viewport)
// ============================================================================
export const scrollRevealProps = (delay = 0, distance = 20) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: {
    duration: TIMING.reveal,
    delay,
    ease: EDITORIAL_EASING,
  },
});

export const scrollRevealImageProps = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.98 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: {
    duration: 0.65,
    delay,
    ease: EDITORIAL_EASING,
  },
});

// Staggered container variants (max ~250ms total stagger)
export const staggerContainer = (stagger = 0.07, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren,
      staggerChildren: stagger,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.reveal,
      ease: EDITORIAL_EASING,
    },
  },
};

// Subtle button interactions (hover: -2px, active: scale 0.98)
export const editorialButtonMotion = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.98 },
  transition: {
    duration: TIMING.fast,
    ease: EDITORIAL_EASING,
  },
};
