import { all, call, put, take } from 'redux-saga/effects'

import {
  submitQuestionnaireError,
  submitQuestionnaireSuccess,
} from 'src/actions.js'
import * as api from 'src/api.js'
import { ActionType } from 'src/constants.js'

function* doSubmitQuestionnaire() {
  while (true) {
    const { payload } = yield take(ActionType.SUBMIT_QUESTIONNAIRE)

    const answers = payload.values.toJS()
    const { errors } = yield call(api.submitQuestionnaire, { answers })

    if (errors === undefined) {
      yield put(submitQuestionnaireSuccess())
    } else {
      yield put(submitQuestionnaireError(errors[0]))
    }
  }
}

export default function* resultsSagas() {
  yield all([doSubmitQuestionnaire()])
}
