import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const root = document.getElementById('root')
// Pages are pre-rendered to HTML at build time; take over that HTML rather than
// replacing it. In development (npm run dev) the root is empty, so render fresh.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
