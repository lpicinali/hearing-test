import { all, call, put, select, take } from 'redux-saga/effects'

import { setResultAudiogram, setResultCode } from 'src/actions.js'
import { ActionType, AppUrl, Ear } from 'src/constants.js'
import history from 'src/history.js'
import {
  calculateAudiogramFromHearingTestResult,
  calculateHearingLossCodeFromHearingTestResult,
} from 'src/utils.js'

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

    const leftEarCode = yield call(
      calculateHearingLossCodeFromHearingTestResult,
      leftEarVolumes
    )
    yield put(setResultCode(Ear.LEFT, leftEarCode))

    // Right ear
    const rightEarVolumes = testValues.get(Ear.RIGHT).toJS()
    const rightEarAudiogram = yield call(
      calculateAudiogramFromHearingTestResult,
      rightEarVolumes
    )
    yield put(setResultAudiogram(Ear.RIGHT, rightEarAudiogram))

    const rightEarCode = yield call(
      calculateHearingLossCodeFromHearingTestResult,
      rightEarVolumes
    )
    yield put(setResultCode(Ear.RIGHT, rightEarCode))

    yield call(history.push, AppUrl.RESULTS)
  }
}

export default function* resultsSagas() {
  yield all([calculateAudiograms()])
}
