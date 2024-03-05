var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');


/*****************************************************************************
* Function       : newAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.newAgentMdl = function (tntdata, enrlt_nu, user) {

    var tntInfo = tntdata.data.agntInfo;
    var ofcAdrs = tntdata.data.officeAddress;
    var brnchAdrs = tntdata.data.branchAddress;
    // var tntBnkDtls = tntdata.data.agntBnkDtls;
    // var tntdocDtls = tntdata.data.agntIdPrfDtls;
    var brnch_chk;
    // var enrlt_nu;
    var prnt_agnt;
    // tntInfo.enrlmnt_Nu = 'SELECT MAX(enrlt_nu) + 1 FROM agnt_lst_t WHERE a_in=1'
    // if (tntdata.branchAddress.brnch_chk_ind == true) {
    //     brnch_chk = 1;
    // }
    // if (tntdata.branchAddress.brnch_chk_ind == false) {
    //     brnch_chk = 0;
    // }
    // console.log(data.data)
    // let dtls = data.data

    // var dbutil = require(appRoot + '/utils/db.utils');

    // console.log(nextId)

    if (tntInfo.agnt_Typ == 1) {
        prnt_agnt = `${tntInfo.lmoCode.agnt_id}`;
    } else {
        prnt_agnt = ``;
    }
    // console.log(enrlt_nu);
    // return;
    var QRY_TO_EXEC = `INSERT INTO agnt_lst_t(agnt_nm,agnt_ctgry_id, prnt_agnt_id, enrlt_nu,adhr_nu,pan_nu, tan_nu,gst_nu, pstl_rgstn_nu, pstl_exprn_dt, ofce_cntct_nm, ofce_mbl_nu, 
        ofce_eml_tx, ofce_addr1_tx,ofce_addr2_tx, ofce_ara_nm, ofce_cty_nm, ofce_ste_id, ofce_dstrt_id, ofce_mndl_id, ofce_vlge_id, ofce_pn_cd,ofce_lclty_nm,ofce_std_cd, ofce_lndle_nu, brnch_cntct_nm, 
        brnch_mbl_nu,brnch_eml_tx, brnch_addr1_tx,brnch_addr2_tx, brnch_ara_nm, brnch_cty_nm, brnch_ste_id, brnch_dstrt_id, brnch_mndl_id, brnch_vlge_id, brnch_pn_cd,brnch_lclty_nm,brnch_std_cd, brnch_lndne_nu,orgn_type_id,sts_id,a_in, i_ts,slf_rgnrn_ts)
        VALUES('${tntInfo.agnt_nm}','${tntInfo.agnt_Typ}', '${prnt_agnt}', '${enrlt_nu}','${tntInfo.adhr_Nu}','${tntInfo.pan_Nu}','${tntInfo.tan_Nu}',
        '${tntInfo.gst_Nu}','${tntInfo.pstl_reg_Nu}','${tntInfo.pstl_exp_dt}','${ofcAdrs.ofce_cntct_Nm}','${ofcAdrs.ofce_mble_Nu}','${ofcAdrs.ofce_email}',
        '${ofcAdrs.ofce_address1}','${ofcAdrs.ofce_address2}','${ofcAdrs.ofce_ara_nm}','${ofcAdrs.ofce_City}','${ofcAdrs.ofce_State}','${ofcAdrs.ofce_Dstrt}','${ofcAdrs.ofce_Mndl}',
        '${ofcAdrs.ofce_Vlge}','${ofcAdrs.ofce_pn_cd}','${ofcAdrs.ofce_lcty_nm}','${ofcAdrs.ofce_lndline_cd}','${ofcAdrs.ofce_lndline}','${brnchAdrs.brnch_cntct_Nm}','${brnchAdrs.brnch_mble_Nu}','${brnchAdrs.brnch_email}',
        '${brnchAdrs.brnch_address1}','${brnchAdrs.brnch_address2}','${brnchAdrs.brnch_ara_nm}','${brnchAdrs.brnch_City}','${brnchAdrs.brnch_State}','${brnchAdrs.brnch_Dstrt}','${brnchAdrs.brnch_Mndl}',
        '${brnchAdrs.brnch_Vlge}','${brnchAdrs.brnch_pn_cd}','${brnchAdrs.brnch_lcty_nm}','${brnchAdrs.brnch_lndline_cd}','${brnchAdrs.brnch_lndline}','${tntInfo.orgn_typ}',2,1,CURRENT_TIMESTAMP(),NULL)`;
 
    log.info(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getLmoMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getLmoMdl = function () {

    // let dtls = data.data
    var QRY_TO_EXEC = ` SELECT  ROW_NUMBER() OVER ( ORDER BY a.agnt_id) as s_no,agnt_id
                        ,agnt_nm,agnt_nm as NAME,agnt_cd,a.agnt_ctgry_id
                        ,ac.prtnr_nm,prtnr_cd,enrlt_nu,DATE_FORMAT(a.onbrd_ts,'%d-%m-%Y') AS lmo_onbrd_dt,
                        a.ofce_cntct_nm AS lmo_cntct_nm,a.ofce_mbl_nu AS lmo_mbl_nu,
                        pstl_rgstn_nu,DATE_FORMAT(pstl_exprn_dt,'%d-%m-%Y') as date,pstl_exprn_dt,s.ste_nm,d.dstrt_nm,m.mndl_nm,v.vlge_nm
                        from agnt_lst_t as a
                        JOIN prtnrs_lst_t as ac on a.agnt_ctgry_id=ac.prtnr_id  
                        left JOIN ste_lst_t as s on a.ofce_ste_id=s.ste_id                   
                        left JOIN vlge_lst_t as v on a.ofce_vlge_id=v.vlge_nu and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
                        left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
                        left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
                        where a.a_in=1 AND ac.prtnr_nm = 'LMO' AND onbrd_in=1;`;
                        
                        // left join ste_lst_t as s1 on a.brnch_ste_id=s1.ste_id
                        // left JOIN dstrt_lst_t as d1 on a.brnch_dstrt_id=d1.dstrt_id
                        // left JOIN mndl_lst_t as m1 on a.brnch_mndl_id=m1.mndl_id
                        // left JOIN vlge_lst_t as v1 on a.brnch_vlge_id=v1.vlge_id

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : selectAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.selectAgentMdl = function (id) {

    // let dtls = data.data
    var QRY_TO_EXEC = `SELECT onbrd_in from agnt_lst_t WHERE agnt_id= ${id}`;

    // console.log("++++++++++++++++++++++++++++++");
    // console.log(QRY_TO_EXEC);
    // console.log("+++++++++++++++++++++++++++++++");
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : selectAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.selectAgentbumsoMdl = function (id) {

    // let dtls = data.data
    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY a.agnt_id) as s_no,agnt_id
    ,agnt_nm as lmo_nm,agnt_cd as lmo_cd,a.agnt_ctgry_id
    ,ac.prtnr_nm,prtnr_cd,enrlt_nu as lmo_enrlt_nu,DATE_FORMAT(a.onbrd_ts,'%d-%m-%Y') AS lmo_onbrd_dt,
    a.ofce_cntct_nm AS lmo_cntct_nm,a.ofce_mbl_nu AS lmo_mbl_nu,
    pstl_rgstn_nu,DATE_FORMAT(pstl_exprn_dt,'%d-%m-%Y') as date,pstl_exprn_dt,s.ste_nm as
    lmo_ofc_ste_nm,d.dstrt_nm as lmo_ofc_dstrct_nm,m.mndl_nm as lmo_ofc_mndl_nm,v.vlge_nm as lmo_ofc_vlg_nm,count(c.caf_id) as lmo_ct
    from agnt_lst_t as a
left JOIN caf_dtl_t as c on a.agnt_id = c.lmo_agnt_id 
    JOIN prtnrs_lst_t as ac on a.agnt_ctgry_id=ac.prtnr_id  
    left JOIN ste_lst_t as s on a.ofce_ste_id=s.ste_id                   
    left JOIN vlge_lst_t as v on a.ofce_vlge_id=v.vlge_nu and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    where a.a_in=1 AND ac.prtnr_nm = 'LMO' AND a.onbrd_in=1 AND a.prnt_agnt_id=${id}
group BY a.agnt_id;`;

    // console.log("++++++++++++++++++++++++++++++");
    // console.log(QRY_TO_EXEC);
    // console.log("+++++++++++++++++++++++++++++++");
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
/*****************************************************************************
* Function       : getDstrtCrntMnthCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCrntMnthCntsMdl = function (id) {
    var QRY_TO_EXEC = `SELECT lmo_agnt_id,a.agnt_cd,a.agnt_nm,a1.agnt_nm AS mso_nm,a.ofce_mbl_nu,a.ofce_cntct_nm,dstrt_id,dstrt_nm,oprtn_mm,oprtn_yr,
    lmo_prv_blnce_at,lmo_clctd_at,add_on_chrge_at,voip_chrge_at,crdt_at,dsptd_at
    ,caf_ct,prtd_caf_ct,pd_caf_ct,bx_only_caf_ct,nt_pd_caf_ct,
   sum(spnd_caf_ct) crnt_mnth_caf_spnd_ct,
   sum(rsmed_caf_ct) crnt_mnth_caf_rsme_ct,
    sum(nw_caf_ct) crnt_mnth_caf_prv_ct        
    ,sum(trmnd_caf_ct) crnt_mnth_trmnd_ct,
      sum(box_chnge_ct)  crnt_mnth_bx_chnge_ct,
      sum(pon_chnge_ct) crnt_mnth_pn_chnge_ct,altd_bx_ct
    FROM
    lmo_oprtn_mnthly_dtl_t l
    JOIN agnt_lst_t a ON l.lmo_agnt_id=a.agnt_id
    JOIN dstrt_lst_t d ON a.ofce_dstrt_id = d.dstrt_id
    LEFT JOIN agnt_lst_t a1 ON l.mso_agnt_id = a1.agnt_id
    WHERE
    (oprtn_yr=year(CURDATE()) AND oprtn_mm= MONTH(CURDATE()))AND  a.prnt_agnt_id=${id}  ORDER BY a.agnt_id;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function       : getDstrtCrntMnthCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPrvsMnthCntsMdl = function (id) {
    var QRY_TO_EXEC = `SELECT lmo_agnt_id,a.agnt_cd,a.agnt_nm,a1.agnt_nm AS mso_nm,a.ofce_mbl_nu,a.ofce_cntct_nm,dstrt_id,dstrt_nm,oprtn_mm,oprtn_yr,
    lmo_prv_blnce_at,lmo_clctd_at,add_on_chrge_at,voip_chrge_at,crdt_at,dsptd_at
    ,caf_ct,prtd_caf_ct,pd_caf_ct,bx_only_caf_ct,nt_pd_caf_ct,
   sum(spnd_caf_ct) prv_mnth_caf_spnd_ct,
   sum(rsmed_caf_ct) prv_mnth_caf_rsme_ct,
    sum(nw_caf_ct) prv_mnth_caf_prv_ct        
    ,sum(trmnd_caf_ct) prv_mnth_trmnd_ct,
      sum(box_chnge_ct)  prv_mnth_bx_chnge_ct,
      sum(pon_chnge_ct) prv_mnth_pn_chnge_ct,altd_bx_ct
    FROM
    lmo_oprtn_mnthly_dtl_t l
    JOIN agnt_lst_t a ON l.lmo_agnt_id=a.agnt_id
    JOIN dstrt_lst_t d ON a.ofce_dstrt_id = d.dstrt_id
    LEFT JOIN agnt_lst_t a1 ON l.mso_agnt_id = a1.agnt_id
    WHERE
    (oprtn_yr=year(CURDATE()) AND oprtn_mm= MONTH(CURDATE()-INTERVAL 1 month)) AND  a.prnt_agnt_id=${id}  ORDER BY a.agnt_id;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function       : getDstrtCrntMnthCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCpeCntsMdl = function (id) {
    var QRY_TO_EXEC = `SELECT COUNT(*) as ttl_stp_bxs,
    SUM(CASE WHEN lmo_agnt_id  is NOT NULL  THEN 1 ELSE 0 END) as ttl_lmo_stp_bxs
   
    FROM inv_stpbx_lst_t inv
    LEFT JOIN agnt_lst_t a ON inv.lmo_agnt_id = a.agnt_id
    WHERE inv.a_in = 1 and prdct_id=1 and a.prnt_agnt_id=${id} ;`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function       : selectAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.cafcountbymsoMdl = function (id) {

    // let dtls = data.data
    var QRY_TO_EXEC = `select count(*) as ttl_cnt, COUNT( DISTINCT c.lmo_agnt_id ),
    sum(case when c.caf_type_id = 1 THEN 1 ELSE 0 END) as ind_cnt,
    sum(case when c.caf_type_id = 2 THEN 1 ELSE 0 END) as ent_cnt,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =2  THEN 1 ELSE 0 END) as ent_priv_cnt,
    sum(case when c.caf_type_id = 2 and cd.entrpe_type_id =1  THEN 1 ELSE 0 END) as ent_govt_cnt
   from caf_dtl_t c
left join cstmr_dtl_t as cd on cd.cstmr_id = c.cstmr_id
left join agnt_lst_t as ag on ag.agnt_id=c.lmo_agnt_id
where c.mso_agnt_id=${id}`;

    // console.log("++++++++++++++++++++++++++++++");
    // console.log(QRY_TO_EXEC);
    // console.log("+++++++++++++++++++++++++++++++");
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function       : updateAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateAgentMdl = function (id, data, user) {
    // console.log('updateAgentMdl')
    // console.log(id)

    // console.log('(((((((((((((((((((((((data)))))))))))))))))))))))')
    // console.log(data)
    // console.log('(((((((((((((((((((((((data)))))))))))))))))))))))')
    var onbrd_usr_id;
    var onbrd_in;
    var onbrd_ts;
    var agent_cd;
    var wlt_blnce_at = ``;
    var agnt_blnce_at = ``;
    // var agnt_ctgry;
    // var enrlt_nu;
    if (data.onbrd_in == 0) {
        onbrd_usr_id = `,onbrd_usr_id = ${user.mrcht_usr_id}`
        onbrd_in = `,onbrd_in =1`;
        onbrd_ts = `,onbrd_ts =CURRENT_TIMESTAMP()`;
        agent_cd = `,agnt_cd='${data.agnt_Cd}'`;
         if (data.agnt_ctgry_id == 1) {
            adtndl_srvc = `,adtnl_srvc_tx="SP,RS,BE,PC,TR,',OTP,AO,BS,',AP,BFC,PCK"`
        } else if (data.agnt_ctgry_id == 3) {
            adtndl_srvc = `,adtnl_srvc_tx="SP,RS,BE,PC,TR,',OTP,AO,BS,',AP,BFC,'"`
        } else {
            adtndl_srvc = ``;
        }
        // agnt_ctgry = `,agnt_ctgry_id=${data.agnt_Typ}`;
        // enrlt_nu = `,enrlt_nu='${data.enrlmnt_Nu}'`;
    } else {
        onbrd_in = ``;
        onbrd_ts = ``;
        agent_cd = ``;
        onbrd_usr_id = ``;
        // agnt_ctgry = ``;
        // enrlt_nu = ``;
    }
    if(data.initial_onbrd==true){
        wlt_blnce_at = `,wlt_blnce_at = 4000`;
        agnt_blnce_at = `,agnt_blnce_at = 0`;
    }
    var brnch_chkd;
    if (data.branchAddress.brnch_chk_ind == true) {
        brnch_chkd = 1;
    }
    if (data.branchAddress.brnch_chk_ind == false) {
        brnch_chkd = 0;
    }

    // return;

    var QRY_TO_EXEC = `UPDATE agnt_lst_t SET agnt_nm='${data.agnt_nm}',adhr_nu='${data.adhr_Nu}',pan_nu='${data.pan_Nu}',tan_nu='${data.tan_Nu}',tan_nu='${data.tan_nu}',gst_nu='${data.gst_Nu}',
                        pstl_rgstn_nu='${data.pstl_reg_Nu}',pstl_exprn_dt='${data.pstl_exp_dt}',ofce_cntct_nm='${data.officeAddress.ofce_cntct_Nm}',ofce_mbl_nu='${data.officeAddress.ofce_mble_Nu}',
                        ofce_eml_tx='${data.officeAddress.ofce_email}',ofce_addr1_tx='${data.officeAddress.ofce_address1}',ofce_addr2_tx='${data.officeAddress.ofce_address2}',ofce_lclty_nm='${data.officeAddress.ofce_lcty_nm}',ofce_ara_nm='${data.officeAddress.ofce_ara_nm}',
                        ofce_cty_nm='${data.officeAddress.ofce_City}',ofce_ste_id=${data.officeAddress.ofce_State},ofce_dstrt_id=${data.officeAddress.ofce_Dstrt},
                        ofce_mndl_id=${data.officeAddress.ofce_Mndl},ofce_vlge_id=${data.officeAddress.ofce_Vlge},ofce_pn_cd=${data.officeAddress.ofce_pn_cd},
                        ofce_std_cd='${data.officeAddress.ofce_lndline_cd}',ofce_lndle_nu='${data.officeAddress.ofce_lndline}',brnch_cntct_nm='${data.branchAddress.brnch_cntct_Nm}',
                        brnch_mbl_nu='${data.branchAddress.brnch_mble_Nu}',brnch_eml_tx='${data.branchAddress.brnch_email}',brnch_addr1_tx='${data.branchAddress.brnch_address1}',
                        brnch_ara_nm='${data.branchAddress.brnch_ara_nm}',brnch_cty_nm='${data.branchAddress.brnch_City}',brnch_ste_id=${data.branchAddress.brnch_State},
                        brnch_addr2_tx='${data.branchAddress.brnch_address2}',brnch_dstrt_id=${data.branchAddress.brnch_Dstrt},brnch_mndl_id=${data.branchAddress.brnch_Mndl},
                        brnch_vlge_id=${data.branchAddress.brnch_Vlge},brnch_lclty_nm='${data.branchAddress.brnch_lcty_nm}',brnch_std_cd=${data.branchAddress.brnch_lndline_cd},brnch_pn_cd=${data.branchAddress.brnch_pn_cd},brnch_lndne_nu='${data.branchAddress.brnch_lndline}',
                        sme_addr_chk_in=${brnch_chkd}${wlt_blnce_at}${agnt_blnce_at},updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP() ${onbrd_in} ${onbrd_ts} ${onbrd_usr_id} ${agent_cd}
                        WHERE agnt_id= ${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : selectAgentsrvng_astsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.selectAgentsrvng_astsMdl = function (id) {
    var QRY_TO_EXEC = `SELECT * from srvng_ast_dtl_t where agnt_id = ${id};`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : selectAgentdcmntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.selectAgentdcmntsMdl = function (id) {
    var QRY_TO_EXEC = `SELECT * from agnt_dcmnt_lst_t where agnt_id = ${id};`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : selectAgntBnkMDl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.selectAgntBnkMDl = function (id) {
    var QRY_TO_EXEC = `SELECT * from agnt_bnk_dtl_t where agnt_id = ${id};`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : selectAreasrvngMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.selectAreasrvngMdl = function (id) {
    var QRY_TO_EXEC = `SELECT * from srving_ara_lst_t where agnt_id = ${id};`
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : updateAgentSrvingAreaMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateAgentSrvingAreaMdl = function (id, data, user) {
    // console.log(id)
    // console.log(data);
    // return;
    if(data.srving_ara_id){
    var QRY_TO_EXEC = `UPDATE srving_ara_lst_t SET srving_ara_nm='${data.ara_nm}',cble_type_id='${data.cbl_type}',cble_lngth_ct=${data.rng_cbl_lngth},
                        dstrct_id='${data.srv_ara_dstrt}',mndl_id='${data.srv_ara_mndl}',vlge_id='${data.srv_ara_vlge}',sbscbr_ct='${data.sbsc_ct}',cnctn_ct='${data.cnct_ct}'
                        ,dgtl_cntn_ct='${data.dgtl_cnct_ct}',anlge_cntn_ct='${data.anlg_cnct_ct}',
                        updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
                        WHERE agnt_id= ${id} AND srving_ara_id= ${data.srving_ara_id}`;
    }
    else{
        var QRY_TO_EXEC = `INSERT INTO srving_ara_lst_t (agnt_id, srving_ara_nm, cble_type_id, cble_lngth_ct, dstrct_id, mndl_id, vlge_id, sbscbr_ct, cnctn_ct, dgtl_cntn_ct, anlge_cntn_ct, a_in, i_ts) VALUES ('${id}', '${data.ara_nm}', '${data.cbl_type}',${data.rng_cbl_lngth}, '${data.srv_ara_dstrt}', '${data.srv_ara_mndl}', '${data.srv_ara_vlge}', '${data.sbsc_ct}', '${data.cnct_ct}', '${data.dgtl_cnct_ct}', '${data.anlg_cnct_ct}' , 1, CURRENT_TIMESTAMP())`;

    }
     console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : updateAgentSrvingAssetMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateAgentSrvingAssetMdl = function (id, data, user) {
    // console.log(id)
    // console.log(data);
    // return;
    var QRY_TO_EXEC = `UPDATE srvng_ast_dtl_t SET cble_type_id='${data.arv_ast_cbl_type}',asrt_id='${data.ast_type}',rt_nm='${data.rte_nm}',snd_trnse='${data.snt_trns_tm}',imie_nu='${data.ime_nu}',vrsn_nu='${data.vrsn_nu}',
                        updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
                        WHERE agnt_id= ${id} AND srvng_ast_id= ${data.srvng_ast_id}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : selectSub_Statn_Mdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.selectSub_Statn_Mdl = function ( data, id, user) {
    // console.log(id)
    // console.log(data);
    // // return;
    var QRY_TO_EXEC = `SELECT * from agnt_sbstn_rel_t where agnt_id= ${id} and  sbstn_id =${data.sb_stn.sbstn_id};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : updateAgentSbstnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateAgentSbstnMdl = function (id, data, sb_stn_rsl, user) {
    // console.log("sb_stn_rsl")
    // console.log(sb_stn_rsl)
    // console.log(sb_stn_rsl.length)
    // console.log("sb_stn_rsl")
    // console.log(data)
    
        if (sb_stn_rsl.length > 0) {
            var QRY_TO_EXEC = `UPDATE agnt_sbstn_rel_t SET sbstn_id='${data.sb_stn.sbstn_id}',sbstn_dstnce_ct='${data.sb_stn_dst}',
            updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
            WHERE agnt_id= ${id} AND sbstn_agnt_id= ${sb_stn_rsl[0].sbstn_agnt_id}`;
        } else if (data.sb_stn.sbstn_id != undefined) {
            var QRY_TO_EXEC = `INSERT INTO agnt_sbstn_rel_t(agnt_id,sbstn_id,sbstn_dstnce_ct,vlge_id,crte_usr_id,a_in,i_ts) 
            VALUES(${id},${data.sb_stn.sbstn_id},${data.sb_stn_dst},${data.sb_stn.agnt_vlge_id},${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;
        }
        // return;
        console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
    };

/*****************************************************************************
* Function       : updateDcmntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateDcmntMdl = function (id, data, user) {
    // console.log(id)
    // console.log(data);
    // return;
    var QRY_TO_EXEC = `UPDATE agnt_dcmnt_lst_t SET dcmnt_url_tx='${data.id_dcmn}',dcmnt_prf_nu='${data.id_Nu}',
                        updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
                        WHERE agnt_id= ${id}`;
console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : updateBankMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateBankMdl = function (id, data, user) {
    // console.log(id)
    // console.log(data);
    // return;
    var QRY_TO_EXEC = `UPDATE agnt_bnk_dtl_t SET bnk_acnt_nu='${data.acnt_Nu}',ifsc_cd='${data.ifsc_cd}',brnch_nm='${data.brnch}',bnk_nm='${data.bnk_nm}',
                        svngs_in='${data.accnt_typ}',updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
                        WHERE agnt_id= ${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : delAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.delAgentMdl = function (id) {
    // console.log(id)
    var QRY_TO_EXEC = `UPDATE agnt_lst_t SET a_in=0,d_ts = CURRENT_TIMESTAMP() WHERE agnt_id= ${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : rejAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.rejAgentMdl = function (id) {
    // console.log(id)
    var QRY_TO_EXEC = `UPDATE agnt_lst_t SET onbrd_rjct_in=1,d_ts = CURRENT_TIMESTAMP() WHERE agnt_id= ${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : unrejAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.unrejAgentMdl = function (id) {
    // console.log(id)
    var QRY_TO_EXEC = `UPDATE agnt_lst_t SET onbrd_rjct_in=0,u_ts = CURRENT_TIMESTAMP() WHERE agnt_id= ${id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : srvngAsrtMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.srvngAsrtMdl = function (srvAsrtData, insertId, user) {
    // console.log(srvAsrtData);
    if (srvAsrtData != undefined || srvAsrtData.cble_type_id != ' ') {
        var QRY_TO_EXEC = `INSERT INTO srvng_ast_dtl_t(agnt_id, cble_type_id, asrt_id, rt_nm, snd_trnse, imie_nu, vrsn_nu, a_in,i_ts) VALUES('${insertId}','${srvAsrtData.arv_ast_cbl_type}','${srvAsrtData.ast_type}','${srvAsrtData.rte_nm}','${srvAsrtData.snt_trns_tm}','${srvAsrtData.ime_nu}','${srvAsrtData.vrsn_nu}',1,CURRENT_TIMESTAMP())`;
    }
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function       : srvngAraMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.srvngAraMdl = function (srvAraData, insertId, user) {
    // console.log(srvAraData)
    // return;
    var QRY_TO_EXEC = `INSERT INTO srving_ara_lst_t (agnt_id, srving_ara_nm, cble_type_id, cble_lngth_ct, dstrct_id, mndl_id, vlge_id, sbscbr_ct, cnctn_ct, dgtl_cntn_ct, anlge_cntn_ct, a_in, i_ts) VALUES ('${insertId}', '${srvAraData.ara_nm}', '${srvAraData.cbl_type}','${srvAraData.rng_cbl_lngth}', '${srvAraData.srv_ara_dstrt}', '${srvAraData.srv_ara_mndl}', '${srvAraData.srv_ara_vlge}', '${srvAraData.sbsc_ct}', '${srvAraData.cnct_ct}', '${srvAraData.dgtl_cnct_ct}', '${srvAraData.anlg_cnct_ct}' , 1, CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function       : getAgntPortsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgntPortsMdl = function (agnt_id) {
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY olt_prt_id) as sno, * from olt_prts_lst_t where agnt_id = ${agnt_id}`;

    // var QRY_TO_EXEC = `select p.agnt_id, p.olt_prt_id,p.olt_prt_nm,p.olt_id, s.olt_slt_id, s.slt1_id, s.slt2_id, s.slt3_id 
    // from olt_prts_lst_t p
    // JOIN olt_prt_slts_lst_t s on s.olt_prt_id = p.olt_prt_id
    // where agnt_id = ${agnt_id} ORDER BY p.olt_prt_id, s.olt_slt_id`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
/*****************************************************************************
* Function       : getPortConnslotsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPortConnslotsMdl = function (agnt_id) {
    var QRY_TO_EXEC = `select p.agnt_id, p.olt_prt_id,p.olt_prt_nm,o.olt_id,o.olt_nm, s.olt_slt_id, s.slt1_id, s.slt2_id, s.slt3_id, sb.sbstn_id, sb.sbstn_nm, st.sbstn_type_id,st.sbstn_type_nm
    from olt_prts_lst_t p
    JOIN olt_prt_slts_lst_t s on s.olt_prt_id = p.olt_prt_id
    JOIN olt_lst_t as o on o.olt_id=p.olt_id
    JOIN sbstn_lst_t as sb on sb.sbstn_id = o.sbstn_id
    JOIN sbstn_type_lst_t as st on st.sbstn_type_id = o.sbstn_type_id
    where agnt_id = ${agnt_id} ORDER BY p.olt_prt_id, s.olt_slt_id`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getAgntDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgntDtlsMdl = function (agnt_id) {
    var QRY_TO_EXEC = `select a.*,
                        sum(case WHEN i.stpbx_id then 1 else 0 end)  as cpe_cnt,
                        sum(case WHEN c.caf_id then 1 else 0 end)  as ttl_caf_cnt,
                        sum(CASE WHEN c.actvn_dt > CURRENT_DATE() - INTERVAL 30 DAY then 1 else 0 END) as last30days,
                        SUM(CASE WHEN  i.caf_id is NOT null AND c.enty_sts_id =4 then 1 else 0 end) as caf_spnd,
                        SUM(CASE WHEN i.caf_id is null then 1 else 0 end) as rmng_caf,
                        sum(case (i.prdct_id) WHEN 1 then 1 else 0 end) as onu_cnt,sum(case (i.prdct_id) WHEN 2 then 1 else 0 end) as iptv_cnt,
                        SUM(CASE WHEN i.prdct_id =1 AND i.caf_id is null then 1 else 0 end) as free_onu_caf,
                        SUM(CASE WHEN i.prdct_id =1 AND i.caf_id is not null then 1 else 0 end) as cnected_onu_caf,
                        SUM(CASE WHEN i.prdct_id =2 AND i.caf_id is null then 1 else 0 end) as free_iptv_caf,SUM(CASE WHEN i.prdct_id =2 AND i.caf_id is not null then 1 else 0 end) as cnected_iptv_caf,
                        SUM(CASE WHEN i.prdct_id =2 AND i.caf_id is not null AND c.spnd_in =1 then 1 else 0 end) as spnd_iptv_caf,
                        SUM(CASE WHEN i.prdct_id =1 AND i.caf_id is not null AND c.spnd_in =1 then 1 else 0 end) as spnd_onu_caf,COALESCE(SUM(atd.trnsn_at), 0)as ttl_amnt
                        from agnt_lst_t a
                        left JOIN inv_stpbx_lst_t i on i.lmo_agnt_id = a.agnt_id
                        left join caf_dtl_t as c on c.caf_id = i.caf_id
                        LEFT JOIN agnt_trnsn_dtl_t as atd on atd.agnt_id = a.agnt_id and atd.agnt_id = 18 and YEAR(atd.trsn_dt) = YEAR(('CURRENT_DATE()' - INTERVAL 1 MONTH) ) AND MONTH(atd.trsn_dt) = month(('CURRENT_DATE()' - INTERVAL 1 MONTH))
                        LEFT JOIN agnt_trnsn_type_lst_t as att on att.trnsn_type_id = atd.trnsn_type_id and att.trnsn_ctgry_id=2
                        WHERE a.agnt_id = ${agnt_id};`
    // var QRY_TO_EXEC = `SELECT a.*, (CASE WHEN b.ttl_amnt is NOT NULL THEN b.ttl_amnt ELSE 0 END) as ttl_amnt FROM 
    //                     (select a.*,
    //                     sum(case WHEN i.stpbx_id then 1 else 0 end)  as cpe_cnt,
    //                     sum(case WHEN c.caf_id then 1 else 0 end)  as ttl_caf_cnt,
    //                     sum(CASE WHEN c.actvn_dt > CURRENT_DATE() - INTERVAL 30 DAY then 1 else 0 END) as last30days,
    //                     SUM(CASE WHEN  i.caf_id is NOT null AND c.crnt_caf_sts_id =7 then 1 else 0 end) as caf_spnd, 
    //                     SUM(CASE WHEN i.caf_id is null then 1 else 0 end) as rmng_caf,
    //                     sum(case (i.prdct_id) WHEN 1 then 1 else 0 end) as onu_cnt,sum(case (i.prdct_id) WHEN 2 then 1 else 0 end) as iptv_cnt,
    //                     SUM(CASE WHEN i.prdct_id =1 AND i.caf_id is null then 1 else 0 end) as free_onu_caf,
    //                     SUM(CASE WHEN i.prdct_id =1 AND i.caf_id is not null then 1 else 0 end) as cnected_onu_caf,
    //                     SUM(CASE WHEN i.prdct_id =2 AND i.caf_id is null then 1 else 0 end) as free_iptv_caf,SUM(CASE WHEN i.prdct_id =2 AND i.caf_id is not null then 1 else 0 end) as cnected_iptv_caf,
    //                     SUM(CASE WHEN i.prdct_id =2 AND i.caf_id is not null AND c.spnd_in =1 then 1 else 0 end) as spnd_iptv_caf,
    //                     SUM(CASE WHEN i.prdct_id =1 AND i.caf_id is not null AND c.spnd_in =1 then 1 else 0 end) as spnd_onu_caf
    //                     from agnt_lst_t a
    //                     left JOIN inv_stpbx_lst_t i on i.lmo_agnt_id = a.agnt_id
    //                     left join caf_dtl_t as c on c.caf_id = i.caf_id
    //                     WHERE a.agnt_id = ${agnt_id} ) as a
    //                     left JOIN (SELECT atd.agnt_id , COALESCE(SUM(atd.trnsn_at), 0)as ttl_amnt 
    //                     from agnt_trnsn_dtl_t atd
    //                     JOIN agnt_trnsn_type_lst_t as att on att.trnsn_type_id = atd.trnsn_type_id and att.trnsn_ctgry_id=2
    //                     where atd.agnt_id = ${agnt_id} and YEAR(atd.trsn_dt) = YEAR((CURRENT_DATE() - INTERVAL 1 MONTH) ) AND MONTH(atd.trsn_dt) = month((CURRENT_DATE() - INTERVAL 1 MONTH)) ) as b
    //                     on b.agnt_id = a.agnt_id;`
    // console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
/*****************************************************************************
* Function       : getAgntDtlsCntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgntDtlsCntsMdl = function (agnt_id) {
    var year = (new Date()).getFullYear();
    var month = (new Date()).getMonth();

    var QRY_TO_EXEC = `select d.*,b.*,c.* from
    (select 
    a.agnt_id,agnt_nm,agnt_cd,enrlt_nu,REPLACE(a.adhr_nu,SUBSTR(a.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,a.ofce_mbl_nu,
    ofce_cntct_nm,ofce_eml_tx,ofce_addr1_tx,ofce_addr2_tx,ofce_ara_nm,ofce_cty_nm,
    ofce_dstrt_id,ofce_mndl_id,ofce_vlge_id,
    ofce_lndle_nu,ofce_std_cd,
    COUNT(stpbx_id) as cpe_cnt,
    sum(case when caf_id is not null then 1 else 0 end) as cmp_cpe_cnt,
    sum(case when caf_id is  null then 1 else 0 end) as rmng_caf
    from agnt_lst_t as a
    left join inv_stpbx_lst_t bx ON a.agnt_id = bx.lmo_agnt_id and prdct_id=1
    where bx.a_in=1 and a.agnt_id=${agnt_id}
     ) d
    left join (select sum(case when enty_sts_id in (6,7,84,85,2) then 1 else 0 END)
    as ttl_caf_cnt, SUM(case when year(actvn_dt)=${year} AND month(actvn_dt)=${month} THEN 1 ELSE 0 END) as 'last30days',lmo_agnt_id from caf_dtl_t where lmo_agnt_id=${agnt_id} and a_in = 1) b on b.lmo_agnt_id=d.agnt_id
    left join (select COALESCE(SUM(atd.trnsn_at), 0) as ttl_amnt,atd.agnt_id from agnt_trnsn_dtl_t atd
    JOIN agnt_trnsn_type_lst_t as att on att.trnsn_type_id = atd.trnsn_type_id and att.trnsn_type_id=6
    where year(atd.trsn_dt)=${year} AND month(atd.trsn_dt)=${month} and atd.agnt_id=${agnt_id})c on c.agnt_id=d.agnt_id;`
    // console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getPackAggrmntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPackAggrmntMdl = function (agnt_id) {
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY psp.srvcpk_id) as sno, psp.srvcpk_id,psp.srvcpk_nm,ps.pckge_id,ps.pckge_nm,c.cre_srvce_nm,c.cre_srvce_id,a.agnt_id,a.fst_nm from pckge_agnt_prtnrs_rel_t as pa
    JOIN pckge_pln_lst_t as ps on ps.pckge_id = pa.pckge_id
    JOIN pckge_srvcpk_rel_t as pcs on pcs.pckge_id = ps.pckge_id
    JOIN pckge_srvcpk_lst_t as psp on psp.srvcpk_id = pcs.srvcpk_id
    JOIN cre_srvce_lst_t as c on c.cre_srvce_id = pcs.cre_srvce_id
    JOIN agnt_lst_t as a on a.agnt_id = pa.agnt_id
    where pa.agnt_id = ${agnt_id}
    order by psp.srvcpk_id`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getAgentByIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentByIdMdl = function (agnt_id) {

    // let dtls = data.data
    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY a.agnt_id) as s_no,agnt_id,agnt_nm,agnt_nm as NAME,agnt_cd,a.agnt_ctgry_id,ac.prtnr_nm,enrlt_nu,adhr_nu as full_adhr_nu,REPLACE(adhr_nu,SUBSTR(adhr_nu,1,8),'XXXXXXXX') as adhr_nu,pan_nu,tan_nu,tan_nu,gst_nu,
                        pstl_rgstn_nu,DATE_FORMAT(pstl_exprn_dt,'%d-%m-%Y') as date,pstl_exprn_dt,ofce_cntct_nm,ofce_mbl_nu,ofce_eml_tx,ofce_addr1_tx,ofce_addr2_tx,ofce_ara_nm,ofce_cty_nm,a.ofce_ste_id,s.ste_nm as ofce_ste,a.ofce_dstrt_id,
                        d.dstrt_nm as ofce_dstrct,a.ofce_mndl_id,m.mndl_nm as ofce_mdl,a.ofce_vlge_id,v.vlge_nm as ofce_vlge,ofce_pn_cd,ofce_lclty_nm,ofce_std_cd,ofce_lndle_nu,brnch_cntct_nm,brnch_mbl_nu,
                        brnch_eml_tx,brnch_addr1_tx,brnch_addr2_tx,brnch_ara_nm,brnch_cty_nm,
                        a.brnch_ste_id,s1.ste_nm as brnch_ste,a.brnch_dstrt_id,d1.dstrt_nm as brnch_dstrct,a.brnch_mndl_id,m1.mndl_nm as brnch_mdl,a.brnch_vlge_id,a.sme_addr_chk_in,
                        v1.vlge_nm as brnch_vlge,brnch_pn_cd,brnch_lclty_nm,brnch_std_cd,brnch_lndne_nu,wlt_blnce_at,agnt_blnce_at
                        from agnt_lst_t as a
                        JOIN prtnrs_lst_t as ac on a.agnt_ctgry_id=ac.prtnr_id
                        JOIN ste_lst_t as s on a.ofce_ste_id=s.ste_id
                        LEFT join ste_lst_t as s1 on a.brnch_ste_id=s1.ste_id
                        left JOIN dstrt_lst_t as d on a.ofce_dstrt_id=d.dstrt_id
                        left JOIN dstrt_lst_t as d1 on a.brnch_dstrt_id=d1.dstrt_id
                        left JOIN mndl_lst_t as m on a.ofce_mndl_id=m.mndl_id
                        left JOIN mndl_lst_t as m1 on a.brnch_mndl_id=m1.mndl_id
                        left JOIN vlge_lst_t as v on a.ofce_vlge_id=v.vlge_id
                        left JOIN vlge_lst_t as v1 on a.brnch_vlge_id=v1.vlge_id
                        where a.a_in=1 and a.agnt_id=${agnt_id}`;
    // -- 		JOIN agnt_dcmnt_lst_t AS ad ON ad.agnt_id = a.agnt_id
    // --      JOIN stnd_dcmns_lst_t as sd on a.id_dcmns_typ_id=sd.stnd_dcmns_id
    // --      JOIN stnd_dcmns_lst_t as sd1 on a.addrs_dcmns_typ_id=sd1.stnd_dcmns_id
    // --      JOIN bnk_acnt_type_lst_t as b on a.bnk_acnt_typ_id=b.bnk_acnt_typ_id 


    
     console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getAgentSrvArsByIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentSrvArsByIdMdl = function (agnt_id) {

    // let dtls = data.data
    var QRY_TO_EXEC = `
                        SELECT srving_ara_id,srving_ara_nm,sa.cble_type_id,cble_lngth_ct,sa.dstrct_id,dstrt_nm,sa.mndl_id,mndl_nm,
                        sa.vlge_id,vlge_nm,sbscbr_ct,cnctn_ct,dgtl_cntn_ct,anlge_cntn_ct 
                        FROM srving_ara_lst_t sa
                        left JOIN dstrt_lst_t as d on sa.dstrct_id=d.dstrt_id
                        left JOIN mndl_lst_t as m on m.dstrt_id = sa.dstrct_id AND (m.mndl_nu = sa.mndl_id or m.mndl_id = sa.mndl_id)
                        left JOIN vlge_lst_t as v on  v.dstrt_id = sa.dstrct_id AND v.mndl_id = sa.mndl_id AND (v.vlge_nu =sa.vlge_id or v.vlge_id=sa.vlge_id) 
                        WHERE agnt_id=${agnt_id} AND sa.a_in=1
                        ORDER BY srving_ara_id`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getAgentSrvAsrtByIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentSrvAsrtByIdMdl = function (agnt_id) {

    // let dtls = data.data
    var QRY_TO_EXEC = `
    SELECT srvng_ast_id,agnt_id,s.cble_type_id,cble_type_nm,s.asrt_id,asrt_nm,rt_nm,snd_trnse,imie_nu,vrsn_nu 
    FROM
    srvng_ast_dtl_t s
    left JOIN srving_cble_type_lst_t c ON s.cble_type_id = c.cble_type_id
    left JOIN srving_asrt_lst_t a ON s.asrt_id = a.asrt_id
    WHERE agnt_id=${agnt_id} AND s.a_in=1
    ORDER BY srvng_ast_id`;

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getAgentSbStnsByIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentSbStnsByIdMdl = function (agnt_id) {

    // let dtls = data.data
    var QRY_TO_EXEC = `
                        SELECT sbstn_agnt_id,agnt_id,ags.sbstn_id,sbstn_nm,sbstn_dstnce_ct,estmd_cnctn_ct,vlge_id 
                        FROM
                        agnt_sbstn_rel_t ags
                        LEFT JOIN sbstn_lst_t s ON ags.sbstn_id = s.sbstn_id
                        WHERE agnt_id=${agnt_id} AND s.a_in=1
                        ORDER BY sbstn_agnt_id`;

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getAgentDcmntsByIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentDcmntsByIdMdl = function (agnt_id) {

    // let dtls = data.data
    var QRY_TO_EXEC = `SELECT ad.agnt_id,ad.dcmnt_type_id,ad.dcmnt_ctgry_id,ad.dcmnt_url_tx,ad.dcmnt_rgn_id,ad.dcmnt_prf_nu,d.dcmnt_type_nm,dc.dcmnt_ctgry_nm 
                        from agnt_dcmnt_lst_t ad
                        left JOIN dcmnt_type_lst_t d on d.dcmnt_type_id = ad.dcmnt_type_id
                        JOIN dcmnt_ctgry_lst_t dc on dc.dcmnt_ctgry_id = ad.dcmnt_ctgry_id
                        WHERE agnt_id=${agnt_id} AND ad.a_in=1; `;

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getAgentBnkByIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentBnkByIdMdl = function (agnt_id) {

    // let dtls = data.data
    var QRY_TO_EXEC = `SELECT * from agnt_bnk_dtl_t WHERE agnt_id=${agnt_id} AND a_in=1;`;

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : get_districtsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_districtsMdl = function () {
    var QRY_TO_EXEC = `select * from dstrt_lst_t order by dstrt_nm asc`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function       : get_agent_districtsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_agent_districtsMdl = function (user) {
    if(user.usr_ctgry_ky>0){
        agntid = `where agnt_id=${user.usr_ctgry_ky}`
    }
    else{
        agntid = ``
    }
    var QRY_TO_EXEC = `select dstrt_nm,dstrt_id from agnt_lst_t as a
    join dstrt_lst_t d ON d.dstrt_id = a.ofce_dstrt_id 
    ${agntid}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function       : get_substationsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_substationsMdl = function (districtID) {
    var QRY_TO_EXEC = `select * from sbstn_lst_t where dstrct_id=${districtID} and a_in=1 order by sbstn_id`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




/*****************************************************************************
* Function       : get_mandalMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_mandalMdl = function (substnID) {
    var QRY_TO_EXEC = `select s.mndl_id,mndl_nm from
    sbstn_lst_t as s
   left join mndl_lst_t as m on m.mndl_nu = s.mndl_id
      where sbstn_id= ${substnID}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



/*****************************************************************************
* Function       : get_villagesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_villagesMdl = function (mandalID) {
    var QRY_TO_EXEC = `select * from vlge_lst_t where mndl_id=${mandalID[0].mndl_id} order by vlge_nm asc`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getMsoMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMsoMdl = function () {

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY ag.agnt_id) as s_no,COUNT(a.agnt_id) AS lmo_ct,
    ag.agnt_id AS mso_id,ag.agnt_cd AS mso_cd,ag.agnt_nm AS mso_nm,
    ag.agnt_nm as NAME,ag.agnt_ctgry_id
    ,DATE_FORMAT(ag.onbrd_ts,'%d-%m-%Y') AS mso_onbrd_dt,
    ac.prtnr_nm,ag.enrlt_nu AS mso_enrlt_nu,
    ag.ofce_cntct_nm AS mso_cntct_nm,ag.ofce_mbl_nu AS mso_mbl_nu,
    sm.ste_nm AS mso_ofc_ste_nm,
    dm.dstrt_nm AS mso_ofc_dstrct_nm,mm.mndl_nm AS mso_ofc_mndl_nm,vm.vlge_nm AS mso_ofc_vlg_nm,
    ag.pstl_rgstn_nu AS mso_pstl_rgstn_nu,DATE_FORMAT(ag.pstl_exprn_dt,'%d-%m-%Y') as mso_reg_date
    FROM agnt_lst_t as ag
	LEFT JOIN agnt_lst_t a ON ag.agnt_id = a.prnt_agnt_id
    LEFT JOIN prtnrs_lst_t as ac on ag.agnt_ctgry_id=ac.prtnr_id
    LEFT JOIN ste_lst_t as sm on ag.ofce_ste_id=sm.ste_id
    LEFT JOIN vlge_lst_t vm ON vm.vlge_nu = ag.ofce_vlge_id and vm.mndl_id = ag.ofce_mndl_id AND vm.dstrt_id = ag.ofce_dstrt_id
    LEFT JOIN mndl_lst_t mm ON mm.mndl_nu = ag.ofce_mndl_id AND vm.dstrt_id = mm.dstrt_id
    LEFT JOIN dstrt_lst_t dm ON dm.dstrt_id = vm.dstrt_id
    WHERE ag.a_in=1 AND ag.prnt_agnt_id IS NOT NULL AND ag.onbrd_in=1 AND ag.agnt_ctgry_id=3 GROUP BY ag.agnt_id ORDER BY ag.agnt_id`;

    // var QRY_TO_EXEC = `SELECT   ROW_NUMBER() OVER ( ORDER BY a.agnt_id) as s_no,
    // ag.agnt_id AS mso_id,ag.agnt_cd AS mso_cd,ag.agnt_nm AS mso_nm,
    // a.agnt_nm as NAME,ag.agnt_ctgry_id
    // ,DATE_FORMAT(a.onbrd_ts,'%d-%m-%Y') AS lmo_onbrd_dt
    // ,DATE_FORMAT(ag.onbrd_ts,'%d-%m-%Y') AS mso_onbrd_dt,
    // ac.prtnr_nm,ag.enrlt_nu AS mso_enrlt_nu,a.ofce_cntct_nm AS lmo_cntct_nm,a.ofce_mbl_nu AS lmo_mbl_nu,
    // ag.ofce_cntct_nm AS mso_cntct_nm,ag.ofce_mbl_nu AS mso_mbl_nu,
    // sm.ste_nm AS mso_ofc_ste_nm,
    // dm.dstrt_nm AS mso_ofc_dstrct_nm,mm.mndl_nm AS mso_ofc_mndl_nm,vm.vlge_nm AS mso_ofc_vlg_nm,
    // ag.pstl_rgstn_nu AS mso_pstl_rgstn_nu,DATE_FORMAT(ag.pstl_exprn_dt,'%d-%m-%Y') as mso_reg_date,
    // a.agnt_id AS lmo_id,a.agnt_cd AS lmo_cd,a.agnt_nm AS lmo_nm,a.prnt_agnt_id,
    // a.enrlt_nu AS lmo_enrlt_nu,
    // s.ste_nm AS lmo_ofc_ste_nm,
    // d.dstrt_nm AS lmo_ofc_dstrct_nm,m.mndl_nm AS lmo_ofc_mndl_nm,v.vlge_nm AS lmo_ofc_vlg_nm,
    // a.pstl_rgstn_nu AS lmo_pstl_rgstn_nu,DATE_FORMAT(a.pstl_exprn_dt,'%d-%m-%Y') as lmo_reg_date
    // from agnt_lst_t as a
    // LEFT JOIN agnt_lst_t ag ON a.prnt_agnt_id = ag.agnt_id
    // LEFT JOIN prtnrs_lst_t as ac on a.agnt_ctgry_id=ac.prtnr_id
    // LEFT JOIN ste_lst_t as sm on ag.ofce_ste_id=sm.ste_id
    // LEFT JOIN vlge_lst_t vm ON vm.vlge_nu = ag.ofce_vlge_id and vm.mndl_id = ag.ofce_mndl_id AND vm.dstrt_id = ag.ofce_dstrt_id
    // LEFT JOIN mndl_lst_t mm ON mm.mndl_nu = ag.ofce_mndl_id AND vm.dstrt_id = mm.dstrt_id
    // LEFT JOIN dstrt_lst_t dm ON dm.dstrt_id = vm.dstrt_id
    // LEFT JOIN ste_lst_t as s on a.ofce_ste_id=s.ste_id
    // LEFT JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
    // LEFT JOIN mndl_lst_t m ON m.mndl_nu = a.ofce_mndl_id AND v.dstrt_id = m.dstrt_id
    // LEFT JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    // where a.a_in=1 AND a.prnt_agnt_id IS NOT NULL AND a.onbrd_in=1`;

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
/*****************************************************************************
* Function       : insert_substationsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insert_substationsMdl = function (data, user) {
    let dlmtr = ' ,';
    let sbr_qry = ' '


    var QRY_TO_EXEC = `INSERT INTO agnt_sbstn_rel_t (agnt_id,sbstn_id,sbstn_dstnce_ct,vlge_id,crte_usr_id,a_in,i_ts) VALUES`;


    for (j = 0; j < data.s_villages_id.length; j++) {
        if (j + 1 == data.s_villages_id.length) {
            dlmtr = ' ;'
        }
        sbr_qry += ` (${data.s_agnt_id},${data.s_substatn_id},'${data.s_count}','${data.s_villages_id[j]}','${user.mrcht_usr_id}',1,current_timestamp()) ${dlmtr} `;
    }


    QRY_TO_EXEC += sbr_qry;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




/*****************************************************************************
* Function       : getSbStnsLstByAgntIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getSbStnsLstByAgntIdMdl = function (agntId) {
    var QRY_TO_EXEC = `select r.agnt_id,r.sbstn_id,s.sbstn_nm,r.sbstn_dstnce_ct as count,DATE_FORMAT(r.i_ts, "%d-%m-%Y") as dt,t.sbstn_type_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm from 
   agnt_sbstn_rel_t as r 
   left join sbstn_lst_t as s on s.sbstn_id = r.sbstn_id
   left join sbstn_type_lst_t as t on t.sbstn_type_id = s.sbstn_type_id
   left JOIN vlge_lst_t v ON v.vlge_id = r.vlge_id
   left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id and m.dstrt_id = v.dstrt_id
   left JOIN dstrt_lst_t d on d.dstrt_id = m.dstrt_id
   where r.agnt_id=${agntId}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




/*****************************************************************************
* Function       : get_olts_portsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_olts_portsMdl = function (agntID) {
    var QRY_TO_EXEC = `select d.dstrt_nm,m.mndl_nm,l.sbstn_id,s.sbstn_nm,st.sbstn_type_nm,l.olt_id,l.olt_nm,l.olt_ip_addr_tx,l.olt_srl_nu,p.olt_prt_id,p.olt_prt_nm,p.agnt_id from
   olt_lst_t as l
   LEFT JOIN olt_prts_lst_t as p on p.olt_id = l.olt_id
   left join sbstn_lst_t as s on s.sbstn_id = l.sbstn_id
   left join sbstn_type_lst_t as st on st.sbstn_type_id = s.sbstn_type_id
   left JOIN mndl_lst_t m ON m.mndl_nu = s.mndl_id and m.dstrt_id = s.dstrct_id
   left JOIN dstrt_lst_t d on d.dstrt_id = m.dstrt_id
   where p.agnt_id=${agntID}`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getDocTypsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDocTypsMdl = function () {
    var QRY_TO_EXEC = ` SELECT * FROM
                        dcmnt_type_lst_t
                        ORDER BY dcmnt_type_id;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : prfDocMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.prfDocMdl = function (prfData, insertId, user) {
    // console.log(prfData)
    // if(prfData.prf_dcmn == ''){
    //     prfData.prf_dcmn = 0;
    // }
    var QRY_TO_EXEC = ` INSERT INTO agnt_dcmnt_lst_t(agnt_id,dcmnt_type_id,dcmnt_ctgry_id,dcmnt_url_tx,dcmnt_prf_nu,a_in,i_ts)
                        VALUES(${insertId},'${prfData.prf_dcmn}','${prfData.doc_ctgry}','${prfData.image}','${prfData.prf_Nu}',1,CURRENT_TIMESTAMP());`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



/*****************************************************************************
* Function       : get_mandalsLstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_mandalsLstMdl = function (districtID) {
    dst=``;
    if(districtID > 0){
        dst=`and dstrt_id=${districtID}`
    }
    var QRY_TO_EXEC = `select * from mndl_lst_t where 1=1 ${dst} order by mndl_nm asc`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : get_agnet_mandalsLstMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_agnet_mandalsLstMdl = function (user,districtID) {
    if(user.usr_ctgry_ky>0){
        agntid = `and a.agnt_id=${user.usr_ctgry_ky}`
    }
    else{
        agntid = ``
    }
    var QRY_TO_EXEC = `select dstrt_nm,d.dstrt_id,mndl_nu,mndl_id,mndl_nm from agnt_lst_t as a
    join dstrt_lst_t d ON d.dstrt_id = a.ofce_dstrt_id ${agntid}
    join mndl_lst_t as m on m.mndl_nu=a.ofce_mndl_id and m.dstrt_id=a.ofce_dstrt_id
    where  d.dstrt_id = ${districtID} `;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : get_agnt_vlgeListMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_agnt_vlgeListMdl = function (user, mndl_id, dsrtct_id) {
    if(user.usr_ctgry_ky>0){
        agntid = `and agnt_id=${user.usr_ctgry_ky}`
    }
    else{
        agntid = ``
    }
	if( user.usr_ctgry_ky == 8480 || user.usr_ctgry_ky == 3083 || user.usr_ctgry_ky == 9610 ){
		var QRY_TO_EXEC = ` select dstrt_nm,d.dstrt_id,mndl_nu,m.mndl_id,mndl_nm,vlge_nu,vlge_id,vlge_nm from agnt_lst_t as a
		join dstrt_lst_t d ON d.dstrt_id = a.ofce_dstrt_id 
		join mndl_lst_t as m on m.mndl_nu=a.ofce_mndl_id and m.dstrt_id=a.ofce_dstrt_id ${agntid}
		JOIN vlge_lst_t v ON v.vlge_nu = a.ofce_vlge_id  and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
		where m.dstrt_id=${dsrtct_id} and m.mndl_nu=${mndl_id}`;
	} else {
		 var QRY_TO_EXEC = ` select dstrt_nm,d.dstrt_id,mndl_nu,m.mndl_id,mndl_nm,vlge_nu,vlge_id,vlge_nm from agnt_lst_t as a
		join dstrt_lst_t d ON d.dstrt_id = a.ofce_dstrt_id 
		join mndl_lst_t as m on m.mndl_nu=a.ofce_mndl_id and m.dstrt_id=a.ofce_dstrt_id ${agntid}
		JOIN vlge_lst_t v ON v.vlge_id = a.ofce_vlge_id  and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
		where m.dstrt_id=${dsrtct_id} and m.mndl_nu=${mndl_id}`;
	}
     // console.log("222222222222222222222222222");
     // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



/*****************************************************************************
* Function       : get_oltDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_oltDetailsMdl = function (districtID, mandalID) {
    var QRY_TO_EXEC = `
    select o.olt_id,o.olt_nm,o.olt_ip_addr_tx,o.olt_srl_nu,count(DISTINCT p.olt_prt_id) as portcount,o.sbstn_id,s.sbstn_nm,s.sbstn_unq_cd,t.sbstn_type_nm,count(DISTINCT caf_id) as cafcount,s.dstrct_id,s.mndl_id,crd_id from 
    olt_lst_t  as o 
     left join olt_prts_lst_t as p on p.olt_id=o.olt_id
     join sbstn_lst_t as s on s.sbstn_id = o.sbstn_id
     left join sbstn_type_lst_t as t on t.sbstn_type_id = s.sbstn_type_id
    left join caf_dtl_t as c on c.olt_id=o.olt_id
     where s.dstrct_id =${districtID} and s.mndl_id=${mandalID}
    GROUP BY o.olt_id
    order by o.olt_id`;
    // console.log("########################################################");
    // console.log(QRY_TO_EXEC);
    // console.log("########################################################");
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function       : get_portWiseOltDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_portWiseOltDetailsMdl = function (data) {
    var QRY_TO_EXEC = `
    select o.olt_id,o.olt_nm,p.olt_prt_id,p.olt_prt_nm,p.agnt_id,a.agnt_cd,a.agnt_nm,count(DISTINCT caf_id) as cafct,DATE_FORMAT(p.i_ts, "%d-%m-%Y") as dt,DATE_FORMAT(p.u_ts, "%d-%m-%Y") as udt,m.mrcht_usr_nm as crtdBy,mu.mrcht_usr_nm as updBy,crd_id from
    olt_lst_t as o
    LEFT JOIN olt_prts_lst_t as p on p.olt_id=o.olt_id
    left join agnt_lst_t as a on a.agnt_id=p.agnt_id
    left join caf_dtl_t as c on c.olt_prt_id = p.olt_prt_id and c.trmnd_in=0 and c.trmnd_rqst_in=0
    left join agnt_sbstn_rel_t as s on s.sbstn_id = o.sbstn_id
    left join mrcht_usr_lst_t as m on m.mrcht_usr_id=p.crte_usr_id
    left join mrcht_usr_lst_t as mu on mu.mrcht_usr_id=p.updte_usr_id
    where o.olt_id in(${data[0]}) 
    group by o.olt_id,p.olt_prt_id
    order by o.olt_id,p.olt_prt_id`;
    // console.log("*************************************************");
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




/*****************************************************************************
* Function       : get_tenantListMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_tenantListMdl = function (data) {
    var QRY_TO_EXEC = `select o.olt_id,a.agnt_id,a.agnt_nm,a.agnt_cd from 
    olt_lst_t as o
    join agnt_sbstn_rel_t as s on s.sbstn_id  = o.sbstn_id
    join agnt_lst_t as a on a.agnt_id=s.agnt_id
    GROUP BY a.agnt_id
    order by a.agnt_nm desc`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



/*****************************************************************************
* Function       : insert_portToAgentMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insert_portToAgentMdl = function (data, user, callback) {
    var count = 0;
    for (var k = 0; k < data.length; k++) {
        var QRY_TO_EXEC = `UPDATE olt_prts_lst_t SET agnt_id=${data[k].agntIdRl},updte_usr_id =${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()  WHERE olt_prt_id=${data[k].olt_prt_id}  and olt_id=${data[k].olt_id}`;
       
        console.log("myoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(QRY_TO_EXEC)
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, (error, result) => {
            count++
            if (count == data.length) {
                callback(error, result);
                return;
            }
        })

    }
};

/*****************************************************************************
* Function       : srvngsbstnMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.srvngsbstnMdl = function (sbstnData, insertId,user) {
    var QRY_TO_EXEC = `INSERT INTO agnt_sbstn_rel_t(agnt_id,sbstn_id,sbstn_dstnce_ct,vlge_id,a_in,i_ts)VALUES(${insertId},${sbstnData.sb_stn.sbstn_id},${sbstnData.sb_stn_dst},4,1,CURRENT_TIMESTAMP())`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function       : srvngbnkAcntMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.srvngbnkAcntMdl = function (bnkData, insertId,user) {
    // console.log('In Bank Mdl')
    // console.log(bnkData)
    var QRY_TO_EXEC = `INSERT INTO agnt_bnk_dtl_t(agnt_id,bnk_acnt_nu,ifsc_cd,brnch_nm,bnk_nm,svngs_in,a_in,i_ts) VALUES(${insertId},'${bnkData.acnt_Nu}','${bnkData.ifsc_cd}','${bnkData.brnch}','${bnkData.bnk_nm}',1,1,CURRENT_TIMESTAMP())`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function       : getAgentOrgnTypeMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAgentOrgnTypeMdl = function (user) {
    var QRY_TO_EXEC = ` SELECT * FROM
                        orgn_type_lst_t
                        ORDER BY orgn_type_id`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}

/*****************************************************************************
* Function       : postAgntEnrlmntDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.postAgntEnrlmntDtlsMdl = function (data, user) {

    if (data.das_license) {
        var dasflds = 'das_lnse_nu,das_lnse_dt';
        var dasInsrtFlds = `,${data.das_license.das_lnse_nu},${data.das_license.das_lnse_dt}`
    }
    if (data.pay_chnls) {
        var pychnlsFlds = 'py_chnl_nu,py_chnl_pymnt,py_chnl_emply_cnt,py_chnl_yr,py_chnl_hse_cnt,py_chnl_sbscr_cnt,py_chnl_cncnt_cnt';
        var pyInsrtFlds = `,${data.pay_chnls.py_chnl_nu},${data.pay_chnls.py_chnl_pymnt},${data.pay_chnls.py_chnl_emply_cnt},${data.pay_chnls.py_chnl_yr}
                            ,${data.pay_chnls.py_chnl_hse_cnt},${data.pay_chnls.py_chnl_sbscr_cnt},${data.pay_chnls.py_chnl_cncnt_cnt}`;
    }
    var QRY_TO_EXEC = ` INSERT INTO agnt_enrlt_lst_t(agnt_id,sbstn_id,sbstn_dstnce_ct,vlge_id,crte_usr_id,a_in,i_ts)
                        VALUES(${agntCmpnyInfo.orgn_typ},${agntCmpnyInfo.agnt_cmpny_nm},${agntCmpnyInfo.agnt_cntct_nm},${agntCmpnyInfo.mble_Nu},${agntCmpnyInfo.agnt_email},
                            ${operationalAddress.oprtnl_ara_nm},${operationalAddress.oprtnl_strt},${operationalAddress.oprtnl_state},${operationalAddress.oprtnl_dstrt},${operationalAddress.oprtnl_mndl},${operationalAddress.oprtnl_vlge},${operationalAddress.oprtnl_pn_cd},
                            1,CURRENT_TIMESTAMP())`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}

/*****************************************************************************
* Function       : getAllAgentsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAllAgentsMdl = function (value) {
    var QRY_TO_EXEC = `select  * from agnt_lst_t where (agnt_cd LIKE '%${value}%' or agnt_nm like '%${value}%') and (agnt_ctgry_id = 1 or agnt_ctgry_id = 3 or agnt_ctgry_id = 6 or agnt_ctgry_id = 4) limit 100`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
/*****************************************************************************
* Function       : getAllAgentsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAllAgentsByCtgryMdl = function (value, id) {
    if(id == 'null'){
        var QRY_TO_EXEC = `select  * from agnt_lst_t where (agnt_cd LIKE '%${value}%' or agnt_nm like '%${value}%') limit 1000`;
    }
    else{
        var QRY_TO_EXEC = `select  * from agnt_lst_t where (agnt_cd LIKE '%${value}%' or agnt_nm like '%${value}%') and agnt_ctgry_id = ${id} limit 1000`;
    }

    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
/*****************************************************************************
* Function       : getAllEnrldAgntsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAllEnrldAgntsMdl = function () {
    var QRY_TO_EXEC = ` SELECT  ROW_NUMBER() OVER ( ORDER BY a.agnt_id DESC) as s_no,agnt_id,agnt_nm,a.agnt_ctgry_id,ac.prtnr_nm,prtnr_cd,a.enrlt_nu,
    s.ste_nm as ofc_ste_nm,d.dstrt_nm as ofc_dstrct_nm,m.mndl_nm as ofc_mndl_nm,a.ofce_mbl_nu,v.vlge_nm as ofc_vlg_nm,
    pstl_rgstn_nu,DATE_FORMAT(pstl_exprn_dt,'%d-%m-%Y') as date,pstl_exprn_dt,DATE_FORMAT(a.i_ts,'%d-%m-%Y') AS enrl_dt,
    a.ofce_vlge_id,a.ofce_dstrt_id,a.ofce_mndl_id,a.brnch_vlge_id,a.brnch_dstrt_id,a.brnch_mndl_id
    from agnt_lst_t as a
    JOIN prtnrs_lst_t as ac on a.agnt_ctgry_id=ac.prtnr_id
    left JOIN ste_lst_t as s on a.ofce_ste_id=s.ste_id
    left JOIN vlge_lst_t v ON v.vlge_id = a.ofce_vlge_id 
    left JOIN mndl_lst_t m ON m.mndl_nu = a.ofce_mndl_id AND m.dstrt_id = a.ofce_dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    where a.a_in=1 AND onbrd_in=0 AND onbrd_rjct_in=0 AND agnt_ctgry_id IN (1,3) AND slf_rgnrn_ts IS NOT NULL ORDER BY a.i_ts DESC;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getAllEnrlRejectMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getAllEnrlRejectMdl = function () {
    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY a.agnt_id DESC) as s_no,agnt_id,agnt_nm,a.agnt_ctgry_id,ac.prtnr_nm,prtnr_cd,a.enrlt_nu,
    s.ste_nm as ofc_ste_nm,d.dstrt_nm as ofc_dstrct_nm,m.mndl_nm as ofc_mndl_nm,a.ofce_mbl_nu,v.vlge_nm as ofc_vlg_nm,
    pstl_rgstn_nu,DATE_FORMAT(pstl_exprn_dt,'%d-%m-%Y') as date,pstl_exprn_dt,DATE_FORMAT(a.i_ts,'%d-%m-%Y') AS enrl_dt,
    a.ofce_vlge_id,a.ofce_dstrt_id,a.ofce_mndl_id,a.brnch_vlge_id,a.brnch_dstrt_id,a.brnch_mndl_id
    from agnt_lst_t as a
    JOIN prtnrs_lst_t as ac on a.agnt_ctgry_id=ac.prtnr_id
    left JOIN ste_lst_t as s on a.ofce_ste_id=s.ste_id
    left JOIN vlge_lst_t v ON v.vlge_id = a.ofce_vlge_id
    left JOIN mndl_lst_t m ON m.mndl_nu = a.ofce_mndl_id AND m.dstrt_id = a.ofce_dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    where a.a_in=1 AND onbrd_in=0 AND onbrd_rjct_in=1 AND agnt_ctgry_id IN (1,3) AND slf_rgnrn_ts IS NOT NULL ORDER BY a.i_ts DESC;`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : initialPymntAmtInsrtMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.initialPymntAmtInsrtMdl = function (agnt_id, user) {
    var QRY_TO_EXEC = ` INSERT INTO agnt_trnsn_dtl_t(trnsn_at,agnt_id,trnsn_type_id,pymnt_mde_id,wlt_blnce_at,agnt_blnce_at,aprve_ts,aprve_usr_id,
                        crte_usr_id,a_in,i_ts)
                        VALUES(0,${agnt_id},12,1,4000,0,CURRENT_TIMESTAMP(),0,${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;
                        // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getMsoLmoDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMsoLmoDtlsMdl = function (msoid) {

    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY a.agnt_id) as s_no,agnt_id
    ,agnt_nm as lmo_nm,agnt_cd as lmo_cd,a.agnt_ctgry_id
    ,ac.prtnr_nm,prtnr_cd,enrlt_nu as lmo_enrlt_nu,DATE_FORMAT(a.onbrd_ts,'%d-%m-%Y') AS lmo_onbrd_dt,
    a.ofce_cntct_nm AS lmo_cntct_nm,a.ofce_mbl_nu AS lmo_mbl_nu,
    pstl_rgstn_nu,DATE_FORMAT(pstl_exprn_dt,'%d-%m-%Y') as date,pstl_exprn_dt,s.ste_nm as
    lmo_ofc_ste_nm,d.dstrt_nm as lmo_ofc_dstrct_nm,m.mndl_nm as lmo_ofc_mndl_nm,v.vlge_nm as lmo_ofc_vlg_nm
    from agnt_lst_t as a
    JOIN prtnrs_lst_t as ac on a.agnt_ctgry_id=ac.prtnr_id  
    left JOIN ste_lst_t as s on a.ofce_ste_id=s.ste_id                   
    left JOIN vlge_lst_t as v on a.ofce_vlge_id=v.vlge_nu and v.mndl_id = a.ofce_mndl_id AND v.dstrt_id = a.ofce_dstrt_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    where a.a_in=1 AND ac.prtnr_nm = 'LMO' AND onbrd_in=1 AND prnt_agnt_id=${msoid}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : getMsoDtlsByAdhrMblMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMsoDtlsByAdhrMblMdl = function (data) {
    var wherecond = ``;
    // if(data.self_reg == true){
    //     wherecond = `AND agnt_ctgry_id = ${data.prtnr_id}`
    // } else {
    //     wherecond = `AND slf_rgnrn_ts IS NULL AND onbrd_in=0`
    // }
    var QRY_TO_EXEC = `SELECT * FROM
    agnt_lst_t
    WHERE
    adhr_nu=${data.adhr_nu} AND ofce_mbl_nu=${data.mbl_nu} AND agnt_ctgry_id = ${data.ctgry_id} AND a_in=1`;
console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function       : updateAgntDtlsByRegMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updateAgntDtlsByRegMdl = function (data) {
    var QRY_TO_EXEC = `UPDATE agnt_lst_t 
    SET slf_rgnrn_ts=CURRENT_TIMESTAMP(),u_ts=CURRENT_TIMESTAMP()
    WHERE
    agnt_id=${data.newagnt_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function       : getMnthlyMSOCollectionsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getMnthlyMSOCollectionsMdl = function (data, user) {
    console.log('getMnthlyMSOCollectionsMdl');

    console.log(data);
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;

    console.log('-----------------------', data.p_in)
    if (data.p_in == 0 || data.p_in == 1) {
        console.log('-----------------------', data.p_in)
        if (data.p_in == 1) {
            pd_in = `where cst.pndng_blne_at=0 and i.pd_in=1`
        } else {
            console.log('-----------------------')
            pd_in = `where  (cst.pndng_blne_at is null or cst.pndng_blne_at <> 0) and i.pd_in=0`
        }
    }
    else {
        pd_in = ``
    }

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += `and cf.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += `and cst.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += `and cst.cntct_mble1_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cst.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and cf.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }

    var QRY_TO_EXEC = `select ROUND(i.invce_at+i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at) as 'ltst_inv_amnt',count(*) as caf_ct ,cf.caf_id,cf.caf_type_id, DATE_FORMAT(i.invce_dt,'%d-%m-%Y')  as 'ltst_inv_dt' ,
    cst.pndng_blne_at as 'prvs_blnc',cst.cstmr_nm as frst_nm, cst.lst_nm,ct.caf_type_nm , REPLACE(cst.adhr_nu,SUBSTR(cst.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    cst.cntct_mble1_nu,cst.cstmr_id,cst.cstmr_nm,
    case when cst.pndng_blne_at=0 then 'PAID' when cst.pndng_blne_at is null or cst.pndng_blne_at <> 0 then 'Not Paid'  end lbl_txt,
    case when cst.pndng_blne_at=0 then '1' when cst.pndng_blne_at is null or cst.pndng_blne_at <> 0 then '0'  end pd_in,i.caf_invce_id
    FROM caf_dtl_t cf
    join cstmr_dtl_t as cst on cf.cstmr_id =cst.cstmr_id AND cf.mso_agnt_id =${data.agntID} AND cf.enty_sts_id in (1,2,4,6,7,10,11,22,84,85,100) 
    join caf_type_lst_t ct on cst.caf_type_id =ct.caf_type_id
    left join erp_invce_lst_t as i on i.caf_invce_id = cf.lst_invce_id
    ${pd_in} ${where_cnd}
    GROUP BY cst.cstmr_id
    order by cst.cstmr_id  limit ${pge_nu}, 20`



    console.log("************** MSO Monthly Collections **********************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

}

/*****************************************************************************
* Function       : insrtUsrRlePermsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insrtUsrRlePermsMdl = function (data) {
    var QRY_TO_EXEC = `INSERT INTO
    rle_mrcht_usr_rel_t(rle_id,mrcht_usr_id,i_ts)
    VALUES(${data.rle_id},${data.insertId},CURRENT_TIMESTAMP());`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};