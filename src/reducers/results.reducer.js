import { fromJS } from 'immutable'

import configs from 'src/configs.js'
import { ActionType, Ear, TestFrequencies } from 'src/constants.js'

const initialState = fromJS({
  audiograms: {
    [Ear.LEFT]: TestFrequencies[configs.EXTENT].map(() => 0),
    [Ear.RIGHT]: TestFrequencies[configs.EXTENT].map(() => 0),
  },
  codes: {
    [Ear.LEFT]: null,
    [Ear.RIGHT]: null,
  },
  isSending: false,
  lastSentAt: null,
  sendError: null,
})

export default function resultsReducer(
  state = initialState,
  { type, payload, error }
) {
  switch (type) {
    case ActionType.SET_RESULT_AUDIOGRAM:
      return state.setIn(['audiograms', payload.ear], fromJS(payload.audiogram))
    case ActionType.SET_RESULT_CODE:
      return state.setIn(['codes', payload.ear], payload.code)
    case ActionType.EMAIL_RESULTS:
      return state.set('isSending', true)
    case ActionType.EMAIL_RESULTS_SUCCESS:
      return state.set('isSending', false).set('lastSentAt', Date.now())
    case ActionType.EMAIL_RESULTS_ERROR:
      return state.set('isSending', false).set('sendError', error)
    default:
      return state
  }
}
