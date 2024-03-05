var _ = require('lodash');


var parseObject = (object) => {
    _.forIn(object, (val, key) => {
        if (val && typeof val == "string") {
            object[key] = val.replace("'", "''");
        }
        else if (val && typeof val == "object") {  
            object[key] = parseObject(val);
        }
        else if (val && Array.isArray(val)) {
            object[key] = parseArray(val);
        }
    })
    return object;
}

var parseArray = (data) => {
    data.filter((k) => {
        _.forIn(k, (val, key) => {
            if (val && typeof val == "string") {
                k[key] = val.replace("'", "''");
            } else if (val && typeof val == "object") {
                object[key] = parseObject(val);
            }
            else if (val && Array.isArray(val)) {
                object[key] = parseArray(val);
            }
        })
    })
    return data
}

exports.qryString = function (data) {
    
    if (typeof data == 'object' && data) {
        return parseObject(data);
    }
    else if (Array.isArray(data)) {
        if (data && data.length > 0) {
           return parseArray(data)
        }
    }
    else {
        return data
    }

};


