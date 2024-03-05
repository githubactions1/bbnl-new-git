var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getEntrpeCstmrTypMdl
* Description   : get details of all EntrpeCstmrTyp
* Arguments     : callback function
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getEntrpeCstmrTypMdl = (user,callback) => {
    var fnm = "getEntrpeCstmrTypMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY entrpe_type_id) sno,
                                entrpe_type_id,entrpe_type_nm,a_in 
                        FROM entrpe_cstmr_typ_lst_t 
                        WHERE a_in = 1 
                        ORDER BY entrpe_type_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getEntrpeCstmrillibbTypMdl
* Description   : get details of all EntrpeCstmrTyp
* Arguments     : callback function
* Change History :
* 07/11/2023    -  Ramesh Patlola  - Initial Function
*
******************************************************************************/
exports.getEntrpeCstmrillibbTypMdl = (user,callback) => {
    var fnm = "getEntrpeCstmrillibbTypMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY crm_entrpe_type_id) sno,
                                crm_entrpe_type_id,crm_entrpe_type_nm,a_in 
                        FROM crm_entrpe_cstmr_typ_lst_t 
                        WHERE a_in = 1 
                        ORDER BY crm_entrpe_type_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchEntrpeCstmrTypMdl
* Description   : search details of all EntrpeCstmrTyp
* Arguments     : callback function
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchEntrpeCstmrTypMdl = (data,user,callback) => {
    var fnm = "srchEntrpeCstmrTypMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('entrpe_type_nm')) {
                QRY_WHERE += ` AND entrpe_type_nm='${data.entrpe_type_nm}'`
            } 
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY entrpe_type_id) sno,
                                entrpe_type_id,entrpe_type_nm,a_in 
                        FROM entrpe_cstmr_typ_lst_t 
                        WHERE ${QRY_WHERE} AND entrpe_type_id= ${data.entrpe_type_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getEntrpeCstmrTypByIdMdl
* Description   : get details of single  EntrpeCstmrTyp
* Arguments     : callback function
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getEntrpeCstmrTypByIdMdl = (id,user,callback) => {
    var fnm = "getEntrpeCstmrTypByIdMdl"
    var QRY_TO_EXEC = `SELECT entrpe_type_id,entrpe_type_nm,a_in 
                        FROM entrpe_cstmr_typ_lst_t 
                        WHERE a_in = 1 AND entrpe_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtEntrpeCstmrTypMdl
* Description   : Add new  EntrpeCstmrTyp
* Arguments     : callback function
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtEntrpeCstmrTypMdl = (data,user,callback) => {
    var fnm = "insrtEntrpeCstmrTypMdl"
    var QRY_TO_EXEC = `INSERT INTO entrpe_cstmr_typ_lst_t(entrpe_type_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.entrpe_type_nm}',1,CURRENT_TIMESTAMP(),${user.mrcht_usr_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteEntrpeCstmrTypMdl
* Description   : Update existing  EntrpeCstmrTyp
* Arguments     : callback function
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteEntrpeCstmrTypMdl = (data,id,user,callback) => {
    var fnm = "updteEntrpeCstmrTypMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('entrpe_type_nm')) {
                QRY_SET += ` , entrpe_type_nm='${data.entrpe_type_nm}'`
            } 

    var QRY_TO_EXEC = ` UPDATE entrpe_cstmr_typ_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE entrpe_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteEntrpeCstmrTypMdl
* Description   : Delete existing  EntrpeCstmrTyp
* Arguments     : callback function
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteEntrpeCstmrTypMdl = (id,user,callback) => {
    var fnm = "dlteEntrpeCstmrTypMdl"
    var QRY_TO_EXEC = `UPDATE entrpe_cstmr_typ_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE entrpe_type_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



