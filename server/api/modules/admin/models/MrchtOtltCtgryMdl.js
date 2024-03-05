var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getMrchtOtltCtgryMdl
* Description   : get details of all BranchCategory
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getMrchtOtltCtgryMdl = (user,callback) => {
    var fnm = "getMrchtOtltCtgryMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY otlt_ctgry_id) sno,
                                otlt_ctgry_id,otlt_ctgry_nm,a_in 
                        FROM mrcht_otlt_ctgry_lst_t 
                        WHERE a_in = 1 
                        ORDER BY otlt_ctgry_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchMrchtOtltCtgryMdl
* Description   : search details of all BranchCategory
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchMrchtOtltCtgryMdl = (data,user,callback) => {
    var fnm = "srchMrchtOtltCtgryMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('otlt_ctgry_nm')) {
                QRY_WHERE += ` AND otlt_ctgry_nm='${data.otlt_ctgry_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY otlt_ctgry_id) sno,
                                otlt_ctgry_id,otlt_ctgry_nm,a_in 
                        FROM mrcht_otlt_ctgry_lst_t 
                        WHERE ${QRY_WHERE} AND otlt_ctgry_id= ${data.otlt_ctgry_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getMrchtOtltCtgryByIdMdl
* Description   : get details of single  BranchCategory
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getMrchtOtltCtgryByIdMdl = (id,user,callback) => {
    var fnm = "getMrchtOtltCtgryByIdMdl"
    var QRY_TO_EXEC = `SELECT otlt_ctgry_id,otlt_ctgry_nm,a_in 
                        FROM mrcht_otlt_ctgry_lst_t 
                        WHERE a_in = 1 AND otlt_ctgry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtMrchtOtltCtgryMdl
* Description   : Add new  BranchCategory
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtMrchtOtltCtgryMdl = (data,user,callback) => {
    var fnm = "insrtMrchtOtltCtgryMdl"
    var QRY_TO_EXEC = `INSERT INTO mrcht_otlt_ctgry_lst_t(otlt_ctgry_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.otlt_ctgry_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;
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
* Function      : updteMrchtOtltCtgryMdl
* Description   : Update existing  BranchCategory
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteMrchtOtltCtgryMdl = (data,id,user,callback) => {
    var fnm = "updteMrchtOtltCtgryMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('otlt_ctgry_nm')) {
                QRY_SET += ` , otlt_ctgry_nm='${data.otlt_ctgry_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE mrcht_otlt_ctgry_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE otlt_ctgry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteMrchtOtltCtgryMdl
* Description   : Delete existing  BranchCategory
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteMrchtOtltCtgryMdl = (id,user,callback) => {
    var fnm = "dlteMrchtOtltCtgryMdl"
    var QRY_TO_EXEC = `UPDATE mrcht_otlt_ctgry_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE otlt_ctgry_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



