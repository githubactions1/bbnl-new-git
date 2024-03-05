var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
async = require('async');


/*****************************************************************************
* Function      : getFailedCAfs
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getFailedCAfs = () => {
    var fnm = 'getFailedCAfs'
    var QRY_TO_EXEC = `SELECT count(caf_id) as ct,GROUP_CONCAT(caf_id) as cafs
                        FROM caf_dtl_t as c
                        JOIN api_rqst_dtl_t as r on r.enty_ky=c.caf_id and r.actn_id=1
                        JOIN api_rqst_cl_dtl_t as cl on cl.api_rqst_id=r.api_rqst_id and cl.cre_srvce_id=1 and cl.extrl_aplcn_id=4 and cl.sqnce_nu=1
                        WHERE (cl.rspne_tx=''  OR cl.rspne_tx is null)  AND c.enty_sts_id=1 and caf_id>200000000 limit 3;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)
};


/*****************************************************************************
* Function      : getPendingPonCAfs
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getPendingPonCAfs = () => {
    var fnm = 'getPendingPonCAfs'
    var QRY_TO_EXEC = `SELECT count(caf_id) as ct,GROUP_CONCAT(caf_id) as cafs
    FROM caf_dtl_t as c 
    WHERE  c.enty_sts_id=11  ;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)
};
/*****************************************************************************
* Function      : getCafReq
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getCafReq = (caf_id) => {
    var fnm = 'getCafReq'
    var QRY_TO_EXEC = `SELECT  cl.rest_cl_id,cl.extrl_aplcn_id,cl.cre_srvce_id,cl.sqnce_nu,cl.mthd_id,url_dta_tx,url_tx,c.caf_id,REPLACE(c.aghra_cd,'-HSI','') as aghra_cd
                    FROM api_rqst_dtl_t as r
                    join caf_dtl_t as c on c.caf_id=r.enty_ky
                    join api_rqst_cl_dtl_t as cl on r.api_rqst_id=cl.api_rqst_id and r.actn_id=1 and cl.extrl_aplcn_id not in (1,6)
                    where r.enty_ky=${caf_id}   ORDER BY cre_srvce_id,sqnce_nu asc;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)
};


/*****************************************************************************
* Function      : getCafReq
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getPonCafReq = (caf_id) => {
    var fnm = 'getPonCafReq'
    var QRY_TO_EXEC = `SELECT  cl.rest_cl_id,cl.extrl_aplcn_id,cl.cre_srvce_id,cl.sqnce_nu,cl.mthd_id,url_dta_tx,url_tx
                    FROM api_rqst_dtl_t as r
                    join api_rqst_cl_dtl_t as cl on r.api_rqst_id=cl.api_rqst_id and r.actn_id=1000001 and cl.extrl_aplcn_id not in (1,6)
                    where r.enty_ky=${caf_id}   ORDER BY cre_srvce_id,sqnce_nu asc;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)
};

/*****************************************************************************
* Function      : getOldSpltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getOldSpltMdl = (caf_id) => {
    var fnm = 'getOldSpltMdl'
    var QRY_TO_EXEC = `select * from caf_splt_rel_t where caf_id = ${caf_id} ORDER BY u_ts,crnt_in desc`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)
};


/*****************************************************************************
* Function      : getCafOldSpltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getCafOldSpltMdl = (splt_id) => {
    var fnm = 'getCafOldSpltMdl'
    var QRY_TO_EXEC = `SELECT * from olt_prt_splt_lst_t WHERE splt_id = ${splt_id}`;
    //console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)
};
/*****************************************************************************
* Function      : updateResponse
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateResponse = (cal_id, resps) => {
    var fnm = 'updateResponse'
    console.log("updateResponse" + cal_id + '-' + resps);
    var QRY_TO_EXEC = `UPDATE api_rqst_cl_dtl_t SET rspne_tx='${JSON.stringify(resps)}' WHERE rest_cl_id=${cal_id} and (rspne_tx is null OR rspne_tx='')`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)
};

/*****************************************************************************
* Function      : updateCafStatus
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateCafStatus = (caf_id, subscribecd) => {
    var fnm = 'updateCafStatus'
    var QRY_TO_EXEC = `UPDATE caf_dtl_t SET actve_in=1,enty_sts_id=6,mdlwe_sbscr_id='${subscribecd}' WHERE caf_id=${caf_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm)
};


