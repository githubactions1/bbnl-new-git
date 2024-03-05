//const { Curl } = require('node-libcurl');
var parser = require('fast-xml-parser');
var request = require('request');
var he = require('he');
var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var apiMstrMdl = require(appRoot + '/server/api/modules/externalApis/models/apiMstrMdl');
var options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};
/**************************************************************************************
* Controller     : createAAAProfile
* Parameters     : None
* Description    : 
* Change History :
* 14/05/2020    - Sunil Mulagada - Initial Function
***************************************************************************************/
exports.createAAAProfile = (lagId, bss_data, createAAAProfile_callback) => {

    const curl = new Curl();
    var aaa_url = "http://172.16.4.107/prov4serv/prov_if?oper=insert&client=" + lagId + "&avp=Filter-Id<>nonblock<>check&avp=accessId<>" + bss_data.bss_aaa_mac_addr_tx + "<>reply&avp=Profile<>pV4<>reply&avp=cisco-avpair<>subscriber:sa=" + bss_data.bss_prfle + "<>reply&avp=cisco-avpair<>subscriber:accounting-list=default<>reply"

    curl.setOpt('URL', aaa_url);
    curl.setOpt('FOLLOWLOCATION', true);

    curl.on('end', function (statusCode, data, headers) {
        console.info(statusCode);
        var jsonObj = parser.parse(data, options);
        // console.info(jsonObj);
        this.close();
        createAAAProfile_callback(null, jsonObj)
    });

    curl.on('error', curl.close.bind(curl));
    curl.perform();


}
/**************************************************************************************
* Controller     : updStatusInAgora
* Parameters     : None
* Description    : 
* Change History :
* 14/05/2020    - Sunil Mulagada - Initial Function
***************************************************************************************/
exports.removePonInAaa = (reqId, reqs, user, removePonInAaa_callback) => {
    console.log("REMOVE PON AAA CALLED")
    function processReq(index) {
        execReq(reqs[index], (err, res) => {

            if (index == reqs.length - 1) {
                console.log("REMOVE PON AAA DONE")
                apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                removePonInAaa_callback(false, res)
            } else {
                if (isValidRes(res)) {
                    apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                    processReq(index + 1)
                } else {
                    apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 2, res, user);
                    apiMstrMdl.updtReqStsMdl(reqId, 2, res, user);
                    removePonInAaa_callback(true, res)
                }

            }
        })
    }
    processReq(0)

}

/**************************************************************************************
* Controller     : updStatusInAgora
* Parameters     : None
* Description    : 
* Change History :
* 14/05/2020    - Sunil Mulagada - Initial Function
***************************************************************************************/
exports.terminateCafInAaa = (reqId, reqs, user, removePonInAaa_callback) => {
    console.log("REMOVE PON AAA CALLED")
    if (reqs.length == 0) {
        removePonInAaa_callback(false, [])
    } else {
        function processReq(index) {
            execReq(reqs[index], (err, res) => {

                if (index == reqs.length - 1) {
                    console.log("REMOVE PON AAA DONE")
                    apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                    removePonInAaa_callback(false, res)
                } else {
                    if (isValidRes(res)) {
                        apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                        processReq(index + 1)
                    } else {
                        apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 2, res, user);
                        apiMstrMdl.updtReqStsMdl(reqId, 2, res, user);
                        removePonInAaa_callback(true, res)
                    }

                }
            })
        }
        processReq(0)
    }


}


/**************************************************************************************
* Controller     : updStatusInAgora
* Parameters     : None
* Description    : 
* Change History :
* 14/05/2020    - Sunil Mulagada - Initial Function
***************************************************************************************/
exports.addPonInAaa = (reqId, reqs, user, addPonInAaa_callback) => {
    console.log("ADD PON AAA CALLED")
    function processReq(index) {
        execReq(reqs[index], (err, res) => {

            if (index == reqs.length - 1) {
                console.log("ADD PON AAA DONE")
                apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                addPonInAaa_callback(false, res)
            } else {
                if (isValidRes(res)) {
                    apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                    processReq(index + 1)
                } else {
                    apiMstrMdl.updtReqStsMdl(reqId, 2, res, user);
                    apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 2, res, user);
                    addPonInAaa_callback(true, res)
                }

            }
        })
    }
    processReq(0)

}

/**************************************************************************************
* Controller     : updStatusInAgora
* Parameters     : None
* Description    : 
* Change History :
* 14/05/2020    - Sunil Mulagada - Initial Function
***************************************************************************************/
exports.updatePrflInAaa = (reqId, reqs, user, aaaData, updatePrflInAaa_callback) => {
    if (reqs.length == 0) {
        updatePrflInAaa_callback(false, [])
    } else {
        function processReq(index) {
            execReq(reqs[index], (err, res) => {

                if (index == reqs.length - 1) {
                    apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                    updatePrflInAaa_callback(false, res)
                } else {
                    if (isValidRes(res)) {
                        //apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                        if (reqs[index].extrl_aplcn_id != 20 && res.hasOwnProperty('operation') && res.operation.hasOwnProperty('user') && res["operation"]["result"]["code"] == 0) {
                            console.log("IN 1");
                            let avpair = res["operation"]["users"]["user"]["reply"]["cisco-avpair"][1].split("=")
                            let aaaFup = avpair[1]
                            if (aaaData.fup == aaaFup) {
                                apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
								//updatePrflInAaa_callback(false, res)
								if (index == reqs.length - 1) {
									updatePrflInAaa_callback(false, res);
								} else {
									processReq(index + 1);
								}
                            } else {
                                processReq(index + 1)
                            }

                        } else if (reqs[index].extrl_aplcn_id == 20) { // BNG Request Response
                            console.log("IN 2");
                            console.log(res);
							apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                            if (index == reqs.length - 1) {
                                updatePrflInAaa_callback(false, res);
                            } else {
                                processReq(index + 1);
                            }
                        } else {
                            console.log("IN 3");
                            apiMstrMdl.updtReqStsMdl(reqId, 2, res, user);
                            apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 3, res, user);
                            if (index == reqs.length - 1) {
                                updatePrflInAaa_callback(false, res);
                            } else {
                                processReq(index + 1);
                            }
                            //updatePrflInAaa_callback(true, res)
                        }

                    } else {
                        console.log("IN 4");
                        apiMstrMdl.updtReqStsMdl(reqId, 2, res, user);
                        apiMstrMdl.updtClStsMdl(reqs[index].rest_cl_id, 2, res, user);
                        if (index == reqs.length - 1) {
                            updatePrflInAaa_callback(false, res);
                        } else {
                            processReq(index + 1);
                        }
                        //updatePrflInAaa_callback(true, res)
                    }

                }
            })
        }
        processReq(0)
    }

}


function execReq(data, callback) {
	console.log(data)
	let reqObj = {
        "method": data.mthd_nm,
        //"url": 'http://202.53.92.35/apiv1/caf_operations/ext/aaacurlexctn',
        "url": data.url_tx,
        "body": JSON.parse(data.url_dta_tx), 
		json: true
    }
	console.log("reqObj",reqObj)
    request(reqObj, (error, response, body) => {
        console.log("error body",error, body )
        callback(null, response.body)
        return;
    });
    /*console.log(data.url_tx)
    const curl = new Curl();
    var aaa_url = data.url_tx

    curl.setOpt('URL', aaa_url);
    curl.setOpt('FOLLOWLOCATION', true);

    curl.on('end', function (statusCode, data, headers) {
        console.info(statusCode);
        var jsonObj = parser.parse(data, options);
        // console.info(jsonObj);
        this.close();
        callback(null, jsonObj)
    });

    curl.on('error', curl.close.bind(curl));
    curl.perform();*/

}
function isValidRes(res, actn) {
    // try {
    //     let aghoraErrCodes = as.bssapi.agora.errCodes;
    //     if (res && res.hasOwnProperty('errorCode') && aghoraErrCodes.includes(res.errorCode)) {
    //         if (res.hasOwnProperty('message'))
    //             apiMstrMdl.updtReqStsMdl(reqId, 2, res.message, user);
    //         else
    //             apiMstrMdl.updtReqStsMdl(reqId, 2, res, user);
    //         return false
    //     }
    //     return true;
    // } catch (e) {
    //     return false;
    // }
    return true;

}
