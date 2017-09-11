const MongoClient = require('mongodb').MongoClient

const configs = require('./configs.js')

let db = null

module.exports.connect = () => {
  if (db !== null) {
    return Promise.resolve(db)
  }

  return MongoClient.connect(configs.mongoUrl).then(connection => {
    db = connection
    return db
  })
}

module.exports.disconnect = () => db.close()
