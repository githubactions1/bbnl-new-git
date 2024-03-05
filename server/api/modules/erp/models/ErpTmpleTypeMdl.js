var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getErpTmpleTypeMdl
* Description   : get details of all erpTmpltTyp
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getErpTmpleTypeMdl = (user,callback) => {
    var fnm = "getErpTmpleTypeMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY tmple_type_id) sno,
                                tmple_type_id,tmple_type_nm,a_in 
                        FROM erp_tmple_type_lst_t 
                        WHERE a_in = 1 
                        ORDER BY tmple_type_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchErpTmpleTypeMdl
* Description   : search details of all erpTmpltTyp
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchErpTmpleTypeMdl = (data,user,callback) => {
    var fnm = "srchErpTmpleTypeMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('tmple_type_nm')) {
                QRY_WHERE += ` AND tmple_type_nm='${data.tmple_type_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY tmple_type_id) sno,
                                tmple_type_id,tmple_type_nm,a_in 
                        FROM erp_tmple_type_lst_t 
                        WHERE ${QRY_WHERE} AND tmple_type_id= ${data.tmple_type_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getErpTmpleTypeByIdMdl
* Description   : get details of single  erpTmpltTyp
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getErpTmpleTypeByIdMdl = (id,user,callback) => {
    var fnm = "getErpTmpleTypeByIdMdl"
    var QRY_TO_EXEC = `SELECT tmple_type_id,tmple_type_nm,a_in 
                        FROM erp_tmple_type_lst_t 
                        WHERE a_in = 1 AND tmple_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtErpTmpleTypeMdl
* Description   : Add new  erpTmpltTyp
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtErpTmpleTypeMdl = (data,user,callback) => {
    var fnm = "insrtErpTmpleTypeMdl"
    var QRY_TO_EXEC = `INSERT INTO erp_tmple_type_lst_t(tmple_type_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.tmple_type_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteErpTmpleTypeMdl
* Description   : Update existing  erpTmpltTyp
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteErpTmpleTypeMdl = (data,id,user,callback) => {
    var fnm = "updteErpTmpleTypeMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('tmple_type_nm')) {
                QRY_SET += ` , tmple_type_nm='${data.tmple_type_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE erp_tmple_type_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE tmple_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteErpTmpleTypeMdl
* Description   : Delete existing  erpTmpltTyp
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteErpTmpleTypeMdl = (id,user,callback) => {
    var fnm = "dlteErpTmpleTypeMdl"
    var QRY_TO_EXEC = `UPDATE erp_tmple_type_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tmple_type_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



