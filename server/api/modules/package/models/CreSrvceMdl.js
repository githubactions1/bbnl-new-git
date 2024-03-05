var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getCreSrvceMdl
* Description   : get details of all CoreServices
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCreSrvceMdl = (user,callback) => {
    var fnm = "getCreSrvceMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY cre_srvce_id) sno,
                                cre_srvce_id,cre_srvce_nm,cre_srvce_cd,cre_srvc_hndlr_nm,a_in 
                        FROM cre_srvce_lst_t 
                        WHERE a_in = 1 
                        ORDER BY cre_srvce_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchCreSrvceMdl
* Description   : search details of all CoreServices
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchCreSrvceMdl = (data,user,callback) => {
    var fnm = "srchCreSrvceMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('cre_srvc_hndlr_nm')) {
                QRY_WHERE += ` AND cre_srvc_hndlr_nm='${data.cre_srvce_nm}'`
            }  
            if(data.hasOwnProperty('cre_srvce_cd')) {
                QRY_WHERE += ` AND cre_srvce_cd='${data.cre_srvce_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY cre_srvce_id) sno,
                                cre_srvce_id,cre_srvce_nm,cre_srvce_cd,cre_srvc_hndlr_nm,a_in 
                        FROM cre_srvce_lst_t 
                        WHERE ${QRY_WHERE} AND cre_srvce_id= ${data.cre_srvce_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCreSrvceByIdMdl
* Description   : get details of single  CoreServices
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCreSrvceByIdMdl = (id,user,callback) => {
    var fnm = "getCreSrvceByIdMdl"
    var QRY_TO_EXEC = `SELECT cre_srvce_id,cre_srvce_nm,cre_srvce_cd,a_in 
                        FROM cre_srvce_lst_t 
                        WHERE a_in = 1 AND cre_srvce_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCreSrvceMdl
* Description   : Add new  CoreServices
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtCreSrvceMdl = (data,user,callback) => {
    var fnm = "insrtCreSrvceMdl"
    var QRY_TO_EXEC = `INSERT INTO cre_srvce_lst_t(cre_srvce_nm,cre_srvce_cd,cre_srvc_hndlr_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.cre_srvce_cd}','${data.cre_srvce_cd}','${data.cre_srvce_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteCreSrvceMdl
* Description   : Update existing  CoreServices
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteCreSrvceMdl = (data,id,user,callback) => {
    var fnm = "updteCreSrvceMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('cre_srvc_hndlr_nm')) {
                QRY_SET += ` , cre_srvc_hndlr_nm='${data.cre_srvce_nm}'`
            }  
            if(data.hasOwnProperty('cre_srvce_cd')) {
                QRY_SET += ` , cre_srvce_cd='${data.cre_srvce_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE cre_srvce_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE cre_srvce_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteCreSrvceMdl
* Description   : Delete existing  CoreServices
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteCreSrvceMdl = (id,user,callback) => {
    var fnm = "dlteCreSrvceMdl"
    var QRY_TO_EXEC = `UPDATE cre_srvce_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE cre_srvce_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCreSrvceByPlanIdMdl
* Description   : get details of CoreServices based
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCreSrvceByPlanIdMdl = (id,user,callback) => {
    //Need to Write Query to get Coreservices based on plan_id
    return new Promise((resolve,reject)=> {
        resolve([])
    })
}

