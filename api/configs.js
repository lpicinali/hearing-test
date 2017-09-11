const env = require('./environment.js')

const configs = {
  development: {
    mongoUrl: 'mongodb://localhost/hearingtest',
  },
  stage: {
    mongoUrl: process.env.MONGODB_URI,
  },
  production: {
    mongoUrl: process.env.MONGODB_URI,
  },
}

module.exports = configs[env]
