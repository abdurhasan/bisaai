const fs = require('fs');
const util = require('util');
const FR = util.promisify(fs.readdir);
const FS = util.promisify(fs.readFile);
const print = console.log;


const express = require('express')
const app = express()


// const { executeMongoQuery } = require('./helper')

// app.get('/', async function (req, res) {

//     const doc = await executeMongoQuery({ order: 'Find', filter: { "_id": 1247805138707701800 } })


//     res.json(doc)
// })



// app.listen(process.env.APP_PORT, () => console.log(`Nodejs App is running on port : ${process.env.APP_PORT}`))



