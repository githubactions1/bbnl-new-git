// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var AWS = require('aws-sdk');
var awsS3 = 'config/aws-s3.config.json';
var secConfig = require(appRoot + '/config/sec.config');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var usrmngtVld = require(appRoot + '/server/api/modules/general/um/validators/umVld');

// Model Inclusions
var usrmngtmdl = require('../models/appMgtMdl');
/**************************************************************************************
* Controller     : userappsLst_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 22/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.userappsLst_get = function (req, res) {
    var fnm = "userappsLst_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // console.log(req.user)
    var usrDt = {
        usrId: req.user.mrcht_usr_id,
        clnt_id: req.user.clnt_id,
        tnt_id: jsonUtils.processData(req.user.tnts, 'tnt_id')
    }
    // console.log(cmpnt_id)
    usrmngtmdl.userappsLst_getMdl(req.user, usrDt)
        .then(function (results) {
            var resdata = results;
            if (results && results.length) {
                var session_id = req.user.usr_id + '_' + req.user.app;
                sessionStore.get(session_id, (err, val) => {
                    if (err) { console.log(err); return };
                    if (!val || (val && typeof val) == 'string') {
                        val = {};
                    }
                    var user = val || {};
                    user.appprfls = resdata;
                    sessionStore.set(session_id, user);
                });
                var zeroParents = [];
                var temp = [];
                for (i = 0; i < resdata.length; i++) {
                    if (resdata[i].prnt_app_id == 0) {
                        zeroParents.push(resdata[i]);
                    } else {
                        temp.push(resdata[i]);
                    }
                }
                var app_lst = jsonUtils.uniqueArr(temp, 'app_id');
                var groupRes = jsonUtils.groupJsonByKey(app_lst, ['prnt_app_id', 'app_lgo_tx', 'app_url_tx', 'hdr_in', 'prnt_app_nm'], ['app_id', 'app_lgo_tx', 'app_nm', 'app_url_tx', 'hdr_in'], ["sub_apps"], 'prnt_app_id', 'prnt_app_id');
                var resdata = jsonUtils.concateArr(zeroParents, groupRes);
                // console.log(resdata);
            }
            df.formatSucessRes(req, res, resdata, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Getting users for App Profiles
* Parameters     : req.body
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 17/05/2017    - Vijaya Lakshmi - Initial Function
*
***************************************************************************************/
exports.usersAppPrfl_get = function (req, res) {
    var fnm = "usersAppPrfl_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    usrmngtmdl.getAppPrflusrs(req.user, req.params)
        .then(function (results) {
            if (results && results.length > 0) {
                var groupRes = jsonUtils.groupJsonByKey(results, ['app_prfle_id', 'app_prfle_nm'], ['app_prfle_app_rel_id', 'app_id', 'app_nm', 'prnt_app_id', 'prnt_app_nm', 'prnt_app_lgo_tx', 'app_lgo_tx', 'sqnce_id', 'dsble_in', 'r_in', 'c_in', 'u_in', 'd_in', 'app_kywrd_id', 'a_in'], ["apps"], 'app_prfle_id', 'app_prfle_id');
                groupRes.forEach(function (prfl) {
                    prfl.apps = jsonUtils.groupJsonByKey(prfl.apps, ['app_prfle_app_rel_id', 'app_id', 'app_nm', 'prnt_app_id', 'prnt_app_nm', 'prnt_app_lgo_tx', 'sqnce_id', 'dsble_in', 'r_in', 'c_in', 'u_in', 'd_in', 'a_in', 'app_lgo_tx'], ['app_kywrd_id'], ['app_kywrds'], 'app_id', 'app_id');
                    var zeroParents = [];
                    var temp = [];
                    prfl.apps.forEach(function (itm) {
                        delete itm[''];
                        if (itm.prnt_app_id == 0) {
                            zeroParents.push(itm);
                        } else {
                            temp.push(itm)
                        }
                    })
                    var app_lst = jsonUtils.uniqueArr(temp, 'app_id');
                    prfl.apps = jsonUtils.groupJsonByKey(app_lst, ['prnt_app_id', 'prnt_app_nm', 'prnt_app_lgo_tx'], ['app_prfle_app_rel_id', 'app_id', 'app_nm', 'prnt_app_id', 'prnt_app_nm', 'prnt_app_lgo_tx', 'app_lgo_tx', 'sqnce_id', 'dsble_in', 'r_in', 'c_in', 'u_in', 'd_in', 'a_in', 'app_kywrds'], ['sub_apps'], 'prnt_app_id', 'prnt_app_id');
                    prfl.apps = jsonUtils.concateArr(zeroParents, prfl.apps);
                })
                df.formatSucessRes(req, res, groupRes, cntxtDtls, fnm, {});
            } else
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : To get all apps
* Parameters     : req.body
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 19/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.apps_get = function (req, res) {
    var fnm = "apps_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    usrmngtmdl.getAppsMdl(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : To assign app profile to user
* Parameters     : req.body
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 24/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.updtAppPrf = function (req, res) {
    var fnm = "assignAppPrflToUsr_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var count = 0;
    var sqnceId = 0;
    var orgnl_len = req.body.apps.length;
    var orgnl_dt = req.body;
    orgnl_dt.apps.forEach(function (itm) {
        count++;
        if (itm.sub_apps) {
            if (itm.prnt_app_id) {
                for (let i = 0; i < itm.sub_apps.length; i++) {
                    itm.sub_apps[i].prnt_app_id = itm.prnt_app_id;
                    if (!itm.a_in) itm.sub_apps[i].a_in = itm.a_in;
                    orgnl_dt.apps.push(itm.sub_apps[i]);
                }
                if (count == orgnl_len) {
                    updateAppPrflPrms();
                }
            }
            else {
                count--;
                usrmngtmdl.addAppMdl(req.user, orgnl_dt, itm)
                    .then(function (results) {
                        count++;
                        for (let i = 0; i < itm.sub_apps.length; i++) {
                            itm.sub_apps[i].prnt_app_id = results.insertId;
                            if (!itm.a_in) itm.sub_apps[i].a_in = itm.a_in;
                            orgnl_dt.apps.push(itm.sub_apps[i]);
                        }
                        if (count == orgnl_len) {
                            updateAppPrflPrms();
                        }
                    })
                    .catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    })
            }
        } else {
            if (count == orgnl_len) {
                updateAppPrflPrms();
            }
        }
    })
    function updateAppPrflPrms() {
        count = 0;
        orgnl_dt.apps.forEach(function (itm) {
            if (!itm.sub_apps) {
                if (itm.app_kywrds)
                    for (let i = 0; i < itm.app_kywrds.length; i++) {
                        itm.app_kywrds[i] = itm.app_kywrds[i].app_kywrd_id;
                    }
                sqnceId++;
                itm.sqnce_id = sqnceId;

                usrmngtmdl.updateAppPrflPrms(req.user, req.params, itm)
                    .then(function (results) {
                        count++;
                        // console.log(count, orgnl_dt.apps.length)
                        if (count == orgnl_dt.apps.length) {
                            updateAppPrfle();
                        }
                    }).catch(function (error) {
                        count++;
                        // console.log(count, orgnl_dt.apps.length)
                        if (count == orgnl_dt.apps.length) {
                            updateAppPrfle();
                        }
                    })
            } else {
                count++;
                // console.log(count, orgnl_dt.apps.length)
                if (count == orgnl_dt.apps.length) {
                    updateAppPrfle();
                }
            }
        })
    }
    function updateAppPrfle() {
        orgnl_dt.cmpnt_id = null;
        usrmngtmdl.getAppPrflusrs(req.user, orgnl_dt)
            .then(function (results) {
                orgnl_dt.app_prfle_jsn_tx = results;
                //Change App Profile Name
                usrmngtmdl.updateAppPrfle(req.user, req.params, orgnl_dt)
                    .then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            })
    }
}

/**************************************************************************************
* Controller     : To assign app profile to user
* Parameters     : req.body
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 24/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
// exports.dltAppPrf = function (req, res) {
//     var fnm = "assignAppPrflToUsr_post";
//     log.info(`In ${fnm}`, 0, cntxtDtls);

//     usrmngtmdl.dltAppPrf(req.user, req.params.prfId)
//         .then(function (results) {
//             df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//         });
// }

/**************************************************************************************
* Controller     : To assign app profile to user
* Parameters     : req.params
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 24/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
// exports.assignAppPrfToUsr_post = function (req, res) {
//     var fnm = "assignAppPrflToUsr_post";
//     log.info(`In ${fnm}`, 0, cntxtDtls);

//     req.getValidationResult(req.params).then(function (result) {

//         if (!result.isEmpty()) {
//             df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
//             return;
//         } else {
//             // Model gets called Here
//             user_data = req.body;
//             usrmngtmdl.getAppPrflId(req.user, req.params.appPrflNm)
//                 .then(function (results) {
//                     var count = 0;
//                     for (var i = 0; i < user_data.length; i++) {
//                         usrmngtmdl.assignAppPrfToUsrMdl(req.user, results[0].app_prfle_id, user_data[i])
//                             .then(function (results) {
//                                 count++;
//                                 if (count == user_data.length)
//                                     df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
//                             }).catch(function (error) {
//                                 df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//                             });
//                     }
//                 }).catch(function (error) {
//                     df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//                 });
//         }
//     })
// }
