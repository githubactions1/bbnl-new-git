var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getAppPrpryMdl
* Description   : get details of all Module properties
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppPrpryMdl = (user,callback) => {
    var fnm = "getAppPrpryMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY prpry_id) sno,
                                prpry_id,mdle_id,prpry_nm,prpry_hndlr_nm,dtype_id,prpry_vlue_tx,prpry_dscn_tx,a_in 
                        FROM app_prpry_lst_t 
                        WHERE a_in = 1 
                        ORDER BY prpry_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchAppPrpryMdl
* Description   : search details of all Module properties
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchAppPrpryMdl = (data,user,callback) => {
    var fnm = "srchAppPrpryMdl"
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('mdle_id')) {
                QRY_WHERE += ` AND mdle_id=${data.mdle_id}`
            }   
            if(data.hasOwnProperty('prpry_nm')) {
                QRY_WHERE += ` AND prpry_nm='${data.prpry_nm}'`
            }  
            if(data.hasOwnProperty('prpry_hndlr_nm')) {
                QRY_WHERE += ` AND prpry_hndlr_nm='${data.prpry_hndlr_nm}'`
            }    
            if(data.hasOwnProperty('dtype_id')) {
                QRY_WHERE += ` AND dtype_id=${data.dtype_id}`
            }   
            if(data.hasOwnProperty('prpry_vlue_tx')) {
                QRY_WHERE += ` AND prpry_vlue_tx='${data.prpry_vlue_tx}'`
            }  
            if(data.hasOwnProperty('prpry_dscn_tx')) {
                QRY_WHERE += ` AND prpry_dscn_tx='${data.prpry_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY prpry_id) sno,
                                prpry_id,mdle_id,prpry_nm,prpry_hndlr_nm,dtype_id,prpry_vlue_tx,prpry_dscn_tx,a_in 
                        FROM app_prpry_lst_t 
                        WHERE ${QRY_WHERE} AND prpry_id= ${data.prpry_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAppPrpryByIdMdl
* Description   : get details of single  Module properties
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppPrpryByIdMdl = (id,user,callback) => {
    var fnm = "getAppPrpryByIdMdl"
    var QRY_TO_EXEC = `SELECT prpry_id,mdle_id,prpry_nm,prpry_hndlr_nm,dtype_id,prpry_vlue_tx,prpry_dscn_tx,a_in 
                        FROM app_prpry_lst_t 
                        WHERE a_in = 1 AND prpry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtAppPrpryMdl
* Description   : Add new  Module properties
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtAppPrpryMdl = (data,user,callback) => {
    var fnm = "insrtAppPrpryMdl"
    var QRY_TO_EXEC = `INSERT INTO app_prpry_lst_t(mdle_id,prpry_nm,prpry_hndlr_nm,dtype_id,prpry_vlue_tx,prpry_dscn_tx,a_in,crte_usr_id) 
                        VALUES(${data.mdle_id},&#39;${data.prpry_nm}&#39;,&#39;${data.prpry_hndlr_nm}&#39;,${data.dtype_id},&#39;${data.prpry_vlue_tx}&#39;,&#39;${data.prpry_dscn_tx}&#39;,1,user.user_id)`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteAppPrpryMdl
* Description   : Update existing  Module properties
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteAppPrpryMdl = (data,id,user,callback) => {
    var fnm = "updteAppPrpryMdl"
    var QRY_SET = ""
       
            if(data.hasOwnProperty('mdle_id')) {
                QRY_SET += ` , mdle_id=${data.mdle_id}`
            }   
            if(data.hasOwnProperty('prpry_nm')) {
                QRY_SET += ` , prpry_nm='${data.prpry_nm}'`
            }  
            if(data.hasOwnProperty('prpry_hndlr_nm')) {
                QRY_SET += ` , prpry_hndlr_nm='${data.prpry_hndlr_nm}'`
            }    
            if(data.hasOwnProperty('dtype_id')) {
                QRY_SET += ` , dtype_id=${data.dtype_id}`
            }   
            if(data.hasOwnProperty('prpry_vlue_tx')) {
                QRY_SET += ` , prpry_vlue_tx='${data.prpry_vlue_tx}'`
            }  
            if(data.hasOwnProperty('prpry_dscn_tx')) {
                QRY_SET += ` , prpry_dscn_tx='${data.prpry_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE app_prpry_lst_t 
                        SET d_ts = current_timestamp(), a_in = 0,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE prpry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteAppPrpryMdl
* Description   : Delete existing  Module properties
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteAppPrpryMdl = (id,user,callback) => {
    var fnm = "dlteAppPrpryMdl"
    var QRY_TO_EXEC = `UPDATE app_prpry_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE prpry_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



