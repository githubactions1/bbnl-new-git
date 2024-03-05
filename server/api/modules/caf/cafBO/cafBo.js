var CafMdl = require(appRoot + '/server/api/modules/caf/models/CafMdl');
var creSrvMdl = require(appRoot + '/server/api/modules/package/models/CreSrvceMdl');
var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var jsonUtils = require(appRoot + '/utils/json.utils');
/**************************************************************************************
* method         : fingerPrint
* Parameters     : 
* Description    : Business logic for fingerPrint request
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/
exports.fingerPrint = function (enty_id, actn_id, enty_ky, data, user) {
    console.log(user.user_id)
    console.log(data)
    //Add to api_rqst_dtl_t
    //Add to cl_dtl_t
    // return new Promise((resolve, reject) => {
    //     apiMstrCtrl.insrt_Request("FINGER PRINT", enty_id, actn_id, enty_ky, user).then((reqId) => {
    let requestsJsonArray = []
    //Build Requests Based on Action and entity
    let requestsJson = {
        "method": 1,
        "url": as.bssapi.mdle.caf.fingerPrint.url,
        "rtry_ct": 0,
        "headerDtls": {
            "username": as.bssapi.mdle.un,
            "apikey": as.bssapi.mdle.api_key,
            "content-type": as.bssapi.mdle.caf.fingerPrint.content_type
        },
        "input": {
            "module": data.module,
            "command": data.command,
            "subscriberCodes": data.subscriberCodes,
            "franchiseCodes": [],
            "expiryDate": data.expiryDate,
            "dataMap": {
                "position": data.position,
                "fontType": data.fontType,
                "fontSize": data.fontSize,
                "fontColor": data.fontColor,
                "duration": data.duration,
                "bgColor": data.bgColor,
                "fingerPrintType": data.fingerPrintType,
                "channel": data.channel,
                "message": data.message,
                "userCanCloseMessage": data.userCanCloseMessage

            }
        }

    }
    requestsJsonArray.push(requestsJson)
    return requestsJsonArray;
    // apiMstrCtrl.insrt_api_cls(reqId, 1, requestsJsonArray, 3, user).then((insClRes) => {
    //     apiMstrCtrl.get_apiCls(reqId, user).then((apiCalls) => {
    //         //console.log(apiCalls[0].calls)
    //         extApiCtrl.callApi(reqId, apiCalls, user).then((result) => {
    //             resolve(result)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })

    // })
}



/**************************************************************************************
* method         : Provision
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/
exports.provisonCaf = function (data, user = { user_id: 0 }) {

    let requestsJsonArray = [];
    let srvcs = []
    for (let i = 0; i < data.srvcs.length; i++) {
        if (data.srvcs[i].cre_srvce_id == 1) {
            srvcs.push(1)
        } else if (data.srvcs[i].cre_srvce_id == 2) {
            srvcs.push(2)
        } else if (data.srvcs[i].cre_srvce_id == 3) {
            srvcs.push(3)
        }
    }
    try {
        for (var key in as.bssapi) {

            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;
                    let provRequsets = as.bssapi[key].caf.prov;
                    if (provRequsets) {
                        for (let i = 0; i < provRequsets.length; i++) {
                            let headerDtls = {};
                            data["un"] = provRequsets[i].un;
                            data["pwd"] = provRequsets[i].pwd;
                            data["apikey"] = provRequsets[i].apikey;
                            if (aplcn_id == 4) {
                                auth = "Basic " + new Buffer(as.bssapi[key].un + ":" + as.bssapi[key].pwd).toString("base64");
                                headerDtls = {
                                    "Authorization": auth
                                }
                            } else if (aplcn_id == 3) {
                                headerDtls = {}
                                headerDtls = {
                                    "username": as.bssapi[key].un,
                                    "apikey": as.bssapi[key].apikey
                                }

                            } else if (aplcn_id == 2) {
                                headerDtls = {};
                                headerDtls = {
                                    "Content-Type": "text/xml;charset=UTF-8",
                                    "SOAPAction": "Post"
                                }

                            }
                            if (srvcs.includes(provRequsets[i].cre_srvce_id)) {
                                if (aplcn_id != 2) {
                                    requestsJsonArray.push({
                                        aplcn_id: aplcn_id,
                                        method: provRequsets[i].method,
                                        url: jsonUtils.prcs_tmplte_get_url(provRequsets[i].url, data),
                                        headerDtls: headerDtls,
                                        input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(provRequsets[i].input), data),
                                        sqnce_nu: provRequsets[i].sqnce_nu,
                                        cre_srvce_id: provRequsets[i].cre_srvce_id,
                                        dpndnt_sqnce_nu: provRequsets[i].dpndnt_sqnce_nu,
                                        api_rqst_cl_type_id: provRequsets[i].api_rqst_cl_type_id,
                                        dpndnt_kys: provRequsets[i].dpndnt_kys,
                                        outpt_kys: provRequsets[i].outpt_kys
                                    })
                                } else if (aplcn_id == 2 && data.telCnctns) {
                                    for (let j = 0; j < data.telCnctns.length; j++) {
                                        requestsJsonArray.push({
                                            aplcn_id: aplcn_id,
                                            method: provRequsets[i].method,
                                            url: jsonUtils.prcs_tmplte_get_url(provRequsets[i].url, data.telCnctns[j]),
                                            headerDtls: headerDtls,
                                            input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(provRequsets[i].input), data.telCnctns[j]),
                                            sqnce_nu: provRequsets[i].sqnce_nu,
                                            cre_srvce_id: provRequsets[i].cre_srvce_id,
                                            dpndnt_sqnce_nu: provRequsets[i].dpndnt_sqnce_nu,
                                            api_rqst_cl_type_id: provRequsets[i].api_rqst_cl_type_id,
                                            dpndnt_kys: provRequsets[i].dpndnt_kys,
                                            outpt_kys: provRequsets[i].outpt_kys
                                        })
                                    }
                                }

                            }

                        }
                    }
                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;
}

/**************************************************************************************
* method         : Suspension Api Calls 
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 09/03/2020    -    - MADHURI NUNE
*
***************************************************************************************/

exports.suspenstionCalls = function (data, user) {

    console.log("suspenstionCalls")
    let requestsJsonArray = [];
    let srvcs = data.srvcs;

    try {
        for (var key in as.bssapi) {

            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;
                    let suspRequsets = as.bssapi[key].caf.suspend;
                    if (suspRequsets) {
                        for (let i = 0; i < suspRequsets.length; i++) {
                            let headerDtls = {};
                            data["un"] = suspRequsets[i].un;
                            data["pwd"] = suspRequsets[i].pwd;
                            data["apikey"] = suspRequsets[i].apikey;
                            if (aplcn_id == 4) {
                                auth = "Basic " + new Buffer(as.bssapi[key].un + ":" + as.bssapi[key].pwd).toString("base64");
                                headerDtls = {
                                    "Authorization": auth
                                }
                            } else if (aplcn_id == 3) {
                                headerDtls = {}
                                headerDtls = {
                                    "username": as.bssapi[key].un,
                                    "apikey": as.bssapi[key].apikey
                                }

                            }
                            if (srvcs.includes(suspRequsets[i].cre_srvce_id)) {
                                if (aplcn_id == 1 || aplcn_id == 4) {
                                    requestsJsonArray.push({
                                        aplcn_id: aplcn_id,
                                        method: suspRequsets[i].method,
                                        url: jsonUtils.prcs_tmplte_get_url(suspRequsets[i].url, data),
                                        headerDtls: headerDtls,
                                        input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(suspRequsets[i].input), data),
                                        sqnce_nu: suspRequsets[i].sqnce_nu,
                                        cre_srvce_id: suspRequsets[i].cre_srvce_id,
                                        dpndnt_sqnce_nu: suspRequsets[i].dpndnt_sqnce_nu,
                                        api_rqst_cl_type_id: suspRequsets[i].api_rqst_cl_type_id
                                    })
                                } else {
                                    requestsJsonArray.push({
                                        aplcn_id: aplcn_id,
                                        method: suspRequsets[i].method,
                                        url: jsonUtils.prcs_tmplte_get_url(suspRequsets[i].url, data),
                                        headerDtls: headerDtls,
                                        input: jsonUtils.prcs_tmplte_get_json_3(suspRequsets[i].input, data),
                                        sqnce_nu: suspRequsets[i].sqnce_nu,
                                        cre_srvce_id: suspRequsets[i].cre_srvce_id,
                                        dpndnt_sqnce_nu: suspRequsets[i].dpndnt_sqnce_nu,
                                        api_rqst_cl_type_id: suspRequsets[i].api_rqst_cl_type_id
                                    })
                                }

                            }

                        }
                    }
                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;


}

exports.callRestApis = function (requestsJsonArray) {
    var requestsObj = JSON.parse(requestsJsonArray);

    for (var i = 0; i < requestsObj.length - 1; i++) {

        const options = {
            method: requestsObj[i].method,
            uri: requestsObj[i].url,
            headers: requestsObj[i].headerDtls,
            body: requestsObj[i].inputJson
        }
        request(options).then(function (response) {
            console.log(response);
            // res.status(200).json(response);
        })
            .catch(function (err) {
                console.log(err);
            })
    }

}

/**************************************************************************************
* method         : Aadhaar Api Calls 
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/

exports.getAaadharApiCalls = function (data, user) {
    let requestsJsonArray = [];
    let aplcn_id = as.bssapi.adhar.aplcn_id;
    for (let i = 0; i < as.bssapi.adhar.prov.length; i++) {
        requestsJsonArray.push({
            aplcn_id: aplcn_id,
            method: as.bssapi.adhar.prov[i].method,
            url: jsonUtils.prcs_tmplte_get_url(as.bssapi.adhar.prov[i].url, data),
            input: jsonUtils.prcs_tmplte_get_xml(as.bssapi.adhar.prov[i].input, data),
            sqnce_nu: as.bssapi.adhar.prov[i].sqnce_nu,
            dpndnt_sqnce_nu: as.bssapi.adhar.prov[i].dpndnt_sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.adhar.prov[i].api_rqst_cl_type_id
        })
    }
    console.log(requestsJsonArray)
    return requestsJsonArray;
}



/**************************************************************************************
* method         : resume Api Calls 
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 11/03/2020    -    - MADHURI NUNE
*
***************************************************************************************/

exports.onuStatusCall = function (data, user) {
    let requestsJsonArray = [];
    let srvcs = data.srvcs;

    try {
        for (var key in as.bssapi) {

            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;
                    let resRequsets = as.bssapi[key].caf.status;
                    console.log(aplcn_id)
                    if (resRequsets) {
                        for (let i = 0; i < resRequsets.length; i++) {
                            let headerDtls = {};
                            data["un"] = resRequsets[i].un;
                            data["pwd"] = resRequsets[i].pwd;
                            data["apikey"] = resRequsets[i].apikey;
                            if (aplcn_id == 4) {
                                auth = "Basic " + new Buffer(as.bssapi[key].un + ":" + as.bssapi[key].pwd).toString("base64");
                                headerDtls = {
                                    "Authorization": auth
                                }
                            } else if (aplcn_id == 3) {
                                headerDtls = {}
                                headerDtls = {
                                    "username": as.bssapi[key].un,
                                    "apikey": as.bssapi[key].apikey
                                }

                            } else if (aplcn_id == 2) {
                                headerDtls = {}
                                headerDtls = {
                                    "Content-Type": "text/xml;charset=UTF-8",
                                    "SOAPAction": "Post"
                                }

                            }
                            requestsJsonArray.push({
                                aplcn_id: aplcn_id,
                                method: resRequsets[i].method,
                                url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                headerDtls: headerDtls,
                                input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data),
                                sqnce_nu: resRequsets[i].sqnce_nu,
                                cre_srvce_id: resRequsets[i].cre_srvce_id,
                                dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                            })
                        }
                    }
                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;
}

/**************************************************************************************
* method         : resume Api Calls 
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 11/03/2020    -    - MADHURI NUNE
*
***************************************************************************************/

exports.resumeCalls = function (data, user) {
    console.log("resumeCalls")
    let requestsJsonArray = [];
    let srvcs = data.srvcs;

    try {
        for (var key in as.bssapi) {

            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;
                    let resRequsets = as.bssapi[key].caf.resume;
                    console.log(aplcn_id)
                    if (resRequsets) {
                        for (let i = 0; i < resRequsets.length; i++) {
                            let headerDtls = {};
                            data["un"] = resRequsets[i].un;
                            data["pwd"] = resRequsets[i].pwd;
                            data["apikey"] = resRequsets[i].apikey;
                            if (aplcn_id == 4) {
                                auth = "Basic " + new Buffer(as.bssapi[key].un + ":" + as.bssapi[key].pwd).toString("base64");
                                headerDtls = {
                                    "Authorization": auth
                                }
                            } else if (aplcn_id == 3) {
                                headerDtls = {}
                                headerDtls = {
                                    "username": as.bssapi[key].un,
                                    "apikey": as.bssapi[key].apikey
                                }

                            } else if (aplcn_id == 2) {
                                headerDtls = {}
                                headerDtls = {
                                    "Content-Type": "text/xml;charset=UTF-8",
                                    "SOAPAction": "Post"
                                }

                            }
                            if (srvcs.includes(resRequsets[i].cre_srvce_id)) {
                                if (aplcn_id == 1 || aplcn_id == 4) {
                                    requestsJsonArray.push({
                                        aplcn_id: aplcn_id,
                                        method: resRequsets[i].method,
                                        url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                        headerDtls: headerDtls,
                                        input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data),
                                        sqnce_nu: resRequsets[i].sqnce_nu,
                                        cre_srvce_id: resRequsets[i].cre_srvce_id,
                                        dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                        api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                                    })
                                } else {
                                    requestsJsonArray.push({
                                        aplcn_id: aplcn_id,
                                        method: resRequsets[i].method,
                                        url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                        headerDtls: headerDtls,
                                        input: jsonUtils.prcs_tmplte_get_json_3(resRequsets[i].input, data),
                                        sqnce_nu: resRequsets[i].sqnce_nu,
                                        cre_srvce_id: resRequsets[i].cre_srvce_id,
                                        dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                        api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                                    })
                                }

                            }

                        }
                    }
                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;

}



/**************************************************************************************
* method         : terminationCalls Api Calls 
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 11/03/2020    -    - MADHURI NUNE
*
***************************************************************************************/

exports.terminationCalls = function (data, user) {
    let requestsJsonArray = [];

    try {
        for (var key in as.bssapi) {

            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;
                    let resRequsets = as.bssapi[key].caf.terminate;
                    if (resRequsets) {
                        for (let i = 0; i < resRequsets.length; i++) {
                            let headerDtls = {};
                            data["un"] = resRequsets[i].un;
                            data["pwd"] = resRequsets[i].pwd;
                            data["apikey"] = resRequsets[i].apikey;
                            if (aplcn_id == 4) {
                                auth = "Basic " + new Buffer(as.bssapi[key].un + ":" + as.bssapi[key].pwd).toString("base64");
                                headerDtls = {
                                    "Authorization": auth
                                }
                            } else if (aplcn_id == 3) {
                                headerDtls = {}
                                headerDtls = {
                                    "username": as.bssapi[key].un,
                                    "apikey": as.bssapi[key].apikey
                                }

                            } else if (aplcn_id == 2) {
                                headerDtls = {}
                                headerDtls = {
                                    "Content-Type": "text/xml;charset=UTF-8",
                                    "SOAPAction": "Post"
                                }

                            }
                            if (aplcn_id == 2 && data.telCnctns.length > 0) {


                                for (let j = 0; j < data.telCnctns.length; j++) {
                                    requestsJsonArray.push({
                                        aplcn_id: aplcn_id,
                                        method: resRequsets[i].method,
                                        url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data.telCnctns[j]),
                                        headerDtls: headerDtls,
                                        input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data.telCnctns[j]),
                                        sqnce_nu: resRequsets[i].sqnce_nu,
                                        cre_srvce_id: resRequsets[i].cre_srvce_id,
                                        dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                        api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id,
                                        dpndnt_kys: resRequsets[i].dpndnt_kys,
                                        outpt_kys: resRequsets[i].outpt_kys
                                    })
                                }
                            } else if (aplcn_id == 3 && data.subscriberCodes != null) {

                                // console.length(data.subscriberCodes)
                                requestsJsonArray.push({
                                    aplcn_id: aplcn_id,
                                    method: resRequsets[i].method,
                                    url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                    headerDtls: headerDtls,
                                    input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data),
                                    sqnce_nu: resRequsets[i].sqnce_nu,
                                    cre_srvce_id: resRequsets[i].cre_srvce_id,
                                    dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                    api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                                })
                            }
                            else if (aplcn_id != 2 && aplcn_id != 3) {
                                requestsJsonArray.push({
                                    aplcn_id: aplcn_id,
                                    method: resRequsets[i].method,
                                    url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                    headerDtls: headerDtls,
                                    input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data),
                                    sqnce_nu: resRequsets[i].sqnce_nu,
                                    cre_srvce_id: resRequsets[i].cre_srvce_id,
                                    dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                    api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                                })
                            }
                        }
                    }
                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;

}





// /**************************************************************************************
// * method         :Pon Change
// * Parameters     : 
// * Description    : Business logic for Provision request
// * Change History :
// * 16/03/2020    -    - MADHURI NUNE
// *
// ***************************************************************************************/

// exports.ponchangeCall = function (data, user) {
//     let requestsJsonArray = [];
//     for (let i = 0; i < as.bssapi.aaa.caf.ponChange.length; i++) {
//         requestsJsonArray.push({
//             method: as.bssapi.aaa.caf.ponChange[i].method,
//             url: jsonUtils.prcs_tmplte_get_url(as.bssapi.aaa.caf.ponChange[i].url, data),
//             // input: jsonUtils.prcs_tmplte_get_xml(as.bssapi.adhar.prov[i].input, data),
//             sqnce_nu: as.bssapi.aaa.caf.ponChange[i].sqnce_nu,
//             // dpndnt_sqnce_nu: as.bssapi.aaa.caf.ponChange[i].dpndnt_sqnce_nu,
//             api_rqst_cl_type_id: as.bssapi.aaa.caf.ponChange[i].api_rqst_cl_type_id
//         })
//     }
//     return requestsJsonArray;
// }

/**************************************************************************************
* method         :box Change
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 16/03/2020    -    - MADHURI NUNE
*
***************************************************************************************/

exports.boxchangeCall = function (data, user) {

    let requestsJsonArray = [];

    try {
        for (var key in as.bssapi) {

            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;
                    let resRequsets = as.bssapi[key].caf.boxchange;
                    console.log(aplcn_id)
                    if (resRequsets) {
                        for (let i = 0; i < resRequsets.length; i++) {
                            let headerDtls = {};
                            data["un"] = resRequsets[i].un;
                            data["pwd"] = resRequsets[i].pwd;
                            data["apikey"] = resRequsets[i].apikey;
                            if (aplcn_id == 4) {
                                auth = "Basic " + new Buffer(as.bssapi[key].un + ":" + as.bssapi[key].pwd).toString("base64");
                                headerDtls = {
                                    "Authorization": auth
                                }
                            } else if (aplcn_id == 3) {
                                headerDtls = {}
                                headerDtls = {
                                    "username": as.bssapi[key].un,
                                    "apikey": as.bssapi[key].apikey
                                }

                            }
                            requestsJsonArray.push({
                                aplcn_id: aplcn_id,
                                method: resRequsets[i].method,
                                url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                headerDtls: headerDtls,
                                input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data),
                                sqnce_nu: resRequsets[i].sqnce_nu,
                                cre_srvce_id: resRequsets[i].cre_srvce_id,
                                dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                            })




                        }
                    }
                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;
}

/**************************************************************************************
* method         :box Change
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 16/03/2020    -    - MADHURI NUNE
*
***************************************************************************************/

exports.doubleBoxchangeCall = function (data, boxtype) {

    let requestsJsonArray = [];

    try {
        for (var key in as.bssapi) {

            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;
                    let resRequsets = as.bssapi[key].caf.boxchange;
                    console.log(aplcn_id)
                    if (resRequsets) {
                        for (let i = 0; i < resRequsets.length; i++) {
                            let headerDtls = {};
                            data["un"] = resRequsets[i].un;
                            data["pwd"] = resRequsets[i].pwd;
                            data["apikey"] = resRequsets[i].apikey;
                            if (aplcn_id == 4) {
                                auth = "Basic " + new Buffer(as.bssapi[key].un + ":" + as.bssapi[key].pwd).toString("base64");
                                headerDtls = {
                                    "Authorization": auth
                                }
                            } else if (aplcn_id == 3) {
                                headerDtls = {}
                                headerDtls = {
                                    "username": as.bssapi[key].un,
                                    "apikey": as.bssapi[key].apikey
                                }

                            }
                            if (resRequsets[i].type == "both") {
                                requestsJsonArray.push({
                                    aplcn_id: aplcn_id,
                                    method: resRequsets[i].method,
                                    url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                    headerDtls: headerDtls,
                                    input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data),
                                    sqnce_nu: resRequsets[i].sqnce_nu,
                                    cre_srvce_id: resRequsets[i].cre_srvce_id,
                                    dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                    api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                                })
                            }
                            else if (resRequsets[i].type == boxtype) {
                                requestsJsonArray.push({
                                    aplcn_id: aplcn_id,
                                    method: resRequsets[i].method,
                                    url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                    headerDtls: headerDtls,
                                    input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data),
                                    sqnce_nu: resRequsets[i].sqnce_nu,
                                    cre_srvce_id: resRequsets[i].cre_srvce_id,
                                    dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                    api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                                })
                            }
                        }
                    }
                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;
}

/**************************************************************************************
* method         :pon Change
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 16/03/2020    -    - MADHURI NUNE
*
***************************************************************************************/

exports.ponchangecall = function (data, user) {

    let requestsJsonArray = [];

    try {
        for (var key in as.bssapi) {

            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;

                    let resRequsets = as.bssapi[key].caf.ponchange;

                    if (resRequsets) {
                        for (let i = 0; i < resRequsets.length; i++) {
                            let headerDtls = {};
                            data["un"] = resRequsets[i].un;
                            data["pwd"] = resRequsets[i].pwd;
                            data["apikey"] = resRequsets[i].apikey;
                            if (aplcn_id == 4) {
                                auth = "Basic " + new Buffer(as.bssapi[key].un + ":" + as.bssapi[key].pwd).toString("base64");
                                headerDtls = {
                                    "Authorization": auth
                                }
                            } else if (aplcn_id == 3) {
                                headerDtls = {}
                                headerDtls = {
                                    "username": as.bssapi[key].un,
                                    "apikey": as.bssapi[key].apikey
                                }

                            }
                            requestsJsonArray.push({
                                aplcn_id: aplcn_id,
                                method: resRequsets[i].method,
                                url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                headerDtls: headerDtls,
                                input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data),
                                sqnce_nu: resRequsets[i].sqnce_nu,
                                cre_srvce_id: resRequsets[i].cre_srvce_id,
                                dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                            })




                        }
                    }

                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;
}



/**************************************************************************************
* method         :allocatedCafs
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 16/03/2020    -    - MADHURI NUNE
*
***************************************************************************************/

exports.allocatedCafs = function (data) {
    console.log(data)
    let requestsJsonArray = [];

    try {
        for (var key in as.bssapi) {

            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;

                    let resRequsets = as.bssapi[key].caf.allocated;

                    if (resRequsets) {
                        for (let i = 0; i < resRequsets.length; i++) {
                            let headerDtls = {};
                            data["un"] = resRequsets[i].un;
                            data["pwd"] = resRequsets[i].pwd;
                            data["apikey"] = resRequsets[i].apikey;
                            if (aplcn_id == 4) {
                                auth = "Basic " + new Buffer(as.bssapi[key].un + ":" + as.bssapi[key].pwd).toString("base64");
                                headerDtls = {
                                    "Authorization": auth
                                }
                            } else if (aplcn_id == 3) {
                                headerDtls = {}
                                headerDtls = {
                                    "username": as.bssapi[key].un,
                                    "apikey": as.bssapi[key].apikey
                                }

                            }
                            requestsJsonArray.push({
                                aplcn_id: aplcn_id,
                                method: resRequsets[i].method,
                                url: jsonUtils.prcs_tmplte_get_url(resRequsets[i].url, data),
                                headerDtls: headerDtls,
                                input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(resRequsets[i].input), data),
                                sqnce_nu: resRequsets[i].sqnce_nu,
                                cre_srvce_id: resRequsets[i].cre_srvce_id,
                                dpndnt_sqnce_nu: resRequsets[i].dpndnt_sqnce_nu,
                                api_rqst_cl_type_id: resRequsets[i].api_rqst_cl_type_id
                            })




                        }
                    }

                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;
}



/**************************************************************************************
* method         : provisionresume
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 09/09/2019    -    - Initial Function
*
***************************************************************************************/
exports.provisionResumeCall = function (data, user = { user_id: 0 }) {
    let requestsJsonArray = [];

    try {
        for (var key in as.bssapi) {
            console.log("Called")
            if (as.bssapi[key]) {
                if (as.bssapi[key].caf) {
                    let aplcn_id = as.bssapi[key].aplcn_id;
                    let provRequsets = as.bssapi[key].caf.resume;
                    for (let i = 0; i < provRequsets.length; i++) {
                        requestsJsonArray.push({
                            aplcn_id: aplcn_id,
                            method: provRequsets[i].method,
                            url: jsonUtils.prcs_tmplte_get_url(provRequsets[i].url, data),
                            input: jsonUtils.prcs_tmplte_get_json(JSON.stringify(provRequsets[i].input), data),
                            sqnce_nu: provRequsets[i].sqnce_nu,
                            dpndnt_sqnce_nu: provRequsets[i].dpndnt_sqnce_nu,
                            api_rqst_cl_type_id: provRequsets[i].api_rqst_cl_type_id
                        })
                    }
                }
            }
        }

    } catch (err) {
        console.log(err)
    }
    return requestsJsonArray;
}




/**************************************************************************************
* method         : send Api Calls 
* Parameters     : 
* Description    : Business logic for add Package request
* Change History :
* 11/03/2020    -    - 
*
***************************************************************************************/

exports.addPckgCalls = function (data, user) {
    headerDtls = {
        "username": as.bssapi.mdle.un,
        "apikey": as.bssapi.mdle.apikey
    }
    let requestsJsonArray = [];


    for (let i = 0; i < as.bssapi.mdle.caf.addSrvcPck.length; i++) {
        console.log("IN IF")
        requestsJsonArray.push({
            method: as.bssapi.mdle.caf.addSrvcPck[i].method,
            headerDtls: headerDtls,
            // url: jsonUtils.prcs_tmplte_get_url(as.bssapi.mdle.caf.resume[i].url, data),
            url: as.bssapi.mdle.caf.addSrvcPck[i].url,
            //input: jsonUtils.prcs_tmplte_get_json_for_package(JSON.stringify(as.bssapi.mdle.caf.addSrvcPck[i].input), data),
            input: data,
            sqnce_nu: as.bssapi.mdle.caf.addSrvcPck[i].sqnce_nu,
            //   dpndnt_sqnce_nu: as.bssapi.mdle.caf.resume[i].dpndnt_sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.mdle.caf.addSrvcPck[i].api_rqst_cl_type_id,
            aplcn_id: as.bssapi.mdle.aplcn_id
        })
    }
    return requestsJsonArray;
}


/**************************************************************************************
* method         : send Api Calls 
* Parameters     : 
* Description    : Business logic for subscrbrUpdtCall request
* Change History :
* 11/03/2020    -    - 
*
***************************************************************************************/

exports.subscrbrUpdtCall = function (data, user) {
    headerDtls = {
        "username": as.bssapi.mdle.un,
        "apikey": as.bssapi.mdle.apikey
    }
    let requestsJsonArray = [];


    for (let i = 0; i < as.bssapi.mdle.caf.modify.length; i++) {
        console.log("IN IF")
        requestsJsonArray.push({
            method: as.bssapi.mdle.caf.modify[i].method,
            headerDtls: headerDtls,
            // url: jsonUtils.prcs_tmplte_get_url(as.bssapi.mdle.caf.resume[i].url, data),
            url: as.bssapi.mdle.caf.modify[i].url,
            input: jsonUtils.prcs_tmplte_get_json_for_package(JSON.stringify(as.bssapi.mdle.caf.modify[i].input), data),
            sqnce_nu: as.bssapi.mdle.caf.modify[i].sqnce_nu,
            //   dpndnt_sqnce_nu: as.bssapi.mdle.caf.resume[i].dpndnt_sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.mdle.caf.modify[i].api_rqst_cl_type_id,
            aplcn_id: as.bssapi.mdle.aplcn_id
        })
    }
    return requestsJsonArray;
}
/**************************************************************************************
* method         : send Api Calls 
* Parameters     : 
* Description    : Business logic for postNotifCall
* Change History :
* 11/03/2020    -    - 
*
***************************************************************************************/

exports.postNotifCall = function (data, user) {
    headerDtls = {
        "username": as.bssapi.mdle.un,
        "apikey": as.bssapi.mdle.apikey
    }
    let requestsJsonArray = [];


    for (let i = 0; i < as.bssapi.mdle.caf.postNotification.length; i++) {
        console.log("IN IF")
        requestsJsonArray.push({
            method: as.bssapi.mdle.caf.postNotification[i].method,
            headerDtls: headerDtls,
            // url: jsonUtils.prcs_tmplte_get_url(as.bssapi.mdle.caf.resume[i].url, data),
            url: as.bssapi.mdle.caf.postNotification[i].url,
            input: jsonUtils.prcs_tmplte_get_json_3(as.bssapi.mdle.caf.postNotification[i].input, data),
            sqnce_nu: as.bssapi.mdle.caf.postNotification[i].sqnce_nu,
            //   dpndnt_sqnce_nu: as.bssapi.mdle.caf.resume[i].dpndnt_sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.mdle.caf.postNotification[i].api_rqst_cl_type_id,
            aplcn_id: as.bssapi.mdle.aplcn_id
        })
    }
    return requestsJsonArray;
}


/**************************************************************************************
* method         : send Api Calls 
* Parameters     : 
* Description    : Business logic for restartCalls
* Change History :
* 11/03/2020    -    - 
*
***************************************************************************************/

exports.restartCalls = function (data, user) {

    let auth = "Basic " + new Buffer(as.bssapi.agora.un + ":" + as.bssapi.agora.pwd).toString("base64");
    headerDtls = {
        "Authorization": auth
    }

    let dasanHdr = {
        "Authorization": "Basic Og==",
        "password": "1234",
        "username": "rest"
    }

    let requestsJsonArray = [];

    if (data.olt_vndr_id == 1) {
        for (let i = 0; i < as.bssapi.dasan.caf.restart.length; i++) {
            console.log("IN DASAN IF")
            requestsJsonArray.push({
                method: as.bssapi.dasan.caf.restart[i].method,
                headerDtls: dasanHdr,
                 url: as.bssapi.dasan.caf.restart[i].url,
                //url: as.bssapi.dasan.caf.restart[i].url,
                input:  data,
                sqnce_nu: as.bssapi.dasan.caf.restart[i].sqnce_nu,
                //   dpndnt_sqnce_nu: as.bssapi.mdle.caf.resume[i].dpndnt_sqnce_nu,
                api_rqst_cl_type_id: as.bssapi.dasan.caf.restart[i].api_rqst_cl_type_id,
                aplcn_id: as.bssapi.dasan.aplcn_id
            })
        }
    } else {
        for (let i = 0; i < as.bssapi.agora.caf.restart.length; i++) {
            console.log("IN AGORA ELSE")
            requestsJsonArray.push({
                method: as.bssapi.agora.caf.restart[i].method,
                headerDtls: headerDtls,
                // url: jsonUtils.prcs_tmplte_get_url(as.bssapi.mdle.caf.resume[i].url, data),
                url: as.bssapi.agora.caf.restart[i].url,
                input: jsonUtils.prcs_tmplte_get_json_3(as.bssapi.agora.caf.restart[i].input, data),
                sqnce_nu: as.bssapi.agora.caf.restart[i].sqnce_nu,
                //   dpndnt_sqnce_nu: as.bssapi.mdle.caf.resume[i].dpndnt_sqnce_nu,
                api_rqst_cl_type_id: as.bssapi.agora.caf.restart[i].api_rqst_cl_type_id,
                aplcn_id: as.bssapi.agora.aplcn_id
            })
        }
    }

    return requestsJsonArray;
}

/**************************************************************************************
* method         : send Api Calls 
* Parameters     : 
* Description    : Business logic for remove Package request
* Change History :
* 11/03/2020    -    - 
*
***************************************************************************************/

exports.removePckgCalls = function (data, user) {
    headerDtls = {
        "username": as.bssapi.mdle.un,
        "apikey": as.bssapi.mdle.apikey
    }
    let requestsJsonArray = [];


    for (let i = 0; i < as.bssapi.mdle.caf.removeSrvcPck.length; i++) {
        console.log("IN IF")
        requestsJsonArray.push({
            method: as.bssapi.mdle.caf.removeSrvcPck[i].method,
            headerDtls: headerDtls,
            // url: jsonUtils.prcs_tmplte_get_url(as.bssapi.mdle.caf.resume[i].url, data),
            url: as.bssapi.mdle.caf.removeSrvcPck[i].url,
            input: jsonUtils.prcs_tmplte_get_json_for_package(JSON.stringify(as.bssapi.mdle.caf.removeSrvcPck[i].input), data),
            sqnce_nu: as.bssapi.mdle.caf.removeSrvcPck[i].sqnce_nu,
            //   dpndnt_sqnce_nu: as.bssapi.mdle.caf.resume[i].dpndnt_sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.mdle.caf.removeSrvcPck[i].api_rqst_cl_type_id,
            aplcn_id: as.bssapi.mdle.aplcn_id
        })
    }
    return requestsJsonArray;
}



/**************************************************************************************
* method         : send Api Calls 
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 11/03/2020    -    - 
*
***************************************************************************************/

exports.Sendmsg = function (data, user) {
    headerDtls = {
        "username": as.bssapi.mdle.un,
        "apikey": as.bssapi.mdle.apikey
    }
    let requestsJsonArray = [];
    console.log(data, '----------------------------------------')

    if (data.command == 'OSD') {
        for (let i = 0; i < as.bssapi.mdle.fingerPrint.sndMsg.OSD.length; i++) {
            requestsJsonArray.push({
                method: 1,
                headerDtls: headerDtls,
                // url: jsonUtils.prcs_tmplte_get_url(as.bssapi.mdle.caf.resume[i].url, data),
                url: as.bssapi.mdle.fingerPrint.sndMsg.OSD[i].url,
                input: jsonUtils.prcs_tmplte_get_json_for_package(JSON.stringify(as.bssapi.mdle.fingerPrint.sndMsg.OSD[i].input), data),
                sqnce_nu: as.bssapi.mdle.fingerPrint.sndMsg.OSD[i].sqnce_nu,
                //   dpndnt_sqnce_nu: as.bssapi.mdle.caf.resume[i].dpndnt_sqnce_nu,
                api_rqst_cl_type_id: as.bssapi.mdle.fingerPrint.sndMsg.OSD[i].api_rqst_cl_type_id,
                aplcn_id: as.bssapi.mdle.fingerPrint.sndMsg.OSD[i].aplcn_id
            })
        }


        return requestsJsonArray;
    }
    if (data.command == 'SCROLL_TEXT') {
        for (let i = 0; i < as.bssapi.mdle.fingerPrint.sndMsg.scroltext.length; i++) {
            requestsJsonArray.push({
                method: 1,
                headerDtls: headerDtls,
                // url: jsonUtils.prcs_tmplte_get_url(as.bssapi.mdle.caf.resume[i].url, data),
                url: as.bssapi.mdle.fingerPrint.sndMsg.scroltext[i].url,
                input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(as.bssapi.mdle.fingerPrint.sndMsg.scroltext[i].input), data),
                sqnce_nu: as.bssapi.mdle.fingerPrint.sndMsg.scroltext[i].sqnce_nu,
                //   dpndnt_sqnce_nu: as.bssapi.mdle.caf.resume[i].dpndnt_sqnce_nu,
                api_rqst_cl_type_id: as.bssapi.mdle.fingerPrint.sndMsg.scroltext[i].api_rqst_cl_type_id,
                aplcn_id: as.bssapi.mdle.fingerPrint.sndMsg.scroltext[i].aplcn_id
            })
        }
        return requestsJsonArray;
    }
    if (data.command == 'FINGER_PRINT') {
        console.log("in finger print bo "        )
        for (let i = 0; i < as.bssapi.mdle.fingerPrint.sndMsg.fingerprint.length; i++) {
            requestsJsonArray.push({
                method: 1,
                headerDtls: headerDtls,
                // url: jsonUtils.prcs_tmplte_get_url(as.bssapi.mdle.caf.resume[i].url, data),
                url: as.bssapi.mdle.fingerPrint.sndMsg.fingerprint[i].url,
                input: jsonUtils.prcs_tmplte_get_json2(JSON.stringify(as.bssapi.mdle.fingerPrint.sndMsg.fingerprint[i].input), data),
                sqnce_nu: as.bssapi.mdle.fingerPrint.sndMsg.fingerprint[i].sqnce_nu,
                //   dpndnt_sqnce_nu: as.bssapi.mdle.caf.resume[i].dpndnt_sqnce_nu,
                api_rqst_cl_type_id: as.bssapi.mdle.fingerPrint.sndMsg.fingerprint[i].api_rqst_cl_type_id,
                aplcn_id: as.bssapi.mdle.fingerPrint.sndMsg.fingerprint[i].aplcn_id
            })
        }
        console.log(requestsJsonArray)
        return requestsJsonArray;
    }
}
/**************************************************************************************
* method         : resume Api Calls 
* Parameters     : 
* Description    : Business logic for Provision request
* Change History :
* 11/03/2020    -    - MADHURI NUNE
*
***************************************************************************************/

exports.cnclmsg = function (data, user) {
    let requestsJsonArray = [];
    for (let i = 0; i < as.bssapi.mdle.fingerPrint.cnclmsg.length; i++) {
        requestsJsonArray.push({
            method: as.bssapi.mdle.fingerPrint.cnclmsg[i].method,
            // url: jsonUtils.prcs_tmplte_get_url(as.bssapi.mdle.caf.resume[i].url, data),
            url: as.bssapi.mdle.fingerPrint.cnclmsg[i].url,
            input: jsonUtils.prcs_tmplte_get_data(as.bssapi.mdle.fingerPrint.cnclmsg[i].input, data),
            sqnce_nu: as.bssapi.mdle.fingerPrint.cnclmsg[i].sqnce_nu,
            dpndnt_sqnce_nu: as.bssapi.mdle.fingerPrint.cnclmsg[i].dpndnt_sqnce_nu,
            api_rqst_cl_type_id: as.bssapi.mdle.fingerPrint.cnclmsg[i].api_rqst_cl_type_id
        })
    }
    return requestsJsonArray;
}

// prepareInput = function (template, un, pwd, enty_id, actn_id, enty_ky, data, user) {

// }


/**************************************************************************************
* Controller     : getCAFCreServicesSts
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 30/03/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getCAFCreServicesSts = function (req, res) {
    var caf_id = 100003202
    CafMdl.getCAFCreServicesStsMdl(caf_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* method         : send Api Calls 
* Parameters     : 
* Description    : Business logic for add voip Addon Package request
* Change History :
* 07/02/2024    - Ramesh Patlola   - 
*
***************************************************************************************/

exports.addVoipAddOnPckgCalls = function (data, user) {
    
    let requestsJsonArray = [];
    let zteHdr = {
        "Content-Type": "text/xml;charset=UTF-8",
        "SOAPAction": "Post"
    }
	var LC=0
	var LCT=0
	var NTT=0
	var HR=0
	if(data.package_ids == 800){ //voice andhra
		LC=1
		LCT=1
		NTT=0
		HR=1
	} else if (data.package_ids == 801){ //voice bharath
		LC=1
		LCT=1
		NTT=1
		HR=1
	}
    requestsJsonArray.push({
        "method": 1,
        "url": "http://172.16.0.140:18090/zte-ims/url1",
        "headerDtls": zteHdr,
        "cre_srvce_id": 1,
        "aplcn_id": 2,
        "input": {
			//"input": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"xmlns:m=\"http://www.operator.com/IMS/MMTelAS/\"><SOAP-ENV:Header><m:Authentication><m:Username>admin</m:Username><m:Password>Zte$007</m:Password></m:Authentication><m:MEName>MMTelAS_1</m:MEName><m:MessageID>2000001</m:MessageID></SOAP-ENV:Header><SOAP-ENV:Body><m:MOD_SBR><m:IMPU>tel:+91"+ data.mobile.replace(/[']/g,'') +"</m:IMPU><m:LATA>"+ data.lata +"</m:LATA><m:AUCCODE>"+ data.lata +"</m:AUCCODE><m:CALLERAS>1"+ data.lata +"</m:CALLERAS><m:CALLEDAS>2"+ data.lata +"</m:CALLEDAS><m:NSCFU>1</m:NSCFU><m:NSCFB>1</m:NSCFB><m:NSCFNR>1</m:NSCFNR><m:NSCFNL>1</m:NSCFNL><m:NSCW>1</m:NSCW><m:NSHOLD>1</m:NSHOLD><m:NSOIP>1</m:NSOIP><m:NSTIP>1</m:NSTIP><m:LC>1</m:LC><m:LCT>1</m:LCT><m:NTT>1</m:NTT><m:ITT>0</m:ITT><m:INTT>1</m:INTT><m:IITT>0</m:IITT><m:IOLT>1</m:IOLT><m:SPCS>1</m:SPCS><m:HR>1</m:HR><m:HKMACAOTW>1</m:HKMACAOTW><m:CILC>1</m:CILC><m:CILCT>1</m:CILCT><m:CINTT>1</m:CINTT><m:CIITT>1</m:CIITT><m:CIHMT>1</m:CIHMT><m:CISPCS>1</m:CISPCS><m:CIHR>1</m:CIHR><m:OWELC>1</m:OWELC><m:OWELCT>1</m:OWELCT><m:OWENTT>1</m:OWENTT><m:OWEITT>0</m:OWEITT><m:OWESPCS>1</m:OWESPCS><m:OWEHR>1</m:OWEHR><m:OWEHMT>1</m:OWEHMT><m:CIOWELC>1</m:CIOWELC><m:CIOWELCT>1</m:CIOWELCT><m:CIOWENTT>1</m:CIOWENTT><m:CIOWEITT>1</m:CIOWEITT><m:CIOWESPCS>1</m:CIOWESPCS><m:CIOWEHR>1</m:CIOWEHR><m:CIOWEHMT>1</m:CIOWEHMT></m:MOD_SBR></SOAP-ENV:Body></SOAP-ENV:Envelope>"
			"input": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:m=\"http://www.operator.com/IMS/MMTelAS/\"><SOAP-ENV:Header><m:Authentication><m:Username>admin</m:Username><m:Password>Zte$007</m:Password></m:Authentication><m:MEName>MMTelAS_1</m:MEName><m:MessageID>2000001</m:MessageID></SOAP-ENV:Header><SOAP-ENV:Body><m:MOD_SBR><m:IMPU>tel:+91"+ data.mobile.replace(/[']/g,'') +"</m:IMPU><m:LATA>"+ data.lata +"</m:LATA><m:AUCCODE>"+ data.lata +"</m:AUCCODE><m:CALLERAS>1"+ data.lata +"</m:CALLERAS><m:CALLEDAS>2"+ data.lata +"</m:CALLEDAS><m:NSCFU>1</m:NSCFU><m:NSCFB>1</m:NSCFB><m:NSCFNR>1</m:NSCFNR><m:NSCFNL>1</m:NSCFNL><m:NSCW>1</m:NSCW><m:NSHOLD>1</m:NSHOLD><m:NSOIP>1</m:NSOIP><m:NSTIP>1</m:NSTIP><m:LC>"+ LC +"</m:LC><m:LCT>"+ LCT +"</m:LCT><m:NTT>"+ NTT +"</m:NTT><m:ITT>0</m:ITT><m:INTT>1</m:INTT><m:IITT>0</m:IITT><m:IOLT>1</m:IOLT><m:SPCS>1</m:SPCS><m:HR>"+ HR +"</m:HR><m:HKMACAOTW>1</m:HKMACAOTW><m:CILC>1</m:CILC><m:CILCT>1</m:CILCT><m:CINTT>1</m:CINTT><m:CIITT>1</m:CIITT><m:CIHMT>1</m:CIHMT><m:CISPCS>1</m:CISPCS><m:CIHR>1</m:CIHR><m:OWELC>1</m:OWELC><m:OWELCT>1</m:OWELCT><m:OWENTT>1</m:OWENTT><m:OWEITT>0</m:OWEITT><m:OWESPCS>1</m:OWESPCS><m:OWEHR>1</m:OWEHR><m:OWEHMT>1</m:OWEHMT><m:CIOWELC>1</m:CIOWELC><m:CIOWELCT>1</m:CIOWELCT><m:CIOWENTT>1</m:CIOWENTT><m:CIOWEITT>1</m:CIOWEITT><m:CIOWESPCS>1</m:CIOWESPCS><m:CIOWEHR>1</m:CIOWEHR><m:CIOWEHMT>1</m:CIOWEHMT></m:MOD_SBR></SOAP-ENV:Body></SOAP-ENV:Envelope>"
		},
        "sqnce_nu": 1,
        "api_rqst_cl_type_id": 1
    })
    return requestsJsonArray;
}



