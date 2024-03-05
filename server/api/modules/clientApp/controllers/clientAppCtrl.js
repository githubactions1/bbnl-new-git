const clientAppMdl = require(appRoot + '/server/api/modules/clientApp/models/clientAppMdl');
const addonsMdl = require(appRoot + '/server/api/modules/addons/models/addonsMdl');

var jsSHA = require('jssha');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var sms_srvc = require(appRoot + '/utils/sms.utils');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var jsonUtils = require(appRoot + '/utils/json.utils');
var _ = require('lodash');

/**************************************************************************************
* Controller     : userLogIn
* Parameters     : req,res()
* Description    : client user login
* Change History :
* 11/03/2020    -  Sony Angel K  - Initial Function
*
***************************************************************************************/
exports.userLogIn = function (req, res) {

    clientAppMdl.getLgnUsrExstMdl(req.body.data, req.user)
        .then(function (usr_rslts) {
            // console.log(usr_rslts)
            if (usr_rslts && usr_rslts.length) {
                let payload = usr_rslts[0];
                var accessToken = jwt.sign({ mrcht_usr_id: payload.mrcht_usr_id, cstmr_id: payload.cstmr_id }, 'glitssunil', {
                    algorithm: 'HS256', keyid: '1', issuer: 'glits', audience: 'http://glits.com', jwtid: '1', subject: payload.mrcht_usr_id + ''
                    // expiresIn: '24h' // expires in 24 hours
                });
                res.setHeader('x-access-token', accessToken);
                df.formatSucessRes(req, res, usr_rslts, cntxtDtls, '', {});
            }
            else
                df.formatSucessRes(req, res, { error: 'USER_NOT_EXIST' }, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : userSignUp
* Parameters     : req,res()
* Description    : client user sign up
* Change History :
* 11/03/2020    -  Sony Angel K  - Initial Function
*
***************************************************************************************/
exports.userSignUp = function (req, res) {

    clientAppMdl.getClntUsrDtlMdl(req.body.data, req.user)
        .then(function (usr_rslts) {
            if (usr_rslts && usr_rslts.length) {
                if (usr_rslts[0].cntct_mble1_nu && usr_rslts[0].mbl_nu)
                    df.formatSucessRes(req, res, { res_txt: 'USER_EXIST' }, cntxtDtls, '', {});
                if (usr_rslts[0].cntct_mble1_nu && !usr_rslts[0].mbl_nu)
                    clientAppMdl.createClntUsrMdl(req.body.data, req.user)
                        .then(function (insrt_rslts) {
                            // console.log(insrt_rslts)
                            if (insrt_rslts && insrt_rslts['insertId']) {
                                let rel_dtls = {
                                    mrcht_usr_id: insrt_rslts['insertId'],
                                    cstmr_id: usr_rslts[0].cstmr_id,
                                    mbl_nu: req.body.data.mbl_no
                                }
                                clientAppMdl.insrtMrchtCstmrRelMdl(rel_dtls, req.user)
                                    .then(function (results) {
                                        df.formatSucessRes(req, res, { res_txt: 'NEW_USER_CRTD', insrt_rslts: rel_dtls }, cntxtDtls, '', {});
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });
                            }
                            else {
                                df.formatSucessRes(req, res, { res_txt: 'USER_NOT_EXIST' }, cntxtDtls, '', {});
                            }

                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
            }
            else
                df.formatSucessRes(req, res, { res_txt: 'USER_NOT_EXIST' }, cntxtDtls, '', {});

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getSMSOTP
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getSMSOTP = function (req, res) {
    
    var totpObj = new TOTP();
    var otp = totpObj.getOTP('onetimepassword');
    var msg_tx = `Your OTP for KYC is ${otp} -Team APSFL`;
    clientAppMdl.sendOtpMdl(req.user, req.body.data,msg_tx,'1107161838508891541',otp, function (error, result) {
        if (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            return;
        }
        return df.formatSucessRes(req, res, result, cntxtDtls, '', {});
    });

    // sms_srvc.sendNotifySMS(mbl_no, `-------------AP SFL------------\nYour Mobile OTP : ${otp}, \nThank you.  \n\nw1hBg7BEZgc`,1, (err, sms_results) => {
    //     if (err) {
    //         df.formatErrorRes(req, res, err, cntxtDtls, '', {});
    //     }
    //     else {
    //         sms_results.code = otp;
    //         clientAppMdl.getSMSOTPMdl(sms_results, req.user)
    //             .then(function (results) {
    //                 df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    //             }).catch(function (error) {
    //                 df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    //             });
    //     }
    // })

}



/**************************************************************************************
* Controller     : validateOTP
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.validateOTP = function (req, res) {
    let mbl_no = req.body.data.mbl_no;
    let otp = sms_srvc.generateOTP();
    clientAppMdl.verifyOtpMdl(req.body.data, req.user)
        .then(function (results) {
            // console.log(results)
            if (results && results.length) {
                df.formatSucessRes(req, res, { opt_res_txt: 'VALID' }, cntxtDtls, '', {});
            }
            else
                df.formatSucessRes(req, res, { opt_res_txt: 'INVALID_OTP' }, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : getMyCAfPlanDetails
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getMyCAfDetails = function (req, res) {

    clientAppMdl.getMyCAfDetailsMDl(req.params.cstmr_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getMyPlanDetails
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getMyPlanDetails = function (req, res) {

    clientAppMdl.getMyPlanDetailsMdl(req.params.cstmr_id, req.params.caf_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getInternetPlanDetails
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getInternetPlanDetails = function (req, res) {

    clientAppMdl.getInternetPlanDetailsMdl(req.params.cstmr_id, req.params.caf_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getIPTVChnlCntDetails
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getIPTVChnlCntDetails = function (req, res) {

    clientAppMdl.getIPTVChnlCntDetailsMdl(req.params.cstmr_id, req.params.caf_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getCallsPlanDetails
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getCallsPlanDetails = function (req, res) {

    clientAppMdl.getCallsPlanDetailsMdl(req.params.cstmr_id, req.params.caf_id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}






/**************************************************************************************
* Controller     : getCallHistory
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getCallHistory = function (req, res) {

    clientAppMdl.getCallHistoryMdl(req.params.year, req.params.mnth, req.params.caf_id, req.params.lmt_start, req.params.lmt_end)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getHSIHistory
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getHSIHistory = function (req, res) {

    clientAppMdl.getHSIHistoryMdl(req.params.year, req.params.mnth, req.params.caf_id, req.params.lmt_start, req.params.lmt_end)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : getDueDateDetails
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getDueDateDetails = function (req, res) {

    clientAppMdl.getDueDateDetailsMdl(req.params.cstmr_id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getAllGeneres
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getAllGeneres = function (req, res) {

    clientAppMdl.getAllGeneresMdl(req.params.cstmr_id, req.user)
        .then(function (results) {
            let genere_groupRes = jsonUtils.groupJsonByKey(results, ['genre_id', 'genre_nm'], ['chnle_id', 'chnle_nm'], 'chnls', 'genre_id', 'genre_id', 'asc')
            df.formatSucessRes(req, res, genere_groupRes, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getMyChannels
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getMyChannels = function (req, res) {

    var get_chnls_cnt = (value) => {
        return value.length;
    }
    var get_chnls_lst = (value) => {
        let chnl_lst = []
        value.filter((k) => {
            chnl_lst.push({
                chnle_id: k.chnle_id,
                chnle_nm: k.chnle_nm,
                srvcpk_nm: k.srvcpk_nm,
                chrge_at: k.chrge_at,
                lnge_nm: k.lnge_nm
            })
        })
        return chnl_lst;
    }
    clientAppMdl.getMyChannelsMdl(req.params.caf_id, req.params.cstmr_id, req.user)
        .then(function (results) {
            if (results && results.length > 0) {
                let fltr_data = []
                _.forIn(_.groupBy(results, 'genre_id'), (value, key) => {
                    fltr_data.push({
                        caf_id: value[0].caf_id,
                        mbl_nu: value[0].mbl_nu,
                        adhr_nu: value[0].adhr_nu,
                        crnt_pln_id: value[0].crnt_pln_id,
                        onu_stpbx_id: value[0].onu_stpbx_id,
                        onu_srl_nu: value[0].onu_srl_nu,
                        onu_mac_addr_tx: value[0].onu_mac_addr_tx,
                        iptv_stpbx_id: value[0].iptv_stpbx_id,
                        iptv_srl_nu: value[0].iptv_srl_nu,
                        iptv_mac_addr_tx: value[0].iptv_mac_addr_tx,
                        pckge_id: value[0].pckge_id,
                        pckge_nm: value[0].pckge_nm,
                        srvcpk_nm: value[0].srvcpk_nm,
                        genre_id: value[0].genre_id,
                        genre_nm: value[0].genre_nm,
                        chrge_at: value[0].chrge_at,
                        lnge_nm: value[0].lnge_nm,
                        chnls_cnt: get_chnls_cnt(value),
                        chnls_lst: get_chnls_lst(value)
                    })
                })
                df.formatSucessRes(req, res, fltr_data, cntxtDtls, '', {});
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }


        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


exports.getCafCallhistoryCtrl = (req, res) => {
    var fnm = "getCafCallhistoryCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    clientAppMdl.getCafCallhistoryMdl(req.params.yr,req.params.mnt,req.params.cfId)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}
exports.getTotalCallChrgeCtrl = (req, res) => {
    var fnm = "getTotalCallChrgeCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    clientAppMdl.getTotalCallChrgeMdl(req.params.yr,req.params.mnt,req.params.cfId)
    .then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    });
}

/**************************************************************************************
* Controller     : getAddonsFromCAF
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getAddonsFromCAF = function (req, res) {
    var fnm = "getAddonsFromCAF";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var get_chnls_cnt = (value) => {
        return value.length;
    }
    var get_chnls_lst = (value) => {
        let chnl_lst = []
        value.filter((k) => {
            chnl_lst.push({
                chnle_id: k.chnle_id,
                chnle_nm: k.chnle_nm
            })
        })
        return chnl_lst;
    }

    clientAppMdl.getAddonsFromCAFMdl(req.params.caf_id, req.user)
        .then((results) => {
            if (results && results.length > 0) {
                let fltr_data = []
                _.forIn(_.groupBy(results, 'pckge_id'), (value, key) => {
                    fltr_data.push({
                        s_no: value[0].s_no,
                        pkge_prche_id: value[0].pkge_prche_id,
                        pckge_id: value[0].pckge_id,
                        pckge_nm: value[0].pckge_nm,
                        pkcge_idnty: value[0].pkcge_idnty,
                        pckge_type_id: value[0].pckge_type_id,
                        chrge_at: value[0].chrge_at,
                        gst_at: value[0].gst_at,
                        ttl_cst: value[0].ttl_cst,
                        srvcpk_id: value[0].srvcpk_id,
                        srvcpk_nm: value[0].srvcpk_nm,
                        efcte_dt: value[0].efcte_dt,
                        expry_dt: value[0].expry_dt,
                        extrnl_api_expry_dt: value[0].extrnl_api_expry_dt,
                        chnls_cnt: get_chnls_cnt(value),
                        chnls_lst: get_chnls_lst(value)
                    })
                })
                fltr_data = _.orderBy(fltr_data, 'pckge_type_id', 'desc');
                df.formatSucessRes(req, res, fltr_data, cntxtDtls, '', {});
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
            }
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Sorry, failed to get Addons." });
        });
}


/**************************************************************************************
* Controller     : getcafDtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getcafDtls = function (req, res) {

    clientAppMdl.getcafDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            if (results && results.length) {
                // console.log('results =--------------')
                var adrss = getEmtpyTxt(results[0].instl_addr1_tx) + getEmtpyTxt(results[0].instl_addr2_tx) + getEmtpyTxt(results[0].instl_lcly_tx) + getEmtpyTxt(results[0].instl_ara_tx) + getEmtpyTxt(results[0].vlge_nm) + getEmtpyTxt(results[0].mndl_nm) + getEmtpyTxt(results[0].dstrt_nm) + getEmtpyTxt(results[0].instl_std_cd);
                results[0]['adrss'] = adrss;
                // console.log(results[0])
            }
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

var getEmtpyTxt = (val) => {
    // console.log('----------------------------------')
    if (!val) {
        return ' ';
    }
    else {
        return val + ', ';
    }
}


/**************************************************************************************
* Controller     : getcafVoipDtls
* Parameters     : req,res()
* Description    : Get Caf Voip Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getcafVoipDtls = function (req, res) {

    clientAppMdl.getcafVoipDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getChannels
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getChannels = function (req, res) {
    var fnm = "getChannels";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    clientAppMdl.getChannelsMdl(req.params.srvc_pck_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getCAFSelectdPackage
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getCAFSelectdPackage = function (req, res) {
    var fnm = "getCAFSelectdPackage";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    clientAppMdl.getCAFSelectdPackageMdl(req.params.caf_id, req.user)
        .then((results) => {

            var common_feilds = ['agnt_id', 'agnt_nm', 'efcte_dt', 'pckge_id', 'expry_dt', 'pckge_nm'];
            var arrFeilds = ['srvcpk_id', 'srvcpk_nm', 'chrge_at', 'gst_at', 'cre_srvce_id'];
            var arrName = 'srvcs';
            var groupBy = 'pckge_id';
            var sortKey = 'pckge_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

            for (var i = 0; i < groupres.length; i++) {
                var totchrg_at = 0;
                var totgst_at = 0;
                var tot_at = 0;
                for (j = 0; j < groupres[i].srvcs.length; j++) {
                    totchrg_at = totchrg_at + groupres[i].srvcs[j].chrge_at;
                    totgst_at = totgst_at + groupres[i].srvcs[j].gst_at;
                    tot_at = totchrg_at + totgst_at
                    groupres[i]["chrg_at"] = totchrg_at.toFixed(2);
                    groupres[i]["gst_at"] = totgst_at.toFixed(2);
                    groupres[i]["total"] = tot_at.toFixed(2);
                }
            }
            // console.log(groupres)
            df.formatSucessRes(req, res, groupres, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getCafCstmrDtls
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getCafCstmrDtls = function (req, res) {
    var fnm = "getCafCstmrDtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    addonsMdl.getCafCstmrDtlsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



exports.getcafAppInvoiceDtls = function (req, res) {
    // console.log(' ---------------------------------------------- getcafAppInvoiceDtls', req.params.id)
    clientAppMdl.getcafAppInvoiceDtlsMdl(req.params.id, req.params.yr, req.user)
        .then(function (results) {
            var common_feilds = ['Payment Status', 'billdate', 'caf_invce_id', 'invce_yr', 'invce_mm', 'invce_frm_dt', 'invce_to_dt', 'tax_at', 'pd_in', 'pd_ts',
            'format(invce_at,2)', 'billend', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'prvbal', 'crrnt_bill', 'pyble_at', 'tl_at', 'duedate','pckge_nm'];
        var arrFeilds = ['chrge_cd', 'chrge_cde_id', 'chrge_at', 'ttl_amnt','ttl_tax','pckge_id', 'pckge_nm', 'chrge_frm_dt', 'chrge_to_dt', 'plan_act','sgst_at','cgst_at'];
        var arrName = 'packages';
        var groupByKey = 'caf_invce_id';
        var sortKey = 's_no'
        cstmrInvoicArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "desc");

            df.formatSucessRes(req, res, cstmrInvoicArray, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getLmoDtls = function (req, res) {
    clientAppMdl.getLmoDtlsMdl(req.params.lmoId, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getcafPckgeDtls = function (req, res) {

    clientAppMdl.getcafPckgeDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getAddOnHSIPackages
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getAddOnHSIPackages = function (req, res) {
    var fnm = "sravani-getAddOnHSIPackages";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    clientAppMdl.getAddOnHSIPackagesMdl(req.body.data, req.user)
    .then(function (results) {
        if (results && results.length > 0) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }
        else {
            df.formatSucessRes(req, res, results, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
        }
    }).catch(function (error) {
        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to get Addons." });
    });
}


exports.getApphomeCardsCtrl = function (req, res) {
    clientAppMdl.getApphomeCardsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getAppMsgsCtrl = function (req, res) {
    clientAppMdl.getAppMsgsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getYoutubeVdes = function (req, res, hndlr) {
    var fnm = "getYoutubeVdes";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    clientAppMdl.getYoutubeVdesMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getMnus = function (req, res) {
    var fnm = "getYoutubeVdes";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data = [
        {
            id: 1,
            nm: 'Home',
            img: '../assets/imgs/home/s_home.png',
            path: 'home',
            dscrp_tx: null,
            mnu_vw_in: 1
        },
        {
            id: 2,
            nm: 'My Plans',
            img: '../assets/imgs/home/s_pln.png',
            path: 'myPlan',
            dscrp_tx: null,
            mnu_vw_in: 1
        },
        {
            id: 3,
            nm: 'Settop box',
            img: '../assets/imgs/home/s_set.png',
            path: 'my-cafs',
            dscrp_tx: 'Change CAF from here',
            mnu_vw_in: 1
        },
        {
            id: 4,
            nm: 'Message Center',
            img: '../assets/imgs/home/s_msg.png',
            path: 'msg',
            dscrp_tx: null,
            mnu_vw_in: 1
        },
        {
            id: 5,
            nm: 'About',
            img: '../assets/imgs/home/s_abt.png',
            path: 'about',
            dscrp_tx: null,
            mnu_vw_in: 1
        },
        {
            id: 5,
            nm: 'Help Desk',
            img: '../assets/imgs/home/s_help.png',
            path: 'help',
            dscrp_tx: null,
            mnu_vw_in: 1
        },
        {
            id: 6,
            nm: 'Avaliable Packages',
            img: '../assets/imgs/home/s_avlPckg.png',
            path: 'avli-pckge',
            dscrp_tx: null,
            mnu_vw_in: 1
        },
        {
            id: 7,
            nm: 'Logout',
            img: '../assets/imgs/home/s_l.png',
            path: 'logout',
            dscrp_tx: null,
            mnu_vw_in: 1
        }
    ]

    df.formatSucessRes(req, res, data, cntxtDtls, '', {});
}

exports.getAvlablePackges_Ctrl = function (req, res) {
    var fnm = "getAvlablePackges_Ctrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    clientAppMdl.getAvlablePackges_Mdl(req.user)
        .then(function (results) {
            var domestic=[];
            var enterprise=[];
            for(let i=0;i<results.length;i++){
                  if(results[i].caf_type_id==1){
                    domestic.push(results[i])
                  }
                  else{
                    enterprise.push(results[i]) 
                  }
            }
            let fltrgrp=[]
            let fltr_json = [];

            _.forIn(_.groupBy(domestic, 'pckge_id'), (value, key)=>{
              let hsi = [];
              let iptv = [];
              let voip = [];
              value.filter((k)=>{
            console.log(k)
            if(k.cre_srvce_id==1){
                console.log("hsi")
                hsi.push({
                  "ky_nm": k.ky_nm,
                  "lbl_vle_tx": k.lbl_vle_tx,
                })
            }
            if(k.cre_srvce_id==2){
                console.log("iptv")
                iptv.push({
                  "ky_nm": k.ky_nm,
                  "lbl_vle_tx": k.lbl_vle_tx,
                })
            }
            if(k.cre_srvce_id==3){
                voip.push({
                    "ky_nm": k.ky_nm,
                    "lbl_vle_tx": k.lbl_vle_tx,
                  })  
            }
              })
              fltr_json.push({
                pckge_id : key,
                pckge_nm : value[0]['pckge_nm'],
                ttl_cst : value[0].ttl_cst,
                chrge_at: value[0].chrge_at,
                gst_at: value[0].gst_at,
                hsi : hsi,
                iptv : iptv,
                voip: voip
              })
            })
            _.forIn(_.groupBy(enterprise, 'pckge_id'), (value, key)=>{
                let hsi = [];
                let iptv = [];
                let voip = [];
                value.filter((k)=>{
              console.log(k)
              if(k.cre_srvce_id==1){
                  console.log("hsi")
                  hsi.push({
                    "ky_nm": k.ky_nm,
                    "lbl_vle_tx": k.lbl_vle_tx,
                  })
              }
              if(k.cre_srvce_id==2){
                  console.log("iptv")
                  iptv.push({
                    "ky_nm": k.ky_nm,
                    "lbl_vle_tx": k.lbl_vle_tx,
                  })
              }
              if(k.cre_srvce_id==3){
                console.log("vod")
                voip.push({
                  "ky_nm": k.ky_nm,
                  "lbl_vle_tx": k.lbl_vle_tx,
                })
            }
                })
                fltrgrp.push({
                  pckge_id : key,
                  pckge_nm : value[0]['pckge_nm'],
                  ttl_cst : value[0].ttl_cst,
                  chrge_at: value[0].chrge_at,
                  gst_at: value[0].gst_at,
                  hsi : hsi,
                  iptv : iptv,
                  voip: voip
                })
              })
           
            
            df.formatSucessRes(req, res, {domestic:fltr_json,enterprise:fltrgrp}, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getcafPhnenum
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 03/09/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getMyCAfMbleNum_Ctrl = function (req, res) {

    clientAppMdl.getMyCAfMbleNum_Mdl(req.params.id)
        .then(function (results) {
            if(results.length==0){
                df.formatSucessRes(req, res, {err:'USER_NOT_EXIST',msg: 'Sorry, You have no access to enter in APP. Please contact your concern LMO'}, cntxtDtls, '', {});
            }
            else{
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getcafPhnenum
* Parameters     : req,res()
* Description    : get details of all araType
* Change History :
* 03/09/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getMyCAfSrlNum_Ctrl = function (req, res) {

    clientAppMdl.getMyCAfSrlNum_Mdl(req.params.id)
        .then(function (results) {
            if(results.length==0){
                df.formatSucessRes(req, res, {err:'USER_NOT_EXIST',msg: 'Sorry, You have no access to enter in APP. Please contact your concern LMO'}, cntxtDtls, '', {});
            }
            else{
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_dueAmountCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_dueAmountCtrl = (req, res) => {
    var fnm = "get_dueAmountCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    clientAppMdl.get_dueAmountMdl(req.params.cstmrID, req.params.agentID)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : get_paymntmodesCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_paymntmodesCtrl = (req, res) => {
    var fnm = "get_paymntmodesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let results = [
        {pymnt_mde_id: 4, pymnt_mde_nm: "PhonePe", a_in: 1}
    ]
    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    // clientAppMdl.get_paymntmodesMdl()
    //     .then((results) => {
    //         df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    //     }).catch((error) => {
    //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //     });
}
/**************************************************************************************
* Controller     : get_paymntmodesCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
function TOTP() {

    var dec2hex = function (s) {
        return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    };

    var hex2dec = function (s) {
        return parseInt(s, 16);
    };

    var leftpad = function (s, l, p) {
        if (l + 1 >= s.length) {
            s = Array(l + 1 - s.length).join(p) + s;
        }
        return s;
    };

    var base32tohex = function (base32) {
        var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var bits = "";
        var hex = "";
        for (var i = 0; i < base32.length; i++) {
            var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += leftpad(val.toString(2), 5, '0');
        }
        for (var i = 0; i + 4 <= bits.length; i += 4) {
            var chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16);
        }
        return hex;
    };

    this.getOTP = function (secret) {
        try {
            var epoch = Math.round(new Date().getTime() / 1000.0);
            var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, "0");
            var hmacObj = new jsSHA("SHA-1", "HEX");
            hmacObj.setHMACKey(base32tohex(secret), "HEX");
            hmacObj.update(time);
            var hmac = hmacObj.getHMAC("HEX");
            // var hmac = hmacObj.getHMAC(base32tohex(secret), "HEX", "SHA-1", "HEX");
            var offset = hex2dec(hmac.substring(hmac.length - 1));
            var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
            otp = (otp).substr(otp.length - 6, 4);
            // // // console.log(otp)
        } catch (error) {
            throw error;
        }
        return otp;
    };

}