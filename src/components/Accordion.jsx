import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'

/**
 * Accessible accordion: each item is a real <button> (aria-expanded/aria-controls) wrapped
 * in a heading, with its panel as a labelled region. Items open independently of each other.
 *   items: [{ id, question, answer }]
 *   defaultOpenIds: ids that start expanded
 */
export default function Accordion({ items, defaultOpenIds = [], headingLevel: Heading = 'h3', className = '' }) {
  const [openIds, setOpenIds] = useState(() => new Set(defaultOpenIds))

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <motion.div variants={fadeUp} className={`divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white ${className}`}>
      {items.map((item) => {
        const open = openIds.has(item.id)
        const buttonId = `accordion-trigger-${item.id}`
        const panelId = `accordion-panel-${item.id}`
        return (
          <div key={item.id}>
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-action sm:px-6"
              >
                <span>{item.question}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 shrink-0 text-accent-dark transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="px-5 pb-5 leading-relaxed text-black/75 sm:px-6">
              {item.answer}
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}
