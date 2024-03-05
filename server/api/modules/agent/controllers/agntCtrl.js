var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var tenantmdl = require('../models/agntMdl');
var fs = require("fs");
var attUtil = require(appRoot + '/utils/attachment.utils');
var dbutil = require(appRoot + '/utils/db.utils');
var agentBo = require(appRoot + '/server/api/modules/agent/agentBo/agentBo');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl');
var modRoot = appRoot + '/server/api/modules/olt/'
const oltCtrl = require(modRoot + 'controllers/oltCtrl');
//var dataMigrationMdl = require('../../../modules/dataMigration/models/dataMigrationMdl')


/**************************************************************************************
* Controller     : newAgentCtrl
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2016     - Srujana M - Initial Function
***************************************************************************************/
exports.newAgentCtrl = (req, res) => {
    var data = req.body;
    var fnm = "newAgentCtrl";
    let x = 0;
    log.info(`In ${fnm}`, 0, cntxtDtls);
    dbutil.getNxtKey('agnt_enrlt_nu').then(function (nextId) {
        enrlt_nu = nextId
        console.log(enrlt_nu);
        // return
        tenantmdl.newAgentMdl(data, enrlt_nu, req.user)
            .then((results) => {
                console.log('results')
                console.log(results);
                if (results) {
                    var insertId = results.insertId;
                    var srvngaracnt = 0;
                    var srvngasrtcnt = 0;
                    var srvngsbstncnt = 0;
                    var atcCnt = 0;
                    var prfDtlsCnt = 0;

                    if (data.data.srvng_areas != undefined && data.data.srvng_areas.length > 0) {
                        srvngara(data.data.srvng_areas[srvngaracnt], insertId)
                    } else if (data.data.srvng_asts != undefined && data.data.srvng_asts.length > 0) {
                        srvngasts(data.data.srvng_asts[srvngasrtcnt], insertId)
                    } else if (data.data.sb_stns != undefined && data.data.sb_stns.length > 0) {
                        srvngsbstn(data.data.sb_stns[srvngsbstncnt], insertId)
                    } else if (data.data.agntPrfDtls != undefined && data.data.agntPrfDtls.length > 0) {
                        prfDocs(data.data.agntPrfDtls[prfDtlsCnt], insertId)
                    } else if (data.data.agntBnkDtls != undefined) {
                        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuu")
                        srvngbnkAcnt(data.data.agntBnkDtls, insertId)
                    }
                    else if (data.data.agntPrfDtls.prf_doc_img != undefined) {
                        attachFile(imageData[atcCnt]);
                    } else {
                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                    }
                    // Tenant Serving Area
                    function srvngara(srvAreaData, insertId) {
                        tenantmdl.srvngAraMdl(srvAreaData, insertId, req.user)
                            .then((srvngAraResults) => {
                                console.log('srvngAraMdl');
                                srvngaracnt++;
                                if (srvngaracnt == data.data.srvng_areas.length) {
                                    console.log("In if");
                                    if (data.data.srvng_asts != undefined && data.data.srvng_asts.length > 0) {
                                        console.log("goto srvng_asts");
                                        srvngasts(data.data.srvng_asts[srvngasrtcnt], insertId)
                                    } else if (data.data.sb_stns != undefined && data.data.sb_stns.length > 0) {
                                        console.log("goto sb_stns");
                                        srvngsbstn(data.data.sb_stns[srvngsbstncnt], insertId)
                                    } else if (data.data.agntPrfDtls != undefined && data.data.agntPrfDtls.length > 0) {
                                        prfDocs(data.data.agntPrfDtls[prfDtlsCnt], insertId)
                                    } else if (data.data.agntBnkDtls != undefined) {
                                        console.log("goto agntBnkDtls");
                                        console.log("lllllllllllllllllllllllllllll")
                                        srvngbnkAcnt(data.data.agntBnkDtls, insertId)
                                    } else if (data.data.agntPrfDtls.prf_doc_img != undefined) {
                                        console.log("goto imageData");
                                        attachFile(imageData[atcCnt]);
                                    } else {
                                        console.log("in else");
                                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                    }
                                    // srvngasts(data.data.srvng_asts[srvngasrtcnt], insertId, user);
                                } else {
                                    srvngara(data.data.srvng_areas[srvngaracnt], insertId)
                                }
                            }).catch((error) => {
                                console.log("error");
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    }
                    // Tenant Serving Assets
                    function srvngasts(srvAsrtData, insertId) {
                        console.log("in asrts");
                        tenantmdl.srvngAsrtMdl(srvAsrtData, insertId, req.user)
                            .then((srvngAsrtRsults) => {
                                srvngasrtcnt++;
                                if (srvngasrtcnt == data.data.srvng_asts.length) {
                                    if (data.data.sb_stns != undefined && data.data.sb_stns.length > 0) {
                                        srvngsbstn(data.data.sb_stns[srvngsbstncnt], insertId)
                                    } else if (data.data.agntPrfDtls != undefined && data.data.agntPrfDtls.length > 0) {
                                        prfDocs(data.data.agntPrfDtls[prfDtlsCnt], insertId)
                                    } else if (data.data.agntBnkDtls != undefined) {
                                        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
                                        srvngbnkAcnt(data.data.agntBnkDtls, insertId)
                                    } else if (data.data.agntPrfDtls.prf_doc_img != undefined) {
                                        attachFile(imageData[atcCnt]);
                                    } else {
                                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                    }
                                    // srvngsbstn(data.data.sb_stns[srvngsbstncnt], insertId, user)
                                } else {
                                    srvngasts(data.data.srvng_asts[srvngasrtcnt], insertId)
                                }
                            }).catch((error) => {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    }
                    // Tenant Associated Substations
                    function srvngsbstn(sb_stns_data, insertId) {
                        if (sb_stns_data.sb_stn == '') {
                            if (data.data.agntPrfDtls != undefined && data.data.agntPrfDtls.length > 0) {
                                prfDocs(data.data.agntPrfDtls[prfDtlsCnt], insertId)
                            } else if (data.data.agntBnkDtls != undefined) {
                                console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
                                srvngbnkAcnt(data.data.agntBnkDtls, insertId)
                            } else if (data.data.agntPrfDtls.prf_doc_img != undefined) {
                                attachFile(imageData[atcCnt]);
                            } else {
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }
                        } else {
                            tenantmdl.srvngsbstnMdl(sb_stns_data, insertId, req.user)
                                .then((stbstnResults) => {
                                    srvngsbstncnt++;
                                    console.log(data.data.sb_stns.length);
                                    if (srvngsbstncnt == data.data.sb_stns.length) {
                                        if (data.data.agntPrfDtls != undefined && data.data.agntPrfDtls.length > 0) {
                                            prfDocs(data.data.agntPrfDtls[prfDtlsCnt], insertId)
                                        } else if (data.data.agntBnkDtls != undefined) {
                                            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
                                            srvngbnkAcnt(data.data.agntBnkDtls, insertId)
                                        } else if (data.data.agntPrfDtls.prf_doc_img != undefined) {
                                            attachFile(imageData[atcCnt]);
                                        } else {
                                            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                        }
                                        // srvngbnkAcnt(data, insertId, user)
                                    } else {
                                        srvngsbstn(data.data.sb_stns[srvngsbstncnt], insertId)
                                    }
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        }

                    }



                    console.log(imageData.length);
                    function attachFile(atcData) {
                        if (atcData.prf_doc_img && atcData.prf_doc_img != undefined) {
                            attUtil.sveFileLocalSystm(atcData.prf_doc_img, function (err, attChres) {
                                console.log(attChres)
                                fs.appendFile("/glits/filestore/uploads/lmo_registration", function (err) {
                                    data.push({
                                        agent_id: insertId,
                                        image: attChres,
                                        doc_typ: atcData[atcCnt].prf_doc_type,
                                        doc_ctgry: atcData[atcCnt].prf_doc_ctgry,
                                        prf_nu: atcData[atcCnt].prf_nu
                                    })
                                    atcCnt++;
                                    console.log(data);
                                    if (atcData[atcCnt] == imageData.length) {
                                        prfDocs(data[prfDtlsCnt])
                                        // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    } else {
                                        attachFile(imageData[atcCnt]);
                                    }
                                });
                            })
                        } else {
                            prfDocs(imageData[prfDtlsCnt])
                            // atcCnt++;
                            // attachFile(imageData[atcCnt]);
                        }
                    }

                    // Tenant Proof docs
                    function prfDocs(prfDocsData, insertId) {
                        // console.log(prfDocsData);
                        tenantmdl.prfDocMdl(prfDocsData, insertId, req.user)
                            .then((srvngAraResults) => {
                                prfDtlsCnt++;
                                console.log(prfDtlsCnt)
                                console.log(data.data.agntPrfDtls.length)
                                if (prfDtlsCnt == data.data.agntPrfDtls.length) {
                                    if (data.data.agntBnkDtls != undefined) {
                                        console.log("gfgdghghghfghfghfghgfhfghfghfg")
                                        srvngbnkAcnt(data.data.agntBnkDtls, insertId)
                                    } else {
                                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                    }
                                } else {
                                    prfDocs(data.data.agntPrfDtls[prfDtlsCnt], insertId)
                                }
                            }).catch((error) => {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    }

                    // Tenant Bank Details
                    function srvngbnkAcnt(bnkData, insertId) {
                        console.log(bnkData);
                        tenantmdl.srvngbnkAcntMdl(bnkData, insertId, req.user)
                            .then((bkAcntResults) => {
                                // console.log(bkAcntResults)
                                df.formatSucessRes(req, res, bkAcntResults, cntxtDtls, fnm, {});
                            }).catch((error) => {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    }
                }
                else {
                    console.log("in last else");
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }
            }).catch((error) => {
                console.log("in last error");
                // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }).catch(function (error) {
        console.log(error)
    });
}



/**************************************************************************************
* Controller     : getLmoCtrl
* Parameters     : None
* Description    : 
* Change History :
* 11/02/2020   - Srujana M - Initial Function
***************************************************************************************/
exports.getLmoCtrl = (req, res) => {
    var fnm = "getLmoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getLmoMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getLmoCtrl
* Parameters     : None
* Description    : 
* Change History :
* 11/02/2020   - Srujana M - Initial Function
***************************************************************************************/
exports.getAgentByMsoCtrl = (req, res) => {
    var fnm = "getLmomsoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.selectAgentbumsoMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getLmoCtrl
* Parameters     : None
* Description    : 
* Change History :
* 11/02/2020   - Srujana M - Initial Function
***************************************************************************************/
exports.getcafcountbymsoCtrl = (req, res) => {
    var fnm = "getLmomsoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.cafcountbymsoMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getLmoCtrl
* Parameters     : None
* Description    : 
* Change History :
* 11/02/2020   - Srujana M - Initial Function
***************************************************************************************/
exports.getCpeCnttrl = (req, res) => {
    var fnm = "getLmomsoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getCpeCntsMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/***************************************************************************************/
/* Controller     : getDstrtCrntPrvsMnthCntsCtrl
* Parameters     : None
* Description    : Get operations month wise
* Change History :
* 25/05/2020    - ganesh  - Initial Function
/***************************************************************************************/
exports.getCrntPrvsMnthCntsCtrl = (req, res) => {
    var fnm = "getDstrtCrntPrvsMnthCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getCrntMnthCntsMdl(req.params.id, req.user)
        .then((crntMnthRes) => {
            tenantmdl.getPrvsMnthCntsMdl(req.params.id, req.user)
                .then((prvMnthRes) => {
                    df.formatSucessRes(req, res, { crntMnthRes, prvMnthRes }, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : updateAgentCtrl
* Parameters     : None
* Description    : Update Agent Details
* Change History :
***************************************************************************************/
exports.updateAgentCtrl = (req, res) => {
    var agnt_id = req.params.agntid
    var data = req.body.data
    var onboardresults;
    var fnm = "updateAgentCtrl";
    var agntUpdtRes;
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(data);
    // return;
    tenantmdl.selectAgentMdl(agnt_id, req.user)
        .then((getresults) => {
            onboardresults = getresults;
            console.log(onboardresults);
            data['onbrd_in'] = onboardresults[0].onbrd_in;
            if (onboardresults[0].onbrd_in == 0) {
                data['initial_onbrd'] = true;
            } else {
                data['initial_onbrd'] = false;
            }
            // return
            tenantmdl.updateAgentMdl(agnt_id, data, req.user)
                .then((results) => {
                    if (results) {
                        agntUpdtRes = results;
                        console.log("agntUpdtRes")
                        console.log(results)
                        if (data.initial_onbrd == true) {
                            console.log("in on bord con if")
                            tenantmdl.initialPymntAmtInsrtMdl(agnt_id, req.user)
                                .then((pymntres) => {
                                    if (req.body.data.srvng_areas.length != 0) {
                                        tenantmdl.selectAreasrvngMdl(agnt_id, req.user)
                                            .then((Areasrvnresults) => {
                                                // console.log(Areasrvnresults.length);
                                                if (Areasrvnresults.length > 0) {
                                                    var promiseSrvingAreaarray = [];
                                                    if (req.body.data.srvng_areas.length != 0) {
                                                        for (var i = 0; i < req.body.data.srvng_areas.length; i++) {
                                                            promiseSrvingAreaarray.push(tenantmdl.updateAgentSrvingAreaMdl(agnt_id, req.body.data.srvng_areas[i], req.user)
                                                            )
                                                        }
                                                        Promise.all([promiseSrvingAreaarray]).then((srvingresults) => {
                                                            selectAgentsrvn(agnt_id);
                                                            // console.log(srvingresults)
                                                            // df.formatSucessRes(req, res, srvingresults, cntxtDtls, fnm, {});
                                                        }).catch((error) => {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                        });
                                                    }
                                                } else {
                                                    tenantmdl.srvngAraMdl(req.body.data.srvng_areas[0], agnt_id, req.user)
                                                        .then((srvingresults) => {
                                                            selectAgentsrvn(agnt_id);
                                                        }).catch((error) => {
                                                            console.log("error");
                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                        });
                                                }
                                            }).catch((error) => {
                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                            });
                                    } else {
                                        selectAgentsrvn(agnt_id);
                                    }
                                })
                        } else {
                            console.log("in on bord con else")
                            if (req.body.data.srvng_areas.length != 0) {
                                tenantmdl.selectAreasrvngMdl(agnt_id, req.user)
                                    .then((Areasrvnresults) => {
                                        // console.log(Areasrvnresults.length);
                                        if (Areasrvnresults.length > 0) {
                                            var promiseSrvingAreaarray = [];
                                            if (req.body.data.srvng_areas.length != 0) {
                                                for (var i = 0; i < req.body.data.srvng_areas.length; i++) {
                                                    promiseSrvingAreaarray.push(tenantmdl.updateAgentSrvingAreaMdl(agnt_id, req.body.data.srvng_areas[i], req.user)
                                                    )
                                                }
                                                Promise.all([promiseSrvingAreaarray]).then((srvingresults) => {
                                                    selectAgentsrvn(agnt_id);
                                                    // console.log(srvingresults)
                                                    // df.formatSucessRes(req, res, srvingresults, cntxtDtls, fnm, {});
                                                }).catch((error) => {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                });
                                            }
                                        } else {
                                            tenantmdl.srvngAraMdl(req.body.data.srvng_areas[0], agnt_id, req.user)
                                                .then((srvingresults) => {
                                                    selectAgentsrvn(agnt_id);
                                                }).catch((error) => {
                                                    console.log("error");
                                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                });
                                        }
                                    }).catch((error) => {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });
                            } else {
                                selectAgentsrvn(agnt_id);
                            }
                        }
                    }
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });


            function selectAgentsrvn(agnt_id) {
                if (req.body.data.srvng_asts.length != 0) {
                    tenantmdl.selectAgentsrvng_astsMdl(agnt_id, req.user)
                        .then((srvng_astsresults) => {
                            // console.log('srvng_astsresults');
                            // console.log(srvng_astsresults);
                            if (srvng_astsresults.length > 0) {
                                var promisesrvingasetarray = []
                                for (var i = 0; i < req.body.data.srvng_asts.length; i++) {
                                    promisesrvingasetarray.push(tenantmdl.updateAgentSrvingAssetMdl(agnt_id, req.body.data.srvng_asts[i], req.user)
                                    )
                                }
                                Promise.all([promisesrvingasetarray]).then((srvingasetresults) => {
                                    agentsubstns(agnt_id)
                                    // df.formatSucessRes(req, res, srvingasetresults, cntxtDtls, fnm, {});
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                            } else {
                                tenantmdl.srvngAsrtMdl(req.body.data.srvng_asts[0], agnt_id, req.user)
                                    .then((srvngAsrtRsults) => {
                                        agentsubstns(agnt_id)
                                        // df.formatSucessRes(req, res, srvingresults, cntxtDtls, fnm, {});
                                    }).catch((error) => {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });
                            }
                            // df.formatSucessRes(req, res, srvingresults, cntxtDtls, fnm, {});
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                } else {
                    agentsubstns(agnt_id)
                }
            }
            function agentsubstns(agnt_id) {
                var promisesbstnarray = []
                var ct = 0;
                var rslt_ct = 0;
                // console.log("sub--station")
                // console.log(req.body.data.sb_stns)
                // console.log("sub--station")
                // var sub_statins = req.body.data.sb_stns;
                function sub_stations(sub_sttns, agnt_id, user) {
                    console.log("sub_sttns");
                    console.log(sub_sttns);
                    console.log("sub_sttns");
                    if(sub_sttns == undefined){
                        console.log("sub_sttns undefined");
                        agentdcmnts(agnt_id)
                    }else {
                        if(sub_sttns.sbstn_id == undefined){
                            agentdcmnts(agnt_id)
                        }
                        else{
                        tenantmdl.selectSub_Statn_Mdl(sub_sttns, agnt_id, user)
                        .then(function (result) {
                            // console.log(result)
                            // if (result.length) {
                                promisesbstnarray.push(tenantmdl.updateAgentSbstnMdl(agnt_id, sub_sttns, result, user))
                                ct++;
                                if (ct == req.body.data.sb_stns.length) {
                                    // function sub_stations_rslt(rslt, sub_sttns, agnt_id, user) {
                                    //     // console.log(result)
                                    //     promisesbstnarray.push(tenantmdl.updateAgentSbstnMdl(agnt_id,  sub_sttns, rslt,  user))
                                    //     rslt_ct++;
                                    //     if (rslt_ct == req.body.data.sb_stns.length) {
                                    //         agentdcmnts(agnt_id)
                                    //         console.log("khgfhasdg")
                                    //         // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                    //     } else {
                                    //         sub_stations_rslt(req.body.data.sb_stns[rslt_ct], sub_sttns, agnt_id, req.user);
                                    //     }
                                    // }
                                    // sub_stations_rslt(req.body.data.sb_stns[rslt_ct], sub_sttns, agnt_id, req.user);
                                    agentdcmnts(agnt_id)
                                    // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                } else {
                                    sub_stations(req.body.data.sb_stns[ct], agnt_id, req.user);
                                }
                            // }
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                    }
                    }
                    
                }
                sub_stations(req.body.data.sb_stns[ct], agnt_id, req.user);
                // for (var i = 0; i < req.body.data.sb_stns.length; i++) {
                //     console.log(req.body.data.sb_stns[i])
                //     var sub_sttn = req.body.data.sb_stns[i];
                //     if (req.body.data.sb_stns[i].sb_stn_dst != '') {
                //     tenantmdl.selectSub_Statn_Mdl(agnt_id, req.body.data.sb_stns[i])
                //         .then((sb_stsn_results) => {
                //             // console.log("sb_stsn_results")
                //             // console.log(sb_stsn_results)
                //             // console.log("sb_stsn_results")
                //             // return
                //             if (sb_stsn_results) {
                //                 promisesbstnarray.push(tenantmdl.updateAgentSbstnMdl(agnt_id, sub_sttn, sb_stsn_results, req.body.data[i], req.user))
                //             }
                //         })
                //     }
                // }
                // if (promisesbstnarray.length > 0) {
                // console.log(promisesbstnarray.length)
                // Promise.all([promisesbstnarray]).then((sbstnresults) => {
                //     console.log("khgfhasdg")
                //     agentdcmnts(agnt_id)
                //     // df.formatSucessRes(req, res, sbstnresults, cntxtDtls, fnm, {});
                // }).catch((error) => {
                //     df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                // });
                // }

            }

            function agentdcmnts(agnt_id) {
                 console.log("khgfhasdg")
                tenantmdl.selectAgentdcmntsMdl(agnt_id, req.user)
                    .then((agent_dcmntsresults) => {
                        if (agent_dcmntsresults.length > 0) {
                           
                                console.log("else")
                                tenantmdl.updateDcmntMdl(agnt_id, req.body.data, req.user)
                                .then((dcmntresults) => {
                                    agentbnkdtls(agnt_id)
                                    // df.formatSucessRes(req, res, dcmntresults, cntxtDtls, fnm, {});
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                                // agentbnkdtls(agnt_id)
                            
                        } else {
                            tenantmdl.prfDocMdl(req.body.data, agnt_id, req.user)
                                .then((srvngAraResults) => {
                                    agentbnkdtls(agnt_id)
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        }
                    }).catch((error) => {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
            function agentbnkdtls(agnt_id) {
                tenantmdl.selectAgntBnkMDl(agnt_id, req.user)
                    .then((agntbnkResults) => {
                        // console.log(req.body.data);
                        // console.log(agntbnkResults.length);
                        // console.log(req.body.data.acnt_Nu.length);
                        if (req.body.data.acnt_Nu == undefined) {
                            console.log("if bnk")
                            df.formatSucessRes(req, res, agntbnkResults, cntxtDtls, fnm, {});

                        }
                        else{
                        if (agntbnkResults.length > 0) {
                            console.log("if")
                            tenantmdl.updateBankMdl(agnt_id, req.body.data, req.user)
                                .then((bankresults) => {
                                    console.log('onboardresults.onbrd_in')
                                    console.log(onboardresults[0].onbrd_in)
                                    if (onboardresults[0].onbrd_in == 0) {
                                        console.log("kkkkkkkoooooooooooyyyyyyyyyyrrrrrrrrrrr")
                                        if (data.agnt_Typ == 1) {
                                            prnt_cd = "MSO"
                                        } else {
                                            prnt_cd = "APSFL"
                                        }
                                        data_middleware = {
                                            "franchiseCode": data.agnt_Cd,
                                            "franchiseName": data.officeAddress.ofce_cntct_Nm,
                                            "franchiseNetworkName": data.agnt_nm,
                                            "parentPartnerCode": prnt_cd,
                                            "emailId": data.officeAddress.ofce_email,
                                            "phoneno": data.officeAddress.ofce_mble_Nu,
                                            "address1": data.officeAddress.ofce_address1,
                                            "areaCode": data.officeAddress.ofce_ara_nm,
                                            "cityCode": data.officeAddress.ofce_City,
                                            "stateCode": "AP",
                                            "countryCode": "India",
                                            "currencyCode": "INR",
                                            "zipcode": data.officeAddress.ofce_pn_cd
                                        }
                                        // console.log(data_middleware);
                                        var extrnlapicalls = agentBo.addNewAgent(data_middleware)
                                        console.log("644",extrnlapicalls)
                                        extApiCtrl.callApi("Agent Creation", 2, 11, agnt_id, extrnlapicalls, req.user).then(() => {
                                        }).catch((error) => {
											console.log("error",error)
										})
                                        df.formatSucessRes(req, res, agntUpdtRes, cntxtDtls, fnm, {});
                                    }
                                    else{
                                        df.formatSucessRes(req, res, agntUpdtRes, cntxtDtls, fnm, {});
        
                                    }

                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        } else if (req.body.data.acnt_Nu.length > 0) {
                            console.log("else if")
                            tenantmdl.srvngbnkAcntMdl(req.body.data, agnt_id, req.user)
                                .then((bkAcntResults) => {
                                    console.log('onboardresults.onbrd_in')
                                    console.log(onboardresults[0].onbrd_in)
                                    // console.log(bkAcntResults)
                                    if (onboardresults[0].onbrd_in == 0) {
                                        console.log("kkkkkkkoooooooooooyyyyyyyyyyrrrrrrrrrrr")
                                        if (data.agnt_Typ == 1) {
                                            prnt_cd = "MSO"
                                        } else {
                                            prnt_cd = "APSFL"
                                        }
                                        data_middleware = {
                                            "franchiseCode": data.agnt_Cd,
                                            "franchiseName": data.officeAddress.ofce_cntct_Nm,
                                            "franchiseNetworkName": data.agnt_nm,
                                            "parentPartnerCode": prnt_cd,
                                            "emailId": data.officeAddress.ofce_email,
                                            "phoneno": data.officeAddress.ofce_mble_Nu,
                                            "address1": data.officeAddress.ofce_address1,
                                            "areaCode": data.officeAddress.ofce_ara_nm,
                                            "cityCode": data.officeAddress.ofce_City,
                                            "stateCode": "AP",
                                            "countryCode": "India",
                                            "currencyCode": "INR",
                                            "zipcode": data.officeAddress.ofce_pn_cd
                                        }
                                        // console.log(data_middleware);
                                        var extrnlapicalls = agentBo.addNewAgent(data_middleware)
                                        console.log("689",extrnlapicalls)
                                        extApiCtrl.callApi("Agent Creation", 2, 11, agnt_id, extrnlapicalls, req.user).then(() => {
                                        }).catch((error) => {
											console.log("error",error)
										})
                                        df.formatSucessRes(req, res, agntUpdtRes, cntxtDtls, fnm, {});
                                    }
                                    else{
                                        df.formatSucessRes(req, res, agntUpdtRes, cntxtDtls, fnm, {});
        
                                    }
                                    // df.formatSucessRes(req, res, bkAcntResults, cntxtDtls, fnm, {});
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        } else {
                            console.log("else")
                            console.log('onboardresults.onbrd_in')
                            console.log(onboardresults[0].onbrd_in)
                            console.log("in else hear")
                            if (onboardresults[0].onbrd_in == 0) {
                                console.log("kkkkkkkoooooooooooyyyyyyyyyyrrrrrrrrrrr")
                                if (data.agnt_Typ == 1) {
                                    prnt_cd = "MSO"
                                } else {
                                    prnt_cd = "APSFL"
                                }
                                data_middleware = {
                                    "franchiseCode": data.agnt_Cd,
                                    "franchiseName": data.officeAddress.ofce_cntct_Nm,
                                    "franchiseNetworkName": data.agnt_nm,
                                    "parentPartnerCode": prnt_cd,
                                    "emailId": data.officeAddress.ofce_email,
                                    "phoneno": data.officeAddress.ofce_mble_Nu,
                                    "address1": data.officeAddress.ofce_address1,
                                    "areaCode": data.officeAddress.ofce_ara_nm,
                                    "cityCode": data.officeAddress.ofce_City,
                                    "stateCode": "AP",
                                    "countryCode": "India",
                                    "currencyCode": "INR",
                                    "zipcode": data.officeAddress.ofce_pn_cd
                                }
                                // console.log(data_middleware);
                                var extrnlapicalls = agentBo.addNewAgent(data_middleware)
                                console.log("734",extrnlapicalls)
                                extApiCtrl.callApi("Agent Creation", 2, 11, agnt_id, extrnlapicalls, req.user).then(() => {
                                }).catch((error) => {
											console.log("error",error)
										})
                                df.formatSucessRes(req, res, agntUpdtRes, cntxtDtls, fnm, {});
                            }
                            else{
                                df.formatSucessRes(req, res, agntUpdtRes, cntxtDtls, fnm, {});

                            }
                            // df.formatSucessRes(req, res, agntUpdtRes, cntxtDtls, fnm, {});
                        }
                    }
                    }).catch((error) => {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }


        })
}


/**************************************************************************************
* Controller     : delAgentCtrl
* Parameters     : None
* Description    : 
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
***************************************************************************************/
exports.delAgentCtrl = (req, res) => {
    var agnt_id = req.params.agntid
    var fnm = "delAgentCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.delAgentMdl(agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : rejAgentCtrl
* Parameters     : None
* Description    : 
* Change History :
* 03/03/2020    - Koti Machana - Initial Function
***************************************************************************************/
exports.rejAgentCtrl = (req, res) => {
    var agnt_id = req.params.agntid
    var fnm = "rejAgentCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.rejAgentMdl(agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : unrejAgentCtrl
* Parameters     : None
* Description    : 
* Change History :
* 03/03/2020    - Koti Machana - Initial Function
***************************************************************************************/
exports.unrejAgentCtrl = (req, res) => {
    var agnt_id = req.params.agntid
    var fnm = "unrejAgentCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.unrejAgentMdl(agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : getAgntPorts
* Parameters     : None
* Description    : 
* Change History :
* 10/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getAgntPorts = (req, res) => {
    var fnm = "getAgntPorts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let agnt_id = req.params.agntid

    tenantmdl.getPortConnslotsMdl(agnt_id, req.user)
        .then((results) => {
            var groupRes = jsonUtils.groupJsonByKey(results, ['olt_prt_id', 'agnt_id', 'olt_prt_nm', 'olt_id', 'olt_nm', 'sbstn_id', 'sbstn_nm', 'sbstn_type_id', 'sbstn_type_nm'], ['slt1_id', 'slt2_id', 'slt3_id'], 'slots', 'olt_prt_id', 'olt_prt_id', 'asc')
            groupRes.forEach(element => {
                var slttxt = '';
                let count = 0;
                let delimter = ','
                element.slots.forEach(element1 => {
                    if (++count == 4) {
                        delimter = ''
                    }
                    slttxt += element1.slt1_id + '-' + element1.slt2_id + '-' + element1.slt3_id + delimter
                })
                element['slttxt'] = slttxt

            });
            df.formatSucessRes(req, res, groupRes, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getAgntPorts
* Parameters     : None
* Description    : 
* Change History :
* 10/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getAgntDtls = (req, res) => {
    var fnm = "getAgntDtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let agnt_id = req.params.agntid
    tenantmdl.getAgntDtlsMdl(agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getAgntPorts
* Parameters     : None
* Description    : 
* Change History :
* 10/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getAgntDtlsCnts = (req, res) => {
    var fnm = "getAgntDtlsCnts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let agnt_id = req.params.agntid
    tenantmdl.getAgntDtlsCntsMdl(agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getPackAggrmnt
* Parameters     : None
* Description    : 
* Change History :
* 10/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getPackAggrmnt = (req, res) => {
    var fnm = "getPackAggrmnt";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let agnt_id = req.params.agntid
    tenantmdl.getPackAggrmntMdl(agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getPortConnslots
* Parameters     : None
* Description    : 
* Change History :
* 10/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getPortConnslots = (req, res) => {
    var fnm = "getPortConnslots";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let agnt_id = req.params.agntid
    tenantmdl.getPortConnslotsMdl(agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getAgentByIdCtrl
* Parameters     : None
* Description    : 
* Change History :
* 10/02/2020   - Srujana M - Initial Function
***************************************************************************************/
exports.getAgentByIdCtrl = (req, res) => {
    var fnm = "getAgentByIdCtrl";
    var agnt_id = req.params.id;
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiihhhhhhhhhhhhhhhhhhhh")
    // console.log(agnt_id);
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getAgentByIdMdl(agnt_id, req.user)
        .then((results) => {
            var agnt_info = results;
            tenantmdl.getAgentSrvArsByIdMdl(agnt_id, req.user)
                .then((results1) => {
                    var agnt_srvars = results1;
                    tenantmdl.getAgentSrvAsrtByIdMdl(agnt_id, req.user)
                        .then((results2) => {
                            var agnt_srvasrts = results2;
                            tenantmdl.getAgentSbStnsByIdMdl(agnt_id, req.user)
                                .then((results3) => {
                                    var agnt_sbstns = results3;
                                    tenantmdl.getAgentDcmntsByIdMdl(agnt_id, req.user)
                                        .then((results4) => {
                                            var agnt_Dcmnts = results4;
                                            tenantmdl.getAgentBnkByIdMdl(agnt_id, req.user)
                                                .then((results5) => {
                                                    var agnt_Bnk = results5;
                                                    df.formatSucessRes(req, res, { agnt_info, agnt_srvars, agnt_srvasrts, agnt_sbstns, agnt_Dcmnts, agnt_Bnk }, cntxtDtls, fnm, {});
                                                }).catch((error) => {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                });
                                            // df.formatSucessRes(req, res, {agnt_info,agnt_srvars,agnt_srvasrts,agnt_sbstns,agnt_Dcmnts}, cntxtDtls, fnm, {});
                                        }).catch((error) => {
                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                        });
                                    // df.formatSucessRes(req, res, {agnt_info,agnt_srvars,agnt_srvasrts,agnt_sbstns}, cntxtDtls, fnm, {});
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                            // df.formatSucessRes(req, res, {agnt_info,agnt_srvars,agnt_srvasrts}, cntxtDtls, fnm, {});
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : get_districts
* Parameters     : None
* Description    : 
* Change History :
* 11/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_districts = (req, res) => {
    var fnm = "get_districts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.get_districtsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_agent_districts
* Parameters     : None
* Description    : 
* Change History :
* 11/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_agent_districts = (req, res) => {
    var fnm = "get_agent_districts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.get_agent_districtsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_substations
* Parameters     : None
* Description    : 
* Change History :
* 11/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_substations = (req, res) => {
    var fnm = "get_substations";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.get_substationsMdl(req.params.dstID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : get_mandals_villages
* Parameters     : None
* Description    : 
* Change History :
* 11/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_mandals_villages = (req, res) => {
    var fnm = "get_mandals_villages";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.get_mandalMdl(req.params.substnId, req.user)
        .then((mandal) => {
            tenantmdl.get_villagesMdl(mandal)
                .then((villages) => {
                    df.formatSucessRes(req, res, [mandal, villages], cntxtDtls, fnm, {});
                })
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getMsoCtrl
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2020   - Srujana M - Initial Function
***************************************************************************************/
exports.getMsoCtrl = (req, res) => {
    var fnm = "getMsoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getMsoMdl(req.user)
        .then((results) => {
            // var common_feilds = ['mso_id', 'mso_cd', 'mso_nm', 'agnt_ctgry_id', 'mso_onbrd_dt','prtnr_nm', 'mso_cntct_nm','mso_mbl_nu'
            //     ,'mso_enrlt_nu', 'mso_ofc_ste_nm', 'mso_ofc_dstrct_nm', 'mso_ofc_mndl_nm', 'mso_ofc_vlg_nm', 'mso_pstl_rgstn_nu', 'mso_reg_date'];

            // var arrFeilds = ['s_no','lmo_id', 'lmo_cd', 'lmo_nm', 'agnt_ctgry_id', 'prtnr_nm','lmo_onbrd_dt','lmo_cntct_nm','lmo_mbl_nu'
            //     ,'lmo_enrlt_nu', 'lmo_ofc_ste_nm', 'lmo_ofc_dstrct_nm', 'lmo_ofc_mndl_nm', 'lmo_ofc_vlg_nm', 'lmo_pstl_rgstn_nu', 'lmo_reg_date'];
            // var arrName = 'lmoDtls';
            // var groupByKey = 'mso_cd';
            // var sortKey = 'mso_id';
            // var msoDtlsArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : insert_substationsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.insert_substationsCtrl = (req, res) => {
    var fnm = "insert_substationsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.insert_substationsMdl(req.body.data, req.user)
        .then((results) => {
            event.record('SUBSTATION', req.body.data.s_substatn_id, 'AGENT_SUBSTATION_ADDED', "Adding Substation To Agent", req.user);
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getSbStnsLstByAgntIdCtrl
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.getSbStnsLstByAgntIdCtrl = (req, res) => {
    var fnm = "getSbStnsLstByAgntIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getSbStnsLstByAgntIdMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_olts_portsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_olts_portsCtrl = (req, res) => {
    var fnm = "get_olts_portsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.get_olts_portsMdl(req.params.agntID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getDocTypsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getDocTypsCtrl = (req, res) => {
    var fnm = "getDocTypsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getDocTypsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}



/**************************************************************************************
* Controller     : get_mandalsLst
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_mandalsLst = (req, res) => {
    var fnm = "get_mandalsLst";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.get_mandalsLstMdl(req.params.distrctID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_agnet_mandalsLst
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_agnet_mandalsLst = (req, res) => {
    var fnm = "get_agnet_mandalsLst";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.get_agnet_mandalsLstMdl(req.user, req.params.distrctID)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_agnt_vlgeList
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_agnt_vlgeList = function (req, res) {
    var fnm = "get_agnt_vlgeList";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // var mndl_id = req.params.mndl_id
    // Model gets called Here
    tenantmdl.get_agnt_vlgeListMdl(req.user, req.params.mndl_id, req.params.dstrct_id)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_oltDetails
* Parameters     : None
* Description    : 
* Change History :
* 12/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_oltDetails = (req, res) => {
    var fnm = "get_oltDetails";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.get_oltDetailsMdl(req.params.distrctID, req.params.mandalID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : get_portWiseOltDetails
* Parameters     : None
* Description    : 
* Change History :
* 13/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_portWiseOltDetails = (req, res) => {
    var fnm = "get_portWiseOltDetails";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.get_portWiseOltDetailsMdl(req.body.data, req.user)
        .then((portsData) => {
            tenantmdl.get_tenantListMdl(req.body.data, req.user)
                .then((tenantsList) => {
                    df.formatSucessRes(req, res, [portsData, tenantsList], cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });

        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : insert_portToAgent
* Parameters     : None
* Description    : 
* Change History :
* 13/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.insert_portToAgent = (req, res) => {
    var fnm = "insert_portToAgent";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    /*tenantmdl.insert_portToAgentMdl(req.body.data, req.user, (error, result) => {
        if (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }
        else {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        }

    })*/    
	tenantmdl.insert_portToAgentMdl(req.body.data, req.user, (error, result) => {
        if (result) {
            let datafilter = function(index){
				console.log("-------------- req.body.data[index] ",req.body.data[index])
				console.log("-------------- req.body.data.length ",req.body.data.length)
				let data = {
                    "olt_id":req.body.data[index].olt_id,
                    "prt_id":req.body.data[index].olt_prt_id,
                    "splitsdata":"1-4-8,2-4-8,3-4-8,4-4-8"
                }
				oltCtrl.insertDirect_slotsCtrl(data, req.user, req, res, (error, results) => {
                    if(index == req.body.data.length - 1){
						console.log("completed")
						df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
					} else {
						datafilter(index + 1)
					}
                })
				
			}
			datafilter(0)
        }
        else {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        }

    })
}

/**************************************************************************************
* Controller     : insert_portToAgent
* Parameters     : None
* Description    : 
* Change History :
* 10/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getAllAgents = (req, res) => {
    var fnm = "getAllAgents";

    log.info(`In ${fnm}`, 0, cntxtDtls);
    let check = req.params.value;

    tenantmdl.getAllAgentsMdl(check, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : insert_portToAgent
* Parameters     : None
* Description    : 
* Change History :
* 10/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getAllAgentsByCtgry = (req, res) => {
    var fnm = "getAllAgentsByCtgry";
    console.log(req.params)
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let check = req.params.value;
    tenantmdl.getAllAgentsByCtgryMdl(check, req.params.ctgryId, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getAgentOrgnTypeCtrl
* Parameters     : None
* Description    : 
* Change History :
* 16/02/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getAgentOrgnTypeCtrl = (req, res) => {
    var fnm = "getAgentOrgnTypeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getAgentOrgnTypeMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : postAgntEnrlmntDtlsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 16/02/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.postAgntEnrlmntDtlsCtrl = (req, res) => {
    var fnm = "postAgntEnrlmntDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.postAgntEnrlmntDtlsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getAllEnrldAgntsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 16/02/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getAllEnrldAgntsCtrl = (req, res) => {
    var fnm = "getAllEnrldAgntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getAllEnrldAgntsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getAllEnrlRejectCtrl
* Parameters     : None
* Description    : 
* Change History :
***************************************************************************************/
exports.getAllEnrlRejectCtrl = (req, res) => {
    var fnm = "getAllEnrlRejectCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getAllEnrlRejectMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getMsoLmoDtlsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 28/05/2020   - Srujana M - Initial Function
***************************************************************************************/
exports.getMsoLmoDtlsCtrl = (req, res) => {
    var fnm = "getMsoLmoDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getMsoLmoDtlsMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getMsoDtlsByAdhrMblCtrl
* Parameters     : None
* Description    : 
* Change History :
* 28/02/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.getMsoDtlsByAdhrMblCtrl = (req, res) => {
    var fnm = "getMsoDtlsByAdhrMblCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.getMsoDtlsByAdhrMblMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : updateAgntDtlsByRegCtrl
* Parameters     : None
* Description    : 
* Change History :
* 28/02/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.updateAgntDtlsByRegCtrl = (req, res) => {
    var fnm = "updateAgntDtlsByRegCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.updateAgntDtlsByRegMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getMnthlyMSOCollectionsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.getMnthlyMSOCollectionsCtrl = (req, res) => {
    var fnm = "getMnthlyMSOCollectionsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getMnthlyMSOCollectionsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : insrtUsrRlePermsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 17/07/2020    - Srujana M - Initial Function
***************************************************************************************/
exports.insrtUsrRlePermsCtrl = (req, res) => {
    var fnm = "insrtUsrRlePermsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    tenantmdl.insrtUsrRlePermsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

