const apiMstrMdl = require(appRoot + '/server/api/modules/externalApis/models/apiMstrMdl');
var querystring = require('querystring');
var request = require('request');
var log = require(appRoot + '/utils/logmessages');

/**************************************************************************************
* Controller     : Execute Request
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.callApi = function (reqId, apps) {
    // // //Sample request
    // if (req.mthd_id == 2) {

    //     var options = {
    //         url: req.url_tx,
    //         //Get credentials from config based on application
    //         headers: {
    //             'username': as.bssapi.mdle.un,
    //             'apikey': as.bssapi.mdle.api_key,
    //         }
    //     };
    //     request(options, (err, res, body) => {
    //         if (err) {
    //             (async function () {
    //                 if (req.rtry_ct)
    //                     while (req.rtry_ct != 0) {
    //                         retryDone++;
    //                         req.rtry_ct = req.rtry_ct - 1;
    //                         //Add to Retry Request Table
    //                         let cl_id = await retryRqst(req, actn, enty_id);
    //                         if (cl_id != 0) {
    //                             break;
    //                         }
    //                     }
    //             }());
    //         }
    //         apiMstrMdl.updtClStsMdl(req.rest_cl_id, 3).then(() => {

    //         })
    //     });
    // }

    // else if (req.mthd_id == 1) {

    //     let data = req.data;
    //     request({
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'username': as.bssapi.mdle.un,
    //             'apikey': as.bssapi.mdle.api_key,
    //         },
    //         uri: req.url_tx,
    //         body: data,
    //         method: 'POST',
    //         json: true
    //     }, function (err, res, body) {
    //         console.log(body.responseStatus.statusCode)
    //         if (body.responseStatus.statusCode == 202) {

    //         }
    //     });
    // }

    // //Post Request
    for (let i = 0; i < apps.length; i++) {
        executeBatchCalls(apps[i].calls)
    }

}
executeBatchCalls = function (calls) {
    for (let i = 0; i < calls.length; i++) {
        (async function () {
            try {
                const res = await makeRequest(calls[i])
                if (res != 202) {
                    break;
                }
            } catch (error) {
                console.error('ERROR:');
                console.error(error);
            }
        }());
    }

}
makeRequest = function (call) {
    return new Promise((resolve, reject) => {
        let headers = call.hdr_tx;
        let inputJson = call.url_dta_tx;
        console.log(inputJson)
        request({
            headers: {
                'content-type': "applicaiton/json",
                'username': as.bssapi.mdle.un,
                'apikey': as.bssapi.mdle.api_key,
            },
            uri: call.url_tx,
            body: JSON.parse(call.url_dta_tx),
            method: 'POST',
            json: true
        }, function (err, res, body) {
            //console.log(body)
            if (err) {
                (async function () {
                    if (call.rtry_ct) {
                        while (call.rtry_ct != 0) {
                            retryDone++;
                            call.rtry_ct = call.rtry_ct - 1;
                            //Add to Retry Request Table
                            let _res = await retryRqst(call);
                            if (_res.statusCode == 202) {
                                break;
                            } else {

                            }
                        }
                    }

                    else {
                        reject(err)
                    }
                }());


            } else {

                resolve(body.responseStatus.statusCode)
            }

        });
    });





}
/**************************************************************************************
* Controller     : Execute Request
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.execRqst = function (req, aplctn, actn, enty_id, parent_enty_id) {
    // //Sample request
    if (req.mthd_id == 2) {

        var options = {
            url: req.url_tx,
            //Get credentials from config based on application
            headers: {
                'username': as.bssapi.mdle.un,
                'apikey': as.bssapi.mdle.api_key,
            }
        };
        request(options, (err, res, body) => {
            if (err) {
                (async function () {
                    if (req.rtry_ct)
                        while (req.rtry_ct != 0) {
                            retryDone++;
                            req.rtry_ct = req.rtry_ct - 1;
                            //Add to Retry Request Table
                            let cl_id = await retryRqst(req, actn, enty_id);
                            if (cl_id != 0) {
                                break;
                            }
                        }
                }());
            }
            apiMstrMdl.updtClStsMdl(req.rest_cl_id, 3).then(() => {

            })
        });
    }

    else if (req.mthd_id == 1) {

        let data = req.data;
        request({
            headers: {
                'Content-Type': 'application/json',
                'username': as.bssapi.mdle.un,
                'apikey': as.bssapi.mdle.api_key,
            },
            uri: req.url_tx,
            body: data,
            method: 'POST',
            json: true
        }, function (err, res, body) {
            console.log(body.responseStatus.statusCode)
            if (body.responseStatus.statusCode == 202) {

            }
        });
    }

    //Post Request


}
/**************************************************************************************
* Controller     : Retry Request
* Parameters     : reqId,data,creServices,action
* Description    : Insert External Api Requests
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.retryRqst = function (call) {
    // return new Promise((resolve, reject) => {
    //     //Sample request
    //     var options = {
    //         url: 'http://iptv.apsfl.co.in:8080/appserver/rest/iptv/getServices?serviceType=LTV&partnerCode=APSFL',
    //         //Get credentials from config based on application
    //         headers: {
    //             'username': as.bssapi.mdle.un,
    //             'apikey': as.bssapi.mdle.api_key,
    //         }
    //     };
    //     console.log(options)
    //     request(options, (err, res, body) => {
    //         if (err) { return 0 }
    //         //Add to Retry Table
    //         apiMstrMdl.insrtRtryMdl(req, res, 3).then(() => {
    //             //update Status Req Call Table
    //             apiMstrMdl.updtClStsMdl(req.rest_cl_id, 3).then(() => {
    //                 return req.rest_cl_id;
    //             }).catch(() => {
    //                 return 0
    //             }).catch(() => {
    //                 return 0
    //             })
    //             console.log(body);
    //         });
    //     })


    // })
    return new Promise((resolve, reject) => {
        let headers = call.hdr_tx;
        let inputJson = call.url_dta_tx;
        console.log(inputJson)
        request({
            headers: {
                'content-type': "applicaiton/json",
                'username': as.bssapi.mdle.un,
                'apikey': as.bssapi.mdle.api_key,
            },
            uri: call.url_tx,
            body: JSON.parse(call.url_dta_tx),
            method: 'POST',
            json: true
        }, function (err, res, body) {
            //console.log(body)
            if (err) {
                reject({ cl_id: call.rest_cl_id, statusCode: body.responseStatus.statusCode })
            } else {
                resolve({ cl_id: call.rest_cl_id, statusCode: body.responseStatus.statusCode })
            }

        });
    });
}

