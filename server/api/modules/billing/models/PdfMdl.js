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
    var fnm = "getgeneratePdfCstmrsMdl"
    var where = '';
    if (data.cstmr_id) {
        where = `cinv.cstmr_id = ${data.cstmr_id} and cinv.invce_yr = ${data.year} and cinv.invce_mm = ${data.month} AND (cinv.invce_pdf_url_tx is null or  cinv.invce_pdf_url_tx = '')`
        var QRY_TO_EXEC = `SELECT
        invl.caf_id as cafid,cstr.cstmr_id as customerid, invl.caf_invce_id,
        invd.invce_dtl_id, invd.caf_invce_id, invd.caf_id, invd.chrge_cde_id, chr.chrge_cd, invd.chrge_at, invd.pckge_id, pkg.pckge_nm,
        cstr.cntct_nm as contactname, cstr.blng_addr1_tx, cstr.blng_addr2_tx, cstr.blng_ara_tx,
        cstr.cntct_mble1_nu as num, cstr.blng_pn_cd,
        cinv.cstmr_invce_id as cst_invoiceid,cinv.invce_mm, cinv.de_dt as duedate, cinv.invce_dt as billdate,
        cinv.invce_frm_dt as billstart, cinv.invce_to_dt as billend,
        cinv.prvce_blnce_at as prvbal,invl.invce_at,invl.srvc_at,(cinv.invce_at+cinv.srvc_at) as crrnt_bill,pyble_at,(cinv.prvce_blnce_at-pyble_at) as balnce,caf.actvn_dt,cinv.invce_at as ttl_invc,voip_chrge_at,cinv.srvc_at as ttl_srvc_at,
        (case WHEN invl.recring_chrge_at then 1 else 0 end) as recring_chrge_at,(case when invl.value_add_srvce_at then 1 else 0 end) as value_add_srvce_at, (case when invl.hsi_chrge_at then 1 else 0 end) as hsi_chrge_at,(case when invl.add_on_chrge_at then 1 ELSE 0 end) as add_on_chrge_at,d.dstrt_nm,v.vlge_nm,cstr.entrpe_type_id
        FROM erp_cstmr_invce_lst_t cinv
        JOIN cstmr_dtl_t cstr on cstr.cstmr_id = cinv.cstmr_id and cstr.a_in=1
        JOIN erp_invce_lst_t invl on invl.cstmr_id = cinv.cstmr_id and invl.cstmr_invce_id = cinv.cstmr_invce_id and invl.pblsd_in=1
        JOIN caf_dtl_t caf on caf.caf_id = invl.caf_id and caf.a_in=1
        JOIN dstrt_lst_t d ON d.dstrt_id = cstr.loc_dstrct_id
        JOIN vlge_lst_t v ON v.vlge_id  = cstr.loc_vlge_id
        JOIN erp_invce_dtl_t invd on invd.caf_invce_id = invl.caf_invce_id
        JOIN chrge_cde_lst_t chr on chr.chrge_cde_id = invd.chrge_cde_id
        LEFT OUTER JOIN pckge_lst_t pkg on pkg.pckge_id = invd.pckge_id where ${where}`
    }
    else {
        if (data.custype == 1 || data.custype == 2) {
            where = `cstr.loc_dstrct_id=${data.district} and cstr.entrpe_type_id=${data.custype} and cinv.invce_yr = ${data.year} and cinv.invce_mm = ${data.month} AND (cinv.invce_pdf_url_tx is null or  cinv.invce_pdf_url_tx = '') order by cstr.cstmr_id,invl.caf_invce_id,invd.invce_dtl_id`
        }

        else {
            where = `cstr.loc_dstrct_id=${data.district} and cstr.entrpe_type_id is null and cinv.invce_yr = ${data.year} and cinv.invce_mm = ${data.month} AND (cinv.invce_pdf_url_tx is null or  cinv.invce_pdf_url_tx = '') order by cstr.cstmr_id,invl.caf_invce_id,invd.invce_dtl_id`
        }
        var QRY_TO_EXEC = `
        SELECT  
                invl.caf_id as cafid,cstr.cstmr_id as customerid, invl.caf_invce_id,
                invd.invce_dtl_id, invd.caf_invce_id, invd.caf_id, invd.chrge_cde_id, chr.chrge_cd, invd.chrge_at, invd.pckge_id, pkg.pckge_nm,
                cstr.cntct_nm as contactname, cstr.blng_addr1_tx, cstr.blng_addr2_tx, cstr.blng_ara_tx,
                cstr.cntct_mble1_nu as num, cstr.blng_pn_cd,
                cinv.cstmr_invce_id as cst_invoiceid,cinv.invce_mm, cinv.de_dt as duedate, cinv.invce_dt as billdate,
                cinv.invce_frm_dt as billstart, cinv.invce_to_dt as billend,
                cinv.prvce_blnce_at as prvbal,invl.invce_at,invl.srvc_at,(cinv.invce_at+cinv.srvc_at) as crrnt_bill,pyble_at,(cinv.prvce_blnce_at-pyble_at) as balnce,
                caf.actvn_dt,cinv.invce_at as ttl_invc,voip_chrge_at,cinv.srvc_at as ttl_srvc_at,
                (case WHEN invl.recring_chrge_at then 1 else 0 end) as recring_chrge_at,(case when invl.value_add_srvce_at then 1 else 0 end) as value_add_srvce_at, (case when invl.hsi_chrge_at then 1 else 0 end) as hsi_chrge_at,(case when invl.add_on_chrge_at then 1 ELSE 0 end) as add_on_chrge_at,d.dstrt_nm,v.vlge_nm,cstr.entrpe_type_id
                FROM erp_cstmr_invce_lst_t cinv
                JOIN cstmr_dtl_t cstr on cstr.cstmr_id = cinv.cstmr_id and cstr.a_in=1
                JOIN erp_invce_lst_t invl on invl.cstmr_id = cinv.cstmr_id and invl.cstmr_invce_id = cinv.cstmr_invce_id and invl.pblsd_in=1
                JOIN caf_dtl_t caf on caf.caf_id = invl.caf_id and caf.a_in=1
                JOIN dstrt_lst_t d ON d.dstrt_id = cstr.loc_dstrct_id
                JOIN vlge_lst_t v ON v.vlge_id  = cstr.loc_vlge_id
                JOIN erp_invce_dtl_t invd on invd.caf_invce_id = invl.caf_invce_id
                JOIN chrge_cde_lst_t chr on chr.chrge_cde_id = invd.chrge_cde_id
                LEFT OUTER JOIN pckge_lst_t pkg on pkg.pckge_id = invd.pckge_id where ${where}`
    }
    // console.log(QRY_TO_EXEC)


    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}
/*****************************************************************************
* Function      : checkCstmrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.checkCstmrMdl = (resdata, user) => {
    var fnm = "checkCstmrMdl"
    var QRY_TO_EXEC = `SELECT * FROM cstmr_dtl_t where cstmr_id=${resdata.cstmr_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}
/*****************************************************************************
* Function      : insertIntostsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertIntostsMdl = (resdata, cnt, user) => {
    var fnm= "insertIntostsMdl"
    // console.log(resdata)
    var QRY_TO_EXEC = `insert into pdf_sms_email_sts (fle_typ,inve_cstmr_typ_id,invce_dstrt_id,invce_year,inve_mnth,ttl_cnt,cstmr_id,crte_usr_id,sts_txt,i_ts) values('pdf',${resdata.custype || null},${resdata.district || null},${resdata.year},${resdata.month},${cnt},${resdata.cstmr_id || null},${user.mrcht_usr_id},'Processing',current_timestamp())`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}
/*****************************************************************************
* Function      : usrGnrtdPdfsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.usrGnrtdPdfsMdl = (user) => {
    var fnm = "usrGnrtdPdfsMdl"
    var QRY_TO_EXEC = `select s.*, d.dstrt_nm,s.sts_id, e.entrpe_type_nm 
    from pdf_sms_email_sts s 
    left join dstrt_lst_t d on s.invce_dstrt_id = d.dstrt_id
    left join entrpe_cstmr_typ_lst_t e on s.inve_cstmr_typ_id =  e.entrpe_type_id
    where s.crte_usr_id=${user.mrcht_usr_id} and s.sts_txt <> 'completed' order by s.i_ts desc`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : updtpdfstsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtpdfstsMdl = (data, user) => {
    var fnm = "updtpdfstsMdl"
    // console.log("updtpdfstsMdl")

    var QRY_TO_EXEC = `update pdf_sms_email_sts set sts_txt ='${data.sts_txt}', u_ts=current_timestamp(),pdf_gen_cnt = ${data.pdf_gen_cnt},fld_gen_cnt = ${data.fld_gen_cnt} where sts_id=${data.sts_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user ,fnm);
}

/*****************************************************************************
* Function      : updatePdfUrl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updatePdfUrl = (data) => {
    var fnm = "updatePdfUrl"
    console.log(data)
    var QRY_TO_EXEC = `update erp_cstmr_invce_lst_t set invce_pdf_url_tx = '${data.pdfurl}', invce_pdf_in=1 where cstmr_invce_id = ${data.cst_invoiceid}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function      : myGenrtPdfsCtrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.myGenrtPdfsCtrlMdl = (data, user) => {
    var fnm = "myGenrtPdfsCtrlMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY p.sts_id)as sno, p.fle_typ,d.dstrt_nm,invce_year,inve_mnth,sts_txt,ttl_cnt,pdf_gen_cnt from pdf_sms_email_sts  as p
    left JOIN dstrt_lst_t d ON d.dstrt_id = invce_dstrt_id
     where invce_year = ${data.year} and inve_mnth=${data.month} and p.crte_usr_id=${user.mrcht_usr_id} and sts_txt = 'completed'`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : myRecntGenrtPdfsCtrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.myRecntGenrtPdfsCtrlMdl = (data, user) => {
    var fnm = "myRecntGenrtPdfsCtrlMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY p.sts_id)as sno, p.fle_typ,d.dstrt_nm,invce_year,inve_mnth,sts_txt,ttl_cnt,pdf_gen_cnt from pdf_sms_email_sts  as p
    left JOIN dstrt_lst_t d ON d.dstrt_id = invce_dstrt_id
     where invce_year = ${data.year} and inve_mnth=${data.month} and sts_txt = 'completed'`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : refreshPdfdtaMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.refreshPdfdtaMdl = (id, user) => {
    var fnm = "refreshPdfdtaMdl"
    // console.log("refreshPdfdtaMdl")

    var QRY_TO_EXEC = `SELECT * FROM pdf_sms_email_sts WHERE sts_id =${id};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}