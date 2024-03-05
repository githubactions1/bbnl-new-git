var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSprtCtlgeMdl
* Description   : get details of all Support ticket Catalogue
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtCtlgeMdl = (user,callback) => {
    var fnm = "getSprtCtlgeMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY ctlge_id) sno,
                                ctlge_id,ctlge_nm,ctlge_dscn_tx,a_in 
                        FROM sprt_ctlge_lst_t 
                        WHERE a_in = 1 
                        ORDER BY ctlge_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSprtCtlgeMdl
* Description   : search details of all Support ticket Catalogue
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSprtCtlgeMdl = (data,user,callback) => {
    var fnm = "srchSprtCtlgeMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('ctlge_nm')) {
                QRY_WHERE += ` AND ctlge_nm='${data.ctlge_nm}'`
            }  
            if(data.hasOwnProperty('ctlge_dscn_tx')) {
                QRY_WHERE += ` AND ctlge_dscn_tx='${data.ctlge_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY ctlge_id) sno,
                                ctlge_id,ctlge_nm,ctlge_dscn_tx,a_in 
                        FROM sprt_ctlge_lst_t 
                        WHERE ${QRY_WHERE} AND ctlge_id= ${data.ctlge_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSprtCtlgeByIdMdl
* Description   : get details of single  Support ticket Catalogue
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtCtlgeByIdMdl = (id,user,callback) => {
    var fnm = "getSprtCtlgeByIdMdl"
    var QRY_TO_EXEC = `SELECT ctlge_id,ctlge_nm,ctlge_dscn_tx,a_in 
                        FROM sprt_ctlge_lst_t 
                        WHERE a_in = 1 AND ctlge_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSprtCtlgeMdl
* Description   : Add new  Support ticket Catalogue
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSprtCtlgeMdl = (data,user,callback) => {
    var fnm = "insrtSprtCtlgeMdl"
    var QRY_TO_EXEC = `INSERT INTO sprt_ctlge_lst_t(ctlge_nm,ctlge_dscn_tx,a_in) 
                        VALUES(&#39;${data.ctlge_nm}&#39;,&#39;${data.ctlge_dscn_tx}&#39;,1)`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSprtCtlgeMdl
* Description   : Update existing  Support ticket Catalogue
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSprtCtlgeMdl = (data,id,user,callback) => {
    var fnm = "updteSprtCtlgeMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('ctlge_nm')) {
                QRY_SET += ` , ctlge_nm='${data.ctlge_nm}'`
            }  
            if(data.hasOwnProperty('ctlge_dscn_tx')) {
                QRY_SET += ` , ctlge_dscn_tx='${data.ctlge_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sprt_ctlge_lst_t 
                        SET d_ts = current_timestamp(), a_in = 0 ${QRY_SET}
                        WHERE ctlge_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSprtCtlgeMdl
* Description   : Delete existing  Support ticket Catalogue
* Arguments     : callback function
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSprtCtlgeMdl = (id,user,callback) => {
    var fnm = "dlteSprtCtlgeMdl"
    var QRY_TO_EXEC = `UPDATE sprt_ctlge_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 
                       WHERE ctlge_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



