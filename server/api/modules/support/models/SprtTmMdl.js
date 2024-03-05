var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSprtTmMdl
* Description   : get details of all Team
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTmMdl = (user,callback) => {
    var fnm = "getSprtTmMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY tm_id) sno,
                                tm_id,tm_nm,tm_dscn_tx,a_in 
                        FROM sprt_tm_lst_t 
                        WHERE a_in = 1 
                        ORDER BY tm_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSprtTmMdl
* Description   : search details of all Team
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSprtTmMdl = (data,user,callback) => {
    var fnm = "srchSprtTmMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('tm_nm')) {
                QRY_WHERE += ` AND tm_nm='${data.tm_nm}'`
            }  
            if(data.hasOwnProperty('tm_dscn_tx')) {
                QRY_WHERE += ` AND tm_dscn_tx='${data.tm_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY tm_id) sno,
                                tm_id,tm_nm,tm_dscn_tx,a_in 
                        FROM sprt_tm_lst_t 
                        WHERE ${QRY_WHERE} AND tm_id= ${data.tm_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSprtTmByIdMdl
* Description   : get details of single  Team
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTmByIdMdl = (id,user,callback) => {
    var fnm = "getSprtTmByIdMdl"
    var QRY_TO_EXEC = `SELECT tm_id,tm_nm,tm_dscn_tx,a_in 
                        FROM sprt_tm_lst_t 
                        WHERE a_in = 1 AND tm_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSprtTmMdl
* Description   : Add new  Team
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSprtTmMdl = (data,user,callback) => {
    var fnm = "insrtSprtTmMdl"
    var QRY_TO_EXEC = `INSERT INTO sprt_tm_lst_t(tm_nm,tm_dscn_tx,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.tm_nm}','${data.tm_dscn_tx}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSprtTmMdl
* Description   : Update existing  Team
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSprtTmMdl = (data,id,user,callback) => {
    var fnm = "updteSprtTmMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('tm_nm')) {
                QRY_SET += ` , tm_nm='${data.tm_nm}'`
            }  
            if(data.hasOwnProperty('tm_dscn_tx')) {
                QRY_SET += ` , tm_dscn_tx='${data.tm_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sprt_tm_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE tm_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSprtTmMdl
* Description   : Delete existing  Team
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSprtTmMdl = (id,user,callback) => {
    var fnm = "dlteSprtTmMdl"
    var QRY_TO_EXEC = `UPDATE sprt_tm_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tm_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



