var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);




/*****************************************************************************
* Function      : getMrchntTrnscMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntTrnscMdl = (id) => {
    var fnm = "getMrchntTrnscMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}




/*****************************************************************************
* Function      : getMrchntTrnscDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntTrnscDtlsMdl = (id, trnscId) => {
    var fnm = "getMrchntTrnscDtlsMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : getMrchntTrnscDateFltrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntTrnscDateFltrMdl = (id, frmdt, todt) => {
    var fnm = "getMrchntTrnscDateFltrMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : getMrchntStmntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntStmntMdl = (id, frmdt, todt) => {
    var fnm = "getMrchntStmntMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

