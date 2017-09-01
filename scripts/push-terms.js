/* global fetch */
require('isomorphic-fetch')
const fs = require('fs')
const FormData = require('form-data')

const API_TOKEN = '74a81d1b9b289c1cb1ecf011ab1d232c'
const PROJECT_ID = '127499'

const form = new FormData()
form.append('api_token', API_TOKEN)
form.append('id', PROJECT_ID)
form.append('updating', 'terms_translations')
form.append('language', 'en')
form.append('file', fs.createReadStream('./l10n/source.pot'))
form.append('sync_terms', '1')

fetch('https://api.poeditor.com/v2/projects/upload', {
  method: 'POST',
  headers: form.getHeaders(),
  body: form,
})
  .then(response => response.json())
  .then(results => console.log(results))
  .catch(err => console.error(err))
