// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils'); var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/*****************************************************************************
* Function      : myProfileMdl
* Description   : 
* Arguments     : callback function
* Change History :
* 23/07/2019    -   - Initial Function
*
******************************************************************************/
exports.myProfileMdl = function (user) {
    var fnm = "myProfileMdl"
    // var QRY_TO_EXEC = `select
    // CONCAT('admin', mpf.prfle_dshbd_url_tx) as prfle_dshbd_url_tx, u.mrcht_usr_imge_url_tx, u.eml_tx,u.mrcht_usr_nm,
    // u.fst_nm,u.lst_nm,u.mbl_nu, u.addrs_tx,u.i_ts, r.mrcht_id, m.mrcht_nm,u.mrcht_usr_nm,m.mrcht_dsply_nm,msp.stp_prfle_id,o.orgn_nm,u.orgn_id,
    // mmp.mnu_prfle_id
    // ,CASE WHEN sp.prfle_ctgry_cd = 'STP' THEN sp.prfle_nm  ELSE '' END as stp_prfle_nm 
    // ,CASE WHEN mpf.prfle_ctgry_cd = 'MNP' THEN mpf.prfle_nm ELSE '' END as mnu_prfle_nm
    // ,d.dsgn_nm, d.dsgn_id, u.prfle_usr_img_url_tx,u.dprts_id as dprt_id,md.dprt_nm,u.otlt_id,mo.otlt_nm
    // ,CASE WHEN u.hyrchy_grp_id = 1 THEN 'Andhra Pradesh' END as hyrchy_grp_nm
    // from mrcht_usr_lst_t as u
    // join mrcht_mnu_prfle_rel_t as mnp on mnp.mrcht_usr_id=u.mrcht_usr_id
    // join prfle_lst_t as mpf on mpf.prfle_id=mnp.mnu_prfle_id
    // left JOIN mrcht_usr_rel_t r on r.mrcht_usr_id = u.mrcht_usr_id
    // left JOIN mrcht_lst_t m on m.mrcht_id = r.mrcht_id
    // left JOIN mrcht_dsgn_lst_t d on d.dsgn_id = u.dsgn_id
    // LEFT JOIN orgn_lst_t o ON o.orgn_id = u.orgn_id
    // LEFT JOIN mrcht_emp_dtl_t me ON me.mrcht_usr_id = u.mrcht_usr_id
    // LEFT JOIN mrcht_dprts_lst_t md ON md.dprt_id = u.dprts_id
    // LEFT JOIN mrcht_otlt_lst_t as mo on mo.otlt_id = u.otlt_id
    // LEFT JOIN mrcht_mnu_prfle_rel_t as mmp on mmp.mrcht_usr_id = r.mrcht_usr_id
    // LEFT JOIN mrcht_stp_prfle_rel_t as msp on msp.mrcht_usr_id = r.mrcht_usr_id
    // left join prfle_lst_t as mp on mp.prfle_id = mmp.mnu_prfle_id
    // left join prfle_lst_t as sp on sp.prfle_id = msp.stp_prfle_id
    //                     where u.mrcht_usr_id =${user.mrcht_usr_id}
    //                     GROUP BY u.mrcht_usr_id`;
    var QRY_TO_EXEC = ` SELECT 
                        CONCAT('admin', mpf.prfle_dshbd_url_tx) as prfle_dshbd_url_tx,
                        u.mrcht_usr_imge_url_tx, u.eml_tx,u.mrcht_usr_nm,
                        u.fst_nm,u.lst_nm,u.mbl_nu, u.addrs_tx,u.i_ts,mnp.mnu_prfle_id,r.mrcht_id, m.mrcht_nm,m.mrcht_dsply_nm,u.dsgn_id,dsgn_nm,u.orgn_id,orgn_nm
                        ,CASE WHEN mpf.prfle_ctgry_cd = 'MNP' THEN mpf.prfle_nm ELSE '' END as mnu_prfle_nm, u.prfle_usr_img_url_tx
                        ,CASE WHEN u.hyrchy_grp_id = 1 THEN 'Andhra Pradesh' END as hyrchy_grp_nm
                        FROM mrcht_usr_lst_t u
                        LEFT join mrcht_mnu_prfle_rel_t as mnp on mnp.mrcht_usr_id=u.mrcht_usr_id
                        LEFT join prfle_lst_t as mpf on mpf.prfle_id=mnp.mnu_prfle_id
                        left JOIN mrcht_usr_rel_t r on r.mrcht_usr_id = u.mrcht_usr_id
                        left JOIN mrcht_lst_t m on m.mrcht_id = r.mrcht_id
                        left join prfle_lst_t as mp on mp.prfle_id = mnp.mnu_prfle_id
                        left JOIN mrcht_dsgn_lst_t d on d.dsgn_id = u.dsgn_id
                        LEFT JOIN orgn_lst_t o ON o.orgn_id = u.orgn_id
                        WHERE u.mrcht_usr_id=${user.mrcht_usr_id}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : Update User Profile 
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateProfile = function (data, imgData, user) {
    var fnm = "updateProfile"
    var frmData = data.frmData;
    if (imgData == null || imgData == undefined) {
        FrmImgData = ``;
    } else {
        FrmImgData = `,prfle_usr_img_url_tx = '${imgData}'`
    }
    var QRY_TO_EXEC = `UPDATE mrcht_usr_lst_t set fst_nm = '${frmData.firstName}',lst_nm = '${frmData.lastName}',mbl_nu ='${frmData.mobileNumber}',eml_tx ='${frmData.email}',addrs_tx ='${frmData.address}',orgn_id = '${frmData.organisation}', otlt_id = '${frmData.branches}', dprts_id = '${frmData.department}', dsgn_id = '${frmData.designation}',updte_usr_id = '${data.mrcht_usr_id}',u_ts = CURRENT_TIMESTAMP() ${FrmImgData} where mrcht_usr_id = ${data.mrcht_usr_id};`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function      : getUserPrfles
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getUserPrfles = function (usr_id, user, callback) {
    var fnm = "getUserPrfles"
    var QRY_TO_EXEC = ` select mn.mnu_prfle_id,m.mnu_prfle_nm,mn.mnu_itm_id,mo.mnu_itm_nm,mn.sqnce_id,mn.dsble_in, ml.mnu_itm_nm as prnt_mnu_itm_nm 
                        from mnu_prfle_lst_t m
                        join mnu_prfle_itm_rel_t as mn on mn.mnu_prfle_id = m.mnu_prfle_id
                        join mnu_itm_lst_t as mo on mo.mnu_itm_id = mn.mnu_itm_id 
                        left join mnu_itm_lst_t as ml on  ml.mnu_itm_id = mn.mnu_itm_id
                        LEFT JOIN usr_mnu_prfle_rel_t as p on m.mnu_prfle_id = p.mnu_prfle_id
                        WHERE p.usr_id = ${usr_id} AND mo.a_in = 1
                        ORDER BY mn.mnu_prfle_id,mn.mnu_itm_id`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : userappsLst_getMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.userappsLst_getMdl = function (user, usrDt, callback) {
    var fnm = "userappsLst_getMdl"
    if (usrDt.tnt_id.indexOf(",") > -1) {
        var where = ` where u.usr_id =` + usrDt.usrId + ` and u.clnt_id = ` + usrDt.clnt_id + ` and tnt.tnt_id in ( ` + usrDt.tnt_id + ` ) and a.a_in =1 and a.cmpnt_id =` + user.cmpnt_id + ` order by apr.sqnce_id;`;
    } else {
        var where = ` where u.usr_id =` + usrDt.usrId + ` and u.clnt_id = ` + usrDt.clnt_id + ` and tnt.tnt_id = ` + usrDt.tnt_id + `  and a.a_in =1 and a.cmpnt_id =` + user.cmpnt_id + ` order by apr.sqnce_id;`;
    }
    var QRY_TO_EXEC = `select DISTINCT ap.app_prfle_id,a.app_id, a.app_nm, a.app_url_tx, a.app_lgo_tx, a.hdr_in,apr.prnt_app_id,pa.app_nm as prnt_app_nm, apr.dsble_in,
                        apr.r_in, apr.u_in,apr.d_in,apr.c_in 
                    from usr_grp_rle_rel_t as gr
                        join rles_lst_t as r on r.rle_id = gr.rle_id
                        join rle_prfle_rel_t as rp on rp.rle_id = r.rle_id
                        join app_prfle_lst_t ap on ap.app_prfle_id = rp.app_prfle_id
                        join app_prfle_app_rel_t apr on ap.app_prfle_id=apr.app_prfle_id
                        join app_lst_t a on a.app_id=apr.app_id
                        left join app_lst_t pa on pa.app_id=apr.prnt_app_id
                        left join app_kywrd_lst_t ak on ak.app_kywrd_id=apr.app_kywrd_id `+ where;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};