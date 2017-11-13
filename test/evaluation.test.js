import { describe, it } from 'mocha'
import { expect } from 'chai'
// import { spy } from 'sinon'
import { forEach, keys, pick, reduce, zipObject } from 'lodash'

import { AUDIOGRAM_FREQUENCIES, TestDirection } from 'src/constants.js'
import * as evaluation from 'src/evaluation.js'
import { normalize, pickArr } from 'src/utils.js'

const {
  calculateAudiogramFromHearingTestResult,
  calculateHearingLossCodesFromAudiogram,
  getMedianCode,
  isIndicatingHearingLoss,
  CodeCurveTypeScales,
  CodeSeverityValues,
} = evaluation

const getEmptyTestValues = frequencies =>
  zipObject(
    frequencies,
    frequencies.map(() => ({
      [TestDirection.UP]: 0,
      [TestDirection.DOWN]: 0,
    }))
  )

const getHearingLossCodeAudiograms = (modifier = () => 1) =>
  reduce(
    CodeCurveTypeScales,
    (aggr, levels, scale) => ({
      ...aggr,
      ...reduce(
        CodeSeverityValues,
        (scaleAggr, decibels, severity) => ({
          ...scaleAggr,
          [`${scale}${severity}`]: zipObject(
            AUDIOGRAM_FREQUENCIES,
            levels.map(x => x * decibels * modifier())
          ),
        }),
        {}
      ),
    }),
    {}
  )

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

    const input3 = getEmptyTestValues(AUDIOGRAM_FREQUENCIES)
    const results3 = calculateAudiogramFromHearingTestResult(input3)
    expect(results3).to.have.keys(AUDIOGRAM_FREQUENCIES)
  })
})

describe('calculateHearingLossCodesFromAudiogram()', () => {
  it('throws a RangeError when an unsupported frequency is provided in the input audiogram', () => {
    const audiogram = { '666': 0 }
    const getResults = () => calculateHearingLossCodesFromAudiogram(audiogram)
    expect(getResults).to.throw(RangeError)
  })

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

    describe('partial audiograms into reasonable codes', () => {
      function testPartialAudiogramPlotting(frequencies) {
        const audiograms = getHearingLossCodeAudiograms()
        const frequencyIndices = frequencies.map(x =>
          AUDIOGRAM_FREQUENCIES.indexOf(x)
        )

        forEach(audiograms, (audiogram, code) => {
          const [scale, severity] = code.split('')
          const partialAudiogram = pick(audiogram, frequencies)
          const results = calculateHearingLossCodesFromAudiogram(
            partialAudiogram
          )

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

          const closeMatches = results.filter(x => {
            const [resultScale, resultSeverity] = x.split('')
            const severityDistance = Math.abs(resultSeverity - severity)
            const isMatchingScale =
              matchingScales.includes(resultScale) ||
              matchingScales.some(
                s =>
                  Math.abs(
                    keys(CodeCurveTypeScales).indexOf(s) -
                      keys(CodeCurveTypeScales).indexOf(resultScale)
                  ) <= 1
              )

            return isMatchingScale && severityDistance <= 2
          })

          expect(closeMatches.length).to.be.above(0)
        })
      }

      it('with 500, 1000, 2000 and 4000 Hz', () => {
        testPartialAudiogramPlotting(['500', '1000', '2000', '4000'])
      })

      it('with 500, 1000 and 4000 Hz', () => {
        testPartialAudiogramPlotting(['500', '1000', '4000'])
      })
    })
  })
})

describe('getMedianCode()', () => {
  it('returns the first code if there are only two or less codes', () => {
    expect(getMedianCode(['B4'])).to.equal('B4')
    expect(getMedianCode(['I3'])).to.equal('I3')
    expect(getMedianCode(['A4', 'F4'])).to.equal('A4')
    expect(getMedianCode(['I0', 'I6'])).to.equal('I0')
  })

  it('uses the median scale followed by the median severity to determine the median code', () => {
    expect(getMedianCode(['A0', 'B0', 'C0'])).to.equal('B0')
    expect(getMedianCode(['A8', 'D3', 'E1'])).to.equal('D3')
    expect(getMedianCode(['F6', 'I3', 'A3'])).to.equal('F6')

    expect(getMedianCode(['A0', 'A1', 'A2', 'A3'])).to.equal('A1')
    expect(getMedianCode(['I0', 'I1', 'I2', 'I4', 'I5', 'I6'])).to.equal('I2')
    expect(getMedianCode(['A0', 'D2', 'D3', 'D4', 'E4'])).to.equal('D3')
  })
})

describe('isIndicatingHearingLoss()', () => {
  it('deems anything with a severity >= 3 as a potential hearing loss', () => {
    expect(isIndicatingHearingLoss('A0')).to.equal(false)
    expect(isIndicatingHearingLoss('B0')).to.equal(false)
    expect(isIndicatingHearingLoss('C0')).to.equal(false)
    expect(isIndicatingHearingLoss('D0')).to.equal(false)
    expect(isIndicatingHearingLoss('E0')).to.equal(false)
    expect(isIndicatingHearingLoss('F0')).to.equal(false)
    expect(isIndicatingHearingLoss('G0')).to.equal(false)
    expect(isIndicatingHearingLoss('H0')).to.equal(false)
    expect(isIndicatingHearingLoss('I0')).to.equal(false)

    expect(isIndicatingHearingLoss('A2')).to.equal(false)
    expect(isIndicatingHearingLoss('B2')).to.equal(false)
    expect(isIndicatingHearingLoss('C2')).to.equal(false)
    expect(isIndicatingHearingLoss('D2')).to.equal(false)
    expect(isIndicatingHearingLoss('E2')).to.equal(false)
    expect(isIndicatingHearingLoss('F2')).to.equal(false)
    expect(isIndicatingHearingLoss('G2')).to.equal(false)
    expect(isIndicatingHearingLoss('H2')).to.equal(false)
    expect(isIndicatingHearingLoss('I2')).to.equal(false)

    expect(isIndicatingHearingLoss('A3')).to.equal(true)
    expect(isIndicatingHearingLoss('B3')).to.equal(true)
    expect(isIndicatingHearingLoss('C3')).to.equal(true)
    expect(isIndicatingHearingLoss('D3')).to.equal(true)
    expect(isIndicatingHearingLoss('E3')).to.equal(true)
    expect(isIndicatingHearingLoss('F3')).to.equal(true)
    expect(isIndicatingHearingLoss('G3')).to.equal(true)
    expect(isIndicatingHearingLoss('H3')).to.equal(true)
    expect(isIndicatingHearingLoss('I3')).to.equal(true)

    expect(isIndicatingHearingLoss('A6')).to.equal(true)
    expect(isIndicatingHearingLoss('B6')).to.equal(true)
    expect(isIndicatingHearingLoss('C6')).to.equal(true)
    expect(isIndicatingHearingLoss('D6')).to.equal(true)
    expect(isIndicatingHearingLoss('E6')).to.equal(true)
    expect(isIndicatingHearingLoss('F6')).to.equal(true)
    expect(isIndicatingHearingLoss('G6')).to.equal(true)
    expect(isIndicatingHearingLoss('H6')).to.equal(true)
    expect(isIndicatingHearingLoss('I6')).to.equal(true)
  })
})
