const EntityMdl = require(appRoot + '/server/api/modules/general/entity/models/entityMdl');
var df = require(appRoot + '/utils/dflower.utils');
// var kysCtrl = require(appRoot + '/server/api/modules/general/keys/controllers/kysCtrl');
// var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
// var indCstmrMdl = require(appRoot + '/server/api/modules/caf/models/CustomerMdl');
// var entCstmrMdl = require(appRoot + '/server/api/modules/caf/models/EntCustomerMdl');
// var mrchntMdl = require(appRoot + '/server/api/modules/merchant/models/merchantsMdl');
// var creSrvMdl = require(appRoot + '/server/api/modules/package/models/CreSrvceMdl');
// var umMdl = require(appRoot + '/server/api/modules/general/um/models/userMgtMdl');
// var apCnst = require(appRoot + '/utils/appConstants');
// var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// var log = require(appRoot + '/utils/logmessages');
// var cafBO = require(appRoot + '/server/api/modules/caf/cafBO/cafBo');
// var log = require(appRoot + '/utils/logmessages');
var jsonUtils = require(appRoot + '/utils/json.utils');
const apiMstrMdl = require(appRoot + '/server/api/modules/externalApis/models/apiMstrMdl');

var dbutil = require(appRoot + '/utils/db.utils');
/**************************************************************************************
* Controller     : get_entity
* Parameters     : subscriber Data
* Description    : Add Service Pack
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.get_entity = function (req, res) {
    // console.log(req.body)

    EntityMdl.get_entityMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : get_actions
* Parameters     : subscriber Data
* Description    : Add Service Pack
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.get_actions = function (req, res) {
    // console.log(req.body)

    EntityMdl.get_actionsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : get_status
* Parameters     : 
* Description    : 
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.get_status = function (req, res) {
    // console.log(req.body)

    EntityMdl.get_statusMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : get_extapidtls
* Parameters     : 
* Description    : 
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
// exports.get_extapidtls = function (req,res) {
//      console.log(req.body)
// console.log("get_extapidtlsMdl")
//     EntityMdl.get_extapidtlsMdl(req.body.data)
//         .then(function (results) {
//             var common_feilds = ['api_rqst_id','rqst_dscn_tx','enty_id','enty_nm','enty_cd','enty_dscn_tx',
//             'enty_tble_nm','enty_ky_clmn_nm','enty_cd_clmn_nm','enty_cd_lble_nm','actn_id','actn_nm','actn_dscn_tx',
//             'enty_ky','api_sts_id','api_sts_nm','dpndnt_rqst_id'];
//             var arrFeilds = ['api_rqst_id','rest_cl_id','mthd_id','api_rqst_cl_type_id','sqnce_nu','dpndnt_sqnce_nu','url_tx','url_dta_tx',
//                             'hdr_tx','rspne_tx','api_sts_id','rtry_ct','lst_rtry_ts','cre_srvce_id','extrl_aplcn_id','rttv_cnt','extrl_aplcn_nm',
//                             'extrl_aplcn_cd','extrl_aplcn_dscn_tx','api_sts_nm','mthd_nm'];
//             var arrName = 'apicls';
//             var groupBy = 'api_rqst_id';
//             var sortKey = 'api_rqst_id';
//             var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
//            // console.log(groupres)
//             df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//         });

// }
/**************************************************************************************
* Controller     : get_extapidtls
* Parameters     : 
* Description    : 
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.get_extapidtls = function (req, res) {
    console.log(req.body)
    EntityMdl.get_extapidtlsMdl(req.body.data, req.user)
        .then(function (results) {
            console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_extrnlapirqstdtlsCtrl
* Parameters     : 
* Description    : 
* Change History :
* 13/02/2020    -  Pradeep  - Initial Function
*
***************************************************************************************/
exports.get_extrnlapirqstdtlsCtrl = function (req, res) {
    console.log(req)
    EntityMdl.get_extrnlapirqstdtlsMdl(req.params.id, req.user)
        .then(function (results) {
            var common_feilds = ['rtry_id', 'api_rqst_id', 'rqst_dscn_tx', 'extrl_aplcn_nm', 'url_tx', 'url_dta_tx', 'mthd_id', 'mthd_nm', 'rspne_tx', 'mstr_cl_res','mstr_cl_id','mstr_rest_cl_id',
                'mstr_ts_dt', 'mstr_ts_time','cl_cmnt_tx','req_res'];
            var arrFeilds = ['url_tx', 'url_dta_tx', 'rspne_tx', 'rtry_res', 'rtry_ts_dt', 'rtry_ts_time','retry_res'];
            var arrName = 'retryArray';
            var groupBy = 'rest_cl_id';
            var sortKey = 'rest_cl_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            for (var i = 0; i < groupres.length; i++) {

                if (groupres[i].rtry_id == null) {
                    groupres[i].retryArray = []
                    groupres[i].totretry = 0
                }
                groupres[i].totretry = (groupres[i].retryArray) ? groupres[i].retryArray.length : 0
            }
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : retryCtrl
* Parameters     : 
* Description    : 
* Change History :
* 13/02/2020    -  Pradeep  - Initial Function
*
***************************************************************************************/
exports.retryCtrl = function (req, res) {
    console.log(req.body.data)
    let enty_ky =req.body.data.enty_ky
    EntityMdl.insreqrty(req.body.data, req.user)
    .then(function (results) {
        console.log(results)
        console.log(results.insertId)
        let rtry_id =results.insertId
    EntityMdl.getApiClsMdl(req.body.data, req.user).then((extApiCalls) => {
        console.log(extApiCalls)
        let apiSeqeunceCalls = [];
        for (let i = 0; i < extApiCalls.length; i++) {
            apiSeqeunceCalls.push(sortByKey(extApiCalls[i].calls, "sqnce_nu"))
    
        }
        for (let i = 1; i < apiSeqeunceCalls.length; i++) {
            Array.prototype.push.apply(apiSeqeunceCalls[0], apiSeqeunceCalls[i]);
        }
        let allCalls = apiSeqeunceCalls[0];
        let makeRequest = function (allCalls, index, enty_ky, user) {
            let call = allCalls[index];
            try {
    
    
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
                                console.log("IN TIME OUT")
                                apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                EntityMdl.updtrtyClStsMdl(rtry_id, 2, body, user);
                                reject({ id: call.rest_cl_id, index: index, res: body });
                            }
                            if (res != null && typeof res != 'undefined') {
                                console.log(res)
                                if (res) {
                                    //calls[index]["res"] = body;
                                    resolve({ cl_id: call.rest_cl_id, statusCode: res.statusCode, rspne_tx: body })
                                    isPartial = true;
                                    apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
                                    EntityMdl.updtrtyClStsMdl(rtry_id, 3, body, user);
                                    if (index == allCalls.length - 1) {
    
                                        resolve(res);
                                    } else {
                                        //allCalls[index]["res"] = body;
                                        if (call.outpt_kys != 'null') {
                                            console.log("Called")
                                            getOutputData(body, call.outpt_kys.split(','), (d) => {
                                                console.log("In Called")
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
                                    EntityMdl.updtrtyClStsMdl(rtry_id, 2, body, user);
                                    reject({ apiPartial: isPartial, res: body });
                                    //reject({ cl_id: call.rest_cl_id, statusCode: res.statusCode, rspne_tx: body })
                                }
                            } else {
                                apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                EntityMdl.updtrtyClStsMdl(rtry_id, 2, body, user);
                                reject({ apiPartial: isPartial, res: body });
                                //reject({ cl_id: call.rest_cl_id, statusCode: 408, rspne_tx: err })
                            }
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
                                if (call.extrl_aplcn_id != 3 && reqObj["method"] != 'GET')
                                    reqObj["json"] = true;
                                reqObj["url"] = call.url_tx;
                                console.log("URL" + " " + JSON.stringify(reqObj))
                                request(reqObj, function (err, res, body) {
                                    if (err && err.code == 'ETIMEDOUT') {
                                        console.log("IN TIME OUT")
                                        apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                        EntityMdl.updtrtyClStsMdl(rtry_id, 2, body, user);
                                        reject({ id: call.rest_cl_id, index: index, res: body });
                                    }
                                    if (res != null && typeof res != 'undefined') {
                                        console.log(res)
                                        if (res) {
                                            //calls[index]["res"] = body;
                                            resolve({ cl_id: call.rest_cl_id, statusCode: res.statusCode, rspne_tx: body })
                                            isPartial = true;
                                            apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
                                            EntityMdl.updtrtyClStsMdl(rtry_id, 3, body, user);
                                            if (index == allCalls.length - 1) {
    
                                                resolve(res);
                                            } else {
                                                //allCalls[index]["res"] = body;
                                                if (call.outpt_kys != 'null') {
                                                    console.log("Called")
                                                    getOutputData(body, call.outpt_kys.split(','), (d) => {
                                                        console.log("In Called")
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
                                            EntityMdl.updtrtyClStsMdl(rtry_id, 2, body, user);
                                            reject({ apiPartial: isPartial, res: body });
                                            //reject({ cl_id: call.rest_cl_id, statusCode: res.statusCode, rspne_tx: body })
                                        }
                                    } else {
                                        apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                        EntityMdl.updtrtyClStsMdl(rtry_id, 2, body, user);
                                        reject({ apiPartial: isPartial, res: body });
                                        //reject({ cl_id: call.rest_cl_id, statusCode: 408, rspne_tx: err })
                                    }
                                });
                            });
                        } else {
                            reqObj["method"] = call.mthd_nm;
                            if (call.extrl_aplcn_id != 3 && reqObj["method"] != 'GET')
                                reqObj["json"] = true;
    
                            reqObj["url"] = call.url_tx;
    
                            console.log("URL" + " " + JSON.stringify(reqObj))
                            request(reqObj, function (err, res, body) {
    
                                if (err && err.code == 'ETIMEDOUT') {
                                    console.log("IN TIME OUT")
                                    apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                    EntityMdl.updtrtyClStsMdl(rtry_id, 2, body, user);
                                    reject({ id: call.rest_cl_id, index: index, res: body });
                                }
                                if (res != null && typeof res != 'undefined') {
                                    console.log(res)
                                    if (res) {
                                        //calls[index]["res"] = body;
                                        resolve({ cl_id: call.rest_cl_id, statusCode: res.statusCode, rspne_tx: body })
                                        isPartial = true;
                                        apiMstrMdl.updtClStsMdl(call.rest_cl_id, 3, body, user);
                                        EntityMdl.updtrtyClStsMdl(rtry_id, 3, body, user);
                                        if (index == allCalls.length - 1) {
                                            resolve(res);
                                        } else {
                                            //allCalls[index]["res"] = body;
                                            if (call.outpt_kys != 'null') {
                                                console.log("Called")
                                                getOutputData(body, call.outpt_kys.split(','), (d) => {
                                                    console.log("In Called")
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
                                        EntityMdl.updtrtyClStsMdl(rtry_id, 2, body, user);
                                        reject({ apiPartial: isPartial, res: body });
                                        //reject({ cl_id: call.rest_cl_id, statusCode: res.statusCode, rspne_tx: body })
                                    }
                                } else {
                                    apiMstrMdl.updtClStsMdl(call.rest_cl_id, 2, body, user);
                                    EntityMdl.updtrtyClStsMdl(rtry_id, 2, body, user);
                                    reject({ apiPartial: isPartial, res: body });
                                    //reject({ cl_id: call.rest_cl_id, statusCode: 408, rspne_tx: err })
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
        makeRequest(allCalls, 0, enty_ky, req.user)
    }).catch(() => {
    
    })
        
    }).catch(function (error) {
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}

// exports.retryCtrl = function (req, res) {
//     console.log(req.body.data)
//     let enty_ky =req.body.data.enty_ky
//     EntityMdl.insreqrty(req.body.data, req.user)
//     .then(function (results) {
//         console.log(results.insertId)
//         df.formatSucessRes(req, res, results, cntxtDtls, '', {});
//             }).catch(function (error) {
//         df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//     });
// }