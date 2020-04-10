require('dotenv').config()
require('module-alias/register')

const { IsValidJSONString, StringFilter, print } = require('@helper')
const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT

});
const channel = process.env.SCRAPER_CHANNEL;
const initializeDatabases = require('@database')
const ObjectID = require("bson-objectid").generate


redis.subscribe(channel, (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`App is subcribing on channel : ${channel}`)
});



initializeDatabases().then(DB => {

    redis.on('message', async (channel, metaData) => {


        if (IsValidJSONString(metaData)) {
            let _dataTweet = JSON.parse(metaData)
            _dataTweet['_id'] = _dataTweet['id'] || ObjectID()
            _dataTweet['label'] = " "
            delete _dataTweet['id']
            delete _dataTweet['id_str']

            const saveData = await DB.insertOne(_dataTweet)


            console.log(saveData)
        }


    });



})



