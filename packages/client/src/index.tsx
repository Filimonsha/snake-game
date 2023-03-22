import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'
import { store } from './store/store'

const rootElement = document.getElementById('root') as HTMLElement

const app = (
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
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

