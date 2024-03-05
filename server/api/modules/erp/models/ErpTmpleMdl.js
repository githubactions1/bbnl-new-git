var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getErpTmpleMdl
* Description   : get details of all erpTmplt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getErpTmpleMdl = (user,callback) => {
    var fnm = "getErpTmpleMdl"
     var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER (ORDER BY t.tmple_id) as sno,r.tmple_id,prcnt_ct as Percentage,tmple_cd,tmple_nm,tmple_dscrn_tx,tmple_type_nm,t.tmple_type_id,prtnr_nm as Partners,r.prtnr_id,r.ara_type_id,ara_type_cd,ara_type_nm as Regions FROM 
     erp_tmple_prtnrs_rel_t as r
      join erp_tmple_lst_t as t on t.tmple_id = r.tmple_id
      join erp_tmple_type_lst_t as y on y.tmple_type_id = t.tmple_type_id
      join prtnrs_lst_t as p on p.prtnr_id = r.prtnr_id
      join ara_type_lst_t as a on a.ara_type_id = r.ara_type_id
     where t.a_in=1
     order by t.tmple_id;`
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchErpTmpleMdl
* Description   : search details of all erpTmplt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchErpTmpleMdl = (data,user,callback) => {
    var fnm = "srchErpTmpleMdl"
    var QRY_WHERE = "1 = 1"
     
            if(data.hasOwnProperty('tmple_cd')) {
                QRY_WHERE += ` AND tmple_cd='${data.tmple_cd}'`
            }  
            if(data.hasOwnProperty('tmple_nm')) {
                QRY_WHERE += ` AND tmple_nm='${data.tmple_nm}'`
            }    
            if(data.hasOwnProperty('tmple_type_id')) {
                QRY_WHERE += ` AND tmple_type_id=${data.tmple_type_id}`
            }   
            if(data.hasOwnProperty('tmple_dscrn_tx')) {
                QRY_WHERE += ` AND tmple_dscrn_tx='${data.tmple_dscrn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY tmple_id) sno,
                                tmple_id,tmple_cd,tmple_nm,tmple_type_id,tmple_dscrn_tx,a_in 
                        FROM erp_tmple_lst_t 
                        WHERE ${QRY_WHERE} AND tmple_id= ${data.tmple_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getErpTmpleByIdMdl
* Description   : get details of single  erpTmplt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getErpTmpleByIdMdl = (id,user,callback) => {
    var fnm = "getErpTmpleByIdMdl"
    var QRY_TO_EXEC = `SELECT tmple_id,tmple_cd,tmple_nm,tmple_type_id,tmple_dscrn_tx,a_in 
                        FROM erp_tmple_lst_t 
                        WHERE a_in = 1 AND tmple_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtErpTmpleMdl
* Description   : Add new  erpTmplt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtErpTmpleMdl = (data,user,callback) => {
    var fnm = "insrtErpTmpleMdl"
    var QRY_TO_EXEC = `INSERT INTO erp_tmple_lst_t(tmple_cd,tmple_nm,tmple_type_id,tmple_dscrn_tx,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.tmple_cd}','${data.tmple_nm}',${data.tmple_type_id},'${data.tmple_dscrn_tx}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updteErpTmpleMdl
* Description   : Update existing  erpTmplt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteErpTmpleMdl = (data,id,user,callback) => {
    var fnm = "updteErpTmpleMdl"
    var QRY_SET = ""
     
            if(data.hasOwnProperty('tmple_cd')) {
                QRY_SET += ` , tmple_cd='${data.tmple_cd}'`
            }  
            if(data.hasOwnProperty('tmple_nm')) {
                QRY_SET += ` , tmple_nm='${data.tmple_nm}'`
            }    
            if(data.hasOwnProperty('tmple_type_id')) {
                QRY_SET += ` , tmple_type_id=${data.tmple_type_id}`
            }   
            if(data.hasOwnProperty('tmple_dscrn_tx')) {
                QRY_SET += ` , tmple_dscrn_tx='${data.tmple_dscrn_tx}'`
            }    
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE erp_tmple_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE tmple_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlteErpTmpleMdl
* Description   : Delete existing  erpTmplt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteErpTmpleMdl = (id,user,callback) => {
    var fnm = "dlteErpTmpleMdl"
    var QRY_TO_EXEC = `UPDATE erp_tmple_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tmple_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}






/*****************************************************************************
* Function      : updateTmp_Ptrnrs_Rel_Mdl
* Description   : Delete existing  erpTmplt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updateTmp_Ptrnrs_Rel_Mdl = (tmp_id,data,user,callback) => {
    var fnm = "updateTmp_Ptrnrs_Rel_Mdl"
    var QRY_TO_EXEC = `UPDATE erp_tmple_prtnrs_rel_t 
                       SET prcnt_ct='${data.percentage}',updte_usr_id=${user.user_id}
                       WHERE tmple_id= '${tmp_id}' and prtnr_id=${data.tenants} and ara_type_id = '${data.regions}'`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : dlte_tmp_prtnrs_Rel_Mdl
* Description   : Delete existing  araType
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlte_tmp_prtnrs_Rel_Mdl = (id,user,callback) => {
    var fnm = "dlte_tmp_prtnrs_Rel_Mdl"
    var QRY_TO_EXEC = `UPDATE erp_tmple_prtnrs_rel_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE tmple_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_templePartersRelCtrlMdl
* Description   : get details of single  erpTmplt
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_templePartersRelCtrlMdl = (id,user,callback) => {
    var fnm = "get_templePartersRelCtrlMdl"
    var QRY_TO_EXEC = `
    
select t.tmple_id,t.tmple_nm,r.prtnr_id,p.prtnr_nm,r.ara_type_id,ara_type_nm,prcnt_ct,g.agnt_id,g.agnt_nm,g.agnt_cd
from erp_tmple_prtnrs_rel_t as r
left join prtnrs_lst_t as p on p.prtnr_id = r.prtnr_id
left join ara_type_lst_t as a on a.ara_type_id=r.ara_type_id
left join agnt_lst_t as g on g.agnt_ctgry_id=r.prtnr_id
left join erp_tmple_lst_t as t on t.tmple_id=r.tmple_id
where t.tmple_id=${id}
GROUP BY p.prtnr_id,g.agnt_id
order by p.prtnr_id`;



    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
