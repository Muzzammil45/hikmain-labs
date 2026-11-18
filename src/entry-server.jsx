import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { HeadContext } from './components/Seo'

/** Renders one URL to HTML for the pre-renderer, along with that page's <head> data. */
export function render(url) {
  const collector = {}
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  )
  return { html, head: collector.head, noindex: collector.noindex }
}

export { routes } from './routes.js'
export { headToHtml } from './components/Seo'
export { site } from './config/site'
