
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/*****************************************************************************
* Function       : get_onuCtrlMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.get_onuCtrlMdl = function (caf_id, user) {
    var fnm = "get_onuCtrlMdl"
    var QRY_TO_EXEC = `select REPLACE(REPLACE(c.aghra_cd,'-HSI',""),'-VOIP','') as aghra_cd
                            ,CONCAT(REPLACE(REPLACE(c.aghra_cd,'-HSI',''),'-VOIP',''),"-1-",im.agro_cpe_prfle_id) as aghra_cd_sncr,o.olt_vndr_id,o.olt_ip_addr_tx,olt_crd_nu,olt_prt_nm,olt_onu_id	
                        from caf_dtl_t c 
                            join inv_stpbx_lst_t s on s.caf_id =c.caf_id
                            join inv_prdct_mdle_lst_t im on s.mdle_id =im.mdle_id 
                            JOIN olt_lst_t as o on o.olt_id=c.olt_id
                        where c.caf_id=${caf_id} and im.prdct_id=1`;
                      //  console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insert_PrpdInvc_LstMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.insert_PrpdInvc_LstMdl = function (data,invc_id,user) {
    var fnm = "insert_PrpdInvc_LstMdl"
    console.log(data)
    if(data.expry_dt > data.invce_dt){
        var invcFromDt = data.expry_dt
    } else{
        var invcFromDt = data.invce_dt
    }
    var QRY_TO_EXEC = `INSERT INTO erp_prpd_invce_lst_t (
        caf_invce_id,
        caf_id,
        bse_pckge_id,
        frqncy_id,
        caf_type_id,
        cstmr_id,
        mso_agnt_id,
        lmo_agnt_id,
        invce_dt,
        invce_yr,
        invce_mm,
        invce_frm_dt,
        invce_to_dt,
        invce_at,
        cgst_at,
        sgst_at,
        crte_usr_id ,
        a_in,
        i_ts) VALUES 
        (${invc_id}, ${data.caf_id},${data.bse_pckge_id},${data.frqncy_id},${data.caf_type_id},${data.cstmr_id},${data.mso_agnt_id},${data.lmo_agnt_id},'${data.invce_dt}',${data.invce_yr},${data.invce_mm},'${invcFromDt}','DATE(CURRENT_DATE + INTERVAL 1 MONTH)',${data.invce_at}, ${data.cgst_at},${data.sgst_at}, ${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`
        console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : insert_PrpdInvc_DtlMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.insert_PrpdInvc_DtlMdl = function (data,invc_id,user,calbk) {
    var fnm = "insert_PrpdInvc_DtlMdl"
    if(data.expry_dt > data.invce_dt){
        var invcFromDt = data.expry_dt
    } else{
        var invcFromDt = data.invce_dt
    }
    var count = 0;
    for(var i=0; i<data.pckg_lst.length; i++){
      var QRY_TO_EXEC = `INSERT INTO erp_prpd_invce_dtl_t (
        caf_invce_id,
        chrge_cde_id,
        prtd_in,
        srvcpk_id,
        cgst_at,
        sgst_at,
        chrge_at,
        pckge_id,
        cre_srvce_id,
        invce_yr,
        invce_mm,
        chrge_frm_dt,
        chrge_to_dt,
        frqncy_id,
        caf_id,
        caf_type_id,
        pckge_type_id,
        prpd_in,
        adhc_ad_in,
        crte_usr_id,
        a_in,
        i_ts) VALUES 
        (${invc_id}, ${data.pckg_lst[i].chrge_cde_id},1,${data.pckg_lst[i].srvcpk_id},${data.pckg_lst[i].cgst},${data.pckg_lst[i].sgst},${data.pckg_lst[i].chrge_at},${data.pckg_lst[i].pckge_id},${data.pckg_lst[i].cre_srvce_id},${data.invce_yr},${data.invce_mm},'${invcFromDt}','DATE(CURRENT_DATE + INTERVAL 1 MONTH)',1,${data.caf_id},${data.caf_type_id},${data.pckg_lst[i].pckge_type_id},0,0,${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;
        console.log(QRY_TO_EXEC);
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results)=>{
            count++;
            console.log(count,data.pckg_lst.length,count == data.pckg_lst.length);
            if(count == data.pckg_lst.length){
                console.log(err)
                calbk(err, results);
            }
        });
    }

};
/*****************************************************************************
* Function       : getTrnsRefNo
* Description    : 
* Arguments      : callback function
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
******************************************************************************/
exports.getTrnsRefNo = function (user) {
    var fnm = "getTrnsRefNo"
    var QRY_TO_EXEC = `INSERT INTO pymnts_trns_ref_nu_tmep_t(i_ts)
    VALUES(CURRENT_TIMESTAMP());`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Function      : insrtPaymntLogDtlsMdl
* Description   : 
* Arguments     : callback function
* Change History :
* 29/02/2020    -   - Initial Function
*
***************************************************************************************/
// exports.insrtPaymntLogDtlsMdl = function (pymnt_dtls, user) {
//     var QRY_TO_EXEC = ` INSERT INTO agnt_pymnt_trnsn_ref_dtl_tmp_t(
//         trns_ref_nu,
//         agnt_id, 
//         trnsn_at, 
//         actl_trnsn_at, 
//         pymnt_mde_id,   
//         pymnt_mde_upi, 
//         trnsn_bnk_nm, 
//         trnsn_type_id, 
//         trns_ts, 
//         trnsn_sts, 
//         trnsn_sts_in, 
//         trnsn_res_txt, 
//         trnsn_upi_res_txt, 
//         cmnt_tx, 
//         a_in, 
//         i_ts)
//     VALUES(
//         ${pymnt_dtls.trns_ref_nu},
//         ${pymnt_dtls.agnt_id},
//         ${pymnt_dtls.trnsn_at},
//         '', 
//         ${pymnt_dtls.pymnt_mde_id}, 
//         '', 
//         '', 
//         6,
//         CURRENT_TIMESTAMP(), 
//         '${pymnt_dtls.trnsn_sts}', 
//         ${pymnt_dtls.trnsn_sts_in}, 
//         ${sqldb.MySQLConPool.escape(pymnt_dtls.trnsn_res_txt)}, 
//         ${sqldb.MySQLConPool.escape(pymnt_dtls.trnsn_upi_res_txt)}, 
//         ${sqldb.MySQLConPool.escape(pymnt_dtls.cmnt_tx)}, 
//         1, 
//         CURRENT_TIMESTAMP());`;
//     console.log(QRY_TO_EXEC)
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
// };

/**************************************************************************************
* Function      : insrt_prpd_pymntDtlMdl
* Description   : 
* Arguments     : callback function
* Change History :
* 29/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.insrt_prpd_pymntDtlMdl = function (data,invc_id, user) {
    var fnm = "insrt_prpd_pymntDtlMdl"
    if(data.pymntSrc=='web'){
        pymnt_srce_id = 4;
    }
    else{
        pymnt_srce_id = 2;
    }
    var QRY_TO_EXEC = ` INSERT INTO erp_prpd_pmnt_dtl_t(pymnt_at,pymnt_mde_id,pymnt_mthd_id,caf_id,lmo_agnt_id,caf_invce_id,cstmr_id,pymnt_dt,pymnt_ts,pymnt_prvdr_id,bnk_hndlr_nm,clbk_url_tx,pymnt_srce_id) VALUES ('${data.pymnt_at}',${data.pymnt_mde_id},'',${data.caf_id},${data.lmo_agnt_id},${data.caf_invce_id},${data.cstmr_id},CURRENT_DATE(),CURRENT_TIMESTAMP(),${data.pymnt_prvdr_id},'APSFL_ENTRPRSE','http://bss.glits.info/apiv1/payment/confirm',${pymnt_srce_id})
    `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Function      : UpdteCPTransNum
* Description   : 
* Arguments     : callback function
* Change History :
* 29/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.UpdteCPTransNum = function (data, pymnt_id,user) {
    var fnm = "UpdteCPTransNum"
    console.log("UpdteCPTransNum")
   console.log(data)
    var QRY_TO_EXEC = ` update erp_prpd_pmnt_dtl_t set bnk_rfnce_id='${data.data.cpay_trnsn_ref_nu}' where pymnt_id = ${pymnt_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}