var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getAraTypeMdl
* Description   : get details of all araType
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAraTypeMdl = (user,callback) => {
    var fnm = "getAraTypeMdl"
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY ara_type_id) sno,
                                ara_type_id,ara_type_cd,ara_type_nm,a_in 
                        FROM ara_type_lst_t 
                        WHERE a_in = 1 
                        ORDER BY ara_type_id; `;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchAraTypeMdl
* Description   : search details of all araType
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchAraTypeMdl = (data,user,callback) => {
    var fnm = "srchAraTypeMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('ara_type_cd')) {
                QRY_WHERE += ` AND ara_type_cd='${data.ara_type_cd}'`
            }  
            if(data.hasOwnProperty('ara_type_nm')) {
                QRY_WHERE += ` AND ara_type_nm='${data.ara_type_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY ara_type_id) sno,
                                ara_type_id,ara_type_cd,ara_type_nm,a_in 
                        FROM ara_type_lst_t 
                        WHERE ${QRY_WHERE} AND ara_type_id= ${data.ara_type_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAraTypeByIdMdl
* Description   : get details of single  araType
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAraTypeByIdMdl = (id,user,callback) => {
    var fnm = "getAraTypeByIdMdl"
    var QRY_TO_EXEC = `SELECT ara_type_id,ara_type_cd,ara_type_nm,a_in 
                        FROM ara_type_lst_t 
                        WHERE a_in = 1 AND ara_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtAraTypeMdl
* Description   : Add new  araType
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtAraTypeMdl = (data,user,callback) => {
    var fnm = "insrtAraTypeMdl"
    var QRY_TO_EXEC = `INSERT INTO ara_type_lst_t(ara_type_cd,ara_type_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.ara_type_cd}','${data.ara_type_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteAraTypeMdl
* Description   : Update existing  araType
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteAraTypeMdl = (data,id,user,callback) => {
    var fnm = "updteAraTypeMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('ara_type_cd')) {
                QRY_SET += ` , ara_type_cd='${data.ara_type_cd}'`
            }  
            if(data.hasOwnProperty('ara_type_nm')) {
                QRY_SET += ` , ara_type_nm='${data.ara_type_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE ara_type_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE ara_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteAraTypeMdl
* Description   : Delete existing  araType
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteAraTypeMdl = (id,user,callback) => {
    var fnm = "dlteAraTypeMdl"
    var QRY_TO_EXEC = `UPDATE ara_type_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE ara_type_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



