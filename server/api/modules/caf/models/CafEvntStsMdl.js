var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getCafEvntStsMdl
* Description   : get details of all CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCafEvntStsMdl = (user,callback) => {
    var fnm= "getCafEvntStsMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY caf_evnt_sts_id) sno,
                                caf_evnt_sts_id,caf_evnt_sts_nm,caf_evnt_sts_cd,caf_evnt_sts_dscn_tx,a_in 
                        FROM caf_evnt_sts_lst_t 
                        WHERE a_in = 1 
                        ORDER BY caf_evnt_sts_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchCafEvntStsMdl
* Description   : search details of all CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchCafEvntStsMdl = (data,user,callback) => {
    var fnm = "srchCafEvntStsMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('caf_evnt_sts_nm')) {
                QRY_WHERE += ` AND caf_evnt_sts_nm='${data.caf_evnt_sts_nm}'`
            }  
            if(data.hasOwnProperty('caf_evnt_sts_cd')) {
                QRY_WHERE += ` AND caf_evnt_sts_cd='${data.caf_evnt_sts_cd}'`
            }  
            if(data.hasOwnProperty('caf_evnt_sts_dscn_tx')) {
                QRY_WHERE += ` AND caf_evnt_sts_dscn_tx='${data.caf_evnt_sts_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY caf_evnt_sts_id) sno,
                                caf_evnt_sts_id,caf_evnt_sts_nm,caf_evnt_sts_cd,caf_evnt_sts_dscn_tx,a_in 
                        FROM caf_evnt_sts_lst_t 
                        WHERE ${QRY_WHERE} AND caf_evnt_sts_id= ${data.caf_evnt_sts_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCafEvntStsByIdMdl
* Description   : get details of single  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCafEvntStsByIdMdl = (id,user,callback) => {
    var fnm= "getCafEvntStsByIdMdl"
    var QRY_TO_EXEC = `SELECT caf_evnt_sts_id,caf_evnt_sts_nm,caf_evnt_sts_cd,caf_evnt_sts_dscn_tx,a_in 
                        FROM caf_evnt_sts_lst_t 
                        WHERE a_in = 1 AND caf_evnt_sts_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCafEvntStsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtCafEvntStsMdl = (data,user,callback) => {
    var fnm = "insrtCafEvntStsMdl"
    var QRY_TO_EXEC = `INSERT INTO caf_evnt_sts_lst_t(caf_evnt_sts_nm,caf_evnt_sts_cd,caf_evnt_sts_dscn_tx,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.caf_evnt_sts_nm}','${data.caf_evnt_sts_cd}','${data.caf_evnt_sts_dscn_tx}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteCafEvntStsMdl
* Description   : Update existing  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteCafEvntStsMdl = (data,id,user,callback) => {
    var fnm = "updteCafEvntStsMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('caf_evnt_sts_nm')) {
                QRY_SET += ` , caf_evnt_sts_nm='${data.caf_evnt_sts_nm}'`
            }  
            if(data.hasOwnProperty('caf_evnt_sts_cd')) {
                QRY_SET += ` , caf_evnt_sts_cd='${data.caf_evnt_sts_cd}'`
            }  
            if(data.hasOwnProperty('caf_evnt_sts_dscn_tx')) {
                QRY_SET += ` , caf_evnt_sts_dscn_tx='${data.caf_evnt_sts_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE caf_evnt_sts_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE caf_evnt_sts_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteCafEvntStsMdl
* Description   : Delete existing  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteCafEvntStsMdl = (id,user,callback) => {
    var fnm="dlteCafEvntStsMdl"
    var QRY_TO_EXEC = `UPDATE caf_evnt_sts_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE caf_evnt_sts_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



