/* eslint new-cap: 0 */
const express = require('express')

const api = require('./index.js')

const app = new express()
app.set('port', process.env.PORT || 8264)

// API
app.use('/api', api)

app.listen(app.get('port'), error => {
  if (error) {
    console.error(error)
  } else {
    console.info('Running API at port %s', app.get('port'))
  }
})
