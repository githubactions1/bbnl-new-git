// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');
var jsSHA = require('jssha');
var smsutil = require(appRoot + '/utils/sms.utils');




/*****************************************************************************
* Function       : getLgnUsrExstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.getLgnUsrExstMdl = function (data, user) {
    var fnm = "getLgnUsrExstMdl"
    var QRY_TO_EXEC = `select c.mrcht_usr_id, c.mbl_nu, m.cstmr_id from mrcht_usr_lst_t c 
    join mrcht_usr_cstmr_rel_t m on m.mrcht_usr_id  =  c.mrcht_usr_id where c.mbl_nu=${data.mbl_no}; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getMyTotalCafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.getMyTotalCafsMdl = function (mbl_nu) {
    var fnm = "getMyTotalCafsMdl"
    var QRY_TO_EXEC = ` select * FROM   `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};



/*****************************************************************************
* Function       : getClntUsrDtlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getClntUsrDtlMdl = function (data, user) {
    var fnm = "getClntUsrDtlMdl"
    // and c.adhr_nu = ${data.adhr_nu} 
    var QRY_TO_EXEC = `select c.cntct_mble1_nu, c.cstmr_id, m.mbl_nu from cstmr_dtl_t c 
    left join mrcht_usr_lst_t m on c.cntct_mble1_nu = m.mbl_nu where c.cntct_mble1_nu=${data.mbl_no} limit 1; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : createClntUsrMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.createClntUsrMdl = function (data, user) {
    var fnm = "createClntUsrMdl"
    var QRY_TO_EXEC = `insert into mrcht_usr_lst_t(mrcht_usr_nm,pswrd_encrd_tx, mbl_nu, usr_ctgry_id) values(${data.mbl_no},sha1(${data.mbl_no}),${data.mbl_no},4) `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


exports.insrtMrchtCstmrRelMdl = function (data, user) {
    var fnm = "insrtMrchtCstmrRelMdl"
    var QRY_TO_EXEC = `insert into mrcht_usr_cstmr_rel_t(mrcht_usr_id, cstmr_id) values(${data.mrcht_usr_id}, ${data.cstmr_id});`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : getSMSOTPMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getSMSOTPMdl = function (data, user) {
    var fnm = "getSMSOTPMdl"

    var QRY_TO_EXEC = `INSERT INTO usr_otp_t (usr_mbl_nu, code, uuid,a_in, i_ts) VALUES(${data.usr_mbl}, ${data.code}, null,1,current_timestamp());`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/*****************************************************************************
* Function       : verifyOtpMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.verifyOtpMdl = function (data, user) {
    var fnm = "verifyOtpMdl"
    var QRY_TO_EXEC = `select * from usr_otp_t where usr_mbl_nu=${data.mbl_nu} and code=${data.otp} ORDER BY i_ts desc limit 1;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getMyCAfDetails
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMyCAfDetailsMDl = function (cstmr_id, user) {
    var fnm = "getMyCAfDetailsMDl"
    var QRY_TO_EXEC = `SELECT cs.cstmr_id, cs.tle_nm, cs.lst_nm, cs.cstmr_nm, cs.cntct_mble1_nu, cf.caf_id, cf.mbl_nu, cf.adhr_nu, cf.crnt_pln_id, cf.onu_stpbx_id,
    cf.onu_srl_nu, cf.onu_mac_addr_tx, cf.iptv_stpbx_id, cf.iptv_srl_nu, cf.iptv_mac_addr_tx, p.pckge_id, p.pckge_nm, p.chrge_at,cf.mdlwe_sbscr_id,
    p.gst_at, DATE_FORMAT(p.expry_dt,'%M %d, %Y') as expry_dt,  b.frqncy_nm,
    cf.lmo_agnt_id as usr_ctgry_ky, group_concat(phne_nu) as phne_nu,cf.caf_type_id,es.sts_nm,es.sts_clr_cd_tx,a.sbcr_alw_in, a.sbcr_lmo_upi_id
    FROM caf_dtl_t cf
    JOIN cstmr_dtl_t cs on cs.cstmr_id = cf.cstmr_id
    JOIN pckge_lst_t  p on p.pckge_id = cf.crnt_pln_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    left JOIN voip_caf_phne_nmbrs_rel_t v on v.caf_id = cf.caf_id
    left JOIN voip_phne_nmbrs_lst_t vp on vp.phne_nmbr_id = v.phne_nmbr_id
    left join blng_frqncy_lst_t b on b.frqncy_id = cf.frqncy_id
    left join agnt_lst_t a on a.agnt_id = cf.lmo_agnt_id
    WHERE cs.cstmr_id = ${cstmr_id} and cf.a_in = 1
    group by cf.caf_id
    ORDER BY cf.caf_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getCallHistoryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCallHistoryMdl = function (year, month, caf_id, lmt_start, lmt_end) {
    var fnm = "getCallHistoryMdl"
    let whr_cnd = ` `
    let yr_cnd = `  AND vch.cals_yr = ${year} `;
    let mnt_cnd = ` AND vch.cals_mm = ${month} `
    if (year != 9999) {
        whr_cnd += yr_cnd;
    }
    if (month != 9999) {
        whr_cnd += mnt_cnd
    }

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER (ORDER BY vch.strt_ts DESC) as s_no,
    c.caf_nu, incmg_in, (CASE WHEN incmg_in = 1 THEN 'InComing' ELSE 'OutGoing' END) as call_ststus,
    (CASE WHEN DATE(vch.strt_ts) = CURDATE() THEN 'Today' ELSE DATE_FORMAT(vch.strt_ts,'%M %d, %Y') end ) as strt_dt,
    TIME_FORMAT(vch.strt_ts, '%h:%i %p') as strt_tm,
    DATE_FORMAT(vch.strt_ts,'%d-%m-%Y %H:%i:%s') as strt_ts,
    DATE_FORMAT(vch.end_ts,'%d-%m-%Y %H:%i:%s') as end_ts,
    vch.cals_drtn_scnds_ct,
    CONCAT_WS(':', FLOOR(SEC_TO_TIME(vch.cals_drtn_scnds_ct) / 60),SEC_TO_TIME(vch.cals_drtn_scnds_ct) % 60) as mins,
    vch.cals_chrge_at,vch.clr_phne_nu,vch.cld_phne_nu,vpl.voip_oprtr_nm,
    vch.clr_ste_id,clr.ste_nm as clr_ste_nm,vch.cld_ste_id,cld.ste_nm as cld_ste_nm,
    (CASE WHEN vch.lcl_cals_in = 1 THEN 'Local' WHEN vch.lcl_cals_in = 1 THEN 'STD' WHEN vch.lcl_cals_in = 1 THEN 'ISD' END) as intr_cal_sts
    FROM BSS_BATCH.caf_dtl_t c
    JOIN BSS_BATCH.voip_caf_phne_nmbrs_rel_t vcp ON vcp.caf_id = c.caf_id
    JOIN BSS_BATCH.voip_call_hstry_lst_t vch ON vch.caf_id = vcp.caf_id
    JOIN BSS_BATCH.voip_oprtr_lst_t vpl ON vpl.voip_oprtr_id = vch.cld_oprtr_id
    JOIN BSS_BATCH.ste_lst_t clr ON clr.ste_id = vch.clr_ste_id
    JOIN BSS_BATCH.ste_lst_t cld ON cld.ste_id = vch.cld_ste_id
    WHERE vch.caf_id = ${caf_id} ${whr_cnd}
    ORDER BY vch.strt_ts DESC LIMIT ${lmt_start}, ${lmt_end}; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};




/*****************************************************************************
* Function       : getHSIHistoryMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getHSIHistoryMdl = function (year, month, caf_id, lmt_start, lmt_end) {
    var fnm = "getHSIHistoryMdl"
    let whr_cnd = ` `
    let yr_cnd = `  AND vch.cals_yr = ${year} `;
    let mnt_cnd = ` AND vch.cals_mm = ${month} `
    if (year != 9999) {
        whr_cnd += yr_cnd;
    }
    if (month != 9999) {
        whr_cnd += mnt_cnd
    }

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER()OVER(ORDER BY DATE(dt)) as s_no,DATE_FORMAT(dt,'%d-%m-%Y') as dt,
    SUM(ROUND(((inpt_octcts_ct/1024)/1024)/1024 , 3)) dwnldsize, SUM(ROUND(((otpt_gwrds_ct/1024)/1024)/1024 , 3)) upldsize, 
    SUM(ROUND(((inpt_octcts_ct/1024)/1024)/1024 , 3)) + SUM(ROUND(((otpt_gwrds_ct/1024)/1024)/1024 , 3)) as  totalsize
    FROM BSS_BATCH.hsi_dly_usge_dtl_t
    WHERE caf_id = ${caf_id} ${whr_cnd}
    GROUP BY DATE(dt)
    ORDER BY  DATE(dt) DESC LIMIT ${lmt_start}, ${lmt_end}; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};





/*****************************************************************************
* Function       : getMyPlanDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMyPlanDetailsMdl = function (cstmr_id, caf_id, user) {
    var fnm = "getMyPlanDetailsMdl"
    var QRY_TO_EXEC = ` SELECT cf.caf_id, cf.mbl_nu, cf.adhr_nu, cf.crnt_pln_id, cf.onu_stpbx_id,
    cf.onu_srl_nu, cf.onu_mac_addr_tx, cf.iptv_stpbx_id, cf.iptv_srl_nu, cf.iptv_mac_addr_tx, p.pckge_id, p.pckge_nm
    FROM caf_dtl_t cf
    JOIN pckge_lst_t  p on p.pckge_id = cf.crnt_pln_id
    WHERE cf.cstmr_id = ${cstmr_id}  and cf.caf_id = ${caf_id}
	ORDER BY cf.caf_id `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getSMSOTPMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMyPlanDetailsMdl = function (cstmr_id, user) {
    var fnm = "getMyPlanDetailsMdl"
    var QRY_TO_EXEC = ` SELECT cf.caf_id, cf.mbl_nu, REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu, cf.crnt_pln_id, cf.onu_stpbx_id,
    cf.onu_srl_nu, cf.onu_mac_addr_tx, cf.iptv_stpbx_id, cf.iptv_srl_nu, cf.iptv_mac_addr_tx, p.pckge_id, p.pckge_nm
    FROM caf_dtl_t cf
    JOIN pckge_lst_t  p on p.pckge_id = cf.crnt_pln_id
    WHERE cstmr_id = ${cstmr_id} 
	ORDER BY cf.caf_id `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getInternetPlanDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getInternetPlanDetailsMdl = function (cstmr_id, caf_id, user) {
    var fnm = "getInternetPlanDetailsMdl"
    var QRY_TO_EXEC = ` SELECT cf.caf_id, cf.mbl_nu, cf.adhr_nu, cf.crnt_pln_id, cf.onu_stpbx_id,
	cf.onu_srl_nu, cf.onu_mac_addr_tx, cf.iptv_stpbx_id, cf.iptv_srl_nu, cf.iptv_mac_addr_tx, p.pckge_id, p.pckge_nm, spl.srvcpk_nm,hp.prpry_nm,sh.vle_tx
	FROM caf_dtl_t cf
	JOIN pckge_lst_t  p on p.pckge_id = cf.crnt_pln_id
	JOIN pckge_srvcpk_rel_t sp on sp.pckge_id = p.pckge_id
	JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = sp.srvcpk_id
	JOIN pckge_hsi_prpry_srvcpk_rel_t as sh on sh.srvcpk_id=spl.srvcpk_id
	JOIN pckge_hsi_prpry_lst_t as hp on hp.prpry_id=sh.prpry_id
	WHERE cf.cstmr_id = ${cstmr_id} and cf.caf_id = ${caf_id} and sp.cre_srvce_id = 1 
	ORDER BY cf.caf_id; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getIPTVChnlCntDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getIPTVChnlCntDetailsMdl = function (cstmr_id, caf_id, user) {
    var fnm = "getIPTVChnlCntDetailsMdl"
    var QRY_TO_EXEC = ` SELECT cf.caf_id, cf.mbl_nu, cf.adhr_nu, cf.crnt_pln_id, cf.onu_stpbx_id,
	cf.onu_srl_nu, cf.onu_mac_addr_tx, cf.iptv_stpbx_id, cf.iptv_srl_nu, cf.iptv_mac_addr_tx, p.pckge_id, p.pckge_nm, spl.srvcpk_nm, COUNT(*) as ttl_chnl
	FROM caf_dtl_t cf
	JOIN pckge_lst_t  p on p.pckge_id = cf.crnt_pln_id
	JOIN pckge_srvcpk_rel_t sp on sp.pckge_id = p.pckge_id
	JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = sp.srvcpk_id
	JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = sp.srvcpk_id
	JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id
	WHERE cf.cstmr_id = ${cstmr_id} and cf.caf_id = ${caf_id} and sp.cre_srvce_id = 2 
	ORDER BY cf.caf_id; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
 

/*****************************************************************************
* Function       : getCallsPlanDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCallsPlanDetailsMdl = function (cstmr_id, caf_id, user) {
    var fnm = "getCallsPlanDetailsMdl"
    var QRY_TO_EXEC = ` SELECT cf.caf_id, cf.mbl_nu, cf.adhr_nu, cf.crnt_pln_id, cf.onu_stpbx_id,
	cf.onu_srl_nu, cf.onu_mac_addr_tx, cf.iptv_stpbx_id, cf.iptv_srl_nu, cf.iptv_mac_addr_tx, p.pckge_id, p.pckge_nm, spl.srvcpk_nm
	FROM caf_dtl_t cf
	JOIN pckge_lst_t  p on p.pckge_id = cf.crnt_pln_id
	JOIN pckge_srvcpk_rel_t sp on sp.pckge_id = p.pckge_id
	JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = sp.srvcpk_id
	WHERE cf.cstmr_id = ${cstmr_id} and cf.caf_id = ${caf_id} and sp.cre_srvce_id = 3 
	ORDER BY cf.caf_id; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};







/*****************************************************************************
* Function       : getDueDateDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDueDateDetailsMdl = function (cstmr_id) {
    var fnm = "getDueDateDetailsMdl"
    var QRY_TO_EXEC = `  `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function       : getAllGeneresMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAllGeneresMdl = function (cstmr_id, user) {
    var fnm = "getAllGeneresMdl"
    var QRY_TO_EXEC = `SELECT g.genre_id,g.genre_nm, pc.chnle_id, pc.chnle_nm FROM
	genre_lst_t g
	JOIN pckge_iptv_chnle_genre_rel_t cg on cg.genre_id = g.genre_id
	JOIN pckge_iptv_chnle_lst_t pc on pc.chnle_id = cg.chnle_id
    WHERE  g.a_in =1 and pc.a_in =1;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getMyChannelsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMyChannelsMdl = function (caf_id, cstmr_id, user) {
    var fnm = "getMyChannelsMdl"
    var QRY_TO_EXEC = `SELECT cf.caf_id, cf.mbl_nu, cf.adhr_nu, cf.crnt_pln_id, cf.onu_stpbx_id,
    cf.onu_srl_nu, cf.onu_mac_addr_tx, cf.iptv_stpbx_id, cf.iptv_srl_nu, cf.iptv_mac_addr_tx,
    p.pckge_id, p.pckge_nm, spl.srvcpk_nm,
    g.genre_id, g.genre_nm, chl.chnle_id, chl.chnle_nm,chr.chrge_at ,chr.gst_at, l.lnge_nm
    FROM caf_dtl_t cf
    JOIN pckge_lst_t p on p.pckge_id = cf.crnt_pln_id
    JOIN pckge_srvcpk_rel_t sp on sp.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = sp.srvcpk_id
    JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = sp.srvcpk_id
    JOIN pckge_iptv_chnle_lst_t chl on chl.chnle_id = ch.chnle_id
    JOIN pckge_iptv_chnle_genre_rel_t chg on chg.chnle_id = chl.chnle_id
    JOIN genre_lst_t g on g.genre_id = chg.genre_id
    JOIN pckge_chrge_dtl_t as chr on chr.pckge_srvcpk_rel_id =sp.pckge_srvcpk_rel_id
    JOIN lnge_lst_t as l on l.lnge_id = chl.lnge_id
    WHERE cf.cstmr_id = ${cstmr_id} and cf.caf_id = ${caf_id}  and sp.cre_srvce_id = 2
    group by  chl.chnle_id
    ORDER BY g.genre_nm, chl.chnle_nm; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

exports.getCafCallhistoryMdl = function (yr, mnt, cfId) {
    var fnm = "getCafCallhistoryMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY vch.call_id) as s_no,c.caf_nu,c.caf_type_id,CASE WHEN incmg_in = 1 THEN 'InComing' ELSE 'OutGoing' END as call_ststus
    ,DATE_FORMAT(vch.strt_ts,'%d-%m-%Y %H:%i:%s') as strt_ts,DATE_FORMAT(vch.end_ts,'%d-%m-%Y %H:%i:%s') as end_ts,vch.cals_drtn_scnds_ct
    ,SEC_TO_TIME(vch.cals_drtn_scnds_ct) as mins,CEIL(vch.cals_drtn_scnds_ct / 60) as extMin
    ,vch.clr_phne_nu
    ,vch.cld_phne_nu
    ,vch.cals_chrge_at,vpl.voip_oprtr_nm
    ,vch.clr_ste_id,clr.ste_nm as clr_ste_nm,vch.cld_ste_id,cld.ste_nm as cld_ste_nm
    ,CASE WHEN vch.lcl_cals_in = 1 THEN 'Local Call' WHEN vch.lcl_cals_in = 1 THEN 'STD Call'
    WHEN vch.lcl_cals_in = 1 THEN 'ISD call' END as intr_cal_sts,es.sts_nm,es.sts_clr_cd_tx
    FROM caf_dtl_t c
    JOIN voip_caf_phne_nmbrs_rel_t vcp ON vcp.caf_id = c.caf_id
    JOIN BSS_BATCH.voip_call_hstry_lst_t vch ON vch.caf_id = vcp.caf_id
    JOIN BSS_BATCH.voip_oprtr_lst_t vpl ON vpl.voip_oprtr_id = vch.cld_oprtr_id
    JOIN BSS_ONLINE_U.enty_sts_lst_t es on es.enty_sts_id = c.enty_sts_id
    JOIN ste_lst_t clr ON clr.ste_id = vch.clr_ste_id
    JOIN ste_lst_t cld ON cld.ste_id = vch.cld_ste_id
    WHERE vch.cals_yr = ${yr} and vch.cals_mm = ${mnt} and vch.caf_id = ${cfId}
    ORDER BY vch.call_id;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


exports.getTotalCallChrgeMdl = function (yr, mnt, cfId) {
    var fnm = "getTotalCallChrgeMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY vch.call_id) as s_no,c.caf_nu,c.caf_type_id,CASE WHEN incmg_in = 1 THEN 'InComing' ELSE 'OutGoing' END as call_ststus
    ,DATE_FORMAT(vch.strt_ts,'%d-%m-%Y %H:%i:%s') as strt_ts,DATE_FORMAT(vch.end_ts,'%d-%m-%Y %H:%i:%s') as end_ts,vch.cals_drtn_scnds_ct
    ,SEC_TO_TIME(vch.cals_drtn_scnds_ct) as mins,CEIL(vch.cals_drtn_scnds_ct / 60) as extMin
    ,vch.clr_phne_nu
    ,vch.cld_phne_nu
    ,sum(vch.cals_chrge_at) as ttl_at, ROUND(ROUND(sum(vch.cals_chrge_at))*0.18,2) as gst_at,(sum(vch.cals_chrge_at) - ROUND(ROUND(sum(vch.cals_chrge_at))*0.18,2)) as chrge_at,   vpl.voip_oprtr_nm
    ,vch.clr_ste_id,clr.ste_nm as clr_ste_nm,vch.cld_ste_id,cld.ste_nm as cld_ste_nm
    ,CASE WHEN vch.lcl_cals_in = 1 THEN 'Local Call' WHEN vch.lcl_cals_in = 1 THEN 'STD Call'
    WHEN vch.lcl_cals_in = 1 THEN 'ISD call' END as intr_cal_sts,es.sts_nm,es.sts_clr_cd_tx
    FROM caf_dtl_t c
    JOIN voip_caf_phne_nmbrs_rel_t vcp ON vcp.caf_id = c.caf_id
    JOIN BSS_BATCH.voip_call_hstry_lst_t vch ON vch.caf_id = vcp.caf_id
    JOIN BSS_BATCH.voip_oprtr_lst_t vpl ON vpl.voip_oprtr_id = vch.cld_oprtr_id
    JOIN BSS_ONLINE_U.enty_sts_lst_t es on es.enty_sts_id = c.enty_sts_id
    JOIN ste_lst_t clr ON clr.ste_id = vch.clr_ste_id
    JOIN ste_lst_t cld ON cld.ste_id = vch.cld_ste_id
    WHERE vch.cals_yr = ${yr} and vch.cals_mm = ${mnt} and vch.caf_id = ${cfId}
    group by c.caf_id
    ORDER BY vch.call_id;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getAddonsFromCAFMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAddonsFromCAFMdl = function (caf_id) {
    var fnm = "getTotalCallChrgeMdl"
    var QRY_TO_EXEC = ` SELECT 
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, 
    cp.pkge_prche_id,
    p.pckge_id,
    1 as pkcge_idnty, p.pckge_type_id,
    p.pckge_nm, p.chrge_at, p.gst_at,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
    spl.srvcpk_id,
    spl.srvcpk_nm, chl.chnle_id, chl.chnle_nm,
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt
    FROM caf_pckge_prchse_dtl_t cp
	JOIN pckge_lst_t p on p.pckge_id = cp.pckge_id
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_iptv_chnle_lst_t  chl on chl.chnle_id = ch.chnle_id
    WHERE cp.caf_id = ${caf_id} AND spr.cre_srvce_id = 2 AND cp.a_in = 1 AND  p.a_in = 1 AND spl.a_in = 1
    ORDER BY p.pckge_type_id; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function      : getcafDtlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/

exports.getcafDtlsMdl = (id, user, callback) => {
    var fnm = "getcafDtlsMdl"

    var QRY_TO_EXEC = `SELECT c.caf_id, c.caf_nu,c.mbl_nu,c.actvn_dt,c.onu_srl_nu,c.onu_mac_addr_tx,
    c.iptv_srl_nu,c.iptv_mac_addr_tx,cst.cstmr_nm as frst_nm,cst.lst_nm,cst.cstmr_id,cst.cstmr_nm,c.instl_lcly_tx,cs.sts_nm,cs.sts_clr_cd_tx,c.enty_sts_id,DATE_FORMAT(c.spnd_ts,'%d-%m-%Y') as spnd_ts,
    DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvn_ts,DATE_FORMAT(c.trmnd_ts,'%d-%m-%Y') as trmnd_ts,fr.frqncy_nm,
    ct.caf_type_nm, md.mdle_nm as onu_mdl_nm,md1.mdle_nm as iptv_mdl_nm,REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.adhr_nu as full_adhr_nu,c.mdlwe_sbscr_id,
    c.olt_prt_nm,c.olt_crd_nu,c.olt_prt_splt_tx,group_concat(vps.phne_nu) as phne_nu,count(vps.phne_nu) as phne_nu_cnt,c.caf_type_id,
    '' as pswrd_txt,md.emi_at,pl.pckge_nm,pl.pckge_id,
    c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,c.instl_vlge_id,
    v.vlge_nm,m.mndl_nm,d.dstrt_nm, c.instl_ste_id, c.instl_std_cd, cst.loc_eml1_tx as email, cst.loc_std_cd,alt.agnt_nm,alt.agnt_cd,alt.ofce_mbl_nu,c.aghra_cd,c.aaa_cd,
    c.olt_id,c.pop_id,c.olt_ip_addr_tx,c.olt_srl_nu,c.olt_prt_nm,c.olt_prt_splt_tx,
    c.olt_ip_addr_tx ,ol.olt_srl_nu ,ol.olt_nm,ol.pop_id,ol.sbstn_unq_cd,ol.olt_srl_nu,ol.sbstn_nm,
    DATE_FORMAT(ol.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as  oprnl_sts_chnge_ts,DATE_FORMAT(ol.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts
    ,DATE_FORMAT(ol.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,oste.ste_nm,ast.sts_nm as ahgra_sts_nm,
    cnt.mble1_ph as netwrk_mbl_nu, cnt.cntct_nm as netwrk_cntct_nm,
    cntt.mble1_ph as sales_mbl_nu, cntt.cntct_nm as sales_cntct_nm,
    DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts
    from caf_dtl_t c
    left JOIN enty_sts_lst_t cs on cs.enty_sts_id = c.enty_sts_id
    join caf_type_lst_t ct on ct.caf_type_id =c.caf_type_id
    join cstmr_dtl_t cst on cst.cstmr_id =c.cstmr_id
    left JOIN inv_stpbx_lst_t as i on i.caf_id=c.caf_id AND i.prdct_id =1
    left JOIN inv_stpbx_lst_t as i1 on i1.caf_id=c.caf_id AND i1.prdct_id =2
    left JOIN inv_prdct_mdle_lst_t as md on md.mdle_id=i.mdle_id
    left JOIN inv_prdct_mdle_lst_t as md1 on md1.mdle_id=i1.mdle_id
    left JOIN vlge_lst_t v ON v.vlge_nu = cst.loc_vlge_id and v.mndl_id = cst.loc_mndl_id AND v.dstrt_id = cst.loc_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    left JOIN pckge_lst_t as pl on pl.pckge_id = c.crnt_pln_id
    left JOIN blng_frqncy_lst_t as fr on fr.frqncy_id = cst.frqncy_id
    left JOIN agnt_lst_t as alt on alt.agnt_id = c.lmo_agnt_id
    left join olt_ltrck_dtl_t ol on c.olt_id =ol.olt_id
    left JOIN agro_olt_oprtnl_ste_lst_t oste on ol.oprtnl_ste_id =oste.agro_oprtnl_ste_id
    left JOIN agro_olt_sts_lst_t ast on ast.agro_sts_id =ol.olt_sts_id
    LEFT JOIN cntct_lst_t cnt ON c.instl_dstrct_id = cnt.dstrct_id AND cnt.cntct_ctgry_id=1
    LEFT JOIN cntct_lst_t cntt ON c.instl_dstrct_id = cntt.dstrct_id AND cntt.cntct_ctgry_id=2
    where c.caf_id= ${id} AND c.a_in= 1
    GROUP BY c.caf_id`;

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getcafVoipDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafVoipDtlsMdl = (id, user) => {
    var fnm = "getcafVoipDtlsMdl"
    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER (ORDER BY v.call_yr,v.call_mm) as s_no,vp.phne_nu,v.*,SUM(v.std_chrge_at + v.isd_chrge_at+v.lcl_chrge_at) as total from voip_caf_phne_chrges_dtl_t v
                    JOIN voip_phne_nmbrs_lst_t as vp on vp.phne_nmbr_id = v.phne_nmbr_id
                    where caf_id = ${id}
                    GROUP BY v.call_mm
                    ORDER BY v.call_yr,v.call_mm;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function       : getChannelsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getChannelsMdl = function (srvc_pck_id) {
    var fnm = "getChannelsMdl"
    var QRY_TO_EXEC = ` SELECT chl.chnle_id, chl.chnle_nm, sp.srvcpk_id  FROM pckge_iptv_chnle_lst_t chl
    JOIN  pckge_iptv_chnle_srvcpk_rel_t sp on sp.chnle_id = chl.chnle_id
    WHERE sp.srvcpk_id = ${srvc_pck_id} AND chl.a_in = 1 ORDER BY chl.chnle_nm; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};



/*****************************************************************************
* Function       : getCAFSelectdPackageMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCAFSelectdPackageMdl = function (caf_id) {
    var fnm = "getCAFSelectdPackageMdl"
    var QRY_TO_EXEC = ` SELECT p.pckge_id,p.pckge_nm,p.efcte_dt,p.expry_dt,s.srvcpk_id,s.srvcpk_nm,s.cre_srvce_id,cd.chrge_at,cd.gst_at
    FROM caf_dtl_t c
	JOIN pckge_lst_t p on p.pckge_id = c.crnt_pln_id
    JOIN pckge_srvcpk_rel_t as ps on ps.pckge_id=p.pckge_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=ps.srvcpk_id
    JOIN pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=ps.pckge_srvcpk_rel_id
    where c.caf_id = ${caf_id}
    group by p.pckge_id,s.srvcpk_id
    ORDER BY p.pckge_id; `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function      : getCafCstmrDtlsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getCafCstmrDtlsMdl = (data, user) => {
    var fnm = "getCafCstmrDtlsMdl"


    var QRY_TO_EXEC = `SELECT
    cf.actvn_dt, cf.caf_id, cf.caf_nu, cf.mdlwe_sbscr_id,
    cu.frst_nm, cu.lst_nm,
    cf.mbl_nu, REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    cf.enty_sts_id,es.enty_sts_id,
    es.sts_nm,cf.caf_type_id, cf.crnt_pln_id, p.pckge_nm,  
	SUM((CASE WHEN adons.chrge_at is NOT NULL THEN adons.chrge_at  ELSE 0 END) + 
    (CASE WHEN adons.gst_at is NOT NULL THEN adons.gst_at  ELSE 0 END)) as ttl_bill_cst
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN pckge_lst_t p on p.pckge_id = cf.crnt_pln_id
	JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
	LEFT JOIN caf_pckge_prchse_dtl_t adons on adons.caf_id = cf.caf_id AND adons.a_in = 1
    WHERE cf.enty_sts_id = 6 AND cf.lmo_agnt_id = ${data.agntId} 
	AND cf.caf_id = ${data.caf_id} AND cf.a_in = 1 AND spr.cre_srvce_id = 2  AND p.a_in = 1
	GROUP BY cf.caf_id;`;

    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}
exports.getcafAppInvoiceDtlsMdl = (id, yr, user) => {
    var fnm = "getcafAppInvoiceDtlsMdl"
    console.log(' ---------------------------------------------- getcafAppInvoiceDtlsMdl', id)
    console.log(yr);
    if (yr) {
        var year = `and i.invce_yr = ${yr}`;
    }
    else {
        var year = ``;
    }

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no,i.caf_invce_id,i.invce_yr,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_frm_dt,'%m') as fmm,DATE_FORMAT(i.invce_frm_dt,'%Y') as fyy,
    DATE_FORMAT(i.invce_frm_dt,'%d') as fdd, DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,DATE_FORMAT(i.invce_to_dt,'%m') as tmm,DATE_FORMAT(i.invce_to_dt,'%Y') as tyy,
    DATE_FORMAT(i.invce_to_dt,'%d') as tdd,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2),
    format(i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at,2) as tax_at,DATE_FORMAT(i.invce_dt,'%d-%m-%Y') as billdate
    ,format(i.invce_at+i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at,2) as tl_at,
    (case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status',DATE_FORMAT(i.de_dt,'%d-%m-%Y') as duedate,chr.chrge_cd,
    p.pckge_id,chr.chrge_cde_id,invd.sgst_at,invd.cgst_at,format(invd.chrge_at,2) as chrge_at,format(invd.sgst_at+invd.cgst_at,2) as ttl_tax,
    format(invd.sgst_at+invd.cgst_at+invd.chrge_at,2) as ttl_amnt
    from erp_invce_lst_t i
    JOIN erp_invce_dtl_t invd on invd.caf_invce_id = i.caf_invce_id
        JOIN chrge_cde_lst_t chr on chr.chrge_cde_id = invd.chrge_cde_id
        join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id
        WHERE i.pblsd_in=1 AND i.caf_id = ${id} ${year}
        ORDER BY i.invce_yr desc,i.invce_mm desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
exports.getLmoDtlsMdl = (lmoId, user) => {
    var fnm = "getLmoDtlsMdl"
    var QRY_TO_EXEC = `select * from agnt_lst_t where agnt_id = ${lmoId}`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
exports.getcafPckgeDtlsMdl = (id, user) => {
    var fnm = "getcafPckgeDtlsMdl"

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY p.pckge_id) sno,p.pckge_id,
    p.pckge_nm,cpp.pkge_prche_id,
    psr.srvcpk_id,GROUP_CONCAT(DISTINCT s.srvcpk_nm) as srvcpk_nm,sum(cd.chrge_at)as chrge_at ,sum(cd.gst_at) as gst_at,p.caf_type_id,cf.caf_type_nm,
    GROUP_CONCAT(DISTINCT s.cre_srvce_id) as cre_srvce_id,
    GROUP_CONCAT(DISTINCT cs.cre_srvce_nm) AS cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx,DATE_FORMAT(psr.efcte_dt,'%d-%m-%Y')efcte_dt,
    DATE_FORMAT(psr.expry_dt,'%d-%m-%Y') as expry_dt,psr.efcte_dt as date,psr.expry_dt as date1,
    psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y') as plan_act,DATE_FORMAT(cpp.expry_dt,'%d-%m-%Y') as plan_exp,e.sts_nm,e.sts_clr_cd_tx, cpp.a_in as pckge_actv_in,cpp.u_ts as upd_tme,c.caf_id
    from caf_dtl_t as c
    LEFT JOIN caf_pckge_prchse_dtl_t as cpp on cpp.caf_id = c.caf_id
    left JOIN pckge_lst_t p on p.pckge_id =cpp.pckge_id
    JOIN pckge_srvcpk_rel_t as psr on p.pckge_id=psr.pckge_id AND psr.a_in=1
    JOIN pckge_srvcpk_type_lst_t as t on t.srvcpk_type_id=p.pckge_type_id
    JOIN caf_type_lst_t as cf on cf.caf_type_id=p.caf_type_id
    JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=psr.srvcpk_id
    join pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=psr.pckge_srvcpk_rel_id and cd.a_in=1
    JOIN chrge_cde_lst_t as crg on crg.chrge_cde_id=cd.chrge_cde_id
    JOIN cre_srvce_lst_t as cs on cs.cre_srvce_id=psr.cre_srvce_id
    JOIN enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
    where p.a_in=1 and c.caf_id=${id}
    GROUP BY p.pckge_id
    ORDER BY t.srvcpk_type_nm desc;`;
    console.log('getcafPckgeDtlsMdl -----------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : getAddOnHSIPackagesMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getAddOnHSIPackagesMdl = (data, user) => {
    var fnm ="getAddOnHSIPackagesMdl"
    console.log(data)
    let page_size = 20;
    let page_nu = data.lmt_pstn * page_size;
    let chnl_srch_cnd = ' ';
    let limit_cnd = ` `;

    if (data.lmt_pstn == 1) {
        limit_cnd = ``;
    } else {
        limit_cnd = `limit ${page_nu}, ${page_size}`;
    }

    if (data && data.srch_txt) {
        limit_cnd = ' ';
        chnl_srch_cnd = ` AND p.pckge_nm like '%${data.srch_txt}%'`
    }

    var QRY_TO_EXEC = `SELECT
    ROW_NUMBER()OVER(ORDER BY p.pckge_id DESC) as s_no, p.pckge_id,
    1 as pkcge_idnty,
    p.pckge_nm, p.chrge_at, p.gst_at,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
    spl.srvcpk_id,
    spl.srvcpk_nm, h.prpry_nm,
    DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
    DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
    DATE_FORMAT(p.expry_dt, '%Y%m%d') as extrnl_api_expry_dt,vle_tx
    FROM pckge_lst_t p
    JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
    JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_srvcpk_rel_t ch on ch.srvcpk_id = spr.srvcpk_id
    JOIN pckge_hsi_prpry_lst_t h on h.prpry_id = ch.prpry_id
    WHERE p.pckge_type_id = 2 AND spr.cre_srvce_id = 1 ${chnl_srch_cnd}
    GROUP BY p.pckge_id
    ORDER BY p.pckge_id DESC ${limit_cnd};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}

exports.getApphomeCardsMdl = (user) => {
    var fnm = "getApphomeCardsMdl"

    var QRY_TO_EXEC = `SELECT * FROM sbrApp_crds_lst_t  where a_in = 1 order by crd_id `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

exports.getAppMsgsMdl = (user) => {
    var fnm = "getAppMsgsMdl"

    var QRY_TO_EXEC = `SELECT *,DATE_FORMAT(i_ts, '%d %b,%Y') as msg_dt FROM sbrApp_msgs_lst_t where a_in =1  order by i_ts ;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

exports.getYoutubeVdesMdl = function (user) {
    var fnm = "getYoutubeVdesMdl"

    var QRY_TO_EXEC = `SELECT * FROM sbrApp_app_vdeo_lnk_dtl_t WHERE a_in = 1 ORDER BY vdeo_indx_ordr;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

exports.getAvlablePackges_Mdl = function (user) {
    var fnm = "getAvlablePackges_Mdl"

    // var QRY_TO_EXEC = `select p.pckge_id,p.pckge_nm,p.caf_type_id, p.chrge_at, p.gst_at,
    // (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    // (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,
    //     ps.srvcpk_id,group_concat(spl.srvcpk_nm) as srvcpk_nm,group_concat(cs.cre_srvce_nm) as cre_srvce_nm,
    //     group_concat(cs.cre_srvce_id,'-',cs.cre_srvce_nm,'-',spl.srvcpk_nm) as pack_dtl,
    //     group_concat(cs.cre_srvce_id) as cre_srvce_id
    //  from pckge_lst_t p
    //  join pckge_srvcpk_rel_t ps on ps.pckge_id = p.pckge_id
    //  JOIN pckge_srvcpk_lst_t spl on spl.srvcpk_id = ps.srvcpk_id
    //  JOIN cre_srvce_lst_t as cs on cs.cre_srvce_id=ps.cre_srvce_id
    // where pckge_type_id = 1 group by p.pckge_id order by p.pckge_id;`;
    var QRY_TO_EXEC = `select p.pckge_nm,p.pckge_id,c.cre_srvce_id,c.cre_srvce_nm,s.ky_nm,s.lbl_vle_tx, p.chrge_at, p.gst_at,
    (CASE WHEN p.chrge_at is NOT NULL THEN p.chrge_at  ELSE 0 END) +
    (CASE WHEN p.gst_at is NOT NULL THEN p.gst_at  ELSE 0 END) as ttl_cst,p.caf_type_id,ct.caf_type_nm
from  sbscr_pckge_lst_t s 
 join pckge_lst_t p on p.pckge_id=s.pckge_id
 join caf_type_lst_t ct on ct.caf_type_id=p.caf_type_id
 join cre_srvce_lst_t c on c.cre_srvce_id =s.cre_srvce_id
order by s.caf_type_id,s.pckge_id,s.sqnce_id;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};
/*****************************************************************************
* Function       : getMyCAfMbleNum_Mdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.getMyCAfMbleNum_Mdl = function (id) {
    var fnm = "getMyCAfMbleNum_Mdl"
    var QRY_TO_EXEC = `select CONCAT(SUBSTR(c.mbl_nu,1,1),'XXXXX',SUBSTR(c.mbl_nu,7,10)) as mbl_nu,c.mbl_nu as phne_nu 
    from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id = c.lmo_agnt_id
    where c.caf_id = ${id} and a.sbcr_alw_in = 1 and a.sbcr_lmo_upi_id is not null`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getMyCAfSrlNum_Mdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.getMyCAfSrlNum_Mdl = function (id) {
    var fnm = "getMyCAfSrlNum_Mdl"
    var QRY_TO_EXEC = ` select CONCAT(SUBSTR(c.mbl_nu,1,1),'XXXXX',SUBSTR(c.mbl_nu,7,10)) as mbl_nu,c.mbl_nu as phne_nu 
    from caf_dtl_t as c
    join agnt_lst_t as a on a.agnt_id = c.lmo_agnt_id
    where c.onu_srl_nu = '${id}' and a.sbcr_alw_in = 1 and a.sbcr_lmo_upi_id is not null`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : sendOtpMdl
 * Description   : Send OTP
 * Arguments     : callback function
 ******************************************************************************/
exports.sendOtpMdl = function (user, data,msg_tx, tmplt_id,otp, callback) {
    var fnm = "sendOtpMdl"
    var resUID;
    // var totpObj = new TOTP();
    // var otp = totpObj.getOTP('onetimepassword');
    // var msg_tx = `Your One Time Password is ${otp}. Please use this OTP to validate your login.`;
    smsutil.sendNotifySMS(data.mbl_no, msg_tx, data.ntfcn_cgry_id, function (err, smsres) {
        if (err) {
            callback(err);
            return;
        } else {
            var results = { "usr_mbl": data.mbl_no, uuid: resUID ? resUID : 0, code: otp, i_ts: new Date() };

            var QRY_TO_EXEC = `INSERT INTO usr_otp_t (usr_mbl_nu, code, uuid, i_ts) VALUES (${results.usr_mbl},'${results.code}','${results.uuid}', current_timestamp());`;

            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (error, ins_results) {
                if (error) {
                    callback(error);
                    return;
                } else {
                    ins_results['code'] = results.code;
                    callback(error, ins_results)
                    return;
                }
            })
        }
    }, tmplt_id);
}
// function TOTP() {

//     var dec2hex = function (s) {
//         return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
//     };

//     var hex2dec = function (s) {
//         return parseInt(s, 16);
//     };

//     var leftpad = function (s, l, p) {
//         if (l + 1 >= s.length) {
//             s = Array(l + 1 - s.length).join(p) + s;
//         }
//         return s;
//     };

//     var base32tohex = function (base32) {
//         var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
//         var bits = "";
//         var hex = "";
//         for (var i = 0; i < base32.length; i++) {
//             var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
//             bits += leftpad(val.toString(2), 5, '0');
//         }
//         for (var i = 0; i + 4 <= bits.length; i += 4) {
//             var chunk = bits.substr(i, 4);
//             hex = hex + parseInt(chunk, 2).toString(16);
//         }
//         return hex;
//     };

//     this.getOTP = function (secret) {
//         try {
//             var epoch = Math.round(new Date().getTime() / 1000.0);
//             var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, "0");
//             var hmacObj = new jsSHA("SHA-1", "HEX");
//             hmacObj.setHMACKey(base32tohex(secret), "HEX");
//             hmacObj.update(time);
//             var hmac = hmacObj.getHMAC("HEX");
//             // var hmac = hmacObj.getHMAC(base32tohex(secret), "HEX", "SHA-1", "HEX");
//             var offset = hex2dec(hmac.substring(hmac.length - 1));
//             var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
//             otp = (otp).substr(otp.length - 6, 4);
//             // // // console.log(otp)
//         } catch (error) {
//             throw error;
//         }
//         return otp;
//     };

// }

/*****************************************************************************
* Function       : get_dueAmountMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_dueAmountMdl = function (custmr_id, agent_id) {
    // var QRY_TO_EXEC = `select e.caf_invce_id,e.caf_id,c.caf_nu,e.cstmr_id,u.cstmr_nm,u.frst_nm,u.lst_nm,u.cntct_mble1_nu,
    // REPLACE(u.adhr_nu,SUBSTR(u.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    // t.caf_type_nm,u.agnt_id,a.agnt_nm,e.invce_at as due_amnt,DATE_FORMAT(e.invce_dt, "%d-%m-%Y") as invce_dt,e.invce_yr from 
    // erp_invce_lst_t as e
    // join caf_dtl_t  as c on c.caf_id = e.caf_id
    // join cstmr_dtl_t as u on u.cstmr_id = e.cstmr_id
    // join caf_type_lst_t as t on t.caf_type_id = u.caf_type_id
    // join agnt_lst_t as a on a.agnt_id=u.agnt_id
    // where e.pblsd_in=1 and e.pd_in = 0 and u.agnt_id=${agent_id} and e.cstmr_id=${custmr_id} order by e.invce_dt desc`;

    var fnm = "get_dueAmountMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no,i.caf_invce_id,i.invce_yr,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_frm_dt,'%m') as fmm,DATE_FORMAT(i.invce_frm_dt,'%Y') as fyy,
    DATE_FORMAT(i.invce_frm_dt,'%d') as fdd, DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,DATE_FORMAT(i.invce_to_dt,'%m') as tmm,DATE_FORMAT(i.invce_to_dt,'%Y') as tyy,
    DATE_FORMAT(i.invce_to_dt,'%d') as tdd,p.pckge_nm,i.pd_in,i.pd_ts,ROUND(i.invce_at+i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at) as due_amnt,i.invce_at as amnt,
    format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at,format(invce_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at,
    DATE_FORMAT(i.invce_dt,'%d-%m-%Y') as invce_dt,i.lmo_agnt_id as agnt_id,i.caf_id,i.caf_id as caf_nu,i.cstmr_id,a.agnt_nm,(case when i.pd_in=0 then 'Not Paid' WHEN i.pd_in=1 THEN 'Paid' end) as 'Payment Status'
    from erp_invce_lst_t i
        join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id
        join agnt_lst_t as a on a.agnt_id = i.lmo_agnt_id
        WHERE i.pd_in=0 and i.pblsd_in=1 AND i.cstmr_id=${custmr_id}
        ORDER BY i.invce_dt desc`;

    console.log("***********************payyyyyyyyyyyyyyyyyyyyyyyyyyyyyy*******************************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : get_paymntmodesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_paymntmodesMdl = function () {
    var fnm = "get_paymntmodesMdl"
    var QRY_TO_EXEC = `select pymnt_mde_id,pymnt_mde_nm,a_in from pymnt_mde_lst_t order by pymnt_mde_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
