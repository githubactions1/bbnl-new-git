const addonsMdl = require(appRoot + '/server/api/modules/addons/models/addonsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var sms_srvc = require(appRoot + '/utils/sms.utils');
const { CostExplorer } = require('aws-sdk');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var jsonUtils = require(appRoot + '/utils/json.utils');
var _ = require('lodash');
var cafBO = require('../../../modules/caf/cafBO/cafBo')
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var operationsUtils = require(appRoot + '/utils/operations.utils');

var aaaApi = require(appRoot + '/server/extApi/aaa/aaa_api.js');
var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var addOnBo = require(appRoot + '/server/api/modules/addons/bo/addOnBo')
var request = require("request");


/**************************************************************************************
* Controller     : getCafVoipCstmrDtlsCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 09/11/2023    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getCafVoipCstmrDtlsCtrl = function (req, res) {
    var fnm = "getCafVoipCstmrDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getCafVoipCstmrDtlsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getAddOnVOIPPackages
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 09/11/2023    -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.getAddOnVOIPPackages = function (req, res) {
    var fnm = "getAddOnVOIPPackages";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getAddOnVOIPPackagesMdl(req.body.data, req.user)
        .then(function (results) {
            if (results && results.length > 0) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
        });
}

/**************************************************************************************
* Controller     : getCafCstmrDtls
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getCafCstmrDtls = function (req, res) {
    var fnm = "getCafCstmrDtls";
    log.info(`In ${fnm}`, 0, cntxtDtls); 

    addonsMdl.getCafCstmrDtlsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

exports.getHsiCafCstmrDtls = function (req, res) {
    var fnm = "getHsiCafCstmrDtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getHsiCafCstmrDtlsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : getWebCafCstmrDtls
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getWebCafCstmrDtls = function (req, res) {
    var fnm = "getWebCafCstmrDtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getWebCafCstmrDtls(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : getAddOnHSIPackages
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getAddOnHSIPackages = function (req, res) {
    var fnm = "getAddOnHSIPackages";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getAddOnHSIPackagesMdl(req.body.data, req.user)
        .then(function (results) {
            if (results && results.length > 0) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
        });
}


/**************************************************************************************
* Controller     : addCafPckgs
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
var subscribeChannel = (data) => {
    console.log("subscribeChannel _________________________________");
    console.log(data)
    const options = {
        url: 'http://mware.glits.info/apiv1/iptvbox/updtAprvl',
        // url: 'http://localhost:4901/apiv1/iptvbox/insrtAdonAprvl',
        body: data,
        json: true
    };
    request.post(options, function (error, response, body) {
        console.log(error)
        console.log(body);
    });
}

exports.addCafPckgs = function (req, res) {
    var fnm = "addIptvCafPckgs";
    log.info(`In ${fnm}`, 0, cntxtDtls);
	
	if(req.user.prpd_flag == 1){
		 var rmbalance = 0;
    console.log("add addons", req.body)
    addonsMdl.cafdatafrpln(req.body.data, req.user).then((cafadata) => {
        addonsMdl.checkpckgsfrcstmr(req.body.data, cafadata[0], req.user).then((hendhp) => {
            if (hendhp.length == 1 && hendhp[0].pack_nms == null) {
                addonsMdl.chkpckgsfrcafMdl(req.body.data, req.user).then((pckgscheckfradd) => {
                    console.log("pckgscheckfradd", pckgscheckfradd);
                    console.log("pckgscheckfradd.length, pack_nm", pckgscheckfradd.length, pckgscheckfradd[0].pack_nm)
                    if (pckgscheckfradd.length == 1 && pckgscheckfradd[0].pack_nm == null) {
                        if (req.body.data.pckg_lst.length > 0) {
                            for (i = 0; i < req.body.data.pckg_lst.length; i++) {
                                rmbalance += parseFloat(req.body.data.pckg_lst[i].ttl_cst)
                            }
                        } else {
                            rmbalance += parseFloat(req.body.data.pckg_lst.ttl_cst)
                        }
                        // console.log(JSON.stringify(req.body.data.extrnl_api_post_json))
                        let pckgCalls = cafBO.addPckgCalls(req.body.data.extrnl_api_post_json, req.user)
                        // console.log(JSON.stringify(pckgCalls));
                        console.log(req.body.data.pckg_lst);
                        addonsMdl.chklmoblnceFaccountingMdl(req.body.data.pckg_lst, req.user).then((results) => {
                            console.log("Result[0].balance", results[0].balance);
                            
                            console.log("rmbalance", rmbalance);
							console.log("Result[0]", results[0]);
                            var limit = 0;
                            if (results[0].caf_count <= 100) {
                                limit = results[0].caf_1_to_100
                            } else if (results[0].caf_count > 100 && results[0].caf_count <= 250) {
                                limit = results[0].caf_100_to_250
                            } else if (results[0].caf_count > 250 && results[0].caf_count <= 500) {
                                limit = results[0].caf_250_to_500
                            } else if (results[0].caf_count > 500 && results[0].caf_count <= 1000) {
                                limit = results[0].caf_500_to_1000
                            } else if (results[0].caf_count > 1000) {
                                limit = results[0].caf_above_1000
                            }
                            var newblnce = 0; 
                            if (results[0].balance >= limit + rmbalance) {
                                newblnce = results[0].balance - rmbalance;
                                newblnce = parseFloat(newblnce).toFixed(2);
                                addonsMdl.updateagntbalMdl(req.body.data.pckg_lst, rmbalance, newblnce, results[0], req.user).then((agndupdt) => {
                                    addonsMdl.webinsrtblnceFaccountingMdl(req.body.data.pckg_lst, rmbalance, newblnce, results[0], req.body.data, req.body.data, req.user).then((faccnt) => {
                                        extApiCtrl.callApi("ADD SERVICE PACK", 1, 13, req.body.data.caf_id, pckgCalls, req.user).then((api_rpsnse) => {
                                            console.log("---------------api response -------------------")
                                            console.log(api_rpsnse);
                                            if (api_rpsnse && api_rpsnse.res) {
                                                if (api_rpsnse.res.responseStatus['statusCode'] == "202") {
                                                    // console.log('reultsssssssssssssssssssssssssssssssssssss 0 \n');
                                                    // console.log(req.body.data);
                                                    /*addonsMdl.addCafPckgsMdl(req.body.data.pckg_lst, req.body.data.caf_id, req.user, (err, results) => {
														console.log("results,length,err",results,results.length,err)
                                                        if (err) {
                                                            df.formatErrorResresume(req, res, error, cntxtDtls, '', {});
                                                        }
                                                        else {
                                                             console.log('reultsssssssssssssssssssssssssssssssssssss 0 \n');
                                                            // console.log(results, 'results.length \n', results.length);
                                                            if (results && results.length) {
                                                                 console.log('reultsssssssssssssssssssssssssssssssssssss 1');
                                                                df.formatErrorResresume(req, res, results, cntxtDtls, fnm, { error_status: "600", err_message: "Already package added to this CAF." });
                                                            }
                                                            else {*/
                                                                console.log('reultsssssssssssssssssssssssssssssssssssss 2');
                                                                addonsMdl.newaddCafInsrtPckgsMdl(req.body.data, req.user)
                                                                    .then((results) => {
                                                                        //subscribeChannel(req.body.data.pckg_lst);
                                                                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                                                    }).catch((error) => {
																		console.log("error",error)
                                                                        df.formatErrorResresume(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                                    });
                                                            /*}
                                                        }
                                                    }).catch((error) => {
														console.log("error",error)
														df.formatErrorResresume(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "package check error" });
													});*/
                                                }
                                                else {
                                                    df.formatErrorResresume(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
                                                }
                                            }
                                            else {
                                                df.formatErrorResresume(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                            }
                                        }).catch((err) => {
                                            df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                        });
                                    })
                                })
                            } else {
                                let err = "Your Wallet is low. Please Recharge Your Wallet and Try Again. Minimum Wallet to be Maintained is Rs."+ limit + "/- ";
                                console.log("err", err);
                                df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "401", err_message: err });
                            }
                        })
                    } else {
                        let err = " Already Package Added " + pckgscheckfradd[0].pack_nm + " ";
                        console.log("err")
                        df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "401", err_message: err });
                    }
                })
            } else {
                let err = "This package already included in base pack for this caf.";
                console.log("err", err);
                df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "401", err_message: err });
            }
        })
    })
	} else {
    // console.log(JSON.stringify(req.body.data.extrnl_api_post_json))
    let pckgCalls = cafBO.addPckgCalls(req.body.data.extrnl_api_post_json, req.user)
    // console.log(JSON.stringify(pckgCalls));
    // console.log(req.body.data.pckg_lst);

    extApiCtrl.callApi("ADD SERVICE PACK", 1, 13, req.body.data.caf_id, pckgCalls, req.user).then((api_rpsnse) => {
        console.log("---------------api response -------------------")
        console.log(api_rpsnse);
        if (api_rpsnse && api_rpsnse.res) {
            if (api_rpsnse.res.responseStatus['statusCode'] == "202") {
                // console.log('reultsssssssssssssssssssssssssssssssssssss 0 \n');
                // console.log(req.body.data);
                addonsMdl.addCafPckgsMdl(req.body.data.pckg_lst, req.body.data.caf_id, req.user, (err, results) => {
                    if (err) {
                        df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                    }
                    else {
                        // console.log('reultsssssssssssssssssssssssssssssssssssss 0 \n');
                        // console.log(results, 'results.length \n', results.length);

                        if (results && results.length) {
                            // console.log('reultsssssssssssssssssssssssssssssssssssss 1');
                            df.formatErrorRes(req, res, results, cntxtDtls, fnm, { error_status: "600", err_message: "Already package added to this CAF." });
                        }
                        else {
                            // console.log('reultsssssssssssssssssssssssssssssssssssss 2');
                                addonsMdl.newaddCafInsrtPckgsMdl(req.body.data, req.user)
                                .then((results) => {
                                    //subscribeChannel(req.body.data.pckg_lst);
                                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                });
                        }
                    }
                });


            }
            else {
                df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
            }
        }
        else {
            df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
        }
    }).catch((err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
    });
}
}

exports.newversionaddCafPckgs = function (req, res) {
    var fnm = "newversionaddCafPckgs";
    log.info(`In ${fnm}`, 0, cntxtDtls);

	var rmbalance = 0;
    console.log("add addons", req.body)
    addonsMdl.cafdatafrpln(req.body.data, req.user).then((cafadata) => {
        addonsMdl.checkpckgsfrcstmr(req.body.data, cafadata[0], req.user).then((hendhp) => {
            if (hendhp.length == 1 && hendhp[0].pack_nms == null) {
                addonsMdl.chkpckgsfrcafMdl(req.body.data, req.user).then((pckgscheckfradd) => {
                    console.log("pckgscheckfradd", pckgscheckfradd);
                    console.log("pckgscheckfradd.length, pack_nm", pckgscheckfradd.length, pckgscheckfradd[0].pack_nm)
                    if (pckgscheckfradd.length == 1 && pckgscheckfradd[0].pack_nm == null) {
						var packids = []
                        //if (req.body.data.pckg_lst.length > 0) {
                            //for (i = 0; i < req.body.data.pckg_lst.length; i++) {
                               // rmbalance += parseFloat(req.body.data.pckg_lst[i].ttl_cst)
                            //}
                        //} else {
                            //rmbalance += parseFloat(req.body.data.pckg_lst.ttl_cst)
                        //}
                        // console.log(JSON.stringify(req.body.data.extrnl_api_post_json))
                        let pckgCalls = cafBO.addPckgCalls(req.body.data.extrnl_api_post_json, req.user)
						 req.body.data.pckg_lst.filter((k) => {
                            packids.push(k.pckge_id)
                            addonsMdl.pckgedatapriceMdl(k.pckge_id).then((pckgeprice) => {
                               
                                rmbalance += parseFloat(pckgeprice[0].ttl_cst).toFixed(2)-(parseFloat(pckgeprice[0].ttl_cst)*parseFloat(pckgeprice[0].lmo_share)/100).toFixed(2)-(parseFloat(pckgeprice[0].ttl_cst)*parseFloat(pckgeprice[0].mso_share)/100).toFixed(2)
                            })
                        })
                        // console.log(JSON.stringify(pckgCalls));
                        console.log(req.body.data.pckg_lst);
                        addonsMdl.chklmoblnceFaccountingMdl(req.body.data.pckg_lst, req.user).then((results) => {
                            console.log("Result[0].balance", results[0].balance);
                            
                            console.log("rmbalance", rmbalance);
							console.log("Result[0]", results[0]);
                            var limit = 0;
                            if (results[0].caf_count <= 100) {
                                limit = results[0].caf_1_to_100
                            } else if (results[0].caf_count > 100 && results[0].caf_count <= 250) {
                                limit = results[0].caf_100_to_250
                            } else if (results[0].caf_count > 250 && results[0].caf_count <= 500) {
                                limit = results[0].caf_250_to_500
                            } else if (results[0].caf_count > 500 && results[0].caf_count <= 1000) {
                                limit = results[0].caf_500_to_1000
                            } else if (results[0].caf_count > 1000) {
                                limit = results[0].caf_above_1000
                            }
                            var newblnce = 0;
                            if (results[0].balance >= limit + rmbalance) {
                                newblnce = results[0].balance - rmbalance;
                                newblnce = parseFloat(newblnce).toFixed(2);
								addonsMdl.pckgedatapriceMdl(packids).then((pckgeprice) => {
                                addonsMdl.updateagntbalMdl(req.body.data.pckg_lst, rmbalance, newblnce, results[0], req.user).then((agndupdt) => {
                                    addonsMdl.insrtblnceFaccountingMdl(req.body.data.pckg_lst, rmbalance, newblnce, results[0], pckgeprice, req.body.data, req.user).then((faccnt) => {
                                        extApiCtrl.callApi("ADD SERVICE PACK", 1, 13, req.body.data.caf_id, pckgCalls, req.user).then((api_rpsnse) => {
                                            console.log("---------------api response -------------------")
                                            console.log(api_rpsnse);
                                            if (api_rpsnse && api_rpsnse.res) {
                                                if (api_rpsnse.res.responseStatus['statusCode'] == "202") {
                                                    // console.log('reultsssssssssssssssssssssssssssssssssssss 0 \n');
                                                    // console.log(req.body.data);
                                                    /*addonsMdl.addCafPckgsMdl(req.body.data.pckg_lst, req.body.data.caf_id, req.user, (err, results) => {
														console.log("results,length,err",results,results.length,err)
                                                        if (err) {
                                                            df.formatErrorResresume(req, res, err, cntxtDtls, '', {});
                                                        }
                                                        else {
                                                            console.log('reultsssssssssssssssssssssssssssssssssssss 0 \n');
                                                             console.log(results, 'results.length \n', results.length);
                                                            if (results && results.length) {
                                                                 console.log('reultsssssssssssssssssssssssssssssssssssss 1');
                                                                df.formatErrorResresume(req, res, results, cntxtDtls, fnm, { error_status: "600", err_message: "Already package added to this CAF." });
                                                            }
                                                            else {*/
                                                                 console.log('reultsssssssssssssssssssssssssssssssssssss 2');
                                                                addonsMdl.newvodaddCafInsrtPckgsMdl(req.body.data, pckgeprice, req.user)
                                                                    .then((results) => {
																		console.log("results",results)
                                                                        //subscribeChannel(req.body.data.pckg_lst);
                                                                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                                                    }).catch((error) => {
																		console.log("error",error)
                                                                        df.formatErrorResresume(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                                    });
                                                            /*}
                                                        }
                                                    }).catch((error) => {
														console.log("error",error)
														df.formatErrorResresume(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "package check error" });
													});*/
                                                }
                                                else {
                                                    df.formatErrorResresume(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
                                                }
                                            }
                                            else {
                                                df.formatErrorResresume(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                            }
                                        }).catch((err) => {
                                            df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                        });
                                    })
                                })
								})
                            } else {
                                let err = "Your Wallet is low. Please Recharge Your Wallet and Try Again. Minimum Wallet to be Maintained is Rs."+ limit + "/- ";
                                console.log("err", err);
                                df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "401", err_message: err });
                            }
                        })
                    } else {
                        let err = " Already Package Added " + pckgscheckfradd[0].pack_nm + " ";
                        console.log("err")
                        df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "401", err_message: err });
                    }
                })
            } else {
                let err = "This package already included in base pack for this caf.";
                console.log("err", err);
                df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "401", err_message: err });
            }
        })
    })

}

/**************************************************************************************
* Controller     : addHSICafPckgs
* Parameters     : req,res()
* Description    :
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
// exports.addHSICafPckgs = function (req, res) {
//     var fnm = "addCafPckgs";
//     log.info(`In ${fnm}`, 0, cntxtDtls);
//     console.log('req.body.data');
//     console.log(req.body.data);
//     console.log(JSON.stringify(req.body.data.extrnl_api_post_json))

//     addonsMdl.addCafPckgsMdl(req.body.data, req.body.data.caf_id, req.user)
//         .then((results) => {
//             addonsMdl.addCafHsiMnthPckgsMdl(req.body.data, req.user)
//                 .then((cafhsires) => {
//                     addonsMdl.addHsiToThrldMdl(req.body.data, req.user)
//                     .then((cafFnlres) => {
//                         operationsUtils.record('addon_hsi_prchs_ct');
//                         df.formatSucessRes(req, res, cafFnlres, cntxtDtls, fnm, {});
//                     }).catch((error) => {
//                         df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
//                     });
//                     // df.formatSucessRes(req, res, cafhsires, cntxtDtls, fnm, {});
//                 }).catch((error) => {
//                     df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
//                 });
//             // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
//         }).catch((error) => {
//             df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
//         });

// }

var subscribeHsiAdon = (data) => {
    console.log("subscribeHsiAdon _________________________________");
    console.log(data)
    const options = {
        // url: 'http://mware.glits.info/apiv1/iptvbox/insrtHSIAdonAprvl',
        url: 'http://localhost:4901/apiv1/iptvbox/insrtHSIAdonAprvl',
        body: data,
        json: true
    };
    request.post(options, function (error, response, body) {
        console.log(error)
        console.log(body);
    });
}

exports.addHSICafPckgs = (req, res) => {
    var fnm = "addHSICafPckgs";
	console.log("req.body.data addHSICafPckgs",req.body.data)
    log.info(`In ${fnm}`, 0, cntxtDtls);
	addonsMdl.chkcafpckgemdl(req.body.data, req.user).then((result) => {
        if (result[0].crnt_pln_id == 3000106) {
            let err = "Home Premium Package has no FUP limit";
            console.log("err", err);
            df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "401", err_message: err });
        } else {
	if(req.user.prpd_flag == 1){
	addonsMdl.chklmoblnceFaccountingMdl(req.body.data.pckg_lst, req.user).then((results) => {
        console.log("Result[0].balance", results[0].balance);
        var rmbalance = 0 ;
        for(i=0; i <req.body.data.pckg_lst.length; i++){
            rmbalance += req.body.data.pckg_lst[i].ttl_cst;
        }
        console.log("rmbalance", rmbalance);
        if (results[0].caf_count <= 100) {
            limit = results[0].caf_1_to_100
        } else if (results[0].caf_count > 100 && results[0].caf_count <= 250) {
            limit = results[0].caf_100_to_250
        } else if (results[0].caf_count > 250 && results[0].caf_count <= 500) {
            limit = results[0].caf_250_to_500
        } else if (results[0].caf_count > 500 && results[0].caf_count <= 1000) {
            limit = results[0].caf_500_to_1000
        } else if (results[0].caf_count > 1000) {
            limit = results[0].caf_above_1000
        }
        var newblnce = 0;
        console.log("total limit ",limit+rmbalance)
        console.log("results[0].balance >= limit+rmbalance", results[0].balance >= limit+rmbalance)
        if (results[0].balance >= limit+rmbalance) {
            newblnce = results[0].balance - rmbalance;
            newblnce = parseFloat(newblnce).toFixed(2);
            addonsMdl.updateagntbalMdl(req.body.data.pckg_lst, rmbalance, newblnce, results[0], req.user).then((agndupdt) => {
                addonsMdl.hsiinsrtblnceFaccountingMdl(req.body.data.pckg_lst, rmbalance, newblnce, results[0], req.body.data, req.user).then((faccnt) => {
    addonsMdl.getCafDtaMdl(req.body.data.caf_id, req.user)
        .then((cafRes) => 
        {
            console.log('cafRes ------------------------------------ ');
            console.log(cafRes);
            let aaaData = {
                aaa_cd: cafRes[0].aaa_cd,
                accessId: cafRes[0].accessId,
                fup: cafRes[0].hsi_orgnl_prfle_tx,
                sd: cafRes[0].hsi_crnt_prfle_tx,
                sa: cafRes[0].hsi_orgnl_prfle_tx
            }
            addonsMdl.getCafPckageMdl(req.body.data.caf_id, req.user)
                .then((packRes) => {
                    console.log('package Repsonse _____________');
                    console.log(packRes);

                    addonsMdl.getCstmrMnthlyHsiPckgeDtlsMdl(req.body.data.caf_id, req.user)
                        .then((mnthHsipackRes) => {
                            var usage_varience = ((Number(mnthHsipackRes[0].ttl_upld_ct) + Number(mnthHsipackRes[0].ttl_dwnld_ct))/1024/1024/1024) - Number(mnthHsipackRes[0].mnth_usge_lmt_ct);
                            if (usage_varience > 0) {
                                var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + usage_varience + Number(req.body.data.pckg_lst[0].vle_tx);
                            } else {
                                var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + Number(req.body.data.pckg_lst[0].vle_tx);
                            }
                            let fnlHsiPckgeData = {
                                agntId: req.user.usr_ctgry_ky,
                                caf_id: cafRes[0].caf_id,
                                pckg_lst: req.body.data.pckg_lst,
                                caf_type_id: cafRes[0].caf_type_id,
                                aaa_cd: cafRes[0].aaa_cd,
                                crnt_pln_id: cafRes[0].pckge_id,
                                extrnl_api_post_json: req.body.data.extrnl_api_post_json,
                                crnt_cstmr_pckg: packRes[0].srvcpk_nm.split(',')[1],
                                add_on_hsi_pckg: req.body.data.pckg_lst[0].vle_tx,
                                prsnt_hsi_pckge: mnthHsipackRes[0].mnth_usge_lmt_ct,
                                aaa_prfl_nm: cafRes[0].hsi_orgnl_prfle_tx,
                                nw_hsi_pckge: new_mnth_usge_lmt_ct
                            };
                            console.log('fnlHsiPckgeData ___________________ ');
                            console.log(fnlHsiPckgeData);
                            console.log(JSON.stringify(fnlHsiPckgeData.extrnl_api_post_json));
                            let apiCalls = addOnBo.hsiAddOnCalls(aaaData)
                            apiMstrCtrl.insrt_Request("Add Ons", 1, 13, fnlHsiPckgeData.caf_id, req.user).then((reqId) => {
                                apiMstrCtrl.insrt_api_cls(reqId, apiCalls, req.user).then((insClRes) => {
                                    apiMstrCtrl.get_apiCls(reqId, req.user).then((extApiCalls) => {
                                        console.log(extApiCalls)
                                        aaaApi.updatePrflInAaa(reqId, extApiCalls[0].calls, req.user.user_id, aaaData, (err, data) => {
                                            if (!err) {
                                                addonsMdl.newaddHsiCafPckgsMdl(fnlHsiPckgeData, req.user)
                                                    .then((results) => {
                                                        //subscribeHsiAdon(req.body.data.pckg_lst);
                                                        addonsMdl.addCafHsiMnthPckgsMdl(fnlHsiPckgeData, req.user)
                                                            .then((cafhsires) => {
                                                                addonsMdl.updateBatchCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
                                                                    .then((batchCafRes) => {
                                                                        addonsMdl.updateOnlineCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
                                                                            .then((onlineCafRes) => {
                                                                                addonsMdl.addHsiToThrldMdl(fnlHsiPckgeData, req.user)
                                                                                    .then((cafFnlres) => {
                                                                                        operationsUtils.record('addon_hsi_prchs_ct');
																						var msgs = `Dear+Customer,+New+HSI+Addon+Package+${req.body.data.pckg_lst[0].pckge_nm}+is+added+to+your+account+succesfully`;
                                                                                        sms_srvc.callbacksendNotifySMS(cafRes[0].mbl_nu, msgs,  function (err, res) {
                                                                                            if (err) { console.log(err); }
                                                                                            else { console.log('sms sent'); }
                                                                                        },'1107161779020984336')
                                                                                        df.formatSucessRes(req, res, cafFnlres, cntxtDtls, fnm, {});
                                                                                    }).catch((error) => {
                                                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." })

                                                                                    });
                                                                                // df.formatSucessRes(req, res, cafhsires, cntxtDtls, fnm, {});
                                                                            }).catch((error) => {
                                                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                                            });
                                                                    }).catch((error) => {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                                    });
                                                            }).catch((error) => {
                                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                            });
                                                        // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                                    }).catch((error) => {
                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                    });
                                            } else {
                                                console.log(err);
                                            }
                                        })
                                    }).catch((error) => {
                                        console.log(error)
                                    });
                                }).catch((error) => {
                                    console.log(error)
                                });
                            }).catch((error) => {
                                console.log(error)
                            });
                        })
                })
        })
		})
		})
        }
    })
	} else {
		
	addonsMdl.getCafDtaMdl(req.body.data.caf_id, req.user)
	.then((cafRes) => {
    console.log('cafRes ------------------------------------ ');
    console.log(cafRes);
    let aaaData = {
        aaa_cd: cafRes[0].aaa_cd,
        accessId: cafRes[0].accessId,
        fup: cafRes[0].hsi_orgnl_prfle_tx,
        sd: cafRes[0].hsi_crnt_prfle_tx,
        sa: cafRes[0].hsi_orgnl_prfle_tx
    }
    addonsMdl.getCafPckageMdl(req.body.data.caf_id, req.user)
        .then((packRes) => {
            console.log('package Repsonse _____________');
            console.log(packRes);

            addonsMdl.getCstmrMnthlyHsiPckgeDtlsMdl(req.body.data.caf_id, req.user)
                .then((mnthHsipackRes) => {
                    var usage_varience = ((Number(mnthHsipackRes[0].ttl_upld_ct) + Number(mnthHsipackRes[0].ttl_dwnld_ct)) / 1024 / 1024 / 1024) - Number(mnthHsipackRes[0].mnth_usge_lmt_ct);
                    if (usage_varience > 0) {
                        var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + usage_varience + Number(req.body.data.pckg_lst[0].vle_tx);
                    } else {
                        var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + Number(req.body.data.pckg_lst[0].vle_tx);
                    }
                    let fnlHsiPckgeData = {
                        agntId: req.user.usr_ctgry_ky,
                        caf_id: cafRes[0].caf_id,
                        pckg_lst: req.body.data.pckg_lst,
                        caf_type_id: cafRes[0].caf_type_id,
                        aaa_cd: cafRes[0].aaa_cd,
                        crnt_pln_id: cafRes[0].pckge_id,
                        extrnl_api_post_json: req.body.data.extrnl_api_post_json,
                        crnt_cstmr_pckg: packRes[0].srvcpk_nm.split(',')[1],
                        add_on_hsi_pckg: req.body.data.pckg_lst[0].vle_tx,
                        prsnt_hsi_pckge: mnthHsipackRes[0].mnth_usge_lmt_ct,
                        aaa_prfl_nm: cafRes[0].hsi_orgnl_prfle_tx,
                        nw_hsi_pckge: new_mnth_usge_lmt_ct
                    };
                    console.log('fnlHsiPckgeData ___________________ ');
                    console.log(fnlHsiPckgeData);
                    console.log(JSON.stringify(fnlHsiPckgeData.extrnl_api_post_json));
                    let apiCalls = addOnBo.hsiAddOnCalls(aaaData)
                    apiMstrCtrl.insrt_Request("Add Ons", 1, 13, fnlHsiPckgeData.caf_id, req.user).then((reqId) => {
                        apiMstrCtrl.insrt_api_cls(reqId, apiCalls, req.user).then((insClRes) => {
                            apiMstrCtrl.get_apiCls(reqId, req.user).then((extApiCalls) => {
                                console.log(extApiCalls)
                                aaaApi.updatePrflInAaa(reqId, extApiCalls[0].calls, req.user.user_id, aaaData, (err, data) => {
                                    if (!err) {
                                        addonsMdl.addHsiCafPckgsMdl(fnlHsiPckgeData, req.user)
                                            .then((results) => {
                                                subscribeHsiAdon(req.body.data.pckg_lst);
                                                addonsMdl.addCafHsiMnthPckgsMdl(fnlHsiPckgeData, req.user)
                                                    .then((cafhsires) => {
                                                        addonsMdl.updateBatchCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
                                                            .then((batchCafRes) => {
                                                                addonsMdl.updateOnlineCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
                                                                    .then((onlineCafRes) => {
                                                                        addonsMdl.addHsiToThrldMdl(fnlHsiPckgeData, req.user)
                                                                            .then((cafFnlres) => {
                                                                                operationsUtils.record('addon_hsi_prchs_ct');
                                                                                sms_srvc.callbacksendNotifySMS(cafRes[0].mbl_nu, "Dear+Customer,+New+HSI+Addon+Package+${req.body.data.pckg_lst[0].pckge_nm}+is+added+to+your+account+succesfully", function (err, res) {
                                                                                    if (err) { console.log(err); }
                                                                                    else { console.log('sms sent'); }
                                                                                }, '1107161779020984336')
                                                                                df.formatSucessRes(req, res, cafFnlres, cntxtDtls, fnm, {});
                                                                            }).catch((error) => {
                                                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." })

                                                                            });
                                                                        // df.formatSucessRes(req, res, cafhsires, cntxtDtls, fnm, {});
                                                                    }).catch((error) => {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                                    });
                                                            }).catch((error) => {
                                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                            });
                                                    }).catch((error) => {
                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                    });
                                                // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                            }).catch((error) => {
                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                            });
                                    } else {
                                        console.log(err);
                                    }
                                })
                            }).catch((error) => {
                                console.log(error)
                            });
                        }).catch((error) => {
                            console.log(error)
                        });
                    }).catch((error) => {
                        console.log(error)
                    });
                })
        })
	})
	}
		}
	}).catch((error) => {
		console.log("addHSICafPckgs",error)
	});
}

exports.newversionaddHSICafPckgs = (req, res) => {
    var fnm = "newversionaddHSICafPckgs";
	console.log("req.body.data newversionaddHSICafPckgs",req.body.data)
    log.info(`In ${fnm}`, 0, cntxtDtls);
	addonsMdl.chkcafpckgemdl(req.body.data, req.user).then((result) => {
        if (result[0].crnt_pln_id == 3000106) {
            let err = "Home Premium Package has no FUP limit";
            console.log("err", err);
            df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "401", err_message: err });
        } else {
	if(req.user.prpd_flag == 1){
	addonsMdl.chklmoblnceFaccountingMdl(req.body.data.pckg_lst, req.user).then((results) => {
        console.log("Result[0].balance", results[0].balance);
        var rmbalance = 0 ;
        for(i=0; i <req.body.data.pckg_lst.length; i++){
            rmbalance += req.body.data.pckg_lst[i].ttl_cst;
        }
        console.log("rmbalance", rmbalance);
        if (results[0].caf_count <= 100) {
            limit = results[0].caf_1_to_100
        } else if (results[0].caf_count > 100 && results[0].caf_count <= 250) {
            limit = results[0].caf_100_to_250
        } else if (results[0].caf_count > 250 && results[0].caf_count <= 500) {
            limit = results[0].caf_250_to_500
        } else if (results[0].caf_count > 500 && results[0].caf_count <= 1000) {
            limit = results[0].caf_500_to_1000
        } else if (results[0].caf_count > 1000) {
            limit = results[0].caf_above_1000
        }
        var newblnce = 0;
        console.log("total limit ",limit+rmbalance)
        console.log("results[0].balance >= limit+rmbalance", results[0].balance >= limit+rmbalance)
        if (results[0].balance >= limit+rmbalance) {
            newblnce = results[0].balance - rmbalance;
            newblnce = parseFloat(newblnce).toFixed(2);
            addonsMdl.updateagntbalMdl(req.body.data.pckg_lst, rmbalance, newblnce, results[0], req.user).then((agndupdt) => {
                addonsMdl.hsiinsrtblnceFaccountingMdl(req.body.data.pckg_lst, rmbalance, newblnce, results[0], req.body.data, req.user).then((faccnt) => {
    addonsMdl.getCafDtaMdl(req.body.data.caf_id, req.user)
        .then((cafRes) => 
        {
            console.log('cafRes ------------------------------------ ');
            console.log(cafRes);
            let aaaData = {
                aaa_cd: cafRes[0].aaa_cd,
                accessId: cafRes[0].accessId,
                fup: cafRes[0].hsi_orgnl_prfle_tx,
                sd: cafRes[0].hsi_crnt_prfle_tx,
                sa: cafRes[0].hsi_orgnl_prfle_tx
            }
            addonsMdl.getCafPckageMdl(req.body.data.caf_id, req.user)
                .then((packRes) => {
                    console.log('package Repsonse _____________');
                    console.log(packRes);

                    addonsMdl.getCstmrMnthlyHsiPckgeDtlsMdl(req.body.data.caf_id, req.user)
                        .then((mnthHsipackRes) => {
                            var usage_varience = ((Number(mnthHsipackRes[0].ttl_upld_ct) + Number(mnthHsipackRes[0].ttl_dwnld_ct))/1024/1024/1024) - Number(mnthHsipackRes[0].mnth_usge_lmt_ct);
                            if (usage_varience > 0) {
                                var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + usage_varience + Number(req.body.data.pckg_lst[0].vle_tx);
                            } else {
                                var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + Number(req.body.data.pckg_lst[0].vle_tx);
                            }
                            let fnlHsiPckgeData = {
                                agntId: req.user.usr_ctgry_ky,
                                caf_id: cafRes[0].caf_id,
                                pckg_lst: req.body.data.pckg_lst,
                                caf_type_id: cafRes[0].caf_type_id,
                                aaa_cd: cafRes[0].aaa_cd,
                                crnt_pln_id: cafRes[0].pckge_id,
                                extrnl_api_post_json: req.body.data.extrnl_api_post_json,
                                crnt_cstmr_pckg: packRes[0].srvcpk_nm.split(',')[1],
                                add_on_hsi_pckg: req.body.data.pckg_lst[0].vle_tx,
                                prsnt_hsi_pckge: mnthHsipackRes[0].mnth_usge_lmt_ct,
                                aaa_prfl_nm: cafRes[0].hsi_orgnl_prfle_tx,
                                nw_hsi_pckge: new_mnth_usge_lmt_ct
                            };
                            console.log('fnlHsiPckgeData ___________________ ');
                            console.log(fnlHsiPckgeData);
                            console.log(JSON.stringify(fnlHsiPckgeData.extrnl_api_post_json));
                            let apiCalls = addOnBo.hsiAddOnCalls(aaaData)
                            apiMstrCtrl.insrt_Request("Add Ons", 1, 13, fnlHsiPckgeData.caf_id, req.user).then((reqId) => {
                                apiMstrCtrl.insrt_api_cls(reqId, apiCalls, req.user).then((insClRes) => {
                                    apiMstrCtrl.get_apiCls(reqId, req.user).then((extApiCalls) => {
                                        console.log(extApiCalls)
                                        aaaApi.updatePrflInAaa(reqId, extApiCalls[0].calls, req.user.user_id, aaaData, (err, data) => {
                                            if (!err) {
                                                addonsMdl.newaddHsiCafPckgsMdl(fnlHsiPckgeData, req.user)
                                                    .then((results) => {
                                                        //subscribeHsiAdon(req.body.data.pckg_lst);
                                                        addonsMdl.addCafHsiMnthPckgsMdl(fnlHsiPckgeData, req.user)
                                                            .then((cafhsires) => {
                                                                addonsMdl.updateBatchCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
                                                                    .then((batchCafRes) => {
                                                                        addonsMdl.updateOnlineCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
                                                                            .then((onlineCafRes) => {
                                                                                addonsMdl.addHsiToThrldMdl(fnlHsiPckgeData, req.user)
                                                                                    .then((cafFnlres) => {
                                                                                        operationsUtils.record('addon_hsi_prchs_ct');
																						var msgs = `Dear+Customer,+New+HSI+Addon+Package+${req.body.data.pckg_lst[0].pckge_nm}+is+added+to+your+account+succesfully`;
                                                                                        sms_srvc.callbacksendNotifySMS(cafRes[0].mbl_nu, msgs,  function (err, res) {
                                                                                            if (err) { console.log(err); }
                                                                                            else { console.log('sms sent'); }
                                                                                        },'1107161779020984336')
                                                                                        df.formatSucessRes(req, res, cafFnlres, cntxtDtls, fnm, {});
                                                                                    }).catch((error) => {
                                                                                        df.formatErrorResresume(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." })

                                                                                    });
                                                                                // df.formatSucessRes(req, res, cafhsires, cntxtDtls, fnm, {});
                                                                            }).catch((error) => {
                                                                                df.formatErrorResresume(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                                            });
                                                                    }).catch((error) => {
                                                                        df.formatErrorResresume(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                                    });
                                                            }).catch((error) => {
                                                                df.formatErrorResresume(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                            });
                                                        // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                                    }).catch((error) => {
                                                        df.formatErrorResresume(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                    });
                                            } else {
                                                console.log(err);
                                            }
                                        })
                                    }).catch((error) => {
                                        console.log(error)
                                    });
                                }).catch((error) => {
                                    console.log(error)
                                });
                            }).catch((error) => {
                                console.log(error)
                            });
                        })
                })
        })
		})
		})
        }
    })
	} else {
		addonsMdl.getCafDtaMdl(req.body.data.caf_id, req.user)
	.then((cafRes) => {
    console.log('cafRes ------------------------------------ ');
    console.log(cafRes);
    let aaaData = {
        aaa_cd: cafRes[0].aaa_cd,
        accessId: cafRes[0].accessId,
        fup: cafRes[0].hsi_orgnl_prfle_tx,
        sd: cafRes[0].hsi_crnt_prfle_tx,
        sa: cafRes[0].hsi_orgnl_prfle_tx
    }
    addonsMdl.getCafPckageMdl(req.body.data.caf_id, req.user)
        .then((packRes) => {
            console.log('package Repsonse _____________');
            console.log(packRes);

            addonsMdl.getCstmrMnthlyHsiPckgeDtlsMdl(req.body.data.caf_id, req.user)
                .then((mnthHsipackRes) => {
                    var usage_varience = ((Number(mnthHsipackRes[0].ttl_upld_ct) + Number(mnthHsipackRes[0].ttl_dwnld_ct)) / 1024 / 1024 / 1024) - Number(mnthHsipackRes[0].mnth_usge_lmt_ct);
                    if (usage_varience > 0) {
                        var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + usage_varience + Number(req.body.data.pckg_lst[0].vle_tx);
                    } else {
                        var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + Number(req.body.data.pckg_lst[0].vle_tx);
                    }
                    let fnlHsiPckgeData = {
                        agntId: req.user.usr_ctgry_ky,
                        caf_id: cafRes[0].caf_id,
                        pckg_lst: req.body.data.pckg_lst,
                        caf_type_id: cafRes[0].caf_type_id,
                        aaa_cd: cafRes[0].aaa_cd,
                        crnt_pln_id: cafRes[0].pckge_id,
                        extrnl_api_post_json: req.body.data.extrnl_api_post_json,
                        crnt_cstmr_pckg: packRes[0].srvcpk_nm.split(',')[1],
                        add_on_hsi_pckg: req.body.data.pckg_lst[0].vle_tx,
                        prsnt_hsi_pckge: mnthHsipackRes[0].mnth_usge_lmt_ct,
                        aaa_prfl_nm: cafRes[0].hsi_orgnl_prfle_tx,
                        nw_hsi_pckge: new_mnth_usge_lmt_ct
                    };
                    console.log('fnlHsiPckgeData ___________________ ');
                    console.log(fnlHsiPckgeData);
                    console.log(JSON.stringify(fnlHsiPckgeData.extrnl_api_post_json));
                    let apiCalls = addOnBo.hsiAddOnCalls(aaaData)
                    apiMstrCtrl.insrt_Request("Add Ons", 1, 13, fnlHsiPckgeData.caf_id, req.user).then((reqId) => {
                        apiMstrCtrl.insrt_api_cls(reqId, apiCalls, req.user).then((insClRes) => {
                            apiMstrCtrl.get_apiCls(reqId, req.user).then((extApiCalls) => {
                                console.log(extApiCalls)
                                aaaApi.updatePrflInAaa(reqId, extApiCalls[0].calls, req.user.user_id, aaaData, (err, data) => {
                                    if (!err) {
                                        addonsMdl.addHsiCafPckgsMdl(fnlHsiPckgeData, req.user)
                                            .then((results) => {
                                                //subscribeHsiAdon(req.body.data.pckg_lst);
                                                addonsMdl.addCafHsiMnthPckgsMdl(fnlHsiPckgeData, req.user)
                                                    .then((cafhsires) => {
                                                        addonsMdl.updateBatchCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
                                                            .then((batchCafRes) => {
                                                                addonsMdl.updateOnlineCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
                                                                    .then((onlineCafRes) => {
                                                                        addonsMdl.addHsiToThrldMdl(fnlHsiPckgeData, req.user)
                                                                            .then((cafFnlres) => {
                                                                                operationsUtils.record('addon_hsi_prchs_ct');
                                                                                sms_srvc.callbacksendNotifySMS(cafRes[0].mbl_nu, "Dear+Customer,+New+HSI+Addon+Package+${req.body.data.pckg_lst[0].pckge_nm}+is+added+to+your+account+succesfully", function (err, res) {
                                                                                    if (err) { console.log(err); }
                                                                                    else { console.log('sms sent'); }
                                                                                }, '1107161779020984336')
                                                                                df.formatSucessRes(req, res, cafFnlres, cntxtDtls, fnm, {});
                                                                            }).catch((error) => {
                                                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." })

                                                                            });
                                                                        // df.formatSucessRes(req, res, cafhsires, cntxtDtls, fnm, {});
                                                                    }).catch((error) => {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                                    });
                                                            }).catch((error) => {
                                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                            });
                                                    }).catch((error) => {
                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                                    });
                                                // df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                            }).catch((error) => {
                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
                                            });
                                    } else {
                                        console.log(err);
                                    }
                                })
                            }).catch((error) => {
                                console.log(error)
                            });
                        }).catch((error) => {
                            console.log(error)
                        });
                    }).catch((error) => {
                        console.log(error)
                    });
                })
        })
	})
	}
		}
	}).catch((error) => {
		console.log("newversionaddHSICafPckgs",error)
	})
}

/**************************************************************************************
* Controller     : removeAddons
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/

var unsubscribeChannel = (data) => {
    console.log("unsubscribeChannel _________________________________");
    console.log(data)
    const options = {
        url: 'http://mware.glits.info/apiv1/iptvbox/unsbcribe_channel',
        // url: 'http://localhost:4901/apiv1/iptvbox/unsbcribe_channel',
        body: data,
        json: true
    };
    request.post(options, function (error, response, body) {
        console.log(error)
        console.log(body);
    });
}


exports.removeAddons = function (req, res) {
    var fnm = "removeAddons";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(JSON.stringify(req.body.data.extrnl_api_post_json))
	//if(req.user.usr_ctgry_ky == 103000730){
	addonsMdl.checkpckforremovesbscr(req.body.data, req.user).then((packRes) => {
		console.log("packRes.length",packRes.length)
		console.log("packRes[0].pckge_nm",packRes[0].pckge_nm)
		console.log("packRes.pckge_nm",packRes)
		//console.log("conditions",if(packRes.length == 0 || packRes.length == null || packRes.length == "null"))
		if (packRes.length == 0 || packRes[0].pckge_nm == null || packRes.length == "null") {
			let pckgCalls = cafBO.removePckgCalls(req.body.data.extrnl_api_post_json, req.user)
			console.log(JSON.stringify(pckgCalls))
			extApiCtrl.callApi("REMOVE SERVICE PACK", 1, 13, req.body.data.caf_id, pckgCalls, req.user).then((api_rpsnse) => {
				console.log(api_rpsnse);
				if (api_rpsnse && api_rpsnse.res) {
					if (api_rpsnse.res.responseStatus['statusCode'] == "202" || api_rpsnse.res.responseStatus['statusCode'] == "914") {
						addonsMdl.removeAddonsMdl(req.body.data, req.user)
							.then((results) => {
								console.log(results);
								//unsubscribeChannel(req.body.data.pckg_lst);
								df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
							}).catch((error) => {
								df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
							});
					}
					else {
						df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "702", err_message: "Sorry, failed to remove Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
					}
				}
				else {
					df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "703", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
				}
			}).catch((err) => {
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "704", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
			});
		} else {
            let err = ""+ packRes[0].pckge_nm + " This Package Added From Subscriber App, Unselect This Package and Try Again";
            df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "704", err_message: err });
        }
	})
	/*} else {
			let pckgCalls = cafBO.removePckgCalls(req.body.data.extrnl_api_post_json, req.user)
			console.log(JSON.stringify(pckgCalls))
			extApiCtrl.callApi("REMOVE SERVICE PACK", 1, 13, req.body.data.caf_id, pckgCalls, req.user).then((api_rpsnse) => {
				console.log(api_rpsnse);
				if (api_rpsnse && api_rpsnse.res) {
					if (api_rpsnse.res.responseStatus['statusCode'] == "202" || api_rpsnse.res.responseStatus['statusCode'] == "914") {
						addonsMdl.removeAddonsMdl(req.body.data, req.user)
							.then((results) => {
								console.log(results);
								//unsubscribeChannel(req.body.data.pckg_lst);
								df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
							}).catch((error) => {
								df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
							});
					}
					else {
						df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "702", err_message: "Sorry, failed to remove Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
					}
				}
				else {
					df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "703", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
				}
			}).catch((err) => {
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "704", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
			});
	}*/
}


/**************************************************************************************
* Controller     : getAddOnPackages
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getAddOnPackages = function (req, res) {

    var get_chnls_cnt = (value) => {
        if (req.body.data && req.body.data.srch_txt) {
            return '....';
        }
        else {
            return value;
        }
    }
    var get_chnls_lst = (value) => {
        let chnl_lst = []
        value.filter((k) => {
            chnl_lst.push({
                chnle_id: k.chnle_id,
                chnle_nm: k.chnle_nm
            })
        })
        return chnl_lst;
    }



    addonsMdl.getAddOnPackagesMdl(req.body.data,req.user)
        .then(function (results) {
            if (results && results.length > 0) {
                let fltr_data = []
                _.forIn(_.groupBy(results, 'pckge_id'), (value, key) => {
                    fltr_data.push({
                        s_no: value[0].s_no,
                        pckge_id: value[0].pckge_id,
                        pckge_nm: value[0].pckge_nm,
                        pkcge_idnty: value[0].pkcge_idnty,
                        chrge_at: value[0].chrge_at,
                        gst_at: value[0].gst_at,
                        ttl_cst: value[0].ttl_cst,
                        srvcpk_id: value[0].srvcpk_id,
                        srvcpk_nm: value[0].srvcpk_nm,
                        efcte_dt: value[0].efcte_dt,
                        expry_dt: value[0].expry_dt,
                        lnge_nm: value[0].lnge_nm,
                        extrnl_api_expry_dt: value[0].extrnl_api_expry_dt,
                        chnls_cnt: value[0].chnls_cnt,
                        chnls_lst: [],
						vod_pack : value[0].vod_pack
                    })
                })
                df.formatSucessRes(req, res, fltr_data, cntxtDtls, '', {});
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
        });
}



/**************************************************************************************
* Controller     : getAddOnLocalChnlPackages
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getAddOnLocalChnlPackages = function (req, res) {

    var get_chnls_cnt = (value) => {
        if (req.body.data && req.body.data.srch_txt) {
            return '....';
        }
        else {
            return value;
        }
    }
    var get_chnls_lst = (value) => {
        let chnl_lst = []
        value.filter((k) => {
            chnl_lst.push({
                chnle_id: k.chnle_id,
                chnle_nm: k.chnle_nm
            })
        })
        return chnl_lst;
    }



    addonsMdl.getAddOnLocalChnlPackagesMdl(req.body.data,req.user)
        .then(function (results) {
            if (results && results.length > 0) {
                let fltr_data = []
                _.forIn(_.groupBy(results, 'pckge_id'), (value, key) => {
                    fltr_data.push({
                        s_no: value[0].s_no,
                        pckge_id: value[0].pckge_id,
                        pckge_nm: value[0].pckge_nm,
                        pkcge_idnty: value[0].pkcge_idnty,
                        chrge_at: value[0].chrge_at,
                        gst_at: value[0].gst_at,
                        ttl_cst: value[0].ttl_cst,
                        srvcpk_id: value[0].srvcpk_id,
                        srvcpk_nm: value[0].srvcpk_nm,
                        efcte_dt: value[0].efcte_dt,
                        expry_dt: value[0].expry_dt,
                        extrnl_api_expry_dt: value[0].extrnl_api_expry_dt,
                        chnls_cnt: get_chnls_cnt(value[0].chnls_cnt),
                        chnls_lst: []
                    })
                })
                df.formatSucessRes(req, res, fltr_data, cntxtDtls, '', {});
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
        });
}



/**************************************************************************************
* Controller     : getWebAddOnLocalChnlPackages
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getWebAddOnLocalChnlPackages = function (req, res) {

    var get_chnls_cnt = (value) => {
        if (req.body.data && req.body.data.srch_txt) {
            return '....';
        }
        else {
            return value;
        }
    }
    var get_chnls_lst = (value) => {
        let chnl_lst = []
        value.filter((k) => {
            chnl_lst.push({
                chnle_id: k.chnle_id,
                chnle_nm: k.chnle_nm
            })
        })
        return chnl_lst;
    }



    addonsMdl.getWebAddOnLocalChnlPackagesMdl(req.body.data)
        .then(function (results) {
            if (results && results.length > 0) {
                let fltr_data = []
                _.forIn(_.groupBy(results, 'pckge_id'), (value, key) => {
                    fltr_data.push({
                        s_no: value[0].s_no,
                        pckge_id: value[0].pckge_id,
                        pckge_nm: value[0].pckge_nm,
                        pkcge_idnty: value[0].pkcge_idnty,
                        chrge_at: value[0].chrge_at,
                        gst_at: value[0].gst_at,
                        ttl_cst: value[0].ttl_cst,
                        srvcpk_id: value[0].srvcpk_id,
                        srvcpk_nm: value[0].srvcpk_nm,
                        efcte_dt: value[0].efcte_dt,
                        expry_dt: value[0].expry_dt,
                        extrnl_api_expry_dt: value[0].extrnl_api_expry_dt,
                        chnls_cnt: get_chnls_cnt(value[0].chnls_cnt),
                        chnls_lst: []
                    })
                })
                df.formatSucessRes(req, res, fltr_data, cntxtDtls, '', {});
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
        });
}



/**************************************************************************************
* Controller     : getAddonsFromCAF
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getAddonsFromCAF = function (req, res) {
    var fnm = "getAddonsFromCAF";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var get_chnls_cnt = (value) => {
        return value.length;
    }
    var get_chnls_lst = (value) => {
        let chnl_lst = []
        value.filter((k) => {
            chnl_lst.push({
                chnle_id: k.chnle_id,
                chnle_nm: k.chnle_nm
            })
        })
        return chnl_lst;
    }

    addonsMdl.getAddonsFromCAFMdl(req.params.caf_id, req.user)
        .then((results) => {
            if (results && results.length > 0) {
                let fltr_data = []
                _.forIn(_.groupBy(results, 'pckge_id'), (value, key) => {
                    fltr_data.push({
                        s_no: value[0].s_no,
                        pkge_prche_id: value[0].pkge_prche_id,
                        pckge_id: value[0].pckge_id,
                        pckge_nm: value[0].pckge_nm,
                        pkcge_idnty: value[0].pkcge_idnty,
                        pckge_type_id: value[0].pckge_type_id,
                        chrge_at: value[0].chrge_at,
                        gst_at: value[0].gst_at,
                        ttl_cst: value[0].ttl_cst,
                        srvcpk_id: value[0].srvcpk_id,
                        srvcpk_nm: value[0].srvcpk_nm,
                        efcte_dt: value[0].efcte_dt,
                        expry_dt: value[0].expry_dt,
                        extrnl_api_expry_dt: value[0].extrnl_api_expry_dt,
                        chnls_cnt: get_chnls_cnt(value),
                        chnls_lst: get_chnls_lst(value)
                    })
                })
                fltr_data = _.orderBy(fltr_data, 'pckge_type_id', 'desc');
                df.formatSucessRes(req, res, fltr_data, cntxtDtls, '', {});
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
            }
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to get Addons." });
        });
}


/**************************************************************************************
* Controller     : getChannels
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getChannels = function (req, res) {
    var fnm = "getChannels";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getChannelsMdl(req.params.srvc_pck_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : getCAFSelectdPackage
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getCAFSelectdPackage = function (req, res) {
    var fnm = "getCAFSelectdPackage";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getCAFSelectdPackageMdl(req.params.caf_id, req.user)
        .then((results) => {

            var common_feilds = ['agnt_id', 'agnt_nm', 'efcte_dt', 'pckge_id', 'expry_dt', 'pckge_nm', 'pck_in_sts'];
            var arrFeilds = ['srvcpk_id', 'srvcpk_nm', 'chrge_at', 'gst_at', 'cre_srvce_id'];
            var arrName = 'srvcs';
            var groupBy = 'pckge_id';
            var sortKey = 'pckge_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

            for (var i = 0; i < groupres.length; i++) {
                var totchrg_at = 0;
                var totgst_at = 0;
                var tot_at = 0;
                for (j = 0; j < groupres[i].srvcs.length; j++) {
                    totchrg_at = totchrg_at + groupres[i].srvcs[j].chrge_at;
                    totgst_at = totgst_at + groupres[i].srvcs[j].gst_at;
                    tot_at = totchrg_at + totgst_at
                    groupres[i]["chrg_at"] = totchrg_at.toFixed(2);
                    groupres[i]["gst_at"] = totgst_at.toFixed(2);
                    groupres[i]["total"] = tot_at.toFixed(2);
                }
            }
            console.log(groupres)
            df.formatSucessRes(req, res, groupres, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}





/**************************************************************************************
* Controller     : updtCrntPlanToNewPackgePlan
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.updtCrntPlanToNewPackgePlan = function (req, res) {
    var fnm = "updtCrntPlanToNewPackgePlan";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    addonsMdl.updtPckgeInCafMdl(req.body.data, req.user)
        .then((caf_updt_results) => {
            addonsMdl.updtCafPrchaseMdl(req.body.data, req.user)
                .then((prchse_updt_results) => {
                    addonsMdl.insrtCafPrchaseMdl(req.body.data, req.user)
                        .then((prchse_insrt_rslts) => {
                            df.formatSucessRes(req, res, prchse_insrt_rslts, cntxtDtls, fnm, {});
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "500", err_message: "Sorry, failed to insert new package." });
                        });
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "501", err_message: "Sorry, failed to update new package." });
                });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "501", err_message: "Sorry, failed to update new package." });
        });
}







/**************************************************************************************
* Controller     : validatePackagePlan
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/

validateVOIPSrvc = (crnt_pln_pkg_dtls, new_pln_core_srvc) => {

    // crnt_pln_pkg_dtls.
}

vldtPackgeSlctn = (new_pckge_id, old_pckge_id, new_pln_pkg_dtls, crnt_pln_pkg_dtls, clbk) => {
    let new_pln_cresrv_cnt = 0;

    let pkg_pln_dtls = {
        old_pkg_dtls: {
            old_pckge_id: old_pckge_id,
            IPTV: false,
            HSI: false,
            VOIP: false
        },
        new_pkg_dtls: {
            old_pckge_id: new_pckge_id,
            IPTV: false,
            HSI: false,
            VOIP: false
        }
    }
    if (new_pckge_id == old_pckge_id) {
        clbk(true, 'This package already assigned to subscriber CAF. Please select another one.')
    }
    else {
        crnt_pln_pkg_dtls.filter((k) => {
            k.srvcs.filter((crnt_pkg_crsr) => {
                if (crnt_pkg_crsr['cre_srvce_id'] == 1) {
                    pkg_pln_dtls['old_pkg_dtls']['HSI'] = true
                }
                if (crnt_pkg_crsr['cre_srvce_id'] == 2) {
                    pkg_pln_dtls['old_pkg_dtls']['IPTV'] = true
                }
                if (crnt_pkg_crsr['cre_srvce_id'] == 3) {
                    pkg_pln_dtls['old_pkg_dtls']['VOIP'] = true
                }
            })
        });


        new_pln_pkg_dtls.filter((k) => {
            k.srvcs.filter((crnt_pkg_crsr) => {
                if (crnt_pkg_crsr['cre_srvce_id'] == 1) {
                    pkg_pln_dtls['new_pkg_dtls']['HSI'] = true
                }
                if (crnt_pkg_crsr['cre_srvce_id'] == 2) {
                    pkg_pln_dtls['new_pkg_dtls']['IPTV'] = true
                }
                if (crnt_pkg_crsr['cre_srvce_id'] == 3) {
                    pkg_pln_dtls['new_pkg_dtls']['VOIP'] = true
                }
            })
        });


    }
}

exports.validatePackagePlan = function (req, res) {
    var fnm = "validatePackagePlan";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    vldtPackgeSlctn(req.body.data.new_pckge_id, req.body.data.old_pckge_id, req.body.data.new_pln_pkg_dtls, req.body.data.crnt_pln_pkg_dtls, (vldt_err, vldt_res) => {
        if (vldt_err) {
            df.formatErrorRes(req, res, vldt_res, cntxtDtls, fnm, { error_status: "500", err_message: vldt_res });
        }
        else {
            df.formatSucessRes(req, res, vldt_res, cntxtDtls, fnm, {});
        }
    })
}


/**************************************************************************************
* Controller     : getCstmrMnthlyHsiPckgeDtlsCtrl
* Parameters     : req,res()
* Description    : Get customer hsi month details
* Change History :
* 04/07/2020    -   - Initial Function
*
***************************************************************************************/

exports.getCstmrMnthlyHsiPckgeDtlsCtrl = function (req, res) {
    var fnm = "addCafPckgs";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getCstmrMnthlyHsiPckgeDtlsMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
        });

}

/**************************************************************************************
* Controller     : getAgntAddOnHSIPackagesCtrl
* Parameters     : req,res()
* Description    : Get Agent HSI addons
* Change History :
* 15/07/2020    -  Srujana M - Initial Function
*
***************************************************************************************/
exports.getAgntAddOnHSIPackagesCtrl = function (req, res) {
    var fnm = "getAgntAddOnHSIPackagesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getAgntAddOnHSIPackagesMdl(req.body.data, req.user)
        .then(function (results) {
            if (results && results.length > 0) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
        });
}
