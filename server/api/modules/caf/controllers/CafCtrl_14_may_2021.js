const CafMdl = require(appRoot + '/server/api/modules/caf/models/CafMdl');
var df = require(appRoot + '/utils/dflower.utils');
var kysCtrl = require(appRoot + '/server/api/modules/general/keys/controllers/kysCtrl');
var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var indCstmrMdl = require(appRoot + '/server/api/modules/caf/models/CustomerMdl');
var entCstmrMdl = require(appRoot + '/server/api/modules/caf/models/EntCustomerMdl');
var mrchntMdl = require(appRoot + '/server/api/modules/merchant/models/merchantsMdl');
var creSrvMdl = require(appRoot + '/server/api/modules/package/models/CreSrvceMdl');
var umMdl = require(appRoot + '/server/api/modules/general/um/models/userMgtMdl');
var apCnst = require(appRoot + '/utils/appConstants');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var log = require(appRoot + '/utils/logmessages');
var cafBO = require(appRoot + '/server/api/modules/caf/cafBO/cafBo');
var log = require(appRoot + '/utils/logmessages');
var jsonUtils = require(appRoot + '/utils/json.utils');
var operationsUtils = require(appRoot + '/utils/operations.utils');
var lmoMnthlyOperations = require(appRoot + '/utils/lmoMnthlyOperations.js');
const EntCustMdl = require(appRoot + '/server/api/modules/caf/models/EntCustomerMdl');
//const apiMstrMdl = require(appRoot + '/server/api/modules/externalApis/models/apiMstrMdl');
var dbutil = require(appRoot + '/utils/db.utils');
var attUtil = require(appRoot + '/utils/attachment.utils');
var _ = require('lodash');
var request = require('request');
const fs = require('fs');
const mime = require('mime');

/**************************************************************************************
* Controller     : insrt_indCafCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.insrt_indCafCtrl = function (req, res) {
    console.log("insrt_indCafCtrl Enetered .... ");
    event.insertReqData("PROVISIONING", "/caf", req.body, req.user);
    // Agora format start ---------------------

    var adjstdPrt = 0;
    if (req.body.data.prv_Dtls.card == 1) {
        adjstdPrt = parseInt(req.body.data.olt_prt_nm) + 8;
    }
    else {
        adjstdPrt = parseInt(req.body.data.olt_prt_nm);
    }
    if (req.body.data.prv_Dtls["serialNumber"]) {
        if (req.body.data["onu_srl_nu"]) {
            if (req.body.data["onu_srl_nu"].toUpperCase().startsWith('DSNW')) {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"].toUpperCase().replace('DSNW', '44534E57');
            } else if (req.body.data["onu_srl_nu"].toUpperCase().startsWith('ZTEG')) {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"].toUpperCase().replace('ZTEG', '5A544547');
            } else if (req.body.data["onu_srl_nu"].toUpperCase().startsWith('YGE1')) {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"].toUpperCase().replace('YGE1', '59474531');
            } else if (req.body.data["onu_srl_nu"].toUpperCase().startsWith('KONK')) {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"].toUpperCase().replace('KONK', '4B4F4E4B');
            } else {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"];
            }
        }
    }
    req.body.data['aghra_cd'] = `${req.body.data.olt_ip_addr_tx}-${req.body.data.prv_Dtls.card}-${adjstdPrt}-${req.body.data.onu_id}-HSI`;

    req.body.data.prv_Dtls['aghra_cd'] = `${req.body.data.olt_ip_addr_tx}-${req.body.data.prv_Dtls.card}-${adjstdPrt}-${req.body.data.onu_id}-HSI`;

    req.body.data.prv_Dtls['adjstdPrt'] = adjstdPrt;
    req.body.data.prv_Dtls['address'] = req.body.data.prv_Dtls['address'].replace(/\\/, "/")

    // Agora format end ---------------------

    // AAA format start ---------------------

    var s = req.body.data.olt_ip_addr_tx
    var arr = s.split('.');

    var modifiedAaa = []
    for (var i = 2; i < arr.length; i++) {
        if (arr[i].length == 1) {
            modifiedAaa.push("00" + arr[i]);
        } else if (arr[i].length == 2) {
            modifiedAaa.push("0" + arr[i]);
        } else {
            modifiedAaa.push(arr[i]);
        }
        modified = "lag:" + modifiedAaa.join('');
    }
    var aaa_cd = modified.toLowerCase();

    req.body.data['aaa_cd'] = `${aaa_cd}:${req.body.data.prv_Dtls.card}:${req.body.data.olt_prt_nm}:${req.body.data.onu_id}`,
        req.body.data.prv_Dtls['aaa_cd'] = `${aaa_cd}:${req.body.data.prv_Dtls.card}:${req.body.data.olt_prt_nm}:${req.body.data.onu_id}`;

    // AAA format start ---------------------



    console.log("JSON.stringify(req.body.data) ------------------------------------ ");

    console.log(JSON.stringify(req.body.data))


    dbutil.getNxtKey('caf_id').then((caf_id) => {
        console.log("CAF ID generated .... ");

        let statusCall = cafBO.onuStatusCall(req.body.data, req.user)
        extApiCtrl.callApi("ONU CHECK", 1, 12, caf_id, statusCall, req.user).then((onuRes) => {
            console.log('onuRes');
            console.log(onuRes);

            if (!onuRes["res"].hasOwnProperty("id")) {
                console.log("ONU FREE")
                CafMdl.insrtCafspltrelMdl(req.body.data, caf_id, req.user).then(function (CafspltrelRes) {
                    if (CafspltrelRes.affectedRows == 0) {
                        df.formatErrorRes(req, res, CafspltrelRes, cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
                    } else {
                        console.log(JSON.stringify(req.body));
                        let prv_dtls = req.body.data.prv_Dtls;

                        let srvc_pks = [];
                        prv_dtls.srvcs.forEach((s) => {
                            if (s.cre_srvce_id == 2) {
                                srvc_pks.push({
                                    "servicepack": s.srvcpk_nm,
                                    "expirydate": "29991231"
                                })
                            }
                        })
                        prv_dtls["servicepacks"] = srvc_pks;
                        prv_dtls = Object.assign(prv_dtls, req.body.data)
                        if (prv_dtls["card"] == 1) {
                            prv_dtls["tp"] = prv_dtls["tp"] + 8;
                        }

                        let hasIptv = false;
                        let hashsi = false;
                        let hasVoip = false;
                        for (let i = 0; i < prv_dtls.srvcs.length; i++) {
                            if (prv_dtls.srvcs[i].cre_srvce_id == 1) {
                                hashsi = true;
                            } else if (prv_dtls.srvcs[i].cre_srvce_id == 2) {
                                hasIptv = true;
                            } else if (prv_dtls.srvcs[i].cre_srvce_id == 3) {
                                hasVoip = true;
                                if (req.body.data['caf_type_id'] == 1) {
                                    req.body.data["tel_cns"] = 1;
                                }
                            }
                        }




                        if (req.body.data.prnt_cstmr_id) {
                            let cstmrid = req.body.data.prnt_cstmr_id

                            //event.record('CUSTOMER', cstmrid, 'CUSTOMER_ADDED', "New Customer Added", req.user);

                            prv_dtls["cafNumber"] = caf_id;
                            CafMdl.insrtCafMdl(req.body.data, caf_id, cstmrid, req.user).then(function (cafInsRes) {
                                CafMdl.insrtCafrelMdl(req.body.data, caf_id, req.user).then(function (cafrelRes) {
                                    CafMdl.updtinvstbMdl(req.body.data, caf_id, req.user).then(function (cafbxrelRes) {
                                        CafMdl.insrtCafpckgrelMdl(req.body.data, caf_id, req.user).then(function (cafpackgrelRes) {
                                            CafMdl.insrtCafCpeCrgDtlMdl(req.body.data, caf_id, req.user).then(function (CafCpeCrgDtlRes) {
                                                umMdl.insrtusrMdl(req.body.data, req.user).then((usrInsRes) => {
                                                    prv_dtls["name"] = prv_dtls["name"].replace(/\s/g, '') + caf_id
                                                    prv_dtls["name"] = prv_dtls["name"].replace(/null/g, '')
                                                    if (hasVoip && req.body.data.tel_cns && req.body.data.tel_cns > 0) {
                                                        CafMdl.getTelNuByAgentIdMdl(req.body.data.agnt_id, req.body.data.tel_cns).then((telRes) => {
                                                            let telCnctns = []
                                                            if (telRes.length > 0) {
                                                                for (let i = 0; i < telRes.length; i++) {
                                                                    let telId = telRes[i].phne_nmbr_id
                                                                    let lata = telRes[i].phne_nu.split('-')[0]
                                                                    let telNu = telRes[i].phne_nu.replace(/-/g, '');
                                                                    // prv_dtls["telNu"] = telNu;
                                                                    let pui_lst = "tel:+91" + telNu + "$sip:+91" + telNu + "@vskp.apsflims.in"
                                                                    // let lata = lata;
                                                                    let tel_pwd = getPassword()
                                                                    let ts = getCurrentTs()
                                                                    telCnctns.push({
                                                                        telId: telId,
                                                                        telNu: telNu,
                                                                        lata: lata,
                                                                        pui_lst: pui_lst,
                                                                        tel_pwd: tel_pwd,
                                                                        ts: ts
                                                                    })

                                                                }
                                                                prv_dtls["telCnctns"] = telCnctns;

                                                            }

                                                            addPswdForTelCtrl(req.user, telCnctns).then((pwdRes) => {
                                                                addTelNuCafRelCtrl(req.user, caf_id, telCnctns).then((telRelRes) => {
                                                                    event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                                    let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                                    console.log(JSON.stringify(apiCalls))
                                                                    extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {
                                                                        console.log("Provision Done ------------------------------------------------------------------------")
                                                                        //apiMstrMdl.updtReqStsMdl(result.reqId);
                                                                        if (req.body.data.caf_type_id == 1) {
                                                                            operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                            if (req.user.usr_ctgry_id == 8)
                                                                                lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')

                                                                        }

                                                                        else if (req.body.data.caf_type_id == 2)
                                                                            operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                                        if (req.user.usr_ctgry_id == 8)
                                                                            lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                        CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                                        // df.formatErrorRes(req, res, error, cntxtDtls, '', {error_status:150, err_message:"Update entry status failed"});
                                                                    }).catch((err) => {
                                                                        console.log("Provision Failed ------------------------------------------------------------------------")
                                                                        CafMdl.updateentystsMdl(caf_id, 1, req.user);
                                                                    })
                                                                    df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                                }).catch(() => {

                                                                })

                                                            }).catch(() => {

                                                            })

                                                        }).catch(() => {

                                                        })
                                                    } else {

                                                        event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                        let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                        extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {
                                                            console.log("Provision Done ------------------------------------------------------------------------")
                                                            //apiMstrMdl.updtReqStsMdl(result.reqId);
                                                            if (req.body.data.caf_type_id == 1) {
                                                                operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                if (req.user.usr_ctgry_id == 8)
                                                                    lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                            }
                                                            else if (req.body.data.caf_type_id == 2)
                                                                operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                            if (req.user.usr_ctgry_id == 8)
                                                                lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                            CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                        }).catch((err) => {
                                                            console.log("Provision Failed ------------------------------------------------------------------------")
                                                            CafMdl.updateentystsMdl(caf_id, 1, req.user);

                                                        })
                                                        df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                    }


                                                })

                                            }).catch(function (err) {
                                                console.log(err)
                                            })

                                        }).catch(function (err) {
                                            console.log(err)
                                        })
                                    }).catch(function (err) {
                                        console.log(err)
                                    })
                                }).catch(function (err) {
                                    console.log(err)
                                })
                            }).catch(function (err) {
                                console.log(err)
                            })


                        } else {
                            CafMdl.checkCstmrAdrMdl(req.body.data, req.user).then(function (result) {
                                if (result.length > 0) {
                                    let cstmrid = result[0].cstmr_id
                                    //event.record('CUSTOMER', cstmrid, 'CUSTOMER_ADDED', "New Customer Added", req.user);
                                    prv_dtls["cafNumber"] = caf_id;
                                    CafMdl.insrtCafMdl(req.body.data, caf_id, cstmrid, req.user).then(function (cafInsRes) {
                                        CafMdl.insrtCafrelMdl(req.body.data, caf_id, req.user).then(function (cafrelRes) {
                                            CafMdl.updtinvstbMdl(req.body.data, caf_id, req.user).then(function (cafrelRes) {
                                                CafMdl.insrtCafpckgrelMdl(req.body.data, caf_id, req.user).then(function (cafpackgrelRes) {
                                                    CafMdl.insrtCafCpeCrgDtlMdl(req.body.data, caf_id, req.user).then(function (CafCpeCrgDtlRes) {
                                                        umMdl.insrtusrMdl(req.body.data, req.user).then((usrInsRes) => {
                                                            prv_dtls["name"] = prv_dtls["name"].replace(/\s/g, '') + caf_id;
                                                            prv_dtls["name"] = prv_dtls["name"].replace(/null/g, '')
                                                            if (hasVoip && req.body.data.tel_cns && req.body.data.tel_cns > 0) {
                                                                CafMdl.getTelNuByAgentIdMdl(req.body.data.agnt_id, req.body.data.tel_cns).then((telRes) => {
                                                                    let telCnctns = []
                                                                    if (telRes.length > 0) {
                                                                        for (let i = 0; i < telRes.length; i++) {
                                                                            let telId = telRes[i].phne_nmbr_id
                                                                            let lata = telRes[i].phne_nu.split('-')[0]
                                                                            let telNu = telRes[i].phne_nu.replace(/-/g, '');
                                                                            // prv_dtls["telNu"] = telNu;
                                                                            let pui_lst = "tel:+91" + telNu + "$sip:+91" + telNu + "@vskp.apsflims.in"
                                                                            // let lata = lata;
                                                                            let tel_pwd = getPassword()
                                                                            let ts = getCurrentTs()
                                                                            telCnctns.push({
                                                                                telId: telId,
                                                                                telNu: telNu,
                                                                                lata: lata,
                                                                                pui_lst: pui_lst,
                                                                                tel_pwd: tel_pwd,
                                                                                ts: ts
                                                                            })

                                                                        }
                                                                        prv_dtls["telCnctns"] = telCnctns;

                                                                    }

                                                                    addPswdForTelCtrl(req.user, telCnctns).then((pwdRes) => {
                                                                        addTelNuCafRelCtrl(req.user, caf_id, telCnctns).then((telRelRes) => {
                                                                            event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                                            let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                                            console.log(JSON.stringify(apiCalls))
                                                                            extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {

                                                                                console.log("Provision Done ------------------------------------------------------------------------")
                                                                                //  apiMstrMdl.updtReqStsMdl(result.reqId);
                                                                                if (req.body.data.caf_type_id == 1) {
                                                                                    operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                                    if (req.user.usr_ctgry_id == 8)
                                                                                        lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                                }
                                                                                else if (req.body.data.caf_type_id == 2)
                                                                                    operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                                                if (req.user.usr_ctgry_id == 8)
                                                                                    lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                                CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                                            }).catch((err) => {
                                                                                console.log("Provision Failed ------------------------------------------------------------------------")
                                                                                CafMdl.updateentystsMdl(caf_id, 1, req.user);
                                                                            })
                                                                            df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                                        }).catch(() => {

                                                                        })

                                                                    }).catch(() => {

                                                                    })

                                                                }).catch(() => {

                                                                })
                                                            } else {

                                                                event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                                let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                                extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {
                                                                    console.log("Provision Done ------------------------------------------------------------------------")
                                                                    // apiMstrMdl.updtReqStsMdl(result.reqId);
                                                                    if (req.body.data.caf_type_id == 1) {
                                                                        operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                        if (req.user.usr_ctgry_id == 8)
                                                                            lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                    }
                                                                    else if (req.body.data.caf_type_id == 2)
                                                                        operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                                    if (req.user.usr_ctgry_id == 8)
                                                                        lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                    CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                                }).catch((err) => {
                                                                    CafMdl.updateentystsMdl(caf_id, 1, req.user);
                                                                    console.log("Provision Failed------------------------------------------------------------------------")


                                                                })
                                                                df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                            }
                                                        })

                                                    }).catch(function (err) {
                                                        console.log(err)
                                                    })

                                                }).catch(function (err) {
                                                    console.log(err)
                                                })
                                            }).catch(function (err) {
                                                console.log(err)
                                            })
                                        }).catch(function (err) {
                                            console.log(err)
                                        })
                                    }).catch(function (err) {
                                        console.log(err)
                                    })


                                } else {

                                    dbutil.getNxtKey('ctmr_id').then((cstmrid) => {
                                        // prv_dtls["caf_id"] = caf_id;
                                        CafMdl.insrtCustmrMdl(req.body.data, req.user, cstmrid).then((custInsRes) => {
                                            event.record('CUSTOMER', cstmrid, 'CUSTOMER_ADDED', "New Customer Added", req.user);

                                            prv_dtls["cafNumber"] = caf_id;
                                            CafMdl.insrtCafMdl(req.body.data, caf_id, cstmrid, req.user).then(function (cafInsRes) {
                                                CafMdl.insrtCafrelMdl(req.body.data, caf_id, req.user).then(function (cafrelRes) {
                                                    CafMdl.updtinvstbMdl(req.body.data, caf_id, req.user).then(function (cafbxrelRes) {
                                                        CafMdl.insrtCafpckgrelMdl(req.body.data, caf_id, req.user).then(function (cafpackgrelRes) {
                                                            CafMdl.insrtCafCpeCrgDtlMdl(req.body.data, caf_id, req.user).then(function (CafCpeCrgDtlRes) {
                                                                umMdl.insrtusrMdl(req.body.data, req.user, 0).then((usrInsRes) => {

                                                                    prv_dtls["name"] = prv_dtls["name"].replace(/\s/g, '') + caf_id
                                                                    prv_dtls["name"] = prv_dtls["name"].replace(/null/g, '')
                                                                    if (hasVoip) {
                                                                        CafMdl.getTelNuByAgentIdMdl(req.body.data.agnt_id, req.body.data.tel_cns).then((telRes) => {
                                                                            let telCnctns = []
                                                                            if (telRes.length > 0) {
                                                                                for (let i = 0; i < telRes.length; i++) {
                                                                                    let telId = telRes[i].phne_nmbr_id
                                                                                    let lata = telRes[i].phne_nu.split('-')[0]
                                                                                    let telNu = telRes[i].phne_nu.replace(/-/g, '');
                                                                                    let pui_lst = "tel:+91" + telNu + "$sip:+91" + telNu + "@vskp.apsflims.in"
                                                                                    // let lata = lata;
                                                                                    let tel_pwd = getPassword()
                                                                                    let ts = getCurrentTs()
                                                                                    telCnctns.push({
                                                                                        telId: telId,
                                                                                        telNu: telNu,
                                                                                        lata: lata,
                                                                                        pui_lst: pui_lst,
                                                                                        tel_pwd: tel_pwd,
                                                                                        ts: ts
                                                                                    })

                                                                                }
                                                                                prv_dtls["telCnctns"] = telCnctns;

                                                                            }

                                                                            addPswdForTelCtrl(req.user, telCnctns).then((pwdRes) => {
                                                                                addTelNuCafRelCtrl(req.user, caf_id, telCnctns).then((telRelRes) => {
                                                                                    event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                                                    let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                                                    extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {
                                                                                        console.log("Provision Done ------------------------------------------------------------------------")
                                                                                        //  apiMstrMdl.updtReqStsMdl(result.reqId);
                                                                                        if (req.body.data.caf_type_id == 1) {
                                                                                            operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                                            if (req.user.usr_ctgry_id == 8)
                                                                                                lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                                        }
                                                                                        else if (req.body.data.caf_type_id == 2)
                                                                                            operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                                                        if (req.user.usr_ctgry_id == 8)
                                                                                            lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                                        CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                                                    }).catch((err) => {
                                                                                        CafMdl.updateentystsMdl(caf_id, 1, req.user);
                                                                                        console.log("Provision Failed ------------------------------------------------------------------------")
                                                                                    })
                                                                                    df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                                                }).catch(() => {

                                                                                })

                                                                            }).catch(() => {

                                                                            })

                                                                        }).catch(() => {

                                                                        })
                                                                    } else {

                                                                        event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                                        let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                                        extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {
                                                                            console.log("Provision Done ------------------------------------------------------------------------")
                                                                            // apiMstrMdl.updtReqStsMdl(result.reqId);
                                                                            if (req.body.data.caf_type_id == 1) {
                                                                                operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                                if (req.user.usr_ctgry_id == 8)
                                                                                    lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                            }
                                                                            else if (req.body.data.caf_type_id == 2)
                                                                                operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                                            if (req.user.usr_ctgry_id == 8)
                                                                                lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                            CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                                        }).catch((err) => {
                                                                            console.log("Provision Failed ------------------------------------------------------------------------")
                                                                            CafMdl.updateentystsMdl(caf_id, 1, req.user);

                                                                        })
                                                                        df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                                    }
                                                                })

                                                            }).catch(function (err) {
                                                                console.log(err)
                                                            })
                                                        }).catch(function (err) {
                                                            console.log(err)
                                                        })
                                                    }).catch(function (err) {
                                                        console.log(err)
                                                    })

                                                }).catch(function (err) {
                                                    console.log(err)
                                                })
                                            }).catch(function (err) {
                                                console.log(err)
                                            })


                                        })
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });

                                }

                            }).catch(function (err) {

                            })

                        }

                    }
                }).catch(function (err) {
                    console.log(err)
                    df.formatErrorRes(req, res, err, cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
                })
            } else {
                console.log("ONU NOT FREE")
                df.formatErrorRes(req, res, [], cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
            }

        }).catch((err) => {
            console.log(err)
        })


    }).catch(function (err) {
        console.log(err)
    })

}

/**************************************************************************************
* Controller     : insrt_entCafCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.insrt_entCafCtrl = function (req, res) {
    console.log("insrt_entCafCtrl Enetered .... ");
    event.insertReqData("PROVISIONING", "/caf", req.body, req.user);
    // Agora format start ---------------------

    var adjstdPrt = 0;
    if (req.body.data.prv_Dtls.card == 1) {
        adjstdPrt = parseInt(req.body.data.olt_prt_nm) + 8;
    }
    else {
        adjstdPrt = parseInt(req.body.data.olt_prt_nm);
    }
    if (req.body.data.prv_Dtls["serialNumber"]) {
        if (req.body.data["onu_srl_nu"]) {
            if (req.body.data["onu_srl_nu"].toUpperCase().startsWith('DSNW')) {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"].toUpperCase().replace('DSNW', '44534E57');
            } else if (req.body.data["onu_srl_nu"].toUpperCase().startsWith('ZTEG')) {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"].toUpperCase().replace('ZTEG', '5A544547');
            } else if (req.body.data["onu_srl_nu"].toUpperCase().startsWith('YGE1')) {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"].toUpperCase().replace('YGE1', '59474531');
            } else if (req.body.data["onu_srl_nu"].toUpperCase().startsWith('KONK')) {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"].toUpperCase().replace('KONK', '4B4F4E4B');
            } else {
                req.body.data.prv_Dtls["serialNumber"] = req.body.data["onu_srl_nu"];
            }
        }
    }
    req.body.data['aghra_cd'] = `${req.body.data.olt_ip_addr_tx}-${req.body.data.prv_Dtls.card}-${adjstdPrt}-${req.body.data.onu_id}-HSI`;

    req.body.data.prv_Dtls['aghra_cd'] = `${req.body.data.olt_ip_addr_tx}-${req.body.data.prv_Dtls.card}-${adjstdPrt}-${req.body.data.onu_id}-HSI`;

    req.body.data.prv_Dtls['adjstdPrt'] = adjstdPrt;
    req.body.data.prv_Dtls['address'] = req.body.data.prv_Dtls['address'].replace(/\\/, "/")

    // Agora format end ---------------------

    // AAA format start ---------------------

    var s = req.body.data.olt_ip_addr_tx
    var arr = s.split('.');

    var modifiedAaa = []
    for (var i = 2; i < arr.length; i++) {
        if (arr[i].length == 1) {
            modifiedAaa.push("00" + arr[i]);
        } else if (arr[i].length == 2) {
            modifiedAaa.push("0" + arr[i]);
        } else {
            modifiedAaa.push(arr[i]);
        }
        modified = "lag:" + modifiedAaa.join('');
    }
    var aaa_cd = modified.toLowerCase();

    req.body.data['aaa_cd'] = `${aaa_cd}:${req.body.data.prv_Dtls.card}:${req.body.data.olt_prt_nm}:${req.body.data.onu_id}`,
        req.body.data.prv_Dtls['aaa_cd'] = `${aaa_cd}:${req.body.data.prv_Dtls.card}:${req.body.data.olt_prt_nm}:${req.body.data.onu_id}`;

    // AAA format start ---------------------



    console.log("JSON.stringify(req.body.data) ------------------------------------ ");

    console.log(JSON.stringify(req.body.data))


    dbutil.getNxtKey('caf_id').then((caf_id) => {
        console.log("CAF ID generated .... ");

        let statusCall = cafBO.onuStatusCall(req.body.data, req.user)
        extApiCtrl.callApi("ONU CHECK", 1, 12, caf_id, statusCall, req.user).then((onuRes) => {
            console.log('onuRes');
            console.log(onuRes);

            if (!onuRes["res"].hasOwnProperty("id")) {
                console.log("ONU FREE")
                CafMdl.insrtCafspltrelMdl(req.body.data, caf_id, req.user).then(function (CafspltrelRes) {
                    if (CafspltrelRes.affectedRows == 0) {
                        df.formatErrorRes(req, res, CafspltrelRes, cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
                    } else {
                        console.log(JSON.stringify(req.body));
                        let prv_dtls = req.body.data.prv_Dtls;

                        let srvc_pks = [];
                        prv_dtls.srvcs.forEach((s) => {
                            if (s.cre_srvce_id == 2) {
                                srvc_pks.push({
                                    "servicepack": s.srvcpk_nm,
                                    "expirydate": "29991231"
                                })
                            }
                        })
                        prv_dtls["servicepacks"] = srvc_pks;
                        prv_dtls = Object.assign(prv_dtls, req.body.data)
                        if (prv_dtls["card"] == 1) {
                            prv_dtls["tp"] = prv_dtls["tp"] + 8;
                        }

                        let hasIptv = false;
                        let hashsi = false;
                        let hasVoip = false;
                        for (let i = 0; i < prv_dtls.srvcs.length; i++) {
                            if (prv_dtls.srvcs[i].cre_srvce_id == 1) {
                                hashsi = true;
                            } else if (prv_dtls.srvcs[i].cre_srvce_id == 2) {
                                hasIptv = true;
                            } else if (prv_dtls.srvcs[i].cre_srvce_id == 3) {
                                hasVoip = true;
                                if (req.body.data['caf_type_id'] == 1) {
                                    req.body.data["tel_cns"] = 1;
                                }
                            }
                        }
                        /// Insert Organization an take id
                        CafMdl.insrtCafStgMdl(req.body.data).then((insrtCafStgRes) => {
                            // inserting into marchent table
                            mrchntMdl.insrtMrcntMdl(req.body.data).then((insrtentcustRes) => {
                                //Generate ctmr_id
                                console.log(insrtentcustRes)
                                dbutil.getNxtKey('ctmr_id').then(function (nextId) {
                                    console.log(nextId)
                                    let cstmrid = nextId;
                                    //Inserting individual customer
                                    EntCustMdl.insrtentCstmrMdl(req.body.data, cstmrid, req.user).then((insCstrres) => {

                                        event.record('CUSTOMER', cstmrid, 'CUSTOMER_ADDED', "New Customer Added", req.user);

                                        umMdl.insrtusrMdl(req.body.data, req.user, insrtentcustRes.insertId)
                                            .then(function (results) {

                                                //let cstmrid = req.body.data.prnt_cstmr_id  //insert Id

                                                //event.record('CUSTOMER', cstmrid, 'CUSTOMER_ADDED', "New Customer Added", req.user);

                                                prv_dtls["cafNumber"] = caf_id;
                                                CafMdl.insrtCafMdl(req.body.data, caf_id, cstmrid, req.user).then(function (cafInsRes) {
                                                    CafMdl.insrtCafrelMdl(req.body.data, caf_id, req.user).then(function (cafrelRes) {
                                                        CafMdl.updtinvstbMdl(req.body.data, caf_id, req.user).then(function (cafbxrelRes) {
                                                            CafMdl.insrtCafpckgrelMdl(req.body.data, caf_id, req.user).then(function (cafpackgrelRes) {
                                                                CafMdl.insrtCafCpeCrgDtlMdl(req.body.data, caf_id, req.user).then(function (CafCpeCrgDtlRes) {
                                                                    umMdl.insrtusrMdl(req.body.data, req.user).then((usrInsRes) => {
                                                                        prv_dtls["name"] = prv_dtls["name"].replace(/\s/g, '') + caf_id
                                                                        prv_dtls["name"] = prv_dtls["name"].replace(/null/g, '')
                                                                        if (hasVoip && req.body.data.tel_cns && req.body.data.tel_cns > 0) {
                                                                            CafMdl.getTelNuByAgentIdMdl(req.body.data.agnt_id, req.body.data.tel_cns).then((telRes) => {
                                                                                let telCnctns = []
                                                                                if (telRes.length > 0) {
                                                                                    for (let i = 0; i < telRes.length; i++) {
                                                                                        let telId = telRes[i].phne_nmbr_id
                                                                                        let lata = telRes[i].phne_nu.split('-')[0]
                                                                                        let telNu = telRes[i].phne_nu.replace(/-/g, '');
                                                                                        // prv_dtls["telNu"] = telNu;
                                                                                        let pui_lst = "tel:+91" + telNu + "$sip:+91" + telNu + "@vskp.apsflims.in"
                                                                                        // let lata = lata;
                                                                                        let tel_pwd = getPassword()
                                                                                        let ts = getCurrentTs()
                                                                                        telCnctns.push({
                                                                                            telId: telId,
                                                                                            telNu: telNu,
                                                                                            lata: lata,
                                                                                            pui_lst: pui_lst,
                                                                                            tel_pwd: tel_pwd,
                                                                                            ts: ts
                                                                                        })

                                                                                    }
                                                                                    prv_dtls["telCnctns"] = telCnctns;

                                                                                }

                                                                                addPswdForTelCtrl(req.user, telCnctns).then((pwdRes) => {
                                                                                    addTelNuCafRelCtrl(req.user, caf_id, telCnctns).then((telRelRes) => {
                                                                                        event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                                                        let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                                                        console.log(JSON.stringify(apiCalls))
                                                                                        extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {
                                                                                            console.log("Provision Done ------------------------------------------------------------------------")
                                                                                            apiMstrMdl.updtReqStsMdl(result.reqId);
                                                                                            if (req.body.data.caf_type_id == 1) {
                                                                                                operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                                                if (req.user.usr_ctgry_id == 8)
                                                                                                    lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')

                                                                                            }

                                                                                            else if (req.body.data.caf_type_id == 2)
                                                                                                operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                                                            if (req.user.usr_ctgry_id == 8)
                                                                                                lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                                            CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                                                            // df.formatErrorRes(req, res, error, cntxtDtls, '', {error_status:150, err_message:"Update entry status failed"});
                                                                                        }).catch((err) => {
                                                                                            console.log("Provision Failed ------------------------------------------------------------------------")
                                                                                            CafMdl.updateentystsMdl(caf_id, 1, req.user);
                                                                                        })
                                                                                        df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                                                    }).catch(() => {

                                                                                    })

                                                                                }).catch(() => {

                                                                                })

                                                                            }).catch(() => {

                                                                            })
                                                                        } else {

                                                                            event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                                            let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                                            extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {
                                                                                console.log("Provision Done ------------------------------------------------------------------------")
                                                                                apiMstrMdl.updtReqStsMdl(result.reqId);
                                                                                if (req.body.data.caf_type_id == 1) {
                                                                                    operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                                    if (req.user.usr_ctgry_id == 8)
                                                                                        lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                                }
                                                                                else if (req.body.data.caf_type_id == 2)
                                                                                    operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                                                if (req.user.usr_ctgry_id == 8)
                                                                                    lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                                CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                                            }).catch((err) => {
                                                                                console.log("Provision Failed ------------------------------------------------------------------------")
                                                                                CafMdl.updateentystsMdl(caf_id, 1, req.user);

                                                                            })
                                                                            df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                                        }


                                                                    })

                                                                }).catch(function (err) {
                                                                    console.log(err)
                                                                })

                                                            }).catch(function (err) {
                                                                console.log(err)
                                                            })
                                                        }).catch(function (err) {
                                                            console.log(err)
                                                        })
                                                    }).catch(function (err) {
                                                        console.log(err)
                                                    })
                                                }).catch(function (err) {
                                                    console.log(err)
                                                })
                                                // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                            });
                                    }).catch(() => {

                                    })
                                }).catch(function (error) {
                                    console.log(error)
                                });
                            })
                        })







                    }
                }).catch(function (err) {
                    console.log(err)
                    df.formatErrorRes(req, res, err, cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
                })
            } else {
                console.log("ONU NOT FREE")
                df.formatErrorRes(req, res, [], cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
            }

        }).catch((err) => {
            console.log(err)
        })


    }).catch(function (err) {
        console.log(err)
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
exports.get_cafdtls = function (req, res) {
    console.log(JSON.stringify(req.user))
    CafMdl.get_cafdtlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
    // if(req.user.usr_ctgry_id == 8){
    //     CafMdl.get_cafdtllmoMdl(req.body.data, req.user)
    //     .then(function (results) {
    //         df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    //     }).catch(function (error) {
    //         df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    //     });
    // }else{

    // }

}


/**************************************************************************************
* Controller     : get_cafblkdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.get_cafblkdtls = function (req, res) {
    console.log(JSON.stringify(req.user))
    CafMdl.get_cafblkdtlMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
    // if(req.user.usr_ctgry_id == 8){
    //     CafMdl.get_cafdtllmoMdl(req.body.data, req.user)
    //     .then(function (results) {
    //         df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    //     }).catch(function (error) {
    //         df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    //     });
    // }else{

    // }

}


/**************************************************************************************
* Controller     : cafblkupld
* Parameters     : req,res()
* Description    : Add new  CafStatus
***************************************************************************************/
exports.cafblkupld = function (req, res) {
    console.log("insrt_indCafCtrl Enetered .... ");
    console.log(req.body.data.blck_upld_Dtls)
    // Agora format start ---------------------

    var adjstdPrt = 0;
    if (req.body.data.prv_Dtls.card == 1) {
        adjstdPrt = parseInt(req.body.data.olt_prt_nm) + 8;
    }
    else {
        adjstdPrt = parseInt(req.body.data.olt_prt_nm);
    }
    req.body.data['aghra_cd'] = `${req.body.data.olt_ip_addr_tx}-${req.body.data.prv_Dtls.card}-${adjstdPrt}-${req.body.data.onu_id}-HSI`;

    req.body.data.prv_Dtls['aghra_cd'] = `${req.body.data.olt_ip_addr_tx}-${req.body.data.prv_Dtls.card}-${adjstdPrt}-${req.body.data.onu_id}-HSI`;

    req.body.data.prv_Dtls['adjstdPrt'] = adjstdPrt;

    // Agora format end ---------------------

    // AAA format start ---------------------

    var s = req.body.data.olt_ip_addr_tx
    var arr = s.split('.');

    var modifiedAaa = []
    for (var i = 2; i < arr.length; i++) {
        if (arr[i].length == 1) {
            modifiedAaa.push("00" + arr[i]);
        } else if (arr[i].length == 2) {
            modifiedAaa.push("0" + arr[i]);
        } else {
            modifiedAaa.push(arr[i]);
        }
        modified = "lag:" + modifiedAaa.join('');
    }
    var aaa_cd = modified.toLowerCase();

    req.body.data['aaa_cd'] = `${aaa_cd}:${req.body.data.prv_Dtls.card}:${req.body.data.olt_prt_nm}:${req.body.data.onu_id}`,
        req.body.data.prv_Dtls['aaa_cd'] = `${aaa_cd}:${req.body.data.prv_Dtls.card}:${req.body.data.olt_prt_nm}:${req.body.data.onu_id}`;

    // AAA format start ---------------------



    console.log("JSON.stringify(req.body.data) ------------------------------------ ");

    console.log(JSON.stringify(req.body.data))

    dbutil.getNxtKey('caf_id').then(function (Caff_id) {
        dbutil.getNxtKey('ctmr_id').then(function (ctmrs_id) {
            //  var caf_id = req.body.data.blck_upld_Dtls.caf_id
            var caf_id = Caff_id
            console.log("CAF ID generated .... ");

            let statusCall = cafBO.onuStatusCall(req.body.data, req.user)
            extApiCtrl.callApi("ONU CHECK", 1, 12, caf_id, statusCall, req.user).then((onuRes) => {
                if (!onuRes["res"].hasOwnProperty("id")) {
                    console.log("ONU FREE")
                    CafMdl.insrtCafspltrelMdl(req.body.data, caf_id, req.user).then(function (CafspltrelRes) {
                        if (CafspltrelRes.affectedRows == 0) {
                            df.formatErrorRes(req, res, CafspltrelRes, cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
                        } else {
                            console.log(JSON.stringify(req.body));
                            let prv_dtls = req.body.data.prv_Dtls;

                            let srvc_pks = [];
                            prv_dtls.srvcs.forEach((s) => {
                                if (s.cre_srvce_id == 2) {
                                    srvc_pks.push({
                                        "servicepack": s.srvcpk_nm,
                                        "expirydate": "29991231"
                                    })
                                }
                            })
                            prv_dtls["servicepacks"] = srvc_pks;
                            prv_dtls = Object.assign(prv_dtls, req.body.data)
                            if (prv_dtls["card"] == 1) {
                                prv_dtls["tp"] = prv_dtls["tp"] + 8;
                            }

                            let hasIptv = false;
                            let hashsi = false;
                            let hasVoip = false;
                            for (let i = 0; i < prv_dtls.srvcs.length; i++) {
                                if (prv_dtls.srvcs[i].cre_srvce_id == 1) {
                                    hashsi = true;
                                } else if (prv_dtls.srvcs[i].cre_srvce_id == 2) {
                                    hasIptv = true;
                                } else if (prv_dtls.srvcs[i].cre_srvce_id == 3) {
                                    hasVoip = true;
                                    if (req.body.data['caf_type_id'] == 1) {
                                        req.body.data["tel_cns"] = 1;
                                    }
                                }
                            }

                            // let cstmrid = req.body.data.cstmr_id
                            // let cstmrid = req.body.data.blck_upld_Dtls.cstmr_id
                            let cstmrid = ctmrs_id
                            //event.record('CUSTOMER', cstmrid, 'CUSTOMER_ADDED', "New Customer Added", req.user);

                            prv_dtls["cafNumber"] = caf_id;
                            req.body.data["orgName"] = req.body.data["frst_nm"]
                            EntCustMdl.insrtentCstmrMdl(req.body.data, cstmrid, req.user).then((insCstrres) => {
                                CafMdl.insrtCafMdl(req.body.data, caf_id, cstmrid, req.user).then(function (cafInsRes) {
                                    CafMdl.insrtCafrelMdl(req.body.data, caf_id, req.user).then(function (cafrelRes) {
                                        CafMdl.updtinvstbMdl(req.body.data, caf_id, req.user).then(function (cafbxrelRes) {
                                            CafMdl.insrtCafpckgrelMdl(req.body.data, caf_id, req.user).then(function (cafpackgrelRes) {
                                                CafMdl.insrtCafCpeCrgDtlMdl(req.body.data, caf_id, req.user).then(function (CafCpeCrgDtlRes) {
                                                    CafMdl.updtBulkCafSts(req.body.data, req.user).then((updtRes) => {
                                                        umMdl.insrtusrMdl(req.body.data, req.user).then((usrInsRes) => {
                                                            prv_dtls["name"] = prv_dtls["name"].replace(/\s/g, '') + caf_id
                                                            prv_dtls["name"] = prv_dtls["name"].replace(/null/g, '')
                                                            if (hasVoip && req.body.data.tel_cns && req.body.data.tel_cns > 0) {
                                                                CafMdl.getTelNuByAgentIdMdl(req.body.data.agnt_id, req.body.data.tel_cns).then((telRes) => {
                                                                    let telCnctns = []
                                                                    if (telRes.length > 0) {
                                                                        for (let i = 0; i < telRes.length; i++) {
                                                                            let telId = telRes[i].phne_nmbr_id
                                                                            let lata = telRes[i].phne_nu.split('-')[0]
                                                                            let telNu = telRes[i].phne_nu.replace(/-/g, '');
                                                                            // prv_dtls["telNu"] = telNu;
                                                                            let pui_lst = "tel:+91" + telNu + "$sip:+91" + telNu + "@vskp.apsflims.in"
                                                                            // let lata = lata;
                                                                            let tel_pwd = getPassword()
                                                                            let ts = getCurrentTs()
                                                                            telCnctns.push({
                                                                                telId: telId,
                                                                                telNu: telNu,
                                                                                lata: lata,
                                                                                pui_lst: pui_lst,
                                                                                tel_pwd: tel_pwd,
                                                                                ts: ts
                                                                            })

                                                                        }
                                                                        prv_dtls["telCnctns"] = telCnctns;

                                                                    }

                                                                    addPswdForTelCtrl(req.user, telCnctns).then((pwdRes) => {
                                                                        addTelNuCafRelCtrl(req.user, caf_id, telCnctns).then((telRelRes) => {
                                                                            event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                                            let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                                            console.log(JSON.stringify(apiCalls))
                                                                            extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {
                                                                                console.log("Provision Done ------------------------------------------------------------------------")
                                                                                //   apiMstrMdl.updtReqStsMdl(result.reqId);
                                                                                if (req.body.data.caf_type_id == 1) {
                                                                                    operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                                    if (req.user.usr_ctgry_id == 8)
                                                                                        lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                                }
                                                                                else if (req.body.data.caf_type_id == 2)
                                                                                    operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                                                if (req.user.usr_ctgry_id == 8)
                                                                                    lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                                CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                                                // df.formatErrorRes(req, res, error, cntxtDtls, '', {error_status:150, err_message:"Update entry status failed"});
                                                                            }).catch((err) => {
                                                                                console.log("Provision Failed ------------------------------------------------------------------------")
                                                                                CafMdl.updateentystsMdl(caf_id, 1, req.user);


                                                                            })
                                                                            df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                                        }).catch(() => {

                                                                        })

                                                                    }).catch(() => {

                                                                    })

                                                                }).catch(() => {

                                                                })
                                                            } else {

                                                                event.record('CAF', caf_id, 'INSTALLED', "CAF New installation", req.user);
                                                                let apiCalls = cafBO.provisonCaf(prv_dtls);
                                                                extApiCtrl.callApi("CAF PROVISIONING", 1, 1, caf_id, apiCalls, req.user).then((result) => {
                                                                    console.log("Provision Done ------------------------------------------------------------------------")
                                                                    //  apiMstrMdl.updtReqStsMdl(result.reqId);
                                                                    if (req.body.data.caf_type_id == 1) {
                                                                        operationsUtils.record('indvl_caf_prvsn_ct') // Individual CAF Suspended
                                                                        if (req.user.usr_ctgry_id == 8)
                                                                            lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                    }
                                                                    else if (req.body.data.caf_type_id == 2)
                                                                        operationsUtils.record('entre_caf_prvsn_ct') // enterprise CAF suspended
                                                                    if (req.user.usr_ctgry_id == 8)
                                                                        lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky, 0, 'nw_caf_ct')
                                                                    CafMdl.updateentystsMdl(caf_id, 6, req.user);
                                                                }).catch((err) => {
                                                                    console.log("Provision Failed ------------------------------------------------------------------------")
                                                                    CafMdl.updateentystsMdl(caf_id, 1, req.user);

                                                                })
                                                                df.formatSucessRes(req, res, caf_id, cntxtDtls, '', req.user);
                                                            }


                                                        })
                                                    }).catch(function (err) {
                                                        console.log(err)
                                                    })

                                                }).catch(function (err) {
                                                    console.log(err)
                                                })

                                            }).catch(function (err) {
                                                console.log(err)
                                            })
                                        }).catch(function (err) {
                                            console.log(err)
                                        })
                                    }).catch(function (err) {
                                        console.log(err)
                                    })
                                }).catch(function (err) {
                                    console.log(err)
                                })

                            }).catch(function (err) {
                                console.log(err)
                            })


                        }
                    }).catch(function (err) {
                        console.log(err)
                        df.formatErrorRes(req, res, err, cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
                    })
                } else {
                    console.log("ONU NOT FREE")
                    df.formatErrorRes(req, res, [], cntxtDtls, '', { error_status: 150, err_message: "Split is already in use" });
                }

            })

        })
    })


}
/**************************************************************************************
* Controller     : getpckgePropertiesCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
***************************************************************************************/
exports.getpckgePropertiesCtrl = function (req, res) {


    CafMdl.getpckgePropertiesMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getentcafdt
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getentcafdt = function (req, res) {

    CafMdl.getentcafdtMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : srvpcsCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.srvpcsCtrl = function (req, res) {


    CafMdl.srvpcsMdl(req.params, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : srvpcsCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getIilcafPckgeDtls = function (req, res) {
    console.log(req.params)

    CafMdl.getIilcafPckgeDtlsMdl(req.params, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : gtFntCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.gtFntCtrl = function (req, res) {


    CafMdl.gtFntMdl(req.params, req.user)
        .then(function (results) {

            CafMdl.gtclrMdl(req.params, req.user).then(function (result1) {



                CafMdl.gtmsgTypMdl(req.params, req.user).then(function (result2) {


                    var temp = {
                        fntData: results,
                        clrData: result1,
                        msgTyp: result2
                    }

                    df.formatSucessRes(req, res, temp, cntxtDtls, '', {});

                }).catch(function (error) {

                })

            }).catch(function (error) {

            })
            //  df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : UpdateCafDtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.UpdateCafDtls = function (req, res) {

    console.log(req.body.data)
    CafMdl.UpdateCafDtlsMdl(req.body.data, req.user)
        .then(function (results) {

            CafMdl.UpdateCustmrDtlstMdl(req.body.data, req.user).then(function (resultsl) {
                df.formatSucessRes(req, res, resultsl, cntxtDtls, '', {});
            }).catch(function (err) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            })

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getcafid
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getCafId = function (req, res) {

    dbutil.getNxtKey('caf_id').then(function (id) {

        df.formatSucessRes(req, res, id, cntxtDtls, '', {});
    }).catch(function (error) {
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}
/**************************************************************************************
* Controller     : srvpcsCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getcafdetails = function (req, res) {


    CafMdl.getcafdetailsMdl(req.params, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : insrt_blkCafCtrl
* Parameters     : req,res()
* Description    : Add bulk Caf
*
***************************************************************************************/
exports.insrt_blkCafCtrl = function (req, res) {
    var cnt = 0;
    console.log("bulk upload--------------------------")
    var slctBlckData = req.body.data

    //  function insBulkUplod(slctPymntsData) {


    CafMdl.insrtblckMdl(slctBlckData, req.user, function (err, result) {


        if (err) {
            console.log("error in insert")
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        }
        else {
            df.formatSucessRes(req, res, result, cntxtDtls, '', {});
            ++cnt;
            console.log(cnt, req.body.data.length)
            if (cnt == req.body.data.length) {
                console.log(cnt)
                console.log(res)

            } else {
                //  insBulkUplod(req.body.data[cnt]);
            }
        }

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

    CafMdl.getcafDtlsMdl(req.params.id, req.user)
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
    console.log('----------------------------------')
    if (!val) {
        return ' ';
    }
    else {
        return val + ', ';
    }
}

/**************************************************************************************
* Controller     : getcafPckgeDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getcafPckgeDtls = function (req, res) {

    CafMdl.getcafPckgeDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_blkdtlsCtrl
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.get_blkdtlsCtrl = function (req, res) {

    CafMdl.get_blkdtlsMdl(req, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : AgntPckgeDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.AgntPckgeDtls = function (req, res) {
    console.log("IAMPRESENTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
    CafMdl.AgntPckgeDtls(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getAppcafPckgeDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getAppcafPckgeDtls = function (req, res) {
    CafMdl.getcafAppPckgeDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            var common_feilds = ['sno', 'caf_type_id', 'caf_type_nm', 'chrge_cde_id', 'cre_srvce_id', 'cre_srvce_nm'];
            var arrFeilds = ['pckge_id', 'pckge_nm', 'srvcpk_id', 'srvcpk_nm', 'chrge_at', 'gst_at', 'cre_srvce_id', 'cre_srvce_nm', 'chrge_cde_dscn_tx', 'srvcpk_type_nm', 'plan_act', 'plan_exp'];
            var arrName = 'srvcpcks';
            var groupBy = 'cre_srvce_id';
            var sortKey = 'cre_srvce_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getAppNwcafPckgeDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getAppNwcafPckgeDtls = function (req, res) {

    CafMdl.getcafAppPckgeDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            console.log('results --------------------')
            console.log(results);
            let pckg_fltr_json = [];
            let rtrn_srvc_pks = (srvcpks) => {
                let srvcpk_nm = []
                srvcpks.filter((k) => {
                    srvcpk_nm.push({
                        srvcpk_nm: k.srvcpk_nm
                    })
                })
                console.log('srvcpks --------------------')
                console.log(srvcpks);
                return srvcpk_nm;
            }

            let sub_corsrvc_json = (sub_json) => {
                let cresrvc = [];
                _.forIn(_.groupBy(sub_json, 'cre_srvce_id'), (value, key) => {
                    cresrvc.push({
                        cre_srvce_id: value[0]['cre_srvce_id'],
                        cre_srvce_nm: value[0]['cre_srvce_nm'],
                        srvPcks: rtrn_srvc_pks(value)
                    })
                });
                console.log('cresrvc --------------------')
                console.log(cresrvc);
                return cresrvc;
            }

            _.forIn(_.groupBy(results, 'pckge_id'), (value, key) => {
                pckg_fltr_json.push({
                    pckge_id: value[0]['pckge_id'],
                    pckge_nm: value[0]['pckge_nm'],
                    srvcpk_type_nm: value[0]['srvcpk_type_nm'],
                    chrge_at: value[0]['chrge_at'],
                    gst_at: value[0]['gst_at'],
                    plan_act: value[0]['plan_act'],
                    plan_exp: value[0]['plan_exp'],
                    cresrvs: sub_corsrvc_json(value)
                })
            })
            console.log('pckg_fltr_json --------------------')
            console.log(pckg_fltr_json);
            df.formatSucessRes(req, res, pckg_fltr_json, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have packages" });
        });
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

    CafMdl.getcafVoipDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getcafAppVoipDtls = function (req, res) {

    CafMdl.getcafAppVoipDtlsMdl(req.params.id, req.params.yr, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getcafHsiDtls
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getcafHsiDtls = function (req, res) {

    CafMdl.getcafHsiDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            // let sum_upld = 1;
            // let sum_dnld = 1;
            // var hsiusage = [];
            // for (var j = 0; j < results.length; j++) {
            //     for (var i = 1; i <= 31; i++) {

            //         sum_upld += results[j][`dy_up_${i}`];
            //         sum_dnld += results[j][`dy_dw_${i}`];
            //     }
            //     hsiusage.push({
            //         'sno': results[j].s_no,
            //         'year': results[j].yr_ct,
            //         'month': results[j].mnt_ct,
            //         'upldsize': Math.round(((sum_upld / 1024) / 1024 / 1024)),
            //         'dwnldsize': Math.round(((sum_dnld / 1024) / 1024 / 1024)),
            //         'totalsize': Math.round(((sum_upld / 1024) / 1024 / 1024)) + Math.round(((sum_dnld / 1024) / 1024 / 1024))
            //     })

            // }
            var common_feilds = ['s_no', 'yr_ct', 'mnt_ct', 'TD', 'TU', 'total', 'mnth_usge_lmt_ct'];
            var arrFeilds = ['day_1_TU', 'day_1_TD', 'day_2_TU', 'day_2_TD', 'day_3_TU', 'day_3_TD', 'day_4_TU', 'day_4_TD', 'day_5_TU', 'day_5_TD', 'day_6_TU', 'day_6_TD', 'day_7_TU', 'day_7_TD', 'day_8_TU', 'day_8_TD', 'day_9_TU', 'day_9_TD', 'day_10_TU', 'day_10_TD', 'day_11_TU', 'day_11_TD', 'day_12_TU', 'day_12_TD', 'day_13_TU', 'day_13_TD', 'day_14_TU', 'day_14_TD', 'day_15_TU', 'day_15_TD', 'day_16_TU', 'day_16_TD', 'day_17_TU', 'day_17_TD', 'day_18_TU', 'day_18_TD', 'day_19_TU', 'day_19_TD', 'day_20_TU', 'day_20_TD', 'day_21_TU', 'day_21_TD', 'day_22_TU', 'day_22_TD', 'day_23_TU', 'day_23_TD', 'day_24_TU', 'day_24_TD', 'day_25_TU', 'day_25_TD', 'day_26_TU', 'day_26_TD', 'day_27_TU', 'day_27_TD', 'day_28_TU', 'day_28_TD', 'day_29_TU', 'day_29_TD', 'day_30_TU', 'day_30_TD', 'day_31_TU', 'day_31_TD'];
            var arrName = 'eachday';
            var groupBy = 'mnt_ct';
            var sortKey = 'mnt_ct';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getAppcafHsiDtls = function (req, res) {

    CafMdl.getAppcafHsiDtlsMdl(req.params.id, req.params.yr, req.user)
        .then(function (results) {
            console.log('results============================');
            console.log(results)
            // let sum_upld = 1;
            // let sum_dnld = 1;
            // var hsiusage = [];
            // for (var j = 0; j < results.length; j++) {
            //     for (var i = 1; i <= 31; i++) {

            //         sum_upld += results[j][`dy_up_${i}`];
            //         sum_dnld += results[j][`dy_dw_${i}`];
            //     }
            //     hsiusage.push({
            //         'sno': results[j].s_no,
            //         'year': results[j].yr_ct,
            //         'month': results[j].mnt_ct,
            //         'mnt_ct': results[j].mnt_ct,
            //         'yr_ct': results[j].yr_ct,
            //         'upldsize': Math.round(((sum_upld / 1024) / 1024 / 1024)),
            //         'dwnldsize': Math.round(((sum_dnld / 1024) / 1024 / 1024)),
            //         'totalsize': Math.round(((sum_upld / 1024) / 1024 / 1024)) + Math.round(((sum_dnld / 1024) / 1024 / 1024))
            //     })

            // }

            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getcafInvoiceDtls
* Parameters     : req,res()
* Description    : Get Caf Invoice Details
* Change History :
* 27-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getcafInvoiceDtls = function (req, res) {
    CafMdl.getcafInvoiceDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getcafInvoice_ctrl
* Parameters     : req,res()
* Description    : Get Caf Invoice Details
* Change History :
* 26-08-2020    -  sravani Machana  - Initial Function
*
***************************************************************************************/
exports.getcafInvoice_ctrl = function (req, res) {
    CafMdl.getcafInvoice_Mdl(req.params.id, req.params.yr, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


exports.getcafAppInvoiceDtls = function (req, res) {
    console.log(' ---------------------------------------------- getcafAppInvoiceDtls', req.params.id)
    CafMdl.getcafAppInvoiceDtlsMdl(req.params.id, req.params.yr, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getcafInvoiceChargesDtls
* Parameters     : req,res()
* Description    : Get Caf Invoice Cbarges Details
* Change History :
* 02-04-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getcafInvoiceChargesDtls = function (req, res) {

    console.log(' ---------------------------------------------- getcafInvoiceChargesDtls', req.params.id)
    CafMdl.getcafInvoiceChargesDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getcafAppInvoiceChargesDtlsCtrl = function (req, res) {

    CafMdl.getcafAppInvoiceChargesDtlsMdl(req.params.id, req.params.yr, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getcafClctnInvoiceChargesDtls
* Parameters     : req,res()
* Description    : Get Caf Invoice Cbarges Details
* Change History :
* 02-04-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getcafClctnInvoiceChargesDtls = function (req, res) {

    console.log(' ---------------------------------------------- getcafClctnInvoiceChargesDtls', req.params.id)
    CafMdl.getcafClctnInvoiceChargesMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getsuborgtyp
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getBoxDtls = function (req, res) {

    CafMdl.getBoxDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            console.log(results);
            if (results && results[0].srl_nu != null && results[0].caf_cnt == 0) {
                console.log('in step 1');
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }
            else if (results && results[0].srl_nu != null && results[0].caf_cnt > 0) {
                console.log('in step 2');
                df.formatErrorRes(req, res, results, cntxtDtls, '', { error_status: 500, err_message: "Scanned Box is already in use" });
            }
            else if (results && results[0].srl_nu == null && results[0].caf_cnt == 0) {
                console.log('in step 3');
                df.formatErrorRes(req, res, results, cntxtDtls, '', { error_status: 500, err_message: "Invalid Serial Number" });
            }
            else {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {
                    error_status: 700,
                    err_message: "Database error"
                });
            }

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getPopDtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getPopDtls = function (req, res) {

    CafMdl.getPopDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getPopDtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getPop = function (req, res) {
    console.log(req.body.data)
    CafMdl.getPopMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getallPop
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getallPop = function (req, res) {
    console.log(req.body.data)
    CafMdl.getallPopMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : addPop
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.addPop = function (req, res) {
    console.log(req.body.data)
    CafMdl.addPopMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getPopDtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.updtblkcafdtlsCtrl = function (req, res) {
    console.log(req.body.data)
    CafMdl.updtblkcafdtlsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getPopDtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.dltblkcafdtlsCtrl = function (req, res) {
    console.log(req.body.data)
    CafMdl.dltblkcafdtlsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getpoploc
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getpoploc = function (req, res) {
    console.log(req.user, '------------------------')
    if (req.user.mrcht_usr_id == 101004190) {
        CafMdl.getpoplocMdl(req.params.id, req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });

    } else {
        CafMdl.getgetpoplocMdl(req.params.id, req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }


}

/**************************************************************************************
* Controller     : getAgntCafDetailsCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  Ramya  - Initial Function
*
***************************************************************************************/
exports.getAgntCafDetailsCtrl = function (req, res) {
    var fnm = "getAgntCafDetailsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    CafMdl.getAgntCafDetailsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : getAgntCafDetailsWthLmtCndtn
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  Ramya  - Initial Function
*
***************************************************************************************/
exports.getAgntCafDetailsWthLmtCndtn = function (req, res) {
    var fnm = "getAgntCafDetailsWthLmtCndtn";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    CafMdl.getAgntCafDetailsWthLmtCndtnMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getTotalAgentCafCnts
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  ganesh  - Initial Function
*
***************************************************************************************/
exports.getpopsbyditstcCtrl = function (req, res) {
    var fnm = "getTotalAgentCafCnts";
    log.info(`In ${fnm}`, 0, cntxtDtls);


    CafMdl.getpopsbyditstcMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  ganesh  - Initial Function
*
***************************************************************************************/
exports.agntdstrcs = function (req, res) {
    var fnm = "agntdstrcs";
    log.info(`In ${fnm}`, 0, cntxtDtls);


    CafMdl.agntdstrcsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  ganesh  - Initial Function
*
***************************************************************************************/
exports.agntmndls = function (req, res) {
    var fnm = "agntmndls";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    console.log(req.params.dstrc_id)
    CafMdl.agntmndlsMdl(req.params.dstrc_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  ganesh  - Initial Function
*
***************************************************************************************/
exports.agntvlgs = function (req, res) {
    var fnm = "agntvlgs";
    log.info(`In ${fnm}`, 0, cntxtDtls);


    CafMdl.agntvlgsMdl(req.params.mndl_id, req.params.dstrc_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getTotalAgentCafCnts
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  Ramya  - Initial Function
*
***************************************************************************************/
exports.getTotalAgentCafCnts = function (req, res) {
    var fnm = "getTotalAgentCafCnts";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    CafMdl.getTotalAgentCafCntsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getCafBySearchCtrl
* Parameters     : req,res()
* Change History :
* 03/10/2020    -  sravani  - Initial Function
*
***************************************************************************************/
exports.getCafBySearchCtrl = function (req, res) {
    var fnm = "getCafBySearchCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let check = req.params.value;

    CafMdl.getCafBySearchMdl(check)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getTrmndCafsByAgntCtrl
* Parameters     : req,res()
* Description    : Get terminated cafs by agent
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getTrmndCafsByAgntCtrl = function (req, res) {
    var fnm = "getTrmndCafsByAgntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    CafMdl.getTrmndCafsByAgntMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : rejectTerminationCtrl
* Parameters     : req,res()
* Description    : Reject Termination CAF
* Change History :
*
***************************************************************************************/
exports.rejectTerminationCtrl = function (req, res) {
    var fnm = "rejectTerminationCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    CafMdl.rejectTerminationMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : postTrmndCafsByAgntCtrl
* Parameters     : req,res()
* Description    : Insert terminated cafs by agent
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.postTrmndCafsByAgntCtrl = function (req, res) {
    var fnm = "postTrmndCafsByAgntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    function cafTrmndPostFn(cafData, user) {
        CafMdl.checkTrmndCafsByAgntMdl(cafData, user)
            .then((cafTrmndresults) => {
                if (cafTrmndresults.length > 0) {
                    let res_trmnd_reslts = [];
                    df.formatSucessRes(req, res, res_trmnd_reslts, cntxtDtls, fnm, { success_status: 200, success_msg: 'CAF already added to termination' });
                } else {
                    CafMdl.postTrmndCafsByAgntMdl(cafData, user)
                        .then((results) => {
                            if (results) {
                                CafMdl.updateCafDtlFrTrmndReqMdl(cafData, user)
                                    .then((cafresults) => {
                                        if (cafresults) {
                                            ct++;
                                            if (ct == req.body.data.length) {
                                                let res_reslts = [{
                                                    'res': "ok"
                                                }]
                                                df.formatSucessRes(req, res, res_reslts, cntxtDtls, fnm, {});
                                            } else {
                                                cafTrmndPostFn(req.body.data[ct], req.user);
                                            }
                                        }
                                    }).catch((error) => {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });
                            }
                            // ct++;
                            // if (ct == req.body.data.length) {
                            //     df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            // } else {
                            //     cafTrmndPostFn(req.body.data[ct], req.user);
                            // }
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
    cafTrmndPostFn(req.body.data[ct], req.user);
}

/**************************************************************************************
* Controller     : getTrmndReqCafsCtrl
* Parameters     : req,res()
* Description    : Get request terminated cafs pending for approval
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getTrmndReqCafsCtrl = function (req, res) {
    var fnm = "getTrmndReqCafsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    CafMdl.getTrmndReqCafsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updateTrmndCafsCtrl
* Parameters     : req,res()
* Description    : Update request terminated cafs approval
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.updateTrmndCafsCtrl = function (req, res) {
    var fnm = "updateTrmndCafsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    event.insertReqData("TERMINATION", "/terminate/cafs/approval", req.body, req.user);
    var ct = 0;
    var cafRevData;
    function cafTrmndUpdateFn(cafData, user) {
        CafMdl.getCafTerminationDtlsMdl(cafData, user)
            .then((results) => {
                var common_feilds = ['caf_id', 'caf_nu', 'caf_type_id', 'aghra_cd', 'subscriberCodes', 'mbl_nu', 'aaa_cd', 'ts', 'mso_agnt_id', 'lmo_agnt_id'];
                var arrFeilds = ['telNu', 'tel_pwd'];
                var arrName = 'telCnctns';
                var groupBy = 'caf_id';
                var sortKey = 'caf_id';
                var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

                cafRevData = groupres[0];
                let telCnctns = []

                if (cafRevData.telCnctns && cafRevData.telCnctns.length > 0) {

                    for (let i = 0; i < cafRevData.telCnctns.length; i++) {

                        let telId = cafRevData.telCnctns[i].phne_nmbr_id
                        let lata = cafRevData.telCnctns[i].telNu.split('-')[0]
                        let telNu = cafRevData.telCnctns[i].telNu.replace(/-/g, '');

                        let pui_lst = "tel:+91" + telNu + "$sip:+91" + telNu + "@vskp.apsflims.in"

                        let tel_pwd = getPassword()
                        let ts = getCurrentTs()
                        telCnctns.push({
                            telId: telId,
                            telNu: telNu,
                            lata: lata,
                            pui_lst: pui_lst,
                            tel_pwd: tel_pwd,
                            ts: ts
                        })

                    }
                }
                cafRevData["telCnctns"] = telCnctns;
                let apiCalls = cafBO.terminationCalls(cafRevData);
                extApiCtrl.callApi("CAF TERMINATION", 1, 4, cafRevData.caf_nu, apiCalls, req.user).then((result) => {
                    //     if (cafRevData.caf_type_id == 1) { 
                    //         operationsUtils.record('indvl_caf_trmn_ct')
                    //     if(req.user.usr_ctgry_id==8)
                    //     lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky,0,'trmnd_caf_ct') 
                    // } // Individual CAF Terminated
                    //     else if (cafRevData.caf_type_id == 2) { operationsUtils.record('entre_caf_trmn_ct') 
                    //     if(req.user.usr_ctgry_id==8)
                    //     lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky,0,'trmnd_caf_ct')
                    // } // enterprise CAF Terminated
                    // CafMdl.updateentystsMdl(caf_id, 6, req.user);
                    CafMdl.updateTrmndCafsMdl(cafData, user)
                        .then((results) => {
                            CafMdl.updateTrmndCafsInvntryStpBxMdl(cafData, user)
                                .then((cafInvntryStpBxresults) => {
                                    if (cafInvntryStpBxresults) {
                                        CafMdl.updateTrmndCafsStpBxDtlsMdl(cafData, user)
                                            .then((cafStpBxresults) => {
                                                if (cafStpBxresults) {
                                                    CafMdl.updateTrmndCafsOltPrtsMdl(cafData, user)
                                                        .then((cafOltPrtsresults) => {
                                                            if (cafOltPrtsresults) {
                                                                CafMdl.updateTrmndCafsVoipDtlsMdl(cafData, user)
                                                                    .then((cafvoipresults) => {
                                                                        if (cafvoipresults) {
                                                                            CafMdl.updateCafDtlFrTrmndMdl(cafData, user)
                                                                                .then((cafresults) => {
                                                                                    if (cafresults) {
                                                                                        ct++;
                                                                                        if (ct == req.body.data.length) {
                                                                                            if (cafRevData.caf_type_id == 1) {
                                                                                                operationsUtils.record('indvl_caf_trmn_ct')
                                                                                                lmoMnthlyOperations.lmooperation(cafRevData.lmo_agnt_id, cafRevData.mso_agnt_id, 'trmnd_caf_ct')
                                                                                            } // Individual CAF Terminated
                                                                                            else if (cafRevData.caf_type_id == 2) {
                                                                                                operationsUtils.record('entre_caf_trmn_ct')
                                                                                                lmoMnthlyOperations.lmooperation(cafRevData.lmo_agnt_id, cafRevData.mso_agnt_id, 'trmnd_caf_ct')
                                                                                            } // enterprise CAF Terminated
                                                                                            // operationsUtils.record('indvl_caf_trmn_ct')
                                                                                            // if(req.user.usr_ctgry_id==8)
                                                                                            // lmoMnthlyOperations.lmooperation(req.user.usr_ctgry_ky,0,'trmnd_caf_ct')
                                                                                            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                                                                        } else {
                                                                                            cafTrmndUpdateFn(req.body.data[ct], req.user);
                                                                                        }
                                                                                    }
                                                                                }).catch((error) => {
                                                                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                                });
                                                                        }
                                                                    }).catch((error) => {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                                    });
                                                            }
                                                        }).catch((error) => {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                        });
                                                }
                                            }).catch((error) => {
                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                            });
                                    }
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });

                }).catch((err) => {
                    console.log("Failed" + JSON.stringify(err))
                    //   df.formatErrorRes(req, res, err, cntxtDtls, '', {});

                })
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
    cafTrmndUpdateFn(req.body.data[ct], req.user);
}


/**************************************************************************************
* Controller     : getTrmndAprvdCafsByUsrCtrl
* Parameters     : req,res()
* Description    : Get termination approved cafs by user
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getTrmndAprvdCafsByUsrCtrl = function (req, res) {
    var fnm = "getTrmndAprvdCafsByUsrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    CafMdl.getTrmndAprvdCafsByUsrMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getagntid
* Parameters     : req,res()
* Description    : Get termination approved cafs by user
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getagntidCtrl = function (req, res) {
    var fnm = "getagntidCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    console.log(req.params.lmo_cd)
    CafMdl.getagntidMdl(req.params.lmo_cd, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getagntid
* Parameters     : req,res()
* Description    : Get termination approved cafs by user
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.get_blkCafCtrl = function (req, res) {
    var fnm = "get_blkCafCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // console.log(req.params.lmo_cd)

    CafMdl.get_blkCafMdl(req.params.lmo_cd, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getTrmndAprvdCafsRcntCtrl
* Parameters     : req,res()
* Description    : Get recent termination approved cafs
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getTrmndAprvdCafsRcntCtrl = function (req, res) {
    var fnm = "getTrmndAprvdCafsRcntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    CafMdl.getTrmndAprvdCafsRcntMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updateTrmndCafsRjctCtrl
* Parameters     : req,res()
* Description    : Update request terminated cafs approval
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.updateTrmndCafsRjctCtrl = function (req, res) {
    var fnm = "updateTrmndCafsRjctCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    function cafTrmndUpdateFn(cafData, user) {
        CafMdl.updateTrmndDtlFrRjctMdl(cafData, user)
            .then((cafreqresults) => {
                CafMdl.updateCafDtlFrTrmndRjctMdl(cafData, user)
                    .then((cafresults) => {
                        if (cafresults) {
                            ct++;
                            if (ct == req.body.data.length) {
                                df.formatSucessRes(req, res, cafresults, cntxtDtls, fnm, {});
                            } else {
                                cafTrmndUpdateFn(req.body.data[ct], req.user);
                            }
                        }
                    }).catch((error) => {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
    cafTrmndUpdateFn(req.body.data[ct], req.user);
}
/**************************************************************************************
* Controller     : stpbxallocated
* Parameters     : req,res()
* Description    : 
*
***************************************************************************************/
exports.stpbxallocated = function (req, res) {
    var fnm = "stpbxallocated";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    CafMdl.stpbxallocatedMdl(req.params.stpbx_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getPaidStatusLstCtrl
* Parameters     : req,res()
*
***************************************************************************************/
exports.getPaidStatusLstCtrl = function (req, res) {
    var fnm = "getPaidStatusLstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    CafMdl.getPaidStatusLstMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : getPymntCntsCtrl
* Parameters     : req,res()
*
***************************************************************************************/
exports.getPymntCntsCtrl = function (req, res) {
    var fnm = "getPymntCntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getPymntCntsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : stpbxallocated
* Parameters     : req,res()
* Description    : 
*
***************************************************************************************/
exports.getspltdetails = function (req, res) {
    var fnm = "getspltdetails";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    CafMdl.getspltdetailsMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getAgntSummaryDetailsCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Summary Details
* Change History :
* 31/03/2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getAgntSummaryDetailsCtrl = function (req, res) {
    var fnm = "getAgntSummaryDetailsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    CafMdl.getAgntSummaryDetailsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getCstmr_dtlsCtrl
* Parameters     : req,res()
* Description    : Get cstmr Summary Details
* Change History :
*
***************************************************************************************/
exports.getCstmr_dtlsCtrl = function (req, res) {
    var fnm = "getCstmr_dtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getCstmr_dtlsMdl(req.params.cstmr_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : getcstmrdtCtrl
* Parameters     : req,res()
* Description    : Get cstmr Summary Details
* Change History :
*
***************************************************************************************/
exports.getcstmrdtCtrl = function (req, res) {
    var fnm = "getcstmrdtCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getcstmrdtMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : cstmrDtlsUpdtnCtrl
* Parameters     : req,res()
* Description    : Updating Customer Details
* Change History :
*
***************************************************************************************/
exports.cstmrDtlsUpdtnCtrl = function (req, res) {
    var fnm = "cstmrDtlsUpdtnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data, '++++++++++++++++++++++++++++++++++++++++data')
    CafMdl.cstmrDtlsUpdtnMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : updatecstmrDtlsCtrl
* Parameters     : req,res()
* Description    : Updating Customer Details
* Change History :
*
***************************************************************************************/
exports.updatecstmrDtlsCtrl = function (req, res) {
    var fnm = "updatecstmrDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data, '++++++++++++++++++++++++++++++++++++++++data')
    CafMdl.updatecstmrDtlsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getCstmr_dtlsCtrl
* Parameters     : req,res()
* Description    : Get cstmr Summary Details
* Change History :
*
***************************************************************************************/
exports.getCstmr_dtlsCtrl = function (req, res) {
    var fnm = "getCstmr_dtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getCstmr_dtlsMdl(req.params.cstmr_id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : cstmrDtlsUpdtnCtrl
* Parameters     : req,res()
* Description    : Updating Customer Details
* Change History :
*
***************************************************************************************/
exports.cstmrDtlsUpdtnCtrl = function (req, res) {
    var fnm = "cstmrDtlsUpdtnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    CafMdl.cstmrDtlsUpdtnMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getCustomerSegmntDtaCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.getCustomerSegmntDtaCtrl = function (req, res) {
    var fnm = "getCustomerSegmntDtaCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var segmnetJson = [
        // {
        //     id: 5,
        //     nm: 'ONT Details'
        // },
        {
            id: 1,
            nm: 'Package'
        },
        {
            id: 2,
            nm: 'VOIP Usage'
        },
        {
            id: 3,
            nm: 'HSI Usage'
        },
        {
            id: 4,
            nm: 'Invoice'
        },
    ]
    df.formatSucessRes(req, res, segmnetJson, cntxtDtls, fnm, {});
}

exports.getCustomerNewSegmntDtaCtrl = function (req, res) {
    var fnm = "getCustomerNewSegmntDtaCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var segmnetJson = [
        {
            id: 5,
            nm: 'ONT Details'
        },
        {
            id: 1,
            nm: 'Package'
        },
        {
            id: 2,
            nm: 'VOIP Usage'
        },
        {
            id: 3,
            nm: 'HSI Usage'
        },
        {
            id: 4,
            nm: 'Invoice'
        }

    ]
    df.formatSucessRes(req, res, segmnetJson, cntxtDtls, fnm, {});
}

/**************************************************************************************
* Controller     : getCustomerSlctdSegmntDtaCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.getCustomerSlctdSegmntDtaCtrl = function (req, res) {
    var fnm = "getCustomerSlctdSegmntDtaCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    if (req.params.id == 1) {
        CafMdl.getcafAppPckgeDtlsMdl(req.params.cafID, req.user)
            .then(function (results) {
                if (results && results.length == 0) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have packages" });
                }
                else {
                    var common_feilds = ['sno', 'caf_type_id', 'caf_type_nm', 'chrge_cde_id', 'cre_srvce_id', 'cre_srvce_nm'];
                    var arrFeilds = ['pckge_id', 'pckge_nm', 'srvcpk_id', 'srvcpk_nm', 'chrge_at', 'gst_at', 'cre_srvce_id', 'cre_srvce_nm', 'chrge_cde_dscn_tx', 'srvcpk_type_nm', 'plan_act', 'plan_exp'];
                    var arrName = 'srvcpcks';
                    var groupBy = 'cre_srvce_id';
                    var sortKey = 'cre_srvce_id';
                    var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

                    console.log('groupres --------------------')
                    console.log(groupres);
                    df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have packages" });
            });
    }
    else if (req.params.id == 2) {
        CafMdl.getcafAppVoipDtlsMdl(req.params.cafID, req.params.yr, req.user)
            .then(function (results) {

                if (results && results.length == 0) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
                }
                else {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
            });
    }
    else if (req.params.id == 3) {
        CafMdl.getAppcafHsiDtlsMdl(req.params.cafID, req.params.yr, req.user)
            .then(function (results) {
                console.log(results.length)
                if (results && results.length == 0) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
                }
                else {
                    // let sum_upld = 1;
                    // let sum_dnld = 1;
                    // var hsiusage = [];
                    // for (var j = 0; j < results.length; j++) {
                    //     for (var i = 1; i <= 31; i++) {

                    //         sum_upld += results[j][`dy_up_${i}`];
                    //         sum_dnld += results[j][`dy_dw_${i}`];
                    //     }
                    //     hsiusage.push({
                    //         'sno': results[j].s_no,
                    //         'year': results[j].yr_ct,
                    //         'month': results[j].mnt_ct,
                    //         'mnt_ct': results[j].mnt_ct,
                    //         'yr_ct': results[j].yr_ct,
                    //         'upldsize': Math.round(((sum_upld / 1024) / 1024 / 1024)),
                    //         'dwnldsize': Math.round(((sum_dnld / 1024) / 1024 / 1024)),
                    //         'totalsize': Math.round(((sum_upld / 1024) / 1024 / 1024)) + Math.round(((sum_dnld / 1024) / 1024 / 1024))
                    //     })
                    // }
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
            });
    }
    else {
        CafMdl.getcafAppInvoiceDtlsMdl(req.params.cafID, req.params.yr, req.user)
            .then(function (results) {
                if (results && results.length == 0) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
                }
                else {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
            });
    }

}

exports.getCustomerNewSlctdSegmntDtaCtrl = function (req, res) {
    var fnm = "getCustomerNewSlctdSegmntDtaCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    if (req.params.id == 1) {
        CafMdl.getcafAppPckgeDtlsMdl(req.params.cafID, req.user)
            .then(function (results) {
                if (results && results.length == 0) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have packages" });
                }
                else {

                    // console.log('results --------------------')
                    // console.log(results);
                    let pckg_fltr_json = [];
                    let rtrn_srvc_pks = (srvcpks) => {
                        let srvcpk_nm = [];
                        // console.log('srvcpks --------------------')
                        // console.log(srvcpks);
                        // srvcpks.filter((k) => {
                        //     srvcpk_nm.push({
                        //         srvcpk_nm: k.srvcpk_nm
                        //     })
                        // })

                        _.forIn(_.groupBy(srvcpks, 'srvcpk_id'), (value, key) => {
                            // console.log('srvcpks value --------------------')
                            // console.log(value);
                            srvcpk_nm.push({
                                srvcpk_nm: value[0]['srvcpk_nm']
                            })
                        });
                        return srvcpk_nm;
                    }

                    let sub_corsrvc_json = (sub_json) => {
                        let cresrvc = [];
                        _.forIn(_.groupBy(sub_json, 'cre_srvce_id'), (value, key) => {
                            cresrvc.push({
                                cre_srvce_id: value[0]['cre_srvce_id'],
                                cre_srvce_nm: value[0]['cre_srvce_nm'],
                                srvPcks: rtrn_srvc_pks(value)
                            })
                        });
                        // console.log('cresrvc --------------------')
                        // console.log(cresrvc);
                        return cresrvc;
                    }

                    _.forIn(_.groupBy(results, 'pckge_id'), (value, key) => {

                        console.log('value \n', value);
                        for (let u = 0; u < value.length; u++) {
                            var chrge_at_ad = 0;
                            var gst_at_ad = 0;
                            var ttlChrge_ad = 0;
                            chrge_at_ad += value[u].chrge_at;
                            gst_at_ad += value[u].gst_at;
                            ttlChrge_ad += value[u].ttl_chrge
                            console.log('chrge_at_ad, gst_at_ad,ttlChrge_ad -------------------- \n', chrge_at_ad, gst_at_ad, ttlChrge_ad);
                        }
                        pckg_fltr_json.push({
                            pckge_id: value[0]['pckge_id'],
                            pckge_nm: value[0]['pckge_nm'],
                            srvcpk_type_nm: value[0]['srvcpk_type_nm'],
                            chrge_at: chrge_at_ad,
                            ttl_at: ttlChrge_ad,
                            gst_at: gst_at_ad,
                            plan_act: value[0]['plan_act'],
                            plan_exp: value[0]['plan_exp'],
                            cresrvs: sub_corsrvc_json(value)
                        })
                    })
                    // console.log('pckg_fltr_json --------------------')
                    // console.log(pckg_fltr_json);
                    df.formatSucessRes(req, res, pckg_fltr_json, cntxtDtls, '', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have packages" });
            });
    }
    else if (req.params.id == 2) {
        CafMdl.getcafAppVoipDtlsMdl(req.params.cafID, req.params.yr, req.user)
            .then(function (results) {

                if (results && results.length == 0) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
                }
                else {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
            });
    }
    else if (req.params.id == 3) {
        CafMdl.getAppcafHsiDtlsMdl(req.params.cafID, req.params.yr, req.user)
            .then(function (results) {
                console.log(results.length)
                if (results && results.length == 0) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
                }
                else {
                    // let sum_upld = 1;
                    // let sum_dnld = 1;
                    // var hsiusage = [];
                    // for (var j = 0; j < results.length; j++) {
                    //     for (var i = 1; i <= 31; i++) {

                    //         sum_upld += results[j][`dy_up_${i}`];
                    //         sum_dnld += results[j][`dy_dw_${i}`];
                    //     }
                    //     hsiusage.push({
                    //         'sno': results[j].s_no,
                    //         'year': results[j].yr_ct,
                    //         'month': results[j].mnt_ct,
                    //         'mnt_ct': results[j].mnt_ct,
                    //         'yr_ct': results[j].yr_ct,
                    //         'upldsize': Math.round(((sum_upld / 1024) / 1024 / 1024)),
                    //         'dwnldsize': Math.round(((sum_dnld / 1024) / 1024 / 1024)),
                    //         'totalsize': Math.round(((sum_upld / 1024) / 1024 / 1024)) + Math.round(((sum_dnld / 1024) / 1024 / 1024))
                    //     })
                    // }
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have Usage data" });
            });
    }
    else {
        CafMdl.getcafAppInvoiceDtlsMdl(req.params.cafID, req.params.yr, req.user)
            .then(function (results) {
                if (results && results.length == 0) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
                }
                else {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
            });
    }

}


/**************************************************************************************
* Controller     : addPswdForTelCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
function addPswdForTelCtrl(user, telCnctns) {
    var fnm = "addPswdForTelCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    return new Promise((resolve, reject) => {
        let promises = [];
        for (let i = 0; i < telCnctns.length; i++) {
            promises.push(CafMdl.addPswdForTelMdl(user, telCnctns[i]));
        }
        Promise.all(promises).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })

}


/**************************************************************************************
* Controller     : addTelNuCafRelCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
function addTelNuCafRelCtrl(user, caf_id, telCnctns) {
    var fnm = "addTelNuCafRelCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    return new Promise((resolve, reject) => {
        let promises = [];
        for (let i = 0; i < telCnctns.length; i++) {
            promises.push(CafMdl.addTelNuCafRelMdl(caf_id, telCnctns[i], user));
        }
        Promise.all(promises).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })

}


/**************************************************************************************
* Controller     : getEntprsCafCnctnsCntrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -  Ramya  - Initial Function
*
***************************************************************************************/
exports.getEntprsCafCnctnsCntrl = function (req, res) {
    var fnm = "getEntprsCafCnctnsCntrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var enprsCafCnctnJson = [{
        id: 0,
        cnctnId: 0
    },
    {
        id: 1,
        cnctnId: 1
    },
    {
        id: 2,
        cnctnId: 2
    }]
    df.formatSucessRes(req, res, enprsCafCnctnJson, cntxtDtls, fnm, {});

}

function getCurrentTs() {
    return new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');
}

function getPassword() {
    var randPassword = Array(8).fill("abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789@").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return randPassword;
}


/**************************************************************************************
* Controller     : cmPrvSearchCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.cmPrvSearchCtrl = function (req, res) {
    var count = 0;
    var fnm = "cmPrvSearchCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var postResultData = [];
    for (var i = 0; i < req.body.data.length; i++) {
        CafMdl.cmPrvSearchCMdl(req.body.data[i].search.rcnt_srch, req.user)
            .then((results) => {
                count++
                console.log(count, req.body.data.length)
                postResultData.push(results);
                if (count == req.body.data.length) {
                    // console.log(results);
                    console.log(postResultData);
                    df.formatSucessRes(req, res, postResultData, cntxtDtls, fnm, {});
                }
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }


}




/**************************************************************************************
* Controller     : restartCafCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.restartCafCtrl = function (req, res) {
    var fnm = "restartCafCtrl";
    // req["user"] = {
    //     user_id:0,
    //     mrcht_usr_id:0,
    //     usr_ctgry_ky:0
    // }
    let caf_id = req.params.caf_id;
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var postResultData = [];
    CafMdl.getcafdetailsMdl({ id: caf_id }, req.user).then((cafRes) => {
        let restartDta = {
            "ipAddress": cafRes[0].olt_ip_addr_tx,
            "card": cafRes[0].olt_crd_nu,
            "tp": cafRes[0].olt_prt_nm,
            "onuId": cafRes[0].olt_onu_id,
            "olt_vndr_id": cafRes[0].olt_vndr_id
        }
        if (restartDta["card"] == 1 && cafRes[0].olt_vndr_id == 3) {
            restartDta["tp"] = restartDta["tp"] + 8
        }
        let apiCalls = cafBO.restartCalls(restartDta);
        extApiCtrl.callApi("BOX RESTART", 1, 15, req.params.caf_id, apiCalls, req.user).then(() => {
            df.formatSucessRes(req, res, ["Box restarted successfully"], cntxtDtls, fnm, req.user);
        }).catch((err) => {
            df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
        })
        console.log(JSON.stringify(apiCalls))
    }).catch((err) => {

    })
}


/**************************************************************************************
* Controller     : relatedcafsCtrl
* Parameters     : req,res()
* Description    : Get Related Cafs
* Change History :
* 02-04-2020    -  Sri Vardhan Balla  - Initial Function
*
***************************************************************************************/
exports.relatedcafsCtrl = function (req, res) {

    CafMdl.relatedcafsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getsnglCafDataCntrl
* Parameters     : req,res()
* Description    : Get global search caf data
* Change History :
*
***************************************************************************************/
exports.getsnglCafDataCntrl = function (req, res) {
    var fnm = "getsnglCafDataCntrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    CafMdl.getsnglCafDataMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updtBlngFrqCtrl
* Parameters     : req,res()
* Description    : Get Related Cafs
* Change History :
* 07-05-2020    -  Ramya  - Initial Function
*
***************************************************************************************/
exports.updtBlngFrqCtrl = function (req, res) {

    CafMdl.updtBlngFrqMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : vilidateCAF
* Parameters     : req,res()
* Description    : Get global search caf data
* Change History :
*
***************************************************************************************/
exports.vilidateCAF = function (req, res) {
    var fnm = "vilidateCAF";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let caf_id = req.params.caf_id;
    request.get(`http://202.53.92.35:4302/dreamops/validate/all/${caf_id}`, function (err, req_res, body) {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "120", err_message: "Failed to get CAF Batch validation details." });
        }
        else {
            let api_res = JSON.parse(body);
            if (api_res) {
                if (api_res['errors'].length > 0) {
                    df.formatErrorRes(req, res, api_res['errors'], cntxtDtls, fnm, { error_status: api_res['errors'][0]['code'], err_message: api_res['errors'][0]['msg'] });
                }
                else {
                    df.formatSucessRes(req, res, api_res['data'], cntxtDtls, fnm, {});
                }
            }
            else {
                df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "120", err_message: "Failed to get CAF Batch validation details." });
            }

        }
    })

}

/**************************************************************************************
* Controller     : updateStep1CafTrmndAprvlCtrl
* Parameters     : req,res()
* Description    : Get Related Cafs
* Change History :
* 28-05-2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.updateStep1CafTrmndAprvlCtrl = function (req, res) {
    var ct = 0;
    function step1CafTrmndAprvl(cafTrmndData, user) {
        CafMdl.updateStep1CafTrmndAprvlMdl(cafTrmndData, user)
            .then(function (results) {
                ct++;
                if (ct == req.body.data.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                } else {
                    step1CafTrmndAprvl(req.body.data[ct], req.user);
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    step1CafTrmndAprvl(req.body.data[ct], req.user);

}

/**************************************************************************************
* Controller     : getStep1CafTrmndAprvlCtrl
* Parameters     : req,res()
* Description    : Get request terminated cafs pending for approval
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getStep1CafTrmndAprvlCtrl = function (req, res) {
    var fnm = "getStep1CafTrmndAprvlCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    CafMdl.getStep1CafTrmndAprvlMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getStep1CafTrmndAprvdUsrCtrl
* Parameters     : req,res()
* Description    : Get termination approved cafs by user
* Change History :
* 28/05/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getStep1CafTrmndAprvdUsrCtrl = function (req, res) {
    var fnm = "getStep1CafTrmndAprvdUsrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    CafMdl.getStep1CafTrmndAprvdUsrMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getStep1CafTrmndAprvdRcntCtrl
* Parameters     : req,res()
* Description    : Get recent termination approved cafs
* Change History :
* 28/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getStep1CafTrmndAprvdRcntCtrl = function (req, res) {
    var fnm = "getTrmndAprvdCafsRcntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // 
    CafMdl.getStep1CafTrmndAprvdRcntMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getcafdtlsbyID
* Parameters     : req,res()
* Description    : Get caf details based on cafid or subscriber code
* Change History :
* 28/03/2020    -  Sri vardhan Balla  - Initial Function
*
***************************************************************************************/
exports.getcafdtlsbyID = function (req, res) {
    var fnm = "getcafdtlsbyID";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var data = req.body.data;
    CafMdl.getcafdtlsbyIDMdl(data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getdtlsbyCAFId
* Parameters     : req,res()
* Description    : Get caf details based on cafid or subscriber code
* Change History :
* 28/03/2020    -  Sri vardhan Balla  - Initial Function
*
***************************************************************************************/
exports.getdtlsbyCAFId = function (req, res) {
    var fnm = "getdtlsbyCAFId";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getdtlsbyCAFIdMdl(req.params.caf_id)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updtcafdtlsbyID
* Parameters     : req,res()
* Description    : update caf details based on cafid
* Change History :
* 28/03/2020    -  Sri vardhan Balla  - Initial Function
*
***************************************************************************************/
exports.updtcafdtlsbyID = function (req, res) {
    var fnm = "updtcafdtlsbyID";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var id = req.params.caf_id;
    var data = req.body.data
    CafMdl.updtcafdtlsbyIDMdl(data, id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getcafstsCtrl
* Parameters     : req,res()
* Description    : Get caf status
* Change History :
* 28/03/2020    -  Sri vardhan Balla  - Initial Function
*
***************************************************************************************/
exports.getcafstsCtrl = function (req, res) {
    var fnm = "getcafstsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getcafstsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : getcafInvoiceDtls
* Parameters     : req,res()
* Description    : Get Caf Invoice Details
* Change History :
* 7-04-2020    -  Sravani Machana  - Initial Function
*
***************************************************************************************/
exports.getcafdtlsbyinveId = function (req, res) {
    CafMdl.getcafdtlsbyinveIdMdl(req.params.id, req.params.year, req.params.mnth, req.user)
        .then(function (results) {
            if (results) {
                CafMdl.getcafvoipcalldtlsMdl(req.params.id, req.params.year, req.params.mnth, req.user)
                    .then(function (results1) {
                        CafMdl.getcafvoipcallhistryMdl(req.params.id, req.params.year, req.params.mnth, req.user).then(function (results2) {
                            var common_feilds = ['customerid', 'entrpe_type_id', 'contactname', 'blng_addr1_tx', 'blng_addr2_tx', 'num', 'blng_pn_cd', 'cst_invoiceid', 'duedate', 'billdate',
                                'billstart', 'billend', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'prvbal', 'crrnt_bill', 'pyble_at', 'balnce', 'ttl_tax', 'loc_addr2_tx', 'adjsd_at', 'blng_eml1_tx', 'hsi_total', 'hsi_pckge_nm', 'phne_nu'];
                            var arrFeilds = ['cafid', 'customerid', 'blng_eml1_tx', 'contactname', 'invce_at', 'srvc_at', 'chrge_cd', 'chrge_cde_id', 'chrge_at', 'pckge_id', 'pckge_nm', 'blng_addr1_tx', 'loc_addr2_tx', 'blng_addr2_tx', 'num', 'blng_pn_cd', 'cst_invoiceid', 'duedate', 'billdate', 'cgst_at', 'sgst_at', 'billstart', 'billend', 'entrpe_type_id', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'actvn_dt', 'voip_chrge_at', 'recring_chrge_at', 'value_add_srvce_at', 'hsi_chrge_at', 'add_on_chrge_at', 'inve_amnt', 'chrge_frm_dt', 'chrge_to_dt', 'plan_act'];
                            var arrName = 'cafDtls';
                            var groupByKey = 'customerid';
                            var sortKey = ''
                            cstmrInvoicArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");

                            cstmrInvoicArray.forEach(Element => {
                                var common_feilds = ['sno', 'cafid', 'customerid', 'contactname', 'invce_at', 'srvc_at', 'chrge_cd', 'chrge_cde_id', 'chrge_at', 'pckge_id', 'pckge_nm', 'blng_addr1_tx', 'blng_addr2_tx', 'num', 'blng_pn_cd', 'cst_invoiceid', 'duedate', 'billdate', 'cgst_at', 'sgst_at',
                                    'billstart', 'billend', 'entrpe_type_id', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'actvn_dt', 'voip_chrge_at', 'recring_chrge_at', 'value_add_srvce_at', 'hsi_chrge_at', 'add_on_chrge_at', 'inve_amnt', 'loc_addr2_tx', 'blng_eml1_tx'];
                                var arrFeilds = ['chrge_cd', 'chrge_cde_id', 'chrge_at', 'pckge_id', 'pckge_nm', 'chrge_frm_dt', 'chrge_to_dt', 'plan_act'];
                                var arrName = 'packages';
                                var groupByKey = 'cafid';
                                var sortKey = 'sno'
                                Element.cafDtls = jsonUtils.groupJsonByKey(Element.cafDtls, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");


                            })
                            for (let i = 0; i < cstmrInvoicArray[0].cafDtls.length; i++) {
                                cstmrInvoicArray[0].cafDtls[i]['voipDtls'] = [];
                                for (let j = 0; j < results1.length; j++) {
                                    if (results1[j].caf_id == cstmrInvoicArray[0].cafDtls[i].cafid) {
                                        cstmrInvoicArray[0].cafDtls[i]['voipDtls'].push({ type: 'Local', count: results1[j].locl_calls, duration: results1[j].lcl_duration, charge: results1[j].lcl_chtge }, { type: 'STD', std_clls: results1[j].std_calls, duration: results1[j].std_duration, charge: results1[j].std_chtge }, { type: 'ISD', std_clls: results1[j].isd_calls, duration: results1[j].istd_duration, charge: results1[j].istd_chtge })
                                    }
                                }
                            }
                            for (let i = 0; i < cstmrInvoicArray[0].cafDtls.length; i++) {
                                cstmrInvoicArray[0].cafDtls[i]['localCalls'] = [];
                                cstmrInvoicArray[0].cafDtls[i]['stdCalls'] = [];
                                cstmrInvoicArray[0].cafDtls[i]['istdCalls'] = [];


                                for (let j = 0; j < results2.length; j++) {
                                    if (results2[j].caf_nu == cstmrInvoicArray[0].cafDtls[i].cafid) {
                                        if (results2[j].lcl_cals_in == 1) {
                                            cstmrInvoicArray[0].cafDtls[i]
                                            ['localCalls'].push({ date: results2[j].date, time: results2[j].time, number: results2[j].cld_phne_nu, duration: results2[j].lcl_duration, count: results2[j].lcl_calls, charge: results2[j].lcl_chtge })
                                        }
                                        if (results2[j].std_cals_in == 1) {
                                            cstmrInvoicArray[0].cafDtls[i]
                                            ['stdCalls'].psuh({ date: results2[j].date, time: results2[j].time, number: results2[j].cld_phne_nu, duration: results2[j].std_duration, count: results2[j].std_calls, charge: results2[j].std_chtge })
                                        }
                                        if (results2[j].istd_cals_in == 1) {
                                            cstmrInvoicArray[0].cafDtls[i]
                                            ['istdCalls'].push({ date: results2[j].date, time: results2[j].time, number: results2[j].cld_phne_nu, duration: results2[j].istd_duration, count: results2[j].istd_calls, charge: results2[j].istd_chtge })
                                        }

                                    }
                                }
                            }
                            return df.formatSucessRes(req, res, cstmrInvoicArray, cntxtDtls, '', {})
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });

                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : spltsupdtnbycafIDCtrl
* Parameters     : req,res()
* Description    : update splits info
* Change History :
* 28/03/2020    -  Sri vardhan Balla  - Initial Function
*
***************************************************************************************/
exports.spltsupdtnbycafIDCtrl = function (req, res) {
    var fnm = "spltsupdtnbycafIDCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var id = req.params.caf_id;
    var data = req.body.data
    CafMdl.updtoldsplitinfoMdl(data.oldonu, id)
        .then((results) => {
            CafMdl.updtspltbycafId(data, id).then((cafuptresults) => {

                CafMdl.updtspltinfoMdl(data.splt_id, id).then((oldspltuptres) => {
                    df.formatSucessRes(req, res, oldspltuptres, cntxtDtls, fnm, {});
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                })

                // df.formatSucessRes(req, res, cafuptresults, cntxtDtls, fnm, {});
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

exports.getcrntMnthLmoCollectnsts = function (req, res) {
    var fnm = "getcrntMnthLmoCollectnsts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getcrntMnthLmoCollectnstsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

exports.getmnthwiseLmoCollectnsts = function (req, res) {
    var fnm = "getmnthwiseLmoCollectnsts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getmnthwiseLmoCollectnstsMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

exports.getcrntMnthLmoPndgCafs = (req, res) => {
    var fnm = "getcrntMnthLmoPndgCafs";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body)
    CafMdl.getcrntMnthLmoPndgCafsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

exports.getcrntMnthLmoPndgInvceCafs = (req, res) => {
    console.log(' ---------------------------------------------- getcrntMnthLmoPndgInvceCafs');
    var fnm = "getcrntMnthLmoPndgInvceCafs";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body)
    CafMdl.getcrntMnthLmoPndgInvceCafsMdl(req.params.id, req.user)
        .then(function (results) {
            if (results && results.length == 0) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "120", err_message: "User doesn't have invoice data" });
        });
}

exports.getcrntMnthLmoInvcDtls = function (req, res) {

    CafMdl.getcrntMnthLmoInvcDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getlinemanList = function (req, res) {

    CafMdl.getlinemanListMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

exports.getlinemanCafsListCtrl = function (req, res) {

    CafMdl.getlinemanCafsListMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


exports.postassignPonCtrl = function (req, res) {
    CafMdl.postassignPonMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
exports.addLinemanCtrl = function (req, res) {
    CafMdl.addLinemanMdl(req.body.data, req.user)
        .then(function (results) {
            if (results) {
                console.log(results.insertId)
                CafMdl.addCstmPonRelLinemanMdl(results.insertId, req.body.data, req.user)
                    .then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


exports.removePonCtrl = function (req, res) {
    console.log("REQBODYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
    console.log(req.body.data);
    var lnmId = req.body.data.lnmn_id.lnmn_id;
    var oltId = req.body.data.lnmn_id.olt_id

    var x = 0;


    function myFirstrecursiveFnc(data, user) {
        CafMdl.removePonMdl(data, lnmId, oltId, user)
            .then(function (results) {
                x++;

                console.log(req.body.data.pon_id.length);
                if (x < req.body.data.pon_id.length) {
                    myFirstrecursiveFnc(req.body.data.pon_id[x], req.user);
                }
                if (x == req.body.data.pon_id.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }

            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }

    myFirstrecursiveFnc(req.body.data.pon_id[x], req.user);
}


/**************************************************************************************
* Controller     : insertmonthlyPaymentsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 24/02/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.insertmonthlyPaymentsCtrl = (req, res) => {
    var fnm = "insertmonthlyPaymentsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var x = 0;

    console.log("&&&&&&&&&&&&&&&&&&&&&")
    console.log(req.body.data.insertData);
    console.log("&&&&&&&&&&&&&&&&&&&&&")
    function myFirstrecursiveFnc(data, agent_id, user) {
        dbutil.getNxtKey('pmnt_id').then((pmnt_id) => {
            oltmdl.insertPaymentsMdl(data, agent_id, user, pmnt_id)
                .then((FirstResults) => {
                    req.body.data.insertData[x].pmnt_id = pmnt_id;
                    oltmdl.updatepayedINdicator(data)
                        .then((frthResults) => {
                            x++;

                            if (x < req.body.data.insertData.length) {
                                oltmdl.updateCustomrPaymntDtls(req.body.data.insertData[x - 1], req.body.data.agntID, req.user)
                                    .then((SecondResults) => {
                                        myFirstrecursiveFnc(req.body.data.insertData[x], req.body.data.agntID, req.user);
                                    })
                            }
                            if (x == req.body.data.insertData.length) {
                                oltmdl.updateCustomrPaymntDtls(req.body.data.insertData[x - 1], req.body.data.agntID, req.user)
                                    .then((SecondResults) => {
                                        oltmdl.insertInvoicePaymentsMdl(req.body.data, req.user)
                                            .then((thirdResults) => {
                                                event.record('CUSTOMER', req.body.data.insertData[0].cstmr_id, 'PAYMENT_MADE', "Due Amount Payment Made", req.user);
                                                df.formatSucessRes(req, res, thirdResults, cntxtDtls, fnm, {});
                                            }).catch((error) => {
                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                            });
                                    })


                            }
                        }).catch((error) => {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }).catch((error) => {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        })


    }

    myFirstrecursiveFnc(req.body.data.insertData[x], req.body.data.agntID, req.user);

}

/**************************************************************************************
* Controller     : getReAssgndCafsByAgntCtrl
* Parameters     : req,res()
* Description    : Get ReAssigned cafs by agent
* Change History :
* 17/03/2020    -  Srujana M  - Initial Function
*
***************************************************************************************/
exports.getReAssgndCafsByAgntCtrl = function (req, res) {
    var fnm = "getReAssgndCafsByAgntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    CafMdl.getReAssgndCafsByAgntMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : get_kyctypesCtrl
* Parameters     : req,res()
* Description    : get KYC Type details
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_kyctypesCtrl = function (req, res) {

    CafMdl.get_kyctypesMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : reAssgndCafsCtrl
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.reAssgndCafsCtrl = function (req, res) {
    // console.log(req.body);
    // console.log('JSON ********************************************** \n', JSON.stringify(req.body.data));
    function img_upload(img, callback) {
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
        let fileName = name + "." + extension;
        var dir = '/glits/filestore/uploads/caf_reassignment' ;
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
    if (req.body.data.kyc_img_tx && req.body.data.kyc_img_tx != undefined && req.body.data.cstmr_img_tx && req.body.data.cstmr_img_tx != undefined) {
        // attUtil.uploadToS3([req.body.data.kyc_img_tx], 'wetrackon/bss_kyc', (err, attKycChres) => {
            img_upload(req.body.data.kyc_img_tx,  (err, attKycChres) => {
            if (!err) {
                // console.log(attKycChres[0].Location);
                var kycAttchmnt = attKycChres;
                // attUtil.uploadToS3([req.body.data.kyc_bck_img_tx], 'wetrackon/bss_kyc', (err, attKycBckChres) => {
                    img_upload(req.body.data.kyc_img_tx,  (err, attKycBckChres) => {
                    if (!err) {
                        // console.log(attKycBckChres[0].Location);
                        var kycBckAttchmnt = attKycBckChres;
                        // attUtil.uploadToS3([req.body.data.cstmr_img_tx], 'wetrackon/bss_kyc', (err, attCstmrChres) => {
                            img_upload(req.body.data.kyc_img_tx,  (err, attCstmrChres) => {
                            if (!err) {
                                // console.log(attCstmrChres[0].Location);
                                var cstmrAttchmnt = attCstmrChres;
                                // console.log('kycAttchmnt \n', kycAttchmnt, 'cstmrAttchmnt \n', cstmrAttchmnt, 'kycBckAttchmnt \n', kycBckAttchmnt);
                                dbutil.getNxtKey('caf_id').then(function (nw_caf_id) {
                                    CafMdl.updtcafdtlMdl(req.body.data, nw_caf_id, req.user)
                                        .then(function (results) {
                                            dbutil.getNxtKey('ctmr_id').then(function (nw_ctrmr_id) {
                                                CafMdl.insnwcafMdl(req.body.data, nw_caf_id, nw_ctrmr_id, req.user)
                                                    .then(function (results) {
                                                        CafMdl.updtcstmrdtlMdl(req.body.data, req.user)
                                                            .then(function (results) {
                                                                CafMdl.insnwcstmrMdl(req.body.data, nw_ctrmr_id, req.user)
                                                                    .then(function (results) {
                                                                        CafMdl.getcafAgraDtlsMdl(req.body.data.caf_id, req.user)
                                                                            .then(function (results) {
                                                                                // console.log('results__ \n', results);
                                                                                // console.log('aghra_cd \n', results[0].aghra_cd);
                                                                                var str = `${results[0].aghra_cd}`;
                                                                                str = str.substring(0, str.length - 4);
                                                                                var nmStr = `${req.body.data.f_nm}`
                                                                                nmStr = nmStr.trim()
                                                                                // console.log('str \n', str, 'nmStr \n', nmStr);
                                                                                var hsiIpChangeDta = {
                                                                                    "id": str,
                                                                                    "aid": {
                                                                                        "ipAddress": `${results[0].olt_ip_addr_tx}`,
                                                                                        "type": 10023,
                                                                                        "card": results[0].olt_crd_nu,
                                                                                        "tp": results[0].tp_ct,
                                                                                        "onuId": results[0].olt_onu_id
                                                                                    },
                                                                                    "name": `${nmStr}${req.body.data.caf_id}`
                                                                                }
                                                                                console.log('hsiIpChangeDtaA', hsiIpChangeDta);
                                                                                let aghoraHdr = {
                                                                                    "Authorization": "Basic " + new Buffer(as.bssapi["agora"].un + ":" + as.bssapi["agora"].pwd).toString("base64")
                                                                                }
                                                                                const hsiIpChange = {
                                                                                    url: `http://172.16.0.44:8080/agorang/rest/v1/eml/onu/${str}`,
                                                                                    headers: aghoraHdr,
                                                                                    method: 'PUT',
                                                                                    json: hsiIpChangeDta
                                                                                };
                                                                                console.log('hsiIpChange \n', hsiIpChange.url)
                                                                                request(hsiIpChange, function callback(error, response, body) {
                                                                                    if (error) {
                                                                                        console.log("in err", error)
                                                                                        return res.send(error);
                                                                                    } else {
                                                                                        console.log("in success", body)
                                                                                    }
                                                                                })
                                                                                CafMdl.getDstrictMandalNameMdl(req.body.data.vlge_id, req.body.data.mndl_nu, req.body.data.instl_dstrct_id, req.body.data.caf_id, req.user)
                                                                                    .then(function (results) {
                                                                                        // console.log('resultssssssssssssssssssssssssssssssssssssssss', results[0]);

                                                                                        var mdfySbscbrDta = {
                                                                                            "subscribercode": `${results[0].mdlwe_sbscr_id}`,
                                                                                            "partnerCode": "APSFL",
                                                                                            "subscriber": {
                                                                                                "title": `${results[0].tle_nm}`,
                                                                                                "firstname": `${nmStr}`,
                                                                                                "lastname": `${req.body.data.l_nm}`,
                                                                                                "address": getEmtpyTxt(req.body.data.dr_no) + getEmtpyTxt(req.body.data.strt_nm) + getEmtpyTxt(req.body.data.area) + getEmtpyTxt(results[0].vlge_nm) + getEmtpyTxt(results[0].mndl_nm) + getEmtpyTxt(results[0].dstrt_nm) + getEmtpyTxt(req.body.data.pincode),
                                                                                                "village": `${results[0].vlge_nm}`,
                                                                                                "mandal": `${results[0].mndl_nm}`,
                                                                                                "districtCode": `${results[0].dstrt_nm}`,
                                                                                                "stateCode": "AP",
                                                                                                "countryCode": "INDIA",
                                                                                                "remarks": "",
                                                                                                "cafNumber": `${req.body.data.caf_id}`

                                                                                            }
                                                                                        }
                                                                                        console.log('mdfySbscbrDta', mdfySbscbrDta);
                                                                                        const mdfySbscbr = {
                                                                                            url: `http://iptv.apsfl.co.in:8080/appserver/rest/iptv/modifysubscriber`,
                                                                                            headers: {
                                                                                                'content-type': 'application/json',
                                                                                                apikey: '6ed73c1a-7817-49ab-b185-981f97cf5fd8',
                                                                                                username: 'teraadmin'
                                                                                            },
                                                                                            method: 'POST',
                                                                                            json: mdfySbscbrDta
                                                                                        };
                                                                                        request(mdfySbscbr, function callback(error, response, body) {
                                                                                            if (error) {
                                                                                                console.log("in err", error)
                                                                                                return res.send(error);
                                                                                            } else {
                                                                                                console.log("in success", body)
                                                                                            }
                                                                                        });

                                                                                        CafMdl.inskycDoccafMdl(req.body.data, kycAttchmnt, kycBckAttchmnt, cstmrAttchmnt, nw_caf_id, nw_ctrmr_id, req.user)
                                                                                            .then(function (results) {
                                                                                                CafMdl.updcpestkMdl(req.body.data, req.user)
                                                                                                    .then(function (results) {
                                                                                                        CafMdl.inscpestkMdl(req.body.data, nw_caf_id, req.user)
                                                                                                            .then(function (results) {
                                                                                                                CafMdl.updpckgprchseMdl(req.body.data, nw_caf_id, req.user)
                                                                                                                    .then(function (results) {
                                                                                                                        CafMdl.inspckgprchseMdl(req.body.data, nw_caf_id, req.user)
                                                                                                                            .then(function (results) {
                                                                                                                                df.formatSucessRes(req, res, results, cntxtDtls, 'Success', {});
                                                                                                                            }).catch(function (error) {
                                                                                                                                df.formatErrorRes(req, res, error, cntxtDtls, 'Packages Purchase Details Insertion Failed', {});
                                                                                                                            });
                                                                                                                    }).catch(function (error) {
                                                                                                                        df.formatErrorRes(req, res, error, cntxtDtls, 'Packages Purchase Details Updation Failed', {});
                                                                                                                    });
                                                                                                            }).catch(function (error) {
                                                                                                                df.formatErrorRes(req, res, error, cntxtDtls, 'Packages Insertion Failed', {});
                                                                                                            });
                                                                                                    }).catch(function (error) {
                                                                                                        df.formatErrorRes(req, res, error, cntxtDtls, 'Packages Updation Failed', {});
                                                                                                    });
                                                                                            }).catch(function (error) {
                                                                                                df.formatErrorRes(req, res, error, cntxtDtls, 'KYC Attachmnets Inserion  Failed', {});
                                                                                            });
                                                                                    }).catch(function (error) {
                                                                                        df.formatErrorRes(req, res, error, cntxtDtls, 'Subscriber Modification Failed', {});
                                                                                    });
                                                                            }).catch(function (error) {
                                                                                df.formatErrorRes(req, res, error, cntxtDtls, 'Aghora Updation Failed', {});
                                                                            });
                                                                    }).catch(function (error) {
                                                                        df.formatErrorRes(req, res, error, cntxtDtls, 'New Customer Insertion Failed', {});
                                                                    });
                                                            }).catch(function (error) {
                                                                df.formatErrorRes(req, res, error, cntxtDtls, 'Customer Details Updation Failed', {});
                                                            });
                                                    })
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, 'New CAF Insertion Failed', {});
                                            });
                                        }).catch(function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, 'CAF Details Updation Failed', {});
                                        });
                                })

                            }
                        })
                    }
                })
            }
        })
    }
}

/**************************************************************************************
* Controller     : get_kycLmoCafDtlsCtrl
* Parameters     : req,res()
* Description    : get KYC Type details
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_kycLmoCafCntDtlsCtrl = function (req, res) {

    CafMdl.get_kycLmoCafCntDtlsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getcaflmoKycDtlsCtrl
* Parameters     : req,res()
* Description    : get KYC Type details
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getcaflmoKycDtlsCtrl = (req, res) => {
    var fnm = "getcaflmoKycDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getcaflmoKycDtlsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : uploadCafKycCtrl
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.uploadCafKycCtrl = function (req, res) {
    function img_upload(img,  callback) {
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
        let fileName = name + "." + extension;
        var dir = '/glits/filestore/uploads/caf_reassignment' ;
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

    if (req.body.data.kyc_img_tx && req.body.data.kyc_img_tx != undefined && req.body.data.kyc_bck_img_tx && req.body.data.kyc_bck_img_tx != undefined && req.body.data.cstmr_img_tx && req.body.data.cstmr_img_tx != undefined) {
        // attUtil.uploadToS3([req.body.data.kyc_img_tx], 'wetrackon/bss_kyc', (err, attKycChres) => {
            img_upload(req.body.data.kyc_img_tx, (err, attKycChres) => {
            if (!err) {
                console.log(attKycChres);
                var kycAttchmnt = attKycChres;
                // attUtil.uploadToS3([req.body.data.kyc_bck_img_tx], 'wetrackon/bss_kyc', (err, attKycBckChres) => {
                    img_upload(req.body.data.kyc_bck_img_tx,  (err, attKycBckChres) => {
                    if (!err) {
                        console.log(attKycBckChres);
                        var kycBckAttchmnt = attKycBckChres;
                        // attUtil.uploadToS3([req.body.data.cstmr_img_tx], 'wetrackon/bss_kyc', (err, attCstmrChres) => {
                            img_upload(req.body.data.cstmr_img_tx,  (err, attCstmrChres) => {

                            if (!err) {
                                console.log(attCstmrChres);
                                var cstmrAttchmnt = attCstmrChres;
                                console.log('kycAttchmnt \n', kycAttchmnt, 'cstmrAttchmnt \n', cstmrAttchmnt, 'kycBckAttchmnt \n', kycBckAttchmnt);
                                CafMdl.inskycDocLmocafMdl(req.body.data, kycAttchmnt, kycBckAttchmnt, cstmrAttchmnt, req.user)
                                    .then(function (results) {
                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });
                            }
                        })
                    }
                })
            }
        })
    }
}


/**************************************************************************************
* Controller     : uploadSelfCafKyc
* Parameters     : req,res()
* Description    : Get Caf Details
* Change History :
* 18-03-2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.uploadSelfCafKyc = function (req, res) {
    function img_upload(img,  callback) {
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
        let fileName = name + "." + extension;
        var dir = '/glits/filestore/uploads/lmokyc' ;
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


     if (req.body.data.kyc_img_tx && req.body.data.kyc_img_tx != undefined && req.body.data.kyc_bck_img_tx && req.body.data.kyc_bck_img_tx != undefined && req.body.data.cstmr_img_tx && req.body.data.cstmr_img_tx != undefined) {
    //     attUtil.uploadToS3([req.body.data.kyc_img_tx], 'wetrackon/bss_kyc     ', (err, attKycChres) => {
    img_upload(req.body.data.kyc_img_tx,  (err, attKycChres) => {
        if (!err) {
            console.log(attKycChres);
            var kycAttchmnt = attKycChres;
            //             attUtil.uploadToS3([req.body.data.kyc_bck_img_tx], 'wetrackon/bss_kyc', (err, attKycBckChres) => {
            img_upload(req.body.data.kyc_bck_img_tx, (err, attKycBckChres) => {
                if (!err) {
                    console.log(attKycBckChres);
                    var kycBckAttchmnt = attKycBckChres;
                    //                     attUtil.uploadToS3([req.body.data.cstmr_img_tx], 'wetrackon/bss_kyc', (err, attCstmrChres) => {
                    img_upload(req.body.data.cstmr_img_tx,  (err, attCstmrChres) => {
                        if (!err) {
                            console.log(attCstmrChres);
                            var cstmrAttchmnt = attCstmrChres;
                            console.log('kycAttchmnt \n', kycAttchmnt, 'cstmrAttchmnt \n', cstmrAttchmnt, 'kycBckAttchmnt \n', kycBckAttchmnt);
                            CafMdl.insSelfkycDocLmocafMdl(req.body.data, kycAttchmnt, kycBckAttchmnt, cstmrAttchmnt, req.user)
                                .then(function (results) {
                                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                });
                        }
                    })
                }
            })
        }
    })
    //     })
    }
}

/**************************************************************************************
* Controller     : get_agntkyctypesCtrl
* Parameters     : req,res()
* Description    : get agent KYC Type details
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_agntkyctypesCtrl = function (req, res) {

    CafMdl.get_agntkyctypesMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getDuepay_prpdCafsCtrl
* Parameters     : req,res()
* Description    : get LMO cafs Due pay details
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getDuepay_prpdCafsCtrl = (req, res) => {
    var fnm = "getDuepay_prpdCafsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getDuepay_prpdCafsMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getprpdCafInvcsCtrl
* Parameters     : req,res()
* Description    : get LMO cafs Invc details
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.getprpdCafInvcsCtrl = (req, res) => {
    var fnm = "getprpdCafInvcsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    CafMdl.getprpdCafInvcsMdl(req.params.id, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


// exports.postassignCafCtrl = function (req, res) {

//     CafMdl.postassignCafMdl(req.body.data, req.user)
//         .then(function (results) {
//             if (results && results.length) {
//                 console.log(results);
//                 var count = 0;
//                 for (var j = 0; j < req.body.data.olt_prt_id.length; j++) {
//                     count++;
//                     var flag = true;
//                     for (var i = 0; i < results.length; i++) {
//                         if (results[i].pon_id == req.body.data.olt_prt_id[j]) {
//                             console.log('Update Lineman PON in table');
//                             CafMdl.updtLnemanMdl(req.body.data.lnmn_id, req.body.data.olt_prt_id[j], req.body.data.olt_id)
//                                 .then((updtedReslt) => {
//                                     if (count == req.body.data.olt_prt_id.length) {
//                                         df.formatSucessRes(req, res, updtedReslt, cntxtDtls, '', {});
//                                     }
//                                 }).catch((error) => {
//                                     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//                                 })
//                         }
//                         else {
//                             flag = false
//                         }
//                     }
//                     if (flag == false)
//                         CafMdl.insrtLnemanMdl(req.body.data.lnmn_id, req.body.data.olt_prt_id[j],req.body.data.olt_id, req.user)
//                             .then((insrtedReslt) => {
//                                 console.log('insrtedReslt');
//                                 console.log(count,req.body.data.olt_prt_id.length);
//                                 if (count == req.body.data.olt_prt_id.length) {
//                                     df.formatSucessRes(req, res, insrtedReslt, cntxtDtls, '', {});
//                                 }
//                             }).catch((error) => {
//                                 df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//                             })
//                     //    }
//                     //    else{
//                     //        console.log('Insert Lineman in table');
//                     //    }
//                 }
//             }
//             else{
//                 var count = 0;
//                 for (var j = 0; j < req.body.data.olt_prt_id.length; j++) {
//                     count++;

//                         CafMdl.insrtLnemanMdl(req.body.data.lnmn_id, req.body.data.olt_prt_id[j],req.body.data.olt_id,  req.user)
//                             .then((insrtedReslt) => {
//                                 console.log('else insrtedReslt');
//                                 console.log(insrtedReslt);
//                                 if (count == req.body.data.olt_prt_id.length) {
//                                     df.formatSucessRes(req, res, insrtedReslt, cntxtDtls, '', {});
//                                 }
//                             }).catch((error) => {
//                                 df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//                             })

//             }
//         }
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//         });
// }
