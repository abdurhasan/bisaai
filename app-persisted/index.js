const fs = require('fs');
const util = require('util');
const FR = util.promisify(fs.readdir);
const FS = util.promisify(fs.readFile);
const print = console.log;
const dir = './storage_JSON/'
const bigData = new Array






const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';


const dbName = 'bisaai';


MongoClient.connect(url, function (err, client) {

    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});







// FR(dir).then(
//     snap => {
//         snap.map(async el => {
//             let datum = await FS(dir + el, 'utf8')
//             datum = JSON.parse(datum)
//             datum['_id'] = datum['id']
//             delete datum.id
//             return console.log(datum)
//         })
//     }
// ) 