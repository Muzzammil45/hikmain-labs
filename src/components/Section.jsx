import { motion } from 'framer-motion'
import { fadeUp, revealViewport, staggerContainer } from '../lib/motion'

const tones = {
  white: 'bg-white text-black',
  surface: 'bg-surface text-black',
  dark: 'bg-primary text-white',
}

// Orchestrates the reveal for everything inside it: fires once the section scrolls into view,
// then staggers any direct or nested motion children (SectionHeading, Card, ...) 0.1s apart.
export default function Section({ tone = 'white', className = '', children, id }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
      // scroll-mt keeps anchor targets clear of the sticky header
      className={`${tones[tone]} scroll-mt-16 py-14 sm:py-20 ${className}`}
    >
      <div className="container-page">{children}</div>
    </motion.section>
  )
}

export function SectionHeading({ eyebrow, title, intro, tone = 'white', className = '' }) {
  const dark = tone === 'dark'
  return (
    <motion.div variants={fadeUp} className={`max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`text-sm font-semibold uppercase tracking-wider ${dark ? 'text-teal-300' : 'text-accent-dark'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-2xl font-bold sm:text-3xl ${dark ? '!text-white' : ''}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-white/85' : 'text-black/75'}`}>{intro}</p>}
    </motion.div>
  )
}
