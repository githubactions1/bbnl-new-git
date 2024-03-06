const apiMstrMdl = require(appRoot + '/server/api/modules/externalApis/models/apiMstrMdl');
const soapRequest = require('easy-soap-request');
var inputUtil = require(appRoot + '/utils/input.utils');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var convert = require('xml-js');
var parser = require('fast-xml-parser');
var he = require('he');
var request = require('request')
var cafBO = require(appRoot + '/server/api/modules/caf/cafBO/cafBo');
// const _crypto = require('crypto');
// var CryptoJS = require("crypto-js");
// var aesjs = require('aes-js');
const { base64encode, base64decode } = require('nodejs-base64');
/**************************************************************************************
* Controller     : Aadhaar
* Parameters     : Aadhaar
* Description    : Aadhaar Details
* Change History :
* 13/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.get_aadhaarDtlsCtrl = function (req, res) {
    let fnm = "get_aadhaarDtlsCtrl"
    let data = { u_id: req.params.u_id }
    let apiCalls = cafBO.getAaadharApiCalls(data, req.user)
    extApiCtrl.callApi("GET AADHAAR DETAILS", 1, 1, 1, apiCalls, req.user).then((result) => {
	//extApiCtrl.aadhaar(data, req.user).then((result) => {
        console.log(result)
        if (result.res) {
            if (result.res['UID_NUM']) {
                console.log("$$$$$$$$$$$")
                let arr = result.res.CITIZEN_NAME.split(' ');
                let sr_nm = '';
                let fst_nm = '';
                for (let index = 0; index < arr.length; index++) {
                    if (index == 0) {
                        sr_nm = arr[index];
                    }
                    else {
                        fst_nm += arr[index] + ' ';
                    }
                }
                result.res['FST_NM'] = fst_nm
                result.res['SUR_NM'] = sr_nm
                result.res['GENDER'] = result.res['GENDER'].trim();
                df.formatSucessRes(req, res, result, cntxtDtls, '', {});
            }
            else {
                df.formatErrorRes(req, res, result, cntxtDtls, fnm,
                    { error_status: "202", err_message: "Unable to fetch details for the given aadhar number, please enter manually." });
            }
        }
        else {
            df.formatErrorRes(req, res, result, cntxtDtls, fnm,
                { error_status: "202", err_message: "Unable to fetch details for the given aadhar number, please enter manually." });
        }
    }).catch((err) => {
		console.log("err", err);
        df.formatErrorRes(req, res, err, cntxtDtls, fnm,
            { error_status: "400", err_message: "Aadhar server is not responding at this moment. Please enter details manually." });
    })

}

/**************************************************************************************
* Controller     : Aadhaar
* Parameters     : Aadhaar
* Description    : Aadhaar Details
* Change History :
* 04/10/2020    -  ramesh  - Initial Function
*
***************************************************************************************/
exports.get_newaadhaarDtlsCtrl = function (req, res) {
    let fnm = "get_aadhaarDtlsCtrl"
	var options = {
        method: 'get',
        //json: true, // Use,If you are sending JSON data
        url: `http://202.53.92.35/apiv2/ext/wrapper/BBNL_aadhaar/${req.params.u_id}`,
    }
	console.log("options in aadhaar",options)
	request(options,function(err, resp, body){
		console.log("err body in aadhaar",err,body)
		var newbody = JSON.parse(body)
		console.log("newbody",newbody)
		df.formatChckIptvSucessRes(req, res, newbody, cntxtDtls, '', {});
	})
    /*let data = { u_id: req.params.u_id }
    extApiCtrl.aadhaarnew(data, req.user).then((result) => {
        console.log("result", result)
        if (result.success == true) {
            console.log("$$$$$$$$$$$")
            let arr = result.message[0].CITIZEN_NAME.split(' ');
            let sr_nm = '';
            let fst_nm = '';
            if (arr.length == 1) {
                fst_nm += arr[0];
            } else {
                for (let index = 0; index < arr.length; index++) {
                    if (index == 0) {
                        sr_nm = arr[index];
                    }
                    else {
                        fst_nm += arr[index] + ' ';
                    }
                }
            }
            let addr = result.message[0].ADDRESS.split(',');

            strt_nm = addr[0];


            result.res = result.message
            result.res[0]['FST_NM'] = fst_nm
            result.res[0]['BUILDING_NAME'] = strt_nm
            result.res[0]['SUR_NM'] = sr_nm
            result.res[0]['GENDER'] = result.message[0]['GENDER'].trim();
            df.formatSucessRes(req, res, result, cntxtDtls, '', {});
        } else {
            df.formatErrorRes(req, res, result, cntxtDtls, fnm,
                { error_status: "202", err_message: "Unable to fetch details for the given aadhar number, please enter manually." });
        }
    }).catch((err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, fnm,
            { error_status: "400", err_message: "Aadhar server is not responding at this moment. Please enter details manually." });
    })*/

}


