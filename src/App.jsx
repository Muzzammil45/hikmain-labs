import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProjectSupport from './pages/ProjectSupport'
import Tutoring from './pages/Tutoring'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import JoinNetwork from './pages/JoinNetwork'
import Contact from './pages/Contact'
import ElevateReferral from './pages/ElevateReferral'
import Policies from './pages/Policies'
import NotFound from './pages/NotFound'

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
        <Route path="elevate-referral" element={<ElevateReferral />} />
        <Route path="privacy" element={<Policies slug="privacy" />} />
        <Route path="terms" element={<Policies slug="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
