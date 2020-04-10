require('dotenv').config()
require('module-alias/register')

const express = require('express')
const app = express()
const initializeDatabases = require('@database')
const routes = require('@routes')
const port = process.env.APP_PORT_WEBSERVICE || 8000
const cors = require('cors')


initializeDatabases().then(dbs => {
    
    app.use(cors())
    routes(app, dbs).listen(port, () => console.log(`Listening on port http://localhost:${port}`))

}).catch(err => {
    console.error('Failed to make all database connections!')
    console.error(err)
    process.exit(1)
})



