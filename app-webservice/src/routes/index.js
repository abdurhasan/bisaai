const mquery = require('mquery')
const print = console.log
const isEmpty = require('is-empty')



module.exports = function (app, dbs) {

    app.get('/', (req, res) => res.json({ message: 'welcome to Bisa Ai', pid : process.pid }))

    app.get('/:collectionDB', async (req, res) => {
        const { collectionDB } = req.params
        let { select, skip, limit, search, equal, gte, gt, lte, lt, like } = req.query

        select = isEmpty(select) ? {} : select.replace(/,/g, ' ')
        search = isEmpty(search) ? {} : search.trim()

        skip = skip ? Number(skip) : 0
        limit = limit ? Number(limit) : 50

        let Query = mquery(dbs.collection(collectionDB))
        const searchRes = {}

        if (search) {
            let _search = {}

            if (!isNaN(gte)) _search['$gte'] = Number(gte)
            if (!isNaN(gt)) _search['$gt'] = Number(gt)
            if (!isNaN(lte)) _search['$lte'] = Number(lte)
            if (!isNaN(lt)) _search['$lt'] = Number(lt)
            if (!isNaN(equal)) _search = Number(equal)
            if (like) _search = new RegExp(`^${like}`, 'i')

            if (!isEmpty(_search)) searchRes[search] = _search

        }

        const rows = await Query.find(searchRes).skip(skip).limit(limit).select(select)

        res.json(rows)


    })

    app.post('/labeling', async (req, res) => {
        const ids = []
        const validData = []
        try {

            if (!Array.isArray(req.body)) throw new Error('Request body must be an array')
            req.body.map(el => {

                if (el._id && el.label) {

                    el.label = Number(el.label)
                    ids.push(el._id)
                    return validData.push(el)
                }
            })


            await dbs.collection('labeled').insertMany(validData)
            await mquery(dbs.collection('unlabeled')).where({ _id: { $in: ids } }).deleteMany()



            res.json({ success: true, message: `${ids.join(" ")}  has been labeled` })
        } catch (error) {
            return res.status(422).json({ success: false, message: error.message })
        }

    })

    return app
}


