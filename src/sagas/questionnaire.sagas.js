import { all, put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
  submitQuestionnaireError,
  // submitQuestionnaireSuccess,
} from 'src/actions.js'
import { ActionType } from 'src/constants.js'

function* doSubmitQuestionnaire() {
  while (true) {
    yield take(ActionType.SUBMIT_QUESTIONNAIRE)
    yield delay(3000)
    yield put(
      submitQuestionnaireError(new Error('The form submission is fake'))
    )
  }
}

export default function* resultsSagas() {
  yield all([doSubmitQuestionnaire()])
}
