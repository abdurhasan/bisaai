const { MongoClient } = require('mongodb')

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const mongoDatabase = process.env.MONGODB_DATABASE || 'bisaai'
const mongoCollection = process.env.MONGODB_COLLECTION || 'twitter'
require('dotenv').config()



module.exports = function () {
    return MongoClient.connect(mongoURI, { useUnifiedTopology: true })
        .then(client => Promise.resolve(client.db(mongoDatabase)))
        .catch(err => Promise.reject(err))

}


