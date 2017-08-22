import { fromJS } from 'immutable'

import { ActionType } from 'src/constants.js'

const initialState = fromJS({
  hasAccepted: false,
})

export default function termsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionType.SET_ACCEPT_TERMS:
      return state.set('hasAccepted', payload.isAccepting)
    default:
      return state
  }
}
