const apiMstrMdl = require(appRoot + '/server/api/modules/externalApis/models/apiMstrMdl');
var querystring = require('querystring');
var request = require('request');
var jsonUtils = require(appRoot + '/utils/json.utils');
var log = require(appRoot + '/utils/logmessages');
var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var crypto = require('crypto');
//var sha256 = crypto.createHash('sha256');
/**************************************************************************************
* Controller     : Execute Request
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.callApi = function (rqst_desc_txt, enty_id, actn_id, enty_ky, apiCalls, user) {
    console.log("CALLED EXTERNAL API")
    return new Promise((resolve, reject) => {
        let isPartial = false;
        try {
            //INSERT REQUEST
            apiMstrCtrl.insrt_Request(rqst_desc_txt, enty_id, actn_id, enty_ky, user).then((reqId) => {
                //INSERT API CALLS OF REQUEST
                apiMstrCtrl.insrt_api_cls(reqId, apiCalls, user).then((insClRes) => {
                    //GET INSERTED REQ BASED ON REQ ID
                    apiMstrCtrl.get_apiCls(reqId, user).then((extApiCalls) => {
                        let apiSeqeunceCalls = [];
                        for (let i = 0; i < extApiCalls.length; i++) {
                            apiSeqeunceCalls.push(sortByKey(extApiCalls[i].calls, "sqnce_nu"))

                        }
                        for (let i = 1; i < apiSeqeunceCalls.length; i++) {
                            Array.prototype.push.apply(apiSeqeunceCalls[0], apiSeqeunceCalls[i]);
                        }
                        let allCalls = apiSeqeunceCalls[0];
                        console.log(allCalls.length + " CALLS LENGTH-----------------------------------")
                        let makeRequest = function (allCalls, index, enty_ky, user) {
                            console.log(index + " INDEX AT 1----------------------------------------")
							
                            let call = allCalls[index];
                            try {

                                if (call.extrl_aplcn_id == 2) {
                                    if (index == allCalls.length - 1) {
                                        resolve({ apiPartial: isPartial, res: [] });
                                    } else {
                                        makeRequest(allCalls, index + 1, enty_ky, user);
                                    }

                                }

                                if (call.api_rqst_cl_type_id == 1) {
                                    let retryDone = 0;
                                    let headers = call.hdr_tx;
                                    let inputJson = call.url_dta_tx;

                                    let reqObj = {}
                                    if (call.extrl_aplcn_id == 1) {
                                        // reqObj["qs"] = JSON.parse(inputJson);
                                        reqObj["url"] = call.url_tx;

                                        console.log("URL" + " " + JSON.stringify(reqObj))
                                        request(reqObj, function (err, res, body) {
                                            if (err && err.code == 'ETIMEDOUT') {
                                                apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                reject({ apiPartial: isPartial, res: body,reqId: reqId});
                                            }
                                            else if (body.errorCode && body.errorCode == 5) {
                                                reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                            }
                                            // if (res != null && typeof res != 'undefined') {
                                            //     console.log(res)
                                            else if (res || call.extrl_aplcn_id == 2) {
                                                //calls[index]["res"] = body;
                                                // resolve({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                isPartial = true;
                                                apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
                                                console.log(index + " INDEX AT 2----------------------------------------")
                                                if (index == allCalls.length - 1) {
                                                    resolve({ apiPartial: isPartial, res: body,reqId: reqId });
                                                } else {
                                                    //allCalls[index]["res"] = body;
                                                    if (call.outpt_kys != 'null') {

                                                        getOutputData(body, call.outpt_kys.split(','), (d) => {
                                                            apiMstrMdl.updtCafMdl(enty_ky, call.outpt_kys.split(','), d, user).then(() => {
                                                                makeRequest(allCalls, index + 1, enty_ky, user);
                                                            }).catch(() => {
                                                                reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                            })
                                                        })

                                                    } else {
                                                        makeRequest(allCalls, index + 1, enty_ky, user);
                                                    }


                                                }

                                            }
                                            else {
                                                apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                //reject({ cl_id: call.rest_cl_id, rspne_tx: body })
                                            }
                                            // } else {
                                            //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                            //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                            //     //reject({ cl_id: call.rest_cl_id, statusCode: 408, rspne_tx: err })
                                            // }
                                        });
                                    } else {
                                        if (headers != "" && headers != null && typeof headers != 'undeifned') {
                                            reqObj["headers"] = JSON.parse(headers);
                                        }
                                        if (inputJson != "" && inputJson != null && typeof inputJson != 'undeifned') {
                                            if (call.extrl_aplcn_id == 2)
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
                                                console.log("URL" + " " + JSON.stringify(reqObj))
                                                request(reqObj, function (err, res, body) {
                                                    if (err && err.code == 'ETIMEDOUT') {
                                                        apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                        reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    }
                                                    else if (body && body.errorCode && body.errorCode == 5) {
                                                        reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    }
                                                    // if (res != null && typeof res != 'undefined') {
                                                    //     console.log(res)
                                                    else {
                                                        //calls[index]["res"] = body;
                                                        //  resolve({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                        isPartial = true;
                                                        apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
                                                        console.log(index + " INDEX AT 3----------------------------------------")
                                                        if (index == allCalls.length - 1) {

                                                            resolve({ apiPartial: isPartial, res: body,reqId: reqId });
                                                        } else {
                                                            //allCalls[index]["res"] = body;
                                                            if (call.outpt_kys != 'null') {
                                                                getOutputData(body, call.outpt_kys.split(','), (d) => {
                                                                    apiMstrMdl.updtCafMdl(enty_ky, call.outpt_kys.split(','), d, user).then(() => {
                                                                        makeRequest(allCalls, index + 1, enty_ky, user);
                                                                    }).catch(() => {
                                                                        reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                                    })
                                                                })

                                                            } else {
                                                                makeRequest(allCalls, index + 1, enty_ky, user);
                                                            }


                                                        }

                                                    }
                                                    // else {
                                                    //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                    //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    //     //reject({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                    // }
                                                    // } else {
                                                    //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                    //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    //     //reject({ cl_id: call.rest_cl_id, statusCode: 408, rspne_tx: err })
                                                    // }
                                                });
                                            });
                                        } else {
                                            reqObj["method"] = call.mthd_nm;
                                            if (!(call.mthd_nm == 'GET' && call.extrl_aplcn_id == 3))
                                                reqObj["json"] = true;

                                            reqObj["url"] = call.url_tx;

                                            console.log("URL" + " " + JSON.stringify(reqObj))
                                            request(reqObj, function (err, res, body) {
                                                // console.log(body+"---------------------------------------------BODY")
                                                if (err && err.code == 'ETIMEDOUT') {
                                                    apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                    reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                }
                                                else if (body && body.errorCode && body.errorCode == 5) {
                                                    reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                }
                                                // if (res != null && typeof res != 'undefined') {
                                                //     console.log(res)
                                                else {
                                                    // resolve({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                    isPartial = true;
                                                    apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
                                                    console.log(index + " INDEX AT 4----------------------------------------")
                                                    console.log(allCalls.length -1)
                                                    console.log(call.outpt_kys)
                                                    if (index == allCalls.length - 1) {

                                                        resolve({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    } else {
                                                        //allCalls[index]["res"] = body;
                                                        if (call.outpt_kys != 'null') {

                                                            getOutputData(body, call.outpt_kys.split(','), (d) => {

                                                                apiMstrMdl.updtCafMdl(enty_ky, call.outpt_kys.split(','), d, user).then(() => {
                                                                    makeRequest(allCalls, index + 1, enty_ky, user);
                                                                }).catch(() => {
                                                                    reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                                })
                                                            })

                                                        } else {
															console.log("came to else part")
                                                            makeRequest(allCalls, index + 1, enty_ky, user);
                                                        }


                                                    }

                                                }
                                                // else {
                                                //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                //     //reject({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                // }
                                                // } else {
                                                //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                //     //reject({ cl_id: call.rest_cl_id, statusCode: 408, rspne_tx: err })
                                                // }

                                            });
                                        }
                                    }

                                } else if (call.api_rqst_cl_type_id == 2) {

                                }
                            } catch (err) {

                                console.log(err)
                            }
                        }
                        makeRequest(allCalls, 0, enty_ky, user)
                    }).catch(() => {

                    })
                }).catch(() => {

                })
            }).catch(() => {

            })
        } catch (err) {
            console.log(err)
        }


    })

}


/**************************************************************************************
* Controller     : Execute Request
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 18/10/2022    -  ramesh  - aadhaar Function
*
***************************************************************************************/
exports.aadhaarnew = function (data, user) {
	return new Promise((resolve, reject) => {
		headerDtlsHash = {
			"username": "rtgs",
			"password": "d3cc183c8ad9aa9ca8706bbfc5adfd070931ce924482c029a0233d8b1c505ed0",
			'Content-Type': 'application/json'
		}
		headerDtlsInfo = {
			"username": "APFIBER",
			"password": "8975llj4k3ldf8f6c0893f973fbe78b67ad73804db5c4cf3f65a6248uuisstyhhvb",
			'Content-Type': 'application/json'
		}
		let aplcn_id = as.bssapi.adhar.aplcn_id;
		aadhaar_hash = crypto.createHash('sha256').update(data.u_id + '760535773709671457294710381147965833').digest('hex');
		aadhaar_hash = aadhaar_hash ,
		console.log("aadhaar_hash in EXTAPICtrl", aadhaar_hash);
		inputDtls = { "aadhaar_hash" : aadhaar_hash }
		const adhar_hash = {
			"url": "http://peoplehubservices.ap.gov.in/rtgs/api/thirdParty/residentIdByHash",
			"headers": headerDtlsHash,
			"body": {"aadhaar_hash": aadhaar_hash},
			"method": "POST",
			"json": true,
		};
		console.log("adhar_hash ", adhar_hash);
		request(adhar_hash, function callback(error, response, body) {
			console.log("error", error);
			//console.log("response.body",response.body);
			if (error) {
				log.err("Unable to get data from adhar_hash|url:" + adhar_hash.url);
				console.log("req error",error);
				let resResult = body;
				resolve(resResult);
			} else if (!error && response.statusCode == 200) {
				console.log("response.body",response.body);
				console.log("only body response", body);
				console.log("response.statusCode",response.statusCode);
				let resResult = body.message;
				if(!isNaN(resResult)){
					const adhar_data = {
						"url": "http://peoplehubservices.ap.gov.in/rtgs/api/thirdParty/citizenInfo",
						"headers": headerDtlsInfo,
						"body": {"residentId": resResult},
						"method": "POST",
						"json": true,
					};
					console.log("adhar_data object", adhar_data);
					request(adhar_data, function callback(error, response2, body2) {
						console.log("response2.body2",body2);
						console.log("adhar_data error", error);
						if(error){
						  log.err("Unable to get data from adhar_data|url:" + adhar_data.url)
						  let resResult2 = body2;
						  resolve(resResult2);
						}
						else if (!error && response2.statusCode == 200) {
						  let resResult2 = body2;
						  resolve(resResult2);
						} else {
							reject(body2)
						}
					});
				} else {
					reject(body)
				}
			  
			} else {
				reject(body)
			}
		});
	})
}

/**************************************************************************************
* Controller     : Retry Request
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
retryRqst = function (call) {

    return new Promise((resolve, reject) => {
        let retryDone = 0;
        let headers = call.hdr_tx;
        let inputJson = call.url_dta_tx;
        let reqObj = {}
        if (headers != "" && headers != null && typeof headers != 'undeifned' && headers != "") {
            reqObj["headers"] = headers;
        }
        if (inputJson != "" && inputJson != null && typeof inputJson != 'undeifned' && inputJson != "") {
            reqObj["body"] = inputJson;
        }
        reqObj["method"] = call.mthd_nm;
        reqObj["json"] = true;
        reqObj["url"] = call.url_tx;
        request(reqObj, function (err, res, body) {
            //console.log(body)
            if (err) {
                reject({ cl_id: call.rest_cl_id, rspne_tx: body })
            } else {
                resolve({ cl_id: call.rest_cl_id, rspne_tx: body })
            }

        });
    });
}



function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
function getDependentData(calls, id, keys, callback) {

    calls.forEach(element => {
        let data = {}
        if (element.sqnce_nu == id) {
            if (keys) {
                var allKeys = keys.split(',');
                allKeys.forEach((k) => {
                    data[k] = lookupKey(element["res"], k)

                })
                callback(data);
            }

        }
    });
}
function getOutputData(d, keys, callback) {

    let data;
    if (keys) {
        // var _keys = keys.split(',');
        keys.forEach((k) => {
            data = lookupKey(d, k)

        })
        callback(data);
    }

}
function lookupKey(obj, k) {
    if (typeof (obj) != 'object') {
        return null;
    }
    var result = null;
    if (obj.hasOwnProperty(k)) {
        let o = {}
        o[k] = obj[k]
        return o;
    } else {
        for (var o in obj) {
            result = lookupKey(obj[o], k);
            if (result == null) continue;
            else break;
        }
    }
    console.log(JSON.stringify(result))
    return result;
}

/**************************************************************************************
* Controller     : Execute Request
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 04/10/2021    -  ramesh  - aadhaar Function
*
***************************************************************************************/
exports.aadhaar = function (data, user) {
	return new Promise((resolve, reject) => {
		headerDtlsHash = {
			"username": "rtgs",
			"password": "d3cc183c8ad9aa9ca8706bbfc5adfd070931ce924482c029a0233d8b1c505ed0"
		}
		headerDtlsInfo = {
			"username": "APFIBER",
			"password": "8975llj4k3ldf8f6c0893f973fbe78b67ad73804db5c4cf3f65a6248uuisstyhhvb"
		}
		let aplcn_id = as.bssapi.adhar.aplcn_id;
		aadhaar_hash = sha256.update(data.u_id + '760535773709671457294710381147965833').digest('hex');
		aadhaar_hash = aadhaar_hash ,
		console.log("aadhaar_hash in EXTAPICtrl", aadhaar_hash);
		inputDtls = { "aadhaar_hash" : aadhaar_hash }
		const adhar_hash = {
		  //"aplcn_id": 7,
			//"sqnce_nu": 1,
			"url": "http://peoplehubservices.ap.gov.in/rtgs/api/thirdParty/residentIdByHash",
			"headerDtls": headerDtlsHash,
			"body": {"aadhaar_hash": aadhaar_hash},
			"method": "POST",
			"json": true,
			//"api_rqst_cl_type_id": 1
		};
		console.log("adhar_hash ", adhar_hash);
		request(adhar_hash, function callback(error, response, body) {
			console.log("error", error);
			console.log("response.body",response);
			if (error) {
				log.err("Unable to get data from adhar_hash|url:" + adhar_hash.url);
				console.log("req error",error);
				let resResult = null;
				//callback(error, resResult);
				reject(error, resResult);
			} else if (!error && response.statusCode == 200) {
				console.log("response.body",response.body);
				console.log("only body response", body);
				console.log("response.statusCode",response.statusCode);
				let resResult = body.message;
				const adhar_data = {
					//"aplcn_id": 7,
					//"sqnce_nu": 2,
					"url": "http://peoplehubservices.ap.gov.in/rtgs/api/thirdParty/citizenInfo",
					"headerDtls": headerDtlsInfo,
					"body": {"residentId": resResult},
					"method": "POST",
					//"api_rqst_cl_type_id": 1
				};
				console.log("adhar_data object", adhar_data);
				request(adhar_data, function callback(error, response2, body2) {
					console.log("response2.body",response2);
					console.log("response2.body2",body2);
					console.log("adhar_data error", error);

					if (error || response2.body.statusCode == 422 || JSON.parse(body2)['errorCode'] == 10 || JSON.parse(body2)['errorCode'] == 3456) {
					  log.err("Unable to get data from adhar_data|url:" + adhar_data.url)
					  let resResult2 = null;
					  //callback(error, resResult2);
					  reject(error, resResult2);
					}
					else if (!error && response2.statusCode == 200) {
					  const info = JSON.parse(body2);
					  let resResult2 = body2;
					  //console.log("resResult else if 2",resResult2);
					  //callback(null, resResult2);
					  resolve(null, resResult2);
					}
				});
			}
		});
	})
}


/**************************************************************************************
* Controller     : Execute Request
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 24/12/2021    -  ramesh  - Initial Function
*
***************************************************************************************/
exports.callApinew = function (rqst_desc_txt, enty_id, actn_id, enty_ky, apiCalls, user) {
    console.log("CALLED EXTERNAL API")
    return new Promise((resolve, reject) => {
        let isPartial = false;
        try {
            //INSERT REQUEST
            apiMstrCtrl.insrt_Requestnew(rqst_desc_txt, enty_id, actn_id, enty_ky, user).then((reqId) => {
                //INSERT API CALLS OF REQUEST
                apiMstrCtrl.insrt_api_cls_new(reqId, apiCalls, enty_ky).then((insClRes) => {
                    //GET INSERTED REQ BASED ON REQ ID
                    apiMstrCtrl.get_apiCls(reqId, user).then((extApiCalls) => {
                        let apiSeqeunceCalls = [];
                        for (let i = 0; i < extApiCalls.length; i++) {
                            apiSeqeunceCalls.push(sortByKey(extApiCalls[i].calls, "sqnce_nu"))

                        }
                        for (let i = 1; i < apiSeqeunceCalls.length; i++) {
                            Array.prototype.push.apply(apiSeqeunceCalls[0], apiSeqeunceCalls[i]);
                        }
                        let allCalls = apiSeqeunceCalls[0];
                        console.log(allCalls.length + " CALLS LENGTH-----------------------------------")
                        let makeRequest = function (allCalls, index, enty_ky, user) {
                            console.log(index + " INDEX AT 1----------------------------------------")
                            let call = allCalls[index];
							console.log("call 1",call);
                            try {

                                if (call.extrl_aplcn_id == 2) {
                                    if (index == allCalls.length - 1) {
                                        resolve({ apiPartial: isPartial, res: [] });
                                    } else {
                                        makeRequest(allCalls, index + 1, enty_ky, user);
                                    }

                                }

                                if (call.api_rqst_cl_type_id == 1) {
                                    let retryDone = 0;
                                    let headers = call.hdr_tx;
                                    let inputJson = call.url_dta_tx;

                                    let reqObj = {}
                                    if (call.extrl_aplcn_id == 1) {
                                        // reqObj["qs"] = JSON.parse(inputJson);
                                        reqObj["url"] = call.url_tx;

                                        console.log("URL 1" + " " + JSON.stringify(reqObj))
                                        request(reqObj, function (err, res, body) {
											console.log("request err, res, body 1", err, res.body, body);
                                            if (err && err.code == 'ETIMEDOUT') {
                                                apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                reject({ apiPartial: isPartial, res: body,reqId: reqId});
                                            }
                                            else if (body.errorCode && body.errorCode == 5) {
                                                reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                            }
                                            // if (res != null && typeof res != 'undefined') {
                                            //     console.log(res)
                                            else if (res || call.extrl_aplcn_id == 2) {
                                                //calls[index]["res"] = body;
                                                // resolve({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                isPartial = true;
                                                apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
                                                console.log(index + " INDEX AT 2----------------------------------------")
                                                if (index == allCalls.length - 1) {
                                                    resolve({ apiPartial: isPartial, res: body,reqId: reqId });
                                                } else {
                                                    //allCalls[index]["res"] = body;
                                                    if (call.outpt_kys != 'null') {

                                                        getOutputData(body, call.outpt_kys.split(','), (d) => {
                                                            apiMstrMdl.updtCafMdl(enty_ky, call.outpt_kys.split(','), d, user).then(() => {
                                                                makeRequest(allCalls, index + 1, enty_ky, user);
                                                            }).catch(() => {
                                                                reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                            })
                                                        })

                                                    } else {
                                                        makeRequest(allCalls, index + 1, enty_ky, user);
                                                    }


                                                }

                                            }
                                            else {
                                                apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                //reject({ cl_id: call.rest_cl_id, rspne_tx: body })
                                            }
                                            // } else {
                                            //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                            //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                            //     //reject({ cl_id: call.rest_cl_id, statusCode: 408, rspne_tx: err })
                                            // }
                                        });
                                    } else {
                                        if (headers != "" && headers != null && typeof headers != 'undeifned') {
                                            reqObj["headers"] = JSON.parse(headers);
                                        }
                                        if (inputJson != "" && inputJson != null && typeof inputJson != 'undeifned') {
                                            if (call.extrl_aplcn_id == 2)
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
                                                console.log("URL 2" + " " + JSON.stringify(reqObj))
                                                request(reqObj, function (err, res, body) {
													console.log("request err, res, body 2", err, res.body, body);
                                                    if (err && err.code == 'ETIMEDOUT') {
                                                        apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                        reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    }
                                                    else if (body && body.errorCode && body.errorCode == 5) {
                                                        reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    }
                                                    // if (res != null && typeof res != 'undefined') {
                                                    //     console.log(res)
                                                    else {
                                                        //calls[index]["res"] = body;
                                                        //  resolve({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                        isPartial = true;
                                                        apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
                                                        console.log(index + " INDEX AT 3----------------------------------------")
                                                        if (index == allCalls.length - 1) {

                                                            resolve({ apiPartial: isPartial, res: body,reqId: reqId });
                                                        } else {
                                                            //allCalls[index]["res"] = body;
                                                            if (call.outpt_kys != 'null') {
                                                                getOutputData(body, call.outpt_kys.split(','), (d) => {
                                                                    apiMstrMdl.updtCafMdl(enty_ky, call.outpt_kys.split(','), d, user).then(() => {
                                                                        makeRequest(allCalls, index + 1, enty_ky, user);
                                                                    }).catch(() => {
                                                                        reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                                    })
                                                                })

                                                            } else {
                                                                makeRequest(allCalls, index + 1, enty_ky, user);
                                                            }


                                                        }

                                                    }
                                                    // else {
                                                    //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                    //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    //     //reject({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                    // }
                                                    // } else {
                                                    //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                    //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    //     //reject({ cl_id: call.rest_cl_id, statusCode: 408, rspne_tx: err })
                                                    // }
                                                });
                                            });
                                        } else {
                                            reqObj["method"] = call.mthd_nm;
                                            if (!(call.mthd_nm == 'GET' && call.extrl_aplcn_id == 3))
                                                reqObj["json"] = true;

                                            reqObj["url"] = call.url_tx;

                                            console.log("URL 3" + " " + JSON.stringify(reqObj))
                                            console.log("URL 3" + " " + reqObj)
                                            request(reqObj, function (err, res, body) {
												console.log("request err, res, body 3", err, res.body, body);
                                                // console.log(body+"---------------------------------------------BODY")
                                                if (err && err.code == 'ETIMEDOUT') {
                                                    apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                    reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                }
                                                else if (body && body.errorCode && body.errorCode == 5) {
                                                    reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                }
                                                // if (res != null && typeof res != 'undefined') {
                                                //     console.log(res)
                                                else {
                                                    // resolve({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                    isPartial = true;
                                                    apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
                                                    console.log(index + " INDEX AT 4----------------------------------------")
                                                    if (index == allCalls.length - 1) {

                                                        resolve({ apiPartial: isPartial, res: body,reqId: reqId });
                                                    } else {
                                                        //allCalls[index]["res"] = body;
                                                        if (call.outpt_kys != 'null') {

                                                            getOutputData(body, call.outpt_kys.split(','), (d) => {

                                                                apiMstrMdl.updtCafMdl(enty_ky, call.outpt_kys.split(','), d, user).then(() => {
                                                                    makeRequest(allCalls, index + 1, enty_ky, user);
                                                                }).catch(() => {
                                                                    reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                                })
                                                            })

                                                        } else {
                                                            makeRequest(allCalls, index + 1, enty_ky, user);
                                                        }


                                                    }

                                                }
                                                // else {
                                                //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                //     //reject({ cl_id: call.rest_cl_id, rspne_tx: body })
                                                // }
                                                // } else {
                                                //     apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                                //     reject({ apiPartial: isPartial, res: body,reqId: reqId });
                                                //     //reject({ cl_id: call.rest_cl_id, statusCode: 408, rspne_tx: err })
                                                // }

                                            });
                                        }
                                    }

                                } else if (call.api_rqst_cl_type_id == 2) {

                                }
                            } catch (err) {

                                console.log(err)
                            }
                        }
                        makeRequest(allCalls, 0, enty_ky, user)
                    }).catch(() => {

                    })
                }).catch(() => {

                })
            }).catch(() => {

            })
        } catch (err) {
            console.log(err)
        }


    })

}
