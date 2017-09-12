const nodemailer = require('nodemailer')

const configs = require('./configs.js')

module.exports = function sendEmail({ from, to, subject, text, html }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: configs.smtp.host,
      port: configs.smtp.port,
      auth: {
        user: configs.smtp.user,
        pass: configs.smtp.password,
      },
    })

    const emailPayload = { from, to, subject, text, html }

    transporter.sendMail(emailPayload, (err, info) => {
      if (err) {
        reject(err)
      } else {
        console.log('Message %s sent: %s', info.messageId, info.response)
        resolve()
      }
    })
  })
}
