var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function       : planWiseDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.planWiseDataMdl = function (year,month,user) {
    var fnm = "planWiseDataMdl"

    var QRY_TO_EXEC = `select p.pckge_nm as PLAN_NAME,COUNT(i.caf_id) AS CAF_COUNT,SUM(i.apsfl_shre_at) as APSFL_SHARE,SUM(i.lmo_shre_at) as LMO_SHARE,SUM(i.mso_shre_at) as MSO_SHARE
    ,SUM(i.add_on_chrge_at) as Add_on_Charges, i.invce_yr as year, i.invce_mm as month  from erp_invce_lst_t i JOIN caf_dtl_t c ON i.caf_id=c.caf_id JOIN cstmr_dtl_t cs ON cs.cstmr_id = i.cstmr_id 
    JOIN agnt_lst_t a ON a.agnt_id = i.lmo_agnt_id LEFT JOIN pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
    where i.invce_yr=${year} and i.invce_mm=${month} AND i.pblsd_in=1 AND p.pckge_id IN (79,80,82,3000106,3000107) 
    group by p.pckge_id ORDER BY p.chrge_at 
    UNION ALL select 'TOTAL' as TOTAL,COUNT(i.caf_id) AS CAF_COUNT,SUM(i.apsfl_shre_at) as APSFL_SHARE,SUM(i.lmo_shre_at) as LMO_SHARE,SUM(i.mso_shre_at) as MSO_SHARE,
    SUM(i.add_on_chrge_at) as Add_on_Charges, i.invce_yr as year, i.invce_mm as month  from erp_invce_lst_t i JOIN caf_dtl_t c ON i.caf_id=c.caf_id JOIN cstmr_dtl_t cs ON cs.cstmr_id = i.cstmr_id 
    JOIN agnt_lst_t a ON a.agnt_id = i.lmo_agnt_id LEFT JOIN pckge_lst_t as p on p.pckge_id = i.bse_pckge_id
     where i.invce_yr=${year} and i.invce_mm=${month} AND i.pblsd_in=1 AND p.pckge_id IN (79,80,82,3000106,3000107);`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : get_AllCpeCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllCpeCountsMdl = function (data, user) {
    var fnm = "get_AllCpeCountsMdl"
    var dstrctCond = ``;
    if (data.dstrct_fltr == true) {
        if (data.slctdDstrct != null) {
            dstrctCond = `AND a.ofce_dstrt_id=${data.slctdDstrct}`;
        } else {
            dstrctCond = `AND a.ofce_dstrt_id=${user.hyrchy_grp_id}`;
        }
    }
    var QRY_TO_EXEC = `SELECT COUNT(*) as ttl_stp_bxs,
    SUM(CASE WHEN lmo_agnt_id  is NOT NULL  THEN 1 ELSE 0 END) as ttl_lmo_stp_bxs,
    SUM(CASE WHEN mso_agnt_id is NOT NULL AND lmo_agnt_id is NULL THEN 1 ELSE 0 END) as ttl_mso_stp_bxs,
    SUM(CASE WHEN mso_agnt_id is  NULL AND lmo_agnt_id is  NULL THEN 1 ELSE 0 END) as ttl_apsfl_stp_bxs
    FROM inv_stpbx_lst_t inv
    LEFT JOIN agnt_lst_t a ON inv.lmo_agnt_id = a.agnt_id
    WHERE inv.a_in = 1 and prdct_id=1 ${dstrctCond};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : get_AllAgentsCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllAgentsCountsMdl = function (data, user) {
    var fnm = "get_AllAgentsCountsMdl"
    var dstrctCond = ``;
    if (data.dstrct_fltr == true) {
        if (data.slctdDstrct != null) {
            dstrctCond = `WHERE ofce_dstrt_id=${data.slctdDstrct}`;
        } else {
            dstrctCond = `WHERE ofce_dstrt_id=${user.hyrchy_grp_id}`;
        }
    }
    var QRY_TO_EXEC = `select 
    sum(case when (agnt_ctgry_id = 3 || agnt_ctgry_id = 1) and onbrd_in=1 and aprvd_dt is not null  THEN 1 ELSE 0 END) as ttl_cnt,
    sum(case when agnt_ctgry_id = 3 and onbrd_in=1 and aprvd_dt is not null  THEN 1 ELSE 0 END) as mso_cnt,
    sum(case when agnt_ctgry_id = 3 and onbrd_in=0 and aprvd_dt is null THEN 1 ELSE 0 END) as ntonbrd_mso_cnt,
    sum(case when agnt_ctgry_id = 1 and onbrd_in=1 and aprvd_dt is not null THEN 1 ELSE 0 END) as lmo_cnt,
    sum(case when agnt_ctgry_id = 1 and onbrd_in=0 and aprvd_dt is null THEN 1 ELSE 0 END) as reg_lmo_cnt,
    sum(case when agnt_ctgry_id = 4 and agnt_ctgry_id = 6 and onbrd_in=1 THEN 1 ELSE 0 END) as apsfl_cnt
    from agnt_lst_t ${dstrctCond};`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : get_AllCafCountsMdl
* Description    : 
* Arguments      : callback function

*changes on : 15-02-2024 by durga (query changed)
******************************************************************************/
exports.get_AllCafCountsMdl = function (data, user) {
    var fnm = "get_AllCafCountsMdl"
    var dstrctCond = ``;
    if (data.dstrct_fltr == true) {
        if (data.slctdDstrct != null) {
            dstrctCond = `AND c.instl_dstrct_id=${data.slctdDstrct}`;
        } else {
            dstrctCond = `AND c.instl_dstrct_id=${user.hyrchy_grp_id}`;
        }

    }
    // var QRY_TO_EXEC = `select count(*) as ttl_cnt,
    // sum(case when c.caf_type_id = 1 THEN 1 ELSE 0 END) as ind_cnt,
    // sum(case when c.caf_type_id = 2 THEN 1 ELSE 0 END) as ent_cnt,
    // sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2  THEN 1 ELSE 0 END) as ent_priv_cnt,
    // sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1  THEN 1 ELSE 0 END) as ent_govt_cnt,
    // sum(case when c.caf_type_id = 2 and cd.entrpe_type_id is NULL  THEN 1 ELSE 0 END) as rmng_ent_govt_cnt
    // from caf_dtl_t as c
    // left join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    // where c.enty_sts_id in (6,7,84,85) ${dstrctCond};`;
	var QRY_TO_EXEC = `SELECT 
    
    (SUM(CASE WHEN c.caf_type_id = 1 THEN 1 ELSE 0 END)+ (SELECT COUNT(*) FROM caf_dtl_t WHERE caf_type_id = 2 AND enty_sts_id NOT IN (8))) as ttl_cnt,
    SUM(CASE WHEN c.caf_type_id = 1 THEN 1 ELSE 0 END) AS ind_cnt,
       (SELECT COUNT(*) FROM caf_dtl_t WHERE caf_type_id = 2 AND enty_sts_id NOT IN (8) ) as ent_cnt,
    (SELECT COUNT(*) FROM caf_dtl_t WHERE caf_type_id = 2 AND enty_sts_id NOT IN (8) AND apsfl_bbnl IN (3)) as bbnl,
    (SELECT COUNT(*) FROM caf_dtl_t WHERE caf_type_id = 2 AND enty_sts_id NOT IN (8) AND apsfl_bbnl IN (5)) as goi,
    (SELECT count(*) FROM caf_dtl_t WHERE caf_type_id = 2 AND enty_sts_id NOT IN (8) AND apsfl_bbnl IN (4)) As Others

    FROM 
    caf_dtl_t AS c
LEFT JOIN 
    cstmr_dtl_t AS cd ON cd.cstmr_id = c.cstmr_id
WHERE 
    c.enty_sts_id IN (6,7,84,85) ${dstrctCond};`
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};
/*****************************************************************************
* Function       : get_AllShareCountsCtrlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllShareCountsCtrlMdl = function (year, dstrt_id,user) {
    var fnm = "get_AllShareCountsCtrlMdl"
    var QRY_TO_EXEC = `select sum(apsfl_shre_at) as apsfl_shre,sum(mso_shre_at) as mso_shre, sum(lmo_shre_at) as lmo_shre from erp_invce_lst_t as e
    join caf_dtl_t as c on c.caf_id = e.caf_id
    where e.invce_yr = ${year} and e.pblsd_in=1 and c.instl_dstrct_id = ${dstrt_id};`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};
/*****************************************************************************
* Function       : get_AllShareCountsCtrlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllShareCountsMdl = function (year, dstrt_id, user) {
    var fnm = "get_AllShareCountsMdl"
    var dstrctCond = ``;
    if (dstrt_id == 0) {
        dstrctCond = `and c.instl_dstrct_id = ${user.hyrchy_grp_id}`;
    } else {
        dstrctCond = `and c.instl_dstrct_id = ${dstrt_id}`;
    }
    var QRY_TO_EXEC = `select invce_yr,invce_mm,count(*) as TOT_CAF
    ,SUM(case when (year(c.actvn_dt)=invce_yr AND month(c.actvn_dt)=invce_mm) THEN 1 ELSE 0 END) as NEW_CAFS
    ,SUM(case(c.caf_type_id) WHEN 1 THEN 1 ELSE 0 END) as 'INV_CAFS'
    ,SUM(case(c.caf_type_id) WHEN 2 THEN 1 ELSE 0 END) as 'ENT_CAFS'
    ,sum(invce_at+srvc_at+cgst_at+sgst_at) as TOTAL_INVOICE_AMOUNT
    ,sum(invce_at) as INVOICE_AMOUNT
    ,sum(srvc_at+cgst_at+sgst_at) as INVOICE_TAX
    ,sum(apsfl_shre_at) as APSFL_SHARE
    ,sum(lmo_shre_at) as LMO_SHARE 
    ,sum(mso_shre_at) as MSO_SHARE 
    ,count(distinct c.lmo_agnt_id ) as LMO_CT
    ,count(distinct c.mso_agnt_id ) as MSO_CT
    ,sum(case(invce_at) WHEN 50 THEN invce_at ELSE 0 END) as BOX_INVOICED_ONLY_AMOUNT
    ,sum(case(invce_at) WHEN 50 THEN 1 ELSE 0 END) as BOX_ONLY_INVOICED_CAFS
    ,sum(prtd_in) as PRORATED_BILL_CAFS
    ,sum(voip_chrge_at) as VOIP_INVOICED
    ,sum(add_on_chrge_at) as ADDONS_INVOICED
    from erp_invce_lst_t i 
    left join  caf_dtl_t c on i.caf_id =c.caf_id 
    where invce_yr = ${year} ${dstrctCond} and i.pblsd_in=1
    group by invce_yr,invce_mm
    order by invce_yr,invce_mm
    ;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};
/*****************************************************************************
* Function       : get_AllShareMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllShareMdl = function (year,user) {
    var fnm = "get_AllShareMdl"
    var QRY_TO_EXEC = `select A.*,B.*
    FROM (select invce_yr,invce_mm,count(*)
    
     as TOT_CAFS_INVOICED
    ,SUM(case(c.caf_type_id) WHEN 1 THEN 1 ELSE 0 END) as 'INV_CAFS_INVOICED'
    ,SUM(case(c.caf_type_id) WHEN 2 THEN 1 ELSE 0 END) as 'ENT_CAFS_INVOICED'
    ,SUM(case when year(c.actvn_dt)=invce_yr AND month(c.actvn_dt)=invce_mm THEN 1 ELSE 0 END) as 'NEW_CAFS_INVOICED'
    ,sum(invce_at+srvc_at+cgst_at+sgst_at) as TOTAL_INVOICE_AMOUNT
    ,sum(invce_at) as INVOICE_AMOUNT
    ,sum(srvc_at+cgst_at+sgst_at) as INVOICE_TAX
    ,sum(i.apsfl_shre_at) as APSFL_SHARE
    ,sum(i.lmo_shre_at) as LMO_SHARE
    ,sum(i.mso_shre_at) as MSO_SHARE
    ,count(distinct c.lmo_agnt_id ) as LMO_CT
    ,count(distinct c.mso_agnt_id ) as MSO_CT
    ,sum(case(invce_at) WHEN 50 THEN invce_at ELSE 0 END) as BOX_INVOICED_ONLY_AMOUNT
    ,sum(case(invce_at) WHEN 50 THEN 1 ELSE 0 END) as BOX_ONLY_INVOICED_CAFS
    ,sum(prtd_in) as PRORATED_BILL_CAFS
    ,sum(i.voip_chrge_at) as VOIP_INVOICED
    ,sum(i.add_on_chrge_at) as ADDONS_INVOICED
    from erp_invce_lst_t i
     join caf_dtl_t c on i.caf_id =c.caf_id
    where invce_yr = ${year} and i.pblsd_in=1
    group by invce_yr,invce_mm
    order by invce_yr,invce_mm) A
    left join( select oprtn_yr,oprtn_mm,sum(spnd_caf_ct) as SUSPENDED_CT,sum(rsmed_caf_ct) as RESUMED_CT,sum(nw_caf_ct) as NEW_CAF_CT,sum(trmnd_caf_ct) as TERMINATED_CT,sum(box_chnge_ct) as BOX_CHANGE,sum(pon_chnge_ct) as PON_CHANGE 
    from lmo_oprtn_mnthly_dtl_t
    where oprtn_yr=${year} 
    group by oprtn_yr,oprtn_mm ) B on A.invce_yr=B.oprtn_yr AND A.invce_mm=B.oprtn_mm order by A.invce_mm`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};

/*****************************************************************************
* Function       : getShareDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getShareDtlsMdl = function (year, dstrt_id, user) {
    var fnm = "getShareDtlsMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY l.agnt_id) as s_no,m.agnt_cd as 'MSO Code',l.agnt_cd as 'LMO Code'
    ,COUNT(c.caf_id) as CAF_Count,l.agnt_id,l.agnt_nm as lmo_agnt_nm,m.agnt_nm as mso_agnt_nm
    ,SUM(CASE WHEN e.pd_in = 1 THEN 1 ELSE 0 END) as Paid_Count,SUM(CASE WHEN e.pd_in = 0 THEN 1 ELSE 0 END) as Not_Paid_Count
    ,invce_yr as invce_yr,invce_mm as Invoice_Month,sum(e.mso_shre_at) as MSO_Share,sum(e.lmo_shre_at) as LMO_Share,sum(e.apsfl_shre_at) as APSFL_Share
    from erp_invce_lst_t e
    JOIN agnt_lst_t l ON l.agnt_id = e.lmo_agnt_id AND e.invce_yr = ${year} 
    LEFT JOIN agnt_lst_t m ON m.agnt_id = e.mso_agnt_id
    JOIN cstmr_dtl_t cs ON cs.cstmr_id = e.cstmr_id AND cs.agnt_id = l.agnt_id AND cs.loc_dstrct_id = ${dstrt_id}
    JOIN caf_dtl_t c ON c.cstmr_id = e.cstmr_id
    WHERE e.pblsd_in=1
    GROUP BY l.agnt_id
    ORDER BY invce_yr,invce_mm;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getCafCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCafCntsMdl = function (year, user) {
    var fnm = "getCafCntsMdl"
    var QRY_TO_EXEC = [`select MONTH(c.actvn_dt) as mnth_nm,YEAR(c.actvn_dt) as year, count(*) as ttl_cafs, 
    sum( CASE WHEN  c.actvn_dt=${year} THEN 1 ELSE 0 END  ) as caf_provi, 
    sum( CASE WHEN  trmnd_in=1 and YEAR(c.trmnd_ts)=${year} THEN 1 ELSE 0 END  ) as ttl_trmntd
    ,SUM(case(c.caf_type_id) WHEN 1 THEN 1 ELSE 0 END) as 'INV_CAFS'
    ,SUM(case(c.caf_type_id) WHEN 2 THEN 1 ELSE 0 END) as 'ENT_CAFS'
    from caf_dtl_t as c
    LEFT JOIN enty_sts_lst_t s on s.enty_sts_id = c.enty_sts_id
     
    WHERE YEAR(c.actvn_dt) = ${year}
    GROUP  BY YEAR(c.actvn_dt), MONTH(c.actvn_dt)
    ORDER BY MONTH(c.actvn_dt)`, `SELECT ROW_NUMBER() OVER ( ORDER BY m.mnth_id) as sno,m.mnth_nm,m.mnth_id, a.*  From mnth_dtls_t m
    left JOIN (select MONTH(spnd_dt) as mnth_nm, YEAR(spnd_dt) as year, count(*) as ttl_sus_cafs from  caf_spnd_dtl_t 
       WHERE YEAR(spnd_dt) = ${year}
        GROUP  BY YEAR(spnd_dt), MONTH(spnd_dt)
        ORDER BY MONTH(spnd_dt)) as a on a.mnth_nm = m.mnth_id
    ORDER BY m.mnth_id`];
    // console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getCafLst7DayCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCafLst7DayCntsMdl = function (user) {
    var fnm = "getCafLst7DayCntsMdl"
    var QRY_TO_EXEC = ` SELECT DATE_FORMAT(oprn_dt,'%d-%m') AS oprn_dt,
                        (entre_caf_prvsn_ct+indvl_caf_prvsn_ct) AS tot_caf_prv_ct,
                        (entre_caf_spntn_ct+indvl_caf_spntn_ct) AS tot_caf_spnd_ct,
                        (entre_caf_rsme_ct+indvl_caf_rsme_ct) AS tot_caf_rsme_ct,
                        (entre_caf_trmn_ct+indvl_caf_trmn_ct) AS tot_caf_trmd_ct,
                        bx_chnge_ct,
                        pn_change_ct
                        FROM bss_oprtn_dly_dtl_t
                        WHERE 
                        oprn_dt BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() - INTERVAL 1 DAY
                        ORDER BY oprn_dt DESC`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getCafTdyCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCafTdyCntsMdl = function (user) {
    var fnm = "getCafTdyCntsMdl"
    var QRY_TO_EXEC = ` SELECT DATE_FORMAT(oprn_dt,'%d-%m-%Y') AS oprn_dt,entre_caf_prvsn_ct,indvl_caf_prvsn_ct,
                        (entre_caf_prvsn_ct+indvl_caf_prvsn_ct) AS tot_caf_prv_ct,
                        entre_caf_spntn_ct,indvl_caf_spntn_ct,
                        (entre_caf_spntn_ct+indvl_caf_spntn_ct) AS tot_caf_spnd_ct,
                        entre_caf_rsme_ct,indvl_caf_rsme_ct,
                        (entre_caf_rsme_ct+indvl_caf_rsme_ct) AS tot_caf_rsme_ct,
                        entre_caf_trmn_ct,indvl_caf_trmn_ct,
                        (entre_caf_trmn_ct+indvl_caf_trmn_ct) AS tot_caf_trmd_ct,
                        bx_chnge_ct,
                        pn_change_ct,addon_iptv_prchs_ct,addon_hsi_prchs_ct,
                        incmng_cals_ct,otgng_cals_ct,in_ntwrk_cals_ct,local_cals_ct,std_cals_ct,isd_cals_ct
                        FROM bss_oprtn_dly_dtl_t
                        WHERE 
                        oprn_dt = CURDATE()
                        ORDER BY oprn_dt DESC`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getCrntPrvsMnthCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCrntPrvsMnthCntsMdl = function (user) {
    var fnm = "getCrntPrvsMnthCntsMdl"
    var QRY_TO_EXEC = ` SELECT a.*,b.*
                        FROM
                        (SELECT MONTHNAME(CURDATE() - INTERVAL 1 MONTH) as lst_mnth_nm,YEAR(CURDATE() - INTERVAL 1 MONTH) as lst_year,
                        SUM(entre_caf_prvsn_ct+indvl_caf_prvsn_ct) AS lst_mnth_tot_caf_prv_ct,
                        SUM(entre_caf_spntn_ct+indvl_caf_spntn_ct) AS lst_mnth_tot_caf_spnd_ct,
                        SUM(entre_caf_rsme_ct+indvl_caf_rsme_ct) AS lst_mnth_tot_caf_rsme_ct,
                        SUM(entre_caf_trmn_ct+indvl_caf_trmn_ct) AS lst_mnth_tot_caf_trmd_ct,
                        SUM(bx_chnge_ct) AS lst_mnth_tot_bx_chnge_ct,
                        SUM(pn_change_ct) AS lst_mnth_tot_pn_change_ct,
                        SUM(bx_chnge_ct+pn_change_ct) AS lst_mnth_tot_caf_oprnts,
                        SUM(addon_iptv_prchs_ct+addon_hsi_prchs_ct) AS lst_mnth_tot_add_pckgs,
                        SUM(incmng_cals_ct+otgng_cals_ct+in_ntwrk_cals_ct+local_cals_ct+std_cals_ct+isd_cals_ct) AS lst_mnth_tot_voip_cls
                        FROM bss_oprtn_dly_dtl_t
                        WHERE 
                        MONTH(oprn_dt) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND YEAR(oprn_dt)=YEAR(CURDATE()- INTERVAL 1 MONTH)) AS a
                        JOIN
                        (SELECT MONTHNAME(CURDATE()) as crt_mnth_nm,YEAR(CURDATE() ) as crnt_year,
                        SUM(entre_caf_prvsn_ct+indvl_caf_prvsn_ct) AS crt_mnth_tot_caf_prv_ct,
                        SUM(entre_caf_spntn_ct+indvl_caf_spntn_ct) AS crt_mnth_tot_caf_spnd_ct,
                        SUM(entre_caf_rsme_ct+indvl_caf_rsme_ct) AS crt_mnth_tot_caf_rsme_ct,
                        SUM(entre_caf_trmn_ct+indvl_caf_trmn_ct) AS crt_mnth_tot_caf_trmd_ct,
                        SUM(bx_chnge_ct) AS crt_mnth_tot_bx_chnge_ct,
                        SUM(pn_change_ct) AS crt_mnth_tot_pn_change_ct,
                        SUM(bx_chnge_ct+pn_change_ct) AS crt_mnth_tot_caf_oprnts,
                        SUM(addon_iptv_prchs_ct+addon_hsi_prchs_ct) AS crt_mnth_tot_add_pckgs,
                        SUM(incmng_cals_ct+otgng_cals_ct+in_ntwrk_cals_ct+local_cals_ct+std_cals_ct+isd_cals_ct) AS crt_mnth_tot_voip_cls
                        FROM bss_oprtn_dly_dtl_t
                        WHERE 
                        MONTH(oprn_dt) = MONTH(CURDATE()) AND YEAR(oprn_dt)=YEAR(CURDATE())) AS b`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_AllLmoCafCountsCtrlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllLmoCafCountsMdl = function (id, user) {
    var fnm = "get_AllLmoCafCountsMdl"
    var QRY_TO_EXEC = `select count(*) as ttl_cnt,
    sum(case when c.caf_type_id = 1 THEN 1 ELSE 0 END) as ind_cnt,
    sum(case when c.caf_type_id = 2 THEN 1 ELSE 0 END) as ent_cnt,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2  THEN 1 ELSE 0 END) as ent_priv_cnt,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1  THEN 1 ELSE 0 END) as ent_govt_cnt,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id is NULL  THEN 1 ELSE 0 END) as rmng_ent_govt_cnt
    from caf_dtl_t as c
    left join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    where c.enty_sts_id in (6,7,84,85) and c.lmo_agnt_id=${id};`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_getlmoprepaiddataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_getlmoprepaiddataMdl = function (id, user) {
    var fnm = "get_getlmoprepaiddataMdl"
    var QRY_TO_EXEC = `select * from prepaid_agnt_kyc_dcmnt_lst_t where agnt_id=${id};`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : postlmoprepaiddataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.postlmoprepaiddataMdl = function (data, user) {
    var fnm = "postlmoprepaiddataMdl"
    var QRY_TO_EXEC = `select p.* from prepaid_agnt_kyc_dcmnt_lst_t as p
    join mrcht_usr_lst_t as m on m.usr_ctgry_ky=p.agnt_id where m.mrcht_usr_nm='${data.lmo_code}';`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_AllLmoCpeCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllLmoCpeCountsMdl = function (id, user) {
    var fnm = "get_AllLmoCpeCountsMdl"
    var QRY_TO_EXEC = `SELECT COUNT(*) as ttl_stp_bxs,
    SUM(CASE WHEN caf_id  is NOT NULL  THEN 1 ELSE 0 END) as ttl_caf_stp_bxs,
    SUM(CASE WHEN caf_id is NULL THEN 1 ELSE 0 END) as ttl_aval_stp_bxs
    FROM inv_stpbx_lst_t
    WHERE a_in = 1 and lmo_agnt_id = ${id};`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getCafLst6MnthsCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCafLst6MnthsCntsMdl = function (id, user) {
    var fnm = "getCafLst6MnthsCntsMdl"
    var QRY_TO_EXEC = `select lmo_agnt_id,oprtn_yr,oprtn_mm,sum(spnd_caf_ct) as SUSPENDED_CT,sum(rsmed_caf_ct) as RESUMED_CT,
    sum(nw_caf_ct) as NEW_CAF_CT,sum(trmnd_caf_ct) as TERMINATED_CT,sum(box_chnge_ct) as BOX_CHANGE,
    sum(pon_chnge_ct) as PON_CHANGE , DATE_FORMAT(CONCAT(oprtn_yr, '-', oprtn_mm, '-', '1'), '%Y-%m-%d') as dt, m.mnth_nm
        from lmo_oprtn_mnthly_dtl_t
join mnth_dtls_t as m on m.mnth_id=oprtn_mm
        where  lmo_agnt_id = ${id} AND
        DATE_FORMAT(CONCAT(oprtn_yr, '-', oprtn_mm, '-', '1'), '%Y-%m-%d')  >=
        DATE_SUB(DATE_FORMAT(CONCAT(YEAR(CURRENT_DATE()), '-', MONTH(CURRENT_DATE()), '-', '1'), '%Y-%m-%d'), INTERVAL 6 MONTH)
group by oprtn_yr,oprtn_mm 
order by oprtn_yr,oprtn_mm;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getCafMnthCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCafMnthCntsMdl = function (id, user) {
    var fnm = "getCafMnthCntsMdl"
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var prvmonth = d.getMonth();
    var QRY_TO_EXEC = `select lmo_agnt_id,oprtn_yr,oprtn_mm,sum(spnd_caf_ct) as SUSPENDED_CT,sum(rsmed_caf_ct) as RESUMED_CT,
    sum(nw_caf_ct) as NEW_CAF_CT,sum(trmnd_caf_ct) as TERMINATED_CT,sum(box_chnge_ct) as BOX_CHANGE,
    sum(pon_chnge_ct) as PON_CHANGE , DATE_FORMAT(CONCAT(oprtn_yr, '-', oprtn_mm, '-', '1'), '%Y-%m-%d') as dt, m.mnth_nm
        from lmo_oprtn_mnthly_dtl_t
join mnth_dtls_t as m on m.mnth_id=oprtn_mm
        where  lmo_agnt_id = ${id} AND (oprtn_mm=${month} or oprtn_mm=${prvmonth}) and oprtn_yr=${year}              
        group by oprtn_yr,oprtn_mm
    order by oprtn_yr,oprtn_mm desc;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_OltCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_OltCountsMdl = function (user) {
    var fnm = "get_OltCountsMdl"
    var QRY_TO_EXEC = `SELECT count(*)
    as total,SUM(CASE WHEN oprtnl_ste_id = 1 THEN 1 ELSE 0 END ) as active,
   SUM(CASE WHEN oprtnl_ste_id <> 1 THEN 1 ELSE 0 END ) as inactive FROM
   (SELECT 
   c.olt_id,
   COUNT(*)
    as ttl_cafs,
   t.oprtnl_ste_id,
   (CASE WHEN t.oprtnl_ste_id=1 THEN 'Actvie OLT' else 'InActvie OLT' END) as olt_sts
   FROM caf_dtl_t  c
   JOIN olt_ltrck_dtl_t t on t.olt_id = c.olt_id
   GROUP BY c.olt_id) as a ;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_OltCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_OltHourlCountsMdl = function (user) {
    var fnm = "get_OltHourlCountsMdl"
    var QRY_TO_EXEC = `SELECT 
    SUM(CASE WHEN respond_delay < 1 THEN 1 ELSE 0 END ) as 'one_hr',
    SUM(CASE WHEN respond_delay < 3 AND  respond_delay < 1 THEN 1 ELSE 0 END ) as 'three_hr',
    SUM(CASE WHEN respond_delay >= 12 AND respond_delay < 24 THEN 1 ELSE 0 END ) as 'twelve_hr',
    SUM(CASE WHEN respond_delay >= 24 THEN 1 ELSE 0 END ) as 'twntfur_hr' 
from     
(SELECT c.olt_id,oprtnl_ste_chnge_ts,oprtnl_ste_id,COUNT(*) as ttl_cafs,
TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) as respond_delay
    FROM caf_dtl_t c
    JOIN olt_ltrck_dtl_t t on t.olt_id = c.olt_id 
    WHERE oprtnl_ste_id <> 1
		GROUP BY c.olt_id
ORDER BY oprtnl_ste_chnge_ts
) as a;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_OntCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_OntCountsMdl = function (user) {
    var fnm= "get_OntCountsMdl"
    var QRY_TO_EXEC = `
    select 
    count(*) as total,
    sum(CASE WHEN ot.oprtnl_ste_id=1 THEN 1 else 0 END) as active,
    sum(CASE WHEN ot.oprtnl_ste_id<>1 and c.caf_type_id = 2 THEN 1 else 0 END) as entr_inactive,
   sum(CASE WHEN ot.oprtnl_ste_id<>1 and c.caf_type_id = 1 THEN 1 else 0 END) as indv_inactive
    
    from olt_ltrck_dtl_t ot
    join caf_dtl_t c on c.olt_id = ot.olt_id
    
    where c.enty_sts_id = 6;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_OltCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_OntHourlCountsMdl = function (user) {
    var fnm = "get_OntHourlCountsMdl"
    var QRY_TO_EXEC = `SELECT 
    SUM(CASE WHEN TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 1 THEN 1 ELSE 0 END ) as 'one_hr',
    SUM(CASE WHEN TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 3 AND TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) > 1 THEN 1 ELSE 0 END ) as 'three_hr',
    SUM(CASE WHEN TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) >= 12 AND TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) < 24 THEN 1 ELSE 0 END ) as 'twelve_hr',
    SUM(CASE WHEN TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) >= 24 THEN 1 ELSE 0 END ) as 'twntfur_hr' 

    FROM olt_ltrck_dtl_t ot
    join caf_dtl_t c on c.olt_id = ot.olt_id
    WHERE oprtnl_ste_id <> 1 and c.enty_sts_id = 6;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : getLmoStsCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getLmoStsCntsMdl = function (user) {
    var fnm = "getLmoStsCntsMdl"
    if (user.usr_ctgry_nm == 'MSO') {
        agntID = `cf.mso_agnt_id=${user.usr_ctgry_ky}`
    } else if (user.usr_ctgry_nm == 'LMO' || user.usr_ctgry_nm == 'LMO_Lineman') {
        agntID = `cf.lmo_agnt_id=${user.usr_ctgry_ky}`
    }

    var QRY_TO_EXEC = `SELECT
    format(COUNT(cf.enty_sts_id), 'NO') AS 'Total CAF Operations',
        format(COUNT(CASE
            WHEN cf.enty_sts_id = 6 THEN 1
            ELSE NULL
        END), 'NO') AS 'Active',
        format(COUNT(CASE
            WHEN cf.enty_sts_id = 1 THEN 1
            ELSE NULL
        END), 'NO') AS 'Pending Activations',
        format(COUNT(CASE
            WHEN cf.enty_sts_id = 7 THEN 1
            ELSE NULL
        END), 'NO') AS 'Suspended',
        format(COUNT(CASE
            WHEN cf.enty_sts_id = 8 THEN 1
            ELSE NULL
        END ), 'NO') AS 'Terminated',
        format(COUNT(CASE
            WHEN cf.enty_sts_id NOT IN (6 , 1, 7, 8) THEN 1
            ELSE NULL
        END ), 'NO') AS 'Others'
FROM
    caf_dtl_t cf
JOIN enty_sts_lst_t e ON e.enty_sts_id = cf.enty_sts_id
WHERE
    ${agntID}`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getLmoVoipDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getLmoVoipDtlsMdl = function (id, user) {
    var fnm = "getLmoVoipDtlsMdl"
    console.log('getLmoVoipDtlsMdl ______________________________________');
    var QRY_TO_EXEC = `select count(*) as caf_cnt,c.caf_id,c.crnt_pln_id, cs.cre_srvce_cd, st.srvcpk_type_nm, sum(i.voip_chrge_at) as caf_ntPd_amnt
    from caf_dtl_t  as c
    JOIN pckge_lst_t  p on p.pckge_id = c.crnt_pln_id
    join pckge_srvcpk_rel_t ps on ps.pckge_id = p.pckge_id
    join pckge_srvcpk_lst_t s on s.srvcpk_id = ps.srvcpk_id
    join cre_srvce_lst_t cs on cs.cre_srvce_id = ps.cre_srvce_id
    join pckge_srvcpk_type_lst_t st on st.srvcpk_type_id = s.srvcpk_type_id
    join erp_invce_lst_t i on i.caf_id = c.caf_id
    where ps.cre_srvce_id = 3 and i.lmo_agnt_id = ${id} and i.pd_in = 0`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getStsCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getStsCntsMdl = function (user) {
    var fnm = "getStsCntsMdl"
    var QRY_TO_EXEC = `SELECT
    format(COUNT(cf.enty_sts_id), 'NO') AS 'Total',
        format(COUNT(CASE
            WHEN cf.enty_sts_id = 6 THEN 1
            ELSE NULL
        END), 'NO') AS 'Active',
        format(COUNT(CASE
            WHEN cf.enty_sts_id = 1 THEN 1
            ELSE NULL
        END), 'NO') AS 'Pending Activation',
        format(COUNT(CASE
            WHEN cf.enty_sts_id = 7 THEN 1
            ELSE NULL
        END), 'NO') AS 'Suspend',
        format(COUNT(CASE
            WHEN cf.enty_sts_id = 8 THEN 1
            ELSE NULL
        END ), 'NO') AS 'Termination',
        format(COUNT(CASE
            WHEN cf.enty_sts_id NOT IN (6 , 1, 7, 8) THEN 1
            ELSE NULL
        END ), 'NO') AS 'Other'
FROM
    caf_dtl_t cf
JOIN enty_sts_lst_t e ON e.enty_sts_id = cf.enty_sts_id`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_LiveTvWatchCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_LiveTvWatchCntMdl = function (user) {
    var fnm = "get_LiveTvWatchCntMdl"
    var QRY_TO_EXEC = `select * from iptv_dbrd_dtl_t 
    ORDER BY i_ts DESC limit 1;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_VoipCallCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_VoipCallCntMdl = function (user) {
    var fnm= "get_VoipCallCntMdl"
    var QRY_TO_EXEC = `select incmng_cals_ct,otgng_cals_ct from bss_oprtn_dly_dtl_t 
    where oprn_dt=CURRENT_DATE();`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_distrctWseOltsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_distrctWseOltsMdl = function (dstid, user) {
    var fnm = "get_distrctWseOltsMdl"
    var dstrctid = ``
    if (dstid > 0) {
        dstrctid = `and od.dstrt_id=${dstid}`
    }
    else {
        dstrctid = ``
    }
    /*var QRY_TO_EXEC = `select a.olt_id,a.olt_nm,a.oprtnl_ste_id,(case when oprtnl_ste_id =1 then 0 else respond_delay end) as hr,DATE_FORMAT(oprtnl_ste_chnge_ts,'%d-%m-%Y') AS down_time,
    (case when a.ste_nm="Unnkown" then 'Down' else a.ste_nm end)  as ste_nm,
    a.oprtnl_ste_chnge_ts,a.olt_sts_id,a.sts_nm,a.oprnl_sts_chnge_ts,a.lst_rfrh_ts,a.type_id,a.instl_dt,a.sftwe_vrsn_tx,
        a.hrdwe_vrsn_tx,a.site_nm,a.mngmt_dmn_nm,a.eqpmt_id,a.olt_type_id,a.olt_type_nm,a.olt_ip_addr_tx,a.olt_srl_nu,a.pop_id,a.olt_lble_nu,a.olt_acs_nde_id,a.sbstn_id,
        a.sbstn_nm,a.sbstn_unq_cd,a.dstrt_id,a.dstrt_nm,a.mndl_id,a.oprtnl_ste_orgn_ts,a.oprtnl_sts_orgn_ts,a.ste_dt,a.sts_dt,a.mble1_ph,a.cntct_nm,a.cmnt_tx,
        a.olt_iss_ctgry_nm,a.olt_iss_sub_ctgry_nm,a.mndl_nm,a.dwnDateTime,a.updtDateTime,a.hour,a.minute,a.hrandminute,a.olt_outage_id,a.cafcount,a.createuser,a.updateuser,a.actualHrsAndMinuts,a.updatecommentdate,
        ROUND((((substring(a.actualHrsAndMinuts,1,2) * 3600 + substring(a.actualHrsAndMinuts, 4,2) * 60 + substring(a.actualHrsAndMinuts, 7,2))*100)/86400),2) as upPrntge
         from
    (select od.olt_id,od.olt_nm,TIMESTAMPDIFF(hour, od.oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) as respond_delay,od.oprtnl_ste_id,op.ste_nm,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts,
    od.olt_sts_id,ot.sts_nm,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as oprnl_sts_chnge_ts,DATE_FORMAT(od.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,od.type_id,od.instl_dt,od.sftwe_vrsn_tx,
        od.hrdwe_vrsn_tx,od.site_nm,od.mngmt_dmn_nm,od.eqpmt_id,od.olt_type_id,od.olt_type_nm,od.olt_ip_addr_tx,od.olt_srl_nu,od.pop_id,od.olt_lble_nu,od.olt_acs_nde_id,od.sbstn_id,
        od.sbstn_nm,od.sbstn_unq_cd,od.dstrt_id,d.dstrt_nm,od.mndl_id,od.oprtnl_ste_chnge_ts as oprtnl_ste_orgn_ts,od.oprnl_sts_chnge_ts as oprtnl_sts_orgn_ts,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d-%m-%Y') as ste_dt,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d-%m-%Y') as sts_dt,ct.mble1_ph,ct.cntct_nm
        ,ud.cmnt_tx,ic.olt_iss_ctgry_nm,isc.olt_iss_sub_ctgry_nm,m.mndl_nm,DATE_FORMAT(max(sh.oprtnl_ste_strt_ts) ,'%d-%m-%Y %H:%i:%s') as dwnDateTime,DATE_FORMAT(max(sh.oprtnl_ste_end_ts) ,'%d-%m-%Y %H:%i:%s') as updtDateTime,
        TIMESTAMPDIFF(hour,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)) as hour,TIMESTAMPDIFF(Minute,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)) as minute,
        CONCAT(TIMESTAMPDIFF(hour,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)),":",TIMESTAMPDIFF(Minute,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts))) as hrandminute,
        ud.olt_outage_id,count(DISTINCT c.caf_id) as cafcount,usc.mrcht_usr_nm as createuser,usu.mrcht_usr_nm as updateuser,time_format(timediff(max(sh.oprtnl_ste_end_ts), max(sh.oprtnl_ste_strt_ts)),'%H:%i:%s') as  actualHrsAndMinuts ,
        (case when max(ur.i_ts)>max(ud.i_ts) then DATE_FORMAT(max(ur.i_ts) ,'%d-%m-%Y %H:%i:%s') else DATE_FORMAT(max(ud.i_ts) ,'%d-%m-%Y %H:%i:%s') end) as updatecommentdate
         from olt_ltrck_dtl_t od
        join caf_dtl_t c on c.olt_id = od.olt_id
        join dstrt_lst_t d on d.dstrt_id = od.dstrt_id
        JOIN mndl_lst_t m ON m.mndl_nu = od.mndl_id AND od.dstrt_id = m.dstrt_id
        join agro_olt_oprtnl_ste_lst_t op on op.agro_oprtnl_ste_id = od.oprtnl_ste_id
        join agro_olt_sts_lst_t ot on ot.agro_sts_id = od.olt_sts_id
        join cntct_lst_t ct on ct.dstrct_id = od.dstrt_id
        left join olt_outage_dtl_t ud on ud.olt_id = od.olt_id 
        left join olt_outage_rel_t ur on ur.i_ts = ud.u_ts 
        left join mrcht_usr_lst_t as usc on usc.mrcht_usr_id=ud.crte_usr_id
        left join mrcht_usr_lst_t as usu on usu.mrcht_usr_id=ud.updte_usr_id 
        left join olt_iss_ctgry_lst_t ic on ic.olt_iss_ctgry_id = ud.olt_iss_ctgry_id 
        left join olt_iss_sub_ctgry_lst_t isc on isc.olt_iss_sub_ctgry_id = ud.olt_iss_sub_ctgry_id 
        left join olt_oprnl_ste_hst_t sh on sh.olt_id = od.olt_id and sh.oprtnl_ste_id in (2,3,4) and sh.oprtnl_ste_end_ts is not null
        where  ct.cntct_ctgry_id=1 and od.a_in=1 ${dstrctid}
        GROUP BY od.olt_id
        ORDER BY max(sh.oprtnl_ste_strt_ts) desc) as a;`;*/
	var QRY_TO_EXEC = `select od.olt_id,od.olt_nm,TIMESTAMPDIFF(hour, od.oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) as respond_delay,od.oprtnl_ste_id,(case when od.oprtnl_ste_id =1 then 0 else TIMESTAMPDIFF(hour, od.oprtnl_ste_chnge_ts,
        CURRENT_TIMESTAMP()) end) as hr,
            DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d-%m-%Y') AS down_time,(case when op.ste_nm='Unnkown' then 'Down' else op.ste_nm end)  as ste_nm,
        DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts,
        od.olt_sts_id,ot.sts_nm,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as oprnl_sts_chnge_ts,DATE_FORMAT(od.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,od.type_id,od.instl_dt,od.sftwe_vrsn_tx,
        od.hrdwe_vrsn_tx,od.site_nm,od.mngmt_dmn_nm,od.eqpmt_id,od.olt_type_id,od.olt_type_nm,od.olt_ip_addr_tx,od.olt_srl_nu,od.pop_id,od.olt_lble_nu,od.olt_acs_nde_id,od.sbstn_id,
        od.sbstn_nm,od.sbstn_unq_cd,od.dstrt_id,d.dstrt_nm,od.mndl_id,od.oprtnl_ste_chnge_ts as oprtnl_ste_orgn_ts,od.oprnl_sts_chnge_ts as oprtnl_sts_orgn_ts,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d-%m-%Y') as ste_dt,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d-%m-%Y') as sts_dt,ct.mble1_ph,ct.cntct_nm
            ,ud.cmnt_tx,ic.olt_iss_ctgry_nm,isc.olt_iss_sub_ctgry_nm,m.mndl_nm,DATE_FORMAT(max(sh.oprtnl_ste_strt_ts) ,'%d-%m-%Y %H:%i:%s') as dwnDateTime,DATE_FORMAT(max(sh.oprtnl_ste_end_ts) ,'%d-%m-%Y %H:%i:%s') as updtDateTime,
            TIMESTAMPDIFF(hour,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)) as hour,TIMESTAMPDIFF(Minute,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)) as minute,
            CONCAT(TIMESTAMPDIFF(hour,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)),':',TIMESTAMPDIFF(Minute,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts))) as hrandminute,
            ud.olt_outage_id,count(DISTINCT c.caf_id) as cafcount,usc.mrcht_usr_nm as createuser,usu.mrcht_usr_nm as updateuser,time_format(timediff(max(sh.oprtnl_ste_end_ts), max(sh.oprtnl_ste_strt_ts)),'%H:%i:%s') as  actualHrsAndMinuts ,
            (case when max(ur.i_ts)>max(ud.i_ts) then DATE_FORMAT(max(ur.i_ts) ,'%d-%m-%Y %H:%i:%s') else DATE_FORMAT(max(ud.i_ts) ,'%d-%m-%Y %H:%i:%s') end) as updatecommentdate
            ,ROUND((((substring(time_format(timediff(max(sh.oprtnl_ste_end_ts), max(sh.oprtnl_ste_strt_ts)),'%H:%i:%s'),1,2) * 3600 + substring(time_format(timediff(max(sh.oprtnl_ste_end_ts), max(sh.oprtnl_ste_strt_ts)),'%H:%i:%s'), 4,2) * 60 + substring(time_format(timediff(max(sh.oprtnl_ste_end_ts), max(sh.oprtnl_ste_strt_ts)),'%H:%i:%s'), 7,2))*100)/86400),2) as upPrntge
        from olt_ltrck_dtl_t od
            join caf_dtl_t c on c.olt_id = od.olt_id
            join dstrt_lst_t d on d.dstrt_id = od.dstrt_id
            JOIN mndl_lst_t m ON m.mndl_nu = od.mndl_id AND od.dstrt_id = m.dstrt_id
            join agro_olt_oprtnl_ste_lst_t op on op.agro_oprtnl_ste_id = od.oprtnl_ste_id
            join agro_olt_sts_lst_t ot on ot.agro_sts_id = od.olt_sts_id
            join cntct_lst_t ct on ct.dstrct_id = od.dstrt_id
            left join olt_outage_dtl_t ud on ud.olt_id = od.olt_id 
            left join olt_outage_rel_t ur on ur.i_ts = ud.u_ts 
            left join mrcht_usr_lst_t as usc on usc.mrcht_usr_id=ud.crte_usr_id
            left join mrcht_usr_lst_t as usu on usu.mrcht_usr_id=ud.updte_usr_id 
            left join olt_iss_ctgry_lst_t ic on ic.olt_iss_ctgry_id = ud.olt_iss_ctgry_id 
            left join olt_iss_sub_ctgry_lst_t isc on isc.olt_iss_sub_ctgry_id = ud.olt_iss_sub_ctgry_id 
            left join olt_oprnl_ste_hst_t sh on sh.olt_id = od.olt_id and sh.oprtnl_ste_id in (2,3,4) and sh.oprtnl_ste_end_ts is not null
            where  ct.cntct_ctgry_id=1 and od.a_in=1 ${dstrctid}
            GROUP BY od.olt_id
            ORDER BY max(sh.oprtnl_ste_strt_ts) desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function       : get_distrctWseNtOperationalOltsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_distrctWseNtOperationalOltsMdl = function (dstid, mndlid, otid, user) {
    var fnm = "get_distrctWseNtOperationalOltsMdl"
    var dstrctid = ``;
    var mandalid = ``;
    var oltid = ``;
    if (dstid > 0) {
        dstrctid = `and od.dstrt_id=${dstid}`
    }
    if (mndlid > 0) {
        mandalid = `and od.mndl_id=${mndlid}`
    }
    if (otid > 0) {
        oltid = `and od.olt_id=${otid}`
    }
    /*var QRY_TO_EXEC = `select a.olt_id,a.olt_nm,a.oprtnl_ste_id,(case when oprtnl_ste_id =1 then 0 else respond_delay end) as hr,DATE_FORMAT(oprtnl_ste_chnge_ts,'%d-%m-%Y') AS down_time,
    (case when a.ste_nm="Unnkown" then 'Down' else a.ste_nm end)  as ste_nm,
    a.oprtnl_ste_chnge_ts,a.olt_sts_id,a.sts_nm,a.oprnl_sts_chnge_ts,a.lst_rfrh_ts,a.type_id,a.instl_dt,a.sftwe_vrsn_tx,
        a.hrdwe_vrsn_tx,a.site_nm,a.mngmt_dmn_nm,a.eqpmt_id,a.olt_type_id,a.olt_type_nm,a.olt_ip_addr_tx,a.olt_srl_nu,a.pop_id,a.olt_lble_nu,a.olt_acs_nde_id,a.sbstn_id,
        a.sbstn_nm,a.sbstn_unq_cd,a.dstrt_id,a.dstrt_nm,a.mndl_id,a.oprtnl_ste_orgn_ts,a.oprtnl_sts_orgn_ts,a.ste_dt,a.sts_dt,a.mble1_ph,a.cntct_nm,a.cmnt_tx,
        a.olt_iss_ctgry_nm,a.olt_iss_sub_ctgry_nm,a.mndl_nm,a.dwnDateTime,a.updtDateTime,a.hour,a.minute,a.hrandminute,a.olt_outage_id,a.cafcount,a.createuser,a.updateuser,a.actualHrsAndMinuts,a.updatecommentdate,
        a.maxdwn,a.maxcmnt,(case when maxcmnt >= maxdwn then updatecommentdate  else '' end) as updatecommentdateReal,(case when maxcmnt >= maxdwn then updateuser  else '' end) as updateuserReal
         from
    (select od.olt_id,od.olt_nm,TIMESTAMPDIFF(hour, od.oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) as respond_delay,od.oprtnl_ste_id,op.ste_nm,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts,
    od.olt_sts_id,ot.sts_nm,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as oprnl_sts_chnge_ts,DATE_FORMAT(od.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,od.type_id,od.instl_dt,od.sftwe_vrsn_tx,
        od.hrdwe_vrsn_tx,od.site_nm,od.mngmt_dmn_nm,od.eqpmt_id,od.olt_type_id,od.olt_type_nm,od.olt_ip_addr_tx,od.olt_srl_nu,od.pop_id,od.olt_lble_nu,od.olt_acs_nde_id,od.sbstn_id,
        od.sbstn_nm,od.sbstn_unq_cd,od.dstrt_id,d.dstrt_nm,od.mndl_id,od.oprtnl_ste_chnge_ts as oprtnl_ste_orgn_ts,od.oprnl_sts_chnge_ts as oprtnl_sts_orgn_ts,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d-%m-%Y') as ste_dt,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d-%m-%Y') as sts_dt,ct.mble1_ph,ct.cntct_nm
        ,ud.cmnt_tx,ic.olt_iss_ctgry_nm,isc.olt_iss_sub_ctgry_nm,m.mndl_nm,DATE_FORMAT(max(sh.oprtnl_ste_strt_ts) ,'%d-%m-%Y %H:%i:%s') as dwnDateTime,DATE_FORMAT(max(sh.oprtnl_ste_end_ts) ,'%d-%m-%Y %H:%i:%s') as updtDateTime,
        TIMESTAMPDIFF(hour,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)) as hour,TIMESTAMPDIFF(Minute,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)) as minute,
        CONCAT(TIMESTAMPDIFF(hour,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)),":",TIMESTAMPDIFF(Minute,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts))) as hrandminute,
        ud.olt_outage_id,count(DISTINCT c.caf_id) as cafcount,usc.mrcht_usr_nm as createuser,usu.mrcht_usr_nm as updateuser,time_format(timediff(CURRENT_TIMESTAMP(), max(sh.oprtnl_ste_strt_ts)),'%H:%i:%s') as  actualHrsAndMinuts ,
        (case when max(ur.i_ts)>max(ud.i_ts) then DATE_FORMAT(max(ur.i_ts) ,'%d-%m-%Y %H:%i:%s') else DATE_FORMAT(max(ud.i_ts) ,'%d-%m-%Y %H:%i:%s') end) as updatecommentdate,max(sh.oprtnl_ste_strt_ts) as maxdwn,(case when max(ur.i_ts)>max(ud.i_ts) then max(ur.i_ts) else max(ud.i_ts) end) as maxcmnt
         from olt_ltrck_dtl_t od
        join caf_dtl_t c on c.olt_id = od.olt_id
        join dstrt_lst_t d on d.dstrt_id = od.dstrt_id
        JOIN mndl_lst_t m ON m.mndl_nu = od.mndl_id AND od.dstrt_id = m.dstrt_id
        join agro_olt_oprtnl_ste_lst_t op on op.agro_oprtnl_ste_id = od.oprtnl_ste_id
        join agro_olt_sts_lst_t ot on ot.agro_sts_id = od.olt_sts_id
        join cntct_lst_t ct on ct.dstrct_id = od.dstrt_id
        left join olt_outage_dtl_t ud on ud.olt_id = od.olt_id 
        left join olt_outage_rel_t ur on ur.i_ts = ud.u_ts 
        left join mrcht_usr_lst_t as usc on usc.mrcht_usr_id=ud.crte_usr_id
        left join mrcht_usr_lst_t as usu on usu.mrcht_usr_id=ud.updte_usr_id 
        left join olt_iss_ctgry_lst_t ic on ic.olt_iss_ctgry_id = ud.olt_iss_ctgry_id 
        left join olt_iss_sub_ctgry_lst_t isc on isc.olt_iss_sub_ctgry_id = ud.olt_iss_sub_ctgry_id 
        left join olt_oprnl_ste_hst_t sh on sh.olt_id = od.olt_id and sh.oprtnl_ste_id in (2,3,4) and sh.oprtnl_ste_end_ts is null
        where  ct.cntct_ctgry_id=1 and od.a_in=1 and od.oprtnl_ste_id  not in (1) ${dstrctid} ${mandalid} ${oltid}
        GROUP BY od.olt_id
        ORDER BY max(sh.oprtnl_ste_strt_ts) desc) as a;`;*/
	var QRY_TO_EXEC = `select od.olt_id,od.olt_nm,od.oprtnl_ste_id,(case when od.oprtnl_ste_id =1 then 0 else TIMESTAMPDIFF(hour, od.oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) end) as hr,
        DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d-%m-%Y') AS down_time,
        (case when op.ste_nm='Unnkown' then 'Down' else op.ste_nm end)  as ste_nm,
        DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts,
        od.olt_sts_id,ot.sts_nm,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as oprnl_sts_chnge_ts,DATE_FORMAT(od.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,od.type_id,od.instl_dt,od.sftwe_vrsn_tx,
                od.hrdwe_vrsn_tx,od.site_nm,od.mngmt_dmn_nm,od.eqpmt_id,od.olt_type_id,od.olt_type_nm,od.olt_ip_addr_tx,od.olt_srl_nu,od.pop_id,od.olt_lble_nu,od.olt_acs_nde_id,od.sbstn_id,
                od.sbstn_nm,od.sbstn_unq_cd,od.dstrt_id,d.dstrt_nm,od.mndl_id,od.oprtnl_ste_chnge_ts as oprtnl_ste_orgn_ts,od.oprnl_sts_chnge_ts as oprtnl_sts_orgn_ts,DATE_FORMAT(od.oprtnl_ste_chnge_ts,'%d-%m-%Y') as ste_dt,DATE_FORMAT(od.oprnl_sts_chnge_ts,'%d-%m-%Y') as sts_dt,ct.mble1_ph,ct.cntct_nm
                ,ud.cmnt_tx,ic.olt_iss_ctgry_nm,isc.olt_iss_sub_ctgry_nm,m.mndl_nm,DATE_FORMAT(max(sh.oprtnl_ste_strt_ts) ,'%d-%m-%Y %H:%i:%s') as dwnDateTime,DATE_FORMAT(max(sh.oprtnl_ste_end_ts) ,'%d-%m-%Y %H:%i:%s') as updtDateTime,
                TIMESTAMPDIFF(hour,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)) as hour,TIMESTAMPDIFF(Minute,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)) as minute,
                CONCAT(TIMESTAMPDIFF(hour,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts)),':',TIMESTAMPDIFF(Minute,max(sh.oprtnl_ste_strt_ts),max(sh.oprtnl_ste_end_ts))) as hrandminute,
                ud.olt_outage_id,count(DISTINCT c.caf_id) as cafcount,usc.mrcht_usr_nm as createuser,usu.mrcht_usr_nm as updateuser,time_format(timediff(CURRENT_TIMESTAMP(), max(sh.oprtnl_ste_strt_ts)),'%H:%i:%s') as  actualHrsAndMinuts ,
                (case when max(ur.i_ts)>max(ud.i_ts) then DATE_FORMAT(max(ur.i_ts) ,'%d-%m-%Y %H:%i:%s') else DATE_FORMAT(max(ud.i_ts) ,'%d-%m-%Y %H:%i:%s') end) as updatecommentdate,max(sh.oprtnl_ste_strt_ts) as maxdwn,(case when max(ur.i_ts)>max(ud.i_ts) then max(ur.i_ts) else max(ud.i_ts) end) as maxcmnt,
        (case when (case when max(ur.i_ts)>max(ud.i_ts) then max(ur.i_ts) else max(ud.i_ts) end) >= max(sh.oprtnl_ste_strt_ts) then (case when max(ur.i_ts)>max(ud.i_ts) then max(ur.i_ts)  else max(ud.i_ts)  end)  else '' end) as updatecommentdateReal,(case when (case when max(ur.i_ts)>max(ud.i_ts) then max(ur.i_ts) else max(ud.i_ts) end) >= max(sh.oprtnl_ste_strt_ts) then usu.mrcht_usr_nm  else '' end) as updateuserReal
        from olt_ltrck_dtl_t od
                join caf_dtl_t c on c.olt_id = od.olt_id
                join dstrt_lst_t d on d.dstrt_id = od.dstrt_id
                JOIN mndl_lst_t m ON m.mndl_nu = od.mndl_id AND od.dstrt_id = m.dstrt_id
                join agro_olt_oprtnl_ste_lst_t op on op.agro_oprtnl_ste_id = od.oprtnl_ste_id
                join agro_olt_sts_lst_t ot on ot.agro_sts_id = od.olt_sts_id
                join cntct_lst_t ct on ct.dstrct_id = od.dstrt_id
                left join olt_outage_dtl_t ud on ud.olt_id = od.olt_id 
                left join olt_outage_rel_t ur on ur.i_ts = ud.u_ts 
                left join mrcht_usr_lst_t as usc on usc.mrcht_usr_id=ud.crte_usr_id
                left join mrcht_usr_lst_t as usu on usu.mrcht_usr_id=ud.updte_usr_id 
                left join olt_iss_ctgry_lst_t ic on ic.olt_iss_ctgry_id = ud.olt_iss_ctgry_id 
                left join olt_iss_sub_ctgry_lst_t isc on isc.olt_iss_sub_ctgry_id = ud.olt_iss_sub_ctgry_id 
                left join olt_oprnl_ste_hst_t sh on sh.olt_id = od.olt_id and sh.oprtnl_ste_id in (2,3,4) and sh.oprtnl_ste_end_ts is null
                where  ct.cntct_ctgry_id=1 and od.a_in=1 and od.oprtnl_ste_id  not in (1) ${dstrctid} ${mandalid} ${oltid}
                GROUP BY od.olt_id
                ORDER BY max(sh.oprtnl_ste_strt_ts) desc;`
    console.log("DOWNOLTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_IptvTdyCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_IptvTdyCntsMdl = function (user) {
    var fnm = "get_IptvTdyCntsMdl"
    var QRY_TO_EXEC = `select iptv_hr,iptv_dt
    ,Round(sum(iptv_actve_sbcr_ct)/count(*),0) as iptv_actve_sbcr_ct
    ,Round(sum(iptv_tdy_rgtn_ct)/count(*),0) as iptv_tdy_rgtn_ct
    ,Round(sum(iptv_vod_ct)/count(*),0) as iptv_nlne_ct
    ,Round(sum(iptv_nlne_ltv_ct)/count(*),0) as iptv_nlne_ltv_ct
    from iptv_dbrd_dtl_t 
    where iptv_dt=current_date()
    group by iptv_hr,iptv_dt
    order by i_ts desc limit 1;;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_IptvHourlyLiveStsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_IptvHourlyLiveStsMdl = function (date, user) {
    var fnm = "get_IptvHourlyLiveStsMdl"
    var QRY_TO_EXEC = `SELECT * FROM hrly_nm_t h 
    LEFT JOIN (select iptv_hr,iptv_dt
        ,Round(sum(iptv_actve_sbcr_ct)/count(*),0) as iptv_actve_sbcr_ct
        ,Round(sum(iptv_tdy_rgtn_ct)/count(*),0) as iptv_tdy_rgtn_ct
        ,Round(sum(iptv_vod_ct)/count(*),0) as iptv_nlne_ct
        ,Round(sum(iptv_nlne_ltv_ct)/count(*),0) as iptv_nlne_ltv_ct
        from iptv_dbrd_dtl_t 
        where iptv_dt='${date}'
        group by iptv_hr,iptv_dt
        order by iptv_hr ASC) as a  on h.hrly_id = a.iptv_hr
    
    ORDER BY h.hrly_id;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getLmoStsCntsDataMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getLmoStsCntsDataMdl = (data, user, callback) => {
    var fnm = "getLmoStsCntsDataMdl"

    let where_cnd = ` `;
    let pag_size = 1000;
    let pge_nu = data.lmt_pstn * pag_size;
    console.log('*********************** _____________________________');
    console.log(data);
    console.log(data.data);


    if (data.data.hdr == 'Suspended') {
        where_cnd += ` and cf.enty_sts_id =7`
    }
    else if (data.data.hdr == 'Total CAF Operations') {
        where_cnd += ``
    }
    else if (data.data.hdr == 'Active') {
        where_cnd += ` and cf.enty_sts_id =6`
    }
    else if (data.data.hdr == 'Pending Activations') {
        where_cnd += ` and cf.enty_sts_id =1`
    }
    else if (data.data.hdr == 'Terminated') {
        where_cnd += ` and cf.enty_sts_id =8`
    }
    else if (data.data.hdr == 'Others') {
        where_cnd += ` and cf.enty_sts_id not in (1,6,7,8)`
    }


    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and cf.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and cf.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and cf.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cu.cstmr_nm like '%${data.srch_txt}%'`
        }
    }

    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') AS actvnDt,cf.caf_id,cf.mdlwe_sbscr_id,
    cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu, 
	es.sts_nm,cf.caf_type_id,
    b.frqncy_nm,es.sts_clr_cd_tx,cf.onu_srl_nu,
    cf.iptv_srl_nu,cu.cstmr_id,cu.cstmr_nm,cu.cstmr_nm as frst_nm,cu.loc_std_cd, cu.lst_nm,vps.phne_nu
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN blng_frqncy_lst_t as b on b.frqncy_id = cf.frqncy_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=cf.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    WHERE cf.lmo_agnt_id = ${data.data.agntId} ${where_cnd}
    group BY cf.caf_id ORDER BY cf.caf_id  limit ${pge_nu}, ${pag_size}`;
    console.log("____ getLmoStsCntsDataMdl ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : getStsCntsDataMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getStsCntsDataMdl = (data, user, callback) => {
    var fnm = "get_IptvMnthStsMdl"

    let where_cnd = ` `;
    let pag_size = 20;
    let pge_nu = data.lmt_pstn * pag_size;
    console.log('*********************** _____________________________');
    console.log(data);
    console.log(data.data);


    if (data.data.hdr == 'Suspend') {
        where_cnd += ` and cf.enty_sts_id =7`
    }
    else if (data.data.hdr == 'Total') {
        where_cnd += ``
    }
    else if (data.data.hdr == 'Active') {
        where_cnd += ` and cf.enty_sts_id =6`
    }
    else if (data.data.hdr == 'Pending Activation') {
        where_cnd += ` and cf.enty_sts_id =1`
    }
    else if (data.data.hdr == 'Termination') {
        where_cnd += ` and cf.enty_sts_id =8`
    }
    else if (data.data.hdr == 'Other') {
        where_cnd += ` and cf.enty_sts_id not in (1,6,7,8)`
    }


    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and cf.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and cf.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and cf.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cu.cstmr_nm like '%${data.srch_txt}%'`
        }
    }

    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') AS actvnDt,cf.caf_id,cf.mdlwe_sbscr_id,
    cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu, 
	es.sts_nm,cf.caf_type_id,
    b.frqncy_nm,es.sts_clr_cd_tx,cf.onu_srl_nu,
    cf.iptv_srl_nu,cu.cstmr_id,cu.cstmr_nm,cu.cstmr_nm as frst_nm,cu.loc_std_cd, cu.lst_nm,vps.phne_nu
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN blng_frqncy_lst_t as b on b.frqncy_id = cf.frqncy_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=cf.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    WHERE 1=1 ${where_cnd}
    group BY cf.caf_id ORDER BY cf.caf_id  limit ${pge_nu}, ${pag_size}`;
    console.log("____ getStsCntsDataMdl ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : get_IptvMnthStsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_IptvMnthStsMdl = function (mnth, year, user) {
    var fnm = "get_IptvMnthStsMdl"
    var QRY_TO_EXEC = `select date_format(iptv_dt,'%d') as iptv_dt
    ,MIN(iptv_nlne_ltv_ct) as min,MAX(iptv_nlne_ltv_ct) as max,round(sum(iptv_nlne_ltv_ct)/count(*),0) as avg,DAYOFMONTH(LAST_DAY(iptv_dt)) AS Days,month(iptv_dt) as month
    from iptv_dbrd_dtl_t 
    where month(iptv_dt)=${mnth} and year(iptv_dt)=${year}
    group by iptv_dt
    order by iptv_dt;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function       : get_AddonsCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AddonsCntsMdl = function (user) {
    var fnm = "get_AddonsCntsMdl"
    var QRY_TO_EXEC = `SELECT    
    count(cp.a_in = 1) as ttl_actv_addns,
    SUM(CASE WHEN cp.efcte_dt = CURRENT_DATE() AND cp.a_in = 1  THEN 1 ELSE 0 END) as tdy_actv_addns,
    SUM(CASE WHEN cp.efcte_dt = CURRENT_DATE() AND cp.a_in = 0  THEN 1 ELSE 0 END) as tdy_deactv_addns
    FROM caf_pckge_prchse_dtl_t cp
    JOIN pckge_lst_t p on p.pckge_id = cp.pckge_id
    WHERE p.pckge_type_id = 2;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getMnthlyAgntOptnCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMnthlyAgntOptnCntsMdl = function (data, user) {
    var fnm = "getMnthlyAgntOptnCntsMdl"
    var dstrctCond = ``;
	if(data.dstrt != null && data.dstrt != ''){
		if (data.dstrt != null) {
			dstrctCond = `AND a.ofce_dstrt_id=${data.dstrt}`;
		} else {
			dstrctCond = `AND a.ofce_dstrt_id=${user.hyrchy_grp_id}`;
		}
	}
    var QRY_TO_EXEC = `SELECT lmo_agnt_id,a.agnt_cd,a.agnt_nm,a1.agnt_nm AS mso_nm,a.ofce_mbl_nu,a.ofce_cntct_nm,dstrt_id,dstrt_nm,oprtn_mm,oprtn_yr,lmo_shre_at,mso_shre_at,apsfl_shre_at
    lmo_prv_blnce_at,lmo_clctd_at,add_on_chrge_at,voip_chrge_at,crdt_at,dsptd_at
    ,caf_ct,prtd_caf_ct,pd_caf_ct,bx_only_caf_ct,nt_pd_caf_ct,spnd_caf_ct,rsmed_caf_ct,nw_caf_ct
    ,trmnd_caf_ct,box_chnge_ct,pon_chnge_ct,altd_bx_ct
    FROM
    lmo_oprtn_mnthly_dtl_t l
    JOIN agnt_lst_t a ON l.lmo_agnt_id=a.agnt_id
    JOIN dstrt_lst_t d ON a.ofce_dstrt_id = d.dstrt_id
    LEFT JOIN agnt_lst_t a1 ON l.mso_agnt_id = a1.agnt_id
    WHERE
    oprtn_yr=${data.year} AND oprtn_mm=${data.mnth} ${dstrctCond} ORDER BY a.agnt_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getDstrtCrntMnthCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDstrtCrntMnthCntsMdl = function (data, user) {
    var fnm = "getDstrtCrntMnthCntsMdl"
    var dstrctCond = ``;
	if(data.dstrt != null && data.dstrt != ''){
		if (data.dstrt != null) {
			dstrctCond = `AND a.ofce_dstrt_id=${data.dstrt}`;
		} else {
			dstrctCond = `AND a.ofce_dstrt_id=${user.hyrchy_grp_id}`;
		}
	}
    var QRY_TO_EXEC = `SELECT dstrt_id,dstrt_nm,oprtn_mm AS crnt_mnth,oprtn_yr AS crnt_yr,
    SUM(nw_caf_ct) AS crnt_mnth_caf_prv_ct,SUM(spnd_caf_ct) AS crnt_mnth_caf_spnd_ct,SUM(rsmed_caf_ct) AS crnt_mnth_caf_rsme_ct
    ,SUM(trmnd_caf_ct) AS crnt_mnth_trmnd_ct,SUM(box_chnge_ct) AS crnt_mnth_bx_chnge_ct,SUM(pon_chnge_ct) AS crnt_mnth_pn_chnge_ct
    FROM
    lmo_oprtn_mnthly_dtl_t l
    JOIN agnt_lst_t a ON l.lmo_agnt_id=a.agnt_id
    JOIN dstrt_lst_t d ON a.ofce_dstrt_id = d.dstrt_id
    WHERE
    oprtn_yr=YEAR(CURDATE()) AND oprtn_mm=MONTH(CURDATE()) ${dstrctCond}
    GROUP BY oprtn_yr,oprtn_mm;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getDstrtPrvsMnthCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDstrtPrvsMnthCntsMdl = function (data, user) {
    var fnm = "getDstrtPrvsMnthCntsMdl"
    var dstrctCond = ``;
	if(data.dstrt != null && data.dstrt != ''){
		if (data.dstrt != null) {
			dstrctCond = `AND a.ofce_dstrt_id=${data.dstrt}`;
			dstrctCond = `AND a.ofce_dstrt_id=${data.dstrt}`;
		} else {
			dstrctCond = `AND a.ofce_dstrt_id=${user.hyrchy_grp_id}`;
		}
	}
    var QRY_TO_EXEC = `SELECT dstrt_id,dstrt_nm,oprtn_mm,oprtn_yr,
    SUM(nw_caf_ct) AS prv_mnth_caf_prv_ct,SUM(spnd_caf_ct) AS prv_mnth_caf_spnd_ct,SUM(rsmed_caf_ct) AS prv_mnth_caf_rsme_ct
    ,SUM(trmnd_caf_ct) AS prv_mnth_caf_trmnd_ct,SUM(box_chnge_ct) AS prv_mnth_bx_chnge_ct,SUM(pon_chnge_ct) AS prv_mnth_pn_chnge_ct
    FROM
    lmo_oprtn_mnthly_dtl_t l
    JOIN agnt_lst_t a ON l.lmo_agnt_id=a.agnt_id
    JOIN dstrt_lst_t d ON a.ofce_dstrt_id = d.dstrt_id
    WHERE
    oprtn_yr=YEAR(CURDATE()- INTERVAL 1 MONTH) AND oprtn_mm=MONTH(CURDATE() - INTERVAL 1 MONTH) ${dstrctCond}
    GROUP BY oprtn_yr,oprtn_mm`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getDstrtPrvsMnthIndvShreCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDstrtPrvsMnthIndvShreCntsMdl = function (user) {
    var fnm = "getDstrtPrvsMnthIndvShreCntsMdl"
    var QRY_TO_EXEC = `SELECT invce_yr,invce_mm
    ,SUM(invce_at+srvc_at+cgst_at+sgst_at) as INDV_TOTAL_INVOICE_AMOUNT
    ,SUM(invce_at) as INDV_INVOICE_AMOUNT
    ,SUM(srvc_at+cgst_at+sgst_at) as INDV_INVOICE_TAX
    ,SUM(i.apsfl_shre_at) as INDV_APSFL_SHARE
    ,SUM(i.lmo_shre_at) as INDV_LMO_SHARE
    ,SUM(i.mso_shre_at) as INDV_MSO_SHARE
    FROM erp_invce_lst_t i
    JOIN caf_dtl_t c on i.caf_id =c.caf_id
    WHERE invce_yr = YEAR(CURDATE()) AND i.pblsd_in=1 AND c.caf_type_id=1 AND c.instl_dstrct_id=${user.hyrchy_grp_id}
    GROUP BY invce_yr,invce_mm
    ORDER BY invce_yr,invce_mm`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getDstrtPrvsMnthEntShreCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDstrtPrvsMnthEntShreCntsMdl = function (user) {
    var fnm = "getDstrtPrvsMnthEntShreCntsMdl"
    var QRY_TO_EXEC = `SELECT invce_yr,invce_mm
    ,SUM(invce_at+srvc_at+cgst_at+sgst_at) as ENT_TOTAL_INVOICE_AMOUNT
    ,SUM(invce_at) as ENT_INVOICE_AMOUNT
    ,SUM(srvc_at+cgst_at+sgst_at) as ENT_INVOICE_TAX
    ,SUM(i.apsfl_shre_at) as ENT_APSFL_SHARE
    ,SUM(i.lmo_shre_at) as ENT_LMO_SHARE
    ,SUM(i.mso_shre_at) as ENT_MSO_SHARE
    FROM erp_invce_lst_t i
    JOIN caf_dtl_t c on i.caf_id =c.caf_id
    WHERE invce_yr = YEAR(CURDATE()) AND i.pblsd_in=1 AND c.caf_type_id=2 AND c.instl_dstrct_id=${user.hyrchy_grp_id}
    GROUP BY invce_yr,invce_mm
    ORDER BY invce_yr,invce_mm`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_AllMnthlyRvnueShareMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllMnthlyRvnueShareMdl = function (year, user) {
    var fnm = "get_AllMnthlyRvnueShareMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY invce_yr,invce_mm,agnt_id) as s_no,invce_yr,invce_mm,instl_dstrct_id,dstrt_nm,agnt_cd,agnt_nm,count(*)
    as TOT_CAFS_INVOICED
   ,SUM(case(c.caf_type_id) WHEN 1 THEN 1 ELSE 0 END) as 'INV_CAFS_INVOICED'
   ,SUM(case(c.caf_type_id) WHEN 2 THEN 1 ELSE 0 END) as 'ENT_CAFS_INVOICED'
   ,SUM(case when year(c.actvn_dt)=invce_yr AND month(c.actvn_dt)=invce_mm THEN 1 ELSE 0 END) as 'NEW_CAFS_INVOICED'
   ,sum(invce_at+srvc_at+cgst_at+sgst_at) as TOTAL_INVOICE_AMOUNT
   ,sum(invce_at) as INVOICE_AMOUNT
   ,sum(srvc_at+cgst_at+sgst_at) as INVOICE_TAX
   ,sum(i.apsfl_shre_at) as APSFL_SHARE
   ,sum(i.lmo_shre_at) as LMO_SHARE
   ,sum(i.mso_shre_at) as MSO_SHARE
   ,sum(case(invce_at) WHEN 50 THEN invce_at ELSE 0 END) as BOX_INVOICED_ONLY_AMOUNT
   ,sum(case(invce_at) WHEN 50 THEN 1 ELSE 0 END) as BOX_ONLY_INVOICED_CAFS
   ,sum(prtd_in) as PRORATED_BILL_CAFS
   ,sum(i.voip_chrge_at) as VOIP_INVOICED
   ,sum(i.add_on_chrge_at) as ADDONS_INVOICED
    FROM erp_invce_lst_t i
    JOIN caf_dtl_t c on i.caf_id =c.caf_id
    JOIN agnt_lst_t a ON c.lmo_agnt_id = a.agnt_id
    JOIN dstrt_lst_t d ON c.instl_dstrct_id=d.dstrt_id
   WHERE invce_yr = ${year} and i.pblsd_in=1 AND c.instl_dstrct_id=${user.hyrchy_grp_id}
   GROUP BY agnt_id,invce_yr,invce_mm
   ORDER BY invce_yr,invce_mm,agnt_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_VoipDayWiseDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_VoipDayWiseDataMdl = function (year, mnth, user) {
    var fnm = "get_VoipDayWiseDataMdl"
    var QRY_TO_EXEC = `select dpg.prm_grp_nm,dp.prm_nm,  mnth_ct, yr_ct, day_01 as day_1, day_02 as day_2, day_03 as day_3, day_04 as day_4, day_05 as day_5, day_06 as day_6, day_07 as day_7, day_08 as day_8, 
    day_09 as day_9, day_10, day_11, day_12, day_13, day_14, day_15, day_16, day_17, day_18, day_19, day_20, day_21, day_22, day_23, day_24, day_25, day_26, day_27, day_28, day_29, day_30, day_31
        from rpt_mnthy_int_dtl_t d 
        join  rpt_tme_prm_lst_t dp on d.prm_id=dp.prm_id 
        join rpt_tme_prm_grp_lst_t dpg on dpg.prm_grp_id =dp.prm_grp_id  
        where yr_ct=${year} and mnth_ct=${mnth}
        and d.prm_grp_id =1
        ORDER BY d.prm_id;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : get_VoipHorlyWiseDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_VoipHorlyWiseDataMdl = function (date, user) {
    var fnm = "get_VoipHorlyWiseDataMdl"
    var QRY_TO_EXEC = `select dpg.prm_grp_nm,dp.prm_nm,d.dta_dt,d.dta_dy ,d.dta_mm,hr_24,hr_01 as hr_1 ,hr_02 as hr_2 ,hr_03 as hr_3,hr_04 as hr_4,hr_05 as hr_5,hr_06 as hr_6,
    hr_07 as hr_7,hr_08 as hr_8,hr_09 as hr_9,hr_10 ,hr_11,hr_12,hr_13,hr_14,hr_15,hr_16,hr_17,hr_18,hr_19,hr_20,hr_21,hr_21,hr_22,hr_23 
        from BSS_ONLINE_U.rpt_dly_int_dtl_t d 
        join  rpt_tme_prm_lst_t dp on d.prm_id=dp.prm_id 
        join rpt_tme_prm_grp_lst_t dpg on dpg.prm_grp_id =dp.prm_grp_id  
        where dta_dt='${date}'
        and d.prm_grp_id =1
        ORDER BY d.prm_id;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : get_VoipMnthlyChrgesDataMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_VoipMnthlyChrgesDataMdl = function (year, user) {
    var fnm = "get_VoipMnthlyChrgesDataMdl"
    /*var QRY_TO_EXEC = `select * from mnth_dtls_t as m  left join
    (select call_yr,MONTHNAME(CONCAT(call_yr,'-',call_mm,'-01')) as call_mnth
        ,format(sum((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ),2) as invce_at
        ,count(*)
         as total_cafs,call_mm
        ,sum(case WHEN ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) <=100 THEN 1 ELSE 0 END )as ltn_100
        ,sum(case WHEN ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) >100 AND ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) <=300 THEN 1 ELSE 0 END ) as 100_to_300
        ,sum(case WHEN ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) >300 AND ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) <=500 THEN 1 ELSE 0 END ) as 300_to_500
        ,sum(case WHEN ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) >500 AND ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) <=1000 THEN 1 ELSE 0 END ) as 500_to_1000
        ,sum(case WHEN ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) >1000 AND ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) <=2000 THEN 1 ELSE 0 END ) as 1000_to_2000
        ,sum(case WHEN ((std_chrge_at+isd_chrge_at+lcl_chrge_at)*1.18 ) >2000 THEN 1 ELSE 0 END ) as gt_2000
        from voip_caf_phne_chrges_dtl_t vc 
       where call_yr =${year}
        group by call_yr,call_mm
        ORDER BY call_yr,call_mm) as a on a.call_mm=m.mnth_id
    ORDER BY m.mnth_id;`;*/
	    var QRY_TO_EXEC = `select m.*,vc.call_yr,MONTHNAME(CONCAT(vc.call_yr,'-',vc.call_mm,'-01')) as call_mnth
    ,format(sum((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ),2) as invce_at
    ,count(*)
     as total_cafs,vc.call_mm
    ,sum(case WHEN ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) <=100 THEN 1 ELSE 0 END )as ltn_100
    ,sum(case WHEN ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) >100 AND ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) <=300 THEN 1 ELSE 0 END ) as 100_to_300
    ,sum(case WHEN ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) >300 AND ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) <=500 THEN 1 ELSE 0 END ) as 300_to_500
    ,sum(case WHEN ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) >500 AND ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) <=1000 THEN 1 ELSE 0 END ) as 500_to_1000
    ,sum(case WHEN ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) >1000 AND ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) <=2000 THEN 1 ELSE 0 END ) as 1000_to_2000
    ,sum(case WHEN ((vc.std_chrge_at+vc.isd_chrge_at+vc.lcl_chrge_at)*1.18 ) >2000 THEN 1 ELSE 0 END ) as gt_2000
    from voip_caf_phne_chrges_dtl_t as vc
    left join mnth_dtls_t as m on vc.call_mm=m.mnth_id
   where vc.call_yr =${year}
    group by call_yr,call_mm
    ORDER BY call_yr,call_mm`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_HsidayWiseUsgeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_HsidayWiseUsgeMdl = function (mnth, year, user) {
    var fnm = "get_HsidayWiseUsgeMdl"
    var QRY_TO_EXEC = `select round(sum(case when dy_up_1 then dy_up_1 else null end)/1024/1024/1024/1024) as day_1_U,
    round(sum(case when dy_up_2 then dy_up_2 else null end)/1024/1024/1024/1024) as day_2_U,
    round(sum(case when dy_up_3 then dy_up_3 else null end)/1024/1024/1024/1024) as day_3_U,
    round(sum(case when dy_up_4 then dy_up_4 else null end)/1024/1024/1024/1024) as day_4_U,
    round(sum(case when dy_up_5 then dy_up_5 else null end)/1024/1024/1024/1024) as day_5_U,
    round(sum(case when dy_up_6 then dy_up_6 else null end)/1024/1024/1024/1024) as day_6_U,
    round(sum(case when dy_up_7 then dy_up_7 else null end)/1024/1024/1024/1024) as day_7_U,
    round(sum(case when dy_up_8 then dy_up_8 else null end)/1024/1024/1024/1024) as day_8_U,
    round(sum(case when dy_up_9 then dy_up_9 else null end)/1024/1024/1024/1024) as day_9_U,
    round(sum(case when dy_up_10 then dy_up_10 else null end)/1024/1024/1024/1024) as day_10_U,
    round(sum(case when dy_up_11 then dy_up_11 else null end)/1024/1024/1024/1024) as day_11_U,
    round(sum(case when dy_up_12 then dy_up_12 else null end)/1024/1024/1024/1024) as day_12_U,
    round(sum(case when dy_up_13 then dy_up_13 else null end)/1024/1024/1024/1024) as day_13_U,
    round(sum(case when dy_up_14 then dy_up_14 else null end)/1024/1024/1024/1024) as day_14_U,
    round(sum(case when dy_up_15 then dy_up_15 else null end)/1024/1024/1024/1024) as day_15_U,
    round(sum(case when dy_up_16 then dy_up_16 else null end)/1024/1024/1024/1024) as day_16_U,
    round(sum(case when dy_up_17 then dy_up_17 else null end)/1024/1024/1024/1024) as day_17_U,
    round(sum(case when dy_up_18 then dy_up_18 else null end)/1024/1024/1024/1024) as day_18_U,
    round(sum(case when dy_up_19 then dy_up_19 else null end)/1024/1024/1024/1024) as day_19_U,
    round(sum(case when dy_up_20 then dy_up_20 else null end)/1024/1024/1024/1024) as day_20_U,
    round(sum(case when dy_up_21 then dy_up_21 else null end)/1024/1024/1024/1024) as day_21_U,
    round(sum(case when dy_up_22 then dy_up_22 else null end)/1024/1024/1024/1024) as day_22_U,
    round(sum(case when dy_up_23 then dy_up_23 else null end)/1024/1024/1024/1024) as day_23_U,
    round(sum(case when dy_up_24 then dy_up_24 else null end)/1024/1024/1024/1024) as day_24_U,
    round(sum(case when dy_up_25 then dy_up_25 else null end)/1024/1024/1024/1024) as day_25_U,
    round(sum(case when dy_up_26 then dy_up_26 else null end)/1024/1024/1024/1024) as day_26_U,
    round(sum(case when dy_up_27 then dy_up_27 else null end)/1024/1024/1024/1024) as day_27_U,
    round(sum(case when dy_up_28 then dy_up_28 else null end)/1024/1024/1024/1024) as day_28_U,
    round(sum(case when dy_up_29 then dy_up_29 else null end)/1024/1024/1024/1024) as day_29_U,
    round(sum(case when dy_up_30 then dy_up_30 else null end)/1024/1024/1024/1024) as day_30_U,
    round(sum(case when dy_up_31 then dy_up_31 else null end)/1024/1024/1024/1024) as day_31_U,
    round(sum(case when dy_dw_1 then dy_dw_1 else null end)/1024/1024/1024/1024) as day_1_D,
    round(sum(case when dy_dw_2 then dy_dw_2 else null end)/1024/1024/1024/1024) as day_2_D,
    round(sum(case when dy_dw_3 then dy_dw_3 else null end)/1024/1024/1024/1024) as day_3_D,
    round(sum(case when dy_dw_4 then dy_dw_4 else null end)/1024/1024/1024/1024) as day_4_D,
    round(sum(case when dy_dw_5 then dy_dw_5 else null end)/1024/1024/1024/1024) as day_5_D,
    round(sum(case when dy_dw_6 then dy_dw_6 else null end)/1024/1024/1024/1024) as day_6_D,
    round(sum(case when dy_dw_7 then dy_dw_7 else null end)/1024/1024/1024/1024) as day_7_D,
    round(sum(case when dy_dw_8 then dy_dw_8 else null end)/1024/1024/1024/1024) as day_8_D,
    round(sum(case when dy_dw_9 then dy_dw_9 else null end)/1024/1024/1024/1024) as day_9_D,
    round(sum(case when dy_dw_10 then dy_dw_10 else null end)/1024/1024/1024/1024) as day_10_D,
    round(sum(case when dy_dw_11 then dy_dw_11 else null end)/1024/1024/1024/1024) as day_11_D,
    round(sum(case when dy_dw_12 then dy_dw_12 else null end)/1024/1024/1024/1024) as day_12_D,
    round(sum(case when dy_dw_13 then dy_dw_13 else null end)/1024/1024/1024/1024) as day_13_D,
    round(sum(case when dy_dw_14 then dy_dw_14 else null end)/1024/1024/1024/1024) as day_14_D,
    round(sum(case when dy_dw_15 then dy_dw_15 else null end)/1024/1024/1024/1024) as day_15_D,
    round(sum(case when dy_dw_16 then dy_dw_16 else null end)/1024/1024/1024/1024) as day_16_D,
    round(sum(case when dy_dw_17 then dy_dw_17 else null end)/1024/1024/1024/1024) as day_17_D,
    round(sum(case when dy_dw_18 then dy_dw_18 else null end)/1024/1024/1024/1024) as day_18_D,
    round(sum(case when dy_dw_19 then dy_dw_19 else null end)/1024/1024/1024/1024) as day_19_D,
    round(sum(case when dy_dw_20 then dy_dw_20 else null end)/1024/1024/1024/1024) as day_20_D,
    round(sum(case when dy_dw_21 then dy_dw_21 else null end)/1024/1024/1024/1024) as day_21_D,
    round(sum(case when dy_dw_22 then dy_dw_22 else null end)/1024/1024/1024/1024) as day_22_D,
    round(sum(case when dy_dw_23 then dy_dw_23 else null end)/1024/1024/1024/1024) as day_23_D,
    round(sum(case when dy_dw_24 then dy_dw_24 else null end)/1024/1024/1024/1024) as day_24_D,
    round(sum(case when dy_dw_25 then dy_dw_25 else null end)/1024/1024/1024/1024) as day_25_D,
    round(sum(case when dy_dw_26 then dy_dw_26 else null end)/1024/1024/1024/1024) as day_26_D,
    round(sum(case when dy_dw_27 then dy_dw_27 else null end)/1024/1024/1024/1024) as day_27_D,
    round(sum(case when dy_dw_28 then dy_dw_28 else null end)/1024/1024/1024/1024) as day_28_D,
    round(sum(case when dy_dw_29 then dy_dw_29 else null end)/1024/1024/1024/1024) as day_29_D,
    round(sum(case when dy_dw_30 then dy_dw_30 else null end)/1024/1024/1024/1024) as day_30_D,
    round(sum(case when dy_dw_31 then dy_dw_31 else null end)/1024/1024/1024/1024) as day_31_D
    from hsi_mnthly_usge_dtl_t
    where mnt_ct=${mnth} and yr_ct=${year};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : get_HsimnthWiseUsgeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_HsimnthWiseUsgeMdl = function (year, user) {
    var fnm = "get_HsimnthWiseUsgeMdl"
    var QRY_TO_EXEC = `
    SELECT * FROM BSS_ONLINE_U.mnth_dtls_t m
        LEFT JOIN(
    select round(sum(ttl_upld_ct)/1024/1024/1024/1024) as up,
    round(sum(ttl_dwnld_ct)/1024/1024/1024/1024) as dwn,mnt_ct
        from hsi_mnthly_usge_dtl_t
        where yr_ct=${year}
    group by mnt_ct) as a on m.mnth_id = a.mnt_ct
    
    order by m.mnth_id;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : get_VoipCrrntMnthCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_VoipTotalCntMdl = function (year, user) {
    var fnm = "get_VoipTotalCntMdl"
    var QRY_TO_EXEC = `select count(v.phne_nmbr_id) as ct,
    sum(case when c.caf_type_id=1 then 1 else 0 end) + sum(case when c.caf_type_id=2 then 1 else 0 end) as asgnd_cnt,
    sum(case when c.caf_type_id=1 then 1 else 0 end) as ind_cntt,
    sum(case when c.caf_type_id=2 then 1 else 0 end) as ent_cntt,
    sum(case when fncy_in=1 then 1 else 0 end) as fncy_cnt
        from voip_phne_nmbrs_lst_t as v
    left join voip_caf_phne_nmbrs_rel_t as v1 on v.phne_nmbr_id=v1.phne_nmbr_id
    left join caf_dtl_t as c on c.caf_id=v1.caf_id ;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : get_HsiCrrntMnthCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_HsiCrrntMnthCntMdl = function (user) {
    var fnm = "get_HsiCrrntMnthCntMdl"
    var date = new Date();
    var currntMnth = date.getMonth() + 1;
    var pervsMnth = date.getMonth();
	if(currntMnth == 1){
        var currntYear =new Date().getFullYear();
        var pervsYear =new Date().getFullYear()-1;
		pervsMnth = 12;
    } else {
        var currntYear =new Date().getFullYear();
        var pervsYear =new Date().getFullYear();
    }
    /*var QRY_TO_EXEC = ` select round(sum(ttl_upld_ct)/1024/1024/1024/1024) as up,
    round(sum(ttl_dwnld_ct)/1024/1024/1024/1024) as dwn,mnt_ct
        from hsi_mnthly_usge_dtl_t
        where mnt_ct=${currntMnth} or mnt_ct = ${pervsMnth}
    group by mnt_ct 
    order by mnt_ct desc;`;*/
	var QRY_TO_EXEC = ` select round(sum(ttl_upld_ct)/1024/1024/1024/1024) as up,
    round(sum(ttl_dwnld_ct)/1024/1024/1024/1024) as dwn,mnt_ct
        from hsi_mnthly_usge_dtl_t
        where ((yr_ct=${currntYear} AND mnt_ct = ${currntMnth}) OR (yr_ct=${pervsYear} AND mnt_ct = ${pervsMnth})) 
    group by mnt_ct 
    order by i_ts desc;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : get_HsiMnthWiseUsgCafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_HsiMnthWiseUsgCafsMdl = function (year, user) {
    var fnm = "get_HsiMnthWiseUsgCafsMdl"
    var QRY_TO_EXEC = `select * from BSS_ONLINE_U.mnth_dtls_t as m
    left join (
    SELECT yr_ct,mnt_ct,
    sum(CASE WHEN download<50 THEN 1 ELSE 0 END) AS BELOW_50_D,
    sum(CASE WHEN download>=50 AND download<100 THEN 1 ELSE 0 END) AS 50_TO_100_D,
    sum(CASE WHEN download>=100 AND download<200 THEN 1 ELSE 0 END) AS 100_TO_200_D,
    sum(CASE WHEN download>=200 THEN 1 ELSE 0 END) AS ABOVE_200_D
    from (SELECT yr_ct,mnt_ct,caf_id,ROUND(ttl_dwnld_ct/1024/1024/1024) as download
                FROM hsi_mnthly_usge_dtl_t 
                WHERE yr_ct=${year}
                ) AS a
    GROUP BY yr_ct,mnt_ct)as b on m.mnth_id = b.mnt_ct
    order by m.mnth_id;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : get_HsitdyprvsDayCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_HsitdyprvsDayCntMdl = function (user) {
    var fnm = "get_HsitdyprvsDayCntMdl"
    var date = new Date();
    var day = date.getDate();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth() + 1;
    var date1 = new Date();
    date1.setDate(date1.getDate() - 1)
    yester = date1.getDate();
    var yearYstrdy = date1.getFullYear();
    var mnthYstrdy = date1.getMonth() + 1;

    var QRY_TO_EXEC = [`select round(sum(dy_up_${day})/1024/1024/1024/1024) as tdy_up,
        round(sum(dy_dw_${day})/1024/1024/1024/1024) as tdy_dwn
        from hsi_mnthly_usge_dtl_t where yr_ct=${yearTdy} and mnt_ct=${mnthTdy}`, `select round(sum(dy_up_${yester})/1024/1024/1024/1024) as prvs_up,round(sum(dy_dw_${yester})/1024/1024/1024/1024) as prvs_dwn 
        from hsi_mnthly_usge_dtl_t where yr_ct=${yearYstrdy} and mnt_ct=${mnthYstrdy}`];
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : get_VoipCurrntMnthCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_VoipCurrntMnthCntMdl = function (user) {
    var fnm = "get_VoipCurrntMnthCntMdl"
    var QRY_TO_EXEC = `select SUM(day_01)+SUM(day_02)+SUM(day_03)+
    SUM(day_04)+SUM(day_05)+SUM(day_06)+SUM(day_07)+
    SUM(day_08)+SUM(day_09)+SUM(day_10)+SUM(day_11)+
    SUM(day_12)+SUM(day_13)+SUM(day_14)+SUM(day_15)+
    SUM(day_16)+SUM(day_17)+SUM(day_18)+SUM(day_19)+
    SUM(day_20)+SUM(day_21)+SUM(day_22)+SUM(day_23)+SUM(day_24)+
    SUM(day_25)+SUM(day_26)+SUM(day_27)+SUM(day_28)+SUM(day_29)+
    SUM(day_30)+SUM(day_31) as ct
     from rpt_mnthy_int_dtl_t
    where prm_id in (1,2)
     and yr_ct=YEAR(CURDATE()) 
    and mnth_ct=MONTH(CURDATE());`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : get_VoipUsedPhneCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_VoipUsedPhneCntMdl = function (user) {
    var fnm = "get_VoipUsedPhneCntMdl"
    var date = new Date();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth() + 1;
    var QRY_TO_EXEC = [`select count(*) as usd_cnt from
    (select count(*),phne_nu from voip_caf_phne_chrges_dtl_t as a
    join voip_phne_nmbrs_lst_t v on v.phne_nmbr_id = a.phne_nmbr_id
    GROUP BY v.phne_nu) as a`, `select count(*) as usd_cnt_crr_mnth from
    (select count(*),phne_nu from voip_caf_phne_chrges_dtl_t as a
    join voip_phne_nmbrs_lst_t v on v.phne_nmbr_id = a.phne_nmbr_id
    where call_mm=${mnthTdy} and call_yr=${yearTdy}
    GROUP BY v.phne_nu) as a`];
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getEntCafSmryCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getEntCafSmryCntsMdl = function (user) {
    var fnm = "getEntCafSmryCntsMdl"
    var QRY_TO_EXEC = `SELECT
    sum(case when c.caf_type_id = 2 AND c.trmnd_in<>1 THEN 1 ELSE 0 END) as tot_ent_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2 AND c.trmnd_in<>1  THEN 1 ELSE 0 END) as ent_prv_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1 AND c.trmnd_in<>1  THEN 1 ELSE 0 END) as ent_gov_ct,

	sum(case when c.caf_type_id = 2 AND c.actve_in=1 THEN 1 ELSE 0 END) as tot_actv_ent_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2 AND c.actve_in=1  THEN 1 ELSE 0 END) as ent_actv_prv_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1 AND c.actve_in=1  THEN 1 ELSE 0 END) as ent_actv_gov_ct,

	sum(case when c.caf_type_id = 2 AND c.spnd_in=1 THEN 1 ELSE 0 END) as tot_spnd_ent_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2 AND c.spnd_in=1  THEN 1 ELSE 0 END) as ent_spnd_prv_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1 AND c.spnd_in=1  THEN 1 ELSE 0 END) as ent_spnd_gov_ct,

	sum(case when c.caf_type_id = 2 AND c.trmnd_in=1 THEN 1 ELSE 0 END) as tot_trmnd_ent_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2 AND c.trmnd_in=1  THEN 1 ELSE 0 END) as ent_trmnd_prv_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1 AND c.trmnd_in=1  THEN 1 ELSE 0 END) as ent_trmnd_gov_ct,

	sum(case when c.caf_type_id = 2 AND c.actve_in=1 AND MONTH(c.actvn_dt)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_actv_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2 AND c.actve_in=1 AND MONTH(c.actvn_dt)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_actv_prv_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1 AND c.actve_in=1 AND MONTH(c.actvn_dt)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_actv_gov_ct,

	sum(case when c.caf_type_id = 2 AND c.spnd_in=1 AND MONTH(c.spnd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_spnd_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2 AND c.spnd_in=1 AND MONTH(c.spnd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_spnd_prv_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1 AND c.spnd_in=1 AND MONTH(c.spnd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_spnd_gov_ct
    from caf_dtl_t as c
    left join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    where c.enty_sts_id in (6,7,8,84,85) ;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getEntCafTrmndCrtMnthCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getEntCafTrmndCrtMnthCntsMdl = function (user) {
    var fnm = "getEntCafTrmndCrtMnthCntsMdl"
    var QRY_TO_EXEC = `SELECT
    sum(case when c.caf_type_id = 2 AND c.trmnd_in=1 AND MONTH(t.aprvd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_trmnd_ent_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2 AND c.trmnd_in=1 AND MONTH(t.aprvd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_trmnd_prv_ct,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1 AND c.trmnd_in=1 AND MONTH(t.aprvd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_trmnd_gov_ct
    from caf_dtl_t as c
    left join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    LEFT JOIN trmn_rqst_dtl_t t ON c.caf_id = t.caf_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getEntTopTenCafDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getEntTopTenCafDtlsMdl = function (user) {
    var fnm = "getEntTopTenCafDtlsMdl"
    var QRY_TO_EXEC = `SELECT SUM(CASE WHEN cf.caf_id is NOT NULL THEN 1 ELSE 0 END) as tot_cafs,
    SUM(CASE WHEN cf.actve_in=1 THEN 1 ELSE 0 END) as tot_actv_cafs,
    SUM(case when cf.spnd_in=1 THEN 1 ELSE 0 END) as tot_spnd_cafs,
    SUM(case when cf.trmnd_in=1 THEN 1 ELSE 0 END) as tot_trmnd_cafs,
    sum(case when cf.actve_in=1 AND MONTH(cf.actvn_dt)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_prvn_cafs,
    sum(case when cf.spnd_in=1 AND MONTH(cf.spnd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_spnd_cafs,
    sum(case when cf.trmnd_in=1 AND MONTH(t.aprvd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_trmnd_cafs,
    c.cstmr_id,c.caf_type_id,c.frst_nm,c.mdlr_nm,c.lst_nm,c.cstmr_nm,c.pymnt_lblty_in,c.loc_addr1_tx,c.loc_addr2_tx,c.loc_lcly_tx,c.loc_ara_tx,c.loc_lctn_tx,
    frqncy_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,c.loc_eml1_tx,c.cntct_nm,c.cntct_mble1_nu,e.entrpe_type_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,cf.enty_sts_id,sts_nm
    from cstmr_dtl_t c
    JOIN cstmr_dtl_t as cd on cd.prnt_cstmr_id = c.cstmr_id
    left JOIN blng_frqncy_lst_t b on b.frqncy_id =c.frqncy_id
    left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
    left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
    left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
    left join entrpe_cstmr_typ_lst_t e on  c.entrpe_type_id =e.entrpe_type_id
    left join caf_dtl_t cf on cf.cstmr_id = cd.cstmr_id
    left join enty_sts_lst_t cs on cf.enty_sts_id = cs.enty_sts_id
    LEFT JOIN trmn_rqst_dtl_t t ON cf.caf_id = t.caf_id
    WHERE c.caf_type_id =2 and c.prnt_cstmr_id = c.cstmr_id and c.a_in=1 and cf.a_in =1
    GROUP BY c.cstmr_id
    ORDER BY tot_cafs DESC limit 10`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getEntCafsLast6MnthsPrvMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getEntCafsLast6MnthsPrvMdl = function (user) {
    var fnm = "getEntCafsLast6MnthsPrvMdl"
    var QRY_TO_EXEC = ` SELECT COUNT(DISTINCT caf_id) AS mnth_prvd,
                        MONTHNAME(cf.actvn_dt) AS mnth, YEAR(cf.actvn_dt) AS cmplt_yr,DATE_FORMAT(cf.actvn_dt,'%M-%y') AS yr
                        FROM cstmr_dtl_t c
                        JOIN caf_dtl_t cf on cf.cstmr_id = c.cstmr_id
                        WHERE c.caf_type_id =2 AND YEAR(cf.actvn_dt)=YEAR(CURDATE())
                        GROUP BY MONTH(cf.actvn_dt) ORDER BY YEAR(cf.actvn_dt),MONTH(cf.actvn_dt) LIMIT 6`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_CafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_CafsMdl = function (id, user) {
    var fnm = "get_CafsMdl"
    var QRY_TO_EXEC = `select c.caf_nu,c.enty_sts_id,c.mdlwe_sbscr_id,e.sts_nm,CONCAT(c.instl_addr1_tx,',',instl_addr2_tx,',',v1.vlge_nm,' ',m1.mndl_nm,',',d.dstrt_nm) as address,
    b.frqncy_nm,p.pckge_nm,m.mdle_nm,c.onu_srl_nu,vp.phne_nu,v1.vlge_nm,m1.mndl_nm,d.dstrt_nm,a.agnt_nm,a.ofce_mbl_nu,date_format(c.actvn_ts,'%d-%m-%Y') as actvn_ts,cst.cstmr_nm,c.lmo_agnt_id,
    c.caf_type_id,c.aaa_cd,c.hsi_orgnl_prfle_tx
    from caf_dtl_t as c
        join cstmr_dtl_t cst on cst.cstmr_id=c.cstmr_id
        join enty_sts_lst_t e on e.enty_sts_id = c.enty_sts_id
        join blng_frqncy_lst_t b on b.frqncy_id = c.frqncy_id
        join pckge_lst_t p on p.pckge_id = c.crnt_pln_id
        join inv_stpbx_lst_t i on i.srl_nu=c.onu_srl_nu
        join inv_prdct_mdle_lst_t m on m.mdle_id = i.mdle_id
        left join voip_caf_phne_nmbrs_rel_t v on v.caf_id=c.caf_id
        left join voip_phne_nmbrs_lst_t vp on vp.phne_nmbr_id=v.phne_nmbr_id
        join agnt_lst_t a on a.agnt_id=c.lmo_agnt_id
        left JOIN vlge_lst_t v1 ON v1.vlge_nu = cst.loc_vlge_id and v1.mndl_id = cst.loc_mndl_id AND v1.dstrt_id = cst.loc_dstrct_id
        left JOIN mndl_lst_t m1 ON m1.mndl_nu = v1.mndl_id AND v1.dstrt_id = m1.dstrt_id
        left JOIN dstrt_lst_t d ON d.dstrt_id = v1.dstrt_id
    
        where c.cstmr_id=${id};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_CafsHsiMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_CafsHsiMdl = function (id, user) {
    var fnm = "get_CafsHsiMdl"
    var date = new Date();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth() + 1
    var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) as s_no,yr_ct,mnt_ct,
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
    WHERE caf_id= ${id} and yr_ct=${yearTdy} and mnt_ct=${mnthTdy}  
    GROUP BY yr_ct,mnt_ct
    ORDER BY yr_ct,mnt_ct;`;
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_CafsPackgesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_CafsPackgesMdl = function (id, user) {
    var fnm = "get_CafsPackgesMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY p.pckge_id) sno,p.pckge_id,
    p.pckge_nm,
    psr.srvcpk_id,s.srvcpk_nm,cd.chrge_at,cd.gst_at,p.caf_type_id,cf.caf_type_nm,s.cre_srvce_id,
    cs.cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx,DATE_FORMAT(psr.efcte_dt,'%d-%m-%Y')efcte_dt,
    DATE_FORMAT(psr.expry_dt,'%d-%m-%Y') as expry_dt,psr.efcte_dt as date,psr.expry_dt as date1,
    psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y') as plan_act,DATE_FORMAT(cpp.expry_dt,'%d-%m-%Y') as plan_exp,pc.chnle_nm,pc.chnle_cd
    from caf_dtl_t as c
    LEFT JOIN caf_pckge_prchse_dtl_t as cpp on cpp.caf_id = c.caf_id
    left JOIN pckge_lst_t p on p.pckge_id =cpp.pckge_id
    JOIN pckge_srvcpk_rel_t as psr on p.pckge_id=psr.pckge_id AND psr.a_in=1
    JOIN pckge_srvcpk_type_lst_t as t on t.srvcpk_type_id=p.pckge_type_id
    JOIN caf_type_lst_t as cf on cf.caf_type_id=p.caf_type_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=psr.srvcpk_id
    left join pckge_iptv_chnle_lst_t pc on pc.cre_srvce_id = s.cre_srvce_id
    join pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=psr.pckge_srvcpk_rel_id and cd.a_in=1
    JOIN chrge_cde_lst_t as crg on crg.chrge_cde_id=cd.chrge_cde_id
    JOIN cre_srvce_lst_t as cs on cs.cre_srvce_id=psr.cre_srvce_id
    where p.a_in=1 AND cpp.a_in=1 and c.caf_id=${id} ORDER BY t.srvcpk_type_nm desc;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_CafsVoipMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_CafsVoipMdl = function (id, year, user) {
    var fnm = "get_CafsVoipMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY vch.call_id) as s_no,c.caf_nu,CASE WHEN incmg_in = 1 THEN 'InComing' ELSE 'OutGoing' END as call_ststus
    ,DATE_FORMAT(vch.strt_ts,'%d-%m-%Y %H:%i:%s') as strt_ts,DATE_FORMAT(vch.end_ts,'%d-%m-%Y %H:%i:%s') as end_ts,vch.cals_drtn_scnds_ct
    ,SEC_TO_TIME(vch.cals_drtn_scnds_ct) as mins
    ,vch.clr_phne_nu
    ,vch.cld_phne_nu
    ,vch.cals_chrge_at,vpl.voip_oprtr_nm
    ,vch.clr_ste_id,clr.ste_nm as clr_ste_nm,vch.cld_ste_id,cld.ste_nm as cld_ste_nm
    ,CASE WHEN vch.lcl_cals_in = 1 THEN 'Local Call' WHEN vch.lcl_cals_in = 1 THEN 'STD Call'
    WHEN vch.lcl_cals_in = 1 THEN 'ISD call' END as intr_cal_sts
    FROM caf_dtl_t c
    JOIN voip_caf_phne_nmbrs_rel_t vcp ON vcp.caf_id = c.caf_id
    JOIN BSS_BATCH.voip_call_hstry_lst_t vch ON vch.caf_id = vcp.caf_id
    JOIN BSS_BATCH.voip_oprtr_lst_t vpl ON vpl.voip_oprtr_id = vch.cld_oprtr_id
    JOIN ste_lst_t clr ON clr.ste_id = vch.clr_ste_id
    JOIN ste_lst_t cld ON cld.ste_id = vch.cld_ste_id
    WHERE vch.cals_yr = ${year} and vch.caf_id = ${id}
    ORDER BY vch.call_id;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_CafsHSIlimitMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_CafsHSIlimitMdl = function (id, user) {
    var fnm = "get_CafsHSIlimitMdl"
    var date = new Date();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth() + 1
    var QRY_TO_EXEC = `select mnth_usge_lmt_ct as ttl_limit,ROUND(ttl_dwnld_ct/1024/1024/1024,2) AS usg_dwn,ROUND(ttl_upld_ct/1024/1024/1024,2) AS usg_upld from hsi_mnthly_usge_dtl_t 
    where caf_id=${id} and yr_ct=${yearTdy} and mnt_ct=${mnthTdy};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_illConnctnsCntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_illConnctnsCntMdl = function (user) {
    var fnm = "get_illConnctnsCntMdl"
    var QRY_TO_EXEC = `select COUNT(DISTINCT cstmr_id)as caf_cnt,count(*) as ttl_cnnts,sum(case when enty_sts_id=6 then 1 else 0 end) as actv_cnnts,
    sum(case when enty_sts_id=7 then 1 else 0 end) as suspd_cnnts 
    from caf_dtl_t  where  lsd_lne_in =1 and a_in =1;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : get_AllillCafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_AllillCafsMdl = function (user) {
    var fnm = "get_AllillCafsMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY c.caf_id DESC) as s_no,caf_nu,c1.cstmr_nm,mbl_nu,
    vp.phne_nu,sts_nm,a.agnt_cd,CONCAT(c.instl_addr1_tx,'',c.instl_addr2_tx) as address,vg.vlge_nm,d.dstrt_nm,
    frqncy_nm,date_format(c.actvn_dt,'%d-%m-%Y') as actvn_dt,onu_srl_nu,pckge_nm,chrge_at,a.agnt_nm,a.ofce_mbl_nu 
    from caf_dtl_t as c
        join cstmr_dtl_t as c1 on c1.cstmr_id = c.cstmr_id
        join enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
        join agnt_lst_t as a on a.agnt_id = c.lmo_agnt_id
        join blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
        join pckge_lst_t as p on p.pckge_id=c.crnt_pln_id
        left join voip_caf_phne_nmbrs_rel_t as v on v.caf_id = c.caf_id
        left join voip_phne_nmbrs_lst_t as vp on vp.phne_nmbr_id = v.phne_nmbr_id
        left JOIN vlge_lst_t vg ON vg.vlge_nu = c1.loc_vlge_id and vg.dstrt_id=c1.loc_dstrct_id and vg.mndl_id=c1.loc_mndl_id
        JOIN dstrt_lst_t d ON d.dstrt_id = c1.loc_dstrct_id
        where  lsd_lne_in =1 and c.a_in =1;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function      : get_LeasdCafsHsiMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.get_LeasdCafsHsiMdl = (id, user) => {
    var fnm = "get_LeasdCafsHsiMdl"
    var date = new Date();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth() + 1
    var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) as s_no,yr_ct,mnt_ct,
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
                        WHERE caf_id= ${id} and yr_ct=${yearTdy} and mnt_ct=${mnthTdy}
                        GROUP BY yr_ct,mnt_ct
                        ORDER BY yr_ct,mnt_ct ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function       : get_LesdcstmrInvceMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
// exports.get_LesdcstmrInvceMdl = function () {
//     var date = new Date();
//     var yearTdy = date.getFullYear();
//     var mnthTdy = date.getMonth();
//     var prvsTdy = date.getMonth()-1;
//     var QRY_TO_EXEC = `SELECT sum(invce_at) as ttl_amnt, sum(case when c.frqncy_id=1 then invce_at else 0 end) as mthly_amnt,sum(case when c.frqncy_id=2 then invce_at else 0 end) as quatly_amnt,
//     sum(case when c.frqncy_id=3 then invce_at else 0 end) as half_amnt, sum(case when c.frqncy_id=4 then invce_at else 0 end) as yrly_amnt,invce_yr,invce_mm
//      from caf_dtl_t as c
//     join erp_invce_lst_t as e on e.caf_id=c.caf_id
//     where lsd_lne_in =1 and c.a_in =1 and e.invce_yr = 2020 and e.invce_mm in (${mnthTdy},${prvsTdy}) GROUP BY e.invce_mm;`;
//     console.log(QRY_TO_EXEC)
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// };
exports.get_LesdcstmrInvceMdl = function (year, user) {
    var fnm = "get_LesdcstmrInvceMdl"
    var date = new Date();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth();
    var prvsTdy = date.getMonth() - 1;
    var QRY_TO_EXEC = `select invce_yr,invce_mm,m.mnth_nm,count(*)
    
     as TOT_CAFS_INVOICED
    ,SUM(case(c.caf_type_id) WHEN 1 THEN 1 ELSE 0 END) as 'INV_CAFS_INVOICED'
    ,SUM(case(c.caf_type_id) WHEN 2 THEN 1 ELSE 0 END) as 'ENT_CAFS_INVOICED'
    ,SUM(case when year(c.actvn_dt)=invce_yr AND month(c.actvn_dt)=invce_mm THEN 1 ELSE 0 END) as 'NEW_CAFS_INVOICED'
    ,sum(invce_at+srvc_at+cgst_at+sgst_at) as TOTAL_INVOICE_AMOUNT
    ,sum(invce_at) as INVOICE_AMOUNT
    ,sum(srvc_at+cgst_at+sgst_at) as INVOICE_TAX
    ,sum(i.apsfl_shre_at) as APSFL_SHARE
    ,sum(i.lmo_shre_at) as LMO_SHARE
    ,sum(i.mso_shre_at) as MSO_SHARE
    ,count(distinct c.lmo_agnt_id ) as LMO_CT
    ,count(distinct c.mso_agnt_id ) as MSO_CT
    ,sum(case(invce_at) WHEN 50 THEN invce_at ELSE 0 END) as BOX_INVOICED_ONLY_AMOUNT
    ,sum(case(invce_at) WHEN 50 THEN 1 ELSE 0 END) as BOX_ONLY_INVOICED_CAFS
    ,sum(prtd_in) as PRORATED_BILL_CAFS
    ,sum(i.voip_chrge_at) as VOIP_INVOICED
    ,sum(i.add_on_chrge_at) as ADDONS_INVOICED
    from erp_invce_lst_t i
     join caf_dtl_t c on i.caf_id =c.caf_id
     join mnth_dtls_t m on m.mnth_id = invce_mm
    where lsd_lne_in =1 and c.a_in =1 and invce_yr = ${year} and i.pblsd_in=1
    group by invce_yr,invce_mm
    order by invce_yr,invce_mm;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_LeasdCafsHsiMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.get_CafHsiDataMdl = (mnth, year, id, user) => {
    var fnm = "get_CafHsiDataMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) as s_no,yr_ct,mnt_ct,
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
                        WHERE caf_id= ${id} and yr_ct=${year} and mnt_ct=${mnth}
                        GROUP BY yr_ct,mnt_ct
                        ORDER BY yr_ct,mnt_ct ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function       : get_oltsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_oltsMdl = function (dstid, mndlid, user) {
    var fnm = "get_oltsMdl"
    var district = '';
    var mandal = ''
    if (dstid > 0) {
        district = `and dstrt_id=${dstid}`
    }
    if (mndlid > 0) {
        mandal = `and mndl_id=${mndlid}`
    }

    var QRY_TO_EXEC = `select olt_id,olt_nm,dstrt_id,mndl_id from olt_ltrck_dtl_t 
    where a_in=1 ${district} ${mandal}`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getEntpCstmroltcountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getEntpCstmroltcountsMdl = function (id, user) {
    var fnm = "getEntpCstmroltcountsMdl"

    var QRY_TO_EXEC = `SELECT count(*)
    as total,SUM(CASE WHEN oprtnl_ste_id = 1 THEN 1 ELSE 0 END ) as active,
   SUM(CASE WHEN oprtnl_ste_id <> 1 THEN 1 ELSE 0 END ) as inactive FROM
   (SELECT 
   c.olt_id,
   COUNT(*)
    as ttl_cafs,
   t.oprtnl_ste_id,
   (CASE WHEN t.oprtnl_ste_id=1 THEN 'Actvie OLT' else 'InActvie OLT' END) as olt_sts
   FROM caf_dtl_t  c
   JOIN olt_ltrck_dtl_t t on t.olt_id = c.olt_id
   where c.cstmr_id = ${id}
   GROUP BY c.olt_id) as a`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getEntpCstmrHourloltcountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getEntpCstmrHourloltcountsMdl = function (id, user) {
    var fnm = "getEntpCstmrHourloltcountsMdl"
    var QRY_TO_EXEC = `SELECT 
    SUM(CASE WHEN respond_delay < 1 THEN 1 ELSE 0 END ) as 'one_hr',
    SUM(CASE WHEN respond_delay < 3 AND  respond_delay < 1 THEN 1 ELSE 0 END ) as 'three_hr',
    SUM(CASE WHEN respond_delay >= 12 AND respond_delay < 24 THEN 1 ELSE 0 END ) as 'twelve_hr',
    SUM(CASE WHEN respond_delay >= 24 THEN 1 ELSE 0 END ) as 'twntfur_hr' 
from     
(SELECT c.olt_id,oprtnl_ste_chnge_ts,oprtnl_ste_id,COUNT(*) as ttl_cafs,
TIMESTAMPDIFF(hour, oprtnl_ste_chnge_ts,CURRENT_TIMESTAMP()) as respond_delay
    FROM caf_dtl_t c
    JOIN olt_ltrck_dtl_t t on t.olt_id = c.olt_id 
    WHERE oprtnl_ste_id <> 1 and c.cstmr_id = ${id}
		GROUP BY c.olt_id
ORDER BY oprtnl_ste_chnge_ts
) as a;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getEntpCstmronucountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getEntpCstmronucountsMdl = function (id,user) {
    var fnm = "getEntpCstmronucountsMdl"
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and c.lmo_agnt_id=${user.usr_ctgry_ky} `
    }
    var QRY_TO_EXEC = `select count(*)as total,SUM(CASE WHEN oprtnl_ste_id = 1 THEN 1 ELSE 0 END ) as active,
    SUM(CASE WHEN oprtnl_ste_id <> 1 || oprtnl_ste_id is null THEN 1 ELSE 0 END ) as inactive
    from onu_ltrck_dtl_t as o
    join caf_dtl_t as c on c.caf_id = o.caf_id
    join cstmr_dtl_t ct on ct.cstmr_id = c.cstmr_id
    where ct.caf_type_id =2 ${where} and  (ct.prnt_cstmr_id =  ${id.id} or ct.cstmr_id = ${id.id}) and c.enty_sts_id=6`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getEntpCstmrHourlyonucountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getEntpCstmrHourlyonucountsMdl = function (id,user) {
    var fnm = "getEntpCstmrHourlyonucountsMdl"
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and c.lmo_agnt_id=${user.usr_ctgry_ky} `
    }
    var QRY_TO_EXEC = `SELECT
    SUM(CASE WHEN respond_delay < 3 THEN 1 ELSE 0 END ) as 'three_hr',
    SUM(CASE WHEN respond_delay < 12 AND  respond_delay >= 3 THEN 1 ELSE 0 END ) as 'les_twelve_hr',
    SUM(CASE WHEN respond_delay >= 12 AND respond_delay < 24 THEN 1 ELSE 0 END ) as 'twelve_hr',
    SUM(CASE WHEN (respond_delay >= 24 || respond_delay is null) THEN 1 ELSE 0 END ) as 'twntfur_hr'
  from
(SELECT oprnl_ste_chnge_ts,oprtnl_ste_id,t.caf_id,
TIMESTAMPDIFF(hour, oprnl_ste_chnge_ts,CURRENT_TIMESTAMP()) as respond_delay
    FROM onu_ltrck_dtl_t as t
    JOIN caf_dtl_t as c on c.caf_id = t.caf_id
    join cstmr_dtl_t ct on ct.cstmr_id = c.cstmr_id
    WHERE (oprtnl_ste_id <> 1 || oprtnl_ste_id is null) and ct.caf_type_id =2 ${where} and  (ct.prnt_cstmr_id =  ${id} or ct.cstmr_id = ${id}) and c.enty_sts_id=6
ORDER BY oprnl_ste_chnge_ts
) as a`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getEntpCstmrBndWdthMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getEntpCstmrBndWdthMdl = function (id,user) {
    var fnm = "getEntpCstmrBndWdthMdl"
    var date = new Date();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth() + 1;
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and c.lmo_agnt_id=${user.usr_ctgry_ky} `
    }
    var QRY_TO_EXEC = `select  ROUND(sum(h.ttl_dwnld_ct)/1024/1024/1024,2) AS mnthdld,
    ROUND(sum(h.ttl_upld_ct)/1024/1024/1024,2) AS mnthupld,
    sum(h.mnth_usge_lmt_ct) as ttl_limit
from BSS_BATCH.hsi_mnthly_usge_dtl_t as h
join caf_dtl_t as c on c.caf_id=h.caf_id
join cstmr_dtl_t as csr on csr.cstmr_id = c.cstmr_id
where csr.caf_type_id =2 ${where} and  (csr.prnt_cstmr_id =  ${id} or csr.cstmr_id = ${id}) and yr_ct = ${yearTdy} and mnt_ct=${mnthTdy}`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getBndWdthByCafWseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getBndWdthByCafWseMdl = function (id,user) {
    var fnm = "getBndWdthByCafWseMdl"
    var date = new Date();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth();
    var prvsTdy = date.getMonth() - 1;
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and c.lmo_agnt_id=${user.usr_ctgry_ky} `
    }
    var QRY_TO_EXEC = `select  ROUND(h.ttl_dwnld_ct/1024/1024/1024,2) AS dwn,
    ROUND(h.ttl_upld_ct/1024/1024/1024,2) AS upd,
    ROUND(h.mnth_usge_lmt_ct) as ttl_limit,csr.cstmr_nm,d.dstrt_nm,m.mndl_nm,v.vlge_nm,h.caf_id
    from BSS_BATCH.hsi_mnthly_usge_dtl_t as h
    join caf_dtl_t as c on c.caf_id=h.caf_id
    join cstmr_dtl_t as csr on csr.cstmr_id = c.cstmr_id
    left join vlge_lst_t as v on v.dstrt_id = csr.loc_dstrct_id and v.mndl_id = csr.loc_mndl_id  and  v.vlge_nu = csr.loc_vlge_id
    left JOIN mndl_lst_t as m on m.dstrt_id = csr.loc_dstrct_id and m.mndl_nu = csr.loc_mndl_id
    left JOIN dstrt_lst_t as d on d.dstrt_id = csr.loc_dstrct_id
    where csr.caf_type_id =2 ${where} and  (csr.prnt_cstmr_id =  ${id} or csr.cstmr_id = ${id}) and yr_ct = ${yearTdy} and mnt_ct=${mnthTdy}`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getBndWdthPrvsMnthCMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getBndWdthPrvsMnthCMdl = function (id,user) {
    var fnm = "getBndWdthPrvsMnthCMdl"
    var date = new Date();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth();
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and c.lmo_agnt_id=${user.usr_ctgry_ky} `
    }

    var QRY_TO_EXEC = `select  ROUND(sum(h.ttl_dwnld_ct)/1024/1024/1024,2) AS mnthdld,
    ROUND(sum(h.ttl_upld_ct)/1024/1024/1024,2) AS mnthupld,
    sum(h.mnth_usge_lmt_ct) as ttl_limit
from BSS_BATCH.hsi_mnthly_usge_dtl_t as h
join caf_dtl_t as c on c.caf_id=h.caf_id
join cstmr_dtl_t as csr on csr.cstmr_id = c.cstmr_id
where csr.caf_type_id =2 ${where} and  (csr.prnt_cstmr_id =  ${id} or csr.cstmr_id = ${id}) and yr_ct = ${yearTdy} and mnt_ct=${mnthTdy}`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getTdyBndWdthMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getTdyBndWdthMdl = function (id,user) {
    var fnm = "getTdyBndWdthMdl"
    var date = new Date();
    var day = date.getDate();
    var yearTdy = date.getFullYear();
    var mnthTdy = date.getMonth() + 1;
    var date1 = new Date();
    date1.setDate(date1.getDate() - 1)
    yester = date1.getDate();
    var yearYstrdy = date1.getFullYear();
    var mnthYstrdy = date1.getMonth() + 1;
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and c.lmo_agnt_id=${user.usr_ctgry_ky} `
    }
    var QRY_TO_EXEC = `select round(sum(dy_up_${day})/1024/1024/1024/1024,2) as tdy_up,
        round(sum(dy_dw_${day})/1024/1024/1024/1024,2) as tdy_dwn
        from BSS_BATCH.hsi_mnthly_usge_dtl_t as h
        join caf_dtl_t as c on c.caf_id=h.caf_id 
        join cstmr_dtl_t as csr on csr.cstmr_id = c.cstmr_id
        where yr_ct=${yearTdy} and mnt_ct=${mnthTdy} and csr.caf_type_id =2 ${where} and  (csr.prnt_cstmr_id =  ${id} or csr.cstmr_id = ${id});`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : getCstmrhsiMnthWseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCstmrhsiMnthWseMdl = function (mnth, year,id,user) {
    var fnm = "getCstmrhsiMnthWseMdl"
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and c.lmo_agnt_id=${user.usr_ctgry_ky} `
    }
    var QRY_TO_EXEC = `select round(sum(case when dy_up_1 then dy_up_1 else null end)/1024/1024/1024/1024,2) as day_1_U,
    round(sum(case when dy_up_2 then dy_up_2 else null end)/1024/1024/1024/1024,2) as day_2_U,
    round(sum(case when dy_up_3 then dy_up_3 else null end)/1024/1024/1024/1024,2) as day_3_U,
    round(sum(case when dy_up_4 then dy_up_4 else null end)/1024/1024/1024/1024,2) as day_4_U,
    round(sum(case when dy_up_5 then dy_up_5 else null end)/1024/1024/1024/1024,2) as day_5_U,
    round(sum(case when dy_up_6 then dy_up_6 else null end)/1024/1024/1024/1024,2) as day_6_U,
    round(sum(case when dy_up_7 then dy_up_7 else null end)/1024/1024/1024/1024,2) as day_7_U,
    round(sum(case when dy_up_8 then dy_up_8 else null end)/1024/1024/1024/1024,2) as day_8_U,
    round(sum(case when dy_up_9 then dy_up_9 else null end)/1024/1024/1024/1024,2) as day_9_U,
    round(sum(case when dy_up_10 then dy_up_10 else null end)/1024/1024/1024/1024,2) as day_10_U,
    round(sum(case when dy_up_11 then dy_up_11 else null end)/1024/1024/1024/1024,2) as day_11_U,
    round(sum(case when dy_up_12 then dy_up_12 else null end)/1024/1024/1024/1024,2) as day_12_U,
    round(sum(case when dy_up_13 then dy_up_13 else null end)/1024/1024/1024/1024,2) as day_13_U,
    round(sum(case when dy_up_14 then dy_up_14 else null end)/1024/1024/1024/1024,2) as day_14_U,
    round(sum(case when dy_up_15 then dy_up_15 else null end)/1024/1024/1024/1024,2) as day_15_U,
    round(sum(case when dy_up_16 then dy_up_16 else null end)/1024/1024/1024/1024,2) as day_16_U,
    round(sum(case when dy_up_17 then dy_up_17 else null end)/1024/1024/1024/1024,2) as day_17_U,
    round(sum(case when dy_up_18 then dy_up_18 else null end)/1024/1024/1024/1024,2) as day_18_U,
    round(sum(case when dy_up_19 then dy_up_19 else null end)/1024/1024/1024/1024,2) as day_19_U,
    round(sum(case when dy_up_20 then dy_up_20 else null end)/1024/1024/1024/1024,2) as day_20_U,
    round(sum(case when dy_up_21 then dy_up_21 else null end)/1024/1024/1024/1024,2) as day_21_U,
    round(sum(case when dy_up_22 then dy_up_22 else null end)/1024/1024/1024/1024,2) as day_22_U,
    round(sum(case when dy_up_23 then dy_up_23 else null end)/1024/1024/1024/1024,2) as day_23_U,
    round(sum(case when dy_up_24 then dy_up_24 else null end)/1024/1024/1024/1024,2) as day_24_U,
    round(sum(case when dy_up_25 then dy_up_25 else null end)/1024/1024/1024/1024,2) as day_25_U,
    round(sum(case when dy_up_26 then dy_up_26 else null end)/1024/1024/1024/1024,2) as day_26_U,
    round(sum(case when dy_up_27 then dy_up_27 else null end)/1024/1024/1024/1024,2) as day_27_U,
    round(sum(case when dy_up_28 then dy_up_28 else null end)/1024/1024/1024/1024,2) as day_28_U,
    round(sum(case when dy_up_29 then dy_up_29 else null end)/1024/1024/1024/1024,2) as day_29_U,
    round(sum(case when dy_up_30 then dy_up_30 else null end)/1024/1024/1024/1024,2) as day_30_U,
    round(sum(case when dy_up_31 then dy_up_31 else null end)/1024/1024/1024/1024,2) as day_31_U,
    round(sum(case when dy_dw_1 then dy_dw_1 else null end)/1024/1024/1024/1024,2) as day_1_D,
    round(sum(case when dy_dw_2 then dy_dw_2 else null end)/1024/1024/1024/1024,2) as day_2_D,
    round(sum(case when dy_dw_3 then dy_dw_3 else null end)/1024/1024/1024/1024,2) as day_3_D,
    round(sum(case when dy_dw_4 then dy_dw_4 else null end)/1024/1024/1024/1024,2) as day_4_D,
    round(sum(case when dy_dw_5 then dy_dw_5 else null end)/1024/1024/1024/1024,2) as day_5_D,
    round(sum(case when dy_dw_6 then dy_dw_6 else null end)/1024/1024/1024/1024,2) as day_6_D,
    round(sum(case when dy_dw_7 then dy_dw_7 else null end)/1024/1024/1024/1024,2) as day_7_D,
    round(sum(case when dy_dw_8 then dy_dw_8 else null end)/1024/1024/1024/1024,2) as day_8_D,
    round(sum(case when dy_dw_9 then dy_dw_9 else null end)/1024/1024/1024/1024,2) as day_9_D,
    round(sum(case when dy_dw_10 then dy_dw_10 else null end)/1024/1024/1024/1024,2) as day_10_D,
    round(sum(case when dy_dw_11 then dy_dw_11 else null end)/1024/1024/1024/1024,2) as day_11_D,
    round(sum(case when dy_dw_12 then dy_dw_12 else null end)/1024/1024/1024/1024,2) as day_12_D,
    round(sum(case when dy_dw_13 then dy_dw_13 else null end)/1024/1024/1024/1024,2) as day_13_D,
    round(sum(case when dy_dw_14 then dy_dw_14 else null end)/1024/1024/1024/1024,2) as day_14_D,
    round(sum(case when dy_dw_15 then dy_dw_15 else null end)/1024/1024/1024/1024,2) as day_15_D,
    round(sum(case when dy_dw_16 then dy_dw_16 else null end)/1024/1024/1024/1024,2) as day_16_D,
    round(sum(case when dy_dw_17 then dy_dw_17 else null end)/1024/1024/1024/1024,2) as day_17_D,
    round(sum(case when dy_dw_18 then dy_dw_18 else null end)/1024/1024/1024/1024,2) as day_18_D,
    round(sum(case when dy_dw_19 then dy_dw_19 else null end)/1024/1024/1024/1024,2) as day_19_D,
    round(sum(case when dy_dw_20 then dy_dw_20 else null end)/1024/1024/1024/1024,2) as day_20_D,
    round(sum(case when dy_dw_21 then dy_dw_21 else null end)/1024/1024/1024/1024,2) as day_21_D,
    round(sum(case when dy_dw_22 then dy_dw_22 else null end)/1024/1024/1024/1024,2) as day_22_D,
    round(sum(case when dy_dw_23 then dy_dw_23 else null end)/1024/1024/1024/1024,2) as day_23_D,
    round(sum(case when dy_dw_24 then dy_dw_24 else null end)/1024/1024/1024/1024,2) as day_24_D,
    round(sum(case when dy_dw_25 then dy_dw_25 else null end)/1024/1024/1024/1024,2) as day_25_D,
    round(sum(case when dy_dw_26 then dy_dw_26 else null end)/1024/1024/1024/1024,2) as day_26_D,
    round(sum(case when dy_dw_27 then dy_dw_27 else null end)/1024/1024/1024/1024,2) as day_27_D,
    round(sum(case when dy_dw_28 then dy_dw_28 else null end)/1024/1024/1024/1024,2) as day_28_D,
    round(sum(case when dy_dw_29 then dy_dw_29 else null end)/1024/1024/1024/1024,2) as day_29_D,
    round(sum(case when dy_dw_30 then dy_dw_30 else null end)/1024/1024/1024/1024,2) as day_30_D,
    round(sum(case when dy_dw_31 then dy_dw_31 else null end)/1024/1024/1024/1024,2) as day_31_D
    from BSS_BATCH.hsi_mnthly_usge_dtl_t as h
    join caf_dtl_t as c on c.caf_id = h.caf_id
    join cstmr_dtl_t as csr on csr.cstmr_id = c.cstmr_id
    where mnt_ct=${mnth} and yr_ct=${year} and csr.caf_type_id =2 ${where} and  (csr.prnt_cstmr_id =  ${id} or csr.cstmr_id = ${id});`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getEntCstmrdtMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
******************************************************************************/
exports.getEntCstmrdtMdl = (id,user, callback) => {
    var fnm = "getEntCstmrdtMdl"

    console.log(user)

    var QRY_TO_EXEC = `select c.cstmr_id,c.caf_type_id,c.frst_nm,c.mdlr_nm,c.lst_nm,c.cstmr_nm,c.pymnt_lblty_in,c.loc_addr1_tx,c.loc_addr2_tx,c.loc_lcly_tx,c.loc_ara_tx,c.loc_lctn_tx,
                    frqncy_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,c.loc_eml1_tx,c.cntct_nm,c.cntct_mble1_nu,e.entrpe_type_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt
                    from cstmr_dtl_t c
                    left JOIN cstmr_dtl_t as cd on cd.prnt_cstmr_id = c.cstmr_id
                    left JOIN blng_frqncy_lst_t b on b.frqncy_id =c.frqncy_id
                    left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
                    left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
                    left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
                    left join entrpe_cstmr_typ_lst_t e on  c.entrpe_type_id =e.entrpe_type_id        
                    WHERE c.caf_type_id =2 and c.cstmr_id = ${id} and c.a_in=1 
                    GROUP BY c.cstmr_id 
                    ORDER BY d.dstrt_nm,m.mndl_nm,v.vlge_nm`;

    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : getDstrctSmmryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDstrctSmmryMdl = function (id,user) {
    var fnm = "getDstrctSmmryMdl"
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and a.agnt_id=${user.usr_ctgry_ky} `
    }
    var QRY_TO_EXEC = `select count(cf.caf_id) as ttl_caf_count,SUM(CASE WHEN cf.enty_sts_id=6 THEN 1 ELSE 0 END) as act_caf_count,SUM(CASE WHEN cf.enty_sts_id=7 THEN 1 ELSE 0 END) as sus_caf_count,
    SUM(CASE WHEN cf.enty_sts_id=8 THEN 1 ELSE 0 END) as ter_caf_count,
    SUM(CASE WHEN (cf.enty_sts_id <> 6 and cf.enty_sts_id <> 7 and cf.enty_sts_id <> 8) then 1 else 0 end) as others,sum(case when o.caf_id and cf.enty_sts_id = 6 then 1 else 0 end) as ttl_onus,
    SUM(case when oprtnl_ste_id =1 and cf.enty_sts_id = 6 then 1 else 0 end) as online_onus,SUM(CASE WHEN (oprtnl_ste_id <> 1 || oprtnl_ste_id is null) and (cf.enty_sts_id = 6 and o.caf_id) THEN 1 ELSE 0 END) as offline_onus,
    c.loc_dstrct_id,d.dstrt_nm
        from cstmr_dtl_t c
        JOIN caf_dtl_t cf on cf.cstmr_id = c.cstmr_id
        left JOIN blng_frqncy_lst_t b on b.frqncy_id =c.frqncy_id
        left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
        left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
        left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
        left join onu_ltrck_dtl_t as o on o.caf_id = cf.caf_id
        left join agro_olt_oprtnl_ste_lst_t as ao on ao.agro_oprtnl_ste_id = o.oprtnl_ste_id
        JOIN enty_sts_lst_t cs on cs.enty_sts_id = cf.enty_sts_id
        JOIN blng_frqncy_lst_t bfl on bfl.frqncy_id = c.frqncy_id
        join agnt_lst_t as a on  a.agnt_id=cf.lmo_agnt_id
        WHERE c.caf_type_id =2 ${where} and  (c.prnt_cstmr_id =  ${id} or c.cstmr_id = ${id})
        GROUP BY d.dstrt_id
ORDER BY c.loc_dstrct_id;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : getCstmrhsiMnthWseMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getcafhsiusagedataMdl = function (id,yr,mnth,user) {
    var fnm = "getcafhsiusagedataMdl"
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and c.lmo_agnt_id=${user.usr_ctgry_ky} `
    }
    var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) as s_no,yr_ct,mnt_ct,
    ROUND((case when ttl_dwnld_ct then ttl_dwnld_ct else null end)/1024/1024/1024,2) AS TD,
    ROUND((case when ttl_upld_ct then ttl_upld_ct else null end)/1024/1024/1024,2) AS TU,
    ROUND((case when ttl_dwnld_ct then ttl_dwnld_ct else null end)/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as total,
    ROUND((case when dy_up_1 then dy_up_1 else null end)/1024/1024/1024,2) AS day_1_TU,
    ROUND((case when dy_dw_1 then dy_dw_1 else null end)/1024/1024/1024,2) AS day_1_TD,
    ROUND((case when dy_up_2 then dy_up_2 else null end)/1024/1024/1024,2) AS day_2_TU,
    ROUND((case when dy_dw_2 then dy_dw_2 else null end)/1024/1024/1024,2) AS day_2_TD,
    ROUND((case when dy_up_3 then dy_up_3 else null end)/1024/1024/1024,2) AS day_3_TU,
    ROUND((case when dy_dw_3 then dy_dw_3 else null end)/1024/1024/1024,2) AS day_3_TD,
    ROUND((case when dy_up_4 then dy_up_4 else null end)/1024/1024/1024,2) AS day_4_TU,
    ROUND((case when dy_dw_4 then dy_dw_4 else null end)/1024/1024/1024,2) AS day_4_TD,
    ROUND((case when dy_up_5 then dy_up_5 else null end)/1024/1024/1024,2) AS day_5_TU,
    ROUND((case when dy_dw_5 then dy_dw_5 else null end)/1024/1024/1024,2) AS day_5_TD,
    ROUND((case when dy_up_6 then dy_up_6 else null end)/1024/1024/1024,2) AS day_6_TU,
    ROUND((case when dy_dw_6 then dy_dw_6 else null end)/1024/1024/1024,2) AS day_6_TD,
    ROUND((case when dy_up_7 then dy_up_7 else null end)/1024/1024/1024,2) AS day_7_TU,
    ROUND((case when dy_dw_7 then dy_dw_7 else null end)/1024/1024/1024,2) AS day_7_TD,
    ROUND((case when dy_up_8 then dy_up_8 else null end)/1024/1024/1024,2) AS day_8_TU,
    ROUND((case when dy_dw_8 then dy_dw_8 else null end)/1024/1024/1024,2) AS day_8_TD,
    ROUND((case when dy_up_9 then dy_up_9 else null end)/1024/1024/1024,2) AS day_9_TU,
    ROUND((case when dy_dw_9 then dy_dw_9 else null end)/1024/1024/1024,2) AS day_9_TD,
    ROUND((case when dy_up_10 then dy_up_10 else null end)/1024/1024/1024,2) AS day_10_TU,
    ROUND((case when dy_dw_10 then dy_dw_10 else null end)/1024/1024/1024,2) AS day_10_TD,
    ROUND((case when dy_up_11 then dy_up_11 else null end)/1024/1024/1024,2) AS day_11_TU,
    ROUND((case when dy_dw_11 then dy_dw_11 else null end)/1024/1024/1024,2) AS day_11_TD,
    ROUND((case when dy_up_12 then dy_up_12 else null end)/1024/1024/1024,2) AS day_12_TU,
    ROUND((case when dy_dw_12 then dy_dw_12 else null end)/1024/1024/1024,2) AS day_12_TD,
    ROUND((case when dy_up_13 then dy_up_13 else null end)/1024/1024/1024,2) AS day_13_TU,
    ROUND((case when dy_dw_13 then dy_dw_13 else null end)/1024/1024/1024,2) AS day_13_TD,
    ROUND((case when dy_up_14 then dy_up_14 else null end)/1024/1024/1024,2) AS day_14_TU,
    ROUND((case when dy_dw_14 then dy_dw_14 else null end)/1024/1024/1024,2) AS day_14_TD,
    ROUND((case when dy_up_15 then dy_up_15 else null end)/1024/1024/1024,2) AS day_15_TU,
    ROUND((case when dy_dw_15 then dy_dw_15 else null end)/1024/1024/1024,2) AS day_15_TD,
    ROUND((case when dy_up_16 then dy_up_16 else null end)/1024/1024/1024,2) AS day_16_TU,
    ROUND((case when dy_dw_16 then dy_dw_16 else null end)/1024/1024/1024,2) AS day_16_TD,
    ROUND((case when dy_up_17 then dy_up_17 else null end)/1024/1024/1024,2) AS day_17_TU,
    ROUND((case when dy_dw_17 then dy_dw_17 else null end)/1024/1024/1024,2) AS day_17_TD,
    ROUND((case when dy_up_18 then dy_up_18 else null end)/1024/1024/1024,2) AS day_18_TU,
    ROUND((case when dy_dw_18 then dy_dw_18 else null end)/1024/1024/1024,2) AS day_18_TD,
    ROUND((case when dy_up_19 then dy_up_19 else null end)/1024/1024/1024,2) AS day_19_TU,
    ROUND((case when dy_dw_19 then dy_dw_19 else null end)/1024/1024/1024,2) AS day_19_TD,
    ROUND((case when dy_up_20 then dy_up_20 else null end)/1024/1024/1024,2) AS day_20_TU,
    ROUND((case when dy_dw_20 then dy_dw_20 else null end)/1024/1024/1024,2) AS day_20_TD,
    ROUND((case when dy_up_21 then dy_up_21 else null end)/1024/1024/1024,2) AS day_21_TU,
    ROUND((case when dy_dw_21 then dy_dw_21 else null end)/1024/1024/1024,2) AS day_21_TD,
    ROUND((case when dy_up_22 then dy_up_22 else null end)/1024/1024/1024,2) AS day_22_TU,
    ROUND((case when dy_dw_22 then dy_dw_22 else null end)/1024/1024/1024,2) AS day_22_TD,
    ROUND((case when dy_up_23 then dy_up_23 else null end)/1024/1024/1024,2) AS day_23_TU,
    ROUND((case when dy_dw_23 then dy_dw_23 else null end)/1024/1024/1024,2) AS day_23_TD,
    ROUND((case when dy_up_24 then dy_up_24 else null end)/1024/1024/1024,2) AS day_24_TU,
    ROUND((case when dy_dw_24 then dy_dw_24 else null end)/1024/1024/1024,2) AS day_24_TD,
    ROUND((case when dy_up_25 then dy_up_25 else null end)/1024/1024/1024,2) AS day_25_TU,
    ROUND((case when dy_dw_25 then dy_dw_25 else null end)/1024/1024/1024,2) AS day_25_TD,
    ROUND((case when dy_up_26 then dy_up_26 else null end)/1024/1024/1024,2) AS day_26_TU,
    ROUND((case when dy_dw_26 then dy_dw_26 else null end)/1024/1024/1024,2) AS day_26_TD,
    ROUND((case when dy_up_27 then dy_up_27 else null end)/1024/1024/1024,2) AS day_27_TU,
    ROUND((case when dy_dw_27 then dy_dw_27 else null end)/1024/1024/1024,2) AS day_27_TD,
    ROUND((case when dy_up_28 then dy_up_28 else null end)/1024/1024/1024,2) AS day_28_TU,
    ROUND((case when dy_dw_28 then dy_dw_28 else null end)/1024/1024/1024,2) AS day_28_TD,
    ROUND((case when dy_up_29 then dy_up_29 else null end)/1024/1024/1024,2) AS day_29_TU,
    ROUND((case when dy_dw_29 then dy_dw_29 else null end)/1024/1024/1024,2) AS day_29_TD,
    ROUND((case when dy_up_30 then dy_up_30 else null end)/1024/1024/1024,2) AS day_30_TU,
    ROUND((case when dy_dw_30 then dy_dw_30 else null end)/1024/1024/1024,2) AS day_30_TD,
    ROUND((case when dy_up_31 then dy_up_31 else null end)/1024/1024/1024,2) AS day_31_TU,
    ROUND((case when dy_dw_31 then dy_dw_31 else null end)/1024/1024/1024,2) AS day_31_TD,mnth_usge_lmt_ct
    from BSS_BATCH.hsi_mnthly_usge_dtl_t
    WHERE caf_id= ${id} and yr_ct=${yr} and mnt_ct=${mnth}
    GROUP BY yr_ct,mnt_ct
    ORDER BY yr_ct,mnt_ct;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getbbnlEntCafSmryCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getbbnlEntCafSmryCntsMdl = function (apsfl_bbnl,user) {
        var fnm = "getbbnlEntCafSmryCntsMdl"
    var QRY_TO_EXEC = `SELECT
	sum(case when  c.actve_in=1 AND MONTH(c.actvn_dt)=MONTH(CURDATE()) and YEAR(c.actvn_dt)=YEAR(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_actv_ct,
    sum(case when   c.actve_in=1 AND MONTH(c.actvn_dt)=MONTH(CURDATE()) and YEAR(c.actvn_dt)=YEAR(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_actv_prv_ct,
    sum(case when   c.actve_in=1 AND MONTH(c.actvn_dt)=MONTH(CURDATE()) and YEAR(c.actvn_dt)=YEAR(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_actv_gov_ct,
	sum(case when  c.spnd_in=1 AND MONTH(c.spnd_ts)=MONTH(CURDATE()) and YEAR(c.actvn_dt)=YEAR(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_spnd_ct,
    sum(case when   c.spnd_in=1 AND MONTH(c.spnd_ts)=MONTH(CURDATE()) and YEAR(c.actvn_dt)=YEAR(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_spnd_prv_ct,
    sum(case when   c.spnd_in=1 AND MONTH(c.spnd_ts)=MONTH(CURDATE()) and YEAR(c.actvn_dt)=YEAR(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_spnd_gov_ct
    from caf_dtl_t as c
    left join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    where c.enty_sts_id in (6,7,8,84,85) and c.apsfl_bbnl = ${apsfl_bbnl};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getbbnlEntCafTrmndCrtMnthCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getbbnlEntCafTrmndCrtMnthCntsMdl = function (apsfl_bbnl,user) {
        var fnm = "getbbnlEntCafTrmndCrtMnthCntsMdl"
    var QRY_TO_EXEC = `SELECT
    sum(case when  c.trmnd_in=1 AND MONTH(t.aprvd_ts)=MONTH(CURDATE()) and YEAR(c.actvn_dt)=YEAR(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_trmnd_ent_ct,
    sum(case when  c.trmnd_in=1 AND MONTH(t.aprvd_ts)=MONTH(CURDATE()) and YEAR(c.actvn_dt)=YEAR(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_trmnd_prv_ct,
    sum(case when  c.trmnd_in=1 AND MONTH(t.aprvd_ts)=MONTH(CURDATE()) and YEAR(c.actvn_dt)=YEAR(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_ent_trmnd_gov_ct
    from caf_dtl_t as c
    left join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    LEFT JOIN trmn_rqst_dtl_t t ON c.caf_id = t.caf_id where c.apsfl_bbnl = ${apsfl_bbnl}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getbbnlEntTopTenCafDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getbbnlEntTopTenCafDtlsMdl = function (apsfl_bbnl,user) {
    var fnm = "getbbnlEntTopTenCafDtlsMdl"
    var QRY_TO_EXEC = `SELECT SUM(CASE WHEN cf.caf_id is NOT NULL THEN 1 ELSE 0 END) as tot_cafs,
    SUM(CASE WHEN cf.actve_in=1 THEN 1 ELSE 0 END) as tot_actv_cafs,
    SUM(case when cf.spnd_in=1 THEN 1 ELSE 0 END) as tot_spnd_cafs,
    SUM(case when cf.trmnd_in=1 THEN 1 ELSE 0 END) as tot_trmnd_cafs,
    sum(case when cf.actve_in=1 AND MONTH(cf.actvn_dt)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_prvn_cafs,
    sum(case when cf.spnd_in=1 AND MONTH(cf.spnd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_spnd_cafs,
    sum(case when cf.trmnd_in=1 AND MONTH(t.aprvd_ts)=MONTH(CURDATE()) THEN 1 ELSE 0 END) as crnt_mnth_trmnd_cafs,
    c.cstmr_id,c.caf_type_id,c.frst_nm,c.mdlr_nm,c.lst_nm,c.cstmr_nm,c.pymnt_lblty_in,c.loc_addr1_tx,c.loc_addr2_tx,c.loc_lcly_tx,c.loc_ara_tx,c.loc_lctn_tx,
    frqncy_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,c.loc_eml1_tx,c.cntct_nm,c.cntct_mble1_nu,e.entrpe_type_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,cf.enty_sts_id,sts_nm
    from cstmr_dtl_t c
    JOIN cstmr_dtl_t as cd on cd.prnt_cstmr_id = c.cstmr_id
    left JOIN blng_frqncy_lst_t b on b.frqncy_id =c.frqncy_id
    left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
    left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
    left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
    left join entrpe_cstmr_typ_lst_t e on  c.entrpe_type_id =e.entrpe_type_id
    left join caf_dtl_t cf on cf.cstmr_id = cd.cstmr_id
    left join enty_sts_lst_t cs on cf.enty_sts_id = cs.enty_sts_id
    LEFT JOIN trmn_rqst_dtl_t t ON cf.caf_id = t.caf_id
    WHERE c.caf_type_id =2 and c.prnt_cstmr_id = c.cstmr_id and c.a_in=1 and cf.a_in =1 and cf.apsfl_bbnl = ${apsfl_bbnl}
    GROUP BY c.cstmr_id
    ORDER BY tot_cafs DESC limit 10`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getbbnlEntCafsLast6MnthsPrvMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getbbnlEntCafsLast6MnthsPrvMdl = function (apsfl_bbnl,user) {
    var fnm = "getbbnlEntCafsLast6MnthsPrvMdl"
    var QRY_TO_EXEC = ` SELECT COUNT(DISTINCT caf_id) AS mnth_prvd,
                        MONTHNAME(cf.actvn_dt) AS mnth, YEAR(cf.actvn_dt) AS cmplt_yr,DATE_FORMAT(cf.actvn_dt,'%M-%y') AS yr
                        FROM cstmr_dtl_t c
                        JOIN caf_dtl_t cf on cf.cstmr_id = c.cstmr_id
                        WHERE YEAR(cf.actvn_dt)=YEAR(CURDATE()) and cf.apsfl_bbnl = ${apsfl_bbnl}
                        GROUP BY MONTH(cf.actvn_dt) ORDER BY MONTH(cf.actvn_dt),YEAR(cf.actvn_dt) LIMIT 6`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : get_BbnlAllCafCountsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_BbnlAllCafCountsMdl = function (data, user) {
    var fnm = "get_BbnlAllCafCountsMdl"
    var dstrctCond = ``;
    if (data.dstrct_fltr == true) {
        if (data.slctdDstrct != null) {
            dstrctCond = `AND c.instl_dstrct_id=${data.slctdDstrct}`;
        } else {
            dstrctCond = `AND c.instl_dstrct_id=${user.hyrchy_grp_id}`;
        }

    }
    var QRY_TO_EXEC = `select (sum(case when c.caf_type_id = 1 and apsfl_bbnl=3 THEN 1 ELSE 0 END) +
    sum(case when c.caf_type_id = 2 and apsfl_bbnl=3 THEN 1 ELSE 0 END) ) as ttl_cnt,
    sum(case when c.caf_type_id = 1 and apsfl_bbnl=3 THEN 1 ELSE 0 END) as ind_cnt,
    sum(case when c.caf_type_id = 2 and apsfl_bbnl=3 THEN 1 ELSE 0 END) as ent_cnt,
    sum(case when c.caf_type_id = 2 and apsfl_bbnl=3 and (cd.entrpe_type_id in (0,2,3) or cd.entrpe_type_id is NULL)  THEN 1 ELSE 0 END) as ent_priv_cnt,
    sum(case when c.caf_type_id = 2 and apsfl_bbnl=3 and cd.entrpe_type_id =1  THEN 1 ELSE 0 END) as ent_govt_cnt,
    sum(case when c.caf_type_id = 2 and apsfl_bbnl=3 and cd.entrpe_type_id is NULL  THEN 1 ELSE 0 END) as rmng_ent_govt_cnt
    from caf_dtl_t as c
    left join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
    where c.enty_sts_id in (6,7,84,85) ${dstrctCond};`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};
/*****************************************************************************
* Function       : oltcounts
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.oltcountsMdl = function (user) {
    var fnm = "oltcountsMdl"
    var QRY_TO_EXEC = ` select count(*) as 'count' from olt_ltrck_dtl_t  `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function       : oltlistview
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.oltlistviewMdl = function (user) {
    var fnm = "oltlistviewMdl"
    var QRY_TO_EXEC = ` select * from olt_ltrck_dtl_t  `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : entlistviwesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.entlistviwesMdl = function (user,data) {
    var fnm = "entlistviwesMdl"
	var con=``;
	if(data.id==1){
		con=`caf_type_id = 2 AND enty_sts_id NOT IN (8) AND apsfl_bbnl IN (3) `
	}
	if(data.id==2){
		con=`caf_type_id = 2 AND enty_sts_id NOT IN (8) AND apsfl_bbnl IN (5) `
	}
	if(data.id==3){
		con=`caf_type_id = 2 AND enty_sts_id NOT IN (8) AND apsfl_bbnl IN (4) `
	}
	
    var QRY_TO_EXEC = ` select c.caf_id,c.lmo_agnt_id,c.mbl_nu,a.agnt_cd,d.districtname as district_Name from caf_dtl_t as c 
join agnt_lst_t as a on  a.agnt_id = c.lmo_agnt_id
join districts as d on d.districtuid = c.instl_dstrct_id
where ${con}
 `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}