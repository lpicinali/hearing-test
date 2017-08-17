import { fromJS } from 'immutable'

import { ActionType, Ear } from 'src/constants.js'

const initialState = fromJS({
  audiograms: {
    [Ear.LEFT]: null,
    [Ear.RIGHT]: null,
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
    default:
      return state
  }
}
