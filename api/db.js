const MongoClient = require('mongodb').MongoClient

const configs = require('./configs.js')

module.exports.connect = () => MongoClient.connect(configs.mongoUrl)

module.exports.disconnect = db => db.close()
