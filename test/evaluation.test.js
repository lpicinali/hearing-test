import { describe, it } from 'mocha'
import { expect } from 'chai'
// import { spy } from 'sinon'
import { forEach, keys, max, pick, reduce, zipObject } from 'lodash'

import { TestDirection } from 'src/constants.js'
import * as evaluation from 'src/evaluation.js'

const {
  calculateAudiogramFromHearingTestResult,
  calculateHearingLossCodesFromAudiogram,
  CodeCurveTypeScales,
  CodeSeverityValues,
} = evaluation

const FREQUENCIES = ['125', '250', '500', '1000', '2000', '4000', '8000']

const getEmptyTestValues = frequencies =>
  zipObject(
    frequencies,
    frequencies.map(() => ({
      [TestDirection.UP]: 0,
      [TestDirection.DOWN]: 0,
    }))
  )

const getHearingLossCodeAudiograms = (modifier = () => 1) => {
  return reduce(
    CodeCurveTypeScales,
    (aggr, levels, scale) => ({
      ...aggr,
      ...reduce(
        CodeSeverityValues,
        (scaleAggr, decibels, severity) => ({
          ...scaleAggr,
          [`${scale}${severity}`]: zipObject(
            FREQUENCIES,
            levels.map(x => x * decibels * modifier())
          ),
        }),
        {}
      ),
    }),
    {}
  )
}

const normalize = arr => {
  const maxValue = max(arr)
  return arr.map(x => x / maxValue)
}

const pickArr = (arr, indices) => arr.filter((x, i) => indices.includes(i))

describe('calculateAudiogramFromHearingTestResult()', () => {
  it('throws a RangeError when an unsupported frequency is provided in the input', () => {
    const input = {
      '666': {
        [TestDirection.UP]: 0,
        [TestDirection.DOWN]: 0,
      },
    }
    const getResults = () => calculateAudiogramFromHearingTestResult(input)
    expect(getResults).to.throw(RangeError)
  })

  it('returns values for all frequencies provided as input', () => {
    const input1 = getEmptyTestValues(['125'])
    const results1 = calculateAudiogramFromHearingTestResult(input1)
    expect(results1).to.have.keys(['125'])

    const input2 = getEmptyTestValues(['250', '8000'])
    const results2 = calculateAudiogramFromHearingTestResult(input2)
    expect(results2).to.have.keys(['250', '8000'])

    const input3 = getEmptyTestValues(FREQUENCIES)
    const results3 = calculateAudiogramFromHearingTestResult(input3)
    expect(results3).to.have.keys(FREQUENCIES)
  })
})

describe('calculateHearingLossCodesFromAudiogram()', () => {
  it('throws a RangeError when an unsupported frequency is provided in the input audiogram', () => {
    const audiogram = { '666': 0 }
    const getResults = () => calculateHearingLossCodesFromAudiogram(audiogram)
    expect(getResults).to.throw(RangeError)
  })

  it(
    'uses getNeighbouringFrequencyValue() to fill audiogram with missing frequencies'
  )
  // it('uses getNeighbouringFrequencyValue() to fill audiogram with missing frequencies', () => {
  //   const fillSpy = spy(evaluation, 'getNeighbouringFrequencyValue')
  //   const audiogram = zipObject(
  //     FREQUENCIES.slice(1, FREQUENCIES.length),
  //     FREQUENCIES.map(() => 0)
  //   )

  //   calculateHearingLossCodesFromAudiogram(audiogram)
  //   expect(fillSpy.args[0]).to.equal(['125', 0])

  //   fillSpy.restore()
  // })

  describe('plots', () => {
    it('exact matches correctly', () => {
      const audiograms = getHearingLossCodeAudiograms()

      forEach(audiograms, (audiogram, code) => {
        expect(
          calculateHearingLossCodesFromAudiogram(audiogram)
        ).to.deep.equal([code])
      })
    })

    it('slight deviances correctly', () => {
      const audiograms = getHearingLossCodeAudiograms(
        () => 1 + (0.05 - Math.random() * 0.1)
      )

      forEach(audiograms, (audiogram, code) => {
        expect(
          calculateHearingLossCodesFromAudiogram(audiogram)
        ).to.deep.equal([code])
      })
    })

    it('500, 1000, 2000 and 4000 Hz audiograms into reasonable codes', () => {
      const audiograms = getHearingLossCodeAudiograms()

      const frequencies = ['500', '1000', '2000', '4000']
      const frequencyIndices = frequencies.map(x => FREQUENCIES.indexOf(x))

      forEach(audiograms, (audiogram, code) => {
        const [scale, severity] = code.split('')
        const partialAudiogram = pick(audiogram, frequencies)
        // console.log({ code, audiogram })
        const results = calculateHearingLossCodesFromAudiogram(partialAudiogram)
        // console.log({ results })

        // Get all scales whose values are equal the input scale
        // with the frequency pick accounted for
        const normalizedScale = normalize(
          pickArr(CodeCurveTypeScales[scale], frequencyIndices)
        )
        const matchingScales = keys(CodeCurveTypeScales).filter(
          scaleKey =>
            evaluation.getAverageDistance(
              normalizedScale,
              normalize(
                pickArr(CodeCurveTypeScales[scaleKey], frequencyIndices)
              )
            ) === 0
        )

        // console.log({ matchingScales })

        const closeMatches = results.filter(x => {
          const [resultScale, resultSeverity] = x.split('')
          // const severityDistance = Math.abs(resultSeverity - severity)
          const isMatchingScale =
            matchingScales.includes(resultScale) ||
            matchingScales.some(
              s =>
                Math.abs(
                  keys(CodeCurveTypeScales).indexOf(s) -
                    keys(CodeCurveTypeScales).indexOf(resultScale)
                ) <= 1
            )

          return isMatchingScale // && severityDistance <= 2
        })

        expect(closeMatches.length).to.be.above(0)
      })
    })

    // it('500, 1000 and 4000 Hz audiograms into reasonable codes', () => {
    //   const audiograms = getHearingLossCodeAudiograms()

    //   forEach(audiograms, (audiogram, code) => {
    //     const partialAudiogram = pick(audiogram, ['500', '1000', '4000'])
    //     expect(
    //       calculateHearingLossCodesFromAudiogram(partialAudiogram)
    //     ).to.equal(code)
    //   })
    // })
  })
})
