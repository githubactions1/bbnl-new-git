
var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : postTrmndCafsByAgntMdl
* Description   : insert terminated cafs by agent
* Arguments     : callback function
*
******************************************************************************/
exports.insrtOtpMdl = (otp, exp, data, user) => {
    var fnm ="insrtOtpMdl"

    var QRY_TO_EXEC = `INSERT INTO cstmr_otp_dtl_t ( otp_txt, exp_ts, cstmr_id,caf_id, otp_dlvrd_in, crte_usr_id, updte_usr_id, a_in,  i_ts) VALUES (${otp}, CURRENT_TIMESTAMP()+ INTERVAL ${exp} MINUTE, ${data.cstmr_id}, ${data.caf_id}, 0, ${user.mrcht_usr_id}, ${user.mrcht_usr_id}, 1, CURRENT_TIMESTAMP());`;

    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/*****************************************************************************
* Function      : insrtCustDtlUpdtMdl
* Description   : insrtCustDtlUpdtMdl
* Arguments     : callback function
*
******************************************************************************/
exports.insrtCustDtlUpdtMdl = (otp_id, data, user) => {
    var fnm = "insrtCustDtlUpdtMdl"

    var QRY_TO_EXEC =
        `INSERT INTO cstmr_inf_updt_dtl_t ( cstmr_id, caf_id,mdlwe_sbscr_id, mbl_nu, loc_eml1_tx, instl_addr1_tx, instl_addr2_tx, instl_lcly_tx, instl_ara_tx, instl_ste_id, instl_dstrct_id, instl_mndl_id, instl_vlge_id, instl_std_cd, mbl_nu_updtd, loc_eml1_tx_updtd, instl_addr1_tx_updtd, instl_addr2_tx_updtd, instl_lcly_tx_updtd, instl_ara_tx_updtd, instl_ste_id_updtd, instl_dstrct_id_updtd, instl_mndl_id_updtd, instl_vlge_id_updtd, instl_std_cd_updtd, otp_id, otp_vrfd_in,agnt_id, crte_usr_id, a_in, i_ts) VALUES (
    ${data.cstmr_id},${data.caf_id},'${data.subscribercode}',${data.mbl_nu},'${data.loc_eml1_tx}','${data.instl_addr1_tx}','${data.instl_addr2_tx}','${data.instl_lcly_tx}','${data.instl_ara_tx}',${data.instl_ste_id},${data.instl_dstrct_id},${data.instl_mndl_id},${data.instl_vlge_id},'${data.instl_std_cd}',${data.mbl_nu_updtd},'${data.loc_eml1_tx_updtd}','${data.instl_addr1_tx_updtd}','${data.instl_addr2_tx_updtd}','${data.instl_lcly_tx_updtd}','${data.instl_ara_tx_updtd}',${data.instl_ste_id_updtd},${data.instl_dstrct_id_updtd},${data.instl_mndl_id_updtd},${data.instl_vlge_id_updtd},'${data.instl_std_cd_updtd}',${otp_id},0,${user.usr_ctgry_ky},${user.mrcht_usr_id},1,CURRENT_TIMESTAMP()
);`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/*****************************************************************************
* Function      : updtCustDtlUpdtMdl
* Description   : updtCustDtlUpdtMdl
* Arguments     : callback function
*
******************************************************************************/
exports.updtCustDtlUpdtMdl = (updtData, data, user) => {
    var fnm = "updtCustDtlUpdtMdl"

    // var QRY_TO_EXEC = `UPDATE cstmr_inf_updt_dtl_t SET otp_id=${otp_id} , updte_usr_id=${user.mrcht_usr_id} where updt_id=${req.body.data.updt_id};`
    // console.log(QRY_TO_EXEC)
    // return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

    let updateKeys = '';
    try {
        Object.keys(updtData).forEach(function (k) {
            if (k == 'spnd_ts' || k == 'actvn_ts') {
                updateKeys += `${k} = CURRENT_TIMESTAMP(),`
            } else {
                updateKeys += `${k} = ${updtData[k]},`
            }

        })
        var QRY_TO_EXEC = `UPDATE cstmr_inf_updt_dtl_t  SET ${updateKeys}
        updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
        WHERE updt_id= ${data.updt_id}`;
    } catch (err) {
        console.log(err)
    }


    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

}


/*****************************************************************************
* Function      : updtCustDtlUpdtMdl
* Description   : updtCustDtlUpdtMdl
* Arguments     : callback function
*
******************************************************************************/
exports.updtOtpMdl = (updtData, data, user) => {
    var fnm = "updtOtpMdl"

    // var QRY_TO_EXEC = `UPDATE cstmr_inf_updt_dtl_t SET otp_id=${otp_id} , updte_usr_id=${user.mrcht_usr_id} where updt_id=${req.body.data.updt_id};`
    // console.log(QRY_TO_EXEC)
    // return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);

    let updateKeys = '';
    try {
        Object.keys(updtData).forEach(function (k) {
            if (k == 'spnd_ts' || k == 'actvn_ts') {
                updateKeys += `${k} = CURRENT_TIMESTAMP(),`
            } else {
                updateKeys += `${k} = ${updtData[k]},`
            }

        })
        var QRY_TO_EXEC = `UPDATE cstmr_otp_dtl_t  SET ${updateKeys}
        updte_usr_id = ${user.mrcht_usr_id},u_ts = CURRENT_TIMESTAMP()
        WHERE otp_id= ${data.otp_id}`;
    } catch (err) {
        console.log(err)
    }


    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}




/*****************************************************************************
* Function       : getPostNotifMsgDtlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getPostNotifMsgDtlMdl = function (value, user) {
    var fnm ="getPostNotifMsgDtlMdl"

    var QRY_TO_EXEC = `select * from  msgs_ctgry_lst_t where msgs_ctgry_id = ${value}`;
    console.log(QRY_TO_EXEC)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : getOtpByIdMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOtpByIdMdl = function (value, user) {
    var fnm = "getOtpByIdMdl"

    var QRY_TO_EXEC = `select * from  cstmr_otp_dtl_t where otp_id = ${value}`;
    console.log(QRY_TO_EXEC)

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getUpdtDtaById
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getUpdtDtaByIdMdl = function (value, user) {
    var fnm = "getUpdtDtaByIdMdl"

    var QRY_TO_EXEC = `select m.mndl_nm,d.dstrt_nm,s.ste_nm,v.vlge_nm,u.* from  cstmr_inf_updt_dtl_t u
    LEFT JOIN vlge_lst_t v on u.instl_vlge_id_updtd = v.vlge_nu and  u.instl_mndl_id_updtd = v.mndl_id and u.instl_ste_id_updtd = 1 and u.instl_dstrct_id_updtd = v.dstrt_id
    LEFT JOIN mndl_lst_t m on u.instl_mndl_id_updtd = m.mndl_nu and u.instl_dstrct_id_updtd = m.dstrt_id
    LEFT JOIN dstrt_lst_t d on u.instl_dstrct_id_updtd = d.dstrt_id
    LEFT JOIN ste_lst_t s on u.instl_ste_id_updtd = s.ste_id
    WHERE u.updt_id = ${value};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updtCustDtlMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtCustDtlMdl = function (data, user) {
    var fnm = "updtCustDtlMdl"
    console.log(JSON.stringify(data) + "--------------------------")
    var QRY_TO_EXEC = `UPDATE caf_dtl_t SET  mbl_nu = ${data.mbl_nu_updtd},instl_addr1_tx='${data.instl_addr1_tx_updtd}', instl_addr2_tx='${data.instl_addr2_tx_updtd}', instl_lcly_tx='${data.instl_lcly_tx_updtd}', instl_ara_tx='${data.instl_ara_tx_updtd}', instl_ste_id=${data.instl_ste_id_updtd}, instl_dstrct_id=${data.instl_dstrct_id_updtd}, instl_mndl_id=${data.instl_mndl_id_updtd}, instl_vlge_id=${data.instl_vlge_id_updtd}, instl_std_cd='${data.instl_std_cd_updtd}' where caf_id=${data.caf_id};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function       : updtOptVrfdStsMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.updtOptVrfdStsMdl = function (value, user) {
    var fnm = "updtOptVrfdStsMdl"
    var QRY_TO_EXEC = `UPDATE cstmr_inf_updt_dtl_t SET otp_vrfd_in = 1  WHERE updt_id=${value};`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};



/*****************************************************************************
* Function       : getVillagesMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getVillagesMdl = function (dsct_id, mndl_id, user) {
    var fnm = "getVillagesMdl"
    var QRY_TO_EXEC = `SELECT vlge_id, vlge_nm FROM vlge_lst_t WHERE dstrt_id = ${dsct_id} AND mndl_id = ${mndl_id} AND a_in = 1`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};




/*****************************************************************************
* Function       : getOTPPndngVrfdListMdl
* Description    : 
* Arguments      : callback function
******************************************************************************/
exports.getOTPPndngVrfdListMdl = function (agnt_id, user) {
    var fnm = "getOTPPndngVrfdListMdl"
    var QRY_TO_EXEC = ` 
    SELECT cup.*, cf.mdlwe_sbscr_id, REPLACE(cf.adhr_nu,SUBSTR(cf.adhr_nu,1,8),'XXXXXXXX') as adhr_nu, cst.cstmr_nm as frst_nm, cst.lst_nm, DATE_FORMAT(cup.i_ts, '%d-%m-%Y %h:%i %p') as updt_ts
    FROM cstmr_inf_updt_dtl_t cup
    JOIN caf_dtl_t cf on cf.caf_id = cup.caf_id
    join cstmr_dtl_t cst on cst.cstmr_id =cf.cstmr_id
    WHERE cup.agnt_id = ${agnt_id} AND cup.a_in = 1 AND cup.otp_vrfd_in = 0`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
