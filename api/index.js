const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const requestIp = require('request-ip')
const _ = require('lodash')
const path = require('path')

const disconnect = require('./db.js').disconnect
const middleware = require('./middleware.js')
const sendEmail = require('./sendEmail.js')
const createPdf = require('./pdf/createPdf.js')

const api = express.Router()

api.use(bodyParser.urlencoded({ extended: true }))
api.use(cors())
api.use(morgan('combined'))

// Root endpoint
api.get('/', (req, res) => {
  res.json({
    status: 'ok',
  })
})

// Lists all answers
api.get(
  '/questionnaire/answers',
  middleware.authorize(),
  middleware.provideDb(),
  (req, res) => {
    req.db
      .collection('answers')
      .find({})
      .toArray()
      .then(docs => {
        disconnect(req.db)
        res.json({
          status: 'ok',
          data: docs,
        })
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({
          status: 'error',
          errors: [
            {
              message: 'Something went wrong',
            },
          ],
        })
      })
  }
)

// Stores a set of answers
api.post(
  '/questionnaire/answers',
  middleware.assertParams(['answers']),
  middleware.provideDb(),
  requestIp.mw(),
  (req, res) => {
    const answers = req.body.answers

    const meta = {
      userIp: req.clientIp,
      submittedAt: new Date(),
    }

    req.db
      .collection('answers')
      .insertOne({ answers, meta })
      .then(() => {
        disconnect(req.db)
        res.status(201).json({ status: 'ok' })
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({
          status: 'error',
          errors: [
            {
              message: 'Something went wrong',
            },
          ],
        })
      })
  }
)

// Send results in an email
api.post(
  '/email-results',
  middleware.assertParams(['audiograms', 'codes', 'recipient']),
  (req, res) => {
    const from = 'info@3d-tune-in.eu'
    const to = req.body.recipient
    const subject = 'Your 3D Tune-In Hearing Test results'

    const frequencies = ['125', '250', '500', '1000', '2000', '4000', '8000']

    const text = `
Thanks for taking the 3D Tune-In Hearing Test! Here are your results.

Hearing loss severity score:

Left ear: ${req.body.codes.LEFT}
Right ear: ${req.body.codes.RIGHT}

Audiograms:

Left ear: ${_.map(
      req.body.audiograms.LEFT,
      (value, i) => `${frequencies[i]} Hz: ${value} dB`
    ).join(', ')}
Right ear: ${_.map(
      req.body.audiograms.RIGHT,
      (value, i) => `${frequencies[i]} Hz: ${value} dB`
    ).join(', ')}

For more information about the 3D Tune-In project and apps, visit our website at http://3d-tune-in.eu/.
`

    const html = text.replace(/\n/g, '<br />')

    sendEmail({ from, to, subject, text, html })
      .then(() =>
        res.json({
          status: 'ok',
        })
      )
      .catch(err => {
        console.error(err)
        res.status(500).json({
          status: 'error',
          errors: [
            {
              message: 'The email could not be sent at this moment',
            },
          ],
        })
      })
  }
)

// PDF download
api.get('/results/download', (req, res) => {
  const { pdfId } = req.query
  res.download(path.resolve(__dirname, '../public', 'pdf', `${pdfId}.pdf`))
})

api.post('/results/download', (req, res) => {
  createPdf(req.body)
    .then(pdfId => res.json({ status: 'ok', data: { pdfId } }))
    .catch(err => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        errors: [
          {
            // detail: err.message,
            message: 'We could not create the PDF at this time.',
          },
        ],
      })
    })
})

module.exports = api
