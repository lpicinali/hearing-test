/* eslint new-cap: 0 */
const express = require('express')
const path = require('path');

const app = new express()
app.set('port', (process.env.PORT || 8263))

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(app.get('port'), (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", app.get('port'), app.get('port'))
  }
})