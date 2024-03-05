var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getBrdcrMdl
* Description   : get details of all Broadcasters
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getBrdcrMdl = (user,callback) => {
    var fnm = "getBrdcrMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY brdcr_id) sno,
                                brdcr_id,brdcr_nm,brdcr_cd,cntct_nm,cntct_ph,a_in 
                        FROM brdcr_lst_t 
                        WHERE a_in = 1 
                        ORDER BY brdcr_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchBrdcrMdl
* Description   : search details of all Broadcasters
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchBrdcrMdl = (data,user,callback) => {
    var fnm = "srchBrdcrMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('brdcr_nm')) {
                QRY_WHERE += ` AND brdcr_nm='${data.brdcr_nm}'`
            }  
            if(data.hasOwnProperty('brdcr_cd')) {
                QRY_WHERE += ` AND brdcr_cd='${data.brdcr_cd}'`
            }  
            if(data.hasOwnProperty('cntct_nm')) {
                QRY_WHERE += ` AND cntct_nm='${data.cntct_nm}'`
            }  
            if(data.hasOwnProperty('cntct_ph')) {
                QRY_WHERE += ` AND cntct_ph='${data.cntct_ph}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY brdcr_id) sno,
                                brdcr_id,brdcr_nm,brdcr_cd,cntct_nm,cntct_ph,a_in 
                        FROM brdcr_lst_t 
                        WHERE ${QRY_WHERE} AND brdcr_id= ${data.brdcr_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getBrdcrByIdMdl
* Description   : get details of single  Broadcasters
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getBrdcrByIdMdl = (id,user,callback) => {
    var fnm = "getBrdcrByIdMdl"
    var QRY_TO_EXEC = `SELECT brdcr_id,brdcr_nm,brdcr_cd,cntct_nm,cntct_ph,a_in 
                        FROM brdcr_lst_t 
                        WHERE a_in = 1 AND brdcr_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtBrdcrMdl
* Description   : Add new  Broadcasters
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtBrdcrMdl = (data,user,callback) => {
    var fnm = "insrtBrdcrMdl"
    var QRY_TO_EXEC = `INSERT INTO brdcr_lst_t(brdcr_nm,brdcr_cd,cntct_nm,cntct_ph,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.brdcr_nm}','${data.brdcr_cd}','${data.cntct_nm}','${data.cntct_ph}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteBrdcrMdl
* Description   : Update existing  Broadcasters
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteBrdcrMdl = (data,id,user,callback) => {
    var fnm = "updteBrdcrMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('brdcr_nm')) {
                QRY_SET += ` , brdcr_nm='${data.brdcr_nm}'`
            }  
            if(data.hasOwnProperty('brdcr_cd')) {
                QRY_SET += ` , brdcr_cd='${data.brdcr_cd}'`
            }  
            if(data.hasOwnProperty('cntct_nm')) {
                QRY_SET += ` , cntct_nm='${data.cntct_nm}'`
            }  
            if(data.hasOwnProperty('cntct_ph')) {
                QRY_SET += ` , cntct_ph='${data.cntct_ph}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE brdcr_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE brdcr_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteBrdcrMdl
* Description   : Delete existing  Broadcasters
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteBrdcrMdl = (id,user,callback) => {
    var fnm = "dlteBrdcrMdl"
    var QRY_TO_EXEC = `UPDATE brdcr_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE brdcr_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



