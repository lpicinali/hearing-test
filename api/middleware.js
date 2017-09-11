const configs = require('./configs.js')
const db = require('./db.js')
const env = require('./environment.js')

const assertParams = params => (req, res, next) => {
  params.forEach(param => {
    if (!req.body[param]) {
      res.status(400).json({
        status: 'error',
        errors: [
          {
            message: `${param} must not be empty`,
          },
        ],
      })
    }
  })

  next()
}

const provideDb = () => (req, res, next) => {
  db
    .connect(configs.mongoUrl)
    .then(connection => {
      req.db = connection
      next()
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({
        status: 'error',
        errors: [
          {
            message: 'Connection error',
          },
        ],
      })
    })
}

const authorize = () => (req, res, next) => {
  if (req.headers.authorization !== 'Basic M2R0aTomKkAhKKMmZG1KbFowMDAwMA==') {
    res.status(401).json({
      status: 'error',
      errors: [
        {
          message: 'Authorization needed',
        },
      ],
    })
  } else {
    next()
  }
}

module.exports.assertParams = assertParams
module.exports.provideDb = provideDb
module.exports.authorize = authorize
