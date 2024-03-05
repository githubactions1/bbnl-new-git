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
					renew_flag = 1;
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
					} else {
						var datas=result[0];
						data['TD']=datas.TD;
						data['TU']=datas.TU;
						data['total']=datas.total;
						data['limit']=datas.mnth_usge_lmt_ct;
					}
					
					//console.log("data", data);
				df.formatSucessAppRes(req, res, data, cntxtDtls, fnm, {});
				})
            
        }).catch((error) => {
			console.log("error in cust_info", error);
            df.formatAppMbleInvalidErrorRes(req, res, error, cntxtDtls, fnm, {});
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
				sbscrAppmdl.getcntcstmrcmplntaddappMdl()
					.then((count) => {
						console.log("count",count[0]['count(*)']+50);
						sbscrAppmdl.insrtcstmrcmplntaddappMdl(count[0]['count(*)']+50, req.body, results[0], ticketNo, emp_id, req.user )
							.then((result) => {
								sbscrAppmdl.getcmplntforlogappMdl(ticketNo, req.user).then((response) => {
									sbscrAppmdl.insrtcmplntlogappMdl(response[0], req.user).then((rspnse) => {
										df.formatSucessAppRes(req, res, "Complaint Inserted Sucessfully", cntxtDtls, fnm, {});
									})
								})
							})
					})
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
										
								if(pckgs.length>0){
									sbscrAppmdl.getcstmrpckgesdtlsappMdl(result[0]['packge_id'])
										.then((existngpckgsdtls) => {
											//console.log("existngpckgsdtls in dtls",existngpckgsdtls[0].package_id);
											
											var existingPacksIds = result[0]['packge_id'];
											df.formatSucessAppRes(req, res, {base_packs,ala_carte,existngpckgsdtls,existingPacksIds}, cntxtDtls, fnm, {});
										}).catch((error) => {
											console.log("came in existngpckgsdtls catch error");
											df.formatAppInvalidParamsErrorRes(req, res, "No Old Packages", cntxtDtls, fnm, {});
										});
								} else {
									console.log("came in pckgs catch error");
									df.formatAppInvalidParamsErrorRes(req, res, "No New Packages", cntxtDtls, fnm, {});
								}
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
	console.log("req.body.data",req.body.data)
    //log.info(`In ${fnm}`, 0, cntxtDtls, { method : req.method, url : req.originalUrl, body : req.body, user : req.user});
	var ticketNo;
	if( req.body.data.tickettype == 'Customer Complaints'){
		ticketNo = 'CC'+Math.floor(Math.random() * 999999);
	} else if(req.body.data.tickettype == 'Service Request') {
		ticketNo = 'SR'+Math.floor(Math.random() * 999999);
	} else if(req.body.data.tickettype == 'Enquiry') {
		ticketNo = 'EQ'+Math.floor(Math.random() * 999999);
	} else if(req.body.data.tickettype == 'Enterprise') {
		ticketNo = 'ENT'+Math.floor(Math.random() * 999999);
		compstatus = 3;
	} 
	console.log("ticket no check for sr and cc : ", ticketNo)
    sbscrAppmdl.occinsrtnewcmplntMdl(req.body.data, ticketNo, req.user)
        .then((results) => {
				console.log("results in dtls", results);
				console.log("empty file",req.body.data.attachments[0].uploadfile);
				console.log("true or false file",req.body.data.attachments[0].uploadfile != '' && req.body.data.attachments[0].uploadfile != null );
				
			if(results.affectedRows=1){
				if(req.body.data.attachments[0].uploadfile != '' && req.body.data.attachments[0].uploadfile != null ){
				console.log("not equal to null")
					var data = req.body.data.attachments[0].uploadfile.split(',')[1];
					var filename = ticketNo;
					var path =  '/home/glits/code/nodejs/APSFL_BSS_WEB/uploads/';
					var buf = Buffer.from(data, 'base64');
					console.log("path",path);
					console.log("buf",buf);
						const base64ToImage = (buf, path, filename) => {       
							fs.writeFile(path + filename, buf, 'binary', function (err, result) {
								if (err) {
									return(err, "not uploaded");
								} else {
									console.log("err", err,"result", result);
									return(err, result);
								}
							});
						}
					base64ToImage(buf, path, filename);
				} else {
					console.log("equal to null")
				}
				sbscrAppmdl.getcmplntforlogappMdl(ticketNo, req.user).then((response) => {
					sbscrAppmdl.insrtcmplntlogappMdl(response[0], req.user).then((rspnse) => {
						df.formatSucessAppRes(req, res, "Complaint Inserted Sucessfully", cntxtDtls, fnm, {});
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
				//console.log("results in dtls", results);
			if(results.length > 0){
				var com_sts ;
				if(results.comp_status == 0){
					com_sts = "open"
				}
				results[0]['com_sts']=com_sts;
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
* Controller     : OCCIssueCstmrTypCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 09/11/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.OCCIssueCstmrTypCtrl = function (req, res) {

    sbscrAppmdl.OCCIssueCstmrTypMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
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
* Controller     : OCCIssueCountByCatgryResolveCtrl
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
* Controller     : OCCIssueCountByCatgryResolveCtrl
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

exports.addCafPckgsfrmAppCtrl = function (req, res) {
    var fnm = "addIptvCafPckgs";
	let extrnl_api_srvc_pack_lst = [];
    log.info(`In ${fnm}`, 0, cntxtDtls);
	console.log("req",req.user)
	sbscrAppmdl.getpackgedatafrapp(req.body)
        .then(function (results) {
			console.log("results",results);
			results.forEach((k) => {
				extrnl_api_srvc_pack_lst.push({
				  'servicepack': k.pckge_nm,
				  'expirydate': k.extrnl_api_expry_dt
				});
			  });
			  console.log("extrnl_api_srvc_pack_lst",extrnl_api_srvc_pack_lst)
			  const extrnl_api_post_json = {
				'subscribercode': req.body.mdlw_sbscr_id,
				'servicepacks': extrnl_api_srvc_pack_lst
			  };
			  console.log("extrnl_api_post_json",extrnl_api_post_json)

			let pckgCalls = cafBO.addPckgCalls(extrnl_api_post_json, req.user)
			console.log("pckgcalls",JSON.stringify(pckgCalls));
			// console.log(req.body.data.pckg_lst);

			extApiCtrl.callApinew("ADD SERVICE PACK", 1, 13, req.body.caf_id, pckgCalls, req.user).then((api_rpsnse) => {
			    console.log("---------------api response -------------------")
			    console.log(api_rpsnse);
			    if (api_rpsnse && api_rpsnse.res) {
			        if (api_rpsnse.res.responseStatus['statusCode'] == "202") {
						sbscrAppmdl.addCafInsrtPckgsMdl(results, req.body.caf_id, req.body.Type, req.user)
							.then((results) => {
								console.log("result",result);
								subscribeChannel(req.body.data.pckg_lst);
								df.formatSucessAppRes(req, res, results, cntxtDtls, fnm, {});
							}).catch((error) => {
								df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
							});
			        }
			        else {
			            sbscrAppmdl.addCaffailedInsrtPckgsMdl(results, req.body, extrnl_api_post_json,api_rpsnse.res.responseStatus, req.user)
							.then((result) => {
								console.log("result",result);
								df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. " + api_rpsnse.res.responseStatus['statusMessage'] });
							})
			        }
			    }
			    else {
			        sbscrAppmdl.addCaffailedInsrtPckgsMdl(results, req.body, extrnl_api_post_json,api_rpsnse.res.responseStatus, req.user)
							.then((result) => {
								console.log("result",result);
								df.formatErrorRes(req, res, api_rpsnse, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
							})
			    }
			}).catch((err) => {
			    df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to add Addons to CAF. Please try again." });
			});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });

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
	sbscrAppmdl.checksubalacartedataMdl(req.body, req.user)
		.then(function (results) {
			if(results.length == 0){
				df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
			} else {
				let error = "Already Package Exits in App"
				df.formatAppNewInvalidParamsErrorMwRes(req, res, error, cntxtDtls, '', {});
			}
			
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