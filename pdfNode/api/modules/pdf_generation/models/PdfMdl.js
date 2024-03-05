var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);




/*****************************************************************************
* Function      : getgeneratePdfCstmrsMdl
* Description   : Update staging table after insert
* Arguments     : callback function
******************************************************************************/
exports.getgeneratePdfCstmrsMdl = (data, user) => {
    var where = '';
    console.log(data)
    if (data.cstmr_id) {
        where = `invl.cstmr_id = ${data.cstmr_id} and invl.invce_yr = ${data.year} and invl.invce_mm = ${data.month}`
        var QRY_TO_EXEC = `SELECT
        invl.caf_id as cafid,cstr.cstmr_id as customerid, invl.caf_invce_id,
        invd.invce_dtl_id, invd.caf_invce_id, invd.caf_id, invd.chrge_cde_id,invd.cgst_at as cgst1,invd.sgst_at as sgst1,chr.chrge_cd,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y')as plan_act,invd.chrge_at, invd.pckge_id, pkg.pckge_nm,cinv.invce_pdf_url_tx,
        LOWER((case when cstr.cntct_nm is null then cstr.blng_cntct_nm else cstr.cntct_nm end)) as contactname,LOWER(cstr.blng_eml1_tx) as blng_eml1_tx,LOWER(cstr.blng_addr1_tx) as blng_addr1_tx, LOWER((case when invce_addr_tx=1 then cstr.loc_addr2_tx else cstr.blng_addr1_tx end)) as loc_addr2_tx, LOWER(cstr.blng_addr2_tx) as blng_addr2_tx, LOWER(cstr.blng_ara_tx) as blng_ara_tx, LOWER(cstr.cstmr_nm) as addrs_rbk_txt,
        (case when cstr.blng_cntct_mble1_nu is null then cstr.cntct_mble1_nu else cstr.blng_cntct_mble1_nu
        end) as num, cstr.blng_pn_cd,invl.cgst_at,invl.sgst_at,
        cinv.cstmr_invce_id as cst_invoiceid,cinv.invce_mm,cinv.adjsd_at, DATE_FORMAT(cinv.de_dt,'%d-%m-%Y') as duedate, DATE_FORMAT(cinv.invce_dt,'%d-%m-%Y') as billdate,(invl.cgst_at+invl.sgst_at+invl.invce_at) as inve_amnt,
        DATE_FORMAT(invl.invce_frm_dt,'%d-%m-%Y') as billstart,DATE_FORMAT(invl.invce_to_dt,'%d-%m-%Y') as billend, DATE_FORMAT(invd.chrge_frm_dt,'%d-%m-%Y') as chrge_frm_dt,
        DATE_FORMAT(invd.chrge_to_dt,'%d-%m-%Y') as chrge_to_dt,sum(invl.cgst_at+invl.sgst_at+invl.invce_at) over (PARTITION BY cstr.cstmr_id) as ttl_tax,
        cinv.prvce_blnce_at as prvbal,invl.invce_at,invl.srvc_at,sum(invl.invce_at+invl.sgst_at + invl.cgst_at) over (PARTITION BY cstr.cstmr_id)  as crrnt_bill,pyble_at,(IFNULL(cinv.prvce_blnce_at,0)-pyble_at) as balnce,DATE_FORMAT(caf.actvn_dt,'%d-%m-%Y') as actvn_dt,invl.invce_at as ttl_invc,voip_chrge_at,invl.srvc_at as ttl_srvc_at,
        (case WHEN invl.recring_chrge_at then 1 else 0 end) as recring_chrge_at,
        (case when invl.value_add_srvce_at then 1 else 0 end) as value_add_srvce_at,
        (case when invl.hsi_chrge_at then 1 else 0 end) as hsi_chrge_at,
        (case when invl.add_on_chrge_at then 1 ELSE 0 end) as add_on_chrge_at,
        LOWER(d.dstrt_nm) as dstrt_nm,LOWER(v.vlge_nm) as vlge_nm,cstr.entrpe_type_id,ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as hsi_total,p1.pckge_nm as hsi_pckge_nm,vp.phne_nu
        FROM erp_invce_lst_t invl
        join erp_cstmr_invce_lst_t cinv on cinv.cstmr_invce_id=invl.cstmr_invce_id and invl.pblsd_in=1
         JOIN cstmr_dtl_t cstr on cstr.cstmr_id = invl.cstmr_id and cstr.a_in=1
        JOIN caf_dtl_t caf on caf.caf_id = invl.caf_id and caf.a_in=1
        left JOIN vlge_lst_t v ON v.vlge_nu = cstr.loc_vlge_id and v.dstrt_id=cstr.loc_dstrct_id and v.mndl_id=cstr.loc_mndl_id
        JOIN dstrt_lst_t d ON d.dstrt_id = cstr.loc_dstrct_id
        JOIN erp_invce_dtl_t invd on invd.caf_invce_id = invl.caf_invce_id
        JOIN chrge_cde_lst_t chr on chr.chrge_cde_id = invd.chrge_cde_id
        LEFT OUTER JOIN pckge_lst_t pkg on pkg.pckge_id = invd.pckge_id
        left join caf_pckge_prchse_dtl_t as cpp on cpp.pckge_id = pkg.pckge_id and cpp.caf_id = caf.caf_id
        join pckge_lst_t p1 on p1.pckge_id = caf.crnt_pln_id
        left join voip_caf_phne_nmbrs_rel_t vc on vc.caf_id=invl.caf_id
        left join voip_phne_nmbrs_lst_t vp on vp.phne_nmbr_id=vc.phne_nmbr_id
        left join BSS_BATCH.hsi_mnthly_usge_dtl_t h on h.caf_id = invl.caf_id and yr_ct=${data.year} and mnt_ct=${data.month}
        where ${where};`
    }
    else {
        if (data.custype == 1 || data.custype == 2) {
            where = `cstr.loc_dstrct_id=${data.district} and cstr.entrpe_type_id=${data.custype} and cinv.invce_yr = ${data.year} and cinv.invce_mm = ${data.month}  order by cstr.cstmr_id,invl.caf_invce_id,invd.invce_dtl_id`
        }

        else {
            where = `cstr.loc_dstrct_id=${data.district} and cstr.entrpe_type_id is null and cinv.invce_yr = ${data.year} and cinv.invce_mm = ${data.month} order by cstr.cstmr_id,invl.caf_invce_id,invd.invce_dtl_id `
        }
        var QRY_TO_EXEC = `
        SELECT
invl.caf_id as cafid,cstr.cstmr_id as customerid, invl.caf_invce_id,
invd.invce_dtl_id, invd.caf_invce_id, invd.caf_id, invd.chrge_cde_id,chr.chrge_cd,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y')as plan_act,invd.chrge_at, invd.pckge_id, pkg.pckge_nm,cinv.invce_pdf_url_tx,
LOWER((case when cstr.cntct_nm is null then cstr.blng_cntct_nm else cstr.cstmr_nm end)) as contactname,LOWER(cstr.blng_eml1_tx) as blng_eml1_tx, LOWER(cstr.blng_addr1_tx) as blng_addr1_tx, LOWER((case when invce_addr_tx=1 then cstr.loc_addr2_tx else cstr.blng_addr1_tx end)) as loc_addr2_tx, LOWER(cstr.blng_addr2_tx) as blng_addr2_tx, LOWER(cstr.blng_ara_tx) as blng_ara_tx,
(case when cstr.blng_cntct_mble1_nu is null then cstr.cntct_mble1_nu else cstr.blng_cntct_mble1_nu
end) as num, cstr.blng_pn_cd,invl.cgst_at,invl.sgst_at,
cinv.cstmr_invce_id as cst_invoiceid,cinv.invce_mm,cinv.adjsd_at, DATE_FORMAT(cinv.de_dt,'%d-%m-%Y') as duedate, DATE_FORMAT(cinv.invce_dt,'%d-%m-%Y') as billdate,(invl.cgst_at+invl.sgst_at+invl.invce_at) as inve_amnt,
DATE_FORMAT(invl.invce_frm_dt,'%d-%m-%Y') as billstart,DATE_FORMAT(invl.invce_to_dt,'%d-%m-%Y') as billend, DATE_FORMAT(invd.chrge_frm_dt,'%d-%m-%Y') as chrge_frm_dt,
DATE_FORMAT(invd.chrge_to_dt,'%d-%m-%Y') as chrge_to_dt,sum(invl.cgst_at+invl.sgst_at+invl.invce_at) over (PARTITION BY cstr.cstmr_id) as ttl_tax,
cinv.prvce_blnce_at as prvbal,invl.invce_at,invl.srvc_at,sum(invl.invce_at+invl.sgst_at + invl.cgst_at) over (PARTITION BY cstr.cstmr_id)  as crrnt_bill,pyble_at,(IFNULL(cinv.prvce_blnce_at,0)-pyble_at) as balnce,DATE_FORMAT(caf.actvn_dt,'%d-%m-%Y') as actvn_dt,invl.invce_at as ttl_invc,voip_chrge_at,invl.srvc_at as ttl_srvc_at,
(case WHEN invl.recring_chrge_at then 1 else 0 end) as recring_chrge_at,
(case when invl.value_add_srvce_at then 1 else 0 end) as value_add_srvce_at,
(case when invl.hsi_chrge_at then 1 else 0 end) as hsi_chrge_at,
(case when invl.add_on_chrge_at then 1 ELSE 0 end) as add_on_chrge_at,
LOWER(d.dstrt_nm) as dstrt_nm,LOWER(v.vlge_nm) as vlge_nm,cstr.entrpe_type_id,ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as hsi_total,p1.pckge_nm as hsi_pckge_nm,vp.phne_nu
FROM erp_invce_lst_t invl
join erp_cstmr_invce_lst_t cinv on cinv.cstmr_id=invl.cstmr_id and cinv.cstmr_invce_id=invl.cstmr_invce_id and invl.pblsd_in=1
 JOIN cstmr_dtl_t cstr on cstr.cstmr_id = cinv.cstmr_id and cstr.a_in=1
JOIN caf_dtl_t caf on caf.caf_id = invl.caf_id and caf.a_in=1
left JOIN vlge_lst_t v ON v.vlge_nu = cstr.loc_vlge_id and v.dstrt_id=cstr.loc_dstrct_id and v.mndl_id=cstr.loc_mndl_id
JOIN dstrt_lst_t d ON d.dstrt_id = cstr.loc_dstrct_id
JOIN erp_invce_dtl_t invd on invd.caf_invce_id = invl.caf_invce_id
JOIN chrge_cde_lst_t chr on chr.chrge_cde_id = invd.chrge_cde_id
LEFT OUTER JOIN pckge_lst_t pkg on pkg.pckge_id = invd.pckge_id
left join caf_pckge_prchse_dtl_t as cpp on cpp.pckge_id = pkg.pckge_id and cpp.caf_id = caf.caf_id
join pckge_lst_t p1 on p1.pckge_id = caf.crnt_pln_id
left join voip_caf_phne_nmbrs_rel_t vc on vc.caf_id=invl.caf_id
left join voip_phne_nmbrs_lst_t vp on vp.phne_nmbr_id=vc.phne_nmbr_id
left join BSS_BATCH.hsi_mnthly_usge_dtl_t h on h.caf_id = invl.caf_id and yr_ct=${data.year} and mnt_ct=${data.month}
        where ${where};`
    }
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : checkCstmrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.checkCstmrMdl = (resdata, user) => {
    var QRY_TO_EXEC = `SELECT * FROM caf_dtl_t where caf_id=${resdata.caf_id};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : getcstmrcntCstmrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getcstmrcntCstmrMdl = (data, user) => {
    if (data.custype == 1 || data.custype == 2) {
        where = `cstr.loc_dstrct_id=${data.district} and cstr.entrpe_type_id=${data.custype} and cinv.invce_yr = ${data.year} and cinv.invce_mm = ${data.month}  GROUP BY cstr.cstmr_id and cstr.loc_dstrct_id`
    }

    else {
        where = `cstr.loc_dstrct_id=${data.district} and cstr.entrpe_type_id is null and cinv.invce_yr = ${data.year} and cinv.invce_mm = ${data.month}  GROUP BY cstr.cstmr_id and cstr.loc_dstrct_id`
    }
    var QRY_TO_EXEC = `SELECT COUNT(DISTINCT cstr.cstmr_id) as count,cinv.cstmr_id  from erp_invce_lst_t as invl
    join erp_cstmr_invce_lst_t cinv on cinv.cstmr_id=invl.cstmr_id and cinv.cstmr_invce_id=invl.cstmr_invce_id and invl.pblsd_in=1
JOIN cstmr_dtl_t cstr on cstr.cstmr_id = cinv.cstmr_id and cstr.a_in=1
        JOIN caf_dtl_t caf on caf.caf_id = invl.caf_id and caf.a_in=1
        left JOIN vlge_lst_t v ON v.vlge_nu = cstr.loc_vlge_id and v.dstrt_id=cstr.loc_dstrct_id and v.mndl_id=cstr.loc_mndl_id
        JOIN dstrt_lst_t d ON d.dstrt_id = cstr.loc_dstrct_id
    JOIN erp_invce_dtl_t invd on invd.caf_invce_id = invl.caf_invce_id
LEFT OUTER JOIN pckge_lst_t pkg on pkg.pckge_id = invd.pckge_id WHERE ${where}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : insertIntostsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertIntostsMdl = (resdata, cnt, user) => {
    var QRY_TO_EXEC = `insert into pdf_sms_email_sts (fle_typ,inve_cstmr_typ_id,invce_dstrt_id,invce_year,inve_mnth,ttl_cnt,cstmr_id,crte_usr_id,sts_txt,i_ts) values('pdf',${resdata.custype || null},${resdata.district || null},${resdata.year},${resdata.month},${cnt},${resdata.cstmr_id || null},${user.mrcht_usr_id},'processing',current_timestamp());`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : usrGnrtdPdfsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.usrGnrtdPdfsMdl = (user) => {
    var QRY_TO_EXEC = `select s.*, d.dstrt_nm,s.sts_id, e.entrpe_type_nm 
    from pdf_sms_email_sts s 
    left join dstrt_lst_t d on s.invce_dstrt_id = d.dstrt_id
    left join entrpe_cstmr_typ_lst_t e on s.inve_cstmr_typ_id =  e.entrpe_type_id
    where s.crte_usr_id=${user.mrcht_usr_id} and s.sts_txt <> 'completed' order by s.i_ts desc;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : updtpdfstsCntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtpdfstsCntMdl = (data, user) => {
    // console.log("updtpdfstsCntMdl")

    var QRY_TO_EXEC = `update pdf_sms_email_sts set  u_ts=current_timestamp(),pdf_gen_cnt = pdf_gen_cnt + 1 where sts_id=${data.sts_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function      : updtpdfstsPartlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtpdfstsCntPartlMdl = (data, user) => {
    // console.log("updtpdfstsPartlMdl")

    var QRY_TO_EXEC = `update pdf_sms_email_sts set u_ts=current_timestamp(),fld_gen_cnt = fld_gen_cnt + 1 where sts_id=${data.sts_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : updtpdfstsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtpdfstsMdl = (data, user) => {
    // console.log("updtpdfstsMdl")

    var QRY_TO_EXEC = `update pdf_sms_email_sts set sts_txt = '${data.sts_tx}', u_ts=current_timestamp() where sts_id=${data.sts_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : updtpdfstsPartlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtpdfstsCntPartlMdl = (data, user) => {
    // console.log("updtpdfstsPartlMdl")

    var QRY_TO_EXEC = `update pdf_sms_email_sts set u_ts=current_timestamp(),fld_gen_cnt = fld_gen_cnt + 1 where sts_id=${data.sts_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : updatePdfUrl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updatePdfUrl = (data) => {
    console.log(data)
    var QRY_TO_EXEC = `update erp_cstmr_invce_lst_t set invce_pdf_url_tx = '${data.pdfurl}',u_ts=current_timestamp(), invce_pdf_in=1 where cstmr_invce_id = ${data.cst_invoiceid}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function      : myGenrtPdfsCtrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.myGenrtPdfsCtrlMdl = (data, user) => {
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY p.sts_id)as sno,p.sts_id, p.fle_typ,d.dstrt_nm,invce_year,inve_mnth,sts_txt,ttl_cnt,pdf_gen_cnt from pdf_sms_email_sts  as p
    left JOIN dstrt_lst_t d ON d.dstrt_id = invce_dstrt_id
     where invce_year = ${data.year} and inve_mnth=${data.month} and p.crte_usr_id=${user.mrcht_usr_id} and sts_txt = 'completed'`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : myRecntGenrtPdfsCtrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.myRecntGenrtPdfsCtrlMdl = (data, user) => {
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY p.sts_id)as sno,p.sts_id, p.fle_typ,d.dstrt_nm,invce_year,inve_mnth,sts_txt,ttl_cnt,pdf_gen_cnt from pdf_sms_email_sts  as p
    left JOIN dstrt_lst_t d ON d.dstrt_id = invce_dstrt_id
     where invce_year = ${data.year} and inve_mnth=${data.month} and sts_txt = 'completed'`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function      : getcafvoipcalldtlsMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafvoipcalldtlsMdl = (data, user) => {
    if (data.cstmr_id) {
        var QRY_TO_EXEC = `select count(case when lcl_cals_in=1 then 1 end) as locl_calls,vc.caf_id,count(case when std_cals_in=1 then 1 end) as std_calls,
    count(case when istd_cals_in=1 then 1 end) as isd_calls,
    SEC_TO_TIME(sum(case when lcl_cals_in=1 then vc.cals_drtn_scnds_ct end)) as lcl_duration,
    SEC_TO_TIME(sum(case when std_cals_in=1 then vc.cals_drtn_scnds_ct end)) as std_duration,
    SEC_TO_TIME(sum(case when istd_cals_in=1 then vc.cals_drtn_scnds_ct end )) as istd_duration,
    sum(case when lcl_cals_in=1 then cals_chrge_at end) as lcl_chtge,
    sum(case when std_cals_in=1 then cals_chrge_at end) as std_chtge,
    sum(case when istd_cals_in=1 then cals_chrge_at end) as istd_chtge,c.cstmr_id
    from cstmr_dtl_t as c
    join caf_dtl_t caf on caf.cstmr_id=c.cstmr_id
    join BSS_BATCH.voip_call_hstry_lst_t as vc on vc.caf_id=caf.caf_id
    where c.cstmr_id = ${data.cstmr_id} and vc.cals_yr = ${data.year} and vc.cals_mm = ${data.month}
    group by caf.caf_id;`
    }
    else {
        var QRY_TO_EXEC = `select count(case when lcl_cals_in=1 then 1 end) as locl_calls,vc.caf_id,count(case when std_cals_in=1 then 1 end) as std_calls,
        count(case when istd_cals_in=1 then 1 end) as isd_calls,
        SEC_TO_TIME(sum(case when lcl_cals_in=1 then vc.cals_drtn_scnds_ct end)) as lcl_duration,
        SEC_TO_TIME(sum(case when std_cals_in=1 then vc.cals_drtn_scnds_ct end)) as std_duration,
        SEC_TO_TIME(sum(case when istd_cals_in=1 then vc.cals_drtn_scnds_ct end )) as istd_duration,
        sum(case when lcl_cals_in=1 then cals_chrge_at end) as lcl_chtge,
        sum(case when std_cals_in=1 then cals_chrge_at end) as std_chtge,
        sum(case when istd_cals_in=1 then cals_chrge_at end) as istd_chtge,c.cstmr_id
        from cstmr_dtl_t as c
        join caf_dtl_t caf on caf.cstmr_id=c.cstmr_id
        join BSS_BATCH.voip_call_hstry_lst_t as vc on vc.caf_id=caf.caf_id
        where c.loc_dstrct_id = ${data.district} and c.entrpe_type_id=${data.custype} and vc.cals_yr = ${data.year} and vc.cals_mm = ${data.month}
        group by caf.caf_id;`
    }
    console.log(QRY_TO_EXEC)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

}

exports.getcafvoipcallhistryMdl = (data, user) => {
    if (data.cstmr_id) {
    var QRY_TO_EXEC = `select caf.caf_nu,date_format(vc.strt_ts,'%d-%m-%Y') as date,date_format(vc.strt_ts,'%H:%i') as time,
    vc.cld_phne_nu,lcl_cals_in,std_cals_in,istd_cals_in,sum(case when lcl_cals_in=1 then 1 end) as lcl_calls,
    SEC_TO_TIME(sum(case when lcl_cals_in=1 then vc.cals_drtn_scnds_ct end)) as lcl_duration,
	sum(case when lcl_cals_in=1 then cals_chrge_at end) as lcl_chtge,
    sum(case when std_cals_in=1 then 1 end) as std_calls,
    SEC_TO_TIME(sum(case when std_cals_in=1 then vc.cals_drtn_scnds_ct end)) as std_duration,
	sum(case when std_cals_in=1 then cals_chrge_at end) as std_chtge,
	sum(case when istd_cals_in=1 then 1 end) as istd_calls,
    SEC_TO_TIME(sum(case when istd_cals_in=1 then vc.cals_drtn_scnds_ct end)) as istd_duration,
	sum(case when istd_cals_in=1 then cals_chrge_at end) as istd_chtge
    from cstmr_dtl_t as c
    join caf_dtl_t caf on caf.cstmr_id=c.cstmr_id
    join BSS_BATCH.voip_call_hstry_lst_t as vc on vc.caf_id=caf.caf_id
    where c.cstmr_id = ${data.cstmr_id} and vc.cals_yr = ${data.year} and vc.cals_mm = ${data.month} group by caf.caf_id,vc.cld_phne_nu;`
    }
    else{
        var QRY_TO_EXEC = `select caf.caf_nu,date_format(vc.strt_ts,'%d-%m-%Y') as date,date_format(vc.strt_ts,'%H:%i') as time,
        vc.cld_phne_nu,lcl_cals_in,std_cals_in,istd_cals_in,sum(case when lcl_cals_in=1 then 1 end) as lcl_calls,
        SEC_TO_TIME(sum(case when lcl_cals_in=1 then vc.cals_drtn_scnds_ct end)) as lcl_duration,
        sum(case when lcl_cals_in=1 then cals_chrge_at end) as lcl_chtge,
        sum(case when std_cals_in=1 then 1 end) as std_calls,
        SEC_TO_TIME(sum(case when std_cals_in=1 then vc.cals_drtn_scnds_ct end)) as std_duration,
        sum(case when std_cals_in=1 then cals_chrge_at end) as std_chtge,
        sum(case when istd_cals_in=1 then 1 end) as istd_calls,
        SEC_TO_TIME(sum(case when istd_cals_in=1 then vc.cals_drtn_scnds_ct end)) as istd_duration,
        sum(case when istd_cals_in=1 then cals_chrge_at end) as istd_chtge
        from cstmr_dtl_t as c
        join caf_dtl_t caf on caf.cstmr_id=c.cstmr_id
        join BSS_BATCH.voip_call_hstry_lst_t as vc on vc.caf_id=caf.caf_id
        where c.loc_dstrct_id = ${data.district} and c.entrpe_type_id=${data.custype} and vc.cals_yr = ${data.year} and vc.cals_mm = ${data.month} group by caf.caf_id,vc.cld_phne_nu;` 
    }
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

}
/*****************************************************************************
* Function      : refreshPdfdtaMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.refreshPdfdtaMdl = (id) => {
    // console.log("refreshPdfdtaMdl")

    var QRY_TO_EXEC = `SELECT * FROM pdf_sms_email_sts WHERE sts_id =${id};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}