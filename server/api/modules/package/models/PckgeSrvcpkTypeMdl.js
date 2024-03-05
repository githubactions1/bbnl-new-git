var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getPckgeSrvcpkTypeMdl
* Description   : get details of all packageServicetype
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgeSrvcpkTypeMdl = (user,callback) => {
    var fnm = "getPckgeSrvcpkTypeMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY srvcpk_type_id) sno,
                                srvcpk_type_id,srvcpk_type_nm,srvcpk_type_cd,a_in 
                        FROM pckge_srvcpk_type_lst_t 
                        WHERE a_in = 1 
                        ORDER BY srvcpk_type_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchPckgeSrvcpkTypeMdl
* Description   : search details of all packageServicetype
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchPckgeSrvcpkTypeMdl = (data,user,callback) => {
    var fnm = "srchPckgeSrvcpkTypeMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('srvcpk_type_nm')) {
                QRY_WHERE += ` AND srvcpk_type_nm='${data.srvcpk_type_nm}'`
            }  
            if(data.hasOwnProperty('srvcpk_type_cd')) {
                QRY_WHERE += ` AND srvcpk_type_cd='${data.srvcpk_type_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY srvcpk_type_id) sno,
                                srvcpk_type_id,srvcpk_type_nm,srvcpk_type_cd,a_in 
                        FROM pckge_srvcpk_type_lst_t 
                        WHERE ${QRY_WHERE} AND srvcpk_type_id= ${data.srvcpk_type_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPckgeSrvcpkTypeByIdMdl
* Description   : get details of single  packageServicetype
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgeSrvcpkTypeByIdMdl = (id,user,callback) => {
    var fnm = "getPckgeSrvcpkTypeByIdMdl"
    var QRY_TO_EXEC = `SELECT srvcpk_type_id,srvcpk_type_nm,srvcpk_type_cd,a_in 
                        FROM pckge_srvcpk_type_lst_t 
                        WHERE a_in = 1 AND srvcpk_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtPckgeSrvcpkTypeMdl
* Description   : Add new  packageServicetype
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtPckgeSrvcpkTypeMdl = (data,user,callback) => {
    var fnm = "insrtPckgeSrvcpkTypeMdl"
    var QRY_TO_EXEC = `INSERT INTO pckge_srvcpk_type_lst_t(srvcpk_type_nm,srvcpk_type_cd,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.srvcpk_type_nm}','${data.srvcpk_type_cd}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updtePckgeSrvcpkTypeMdl
* Description   : Update existing  packageServicetype
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtePckgeSrvcpkTypeMdl = (data,id,user,callback) => {
    var fnm= "updtePckgeSrvcpkTypeMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('srvcpk_type_nm')) {
                QRY_SET += ` , srvcpk_type_nm='${data.srvcpk_type_nm}'`
            }  
            if(data.hasOwnProperty('srvcpk_type_cd')) {
                QRY_SET += ` , srvcpk_type_cd='${data.srvcpk_type_cd}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE pckge_srvcpk_type_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE srvcpk_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dltePckgeSrvcpkTypeMdl
* Description   : Delete existing  packageServicetype
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dltePckgeSrvcpkTypeMdl = (id,user,callback) => {
    var fnm = "dltePckgeSrvcpkTypeMdl"
    var QRY_TO_EXEC = `UPDATE pckge_srvcpk_type_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE srvcpk_type_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



