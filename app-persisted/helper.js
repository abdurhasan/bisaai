require('dotenv').config()

const { MongoClient } = require('mongodb');
const mongoUri = process.env.MONGODB_URI
const mongoDatabase = process.env.MONGODB_DATABASE
const mongoCollection = process.env.MONGODB_COLLECTION

function IsValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function StringFilter(str) {
    return str.replace(/(aaaa,?|\n)/g, " ")
}





const executeMongoQuery = ({ data, order, filter, select }) => {

    filter = filter ? filter : {}
    select = select ? select : {}

    return new Promise(async (resolve, reject) => {
        MongoClient.connect(mongoUri, { useUnifiedTopology: true }, (err, client) => {
            const DB = client.db(mongoDatabase).collection(mongoCollection);

            if (order && !err) {

                switch (order) {
                    case "Find":
                        console.log(filter, { user: 0, _id: 0 })
                        DB.find(filter, { user: 0, _id: 0 }).toArray((err, docs) => {
                            client.close();
                            if (err) reject({
                                ReturnMessage: err.toString(),
                                ReturnCode: -10,
                                ReturnType: 3,
                                docs
                            });
                            resolve(docs);
                        });
                        break;
                    case "InsertOne":
                        DB.insertOne(data, (err, response) => {
                            client.close();
                            if (err) reject(err)
                            resolve(response)
                        })
                        break;
                    case "InsertMany":
                        if (!Array.isArray(data) || !data.length > 0) {
                            
                            DB.insertMany(data, function (err, docs) {
                                assert.equal(err, null);
                                client.close();
                                resolve(docs)
                            });

                        }
                        reject('Data can not inserted as Many')

                        break;
                    default:
                        reject('Cannot find the order');
                        break;
                }
            } else {
                client.close();
                reject('Cannot run the query');
            }
        });
    });
};


module.exports = {
    IsValidJSONString,
    StringFilter,
    executeMongoQuery
}