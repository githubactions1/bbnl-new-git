var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getEntrpeCstmrMdl
* Description   : get details of all enterprise Customer
* Arguments     : callback function
* Change History :
* 27/01/2020    -  SCRIPT GENERATED  - Initial Function
*
******************************************************************************/
exports.getEntrpeCstmrMdl = (user, callback) => {
	var fnm = 'getEntrpeCstmrMdl';
    console.log("::::::::::::::::getEntrpeCstmrMdl:::::::::::::::::")
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY entrpe_cstmr_id) sno,
    entrpe_cstmr_id,entrpe_cstmr_nm,entrpe_cstmr_cd,e.entrpe_type_id,ect.entrpe_type_nm,e.entpnr_sub_type_id,ecs.entrpe_sub_type_nm,entpnr_org_nm,rgstn_vat_tan_no
    ,DATE_FORMAT(incrn_dt,'%Y-%m-%d') as incrn_dt,
    REPLACE(adhr_nu,SUBSTR(adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    pan_nu,gst_nu,cntct_prsn_nm,cntct_prsn_mble_nu,cntct_prsn_emle_tx,e.cntct_prsn_dsgn_id,m.dsgn_nm as cntct_prsn_dsgn_nm,e.blng_frqny_id
    ,b.frqncy_nm as blng_frqny_nm
    ,DATE_FORMAT(actvtn_dt,'%Y-%m-%d') as actvtn_dt,instl_hse_nu,instl_bldng_tx,instl_strte_tx,instl_lclty_tx,e.instl_mndle_id,ml.mndl_nm as instl_mndle_nm
    ,e.instl_cty_id,v.vlge_nm as instl_cty_nm
    ,e.instl_dstrt_id,d.dstrt_nm as instl_dstrt_nm,e.instl_ste_id,s.ste_nm as instl_ste_nm,instl_pn_cd,instl_fax_nu,instl_lnd_nu,instl_lat,instl_lng,blng_hse_nu,blng_bldng_tx,blng_strte_tx
    ,blng_lclty_tx,e.blng_mndle_id,ml1.mndl_nm as blng_mndle_nm,e.blng_cty_id,v1.vlge_nm as blng_cty_nm,e.blng_dstrt_id,d1.dstrt_nm as blng_dstrt_nm,e.blng_ste_id,s1.ste_nm as blng_ste_nm,blng_pn_cd,blng_fax_nu,blng_lnd_nu,blng_lat,blng_lng,e.a_in,chckd_ind
    FROM entrpe_cstmr_lst_t e
    JOIN entrpe_cstmr_typ_lst_t ect ON ect.entrpe_type_id = e.entrpe_type_id
    JOIN entrpe_cstmr_sub_typ_lst_t ecs ON ecs.entrpe_sub_type_id = e.entpnr_sub_type_id
    JOIN mrcht_dsgn_lst_t m ON m.dsgn_id = e.cntct_prsn_dsgn_id
    JOIN blng_frqncy_lst_t b ON b.frqncy_id = e.blng_frqny_id
    JOIN mndl_lst_t ml ON ml.mndl_id = e.instl_mndle_id
    JOIN mndl_lst_t ml1 ON ml1.mndl_id = e.blng_mndle_id
    JOIN vlge_lst_t v ON v.vlge_id = e.instl_cty_id
    JOIN vlge_lst_t v1 ON v1.vlge_id = e.blng_cty_id
    JOIN dstrt_lst_t d ON d.dstrt_id = e.instl_dstrt_id
    JOIN dstrt_lst_t d1 ON d1.dstrt_id = e.blng_dstrt_id
    JOIN ste_lst_t s ON s.ste_id = e.instl_ste_id
    JOIN ste_lst_t s1 ON s1.ste_id = e.instl_ste_id 
    WHERE e.a_in = 1 
    ORDER BY entrpe_cstmr_id; `;
    console.log("::::::::::QRY_TO_EXEC::::::::::::::::")
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : srchEntrpeCstmrMdl
* Description   : search details of all enterprise Customer
* Arguments     : callback function
* Change History :
* 27/01/2020    -  SCRIPT GENERATED  - Initial Function
*
******************************************************************************/
exports.srchEntrpeCstmrMdl = (data, user, callback) => {
	var fnm = 'srchEntrpeCstmrMdl';
    var QRY_WHERE = "1 = 1"

    if (data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}` } else { QRY_WHERE += ` AND a_in=1` }
    if (data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL` } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY entrpe_cstmr_id) sno,
                                entrpe_cstmr_id,entrpe_cstmr_nm,entrpe_cstmr_cd,entrpe_type_id,entpnr_sub_type_id,entpnr_org_nm,rgstn_vat_tan_no,DATE_FORMAT(incrn_dt,'%Y-%m-%d') as incrn_dt,
                                REPLACE(adhr_nu,SUBSTR(adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
                                pan_nu,gst_nu,cntct_prsn_nm,cntct_prsn_mble_nu,cntct_prsn_emle_tx,cntct_prsn_dsgn_id,blng_frqny_id,DATE_FORMAT(actvtn_dt,'%Y-%m-%d') as actvtn_dt,instl_hse_nu,instl_strte_tx,instl_lclty_tx,instl_mndle_id,instl_cty_id,instl_dstrt_id,instl_ste_id,instl_pn_cd,instl_fax_nu,instl_lnd_nu,instl_lat,instl_lng,blng_hse_nu,blng_strte_tx,blng_lclty_tx,blng_mndle_id,blng_cty_id,blng_dstrt_id,blng_ste_id,blng_pn_cd,blng_fax_nu,blng_lnd_nu,blng_lat,blng_lng,a_in,chckd_ind
                        FROM entrpe_cstmr_lst_t 
                        WHERE ${QRY_WHERE} AND entrpe_cstmr_id= ${data.entrpe_cstmr_id}; `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : getEntrpeCstmrByIdMdl
* Description   : get details of single  enterprise Customer
* Arguments     : callback function
* Change History :
* 27/01/2020    -  SCRIPT GENERATED  - Initial Function
*
******************************************************************************/
exports.getEntrpeCstmrByIdMdl = (id, user, callback) => {
	var fnm = 'getEntrpeCstmrByIdMdl';
    var QRY_TO_EXEC = `SELECT entrpe_cstmr_id,entrpe_cstmr_nm,entrpe_cstmr_cd,entrpe_type_id,entpnr_sub_type_id,entpnr_org_nm,rgstn_vat_tan_no,incrn_dt,
    REPLACE(adhr_nu,SUBSTR(adhr_nu,1,8),'XXXXXXXX') as adhr_nu,
    pan_nu,gst_nu,cntct_prsn_nm,cntct_prsn_mble_nu,cntct_prsn_emle_tx,cntct_prsn_dsgn_id,blng_frqny_id,DATE_FORMAT(actvtn_dt,'%Y-%m-%d') as actvtn_dt,instl_hse_nu,DATE_FORMAT(incrn_dt,'%Y-%m-%d') as incrn_dt,instl_bldng_tx,instl_strte_tx,instl_lclty_tx,instl_mndle_id,instl_cty_id,instl_dstrt_id,instl_ste_id,instl_pn_cd,instl_fax_nu,instl_lnd_nu,instl_lat,instl_lng,blng_hse_nu,blng_bldng_tx,blng_strte_tx,blng_lclty_tx,blng_mndle_id,blng_cty_id,blng_dstrt_id,blng_ste_id,blng_pn_cd,blng_fax_nu,blng_lnd_nu,blng_lat,blng_lng,a_in,chckd_ind
                        FROM entrpe_cstmr_lst_t 
                        WHERE a_in = 1 AND entrpe_cstmr_id= ${id}; `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : insrtEntrpeCstmrMdl
* Description   : Add new  enterprise Customer
* Arguments     : callback function
* Change History :
* 27/01/2020    -  SCRIPT GENERATED  - Initial Function
*
******************************************************************************/
exports.insrtEntrpeCstmrMdl = (data, user, callback) => {
	var fnm = 'insrtEntrpeCstmrMdl';
    var instlAdrs = data.installationAddress;
    var blngAdrs = data.billingAddress;
    console.log(instlAdrs)
    console.log(blngAdrs);
    if (data.instl_chk_ind == true) {
        ind = 1;
    } else {
        ind = 0;
    }
    if (data.blng_fax_nu == null) {
        blng_fax_nu = data.blng_fax_nu;
    }
    if (data.instl_fax_nu == null) {
        instl_fax_nu = data.instl_fax_nu;
    }
    var QRY_TO_EXEC = `INSERT INTO entrpe_cstmr_lst_t(entrpe_cstmr_nm,entrpe_cstmr_cd,entrpe_type_id,entpnr_sub_type_id,entpnr_org_nm,rgstn_vat_tan_no,incrn_dt,
        adhr_nu,pan_nu,gst_nu,cntct_prsn_nm,cntct_prsn_mble_nu,cntct_prsn_emle_tx,cntct_prsn_dsgn_id,blng_frqny_id,actvtn_dt,instl_hse_nu,instl_bldng_tx,instl_strte_tx,instl_lclty_tx,instl_mndle_id,instl_cty_id,instl_dstrt_id,instl_ste_id,instl_pn_cd,instl_fax_nu,instl_lnd_nu,instl_lat,instl_lng,blng_hse_nu,blng_bldng_tx,blng_strte_tx,blng_lclty_tx,blng_mndle_id,blng_cty_id,blng_dstrt_id,blng_ste_id,blng_pn_cd,blng_fax_nu,blng_lnd_nu,blng_lat,blng_lng,a_in,i_ts,crte_usr_id,chckd_ind,adhr_img_url_tx,pan_img_url_tx,gst_img_url_tx) 
    VALUES('${data.entrpe_cstmr_nm}','${data.entrpe_cstmr_cd}','${data.entrpe_type_id}','${data.entpnr_sub_type_id}','${data.entpnr_org_nm}','${data.rgstn_vat_tan_no}','${data.incrn_dt}','${data.adhr_nu}','${data.pan_nu}','${data.gst_nu}','${data.cntct_prsn_nm}','${data.cntct_prsn_mble_nu}','${data.cntct_prsn_emle_tx}','${data.cntct_prsn_dsgn_id}','${data.blng_frqny_id}','${data.actvtn_dt}','${data.instl_hse_nu}','${data.instl_bldng_tx}','${data.instl_strte_tx}','${data.instl_lclty_tx}','${data.instl_mndle_id}','${data.instl_cty_id}','${data.instl_dstrt_id}','${data.instl_ste_id}','${data.instl_pn_cd}','${instl_fax_nu}','${data.instl_lnd_nu}','${data.instl_lat}','${data.instl_lng}','${data.blng_hse_nu}','${data.blng_bldng_tx}','${data.blng_strte_tx}','${data.blng_lclty_tx}','${data.blng_mndle_id}','${data.blng_cty_id}','${data.blng_dstrt_id}','${data.blng_ste_id}','${data.blng_pn_cd}','${blng_fax_nu}','${data.blng_lnd_nu}','${data.blng_lat}','${data.blng_lng}',1,CURRENT_TIMESTAMP(),'${user.user_id}','${ind}','${data.adhr_img_url_tx}','${data.pan_img_url_tx}','${data.gst_img_url_tx}')`;
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : updteEntrpeCstmrMdl
* Description   : Update existing  enterprise Customer
* Arguments     : callback function
* Change History :
* 27/01/2020    -  SCRIPT GENERATED  - Initial Function
*
******************************************************************************/
exports.updteEntrpeCstmrMdl = (data, id, user, callback) => {
	var fnm = 'updteEntrpeCstmrMdl';
    var instData = data.installationAddress;
    var blngData = data.billingAddress;
    if (data.instl_chk_ind == true) {
        ind = 1;
    } else {
        ind = 0;
    }
    if (data.blng_fax_nu == null || data.blng_fax_nu == undefined) {
        var blng_fax_nu = data.blng_fax_nu;
    } else {
        var blng_fax_nu = '';
    }
    if (data.instl_fax_nu == null || data.instl_fax_nu == undefined) {
        var instl_fax_nu = data.instl_fax_nu;
    } else {
        var instl_fax_nu = '';
    }
    var QRY_SET = `,entrpe_cstmr_nm = '${data.entrpe_cstmr_nm}',entrpe_cstmr_cd = '${data.entrpe_cstmr_cd}',entrpe_type_id = '${data.entrpe_type_id}',entpnr_sub_type_id = '${data.entpnr_sub_type_id}',entpnr_org_nm = '${data.entpnr_org_nm}',rgstn_vat_tan_no = '${data.rgstn_vat_tan_no}',incrn_dt = '${data.incrn_dt}',adhr_nu = '${data.adhr_nu}',pan_nu = '${data.pan_nu}',gst_nu = '${data.gst_nu}',cntct_prsn_nm = '${data.cntct_prsn_nm}',cntct_prsn_mble_nu = '${data.cntct_prsn_mble_nu}',cntct_prsn_emle_tx = '${data.cntct_prsn_emle_tx}',cntct_prsn_dsgn_id = '${data.cntct_prsn_dsgn_id}',blng_frqny_id = '${data.blng_frqny_id}',instl_hse_nu = '${data.instl_hse_nu}',instl_bldng_tx = '${data.instl_bldng_tx}',instl_strte_tx = '${data.instl_strte_tx}',instl_lclty_tx = '${data.instl_lclty_tx}',instl_mndle_id = '${data.instl_mndle_id}',instl_cty_id = '${data.instl_cty_id}',instl_dstrt_id = '${data.instl_dstrt_id}',instl_ste_id = '${data.instl_ste_id}',instl_pn_cd = '${data.instl_pn_cd}',instl_fax_nu = '${instl_fax_nu}',instl_lnd_nu = '${data.instl_lnd_nu}',instl_lat = '${data.instl_lat}',instl_lng = '${data.instl_lng}',blng_hse_nu = '${data.blng_hse_nu}',blng_bldng_tx = '${data.blng_bldng_tx}',blng_strte_tx = '${data.blng_strte_tx}',blng_lclty_tx = '${data.blng_lclty_tx}',blng_mndle_id = '${data.blng_mndle_id}',blng_cty_id = '${data.blng_cty_id}',blng_dstrt_id = '${data.blng_dstrt_id}',blng_ste_id = '${data.blng_ste_id}',blng_pn_cd = '${data.blng_pn_cd}',blng_fax_nu = '${blng_fax_nu}',blng_lnd_nu = '${data.blng_lnd_nu}',blng_lat = '${data.blng_lat}',blng_lng = '${data.blng_lng}',chckd_ind = '${ind}',adhr_img_url_tx = '${data.adhr_img_url_tx}',pan_img_url_tx = '${data.pan_img_url_tx}',gst_img_url_tx = '${data.gst_img_url_tx}'`

    var QRY_TO_EXEC = ` UPDATE entrpe_cstmr_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE entrpe_cstmr_id= ${id}; `;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/*****************************************************************************
* Function      : dlteEntrpeCstmrMdl
* Description   : Delete existing  enterprise Customer
* Arguments     : callback function
* Change History :
* 27/01/2020    -  SCRIPT GENERATED  - Initial Function
*
******************************************************************************/
exports.dlteEntrpeCstmrMdl = (id, user, callback) => {
	var fnm = 'dlteEntrpeCstmrMdl';
    var QRY_TO_EXEC = `UPDATE entrpe_cstmr_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE entrpe_cstmr_id= ${id};`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
