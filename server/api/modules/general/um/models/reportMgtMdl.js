// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/*****************************************************************************
* Function      : getReportPrfle
* Description   : 
* Arguments     : callback function
* Change History :
* 23/07/2019    -   - Initial Function
*
******************************************************************************/
exports.getReportPrfle = function (stp_prfle_id, user, callback) {
    var fnm = "getReportPrfle"
    var QRY_TO_EXEC = ` SELECT m.mrcht_usr_id,mrcht_usr_nm,s.stp_prfle_id,stp_prfle_json 
                        FROM mrcht_usr_lst_t m
                        LEFT JOIN stp_prfle_lst_t s ON m.stp_prfle_id = s.stp_prfle_id
                        WHERE s.stp_prfle_id=${stp_prfle_id}`;
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
