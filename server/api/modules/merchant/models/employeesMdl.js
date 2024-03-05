var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);


/*****************************************************************************
* Function      : getMrchntEmplsLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntEmplsLstMdl = (mrchntID) => {
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
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function      : insrtMrchntEmpGrpMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntEmpGrpMdl = (data) => {
    var fnm = "insrtMrchntEmpGrpMdl"
    var QRY_TO_EXEC = `  insert into mrcht_emp_grp_lst_t (mrcht_id,grp_nm, grp_dsc) values ('${data.mrcht_id}', '${data.grpName}','${data.grpDesc}'); `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}


/*****************************************************************************
* Function      : updateMrchntEmpGrpMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateMrchntEmpGrpMdl = (data, callback) => {
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
        
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, (err, results) => {
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
exports.insrtMrchntEmpGrpRelMdl = (id, data, callback) => {
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
        
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '',fnm, (err, results) => {
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
exports.getMrchntEmpbyGrpsMdl = (mrchntID) => {
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
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

/*****************************************************************************
* Function      : getMrchntEmpbyGrpsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getMrchntEmpGrpsMdl = (mrchntID) => {
    var fnm = "getMrchntEmpGrpsMdl"
    var QRY_TO_EXEC = `SELECT g.* , COUNT(e.grp_id) as cnt FROM mrcht_emp_grp_lst_t g LEFT JOIN  mrcht_emp_grp_rel_t e ON g.grp_id = e.grp_id WHERE e.d_ts is NULL AND g.mrcht_id = ${mrchntID} GROUP BY  g.grp_id ORDER BY g.grp_id; `
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}



/*****************************************************************************
* Function      : insrtMrchntEmpCtrlMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtMrchntEmpMdl = (data, callback) => {
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
            return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, function (err, results) {
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
        
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, function (err, results) {
          
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
exports.insrtMrchntEmpRelMdl = (id, data, callback) => {
    var fnm = "insrtMrchntEmpRelMdl"
    console.log("insrtMrchntEmpRelMdl")
    var QRY_TO_EXEC = `insert into mrcht_emplye_rel_t (mrcht_id,emplye_id,dprnt_id,dsgn_id,crnt_in,otlt_id,i_ts) values(${data.mrcht_id},${id},'${data.dprnt_id}','${data.dsgn_id}','${data.crnt_in}','${data.otlt_id}',current_timestamp()) `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, function (err, results) {
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
    var fnm = "insrtEmpSlryBrkp"
    console.log("insrtEmpSlryBrkp")
    var QRY_TO_EXEC = `insert into slry_brkp_dtl_t (emple_id) values(${id}) `;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, function (err, results) {
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
exports.updateMrchntEmpMdl = (data, callback) => {
    var fnm = "updateMrchntEmpMdl"
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
            
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, (err, results) => {
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
        

        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, (err, mrch_results) => {
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
exports.udtMrchntEmpRelMdl = (udtempdata, callback) => {
    var fnm = "udtMrchntEmpRelMdl"
    var QRY_TO_EXEC = `update mrcht_emplye_rel_t set dprnt_id = ${udtempdata.dprnt_id},dsgn_id = ${udtempdata.dsgn_id}, otlt_id = ${udtempdata.otlt_id}, u_ts=current_timestamp() where emplye_id = ${udtempdata.emple_id}`;
    ;
    // return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, function (err, results) {
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
exports.updtSlyCmpTable = (data) => {
    var fnm = "updtSlyCmpTable"
    console.log("-----------------------------------")
    if (data.hra == null) { data.hra = '' }
    var QRY_TO_EXEC = `insert into slry_brkp_dtl_t(emple_id, basic, hra, esi, pf, ctc, mnthly_grss, 
        dly_wgs, slry_ctgry_id, is_prmnt_in, slry_crdt_bnk_id, mrcht_bnk_acnt_no, i_ts) values(${data.emple_id}, '${data.bsc_slry}', '${data.hra}', '${data.esi}', '${data.pf}', '${data.ctc}', '${data.mnthly_grss}', ' ${data.day_wgs}', ${data.slyCtgryId}, ${data.prmnt_in}, ${data.slry_crdt_bnk_id}, '${data.mrcht_bnk_acnt_no}', CURRENT_TIMESTAMP())
        on duplicate key update basic = ${data.bsc_slry}, hra = ${data.hra}, esi = ${data.esi}, pf = ${data.pf}, ctc = ${data.ctc}, mnthly_grss = ${data.mnthly_grss}, dly_wgs = ${data.day_wgs}, slry_ctgry_id = ${data.slyCtgryId}, is_prmnt_in = ${data.prmnt_in}, slry_crdt_bnk_id = ${data.slry_crdt_bnk_id}, mrcht_bnk_acnt_no = '${data.mrcht_bnk_acnt_no}', u_ts =   CURRENT_TIMESTAMP();`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}




/*****************************************************************************
* Function      : deltMrchntEmpMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deltMrchntEmpMdl = (empId) => {
    var fnm = "deltMrchntEmpMdl"
    var QRY_TO_EXEC = `update mrcht_emple_lst_t set a_in=0,u_ts=current_timestamp() where emple_id=${empId}`;
    
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
}

