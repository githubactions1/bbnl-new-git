var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
async = require('async');


/*****************************************************************************
* Function      : getSqlDefinition
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getSqlDefinition = function (task,callback) {
	var fnm = 'getSqlDefinition'
    var QRY_TO_EXEC =`SELECT s.sql_nm,s.sql_tx,s.rqrce_in,s.rqrce_sql_id,rs.sql_tx as rqrce_sql_tx,s.nxt_sql_id,ns.sql_tx as nxt_sql_tx 
                    FROM btch_sql_lst_t as s
                    left join btch_sql_lst_t as rs on rs.sql_id=s.rqrce_sql_id
                    left join btch_sql_lst_t as ns on ns.sql_id=s.nxt_sql_id
                    WHERE s.sql_id=${task.tsk_srce_id} and s.a_in=1;`
                    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,{},fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,{},fnm);
};


/*****************************************************************************
* Function      : qryExecutor
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.qryExecutor = function (qry_tx, callback) {
	var fnm = 'qryExecutor'
    var QRY_TO_EXEC = qry_tx;
    // console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function") {
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,{},fnm);
};

