var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getVlgeMdl
* Description   : get details of all villages
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getVlgeMdl = (user,callback) => {
    var fnm = "getVlgeMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY vlge_lst_t.vlge_id) sno, ste_lst_t.ste_nm, dstrt_lst_t.dstrt_nm, mndl_lst_t.mndl_nm,vlge_lst_t.* FROM vlge_lst_t  JOIN ste_lst_t On ste_lst_t.ste_id = vlge_lst_t.ste_id JOIN dstrt_lst_t On dstrt_lst_t.dstrt_id = vlge_lst_t.dstrt_id JOIN mndl_lst_t On mndl_lst_t.mndl_id = vlge_lst_t.mndl_id where vlge_lst_t.a_in = 1 ORDER BY vlge_lst_t.vlge_nm ASC;` 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchVlgeMdl
* Description   : search details of all villages
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchVlgeMdl = (data,user,callback) => {
    var fnm = "srchVlgeMdl"
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('ste_id')) {
                QRY_WHERE += ` AND ste_id=${data.ste_id}`
            }     
            if(data.hasOwnProperty('dstrt_id')) {
                QRY_WHERE += ` AND dstrt_id=${data.dstrt_id}`
            }     
            if(data.hasOwnProperty('mndl_id')) {
                QRY_WHERE += ` AND mndl_id=${data.mndl_id}`
            }   
            if(data.hasOwnProperty('vlge_nm')) {
                QRY_WHERE += ` AND vlge_nm='${data.vlge_nm}'`
            }  
            if(data.hasOwnProperty('vlge_cd')) {
                QRY_WHERE += ` AND vlge_cd='${data.vlge_cd}'`
            }    
            if(data.hasOwnProperty('ptnl_ct')) {
                QRY_WHERE += ` AND ptnl_ct=${data.ptnl_ct}`
            }     
            if(data.hasOwnProperty('trgt_ct')) {
                QRY_WHERE += ` AND trgt_ct=${data.trgt_ct}`
            }     
            if(data.hasOwnProperty('std_cd')) {
                QRY_WHERE += ` AND std_cd=${data.std_cd}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY vlge_id) sno,
                                vlge_id,mndl_id,ste_id,dstrt_id,vlge_nm,vlge_cd,ptnl_ct,trgt_ct,std_cd,a_in 
                        FROM vlge_lst_t 
                        WHERE ${QRY_WHERE} AND vlge_id= ${data.vlge_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getVlgeByIdMdl
* Description   : get details of single  villages
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getVlgeByIdMdl = (id,user,callback) => {
    var fnm = "getVlgeByIdMdl"
    var QRY_TO_EXEC = `SELECT vlge_id,mndl_id,ste_id,dstrt_id,vlge_nm,vlge_cd,ptnl_ct,trgt_ct,std_cd,a_in 
                        FROM vlge_lst_t 
                        WHERE a_in = 1 AND vlge_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : get_VlgeByMndlIdMdl
* Description   : get details of village by Mandal Id
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_VlgeByMndlIdMdl = (id,user,callback) => {
    var fnm = "get_VlgeByMndlIdMdl"
    var QRY_TO_EXEC = `SELECT vlge_id,mndl_id,ste_id,dstrt_id,vlge_nm,vlge_cd,ptnl_ct,trgt_ct,std_cd,a_in,vlge_nu
                        FROM vlge_lst_t 
                        WHERE a_in = 1 AND mndl_id= ${id}; `;
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
* Function      : insrtVlgeMdl
* Description   : Add new  villages
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtVlgeMdl = (data,user,callback) => {
    var fnm = "insrtVlgeMdl"
    var QRY_TO_EXEC = `INSERT INTO vlge_lst_t(mndl_id,ste_id,dstrt_id,vlge_nm,vlge_cd,ptnl_ct,trgt_ct,std_cd,a_in,i_ts,crte_usr_id) 
                        VALUES(${data.mndl_id},${data.ste_id},${data.dstrt_id},'${data.vlge_nm}','${data.vlge_cd}',${data.ptnl_ct == undefined?0:data.ptnl_ct},${data.trgt_ct== undefined?0:data.trgt_ct},${data.std_cd},1,CURRENT_TIMESTAMP(),${user.user_id})`;
console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteVlgeMdl
* Description   : Update existing  villages
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteVlgeMdl = (data,id,user,callback) => {
    var fnm = "updteVlgeMdl"
    var QRY_SET = ""
       
            if(data.hasOwnProperty('ste_id')) {
                QRY_SET += ` , ste_id=${data.ste_id}`
            }     
            if(data.hasOwnProperty('dstrt_id')) {
                QRY_SET += ` , dstrt_id=${data.dstrt_id}`
            }     
            if(data.hasOwnProperty('mndl_id')) {
                QRY_SET += ` , mndl_id=${data.mndl_id}`
            }   
            if(data.hasOwnProperty('vlge_nm')) {
                QRY_SET += ` , vlge_nm='${data.vlge_nm}'`
            }  
            if(data.hasOwnProperty('vlge_cd')) {
                QRY_SET += ` , vlge_cd='${data.vlge_cd}'`
            }    
            if(data.hasOwnProperty('ptnl_ct')) {
                QRY_SET += ` , ptnl_ct=${data.ptnl_ct}`
            }     
            if(data.hasOwnProperty('trgt_ct')) {
                QRY_SET += ` , trgt_ct=${data.trgt_ct}`
            }     
            if(data.hasOwnProperty('std_cd')) {
                QRY_SET += ` , std_cd=${data.std_cd}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE vlge_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE vlge_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteVlgeMdl
* Description   : Delete existing  villages
* Arguments     : callback function
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteVlgeMdl = (id,user,callback) => {
    var fnm = "dlteVlgeMdl"
    var QRY_TO_EXEC = `UPDATE vlge_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE vlge_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



