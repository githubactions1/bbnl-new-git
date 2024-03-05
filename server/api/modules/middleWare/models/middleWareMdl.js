
var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : get_CstmrvoipByIdMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.get_CstmrvoipByIdMdl = (id, user) => {
    var fnm = "get_CstmrvoipByIdMdl"
    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER (ORDER BY v.call_yr,v.call_mm) as s_no,vp.phne_nu,v.*,SUM(v.std_chrge_at + v.isd_chrge_at+v.lcl_chrge_at) as total,Monthname(Concat('2020-',v.call_mm,'-01')) as mnth_nm
    from voip_caf_phne_chrges_dtl_t v
    JOIN voip_phne_nmbrs_lst_t as vp on vp.phne_nmbr_id = v.phne_nmbr_id
    where caf_id = ${id}
    GROUP BY v.call_mm
    ORDER BY v.call_yr desc,v.call_mm desc`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_CstmrInvoiceByIdMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.get_CstmrInvoiceByIdMdl = (id, user) => {
    var fnm = "get_CstmrInvoiceByIdMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no
    ,i.caf_invce_id,i.invce_yr,i.invce_mm as invce_mnth
    ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm,i.cstmr_id
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2) as invce_at,format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
    ,format(invce_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at,(case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment_Status'
    from erp_invce_lst_t i
    join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
    WHERE i.pblsd_in=1 AND i.caf_id = ${id}
    ORDER BY i.invce_yr desc,i.invce_mm desc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_CstmrInvoiceChargsByIdMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.get_CstmrInvoiceChargsByIdMdl = (id, user) => {
    var fnm = "get_CstmrInvoiceChargsByIdMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as s_no,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
    ,format(id.chrge_at,2) as chrge_at,format(id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at,2) as tax_at
    ,format(id.chrge_at+id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at,2) as tl_at,
	CONCAT('Month of ', MONTHNAME(id.chrge_frm_dt), ' ', id.invce_yr) as dt_lbl,
	(CASE WHEN l.pd_in = 1 THEN 'Paid' ELSE
	CONCAT('Recharge Due Date ' ,  DATE_FORMAT((id.chrge_frm_dt + INTERVAL 1 MONTH) + INTERVAL 10 day, '%d-%M-%Y')) END  )as due_dt_lbl,
	(CASE  WHEN cs.cstmr_nm is NOT NULL THEN cs.cstmr_nm ELSE ' ' END) as cstmr_lbl,
	CONCAT('#', cs.loc_addr1_tx , ', ', cs.loc_addr2_tx) as cstmr_address_lbl,
	cf.mdlwe_sbscr_id
    from erp_invce_dtl_t id
	JOIN erp_invce_lst_t l on l.caf_invce_id = id.caf_invce_id
	JOIN caf_dtl_t cf on cf.caf_id = id.caf_id
	JOIN cstmr_dtl_t cs on cs.cstmr_id = cf.cstmr_id
	JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
    LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
    LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
    where id.caf_invce_id = ${id}
    order by p.pckge_id desc ,id.invce_dtl_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : get_CstmrHsiByIdMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.get_CstmrHsiByIdMdl = (id, user) => {
    var fnm = "get_CstmrHsiByIdMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct DESC) as s_no,yr_ct,mnt_ct,
                        ROUND(ttl_dwnld_ct/1024/1024/1024,2) AS TD,
                        ROUND(ttl_upld_ct/1024/1024/1024,2) AS TU,
                        ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as total,
                        ROUND(dy_up_1/1024/1024/1024,2) AS day_1_TU,
                        ROUND(dy_dw_1/1024/1024/1024,2) AS day_1_TD,
					    ROUND(dy_up_2/1024/1024/1024,2) AS day_2_TU,
                        ROUND(dy_dw_2/1024/1024/1024,2) AS day_2_TD,
						ROUND(dy_up_3/1024/1024/1024,2) AS day_3_TU,
                        ROUND(dy_dw_3/1024/1024/1024,2) AS day_3_TD,
						ROUND(dy_up_4/1024/1024/1024,2) AS day_4_TU,
                        ROUND(dy_dw_4/1024/1024/1024,2) AS day_4_TD,
						ROUND(dy_up_5/1024/1024/1024,2) AS day_5_TU,
                        ROUND(dy_dw_5/1024/1024/1024,2) AS day_5_TD,
						ROUND(dy_up_6/1024/1024/1024,2) AS day_6_TU,
                        ROUND(dy_dw_6/1024/1024/1024,2) AS day_6_TD,
						ROUND(dy_up_7/1024/1024/1024,2) AS day_7_TU,
                        ROUND(dy_dw_7/1024/1024/1024,2) AS day_7_TD,
						ROUND(dy_up_8/1024/1024/1024,2) AS day_8_TU,
                        ROUND(dy_dw_8/1024/1024/1024,2) AS day_8_TD,
						ROUND(dy_up_9/1024/1024/1024,2) AS day_9_TU,
                        ROUND(dy_dw_9/1024/1024/1024,2) AS day_9_TD,
						ROUND(dy_up_10/1024/1024/1024,2) AS day_10_TU,
                        ROUND(dy_dw_10/1024/1024/1024,2) AS day_10_TD,
						ROUND(dy_up_11/1024/1024/1024,2) AS day_11_TU,
                        ROUND(dy_dw_11/1024/1024/1024,2) AS day_11_TD,
						ROUND(dy_up_12/1024/1024/1024,2) AS day_12_TU,
                        ROUND(dy_dw_12/1024/1024/1024,2) AS day_12_TD,
						ROUND(dy_up_13/1024/1024/1024,2) AS day_13_TU,
                        ROUND(dy_dw_13/1024/1024/1024,2) AS day_13_TD,
						ROUND(dy_up_14/1024/1024/1024,2) AS day_14_TU,
                        ROUND(dy_dw_14/1024/1024/1024,2) AS day_14_TD,
						ROUND(dy_up_15/1024/1024/1024,2) AS day_15_TU,
                        ROUND(dy_dw_15/1024/1024/1024,2) AS day_15_TD,
						ROUND(dy_up_16/1024/1024/1024,2) AS day_16_TU,
                        ROUND(dy_dw_16/1024/1024/1024,2) AS day_16_TD,
	                    ROUND(dy_up_17/1024/1024/1024,2) AS day_17_TU,
                        ROUND(dy_dw_17/1024/1024/1024,2) AS day_17_TD,
						ROUND(dy_up_18/1024/1024/1024,2) AS day_18_TU,
                        ROUND(dy_dw_18/1024/1024/1024,2) AS day_18_TD,
						ROUND(dy_up_19/1024/1024/1024,2) AS day_19_TU,
                        ROUND(dy_dw_19/1024/1024/1024,2) AS day_19_TD,
						ROUND(dy_up_20/1024/1024/1024,2) AS day_20_TU,
                        ROUND(dy_dw_20/1024/1024/1024,2) AS day_20_TD,
						ROUND(dy_up_21/1024/1024/1024,2) AS day_21_TU,
                        ROUND(dy_dw_21/1024/1024/1024,2) AS day_21_TD,
						ROUND(dy_up_22/1024/1024/1024,2) AS day_22_TU,
                        ROUND(dy_dw_22/1024/1024/1024,2) AS day_22_TD,
						ROUND(dy_up_23/1024/1024/1024,2) AS day_23_TU,
                        ROUND(dy_dw_23/1024/1024/1024,2) AS day_23_TD,
						ROUND(dy_up_24/1024/1024/1024,2) AS day_24_TU,
                        ROUND(dy_dw_24/1024/1024/1024,2) AS day_24_TD,
                        ROUND(dy_up_25/1024/1024/1024,2) AS day_25_TU,
                        ROUND(dy_dw_25/1024/1024/1024,2) AS day_25_TD,
						ROUND(dy_up_26/1024/1024/1024,2) AS day_26_TU,
                        ROUND(dy_dw_26/1024/1024/1024,2) AS day_26_TD,
						ROUND(dy_up_27/1024/1024/1024,2) AS day_27_TU,
                        ROUND(dy_dw_27/1024/1024/1024,2) AS day_27_TD,
						ROUND(dy_up_28/1024/1024/1024,2) AS day_28_TU,
                        ROUND(dy_dw_28/1024/1024/1024,2) AS day_28_TD,
						ROUND(dy_up_29/1024/1024/1024,2) AS day_29_TU,
                        ROUND(dy_dw_29/1024/1024/1024,2) AS day_29_TD,
						ROUND(dy_up_30/1024/1024/1024,2) AS day_30_TU,
                        ROUND(dy_dw_30/1024/1024/1024,2) AS day_30_TD,
						ROUND(dy_up_31/1024/1024/1024,2) AS day_31_TU,
                        ROUND(dy_dw_31/1024/1024/1024,2) AS day_31_TD,mnth_usge_lmt_ct
                        from hsi_mnthly_usge_dtl_t
                        WHERE caf_id= ${id} AND mnt_ct  BETWEEN MONTH(CURDATE() - INTERVAL 2 MONTH)  AND  MONTH(CURDATE())
                        GROUP BY yr_ct,mnt_ct
                        ORDER BY yr_ct DESC,mnt_ct DESC;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
 * Function       : getchannelAprvlLstMdl
 * Description    :
 * Arguments      : callback function
 ******************************************************************************/
exports.getchannelAprvlLstMdl = function (data, user) {
    var fnm = "getchannelAprvlLstMdl"
    let where_cnd = ` `;
    console.log('getchannelAprvlLstMdl')
    let dta = data.data;
    console.log(dta)
    let pge_nu = dta.lmt_pstn * 20;
    if (dta.caf_nu == 0) {
        caf = ` `
    }
    else if (dta.caf_nu != 0) {
        caf = `and c.caf_nu='${dta.caf_nu}' `
    }
    if (dta.adhar_nu == 0) {
        adhar = ` `
    }
    else if (dta.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${dta.adhar_nu}' `
    }
    if (dta.mbl_nu == 0) {
        mobile = ` `
    }
    else if (dta.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${dta.mbl_nu}' `
    }
    if (dta.agntID == 0) {
        agntid = ` `
    }
    else if (dta.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${dta.agntID}`
    }


    if (dta.sts == 0) {
        where_cnd += ` `;
    }
    else if (dta.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${dta.sts} `
    }

    if (dta.srch_type == 1) {
        if (dta.srch_txt) {
            where_cnd += ` and c.caf_id like '%${dta.srch_txt}%' `
        }
    }
    else if (dta.srch_type == 2) {
        if (dta.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${dta.srch_txt}%' `
        }
    }
    else if (dta.srch_type == 3) {
        if (dta.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${dta.srch_txt}%' `
        }
    }
    else if (dta.srch_type == 4) {
        if (dta.srch_txt) {
            where_cnd += ` and cst.cstmr_nm like '%${dta.srch_txt}%'`
        }
    }
    else if (dta.srch_type == 5) {
        if (dta.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${dta.srch_txt}%'`
        }
    }
    var QRY_TO_EXEC = `SELECT 
      ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, 
      cp.pkge_prche_id,cp.caf_id,c.caf_id,c.caf_nu,DATE_FORMAT(cp.sbscrptn_req_ts, '%Y-%m-%d') as req_dt,cp.sbscrptn_req_ts,cp.sbscrptn_req_in,cst.frst_nm, cst.lst_nm,c.iptv_srl_nu,c.iptv_mac_addr_tx,c.onu_srl_nu,c.caf_type_id,
          cst.cstmr_nm,c.adhr_nu,c.mbl_nu,p.pckge_id,1 as pkcge_idnty, p.pckge_type_id,
      p.pckge_nm, p.chrge_at, p.gst_at,l.lnge_nm,
      (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
      (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
      spl.srvcpk_id,
      spl.srvcpk_nm, chl.chnle_id, chl.chnle_nm,
      DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
      DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
      DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt
      FROM caf_pckge_prchse_dtl_t cp
          join caf_dtl_t as c on c.caf_id = cp.caf_id
          join cstmr_dtl_t as cst on cst.cstmr_id = c.cstmr_id
          JOIN pckge_lst_t p on p.pckge_id = cp.pckge_id
      JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
      JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
      JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
      JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id
      JOIN lnge_lst_t as l on l.lnge_id = chl.lnge_id
      WHERE c.lmo_agnt_id = ${dta.agntID} and cp.sbscrptn_req_in = 1 and spr.cre_srvce_id = 2  AND cp.a_in = 1 AND  p.a_in = 1 AND spl.a_in = 1 ${caf} ${adhar} ${mobile} ${where_cnd}
      ORDER BY cp.sbscrptn_req_ts limit ${pge_nu}, 20`;

    // var QRY_TO_EXEC = `SELECT * from caf_pckge_prchse_dtl_t limit 10`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
 * Function       : getchannelHstryLstMdl
 * Description    :
 * Arguments      : callback function
 ******************************************************************************/
exports.getchannelHstryLstMdl = function (data, user) {
    var fnm = "getchannelHstryLstMdl"
    let where_cnd = ` `;
    console.log('getchannelHstryLstMdl')
    let dta = data.data;
    console.log(dta)
    let pge_nu = dta.lmt_pstn * 20;
    if (dta.caf_nu == 0) {
        caf = ` `
    }
    else if (dta.caf_nu != 0) {
        caf = `and c.caf_nu='${dta.caf_nu}' `
    }
    if (dta.adhar_nu == 0) {
        adhar = ` `
    }
    else if (dta.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${dta.adhar_nu}' `
    }
    if (dta.mbl_nu == 0) {
        mobile = ` `
    }
    else if (dta.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${dta.mbl_nu}' `
    }
    if (dta.agntID == 0) {
        agntid = ` `
    }
    else if (dta.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${dta.agntID}`
    }


    if (dta.sts == 0) {
        where_cnd += ` `;
    }
    else if (dta.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${dta.sts} `
    }

    if (dta.srch_type == 1) {
        if (dta.srch_txt) {
            where_cnd += ` and c.caf_id like '%${dta.srch_txt}%' `
        }
    }
    else if (dta.srch_type == 2) {
        if (dta.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${dta.srch_txt}%' `
        }
    }
    else if (dta.srch_type == 3) {
        if (dta.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${dta.srch_txt}%' `
        }
    }
    else if (dta.srch_type == 4) {
        if (dta.srch_txt) {
            where_cnd += ` and cst.cstmr_nm like '%${dta.srch_txt}%'`
        }
    }
    else if (dta.srch_type == 5) {
        if (dta.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${dta.srch_txt}%'`
        }
    }
    var QRY_TO_EXEC = `SELECT
    (CASE WHEN cp.aprvl_in = 1 THEN "PACKAGE APPROVED" WHEN cp.rjct_in = 1 THEN "PACKAGE REJECTED" ELSE "NA" END) as pckg_sts,
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no,
    cp.pkge_prche_id,cp.caf_id,c.caf_id,c.caf_nu,DATE_FORMAT(cp.sbscrptn_req_ts, '%Y-%m-%d') as req_dt,cp.sbscrptn_req_ts,cp.sbscrptn_req_in,cst.frst_nm, cst.lst_nm,c.iptv_srl_nu,c.iptv_mac_addr_tx,c.onu_srl_nu,c.caf_type_id, cst.cstmr_nm,c.adhr_nu,c.mbl_nu,p.pckge_id,1 as pkcge_idnty, p.pckge_type_id, p.pckge_nm, p.chrge_at, p.gst_at,l.lnge_nm,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at ELSE 0 END) as ttl_cst,
    spl.srvcpk_id,spl.srvcpk_nm, chl.chnle_id, chl.chnle_nm,
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,
    (case when rjct_in=1 then 'Rejected' WHEN aprvl_in=1 THEN 'Approved' end) as 'status', DATE_FORMAT(cp.rjct_ts, '%Y-%m-%d') as rjct_ts, DATE_FORMAT(cp.aprvl_ts, '%Y-%m-%d') as aprvl_ts
    FROM caf_pckge_prchse_dtl_t cp
    join caf_dtl_t as c on c.caf_id = cp.caf_id
    join cstmr_dtl_t as cst on cst.cstmr_id = c.cstmr_id
    JOIN pckge_lst_t p on p.pckge_id = cp.pckge_id
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_lst_t chl on chl.chnle_id = ch.chnle_id
    JOIN lnge_lst_t as l on l.lnge_id = chl.lnge_id AND (cp.aprvl_usr_id is NOT NULL OR cp.rjct_usr_id is not NULL)
    WHERE c.lmo_agnt_id = ${dta.agntID} and p.pckge_type_id = 2 AND cp.a_in = 1 AND  p.a_in = 1 
    AND spl.a_in = 1 ${caf} ${adhar} ${mobile} ${where_cnd}
    ORDER BY cp.sbscrptn_req_ts limit ${pge_nu}, 20`;

    // var QRY_TO_EXEC = `SELECT * from caf_pckge_prchse_dtl_t limit 10`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
 * Function       : postUpdtAprvlFormMdl
 * Description    :
 * Arguments      : callback function
 ******************************************************************************/
exports.postUpdtAprvlMdl = function (data, user, calbk) {
    var fnm = "postUpdtAprvlMdl"
    console.log('postUpdtAprvlMdl _____________________ ');
    console.log(data);
    var count = 0;
    for(var i=0; i<data.length; i++){
        var QRY_TO_EXEC = ` update caf_pckge_prchse_dtl_t set sbscrptn_req_in = 0, rjct_in = 0,rjct_ts = null,rjct_usr_id = null,aprvl_in = 1,aprvl_ts = current_timestamp(), u_ts = current_timestamp(), aprvl_usr_id = ${data[i].agent_id}, src_id = 2, cmnt_txt = 'Approval From Concern LMO ${data[i].agent_id}', efcte_dt = '${data[i].efcte_dt}', expry_dt = '${data[i].expry_dt}' where caf_id = ${data[i].caf_id} and pckge_id = ${data[i].pckge_id} AND sbscrptn_req_in = 1; `;

        console.log("____ postUpdtAprvlMdl ____\n" + QRY_TO_EXEC);
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results)=>{
            if(++count == data.length){
                calbk(err, results);
            }
        });
    }
  }
  
  /*****************************************************************************
   * Function       : postRjctAprvlMdl
   * Description    :
   * Arguments      : callback function
   ******************************************************************************/
  exports.postRjctAprvlMdl = function (data, user, calbk) {
    var fnm = "postRjctAprvlMdl"
    console.log('postRjctAprvlMdl _____________________ ');
    console.log(data);
    var count = 0;
    for(var i=0; i<data.length; i++){
        var QRY_TO_EXEC = `update caf_pckge_prchse_dtl_t set rjct_in = 1, sbscrptn_req_in = 0, aprvl_in = 0,aprvl_ts = null,aprvl_usr_id = null, rjct_ts = current_timestamp(), u_ts = current_timestamp(), rjct_usr_id = ${data[i].agent_id},src_id = 2, cmnt_txt = '${data[i].comment}', efcte_dt = '${data[i].efcte_dt}', expry_dt = '${data[i].expry_dt}' where caf_id = ${data[i].caf_id} and pckge_id = ${data[i].pckge_id} AND sbscrptn_req_in = 1; `;

        console.log("____ postRjctAprvlMdl ____\n" + QRY_TO_EXEC);
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results)=>{
            if(++count == data.length){
                calbk(err, results);
            }
        });
    }
  }

/*****************************************************************************
* Function      : insrtSubscrptnRqustMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.insrtSubscrptnRqustMdl = (data, user) => {
    var fnm = "insrtSubscrptnRqustMdl"
    var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t(caf_id, pckge_id, srvcpk_id, chrge_at, gst_at, sbscrptn_req_in, sbscrptn_req_ts, aprvl_in, src_id)
    VALUES(${data.caf_id}, ${data.pckge_id}, ${data.srvcpk_id}, '${data.chrge_at}', '${data.gst_at}', 1, CURRENT_TIMESTAMP(), 0, 1); `;
     console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : updtUnsubscrptnRqustMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.updtUnsubscrptnRqustMdl = (data, user) => {
    var fnm = "updtUnsubscrptnRqustMdl"

    var QRY_TO_EXEC = ` UPDATE caf_pckge_prchse_dtl_t set dscnt_in = 1, expry_dt = CURDATE(), dscnt_ts = CURRENT_TIMESTAMP(), src_id = 1 WHERE caf_id = ${data.caf_id} AND pckge_id = ${data.pckge_id}; `;
     console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
