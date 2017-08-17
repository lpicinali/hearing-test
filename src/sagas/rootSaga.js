import { all } from 'redux-saga/effects'

import resultsSagas from 'src/sagas/results.sagas'

export default function* rootSagas() {
  yield all([resultsSagas()])
}
