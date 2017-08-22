/* global XMLHttpRequest */
import { mean, values } from 'lodash'

import { SILENCE, TEST_FREQUENCIES } from 'src/constants.js'

export function decibelsToGain(value) {
  if (value <= SILENCE) {
    return 0
  }

  return Math.round(Math.exp(value / 8.6858) * 10000) / 10000
}

const SPLtoHLMap = {
  '125': 45,
  '250': 27,
  '500': 13.5,
  '1000': 7.5,
  '2000': 9,
  '4000': 12,
  '8000': 15.5,
}

function convertSPLtoHL(frequency, dbSPL) {
  return dbSPL - SPLtoHLMap[frequency]
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
