/* global window */
import { createStore, compose } from 'redux'

import rootReducer from 'src/reducers/rootReducer.js'

const store = createStore(
  rootReducer,
  compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
)

export default store
