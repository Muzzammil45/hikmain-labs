import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import Logo from './Logo'
import Button from './Button'
import Icon from './Icon'

// Home is reached through the logo and Contact through the call-to-action button,
// so the desktop bar lists the pages in between. The mobile menu lists everything.
const desktopNav = site.nav.filter((item) => item.to !== '/' && item.to !== '/contact')

export default function Header() {
  const { pathname } = useLocation()
  // The menu is "open" only for the page it was opened on, so it closes itself on navigation.
  const [openPath, setOpenPath] = useState(null)
  const open = openPath === pathname
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpenPath(null)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? 'bg-midnight/80 shadow-[0_1px_0_var(--color-royal)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-cloud focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {desktopNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative py-3 text-[15px] no-underline transition-colors ${
                  isActive ? 'text-cloud' : 'text-mist hover:text-cloud'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-1.5 h-0.5 origin-left rounded-full bg-teal transition-transform duration-300 ease-out-soft ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/contact" className="hidden min-h-11 px-5 text-sm sm:inline-flex">
            Tell Us What You Need
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cloud shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors hover:bg-white/5 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} strokeWidth={2} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="h-[calc(100dvh-76px)] overflow-y-auto border-t border-royal bg-midnight/95 backdrop-blur-xl xl:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-6">
            {site.nav.map((item, i) => (
              <li key={item.to} className="fade-in" style={{ animationDelay: `${i * 0.04}s`, animationDuration: '.5s' }}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-2xl px-4 py-4 font-heading text-xl font-semibold no-underline ${
                      isActive ? 'bg-royal/70 text-teal' : 'text-cloud hover:bg-white/5'
                    }`
                  }
                >
                  {item.label}
                  <Icon name="arrow" size={20} />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="container-page pb-10">
            <Button to="/contact" size="lg" className="w-full">
              Tell Us What You Need
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
