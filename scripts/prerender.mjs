/**
 * Pre-renders every route to static HTML after the client and server builds.
 *
 *   dist/index.html            → template, replaced with the rendered home page
 *   dist/<route>/index.html    → one file per page in src/routes.js
 *   dist/404.html              → the not-found page (Vercel serves it with a 404 status)
 *   dist/sitemap.xml, robots.txt
 *
 * Each page gets its own <title>, description, canonical link and share-preview tags,
 * so search engines and link previews see the right content without running JavaScript.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')

const { render, routes, headToHtml, site } = await import(pathToFileURL(ssrEntry).href)
const template = await readFile(resolve(dist, 'index.html'), 'utf8')

const page = (url) => {
  const { html, head, noindex } = render(url)
  if (!head) throw new Error(`No <Seo> found when rendering ${url}`)
  return template.replace('<!--app-head-->', headToHtml(head, { noindex })).replace('<!--app-html-->', html)
}

for (const { path } of routes) {
  const file = path === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${path}`, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page(path))
  console.log(`prerendered ${path}`)
}

await writeFile(resolve(dist, '404.html'), page('/404'))
console.log('prerendered 404')

const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .map(
    ({ path, priority }) =>
      `  <url><loc>${site.domain}${path === '/' ? '/' : path}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`,
  )
  .join('\n')
await writeFile(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`)
console.log('wrote sitemap.xml and robots.txt')

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })
