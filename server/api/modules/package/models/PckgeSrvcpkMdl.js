var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : getPckgeSrvcpkMdl
* Description   : get details of all packageServiceLst
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgeSrvcpkMdl = (user, callback) => {
    var fnm = "getPckgeSrvcpkMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY p.srvcpk_id) sno, c.cre_srvce_nm, 
    ps.srvcpk_type_nm,(case WHEN cd.chrge_at then cd.chrge_at ELSE 0 END )as chrge_at ,(case WHEN cd.gst_at then cd.gst_at ELSE 0 END )as gst_at,m.mrcht_usr_nm ,p.*,DATE_FORMAT(p.efcte_dt ,'%d-%m-%Y')as date,DATE_FORMAT(p.expry_dt ,'%d-%m-%Y')as date1 ,fst_nm,lst_nm,DATE_FORMAT(p.i_ts,'%d-%m-%Y') AS crte_dt
    FROM pckge_srvcpk_lst_t p
    left JOIN cre_srvce_lst_t c On c.cre_srvce_id = p.cre_srvce_id 
    left JOIN pckge_srvcpk_type_lst_t ps On ps.srvcpk_type_id = p.srvcpk_type_id 
    left JOIN mrcht_usr_lst_t m ON p.crte_usr_id = m.mrcht_usr_id
    left join pckge_srvcpk_rel_t as psr on psr.srvcpk_id =p.srvcpk_id 
    left JOIN pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id =psr.pckge_srvcpk_rel_id 
    where p.a_in = 1 GROUP  by p.srvcpk_id 
    ORDER BY p.srvcpk_id ASC`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : srchPckgeSrvcpkMdl
* Description   : search details of all packageServiceLst
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.srchPckgeSrvcpkMdl = (data, user, callback) => {
    var fnm = "srchPckgeSrvcpkMdl"
    var QRY_WHERE = "1 = 1"

    if (data.hasOwnProperty('srvcpk_nm')) {
        QRY_WHERE += ` AND srvcpk_nm='${data.srvcpk_nm}'`
    }
    if (data.hasOwnProperty('cre_srvce_id')) {
        QRY_WHERE += ` AND cre_srvce_id=${data.cre_srvce_id}`
    }
    if (data.hasOwnProperty('msp_cd')) {
        QRY_WHERE += ` AND msp_cd='${data.msp_cd}'`
    }
    if (data.hasOwnProperty('srvcpk_hndlr_tx')) {
        QRY_WHERE += ` AND srvcpk_hndlr_tx='${data.srvcpk_hndlr_tx}'`
    }
    if (data.hasOwnProperty('efcte_dt')) {
        QRY_WHERE += ` AND efcte_dt='${data.efcte_dt}'`
    }
    if (data.hasOwnProperty('expry_dt')) {
        QRY_WHERE += ` AND expry_dt='${data.expry_dt}'`
    }
    if (data.hasOwnProperty('bndle_type_id')) {
        QRY_WHERE += ` AND bndle_type_id=${data.bndle_type_id}`
    }
    if (data.hasOwnProperty('lckn_dys_ct')) {
        QRY_WHERE += ` AND lckn_dys_ct=${data.lckn_dys_ct}`
    }
    if (data.hasOwnProperty('srvcpk_type_id')) {
        QRY_WHERE += ` AND srvcpk_type_id=${data.srvcpk_type_id}`
    }
    if (data.hasOwnProperty('chrg_amnt')) {
        QRY_WHERE += ` AND chrg_amnt=${data.chrg_amnt}`
    }
    if (data.hasOwnProperty('crte_usr_id')) {
        QRY_WHERE += ` AND crte_usr_id=${data.crte_usr_id}`
    }
    if (data.hasOwnProperty('updte_usr_id')) {
        QRY_WHERE += ` AND updte_usr_id=${data.updte_usr_id}`
    }
    if (data.hasOwnProperty('a_in')) { QRY_WHERE += ` AND a_in=${data.a_in}` } else { QRY_WHERE += ` AND a_in=1` }
    if (data.hasOwnProperty('d_ts')) { QRY_WHERE += ` AND d_ts IS NOT NULL` } else { QRY_WHERE += ` AND d_ts IS NULL` }
    var QRY_TO_EXEC = `SELECT SELECT ROW_NUMBER() OVER ( ORDER BY srvcpk_id) sno,
                                srvcpk_id,srvcpk_nm,cre_srvce_id,msp_cd,srvcpk_hndlr_tx,efcte_dt,expry_dt,bndle_type_id,lckn_dys_ct,srvcpk_type_id,chrg_amnt,a_in 
                        FROM pckge_srvcpk_lst_t 
                        WHERE ${QRY_WHERE} AND srvcpk_id= ${data.srvcpk_id}; `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getPckgeSrvcpkByIdMdl
* Description   : get details of single  packageServiceLst
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getPckgeSrvcpkByIdMdl = (id, user, callback) => {
    var fnm = "getPckgeSrvcpkByIdMdl"
    var QRY_TO_EXEC = `SELECT srvcpk_id,srvcpk_nm,cre_srvce_id,msp_cd,srvcpk_hndlr_tx,efcte_dt,expry_dt,bndle_type_id,lckn_dys_ct,srvcpk_type_id,chrg_amnt,a_in 
                        FROM pckge_srvcpk_lst_t 
                        WHERE a_in = 1 AND srvcpk_id= ${id}; `;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtPckgeSrvcpkMdl
* Description   : Add new  packageServiceLst
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtPckgeSrvcpkMdl = (data, user, callback) => {
    var fnm = "insrtPckgeSrvcpkMdl"
    var QRY_TO_EXEC = `INSERT INTO pckge_srvcpk_lst_t(srvcpk_nm,cre_srvce_id,msp_cd,srvcpk_hndlr_tx,efcte_dt,expry_dt,srvcpk_type_id,a_in,i_ts,crte_usr_id) 
                        VALUES('${data.srvcpk_nm}',${data.cre_srvce_id},'APSFL','${data.srvcpk_nm}','${data.efcte_dt}','${data.expry_dt}',${data.srvcpk_type_id},1,CURRENT_TIMESTAMP(),${user.user_id})`;

    //console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : insrtSrvcpkChnlRelMdl
* Description   : Add new  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insrtSrvcpkChnlRelMdl = (id, data,user, callback) => {
    var fnm = "insrtSrvcpkChnlRelMdl"
    if (data) {
        var QRY_TO_EXEC = ` INSERT INTO pckge_iptv_chnle_srvcpk_rel_t(srvcpk_id, chnle_id,a_in, i_ts,crte_usr_id)`;
        ////console.log(QRY_TO_EXEC)
        var dlmtr = ' , ';
        var valus_qry = ` values `;
        var counter = 0;
        var insertedsrvcpckid = id
        data.filter((k) => {
            if (++counter == data.length) {
                dlmtr = `; `
            }
            valus_qry += ` (${insertedsrvcpckid},${k.chnle_id},1,CURRENT_TIMESTAMP(),${user.user_id}) ${dlmtr}`
        })
        QRY_TO_EXEC += valus_qry;
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
        // console.log(QRY_TO_EXEC)
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
    }
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insHsiPrprySrvcpkRel
* Description   : Add new  packagePlan
* Arguments     : callback function
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.insHsiPrprySrvcpkRel = (id, data,user, callback) => {
    var fnm = "insHsiPrprySrvcpkRel"
    //console.log(id)
    //console.log(data)
    if (data) {
        var QRY_TO_EXEC = ` INSERT INTO pckge_hsi_prpry_srvcpk_rel_t (prpry_id, srvcpk_id, vle_tx,a_in, i_ts,crte_usr_id) `;
        ////console.log(QRY_TO_EXEC)
        var dlmtr = ' , ';
        var valus_qry = ` values `;
        var counter = 0;
        var insertedsrvcpckid = id
        data.filter((k) => {
            if (++counter == data.length) {
                dlmtr = `; `
            }
            valus_qry += ` (${k.hsi_prpty_id},${insertedsrvcpckid},'${k.vlu_txt}',1,CURRENT_TIMESTAMP(),${user.user_id}) ${dlmtr}`
        })
        QRY_TO_EXEC += valus_qry;
        //console.log(QRY_TO_EXEC)
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
    }
    //console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : updtePckgeSrvcpkMdl
* Description   : Update existing  packageServiceLst
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtePckgeSrvcpkMdl = (data, id, user, callback) => {
    var fnm = "updtePckgeSrvcpkMdl"
    var QRY_SET = ""

    if (data.hasOwnProperty('srvcpk_nm')) {
        QRY_SET += ` , srvcpk_nm='${data.srvcpk_nm}'`
    }
    if (data.hasOwnProperty('cre_srvce_id')) {
        QRY_SET += ` , cre_srvce_id=${data.cre_srvce_id}`
    }
    if (data.hasOwnProperty('msp_cd')) {
        QRY_SET += ` , msp_cd='${data.msp_cd}'`
    }
    if (data.hasOwnProperty('srvcpk_hndlr_tx')) {
        QRY_SET += ` , srvcpk_hndlr_tx='${data.srvcpk_hndlr_tx}'`
    }
    if (data.hasOwnProperty('efcte_dt')) {
        QRY_SET += ` , efcte_dt='${data.efcte_dt}'`
    }
    if (data.hasOwnProperty('expry_dt')) {
        QRY_SET += ` , expry_dt='${data.expry_dt}'`
    }
    if (data.hasOwnProperty('bndle_type_id')) {
        QRY_SET += ` , bndle_type_id=${data.bndle_type_id}`
    }
    if (data.hasOwnProperty('lckn_dys_ct')) {
        QRY_SET += ` , lckn_dys_ct=${data.lckn_dys_ct}`
    }
    if (data.hasOwnProperty('srvcpk_type_id')) {
        QRY_SET += ` , srvcpk_type_id=${data.srvcpk_type_id}`
    }
    if (data.hasOwnProperty('chrge_at')) {
        QRY_SET += ` , chrge_at=${data.chrg_amnt}`
    }
    if (data.hasOwnProperty('gst_at')) {
        QRY_SET += ` , gst_at=${data.gst_amnt}`
    }
    if (data.hasOwnProperty('crte_usr_id')) {
        QRY_SET += ` , crte_usr_id=${data.crte_usr_id}`
    }
    if (data.hasOwnProperty('updte_usr_id')) {
        QRY_SET += ` , updte_usr_id=${data.updte_usr_id}`
    }

    var QRY_TO_EXEC = ` UPDATE pckge_srvcpk_lst_t 
                        SET u_ts = current_timestamp(), a_in = 1,updte_usr_id=${user.user_id} ${QRY_SET}
                        WHERE srvcpk_id= ${id}; `;
    // console.log('####################')
    // console.log(QRY_TO_EXEC)
    // console.log('####################')

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : updtSrvcpck_chnlerelMdl
* Description   : Delete existing  Channels in Serive Packs
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.updtSrvcpck_chnlerelMdl = (data, id, user, callback) => {
    var fnm = "updtSrvcpck_chnlerelMdl"
    var QRY_TO_EXEC = `update pckge_iptv_chnle_srvcpk_rel_t set a_in=0 , d_ts= CURRENT_TIMESTAMP(),updte_usr_id=${user.user_id} where srvcpk_id=${id} AND chnle_id=${data.chnle_id}`;
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@');
    // console.log(QRY_TO_EXEC);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@');
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : hsiprprysrvcpkrelMdl
* Description   : Delete existing  Channels in Serive Packs
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.hsiprprysrvcpkrelMdl = (data, id, user, callback) => {
    var fnm = "hsiprprysrvcpkrelMdl"
    var QRY_TO_EXEC = `update pckge_hsi_prpry_srvcpk_rel_t SET vle_tx='${data.vlu_txt}',u_ts= CURRENT_TIMESTAMP(),updte_usr_id=${user.user_id} where prpry_id=${data.hsi_prpty_id} and srvcpk_id=${id}`;
    
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : dltePckgeSrvcpkMdl
* Description   : Delete existing  packageServiceLst
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dltePckgeSrvcpkMdl = (id, user, callback) => {
    var fnm = "dltePckgeSrvcpkMdl"
    var QRY_TO_EXEC = `UPDATE pckge_srvcpk_lst_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE srvcpk_id= ${id};`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : dltePckgeSrvcpkChnlRelMdl
* Description   : Delete existing  packageServiceLst
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.dltePckgeSrvcpkChnlRelMdl = (id, user, callback) => {
    var fnm = "dltePckgeSrvcpkChnlRelMdl"
    var QRY_TO_EXEC = `UPDATE pckge_iptv_chnle_srvcpk_rel_t 
                       SET d_ts = current_timestamp(), a_in = 0 ,updte_usr_id=${user.user_id}
                       WHERE srvcpk_id= ${id};`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : get_chnlsMdl
* Description   : get details of all channels Lst
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_chnlsMdl = (user, callback) => {
    var fnm = "get_chnlsMdl"
    var QRY_TO_EXEC = `SELECT chnle_id,chnle_cd,chnle_nm as opt_nm,c.lnge_id,l.lnge_nm as grp_nm from pckge_iptv_chnle_lst_t as c
    JOIN lnge_lst_t as l on c.lnge_id=l.lnge_id 
    ORDER BY chnle_id `;
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
exports.get_srvpcsMdl = (data, user, callback) => {
    var fnm = "get_srvpcsMdl"


    //console.log(data, '---------------------------------------------------------')

    var QRY_TO_EXEC = ` SELECT s.srvcpk_id,s.srvcpk_nm,cs.cre_srvce_id,cs.cre_srvce_nm
      from pckge_srvcpk_rel_t as sr 
      JOIN pckge_srvcpk_lst_t as s on s.srvcpk_id=sr.srvcpk_id
      JOIN cre_srvce_lst_t cs on cs.cre_srvce_id = sr.cre_srvce_id
      WHERE sr.pckge_id = ${data.id} ORDER BY cre_srvce_id `;
    //console.log(QRY_TO_EXEC)
}


/*****************************************************************************
* Function      : get_HsiPrptyMdl
* Description   : Get HSI Properties
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_HsiPrptyMdl = (user) => {
    var fnm = "get_HsiPrptyMdl"
    var QRY_TO_EXEC = `SELECT prpry_id, prpry_nm, prpry_dscn_tx, prpry_hndlr_tx from pckge_hsi_prpry_lst_t ORDER BY prpry_id;`;
    //console.log(QRY_TO_EXEC)
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getchnlcds_Mdl
* Description   : Get Channel Codes
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getchnlcds_Mdl = (ids,user,callback) => {
    var fnm = "getchnlcds_Mdl"
    var QRY_TO_EXEC = `SELECT chnle_id,chnle_cd from pckge_iptv_chnle_lst_t where chnle_id in(${ids})`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getpkcgeDtlsbySrvcpckId
* Description   : Get Channel Codes
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.getpkcgeDtlsbySrvcpckId = (id,user,callback) => {
    var fnm = "getpkcgeDtlsbySrvcpckId"
    var QRY_TO_EXEC = `SELECT p.pckge_id,p.pckge_nm,cd.chrge_at,cd.gst_at,p.glbl_in FROM pckge_srvcpk_rel_t as psr
    JOIN pckge_lst_t as p on p.pckge_id=psr.pckge_id
    JOIN pckge_chrge_dtl_t as cd on cd.pckge_srvcpk_rel_id=psr.pckge_srvcpk_rel_id
    where psr.srvcpk_id=${id} and psr.a_in=1 GROUP by p.pckge_id`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : get_srvpckDtlsMdl
* Description   : Get Channel Codes
* Arguments     : callback function
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
******************************************************************************/
exports.get_srvpckDtlsMdl = (data,user,callback) => {
    var fnm = "get_srvpckDtlsMdl"
    var condition1=''

    if(data.cresrvc_id==1)
    {
        condition1= `SELECT p.srvcpk_id ,p.srvcpk_nm, hp.prpry_id ,hp.prpry_nm ,hp.prpry_hndlr_tx ,hp.prpry_dscn_tx ,h.vle_tx FROM pckge_srvcpk_lst_t p
        join pckge_hsi_prpry_srvcpk_rel_t h on h.srvcpk_id =p.srvcpk_id 
        join pckge_hsi_prpry_lst_t hp on hp.prpry_id =h.prpry_id 
        where p.cre_srvce_id =1 and p.srvcpk_id =${data.srvpck_id}
        ORDER by hp.prpry_id`
    } 
    else 
    {
        var condition1=`SELECT p.srvcpk_id ,p.srvcpk_nm ,c.chnle_id ,c.chnle_nm FROM pckge_srvcpk_lst_t p
        join pckge_iptv_chnle_srvcpk_rel_t cl on cl.srvcpk_id =p.srvcpk_id and cl.a_in =1
        join pckge_iptv_chnle_lst_t c on c.chnle_id =cl.chnle_id 
        where p.cre_srvce_id =2 and p.srvcpk_id =${data.srvpck_id}
        ORDER by cl.chnle_id `
    }
    var QRY_TO_EXEC = condition1;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

