


function arrayKeyObject(arr, value) {
    if (!Array.isArray(arr)) return arr
    

    return arr.reduce((a, b) => (a[b] = value, a), {});
}


function queryParser(req, res, next) {



}

module.exports = {
    arrayKeyObject
}