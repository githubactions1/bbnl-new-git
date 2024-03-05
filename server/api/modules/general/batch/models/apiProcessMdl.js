var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
async = require('async');


/*****************************************************************************
* Function      : getApiDefinition
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getApiDefinition = function (task,callback) {
    var fnm ='getApiDefinition'
    var QRY_TO_EXEC = `SELECT * FROM btch_api_lst_t WHERE api_id=${task.tsk_srce_id} and a_in=1;`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
