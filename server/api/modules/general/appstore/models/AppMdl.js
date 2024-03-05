var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getAppMdl
* Description   : get details of all Apps
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppMdl = (user,callback) => {
    var fnm = "getAppMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY app_id) sno,
                                app_id,app_nm,app_type_id,pd_in,app_log_url_tx,app_icn_tx,app_clr_tx,app_url_tx,dscn_tx,a_in 
                        FROM app_lst_t 
                        WHERE a_in = 1 
                        ORDER BY app_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchAppMdl
* Description   : search details of all Apps
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchAppMdl = (data,user,callback) => {
    var fnm = "srchAppMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('app_nm')) {
                QRY_WHERE += ` AND app_nm='${data.app_nm}'`
            }    
            if(data.hasOwnProperty('app_type_id')) {
                QRY_WHERE += ` AND app_type_id=${data.app_type_id}`
            }     
            if(data.hasOwnProperty('pd_in')) {
                QRY_WHERE += ` AND pd_in=${data.pd_in}`
            }   
            if(data.hasOwnProperty('app_log_url_tx')) {
                QRY_WHERE += ` AND app_log_url_tx='${data.app_log_url_tx}'`
            }  
            if(data.hasOwnProperty('app_icn_tx')) {
                QRY_WHERE += ` AND app_icn_tx='${data.app_icn_tx}'`
            }  
            if(data.hasOwnProperty('app_clr_tx')) {
                QRY_WHERE += ` AND app_clr_tx='${data.app_clr_tx}'`
            }  
            if(data.hasOwnProperty('app_url_tx')) {
                QRY_WHERE += ` AND app_url_tx='${data.app_url_tx}'`
            }  
            if(data.hasOwnProperty('dscn_tx')) {
                QRY_WHERE += ` AND dscn_tx='${data.dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY app_id) sno,
                                app_id,app_nm,app_type_id,pd_in,app_log_url_tx,app_icn_tx,app_clr_tx,app_url_tx,dscn_tx,a_in 
                        FROM app_lst_t 
                        WHERE ${QRY_WHERE} AND app_id= ${data.app_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAppByIdMdl
* Description   : get details of single  Apps
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppByIdMdl = (id,user,callback) => {
    var fnm = "getAppByIdMdl"
    var QRY_TO_EXEC = `SELECT app_id,app_nm,app_type_id,pd_in,app_log_url_tx,app_icn_tx,app_clr_tx,app_url_tx,dscn_tx,a_in 
                        FROM app_lst_t 
                        WHERE a_in = 1 AND app_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtAppMdl
* Description   : Add new  Apps
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtAppMdl = (data,user,callback) => {
    var fnm = "insrtAppMdl"
    var QRY_TO_EXEC = `INSERT INTO app_lst_t(app_nm,app_type_id,pd_in,app_log_url_tx,app_icn_tx,app_clr_tx,app_url_tx,dscn_tx,a_in,crte_usr_id) 
                        VALUES(&#39;${data.app_nm}&#39;,${data.app_type_id},${data.pd_in},&#39;${data.app_log_url_tx}&#39;,&#39;${data.app_icn_tx}&#39;,&#39;${data.app_clr_tx}&#39;,&#39;${data.app_url_tx}&#39;,&#39;${data.dscn_tx}&#39;,1,user.user_id)`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteAppMdl
* Description   : Update existing  Apps
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteAppMdl = (data,id,user,callback) => {
    var fnm = "updteAppMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('app_nm')) {
                QRY_SET += ` , app_nm='${data.app_nm}'`
            }    
            if(data.hasOwnProperty('app_type_id')) {
                QRY_SET += ` , app_type_id=${data.app_type_id}`
            }     
            if(data.hasOwnProperty('pd_in')) {
                QRY_SET += ` , pd_in=${data.pd_in}`
            }   
            if(data.hasOwnProperty('app_log_url_tx')) {
                QRY_SET += ` , app_log_url_tx='${data.app_log_url_tx}'`
            }  
            if(data.hasOwnProperty('app_icn_tx')) {
                QRY_SET += ` , app_icn_tx='${data.app_icn_tx}'`
            }  
            if(data.hasOwnProperty('app_clr_tx')) {
                QRY_SET += ` , app_clr_tx='${data.app_clr_tx}'`
            }  
            if(data.hasOwnProperty('app_url_tx')) {
                QRY_SET += ` , app_url_tx='${data.app_url_tx}'`
            }  
            if(data.hasOwnProperty('dscn_tx')) {
                QRY_SET += ` , dscn_tx='${data.dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE app_lst_t 
                        SET d_ts = current_timestamp(), a_in = 0,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE app_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteAppMdl
* Description   : Delete existing  Apps
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteAppMdl = (id,user,callback) => {
    var fnm = "dlteAppMdl"
    var QRY_TO_EXEC = `UPDATE app_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE app_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



