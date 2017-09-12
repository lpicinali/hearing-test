/* global fetch */
import qs from 'qs'

import configs from 'src/configs.js'

export const submitQuestionnaire = ({ answers }) =>
  fetch(`${configs.apiUrl}/questionnaire/answers`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({ answers }),
  }).then(res => res.json())

export const emailResults = ({ audiograms, codes, recipient }) =>
  fetch(`${configs.apiUrl}/email-results`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({ audiograms, codes, recipient }),
  }).then(res => res.json())
