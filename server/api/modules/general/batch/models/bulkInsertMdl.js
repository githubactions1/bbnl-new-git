var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
async = require('async');


/*****************************************************************************
* Function      : getBulkInsertDef
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getBulkInsertDef = function (task,callback) {
	var fnm = 'getBulkInsertDef'
    var QRY_TO_EXEC = `SELECT * from btch_blk_insrt_lst_t WHERE blk_inst_id=${task.tsk_srce_id} and a_in=1;`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,{},fnm);
};


/*****************************************************************************
* Function      : insertToTable
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertToTable = function (qry,callback) {
	var fnm = 'insertToTable'
    var QRY_TO_EXEC = qry;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm);
};
