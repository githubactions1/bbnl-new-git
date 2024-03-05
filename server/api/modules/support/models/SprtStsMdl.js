var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : getSprtStsMdl
* Description   : get details of all Ticket-Type
* Arguments     : callback function
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtStsMdl = (user,callback) => {
    var fnm = "getSprtStsMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY tckt_sts_id) sno,
                                 tckt_sts_id,tckt_sts_nm,a_in 
                        FROM sprt_tkt_sts_lst_t 
                        WHERE a_in = 1 
                        ORDER BY tckt_sts_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : srchSprtStsMdl
* Description   : search details of all Ticket-Type
* Arguments     : callback function
* Change History :
* 01/09/2020   -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSprtStsMdl = (data,user,callback) => {
    var QRY_WHERE = "1 = 1"
    var fnm = "srchSprtStsMdl"
     
            if(data.hasOwnProperty('tckt_sts_nm')) {
                QRY_WHERE += ` AND tckt_sts_nm='${data.tckt_sts_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY tckt_sts_id) sno,
                                   tckt_sts_id,tckt_sts_nm,a_in 
                        FROM sprt_tkt_sts_lst_t 
                        WHERE ${QRY_WHERE} AND tckt_sts_id= ${data.tckt_sts_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : getSprtStsByIdMdl
* Description   : get details of single  Ticket-Type
* Arguments     : callback function
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtStsByIdMdl = (id,user,callback) => {
    var fnm = "getSprtStsByIdMdl"
    var QRY_TO_EXEC = `SELECT tckt_sts_id,tckt_sts_nm,a_in 
                        FROM sprt_tkt_sts_lst_t 
                        WHERE a_in = 1 AND tckt_sts_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSprtStsMdl
* Description   : Add new  Ticket-Type
* Arguments     : callback function
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSprtStsMdl = (data,user,callback) => {
    var fnm = "insrtSprtStsMdl"
    var QRY_TO_EXEC = `INSERT INTO sprt_tkt_sts_lst_t(tckt_sts_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.tckt_sts_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : updteSprtStsMdl
* Description   : Update existing  Ticket-Type
* Arguments     : callback function
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSprtStsMdl = (data,id,user,callback) => {
    var fnm = "updteSprtStsMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('tckt_sts_nm')) {
                QRY_SET += ` , tckt_sts_nm='${data.tckt_sts_nm}'`
            }  
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sprt_tkt_sts_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE tckt_sts_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : dlteSprtStsMdl
* Description   : Delete existing  Ticket-Type
* Arguments     : callback function
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSprtStsMdl = (id,user,callback) => {
    var fnm = "dlteSprtStsMdl"
    var QRY_TO_EXEC = `UPDATE sprt_tkt_sts_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tckt_sts_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

