/* global XMLHttpRequest, document, window */
import { forEach, forOwn, max, min } from 'lodash'

import { SILENCE } from 'src/constants.js'

export function normalize(arr) {
  if (arr.every(x => x === 0)) {
    return arr
  }

  const minValue = min(arr)
  const maxValue = max(arr)
  if (minValue === maxValue) {
    return arr.fill(0)
  }
  return arr.map(x => (x - minValue) / (maxValue - minValue))
}

export function pickArr(arr, indices) {
  return arr.filter((x, i) => indices.includes(i))
}

/**
 * This function returns a copy of an object with all properties
 * that have a NaN value removed. It does so in a way that works
 * on iOS 10.x where numeric keys and float values wreaks havoc.
 *
 * @see https://github.com/vuejs/vue/issues/5348
 */
export function omitNaNs(object) {
  const result = { ...object }
  forOwn(object, (value, key) => {
    if (isNaN(value)) {
      delete result[key]
    }
  })
  return result
}

export function decibelsToGain(value) {
  if (value <= SILENCE) {
    return 0
  }

  return Math.exp(value / 8.6858)
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
export function downloadAsFile(blob, filename) {
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

/**
 * Submits a POST request to a new window
 */
export function openPostRequestInNewWindow({ url, body }) {
  const form = document.createElement('form')
  form.setAttribute('method', 'post')
  form.setAttribute('action', url)
  form.setAttribute('target', 'view')

  forEach(body, (fieldValue, fieldKey) => {
    const hiddenField = document.createElement('input')
    hiddenField.setAttribute('type', 'hidden')
    hiddenField.setAttribute('name', fieldKey)
    hiddenField.setAttribute('value', fieldValue)
    form.appendChild(hiddenField)
  })

  document.body.appendChild(form)
  window.open('', 'view')
  form.submit()
}
