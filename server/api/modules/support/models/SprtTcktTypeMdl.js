var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSprtTcktTypeMdl
* Description   : get details of all Ticket-Type
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTcktTypeMdl = (user,callback) => {
    var fnm = "getSprtTcktTypeMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY tckt_type_id) sno,
                                tckt_type_id,tckt_type_nm,tckt_type_cd,a_in 
                        FROM sprt_tckt_type_lst_t 
                        WHERE a_in = 1 
                        ORDER BY tckt_type_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSprtTcktTypeMdl
* Description   : search details of all Ticket-Type
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSprtTcktTypeMdl = (data,user,callback) => {
    var fnm = "srchSprtTcktTypeMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('tckt_type_nm')) {
                QRY_WHERE += ` AND tckt_type_nm='${data.tckt_type_nm}'`
            }  
            if(data.hasOwnProperty('tckt_type_cd')) {
                QRY_WHERE += ` AND tckt_type_cd='${data.tckt_type_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY tckt_type_id) sno,
                                tckt_type_id,tckt_type_nm,tckt_type_cd,a_in 
                        FROM sprt_tckt_type_lst_t 
                        WHERE ${QRY_WHERE} AND tckt_type_id= ${data.tckt_type_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSprtTcktTypeByIdMdl
* Description   : get details of single  Ticket-Type
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTcktTypeByIdMdl = (id,user,callback) => {
    var fnm = "getSprtTcktTypeByIdMdl"
    var QRY_TO_EXEC = `SELECT tckt_type_id,tckt_type_nm,tckt_type_cd,a_in 
                        FROM sprt_tckt_type_lst_t 
                        WHERE a_in = 1 AND tckt_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSprtTcktTypeMdl
* Description   : Add new  Ticket-Type
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSprtTcktTypeMdl = (data,user,callback) => {
    var fnm = "insrtSprtTcktTypeMdl"
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_type_lst_t(tckt_type_nm,tckt_type_cd,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.tckt_type_nm}','${data.tckt_type_cd}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSprtTcktTypeMdl
* Description   : Update existing  Ticket-Type
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSprtTcktTypeMdl = (data,id,user,callback) => {
    var fnm = "updteSprtTcktTypeMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('tckt_type_nm')) {
                QRY_SET += ` , tckt_type_nm='${data.tckt_type_nm}'`
            }  
            if(data.hasOwnProperty('tckt_type_cd')) {
                QRY_SET += ` , tckt_type_cd='${data.tckt_type_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sprt_tckt_type_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE tckt_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSprtTcktTypeMdl
* Description   : Delete existing  Ticket-Type
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSprtTcktTypeMdl = (id,user,callback) => {
    var fnm = "dlteSprtTcktTypeMdl"
    var QRY_TO_EXEC = `UPDATE sprt_tckt_type_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tckt_type_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



