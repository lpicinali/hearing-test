/* global fetch */
import qs from 'qs'

import configs from 'src/configs.js'

export default function fetchResultsPdf({ html }) {
  return fetch(configs.pdfUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({ text: html }),
  }).then(res => res.blob())
}
