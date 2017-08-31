import { fromJS } from 'immutable'
import { keys, map, zipObject } from 'lodash'

import { ActionType, QuestionnaireField } from 'src/constants.js'

const initialState = fromJS({
  answers: zipObject(
    keys(QuestionnaireField),
    map(QuestionnaireField, () => null)
  ),
})

export default function termsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionType.SET_QUESTIONNAIRE_ANSWER:
      return state.setIn(['answers', payload.name], payload.value)
    default:
      return state
  }
}
