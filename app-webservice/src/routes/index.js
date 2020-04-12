const mquery = require('mquery')
const print = console.log
const isEmpty = require('is-empty')



module.exports = function (app, dbs) {



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

    return app
}


