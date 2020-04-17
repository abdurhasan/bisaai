require('dotenv').config()
require('module-alias/register')

const express = require('express')
const app = express()
const initializeDatabases = require('@database')
const routes = require('@routes')
const port = process.env.APP_PORT_WEBSERVICE || 8000
const cors = require('cors')
const bodyParser = require('body-parser')




const bootstrap = async () => {
    try {
        const initDB = await initializeDatabases()
        if (!initDB) throw new Error('Failed to make all database connections!')

        app.use(cors())
        app.use(bodyParser())

        return routes(app, initDB).listen(port, () => console.log(`Listening on port http://localhost:${port} pid ${process.pid}`))

    } catch (error) {

        console.error(error)
        process.exit(1)
    }



}

module.exports = bootstrap


