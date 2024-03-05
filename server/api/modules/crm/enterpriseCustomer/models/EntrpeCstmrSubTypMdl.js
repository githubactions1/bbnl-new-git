var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getEntrpeCstmrSubTypMdl
* Description   : get details of all enterprise Customer Sub Type
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getEntrpeCstmrSubTypMdl = (user,callback) => {
	var fnm = 'getEntrpeCstmrSubTypMdl';
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY entrpe_sub_type_id) sno,
                                entrpe_sub_type_id,entrpe_type_id,entrpe_sub_type_nm,a_in 
                        FROM entrpe_cstmr_sub_typ_lst_t  
                        WHERE a_in = 1 
                        ORDER BY entrpe_sub_type_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : srchEntrpeCstmrSubTypMdl
* Description   : search details of all enterprise Customer Sub Type
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchEntrpeCstmrSubTypMdl = (data,user,callback) => {
	var fnm = 'srchEntrpeCstmrSubTypMdl';
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('entrpe_type_id')) {
                QRY_WHERE += ` AND entrpe_type_id=${data.entrpe_type_id}`
            }   
            if(data.hasOwnProperty('entrpe_sub_type_nm')) {
                QRY_WHERE += ` AND entrpe_sub_type_nm='${data.entrpe_sub_type_nm}'`
            } 
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY entrpe_sub_type_id) sno,
                                entrpe_sub_type_id,entrpe_type_id,entrpe_sub_type_nm,a_in 
                        FROM entrpe_cstmr_sub_typ_lst_t  
                        WHERE ${QRY_WHERE} AND entrpe_sub_type_id= ${data.entrpe_sub_type_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : getEntrpeCstmrSubTypByIdMdl
* Description   : get details of single  enterprise Customer Sub Type
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getEntrpeCstmrSubTypByIdMdl = (id,user,callback) => {
	var fnm = 'getEntrpeCstmrSubTypByIdMdl';
    var QRY_TO_EXEC = `SELECT entrpe_sub_type_id,entrpe_type_id,entrpe_sub_type_nm,a_in 
                        FROM entrpe_cstmr_sub_typ_lst_t  
                        WHERE a_in = 1 AND entrpe_type_id= ${id}; `;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : insrtEntrpeCstmrSubTypMdl
* Description   : Add new  enterprise Customer Sub Type
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtEntrpeCstmrSubTypMdl = (data,user,callback) => {
	var fnm = 'insrtEntrpeCstmrSubTypMdl';
    var QRY_TO_EXEC = `INSERT INTO entrpe_cstmr_sub_typ_lst_t (entrpe_type_id,entrpe_sub_type_nm,a_in,i_ts,crte_usr_id) 
                        VALUES(${data.entrpe_type_id},&#39;${data.entrpe_sub_type_nm}&#39;,1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : updteEntrpeCstmrSubTypMdl
* Description   : Update existing  enterprise Customer Sub Type
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteEntrpeCstmrSubTypMdl = (data,id,user,callback) => {
	var fnm = 'updteEntrpeCstmrSubTypMdl';
    var QRY_SET = ""
       
            if(data.hasOwnProperty('entrpe_type_id')) {
                QRY_SET += ` , entrpe_type_id=${data.entrpe_type_id}`
            }   
            if(data.hasOwnProperty('entrpe_sub_type_nm')) {
                QRY_SET += ` , entrpe_sub_type_nm='${data.entrpe_sub_type_nm}'`
            } 

    var QRY_TO_EXEC = ` UPDATE entrpe_cstmr_sub_typ_lst_t  
                        SET u_ts = current_timestamp(), a_in = 0,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE entrpe_sub_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : dlteEntrpeCstmrSubTypMdl
* Description   : Delete existing  enterprise Customer Sub Type
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteEntrpeCstmrSubTypMdl = (id,user,callback) => {
	var fnm = 'dlteEntrpeCstmrSubTypMdl';
    var QRY_TO_EXEC = `UPDATE entrpe_cstmr_sub_typ_lst_t  
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE entrpe_sub_type_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}



