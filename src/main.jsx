import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { initAnalytics } from './analytics.js'
import './styles.css'

initAnalytics()

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// The build pre-renders real HTML into #root. Hydrate it; fall back to a normal render (dev server).
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
