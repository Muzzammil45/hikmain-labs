import { useEffect } from 'react'
import { site } from '../config/site'

/** Sets the document title and meta description for the current page. */
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    // Fall back to the site-wide description so a page without one never keeps the previous page's text
    meta.content = description || site.description
  }, [title, description])

  return null
}
