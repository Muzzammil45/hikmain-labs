import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import Logo from './Logo'

export default function Header() {
  // The mobile menu is "open" only for the page it was opened on, so it closes itself on navigation
  const { pathname } = useLocation()
  const [openPath, setOpenPath] = useState(null)
  const open = openPath === pathname
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-white/15 text-white' : 'text-white/85 hover:bg-white/10 hover:text-white'
    }`

  return (
    <header
      className={`sticky top-0 z-50 bg-primary transition-shadow duration-200 ${
        scrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-primary"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 bg-primary lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {site.nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-3 text-base font-medium ${
                      isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
