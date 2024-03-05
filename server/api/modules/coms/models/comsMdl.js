var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var dbutil = require(appRoot + '/utils/db.utils');
async = require('async');

/*****************************************************************************
* Function       : insert_reqCtrl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.get_verfyCtrl = function (data) {
    var fnm = "get_verfyCtrl"
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(data);
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function       : getPackageDetailsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPackageDetailsMdl = function (pckge_nm, mdlwe_sbscr_id) {
    var fnm = "getPackageDetailsMdl"
     var QRY_TO_EXEC_PCKG = `SELECT p.pckge_id, spr.srvcpk_id, 
                            DATE_FORMAT(p.efcte_dt, '%Y-%m-%d') as efcte_dt,
                            DATE_FORMAT(p.expry_dt, '%Y-%m-%d') as expry_dt,
                            p.chrge_at, p.gst_at FROM pckge_lst_t p 
                            JOIN pckge_srvcpk_rel_t spr on spr.pckge_id = p.pckge_id
                            JOIN pckge_srvcpk_lst_t as sp on sp.srvcpk_id=spr.srvcpk_id
                            WHERE sp.srvcpk_nm =  ${sqldb.MySQLConPool.escape(pckge_nm)}  AND CURRENT_DATE() <= p.expry_dt AND sp.a_in = 1  LIMIT 1;`

    var QRY_TO_EXEC_CAF = `SELECT c.caf_id, c.lmo_agnt_id as agnt_id FROM caf_dtl_t c
    WHERE c.mdlwe_sbscr_id = '${mdlwe_sbscr_id}' AND c.a_in = 1 `;

    return new Promise((reslove, reject) => {
        async.parallel({
            packg_dtls: function (callback) {
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC_PCKG, cntxtDtls, '', fnm, callback)
            },
            caf_dtls: function (callback) {
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC_CAF, cntxtDtls, '', fnm, callback)
            },

        }, function (err, results) {
            if (err) {
                reject(err)
            }
            else {
                reslove(results)
            }
        });
    })

};





/*****************************************************************************
* Function      : insrtAddonPckgeMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.insrtAddonPckgeMdl = (pckg_dtls, caf_dtls, actv_dt) => {
    var fnm = "insrtAddonPckgeMdl"
    var QRY_TO_EXEC = ` INSERT INTO caf_pckge_prchse_dtl_t (
        caf_id,	
        pckge_id,	
        srvcpk_id,	
        efcte_dt,	
        expry_dt,	
        chrge_at,	
        gst_at,
        srvc_at,	
        swtch_at,	
        ksn_at,
        entrn_at,	
        crnt_sts_in,
        crte_usr_id,
        src_id,
        prvsn_srce_id,	
        a_in,	
        i_ts) VALUES(
        ${caf_dtls.caf_id}, 
        ${pckg_dtls.pckge_id},
        ${pckg_dtls.srvcpk_id},
        '${actv_dt}', 
        '${pckg_dtls.expry_dt}', 
        ${pckg_dtls.chrge_at}, 
        ${pckg_dtls.gst_at}, 
        0,0,0,0,1,
        ${caf_dtls.agnt_id},3,3,
        1, CURRENT_TIMESTAMP())`;
    //console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}


/*****************************************************************************
* Function      : insrtAddonPckgeMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.stageAddonData = (data, status_in) => {
    var fnm = "stageAddonData"
    var rw_jsno_tx = JSON.stringify(data);

    if (status_in == 1) {
        var QRY_TO_EXEC = `INSERT INTO iptv_extrnl_sbscrptn_dtl_s(mdlwr_sbscrbr_cd, pckg_cd, sbcrptn_dt, actvtn_status_in,rw_jsn_tx, i_ts) VALUES ('${data['Subscriber Code']}', '${data['Package Codes']}', '${data['actdate']}', ${status_in},${sqldb.MySQLConPool.escape(rw_jsno_tx)}, CURRENT_TIMESTAMP());`;
    } else if (status_in == 0) {
        var QRY_TO_EXEC = `INSERT INTO iptv_extrnl_sbscrptn_dtl_s(mdlwr_sbscrbr_cd, pckg_cd, sbcrptn_dt, actvtn_status_in,rw_jsn_tx, i_ts) VALUES ('${data['Subscriber Code']}', '${data['Package Codes']}', '${data['deactdate']}', ${status_in},${sqldb.MySQLConPool.escape(rw_jsno_tx)}, CURRENT_TIMESTAMP());`;
    }

    //console.log(QRY_TO_EXEC);

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}



/*****************************************************************************
* Function      : updatePckgeMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.updatePckgeMdl = (packg_dtls, caf_dtls, deactdate) => {
    var fnm = "updatePckgeMdl"
    var QRY_TO_EXEC = `update caf_pckge_prchse_dtl_t set expry_dt='${deactdate}',spnd_in=0,spnd_ts=NULL,dscnt_srce_id=3,a_in=0 where caf_id=${caf_dtls.caf_id} and pckge_id=${packg_dtls.pckge_id} and a_in=1 and expry_dt>'${deactdate}'`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}

/*****************************************************************************
* Function      : updatePckgeMdl
* Description   : Get Agent wise caf details
* Arguments     : callback function
*
******************************************************************************/
exports.unbilledinformationMdl = (sbscr_cd) => {
    var fnm = "unbilledinformationMdl"
    var QRY_TO_EXEC = `
    SELECT CONCAT(ROUND(h.ttl_dwnld_ct/1024/1024/1024,2)+ROUND(h.ttl_upld_ct/1024/1024/1024,2), "(GB)")   as hsiUsage,CONCAT(p.mnth_usge_dwn_lmt_ct, "(GB)") as usageLimit,        
    (CASE WHEN hsi_thrtd_in = 1 THEN 'Y' ELSE 'N' END )as throughtlingStatus
   ,SUM(vch.cals_unts_ct) as telephoneUsage,NULL as statusCode,NULL as description
   FROM caf_dtl_t c
   join hsi_mnthly_usge_dtl_t h on h.caf_id =c.caf_id and h.yr_ct=YEAR(CURDATE()) AND h.mnt_ct=MONTH(CURDATE())
   JOIN hsi_pln_lmt_dtl_t p on p.pln_id =c.crnt_pln_id
   LEFT JOIN voip_call_hstry_lst_t vch on vch.caf_id =c.caf_id AND vch.cals_mm =MONTH(CURDATE()) AND vch.cals_yr =YEAR(CURDATE()) and incmg_in=0
   WHERE c.mdlwe_sbscr_id = "${sbscr_cd}";`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);

}

