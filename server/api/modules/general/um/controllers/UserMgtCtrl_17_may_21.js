// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var secConfig = require(appRoot + '/config/sec.config');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var mailUtls = require(appRoot + '/utils/communication.utils');
var generate = require(appRoot + '/utils/html_template.utils');
var usrmngtVld = require(appRoot + '/server/api/modules/general/um/validators/umVld');
var _ = require('lodash');
// Model Inclusions
var usrmngtmdl = require('../models/userMgtMdl');




/**************************************************************************************
* Controller     : allUsersList_get
* Parameters     : None
* Description    : 
* Change History :
* 25/05/2016    - Sony Angel - Initial Function
***************************************************************************************/
exports.allUsersList_get = (req, res) => {
    // console.log("allUsersList_get")
    var clnt_id = req.user.clnt_id;
    var tnt_id = jsonUtils.processData(req.user.tnts, 'tnt_id');
    var fnm = "allUsersList_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    usrmngtmdl.getAllUsers(req.user, clnt_id, tnt_id)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : check_userCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 12/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.check_userCtrl = function (req, res) {
    var fnm = "check_userCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    usrmngtmdl.check_usrMdl(req.user, req.body)
        .then(function (results) {
            if (results && results.length)
                df.formatSucessRes(req, res, { exist: true }, cntxtDtls, fnm, {});
            else
                df.formatSucessRes(req, res, { exist: false }, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : userUrlAccess_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 01/06/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.userUrlAccess_get = function (req, res) {
    var fnm = "userUrlAccess_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var usrDt = {
        usrId: req.user.mrcht_usr_id,
        clnt_id: req.user.clnt_id,
        tnt_id: jsonUtils.processData(req.user.tnts, 'tnt_id')
    }

    // Model gets called Here 
    usrmngtmdl.userUrlAccess_getMdl(req.user, usrDt)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : allPrfl_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 01/06/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
// exports.allPrfl_get = function (req, res) {
//     var fnm = "allPrfl_get";
//     log.info(`In ${fnm}`, 0, cntxtDtls);
//     // var usrDt = {
//     //     usrId: req.user.mrcht_usr_id,
//     //     clnt_id: req.user.clnt_id,
//     //     tnt_id: jsonUtils.processData(req.user.tnts, 'tnt_id')
//     // }

//     // Model gets called Here 
//     usrmngtmdl.allPrfl_getMdl(req.user, req.params)
//         .then(function (results) {
//             df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//         });

// }

/**************************************************************************************
* Controller     : getUsrAdt
* Parameters     : None
* Description    : To check if session with user details created or not
* Change History :
* 01/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getUsrAdt = function (req, res) {
    var fnm = "getUsrAdt";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    const dt = req.params.dt;
    // Model gets called Here
    usrmngtmdl.getUsrAdtMdl(req.user, dt)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/*******************************************************************************************
* Controller     : updateUser_post
* Parameters     : req, res ()
* Description    : To update a existent user in cognito and dtls will be stored in our DB
* Change History :
* 09/05/2016    - Chaitanya,Sony,Vijaya - Initial Function
*
********************************************************************************************/
exports.updateUser_post = function (req, res) {

    var fnm = "updateUser_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    req.checkBody(usrmngtVld.updateUsrDtlsVld.body);
    var id = req.params.id;
    req.getValidationResult(req.body).then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            var payload = req.body;
            for (var ky in payload) {
                if (payload[ky])
                    payload[ky] = "'" + payload[ky] + "'";
                else
                    payload[ky] = null;
            }
            usrmngtmdl.updateUsers(req.user, id, payload, req.user)
                .then(function (results) {
                    log.info("INFO", cntxtDtls, 100, "local datbase insert success");
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    log.info("ERROR", cntxtDtls, 100, "local datbase insert failure");
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/***************************************************************************************************************
* Controller     : deleteUser_post
* Parameters     : req, res ()
* Description    : To delete a existent user in cognito and delete indicator will be changed to 1 in our DB
* Change History :
* 09/05/2016    - Chaitanya,Sony,Vijaya - Initial Function
*
****************************************************************************************************************/
exports.deleteUser_post = function (req, res) {

    var fnm = "deleteUser_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var id = req.params.id;
    usrmngtmdl.delUsrs_Acs(req.user, id)
        .then(function (results) {
            log.info("INFO", cntxtDtls, 100, "local datbase insert success");
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            log.info("ERROR", cntxtDtls, 100, "local datbase insert failure");
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : UsrsWthDsgns_get
* Parameters     : None
* Description    : 
* Change History :
* 05/06/2017    - Vijaya Lakshmi - Initial Function
*
***************************************************************************************/
exports.UsrsWthDsgns_get = function (req, res) {
    var usrDt = {
        clnt_id: req.user.clnt_id,
        tnt_id: jsonUtils.processData(req.user.tnts, 'tnt_id')
    }

    var fnm = "UsrsWthDsgns_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.getUsersWthDsgns(req.user, usrDt)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : Designation_Update
* Parameters     : None
* Description    : 
* Change History :
* 05/10/2017    - Vijaya Lakshmi - Initial Function
*
***************************************************************************************/
exports.PwdResetUsr_get = function (req, res) {
    var fnm = "PwdResetUsr_get"
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here 
    usrmngtmdl.PwdResetUsr(req.user, req.params)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : To create user menu profiles
* Parameters     : req.body
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 24/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
// exports.createAppPrf_post = function (req, res) {
//     var fnm = "createAppPrf_post";
//     log.info(`In ${fnm}`, 0, cntxtDtls);

//     // Model gets called Here
//     appPrfl_nm = req.params.appPrflNm;
//     data = req.body.appsLst;

//     if (req.body.admn_in == 1) {
//         usrmngtmdl.chckAdmnAppPrfl(req.user, req.params)
//             .then(function (results) {
//                 if (results.length > 0) {
//                     df.formatSucessRes(req, res, { status: 1 }, cntxtDtls, fnm, {});
//                 } else {
//                     newFunction();
//                 }
//             }).catch(function (error) {
//                 df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//             });
//     } else {
//         newFunction();
//     }
//     function newFunction() {
//         usrmngtmdl.postCreateAppPrf(req.user, req.params, req.body.admn_in)
//             .then(function (results) {
//                 var count = 0;
//                 for (var i = 0; i < data.length; i++) {
//                     data[i].sqnceId = i + 1;
//                     usrmngtmdl.appsFornewAppPrf(req.user, results.insertId, data[i])
//                         .then(function (appresults) {
//                             count++;
//                             if (count == data.length)
//                                 df.formatSucessRes(req, res, appresults, cntxtDtls, fnm, {});
//                         }).catch(function (error) {
//                             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//                         });
//                 }
//             }).catch(function (error) {
//                 df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//             });

//     }
// }


/**************************************************************************************
* Controller     : mtplClntTntCrtnFrUsr_post
* Parameters     : req,res()
* Description    : Multiple Client Tenant creation for Single User
* Change History :
* 31/01/2018     - Koti B - Initial Function
*
***************************************************************************************/
exports.mtplClntTntCrtnFrUsr_post = function (req, res) {
    var fnm = "mtplClntTntCrtnFrUsr_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var count = 0;
    // Model gets called Here 
    for (var i = 0; i < req.body.clntLst.length; i++) {
        count++;
        for (var j = 0; j < req.body.clntLst[i].tntsLst.length; j++) {

            if (!req.body.clntLst[i].tntsLst[j].app_prfle_id) {
                req.body.clntLst[i].tntsLst[j].app_prfle_id = null;
            }

            var data = {
                usr_id: req.body.usr_id,
                clnt_id: req.body.clntLst[i].clnt_id,
                tnt_id: req.body.clntLst[i].tntsLst[j].tnt_id,
                app_prfle_id: req.body.clntLst[i].tntsLst[j].app_prfle_id,
            }
            // console.log(data);
            usrmngtmdl.PostMtplClntTntCrtnFrUsr(req.user, data)
                .then(function (results) {
                    if (count == req.body.clntLst.length)
                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    }
}
/***************************************************************************************************************
* Controller     : userCreate_post
* Parameters     : req, res ()
* Description    : To create new user
* Change History :
* 12/10/2018    - Sony Angel - Initial Function
****************************************************************************************************************/
exports.userCreate_post = function (req, res) {
    var fnm = "userCreate_post....";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var clnt_id = req.user.clnt_id;
    var tnts = req.user.tnts;
    var payload = req.body;
    // console.log(tnts);

    var count = 0;
    payload.forEach(obj => {
        if (obj.pwd) {
            var pwdRls, pwdRls_ = [];
            if (obj.admn_in) {
                pwdRls = secConfig.pwdComplexity.adminusers;
            } else {
                pwdRls = secConfig.pwdComplexity.pubusers;
            }
            pwdRls.min_password_length <= obj.pwd.length ? pwdRls_ : pwdRls_.push(false);
            pwdRls.max_password_length >= obj.pwd.length ? pwdRls_ : pwdRls_.push(false);
            pwdRls.min_uppercase_required >= obj.pwd.replace(/[a-z]/g, '').length ? pwdRls_ : pwdRls_.push(false);
            pwdRls.min_lowercase_required >= obj.pwd.replace(/[A-Z]/g, '').length ? pwdRls_ : pwdRls_.push(false);
            pwdRls.digit_required >= obj.pwd.replace(/[A-Za-z]/g, '').length ? pwdRls_ : pwdRls_.push(false);
            pwdRls.special_character_required >= obj.pwd.replace(/[A-Za-z0-9]/g, '').length ? pwdRls_ : pwdRls_.push(false);
            if (pwdRls_.length)
                return df.formatErrorRes(req, res, { err_msg: 'INVALID_PASSWORD' }, cntxtDtls, fnm, {});
        } else {
            obj.pwd = secConfig.pwdComplexity.auto_generated_pwd();
        }
        for (var ky in obj) {
            if (obj[ky])
                obj[ky] = "'" + obj[ky] + "'";
            else obj[ky] = null;
        }
        // console.log(payload);

        usrmngtmdl.createUsers(req.user, clnt_id, tnts, obj, function (error, results) {
            if (error) {
                count++;
                if (count == payload.length) {
                    return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                }
            } else {
                //****************************Sending Mail*********************************//
                const mailOptions = {
                    to: result[0].eml_tx, // list of receivers
                    subject: 'SmartCard PASSWORD RECOVERY' // Subject line
                };
                // The user subscribed to the newsletter.
                mailOptions.html = `<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" align="right" valign="middle" style="color:#3d3d3d;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;7px 0 12px;"><p> <span class="m_9089412924928323771mobileBlock"> <strong>Attention:</strong> Your account was created or modified. Retrieve your temporary password. </span> <span class="m_9089412924928323771mobileHidden">&nbsp;|&nbsp;</span> <span class="m_9089412924928323771mobileBlock"> <a style="color:#0044cc;text-decoration:underline" href="http://localhost:4900" title="View website." target="_blank" data-saferedirecturl="http://localhost:4900">View website. </a> </span></p></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><h1 style="color:#000000;font-family:'Segoe UI Light','Segoe UI',Arial,sans-serif;font-size:38px;font-weight:100;line-height:38px;margin-bottom:12px;padding:0" class="m_9089412924928323771h1Header"> Your account has been created or modified..</h1></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td><td width="600" align="left" valign="top" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:16px;padding:0 0 30px"><p> The following contains temporary password.</p><p> Please note:</p><ul><li>Temporary passwords are valid for 90 days</li></ul><p> <strong>User Name: </strong> <a href="${obj.eml_tx}" target="_blank">${obj.usr_nm}</a> <br> <strong>Temporary Password: </strong> <a style="color:#000;text-decoration:none">${obj.pwd}</a></p><p> Once you have successfully signed in with your temporary password, you can create new password by following the instructions on the sign in page.</p><p> Go to the sign-in page, <a href="http://localhost:4901/login#/" style="color:#0044cc" target="_blank" data-saferedirecturl="http://localhost:4901/login#/">http://localhost:4901/login#/</a></p><p> Thank you for using Smart Cards.</p><p> Sincerely, <br>The Smart Card Support Team</p></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td></tr></tbody></table>`;
                mailUtls.sendMail(mailOptions, function (err, response) {
                    count++;
                    if (count == payload.length) {
                        return df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                    }
                })
            }
        });
    })
}
/***************************************************************************************************************
* Controller     : userCreate_post_p
* Parameters     : req, res ()
* Description    : To create new user
* Change History :
* 12/10/2018    - Sony Angel - Initial Function
****************************************************************************************************************/
exports.userCreate_post_p = function (req, res) {
    var fnm = "userCreate_post_p....";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    req.checkBody(usrmngtVld.addUser.body);

    req.getValidationResult(req.body).then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {
            var payload = req.body;
            payload.pwd = secConfig.pwdComplexity.auto_generated_pwd();
            for (var ky in payload) {
                if (payload[ky])
                    payload[ky] = "'" + payload[ky] + "'";
                else
                    payload[ky] = null;
            }

            // console.log(payload);
            usrmngtmdl.createUsers_p(req.user, payload, function (err, results) {
                if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
                res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
            });
        }
    })
}

/**************************************************************************************
* Controller     : _90DysInactvUsrs_C
* Parameters     : req,res()
* Description    : disable inactive user accounts every 90 days
* Change History :
* 17/10/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports._90DysInactvUsrs_C = function (req, res) {
    var fnm = "_90DysInactvUsrs_C";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    usrmngtmdl._90DysInactvUsrs_M(req.user, secConfig.pwdComplexity.adminusers.max_inactive_days)
        .then(function (results) {
            return results;
        })
        .then(function (results) {
            var data = jsonUtils.processData(results, 'usr_id');
            // console.log(data);
            usrmngtmdl.delUsrs_Acs(req.user, data)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        })
        .catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : _90DysFrcChngePwd_C
* Parameters     : req,res()
* Description    : Force users to change passwords for every 90 days
* Change History :
* 17/10/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports._90DysFrcChngePwd_C = function (req, res) {
    var fnm = "_90DysFrcChngePwd_C";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    usrmngtmdl._90DysFrcChngePwd_M(req.user, secConfig.pwdComplexity.adminusers.max_inactive_days)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        })
        .catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

exports.sendMsg_post = function (req, res) {
    console.log("Getting Here ------------");
    console.log(req.body);
    io.sockets.in('socketTest').emit('newmessage', { data: req.body });
    res.send({ status: 200, message: 'success' });
    // io.sockets.in('http://localhost:4901/apiv1').emit('new-message', {data: req.body});
    // res.send({status: 200, message: 'success'})
}

/**************************************************************************************
* Controller     : changeUserProfile
* Parameters     : req,res()
* Description    : To update profile
* Change History :
* 15/11/2019     -BORIGARLA KOTESWARARAO - Initial Function
*
***************************************************************************************/
exports.changeUserProfile = function (req, res) {
    var fnm = "changeUserProfile";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    usrmngtmdl.changeUserProfileMdl(req.user, secConfig.pwdComplexity.adminusers.max_inactive_days)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        })
        .catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getUsrCtgryCtrl
* Parameters     : req,res()
* Description    : Get user category list
* Change History :
* 13/02/2020    -Srujana M - Initial Function
*
***************************************************************************************/
exports.getUsrCtgryCtrl = function (req, res) {
    var fnm = "getUsrCtgryCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    usrmngtmdl.getUsrCtgryMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        })
        .catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : postAgntOtpCtrl
* Parameters     : req,res()
* Description    : Post agent otp
* Change History :
* 15/02/2020    -Srujana M - Initial Function
*
***************************************************************************************/
exports.postAgntOtpCtrl = function (req, res) {
    var fnm = "postAgntOtpCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data);
    usrmngtmdl.checkAgntMdl(req.body.data, req.user)
        .then((results) => {
            console.log(results);
            if (results.length) {
                return df.formatSucessRes(req, res, { errorCode: 'UserExistError' }, cntxtDtls, fnm, {});
            }
            else {

                var data = {
                    agnt_mbl: req.body.data.agnt_mbl_nu,
                    code: mailUtls.generateOTP()
                }
                console.log(data);
                var message = `Your One Time Password is ${data.code}. Please use this OTP to validate your login.`;

                mailUtls.sendDSMS(req.body.data.agnt_mbl_nu, message, function (err, response) {
                    if (err) {
                        return df.formatErrorRes(res, error, cntxtDtls, fnm, {});
                    }
                    // data.uuid = response.uuid;
                    // Model gets called Here
                    usrmngtmdl.sendOtpMdl(data)
                        .then(function (results) {
                            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                        })
                        .catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                })
            }
        })
        .catch(function (error) {
            console.log(error);
            df.formatErrorRes(res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : postAgntVldtOtpCtrl
* Parameters     : None
* Description    : Agent OTP Validation
* Change History :
* 17/02/2020    - Srujana M - Initial Function
*
***************************************************************************************/
exports.postAgntVldtOtpCtrl = function (req, res) {
    var fnm = "postAgntVldtOtpCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data);
    if (req.body.data.phno && req.body.data.otp) {
        usrmngtmdl.postAgntVldtOtpMdl(req.body.data).then((results) => {
            if (results.length) {
                return df.formatSucessRes(req, res, true, cntxtDtls, fnm, {});
            }
        })
            .catch(function (error) {
                df.formatErrorRes(res, error, cntxtDtls, fnm, {});
            })
    } else {
        return df.formatSucessRes(req, res, 'required phone number and otp', {});
    }
}

/**************************************************************************************
* Controller     : generateXmlCtrl
* Parameters     : req,res()
* Description    : Get user category list
* Change History :

*
***************************************************************************************/
exports.generateXmlCtrl = (req, res) => {
    var fnm = "generatexml";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.params.id)
    usrmngtmdl.checkcaf(req.params.id).then((results)=>{
        if (results.length) {
            usrmngtmdl.cafdtlsgetMdl(req.params.id).then((results1) => {
                console.log(results1.length)
                if (results1.length>0) {
                    let cafdata = []
                    _.forIn(_.groupBy(results1, 'cpeslno'), (value, key) => {
                        if (value.length > 1) {
                            cafdata.push({
                                srnlo: value[0].srnlo,
                                cpeslno: value[0].cpeslno,
                                caf_id: value[0].caf_id,
                                phoneno: value[0].phoneno,
                                passwrd: value[0].passwrd,
                                username: value[0].username,
                                phoneno1: "0000",
                                passwrd1: '',
                                username1: '',
                                // phoneno1: value[1].phoneno,
                                // passwrd1: value[1].passwrd,
                                // username1: value[1].username,
                                file_cnt: value.length,
                            })
                        }
                        else {
                            cafdata.push({
                                srnlo: value[0].srnlo,
                                cpeslno: value[0].cpeslno,
                                caf_id: value[0].caf_id,
                                phoneno: value[0].phoneno,
                                passwrd: value[0].passwrd,
                                username: value[0].username,
                                phoneno1: "0000",
                                passwrd1: '',
                                username1: '',
                                file_cnt: value.length
                            })
                        }
        
                    })
                    console.log(cafdata)
                    generate.generatexmlf(cafdata).then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                    })
                        .catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }
                else if(results1.length==0){
                    df.formatSucessRes(req, res, {err:'nodatafound'}, cntxtDtls, fnm, {});   
                }
            })
                .catch(function (error) {
                    df.formatErrorRes(res, error, cntxtDtls, fnm, {});
                })
        } else {
            
            return df.formatSucessRes(req, res, { err: 'nouser' }, cntxtDtls, '', {});

        }
    })
    .catch(function (error) {
        df.formatErrorRes(res, error, cntxtDtls, fnm, {});
    })



}

/**************************************************************************************
* Controller     : generateXmlMultiCtrl
* Parameters     : req,res()
* Description    : Get user category list
* Change History :

*
***************************************************************************************/
exports.generateXmlMultiCtrl = (req, res) => {
    var fnm = "generatexml";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.params.frmdt)

    usrmngtmdl.cafdtlsMultiMdl(req.params.frmdt, req.params.todt).then((results1) => {
        if (results1) {
            console.log("caf_dat")
            let cafdata = []

            _.forIn(_.groupBy(results1, 'cpeslno'), (value, key) => {
                if (value.length > 1) {
                    cafdata.push({
                        srnlo: value[0].srnlo,
                        cpeslno: value[0].cpeslno,
                        caf_id: value[0].caf_id,
                        phoneno: value[0].phoneno,
                        passwrd: value[0].passwrd,
                        username: value[0].username,
                        phoneno1: "0000",
                        passwrd1: '',
                        username1: '',
                        // phoneno1: value[1].phoneno,
                        // passwrd1: value[1].passwrd,
                        // username1: value[1].username,
                        file_cnt: value.length,
                    })
                }
                else {
                    cafdata.push({
                        srnlo: value[0].srnlo,
                        cpeslno: value[0].cpeslno,
                        caf_id: value[0].caf_id,
                        phoneno: value[0].phoneno,
                        passwrd: value[0].passwrd,
                        username: value[0].username,
                        phoneno1: "0000",
                        passwrd1: '',
                        username1: '',
                        file_cnt: value.length
                    })
                }

            })
            console.log("caf_dat1")
            console.log(cafdata)

            generate.generatexmlf(cafdata).then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            })
                .catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    })
        .catch(function (error) {
            df.formatErrorRes(res, error, cntxtDtls, fnm, {});
        })


}



/**************************************************************************************
* Controller     : getLMOContacts
* Parameters     : None
* Description    : Agent OTP Validation
* Change History :
* 17/02/2020    - Srujana M - Initial Function
*
***************************************************************************************/
exports.getLMOContacts = function (req, res) {
    var fnm = "getLMOContacts";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data);
    usrmngtmdl.getLMOContactsMdl(req.params.agent_id).then((results) => {
        let fltr_json = []
        if(results.length > 0)
        {
            _.forIn(_.groupBy(results, 'cntct_ctgry_id'), (value, key)=>{
                fltr_json.push({
                    cntct_ctgry_id: value[0]['cntct_ctgry_id'],
                    cntct_prsn_dsg : value[0]['cntct_prsn_dsg'],
                    cntct_prsn_lst : value
                })
            })
            df.formatSucessRes(req, res, fltr_json, cntxtDtls, fnm, {});
        }
        else{
            df.formatSucessRes(req, res, fltr_json, cntxtDtls, fnm, {});
        }
      
    }).catch(function (error) {
        df.formatErrorRes(res, error, cntxtDtls, fnm, {});
    })

}