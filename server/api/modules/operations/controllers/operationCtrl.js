var df = require(appRoot + '/utils/dflower.utils');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var log = require(appRoot + '/utils/logmessages');
var cafBO = require(appRoot + '/server/api/modules/caf/cafBO/cafBo');
var log = require(appRoot + '/utils/logmessages');
var jsonUtils = require(appRoot + '/utils/json.utils');
var operationsUtils = require(appRoot + '/utils/operations.utils');
var lmoMnthlyOperations = require(appRoot + '/utils/lmoMnthlyOperations.js');
const operationMdl = require(appRoot + '/server/api/modules/operations/models/operationMdl');
const CafMdl = require(appRoot + '/server/api/modules/caf/models/CafMdl');


/**************************************************************************************
* Controller     : postTrmndCafDirectCtrl
* Parameters     : req,res()
* Description    : Insert terminated cafs by agent directly without any approval
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.postTrmndCafDirectCtrl = function (req, res) {
    var fnm = "postTrmndCafDirectCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct_req = 0;
    var ct = 0;
    var cafRevData;
    function cafTrmndPostFn(cafData, user) {
        CafMdl.postTrmndCafsByAgntMdl(cafData, user)
            .then((cafreqresults) => {
                if (cafreqresults) {
                    CafMdl.updateCafDtlFrTrmndReqMdl(cafData, user)
                        .then((cafresults) => {
                            if (cafresults) {
                                ct_req++;
                                if (ct_req == req.body.data.length) {
                                    function cafTrmndUpdateFn(cafData, user) {
                                        CafMdl.getCafTerminationDtlsMdl(cafData, user)
                                            .then((results) => {
                                                var common_feilds = ['caf_id', 'caf_nu', 'caf_type_id', 'aghra_cd', 'subscriberCodes', 'mbl_nu', 'aaa_cd', 'ts', 'mso_agnt_id', 'lmo_agnt_id'];
                                                var arrFeilds = ['telNu', 'tel_pwd'];
                                                var arrName = 'telCnctns';
                                                var groupBy = 'caf_id';
                                                var sortKey = 'caf_id';
                                                var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

                                                cafRevData = groupres[0];
                                                let telCnctns = []

                                                if (cafRevData.telCnctns && cafRevData.telCnctns.length > 0) {

                                                    for (let i = 0; i < cafRevData.telCnctns.length; i++) {

                                                        let telId = cafRevData.telCnctns[i].phne_nmbr_id
                                                        let lata = cafRevData.telCnctns[i].telNu.split('-')[0]
                                                        let telNu = cafRevData.telCnctns[i].telNu.replace(/-/g, '');

                                                        let pui_lst = "tel:+91" + telNu + "$sip:+91" + telNu + "@vskp.apsflims.in"

                                                        let tel_pwd = getPassword()
                                                        let ts = getCurrentTs()
                                                        telCnctns.push({
                                                            telId: telId,
                                                            telNu: telNu,
                                                            lata: lata,
                                                            pui_lst: pui_lst,
                                                            tel_pwd: tel_pwd,
                                                            ts: ts
                                                        })

                                                    }
                                                }
                                                cafRevData["telCnctns"] = telCnctns;
                                                let apiCalls = cafBO.terminationCalls(cafRevData);
                                                extApiCtrl.callApi("CAF TERMINATION", 1, 4, cafRevData.caf_nu, apiCalls, req.user).then((result) => {

                                                    operationMdl.updateTrmndReqCafsMdl(cafData, user)
                                                        .then((results) => {
                                                            CafMdl.updateTrmndCafsInvntryStpBxMdl(cafData, user)
                                                                .then((cafInvntryStpBxresults) => {
                                                                    if (cafInvntryStpBxresults) {
                                                                        CafMdl.updateTrmndCafsStpBxDtlsMdl(cafData, user)
                                                                            .then((cafStpBxresults) => {
                                                                                if (cafStpBxresults) {
                                                                                    CafMdl.updateTrmndCafsOltPrtsMdl(cafData, user)
                                                                                        .then((cafOltPrtsresults) => {
                                                                                            if (cafOltPrtsresults) {
                                                                                                CafMdl.updateTrmndCafsVoipDtlsMdl(cafData, user)
                                                                                                    .then((cafvoipresults) => {
                                                                                                        if (cafvoipresults) {
                                                                                                            CafMdl.updateCafDtlFrTrmndMdl(cafData, user)
                                                                                                                .then((cafresults) => {
                                                                                                                    if (cafresults) {
                                                                                                                        ct++;
                                                                                                                        if (ct == req.body.data.length) {
                                                                                                                            if (cafRevData.caf_type_id == 1) {
                                                                                                                                operationsUtils.record('indvl_caf_trmn_ct')
                                                                                                                                lmoMnthlyOperations.lmooperation(cafRevData.lmo_agnt_id, cafRevData.mso_agnt_id, 'trmnd_caf_ct')
                                                                                                                            } // Individual CAF Terminated
                                                                                                                            else if (cafRevData.caf_type_id == 2) {
                                                                                                                                operationsUtils.record('entre_caf_trmn_ct')
                                                                                                                                lmoMnthlyOperations.lmooperation(cafRevData.lmo_agnt_id, cafRevData.mso_agnt_id, 'trmnd_caf_ct')
                                                                                                                            } // enterprise CAF Terminated
                                                                                                                            df.formatSucessRes(req, res, 'Termination Completed, the settop box is added back to LMO Inventory', cntxtDtls, fnm, {});
                                                                                                                        } else {
                                                                                                                            cafTrmndUpdateFn(req.body.data[ct], req.user);
                                                                                                                        }
                                                                                                                    }
                                                                                                                }).catch((error) => {
                                                                                                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                                                                });
                                                                                                        }
                                                                                                    }).catch((error) => {
                                                                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                                                    });
                                                                                            }
                                                                                        }).catch((error) => {
                                                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                                        });
                                                                                }
                                                                            }).catch((error) => {
                                                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                            });
                                                                    }
                                                                }).catch((error) => {
                                                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                });
                                                        }).catch((error) => {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                        });

                                                }).catch((err) => {
                                                    console.log("Failed" + JSON.stringify(err))
                                                    //   df.formatErrorRes(req, res, err, cntxtDtls, '', {});

                                                })
                                            }).catch((error) => {
                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                            });
                                    }
                                    cafTrmndUpdateFn(req.body.data[ct], req.user);
                                } else {
                                    cafTrmndPostFn(req.body.data[ct], req.user);
                                }
                            }
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        })
                }
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
    cafTrmndPostFn(req.body.data[ct], req.user);
}

function getPassword() {
    var randPassword = Array(8).fill("abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789@").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return randPassword;
}

function getCurrentTs() {
    return new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');
}



/**************************************************************************************
* Controller     : getSettopBoxOnuStsCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.getSettopBoxOnuStsCtrl = function (req, res) {
    var fnm = "getSettopBoxOnuStsCtrl";

    var caf_id = req.params.caf_id;
    log.info(`In ${fnm}`, 0, cntxtDtls);

    operationMdl.getCafDtlsMdl({ id: caf_id }, req.user).then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, req.user);
    }).catch((err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
    })
}