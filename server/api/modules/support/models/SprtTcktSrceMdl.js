var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSprtTcktSrceMdl
* Description   : get details of all Ticket-Source
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTcktSrceMdl = (user,callback) => {
    var fnm = "getSprtTcktSrceMdl"
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY tckt_srce_id) sno,
                                tckt_srce_id,tckt_srce_nm,tckt_srce_cd,a_in 
                        FROM sprt_tckt_srce_lst_t 
                        WHERE a_in = 1 
                        ORDER BY tckt_srce_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSprtTcktSrceMdl
* Description   : search details of all Ticket-Source
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSprtTcktSrceMdl = (data,user,callback) => {
    var fnm = "srchSprtTcktSrceMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('tckt_srce_nm')) {
                QRY_WHERE += ` AND tckt_srce_nm='${data.tckt_srce_nm}'`
            }  
            if(data.hasOwnProperty('tckt_srce_cd')) {
                QRY_WHERE += ` AND tckt_srce_cd='${data.tckt_srce_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY tckt_srce_id) sno,
                                tckt_srce_id,tckt_srce_nm,tckt_srce_cd,a_in 
                        FROM sprt_tckt_srce_lst_t 
                        WHERE ${QRY_WHERE} AND tckt_srce_id= ${data.tckt_srce_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSprtTcktSrceByIdMdl
* Description   : get details of single  Ticket-Source
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTcktSrceByIdMdl = (id,user,callback) => {
    var fnm = "getSprtTcktSrceByIdMdl"
    var QRY_TO_EXEC = `SELECT tckt_srce_id,tckt_srce_nm,tckt_srce_cd,a_in 
                        FROM sprt_tckt_srce_lst_t 
                        WHERE a_in = 1 AND tckt_srce_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSprtTcktSrceMdl
* Description   : Add new  Ticket-Source
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSprtTcktSrceMdl = (data,user,callback) => {
    var fnm = "insrtSprtTcktSrceMdl"
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_srce_lst_t(tckt_srce_nm,tckt_srce_cd,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.tckt_srce_nm}','${data.tckt_srce_cd}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSprtTcktSrceMdl
* Description   : Update existing  Ticket-Source
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSprtTcktSrceMdl = (data,id,user,callback) => {
    var fnm = "updteSprtTcktSrceMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('tckt_srce_nm')) {
                QRY_SET += ` , tckt_srce_nm='${data.tckt_srce_nm}'`
            }  
            if(data.hasOwnProperty('tckt_srce_cd')) {
                QRY_SET += ` , tckt_srce_cd='${data.tckt_srce_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sprt_tckt_srce_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE tckt_srce_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSprtTcktSrceMdl
* Description   : Delete existing  Ticket-Source
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSprtTcktSrceMdl = (id,user,callback) => {
    var fnm = "dlteSprtTcktSrceMdl"
    var QRY_TO_EXEC = `UPDATE sprt_tckt_srce_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tckt_srce_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



