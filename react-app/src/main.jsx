/*
    main.jsx renders the parent component "App",
    and is the entry point for Sentimento's component hierarchy
*/

/* component imports */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
