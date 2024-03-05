var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getAppTypeMdl
* Description   : get details of all App Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppTypeMdl = (user,callback) => {
    var fnm = "getAppTypeMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY app_type_id) sno,
                                app_type_id,app_type_nm,app_type_dscn_tx,a_in 
                        FROM app_type_lst_t 
                        WHERE a_in = 1 
                        ORDER BY app_type_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchAppTypeMdl
* Description   : search details of all App Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchAppTypeMdl = (data,user,callback) => {
    var fnm = "srchAppTypeMdl"
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('app_type_nm')) {
                QRY_WHERE += ` AND app_type_nm=${data.app_type_nm}`
            }   
            if(data.hasOwnProperty('app_type_dscn_tx')) {
                QRY_WHERE += ` AND app_type_dscn_tx='${data.app_type_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY app_type_id) sno,
                                app_type_id,app_type_nm,app_type_dscn_tx,a_in 
                        FROM app_type_lst_t 
                        WHERE ${QRY_WHERE} AND app_type_id= ${data.app_type_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAppTypeByIdMdl
* Description   : get details of single  App Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppTypeByIdMdl = (id,user,callback) => {
    var fnm = "getAppTypeByIdMdl"
    var QRY_TO_EXEC = `SELECT app_type_id,app_type_nm,app_type_dscn_tx,a_in 
                        FROM app_type_lst_t 
                        WHERE a_in = 1 AND app_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtAppTypeMdl
* Description   : Add new  App Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtAppTypeMdl = (data,user,callback) => {
    var fnm = "insrtAppTypeMdl"
    var QRY_TO_EXEC = `INSERT INTO app_type_lst_t(app_type_nm,app_type_dscn_tx,a_in,crte_usr_id) 
                        VALUES(${data.app_type_nm},&#39;${data.app_type_dscn_tx}&#39;,1,user.user_id)`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteAppTypeMdl
* Description   : Update existing  App Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteAppTypeMdl = (data,id,user,callback) => {
    var fnm = "updteAppTypeMdl"
    var QRY_SET = ""
       
            if(data.hasOwnProperty('app_type_nm')) {
                QRY_SET += ` , app_type_nm=${data.app_type_nm}`
            }   
            if(data.hasOwnProperty('app_type_dscn_tx')) {
                QRY_SET += ` , app_type_dscn_tx='${data.app_type_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE app_type_lst_t 
                        SET d_ts = current_timestamp(), a_in = 0,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE app_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteAppTypeMdl
* Description   : Delete existing  App Types
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteAppTypeMdl = (id,user,callback) => {
    var fnm = "dlteAppTypeMdl"
    var QRY_TO_EXEC = `UPDATE app_type_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE app_type_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



