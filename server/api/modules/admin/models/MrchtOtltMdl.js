var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getMrchtOtltMdl
* Description   : get details of all branches
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getMrchtOtltMdl = (user,callback) => {
    var fnm = "getMrchtOtltMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY mrcht_otlt_lst_t.otlt_id) sno, mrcht_otlt_ctgry_lst_t.otlt_ctgry_nm,mrcht_otlt_lst_t.* FROM mrcht_otlt_lst_t  JOIN mrcht_otlt_ctgry_lst_t On mrcht_otlt_ctgry_lst_t.otlt_ctgry_id = mrcht_otlt_lst_t.otlt_ctgry_id;` 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchMrchtOtltMdl
* Description   : search details of all branches
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchMrchtOtltMdl = (data,user,callback) => {
    var fnm = "srchMrchtOtltMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('otlt_nm')) {
                QRY_WHERE += ` AND otlt_nm='${data.otlt_nm}'`
            }  
            if(data.hasOwnProperty('otlt_cd')) {
                QRY_WHERE += ` AND otlt_cd='${data.otlt_cd}'`
            }    
            if(data.hasOwnProperty('otlt_ctgry_id')) {
                QRY_WHERE += ` AND otlt_ctgry_id=${data.otlt_ctgry_id}`
            }     
            if(data.hasOwnProperty('mrcht_id')) {
                QRY_WHERE += ` AND mrcht_id=${data.mrcht_id}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY otlt_id) sno,
                                otlt_id,otlt_nm,otlt_cd,otlt_ctgry_id,mrcht_id,a_in 
                        FROM mrcht_otlt_lst_t 
                        WHERE ${QRY_WHERE} AND otlt_id= ${data.otlt_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getMrchtOtltByIdMdl
* Description   : get details of single  branches
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getMrchtOtltByIdMdl = (id,user,callback) => {
    var fnm ="getMrchtOtltByIdMdl"
    var QRY_TO_EXEC = `SELECT otlt_id,otlt_nm,otlt_cd,otlt_ctgry_id,mrcht_id,a_in 
                        FROM mrcht_otlt_lst_t 
                        WHERE a_in = 1 AND otlt_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtMrchtOtltMdl
* Description   : Add new  branches
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtMrchtOtltMdl = (data,user,callback) => {
    var fnm = "insrtMrchtOtltMdl"
    var QRY_TO_EXEC = `INSERT INTO mrcht_otlt_lst_t(otlt_nm,otlt_ctgry_id,mrcht_id,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.otlt_nm}',${data.otlt_ctgry_id},${user.mrcht_id},1,CURRENT_TIMESTAMP(),${user.mrcht_usr_id})`;
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
* Function      : updteMrchtOtltMdl
* Description   : Update existing  branches
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteMrchtOtltMdl = (data,id,user,callback) => {
    var fnm = "updteMrchtOtltMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('otlt_nm')) {
                QRY_SET += ` , otlt_nm='${data.otlt_nm}'`
            }  
            if(data.hasOwnProperty('otlt_cd')) {
                QRY_SET += ` , otlt_cd='${data.otlt_cd}'`
            }    
            if(data.hasOwnProperty('otlt_ctgry_id')) {
                QRY_SET += ` , otlt_ctgry_id=${data.otlt_ctgry_id}`
            }     
            if(data.hasOwnProperty('mrcht_id')) {
                QRY_SET += ` , mrcht_id=${data.mrcht_id}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE mrcht_otlt_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE otlt_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteMrchtOtltMdl
* Description   : Delete existing  branches
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteMrchtOtltMdl = (id,user,callback) => {
    var fnm = "dlteMrchtOtltMdl"
    var QRY_TO_EXEC = `UPDATE mrcht_otlt_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE otlt_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



