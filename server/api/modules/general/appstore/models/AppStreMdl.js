var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getAppStreMdl
* Description   : get details of all App Store
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppStreMdl = (user,callback) => {
    var fnm = "getAppStreMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY app_stre_id) sno,
                                app_stre_id,app_stre_nm,app_stre_dscn_tx,a_in 
                        FROM app_stre_lst_t 
                        WHERE a_in = 1 
                        ORDER BY app_stre_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchAppStreMdl
* Description   : search details of all App Store
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchAppStreMdl = (data,user,callback) => {
    var fnm = "srchAppStreMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('app_stre_nm')) {
                QRY_WHERE += ` AND app_stre_nm='${data.app_stre_nm}'`
            }  
            if(data.hasOwnProperty('app_stre_dscn_tx')) {
                QRY_WHERE += ` AND app_stre_dscn_tx='${data.app_stre_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY app_stre_id) sno,
                                app_stre_id,app_stre_nm,app_stre_dscn_tx,a_in 
                        FROM app_stre_lst_t 
                        WHERE ${QRY_WHERE} AND app_stre_id= ${data.app_stre_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAppStreByIdMdl
* Description   : get details of single  App Store
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAppStreByIdMdl = (id,user,callback) => {
    var fnm = "getAppStreByIdMdl"
    var QRY_TO_EXEC = `SELECT app_stre_id,app_stre_nm,app_stre_dscn_tx,a_in 
                        FROM app_stre_lst_t 
                        WHERE a_in = 1 AND app_stre_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtAppStreMdl
* Description   : Add new  App Store
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtAppStreMdl = (data,user,callback) => {
    var fnm = "insrtAppStreMdl"
    console.log(data)
    var QRY_TO_EXEC = `INSERT INTO app_stre_lst_t(app_stre_nm,app_stre_dscn_tx,a_in,crte_usr_id) 
                        VALUES('${data.app_stre_nm}','${data.app_stre_dscn_tx}',1,${user.user_id})`;
 console.log("QRY_TO_EXEC ::"+QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteAppStreMdl
* Description   : Update existing  App Store
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteAppStreMdl = (data,id,user,callback) => {
    var fnm = "updteAppStreMdl"
    var QRY_SET = ""
     console.log(data)
            if(data.hasOwnProperty('app_stre_nm')) {
                QRY_SET += ` , app_stre_nm='${data.app_stre_nm}'`
            }  
            if(data.hasOwnProperty('app_stre_dscn_tx')) {
                QRY_SET += ` , app_stre_dscn_tx='${data.app_stre_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  
    
    var QRY_TO_EXEC = ` UPDATE app_stre_lst_t 
                        SET u_ts = current_timestamp(),updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE app_stre_id= ${id}; `;
    console.log("QRY_TO_EXEC ::"+QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteAppStreMdl
* Description   : Delete existing  App Store
* Arguments     : callback function
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteAppStreMdl = (id,user,callback) => {
    var fnm = "dlteAppStreMdl"
    var QRY_TO_EXEC = `UPDATE app_stre_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE app_stre_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}



