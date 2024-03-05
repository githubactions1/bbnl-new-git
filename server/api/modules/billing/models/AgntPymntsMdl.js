var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : postAgntPymntsMdl
* Description   : get details of all AgntPymntMode
* Arguments     : callback function
******************************************************************************/
exports.postAgntPymntsMdl = (data, upld_id, user) => {
    var fnm = "postAgntPymntsMdl"

    var conInsrtFld;
    var conFld;
    var trnsnTxInsrtFldCondition = ``;
    var trnsnTxFldCondition = ``;
    var mnlUpldInInsrtFldCondition;
    var mnlUpldInFldCondition;

    if (data.trnsn_tx) {
        trnsnTxInsrtFldCondition = `'${data.trnsn_tx}',`;
        trnsnTxFldCondition = `trnsn_tx,`;
        mnlUpldInInsrtFldCondition = `1,`
        mnlUpldInFldCondition = `mnl_upld_in,`
    } else {
        mnlUpldInInsrtFldCondition = `1,`
        mnlUpldInFldCondition = `mnl_upld_in,`
    }
    if (upld_id != '') {
        conFld = ',upld_id';
        conInsrtFld = `,${upld_id}`;
    } else {
        conFld = '';
        conInsrtFld = ``;
    }
    var QRY_TO_EXEC = ` INSERT INTO
                        agnt_trnsn_dtl_t(trsn_dt,agnt_id,trnsn_type_id,pymnt_mde_id,trns_ref_nu,trnsn_at,trnsn_bnk_nm,${trnsnTxFldCondition} cmnt_tx${conFld},${mnlUpldInFldCondition}crte_usr_id,a_in,i_ts)
                        VALUES(ADDDATE('${data.trsn_dt}', INTERVAL current_time() HOUR_SECOND),'${data.agnt_id}','${data.trnsn_type_id}','${data.pymnt_mde_id}','${data.dd_nu ? data.dd_nu : ''}','${data.trnsn_at}','${data.trnsn_bnk_nm ? data.trnsn_bnk_nm : ''}',
                        ${trnsnTxInsrtFldCondition} '${data.cmnt_tx}' ${conInsrtFld},${mnlUpldInInsrtFldCondition}${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;
    ;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getPymntsByAgntIdMdl
* Description   : get payment details
* Arguments     : callback function
******************************************************************************/
exports.getPymntsByAgntIdMdl = (agntData, user) => {
    var fnm = "getPymntsByAgntIdMdl"
    var condition;
    var ordrByCon;
    var dtCondition = ``;
    var aprvlCondition = ``;

    if (agntData.aprvl == true) {
        aprvlCondition = `mnl_upld_in=1 AND aprve_ts IS NULL`;
    }
    if (user.usr_ctgry_ky) {
        condition = `adt.agnt_id=${user.usr_ctgry_ky} AND aprve_ts IS NOT NULL`;
        ordrByCon = `ORDER BY DATE_FORMAT(trsn_dt,'%Y-%m-%d') desc  LIMIT 50`;
    } else {
        if (agntData.aprvl == true) {
            condition = ``;
            ordrByCon = `ORDER BY DATE_FORMAT(trsn_dt,'%Y-%m-%d') desc `;
        } else {
            condition = `adt.agnt_id=${agntData.agntId} AND aprve_ts IS NOT NULL`;
            ordrByCon = `ORDER BY DATE_FORMAT(trsn_dt,'%Y-%m-%d') desc `;
        }
    }

    if (agntData.frmDt != '' && agntData.toDt != '') {
        dtCondition = `AND trsn_dt BETWEEN '${agntData.frmDt}' AND '${agntData.toDt}'`;
    }

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_nm,agnt_cd,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,adt.pymnt_mde_id,pymnt_mde_nm,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,trns_ref_nu,cmnt_tx,trnsn_bnk_nm,t.trnsn_ctgry_id,atc.trnsn_ctgry_nm
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id 
                        left JOIN agnt_trnsn_ctgry_lst_t atc on atc.trnsn_ctgry_id = t.trnsn_ctgry_id
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE ${aprvlCondition} ${condition} AND adt.a_in=1 AND adt.rjctd_in IS NULL ${dtCondition} ${ordrByCon}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : postAgntPymntsUpldMdl
* Description   : Insert into payment upload table
* Arguments     : callback function
******************************************************************************/
exports.postAgntPymntsUpldMdl = (data, user) => {
    var fnm = "postAgntPymntsUpldMdl"
    var QRY_TO_EXEC = ` INSERT INTO 
    agnt_trnsn_upld_lst_t(upld_cmnt_tx,upld_ct,crte_usr_id,a_in,i_ts)
    VALUES('${data.upld_cmnt_tx}',${data.upld_ct},${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPymntsByUsrIdMdl
* Description   : Get user uploaded id of payments
* Arguments     : callback function
******************************************************************************/
exports.getPymntsByUsrIdMdl = (user) => {
    var fnm = "getPymntsByUsrIdMdl"
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_nm,agnt_cd,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,adt.upld_id,trnsn_bnk_nm,p.pymnt_mde_id,pymnt_mde_nm,
                        trns_ref_nu,cmnt_tx 
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id AND t.trnsn_ctgry_id=2
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        JOIN agnt_trnsn_upld_lst_t ut ON adt.crte_usr_id = ut.crte_usr_id
                        WHERE adt.crte_usr_id=${user.mrcht_usr_id} AND adt.aprve_ts IS NOT NULL AND adt.trnsn_tx IS NULL
                        GROUP BY trnsn_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPymntsRcntMdl
* Description   : Get recent payments
* Arguments     : callback function
******************************************************************************/
exports.getPymntsRcntMdl = (pymntData, user) => {
    var fnm = "getPymntsRcntMdl"
    var dtCondition;
    var lmtCondition;
    if (pymntData.frmDt != '' && pymntData.toDt != '') {
        dtCondition = `AND trsn_dt BETWEEN '${pymntData.frmDt}' AND '${pymntData.toDt}'`;
        lmtCondition = ``;
    } else {
        dtCondition = ``;
        lmtCondition = `LIMIT 50`;
    }

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_cd,agnt_nm,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,upld_id,trnsn_bnk_nm,p.pymnt_mde_id,pymnt_mde_nm,
                        trns_ref_nu,cmnt_tx FROM
                        agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id AND t.trnsn_ctgry_id=2
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE adt.a_in=1 AND adt.aprve_ts IS NOT NULL ${dtCondition} AND adt.trnsn_tx IS NULL
                        ORDER BY adt.i_ts DESC
                        ${lmtCondition}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : postAgntPymntsWthoutLmoMdl
* Description   : Post payments details
* Arguments     : callback function
******************************************************************************/
exports.postAgntPymntsWthoutLmoMdl = (data, upld_id, user) => {

    var fnm = "postAgntPymntsWthoutLmoMdl"
    var QRY_TO_EXEC = ` INSERT INTO
                        agnt_trnsn_dtl_s(trsn_dt,agnt_nm,mble_nu,trnsn_type_id,trns_ref_nu,trnsn_at,cmnt_tx,trnsn_tx,pymnt_mde_id,upld_id,crte_usr_id,a_in,i_ts)
                        VALUES('${data.trsn_dt}','${data.agnt_nm}','${data.mble_nu}','${data.trnsn_type_id}','${data.dd_nu}','${data.trnsn_at}',
                        '${data.cmnt_tx}','${data.trnsn_tx}','${data.pymnt_mde_id}','${upld_id}',${user.mrcht_usr_id},1,CURRENT_TIMESTAMP()) `;
    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getBnkStmntsDtlsMdl
* Description   : Get Bank Statement Details
* Arguments     : callback function
******************************************************************************/
exports.getBnkStmntsDtlsMdl = (data, user) => {
    var fnm = "getBnkStmntsDtlsMdl"

    var QRY_TO_EXEC = `SELECT *,ROW_NUMBER() OVER ( ORDER BY stge_trnsn_id,trsn_dt desc) sno,date_format(trsn_dt,'%d-%m-%Y') as trns_dte from agnt_trnsn_dtl_s 
                        WHERE DATE(trsn_dt) BETWEEN '${data.frmdate}' and '${data.todate}' AND a_in=1
                        ORDER BY stge_trnsn_id,trsn_dt desc;`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAgntPymntsWthoutLmoMdl
* Description   : Get Bank Statement without Lmo details
* Arguments     : callback function
******************************************************************************/
exports.getAgntPymntsWthoutLmoMdl = (data, user) => {
    var fnm = "getAgntPymntsWthoutLmoMdl"

    var QRY_TO_EXEC = ` SELECT *,DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS frmtd_trsn_dt FROM
                        agnt_trnsn_dtl_s
                        WHERE trnsn_tx = '${data.trnsn_tx}' AND trsn_dt = '${data.trsn_dt}' AND a_in=1`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAgntPymntsLmoMdl
* Description   : Get payment Lmo details
* Arguments     : callback function
******************************************************************************/
exports.getAgntPymntsLmoMdl = (data, user) => {
    var fnm = "getAgntPymntsLmoMdl"
    var con;
    if (data.agnt_id) {
        con = `agnt_id=${data.agnt_id} AND`;
    } else {
        con = `trnsn_tx = '${data.trnsn_tx}' AND`;
    }
    var QRY_TO_EXEC = ` SELECT trnsn_id,trnsn_at,agnt_id,trnsn_type_id,wlt_blnce_at,agnt_blnce_at,pymnt_mde_id,DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS frmtd_trsn_dt,
                        DATE_FORMAT(trsn_dt,'%Y-%m-%d') AS trsn_dt,trns_ref_nu,trnsn_bnk_nm,cmnt_tx,upld_id,trnsn_tx,crte_usr_id,updte_usr_id,a_in,d_ts,u_ts,i_ts FROM
                        agnt_trnsn_dtl_t
                        WHERE  ${con} trnsn_at='${data.trnsn_at}' AND DATE_FORMAT(trsn_dt,'%Y-%m-%d')=DATE_FORMAT('${data.trsn_dt}','%Y-%m-%d') AND a_in=1`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updtAgntTrnsnDtlStgngMdl
* Description   : Update staging table after insert
* Arguments     : callback function
******************************************************************************/
exports.updtAgntTrnsnDtlStgngMdl = (data, user) => {
    var fnm = "updtAgntTrnsnDtlStgngMdl"
    var QRY_TO_EXEC = ` UPDATE agnt_trnsn_dtl_s SET a_in=0 WHERE agnt_nm='${data.agnt_nm}' AND trsn_dt='${data.trsn_dt}'`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getgeneratePdfCstmrsMdl
* Description   : Update staging table after insert
* Arguments     : callback function
******************************************************************************/
exports.getgeneratePdfCstmrsMdl = (data, user) => {
    var fnm = "getgeneratePdfCstmrsMdl"
    var where;
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
        (case WHEN invl.recring_chrge_at then 1 else 0 end) as recring_chrge_at,(case when invl.value_add_srvce_at then 1 else 0 end)
as value_add_srvce_at,
(case when invl.hsi_chrge_at then 1 else 0 end) as hsi_chrge_at,(case when invl.add_on_chrge_at then 1 ELSE 0 end) as add_on_chrge_at,d.dstrt_nm,v.vlge_nm,cstr.entrpe_type_id
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
            where = `cstr.entrpe_type_id is null and cinv.invce_yr = ${data.year} and cinv.invce_mm = ${data.month} AND (cinv.invce_pdf_url_tx is null or  cinv.invce_pdf_url_tx = '') order by cstr.cstmr_id,invl.caf_invce_id,invd.invce_dtl_id`
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
                (case WHEN invl.recring_chrge_at then 1 else 0 end) as recring_chrge_at,(case when invl.value_add_srvce_at then 1 else 0 end)
        as value_add_srvce_at,
        (case when invl.hsi_chrge_at then 1 else 0 end) as hsi_chrge_at,(case when invl.add_on_chrge_at then 1 ELSE 0 end) as add_on_chrge_at,d.dstrt_nm,v.vlge_nm,cstr.entrpe_type_id
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
    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}
/*****************************************************************************
* Function      : insertIntostsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertIntostsMdl = (resdata,cnt, user) => {
    var fnm = 'insertIntostsMdl'
    var QRY_TO_EXEC = `insert into pdf_sms_email_sts (fle_typ,inve_cstmr_typ_id,invce_dstrt_id,invce_year,inve_mnth,ttl_cnt,cstmr_id,crte_usr_id,sts_txt,i_ts) values('pdf',${resdata.custype || null},${resdata.district || null},${resdata.year},${resdata.month},${cnt},${resdata.cstmr_id || null},${user.mrcht_usr_id},'Processing',current_timestamp())`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user, fnm);
}
/*****************************************************************************
* Function      : usrGnrtdPdfsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.usrGnrtdPdfsMdl = (user) => {
    var fnm = "usrGnrtdPdfsMdl"
    var QRY_TO_EXEC = `select s.*, d.dstrt_nm, e.entrpe_type_nm 
    from pdf_sms_email_sts s 
    left join dstrt_lst_t d on s.invce_dstrt_id = d.dstrt_id
    left join entrpe_cstmr_typ_lst_t e on s.inve_cstmr_typ_id =  e.entrpe_type_id
    where s.crte_usr_id=${user.mrcht_usr_id} and s.sts_txt <> 'completed' order by s.i_ts;`;
    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}
/*****************************************************************************
* Function      : updtpdfstsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtpdfstsMdl = (data, user) => {
    var fnm = "updtpdfstsMdl"
    var QRY_TO_EXEC = `update pdf_sms_email_sts set sts_txt ='${data.sts_txt}', u_ts=current_timestamp(),pdf_gen_cnt = ${data.pdf_gen_cnt},fld_gen_cnt = ${data.fld_gen_cnt} where sts_id=${data.sts_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : InsrtCstmrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.InsrtCstmrsMdl = (data, id, user) => {
    var fnm = "InsrtCstmrsMdl"
    var QRY_TO_EXEC = `insert into dstrct_caf_invoide_info (dstrct_id,cstmr_id,invce_dt,invce_yr,invce_mm,invce_frm_dt,invce_to_dt,phne_nu,payment_cstmr_id,cstmr_invce_id,bill_period,due_dt,prvce_blnce_at,lst_pymnt,adjstmnt,bal_amnt,currnt_bill,ttl_psy_amnt,amunt,tax,status,insrt_id) values(${data.loc_dstrct_id},${data.cstmr_id},'${data.invce_dt}','${data.invce_yr}','${data.invce_mm}','${data.invce_frm_dt}','${data.invce_to_dt}','${data.phne_nu}','${data.payment_cstmr_id}',${data.cstmr_invce_id},'${data.bill_period}','${data.bill_period}','${data.due_dt}',${data.prvce_blnce_at},${data.lst_pymnt},${data.adjstmnt},${data.bal_amnt},${data.currnt_bill},${data.ttl_psy_amnt},${data.amunt},${data.tax},'start',${id})`;
    // 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}
/*****************************************************************************
* Function      : updatePdfUrl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updatePdfUrl = (data) => {
    var fnm = "updatePdfUrl"
    var QRY_TO_EXEC = `update erp_cstmr_invce_lst_t set invce_pdf_url_tx = '${data.pdfurl}', invce_pdf_in=1 where cstmr_invce_id = ${data.cst_invoiceid}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}
/*****************************************************************************
* Function      : updteCount
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updteCount = (s, data) => {
    var fnm = "updteCount"
    var QRY_TO_EXEC = `update pdf_sms_email_sts set sts_txt='${s.sts_txt}' ,pdf_gen_cnt=${s.pdf_gen_cnt}, fld_gen_cnt= ${s.fld_gen_cnt} where fle_typ='pdf' and cstmr_id=${data[0].cstmr_id || null} and invce_year=${data[0].invce_yr} and inve_mnth = ${data[0].invce_mm}`;

    // 

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function      : getCstmrWaveOffsMdl
* Description   : Get customer list who are in wave-off
* Arguments     : callback function
******************************************************************************/
exports.getCstmrWaveOffsMdl = (user) => {
    var fnm="getCstmrWaveOffsMdl"

    var QRY_TO_EXEC = ` SELECT 
                        tle_nm,cs.cstmr_nm,cs.lst_nm,entrpe_type_nm,loc_lcly_tx,loc_eml1_tx,cntct_nm,cntct_mble1_nu,
                        cs.cstmr_id,c.caf_type_id,caf_type_nm,loc_addr1_tx,loc_dstrct_id,dstrt_nm,vlge_nm
                        ,cw.caf_id,caf_nu,wvr_id,wvr_dscn_tx,efcte_dt,expry_dt,DATE_FORMAT(cw.aprve_ts,'%d-%m-%Y') as aprvd_on
                        ,c.cstmr_id,c.mbl_nu,c.instl_addr1_tx,instl_ara_tx,instl_eml1_tx,
                        DATE_FORMAT(instd_ts,'%d-%m-%Y') as instld_on,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') AS actvn_dt FROM
                        caf_wvrs_dtl_t cw
                        JOIN caf_dtl_t c ON c.caf_id = cw.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN caf_type_lst_t ct ON c.caf_type_id = ct.caf_type_id
                        JOIN dstrt_lst_t d ON d.dstrt_id = cs.loc_dstrct_id
                        JOIN vlge_lst_t v ON v.vlge_id  = cs.loc_vlge_id
                        JOIN entrpe_cstmr_typ_lst_t es ON es.entrpe_type_id = cs.entrpe_type_id
                        WHERE aprve_ts IS NOT NULL
                        ORDER BY cw.caf_id;`;
    // added user
    //                         SELECT 
    //                         tle_nm,cs.cstmr_nm,cs.lst_nm,entrpe_type_nm,loc_lcly_tx,loc_eml1_tx,cntct_nm,cntct_mble1_nu,
    // efcte_dt,expry_dt,cw.crte_usr_id,mu.mrcht_usr_nm AS crte_usr_nm,DATE_FORMAT(cw.i_ts,'%d-%m-%Y') as crte_on,
    // cw.aprve_usr_id,mu1.mrcht_usr_nm AS aprvd_usr_nm,cw.aprve_cmnt_tx,DATE_FORMAT(cw.aprve_ts,'%d-%m-%Y') as aprvd_on
    //                         ,cs.cstmr_id,c.caf_type_id,caf_type_nm,loc_addr1_tx,cntct_nm,loc_dstrct_id,dstrt_nm,vlge_nm
    //                         ,cw.caf_id,caf_nu,wvr_id,wvr_dscn_tx,efcte_dt,expry_dt,aprve_ts
    //                         ,c.cstmr_id,c.mbl_nu,c.instl_addr1_tx,instl_ara_tx,instl_eml1_tx,DATE_FORMAT(instd_ts,'%d-%m-%Y') as instld_on FROM
    //                         caf_wvrs_dtl_t cw
    //                         JOIN caf_dtl_t c ON c.caf_id = cw.caf_id
    //                         JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
    //                         JOIN caf_type_lst_t ct ON c.caf_type_id = ct.caf_type_id
    //                         JOIN dstrt_lst_t d ON d.dstrt_id = cs.loc_dstrct_id
    //                         JOIN vlge_lst_t v ON v.vlge_id  = cs.loc_vlge_id
    //                         JOIN entrpe_cstmr_typ_lst_t es ON es.entrpe_type_id = cs.entrpe_type_id
    // JOIN mrcht_usr_lst_t mu ON cw.crte_usr_id = mu.mrcht_usr_id
    // JOIN mrcht_usr_lst_t mu1 ON cw.aprve_usr_id = mu1.mrcht_usr_id
    //                         WHERE aprve_ts IS NOT NULL
    //                         ORDER BY cw.caf_id;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : postCafWaveOffsMdl
* Description   : Add cafs to waveoff
* Arguments     : callback function
******************************************************************************/
exports.postCafWaveOffsMdl = (data, user) => {
    var fnm = "postCafWaveOffsMdl"
	console.log(data)
    var QRY_TO_EXEC = ` INSERT INTO
                        caf_wvrs_dtl_t(caf_id,wvr_dscn_tx,efcte_dt,expry_dt,crte_usr_id,a_in,i_ts)
                        VALUES(${data.caf_id},'${data.wvr_desc_tx}','${data.efctve_dt}','${data.expry_dt}',${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCafWaveOffAprvlsMdl
* Description   : Get cafs-waveoff approvals
* Arguments     : callback function
******************************************************************************/
exports.getCafWaveOffAprvlsMdl = (user) => {
    var fnm = "getCafWaveOffAprvlsMdl"

    var QRY_TO_EXEC = ` SELECT wvr_id,wvr_dscn_tx,cw.caf_id,cstmr_nm,lst_nm,c.caf_nu
                        ,mbl_nu,instl_addr1_tx,instl_eml1_tx,c.caf_type_id,caf_type_nm
                        ,DATE_FORMAT(efcte_dt,'%d-%m-%Y') AS efcte_dt,DATE_FORMAT(expry_dt,'%d-%m-%Y') AS expry_dt FROM
                        caf_wvrs_dtl_t cw
                        JOIN caf_dtl_t c ON c.caf_id = cw.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN caf_type_lst_t ct ON c.caf_type_id = ct.caf_type_id
                        WHERE aprve_ts IS NULL`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updateCafWaveOffAprvlsMdl
* Description   : update cafs-waveoff approvals
* Arguments     : callback function
******************************************************************************/
exports.updateCafWaveOffAprvlsMdl = (data, user) => {
    var fnm = "updateCafWaveOffAprvlsMdl"
    var updtFields;

    if (data.aprvl_in == 1) {
        updtFields = `aprve_ts = CURRENT_TIMESTAMP(), aprve_cmnt_tx='${data.wvr_aprvl_desc_tx}'`;
    } else {
        updtFields = `rjctd_in = 1`;
    }
    var QRY_TO_EXEC = ` UPDATE caf_wvrs_dtl_t SET 
                        ${updtFields},updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id} AND wvr_id=${data.wvr_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : updatePreviousPymnts
* Description   : update agent payment approvals
* Arguments     : callback function
******************************************************************************/
exports.updatePreviousPymnts = (data, prvpymntDta, user) => {
    var fnm = "updatePreviousPymnts"
   var fnl_agnt_blnce_at;

    if(prvpymntDta.trnsn_type_id == 7){
        // console.log("in 7");
        fnl_agnt_blnce_at = `${data.agnt_blnce_at}` + `${data.trnsn_at}`
        agntblnce=`,agnt_blnce_at=${fnl_agnt_blnce_at}` 
    }
    else{
        // console.log("in else");
        fnl_agnt_blnce_at = `${data.agnt_blnce_at}` - `${data.trnsn_at}`
        agntblnce=`,agnt_blnce_at=${fnl_agnt_blnce_at}` 
    }
    console.log(agntblnce);
    // return;
    // var QRY_TO_EXEC = `update agnt_trnsn_dtl_t set  u_ts=CURRENT_TIMESTAMP(),updte_usr_id=${user.mrcht_usr_id} ${agntblnce} where  agnt_id='${data.agnt_id}'
    //  and DATE_FORMAT(trsn_dt,'%Y-%m-%d')>DATE_FORMAT('${data.trsn_dt}','%Y-%m-%d')`;

    var QRY_TO_EXEC =`update agnt_trnsn_dtl_t set u_ts=CURRENT_TIMESTAMP(),updte_usr_id=${user.mrcht_usr_id} ${agntblnce} 
    where agnt_id='${data.agnt_id}' and trsn_dt > (SELECT trsn_dt FROM agnt_trnsn_dtl_t WHERE trnsn_id=${data.trnsn_id})`
     
     console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : get_LastestBlnce
* Description   : update agent payment approvals
* Arguments     : callback function
******************************************************************************/
exports.get_LastestBlnce = (data, user) => {
    var fnm = "get_LastestBlnce"

  
    var QRY_TO_EXEC =[ `select agnt_id,(case when agnt_blnce_at is null then 0 else agnt_blnce_at end) as latest_blnce, trsn_dt,trnsn_type_id from agnt_trnsn_dtl_t where agnt_id=${data.agnt_id} and  trnsn_id=${data.trnsn_id}`,
    `select agnt_id,(case when agnt_blnce_at is null then 0 else agnt_blnce_at end) as latest_blnce, trsn_dt 
    from agnt_trnsn_dtl_t 
    where trsn_dt =(select max(trsn_dt) from agnt_trnsn_dtl_t
    where agnt_id=${data.agnt_id} and CASE WHEN trnsn_type_id=6 THEN aprve_ts is not NULL ELSE 1=1 END and trsn_dt < (ADDDATE('${data.trsn_dt}', INTERVAL current_time() HOUR_SECOND))) 
    AND agnt_id=${data.agnt_id}`];

    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : +++++++++++
* Description   : update agent payment approvals
* Arguments     : callback function
******************************************************************************/
exports.updateAgntPymntAprvlsMdl = (data, user) => {
    var fnm = "updateAgntPymntAprvlsMdl"
    var updtFields;
    var crdtAprvlCal = ``;

    if (data.aprvl_in == 1) {
        updtFields = `aprve_ts = CURRENT_TIMESTAMP(), aprve_cmnt_tx='${data.pymnt_aprvl_desc_tx}'`;
    } else {
        updtFields = `rjctd_in = 1`;
    }
    if (data.wltBlCal_aprvl_in == 1) {
        crdtAprvlCal = `,wlt_blnce_at = ${data.agntWltAmt},agnt_blnce_at = ${data.agntBalAmt}`
    }
    var QRY_TO_EXEC = ` UPDATE agnt_trnsn_dtl_t
                        SET ${updtFields},aprve_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP(),updte_usr_id=${user.mrcht_usr_id}
                        ${crdtAprvlCal}
                        WHERE agnt_id = ${data.agnt_id} AND DATE(trsn_dt) = '${data.trsn_dt}' AND trnsn_id=${data.trnsn_id}`;
 console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCstmrWaveOffsByUsrIdMdl
* Description   : Get waveoff of a customer by userid
* Arguments     : callback function
******************************************************************************/
exports.getCstmrWaveOffsByUsrIdMdl = (user) => {
    var fnm = "getCstmrWaveOffsByUsrIdMdl"

    var QRY_TO_EXEC = ` SELECT 
                        cw.crte_usr_id,tle_nm,cs.cstmr_nm,entrpe_type_nm,loc_lcly_tx,loc_eml1_tx,cntct_nm,cntct_mble1_nu,
                        cs.cstmr_id,c.caf_type_id,caf_type_nm,loc_addr1_tx,cntct_nm,loc_dstrct_id,dstrt_nm,vlge_nm
                        ,cw.caf_id,caf_nu,wvr_id,wvr_dscn_tx,efcte_dt,expry_dt,aprve_ts
                        ,c.cstmr_id,c.mbl_nu,c.instl_addr1_tx,instl_ara_tx,instl_eml1_tx FROM
                        caf_wvrs_dtl_t cw
                        JOIN caf_dtl_t c ON c.caf_id = cw.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN caf_type_lst_t ct ON c.caf_type_id = ct.caf_type_id
                        JOIN dstrt_lst_t d ON d.dstrt_id = cs.loc_dstrct_id
                        JOIN vlge_lst_t v ON v.vlge_id  = cs.loc_vlge_id
                        JOIN entrpe_cstmr_typ_lst_t es ON es.entrpe_type_id = cs.entrpe_type_id
                        WHERE aprve_ts IS NOT NULL 
                        AND cw.crte_usr_id = ${user.mrcht_usr_id}
                        ORDER BY cw.i_ts `;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCstmrWaveOffsAllRcntMdl
* Description   : Get all recent customer wavers
* Arguments     : callback function
******************************************************************************/
exports.getCstmrWaveOffsAllRcntMdl = (cstmrWvrData, user) => {
    var fnm = "getCstmrWaveOffsAllRcntMdl"
    var dtCondition;
    var lmtCondition;
    if (cstmrWvrData.frmDt != '' && cstmrWvrData.toDt != '') {
        dtCondition = `AND date(cw.i_ts) BETWEEN '${cstmrWvrData.frmDt}' AND '${cstmrWvrData.toDt}'`;
        lmtCondition = ``;
    } else {
        dtCondition = ``;
        lmtCondition = `LIMIT 50`;
    }
    var QRY_TO_EXEC = ` SELECT 
                        tle_nm,cs.cstmr_id,cs.cstmr_nm,entrpe_type_nm,loc_lcly_tx,loc_eml1_tx,cntct_nm,cntct_mble1_nu,
                        cs.cstmr_id,c.caf_type_id,caf_type_nm,loc_addr1_tx,cntct_nm,loc_dstrct_id,dstrt_nm,vlge_nm
                        ,cw.caf_id,caf_nu,wvr_id,wvr_dscn_tx,efcte_dt,expry_dt,aprve_ts,
                        c.cstmr_id,c.mbl_nu,c.instl_addr1_tx,instl_ara_tx,instl_eml1_tx FROM
                        caf_wvrs_dtl_t cw
                        JOIN caf_dtl_t c ON c.caf_id = cw.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN caf_type_lst_t ct ON c.caf_type_id = ct.caf_type_id
                        JOIN dstrt_lst_t d ON d.dstrt_id = cs.loc_dstrct_id
                        JOIN vlge_lst_t v ON v.vlge_id  = cs.loc_vlge_id
                        JOIN entrpe_cstmr_typ_lst_t es ON es.entrpe_type_id = cs.entrpe_type_id
                        WHERE aprve_ts IS NOT NULL ${dtCondition}
                        ORDER BY cw.i_ts DESC ${lmtCondition}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCafWaveOffAprvlsByUsrMdl
* Description   : Get cafs-waveoff approvals - by user
* Arguments     : callback function
******************************************************************************/
exports.getCafWaveOffAprvlsByUsrMdl = (user) => {
    var fnm = "getCafWaveOffAprvlsByUsrMdl"

    var QRY_TO_EXEC = ` SELECT wvr_id,wvr_dscn_tx,cw.caf_id,cstmr_nm,lst_nm,c.caf_nu
                        ,mbl_nu,instl_addr1_tx,instl_eml1_tx,c.caf_type_id,caf_type_nm
                        ,DATE_FORMAT(efcte_dt,'%d-%m-%Y') AS efcte_dt,DATE_FORMAT(expry_dt,'%d-%m-%Y') AS expry_dt FROM
                        caf_wvrs_dtl_t cw
                        JOIN caf_dtl_t c ON c.caf_id = cw.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN caf_type_lst_t ct ON c.caf_type_id = ct.caf_type_id
                        WHERE aprve_ts IS NOT NULL AND cw.crte_usr_id=2`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCafWaveOffAprvlsAllRcntMdl
* Description   : Get cafs-waveoff approvals - recent
* Arguments     : callback function
******************************************************************************/
exports.getCafWaveOffAprvlsAllRcntMdl = (cstmrWvrData, user) => {
    var fnm = "getCafWaveOffAprvlsAllRcntMdl"
    var dtCondition;
    var lmtCondition;
    if (cstmrWvrData.frmDt != '' && cstmrWvrData.toDt != '') {
        dtCondition = `AND date(cw.i_ts) BETWEEN '${cstmrWvrData.frmDt}' AND '${cstmrWvrData.toDt}'`;
        lmtCondition = ``;
    } else {
        dtCondition = ``;
        lmtCondition = `LIMIT 50`;
    }
    var QRY_TO_EXEC = ` SELECT wvr_id,wvr_dscn_tx,cw.caf_id,cstmr_nm,lst_nm,c.caf_nu
                        ,mbl_nu,instl_addr1_tx,instl_eml1_tx,c.caf_type_id,caf_type_nm
                        ,DATE_FORMAT(efcte_dt,'%d-%m-%Y') AS efcte_dt,DATE_FORMAT(expry_dt,'%d-%m-%Y') AS expry_dt FROM
                        caf_wvrs_dtl_t cw
                        JOIN caf_dtl_t c ON c.caf_id = cw.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN caf_type_lst_t ct ON c.caf_type_id = ct.caf_type_id
                        WHERE aprve_ts IS NOT NULL ${dtCondition}
                        ORDER BY cw.i_ts DESC ${lmtCondition}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : agntPymntAprvlsByUsrMdl
* Description   : Get payment approvals - by user
* Arguments     : callback function
******************************************************************************/
exports.agntPymntAprvlsByUsrMdl = (user) => {
    var fnm = "agntPymntAprvlsByUsrMdl"

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_nm,agnt_cd,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,adt.pymnt_mde_id,pymnt_mde_nm,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,trns_ref_nu,cmnt_tx,trnsn_bnk_nm,DATE_FORMAT(aprve_ts,'%d-%m-%Y') AS aprve_dt
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE mnl_upld_in=1 AND aprve_ts IS NOT NULL AND adt.rjctd_in IS NULL AND adt.a_in=1 AND adt.aprve_usr_id=${user.mrcht_usr_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : agntPymntAprvlsRcntMdl
* Description   : Get payment approvals - recent
* Arguments     : callback function
******************************************************************************/
exports.agntPymntAprvlsRcntMdl = (pymntData, user) => {
    var fnm = "agntPymntAprvlsRcntMdl"
    var dtCondition;
    var lmtCondition;
    if (pymntData.frmDt != '' && pymntData.toDt != '') {
        dtCondition = `AND trsn_dt BETWEEN '${pymntData.frmDt}' AND '${pymntData.toDt}'`;
        lmtCondition = ``;
    } else {
        dtCondition = ``;
        lmtCondition = `LIMIT 50`;
    }
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_nm,agnt_cd,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,adt.pymnt_mde_id,pymnt_mde_nm,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,trns_ref_nu,cmnt_tx,trnsn_bnk_nm,DATE_FORMAT(aprve_ts,'%d-%m-%Y') AS aprve_dt
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE mnl_upld_in=1 AND aprve_ts IS NOT NULL AND adt.rjctd_in IS NULL  AND adt.a_in=1 ${dtCondition} ORDER BY adt.aprve_ts DESC ${lmtCondition}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getTrnsnTypesByCtgryIdMdl
* Description   : Get tranaction type list
* Arguments     : callback function
******************************************************************************/
exports.getTrnsnTypesByCtgryIdMdl = (user) => {
    var fnm = "getTrnsnTypesByCtgryIdMdl"

    var QRY_TO_EXEC = ` SELECT * FROM
                        agnt_trnsn_type_lst_t 
                        WHERE a_in = 1
                        ORDER BY trnsn_type_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPymntsCrdtsByUsrIdMdl
* Description   : Get tranaction type list
* Arguments     : callback function
******************************************************************************/
exports.getPymntsCrdtsByUsrIdMdl = (user) => {
    var fnm = "getPymntsCrdtsByUsrIdMdl"

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_nm,agnt_cd,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,adt.upld_id,trnsn_bnk_nm,p.pymnt_mde_id,pymnt_mde_nm,
                        trns_ref_nu,cmnt_tx 
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id AND t.trnsn_ctgry_id=1
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        JOIN agnt_trnsn_upld_lst_t ut ON adt.crte_usr_id = ut.crte_usr_id
                        WHERE adt.crte_usr_id=${user.mrcht_usr_id}
                        GROUP BY trnsn_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPymntsCrdtsRcntMdl
* Description   : Get tranaction type list
* Arguments     : callback function
******************************************************************************/
exports.getPymntsCrdtsRcntMdl = (pymntData, user) => {
    var fnm = "getPymntsCrdtsRcntMdl"
    var dtCondition;
    var lmtCondition;
    if (pymntData.frmDt != '' && pymntData.toDt != '') {
        dtCondition = `AND trsn_dt BETWEEN '${pymntData.frmDt}' AND '${pymntData.toDt}'`;
        lmtCondition = ``;
    } else {
        dtCondition = ``;
        lmtCondition = `LIMIT 50`;
    }
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_cd,agnt_nm,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,upld_id,trnsn_bnk_nm,p.pymnt_mde_id,pymnt_mde_nm,
                        trns_ref_nu,cmnt_tx FROM
                        agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id AND t.trnsn_ctgry_id=1
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE adt.a_in=1 ${dtCondition}
                        ORDER BY adt.i_ts DESC
                        ${lmtCondition}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAgntPymntCrdtAprvlsMdl
* Description   : Get approval payments credits
* Arguments     : callback function
******************************************************************************/
exports.getAgntPymntCrdtAprvlsMdl = (user) => {
    var fnm = "getAgntPymntCrdtAprvlsMdl"

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_nm,agnt_cd,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,adt.pymnt_mde_id,pymnt_mde_nm,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,trns_ref_nu,cmnt_tx,trnsn_bnk_nm
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id AND t.trnsn_ctgry_id=1
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE mnl_upld_in=1 AND aprve_ts IS NULL  AND adt.a_in=1`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : agntPymntCrdtAprvlsByUsrMdl
* Description   : Get user payments credits
* Arguments     : callback function
******************************************************************************/
exports.agntPymntCrdtAprvlsByUsrMdl = (user) => {
    var fnm = "agntPymntCrdtAprvlsByUsrMdl"

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_nm,agnt_cd,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,adt.pymnt_mde_id,pymnt_mde_nm,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,trns_ref_nu,cmnt_tx,trnsn_bnk_nm
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id AND t.trnsn_ctgry_id=1
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE mnl_upld_in=1 AND aprve_ts IS NOT NULL  AND adt.a_in=1 AND adt.crte_usr_id=${user.mrcht_usr_id}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : agntPymntCrdtAprvlsRcntMdl
* Description   : Get all recent payments credits
* Arguments     : callback function
******************************************************************************/
exports.agntPymntCrdtAprvlsRcntMdl = (pymntData, user) => {
    var fnm = "agntPymntCrdtAprvlsRcntMdl"
    var dtCondition;
    var lmtCondition;
    if (pymntData.frmDt != '' && pymntData.toDt != '') {
        dtCondition = `AND trsn_dt BETWEEN '${pymntData.frmDt}' AND '${pymntData.toDt}'`;
        lmtCondition = ``;
    } else {
        dtCondition = ``;
        lmtCondition = `LIMIT 50`;
    }
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_nm,agnt_cd,adt.trnsn_type_id,trnsn_type_nm,adt.wlt_blnce_at,adt.agnt_blnce_at,adt.pymnt_mde_id,pymnt_mde_nm,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,trns_ref_nu,cmnt_tx,trnsn_bnk_nm
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id AND t.trnsn_ctgry_id=1
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE mnl_upld_in=1 AND aprve_ts IS NOT NULL  AND adt.a_in=1 ${dtCondition} ORDER BY adt.i_ts DESC ${lmtCondition}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function      : getbnkStmtPymntsByUsrIdMdl
* Description   : Get logged in user bank statement uploads
* Arguments     : callback function
******************************************************************************/
exports.getbnkStmtPymntsByUsrIdMdl = (user) => {
    var fnm = "getbnkStmtPymntsByUsrIdMdl"

    var QRY_TO_EXEC = ` SELECT trnsn_id,trnsn_at,adt.agnt_id,agnt_cd,agnt_nm,adt.trnsn_type_id,trnsn_type_nm,adt.pymnt_mde_id,pymnt_mde_nm,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,trns_ref_nu,trnsn_tx 
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON a.agnt_id = adt.agnt_id
                        JOIN agnt_trnsn_type_lst_t agt ON agt.trnsn_type_id = adt.trnsn_type_id
                        JOIN agnt_pymnt_mde_lst_t m ON m.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE trnsn_tx IS NOT NULL AND adt.a_in=1 AND adt.crte_usr_id=${user.mrcht_usr_id} AND adt.aprve_ts IS NOT NULL
                        ORDER BY adt.trnsn_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getbnkStmtPymntsRcntMdl
* Description   : Get recent in user bank statement uploads
* Arguments     : callback function
******************************************************************************/
exports.getbnkStmtPymntsRcntMdl = (pymntData, user) => {
    var fnm = "getbnkStmtPymntsRcntMdl"
    var dtCondition;
    var lmtCondition;
    if (pymntData.frmDt != '' && pymntData.toDt != '') {
        dtCondition = `AND trsn_dt BETWEEN '${pymntData.frmDt}' AND '${pymntData.toDt}'`;
        lmtCondition = ``;
    } else {
        dtCondition = ``;
        lmtCondition = `LIMIT 50`;
    }
    var QRY_TO_EXEC = ` SELECT trnsn_id,trnsn_at,adt.agnt_id,agnt_cd,agnt_nm,adt.trnsn_type_id,trnsn_type_nm,adt.pymnt_mde_id,pymnt_mde_nm,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,trns_ref_nu,trnsn_tx,adt.crte_usr_id,mrcht_usr_nm,fst_nm,lst_nm,
                        DATE_FORMAT(adt.i_ts,'%d-%m-%Y %h:%m') AS upld_ts 
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON a.agnt_id = adt.agnt_id
                        JOIN agnt_trnsn_type_lst_t agt ON agt.trnsn_type_id = adt.trnsn_type_id
                        JOIN agnt_pymnt_mde_lst_t m ON m.pymnt_mde_id = adt.pymnt_mde_id
                        JOIN mrcht_usr_lst_t mu ON adt.crte_usr_id = mu.mrcht_usr_id
                        WHERE trnsn_tx IS NOT NULL AND trnsn_tx <> '' AND adt.a_in=1 AND adt.aprve_ts IS NOT NULL
                        ${dtCondition}
                        ORDER BY adt.i_ts DESC ${lmtCondition}`;
    log.info(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getAllCstmrsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAllCstmrsMdl = function (data, user) {
    var fnm = "getAllCstmrsMdl"

    var QRY_TO_EXEC = `select  * from cstmr_dtl_t where cstmr_id LIKE '%${data.value}%'  limit 1000`;
    

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : updateAgntsLstPymntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateAgntsLstPymntMdl = function (data, prvpymntDta,user) {
    var fnm = "updateAgntsLstPymntMdl"

    var fnl_agnt_blnce_at;

    if(prvpymntDta.trnsn_type_id == 7){
        fnl_agnt_blnce_at = `${data.agnt_blnce_at}` + `${data.trnsn_at}`
        agntblnce=`,agnt_blnce_at=${fnl_agnt_blnce_at}` 
    }
    else{
        fnl_agnt_blnce_at = `${data.agnt_blnce_at}` - `${data.trnsn_at}`
        agntblnce=`,agnt_blnce_at=${fnl_agnt_blnce_at}` 
    }
    console.log(agntblnce);

    // if(prvpymntDta.trnsn_type_id == 7){
    //     console.log("i am hereeeeee")
    //     agntblnce=`,agnt_blnce_at=agnt_blnce_at+'${data.trnsn_at}'` 
    // }
    // else{
    //     agntblnce=`,agnt_blnce_at=agnt_blnce_at-'${data.trnsn_at}'` 
    // }

    var QRY_TO_EXEC = ` UPDATE agnt_lst_t
                        SET wlt_blnce_at = ${data.agntWltAmt},updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP() ${agntblnce}
                        WHERE agnt_id = ${data.agnt_id}`;
console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

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
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getLmoMonthyInvceDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getLmoMonthyInvceDtlsMdl = (year,month,lmo, user) => {
    var fnm = "getLmoMonthyInvceDtlsMdl"
    var mnthCond;
    if(month != 0){
        mnthCond = `AND invce_mm = ${month}`;
    } else {
        mnthCond = ``;
    }
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY e.cstmr_invce_id) as s_no, cstmr_invce_id as 'InvoiceId',a.agnt_cd as 'LMOCode',e.caf_invce_id
    ,e.cstmr_id,cm.cstmr_nm as 'CustomerName',e.invce_pdf_url_tx
    ,cm.cntct_mble1_nu as 'MobileNumber',e.caf_id as 'CafNo',
    e.apsfl_shre_at as 'APSFLShare',e.mso_shre_at as 'MSOShare',e.lmo_shre_at as 'LMOShare',(invce_at+sgst_at+cgst_at+srvc_at)
    as 'Total',
    DATE_FORMAT(invce_dt, "%d-%m-%Y") as 'InvoiceDate',MONTHNAME(str_to_date(invce_mm,'%m')) as 'Month',
    (case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'PaymentStatus',c.caf_id  as 'CafDate'
    from erp_invce_lst_t as e
    JOIN cstmr_dtl_t as cm on cm.cstmr_id= e.cstmr_id AND invce_yr = ${year} ${mnthCond}
    join agnt_lst_t as a on a.agnt_id = e.lmo_agnt_id AND a.agnt_cd = TRIM('${lmo}')
    join caf_dtl_t as  c on c.caf_id=e.caf_id
    WHERE pblsd_in=1`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getAgntDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgntDtlsMdl = function (user) {
    var fnm = "getAgntDtlsMdl"

    var QRY_TO_EXEC = `SELECT agnt_id FROM agnt_lst_t WHERE agnt_blnce_at=-9999999999.99 and a_in=1 AND onbrd_in=1`;
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getAgntTrnsDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgntTrnsDtlsMdl = function (agnt_id) {
    var fnm = "getAgntTrnsDtlsMdl"

    var QRY_TO_EXEC = `select a.trnsn_id, a.trnsn_at, b.agnt_blnce_at as prv_agnt_bal, 
    CASE WHEN a.trnsn_type_id=6 THEN  (b.agnt_blnce_at - a.trnsn_at) WHEN (a.trnsn_type_id=7 or a.trnsn_type_id=1000009) THEN  (b.agnt_blnce_at + a.trnsn_at) END as upd_agnt_bal
    from 
    (SELECT trnsn_id, trnsn_at, trnsn_type_id  FROM agnt_trnsn_dtl_t WHERE trnsn_id = (SELECT MAX(trnsn_id) FROM agnt_trnsn_dtl_t WHERE agnt_id=${agnt_id})) a,
    (select  agnt_blnce_at FROM  agnt_trnsn_dtl_t WHERE trnsn_id<(SELECT MAX(trnsn_id) FROM agnt_trnsn_dtl_t WHERE agnt_id=${agnt_id}) and agnt_id=${agnt_id} order by trnsn_id desc limit 1) b`;
    

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : updateAgntTrnsTblMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateAgntTrnsTblMdl = function (agnt_id,trnsn_id,agnt_blnce_at, user) {
    var fnm = "updateAgntTrnsTblMdl"

    var QRY_TO_EXEC = `UPDATE agnt_trnsn_dtl_t
    SET agnt_blnce_at=${agnt_blnce_at}, rjctd_in=NULL
    WHERE
    agnt_id=${agnt_id} AND trnsn_id=${trnsn_id}`;
    
    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updateAgntLstTblMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateAgntLstTblMdl = function (agnt_id,agnt_blnce_at, user) {
    var fnm="updateAgntLstTblMdl"

    var QRY_TO_EXEC = `UPDATE agnt_lst_t
    SET agnt_blnce_at=${agnt_blnce_at}
    WHERE
    agnt_id=${agnt_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getRevenueShrngDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRevenueShrngDtlsMdl = function (data,user) {
    var fnm = "getRevenueShrngDtlsMdl"
    if (data.district_id == 0) {
        districtId = ``
    }
    if (data.district_id > 0) {
        districtId = `and c.instl_dstrct_id = ${data.district_id}`
    }
    if (data.caf_type_id == 0) {
        caftypeId = ``
    }
    if (data.caf_type_id > 0) {
        caftypeId = `and c.caf_type_id =${data.caf_type_id}`
    }

    var QRY_TO_EXEC = `select 
    ROW_NUMBER() OVER (ORDER BY l.agnt_id) as s_no,c.instl_dstrct_id as dstrt_id,i.lmo_agnt_id as agnt_id,c.instl_mndl_id as mndl_nu
    ,l.agnt_cd as LMO_CODE,i.invce_mm as invoice_month
    ,m.agnt_cd as MSO_CODE
    ,upper(l.agnt_nm) as NETWORK_NAME
    ,l.ofce_cntct_nm as lmo_contact
    ,l.ofce_mbl_nu as lmo_mble_nu
    ,d.dstrt_nm 
    ,v.vlge_nm 
    ,i.invce_yr
    ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm
    ,count(distinct i.caf_id ) as TOTAL_CAF_COUNT
    ,format(sum(id.lmo_shre_at),2) as lmo_shre_at
    ,format(sum(id.mso_shre_at),2) as mso_shre_at
    ,format(sum(id.apsfl_shre_at),2) as apsfl_shre_at
    ,l.agnt_blnce_at as CURRENT_LMO_BALANCE_AT
    ,count(distinct c.lmo_agnt_id ) as LMO_CT
    ,count(distinct c.mso_agnt_id ) as MSO_CT
    ,format(sum(id.chrge_at)*1.18,2) as revanue_at
    ,format(sum(id.chrge_at)*1.18/count(distinct i.caf_id ),2) as connection_average_revanue 
    ,format(sum(case (id.chrge_cde_id ) WHEN 13 THEN id.chrge_at 
                            WHEN 14 THEN id.chrge_at
                            WHEN 16 THEN id.chrge_at
                            WHEN 27 THEN id.chrge_at
                            WHEN 28 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as voip_chrge_at
    ,format(sum(case (id.pckge_type_id ) WHEN 2 THEN id.chrge_at ELSE 0 END)*1.18,2) as add_on_chrge_at
    ,format(sum(case (id.chrge_cde_id ) WHEN 7 THEN id.chrge_at 
                            WHEN 6 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as box_rent
    ,format(sum(case (id.pckge_type_id ) WHEN 1 THEN id.chrge_at ELSE 0 END)*1.18,2) as base_package_chrge_at
    ,SUM(case when year(c.actvn_dt)=i.invce_yr AND month(c.actvn_dt)=i.invce_mm THEN 1 ELSE 0 END) as 'NEW_CAFS_INVOICED'
    ,SUM(case when year(c.trmnd_dt )=i.invce_yr AND month(c.trmnd_dt)=i.invce_mm THEN 1 ELSE 0 END) as 'TERMINATED_CAFS_INVOICED'
    ,sum(case(i.invce_at) WHEN 50 THEN 1 ELSE 0 END) as BOX_ONLY_INVOICED_CAFS
    ,sum(i.prtd_in) as PRORATED_BILL_CAFS
    ,count(distinct  case (id.chrge_cde_id ) WHEN 13 THEN i.caf_id 
                            WHEN 14 THEN i.caf_id 
                            WHEN 16 THEN i.caf_id 
                            WHEN 27 THEN i.caf_id 
                            WHEN 28 THEN i.caf_id 
                             ELSE 0 END) as voip_caf_ct
    ,SUM(case(c.caf_type_id) WHEN 1 THEN 1 ELSE 0 END) as 'INV_CAFS_INVOICED'
    ,SUM(case(c.caf_type_id) WHEN 2 THEN 1 ELSE 0 END) as 'ENT_CAFS_INVOICED'
    from erp_invce_lst_t i join erp_invce_dtl_t id 
    on i.caf_invce_id =id.caf_invce_id   
    join caf_dtl_t c on c.caf_id=i.caf_id ${districtId} ${caftypeId} 
    left join agnt_lst_t l on l.agnt_id=i.lmo_agnt_id 
    left join agnt_lst_t m on m.agnt_id=i.mso_agnt_id
    left join dstrt_lst_t d on d.dstrt_id =l.ofce_dstrt_id 
    left join vlge_lst_t v on l.ofce_vlge_id=v.vlge_id 
    where 1=1 and i.invce_yr=${data.year_id} and i.invce_mm=${data.mnth_id} AND i.pblsd_in=1
    and id.invce_yr =i.invce_yr and id.invce_mm=i.invce_mm
    group by i.lmo_agnt_id;`
    console.log('getRevenueSharingMdl -------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getRevenueShrngByLmoMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRevenueShrngByLmoMdl = function (data,user) {
    var fnm = "getRevenueShrngByLmoMdl"
    if(data.caf_type_id > 0){
        caftype=`and c.caf_type_id=${data.caf_type_id}`
    }
    else{
        caftype=``
    }

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY i.caf_invce_id) as 'Sno',i.lmo_agnt_id as agnt_id
    ,i.caf_invce_id as 'CAF Invoice Id',DATE_FORMAT(c.trmnd_ts, '%d-%m-%Y') as 'Termination Date',DATE_FORMAT(c.spnd_ts, '%d-%m-%Y') as 'Suspend Date',a.agnt_cd as 'LMO Code',en.sts_nm,ct.caf_type_nm
    ,c.caf_nu as 'CAF Number',cs.cstmr_nm as 'Customer Name',c.mbl_nu as 'Customer Mobile No',i.invce_yr as 'Invoice Year'
    ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as 'Invoice Month',i.invce_mm as invoice_mnth
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as 'Invoice From Date',DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as 'Invoice To Date'
    ,DATE_FORMAT(c.actvn_dt ,'%d-%m-%Y') as 'Activation Date',bf.frqncy_nm as 'Frequency Name'
     ,p.pckge_nm AS 'Base Package',CASE (i.pd_in) WHEN 1 THEN 'PAID' ELSE 'NOT PAID' END as 'Status',i.pd_ts as 'Paid Time Stamp'
     ,format(sum(id.lmo_shre_at),2) as 'LMO Share'
      ,format(sum(id.mso_shre_at),2) as 'MSO Share'
     ,format(sum(id.apsfl_shre_at),2) as 'APSFL Share'
    ,format(sum(id.chrge_at+id.cgst_at+id.sgst_at+id.srvc_at+id.swtch_at+id.ksn_at+id.entrn_at),2) as 'Invoice Amount'
    ,format(sum(case (id.chrge_cde_id ) WHEN 13 THEN id.chrge_at 
                            WHEN 14 THEN id.chrge_at
                            WHEN 16 THEN id.chrge_at
                            WHEN 27 THEN id.chrge_at
                            WHEN 28 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as 'VOIP Charge Amount'
    ,format(sum(case (id.pckge_type_id ) WHEN 2 THEN id.chrge_at ELSE 0 END)*1.18,2) as 'Add on Charge Amount'
    ,format(sum(case (id.chrge_cde_id ) WHEN 7 THEN id.chrge_at 
                            WHEN 6 THEN id.chrge_at
                             ELSE 0 END)*1.18,2) as 'Box Rent'
    ,format(sum(case (id.pckge_type_id ) WHEN 1 THEN id.chrge_at ELSE 0 END)*1.18,2) as 'Base Packages Charge Amount'
     ,cs.loc_dstrct_id as dstrt_id
	 ,i.spnd_dy_ct as SuspendDays,i.actve_dy_ct
	 #,(i.actve_dy_ct-i.spnd_dy_ct) as ActiveDays
	 ,(i.actve_dy_ct) as ActiveDays
	 ,en.sts_nm as 'Caf Status'
     ,ROUND(h.ttl_dwnld_ct/1024/1024/1024)  as DOWNLOAD_IN_GB,ROUND(h.ttl_upld_ct/1024/1024/1024) as UPLOAD_IN_GB,ROUND(h.ttl_dwnld_ct/1024/1024/1024) + ROUND(h.ttl_upld_ct/1024/1024/1024) as 'HSI USAGE (GB)'
    from erp_invce_lst_t i
    JOIN erp_invce_dtl_t id on i.caf_invce_id =id.caf_invce_id 
    JOIN caf_dtl_t c ON i.caf_id=c.caf_id 
    join caf_type_lst_t ct on ct.caf_type_id =c.caf_type_id
    LEFT JOIN BSS_BATCH.hsi_mnthly_usge_dtl_t h ON h.caf_id=c.caf_id AND i.invce_yr=h.yr_ct AND i.invce_mm=h.mnt_ct 
    JOIN cstmr_dtl_t cs ON cs.cstmr_id = i.cstmr_id 
    JOIN agnt_lst_t a ON a.agnt_id = i.lmo_agnt_id
	left join enty_sts_lst_t as en on en.enty_sts_id = c.enty_sts_id
    join blng_frqncy_lst_t bf on i.frqncy_id =bf.frqncy_id 
    LEFT JOIN pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
    where 1=1 and i.invce_yr='${data.invce_yr}' and i.invce_mm='${data.invoice_month}' AND i.pblsd_in=1
    and id.invce_yr = i.invce_yr and id.invce_mm = i.invce_mm 
    and c.instl_dstrct_id='${data.dstrt_id}' and i.lmo_agnt_id ='${data.agnt_id}' ${caftype}
    group by i.caf_invce_id;`;
    
    console.log("countssssssssssssssssssssssssssDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getRevenueShrngByLmoCstmrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getRevenueShrngByLmoCstmrMdl = function (data,user) {
    var fnm = "getRevenueShrngByLmoCstmrMdl"

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as 'Sno',p.pckge_nm as 'Package name',pt.pckage_type_nm as 'Package Type',cc.chrge_cde_dscn_tx as 'Charge Description Text',
    cc.chrge_cd as 'Charge Code'
    ,format(id.chrge_at,2) as 'Charge Amount',format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as 'Tax Amount'
    ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as 'Total Amount'
    from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
    LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
    LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
    where 1=1 and id.caf_invce_id =${data} order by p.pckge_id desc ,id.invce_dtl_id`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getMnthlyRevenueShrngByLmoMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMnthlyRevenueShrngByLmoMdl = function (data,user) {
    var fnm = "getMnthlyRevenueShrngByLmoMdl"
console.log(data);
    if (data.yearid == undefined) {
        year = `and invce_yr=YEAR(CURDATE())`
    }
    else {
        year = `and invce_yr=${data.yearid}`
    }
    var QRY_TO_EXEC = `select a.agnt_cd,count(DISTINCT e.caf_id) as cafcount,sum(e.apsfl_shre_at) as apsflshare,sum(e.mso_shre_at) as msoshare,sum(e.lmo_shre_at) as lmoshare,sum(invce_at+sgst_at+cgst_at+srvc_at) as total,invce_mm as monthid,invce_yr as year,
    (case when pd_in=0 then count(pd_in) else 0 end)  as 'NotPaid',
    (case when pd_in=1 then count(pd_in) else 0 end)  as 'Paid',
    (case when pd_in=0 then 'Not Paid' else 'Paid' end)  as pd_sts,
    e.voip_chrge_at,e.add_on_chrge_at,
    (CASE WHEN prtd_in =1 then count(prtd_in) else 0 end) as pro_rted_caf_cnt,ofce_dstrt_id
    from erp_invce_lst_t as e
    left join agnt_lst_t as a on a.agnt_id=e.lmo_agnt_id
    where e.pblsd_in=1 and e.lmo_agnt_id=${data.agnt_id} ${year}
    GROUP BY invce_mm order by invce_mm`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : getagntPymntAprlDtlsMdl
* Description   : get payment approval details
* Arguments     : callback function
******************************************************************************/
exports.getagntPymntAprlDtlsMdl = (user) => {
    var fnm = "getagntPymntAprlDtlsMdl"

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY trnsn_id DESC) sno,trnsn_id,trnsn_at,adt.agnt_id,agnt_nm,agnt_cd,adt.trnsn_type_id,trnsn_type_nm,a.wlt_blnce_at,a.agnt_blnce_at,adt.pymnt_mde_id,pymnt_mde_nm,
                        DATE_FORMAT(trsn_dt,'%d-%m-%Y') AS trsn_dt,trns_ref_nu,cmnt_tx,trnsn_bnk_nm,t.trnsn_ctgry_id,atc.trnsn_ctgry_nm
                        FROM agnt_trnsn_dtl_t adt
                        JOIN agnt_lst_t a ON adt.agnt_id = a.agnt_id
                        JOIN agnt_trnsn_type_lst_t t ON t.trnsn_type_id = adt.trnsn_type_id
                        left JOIN agnt_trnsn_ctgry_lst_t atc on atc.trnsn_ctgry_id = t.trnsn_ctgry_id
                        LEFT JOIN agnt_pymnt_mde_lst_t p ON p.pymnt_mde_id = adt.pymnt_mde_id
                        WHERE mnl_upld_in=1 AND aprve_ts IS NULL AND adt.a_in=1 AND adt.rjctd_in IS NULL ORDER BY trsn_dt`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAgntPymntTdyMnthMdl
* Description   : Get total agent paid amount today and this month
* Arguments     : callback function
******************************************************************************/
exports.getAgntPymntTdyMnthMdl = (user) => {
    var fnm = "getAgntPymntTdyMnthMdl"

    var QRY_TO_EXEC = ` SELECT a.*,b.*,c.* FROM
                        (SELECT COUNT(agnt_id) AS tdy_pd_lmo,SUM(trnsn_at) AS tdy_pd_amt 
                        FROM agnt_trnsn_dtl_t a 
                        WHERE DATE(trsn_dt)=CURDATE() AND trnsn_type_id=6 AND a_in=1 AND aprve_ts IS NOT NULL) AS a
                        JOIN
                        (SELECT COUNT(agnt_id) AS crnt_mnth_pd_lmo,SUM(trnsn_at) AS crnt_mnth_pd_amt 
                        FROM agnt_trnsn_dtl_t a 
                        WHERE MONTH(trsn_dt) = MONTH(CURDATE()) AND trnsn_type_id=6 AND a_in=1 AND aprve_ts IS NOT NULL) AS b
                        JOIN
                        (SELECT COUNT(agnt_id) AS ystrdy_pd_lmo,SUM(trnsn_at) AS ystrdy_pd_amt 
                        FROM agnt_trnsn_dtl_t a 
                        WHERE DATE(trsn_dt)=CURDATE() - INTERVAL 1 DAY AND trnsn_type_id=6 AND a_in=1 AND aprve_ts IS NOT NULL) AS c;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAgntPymntsMnthlyMdl
* Description   : Get total agents paid amount month wise
* Arguments     : callback function
******************************************************************************/
exports.getAgntPymntsMnthlyMdl = (user) => {
    var fnm = "getAgntPymntsMnthlyMdl"

    var QRY_TO_EXEC = ` SELECT MONTH(trsn_dt) AS mnth_nu,mnth_nm,YEAR(trsn_dt) as yr,DATE_FORMAT(trsn_dt,'%M-%y') AS dt,SUM(trnsn_at) AS tot_amt FROM
                        agnt_trnsn_dtl_t a
                        JOIN mnth_dtls_t m ON MONTH(a.trsn_dt) = m.mnth_id
                        WHERE
                        MONTH(trsn_dt) IS NOT NULL AND MONTH(trsn_dt) <> 0 AND YEAR(trsn_dt) = YEAR(CURDATE()) AND trnsn_type_id=6 AND a.a_in=1 AND aprve_ts IS NOT NULL
                        GROUP BY MONTH(trsn_dt)
                        ORDER BY MONTH(trsn_dt);`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAgntPymntsMnthDyWseMdl
* Description   : Get total agents paid amount month wise
* Arguments     : callback function
******************************************************************************/
exports.getAgntPymntsMnthDyWseMdl = (mnth_id,user) => {
    var fnm = "getAgntPymntsMnthDyWseMdl"

    var QRY_TO_EXEC = ` SELECT trsn_dt,DATE_FORMAT(trsn_dt,'%d-%m') AS dt,
                        SUM(CASE WHEN aprve_ts IS NOT NULL THEN trnsn_at ELSE 0 END) AS tot_dy_amt_aprvd,
                        SUM(CASE WHEN aprve_ts IS NULL THEN trnsn_at ELSE 0 END) AS tot_dy_amt_nt_aprvd,
                        SUM(trnsn_at) AS tot_dy_amt FROM
                        agnt_trnsn_dtl_t
                        WHERE
                        MONTH(trsn_dt) = ${mnth_id} AND YEAR(trsn_dt) = YEAR(CURDATE()) AND trnsn_type_id=6 AND a_in=1
                        GROUP BY DATE(trsn_dt)
                        ORDER BY DATE(trsn_dt)`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getAgntPymntBlnceTlDtMdl
* Description   : Get total agents balance amount till date
* Arguments     : callback function
******************************************************************************/
exports.getAgntPymntBlnceTlDtMdl = (user) => {
    var fnm = "getAgntPymntBlnceTlDtMdl"

    var QRY_TO_EXEC = ` SELECT atd.agnt_id,agnt_cd,agnt_nm,ofce_mbl_nu,agt.agnt_blnce_at AS tot_agnt_bal_amt FROM
                        agnt_lst_t agt
                        JOIN agnt_trnsn_dtl_t atd ON agt.agnt_id = atd.agnt_id
                        WHERE atd.a_in=1 AND agt.agnt_blnce_at IS NOT NULL
                        GROUP BY agt.agnt_id
                        ORDER BY agt.agnt_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPymntApdflShreDtlsMdl
* Description   : Get total apsfl share 
* Arguments     : callback function
******************************************************************************/
exports.getPymntApdflShreDtlsMdl = (user) => {
    var fnm = "getPymntApdflShreDtlsMdl"

    var QRY_TO_EXEC = ` select MONTHNAME(CURDATE() - interval 1 month) as mnth_nm,year(CURDATE() - interval 1 month) as yr,
                        sum(case when caf_type_id=1 then apsfl_shre_at else 0 end) as indvl_apsfl_shre,
                        sum(case when caf_type_id=2 then apsfl_shre_at else 0 end) as entrp_apsfl_shre
                        from
                        erp_invce_dtl_t
                        where invce_yr=YEAR(CURDATE() - interval 1 month) and invce_mm=MONTH(CURDATE() - interval 1 month);`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}