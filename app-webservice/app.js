require('dotenv').config({ path: process.cwd() + '/../.env' })
const path = require('path');
const fs = require('fs');
const util = require('util');
const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT

});
const channel = process.env.SCRAPER_CHANNEL;
const express = require('express')
const app = express()
const cors = require('cors')


const FS = util.promisify(fs.readdir);
const FW = util.promisify(fs.writeFile);

const { IsValidJSONString } = require('./helper')


redis.on('message', async (channel, message) => {
    let fileDir = `${process.env.STORAGE_DIR}/${Date.now()}`

    if (IsValidJSONString(message)) {
        fileDir += '.json'
    } else {
        fileDir += '.txt'
    }
    FW(fileDir, message)
        .then(() => console.log(`data has been saved : ${fileDir} \n`))
        .catch(err => console.log('Error : ', err))




});



redis.subscribe(channel, (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`App is subcribing on channel : ${channel}`)
});


app.use(cors())

app.use('/storage', express.static(process.env.STORAGE_DIR))

app.get('/', async function (req, res) {
    let result = new Object
    const listDir = await FS(process.env.STORAGE_DIR)

    if (listDir) listDir.map(el => {
        if (path.extname(el) == '.json') result[el] = `${process.env.BASE_URL}storage/${el}`
    })

    res.send(result)
})



app.listen(process.env.APP_PORT, () => console.log(`Nodejs App is running on port : ${process.env.APP_PORT}`))







