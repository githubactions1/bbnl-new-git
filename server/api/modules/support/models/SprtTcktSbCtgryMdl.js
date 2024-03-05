var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSprtTcktSbCtgryMdl
* Description   : get details of all Sub-Category
* Arguments     : callback function
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTcktSbCtgryMdl = (user,callback) => {
    var fnm = "getSprtTcktSbCtgryMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY sprt_tckt_sb_ctgry_lst_t.tckt_sb_ctgry_id) sno, sprt_tckt_ctgry_lst_t.tckt_ctgry_nm,sprt_tckt_sb_ctgry_lst_t.* FROM sprt_tckt_sb_ctgry_lst_t  JOIN sprt_tckt_ctgry_lst_t On sprt_tckt_ctgry_lst_t.tckt_ctgry_id = sprt_tckt_sb_ctgry_lst_t.tckt_ctgry_id where sprt_tckt_sb_ctgry_lst_t.a_in = 1 ORDER BY sprt_tckt_sb_ctgry_lst_t.tckt_sb_ctgry_id ASC;` 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSprtTcktSbCtgryMdl
* Description   : search details of all Sub-Category
* Arguments     : callback function
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSprtTcktSbCtgryMdl = (data,user,callback) => {
    var fnm = "srchSprtTcktSbCtgryMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('tckt_sb_ctgry_nm')) {
                QRY_WHERE += ` AND tckt_sb_ctgry_nm='${data.tckt_sb_ctgry_nm}'`
            }    
            if(data.hasOwnProperty('tckt_ctgry_id')) {
                QRY_WHERE += ` AND tckt_ctgry_id=${data.tckt_ctgry_id}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY tckt_sb_ctgry_id) sno,
                                tckt_sb_ctgry_id,tckt_sb_ctgry_nm,tckt_ctgry_id,a_in 
                        FROM sprt_tckt_sb_ctgry_lst_t 
                        WHERE ${QRY_WHERE} AND tckt_sb_ctgry_id= ${data.tckt_sb_ctgry_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSprtTcktSbCtgryByIdMdl
* Description   : get details of single  Sub-Category
* Arguments     : callback function
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSprtTcktSbCtgryByIdMdl = (id,user,callback) => {
    var fnm = "getSprtTcktSbCtgryByIdMdl"
    var QRY_TO_EXEC = `SELECT tckt_sb_ctgry_id,tckt_sb_ctgry_nm,tckt_ctgry_id,a_in 
                        FROM sprt_tckt_sb_ctgry_lst_t 
                        WHERE a_in = 1 AND tckt_sb_ctgry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSprtTcktSbCtgryMdl
* Description   : Add new  Sub-Category
* Arguments     : callback function
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSprtTcktSbCtgryMdl = (data,user,callback) => {
    var fnm = "insrtSprtTcktSbCtgryMdl"
    var QRY_TO_EXEC = `INSERT INTO sprt_tckt_sb_ctgry_lst_t(tckt_sb_ctgry_nm,tckt_ctgry_id,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.tckt_sb_ctgry_nm}',${data.tckt_ctgry_id},1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSprtTcktSbCtgryMdl
* Description   : Update existing  Sub-Category
* Arguments     : callback function
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSprtTcktSbCtgryMdl = (data,id,user,callback) => {
    var fnm = "updteSprtTcktSbCtgryMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('tckt_sb_ctgry_nm')) {
                QRY_SET += ` , tckt_sb_ctgry_nm='${data.tckt_sb_ctgry_nm}'`
            }    
            if(data.hasOwnProperty('tckt_ctgry_id')) {
                QRY_SET += ` , tckt_ctgry_id=${data.tckt_ctgry_id}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sprt_tckt_sb_ctgry_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE tckt_sb_ctgry_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSprtTcktSbCtgryMdl
* Description   : Delete existing  Sub-Category
* Arguments     : callback function
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSprtTcktSbCtgryMdl = (id,user,callback) => {
    var fnm = "dlteSprtTcktSbCtgryMdl"
    var QRY_TO_EXEC = `UPDATE sprt_tckt_sb_ctgry_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tckt_sb_ctgry_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



