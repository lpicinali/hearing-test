/* global window */
import { all, call, put, select, take } from 'redux-saga/effects'
import tinytime from 'tinytime'

import {
  emailResultsError,
  emailResultsSuccess,
  setResultAudiogram,
  setResultCode,
} from 'src/actions.js'
import { emailResults, fetchResultsPdf } from 'src/api.js'
import configs from 'src/configs.js'
import { ActionType, AppUrl, Ear } from 'src/constants.js'
import history from 'src/history.js'
import createPdf from 'src/pdf/createPdf.js'
import renderResultsDocString from 'src/pdf/renderResultsDocString.js'
import {
  calculateAudiogramFromHearingTestResult,
  calculateHearingLossCodeFromHearingTestResult,
  downloadAsFile,
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

function* doSendEmails() {
  while (true) {
    const { payload } = yield take(ActionType.EMAIL_RESULTS)

    const { results, recipient } = payload
    const audiograms = results.get('audiograms').toJS()
    const codes = results.get('codes').toJS()

    const { errors } = yield call(emailResults, {
      audiograms,
      codes,
      recipient,
    })

    if (errors === undefined) {
      yield put(emailResultsSuccess())
    } else {
      yield put(emailResultsError(errors[0]))
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

    const query = {
      audiograms: results.get('audiograms').toJS(),
    }
    if (configs.HAS_CODES === true) {
      query.codes = results.get('codes').toJS()
    }
    if (configs.HAS_QUESTIONNAIRE === true) {
      query.questionnaire = questionnaire.toJS()
    }

    const html = yield call(renderResultsDocString, query)
    query.html = html

    const pdfBlob = yield call(fetchResultsPdf, { html: query.html })
    const dateSuffix = tinytime('{YYYY}{Mo}{DD}', { padMonth: true }).render(
      new Date()
    )
    const pdfFilename = `3D Tune-In Hearing Test Results ${dateSuffix}.pdf`
    yield call(downloadAsFile, pdfBlob, pdfFilename)
  }
}

export default function* resultsSagas() {
  yield all([calculateAudiograms(), doSendEmails(), doResultDownloads()])
}
