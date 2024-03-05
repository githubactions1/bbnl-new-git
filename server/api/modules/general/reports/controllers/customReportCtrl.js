// import * as _ from 'lodash';
var _ = require('lodash');
var log = require(appRoot + '/utils/logmessages');
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
// var jsonUtils = require(appRoot + '/utils/json.utils');

var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

// Model Inclusions
var sqlMdl = require(appRoot + '/server/api/modules/general/reports/models/customReportMdl');
/**************************************************************************************
* Controller     : sqlexecutioncount
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 29/11/2019     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getqueryDetails = function (req, res) {
    var fnm = "getqueryDetails";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var query = req.params.id;
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    // Model gets called Here 
    sqlMdl.getqrydtls(hyrchy_id, hyrchy_grp_id, query, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : saveSqlAsReport
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
 29/11/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.saveSqlAsReport = function (req, res) {
    var fnm = "saveSqlAsReport";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var mrcht_usr_id = req.user.mrcht_usr_id;
    sqlMdl.saveSqlAsReportMdl(mrcht_usr_id, req.body.data, req.user, (err, results) => {
        // console.log(":::::::results::::::::::::::")
        if (err) {
            df.formatSucessRes(req, res, [], cntxtDtls, fnm, {});
        }
        else {
            // console.log(results.insertId)
            if (results.insertId != 0) {
                req.body.data.qry_id = results.insertId;
                sqlMdl.addRprtMnuMdl(hyrchy_grp_id, hyrchy_id, req.body.data, req.user)
                    .then(function (rptMnuData) {
                        df.formatSucessRes(req, res, rptMnuData, cntxtDtls, fnm, {});
                    }, function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
            else {
                df.formatSucessRes(req, res, [], cntxtDtls, fnm, {});
            }

        }

    })


}

/**************************************************************************************
* Controller     : getquery
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
 30/11/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.getquery = function (req, res) {
    var fnm = "getquery";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var mrcht_usr_id = req.user.mrcht_usr_id;
    sqlMdl.getqueryMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : getgrpLst
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 3/12/2019     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getgrpLst = function (req, res) {
    var fnm = "getgrpLst";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    // Model gets called Here 
    sqlMdl.getgrpLstMdl(hyrchy_id, hyrchy_grp_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getctgryLst
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 3/12/2019     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getctgryLst = function (req, res) {
    var fnm = "getctgryLst";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    // Model gets called Here 
    sqlMdl.getctgryLstMdl(hyrchy_id, hyrchy_grp_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : pstgrps
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
3/12/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.pstgrps = function (req, res) {
    var fnm = "pstgrps";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var mrcht_usr_id = req.user.mrcht_usr_id;
    sqlMdl.pstgrpsMdl(hyrchy_grp_id, hyrchy_id, mrcht_usr_id, req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : pstctgrs
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
 3/12/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.pstctgrs = function (req, res) {
    var fnm = "pstctgrs";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var mrcht_usr_id = req.user.mrcht_usr_id;
    sqlMdl.pstctgrsMdl(hyrchy_grp_id, hyrchy_id, mrcht_usr_id, req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : getfltrsLst
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 3/12/2019     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getfltrsLst = function (req, res) {
    var fnm = "getfltrsLst";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    // Model gets called Here 
    sqlMdl.getfltrsLstMdl(hyrchy_id, hyrchy_grp_id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : pstfiltrs
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
3/12/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.pstfiltrs = function (req, res) {
    var fnm = "pstfiltrs";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var mrcht_usr_id = req.user.mrcht_usr_id;
    sqlMdl.pstfltrsMdl(hyrchy_grp_id, hyrchy_id, mrcht_usr_id, req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}



/**************************************************************************************
* Controller     : getrptfltrsrltn
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
 9/12/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.getrptfltrsrltn = function (req, res) {
    var fnm = "getrptfltrsrltn";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var mrcht_usr_id = req.user.mrcht_usr_id;
    sqlMdl.getrptfltrsrltnMdl(hyrchy_grp_id, hyrchy_id, mrcht_usr_id, req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}



/**************************************************************************************
* Controller     : pstfiltrstwo
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
18/12/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.pstfiltrstwo = function (req, res) {
    var fnm = "pstfiltrstwo";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var mrcht_usr_id = req.user.mrcht_usr_id;
    sqlMdl.pstfltrstwoMdl(hyrchy_grp_id, hyrchy_id, mrcht_usr_id, req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : getallRptDetails
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
 20/12/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.getallRptDetails = function (req, res) {
    var fnm = "getallRptDetails";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var mrcht_usr_id = req.user.mrcht_usr_id;
    var standed_varibles = {
        "CURRENT_DATE": req.user
        , "CURRENT_TIMESTAMP": req.user.mrcht_usr_id
        , "CURRENT_MONTH": req.user.mrcht_usr_id
        , "CURRENT_YEAR": req.user.mrcht_usr_id
        , "CURRENT_USER": req.user.mrcht_usr_id
        , "USER_DESINATION_ID": req.user.mrcht_usr_id
        , "USER_DESINATION_NM": req.user.mrcht_usr_id
        , "USER_DEPARTMENT_ID": req.user.mrcht_usr_id
        , "USER_DEPARTMENT_NM": req.user.mrcht_usr_id
        , "CLINT_ID": req.user.mrcht_usr_id
        , "CLINT_NM": req.user.mrcht_usr_id
        , "HYRARCHY_ID": req.user.hyrchy_id
        , "HYRARCHY_NM": req.user.hyrchy_nm
        , "HYRARCHY_GRP_ID": req.user.hyrchy_grp_id
        , "HYRARCHY_GRP_NM": req.user.hyrchy_grp_nm
        , "USER_ID": req.user.mrcht_usr_id
        , "MRCHNT_ID": req.user.mrcht_id
        , "AGENT_ID": req.user.usr_ctgry_ky
    }
    this.pstdetails = Object.keys(standed_varibles).map(key => ({ type: key, value: standed_varibles[key] }));
    fltrdata = [];
    clmnsdata = [];
    setTimeout(() => {
        sqlMdl.getallRptDetailsMdl(hyrchy_grp_id, hyrchy_id, mrcht_usr_id, req.body.data, req.user)
            .then((reportdata) => {
                // console.log(reportdata);
                if (reportdata.length > 0) {
                    log.info("Got results for getallRptDetailsMdl")
                    for (k = 0; k < reportdata.length; k++) {
                        this.fltrdata.push({
                            'fltr_id': reportdata[k].fltr_id, 'fltr_sqnce_id': reportdata[k].fltr_sqnce_id,
                            'fltr_lbl_tx': reportdata[k].fltr_lbl_tx, 'fltr_varble_tx': reportdata[k].fltr_varble_tx,
                            'dflt_vlue_tx': reportdata[k].dflt_vlue_tx, 'rpt_nm': reportdata[k].rpt_nm, 'rpt_desc': reportdata[k].rpt_desc_txt, 'fltr_nm': reportdata[k].fltr_nm,
                            'excel_in': reportdata[k].excel_in, 'excel_nm': reportdata[k].excel_nm,
                            'pdf_in': reportdata[k].pdf_in, 'pdf_nm': reportdata[k].pdf_nm, 'pagination': reportdata[k].rpt_pgn,
                            'acceptall_in': reportdata[k].acpt_ind, 'acceptall_dsc': reportdata[k].acpt_dsc_tx
                        })
                    }
                    // console.log(this.fltrdata)
                    for (j = 0; j < reportdata.length; j++) {
                        if (reportdata[j].dflt_vlue_tx != '') {
                            if (j + 1 == reportdata.length) {
                                var querydata = jsonUtils.getstandedvariablesAndflitersMdl(reportdata, this.pstdetails, this.fltrdata, req.body.data.rpt_params_data)
                                // console.log(req.body.data.rpt_params_data)
                                sqlMdl.getallquryDetailsMdl(querydata, reportdata, req.user)
                                    .then(function (tabledata) {
                                        sqlMdl.getallcolumnDetailsMdl(reportdata, req.user)
                                            .then(function (columnsdata) {
                                                if (columnsdata) {
                                                    for (c = 0; c < columnsdata.length; c++) {
                                                        // if (columnsdata[c].vsble_in == 'true') {
                                                        // console.log(columnsdata[c].vlu_frmt_tx)
                                                        this.clmnsdata.push({
                                                            'headerName': columnsdata[c].dsply_nm, 'field': columnsdata[c].clmn_nm,
                                                            'sortable': true, 'filter': (columnsdata[c].fltr_in == 'true') ? true : false, 'cellStyle': { textAlign: 'center' },
                                                            'wdth_ct': parseInt(columnsdata[c].wdth_ct),
                                                            'height': parseInt(columnsdata[c].hght_ct), 'suppressSizeToFit': true
                                                            , 'visible': columnsdata[c].vsble_in,
                                                            'referencereport': columnsdata[c].rfrnce_rpt_id
                                                            , 'reporturl': columnsdata[c].rpt_url_tx
                                                            , 'reportparms': columnsdata[c].rpt_prmtrs_tx
                                                            , 'reportFilterparms': columnsdata[c].fltr_prmtrs_tx
                                                            , 'groupIndex': columnsdata[c].grp_indx_id
                                                            , 'summaryType': columnsdata[c].smry_type_tx
                                                            , 'displayFormat': columnsdata[c].smry_dsply_frmt_tx
                                                            , 'smryValueFormat': columnsdata[c].vlu_frmt_tx
                                                            , 'groupsummaryType': columnsdata[c].grp_smry_type_tx
                                                            , 'showInGroupFooter': columnsdata[c].grp_smry_shw_grp_ftr_in
                                                            , 'groupdisplayFormat': columnsdata[c].grp_smry_dsply_frmt_tx
                                                            , 'algnmnt': columnsdata[c].algnmnt_txt
                                                            , 'datatype': columnsdata[c].dta_type
                                                            , 'filters': columnsdata[c].clmn_id == null || columnsdata[c].clmn_id == '' ? 0 : 1
                                                            , 'drwn_in': columnsdata[c].rpt_url_tx != null && columnsdata[c].rpt_url_tx != '' ? 1 : 0
                                                            , 'drwn_txt': columnsdata[c].rpt_url_tx != null && columnsdata[c].rpt_url_tx != '' ? true : false
                                                            , 'sum_in': columnsdata[c].clmn_id == 1 ? 1 : 0
                                                        })
                                                        // }
                                                    }
                                                    df.formatSucessRes(req, res, [this.fltrdata, tabledata, this.clmnsdata], cntxtDtls, fnm, {});
                                                }
                                                else {
                                                    df.formatSucessRes(req, res, [this.fltrdata, tabledata, 0], cntxtDtls, fnm, {});
                                                }

                                            }, function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                            });

                                        // df.formatSucessRes(req, res, [this.fltrdata, tabledata], cntxtDtls, fnm, {});
                                    }, function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });


                            }
                        }
                        else {
                            df.formatSucessRes(req, res, [this.fltrdata, 0], cntxtDtls, fnm, {});
                        }
                    }
                }
                else {
                    df.formatSucessRes(req, res, ["NO", "NO", "NO", reportdata], cntxtDtls, fnm, {});
                }
            }, function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });

    }, 400);

}



/**************************************************************************************
* Controller     : getdsrtctLst
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 21/12/2019     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getdsrtctLst = function (req, res) {
    var fnm = "getdsrtctLst";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var id = req.params.id
    // Model gets called Here 
    sqlMdl.getdsrtctLstMdl(id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getmndlLst
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 21/12/2019     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getmndlLst = function (req, res) {
    var fnm = "getmndlLst";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var id = req.params.id
    // Model gets called Here 
    sqlMdl.getmndlLstMdl(id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getcolumnDetailsForEdit
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 21/12/2019     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getcolumnDetailsForEdit = function (req, res) {
    var fnm = "getcolumnDetailsForEdit";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    var id = req.params.id
    // Model gets called Here 
    sqlMdl.getcolumnDetailsForEditMdl(id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getdesgntnLst
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 21/12/2019     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getdesgntnLst = function (req, res) {
    var fnm = "getdesgntnLst";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    // Model gets called Here 
    sqlMdl.getdesgntnLstMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : pstprflestwo
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
27/12/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.pstprflestwo = function (req, res) {
    var fnm = "pstprflestwo";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    sqlMdl.pstprflestwoMdl(req.body.data, req.user)
        .then(function (profile) {
            sqlMdl.pstrptprflestwoMdl(profile[0].rpt_prfle_id, req.body.data, req.user)
                .then(function (results) {

                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }, function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });

        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}



/**************************************************************************************
* Controller     : pstForDefaultDetails
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 30/12/2019     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.pstForDefaultDetails = function (req, res) {
    var fnm = "pstForDefaultDetails";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var data = req.body.data
    // console.log(data)
    var standed_varibles = {
        "CURRENT_DATE": req.user
        , "CURRENT_TIMESTAMP": req.user.mrcht_usr_id
        , "CURRENT_MONTH": req.user.mrcht_usr_id
        , "CURRENT_YEAR": req.user.mrcht_usr_id
        , "CURRENT_USER": req.user.mrcht_usr_id
        , "USER_DESINATION_ID": req.user.mrcht_usr_id
        , "USER_DESINATION_NM": req.user.mrcht_usr_id
        , "USER_DEPARTMENT_ID": req.user.mrcht_usr_id
        , "USER_DEPARTMENT_NM": req.user.mrcht_usr_id
        , "CLINT_ID": req.user.mrcht_usr_id
        , "CLINT_NM": req.user.mrcht_usr_id
        , "HYRARCHY_ID": req.user.hyrchy_id
        , "HYRARCHY_NM": req.user.hyrchy_nm
        , "HYRARCHY_GRP_ID": req.user.hyrchy_grp_id
        , "HYRARCHY_GRP_NM": req.user.hyrchy_grp_nm
        , "USER_ID": req.user.mrcht_usr_id
        , "MRCHNT_ID": req.user.mrcht_id
        , "AGENT_ID": req.user.usr_ctgry_ky
    }
    clmnsdata = [];
    this.stndvrbdetails = Object.keys(standed_varibles).map(key => ({ type: key, value: standed_varibles[key] }));
    // Model gets called Here 
    sqlMdl.pstForDefaultDetails(data, req.user)
        .then(function (querydata) {
            var alloptiondata = jsonUtils.getDataForAllOption(querydata, data, this.stndvrbdetails, req.user)
            sqlMdl.updateFltrsData(alloptiondata, querydata, data, req.user)
                .then(function (jsondata) {
                    sqlMdl.getallcolumnDetailsMdl(querydata, req.user)
                        .then(function (columnsdata) {
                            if (columnsdata) {
                                console.log("coloummsDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                                console.log(columnsdata.length);
                                console.log("coloummsDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

                                for (c = 0; c < columnsdata.length; c++) {
                                    // if (columnsdata[c].vsble_in == 'true') {
                                        this.clmnsdata.push({
                                            'headerName': columnsdata[c].dsply_nm, 'field': columnsdata[c].clmn_nm, 'sortable': true, 'filter': (columnsdata[c].fltr_in == 'true') ? true : false,
                                            'wdth': parseInt(columnsdata[c].wdth_ct),
                                            'height': parseInt(columnsdata[c].hght_ct), 'cellStyle': { textAlign: 'center' }, 'suppressSizeToFit': true, 'visible': columnsdata[c].vsble_in,
                                            'referencereport': columnsdata[c].rfrnce_rpt_id, 'reporturl': columnsdata[c].rpt_url_tx, 'reportparms': columnsdata[c].rpt_prmtrs_tx, 'reportFilterparms': columnsdata[c].fltr_prmtrs_tx
                                            , 'groupIndex': columnsdata[c].grp_indx_id
                                            , 'summaryType': columnsdata[c].smry_type_tx
                                            , 'displayFormat': columnsdata[c].smry_dsply_frmt_tx
                                            , 'smryValueFormat': columnsdata[c].vlu_frmt_tx
                                            , 'groupsummaryType': columnsdata[c].grp_smry_type_tx
                                            , 'showInGroupFooter': columnsdata[c].grp_smry_shw_grp_ftr_in
                                            , 'groupdisplayFormat': columnsdata[c].grp_smry_dsply_frmt_tx
                                            , 'algnmnt': columnsdata[c].algnmnt_txt
                                            , 'datatype': columnsdata[c].dta_type
                                            , 'filters': columnsdata[c].clmn_id == null || columnsdata[c].clmn_id == '' ? 0 : 1
                                            , 'drwn_in': columnsdata[c].rpt_url_tx != null && columnsdata[c].rpt_url_tx != '' ? 1 : 0
                                            , 'drwn_txt': columnsdata[c].rpt_url_tx != null && columnsdata[c].rpt_url_tx != '' ? true : false
                                        })
                                    // }
                                }
                                df.formatSucessRes(req, res, [jsondata, this.clmnsdata], cntxtDtls, fnm, {});
                            }
                            else {
                                df.formatSucessRes(req, res, jsondata, cntxtDtls, fnm, {});
                            }

                        }, function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }, function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : rptcolumns
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
  07/1/2019     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.rptcolumns = function (req, res) {
    var fnm = "rptcolumns";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    sqlMdl.rptcolumnsMdl(req.body.data, req.user)
        .then(function (rptresults) {
            sqlMdl.insertcolumnsMdl(req.body.data, rptresults, req.user)
                .then(function (columnresults) {
                    df.formatSucessRes(req, res, columnresults, cntxtDtls, fnm, {});

                }, function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });


        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : chckRptcrtl
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
  20/1/2019     - Sri Vardhan Balla - Initial Function*
***************************************************************************************/
exports.chckRptcrtl = function (req, res) {
    var fnm = "chckRptcrtl";
    var rptid = req.params.rpt_id
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);

    sqlMdl.chckRptUserMDl(rptid, req.user)
        .then(function (chckRptUserresults) {
            df.formatSucessRes(req, res, chckRptUserresults, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : gercustmRptDtls
* Parameters     : None
* Description    : TO get the custom report details
* Change History :
* 27/1/2020     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.gercustmRptDtls = function (req, res) {
    var fnm = "gercustmRptDtls";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var mrcht_usr_id = req.user.mrcht_usr_id;
    this.rptGrpCtQry = [];
    erptGrpCtQryData = [];
    efltrsData = [];
    ecolumnsData = [];

    // Model gets called Here 
    sqlMdl.gercustmRptDtlsMdl(mrcht_usr_id, req.user)
        .then(function (results) {
            this.completedata = results;
            this.ErptGrpCtQryData = _.uniqBy(this.completedata, 'rpt_id');
            this.EfltrsData = this.completedata.filter(function (a) {
                // console.log(a.fltr_id , a.rpt_id , a.fltr_sqnce_id)
                if (a.fltr_id != null && a.rpt_id != null && a.fltr_sqnce_id != null) {
                    var key = a.fltr_id + '|' + a.rpt_id + '|' + a.fltr_sqnce_id;
                    if (!this[key]) {
                        this[key] = true;
                        return true;
                    }
                }

            }, Object.create(null));
            this.EcolumnsData = this.completedata.filter(function (b) {
                // console.log(b.rpt_clumn_id , b.qry_id);
                if (b.rpt_clumn_id != null && b.qry_id != null) {
                    var key = b.rpt_clumn_id + '|' + b.qry_id;
                    if (!this[key]) {
                        this[key] = true;
                        return true;
                    }
                }

            }, Object.create(null));

            for (i = 0; i < this.ErptGrpCtQryData.length; i++) {
                this.erptGrpCtQryData.push({ 'rpt_ID': this.ErptGrpCtQryData[i].rpt_id, 'rpt_NAME': this.ErptGrpCtQryData[i].rpt_nm, 'rpt_DESC': this.ErptGrpCtQryData[i].rpt_desc_txt, 'rpt_GRPID': this.ErptGrpCtQryData[i].grp_id, 'rpt_GRPNAME': this.ErptGrpCtQryData[i].grp_nm, 'rpt_CATID': this.ErptGrpCtQryData[i].rpt_ctgry_id, 'rpt_CATNAME': this.ErptGrpCtQryData[i].rpt_ctgry_nm, 'rpt_EXIN': this.ErptGrpCtQryData[i].excel_in, 'rpt_EXNM': this.ErptGrpCtQryData[i].excel_nm, 'rpt_PDFIN': this.ErptGrpCtQryData[i].pdf_in, 'rpt_PDFNM': this.ErptGrpCtQryData[i].pdf_nm, 'rpt_PGN': this.ErptGrpCtQryData[i].rpt_pgn, 'rpt_QUERY': this.ErptGrpCtQryData[i].qry_tx })
            }
            for (j = 0; j < this.EfltrsData.length; j++) {
                this.efltrsData.push({ 'fltr_rpt_ID': this.EfltrsData[j].rpt_id, 'fltr_ID': this.EfltrsData[j].fltr_id, 'fltr_NM': this.EfltrsData[j].fltr_nm, 'fltr_LBTX': this.EfltrsData[j].fltr_lbl_tx, 'fltr_DFVL': this.EfltrsData[j].dflt_vlue_tx, 'fltr_SQNCEID': this.EfltrsData[j].fltr_sqnce_id, 'fltr_VBTX': this.EfltrsData[j].fltr_varble_tx, 'fltr_ACIN': this.EfltrsData[j].acpt_ind, 'fltr_ACDESC': this.EfltrsData[j].acpt_dsc_tx })
            }
            for (k = 0; k < this.EcolumnsData.length; k++) {
                this.ecolumnsData.push({ 'clum_rpt_ID': this.EcolumnsData[k].rpt_id, 'clum_sql_ID': this.EcolumnsData[k].rpt_clumn_id, 'clum_NAME': this.EcolumnsData[k].clmn_nm, 'clum_SQNCE': this.EcolumnsData[k].sqnce_id, 'clum_DSPNM': this.EcolumnsData[k].dsply_nm, 'clum_VSIBLE': this.EcolumnsData[k].vsble_in, 'clum_FILTER': this.EcolumnsData[k].fltr_in, 'clum_WDTH': this.EcolumnsData[k].wdth_ct, 'clum_RFRPTNM': this.EcolumnsData[k].rfrnce_rpt_id, 'clum_RFRPTURL': this.EcolumnsData[k].rpt_url_tx, 'clum_RFRPTPARMS': this.EcolumnsData[k].rpt_prmtrs_tx, 'clum_RFRPTFILTRPARMS': this.EcolumnsData[k].fltr_prmtrs_tx })
            }
            df.formatSucessRes(req, res, [this.erptGrpCtQryData, this.efltrsData, this.ecolumnsData], cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : updatecolumns
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
  28/1/2020     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.updatecolumns = function (req, res) {
    var fnm = "updatecolumns";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);

    sqlMdl.rptcolumnsMdl(req.body.data, req.user)
        .then(function (rptresults) {
            console.log(":::::::::rptresults::::::::");
            var clmncount = 0;
            var editclmnsdata = req.body.data.updateColoumnsData;
            if (editclmnsdata.length > 0) {
                console.log("If conition:::::::::::")
                udtClmns(editclmnsdata[clmncount], rptresults[0].qry_id, req.user);
            }
            // for (var k = 0; k < editclmnsdata.length; k++) {
            //     console.log("::::::::::For loop:::::::::::" + count)
            //     sqlMdl.updatecolumnsMdl(editclmnsdata[k], rptresults[0].qry_id, req.body.data)
            //         .then(function (columnresults) {
            //             console.log("::::::::::columnresults::::::::::::")
            //             count++;
            //             console.log(count++, editclmnsdata.length)
            //             if (count == editclmnsdata.length) {
            //                 df.formatSucessRes(req, res, columnresults, cntxtDtls, fnm, {});
            //             }
            //         }, function (error) {
            //             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            //         });

            // }

            function udtClmns(editclmns, rptresults, user) {
                sqlMdl.updatecolumnsMdl(editclmns, rptresults, user)
                    .then(function (columnresults) {
                        console.log("::::::::::columnresults::::::::::::")
                        clmncount++
                        console.log(clmncount, editclmnsdata.length)
                        if (clmncount == editclmnsdata.length) {
                            df.formatSucessRes(req, res, columnresults, cntxtDtls, fnm, {});
                        } else {
                            // setTimeout(() => {
                            udtClmns(editclmnsdata[clmncount], rptresults, user);
                            // }, 2000);
                        }
                    }, function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }

        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}






/**************************************************************************************
* Controller     : updatereportData
* Parameters     : req,res()
* Description    : To save sql query for reports
* Change History :
  28/1/2020     - MADHURI NUNE - Initial Function*
***************************************************************************************/
exports.updatereportData = function (req, res) {
    var fnm = "updatereportData";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var array1 = [];
    var array2 = [];
    var fltrIdS = [];
    var count = 0;
    var mrcht_usr_id = req.user.mrcht_usr_id;
    sqlMdl.rptcolumnsMdl(req.body.data, req.user)
        .then(function (rptresults) {
            sqlMdl.updatereportDataMdl(req.body.data, rptresults[0].qry_id, req.user)
                .then(function (uprpttable) {
                    sqlMdl.updatequeryDataMdl(req.body.data, rptresults[0].qry_id, req.user)
                        .then(function (upquerytable) {
                            sqlMdl.updateGroup(req.body.data, rptresults[0].qry_id, req.user)
                                .then(function (upgrouptable) {
                                    sqlMdl.updateCategory(req.body.data, rptresults[0].qry_id, req.user)
                                        .then(function (upCategorytable) {
                                            sqlMdl.selctFlitrs(req.body.data, rptresults[0].qry_id, req.user)
                                                .then(function (fltData) {
                                                    for (var f = 0; f < fltData.length; f++) {
                                                        array1.push(fltData[f].fltr_id)
                                                    }
                                                    for (var j = 0; j < req.body.data.rpt_fltrsdata.length; j++) {
                                                        array2.push(req.body.data.rpt_fltrsdata[j].fltr_id)
                                                    }
                                                    fltrIdS = _.difference(array1, array2);

                                                    sqlMdl.removeFltrs(req.body.data, fltrIdS, req.user)
                                                        .then(function (filterdataremoved) {
                                                            var ar1 = fltData, ar2 = req.body.data.rpt_fltrsdata, updateFltrs = [], insertFltrs = [];
                                                            for (let i = 0; i < ar2.length; i++) {
                                                                var temp = false;
                                                                for (let j = 0; j < ar1.length; j++) {
                                                                    if (ar2[i].fltr_id == ar1[j].fltr_id) {
                                                                        temp = true;
                                                                        break
                                                                    }
                                                                }
                                                                if (temp) {
                                                                    updateFltrs.push(ar2[i]);
                                                                }
                                                                else {
                                                                    insertFltrs.push(ar2[i]);
                                                                }
                                                                temp = false;
                                                            }
                                                            for (var u = 0; u < updateFltrs.length; u++) {
                                                                for (var h = 0; h < updateFltrs[u].inputbox.length; h++) {
                                                                    sqlMdl.updateFilters(updateFltrs[u], updateFltrs[u].inputbox[h], req.body.data, req.user)
                                                                        .then(function (updateFilterresults) {
                                                                            count++;
                                                                        }, function (error) {
                                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                        });

                                                                }
                                                            }
                                                            console.log("::::::::removeFltrs::::::" + insertFltrs.length)
                                                            if (insertFltrs.length > 0) {
                                                                sqlMdl.insertFltrs(req.body.data, insertFltrs, mrcht_usr_id, req.user)
                                                                    .then(function (flitersinserted) {
                                                                        var clmnData = {
                                                                            queryid: rptresults[0].qry_id
                                                                        }
                                                                        console.log("::::::::getqueryMdl:::::::")
                                                                        sqlMdl.getqueryMdl(clmnData)
                                                                            .then(function (columnresults) {
                                                                                df.formatSucessRes(req, res, columnresults, cntxtDtls, fnm, {});
                                                                            }, function (error) {
                                                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                            })

                                                                    }, function (error) {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                    });
                                                            } else {
                                                                var clmnData = {
                                                                    queryid: rptresults[0].qry_id
                                                                }
                                                                sqlMdl.getqueryMdl(clmnData, req.user)
                                                                    .then(function (columnresults) {
                                                                        df.formatSucessRes(req, res, columnresults, cntxtDtls, fnm, {});
                                                                    }, function (error) {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                    })
                                                            }
                                                        }, function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                        });

                                                }, function (error) {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                });

                                        }, function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                        });

                                }, function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });

                        }, function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });

                }, function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
            // df.formatSucessRes(req, res, rptresults, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : getStatusrprtCtrl
* Parameters     : req,res()
* Description    : reports status
* Change History :
 29/01/2020     - Madhuri - Initial Function*
***************************************************************************************/
exports.getStatusrprtCtrl = function (req, res) {
    var fnm = "getStatusrprtCtrl";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var data = req.body.data
    var mrcht_usr_id = req.user.mrcht_usr_id;
    // console.log("******************and*********************")
    // console.log(req.body.data)
    sqlMdl.getStatusrprtMdl(mrcht_usr_id, data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}



/**************************************************************************************
* Controller     : getcustomreports
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 30/1/2020     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getcustomreports = function (req, res) {
    var fnm = "getcustomreports";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    // Model gets called Here 
    sqlMdl.getcustomreportsMdl(hyrchy_id, hyrchy_grp_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : getStandedvariables
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 31/1/2020     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getStandedvariables = function (req, res) {
    var fnm = "getStandedvariables";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    // Model gets called Here 
    sqlMdl.getStandedvariablesMdl(hyrchy_id, hyrchy_grp_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getDbconnection
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 31/1/2020     - MADHURI NUNE - Initial Function
*
***************************************************************************************/

exports.getDbconnection = function (req, res) {
    var fnm = "getDbconnection";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var hyrchy_grp_id = req.user.hyrchy_grp_id;
    var hyrchy_id = req.user.hyrchy_id;
    // Model gets called Here 
    sqlMdl.getDbconnectionMdl(hyrchy_id, hyrchy_grp_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getstdCode
* Parameters     : None
* Description    : To get std codes
* Change History :
* 19/03/2020     - KOTESWARARAO BORIGARLA - Initial Function
*
***************************************************************************************/

exports.getstdCode = function (req, res) {
    var fnm = "getstdCode";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    sqlMdl.getstdCodeMDL(req.params.dist_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getstdCodeMandals
* Parameters     : None
* Description    : To get std codes
* Change History :
* 19/03/2020     - KOTESWARARAO BORIGARLA - Initial Function
*
***************************************************************************************/

exports.getstdCodeMandals = function (req, res) {
    var fnm = "getstdCodeMandals";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    sqlMdl.getstdCodeMandalsMdl(req.params.dist_id, req.params.mndl_id, req.params.std_cd, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}