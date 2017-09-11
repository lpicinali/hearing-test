const env = require('./environment.js')

const configs = {
  DEVELOPMENT: {
    mongoUrl: 'mongodb://localhost/hearingtest',
  },
  STAGE: {
    mongoUrl: process.env.MONGODB_URI,
  },
  PRODUCTION: {
    mongoUrl: process.env.MONGODB_URI,
  },
}

module.exports = configs[env]
