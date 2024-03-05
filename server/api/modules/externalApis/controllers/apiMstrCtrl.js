const apiMstrMdl = require(appRoot + '/server/api/modules/externalApis/models/apiMstrMdl');
var jsonUtils = require(appRoot + '/utils/json.utils');
const request = require('request');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : initRequest
* Parameters     : enty_id,enty_ky,actn_id
* Description    : Insert External Api Requests
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.insrt_Request = function (rqst_dscn_tx, enty_id, actn_id, enty_ky, user) {
    console.log("Called")
    return new Promise((resolve, reject) => {
        apiMstrMdl.insrtReqMdl(rqst_dscn_tx, enty_id, actn_id, enty_ky, user).then((res) => {
            console.log(res.insertId)
            resolve(res.insertId);
        }).catch((err) => {
            console.log(err)
        })
    })

}


/**************************************************************************************
* Controller     : initRequestnew
* Parameters     : enty_id,enty_ky,actn_id
* Description    : Insert External Api Requests
* Change History :
* 24/12/2021    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.insrt_Requestnew = function (rqst_dscn_tx, enty_id, actn_id, enty_ky, user) {
    console.log("Called")
    return new Promise((resolve, reject) => {
        apiMstrMdl.insrtReqnewMdl(rqst_dscn_tx, enty_id, actn_id, enty_ky, user).then((res) => {
            console.log(res.insertId)
            resolve(res.insertId);
        }).catch((err) => {
            console.log(err)
        })
    })

}

/**************************************************************************************
* Controller     : initinsrt_api_clsRequest
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.insrt_api_cls = function (reqId, data, user) {
    return new Promise((resolve, reject) => {
        apiMstrMdl.insrtClMdl(reqId, data, user).then((results) => {
            resolve(results)
        }).catch((err) => {
            reject(err)
        })
    })

}

/**************************************************************************************
* Controller     : initinsrt_api_clsRequest
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 24/12/2021    -  ramesh  - Initial Function
*
***************************************************************************************/
exports.insrt_api_cls_new = function (reqId, data, user) {
    return new Promise((resolve, reject) => {
        apiMstrMdl.insrtClnewMdl(reqId, data, user).then((results) => {
            resolve(results)
        }).catch((err) => {
            reject(err)
        })
    })

}

/**************************************************************************************
* Controller     : get_apiCls
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.get_apiCls = function (reqId, user) {
    return new Promise((resolve, reject) => {
        apiMstrMdl.getApiClsMdl(reqId, user)
            .then(function (results) {
                var groupRes = jsonUtils.groupJsonByKey(results, ['cre_srvce_id'], ['rest_cl_id', 'mthd_id', 'mthd_nm', 'api_rqst_id', 'api_rqst_cl_type_id', 'url_tx', 'url_dta_tx', 'rspne_tx', 'hdr_tx', 'api_sts_id', 'rtry_ct', 'lst_rtry_ts', 'cre_srvce_id', 'dpndnt_sqnce_nu', 'dpndnt_kys', 'outpt_kys', 'sqnce_nu', 'extrl_aplcn_id'], 'calls', 'cre_srvce_id', 'cre_srvce_id', 'asc')
                resolve(groupRes)
            }).catch(function (error) {
                reject(error)
            });
    })


}
/**************************************************************************************
* Controller     : Execute Request
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.execRqst = function (req, actn, enty_id) {
    //Sample request
    var options = {
        url: 'http://iptv.apsfl.co.in:8080/appserver/rest/iptv/getServices?serviceType=LTV&partnerCode=APSFL',
        //Get credentials from config based on application
        headers: {
            'username': as.bssapi.mdle.un,
            'apikey': as.bssapi.mdle.api_key,
        }
    };
    console.log(options)
    request(options, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body);
    });

}

buildReqCl = function (actn, creServices, data, reqId) {
    //Add Some logic to Build req data
    let url_dta_tx = ''
    //Get data from bss config
    let _data = {
        "mthd_id": 1,
        "api_rqst_id": reqId,
        "url_tx": "",
        "url_dta_tx": url_dta_tx,
        "api_sts_id": 1,
        "extrl_aplcn_id": creServices.cre_srvce_id
    }
    return _data;
}

getRequests = function () {
    return '';
}

/**************************************************************************************
* Controller     : corpusNewChalleSubscription
* Parameters     : req,res()
* Description    : Corpus API
* Change History :
* 18-03-2020    -  Raju Dasari  - Initial Function
*
***************************************************************************************/
exports.corpusNewChannelSubscription = function (req, res) {

    if (req.headers.xapikey == '047af4b3dc3da17433e4662d71477f2e') {
        console.log("CORPUS_API_BODY:: " + req.body);
        df.formatSucessRes(req, res, [], cntxtDtls, 'Success', {});
    }
    else {
        df.formatSucessRes(req, res, [], cntxtDtls, 'Invalod Token', {});
    }

}

/**************************************************************************************
* Controller     : Upload setup boxes
* Parameters     : None
* Description    : 
* Change History :
* 21/12/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.inventoryUpladfromBss = (req, res) => {
    var fnm = "inventoryUpladfromBss";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var count = 0;
    var duplicate;
    var insertId
	console.log("inventoryUpladfromBss",req.body.data)
	console.log("inventoryUpladfromBss",req.body.user)
    var batchid=req.body.data[0].Batch_Id
	
    apiMstrMdl.uploadSetupBoxMdl(req.body.data, req.body.user)
        .then((results) => {
            insertId = results.insertId;
            function insrtSetUpBox(data, user) {
                apiMstrMdl.insertSetupBoxMdl(data, insertId, user)
                    .then((results) => {
                        count++
                        if (count < req.body.data.length) {
                            insrtSetUpBox(req.body.data[count], req.body.user)
                        }
                        if (count == req.body.data.length) {
                            apiMstrMdl.selectSetupBoxMastMdl(batchid,req.body.user)
                                .then((results1) => {
                                    duplicate = results1
                                    apiMstrMdl.insertSetupBoxMastMdl(batchid,req.body.user)
                                        .then((results2) => {
                                            apiMstrMdl.deleteSetboxStgMdl(batchid,req.body.user)
                                            df.formatSucessRes(req, res, { resbck: results2, dupli: duplicate }, cntxtDtls, fnm, {});
                                        }).catch((error) => {
                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                        });
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });

                        }
                    }).catch((error) => {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
            insrtSetUpBox(req.body.data[0], req.body.user)
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 22/02/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.inventoryTransferfromBssCtrl = (req, res) => {
    var fnm = "inventoryTransferfromBssCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var count = 0;
    var finalreslt = [];
    var notlmostbx = []
    apiMstrMdl.insrtTransfrdtlsMdl(req.body.data, req.body.user)
        .then((results) => {
            var insertId = results.insertId;
            function recursiveInsrt(data, user, id) {
                // apiMstrMdl.checkSrlnoMdl(data).then((results1)=>{
                //     if(results1.length){
                        // data['stpbx_id']=results1[0].stpbx_id
                        apiMstrMdl.insrtTransfrRelMdl(data, user, id)
                        .then((results2) => {
                            // finalreslt.push(results2)
                            count++;
                            ////console.log(count,req.body.data.length)
                            if (count < req.body.data.length) {
                                recursiveInsrt(req.body.data[count], req.body.user, insertId)
                            }
                            if (count == req.body.data.length) {
                                ////console.log("in final")
                                df.formatSucessRes(req, res, results2, cntxtDtls, fnm, {});
                            }
                        }).catch((error) => {
                            ////console.log("sravani")
                            ////console.log("error")
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                    // }
                    // else{
                    //     notlmostbx.push({'Cpe Serial No':data.Cpe_Serial_No})
                    //     if (count == req.body.data.length) {
                    //         df.formatSucessRes(req, res, {data:finalreslt,notinlmo:notlmostbx}, cntxtDtls, fnm, {});
                    //     }
                    // }


                // }).catch((error) => {
                //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                //     });

            }
            recursiveInsrt(req.body.data[count], req.body.user, insertId)
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : initRequest
* Parameters     : enty_id,enty_ky,actn_id
* Description    : Insert External Api Requests
* Change History :
* 28/12/2023    -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updateoltupdownFrmBss = function (req, res) {
    console.log("Called",req.body)
	var fnm = "updateoltupdownFrmBss"; 
	if(req.body.down == 1){
		apiMstrMdl.getPendingActvnCafsMdl(req.body.aaa_cd).then(async (cafdata)=>{
			if(cafdata.length > 0){
				for(i=0;i<cafdata.length;i++){
					await retrackPendingActvnCafs(cafdata[i],i,cafdata.length,req, res)
				}
			} else {
				//df.formatSucessRes(req, res, "No Pending Activation caf in this olt", cntxtDtls, '', {});
			} 
		}).catch((error)=>{
			//df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		})
	}
	console.log(req.body.user)
	apiMstrMdl.oltstsUpdateMdl(req.body.aaa_cd, req.body.down).then((resp) => {
		console.log(resp.insertId)
		df.formatSucessRes(req, res, resp.insertId, cntxtDtls, fnm, {});
	}).catch((err) => {
		console.log(err)
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})

}

/**************************************************************************************
* Controller     : AddOltFrmBssCtrl
* Parameters     : 
* Description    : Update OLT Details
* Change History :
***************************************************************************************/
exports.AddOltFrmBssCtrl = (req, res) => {
    var fnm = "AddOltFrmBssCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var req_body = req.body.data ? req.body.data : req.body;
    req_body = replaceQuotesFromStrng(req_body);
	console.log("req_body",req_body)
    apiMstrMdl.insertOltdtlsMdl(req_body, req.body.user)
        .then((results) => {
            console.log(req_body)
            console.log(results.insertId)
            var insertId = results.insertId;
            // var oltprtdata = req_body[portarray]
            // var oltprtcnt = 0;
            // function oltprts(oltprtdata, insertId) {
            //     console.log("in asrts");
            //     apiMstrMdl.insertOltprtMdl(oltprtdata, insertId, req.user)
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
            apiMstrMdl.insertOltMntrngdtlsMdl(req_body, insertId, req.body.user)
                .then((results) => {
                    // var oltprtdata = req_body[portarray]
                    var oltprtcnt = 0;
                    function oltprts(oltprtdata, insertId) {
                        console.log("in asrts"); 
                        apiMstrMdl.insertOltprtMdl(oltprtdata, insertId, req.body.user)
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
                                            apiMstrMdl.getOltDtlsMdl(insertId, req.body.user, function (err, olrdata) {
                                                apiMstrMdl.addSlot(port_id, slot, req.body.user, function (err, slotInsertRes) {
                                                    s_ct++;
                                                    if (err) { console.log(err); return }
                                                    var slot_id = slotInsertRes.insertId;
                                                    //Add Splits
                                                    apiMstrMdl.addSplits(slot_id, slot, s_ct, req.body.user, olrdata[0], function (err, splitInsertRes) {
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
}

/**************************************************************************************
    * Controller     : AddSbstnFrmBssCtrl
    * Parameters     : 
    * Description    : Update OLT Ltrack Details
    * Change History :
***************************************************************************************/
exports.AddSbstnFrmBssCtrl = (req, res) => {
    var fnm = "AddSbstnFrmBssCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data)
    var req_body = req.body.data ? req.body.data : req.body;
    req_body = replaceQuotesFromStrng(req_body);
    apiMstrMdl.insertsbstndtlsMdl(req_body, req.body.user, req.body.insertId)
        .then((results) => {
            apiMstrMdl.insertsbstnAgntdtlsMdl(req_body, req.body.insertId, req.body.user)
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
    * Controller     : AddLmoMsoFrmBssCtrl
    * Parameters     : 
    * Description    : Update OLT Ltrack Details
    * Change History :
***************************************************************************************/
exports.AddLmoMsoFrmBssCtrl = (req, res) => {
    var fnm = "AddLmoMsoFrmBssCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data)
    //var req_body = req.body.data ? req.body.data : req.body;
    //req_body = replaceQuotesFromStrng(req_body);
	var data = req.body.data;
	//var enrlt_nu = req.body.enrlt_nu;
	//var insertId = req.body.insertId;
	 dbutil.getNxtKey('agnt_enrlt_nu').then(function (nextId) {
        enrlt_nu = nextId
        console.log(enrlt_nu);
		apiMstrMdl.newAgentMdl(data, enrlt_nu, req.body.user).then((results) => {
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
					apiMstrMdl.srvngAraMdl(srvAreaData, insertId, req.body.user)
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
					apiMstrMdl.srvngAsrtMdl(srvAsrtData, insertId, req.body.user)
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
						apiMstrMdl.srvngsbstnMdl(sb_stns_data, insertId, req.body.user)
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



				//console.log(imageData.length);
				function attachFile(atcData) {
					if (atcData.prf_doc_img && atcData.prf_doc_img != undefined) {
						attUtil.sveFileLocalSystm(atcData.prf_doc_img, function (err, attChres) {
							console.log(attChres)
							fs.appendFile("/dreamstep/filestore/uploads/lmo_registration", function (err) {
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
					apiMstrMdl.prfDocMdl(prfDocsData, insertId, req.body.user)
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
					apiMstrMdl.srvngbnkAcntMdl(bnkData, insertId, req.body.user)
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
			console.log("in last error",error);
			df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
	}).catch((error) => {
		console.log("in last error",error);
		df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
	});
}

/**************************************************************************************
* Controller     : del Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 22/02/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.InventorydeleteCpe = (req, res) => {
    var fnm = "deleteCpeToAgent";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var count = 0;
    function deletecpe(data, user) {
        apiMstrMdl.deleteCpeToAgentMdl(data, user)
            .then((results) => {
                count++;
                if (count < req.body.data.length) {
                    deletecpe(req.body.data[count], req.body.user)
                }
                if (count == req.body.data.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });

    }
    deletecpe(req.body.data[count], req.body.user)


}


async function retrackPendingActvnCafs (cafrecords, i, totalLength, req, res){
	var user = req.user
	 let isPartial = false;
	return new Promise((resolve, reject) => {
		apiMstrMdl.getPendingCafDataMdl(cafrecords).then((rqstdata)=>{
			apiMstrMdl.insrtPendingActvnCafsdtlsMdl(cafrecords).then((insrtdata)=>{
				apiMstrMdl.get_apiCls(rqstdata[0].api_rqst_id, user).then((extApiCalls) => {
					console.log("extApiCalls",extApiCalls)
					let apiSeqeunceCalls = [];
					for (let i = 0; i < extApiCalls.length; i++) {
						apiSeqeunceCalls.push(sortByKey(extApiCalls, "sqnce_nu"))
					}
					for (let i = 1; i < apiSeqeunceCalls.length; i++) {
						Array.prototype.push.apply(apiSeqeunceCalls[0], apiSeqeunceCalls[i]);
					}
					let allCalls = apiSeqeunceCalls[0];
					console.log(allCalls.length + " CALLS LENGTH-----------------------------------")
					console.log(allCalls + "ALL CALLS FOR CHECK-----------------------------------")
					let makeRequest = function (allCalls, index, enty_ky, user) {
						console.log(index + " INDEX AT 1----------------------------------------")
						let call = allCalls[index];
						console.log(JSON.stringify(call) + "only call FOR CHECK-----------------------------------");
						try {

							/*if(user.usr_ctgry_ky == 103000730){
								console.log("loop check");
							} else {
								if (call.extrl_aplcn_id == 2) {
									if (index == allCalls.length - 1) {
										resolve({ apiPartial: isPartial, res: [] });
									} else {
										makeRequest(allCalls, index + 1, enty_ky, user);
									}

								}
							} */

							if (call.api_rqst_cl_type_id == 1) {
								let retryDone = 0;
								let headers = call.hdr_tx;
								let inputJson = call.url_dta_tx;
								console.log(inputJson + "inputJson FOR CHECK-----------------------------------");
								console.log("type of inputjson", typeof(inputJson));
								let reqObj = {}
								if (call.extrl_aplcn_id == 1) {
									// reqObj["qs"] = JSON.parse(inputJson);
									reqObj["url"] = call.url_tx;

									console.log("URL" + " " + JSON.stringify(reqObj));
									let bfrdate = new Date();
									let TimeBfrREQ = moment(bfrdate).format('MM/DD/YYYY HH:mm:ss.SSS');
									request(reqObj, function (err, res, body) {
										let chckbody = JSON.stringify(body)
										console.log("------------------------------______________________________-----------------------------")
										console.log("------------------------------______________________________-----------------------------")
										console.log("------------------------------______________________________-----------------------------")
										console.log("------------------------------______________________________-----------------------------")
										console.log("body",body)
										let aftrdate = new Date();
										let TimeAftrREQ = moment(aftrdate).format('MM/DD/YYYY HH:mm:ss.SSS');
										console.log("err, res, body at 1st",err, res.body, body);
										if (err && err.code == 'ETIMEDOUT') {
											apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, err, user);
											apiMstrMdl.insrtTimeClStsMdl(call.url_tx, 2, err, user, rqst_desc_txt, TimeBfrREQ, TimeAftrREQ, enty_ky);
											reject({ apiPartial: isPartial, res: body });
										}
										//else if (body.errorCode && body.errorCode == 5) {
										else if ((body && body.errorCode && body.errorCode == 5) ||
										 (chckbody && (chckbody.includes('EXCPT_INTERNAL_ERROR') || chckbody.includes('EXCPT_INVALID_INPUT') || chckbody.includes('EXCPT_ENTITY_NOT_FOUND')
										 || chckbody.includes("DBA Profile")
										 || chckbody.includes("SNMP request is time-out")
										 || chckbody.includes("SNMP Command")
										 || chckbody.includes("EXCPT_OBJECT_IN_USE")
										 || chckbody.includes("Session capacity is exceeded. Max Session count")
										 )
										 )) {
											apiMstrMdl.updtClStsMdl(call.rest_cl_id, 4, body, user);
											reject({ apiPartial: isPartial, res: body });
										}
										// if (res != null && typeof res != 'undefined') {
										//     console.log(res)
										else if (res || call.extrl_aplcn_id == 2) {
											//calls[index]["res"] = body;
											// resolve({ cl_id: call.rest_cl_id, rspne_tx: body })
											isPartial = true;
											apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
											apiMstrMdl.insrtTimeClStsMdl(call.url_tx, 3, body, user, rqst_desc_txt, TimeBfrREQ, TimeAftrREQ, enty_ky);
											console.log(index + " INDEX AT 2----------------------------------------");
											console.log(" index == allCalls.length - 1 : in last else ", allCalls.length);
											console.log(" call.outpt_kys", call.outpt_kys);
											if (index == allCalls.length - 1) {
												resolve({ apiPartial: isPartial, res: body });
											} else {
												//allCalls[index]["res"] = body;
												if (call.outpt_kys != 'null') {
													
													getOutputData(body, call.outpt_kys.split(','), (d) => {
														apiMstrMdl.updtCafMdl(enty_ky, call.outpt_kys.split(','), d, user).then(() => {
															makeRequest(allCalls, index + 1, enty_ky, user);
														}).catch(() => {
															reject({ apiPartial: isPartial, res: body });
														})
													})

												} else {
													makeRequest(allCalls, index + 1, enty_ky, user);
												}


											}

										}
										else {
											apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
											apiMstrMdl.insrtTimeClStsMdl(call.url_tx, 2, body, user, rqst_desc_txt, TimeBfrREQ, TimeAftrREQ, enty_ky);
											reject({ apiPartial: isPartial, res: body });

										}

									});
								} else {
									if (headers != "" && headers != null && typeof headers != 'undeifned') {
										reqObj["headers"] = JSON.parse(headers);
									}
									if (inputJson != "" && inputJson != null && typeof inputJson != 'undeifned') {
										if (call.extrl_aplcn_id == 2)
											reqObj["body"] = inputJson;
										else if (call.extrl_aplcn_id == 5 )
											reqObj["body"] = inputJson;
										else
											reqObj["body"] = JSON.parse(inputJson);
									} 
									if (call.dpndnt_sqnce_nu) {
										//GET DEPENDENT DATA AND ADD TO REQ BODY
										apiMstrMdl.getDependentDataMdl(enty_ky, call.dpndnt_kys.split(","), user).then((d) => {
											console.log(JSON.stringify(d))
											reqObj["body"] = jsonUtils.prcs_tmplte_get_json2(JSON.stringify(reqObj["body"]), d[0])
											apiMstrMdl.updtClUrlDta(call.rest_cl_id, reqObj["body"], user);
											reqObj["method"] = call.mthd_nm;
											if (!(call.mthd_nm == 'GET' && call.extrl_aplcn_id == 3))
												reqObj["json"] = true;
											reqObj["url"] = call.url_tx;
											console.log("URL" + " " + JSON.stringify(reqObj));
											let bfrdate = new Date();
											let TimeBfrREQ = moment(bfrdate).format('MM/DD/YYYY HH:mm:ss.SSS');
											request(reqObj, function (err, res, body) {
												let chckbody = JSON.stringify(body)
												console.log("------------------------------______________________________-----------------------------")
										console.log("------------------------------______________________________-----------------------------")
										console.log("------------------------------______________________________-----------------------------")
										console.log("------------------------------______________________________-----------------------------")
										console.log("body",body)
												let aftrdate = new Date();
												let TimeAftrREQ = moment(aftrdate).format('MM/DD/YYYY HH:mm:ss.SSS');
												console.log("err, res, body 2nd",err, res.body, body);
												if (err && err.code == 'ETIMEDOUT') {
													apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, err, user);
													apiMstrMdl.insrtTimeClStsMdl(call.url_tx, 2, err, user, rqst_desc_txt, TimeBfrREQ, TimeAftrREQ, enty_ky);
													reject({ apiPartial: isPartial, res: body });
												}
												//else if (body && body.errorCode && body.errorCode == 5) {
												else if ( (body && body.errorCode && body.errorCode == 5) ||
												 (chckbody && (chckbody.includes('EXCPT_INTERNAL_ERROR') || chckbody.includes('EXCPT_INVALID_INPUT') || chckbody.includes('EXCPT_ENTITY_NOT_FOUND')
										 || chckbody.includes("DBA Profile")
										 || chckbody.includes("SNMP request is time-out")
										 || chckbody.includes("SNMP Command")
										 || chckbody.includes("EXCPT_OBJECT_IN_USE")
										 || chckbody.includes("Session capacity is exceeded. Max Session count")
										 )
												 )) {
													apiMstrMdl.updtClStsMdl(call.rest_cl_id, 4, body, user);
													reject({ apiPartial: isPartial, res: body });
												}

												else if (res && isValidRes(body, call.extrl_aplcn_id, actn_id)) {

													isPartial = true;
													apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
													apiMstrMdl.insrtTimeClStsMdl(call.url_tx, 3, body, user, rqst_desc_txt, TimeBfrREQ, TimeAftrREQ, enty_ky);
													console.log(index + " INDEX AT 3----------------------------------------")
													if (index == allCalls.length - 1) {

														resolve({ apiPartial: isPartial, res: body });
													} else {
														//allCalls[index]["res"] = body;
														if (call.outpt_kys != 'null') {
															getOutputData(body, call.outpt_kys.split(','), (d) => {
																apiMstrMdl.updtCafMdl(enty_ky, call.outpt_kys.split(','), d, user).then(() => {
																	makeRequest(allCalls, index + 1, enty_ky, user);
																}).catch(() => {
																	reject({ apiPartial: isPartial, res: body });
																})
															})

														} else {
															makeRequest(allCalls, index + 1, enty_ky, user);
														}


													}

												} else {
													apiMstrMdl.updtReqStsMdl(reqId, 3, body, user);
													apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
													apiMstrMdl.insrtTimeClStsMdl(call.url_tx, 3, body, user, rqst_desc_txt, TimeBfrREQ, TimeAftrREQ, enty_ky);
													reject({ apiPartial: isPartial, res: body });
												}

											});
										});
									} else {
										reqObj["method"] = call.mthd_nm;
										if (!(call.mthd_nm == 'GET' && call.extrl_aplcn_id == 3))
											reqObj["json"] = true;

										reqObj["url"] = call.url_tx;

										console.log("URL" + " " + JSON.stringify(reqObj));
										let bfrdate = new Date();
										let TimeBfrREQ = moment(bfrdate).format('MM/DD/YYYY HH:mm:ss.SSS');
										request(reqObj, function (err, res, body) {
											let chckbody = JSON.stringify(body)
											console.log("------------------------------______________________________-----------------------------")
										console.log("------------------------------______________________________-----------------------------")
										console.log("------------------------------______________________________-----------------------------")
										console.log("------------------------------______________________________-----------------------------")
										console.log("body",body)
											let aftrdate = new Date();
											let TimeAftrREQ = moment(aftrdate).format('MM/DD/YYYY HH:mm:ss.SSS');
											console.log("err, res, body 3rd",err);
											// console.log(body+"---------------------------------------------BODY")
											if (err && err.code == 'ETIMEDOUT') {
												apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, err, user);
												apiMstrMdl.insrtTimeClStsMdl(call.url_tx, 2, err, user, rqst_desc_txt, TimeBfrREQ, TimeAftrREQ, enty_ky);
												reject({ apiPartial: isPartial, res: body });
												
											}
											//else if (body && body.errorCode && body.errorCode == 5) {
											else if ((body && body.errorCode && body.errorCode == 5) ||
											 (chckbody && (chckbody.includes('EXCPT_INTERNAL_ERROR') || chckbody.includes('EXCPT_INVALID_INPUT') || chckbody.includes('EXCPT_ENTITY_NOT_FOUND')
										 || chckbody.includes("DBA Profile")
										 || chckbody.includes("SNMP request is time-out")
										 || chckbody.includes("SNMP Command")
										 || chckbody.includes("EXCPT_OBJECT_IN_USE")
										 || chckbody.includes("Session capacity is exceeded. Max Session count")
										 )
											 )) {
												apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
												reject({ apiPartial: isPartial, res: body });
											}

											else if (res && isValidRes(body, call.extrl_aplcn_id, actn_id)) {

												isPartial = true;
												apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
												apiMstrMdl.insrtTimeClStsMdl(call.url_tx, 3, body, user, rqst_desc_txt, TimeBfrREQ, TimeAftrREQ, enty_ky);
												console.log(index + " INDEX AT 4----------------------------------------")
												if (index == allCalls.length - 1) {

													resolve({ apiPartial: isPartial, res: body });
												} else {

													if (call.outpt_kys != 'null') {

														getOutputData(body, call.outpt_kys.split(','), (d) => {

															apiMstrMdl.updtCafMdl(enty_ky, call.outpt_kys.split(','), d, user).then(() => {
																makeRequest(allCalls, index + 1, enty_ky, user);
															}).catch(() => {
																
																reject({ apiPartial: isPartial, res: body });
															})
														})

													} else {
														makeRequest(allCalls, index + 1, enty_ky, user);
													}


												}

											} else {
												apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
												apiMstrMdl.updtReqStsMdl(reqId, 3, body, user);
												apiMstrMdl.insrtTimeClStsMdl(call.url_tx, 3, body, user, rqst_desc_txt, TimeBfrREQ, TimeAftrREQ, enty_ky);
												reject({ apiPartial: isPartial, res: body });
											}


										});
									}
								}

							} else if (call.api_rqst_cl_type_id == 2) {

							}
						} catch (err) {

							console.log(err)
						}
					}
					makeRequest(allCalls, 0, cafrecords.caf_id, user)
				}).catch((error) => {
					console.log(error)
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				})
			}).catch((error)=>{
				console.log(error)
				df.formatErrorRes(req, res, error, cntxtDtls, '', {});
			})
		}).catch((error)=>{
			console.log(error)
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		})
	})
}

function sortByKey(array, key) {
	console.log("array",array)
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}