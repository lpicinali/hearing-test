const env = require('./environment.js')

const configs = {
  development: {
    mongoUrl: 'mongodb://localhost/hearingtest',
  },
  stage: {
    mongoUrl: process.env.MONGO_URL,
  },
  production: {
    mongoUrl: process.env.MONGO_URL,
  },
}

module.exports = configs[env]
