import { fromJS } from 'immutable'

import {
  ActionType,
  Ear,
  TestDirection,
  TEST_FREQUENCIES,
} from 'src/constants.js'

const earFrequencyTestValue = TEST_FREQUENCIES.reduce(
  (aggr, frequency) => ({
    ...aggr,
    [frequency]: {
      [TestDirection.UP]: 0,
      [TestDirection.DOWN]: 0,
    },
  }),
  {}
)

const initialState = fromJS({
  [Ear.LEFT]: { ...earFrequencyTestValue },
  [Ear.RIGHT]: { ...earFrequencyTestValue },
})

export default function testReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionType.SET_FREQUENCY_LEVEL:
      return state.setIn(
        [payload.ear, payload.frequency, payload.direction],
        payload.level
      )
    default:
      return state
  }
}
