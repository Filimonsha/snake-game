import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/cacheServiceWorker.js');
      return registration;
    } catch (err) {
      console.error('Serviceworker registration failed');
      return err;
    }
  }
}

registerServiceWorker();
