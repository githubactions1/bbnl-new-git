var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getAppDtypeMdl
* Description   : get details of all Data Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppDtypeMdl = (user,callback) => {
    var fnm = "getAppDtypeMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY dtype_id) sno,
                                dtype_id,dtype_nm,dtype_frmt_tx,dtype_dscn_tx,a_in 
                        FROM app_dtype_lst_t 
                        WHERE a_in = 1 
                        ORDER BY dtype_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchAppDtypeMdl
* Description   : search details of all Data Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchAppDtypeMdl = (data,user,callback) => {
    var fnm = "srchAppDtypeMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('dtype_nm')) {
                QRY_WHERE += ` AND dtype_nm='${data.dtype_nm}'`
            }  
            if(data.hasOwnProperty('dtype_frmt_tx')) {
                QRY_WHERE += ` AND dtype_frmt_tx='${data.dtype_frmt_tx}'`
            }  
            if(data.hasOwnProperty('dtype_dscn_tx')) {
                QRY_WHERE += ` AND dtype_dscn_tx='${data.dtype_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY dtype_id) sno,
                                dtype_id,dtype_nm,dtype_frmt_tx,dtype_dscn_tx,a_in 
                        FROM app_dtype_lst_t 
                        WHERE ${QRY_WHERE} AND dtype_id= ${data.dtype_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAppDtypeByIdMdl
* Description   : get details of single  Data Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppDtypeByIdMdl = (id,user,callback) => {
    var fnm = "getAppDtypeByIdMdl"
    var QRY_TO_EXEC = `SELECT dtype_id,dtype_nm,dtype_frmt_tx,dtype_dscn_tx,a_in 
                        FROM app_dtype_lst_t 
                        WHERE a_in = 1 AND dtype_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtAppDtypeMdl
* Description   : Add new  Data Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtAppDtypeMdl = (data,user,callback) => {
    var fnm = "insrtAppDtypeMdl"
    var QRY_TO_EXEC = `INSERT INTO app_dtype_lst_t(dtype_nm,dtype_frmt_tx,dtype_dscn_tx,a_in,crte_usr_id) 
                        VALUES(&#39;${data.dtype_nm}&#39;,&#39;${data.dtype_frmt_tx}&#39;,&#39;${data.dtype_dscn_tx}&#39;,1,user.user_id)`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteAppDtypeMdl
* Description   : Update existing  Data Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteAppDtypeMdl = (data,id,user,callback) => {
    var fnm = "updteAppDtypeMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('dtype_nm')) {
                QRY_SET += ` , dtype_nm='${data.dtype_nm}'`
            }  
            if(data.hasOwnProperty('dtype_frmt_tx')) {
                QRY_SET += ` , dtype_frmt_tx='${data.dtype_frmt_tx}'`
            }  
            if(data.hasOwnProperty('dtype_dscn_tx')) {
                QRY_SET += ` , dtype_dscn_tx='${data.dtype_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE app_dtype_lst_t 
                        SET d_ts = current_timestamp(), a_in = 0,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE dtype_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteAppDtypeMdl
* Description   : Delete existing  Data Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteAppDtypeMdl = (id,user,callback) => {
    var fnm = "dlteAppDtypeMdl"
    var QRY_TO_EXEC = `UPDATE app_dtype_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE dtype_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



