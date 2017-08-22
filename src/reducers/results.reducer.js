import { fromJS } from 'immutable'

import { ActionType, Ear } from 'src/constants.js'

const initialState = fromJS({
  audiograms: {
    [Ear.LEFT]: [0, 18, 31.5, 27.5, 16, 23, 29.5],
    [Ear.RIGHT]: [0, 18, 31.5, 27.5, 16, 23, 29.5],
  },
  codes: {
    [Ear.LEFT]: null,
    [Ear.RIGHT]: null,
  },
})

export default function resultsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ActionType.SET_RESULT_AUDIOGRAM:
      return state.setIn(['audiograms', payload.ear], fromJS(payload.audiogram))
    case ActionType.SET_RESULT_CODE:
      return state.setIn(['codes', payload.ear], payload.code)
    default:
      return state
  }
}
