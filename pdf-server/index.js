const express = require('express')
const morgan = require('morgan')
const phantom = require('phantom')
const tmp = require('tmp')
const path = require('path')

const app = express.Router()

const phantomPath = path.resolve(__dirname, '../node_modules/.bin/phantomjs')

app.use(morgan('combined'))

app.use((req, res, next) => {
  if (req.query.rawInput) {
    req.text = ''
    req.setEncoding('utf8')
    req.on('data', chunk => {
      req.text += chunk
    })
    req.on('end', next)
  } else {
    next()
  }
})

app.post('/', (req, res) => {
  console.log(req.text, req.body)

  if (!req.text && req.body.text) {
    req.text = req.body.text
  }

  if (typeof req.text !== 'string' || req.text.length === 0) {
    return res.status(500).json({
      error: 'Empty request',
    })
  }

  ;(async function() {
    const instance = await phantom.create([], {
      phantomPath,
    })

    const page = await instance.createPage()

    await page.property('paperSize', {
      format: 'A4',
    })

    await page.property('navigationLocked', true)

    await page.property('content', req.text)

    const tmpFile = tmp.fileSync({
      prefix: 'phantomjs-',
      postfix: '.pdf',
    })

    const pdf = await page.render(tmpFile.name)

    if (pdf) {
      res.set('Content-Type', 'application/pdf')
      res.sendFile(tmpFile.name)
    } else {
      res.status(500).json({
        error: 'Failed to create file',
      })
    }

    await instance.exit()
    tmpFile.removeCallback()
  })()
})

module.exports = app
