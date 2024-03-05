var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getDsgnMdl
* Description   : get details of all Designations
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getDsgnMdl = (user,callback) => {
    var fnm = "getDsgnMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY dsgn_id) sno,
                                dsgn_id,dsgn_nm,a_in,d_in 
                        FROM dsgn_lst_t 
                        WHERE a_in = 1 
                        ORDER BY dsgn_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchDsgnMdl
* Description   : search details of all Designations
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchDsgnMdl = (data,user,callback) => {
    var fnm = "srchDsgnMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('dsgn_nm')) {
                QRY_WHERE += ` AND dsgn_nm='${data.dsgn_nm}'`
            }    
            if(data.hasOwnProperty('d_in')) {
                QRY_WHERE += ` AND d_in=${data.d_in}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY dsgn_id) sno,
                                dsgn_id,dsgn_nm,a_in,d_in 
                        FROM dsgn_lst_t 
                        WHERE ${QRY_WHERE} AND dsgn_id= ${data.dsgn_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getDsgnByIdMdl
* Description   : get details of single  Designations
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getDsgnByIdMdl = (id,user,callback) => {
    var fnm = "getDsgnByIdMdl"
    var QRY_TO_EXEC = `SELECT dsgn_id,dsgn_nm,a_in,d_in 
                        FROM dsgn_lst_t 
                        WHERE a_in = 1 AND dsgn_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtDsgnMdl
* Description   : Add new  Designations
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtDsgnMdl = (data,user,callback) => {
    var fnm = "insrtDsgnMdl"
    var QRY_TO_EXEC = `INSERT INTO dsgn_lst_t(dsgn_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.dsgn_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteDsgnMdl
* Description   : Update existing  Designations
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteDsgnMdl = (data,id,user,callback) => {
    var fnm = "updteDsgnMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('dsgn_nm')) {
                QRY_SET += ` , dsgn_nm='${data.dsgn_nm}'`
            }    
            if(data.hasOwnProperty('d_in')) {
                QRY_SET += ` , d_in=${data.d_in}`
            }  

    var QRY_TO_EXEC = ` UPDATE dsgn_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE dsgn_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteDsgnMdl
* Description   : Delete existing  Designations
* Arguments     : callback function
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteDsgnMdl = (id,user,callback) => {
    var fnm = "dlteDsgnMdl"
    var QRY_TO_EXEC = `UPDATE dsgn_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE dsgn_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



