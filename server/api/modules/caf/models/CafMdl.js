var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : insrtCafStgMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCafStgMdl = (data, user, callback) => {
    var fnm = "insrtCafStgMdl"
    //Add Stage table Insert here
    return new Promise((resolve, reject) => {
        resolve(true)
    })
}

/*****************************************************************************
* Function      : getentcafdetailsMdl
* Description   : Add Password to Tel Number
* Arguments     : callback function
*
******************************************************************************/
exports.getentcafdetailsMdl = (id, user) => {
    var fnm = "getentcafdetailsMdl"

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY c.caf_id) sno,
    c.caf_id,c.onu_srl_nu,c.mbl_nu,e.sts_nm,cs.cstmr_nm,d.dstrt_nm,
    ct.caf_type_nm,'suspend' as 'suspend' FROM caf_dtl_t as c
    join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id
    join enty_sts_lst_t as e on e.enty_sts_id=c.enty_sts_id
    join dstrt_lst_t as d on d.dstrt_id=c.instl_dstrct_id
    join caf_type_lst_t as ct on ct.caf_type_id=c.caf_type_id
    where c.caf_type_id=2 and c.caf_id=${id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);

}

/*****************************************************************************
* Function      : get_dtlsusrsmeMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 23/12/2021    -  Ramesh  - Initial Function
*
******************************************************************************/
exports.get_dtlsusrsmeMdl = (data, user, callback) => {
    var fnm= "get_dtlsusrsmeMdl"

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER ( ORDER BY cs.caf_id) sno,DATE_FORMAT(cs.spnd_dt ,'%d-%m-%Y') as spnd_dt,DATE_FORMAT(cs.rsme_dt ,'%d-%m-%Y') as rsme_dt,DATE_FORMAT(c.trmnd_dt ,'%d-%m-%Y') as trmnd_dt from caf_spnd_dtl_t as cs 
    left join caf_dtl_t as c on c.caf_id=cs.caf_id where cs.caf_id=${data.CAf}`;

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
* Function      : updtBulkCafSts
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.updtBulkCafSts = (data, user) => {
    var fnm = "updtBulkCafSts"
    console.log(data.blck_upld_Dtls.blk_id)
    var QRY_TO_EXEC = `update caf_blk_dtl_t set prv_sts =0 where blk_id =${data.blck_upld_Dtls.blk_id};`
    console.log(QRY_TO_EXEC)
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCafMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCustmrMdl = (data, user, cstmr_id, callback) => {
    var fnm = "insrtCustmrMdl"
    try {
        var QRY_TO_EXEC = `INSERT INTO cstmr_dtl_t (cstmr_id ,custu_id,cstmr_nm, caf_type_id,bsns_type_id, prnt_cstmr_id, enttypelov,pan_nu,adhr_nu, tle_nm, frst_nm, mdlr_nm, lst_nm, rltve_nm, gndr_id, loc_addr1_tx, 
            loc_addr2_tx, loc_lcly_tx, loc_ara_tx, loc_mndl_id, loc_dstrct_id, loc_vlge_id,loc_std_cd, loc_lmdle1_nu, loc_eml1_tx, cntct_nm, blng_addr1_tx, blng_addr2_tx,blng_lcly_tx,
            blng_ara_tx, blng_mndl_id, blng_dstrct_id, blng_ste_id, blng_vlge_id, blng_pn_cd, cntct_mble1_nu, blng_eml1_tx,blng_cntct_nm,blng_cntct_mble1_nu,actvn_dt,
            frqncy_id, enty_sts_id, agnt_id,crte_usr_id,
            a_in, lmo_agnt_cd, mso_agnt_cd,blng_std_cd,blng_lmdle1_nu,dob_dt) 
            VALUES (${cstmr_id} ,${cstmr_id},'${data.frst_nm}', ${data.caf_type_id},1, ${cstmr_id}, 'INDIVIDUAL','${data.pan_nu}','${data.adhr_nu}', '${data.tle_nm}', '${data.frst_nm}', 
            '${data.mdlr_nm}', '${data.lst_nm}', 
            '${data.rltve_nm}', ${data.gndr_id}, '${data.instl_buildingname + data.instl_streetname}', '${data.loc_lcly_tx}', '${data.loc_lcly_tx}','${data.loc_lcly_tx}',
             '${data.loc_mndl_id}', '${data.loc_dstrct_id}', ${data.loc_vlge_id},'${data.loc_std_cd}',
              '${data.loc_lnd_nu}', '${data.loc_eml1_tx}', '${data.blng_cntct_nm}', '${data.blng_house_flat_no + data.blng_buildingname}', '${data.blng_streetname}', 
              '${data.blng_lcly_tx}','${data.blng_lcly_tx}',
             ${data.blng_mndl_id}, ${data.blng_dstrct_id}, ${data.blng_ste_id},'${data.blng_vlge_id}', '${data.blng_pn_cd}','${data.mbl_nu}','${data.blng_eml1_tx}',
            '${data.blng_cntct_nm}','${data.mbl_nu}',CURRENT_DATE(),'${data.frqncy_id}',   
               '${data.enty_sts_id}', '${data.agnt_id}', '${user.mrcht_usr_id}', 1, '${user.lmo_cd}', '${user.mso_cd}','${data.blng_std_cd}','${data.blng_lnd_nu}','${data.dob_dt}');`
        console.log(QRY_TO_EXEC)
        if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
                callback(err, results);
                return;
            });
        else
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    } catch (err) {
        console.log(err)
    }


}
/*****************************************************************************
* Function      : insrtCafMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCafMdl = (data, caf_id, ctmr_id, user, callback) => {
    var fnm = "insrtCafMdl"

    try {
        var QRY_TO_EXEC = `INSERT INTO caf_dtl_t (caf_id, caf_nu, mbl_nu, adhr_nu, lat, lng, actvn_dt, 
              caf_type_id, caf_mac_addr_tx, olt_id, olt_srl_nu, olt_ip_addr_tx, lg_id, crnt_pln_id, splt_id, 
              olt_prt_splt_tx, prnt_caf_id, blble_caf_in,  actvn_ts, instd_ts,cstmr_id, instl_addr1_tx, instl_addr2_tx, instl_lcly_tx, instl_ara_tx, instl_ste_id,
             instl_dstrct_id,instl_mndl_id, instl_vlge_id, instl_std_cd, instl_eml1_tx, instl_lmdle1_nu, iptv_stpbx_id,iptv_mac_addr_tx,iptv_srl_nu,onu_stpbx_id,onu_mac_addr_tx,onu_srl_nu
             ,olt_prt_id, olt_crd_nu, cnctn_sts_id,onu_own_in,onu_emi_ct,onu_prc_at,onu_upfrnt_at,instl_chrg_at,iptv_own_in,iptv_emi_ct,iptv_prc_at,iptv_upfrnt_at,pop_id,
             cnctn_dt, crte_usr_id, a_in,i_ts,enty_sts_id,mso_agnt_id,lmo_agnt_id,frqncy_id,aaa_cd,aghra_cd,olt_onu_id,olt_prt_nm) VALUES (${caf_id}, ${caf_id},${data.mbl_nu},
             '${data.adhr_nu}','${data.lat}', '${data.lng}',CURRENT_DATE(), ${data.caf_type_id}, '${data.iptv_bx_srl_num}',
             ${data.olt_id}, '${data.olt_srl_nu}', '${data.olt_ip_addr_tx}', '${data.lg_id}', ${data.crnt_pckge_id}, ${data.splt_id}, '${data.olt_prt_splt_tx}', 
             ${caf_id}, '${data.blble_caf_in}',CURRENT_DATE(),CURRENT_DATE(),${ctmr_id}, '${data.blng_house_flat_no + data.instl_buildingname}',
             '${data.instl_streetname}', '${data.loc_lcly_tx}', '${data.loc_lcly_tx}', ${data.blng_ste_id},${data.loc_dstrct_id},${data.loc_mndl_id}, ${data.loc_vlge_id},
             '${data.loc_std_cd}', '${data.loc_eml1_tx}', '${data.loc_lnd_nu}','${data.iptv_stpbx_id}','${data.iptv_mac_addr_tx}','${data.iptv_bx_srl_num}','${data.onu_stpbx_id}', '${data.onu_mac_addr_tx}',
             '${data.onu_srl_nu}', '${data.olt_prt_id}', '${data.olt_crd_nu}', '${data.cnctn_sts_id}', '${data.onu_own}',${data.onu_emi},'${data.onu_amt}','${data.onu_up_frmt_amt}',
             '${data.inst_amt}','${data.iptv_bx_own}','${data.iptv_bx_emi}','${data.iptv_bx_amt}','${data.iptv_bx_up_amt}','${data.pop_id}',
             CURRENT_DATE(), ${user.mrcht_usr_id},1,CURRENT_TIMESTAMP(),'${data.enty_sts_id}','${user.mso_cd}','${user.usr_ctgry_ky}','${data.frqncy_id}','${data.aaa_cd}','${data.aghra_cd}',${data.onu_id},${data.olt_prt_nm});`

        console.log(QRY_TO_EXEC)
        if (callback && typeof callback == "function") {

        } else
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    } catch (err) {
        console.log(err)
    }
}

/*****************************************************************************
* Function      : insrtCafstgMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCafstgMdl = (data, ctmr_id, user, callback) => {

    var fnm = "insrtCafstgMdl"
    var QRY_TO_EXEC = `
        INSERT INTO caf_stg_dtl_t(caf_id, frst_nm, lst_nm, mdlr_nm, dob_dt, mbl_nu, adhr_nu, pan_nu, lat, lng, actvn_dt,
            enty_sts_id, caf_type_id, caf_mac_addr_tx, agnt_id, olt_id, olt_srl_nu, olt_ip_addr_tx, lg_id, crnt_pln_id, blng_cycle_id, splt_id,
           olt_prt_splts, prnt_caf_id, bilable_caf_in,  actvn_ts,instld_ts,apsf_unq_id,cstmr_id, instl_addr1_tx, instl_addr2_tx, instl_lcly_tx, instl_ara_tx, instl_ste_id,instl_ste_nm,
           instl_dstrct_id,instl_dstrct_nm,instl_mndl_id,instl_mndl_nm, instl_vlge_id,instl_vlge_nm, instl_std_cd, instl_eml1_tx,stpbx_id, olt_prt_id,cnctn_sts_id,olt_lc_nm,contct_nm,contct_mb_nu,contct_dsg,pymnt_lblty_in,prnt_cstmr_id,
           cnctn_dt, crte_usr_id, a_in) VALUES (${data.caf_id},'${data.frst_nm}', '${data.lst_nm}', '${data.mdlr_nm}', '${data.dob_dt}', '${data.mbl_nu}',
                     '${data.adhr_nu}', '${data.pan_nu}', '${data.lat}', '${data.lng}', CURRENT_DATE(), '${data.crnt_caf_sts_id}', ${data.caf_type_id}, '${data.caf_mac_addr_tx}', '${data.agnt_id}', 
                     ${data.olt_id}, ${data.olt_srl_nu}, '${data.olt_ip_addr_tx}', '${data.lg_id}', ${data.slctdpacg.pckge_id}, ${data.frqncy_id}, ${data.olt_prt_id}, '${data.olt_prt_splt_tx}', 
                     ${ctmr_id}, ${data.blble_caf_in},CURRENT_DATE(),CURRENT_DATE(),'${data.apsflcode}',${ctmr_id}, '${data.instl_buildingname + data.instl_streetname}',
                     '${data.loc_lcly_tx}', '${data.loc_lcly_tx}', '${data.loc_lcly_tx}', ${data.blng_ste_id},'${data.blng_ste_nm}',${data.loc_dstrct_id},'${data.loc_dstrct_nm}',${data.loc_mndl_id},'${data.loc_mndl_nm}' ,${data.loc_vlge_id},'${data.loc_vlge_nm}',
                     '${data.loc_std_cd}', '${data.loc_eml1_tx}', ${data.stpbx_id}, ${data.olt_prt_id}, ${data.cnctn_sts_id},'${data.OlT_Lctn}','${data.cnct_prsn_nm}',${data.mbl_nu},'${data.cnct_prsn_desg}',${data.Pay_Res_in},${data.pcstmr_id}, 
                     CURRENT_DATE(), ${user.mrcht_usr_id}, 1);`

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getCAFCreServicesStsMdl
* Description   : Retuns if any of the three core services are present for that user
* Change History :
* 30/03/2020    -  Sunil Mulagada  - Initial Function
*
******************************************************************************/
exports.getCAFCreServicesStsMdl = (caf_id, user, callback) => {
    var fnm = "getCAFCreServicesStsMdl"
    var QRY_TO_EXEC = `SELECT IF(aaa_cd IS NULL,0,1) as hist_in ,IF(mdlwe_sbscr_id IS NULL,0,1) as iptv_in  ,IF(p.caf_id IS NULL,0,1)  as voip_in
                        FROM caf_dtl_t c 
                        JOIN BSS_ONLINE_U.voip_caf_phne_nmbrs_rel_t p on c.caf_id =p.caf_id
                        WHERE c.caf_id=${caf_id}
                        GROUP BY c.caf_id`
    // console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getcafincrement
* Description   : Retuns if any of the three core services are present for that user
* Change History :
* 30/03/2020    -  Sunil Mulagada  - Initial Function
*
******************************************************************************/
exports.getcafincrement = (slctBlckData,caf_id,ctmrs_id,callback) => {
 
}

/*****************************************************************************
* Function      : insrtCafstgMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtblckMdl = (data,user, callback) => {
    var fnm = "insrtblckMdl"

    let dlmtr = ' , ';
    let counter = 0;

    let btch_qry = ' ';
    if (data) {
        data.filter((k) => {
         
            if (++counter == data.length) {
                dlmtr = ` ; `;
            }
            btch_qry += ` ( '${k.frst_nm}', ${k.agnt_id}, ${k.slctdpacg.pckge_id}, '${k.apsflcode}','${k.loc_dstrct_nm}','${k.loc_mndl_nm}','${k.loc_vlge_nm}','${k.OlT_Lctn}','${k.cnct_prsn_nm}',${k.mbl_nu},'${k.cnct_prsn_desg}',${k.Pay_Res_in},${k.pcstmr_id},1,
              '${k.loc_eml1_tx}','${k.lng}','${k.lat}',${user.usr_ctgry_ky}, 1,CURRENT_TIMESTAMP()) ${dlmtr} `
        })
    }
    var QRY_TO_EXEC = `insert into caf_blk_dtl_t(frst_nm,agnt_id,crnt_pln_id,apsf_unq_id,dstrct_nm,
        mndl_nm,vlge_nm,olt_lc_nm,contct_nm,contct_mb_nu,contct_dsg,pymnt_lblty_in,prnt_cstmr_id,blk_in,email,lagtd,latd,crte_usr_id,a_in,i_ts)
        VALUE ${btch_qry}`
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
* Function      : insrtCafstgMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.get_blkCafMdl = (data, user, callback) => {
    var fnm = "get_blkCafMdl"
    //   console.log(user)
    var QRY_TO_EXEC = `select cb.*,d.dstrt_id,m.mndl_nu as mndl_id,v.vlge_id,o.olt_id from caf_blk_dtl_t as cb 
    left JOIN dstrt_lst_t as d on d.dstrt_nm=cb.dstrct_nm
    LEFT join mndl_lst_t as m on m.mndl_nm=cb.mndl_nm
    LEFT JOIN vlge_lst_t as v on v.vlge_nm=cb.vlge_nm
    left join olt_lst_t as o on o.olt_nm=cb.olt_lc_nm
    WHERE  agnt_id=${user.usr_ctgry_ky} and prv_sts =1
    GROUP BY  blk_id`
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
* Function      : updat_blk_in
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.updat_blk_in = (data, ctmr_id, user, callback) => {
    var fnm = "updat_blk_in"


    var QRY_TO_EXEC = `UPDATE caf_blk_dtl_t set blk_in=0,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP() WHERE caf_id=${data.caf_id}`
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
* Function      : updat_blk_in
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.updtblkcafdtlsMdl = (data, user, callback) => {
    var fnm = "updtblkcafdtlsMdl"
    var QRY_TO_EXEC = `UPDATE caf_blk_dtl_t set frst_nm='${data.firstName}',contct_mb_nu=${data.mobileNumber},
    agnt_id=${data.agnt_id},dstrct_nm='${data.dstrt_nm}',mndl_nm='${data.mndl_nm}',vlge_nm='${data.vlge_nm}',olt_lc_nm='${data.olt_loc}',
    contct_nm='${data.cnt_nm}',u_ts=CURRENT_TIMESTAMP() WHERE blk_id=${data.blk_id}`
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
* Function      : updat_blk_in
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.dltblkcafdtlsMdl = (data, user, callback) => {
    var fnm = "dltblkcafdtlsMdl"
    console.log(data)
    var QRY_TO_EXEC = `UPDATE caf_blk_dtl_t set a_in =0,u_ts=CURRENT_TIMESTAMP() WHERE caf_id=${data}`
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
exports.checkCstmrAdrMdl = (data, user, callback) => {
    var fnm = "checkCstmrAdrMdl"

    var QRY_TO_EXEC = `select cstmr_id from cstmr_dtl_t where adhr_nu=${data.adhr_nu} `;
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
exports.get_blkdtlsMdl = (data, user, callback) => {
    var fnm = "get_blkdtlsMdl"

    var QRY_TO_EXEC = `SELECT c.*,a.agnt_cd from caf_blk_dtl_t c 
    JOIN agnt_lst_t as a on a.agnt_id=c.agnt_id
    WHERE c.a_in =1 
    ORDER BY c.i_ts DESC`;
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
exports.getagntidMdl = (lmo_cd, user, callback) => {
    var fnm = "getagntidMdl"

    var QRY_TO_EXEC = `SELECT * from agnt_lst_t WHERE agnt_cd='${lmo_cd}' `;
    //  console.log(QRY_TO_EXEC)
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
exports.insrtusrMdl = (data, user, c_id, callback) => {
    var fnm = "insrtusrMdl"

    // var QRY_TO_EXEC = `
    // INSERT INTO mrcht_usr_lst_t(mrcht_usr_nm,pswrd_encrd_tx)
    // VALUES ('${data.cstmr_fst_nm}',sha1('${data.cstmr_mble_nu}'));
    // `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : get_cafdtlMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_cafdtlMdl = (data, user, callback) => {
    var fnm = "get_cafdtlMdl"
    var where = "1 = 1 "

    if (data.dstrc_id) {
        where += ` and cf.instl_dstrct_id=${data.dstrc_id} `
    }
    if (data.mso_id) {
        where += ` and cf.mso_agnt_id=${data.mso_id}`
    }
    if (data.agntId) {
        where += ` and cf.lmo_agnt_id=${data.agntId}`
    }
    if (data.mobileno) {
        where += ` and cf.mbl_nu=${data.mobileno} `
    }
    if (data.CAf) {
        where += ` and cf.caf_nu=${data.CAf} `
    } if (data.adhar) {
        where += ` and cf.adhr_nu=${data.adhar} `
    } if (data.str_dt && data.end_dt) {
        where += ` and (cf.actvn_dt BETWEEN '${data.str_dt}' AND '${data.end_dt}') `
    } else if (data.str_dt) {
        where += `and cf.actvn_dt='${data.str_dt}' `
    } if (data.till_dt) {
        where += ` and cf.actvn_dt<CURDATE()`
    }
    if (data.Caf_type) {
        where += ` and cf.caf_type_id=${data.Caf_type} `
    } if (data.mndl_id) {
        where += `and cf.instl_mndl_id=${data.mndl_id} `
    } if (data.Caf_sts) {
        where += ` and cf.enty_sts_id=${data.Caf_sts} `
    } if (data.org_nm) {
        where += ` and cf.frst_nm='${data.org_nm}'`
    } if (data.iptv) {
        where += ` and cf.iptv_srl_nu='${data.iptv}'`
    } if (data.onu) {
        where += ` and cf.onu_srl_nu='${data.onu}'`
    } if (data.trmnd_cond == true) {
        where += ` AND cf.trmnd_in=0  `
    }
	if (data.ent_dprtmnt_id) {
        where += ` AND cf.ent_dept_id=${data.ent_dprtmnt_id}  `
    }
	if (data.apsfl_bbnl) {
        where += ` and cf.apsfl_bbnl=${data.apsfl_bbnl} `
    }
    var QRY_TO_EXEC = ` SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,dl.dprmnt_nm as 'ent_dept_nm',cf.orgnsn_code as 'orgnsn_cd',ct.caf_type_nm, 'Profile' as 'Profile',
                        cu.cstmr_nm,cu.lst_nm,cu.cntct_mble1_nu,a.agnt_cd as lmo_cd,mdlwe_sbscr_id,p.pckge_id,hsi_orgnl_prfle_tx,hsi_orgnl_prfle_tx,
                        cf.caf_id,d.dstrt_nm ,vl.vlge_nm,mn.mndl_nm,bfl.frqncy_nm,caf_nu,caf_mac_addr_tx,mbl_nu,REPLACE(cu.adhr_nu,SUBSTR(cu.adhr_nu,1,8),'XXXXXXXX') as cstmr_adhr_nu,cu.actvn_dt,
                        cu.agnt_id,cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,
                        cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.lat,cf.lng,cf.pndng_blne_at,cf.lst_pd_dt,cf.lst_pd_at,cf.lst_invce_id,cf.trmnd_in,cf.trmnd_rqst_in,cf.actve_in,cf.spnd_in,
                        cf.blckd_in,cf.blckd_rqst_in,cf.dsptd_in,cf.blble_caf_in,cf.pstpd_inve_in,cf.spnd_ts,cf.rsme_ts,cf.actvn_ts,cf.actvn_dt,cf.instd_ts,cf.trmnd_ts,cf.trmnd_dt,cf.enty_sts_id,
                        cf.caf_type_id,cf.mso_agnt_id,cf.lmo_agnt_id,cf.crnt_pln_id,pckge_nm,cf.frqncy_id,cf.prnt_caf_id,cf.lg_id,cf.aaa_cd,cf.aghra_cd,cf.apsf_unq_id,cf.mdlwe_sbscr_id,cf.cstmr_id,
                        cf.instl_addr1_tx,cf.instl_addr2_tx,cf.instl_lcly_tx,cf.instl_ara_tx,cf.instl_ste_id,cf.instl_dstrct_id,cf.instl_mndl_id,cf.instl_vlge_id,cf.instl_std_cd,cf.instl_eml1_tx,
                        cf.instl_lmdle1_nu,cf.onu_stpbx_id,cf.onu_srl_nu,cf.onu_mac_addr_tx,cf.onu_emi_ct,cf.onu_upfrnt_at,cf.onu_own_in,cf.onu_prc_at,cf.olt_id,cf.olt_srl_nu,cf.olt_ip_addr_tx,
                        cf.olt_onu_id,cf.olt_prt_id,cf.olt_prt_nm,cf.olt_crd_nu,cf.splt_id,cf.olt_prt_splt_tx,cf.pop_id,cf.caf_mac_addr_tx,cf.iptv_stpbx_id,cf.iptv_srl_nu,
                        cf.iptv_mac_addr_tx,cf.iptv_upfrnt_at,cf.iptv_prc_at,cf.iptv_emi_ct,cf.iptv_own_in,cf.tp_ct,cf.instl_chrg_at,cf.cnctn_sts_id,cf.cnctn_dt,cf.pstpd_in,cf.rgd_caf_in
                        ,DATE_FORMAT(cf.actvn_dt ,'%d-%m-%Y') as actvn_dt
						,DATE_FORMAT(cf.actvn_ts ,'%d-%m-%Y') as actvn_dts
                        ,DATE_FORMAT(cf.trmnd_dt,'%d-%m-%Y') as trmnd_dt,
                        DATE_FORMAT(date(cf.spnd_ts),'%d-%m-%Y') as spnd_dt,
                        DATE_FORMAT(date(cf.rsme_ts),'%d-%m-%Y') as rsme_dt,
                        cs.sts_nm,ec.entrpe_type_nm,
                        DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts
                        from caf_dtl_t cf 
                        join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id and cu.a_in=1
                        LEFT JOIN entrpe_cstmr_typ_lst_t as ec on cu.entrpe_type_id = ec.entrpe_type_id
                        join agnt_lst_t as a on  a.agnt_id=cf.lmo_agnt_id
						join caf_type_lst_t ct on ct.caf_type_id =cf.caf_type_id
                        JOIN blng_frqncy_lst_t bfl on bfl.frqncy_id = cf.frqncy_id
						left join dprmnt_name_lst_t dl on dl.dprmnt_id=cf.ent_dept_id
                        JOIN enty_sts_lst_t cs on cs.enty_sts_id = cf.enty_sts_id
                        left JOIN dstrt_lst_t d on cf.instl_dstrct_id =d.dstrt_id 
                        left join mndl_lst_t mn on (mn.mndl_nu = cf.instl_mndl_id or mn.mndl_id = cf.instl_mndl_id) and mn.dstrt_id = cf.instl_dstrct_id
                        left join vlge_lst_t vl on (vl.vlge_nu = cf.instl_vlge_id or vl.vlge_id = cf.instl_vlge_id) and vl.mndl_id = cf.instl_mndl_id and vl.dstrt_id=cf.instl_dstrct_id
                        JOIN pckge_lst_t p ON cf.crnt_pln_id = p.pckge_id
                        where ${where}`;
    console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : get_cafdtllmoMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_cafdtllmoMdl = (data, user, callback) => {
    var fnm = "get_cafdtllmoMdl"


    var where = `1 = 1 and cf.lmo_agnt_id=${user.usr_ctgry_ky} `

    if (data.dstrc_id) {
        where += `and cf.instl_dstrct_id=${data.dstrc_id} `
    }
    if (data.mso_id) {
        where += `and cf.mso_agnt_id=${data.mso_id}`
    }
    if (data.agntId) {
        where += `and cf.lmo_agnt_id=${data.agntId}`
    }
    if (data.mobileno) {
        where += `and cf.mbl_nu=${data.mobileno} `
    }
    if (data.CAf) {
        where += `and cf.caf_nu=${data.CAf} `
    } if (data.adhar) {
        where += `and cf.adhr_nu=${data.adhar} `
    } if (data.str_dt && data.end_dt) {
        where += `and (cf.actvn_dt BETWEEN ${data.str_dt} AND ${data.str_dt}) `
    } else if (data.str_dt) {
        where += `and cf.actvn_dt=${data.str_dt} `
    } if (data.till_dt) {
        where += `and cf.actvn_dt<CURDATE() `
    }
    if (data.Caf_type) {
        where += `and cf.caf_type_id=${data.Caf_type} `
    } if (data.mndl_id) {
        where += `and cf.instl_mndl_id=${data.mndl_id} `
    } if (data.Caf_sts) {
        where += `and cf.enty_sts_id=${data.Caf_sts} `
    } if (data.org_nm) {
        where += `and cf.frst_nm='${data.org_nm}'`
    }

    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno, *
                        from caf_dtl_t cf 
                        join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id 
                        JOIN blng_frqncy_lst_t bfl on bfl.frqncy_id = cu.frqncy_id
                        left JOIN enty_sts_lst_t cs on cs.enty_sts_id = cf.enty_sts_id
                        where  ${where} and cf.caf_type_id=1 AND cf.trmnd_in=0`;
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
exports.get_lmosMdl = (data, user, callback) => {
    var fnm = "get_lmosMdl"

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY agnt_id) sno,agnt_nm,agnt_cd from agnt_lst_t where a_in=1 LIMIT 6000;`;

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
exports.getentcafdtMdl = (data, user, callback) => {
    var fnm = "getentcafdtMdl"

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY cstmr_id) sno,* from cstmr_dtl_t where caf_type_id=1 LIMIT 10;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getcstmrdtMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getcstmrdtMdl = (id, user, callback) => {
    var fnm = "getcstmrdtMdl"
    console.log(id)
    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY cstmr_id) sno,* from cstmr_dtl_t where cstmr_id=${id} ;`;
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
* Function      : srvpcsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srvpcsMdl = (data, user, callback) => {
    var fnm = "srvpcsMdl"

    var QRY_TO_EXEC = ` SELECT s.srvcpk_id,s.srvcpk_nm,cs.cre_srvce_id,cs.cre_srvce_nm
      from pckge_srvcpk_rel_t as sr 
      JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=sr.srvcpk_id
      JOIN cre_srvce_lst_t cs on cs.cre_srvce_id = sr.cre_srvce_id
      JOIN pckge_lst_t p on p.pckge_id = sr.pckge_id
      WHERE sr.pckge_id = ${data.id} ORDER BY cre_srvce_id `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srvpcsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getIilcafPckgeDtlsMdl = (data, user, callback) => {
    var fnm = "getIilcafPckgeDtlsMdl"

    var QRY_TO_EXEC = `select ill_pckge_id,cstmr_id,prt_spd,ill_pckge_agrmnt_url,ill_pckge_nm,chrge_at,gst_at,c.ill_enty_sts_id,e.ill_sts_nm,apsfl_shre_at,apsfl_shre_at,lmo_shre_at,mso_shre_at,
    cntrct_prd_num,cntrct_prd_typ,blng_prdcty,lmo_agnt_id,lmo_agnt_cd,aprvl_in,rjct_in,rjct_usr_id,rjct_ts,cre_srvc_id,crte_usr_id,updte_usr_id,c.a_in,c.i_ts,c.u_ts,c.d_ts, (chrge_at + gst_at) as total
     from ill_cstmr_pckge_adtnl_dtls_t  as c
join ill_enty_sts_lst_t as e on e.ill_enty_sts_id = c.ill_enty_sts_id
  WHERE cstmr_id =${data.id} ORDER BY ill_pckge_id   `;
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
exports.UpdateCafDtlsMdl = (data, user, callback) => {
    var fnm = "UpdateCafDtlsMdl"

    var QRY_TO_EXEC = `
        update caf_dtl_t set instl_addr1_tx='${data.custInfo.instl_house_flat_no}',instl_addr2_tx='${data.custInfo.instl_buildingname}',
                instl_lcly_tx='${data.custInfo.instl_streetname}',instl_ara_tx='${data.custInfo.loc_lcly_tx}',instl_ste_id=${data.custInfo.instl_state},
                instl_dstrct_id=${data.custInfo.loc_dstrct_id},instl_mndl_id=${data.custInfo.loc_mndl_id},instl_vlge_id=${data.custInfo.loc_vlge_id},
                instl_eml1_tx='${data.custInfo.loc_eml1_tx}',mbl_nu=${data.custInfo.mbl_nu}, adhr_nu='${data.custInfo.adhr_nu}', pan_nu ='${data.custInfo.pan_nu}', 
                olt_id=${data.olt_id},iptv_stpbx_id =${data.iptv_stpbx_id},iptv_mac_addr_tx ='${data.iptv_mac_addr_tx}' ,
                iptv_srl_nu='${data.iptv_bx_srl_num}',onu_stpbx_id=${data.onu_stpbx_id},onu_mac_addr='${data.onu_mac_addr_tx}',onu_srl_nu ='${data.onu_srl_nu}',
                onu_own update _in =${data.onu_own},onu_emi_ct =${data.onu_emi},onu_prc_at ='${data.onu_amt}',onu_upfrnt_at='${data.onu_up_frmt_amt}',
                instl_chrg_at =${data.inst_amt},iptv_own_in =${data.iptv_bx_own},iptv_emi_ct,= ${data.iptv_bx_emi},
                iptv_prc_at = '${data.iptv_bx_amt}',iptv_upfrnt_at ='${data.iptv_bx_up_amt}',pop_id =${data.custInfo.pop_id},olt_prt_id=${data.olt_prt_id} ,olt_prt_splt_tx="${data.olt_prt_splt_tx}"   
                ,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
        where caf_nu=${data.custInfo.caf_id}
        `;

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
exports.UpdateCustmrDtlstMdl = (data, user, callback) => {
    var fnm = "UpdateCustmrDtlstMdl"
    // console.log(data)
    var QRY_TO_EXEC = `update cstmr_dtl_t set frst_nm='${data.custInfo.frst_nm}',lst_nm='${data.custInfo.lst_nm}',mdlr_nm='${data.custInfo.mdlr_nm}',dob_dt='${data.custInfo.dob_dt}',
    frqncy_id=${data.custInfo.frqncy_id},cstmr_nm='${data.frst_nm + data.mdlr_nm + data.lst_nm}', cntct_mble1_nu=${data.custInfo.mbl_nu},pan_nu ='${data.custInfo.pan_nu}',adhr_nu ='${data.custInfo.adhr_nu}',tle_nm ='${data.custInfo.tle_nm}',frst_nm=  '${data.custInfo.frst_nm}',mdlr_nm= '${data.custInfo.mdlr_nm}',
    lst_nm ='${data.custInfo.lst_nm}',rltve_nm='${data.custInfo.rltve_nm}',gndr_id=${data.custInfo.gndr_id},loc_addr1_tx='${data.instl_buildingname + data.instl_streetname}',loc_addr2_tx='${data.custInfo.loc_lcly_tx}',
    loc_lcly_tx = '${data.custInfo.loc_lcly_tx}',loc_mndl_id = ${data.custInfo.loc_mndl_id},loc_dstrct_id=${data.custInfo.loc_dstrct_id},loc_vlge_id =${data.custInfo.loc_vlge_id},loc_std_cd=${data.custInfo.loc_std_cd},
    loc_lmdle1_nu = ${data.custInfo.loc_lnd_nu},loc_eml1_tx='${data.custInfo.loc_eml1_tx}',cntct_nm='${data.custInfo.blng_cntct_nm}',
    blng_addr1_tx='${data.custInfo.blng_house_flat_no}',blng_addr2_tx='${data.custInfo.blng_buildingname}',blng_lcly_tx='${data.custInfo.blng_streetname}',
    blng_ara_tx='${data.custInfo.blng_lcly_tx}',blng_mndl_id=${data.custInfo.blng_mndl_id},blng_dstrct_id=${data.custInfo.blng_dstrct_id},blng_ste_id=${data.custInfo.blng_ste_id},
    blng_vlge_id=${data.custInfo.blng_vlge_id},blng_pn_cd='${data.custInfo.blng_pn_cd}',cntct_mble1_nu=${data.custInfo.mbl_nu},blng_eml1_tx='${data.custInfo.blng_eml1_tx}',
    blng_cntct_nm ='${data.custInfo.blng_cntct_nm}',blng_cntct_mble1_nu=${data.custInfo.mbl_nu},actvn_dt='${data.custInfo.actvn_dt}', billfreqlov ='${data.billfreqlov}', billrunday='${data.billrunday}',
    blng_std_cd=${data.custInfo.blng_std_cd},blng_lmdle1_nu=${data.custInfo.blng_lnd_nu},updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP() where cstmr_id=${data.cstmr_id}  
      
    `;

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
exports.newgetcafdetailsMdl = (data, user, callback) => {
    var fnm = "newgetcafdetailsMdl"

    var QRY_TO_EXEC = `select  *,ROW_NUMBER() OVER ( ORDER BY caf_id) sno,o.olt_vndr_id from caf_dtl_t c
    JOIN enty_sts_lst_t cs on cs.enty_sts_id = c.enty_sts_id
    JOIN olt_lst_t as o on o.olt_id=c.olt_id
    where caf_id= ${data.id} `;

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
exports.getcafdetailsMdl = (data, user, callback) => {
    var fnm = "getcafdetailsMdl"

    var QRY_TO_EXEC = `select  *,ROW_NUMBER() OVER ( ORDER BY caf_id) sno,o.olt_vndr_id from caf_dtl_t c
    JOIN enty_sts_lst_t cs on cs.enty_sts_id = c.enty_sts_id
    JOIN olt_lst_t as o on o.olt_id=c.olt_id
    where cstmr_id= ${data.id} `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : insbulkcafMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.inscafMdl = (data, user, callback) => {
    var fnm ="inscafMdl"
    var QRY_TO_EXEC = `  INSERT INTO caf_dtl_t (caf_id, caf_nu,enty_sts_id,mso_agnt_id,lmo_agnt_id, 
    enty_sts_id, caf_type_id, olt_id,crnt_pln_id,frqncy_id,splt_id, 
    prnt_caf_id,cstmr_id,instl_lcly_tx,instl_addr2_tx,
    instl_mndl_id,instl_dstrct_id,instl_vlge_id,instl_eml1_tx,
    crte_usr_id, updte_usr_id, a_in) 
select c.caf_id,c.caf_id AS caf_nu,1,c.agnt_id,c.agnt_id, 
                          c.enty_sts_id,c.caf_type_id,o.olt_id,c.crnt_pln_id,1,1, 
                          c.prnt_cstmr_id,c.cstmr_id, instl_lcly_tx,c.olt_lc_nm, 
                          m.mndl_id,d.dstrt_id,v.vlge_id,c.instl_eml1_tx, 
                          c.crte_usr_id,c.updte_usr_id,c.a_in from caf_stg_dtl_t as c
left join mndl_lst_t as m on m.mndl_nm=c.instl_mndl_nm
left join vlge_lst_t as v on v.vlge_nm=c.instl_vlge_nm 
left join dstrt_lst_t as d on d.dstrt_nm=c.instl_dstrct_nm 
left join olt_lst_t as o on  o.olt_nm=c.olt_lc_nm
where caf_id IN  (SELECT s.caf_id FROM caf_dtl_t c RIGHT JOIN caf_stg_dtl_t s On  c.caf_id = s.caf_id WHERE c.caf_id is null )
GROUP BY caf_id`


    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insbulkcafMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.inscstblkMdl = (data, user, callback) => {
    var fnm = "inscstblkMdl"
    var QRY_TO_EXEC = `  INSERT INTO cstmr_dtl_t (cstmr_id, custu_id, cstmr_nm,caf_type_id,bsns_type_id,enty_sts_id, prnt_cstmr_id,gndr_id,pymnt_lblty_in,lmo_agnt_id,cntct_nm,cntct_mble1_nu,blng_dstrct_id,blng_mndl_id,blng_vlge_id, 
        crte_usr_id, updte_usr_id, a_in)
select c.cstmr_id,c.cstmr_id AS custu_id, c.frst_nm,c.caf_type_id,0,1,c.prnt_cstmr_id,1,c.pymnt_lblty_in,c.agnt_id,c.contct_nm,c.contct_mb_nu,d.dstrt_id,m.mndl_id,v.vlge_id,
        c.crte_usr_id,c.updte_usr_id,c.a_in from caf_stg_dtl_t as c
left join mndl_lst_t as m on m.mndl_nm=c.instl_mndl_nm
left join dstrt_lst_t as d on d.dstrt_nm=c.instl_dstrct_nm
left join vlge_lst_t as v on v.vlge_nm=c.instl_vlge_nm 
where caf_id IN  (SELECT s.caf_id FROM caf_dtl_t c RIGHT JOIN caf_stg_dtl_t s On  c.caf_id = s.caf_id WHERE c.caf_id is null )
GROUP BY cstmr_id
`


    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getcafDtlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/

exports.getcafDtlsMdl = (id, user, callback) => {
    var fnm = "getcafDtlsMdl"

    var QRY_TO_EXEC = `SELECT dl.dprmnt_nm as 'ent_dept_nm',c.orgnsn_code as 'orgnsn_cd',c.caf_id, c.caf_nu,c.mbl_nu,c.actvn_dt,c.onu_srl_nu,c.onu_mac_addr_tx,max(date_format(cp.cycle_end_dt,'%d-%m-%Y')) as pack_expry,max(date_format(cp.cycle_strt_dt,'%d-%m-%Y')) as pack_strt,
    c.iptv_srl_nu,c.iptv_mac_addr_tx,cst.cstmr_nm as frst_nm,cst.lst_nm,cst.cstmr_id,cst.cstmr_nm,c.instl_lcly_tx,cs.sts_nm,cs.sts_clr_cd_tx,c.enty_sts_id,DATE_FORMAT(c.spnd_ts,'%d-%m-%Y') as spnd_ts,
    DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvn_ts,DATE_FORMAT(c.trmnd_ts,'%d-%m-%Y') as trmnd_ts,fr.frqncy_nm,
    ct.caf_type_nm,ct1.caf_type_nm as 'apsl_bbnl', md.mdle_nm as onu_mdl_nm,md1.mdle_nm as iptv_mdl_nm,REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.adhr_nu as full_adhr_nu,c.mdlwe_sbscr_id,
    c.olt_prt_nm,c.olt_crd_nu,c.olt_prt_splt_tx,group_concat(distinct(vps.phne_nu)) as phne_nu,count(distinct(vps.phne_nu)) as phne_nu_cnt,c.caf_type_id,
    '' as pswrd_txt,md.emi_at,pl.pckge_nm,pl.pckge_id,
    c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,c.instl_vlge_id,
    v.vlge_nm,m.mndl_nm,d.dstrt_nm, c.instl_ste_id, c.instl_std_cd, cst.loc_eml1_tx as email, cst.loc_std_cd,alt.agnt_nm,alt.agnt_cd,alt.ofce_mbl_nu,c.aghra_cd,c.aaa_cd,
    c.olt_id,c.pop_id,c.olt_ip_addr_tx,c.olt_srl_nu,c.olt_prt_nm,c.olt_prt_splt_tx,
    c.olt_ip_addr_tx ,ol.olt_srl_nu ,ol.olt_nm,ol.pop_id,ol.sbstn_unq_cd,ol.olt_srl_nu,ol.sbstn_nm,
    DATE_FORMAT(ol.oprnl_sts_chnge_ts,'%d %M %Y %H:%i:%s') as  oprnl_sts_chnge_ts,DATE_FORMAT(ol.oprtnl_ste_chnge_ts,'%d %M %Y %H:%i:%s') as oprtnl_ste_chnge_ts
    ,DATE_FORMAT(ol.lst_rfrh_ts,'%d %M %Y %H:%i:%s') as lst_rfrh_ts,oste.ste_nm,ast.sts_nm as ahgra_sts_nm,
    cnt.mble1_ph as netwrk_mbl_nu, cnt.cntct_nm as netwrk_cntct_nm,
    cntt.mble1_ph as sales_mbl_nu, cntt.cntct_nm as sales_cntct_nm,
	DATE_FORMAT(date(c.actvn_dt),'%d-%m-%Y') as actvn_dts,
    DATE_FORMAT(date(c.rsme_ts),'%d-%m-%Y') as rsme_dts,
    DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts,c.tp_ct,c.olt_onu_id
    from caf_dtl_t c
    left JOIN enty_sts_lst_t cs on cs.enty_sts_id = c.enty_sts_id
	join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id and c.crnt_pln_id=cp.pckge_id and cp.a_in=1
    join caf_type_lst_t ct on ct.caf_type_id =c.caf_type_id
	join caf_type_lst_t ct1 on ct1.caf_type_id =c.apsfl_bbnl
    join cstmr_dtl_t cst on cst.cstmr_id =c.cstmr_id
    left JOIN inv_stpbx_lst_t as i on i.caf_id=c.caf_id AND i.prdct_id =1
    left JOIN inv_stpbx_lst_t as i1 on i1.caf_id=c.caf_id AND i1.prdct_id =2
    left JOIN inv_prdct_mdle_lst_t as md on md.mdle_id=i.mdle_id
    left JOIN inv_prdct_mdle_lst_t as md1 on md1.mdle_id=i1.mdle_id
    left JOIN vlge_lst_t v ON v.vlge_nu = cst.loc_vlge_id and v.mndl_id = cst.loc_mndl_id AND v.dstrt_id = cst.loc_dstrct_id
    left JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id AND v.dstrt_id = m.dstrt_id
    left JOIN dstrt_lst_t d ON d.dstrt_id = v.dstrt_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id and vp.a_in = 1
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    left JOIN pckge_lst_t as pl on pl.pckge_id = c.crnt_pln_id
    left JOIN blng_frqncy_lst_t as fr on fr.frqncy_id = cst.frqncy_id
    left JOIN agnt_lst_t as alt on alt.agnt_id = c.lmo_agnt_id
    left join olt_ltrck_dtl_t ol on c.olt_id =ol.olt_id
	left join dprmnt_name_lst_t dl on dl.dprmnt_id=c.ent_dept_id
    left JOIN agro_olt_oprtnl_ste_lst_t oste on ol.oprtnl_ste_id =oste.agro_oprtnl_ste_id
    left JOIN agro_olt_sts_lst_t ast on ast.agro_sts_id =ol.olt_sts_id
    LEFT JOIN cntct_lst_t cnt ON c.instl_dstrct_id = cnt.dstrct_id AND cnt.cntct_ctgry_id=1
    LEFT JOIN cntct_lst_t cntt ON c.instl_dstrct_id = cntt.dstrct_id AND cntt.cntct_ctgry_id=2
    where c.caf_id= ${id} AND c.a_in= 1
    GROUP BY c.caf_id`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getcafPckgeDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafPckgeDtlsMdl = (id, user) => {
    var fnm = "getcafPckgeDtlsMdl"

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY cpp.pkge_prche_id desc) sno,p.pckge_id,
                        p.pckge_nm,
                        psr.srvcpk_id,GROUP_CONCAT(DISTINCT s.srvcpk_nm) as srvcpk_nm,case when cpp.cycle_strt_dt is null then date_format(cpp.efcte_dt,'%Y-%m-%d') else date_format(cpp.cycle_strt_dt,'%Y-%m-%d') end as cycle_strt_dt,
                        case when date_format(cpp.cycle_end_dt,'%Y-%m-%d') is null then date_format(cpp.expry_dt,'%Y-%m-%d') else cpp.cycle_end_dt end as cycle_end_dt,sum(distinct(cd.chrge_at))as chrge_at ,sum(distinct(cd.gst_at)) as gst_at,p.caf_type_id,cf.caf_type_nm,s.cre_srvce_id,
                        GROUP_CONCAT(DISTINCT cs.cre_srvce_nm) AS cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx,DATE_FORMAT(psr.efcte_dt,'%d-%m-%Y')efcte_dt,
                        DATE_FORMAT(psr.expry_dt,'%d-%m-%Y') as expry_dt,psr.efcte_dt as date,psr.expry_dt as date1,
                        psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y') as plan_act,'31-12-9999' as plan_exp
						, case when max(cpp.a_in)=1 then null  
                        when max(cpp.a_in)=0 then DATE_FORMAT(max(cpp.expry_dt),'%d-%m-%Y') end as dscntts, DATE_FORMAT(max(cpp.efcte_dt),'%d-%m-%Y') as actntts
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
                        where p.a_in=1 and c.caf_id=${id}
                        GROUP BY p.pckge_type_id,cpp.cycle_strt_dt
                        ORDER BY cpp.pkge_prche_id desc;`;
						

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : AgntPckgeDtls
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.AgntPckgeDtls = (id, user) => {
    var fnm = "AgntPckgeDtls"

    console.log("hiiiiiiiiiiiiiiiiddddddddddddddiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    console.log(id);

    var QRY_TO_EXEC = ` SELECT ROW_NUMBER() OVER ( ORDER BY p.pckge_id) sno,p.pckge_id,
                        p.pckge_nm,
                        psr.srvcpk_id,GROUP_CONCAT(DISTINCT s.srvcpk_nm) as srvcpk_nm,sum(cd.chrge_at)as chrge_at ,sum(cd.gst_at) as gst_at,p.caf_type_id,cf.caf_type_nm,s.cre_srvce_id,
                        GROUP_CONCAT(DISTINCT cs.cre_srvce_nm) AS cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx,DATE_FORMAT(psr.efcte_dt,'%d-%m-%Y')efcte_dt,
                        DATE_FORMAT(psr.expry_dt,'%d-%m-%Y') as expry_dt,psr.efcte_dt as date,psr.expry_dt as date1,
                        psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y') as plan_act,DATE_FORMAT(cpp.expry_dt,'%d-%m-%Y') as plan_exp
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
                        where p.a_in=1 AND cpp.a_in=1 and c.lmo_agnt_id=${id} 
                        GROUP BY p.pckge_id
                        ORDER BY t.srvcpk_type_nm desc;`;
    console.log("madhuriiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : getcafAppPckgeDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafAppPckgeDtlsMdl = (id, user) => {
    var fnm = "getcafAppPckgeDtlsMdl"

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY p.pckge_id) sno,p.pckge_id,p.pckge_nm,psr.srvcpk_id,s.srvcpk_nm,sum(cd.chrge_at)as chrge_at ,sum(cd.gst_at) as gst_at,(cd.chrge_at+cd.gst_at) as ttl_chrge,p.caf_type_id,cf.caf_type_nm,s.cre_srvce_id,cs.cre_srvce_nm,cd.chrge_cde_id,crg.chrge_cde_dscn_tx,DATE_FORMAT(psr.efcte_dt,'%d-%m-%Y')efcte_dt,
    DATE_FORMAT(psr.expry_dt,'%d-%m-%Y') as expry_dt,psr.efcte_dt as date,psr.expry_dt as date1,psr.lckn_dys_ct,glbl_in,p.pckge_type_id,t.srvcpk_type_nm,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y') as plan_act,DATE_FORMAT(cpp.expry_dt,'%d-%m-%Y') as plan_exp
	,DATE_FORMAT(max(cpp.cycle_strt_dt),'%d-%m-%Y') as cycle_strt_dt,DATE_FORMAT(max(cpp.cycle_end_dt),'%d-%m-%Y') as cycle_end_dt,p.pck_in_sts
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
    where p.a_in=1 AND cpp.a_in=1 and c.caf_id=${id}
    GROUP BY pkge_prche_id,s.srvcpk_id
    ORDER BY t.srvcpk_type_nm desc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getcafhsidatafrchckcafMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getcafhsidatafrchckcafMdl = function (cafId, user) {
    var fnm ="getcafhsidatafrchckcafMdl"
	
    var QRY_TO_EXEC = `select c.*,a.prpd_flag from caf_dtl_t as c
	join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id where caf_id=${cafId}`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function      : getcafHsiDtlsMdl
* Description   : Get Caf Package Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafHsiDtlsMdl = (cafId, cafdata, user) => {
    var fnm = "getcafHsiDtlsMdl"
						
	/*var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY i_ts) as s_no,yr_ct,mnt_ct,
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
                        WHERE caf_id= ${id}
                        GROUP BY yr_ct,mnt_ct
                        ORDER BY i_ts asc;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);*/
	if(cafdata.caf_type_id == 1 && cafdata.prpd_flag == 1  && cafdata.enty_sts_id != 8 && cafdata.enty_sts_id != 45){ 
		var QRY_TO_EXEC = `select year(usg_dt) as yr,month(usg_dt) as 'mnth',d.caf_id,usg_dt,mnth_usge_lmt_ct,round(upld_ct/1024/1024/1024,1) as upld_ct,
		round(dwnld_ct/1024/1024/1024,1) as dwnld_ct,round(ttl_ct/1024/1024/1024,1) as ttl_ct from dly_hsi_usge_dtl_t as d
		join BSS_ONLINE_U.caf_pckge_prchse_dtl_t as cp on cp.caf_id=d.caf_id and cp.a_in=1
		join BSS_ONLINE_U.pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=1
		where d.caf_id=${cafId} and usg_dt BETWEEN cp.cycle_strt_dt and cp.cycle_end_dt
		order by usg_dt asc;`;
		/*var QRY_TO_EXEC = `select yr, mnth, caf_id, usg_dt, mnth_usge_lmt_ct, upld_ct, dwnld_ct, ttl_ct  from (select *,case when a.strtdt = 0 then cycle_strt_dt else caf_date - interval 30 + caf_date_diff day end cyclestrtdt,
		case when a.strtdt = 0 then cycle_end_dt else caf_date - interval caf_date_diff + 1 day end cycleenddt from (select year(usg_dt) as yr,month(usg_dt) as 'mnth',d.caf_id,usg_dt,mnth_usge_lmt_ct,round(upld_ct/1024/1024/1024,1) as upld_ct,
		case when cp.cycle_strt_dt>curdate() then 1 else 0 end strtdt,datediff(curdate() ,cp.cycle_strt_dt ) as date_diff,
        datediff(caf_date ,cp.cycle_strt_dt) as caf_date_diff,cp.cycle_strt_dt,cp.cycle_end_dt,cp.caf_date,
		round(dwnld_ct/1024/1024/1024,1) as dwnld_ct,round(ttl_ct/1024/1024/1024,1) as ttl_ct from BSS_BATCH.dly_hsi_usge_dtl_t as d
		join BSS_ONLINE_U.caf_pckge_prchse_dtl_t as cp on cp.caf_id=d.caf_id and cp.a_in=1
		join BSS_ONLINE_U.pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=1
		where d.caf_id=${cafId}
        ) as a ) as b where b.usg_dt between b.cyclestrtdt and b.cycleenddt
		order by usg_dt asc;`;*/
	} else {
		var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY i_ts) as s_no,yr_ct,mnt_ct,
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
                        WHERE caf_id= ${cafId}
                        GROUP BY yr_ct,mnt_ct
                        ORDER BY i_ts asc;`;
	}
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function       : getcafinfoappMdl
* Description    : 
* Arguments      : callback function
* Change History :
* 06/05/2023   - Ramesh P - Initial Function
******************************************************************************/
exports.getcafinfoappMdl = function (cafid) {
    var fnm = "getcafinfoappMdl"
    var QRY_TO_EXEC = `select c.*,date_format(cp.cycle_end_dt,'%d-%m-%Y') as cycle_end_dt,date_format(cp.cycle_strt_dt,'%Y-%m-%d') as cycle_strt_dt,
    cs.blng_eml1_tx,cs.loc_eml1_tx,c.caf_id as stb_id,p.pckge_nm,e.agnt_cd,e.agnt_cd as rmso_code,e.agnt_nm as emp_first_name,
    e.prpd_flag,e.ofce_mbl_nu as emp_mobile_no from caf_dtl_t c 
	    join caf_pckge_prchse_dtl_t as cp on cp.caf_id=c.caf_id and c.crnt_pln_id=cp.pckge_id  and cp.a_in=1
    join cstmr_dtl_t cs on cs.cstmr_id=c.cstmr_id
	left join pckge_lst_t p ON c.crnt_pln_id=p.pckge_id 
	join agnt_lst_t e ON c.lmo_agnt_id=e.agnt_id 
	where c.caf_id=${cafid}`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

exports.getAppcafHsiDtlsMdl = (id, yr, cafdata, user) => {
    var fnm = "getAppcafHsiDtlsMdl"
    console.log(yr);
    if (yr) {
        var year = `and yr_ct = ${yr}`;
    }
    else {
        var year = ``;
    }
    // var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) as s_no,* FROM hsi_mnthly_usge_dtl_t
    //                    WHERE 1=1  AND caf_id = ${id} ${year}
    //                    ORDER BY yr_ct,mnt_ct`;
    if(cafdata.caf_type_id == 1 && cafdata.prpd_flag == 1  && cafdata.enty_sts_id != 8 && cafdata.enty_sts_id != 45){ 
        var QRY_TO_EXEC = `select year(usg_dt) as yr_ct,month(usg_dt) as 'mnt_ct',d.caf_id,usg_dt,mnth_usge_lmt_ct,round(sum(upld_ct)/1024/1024/1024,1) as upldsize,
		round(sum(dwnld_ct)/1024/1024/1024,1) as dwnldsize,round(sum(ttl_ct)/1024/1024/1024,1) as totalsize from BSS_BATCH.dly_hsi_usge_dtl_t as d
		join BSS_ONLINE_U.caf_pckge_prchse_dtl_t as cp on cp.caf_id=d.caf_id and cp.a_in=1
		join BSS_ONLINE_U.pckge_lst_t as p on p.pckge_id=cp.pckge_id and p.pckge_type_id=1
		where d.caf_id=${cafdata.caf_id} and usg_dt BETWEEN cp.cycle_strt_dt and cp.cycle_end_dt
		order by usg_dt asc;`
    } else {
        var QRY_TO_EXEC = `SELECT ROW_NUMBER()OVER(ORDER BY mnt_ct) as s_no,yr_ct,mnt_ct,
        ROUND(ttl_dwnld_ct/1024/1024/1024,2) AS dwnldsize,
        ROUND(ttl_upld_ct/1024/1024/1024,2) AS upldsize,
        ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as totalsize
        from hsi_mnthly_usge_dtl_t
        WHERE caf_id= ${id} ${year}
        GROUP BY yr_ct,mnt_ct
        ORDER BY mnt_ct desc, yr_ct`;
    }
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : getcafInvoiceDtlsMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
*****************************************************************************
exports.getcafInvoiceDtlsMdl = (id, user) => {
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no
                        ,i.caf_invce_id,i.invce_yr,i.invce_mm as invce_mnth
                        ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm,i.cstmr_id
                        ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2),format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
                        ,format(invce_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at,(case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status'
                        from erp_invce_lst_t i
                        join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
                        WHERE i.pblsd_in=1 AND i.caf_id = ${id}
                        ORDER BY i.invce_yr desc,i.invce_mm desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);

}
*/

/*****************************************************************************
* Function      : getcafInvoice_Mdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafInvoice_Mdl = (id,yr, user) => {
    var fnm = "getcafInvoice_Mdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no
                        ,i.caf_invce_id,i.invce_yr,i.invce_mm as invce_mnth
                        ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm,i.cstmr_id
                        ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2),format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
                        ,format(invce_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at,(case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status'
                        from erp_invce_lst_t i
                        join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
                        WHERE i.pblsd_in=1 AND i.caf_id = ${id} and i.invce_yr=${yr}
                        ORDER BY i.invce_yr desc,i.invce_mm desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


exports.getcafAppInvoiceDtlsMdl = (id, yr, user) => {
    var fnm = "getcafAppInvoiceDtlsMdl"
    console.log(' ---------------------------------------------- getcafAppInvoiceDtlsMdl', id)
    console.log(yr);
    if (yr) {
        var year = `and invce_yr = ${yr}`;
    }
    else {
        var year = ``;
    }

    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no,i.caf_invce_id,i.invce_yr,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_frm_dt,'%m') as fmm,DATE_FORMAT(i.invce_frm_dt,'%Y') as fyy,
    DATE_FORMAT(i.invce_frm_dt,'%d') as fdd, DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,DATE_FORMAT(i.invce_to_dt,'%m') as tmm,DATE_FORMAT(i.invce_to_dt,'%Y') as tyy,
    DATE_FORMAT(i.invce_to_dt,'%d') as tdd,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2),format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
    ,format(invce_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at,
    (case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status'
    from erp_invce_lst_t i
        join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
        WHERE i.pblsd_in=1 AND i.caf_id = ${id} ${year}
        ORDER BY i.invce_yr desc,i.invce_mm desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : getcafInvoiceChargesDtlsMdl
* Description   : Get Caf Invoice Charges Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafInvoiceChargesDtlsMdl = (id, user) => {
    var fnm = "getcafInvoiceChargesDtlsMdl"
    console.log(' ---------------------------------------------- getcafInvoiceChargesDtlsMdl', id)
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as s_no,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
                        ,format(id.chrge_at,2) as chrge_at,format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
                        ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at
                        from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
                        LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
                        LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
                        where id.caf_invce_id=${id}
                        order by p.pckge_id desc ,id.invce_dtl_id ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

exports.getcafAppInvoiceChargesDtlsMdl = (id, yr, user) => {
    var fnm = "getcafAppInvoiceChargesDtlsMdl"
    console.log(yr);
    if (yr) {
        var year = `and invce_yr = ${yr}`;
    }
    else {
        var year = ``;
    }

    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as s_no,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
        ,format(id.chrge_at,2) as chrge_at,format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
        ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at
        from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
        LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
        LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
        where id.caf_invce_id= ${id} ${year}
        order by p.pckge_id desc ,id.invce_dtl_id ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}



/*****************************************************************************
* Function      : getcafClctnInvoiceChargesMdl
* Description   : Get Caf Invoice Charges Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafClctnInvoiceChargesMdl = (id, user) => {
    var fnm = "getcafClctnInvoiceChargesMdl"
    console.log(' ---------------------------------------------- getcafClctnInvoiceChargesMdl', id)
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as s_no,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
                        ,ROUND(id.chrge_at) as chrge_at,ROUND(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at) as tax_at
                        ,ROUND(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at) as tl_at
                        from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
                        LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
                        LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
                        where id.caf_invce_id=${id}
                        order by p.pckge_id desc ,id.invce_dtl_id ;`
    console.log(QRY_TO_EXEC)
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

exports.getcafAppVoipDtlsMdl = (id, yr, user) => {
    var fnm = "getcafAppVoipDtlsMdl"
    console.log(yr);
    if (yr) {
        var year = `and call_yr = ${yr}`;
    }
    else {
        var year = ``;
    }

    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER (ORDER BY v.call_yr,v.call_mm) as s_no,vp.phne_nu,v.*,SUM(v.std_chrge_at + v.isd_chrge_at+v.lcl_chrge_at) as total from voip_caf_phne_chrges_dtl_t v
                        JOIN voip_phne_nmbrs_lst_t as vp on vp.phne_nmbr_id = v.phne_nmbr_id
                        where caf_id = ${id} ${year}
                        GROUP BY v.call_mm
                        ORDER BY v.call_yr,v.call_mm;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : getBoxDtlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getBoxDtlsMdl = (id, user, callback) => {
    var fnm = "getBoxDtlsMdl"
    var QRY_TO_EXEC = `SELECT count(s.caf_id) as caf_cnt,s.srl_nu,s.stpbx_id,s.prdct_id,s.mac_addr_cd,inv.mdle_nm,inv.mdle_id,inv.mdle_cd,inv.mdl_dtls_tx,inv.ntve_lan_in,chrg.* 
    FROM inv_stpbx_lst_t s
    join inv_prdct_mdle_lst_t inv on inv.mdle_id = s.mdle_id 
    JOIN inv_prdct_mdle_chrges_hist_t chrg on chrg.mdle_id = s.mdle_id
    WHERE s.srl_nu = "${id}" and s.lmo_agnt_id = ${user.usr_ctgry_ky} and s.a_in=1`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getPopDtlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getPopDtlsMdl = (id, user, callback) => {
    var fnm = "getPopDtlsMdl"

    var QRY_TO_EXEC = `select a.agnt_id,s.sbstn_nm ,s.sbstn_id from agnt_sbstn_rel_t as a
    join sbstn_lst_t as s on s.sbstn_id=a.sbstn_id
    where a.agnt_id=${id} GROUP BY s.sbstn_id`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getPopDtlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getPopMdl = (data, user, callback) => {
    var fnm = "getPopMdl"
    console.log(data)
    agnt_id =user.usr_ctgry_ky
    if(user.prt_in == 2){
        agnt_id = 101000008
    }
    var QRY_TO_EXEC = `select * from agnt_sbstn_rel_t as a
    join sbstn_lst_t as s on s.sbstn_id=a.sbstn_id
    where a.agnt_id=${agnt_id} and s.dstrct_id =${data[0].dstrct_id} and s.mndl_id = ${data[0].mndl_id} and a.vlge_id =${data[0].vlge_id} and s.apsfl_bbnl = ${data[0].apsfl_bbnl} GROUP BY s.sbstn_id`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getallPopMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getallPopMdl = (data, user, callback) => {
    var fnm = "getallPopMdl"
    console.log(data)
    var QRY_TO_EXEC = `select * from sbstn_lst_t as s
    where  s.dstrct_id =${data[0].dstrct_id} and s.mndl_id = ${data[0].mndl_id}  GROUP BY s.sbstn_id`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : addpop
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.addPopMdl = (data, user, callback) => {
    var fnm = "addPopMdl"
    console.log(data)
    var QRY_TO_EXEC = ` INSERT INTO agnt_sbstn_rel_t(agnt_id,sbstn_id,vlge_id)
     VALUES (${data[0].agnt_id},${data[0].subID},${data[0].vlge_id}); `;
     console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getgetpoplocMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getgetpoplocMdl = (id, user, callback) => {
    var fnm = "getgetpoplocMdl"

    var QRY_TO_EXEC = `
    select vlge_nm,v.vlge_nu,v.vlge_id,d.dstrt_id,v.std_cd,m.mndl_nu,m.mndl_id from agnt_sbstn_rel_t as a
join sbstn_lst_t as s on s.sbstn_id=a.sbstn_id
 join agnt_lst_t ag on ag.agnt_id =a.agnt_id
join vlge_lst_t as v on (v.vlge_nu=ag.ofce_vlge_id or v.vlge_id=ag.ofce_vlge_id) and ag.ofce_mndl_id=v.mndl_id and ag.ofce_dstrt_id=v.dstrt_id
 join mndl_lst_t m on v.mndl_id=m.mndl_nu and v.dstrt_id=m.dstrt_id
 join dstrt_lst_t as d on d.dstrt_id=m.dstrt_id
where a.agnt_id=${user.usr_ctgry_ky} AND s.sbstn_id = ${id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getgetpoplocMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getpoplocMdl = (id, user, callback) => {
    var fnm = "getpoplocMdl"

    var QRY_TO_EXEC = `select ag.vlge_id,s.dstrct_id as dstrt_id,m.mndl_id from sbstn_lst_t s
JOIN agnt_sbstn_rel_t ag on ag.sbstn_id =s.sbstn_id
JOIN mndl_lst_t m on m.mndl_nu = s.mndl_id and m.dstrt_id = s.dstrct_id
where  s.sbstn_id = ${id} GROUP BY ag.vlge_id`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtCafrelMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCafrelMdl = (data, caf_id, user, callback) => {
    var fnm = "insrtCafrelMdl"

    values = `VALUES`
    if (data.onu_stpbx_id) {
        values += `(${caf_id},${data.onu_stpbx_id} ,1,${user.mrcht_usr_id},CURRENT_TIMESTAMP())`
    }
    if (data.iptv_stpbx_id) {
        values += `,(${caf_id},${data.iptv_stpbx_id} ,1,${user.mrcht_usr_id},CURRENT_TIMESTAMP())`
    }

    var QRY_TO_EXEC = `INSERT INTO caf_stpbx_rel_t (caf_id, stpbx_id, crnt_in,crte_usr_id,i_ts ) ${values}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : updtinvstbMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.updtinvstbMdl = (data, caf_id, user, callback) => {
    var fnm = "updtinvstbMdl"

    var values = ``
    if (data.onu_stpbx_id) {
        values += `${data.onu_stpbx_id}`
    }
    if (data.iptv_stpbx_id) {
        values += `,${data.iptv_stpbx_id}`
    }

    var QRY_TO_EXEC = `UPDATE inv_stpbx_lst_t set caf_id = ${caf_id},updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
    where stpbx_id in (${values}) `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/******************************************************************************
* Function      : getAgntCafDetailsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getAgntCafDetailsMdl = (data, user, callback) => {
    var fnm = "getAgntCafDetailsMdl"
    var sts_con = ``;

    if (data.agntId != null) {
        var where = `WHERE cf.lmo_agnt_id = ${data.agntId}`
    } else if (data.sts == 0) {
        var where = `WHERE cf.lmo_agnt_id = ${user.usr_ctgry_ky}`
    } else if (data.sts != 0) {
        var where = `WHERE cf.lmo_agnt_id = ${user.usr_ctgry_ky} and cf.enty_sts_id = ${data.sts}`
    }


    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') AS actvnDt,cf.caf_id, 'Profile' as 'Profile',
    cf.caf_id,cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu, cf.lst_pd_dt as 'lastPayedDate', cf.lst_pd_at as 'lastPayedAt', cf.actvn_dt,cf.enty_sts_id,es.enty_sts_id,es.sts_nm,cf.caf_type_id,
    ct.caf_type_nm,cf.crnt_pln_id,b.frqncy_nm,cf.instl_addr1_tx,cf.instl_lcly_tx,cf.instl_ara_tx,d.dstrt_nm,m.mndl_nm, v.vlge_nm,es.sts_nm, es.sts_clr_cd_tx,
    b.frqncy_nm,cf.instl_std_cd,cf.onu_stpbx_id,cf.onu_srl_nu,cf.onu_mac_addr_tx,cf.olt_srl_nu,cf.olt_ip_addr_tx,cf.olt_prt_id,cf.splt_id,
    cf.olt_prt_nm,cf.pop_id,cf.caf_mac_addr_tx,cf.iptv_stpbx_id,cf.iptv_srl_nu,cf.iptv_mac_addr_tx,p.pckge_nm,pt.pckage_type_nm, ci.invce_dt,
    ci.invce_frm_dt,ci.invce_to_dt,ci.apsfl_shre_at,ci.mso_shre_at,ci.lmo_shre_at, ci.invce_at, ci.prvce_blnce_at, ci.pyble_at, ci.invce_pdf_url_tx,
    ci.eml_snd_in,cu.tle_nm,cu.cstmr_id,cu.cstmr_nm,g.gndr_nm,cu.rltve_nm,cu.loc_addr1_tx as cutmrAdrs1,loc_lcly_tx as cutmrAdrs2,cu.cntct_nm,cu.cntct_mble1_nu,cf.lmo_agnt_id
	,DATE_FORMAT(cf.spnd_ts,'%d-%m-%Y') AS spnd_ts,DATE_FORMAT(cf.rsme_ts,'%d-%m-%Y') AS rsme_ts,i.spnd_dy_ct as SuspendDays,i.actve_dy_ct,(i.actve_dy_ct-i.spnd_dy_ct) as ActiveDays,ROUND(h.ttl_dwnld_ct/1024/1024/1024) + ROUND(h.ttl_upld_ct/1024/1024/1024) as 'HSI USAGE (GB)'
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN blng_frqncy_lst_t as b on b.frqncy_id = cf.frqncy_id
    join caf_type_lst_t as ct on ct.caf_type_id = cf.caf_type_id
    left join gndr_lst_t as g on g.gndr_id = cu.gndr_id
    left join erp_invce_lst_t as i on cf.lst_invce_id = i.caf_invce_id and i.pblsd_in=1
    left join dstrt_lst_t as d  on d.dstrt_id =  cf.instl_dstrct_id
    left join mndl_lst_t as m  on m.mndl_id =  cf.instl_mndl_id
    left join vlge_lst_t as v  on v.vlge_id =  cf.instl_vlge_id
    left join pckge_lst_t as p on p.pckge_id = cf.crnt_pln_id
    left join pckge_type_lst_t as pt on pt.pckge_type_id = p.pckge_type_id
    left join erp_cstmr_invce_lst_t as ci on ci.cstmr_invce_id = i.cstmr_invce_id
	LEFT JOIN BSS_BATCH.hsi_mnthly_usge_dtl_t h ON h.caf_id=cf.caf_id
    ${where} AND cf.trmnd_in=0 AND cf.trmnd_rqst_in=0 
    group BY cf.caf_id`;
    console.log("CAFSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getAgntCafDetailsWthLmtCndtnMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getAgntCafDetailsWthLmtCndtnMdl = (data, user, callback) => {
    var fnm = "getAgntCafDetailsWthLmtCndtnMdl"

    let where_cnd = ` `;
    let pag_size = 20;
    let pge_nu = data.lmt_pstn * pag_size;

    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        if(data.sts == 7) {
            where_cnd += ` and cf.enty_sts_id in (7,85) and cf.actve_in = 0 and cf.spnd_in = 1 and cf.trmnd_in=0  and cf.enty_sts_id <> 8  `
        }
        else if(data.sts == 6) {
            where_cnd += ` and cf.enty_sts_id in (6,84) and cf.actve_in = 1 and cf.spnd_in = 0 and cf.trmnd_in=0  and cf.enty_sts_id <> 8  `
        }
        else{
            where_cnd += ` and cf.enty_sts_id = ${data.sts} `
        }
    }

    if (data.frm_dt && data.to_dt) {
        where_cnd += ` and cf.actvn_dt between '${data.frm_dt}' and '${data.to_dt}' `
    }

    if (data.trmnd_in != undefined) {
        where_cnd += ` and cf.trmnd_in = ${data.trmnd_in}  and cf.trmnd_rqst_in=0 `
    }

    if (data.actv_in != undefined && data.actv_in == 'bill') {
        where_cnd += ` and cf.enty_sts_id = 6`
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
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and cf.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }


    if (user.usr_ctgry_nm == 'MSO') {
        agntID = `and cf.mso_agnt_id=${user.usr_ctgry_ky}`
    } else {
        agntID = `and cf.lmo_agnt_id=${user.usr_ctgry_ky}`
    }

	if(user.prpd_flag == 1){
		var QRY_TO_EXEC =`SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,p.pckge_nm,case when DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') is null then 0 else DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') end AS actvnDt,
case when  date_format(max(cp.cycle_end_dt),'%d-%m-%Y') is null then 0 else date_format(max(cp.cycle_end_dt),'%d-%m-%Y') end  as pack_expry,
case when date_format(max(cp.cycle_strt_dt),'%d-%m-%Y') is null then 0 else date_format(max(cp.cycle_strt_dt),'%d-%m-%Y') end as pack_strt,
	cf.caf_id,case when cf.mdlwe_sbscr_id is null then 0 else cf.mdlwe_sbscr_id end as mdlwe_sbscr_id,
	case when DATE_FORMAT(cf.spnd_ts,'%d-%m-%Y') is null then 0 else date_format(max(cf.spnd_ts),'%d-%m-%Y') end AS spnd_dt,
	#case when cf.enty_sts_id=6 then 0 else ifnull(DATEDIFF(CURDATE(),cf.spnd_ts)+(30*cf.spnd_count),0) end as spnd_count,
	case when cf.enty_sts_id=6 then 0 else DATEDIFF(CURDATE(),cf.spnd_ts) end as spnd_count,
 case when  cf.caf_nu is null then 0 else cf.caf_nu  end as caf_nu ,case when cf.mbl_nu is null then 0 else cf.mbl_nu end as mbl_nu,
  case when REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') is null then 0 else REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') end as adhr_nu, 
	case when es.sts_nm is null then 0 else es.sts_nm end as sts_nm ,case when cf.caf_type_id is null then 0 else cf.caf_type_id end as caf_type_id,
   case when cf.frqncy_id is null then 0 else cf.frqncy_id  end as frqncy_id,
    case when b.frqncy_nm is null then 0 else b.frqncy_nm end as frqncy_nm,case when es.sts_clr_cd_tx is null then 0 else es.sts_clr_cd_tx end as sts_clr_cd_tx,
    case when cf.onu_srl_nu is null then 0 else cf.onu_srl_nu end as onu_srl_nu,
    (case when cf.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE 0 end) as termn_req_sts,
    case when cf.iptv_srl_nu is null then 0 else cf.iptv_srl_nu end as iptv_srl_nu,case when cu.cstmr_id is null then 0 else cu.cstmr_id end as cstmr_id,
     case when cu.cstmr_nm is null then 0 else cu.cstmr_nm end as cstmr_nm,case when cu.cstmr_nm is null then 0 else  cu.cstmr_nm end as frst_nm,
    case when cu.loc_std_cd is null then 0 else cu.loc_std_cd end as loc_std_cd,case when  cu.lst_nm is null then 0 else cu.lst_nm end as lst_nm,
    case when vps.phne_nu is null then 0 else vps.phne_nu end as phne_nu,case when date_format(max(cp.cycle_strt_dt),'%d-%m-%Y') is null then 0 else date_format(max(cp.cycle_strt_dt),'%d-%m-%Y') end as Renewed_On
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
	#left join caf_spnd_dtl_t as s on cf.caf_id = s.caf_id
	left join caf_pckge_prchse_dtl_t as cp on cp.caf_id=cf.caf_id and cp.a_in=1
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN blng_frqncy_lst_t as b on b.frqncy_id = cf.frqncy_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=cf.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    WHERE p.pckge_type_id=1  ${agntID} ${where_cnd} 
    group BY cf.caf_id ORDER BY cf.caf_id  limit ${pge_nu}, ${pag_size}`
	} else {
    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') AS actvnDt,max(date_format(cp.cycle_end_dt,'%d-%m-%Y')) as pack_expry,max(date_format(cp.cycle_strt_dt,'%d-%m-%Y')) as pack_strt,
	cf.caf_id,cf.mdlwe_sbscr_id,cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu, 
	es.sts_nm,cf.caf_type_id,cf.frqncy_id,
    b.frqncy_nm,es.sts_clr_cd_tx,cf.onu_srl_nu,
    (case when cf.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
    cf.iptv_srl_nu,cu.cstmr_id,cu.cstmr_nm,cu.cstmr_nm as frst_nm,cu.loc_std_cd, cu.lst_nm,vps.phne_nu,date_format(cp.cycle_strt_dt,'%d-%m-%Y')as Renewed_On
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
	join caf_pckge_prchse_dtl_t as cp on cp.caf_id=cf.caf_id 
	join pckge_lst_t as p on p.pckge_id=cp.pckge_id 
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN blng_frqncy_lst_t as b on b.frqncy_id = cf.frqncy_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=cf.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    WHERE 1=1 ${agntID} ${where_cnd}
    group BY cf.caf_id ORDER BY cf.caf_id  limit ${pge_nu}, ${pag_size}`;
	}
    console.log("____cafSts____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
	
}





/*****************************************************************************
* Function      : getTotalAgentCafCntsMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.getTotalAgentCafCntsMdl = (data, user, callback) => {
    var fnm = "getTotalAgentCafCntsMdl"
    var sts_con = ``;
    console.log(data.sts + '_______________________status__________________');
    console.log(data);
    let where_cnd = ` `;

    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        if(data.sts == 7) {
            where_cnd += ` and cf.enty_sts_id in(7,85)
            and cf.actve_in = 0 and cf.spnd_in = 1 and cf.trmnd_in=0 and cf.enty_sts_id <> 8  `
        }
        else if(data.sts == 6) {
            where_cnd += ` and cf.enty_sts_id in(6,84)
            and cf.actve_in = 1 and cf.spnd_in = 0 and cf.trmnd_in=0 and cf.enty_sts_id <> 8  `
        }
        else{
            where_cnd += ` and cf.enty_sts_id = ${data.sts} `
        }
    }

    if (data.frm_dt && data.to_dt) {
        where_cnd += ` and cf.actvn_dt between '${data.frm_dt}' and '${data.to_dt}' `
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

    if (user.usr_ctgry_nm == 'MSO') {
        agntID = `cf.mso_agnt_id=${user.usr_ctgry_ky}`
    } else {
        agntID = `cf.lmo_agnt_id=${user.usr_ctgry_ky}`
    }

    var QRY_TO_EXEC = `SELECT   count(*) as ttl_cafs from (  SELECT cf.lmo_agnt_id 
    from caf_dtl_t cf 
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id 
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN blng_frqncy_lst_t as b on b.frqncy_id = cf.frqncy_id
    WHERE ${agntID} ${where_cnd}
    group BY cf.caf_id ) as count`;
    console.log("____cafs count qry____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : insrtCafpckgrelMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getpopsbyditstcMdl = (data, caf_id, user, callback) => {

    var fnm = "getpopsbyditstcMdl"

    var QRY_TO_EXEC = `select * from sbstn_lst_t where dstrct_id=${data.dstrt_id} and mndl_id=${data.mndl_id}`;

    console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : insrtCafpckgrelMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCafpckgrelMdl = (data, caf_id, user, callback) => {
    var fnm = "insrtCafpckgrelMdl"


    var QRY_TO_EXEC = `INSERT INTO caf_pckge_prchse_dtl_t (caf_id, pckge_id, srvcpk_id,chrge_at,efcte_dt,expry_dt,crte_usr_id,a_in,i_ts ) VALUES(${caf_id},${data.crnt_pckge_id} ,0,'${data.cst_at}','${data.efcte_dt}','${data.expry_dt}',${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;

    console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : agntdstrcsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.agntdstrcsMdl = (data, user, caf_id, callback) => {
    var fnm = "agntdstrcsMdl"


    var QRY_TO_EXEC = `SELECT d.dstrt_id,d.dstrt_nm from agnt_lst_t a
    join dstrt_lst_t d on d.dstrt_id=a.ofce_dstrt_id WHERE agnt_id=${user.usr_ctgry_ky} ORDER BY dstrt_nm ASC`;

    console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : agntmndlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.agntmndlsMdl = (dstrc_id, user, caf_id, callback) => {
    var fnm = "agntmndlsMdl"


    var QRY_TO_EXEC = `SELECT m.mndl_nu,m.mndl_nm from agnt_lst_t a
    join mndl_lst_t m on m.mndl_nu=a.ofce_mndl_id WHERE m.dstrt_id=${dstrc_id} and a.agnt_id=${user.usr_ctgry_ky}`;

    console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : agntmndlsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.agntvlgsMdl = (mndl_id, distrct_id, user, caf_id, callback) => {
    var fnm = "agntvlgsMdl"

    console.log(distrct_id, mndl_id)

		var QRY_TO_EXEC = `SELECT v.vlge_nu,v.vlge_id,v.vlge_nm from agnt_lst_t a join vlge_lst_t v on (v.vlge_id = a.ofce_vlge_id or v.vlge_nu = a.ofce_vlge_id) WHERE v.mndl_id=${mndl_id} and v.dstrt_id=${distrct_id} and agnt_id=${user.usr_ctgry_ky}`;
	

    console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : insrtCafrelMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCafspltrelMdl = (data, caf_id, user, callback) => {
    var fnm = "insrtCafspltrelMdl"

    // console.log(data)
    var QRY_TO_EXEC = `update olt_prt_splt_lst_t set caf_id= ${caf_id},updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
    where splt_id=${data.splt_id} and caf_id is NULL`;

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function       : getCafBySearchMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getCafBySearchMdl = function (value, user) {
    var fnm = "getCafBySearchMdl"

    var QRY_TO_EXEC = `select  c.caf_id,t.cstmr_nm from caf_dtl_t as c join cstmr_dtl_t as t on t.cstmr_id = c.cstmr_id where (caf_id LIKE '%${value}%') limit 1000`;
    console.log(QRY_TO_EXEC)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : getpckgePropertiesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getpckgePropertiesMdl = function (data, user) {
    var fnm= "getpckgePropertiesMdl"
    var QRY_TO_EXEC = `SELECT p.pckge_id,p.pckge_nm,s.srvcpk_id,s.srvcpk_nm,p.iptv_flag,
    MAX(case when hp.prpry_nm='DAILYLIMIT' THEN vle_tx ELSE NULL END) as dy_lmt,
    MAX(case when hp.prpry_nm='DAILYLIMITUNIT' THEN vle_tx ELSE NULL END) as dy_lmt_unt,
    MAX(case when hp.prpry_nm='DOWNLOADLIMIT' THEN vle_tx ELSE NULL END) as mnth_lmt,
    MAX(case when hp.prpry_nm='DOWNLOADLIMITUNIT' THEN vle_tx ELSE NULL END) as mnth_lmt_unt,
    MAX(case when hp.prpry_nm='AAA-DownloadSpeed-Normal' THEN vle_tx ELSE NULL END) as aaa_dw_nrml,
    MAX(case when hp.prpry_nm='AAA-UploadSpeed-Normal' THEN vle_tx ELSE NULL END) as aaa_up_nrml,
    MAX(case when hp.prpry_nm='AAA-DownloadSpeed-Threshold' THEN vle_tx ELSE NULL END) as aaa_dw_thrshld,
    MAX(case when hp.prpry_nm='AAA-UploadSpeed-Threshold' THEN vle_tx ELSE NULL END) as aaa_up_thrshld,
    MAX(case when hp.prpry_nm='upstreamTrafficProfileName' THEN vle_tx ELSE NULL END) as up_strm_trfficpfl_nm,
    MAX(case when hp.prpry_nm='downstreamTrafficProfileName' THEN vle_tx ELSE NULL END) as dwn_strm_trfficpfl_nm,
    
    
    CURRENT_TIMESTAMP() AS i_ts
    FROM pckge_lst_t as p
    JOIN pckge_srvcpk_rel_t  as psr on psr.pckge_id=p.pckge_id
    join pckge_srvcpk_lst_t as s on s.srvcpk_id=psr.srvcpk_id
    JOIN cre_srvce_lst_t as c on c.cre_srvce_id=psr.cre_srvce_id
    left JOIN pckge_hsi_prpry_srvcpk_rel_t as spr on spr.srvcpk_id=s.srvcpk_id
    left JOIN pckge_hsi_prpry_lst_t as hp on hp.prpry_id=spr.prpry_id
    
    -- WHERE prpry_nm='DOWNLOADLIMIT
    WHERE p.pckge_id = ${data[0].pckge_id} and s.srvcpk_id = ${data[0].srvcpk_id}
    GROUP BY p.pckge_id
    ORDER BY p.pckge_nm,hp.prpry_nm,p.pckge_id`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function      : insrtCafCpeCrgDtlMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCafCpeCrgDtlMdl = (data, caf_id, user, callback) => {
    var fnm = "insrtCafCpeCrgDtlMdl"


    var QRY_TO_EXEC = `INSERT INTO caf_cpe_chrgs_dtl_t (caf_id, chrge_cde_id, prnt_caf_id,crte_usr_id,a_in,i_ts ) VALUES(${caf_id},24,${caf_id},${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;


    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getTrmndCafsByAgntMdl
* Description   : Get terminated cafs by agent
* Arguments     : callback function
*
******************************************************************************/
exports.getTrmndCafsByAgntMdl = (data, user) => {
    var fnm = "getTrmndCafsByAgntMdl"
    console.log(data);
    let where_cnd = ` `;
    var lmtCondition = ``;
    if (data.lmt_pstn != null) {
        let pge_nu = data.lmt_pstn * 20;
        lmtCondition = ` limit ${pge_nu}, 20 `;
    }


    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%' `
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%' `
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%' `
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cs.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
    var QRY_TO_EXEC = `SELECT trmn_rqst_id,rqst_agnt_id,t.caf_id,t.cstmr_id,DATE_FORMAT(rqst_ts,'%d-%m-%Y %h:%i') AS trmnd_req_dt,rjctd_in,t.lmo_rjctd_in,lmo_rjctd_cmnt_tx,
    CASE WHEN aprvd_ts IS NULL and rjctd_in=0  and (lmo_rjctd_in is null or lmo_rjctd_in = 0) and c.trmnd_rqst_in = 1 THEN 'Termination Request Initiated' 
    WHEN lmo_rjctd_in=1 THEN 'LMO Cancelled Request' WHEN rjctd_in=1 THEN 'Rejected' ELSE 'Approved' END AS sts,
    rqst_cmnt_tx,aprvd_usr_id,DATE_FORMAT(aprvd_ts,'%d-%m-%Y %h:%i') AS aprvd_ts,aprvl_cmnt_tx,caf_type_nm,
    cstmr_nm,cs.cstmr_nm as frst_nm, cs.lst_nm,caf_nu,caf_type_nm,c.instl_eml1_tx,mbl_nu,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.instl_addr1_tx,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') AS actvn_dt
    FROM
    trmn_rqst_dtl_t t
    JOIN caf_dtl_t c ON t.caf_id = c.caf_id
    JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
    JOIN caf_type_lst_t ctt ON c.caf_type_id = ctt.caf_type_id
    WHERE rqst_agnt_id = ${user.usr_ctgry_ky} AND  (t.lmo_rjctd_in is NULL OR t.lmo_rjctd_in = 0) AND t.a_in=1 ${where_cnd}
    GROUP BY c.caf_id
    ORDER BY t.i_ts desc ${lmtCondition}`;


    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : rejectTerminationMdl
* Description   : termination request rejecting
* Arguments     : callback function
*
******************************************************************************/
exports.rejectTerminationMdl = (data, user) => {
    var fnm = "rejectTerminationMdl"
    console.log(data);
    var QRY_TO_EXEC = [`update caf_dtl_t set trmnd_rqst_in = 0 where caf_id = ${data.caf_id} and lmo_agnt_id = ${user.usr_ctgry_ky};`,
    `update trmn_rqst_dtl_t set lmo_rjctd_in = 1 , lmo_rjctd_cmnt_tx = '${data.cncl_reason}' , aprvd_ts = current_timestamp(), a_in = 0  where caf_id = ${data.caf_id}`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : postTrmndCafsByAgntMdl
* Description   : insert terminated cafs by agent
* Arguments     : callback function
*
******************************************************************************/
exports.postTrmndCafsByAgntMdl = (data, user) => {
    var fnm = "postTrmndCafsByAgntMdl"
    var rqstAgntCond = ``;
    if (user.usr_ctgry_ky == null) {
        rqstAgntCond = `${data.lmo_agnt_id},`;
    } else {
        rqstAgntCond = `${user.usr_ctgry_ky},`;
    }
    var QRY_TO_EXEC = `INSERT INTO trmn_rqst_dtl_t(rqst_agnt_id,caf_id,cstmr_id,rqst_ts,rqst_cmnt_tx,crte_usr_id,a_in,i_ts)
    VALUES(${rqstAgntCond} ${data.caf_id},${data.cstmr_id},CURRENT_TIMESTAMP(),'${data.trmnd_desc_tx}',${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updateCafDtlFrTrmndMdl
* Description   : update caf table for terminated cafs by agent
* Arguments     : callback function
*
******************************************************************************/
exports.updateCafDtlFrTrmndMdl = (data, user) => {
    var fnm = "updateCafDtlFrTrmndMdl"

    var QRY_TO_EXEC = ` UPDATE caf_dtl_t
    SET ${data.trmnd}=1,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP(),trmnd_ts = CURRENT_TIMESTAMP(),trmnd_dt = CURDATE(),actve_in = 0,enty_sts_id = 8
    WHERE caf_id=${data.caf_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updateCafDtlFrTrmndReqMdl
* Description   : update caf table for termination requested cafs by agent
* Arguments     : callback function
*
******************************************************************************/
exports.updateCafDtlFrTrmndReqMdl = (data, user) => {
    var fnm = "updateCafDtlFrTrmndReqMdl"

    var QRY_TO_EXEC = ` UPDATE caf_dtl_t
                        SET trmnd_rqst_in=1,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getTrmndReqCafsMdl
* Description   : Get request terminated cafs pending for approval
* Arguments     : callback function
*
******************************************************************************/
exports.getTrmndReqCafsMdl = (user) => {
    var fnm = "getTrmndReqCafsMdl"

    var QRY_TO_EXEC = ` SELECT trmn_rqst_id,rqst_agnt_id,rqst_agnt_id,a.agnt_id,agnt_cd,agnt_nm,agnt_blnce_at,t.caf_id,t.cstmr_id,DATE_FORMAT(rqst_ts,'%d-%m-%Y %h:%m') AS trmnd_req_dt,
                        CASE WHEN aprvd_ts IS NULL THEN 'Pending for approval' ELSE 'Approved' END AS sts,
                        rqst_cmnt_tx,t.aprvd_usr_id,DATE_FORMAT(aprvd_ts,'%d-%m-%Y %h:%m') AS aprvd_ts,aprvl_cmnt_tx,
                        cstmr_nm,caf_nu,caf_type_nm,c.instl_eml1_tx,c.mbl_nu,c.instl_addr1_tx,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') AS actvn_dt,
                        REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,aprvl2_cmnt_tx,
                        DATE_FORMAT(aprvd2_ts,'%d-%m-%Y') AS aprvd2_ts,aprvd2_usr_id,fst_nm,m.mbl_nu
                        FROM
                        trmn_rqst_dtl_t t
                        JOIN caf_dtl_t c ON t.caf_id = c.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN caf_type_lst_t ctt ON c.caf_type_id = ctt.caf_type_id
                        JOIN agnt_lst_t a ON t.rqst_agnt_id = a.agnt_id
                        JOIN mrcht_usr_lst_t m ON t.aprvd2_usr_id = m.mrcht_usr_id
                        WHERE aprvd_ts IS NULL AND aprvd2_ts IS NOT NULL AND rjctd_in=0 ORDER BY trmn_rqst_id`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updateTrmndCafsMdl
* Description   : Update request terminated cafs approval
* Arguments     : callback function
*
******************************************************************************/
exports.updateTrmndCafsMdl = (data, user) => {
    var fnm = "updateTrmndCafsMdl"

    var QRY_TO_EXEC = ` UPDATE trmn_rqst_dtl_t
                        SET aprvd_ts=CURRENT_TIMESTAMP(),aprvl_cmnt_tx='${data.caf_trmnd_aprvl_desc_tx}',aprvd_usr_id=${user.mrcht_usr_id},
                        updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}

/*****************************************************************************
* Function      : getTrmndAprvdCafsByUsrMdl
* Description   : Get termination approved cafs by user
* Arguments     : callback function
*
******************************************************************************/
exports.getTrmndAprvdCafsByUsrMdl = (user) => {
    var fnm = "getTrmndAprvdCafsByUsrMdl"

    var QRY_TO_EXEC = ` SELECT trmn_rqst_id,agnt_nm,agnt_cd,rqst_agnt_id,agnt_blnce_at,t.caf_id,t.cstmr_id,DATE_FORMAT(rqst_ts,'%d-%m-%Y %h:%m') AS trmnd_req_dt,
                        CASE WHEN aprvd_ts IS NULL THEN 'Pending for approval' ELSE 'Approved' END AS sts,
                        rqst_cmnt_tx,t.aprvd_usr_id,DATE_FORMAT(aprvd_ts,'%d-%m-%Y %h:%m') AS aprvd_ts,aprvl_cmnt_tx,cstmr_nm,caf_nu,caf_type_nm,
                        c.instl_eml1_tx,mbl_nu,c.instl_addr1_tx,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') AS actvn_dt,
                        REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu
                        FROM
                        trmn_rqst_dtl_t t
                        JOIN caf_dtl_t c ON t.caf_id = c.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN agnt_lst_t a ON t.rqst_agnt_id = a.agnt_id
                        JOIN caf_type_lst_t ctt ON c.caf_type_id = ctt.caf_type_id
                        WHERE aprvd_ts IS NOT NULL AND aprvd2_ts IS NOT NULL AND rjctd_in=0 AND t.aprvd_usr_id=${user.mrcht_usr_id} ORDER BY trmn_rqst_id`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getTrmndAprvdCafsRcntMdl
* Description   : Get recent termination approved cafs
* Arguments     : callback function
*
******************************************************************************/
exports.getTrmndAprvdCafsRcntMdl = (cafTrmndData, user) => {
    var fnm = "getTrmndAprvdCafsRcntMdl"
    var dtCondition;
    var lmtCondition;
    if (cafTrmndData.frmDt != '' && cafTrmndData.toDt != '') {
        dtCondition = `AND date(t.aprvd_ts) BETWEEN '${cafTrmndData.frmDt}' AND '${cafTrmndData.toDt}'`;
        lmtCondition = ``;
    } else {
        dtCondition = ``;
        lmtCondition = `LIMIT 50`;
    }
    var QRY_TO_EXEC = ` SELECT trmn_rqst_id,agnt_nm,agnt_cd,rqst_agnt_id,agnt_blnce_at,t.caf_id,t.cstmr_id,DATE_FORMAT(rqst_ts,'%d-%m-%Y %h:%m') AS trmnd_req_dt,
    CASE WHEN aprvd_ts IS NULL THEN 'Pending for approval' ELSE 'Approved' END AS sts,
    rqst_cmnt_tx,t.aprvd_usr_id,DATE_FORMAT(aprvd_ts,'%d-%m-%Y %h:%m')
    AS aprvd_ts,aprvl_cmnt_tx,cstmr_nm,caf_nu,caf_type_nm,c.instl_eml1_tx,mbl_nu,c.instl_addr1_tx,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') AS actvn_dt,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu
    FROM
    trmn_rqst_dtl_t t
    JOIN caf_dtl_t c ON t.caf_id = c.caf_id
    JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
    JOIN agnt_lst_t a ON t.rqst_agnt_id = a.agnt_id
    JOIN caf_type_lst_t ctt ON c.caf_type_id = ctt.caf_type_id
    WHERE aprvd_ts IS NOT NULL AND aprvd2_ts IS NOT NULL AND rjctd_in=0 ${dtCondition} ORDER BY t.i_ts DESC ${lmtCondition}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updateTrmndDtlFrRjctMdl
* Description   : update terminate table for rejection cafs by agent
* Arguments     : callback function
*
******************************************************************************/
exports.updateTrmndDtlFrRjctMdl = (data, user) => {
    var fnm = "updateTrmndDtlFrRjctMdl"

    var QRY_TO_EXEC = ` UPDATE trmn_rqst_dtl_t
                        SET ${data.trmnd}=1,,${data.rjct_cmntx_tx}='${data.caf_trmnd_aprvl_desc_tx}',updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;

    // UPDATE trmn_rqst_dtl_t
    // SET aprvd_ts=CURRENT_TIMESTAMP(),aprvl_cmnt_tx='${data.caf_trmnd_aprvl_desc_tx}',aprvd_usr_id=${user.mrcht_usr_id},
    // updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
    // WHERE caf_id=${data.caf_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : updateCafDtlFrTrmndRjctMdl
* Description   : update caf table for termination rejected cafs
* Arguments     : callback function
*
******************************************************************************/
exports.updateCafDtlFrTrmndRjctMdl = (data, user) => {
    var fnm ="updateCafDtlFrTrmndRjctMdl"

    var QRY_TO_EXEC = ` UPDATE caf_dtl_t
                        SET trmnd_rqst_in=0,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getTelNuByAgentIdMdl
* Description   : getAvailable telephone number by AgentId
* Arguments     : callback function
*
******************************************************************************/
exports.getTelNuByAgentIdMdl = (agnt_id, ct) => {
    var fnm = "getTelNuByAgentIdMdl"

    var QRY_TO_EXEC = `select  vq.* from voip_phne_nmbrs_lst_t as vq
    join std_cds_lst_t as s on vq.std_id=s.std_cd_id
    join vlge_lst_t as v on v.std_cd=s.reg_cd
    join agnt_lst_t as a on a.ofce_dstrt_id=v.dstrt_id and a.ofce_mndl_id=v.mndl_id and a.ofce_vlge_id=v.vlge_nu
    and a.agnt_id=${agnt_id} and vq.pswrd_txt is NULL limit ${ct}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}

/*****************************************************************************
* Function      : addPswdForTelMdl
* Description   : Add Password to Tel Number
* Arguments     : callback function
*
******************************************************************************/
exports.addPswdForTelMdl = (user, telCnctn) => {
    var fnm = "addPswdForTelMdl"
    console.log("addPswdForTelMdl")
    var QRY_TO_EXEC = `UPDATE voip_phne_nmbrs_lst_t SET  pswrd_txt='${telCnctn.tel_pwd}',updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP() WHERE phne_nmbr_id =${telCnctn.telId};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}
// /*****************************************************************************
// * Function      : addPswdForTelMdl
// * Description   : Add Password to Tel Number
// * Arguments     : callback function
// *
// ******************************************************************************/
// exports.addTelNuCafRelMdl = (id, telCnctn) => {
//     var QRY_TO_EXEC = `INSERT INTO voip_caf_phne_nmbrs_rel_t (caf_id, phne_nmbr_id) VALUES (${id}, ${telCnctn.telId});`;
//     console.log(QRY_TO_EXEC)
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

// }
/*****************************************************************************
* Function      : stpbxallocatedMdl
* Description   : Add Password to Tel Number
* Arguments     : callback function
*
******************************************************************************/
exports.stpbxallocatedMdl = (id, user) => {
    var fnm = "stpbxallocatedMdl"

    var QRY_TO_EXEC = `SELECT * FROM caf_stpbx_rel_t
    WHERE stpbx_id = ${id} and a_in = 1; `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : getPaidStatusLstMdl
* Arguments     : callback function
*
******************************************************************************/
exports.getPaidStatusLstMdl = (data, user, callback) => {

    var fnm = "getPaidStatusLstMdl"
    var QRY_TO_EXEC = `select d.caf_invce_id,d.chrge_cde_id,d.pckge_id,d.apsfl_shre_at as 'APSFL Share',d.mso_shre_at as 'MSO Share',
    d.lmo_shre_at as 'LMO Share',(d.chrge_at+d.sgst_at+d.cgst_at+d.srvc_at) as 'Total',DATE_FORMAT(chrge_frm_dt,'%d-%m-%Y') as 'Charge From Date',
        DATE_FORMAT(chrge_to_dt,'%d-%m-%Y') as 'Charge To Date',p.pckge_nm as 'Package Name',c.chrge_cd as 'Charge Code',
        (case when d.prtd_in=1 then 'yes' when d.prtd_in=0 then 'No' end) as 'Pro rated',
        (case when i.pd_in=0 then 'Not Paid' WHEN i.pd_in=1 THEN 'Paid' end) as 'Payment Status',
        cm.cstmr_nm,cf.caf_nu,cf.mbl_nu,cf.adhr_nu,pm.pmnt_at,pm.pymnt_mde_id,md.pymnt_mde_nm, ei.prvce_blnce_at, ei.pyble_at
        from erp_invce_dtl_t as d
        LEFT JOIN pckge_lst_t as p on p.pckge_id=d.pckge_id
        left join chrge_cde_lst_t as c on c.chrge_cde_id=d.chrge_cde_id
        left join erp_invce_lst_t as i on i.caf_invce_id = d.caf_invce_id and i.pblsd_in=1
        LEFT JOIN cstmr_dtl_t as cm on cm.cstmr_id=i.cstmr_id
        LEFT JOIN caf_dtl_t as cf on cf.caf_id =i.caf_id
        LEFT JOIN erp_pmnt_dtl_t as pm on pm.caf_id =i.caf_id
        left join erp_cstmr_invce_lst_t as ei on ei.cstmr_id = cm.cstmr_id
        left join pymnt_mde_lst_t as md on md.pymnt_mde_id=pm.pymnt_mde_id
        where i.lmo_agnt_id=${data.agntID} and i.invce_yr=${data.yr} and i.invce_mm=${data.mm} and i.pd_in=${data.p_in}
        GROUP BY i.caf_invce_id
        order by i.i_ts`;



    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getPymntCntsMdl
* Arguments     : callback function
*
******************************************************************************/
exports.getPymntCntsMdl = (data, user, callback) => {
    var fnm = "getPymntCntsMdl"
    console.log(user);
    var QRY_TO_EXEC = `select (a.pend_cafs+b.pd_cafs) as tot_cafs,
    (a.pend_amount+b.pd_amount) as tot_amnt,
    a.pend_cafs,a.pend_amount,b.pd_cafs,b.pd_amount
    from
    (select case when count(distinct(e.caf_id)) is null then 0 else count(distinct(e.caf_id)) end as pend_cafs,cf.lmo_agnt_id,
    case when sum(e.invce_at) is null then 0 else sum(e.invce_at)+SUM(cgst_at)+SUM(sgst_at) end AS pend_amount
    from erp_invce_lst_t as e
    join caf_dtl_t as cf on cf.cstmr_id=e.cstmr_id
    where e.pblsd_in=1 and cf.lmo_agnt_id=${data.agntID} and pd_in=0 and e.invce_mm=${data.mm} and e.invce_yr=${data.yr}) as a
    join
    (select case when count(distinct(e.caf_id)) is null then 0 else count(distinct(e.caf_id)) end as pd_cafs,
    case when sum(e.invce_at) is null then 0 else sum(e.invce_at)+SUM(cgst_at)+SUM(sgst_at) end AS pd_amount,cf.lmo_agnt_id
    from erp_invce_lst_t as e
    join caf_dtl_t as cf on cf.cstmr_id=e.cstmr_id
    where e.pblsd_in=1 and cf.lmo_agnt_id=${data.agntID} and pd_in=1 and e.invce_mm=${data.mm} and e.invce_yr=${data.yr}) as b`;

    if (user.usr_ctgry_nm == 'MSO') {
        agntID = `cf.mso_agnt_id=${user.usr_ctgry_ky}`
    } else {
        agntID = `cf.lmo_agnt_id=${user.usr_ctgry_ky}`
    }

    var QRY_TO_EXEC = `select count(caf_id) as tot_cafs,
    sum(case when cst.pndng_blne_at=0 then '1' else '0' end)  as 'pd_cafs',
    sum(case when cst.pndng_blne_at is null or cst.pndng_blne_at <> 0 then '1' else '0' end) as 'pend_cafs'
    FROM caf_dtl_t as cf
    join cstmr_dtl_t as cst on cf.cstmr_id = cst.cstmr_id and ${agntID}
    where cf.enty_sts_id in (1,2,4,6,7,10,11,22,84,85,100)`

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : stpbxallocatedMdl
* Description   : Add Password to Tel Number
* Arguments     : callback function
*
******************************************************************************/
exports.getspltdetailsMdl = (id, user) => {
    var fnm = "getspltdetailsMdl"

    var QRY_TO_EXEC = `SELECT * from olt_prt_splt_lst_t 
    
    WHERE splt_id = ${id} and caf_id is NULL 
   ;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getAgntSummaryDetailsMdl
* Description   : Agent Summary
* Arguments     : callback function
*
******************************************************************************/
exports.getAgntSummaryDetailsMdl = (id, user) => {
    var fnm = "getAgntSummaryDetailsMdl"

    var QRY_TO_EXEC = `SELECT *,ROW_NUMBER() OVER ( ORDER BY oprtn_yr desc,oprtn_mm desc) as sno 
                        from lmo_oprtn_mnthly_dtl_t 
                        WHERE lmo_agnt_id = ${id.agntId}
                        ORDER BY oprtn_yr desc,oprtn_mm desc;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updateTrmndCafsInvntryStpBxMdl
* Description   : Update CAF inventory in caf_stpbx_rel_t upon termination
* Arguments     : callback function
*
******************************************************************************/
exports.updateTrmndCafsInvntryStpBxMdl = (data, user) => {
    var fnm = "updateTrmndCafsInvntryStpBxMdl"

    var QRY_TO_EXEC = ` UPDATE caf_stpbx_rel_t
                        SET a_in=0,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updateTrmndCafsStpBxDtlsMdl
* Description   : Update CAF inventory setup details in inv_stpbx_lst_t upon termination
* Arguments     : callback function
*
******************************************************************************/
exports.updateTrmndCafsStpBxDtlsMdl = (data, user) => {
    var fnm = "updateTrmndCafsStpBxDtlsMdl"

    var QRY_TO_EXEC = ` UPDATE inv_stpbx_lst_t
                        SET caf_id=NULL,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updateentystsMdl
* Description   : Update entity status for the caf 
* Arguments     : callback function
*
******************************************************************************/
exports.updateentystsMdl = (caf_id, sts_id, user) => {
    var fnm = "updateentystsMdl"

    var QRY_TO_EXEC = `UPDATE caf_dtl_t
    SET enty_sts_id= ${sts_id},actve_in=1,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
    WHERE caf_id= ${caf_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : updateTrmndCafsOltPrtsMdl
* Description   : Update CAF OLT ports upon termination
* Arguments     : callback function
*
******************************************************************************/
exports.updateTrmndCafsOltPrtsMdl = (data, user) => {
    var fnm = "updateTrmndCafsOltPrtsMdl"

    var QRY_TO_EXEC = ` UPDATE olt_prt_splt_lst_t
                        SET caf_id=NULL,updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getCafTerminationDtlsMdl
* Description   : Get CAF details related to termination
* Arguments     : callback function
*
******************************************************************************/
exports.getCafTerminationDtlsMdl = (data, user) => {
    var fnm = "getCafTerminationDtlsMdl"

    var QRY_TO_EXEC =
        `SELECT c.caf_id,caf_nu,REPLACE(aghra_cd,"-HSI",'') as aghra_cd,mdlwe_sbscr_id AS subscriberCodes,mbl_nu,aaa_cd,CURRENT_TIMESTAMP() AS ts,phne_nu AS telNu,pswrd_txt as tel_pwd,
        c.caf_type_id,mso_agnt_id,lmo_agnt_id
    from caf_dtl_t c
    LEFT JOIN voip_caf_phne_nmbrs_rel_t vc ON c.caf_id = vc.caf_id
    LEFT JOIN voip_phne_nmbrs_lst_t vp ON vc.phne_nmbr_id = vp.phne_nmbr_id
    WHERE c.caf_id=${data.caf_id};`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : getCstmr_dtlsMdl
* Description   : Getting Customer Dtls by Customer ID
* Arguments     : callback function
*
******************************************************************************/
exports.getCstmr_dtlsMdl = (cstmr_id, user) => {
    var fnm = "getCstmr_dtlsMdl"
    var QRY_TO_EXEC = ` select cstmr_nm,frst_nm,lst_nm,adhr_nu,cntct_mble1_nu,lmo_agnt_id from cstmr_dtl_t where cstmr_id=${cstmr_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : cstmrDtlsUpdtnMdl
* Description   : Update Customer Details
* Arguments     : callback function
*
******************************************************************************/
exports.cstmrDtlsUpdtnMdl = (data, user) => {
    var fnm = "cstmrDtlsUpdtnMdl"
    // console.log(data[0].adhr_nu+'updtdata');
    var QRY_TO_EXEC = ` update cstmr_dtl_t set adhr_nu=${data[0].adhr_nu},cntct_mble1_nu=${data[0].cntct_mble1_nu},tle_nm='Ms.',cstmr_nm='${data[0].cstmr_nm}',lst_nm='${data[0].lst_nm}',updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP() where cstmr_id=${data[0].cstmr_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updatecstmrDtlsMdl
* Description   : Update Customer Details
* Arguments     : callback function
*
******************************************************************************/
exports.updatecstmrDtlsMdl = (data, user) => {
    var fnm = "updatecstmrDtlsMdl"
    console.log("hai")
    console.log(data.frst_nm + 'updtdata');
    var QRY_TO_EXEC = `update cstmr_dtl_t set frst_nm='${data.frst_nm}',lst_nm='${data.lst_nm}',mdlr_nm='${data.mdlr_nm}',dob_dt='${data.dob_dt}',
    frqncy_id=${data.frqncy_id},cstmr_nm='${data.frst_nm + data.mdlr_nm + data.lst_nm}', cntct_mble1_nu=${data.mbl_nu},pan_nu ='${data.pan_nu}',adhr_nu ='${data.adhr_nu}',tle_nm ='${data.tle_nm}',
    rltve_nm='${data.rltve_nm}',gndr_id=${data.gndr_id},loc_addr1_tx='${data.instl_buildingname + data.instl_streetname}',loc_addr2_tx='${data.loc_lcly_tx}',
    loc_lcly_tx = '${data.loc_lcly_tx}',loc_mndl_id = ${data.loc_mndl_id},loc_dstrct_id=${data.loc_dstrct_id},loc_vlge_id =${data.loc_vlge_id},loc_std_cd=${data.loc_std_cd},
    loc_lmdle1_nu = ${data.loc_lnd_nu},loc_eml1_tx='${data.loc_eml1_tx}',cntct_nm='${data.blng_cntct_nm}',
    blng_addr1_tx='${data.blng_house_flat_no}',blng_addr2_tx='${data.blng_buildingname}',blng_lcly_tx='${data.blng_streetname}',
    blng_ara_tx='${data.blng_lcly_tx}',blng_mndl_id=${data.blng_mndl_id},blng_dstrct_id=${data.blng_dstrct_id},blng_ste_id=${data.blng_ste_id},
    blng_vlge_id=${data.blng_vlge_id},blng_pn_cd='${data.blng_pn_cd}',cntct_mble1_nu=${data.mbl_nu},blng_eml1_tx='${data.blng_eml1_tx}',
    blng_cntct_nm ='${data.blng_cntct_nm}',blng_cntct_mble1_nu=${data.mbl_nu},actvn_dt='${data.actvn_dt}', 
    blng_std_cd=${data.blng_std_cd},blng_lmdle1_nu=${data.blng_lnd_nu},updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP() where cstmr_id=${data.cstmr_id}  
      
    `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : addTelNuCafRelMdl
* Description   : Add Tel Number
* Arguments     : callback function
*
******************************************************************************/
exports.addTelNuCafRelMdl = (id, telCnctn, user) => {
    var fnm = "addTelNuCafRelMdl"
    var QRY_TO_EXEC = `INSERT INTO voip_caf_phne_nmbrs_rel_t (caf_id, phne_nmbr_id,efcte_dt,crte_usr_id,a_in,i_ts) VALUES (${id}, ${telCnctn.telId},CURDATE(),${user.mrcht_usr_id},1,CURRENT_TIMESTAMP());`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : updateTrmndCafsVoipDtlsMdl
* Description   : update caf voip details on termination
* Arguments     : callback function
*
******************************************************************************/
exports.updateTrmndCafsVoipDtlsMdl = (data, user) => {
    var fnm = "updateTrmndCafsVoipDtlsMdl"
    var QRY_TO_EXEC = ` UPDATE voip_caf_phne_nmbrs_rel_t
                        SET a_in=0,expry_dt=CURDATE(),u_ts=CURRENT_TIMESTAMP(),updte_usr_id=${user.mrcht_usr_id}
                        WHERE caf_id=${data.caf_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : cmPrvSearchCMdl
* Description   : update caf voip details on termination
* Arguments     : callback function
*
******************************************************************************/
exports.cmPrvSearchCMdl = (data, user, callback) => {
    var fnm = "cmPrvSearchCMdl"
    console.log("data2222222222222222222222222222");
    console.log(data);
    var where = "1 = 1 "

    if (data.dstrc_id) {
        where += `and cf.instl_dstrct_id=${data.dstrc_id} `
    }
    if (data.mso_id) {
        where += `and cf.mso_agnt_id=${data.mso_id}`
    }
    if (data.agntId) {
        where += `and cf.lmo_agnt_id=${data.agntId}`
    }
    if (data.mobileno) {
        where += `and cf.mbl_nu=${data.mobileno} `
    }
    if (data.CAf) {
        where += `and cf.caf_nu=${data.CAf} `
    } if (data.adhar) {
        where += `and cf.adhr_nu=${data.adhar} `
    } if (data.str_dt && data.end_dt) {
        where += `and (cf.actvn_dt BETWEEN ${data.str_dt} AND ${data.str_dt}) `
    } else if (data.str_dt) {
        where += `and cf.actvn_dt=${data.str_dt} `
    } if (data.till_dt) {
        where += `and cf.actvn_dt<CURDATE()
         `
    }
    if (data.Caf_type) {
        where += `and cf.caf_type_id=${data.Caf_type} `
    } if (data.mndl_id) {
        where += `and cf.instl_mndl_id=${data.mndl_id} `
    } if (data.Caf_sts) {
        where += `and cf.enty_sts_id=${data.Caf_sts} `
    } if (data.org_nm) {
        where += `and cf.frst_nm='${data.org_nm}'`
    } if (data.iptv) {
        where += `and cf.iptv_srl_nu='${data.iptv}'`
    } if (data.onu) {
        where += `and cf.onu_srl_nu='${data.onu}'`
    }
    var QRY_TO_EXEC = ` SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno, 
                        cu.cstmr_nm,cu.lst_nm,cu.cntct_mble1_nu,a.agnt_cd as lmo_cd,
                        cf.caf_id,d.dstrt_nm ,bfl.frqncy_nm,caf_nu,caf_mac_addr_tx,mbl_nu,REPLACE(cu.adhr_nu,SUBSTR(cu.adhr_nu,1,8),'XXXXXXXX') as cstmr_adhr_nu,cu.actvn_dt,
                        cu.agnt_id,cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,
                        cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.lat,cf.lng,cf.pndng_blne_at,cf.lst_pd_dt,cf.lst_pd_at,cf.lst_invce_id,cf.trmnd_in,cf.trmnd_rqst_in,cf.actve_in,cf.spnd_in,
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
                        cs.sts_nm
                        from caf_dtl_t cf 
                        join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
                        join agnt_lst_t as a on  a.agnt_id=cf.lmo_agnt_id
                        JOIN blng_frqncy_lst_t bfl on bfl.frqncy_id = cu.frqncy_id
                        JOIN enty_sts_lst_t cs on cs.enty_sts_id = cf.enty_sts_id
                        JOIN dstrt_lst_t d on cf.instl_dstrct_id =d.dstrt_id 
                        where ${where} AND cf.trmnd_in=0 AND cf.trmnd_rqst_in=0`;
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
* Function      : relatedcafsMdl
* Description   : get adhr,cstmr,mblnu matched data
* Arguments     : callback function
*
******************************************************************************/
exports.relatedcafsMdl = (data, user, callback) => {
    var fnm = "relatedcafsMdl"
    var condition;
    console.log(data);

    if (data.cstmr_id && data.adhr_nu && data.mble_nu) {
        condition = `cstmr_id=${data.cstmr_id} and adhr_nu=${data.adhr_nu} and mbl_nu=${data.mble_nu} `
    }
    else {
        if (data.cstmr_id) {
            condition = `cstmr_id=${data.cstmr_id}`;
        }
        else if (data.adhr_nu) {
            condition = `adhr_nu=${data.adhr_nu}`;
        }
        else if (data.mble_nu) {
            condition = `mbl_nu=${data.mble_nu}`
        }else if (data.mble_nu == 0) {
            condition = `mbl_nu=${data.mble_nu}`
        }
    }
    var QRY_TO_EXEC = ` select caf_id,caf_nu,c.caf_type_id,DATE_FORMAT(actvn_dt,'%d-%m-%Y') AS actvn_dt,DATE_FORMAT(actvn_ts,'%d-%m-%Y %h:%m') AS actvn_ts,
                        DATE_FORMAT(spnd_ts,'%d-%m-%Y %h:%m') AS spnd_ts,DATE_FORMAT(rsme_ts,'%d-%m-%Y %h:%m') AS rsme_ts,DATE_FORMAT(trmnd_ts,'%d-%m-%Y %h:%m') AS trmnd_ts,sts_nm,caf_type_nm
                        from caf_dtl_t c
                        JOIN enty_sts_lst_t e ON c.enty_sts_id = e.enty_sts_id
                        JOIN caf_type_lst_t t ON c.caf_type_id = t.caf_type_id WHERE ${condition}`
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);



}

/*****************************************************************************
* Function      : getsnglCafDataMdl
* Description   : Get global search caf data
* Arguments     : callback function
*
******************************************************************************/
exports.getsnglCafDataMdl = (data, user, callback) => {
    var fnm = "getsnglCafDataMdl"

    let where_cnd = ` `;

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` WHERE cf.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` WHERE cf.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += `WHERE  cf.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` WHERE cu.cstmr_nm like '%${data.srch_txt}%'`
        }
    }

    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') AS actvnDt,cf.caf_id,cf.mdlwe_sbscr_id,
    cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu, cf.adhr_nu as adhr_nu_fl,
	es.sts_nm,cf.caf_type_id,
    b.frqncy_nm,es.sts_clr_cd_tx,cf.onu_srl_nu,
    cf.iptv_srl_nu,cu.cstmr_id,cu.cstmr_nm,cu.cstmr_nm as frst_nm,cu.loc_std_cd, cu.lst_nm,vps.phne_nu
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN blng_frqncy_lst_t as b on b.frqncy_id = cf.frqncy_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=cf.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    ${where_cnd}
    group BY cf.caf_id ORDER BY cf.caf_id`;
    console.log("____ getsnglCafDataMdl ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : updtBlngFrqMdl
* Description   : get adhr,cstmr,mblnu matched data
* Arguments     : callback function
*
******************************************************************************/
exports.updtBlngFrqMdl = (data, user, callback) => {
    var fnm = "updtBlngFrqMdl"
    console.log(data);

    var QRY_TO_EXEC = [`INSERT INTO caf_billing_frqncy_updt_hstry_t(caf_id,old_frqncy_id,agnt_id,crte_usr_id,a_in,i_ts) VALUES(${data.caf_id},${data.frqncy_id},${user.usr_ctgry_ky},${user.mrcht_usr_id},1,CURRENT_TIMESTAMP())`,
    `UPDATE caf_dtl_t set frqncy_id = ${data.upd_blng_freq}, u_ts = CURRENT_TIMESTAMP() where caf_id = ${data.caf_id} and lmo_agnt_id = ${user.usr_ctgry_ky}`]

    console.log(QRY_TO_EXEC);

    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updateStep1CafTrmndAprvlMdl
* Description   : Update request terminated cafs approval --- step 1 approval
* Arguments     : callback function
*
******************************************************************************/
exports.updateStep1CafTrmndAprvlMdl = (data, user) => {
    var fnm = "updateStep1CafTrmndAprvlMdl"
    // console.log(data);
    var QRY_TO_EXEC = ` UPDATE trmn_rqst_dtl_t
                        SET aprvd2_ts=CURRENT_TIMESTAMP(),aprvl2_cmnt_tx='${data.caf_trmnd_aprvl_desc_tx}',aprvd2_usr_id=${user.mrcht_usr_id},
                        updte_usr_id=${user.mrcht_usr_id},u_ts=CURRENT_TIMESTAMP()
                        WHERE caf_id=${data.caf_id}`;
    // console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getStep1CafTrmndAprvlMdl
* Description   : Get request terminated cafs pending for approval
* Arguments     : callback function
*
******************************************************************************/
exports.getStep1CafTrmndAprvlMdl = (user) => {
    var fnm = "getStep1CafTrmndAprvlMdl"

    var QRY_TO_EXEC = ` SELECT trmn_rqst_id,rqst_agnt_id,rqst_agnt_id,a.agnt_id,agnt_cd,agnt_nm,agnt_blnce_at,t.caf_id,t.cstmr_id,DATE_FORMAT(rqst_ts,'%d-%m-%Y %h:%m') AS trmnd_req_dt,
                        CASE WHEN aprvd_ts IS NULL THEN 'Pending for approval' ELSE 'Approved' END AS sts,
                        rqst_cmnt_tx,t.aprvd_usr_id,DATE_FORMAT(aprvd_ts,'%d-%m-%Y %h:%m') AS aprvd_ts,aprvd2_ts,aprvl_cmnt_tx,
                        cstmr_nm,caf_nu,caf_type_nm,c.instl_eml1_tx,mbl_nu,c.instl_addr1_tx,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') AS actvn_dt,
                        REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu
                        FROM
                        trmn_rqst_dtl_t t
                        JOIN caf_dtl_t c ON t.caf_id = c.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN caf_type_lst_t ctt ON c.caf_type_id = ctt.caf_type_id
                        JOIN agnt_lst_t a ON t.rqst_agnt_id = a.agnt_id
                        WHERE aprvd_ts IS NULL AND aprvd2_ts IS NULL AND rjctd_in=0 AND c.instl_dstrct_id=${user.hyrchy_grp_id} AND t.a_in=1 ORDER BY trmn_rqst_id`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getStep1CafTrmndAprvdUsrMdl
* Description   : Get termination approved cafs by user
* Arguments     : callback function
*
******************************************************************************/
exports.getStep1CafTrmndAprvdUsrMdl = (user) => {
    var fnm = "getStep1CafTrmndAprvdUsrMdl"

    var QRY_TO_EXEC = ` SELECT trmn_rqst_id,agnt_nm,agnt_cd,rqst_agnt_id,agnt_blnce_at,t.caf_id,t.cstmr_id,DATE_FORMAT(rqst_ts,'%d-%m-%Y %h:%m') AS trmnd_req_dt,
                        CASE WHEN aprvd_ts IS NULL THEN 'Pending for approval' ELSE 'Approved' END AS sts,
                        rqst_cmnt_tx,t.aprvd_usr_id,DATE_FORMAT(aprvd_ts,'%d-%m-%Y %h:%m') AS aprvd_ts,aprvl_cmnt_tx,cstmr_nm,caf_nu,caf_type_nm,
                        c.instl_eml1_tx,mbl_nu,c.instl_addr1_tx,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') AS actvn_dt,
                        REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu
                        FROM
                        trmn_rqst_dtl_t t
                        JOIN caf_dtl_t c ON t.caf_id = c.caf_id
                        JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
                        JOIN agnt_lst_t a ON t.rqst_agnt_id = a.agnt_id
                        JOIN caf_type_lst_t ctt ON c.caf_type_id = ctt.caf_type_id
                        WHERE aprvd2_ts IS NOT NULL AND rjctd_in=0 AND t.aprvd2_usr_id=${user.mrcht_usr_id} ORDER BY trmn_rqst_id`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getStep1CafTrmndAprvdRcntMdl
* Description   : Get recent termination approved cafs
* Arguments     : callback function
*
******************************************************************************/
exports.getStep1CafTrmndAprvdRcntMdl = (cafTrmndData, user) => {
    var fnm = "getStep1CafTrmndAprvdRcntMdl"
    var dtCondition;
    var lmtCondition;
    if (cafTrmndData.frmDt != '' && cafTrmndData.toDt != '') {
        dtCondition = `AND date(t.aprvd2_ts) BETWEEN '${cafTrmndData.frmDt}' AND '${cafTrmndData.toDt}'`;
        lmtCondition = ``;
    } else {
        dtCondition = ``;
        lmtCondition = `LIMIT 50`;
    }
    var QRY_TO_EXEC = ` SELECT trmn_rqst_id,agnt_nm,agnt_cd,rqst_agnt_id,agnt_blnce_at,t.caf_id,t.cstmr_id,DATE_FORMAT(rqst_ts,'%d-%m-%Y %h:%m') AS trmnd_req_dt,
    CASE WHEN aprvd2_ts IS NULL THEN 'Pending for approval' ELSE 'Approved' END AS sts,
    rqst_cmnt_tx,t.aprvd_usr_id,DATE_FORMAT(aprvd2_ts,'%d-%m-%Y %h:%m')
    AS aprvd2_ts,aprvl_cmnt_tx,cstmr_nm,caf_nu,caf_type_nm,c.instl_eml1_tx,mbl_nu,c.instl_addr1_tx,DATE_FORMAT(c.actvn_dt,'%d-%m-%Y') AS actvn_dt,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu
    FROM
    trmn_rqst_dtl_t t
    JOIN caf_dtl_t c ON t.caf_id = c.caf_id
    JOIN cstmr_dtl_t cs ON c.cstmr_id = cs.cstmr_id
    JOIN agnt_lst_t a ON t.rqst_agnt_id = a.agnt_id
    JOIN caf_type_lst_t ctt ON c.caf_type_id = ctt.caf_type_id
    WHERE aprvd2_ts IS NOT NULL AND rjctd_in=0 AND c.instl_dstrct_id = ${user.hyrchy_grp_id} ${dtCondition} ORDER BY t.i_ts DESC ${lmtCondition}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getcafdtlsbyIDMdl
* Description   : Get caf details based on cafid
* Arguments     : callback function
*
******************************************************************************/
exports.getcafdtlsbyIDMdl = (data, user) => {
    var fnm = "getcafdtlsbyIDMdl"
    var condition=''
    if(data.caf_id)
    {
        condition=`where c.caf_id =${data.caf_id}`
    }
    if(data.subscr_cd)
    {
        condition=`where c.mdlwe_sbscr_id like '${data.subscr_cd}'`
    }

    var QRY_TO_EXEC = `select c.apsfl_bbnl,o.olt_vndr_id,lst_nm,cstmr_nm,frst_nm,tle_nm,caf_nu,mbl_nu,v.vlge_nm,m.mndl_nm,d.dstrt_nm,caf_type_nm,olt_crd_nu ,tp_ct ,olt_prt_splt_tx ,olt_onu_id ,c.olt_ip_addr_tx as ip_adr,(CASE WHEN c.olt_crd_nu = 1 THEN c.olt_prt_nm + 8 ELSE c.olt_prt_nm END) as pon,
    c.aaa_cd ,c.aghra_cd ,c.mdlwe_sbscr_id ,c.enty_sts_id ,c.onu_srl_nu ,c.onu_mac_addr_tx ,c.iptv_srl_nu ,c.iptv_mac_addr_tx,
    c.trmnd_in ,c.trmnd_dt ,c.spnd_in ,date_format(c.spnd_ts,'%Y-%m-%d')as spnd_ts ,c.actve_in ,c.actvn_dt ,CONCAT(c.instl_addr1_tx,',' ,c.instl_addr2_tx )as address,
    s.cntct_mble1_nu ,a.agnt_cd ,a.agnt_nm ,a.ofce_mbl_nu,p.pckge_nm,ip.mdle_cd,c.onu_stpbx_id ,c.iptv_stpbx_id,p.pckge_id,c.caf_type_id,c.apsfl_bbnl
    from caf_dtl_t as c
    join cstmr_dtl_t as s on c.cstmr_id =s.cstmr_id and s.a_in =1
    join agnt_lst_t as a on a.agnt_id =c.lmo_agnt_id and a.a_in =1
	join olt_lst_t as o on o.olt_id=c.olt_id and o.a_in=1
    join pckge_lst_t as p on p.pckge_id =c.crnt_pln_id 
    JOIN caf_type_lst_t ct ON c.caf_type_id=ct.caf_type_id and ct.a_in =1
    join inv_stpbx_lst_t i on i.srl_nu =trim(c.onu_srl_nu) and i.a_in=1 
    join inv_prdct_mdle_lst_t ip on ip.mdle_id =i.mdle_id and ip.a_in =1 
    left join dstrt_lst_t as d on d.dstrt_id=c.instl_dstrct_id
    left join mndl_lst_t as m on (m.mndl_id=c.instl_mndl_id or m.mndl_nu=c.instl_mndl_id) and m.dstrt_id=c.instl_dstrct_id
    left join vlge_lst_t as v on v.dstrt_id=c.instl_dstrct_id and v.mndl_id=c.instl_mndl_id and (v.vlge_id=c.instl_vlge_id or v.vlge_nu=c.instl_vlge_id )
    ${condition} and c.a_in=1 GROUP by c.caf_id `;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getdtlsbyCAFIdMdl
* Description   : Get caf details based on cafid
* Arguments     : callback function
*
******************************************************************************/
exports.getdtlsbyCAFIdMdl = (id, user) => {
    var fnm = "getdtlsbyCAFIdMdl"
    var QRY_TO_EXEC = `select * from caf_dtl_t  where caf_id=${id} `;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : updtcafdtlsbyIDMdl
* Description   : Get termination approved cafs by user
* Arguments     : callback function
*
******************************************************************************/
exports.updtcafdtlsbyIDMdl = (data, id, user) => {
    var fnm = "updtcafdtlsbyIDMdl"

	var QRY_TO_EXEC = ` update caf_dtl_t  set aaa_cd='${data.aaa_cd}' ,aghra_cd='${data.agora_cd}' ,mdlwe_sbscr_id='${data.mdlwre_cd}' ,enty_sts_id=${data.enty_sts_id} ,onu_stpbx_id=${data.onu_stpbx_id},onu_mac_addr_tx='${data.onu_mac_addr}' ,onu_srl_nu='${data.onu_srl_nu}' ,iptv_stpbx_id=${data.iptv_stpbx_id},iptv_mac_addr_tx='${data.iptv_mac_addr}' ,iptv_srl_nu='${data.iptv_srl_nu}' ,trmnd_in=${data.trmnd_in} ,trmnd_dt='${data.trmnd_dt}' ,spnd_in=${data.spnd_in} ,spnd_ts='${data.spnd_ts}' ,actve_in=${data.actve_in} ,actvn_dt='${data.actv_dt}',u_ts=CURRENT_TIMESTAMP() where caf_id=${id}`
	
    /*let where_cnd = ` `;
	let spnd_tss = ` `;
	if(data.actve_in == 0 && data.spnd_in == 1 && result.spnd_in ==0 && result.actve_in== 1){
        spnd_tss = `,spnd_ts = CURRENT_TIMESTAMP()`
    }
    if(data.actve_in == 1 && data.spnd_in == 0 && result.actve_in == 0 && result.spnd_in == 1){
        where_cnd = `,rsme_ts=CURRENT_TIMESTAMP()`;
		spnd_tss = ` `
    }

    var QRY_TO_EXEC = ` update caf_dtl_t  set aaa_cd='${data.aaa_cd}' ,aghra_cd='${data.agora_cd}' ,mdlwe_sbscr_id='${data.mdlwre_cd}' ,enty_sts_id=${data.enty_sts_id} ,onu_stpbx_id=${data.onu_stpbx_id},onu_mac_addr_tx='${data.onu_mac_addr}' ,onu_srl_nu='${data.onu_srl_nu}' ,iptv_stpbx_id=${data.iptv_stpbx_id},iptv_mac_addr_tx='${data.iptv_mac_addr}' ,iptv_srl_nu='${data.iptv_srl_nu}' ,trmnd_in=${data.trmnd_in} ,trmnd_dt='${data.trmnd_dt}' ,spnd_in=${data.spnd_in} ,actve_in=${data.actve_in} ,actvn_dt='${data.actv_dt}',u_ts=CURRENT_TIMESTAMP() ${where_cnd} ${spnd_tss} where caf_id=${id}`*/
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getcafstsMdl
* Description   : Get termination approved cafs by user
* Arguments     : callback function
*
******************************************************************************/
exports.getcafstsMdl = (user) => {
    var fnm = "getcafstsMdl"

    var QRY_TO_EXEC = `select * from enty_sts_lst_t order by enty_sts_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : checkTrmndCafsByAgntMdl
* Description   : Check if already termination request placed
* Arguments     : callback function
*
******************************************************************************/
exports.checkTrmndCafsByAgntMdl = (data, user) => {
    var fnm = "checkTrmndCafsByAgntMdl"
    var agntCond = ``;

    if (data.lmo_agnt_id == undefined) {
        agntCond = `AND rqst_agnt_id=${user.usr_ctgry_ky} and a_in = 1`
    } else {
        agntCond = `AND rqst_agnt_id=${data.lmo_agnt_id} and a_in = 1`;
    }

    var QRY_TO_EXEC = `SELECT * FROM
    trmn_rqst_dtl_t
    WHERE
    caf_id=${data.caf_id} ${agntCond};`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getcafdtlsbyinveIdMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafdtlsbyinveIdMdl = (id,year,mnth,user) => {
    var fnm = "getcafdtlsbyinveIdMdl"
    var QRY_TO_EXEC = `SELECT
    invl.caf_id as cafid,cstr.cstmr_id as customerid, invl.caf_invce_id,
    invd.invce_dtl_id, invd.caf_invce_id, invd.caf_id, invd.chrge_cde_id,chr.chrge_cd,DATE_FORMAT(cpp.efcte_dt,'%d-%m-%Y')as plan_act,invd.chrge_at, invd.pckge_id, pkg.pckge_nm,cinv.invce_pdf_url_tx,
    (case when cstr.blng_cntct_nm is null then cstr.cstmr_nm else cstr.blng_cntct_nm end) as contactname,cstr.blng_eml1_tx, cstr.blng_addr1_tx, (case when invce_addr_tx=1 then cstr.loc_addr2_tx else cstr.blng_addr1_tx end) as loc_addr2_tx, cstr.blng_addr2_tx, cstr.blng_ara_tx,
    (case when cstr.blng_cntct_mble1_nu is null then cstr.cntct_mble1_nu else cstr.blng_cntct_mble1_nu end) as num, cstr.blng_pn_cd,invl.cgst_at,invl.sgst_at,
    cinv.cstmr_invce_id as cst_invoiceid,cinv.invce_mm,cinv.adjsd_at, DATE_FORMAT(cinv.de_dt,'%d-%m-%Y') as duedate, DATE_FORMAT(cinv.invce_dt,'%d-%m-%Y') as billdate,(invl.cgst_at+invl.sgst_at+invl.invce_at) as inve_amnt,
DATE_FORMAT(cinv.invce_frm_dt,'%d-%m-%Y') as billstart,DATE_FORMAT(cinv.invce_to_dt,'%d-%m-%Y') as billend, DATE_FORMAT(invd.chrge_frm_dt,'%d-%m-%Y') as chrge_frm_dt,
    DATE_FORMAT(invd.chrge_to_dt,'%d-%m-%Y') as chrge_to_dt,(cinv.invce_at+cinv.cgst_at+cinv.sgst_at) as ttl_tax,
    cinv.prvce_blnce_at as prvbal,invl.invce_at,invl.srvc_at,(cinv.invce_at+cinv.sgst_at + cinv.cgst_at) as crrnt_bill,pyble_at,(cinv.prvce_blnce_at-pyble_at) as balnce,DATE_FORMAT(caf.actvn_dt,'%d-%m-%Y') as actvn_dt,cinv.invce_at as ttl_invc,voip_chrge_at,cinv.srvc_at as ttl_srvc_at,
    (case WHEN invl.recring_chrge_at then 1 else 0 end) as recring_chrge_at,
    (case when invl.value_add_srvce_at then 1 else 0 end) as value_add_srvce_at, 
    (case when invl.hsi_chrge_at then 1 else 0 end) as hsi_chrge_at,
    (case when invl.add_on_chrge_at then 1 ELSE 0 end) as add_on_chrge_at,
    d.dstrt_nm,v.vlge_nm,cstr.entrpe_type_id,ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as hsi_total,p1.pckge_nm as hsi_pckge_nm,vp.phne_nu
    FROM erp_invce_lst_t invl
    join erp_cstmr_invce_lst_t cinv on cinv.cstmr_id=invl.cstmr_id and cinv.cstmr_invce_id=invl.cstmr_invce_id and invl.pblsd_in=1
    JOIN cstmr_dtl_t cstr on cstr.cstmr_id = cinv.cstmr_id and cstr.a_in=1
    JOIN caf_dtl_t caf on caf.caf_id = invl.caf_id and caf.a_in=1
    left JOIN vlge_lst_t v ON v.vlge_nu  = cstr.loc_vlge_id and v.dstrt_id=cstr.loc_dstrct_id and v.mndl_id=cstr.loc_mndl_id
    JOIN dstrt_lst_t d ON d.dstrt_id = cstr.loc_dstrct_id
    JOIN erp_invce_dtl_t invd on invd.caf_invce_id = invl.caf_invce_id
	JOIN chrge_cde_lst_t chr on chr.chrge_cde_id = invd.chrge_cde_id 
    LEFT OUTER JOIN pckge_lst_t pkg on pkg.pckge_id = invd.pckge_id
	left join caf_pckge_prchse_dtl_t as cpp on cpp.pckge_id = pkg.pckge_id and cpp.caf_id = caf.caf_id
	join pckge_lst_t p1 on p1.pckge_id = caf.crnt_pln_id
    left join voip_caf_phne_nmbrs_rel_t vc on vc.caf_id=invl.caf_id
    left join voip_phne_nmbrs_lst_t vp on vp.phne_nmbr_id=vc.phne_nmbr_id
    left join BSS_BATCH.hsi_mnthly_usge_dtl_t h on h.caf_id = invl.caf_id and yr_ct=${year} and mnt_ct=${mnth}

    where cinv.cstmr_id = ${id} and cinv.invce_yr = ${year} and cinv.invce_mm = ${mnth} group by pkg.pckge_id;;`

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : getcafvoipcalldtlsMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafvoipcalldtlsMdl = (id,year,mnth,user) => {
    var fnm = "getcafvoipcalldtlsMdl"
    var QRY_TO_EXEC = `select count(case when lcl_cals_in=1 then 1 end) as locl_calls,vc.caf_id,count(case when std_cals_in=1 then 1 end) as std_calls,
    count(case when istd_cals_in=1 then 1 end) as isd_calls,
    SEC_TO_TIME(sum(case when lcl_cals_in=1 then vc.cals_drtn_scnds_ct end)) as lcl_duration,
    SEC_TO_TIME(sum(case when std_cals_in=1 then vc.cals_drtn_scnds_ct end)) as std_duration,
    SEC_TO_TIME(sum(case when istd_cals_in=1 then vc.cals_drtn_scnds_ct end )) as istd_duration,
    sum(case when lcl_cals_in=1 then cals_chrge_at end) as lcl_chtge,
    sum(case when std_cals_in=1 then cals_chrge_at end) as std_chtge,
    sum(case when istd_cals_in=1 then cals_chrge_at end) as istd_chtge
    from cstmr_dtl_t as c
    join caf_dtl_t caf on caf.cstmr_id=c.cstmr_id
    join BSS_BATCH.voip_call_hstry_lst_t as vc on vc.caf_id=caf.caf_id
    where c.cstmr_id=${id} and vc.cals_yr=${year} and vc.cals_mm=${mnth} 
    group by caf.caf_id;`;
    console.log(QRY_TO_EXEC)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
exports.getcafvoipcallhistryMdl = (id,year,mnth,user) => {
    var fnm = "getcafvoipcallhistryMdl"
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
    where c.cstmr_id=${id} and vc.cals_yr=${year} and vc.cals_mm=${mnth} group by caf.caf_id,vc.cld_phne_nu;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updtspltinfoMdl
* Description   : Get termination approved cafs by user
* Arguments     : callback function
*
******************************************************************************/
exports.updtspltinfoMdl = (splt_id,caf_id) => {
    var fnm = "updtspltinfoMdl"
    var QRY_TO_EXEC = `UPDATE olt_prt_splt_lst_t set caf_id =${caf_id} ,u_ts =CURRENT_TIMESTAMP() where splt_id = ${splt_id}`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
    // console.log(QRY_TO_EXEC)
}


/*****************************************************************************
* Function      : updtspltbycafId
* Description   : Get termination approved cafs by user
* Arguments     : callback function
*
******************************************************************************/
exports.updtspltbycafId = (data,id, user) => {
    var fnm = "updtspltbycafId"

    var QRY_TO_EXEC = `UPDATE caf_dtl_t set mdlwe_sbscr_id='${data.mdlwre_cd}',aaa_cd='${data.aaa_cd}' ,aghra_cd='${data.agora_cd}',splt_id=${data.splt_id},olt_prt_splt_tx='${data.splts}',enty_sts_id=${data.enty_sts_id},olt_onu_id=${data.onu},olt_onu_id=${data.onu},olt_crd_nu=${data.crd},trmnd_in=${data.trmnd_in} ,trmnd_dt='${data.trmnd_dt}' ,spnd_in=${data.spnd_in} ,spnd_ts='${data.spnd_ts}' ,actve_in=${data.actve_in} ,actvn_dt='${data.actv_dt}',u_ts=CURRENT_TIMESTAMP() where caf_id=${id}`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    // console.log(QRY_TO_EXEC)
}

/*****************************************************************************
* Function      : updtoldsplitinfoMdl
* Description   : Get termination approved cafs by user
* Arguments     : callback function
*
******************************************************************************/
exports.updtoldsplitinfoMdl = (oldonu,id, user) => {
    var fnm = "updtoldsplitinfoMdl"

    var QRY_TO_EXEC = `update olt_prt_splt_lst_t set caf_id= null  where caf_id =${id} and onu_id =${oldonu}`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    // console.log(QRY_TO_EXEC)
}

exports.getcrntMnthLmoCollectnstsMdl = (user) => {
    var fnm = "getcrntMnthLmoCollectnstsMdl"

    var QRY_TO_EXEC = `select monthname(str_to_date(invce_mm,'%m')) as month_nm,count(DISTINCT cf.caf_id) as tot_cafs,format(Round(sum(i.invce_at+i.sgst_at+i.cgst_at+i.srvc_at)),0) as totalAmnt,
    sum(case when i.pd_in = 1 then 1 else 0 end) as paidCafs,
    sum(case when i.pd_in = 0 then 1 else 0 end) as NtpaidCafs,
    format(Round(sum(case when i.pd_in = 0 then i.invce_at+i.sgst_at+i.cgst_at+i.srvc_at else 0 end)),0) as nTpaidAmnt,
    format(Round(sum(case when i.pd_in = 1 then i.invce_at+i.sgst_at+i.cgst_at+i.srvc_at else 0 end)),0) as paidAmnt
    from caf_dtl_t as cf
    join erp_invce_lst_t as i on cf.caf_id = i.caf_id
    where cf.lmo_agnt_id=${user.usr_ctgry_ky} and invce_mm = MONTH(CURRENT_DATE  - INTERVAL 2 MONTH) 
    and invce_yr = YEAR(CURRENT_DATE )`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

exports.getmnthwiseLmoCollectnstsMdl = (user) => {
    var fnm = "getmnthwiseLmoCollectnstsMdl"

    var QRY_TO_EXEC = `select monthname(str_to_date(invce_mm,'%m')) as month_nm,count(DISTINCT cf.caf_id) as tot_cafs,format(Round(sum(i.invce_at+i.sgst_at+i.cgst_at+i.srvc_at)),0) as totalAmnt,
    sum(case when i.pd_in = 1 then 1 else 0 end) as paidCafs,
    sum(case when i.pd_in = 0 then 1 else 0 end) as NtpaidCafs,
    format(Round(sum(case when i.pd_in = 0 then i.invce_at+i.sgst_at+i.cgst_at+i.srvc_at else 0 end)),0) as nTpaidAmnt,
    format(Round(sum(case when i.pd_in = 1 then i.invce_at+i.sgst_at+i.cgst_at+i.srvc_at else 0 end)),0) as paidAmnt
    from caf_dtl_t as cf
    join erp_invce_lst_t as i on cf.caf_id = i.caf_id
    where cf.lmo_agnt_id= ${user.usr_ctgry_ky} and invce_yr = YEAR(CURRENT_DATE )
    GROUP BY invce_mm order by invce_mm`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

exports.getcrntMnthLmoPndgCafsMdl = function (data,user) {
    var fnm = "getcrntMnthLmoPndgCafsMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    console.log(data)
    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }
    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cs.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY c.caf_id) as s_no,cs.frst_nm as frst_nm,cs.lst_nm as lst_nm,c.caf_id,c.caf_nu,c.mbl_nu,c.onu_srl_nu,c.
    olt_id,c.olt_prt_nm,c.olt_prt_splt_tx,c.iptv_srl_nu,c.caf_type_id,c.instl_dstrct_id,c.mbl_nu,
        o.olt_id,o.olt_nm,o.olt_ip_addr_tx,opl.olt_prt_nm,a.agnt_id,a.agnt_cd,a.ofce_mbl_nu, a.ofce_cntct_nm,a.agnt_nm,REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.caf_type_id,DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvnDt,
        DATE_FORMAT(o.i_ts,'%d-%m-%Y %h:%i') as created_on , e.sts_nm, e.sts_clr_cd_tx,b.frqncy_nm,c.mdlwe_sbscr_id,i.caf_invce_id
        FROM caf_dtl_t c
        JOIN cstmr_dtl_t as cs ON cs.cstmr_id = c.cstmr_id
        JOIN olt_lst_t as o ON o.olt_id = c.olt_id
        JOIN olt_prts_lst_t as opl ON opl.olt_id = o.olt_id AND c.olt_prt_nm = opl.olt_prt_nm
        JOIN enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
        JOIN agnt_lst_t as a ON a.agnt_id = opl.agnt_id
        JOIN blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
        JOIN erp_invce_lst_t as i on i.caf_id = c.caf_id
        where c.lmo_agnt_id=${user.usr_ctgry_ky} and i.pd_in = 0
        and i.invce_mm = MONTH(CURRENT_DATE  - INTERVAL 2 MONTH) 
        and i.invce_yr = YEAR(CURRENT_DATE ) ${where_cnd}
        GROUP BY c.caf_id
        ORDER BY c.i_ts limit ${pge_nu}, 20; `;
    console.log('getcrntMnthLmoPndgCafsMdl -------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

exports.getcrntMnthLmoPndgInvceCafsMdl = (id, user) => {
    var fnm = "getcrntMnthLmoPndgInvceCafsMdl"
    console.log(' ---------------------------------------------- getcrntMnthLmoPndgInvceCafsMdl', id)
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no,i.caf_invce_id,i.invce_yr,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm
    ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_frm_dt,'%m') as fmm,DATE_FORMAT(i.invce_frm_dt,'%Y') as fyy,
    DATE_FORMAT(i.invce_frm_dt,'%d') as fdd, DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,DATE_FORMAT(i.invce_to_dt,'%m') as tmm,DATE_FORMAT(i.invce_to_dt,'%Y') as tyy,
    DATE_FORMAT(i.invce_to_dt,'%d') as tdd,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2),format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
    ,format(invce_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at,
    (case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status'
    from erp_invce_lst_t i
        join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
        WHERE i.pblsd_in=1 AND i.caf_id = ${id} and i.invce_mm = MONTH(CURRENT_DATE  - INTERVAL 2 MONTH) 
        and i.invce_yr = YEAR(CURRENT_DATE )
        ORDER BY i.invce_yr desc,i.invce_mm desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

exports.getcrntMnthLmoInvcDtlsMdl = (id,user) => {
    var fnm = "getcrntMnthLmoInvcDtlsMdl"
    console.log(id);
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as s_no,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
        ,format(id.chrge_at,2) as chrge_at,format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
        ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at
        from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
        LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
        LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
        where id.caf_invce_id= ${id} and i.invce_yr = YEAR(CURRENT_DATE )
        order by p.pckge_id desc ,id.invce_dtl_id ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

exports.getlinemanListMdl = (user) => {
    var fnm = "getlinemanListMdl"
    var QRY_TO_EXEC = `select a.agnt_nm,l.lnmn_id,l.lnmn_nm,l.mbl_nu,l.ntwrk_nm,count(DISTINCT p.pon_id) as ponCnt,GROUP_CONCAT(DISTINCT p.pon_id) as pons,l.olt_id,count(DISTINCT c.caf_id) as cafCnt, o.olt_nm, l.crnt_amnt_at, l.lmt_amnt_at, l.clctd_amnt_at
    FROM
    agnt_lst_t as a
    LEFT JOIN lnmn_lst_t as l on l.agnt_id=a.agnt_id
    LEFT JOIN lnmn_pon_rel_t as p on p.lnmn_id=l.lnmn_id
    left join caf_dtl_t as c on c.olt_prt_nm = p.pon_id and c.olt_id=l.olt_id
    left join olt_lst_t as o on c.olt_id = o.olt_id
    where a.agnt_id = ${user.usr_ctgry_ky} and l.a_in = 1 and p.a_in =1
    GROUP BY a.agnt_id,l.lnmn_id
    ORDER BY l.lnmn_id;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

exports.getlinemanCafsListMdl = (data,user) => {
    var fnm = "getlinemanCafsListMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;
    console.log(data)
    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }
    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cs.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY c.caf_id) as s_no,cs.frst_nm as frst_nm,cs.lst_nm as lst_nm,c.caf_id,c.caf_nu,c.mbl_nu,c.onu_srl_nu,c.
    olt_id,c.olt_prt_nm,c.olt_prt_splt_tx,c.iptv_srl_nu,c.caf_type_id,c.instl_dstrct_id,c.mbl_nu,
        o.olt_id,o.olt_nm,o.olt_ip_addr_tx,opl.olt_prt_nm,a.agnt_id,a.agnt_cd,a.ofce_mbl_nu, a.ofce_cntct_nm,d.dstrt_nm,a.agnt_nm,REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,c.caf_type_id,DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvnDt,
        DATE_FORMAT(o.i_ts,'%d-%m-%Y %h:%i') as created_on , e.sts_nm, e.sts_clr_cd_tx,b.frqncy_nm,c.mdlwe_sbscr_id,vps.phne_nu,ROUND(i.invce_at+i.cgst_at+i.sgst_at+i.srvc_at+i.swtch_at+i.ksn_at+i.entrn_at) as 'ltst_inv_amnt',DATE_FORMAT(i.invce_dt,'%d-%m-%Y')  as 'ltst_inv_dt' ,l.lnmn_id,l.lmt_amnt_at,cs.cstmr_id,
        cs.pndng_blne_at as 'prvs_blnc',pm.prtl_at, case when cs.pndng_blne_at=0 then 'PAID' when cs.pndng_blne_at is null or cs.pndng_blne_at <> 0 then 'Not Paid'  end lbl_txt,
        case when cs.pndng_blne_at=0 then '1' when cs.pndng_blne_at is null or cs.pndng_blne_at <> 0 then '0'  end pd_in,i.caf_invce_id
        FROM caf_dtl_t c
        JOIN cstmr_dtl_t as cs ON cs.cstmr_id = c.cstmr_id
        JOIN olt_lst_t as o ON o.olt_id = c.olt_id
        JOIN olt_prts_lst_t as opl ON opl.olt_id = o.olt_id AND c.olt_prt_nm = opl.olt_prt_nm
        JOIN enty_sts_lst_t as e on e.enty_sts_id = c.enty_sts_id
        JOIN agnt_lst_t as a ON a.agnt_id = opl.agnt_id
        JOIN blng_frqncy_lst_t as b on b.frqncy_id = c.frqncy_id
        JOIN dstrt_lst_t as d ON d.dstrt_id = c.instl_dstrct_id
        left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id
        left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
        left join erp_invce_lst_t as i on i.caf_invce_id = c.lst_invce_id
        left join erp_pmnt_dtl_t as pm on pm.caf_id =i.caf_id
        left join lnmn_lst_t as l on l.agnt_id = opl.agnt_id
    where c.enty_sts_id not in(1,8) AND c.lmo_agnt_id = ${user.usr_ctgry_ky} AND c.olt_id=${data.olt_id} AND c.olt_prt_nm in (${data.olt_prt_nm}) AND l.lnmn_id = ${data.lnmn_id}
    ${where_cnd}
    GROUP BY c.caf_id
    ORDER BY c.i_ts limit ${pge_nu}, 20; `;
    console.log('getlinemanCafsListMdl -------------------');
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


exports.postassignPonMdl = (data,user) => {
    var fnm = "postassignPonMdl"
    let semicolumnORcomma = ' ,'
    let concat = ' '

    var QRY_TO_EXEC = `insert into lnmn_pon_rel_t(lnmn_id,pon_id,olt_id,a_in,i_ts) values`;
    for (var i = 0; i < data.pon_id.length; i++) {
        if (i + 1 == data.pon_id.length) {
            semicolumnORcomma = ' ;'
        }
        concat += `(${data.lnmn_id.lnmn_id},${data.pon_id[i]},${data.olt_id},1,current_timestamp()) ${semicolumnORcomma}`;
    }

    QRY_TO_EXEC += concat;

    console.log('postassignPonMdl ---------------------------------- ');

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

exports.addLinemanMdl = (data,user) => {
    var fnm = "addLinemanMdl"
    var QRY_TO_EXEC = `insert into lnmn_lst_t(agnt_id,lnmn_nm,mbl_nu,olt_id,ntwrk_nm,a_in,i_ts) values (${user.usr_ctgry_ky},'${data.lnmn_nm}',${data.mbl_nu},${data.olt_id},'',1,current_timestamp())`;

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

exports.addCstmPonRelLinemanMdl = (lnmId,data,user) => {
    var fnm = "addCstmPonRelLinemanMdl"
    console.log(data);
    var QRY_TO_EXEC = `insert into lnmn_pon_rel_t(lnmn_id,pon_id,a_in,i_ts) values (${lnmId},0,1,current_timestamp())`

    console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


exports.removePonMdl = (data,lnmId,oltId,user) => {
    var fnm = "removePonMdl"
        console.log(data,lnmId,oltId);

       var QRY_TO_EXEC = `update lnmn_pon_rel_t set lnmn_id = ${lnmId}, pon_id = ${data}, olt_id = ${oltId}, a_in = 0, u_ts =current_timestamp() where lnmn_id = ${lnmId} and pon_id = ${data} and olt_id = ${oltId};`;
       console.log('removePonMdl ---------------------------------- ');

       console.log(QRY_TO_EXEC);
   
       return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    }

    
/*****************************************************************************
* Function       : insertPaymentsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.insertPaymentsMdl = function (data, agentid, user, pmnt_id) {
    var fnm = "insertPaymentsMdl"

    
    console.log(data);
    var QRY_TO_EXEC = [`insert into erp_pmnt_dtl_t(pmnt_id,pmnt_at,pymnt_mde_id,crte_usr_id,a_in,i_ts) values (${pmnt_id},${data.pyd_bal_amnt},${data.paymode},${user.mrcht_usr_id},1,current_timestamp());`,
    `update lnmn_lst_t set lmt_amnt_at = ${data.lmtAmnt}, clctd_amnt_at = ${data.clctdAmnt},crnt_amnt_at = ${data.crntAmnt}, u_ts = current_timestamp() where lnmn_id = ${data.lnmn_id};`];

    console.log("******************** 111111111111111 ***************************");
    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : updateCustomrPaymntDtls
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updateCustomrPaymntDtls = function (data, agentid, user) {
    var fnm = "updateCustomrPaymntDtls"
    var QRY_TO_EXEC = `update cstmr_dtl_t set lst_pymnt_id='${data.pmnt_id}',pndng_blne_at = '${data.pnd_bal_amnt}', updte_usr_id ='${user.mrcht_usr_id}', u_ts=current_timestamp() where cstmr_id='${data.cstmr_id}'`;
    console.log("******************** 2222222222222222222222222 ***************************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : insertInvoicePaymentsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.insertInvoicePaymentsMdl = function (data, user, callback) {
    var fnm = "insertInvoicePaymentsMdl"
    let semicolumnORcomma = ' ,'
    let concat = ' '

    var QRY_TO_EXEC = `insert into erp_invce_pmnt_dtl_t(invce_id,pmnt_id,crte_usr_id,prtl_at,prtl_in,a_in,i_ts) values`;
    for (var i = 0; i < data.insertData.length; i++) {
        if (i + 1 == data.insertData.length) {
            semicolumnORcomma = ' ;'
        }
        concat += `(${data.insertData[i].invce_id},${data.insertData[i].pmnt_id},${user.mrcht_usr_id},${data.insertData[i].partialAmntTxt},1,1,current_timestamp()) ${semicolumnORcomma}`;
    }

    QRY_TO_EXEC += concat;

    console.log("******************** 333333333333333333 ***************************");
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updatepayedINdicator
* Description    : 
* Arguments      : callback function
******************************************************************************/

exports.updatepayedINdicator = function (data) {
    var fnm = "insertInvoicePaymentsMdl"

    console.log(data);
    var QRY_TO_EXEC = `update erp_invce_lst_t set  pd_in = 1,pd_dt=current_date(), pd_ts=current_timestamp(), u_ts=current_timestamp() where caf_invce_id= ${data.invce_id}`;
    console.log("******************** 111111111111111 ***************************");
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm);
};



/*****************************************************************************
* Function      : getcafInvoiceDtlsMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafInvoiceDtlsMdl = (id, user) => {
    var fnm = "getcafInvoiceDtlsMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER (ORDER BY i.invce_yr desc,i.invce_mm desc) as s_no
                        ,i.caf_invce_id,i.invce_yr,i.invce_mm as invce_mnth,st.sts_nm,ct.caf_type_nm
                        ,MONTHNAME(CONCAT(i.invce_yr,'-',i.invce_mm,'-01')) as invce_mm,i.cstmr_id
                        ,DATE_FORMAT(i.invce_frm_dt,'%d-%m-%Y') as invce_frm_dt,DATE_FORMAT(i.invce_to_dt,'%d-%m-%Y') as invce_to_dt,p.pckge_nm,i.pd_in,i.pd_ts,format(invce_at,2),format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
                        ,format(invce_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at,(case when pd_in=0 then 'Not Paid' WHEN pd_in=1 THEN 'Paid' end) as 'Payment Status'
						,i.spnd_dy_ct as SuspendDays,i.actve_dy_ct,(i.invce_dy_ct-i.spnd_dy_ct) as ActiveDays
                        ,ROUND(h.ttl_dwnld_ct/1024/1024/1024)  as DOWNLOAD_IN_GB,ROUND(h.ttl_upld_ct/1024/1024/1024) as UPLOAD_IN_GB,ROUND(h.ttl_dwnld_ct/1024/1024/1024) + ROUND(h.ttl_upld_ct/1024/1024/1024) as TOTAL_IN_GB
                        from erp_invce_lst_t i
                        join pckge_lst_t as p on p.pckge_id = i.bse_pckge_id 
                        join caf_dtl_t as c on c.caf_id=i.caf_id
                        join caf_type_lst_t ct on ct.caf_type_id =c.caf_type_id
                        join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
                        LEFT JOIN BSS_BATCH.hsi_mnthly_usge_dtl_t h ON h.caf_id=c.caf_id AND i.invce_yr=h.yr_ct AND i.invce_mm=h.mnt_ct
                        WHERE i.pblsd_in=1 AND i.caf_id = ${id}
                        ORDER BY i.invce_yr desc,i.invce_mm desc;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getReAssgndCafsByAgntMdl
* Description   : Get ReAssigned cafs by agent
* Arguments     : callback function
*
******************************************************************************/
exports.getReAssgndCafsByAgntMdl = function (data, user) {
    var fnm = "getReAssgndCafsByAgntMdl"
    let where_cnd = ` `;
    let pge_nu = data.lmt_pstn * 20;

    if (data.caf_nu == 0) {
        caf = ``
    }
    if (data.caf_nu != 0) {
        caf = `and c.caf_nu='${data.caf_nu}' `
    }
    if (data.adhar_nu == 0) {
        adhar = ``
    }
    if (data.adhar_nu != 0) {
        adhar = `and c.adhr_nu='${data.adhar_nu}' `
    }
    if (data.mbl_nu == 0) {
        mobile = ``
    }
    if (data.mbl_nu != 0) {
        mobile = `and c.mbl_nu='${data.mbl_nu}' `
    }
    if (data.agntID == 0) {
        agntid = ``
    }
    if (data.agntID != 0) {
        agntid = `and c.lmo_agnt_id=${data.agntID}`
    }

    if (data.sts == 0) {
        where_cnd += ` `;
    }
    else if (data.sts != 0) {
        where_cnd += ` and c.enty_sts_id = ${data.sts} `
    }

    if (data.srch_type == 1) {
        if (data.srch_txt) {
            where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 2) {
        if (data.srch_txt) {
            where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 3) {
        if (data.srch_txt) {
            where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 4) {
        if (data.srch_txt) {
            where_cnd += ` and cm.cstmr_nm like '%${data.srch_txt}%'`
        }
    }
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }

    var QRY_TO_EXEC = `
    select c.caf_id,c.rsgn_caf_id,c.caf_nu,c.cstmr_id,
    REPLACE(c.adhr_nu,SUBSTR(c.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,max(date_format(c.spnd_ts,'%d-%m-%Y')) as prvs_spnd_ts,
    c.mbl_nu,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_dstrct_id,c.instl_mndl_id,c.instl_vlge_id,
    (case when c.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
    c.mdlwe_sbscr_id,c.lmo_agnt_id,a.agnt_cd,c.crnt_pln_id,c.aaa_cd,c.caf_mac_addr_tx,cm.cstmr_nm as frst_nm,cm.lst_nm,c.aghra_cd,z.phne_nu,c.caf_type_id,
    c.olt_prt_nm,c.olt_onu_id,c.olt_ip_addr_tx,c.olt_crd_nu,st.sts_nm,st.enty_sts_id,st.sts_clr_cd_tx,c.onu_stpbx_id as  stpbx_id,c.onu_mac_addr_tx as mac_addr_cd,c.onu_srl_nu,c.iptv_srl_nu,DATE_FORMAT(c.actvn_ts,'%d-%m-%Y') as actvnDt
    from caf_dtl_t as c
    left join cstmr_dtl_t as cm on cm.cstmr_id = c.cstmr_id
    left join voip_caf_phne_nmbrs_rel_t as n on n.caf_id=c.caf_id
    left join voip_phne_nmbrs_lst_t as z on z.phne_nmbr_id = n.phne_nmbr_id
    join agnt_lst_t as a on a.agnt_id=c.lmo_agnt_id
    left join enty_sts_lst_t as st on st.enty_sts_id = c.enty_sts_id
    where c.spnd_in = 0 and c.actve_in = 1 and c.trmnd_in=1 and c.enty_sts_id = 8 and c.rsgn_caf_id is not null
    ${agntid} ${caf} ${adhar} ${mobile} ${where_cnd} GROUP BY c.caf_id ORDER BY c.caf_id  limit ${pge_nu}, 20`;

    console.log("&&&&&&&&&&&&&&&&getReAssgndCafsByAgntMdl&&&&&&&&&&&&&&&&&&&&&");
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/*****************************************************************************
* Function       : get_kyctypesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_kyctypesMdl = (user,callback) => {
    var fnm = "get_kyctypesMdl"
    var QRY_TO_EXEC = ` SELECT *
                        FROM caf_kyc_dcmnt_ctgry_lst_t  
                        WHERE a_in = 1 
                        ORDER BY dcmny_ctgry_id; `;
    console.log("******************** get_kyctypesMdl ***************************");
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
* Function      : updtcafdtlMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.updtcafdtlMdl = (data,nw_caf_id, user) => {
    var fnm= "updtcafdtlMdl"
    var QRY_TO_EXEC = `update caf_dtl_t set trmnd_in=1,enty_sts_id = 8, trmnd_ts=current_timestamp(),rsgn_caf_id=${nw_caf_id},old_caf_id = ${data.caf_id}, a_in = 0, u_ts = current_timestamp()  where caf_id=${data.caf_id};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : insnwcafMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.insnwcafMdl = (data,nw_caf_id,nw_ctrmr_id, user) => {
    var fnm = "insnwcafMdl"
    console.log(data.chnge_in);
    if(data.chnge_in == 0){
        var QRY_TO_EXEC = `INSERT INTO caf_dtl_t(caf_id,old_caf_id,prpd_in,cstmr_id,caf_nu,mbl_nu,adhr_nu,lat,lng,pndng_blne_at,lst_pd_dt,lst_pd_at,lst_invce_id,trmnd_in,trmnd_rqst_in,actve_in,spnd_in,blckd_in,blckd_rqst_in,dsptd_in,blble_caf_in,pstpd_inve_in,spnd_ts,rsme_ts,actvn_ts,actvn_dt,instd_ts,trmnd_ts,trmnd_dt,enty_sts_id,box_chng_sts_id,pon_chng_sts_id,caf_type_id,mso_agnt_id,lmo_agnt_id,crnt_pln_id,frqncy_id,prnt_caf_id,lg_id,aaa_cd,aghra_cd,apsf_unq_id,mdlwe_sbscr_id,instl_addr1_tx,instl_addr2_tx,instl_lcly_tx,instl_ara_tx,instl_ste_id,instl_dstrct_id,instl_mndl_id,instl_vlge_id,instl_std_cd,instl_eml1_tx,instl_lmdle1_nu,onu_stpbx_id,onu_srl_nu,onu_mac_addr_tx,onu_emi_ct,onu_upfrnt_at,onu_own_in,onu_prc_at,olt_id,olt_srl_nu,olt_ip_addr_tx,olt_onu_id,olt_prt_id,olt_prt_nm,olt_crd_nu,splt_id,olt_prt_splt_tx,pop_id,caf_mac_addr_tx,iptv_stpbx_id,iptv_srl_nu,iptv_mac_addr_tx,iptv_upfrnt_at,iptv_prc_at,iptv_emi_ct,iptv_own_in,tp_ct,instl_chrg_at,cnctn_sts_id,cnctn_dt,pstpd_in,hsi_thrtd_in,hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,hsi_on_bstr_pck_ts,rgd_caf_in,cmplt_in,lsd_lne_in,crps_mdlwr_in,ds_mdlwr_in,ds_mdlwe_sbscr_id,rsgn_caf_id,crte_usr_id,updte_usr_id,a_in,d_ts,u_ts,i_ts)
        select ${nw_caf_id} as caf_id,null as old_caf_id
        ,a.prpd_in as prpd_in,${nw_ctrmr_id} as cstmr_id, ${nw_caf_id} as caf_nu,c.mbl_nu,c.adhr_nu,c.lat,c.lng,c.pndng_blne_at,c.lst_pd_dt,c.lst_pd_at,c.lst_invce_id,0 as trmnd_in,0 as trmnd_rqst_in,c.actve_in,c.spnd_in,c.blckd_in,c.blckd_rqst_in,c.dsptd_in,c.blble_caf_in,c.pstpd_inve_in,c.spnd_ts,c.rsme_ts,current_timestamp() as actvn_ts,current_timestamp() as actvn_dt,c.instd_ts,null as trmnd_ts,null as trmnd_dt,6 as enty_sts_id,c.box_chng_sts_id,c.pon_chng_sts_id,c.caf_type_id,c.mso_agnt_id,c.lmo_agnt_id,c.crnt_pln_id,c.frqncy_id,c.prnt_caf_id,c.lg_id,c.aaa_cd,c.aghra_cd,c.apsf_unq_id,c.mdlwe_sbscr_id,c.instl_addr1_tx,c.instl_addr2_tx,c.instl_lcly_tx,c.instl_ara_tx,c.instl_ste_id,c.instl_dstrct_id,c.instl_mndl_id,c.instl_vlge_id,c.instl_std_cd,c.instl_eml1_tx,c.instl_lmdle1_nu,c.onu_stpbx_id,c.onu_srl_nu,c.onu_mac_addr_tx,c.onu_emi_ct,c.onu_upfrnt_at,c.onu_own_in,c.onu_prc_at,c.olt_id,c.olt_srl_nu,c.olt_ip_addr_tx,c.olt_onu_id,c.olt_prt_id,c.olt_prt_nm,c.olt_crd_nu,c.splt_id,c.olt_prt_splt_tx,c.pop_id,c.caf_mac_addr_tx,c.iptv_stpbx_id,c.iptv_srl_nu,c.iptv_mac_addr_tx,c.iptv_upfrnt_at,c.iptv_prc_at,c.iptv_emi_ct,c.iptv_own_in,c.tp_ct,c.instl_chrg_at,c.cnctn_sts_id,c.cnctn_dt,c.pstpd_in,c.hsi_thrtd_in,c.hsi_thrtd_ts,c.hsi_crnt_prfle_tx,c.hsi_orgnl_prfle_tx,c.hsi_on_bstr_pck_in,c.hsi_on_bstr_pck_ts,c.rgd_caf_in,c.cmplt_in,c.lsd_lne_in,c.crps_mdlwr_in,c.ds_mdlwr_in,c.ds_mdlwe_sbscr_id,null as rsgn_caf_id,c.crte_usr_id,c.updte_usr_id,1 as a_in,c.d_ts,null as u_ts,current_timestamp() as i_ts
        from caf_dtl_t c join agnt_lst_t a on c.lmo_agnt_id=a.agnt_id
        where caf_id=${data.caf_id} and rsgn_caf_id is not null and trmnd_in = 1;`
    }
    else{
        var QRY_TO_EXEC = `INSERT INTO caf_dtl_t(caf_id,old_caf_id,prpd_in,cstmr_id,caf_nu,mbl_nu,adhr_nu,lat,lng,pndng_blne_at,lst_pd_dt,lst_pd_at,lst_invce_id,trmnd_in,trmnd_rqst_in,actve_in,spnd_in,blckd_in,blckd_rqst_in,dsptd_in,blble_caf_in,pstpd_inve_in,spnd_ts,rsme_ts,actvn_ts,actvn_dt,instd_ts,trmnd_ts,trmnd_dt,enty_sts_id,box_chng_sts_id,pon_chng_sts_id,caf_type_id,mso_agnt_id,lmo_agnt_id,crnt_pln_id,frqncy_id,prnt_caf_id,lg_id,aaa_cd,aghra_cd,apsf_unq_id,mdlwe_sbscr_id,instl_addr1_tx,instl_addr2_tx,instl_lcly_tx,instl_ara_tx,instl_ste_id,instl_dstrct_id,instl_mndl_id,instl_vlge_id,instl_std_cd,instl_eml1_tx,instl_lmdle1_nu,onu_stpbx_id,onu_srl_nu,onu_mac_addr_tx,onu_emi_ct,onu_upfrnt_at,onu_own_in,onu_prc_at,olt_id,olt_srl_nu,olt_ip_addr_tx,olt_onu_id,olt_prt_id,olt_prt_nm,olt_crd_nu,splt_id,olt_prt_splt_tx,pop_id,caf_mac_addr_tx,iptv_stpbx_id,iptv_srl_nu,iptv_mac_addr_tx,iptv_upfrnt_at,iptv_prc_at,iptv_emi_ct,iptv_own_in,tp_ct,instl_chrg_at,cnctn_sts_id,cnctn_dt,pstpd_in,hsi_thrtd_in,hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,hsi_on_bstr_pck_ts,rgd_caf_in,cmplt_in,lsd_lne_in,crps_mdlwr_in,ds_mdlwr_in,ds_mdlwe_sbscr_id,rsgn_caf_id,crte_usr_id,updte_usr_id,a_in,d_ts,u_ts,i_ts)
        select ${nw_caf_id} as caf_id,null as old_caf_id
        ,a.prpd_in as prpd_in,${nw_ctrmr_id} as cstmr_id, ${nw_caf_id} as caf_nu,${data.mbl_nu} as mbl_nu, ${data.adhr_nu} as adhr_nu,c.lat,c.lng,c.pndng_blne_at,c.lst_pd_dt,c.lst_pd_at,c.lst_invce_id, 0 as trmnd_in,0 as trmnd_rqst_in,c.actve_in,c.spnd_in,c.blckd_in,c.blckd_rqst_in,c.dsptd_in,c.blble_caf_in,c.pstpd_inve_in,c.spnd_ts,c.rsme_ts,current_timestamp() as actvn_ts,current_timestamp() as actvn_dt,c.instd_ts,null as trmnd_ts,null as trmnd_dt,6 as enty_sts_id,c.box_chng_sts_id,c.pon_chng_sts_id,c.caf_type_id,c.mso_agnt_id,c.lmo_agnt_id,c.crnt_pln_id,c.frqncy_id,c.prnt_caf_id,c.lg_id,c.aaa_cd,c.aghra_cd,c.apsf_unq_id,c.mdlwe_sbscr_id,'${data.dr_no}' as instl_addr1_tx,'${data.strt_nm}' as instl_addr2_tx,'${data.area}' as instl_lcly_tx,'${data.area}' as instl_ara_tx,c.instl_ste_id,${data.instl_dstrct_id} as instl_dstrct_id,${data.mndl_nu} as instl_mndl_id,${data.vlge_id} as instl_vlge_id,c.instl_std_cd,'${data.email}' as instl_eml1_tx,c.instl_lmdle1_nu,c.onu_stpbx_id,c.onu_srl_nu,c.onu_mac_addr_tx,c.onu_emi_ct,c.onu_upfrnt_at,c.onu_own_in,c.onu_prc_at,c.olt_id,c.olt_srl_nu,c.olt_ip_addr_tx,c.olt_onu_id,c.olt_prt_id,c.olt_prt_nm,c.olt_crd_nu,c.splt_id,c.olt_prt_splt_tx,c.pop_id,c.caf_mac_addr_tx,c.iptv_stpbx_id,c.iptv_srl_nu,c.iptv_mac_addr_tx,c.iptv_upfrnt_at,c.iptv_prc_at,c.iptv_emi_ct,c.iptv_own_in,c.tp_ct,c.instl_chrg_at,c.cnctn_sts_id,c.cnctn_dt,c.pstpd_in,c.hsi_thrtd_in,c.hsi_thrtd_ts,c.hsi_crnt_prfle_tx,c.hsi_orgnl_prfle_tx,c.hsi_on_bstr_pck_in,c.hsi_on_bstr_pck_ts,c.rgd_caf_in,c.cmplt_in,c.lsd_lne_in,c.crps_mdlwr_in,c.ds_mdlwr_in,c.ds_mdlwe_sbscr_id,null as rsgn_caf_id,c.crte_usr_id,c.updte_usr_id,1 as a_in,c.d_ts,null as u_ts,current_timestamp() as i_ts
        from caf_dtl_t c join agnt_lst_t a on c.lmo_agnt_id=a.agnt_id
        where caf_id=${data.caf_id} and rsgn_caf_id is not null and trmnd_in = 1;`
    }
    
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : updtcstmrdtlMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.updtcstmrdtlMdl = (data, user) => {
    var fnm = "updtcstmrdtlMdl"
    var QRY_TO_EXEC = `update cstmr_dtl_t set a_in = 0,u_ts = current_timestamp()  where cstmr_id=${data.cstmr_id};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : insnwcstmrMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.insnwcstmrMdl = (data,nw_ctrmr_id, user) => {
    var fnm = "insnwcstmrMdl"
    console.log(data.chnge_in);
    if(data.chnge_in == 0){
    var QRY_TO_EXEC = `INSERT INTO cstmr_dtl_t(cstmr_id,custu_id,caf_type_id,prnt_cstmr_id,bsns_type_id,regn_cd,dob_dt,pan_nu,tan_nu,gst_nu,adhr_nu,tle_nm,frst_nm,mdlr_nm,lst_nm,cstmr_nm,rltve_nm,gndr_id,pymnt_lblty_in,loc_addr1_tx,loc_addr2_tx,loc_lcly_tx,loc_ara_tx,loc_lctn_tx,loc_mndl_id,loc_dstrct_id,loc_vlge_id,loc_ste_id,loc_std_cd,loc_lmdle1_nu,loc_lmdle2_nu,loc_eml1_tx,loc_eml2_tx,loc_fax1_nu,loc_fax2_nu,cntct_nm,cntct_mble1_nu,cntct_mble2_nu,blng_addr1_tx,blng_addr2_tx,blng_lcly_tx,blng_ara_tx,blng_mndl_id,blng_dstrct_id,blng_ste_id,blng_vlge_id,blng_pn_cd,blng_std_cd,blng_lmdle1_nu,blng_lmdle2_nu,blng_eml1_tx,blng_eml2_tx,blng_fax1_nu,blng_fax2_nu,blng_cntct_nm,blng_cntct_mble1_nu,blng_cntct_mble2_nu,actvn_dt,frqncy_id,status,regbal,chargedbal,depbal,unbbal,nextdtlrecid,enttypelov,dctvn_dt,bld_dt,fnl_bl_dt,frst_invce_id,frst_invce_mm,frst_invce_yr,frst_invce_at,frst_de_dt,lst_invce_mm,lst_invce_yr,lst_invce_id,lst_invce_dt,lst_pymnt_id,pndng_blne_at,nxt_de_dt,nxt_invce_at,blckd_rqst_in,dsptd_in,blckd_in,trmnd_in,incrn_dt,crte_ip,updte_ip,dctvn_ts,dctvn_usr_id,dctvn_ip,enty_sts_id,agnt_id,lvl_in,entrpe_type_id,lmo_agnt_cd,mso_agnt_cd,lmo_agnt_id,mso_agnt_id,invce_addr_tx,prpd_in,prpd_wlt_at,crte_usr_id,updte_usr_id,a_in,d_ts,u_ts,i_ts)
    select ${nw_ctrmr_id} as cstmr_id,cm.custu_id,cm.caf_type_id,${nw_ctrmr_id} as prnt_cstmr_id,cm.bsns_type_id,cm.regn_cd,cm.dob_dt,cm.pan_nu,cm.tan_nu,cm.gst_nu,cm.adhr_nu,cm.tle_nm,cm.frst_nm,cm.mdlr_nm,cm.lst_nm,cm.cstmr_nm,cm.rltve_nm,cm.gndr_id,cm.pymnt_lblty_in,cm.loc_addr1_tx,cm.loc_addr2_tx,cm.loc_lcly_tx,cm.loc_ara_tx,cm.loc_lctn_tx,cm.loc_mndl_id,cm.loc_dstrct_id,cm.loc_vlge_id,cm.loc_ste_id,cm.loc_std_cd,cm.loc_lmdle1_nu,cm.loc_lmdle2_nu,'${data.email}' as loc_eml1_tx,cm.loc_eml2_tx,cm.loc_fax1_nu,cm.loc_fax2_nu,cm.cntct_nm,cm.cntct_mble1_nu,cm.cntct_mble2_nu,cm.blng_addr1_tx,cm.blng_addr2_tx,cm.blng_lcly_tx,cm.blng_ara_tx,cm.blng_mndl_id,cm.blng_dstrct_id,cm.blng_ste_id,cm.blng_vlge_id,cm.blng_pn_cd,cm.blng_std_cd,cm.blng_lmdle1_nu,cm.blng_lmdle2_nu,cm.blng_eml1_tx,cm.blng_eml2_tx,cm.blng_fax1_nu,cm.blng_fax2_nu,cm.blng_cntct_nm,cm.blng_cntct_mble1_nu,cm.blng_cntct_mble2_nu,current_timestamp() as actvn_dt,cm.frqncy_id,cm.status,cm.regbal,cm.chargedbal,cm.depbal,cm.unbbal,cm.nextdtlrecid,cm.enttypelov,cm.dctvn_dt,cm.bld_dt,cm.fnl_bl_dt,cm.frst_invce_id,cm.frst_invce_mm,cm.frst_invce_yr,cm.frst_invce_at,cm.frst_de_dt,cm.lst_invce_mm,cm.lst_invce_yr,cm.lst_invce_id,cm.lst_invce_dt,cm.lst_pymnt_id,cm.pndng_blne_at,cm.nxt_de_dt,cm.nxt_invce_at,cm.blckd_rqst_in,cm.dsptd_in,cm.blckd_in,cm.trmnd_in,cm.incrn_dt,cm.crte_ip,cm.updte_ip,cm.dctvn_ts,cm.dctvn_usr_id,cm.dctvn_ip,cm.enty_sts_id,cm.agnt_id,cm.lvl_in,cm.entrpe_type_id,cm.lmo_agnt_cd,cm.mso_agnt_cd,cm.lmo_agnt_id,cm.mso_agnt_id,cm.invce_addr_tx,cm.prpd_in,cm.prpd_wlt_at,cm.crte_usr_id,cm.updte_usr_id,1 as a_in,cm.d_ts,cm.u_ts,current_timestamp() as i_ts
    from cstmr_dtl_t cm
    join caf_dtl_t c on c.cstmr_id=cm.cstmr_id
    where c.caf_id=${data.caf_id};`
    }
    else{
        var QRY_TO_EXEC = `INSERT INTO cstmr_dtl_t(cstmr_id,custu_id,caf_type_id,prnt_cstmr_id,bsns_type_id,regn_cd,dob_dt,pan_nu,tan_nu,gst_nu,adhr_nu,tle_nm,frst_nm,mdlr_nm,lst_nm,cstmr_nm,rltve_nm,gndr_id,pymnt_lblty_in,loc_addr1_tx,loc_addr2_tx,loc_lcly_tx,loc_ara_tx,loc_lctn_tx,loc_mndl_id,loc_dstrct_id,loc_vlge_id,loc_ste_id,loc_std_cd,loc_lmdle1_nu,loc_lmdle2_nu,loc_eml1_tx,loc_eml2_tx,loc_fax1_nu,loc_fax2_nu,cntct_nm,cntct_mble1_nu,cntct_mble2_nu,blng_addr1_tx,blng_addr2_tx,blng_lcly_tx,blng_ara_tx,blng_mndl_id,blng_dstrct_id,blng_ste_id,blng_vlge_id,blng_pn_cd,blng_std_cd,blng_lmdle1_nu,blng_lmdle2_nu,blng_eml1_tx,blng_eml2_tx,blng_fax1_nu,blng_fax2_nu,blng_cntct_nm,blng_cntct_mble1_nu,blng_cntct_mble2_nu,actvn_dt,frqncy_id,status,regbal,chargedbal,depbal,unbbal,nextdtlrecid,enttypelov,dctvn_dt,bld_dt,fnl_bl_dt,frst_invce_id,frst_invce_mm,frst_invce_yr,frst_invce_at,frst_de_dt,lst_invce_mm,lst_invce_yr,lst_invce_id,lst_invce_dt,lst_pymnt_id,pndng_blne_at,nxt_de_dt,nxt_invce_at,blckd_rqst_in,dsptd_in,blckd_in,trmnd_in,incrn_dt,crte_ip,updte_ip,dctvn_ts,dctvn_usr_id,dctvn_ip,enty_sts_id,agnt_id,lvl_in,entrpe_type_id,lmo_agnt_cd,mso_agnt_cd,lmo_agnt_id,mso_agnt_id,invce_addr_tx,prpd_in,prpd_wlt_at,crte_usr_id,updte_usr_id,a_in,d_ts,u_ts,i_ts)
        select ${nw_ctrmr_id} as cstmr_id,cm.custu_id,cm.caf_type_id,${nw_ctrmr_id} as prnt_cstmr_id,cm.bsns_type_id,cm.regn_cd,cm.dob_dt,cm.pan_nu,cm.tan_nu,cm.gst_nu,${data.adhr_nu} as adhr_nu,cm.tle_nm,'${data.f_nm}' as frst_nm,cm.mdlr_nm,'${data.l_nm}' as lst_nm,'${data.f_nm} ${data.l_nm}' as cstmr_nm,cm.rltve_nm,cm.gndr_id,cm.pymnt_lblty_in,'${data.dr_no}' as loc_addr1_tx,'${data.strt_nm}' as loc_addr2_tx,'${data.area}' as loc_lcly_tx,'${data.area}' as loc_ara_tx,cm.loc_lctn_tx,${data.mndl_nu} as loc_mndl_id,${data.instl_dstrct_id} as loc_dstrct_id,${data.vlge_id} as loc_vlge_id,cm.loc_ste_id,cm.loc_std_cd,cm.loc_lmdle1_nu,cm.loc_lmdle2_nu,cm.loc_eml1_tx,cm.loc_eml2_tx,cm.loc_fax1_nu,cm.loc_fax2_nu,cm.cntct_nm,${data.mbl_nu} as cntct_mble1_nu,cm.cntct_mble2_nu,cm.blng_addr1_tx,cm.blng_addr2_tx,cm.blng_lcly_tx,cm.blng_ara_tx,cm.blng_mndl_id,cm.blng_dstrct_id,cm.blng_ste_id,cm.blng_vlge_id,cm.blng_pn_cd,cm.blng_std_cd,cm.blng_lmdle1_nu,cm.blng_lmdle2_nu,cm.blng_eml1_tx,cm.blng_eml2_tx,cm.blng_fax1_nu,cm.blng_fax2_nu,cm.blng_cntct_nm,cm.blng_cntct_mble1_nu,cm.blng_cntct_mble2_nu,current_timestamp() as actvn_dt,cm.frqncy_id,cm.status,cm.regbal,cm.chargedbal,cm.depbal,cm.unbbal,cm.nextdtlrecid,cm.enttypelov,cm.dctvn_dt,cm.bld_dt,cm.fnl_bl_dt,cm.frst_invce_id,cm.frst_invce_mm,cm.frst_invce_yr,cm.frst_invce_at,cm.frst_de_dt,cm.lst_invce_mm,cm.lst_invce_yr,cm.lst_invce_id,cm.lst_invce_dt,cm.lst_pymnt_id,cm.pndng_blne_at,cm.nxt_de_dt,cm.nxt_invce_at,cm.blckd_rqst_in,cm.dsptd_in,cm.blckd_in,cm.trmnd_in,cm.incrn_dt,cm.crte_ip,cm.updte_ip,cm.dctvn_ts,cm.dctvn_usr_id,cm.dctvn_ip,cm.enty_sts_id,cm.agnt_id,cm.lvl_in,cm.entrpe_type_id,cm.lmo_agnt_cd,cm.mso_agnt_cd,cm.lmo_agnt_id,cm.mso_agnt_id,cm.invce_addr_tx,cm.prpd_in,cm.prpd_wlt_at,cm.crte_usr_id,cm.updte_usr_id,1 as a_in,cm.d_ts,cm.u_ts,current_timestamp() as i_ts
        from cstmr_dtl_t cm
        join caf_dtl_t c on c.cstmr_id=cm.cstmr_id
        where c.caf_id=${data.caf_id};`
        }
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : updcpestkMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.updcpestkMdl = (data, user) => {
    var fnm = "updcpestkMdl"
    var QRY_TO_EXEC = `update caf_cpe_chrgs_dtl_t set a_in = 0,u_ts = current_timestamp()  where caf_id=${data.caf_id};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : inscpestkMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.inscpestkMdl = (data,nw_caf_id, user) => {
    var fnm = "inscpestkMdl"
    var QRY_TO_EXEC = `INSERT INTO caf_cpe_chrgs_dtl_t
    (caf_id, chrge_cde_id, prnt_caf_id, chrge_dt, chrge_at, tle_emi_ct, cmpld_emi_ct, emi_strt_yr, emi_strt_mm, emi_end_yr, emi_end_mm, lst_emi_yr, lst_emi_mm, lst_invce_yr, lst_invce_mm, sts_id, crte_usr_id, updte_usr_id, a_in, d_ts, u_ts, i_ts)
    select ${nw_caf_id} as caf_id, chrge_cde_id, ${nw_caf_id} as prnt_caf_id
    ,current_date() as chrge_dt,cc.chrge_at,cc.tle_emi_ct,cc.cmpld_emi_ct,year(current_date()) as emi_strt_yr,month(current_date()) as emi_strt_mm, emi_end_yr, emi_end_mm, lst_emi_yr, lst_emi_mm, lst_invce_yr, lst_invce_mm, sts_id, cc.crte_usr_id, cc.updte_usr_id, 1 as a_in, cc.d_ts, cc.u_ts,current_timestamp() as i_ts
    from caf_cpe_chrgs_dtl_t cc 
    join caf_dtl_t c on cc.caf_id=c.caf_id
    where c.caf_id=${data.caf_id};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : updpckgprchseMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.updpckgprchseMdl = (data, user) => {
    var fnm = "updpckgprchseMdl"
    var QRY_TO_EXEC = `update caf_pckge_prchse_dtl_t set a_in = 0,u_ts = current_timestamp()  where caf_id=${data.caf_id};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : inspckgprchseMdl
* Description   : Get Caf Invoice Details
* Arguments     : callback function
*
******************************************************************************/
exports.inspckgprchseMdl = (data,nw_caf_id, user) => {
    var fnm = "inspckgprchseMdl"
    var QRY_TO_EXEC = `INSERT INTO caf_pckge_prchse_dtl_t
    ( caf_id,pckge_id,srvcpk_id,efcte_dt,expry_dt,chrge_at,gst_at,srvc_at,swtch_at,ksn_at,
    entrn_at,crnt_sts_in,prpd_in,rnble_in,cycle_strt_dt,cycle_end_dt,cycle_at,lst_pymnt_ts,lst_pymnt_at,ato_rnw_in,
    updte_usr_id,sbscrptn_req_in,sbscrptn_req_ts,aprvl_usr_id,aprvl_in,aprvl_ts,cmnt_txt,dscnt_in,dscnt_ts,dscnt_srce_id,
    prvsn_srce_id,src_id,crte_usr_id,rjct_in,rjct_ts,rjct_usr_id,fst_prpd_dne_in,fst_prpd_invce_id,a_in,d_ts,u_ts, i_ts)
    select
    ${nw_caf_id} as caf_id,pckge_id,srvcpk_id,current_date() as efcte_dt,expry_dt,chrge_at,gst_at,srvc_at,swtch_at,ksn_at,entrn_at,crnt_sts_in,prpd_in,
    rnble_in,cycle_strt_dt,cycle_end_dt,cycle_at,lst_pymnt_ts,lst_pymnt_at,ato_rnw_in,updte_usr_id,sbscrptn_req_in,sbscrptn_req_ts,aprvl_usr_id,aprvl_in,aprvl_ts,cmnt_txt,dscnt_in,dscnt_ts,dscnt_srce_id,prvsn_srce_id,src_id,crte_usr_id,rjct_in,rjct_ts,rjct_usr_id,fst_prpd_dne_in,fst_prpd_invce_id,1 as a_in,d_ts,u_ts, CURRENT_TIMESTAMP as i_ts
    from caf_pckge_prchse_dtl_t
    where caf_id=${data.caf_id}
    and expry_dt>current_date();`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : getDstrictMandalNameMdl
* Description   : get Dstrict Mandal Names
* Arguments     : callback function
*
******************************************************************************/
exports.getDstrictMandalNameMdl = (vlge_id, mndl_nu,dstrct_id,cafId, user) => {
    var fnm = "getDstrictMandalNameMdl"

    var QRY_TO_EXEC =  `SELECT  (
        select mndl_nm from mndl_lst_t where mndl_nu = ${mndl_nu} and dstrt_id = ${dstrct_id}
    ) AS mndl_nm,
    (
        select dstrt_nm from dstrt_lst_t where dstrt_id = ${dstrct_id}
    ) AS dstrt_nm,
    (
        select vlge_nm from vlge_lst_t where vlge_nu = ${vlge_id} and mndl_id = ${mndl_nu} and dstrt_id = ${dstrct_id}
    ) AS vlge_nm,
    (
        select mdlwe_sbscr_id from caf_dtl_t where caf_id = ${cafId}
    ) AS mdlwe_sbscr_id,
    (
        select cs.tle_nm
        from cstmr_dtl_t as cs
        join caf_dtl_t c on c.cstmr_id = cs.cstmr_id
        where c.caf_id = ${cafId}
    ) AS tle_nm`

    // var QRY_TO_EXEC = [`select mndl_nm from mndl_lst_t where mndl_nu = ${mndl_nu} and dstrt_id = ${dstrct_id}`, `select dstrt_nm from dstrt_lst_t where dstrt_id = ${dstrct_id}`, `select vlge_nm from vlge_lst_t where vlge_nu = ${vlge_id} and mndl_id = ${mndl_nu} and dstrt_id = ${dstrct_id}`]
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    
}
/*****************************************************************************
* Function      : getcafAgraDtlsMdl
* Description   : get CAF agra details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafAgraDtlsMdl = (cafId, user) => {
    var fnm = "getcafAgraDtlsMdl"

    var QRY_TO_EXEC =  `select aghra_cd,olt_ip_addr_tx,olt_crd_nu,tp_ct,olt_onu_id from caf_dtl_t where caf_id = ${cafId}`

    // var QRY_TO_EXEC = [`select mndl_nm from mndl_lst_t where mndl_nu = ${mndl_nu} and dstrt_id = ${dstrct_id}`, `select dstrt_nm from dstrt_lst_t where dstrt_id = ${dstrct_id}`, `select vlge_nm from vlge_lst_t where vlge_nu = ${vlge_id} and mndl_id = ${mndl_nu} and dstrt_id = ${dstrct_id}`]
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    
}

/*****************************************************************************
* Function      : inskycDoccafMdl
* Description   : post caf doc details
* Arguments     : callback function
*
******************************************************************************/
exports.inskycDoccafMdl = (data,kycAttchmnt,kycBckAttchmnt,cstmrAttchmnt, nw_caf_id, nw_ctrmr_id, user) => {
    var fnm = "inskycDoccafMdl"
    var QRY_TO_EXEC = [`INSERT INTO caf_kyc_dcmnt_lst_t
    (cstmr_id,caf_id,dcmny_ctgry_id,dcmnt_url_tx,dcmnt_bck_url_tx,cstmr_img_url_tx,a_in,i_ts) VALUES (${nw_ctrmr_id},${nw_caf_id},${data.kyc_typ},'${kycAttchmnt}','${kycBckAttchmnt}','${cstmrAttchmnt}',1,current_timestamp());`, `update caf_dtl_t set kyc_doc_in = 1, kyc_doc_ts = current_timestamp(), u_ts = current_timestamp() where caf_id=${nw_caf_id};`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    
}

/*****************************************************************************
* Function       : get_kycLmoCafDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_kycLmoCafCntDtlsMdl = (user,callback) => {
    var fnm = "get_kycLmoCafCntDtlsMdl"
    var QRY_TO_EXEC = ` select 
    sum(case when kyc_doc_in = 1 then '1' else '0' end)  as 'kyc_sbmtdCnt',
    sum(case when kyc_doc_in = 0 then '1' else '0' end)  as 'kyc_ntsbmtdCnt'
    from caf_dtl_t where lmo_agnt_id = ${user.usr_ctgry_ky} and enty_sts_id not in (8,45);`;
    console.log("******************** get_kycLmoCafDtlsMdl ***************************");
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
* Function       : getcaflmoKycDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getcaflmoKycDtlsMdl = function (data, user) {
    var fnm = "getcaflmoKycDtlsMdl"

   console.log('getcaflmoKycDtlsMdl');

    console.log(data);
    let where_cnd = ` `;
    let dcmntTblCnd = ` `
    let pag_size = 20;
    let pge_nu = data.lmt_pstn * pag_size;

    console.log('-----------------------', data.upld_in)
    if (data.upld_in == 0 || data.upld_in == 1) {
        console.log('-----------------------', data.upld_in)
        if (data.upld_in == 1) {
            kycCnd = `and cf.kyc_doc_in = 1 and cf.trms_cndtn_in = 1 and cf.a_in=1`
            dcmntTblCnd = `join caf_kyc_dcmnt_lst_t as d on d.cstmr_id = cu.cstmr_id`
        } else {
            console.log('-----------------------')
            kycCnd = `and cf.kyc_doc_in=0 and cf.a_in=1`
        }
    }
    else {
        kycCnd = ``
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
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and cf.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }


    if (user.usr_ctgry_nm == 'MSO') {
        agntID = `cf.mso_agnt_id=${user.usr_ctgry_ky}`
    } else {
        agntID = `cf.lmo_agnt_id=${user.usr_ctgry_ky}`
    }


    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') AS actvnDt,cf.caf_id,cf.mdlwe_sbscr_id,DATE_FORMAT(cf.kyc_doc_ts,'%d-%m-%Y') AS kyc_doc_ts,cf.kyc_doc_in,
    cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.adhr_nu as full_adhr_nu,
	es.sts_nm,cf.caf_type_id,cf.frqncy_id,
    b.frqncy_nm,es.sts_clr_cd_tx,cf.onu_srl_nu,
    (case when cf.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
    cf.iptv_srl_nu,cu.cstmr_id,cu.cstmr_nm,cu.cstmr_nm as frst_nm,cu.loc_std_cd, cu.lst_nm,vps.phne_nu
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN blng_frqncy_lst_t as b on b.frqncy_id = cf.frqncy_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=cf.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    ${dcmntTblCnd}
    WHERE ${agntID} ${kycCnd} ${where_cnd} AND cf.enty_sts_id in (1,2,4,6,7,10,11,22,84,85,100) 
    group BY cf.caf_id ORDER BY cf.caf_id  limit ${pge_nu}, ${pag_size}`;
    console.log("____ getcaflmoKycDtlsMdl  ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : getcaflmoKycDtlsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.newgetcaflmoKycDtlsMdl = function (data, user) {
    var fnm = "newgetcaflmoKycDtlsMdl"

   console.log('getcaflmoKycDtlsMdl');

    console.log(data);
    let where_cnd = ` `;
    let dcmntTblCnd = ` `
    let pag_size = 20;
    let pge_nu = data.lmt_pstn * pag_size;

    console.log('-----------------------', data.upld_in)
    if (data.upld_in == 0 || data.upld_in == 1) {
        console.log('-----------------------', data.upld_in)
        if (data.upld_in == 1) {
            kycCnd = `and cf.kyc_doc_in = 1 and cf.trms_cndtn_in = 1 and cf.a_in=1`
            dcmntTblCnd = `join prepaid_caf_kyc_dcmnt_lst_t as d on d.cstmr_id = cu.cstmr_id`
        } else {
            console.log('-----------------------')
            kycCnd = `and cf.kyc_doc_in=0 and cf.a_in=1`
        }
    }
    else {
        kycCnd = ``
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
    else if (data.srch_type == 5) {
        if (data.srch_txt) {
            where_cnd += ` and cf.onu_srl_nu like '%${data.srch_txt}%'`
        }
    }


    if (user.usr_ctgry_nm == 'MSO') {
        agntID = `cf.mso_agnt_id=${user.usr_ctgry_ky}`
    } else {
        agntID = `cf.lmo_agnt_id=${user.usr_ctgry_ky}`
    }


    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,DATE_FORMAT(cf.actvn_dt,'%d-%m-%Y') AS actvnDt,cf.caf_id,cf.mdlwe_sbscr_id,DATE_FORMAT(cf.kyc_doc_ts,'%d-%m-%Y') AS kyc_doc_ts,cf.kyc_doc_in,
    cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.adhr_nu as full_adhr_nu,
	es.sts_nm,cf.caf_type_id,cf.frqncy_id,
    b.frqncy_nm,es.sts_clr_cd_tx,cf.onu_srl_nu,
    (case when cf.trmnd_rqst_in = 1 then 'Termination Request Initiated' ELSE NULL end) as termn_req_sts,
    cf.iptv_srl_nu,cu.cstmr_id,cu.cstmr_nm,cu.cstmr_nm as frst_nm,cu.loc_std_cd, cu.lst_nm,vps.phne_nu
    from caf_dtl_t cf
    join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id
    JOIN enty_sts_lst_t es on es.enty_sts_id = cf.enty_sts_id
    JOIN blng_frqncy_lst_t as b on b.frqncy_id = cf.frqncy_id
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=cf.caf_id
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    ${dcmntTblCnd}
    WHERE ${agntID} ${kycCnd} ${where_cnd} AND cf.enty_sts_id in (1,2,4,6,7,10,11,22,84,85,100) 
    group BY cf.caf_id ORDER BY cf.caf_id  limit ${pge_nu}, ${pag_size}`;
    console.log("____ getcaflmoKycDtlsMdl  ____\n" + QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : sbscrinskycDocLmocafMdl
* Description   : post caf doc details
* Arguments     : callback function
*
******************************************************************************/
exports.sbscrinskycDocLmocafMdl = (data,kycAttchmnt,kycBckAttchmnt,cstmrAttchmnt, user) => {
    var fnm = "sbscrinskycDocLmocafMdl"
    var QRY_TO_EXEC = [`INSERT INTO sbscr_caf_kyc_dcmnt_lst_t (cstmr_id,caf_id,dcmny_ctgry_id,dcmnt_url_tx,dcmnt_bck_url_tx,cstmr_img_url_tx,a_in,i_ts,aadhaar_num) VALUES (${data.cstmr_id},${data.caf_id},${data.kyc_typ},'${kycAttchmnt}','${kycBckAttchmnt}','${cstmrAttchmnt}',1,current_timestamp());`,
    `update caf_dtl_t set instl_addr1_tx = '${data.dr_no}', instl_addr2_tx = '${data.strt_nm}',instl_lcly_tx = '${data.area}', instl_ara_tx = '${data.area}',  mbl_nu = ${data.mbl_nu}, adhr_nu = ${data.adhr_nu},instl_eml1_tx = '${data.email}', trms_cndtn_in = 1 ,kyc_doc_in = 1, kyc_doc_ts = current_timestamp(), u_ts = current_timestamp() where caf_id=${data.caf_id};`, 
    `update cstmr_dtl_t set frst_nm ='${data.f_nm}',lst_nm ='${data.l_nm}',cstmr_nm = '${data.f_nm} ${data.l_nm}',loc_addr1_tx = '${data.dr_no}', loc_addr2_tx = '${data.strt_nm}',loc_lcly_tx = '${data.area}', loc_ara_tx = '${data.area}', cntct_mble1_nu = ${data.mbl_nu}, adhr_nu = ${data.adhr_nu},loc_eml1_tx = '${data.email}', u_ts = current_timestamp() where cstmr_id=${data.cstmr_id};`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : inskycDocLmocafMdl
* Description   : post caf doc details
* Arguments     : callback function
*
******************************************************************************/
exports.inskycDocLmocafMdl = (data,kycAttchmnt,kycBckAttchmnt,cstmrAttchmnt, user) => {
    var fnm = "inskycDocLmocafMdl"
    var QRY_TO_EXEC = [`INSERT INTO caf_kyc_dcmnt_lst_t (cstmr_id,caf_id,dcmny_ctgry_id,dcmnt_url_tx,dcmnt_bck_url_tx,cstmr_img_url_tx,a_in,i_ts) VALUES (${data.cstmr_id},${data.caf_id},${data.kyc_typ},'${kycAttchmnt}','${kycBckAttchmnt}','${cstmrAttchmnt}',1,current_timestamp());`,
     `update caf_dtl_t set instl_addr1_tx = '${data.dr_no}', instl_addr2_tx = '${data.strt_nm}',instl_lcly_tx = '${data.area}', instl_ara_tx = '${data.area}',  mbl_nu = ${data.mbl_nu}, adhr_nu = ${data.adhr_nu},instl_eml1_tx = '${data.email}', trms_cndtn_in = 1 ,kyc_doc_in = 1, kyc_doc_ts = current_timestamp(), u_ts = current_timestamp() where caf_id=${data.caf_id};`, 
     `update cstmr_dtl_t set frst_nm ='${data.f_nm}',lst_nm ='${data.l_nm}',cstmr_nm = '${data.f_nm} ${data.l_nm}',loc_addr1_tx = '${data.dr_no}', loc_addr2_tx = '${data.strt_nm}',loc_lcly_tx = '${data.area}', loc_ara_tx = '${data.area}', cntct_mble1_nu = ${data.mbl_nu}, adhr_nu = ${data.adhr_nu},loc_eml1_tx = '${data.email}', u_ts = current_timestamp() where cstmr_id=${data.cstmr_id};`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getcafolddata
* Description   : post caf doc details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafolddata = (data,user) => {
    var fnm = "getcafolddata"
var QRY_TO_EXEC = `select c.*,cs.frst_nm,cs.lst_nm from caf_dtl_t as c
            join cstmr_dtl_t as cs on cs.cstmr_id=c.cstmr_id where caf_id=${data.caf_id}`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : inskycDocLmocafMdl
* Description   : post caf doc details
* Arguments     : callback function
*
******************************************************************************/
exports.newinskycDocLmocafMdl = (data,kycAttchmnt,kycBckAttchmnt,cstmrAttchmnt, olddata, user) => {
    var fnm = "newinskycDocLmocafMdl"
var QRY_TO_EXEC = [`INSERT INTO prepaid_caf_kyc_dcmnt_lst_t (cstmr_id,first_name,last_name,caf_id,dcmny_ctgry_id,dcmnt_url_tx,dcmnt_bck_url_tx,cstmr_img_url_tx,a_in,i_ts,aadhaar_num,district,mandal,village,mbl_nu,door_nm,strt_nm,area,email,old_first_name,old_last_name,old_door_nm,old_strt_nm,old_area,old_mbl_nu,old_aadhaar_num,old_email) VALUES (${data.cstmr_id},'${data.f_nm}','${data.l_nm}',${data.caf_id},${data.kyc_typ},'${kycAttchmnt}','${kycBckAttchmnt}','${cstmrAttchmnt}',1,current_timestamp(),'${data.adhr_nu}','${data.dstrt_id}','${data.mndl_id}','${data.vlge_id}','${data.mbl_nu}','${data.dr_no}','${data.strt_nm}','${data.area}','${data.email}','${olddata.frst_nm}','${olddata.lst_nm}','${olddata.instl_addr1_tx}','${olddata.instl_addr2_tx}','${olddata.instl_lcly_tx}','${olddata.mbl_nu}','${olddata.adhr_nu}','${olddata.instl_eml1_tx}');`,
	`update caf_dtl_t set trms_cndtn_in = 1 ,kyc_doc_in = 1, kyc_doc_ts = current_timestamp(), u_ts = current_timestamp() where caf_id=${data.caf_id};`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : inskycDocLmocafMdl
* Description   : post caf doc details
* Arguments     : callback function
*
******************************************************************************/
exports.inschngkycDocLmocafMdl = (data,kycAttchmnt,kycBckAttchmnt,cstmrAttchmnt, olddata, user) => {
    var fnm = "inskycDocLmocafMdl";
    var mbl_nu ;
    var email ;
    var adhr_nu;
    var f_nm ;
    var l_nm ;
    if(data.mbl_nu != null && data.mbl_nu != undefined && data.mbl_nu != ''){
        mbl_nu = data.mbl_nu;
    } else {
        mbl_nu = olddata.mbl_nu
    }
    if(data.adhr_nu != null && data.adhr_nu != undefined && data.adhr_nu != ''){
        adhr_nu = data.adhr_nu;
    } else {
        adhr_nu = olddata.adhr_nu
    }
    if(data.email != null && data.email != undefined && data.email != ''){
        email = data.email;
    } else {
        email = olddata.instl_eml1_tx
    }
    if(data.f_nm != null && data.f_nm != undefined && data.f_nm != ''){
        f_nm = data.f_nm;
    } else {
        f_nm = olddata.frst_nm
    }
    if(data.l_nm != null && data.l_nm != undefined && data.l_nm != ''){
        l_nm = data.l_nm;
    } else {
        l_nm = olddata.lst_nm
    }
    var QRY_TO_EXEC = [`INSERT INTO caf_kyc_dcmnt_lst_t (cstmr_id,caf_id,dcmny_ctgry_id,dcmnt_url_tx,dcmnt_bck_url_tx,cstmr_img_url_tx,a_in,i_ts) VALUES (${data.cstmr_id},${data.caf_id},${data.kyc_typ},'${kycAttchmnt}','${kycBckAttchmnt}','${cstmrAttchmnt}',1,current_timestamp());`,
     `update caf_dtl_t set instl_addr1_tx = '${data.dr_no}', instl_addr2_tx = '${data.strt_nm}',instl_lcly_tx = '${data.area}', instl_ara_tx = '${data.area}',  mbl_nu = ${mbl_nu}, adhr_nu = ${adhr_nu},instl_eml1_tx = '${email}', trms_cndtn_in = 1 ,kyc_doc_in = 1, kyc_doc_ts = current_timestamp(), u_ts = current_timestamp() where caf_id=${data.caf_id};`, 
     `update cstmr_dtl_t set frst_nm ='${f_nm}',lst_nm ='${l_nm}',cstmr_nm = '${f_nm} ${l_nm}',loc_addr1_tx = '${data.dr_no}', loc_addr2_tx = '${data.strt_nm}',loc_lcly_tx = '${data.area}', loc_ara_tx = '${data.area}', cntct_mble1_nu = ${mbl_nu}, adhr_nu = ${adhr_nu},loc_eml1_tx = '${email}', u_ts = current_timestamp() where cstmr_id=${data.cstmr_id};`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insSelfkycDocLmocafMdl
* Description   : post Self kyc doc details
* Arguments     : callback function
*
******************************************************************************/
exports.insSelfkycDocLmocafMdl = (data,kycAttchmnt,kycBckAttchmnt,cstmrAttchmnt, user) => {
    var fnm = "insSelfkycDocLmocafMdl"
    var QRY_TO_EXEC = [`INSERT INTO agnt_kyc_dcmnt_lst_t (agnt_id,dcmny_ctgry_id,dcmnt_url_tx,dcmnt_bck_url_tx,img_url_tx,a_in,i_ts) VALUES (${data.agnt_id},${data.kyc_typ},'${kycAttchmnt}','${kycBckAttchmnt}','${cstmrAttchmnt}',1,current_timestamp());`,
    `update agnt_lst_t set ofce_mbl_nu = ${data.mbl_nu}, adhr_nu = ${data.adhr_nu},ofce_eml_tx = '${data.email}', kyc_doc_in = 1, kyc_doc_ts = current_timestamp(), pan_nu = '${data.pan_nu}',bank_acnt_nu = '${data.bnk_acnt_nu}',bank_acnt_nm = '${data.bnk_acnt_nm}',ifsc_nu = '${data.bnk_ifsc_nm}',gst_nu = '${data.gst_nu}',gpay_upi =  '${data.gpay_upi}',phnePay_upi = '${data.phnpay_upi}', ofce_addr1_tx = '${data.dr_no}',ofce_addr2_tx = '${data.strt_nm}', ofce_lclty_nm= '${data.area}', ofce_pn_cd =  '${data.pincode}', u_ts = current_timestamp() where agnt_id=${data.agnt_id};`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insSelfkycDocLmocafMdl
* Description   : post Self kyc doc details
* Arguments     : callback function
*
******************************************************************************/
exports.newinsSelfkycDocLmocafMdl = (data,kycAttchmnt,kycBckAttchmnt,cstmrAttchmnt,cancelchqCstmrAttchmnt,incorparationCstmrAttchmnt,panCstmrAttchmnt,idproofCstmrAttchmnt, user) => {
   var fnm = "newinsSelfkycDocLmocafMdl"
    if(data.email == '' || data.email == undefined || data.email == null ){
        var emailt='N/A';
    }else{
        var emailt=data.email;
    }
    if(data.strt_nm == '' || data.strt_nm == undefined  || data.strt_nm == null ){
        var strtnm='N/A';
    }else {
        var strtnm=data.strt_nm;
    }
    if(data.gpay_upi == '' || data.gpay_upi == undefined || data.gpay_upi == null ){
        var gpay='N/A';
    }else{
        var gpay=data.gpay_upi ;
    }
    if(data.phnpay_upi == '' || data.phnpay_upi == undefined || data.phnpay_upi == null ){
        var phnepay='N/A';
    }else{
        var phnepay=data.phnpay_upi;
    }
    if(data.gst_nu == '' || data.gst_nu == undefined || data.gst_nu == null ){
        var gst='N/A';
    }else{
        var gst=data.gst_nu ;
    }
	if(data.incorp_nm == '' || data.incorp_nm == undefined || data.incorp_nm == null ){
        var incrpnum='N/A';
    }else{
        var incrpnum=data.incorp_nm ;
    }
    var QRY_TO_EXEC = [`INSERT INTO prepaid_agnt_kyc_dcmnt_lst_t (agnt_id,first_name,last_name,dcmny_ctgry_id,dcmnt_url_tx,dcmnt_bck_url_tx,img_url_tx,dcmnt_pan,dcmnt_id_proof,dcmnt_canceled_cheque,dcmnt_incorparation_certificate,adhr_nu,bank_acnt_nu,mbl_nu,gst_nu,email_tx,pan_nu,bank_acnt_nm,ifsc_nu,incorparation_num,gpay_id,phne_id,door_nm,street,locality,district,mandal,village,pincode,a_in,i_ts) VALUES ('${data.agnt_id}','${data.f_nm}','${data.l_nm}','${data.kyc_typ}','${kycAttchmnt}','${kycBckAttchmnt}','${cstmrAttchmnt}','${panCstmrAttchmnt}','${idproofCstmrAttchmnt}','${cancelchqCstmrAttchmnt}','${incorparationCstmrAttchmnt}','${data.adhr_nu}','${data.bnk_acnt_nu}','${data.mbl_nu}','${gst}','${emailt}','${data.pan_nu}','${data.bnk_acnt_nm}','${data.bnk_ifsc_nm}','${incrpnum}','${gpay}','${phnepay}','${data.dr_no}','${strtnm}','${data.area}','${data.dstrt_id}','${data.mndl_id}','${data.vlge_id}','${data.pincode}',1,current_timestamp());`,
		`update agnt_lst_t set  kyc_doc_in = 1, kyc_doc_ts = current_timestamp(), u_ts = current_timestamp() where agnt_id=${data.agnt_id};`]
    console.log(QRY_TO_EXEC)
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function       : getDuepay_prpdCafsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getDuepay_prpdCafsMdl = function (data, user) {
    var fnm = "getDuepay_prpdCafsMdl"

    console.log('getDuepay_prpdCafsMdl');
 
     console.log(data);
     let where_cnd = ` `;
     let pag_size = 20;
     let pge_nu = data.lmt_pstn * pag_size;
     console.log('-----------------------', data.pd_in)
    //  if (data.pd_in == 0 || data.pd_in == 1) {
    //      console.log('-----------------------', data.pd_in)
    //      if (data.pd_in == 1) {
    //          kycCnd = `and cf.kyc_doc_in=1 and cf.a_in=1`
    //      } else {
    //          console.log('-----------------------')
    //          kycCnd = `and cf.kyc_doc_in=0 and cf.a_in=1`
    //      }
    //  }
    //  else {
    //      kycCnd = ``
    //  }
 
     if (data.srch_type == 1) {
         if (data.srch_txt) {
             where_cnd += ` and c.caf_id like '%${data.srch_txt}%'`
         }
     }
     else if (data.srch_type == 2) {
         if (data.srch_txt) {
             where_cnd += ` and c.adhr_nu like '%${data.srch_txt}%'`
         }
     }
     else if (data.srch_type == 3) {
         if (data.srch_txt) {
             where_cnd += ` and c.mbl_nu like '%${data.srch_txt}%'`
         }
     }
     else if (data.srch_type == 4) {
         if (data.srch_txt) {
             where_cnd += ` and cm.cstmr_nm like '%${data.srch_txt}%'`
         }
     }
     else if (data.srch_type == 5) {
         if (data.srch_txt) {
             where_cnd += ` and c.onu_srl_nu like '%${data.srch_txt}%'`
         }
     }
 
 
     if (user.usr_ctgry_nm == 'MSO') {
        //  agntID = `c.mso_agnt_id=${user.usr_ctgry_ky}`
        agntID = `c.mso_agnt_id=10689`
     } else {
        //  agntID = `c.lmo_agnt_id=${user.usr_ctgry_ky}`
        agntID = `c.lmo_agnt_id in (3333,10689)`
     }
 
 
     var QRY_TO_EXEC = `select cp.pckge_id,p.pckge_nm ,cp.caf_id,c.mbl_nu,c.cstmr_id,cm.cstmr_nm,cm.frst_nm,cm.lst_nm,c.caf_type_id,c.mdlwe_sbscr_id,DATEDIFF(MAX((CASE WHEN c.crnt_pln_id=cp.pckge_id THEN cp.expry_dt ELSE CURRENT_DATE() END)),current_date()) as dys_to_pay
     ,DATE_FORMAT(MAX((CASE WHEN c.crnt_pln_id=cp.pckge_id THEN cp.expry_dt ELSE date('1999-12-31') END)) ,'%d-%m-%Y') as expry_dt
     ,SUM(CASE WHEN c.crnt_pln_id=cp.pckge_id THEN 0 ELSE 1 END) as add_on_ct
     ,cp.crnt_sts_in,sum(cp.cycle_at) as cycle_at,sum((CASE WHEN c.crnt_pln_id=cp.pckge_id THEN cpe.chrge_at ELSE 0 END)) as bx_chrge_at
     from caf_dtl_t c
     JOIN caf_pckge_prchse_dtl_t cp on c.caf_id =cp.caf_id
     join pckge_lst_t p on p.pckge_id =c.crnt_pln_id
     JOIN caf_cpe_chrgs_dtl_t cpe on cpe.caf_id=c.caf_id
     JOIN cstmr_dtl_t cm on c.cstmr_id =cm.cstmr_id
     where cpe.tle_emi_ct-cpe.cmpld_emi_ct>0
     ANd c.enty_sts_id IN (6,7,84,85,2)
     AND c.prpd_in=1 and cp.prpd_in=1
     AND cp.expry_dt >CURRENT_DATE() AND c.caf_type_id =1 ANd cp.crnt_sts_in =1
     AND ${agntID} ${where_cnd}
     group by cp.caf_id
     having DATEDIFF(MAX((CASE WHEN c.crnt_pln_id=cp.pckge_id THEN cp.expry_dt ELSE CURRENT_DATE() END)),current_date())< ${data.dayCnt}
     limit ${pge_nu}, ${pag_size}`;
     console.log("____ getDuepay_prpdCafsMdl  ____\n" + QRY_TO_EXEC);
     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
 
 }

/*****************************************************************************
* Function       : getprpdCafInvcsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getprpdCafInvcsMdl = function (id, user) {
    var fnm = "getprpdCafInvcsMdl"

 var QRY_TO_EXEC = `select ccde.chrge_cd,ccde.chrge_cde_id,COALESCE(rs.APSFL_PCT,100) as APSFL_PCT,COALESCE(rs.MSO_PCT,0) as MSO_PCT,COALESCE(rs.LMO_PCT,0) as LMO_PCT,group_concat(cs.cre_srvce_cd) as cre_srvce_cd,cp.pckge_id,p.pckge_nm,p.pckge_type_id as pckge_type_id,pt.pckage_type_nm as pckge_type_nm
 ,CASE WHEN pt.pckge_type_id=1 THEN 0 ELSE 1 END as entble_in
 ,cp.caf_id,cp.expry_dt,cp.crnt_sts_in,cp.efcte_dt,cp.cycle_at,cp.cycle_strt_dt,cp.cycle_end_dt,(CASE WHEN c.crnt_pln_id=cp.pckge_id THEN cpe.chrge_at ELSE 0 END) as bx_chrge_at
 from caf_dtl_t c
 JOIN caf_pckge_prchse_dtl_t cp on c.caf_id =cp.caf_id
 join pckge_lst_t p on p.pckge_id =cp.pckge_id
 JOIN caf_cpe_chrgs_dtl_t cpe on cpe.caf_id=c.caf_id
 JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id
 JOIN pckge_srvcpk_rel_t srp on srp.pckge_id =p.pckge_id
 JOIN pckge_srvcpk_lst_t s on srp.srvcpk_id =s.srvcpk_id
 JOIN cre_srvce_lst_t cs on s.cre_srvce_id =cs.cre_srvce_id
 JOIN chrge_cde_lst_t ccde on ccde.chrge_cd='SRVCRENT'
 LEFT JOIN BSS_ONLINE_U.rvne_shrng_v rs on rs.agnt_id=c.lmo_agnt_id AND rs.pckge_id=p.pckge_id
 where cpe.tle_emi_ct-cpe.cmpld_emi_ct>0
 AND c.prpd_in=1 and cp.prpd_in=1
 AND c.lmo_agnt_id=10689
 AND c.caf_id =${id}
 group by p.pckge_id
 union
 select ccde.chrge_cd,ccde.chrge_cde_id,100 as APSFL_PCT,0 as MSO_PCT,0 as LMO_PCT,null as cre_srvce_cd,null as pckge_id,null as pckge_nm,null as pckge_type_id,null as pckge_type_nm
 ,0 as entble_in
 ,c.caf_id,null as expry_dt,null as crnt_sts_in,null as efcte_dt,cpe.chrge_at as cycle_at,null as cycle_strt_dt,null as cycle_end_dt,cpe.chrge_at as bx_chrge_at
 from caf_dtl_t c
 JOIN caf_cpe_chrgs_dtl_t cpe on cpe.caf_id=c.caf_id
 JOIN chrge_cde_lst_t ccde on ccde.chrge_cd='CPEEMI'
 where cpe.tle_emi_ct-cpe.cmpld_emi_ct>0
 AND c.prpd_in=1
 AND c.lmo_agnt_id=10689
 AND c.caf_id =${id}
 order by pckge_type_nm desc,cycle_at desc`;
 console.log("____ getprpfInvcCafsMdl  ____\n" + QRY_TO_EXEC);
 return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
 
/*****************************************************************************
* Function       : get_agntkyctypesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_agntkyctypesMdl = (user,callback) => {
    var fnm = "get_agntkyctypesMdl"
    var QRY_TO_EXEC = ` SELECT *
                        FROM agnt_kyc_dcmnt_ctgry_lst_t  
                        WHERE a_in = 1 
                        ORDER BY dcmny_ctgry_id; `;
    console.log("******************** get_agntkyctypesMdl ***************************");
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
* Function      : insrtusrMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.get_cafblkdtlMdl = (data, user, callback) => {
    var fnm = "get_cafblkdtlMdl"

    var QRY_TO_EXEC = `SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno, 'Profile' as 'Profile',
    cu.cstmr_nm,cu.lst_nm,cu.cntct_mble1_nu,a.agnt_cd as lmo_cd,mdlwe_sbscr_id,p.pckge_id,hsi_orgnl_prfle_tx,hsi_orgnl_prfle_tx,
    cf.caf_id,d.dstrt_nm ,bfl.frqncy_nm,caf_nu,caf_mac_addr_tx,mbl_nu,REPLACE(cu.adhr_nu,SUBSTR(cu.adhr_nu,1,8),'XXXXXXXX') as cstmr_adhr_nu,cu.actvn_dt,
    cu.agnt_id,cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,
    cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.lat,cf.lng,cf.pndng_blne_at,cf.lst_pd_dt,cf.lst_pd_at,cf.lst_invce_id,cf.trmnd_in,cf.trmnd_rqst_in,cf.actve_in,cf.spnd_in,
    cf.blckd_in,cf.blckd_rqst_in,cf.dsptd_in,cf.blble_caf_in,cf.pstpd_inve_in,cf.spnd_ts,cf.rsme_ts,cf.actvn_ts,cf.actvn_dt,cf.instd_ts,cf.trmnd_ts,cf.trmnd_dt,cf.enty_sts_id,
    cf.caf_type_id,cf.mso_agnt_id,cf.lmo_agnt_id,cf.crnt_pln_id,pckge_nm,cf.frqncy_id,cf.prnt_caf_id,cf.lg_id,cf.aaa_cd,cf.aghra_cd,cf.apsf_unq_id,cf.mdlwe_sbscr_id,cf.cstmr_id,
    cf.instl_addr1_tx,cf.instl_addr2_tx,cf.instl_lcly_tx,cf.instl_ara_tx,cf.instl_ste_id,cf.instl_dstrct_id,cf.instl_mndl_id,cf.instl_vlge_id,cf.instl_std_cd,cf.instl_eml1_tx,
    cf.instl_lmdle1_nu,cf.onu_stpbx_id,cf.onu_srl_nu,cf.onu_mac_addr_tx,cf.onu_emi_ct,cf.onu_upfrnt_at,cf.onu_own_in,cf.onu_prc_at,cf.olt_id,cf.olt_srl_nu,cf.olt_ip_addr_tx,
    cf.olt_onu_id,cf.olt_prt_id,cf.olt_prt_nm,cf.olt_crd_nu,cf.splt_id,cf.olt_prt_splt_tx,cf.pop_id,cf.caf_mac_addr_tx,cf.iptv_stpbx_id,cf.iptv_srl_nu,
    cf.iptv_mac_addr_tx,cf.iptv_upfrnt_at,cf.iptv_prc_at,cf.iptv_emi_ct,cf.iptv_own_in,cf.tp_ct,cf.instl_chrg_at,cf.cnctn_sts_id,cf.cnctn_dt,cf.pstpd_in,cf.rgd_caf_in
    ,DATE_FORMAT(cf.actvn_dt ,'%d-%m-%Y') as actvn_dt
    ,DATE_FORMAT(cf.trmnd_dt,'%d-%m-%Y') as trmnd_dt,
    DATE_FORMAT(date(cf.spnd_ts),'%d-%m-%Y') as spnd_dt,
    DATE_FORMAT(date(cf.rsme_ts),'%d-%m-%Y') as rsme_dt,
    cs.sts_nm,ec.entrpe_type_nm,
    DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts
    from caf_dtl_t cf
    left join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id and cu.a_in=1
    LEFT JOIN entrpe_cstmr_typ_lst_t as ec on cu.entrpe_type_id = ec.entrpe_type_id
    left join agnt_lst_t as a on  a.agnt_id=cf.lmo_agnt_id
    left JOIN blng_frqncy_lst_t bfl on bfl.frqncy_id = cf.frqncy_id
    JOIN enty_sts_lst_t cs on cs.enty_sts_id = cf.enty_sts_id
    JOIN dstrt_lst_t d on cf.instl_dstrct_id =d.dstrt_id
    JOIN pckge_lst_t p ON cf.crnt_pln_id = p.pckge_id
    where 1 = 1  and cf.caf_id in (${data[0].caf_id})  AND cf.trmnd_in=0  `;
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
* Function      : get_cafdtlsfrImsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 12/10/2021    -  ramesh  - Initial Function
*
******************************************************************************/
exports.get_cafdtlsfrImsMdl = (data, user, callback) => {
    var fnm = "get_cafdtlsfrImsMdl"
    var where = "1 = 1 "
	console.log("get_cafdtlMdl data", data);
    if (data.dstrc_id) {
        where += ` and cf.instl_dstrct_id=${data.dstrc_id} `
    }
    if (data.mso_nm) {
        where += ` and cf.mso_agnt_id='${data.mso_nm}'`
    }
    if (data.agntId) {
        where += ` and cf.lmo_agnt_id=${data.agntId}`
    }
    if (data.mobileno) {
        where += ` and cf.mbl_nu=${data.mobileno} `
    }
    if (data.CAf) {
        where += ` and cf.caf_nu=${data.CAf} `
    } if (data.adhar) {
        where += ` and cf.adhr_nu=${data.adhar} `
    } if (data.str_dt && data.end_dt) {
        where += ` and (cf.actvn_dt BETWEEN '${data.str_dt}' AND '${data.end_dt}') `
    } else if (data.str_dt) {
        where += `and cf.actvn_dt='${data.str_dt}' `
    } if (data.till_dt) {
        where += ` and cf.actvn_dt<CURDATE()`
    }
    if (data.Caf_type) {
        where += ` and cf.caf_type_id=${data.Caf_type} `
    } if (data.mndl_id) {
        where += `and cf.instl_mndl_id=${data.mndl_id} `
    } if (data.Caf_sts) {
        where += ` and cf.enty_sts_id=${data.Caf_sts} `
    } if (data.org_nm) {
        where += ` and cf.frst_nm='${data.org_nm}'`
    } if (data.iptv) {
        where += ` and cf.iptv_srl_nu='${data.iptv}'`
    } if (data.onu) {
        where += ` and cf.onu_srl_nu='${data.onu}'`
    } if (data.trmnd_cond == true) {
        where += ` AND cf.trmnd_in=0  `
    }
    var QRY_TO_EXEC = ` SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno, 'Profile' as 'Profile',
                        cu.cstmr_nm,cu.lst_nm,cu.cntct_mble1_nu,a.agnt_cd as lmo_cd,mdlwe_sbscr_id,p.pckge_id,hsi_orgnl_prfle_tx,hsi_orgnl_prfle_tx,
                        cf.caf_id,d.dstrt_nm , mn.mndl_nm,vl.vlge_nm, bfl.frqncy_nm,caf_nu,caf_mac_addr_tx,mbl_nu,REPLACE(cu.adhr_nu,SUBSTR(cu.adhr_nu,1,8),'XXXXXXXX') as cstmr_adhr_nu,cu.actvn_dt,
                        cu.agnt_id,cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,
                        cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.lat,cf.lng,cf.pndng_blne_at,cf.lst_pd_dt,cf.lst_pd_at,cf.lst_invce_id,cf.trmnd_in,cf.trmnd_rqst_in,cf.actve_in,cf.spnd_in,
                        cf.blckd_in,cf.blckd_rqst_in,cf.dsptd_in,cf.blble_caf_in,cf.pstpd_inve_in,cf.spnd_ts,cf.rsme_ts,cf.actvn_ts,cf.actvn_dt,cf.instd_ts,cf.trmnd_ts,cf.trmnd_dt,cf.enty_sts_id,
                        cf.caf_type_id,cf.mso_agnt_id,cf.lmo_agnt_id,cf.crnt_pln_id,pckge_nm,cf.frqncy_id,cf.prnt_caf_id,cf.lg_id,cf.aaa_cd,cf.aghra_cd,cf.apsf_unq_id,cf.mdlwe_sbscr_id,cf.cstmr_id,
                        cf.instl_addr1_tx,cf.instl_addr2_tx,cf.instl_lcly_tx,cf.instl_ara_tx,cf.instl_ste_id,cf.instl_dstrct_id,cf.instl_mndl_id,cf.instl_vlge_id,cf.instl_std_cd,cf.instl_eml1_tx,
                        cf.instl_lmdle1_nu,cf.onu_stpbx_id,cf.onu_srl_nu,cf.onu_mac_addr_tx,cf.onu_emi_ct,cf.onu_upfrnt_at,cf.onu_own_in,cf.onu_prc_at,cf.olt_id,cf.olt_srl_nu,cf.olt_ip_addr_tx,
                        cf.olt_onu_id,cf.olt_prt_id,cf.olt_prt_nm,cf.olt_crd_nu,cf.splt_id,cf.olt_prt_splt_tx,cf.pop_id,cf.caf_mac_addr_tx,cf.iptv_stpbx_id,cf.iptv_srl_nu,
                        cf.iptv_mac_addr_tx,cf.iptv_upfrnt_at,cf.iptv_prc_at,cf.iptv_emi_ct,cf.iptv_own_in,cf.tp_ct,cf.instl_chrg_at,cf.cnctn_sts_id,cf.cnctn_dt,cf.pstpd_in,cf.rgd_caf_in
                        ,DATE_FORMAT(cf.actvn_dt ,'%d-%m-%Y') as actvn_dt
						,DATE_FORMAT(cf.actvn_ts ,'%d-%m-%Y') as actvn_dts
                        ,DATE_FORMAT(cf.trmnd_dt,'%d-%m-%Y') as trmnd_dt,
                        DATE_FORMAT(date(cf.spnd_ts),'%d-%m-%Y') as spnd_dt,
                        DATE_FORMAT(date(cf.rsme_ts),'%d-%m-%Y') as rsme_dt,
                        cs.sts_nm,ec.entrpe_type_nm,
                        DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts
                        from caf_dtl_t cf 
                        join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id and cu.a_in=1
                        LEFT JOIN entrpe_cstmr_typ_lst_t as ec on cu.entrpe_type_id = ec.entrpe_type_id
                        join agnt_lst_t as a on  a.agnt_id=cf.lmo_agnt_id
                        JOIN blng_frqncy_lst_t bfl on bfl.frqncy_id = cf.frqncy_id
                        JOIN enty_sts_lst_t cs on cs.enty_sts_id = cf.enty_sts_id
                        JOIN dstrt_lst_t d on cf.instl_dstrct_id =d.dstrt_id 
                        join mndl_lst_t mn on (mn.mndl_nu = cf.instl_mndl_id or mn.mndl_id = cf.instl_mndl_id) and mn.dstrt_id = cf.instl_dstrct_id
                        join vlge_lst_t vl on (vl.vlge_nu = cf.instl_vlge_id or vl.vlge_id = cf.instl_vlge_id) and vl.mndl_id = cf.instl_mndl_id and vl.dstrt_id=cf.instl_dstrct_id
                        JOIN pckge_lst_t p ON cf.crnt_pln_id = p.pckge_id
                        where ${where} and p.pckge_id not in ('80') and cf.actve_in=1`;
    console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : get_cafdtlscmplntsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 18/11/2021    -  Ramesh  - Initial Function
*
******************************************************************************/
exports.get_cafdtlscmplntsMdl = (data, user, callback) => { 
    var fnm = "get_cafdtlscmplntsMdl"
	console.log("get_cafdtlscmplntsMdl data", data);
    
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
	DATE_FORMAT(date(c.actvn_dt),'%d-%m-%Y') as actvn_dts,
    DATE_FORMAT(date(c.rsme_ts),'%d-%m-%Y') as rsme_dts,
    DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts,c.tp_ct,c.olt_onu_id
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
    left join voip_caf_phne_nmbrs_rel_t as vp on vp.caf_id=c.caf_id and vp.a_in = 1
    left join voip_phne_nmbrs_lst_t as vps on vps.phne_nmbr_id=vp.phne_nmbr_id
    left JOIN pckge_lst_t as pl on pl.pckge_id = c.crnt_pln_id
    left JOIN blng_frqncy_lst_t as fr on fr.frqncy_id = cst.frqncy_id
    left JOIN agnt_lst_t as alt on alt.agnt_id = c.lmo_agnt_id
    left join olt_ltrck_dtl_t ol on c.olt_id =ol.olt_id
    left JOIN agro_olt_oprtnl_ste_lst_t oste on ol.oprtnl_ste_id =oste.agro_oprtnl_ste_id
    left JOIN agro_olt_sts_lst_t ast on ast.agro_sts_id =ol.olt_sts_id
    LEFT JOIN cntct_lst_t cnt ON c.instl_dstrct_id = cnt.dstrct_id AND cnt.cntct_ctgry_id=1
    LEFT JOIN cntct_lst_t cntt ON c.instl_dstrct_id = cntt.dstrct_id AND cntt.cntct_ctgry_id=2
    where (c.caf_id='${data.caf_id}' OR c.onu_srl_nu='${data.caf_id}' OR c.iptv_srl_nu='${data.caf_id}' ) AND c.a_in= 1
    GROUP BY c.caf_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getcafaddoninvceDtlsMdl
* Description   : Get Caf Invoice Charges Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafaddoninvceDtlsMdl = (id, user) => {
    var fnm = "getcafaddoninvceDtlsMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY id.caf_invce_id desc) as s_no,id.caf_invce_id,id.invce_yr,id.invce_mm,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
    ,format(id.chrge_at,2) as chrge_at,format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
    ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at
    from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
    LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
    LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
    where id.caf_id=${id} and p.pckge_type_id=2
    group by id.caf_invce_id
    order by id.i_ts desc ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function      : getcafaddonsInvoiceChargesDtlsMdl
* Description   : Get Caf Invoice Charges Details
* Arguments     : callback function
*
******************************************************************************/
exports.getcafaddonsInvoiceChargesDtlsMdl = (id, user) => {
    var fnm = "getcafaddonsInvoiceChargesDtlsMdl"
    console.log(' ---------------------------------------------- getcafaddonsInvoiceChargesDtlsMdl', id)
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY p.pckge_id desc,id.invce_dtl_id) as s_no,p.pckge_nm,pt.pckage_type_nm,cc.chrge_cde_dscn_tx,cc.chrge_cd 
                        ,format(id.chrge_at,2) as chrge_at,format(cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tax_at
                        ,format(id.chrge_at+cgst_at+sgst_at+srvc_at+swtch_at+ksn_at+entrn_at,2) as tl_at
                        from erp_invce_dtl_t id JOIN chrge_cde_lst_t as cc on cc.chrge_cde_id = id.chrge_cde_id
                        LEFT JOIN pckge_lst_t p on p.pckge_id =id.pckge_id 
                        LEFT JOIN pckge_type_lst_t pt on p.pckge_type_id =pt.pckge_type_id 
                        where id.caf_invce_id=${id} and p.pckge_type_id=2
                        order by p.pckge_id desc ,id.invce_dtl_id ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/*****************************************************************************
* Function       : agentaadharchckMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.checkadhrfrselflmomdl = function (data, user) {
    var fnm= "checkadhrfrselflmomdl"
    var QRY_TO_EXEC = `select count(p.adhr_nu) as caf_cnt,p.*,a.agnt_cd from prepaid_agnt_kyc_dcmnt_lst_t as p
	join agnt_lst_t as a on a.agnt_id=p.agnt_id where p.agnt_id=${user.usr_ctgry_ky}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm); 
}

/*****************************************************************************
* Function       : cafaadharchckMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.checkadhrfrcafmdl = function (id, user) {
    var fnm = "checkadhrfrcafmdl"
    var fnm = "checkadhrfrcafmdl"
    var QRY_TO_EXEC = `select count(p.aadhaar_num) as caf_cnt,p.* from prepaid_caf_kyc_dcmnt_lst_t as p where p.aadhaar_num=${id.adhr_nu}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm); 
}

/*****************************************************************************
* Function      : getdtcountfrcmplntsMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 18/11/2021    -  Ramesh  - Initial Function
*
******************************************************************************/
exports.getdtcountfrcmplntsMdl = (data, user, callback) => { 
    var fnm = "getdtcountfrcmplntsMdl"
	console.log("getdtcountfrcmplntsMdl data", data);
    
    var QRY_TO_EXEC = `select count(*) as count,p.comp_ticketno from prepaid_create_complaint as p
    join caf_dtl_t as c on c.caf_id=p.caf_id
    where (c.caf_id='${data.caf_id}' OR c.onu_srl_nu='${data.caf_id}' OR c.iptv_srl_nu='${data.caf_id}') and comp_status=1`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getbbnlcafdtlMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getbbnlcafdtlMdl = (data, user, callback) => {
    var fnm = "getbbnlcafdtlMdl"
    //var where = "1 = 1 ";
    var where =` `;

    if (data.dstrc_id) {
        where += ` and cf.instl_dstrct_id=${data.dstrc_id} `
    }
    if (data.mso_id) {
        where += ` and cf.mso_agnt_id=${data.mso_id}`
    }
    if (data.agntId) {
        where += ` and cf.lmo_agnt_id=${data.agntId}`
    }
    if (data.mobileno) {
        where += ` and cf.mbl_nu=${data.mobileno} `
    }
    if (data.CAf) {
        where += ` and cf.caf_nu=${data.CAf} `
    } if (data.adhar) {
        where += ` and cf.adhr_nu=${data.adhar} `
    } if (data.str_dt && data.end_dt) {
        where += ` and (cf.actvn_dt BETWEEN '${data.str_dt}' AND '${data.end_dt}') `
    } else if (data.str_dt) {
        where += `and cf.actvn_dt='${data.str_dt}' `
    } if (data.till_dt) {
        where += ` and cf.actvn_dt<CURDATE()`
    }
    if (data.Caf_type) {
        where += ` and cf.caf_type_id=${data.Caf_type} `
    } if (data.mndl_id) {
        where += `and cf.instl_mndl_id=${data.mndl_id} `
    } if (data.Caf_sts) {
        where += ` and cf.enty_sts_id=${data.Caf_sts} `
    } if (data.org_nm) {
        where += ` and cf.frst_nm='${data.org_nm}'`
    } if (data.iptv) {
        where += ` and cf.iptv_srl_nu='${data.iptv}'`
    } if (data.onu) {
        where += ` and cf.onu_srl_nu='${data.onu}'`
    } if (data.trmnd_cond == true) {
        where += ` AND cf.trmnd_in=0  `
    }
	if (data.apsfl_bbnl) {
        where += ` and cf.apsfl_bbnl=${data.apsfl_bbnl} `
    }
	 if (data.apsfl_bbnl) {
        where += ` and cf.apsfl_bbnl=${data.apsfl_bbnl} `
    }
    var QRY_TO_EXEC = ` SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,cf.gp_code,dl.dprmnt_nm as 'ent_dept_nm',cf.orgnsn_code as 'orgnsn_cd','BBNL-GOI' as 'prjct_nm',ROUND(ttl_dwnld_ct/1024/1024/1024,2) AS TD,
                        ROUND(ttl_upld_ct/1024/1024/1024,2) AS TU,ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as total,ct.caf_type_nm, o.olt_nm,'Profile' as 'Profile',
                        cu.cstmr_nm,cu.lst_nm,cu.cntct_mble1_nu,a.agnt_cd as lmo_cd,mdlwe_sbscr_id,p.pckge_id,hsi_orgnl_prfle_tx,hsi_orgnl_prfle_tx,
                        cf.caf_id,d.dstrt_nm ,vl.vlge_nm,mn.mndl_nm,bfl.frqncy_nm,caf_nu,caf_mac_addr_tx,mbl_nu,REPLACE(cu.adhr_nu,SUBSTR(cu.adhr_nu,1,8),'XXXXXXXX') as cstmr_adhr_nu,cu.actvn_dt,
                        cu.agnt_id,cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,
                        cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.lat,cf.lng,cf.pndng_blne_at,cf.lst_pd_dt,cf.lst_pd_at,cf.lst_invce_id,cf.trmnd_in,cf.trmnd_rqst_in,cf.actve_in,cf.spnd_in,
                        cf.blckd_in,cf.blckd_rqst_in,cf.dsptd_in,cf.blble_caf_in,cf.pstpd_inve_in,cf.spnd_ts,cf.rsme_ts,cf.actvn_ts,cf.actvn_dt,cf.instd_ts,cf.trmnd_ts,cf.trmnd_dt,cf.enty_sts_id,
                        cf.caf_type_id,cf.mso_agnt_id,cf.lmo_agnt_id,cf.crnt_pln_id,pckge_nm,cf.frqncy_id,cf.prnt_caf_id,cf.lg_id,cf.aaa_cd,cf.aghra_cd,cf.apsf_unq_id,cf.mdlwe_sbscr_id,cf.cstmr_id,
                        cf.instl_addr1_tx,cf.instl_addr2_tx,cf.instl_lcly_tx,cf.instl_ara_tx,cf.instl_ste_id,cf.instl_dstrct_id,cf.instl_mndl_id,cf.instl_vlge_id,cf.instl_std_cd,cf.instl_eml1_tx,
                        cf.instl_lmdle1_nu,cf.onu_stpbx_id,cf.onu_srl_nu,cf.onu_mac_addr_tx,cf.onu_emi_ct,cf.onu_upfrnt_at,cf.onu_own_in,cf.onu_prc_at,cf.olt_id,cf.olt_srl_nu,cf.olt_ip_addr_tx,
                        cf.olt_onu_id,cf.olt_prt_id,cf.olt_prt_nm,cf.olt_crd_nu,cf.splt_id,cf.olt_prt_splt_tx,cf.pop_id,cf.caf_mac_addr_tx,cf.iptv_stpbx_id,cf.iptv_srl_nu,
                        cf.iptv_mac_addr_tx,cf.iptv_upfrnt_at,cf.iptv_prc_at,cf.iptv_emi_ct,cf.iptv_own_in,cf.tp_ct,cf.instl_chrg_at,cf.cnctn_sts_id,cf.cnctn_dt,cf.pstpd_in,cf.rgd_caf_in
                        ,DATE_FORMAT(cf.actvn_dt ,'%d-%m-%Y') as actvn_dt,cu.rltve_nm
						,DATE_FORMAT(cf.actvn_ts ,'%d-%m-%Y') as actvn_dts
                        ,DATE_FORMAT(cf.trmnd_dt,'%d-%m-%Y') as trmnd_dt,
                        DATE_FORMAT(date(cf.spnd_ts),'%d-%m-%Y') as spnd_dt,
                        DATE_FORMAT(date(cf.rsme_ts),'%d-%m-%Y') as rsme_dt,
                        cs.sts_nm,ec.entrpe_type_nm,
                        DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts
                        from caf_dtl_t cf 
                        join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id and cu.a_in=1 ${where}
                        LEFT JOIN entrpe_cstmr_typ_lst_t as ec on cu.entrpe_type_id = ec.entrpe_type_id
						left join BSS_BATCH.hsi_mnthly_usge_dtl_t as hsi on hsi.caf_id=cf.caf_id and mnt_ct=month(curdate()) and yr_ct=year(curdate())
                        join agnt_lst_t as a on  a.agnt_id=cf.lmo_agnt_id
						join caf_type_lst_t ct on ct.caf_type_id =cf.caf_type_id
                        JOIN blng_frqncy_lst_t bfl on bfl.frqncy_id = cf.frqncy_id
                        JOIN enty_sts_lst_t cs on cs.enty_sts_id = cf.enty_sts_id
                        JOIN dstrt_lst_t d on cf.instl_dstrct_id =d.dstrt_id 
						left join dprmnt_name_lst_t dl on dl.dprmnt_id=cf.ent_dept_id
                        join mndl_lst_t mn on (mn.mndl_nu = cf.instl_mndl_id or mn.mndl_id = cf.instl_mndl_id) and mn.dstrt_id = cf.instl_dstrct_id
                        join vlge_lst_t vl on (vl.vlge_nu = cf.instl_vlge_id or vl.vlge_id = cf.instl_vlge_id) and vl.mndl_id = cf.instl_mndl_id and vl.dstrt_id=cf.instl_dstrct_id
                        JOIN pckge_lst_t p ON cf.crnt_pln_id = p.pckge_id
                        join olt_lst_t as o on o.olt_id=cf.olt_id`;
    console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/*****************************************************************************
* Function      : getapsflBbnlPopDtls
* Description   : Add new  CafEventStatus
* Arguments     : callback function
*
******************************************************************************/
exports.getapsflBbnlPopDtls = (id, apsfBbnl, user, callback) => {
    var fnm = "getapsflBbnlPopDtls"

    var QRY_TO_EXEC = `select a.agnt_id,s.sbstn_nm ,s.sbstn_id from agnt_sbstn_rel_t as a
    join sbstn_lst_t as s on s.sbstn_id=a.sbstn_id
    join olt_lst_t as o on o.sbstn_id = s.sbstn_id and o.apsfl_bbnl=${apsfBbnl}
    where a.agnt_id=${id} GROUP BY s.sbstn_id`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : getgoicafdtlMdl
* Description   : Add new  CafEventStatus
* Arguments     : callback function
* Change History :
* 13/11/2023    -  Ramesh Patlola  - Initial Function
*
******************************************************************************/
exports.getgoicafdtlMdl = (data, user, callback) => {
    var fnm = "getgoicafdtlMdl"
    //var where = "1 = 1 ";
    var where =` `;

    if (data.dstrc_id) {
        where += ` and cf.instl_dstrct_id=${data.dstrc_id} `
    }
    if (data.mso_id) {
        where += ` and cf.mso_agnt_id=${data.mso_id}`
    }
    if (data.agntId) {
        where += ` and cf.lmo_agnt_id=${data.agntId}`
    }
    if (data.mobileno) {
        where += ` and cf.mbl_nu=${data.mobileno} `
    }
    if (data.CAf) {
        where += ` and cf.caf_nu=${data.CAf} `
    } if (data.adhar) {
        where += ` and cf.adhr_nu=${data.adhar} `
    } if (data.str_dt && data.end_dt) {
        where += ` and (cf.actvn_dt BETWEEN '${data.str_dt}' AND '${data.end_dt}') `
    } else if (data.str_dt) {
        where += `and cf.actvn_dt='${data.str_dt}' `
    } if (data.till_dt) {
        where += ` and cf.actvn_dt<CURDATE()`
    }
    if (data.Caf_type) {
        where += ` and cf.caf_type_id=${data.Caf_type} `
    } if (data.mndl_id) {
        where += `and cf.instl_mndl_id=${data.mndl_id} `
    } if (data.Caf_sts) {
        where += ` and cf.enty_sts_id=${data.Caf_sts} `
    } if (data.org_nm) {
        where += ` and cf.frst_nm='${data.org_nm}'`
    } if (data.iptv) {
        where += ` and cf.iptv_srl_nu='${data.iptv}'`
    } if (data.onu) {
        where += ` and cf.onu_srl_nu='${data.onu}'`
    } if (data.trmnd_cond == true) {
        where += ` AND cf.trmnd_in=0  `
    }
	if (data.apsfl_bbnl) {
        where += ` and cf.apsfl_bbnl=${data.apsfl_bbnl} `
    }
	 if (data.apsfl_bbnl) {
        where += ` and cf.apsfl_bbnl=${data.apsfl_bbnl} `
    }
    var QRY_TO_EXEC = ` SELECT  ROW_NUMBER() OVER ( ORDER BY cf.caf_id) sno,cf.gp_code,dl.dprmnt_nm as 'ent_dept_nm',cf.orgnsn_code as 'orgnsn_cd','GOI' as 'prjct_nm',ROUND(ttl_dwnld_ct/1024/1024/1024,2) AS TD,
                        ROUND(ttl_upld_ct/1024/1024/1024,2) AS TU,ROUND(ttl_dwnld_ct/1024/1024/1024,2)+ROUND(ttl_upld_ct/1024/1024/1024,2) as total,ct.caf_type_nm, o.olt_nm,'Profile' as 'Profile',
                        cu.cstmr_nm,cu.lst_nm,cu.cntct_mble1_nu,a.agnt_cd as lmo_cd,mdlwe_sbscr_id,p.pckge_id,hsi_orgnl_prfle_tx,hsi_orgnl_prfle_tx,
                        cf.caf_id,d.dstrt_nm ,vl.vlge_nm,mn.mndl_nm,bfl.frqncy_nm,caf_nu,caf_mac_addr_tx,mbl_nu,REPLACE(cu.adhr_nu,SUBSTR(cu.adhr_nu,1,8),'XXXXXXXX') as cstmr_adhr_nu,
                        cu.agnt_id,cu.blng_addr1_tx,cu.blng_ara_tx,cu.blng_cntct_mble1_nu,cu.blng_cntct_nm,cu.blng_eml1_tx,cu.gst_nu,
                        cf.caf_nu,cf.mbl_nu,REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu,cf.lat,cf.lng,cf.pndng_blne_at,cf.lst_pd_dt,cf.lst_pd_at,cf.lst_invce_id,cf.trmnd_in,cf.trmnd_rqst_in,cf.actve_in,cf.spnd_in,
                        cf.blckd_in,cf.blckd_rqst_in,cf.dsptd_in,cf.blble_caf_in,cf.pstpd_inve_in,cf.spnd_ts,cf.rsme_ts,cf.actvn_ts,cf.instd_ts,cf.trmnd_ts,cf.trmnd_dt,cf.enty_sts_id,
                        cf.caf_type_id,cf.mso_agnt_id,cf.lmo_agnt_id,cf.crnt_pln_id,pckge_nm,cf.frqncy_id,cf.prnt_caf_id,cf.lg_id,cf.aaa_cd,cf.aghra_cd,cf.apsf_unq_id,cf.mdlwe_sbscr_id,cf.cstmr_id,
                        cf.instl_addr1_tx,cf.instl_addr2_tx,cf.instl_lcly_tx,cf.instl_ara_tx,cf.instl_ste_id,cf.instl_dstrct_id,cf.instl_mndl_id,cf.instl_vlge_id,cf.instl_std_cd,cf.instl_eml1_tx,
                        cf.instl_lmdle1_nu,cf.onu_stpbx_id,cf.onu_srl_nu,cf.onu_mac_addr_tx,cf.onu_emi_ct,cf.onu_upfrnt_at,cf.onu_own_in,cf.onu_prc_at,cf.olt_id,cf.olt_srl_nu,cf.olt_ip_addr_tx,
                        cf.olt_onu_id,cf.olt_prt_id,cf.olt_prt_nm,cf.olt_crd_nu,cf.splt_id,cf.olt_prt_splt_tx,cf.pop_id,cf.caf_mac_addr_tx,cf.iptv_stpbx_id,cf.iptv_srl_nu,
                        cf.iptv_mac_addr_tx,cf.iptv_upfrnt_at,cf.iptv_prc_at,cf.iptv_emi_ct,cf.iptv_own_in,cf.tp_ct,cf.instl_chrg_at,cf.cnctn_sts_id,cf.cnctn_dt,cf.pstpd_in,cf.rgd_caf_in
                        ,DATE_FORMAT(cf.actvn_dt ,'%d-%m-%Y') as actvn_dt,cu.rltve_nm
						,DATE_FORMAT(cf.actvn_ts ,'%d-%m-%Y') as actvn_dts
                        ,DATE_FORMAT(cf.trmnd_dt,'%d-%m-%Y') as trmnd_dt,
                        DATE_FORMAT(date(cf.spnd_ts),'%d-%m-%Y') as spnd_dt,
                        DATE_FORMAT(date(cf.rsme_ts),'%d-%m-%Y') as rsme_dt,
                        cs.sts_nm,ec.entrpe_type_nm,
                        DATE_FORMAT(hsi_thrtd_ts,'%d-%m-%Y %h:%i') AS hsi_thrtd_ts,hsi_crnt_prfle_tx,hsi_orgnl_prfle_tx,hsi_on_bstr_pck_in,DATE_FORMAT(hsi_on_bstr_pck_ts,'%d-%m-%Y %h:%i') AS hsi_on_bstr_pck_ts
                        from caf_dtl_t cf 
                        join cstmr_dtl_t as cu on  cu.cstmr_id=cf.cstmr_id and cu.a_in=1 ${where}
                        LEFT JOIN entrpe_cstmr_typ_lst_t as ec on cu.entrpe_type_id = ec.entrpe_type_id
						left join BSS_BATCH.hsi_mnthly_usge_dtl_t as hsi on hsi.caf_id=cf.caf_id and mnt_ct=month(curdate()) and yr_ct=year(curdate())
                        join agnt_lst_t as a on  a.agnt_id=cf.lmo_agnt_id
						join caf_type_lst_t ct on ct.caf_type_id =cf.caf_type_id
                        JOIN blng_frqncy_lst_t bfl on bfl.frqncy_id = cf.frqncy_id
                        JOIN enty_sts_lst_t cs on cs.enty_sts_id = cf.enty_sts_id
                        JOIN dstrt_lst_t d on cf.instl_dstrct_id =d.dstrt_id 
						left join dprmnt_name_lst_t dl on dl.dprmnt_id=cf.ent_dept_id
                        join mndl_lst_t mn on (mn.mndl_nu = cf.instl_mndl_id or mn.mndl_id = cf.instl_mndl_id) and mn.dstrt_id = cf.instl_dstrct_id
                        join vlge_lst_t vl on (vl.vlge_nu = cf.instl_vlge_id or vl.vlge_id = cf.instl_vlge_id) and vl.mndl_id = cf.instl_mndl_id and vl.dstrt_id=cf.instl_dstrct_id
                        JOIN pckge_lst_t p ON cf.crnt_pln_id = p.pckge_id
                        join olt_lst_t as o on o.olt_id=cf.olt_id`;
    console.log(QRY_TO_EXEC);
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : getLmolisrforMSOMdl
* Description   : Add Password to Tel Number
* Arguments     : callback function
*
******************************************************************************/
exports.getLmolisrforMSOMdl = (data, user) => {
    var fnm = "getLmolisrforMSOMdl"
	let pge_nu = data.lmt_pstn * 20;
	var whr = ``;
	if(data.lmocode){
        whr = `and agnt_cd='${data.lmocode}'`
    }
    var QRY_TO_EXEC = `select a.agnt_cd,a.agnt_nm,a.ofce_cntct_nm,a.ofce_mbl_nu,concat(ofce_addr1_tx,ofce_addr2_tx,ofce_ara_nm) as address from agnt_lst_t as a where prnt_agnt_id =${data.usr_ctgry_ky} ${whr} limit ${pge_nu}, 20;`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);

}