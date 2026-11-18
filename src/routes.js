/**
 * Every page the site serves. The router, the pre-renderer and the sitemap all read
 * this one list, so a page added here is routed, pre-rendered to HTML and listed for
 * search engines together.
 */
export const routes = [
  { path: '/', priority: '1.0' },
  { path: '/project-support', priority: '0.9' },
  { path: '/tutoring', priority: '0.9' },
  { path: '/how-it-works', priority: '0.7' },
  { path: '/about', priority: '0.7' },
  { path: '/join', priority: '0.6' },
  { path: '/contact', priority: '0.8' },
  { path: '/elevate-referral', priority: '0.5' },
  { path: '/privacy', priority: '0.3' },
  { path: '/terms', priority: '0.3' },
]
