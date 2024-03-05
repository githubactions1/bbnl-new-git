var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getErpTmplePrtnrsMdl
* Description   : get details of all erpTmpltprtnrs
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getErpTmplePrtnrsMdl = (user,callback) => {
    var fnm = "getErpTmplePrtnrsMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY erp_tmple_prtnrs_rel_t.tmple_prtnrs_rel_id) sno, erp_tmple_lst_t.tmple_cd, prtnrs_lst_t.prtnr_nm, ara_type_lst_t.ara_type_cd,erp_tmple_prtnrs_rel_t.* FROM erp_tmple_prtnrs_rel_t  JOIN erp_tmple_lst_t On erp_tmple_lst_t.tmple_id = erp_tmple_prtnrs_rel_t.tmple_id JOIN prtnrs_lst_t On prtnrs_lst_t.prtnr_id = erp_tmple_prtnrs_rel_t.prtnr_id JOIN ara_type_lst_t On ara_type_lst_t.ara_type_id = erp_tmple_prtnrs_rel_t.ara_type_id where erp_tmple_prtnrs_rel_t.a_in = 1 ORDER BY erp_tmple_prtnrs_rel_t.tmple_prtnrs_rel_id ASC;` 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchErpTmplePrtnrsMdl
* Description   : search details of all erpTmpltprtnrs
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchErpTmplePrtnrsMdl = (data,user,callback) => {
    var fnm = "srchErpTmplePrtnrsMdl"
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('tmple_id')) {
                QRY_WHERE += ` AND tmple_id=${data.tmple_id}`
            }     
            if(data.hasOwnProperty('prtnr_id')) {
                QRY_WHERE += ` AND prtnr_id=${data.prtnr_id}`
            }     
            if(data.hasOwnProperty('ara_type_id')) {
                QRY_WHERE += ` AND ara_type_id=${data.ara_type_id}`
            }     
            if(data.hasOwnProperty('prcnt_ct')) {
                QRY_WHERE += ` AND prcnt_ct=${data.prcnt_ct}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY tmple_prtnrs_rel_id) sno,
                                tmple_prtnrs_rel_id,tmple_id,prtnr_id,ara_type_id,prcnt_ct,a_in 
                        FROM erp_tmple_prtnrs_rel_t 
                        WHERE ${QRY_WHERE} AND tmple_prtnrs_rel_id= ${data.tmple_prtnrs_rel_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getErpTmplePrtnrsByIdMdl
* Description   : get details of single  erpTmpltprtnrs
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getErpTmplePrtnrsByIdMdl = (id,user,callback) => {
    var fnm = "getErpTmplePrtnrsByIdMdl"
    var QRY_TO_EXEC = `SELECT tmple_prtnrs_rel_id,tmple_id,prtnr_id,ara_type_id,prcnt_ct,a_in 
                        FROM erp_tmple_prtnrs_rel_t 
                        WHERE a_in = 1 AND tmple_prtnrs_rel_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtErpTmplePrtnrsMdl
* Description   : Add new  erpTmpltprtnrs
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtErpTmplePrtnrsMdl = (data,user,callback) => {
    var fnm = "insrtErpTmplePrtnrsMdlc "
    let dlmtr = ' ,';
    let sbr_qry = ' '
    var QRY_TO_EXEC = `INSERT INTO erp_tmple_prtnrs_rel_t (tmple_id, prtnr_id, ara_type_id,prcnt_ct,a_in,i_ts,crte_usr_id) VALUES`;
    for (i = 0; i < data.rgnsPrtnrsData.length; i++) {
        if (i + 1 == data.rgnsPrtnrsData.length) {
            dlmtr = ' ;'
        }
        sbr_qry += ` (${data.tmple_id},${data.rgnsPrtnrsData[i].tenants}, ${data.rgnsPrtnrsData[i].regions},${data.rgnsPrtnrsData[i].percentage},1,CURRENT_TIMESTAMP(),${user.user_id}) ${dlmtr} `;
    }
    QRY_TO_EXEC += sbr_qry;
  
    // var QRY_TO_EXEC = `INSERT INTO erp_tmple_prtnrs_rel_t(tmple_id,prtnr_id,ara_type_id,prcnt_ct,a_in,i_ts,crte_usr_id) 
    //                     VALUES(${data.tmple_id},${data.prtnr_id},${data.ara_type_id},${data.prcnt_ct},1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : updteErpTmplePrtnrsMdl
* Description   : Update existing  erpTmpltprtnrs
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteErpTmplePrtnrsMdl = (data,id,user,callback) => {
    var fnm = "updteErpTmplePrtnrsMdl"
    var QRY_SET = ""
       
            if(data.hasOwnProperty('tmple_id')) {
                QRY_SET += ` , tmple_id=${data.tmple_id}`
            }     
            if(data.hasOwnProperty('prtnr_id')) {
                QRY_SET += ` , prtnr_id=${data.prtnr_id}`
            }     
            if(data.hasOwnProperty('ara_type_id')) {
                QRY_SET += ` , ara_type_id=${data.ara_type_id}`
            }     
            if(data.hasOwnProperty('prcnt_ct')) {
                QRY_SET += ` , prcnt_ct=${data.prcnt_ct}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE erp_tmple_prtnrs_rel_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE tmple_prtnrs_rel_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteErpTmplePrtnrsMdl
* Description   : Delete existing  erpTmpltprtnrs
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteErpTmplePrtnrsMdl = (id,user,callback) => {
    var fnm = "dlteErpTmplePrtnrsMdl"
    var QRY_TO_EXEC = `UPDATE erp_tmple_prtnrs_rel_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tmple_prtnrs_rel_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



