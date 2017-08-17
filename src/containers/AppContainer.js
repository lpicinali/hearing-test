import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { LionessProvider } from 'lioness'

import history from 'src/history.js'
import store from 'src/store.js'
import audioContext from 'src/audio/audioContext.js'
import AudioContextProvider from 'src/components/AudioContextProvider.js'
import App from 'src/containers/App.js'

export default function AppContainer() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <LionessProvider messages={{}} locale="en">
          <AudioContextProvider audioContext={audioContext}>
            <App />
          </AudioContextProvider>
        </LionessProvider>
      </Router>
    </Provider>
  )
}
