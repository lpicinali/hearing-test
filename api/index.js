const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const requestIp = require('request-ip')

const middleware = require('./middleware.js')

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

// Dev-only: Lists all answers
api.get(
  '/questionnaire/answers',
  middleware.devOnly(),
  middleware.provideDb(),
  (req, res) => {
    req.db.connection
      .collection('answers')
      .find({})
      .toArray()
      .then(docs => {
        req.db.disconnect()
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

    req.db.connection
      .collection('answers')
      .insertOne({ answers, meta })
      .then(() => res.status(201).json({ status: 'ok' }))
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

module.exports = api
