var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);



/*****************************************************************************
* Function      : getMrchntDshbrdMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntDshbrdMdl = (id) => {
    var fnm = "getMrchntDshbrdMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : getMrchntDshbrdDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntDshbrdDtlsMdl = (id, otletId) => {
    var fnm = "getMrchntDshbrdDtlsMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

