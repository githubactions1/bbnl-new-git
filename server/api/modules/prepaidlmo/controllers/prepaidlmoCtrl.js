var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var crypto = require('crypto');
//const open = require('open');
// Model Inclusions
var prepaidlmoMdl = require('../models/prepaidlmoMdl');
const mime = require('mime');
var fs = require("fs");
var attUtil = require(appRoot + '/utils/attachment.utils');
var dbutil = require(appRoot + '/utils/db.utils');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl');
//var log = require(appRoot + '/utils/batch/logger').logger;
var cafBO = require('../../../modules/caf/cafBO/cafBo');
var _ = require('lodash');
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

var payUMnyCnfg = require(appRoot + '/config/pay_u_money.config');
var reqpost = require('request'); 

/**************************************************************************************
* Controller     : cafcountdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.cafcountdata = (req, res) => {

    prepaidlmoMdl.cafcountMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : monthly collection cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 30/6/2023  -  ramesh  - Initial Function
*
***************************************************************************************/
exports.basepacksAllcountCtrl = (req, res) => {

    prepaidlmoMdl.basepacksAllcountMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : monthly collection cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 30/6/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.basepackslistviewCtrl = (req, res) => {

    prepaidlmoMdl.basepackslistviewMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : report list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/06/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.reportCreditlistdata = (req, res) => {

    prepaidlmoMdl.reportCreditlistdataMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : allcafcountdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.allcafcountdata = (req, res) => {

    prepaidlmoMdl.allcafcountdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : allcafamtdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.allcafamtdataCtrl = (req, res) => {

    prepaidlmoMdl.allcafamtdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getactivecafcountdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getactivecafcountdata = (req, res) => {

    prepaidlmoMdl.activecafMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getsuspentcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getsuspentcafdata = (req, res) => {

    prepaidlmoMdl.suspendMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getterminatependingcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getterminatependingcafdata = (req, res) => {

    prepaidlmoMdl.terminationpendingMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getsuspendpendingdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getsuspendpendingdata = (req, res) => {

    prepaidlmoMdl.suspendpendingMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getresumependingcafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getresumependingcafs = (req, res) => {

    prepaidlmoMdl.resumependingMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getpendingactivationdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getpendingactivationdata = (req, res) => {

    prepaidlmoMdl.pendingactivationMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getboxchangedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getboxchangedata = (req, res) => {

    prepaidlmoMdl.boxchangeMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getterminatecafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getterminatecafdata = (req, res) => {

    prepaidlmoMdl.terminateMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getponchangedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getponchangedata = (req, res) => {

    prepaidlmoMdl.ponchangeMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : faccountingledgerdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.faccountingledgerdata = (req, res) => {

    prepaidlmoMdl.faccountingledgerdataMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : faccountingwebledgerdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.faccountingwebledgerdataCtrl = (req, res) => {

    prepaidlmoMdl.faccountingwebledgerdataMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}


/**************************************************************************************
* Controller     : insrtblnceFaccounting
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.chckblncelmoCtrl = (req, res) => {

    prepaidlmoMdl.chklmoblnceFaccountingMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : tdayblnceFaccounting
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.tdayblnceFaccounting = (req, res) => {

    prepaidlmoMdl.tdayblnceFaccountingMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : mnthblnceFaccounting
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.mnthblnceFaccounting = (req, res) => {

    prepaidlmoMdl.mnthblnceFaccountingMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : expiredcaf
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.expiredcafdata = (req, res) => {

    prepaidlmoMdl.expirtedcafMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : threemnthscafspndcountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/9/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.threemnthscafspndcountCtrl = (req, res) => {

    prepaidlmoMdl.threemnthscafspndcountMdl(req.body, req.user)
        .then(function (thrmnthsdta) {
            df.formatSucessRes(req, res, thrmnthsdta, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : gettrmndcaflmodtlsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/9/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.gettrmndcaflmodtlsCtrl = (req, res) => {

    prepaidlmoMdl.gettrmndcaflmodtls(req.body, req.user)
        .then(function (thrmnthsdta) {
            df.formatSucessRes(req, res, thrmnthsdta, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : paymentapprovals
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.paymentapprovalsdata = (req, res) => {

    prepaidlmoMdl.paymentapprovalsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : monthly renewd cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.monthlyrenewdcafdata = (req, res) => {

    prepaidlmoMdl.monthlyrenewdcafMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : today renewd cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.todayrenewdcafdata = (req, res) => {

    prepaidlmoMdl.todayrenewdcafMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : today revenue cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.todayrevenuedata = (req, res) => {

    prepaidlmoMdl.todayrevenueMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : monthly revenue cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.monthlyrevenuedata = (req, res) => {

    prepaidlmoMdl.monthlyrevenueMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : monthly collection cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.monthlycollectiondata = (req, res) => {

    prepaidlmoMdl.monthlycollectionMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : today collection cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.todaycollectiondata = (req, res) => {

    prepaidlmoMdl.todaycollectionMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : online collection cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectiondata = (req, res) => {

    prepaidlmoMdl.onlinecollectionMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : online collection list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinelistdata = (req, res) => {

    prepaidlmoMdl.onlinelistdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : report list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.reportlistdata = (req, res) => {

    prepaidlmoMdl.reportlistdataMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : report list
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.sharingreportdata = (req, res) => {

    prepaidlmoMdl.sharingreportdataMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : walletamountfrlmoCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.walletamountfrlmoCtrl = (req, res) => {

    prepaidlmoMdl.walletamountfrlmoMdl(req.user)
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
* 10/05/2022    -   - Initial Function
*
***************************************************************************************/

exports.removeaddonsfrCafPckgsCtrl = function (req, res) {
    var fnm = "removeAddons";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    sbscrAppmdl.getpackgedatafrbsscafremvlfrapp()
        .then(function (result) {
            if (result.length > 0) {
                console.log("results", result);
                for (let i = 0; i < result.length; i++) {
                    if (result[i].enty_sts_id == 7 || result[i].enty_sts_id == 84) {
                        sbscrAppmdl.removeAddonsfrspndMdl(result[i])
                            .then(function (results) {
                                if (i == result.length - 1)
                                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            })
                    } else {
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
                                            sbscrAppmdl.removeAddonsfrcafMdl(result[i], req.user, result[i].caf_id)
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
* Controller     : threemnths_spndCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.threemnths_spndCtrl = (req, res) => {

    prepaidlmoMdl.threemnths_spndMdl(req.body, req.params.id, req.user)
        .then(function (thrmnthsdta) {
            prepaidlmoMdl.updatecafdtlthreemnths_spndMdl(req.user)
                .then(function (updtscaf) {
                    prepaidlmoMdl.insrtcafthreemnths_spndMdl(thrmnthsdta, req.user)
                        .then(function (insrt) {
                            df.formatSucessRes(req, res, insrt, cntxtDtls, '', {});
                        })
                })
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getlistresumependingcafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.getlistresumependingcafs = (req, res) => {

    prepaidlmoMdl.getlistresumependingcafsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getlistsuspendpendingdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.getlistsuspendpendingdata = (req, res) => {

    prepaidlmoMdl.getlistsuspendpendingdataMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insertprpdlmoamtdtlsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.insertprpdlmoamtdtlsCtrl = (req, res) => {
	prepaidlmoMdl.checkinsertprpdlmoamtdtlsMdl(req.body.data, req.user)
        .then(function (result) {
            if(result.length == 0){
				prepaidlmoMdl.insertprpdlmoamtdtlsMdl(req.body.data, req.user)
					.then(function (results) {
						df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
					}).catch(function (error) {
						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
					});
			}else {
                var error = 'Already Transaction Initiated'
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            }
       
    }).catch(function (error) {
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}

/**************************************************************************************
* Controller     : updtprpdlmoamtdtlsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.updtprpdlmoamtdtlsCtrl = (req, res) => {

    prepaidlmoMdl.updtprpdlmoamtdtlsMdl(req.body.data, req.user)
        .then(function (results) {
            if (req.body.data.f_code == 'Ok') {
				prepaidlmoMdl.prpdlmowalletchcklmoatomtxnretrackMdl(req.body.data).then(function (chckdata) {
					if(chckdata.length == 0){
						prepaidlmoMdl.getwalletprpdlmoamtdtlsMdl(req.body.data, req.user)
							.then(function (waldata) {
								var walbalance = 0;
								if (waldata.length > 0) {
									if (waldata[0].balance == null || waldata[0].balance == '') {
										walbalance = 0
									} else {
										walbalance += parseFloat(waldata[0].balance)
									}
									walbalance += parseFloat(req.body.data.amt);
									prepaidlmoMdl.updtwalletprpdlmoamtdtlsMdl(req.body.data, walbalance, req.user)
										.then(function (results) {
											prepaidlmoMdl.updtwalletprpdfaccntinglmoamtdtlsMdl(req.body.data, walbalance, waldata[0], req.user)
												.then(function (result) {
													df.formatSucessAppRes(req, res, result, cntxtDtls, '', {});
												}).catch(function (error) {
													df.formatErrorRes(req, res, error, cntxtDtls, '', {});
												});
										}).catch(function (error) {
											df.formatErrorRes(req, res, error, cntxtDtls, '', {});
										});
								}

							}).catch(function (error) {
								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
						} else {
							df.formatSucessRes(req, res, "TXN id inserted already", cntxtDtls, '', {});
						}
					})
            } else {
                df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : kyclistviewCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.kyclistviewCtrl = (req, res) => {

    prepaidlmoMdl.kyclistviewMdl(req.user)
        .then(function (results) {
            df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : AtomGatewayCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.AtomGatewayCtrl = (req, resp) => {

    var data = req.body.data;
    console.log("data", data)
    var cc = req.body.data.clientcode;
    var final = (new Buffer(cc).toString('base64'));
    var url = data.ru == "" ? null : data.ru;
    var udf1 = data.udf1 == "" ? null : data.udf1;
    var udf2 = data.udf2 == "" ? null : data.udf2;
    var udf3 = data.udf3 == "" ? null : data.udf3;
    var udf4 = data.udf4 == "" ? null : data.udf4;
    var key = 'KEY123657234';
    var req_enc_key = '8E41C78439831010F81F61C344B7BFC7';
    var req_salt = '8E41C78439831010F81F61C344B7BFC7';
    var sign = data.login + data.pass + data.ttype + data.prodid + data.transid + data.amt + data.txncur;

    function sig(sign, key) {
        return crypto.createHmac('sha512', key)
            .update(new Buffer(sign, 'utf-8'))
            .digest('hex');
    }
    var signature = sig(sign, key)

    var text = 'login=' + data.login + '&pass=' + data.pass + '&ttype=' + data.ttype + '&prodid=' + data.prodid + '&amt=' + data.amt + '&txncurr=' + data.txncur + '&txnscamt=' + data.txnamt + '&clientcode=' + encodeURIComponent(final) + '&txnid=' + data.transid + '&date=' + data.datepick + '&custacc=' + data.custacc + '&udf1=' + udf1 + '&udf2=' + udf2 + '&udf3=' + udf3 + '&udf4=' + udf4 + '&ru=' + url + '&signature=' + signature + '';


    const algorithm = 'aes-256-cbc';
    const password = Buffer.from(req_enc_key, 'utf8');
    const salt = Buffer.from(req_salt, 'utf8');
    const iv = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 'utf8');

    const encrypt = (text) => {

        var derivedKey = crypto.pbkdf2Sync(password, salt, 65536, 32, 'sha1');
        const cipher = crypto.createCipheriv(algorithm, derivedKey, iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${encrypted.toString('hex')}`;
    };


    var encdata = encrypt(text);

    var options = {
        host: 'https://payment.atomtech.in',
        path: '/paynetz/epi/fts?login=' + data.login + '&encdata=' + encdata + '',
    };
    url = options['host'] + options["path"];
    //results =
    //window.open(url)
    //   open('http://sindresorhus.com');
    //   resp.redirect(url);
    prepaidlmoMdl.insertwebprpdlmoamtdtlsMdl(req.body.data, req.user)
    .then(function (result) {
        df.formatSucessRes(req, resp, url, cntxtDtls, '', {});
    }).catch(function (error) {
        df.formatErrorRes(req, resp, error, cntxtDtls, '', {});
    });
}

/**************************************************************************************
* Controller     : AtomresGatewayCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.AtomresGatewayCtrl = (req, resp) => {
    //console.log(req, resp)
    var res_enc_key = '8E41C78439831010F81F61C344B7BFC7';
    var res_salt = '8E41C78439831010F81F61C344B7BFC7';
    const algorithm = 'aes-256-cbc';
    const password = Buffer.from(res_enc_key, 'utf8');
    const salt = Buffer.from(res_salt, 'utf8');
    const iv = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 'utf8');
    const decrypt = (text) => {
        const encryptedText = Buffer.from(text, 'hex');
        var derivedKey = crypto.pbkdf2Sync(password, salt, 65536, 32, 'sha1');
        const decipher = crypto.createDecipheriv(algorithm, derivedKey, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    };
    var decrypted_data = decrypt(req.body.encdata);
    var arr = decrypted_data.split("&").map(function (val) {
        return val;
    });
    var data = {};
    for (var i = 0; i < arr.length; i++) {
        var val = arr[i].split('=');
        data[val[0]] = val[1];
    }

    console.log('Response');
    console.log(data);
    prepaidlmoMdl.webupdtprpdlmoamtdtlsMdl(data)
        .then(function (results) {
            console.log(results);
            
            if (data.f_code == 'Ok') {
                prepaidlmoMdl.getwebwalletprpdlmoamtdtlsMdl(data, req.user)
                    .then(function (waldata) {
                        var walbalance = 0;
                        if (waldata.length > 0) {
                            if (waldata[0].balance == null || waldata[0].balance == '') {
                                walbalance = 0
                            } else {
                                walbalance += parseFloat(waldata[0].balance)
                            }
                            walbalance += parseFloat(data.amt);
                            prepaidlmoMdl.updtwebwalletprpdlmoamtdtlsMdl(data, walbalance, req.user)
                                .then(function (results) {
                                    //console.log("result in update wallet",results)
                                    prepaidlmoMdl.updtwebwalletprpdfaccntinglmoamtdtlsMdl(data, walbalance, waldata[0], req.user)
                                        .then(function (result) {
                                            datas = {
                                                "Transaction Status":data.desc,
                                                "Bank Transaction Id":data.bank_txn,
                                                "Reference Number":data.mmp_txn,
                                                "Transaction Amount":data.amt,
                                            }
                                            //df.formatSucessAppRes(req, resp, datas, cntxtDtls, '', {});
                                            url = 'https://bbnlbss..apsfl.co.in/admin/sc/agent/lmo/dashboard';
                                            return resp.redirect(url);
                                            
                                        }).catch(function (error) {
                                            datas = {
                                                "Transaction Status":data.desc,
                                                "Bank Transaction Id":data.bank_txn,
                                                "Reference Number":data.mmp_txn,
                                                "Transaction Amount":data.amt,
                                            }
                                            url = 'https://bbnlbss..apsfl.co.in/admin/sc/agent/lmo/dashboard';
                                            return resp.redirect(url);
                                            
                                            // df.formatErrorRes(req, resp, datas, cntxtDtls, '', {});
                                        });
                                }).catch(function (error) {
                                    //console.log("err",error)
                                    datas = {
                                        "Transaction Status":data.desc,
                                        "Bank Transaction Id":data.bank_txn,
                                        "Reference Number":data.mmp_txn,
                                        "Transaction Amount":data.amt,
                                    }
                                    url = 'https://bbnlbss..apsfl.co.in/admin/sc/agent/lmo/dashboard';
                                    return resp.redirect(url);
                                    
                                    // df.formatErrorRes(req, resp, datas, cntxtDtls, '', {});
                                });
                        }

                    }).catch(function (error) {
                        datas = {
                            "Transaction Status":data.desc,
                            "Bank Transaction Id":data.bank_txn,
                            "Reference Number":data.mmp_txn,
                            "Transaction Amount":data.amt,
                        }
                         url = 'https://bbnlbss..apsfl.co.in/admin/sc/agent/lmo/dashboard';
                         return resp.redirect(url);
                        
                        // df.formatErrorRes(req, resp, datas, cntxtDtls, '', {});
                    });
            } else {
                datas = {
                    "Transaction Status":data.desc,
                    "Bank Transaction Id":data.bank_txn,
                    "Reference Number":data.mmp_txn,
                    "Transaction Amount":data.amt,
                }
                url = 'https://bbnlbss..apsfl.co.in/admin/sc/agent/lmo/dashboard';
                return resp.redirect(url);
                // df.formatSucessAppRes(req, resp, datas, cntxtDtls, '', {});
            }
            
        }).catch(function (error) {
            datas = {
                "Transaction Status":data.desc,
                "Bank Transaction Id":data.bank_txn,
                "Reference Number":data.mmp_txn,
                "Transaction Amount":data.desc,
            }
            url = 'https://bbnlbss..apsfl.co.in/admin/sc/agent/lmo/dashboard';
            return resp.redirect(url);
            // df.formatErrorRes(req, resp, datas, cntxtDtls, '', {});
        });
    //resp.json(data);
    //df.formatSucessRes(req, resp, data, cntxtDtls, '', {});
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
    prepaidlmoMdl.testdeletecmnddbMdl()
        .then(function (results) {
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
    prepaidlmoMdl.testdeletecmndothrdbMdl()
        .then(function (results) {
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
exports.insrtdataCtrl = function (req, res) {
    console.log("req.body", req.body)
    function img_upload(img, flname, callback) {
        var matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            callback(false, res)
        }

        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.extension(type);
        var name = 'offr_img_' + Date.now();
        let fileName = flname + "." + extension;
        var dir = '/glits/filestore/uploads/lmokyc';
        console.log(fs.existsSync(dir))
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);

        }

        try {
            fs.writeFileSync(dir + "/" + fileName, imageBuffer, 'utf8');
            res['Location'] = `${dir}/${fileName}`;
            callback(false, res.Location)
        } catch (e) {
            console.log(e)
        }

    }


    if (req.body.data.kyc_img_tx && req.body.data.kyc_img_tx != undefined ) {
        //     attUtil.uploadToS3([req.body.data.kyc_img_tx], 'wetrackon/bss_kyc     ', (err, attKycChres) => {
        let fle1name =  'TEST_offr_img_' + Date.now();
        img_upload(req.body.data.kyc_img_tx, fle1name, (err, attKycChres) => {
            if (!err) {
                console.log(attKycChres);
                var kycAttchmnt = attKycChres;
                //             attUtil.uploadToS3([req.body.data.kyc_bck_img_tx], 'wetrackon/bss_kyc', (err, attKycBckChres) => {
                prepaidlmoMdl.insrtdataMdl(req.body.data, kycAttchmnt, req.user)
                    .then(function (results) {
                        console.log(results);
                        df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }
        })
    }
}

/**************************************************************************************
* Controller     : Aadhaar
* Parameters     : Aadhaar
* Description    : Aadhaar Details
* Change History :
* 05/05/2022    -  ramesh  - Initial Function
*
***************************************************************************************/
exports.getinsrtdataCtrl = function (req, res) {
    console.log(req.params.limit)
    prepaidlmoMdl.getinsrtdataMdl()
        .then(function (results) {
            console.log(results);
            df.formatSucessAppRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : renewcafdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/4/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.renewcafdataCtrl = (req, res) => {
    var nowdate = moment(new Date(), 'YYYY-MM-DD');
    var pack_id;
    var cpe_rental;
    var cpe_chrge = 0;
    var alacarte_id = [];

    prepaidlmoMdl.renewcafdataMdl(req.params.id, req.user)
        .then(function (cafdata) {
            prepaidlmoMdl.renewcafprchsedataMdl(req.params.id, req.user)
                .then(function (cafprchsedata) {
                    console.log("cafprchsedata.length, data", cafprchsedata.length, cafprchsedata)
                    if (cafprchsedata.length > 0) {
                        let count = 1;
                        for (i = 0; i < cafprchsedata.length; i++) {
                            if (cafprchsedata[i].pckge_type_id == 1) {
                                if (cafdata[0].crnt_pln_id == cafprchsedata[i].pckge_id) {
                                    pack_id = cafprchsedata[i].pckge_id;
                                    cpe_rental = moment(cafprchsedata[i].cycle_end_dt, 'YYYY-MM-DD');
                                    count++;
                                    console.log("count type 1", count);
                                    if (nowdate > cpe_rental) {
										let bufferdays = 7;
										cpenowdate = moment(new Date()).format('YYYY-MM-DD'); //new code
										cpe_rental = moment(cpe_rental).format('YYYY-MM-DD'); //new code
										cpenowdate = new Date(cpenowdate) //new code
										cpe_rental = new Date(cpe_rental) //new code
										var diff = Math.abs(cpenowdate.getTime() - cpe_rental.getTime()); //new code
                                        //var diff = Math.abs(nowdate - cpe_rental - 1); // old code
                                        var remaining_days = Math.floor(diff / 86400000);
										remaining_days = remaining_days-1; //new code
										if(remaining_days < bufferdays){
											remaining_days = 0;
										}
                                        if (remaining_days > 0) {
                                            cpe_chrge += parseFloat(cafprchsedata[i].cpe_val) * remaining_days
                                        } else {
                                            cpe_chrge = 0;
                                        }
                                    }
                                } else {
                                    console.log("count type 1 2nd", count);
                                    count++;
                                }
                            } else {
                                if (nowdate > cafprchsedata[i].cycle_end_dt) {
                                    alacarte_id += cafprchsedata[i].pckge_id;
                                }
                                count++;
                                console.log("count type 2 1st, cafprchsedata.length", count, cafprchsedata.length);
                                if (cafprchsedata.length > count && nowdate > cafprchsedata[i].cycle_end_dt)
                                    alacarte_id += ',';
                            }
                        }

                        console.log(cpe_chrge)
                        prepaidlmoMdl.renewcafpckgsfrdataMdl(req.user)
                            .then(function (bse_pck) {
                                prepaidlmoMdl.hphedatachnllst(req.user)
                            .then(function (free_pcks) {
                                prepaidlmoMdl.renewcafalacartedataMdl(alacarte_id, req.user)
                                    .then(function (ala_carte_pck) {
                                        df.formatSucessRes(req, res, { old_pack_id: pack_id, cpe_chrge, bse_pck, ala_carte_pck , free_pcks}, cntxtDtls, '', {});
                                    }).catch(function (error) {
                                        console.log(error)
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });
                                }).catch(function (error) {
                                    console.log(error)
                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                });
                            }).catch(function (error) {
                                console.log(error)
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    } else {
                        console.log("err")
                    }

                }).catch(function (error) {
                    console.log(error)
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        }).catch(function (error) {
            console.log(error)
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : pckgewisedataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.pckgewisedataCtrl = (req, res) => {
    prepaidlmoMdl.pckgewisedataMdl(req.params.caf_id, req.params.pckge_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : allcafcountindataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.allcafcountindataCtrl = (req, res) => {
    prepaidlmoMdl.allcafcountindataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : apsflmnthtdyrevCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.apsflmnthtdyrevCtrl = (req, res) => {
    prepaidlmoMdl.apsflmnthtdyrevMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : apsflmnthtdyclctndataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.apsflmnthtdyclctndataCtrl = (req, res) => {
    prepaidlmoMdl.apsflmnthtdyclctndataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : mnthtdyrenewcafCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.mnthtdyrenewcafCtrl = (req, res) => {
    prepaidlmoMdl.mnthtdyrenewcafMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : expcafsumCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.expcafsumCtrl = (req, res) => {
    prepaidlmoMdl.expcafsumMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : expcafsumCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.expcafsumthreendfivedayCtrl = (req, res) => {
    prepaidlmoMdl.expcafsumthreendfivedayMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : expcafsumthreedayCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.expcafsumthreedayCtrl = (req, res) => {
    prepaidlmoMdl.expcafsumthreedayMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : expcafsumfivedayCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.expcafsumfivedayCtrl = (req, res) => {
    prepaidlmoMdl.expcafsumfivedayMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : listcafcountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listcafcountCtrl = (req, res) => {

    prepaidlmoMdl.listcafcountMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listactivecafCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listactivecafCtrl = (req, res) => {

    prepaidlmoMdl.listactivecafMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listgetsuspentcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listgetsuspentcafdata = (req, res) => {

    prepaidlmoMdl.listsuspendMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listgetterminatecafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listgetterminatecafdata = (req, res) => {

    prepaidlmoMdl.listterminateMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listgetterminatependingcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listgetterminatependingcafdata = (req, res) => {

    prepaidlmoMdl.listterminationpendingMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listgetsuspendpendingdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listgetsuspendpendingdata = (req, res) => {

    prepaidlmoMdl.listsuspendpendingMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listgetresumependingcafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listgetresumependingcafs = (req, res) => {

    prepaidlmoMdl.listresumependingMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listgetpendingactivationdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listgetpendingactivationdata = (req, res) => {

    prepaidlmoMdl.listpendingactivationMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listgetboxchangedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listgetboxchangedata = (req, res) => {

    prepaidlmoMdl.listboxchangeMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listgetponchangedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listgetponchangedata = (req, res) => {

    prepaidlmoMdl.listponchangeMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : listexpiredcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listexpiredcafdata = (req, res) => {

    prepaidlmoMdl.listexpirtedcafMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : listmonthlyrenewdcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listmonthlyrenewdcafdata = (req, res) => {

    prepaidlmoMdl.listmonthlyrenewdcafMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : listtodayrenewdcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listtodayrenewdcafdata = (req, res) => {

    prepaidlmoMdl.listtodayrenewdcafMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : listonlinecollectiondata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listonlinecollectiondata = (req, res) => {

    prepaidlmoMdl.listonlinecollectionMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : listtodayonlinecollectionCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listtodayonlinecollectionCtrl = (req, res) => {

    prepaidlmoMdl.listtodayonlinecollectionMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : listmonthlyonlinecollectionCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listmonthlyonlinecollectionCtrl = (req, res) => {

    prepaidlmoMdl.listmonthlyonlinecollectionMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : listtodayrevenuedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listtodayrevenuedata = (req, res) => {

    prepaidlmoMdl.listtodayrevenueMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : listmonthlyrevenuedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listmonthlyrevenuedata = (req, res) => {

    prepaidlmoMdl.listmonthlyrevenueMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : monthly collection cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listmonthlycollectiondata = (req, res) => {

    prepaidlmoMdl.listmonthlycollectionMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : listtodaycollectiondata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.listtodaycollectiondata = (req, res) => {

    prepaidlmoMdl.listtodaycollectionMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postlistcafcountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistcafcountCtrl = (req, res) => {

    prepaidlmoMdl.postlistcafcountMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistactivecafCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistactivecafCtrl = (req, res) => {

    prepaidlmoMdl.postlistactivecafMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistgetsuspentcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistgetsuspentcafdata = (req, res) => {

    prepaidlmoMdl.postlistsuspendMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistgetterminatecafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistgetterminatecafdata = (req, res) => {

    prepaidlmoMdl.postlistterminateMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistgetterminatependingcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistgetterminatependingcafdata = (req, res) => {

    prepaidlmoMdl.postlistterminationpendingMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistgetsuspendpendingdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistgetsuspendpendingdata = (req, res) => {

    prepaidlmoMdl.postlistsuspendpendingMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistgetresumependingcafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistgetresumependingcafs = (req, res) => {

    prepaidlmoMdl.postlistresumependingMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistgetpendingactivationdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistgetpendingactivationdata = (req, res) => {

    prepaidlmoMdl.postlistpendingactivationMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistgetboxchangedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistgetboxchangedata = (req, res) => {

    prepaidlmoMdl.postlistboxchangeMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistgetponchangedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistgetponchangedata = (req, res) => {

    prepaidlmoMdl.postlistponchangeMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : postlistmonthlyrenewdcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistmonthlyrenewdcafdata = (req, res) => {

    prepaidlmoMdl.postlistmonthlyrenewdcafMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postlisttodayrenewdcafdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlisttodayrenewdcafdata = (req, res) => {

    prepaidlmoMdl.postlisttodayrenewdcafMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postlisttodayrevenuedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlisttodayrevenuedata = (req, res) => {

    prepaidlmoMdl.postlisttodayrevenueMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postlistmonthlyrevenuedata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistmonthlyrevenuedata = (req, res) => {

    prepaidlmoMdl.postlistmonthlyrevenueMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postlistmonthlycollectiondata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistmonthlycollectiondata = (req, res) => {

    prepaidlmoMdl.postlistmonthlycollectionMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postlisttodaycollectiondata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlisttodaycollectiondata = (req, res) => {

    prepaidlmoMdl.postlisttodaycollectionMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postlisttodayonlinecollectionCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlisttodayonlinecollectionCtrl = (req, res) => {

    prepaidlmoMdl.postlisttodayonlinecollectionMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postlistmonthlyonlinecollectionCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.postlistmonthlyonlinecollectionCtrl = (req, res) => {

    prepaidlmoMdl.postlistmonthlyonlinecollectionMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postexpcafsumthreedayCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.postexpcafsumthreedayCtrl = (req, res) => {
    prepaidlmoMdl.postexpcafsumthreedayMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : postexpcafsumfivedayCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/7/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.postexpcafsumfivedayCtrl = (req, res) => {
    prepaidlmoMdl.postexpcafsumfivedayMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : updtaed flag id
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 3/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.updatedflagnotifydata = (req, res) => {

    prepaidlmoMdl.updatedflagnotifydataMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : agnt  flag id
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.activeagntflagdata = (req, res) => {

    prepaidlmoMdl.activeagntflagdataMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : advancerenewalcaf
* Parameters     : req,res()
* Description    : 
* Change History :
* 16/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.advancerenewalcafCtrl = (req, res) => {
    prepaidlmoMdl.advancerenewalcafCtrlMdl(req.body.data, req.user)
        .then(function (results) {
              df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : advancerenewal count caf
* Parameters     : req,res()
* Description    : 
* Change History :
* 16/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.totalprepaidlmocountCtrl = (req, res) => {
    prepaidlmoMdl.totalprepaidlmocountCtrlMdl(req.body.data, req.user)
        .then(function (results) {
       df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : advancerenewalcaflist
* Parameters     : req,res()
* Description    : 
* Change History :
* 17/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.totalprepaidlmoCtrl = (req, res) => {
    
    prepaidlmoMdl.totalprepaidlmoCtrlMdl(req.body.data, req.user)
        .then(function (results) {
             df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : advancerenewalcaf
* Parameters     : req,res()
* Description    : 
* Change History :
* 16/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.advancerenewalcafcountCtrl = (req, res) => {
   
    prepaidlmoMdl.advancerenewalcafcountCtrlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : prepaidcafcount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.totalprepaidcafCtrl = (req, res) => {

    prepaidlmoMdl.totalprepaidcafCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : suspendcafcount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.suspendcafcountCtrl = (req, res) => {

    prepaidlmoMdl.suspendcafcountCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : activecafcount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.activecafcountCtrl = (req, res) => {

    prepaidlmoMdl.activecafcountCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : terminatedcafcount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.terminatedcafcountCtrl= (req, res) => {

    prepaidlmoMdl.terminatedcafcountCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : terminatedpendingcafcount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.terminatedpendingcafcountCtrl= (req, res) => {

    prepaidlmoMdl.terminatedpendingcafcountCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : terminatedpendingcafcount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.suspenededpendingcafcountCtrl= (req, res) => {

    prepaidlmoMdl.suspenededpendingcafcountCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : resumependingcafcount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.resumependingcafcountCtrl= (req, res) => {

    prepaidlmoMdl.resumependingcafcountCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : pendingactivation
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.pendingactivationcountCtrl= (req, res) => {

    prepaidlmoMdl.pendingactivationcountCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : boxchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.boxchangeCtrl= (req, res) => {

    prepaidlmoMdl.boxchangeCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        
}

/**************************************************************************************
* Controller     : updtaed flag id
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 3/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.updatelmoamountdata = (req, res) => {
	
	var payuResponse = req.body.data.payuResponse.replace('\\"', '');
	payuResponse = JSON.parse(payuResponse);
    prepaidlmoMdl.updatelmoamountdataMdl(req.body.data, req.user)
        .then(function (results) {
            //var datapayuResponsestatus=replaceQuotesFromStrng(req.body.data.payuResponse)
			
            if(payuResponse.status == 'success'){
				prepaidlmoMdl.prpdpayulmowalletchcklmoatomtxnretrackMdl(payuResponse).then(function (chckdata) {
					if(chckdata.length == 0){
						prepaidlmoMdl.getlmowalletblnceupdatedataMdl(req.body.data, req.user)
						.then(function (lmoblnc) {
							var newblnce = 0;
							if(lmoblnc[0].balance == null || lmoblnc[0].balance == 0 || lmoblnc[0].balance == undefined){
								newblnce =0;
							} else {
								newblnce += parseFloat(lmoblnc[0].balance)
							}
							newblnce += parseFloat(payuResponse.amount);
							prepaidlmoMdl.updatelmowalletblncedataMdl(req.body.data, newblnce, req.user)
								.then(function (wltupdt) {
									prepaidlmoMdl.updatelmofaccntingblncedataMdl(req.body.data, lmoblnc[0], newblnce, req.user)
										.then(function (faccntupdt) {
											console.log('________________________-----------------------------------________________________________');
											console.log('payu added');
											df.formatSucessRes(req, res, faccntupdt, cntxtDtls, '', {});
										}).catch(function (error) {
											df.formatErrorRes(req, res, error, cntxtDtls, '', {});
										});     
								}).catch(function (error) {
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
								});   
						}).catch(function (error) {
							df.formatErrorRes(req, res, error, cntxtDtls, '', {});
						});
					} else {
							df.formatSucessRes(req, res, "TXN id inserted already", cntxtDtls, '', {});
						}
					})
            } else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.ponchangeCtrl= (req, res) => {

    prepaidlmoMdl.ponchangeCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        
}
/**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.totalprepaidlistdata= (req, res) => {

    prepaidlmoMdl.totalprepaidlistdataMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        
}
/**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.suspendedcaflistCtrl= (req, res) => {

    prepaidlmoMdl.suspendedcaflistCtrlMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        }
/**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.activecaflistCtrl= (req, res) => {

    prepaidlmoMdl.activecaflistCtrlMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        }
/**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.terminatedcaflist= (req, res) => {

    prepaidlmoMdl.terminatedcaflistMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        }

/**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.terminatedpendingcaflist= (req, res) => {

    prepaidlmoMdl.terminatedpendingcaflistMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        }
/**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.suspendpendingcaflist= (req, res) => {

    prepaidlmoMdl.suspendpendingcaflist(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        }
/**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.resumependingcaflist= (req, res) => {

    prepaidlmoMdl.resumependingcaflistMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        }
/**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.pendingactivationcaflist= (req, res) => {

    prepaidlmoMdl.pendingactivationcaflistMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        }
 /**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.boxchangelistdata= (req, res) => {

    prepaidlmoMdl.boxchangelistMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        }
  /**************************************************************************************
* Controller     : ponchange
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/9/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.ponchangelistCtrl= (req, res) => {

    prepaidlmoMdl.ponchangelistCtrlMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

        }


/**************************************************************************************

* Controller     : dynamicUPItStlmntCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.dynamicUPItStlmntCtrl = (req, res) => {
    var fnm = "dynamicUPItStlmntCtrl";

    var req_body = req.body.data ? req.body.data : req.body;
    req_body = replaceQuotesFromStrng(req_body);
    var user = {
        clnt_id: req_body.clnt_id,
        tnt_id: req_body.tnt_id,
        usr_id: req_body.usr_id
    }
    var salt = payUMnyCnfg.upi.salt;
    var key = payUMnyCnfg.upi.key;
    var txnid = req_body['txnid'];
    console.log("verify_payment",req_body)
    var pymnt_id = null;
    var command = "verify_payment";

    prepaidlmoMdl.vrfyTrnsnStlmentMdl(txnid, user).then((trns_res) => {

        if (trns_res && trns_res.length) {
            pymnt_id = trns_res[0]['pymnt_id'];
            if (trns_res[0]['pd_in'] == 1) {

                let pymnt_res = {
                    txnid: txnid,
                    pymnt_id: pymnt_id,
                    trns_sts: 'payment success'
                }

                df.formatSucessRes(req, res, pymnt_res, cntxtDtls, fnm, {});
            }
            else {
                console.log("****************** settlement api ******************")

                var hash_str = key + '|' + command + '|' + txnid + '|' + salt;
                var vcryp = crypto.createHash('sha512');
                vcryp.update(hash_str);
                var vhash = vcryp.digest('hex');
                var options = {
                    url: `http://202.53.92.35/apiv2/ext/wrapper/PayUStatusCheck`,
					headers: {
						"content-type": "application/json"
					},
					body : {
						"clnt_id" : "",
						"tnt_id" : "",
						"usr_id" : "",
						"txnid" : txnid,
						"pymnt_id" : ""
					}, 
					method: "POST",
					json: true
                };
                console.log(options);
                var content = '';
                reqpost(options)
                    .on('response', function (resp) {

                        console.log('STATUS:' + resp.statusCode);
                        resp.setEncoding('utf8');
                        resp.on('data', function (chunk) {
                            try {
                                var d = JSON.parse(chunk);
                                console.log(d);
                                //const plain = Buffer.from(d['result'], 'base64').toString('utf8')
                                //vdata = JSON.parse(plain);
                                vdata = d;
                                console.log(vdata);
                                let qr_res_data = vdata;
                                if (d.status == '1') {
                                    //details = vdata;
                                    details = vdata.transaction_details[txnid];
                                    console.log(details['status'] + '   ' + details['mihpayid']);
                                    let trns_sts_id = 3;
                                    let paidIn = 0;
                                    let trns_sts = 'failed';
                                    let pymnt_sts_id = 0;
                                    if (details['status'] == 'success') {
                                        verified = "Yes";
                                        trns_sts_id = 2;
                                        pymnt_sts_id = 2;
                                        trns_sts = 'success';
                                        paidIn = 1;
                                    }
                                    else if (details['status'] == 'pending') {
                                        pymnt_sts_id = 4;
                                        trns_sts_id = 4;
                                        trns_sts = 'pending';
                                        paidIn = 0;
                                    }
                                    else {
                                        verified = "No";
                                        trns_sts_id = 3;
                                        pymnt_sts_id = 3;
                                        trns_sts = 'failed';
                                        paidIn = 0;
                                    }

                                    var trns_qr_data = {
                                        pymnt_id: pymnt_id,
                                        bnk_upi_trns_ref_nu: txnid,
                                        txnid: txnid,
                                        bnk_trnsn_ref_nu: details['mihpayid'] ? details['mihpayid'] : '', //fill response bank uniq ref nu
                                        pymnt_sts_id: pymnt_sts_id,
                                        amount: details['amount'],
                                        mbl_nu: '', // fill customer mobile no
                                        trns_sts_id: trns_sts_id,
                                        trns_sts: trns_sts
                                    }

                                    trns_qr_data['trns_sts_id'] = trns_sts_id;
                                    trns_qr_data['pymnt_sts_id'] = pymnt_sts_id;
                                    trns_qr_data['trns_sts'] = trns_sts;



                                    prepaidlmoMdl.updateInvoicePymntDtls(trns_qr_data, details, paidIn).then((updtdtls) => {
                                        if(details['status'] == 'success'){
                                            prepaidlmoMdl.getlmoblncedata(trns_res[0]).then((lmoblncedata) => {
                                                var newblnce = parseFloat(lmoblncedata[0].balance) + parseFloat(trns_res[0].amt);
                                                console.log("newblnce",newblnce)
                                                prepaidlmoMdl.insrtUPITrnsDtlsMdl(trns_qr_data, details, qr_res_data, trns_res[0], lmoblncedata[0], newblnce, user).then((trn_insrt_res) => {
                                                    prepaidlmoMdl.updtwltlmoblncechngMdl( newblnce, trns_res[0]).then((trn_insrt_res) => {
                                                        let pymnt_res = {
                                                            txnid: txnid,
                                                            pymnt_id: pymnt_id,
                                                            trns_sts: trns_sts
                                                        }
                                                        df.formatSucessRes(req, res, pymnt_res, cntxtDtls, fnm, {});
                                                    })
                                                }).catch((err) => {
                                                    console.log(err);
                                                    df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'FAILED TO INSERT TRANSACTION DETAILS.' });
                                                })
                                            }).catch((err) => {
                                                console.log(err);
                                                df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'FAILED TO INSERT TRANSACTION DETAILS.' });
                                            })
                                        } else {
                                            df.formatSucessRes(req, res, updtdtls, cntxtDtls, fnm, {});
                                        }
                                        
                                    }).catch((err) => {
                                        console.log(err);
                                        df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'FAILED TO INSERT TRANSACTION DETAILS.' });
                                    })


                                }
                                else if (d.status == '0') {
                                    details = vdata.transaction_details[txnid];
                                    let pymnt_res = {
                                        txnid: txnid,
                                        pymnt_id: pymnt_id,
                                        trns_sts: "Transaction " + details['status']
                                    }

                                    prepaidlmoMdl.updatefailInvoicePymntDtls(txnid, details['status']).then((updtdtls) => {
                                        df.formatSucessRes(req, res, pymnt_res, cntxtDtls, fnm, {});
                                    })
                                }
                                else {
                                    df.formatErrorRes(res, "err", cntxtDtls, fnm, { err_message: 'failed to get transaction details.' });
                                }
                            }
                            catch (e) {
                                console.log("JSON ERROR")
                                console.error(e);
                                df.formatErrorRes(res, "error", cntxtDtls, fnm, { err_message: 'Failed to parse json.' });
                            }

                        });

                    })
                    .on('error', function (err) {
                        console.log("PAYMENT FAILED ERROR")
                        console.log(err);
                        df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'PAYMENT FAILED ERROR.' });
                    });


            }

        }
        else {
            df.formatErrorRes(res, "error", cntxtDtls, fnm, { err_message: 'Invalid Transaction ID.' });
        }

    }).catch((err) => {
        console.log("ERRRRRRRRRR", err)
        df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'Failed to get transaction details.' });
    })

}

/**************************************************************************************

* Controller     : dynamicUPItStlmntOpenCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.dynamicUPItStlmntOpenCtrl = (req, res) => {
    var fnm = "dynamicUPItStlmntOpenCtrl";

    var req_body = req.body.data ? req.body.data : req.body;
    req_body = replaceQuotesFromStrng(req_body);
    var user = {
        clnt_id: req_body.clnt_id,
        tnt_id: req_body.tnt_id,
        usr_id: req_body.usr_id
    }
    var salt = payUMnyCnfg.upi.salt;
    var key = payUMnyCnfg.upi.key;
    var txnid = req_body['txnid'];
    console.log("verify_payment 2985",req_body)
    var pymnt_id = null;
    var command = "verify_payment";

    prepaidlmoMdl.vrfyTrnsnStlmentMdl(txnid, user).then((trns_res) => {

        if (trns_res && trns_res.length) {
            pymnt_id = trns_res[0]['pymnt_id'];
            if (trns_res[0]['pd_in'] == 1) {

                let pymnt_res = {
                    txnid: txnid,
                    pymnt_id: pymnt_id,
                    trns_sts: 'payment success'
                }

                df.formatSucessRes(req, res, pymnt_res, cntxtDtls, fnm, {});
            }
            else {
                console.log("****************** settlement api ******************")

                var hash_str = key + '|' + command + '|' + txnid + '|' + salt;
                var vcryp = crypto.createHash('sha512');
                vcryp.update(hash_str);
                var vhash = vcryp.digest('hex');
                var options = {
                    url: `http://202.53.92.35/apiv2/ext/wrapper/PayUStatusCheck`,
					headers: {
						"content-type": "application/json"
					},
					body : {
						"clnt_id" : "",
						"tnt_id" : "",
						"usr_id" : "",
						"txnid" : txnid,
						"pymnt_id" : ""
					}, 
					method: "POST",
					json: true
                };
                console.log(options);
                var content = '';
                reqpost(options)
                    .on('response', function (resp) {

                        console.log('STATUS:' + resp.statusCode);
                        console.log('response from payu',resp)
                        resp.setEncoding('utf8');
                        resp.on('data', function (chunk) {
                            try {
                                console.log('chunk',chunk)
                                var d = JSON.parse(chunk);
                                console.log("d",d);
                                //const plain = Buffer.from(d['result'], 'base64').toString('utf8')
                                //vdata = JSON.parse(plain);
                                vdata = d;
                                console.log("vdata",vdata);
                                
                                let qr_res_data = vdata;
                                if (d.status == '1') {
                                    //details = vdata;
                                    details = vdata.transaction_details[txnid];
                                    console.log(details['status'] + '   ' + details['mihpayid']);
                                    let trns_sts_id = 3;
                                    let paidIn = 0;
                                    let trns_sts = 'failed';
                                    let pymnt_sts_id = 0;
                                    if (details['status'] == 'success') {
                                        verified = "Yes";
                                        trns_sts_id = 2;
                                        pymnt_sts_id = 2;
                                        trns_sts = 'success';
                                        paidIn = 1;
                                    }
                                    else if (details['status'] == 'pending') {
                                        pymnt_sts_id = 4;
                                        trns_sts_id = 4;
                                        trns_sts = 'pending';
                                        paidIn = 0;
                                    }
                                    else {
                                        verified = "No";
                                        trns_sts_id = 3;
                                        pymnt_sts_id = 3;
                                        trns_sts = 'failed';
                                        paidIn = 0;
                                    }

                                    var trns_qr_data = {
                                        pymnt_id: pymnt_id,
                                        bnk_upi_trns_ref_nu: txnid,
                                        txnid: txnid,
                                        bnk_trnsn_ref_nu: details['mihpayid'] ? details['mihpayid'] : '', //fill response bank uniq ref nu
                                        pymnt_sts_id: pymnt_sts_id,
                                        amount: details['amount'],
                                        mbl_nu: '', // fill customer mobile no
                                        trns_sts_id: trns_sts_id,
                                        trns_sts: trns_sts
                                    }

                                    trns_qr_data['trns_sts_id'] = trns_sts_id;
                                    trns_qr_data['pymnt_sts_id'] = pymnt_sts_id;
                                    trns_qr_data['trns_sts'] = trns_sts;

                                    prepaidlmoMdl.updateInvoicePymntDtls(trns_qr_data, details, paidIn).then((updtdtls) => {
										prepaidlmoMdl.getupdatedInvoicePymntDtls(trns_qr_data, details, paidIn).then((getupdtdtls) => { //extra code 26-05-23
										
                                        //if(details['status'] == 'success'){ //old code before 26-05-23
                                        if(getupdtdtls[0]['descr'] == 'success' || getupdtdtls[0]['descr'] == 'captured'){ //new code 26-05-23
                                            prepaidlmoMdl.getlmoblncedata(trns_res[0]).then((lmoblncedata) => {
                                                var newblnce = parseFloat(lmoblncedata[0].balance) + parseFloat(trns_res[0].amt);
                                                console.log("newblnce",newblnce)
                                                prepaidlmoMdl.insrtUPITrnsDtlsMdl(trns_qr_data, details, qr_res_data, trns_res[0], lmoblncedata[0], newblnce, user).then((trn_insrt_res) => {
                                                    prepaidlmoMdl.updtwltlmoblncechngMdl( newblnce, trns_res[0]).then((trn_insrt_res) => {
                                                        let pymnt_res = {
                                                            txnid: txnid,
                                                            pymnt_id: pymnt_id,
                                                            trns_sts: trns_sts
                                                        }
                                                        df.formatSucessRes(req, res, pymnt_res, cntxtDtls, fnm, {});
                                                    })
                                                }).catch((err) => {
                                                    console.log(err);
                                                    df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'FAILED TO INSERT TRANSACTION DETAILS.' });
                                                })
                                            }).catch((err) => {
                                                console.log(err);
                                                df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'FAILED TO INSERT TRANSACTION DETAILS.' });
                                            })
                                        } else {
                                            df.formatSucessRes(req, res, updtdtls, cntxtDtls, fnm, {});
                                        }
										
                                        })//extra code 26-05-23
                                    }).catch((err) => {
                                        console.log(err);
                                        df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'FAILED TO INSERT TRANSACTION DETAILS.' });
                                    })


                                }
                                else if (d.status == '0') {
                                    console.log(vdata.transaction_details)
                                    console.log(vdata.transaction_details[txnid])
                                    details = vdata.transaction_details[txnid];
                                    let pymnt_res = {
                                        txnid: txnid,
                                        pymnt_id: pymnt_id,
                                        trns_sts: "Transaction " + details['status']
                                    }
                                    prepaidlmoMdl.updatefailInvoicePymntDtls(txnid, details['status']).then((updtdtls) => {
                                        df.formatSucessRes(req, res, pymnt_res, cntxtDtls, fnm, {});
                                    })
                                    
                                }
                                else {
                                    df.formatErrorRes(res, "err", cntxtDtls, fnm, { err_message: 'failed to get transaction details.' });
                                }
                            }
                            catch (e) {
                                console.log("JSON ERROR")
                                console.error(e);
                                df.formatErrorRes(res, "error", cntxtDtls, fnm, { err_message: 'Failed to parse json.' });
                            }

                        });

                    })
                    .on('error', function (err) {
                        console.log("PAYMENT FAILED ERROR")
                        console.log(err);
                        df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'PAYMENT FAILED ERROR.' });
                    });


            }

        }
        else {
            df.formatErrorRes(res, "error", cntxtDtls, fnm, { err_message: 'Invalid Transaction ID.' });
        }

    }).catch((err) => {
        console.log("ERRRRRRRRRR", err)
        df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'Failed to get transaction details.' });
    })

}


/**************************************************************************************

* Controller     : dynamicSbscrUPItStlmntOpenCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.dynamicSbscrUPItStlmntOpenCtrl = (req, res) => {
    var fnm = "dynamicSbscrUPItStlmntOpenCtrl";

    var req_body = req.body.data ? req.body.data : req.body;
    req_body = replaceQuotesFromStrng(req_body);
    var user = {
        clnt_id: req_body.clnt_id,
        tnt_id: req_body.tnt_id,
        usr_id: req_body.usr_id
    }
    var salt = payUMnyCnfg.upi.salt;
    var key = payUMnyCnfg.upi.key;
    var txnid = req_body['txnid'];
    console.log("verify_payment 3196",req_body)
    var pymnt_id = null;
    var command = "verify_payment";

    prepaidlmoMdl.vrfySbscrTrnsnStlmentMdl(txnid, user).then((trns_res) => {

        if (trns_res && trns_res.length) {
            pymnt_id = trns_res[0]['pymnt_id'];
            if (trns_res[0]['pd_in'] == 1) {

                let pymnt_res = {
                    txnid: txnid,
                    pymnt_id: pymnt_id,
                    trns_sts: 'payment success'
                }

                df.formatSucessRes(req, res, pymnt_res, cntxtDtls, fnm, {});
            }
            else {
                console.log("****************** settlement api ******************")

                var hash_str = key + '|' + command + '|' + txnid + '|' + salt;
                var vcryp = crypto.createHash('sha512');
                vcryp.update(hash_str);
                var vhash = vcryp.digest('hex');
                var options = {
                    url: `http://202.53.92.35/apiv2/ext/wrapper/PayUStatusCheck`,
					headers: {
						"content-type": "application/json"
					},
					body : {
						"clnt_id" : "",
						"tnt_id" : "",
						"usr_id" : "",
						"txnid" : txnid,
						"pymnt_id" : ""
					}, 
					method: "POST",
					json: true
                };
                console.log(options);
                var content = '';
                reqpost(options)
                    .on('response', function (resp) {

                        console.log('STATUS:' + resp.statusCode);
                        console.log('response from payu',resp)
                        resp.setEncoding('utf8');
                        resp.on('data', function (chunk) {
                            try {
                                console.log('chunk',chunk)
                                var d = JSON.parse(chunk);
                                console.log("d",d);
                                //const plain = Buffer.from(d['result'], 'base64').toString('utf8')
                                //vdata = JSON.parse(plain);
                                vdata = d;
                                console.log("vdata",vdata);
                                
                                let qr_res_data = vdata;
                                if (d.status == '1') {
                                    //details = vdata;
                                    details = vdata.transaction_details[txnid];
                                    console.log(details['status'] + '   ' + details['mihpayid']);
                                    let trns_sts_id = 3;
                                    let paidIn = 0;
                                    let trns_sts = 'failed';
                                    let pymnt_sts_id = 0;
                                    if (details['status'] == 'success') {
                                        verified = "Yes";
                                        trns_sts_id = 2;
                                        pymnt_sts_id = 2;
                                        trns_sts = 'success';
                                        paidIn = 1;
                                    }
                                    else if (details['status'] == 'pending') {
                                        pymnt_sts_id = 4;
                                        trns_sts_id = 4;
                                        trns_sts = 'pending';
                                        paidIn = 0;
                                    }
                                    else {
                                        verified = "No";
                                        trns_sts_id = 3;
                                        pymnt_sts_id = 3;
                                        trns_sts = 'failed';
                                        paidIn = 0;
                                    }

                                    var trns_qr_data = {
                                        pymnt_id: pymnt_id,
                                        bnk_upi_trns_ref_nu: txnid,
                                        txnid: txnid,
                                        bnk_trnsn_ref_nu: details['mihpayid'] ? details['mihpayid'] : '', //fill response bank uniq ref nu
                                        pymnt_sts_id: pymnt_sts_id,
                                        amount: details['amount'],
                                        mbl_nu: '', // fill customer mobile no
                                        trns_sts_id: trns_sts_id,
                                        trns_sts: trns_sts
                                    }

                                    trns_qr_data['trns_sts_id'] = trns_sts_id;
                                    trns_qr_data['pymnt_sts_id'] = pymnt_sts_id;
                                    trns_qr_data['trns_sts'] = trns_sts;

                                    prepaidlmoMdl.updatesbscrInvoicePymntDtls(trns_qr_data, details, paidIn).then((updtdtls) => {
                                        if(details['status'] == 'success'){
                                            let reqMWObj = {
                                                url: "https://bbnlbss..apsfl.co.in/apiv1/subscriberApp/addCafPckgsfrmAppatom",
                                                body: {
                                                    "package_ids":req_body.cafRecord.package_ids,
                                                    "mdlw_sbscr_id":req_body.cafRecord.mdlw_sbscr_id,
                                                    "caf_id":req_body.cafRecord.caf_id,
                                                    "mnthval":req_body.cafRecord.months_val,
                                                    "cat_id": req_body.cafRecord.cat_ids
                                                },
                                                headers: {
                                                    "content-type": "application/json",
                                                },
                                                method: "POST",
                                                json: true
                                            };
                                        console.log("reqMWObj",reqMWObj);
                                        request(reqMWObj, function (err, respp, body) {
                                            if(err){
                                                prepaidlmoMdl.addCaffailedInsrtPckgsMdl("ADD SERVICE PACK",req_body.cafRecord).then((result) => {
                                                    console.log(err);
                                                })
                                            }
                                            console.log("req body",body);
                                            //if(ind == totalSize-1)
                                            res.send({status: true, data: "body"})
                                        })
                                        } else {
                                            df.formatSucessRes(req, res, updtdtls, cntxtDtls, fnm, {});
                                        }
                                        
                                    }).catch((err) => {
                                        console.log(err);
                                        df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'FAILED TO INSERT TRANSACTION DETAILS.' });
                                    })


                                }
                                else if (d.status == '0') {
                                    console.log(vdata.transaction_details)
                                    console.log(vdata.transaction_details[txnid])
                                    details = vdata.transaction_details[txnid];
                                    let pymnt_res = {
                                        txnid: txnid,
                                        pymnt_id: pymnt_id,
                                        trns_sts: "Transaction " + details['status']
                                    }
                                    prepaidlmoMdl.updatesbscrfailInvoicePymntDtls(txnid, details['status']).then((updtdtls) => {
                                        df.formatSucessRes(req, res, pymnt_res, cntxtDtls, fnm, {});
                                    })
                                    
                                }
                                else {
                                    df.formatErrorRes(res, "err", cntxtDtls, fnm, { err_message: 'failed to get transaction details.' });
                                }
                            }
                            catch (e) {
                                console.log("JSON ERROR")
                                console.error(e);
                                df.formatErrorRes(res, "error", cntxtDtls, fnm, { err_message: 'Failed to parse json.' });
                            }

                        });

                    })
                    .on('error', function (err) {
                        console.log("PAYMENT FAILED ERROR")
                        console.log(err);
                        df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'PAYMENT FAILED ERROR.' });
                    });


            }

        }
        else {
            df.formatErrorRes(res, "error", cntxtDtls, fnm, { err_message: 'Invalid Transaction ID.' });
        }

    }).catch((err) => {
        console.log("ERRRRRRRRRR", err)
        df.formatErrorRes(res, err, cntxtDtls, fnm, { err_message: 'Failed to get transaction details.' });
    })

}


/**************************************************************************************
* Controller     : enterprise call cntr
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.enterpricecallcntrCtrl = (req, res) => {

    prepaidlmoMdl.enterpricecallcntrCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });


}
/**************************************************************************************
* Controller     : enterprise call cntr
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/10/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.grievancelistCtrl = (req, res) => {

    prepaidlmoMdl.grievancelistCtrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : faccountingsbscrledgerdata
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10/1/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.faccountingsbscrledgerdata = (req, res) => {

    prepaidlmoMdl.faccountingsbscrledgerdataMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
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
* Controller     : prvsdaysuspndcafcountCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 10/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.prvsdaysuspndcafcountCtrl = (req, res) => {

    prepaidlmoMdl.prvsdaysuspndcafcountCtrlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : prvsdaysuspndcafCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 10/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.prvsdaysuspndcafCtrl = (req, res) => {

    prepaidlmoMdl.prvsdaysuspndcafCtrlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : tdyadvancerenwedcafCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 10/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.tdyadvancerenwedcafCtrl = (req, res) => {

    prepaidlmoMdl.tdyadvancerenwedcafCtrlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}


/**************************************************************************************
* Controller     : tdyadvancerenwedcafcountCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 10/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.tdyadvancerenwedcafcountCtrl = (req, res) => {

    prepaidlmoMdl.tdyadvancerenwedcafcountCtrlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : onlinecollectionwebcountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectionwebcountCtrl = (req, res) => {

    prepaidlmoMdl.onlinecollectionwebcountMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : onlinecollectionweblisttdyCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectionweblisttdyCtrl = (req, res) => {

    prepaidlmoMdl.onlinecollectionweblisttdyMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : onlinecollectionwebmtdcountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectionwebmtdcountCtrl = (req, res) => {

    prepaidlmoMdl.onlinecollectionwebmtdcountMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : onlinecollectionwebmtdlistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.onlinecollectionwebmtdlistCtrl = (req, res) => {

    prepaidlmoMdl.onlinecollectionwebmtdlistMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : todaysuspendedlistCtrl
* Parameters     : req,res()
* Description    : get details of all cafsuspended
* Change History :
* 29/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todaysuspendedlistCtrl = (req, res) => {

    prepaidlmoMdl.todaysuspendedlistMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : todaysuspendedcountCtrl
* Parameters     : req,res()
* Description    : get details of all cafsuspended
* Change History :
* 29/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.todaysuspendedcountCtrl = (req, res) => {

    prepaidlmoMdl.todaysuspendedcountMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : prepaidcafdstrtcountCtrl
* Parameters     : req,res()
* Description    : get details of all cafsuspended
* Change History :
* 29/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.prepaidcafdstrtcountCtrl = (req, res) => {

    prepaidlmoMdl.prepaidcafdstrtcountMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : versionchckforPrepaidCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.versionchckforPrepaidCtrl = (req, res) => {

    prepaidlmoMdl.versionchckforPrepaidMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getNotificationDetails
* Parameters     : req,res()
* Description    : Get Payment Details
* Change History :
* 29/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getnotificationdataCtrl = function (req, res, hndlr) {
    var fnm = "getnotificationdataCtrl";
   
    prepaidlmoMdl.getnotificationdataMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : updatenotificationdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 08/12/2021    -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.updatenotificationdataCtrl = function (req, res) {
	console.log("req.body", req.body);
	prepaidlmoMdl.updatenotificationdataMdl(req.body.data, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}


/**************************************************************************************
* Controller     : monthly collection cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.allbasepackscountCtrl = (req, res) => {

    prepaidlmoMdl.allbasepackscountMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : monthly collection cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.allbasepackslistCtrl = (req, res) => {

    prepaidlmoMdl.allbasepackslistMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : monthly collection cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.allalacartepackscountCtrl = (req, res) => {

    prepaidlmoMdl.allalacartepackscountMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : monthly renewd cafs
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.alcartecountCtrl = (req, res) => {

    prepaidlmoMdl.alcartecountMdl(req.params.id,req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : alcartelistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.alcartelistCtrl = (req, res) => {

    prepaidlmoMdl.alcartelistMdl(req.params.id,req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : planchangecountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.planchangecountCtrl = (req, res) => {

    prepaidlmoMdl.planchangecountMdl(req.params.id,req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : planchangelistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.planchangelistCtrl = (req, res) => {

    prepaidlmoMdl.planchangelistMdl(req.params.id,req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : terminateinitiatcountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.terminateinitiatcountCtrl = (req, res) => {

    prepaidlmoMdl.terminateinitiatcountMdl(req.params.id,req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : terminateinitiatlistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/2/2022   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.terminateinitiatlistCtrl = (req, res) => {

    prepaidlmoMdl.terminateinitiatlistMdl(req.params.id,req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : cafCountInsrtCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/07/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.cafCountInsrtCtrl = (req, res) => {

    prepaidlmoMdl.cafCountInsrtMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : lmotxnidsCtrl
* Parameters     : req,res()
* Description    : get details of all lmo other then success fail txn
* Change History :
* 21/10/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.lmotxnidsCtrl = (req, res) => {

    prepaidlmoMdl.lmotxnidsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}