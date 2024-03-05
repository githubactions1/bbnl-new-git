var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getCtyMdl
* Description   : get details of all cities
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCtyMdl = (user,callback) => {
    var fnm = "getCtyMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cty_lst_t.cty_id) sno, ste_lst_t.ste_nm, dstrt_lst_t.dstrt_nm,cty_lst_t.* FROM cty_lst_t  JOIN ste_lst_t On ste_lst_t.ste_id = cty_lst_t.ste_id JOIN dstrt_lst_t On dstrt_lst_t.dstrt_id = cty_lst_t.dstrt_id where cty_lst_t.a_in = 1 ORDER BY cty_lst_t.cty_id ASC;` 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchCtyMdl
* Description   : search details of all cities
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchCtyMdl = (data,user,callback) => {
    var fnm = "srchCtyMdl"
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('ste_id')) {
                QRY_WHERE += ` AND ste_id=${data.ste_id}`
            }     
            if(data.hasOwnProperty('dstrt_id')) {
                QRY_WHERE += ` AND dstrt_id=${data.dstrt_id}`
            }   
            if(data.hasOwnProperty('cty_nm')) {
                QRY_WHERE += ` AND cty_nm='${data.cty_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY cty_id) sno,
                                cty_id,ste_id,dstrt_id,cty_nm,a_in 
                        FROM cty_lst_t 
                        WHERE ${QRY_WHERE} AND cty_id= ${data.cty_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCtyByIdMdl
* Description   : get details of single  cities
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCtyByIdMdl = (id,user,callback) => {
    var fnm = "getCtyByIdMdl"
    var QRY_TO_EXEC = `SELECT cty_id,ste_id,dstrt_id,cty_nm,a_in 
                        FROM cty_lst_t 
                        WHERE a_in = 1 AND cty_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCtyMdl
* Description   : Add new  cities
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtCtyMdl = (data,user,callback) => {
    var fnm = "insrtCtyMdl"
    var QRY_TO_EXEC = `INSERT INTO cty_lst_t(ste_id,dstrt_id,cty_nm,a_in,i_ts,crte_usr_id) 
                        VALUES(${data.ste_id},${data.dstrt_id},'${data.cty_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteCtyMdl
* Description   : Update existing  cities
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteCtyMdl = (data,id,user,callback) => {
    var fnm = "updteCtyMdl"
    var QRY_SET = ""
       
            if(data.hasOwnProperty('ste_id')) {
                QRY_SET += ` , ste_id=${data.ste_id}`
            }     
            if(data.hasOwnProperty('dstrt_id')) {
                QRY_SET += ` , dstrt_id=${data.dstrt_id}`
            }   
            if(data.hasOwnProperty('cty_nm')) {
                QRY_SET += ` , cty_nm='${data.cty_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE cty_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE cty_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteCtyMdl
* Description   : Delete existing  cities
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteCtyMdl = (id,user,callback) => {
    var fnm = "dlteCtyMdl"
    var QRY_TO_EXEC = `UPDATE cty_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE cty_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



