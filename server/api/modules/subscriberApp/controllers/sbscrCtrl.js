var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var sbscrAppmdl = require('../models/sbscrMdl');
var fs = require("fs");
var attUtil = require(appRoot + '/utils/attachment.utils');
var dbutil = require(appRoot + '/utils/db.utils');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl');
//var log = require(appRoot + '/utils/batch/logger').logger;
var _ = require('lodash');
var cafBO = require('../../../modules/caf/cafBO/cafBo');
var generate = require(appRoot + '/utils/html_template.utils');
var pdfgeneration = require(appRoot + '/utils/PdfGeneration');
var pdf = require('html-pdf');
const { result } = require('lodash');
var mailUtls = require(appRoot + '/utils/mail.utils');
var request = require('request');
var sms_srvc = require(appRoot + '/utils/sms.utils');
var aaaApi = require(appRoot + '/server/extApi/aaa/aaa_api.js');
var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var addOnBo = require(appRoot + '/server/api/modules/addons/bo/addOnBo');
var operationsUtils = require(appRoot + '/utils/operations.utils');
var moment=require('moment');

/**************************************************************************************
* Controller     : getcafinfoappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getcafinfoappCtrl = (req, res) => {
    var fnm = "getcafinfoappCtrl";
	//console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getcafinfoappMdl(req.body)
        .then((results) => {
			console.log("results", results[0].caf_id);
			if(results[0].caf_id > 0){
				var no_of_days_left =0;
				var renew_flag= null;
				//var userInfo = new Date(results[0]['end_date']);
				var date = new Date();
				var userInfo = new Date(date.getFullYear(), date.getMonth() + 1, 1);
				var today = new Date();
				console.log("today", today)
				console.log("userInfo", userInfo);
				var year =new Date().getFullYear();
				var month =new Date().getMonth();
				var days = new Date(year, month+1, 0).getDate();
				if(userInfo > today ){
					var diff = Math.abs(userInfo-today);
					var remaining_days = Math.floor(diff / 86400000);
					if(remaining_days>0){
						no_of_days_left = remaining_days;
					} else {
						no_of_days_left = 0;
					}
				}
				if(no_of_days_left<30) {
					//renew_flag = 1;
					renew_flag = 0;
				} else {
					renew_flag = 0;
				}
				console.log("no_of_days_left",no_of_days_left);
				console.log("renew_flag",renew_flag);
				var data ={};
				data['user_info']=results;
				data['no_of_days_left']=no_of_days_left;
				data['days_in_month'] = days;
				data['renew_flag']=renew_flag;
			}
			console.log("data in controller cust_id", data);
			sbscrAppmdl.getcafhsidtlsappMdl(results[0])
				.then((result) => {
					console.log("result", result[0]);
					if(result.length == 0){
						data['TD']=0;
						data['TU']=0;
						data['total']=0;
						data['limit']=0;
					} else if (result.length > 0 && result[0].mnth_usge_lmt_ct == null) {
						data['TD'] = 0;
						data['TU'] = 0;
						data['total'] = 0;
						data['limit'] = 0;
					} else {
						var datas=result[0];
						data['TD']=datas.TD;
						data['TU']=datas.TU;
						data['total']=datas.total;
						data['limit']=datas.mnth_usge_lmt_ct;
					}
					
					//console.log("data", data);
				sbscrAppmdl.custmernotificationMdl(results[0])
						.then((ntfncnt) => {
							console.log("result", ntfncnt[0]);
							if (ntfncnt.length == 0) {
								data['noti_count'] = 0;

							} else {
								data['noti_count'] = ntfncnt[0].count;
							}
							df.formatSucessAppRes(req, res, data, cntxtDtls, fnm, {});
						})
				})
            
        }).catch((error) => {
			console.log("error in cust_info", error);
            df.formatAppMbleInvalidErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueCcCatgrybyCaftypeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/06/2023    -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.OCCIssueCcCatgrybyCaftypeCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueCcCatgrybyCaftypeMdl(req.params.id,req.params.cmp,req.params.cafId,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueCountByCafCatgrytypCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/06/2023    -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.OCCIssueCountByCafCatgrytypCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueCountByCafCatgrytypMdl(req.params.id,req.params.cafId,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : custmernotifications
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/07/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.updatecuststatusctrl = (req, res) => {
	var fnm = "updatecuststatusctrl";
	sbscrAppmdl.updatecuststatusMdl(req.body.data, req.user)
		.then((results) => {
			df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
		}).catch((error) => {
			df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
}

/**************************************************************************************
* Controller     : getbusnesinfoappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getbusnesinfoappCtrl = (req, res) => {
    var fnm = "getbusnesinfoappCtrl";
	console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getbusnesinfoappMdl(req.body)
        .then((results) => {
            df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getcompcatappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getcompcatappCtrl = (req, res) => {
    var fnm = "getcompcatappCtrl";
	console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getcompcatfrappMdl(req.body)
        .then((results) => {
            df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getonlycompcatappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 09/11/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getonlycompcatappCtrl = (req, res) => {
    var fnm = "getonlycompcatappCtrl";
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getcompcatappMdl(req.user)
        .then((results) => {
            df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getcstmrcmplntinfoappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 23/07/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getcstmrcmplntinfoappCtrl = (req, res) => {
    var fnm = "getcstmrcmplntinfoappCtrl";
	console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getcstmrcmplntappMdl(req.body)
        .then((results) => {
			console.log("length in cmplnts",results.length);
			if(results.length>0){
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				console.log("came to else in cmplnts");
				let error={};
				df.formatAppInvalidCmpErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in catch error");
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getcstmrcmplntaddappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getcstmrcmplntaddappCtrl = (req, res) => {
    var fnm = "getcstmrcmplntaddappCtrl";
	console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getcstmrcmplntaddappMdl(req.body)
        .then((results) => {
			console.log("results .length", results.emp_id);
			if(results.length>0){
				console.log("came to if");
				var ticketNo = 'CC'+Math.floor(Math.random() * 999999);
				var emp_id=0;
				console.log("ticketNo", ticketNo);
				//sbscrAppmdl.getcntcstmrcmplntaddappMdl()
					//.then((count) => {
						//console.log("count",count[0]['count(*)']+50);
						sbscrAppmdl.insrtcstmrcmplntaddappMdl( req.body, results[0], ticketNo, emp_id, req.user )
							.then((result) => {
								sbscrAppmdl.getcmplntforlogappMdl(ticketNo, req.user).then((response) => {
									sbscrAppmdl.insrtcmplntlogappMdl(response[0], req.user).then((rspnse) => {
										df.formatSucessAppRes(req, res, "Complaint Inserted Sucessfully", cntxtDtls, fnm, {});
									})
								})
							})
					//})
			} else {
				console.log("came to else in cmplnts");
				let error="No customer Id found";
				df.formatAppNewInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in catch error");
			let err="Failed";
            df.formatAppNewInvalidParamsErrorRes(req, res, err, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getcstmrpaymntsdtlsappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getcstmrpaymntsdtlsappCtrl = (req, res) => {
    var fnm = "getcstmrpaymntsdtlsappCtrl";
	console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getcstmrpaymntsdtlsappMdl(req.body)
        .then((results) => {
				console.log("results in payments", results.length);
			if(results.length>0){
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				df.formatAppMbleInvalidErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in payments catch error");
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getcstmrupdtdtlsappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getcstmrupdtdtlsappCtrl = (req, res) => {
    var fnm = "getcstmrupdtdtlsappCtrl";
	console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.updtcstmrupdtdtlsappMdl(req.body)
        .then((results) => {
				console.log("results in dtls", results);
			if(results.affectedRows=1){
				df.formatSucessAppRes(req, res, "details are updated", cntxtDtls, fnm, {});
			} else {
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in dtls catch error");
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getcstmrntfcstnlstappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getcstmrntfcstnlstappCtrl = (req, res) => {
    var fnm = "getcstmrntfcstnlstappCtrl";
	console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getcstmrntfcstnlstappMdl(req.body)
        .then((results) => {
				console.log("results in dtls", results);
			if(results.length>0){
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				df.formatAppMbleInvalidErrorRes(req, res, "No Notifications", cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in dtls catch error");
            df.formatAppInvalidParamsErrorRes(req, res, "Required Fields Missing", cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getcstmrpckgesappCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/07/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.getcstmrpckgesappCtrl = (req, res) => {
    var fnm = "getcstmrpckgesappCtrl";
	console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getcstmrpckgesappMdl(req.body)
        .then((results) => {
			console.log("results in dtls", results);
			sbscrAppmdl.getcstmrpckgesjoinappMdl(req.body)
				.then((result) => {
					console.log("packages in dtls", result);
					console.log("packages", result.length);
					/*var  pckgsids = result;
					
						pckgsids.forEach((s) => {
							pack_id.push(
								s
							)
						})
						
						console.log("pack_id", pack_id);*/
						
					if(result.length>0){
						console.log("came in to it");
						sbscrAppmdl.getcstmrjoinpckgesappMdl(result[0]['packge_id'])
							.then((pckgs) => {
								//console.log("pckgs in dtls", pckgs);
								//console.log("packages for existngpckgsdtls", result[0]['pack_ids']);
								//var data ={};
								var base_packs=[];
								var ala_carte=[];
								var broadcaster_packs = [];
								var vod_packs = [];
								//var existingPacks = [];
								pckgs.forEach((s) => {
									if(s['cat_id']==1){
										console.log("s",s[0]);
										base_packs.push(
											s
                                        )
									} 
								})
								sbscrAppmdl.getcstmrjoinalacartepckgesappMdl()
									.then((alacarte) => {
										alacarte.forEach((s) => {
											//console.log("came to alacarte");
											if(s['cat_id']==2){
												ala_carte.push(
													s
												)
											} 
										})
									sbscrAppmdl.getaddonhsipckgesappMdl()
											.then((addonshsi) => {
												addonshsi.forEach((s) => {
													//console.log("came to alacarte");
													broadcaster_packs.push(
														s
													)
												})	
										sbscrAppmdl.getaddonVodpckgesappMdl()
													.then((vodpacks) => {
														vodpacks.forEach((s) => {
															//console.log("came to alacarte");
															vod_packs.push(
																s
															)
														})
												if(pckgs.length>0){
													sbscrAppmdl.getcstmrpckgesdtlsappMdl(result[0]['packge_id'])
														.then((existngpckgsdtls) => {
															//console.log("existngpckgsdtls in dtls",existngpckgsdtls[0].package_id);
															sbscrAppmdl.getcstmrcperentaldtlsappMdl(req.body)
															.then((cperentalpckgsdtls) => {
																console.log("cperentalpckgsdtls[0]['cycle_end_dt']",cperentalpckgsdtls[0]['cycle_end_dt'])
																var userInfo = new Date(cperentalpckgsdtls[0]['cycle_end_dt']);
																userInfo = moment(userInfo,'YYYY-MM-DD').add(1,'d');
																var today = new Date();
																var remaining_days =0;
																var cpevalue = 0;
																if(cperentalpckgsdtls[0]['cycle_end_dt'] == null || cperentalpckgsdtls[0]['cycle_end_dt'] =='0000-00-00'){
																	userInfo = new Date();
																}
																
																if (userInfo >= today) {
																	cpevalue = parseFloat(cperentalpckgsdtls[0].cpe_val, 2)*remaining_days;
																} else {
																	var diff = Math.abs(userInfo - today);
																	remaining_days = Math.floor(diff / 86400000);
																	cpevalue = parseFloat(cperentalpckgsdtls[0].cpe_val, 2)*remaining_days;
																}
																console.log("cpevalue",cpevalue)
																var existingPacksIds = result[0]['packge_id'];
																df.formatSucessAppRes(req, res, { base_packs, ala_carte, existngpckgsdtls, existingPacksIds, broadcaster_packs, cperentalpckgsdtls, cpevalue, vod_packs}, cntxtDtls, fnm, {});
															}).catch((error) => {
																console.log("came in existngpckgsdtls catch error");
																df.formatAppInvalidParamsErrorRes(req, res, "No Old Packages", cntxtDtls, fnm, {});
															});
															//var existingPacksIds = result[0]['packge_id'];
															//df.formatSucessAppRes(req, res, {base_packs,ala_carte,existngpckgsdtls,broadcaster_packs,existingPacksIds}, cntxtDtls, fnm, {});
														}).catch((error) => {
															console.log("came in existngpckgsdtls catch error");
															df.formatAppInvalidParamsErrorRes(req, res, "No Old Packages", cntxtDtls, fnm, {});
														});
												} else {
													console.log("came in pckgs catch error");
													df.formatAppInvalidParamsErrorRes(req, res, "No New Packages", cntxtDtls, fnm, {});
												}
									}).catch((error) => {
												console.log("came in addonhsi catch error", error);
												df.formatAppInvalidParamsErrorRes(req, res, "Required Fields Missing", cntxtDtls, fnm, {});
											});
											}).catch((error) => {
												console.log("came in addonhsi catch error", error);
												df.formatAppInvalidParamsErrorRes(req, res, "Required Fields Missing", cntxtDtls, fnm, {});
											});
								}).catch((error) => {
										console.log("came in alacarte catch error");
										df.formatAppInvalidParamsErrorRes(req, res, "Required Fields Missing", cntxtDtls, fnm, {});
									});
							})
					} else {
						console.log("came in result catch error");
						df.formatAppInvalidParamsErrorRes(req, res, "No Packages", cntxtDtls, fnm, {});
					}
				}).catch((error) => {
					console.log("came in results catch error");
					df.formatAppInvalidParamsErrorRes(req, res, "Required Fields Missing", cntxtDtls, fnm, {});
				});	
        }).catch((error) => {
			console.log("came in dtls catch error");
            df.formatAppInvalidParamsErrorRes(req, res, "Required Fields Missing", cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getsbscrcafHsiDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 29-07-2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getsbscrcafHsiDtls = function (req, res) {
	var fnm = "getsbscrcafHsiDtls";
	console.log("req.params in hsi",req.params);
	//log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.getsbscrcafHsiDtlsMdl(req.params.cafId, req.params.yr)
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
}

/**************************************************************************************
* Controller     : getsbscrcafVoipDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 29-07-2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getsbscrcafVoipDtls = function (req, res) {
	var fnm = "getsbscrcafVoipDtls";
	//log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
	console.log("in voip req.params",req.params);
    sbscrAppmdl.getsbscrcafVoipDtlsMdl(req.params.cafId, req.params.yr)
        .then(function (results) {
			 if (results && results.length == 0) {
                    df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
                }
                else {
                    df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
                }
        }).catch(function (error) {
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
        });
}


/**************************************************************************************
* Controller     : getcafHsiDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 29-09-2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getcstmrinvcepckgesappCtrl = function (req, res) {
	console.log("in voip req.params",req.body);
	var check;
    sbscrAppmdl.getcstmrinvcepckgesappMdl(req.body)
        .then(function (results) {
			console.log("results", results);
			console.log("results[0].caf_id", results[0].caf_id);
			 if (results && results.length == 0) {
                    df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
			} else { 
					//let options = { format: 'A4' };
					let options = { 
						format: 'A4', 
						orientation: "portrait"
					};
					let cafdata = results;
					pdfgeneration.generateinvcePdf(cafdata, req.body, function (err, results) {
							//console.log("error or results", err, results);
							console.log("cafdata[0].caf_id", cafdata[0].caf_id);
							let file_nm = "invoice";
							
							pdf.create(results, options).toStream( function (err, data) {
								if (err) {
									console.log(err)
										return(err,data)
								}
								if (data) {
									console.log("data", data.path);
									var file = fs.createReadStream(data.path);
									var stat = fs.statSync(data.path);
									res.setHeader('Content-Length', stat.size);
									res.setHeader('Content-Type', 'application/pdf');
									res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
									file.pipe(res);
									//df.formatSucessAppRes(req, res, data, cntxtDtls, '', {});
								}
							})
							
						
						})
					
					
                }
        }).catch(function (error) {
			console.log("error", error);
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
        });
}

/**************************************************************************************
* Controller     : getcafHsiDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 29-09-2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getcstmrinvcedtlsfrappCtrl = function (req, res) {
	console.log("in voip req.params",req.body);
	var check;
    sbscrAppmdl.getcstmrinvcedtlsfrappMdl(req.body)
        .then(function (results) {
			console.log("results", results);
			 if (results && results.length == 0) {
				 let error = "User doesn't have invoice data";
                    df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
			} else {
				df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
			}
        }).catch(function (error) {
			console.log("error", error);
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
        });
}

/**************************************************************************************
* Controller     : getcafHsiDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 29-09-2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getcstmrinvceaddonsdtlsfrappCtrl = function (req, res) {
	console.log("in voip req.params",req.body);
	var check;
    sbscrAppmdl.getcstmrinvceaddonsdtlsfrappMdl(req.body)
        .then(function (results) {
			console.log("results", results);
			 if (results && results.length == 0) {
				 let error = "User doesn't have invoice data";
                    df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
			} else {
				df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
			}
        }).catch(function (error) {
			console.log("error", error);
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
        });
}

/**************************************************************************************
* Controller     : getcafcstmrinvcepckgesappCtrl
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 29-09-2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getcafcstmrinvcepckgesappCtrl = function (req, res) {
console.log("in voip req.params",req.params);
	var check;
    sbscrAppmdl.getcstmrmnthwiseinvcepckgesappMdl(req.params.caf_id, req.params.year, req.params.month)
        .then(function (results) {
			console.log("results", results);
			 if (results && results.length == 0) {
				let error = "No Data Avilable For Caf Id : "+req.params.caf_id;
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: error });
			} else { 
				sbscrAppmdl.getcstmrinvceaddonsdtlspckgefrappMdl(results[0].caf_invce_id, req.params.year, req.params.month)
        		.then(function (result) {
					console.log("result", result)
					//let options = { format: 'A4' };
					let options = { 
						format: 'A4', 
						orientation: "portrait"
					};
					var cpe_chrge=[];
					var lcl_chrge=[];
					var isd_chrge=[];
					var std_chrge=[];
					var base_chrge=[];
					var base_chrges=[];
					var addon_chrge=[];
					results.forEach((s) => {
						if(s['chrge_cde_dscn_tx']=='CPE CHARGES' ){
							cpe_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='Local Phone Usage Chargese'){
							lcl_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='ISD Phone Usage Charges'){
							isd_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='STD Phone Usage Charges'){
							std_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='Service Rental Charges' && s['pckage_type_nm']=='Base'){
							base_chrges.push(
								s
							)
						} 
					})
					result.forEach((s) => {
						if (s['chrge_cde_dscn_tx']=='Service Rental Charges' && s['pckage_type_nm']=='Base'){
							base_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='Service Rental Charges' && s['pckage_type_nm']=='AddOn'){
							addon_chrge.push(
								s
							)
						}
					})
					var addonchrge = 0 ;
					for ( let i=0; i<addon_chrge.length; i++){
						addonchrge = + addonchrge + parseFloat(addon_chrge[i]['chrge_at'], 2)
					}
					var addonchrgetx = 0;
					for ( let i=0; i<addon_chrge.length; i++){
						addonchrgetx = + addonchrgetx + parseFloat(addon_chrge[i]['tl_at'], 2)
					}
					console.log("inputs of cpe_chrge : ",cpe_chrge);
					console.log("inputs of lcl_chrge : ",lcl_chrge);
					console.log("inputs of isd_chrge : ",isd_chrge);
					console.log("inputs of std_chrge : ",std_chrge);
					console.log("inputs of base_chrge : ",base_chrge);
					console.log("inputs of addon_chrge : ",addon_chrge);
					console.log("inputs of addonchrge : ",addonchrge);
					if (std_chrge[0] != null && isd_chrge[0] != null && lcl_chrge[0] != null) {
						var landlineChrge = parseFloat(lcl_chrge[0].chrge_at, 2) + parseFloat(isd_chrge[0].chrge_at, 2) + parseFloat(std_chrge[0].chrge_at, 2);
						console.log("landlineChrge",landlineChrge)
					} else {
						var landlineChrge = 0;
					}
					let cafdata = results;
					pdfgeneration.generateinvcePdf(cafdata,landlineChrge,cpe_chrge,lcl_chrge,isd_chrge,std_chrge,base_chrge,base_chrges,addon_chrge,addonchrge.toFixed(2),addonchrgetx.toFixed(2), req.body, function (err, results) {
							//console.log("error or results", err, results);
							let file_nm = "invoice";
							
							pdf.create(results, options).toStream( function (err, data) {
								if (err) {
									console.log(err)
									return(err,data)
								}
								if (data) {
									var file = fs.createReadStream(data.path);
									var stat = fs.statSync(data.path);
									res.setHeader('Content-Length', stat.size);
									res.setHeader('Content-Type', 'application/pdf');
									res.setHeader('Content-Disposition', 'attachment; filename='+req.params.caf_id+'.pdf');
									file.pipe(res);
								}
							})					
						})	
				})				
            }
        }).catch(function (error) {
			console.log("error", error);
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
        });
}


/**************************************************************************************
* Controller     : occinsrtnewcmplntCtrl
* Parameters     : None
* Description    : 
* Change History :
* 30/10/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.occinsrtnewcmplntCtrl = (req, res) => {
    var fnm = "getcstmrupdtdtlsappCtrl";
	console.log("req",req.body.data.caf_id);
	console.log("req.body.data",req.body.data);
	var cmpsts = 1;
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
	var ticketNo;
	if (req.body.data.occ_or_cc == 8) {
	    ticketNo = 'GRI' + Math.floor(Math.random() * 999999);
		if(req.body.data.tickettype.replace(/["']/g, "") == 'Enquiry'){
			cmpsts = 3;
		}
	} else if( req.body.data.tickettype == 'Customer Complaints'){
		ticketNo = 'CC'+Math.floor(Math.random() * 999999);
	} else if(req.body.data.tickettype == 'Service Request') {
		ticketNo = 'SR'+Math.floor(Math.random() * 999999);
	} else if(req.body.data.tickettype == 'Enquiry') {
		ticketNo = 'EQ'+Math.floor(Math.random() * 999999);
		cmpsts = 3;
	} else if(req.body.data.tickettype == 'Enterprise') {
		ticketNo = 'ENT'+Math.floor(Math.random() * 999999);
		compstatus = 3;
	} else if (req.body.data.tickettype.replace(/["']/g, "") == 'Lmo Complaint') {
		ticketNo = 'LMO' + Math.floor(Math.random() * 999999);
	}
	console.log("ticket no check for sr and cc : ", ticketNo)
    sbscrAppmdl.occinsrtnewcmplntMdl(req.body.data, ticketNo, cmpsts, req.user)
        .then((results) => {
				console.log("results in dtls", results);
				console.log("empty file",req.body.data.attachments[0].uploadfile);
				console.log("true or false file",req.body.data.attachments[0].uploadfile != '' && req.body.data.attachments[0].uploadfile != null );
				
			if(results.affectedRows=1){
				if(req.body.data.attachments[0].uploadfile != '' && req.body.data.attachments[0].uploadfile != null ){
				console.log("not equal to null")
					try {
					var data = req.body.data.attachments[0].uploadfile.split(',')[1];
					var filename = ticketNo;
					var path =  '/glits/web/code/nodejs/apsflbss_web/uploads/';
					var buf = Buffer.from(data, 'base64');
					console.log("path",path);
					console.log("buf",buf);
						const base64ToImage = (buf, path, filename) => {  
							console.log(" in base64ToImage ")
							fs.writeFile(path + filename, buf, 'binary', function (err, result) {
								console.log("in fs",err, result)
								if (err) {
									return(err, "not uploaded");
								} else {
									console.log("err", err,"result", result);
									return(err, result);
								}
							});
						}
					base64ToImage(buf, path, filename);
					} catch (err){
						console.log(err)
					}
				} else {
					console.log("equal to null")
				}
				sbscrAppmdl.getcmplntforlogappMdl(ticketNo, req.user).then((response) => {
					sbscrAppmdl.insrtcmplntlogappMdl(response[0], req.user).then((rspnse) => {
						sbscrAppmdl.insertnotificationdataMdl(req.body.data, response[0], req.user).then( (resp) => {
							//sbscrAppmdl.sendPushNotificationMdl(req.body.data, ticketNo, req.user, function (err, resp) {
								
							//})
							df.formatSucessAppRes(req, res, "Complaint Inserted Sucessfully", cntxtDtls, fnm, {});
						})
					})
				})
			} else {
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in dtls catch error", error);
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     :  editcomplaints
* Parameters     : req,res()
* Description    : editcomplaints
* Change History :
* 08/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.editcomplaintsCtrl = function (req, res) {

	sbscrAppmdl.editcomplaintsCtrlMdl(req.body.data, req.user)
		.then((results) => {
			sbscrAppmdl.insertcomplaintlogCtrlMdl(req.body.data, req.user)
				.then(function (result) {
					console.log("results in dtls", results);
					console.log("empty file", req.body.data.attachments[0].uploadfile);
					console.log("true or false file", req.body.data.attachments[0].uploadfile != '' && req.body.data.attachments[0].uploadfile != null);


					if (results.affectedRows = 1) {
						if (req.body.data.attachments[0].uploadfile != '' && req.body.data.attachments[0].uploadfile != null) {
							console.log("not equal to null")
							var data = req.body.data.attachments[0].uploadfile.split(',')[1];
							var filename = "Close_"+req.body.data.comp_ticketno;
							var path = '/glits/web/code/nodejs/apsflbss_web/uploads/';
							var buf = Buffer.from(data, 'base64');
							console.log("path", path);
							console.log("buf", buf);
							const base64ToImage = (buf, path, filename) => {
								fs.writeFile(path + filename, buf, 'binary', function (err, result) {
									if (err) {
										return (err, "not uploaded");
									} else {
										console.log("err", err, "result", result);
										return (err, result);
									}
								});
							}
							base64ToImage(buf, path, filename);
						} else {
							console.log("equal to null")
						}
						df.formatSucessAppRes(req, res, "Complaint updated Sucessfully", cntxtDtls, fnm, {});
					}
				}).catch(function (error) {
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				});
		}).catch((error) => {
			console.log("came in dtls catch error", error);
			df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
}


/**************************************************************************************
* Controller     : occgetinsrtnewcmplntCtrl
* Parameters     : None
* Description    : 
* Change History :
* 02/11/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.occgetinsrtnewcmplntCtrl = (req, res) => {
    var fnm = "getcstmrupdtdtlsappCtrl";
    sbscrAppmdl.occgetinsrtnewcmplntMdl(req.user)
        .then((results) => {
				console.log("results in dtls", results);
			if(results.length > 0){
				var com_sts ;
				if(results.comp_status == 0){
					com_sts = "open"
				}
				results[0]['com_sts']=com_sts;
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				df.formatAppInvalidParamsErrorRes(req, res, "no data", cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in dtls catch error",error);
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : OCCgetAddOnpackagesCtrl
* Parameters     : None
* Description    : 
* Change History :
* 01/11/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.OCCgetAddOnpackagesCtrl = (req, res) => {
    var fnm = "getcstmrupdtdtlsappCtrl";
	console.log("req",req.body);
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
    sbscrAppmdl.OCCgetAddOnpackagesMdl()
        .then((results) => {
				//console.log("results in dtls", results);
			if(results.length > 1){
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in dtls catch error");
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : occgetcafinsrtnewcmplntCtrl
* Parameters     : None
* Description    : 
* Change History :
* 02/11/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.occgetcafinsrtnewcmplntCtrl = (req, res) => {
	var fnm = "getcstmrupdtdtlsappCtrl";
	sbscrAppmdl.occgetcafinsrtnewcmplntMdl(req.params.cafId,req.user)
		.then((results) => {
			//console.log("results in dtls", results);
			if (results.length > 0) {
				var com_sts;
				if (results.comp_status == 0) {
					com_sts = "open"
				}
				results[0]['com_sts'] = com_sts;
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
		}).catch((error) => {
			console.log("came in dtls catch error");
			df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
}


/**************************************************************************************
* Controller     : getcafcstmrinvcepckgeswebCtrl
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 02-11-2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getcafcstmrinvcepckgeswebCtrl = function (req, res) {
	console.log("in voip req.params",req.params);
	var check;
    sbscrAppmdl.getcstmrmnthwiseinvcepckgesappMdl(req.params.caf_id, req.params.year, req.params.month)
        .then(function (results) {
			console.log("results", results);
			 if (results && results.length == 0) {
				let error = "No Data Avilable For Caf Id : "+req.params.caf_id;
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: error });
			} else { 
				sbscrAppmdl.getcstmrinvceaddonsdtlspckgefrappMdl(results[0].caf_invce_id, req.params.year, req.params.month)
        		.then(function (result) {
					console.log("result", result)
					//let options = { format: 'A4' };
					let options = { 
						format: 'A4', 
						orientation: "portrait"
					};
					var cpe_chrge=[];
					var lcl_chrge=[];
					var isd_chrge=[];
					var std_chrge=[];
					var base_chrge=[];
					var base_chrges=[];
					var addon_chrge=[];
					results.forEach((s) => {
						if(s['chrge_cde_dscn_tx']=='CPE CHARGES' ){
							cpe_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='Local Phone Usage Chargese'){
							lcl_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='ISD Phone Usage Charges'){
							isd_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='STD Phone Usage Charges'){
							std_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='Service Rental Charges' && s['pckage_type_nm']=='Base'){
							base_chrges.push(
								s
							)
						} 
					})
					result.forEach((s) => {
						if (s['chrge_cde_dscn_tx']=='Service Rental Charges' && s['pckage_type_nm']=='Base'){
							base_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='Service Rental Charges' && s['pckage_type_nm']=='AddOn'){
							addon_chrge.push(
								s
							)
						}
					})
					var addonchrge = 0 ;
					for ( let i=0; i<addon_chrge.length; i++){
						addonchrge = + addonchrge + parseFloat(addon_chrge[i]['chrge_at'], 2)
					}
					var addonchrgetx = 0;
					for ( let i=0; i<addon_chrge.length; i++){
						addonchrgetx = + addonchrgetx + parseFloat(addon_chrge[i]['tl_at'], 2)
					}
					console.log("inputs of cpe_chrge : ",cpe_chrge);
					console.log("inputs of lcl_chrge : ",lcl_chrge);
					console.log("inputs of isd_chrge : ",isd_chrge);
					console.log("inputs of std_chrge : ",std_chrge);
					console.log("inputs of base_chrge : ",base_chrge);
					console.log("inputs of addon_chrge : ",addon_chrge);
					console.log("inputs of addonchrge : ",addonchrge);
					if (std_chrge[0] != null && isd_chrge[0] != null && lcl_chrge[0] != null) {
						var landlineChrge = parseFloat(lcl_chrge[0].chrge_at, 2) + parseFloat(isd_chrge[0].chrge_at, 2) + parseFloat(std_chrge[0].chrge_at, 2);
						console.log("landlineChrge",landlineChrge)
					} else {
						var landlineChrge = 0;
					}
					let cafdata = results;
					pdfgeneration.generateinvcePdf(cafdata,landlineChrge,cpe_chrge,lcl_chrge,isd_chrge,std_chrge,base_chrge,base_chrges,addon_chrge,addonchrge.toFixed(2),addonchrgetx.toFixed(2), req.body, function (err, results) {
							//console.log("error or results", err, results);
							let file_nm = "invoice";
							
							pdf.create(results, options).toStream( function (err, data) {
								if (err) {
									console.log(err)
									return(err,data)
								}
								if (data) {
									var file = fs.createReadStream(data.path);
									var stat = fs.statSync(data.path);
									res.setHeader('Content-Length', stat.size);
									res.setHeader('Content-Type', 'application/pdf');
									res.setHeader('Content-Disposition', 'attachment; filename='+req.params.caf_id+'.pdf');
									file.pipe(res);
								}
							})					
						})	
				})				
            }
        }).catch(function (error) {
			console.log("error", error);
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
        });
}

/**************************************************************************************
* Controller     : OCCgetcmplntdtlsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 06/11/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.OCCgetcmplntdtlsCtrl = (req, res) => {
    var fnm = "OCCgetcmplntdtlsCtrl";

    sbscrAppmdl.OCCgetcmplntdtlsMdl(req.params.caf_id, req.params.ticket_nm, req.user)
        .then((results) => {
				console.log("results in dtls", results);
			if(results.length > 0){
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				let error = "No Result";
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in dtls catch error");
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : OCCpostcmplntdtlsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 06/11/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.OCCpostcmplntdtlsCtrl = (req, res) => {
    var fnm = "OCCpostcmplntdtlsCtrl";

    sbscrAppmdl.OCCpostcmplntdtlsMdl(req.body, req.user)
        .then((results) => {
				console.log("results in dtls", results);
			if(results.length > 0){
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch((error) => {
			console.log("came in dtls catch error");
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : countCafPckgsfrmAppCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.countCafPckgsfrmAppCtrl = function (req, res) {
	console.log("req.body", req.body);
	sbscrAppmdl.countCafPckgsfrmAppMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : OCCIssueCstmrSubTypCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 09/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueCstmrSubTypCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueCstmrSubTypMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueAssgnCatCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 12/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueAssgnCatCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueAssgnCatMdl(req.body.data,req.user)
        .then(function (results) {
			sbscrAppmdl.getcmplntforlogsappMdl(req.body.data, req.user).then((response) => {
				sbscrAppmdl.insrtcmplntlogappMdl(response[0], req.user).then((rspnse) => {
					df.formatSucessAppRes(req, res, "Complaint Inserted Sucessfully", cntxtDtls, '', {});
				})
			})
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueByCatgryCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueByCatgryCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueByCatgryMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : OCCIssueByCatgryOpenCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueByCatgryOpenCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueByCatgryOpenMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueByCatgryCloseCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueByCatgryCloseCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueByCatgryCloseMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueByCatgryResolveCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueByCatgryResolveCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueByCatgryResolveMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueCountByCatgryResolveCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueCountByCatgryResolveCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueCountByCatgryResolveMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueTicktCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 16/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueTicktCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueTicktMdl(req.params.ticketid,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : CheckZipFileCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.CheckZipFileCtrl = function (req, res) {

	console.log("in voip req.params",req.params);
	var check;
    sbscrAppmdl.getcstmrmnthwiseinvcepckgesappMdl(req.params.caf_id, req.params.year, req.params.month)
        .then(function (results) {
			console.log("results", results);
			 if (results && results.length == 0) {
				let error = "No Data Avilable For Caf Id : "+req.params.caf_id;
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: error });
			} else { 
				sbscrAppmdl.getcstmrinvceaddonsdtlspckgefrappMdl(results[0].caf_invce_id, req.params.year, req.params.month)
        		.then(function (result) {
					console.log("result", result)
					//let options = { format: 'A4' };
					let options = { 
						format: 'A4', 
						orientation: "portrait"
					};
					var cpe_chrge=[];
					var lcl_chrge=[];
					var isd_chrge=[];
					var std_chrge=[];
					var base_chrge=[];
					var base_chrges=[];
					var addon_chrge=[];
					results.forEach((s) => {
						if(s['chrge_cde_dscn_tx']=='CPE CHARGES' ){
							cpe_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='Local Phone Usage Chargese'){
							lcl_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='ISD Phone Usage Charges'){
							isd_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='STD Phone Usage Charges'){
							std_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='Service Rental Charges' && s['pckage_type_nm']=='Base'){
							base_chrges.push(
								s
							)
						} 
					})
					result.forEach((s) => {
						if (s['chrge_cde_dscn_tx']=='Service Rental Charges' && s['pckage_type_nm']=='Base'){
							base_chrge.push(
								s
							)
						} else if (s['chrge_cde_dscn_tx']=='Service Rental Charges' && s['pckage_type_nm']=='AddOn'){
							addon_chrge.push(
								s
							)
						}
					})
					var addonchrge = 0 ;
					for ( let i=0; i<addon_chrge.length; i++){
						addonchrge = + addonchrge + parseFloat(addon_chrge[i]['chrge_at'], 2)
					}
					var addonchrgetx = 0;
					for ( let i=0; i<addon_chrge.length; i++){
						addonchrgetx = + addonchrgetx + parseFloat(addon_chrge[i]['tl_at'], 2)
					}
					console.log("inputs of cpe_chrge : ",cpe_chrge);
					console.log("inputs of lcl_chrge : ",lcl_chrge);
					console.log("inputs of isd_chrge : ",isd_chrge);
					console.log("inputs of std_chrge : ",std_chrge);
					console.log("inputs of base_chrge : ",base_chrge);
					console.log("inputs of addon_chrge : ",addon_chrge);
					console.log("inputs of addonchrge : ",addonchrge);
					if (std_chrge[0] != null && isd_chrge[0] != null && lcl_chrge[0] != null) {
						var landlineChrge = parseFloat(lcl_chrge[0].chrge_at, 2) + parseFloat(isd_chrge[0].chrge_at, 2) + parseFloat(std_chrge[0].chrge_at, 2);
						console.log("landlineChrge",landlineChrge)
					} else {
						var landlineChrge = 0;
					}
					let cafdata = results;
					pdfgeneration.generatezipinvcePdf(cafdata,landlineChrge,cpe_chrge,lcl_chrge,isd_chrge,std_chrge,base_chrge,base_chrges,addon_chrge,addonchrge.toFixed(2),addonchrgetx.toFixed(2), req.body, function (err, results) {
							//console.log("error or results", err, results);
							let file_nm = "invoice";
							
							pdf.create(results, options).toStream( function (err, data) {
								if (err) {
									console.log(err)
									return(err,data)
								}
								if (data) {
									var file = fs.createReadStream(data.path);
									var stat = fs.statSync(data.path);
									res.setHeader('Content-Length', stat.size);
									res.setHeader('Content-Type', 'application/pdf');
									res.setHeader('Content-Disposition', 'attachment; filename='+req.params.caf_id+'.pdf');
									file.pipe(res);
								}
							})					
						})	
				})				
            }
        }).catch(function (error) {
			console.log("error", error);
            df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
        });
}


/**************************************************************************************
* Controller     : OccUploadFileCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OccUploadFileCtrl = function (req, res) {

  var data = req.body.base64image.split(',')[1];
  var filename = req.body.imagename;
  //var path = df.getModuleMetaData(__dirname, '/uploads');
  //var check = require(appRoot+'/uploads/');
  var path =  './home/';
  var buf = Buffer.from(data, 'base64');
  console.log("path",path);
  //console.log("check",check);
  console.log("buf",buf);
    const base64ToImage = (buf, path, filename) => {       
        fs.writeFile(path + filename, buf, 'binary', function (err, result) {
            if (err) {
                res.send({ status: false, err: err });
            } else {
                res.json({ status: true, msg: "image uploaded" });
				console.log("err", err,"result", result);
                return(err, result);
            }
        });
    }
    base64ToImage(buf, path, filename);
}

/**************************************************************************************
* Controller     : OCCIssueCountByCatgrytypCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 24/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueCountByCatgrytypCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueCountByCatgrytypMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueCatgrygenralenqryCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueCatgrygenralenqryCtrl = function (req, res) {
	console.log("user",req.user);
	//console.log("req",req);
	if(req.body.data.ticket_type==1){
		ticketNo = 'GE'+Math.floor(Math.random() * 999999);
	} else if(req.body.data.ticket_type==2) {
		ticketNo = 'CD'+Math.floor(Math.random() * 999999);
	} else if (req.body.data.ticket_type == 3) {
		ticketNo = 'PAT' + Math.floor(Math.random() * 999999);
	} else if (req.body.data.ticket_type == 4) {
		ticketNo = 'POL' + Math.floor(Math.random() * 999999);
	}
    sbscrAppmdl.OCCIssueCatgrygenralenqryMdl(req.body.data,ticketNo,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueDstrtMngrCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueDstrtMngrCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueDstrtMngrMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssueCstmrTypCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 09/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueCstmrTypCtrl = function (req, res) {

	sbscrAppmdl.OCCIssueCstmrTypMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : OCCIssueDstrtMngrIdCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueDstrtMngrIdCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueDstrtMngrIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : OCCIssuegetGnrlenqryCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssuegetGnrlenqryCtrl = function (req, res) {

    sbscrAppmdl.OCCIssuegetGnrlenqrymdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : selefAsgnTcktsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.selefAsgnTcktsCtrl = function (req, res) {

    sbscrAppmdl.selefAsgnTcktsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : selefAsgnTcktsCntCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.selefAsgnTcktsCntCtrl = function (req, res) {

    sbscrAppmdl.selefAsgnTcktsCntMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : toggleButtonResCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 08/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.toggleButtonResCtrl = function (req, res) {
	console.log("req.body", req.body);
    sbscrAppmdl.toggleButtonResMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : toggleButtonValueCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 09/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.toggleButtonValueCtrl = function (req, res) {
	console.log("req.body", req.body);
    sbscrAppmdl.toggleButtonValueMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : sprtTicktCafDtlsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 09/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.sprtTicktCafDtlsCtrl = function (req, res) {
	console.log("req.body", req.body);
    sbscrAppmdl.sprtTicktCafDtlsMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insertCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/12/2021    -  Durga  - Initial Function
*
***************************************************************************************/

exports.insertsubalacartedataCtrl = function (req, res) {
	console.log("req", req.body);
	sbscrAppmdl.insertsubalacarteMdl(req.body, req.user)
		.then(function (results) {
			df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : insertCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/12/2021    -  Durga  - Initial Function
*
***************************************************************************************/
exports.updatealacartedataCtrl = function (req, res) {
	console.log("req", req.body);
	sbscrAppmdl.updatealacartedataMdl(req.body, req.user)
		.then(function (results) {
			df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : addCafPckgs
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 14/12/2021    -   - Initial Function
*
***************************************************************************************/

exports.addCafPckgsfrmAppCtrl = function (req, res) {
	var fnm = "addIptvCafPckgs";
	let extrnl_api_srvc_pack_lst = [];
	log.info(`In ${fnm}`, 0, cntxtDtls);
	console.log("req", req.user)
	sbscrAppmdl.getpackgedatafrapp(req.body)
		.then(function (results) {
			console.log("results", results);
			results.forEach((k) => {
				extrnl_api_srvc_pack_lst.push({
					'servicepack': k.pckge_nm,
					'expirydate': k.extrnl_api_expry_dt
				});
			});
			console.log("extrnl_api_srvc_pack_lst", extrnl_api_srvc_pack_lst)
			const extrnl_api_post_json = {
				'subscribercode': req.body.mdlw_sbscr_id,
				'servicepacks': extrnl_api_srvc_pack_lst
			};
			console.log("extrnl_api_post_json", extrnl_api_post_json)

			let pckgCalls = cafBO.addPckgCalls(extrnl_api_post_json, req.user)
			console.log("pckgcalls", JSON.stringify(pckgCalls));
			// console.log(req.body.data.pckg_lst);

			extApiCtrl.callApinew("ADD SERVICE PACK", 1, 13, req.body.caf_id, pckgCalls, req.user).then((api_rpsnse) => {
				console.log("---------------api response -------------------")
				console.log(api_rpsnse);
				if (api_rpsnse && api_rpsnse.res) {
					if (api_rpsnse.res.responseStatus['statusCode'] == "202") {
						sbscrAppmdl.addCafcheckInsrtPckgsMdl(req.body, results, req.user)
							.then((datas) => {
								if(datas.length == 0){
								sbscrAppmdl.addCafInsrtPckgsMdl(results, req.body.caf_id, req.body.Type, req.body.mnthval, req.user)
									.then((result) => {
										console.log("result", result);
										sbscrAppmdl.cafdatafrsms(req.body.caf_id, req.body.package_ids, req.user)
											.then((cafRes) => {
												 var msgs = `Dear+Customer,+New+IPTV+Addon+Package+${cafRes[0].packname}+is+added+to+your+account+succesfully`;
												 if(cafRes[0].mbl_nu != null){
												 	sms_srvc.newsendNotifySMS(cafRes[0].mbl_nu, msgs,  function (err, res) {
												 		if (err) { console.log(err); }
												 		else { console.log('sms sent'); }
												 	},'1107161779023829771')
												 }
												df.formatSucessAppRes(req, res, result, cntxtDtls, fnm, {});
											}).catch((error) => {
												if(count == MWHSI.length)
														df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to send SMS" });
											});
									}).catch((error) => {
										sbscrAppmdl.addCaffailedInsrtPckgsMdl("ADD SERVICE PACK", results, req.body, extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
											.then((result) => {
												console.log("result", result);
												df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
											})

									});
								} else {
									let error = "package already exits";
									df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: " packages are added." });
								}
								
						})
					}
					else {
						sbscrAppmdl.addCaffailedInsrtPckgsMdl("ADD SERVICE PACK", results, req.body, extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
							.then((result) => {
								console.log("result", result);
								df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
							})
					}
				}
				else {
					sbscrAppmdl.addCaffailedInsrtPckgsMdl("ADD SERVICE PACK", results, req.body, extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
						.then((result) => {
							console.log("result", result);
							df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
						})

				}
			}).catch((err) => {
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
			});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : addCafPckgs
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 14/12/2021    -   - Initial Function
*
***************************************************************************************/

exports.testaddCafPckgsfrmAppCtrl = function (req, res) {
	var count = 0;
	console.log("req.body",req.body);
	console.log(req.body.cat_id.length)
	if(req.body.cat_id.length > 1){
		var items = req.body.cat_id.split(',');
		var MWHSI = items.filter((e, i, a) => a.indexOf(e) === i);
	} else {
		var MWHSI = req.body.cat_id;
	}
	
	
	console.log("check items", MWHSI)
	for (let i = 0; i < MWHSI.length; i++) {
		
		if (MWHSI[i] == 2) {
			
			console.log("2");
			var fnm = "addIptvCafPckgs";
			let extrnl_api_srvc_pack_lst = [];
			let pack_name_add = [];
			let pack_id_add = [];
			log.info(`In ${fnm}`, 0, cntxtDtls);
			console.log("req", req.user)
			sbscrAppmdl.getpackgedatafrapp(req.body)
				.then(async function (results) {
					console.log("results", results);
					results.forEach((k) => {
						extrnl_api_srvc_pack_lst.push({
							'servicepack': k.pckge_nm,
							'expirydate': k.extrnl_api_expry_dt
						});
					});
					for(i=0;i<results.length;i++){
						pack_name_add.push(results[i].pckge_nm)
					}
					for(i=0;i<results.length;i++){
						pack_id_add.push(results[i].pckge_id)
					}
					console.log("pack_name_add",pack_name_add)
					console.log("extrnl_api_srvc_pack_lst", extrnl_api_srvc_pack_lst)
					const extrnl_api_post_json = {
						'subscribercode': req.body.mdlw_sbscr_id,
						'servicepacks': extrnl_api_srvc_pack_lst
					};
					console.log("extrnl_api_post_json", extrnl_api_post_json)

					let pckgCalls = cafBO.addPckgCalls(extrnl_api_post_json, req.user)
					console.log("pckgcalls", JSON.stringify(pckgCalls));
					// console.log(req.body.data.pckg_lst);
					
					extApiCtrl.callApinew("ADD SERVICE PACK", 1, 13, req.body.caf_id, pckgCalls, req.user).then((api_rpsnse) => {
						console.log("---------------api response -------------------")
						console.log(api_rpsnse);
						if (api_rpsnse && api_rpsnse.res) {
							if (api_rpsnse.res.responseStatus['statusCode'] == "202") {
								sbscrAppmdl.addCafcheckInsrtPckgsMdl(req.body, results, req.user)
									.then((datas) => {
										if (datas.length == 0) {
											sbscrAppmdl.addCafInsrtPckgsMdl(results, req.body.caf_id, req.body.Type, req.body.mnthval, req.user)
												.then((result) => {
													console.log("result", result);
													count++;
													sbscrAppmdl.cafdatafrsms(req.body.caf_id, req.body.package_ids, req.user)
														.then((cafRes) => {
															console.log("cafres",cafRes[0]);
															console.log("cafres",cafRes[0].packname);
															// var msgs = `Dear+Customer,+New+IPTV+Addon+Package+${cafRes[0].packname}+is+added+to+your+account+succesfully`;
															// 	sms_srvc.newsendNotifySMS(cafRes[0].mbl_nu, msgs,  function (err, res) {
															// 		if (err) { console.log(err); }
															// 		else { console.log('sms sent'); }
															// 	},'1107161779023829771')
															console.log("count == MWHSI.length in channel addon",count == MWHSI.length," count : ", count , " MWHSI.length : ",  MWHSI.length);
															if(count == MWHSI.length)
															df.formatSucessAppRes(req, res, result, cntxtDtls, fnm, {});
														}).catch((error) => {
															if(count == MWHSI.length)
																	df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to send SMS" });
														});
												}).catch((error) => {
													sbscrAppmdl.addCaffailedInsrtAddOnPckgsMdl("ADD SERVICE PACK", pack_id_add, "2", results, req.body, extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
														.then((result) => {
															console.log("result", result);
															count++;
															if(count == MWHSI.length)
															df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
														})

												});
										} else {
											let error = "package already exits";
											count++;
											if(count == MWHSI.length)
											df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: " packages are added." });
										}

									})
							}
							else {
								sbscrAppmdl.addCaffailedInsrtAddOnPckgsMdl("ADD SERVICE PACK", pack_id_add, "2", results, req.body, extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
									.then((result) => {
										console.log("result", result);
										count++;
										if(count == MWHSI.length)
										df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
									})
							}
						}
						else {
							sbscrAppmdl.addCaffailedInsrtAddOnPckgsMdl("ADD SERVICE PACK", pack_id_add, "2", results, req.body, extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
								.then((result) => {
									console.log("result", result);
									count++;
									if(count == MWHSI.length)
									df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
								})

						}
					}).catch((err) => {
						count++;
						sbscrAppmdl.addCaffailedInsrtAddOnPckgsMdl("ADD SERVICE PACK", pack_id_add, "2", results, req.body, extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
							.then((result) => {
								console.log("result", result);
								count++;
								if(count == MWHSI.length)
								df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
							})
					});
				}).catch(function (error) {
					sbscrAppmdl.addCaffailedInsrtAddOnPckgsMdl("ADD SERVICE PACK", pack_id_add, "2", results, req.body, extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
						.then((result) => {
							console.log("result", result);
							count++;
							if(count == MWHSI.length)
							df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
						})
				});
		} else if (MWHSI[i] == 3) {
			
			console.log("3");
			var fnm = "addHSIaddonCafPckgs";
			log.info(`In ${fnm}`, 0, cntxtDtls);
			sbscrAppmdl.getaddonhsiCafDtaMdl(req.body, req.user)
				.then(async (pckg_lst) => {
					sbscrAppmdl.getCafDtaMdl(req.body.caf_id, req.user)
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
							sbscrAppmdl.getCafPckageMdl(req.body.caf_id, req.user)
								.then((packRes) => {
									console.log('package Repsonse _____________');
									console.log(packRes);
									
									sbscrAppmdl.getCstmrMnthlyHsiPckgeDtlsMdl(req.body.caf_id, req.user)
										.then((mnthHsipackRes) => {
											if(mnthHsipackRes.length>0){
											var usage_varience = ((Number(mnthHsipackRes[0].ttl_upld_ct) + Number(mnthHsipackRes[0].ttl_dwnld_ct)) / 1024 / 1024 / 1024) - Number(mnthHsipackRes[0].mnth_usge_lmt_ct);
											if (usage_varience > 0) {
												var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + usage_varience + Number(pckg_lst[0].vle_tx);
											} else {
												var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + Number(pckg_lst[0].vle_tx);
											}
											let fnlHsiPckgeData = {
												caf_id: cafRes[0].caf_id,
												pckg_lst: pckg_lst,
												caf_type_id: cafRes[0].caf_type_id,
												aaa_cd: cafRes[0].aaa_cd,
												crnt_pln_id: cafRes[0].pckge_id,
												crnt_cstmr_pckg: packRes[0].srvcpk_nm.split(',')[1],
												add_on_hsi_pckg: pckg_lst[0].vle_tx,
												prsnt_hsi_pckge: mnthHsipackRes[0].mnth_usge_lmt_ct,
												aaa_prfl_nm: cafRes[0].hsi_orgnl_prfle_tx,
												nw_hsi_pckge: new_mnth_usge_lmt_ct
											};
											console.log('fnlHsiPckgeData ___________________ ');
											console.log(fnlHsiPckgeData);
											
											let apiCalls = addOnBo.hsiAddOnCalls(aaaData)
											apiMstrCtrl.insrt_Requestnew("Add Ons", 1, 13, fnlHsiPckgeData.caf_id, req.user).then((reqId) => {
												apiMstrCtrl.insrt_api_cls_new(reqId, apiCalls, fnlHsiPckgeData.caf_id).then((insClRes) => {
													apiMstrCtrl.get_apiCls(reqId, req.user).then((extApiCalls) => {
														console.log(extApiCalls)
														aaaApi.updatePrflInAaa(reqId, extApiCalls[0].calls, fnlHsiPckgeData.caf_id, aaaData, (err, data) => {
														if (!err) {
														sbscrAppmdl.addHsiCafPckgsMdl(fnlHsiPckgeData, req.user)
															.then((results) => {
																//subscribeHsiAdon(pckg_lst);
																sbscrAppmdl.addCafHsiMnthPckgsMdl(fnlHsiPckgeData, req.user)
																	.then((cafhsires) => {
																		sbscrAppmdl.updateBatchCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
																			.then((batchCafRes) => {
																				sbscrAppmdl.updateOnlineCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
																					.then((onlineCafRes) => {
																						sbscrAppmdl.addHsiToThrldMdl(fnlHsiPckgeData, req.user)
																							.then((cafFnlres) => {
																								operationsUtils.record('addon_hsi_prchs_ct');
																								// var msgs = `Dear+Customer,+New+HSI+Addon+Package+${fnlHsiPckgeData.package_name}+is+added+to+your+account+succesfully`;
																								// sms_srvc.newsendNotifySMS(cafRes[0].mbl_nu, msgs,  function (err, res) {
																								// 	if (err) { console.log(err); }
																								// 	else { console.log('sms sent'); }
																								// },'1107161779020984336')
																								count++;
																								console.log("count == MWHSI.length in HSI addon",count == MWHSI.length," count : ", count , " MWHSI.length : ",  MWHSI.length);
																								if(count == MWHSI.length)
																								df.formatSucessAppRes(req, res, cafFnlres, cntxtDtls, fnm, {});
																							}).catch((error) => {
																								sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
																								console.log("Error in hsi addon ", error)
																								count++;
																								if(count == MWHSI.length)
																								df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." })

																							});
																						// df.formatSucessRes(req, res, cafhsires, cntxtDtls, fnm, {});
																					}).catch((error) => {
																						sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
																						count++;
																						if(count == MWHSI.length)
																						df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
																					});
																			}).catch((error) => {
																				sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
																				count++;
																				if(count == MWHSI.length)
																				df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
																			});
																	}).catch((error) => {
																		sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
																		count++;
																		if(count == MWHSI.length)
																		df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
																	});
																// df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
															}).catch((error) => {
																sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
																count++;
																if(count == MWHSI.length)
																df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
															});
														} else {
															sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
															df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "404", err_message: err });
															console.log(err);
														 }
														 })
													}).catch((error) => {
														sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
														count++;
														console.log(error)
														if(count == MWHSI.length)
														df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "405", err_message: error });
													});
												}).catch((error) => {
													sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
													count++;
													console.log(error)
													if(count == MWHSI.length)
													df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "406", err_message: error });
												});
											}).catch((error) => {
												sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
												count++;
												console.log(error)
												if(count == MWHSI.length)
												df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "407", err_message: error });
											});
										} else {
											sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
												.then((result) => {
													console.log("result", result);
												})
											count++;
											error = "no HSI data avilable in BSS_BATCH"
											if(count == MWHSI.length)
											df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "408", err_message: error });
										}
										}).catch((error) => {
											sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
											count++;
											console.log(error)
											if(count == MWHSI.length)
											df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "408", err_message: error });
										});
								}).catch((error) => {
									sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
									count++;
									console.log(error)
									if(count == MWHSI.length)
									df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "409", err_message: error });
								});
						}).catch((error) => {
							sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, pckg_lst[0], 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
							count++;
							console.log(error)
							if(count == MWHSI.length)
							df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "403", err_message: error });
						});
				}).catch((error) => {
					sbscrAppmdl.addCaffailedHsiInsrtPckgsMdl("ADD HSI ADD ON PACK", req.body, req.body, 3, req.user)
																									.then((result) => {
																										console.log("result", result);
																									})
					count++;
					console.log(error)
					if(count == MWHSI.length)
					df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "402", err_message: error });
				});
		}
	}
}



/**************************************************************************************
* Controller     : insertCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/01/2022    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.checksubalacartedataCtrl = function (req, res) {
	console.log("req", req.body);
		sbscrAppmdl.checksubalacartecafplandataMdl(req.body, req.user).then(function (data) {
		sbscrAppmdl.checksubalacarteplanindataMdl(req.body, data[0], req.user).then(function (results) {
			if (results.length == 0) {
				sbscrAppmdl.checksubalacartedataMdl(req.body, req.user)
					.then(function (results) {
						if(results.length == 0){
							df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
						} else {
							let error = "Already Package Exists in App"
							df.formatAppNewInvalidParamsErrorMwRes(req, res, error, cntxtDtls, '', {});
						}
						
					}).catch(function (error) {
						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
					});
				} else {
							let error = "Already Package Exists in Plan"
							df.formatAppNewInvalidParamsErrorMwRes(req, res, error, cntxtDtls, '', {});
						}
	
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});

	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});

}

/**************************************************************************************
* Controller     : updatesbscrPassCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/01/2022   -  ramesh  - Initial Function
*
***************************************************************************************/

exports.updatesbscrPassCtrl = function (req, res) {
	
	sbscrAppmdl.updatesbscrPassMdl(req.params.caf_id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}


/**************************************************************************************
* Controller     : removeCafPckgsfrmAppCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 10/01/2022    -   - Initial Function
*
***************************************************************************************/

exports.removeCafPckgsfrmAppCtrl = function (req, res) {
	var fnm = "removeAddons";
	log.info(`In ${fnm}`, 0, cntxtDtls);
	sbscrAppmdl.getpackgedataremvlfrapp()
		.then(function (result) {
			if(result.length > 0){
			console.log("results", result);
			for (let i = 0; i < result.length; i++) {
				sbscrAppmdl.getpackgedatafrremvlfrmMWapp(result[i])
					.then(function (results) {
						console.log("result[i]", result[i])
						let extrnl_api_srvc_pack_lst = [];
						results.forEach((k) => {
							extrnl_api_srvc_pack_lst.push({
								'servicepack': k.pckge_nm,
								'expirydate': k.extrnl_api_expry_dt
							});
						});
						console.log("extrnl_api_srvc_pack_lst", extrnl_api_srvc_pack_lst)
						const extrnl_api_post_json = {
							'subscribercode': result[i].mdlw_sbscr_id,
							'servicepacks': extrnl_api_srvc_pack_lst
						};
						console.log("extrnl_api_post_json", extrnl_api_post_json)
						let pckgCalls = cafBO.removePckgCalls(extrnl_api_post_json, req.user)
						console.log(JSON.stringify(pckgCalls))
						extApiCtrl.callApinew("REMOVE SERVICE PACK", 1, 13, result[i].caf_id, pckgCalls, req.user).then((api_rpsnse) => {
							console.log(api_rpsnse);
							if (api_rpsnse && api_rpsnse.res) {
								if (api_rpsnse.res.responseStatus['statusCode'] == "202" || api_rpsnse.res.responseStatus['statusCode'] == "914") {
									sbscrAppmdl.removeAddonsMdl(result[i], req.user, result[i].caf_id)
										.then((results) => {
											console.log(results);
											//unsubscribeChannel(req.body.data.pckg_lst);
											if (i == result.length - 1)
												df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
										}).catch((error) => {
											sbscrAppmdl.addCaffailedInsrtPckgsMdl("REMOVE SERVICE PACK", results, result[i], extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
												.then((result) => {
													console.log("result", result);
												})
											if (i == result.length - 1)
												df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
										});
								}
								else {
									sbscrAppmdl.addCaffailedInsrtPckgsMdl("REMOVE SERVICE PACK", results, result[i], extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
										.then((result) => {
											console.log("result", result);
										})
									if (i == result.length - 1)
										df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "702", err_message: "Sorry, failed to remove Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
								}
							}
							else {
								sbscrAppmdl.addCaffailedInsrtPckgsMdl("REMOVE SERVICE PACK", results, result[i], extrnl_api_post_json, api_rpsnse.res.responseStatus, req.user)
									.then((result) => {
										console.log("result", result);
									})
								if (i == result.length - 1)
									df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "703", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
							}
						}).catch((err) => {
							if (i == result.length - 1)
								df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "704", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
						});
					})
			}
			} else {
				let err = "No records found";
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "200", err_message: "Sorry, no packages avilable." });
			}
		}).catch((err) => {
			if (i == result.length - 1)
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "200", err_message: "Sorry, no packages avilable." });
		});
}

/**************************************************************************************
* Controller     : retrackalacartepckgesCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  ramesh  - Initial Function
*
***************************************************************************************/

exports.retrackalacartepckgesCtrl = function (req, res) {
	let fnm = "retrackalacartepckgesCtrl";
	sbscrAppmdl.retrackalacartepckgesMdl()
		.then(function (resultss) {
			if (resultss && resultss.length > 0) {
				for (let i = 0; i < resultss.length; i++) {
					if (resultss[i].service_type == 'ADD SERVICE PACK') {
						sbscrAppmdl.getpackgedatafrremvlfrmMWapp(resultss[i])
							.then(function (results) {
								console.log("result[i]", results)
								let extrnl_api_srvc_pack_lst = [];
								results.forEach((k) => {
									extrnl_api_srvc_pack_lst.push({
										'servicepack': k.pckge_nm,
										'expirydate': k.extrnl_api_expry_dt
									});
								});
								console.log("extrnl_api_srvc_pack_lst", extrnl_api_srvc_pack_lst)
								const extrnl_api_post_json = {
									'subscribercode': resultss[i].mdlw_sbscr_id,
									'servicepacks': extrnl_api_srvc_pack_lst
								};
								console.log("extrnl_api_post_json", extrnl_api_post_json)
								let pckgCalls = cafBO.addPckgCalls(extrnl_api_post_json, req.user)
								console.log("pckgcalls", JSON.stringify(pckgCalls));
								extApiCtrl.callApinew("ADD SERVICE PACK", 1, 13, resultss[i].caf_id, pckgCalls, req.user).then((api_rpsnse) => {
									console.log("---------------api response -------------------")
									console.log(api_rpsnse);
									if (api_rpsnse && api_rpsnse.res) {
										if (api_rpsnse.res.responseStatus['statusCode'] == "202") {
											sbscrAppmdl.addCafInsrtPckgsMdl(results, resultss[i].caf_id, "Cronjob", resultss[i].months_val, req.user)
												.then((result) => {
													if(result){
														sbscrAppmdl.deleteretrkpckgsMdl(resultss[i], req.user)
															.then((result) => {
															if (i == resultss.length - 1)
																df.formatSucessAppRes(req, res, result, cntxtDtls, fnm, {});
															})
													}
													
												}).catch((error) => {
													if (i == resultss.length - 1)
													df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
												});
										}
										else {
											if (i == resultss.length - 1)
											df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
										}
									}
									else {
										if (i == resultss.length - 1)
										df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
									}
								}).catch((err) => {
									if (i == resultss.length - 1)
									df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
								});
							})
					} else if (resultss[i].service_type == 'REMOVE SERVICE PACK') {
						let pckgCalls = cafBO.removePckgCalls(resultss[i].ext_json, req.user)
						console.log("remove pckgCalls",JSON.stringify(pckgCalls))
						extApiCtrl.callApinew("REMOVE SERVICE PACK", 1, 13, resultss[i].caf_id, pckgCalls, req.user).then((api_rpsnse) => {
							console.log(api_rpsnse);
							if (api_rpsnse && api_rpsnse.res) {
								if (api_rpsnse.res.responseStatus['statusCode'] == "202" || api_rpsnse.res.responseStatus['statusCode'] == "914") {
									sbscrAppmdl.removeAddonsMdl(results[i], req.user, resultss[i].caf_id)
										.then((results) => {
											if(results){
												sbscrAppmdl.deleteretrkpckgsMdl(resultss[i], req.user)
													.then((result) => {
													if (i == resultss.length - 1)
														df.formatSucessAppRes(req, res, result, cntxtDtls, fnm, {});
													})
											}
										}).catch((error) => {
											if (i == resultss.length - 1)
												df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
										});
								}
								else {
									if (i == resultss.length - 1)
										df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "702", err_message: "Sorry, failed to remove Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
								}
							}
							else {
								if (i == resultss.length - 1)
									df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "703", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
							}
						}).catch((err) => {
							if (i == resultss.length - 1)
								df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "704", err_message: "Sorry, failed to remove Addons to CAF. Please try again." });
						});
					} else {
						if (i == resultss.length - 1){
						let error = "no data to remove";
						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
						}
					}
				}
			} else {
				let error = "No data to remove";
				df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "204", err_message: "Sorry, No data found" });
			}
		}).catch(function (error) {
			console.log("error",error);
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : insertaddsubemployeesCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 16/12/2021    -  Durga  - Initial Function
*
***************************************************************************************/

exports.insertaddsubemployeesCtrl = function (req, res) {
	console.log("req", req.body.data);
	sbscrAppmdl.subemployessMdl(req.body.data, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : getsubemployeesCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 16/12/2021    -  Durga  - Initial Function
*
***************************************************************************************/
exports.getsubemployeesCtrl = (req, res) => {
	var fnm = "getsubemployeesCtrl";

	sbscrAppmdl.getsubemployeesMdl(req.user)
		.then((results) => {
			console.log("results in dtls", results);
			if (results.length > 0) {
				df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				let error = "No Result";
				df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
		}).catch((error) => {
			console.log("came in dtls catch error");
			df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
}

/**************************************************************************************
* Controller     : reportsdateformatCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/1/2022   -  durga  - Initial Function
*
***************************************************************************************/

exports.reportsdateformatCtrl = function (req, res) {
	console.log("req.body", req.body)
	sbscrAppmdl.dateformatdataMdl(req.body.data, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : general enquire countCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/1/2022   -  Durga  - Initial Function
*
***************************************************************************************/
exports.generalenquirecountCtrl = function (req, res) {
	console.log("req.body", req.body);
	sbscrAppmdl.generalenquiredataMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : compstatus count countCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/1/2022   -  durga  - Initial Function
*
***************************************************************************************/

exports.compstatuscountCtrl = function (req, res) {

	sbscrAppmdl.compstatusMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : prvsthismnthtcktsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 12/01/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/

exports.prvsthismnthtcktsCtrl = function (req, res) {
	sbscrAppmdl.prvsthismnthtcktsMdl(req.params.id,req.params.cmpsts)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : prvsthisdaytcktsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 12/01/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/

exports.prvsthisdaytcktsCtrl = function (req, res) {
	sbscrAppmdl.prvsthisdaytcktsMdl(req.params.id,req.params.cmpsts)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : CalcntrIssueByCatgryCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.CalcntrIssueByCatgryCtrl = function (req, res) {

	sbscrAppmdl.CalcntrIssueByCatgryMdl(req.params.id, req.params.cmpsts, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : allDataCafPckgsfrmAppCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.allDataCafPckgsfrmAppCtrl = function (req, res) {
	console.log("req.body", req.body);
	sbscrAppmdl.allDataCafPckgsfrmAppMdl(req.params.id, req.params.nom, req.user)
		.then(function (results) {
			//console.log("result in allDataCafPckgsfrmAppCtrl",results);
			if(req.params.id == 1 &&  req.params.nom == 1){
				for(let i=0; i<results.length; i++){
					var service_pack = JSON.parse(results[i].ext_json).servicepacks
					var pck_names = [];
					var count =0
					service_pack.filter((k) => {
					pck_names += k.servicepack;
					if(count <= service_pack.length-2){
						pck_names += ',';
					}
					count++;
					console.log(pck_names)
					})
					results[i]['packs']=pck_names;
				}	
			}
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			console.log("error in allDataCafPckgsfrmAppCtrl",error);
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : DataCafPckgsfrmAppCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.DataCafPckgsfrmAppCtrl = function (req, res) {
	console.log("req.body", req.body);
	sbscrAppmdl.DataCafPckgsfrmAppMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : AmountfrAlacarteAppCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/01/2022    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.AmountfrAlacarteAppCtrl = function (req, res) {
	console.log("req.body", req.body);
	sbscrAppmdl.AmountfrAlacarteAppMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : countCafPckgsfrmAppCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.countCafPckgsfrmAppCtrl = function (req, res) {
	console.log("req.body", req.body);
	sbscrAppmdl.countCafPckgsfrmAppMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : sendmailtocstmrCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/01/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/

exports.sendmailtocstmrCtrl = function (req, res) {
	const mailOptions = {
		to: req.body.email, // list of receivers
		subject: 'APSFL UserName and Password' // Subject line
	};

	 console.log(mailOptions);
	// var count = 0;
	// The user subscribed to the newsletter.
	mailOptions.html = `<table cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td align="center" valign="top" width="640" class="m_9089412924928323771bodywrap"><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td><td width="600" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;text-align: center;padding: 20px 0 10px; border-bottom: 3px solid #3F51B5"> <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHqQ6I1ukGFqULN6f5m_GollEgpCExjqGumP9uXUkIejc_YsZ3' width="160" height="50" alt="APSFLs" border="0" class="CToWUd"></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" align="right" valign="middle" style="color:#3d3d3d;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;7px 0 12px;"><p> <span class="m_9089412924928323771mobileBlock"> <strong>Attention:</strong> Your account was created or modified. Retrieve your username and password. </span> </p></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><h3 style="color:#000000;font-family:'Segoe UI Light','Segoe UI',Arial,sans-serif;font-size:38px;font-weight:100;line-height:38px;margin-bottom:12px;padding:0" class="m_9089412924928323771h1Header"> Your account has been created or modified..</h3></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td><td width="600" align="left" valign="top" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:16px;padding:0 0 30px"><p> The following contains username and password.</p><p> Please note:</p><ul></ul><p> <strong>User Name: </strong> <a target="_blank">${req.body.agnt_Cd}</a> <br> <strong>Password: </strong> <a style="color:#000;text-decoration:none">${req.body.password}</a></p><p> Once you have successfully signed in with your username and password, you can change your password by following the instructions on the sign in page.</p><p> Go to the sign-in page, <a href="http://202.53.92.35/" style="color:#0044cc" target="_blank" data-saferedirecturl="http://202.53.92.35">http://202.53.92.35</a></p><p> Thank you for using APSFL.</p><p> Sincerely, <br>The APSFL Support Team</p></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:20px 0"><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0">&nbsp;</td><td width="460" colspan="2" align="left" valign="bottom" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;line-height:16px;padding:0" class="m_9089412924928323771mobileBlock"><p> This message was sent from an unmonitored e-mail address. Please do not reply to this message.<a href="" title="" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl=""></a><br> <a href="" title="Privacy" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl="">Privacy</a> | <a href="" title="Legal" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl="">Legal</a></p></td><td width="40" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0" class="m_9089412924928323771mobileHidden">&nbsp;</td><td width="100" align="left" valign="bottom" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;line-height:16px;padding:0" class="m_9089412924928323771mobileBlock"><p> <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHqQ6I1ukGFqULN6f5m_GollEgpCExjqGumP9uXUkIejc_YsZ3' width="100" height="22" alt="Smart Cards" border="0" class="CToWUd"></p></td><td width="20" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>`;

	mailUtls.mailSend(mailOptions, function (err, response) {
		console.log('err');
		if (err) {
		    console.log(err);
		} else if (response) {
		    console.log(response);
		    //return df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
		}
		console.log('response');
	})
}

/**************************************************************************************
* Controller     : updateaddemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 24/12/2021    -  Durga  - Initial Function
*
***************************************************************************************/
exports.updateaddsubemployeesCtrl = function (req, res) {
	console.log("req.body", req.body);
	sbscrAppmdl.updateaddemployeeMdl(req.body.data, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}
/**************************************************************************************
* Controller     : updateaddemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 24/12/2021    -  Durga  - Initial Function
*
***************************************************************************************/

exports.updateaddemployeeMdl = function(data, user,callback){
    console.log("success",data,user);
    var usrnm =``;
    var mrcntid = ``;
    if(data.employeename != '' && data.employeename != null && data.employeename != undefined){
        usrnm =`,complaint_sub_emp_name='${data.employeename}'`
    }
    if(data.mrcht_usr_id != '' && data.mrcht_usr_id != null && data.mrcht_usr_id != undefined){
        mrcntid =`,mrcht_usr_id='${data.mrcht_usr_id}'`
    }
    var QRY_TO_EXEC = `update complaint_sub_employees set complaint_owner_id=${data.owner_id} ${usrnm} ${mrcntid} where complaint_sub_emp_id=${data.emp_id}`;
     console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello");


}

/**************************************************************************************
* Controller     : FirstdayFirstShowCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 03/06/2023    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.FirstdayFirstShowCtrl = function (req, res) {

	sbscrAppmdl.FirstdayFirstShowMdl(req.params.id, req.params.nom, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : insertsladata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/12/2021    -  Durga  - Initial Function
*
***************************************************************************************/
exports.insertsladata = (req, res) => {

	console.log("req", req.body)

	sbscrAppmdl.sladataMdl(req.body.data, req.user)
		.then((results) => {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			console.log("came in dtls catch error", error);
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : getsladatainsertCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/01/2022    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getsladatainsertCtrl = (req, res) => {

	sbscrAppmdl.getsladatainsertMdl()
		.then((results) => {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			console.log("came in dtls catch error", error);
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : getsladataidinsertCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/01/2022    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getsladataidinsertCtrl = (req, res) => {

	sbscrAppmdl.getsladataidinsertMdl(req.params.id)
		.then((results) => {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			console.log("came in dtls catch error", error);
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : editslahourCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  durga  - Initial Function
*
***************************************************************************************/

exports.editslahoursCtrl = function (req, res) {
	console.log("req.body in sla hours edit", req.body)
	sbscrAppmdl.editslahoursMdl(req.body.data, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : DatagetsubemployeesCtrlCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 17/12/2021    -  Durga  - Initial Function
*
***************************************************************************************/

exports.getbysubemployeesdataCtrl = function (req, res) {

	sbscrAppmdl.getbysubemployeesMdl(req.params.id)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : getocccmplntdtlsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 19/01/2022   -durga - Initial Function
***************************************************************************************/
exports.getocccmplntdtlsCtrl = (req, res) => {

	sbscrAppmdl.getocccmplntdtlMdl(req.params.ticket_nm)
		.then((results) => {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			console.log("came in dtls catch error", error);
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : slaLvlOneCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/12/2021    -  ramesh  - Initial Function
*
***************************************************************************************/

exports.slaLvlOneCtrl = function (req, res) {
	sbscrAppmdl.slaLvlHrsfrmDbMdl()
		.then(async (result) => {
			sbscrAppmdl.slaLvlOneMdl()
				.then(async (results) => {
					for (let i = 0; i < results.length; i++) {
						await callBack(results[i], i, result, results.length, req, res);
					}
				}).catch(function (error) {
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

async function callBack(cafRecord, ind, hrs, totalSize, req, res) {
	var date = new Date();
	var count = 1;
	console.log("cafRecord.complaint_owner", cafRecord.complaint_owner);
	console.log("cafRecord.complaint_owner", cafRecord.comp_ticketno);
	if (cafRecord.complaint_owner == 1) {
		var i = 0
	} else {
		var i = 1
	}
	console.log("i", i)
	console.log(hrs[i].Escltn_lvl_one_time * 60)
	console.log(hrs[i].Escltn_lvl_two_time * 60)
	var seconds = cafRecord.created_date.getTime() / 1000;
	var lvlOneendseconds = seconds + hrs[i].Escltn_lvl_one_time * 60;
	var lvlTwoendseconds = seconds + hrs[i].Escltn_lvl_two_time * 60;
	console.log("hrs[i].Escltn_lvl_three_time", hrs[i].Escltn_lvl_three_time)
	if (hrs[i] && hrs[i].Escltn_lvl_three_time != null && hrs[i].Escltn_lvl_three_time != undefined && hrs[i].Escltn_lvl_three_time != 0) {
		var lvlThreeendseconds = seconds + hrs[i].Escltn_lvl_three_time * 60;
		console.log("lvlThreeendseconds", lvlThreeendseconds)
	}
	if (hrs[i] && hrs[i].Escltn_lvl_four_time != null && hrs[i].Escltn_lvl_four_time != undefined && hrs[i].Escltn_lvl_four_time != 0) {
		var lvlfourendseconds = seconds + hrs[i].Escltn_lvl_four_time * 60;
		console.log("lvlThreeendseconds", lvlfourendseconds)
	}
	var nowseconds = date.getTime() / 1000;
	console.log("time in seconds seconds", nowseconds);
	// console.log("time in seconds lvlOneendseconds", lvlOneendseconds);
	// console.log("time in seconds lvlTwoendseconds", lvlTwoendseconds);
	if (hrs[i].Escltn_lvl_four_time != null && hrs[i].Escltn_lvl_four_time != undefined && hrs[i].Escltn_lvl_four_time != 0) {
		console.log("level 4");
		if (nowseconds >= lvlfourendseconds) {
			console.log("came to level 4", cafRecord.comp_ticketno);
			sbscrAppmdl.slaLvlcheckMdl(4, cafRecord)
				.then(async (checkdata) => {
					if (checkdata.length == 0) {
						sbscrAppmdl.slaLvlEsclatonMdl("level 4 ", 4, cafRecord)
							.then(async (results) => {
								count++
								if (count == ind)
									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							}).catch(function (error) {
								count++
								if (count == ind)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					} else {
						if (count == ind) {
							let error = "no data found";
							df.formatSucessRes(req, res, error, cntxtDtls, '', {});
						}
					}
				})
		} else if (nowseconds >= lvlThreeendseconds) {
			console.log("came to level 3", cafRecord.comp_ticketno);
			sbscrAppmdl.slaLvlcheckMdl(3, cafRecord)
				.then(async (checkdata) => {
					if (checkdata.length == 0) {
						sbscrAppmdl.slaLvlEsclatonMdl("level 3 ", 3, cafRecord)
							.then(async (results) => {
								count++
								if (count == ind)
									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							}).catch(function (error) {
								count++
								if (count == ind)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					} else {
						if (count == ind) {
							let error = "no data found";
							df.formatSucessRes(req, res, error, cntxtDtls, '', {});
						}
					}
				})
		} else if (nowseconds >= lvlTwoendseconds) {
			console.log("came to level 2", cafRecord.comp_ticketno);
			sbscrAppmdl.slaLvlcheckMdl(2, cafRecord)
				.then(async (checkdata) => {
					if (checkdata.length == 0) {
						sbscrAppmdl.slaLvlEsclatonMdl("level 2", 2, cafRecord)
							.then(async (results) => {
								count++
								if (count == ind)
									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							}).catch(function (error) {
								count++
								if (count == ind)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					} else {
						if (count == ind) {
							let error = "no data found";
							df.formatSucessRes(req, res, error, cntxtDtls, '', {});
						}
					}
				})
		} else if (nowseconds >= lvlOneendseconds) {
			console.log("came to level 1", cafRecord.comp_ticketno);
			sbscrAppmdl.slaLvlcheckMdl(1, cafRecord)
				.then(async (checkdata) => {
					if (checkdata.length == 0) {
						sbscrAppmdl.slaLvlEsclatonMdl("level 1", 1, cafRecord)
							.then(async (results) => {
								count++
								if (count == ind)
									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							}).catch(function (error) {
								count++
								if (count == ind)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					} else {
						if (count == ind) {
							let error = "no data found";
							df.formatSucessRes(req, res, error, cntxtDtls, '', {});
						}
					}
				})
		}
	} else if (hrs[i].Escltn_lvl_three_time != null && hrs[i].Escltn_lvl_three_time != undefined && hrs[i].Escltn_lvl_three_time != 0) {
		console.log("level 3");
		if (nowseconds >= lvlThreeendseconds) {
			console.log("came to level 3", cafRecord.comp_ticketno);
			sbscrAppmdl.slaLvlcheckMdl(3, cafRecord)
				.then(async (checkdata) => {
					if (checkdata.length == 0) {
						sbscrAppmdl.slaLvlEsclatonMdl("level 3 ", 3, cafRecord)
							.then(async (results) => {
								count++
								if (count == ind)
									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							}).catch(function (error) {
								count++
								if (count == ind)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					} else {
						if (count == ind) {
							let error = "no data found";
							df.formatSucessRes(req, res, error, cntxtDtls, '', {});
						}
					}
				})
		} else if (nowseconds >= lvlTwoendseconds) {
			console.log("came to level 2", cafRecord.comp_ticketno);
			sbscrAppmdl.slaLvlcheckMdl(2, cafRecord)
				.then(async (checkdata) => {
					if (checkdata.length == 0) {
						sbscrAppmdl.slaLvlEsclatonMdl("level 2", 2, cafRecord)
							.then(async (results) => {
								count++
								if (count == ind)
									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							}).catch(function (error) {
								count++
								if (count == ind)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					} else {
						if (count == ind) {
							let error = "no data found";
							df.formatSucessRes(req, res, error, cntxtDtls, '', {});
						}
					}
				})
		} else if (nowseconds >= lvlOneendseconds) {
			console.log("came to level 1", cafRecord.comp_ticketno);
			sbscrAppmdl.slaLvlcheckMdl(1, cafRecord)
				.then(async (checkdata) => {
					if (checkdata.length == 0) {
						sbscrAppmdl.slaLvlEsclatonMdl("level 1", 1, cafRecord)
							.then(async (results) => {
								count++
								if (count == ind)
									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							}).catch(function (error) {
								count++
								if (count == ind)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					} else {
						if (count == ind) {
							let error = "no data found";
							df.formatSucessRes(req, res, error, cntxtDtls, '', {});
						}
					}
				})
		}
	} else if (hrs[i].Escltn_lvl_two_time != null && hrs[i].Escltn_lvl_two_time != undefined && hrs[i].Escltn_lvl_two_time != 0) {
		console.log("level 2");
		if (nowseconds >= lvlTwoendseconds) {
			console.log("came to level 2", cafRecord.comp_ticketno);
			sbscrAppmdl.slaLvlcheckMdl(2, cafRecord)
				.then(async (checkdata) => {
					if (checkdata.length == 0) {
						sbscrAppmdl.slaLvlEsclatonMdl("level 2", 2, cafRecord)
							.then(async (results) => {
								count++
								if (count == ind)
									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							}).catch(function (error) {
								count++
								if (count == ind)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					} else {
						if (count == ind) {
							let error = "no data found";
							df.formatSucessRes(req, res, error, cntxtDtls, '', {});
						}
					}
				})
		} else if (nowseconds >= lvlOneendseconds) {
			console.log("came to level 1", cafRecord.comp_ticketno);
			sbscrAppmdl.slaLvlcheckMdl(1, cafRecord)
				.then(async (checkdata) => {
					if (checkdata.length == 0) {
						sbscrAppmdl.slaLvlEsclatonMdl("level 1", 1, cafRecord)
							.then(async (results) => {
								count++
								if (count == ind)
									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							}).catch(function (error) {
								count++
								if (count == ind)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					} else {
						if (count == ind) {
							let error = "no data found";
							df.formatSucessRes(req, res, error, cntxtDtls, '', {});
						}
					}
				})
		}
	}

	await new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 100);
	});
}

/**************************************************************************************
* Controller     : addHSICafPckgs
* Parameters     : req,res()
* Description    :
* Change History :
* 28/01/2022   - Ramesh P - Initial Function
*
***************************************************************************************/

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


exports.addHSICafPckgsfrmapp = (req, res) => {
	var fnm = "addCafPckgs";
	log.info(`In ${fnm}`, 0, cntxtDtls);
	sbscrAppmdl.getaddonhsiCafDtaMdl(req.body.data, req.user)
		.then((pckg_lst) => {
			sbscrAppmdl.getCafDtaMdl(req.body.data.caf_id, req.user)
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
					sbscrAppmdl.getCafPckageMdl(req.body.data.caf_id, req.user)
						.then((packRes) => {
							console.log('package Repsonse _____________');
							console.log(packRes);

							sbscrAppmdl.getCstmrMnthlyHsiPckgeDtlsMdl(req.body.data.caf_id, req.user)
								.then((mnthHsipackRes) => {
									var usage_varience = ((Number(mnthHsipackRes[0].ttl_upld_ct) + Number(mnthHsipackRes[0].ttl_dwnld_ct)) / 1024 / 1024 / 1024) - Number(mnthHsipackRes[0].mnth_usge_lmt_ct);
									if (usage_varience > 0) {
										var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + usage_varience + Number(pckg_lst[0].vle_tx);
									} else {
										var new_mnth_usge_lmt_ct = Number(mnthHsipackRes[0].mnth_usge_lmt_ct) + Number(pckg_lst[0].vle_tx);
									}
									let fnlHsiPckgeData = {
										caf_id: cafRes[0].caf_id,
										pckg_lst: pckg_lst,
										caf_type_id: cafRes[0].caf_type_id,
										aaa_cd: cafRes[0].aaa_cd,
										crnt_pln_id: cafRes[0].pckge_id,
										crnt_cstmr_pckg: packRes[0].srvcpk_nm.split(',')[1],
										add_on_hsi_pckg: pckg_lst[0].vle_tx,
										prsnt_hsi_pckge: mnthHsipackRes[0].mnth_usge_lmt_ct,
										aaa_prfl_nm: cafRes[0].hsi_orgnl_prfle_tx,
										nw_hsi_pckge: new_mnth_usge_lmt_ct
									};
									console.log('fnlHsiPckgeData ___________________ ');
									console.log(fnlHsiPckgeData);
									let apiCalls = addOnBo.hsiAddOnCalls(aaaData)
									apiMstrCtrl.insrt_Requestnew("Add Ons", 1, 13, fnlHsiPckgeData.caf_id, req.user).then((reqId) => {
										apiMstrCtrl.insrt_api_cls_new(reqId, apiCalls, fnlHsiPckgeData.caf_id).then((insClRes) => {
											apiMstrCtrl.get_apiCls(reqId, req.user).then((extApiCalls) => {
												console.log(extApiCalls)
												aaaApi.updatePrflInAaa(reqId, extApiCalls[0].calls, fnlHsiPckgeData.caf_id, aaaData, (err, data) => {
													if (!err) {
														sbscrAppmdl.addHsiCafPckgsMdl(fnlHsiPckgeData, req.user)
															.then((results) => {
																//subscribeHsiAdon(pckg_lst);
																sbscrAppmdl.addCafHsiMnthPckgsMdl(fnlHsiPckgeData, req.user)
																	.then((cafhsires) => {
																		sbscrAppmdl.updateBatchCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
																			.then((batchCafRes) => {
																				sbscrAppmdl.updateOnlineCafDtlTable(fnlHsiPckgeData, aaaData, req.user)
																					.then((onlineCafRes) => {
																						sbscrAppmdl.addHsiToThrldMdl(fnlHsiPckgeData, req.user)
																							.then((cafFnlres) => {
																								operationsUtils.record('addon_hsi_prchs_ct');
																								// sms_srvc.sendNotifySMS(cafRes[0].mbl_nu, "Dear+Customer,+New+HSI+Addon+Package+${pckg_lst[0].pckge_nm}+is+added+to+your+account+succesfully", function (err, res) {
																								// 	if (err) { console.log(err); }
																								// 	else { console.log('sms sent'); }
																								// }, '1107161779020984336')
																								df.formatSucessAppRes(req, res, cafFnlres, cntxtDtls, fnm, {});
																							}).catch((error) => {
																								console.log("Error in hsi addon ", error)
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
														df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "404", err_message: err });
													}
												 })
											}).catch((error) => {
												console.log(error)
												df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "404", err_message: error });
											});
										}).catch((error) => {
											console.log(error)
											df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "404", err_message: error });
										});
									}).catch((error) => {
										console.log(error)
										df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "404", err_message: error });
									});
								})
						})
				})
		})
}

/**************************************************************************************
* Controller     : Aadhaar
* Parameters     : Aadhaar
* Description    : Aadhaar Details
* Change History :
* 05/05/2022    -  ramesh  - Initial Function
*
***************************************************************************************/
exports.testdeletecmnddb = function (req, res) {
	console.log(req.params.limit)
	sbscrAppmdl.testdeletecmnddbMdl()
		.then( function (results) {
			console.log(results);
            df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : Aadhaar
* Parameters     : Aadhaar
* Description    : Aadhaar Details
* Change History :
* 05/05/2022    -  ramesh  - Initial Function
*
***************************************************************************************/
exports.testdeletecmndothrdb = function (req, res) {
	console.log(req.params.limit)
	sbscrAppmdl.testdeletecmndothrdbMdl()
		.then( function (results) {
			console.log(results);
            df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : lmo list
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 23/06/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.gettotallmocountdata = function (req, res) {

	sbscrAppmdl.gettotallmocountdataMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}
/**************************************************************************************
* Controller     : kyc to be done list
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 23/06/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.totalkyctobedonedata = function (req, res) {

sbscrAppmdl.totalkyctobedoneMdl(req.user)
.then(function (results) {
	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
}).catch(function (error) {
	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
});
}
/**************************************************************************************
* Controller     : kyc  done list
* Parameters     : req,res()
* Description    : get kyc done count
* Change History :
* 23/6/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.totalkycdonedata = function (req, res) {

sbscrAppmdl.totalkycdonedataMdl(req.user)
.then(function (results) {
	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
}).catch(function (error) {
	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
});
}
/**************************************************************************************
* Controller     : kyc  done today
* Parameters     : req,res()
* Description    : get kyc done today
* Change History :
* 23/6/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.kycdonetodaydata = function (req, res) {

sbscrAppmdl.kycdonetodayMdl(req.user)
.then(function (results) {
	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
}).catch(function (error) {
	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
});
}
/**************************************************************************************
* Controller     : kyc  done today
* Parameters     : req,res()
* Description    : get kyc done yesterday
* Change History :
* 23/6/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.yesterdaydonekycdata = function (req, res) {

sbscrAppmdl.yesterdaydonekycMdl(req.user)
.then(function (results) {
	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
}).catch(function (error) {
	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
});
}
/**************************************************************************************
* Controller     : kyc  done to be list
* Parameters     : req,res()
* Description    : listkycdonetobe
* Change History :
* 23/6/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.listkycdonetobe = function (req, res) {

sbscrAppmdl.listkycdonetobeMdl(req.user)
.then(function (results) {
	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
}).catch(function (error) {
	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
});
}
/**************************************************************************************
* Controller     : kyc  done list
* Parameters     : req,res()
* Description    : listkycdone
* Change History :
* 23/6/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.listkycdone = function (req, res) {

sbscrAppmdl.listkycdoneMdl(req.user)
.then(function (results) {
	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
}).catch(function (error) {
	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
});
}
/**************************************************************************************
* Controller     : today kyc list
* Parameters     : req,res()
* Description    : listtodaykyc
* Change History :
* 23/6/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.listtodaykyc = function (req, res) {

sbscrAppmdl.listtodaykycMdl(req.user)
.then(function (results) {
	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
}).catch(function (error) {
	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
});
}
/**************************************************************************************
* Controller     yesterday kyc list
* Parameters     : req,res()
* Description    : listyesterdaykyc
* Change History :
* 23/6/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.listyesterdaykyc = function (req, res) {

sbscrAppmdl.listyesterdaykycMdl(req.user)
.then(function (results) {
	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
}).catch(function (error) {
	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
});
}

/**************************************************************************************
* Controller     : newmndllstlstCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 12/02/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/

exports.newmndllstlstCtrl = function (req, res) {
	sbscrAppmdl.newmndllstlstMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : dstrctlstCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 12/02/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/

exports.dstrctlstCtrl = function (req, res) {
	sbscrAppmdl.dstrctlstMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     yesterday kyc list
* Parameters     : req,res()
* Description    : testcodedropanddelCtrl
* Change History :
* 23/6/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.testcodedropanddelCtrl = function (req, res) {

	sbscrAppmdl.testcodedropanddelMdl(req.body)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
}
/**************************************************************************************
* Controller     :MTD complaints
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 23/06/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.monthtodatecomplaintsCtrl = function (req, res) {

	sbscrAppmdl.monthtodatecomplaintsCtrlMdl(req.user)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
	}
/**************************************************************************************
* Controller     : today complaints
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 19/09/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todaycomplaintscountCtrl = function (req, res) {

	sbscrAppmdl.todaycomplaintscountCtrlMdl(req.user)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
	}
/**************************************************************************************
* Controller     : sbscbr app complaints
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 19/09/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.subscriberappcomplaintscntCtrl = function (req, res) {

	sbscrAppmdl.subscriberappcomplaintscntCtrlMdl(req.user)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
	}
/**************************************************************************************
* Controller     :  completed tickets complaints
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 20/09/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.completeticketsCtrl = function (req, res) {

	sbscrAppmdl.completeticketsCtrlMdl(req.user)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
	}
/**************************************************************************************
* Controller     :  completed tickets complaints
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 20/09/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todaycomplaintsCtrl = function (req, res) {

	sbscrAppmdl.todaycomplaintsCtrlMdl(req.user)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
	}
/**************************************************************************************
* Controller     :  completed tickets complaints
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 20/09/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.totalsubscribercomplaintslistCtrl = function (req, res) {

	sbscrAppmdl.totalsubscribercomplaintslistMdl(req.user)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
	}
/**************************************************************************************
* Controller     :  completed tickets complaints
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 20/09/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.mtdCtrl = function (req, res) {

	sbscrAppmdl.mtdCtrlMdl(req.body.data,req.user)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
	}
/**************************************************************************************
* Controller     :   tdycomplaints
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 20/09/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.tdycmplaintsCtrl = function (req, res) {

	sbscrAppmdl.tdycmplaintsCtrlMdl(req.body.data,req.user)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
	}
/**************************************************************************************
* Controller     :   tdycomplaints
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 20/09/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.totalsbscribersCtrl = function (req, res) {

	sbscrAppmdl.totalsbscribersCtrlMdl(req.body.data,req.user)
	.then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
	}

/**************************************************************************************
* Controller     yesterday kyc list
* Parameters     : req,res()
* Description    : getcafdtlsfrlmodatCtrl
* Change History :
* 23/6/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.getcafdtlsfrlmodatCtrl = function (req, res) {
	var fnm = 'getcafdtlsfrlmodatCtrl'
	sbscrAppmdl.getcafdtlsfrlmodatMdl(req.body.data, req.user)
	.then(function (results) {
		var data;
		if(results.length > 0){
			data = results;
			df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
		} else {
			let err = "No Caf Id found";
			df.formatErrorarrayResresume(req, res, err, cntxtDtls, fnm, { error_status: "402", err_message: err });
		}
	}).catch(function (error) {
		let err = "No Caf Id found";
		df.formatErrorarrayResresume(req, res, err, cntxtDtls, fnm, { error_status: "402", err_message: err });
	});
}

/**************************************************************************************
* Controller     :tickets count(opn,clse,resloved)
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.openclosereslvdticketsCtrl = function (req, res) {

	sbscrAppmdl.openclosereslvdticketsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :ticketscount(opn,clse,resloved)
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.openclosereslvdticketsCount = function (req, res) {

	sbscrAppmdl.openclosereslvdticketsCountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :presentmnthenterprise
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.presentmnthenterpriseCtrl = function (req, res) {

	sbscrAppmdl.presentmnthenterpriseCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :presentmnthdomestictckts
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.presentmnthdomestictcktsCtrl = function (req, res) {

	sbscrAppmdl.presentmnthdomestictcktsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :presentmnthgrievance
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.presentmnthgrievanceCtrl = function (req, res) {

	sbscrAppmdl.presentmnthgrievanceCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :yesterdaytickets
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.yesterdayticketsCtrl = function (req, res) {

	sbscrAppmdl.yesterdayticketsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :sourceprsntmnth
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.sourceprsntmnthCtrl = function (req, res) {

	sbscrAppmdl.sourceprsntmnthCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :sourceprvsmnth
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.sourceprvsmnthCtrl = function (req, res) {

	sbscrAppmdl.sourceprvsmnthCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :todayresmepending
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todayresmependingCtrl = function (req, res) {

	sbscrAppmdl.todayresmependingCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :todaypendingactivation
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todaypendingactivationCtrl = function (req, res) {

	sbscrAppmdl.todaypendingactivationCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :todaysuspndpending
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todaysuspndpendingCtrl = function (req, res) {

	sbscrAppmdl.todaysuspndpendingCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :todayterminationpending
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todayterminationpendingCtrl = function (req, res) {

	sbscrAppmdl.todayterminationpendingCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :todayponchange
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todayboxchnageCtrl = function (req, res) {

	sbscrAppmdl.todayboxchnageCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :todayponchange
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todayponchangeCtrl = function (req, res) {

	sbscrAppmdl.todayponchangeCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :categorywisecomplaints
* Parameters     : req,res()
* Description    : 
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.categorywisecomplaintsCtrl = function (req, res) {

	sbscrAppmdl.categorywisecomplaintsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :tickets count(opn,clse,resloved)
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 28/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.previousmnthticktsCtrl = function (req, res) {

	sbscrAppmdl.previousmnthticktsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}


/**************************************************************************************
* Controller     : kyc  done list
* Parameters     : req,res()
* Description    : get kyc done count
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.singleSbscrkycDatacountCtrl = function (req, res) {

	sbscrAppmdl.singleSbscrkycDatacountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : kyc  done list
* Parameters     : req,res()
* Description    : get kyc done count
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.singletotallmocountCtrl = function (req, res) {

	sbscrAppmdl.singletotallmocountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : kyc  done today
* Parameters     : req,res()
* Description    : get kyc done today
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.singlekycdonetodayyesterdaydataCtrl = function (req, res) {

	sbscrAppmdl.kycdonetodayyesterdaydataMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : kyc  done list
* Parameters     : req,res()
* Description    : get kyc done count
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.SbscrAppAmntcountCtrl = function (req, res) {

	sbscrAppmdl.SbscrAppAmntcountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : kyc  done list
* Parameters     : req,res()
* Description    : get kyc done count
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.SbscrAppchnlcountCtrl = function (req, res) {

	sbscrAppmdl.SbscrAppchnlcountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : kyc  done today
* Parameters     : req,res()
* Description    : get kyc done today
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.PrpdAppcafcountCtrl = function (req, res) {

	sbscrAppmdl.PrpdAppcafcountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : kyc  done today
* Parameters     : req,res()
* Description    : get kyc done today
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.PrpdAppcafclctnrevneamtndcountCtrl = function (req, res) {

	sbscrAppmdl.PrpdAppcafclctnrevneamtndcountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : kyc  done today
* Parameters     : req,res()
* Description    : get kyc done today
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.prpdcmplntscountCtrl = function (req, res) {

	sbscrAppmdl.prpdcmplntscountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}


/**************************************************************************************
* Controller     : kyc  done today
* Parameters     : req,res()
* Description    : get kyc done today
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.cllrtypeCtrl = function (req, res) {

	sbscrAppmdl.cllrtypeMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : kyc  done today
* Parameters     : req,res()
* Description    : get kyc done today
* Change History :
* 07/11/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.cllattndbyCtrl = function (req, res) {

	sbscrAppmdl.cllattndbyMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :previousmnthentrpriselstCtrl(opn,clse,resloved)
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 02/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.previousmnthentrpriselstCtrl = function (req, res) {

	sbscrAppmdl.previousmnthentrpriselstCtrlMdl(req.params.id)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :prsntmnthentrpriselst(opn,clse,resloved)
* Parameters     : req,res()
* Description    : gettotallmocountdata
* Change History :
* 02/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.prsntmnthentrpriselstCtrl = function (req, res) {

	sbscrAppmdl.prsntmnthentrpriselstCtrlMdl(req.params.id)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :previousmnthenterprisetickets
* Parameters     : req,res()
* Description    : 
* Change History :
* 14/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.previousmnthenterpriseticketsCtrl = function (req, res) {

	sbscrAppmdl.previousmnthenterpriseticketsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :enterprisecount
* Parameters     : req,res()
* Description    : 
* Change History :
* 11/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.enterprisecountCtrl = function (req, res) {

	sbscrAppmdl.enterprisecountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}
/**************************************************************************************
* Controller     :previousmnthenterprisecount
* Parameters     : req,res()
* Description    : 
* Change History :
* 11/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.previousmonthenterprisecountCtrl = function (req, res) {

	sbscrAppmdl.previousmonthenterprisecountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}
/**************************************************************************************
* Controller     :previousmnthdomesticcount
* Parameters     : req,res()
* Description    : 
* Change History :
* 11/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.previousmonthdomesticcountCtrl = function (req, res) {

	sbscrAppmdl.previousmonthdomesticcountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}
/**************************************************************************************
* Controller     :previousmnthgrevancescount
* Parameters     : req,res()
* Description    : 
* Change History :
* 11/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.previousmonthgrivancescountCtrl = function (req, res) {

	sbscrAppmdl.previousmonthgrivancescountMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :todayenterpriseticket
* Parameters     : req,res()
* Description    : 
* Change History :
* 14/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todayenterpriseticketsCtrl = function (req, res) {

	sbscrAppmdl.todayenterpriseticketsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :previousenterprisetickets
* Parameters     : req,res()
* Description    : 
* Change History :
* 14/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.previousenterpriseticketsCtrl = function (req, res) {

	sbscrAppmdl.previousenterpriseticketsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :presentmnthentrpriseopnclereslvd
* Parameters     : req,res()
* Description    : 
* Change History :
* 14/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.presentmnthentrpriseopnclereslvdCtrl = function (req, res) {

	sbscrAppmdl.presentmnthentrpriseopnclereslvdCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :todaydomestictickets
* Parameters     : req,res()
* Description    : 
* Change History :
* 14/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todaydomesticticketsCtrl = function (req, res) {

	sbscrAppmdl.todaydomesticticketsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :previousdomestictickets
* Parameters     : req,res()
* Description    : 
* Change History :
* 14/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.previousdomesticticketsCtrl = function (req, res) {

	sbscrAppmdl.previousdomesticticketsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :domesticopnclsereslvedCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 15/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.prsntmnthdomesticopnclsereslvedCtrl = function (req, res) {

	sbscrAppmdl.prsntmnthdomesticopnclsereslvedCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     :previousmnthdomestictickets
* Parameters     : req,res()
* Description    : 
* Change History :
* 14/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.previousmnthdomesticticketsCtrl = function (req, res) {

	sbscrAppmdl.previousmnthdomesticticketsCtrlMdl(req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : killprocesslistidsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 08/02/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/

exports.killprocesslistidsCtrl = function (req, res) {
	sbscrAppmdl.killprocesslistidsMdl(req.body)
		.then( function (results) {
			console.log("results",results)
			sbscrAppmdl.processlistidchckMdl(results).then(function (result){
				console.log("result ::",result)
				df.formatSucessRes(req, res, result, cntxtDtls, '', {});
			})
			//
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
	
}

/**************************************************************************************
* Controller     : OCCIssueCcCatgrytypeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 24/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueCcCatgrytypeCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueCcCatgrytypeMdl(req.params.id,req.params.cmp,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : occgetcafinsrtnewcmplntCtrl
* Parameters     : None
* Description    : 
* Change History :
* 02/11/2021   - Ramesh P - Initial Function
***************************************************************************************/
exports.occgetcafinsrtnewcmplntCtrl = (req, res) => {
	var fnm = "getcstmrupdtdtlsappCtrl";
	sbscrAppmdl.occgetcafinsrtnewcmplntMdl(req.params.cafId,req.user)
		.then((results) => {
			//console.log("results in dtls", results);
			if (results.length > 0) {
				var com_sts;
				if (results.comp_status == 0) {
					com_sts = "open"
				}
				results[0]['com_sts'] = com_sts;
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
		}).catch((error) => {
			console.log("came in dtls catch error");
			df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
}

/**************************************************************************************
* Controller     : addCafVoipAddOnPckgsfrmAppCtrl
* Parameters     : req,res()
* Description    : Add Voip AddOn for Caf
* Change History :
* 07/02/2024   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/

exports.addCafVoipAddOnPckgsfrmAppCtrl = function (req, res) {
	var fnm = "addCafVoipAddOnPckgsfrmAppCtrl";
	log.info(`In ${fnm}`, 0, cntxtDtls);
	console.log("req", req.body)
	var req_body = req.body.data ? req.body.data : req.body;
	req_body = replaceQuotesFromStrng(req_body);
	if(req_body.mobile){
		var packids = []
		var rmbalance = 0;
		var lata = req_body.mobile.replace("'","").slice(0,3);
		console.log(lata)
		req_body['lata'] = lata
		sbscrAppmdl.pckgedatapriceMdl(req_body.package_ids).then(function (pckgeprice) {
			console.log("results", pckgeprice)
			let pckgCalls = cafBO.addVoipAddOnPckgCalls(req_body, req.user)
			console.log("pckgcalls", JSON.stringify(pckgCalls));
			// console.log(req_body.data.pckg_lst);
			pckgeprice.filter((k) => {
				rmbalance += parseFloat(pckgeprice[0].ttl_cst).toFixed(2)-(parseFloat(pckgeprice[0].ttl_cst)*parseFloat(pckgeprice[0].lmo_share)/100).toFixed(2)-(parseFloat(pckgeprice[0].ttl_cst)*parseFloat(pckgeprice[0].mso_share)/100).toFixed(2)
			})
			sbscrAppmdl.chklmoblnceFaccountingMdl(req_body.pckg_lst, req.user).then((results) => {
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
					sbscrAppmdl.updateagntbalMdl(req_body.pckg_lst, rmbalance, newblnce, results[0], req.user).then((agndupdt) => {
						sbscrAppmdl.insrtblnceFaccountingMdl(req_body.pckg_lst, rmbalance, newblnce, results[0], pckgeprice, req_body, req.user).then((faccnt) => {
							extApiCtrl.callApinew("ADD VOIP AddOn PACK", 1, 13, req_body.caf_id, pckgCalls, req.user).then((api_rpsnse) => {
								console.log("---------------api response -------------------")
								console.log(api_rpsnse);
								sbscrAppmdl.addCafInsrtPckgsMdl(pckgeprice, req_body.caf_id.replace(/[']/g,""), req_body.Type.replace(/[']/g,""), req_body.mnthval, req.user).then((result) => {
									console.log("result", result);
									//sbscrAppmdl.cafdatafrsms(req_body.caf_id, req_body.package_ids, req.user).then((cafRes) => {
										//var msgs = `Dear+Customer,+VOIP+Addon+Package+${cafRes[0].packname}+is+added+to+your+account+succesfully`;
										/*if (cafRes[0].mbl_nu != null) {
											sms_srvc.newsendNotifySMS(cafRes[0].mbl_nu, msgs, function (err, res) {
												if (err) { console.log(err); }
												else { console.log('sms sent'); }
											}, '1107161779023829771')
										}*/
										df.formatSucessAppRes(req, res, result, cntxtDtls, fnm, {});
									/*}).catch((error) => {
										if (count == MWHSI.length)
											df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to send SMS" });
									});*/
								}).catch((error) => {
									console.log("error",error)
									sbscrAppmdl.addCaffailedInsrtPckgsMdl("ADD VOIP ADD ON SERVICE PACK", results, req_body, 'extrnl_api_post_json', api_rpsnse, req.user).then((result) => {
										console.log("result", result);
										df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add VOIP Addons to CAF. Please try again." });
									})
								});
							}).catch((err) => {
								df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add VOIP Addons to CAF. Please try again." });
							});
						}).catch(function (error) {
							df.formatErrorRes(req, res, error, cntxtDtls, '', {});
						});
					})
				} else {
					let err = "Your Wallet is low. Please Recharge Your Wallet and Try Again. Minimum Wallet to be Maintained is Rs."+ limit + "/- ";
					console.log("err", err);
					df.formatErrorResresume(req, res, err, cntxtDtls, fnm, { error_status: "401", err_message: err });
				}
			})
		})
	} else {
		df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, Required Mobile no." });
	}
}

/**************************************************************************************
* Controller     : getcstmrcmplntinfobystatusCtrl
* Parameters     : None
* Description    : 
* Change History :
* 18/01/2024   - Radhika - Initial Function
***************************************************************************************/
exports.getcstmrcmplntinfobystatusCtrl = (req, res) => {
	var fnm = "getcstmrcmplntinfobystatusCtrl";
	console.log("req", req.body);
	//log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
	sbscrAppmdl.getcstmrcmplntbystatusMdl(req.body)
		.then((results) => {
			console.log("length in cmplnts", results.length);
			if (results.length > 0) {
				df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
			} else {
				console.log("came to else in cmplnts");
				let error = {};
				df.formatAppInvalidCmpErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
		}).catch((error) => {
			console.log("came in catch error");
			df.formatAppInvalidParamsErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
}

/**************************************************************************************
* Controller     : insertsubalacartedatawebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 18/01/2024   - Radhika - Initial Function
*
***************************************************************************************/

exports.insertsubalacartedatawebCtrl = function (req, res) {
	console.log("req", req.body);
	sbscrAppmdl.insertsubalacartewebMdl(req.body, req.user)
		.then(function (results) {
			df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}

/**************************************************************************************
* Controller     : updatealacartedatawebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 18/01/2024   - Radhika - Initial Function
*
***************************************************************************************/
exports.updatealacartedatawebCtrl = function (req, res) {
	console.log("req", req.body);
	sbscrAppmdl.updatealacartedatawebMdl(req.body, req.user)
		.then(function (results) {
			df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}
