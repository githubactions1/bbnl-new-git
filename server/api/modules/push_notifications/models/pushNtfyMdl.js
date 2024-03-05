// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/*****************************************************************************
* Function      : getCafCstmrDtlsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getPushNtfcnContent = () => {
    var fnm = "getPushNtfcnContent"
    var QRY_TO_EXEC = `
    SELECT l.app_psh_ntfy_tkn,  ntfy_hdr, ntfy_bdy_txt, ntfy_img, n.ntfy_id 
    FROM app_last_rfrsh_dtl_t l
    JOIN app_pshntfy_usr_rel_t r on r.app_lgn_usr_id = l.app_lgn_usr_id
    JOIN app_psh_ntfy_dtl_t n on n.ntfy_id = r.ntfy_id
    WHERE l.a_in = 1 AND l.app_psh_ntfy_tkn is NOT NULL AND r.pblsh_in = 0
    ORDER BY r.ntfctn_ts DESC;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}


/*****************************************************************************
* Function      : getCafCstmrDtlsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.updatePushNtfyUsrs = () => {
    var fnm = "updatePushNtfyUsrs"
    var QRY_TO_EXEC = ` update app_pshntfy_usr_rel_t set pblsh_in = 1, u_ts = CURRENT_TIMESTAMP() where pblsh_in = 0 `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}