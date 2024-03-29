import { fromJS } from 'immutable'

import configs from 'src/configs.js'
import {
  ActionType,
  Ear,
  FrequencyStartVolume,
  TestDirection,
  TestFrequencies,
} from 'src/constants.js'

const TEST_FREQUENCIES = TestFrequencies[configs.EXTENT]

const earFrequencyTestValue = TEST_FREQUENCIES.reduce(
  (aggr, frequency) => ({
    ...aggr,
    [frequency]: {
      [TestDirection.UP]: FrequencyStartVolume[frequency],
      [TestDirection.DOWN]: FrequencyStartVolume[frequency],
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
