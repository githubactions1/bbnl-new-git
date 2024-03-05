
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var oltmdl = require('../models/oltMdl');
var dataMigrationMdl = require('../../../modules/dataMigration/models/dataMigrationMdl')
var cafBO = require('../../../modules/caf/cafBO/cafBo')
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var operationsUtils = require(appRoot + '/utils/operations.utils');
var lmoMnthlyOperations = require(appRoot + '/utils/lmoMnthlyOperations.js');
var dbutil = require(appRoot + '/utils/db.utils');
var sms = require(appRoot + '/utils/sms.utils');

var request = require('request');


/**************************************************************************************
* Controller     : prepaidgetMnthlyCollectionsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 08/02/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.prepaidgetMnthlyCollectionsCtrl = (req, res) => {
    var fnm = "prepaidgetMnthlyCollectionsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.prepaidgetMnthlyCollectionsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_oltsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 14/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_oltsCtrl = (req, res) => {
    var fnm = "get_oltsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    if (!req.params.agentID || req.params.agentID == 'undefined') {
        if (req.user.usr_ctgry_id == 10) {
            req.params.agentID = req.user.usr_ctgry_ky
        }
    }
    oltmdl.get_oltsCtrlMdl(req.params.agentID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_slotsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 14/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_slotsCtrl = (req, res) => {
    var fnm = "get_slotsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_slotsCtrlMdl(req.params.oltID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : insert_slotsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 15/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.insert_slotsCtrl = (req, res) => {
    var fnm = "insert_slotsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    port_id = req.body.data.prt_id;

    if (req.body.data.splitsdata != null) {
        var slots = req.body.data.splitsdata.split(',');

        //Add Slots to Port
        s_ct = 0
        function slotInserProcess(port_id, slot) {
            console.log("Adding Slot & Splits: " + slot);
			dataMigrationMdl.getOltDtlsMdl(req.body.data.olt_id, req.user, function (err, oltdata) {
				dataMigrationMdl.addSlot(port_id, slot, req.user, function (err, slotInsertRes) {
					s_ct++;
					if (err) { console.log(err); return }
					var slot_id = slotInsertRes.insertId;
					//Add Splits
					dataMigrationMdl.addSplits(slot_id, slot, s_ct, req.user, oltdata[0], function (err, splitInsertRes) {
						if (err) { console.log(err); return }
						if (s_ct < slots.length) {
							slotInserProcess(port_id, slots[s_ct]);
						}
						else {
							console.log("Done");
							event.record('PORT', req.body.data.prt_id, 'SPLIT_ADDED', "Adding Split To PORT", req.user);
							event.record('OLT', req.body.data.olt_id, 'SPLIT_ADDED', "Adding Split To OLT", req.user);
							df.formatSucessRes(req, res, ['sucess'], cntxtDtls, fnm, {});
						}
					})
				})
			})
        }
        slotInserProcess(port_id, slots[s_ct]);
    }
    // oltmdl.insert_slotsCtrlMdl(req.body.data)
    //     .then((results) => {
    //         df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    //     }).catch((error) => {
    //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //     });
}




/**************************************************************************************
* Controller     : get_ponChangeCtrl
* Parameters     : None
* Description    : 
* Change History :
* 18/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_ponChangeCtrl = (req, res) => {
    var fnm = "get_ponChangeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_ponChangeMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : get_ponChangeSrvrPgntnCtrl
* Parameters     : None
* Description    : 
* Change History :
* 18/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_ponChangeSrvrPgntnCtrl = (req, res) => {
    var fnm = "get_ponChangeSrvrPgntnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_ponChangeSrvrPgntnMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : get_slotsForPortCtrl
* Parameters     : None
* Description    : 
* Change History :
* 19/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_slotsForPortCtrl = (req, res) => {
    var fnm = "get_slotsForPortCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_slotsForPortMdl(req.params.portID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_slotsbyportCtrl
* Parameters     : None
* Description    : 
***************************************************************************************/
exports.get_slotsbyportCtrl = (req, res) => {
    var fnm = "get_slotsForPortCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_slotsbyportMdl(req.params.portID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_allslotsbyportCtrl
* Parameters     : None
* Description    : 
***************************************************************************************/
exports.get_allslotsbyportCtrl = (req, res) => {
    var fnm = "get_allslotsbyportCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_allslotsbyportMdl(req.params.portID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_slottwoForPortCtrl
* Parameters     : None
* Description    : 
***************************************************************************************/
exports.get_slottwoForPortCtrl = (req, res) => {
    var fnm = "get_slottwoForPortCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_slottwoForPortMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_slottwoForPortCtrl
* Parameters     : None
* Description    : 
***************************************************************************************/
exports.get_allslottwoForPortCtrl = (req, res) => {
    var fnm = "get_allslottwoForPortCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_allslottwoForPortMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_slotthreeForPortCtrl
* Parameters     : None
* Description    : 

***************************************************************************************/
exports.get_slotthreeForPortCtrl = (req, res) => {
    var fnm = "get_slotthreeForPortCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_slotthreeForPortMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_allslotthreeForPortCtrl
* Parameters     : None
* Description    : 

***************************************************************************************/
exports.get_allslotthreeForPortCtrl = (req, res) => {
    var fnm = "get_allslotthreeForPortCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_allslotthreeForPortMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_spiltCtrl
* Parameters     : None
* Description    : 
* Change History :
* 19/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_spiltCtrl = (req, res) => {
    var fnm = "get_spiltCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_spiltMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : updt_ponchangeCtrl
* Parameters     : None
* Description    : 
* Change History :
* 19/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.updt_ponchangeCtrl = (req, res) => {
    var fnm = "updt_ponchangeCtrl";
    event.insertReqData("PON CHANGE", "/ponchange", req.body, req.user);
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var nwtp = 0;
    if (req.body.data.olt_crd_nu == 1) {
        nwtp = req.body.data.olt_prt_nm + 8;
    }
    else {
        nwtp = req.body.data.olt_prt_nm
    }

    var data = {
        "subscriberCode": req.body.data.subscr_code,
        "serialNumber": req.body.data.serialNumber,
        "card": req.body.data.olt_crd_nu,
        "tp": nwtp,
        "onuId": req.body.data.olt_onu_id,
        "aghra_cd_hsi": req.body.data.aghra_cd_hsi,
        "aghra_cd_iptv": req.body.data.aghra_cd_iptv,
        "aghra_cd": req.body.data.aghra_cd,
        "aghra_cd_nw": req.body.data.aghra_cd_nw,
        "aaa_cd": req.body.data.old_lag_id,
        "aaa_cd_nw": req.body.data.new_lag_id,
        "ipAddress": req.body.data.olt_ip_addr_tx,
        "upstreamTrafficProfileName": '',
        "downstreamTrafficProfileName": '',
        "name": req.body.data.replacename.split(" ").join(""),
        "tps": req.body.data.tps,
        "fup": [],
        "accessId": req.body.data.acId,
        "profileName": req.body.data.mdle_cd
    }

    data['aghra_cd_nw'] = `${req.body.data.olt_ip_addr_tx}-${req.body.data.olt_crd_nu}-${nwtp}-${req.body.data.olt_onu_id}-HSI`;

    let statusCall = cafBO.onuStatusCall({ aghra_cd: data['aghra_cd_nw'] }, req.user)
    extApiCtrl.callApi("ONU CHECK", 1, 12, req.body.data.caf_id, statusCall, req.user).then((onuRes) => {
        if (!onuRes["res"].hasOwnProperty("id")) {
            console.log("ONU  FREE")
            oltmdl.forExternalApiPckgeServicesMdl(req.body.data, req.user)
                .then((result3) => {
                    for (var m = 0; m < result3.length; m++) {
                        if (result3[m].cre_srvce_id == 2) {
                            console.log(result3[m].expry_dt)
                            // data['servicepacks'].push({ 'servicepack': result3[m].srvcpk_nm,'expirydate':result3[m].dt, 'reason': 'I want To Activate' });
                        }
                        // data['srvcs'].push(result3[m].cre_srvce_id)
                        if (result3[m].aaa_up_nrml != null && result3[m].aaa_dw_nrml != null) {
                            data['fup'].push(result3[m].aaa_up_nrml + '_' + result3[m].aaa_dw_nrml);
                            data['upstreamTrafficProfileName'] = result3[m].up_strm_trfficpfl_nm;
                            data['downstreamTrafficProfileName'] = result3[m].dwn_strm_trfficpfl_nm;
                        }

                    }

                    if (m == result3.length) {
                        console.log(m, result3.length);
                        event.record('CAF', req.body.data.caf_id, 'PON_CHANGED', "Pon changed", req.user);
                        console.log(JSON.stringify(data))
                        let apiCalls = cafBO.ponchangecall(data)
                        console.log(JSON.stringify(apiCalls))
                        oltmdl.updateCafStsMdl({ enty_sts_id: 11 }, req.body.data, req.user)
                        // oltmdl.insrtPonChngDtlMdl(req.body.data, req.user).then((ponChngRes) => {
                        extApiCtrl.callApi("ponchange", 1, 1000001, req.body.data.caf_id, apiCalls, req.user).then(() => {
                            oltmdl.updateCafStsMdl({ enty_sts_id: 6 }, req.body.data, req.user)
                            //  oltmdl.updtPonChngDtlMdl(ponChngRes.insertId, 3, req.user);
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                        oltmdl.updatecustomerDtlsMdl(req.body.data, req.user)
                            .then((cstresults) => {
                                oltmdl.updatecafsDtlsMdl(req.body.data, req.user)
                                    .then((cafresults) => {
                                        oltmdl.updatecafInPortSplitMdl(req.body.data, req.user)
                                            .then((splitresults) => {
                                                oltmdl.updateCafSetupBoxMdl(req.body.data, req.user)
                                                    .then((updtsetupBoxresults) => {
                                                        oltmdl.insertCafSetupBoxMdl(req.body.data, req.user)
                                                            .then((insertsetupBoxresults) => {
                                                                oltmdl.updateSplitsTable(req.body.data, req.user)
                                                                    .then((SplitTable) => {
                                                                        operationsUtils.record('pn_change_ct') // PON change Completed
                                                                        if (req.user.usr_ctgry_id == 8)
                                                                            lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'pon_chnge_ct')
                                                                        df.formatSucessRes(req, res, [cstresults, cafresults, splitresults, updtsetupBoxresults, insertsetupBoxresults, SplitTable], cntxtDtls, fnm, {});
                                                                    })
                                                            })
                                                    })
                                            })

                                    })

                            }).catch((error) => {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });

                    }
                })

        } else {
            console.log("ONU NOT FREE")
            df.formatErrorRes(req, res, [], cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
        }

    })





}




/**************************************************************************************
* Controller     : get_boxchangeSrvrPgntnCtrl
* Parameters     : None
* Description    : 
* Change History :
* 20/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_boxchangeSrvrPgntnCtrl = (req, res) => {
    var fnm = "get_boxchangeSrvrPgntnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_boxchangeSrvrPgntnMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_boxchangeCtrl
* Parameters     : None
* Description    : 
* Change History :
* 20/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_boxchangeCtrl = (req, res) => {
    var fnm = "get_boxchangeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_boxchangeMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : getcollectionDataCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.getcollectionDataCtrl = (req, res) => {
    var fnm = "getcollectionDataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getcollectionDataMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getMnthlyCollectionsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.getMnthlyCollectionsCtrl = (req, res) => {
    var fnm = "getMnthlyCollectionsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getMnthlyCollectionsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
    * Controller     : prepaidgetRevenueSharingMonthWiseCtrl
    * Parameters     : 
    * Description    : 
    * Change History :
    ***************************************************************************************/
 exports.prepaidgetRevenueSharingMonthWiseCtrl = (req, res) => {
    var fnm = "prepaidgetRevenueSharingMonthWiseCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
	console.log("req for mso", req);
    oltmdl.prepaidgetRevenueSharingMonthWiseMdl(req.params.yearId, req.params.agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_activecafsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_activecafsCtrl = (req, res) => {
    var fnm = "get_activecafsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
	oltmdl.get_activecafsMdl(req.body.data, req.user)
		.then((results) => {
			df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
		}).catch((error) => {
			df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
		}); 
}


/**************************************************************************************
* Controller     : get_activecafsSrvrPgntnCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_activecafsSrvrPgntnCtrl = (req, res) => {
    var fnm = "get_activecafsSrvrPgntnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_agnt_dstrtMdl(req.user)
        .then((results1) => {
            console.log(results1)
            oltmdl.get_activecafsSrvrPgntnMdl(req.body.data, results1[0].ofce_dstrt_id, req.user)
                .then((results) => {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_suspendedcafsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_suspendedcafsCtrl = (req, res) => {
    var fnm = "get_suspendedcafsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
	oltmdl.get_suspendedcafsMdl(req.body.data, req.user)
		.then((results) => {
			df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
		}).catch((error) => {
			df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
}

/**************************************************************************************
* Controller     : get_suspendedcafsSrvrPgntnCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_suspendedcafsSrvrPgntnCtrl = (req, res) => {
    var fnm = "get_suspendedcafsSrvrPgntnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // req.user = { "frst_nm": "Srujana", "lst_nm": "Software Innovations Pvt Ltd", "mrcht_id": 1, "mrcht_nm": "glits Software Innovations", "mrcht_usr_id": 2, "pwd_chngd_in": 0, "chng_lg_in": 0, "hyrchy_id": 1, "hyrchy_grp_id": null, "admn_in": 0, "mrcht_usr_nm": "glits", "mbl_nu": 9133313567, "orgn_id": 2, "dprts_id": 3, "dsgn_id": 14, "usr_ctgry_nm": "glits", "usr_ctgry_id": 1, "usr_ctgry_ky": 100005143, "prfle_dshbd_url_tx": "/home", "sde_mnu_prfl_id": 2000001, "mnu_prfle_id": 1, "rpt_prfle_id": 37, "stp_prfle_id": 19, "lstlgn": "23-10-2020  10:46 AM", "prt_in": 2, "caf_in": null, "orgn_nm": "glits Software Innovations Pvt. Ltd.", "dprt_nm": "Information Technology", "dsgn_nm": "IT Developer", "app": "web", "cmpnt_id": 1, "user_id": 2, "iat": 1603431919, "exp": 1603442719, "aud": "http://glits.com", "iss": "glits", "sub": "2_user", "jti": "1" }
    console.log(req.user)
    oltmdl.get_agnt_dstrtMdl(req.user)
        .then((results1) => {
            console.log(results1)
            oltmdl.get_suspendedcafsSrvrPgntnMdl(req.body.data, results1[0].ofce_dstrt_id, req.user)
                .then((results) => {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_bulksuspendedcafsSrvrPgntnCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_bulksuspendedcafsSrvrPgntnCtrl = (req, res) => {
    var fnm = "get_bulksuspendedcafsSrvrPgntnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // req.user = { "frst_nm": "Srujana", "lst_nm": "Software Innovations Pvt Ltd", "mrcht_id": 1, "mrcht_nm": "glits Software Innovations", "mrcht_usr_id": 2, "pwd_chngd_in": 0, "chng_lg_in": 0, "hyrchy_id": 1, "hyrchy_grp_id": null, "admn_in": 0, "mrcht_usr_nm": "glits", "mbl_nu": 9133313567, "orgn_id": 2, "dprts_id": 3, "dsgn_id": 14, "usr_ctgry_nm": "glits", "usr_ctgry_id": 1, "usr_ctgry_ky": 100005143, "prfle_dshbd_url_tx": "/home", "sde_mnu_prfl_id": 2000001, "mnu_prfle_id": 1, "rpt_prfle_id": 37, "stp_prfle_id": 19, "lstlgn": "23-10-2020  10:46 AM", "prt_in": 2, "caf_in": null, "orgn_nm": "glits Software Innovations Pvt. Ltd.", "dprt_nm": "Information Technology", "dsgn_nm": "IT Developer", "app": "web", "cmpnt_id": 1, "user_id": 2, "iat": 1603431919, "exp": 1603442719, "aud": "http://glits.com", "iss": "glits", "sub": "2_user", "jti": "1" }
    console.log("user",req.user);
    console.log("body",req.body);
    oltmdl.get_agnt_dstrtMdl(req.user)
        .then((results1) => {
            console.log(results1)
            oltmdl.get_bulksuspendedcafsSrvrPgntnMdl(req.body.data, results1[0].ofce_dstrt_id, req.user)
                .then((results) => {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : update_activecafsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.update_activecafsCtrl = (req, res) => {
    var fnm = "update_activecafsCtrl";
    event.insertReqData("RESUME", "/caf/active", req.body, req.user);
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data = {
        "subscribercode": req.body.data.subscr_code,
        "servicepacks": [],
        "srvcs": [],
        "accessId": req.body.data.accessId,
        "tel_num": req.body.data.phne_nu,
        "fup": [],
        "aaa_cd": req.body.data.aaa_cd,
        "aghora_cd": req.body.data.aghra_cd.replace("-HSI", ""),
        "ipAddress": req.body.data.olt_ip_addr_tx,
        "card": req.body.data.olt_crd_nu,
        "tp": req.body.data.olt_prt_nm,
        "onuId": req.body.data.olt_onu_id
    }
    if (data["card"] == 1) {
        data["tp"] = data["card"] + 8
    }
    console.log(JSON.stringify(data))
    oltmdl.forExternalApiPckgeServicesMdl(req.body.data, req.user)
        .then((result3) => {
            for (var m = 0; m < result3.length; m++) {
                if (result3[m].cre_srvce_id == 2) {
                    console.log(result3[m].expry_dt)
                    data['servicepacks'].push({ 'servicepack': result3[m].srvcpk_nm, 'expirydate': '29991231', 'reason': 'I want To Activate' });
                }
                data['srvcs'].push(result3[m].cre_srvce_id)
                if (result3[m].aaa_up_nrml != null && result3[m].aaa_dw_nrml != null)
                    data['fup'].push(result3[m].aaa_up_nrml + '_' + result3[m].aaa_dw_nrml)
            }
            if (m == result3.length) {
                console.log("&&&&&&&&&&&&&&&&&&resumeeeeeeeeeeeeeee&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log(data);
                let apiCalls = cafBO.resumeCalls(data);
                console.log(JSON.stringify(apiCalls))
                oltmdl.updateCafStsMdl({ enty_sts_id: 85 }, req.body.data, req.user).then((result) => {
                    df.formatSucessRes(req, res, ['true', result], cntxtDtls, fnm, {});
                })
                extApiCtrl.callApi("active", 1, 3, req.body.data.caf_id, apiCalls, req.user).then(() => {
                    oltmdl.updateCafStsMdl({ actve_in: 1, spnd_in: 0, rsme_ts: "CURRENT_TIMESTAMP()", enty_sts_id: 6 }, req.body.data, req.user)
                        .then((results) => {
                            oltmdl.insertcstmrspndForActive(req.body.data, req.user)
                                .then((result) => {
                                    event.record('CAF', req.body.data.caf_id, 'RESUMED', "Caf Resumed", req.user);
                                    if (req.body.data.caf_type_id == 1) {
                                        operationsUtils.record('indvl_caf_rsme_ct') // Domestic/Individual CAF resume operation completed
                                        if (req.user.usr_ctgry_id == 8)
                                            lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'rsmed_caf_ct')
                                    }
                                    else if (req.body.data.caf_type_id == 2) {
                                        operationsUtils.record('entre_caf_rsme_ct')  // enterprise CAF resume Operation completed
                                        if (req.user.usr_ctgry_id == 8)
                                            lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'rsmed_caf_ct')
                                        // df.formatSucessRes(req, res, ['true', result], cntxtDtls, fnm, {});
                                    }
                                })
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }).catch((error) => {
                    console.log("RESUME FAILED")
                    if (error.apiPartial == true) {
                        oltmdl.updateCafStsMdl({ enty_sts_id: 85 }, req.body.data, req.user)
                        df.formatSucessRes(req, res, ['pending', {}], cntxtDtls, fnm, {});
                        // oltmdl.update_partily_resumecafsMdl(req.body.data, req.user)
                        //     .then((results) => {
                        //         oltmdl.insertcstmrspndForActive(req.body.data, req.user)
                        //             .then((result) => {
                        //                 event.record('CAF', req.body.data.caf_id, 'SUSPENDED', "Caf Suspended", req.user);
                        //                 df.formatSucessRes(req, res, ['pending', result], cntxtDtls, fnm, {});
                        //             })

                        //     }).catch((error) => {
                        //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        //     });
                    }
                    else if (error.apiPartial == false) {
                        df.formatErrorRes(req, res, ['failed', result], cntxtDtls, fnm, {});
                    }
                });

            }
        })


}



/**************************************************************************************
* Controller     : get_paymntmodesCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_paymntmodesCtrl = (req, res) => {
    var fnm = "get_paymntmodesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_paymntmodesMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : get_dueAmountCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_dueAmountCtrl = (req, res) => {
    var fnm = "get_dueAmountCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_dueAmountMdl(req.params.cstmrID, req.params.agentID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}





// /**************************************************************************************
// * Controller     : insertmonthlyPaymentsCtrl
// * Parameters     : None
// * Description    : 
// * Change History :
// * 24/02/2020    - MADHURI NUNE - Initial Function
// ***************************************************************************************/
// exports.insertmonthlyPaymentsCtrl = (req, res) => {
//     var fnm = "insertmonthlyPaymentsCtrl";
//     log.info(`In ${fnm}`, 0, cntxtDtls);
//     oltmdl.insertPaymentsMdl(req.body.data,req.user)
//         .then((paymnts) => {
//             console.log("***************************************");
//             console.log(paymnts);
//             console.log("***************************************");
//             df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
//         }).catch((error) => {
//             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//         });
// }



/**************************************************************************************
* Controller     : insertmonthlyPaymentsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
// exports.insertmonthlyPaymentsCtrl = (req, res) => {
//     var fnm = "insertmonthlyPaymentsCtrl";
//     log.info(`In ${fnm}`, 0, cntxtDtls);
//     var x = 0;
//     console.log("&&&&&&&&&&&&&&&&&&&&&")
//     console.log(req.body.data.insertData);
//     console.log("&&&&&&&&&&&&&&&&&&&&&")
//     function myFirstrecursiveFnc(data, agent_id, user) {
//         dbutil.getNxtKey('pmnt_id').then((pmnt_id) => {
//             oltmdl.insertPaymentsMdl(data, agent_id, user, pmnt_id)
//             .then((FirstResults) => {
//                 req.body.data.insertData[x].pmnt_id = pmnt_id;
//                 oltmdl.updatepayedINdicator(data)
//                 .then((frthResults) => {
//                     df.formatSucessRes(req, res, frthResults, cntxtDtls, fnm, {});
//                     }).catch((error) => {
//                         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//                     });
//                 x++;

//                 if (x < req.body.data.insertData.length) {
//                     oltmdl.updateCustomrPaymntDtls(req.body.data.insertData[x - 1], req.body.data.agntID, req.user)
//                         .then((SecondResults) => {
//                             myFirstrecursiveFnc(req.body.data.insertData[x], req.body.data.agntID, req.user);
//                         })
//                 }
//                 if (x == req.body.data.insertData.length) {
//                     oltmdl.updateCustomrPaymntDtls(req.body.data.insertData[x - 1], req.body.data.agntID, req.user)
//                         .then((SecondResults) => {
//                             oltmdl.insertInvoicePaymentsMdl(req.body.data, req.user)
//                                 .then((thirdResults) => {
//                                     event.record('CUSTOMER', req.body.data.insertData[0].cstmr_id, 'PAYMENT_MADE', "Due Amount Payment Made", req.user);
//                                     df.formatSucessRes(req, res, thirdResults, cntxtDtls, fnm, {});
//                                 }).catch((error) => {
//                                     df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//                                 });
//                         })

//                 }

//             }).catch((error) => {
//                 df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//             });
//         })


//     }

//     myFirstrecursiveFnc(req.body.data.insertData[x], req.body.data.agntID, req.user);

// }


/**************************************************************************************
* Controller     : insertmonthlyPaymentsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.insertmonthlyPaymentsCtrl = (req, res) => {
    var fnm = "insertmonthlyPaymentsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var x = 0;

    console.log("&&&&&&&&&&&&&&&&&&&&&")
    console.log(req.body.data.insertData);
    console.log("&&&&&&&&&&&&&&&&&&&&&")
    function myFirstrecursiveFnc(data, agent_id, user) {
        dbutil.getNxtKey('pmnt_id').then((pmnt_id) => {
            oltmdl.insertPaymentsMdl(data, agent_id, user, pmnt_id)
                .then((FirstResults) => {
                    req.body.data.insertData[x].pmnt_id = pmnt_id;
                    oltmdl.updatepayedINdicator(data, user)
                        .then((frthResults) => {
                            x++;

                            if (x < req.body.data.insertData.length) {
                                oltmdl.updateCustomrPaymntDtls(req.body.data.insertData[x - 1], req.body.data.agntID, req.user)
                                    .then((SecondResults) => {
                                        myFirstrecursiveFnc(req.body.data.insertData[x], req.body.data.agntID, req.user);
                                    })
                            }
                            if (x == req.body.data.insertData.length) {
                                oltmdl.updateCustomrPaymntDtls(req.body.data.insertData[x - 1], req.body.data.agntID, req.user)
                                    .then((SecondResults) => {
                                        oltmdl.insertInvoicePaymentsMdl(req.body.data, req.user)
                                            .then((thirdResults) => {
                                                event.record('CUSTOMER', req.body.data.insertData[0].cstmr_id, 'PAYMENT_MADE', "Due Amount Payment Made", req.user);
                                                df.formatSucessRes(req, res, thirdResults, cntxtDtls, fnm, {});
                                            }).catch((error) => {
                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                            });
                                    })


                            }
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        })


    }

    myFirstrecursiveFnc(req.body.data.insertData[x], req.body.data.agntID, req.user);

}


/**************************************************************************************
* Controller     : update_suspendcafsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 25/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.update_suspendcafsCtrl = (req, res) => {
    var fnm = "update_suspendcafsCtrl";
    event.insertReqData("SUSPENTION", "/caf/suspend", req.body, req.user);
    function getMsgId() {
        return (new Date()).toISOString().replace(/[^0-9]/g, "").slice(0, -3)
    }
    function getCurrentTs() {
        return new Date().toISOString().
            replace(/T/, ' ').
            replace(/\..+/, '');
    }
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data = {
        "subscribercode": req.body.data.subscr_code,
        "servicepacks": [],
        "srvcs": [],
        "accessId": req.body.data.accessId,
        "tel_nu": req.body.data.phne_nu,
        "fup": [],
        "aaa_cd": req.body.data.aaa_cd,
        "aghora_cd": req.body.data.aghra_cd.replace("-HSI", ""),
        "ipAddress": req.body.data.olt_ip_addr_tx,
        "card": req.body.data.olt_crd_nu,
        "tp": req.body.data.olt_prt_nm,
        "onuId": req.body.data.olt_onu_id
    }
    if (data["card"] == 1) {
        data["tp"] = data["tp"] + 8
    }

    oltmdl.forExternalApiPckgeServicesMdl(req.body.data, req.user)
        .then((result3) => {
            for (var m = 0; m < result3.length; m++) {
                if (result3[m].cre_srvce_id == 2)
                    data['servicepacks'].push({ 'servicepack': result3[m].srvcpk_nm, 'reason': req.body.data.spnd_reason });
                data['srvcs'].push(result3[m].cre_srvce_id)
                if (result3[m].aaa_up_nrml != null && result3[m].aaa_dw_nrml != null)
                    data['fup'].push(result3[m].aaa_up_nrml + '_' + result3[m].aaa_dw_nrml)
            }
            if (m == result3.length) {
                data["msg_id"] = getMsgId();
                data["ts"] = getCurrentTs();
                data['servicepacks'] = data['servicepacks']
                let apiCalls = cafBO.suspenstionCalls(data);
                console.log(JSON.stringify(apiCalls))
                oltmdl.check_suspendsMdl(req.body.data, req.user)
                    .then((check) => {
                        console.log(check[0].value);
                        if (check[0].value == 'true') {
                            oltmdl.updateCafStsMdl({ enty_sts_id: 84 }, req.body.data, req.user).then((updtRes) => {
                                df.formatSucessRes(req, res, ['pending', {}], cntxtDtls, fnm, req.user);
                            }).catch((err) => {
                                df.formatErrorRes(req, res, err, cntxtDtls, fnm, {});
                            })
                            extApiCtrl.callApi("suspension", 1, 2, req.body.data.caf_id, apiCalls, req.user).then(() => {
                                console.log("SUSPEND DONE")
                                oltmdl.updateCafStsMdl({ actve_in: 0, spnd_in: 1, spnd_ts: "CURRENT_TIMESTAMP()", enty_sts_id: 7 }, req.body.data, req.user)
                                    .then((results) => {
                                        oltmdl.insertcstmrspndForSuspend(req.body.data, req.user)
                                            .then((result) => {
                                                event.record('CAF', req.body.data.caf_id, 'SUSPENDED', "Caf Suspended", req.user);
                                                if (req.body.data.caf_type_id == 1) {
                                                    operationsUtils.record('indvl_caf_spntn_ct') // Individual CAF Suspended
                                                    if (req.user.usr_ctgry_id == 8)
                                                        lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'spnd_caf_ct')
                                                }

                                                else if (req.body.data.caf_type_id == 2) {
                                                    operationsUtils.record('entre_caf_spntn_ct') // enterprise CAF suspended
                                                    if (req.user.usr_ctgry_id == 8)
                                                        lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'spnd_caf_ct')
                                                    // df.formatSucessRes(req, res, ['true', result], cntxtDtls, fnm, {});
                                                }

                                            })

                                    }).catch((error) => {
                                        // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });


                            })
                                .catch((error) => {
                                    console.log("SUSPEND FAILED")
                                    if (error.apiPartial == true) {
                                        oltmdl.updateCafStsMdl({ enty_sts_id: 84 }, req.body.data, req.user)
                                        //df.formatSucessRes(req, res, ['pending', {}], cntxtDtls, fnm, {});
                                        // oltmdl.update_partily_suspendcafsMdl(req.body.data, req.user)
                                        //     .then((results) => {
                                        //         oltmdl.insertcstmrspndForSuspend(req.body.data, req.user)
                                        //             .then((result) => {
                                        //                 event.record('CAF', req.body.data.caf_id, 'SUSPENDED', "Caf Suspended", req.user);
                                        //                 df.formatSucessRes(req, res, ['pending', result], cntxtDtls, fnm, {});
                                        //             })

                                        //     }).catch((error) => {
                                        //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                        //     });
                                    }
                                    else if (error.apiPartial == false) {
                                        // df.formatErrorRes(req, res, ['failed', result], cntxtDtls, fnm, {});
                                    }
                                });

                        }
                        else if (check[0].value == 'false') {
                            df.formatSucessRes(req, res, ['false', check], cntxtDtls, fnm, {});
                        }
                    })
            }
        })

}

/**************************************************************************************
* Controller     : update_bulk_suspendcafsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 25/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.update_bulk_suspendcafsCtrl = (req, res) => {
    var fnm = "update_bulk_suspendcafsCtrl";
    console.log(req.body.data)
    function getMsgId() {
        return (new Date()).toISOString().replace(/[^0-9]/g, "").slice(0, -3)
    }
    function getCurrentTs() {
        return new Date().toISOString().
            replace(/T/, ' ').
            replace(/\..+/, '');
    }
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let suspCafs = [];
    let suspndData = req.body.data;
    let suspendCaf = function (index) {
        let data = {
            "subscribercode": suspndData[index].subscr_code,
            "servicepacks": [],
            "srvcs": [],
            "accessId": suspndData[index].accessId,
            "tel_nu": suspndData[index].phne_nu,
            "fup": [],
            "aaa_cd": suspndData[index].aaa_cd,
            "aghora_cd": suspndData[index].aghra_cd.replace("-HSI", ""),
            "ipAddress": suspndData[index].olt_ip_addr_tx,
            "card": suspndData[index].olt_crd_nu,
            "tp": suspndData[index].olt_prt_nm,
            "onuId": suspndData[index].olt_onu_id
        }
        if (data["card"] == 1) {
            data["tp"] = data["tp"] + 8
        }

        oltmdl.forExternalApiPckgeServicesMdl(suspndData[index], req.user)
            .then((result3) => {
                for (var m = 0; m < result3.length; m++) {
                    if (result3[m].cre_srvce_id == 2)
                        data['servicepacks'].push({ 'servicepack': result3[m].srvcpk_nm, 'reason': suspndData[index].spnd_reason });
                    data['srvcs'].push(result3[m].cre_srvce_id)
                    if (result3[m].aaa_up_nrml != null && result3[m].aaa_dw_nrml != null)
                        data['fup'].push(result3[m].aaa_up_nrml + '_' + result3[m].aaa_dw_nrml)
                }
                if (m == result3.length) {
                    data["msg_id"] = getMsgId();
                    data["ts"] = getCurrentTs();
                    data['servicepacks'] = data['servicepacks']
                    let apiCalls = cafBO.suspenstionCalls(data);
                    console.log(JSON.stringify(apiCalls))
                    oltmdl.check_suspendsMdl(suspndData[index], req.user)
                        .then((check) => {
                            console.log(check[0].value);
                            if (check[0].value == 'true') {
                                suspCafs.push({ caf_id: suspndData[index].caf_id, status: 1, msg: "CAF suspension initiated" })
                                oltmdl.updateCafStsMdl({ enty_sts_id: 84 }, suspndData[index], req.user).then((updtRes) => {
                                    if (index == suspndData.length - 1)
                                        df.formatSucessRes(req, res, suspCafs, cntxtDtls, fnm, req.user);
                                    else
                                        suspendCaf(index + 1)
                                }).catch((err) => {
                                    df.formatErrorRes(req, res, err, cntxtDtls, fnm, {});
                                })
                                extApiCtrl.callApi("suspension", 1, 2, suspndData[index].caf_id, apiCalls, req.user).then(() => {
                                    console.log("SUSPEND DONE")
                                    oltmdl.updateCafStsMdl({ actve_in: 0, spnd_in: 1, spnd_ts: "CURRENT_TIMESTAMP()", enty_sts_id: 7 }, suspndData[index], req.user)
                                        .then((results) => {
                                            oltmdl.insertcstmrspndForSuspend(suspndData[index], req.user)
                                                .then((result) => {
                                                    event.record('CAF', suspndData[index].caf_id, 'SUSPENDED', "Caf Suspended", req.user);
                                                    if (suspndData[index].caf_type_id == 1) {
                                                        operationsUtils.record('indvl_caf_spntn_ct') // Individual CAF Suspended
                                                        if (req.user.usr_ctgry_id == 8)
                                                            lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'spnd_caf_ct')
                                                    }

                                                    else if (suspndData[index].caf_type_id == 2) {
                                                        operationsUtils.record('entre_caf_spntn_ct') // enterprise CAF suspended
                                                        if (req.user.usr_ctgry_id == 8)
                                                            lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'spnd_caf_ct')
                                                        // df.formatSucessRes(req, res, ['true', result], cntxtDtls, fnm, {});
                                                    }

                                                })

                                        }).catch((error) => {
                                            // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                        });


                                })
                                    .catch((error) => {
                                        console.log("SUSPEND FAILED")
                                        if (error.apiPartial == true) {
                                            oltmdl.updateCafStsMdl({ enty_sts_id: 84 }, suspndData[index], req.user)
                                            // df.formatSucessRes(req, res, ['pending', {}], cntxtDtls, fnm, {});
                                            // oltmdl.update_partily_suspendcafsMdl(req.body.data, req.user)
                                            //     .then((results) => {
                                            //         oltmdl.insertcstmrspndForSuspend(req.body.data, req.user)
                                            //             .then((result) => {
                                            //                 event.record('CAF', req.body.data.caf_id, 'SUSPENDED', "Caf Suspended", req.user);
                                            //                 df.formatSucessRes(req, res, ['pending', result], cntxtDtls, fnm, {});
                                            //             })

                                            //     }).catch((error) => {
                                            //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                            //     });
                                        }
                                        else if (error.apiPartial == false) {
                                            // df.formatErrorRes(req, res, ['failed', result], cntxtDtls, fnm, {});
                                        }
                                    });

                            }
                            else if (check[0].value == 'false') {
                                suspCafs.push({ caf_id: suspndData[index].caf_id, status: 0, msg: "This caf is already suspended in this month" })
                                if (index == suspndData.length - 1)
                                    df.formatSucessRes(req, res, suspCafs, cntxtDtls, fnm, {});
                                else
                                    suspendCaf(index + 1)
                            }
                        })
                }
            })

    }

    suspendCaf(0)


}

/**************************************************************************************
* Controller     : get_terminationCtrl
* Parameters     : None
* Description    : 
* Change History :
* 26/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_terminationCtrl = (req, res) => {
    var fnm = "get_terminationCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_terminationMdl(req.params.agntID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : to_terminationCtrl
* Parameters     : None
* Description    : 
* Change History :
* 26/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.to_terminationCtrl = (req, res) => {
    var fnm = "to_terminationCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.to_terminationMdl(req.params.cafId, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : get_iptvDetails
* Parameters     : None
* Description    : 
* Change History :
* 26/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_iptvDetailsCtrl = (req, res) => {
    var fnm = "get_iptvDetailsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_iptvDetailsMdl(req.params.iptvserialNo, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_onuDetailsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 26/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_onuDetailsCtrl = (req, res) => {
    var fnm = "get_onuDetailsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_onuDetailsMdl(req.params.onuserialNo, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : updateBoxChangeCtrl
* Parameters     : None
* Description    : 
* Change History :
* 26/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.updateBoxChangeCtrl = (req, res) => {
    var fnm = "updateBoxChangeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    event.insertReqData("BOX CHANGE", "/caf/setupbox", req.body, req.user);
    var data = {
        "subscriberCode": req.body.data.subscr_code,
        "remarks": req.body.data.change_comment,
        "oldDevice": req.body.data.old_iptv_mac_adrs,
        "newDevice": req.body.data.new_iptv_mac_adrs,
        "ipAddress": req.body.data.olt_ip_addr_tx,
        "serialNumber": req.body.data.serialNumber,
        "card": req.body.data.card,
        "tp": req.body.data.tp,
        "onuId": req.body.data.onuId,
        "type": '10023',
        "id": req.body.data.id,
        "aaa_cd": req.body.data.aaa_cd,
        "fup": [],
        "servicepacks": [],
        "srvcs": [],
        "accessId": req.body.data.accessid,
    }
    if (data["card"] == 1) {
        data["tp"] = data["tp"] + 8;
    }
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&data&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(data);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&data&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    oltmdl.forExternalApiPckgeServicesMdl(req.body.data, req.user)
        .then((result3) => {
            for (var m = 0; m < result3.length; m++) {
                if (result3[m].cre_srvce_id == 2) {
                    console.log(result3[m].expry_dt)
                    data['servicepacks'].push({ 'servicepack': result3[m].srvcpk_nm, 'expirydate': result3[m].dt, 'reason': 'I want To Activate' });
                }
                data['srvcs'].push(result3[m].cre_srvce_id)
                if (result3[m].aaa_up_nrml != null && result3[m].aaa_dw_nrml != null)
                    data['fup'].push(result3[m].aaa_up_nrml + '_' + result3[m].aaa_dw_nrml)
            }
            if (m == result3.length) {
                event.record('CAF', req.body.data.caf_id, 'BOX_CHANGED', "box changing", req.user);
                let apiCalls = cafBO.boxchangeCall(data)
                oltmdl.updateCafStsMdl({ enty_sts_id: 10 }, req.body.data, req.user).then((result) => {
                    extApiCtrl.callApi("boxchange", 1, 1000002, req.body.data.caf_id, apiCalls, req.user).then(() => {
                        console.log("resultsssssssssssssssssssssss");
                        oltmdl.updateCafStsMdl({ enty_sts_id: 6 }, req.body.data, req.user)
                        oltmdl.updateinvoicesetupbox(req.body.data, req.user)
                            .then((invioceResult) => {
                                oltmdl.updateBoxChangeMdl(req.body.data, req.user)
                                    .then((results) => {
                                        //oltmdl.insertBothIptvOnuMdl(req.body.data, req.user)
                                            //.then((iptvOnuResult) => {
                                                operationsUtils.record('bx_chnge_ct') // Box change Completed
                                                if (req.user.usr_ctgry_id == 8)
                                                    lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'box_chnge_ct')
                                            //}).catch((error) => {
                                            //});


                                    }).catch((error) => {
                                        // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });
                            })
                    }).catch((error) => {
                        //df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
                    df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});

                }).catch(() => {
                    df.formatErrorRes(req, res, [], cntxtDtls, fnm, {});
                })

            }
        }).catch((error) => {
            df.formatErrorRes(req, res, ['packagefalse', result3], cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updateBoxChangeDoubleCtrl
* Parameters     : None
* Description    : 
* Change History :
* 26/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.updateBoxChangeDoubleCtrl = (req, res) => {
    var fnm = "updateDoubleBoxChangeDoubleCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var data = {
        "subscriberCode": req.body.data.subscr_code,
        "remarks": req.body.data.change_comment,
        "oldDevice": req.body.data.old_iptv_mac_adrs,
        "newDevice": req.body.data.new_iptv_mac_adrs,
        "ipAddress": req.body.data.olt_ip_addr_tx,
        "serialNumber": req.body.data.serialNumber,
        "card": req.body.data.card,
        "tp": req.body.data.tp,
        "onuId": req.body.data.onuId,
        "type": '10023',
        "id": req.body.data.id,
        "aaa_cd": req.body.data.aaa_cd,
        "fup": [],
        "servicepacks": [],
        "srvcs": [],
        "accessId": req.body.data.accessid,
    }
    if (data["card"] == 1) {
        data["tp"] = data["tp"] + 8;
    }
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&data&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(req.body.data);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&data&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    oltmdl.forExternalApiPckgeServicesMdl(req.body.data, req.user)
        .then((result3) => {
            for (var m = 0; m < result3.length; m++) {
                if (result3[m].cre_srvce_id == 2) {
                    console.log(result3[m].expry_dt)
                    data['servicepacks'].push({ 'servicepack': result3[m].srvcpk_nm, 'expirydate': result3[m].dt, 'reason': 'I want To Activate' });
                }
                data['srvcs'].push(result3[m].cre_srvce_id)
                if (result3[m].aaa_up_nrml != null && result3[m].aaa_dw_nrml != null)
                    data['fup'].push(result3[m].aaa_up_nrml + '_' + result3[m].aaa_dw_nrml)
            }
            if (m == result3.length) {
                event.record('CAF', req.body.data.caf_id, 'BOX_CHANGED', "box changing", req.user);
                let apiCalls = cafBO.doubleBoxchangeCall(data, req.body.data.changed)
                console.log(JSON.stringify(apiCalls))
                oltmdl.updateCafStsMdl({ enty_sts_id: 10 }, req.body.data, req.user).then((result) => {
                    extApiCtrl.callApi("boxchange", 1, 1000002, req.body.data.caf_id, apiCalls, req.user).then(() => {
                        console.log("resultsssssssssssssssssssssss");
                        oltmdl.updateCafStsMdl({ enty_sts_id: 6 }, req.body.data, req.user)
                        oltmdl.updateInvoiceDblSetupbox(req.body.data, req.user)
                            .then((invioceResult) => {
                                oltmdl.updateDblBoxChangeMdl(req.body.data, req.user)
                                    .then((results) => {
                                        //oltmdl.insertBothIptvOnuMdl(req.body.data, req.user)
                                            //.then((iptvOnuResult) => {
                                                operationsUtils.record('bx_chnge_ct') // Box change Completed
                                                if (req.user.usr_ctgry_id == 8)
                                                    lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'box_chnge_ct')
                                            //}).catch((error) => {
                                            //});

                                    }).catch((error) => {
                                        // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });
                            })
                    }).catch((error) => {
                        //df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
                    df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});

                }).catch(() => {
                    df.formatErrorRes(req, res, [], cntxtDtls, fnm, {});
                })

            }
        }).catch((error) => {
            df.formatErrorRes(req, res, ['packagefalse', result3], cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_oltInstallAddress
* Parameters     : 
* Description    : get olt installation address based on olt location
* Change History :
* 29/02/2020    - Srivalli Yalla - Initial Function
***************************************************************************************/
exports.get_oltInstallAddress = (req, res) => {
    var fnm = "get_oltInstallAddress";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_oltinstaladdrMdl(req.body, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getOltdtls
* Parameters     : 
* Description    : get olt installation address based on olt location
* Change History :
***************************************************************************************/
exports.getOltdtls = (req, res) => {
    var fnm = "getOltdtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getOltdtlsMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getOltdtlsByagentId
* Parameters     : 
* Description    : get olt installation address based on olt location
* Change History :
***************************************************************************************/
exports.getOltdtlsByagentId = (req, res) => {
    var fnm = "getOltdtlsByagentId";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getOltdtlsByagentIdMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_olts
* Parameters     : None
* Description    : 
* Change History :
* 12/03/2020    - Koti Machana - Initial Function
***************************************************************************************/
exports.get_olts = (req, res) => {
    var fnm = "get_olts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_oltsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
  * Controller     : get_sbstns
  * Parameters     : 
  * Description    : get Sub Stations
  * Change History :
  ***************************************************************************************/
exports.get_sbstns = (req, res) => {
    var fnm = "get_sbstns";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_sbstnsMdl(req.params.dstrct_id, req.params.mndl_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
  * Controller     : get_sbstnstypeCtrl
  * Parameters     : 
  * Description    : get Sub Stations Tpes
  * Change History :
  ***************************************************************************************/
exports.get_sbstnstypeCtrl = (req, res) => {
    var fnm = "get_sbstnstypeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_sbstnstypeMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
    * Controller     : getOltPortDtlsByAgntIdCtrl
    * Parameters     : 
    * Description    : get olt installation address based on olt location
    * Change History :
    ***************************************************************************************/
exports.getOltPortDtlsByAgntIdCtrl = (req, res) => {
    var fnm = "getOltPortDtlsByAgntIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getOltPortDtlsByAgntIdMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
    * Controller     : updateOltdtls
    * Parameters     : 
    * Description    : Update OLT Details
    * Change History :
    ***************************************************************************************/
exports.updateOltdtls = (req, res) => {
    var fnm = "updateOltdtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data)
    // return;
    oltmdl.updateOltdtlsMdl(req.body.data, req.params.olt_id, req.user)
        .then((results) => {
            // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            if (results) {
                oltmdl.updateoltMntrngdtlsMdl(req.body.data, req.params.olt_id, req.user)
                    .then((results) => {
                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                    }).catch((error) => {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
    * Controller     : insertOltdtls
    * Parameters     : 
    * Description    : Update OLT Details
    * Change History :
    ***************************************************************************************/
exports.insertOltdtls = (req, res) => {
    var fnm = "insertOltdtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var req_body = req.body.data ? req.body.data : req.body;
    req_body = replaceQuotesFromStrng(req_body);
	console.log("req_body",req_body)
	    oltmdl.insertOltdtlsMdl(req_body, req.user)
        .then((results) => {
            console.log(req_body)
            console.log(results.insertId)
            var insertId = results.insertId;
            // var oltprtdata = req_body[portarray]
            // var oltprtcnt = 0;
            // function oltprts(oltprtdata, insertId) {
            //     console.log("in asrts");
            //     oltmdl.insertOltprtMdl(oltprtdata, insertId, req.user)
            //         .then((oltprtRsults) => {
            //             oltprtcnt++;
            //             if (oltprtcnt == req_body.portarray.length) {
            //                 df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            //             } else {
            //                 oltprts(req_body.portarray[oltprtcnt], insertId)
            //             }
            //         }).catch((error) => {
            //             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            //         });
            // }
            // oltprts(req_body.portarray[oltprtcnt], insertId)
            oltmdl.insertOltMntrngdtlsMdl(req_body, insertId, req.user)
                .then((results) => {
                    // var oltprtdata = req_body[portarray]
                    var oltprtcnt = 0;
                    function oltprts(oltprtdata, insertId) {
                        console.log("in asrts");
                        oltmdl.insertOltprtMdl(oltprtdata, insertId, req.user)
                            .then((oltprtRsults) => {
								if(oltprtdata.portno == 1){
                                    console.log("data",oltprtRsults)
                                    log.info(`In ${fnm}`, 0, cntxtDtls);
                                    port_id = oltprtRsults.insertId;
                                    let splitsdata="1-4-8,2-4-8,3-4-8,4-4-8"
                                
                                    if (splitsdata != null) {
                                        var slots = splitsdata.split(',');
                                
                                        //Add Slots to Port 
                                        s_ct = 0
                                        function slotInserProcess(port_id, slot) {
                                            console.log("Adding Slot & Splits: " + slot);
                                            dataMigrationMdl.getOltDtlsMdl(insertId, req.user, function (err, olrdata) {
                                                dataMigrationMdl.addSlot(port_id, slot, req.user, function (err, slotInsertRes) {
                                                    s_ct++;
                                                    if (err) { console.log(err); return }
                                                    var slot_id = slotInsertRes.insertId;
                                                    //Add Splits
													
                                                    dataMigrationMdl.addSplits(slot_id, slot, s_ct, req.user, olrdata[0], function (err, splitInsertRes) {
                                                        if (err) { console.log(err); return }
                                                        if (s_ct < slots.length) {
                                                            slotInserProcess(port_id, slots[s_ct]);
                                                        }
                                                        else {
                                                            console.log("Done");
                                                            //event.record('PORT', data.prt_id, 'SPLIT_ADDED', "Adding Split To PORT", user);
                                                            //event.record('OLT', data.olt_id, 'SPLIT_ADDED', "Adding Split To OLT", user);
                                                            //callback(err, splitInsertRes);
                                                            //return ;
                                                        }
                                                    })
                                                })
                                            })
                                        }
                                        slotInserProcess(port_id, slots[s_ct]);
                                    }
                                }
                                oltprtcnt++;
                                if (oltprtcnt == req_body.portarray.length) {
                                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                } else {
                                    oltprts(req_body.portarray[oltprtcnt], insertId)
                                }
                            }).catch((error) => {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    }
                    oltprts(req_body.portarray[oltprtcnt], insertId)
                    // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
            // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
    /*oltmdl.insertOltdtlsMdl(req_body, req.user)
        .then((results) => {
            console.log(req_body)
            console.log(results.insertId)
            var insertId = results.insertId;
            // var oltprtdata = req_body[portarray]
            // var oltprtcnt = 0;
            // function oltprts(oltprtdata, insertId) {
            //     console.log("in asrts");
            //     oltmdl.insertOltprtMdl(oltprtdata, insertId, req.user)
            //         .then((oltprtRsults) => {
            //             oltprtcnt++;
            //             if (oltprtcnt == req_body.portarray.length) {
            //                 df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            //             } else {
            //                 oltprts(req_body.portarray[oltprtcnt], insertId)
            //             }
            //         }).catch((error) => {
            //             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            //         });
            // }
            // oltprts(req_body.portarray[oltprtcnt], insertId)
            oltmdl.insertOltMntrngdtlsMdl(req_body, insertId, req.user)
                .then((results) => {
                    // var oltprtdata = req_body[portarray]
                    var oltprtcnt = 0;
                    function oltprts(oltprtdata, insertId) {
                        console.log("in asrts");
                        oltmdl.insertOltprtMdl(oltprtdata, insertId, req.user)
                            .then((oltprtRsults) => {
                                oltprtcnt++;
                                if (oltprtcnt == req_body.portarray.length) {
                                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                } else {
                                    oltprts(req_body.portarray[oltprtcnt], insertId)
                                }
                            }).catch((error) => {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    }
                    oltprts(req_body.portarray[oltprtcnt], insertId)
                    // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
            // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });*/
}

/**************************************************************************************
   * Controller     : deleteOltdtls
   * Parameters     : 
   * Description    : Delete OLT
   * Change History :
   ***************************************************************************************/
exports.deleteOltdtls = (req, res) => {
    var fnm = "deleteOltdtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.deleteOltdtlsMdl(req.params.olt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
    * Controller     : getRevenueSharingMonthWiseCtrl
    * Parameters     : 
    * Description    : 
    * Change History :
    ***************************************************************************************/
exports.getRevenueSharingMonthWiseCtrl = (req, res) => {
    var fnm = "getRevenueSharingMonthWiseCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getRevenueSharingMonthWiseMdl(req.params.yearId, req.params.agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
    * Controller     : getRevenueSharingCustomerWiseCtrl
    * Parameters     : 
    * Description    : 
    * Change History :
    ***************************************************************************************/
exports.getRevenueSharingCustomerWiseCtrl = (req, res) => {
    var fnm = "getRevenueSharingCustomerWiseCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getRevenueSharingCustomerWiseMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
    * Controller     : getRevenueSharingCustomerWisePageNationsCtrl
    * Parameters     : 
    * Description    : 
    * Change History :
    ***************************************************************************************/
exports.getRevenueSharingCustomerWisePageNationsCtrl = (req, res) => {
    var fnm = "getRevenueSharingCustomerWisePageNationsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getRevenueSharingCustomerWisePageNationsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
    * Controller     : getRevenueSharingCustomerWiseDetailsCtrl
    * Parameters     : 
    * Description    : 
    * Change History :
    ***************************************************************************************/
exports.getRevenueSharingCustomerWiseDetailsCtrl = (req, res) => {
    var fnm = "getRevenueSharingCustomerWiseDetailsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getRevenueSharingCustomerWiseDetailsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
Controller     : getTotalRevenueSharingCustomerWiseDetailsMdl
Parameters     :
Description    :
Change History :
***************************************************************************************/

exports.getTtlRvnShrngCusDtlsCtrl = (req, res) => {
    var fnm = "getTtlRvnShrngCusDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getTtlRvnShrngCusDtlsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});

        });
}



/**************************************************************************************
* Controller     : get_prvoususpnstn
* Parameters     : None
* Description    : 
* Change History :
* 24/03/2020    - MADHURI NUNE 
***************************************************************************************/
exports.get_prvoususpnstn = (req, res) => {
    var fnm = "get_prvoususpnstn";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_prvoususpnstnMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : validtion_box
* Parameters     : None
* Description    : 
* Change History :
* 24/03/2020    - MADHURI NUNE 
***************************************************************************************/
exports.validtion_box = (req, res) => {
    var fnm = "validtion_box";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.validtion_boxMdl(req.params.id, req.user)
        .then((results) => {
            console.log("&&&&&&&&&&&&&&&results&&&&&&&&&&&&&&&");
            console.log(results.length);
            df.formatSucessRes(req, res, [results.length, results], cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_olts_sbstn_ctrl
* Parameters     : None
* Description    : 
* Change History :
* 10/04/2020    - srivalli y - Initial Function
***************************************************************************************/
exports.get_olts_sbstn_ctrl = (req, res) => {
    var fnm = "get_olts_sbstn_ctrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_olts_sbstn_Mdl(req.params.agentID, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : validationDataForSplits
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.validationDataForSplits = (req, res) => {
    var fnm = "validationDataForSplits";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.validationDataForSplits(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getPonchangeCafctrl
* Parameters     : None
* Description    : 
* Change History :
***************************************************************************************/
exports.getPonchangeCafctrl = (req, res) => {
    var fnm = "getPonchangeCafctrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getPonchangeCafMdl(req.params.cafId, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getBoxchangeCafctrl
* Parameters     : None
* Description    : 
* Change History :
***************************************************************************************/
exports.getBoxchangeCafctrl = (req, res) => {
    var fnm = "getBoxchangeCafctrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getBoxchangeCafMdl(req.params.cafId, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getLmoMsgctrl
* Parameters     : None
* Description    : 
* Change History :
***************************************************************************************/
exports.getLmoMsgctrl = (req, res) => {
    var fnm = "getLmoMsgctrl";
    // log.info(`In ${fnm}`, 0, cntxtDtls);
    // console.log(req.user)
    oltmdl.getLmoMsgMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getRevenueSharing
* Parameters     : 
* Description    : get olt installation address based on olt location
* Change History :
* 16/05/2020    - Madhuri Nune - Initial Function
***************************************************************************************/
exports.getRevenueSharing = (req, res) => {
    var fnm = "getRevenueSharing";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getRevenueSharingMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getRevenueSharingCafCount
* Parameters     : 
* Description    : get olt installation address based on olt location
* Change History :
* 16/05/2020    - Madhuri Nune - Initial Function
***************************************************************************************/
exports.getRevenueSharingCafCount = (req, res) => {
    var fnm = "getRevenueSharingCafCount";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getRevenueSharingCafCount(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getLmoRevenueSharing
* Parameters     : 
* Description    : get olt installation address based on olt location
* Change History :
* 16/05/2020    - Madhuri Nune - Initial Function
***************************************************************************************/
exports.getLmoRevenueSharing = (req, res) => {
    var fnm = "getLmoRevenueSharing";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getLmoRevenueSharing(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getAgntPonCountsCntrl
* Parameters     : None
* Description    : 
* Change History :
***************************************************************************************/
exports.getAgntPonCountsCntrl = (req, res) => {
    var fnm = "getAgntPonCountsCntrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.user)
    oltmdl.getAgntPonCountsMdl(req.user)

        .then(function (results) {
            if (results && results.length) {
                var common_feilds = ['s_no', 'olt_id', 'olt_nm', 'olt_ip_addr_tx', 'dstrt_nm', 'agnt_cd'];
                var arrFeilds = ['olt_id', 'olt_nm', 'olt_prt_nm', 'caf_cnt', 'caf_rmng', 'ttl', 'nw', 'created_on', 'ofce_mbl_nu', 'agnt_id'];
                var arrName = 'oltCafCounts';
                var groupBy = 'olt_id';
                var sortKey = 'olt_id';
                var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

                console.log('groupres --------------------')
                console.log(groupres);
                df.formatSucessRes(req, res, groupres, cntxtDtls, fnm, {});
            }
            else {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            }

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
    // .then((results) => {
    //     df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    // }).catch((error) => {
    //     df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    // });
}

/**************************************************************************************
* Controller     : getAgntPonAssgnedCafCtrl
* Parameters     : None
* Description    : 
* Change History :
***************************************************************************************/
exports.getAgntPonAssgnedCafCtrl = (req, res) => {
    var fnm = "getAgntPonAssgnedCafCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body)
    oltmdl.getAgntPonAssgnedCafMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
    * Controller     : getMsoRevenueSharingMonthWiseCtrl
    * Parameters     : 
    * Description    : 
    * Change History :
    ***************************************************************************************/
exports.getMsoRevenueSharingMonthWiseCtrl = (req, res) => {
    var fnm = "getMsoRevenueSharingMonthWiseCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getMsoRevenueSharingMonthWiseMdl(req.params.year, req.params.agnt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : getOltLstCtrl
* Parameters     : None
* Description    : 
* Change History :
* 13/07/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.getOltLstCtrl = (req, res) => {
    var fnm = "getOltLstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getOltLstMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : getRefreshOltLstCtrl
* Parameters     : None
* Description    : 
* Change History :
* 13/07/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.getRefreshOltLstCtrl = (req, res) => {
    var fnm = "getRefreshOltLstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data;
    var api_res;
    data = req.body.data;
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(data);
    request.get(`http://172.16.0.44:8080/agorang/rest/v1/eml/equipment/${data.olt_ip_addr_tx}`, function (err, req_res, body) {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "120", err_message: "Failed to get OLT details." });
        }
        else {
            api_res = JSON.parse(body);
            console.log(api_res.operationalState);
            console.log(data.oprtnl_ste_id);
            if (data.oprtnl_ste_id != api_res.operationalState && data.olt_sts_id == api_res.admin) {
                oltmdl.insrtStateMdl(data, api_res, req.user)
                    .then((results) => {
                        oltmdl.updtOltLtrctMdl(data, api_res, req.user)
                            .then((results1) => {
                                oltmdl.scltOltLtrctMdl(data, api_res, req.user)
                                    .then((trackRslts) => {
                                        df.formatSucessRes(req, res, trackRslts, cntxtDtls, fnm, {});
                                    })
                            })
                    })
            }
            else if (data.oprtnl_ste_id == api_res.operationalState && data.olt_sts_id != api_res.admin) {
                oltmdl.insrtStatusMdl(data, api_res, req.user)
                    .then((results) => {
                        oltmdl.updtOltLtrctMdl(data, api_res, req.user)
                            .then((results1) => {
                                oltmdl.scltOltLtrctMdl(data, api_res, req.user)
                                    .then((trackRslts) => {
                                        df.formatSucessRes(req, res, trackRslts, cntxtDtls, fnm, {});
                                    })
                            })
                    })
            }
            else if (data.oprtnl_ste_id != api_res.operationalState && data.olt_sts_id != api_res.admin) {
                oltmdl.insrtStateMdl(data, api_res, req.user)
                    .then((results) => {
                        oltmdl.insrtStatusMdl(data, api_res, req.user)
                            .then((results1) => {
                                oltmdl.updtOltLtrctMdl(data, api_res, req.user)
                                    .then((results2) => {
                                        oltmdl.scltOltLtrctMdl(data, api_res, req.user)
                                            .then((trackRslts) => {
                                                df.formatSucessRes(req, res, trackRslts, cntxtDtls, fnm, {});
                                            })
                                    })
                            })
                    })
            }
            else if (data.oprtnl_ste_id == api_res.operationalState && data.olt_sts_id == api_res.admin) {
                console.log("elseIFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
                oltmdl.updtOltLtrctMdl(data, api_res, req.user)
                    .then((results) => {
                        oltmdl.scltOltLtrctMdl(data, api_res, req.user)
                            .then((trackRslts) => {
                                df.formatSucessRes(req, res, trackRslts, cntxtDtls, fnm, {});
                            })
                    })
            }


        }
    })

}




/**************************************************************************************
* Controller     : getIsueCtrgryCtrl
* Parameters     : None
* Description    : 
* Change History :
* 14/07/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.getIsueCtrgryCtrl = (req, res) => {
    var fnm = "getIsueCtrgryCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getIsueCtrgryMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : postOutgeCtrl
* Parameters     : None
* Description    : 
* Change History :
***************************************************************************************/
exports.postOutgeCtrl = (req, res) => {
    var fnm = "postOutgeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body)

    oltmdl.getOutgeMdl(req.body.data, req.user)
        .then((results) => {
            console.log(results)
            console.log(results.length)
            if (results.length == 0) {

                oltmdl.insrtOutgeMdl(req.body.data, req.user)
                    .then((insrtresults) => {
                        oltmdl.insrtOutgeReltnMdl(req.body.data, req.user, insrtresults.insertId)
                            .then((insrtrelresults) => {
                                oltmdl.getNmbrMdl(req.body.data, req.user)
                                    .then((gtresults) => {
                                        var postData = {
                                            "alrt_aplcn_id": "1",
                                            "sms_msg_tx": gtresults[0].olt_nm + " |" + gtresults[0].olt_ip_addr_tx + " |" + gtresults[0].oprtnl_ste_chnge_ts + "\n" + req.body.data.relCmnts[0].cmntext,
                                            "phne_nu": gtresults[0].mble1_ph + "," + gtresults[0].ofce_mbl_nu,
                                            // "phne_nu": "9492187666" +","+ "9440121059",
                                            "enty_id": 5,
                                            "enty_ky": req.body.data.olt_id,
                                            "ntfcn_cgry_id": 6
                                        }
                                        var options = {
                                            method: 'post',
                                            body: postData, // Javascript object
                                            json: true, // Use,If you are sending JSON data
                                            url: 'http://202.53.92.35/apiv1/alerts/notifications/sms/send/simple'
                                        }

                                        request(options, function (err, resn, body) {
                                            if (err) {
                                                df.formatErrorRes(req, res, { error_status: "120", err_message: "Failed to post SMS." }, cntxtDtls, fnm, {});
                                            }
                                            else {
                                                df.formatSucessRes(req, res, gtresults, cntxtDtls, fnm, {});
                                            }
                                        })

                                        // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                    }).catch((error) => {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });


                            })
                    })
            }
            else {
                oltmdl.updtOutgeMdl(req.body.data, req.user)
                    .then((updtresults) => {
                        oltmdl.insrtOutgeReltnMdl(req.body.data, req.user, req.body.data.olt_outage_id)
                            .then((insrtrelresults) => {
                                oltmdl.getNmbrMdl(req.body.data, req.user)
                                    .then((gtresults) => {
                                        var postData = {
                                            "alrt_aplcn_id": "1",
                                            "sms_msg_tx": gtresults[0].olt_nm + " |" + gtresults[0].olt_ip_addr_tx + " |" + gtresults[0].oprtnl_ste_chnge_ts + "\n" + req.body.data.relCmnts[0].cmntext,
                                            "phne_nu": gtresults[0].mble1_ph + "," + gtresults[0].ofce_mbl_nu,
                                            // "phne_nu": "9492187666" +","+ "9440121059",
                                            "enty_id": 5,
                                            "enty_ky": req.body.data.olt_id,
                                            "ntfcn_cgry_id": 6
                                        }
                                        var options = {
                                            method: 'post',
                                            body: postData, // Javascript object
                                            json: true, // Use,If you are sending JSON data
                                            url: 'http://202.53.92.35/apiv1/alerts/notifications/sms/send/simple'
                                        }

                                        request(options, function (err, resn, body) {
                                            if (err) {
                                                df.formatErrorRes(req, res, { error_status: "120", err_message: "Failed to post SMS." }, cntxtDtls, fnm, {});
                                            }
                                            else {
                                                df.formatSucessRes(req, res, gtresults, cntxtDtls, fnm, {});
                                            }
                                        })
                                    }).catch((error) => {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });


                            })
                    })
            }

        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : postmultipleOutgeCtrl
* Parameters     : None
* Description    : 
* Change History :
***************************************************************************************/
exports.postmultipleOutgeCtrl = (req, res) => {
    var fnm = "postmultipleOutgeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var x = 0;
    console.log(req.body.data)

    function myMultipleOltsRecursiveFnc(data, user) {
        if (data.olt_outage_id > 0) {
            console.log("updateeeeeeeeeee")
            oltmdl.updtOutgeMdl(data, user)
                .then((updtresults) => {
                    oltmdl.insrFrMultipletOutgeReltnMdl(data, user, data.olt_outage_id)
                        .then((insrtrelresults) => {
                            oltmdl.getNmbrMdl(data, user)
                                .then((gtresults) => {
                                    console.log(gtresults);
                                    var postData = {
                                        "alrt_aplcn_id": "1",
                                        "sms_msg_tx": gtresults[0].olt_nm + " |" + gtresults[0].olt_ip_addr_tx + " |" + gtresults[0].oprtnl_ste_chnge_ts + "\n" + data.relCmnts,
                                        "phne_nu": gtresults[0].mble1_ph + "," + gtresults[0].ofce_mbl_nu,
                                        // "phne_nu": "9492187666" +","+ "9440121059",
                                        "enty_id": 5,
                                        "enty_ky": data.olt_id,
                                        "ntfcn_cgry_id": 6
                                    }
                                    console.log(postData);
                                    var options = {
                                        method: 'post',
                                        body: postData, // Javascript object
                                        json: true, // Use,If you are sending JSON data
                                        url: 'http://202.53.92.35/apiv1/alerts/notifications/sms/send/simple'
                                    }

                                    request(options, function (err, resn, body) {
                                        x++
                                        if (x == req.body.data.length) {
                                            if (err) {
                                                df.formatErrorRes(req, res, { error_status: "120", err_message: "Failed to post SMS." }, cntxtDtls, fnm, {});
                                            }
                                            else {
                                                df.formatSucessRes(req, res, gtresults, cntxtDtls, fnm, {});
                                            }
                                        }
                                        if (x < req.body.data.length) {
                                            myMultipleOltsRecursiveFnc(req.body.data[x], req.user);
                                        }
                                    })
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
        else {
            oltmdl.insrtOutgeMdl(data, user)
                .then((insrtresults) => {
                    oltmdl.insrFrMultipletOutgeReltnMdl(data, user, insrtresults.insertId)
                        .then((insrtrelresults) => {
                            oltmdl.getNmbrMdl(data, user)
                                .then((gtresults) => {
                                    var postData = {
                                        "alrt_aplcn_id": "1",
                                        "sms_msg_tx": gtresults[0].olt_nm + " |" + gtresults[0].olt_ip_addr_tx + " |" + gtresults[0].oprtnl_ste_chnge_ts + "\n" + data.relCmnts,
                                        "phne_nu": gtresults[0].mble1_ph + "," + gtresults[0].ofce_mbl_nu,
                                        // "phne_nu": "9492187666" +","+ "9440121059",
                                        "enty_id": 5,
                                        "enty_ky": data.olt_id,
                                        "ntfcn_cgry_id": 6
                                    }
                                    var options = {
                                        method: 'post',
                                        body: postData, // Javascript object
                                        json: true, // Use,If you are sending JSON data
                                        url: 'http://202.53.92.35/apiv1/alerts/notifications/sms/send/simple'
                                    }

                                    request(options, function (err, resn, body) {
                                        x++
                                        if (x == req.body.data.length) {
                                            if (err) {
                                                df.formatErrorRes(req, res, { error_status: "120", err_message: "Failed to post SMS." }, cntxtDtls, fnm, {});
                                            }
                                            else {
                                                df.formatSucessRes(req, res, gtresults, cntxtDtls, fnm, {});
                                            }
                                        }
                                        if (x < req.body.data.length) {
                                            myMultipleOltsRecursiveFnc(req.body.data[x], req.user);
                                        }
                                    })

                                    // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });


                        })

                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    }
    myMultipleOltsRecursiveFnc(req.body.data[x], req.user);
}







/**************************************************************************************
    * Controller     : getoutageOltCtrl
    * Parameters     : 
    * Description    : 
    * Change History :
    ***************************************************************************************/
exports.getoutageOltCtrl = (req, res) => {
    var fnm = "getoutageOltCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getoutageOltMdl(req.params.oltid, req.user)
        .then((results) => {
            oltmdl.getoutageCmntsMdl(req.params.oltid, req.user)
                .then((cmntresults) => {
                    oltmdl.getPhnbrMdl(req.params.oltid, req.user)
                        .then((phnmbrRslts) => {
                            df.formatSucessRes(req, res, [results, cmntresults, phnmbrRslts], cntxtDtls, fnm, {});
                        })
                })
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
    * Controller     : getisueSubCtgryOltCtrl
    * Parameters     : 
    * Description    : 
    * Change History :
**********************************************************************************/
exports.getisueSubCtgryOltCtrl = (req, res) => {
    var fnm = "getisueSubCtgryOltCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getisueSubCtgryOltMdl(req.params.catid, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
    * Controller     : getsplitDtlsbyIpCtrl
    * Parameters     : 
    * Description    : 
    * Change History :
**********************************************************************************/
exports.getsplitDtlsbyIpCtrl = (req, res) => {
    console.log(req.body.data)
    var data = req.body.data;
    var fnm = "getsplitDtlsbyIpCtrl";
    var olt_id
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.getoltidsMdl(data.ip, req.user)
        .then((oltresults) => {
            // console.log(oltresults)
            for (var i = 0; i < oltresults.length; i++) {
                if (oltresults[i].crd_id == data.crd) {
                    olt_id = oltresults[i].olt_id
                }
            }
            // console.log(olt_id)
            oltmdl.getprtsMdl(olt_id, data.pon, req.user).then((prtresults) => {
                // console.log(prtresults)
                oltmdl.getspltsMdl(prtresults[0].olt_prt_id, data.onu, req.user).then((spltresults) => {
                    // console.log(spltresults)
                    df.formatSucessRes(req, res, spltresults, cntxtDtls, fnm, {});
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
* Controller     : get_olt_mntrng
* Parameters     : None
* Description    : 
* Change History :
* 22/10/2020    - Koti Machana - Initial Function
***************************************************************************************/
exports.get_olt_mntrng = (req, res) => {
    var fnm = "get_olt_mntrng";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_olt_mntrngMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
    * Controller     : insertOltMntrngdtls
    * Parameters     : 
    * Description    : Update OLT Details
    * Change History :
    ***************************************************************************************/
exports.pullOltMntrngdtls = (req, res) => {
    var fnm = "insertOltdtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.selctoltdataMdl(req.user)
        .then((results) => {
            if (results.length > 0) {
                console.log(results)
                var oltprtcnt = 0;
                function oltprts(data, olt_id) {
                    // console.log("in asrts");
                    oltmdl.insertOltMntrngdtlsMdl(data, olt_id, req.user)
                        .then((oltprtRsults) => {
                            oltprtcnt++;
                            if (oltprtcnt == results.length) {
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            } else {
                                oltprts(results[oltprtcnt], results[oltprtcnt].olt_id)
                            }
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }
                oltprts(results[oltprtcnt], results[oltprtcnt].olt_id)
            } else {
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            }
            // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
    * Controller     : updateoltMntrngdtls
    * Parameters     : 
    * Description    : Update OLT Ltrack Details
    * Change History :
    ***************************************************************************************/
exports.updateoltMntrngdtls = (req, res) => {
    var fnm = "updateOltdtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data)
    // return;
    oltmdl.updateoltMntrngdtlsMdl(req.body.data, req.params.olt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
   * Controller     : deleteoltMntrngDtl
   * Parameters     : 
   * Description    : Delete OLT
   * Change History :
   ***************************************************************************************/
exports.deleteoltMntrngDtl = (req, res) => {
    var fnm = "deleteoltMntrngDtl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.deleteoltMntrngDtlMdl(req.params.olt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
   * Controller     : activeoltMntrngDtl
   * Parameters     : 
   * Description    : Delete OLT
   * Change History :
   ***************************************************************************************/
exports.activeoltMntrngDtl = (req, res) => {
    var fnm = "activeoltMntrngDtl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.activeoltMntrngDtlMdl(req.params.olt_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : sendSmsOltUpDwn
* Parameters     : None
* Description    : 
* Change History :
***************************************************************************************/
exports.sendSmsOltUpDwn = (req, res) => {
    var fnm = "postOutgeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log("sendSmsOltUpDwn -------------------------- olt down or up ",req.body)

    if (req.headers.api_key && req.headers.api_key == '5619dfdg195gpsv28nkjvwer73mxwenviwr19ogpo0w4nc') {
		if(req.body.status == "down"){
			var oltNm = req.body.olt_name;
			//var tmplt_id = '1107161779004969071';
			var smsMsg= `OLT is Down ${oltNm} Team - APSFL`;
			//var smsMsg= `OLT ${oltNm} is Down`;
			var phoneNo = req.body.mobile_num;
			//var phoneNo = 9908255277;
			var down = 0;
			var options = {
				method: 'get',
				rejectUnauthorized: false,
				url : 'https://smsgw.sms.gov.in/failsafe/MLink?username=fibernet.sms&pin=V@7e%233Ty&message='+smsMsg+'&mnumber=91'+phoneNo+'&signature=APFIBR&dlt_entity_id=1101379100000041570&dlt_template_id=1107163170541700167'
			}
			console.log("options", options);
			//console.log("tmplt_id", tmplt_id);
			oltmdl.oltstsUpdateMdl(req.body, down).then((results) => {
				console.log("Olt Down ")
			})
			request(options, function (err, resn, body) {
				console.log("err, body", err, body);
				if (err) {
					df.formatErrorRes(req, res, { error_status: "120", err_message: "Failed to post SMS." }, cntxtDtls, fnm, {});
				}
				else {
					df.formatSucessRes(req, res, smsMsg, cntxtDtls, fnm, {});
				}
			})
		} else {
			var oltNm = req.body.olt_name;
			//var tmplt_id = '1107161779007619148';
			var smsMsg= `OLT is Up ${oltNm} Team - APSFL`;
			//var smsMsg= `OLT ${oltNm} is Up`;
			var phoneNo = req.body.mobile_num;
			//var phoneNo = 9908255277;
			var up = 1;
			var options = {
				method: 'get',
				rejectUnauthorized: false,
				url : 'https://smsgw.sms.gov.in/failsafe/MLink?username=fibernet.sms&pin=V@7e%233Ty&message='+smsMsg+'&mnumber=91'+phoneNo+'&signature=APFIBR&dlt_entity_id=1101379100000041570&dlt_template_id=1107163170537891494'
			}
			console.log("options", options);
			//console.log("tmplt_id", tmplt_id);
			oltmdl.oltstsUpdateMdl(req.body, up).then((results) => {
				console.log("Olt UP ")
			})
			request(options, function (err, resn, body) {
				if (err) {
					df.formatErrorRes(req, res, { error_status: "120", err_message: "Failed to post SMS." }, cntxtDtls, fnm, {});
				}
				else {
					df.formatSucessRes(req, res, smsMsg, cntxtDtls, fnm, {});
				}
			})
		}
    }
}

/**************************************************************************************
* Controller     : get_advncersmeactivecafsSrvrPgntnCtrl
* Parameters     : None
* Description    : 
* Change History :
* 21/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_advncersmeactivecafsSrvrPgntnCtrl = (req, res) => {
    var fnm = "get_advncersmeactivecafsSrvrPgntnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    oltmdl.get_advncersmeactivecafsSrvrPgntnMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : get_bbnlolts_sbstn_Ctrl
* Parameters     : None
* Description    : 
* Change History :
* 01/08/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.get_bbnlolts_sbstn_Ctrl = (req, res) => {
    var fnm = "get_bbnlolts_sbstn_Ctrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    oltmdl.get_bbnlolts_sbstn_Mdl(req.params.agentID, req.params.apsflBbnl, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getapsflBbnloltsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/08/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.getapsflBbnloltsCtrl = (req, res) => {
    var fnm = "getapsflBbnloltsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    if (!req.params.agentID || req.params.agentID == 'undefined') {
        if (req.user.usr_ctgry_id == 10) {
            req.params.agentID = req.user.usr_ctgry_ky
        }
    }
    oltmdl.getapsflBbnloltsCtrlMdl(req.params.agentID, req.params.cafid, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getapsflBbnl_oltsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/08/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.getapsflBbnl_oltsCtrl = (req, res) => {
    var fnm = "getapsflBbnl_oltsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    if (!req.params.agentID || req.params.agentID == 'undefined') {
        if (req.user.usr_ctgry_id == 10) {
            req.params.agentID = req.user.usr_ctgry_ky
        }
    }
    oltmdl.getapsflBbnl_oltsMdl(req.params.agentID,req.params.apsflBbnl, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
    * Controller     : insertsbstndtlsCtrl
    * Parameters     : 
    * Description    : Update OLT Ltrack Details
    * Change History :
***************************************************************************************/
exports.insertsbstndtlsCtrl = (req, res) => {
    var fnm = "insertsbstndtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data)
    var req_body = req.body.data ? req.body.data : req.body;
    req_body = replaceQuotesFromStrng(req_body);
    oltmdl.insertsbstndtlsMdl(req_body, req.user)
        .then((results) => {
            oltmdl.insertsbstnAgntdtlsMdl(req_body, results.insertId, req.user)
                .then((result) => {
                    df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

var replaceQuotesFromStrng = (body) => {
    Object.keys(body).filter((k) => {
        if (body[k] && typeof body[k] == "string") {
            body[k] = `${body[k].replace(/["']/g, "")}`;
        }
        else if (body[k] == null) {
            body[k] = "";
        }
    })

    return body;
}

/**************************************************************************************
* Controller     : insertDirect_slotsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 22/11/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.insertDirect_slotsCtrl = (data, user, req, res, callback) => {
    var fnm = "insert_slotsCtrl";
	console.log("data",data)
    log.info(`In ${fnm}`, 0, cntxtDtls);
    port_id = data.prt_id;

    if (data.splitsdata != null) {
        var slots = data.splitsdata.split(',');

        //Add Slots to Port 
        s_ct = 0
        function slotInserProcess(port_id, slot) {
            console.log("Adding Slot & Splits: " + slot);
			dataMigrationMdl.getOltDtlsMdl(data.olt_id, user, function (err, olrdata) {
				dataMigrationMdl.addSlot(port_id, slot, user, function (err, slotInsertRes) {
					s_ct++;
					if (err) { console.log(err); return }
					var slot_id = slotInsertRes.insertId;
					//Add Splits
					dataMigrationMdl.addSplits(slot_id, slot, s_ct, user, olrdata[0], function (err, splitInsertRes) {
						if (err) { console.log(err); return }
						if (s_ct < slots.length) {
							slotInserProcess(port_id, slots[s_ct]);
						}
						else {
							console.log("Done");
							//event.record('PORT', data.prt_id, 'SPLIT_ADDED', "Adding Split To PORT", user);
							//event.record('OLT', data.olt_id, 'SPLIT_ADDED', "Adding Split To OLT", user);
							callback(err, splitInsertRes);
							return ;
						}
					})
				})
            })
        }
        slotInserProcess(port_id, slots[s_ct]);
    }
    // oltmdl.insert_slotsCtrlMdl(data.data)
    //     .then((results) => {
    //         df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    //     }).catch((error) => {
    //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //     });
}

/**************************************************************************************
* Controller     : prepaidgetRevenueSharingMonthFilterWiseCtrl
* Parameters     : 
* Description    : 
* Change History :
***************************************************************************************/
 exports.prepaidgetRevenueSharingMonthFilterWiseCtrl = (req, res) => {
    var fnm = "prepaidgetRevenueSharingMonthFilterWiseCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
	console.log("req for mso", req);
    oltmdl.prepaidgetRevenueSharingMonthFilterWiseMdl(req.params.yearId, req.params.agnt_id, req.params.mnth_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}