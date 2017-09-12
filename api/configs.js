const env = require('./environment.js')

const smtp = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASS,
}

const configs = {
  DEVELOPMENT: {
    mongoUrl: 'mongodb://localhost/hearingtest',
    smtp: {
      host: 'smtp.gmail.com',
      port: 465,
      user: 'alexander.kandis.wallin@gmail.com',
      password: process.env.SMTP_PASS,
    },
  },
  STAGE: {
    mongoUrl: process.env.MONGODB_URI,
    smtp,
  },
  PRODUCTION: {
    mongoUrl: process.env.MONGODB_URI,
    smtp,
  },
}

module.exports = configs[env]
