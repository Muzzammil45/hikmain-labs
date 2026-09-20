import { Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Seo from './components/Seo'
import Section from './components/Section'
import Button from './components/Button'
import Home from './pages/Home'
import ProjectSupport from './pages/ProjectSupport'
import Tutoring from './pages/Tutoring'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import JoinNetwork from './pages/JoinNetwork'
import Contact from './pages/Contact'
import Policy from './pages/Policy'

const policySlugs = ['privacy', 'cookies', 'terms', 'academic-integrity', 'contractor-notice', 'accessibility']

function NotFound() {
  return (
    <Section>
      <Seo title="Page not found" />
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-4">
        Sorry, we couldn&rsquo;t find that page. Try the <Link to="/">home page</Link>.
      </p>
      <Button to="/" className="mt-6">Back to home</Button>
    </Section>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="project-support" element={<ProjectSupport />} />
        <Route path="tutoring" element={<Tutoring />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="about" element={<About />} />
        <Route path="join" element={<JoinNetwork />} />
        <Route path="contact" element={<Contact />} />
        {policySlugs.map((slug) => (
          <Route key={slug} path={slug} element={<Policy slug={slug} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
