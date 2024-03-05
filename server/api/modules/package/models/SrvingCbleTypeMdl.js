var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getSrvingCbleTypeMdl
* Description   : get details of all srvngcbltyplst
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSrvingCbleTypeMdl = (user,callback) => {
    var fnm = "getSrvingCbleTypeMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY cble_type_id) sno,
                                cble_type_id,cble_type_nm,a_in 
                        FROM srving_cble_type_lst_t 
                        WHERE a_in = 1 
                        ORDER BY cble_type_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchSrvingCbleTypeMdl
* Description   : search details of all srvngcbltyplst
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchSrvingCbleTypeMdl = (data,user,callback) => {
    var fnm = "srchSrvingCbleTypeMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('cble_type_nm')) {
                QRY_WHERE += ` AND cble_type_nm='${data.cble_type_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY cble_type_id) sno,
                                cble_type_id,cble_type_nm,a_in 
                        FROM srving_cble_type_lst_t 
                        WHERE ${QRY_WHERE} AND cble_type_id= ${data.cble_type_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getSrvingCbleTypeByIdMdl
* Description   : get details of single  srvngcbltyplst
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getSrvingCbleTypeByIdMdl = (id,user,callback) => {
    var fnm = "getSrvingCbleTypeByIdMdl"
    var QRY_TO_EXEC = `SELECT cble_type_id,cble_type_nm,a_in 
                        FROM srving_cble_type_lst_t 
                        WHERE a_in = 1 AND cble_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtSrvingCbleTypeMdl
* Description   : Add new  srvngcbltyplst
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSrvingCbleTypeMdl = (data,user,callback) => {
    var fnm = "insrtSrvingCbleTypeMdl"
    var QRY_TO_EXEC = `INSERT INTO srving_cble_type_lst_t(cble_type_nm,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.cble_type_nm}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteSrvingCbleTypeMdl
* Description   : Update existing  srvngcbltyplst
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteSrvingCbleTypeMdl = (data,id,user,callback) => {
    var fnm = "updteSrvingCbleTypeMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('cble_type_nm')) {
                QRY_SET += ` , cble_type_nm='${data.cble_type_nm}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE srving_cble_type_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE cble_type_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteSrvingCbleTypeMdl
* Description   : Delete existing  srvngcbltyplst
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteSrvingCbleTypeMdl = (id,user,callback) => {
    var fnm= "dlteSrvingCbleTypeMdl"
    var QRY_TO_EXEC = `UPDATE srving_cble_type_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE cble_type_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



