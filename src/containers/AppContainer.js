import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from 'src/containers/App.js'

export default function AppContainer() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
