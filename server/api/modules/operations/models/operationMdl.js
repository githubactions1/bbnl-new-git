var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : updateTrmndReqCafsMdl
* Description   : Update terminate request cafs for approval
* Arguments     : callback function
*
******************************************************************************/
exports.updateTrmndReqCafsMdl = (data, user) => {
    var fnm = "updateTrmndReqCafsMdl"

    var QRY_TO_EXEC = ` UPDATE trmn_rqst_dtl_t
                        SET aprvd_ts=CURRENT_TIMESTAMP(),aprvl_cmnt_tx='auto-approved',aprvd_usr_id=0,
                        updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : getCafDtlsMdl
* Description   : Get CAF agora details
* Arguments     : callback function
*
******************************************************************************/
exports.getCafDtlsMdl = (data, user, callback) => {
    var fnm = "getCafDtlsMdl"

    var QRY_TO_EXEC = ` select aghra_cd from caf_dtl_t c
                        where caf_id= ${data.id} `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}