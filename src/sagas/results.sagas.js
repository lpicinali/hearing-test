import { all, call, put, select, take } from 'redux-saga/effects'
import tinytime from 'tinytime'
import isTouchDevice from 'is-touch-device'

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
  calculateHearingLossCodesFromAudiogram,
  getMedianCode,
} from 'src/evaluation.js'
import history from 'src/history.js'
import fetchResultsPdf from 'src/pdf/fetchResultsPdf.js'
import renderResultsDocString from 'src/pdf/renderResultsDocString.js'
import { downloadAsFile, openPostRequestInNewWindow } from 'src/utils.js'

function* calculateAudiograms() {
  while (true) {
    yield take(ActionType.CALCULATE_AUDIOGRAMS)

    const testValues = yield select(state => state.get('test'))

    try {
      // Left ear
      const leftEarVolumes = testValues.get(Ear.LEFT).toJS()
      const leftEarAudiogram = yield call(
        calculateAudiogramFromHearingTestResult,
        leftEarVolumes
      )
      yield put(setResultAudiogram(Ear.LEFT, leftEarAudiogram))

      const leftEarCodes = yield call(
        calculateHearingLossCodesFromAudiogram,
        leftEarAudiogram
      )
      const leftEarCode = yield call(getMedianCode, leftEarCodes)
      yield put(setResultCode(Ear.LEFT, leftEarCode))

      // Right ear
      const rightEarVolumes = testValues.get(Ear.RIGHT).toJS()
      const rightEarAudiogram = yield call(
        calculateAudiogramFromHearingTestResult,
        rightEarVolumes
      )
      yield put(setResultAudiogram(Ear.RIGHT, rightEarAudiogram))

      const rightEarCodes = yield call(
        calculateHearingLossCodesFromAudiogram,
        rightEarAudiogram
      )
      const rightEarCode = yield call(getMedianCode, rightEarCodes)
      yield put(setResultCode(Ear.RIGHT, rightEarCode))

      yield call(history.push, AppUrl.RESULTS)
    } catch (err) {
      console.log('Could not hearing loss codes:')
      console.log(err)
    }
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

      if (isTouchDevice() === true) {
        // Touch devices: Open PDF in a new window
        yield call(openPostRequestInNewWindow, {
          url: configs.pdfUrl,
          body: { text: html },
        })
        yield put(downloadResultsSuccess())
      } else {
        // Non-touch devices: Download PDF as a file
        const pdfBlob = yield call(fetchResultsPdf, { html })
        const dateSuffix = tinytime('{YYYY}{Mo}{DD}', {
          padMonth: true,
        }).render(new Date())
        const pdfFilename = `3D Tune-In Hearing Test Results ${dateSuffix}.pdf`
        yield call(downloadAsFile, pdfBlob, pdfFilename)
        yield put(downloadResultsSuccess())
      }
    } catch (err) {
      console.error(err)
      yield put(downloadResultsError(err))
    }
  }
}

export default function* resultsSagas() {
  yield all([calculateAudiograms(), doResultDownloads()])
}
