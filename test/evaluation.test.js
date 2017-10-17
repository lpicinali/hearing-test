import { describe, it } from 'mocha'
import { expect } from 'chai'
import { zipObject } from 'lodash'

import { TestDirection } from 'src/constants.js'
import {
  calculateAudiogramFromHearingTestResult,
  SPLtoHLMap,
} from 'src/evaluation.js'

const FREQUENCIES = ['125', '250', '500', '1000', '2000', '4000', '8000']

const getEmptyTestValues = frequencies =>
  zipObject(
    frequencies,
    frequencies.map(() => ({
      [TestDirection.UP]: -70,
      [TestDirection.DOWN]: -80,
    }))
  )

describe('calculateAudiogramFromHearingTestResult()', () => {
  it('returns an audiogram containing the same frequencies as the provided frequency range', () => {
    const values = getEmptyTestValues(FREQUENCIES)

    expect(
      calculateAudiogramFromHearingTestResult(values, FREQUENCIES.slice(0, 1))
    ).to.have.length(1)
    expect(
      calculateAudiogramFromHearingTestResult(values, FREQUENCIES.slice(0, 5))
    ).to.have.length(5)
    expect(
      calculateAudiogramFromHearingTestResult(values, FREQUENCIES)
    ).to.have.length(7)
  })

  describe('produces correct outputs', () => {
    it('for seven input frequencies', () => {
      const testValues = zipObject(
        FREQUENCIES,
        FREQUENCIES.map(frequency =>
          zipObject(
            [TestDirection.UP, TestDirection.DOWN],
            [SPLtoHLMap[frequency], SPLtoHLMap[frequency]]
          )
        )
      )
      const audiogram = calculateAudiogramFromHearingTestResult(
        testValues,
        FREQUENCIES
      )
      expect(audiogram).to.deep.equal([0, 0, 0, 0, 0, 0, 0])
    })
  })
})
