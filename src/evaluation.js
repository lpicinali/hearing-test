import { flatten, keys, map, max, mean, reduce, sortBy, values } from 'lodash'

import configs from 'src/configs.js'
import { TestFrequencies } from 'src/constants.js'

const TEST_FREQUENCIES = TestFrequencies[configs.EXTENT]
const ALL_FREQUENCIES = ['125', '250', '500', '1000', '2000', '4000', '8000']

export const SPLtoHLMap = {
  '125': 45,
  '250': 27,
  '500': 13.5,
  '1000': 7.5,
  '2000': 9,
  '4000': 12,
  '8000': 15.5,
}

/**
 * Maps hearing loss code curve types to relative audiogram values
 */
export const CodeCurveTypeScales = {
  A: [0, 0, 0, 0, 0, 1 / 2, 1],
  B: [0, 0, 0, 0, 1 / 2, 1, 1],
  C: [0, 0, 0, 1 / 2, 1, 1, 1],
  D: [0, 0, 1 / 2, 1, 1, 1, 1],
  E: [0, 1 / 2, 1, 1, 1, 1, 1],
  F: [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
  G: [0, 0, 1 / 5, 2 / 5, 3 / 5, 4 / 5, 1],
  H: [0, 0, 0, 1 / 4, 2 / 4, 3 / 4, 1],
  I: [0, 0, 0, 0, 1 / 3, 2 / 3, 1],
}

/**
 * Maps hearing loss code severity levels to a maximum dB HL value
 */
export const CodeSeverityValues = {
  '0': 10,
  '1': 21,
  '2': 33,
  '3': 48,
  '4': 63,
  '5': 81,
  '6': 91,
}

export function convertSPLtoHL(frequency, dbSPL) {
  return dbSPL - SPLtoHLMap[frequency]
}

export function getDistance(vec1, vec2) {
  return Math.sqrt(
    vec1.reduce((aggr, vec1Value, i) => aggr + Math.pow(vec1[i] - vec2[i], 2))
  )
}

export function getAverageDistance(arr1, arr2) {
  return mean(arr1.map((x, i) => Math.abs(x - arr2[i])))
}

export function getNeighbouringFrequencyValue(earVolumes, frequency) {
  if (earVolumes[frequency] !== undefined) {
    return earVolumes[frequency]
  }

  const neighbourMap = {
    '125': ['250', '500', '1000', '2000', '4000', '8000'],
    '250': ['500', '1000', '125', '2000', '4000', '8000'],
    '500': ['1000', '250', '2000', '125', '4000', '8000'],
    '1000': ['2000', '500', '4000', '250', '125', '8000'],
    '2000': ['1000', '4000', '500', '8000', '250', '125'],
    '4000': ['2000', '8000', '1000', '500', '250', '125'],
    '8000': ['4000', '2000', '1000', '500', '250', '125'],
  }

  const prioritisedFrequencies = neighbourMap[frequency]
  const replacementFrequency = prioritisedFrequencies.find(
    x => earVolumes[x] !== undefined
  )

  return earVolumes[replacementFrequency]
}

/**
 * Takes a set of hearing test values (one UP and one DOWN values
 * per frequency) and returns an audiogram object.
 */
export function calculateAudiogramFromHearingTestResult(earVolumes) {
  // Throw a RangeError if one or more of the provided frequencies
  // are not supported.
  if (keys(earVolumes).some(x => ALL_FREQUENCIES.includes(x) === false)) {
    throw new RangeError('Unsupported frequency provided')
  }

  // Get mean values from UP/DOWN values
  const meanEarVolumes = reduce(
    earVolumes,
    (aggr, volumes, frequency) => ({
      ...aggr,
      [frequency]: mean(values(volumes)),
    }),
    {}
  )

  // Convert to dbHL
  const dbHLEarVolumes = reduce(
    meanEarVolumes,
    (aggr, volume, frequency) => ({
      ...aggr,
      [frequency]: convertSPLtoHL(frequency, volume),
    }),
    {}
  )

  // Normalize against the first value
  const firstFrequency = keys(earVolumes)[0]
  const normalizedVolumes = reduce(
    dbHLEarVolumes,
    (aggr, volume, frequency) => ({
      ...aggr,
      [frequency]:
        frequency === firstFrequency
          ? 0
          : dbHLEarVolumes[firstFrequency] - volume,
    }),
    {}
  )

  return normalizedVolumes
}

/**
 * Takes an audiogram and returns an array of 3DTI hearing
 * loss severity codes that closest matches the audiogram.
 */
export function calculateHearingLossCodesFromAudiogram(audiogram) {
  // Throw a RangeError if one or more of the provided frequencies
  // are not supported.
  if (keys(audiogram).some(x => ALL_FREQUENCIES.includes(x) === false)) {
    throw new RangeError('Unsupported frequency provided')
  }

  // Add values for the frequencies that are not included in the
  // input audiogram
  const sevenFrequencyAudiogram = ALL_FREQUENCIES.reduce(
    (aggr, frequency) => ({
      ...aggr,
      [frequency]:
        audiogram[frequency] !== undefined
          ? audiogram[frequency]
          : getNeighbouringFrequencyValue(audiogram, frequency),
    }),
    {}
  )

  const highestAudiogramValue = max(values(sevenFrequencyAudiogram))
  const normalizedAudiogram = reduce(
    sevenFrequencyAudiogram,
    (aggr, value, frequency) => ({
      ...aggr,
      [frequency]: value / highestAudiogramValue,
    }),
    {}
  )

  const distances = map(CodeCurveTypeScales, (scaleValues, scaleName) => ({
    scaleName,
    distance: getAverageDistance(values(normalizedAudiogram), scaleValues),
  }))
  const closestScale = distances.reduce(
    (closest, comparison) =>
      comparison.distance < closest.distance ? comparison : closest,
    distances[0]
  )
  const closestScales = distances.filter(
    x => x.distance === closestScale.distance
  )

  const severities = map(CodeSeverityValues, (severityValue, severityKey) => ({
    severityKey,
    closeness: Math.abs(severityValue - highestAudiogramValue),
  }))
  const closestSeverity = sortBy(severities, x => x.closeness)[0]
  const closestSeverities = severities.filter(
    x => x.closeness === closestSeverity.closeness
  )

  // console.log({
  //   audiogram,
  //   sevenFrequencyAudiogram,
  //   normalizedAudiogram,
  //   distances,
  //   closestScales,
  //   closestSeverities,
  // })

  return flatten(
    closestScales.map(({ scaleName }) =>
      closestSeverities.map(({ severityKey }) => `${scaleName}${severityKey}`)
    )
  )
}
