var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getDstrtMdl
* Description   : get details of all districts
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getDstrtMdl = (user,callback) => {
    var fnm = "getDstrtMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY dstrt_lst_t.dstrt_id) sno, ste_lst_t.ste_nm,dstrt_lst_t.* FROM dstrt_lst_t  JOIN ste_lst_t On ste_lst_t.ste_id = dstrt_lst_t.ste_id where dstrt_lst_t.a_in = 1 ORDER BY dstrt_lst_t.dstrt_nm ASC;` 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchDstrtMdl
* Description   : search details of all districts
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchDstrtMdl = (data,user,callback) => {
    var fnm = "srchDstrtMdl"
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('ste_id')) {
                QRY_WHERE += ` AND ste_id=${data.ste_id}`
            }   
            if(data.hasOwnProperty('dstrt_nm')) {
                QRY_WHERE += ` AND dstrt_nm='${data.dstrt_nm}'`
            }  
            if(data.hasOwnProperty('dstrt_cd')) {
                QRY_WHERE += ` AND dstrt_cd='${data.dstrt_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY dstrt_id) sno,
                                dstrt_id,ste_id,dstrt_nm,dstrt_cd,a_in 
                        FROM dstrt_lst_t 
                        WHERE ${QRY_WHERE} AND dstrt_id= ${data.dstrt_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getDstrtByIdMdl
* Description   : get details of single  districts
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getDstrtByIdMdl = (id,user,callback) => {
    var fnm = "getDstrtByIdMdl"
    var QRY_TO_EXEC = `SELECT dstrt_id,ste_id,dstrt_nm,dstrt_cd,a_in 
                        FROM dstrt_lst_t 
                        WHERE a_in = 1 AND dstrt_id= ${id} ORDER BY dstrt_nm ASC; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : get_DstrtBySteIdMdl
* Description   : get details of   districts bt state id
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_DstrtBySteIdMdl = (id,user,callback) => {
    var fnm = "get_DstrtBySteIdMdl"
    var QRY_TO_EXEC = `SELECT dstrt_id,ste_id,dstrt_nm,dstrt_cd,a_in 
                        FROM dstrt_lst_t 
                        WHERE a_in = 1 AND ste_id= ${id} ORDER BY dstrt_nm ASC; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getDstbySteMdl
* Description   : get details of single  districts
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getDstbySteMdl = (id,user,callback) => {
    var fnm = "getDstbySteMdl"
    var QRY_TO_EXEC = `SELECT dstrt_id,ste_id,dstrt_nm,dstrt_cd,a_in 
                        FROM dstrt_lst_t 
                        WHERE a_in = 1 AND ste_id= ${id}; ORDER BY dstrt_nm ASC `;
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
* Function      : insrtDstrtMdl
* Description   : Add new  districts
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtDstrtMdl = (data,user,callback) => {
    var fnm = "insrtDstrtMdl"
    var QRY_TO_EXEC = `INSERT INTO dstrt_lst_t(ste_id,dstrt_nm,dstrt_cd,a_in,i_ts,crte_usr_id) 
                        VALUES(${data.ste_id},'${data.dstrt_nm}','${data.dstrt_cd}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteDstrtMdl
* Description   : Update existing  districts
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteDstrtMdl = (data,id,user,callback) => {
    var fnm = "updteDstrtMdl"
    var QRY_SET = ""
       
            if(data.hasOwnProperty('ste_id')) {
                QRY_SET += ` , ste_id=${data.ste_id}`
            }   
            if(data.hasOwnProperty('dstrt_nm')) {
                QRY_SET += ` , dstrt_nm='${data.dstrt_nm}'`
            }  
            if(data.hasOwnProperty('dstrt_cd')) {
                QRY_SET += ` , dstrt_cd='${data.dstrt_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE dstrt_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE dstrt_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteDstrtMdl
* Description   : Delete existing  districts
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteDstrtMdl = (id,user,callback) => {
    var fnm = "dlteDstrtMdl"
    var QRY_TO_EXEC = `UPDATE dstrt_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE dstrt_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



