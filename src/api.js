/* global fetch */
/* eslint import/prefer-default-export: 0 */
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
