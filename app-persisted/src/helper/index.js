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


function print(any) {
    console.log(any)
}


module.exports = {
    IsValidJSONString,
    StringFilter,    
    print
}