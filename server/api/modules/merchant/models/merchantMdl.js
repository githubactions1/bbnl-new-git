var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/*****************************************************************************
* Function      : merch_get_locM
* Description   : get merchant locations
******************************************************************************/
exports.merch_get_locM = (user) => {
    var fnm = "merch_get_locM"
    var QRY_TO_EXEC = `select * from mrcht_lctns_lst_t ml 
    join mrcht_lst_t as m on m.mrcht_id=ml.mrcht_id 
    join mrcht_ctgry_lst_t as mc on mc.mrcht_ctgry_id=m.mrcht_ctgry_id
    WHERE ml.a_in=1 order by ml.lctn_id ASC`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : merch_add_locM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.merch_add_locM = (data, user) => {
    var fnm = "merch_add_locM"
    console.log(data)
    var QRY_TO_EXEC = `insert into mrcht_lctns_lst_t (lctn_nm,mrcht_id,a_in,i_ts) values ('${data.lctn_nm}',${data.mrcht_id},1,current_timestamp())`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : merch_updt_locM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.merch_updt_locM = (data, user) => {
    var fnm = "merch_updt_locM"
    var QRY_TO_EXEC = `update mrcht_lctns_lst_t set lctn_nm = '${data.lctn_nm}',u_ts = current_timestamp() where lctn_id = ${data.lctn_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : merch_del_locM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.merch_del_locM = (id, user) => {
    var fnm = "merch_del_locM"
    var QRY_TO_EXEC = `update mrcht_lctns_lst_t set a_in = 0, d_ts = current_timestamp() where lctn_id = ${id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : getMrchntAccntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntAccntMdl = (id, user) => {
    var fnm = "getMrchntAccntMdl"
    var QRY_TO_EXEC = ` select * from mrchnt_acnt_lst_t where  mrcht_acnt_id = ${id} and a_in = 1`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : insrtMrchntAccntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntAccntMdl = (data, user) => {
    var fnm = "insrtMrchntAccntMdl"
    var QRY_TO_EXEC = ` insert into mrchnt_acnt_lst_t values(mrcht_acnt_nu, mrcht_id, otlt_id, bnk_id)
    values (${data.mrcht_acnt_nu}, ${data.mrcht_id}, ${data.otlt_id}, ${data.bnk_id});`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : updateMrchntAccntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntAccntMdl = (data, user) => {
    var fnm = "updateMrchntAccntMdl"
    var QRY_TO_EXEC = ` update mrchnt_acnt_lst_t set mrcht_acnt_nu = ${data.mrcht_acnt_nu}, mrcht_id = ${data.mrcht_id}, 
    otlt_id = ${data.otlt_id}, bnk_id = ${data.bnk_id} where mrcht_acnt_id = ${data.mrcht_acnt_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : deltMrchntAccntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntAccntMdl = (id, user) => {
    var fnm = "deltMrchntAccntMdl"
    var QRY_TO_EXEC = ` update mrchnt_acnt_lst_t set d_ts = current_timestamp() , a_in = 0 where mrcht_acnt_id = ${id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : getOrgnztnCntrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getOrgnztnCntrlMdl = (user) => {
    var fnm= "getOrgnztnCntrlMdl"
    var QRY_TO_EXEC = ` select * from orgn_lst_t where a_in = 1 `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : insrtOrgnztnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtOrgnztnMdl = (data, user) => {
    var fnm = "insrtOrgnztnMdl"
    console.log(data)
    var QRY_TO_EXEC = ` insert into orgn_lst_t(orgn_nm) values('${data.orgn_nm}'); `;
    
console.log("sucessfully inserted")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : updateOrgnztnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateOrgnztnMdl = (data, user) => {
    var fnm = "updateOrgnztnMdl"
    var QRY_TO_EXEC = ` update orgn_lst_t set orgn_nm = '${data.orgn_nm}' where orgn_id = ${data.orgn_id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : deltOrgnztnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltOrgnztnMdl = (id, user) => {
    var fnm = "deltOrgnztnMdl"
    var QRY_TO_EXEC = ` update orgn_lst_t set  d_ts = current_timestamp(), a_in = 0 where orgn_id = ${id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getOutltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getOutltMdl = (data, user) => {
    var fnm = "getOutltMdl"
    if (data.outlt_ctgry_nm != ''){
        var condition = `AND c.otlt_ctgry_nm = '${data.outlt_ctgry_nm}'`;
    }else{
        var condition = ``;
    }
    var QRY_TO_EXEC = ` SELECT ot.otlt_id, ot.otlt_nm, ot.otlt_ctgry_id, c.otlt_ctgry_nm, m.mrcht_id, m.mrcht_nm FROM mrcht_otlt_lst_t ot 
                        JOIN mrcht_lst_t m on m.mrcht_id = ot.mrcht_id
                        JOIN mrcht_otlt_ctgry_lst_t c on c.otlt_ctgry_id = ot.otlt_ctgry_id 
                        WHERE ot.a_in = 1 AND m.mrcht_id=${data.mrcht_id} ${condition}
                        ORDER BY ot.otlt_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : insrtOutltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtOutltMdl = (data, user) => {
    var fnm = "insrtOutltMdl"
    var QRY_TO_EXEC = ` insert into mrcht_otlt_lst_t (otlt_nm, otlt_ctgry_id, mrcht_id, a_in, i_ts)
    values ('${data.otlt_nm}', ${data.otlt_ctgry_id}, ${data.mrcht_id}, 1, current_timestamp())`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : updateOutltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateOutltMdl = (data, user) => {
    var fnm = "updateOutltMdl"
    var QRY_TO_EXEC = `update mrcht_otlt_lst_t set otlt_nm = '${data.otlt_nm}', otlt_ctgry_id = ${data.otlt_ctgry_id}, 
    mrcht_id = ${data.mrcht_id} where otlt_id =  ${data.otlt_id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : deltOutltMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltOutltMdl = (id, user) => {
    var fnm = "deltOutltMdl"
    var QRY_TO_EXEC = `update mrcht_otlt_lst_t set d_ts = current_timestamp(), a_in = 0 where otlt_id =  ${id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : getDsgntnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getDsgntnMdl = (user) => {
    var fnm = "getDsgntnMdl"
    var QRY_TO_EXEC = ` select * from mrcht_dsgn_lst_t where a_in = 1 order by dsgn_id; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : insrtDsgntnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtDsgntnMdl = (data, user) => {
    var fnm = "insrtDsgntnMdl"
    var QRY_TO_EXEC = `  insert into mrcht_dsgn_lst_t (dsgn_nm, mrcht_id) values ('${data.dsgn_nm}', ${data.mrcht_id}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}



/*****************************************************************************
* Function      : updateDsgntnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateDsgntnMdl = (data,user) => {
    var fnm = "updateDsgntnMdl"
    var QRY_TO_EXEC = ` update mrcht_dsgn_lst_t set dsgn_nm = '${data.dsgn_nm}', mrcht_id =  ${data.mrcht_id} where dsgn_id = ${data.dsgn_id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}





/*****************************************************************************
* Function      : deltDsgntnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltDsgntnMdl = (id,user) => {
    var fnm = "deltDsgntnMdl"
    var QRY_TO_EXEC = ` update mrcht_dsgn_lst_t set d_ts = current_timestamp(), a_in = 0 where dsgn_id = ${id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}



/*****************************************************************************
* Function      : getMrchntEmplsLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntEmplsLstMdl = (mrchntID, user) => {
    var fnm = "getMrchntEmplsLstMdl"
    var QRY_TO_EXEC = `SELECT e.*,r.dsgn_id,d.dsgn_nm,dp.dprnt_nm,
    r.dprnt_id,
    r.otlt_id ,
    pr.prl_lne_itm_id, (CASE WHEN pr.prsntg is NULL THEN ln.prsntg ELSE pr.prsntg END) as prsntg,
    ln.prl_lne_itm_cd, ln.prl_lne_itm_nm, ln.dctn_in, sl.basic, sl.hra, sl.esi, sl.pf, sl.ctc, sl.mnthly_grss, sl.dly_wgs,
    sl.slry_ctgry_id, sl.is_prmnt_in,
    sl.slry_crdt_bnk_id,
                mu.rle_id,mr.rle_nm
    FROM mrcht_emple_lst_t e

    JOIN mrcht_emplye_rel_t r on r.emplye_id = e.emple_id
		LEFT JOIN mrcht_usr_rel_t ms on ms.mrcht_id = r.mrcht_id and e.emple_id = ms.emp_id
    LEFT JOIN mrcht_usr_lst_t mu on mu.mrcht_usr_id = ms.mrcht_usr_id
    left join mrcht_rls_lstl_t mr on mr.rle_id = mu.rle_id
    JOIN mrcht_dsgn_lst_t d on d.dsgn_id = r.dsgn_id
    JOIN mrcht_dprnt_lst_t dp on dp.dprnt_id = r.dprnt_id
    left JOIN mrcht_prl_lne_rel_t pr on pr.mrcht_id = r.mrcht_id AND pr.d_ts is NULL
    LEFT JOIN prl_lne_itm_lst_t ln on ln.prl_lne_itm_id = pr.prl_lne_itm_id
    LEFT JOIN slry_brkp_dtl_t sl on sl.emple_id = e.emple_id
    WHERE r.mrcht_id = ${mrchntID} and e.a_in = 1 and e.d_ts is NULL ORDER BY e.emple_id DESC; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtMrchntEmpGrpMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntEmpGrpMdl = (data, user) => {
    var fnm = "insrtMrchntEmpGrpMdl"
    var QRY_TO_EXEC = `  insert into mrcht_emp_grp_lst_t (mrcht_id,grp_nm, grp_dsc) values ('${data.mrcht_id}', '${data.grpName}','${data.grpDesc}'); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : updateMrchntEmpGrpMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntEmpGrpMdl = (data,user, callback) => {
    var fnm = "updateMrchntEmpGrpMdl"
    console.log(data)
    if (data) {

        var QRY_TO_EXEC = ` insert into mrcht_emp_grp_rel_t(grp_id, emp_id, d_ts)`;
        var dlmtr = ' , ';
        var valus_qry = ` values `;
        var counter = 0;
        var d_ts_qry = ` `
        data.emps.filter((k) => {
            if (++counter == data.emps.length) {
                dlmtr = ` ON DUPLICATE KEY UPDATE d_ts = VALUES(d_ts) ; `
            }
            d_ts_qry = `   CURRENT_TIMESTAMP() `
            valus_qry += ` ( ${data.grp_id}, ${k}, ${d_ts_qry}) ${dlmtr}`
        })
        QRY_TO_EXEC += valus_qry;
        
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
            callback(err, results)
        })
    }
    else {
        callback('', [])
    }
}
/*****************************************************************************
* Function      : insrtMrchntEmpGrpRelMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntEmpGrpRelMdl = (id, data,user, callback) => {
    var fnm = "insrtMrchntEmpGrpRelMdl"
    console.log("insrtMrchntEmpGrpRelMdl")
    if (data) {
        console.log("Yes")
        var QRY_TO_EXEC = ` insert into mrcht_emp_grp_rel_t(grp_id, emp_id)`;
        var dlmtr = ' , ';
        var valus_qry = ` values `;
        var counter = 0;
        data.empsIds.filter((empId) => {
            if (++counter == data.empsIds.length) {
                dlmtr = `; `
            }
            valus_qry += ` ( ${id}, ${empId}) ${dlmtr}`
        })
        QRY_TO_EXEC += valus_qry;
        
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
            callback(err, results)
        })
    }
    else {
        callback('', [])
    }

}



/*****************************************************************************
* Function      : getMrchntEmpbyGrpsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntEmpbyGrpsMdl = (mrchntID, user) => {
    var fnm = "getMrchntEmpbyGrpsMdl"
    var QRY_TO_EXEC = `SELECT e.* ,eg.grp_id,g.grp_nm,r.dsgn_id,d.dsgn_nm
    from mrcht_emple_lst_t e
    LEFT JOIN mrcht_emp_grp_rel_t eg
    ON  e.emple_id = eg.emp_id
    JOIN mrcht_emplye_rel_t r on r.emplye_id = eg.emp_id
    JOIN mrcht_dsgn_lst_t d on d.dsgn_id = r.dsgn_id
    LEFT JOIN mrcht_emplye_rel_t em
    On e.emple_id = em.emplye_id
LEFT JOIN mrcht_emp_grp_lst_t g
On eg.grp_id = g.grp_id
    WHERE eg.grp_id is NOT NULL AND em.mrcht_id= ${mrchntID} and eg.d_ts is NULL`
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getMrchntEmpbyGrpsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntEmpGrpsMdl = (mrchntID, user) => {
    var fnm = "getMrchntEmpGrpsMdl"
    var QRY_TO_EXEC = `SELECT g.* , COUNT(e.grp_id) as cnt FROM mrcht_emp_grp_lst_t g LEFT JOIN  mrcht_emp_grp_rel_t e ON g.grp_id = e.grp_id WHERE e.d_ts is NULL AND g.mrcht_id = ${mrchntID} GROUP BY  g.grp_id ORDER BY g.grp_id; `
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getDprtmntLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getDprtmntLstMdl = (id, user) => {
    var fnm = "getDprtmntLstMdl"
    var QRY_TO_EXEC = ` select * From mrcht_dprnt_lst_t where mrcht_id = ${id} and a_in = 1; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : insrtDprtmntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtDprtmntMdl = (data,user) => {
    var fnm = "insrtDprtmntMdl"
    var QRY_TO_EXEC = `  insert into mrcht_dprnt_lst_t (dprnt_nm, mrcht_id)
    values ('${data.dprnt_nm}', ${data.mrcht_id}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}


/*****************************************************************************
* Function      : updateDprtmntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateDprtmntMdl = (data,user) => {
    var fnm = "updateDprtmntMdl"
    var QRY_TO_EXEC = ` update mrcht_dprnt_lst_t set dprnt_nm = '${data.dprnt_nm}', mrcht_id =  ${data.mrcht_id} where dprnt_id = ${data.dprnt_id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}





/*****************************************************************************
* Function      : deltDprtmntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltDprtmntMdl = (id,user) => {
    var fnm = "deltDprtmntMdl"
    var QRY_TO_EXEC = ` update mrcht_dprnt_lst_t set d_ts = current_timestamp(), a_in = 0 where dprnt_id = ${id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}



/*****************************************************************************
* Function      : getTrmnlLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getTrmnlLstMdl = (id, user) => {
    var fnm = "getTrmnlLstMdl"
    var QRY_TO_EXEC = ` select * From trmnl_lst_t where a_in = 1 and trmnl_id = ${id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : insrtTrmnlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtTrmnlMdl = (data, user) => {
    var fnm = "insrtTrmnlMdl"
    var QRY_TO_EXEC = ` insert into trmnl_lst_t values(trmnl_nm, trmnl_prfle_id)
    values ('${data.trmnl_nm}', ${data.trmnl_prfle_id}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : updateTrmnlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateTrmnlMdl = (data, user) => {
    var fnm = "updateTrmnlMdl"
    var QRY_TO_EXEC = ` update  trmnl_lst_t set trmnl_nm = ${data.trmnl_nm} , trmnl_prfle_id = ${data.trmnl_prfle_id}) where trmnl_id = ${data.trmnl_id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : deltTrmnlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltTrmnlMdl = (id, user) => {
    var fnm = "deltTrmnlMdl"
    var QRY_TO_EXEC = ` update  trmnl_lst_t set d_ts = current_timestamp(), a_in = 0 where trmnl_id = ${id}; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : insrtMrchntEmpCtrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntEmpMdl = (data, user,callback) => {
    var fnm = "insrtMrchntEmpMdl"
    console.log(Array.isArray(data.avatar))
    if (data.lst_nm == null) { data.lst_nm = '' }
    if (data.wrk_ph == null) { data.wrk_ph = '' }
    if (data.bnk_ifsc_cd == null) { data.bnk_ifsc_cd = '' }
    if (data.wrk_eml_ts == null) { data.wrk_eml_ts = '' }
    if (data.rlvng_dt == null) { data.rlvng_dt = '' }
    if (data.bnk_act_nu == null) { data.bnk_act_nu = '' }
    if (data.pn_crd_nu == null) { data.pn_crd_nu = '' }
    if (data.esi_act_nu == null) { data.esi_act_nu = '' }
    if (data.pf_act_nu == null) { data.pf_act_nu = '' }
    if (data.adhr_nu == null) { data.adhr_nu = '' }
    if (Array.isArray(data.avatar) == true) {
        attchMnts.uploadToS3(data.avatar, 'wetrackon/image_upload', (err, imgUrl) => {
            var QRY_TO_EXEC = `insert into mrcht_emple_lst_t (emple_nu,fst_nm,lst_nm,eml_tx,mble_ph,imge_url_tx,wrk_eml_ts,wrk_ph,jne_dt,rlvng_dt,bnk_act_nu,pn_crd_nu,bnk_ifsc_cd,bnk_id,esi_act_nu,pf_act_nu,adhr_nu,addr1_tx,emplt_ctry_id,a_in,i_ts) values(${data.emple_nu},${data.fst_nm}','${data.lst_nm}','${data.eml_tx}',${data.mble_ph},'${imgUrl[0].Location}','${data.wrk_eml_ts}',${data.wrk_ph},'${data.jne_dt}','${data.rlvng_dt}','${data.bnk_act_nu}','${data.pn_crd_nu}','${data.bnk_ifsc_cd}','${data.bnk_id}','${data.esi_act_nu}','${data.pf_act_nu}','${data.adhr_nu}','${data.addr1_tx}','${data.emplt_ctry_id}',1,current_timestamp()) `;
            
            console.log( results.insertId,'hbjg')
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
                if (results.insertId) {
                    console.log(results)
                    callback(err, results)
                } 
                else {
                    console.log(err)
                    callback(err, [])
                }
            });
        })
    }
    else {

        var QRY_TO_EXEC = `insert into mrcht_emple_lst_t (emple_nu,fst_nm,lst_nm,eml_tx,mble_ph,imge_url_tx,wrk_eml_ts,wrk_ph,jne_dt,rlvng_dt,bnk_act_nu,pn_crd_nu,bnk_ifsc_cd,bnk_id,esi_act_nu,pf_act_nu,adhr_nu,addr1_tx,emplt_ctry_id,a_in,i_ts) values(${data.emple_nu},'${data.fst_nm}','${data.lst_nm}','${data.eml_tx}',${data.mble_ph},'${data.avatar}','${data.wrk_eml_ts}',${data.wrk_ph},'${data.jne_dt}','${data.rlvng_dt}','${data.bnk_act_nu}','${data.pn_crd_nu}','${data.bnk_ifsc_cd}','${data.bnk_id}','${data.esi_act_nu}','${data.pf_act_nu}','${data.adhr_nu}','${data.addr1_tx}','${data.emplt_ctry_id}',1,current_timestamp()) `;
        
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
          
            if (results && results.insertId) {
                console.log(results)
                callback(err, results)
            }
            else {
                console.log(err)
                callback(err, [])
            }
        });
    }

}
/*****************************************************************************
* Function      : insrtMrchntEmpCtrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntEmpRelMdl = (id, data,user, callback) => {
    console.log("insrtMrchntEmpRelMdl")
    var QRY_TO_EXEC = `insert into mrcht_emplye_rel_t (mrcht_id,emplye_id,dprnt_id,dsgn_id,crnt_in,otlt_id,i_ts) values(${data.mrcht_id},${id},'${data.dprnt_id}','${data.dsgn_id}','${data.crnt_in}','${data.otlt_id}',current_timestamp()) `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
        if (err) {
            callback(err,[])
        }
        else if(results) {
            callback(err,results)
        }
    });
}




/*****************************************************************************
* Function      : insrtMrchntEmpCtrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtEmpSlryBrkp = (id, data, callback) => {
    console.log("insrtEmpSlryBrkp")
    var QRY_TO_EXEC = `insert into slry_brkp_dtl_t (emple_id) values(${id}) `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm,function (err, results) {
        if (results) {
            callback(err,results)
        }
        else {
            callback(err,[])
        }
    });
}

/*****************************************************************************
* Function      : updateMrchntEmpCtrlMdl
* Description   : 
* Arguments     : callback function
********************************* *********************************************/
exports.updateMrchntEmpMdl = (data,user, callback) => {
    var fnm =  "updateMrchntEmpMdl"
    console.log(data)
    console.log(":::::::data:::::::::::")
    if (data.lst_nm == null) { data.lst_nm = '' }
    if (data.wrk_ph == null) { data.wrk_ph = '' }
    if (data.bnk_ifsc_cd == null) { data.bnk_ifsc_cd = '' }
    if (data.wrk_eml_ts == null) { data.wrk_eml_ts = '' }
    if (data.rlvng_dt == null) { data.rlvng_dt = 0 }
    if (data.bnk_act_nu == null) { data.bnk_act_nu = '' }
    if (data.pn_crd_nu == null) { data.pn_crd_nu = '' }
    if (data.esi_act_nu == null) { data.esi_act_nu = '' }
    if (data.pf_act_nu == null) { data.pf_act_nu = '' }
    if (data.adhr_nu == null) { data.adhr_nu = '' }

    if (data && Array.isArray(data.avatar) == true) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        attchMnts.uploadToS3(data.avatar, 'wetrackon/image_upload', (err, imgUrl) => {
            var QRY_TO_EXEC = `update mrcht_emple_lst_t set fst_nm = '${data.fst_nm}', lst_nm='${data.lst_nm}', eml_tx='${data.eml_tx}', wrk_eml_ts='${data.wrk_eml_ts} ',mble_ph=${data.mble_ph},wrk_ph=${data.wrk_ph},imge_url_tx='${imgUrl[0].Location}',jne_dt='${data.jne_dt}',rlvng_dt=${(data.rlvng_dt == 0) ? 'NULL' : `'` + data.rlvng_dt + `'`},pn_crd_nu='${data.pn_crd_nu}',bnk_act_nu='${data.bnk_act_nu}',bnk_ifsc_cd='${data.bnk_ifsc_cd}',bnk_id=${data.bnk_id},esi_act_nu='${data.esi_act_nu}',pf_act_nu='${data.pf_act_nu}',emplt_ctry_id=${data.emplt_ctry_id},adhr_nu='${data.adhr_nu}',addr1_tx='${data.addr1_tx}',u_ts=current_timestamp() where emple_id=${data.emple_id}`;
            
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
                if (results) {
                    callback(err, results)
                }
                else {
                    callback(err, [])
                }
            });

        })
    }
    else {

        console.log("in else sravani !base64")
        var QRY_TO_EXEC = `update mrcht_emple_lst_t set fst_nm = '${data.fst_nm}', lst_nm='${data.lst_nm}', eml_tx='${data.eml_tx}', wrk_eml_ts='${data.wrk_eml_ts} ',mble_ph='${data.mble_ph}',wrk_ph='${data.wrk_ph}',jne_dt='${data.jne_dt}', rlvng_dt=${(data.rlvng_dt == 0) ? 'NULL' : `'` + data.rlvng_dt + `'`},pn_crd_nu='${data.pn_crd_nu}',bnk_act_nu='${data.bnk_act_nu}',bnk_ifsc_cd='${data.bnk_ifsc_cd}',bnk_id=${data.bnk_id},esi_act_nu='${data.esi_act_nu}',pf_act_nu='${data.pf_act_nu}',emplt_ctry_id=${1},adhr_nu='${data.adhr_nu}',addr1_tx='${data.addr1_tx}',u_ts=current_timestamp() where emple_id=${data.emple_id}`;
        

        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, mrch_results) => {
            if (err) {
                console.log("erroooooooooooooooor", err)
                callback(err, [])
            }
            else {
                console.log("rweesssssssssssssssssssss", mrch_results)
                callback(err, mrch_results)
            }
        });
    }
}

/*****************************************************************************
    on      : udtMrchntEmpRelMdl
    ption   : 
* Arguments     : callback function
******************************************************************************/
exports.udtMrchntEmpRelMdl = (udtempdata, user, callback) => {
    var fnm = "udtMrchntEmpRelMdl"
    var QRY_TO_EXEC = `update mrcht_emplye_rel_t set dprnt_id = ${udtempdata.dprnt_id},dsgn_id = ${udtempdata.dsgn_id}, otlt_id = ${udtempdata.otlt_id}, u_ts=current_timestamp() where emplye_id = ${udtempdata.emple_id}`;
    ;
    // return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
        if (err) { 
            console.log(err); callback(err, []) 
        }
        else{
            callback(err, results)
        }
    });
}

/*****************************************************************************
* Function      : updtSlyCmpTable
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtSlyCmpTable = (data, user) => {
    var fnm = "updtSlyCmpTable"
    console.log("-----------------------------------")
    if (data.hra == null) { data.hra = '' }
    var QRY_TO_EXEC = `insert into slry_brkp_dtl_t(emple_id, basic, hra, esi, pf, ctc, mnthly_grss, 
        dly_wgs, slry_ctgry_id, is_prmnt_in, slry_crdt_bnk_id, mrcht_bnk_acnt_no, i_ts) values(${data.emple_id}, '${data.bsc_slry}', '${data.hra}', '${data.esi}', '${data.pf}', '${data.ctc}', '${data.mnthly_grss}', ' ${data.day_wgs}', ${data.slyCtgryId}, ${data.prmnt_in}, ${data.slry_crdt_bnk_id}, '${data.mrcht_bnk_acnt_no}', CURRENT_TIMESTAMP())
        on duplicate key update basic = ${data.bsc_slry}, hra = ${data.hra}, esi = ${data.esi}, pf = ${data.pf}, ctc = ${data.ctc}, mnthly_grss = ${data.mnthly_grss}, dly_wgs = ${data.day_wgs}, slry_ctgry_id = ${data.slyCtgryId}, is_prmnt_in = ${data.prmnt_in}, slry_crdt_bnk_id = ${data.slry_crdt_bnk_id}, mrcht_bnk_acnt_no = '${data.mrcht_bnk_acnt_no}', u_ts =   CURRENT_TIMESTAMP();`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : deltMrchntEmpMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntEmpMdl = (empId, user) => {
    var fnm = "deltMrchntEmpMdl"
    var QRY_TO_EXEC = `update mrcht_emple_lst_t set a_in=0,u_ts=current_timestamp() where emple_id=${empId}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}







/*****************************************************************************
* Function      : getMrchntTrnscMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntTrnscMdl = (id, user) => {
    var fnm = "getMrchntTrnscMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : getMrchntTrnscDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntTrnscDtlsMdl = (id, trnscId, user) => {
    var fnm = "getMrchntTrnscDtlsMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : getMrchntTrnscDateFltrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntTrnscDateFltrMdl = (id, frmdt, todt, user) => {
    var fnm = "getMrchntTrnscDateFltrMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : getMrchntStmntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntStmntMdl = (id, frmdt, todt, user) => {
    var fnm = "getMrchntStmntMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : getMrchntDshbrdMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntDshbrdMdl = (id, user) => {
    var fnm = "getMrchntDshbrdMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getMrchntDshbrdDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntDshbrdDtlsMdl = (id, otletId, user) => {
    var fnm = "getMrchntDshbrdDtlsMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}




/*****************************************************************************
* Function      : getMrchntOffrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntOffrsMdl = (mrchntID,mnu_itm_id, user) => {
    var fnm = "getMrchntOffrsMdl"
    var QRY_TO_EXEC = 
    `select o.*, CASE when o.ofr_id then 'offer' end as type,a.min_aprve_cnt,u.mrcht_usr_id,ap.arvl_in From mrcht_ofrs_lst_t o 
    join mrcht_ofr_rel_t as m on m.ofr_id=o.ofr_id
    JOIN aprvl_lst_t a on a.mnu_itm_id = o.mnu_itm_id LEFT JOIN mrcht_emp_grp_rel_t e
     ON a.grp_id = e.grp_id 
     LEFT JOIN mrcht_usr_rel_t u ON e.emp_id = u.emp_id
    LEFT JOIN aprvl_evnt_dtl_t ap ON u.mrcht_usr_id = ap.usr_id and o.ofr_id = ap.itm_id WHERE a.mnu_itm_id = ${mnu_itm_id} And u.mrcht_id = ${mrchntID} Order BY  o.ofr_id
    `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : insrtMrchntOffrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntOffrsMdl = (data, user, callback) => {
    var fnm= "insrtMrchntOffrsMdl"
    attachmentUtils.uploadToS3([data.base64], 'wetrackon/image_upload', (err, attChres) => {
        let url = attChres[0].Location
        data.desc = data.desc.replace(/'/g, "''");
        data.trmsCndtns = data.trmsCndtns.replace(/'/g, "''");
        var QRY_TO_EXEC = `INSERT INTO mrcht_ofrs_lst_t ( ofr_nm, ofr_ctgry_id, ofr_dscn_tx, ofr_imge_url_tx, efcte_dt, expry_dt, trms_cndn_tx,usg_lmt,tmplt_id,mnu_itm_id, a_in) VALUES ('${data.title}', '1',  '${data.desc}', '${url}', '${data.fromDt}', '${data.toDt}', '${data.trmsCndtns}', '${data.usgLmt}','${data.tmplt_id}',${data.mnu_itm_id},'1');`;
        console.log('insrtMrchntOffrsMdl');
        
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
            console.log('insrtMrchntOffrsMdl-------------------------');
            console.log(results)
            callback(err, results)
        });

    })

}

/*****************************************************************************
* Function      : insrtMrchntOffrRelMdl
* Description   : 
guments     : callback function
******************************************************************************/
exports.insrtMrchntOffrRelMdl = (mrchntId, offrId, user) => {
    var fnm = "insrtMrchntOffrRelMdl"
    var QRY_TO_EXEC = ` insert into mrcht_ofr_rel_t (ofr_id, mrcht_id)
    values (${offrId}, ${mrchntId}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
// var QRY_TO_EXEC = 
// `INSERT INTO aprvl_evnt_dtl_t (mnu_itm_id, itm_id, usr_id, arvl_in, a_in) VALUES (${data.mnu_itm_id}, ${data.ofr_id}, ${data.usr_id}, 1, 1);`
// 
// dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls).then((results)=>{
//     var QRY_TO_EXEC = 
//     `SELECT count(*) as aprvl_cnt from aprvl_evnt_dtl_t where itm_id = ${data.ofr_id} and arvl_in = 1;`
//     
//     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls).then((aprvlRes)=>{
//        if(aprvlRes[0].aprvl_cnt == data.min_aprve_cnt){
//         var QRY_TO_EXEC = `UPDATE mrcht_ofrs_lst_t SET  aprve_in='1', a_in=1 WHERE ofr_id=${data.ofr_id};`;
//         dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', (err, results) => {
//             console.log(results)
//             callback(err, results)
//         });
//        }else{
//         callback(err, aprvlRes)
//        }
       
//     }).catch(()=>{

//     })
// }).catch(()=>{
        
//     })
/******************************************************************
    : updateMrchntOffrsMdl
    : 
    : callback function
******************************************************************/
exports.updateMrchntOffrsMdl = (data, user, callback) => {
    var fnm = "updateMrchntOffrsMdl"
    // ofr_id:id,
    // min_aprve_cnt:min_aprve_cnt,
    // mnu_itm_id:mnu_itm_id,
    // usr_id:this.usrdtls.mrcht_usr_id
    if (data.ofr_id) {
        var QRY_TO_EXEC = `INSERT INTO aprvl_evnt_dtl_t (mnu_itm_id, itm_id, usr_id, arvl_in, a_in) VALUES (${data.mnu_itm_id}, ${data.ofr_id}, ${data.usr_id}, 1, 1);`;
        
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
            console.log(results)
            callback(err, results)
        });

    }
    else {
        data.desc = data.desc.replace(/'/g, "''");
        data.trmsCndtns = data.trmsCndtns.replace(/'/g, "''");
        if (data.base64) {
            attachmentUtils.uploadToS3([data.base64], 'wetrackon/image_upload', (err, attChres) => {
                let url = attChres[0].Location
                var QRY_TO_EXEC = `UPDATE mrcht_ofrs_lst_t SET  ofr_nm='${data.title}', ofr_ctgry_id=1, ofr_dscn_tx='${data.desc}', ofr_imge_url_tx='${url}', usg_lmt='${data.usgLmt}', efcte_dt='${data.fromDt}' , expry_dt='${data.toDt}', trms_cndn_tx='${data.trmsCndtns}', tmplt_id = '${data.tmplt_id}', a_in=1 WHERE ofr_id=${data.id};`;
                
                dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
                    console.log(results)
                    callback(err, results)
                });

            })
        } else {
            var QRY_TO_EXEC = `UPDATE mrcht_ofrs_lst_t SET  ofr_nm='${data.title}', ofr_ctgry_id=1, ofr_dscn_tx='${data.desc}', ofr_imge_url_tx='${data.imgUrl}', usg_lmt='${data.usgLmt}', efcte_dt='${data.fromDt}' , expry_dt='${data.toDt}', trms_cndn_tx='${data.trmsCndtns}', tmplt_id = '${data.tmplt_id}', a_in=1 WHERE ofr_id=${data.id};`;
            
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
                console.log(results)
                callback(err, results)
            });
        }
    }
}

/******************************************************************
    : getApprovalCntMdl
    : 
    : callback function
******************************************************************/
exports.getApprovalCntMdl = (data, user, callback) => {
    var fnm = "getApprovalCntMdl"
var QRY_TO_EXEC = `SELECT count(*) as aprvl_cnt from aprvl_evnt_dtl_t where itm_id = ${data.ofr_id} and arvl_in = 1;`;

dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
    console.log(results)
    callback(err, results)
});
}

/******************************************************************
    : approveOfferMdl
    : 
    : callback function
******************************************************************/
exports.approveOfferMdl = (data, user, callback) => {
    var fnm = "approveOfferMdl"
    var QRY_TO_EXEC = `UPDATE mrcht_ofrs_lst_t SET  aprve_in='1', a_in=1 WHERE ofr_id=${data.ofr_id};`;
    
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
        console.log(results)
        callback(err, results)
    });
    }
/*****************************************************************************
* Function      : deltMrchntOffrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntOffrsMdl = (id, mrchntID, user, callback) => {
    var fnm = "deltMrchntOffrsMdl"
    var QRY_TO_EXEC = `DELETE FROM mrcht_ofrs_lst_t WHERE  ofr_id  in (SELECT t1.ofr_id FROM mrcht_ofrs_lst_t t1 LEFT JOIN mrcht_ofr_rel_t t2 ON t1.ofr_id = t2.ofr_id WHERE t2.mrcht_id =${mrchntID} AND t2.ofr_id = ${id});`;
    
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm).then(function (results) {
        var QRY_TO_EXEC = `DELETE r FROM mrcht_ofr_rel_t r WHERE r.mrcht_id = ${mrchntID} AND r.ofr_id = ${id}  ;`;
        
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
            callback(err, results)
        });
    }).catch(function (error) {

    });
}

/*****************************************************************************
* Function      : getMrchntLoadNPayMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntLoadNPayMdl = (mrchntID, user) => {
    var fnm = "getMrchntLoadNPayMdl"
    var QRY_TO_EXEC = `SELECT d.*,count(u.ld_nd_py_id) as 'users' FROM ld_nd_py_dtl_t d LEFT JOIN ld_nd_py_usr_lst_t u ON d.ld_nd_py_id = u.ld_nd_py_id WHERE d.mrcht_id = ${mrchntID} GROUP BY d.ld_nd_py_id; ;`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getMrchntLoadNPayDtlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntLoadNPayDtlMdl = (mrchntID, id, user) => {
    var fnm = "getMrchntLoadNPayDtlMdl"
    var QRY_TO_EXEC = `SELECT u.*,d.mrcht_id,d.ld_nd_py_nm,d.py_dt as 'ld_py_dt',SUM(d.py_at) lp_ttl  FROM ld_nd_py_usr_lst_t u JOIN ld_nd_py_dtl_t d On u.ld_nd_py_id = d.ld_nd_py_id where  u.ld_nd_py_id = ${id} and d.mrcht_id = ${mrchntID} GROUP BY u.ld_nd_py_usr_id;`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insrtMrchntLoadNPayMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntLoadNPayMdl = (data, user) => {
    var fnm = "insrtMrchntLoadNPayMdl"
    console.log(data)
    var QRY_TO_EXEC = `INSERT INTO ld_nd_py_dtl_t ( mrcht_id, ld_nd_py_nm, py_dt, py_msg_tx,ld_nd_py_dsc, py_at, rcre_in, crte_usr_id, a_in) VALUES ('${data.mrchntId}', '${data.ld_nd_py_nm}', '${data.py_dt}', '${data.py_msg_tx}','${data.ld_nd_py_dsc}', '${data.py_at}', '0', '${data.mrchntId}', '${data.a_in}'); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : insrtMrchntLoadNPayMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntLoadNPayUsrsMdl = (data, id, user) => {
    var fnm = "insrtMrchntLoadNPayUsrsMdl"
    var dlmtr = ', ';
    var valQru = ' values ';
    if (data && data.data.length > 0) {
        var counter = 0;
        data.data.filter((k) => {

            if (data.data.length == ++counter) {
                dlmtr = ' ; '
            }

            valQru += ` ( '${k.firstName}', '${k.lastName}','${k.mobileNumber}',${k.py_dt},'${k.py_msg_tx}',${k.amount}, ${0}, ${id},${k.smartCardId},${data.mrchntId},${1} ) ${dlmtr}`
        })
    }

    var QRY_TO_EXEC = ` INSERT INTO ld_nd_py_usr_lst_t (fst_nm, lst_nm, mble_ph, py_dt, py_msg_tx, py_at, rcre_in, ld_nd_py_id, smrt_crd_id, crte_usr_id,  a_in) ${valQru}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm)

}


/*****************************************************************************
* Function      : getMrchntLoadNCollectMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntLoadNCollectMdl = (mrchntID, user) => {
    var fnm = "getMrchntLoadNCollectMdl"
    var QRY_TO_EXEC = `SELECT d.*,count(u.ld_nd_clct_id) as 'users' FROM ld_nd_clct_dtl_t d LEFT JOIN ld_nd_clct_usr_lst_t u ON d.ld_nd_clct_id = u.ld_nd_clct_id WHERE d.mrcht_id =  ${mrchntID} GROUP BY d.ld_nd_clct_id;`
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getMrchntLoadNCollectDtlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntLoadNCollectDtlMdl = (mrchntID, id, user) => {
    var fnm = "getMrchntLoadNCollectDtlMdl"
    var QRY_TO_EXEC = `SELECT u.*,d.mrcht_id,d.ld_nd_py_nm FROM ld_nd_clct_usr_lst_t u JOIN ld_nd_clct_dtl_t d On u.ld_nd_clct_id = d.ld_nd_clct_id where  u.ld_nd_clct_id = ${id} and d.mrcht_id = ${mrchntID}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : insrtMrchntLoadNCollectMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntLoadNCollectMdl = (data, user) => {
    var fnm = "insrtMrchntLoadNCollectMdl"
    console.log(data)
    var QRY_TO_EXEC = `INSERT INTO ld_nd_clct_dtl_t ( mrcht_id, ld_nd_py_nm, py_opn_dt, py_clse_dt, py_de_dt, ntfcn_dt, ld_nd_py_dsctx, py_msg_tx, py_de_msg_tx, rcre_in, py_due_chrge_at, crte_usr_id, a_in) VALUES ('${data.mrchntId}', '${data.ld_nd_py_nm}', '${data.py_opn_dt}', '${data.py_clse_dt}', '${data.py_de_dt}', '${data.ntfcn_dt}','${data.desc}', '${data.py_msg_tx}', 'payment due','0','${data.py_due_chrge_at}','${data.mrchntId}','${data.a_in}');`
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*****************************************************************************
* Function      : insrtMrchntLoadNCollectUsrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntLoadNCollectUsrsMdl = (data, id, user) => {
    var fnm = "insrtMrchntLoadNCollectUsrsMdl"
    var dlmtr = ', ';
    var valQru = ' values ';
    if (data && data.data.length > 0) {
        var counter = 0;
        data.data.filter((k) => {
            if (data.data.length == ++counter) {
                dlmtr = ' ; '
            }
            console.log(k.smartCardId)
            valQru += ` ( '${k.firstName}', '${k.lastName}','${k.mobileNumber}','${k.py_opn_dt}','${k.py_clse_dt}','${k.amount}','${k.py_de_dt}','${k.ntfcn_dt}','${k.py_msg_tx}' ,'${k.py_de_msg_tx}','1','${k.py_due_chrge_at}',${id},'${k.smartCardId}','${data.mrchntId}','1' ) ${dlmtr}`
        })
    }

    var QRY_TO_EXEC = `INSERT INTO ld_nd_clct_usr_lst_t (fst_nm, lst_nm, mble_ph, py_opn_dt, py_clse_dt, py_at, py_de_dt, ntfcn_dt, py_msg_tx, py_de_msg_tx, rcre_in, py_due_chrge_at, ld_nd_clct_id, smrt_crd_id, crte_usr_id, a_in) ${valQru}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm)

}
/*****************************************************************************
* Function      : getMrchntCntrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntCntrMdl = (id, user) => {
    var fnm = "getMrchntCntrMdl"
    var QRY_TO_EXEC = ` select * from cntr_lst_t where a_in = 1 order by cntr_id; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : insrtMrchntCntrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntCntrMdl = (data, user) => {
    var fnm = "insrtMrchntCntrMdl"
    var QRY_TO_EXEC = ` insert into cntr_lst_t values(cntr_nm, cntr_in, acs_pnt_in)
    values ('${data.cntr_nm}', ${data.cntr_in}, ${data.acs_pnt_in}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : updateMrchntCntrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntCntrMdl = (data, user) => {
    var fnm = "updateMrchntCntrMdl"
    var QRY_TO_EXEC = ` update cntr_lst_t set cntr_nm = '${data.cntr_nm}', 
    cntr_in = ${data.cntr_in}, acs_pnt_in = ${data.acs_pnt_in} where cntr_id = ${data.cntr_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : deltMrchntCntrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntCntrMdl = (id, user) => {
    var fnm = "deltMrchntCntrMdl"
    var QRY_TO_EXEC = ` update cntr_lst_t set d_ts = current_timestamp(), a_in = 0 where cntr_id = ${id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getMrchntUsrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntUsrMdl = (id, user) => {
    var fnm = "getMrchntUsrMdl"
    var QRY_TO_EXEC = `select * from mrcht_usr_lst_t u
    JOIN mrcht_rls_lstl_t r on r.rle_id = u.rle_id
    JOIN mrcht_emple_lst_t e on e.emple_id = u.emple_id
    where u.a_in=1
    ORDER BY u.i_ts DESC `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : insrtMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntMdl = (data, user) => {
    var fnm = "insrtMrchntMdl"
    var QRY_TO_EXEC = ` insert into mrcht_lst_t (mrcht_ctgry_id, mrcht_nm, addr1_tx, addr2_tx, strte_id, ste_id, cty_id)
    values (${data.mrcht_ctgry_id}, '${data.mrcht_nm}', '${data.addr1_tx}', '${data.addr2_tx}', ${data.strte_id}, ${data.ste_id}
    , ${data.cty_id}); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}





/*****************************************************************************
* Function      : getMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntMdl = (id, user) => {
    var fnm =  "getMrchntMdl"
    var QRY_TO_EXEC = ` select * from mrcht_lst_t where a_in = 1 order by mrcht_id; `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : updateMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntMdl = (data, user) => {
    var fnm = "updateMrchntMdl"
    var QRY_TO_EXEC = ` update mrcht_lst_t set  mrcht_ctgry_id = ${data.mrcht_ctgry_id}, mrcht_nm = '${data.mrcht_nm}',
    addr1_tx = ${data.mrcht_ctgry_id}, addr2_tx = ${data.mrcht_ctgry_id}, strte_id = ${data.mrcht_ctgry_id}, ste_id = ${data.mrcht_ctgry_id}, 
    cty_id = ${data.mrcht_ctgry_id} where mrcht_id = ${data.mrcht_id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : insrtMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtMrchntQRCode = (insertId, user) => {
    var fnm = "updtMrchntQRCode"
    var qr_cde = '';
    var accnt_nu = ' ';
    if (insertId) {

        for (let index = 10; index > (insertId + '').length; index--) {
            qr_cde += '0';
        }
        qr_cde += insertId;
        accnt_nu += 'SCARD_' + insertId;
    }
    var QRY_TO_EXEC = ` update mrcht_lst_t set mrcht_acnt_nu = '${accnt_nu}', qr_cde = '${qr_cde}' where mrcht_id = ${insertId} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : deltMrchntMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntMdl = (id, user) => {
    var fnm = "deltMrchntMdl"
    var QRY_TO_EXEC = ` update  mrcht_lst_t set d_ts = current_timestamp(), a_in = 0 where mrcht_id = ${id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}



/*****************************************************************************
* Function      : insrtMrchntUsrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntUsrMdl = (data, user) => {
    var fnm = "insrtMrchntUsrMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}





/*****************************************************************************
* Function      : updateMrchntUsrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntUsrMdl = (id, user) => {
    var fnm = "updateMrchntUsrMdl"
    var QRY_TO_EXEC = ` `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : deltMrchntUsrMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntUsrMdl = (id, data, user) => {
    var fnm = "deltMrchntUsrMdl"
    var QRY_TO_EXEC = `update mrcht_usr_lst_t set a_in=0, u_ts=current_timestamp() where mrcht_usr_id = ${id} `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}





/*****************************************************************************
* Function      : upldMrchntDocMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.upldMrchntDocMdl = (data, user, callback) => {
    var fnm = "upldMrchntDocMdl"
    // console.log(data)
    attchMnts.fleUpld(data, 'wetrackon/image_upload', (err, filePath) => {
        var QRY_TO_EXEC = ` select * from trmnl_lst_t; `;
        
        console.log(filePath)
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, result) => {
            callback(err, [{
                filePath: filePath[0].Location
            }])
        });
    })
}


/*****************************************************************************
* Function      : get_mrchnt_rolesM
* Description   : get merchant roles
******************************************************************************/
exports.get_mrchnt_rolesM = (user) => {
    var fnm = "get_mrchnt_rolesM"
    var QRY_TO_EXEC = `select * from mrcht_rls_lstl_t WHERE a_in = 1 ORDER BY i_ts ASC`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : insrt_mrchnt_rolesM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrt_mrchnt_rolesM = (data,user,callback) => {
    var fnm = "insrt_mrchnt_rolesM"
    console.log(data)
    var QRY_TO_EXEC = `insert into mrcht_usr_lst_t (mrcht_usr_nm,pswrd_encrd_tx,rle_id,a_in,i_ts) values ('${data.mrcht_usr_nm}',sha1('${data.pwd_tx}'),${data.rle_id},1,current_timestamp())`;
    
     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,(err,results)=>{
        if(err){
            callback(err,[])
        } 
        else if(results){
            callback(err,results)
        }
     });
}

/*****************************************************************************
* Function      : insrt_mrchnt_usr_rel
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrt_mrchnt_usr_rel = (id,data,user,callback) => {
    var fnm = "insrt_mrchnt_usr_rel"
    console.log(user)
    console.log(data)
    var QRY_TO_EXEC = `insert into mrcht_usr_rel_t (mrcht_usr_id,mrcht_id,emp_id,a_in,i_ts) values (${id},${data.mrcht_id},${data.emple_id},1,current_timestamp())`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm,(err,results)=>{
        if(err){
            callback(err,[])
        }
        else if(results){
            var QRY_TO_EXEC1 = `insert into mrcht_mnu_prfle_rel_t (mrcht_usr_id,mnu_prfle_id,app_id,clnt_id,tnt_id,a_in,i_ts) values (${id},${data.rle_id},'${data.app_id}',1,1,1,current_timestamp())`;
            console.log(QRY_TO_EXEC1)
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls,user,fnm,(err,results)=>{
                if(err){
                    callback(err,[])
                }
                else if(results){
                    callback(err,results)
                }
            })
        }
    });
}
/*****************************************************************************
* Function      : insrt_mrcht_usr_mnus
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrt_mrcht_usr_mnus = (id,data,user,callback) => {
    var fnm = "insrt_mrcht_usr_mnus"
    console.log(data)
    var QRY_TO_EXEC = `select mnu_itm_id from mnu_prfle_itm_rel_t where mnu_prfle_id = ${data.rle_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm,(err,results)=>{
        if(err){
            callback(err,[])
        }
        else if(results){
            var count = 1;
            var count1 = 0
            console.log(results)
            for(var i=0; i<results.length; i++){
                var QRY_TO_EXEC1 = `insert into mrcht_mnu_itm_rel_t (usr_id,mnu_itm_id,crte_usr_id,enble_in,dsble_in,sqnce_id,a_in,i_ts) values(${id},${results[i].mnu_itm_id},${data.mrcht_id},1,0,${count++},1,current_timestamp())`;

                console.log(QRY_TO_EXEC1)
                 dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls,user,fnm,(err,results)=>{
                    count1++
                    console.log(count1,i)
                    if(count1==i){
                        console.log("in last mnu")
                        callback(err,results)
                    }
                })
            }

        }
    });
}

/*****************************************************************************
* Function      : updt_mrchnt_rolesM
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updt_mrchnt_rolesM = (data, user) => {
    var fnm = "updt_mrchnt_rolesM"
    console.log(data)
    var QRY_TO_EXEC = `update mrcht_usr_lst_t set emple_id=${data.emple_id},rle_id=${data.rle_id},u_ts = current_timestamp() where mrcht_usr_id = ${data.mrcht_usr_id}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : insrt_membr_Mdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrt_membr_Mdl = (data,user, callback) => {
    var fnm = "insrt_membr_Mdl"
    console.log(data)
    var QRY_TO_EXEC = `insert into mbrsp_dtl_t (mbrsp_nm,mbrsp_amt_ct,mbrsp_vldty_dy_ct,a_in,i_ts) values ('${data.mbrsp_nm}',${data.mbrsp_amt_ct},${data.mbrsp_vldty_dy_ct},1,current_timestamp())`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
        callback(err, results)
    });

}
/*****************************************************************************
* Function      : insrt_membr_Mdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.usr_mem_rel_Mdl = (id, data, user,callback) => {
    var fnm = "usr_mem_rel_Mdl"
    console.log(data)
    var QRY_TO_EXEC = `insert into usr_mbrsp_rel_t (mbrsp_id,usr_id) values (${id},${data.usr_id})`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm ,(err, results) => {
        callback(err, results)
    });
}
/**********************************************************************
* Function      : getTemplatesMdl
* Description   : 
    nts     : callback function
******************************************************************************/
exports.getTemplatesMdl = (user) => {
    var fnm = "getTemplatesMdl"
    // if(tmpltID == null || tmpltID == undefined || tmpltID == ''){
    var QRY_TO_EXEC = ` select * From mrcht_ofrs_tmplt_lst_t`;
    // }
    // else{
    //     var QRY_TO_EXEC = ` select * From mrcht_ofrs_tmplt_lst_t where tmplt_id = tmpltID`;
    // }
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**********************************************************************
* Function       : getTemplatesDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getTemplatesDtlsMdl = (tmpltID, user) => {
    var fnm = "getTemplatesDtlsMdl"
    // if(tmpltID == null || tmpltID == undefined || tmpltID == ''){
    // var QRY_TO_EXEC = ` select * From mrcht_ofrs_tmplt_lst_t`;
    // }
    // else{
    var QRY_TO_EXEC = ` select * From mrcht_ofrs_tmplt_lst_t where tmplt_id = ${tmpltID}`;
    // }
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : insrtTemplateDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtTemplateDtlsMdl = (data, user, callback) => {
    var fnm = "insrtTemplateDtlsMdl"
    console.log('Inserting Offer Temalate in Offerlist');
    // console.log(data.img);
    attachmentUtils.uploadToS3([data.img], 'wetrackon/image_upload', (err, attChres) => {
        let url = attChres[0].Location
        var QRY_TO_EXEC = `INSERT INTO mrcht_ofrs_lst_t (ofr_ctgry_id, ofr_imge_url_tx, tmplt_id, a_in) VALUES ('0', '${url}', '${data.tmplt_id}','1');`;
        ;
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
            // console.log(results)
            callback(err, results)
        });

    })
}



/*****************************************************************************
* Function      : merch_get_locM
* Description   : get merchant locations
******************************************************************************/
exports.get_mnuitms_Mdl = (user) => {
    var fnm = "get_mnuitms_Mdl"
    console.log(user)
    // var QRY_TO_EXEC = `select dsble_in,a.app_nm,mi.app_id,mi.mnu_itm_id,mi.mnu_itm_nm,mi.mnu_itm_icn_tx, mi.mnu_itm_url_tx,mpi.prnt_mnu_itm_id, pmi.mnu_itm_nm as prnt_mnu_itm_nm,pmi.mnu_itm_icn_tx as prnt_mnu_icn_tx,mpi.c_in, mpi.r_in, mpi.u_in, mpi.d_in, mi.hdr_in, mpi.sqnce_id, ak.kywrd_tx from mnu_prfle_lst_t mp
    //     join mnu_prfle_itm_rel_t mpi on mp.mnu_prfle_id=mpi.mnu_prfle_id and mpi.a_in =1
    //     join mnu_itm_lst_t mi on mpi.mnu_itm_id=mi.mnu_itm_id
    //     join mrcht_mnu_prfle_rel_t um on um.mnu_prfle_id = mp.mnu_prfle_id
    //     left join mnu_itm_lst_t pmi on mpi.prnt_mnu_itm_id=pmi.mnu_itm_id
    //     left join mnu_itm_kywrd_lst_t ak on ak.mnu_itm_kywrd_id=mpi.mnu_itm_kywrd_id
    //     left join app_lst_t a on a.app_id=mi.app_id and um.app_id=mp.app_id
    //     where um.mrcht_usr_id=${user.mrcht_usr_id} and mi.a_in =1 and mi.cmpnt_id=${user.cmpnt_id} order by mpi.sqnce_id`;

    var QRY_TO_EXEC = `SELECT  a.app_nm,a.app_id,a.mnu_itm_id,a.mnu_itm_nm,a.mnu_itm_icn_tx,a.mnu_itm_url_tx,a.prnt_mnu_itm_id,a.prnt_mnu_itm_nm,a.prnt_mnu_icn_tx,m.stp_in,m.sqnce_id,
                        (CASE WHEN m.enble_in is NULL THEN 0 ELSE  m.enble_in END) as enble_in,
                        (CASE WHEN m.dsble_in is NULL THEN 1 ELSE  m.dsble_in END) as dsble_in,
                        m.usr_id 
                        FROM (SELECT  ap.app_nm,m.app_id,m.mnu_itm_id,m.mnu_itm_icn_tx,m.mnu_itm_url_tx, m.mnu_itm_nm, p.mrcht_usr_id, f.prnt_mnu_itm_id, 
                                mi.mnu_itm_nm as prnt_mnu_itm_nm, mi.mnu_itm_icn_tx as prnt_mnu_icn_tx,m.hdr_in
                                FROM mrcht_mnu_prfle_rel_t p
                                    JOIN mnu_prfle_lst_t pr on pr.mnu_prfle_id = p.mnu_prfle_id
                                    JOIN mnu_prfle_itm_rel_t f on f.mnu_prfle_id = pr.mnu_prfle_id
                                    JOIN mnu_itm_lst_t m on m.mnu_itm_id = f.mnu_itm_id 
                                    left join mnu_itm_lst_t mi on f.prnt_mnu_itm_id = mi.mnu_itm_id
                                    left join app_lst_t ap on ap.app_id=m.app_id and p.app_id=pr.app_id
                                WHERE p.mrcht_usr_id = ${user.mrcht_usr_id} and m.cmpnt_id = ${user.cmpnt_id}
                            ) a 
                    LEFT  JOIN mrcht_mnu_itm_rel_t m on m.usr_id = a.mrcht_usr_id AND m.mnu_itm_id = a.mnu_itm_id AND m.enble_in = 1 order by a.mnu_itm_id`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : actve_mnuitm_Mdl
* Description   : get merchant locations
******************************************************************************/
exports.actve_mnuitm_Mdl = (user, data) => {
    var fnm = "actve_mnuitm_Mdl"
    console.log(data)
    var QRY_TO_EXEC = `update mrcht_mnu_itm_rel_t set enble_in = 1, dsble_in = 0, u_ts = current_timestamp() where mnu_itm_id = ${data.mnu_itm_id} and usr_id = ${user.mrcht_usr_id}`;

    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


exports.check_mnu = (user, data, callback) => {
    var fnm = "check_mnu"
    console.log(data)
    var QRY_TO_EXEC = `select * from mrcht_mnu_itm_rel_t where mnu_itm_id = ${data.mnu_itm_id} and usr_id = ${user.mrcht_usr_id}`;
    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
        if (err) {
            callback(err, [])
        }
        else if (results.length == 0) {
            var QRY_TO_EXEC1 = `select * from mrcht_mnu_itm_rel_t where usr_id = ${user.mrcht_usr_id}`;
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm, (err, results1) => {
                if (err) {
                    callback(err, [])
                }
                else {
                    callback(err, results, results1)
                }
            })
        }
        else if (results.length > 0) {
            callback(err, results)
        }

    });
}

exports.insert_mnuitm_Mdl = (user, data) => {
    var fnm = "insert_mnuitm_Mdl"
    console.log(data)
    var QRY_TO_EXEC = `insert into mrcht_mnu_itm_rel_t (usr_id,mnu_itm_id,crte_usr_id,enble_in,dsble_in,sqnce_id,a_in,i_ts) values(${user.mrcht_usr_id},${data.mnu_itm_id},${user.mrcht_usr_id},1,0,${data.sqnce_id},1,current_timestamp())`;

    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

exports.inactve_mnuitm_Mdl = (user, id) => {
    var fnm = "inactve_mnuitm_Mdl"
    var QRY_TO_EXEC = `update mrcht_mnu_itm_rel_t set enble_in = 0, dsble_in = 1, u_ts = current_timestamp() where mnu_itm_id = ${id} and usr_id = ${user.mrcht_usr_id}`;

    ;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
exports.updt_sqnce_mnu_mdl = (user, data, callback) => {
    var fnm = "updt_sqnce_mnu_mdl"
console.log("sravani")
console.log(data)
var count = 0;
for (var i = 0; i < data.length; i++) {
    if(!data[i].prnt_mnu_itm_id){
        var QRY_TO_EXEC = `update mrcht_mnu_itm_rel_t set sqnce_id = ${data[i].sqnce_id}, u_ts = current_timestamp() where mnu_itm_id = ${data[i].mnu_itm_id} and usr_id = ${user.mrcht_usr_id}`;
    }
    else if(data[i].prnt_mnu_itm_id){
        for(var j=0; j < data[i].children.length; j++){
            console.log(data[i].children[j].mnu_itm_id)
            var QRY_TO_EXEC1 = `update mrcht_mnu_itm_rel_t set sqnce_id = ${data[i].sqnce_id}, u_ts = current_timestamp() where mnu_itm_id = ${data[i].children[j].mnu_itm_id} and usr_id = ${user.mrcht_usr_id}`;  
            console.log(QRY_TO_EXEC1)

            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC1, cntxtDtls, user,fnm)
        }
    }
    
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
        count++;
        console.log(count, data.length)
        if (count == data.length) {
            console.log("in last")
            callback(err, results)
        }

    });
}

}

/*****************************************************************************
* Function      : insrtMrchntApprvlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/

exports.insrtMrchntApprvlMdl = (data, user,callback) => {
    var fnm = "insrtMrchntApprvlMdl"
    console.log(data)
    var QRY_TO_EXEC = `insert into aprvl_lst_t (mnu_itm_id,grp_id,min_aprve_cnt,all_grp_aprve_in,create_usr_id,a_in) values (${data.mnu_itm_id},${data.grp_id},${data.min_aprvl_cnt},${data.all_grp_in},${data.mrchnt_usr_id},1)`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
        callback(err, results)
    });

}


/*****************************************************************************
* Function      : updateMrchntSetupMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntSetupMdl = (data, user, callback) => {
    var fnm = "updateMrchntSetupMdl"
    console.log(data)
   var QRY_TO_EXEC = 
   `update mrcht_mnu_itm_rel_t 
   set stp_in = 1             
   where mnu_itm_id = ${data.mnu_itm_id} And usr_id in 
   (
       select tt.mrcht_usr_id
       from 
       (
           SELECT m.mrcht_id,m.mrcht_usr_id,r.mnu_itm_id,r.stp_in FROM mrcht_usr_rel_t m 
   LEFT JOIN mrcht_mnu_itm_rel_t r ON m.mrcht_usr_id = r.usr_id
   where m.mrcht_id = ${data.mrchnt_id} GROUP BY m.mrcht_usr_id
       ) as tt
   )`;
    
    dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, (err, results) => {
  callback(err, results)
    });



}
/******************************************************************************/
exports.get_mrchntdetailsMdl = (id, user) => {
    var fnm = "get_mrchntdetailsMdl"
    var QRY_TO_EXEC = ` select * from mbrsp_dtl_t where  a_in = 1`;
    
    console.log("membership")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/******************************************************************************/
exports.get_userdetailsMdl = (user) => {
    var fnm = "get_userdetailsMdl"
    
    var QRY_TO_EXEC = `select t.usr_id,t.usr_nm,m.mbrsp_id,b.mbrsp_nm from usr_lst_t AS t INNER JOIN usr_mbrsp_rel_t AS m on t.usr_id=m.usr_id INNER JOIN mbrsp_dtl_t AS b ON m.mbrsp_id=b.mbrsp_id;`;
    
    console.log("--------------------")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm); 

}
/******************************************************************************/
exports.get_profilesMdl = (user) => {
    var fnm = "get_profilesMdl"
    
    var QRY_TO_EXEC = `select m.mnu_prfle_id,mp.mnu_itm_id,mp.mnu_itm_nm,m.mnu_prfle_nm from mnu_prfle_lst_t m
    join mnu_prfle_itm_rel_t as mn on mn.mnu_prfle_id = m.mnu_prfle_id
    join mnu_itm_lst_t as mp on mp.mnu_itm_id = mn.mnu_itm_id
    order by m.mnu_prfle_id,mp.mnu_itm_id;`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm); 
}

/*****************************************************************************
* Function      : get_outltCtgryMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.get_outltCtgryMdl = (user) => {
    var fnm = "get_outltCtgryMdl"
    var QRY_TO_EXEC = ` SELECT * FROM mrcht_otlt_ctgry_lst_t
                        WHERE a_in=1
                        ORDER BY otlt_ctgry_id`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}