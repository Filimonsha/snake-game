import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'

const rootElement = document.getElementById('root') as HTMLElement

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (rootElement.innerHTML === '<!--ssr-outlet-->') {
  ReactDOM.createRoot(rootElement).render(app)
} else {
  ReactDOM.hydrateRoot(rootElement, app)
}


const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/cacheServiceWorker.js')
      return registration
    } catch (err) {
      console.error('Serviceworker registration failed')
      return err
    }
  }
}

if (import.meta.env.PROD) {
  registerServiceWorker()
}

