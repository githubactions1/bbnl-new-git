var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSprtTcktCtgryMdl
* Description   : get details of all Category
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTcktCtgryMdl = (user,callback) => {
    var fnm = "getSprtTcktCtgryMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY tckt_ctgry_id) sno,
                                tckt_ctgry_id,tckt_ctgry_nm,tckt_ctgry_dscn_tx,a_in 
                        FROM sprt_tckt_ctgry_lst_t 
                        WHERE a_in = 1 
                        ORDER BY tckt_ctgry_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSprtTcktCtgryMdl
* Description   : search details of all Category
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSprtTcktCtgryMdl = (data,user,callback) => {
    var fnm = "srchSprtTcktCtgryMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('tckt_ctgry_nm')) {
                QRY_WHERE += ` AND tckt_ctgry_nm='${data.tckt_ctgry_nm}'`
            }  
            if(data.hasOwnProperty('tckt_ctgry_dscn_tx')) {
                QRY_WHERE += ` AND tckt_ctgry_dscn_tx='${data.tckt_ctgry_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY tckt_ctgry_id) sno,
                                tckt_ctgry_id,tckt_ctgry_nm,tckt_ctgry_dscn_tx,a_in 
                        FROM sprt_tckt_ctgry_lst_t 
                        WHERE ${QRY_WHERE} AND tckt_ctgry_id= ${data.tckt_ctgry_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSprtTcktCtgryByIdMdl
* Description   : get details of single  Category
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTcktCtgryByIdMdl = (id,user,callback) => {
    var fnm = "getSprtTcktCtgryByIdMdl"
    var QRY_TO_EXEC = `SELECT tckt_ctgry_id,tckt_ctgry_nm,tckt_ctgry_dscn_tx,a_in 
                        FROM sprt_tckt_ctgry_lst_t 
                        WHERE a_in = 1 AND tckt_ctgry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSprtTcktCtgryMdl
* Description   : Add new  Category
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSprtTcktCtgryMdl = (data,user,callback) => {
    var fnm = "insrtSprtTcktCtgryMdl"
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_ctgry_lst_t(tckt_ctgry_nm,tckt_ctgry_dscn_tx,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.tckt_ctgry_nm}','${data.tckt_ctgry_dscn_tx}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSprtTcktCtgryMdl
* Description   : Update existing  Category
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSprtTcktCtgryMdl = (data,id,user,callback) => {
    var fnm = "updteSprtTcktCtgryMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('tckt_ctgry_nm')) {
                QRY_SET += ` , tckt_ctgry_nm='${data.tckt_ctgry_nm}'`
            }  
            if(data.hasOwnProperty('tckt_ctgry_dscn_tx')) {
                QRY_SET += ` , tckt_ctgry_dscn_tx='${data.tckt_ctgry_dscn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sprt_tckt_ctgry_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE tckt_ctgry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSprtTcktCtgryMdl
* Description   : Delete existing  Category
* Arguments     : callback function
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSprtTcktCtgryMdl = (id,user,callback) => {
    var fnm = "dlteSprtTcktCtgryMdl"
    var QRY_TO_EXEC = `UPDATE sprt_tckt_ctgry_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tckt_ctgry_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



