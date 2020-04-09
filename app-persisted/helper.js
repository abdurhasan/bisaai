function IsValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function StringFilter(str) {
    return str.replace(/(aaaa,?|\n)/g," ")
}



module.exports = {
    IsValidJSONString,
    StringFilter
}