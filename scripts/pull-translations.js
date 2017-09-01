/* global fetch */
require('isomorphic-fetch')
const fs = require('fs')
const path = require('path')
const qs = require('qs')

const TARGET_DIR = './l10n/translations'
const API_TOKEN = '74a81d1b9b289c1cb1ecf011ab1d232c'
const PROJECT_ID = '127499'
const PROJECT_LANGUAGES = ['es', 'it']

const getPoLink = language =>
  fetch('https://api.poeditor.com/v2/projects/export', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      api_token: API_TOKEN,
      id: PROJECT_ID,
      language: language,
      type: 'po',
    }),
  }).then(response => response.json())

const writePoFile = (filePath, contents) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, contents, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

PROJECT_LANGUAGES.forEach(lang => {
  getPoLink(lang)
    .then(response => response.result.url)
    .then(poUrl => fetch(poUrl))
    .then(poResponse => poResponse.text())
    .then(contents =>
      writePoFile(path.resolve(TARGET_DIR, `${lang}.po`), contents)
    )
    .catch(err => console.error(err))
})
