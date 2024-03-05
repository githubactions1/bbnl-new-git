var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getAgntPymntMdeMdl
* Description   : get details of all AgntPymntMode
* Arguments     : callback function
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAgntPymntMdeMdl = (user,callback) => {
    var fnm = "getAgntPymntMdeMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY pymnt_mde_id) sno,
                                pymnt_mde_id,pymnt_mde_nm,a_in 
                        FROM agnt_pymnt_mde_lst_t 
                        WHERE a_in = 1 
                        ORDER BY pymnt_mde_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchAgntPymntMdeMdl
* Description   : search details of all AgntPymntMode
* Arguments     : callback function
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchAgntPymntMdeMdl = (data,user,callback) => {
    var fnm = "srchAgntPymntMdeMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('pymnt_mde_nm')) {
                QRY_WHERE += ` AND pymnt_mde_nm='${data.pymnt_mde_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY pymnt_mde_id) sno,
                                pymnt_mde_id,pymnt_mde_nm,a_in 
                        FROM agnt_pymnt_mde_lst_t 
                        WHERE ${QRY_WHERE} AND pymnt_mde_id= ${data.pymnt_mde_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAgntPymntMdeByIdMdl
* Description   : get details of single  AgntPymntMode
* Arguments     : callback function
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getAgntPymntMdeByIdMdl = (id,user,callback) => {

    var fnm = "getAgntPymntMdeByIdMdl"
    var QRY_TO_EXEC = `SELECT pymnt_mde_id,pymnt_mde_nm,a_in 
                        FROM agnt_pymnt_mde_lst_t 
                        WHERE a_in = 1 AND pymnt_mde_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtAgntPymntMdeMdl
* Description   : Add new  AgntPymntMode
* Arguments     : callback function
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtAgntPymntMdeMdl = (data,user,callback) => {
    var fnm = "insrtAgntPymntMdeMdl"
    var QRY_TO_EXEC = `INSERT INTO agnt_pymnt_mde_lst_t(pymnt_mde_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.pymnt_mde_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteAgntPymntMdeMdl
* Description   : Update existing  AgntPymntMode
* Arguments     : callback function
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteAgntPymntMdeMdl = (data,id,user,callback) => {
    var fnm = "updteAgntPymntMdeMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('pymnt_mde_nm')) {
                QRY_SET += ` , pymnt_mde_nm='${data.pymnt_mde_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE agnt_pymnt_mde_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE pymnt_mde_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteAgntPymntMdeMdl
* Description   : Delete existing  AgntPymntMode
* Arguments     : callback function
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteAgntPymntMdeMdl = (id,user,callback) => {
    var fnm = "dlteAgntPymntMdeMdl"
    var QRY_TO_EXEC = `UPDATE agnt_pymnt_mde_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE pymnt_mde_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



