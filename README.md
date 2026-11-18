# HIKMAIN Labs — company website

Marketing and lead-capture website for **HIKMAIN Labs Ltd**, a UK company offering AI project support, digital assistance and tutoring. Built from a written client brief and live at **[hikmainlabs.com](https://www.hikmainlabs.com)**.

![HIKMAIN Labs home page](docs/screenshot-home.jpg)

## What's in it

- **Pages:** Home, AI & Project Support, Tutoring, How It Works, About, Join Our Network, Contact, Policies, and a partner referral page
- **Forms:** contact, contractor application and partner referral, with client-side validation, accessible error messages, and delivery through Formspree
- **Spam protection without CAPTCHAs:** a hidden honeypot field plus a minimum fill-time check; bots get a silent "success" so they learn nothing
- **Referral tracking:** the partner referral form records visitor details before handing off with a tracked `?ref=` link
- **One config file:** every company detail, contact channel and form endpoint lives in `src/config/site.js`, so the header, footer, pages and forms update together
- **Pre-rendered pages:** every route is rendered to static HTML at build time (`scripts/prerender.mjs`), so search engines and link previews see each page's own title, description and content; React then takes over in the browser
- **SEO:** per-page titles, descriptions, canonical links and share-preview tags, a generated `sitemap.xml` and `robots.txt`, a 1200×630 share image, Google Search Console verification
- **Design:** the "Pulse" look — deep navy and teal, a cursor-following glow, light streaming into the HIKMAIN hub, word-by-word headline reveals, edge-lit cards, a sliding service switcher and scroll reveals. All motion is CSS, and it switches off for visitors who ask their device for reduced motion

## Tech stack

React 19 · Vite 7 · Tailwind CSS 4 · React Router 7 · Formspree · Vercel

## Process

Before launch I audited the site against the brief, logged 10 blocking issues, and fixed them through a revision cycle with the client. AI-assisted code was reviewed and corrected before release.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # client build, server build, then pre-render every page into dist/
```

## Project structure

```
src/
  pages/            one component per route
  components/       layout, UI and form building blocks
  hooks/            useFormSubmit (validation, spam checks, submission), useEmailModal, useReveal
  config/site.js    company details, contact channels, form endpoints
  content.js        copy shared between pages (services, process steps, reasons)
  routes.js         the list of pages, used by the pre-renderer and the sitemap
  entry-server.jsx  renders a page to HTML at build time
scripts/
  prerender.mjs     writes dist/<page>/index.html, 404.html, sitemap.xml and robots.txt
```

---

Built by [Muzzammil Suleiman](https://github.com/Muzzammil45).
