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
const { createArrayCsvWriter } = require('csv-writer')

const FS = util.promisify(fs.readdir);
const FW = util.promisify(fs.writeFile);

const { IsValidJSONString, StringFilter } = require('./helper')


// ===================== CSV WRITER
let fileDirCSV = `${process.env.STORAGE_CSV}/data.csv`


redis.on('message', async (channel, metaData) => {
    let fileDirJSON = `${process.env.STORAGE_JSON}/${Date.now()}.json`

    const csvWriter = createArrayCsvWriter({
        path: fileDirCSV,
        header: ['ID', 'NAME', 'TWEET'],
        append: true
    });

    if (IsValidJSONString(metaData)) {
        let _dataTweet = JSON.parse(metaData)
        let records = [[_dataTweet.id, _dataTweet.user.screen_name, StringFilter(_dataTweet.text)]]

        csvWriter.writeRecords(records)
            .then(() => {
                console.log('CSV...Done');
            });



        FW(fileDirJSON, metaData)
            .then(() => console.log(`data has been saved : ${fileDirJSON} \n`))
            .catch(err => console.log('Error : ', err))

    }


});



redis.subscribe(channel, (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`App is subcribing on channel : ${channel}`)
});


app.use(cors())

app.use('/storage', express.static(process.env.STORAGE_JSON))

app.get('/', async function (req, res) {
    let result = new Object
    const listDir = await FS(process.env.STORAGE_JSON)

    if (listDir) listDir.map(el => {
        if (path.extname(el) == '.json') result[el] = `${process.env.BASE_URL}storage/${el}`
    })

    res.send(result)
})



app.listen(process.env.APP_PORT, () => console.log(`Nodejs App is running on port : ${process.env.APP_PORT}`))







