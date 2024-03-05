var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getAppMdleMdl
* Description   : get details of all Modules
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppMdleMdl = (user,callback) => {
    var fnm = "getAppMdleMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY mdle_id) sno,
                                mdle_id,mdlet_nm,mdlet_hndlr_nm,mdlet_dscn_tx,swgr_fle_url_tx,a_in 
                        FROM app_mdle_lst_t 
                        WHERE a_in = 1 
                        ORDER BY mdle_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchAppMdleMdl
* Description   : search details of all Modules
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchAppMdleMdl = (data,user,callback) => {
    var fnm = "srchAppMdleMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('mdlet_nm')) {
                QRY_WHERE += ` AND mdlet_nm='${data.mdlet_nm}'`
            }  
            if(data.hasOwnProperty('mdlet_hndlr_nm')) {
                QRY_WHERE += ` AND mdlet_hndlr_nm='${data.mdlet_hndlr_nm}'`
            }  
            if(data.hasOwnProperty('mdlet_dscn_tx')) {
                QRY_WHERE += ` AND mdlet_dscn_tx='${data.mdlet_dscn_tx}'`
            }  
            if(data.hasOwnProperty('swgr_fle_url_tx')) {
                QRY_WHERE += ` AND swgr_fle_url_tx='${data.swgr_fle_url_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY mdle_id) sno,
                                mdle_id,mdlet_nm,mdlet_hndlr_nm,mdlet_dscn_tx,swgr_fle_url_tx,a_in 
                        FROM app_mdle_lst_t 
                        WHERE ${QRY_WHERE} AND mdle_id= ${data.mdle_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAppMdleByIdMdl
* Description   : get details of single  Modules
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppMdleByIdMdl = (id,user,callback) => {
    var fnm = "getAppMdleByIdMdl"
    var QRY_TO_EXEC = `SELECT mdle_id,mdlet_nm,mdlet_hndlr_nm,mdlet_dscn_tx,swgr_fle_url_tx,a_in 
                        FROM app_mdle_lst_t 
                        WHERE a_in = 1 AND mdle_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtAppMdleMdl
* Description   : Add new  Modules
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtAppMdleMdl = (data,user,callback) => {
    var fnm = "insrtAppMdleMdl"
    var QRY_TO_EXEC = `INSERT INTO app_mdle_lst_t(mdlet_nm,mdlet_hndlr_nm,mdlet_dscn_tx,swgr_fle_url_tx,a_in,crte_usr_id) 
                        VALUES(&#39;${data.mdlet_nm}&#39;,&#39;${data.mdlet_hndlr_nm}&#39;,&#39;${data.mdlet_dscn_tx}&#39;,&#39;${data.swgr_fle_url_tx}&#39;,1,user.user_id)`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteAppMdleMdl
* Description   : Update existing  Modules
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteAppMdleMdl = (data,id,user,callback) => {
    var fnm = "updteAppMdleMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('mdlet_nm')) {
                QRY_SET += ` , mdlet_nm='${data.mdlet_nm}'`
            }  
            if(data.hasOwnProperty('mdlet_hndlr_nm')) {
                QRY_SET += ` , mdlet_hndlr_nm='${data.mdlet_hndlr_nm}'`
            }  
            if(data.hasOwnProperty('mdlet_dscn_tx')) {
                QRY_SET += ` , mdlet_dscn_tx='${data.mdlet_dscn_tx}'`
            }  
            if(data.hasOwnProperty('swgr_fle_url_tx')) {
                QRY_SET += ` , swgr_fle_url_tx='${data.swgr_fle_url_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE app_mdle_lst_t 
                        SET d_ts = current_timestamp(), a_in = 0,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE mdle_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteAppMdleMdl
* Description   : Delete existing  Modules
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteAppMdleMdl = (id,user,callback) => {
    var fnm= "dlteAppMdleMdl"
    var QRY_TO_EXEC = `UPDATE app_mdle_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE mdle_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



