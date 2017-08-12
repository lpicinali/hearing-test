import { fromJS } from 'immutable'

import { ActionType, Locale } from 'src/constants.js'

const initialState = fromJS({
  locale: Locale.EN,
})

export default function testReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionType.SET_LOCALE:
      return state.set('locale', payload.locale)
    default:
      return state
  }
}
