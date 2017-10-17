import { all, call, put, select, take } from 'redux-saga/effects'
import tinytime from 'tinytime'

import {
  downloadResultsError,
  downloadResultsSuccess,
  setResultAudiogram,
  setResultCode,
} from 'src/actions.js'
import configs from 'src/configs.js'
import { ActionType, AppUrl, Ear } from 'src/constants.js'
import {
  calculateAudiogramFromHearingTestResult,
  calculateHearingLossCodeFromHearingTestResult,
} from 'src/evaluation.js'
import history from 'src/history.js'
import fetchResultsPdf from 'src/pdf/fetchResultsPdf.js'
import renderResultsDocString from 'src/pdf/renderResultsDocString.js'
import { downloadAsFile } from 'src/utils.js'

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

function* doResultDownloads() {
  while (true) {
    yield take(ActionType.DOWNLOAD_RESULTS)

    const [questionnaire, results] = yield all([
      select(state => state.getIn(['questionnaire', 'answers'])),
      select(state => state.get('results')),
    ])

    const resultsDocProps = {
      audiograms: results.get('audiograms').toJS(),
    }
    if (configs.HAS_CODES === true) {
      resultsDocProps.codes = results.get('codes').toJS()
    }
    if (configs.HAS_QUESTIONNAIRE === true) {
      resultsDocProps.questionnaire = questionnaire.toJS()
    }

    try {
      const html = yield call(renderResultsDocString, resultsDocProps)

      const pdfBlob = yield call(fetchResultsPdf, { html })
      const dateSuffix = tinytime('{YYYY}{Mo}{DD}', { padMonth: true }).render(
        new Date()
      )
      const pdfFilename = `3D Tune-In Hearing Test Results ${dateSuffix}.pdf`
      yield call(downloadAsFile, pdfBlob, pdfFilename)
      yield put(downloadResultsSuccess())
    } catch (err) {
      console.error(err)
      yield put(downloadResultsError(err))
    }
  }
}

export default function* resultsSagas() {
  yield all([calculateAudiograms(), doResultDownloads()])
}
