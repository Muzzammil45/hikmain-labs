import { useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
}

// The cumulative distance from the top of the document, ignoring CSS transform. Elements
// inside an animated section can still be mid-transition (translateY) at the instant this
// runs, and getBoundingClientRect()/scrollIntoView() both measure the transformed position —
// landing the scroll slightly off once the animation later settles. offsetTop is a layout
// property untouched by transform, so it gives the element's true, settled position instead.
function trueOffsetTop(el) {
  let top = 0
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop
  return top
}

// Remounts with each new page (it's a child of the pathname-keyed motion.div below), so this
// runs exactly once per navigation — and, because the page transition below uses
// mode="wait", only after the previous page has fully finished animating out. useLayoutEffect
// (not useEffect) applies the scroll position before the browser paints the new page, so
// there's no visible jump as it fades in.
function ScrollOnMount({ hash }) {
  useLayoutEffect(() => {
    const target = hash && document.getElementById(hash.slice(1))
    if (!target) {
      window.scrollTo(0, 0)
      return
    }
    const scrollMarginTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
    window.scrollTo(0, trueOffsetTop(target) - scrollMarginTop)
  }, [hash])
  return null
}

export default function Layout() {
  const location = useLocation()
  const element = useOutlet()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ScrollOnMount hash={location.hash} />
            {element}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
