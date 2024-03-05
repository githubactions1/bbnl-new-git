const AgntPymntMdl = require(appRoot + '/server/api/modules/billing/models/AgntPymntsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var dateFormat = require('dateformat');
var template = require(appRoot + '/utils/PdfGeneration');
var jsonUtils = require(appRoot + '/utils/json.utils');
var operationsUtils = require(appRoot + '/utils/operations.utils');
var tenantmdl = require('../../agent/models/agntMdl');
var _ = require('lodash');
var sts_dt = {};

/**************************************************************************************
* Controller     : postAgntPymntsCtrl
* Parameters     : req,res()
* Description    : get details of all AgntPymntMode
* Change History :
* 18/02/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.postAgntPymntsCtrl = function (req, res) {
    var fnm = "postAgntPymntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    var upld_id;
    var slctd_lmo_dtls = [];
    var insrt_lmo_dtls = [];
    var insrt_pymnt_ct = 0;

    function slctPymntsWthOutLmo(slctPymntsData, user) {
        AgntPymntMdl.getAgntPymntsLmoMdl(slctPymntsData, user)
            .then(function (result) {
                ct++;
                if (result.length != 0) {
                    slctd_lmo_dtls.push(result[0]);
                }

                if (ct == req.body.data.length) {
                    if (slctd_lmo_dtls.length) {
                        for (var i = 0; i < slctd_lmo_dtls.length; i++) {
                            for (var j = 0; j < req.body.data.length; j++) {
                                if (slctd_lmo_dtls[i].agnt_id == req.body.data[j].agnt_id
                                    && slctd_lmo_dtls[i].trnsn_at == req.body.data[j].trnsn_at
                                    && slctd_lmo_dtls[i].trsn_dt == req.body.data[j].trsn_dt) {
                                    req.body.data.splice(j, 1);
                                }
                            }
                        }
                    } else {
                        insrt_lmo_dtls = req.body.data;
                    }
                    if (insrt_lmo_dtls.length != 0) {
                        if (req.body.data[0].upld_in == 1) {
                            var upldData = {
                                upld_cmnt_tx: 'LMO payment upload',
                                upld_ct: insrt_lmo_dtls[0].tot_rcds
                            }
                            AgntPymntMdl.postAgntPymntsUpldMdl(upldData, user)
                                .then(function (result) {
                                    upld_id = result.insertId;
                                    agntPymnts(insrt_lmo_dtls[insrt_pymnt_ct], upld_id, req.user);
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        } else {
                            upld_id = '';
                            agntPymnts(insrt_lmo_dtls[insrt_pymnt_ct], upld_id, req.user);
                        }
                        // pymntsWthOutLmo(insrt_lmo_dtls[insrt_pymnt_ct], req.user);
                    } else {
                        df.formatSucessRes(req, res, 'Details already inserted', cntxtDtls, fnm, {});
                    }
                } else {
                    slctPymntsWthOutLmo(req.body.data[ct], user);
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
    slctPymntsWthOutLmo(req.body.data[ct], req.user);

    function agntPymnts(pymntsData, upld_id, user) {
        AgntPymntMdl.postAgntPymntsMdl(pymntsData, upld_id, user)
            .then(function (result) {
                AgntPymntMdl.getAgntPymntsWthoutLmoMdl(pymntsData, user)
                    .then(function (result1) {
                        if (result1.length != 0) {
                            AgntPymntMdl.updtAgntTrnsnDtlStgngMdl(pymntsData, user)
                                .then(function (result2) {
                                    insrt_pymnt_ct++;
                                    if (insrt_pymnt_ct == insrt_lmo_dtls.length) {
                                        operationsUtils.record('pymnts_by_lmo_ct');
                                        df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                    } else {
                                        agntPymnts(insrt_lmo_dtls[insrt_pymnt_ct], upld_id, req.user);
                                    }
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        } else {
                            insrt_pymnt_ct++;
                            if (insrt_pymnt_ct == insrt_lmo_dtls.length) {
                                operationsUtils.record('pymnts_by_lmo_ct');
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                agntPymnts(insrt_lmo_dtls[insrt_pymnt_ct], upld_id, req.user);
                            }
                        }
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }

    // if(req.body.data[0].upld_in ==1){
    //     var upldData = {
    //         upld_cmnt_tx: 'LMO payment upload',
    //         upld_ct: req.body.data[0].tot_rcds
    //     }
    //     AgntPymntMdl.postAgntPymntsUpldMdl(upldData,req.user)
    //     .then(function (result) {
    //         upld_id = result.insertId;
    //         agntPymnts(req.body.data[ct], upld_id, req.user);
    //     }).catch(function (error) {
    //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //     });
    // } else {
    //     upld_id = '';
    //     agntPymnts(req.body.data[ct], upld_id,req.user);
    // }
    // function agntPymnts(pymntsData, upld_id, user) {
    //     AgntPymntMdl.postAgntPymntsMdl(pymntsData,upld_id,user)
    //     .then(function (result) {
    //         ct++;
    //     if (ct == req.body.data.length) {
    //         df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //     } else {
    //         agntPymnts(req.body.data[ct], upld_id,req.user);
    //     }
    //     }).catch(function (error) {
    //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //     });
    // }
}

/**************************************************************************************
* Controller     : getPymntsByAgntIdCtrl
* Parameters     : req,res()
* Description    : Get payments of a agent
* Change History :
* 19/02/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getPymntsByAgntIdCtrl = function (req, res) {
    var fnm = "getPymntsByAgntIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getPymntsByAgntIdMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getPymntsByUsrIdCtrl
* Parameters     : req,res()
* Description    : Get payments of a agent by userid
* Change History :
* 19/02/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getPymntsByUsrIdCtrl = function (req, res) {
    var fnm = "getPymntsByUsrIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getPymntsByUsrIdMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getPymntsRcntCtrl
* Parameters     : req,res()
* Description    : Get all recent payments
* Change History :
* 19/02/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getPymntsRcntCtrl = function (req, res) {

    AgntPymntMdl.getPymntsRcntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postAgntPymntsWthoutLmoCtrl
* Parameters     : req,res()
* Description    : Post payments to staging table
* Change History :
* 19/02/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.postAgntPymntsWthoutLmoCtrl = function (req, res) {
    var fnm = "postAgntPymntsWthoutLmoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    var slctd_lmo_dtls = [];
    var insrt_lmo_dtls = [];
    var insrt_pymnt_ct = 0;
    var upld_id;
    var upldData = {
        upld_cmnt_tx: 'LMO payment upload',
        upld_ct: req.body.data.length
    }
    AgntPymntMdl.postAgntPymntsUpldMdl(upldData, req.user)
        .then(function (result) {
            upld_id = result.insertId;
            slctPymntsWthOutLmo(req.body.data[ct], req.user);
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

    function slctPymntsWthOutLmo(slctPymntsData, user) {
        AgntPymntMdl.getAgntPymntsWthoutLmoMdl(slctPymntsData, user)
            .then(function (result) {

                ct++;
                if (result.length != 0) {
                    slctd_lmo_dtls.push(result[0]);
                }

                if (ct == req.body.data.length) {
                    if (slctd_lmo_dtls.length) {
                        for (var i = 0; i < slctd_lmo_dtls.length; i++) {
                            for (var j = 0; j < req.body.data.length; j++) {
                                if (slctd_lmo_dtls[i].trnsn_tx == req.body.data[j].trnsn_tx) {
                                    // insrt_lmo_dtls.push(req.body.data[j]);
                                    req.body.data.splice(j, 1);
                                }
                            }
                        }
                        insrt_lmo_dtls = req.body.data;
                    } else {
                        insrt_lmo_dtls = req.body.data;
                    }
                    if (insrt_lmo_dtls.length != 0) {
                        pymntsWthOutLmo(insrt_lmo_dtls[insrt_pymnt_ct], upld_id, req.user);
                    } else {
                        df.formatSucessRes(req, res, 'Details already inserted', cntxtDtls, fnm, {});
                    }
                } else {
                    slctPymntsWthOutLmo(req.body.data[ct], user);
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }


    function pymntsWthOutLmo(pymntsData, upld_id, user) {
        AgntPymntMdl.postAgntPymntsWthoutLmoMdl(pymntsData, upld_id, user)
            .then(function (result) {
                insrt_pymnt_ct++;
                if (insrt_pymnt_ct == insrt_lmo_dtls.length) {
                    df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                } else {
                    pymntsWthOutLmo(insrt_lmo_dtls[insrt_pymnt_ct], upld_id, req.user);
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
}

/**************************************************************************************
* Controller     : getBnkStmntsDtlsCtrl
* Parameters     : req,res()
* Description    : Get Bank Statement Details
* Change History :
*
***************************************************************************************/
exports.getBnkStmntsDtlsCtrl = function (req, res) {
    var fnm = "getBnkStmntsDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getBnkStmntsDtlsMdl(req.body.data, req.user)
        .then(function (results) {
            // for (var i = 0; i < results.length; i++) {
            //     results[i].trsn_dt = dateFormat(results[i].trsn_dt, "dd-mm-yyyy");
            // }
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getAllTrnsnsToUpldCtrl
* Parameters     : req,res()
* Description    : Get Bank Statement Details
* Change History :  Srujana M
*
***************************************************************************************/
exports.getAllTrnsnsToUpldCtrl = function (req, res) {
    var fnm = "getAllTrnsnsToUpldCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var pymntsWthLmo = req.body.data.pymntDtls;
    var pymntsWthOutLmo = req.body.data.pymntWthOutLmoDtls;
    var pymntLmoCt = 0;
    var pymntWthOtLmoCt = 0;
    var toBeInstrdWthLmo = [];
    var instrdWthLmo = [];
    var toBeInstrdWthOutLmo = [];
    var instrdWthOutLmo = [];
    var toBeInstrdWthOutLmoCt = 0;
    var fnlToBeInstrdWthOutLmo = [];
    var fnlAlrdyInstrdWthOutLmo = [];

    function pymntsWthLmoFn(pymntsData, user) {
        AgntPymntMdl.getAgntPymntsLmoMdl(pymntsData, user)
            .then(function (result) {
                pymntLmoCt++;
                if (result.length != 0) {
                    instrdWthLmo.push(result[0]);
                }
                if (pymntLmoCt == pymntsWthLmo.length) {
                    if (instrdWthLmo.length) {
                        for (var i = 0; i < instrdWthLmo.length; i++) {
                            for (var j = 0; j < pymntsWthLmo.length; j++) {
                                if (instrdWthLmo[i].agnt_id == pymntsWthLmo[j].agnt_id
                                    && instrdWthLmo[i].trnsn_at == pymntsWthLmo[j].trnsn_at
                                    && instrdWthLmo[i].trsn_dt == pymntsWthLmo[j].trsn_dt) {
                                    // toBeInstrdWthLmo.push(pymntsWthLmo[j]);
                                    pymntsWthLmo.splice(j, 1);
                                }
                            }
                        }
                        toBeInstrdWthLmo = pymntsWthLmo;
                    } else {
                        toBeInstrdWthLmo = pymntsWthLmo;
                    }
                    pymntsWthOutLmoFn(pymntsWthOutLmo[pymntWthOtLmoCt], user);
                    // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                } else {
                    pymntsWthLmoFn(pymntsWthLmo[pymntLmoCt], user);
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }

    function pymntsWthOutLmoFn(pymntsData, user) {
        AgntPymntMdl.getAgntPymntsWthoutLmoMdl(pymntsData, user)
            .then(function (result) {
                if (result.length != 0) {
                    instrdWthOutLmo.push(result[0]);
                }
                pymntWthOtLmoCt++;
                if (pymntWthOtLmoCt == pymntsWthOutLmo.length) {
                    if (instrdWthOutLmo.length) {
                        for (var i = 0; i < instrdWthOutLmo.length; i++) {
                            for (var j = 0; j < pymntsWthOutLmo.length; j++) {
                                if (instrdWthOutLmo[i].trnsn_tx == pymntsWthOutLmo[j].trnsn_tx) {
                                    // toBeInstrdWthOutLmo.push(pymntsWthOutLmo[j]);
                                    pymntsWthOutLmo.splice(j, 1);
                                }
                            }
                        }
                        toBeInstrdWthOutLmo = pymntsWthOutLmo;
                    } else {
                        toBeInstrdWthOutLmo = pymntsWthOutLmo;
                    }
                    if (toBeInstrdWthOutLmo.length != 0) {
                        function toBeInstrdWthOutLmoCtFn(toBeInstrdWthOutLmoData) {
                            AgntPymntMdl.getAgntPymntsLmoMdl(toBeInstrdWthOutLmoData, user)
                                .then(function (result) {
                                    toBeInstrdWthOutLmoCt++;
                                    if (result[0] != undefined) {
                                        fnlAlrdyInstrdWthOutLmo.push(result[0]);
                                    }

                                    if (toBeInstrdWthOutLmoCt == toBeInstrdWthOutLmo.length) {
                                        if (fnlAlrdyInstrdWthOutLmo.length == 0) {
                                            fnlToBeInstrdWthOutLmo = toBeInstrdWthOutLmo;
                                        } else {
                                            for (var k = 0; k < toBeInstrdWthOutLmo.length; k++) {
                                                for (var l = 0; l < fnlAlrdyInstrdWthOutLmo.length; l++) {
                                                    if (toBeInstrdWthOutLmo[k].trsn_dt == fnlAlrdyInstrdWthOutLmo[l].trsn_dt
                                                        && toBeInstrdWthOutLmo[k].trnsn_at == fnlAlrdyInstrdWthOutLmo[l].trnsn_at
                                                        && toBeInstrdWthOutLmo[k].trnsn_tx == fnlAlrdyInstrdWthOutLmo[l].trnsn_tx) {
                                                        toBeInstrdWthOutLmo.splice(k, 1);
                                                    }
                                                }
                                            }
                                            fnlToBeInstrdWthOutLmo = toBeInstrdWthOutLmo;
                                        }
                                        df.formatSucessRes(req, res, { toBeInstrdWthLmo, instrdWthLmo, fnlToBeInstrdWthOutLmo, fnlAlrdyInstrdWthOutLmo, instrdWthOutLmo }, cntxtDtls, fnm, {});
                                    } else {
                                        toBeInstrdWthOutLmoCtFn(toBeInstrdWthOutLmo[toBeInstrdWthOutLmoCt]);
                                    }
                                })
                                .catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                })
                        }
                        toBeInstrdWthOutLmoCtFn(toBeInstrdWthOutLmo[toBeInstrdWthOutLmoCt]);
                    } else {
                        fnlToBeInstrdWthOutLmo = pymntsWthOutLmo;
                        df.formatSucessRes(req, res, { toBeInstrdWthLmo, instrdWthLmo, fnlToBeInstrdWthOutLmo, instrdWthOutLmo }, cntxtDtls, fnm, {});
                    }

                } else {
                    pymntsWthOutLmoFn(pymntsWthOutLmo[pymntWthOtLmoCt], user);
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
    pymntsWthLmoFn(pymntsWthLmo[pymntLmoCt], req.user);
    // AgntPymntMdl.getBnkStmntsDtlsMdl(req.body.data)
    //     .then(function (results) {
    //         df.formatSucessRes(req,res, results, cntxtDtls, '', {});
    //     }).catch(function (error) {
    //         df.formatErrorRes(req,res, error, cntxtDtls, '', {});
    //     });
}



/**************************************************************************************
* Controller     : getCstmrWaveOffsCtrl
* Parameters     : req,res()
* Description    : Get customer list who are in wave-off
* Change History : Srujana M - 02/03/2020
*
***************************************************************************************/
exports.getCstmrWaveOffsCtrl = function (req, res) {
    var fnm = "getCstmrWaveOffsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getCstmrWaveOffsMdl(req.user)
        .then(function (results) {
            var common_feilds = ['tle_nm', 'cstmr_nm', 'entrpe_type_nm', 'loc_lcly_tx', 'loc_eml1_tx', 'cntct_nm', 'cntct_mble1_nu', 'tot_cafs', 'caf_id',
                'caf_type_nm', 'loc_addr1_tx', 'cntct_nm', 'loc_dstrct_id', 'dstrt_nm', 'vlge_nm', 'cstmr_id'];
            var arrFeilds = ['caf_nu', 'wvr_id', 'wvr_dscn_tx', 'efcte_dt', 'expry_dt', 'aprve_ts', 'cstmr_nm', 'cstmr_id', 'mbl_nu', 'instl_addr1_tx',
                'instl_ara_tx', 'instl_eml1_tx','actvn_dt'];
            var arrName = 'cafDtls';
            var groupByKey = 'cstmr_id';
            var sortKey = 'wvr_id';
            var cstmrCafsArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
            df.formatSucessRes(req, res, cstmrCafsArray, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postCafWaveOffsCtrl
* Parameters     : req,res()
* Description    : Add cafs to waveoff
* Change History : Srujana M - 02/03/2020
*
***************************************************************************************/
exports.postCafWaveOffsCtrl = function (req, res) {
    var fnm = "postCafWaveOffsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var cafDtls = req.body.data;
    var ct = 0;
    function insertCafLst(cafData, user) {
        AgntPymntMdl.postCafWaveOffsMdl(cafData, user)
            .then(function (results) {
                ct++;
                if (ct == cafDtls.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                } else {
                    insertCafLst(cafDtls[ct], req.user);
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    insertCafLst(req.body.data[ct], req.user);

}

/**************************************************************************************
* Controller     : getCafWaveOffAprvlsCtrl
* Parameters     : req,res()
* Description    : Get payments of a agent
* Change History :
* 19/02/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getCafWaveOffAprvlsCtrl = function (req, res) {
    var fnm = "getCafWaveOffAprvlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getCafWaveOffAprvlsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : updateCafWaveOffAprvlsCtrl
* Parameters     : req,res()
* Description    : update customer waveoff list
* Change History :
* 05/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.updateCafWaveOffAprvlsCtrl = function (req, res) {
    var fnm = "updateCafWaveOffAprvlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    function updateCafWavers(cafData, user) {
        AgntPymntMdl.updateCafWaveOffAprvlsMdl(cafData, user)
            .then(function (results) {
                ct++;
                if (ct == req.body.data.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                } else {
                    updateCafWavers(req.body.data[ct], req.user);
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    updateCafWavers(req.body.data[ct], req.user);

}



/**************************************************************************************
* Controller     : updateAgntPymntAprvlsCtrl
* Parameters     : req,res()
* Description    : update customer waveoff list
* Change History :
* 08/07/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.updateAgntPymntAprvlsCtrl = function (req, res) {
    var fnm = "updateAgntPymntAprvlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    var agntWltAmt = 0;
    var agntBalAmt = 0;
   
    function updateAgntPymntAprvl(agntData, user) {
        tenantmdl.getAgentByIdMdl(agntData.agnt_id, user).then(function (resultsagntRes) {
			console.log("resultsagntRes",resultsagntRes);
            AgntPymntMdl.get_LastestBlnce(agntData, user)
                .then(function (latBlnceData) {
					console.log("latBlnceData",latBlnceData);
                    agntWltAmt = 0;
                    agntBalAmt = 0;

                    if (agntData.wltBlCal_aprvl_in == 1) {
                        agntWltAmt = parseFloat(agntData.trnsn_at) + (resultsagntRes[0].wlt_blnce_at ? parseFloat(resultsagntRes[0].wlt_blnce_at) : 0);
                        if (resultsagntRes[0].agnt_blnce_at == null || resultsagntRes[0].agnt_blnce_at == NaN || resultsagntRes[0].agnt_blnce_at == 0) {
                            agntBalAmt = parseFloat(agntData.trnsn_at);
                        } else {
                            // agntBalAmt =  parseFloat(resultsagntRes[0].agnt_blnce_at) - parseFloat(agntData.trnsn_at);
                            if(latBlnceData[0][0].trnsn_type_id == 7){
                                if(latBlnceData[1][0]){
                                    agntBalAmt = parseFloat(latBlnceData[1][0].latest_blnce) + parseFloat(agntData.trnsn_at);
                                }
                                else{
                                    agntBalAmt = parseFloat(agntData.trnsn_at);
                                }
                                
                               
                            }
                            else{
                                if(latBlnceData[1][0]){
                                     agntBalAmt = parseFloat(latBlnceData[1][0].latest_blnce) - parseFloat(agntData.trnsn_at);
                                }
                                else{
                                    agntBalAmt = parseFloat(agntData.trnsn_at);
                                }
                            }
                            
                        }
                        agntData['agntWltAmt'] = agntWltAmt;
                        agntData['agntBalAmt'] = agntBalAmt;
                    }
					console.log("agntData",agntData);
                    AgntPymntMdl.updateAgntPymntAprvlsMdl(agntData, user)
                        .then(function (results1) {
							console.log("results1", results1);
                            AgntPymntMdl.updatePreviousPymnts(agntData,latBlnceData[0][0], user)
                                .then(function (prevousPaymnts) {
                                    console.log("prevousPaymnts",prevousPaymnts);
                                    console.log("again results1",results1);
                                    var onlyPymntRes = results1;
                                    console.log(agntData);
                                    if(agntData.aprvl_in == 0){
                                        console.log(onlyPymntRes);
                                        if(onlyPymntRes){
                                            ct++;
                                            if (ct == req.body.data.length) {
                                                df.formatSucessRes(req, res, onlyPymntRes, cntxtDtls, '', {});
                                            } else {
                                                updateAgntPymntAprvl(req.body.data[ct], req.user);
                                            }
                                        }
                                    } else {
                                        AgntPymntMdl.updateAgntsLstPymntMdl(agntData,latBlnceData[0][0], user)
                                        .then(function (results) {
											console.log("results", results);
                                            ct++;
                                            if (ct == req.body.data.length) {
                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                            } else {
                                                updateAgntPymntAprvl(req.body.data[ct], req.user);
                                            }
                                        }).catch(function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                        });
                                    }
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                });

                        }).catch(function (error) {
							console.log("error bfr", error);
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                }).catch(function (error) {
                    console.log("CATCHERRRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
					console.log("error ", error);
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        })
    }
    updateAgntPymntAprvl(req.body.data[ct], req.user);

}

/**************************************************************************************
* Controller     : getCstmrWaveOffsByUsrIdCtrl
* Parameters     : req,res()
* Description    : Get waveoff of a customer by userid
* Change History :
* 19/02/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getCstmrWaveOffsByUsrIdCtrl = function (req, res) {
    var fnm = "getCstmrWaveOffsByUsrIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getCstmrWaveOffsByUsrIdMdl(req.user)
        .then(function (results) {
            var common_feilds = ['tle_nm', 'cstmr_nm', 'entrpe_type_nm', 'loc_lcly_tx', 'loc_eml1_tx', 'cntct_nm', 'cntct_mble1_nu', 'tot_cafs', 'caf_id',
                'caf_type_nm', 'loc_addr1_tx', 'cntct_nm', 'loc_dstrct_id', 'dstrt_nm', 'vlge_nm', 'cstmr_id'];
            var arrFeilds = ['caf_nu', 'wvr_id', 'wvr_dscn_tx', 'efcte_dt', 'expry_dt', 'aprve_ts', 'cstmr_nm', 'cstmr_id', 'mbl_nu', 'instl_addr1_tx',
                'instl_ara_tx', 'instl_eml1_tx'];
            var arrName = 'cafDtls';
            var groupByKey = 'cstmr_id';
            var sortKey = 'wvr_id';
            var cstmrCafsArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
            df.formatSucessRes(req, res, cstmrCafsArray, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getCstmrWaveOffsAllRcntCtrl
* Parameters     : req,res()
* Description    : Get all recent customer wavers
* Change History :
* 19/02/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getCstmrWaveOffsAllRcntCtrl = function (req, res) {

    AgntPymntMdl.getCstmrWaveOffsAllRcntMdl(req.body.data, req.user)
        .then(function (results) {
            var common_feilds = ['tle_nm', 'cstmr_nm', 'entrpe_type_nm', 'loc_lcly_tx', 'loc_eml1_tx', 'cntct_nm', 'cntct_mble1_nu', 'tot_cafs', 'caf_id',
                'caf_type_nm', 'loc_addr1_tx', 'cntct_nm', 'loc_dstrct_id', 'dstrt_nm', 'vlge_nm', 'cstmr_id'];
            var arrFeilds = ['caf_nu', 'wvr_id', 'wvr_dscn_tx', 'efcte_dt', 'expry_dt', 'aprve_ts', 'cstmr_nm', 'cstmr_id', 'mbl_nu', 'instl_addr1_tx',
                'instl_ara_tx', 'instl_eml1_tx'];
            var arrName = 'cafDtls';
            var groupByKey = 'cstmr_id';
            var sortKey = 'wvr_id';
            var cstmrCafsArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
            df.formatSucessRes(req, res, cstmrCafsArray, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getCafWaveOffAprvlsByUsrCtrl
* Parameters     : req,res()
* Description    : Get payments of a agent by user
* Change History :
* 07/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getCafWaveOffAprvlsByUsrCtrl = function (req, res) {
    var fnm = "getCafWaveOffAprvlsByUsrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getCafWaveOffAprvlsByUsrMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getCafWaveOffAprvlsAllRcntCtrl
* Parameters     : req,res()
* Description    : Get payments of a agent - recent
* Change History :
* 07/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getCafWaveOffAprvlsAllRcntCtrl = function (req, res) {
    var fnm = "getCafWaveOffAprvlsAllRcntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getCafWaveOffAprvlsAllRcntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : agntPymntAprvlsByUsrCtrl
* Parameters     : req,res()
* Description    : Get payments of a agent by user
* Change History :
* 07/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.agntPymntAprvlsByUsrCtrl = function (req, res) {
    var fnm = "agntPymntAprvlsByUsrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.agntPymntAprvlsByUsrMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : agntPymntAprvlsRcntCtrl
* Parameters     : req,res()
* Description    : Get payments of a agent recent
* Change History :
* 07/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.agntPymntAprvlsRcntCtrl = function (req, res) {
    var fnm = "agntPymntAprvlsRcntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.agntPymntAprvlsRcntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getTrnsnTypesByCtgryIdCtrl
* Parameters     : req,res()
* Description    : Get tranaction type list
* Change History :
* 07/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getTrnsnTypesByCtgryIdCtrl = function (req, res) {
    var fnm = "getTrnsnTypesByCtgryIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getTrnsnTypesByCtgryIdMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getPymntsCrdtsByUsrIdCtrl
* Parameters     : req,res()
* Description    : Get loggedin user payments credits
* Change History :
* 07/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getPymntsCrdtsByUsrIdCtrl = function (req, res) {

    AgntPymntMdl.getPymntsCrdtsByUsrIdMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getPymntsCrdtsRcntCtrl
* Parameters     : req,res()
* Description    : Get all recent payments credits
* Change History :
* 07/03//2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getPymntsCrdtsRcntCtrl = function (req, res) {

    AgntPymntMdl.getPymntsCrdtsRcntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getAgntPymntCrdtAprvlsCtrl
* Parameters     : req,res()
* Description    : Get approval payments credits
* Change History :
* 07/03//2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getAgntPymntCrdtAprvlsCtrl = function (req, res) {

    AgntPymntMdl.getAgntPymntCrdtAprvlsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : agntPymntCrdtAprvlsByUsrCtrl
* Parameters     : req,res()
* Description    : Get user payments credits
* Change History :
* 07/03//2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.agntPymntCrdtAprvlsByUsrCtrl = function (req, res) {

    AgntPymntMdl.agntPymntCrdtAprvlsByUsrMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : agntPymntCrdtAprvlsRcntCtrl
* Parameters     : req,res()
* Description    : Get all recent payments credits
* Change History :
* 07/03//2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.agntPymntCrdtAprvlsRcntCtrl = function (req, res) {

    AgntPymntMdl.agntPymntCrdtAprvlsRcntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getbnkStmtPymntsByUsrIdCtrl
* Parameters     : req,res()
* Description    : Get logged in user bank statement uploads
* Change History :
* 09/03//2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getbnkStmtPymntsByUsrIdCtrl = function (req, res) {

    AgntPymntMdl.getbnkStmtPymntsByUsrIdMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getbnkStmtPymntsRcntCtrl
* Parameters     : req,res()
* Description    : Get recent in user bank statement uploads
* Change History :
* 09/03//2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getbnkStmtPymntsRcntCtrl = function (req, res) {

    AgntPymntMdl.getbnkStmtPymntsRcntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getAllCstmrs
* Parameters     : None
* Description    : 
* Change History :
* 24/03/2020    - Koti Machana - Initial Function
***************************************************************************************/
exports.getAllCstmrs = (req, res) => {
    var fnm = "getAllCstmrs";
    // console.log("getAllCstmrs")
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // console.log(req.body)

    AgntPymntMdl.getAllCstmrsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : myGenrtPdfsCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 31/03//2020    -  Sravani M  - Initial Function
*
***************************************************************************************/
exports.myGenrtPdfsCtrl = function (req, res) {

    AgntPymntMdl.myGenrtPdfsCtrlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : myRecntGenrtPdfsCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 31/03//2020    -  Sravani M  - Initial Function
*
***************************************************************************************/
exports.myRecntGenrtPdfsCtrl = function (req, res) {

    AgntPymntMdl.myRecntGenrtPdfsCtrlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getLmoMonthyInvceDtlsCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 18/05//2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getLmoMonthyInvceDtlsCtrl = function (req, res) {
    var sltdYear = req.params.year;
    var slctdMnth = req.params.month;
    var slctdLmo = req.params.lmo;
    AgntPymntMdl.getLmoMonthyInvceDtlsMdl(sltdYear, slctdMnth, slctdLmo, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updateAgntBlnceAmtCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 11/06/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.updateAgntBlnceAmtCtrl = function (req, res) {
    var ct=0;
    AgntPymntMdl.getAgntDtlsMdl(req.user)
        .then(function (results) {
            if(results){
                var agntDtlsRes = results;
                function updateAgntPymntTrns(agntRes, user){
                    AgntPymntMdl.getAgntTrnsDtlsMdl(agntRes.agnt_id,req.user)
                    .then(function (trsnRes) {
                        if(trsnRes){
                            var agnt_trsnRes = trsnRes[0];
                            AgntPymntMdl.updateAgntTrnsTblMdl(agntRes.agnt_id,agnt_trsnRes.trnsn_id,agnt_trsnRes.upd_agnt_bal,user)
                            .then(function (updtTrnsRes) {
                                if(updtTrnsRes){
                                    AgntPymntMdl.updateAgntLstTblMdl(agntRes.agnt_id,agnt_trsnRes.upd_agnt_bal,user)
                                    .then(function (lastUpdtdRes) {
                                        console.log(lastUpdtdRes);
                                        ct++;
                                        if(ct == agntDtlsRes.length){
                                            df.formatSucessRes(req, res, lastUpdtdRes, cntxtDtls, '', {});
                                        }else {
                                            updateAgntPymntTrns(agntDtlsRes[ct]);
                                        }
                                       
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });
                                }
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                        }
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
                }
                updateAgntPymntTrns(agntDtlsRes[ct], req.user);
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getRevenueShrngDtlsCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 18/06/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getRevenueShrngDtlsCtrl = function (req, res) {
    var fnm = "getRevenueShrngDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getRevenueShrngDtlsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getRevenueShrngByLmoCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 18/06/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getRevenueShrngByLmoCtrl = function (req, res) {
    var fnm = "getRevenueShrngByLmoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getRevenueShrngByLmoMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getRevenueShrngByLmoCstmrCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 18/06/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getRevenueShrngByLmoCstmrCtrl = function (req, res) {
    var fnm = "getRevenueShrngByLmoCstmrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getRevenueShrngByLmoCstmrMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getMnthlyRevenueShrngByLmoCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 18/06/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getMnthlyRevenueShrngByLmoCtrl = function (req, res) {
    var fnm = "getMnthlyRevenueShrngByLmoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getMnthlyRevenueShrngByLmoMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getagntPymntAprlDtlsCtrl
* Parameters     : req,res()
* Description    : Get payments approval of a agent
* Change History :
* 19/02/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getagntPymntAprlDtlsCtrl = function (req, res) {
    var fnm = "getagntPymntAprlDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getagntPymntAprlDtlsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getAgntPymntTdyMnthCtrl
* Parameters     : req,res()
* Description    : Get total agent paid amount today and this month
* Change History :
* 08/07/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getAgntPymntTdyMnthCtrl = function (req, res) {
    var fnm = "getAgntPymntTdyMnthCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getAgntPymntTdyMnthMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getAgntPymntsMnthlyCtrl
* Parameters     : req,res()
* Description    : Get total agents paid amount month wise
* Change History :
* 08/07/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getAgntPymntsMnthlyCtrl = function (req, res) {
    var fnm = "getAgntPymntsMnthlyCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getAgntPymntsMnthlyMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getAgntPymntsMnthDyWseCtrl
* Parameters     : req,res()
* Description    : Get total agents paid amount month wise
* Change History :
* 08/07/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getAgntPymntsMnthDyWseCtrl = function (req, res) {
    var fnm = "getAgntPymntsMnthDyWseCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getAgntPymntsMnthDyWseMdl(req.params.mnth_id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getAgntPymntBlnceTlDtCtrl
* Parameters     : req,res()
* Description    : Get total agents balance amount till date
* Change History :
* 08/07/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getAgntPymntBlnceTlDtCtrl = function (req, res) {
    var fnm = "getAgntPymntBlnceTlDtCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getAgntPymntBlnceTlDtMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getPymntApdflShreDtlsCtrl
* Parameters     : req,res()
* Description    : Get total apsfl share 
* Change History :
* 08/07/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getPymntApdflShreDtlsCtrl = function (req, res) {
    var fnm = "getPymntApdflShreDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    AgntPymntMdl.getPymntApdflShreDtlsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}