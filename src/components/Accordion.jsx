import { useState } from 'react'
import Icon from './Icon'

/**
 * Accessible accordion: each question is a real <button> (aria-expanded/aria-controls)
 * inside a heading, with its answer as a labelled region. Answers slide open smoothly
 * and stay in the HTML when closed, so search engines and in-page search can read them.
 *   items: [{ id, question, answer }]
 */
export default function Accordion({ items, defaultOpenIds = [], headingLevel: Heading = 'h3', className = '' }) {
  const [openIds, setOpenIds] = useState(() => new Set(defaultOpenIds))

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {items.map((item) => {
        const open = openIds.has(item.id)
        const buttonId = `faq-trigger-${item.id}`
        const panelId = `faq-panel-${item.id}`
        return (
          <div
            key={item.id}
            className={`rounded-2xl bg-navy transition-shadow duration-300 ${
              open ? 'shadow-[inset_0_0_0_1px_var(--color-teal)]' : 'shadow-[inset_0_0_0_1px_var(--color-line)]'
            }`}
          >
            <Heading className="m-0 font-sans text-base tracking-normal">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-cloud sm:px-6"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ease-out-soft ${
                    open ? 'rotate-45 bg-teal text-teal-ink' : 'bg-teal/10 text-teal'
                  }`}
                >
                  <Icon name="plus" size={16} strokeWidth={2.4} />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-400 ease-out-soft"
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
              inert={open ? undefined : true}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed text-mist sm:px-6">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
