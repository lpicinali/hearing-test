const express = require('express')

const pdfApp = require('./index.js')

const app = new express()
app.set('port', process.env.PORT || 8265)

app.use('/pdf', pdfApp)

app.listen(app.get('port'), () => {
  console.info(`PDF server running on port ${app.get('port')}`)
})
