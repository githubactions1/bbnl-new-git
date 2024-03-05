const notifMdl = require(appRoot + '/server/api/modules/caf/models/NotifMdl');
const CustomerMdl = require(appRoot + '/server/api/modules/caf/models/CustomerMdl');
var df = require(appRoot + '/utils/dflower.utils');
var moment = require('moment');
var jsonUtils = require(appRoot + '/utils/json.utils');
// var evntCtrl = require(appRoot + '/server/api/modules/events/controllers/evntsCtrl');
// var kysCtrl = require(appRoot + '/server/api/modules/general/keys/controllers/kysCtrl');
// var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/apiMaster/controllers/apiMstrCtrl');
// var indCstmrMdl = require(appRoot + '/server/api/modules/caf/models/CustomerMdl');
// var entCstmrMdl = require(appRoot + '/server/api/modules/caf/models/EntCustomerMdl');
// var mrchntMdl = require(appRoot + '/server/api/modules/merchant/models/merchantsMdl');
// var creSrvMdl = require(appRoot + '/server/api/modules/package/models/CreSrvceMdl');
// var umMdl = require(appRoot + '/server/api/modules/general/um/models/userMgtMdl');
// var apCnst = require(appRoot + '/utils/appConstants');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var log = require(appRoot + '/utils/logmessages')
var cafBO = require(appRoot + '/server/api/modules/caf/cafBO/cafBo');
var _ = require('lodash');

/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.postNotifCtrl = function (req, res) {
    console.log(req.body)
    let apiCalls = cafBO.postNotifCall(req.body.data, req.user);
    console.log(apiCalls)
    extApiCtrl.callApi("POST NOTIFICATION", 7, 14, 0, apiCalls, req.user).then((onuRes) => {

    })
}
/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.postNotifSubUpdtCtrl = function (req, res) {
    let otp = Math.floor(1000 + Math.random() * 9000);
    notifMdl.getPostNotifMsgDtlMdl(4, req.user).then((templtRes) => {
        notifMdl.insrtOtpMdl(otp, templtRes[0].msgs_exp_min_ct, req.body.data, req.user).then((otpRes) => {
            notifMdl.insrtCustDtlUpdtMdl(otpRes.insertId, req.body.data, req.user).then((insCustDtlRes) => {
                let msgdata = {
                    cstmr_nm: req.body.data.cstmr_nm,
                    otp: otp
                }
                let notifData = {
                    "subscribercode": req.body.data.subscribercode,
                    "subject": templtRes[0].msgs_sub_tmplt_txt,
                    "message": jsonUtils.prcs_tmplte_get_url(templtRes[0].msgs_tmplt_txt, msgdata)
                }
                let apiCalls = cafBO.postNotifCall(notifData, req.user);
                extApiCtrl.callApi("POST NOTIFICATION", 7, 14, 0, apiCalls, req.user).then((notifRes) => {
                    df.formatSucessRes(req, res, { updt_id: insCustDtlRes.insertId, otp_id: otpRes.insertId }, cntxtDtls, '', req.user);
                })
                //df.formatSucessRes(req, res, { updt_id: insCustDtlRes.insertId, otp_id: otpRes.insertId }, cntxtDtls, '', req.user);
            }).catch((err) => {
                df.formatErrorRes(req, res, err, cntxtDtls, '', { error_status: "500", err_message: "Failed to update customer details." });
            })
        }).catch((err) => {
            df.formatErrorRes(req, res, err, cntxtDtls, '', { error_status: "500", err_message: "Failed to update customer details." });
        })
    }).catch((err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, '', { error_status: "500", err_message: "Failed to update customer details." });
    })
}

/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.postNotifRsndOtpCtrl = function (req, res) {
    let otp = Math.floor(1000 + Math.random() * 9000);
    notifMdl.getPostNotifMsgDtlMdl(4, req.user).then((templtRes) => {
        notifMdl.insrtOtpMdl(otp, templtRes[0].msgs_exp_min_ct, req.body.data, req.user).then((otpRes) => {
            notifMdl.updtCustDtlUpdtMdl({ otp_id: otpRes.insertId }, req.body.data, req.user).then((insCustDtlRes) => {
                let msgdata = {
                    cstmr_nm: req.body.data.cstmr_nm,
                    otp: otp
                }
                let notifData = {
                    "subscribercode": req.body.data.subscribercode,
                    "subject": templtRes[0].msgs_sub_tmplt_txt,
                    "message": jsonUtils.prcs_tmplte_get_url(templtRes[0].msgs_tmplt_txt, msgdata)
                }
                let apiCalls = cafBO.postNotifCall(notifData, req.user);
                console.log(JSON.stringify(apiCalls))
                extApiCtrl.callApi("POST NOTIFICATION", 7, 14, 0, apiCalls, req.user).then((notifRes) => {
                    df.formatSucessRes(req, res, { updt_id: insCustDtlRes.insertId, otp_id: otpRes.insertId }, cntxtDtls, '', req.user);
                })

            }).catch((err) => {
                df.formatErrorRes(req, res, err, cntxtDtls, '', { error_status: "500", err_message: "Failed to resend OTP try again." });
            })
        })
            .catch((err) => {
                df.formatErrorRes(req, res, err, cntxtDtls, '', { error_status: "500", err_message: "Failed to resend OTP try again." });
            })
    }).catch((err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, '', { error_status: "500", err_message: "Failed to resend OTP try again." });
    })
}

/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.verfyUpdtOtpCtrl = function (req, res) {
    notifMdl.getOtpByIdMdl(req.body.data.otp_id, req.user).then((otpRes) => {
        console.log(new Date(otpRes[0].exp_ts) > new Date())
        try {
            if (new Date(otpRes[0].exp_ts) > new Date()) {
                if (req.body.data.otp == otpRes[0].otp_txt) {
                    console.log("Valid OTP")
                    notifMdl.getUpdtDtaByIdMdl(req.body.data.updt_id, req.user).then((updtaDtaRes) => {
                        console.log(updtaDtaRes)
                        notifMdl.updtCustDtlMdl(updtaDtaRes[0], req.user).then((custUpdtRes) => {
                            notifMdl.updtOptVrfdStsMdl(req.body.data.updt_id, req.user).then((otpStsRes) => {
                                console.log(otpStsRes)
                                df.formatSucessRes(req, res, otpStsRes, cntxtDtls, '', req.user);
                            })

                            let mdlwrUpdtData = {
                                "subscribercode": updtaDtaRes[0].mdlwe_sbscr_id,

                                "contactno": updtaDtaRes[0].mbl_nu_updtd,
                                "emailid": updtaDtaRes[0].loc_eml1_tx_updtd,
                                "address": updtaDtaRes[0].instl_addr1_tx_updtd + ' ' + updtaDtaRes[0].instl_addr2_tx_updtd,
                                "village": updtaDtaRes[0].vlge_nm,
                                "mandal": updtaDtaRes[0].mndl_nm,
                                "districtCode": updtaDtaRes[0].dstrt_nm,
                                "stateCode": updtaDtaRes[0].ste_nm,
                                "countryCode": "INDIA",
                                "cafNumber": updtaDtaRes[0].caf_id

                            }
                            let apiCalls = cafBO.subscrbrUpdtCall(mdlwrUpdtData, req.user);
                            console.log(JSON.stringify(apiCalls))
                            extApiCtrl.callApi("UPDATE INFORMATION", 1, 6, updtaDtaRes[0].caf_id, req.user).then((updtRes) => { })

                        })

                    })
                } else {
                    df.formatErrorRes(req, res, "Invalid Otp", cntxtDtls, '', { error_status: "530", err_message: "Invalid OTP." });
                }
            } else {
                notifMdl.updtOtpMdl({ exp_in: 1 }, req.body.data, req.user)
                df.formatErrorRes(req, res, "Expired Otp", cntxtDtls, '', { error_status: "555", err_message: "Expired Otp." });

            }
        } catch (err) {
            console.log(err)
        }


    })
}


/**************************************************************************************
* Controller     : verfyCustmrFormUpdteCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.verfyCustmrFormUpdteCtrl = function (req, res) {
    console.log(req.body)
    if (req.body.data) {
        let cmpre_json = _.isEqual(req.body.data.mstr_dtls, req.body.data.updt_dtls);
        df.formatSucessRes(req, res, { cmpre: cmpre_json }, cntxtDtls, '', req.user);
    }
    else {
        df.formatErrorRes(req, res, "Invalid form details.", cntxtDtls, '', {});
    }
}




exports.getVillages = function (req, res) {
    console.log(req.params.id)
    notifMdl.getVillagesMdl(req.params.dsct_id, req.params.mndl_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



exports.getOTPPndngVrfdList = function (req, res) {
    console.log(req.params.id)
    notifMdl.getOTPPndngVrfdListMdl(req.params.agnt_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



