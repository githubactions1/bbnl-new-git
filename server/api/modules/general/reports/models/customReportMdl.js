var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
async = require('async');


/*****************************************************************************
* Function      : getBldngTypsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getqrydtls = function (hyrchy_id, hyrchy_grp_id, query, user, callback) {
    var fnm = "getqrydtls"
    var QRY_TO_EXEC = `${query}`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/*****************************************************************************
* Function      : getBldngTypsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.saveSqlAsReportMdl = function (mrcht_usr_id, data, user, callback) {
    var fnm = "saveSqlAsReportMdl"
    // console.log(data.query);
    var QRY_TO_EXEC = `INSERT INTO sql_qry_lst_t (qry_tx,mrcht_usr_id, a_in, d_in, i_ts) VALUES (${sqldb.MySQLConPool.escape(data.query)},${mrcht_usr_id != null ? mrcht_usr_id : null}, '1', '0', current_timestamp())`;   
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function") {     
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    }

    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function      : addRprtMnuMdl
* Description   : To add report in menu list table
* Arguments     : callback function
******************************************************************************/
exports.addRprtMnuMdl = function (hyrchy_grp_id, hyrchy_id, data, user, callback) {
    var fnm= "addRprtMnuMdl"
    var QRY_TO_EXEC = `INSERT INTO rpt_lst_t (rpt_nm,rpt_desc_txt,rpt_typ_id,qry_id,excel_in,excel_nm,pdf_in,pdf_nm,rpt_pgn,cntns_id,a_in, i_ts) VALUES
     ('${data.report_name}','${data.report_desc_txt}','2', ${data.qry_id},${data.excel_ind},'${data.excel_fle_nm}',${data.pdf_in},'${data.pdf_fle_nm}','${data.pgntn}','${data.connectonId}', '1', current_timestamp()); `;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function      : getqueryMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getqueryMdl = function (data, user, callback) {
    var fnm = "getqueryMdl"
    console.log(data);
    var QRY_TO_EXEC = `select * from sql_qry_lst_t where qry_id=${data.queryid}`;
    console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};
/*****************************************************************************
* Function      : getgrpLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getgrpLstMdl = function (hyrchy_id, hyrchy_grp_id, user, callback) {
    var fnm = "getgrpLstMdl"
    var QRY_TO_EXEC = `select * from rpt_grp_lst_t`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

};

/*****************************************************************************
* Function      : getctgryLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getctgryLstMdl = function (hyrchy_id, hyrchy_grp_id, user,callback) {
    var fnm = "getctgryLstMdl"
    var QRY_TO_EXEC = `select * from rpt_ctgry_lst_t`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

};


/*****************************************************************************
* Function      : pstgrpsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.pstgrpsMdl = function (hyrchy_id, hyrchy_grp_id, mrcht_usr_id, data,user, callback) {
    var fnm = "pstgrpsMdl"
    var QRY_TO_EXEC = `INSERT INTO rpt_grp_rel_t (grp_id,rpt_id,a_in,i_ts) VALUES ('${data.groupid}','${data.reportid}','1', current_timestamp());`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

};



/*****************************************************************************
* Function      : pstctgrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.pstctgrsMdl = function (hyrchy_id, hyrchy_grp_id, mrcht_usr_id, data, user,callback) {
    var fnm = "pstctgrsMdl"
    var QRY_TO_EXEC = `INSERT INTO rpt_ctgry_rel_t (rpt_ctgry_id,rpt_id,a_in,i_ts) VALUES ('${data.categoryid}','${data.reportid}','1', current_timestamp());`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

};

/*****************************************************************************
* Function      : getfltrsLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getfltrsLstMdl = function (hyrchy_id, hyrchy_grp_id, user,callback) {
    var fnm = "getfltrsLstMdl"
    var QRY_TO_EXEC = `select * from rpt_fltr_lst_t`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

};

/*****************************************************************************
* Function      : pstfltrsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.pstfltrsMdl = function (hyrchy_id, hyrchy_grp_id, mrcht_usr_id, data, user,callback) {
    var fnm = "pstfltrsMdl"
    let dlmtr = ' ,';
    let sbr_qry = ' '
    var QRY_TO_EXEC = `INSERT INTO rpt_fltr_rel_t (rpt_id, fltr_id, crte_usr_id) VALUES`;
    for (i = 0; i < data.fltrid.length; i++) {
        if (i + 1 == data.fltrid.length) {
            dlmtr = ' ;'
        }
        sbr_qry += ` (${data.reportid}, ${data.fltrid[i]} , ${mrcht_usr_id}) ${dlmtr} `;
    }
    QRY_TO_EXEC += sbr_qry;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};


/*****************************************************************************
* Function      : getrptfltrsrltnMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getrptfltrsrltnMdl = function (hyrchy_id, hyrchy_grp_id, mrcht_usr_id, data,user, callback) {
    var fnm = "getrptfltrsrltnMdl"
    var QRY_TO_EXEC = `select r.rpt_nm,r.rpt_desc_txt,r.rpt_clr,r.rpt_url_txt,r.rpt_typ_id,r.qry_id,f.fltr_id,m.fltr_nm,m.fltr_dscn_tx from 
    rpt_lst_t as r
    LEFT JOIN rpt_fltr_rel_t as f on f.rpt_id = r.rpt_id
    left join rpt_fltr_lst_t as m on m.fltr_id = f.fltr_id
    where r.rpt_id=${data.rptid.rptid}`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

};




/*****************************************************************************
* Function      : pstfltrstwoMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.pstfltrstwoMdl = function (hyrchy_id, hyrchy_grp_id, mrcht_usr_id, data, user,callback) {
    var fnm = "pstfltrstwoMdl"
    let dlmtr = ' ,';
    let sbr_qry = ' '


    var QRY_TO_EXEC = `INSERT INTO rpt_fltr_rel_t (rpt_id, fltr_id, fltr_lbl_tx,dflt_vlue_tx,fltr_varble_tx,fltr_sqnce_id,acpt_ind,acpt_dsc_tx,crte_usr_id) VALUES`;
    for (i = 0; i < data.fltrid.length; i++) {

        for (j = 0; j < data.fltrid[i].inputbox.length; j++) {
            if (i + 1 == data.fltrid.length && j + 1 == data.fltrid[i].inputbox.length) {
                dlmtr = ' ;'
            }
            sbr_qry += ` (${data.reportid}, ${data.fltrid[i].fltr_id} ,'${data.fltrid[i].inputbox[j].inputnm}','${data.fltrid[i].inputbox[j].default}','${data.fltrid[i].inputbox[j].variable}','${data.fltrid[i].inputbox[j].sequence}','${data.fltrid[i].inputbox[j].accept}',${sqldb.MySQLConPool.escape(data.fltrid[i].inputbox[j].acceptdes)}, ${mrcht_usr_id}) ${dlmtr} `;
        }

    }
    QRY_TO_EXEC += sbr_qry;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
};


/*****************************************************************************
* Function      : getallRptDetailsMdl
* Description   : 
* Arguments     : callback function
* Change History :
 11/02/2020     - sunil Mjulagada - Updated the query to check if the user have permissions
******************************************************************************/
exports.getallRptDetailsMdl = function (hyrchy_id, hyrchy_grp_id, mrcht_usr_id, data, user) {
    var fnm= "getallRptDetailsMdl"
    var QRY_TO_EXEC = `SELECT r.rpt_id,r.rpt_nm,r.rpt_desc_txt,r.rpt_typ_id,r.qry_id,r.excel_in,r.excel_nm,r.pdf_in,r.pdf_nm,r.cntns_id,f.fltr_id,f.fltr_sqnce_id,f.fltr_lbl_tx,f.fltr_varble_tx,f.dflt_vlue_tx,s.qry_tx,fl.fltr_nm,r.rpt_pgn,f.acpt_ind,f.acpt_dsc_tx
    FROM rpt_lst_t as r
    JOIN rpt_prfle_rel_t rp on r.rpt_id =rp.rpt_id AND r.rpt_id = ${data.rpt_id} 
    JOIN mrcht_rpt_prfle_rel_t up ON up.rpt_prfle_id=rp.mnu_prfle_id AND up.mrcht_usr_id=${mrcht_usr_id} 
    JOIN sql_qry_lst_t as s on s.qry_id = r.qry_id 
    LEFT JOIN rpt_fltr_rel_t as f on f.rpt_id = r.rpt_id and f.a_in = 1
    LEFT JOIN rpt_fltr_lst_t as fl on fl.fltr_id = f.fltr_id
    GROUP BY f.fltr_sqnce_id,fl.fltr_id
    ORDER BY fl.fltr_id`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : getallquryDetailsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getallquryDetailsMdl = function (data, reportdata, user) {
    var fnm = "getallquryDetailsMdl"
    var QRY_TO_EXEC = `${data}`;
    log.info("Executing the query for report :: " + QRY_TO_EXEC)
    // console.log(QRY_TO_EXEC)
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    if (reportdata[0].cntns_id == 1) {
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    }
    else if (reportdata[0].cntns_id == 2) {
        return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    }


};





/*****************************************************************************
* Function      : getallcolumnDetailsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getallcolumnDetailsMdl = function (data, user, callback) {
    var fnm = "getallcolumnDetailsMdl"
    var QRY_TO_EXEC = `SELECT * FROM rpt_sql_clmns_lst_t WHERE qry_id = ${data[0].qry_id} AND a_in = 1 ORDER BY sqnce_id`;
    // console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function      : getdsrtctLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getdsrtctLstMdl = function (id, user, callback) {
    var fnm = "getdsrtctLstMdl"
    if (id == 0) {
        condition = ``;
    }
    if (id > 0) {
        condition = ``
    }
    var QRY_TO_EXEC = `select * from dstrt_lst_t ${condition} where a_in = 1 ORDER BY dstrt_nm ASC`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : getmndlLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getmndlLstMdl = function (id, user, callback) {
    var fnm = "getmndlLstMdl"
    if (id == 0) {
        condition = ``;
    }
    if (id > 0) {
        condition = `where dstrt_id = ${id}`
    }
    var QRY_TO_EXEC = `select * from mndl_lst_t ${condition} ORDER BY mndl_id`;


    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/*****************************************************************************
* Function      : getcolumnDetailsForEditMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getcolumnDetailsForEditMdl = function (id, user, callback) {
    var fnm = "getcolumnDetailsForEditMdl"
  
    var QRY_TO_EXEC = `select rpt_id,r.qry_id,clmn_nm,dsply_nm,c.rpt_clumn_id,dta_type,vsble_in,fltr_in,rpt_url_tx,rpt_prmtrs_tx,fltr_prmtrs_tx,rfrnce_rpt_id,wdth_ct,hght_ct,sqnce_id,algnmnt_txt,smry_type_tx,smry_dsply_frmt_tx,
    vlu_frmt_tx,grp_smry_type_tx,grp_smry_shw_grp_ftr_in,grp_smry_dsply_frmt_tx,grp_indx_id
     from rpt_lst_t as r 
    LEFT JOIN rpt_sql_clmns_lst_t as c on c.qry_id=r.qry_id
    where rpt_id=${id}
    GROUP BY rpt_id,c.qry_id,c.rpt_clumn_id
    ORDER BY rpt_id,c.qry_id,c.sqnce_id`;

    console.log("TTTTTTTHHHHHHHHHisqueryismineeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    console.log(QRY_TO_EXEC)

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm,function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);

};

/*****************************************************************************
* Function      : getdesgntnLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getdesgntnLstMdl = function (user,callback) {
    var fnm = "getdesgntnLstMdl"
    var QRY_TO_EXEC = `select * from mrcht_dsgn_lst_t order by dsgn_id`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function      : pstprflestwoMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.pstprflestwoMdl = function (data, user, callback) {
    var fnm = "pstprflestwoMdl"
    var QRY_TO_EXEC = `select  * from mrcht_rpt_prfle_rel_t  where mrcht_usr_id = ${data.usrid}`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : pstrptprflestwoMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.pstrptprflestwoMdl = function (prfle, rpt, user, callback) {
    var fnm = "pstrptprflestwoMdl"
    var QRY_TO_EXEC = `INSERT INTO rpt_prfle_rel_t(mnu_prfle_id,rpt_id,a_in,i_ts)values(${prfle},${rpt.reportid},'1', current_timestamp())`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : pstForDefaultDetails
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.pstForDefaultDetails = function (data, user, callback) {
    var fnm = "pstForDefaultDetails"
    var QRY_TO_EXEC = `select r.rpt_id,r.rpt_nm,r.rpt_typ_id,r.qry_id,r.cntns_id,f.fltr_id,f.fltr_sqnce_id,f.fltr_lbl_tx,f.fltr_varble_tx,f.dflt_vlue_tx,s.qry_tx,fl.fltr_nm,f.acpt_ind,f.acpt_dsc_tx
    from rpt_lst_t as r
    left join rpt_fltr_rel_t as f on f.rpt_id = r.rpt_id
    left join rpt_fltr_lst_t as fl on fl.fltr_id = f.fltr_id
    join sql_qry_lst_t as s on s.qry_id = r.qry_id
    where r.rpt_id = '${data[0]}'
    order by fl.fltr_id`;
    // console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : updateFltrsData
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateFltrsData = function (query, querydata, data, user, callback) {
    var fnm = "updateFltrsData"
    var input_str = query
    // console.log(data[1].type);
    for (i = 0; i < data[1].length; i++) {
        input_str = input_str.replace("$$" + data[1][i].type + "$$", data[1][i].value);

    }

    var QRY_TO_EXEC = `${input_str}`;
    console.log(QRY_TO_EXEC)
    // if (callback && typeof callback == "function")
    //     dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
    //         callback(err, results);
    //         return;
    //     });
    // else
    if (querydata[0].cntns_id == 1) {
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    }
    else if (querydata[0].cntns_id == 2) {
        return dbutil.execQuery(sqldb.BSSBatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
    }


};


/*****************************************************************************
* Function      : rptcolumnsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.rptcolumnsMdl = function (data, user, callback) {
    var fnm = "rptcolumnsMdl"
    console.log(data.rpt_id);
    var QRY_TO_EXEC = `select rpt_id,rpt_nm,rpt_desc_txt,q.qry_id,qry_tx from 
    rpt_lst_t as r
    join sql_qry_lst_t as q on q.qry_id = r.qry_id
    where r.rpt_id = ${data.rpt_id} and r.a_in=1`;
    // console.log(QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/*****************************************************************************
* Function      : insertcolumnsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertcolumnsMdl = function (clumndata, reportdata, user, callback) {
    var fnm = "insertcolumnsMdl"
    let dlmtr = ' ,';
    let sbr_qry = ' '
    var QRY_TO_EXEC = `INSERT INTO rpt_sql_clmns_lst_t (qry_id,clmn_nm,dsply_nm,vsble_in,fltr_in,rfrnce_rpt_id,rpt_url_tx,rpt_prmtrs_tx,fltr_prmtrs_tx,sqnce_id,wdth_ct,a_in,i_ts) VALUES`;
    for (i = 0; i < clumndata.columnskeys.length; i++) {
        if (i + 1 == clumndata.columnskeys.length) {
            dlmtr = ' ;'
        }
        sbr_qry += ` (${reportdata[0].qry_id}, '${clumndata.columnskeys[i].type}', '${clumndata.columnskeys[i].displaynm}' , '${clumndata.columnskeys[i].visibleonrpt}', '${clumndata.columnskeys[i].filterin}','${clumndata.columnskeys[i].refanrpt}','${clumndata.columnskeys[i].rpturl}','${clumndata.columnskeys[i].rptparameters}','${clumndata.columnskeys[i].rptfilterparameters}','${clumndata.columnskeys[i].csequence}','${clumndata.columnskeys[i].wdth_ct}',1, current_timestamp()) ${dlmtr} `;
    }
    QRY_TO_EXEC += sbr_qry;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/*****************************************************************************
* Function      : chckRptMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.chckRptMdl = function (user) {
    var fnm = "chckRptMdl"
    // var QRY_TO_EXEC = `select mnu_prfle_id from mrcht_mnu_prfle_rel_t  where mrcht_usr_id=${user.user_id}`;
    var QRY_TO_EXEC = `select rpt_prfle_id from mrcht_rpt_prfle_rel_t where mrcht_usr_id = ${user.user_id};`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : chckRptUserMDl
* Description   : 
* Arguments     : callback function
* Change History :
 11/02/2020     - sunil Mjulagada - Updated the query to join rpt_prfle_rel_t and get details about user and profile in single query
******************************************************************************/
exports.chckRptUserMDl = function (rptid, user) {
    var fnm = "chckRptUserMDl"
    var QRY_TO_EXEC = ` SELECT 1 
                        FROM rpt_prfle_rel_t rp 
                        JOIN mrcht_rpt_prfle_rel_t up ON up.rpt_prfle_id=rp.mnu_prfle_id
                        WHERE up.mrcht_usr_id=${user.user_id} AND rp.rpt_id=${rptid}`;

    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};


/*****************************************************************************
* Function      : gercustmRptDtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.gercustmRptDtlsMdl = function (mrcht_usr_id, user, callback) {
    var fnm = "gercustmRptDtlsMdl"
    var QRY_TO_EXEC =  `select r.rpt_id,r.rpt_nm,r.rpt_desc_txt,r.excel_in,r.excel_nm,r.pdf_in,r.pdf_nm,r.rpt_pgn,g.grp_id,g.grp_nm,c.rpt_ctgry_id,c.rpt_ctgry_nm,f.fltr_nm,fr.fltr_id,fr.fltr_sqnce_id,fr.fltr_lbl_tx,fr.fltr_varble_tx,fr.dflt_vlue_tx,fr.acpt_ind,
    fr.acpt_dsc_tx,q.qry_id,q.qry_tx,cls.rpt_clumn_id,cls.clmn_nm,cls.dsply_nm,cls.vsble_in,cls.fltr_in,cls.rfrnce_rpt_id,cls.rpt_url_tx,cls.rpt_prmtrs_tx,cls.fltr_prmtrs_tx,cls.wdth_ct,cls.hght_ct,cls.sqnce_id,cls.grp_smry_type_tx,cls.grp_smry_shw_grp_ftr_in,cls.grp_smry_dsply_frmt_tx,cls.grp_indx_id
    from rpt_lst_t as r
    join rpt_prfle_rel_t as p on p.rpt_id = r.rpt_id AND r.a_in=1 and r.rpt_typ_id =2
    join rpt_grp_rel_t as gr on gr.rpt_id = r.rpt_id
    join rpt_grp_lst_t as g on g.grp_id = gr.grp_id
    join rpt_ctgry_rel_t as cr on cr.rpt_id = r.rpt_id
    join rpt_ctgry_lst_t as c on c.rpt_ctgry_id = cr.rpt_ctgry_id
    join rpt_fltr_rel_t as fr on  fr.rpt_id = r.rpt_id
    join rpt_fltr_lst_t as f on  f.fltr_id = fr.fltr_id
    join sql_qry_lst_t as q on q.qry_id = r.qry_id
    LEFT join rpt_sql_clmns_lst_t as cls on cls.qry_id = r.qry_id
    join mrcht_rpt_prfle_rel_t as rp on rp.rpt_prfle_id = p.mnu_prfle_id
    GROUP BY r.rpt_id,r.qry_id,fr.fltr_id`
    // `select r.rpt_id,r.rpt_nm,r.rpt_desc_txt,r.excel_in,r.excel_nm,r.pdf_in,r.pdf_nm,r.rpt_pgn,g.grp_id,g.grp_nm,c.rpt_ctgry_id,c.rpt_ctgry_nm,f.fltr_nm,fr.fltr_id,fr.fltr_sqnce_id,fr.fltr_lbl_tx,fr.fltr_varble_tx,fr.dflt_vlue_tx,fr.acpt_ind,
    // fr.acpt_dsc_tx,q.qry_id,q.qry_tx,cls.rpt_clumn_id,cls.clmn_nm,cls.dsply_nm,cls.vsble_in,cls.fltr_in,cls.rfrnce_rpt_id,cls.rpt_url_tx,cls.rpt_prmtrs_tx,cls.fltr_prmtrs_tx,cls.wdth_ct,cls.hght_ct,cls.sqnce_id,cls.grp_smry_type_tx,cls.grp_smry_shw_grp_ftr_in,cls.grp_smry_dsply_frmt_tx,cls.grp_indx_id
    //  from 
    // rpt_lst_t as r
    // join rpt_prfle_rel_t as p on p.rpt_id = r.rpt_id
    // join rpt_grp_rel_t as gr on gr.rpt_id = r.rpt_id
    // join rpt_grp_lst_t as g on g.grp_id = gr.grp_id
    // join rpt_ctgry_rel_t as cr on cr.rpt_id = r.rpt_id
    // join rpt_ctgry_lst_t as c on c.rpt_ctgry_id = cr.rpt_ctgry_id
    // join rpt_fltr_rel_t as fr on  fr.rpt_id = r.rpt_id
    // join rpt_fltr_lst_t as f on  f.fltr_id = fr.fltr_id
    // join sql_qry_lst_t as q on q.qry_id = r.qry_id
    // join rpt_sql_clmns_lst_t as cls on cls.qry_id = r.qry_id
    // join mrcht_rpt_prfle_rel_t as rp on rp.rpt_prfle_id = p.mnu_prfle_id
    //  where r.a_in=1 and r.rpt_typ_id =2`;
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
* Function      : updatecolumnsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updatecolumnsMdl = function (clmsdata, qry_id, user, callback) {
    var fnm = "updatecolumnsMdl"
  
    // var QRY_TO_EXEC = `INSERT INTO rpt_sql_clmns_lst_t (dsply_nm,clmn_nm,vsble_in,fltr_in, rfrnce_rpt_id, rpt_url_tx, rpt_prmtrs_tx, fltr_prmtrs_tx, wdth_ct, sqnce_id,qry_id,dta_type,a_in,i_ts) VALUES
    // ('${clmsdata.displaynm}','${clmsdata.type}','${clmsdata.visibleonrpt}','${clmsdata.filterin}','${clmsdata.refanrpt}', '${clmsdata.rpturl}',
    //  '${clmsdata.rptparameters}','${clmsdata.rptfilterparameters}','${clmsdata.wdth_ct}', '${clmsdata.csequence}','${qry_id}','${clmsdata.datatype}',1,CURRENT_TIMESTAMP())`;

    var QRY_TO_EXEC =`UPDATE rpt_sql_clmns_lst_t SET dsply_nm = '${clmsdata.displaynm}', vsble_in='${clmsdata.visibleonrpt}', fltr_in='${clmsdata.filterin}',
    rfrnce_rpt_id='${clmsdata.refanrpt}',rpt_url_tx='${clmsdata.rpturl}',rpt_prmtrs_tx='${clmsdata.rptparameters}',fltr_prmtrs_tx='${clmsdata.rptfilterparameters}',
    wdth_ct='${clmsdata.wdth_ct}',sqnce_id='${clmsdata.csequence}',qry_id='${qry_id}',dta_type='${clmsdata.datatype}',a_in=1,u_ts=CURRENT_TIMESTAMP()
      where rpt_clumn_id = '${clmsdata.clmnId}'`

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
* Function      : updatereportDataMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updatereportDataMdl = function (upreportData, qryid, user, callback) {
    var fnm = "updatereportDataMdl"
    var QRY_TO_EXEC = ` UPDATE rpt_lst_t SET rpt_nm = '${upreportData.rpt_name}', rpt_desc_txt = '${upreportData.rpt_desc}' , excel_in = '${upreportData.rpt_excel_in}',excel_nm = '${upreportData.rpt_excel_name}',pdf_in = '${upreportData.rpt_pdf_in}',pdf_nm = '${upreportData.rpt_pdf_name}',rpt_pgn = '${upreportData.rpt_pgntn}'
    where rpt_id = '${upreportData.rpt_id}'`;
    //  console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/*****************************************************************************
* Function      : updatequeryDataMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updatequeryDataMdl = function (upreportData, qryid, user, callback) {
    var fnm = "updatequeryDataMdl"
    var QRY_TO_EXEC = `UPDATE sql_qry_lst_t SET qry_tx = ${sqldb.MySQLConPool.escape(upreportData.updQuery)} where qry_id='${qryid}'`;
    //  console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : updateGroup
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateGroup = function (upreportData, qryid, user, callback) {
    var fnm = "updateGroup"
    var QRY_TO_EXEC = `UPDATE rpt_grp_rel_t SET grp_id = '${upreportData.rpt_grp_id}' where rpt_id='${upreportData.rpt_id}'`;
    //  console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : updateCategory
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateCategory = function (upreportData, qryid, user, callback) {
    var fnm = "updateCategory"
    var QRY_TO_EXEC = `UPDATE rpt_ctgry_rel_t SET rpt_ctgry_id = '${upreportData.rpt_ctgry_id}' where rpt_id='${upreportData.rpt_id}'`;
    //  console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : selctFlitrs
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.selctFlitrs = function (upreportData, qryid, user, callback) {
    var fnm = "selctFlitrs"
    var QRY_TO_EXEC = `select fltr_id from rpt_fltr_rel_t where rpt_id='${upreportData.rpt_id}'`;
    //  console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};




/*****************************************************************************
* Function      : removeFltrs
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.removeFltrs = function (upreportData, fltrid, user, callback) {
    var fnm = "selctFlitrs"
    if (fltrid.length > 0) {
        var QRY_TO_EXEC = `update rpt_fltr_rel_t set a_in=0 where fltr_id in (${fltrid})  and rpt_id = '${upreportData.rpt_id}'`;
    }
    else {
        var QRY_TO_EXEC = `select * from rpt_fltr_rel_t`;
    }

    //  console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};




/*****************************************************************************
* Function      : updateFilters
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateFilters = function (fltrsdata, inputboxdata, upreportData, user, callback) {
    var fnm = "updateFilters"
    var QRY_TO_EXEC = `update rpt_fltr_rel_t set fltr_sqnce_id = '${inputboxdata.sequence}' , fltr_lbl_tx = '${inputboxdata.sequence}', dflt_vlue_tx = '${inputboxdata.default}', acpt_ind= '${inputboxdata.accept}', acpt_dsc_tx= '${inputboxdata.acceptdes}',a_in=1  where rpt_id = '${upreportData.rpt_id}' and fltr_id = '${fltrsdata.fltr_id}' and fltr_varble_tx = '${inputboxdata.variable}'`;
    //  console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : insertFltrs
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insertFltrs = function (bodydata, insertFltrsdata, mrcht_usr_id, user, callback) {
    var fnm = "insertFltrs"
    let dlmtr = ' ,';
    let sbr_qry = ' '


    var QRY_TO_EXEC = `INSERT INTO rpt_fltr_rel_t (rpt_id, fltr_id, fltr_lbl_tx,dflt_vlue_tx,fltr_varble_tx,fltr_sqnce_id,acpt_ind,acpt_dsc_tx,crte_usr_id) VALUES`;
    for (i = 0; i < insertFltrsdata.length; i++) {

        for (j = 0; j < insertFltrsdata[i].inputbox.length; j++) {
            if (i + 1 == insertFltrsdata.length && j + 1 == insertFltrsdata[i].inputbox.length) {
                dlmtr = ' ;'
            }
            sbr_qry += ` (${bodydata.rpt_id}, ${insertFltrsdata[i].fltr_id} ,'${insertFltrsdata[i].inputbox[j].inputnm}','${insertFltrsdata[i].inputbox[j].default}','${insertFltrsdata[i].inputbox[j].variable}','${insertFltrsdata[i].inputbox[j].sequence}','${insertFltrsdata[i].inputbox[j].accept}',${sqldb.MySQLConPool.escape(insertFltrsdata[i].inputbox[j].acceptdes)}, ${mrcht_usr_id}) ${dlmtr} `;
        }

    }
    QRY_TO_EXEC += sbr_qry;
    // console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};





/*****************************************************************************
* Function      : getStatusrprtMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getStatusrprtMdl = function (mrcht_usr_id, data, user, callback) {
    var fnm = "getStatusrprtMdl"
    var QRY_TO_EXEC = `INSERT INTO rpt_ard_dtl_t (rpt_id,usr_id,rpt_opn_ts,i_ts) VALUES ('${data.rprId}','${mrcht_usr_id}',current_timestamp(),current_timestamp());`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/*****************************************************************************
* Function      : getcustomreportsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getcustomreportsMdl = function (hyrchy_id, hyrchy_grp_id, user, callback) {
    var fnm = "getcustomreportsMdl"
    var QRY_TO_EXEC = `select ROW_NUMBER() OVER (ORDER BY r.rpt_id) as sno,r.rpt_id,rpt_nm,rpt_desc_txt,rpt_ctgry_nm,grp_nm,DATE_FORMAT(max(r.i_ts), '%Y/%m/%d  %h:%i') as crte_ts,DATE_FORMAT(max(r.u_ts), '%Y/%m/%d  %h:%i') as updte_ts,u.mrcht_usr_nm,u2.mrcht_usr_nm as updte_usr_nm
    from rpt_lst_t as r
    left join rpt_grp_rel_t as gr on gr.rpt_id = r.rpt_id
    left join rpt_grp_lst_t as g on g.grp_id = gr.grp_id
    left join rpt_ctgry_rel_t as cr on cr.rpt_id = r.rpt_id
    left join rpt_ctgry_lst_t as c on c.rpt_ctgry_id = cr.rpt_ctgry_id
    left join mrcht_usr_lst_t as u on u.mrcht_usr_id = r.crte_usr_id
    left join mrcht_usr_lst_t as u2 on u2.mrcht_usr_id = r.updte_usr_id
    WHERE r.a_in = 1
    group by r.rpt_id
    order by r.rpt_id `;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/*****************************************************************************
* Function      : getStandedvariablesMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getStandedvariablesMdl = function (hyrchy_id, hyrchy_grp_id, user, callback) {
    var fnm = "getStandedvariablesMdl"
    var QRY_TO_EXEC = `select * from rpt_stnd_vrbles_lst_t order by vrble_id`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/*****************************************************************************
* Function      : getstdCodeMSL
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getstdCodeMDL = function (dist_id, user, callback) {
    var fnm = "getstdCodeMDL"
    var QRY_TO_EXEC = `SELECT dstrt_id,mndl_id,std_cd,vlge_nu FROM vlge_lst_t WHERE dstrt_id = ${dist_id} GROUP BY std_cd ORDER BY std_cd`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/*****************************************************************************
* Function      : getstdCodeMandalsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getstdCodeMandalsMdl = function (dist_id, mndl_id, std_cd, user, callback) {
    var fnm = "getstdCodeMandalsMdl"
    var QRY_TO_EXEC = `SELECT v.dstrt_id,m.mndl_nu,m.mndl_nm
    FROM vlge_lst_t v
    JOIN mndl_lst_t m ON m.mndl_nu = v.mndl_id
    WHERE v.dstrt_id = ${dist_id} AND v.mndl_id = ${mndl_id} AND v.std_cd = ${std_cd} 
    GROUP BY v.mndl_id ORDER BY v.mndl_id`;
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
* Function      : getDbconnectionMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getDbconnectionMdl = function (hyrchy_id, hyrchy_grp_id, user, callback) {
    var fnm = "getDbconnectionMdl"
    var QRY_TO_EXEC = `select * from db_cntns_dtl_t order by cntns_id`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

