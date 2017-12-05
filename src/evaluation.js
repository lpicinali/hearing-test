import { keys, map, max, mean, reduce, sortBy, values } from 'lodash'

import { AUDIOGRAM_FREQUENCIES } from 'src/constants.js'
import { normalize, pickArr } from 'src/utils.js'

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
  F: [0, 1, 1 / 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2],
  G: [0, 1 / 2, 1, 1 / 2, 1 / 2, 1 / 2, 1 / 2],
  H: [0, 0, 1 / 2, 1, 1 / 2, 1 / 2, 1 / 2],
  I: [0, 0, 0, 1 / 2, 1, 1 / 2, 1 / 2],
  J: [0, 0, 0, 0, 1 / 2, 1, 1 / 2],
  K: [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
}

/**
 * Maps hearing loss code severity levels to a maximum dB HL value
 */
export const CodeSeverityValues = {
  // Using an all-zero value throws off calculations for low-severity
  // audiograms. For instance, an F0 audiogram will yield a code of A0.
  '0': 0.0001,
  '1': 10,
  '2': 20,
  '3': 30,
  '4': 40,
  '5': 50,
  '6': 60,
}

export function convertSPLtoHL(frequency, dbSPL) {
  return dbSPL - SPLtoHLMap[frequency]
}

export function getAverageDistance(arr1, arr2) {
  return mean(arr1.map((x, i) => Math.abs(x - arr2[i])))
}

/**
 * Returns an audiogram with all missing frequency values filled
 * out using the given scale.
 */
export function getProjectedAudiogram(audiogram, scale) {
  const scaleValues = CodeCurveTypeScales[scale]
  const maxValue = max(values(audiogram))
  const maxValueFrequency = reduce(
    audiogram,
    (curr, value, frequency) => (value > audiogram[curr] ? frequency : curr),
    keys(audiogram)[0]
  )
  const maxValueFrequencyIndex = AUDIOGRAM_FREQUENCIES.indexOf(
    maxValueFrequency
  )
  const maxValueFrequencyValue = scaleValues[maxValueFrequencyIndex]

  return AUDIOGRAM_FREQUENCIES.reduce((aggr, frequency) => {
    let frequencyValue = audiogram[frequency]

    if (frequencyValue === undefined) {
      frequencyValue =
        maxValue *
        scaleValues[AUDIOGRAM_FREQUENCIES.indexOf(frequency)] /
        maxValueFrequencyValue
    }

    return { ...aggr, [frequency]: frequencyValue }
  }, {})
}

/**
 * Takes a set of hearing test values (one UP and one DOWN values
 * per frequency) and returns an audiogram object.
 */
export function calculateAudiogramFromHearingTestResult(earVolumes) {
  // Throw a RangeError if one or more of the provided frequencies
  // are not supported.
  if (keys(earVolumes).some(x => AUDIOGRAM_FREQUENCIES.includes(x) === false)) {
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
  //
  // TODO: This normalization makes a crazy bad but even
  // result look perfectly normal. Find out whether this
  // is the desired behaviour.
  const firstFrequency = keys(earVolumes)[0]
  const normalizedVolumes = reduce(
    dbHLEarVolumes,
    (aggr, volume, frequency) => ({
      ...aggr,
      [frequency]: volume - dbHLEarVolumes[firstFrequency],
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
  if (keys(audiogram).some(x => AUDIOGRAM_FREQUENCIES.includes(x) === false)) {
    throw new RangeError('Unsupported frequency provided')
  }

  // Determine the scale(s) closest to the input audiogram
  const frequencyIndices = keys(audiogram).map(frequency =>
    AUDIOGRAM_FREQUENCIES.indexOf(frequency)
  )
  const distances = map(CodeCurveTypeScales, (scaleValues, scaleName) => ({
    scaleName,
    distance: getAverageDistance(
      normalize(values(audiogram)),
      normalize(pickArr(scaleValues, frequencyIndices))
    ),
  }))
  const closestScale = distances.reduce(
    (closest, comparison) =>
      comparison.distance < closest.distance ? comparison : closest,
    distances[0]
  )
  const closestScales = distances.filter(
    x => x.distance === closestScale.distance
  )

  // Now, for each matching scale, create a projection of the audiogram onto
  // that scale and determine the closest severity
  const results = closestScales.map(({ scaleName }) => {
    const projectedAudiogram = getProjectedAudiogram(audiogram, scaleName)
    const maxProjectedValue = max(values(projectedAudiogram))
    const closestSeverity = reduce(
      CodeSeverityValues,
      (curr, value, severity) =>
        Math.abs(maxProjectedValue - value) <
        Math.abs(maxProjectedValue - CodeSeverityValues[curr])
          ? severity
          : curr,
      0
    )
    return `${scaleName}${closestSeverity}`
  })

  return results
}

/**
 * Returns the code from an array of codes that is considered the
 * median code out of those codes.
 */
export function getMedianCode(codes) {
  if (codes.length <= 2) {
    return codes[0]
  }

  const sortedCodes = sortBy(codes)
  const leftPivotedMiddleIndex = Math.floor(
    (codes.length - (codes.length % 2 === 0 ? 1 : 0)) / 2
  )
  return sortedCodes[leftPivotedMiddleIndex]
}

/**
 * Returns whether a hearing loss severity code is deemed
 * as indicating a potential hearing loss.
 */
export function isIndicatingHearingLoss(code) {
  const [, severity] = code.split('')
  return parseInt(severity) >= 2
}
