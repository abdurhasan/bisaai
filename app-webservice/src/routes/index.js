const mquery = require('mquery')
const print = console.log
const { arrayKeyObject } = require('@helper')

module.exports = function (app, dbs) {
    const Query = mquery(dbs)
    const defaultSelect = { user: 1, timestamp_ms: 1, label: 1, text: 1 }

    app.get('/', async (req, res) => {
        const { detail, id, select } = req.query

        let selectOption = select ? arrayKeyObject(select.split(','), 1) : defaultSelect
        if (detail == 'true') selectOption = {}
        
        print(selectOption)
        let rows = await Query.select(selectOption).find({})
        

        res.json(rows)


    })

    return app
}


