var fs = require('fs'),
    path = require('path');
var shell = require('shelljs');
function capitalize_Words(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
exports.getFileNamePfx = function (table_nm) {
    newFileNamePfx = table_nm
    var rm_tx = ["_lst_t", "_rel_t", "_dtl_t"]
    rm_tx.forEach(function (item, index) {
        newFileNamePfx = newFileNamePfx.replace(item, "")
        if (index == rm_tx.length - 1) return newFileNamePfx
    })
    return capitalize_Words(newFileNamePfx.replace(/_/g, " ")).replace(/ /g, "")
};


/*****************************************************************************
* Function      : writeToFile
* Description   : Write content to a file after cleaning previous content
* Arguments     : file name, content
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.writeFile = function (file, content) {
    const parts = path.parse(file);
    if (!fs.existsSync(parts.dir)) {
        shell.mkdir('-p', parts.dir);
    }
    // TODO(joyeecheung): what if the file is a dir?
    fs.writeFileSync(file, content, 'utf8');
};
/*****************************************************************************
* Function      : writeJSONToFile
* Description   : Write content to a file after cleaning previous content
* Arguments     : file name, content
* History   
* 07/21/2019    ** Seetharam  ** Initial Code
******************************************************************************/
exports.writeJsonFile = function (file, content) {
    const parts = path.parse(file);
    if (!fs.existsSync(parts.dir)) {
        shell.mkdir('-p', parts.dir);
    }
    // TODO(joyeecheung): what if the file is a dir?
    fs.writeFileSync(file, content, 'utf8');
};


/*****************************************************************************
* Function      : removeKeyFields
* Description   : removes the primary keys from the list of fields
* Arguments     : file name, content
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.removeKeyFields = function (fields, pk) {
    arr = fields.split(",")
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === pk) {
            arr.splice(i, 1);
        }
    }
    return arr.join(',')
};

/*****************************************************************************
* Function      : onlyBsnsFlds
* Description   : removes the primary keys from the list of fields
* Arguments     : file name, content
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.onlyBsnsFlds = function (fields, pk) {
    new_fields = []
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].COLUMN_NAME === pk || fields[i].COLUMN_NAME === 'mrcht_id' || fields[i].COLUMN_NAME === 'a_in' || fields[i].COLUMN_NAME === 'i_ts' || fields[i].COLUMN_NAME === 'u_ts' || fields[i].COLUMN_NAME === 'd_ts') {
            void (0)
        } else {
            new_fields.push(fields[i])
        }
    }
    return new_fields
};


/*****************************************************************************
* Function      : onlyBsnsFldsInsert
* Description   : removes the primary keys from the list of fields
* Arguments     : file name, content
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.onlyBsnsFldsInsert = function (fields, pk) {
    insertFields = []

    for (var i = 0; i < fields.length; i++) {
        if (fields[i].hasOwnProperty('IS_CUSTOM') && fields[i].IS_CUSTOM) {
            if (fields[i].isMultiSelect) {
                void (0)
            }
        }
        if (fields[i].COLUMN_NAME === pk || fields[i].COLUMN_NAME === 'a_in' || fields[i].COLUMN_NAME === 'i_ts' || fields[i].COLUMN_NAME === 'u_ts' || fields[i].COLUMN_NAME === 'd_ts' || fields[i].COLUMN_NAME === 'crte_usr_id' || fields[i].COLUMN_NAME === 'updte_usr_id') {
            void (0)
        } else {
            if (fields[i].SWAGGER_DATA_TYPE == 'string')
                insertFields.push("'${data." + fields[i].COLUMN_NAME + "}'")
            else insertFields.push("${data." + fields[i].COLUMN_NAME + "}")
        }
        if (i == fields.length - 1) {
            return insertFields.join(",")
        }
    }

};


/*****************************************************************************
* Function      : getCompName
* Description   : get angular componet name
* Arguments     : file name, content
* History   
* 07/21/2019    ** Sunil Mulagada  ** Initial Code
******************************************************************************/
exports.getCompName = function (clientFileName) {

    return capitalize_Words(clientFileName.replace(/-/g, " ")).replace(/ /g, "")

};
/*****************************************************************************
* Function      : getPrimaryKey
* Description   : get primary key from fields
* Arguments     : fields
* History   
* 07/21/2019    ** Seethara  ** Initial Code
******************************************************************************/
exports.getPrimaryKey = function (fields) {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].COL_FLD_TYPE == "pk") {
            return fields[i].COLUMN_NAME;
        }
    }
};