import { useEffect } from 'react'

/**
 * Scroll reveal for every `.reveal` and `.draw-line` element on the current page.
 * One IntersectionObserver per page; each element animates in once, the first time
 * it scrolls into view. Re-runs when `key` (the pathname) changes.
 */
export default function useReveal(key) {
  useEffect(() => {
    // The "shown" marker is a data attribute, not a class: React rewrites an element's
    // class whenever its className prop changes (e.g. a card being selected), which would
    // wipe an added class and hide the element again. React never touches this attribute.
    const show = (el) => el.setAttribute('data-revealed', '')
    const all = [...document.querySelectorAll('.reveal:not([data-revealed]), .draw-line:not([data-revealed])')]
    if (!('IntersectionObserver' in window)) {
      all.forEach(show)
      return undefined
    }
    // Anything already on screen when the page opens shows straight away, without
    // waiting for the observer's first callback.
    const vh = window.innerHeight
    const els = all.filter((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.92 && r.bottom > 0) {
        show(el)
        return false
      }
      return true
    })
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])
}
