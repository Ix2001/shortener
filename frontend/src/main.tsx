import React from 'react'
import ReactDOM, {createRoot} from 'react-dom/client'
import App from './App'
import { keycloakAuth} from './keycloak'
import {BrowserRouter} from "react-router-dom";




const startApp = (() => {
  createRoot(document.getElementById('root')!).render(
              <App />
  )
})

keycloakAuth(startApp)