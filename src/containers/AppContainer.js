import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LionessProvider } from 'lioness'

import App from 'src/containers/App.js'

export default function AppContainer() {
  return (
    <BrowserRouter>
      <LionessProvider messages={{}} locale="en">
        <App />
      </LionessProvider>
    </BrowserRouter>
  )
}
