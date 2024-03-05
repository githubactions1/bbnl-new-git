var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function       : saveRqstDtMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.saveRqstDtMdl = function (data, user) {
	var fnm = 'saveRqstDtMdl';
    var QRY_TO_EXEC = `insert into api_rqst_dtl_t (rqst_dscn_tx,enty_id,actn_id,crte_usr_id) values ('${data.actn_nm}',${data.enty_id},${data.actn_id},${user.user_id});`;
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};
/*****************************************************************************
* Function       : saveClDtMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.saveClDtMdl = function (data, clJsn, user) {
	var fnm = 'saveClDtMdl';
    var QRY_TO_EXEC = `insert into api_rqst_cl_dtl_t (mthd_id,api_rqst_id,api_rqst_cl_type_id,sqnce_nu,url_tx,url_dta_tx,hdr_tx,api_sts_id,crte_usr_id) values (${clJsn.mthd_id},${data.api_rqst_id},1,1,'${clJsn.url}','${clJsn.body}','${clJsn.header}',1,${user.user_id})`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};
/**************************************************************************
* Function      : updateResponse
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateClResponse = (cal_id, resps, sqnce_nu, error, sts_id, user) => {
	var fnm = 'updateClResponse';
    var QRY_TO_EXEC = `UPDATE api_rqst_cl_dtl_t SET rspne_tx='${JSON.stringify(resps)}',sqnce_nu = ${sqnce_nu},api_sts_id = ${sts_id}, err_dscpn_tx=${JSON.stringify(error)},updte_usr_id=${user.user_id} WHERE rest_cl_id=${cal_id} and (rspne_tx is null OR rspne_tx='')`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm)
};