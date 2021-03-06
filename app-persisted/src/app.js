require('dotenv').config()
require('module-alias/register')

const { IsValidJSONString, StringFilter } = require('@helper')
const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT

});
const channel = process.env.SCRAPER_CHANNEL;
const initializeDatabases = require('@database')



redis.subscribe(channel, (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`App is subcribing on channel : ${channel}`)
});




const app = async () => {

    try {
        const DB = await initializeDatabases()
        if (!DB) throw new Error('Failed to make all database connections!')

        console.log('DB is connected on pid : ', process.pid)

        redis.on('message', async (channel, metaData) => {
            const _datum = new Object

            if (IsValidJSONString(metaData)) {
                const _dataTweet = JSON.parse(metaData)
                _datum['_id'] = Number(_dataTweet['id'])
                _datum['user'] = _dataTweet.user.screen_name
                _datum['followers'] = Number(_dataTweet.user.followers_count)
                _datum['tweet'] = _dataTweet.hasOwnProperty('extended_tweet') ? _dataTweet.extended_tweet.full_text : _dataTweet.text
                _datum['label'] = ""
                _datum['time'] = Number(_dataTweet['timestamp_ms'])

                DB.insertOne(_datum)
                    .then(
                        () => {
                            console.log('data has been saved')
                            delete _dataTweet
                        }
                    )
                    .catch(err => console.log(err))

            }


        })

    } catch (error) {
        console.error(error)
        process.exit(1)

    }

}



module.exports = app