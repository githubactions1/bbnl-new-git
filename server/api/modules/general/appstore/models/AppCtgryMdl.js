var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getAppCtgryMdl
* Description   : get details of all App Category(s)
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppCtgryMdl = (user,callback) => {
    var fnm = "getAppCtgryMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY app_ctgry_id) sno,
                                app_ctgry_id,app_ctgry_nm,app_ctgry_dscn_tx,a_in 
                        FROM app_ctgry_lst_t 
                        WHERE a_in = 1 
                        ORDER BY app_ctgry_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchAppCtgryMdl
* Description   : search details of all App Category(s)
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchAppCtgryMdl = (data,user,callback) => {
    var fnm="srchAppCtgryMdl"
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('app_ctgry_nm')) {
                QRY_WHERE += ` AND app_ctgry_nm=${data.app_ctgry_nm}`
            }   
            if(data.hasOwnProperty('app_ctgry_dscn_tx')) {
                QRY_WHERE += ` AND app_ctgry_dscn_tx='${data.app_ctgry_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY app_ctgry_id) sno,
                                app_ctgry_id,app_ctgry_nm,app_ctgry_dscn_tx,a_in 
                        FROM app_ctgry_lst_t 
                        WHERE ${QRY_WHERE} AND app_ctgry_id= ${data.app_ctgry_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAppCtgryByIdMdl
* Description   : get details of single  App Category(s)
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppCtgryByIdMdl = (id,user,callback) => {
    var fnm = "getAppCtgryByIdMdl"
    var QRY_TO_EXEC = `SELECT app_ctgry_id,app_ctgry_nm,app_ctgry_dscn_tx,a_in 
                        FROM app_ctgry_lst_t 
                        WHERE a_in = 1 AND app_ctgry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtAppCtgryMdl
* Description   : Add new  App Category(s)
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtAppCtgryMdl = (data,user,callback) => {
    var fnm = "insrtAppCtgryMdl"
    var QRY_TO_EXEC = `INSERT INTO app_ctgry_lst_t(app_ctgry_nm,app_ctgry_dscn_tx,a_in,crte_usr_id) 
                        VALUES(${data.app_ctgry_nm},&#39;${data.app_ctgry_dscn_tx}&#39;,1,user.user_id)`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteAppCtgryMdl
* Description   : Update existing  App Category(s)
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteAppCtgryMdl = (data,id,user,callback) => {
    var fnm = "updteAppCtgryMdl"
    var QRY_SET = ""
       
            if(data.hasOwnProperty('app_ctgry_nm')) {
                QRY_SET += ` , app_ctgry_nm=${data.app_ctgry_nm}`
            }   
            if(data.hasOwnProperty('app_ctgry_dscn_tx')) {
                QRY_SET += ` , app_ctgry_dscn_tx='${data.app_ctgry_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE app_ctgry_lst_t 
                        SET d_ts = current_timestamp(), a_in = 0,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE app_ctgry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteAppCtgryMdl
* Description   : Delete existing  App Category(s)
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteAppCtgryMdl = (id,user,callback) => {
    var fnm = "dlteAppCtgryMdl"
    var QRY_TO_EXEC = `UPDATE app_ctgry_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE app_ctgry_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



