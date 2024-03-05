var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getErpPrtnrsMdl
* Description   : get details of all erpprtnrslstt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getErpPrtnrsMdl = (user,callback) => {
    var fnm = "getErpPrtnrsMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY prtnr_id) sno,
                                prtnr_id,prtnr_nm,a_in 
                        FROM prtnrs_lst_t 
                        WHERE a_in = 1 
                        ORDER BY prtnr_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchErpPrtnrsMdl
* Description   : search details of all erpprtnrslstt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchErpPrtnrsMdl = (data,user,callback) => {
    var fnm = "srchErpPrtnrsMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('prtnr_nm')) {
                QRY_WHERE += ` AND prtnr_nm='${data.prtnr_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY prtnr_id) sno,
                                prtnr_id,prtnr_nm,a_in 
                        FROM prtnrs_lst_t 
                        WHERE ${QRY_WHERE} AND prtnr_id= ${data.prtnr_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getErpPrtnrsByIdMdl
* Description   : get details of single  erpprtnrslstt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getErpPrtnrsByIdMdl = (id,user,callback) => {
    var fnm = "getErpPrtnrsByIdMdl"
    var QRY_TO_EXEC = `SELECT prtnr_id,prtnr_nm,a_in 
                        FROM prtnrs_lst_t 
                        WHERE a_in = 1 AND prtnr_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtErpPrtnrsMdl
* Description   : Add new  erpprtnrslstt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtErpPrtnrsMdl = (data,user,callback) => {
    var fnm = "insrtErpPrtnrsMdl"
    var QRY_TO_EXEC = `INSERT INTO prtnrs_lst_t(prtnr_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.prtnr_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteErpPrtnrsMdl
* Description   : Update existing  erpprtnrslstt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteErpPrtnrsMdl = (data,id,user,callback) => {
    var fnm = "updteErpPrtnrsMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('prtnr_nm')) {
                QRY_SET += ` , prtnr_nm='${data.prtnr_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE prtnrs_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE prtnr_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteErpPrtnrsMdl
* Description   : Delete existing  erpprtnrslstt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteErpPrtnrsMdl = (id,user,callback) => {
    var fnm = "dlteErpPrtnrsMdl"
    var QRY_TO_EXEC = `UPDATE prtnrs_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE prtnr_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



