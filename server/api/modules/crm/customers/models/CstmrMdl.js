var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getCstmrMdl
* Description   : get details of all Customer
* Arguments     : callback function
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCstmrMdl = (user,callback) => {
	var fnm = 'getCstmrMdl';
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY cstmr_id) sno, * FROM cstmr_dtl_t ORDER BY cstmr_id LIMIT 10;`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : srchCstmrMdl
* Description   : search details of all Customer
* Arguments     : callback function
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchCstmrMdl = (data,user,callback) => {
	var fnm = 'srchCstmrMdl';
    var QRY_WHERE = "1 = 1"
       
            if(data.hasOwnProperty('agnt_id')) {
                QRY_WHERE += ` AND agnt_id=${data.agnt_id}`
            }   
            if(data.hasOwnProperty('cstmr_fst_nm')) {
                QRY_WHERE += ` AND cstmr_fst_nm='${data.cstmr_fst_nm}'`
            }  
            if(data.hasOwnProperty('cstmr_mdl_nm')) {
                QRY_WHERE += ` AND cstmr_mdl_nm='${data.cstmr_mdl_nm}'`
            }  
            if(data.hasOwnProperty('cstmr_lst_nm')) {
                QRY_WHERE += ` AND cstmr_lst_nm='${data.cstmr_lst_nm}'`
            }    
            if(data.hasOwnProperty('cstmr_mble_nu')) {
                QRY_WHERE += ` AND cstmr_mble_nu=${data.cstmr_mble_nu}`
            }   
            if(data.hasOwnProperty('cstmr_emle_tx')) {
                QRY_WHERE += ` AND cstmr_emle_tx='${data.cstmr_emle_tx}'`
            }    
            if(data.hasOwnProperty('cstmr_dtf_brth')) {
                QRY_WHERE += ` AND cstmr_dtf_brth=${data.cstmr_dtf_brth}`
            }   
            if(data.hasOwnProperty('cstmr_fthr_hsbd_nm')) {
                QRY_WHERE += ` AND cstmr_fthr_hsbd_nm='${data.cstmr_fthr_hsbd_nm}'`
            }
            if(data.hasOwnProperty('gndr_id')) {
                QRY_WHERE += ` AND gndr_id=${data.gndr_id}`
            }     
            if(data.hasOwnProperty('adhr_nu')) {
                QRY_WHERE += ` AND adhr_nu=${data.adhr_nu}`
            }   
            if(data.hasOwnProperty('pan_nu')) {
                QRY_WHERE += ` AND pan_nu='${data.pan_nu}'`
            }  
            if(data.hasOwnProperty('cntct_prsn_nm')) {
                QRY_WHERE += ` AND cntct_prsn_nm='${data.cntct_prsn_nm}'`
            }    
            if(data.hasOwnProperty('cntct_prsn_mble_nu')) {
                QRY_WHERE += ` AND cntct_prsn_mble_nu=${data.cntct_prsn_mble_nu}`
            }   
            if(data.hasOwnProperty('cntct_prsn_emle_tx')) {
                QRY_WHERE += ` AND cntct_prsn_emle_tx='${data.cntct_prsn_emle_tx}'`
            }    
            if(data.hasOwnProperty('cntct_prsn_dsgn_id')) {
                QRY_WHERE += ` AND cntct_prsn_dsgn_id=${data.cntct_prsn_dsgn_id}`
            }     
            if(data.hasOwnProperty('blng_frqny_id')) {
                QRY_WHERE += ` AND blng_frqny_id=${data.blng_frqny_id}`
            }   
            if(data.hasOwnProperty('actvtn_dt')) {
                QRY_WHERE += ` AND actvtn_dt='${data.actvtn_dt}'`
            }  
            if(data.hasOwnProperty('instl_hse_nu')) {
                QRY_WHERE += ` AND instl_hse_nu='${data.instl_hse_nu}'`
            }  
            if(data.hasOwnProperty('instl_strte_tx')) {
                QRY_WHERE += ` AND instl_strte_tx='${data.instl_strte_tx}'`
            }  
            if(data.hasOwnProperty('instl_lclty_tx')) {
                QRY_WHERE += ` AND instl_lclty_tx='${data.instl_lclty_tx}'`
            }   
            if(data.hasOwnProperty('instl_bldng_tx')) {
                QRY_WHERE += ` AND instl_bldng_tx='${data.instl_bldng_tx}'`
            } 
            if(data.hasOwnProperty('instl_mndle_id')) {
                QRY_WHERE += ` AND instl_mndle_id=${data.instl_mndle_id}`
            }     
            if(data.hasOwnProperty('instl_cty_id')) {
                QRY_WHERE += ` AND instl_cty_id=${data.instl_cty_id}`
            }     
            if(data.hasOwnProperty('instl_dstrt_id')) {
                QRY_WHERE += ` AND instl_dstrt_id=${data.instl_dstrt_id}`
            }     
            if(data.hasOwnProperty('instl_ste_id')) {
                QRY_WHERE += ` AND instl_ste_id=${data.instl_ste_id}`
            }     
            if(data.hasOwnProperty('instl_pn_cd')) {
                QRY_WHERE += ` AND instl_pn_cd=${data.instl_pn_cd}`
            }     
            if(data.hasOwnProperty('instl_lnd_nu')) {
                QRY_WHERE += ` AND instl_lnd_nu=${data.instl_lnd_nu}`
            }     
            if(data.hasOwnProperty('instl_lat')) {
                QRY_WHERE += ` AND instl_lat=${data.instl_lat}`
            }     
            if(data.hasOwnProperty('instl_lng')) {
                QRY_WHERE += ` AND instl_lng=${data.instl_lng}`
            }   
            if(data.hasOwnProperty('blng_hse_nu')) {
                QRY_WHERE += ` AND blng_hse_nu='${data.blng_hse_nu}'`
            }  
            if(data.hasOwnProperty('blng_strte_tx')) {
                QRY_WHERE += ` AND blng_strte_tx='${data.blng_strte_tx}'`
            }  
            if(data.hasOwnProperty('blng_lclty_tx')) {
                QRY_WHERE += ` AND blng_lclty_tx='${data.blng_lclty_tx}'`
            }   
            if(data.hasOwnProperty('blng_bldng_tx')) {
                QRY_WHERE += ` AND blng_bldng_tx='${data.blng_bldng_tx}'`
            }   
            if(data.hasOwnProperty('blng_mndle_id')) {
                QRY_WHERE += ` AND blng_mndle_id=${data.blng_mndle_id}`
            }     
            if(data.hasOwnProperty('blng_cty_id')) {
                QRY_WHERE += ` AND blng_cty_id=${data.blng_cty_id}`
            }     
            if(data.hasOwnProperty('blng_dstrt_id')) {
                QRY_WHERE += ` AND blng_dstrt_id=${data.blng_dstrt_id}`
            }     
            if(data.hasOwnProperty('blng_ste_id')) {
                QRY_WHERE += ` AND blng_ste_id=${data.blng_ste_id}`
            }     
            if(data.hasOwnProperty('blng_pn_cd')) {
                QRY_WHERE += ` AND blng_pn_cd=${data.blng_pn_cd}`
            }     
            if(data.hasOwnProperty('blng_lnd_nu')) {
                QRY_WHERE += ` AND blng_lnd_nu=${data.blng_lnd_nu}`
            }     
            if(data.hasOwnProperty('blng_lat')) {
                QRY_WHERE += ` AND blng_lat=${data.blng_lat}`
            }     
            if(data.hasOwnProperty('blng_lng')) {
                QRY_WHERE += ` AND blng_lng=${data.blng_lng}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
            }  
        if(data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}`  } else { QRY_WHERE += ` AND a_in=1` }
        if(data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL`  } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY cstmr_id) sno,
                                cstmr_id,agnt_id,cstmr_fst_nm,cstmr_mdl_nm,cstmr_lst_nm,cstmr_mble_nu,cstmr_emle_tx,cstmr_dtf_brth,cstmr_fthr_hsbd_nm,gndr_id,
                                REPLACE(adhr_nu,SUBSTR(adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
                                pan_nu,cntct_prsn_nm,cntct_prsn_mble_nu,cntct_prsn_emle_tx,cntct_prsn_dsgn_id,blng_frqny_id,actvtn_dt,instl_hse_nu,instl_strte_tx,instl_lclty_tx,instl_bldng_tx,instl_mndle_id,instl_cty_id,instl_dstrt_id,instl_ste_id,instl_pn_cd,instl_lnd_nu,instl_lat,instl_lng,blng_hse_nu,blng_strte_tx,blng_lclty_tx,blng_bldng_tx,blng_mndle_id,blng_cty_id,blng_dstrt_id,blng_ste_id,blng_pn_cd,blng_lnd_nu,blng_lat,blng_lng,a_in 
                        FROM cstmr_lst_t 
                        WHERE ${QRY_WHERE} AND cstmr_id= ${data.cstmr_id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : getCstmrByIdMdl
* Description   : get details of single  Customer
* Arguments     : callback function
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getCstmrByIdMdl = (id,user,callback) => {
	var fnm = 'getCstmrByIdMdl';
    var QRY_TO_EXEC = `SELECT cstmr_id,agnt_id,cstmr_fst_nm,cstmr_mdl_nm,cstmr_lst_nm,cstmr_mble_nu,cstmr_emle_tx,cstmr_dtf_brth,cstmr_fthr_hsbd_nm,gndr_id,
    REPLACE(adhr_nu,SUBSTR(adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    pan_nu,cntct_prsn_nm,cntct_prsn_mble_nu,cntct_prsn_emle_tx,cntct_prsn_dsgn_id,blng_frqny_id,actvtn_dt,instl_hse_nu,instl_strte_tx,instl_lclty_tx,instl_bldng_tx,instl_mndle_id,instl_cty_id,instl_dstrt_id,instl_ste_id,instl_pn_cd,instl_lnd_nu,instl_lat,instl_lng,blng_hse_nu,blng_strte_tx,blng_lclty_tx,blng_bldng_tx,blng_mndle_id,blng_cty_id,blng_dstrt_id,blng_ste_id,blng_pn_cd,blng_lnd_nu,blng_lat,blng_lng,a_in 
                        FROM cstmr_lst_t 
                        WHERE a_in = 1 AND cstmr_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : insrtCstmrMdl
* Description   : Add new  Customer
* Arguments     : callback function
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtCstmrMdl = (data,user,callback) => {
	var fnm = 'insrtCstmrMdl';
    console.log(data)
    var QRY_TO_EXEC = `INSERT INTO cstmr_lst_t(agnt_id,cstmr_fst_nm,cstmr_mdl_nm,cstmr_lst_nm,cstmr_mble_nu,cstmr_emle_tx,cstmr_dtf_brth,cstmr_fthr_hsbd_nm,gndr_id,adhr_nu,pan_nu,cntct_prsn_nm,cntct_prsn_mble_nu,cntct_prsn_emle_tx,blng_frqny_id,actvtn_dt,instl_hse_nu,instl_strte_tx,instl_lclty_tx,instl_bldng_tx,instl_mndle_id,instl_cty_id,instl_dstrt_id,instl_ste_id,instl_pn_cd,instl_lat,instl_lng,blng_hse_nu,blng_strte_tx,blng_lclty_tx,blng_bldng_tx,blng_mndle_id,blng_cty_id,blng_dstrt_id,blng_ste_id,blng_pn_cd,blng_lat,blng_lng,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.agnt_id}','${data.cstmr_fst_nm}','${data.cstmr_mdl_nm}','${data.cstmr_lst_nm}',${data.cstmr_mble_nu},'${data.cstmr_emle_tx}','${data.cstmr_dtf_brth}','${data.cstmr_fthr_hsbd_nm}',${data.gndr_id},${data.adhr_nu},'${data.pan_nu}','${data.cntct_prsn_nm}',${data.cntct_prsn_mble_nu},'${data.cntct_prsn_emle_tx}',${data.blng_frqny_id},'${data.actvtn_dt}','${data.instl_hse_nu}','${data.instl_strte_tx}','${data.instl_lclty_tx}','${data.instl_bldng_tx}',${data.instl_mndle_id},${data.instl_cty_id},${data.instl_dstrt_id},${data.instl_ste_id},${data.instl_pn_cd},'${data.instl_lat}','${data.instl_lng}','${data.blng_hse_nu}','${data.blng_strte_tx}','${data.blng_lclty_tx}','${data.blng_bldng_tx}',${data.blng_mndle_id},${data.blng_cty_id},${data.blng_dstrt_id},${data.blng_ste_id},${data.blng_pn_cd},'${data.blng_lat}','${data.blng_lng}',1,CURRENT_TIMESTAMP(),${user.user_id})`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
    console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);

}

/*****************************************************************************
* Function      : updteCstmrMdl
* Description   : Update existing  Customer
* Arguments     : callback function
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updteCstmrMdl = (data,id,user,callback) => {
	var fnm = 'updteCstmrMdl';
    var QRY_SET = ""
       
            if(data.hasOwnProperty('agnt_id')) {
                QRY_SET += ` , agnt_id='${data.agnt_id}'`
            }   
            if(data.hasOwnProperty('cstmr_fst_nm')) {
                QRY_SET += ` , cstmr_fst_nm='${data.cstmr_fst_nm}'`
            }  
            if(data.hasOwnProperty('cstmr_mdl_nm')) {
                QRY_SET += ` , cstmr_mdl_nm='${data.cstmr_mdl_nm}'`
            }  
            if(data.hasOwnProperty('cstmr_lst_nm')) {
                QRY_SET += ` , cstmr_lst_nm='${data.cstmr_lst_nm}'`
            }    
            if(data.hasOwnProperty('cstmr_mble_nu')) {
                QRY_SET += ` , cstmr_mble_nu=${data.cstmr_mble_nu}`
            }   
            if(data.hasOwnProperty('cstmr_emle_tx')) {
                QRY_SET += ` , cstmr_emle_tx='${data.cstmr_emle_tx}'`
            }    
            if(data.hasOwnProperty('cstmr_dtf_brth')) {
                QRY_SET += ` , cstmr_dtf_brth='${data.cstmr_dtf_brth}'`
            } 
            if(data.hasOwnProperty('cstmr_fthr_hsbd_nm')) {
                QRY_SET += ` , cstmr_fthr_hsbd_nm='${data.cstmr_fthr_hsbd_nm}'`
            } 
            if(data.hasOwnProperty('gndr_id')) {
                QRY_SET += ` , gndr_id=${data.gndr_id}`
            }     
            if(data.hasOwnProperty('adhr_nu')) {
                QRY_SET += ` , adhr_nu=${data.adhr_nu}`
            }   
            if(data.hasOwnProperty('pan_nu')) {
                QRY_SET += ` , pan_nu='${data.pan_nu}'`
            }  
            if(data.hasOwnProperty('cntct_prsn_nm')) {
                QRY_SET += ` , cntct_prsn_nm='${data.cntct_prsn_nm}'`
            }    
            if(data.hasOwnProperty('cntct_prsn_mble_nu')) {
                QRY_SET += ` , cntct_prsn_mble_nu=${data.cntct_prsn_mble_nu}`
            }   
            if(data.hasOwnProperty('cntct_prsn_emle_tx')) {
                QRY_SET += ` , cntct_prsn_emle_tx='${data.cntct_prsn_emle_tx}'`
            }    
            if(data.hasOwnProperty('cntct_prsn_dsgn_id')) {
                QRY_SET += ` , cntct_prsn_dsgn_id=${data.cntct_prsn_dsgn_id}`
            }     
            if(data.hasOwnProperty('blng_frqny_id')) {
                QRY_SET += ` , blng_frqny_id=${data.blng_frqny_id}`
            }   
            if(data.hasOwnProperty('actvtn_dt')) {
                QRY_SET += ` , actvtn_dt='${data.actvtn_dt}'`
            }  
            if(data.hasOwnProperty('instl_hse_nu')) {
                QRY_SET += ` , instl_hse_nu='${data.instl_hse_nu}'`
            }  
            if(data.hasOwnProperty('instl_strte_tx')) {
                QRY_SET += ` , instl_strte_tx='${data.instl_strte_tx}'`
            }  
            if(data.hasOwnProperty('instl_lclty_tx')) {
                QRY_SET += ` , instl_lclty_tx='${data.instl_lclty_tx}'`
            }    
            if(data.hasOwnProperty('instl_bldng_tx')) {
                QRY_SET += ` , instl_bldng_tx='${data.instl_bldng_tx}'`
            } 
            if(data.hasOwnProperty('instl_mndle_id')) {
                QRY_SET += ` , instl_mndle_id=${data.instl_mndle_id}`
            }     
            if(data.hasOwnProperty('instl_cty_id')) {
                QRY_SET += ` , instl_cty_id=${data.instl_cty_id}`
            }     
            if(data.hasOwnProperty('instl_dstrt_id')) {
                QRY_SET += ` , instl_dstrt_id=${data.instl_dstrt_id}`
            }     
            if(data.hasOwnProperty('instl_ste_id')) {
                QRY_SET += ` , instl_ste_id=${data.instl_ste_id}`
            }     
            if(data.hasOwnProperty('instl_pn_cd')) {
                QRY_SET += ` , instl_pn_cd=${data.instl_pn_cd}`
            }     
            if(data.hasOwnProperty('instl_lnd_nu')) {
                QRY_SET += ` , instl_lnd_nu=${data.instl_lnd_nu}`
            }     
            if(data.hasOwnProperty('instl_lat')) {
                QRY_SET += ` , instl_lat=${data.instl_lat}`
            }     
            if(data.hasOwnProperty('instl_lng')) {
                QRY_SET += ` , instl_lng=${data.instl_lng}`
            }   
            if(data.hasOwnProperty('blng_hse_nu')) {
                QRY_SET += ` , blng_hse_nu='${data.blng_hse_nu}'`
            }  
            if(data.hasOwnProperty('blng_strte_tx')) {
                QRY_SET += ` , blng_strte_tx='${data.blng_strte_tx}'`
            }  
            if(data.hasOwnProperty('blng_lclty_tx')) {
                QRY_SET += ` , blng_lclty_tx='${data.blng_lclty_tx}'`
            }    
            if(data.hasOwnProperty('blng_bldng_tx')) {
                QRY_SET += ` , blng_bldng_tx='${data.blng_bldng_tx}'`
            }  
            if(data.hasOwnProperty('blng_mndle_id')) {
                QRY_SET += ` , blng_mndle_id=${data.blng_mndle_id}`
            }     
            if(data.hasOwnProperty('blng_cty_id')) {
                QRY_SET += ` , blng_cty_id=${data.blng_cty_id}`
            }     
            if(data.hasOwnProperty('blng_dstrt_id')) {
                QRY_SET += ` , blng_dstrt_id=${data.blng_dstrt_id}`
            }     
            if(data.hasOwnProperty('blng_ste_id')) {
                QRY_SET += ` , blng_ste_id=${data.blng_ste_id}`
            }     
            if(data.hasOwnProperty('blng_pn_cd')) {
                QRY_SET += ` , blng_pn_cd=${data.blng_pn_cd}`
            }     
            if(data.hasOwnProperty('blng_lnd_nu')) {
                QRY_SET += ` , blng_lnd_nu=${data.blng_lnd_nu}`
            }     
            if(data.hasOwnProperty('blng_lat')) {
                QRY_SET += ` , blng_lat=${data.blng_lat}`
            }     
            if(data.hasOwnProperty('blng_lng')) {
                QRY_SET += ` , blng_lng=${data.blng_lng}`
            }     
            if(data.hasOwnProperty('crte_usr_id')) {
                QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
            }     
            if(data.hasOwnProperty('updte_usr_id')) {
                QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
            }  

    var QRY_TO_EXEC = ` UPDATE cstmr_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE cstmr_id= ${id}; `;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            console.log(QRY_TO_EXEC);
            return;
        });
    else
    console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : dlteCstmrMdl
* Description   : Delete existing  Customer
* Arguments     : callback function
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dlteCstmrMdl = (id,user,callback) => {
	var fnm = 'dlteCstmrMdl';
    var QRY_TO_EXEC = `UPDATE cstmr_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE cstmr_id= ${id};`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : get_CstmrTypeMdl
* Description   : Delete existing  Customer
* Arguments     : callback function
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_CstmrTypeMdl = (user,callback) => {
	var fnm = 'get_CstmrTypeMdl';
    var QRY_TO_EXEC = `select * from entrpe_cstmr_typ_lst_t ORDER BY entrpe_type_id`;
    log.info(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}








