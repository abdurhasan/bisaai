const mquery = require('mquery')
const print = console.log
const { arrayKeyObject } = require('@helper')




module.exports = function (app, dbs) {
    const Query = mquery(dbs)
    const defaultSelect = { user: 1, timestamp_ms: 1, label: 1, text: 1 }

    app.get('/', async (req, res) => {
        const { detail, id, select } = req.query

        // let selectOption = select ? arrayKeyObject(select.split(','), 1) : defaultSelect
        if (detail == 'true') selectOption = {}


        // let result = new Array
        let rows = await Query.select({}).find({})

        // rows = rows.map(rw => {
        //     const _datum = {}
        //     _datum['_id'] = rw['_id'] 
        //     _datum['user'] = rw.user.screen_name
        //     _datum['followers'] = rw.user.followers_count
        //     _datum['tweet'] = rw.hasOwnProperty('extended_tweet') ? rw.extended_tweet.full_text : rw.text
        //     _datum['label'] = rw.label
        //     _datum['time'] = rw['timestamp_ms']

        //     return _datum

        // })




        res.json(rows)


    })

    return app
}


