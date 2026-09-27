/**
 * Shared Framer Motion variants, used by the handful of components almost every page is built
 * from (Section, SectionHeading, Card, PageHero) so that adding motion there animates the
 * whole site consistently, without editing each page individually.
 */

// A single element fading in and sliding up slightly. Used both standalone and as a stagger
// child: when a variant-bearing ancestor is animating, a child with only `variants` (no own
// initial/animate) inherits and orchestrates from that ancestor automatically.
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
}

// Wraps a group of fadeUp children (a heading, a row of cards, ...) so they reveal one after
// another, 0.1s apart, instead of all at once.
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// Same shape, for content that should animate as soon as the page appears (a hero) rather
// than waiting for a scroll-triggered viewport check.
export const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

// Default viewport threshold for the scroll-triggered reveals: once, a little before a
// section is fully in view, so it doesn't wait for the very last pixel to scroll past.
export const revealViewport = { once: true, amount: 0.15 }
