var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getOrgnMdl
* Description   : get details of all Organisations
* Arguments     : callback function
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getOrgnMdl = (user,callback) => {
    var fnm = "getOrgnMdl"
    
    
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY orgn_id) sno,
                                orgn_id,orgn_nm,wb_url_tx,addr1_tx,addr2_tx,city_nm,cntct_nm,cntct_ph,a_in 
                        FROM orgn_lst_t 
                        WHERE a_in = 1 
                        ORDER BY orgn_id; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchOrgnMdl
* Description   : search details of all Organisations
* Arguments     : callback function
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchOrgnMdl = (data,user,callback) => {
    var fnm = "srchOrgnMdl"
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('orgn_id')) {
                QRY_WHERE += ` AND orgn_id=${data.orgn_id}`
            }   
            if(data.hasOwnProperty('orgn_nm')) {
                QRY_WHERE += ` AND orgn_nm='${data.orgn_nm}'`
            }  
            if(data.hasOwnProperty('wb_url_tx')) {
                QRY_WHERE += ` AND wb_url_tx='${data.wb_url_tx}'`
            }  
            if(data.hasOwnProperty('addr1_tx')) {
                QRY_WHERE += ` AND addr1_tx='${data.addr1_tx}'`
            }  
            if(data.hasOwnProperty('addr2_tx')) {
                QRY_WHERE += ` AND addr2_tx='${data.addr2_tx}'`
            }  
            if(data.hasOwnProperty('city_nm')) {
                QRY_WHERE += ` AND city_nm='${data.city_nm}'`
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
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY orgn_id) sno,
                                orgn_id,orgn_nm,wb_url_tx,addr1_tx,addr2_tx,city_nm,cntct_nm,cntct_ph,a_in 
                        FROM orgn_lst_t 
                        WHERE ${QRY_WHERE} AND orgn_id= ${data.orgn_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getOrgnByIdMdl
* Description   : get details of single  Organisations
* Arguments     : callback function
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getOrgnByIdMdl = (id,user,callback) => {
    var fnm = "getOrgnByIdMdl"
    var QRY_TO_EXEC = `SELECT orgn_id,orgn_nm,wb_url_tx,addr1_tx,addr2_tx,city_nm,cntct_nm,cntct_ph,a_in 
                        FROM orgn_lst_t 
                        WHERE a_in = 1 AND orgn_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtOrgnMdl
* Description   : Add new  Organisations
* Arguments     : callback function
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtOrgnMdl = (data,user,callback) => {
    var fnm = "insrtOrgnMdl"
    var QRY_TO_EXEC = `INSERT INTO orgn_lst_t(orgn_nm,wb_url_tx,addr1_tx,addr2_tx,city_nm,cntct_nm,cntct_ph,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.orgn_nm}','${data.wb_url_tx}','${data.addr1_tx}','${data.addr2_tx}','${data.city_nm}','${data.cntct_nm}','${data.cntct_ph}',1,CURRENT_TIMESTAMP(),${user.mrcht_usr_id})`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteOrgnMdl
* Description   : Update existing  Organisations
* Arguments     : callback function
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteOrgnMdl = (data,id,user,callback) => {
    var fnm = "updteOrgnMdl"
    var QRY_SET = ""
       
            if(data.hasOwnProperty('orgn_id')) {
                QRY_SET += ` , orgn_id=${data.orgn_id}`
            }   
            if(data.hasOwnProperty('orgn_nm')) {
                QRY_SET += ` , orgn_nm='${data.orgn_nm}'`
            }  
            if(data.hasOwnProperty('wb_url_tx')) {
                QRY_SET += ` , wb_url_tx='${data.wb_url_tx}'`
            }  
            if(data.hasOwnProperty('addr1_tx')) {
                QRY_SET += ` , addr1_tx='${data.addr1_tx}'`
            }  
            if(data.hasOwnProperty('addr2_tx')) {
                QRY_SET += ` , addr2_tx='${data.addr2_tx}'`
            }  
            if(data.hasOwnProperty('city_nm')) {
                QRY_SET += ` , city_nm='${data.city_nm}'`
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

    var QRY_TO_EXEC = ` UPDATE orgn_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE orgn_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteOrgnMdl
* Description   : Delete existing  Organisations
* Arguments     : callback function
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteOrgnMdl = (id,user,callback) => {
    var fnm = "dlteOrgnMdl"
    var QRY_TO_EXEC = `UPDATE orgn_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE orgn_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



