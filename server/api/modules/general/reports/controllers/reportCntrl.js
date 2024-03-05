const reportMdl = require(appRoot + '/server/api/modules/general/reports/models/reportMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var attUtil = require(appRoot + '/utils/attachment.utils');
var std = require(appRoot + '/utils/standardMessages');
var _ = require('lodash');


/************************************************************************************************************************************************** */

exports.ctgrylstCtrl = function (req, res) {
    var fnm = 'ctgrylstCtrl';
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);

    reportMdl.ctgrylstMdl(req.params.dist_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : rprtlstCtrl
* Parameters     : req,res()
* Description    : Get Report profile data
* Change History :
* 13/02/2020    -  Sunil Mulagada - Changed the query to get the setup profile from session
*********************************************************************************************/
exports.rprtlstCtrl = function (req, res) {
    var fnm = 'rprtlstCtrl';
    reportMdl.rprtlstMdl(req.user)
        .then(function (results) {
            var common_feilds = ['grp_nm', 'grp_id'];
            var arrFeilds = ['rpt_id', 'rpt_nm', 'rpt_desc_txt', 'cmplt_in', 'rpt_ctgry_id', 'rpt_ctgry_nm', 'rpt_url_txt', 'rpt_typ_id', 'qry_id'];
            var arrName = 'opts';
            var groupByKey = 'grp_id';
            var sortKey = 'sqnce_id';
            var logBooktripsDetls = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
            df.formatSucessRes(req, res, logBooktripsDetls, cntxtDtls, fnm, {});
        }, function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : getrptprflstCtrl
* Parameters     : req,res()
* Description    : Select Report profile Data
* Change History :
*
***************************************************************************************/
exports.getrptprflstCtrl = function (req, res) {
    var fnm = "getrptprflstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    reportMdl.getrptprflstMdl(req.user)
        .then(function (results) {

            var common_feilds = ['rpt_prfle_id', 'rpt_prfle_nm', 'ctr_usr_nm', 'crt_tmstp', 'upd_usr_nm', 'upd_tmpstmp','prfle_dscrn_tx'];
            var arrFeilds = ['rpt_grp_id', 'rpt_grp_nm', 'rpt_id', 'rpt_nm', 'a_in'];
            var arrName = 'reportgrpItms';
            var groupByKey = 'rpt_prfle_id';
            var sortKey = 'rpt_prfle_id';
            var reportgroupitems = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");

            var resData = []
            for (let i = 0; i < reportgroupitems.length; i++) {
                resData[i] = {};
                resData[i].rpt_prfle_id = reportgroupitems[i].rpt_prfle_id;
                resData[i].rpt_prfle_nm = reportgroupitems[i].rpt_prfle_nm;
                resData[i].ctr_usr_nm = reportgroupitems[i].ctr_usr_nm;
                resData[i].crt_tmstp = reportgroupitems[i].crt_tmstp;
                resData[i].upd_usr_nm = reportgroupitems[i].upd_usr_nm;
                resData[i].upd_tmpstmp = reportgroupitems[i].upd_tmpstmp;
                resData[i].prfle_dscrn_tx = reportgroupitems[i].prfle_dscrn_tx;
                resData[i].reportops = jsonUtils.groupJsonByKey(reportgroupitems[i].reportgrpItms, ['rpt_grp_id', 'rpt_grp_nm'], ['rpt_id', 'rpt_nm', 'a_in'], "reportitemList", 'rpt_grp_id', 'rpt_grp_id', 'asc')
            }
            var prfmenusetupitems =
            {
                reportitems: resData,
                reportresults: results
            };

            df.formatSucessRes(req, res, prfmenusetupitems, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});

        });

}

/**************************************************************************************
* Controller     : insReprtProfileCtrl
* Parameters     : req,res()
* Description    : Insert Menu Profile and Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.insReprtProfileCtrl = function (req, res) {
    var fnm = "insReprtProfileCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    reportMdl.getReportPrflMdl(req.body.data, req.user)
        .then(function (Prflresult) {
            if (Prflresult && Prflresult.length > 0) {
                df.formatSucessRes(req, res, 'Already Profile Exit', cntxtDtls, fnm, {});
            } else {
                reportMdl.asgnReprtProfileMdl(req.body, req.user)
                    .then(function (result) {
                        if (result) {
                            var insertedprfid = result.insertId;
                            if(req.body.data.rptOpts.length > 0){
                                reportMdl.asgnReprtPrfleItmMdl(insertedprfid, req.body.data, req.user)
                                .then(function (result) {
                                    df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                            } else {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            }
                        } else {
                            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }
                        // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }

        });
}

/**************************************************************************************
* Controller     : updreportprofileCtrl
* Parameters     : req,res()
* Description    : Update Report Profile Relation Data
* Change History :
*
***************************************************************************************/
exports.updreportprofileCtrl = function (req, res) {
    var fnm = "updreportprofileCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    // return;

    function rptPrfleAsgnFn(mnuPrfleData, rptOptsData, user) {
        reportMdl.checkRptOptsExistMdl(rptOptsData)
            .then(function (result) {
                

                if (result.length == 1) {
                    reportMdl.updreportprofileMdl(rptOptsData,user)
                        .then(function (result) {
                            ct++;
                            if (ct >= req.body.data.rptOpts.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                rptPrfleAsgnFn(req.body.data, req.body.data.rptOpts[ct], req.user);
                            }
                            // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                } else if (result.length == 0) {
                    reportMdl.asgnReprtPrfleItmMdl(rptOptsData.rpt_prfle_id, mnuPrfleData, user)
                        .then(function (result) {
                            ct++;
                            if (ct >= rptOptsData.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                rptPrfleAsgnFn(req.body.data, req.body.data.rptOpts[ct], req.user);
                            }
                            // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }
            })
    }
    rptPrfleAsgnFn(req.body.data, req.body.data.rptOpts[ct], req.user);
}

/**************************************************************************************
* Controller     : getReportoptionsCtrl
* Parameters     : req,res()
* Description    : Get Report Options Data
* Change History :
*
***************************************************************************************/
exports.getReportoptionsCtrl = function (req, res) {
    var fnm = "getReportoptionsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    reportMdl.getReportoptionsMdl(req.user)
        .then(function (result) {

            var common_feilds = ['rpt_grp_id', 'rpt_grp_nm'];
            var arrFeilds = ['rpt_id', 'rpt_nm', 'rpt_desc_txt', 'a_in','rpt_grp_id', 'rpt_grp_nm'];
            var arrName = 'reportitemList';
            var groupByKey = 'rpt_grp_id';
            var sortKey = 'rpt_grp_id';
            var reportgroupitems = jsonUtils.groupJsonByKey(result, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");

            df.formatSucessRes(req, res, reportgroupitems, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : delRptProfileCtrl
* Parameters     : req,res()
* Description    : Delete Profile
* Change History :
*
***************************************************************************************/
exports.delRptProfileCtrl = function (req, res) {
    var fnm = "delRptProfileCtrl";
    var prfle_id = req.params.rpt_prfle_id
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    reportMdl.delRptProfileMdl(prfle_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : insUserReportPrfleCtrl
* Parameters     : req,res()
* Description    : Insert User Report Profile Relation Data
* Change History :
*
***************************************************************************************/
exports.insUserReportPrfleCtrl = function (req, res) {
    var fnm = "insUserReportPrfleCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    

    function userPrfleAsgnFn(mnuPrfleData, usrData, user) {

        reportMdl.selectReportserMdl(usrData)
            .then(function (result) {

                if (result.length == 1) {
                    reportMdl.updreportPrfleMdl(mnuPrfleData.rpt_prfle_id, usrData, user)
                        .then(function (result) {
                            ct++;
                            if (ct >= mnuPrfleData.usersLst.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                userPrfleAsgnFn(req.body.data, req.body.data.usersLst[ct], req.user);
                            }
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                } else if (result.length == 0) {
                    reportMdl.asgnReportPrfleMdl(mnuPrfleData.rpt_prfle_id, usrData, user)
                        .then(function (result) {
                            ct++;
                            if (ct >= mnuPrfleData.usersLst.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                userPrfleAsgnFn(req.body.data, req.body.data.usersLst[ct], req.user);
                            }
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }
            })
    }
    userPrfleAsgnFn(req.body.data, req.body.data.usersLst[ct], req.user);
}

