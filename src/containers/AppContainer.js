import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { LionessProvider } from 'lioness'

import store from 'src/store.js'
import App from 'src/containers/App.js'

export default function AppContainer() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LionessProvider messages={{}} locale="en">
          <App />
        </LionessProvider>
      </BrowserRouter>
    </Provider>
  )
}
