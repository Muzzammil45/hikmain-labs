import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site'

/**
 * Per-page title, description, canonical link and share-preview tags.
 *
 * At build time the pre-renderer passes a collector through HeadContext and writes what
 * each page reports here into that page's <head>, so search engines and link previews
 * (WhatsApp, LinkedIn) see the right text without running JavaScript. In the browser the
 * effect below keeps the tags in step as the visitor moves between pages.
 */
export const HeadContext = createContext(null)

export function buildHead({ title, description, path }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`
  const desc = description || site.description
  const url = `${site.domain}${path === '/' ? '' : path}`
  return { fullTitle, desc, url, image: `${site.domain}/og-image.png` }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Structured data (schema.org JSON-LD) for the home page. Google reads it to show the
 * company name instead of the bare domain, the logo, and the contact details in results.
 * Everything comes from src/config/site.js, so it stays in step with the rest of the site.
 */
export function structuredData() {
  const [street, city, postcode] = site.company.registeredOffice.split(',').map((s) => s.trim())
  const business = {
    '@type': 'ProfessionalService',
    '@id': `${site.domain}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: `${site.domain}/`,
    logo: `${site.domain}/logo.png`,
    image: `${site.domain}/og-image.png`,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: city,
      postalCode: postcode,
      addressCountry: 'GB',
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Companies House company number',
      value: site.company.number,
    },
  }
  const website = {
    '@type': 'WebSite',
    '@id': `${site.domain}/#website`,
    name: site.name,
    alternateName: ['HIKMAIN', 'Hikmain Labs'],
    url: `${site.domain}/`,
    publisher: { '@id': business['@id'] },
  }
  // "<" is escaped so the JSON can never close the script tag early.
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': [business, website] }).replace(
    /</g,
    '\\u003c',
  )
  return `<script type="application/ld+json">${json}</script>`
}

/** The <head> markup the pre-renderer injects for one page. */
export function headToHtml({ fullTitle, desc, url, image }, { noindex } = {}) {
  return [
    url === site.domain ? structuredData() : '',
    `<title>${esc(fullTitle)}</title>`,
    `<meta name="description" content="${esc(desc)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : '',
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(fullTitle)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
  ]
    .filter(Boolean)
    .join('\n    ')
}

function setMeta(selector, attr, key, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export default function Seo({ title, description, noindex = false }) {
  const { pathname } = useLocation()
  const collector = useContext(HeadContext)
  const head = buildHead({ title, description, path: pathname })

  // Server side: report this page's tags to the pre-renderer.
  if (collector) {
    collector.head = head
    collector.noindex = noindex
  }

  useEffect(() => {
    document.title = head.fullTitle
    setMeta('meta[name="description"]', 'name', 'description', head.desc)
    setMeta('meta[property="og:title"]', 'property', 'og:title', head.fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', head.desc)
    setMeta('meta[property="og:url"]', 'property', 'og:url', head.url)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = head.url
  }, [head.fullTitle, head.desc, head.url])

  return null
}
