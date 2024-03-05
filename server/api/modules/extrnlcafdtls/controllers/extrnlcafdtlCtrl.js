var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var extrnlcafdtlsMdl = require('../models/extrnlcafdtlMdl');
var fs = require("fs");
var attUtil = require(appRoot + '/utils/attachment.utils');
var dbutil = require(appRoot + '/utils/db.utils');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl');
//var log = require(appRoot + '/utils/batch/logger').logger;

/**************************************************************************************
* Controller     : getsbscrcafextrnlDtls
* Parameters     : None
* Description    : 
* Change History :
* 08/09/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getsbscrcafextrnlDtls = (req, res) => {
    var fnm = "getsbscrcafextrnlDtls";
	//console.log("req",req.body);
    //log.info(`In ${fnm}`, { METHOD : req.method, URL : req.originalUrl, BODY : req.body, USER : req.user, HEADER : req.headers.referer});
	console.log("req", req.params);
	console.log("came to getsbscrcafextrnlDtls");
    extrnlcafdtlsMdl.getcafinfoappMdl(req.params.cafId, req.user)
        .then((results) => {
			console.log("results.length",results.length);
			console.log("results",JSON.stringify(results[0]['CAF_ID']));
			if( JSON.stringify(results[0]['CAF_ID']) != "null"){
				results[0]['MSO']= null;
				df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				df.formatErrorExtrnlRes(req, res, {}, cntxtDtls, fnm, {});
			}
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getsbscrextcafstsrnlDtls
* Parameters     : None
* Description    : 
* Change History :
* 08/09/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getsbscrextcafstsrnlDtls = (req, res) => {
    var fnm = "getsbscrextcafstsrnlDtls";
	//console.log("req",req.body);
    //log.info(`In ${fnm}`, { METHOD : req.method, URL : req.originalUrl, BODY : req.body, USER : req.user, HEADER : req.headers.referer});
	console.log("req", req.params);
	if( req.headers.key && req.headers.key == 'd5ds845cde5c8e2thrt89wsdAD' ) {	
		extrnlcafdtlsMdl.getcafextstusinfoappMdl(req.user)
			.then((results) => {
				console.log("length of cafs",results.length);
				df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
			}).catch((error) => {
				df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
			});
	} else {
		res.status(500).send({ "error": "Invalid API Key" });
	}
}

/**************************************************************************************
* Controller     : getextcafHsiDtlsCtrl
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 29-07-2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getextcafHsiDtlsCtrl = function (req, res) {
	var fnm = "getextcafHsiDtlsCtrl";
	console.log("req.params in hsi", req.params);
	if( req.headers.key && req.headers.key == 'd5ds845cde5c8e2thrt89wsdAD' ) {
	extrnlcafdtlsMdl.getextcafHsiDtlsMdl(req.params.cafId, req.params.yr, req.user)
		.then(function (results) {
			if (results && results.length == 0) {
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
			}
			else {
				var common_feilds = ['s_no', 'yr_ct', 'mnt_ct', 'TD', 'TU', 'total', 'mnth_usge_lmt_ct'];
				var arrFeilds = ['day_1_TU', 'day_1_TD', 'day_2_TU', 'day_2_TD', 'day_3_TU', 'day_3_TD', 'day_4_TU', 'day_4_TD', 'day_5_TU', 'day_5_TD', 'day_6_TU', 'day_6_TD', 'day_7_TU', 'day_7_TD', 'day_8_TU', 'day_8_TD', 'day_9_TU', 'day_9_TD', 'day_10_TU', 'day_10_TD', 'day_11_TU', 'day_11_TD', 'day_12_TU', 'day_12_TD', 'day_13_TU', 'day_13_TD', 'day_14_TU', 'day_14_TD', 'day_15_TU', 'day_15_TD', 'day_16_TU', 'day_16_TD', 'day_17_TU', 'day_17_TD', 'day_18_TU', 'day_18_TD', 'day_19_TU', 'day_19_TD', 'day_20_TU', 'day_20_TD', 'day_21_TU', 'day_21_TD', 'day_22_TU', 'day_22_TD', 'day_23_TU', 'day_23_TD', 'day_24_TU', 'day_24_TD', 'day_25_TU', 'day_25_TD', 'day_26_TU', 'day_26_TD', 'day_27_TU', 'day_27_TD', 'day_28_TU', 'day_28_TD', 'day_29_TU', 'day_29_TD', 'day_30_TU', 'day_30_TD', 'day_31_TU', 'day_31_TD'];
				var arrName = 'eachday';
				var groupBy = 'mnt_ct';
				var sortKey = 'mnt_ct';
				var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
				df.formatSucessAppRes(req, res, groupres, cntxtDtls, '', {});
			}
		}).catch(function (error) {
			df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
		});
	} else {
			res.status(500).send({ "error": "Invalid API Key" });
	}
}

/**************************************************************************************
* Controller     : oltEffectedcafcountCtrl
* Parameters     : None
* Description    : 
* Change History :
* 05/07/2023   - Ramesh P - Initial Function
***************************************************************************************/
exports.oltEffectedcafcountCtrl = (req, res) => {
    var fnm = "oltEffectedcafcountCtrl";
	//console.log("req",req.body);
    //log.info(`In ${fnm}`, { METHOD : req.method, URL : req.originalUrl, BODY : req.body, USER : req.user, HEADER : req.headers.referer});
	console.log("req", req.params);
	if( req.headers.key && req.headers.key == 'd5ds845cde5c8e2thrt89wsdAD' ) {	
		var req_body = req.body.data ? req.body.data : req.body;
		//req_body = replaceQuotesFromStrng(req_body);
		extrnlcafdtlsMdl.oltEffectedcafcountMdl(req_body,req.user)
			.then((results) => {
				console.log("length of cafs",results.length);
				df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
			}).catch((error) => {
				df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
			});
	} else {
		res.status(500).send({ "error": "Invalid API Key" });
	}
}

/**************************************************************************************
* Controller     : todayprovisionedafsDataCtrl
* Parameters     : None
* Description    : 
* Change History :
* 20/10/2023   - Ramesh P - Initial Function
***************************************************************************************/
exports.todayprovisionedafsDataCtrl = (req, res) => {
    var fnm = "todayprovisionedafsDataCtrl";
	//console.log("req",req);
	console.log("req",req.headers);
	if( req.headers.key && req.headers.key == 'd5ds845cde5c8e2thrt89wsdAD' ) {	
		extrnlcafdtlsMdl.todayprovisionedafsDataMdl()
			.then((results) => {
				console.log("length of cafs",results.length);
				df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
			}).catch((error) => {
				df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
			});
	} else {
		res.status(500).send({ "error": "Invalid API Key" });
	}
}

/**************************************************************************************
* Controller     : ActiveLmoDtlsDataCtrl
* Parameters     : None
* Description    : 
* Change History :
* 14/11/2023   - Ramesh P - Initial Function
***************************************************************************************/
exports.ActiveLmoDtlsDataCtrl = (req, res) => {
    var fnm = "ActiveLmoDtlsDataCtrl";
	//console.log("req",req.body);
	if( req.headers.key && req.headers.key == 'd5ds845cde5c8e2thrt89wsdAD' ) {	
		extrnlcafdtlsMdl.ActiveLmoDtlsDataMdl(req.params.id).then((results) => {
			console.log("length of cafs",results.length);
			df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
		}).catch((error) => {
			df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
	} else {
		res.status(500).send({ "error": "Invalid API Key" });
	}
}

/**************************************************************************************
* Controller     : timebasedOltDataCtrl
* Parameters     : None
* Description    : 
* Change History :
* 17/11/2023   - Ramesh P - Initial Function
***************************************************************************************/
exports.timebasedOltDataCtrl = (req, res) => {
    var fnm = "timebasedOltDataCtrl";
	//console.log("req",req.body);
	if( req.headers.key && req.headers.key == 'd5ds845cde5c8e2thrt89wsdAD' ) {	
		extrnlcafdtlsMdl.timebasedOltDataMdl(req.params.id)
			.then((results) => {
				console.log("length of cafs",results.length);
				df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
			}).catch((error) => {
				df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
			});
	} else {
		res.status(500).send({ "error": "Invalid API Key" });
	}
}

/**************************************************************************************
* Controller     : yesterdaycafinsertCtrl
* Parameters     : None
* Description    : 
* Change History :
* 09/01/2024   - Ramesh P - Initial Function
***************************************************************************************/
exports.yesterdaycafinsertCtrl = (req, res) => {
    var fnm = "yesterdaycafinsertCtrl";
	//console.log("req",req.body);
	extrnlcafdtlsMdl.yesterdaycafinsertMdl(req.params.id).then((results) => {
		df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
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