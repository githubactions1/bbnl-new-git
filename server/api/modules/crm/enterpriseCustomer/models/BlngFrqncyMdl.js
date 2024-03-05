var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getBlngFrqncyMdl
* Description   : get details of all billing Frequency
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getBlngFrqncyMdl = (user,callback) => {
    var fnm = "getBlngFrqncyMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY frqncy_id) sno,
                                frqncy_id,frqncy_nm,a_in 
                        FROM blng_frqncy_lst_t  
                        WHERE a_in = 1 
                        ORDER BY frqncy_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchBlngFrqncyMdl
* Description   : search details of all billing Frequency
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchBlngFrqncyMdl = (data,user,callback) => {
    var fnm = "srchBlngFrqncyMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('frqncy_nm')) {
                QRY_WHERE += ` AND frqncy_nm='${data.frqncy_nm}'`
            } 
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY frqncy_id) sno,
                                frqncy_id,frqncy_nm,a_in 
                        FROM blng_frqncy_lst_t  
                        WHERE ${QRY_WHERE} AND frqncy_id= ${data.frqncy_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getBlngFrqncyByIdMdl
* Description   : get details of single  billing Frequency
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getBlngFrqncyByIdMdl = (id,user,callback) => {
    var fnm = "getBlngFrqncyByIdMdl"
    var QRY_TO_EXEC = `SELECT frqncy_id,frqncy_nm,a_in 
                        FROM blng_frqncy_lst_t  
                        WHERE a_in = 1 AND frqncy_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtBlngFrqncyMdl
* Description   : Add new  billing Frequency
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtBlngFrqncyMdl = (data,user,callback) => {
    var fnm = "insrtBlngFrqncyMdl"
    var QRY_TO_EXEC = `INSERT INTO blng_frqncy_lst_t (frqncy_nm,a_in,i_ts,crte_usr_id) 
                        VALUES(&#39;${data.frqncy_nm}&#39;,1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteBlngFrqncyMdl
* Description   : Update existing  billing Frequency
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteBlngFrqncyMdl = (data,id,user,callback) => {
    var fnm = "updteBlngFrqncyMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('frqncy_nm')) {
                QRY_SET += ` , frqncy_nm='${data.frqncy_nm}'`
            } 

    var QRY_TO_EXEC = ` UPDATE blng_frqncy_lst_t  
                        SET u_ts = current_timestamp(), a_in = 0,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE frqncy_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteBlngFrqncyMdl
* Description   : Delete existing  billing Frequency
* Arguments     : callback function
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteBlngFrqncyMdl = (id,user,callback) => {
    var fnm = "dlteBlngFrqncyMdl"
    var QRY_TO_EXEC = `UPDATE blng_frqncy_lst_t  
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE frqncy_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getDepartmentNamesMdl
* Description   : get details of all billing Frequency
* Arguments     : callback function
* Change History :
* 11/07/2023    -  Ramesh Patlola  - Initial Function
*
******************************************************************************/
exports.getDepartmentNamesMdl = (user,callback) => {
    var fnm = "getDepartmentNamesMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY dprmnt_id) sno,dprmnt_id,dprmnt_nm,a_in FROM dprmnt_name_lst_t WHERE a_in = 1 ORDER BY dprmnt_id;`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



