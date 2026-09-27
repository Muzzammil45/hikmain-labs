import { motion } from 'framer-motion'
import Pattern from './Pattern'
import { fadeUp, heroStagger } from '../lib/motion'

/** Compact dark hero used at the top of inner pages. Renders the page's single h1. */
export default function PageHero({ eyebrow, title, intro, children }) {
  return (
    <div className="relative overflow-hidden bg-primary text-white">
      <Pattern tone="dark" className="absolute -right-16 top-0 h-full w-[34rem] opacity-70" />
      {/* Animates on mount (not scroll-triggered): the hero is always visible immediately, so
          its reveal is the page's first "premium" moment, timed with the page transition. */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroStagger}
        className="container-page relative py-14 sm:py-20"
      >
        {eyebrow && (
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-wider text-teal-300">
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          variants={fadeUp}
          className={`max-w-3xl text-3xl font-bold !text-white sm:text-4xl lg:text-5xl ${eyebrow ? 'mt-2' : ''}`}
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p variants={fadeUp} className="mt-5 max-w-3xl text-lg leading-relaxed text-white/85">
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div variants={fadeUp} className="mt-8">
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
