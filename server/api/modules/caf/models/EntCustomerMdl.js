var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
/*****************************************************************************
* Function      : insrtCustmrMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCstmrMdl = (data, user, callback) => {
    var fnm = "insrtCstmrMdl"
    var QRY_TO_EXEC = `INSERT INTO cstmr_dtl_t (frst_nm,lst_nm,adhr_nu,pan_nu,caf_type_id,custu_id,prnt_cstmr_id,bsns_type_id,
                        gndr_id,pymnt_lblty_in,instl_eml1_tx,blng_eml1_tx,regbal,chargedbal,depbal,nxt_invce_at,status,blckd_in,enty_sts_id,agnt_id,crte_usr_id,a_in,i_ts,lvl_in)
                        VALUES ('${data.cstmr_fst_nm}','${data.cstmr_lst_nm}',${data.adhr_nu},'${data.pan_nu}',${data.custmrTyp},0,0,0,
                        ${data.gndr_id},0,'${data.cstmr_emle_tx}','${data.cstmr_emle_tx}',0,0,0,0,0,0,0,0,${user.mrcht_usr_id},1,CURRENT_TIMESTAMP(),2);`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : get_lmosMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getorgtypMdl = (user, callback) => {
    var fnm = "getorgtypMdl"


    // console.log(data,'---------------------------------------------------------')

    var QRY_TO_EXEC = ` SELECT * from entrpe_cstmr_typ_lst_t where a_in=1
      `;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getsuborgtypMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
******************************************************************************/
exports.getsuborgtypMdl = (id, user, callback) => {
    var fnm = "getsuborgtypMdl"


    // console.log(data,'---------------------------------------------------------')

    var QRY_TO_EXEC = ` SELECT * from entrpe_cstmr_sub_typ_lst_t where a_in=1 and entrpe_type_id
      `;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : insrtentCstmrMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtentCstmrMdl = (data, cstmr_id, user, callback) => {
    var fnm = "insrtentCstmrMdl"
    let prnt_cstmr_id = cstmr_id;
    if (data.hasOwnProperty('prnt_cstmr_id'))
        prnt_cstmr_id = data.prnt_cstmr_id


    var QRY_TO_EXEC = `INSERT INTO cstmr_dtl_t (cstmr_id ,custu_id,cstmr_nm, caf_type_id,bsns_type_id, prnt_cstmr_id, enttypelov,tan_nu,  frst_nm,
        loc_addr1_tx,loc_lcly_tx, loc_ara_tx,loc_mndl_id, loc_dstrct_id, loc_vlge_id,loc_eml1_tx,  blng_addr1_tx, blng_lcly_tx,blng_ara_tx,
       blng_mndl_id, blng_dstrct_id, blng_ste_id, blng_vlge_id,blng_pn_cd, cntct_mble1_nu,actvn_dt,frqncy_id,enty_sts_id, agnt_id,crte_usr_id,
       a_in, lmo_agnt_cd, mso_agnt_cd,gndr_id,entrpe_type_id,cntct_nm,lvl_in) 
        VALUES (${cstmr_id} ,${cstmr_id},'${data.orgName}', ${data.caf_type_id},1, ${prnt_cstmr_id}, 'Enterprise','${data.pan_nu}', '${data.orgName}', 
          
           '${data.instl_house_flat_no + data.instl_buildingname}', '${data.instl_streetname}','${data.loc_lcly_tx}',
           '${data.instl_mndle_id}', '${data.instl_dstrt_id}', '${data.instl_cty_id}',
                  '${data.cstmr_emle_tx}', '${data.blng_house_flat_no + data.blng_buildingname}', '${data.blng_streetname}', 
            '${data.blng_lclty_tx}','${data.blng_mndle_id}', '${data.blng_dstrt_id}', ${data.blng_ste_id},'${data.blng_cty_id}','${data.blng_pn_cd}',
      '${data.mbl_nu}','${data.actvtn_dt}','${data.blng_frqny_id}','${data.enty_sts_id}', '${data.agnt_id}',
       '${user.mrcht_usr_id}', 1, '${user.lmo_cd}', '${user.mso_cd}','${data.gender}','${data.org_typ}','${data.cntprsnName}',2);`;

    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : insrtusrMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtusrMdl = (data, user, callback) => {
    var fnm= "insrtusrMdl"


    console.log(data, '---------------------------------------------------------')
    var QRY_TO_EXEC = `
    INSERT INTO mrcht_usr_lst_t(mrcht_usr_nm,pswrd_encrd_tx,crte_usr_id,a_in,i_ts)
    VALUES ('${data.orgName}',sha1('${data.mobileNumber}',${user.mrcht_usr_id},1,CURRENT_TIMESTAMP()));
    `;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : getEntCstmrdtMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
******************************************************************************/
exports.getEntCstmrdtMdl = (user, callback) => {
    var fnm = "getEntCstmrdtMdl"
    // console.log(data,'---------------------------------------------------------')
    console.log(user)
    //     var QRY_TO_EXEC = `select SUM(CASE WHEN cf.caf_id is NOT NULL THEN 1 ELSE 0 END) as ttl_cafs, c.cstmr_id,c.caf_type_id,frst_nm,mdlr_nm,        lst_nm, cstmr_nm,pymnt_lblty_in,loc_addr1_tx,loc_addr2_tx,loc_lcly_tx,loc_ara_tx,loc_lctn_tx,
    //     frqncy_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,loc_eml1_tx,cntct_nm,cntct_mble1_nu,e.entrpe_type_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,cf.enty_sts_id,sts_nm
    //  from cstmr_dtl_t c
    //     left JOIN blng_frqncy_lst_t b on b.frqncy_id =c.frqncy_id
    //     left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
    //     left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
    //     left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
    //     left join entrpe_cstmr_typ_lst_t e on  c.entrpe_type_id =e.entrpe_type_id        
    //     left join caf_dtl_t cf on cf.cstmr_id = c.cstmr_id
    //     left join enty_sts_lst_t cs on cf.enty_sts_id = cs.enty_sts_id
    //     WHERE c.caf_type_id =2 and prnt_cstmr_id = c.cstmr_id
    //     GROUP BY c.cstmr_id ORDER BY cstmr_nm`;
    var QRY_TO_EXEC = `select SUM(CASE WHEN cf.caf_id is NOT NULL THEN 1 ELSE 0 END) as ttl_cafs,c.cstmr_id,c.caf_type_id,c.frst_nm,c.mdlr_nm,c.lst_nm,c.cstmr_nm,c.pymnt_lblty_in,c.loc_addr1_tx,c.loc_addr2_tx,c.loc_lcly_tx,c.loc_ara_tx,c.loc_lctn_tx,
                    frqncy_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,c.loc_eml1_tx,c.cntct_nm,c.cntct_mble1_nu,e.entrpe_type_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,cf.enty_sts_id,sts_nm
                    from cstmr_dtl_t c
                    left JOIN cstmr_dtl_t as cd on cd.prnt_cstmr_id = c.cstmr_id
                    left JOIN blng_frqncy_lst_t b on b.frqncy_id =c.frqncy_id
                    left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
                    left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
                    left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
                    left join entrpe_cstmr_typ_lst_t e on  c.entrpe_type_id =e.entrpe_type_id        
                    left join caf_dtl_t cf on cf.cstmr_id = cd.cstmr_id
                    left join enty_sts_lst_t cs on cf.enty_sts_id = cs.enty_sts_id
                    WHERE c.caf_type_id =2 and c.prnt_cstmr_id = c.cstmr_id and c.a_in=1 
                    GROUP BY c.cstmr_id 
                    ORDER BY d.dstrt_nm,m.mndl_nm,v.vlge_nm`;

    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getEntCstmrdtMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
******************************************************************************/
exports.getEntCstmrdtbylmoMdl = (user, callback) => {
    var fnm ="getEntCstmrdtbylmoMdl"
    // console.log(data,'---------------------------------------------------------')
    console.log(user)
    var QRY_TO_EXEC =
        `select * from
(select SUM(CASE WHEN cf.caf_id is NOT NULL THEN 1 ELSE 0 END) as ttl_cafs, c.cstmr_id,c.caf_type_id,frst_nm,mdlr_nm, lst_nm, cstmr_nm,pymnt_lblty_in,loc_addr1_tx,loc_addr2_tx,loc_lcly_tx,loc_ara_tx,loc_lctn_tx,
frqncy_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,loc_eml1_tx,cntct_nm,cntct_mble1_nu,e.entrpe_type_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,sts_nm
from cstmr_dtl_t c
left JOIN blng_frqncy_lst_t b on b.frqncy_id =c.frqncy_id
left join vlge_lst_t as v on v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id and v.vlge_nu = c.loc_vlge_id
left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id
and m.mndl_nu = c.loc_mndl_id
left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id left join entrpe_cstmr_typ_lst_t e on c.entrpe_type_id =e.entrpe_type_id
left join caf_dtl_t cf on cf.cstmr_id = c.cstmr_id
left JOIN enty_sts_lst_t es ON c.enty_sts_id = es.enty_sts_id
WHERE c.caf_type_id =2 and lvl_in=2 and prnt_cstmr_id = c.cstmr_id and
c.agnt_id= ${user.usr_ctgry_ky}
GROUP BY c.cstmr_id ORDER BY cstmr_nm) as a
union ALL
(select NULL,cstmr_id,caf_type_id,frst_nm,mdlr_nm, lst_nm, cstmr_nm,pymnt_lblty_in,loc_addr1_tx,loc_addr2_tx,loc_lcly_tx,loc_ara_tx,loc_lctn_tx,
'Monthly','Vijayawada','Vijayawada','Krishna',loc_eml1_tx,cntct_nm,cntct_mble1_nu,'GOVT',DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,'Active'
 from cstmr_dtl_t c  
where lvl_in=1);`;

    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getentcstmrcaflstMdl
* Description   :
* Arguments     : callback function
******************************************************************************/
exports.getentcstmrcaflstMdl = (cstmr_id, user, callback) => {
    var fnm = "getentcstmrcaflstMdl"
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and cf.lmo_agnt_id=${user.usr_ctgry_ky} `
    }



    var QRY_TO_EXEC = `SELECT count(*) as tot_cafs,
    SUM(CASE WHEN cf.enty_sts_id=6 THEN 1 ELSE 0 END) AS tot_actv_cafs,
    SUM(CASE WHEN cf.enty_sts_id=7 THEN 1 ELSE 0 END) AS tot_spnd_cafs,
    SUM(CASE WHEN cf.enty_sts_id=8 THEN 1 ELSE 0 END) AS tot_trmnd_cafs,
    SUM(CASE WHEN (cf.enty_sts_id <> 6 and cf.enty_sts_id <> 7 and cf.enty_sts_id <> 8) then 1 else 0 end) as others
    FROM cstmr_dtl_t c
    JOIN caf_dtl_t cf on cf.cstmr_id = c.cstmr_id
                        WHERE c.caf_type_id =2 and c.prnt_cstmr_id =  ${cstmr_id} ${where}`;
    // console.log(data,'---------------------------------------------------------')
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getentcstmrcaflstMdl
* Description   :
* Arguments     : callback function
******************************************************************************/
exports.getentcstmrnodelstMdl = (id, user, callback) => {
    var fnm = "getentcstmrnodelstMdl"
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and a.agnt_id=${user.usr_ctgry_ky} `
    }

    // console.log(data,'---------------------------------------------------------')

    // var QRY_TO_EXEC = ` select cstmr_id,caf_type_id,frst_nm,mdlr_nm,   lst_nm, cstmr_nm,pymnt_lblty_in,loc_addr1_tx,loc_addr2_tx,loc_lcly_tx,loc_ara_tx,loc_lctn_tx,
    // frqncy_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,loc_eml1_tx,cntct_nm,cntct_mble1_nu from cstmr_dtl_t c
    // left JOIN blng_frqncy_lst_t b on b.frqncy_id =c.frqncy_id
    // left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
    // left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
    // left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
    // WHERE caf_type_id =2 and prnt_cstmr_id = ${id.id}
    // group BY cstmr_id 
    //   `;


    var QRY_TO_EXEC = `select c.cstmr_id,cstmr_nm,c.agnt_id,agnt_nm,agnt_cd as lmo_cd,d.dstrt_nm ,m.mndl_nm,bfl.frqncy_nm,cntct_mble1_nu,'Profile' as 'Profile',
    cf.caf_id,cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.lat,cf.lng,cf.pndng_blne_at,cf.lst_pd_dt,cf.lst_pd_at,cf.lst_invce_id,cf.trmnd_in,cf.trmnd_rqst_in,cf.actve_in,cf.spnd_in,
    cf.blckd_in,cf.blckd_rqst_in,cf.dsptd_in,cf.blble_caf_in,cf.pstpd_inve_in,cf.spnd_ts,cf.rsme_ts,cf.actvn_ts,cf.actvn_dt,cf.instd_ts,cf.trmnd_ts,cf.trmnd_dt,cf.enty_sts_id,
    cf.caf_type_id,cf.mso_agnt_id,cf.lmo_agnt_id,cf.crnt_pln_id,cf.frqncy_id,cf.prnt_caf_id,cf.lg_id,cf.aaa_cd,cf.aghra_cd,cf.apsf_unq_id,cf.mdlwe_sbscr_id,cf.cstmr_id,
    cf.instl_addr1_tx,cf.instl_addr2_tx,cf.instl_lcly_tx,cf.instl_ara_tx,cf.instl_ste_id,cf.instl_dstrct_id,cf.instl_mndl_id,cf.instl_vlge_id,cf.instl_std_cd,cf.instl_eml1_tx,
    cf.instl_lmdle1_nu,cf.onu_stpbx_id,cf.onu_srl_nu,cf.onu_mac_addr_tx,cf.onu_emi_ct,cf.onu_upfrnt_at,cf.onu_own_in,cf.onu_prc_at,cf.olt_id,cf.olt_srl_nu,cf.olt_ip_addr_tx,
    cf.olt_onu_id,cf.olt_prt_id,cf.olt_prt_nm,cf.olt_crd_nu,cf.splt_id,cf.olt_prt_splt_tx,cf.pop_id,cf.caf_mac_addr_tx,cf.iptv_stpbx_id,cf.iptv_srl_nu,
    cf.iptv_mac_addr_tx,cf.iptv_upfrnt_at,cf.iptv_prc_at,cf.iptv_emi_ct,cf.iptv_own_in,cf.tp_ct,cf.instl_chrg_at,cf.cnctn_sts_id,cf.cnctn_dt,cf.pstpd_in,cf.rgd_caf_in
    ,DATE_FORMAT(cf.actvn_dt ,'%d-%m-%Y') as actvn_dt
    ,DATE_FORMAT(cf.trmnd_dt,'%d-%m-%Y') as trmnd_dt,
    DATE_FORMAT(date(cf.spnd_ts),'%d-%m-%Y') as spnd_dt,
    DATE_FORMAT(date(cf.rsme_ts),'%d-%m-%Y') as rsme_dt,
   (case when o.oprnl_ste_chnge_ts is null then o.i_ts else o.oprnl_ste_chnge_ts end) as lst_chnge_tm,
    cs.sts_nm,(case when o.oprtnl_ste_id is null then 'Unknown' else ao.ste_nm end) as ste_nm
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
    WHERE c.caf_type_id =2 ${where} and  (c.prnt_cstmr_id =  ${id.id} or c.cstmr_id = ${id.id})`
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getentcstmrnodecntMdl
* Description   :
* Arguments     : callback function
******************************************************************************/
exports.getentcstmrnodecntMdl = (id, user, callback) => {
    var fnm = "getentcstmrnodecntMdl"
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and lmo_agnt_id=${user.usr_ctgry_ky} `
    }

    // console.log(data,'---------------------------------------------------------')

    var QRY_TO_EXEC = ` select count(*) as count from cstmr_dtl_t WHERE
    prnt_cstmr_id =${id.id} and cstmr_id <> prnt_cstmr_id ${where}
      `;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getentcstmrnodecntMdl
* Description   :
* Arguments     : callback function
******************************************************************************/
exports.getentcstmrcntMdl = (id, user, callback) => {
    var fnm = "getentcstmrcntMdl"


    // console.log(data,'---------------------------------------------------------')

    var QRY_TO_EXEC = ` SELECT e.enty_sts_id,e.sts_nm,COUNT(caf_id) as ct
    from caf_dtl_t as c
     JOIN enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
     WHERE c.caf_type_id=2 and c.enty_sts_id in(6,7,8,88)
    GROUP BY e.enty_sts_id
    ORDER BY e.enty_sts_id;;    
      `;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getentnodecustMdl
* Description   :
* Arguments     : callback function
******************************************************************************/
exports.getentnodecustMdl = (id, user, callback) => {
    var fnm="getentnodecustMdl"


    // console.log(data,'---------------------------------------------------------')
    console.log(id.id)
    var QRY_TO_EXEC =
        `select * from
      (select c.* from agnt_lst_t as a
       join cstmr_dtl_t as c on a.ofce_dstrt_id=c.loc_dstrct_id
       where  a.agnt_id=${user.usr_ctgry_ky} and c.lvl_in =2 and prnt_cstmr_id = ${id}) as a
      union ALL
      (select * from cstmr_dtl_t where lvl_in =1 and prnt_cstmr_id = ${id});`
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getentnodeMdl
* Description   :
* Arguments     : callback function
******************************************************************************/
exports.getentnodeMdl = (id, user, callback) => {
    var fnm = "getentnodeMdl"


    // console.log(data,'---------------------------------------------------------')
    console.log(id.id)
    var QRY_TO_EXEC =
        `select * from
      (select c.* from agnt_lst_t as a
       join cstmr_dtl_t as c on a.ofce_dstrt_id=c.loc_dstrct_id
       where  a.agnt_id=${user.usr_ctgry_ky} and prnt_cstmr_id = ${id}) as a
      union ALL
      (select * from cstmr_dtl_t where lvl_in =2 and prnt_cstmr_id = ${id});`
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getagntcstmrdtlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
******************************************************************************/
exports.getagntcstmrdtlsMdl = (user, callback) => {
    var fnm = "getagntcstmrdtlsMdl"
    // console.log(data,'---------------------------------------------------------')

    var QRY_TO_EXEC =

        `select * from
(select SUM(CASE WHEN cf.caf_id is NOT NULL THEN 1 ELSE 0 END) as ttl_cafs, c.cstmr_id,c.caf_type_id,frst_nm,mdlr_nm, lst_nm, cstmr_nm,pymnt_lblty_in,loc_addr1_tx,loc_addr2_tx,loc_lcly_tx,loc_ara_tx,loc_lctn_tx,
frqncy_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,loc_eml1_tx,cntct_nm,cntct_mble1_nu,e.entrpe_type_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,sts_nm
from cstmr_dtl_t c
left JOIN blng_frqncy_lst_t b on b.frqncy_id =c.frqncy_id
left join vlge_lst_t as v on v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id and v.vlge_nu = c.loc_vlge_id
left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id
and m.mndl_nu = c.loc_mndl_id
left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id left join entrpe_cstmr_typ_lst_t e on c.entrpe_type_id =e.entrpe_type_id
left join caf_dtl_t cf on cf.cstmr_id = c.cstmr_id
left JOIN enty_sts_lst_t es ON c.enty_sts_id = es.enty_sts_id
WHERE c.caf_type_id =2 and prnt_cstmr_id = c.cstmr_id and
c.agnt_id= ${user}
GROUP BY c.cstmr_id ORDER BY cstmr_nm) as a
union ALL
(select 0,c.cstmr_id,c.caf_type_id,frst_nm,mdlr_nm, lst_nm, cstmr_nm,pymnt_lblty_in,loc_addr1_tx,loc_addr2_tx,loc_lcly_tx,loc_ara_tx,loc_lctn_tx,
NULL,v.vlge_nm,m.mndl_nm,d.dstrt_nm,loc_eml1_tx,cntct_nm,cntct_mble1_nu,NULL,NULL,'ONLINE' from agnt_lst_t as a
join cstmr_dtl_t as c on a.ofce_dstrt_id=c.loc_dstrct_id
left join vlge_lst_t as v on v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id and v.vlge_nu = c.loc_vlge_id
left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
where a.agnt_id=${user} and c.lvl_in =2)`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : insrtentCstmrnodeMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtentCstmrnodeMdl = (data, cstmr_id, user, callback) => {
    var fnm= "insrtentCstmrnodeMdl"
    console.log(data)

    let prnt_cstmr_id = data.prnt_cstmr_id


    var QRY_TO_EXEC = `INSERT INTO cstmr_dtl_t (cstmr_id ,custu_id,cstmr_nm, caf_type_id,bsns_type_id, prnt_cstmr_id, enttypelov,tan_nu,  frst_nm,
            loc_addr1_tx,loc_lcly_tx, loc_ara_tx,loc_mndl_id, loc_dstrct_id, loc_vlge_id,loc_eml1_tx,  blng_addr1_tx, blng_lcly_tx,blng_ara_tx,
           blng_mndl_id, blng_dstrct_id, blng_ste_id, blng_vlge_id,blng_pn_cd, cntct_mble1_nu,enty_sts_id, agnt_id,crte_usr_id,
           a_in, lmo_agnt_cd, mso_agnt_cd,gndr_id,cntct_nm,lvl_in) 
            VALUES (${cstmr_id} ,${cstmr_id},'${data.orgName}', ${data.caf_type_id},1, ${prnt_cstmr_id}, 'Enterprise','${data.pan_nu}', '${data.orgName}', 
              
               '${data.instl_house_flat_no + data.instl_buildingname}', '${data.instl_streetname}','${data.loc_lcly_tx}',
               '${data.instl_mndle_id}', '${data.instl_dstrt_id}', ${data.instl_cty_id},
                      '${data.cstmr_emle_tx}', '${data.blng_house_flat_no + data.blng_buildingname}', '${data.blng_streetname}', 
                '${data.blng_lclty_tx}',${data.blng_mndle_id}, ${data.blng_dstrt_id}, ${data.blng_ste_id},'${data.blng_cty_id}','${data.blng_pn_cd}',
          '${data.mbl_nu}','${data.enty_sts_id}', '${data.agnt_id}',
           '${user.mrcht_usr_id}', 1, '${user.lmo_cd}', '${user.mso_cd}',${data.gender},'${data.cntprsnName}',2);`;

    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : getEntCstmrsOprtnCrntMnthMdl
* Description   :
* Arguments     : callback function
******************************************************************************/
exports.getEntCstmrsOprtnCrntMnthMdl = (cstmr_id, user, callback) => {
    var fnm = "getEntCstmrsOprtnCrntMnthMdl"
    var where = "and 1 = 1 "
    if (user.prt_in != 2) {
        where += `and cf.lmo_agnt_id=${user.usr_ctgry_ky} `
    }
    var QRY_TO_EXEC = `SELECT a.*,b.*
    FROM
    (SELECT COUNT(DISTINCT caf_id) AS crnt_mnth_prvd,
    SUM(CASE WHEN cf.spnd_in=1 THEN 1 ELSE 0 END) AS crnt_mnth_spnd_cafs, 
    SUM(CASE WHEN cf.trmnd_in=1 THEN 1 ELSE 0 END) AS crnt_mnth_trmnd_cafs, MONTHNAME(cf.actvn_dt) AS crnt_mnth, YEAR(cf.actvn_dt) AS crnt_yr
    FROM cstmr_dtl_t c
    JOIN caf_dtl_t cf on cf.cstmr_id = c.cstmr_id
    WHERE c.caf_type_id =2 and c.prnt_cstmr_id =  ${cstmr_id} ${where}
    AND MONTH(cf.actvn_dt)=MONTH(CURDATE()) AND YEAR(cf.actvn_dt)=YEAR(CURDATE())) AS a
    
    JOIN
    
    (SELECT COUNT(DISTINCT caf_id) AS mnth_prvd,
    MONTHNAME(cf.actvn_dt) AS mnth, YEAR(cf.actvn_dt) AS yr
    FROM cstmr_dtl_t c
    JOIN caf_dtl_t cf on cf.cstmr_id = c.cstmr_id
    WHERE c.caf_type_id =2 and c.prnt_cstmr_id =  ${cstmr_id}  ${where}
    GROUP BY MONTH(cf.actvn_dt) LIMIT 6) AS b`;

    console.log(QRY_TO_EXEC);

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getIllCafDtlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
******************************************************************************/
exports.getIllCafDtlsMdl = (user, callback) => {
    var fnm = "getIllCafDtlsMdl"
    console.log(user)
    var QRY_TO_EXEC = `select count(DISTINCT c.cstmr_id) as ttl_cafs,COUNT(DISTINCT ad.ill_pckge_id) as ttl_pckges,cs.cstmr_id,cs.cstmr_nm,cs.cntct_nm,cs.cntct_mble1_nu,cs.loc_eml1_tx,
cs.frqncy_id,b.frqncy_nm,DATE_FORMAT(( cs.actvn_dt),'%d-%m-%Y') as actvn_dt,cf.entrpe_type_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm from cstmr_dtl_t as cs
JOIN ill_cstmr_pckge_adtnl_dtls_t ad on ad.cstmr_id =cs.cstmr_id
left join caf_dtl_t c on ad.cstmr_id = c.cstmr_id
join blng_frqncy_lst_t as b on b.frqncy_id = cs.frqncy_id
join entrpe_cstmr_typ_lst_t as cf on cf.entrpe_type_id = cs.entrpe_type_id
left join vlge_lst_t as v on   v.dstrt_id = cs.loc_dstrct_id and v.mndl_id = cs.loc_mndl_id  and  v.vlge_nu = cs.loc_vlge_id
left JOIN mndl_lst_t as m on m.dstrt_id = cs.loc_dstrct_id and m.mndl_nu = cs.loc_mndl_id
left JOIN dstrt_lst_t as d on d.dstrt_id = cs.loc_dstrct_id
where ad.lmo_agnt_id = ${user.usr_ctgry_ky}
group by cs.cstmr_id
order by ad.i_ts desc;`;

    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPrfTypsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getPrfTypsMdl = (data, user, callback) => {
    var fnm="getPrfTypsMdl"
    var QRY_TO_EXEC = `select * from ill_prf_typ_lst_t where a_in=1`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCstmrillAdtnlMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCstmrillAdtnlMdl = (data, cstmr_id, user, callback) => {
    var fnm ="insrtCstmrillAdtnlMdl"

    var QRY_TO_EXEC = `INSERT INTO ill_cstmr_pckge_adtnl_dtls_t (cstmr_id,num_cnts,cntrct_prd_num,cntrct_prd_typ,prt_spd,ill_pckge_nm,chrge_at,gst_at,lmo_agnt_id,sm_as_blng_addrs_in,lcl_pn_cd,cntct_prsn_nm,cntct_prsn_phne_num,cntct_prsn_eml,cre_srvc_id,ill_enty_sts_id,one_tme_chrge_at,pckge_pln_id,crte_usr_id,i_ts,a_in) 
        VALUES (${cstmr_id},${data[0].num_cnts},${data[0].cntrct_prd},${data[0].cntrct_prd_txt},'${data[0].prt_spd}','${data[0].pckgenm}',${data[0].price},${data[0].gst_at},${data[0].agnt_id},${data[0].sm_as_blng_addrs_in},'${data[0].lcl_pn_cd}','${data[0].cnct_prsn_nm}','${data[0].cnct_prsn_mbl_num}','${data[0].cnct_prsn_mbl_eml}',${data[0].cre_srvc},1,${data[0].onetmechrge},${data[0].pckge_pln},${user.mrcht_usr_id},current_timestamp(),1);`;

    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : illCstmrAttchmntMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.illCstmrAttchmntMdl = (data, cstmr_id, user, callback) => {
    var fnm = "illCstmrAttchmntMdl"
    var count = 0;
    for (let i = 0; i < data.length; i++) {
        var QRY_TO_EXEC = `INSERT INTO ill_cstmr_attchmnt_dtls (cstmr_id,attchmnt_nm,attchmnt_url,prf_typ_id,prf_atchmnt_idnty,prf_atchmnt_bllng_addrs,crte_usr_id,a_in,i_ts) 
        VALUES (${cstmr_id},'${data[i].prf_idnty_thrs}','${data[i].prf_idnty_url}',${data[i].prf_typ_id},${data[i].prf_atchmnt_idnty},${data[i].prf_atchmnt_bllng_addrs},${user.mrcht_usr_id},1,current_timestamp());`;
        console.log(QRY_TO_EXEC)

        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
            if (++count == data.length) {
                callback(err, results)
            }

        });
    }
}

/*****************************************************************************
* Function      : getIllApprovalPckgesMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getIllApprovalPckgesMdl = (data, user, callback) => {
    var fnm = "getIllApprovalPckgesMdl"
    var QRY_TO_EXEC = `select cd.ip_addrs_schme,cd.ill_pckge_id,cd.prt_spd,cd.ill_pckge_nm,cd.chrge_at,cd.gst_at,cd.apsfl_shre_at,cd.lmo_shre_at,cd.mso_shre_at,cd.num_cnts,cd.cntrct_prd_num,cd.ill_enty_sts_id,e.ill_sts_nm,
    cd.cntrct_prd_typ,cd.lmo_agnt_id,cd.lvl_1_apprv_in,cd.lvl_1_apprv_usr_id,cd.lvl_1_apprv_ts,cd.lvl_1_apprv_rle_id,cd.cstmr_id,c.cstmr_nm,c.cntct_nm,c.cntct_mble1_nu,c.loc_eml1_tx,c.frqncy_id,b.frqncy_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,(cd.chrge_at+cd.gst_at) as ttl_amnt,
        cf.entrpe_type_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,cd.ill_pckge_agrmnt_url
            from ill_cstmr_pckge_adtnl_dtls_t as cd
            join cstmr_dtl_t as c on c.cstmr_id = cd.cstmr_id
            join blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
            join entrpe_cstmr_typ_lst_t as cf on cf.entrpe_type_id = c.entrpe_type_id
    join ill_enty_sts_lst_t as e on e.ill_enty_sts_id = cd.ill_enty_sts_id
            left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
            left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
            left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
            where cd.ill_enty_sts_id in (2) and cd.a_in = 1
              GROUP BY cd.ill_pckge_id order by cd.i_ts desc`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : ApprovalPckgeslevlOneMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.ApprovalPckgeslevlOneMdl = (data, user, callback) => {
    var fnm ="ApprovalPckgeslevlOneMdl"
    console.log(data)
    var QRY_TO_EXEC = `update ill_cstmr_pckge_adtnl_dtls_t set lvl_1_apprv_in=1,ill_enty_sts_id=3,lvl_1_apprv_desc_txt='${data.lvl_1_apprv_desc_txt}', lvl_1_apprv_usr_id=${user.mrcht_usr_id},lvl_1_apprv_ts=current_timestamp() where cstmr_id = ${data.cstmr_id} and ill_pckge_id = ${data.ill_pckge_id}`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : ApprovalPckgeslevlTwoMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.ApprovalPckgeslevlTwoMdl = (data, user, callback) => {
    var fnm="ApprovalPckgeslevlTwoMdl"
    var QRY_TO_EXEC = `update ill_cstmr_pckge_adtnl_dtls_t set lvl_2_apprv_in=1, lvl_2_apprv_usr_id=${user.mrcht_usr_id},ill_enty_sts_id=5,lvl_2_apprv_desc_txt='${data.lvl_2_apprv_desc_txt}',aprvl_in =1, lvl_2_apprv_ts=current_timestamp() where cstmr_id = ${data.cstmr_id} and ill_pckge_id = ${data.ill_pckge_id}`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : illRjctPckgesMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.illRjctPckgesMdl = (data, user, callback) => {
    var fnm = "illRjctPckgesMdl"
    var QRY_TO_EXEC = `update ill_cstmr_pckge_adtnl_dtls_t set rjct_in=1, ill_enty_sts_id=4,aprvl_in=0,rjct_usr_id=${user.mrcht_usr_id},rjct_desc_txt='${data.rjct_desc_txt}',rjct_ts=current_timestamp(),rjct_lvl = ${data.rjct_lvl} where cstmr_id = ${data.cstmr_id} and ill_pckge_id = ${data.ill_pckge_id}`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getIilCstmrDtlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getIilCstmrDtlsMdl = (id,pckgeid, user, callback) => {
    var fnm = "getIilCstmrDtlsMdl"
    var QRY_TO_EXEC = `select cd.ip_addrs_schme,cd.ill_pckge_id,cd.prt_spd,cd.ill_pckge_nm,cd.chrge_at,cd.gst_at,cd.apsfl_shre_at,cd.lmo_shre_at,cd.mso_shre_at,cd.num_cnts,cd.cntrct_prd_num,cd.cntrct_prd_typ,cd.blng_prdcty,cd.lmo_agnt_id,cd.lvl_1_apprv_in,cd.lvl_1_apprv_usr_id,cd.cntct_prsn_nm,cd.cntct_prsn_phne_num,cd.cntct_prsn_eml,(case when cd.cre_srvc_id=1 then 'ILL' else 'VPN' end) as cre_srvc_nm,
    (case when cd.pckge_pln_id =1 then 'Prepaid' else 'Postpaid' end) as pckge_pln_nm,cd.one_tme_chrge_at,cd.one_tme_apsfl_chrge_at,cd.one_tme_lmo_chrge_at,
    DATE_FORMAT(cd.lvl_1_apprv_ts,"%d-%m-%Y %H:%i:%s") as lvl_1_apprv_ts,c.pan_nu,c.gst_nu,cd.lvl_1_apprv_desc_txt,cd.lvl_1_apprv_rle_id,cd.cstmr_id,c.cstmr_nm,c.cntct_nm,c.cntct_mble1_nu,c.loc_eml1_tx,c.frqncy_id,b.frqncy_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,
        cf.entrpe_type_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,c.loc_addr1_tx,c.gst_nu,p.prf_typ_nm,ct.prf_atchmnt_idnty,ct.prf_atchmnt_bllng_addrs,ct.attchmnt_nm,ct.attchmnt_url,
        c.loc_lcly_tx,cd.lcl_pn_cd,cd.sm_as_blng_addrs_in,c.loc_ara_tx,c.blng_addr1_tx,c.blng_lcly_tx,c.blng_ara_tx,c.blng_pn_cd,a.agnt_cd,a.agnt_nm,a.ofce_mbl_nu,v1.vlge_nm as blng_vlge_nm,m1.mndl_nm as blng_mndl_nm,d1.dstrt_nm as blng_dstrt_nm
            from ill_cstmr_pckge_adtnl_dtls_t as cd
            join cstmr_dtl_t as c on c.cstmr_id = cd.cstmr_id
            join blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
            join entrpe_cstmr_typ_lst_t as cf on cf.entrpe_type_id = c.entrpe_type_id
            left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
            left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
            left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id

            left join vlge_lst_t as v1 on   v1.dstrt_id = c.blng_dstrct_id and v1.mndl_id = c.blng_mndl_id  and  v1.vlge_nu = c.blng_vlge_id
            left JOIN mndl_lst_t as m1 on m1.dstrt_id = c.blng_dstrct_id and m1.mndl_nu = c.blng_mndl_id
            left JOIN dstrt_lst_t as d1 on d1.dstrt_id = c.blng_dstrct_id
            join ill_cstmr_attchmnt_dtls as ct on ct.cstmr_id = cd.cstmr_id
            join ill_prf_typ_lst_t as p on p.prf_typ_id = ct.prf_typ_id
            join agnt_lst_t as a on a.agnt_id = cd.lmo_agnt_id
            where cd.cstmr_id = ${id} and cd.ill_pckge_id=${pckgeid}`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : illinsrtCstmrMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.illinsrtCstmrMdl = (data, cstmr_id, user, callback) => {
    var fnm = "illinsrtCstmrMdl"
    let prnt_cstmr_id = cstmr_id;
    if (data.hasOwnProperty('prnt_cstmr_id'))
        prnt_cstmr_id = data.prnt_cstmr_id


    var QRY_TO_EXEC = `INSERT INTO cstmr_dtl_t (cstmr_id ,custu_id,cstmr_nm, caf_type_id,bsns_type_id, prnt_cstmr_id, enttypelov,pan_nu,  frst_nm,
        loc_addr1_tx,loc_lcly_tx, loc_ara_tx,loc_mndl_id, loc_dstrct_id, loc_vlge_id,loc_eml1_tx,  blng_addr1_tx, blng_lcly_tx,blng_ara_tx,
       blng_mndl_id, blng_dstrct_id, blng_ste_id, blng_vlge_id,blng_pn_cd, cntct_mble1_nu,actvn_dt,frqncy_id,enty_sts_id, agnt_id,crte_usr_id,
       a_in, lmo_agnt_cd, mso_agnt_cd,gndr_id,gst_nu,entrpe_type_id,cntct_nm,lvl_in) 
        VALUES (${cstmr_id} ,${cstmr_id},'${data.orgName}', ${data.caf_type_id},1, ${prnt_cstmr_id}, 'Enterprise','${data.pan_nu}', '${data.orgName}', 
          
           '${data.instl_house_flat_no + data.instl_buildingname}', '${data.instl_streetname}','${data.loc_lcly_tx}',
           '${data.instl_mndle_id}', '${data.instl_dstrt_id}', '${data.instl_cty_id}',
                  '${data.cstmr_emle_tx}', '${data.blng_house_flat_no + data.blng_buildingname}', '${data.blng_streetname}', 
            '${data.blng_lclty_tx}','${data.blng_mndle_id}', '${data.blng_dstrt_id}', ${data.blng_ste_id},'${data.blng_cty_id}','${data.blng_pn_cd}',
      '${data.mbl_nu}','${data.actvtn_dt}','${data.blng_frqny_id}','${data.enty_sts_id}', '${data.agnt_id}',
       '${user.mrcht_usr_id}', 1, '${user.lmo_cd}', '${user.mso_cd}','${data.gender}','${data.gst_no}','${data.org_typ}','${data.cntprsnName}',2);`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getIllApprovalPckgeslvl2Mdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getIllApprovalPckgeslvl2Mdl = (data, user, callback) => {
    var fnm="getIllApprovalPckgeslvl2Mdl"
    var QRY_TO_EXEC = `select cd.ip_addrs_schme,cd.ill_pckge_id,cd.prt_spd,cd.ill_pckge_nm,cd.chrge_at,cd.gst_at,cd.apsfl_shre_at,cd.lmo_shre_at,cd.mso_shre_at,cd.num_cnts,cd.cntrct_prd_num,cd.cntrct_prd_typ,cd.blng_prdcty,cd.lmo_agnt_id,cd.lvl_1_apprv_in,cd.lvl_1_apprv_usr_id,cd.lvl_1_apprv_ts,cd.lvl_1_apprv_rle_id,cd.cstmr_id,c.cstmr_nm,c.cntct_nm,c.cntct_mble1_nu,c.loc_eml1_tx,c.frqncy_id,b.frqncy_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,(cd.chrge_at+cd.gst_at) as ttl_amnt,
    cf.entrpe_type_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,e.ill_sts_nm,cd.ill_pckge_agrmnt_url
        from ill_cstmr_pckge_adtnl_dtls_t as cd
        join cstmr_dtl_t as c on c.cstmr_id = cd.cstmr_id
        join blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
        join entrpe_cstmr_typ_lst_t as cf on cf.entrpe_type_id = c.entrpe_type_id
        join ill_enty_sts_lst_t as e on e.ill_enty_sts_id = cd.ill_enty_sts_id
        left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
        left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
        left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
        where lvl_1_apprv_in = 1 and cd.ill_enty_sts_id=3 and cd.a_in = 1
          GROUP BY cd.ill_pckge_id order by cd.i_ts desc`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getMyApprovalPckgesMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getMyApprovalPckgesMdl = (lvl,user, callback) => {
    var fnm = "getMyApprovalPckgesMdl"
    if(lvl==1){
        where = `lvl_1_apprv_in = 1 and cd.a_in = 1 and cd.crte_usr_id = ${user.mrcht_usr_id}`
    }
    else{
        where = `lvl_1_apprv_in = 1 and cd.a_in = 1 and cd.crte_usr_id = ${user.mrcht_usr_id}`  
    }
    var QRY_TO_EXEC = `select cd.ip_addrs_schme,cd.ill_pckge_id,cd.prt_spd,cd.ill_pckge_nm,cd.chrge_at,cd.gst_at,cd.apsfl_shre_at,cd.lmo_shre_at,cd.mso_shre_at,cd.num_cnts,cd.cntrct_prd_num,cd.cntrct_prd_typ,cd.blng_prdcty,cd.lmo_agnt_id,cd.lvl_1_apprv_in,cd.lvl_1_apprv_usr_id,DATE_FORMAT(cd.lvl_1_apprv_ts,"%d-%m-%Y %H:%i:%s") as lvl_1_apprv_ts,cd.lvl_1_apprv_desc_txt,DATE_FORMAT(cd.lvl_2_apprv_ts,"%d-%m-%Y %H:%i:%s") as lvl_2_apprv_ts,cd.lvl_2_apprv_desc_txt,cd.lvl_1_apprv_rle_id,cd.cstmr_id,c.cstmr_nm,c.cntct_nm,c.cntct_mble1_nu,c.loc_eml1_tx,c.frqncy_id,b.frqncy_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,(cd.chrge_at+cd.gst_at) as ttl_amnt,
    cf.entrpe_type_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm
        from ill_cstmr_pckge_adtnl_dtls_t as cd
        join cstmr_dtl_t as c on c.cstmr_id = cd.cstmr_id
        join blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
        join entrpe_cstmr_typ_lst_t as cf on cf.entrpe_type_id = c.entrpe_type_id
        left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
        left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
        left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
        where ${where}
          GROUP BY cd.ill_pckge_id order by cd.i_ts desc`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getRcntApprovalPckgesMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getRcntApprovalPckgesMdl = (lvl,user, callback) => {
    var fnm ="getRcntApprovalPckgesMdl"
    if(lvl==1){
        where = `lvl_2_apprv_in = 1 and cd.a_in = 1`
    }
    else{
        where = `lvl_2_apprv_in = 1 and cd.a_in = 1`  
    }

    var QRY_TO_EXEC = `select cd.ip_addrs_schme,cd.ill_pckge_id,cd.prt_spd,cd.ill_pckge_nm,cd.chrge_at,cd.gst_at,cd.apsfl_shre_at,cd.lmo_shre_at,cd.mso_shre_at,cd.num_cnts,cd.cntrct_prd_num,cd.cntrct_prd_typ,cd.blng_prdcty,cd.lmo_agnt_id,cd.lvl_1_apprv_in,cd.lvl_1_apprv_usr_id,DATE_FORMAT(cd.lvl_1_apprv_ts,"%d-%m-%Y %H:%i:%s") as lvl_1_apprv_ts,cd.lvl_1_apprv_desc_txt,DATE_FORMAT(cd.lvl_2_apprv_ts,"%d-%m-%Y %H:%i:%s") as lvl_2_apprv_ts,cd.lvl_2_apprv_desc_txt,cd.lvl_1_apprv_rle_id,cd.cstmr_id,c.cstmr_nm,c.cntct_nm,c.cntct_mble1_nu,c.loc_eml1_tx,c.frqncy_id,b.frqncy_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,(cd.chrge_at+cd.gst_at) as ttl_amnt,
    cf.entrpe_type_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm
        from ill_cstmr_pckge_adtnl_dtls_t as cd
        join cstmr_dtl_t as c on c.cstmr_id = cd.cstmr_id
        join blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
        join entrpe_cstmr_typ_lst_t as cf on cf.entrpe_type_id = c.entrpe_type_id
        left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
        left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
        left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id
        where ${where}
          GROUP BY cd.ill_pckge_id order by cd.i_ts desc`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getcreSrvcsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getcreSrvcsMdl = (data, user, callback) => {
    var fnm="getcreSrvcsMdl"
    var QRY_TO_EXEC = `select * from cre_srvce_lst_t where a_in=1`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getuploadAgreemntMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getuploadAgreemntMdl = (data, user, callback) => {
    var fnm = "getuploadAgreemntMdl"
    var QRY_TO_EXEC = `update ill_cstmr_pckge_adtnl_dtls_t set ill_pckge_agrmnt_url = '${data[0].prf_idnty_url}',ill_enty_sts_id=2, updte_usr_id = ${user.mrcht_usr_id},u_ts=current_timestamp() where cstmr_id = ${data[0].cstmr_id} and ill_pckge_id = ${data[0].ill_pckge_id}`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getIilCstmrDtlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getCstmrDtlsMdl = (id, user, callback) => {
    var fnm = "getCstmrDtlsMdl"
    var QRY_TO_EXEC = `select cd.ip_addrs_schme,cd.ill_pckge_id,cd.prt_spd,cd.ill_pckge_nm,cd.chrge_at,cd.gst_at,cd.apsfl_shre_at,cd.lmo_shre_at,cd.mso_shre_at,cd.num_cnts,cd.cntrct_prd_num,cd.cntrct_prd_typ,cd.blng_prdcty,cd.lmo_agnt_id,cd.lvl_1_apprv_in,cd.lvl_1_apprv_usr_id,cd.cntct_prsn_nm,cd.cntct_prsn_phne_num,cd.cntct_prsn_eml,cd.cre_srvc_id,
    DATE_FORMAT(cd.lvl_1_apprv_ts,"%d-%m-%Y %H:%i:%s") as lvl_1_apprv_ts,c.pan_nu,c.gst_nu,cd.lvl_1_apprv_desc_txt,cd.lvl_1_apprv_rle_id,cd.cstmr_id,c.cstmr_nm,c.cntct_nm,c.cntct_mble1_nu,c.loc_eml1_tx,c.frqncy_id,b.frqncy_nm,DATE_FORMAT(( c.actvn_dt),'%d-%m-%Y') as actvn_dt,
        cf.entrpe_type_nm,v.vlge_nm,m.mndl_nm,d.dstrt_nm,c.loc_addr1_tx,c.gst_nu,p.prf_typ_nm,ct.prf_atchmnt_idnty,ct.prf_atchmnt_bllng_addrs,ct.attchmnt_nm,ct.attchmnt_url,
        c.loc_lcly_tx,cd.lcl_pn_cd,cd.sm_as_blng_addrs_in,c.loc_ara_tx,c.blng_addr1_tx,c.blng_lcly_tx,c.blng_ara_tx,c.blng_pn_cd,a.agnt_cd,a.agnt_nm,a.ofce_mbl_nu,v1.vlge_nm as blng_vlge_nm,m1.mndl_nm as blng_mndl_nm,d1.dstrt_nm as blng_dstrt_nm
            from ill_cstmr_pckge_adtnl_dtls_t as cd
            join cstmr_dtl_t as c on c.cstmr_id = cd.cstmr_id
            join blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
            join entrpe_cstmr_typ_lst_t as cf on cf.entrpe_type_id = c.entrpe_type_id
            left join vlge_lst_t as v on   v.dstrt_id = c.loc_dstrct_id and v.mndl_id = c.loc_mndl_id  and  v.vlge_nu = c.loc_vlge_id
            left JOIN mndl_lst_t as m on m.dstrt_id = c.loc_dstrct_id and m.mndl_nu = c.loc_mndl_id
            left JOIN dstrt_lst_t as d on d.dstrt_id = c.loc_dstrct_id

            left join vlge_lst_t as v1 on   v1.dstrt_id = c.blng_dstrct_id and v1.mndl_id = c.blng_mndl_id  and  v1.vlge_nu = c.blng_vlge_id
            left JOIN mndl_lst_t as m1 on m1.dstrt_id = c.blng_dstrct_id and m1.mndl_nu = c.blng_mndl_id
            left JOIN dstrt_lst_t as d1 on d1.dstrt_id = c.blng_dstrct_id
            join ill_cstmr_attchmnt_dtls as ct on ct.cstmr_id = cd.cstmr_id
            join ill_prf_typ_lst_t as p on p.prf_typ_id = ct.prf_typ_id
            join agnt_lst_t as a on a.agnt_id = cd.lmo_agnt_id
            where cd.cstmr_id = ${id}
            group by cd.cstmr_id`;
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}