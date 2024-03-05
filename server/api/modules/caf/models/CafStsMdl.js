var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getCafStsMdl
* Description   : get details of all CafStatus
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCafStsMdl = (user,callback) => {
    var fnm = "getCafStsMdl"
    
    
    var QRY_TO_EXEC = `select * from enty_sts_lst_t where enty_id=1 and app_in = 1 ORDER BY sts_nm;`;
    log.info(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchCafStsMdl
* Description   : search details of all CafStatus
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchCafStsMdl = (data,user,callback) => {
    var fnm = "srchCafStsMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('caf_sts_nm')) {
                QRY_WHERE += ` AND caf_sts_nm='${data.caf_sts_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY caf_sts_id) sno,
                                caf_sts_id,caf_sts_nm,a_in 
                        FROM caf_sts_lst_t 
                        WHERE ${QRY_WHERE} AND caf_sts_id= ${data.caf_sts_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCafStsByIdMdl
* Description   : get details of single  CafStatus
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCafStsByIdMdl = (id,user,callback) => {
    var fnm= "getCafStsByIdMdl"
    var QRY_TO_EXEC = `SELECT caf_sts_id,caf_sts_nm,a_in 
                        FROM caf_sts_lst_t 
                        WHERE a_in = 1 AND caf_sts_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCafStsMdl
* Description   : Add new  CafStatus
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtCafStsMdl = (data,user,callback) => {
    var fnm = "insrtCafStsMdl"
    var QRY_TO_EXEC = `INSERT INTO caf_sts_lst_t(caf_sts_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.caf_sts_nm}',1,CURRENT_TIMESTAMP(),${user.mrcht_usr_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteCafStsMdl
* Description   : Update existing  CafStatus
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteCafStsMdl = (data,id,user,callback) => {
    var fnm = "updteCafStsMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('caf_sts_nm')) {
                QRY_SET += ` , caf_sts_nm='${data.caf_sts_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE caf_sts_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE caf_sts_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteCafStsMdl
* Description   : Delete existing  CafStatus
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteCafStsMdl = (id,user,callback) => {
    var fnm = "dlteCafStsMdl"
    var QRY_TO_EXEC = `UPDATE caf_sts_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE caf_sts_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



