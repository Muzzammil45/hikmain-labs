import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import useReveal from '../hooks/useReveal'

// useLayoutEffect warns during server rendering; it only matters in the browser.
const useIsoLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect

/** Scrolls to the top on a new page, or to the #section named in the URL. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useIsoLayoutEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) {
      target.scrollIntoView({ block: 'start' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  useReveal(pathname)

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <ScrollManager />
      <Header />
      <main id="main" className="flex-1" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
