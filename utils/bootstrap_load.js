
var df = require(appRoot + '/utils/dflower.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var dbutil = require(appRoot + '/utils/db.utils');


var batchCoreCtrl = require(appRoot + '/server/api/modules/general/batch/controllers/batchCoreCtrl');

audit_sqltable_lst = [];


/*****************************************************************************
* Function      : getAdtTableLst_M
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getAdtTableLst_M = function () {
    var QRY_TO_EXEC = `select * from tbl_lst_t where adt_in = 1; `;
    // console.log(QRY_TO_EXEC);
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, null, function (err, results) {
        if (err)
            log.info(err, 0, cntxtDtls);
        if (results && results.length) {
            audit_sqltable_lst = results;
        }
        log.info(`SQL Audit:- total ${audit_sqltable_lst.length} tables`, 0, cntxtDtls);
        return;
    });
}

/*****************************************************************************
* Function      : loadSchedular_get
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.loadSchedular_get = function () {
    //Locad Scheduled batch Jobs
    batchCoreCtrl.loadSchedular_get(function (err, res) {
        if (err) { console.log(err); callback(err, null); return; }
        log.info(res.length + " Jobs Scheduled", 0, cntxtDtls);
    })
}