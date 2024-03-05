var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getMndlMdl
* Description   : get details of all mandals
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getMndlMdl = (user,callback) => {
    var fnm = "getMndlMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY mndl_lst_t.mndl_id) sno, ste_lst_t.ste_nm, dstrt_lst_t.dstrt_nm,mndl_lst_t.* FROM mndl_lst_t  JOIN ste_lst_t On ste_lst_t.ste_id = mndl_lst_t.ste_id JOIN dstrt_lst_t On dstrt_lst_t.dstrt_id = mndl_lst_t.dstrt_id where mndl_lst_t.a_in = 1 ORDER BY mndl_lst_t.mndl_nm ASC;` 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchMndlMdl
* Description   : search details of all mandals
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchMndlMdl = (data,user,callback) => {
    var fnm = "srchMndlMdl"
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('ste_id')) {
                QRY_WHERE += ` AND ste_id=${data.ste_id}`
            }     
            if(data.hasOwnProperty('dstrt_id')) {
                QRY_WHERE += ` AND dstrt_id=${data.dstrt_id}`
            }   
            if(data.hasOwnProperty('mndl_nm')) {
                QRY_WHERE += ` AND mndl_nm='${data.mndl_nm}'`
            }  
            if(data.hasOwnProperty('mndl_shrt_nm')) {
                QRY_WHERE += ` AND mndl_shrt_nm='${data.mndl_shrt_nm}'`
            }  
            if(data.hasOwnProperty('mndl_cd')) {
                QRY_WHERE += ` AND mndl_cd='${data.mndl_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY mndl_id) sno,
                                mndl_id,ste_id,dstrt_id,mndl_nm,mndl_shrt_nm,mndl_cd,a_in 
                        FROM mndl_lst_t 
                        WHERE ${QRY_WHERE} AND mndl_id= ${data.mndl_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm ,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getMndlByIdMdl
* Description   : get details of single  mandals
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getMndlByIdMdl = (id,user,callback) => {
    var fnm = "getMndlByIdMdl"
    var QRY_TO_EXEC = `SELECT mndl_id,ste_id,dstrt_id,mndl_nm,mndl_nu,mndl_shrt_nm,mndl_cd,a_in 
                        FROM mndl_lst_t 
                        WHERE a_in = 1 AND dstrt_id= ${id}; `;
                        console.log(QRY_TO_EXEC)
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_MndlBydstIdMdl
* Description   : get details of single  mandals
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_MndlByDstIdMdl = (id,user,callback) => {
    var fnm = "get_MndlByDstIdMdl"
    var QRY_TO_EXEC = `SELECT mndl_id,ste_id,dstrt_id,mndl_nu,mndl_nm,mndl_shrt_nm,mndl_cd,a_in 
                        FROM mndl_lst_t 
                        WHERE a_in = 1 AND dstrt_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : insrtMndlMdl
* Description   : Add new  mandals
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtMndlMdl = (data,user,callback) => {
    var fnm = "insrtMndlMdl"
    var QRY_TO_EXEC = `INSERT INTO mndl_lst_t(ste_id,dstrt_id,mndl_nm,mndl_shrt_nm,mndl_cd,a_in,i_ts,crte_usr_id) 
                        VALUES(${data.ste_id},${data.dstrt_id},'${data.mndl_nm}','${data.mndl_shrt_nm}','${data.mndl_cd}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteMndlMdl
* Description   : Update existing  mandals
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteMndlMdl = (data,id,user,callback) => {
    var fnm = "updteMndlMdl"
    var QRY_SET = ""
       
            if(data.hasOwnProperty('ste_id')) {
                QRY_SET += ` , ste_id=${data.ste_id}`
            }     
            if(data.hasOwnProperty('dstrt_id')) {
                QRY_SET += ` , dstrt_id=${data.dstrt_id}`
            }   
            if(data.hasOwnProperty('mndl_nm')) {
                QRY_SET += ` , mndl_nm='${data.mndl_nm}'`
            }  
            if(data.hasOwnProperty('mndl_shrt_nm')) {
                QRY_SET += ` , mndl_shrt_nm='${data.mndl_shrt_nm}'`
            }  
            if(data.hasOwnProperty('mndl_cd')) {
                QRY_SET += ` , mndl_cd='${data.mndl_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE mndl_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE mndl_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteMndlMdl
* Description   : Delete existing  mandals
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteMndlMdl = (id,user,callback) => {
    var fnm = "dlteMndlMdl"
    var QRY_TO_EXEC = `UPDATE mndl_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE mndl_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



