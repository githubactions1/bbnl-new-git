var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSprtAplctnMdl
* Description   : get details of all Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtAplctnMdl = (user,callback) => {
    var fnm = "getSprtAplctnMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY aplctn_id) sno,
                                aplctn_id,aplctn_nm,aplctn_cd,a_in 
                        FROM sprt_aplctn_lst_t 
                        WHERE a_in = 1 
                        ORDER BY aplctn_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSprtAplctnMdl
* Description   : search details of all Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSprtAplctnMdl = (data,user,callback) => {
    var fnm = "srchSprtAplctnMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('aplctn_nm')) {
                QRY_WHERE += ` AND aplctn_nm='${data.aplctn_nm}'`
            }  
            if(data.hasOwnProperty('aplctn_cd')) {
                QRY_WHERE += ` AND aplctn_cd='${data.aplctn_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY aplctn_id) sno,
                                aplctn_id,aplctn_nm,aplctn_cd,a_in 
                        FROM sprt_aplctn_lst_t 
                        WHERE ${QRY_WHERE} AND aplctn_id= ${data.aplctn_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSprtAplctnByIdMdl
* Description   : get details of single  Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtAplctnByIdMdl = (id,user,callback) => {
    var fnm = "getSprtAplctnByIdMdl"
    var QRY_TO_EXEC = `SELECT aplctn_id,aplctn_nm,aplctn_cd,a_in 
                        FROM sprt_aplctn_lst_t 
                        WHERE a_in = 1 AND aplctn_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSprtAplctnMdl
* Description   : Add new  Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSprtAplctnMdl = (data,user,callback) => {
    var fnm = "insrtSprtAplctnMdl"
    var QRY_TO_EXEC = `INSERT INTO sprt_aplctn_lst_t(aplctn_nm,aplctn_cd,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.aplctn_nm}','${data.aplctn_cd}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSprtAplctnMdl
* Description   : Update existing  Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSprtAplctnMdl = (data,id,user,callback) => {
    var fnm = "updteSprtAplctnMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('aplctn_nm')) {
                QRY_SET += ` , aplctn_nm='${data.aplctn_nm}'`
            }  
            if(data.hasOwnProperty('aplctn_cd')) {
                QRY_SET += ` , aplctn_cd='${data.aplctn_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sprt_aplctn_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE aplctn_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSprtAplctnMdl
* Description   : Delete existing  Application
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSprtAplctnMdl = (id,user,callback) => {
    var fnm = "dlteSprtAplctnMdl"
    var QRY_TO_EXEC = `UPDATE sprt_aplctn_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE aplctn_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



