/* global window */
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from 'src/reducers/rootReducer.js'
import rootSaga from 'src/sagas/rootSaga.js'

const sagaMiddleware = createSagaMiddleware()
const basicPersist = store => next => action => {
  localStorage.setItem('store', JSON.stringify(store.getState()))
  return next(action)
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware, basicPersist),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

sagaMiddleware.run(rootSaga)

export default store
