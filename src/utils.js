/* global Blob, XMLHttpRequest, document, window */
import { map, max, mean, sortBy, values } from 'lodash'

import configs from 'src/configs.js'
import { SILENCE, TestFrequencies } from 'src/constants.js'

const TEST_FREQUENCIES = TestFrequencies[configs.EXTENT]

const SPLtoHLMap = {
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
const CodeCurveTypeScales = {
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
const CodeSeverityValues = {
  '0': 10,
  '1': 21,
  '2': 33,
  '3': 48,
  '4': 63,
  '5': 81,
  '6': 91,
}

export function decibelsToGain(value) {
  if (value <= SILENCE) {
    return 0
  }

  return Math.exp(value / 8.6858)
}

function convertSPLtoHL(frequency, dbSPL) {
  return dbSPL - SPLtoHLMap[frequency]
}

function getAverageDistance(arr1, arr2) {
  return mean(arr1.map((x, i) => Math.abs(x - arr2[i])))
}

export function calculateAudiogramFromHearingTestResult(earVolumes) {
  return TEST_FREQUENCIES.map(frequency => earVolumes[frequency])
    .map(frequencyResults => mean(values(frequencyResults)))
    .map((volume, i) => convertSPLtoHL(TEST_FREQUENCIES[i], volume))
    .reduce(
      (aggr, dbHL) => (aggr.length === 0 ? [dbHL] : [...aggr, dbHL - aggr[0]]),
      []
    )
    .map((dbHL, i) => (i === 0 ? 0 : dbHL))
}

export function calculateHearingLossCodeFromHearingTestResult(earVolumes) {
  const audiogram = calculateAudiogramFromHearingTestResult(earVolumes)
  const highestAudiogramValue = max(audiogram)
  const normalizedAudiogram = audiogram.map(x => x / highestAudiogramValue)

  const distances = map(CodeCurveTypeScales, (scaleValues, scaleName) => ({
    scaleName,
    distance: getAverageDistance(normalizedAudiogram, scaleValues),
  }))
  const closestScale = distances.reduce(
    (closest, comparison) =>
      comparison.distance < closest.distance ? comparison : closest,
    distances[0]
  )
  const severities = map(CodeSeverityValues, (severityValue, severityKey) => ({
    severityKey,
    closeness: Math.abs(severityValue - highestAudiogramValue),
  }))
  const closestSeverity = sortBy(severities, x => x.closeness)[0]

  return `${closestScale.scaleName}${closestSeverity.severityKey}`
}

export function fetchAudioBuffer(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}

/**
 * Downloads some data as a file
 *
 * @link https://github.com/kennethjiang/react-file-download/blob/master/file-download.js
 */
export function downloadAsFile(data, filename, mime) {
  const blob = new Blob([data], { type: mime || 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename)
  } else {
    const blobURL = window.URL.createObjectURL(blob)
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }

    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  }
}
