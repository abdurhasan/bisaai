
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
require('dotenv').config({ path: process.cwd() + '/../.env' })

const FS = util.promisify(fs.readdir);
const FW = util.promisify(fs.writeFile);

redis.on('message',  (channel, message) => {
    // if(JSON.parse(message)){
    //     await FW(`${process.env.STORAGE_DIR}/${Date.now()}.json`, message)
    // }
    console.log('We got message : ', message)
});


console.log(process.env.SCRAPER_CHANNEL )
// redis.subscribe(channel, (error, count) => {
//     if (error) {
//         throw new Error(error);
//     }
//     console.log('App is subcribing..')
// });


// app.use(cors())

// app.use('/storage', express.static(process.env.STORAGE_DIR))

// app.get('/', async function (req, res) {
//     let result = new Object
//     const listDir = await FS(process.env.STORAGE_DIR)

//     if (listDir) listDir.map(el => {
//         if (path.extname(el) == '.json') result[el] = `${process.env.BASE_URL}storage/${el}`
//     })

//     res.send(result)
// })



// app.listen(process.env.APP_PORT)







