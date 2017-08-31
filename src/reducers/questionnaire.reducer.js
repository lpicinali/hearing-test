import { fromJS } from 'immutable'
import { keys, map, zipObject } from 'lodash'

import { ActionType, QuestionnaireField } from 'src/constants.js'

const initialState = fromJS({
  answers: zipObject(
    keys(QuestionnaireField),
    map(QuestionnaireField, () => 1) // null)
  ),
  isSubmitting: false,
  hasSubmitted: false,
  error: null,
})

export default function termsReducer(
  state = initialState,
  { type, payload, error }
) {
  switch (type) {
    case ActionType.SET_QUESTIONNAIRE_ANSWER:
      return state.setIn(['answers', payload.name], payload.value)
    case ActionType.SUBMIT_QUESTIONNAIRE:
      return state.set('isSubmitting', true)
    case ActionType.SUBMIT_QUESTIONNAIRE_SUCCESS:
      return state.set('isSubmitting', false).set('hasSubmitted', true)
    case ActionType.SUBMIT_QUESTIONNAIRE_ERROR:
      return state.set('isSubmitting', false).set('error', fromJS(error))
    default:
      return state
  }
}
