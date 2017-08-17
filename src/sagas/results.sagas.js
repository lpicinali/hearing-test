import { all, call, put, select, take } from 'redux-saga/effects'

import { setResultAudiogram } from 'src/actions.js'
import { ActionType, AppUrl, Ear } from 'src/constants.js'
import history from 'src/history.js'
import { calculateAudiogramFromHearingTestResult } from 'src/utils.js'

function* calculateAudiograms() {
  while (true) {
    yield take(ActionType.CALCULATE_AUDIOGRAMS)

    const testValues = yield select(state => state.get('test'))

    // Left ear
    const leftEarVolumes = testValues.get(Ear.LEFT).toJS()
    const leftEarAudiogram = yield call(
      calculateAudiogramFromHearingTestResult,
      leftEarVolumes
    )
    yield put(setResultAudiogram(Ear.LEFT, leftEarAudiogram))

    // Right ear
    const rightEarVolumes = testValues.get(Ear.RIGHT).toJS()
    const rightEarAudiogram = yield call(
      calculateAudiogramFromHearingTestResult,
      rightEarVolumes
    )
    yield put(setResultAudiogram(Ear.RIGHT, rightEarAudiogram))

    yield call(history.push, AppUrl.RESULTS)
  }
}

export default function* testSagas() {
  yield all([calculateAudiograms()])
}
