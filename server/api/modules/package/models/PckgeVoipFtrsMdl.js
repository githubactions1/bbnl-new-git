var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getPckgeVoipFtrsMdl
* Description   : get details of all pckgevoipFeatures
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgeVoipFtrsMdl = (user,callback) => {
    var fnm = "getPckgeVoipFtrsMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY pckge_voip_ftrs_lst_t.ftre_id) sno, cre_srvce_lst_t.cre_srvce_nm,pckge_voip_ftrs_lst_t.* FROM pckge_voip_ftrs_lst_t  JOIN cre_srvce_lst_t On cre_srvce_lst_t.cre_srvce_id = pckge_voip_ftrs_lst_t.cre_srvce_id where pckge_voip_ftrs_lst_t.a_in = 1 ORDER BY pckge_voip_ftrs_lst_t.ftre_id ASC;` 
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchPckgeVoipFtrsMdl
* Description   : search details of all pckgevoipFeatures
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchPckgeVoipFtrsMdl = (data,user,callback) => {
    var fnm = "srchPckgeVoipFtrsMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('ftre_nm')) {
                QRY_WHERE += ` AND ftre_nm='${data.ftre_nm}'`
            }    
            if(data.hasOwnProperty('cre_srvce_id')) {
                QRY_WHERE += ` AND cre_srvce_id=${data.cre_srvce_id}`
            }   
            if(data.hasOwnProperty('ftre_cd')) {
                QRY_WHERE += ` AND ftre_cd='${data.ftre_cd}'`
            }  
            if(data.hasOwnProperty('ftre_hndlr_tx')) {
                QRY_WHERE += ` AND ftre_hndlr_tx='${data.ftre_hndlr_tx}'`
            }    
            if(data.hasOwnProperty('mx_pr_vle_ct')) {
                QRY_WHERE += ` AND mx_pr_vle_ct=${data.mx_pr_vle_ct}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY ftre_id) sno,
                                ftre_id,ftre_nm,cre_srvce_id,ftre_cd,ftre_hndlr_tx,mx_pr_vle_ct,a_in 
                        FROM pckge_voip_ftrs_lst_t 
                        WHERE ${QRY_WHERE} AND ftre_id= ${data.ftre_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPckgeVoipFtrsByIdMdl
* Description   : get details of single  pckgevoipFeatures
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgeVoipFtrsByIdMdl = (id,user,callback) => {
    var fnm = "getPckgeVoipFtrsByIdMdl"
    var QRY_TO_EXEC = `SELECT ftre_id,ftre_nm,cre_srvce_id,ftre_cd,ftre_hndlr_tx,mx_pr_vle_ct,a_in 
                        FROM pckge_voip_ftrs_lst_t 
                        WHERE a_in = 1 AND ftre_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtPckgeVoipFtrsMdl
* Description   : Add new  pckgevoipFeatures
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtPckgeVoipFtrsMdl = (data,user,callback) => {
    var fnm = "insrtPckgeVoipFtrsMdl"
    var QRY_TO_EXEC = `INSERT INTO pckge_voip_ftrs_lst_t(ftre_nm,cre_srvce_id,ftre_cd,ftre_hndlr_tx,mx_pr_vle_ct,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.ftre_nm}',${data.cre_srvce_id},'${data.ftre_cd}','${data.ftre_hndlr_tx}',${data.mx_pr_vle_ct},1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updtePckgeVoipFtrsMdl
* Description   : Update existing  pckgevoipFeatures
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtePckgeVoipFtrsMdl = (data,id,user,callback) => {
    var fnm = "updtePckgeVoipFtrsMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('ftre_nm')) {
                QRY_SET += ` , ftre_nm='${data.ftre_nm}'`
            }    
            if(data.hasOwnProperty('cre_srvce_id')) {
                QRY_SET += ` , cre_srvce_id=${data.cre_srvce_id}`
            }   
            if(data.hasOwnProperty('ftre_cd')) {
                QRY_SET += ` , ftre_cd='${data.ftre_cd}'`
            }  
            if(data.hasOwnProperty('ftre_hndlr_tx')) {
                QRY_SET += ` , ftre_hndlr_tx='${data.ftre_hndlr_tx}'`
            }    
            if(data.hasOwnProperty('mx_pr_vle_ct')) {
                QRY_SET += ` , mx_pr_vle_ct=${data.mx_pr_vle_ct}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE pckge_voip_ftrs_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE ftre_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dltePckgeVoipFtrsMdl
* Description   : Delete existing  pckgevoipFeatures
* Arguments     : callback function
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dltePckgeVoipFtrsMdl = (id,user,callback) => {
    var fnm = "dltePckgeVoipFtrsMdl"
    var QRY_TO_EXEC = `UPDATE pckge_voip_ftrs_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE ftre_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



