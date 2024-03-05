var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSbstnTypeMdl
* Description   : get details of all subStnTyp
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSbstnTypeMdl = (user,callback) => {
    var fnm = "getSbstnTypeMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY sbstn_type_id) sno,
                                sbstn_type_id,sbstn_type_nm,sbstn_type_cd,a_in 
                        FROM sbstn_type_lst_t 
                        WHERE a_in = 1 
                        ORDER BY sbstn_type_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSbstnTypeMdl
* Description   : search details of all subStnTyp
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSbstnTypeMdl = (data,user,callback) => {
    var fnm = "srchSbstnTypeMdl"
    var QRY_WHERE = "1 = 1"

     
            if(data.hasOwnProperty('sbstn_type_nm')) {
                QRY_WHERE += ` AND sbstn_type_nm='${data.sbstn_type_nm}'`
            }  
            if(data.hasOwnProperty('sbstn_type_cd')) {
                QRY_WHERE += ` AND sbstn_type_cd='${data.sbstn_type_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY sbstn_type_id) sno,
                                sbstn_type_id,sbstn_type_nm,sbstn_type_cd,a_in 
                        FROM sbstn_type_lst_t 
                        WHERE ${QRY_WHERE} AND sbstn_type_id= ${data.sbstn_type_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSbstnTypeByIdMdl
* Description   : get details of single  subStnTyp
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSbstnTypeByIdMdl = (id,user,callback) => {
    var fnm = "getSbstnTypeByIdMdl"
    var QRY_TO_EXEC = `SELECT sbstn_type_id,sbstn_type_nm,sbstn_type_cd,a_in 
                        FROM sbstn_type_lst_t 
                        WHERE a_in = 1 AND sbstn_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSbstnTypeMdl
* Description   : Add new  subStnTyp
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSbstnTypeMdl = (data,user,callback) => {
    var fnm = "insrtSbstnTypeMdl"
    var QRY_TO_EXEC = `INSERT INTO sbstn_type_lst_t(sbstn_type_nm,sbstn_type_cd,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.sbstn_type_nm}','${data.sbstn_type_cd}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSbstnTypeMdl
* Description   : Update existing  subStnTyp
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSbstnTypeMdl = (data,id,user,callback) => {
    var fnm = "updteSbstnTypeMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('sbstn_type_nm')) {
                QRY_SET += ` , sbstn_type_nm='${data.sbstn_type_nm}'`
            }  
            if(data.hasOwnProperty('sbstn_type_cd')) {
                QRY_SET += ` , sbstn_type_cd='${data.sbstn_type_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE sbstn_type_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE sbstn_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSbstnTypeMdl
* Description   : Delete existing  subStnTyp
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSbstnTypeMdl = (id,user,callback) => {
    var fnm = "dlteSbstnTypeMdl"
    var QRY_TO_EXEC = `UPDATE sbstn_type_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE sbstn_type_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



