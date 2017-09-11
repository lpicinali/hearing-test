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
      req.db = {
        connection,
        disconnect: db.disconnect,
      }
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

const devOnly = () => (req, res, next) => {
  if (env === 'DEVELOPMENT') {
    next()
  } else {
    res.status(404).json({
      status: 'error',
      errors: [
        {
          message: 'The requested resource does not exist',
        },
      ],
    })
  }
}

module.exports.assertParams = assertParams
module.exports.provideDb = provideDb
module.exports.devOnly = devOnly
