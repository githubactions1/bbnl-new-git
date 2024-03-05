var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSprtSrvceMdl
* Description   : get details of all support services
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtSrvceMdl = (user,callback) => {
    var fnm = "getSprtSrvceMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY srvce_id) sno,
                                srvce_id,srvce_nm,a_in 
                        FROM sprt_srvce_lst_t 
                        WHERE a_in = 1 
                        ORDER BY srvce_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSprtSrvceMdl
* Description   : search details of all support services
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSprtSrvceMdl = (data,user,callback) => {
    var fnm = "srchSprtSrvceMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('srvce_nm')) {
                QRY_WHERE += ` AND srvce_nm='${data.srvce_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY srvce_id) sno,
                                srvce_id,srvce_nm,a_in 
                        FROM sprt_srvce_lst_t 
                        WHERE ${QRY_WHERE} AND srvce_id= ${data.srvce_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSprtSrvceByIdMdl
* Description   : get details of single  support services
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtSrvceByIdMdl = (id,user,callback) => {
    var fnm = "getSprtSrvceByIdMdl"
    var QRY_TO_EXEC = `SELECT srvce_id,srvce_nm,a_in 
                        FROM sprt_srvce_lst_t 
                        WHERE a_in = 1 AND srvce_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSprtSrvceMdl
* Description   : Add new  support services
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSprtSrvceMdl = (data,user,callback) => {
    var fnm  = "insrtSprtSrvceMdl"
    var QRY_TO_EXEC = `INSERT INTO sprt_srvce_lst_t(srvce_nm,crte_usr_id,updte_usr_id,a_in) 
                        VALUES('${data.srvce_nm}','${data.crte_usr_id}','${data.updte_usr_id}',1)`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSprtSrvceMdl
* Description   : Update existing  support services
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSprtSrvceMdl = (data,id,user,callback) => {
    var fnm = "updteSprtSrvceMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('srvce_nm')) {
                QRY_SET += ` , srvce_nm='${data.srvce_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sprt_srvce_lst_t 
                        SET d_ts = current_timestamp(), a_in = 1 ${QRY_SET}
                        WHERE srvce_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSprtSrvceMdl
* Description   : Delete existing  support services
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSprtSrvceMdl = (id,user,callback) => {
    var fnm = "dlteSprtSrvceMdl"
    var QRY_TO_EXEC = `UPDATE sprt_srvce_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 
                       WHERE srvce_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



