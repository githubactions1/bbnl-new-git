// Standard Inclusions
var log = require(appRoot + '/utils/logmessages');
var df = require(appRoot + '/utils/dflower.utils');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var mailUtls = require(appRoot + '/utils/communication.utils');
var secConfig = require(appRoot + '/config/sec.config');
var operations = require(appRoot + '/utils/operations.utils');
var redisclnt = require(appRoot + '/utils/redis.utils');
var jsSHA = require('jssha');
// Model Inclusions
var authMdl = require('../models/authMdl');
var svgCaptcha = require('svg-captcha');
var captchMdl = require(appRoot + '/server/api/modules/captcha/models/captchaMdl.js');
var crypto = require('crypto');

/**************************************************************************************
* Controller : login_sess
* Parameters : None
* Description : To check if session with user details created or not
* Change History :
* 01/05/2016 - Sony Angel - Initial Function
*
***************************************************************************************/
exports.login_sess = function (req, res) {
    fnm = "login_sess"
    // log.info(`In ${fnm}`, 0, cntxtDtls);
    //log.info(req.body)

    // Model gets called Here
    req.body.cmpnt_id = (req.body.app == 'web') ? 1 : 2;

    authMdl.loginMdl(req.body)
        .then(function (usrDtls) {
            //console.log(usrDtls)
            if (usrDtls && usrDtls.length < 0) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            } else {
                return usrDtls;
            }
        }).then(function (login_details) {
            authMdl.getUsrAdtnlDtls(login_details[0])
                .then(function (usr_adtnl_info) {
                    let sts_cd = 'success';
                    if (login_details && login_details.length > 0) {
                        sts_cd = 'success';
                    }
                    else { sts_cd = 'fail' }
                    authMdl.check_usrMdl({ username: req.body.username }) /// NOT REQUIRED FOR SUCCESSFUL LOGIN
                        .then((result) => {
                            if (result && result.length) {
                                result[0].app = (req.body.app == 'web') ? 'Browser' : 'Mobile';
                                // Model gets called Here
                                authMdl.recordLoginHistoryMdl(result[0], sts_cd)
                                    .then((result) => {
                                        // //console.log('success');

                                    })
                                    .catch(function (error) {
                                    });
                            } else {
                                df.formatSucessRes(req, res, false, cntxtDtls, fnm, {});
                            }
                        })
                        .catch(function (error) {
                            df.formatSucessRes(req, res, false, cntxtDtls, fnm, {});
                        });
                    return { "login_details": login_details[0], "usr_adtnl_info": usr_adtnl_info[0] };

                }).then((usrDtls) => {
                    if (usrDtls != undefined) {
                        var data = {};
                        //console.log(usrDtls)
                        let payload;
                        payload = Object.assign({}, usrDtls.login_details, usrDtls.usr_adtnl_info, {
                            app: req.body.app,
                            cmpnt_id: req.body.cmpnt_id,
                            prt_in:usrDtls.login_details.prt_in,
                            caf_in:usrDtls.login_details.caf_in,
                            // chng_lg_in: usrDtls.login_details.chng_lg_in,
                            user_id: usrDtls.login_details.mrcht_usr_id,
                            // frst_nm: usrDtls.login_details.frst_nm,
                            // mbl_nu: usrDtls.login_details.mbl_nu,
                            // hyrchy_id: usrDtls.login_details.hyrchy_id,
                            // hyrchy_grp_id: usrDtls[0].login_details.hyrchy_grp_id,
                            // hyrchy_grp_nm: usrDtls[0].login_details.hyrchy_grp_nm,
                            // mrcht_id: usrDtls.login_details.mrcht_id,
                            // mrcht_nm: usrDtls.login_details.mrcht_nm,
                            // mrcht_usr_admn_in: usrDtls.login_details.admn_in,
                            // prfle_dshbd_url_tx:usrDtls[0].prfle_dshbd_url_tx
                        });
                        data.user = payload;
                        //console.log("added")
                        //console.log(payload)
                        var accessToken = jwt.sign(payload, 'glitssunil', {
                            algorithm: 'HS256', keyid: '1', expiresIn: '3h', issuer: 'glits', audience: 'http://glits.com', jwtid: '1', subject: payload.mrcht_usr_id + '_user'
                            // expiresIn: '24h' // expires in 24 hours
                        });

                        req.user = payload;
                        // //console.log("req.user")
                        // //console.log(req.user)
                        req.user.prfls = [];

                        // let usr_acc_vl = refresh_token(64);
                        // res.setHeader('x-access-token', usr_acc_vl);
                        // redisclnt.setValue(usr_acc_vl, accessToken, (err, resp) => {
                        //     //console.log(err, resp)
                        // });

                        res.setHeader('x-access-token', accessToken);
                        operations.record('lgn_ct');
                        df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
                    } else {
                        df.formatSucessRes(req, res, false, cntxtDtls, fnm, {});
                    }
                })
                .catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                })
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
    function refresh_token(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
}


/**************************************************************************************
* Controller : login_sess_new
* Parameters : None
* Description : To check if session with user details created or not
* Change History :
* 01/05/2016 - Sony Angel - Initial Function
captcha -sekhar 20/10/2022
*
***************************************************************************************/
exports.login_sess_new = function (req, res) {
    fnm = "login_sess_new"
    // log.info(`In ${fnm}`, 0, cntxtDtls);
    //log.info(req.body)

    // Model gets called Here
    var req_body = req.body.data ? req.body.data : req.body;
    req_body = replaceQuotesFromStrng(req_body);
    req_body.cmpnt_id = (req_body.app == 'web') ? 1 : 2;
    validateCaptch(req_body['captcha'], req_body['captchaID'], (cptch_err, cpthc_res) => {
        if (!cptch_err) {
            captchMdl.deactivateValidatedCaptchaMdl(req_body['captchaID']).then(function (cpth_vld_res) {
                authMdl.loginMdl_new(req_body, cpthc_res)
                    .then(function (usrDtls) {
                        // console.log(usrDtls)
                        if (usrDtls && usrDtls.length < 0) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        } else {
                            return usrDtls;
                        }
                    }).then(function (login_details) {
                        authMdl.getUsrAdtnlDtls(login_details[0])
                            .then(function (usr_adtnl_info) {
                                let sts_cd = 'success';
                                if (login_details && login_details.length > 0) {
                                    sts_cd = 'success';
                                }
                                else { sts_cd = 'fail' }
                                authMdl.check_usrMdl({ username: req_body.username }) /// NOT REQUIRED FOR SUCCESSFUL LOGIN
                                    .then((result) => {
                                        if (result && result.length) {
                                            result[0].app = (req_body.app == 'web') ? 'Browser' : 'Mobile';
                                            // Model gets called Here
                                            authMdl.recordLoginHistoryMdl(result[0], sts_cd)
                                                .then((result) => {
                                                    // //console.log('success');

                                                })
                                                .catch(function (error) {
                                                });
                                        } else {
                                            df.formatSucessRes(req, res, false, cntxtDtls, fnm, {});
                                        }
                                    })
                                    .catch(function (error) {
                                        df.formatSucessRes(req, res, false, cntxtDtls, fnm, {});
                                    });
                                return { "login_details": login_details[0], "usr_adtnl_info": usr_adtnl_info[0] };

                            }).then((usrDtls) => {
                                if (usrDtls != undefined) {
                                    var data = {};
                                    //console.log(usrDtls)
                                    let payload;
                                    payload = Object.assign({}, usrDtls.login_details, usrDtls.usr_adtnl_info, {
                                        app: req_body.app,
                                        cmpnt_id: req_body.cmpnt_id,
                                        prt_in: usrDtls.login_details.prt_in,
                                        caf_in: usrDtls.login_details.caf_in,
                                        // chng_lg_in: usrDtls.login_details.chng_lg_in,
                                        user_id: usrDtls.login_details.mrcht_usr_id,
                                        // frst_nm: usrDtls.login_details.frst_nm,
                                        // mbl_nu: usrDtls.login_details.mbl_nu,
                                        // hyrchy_id: usrDtls.login_details.hyrchy_id,
                                        // hyrchy_grp_id: usrDtls[0].login_details.hyrchy_grp_id,
                                        // hyrchy_grp_nm: usrDtls[0].login_details.hyrchy_grp_nm,
                                        // mrcht_id: usrDtls.login_details.mrcht_id,
                                        // mrcht_nm: usrDtls.login_details.mrcht_nm,
                                        // mrcht_usr_admn_in: usrDtls.login_details.admn_in,
                                        // prfle_dshbd_url_tx:usrDtls[0].prfle_dshbd_url_tx
                                    });
                                    data.user = payload;
                                    //console.log("added")
                                    //console.log(payload)
                                    var accessToken = jwt.sign(payload, 'glitssunil', {
                                        algorithm: 'HS256', keyid: '1', expiresIn: '3h', issuer: 'glits', audience: 'http://glits.com', jwtid: '1', subject: payload.mrcht_usr_id + '_user'
                                        // expiresIn: '24h' // expires in 24 hours
                                    });

                                    req.user = payload;
                                    // //console.log("req.user")
                                    // //console.log(req.user)
                                    req.user.prfls = [];

                                    // let usr_acc_vl = refresh_token(64);
                                    // res.setHeader('x-access-token', usr_acc_vl);
                                    // redisclnt.setValue(usr_acc_vl, accessToken, (err, resp) => {
                                    //     //console.log(err, resp)
                                    // });

                                    res.setHeader('x-access-token', accessToken);
                                    operations.record('lgn_ct');
                                    df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
                                } else {
                                    df.formatSucessRes(req, res, false, cntxtDtls, fnm, {});
                                }
                            })
                            .catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            })


                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });

            })
        } else {
            // return df.formatErrorRes(res, null, cntxtDtls, null, {});
            return df.formatErrorRes(req, res, cpthc_res, cntxtDtls, fnm, { error_status: "402", err_message: cpthc_res });
        }
    });
    function refresh_token(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
}

// validate captcha function
var validateCaptch = (cptch_txt, cptch_id, calbck) => {
    captchMdl.validateCaptchaMdl(cptch_txt, cptch_id).then(function (results) {
        if (results && results.length) {
            var cptchSltKey = results[0]['cptch_slt_ky']
            calbck(false, cptchSltKey);
        }
        else {
            calbck(true, "Invalid Captcha");
        }
    }, function (error) {
        calbck(true, "Invalid Captcha");
    });
}

/**************************************************************************************
* Controller : login_sbscrbr_app_sess
* Parameters : None
* Description : To check if session with user details created or not
* Change History :
* 22/07/2021 - ramesh  - Initial Function
*
***************************************************************************************/
exports.login_sbscrbr_app_sess = function (req, res) {
	console.log("came here");
    fnm = "login_sbscrbr_sess"
    // log.info(`In ${fnm}`, 0, cntxtDtls);
    //log.info(req.body)

    // Model gets called Here
    req.body.cmpnt_id = (req.body.app == 'web') ? 1 : 2;

    authMdl.loginsbscrbrAppMdl(req.body)
        .then(function (usrDtls) {
			console.log("usrDtls", usrDtls);
            if (usrDtls && usrDtls.length == 0) {
				let error = 'no records found';
                df.formatAppMbleInvalidErrorRes(req, res, error, cntxtDtls, fnm, {});
            } else if (usrDtls && usrDtls.length >1) {
				df.formatAppMoreMbleErrorRes(req, res, "More Than One Record Found", cntxtDtls, fnm, {});
			} else {
                var r = usrDtls;
                if(r[0]['trmnd_in'] != 1){
                    authMdl.updcstmrtypMdl(req.body, usrDtls[0])
                    .then(function (usr_adtnl_info) {
                         console.log("usr_adtnl_info", usr_adtnl_info);
						console.log("usrdtls in above", usrDtls);
                    })
					authMdl.getpckgeidcstmrMdl(usrDtls[0])
						.then(function (packcount) {
						console.log("packcount",packcount);
						return packcount;
                    }).then(function (packcount) {
                        authMdl.getpckgenamecstmrMdl(packcount[0])
                            .then(function (packnames) {
                            console.log("packnames",packnames);
                            return packnames;  
                        })
                    }).then( function (checks) {
						authMdl.getcstmrprfleDtlsFrmBssMdl(usrDtls[0])
							.then(function (dtlsfrmbss) {
							console.log("dtlsfrmbss",dtlsfrmbss);
							data.user['data']= dtlsfrmbss;
							return dtlsfrmbss;
						})	
					var data = {};
                        let payload;
                        payload = Object.assign({}, usrDtls,  {
                            app: req.body.app_type,
                            custom_customer_no:usrDtls.caf_id,
                        });
                        data.user = payload;
                    var accessToken = jwt.sign(payload, 'glitssunil', {
                        algorithm: 'HS256', keyid: '1', expiresIn: '3h', issuer: 'glits', audience: 'http://glits.com', jwtid: '1', subject: payload.mrcht_usr_id + '_user'
                        // expiresIn: '24h' // expires in 24 hours
                    });
					req.user = payload;
                    res.setHeader('x-access-token', accessToken);
                    operations.record('lgn_ct');
					data.user[0]['accessToken'] = accessToken;
					
					authMdl.insrttokentotbles(usrDtls[0], accessToken, req.body)
						.then(function (packcount) {
						console.log("packcount",packcount);
						return packcount;
					})
					
                    df.formatSucessAppRes(req, res, data.user[0], cntxtDtls, fnm, {});
					})
                } else {
					let error = {};
                    df.formatAppErrorRes(req, res, error, cntxtDtls, fnm, {});
                }
                return r;
            }
        }).catch(function (error) {
			console.log("error with out status ",error);
            df.formatAppMbleInvalidErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
    function refresh_token(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
}


/**************************************************************************************
* Controller : login_sbscrbr_lmo_app_sess
* Parameters : None
* Description : To check if session with user details created or not
* Change History :
* 02/08/2021 - ramesh  - Initial Function
*
***************************************************************************************/
exports.login_sbscrbr_dtls_app_sess = function (req, res) {
	fnm = "login_sbscrbr_dtls_app_sess"
	authMdl.getcstmrprfleDtlsFrmBssMdl(req.body)
		.then(function (dtlsfrmbss) {
		//console.log("dtlsfrmbss",dtlsfrmbss);	
		df.formatSucessAppRes(req, res, dtlsfrmbss, cntxtDtls, fnm, {});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
	});
}

/**************************************************************************************
* Controller     : getClntUsr
* Parameters     : None
* Description    : To check if session with user details created or not
* Change History :
* 01/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getClntUsr = function (req, res) {

    var fnm = "getClntUsr";

    // Model gets called Here
    authMdl.getClntUsrMdl(req.params.usrId)
        .then(function (result) {
            return result
        }).then((result) => {

            let payload;
            if (result.length > 0) {
                payload = Object.assign({}, result[0], req.body);

                var accessToken = jwt.sign(payload, 'glitssunil', {
                    algorithm: 'HS256', keyid: '1', expiresIn: '3h', issuer: 'glits', audience: 'http://glits.com', jwtid: '1', subject: payload.mrcht_usr_id + '_user'
                    // expiresIn: '24h' // expires in 24 hours
                });
                res.setHeader('x-access-token', accessToken);
                delete payload.app;
                req.user = payload;
            } else {
                payload = null;
            }

            df.formatSucessRes(req, res, payload, cntxtDtls, fnm, {});
        })
        .catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : auditUserActivity
* Parameters     : None
* Description    : To check if session with user details created or not
* Change History :
* 01/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.auditUserActivity = function (req, res) {
    var fnm = "auditUserActivity";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    authMdl.auditUserActivityMdl()
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getUsrsAdt
* Parameters     : None
* Description    : To check if session with user details created or not
* Change History :
* 01/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getUsrsAdt = function (req, res) {
    var fnm = "getUsrsAdt";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    authMdl.getUsrsAdtMdl()
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : forget_pwd
* Parameters     : None
* Description    : To change password
* Change History :
* 27/06/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.forget_pwd = function (req, res) {
    var fnm = "forgot_pwd";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var new_password = secConfig.pwdComplexity.auto_generated_pwd();
    var data = req.body;

    // Model gets called Here
    authMdl.check_usrMdl(data)
        .then(function (result) {

            if (result.length > 0) {
                if (!data.mobile) {
                    //****************************Sending Mail*********************************//
                    const mailOptions = {
                        to: result[0].eml_tx, // list of receivers
                        subject: 'APSFL PASSWORD RECOVERY' // Subject line
                    };
                    // The user subscribed to the newsletter.
                    mailOptions.html = `<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" align="right" valign="middle" style="color:#3d3d3d;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;7px 0 12px;"><p> <span class="m_9089412924928323771mobileBlock"> <strong>Attention:</strong> Your account was created or modified. Retrieve your temporary password. </span> <span class="m_9089412924928323771mobileHidden">&nbsp;|&nbsp;</span> <span class="m_9089412924928323771mobileBlock"> <a style="color:#0044cc;text-decoration:underline" href="http://localhost:4900" title="View website." target="_blank" data-saferedirecturl="http://localhost:4900">View website. </a> </span></p></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><h1 style="color:#000000;font-family:'Segoe UI Light','Segoe UI',Arial,sans-serif;font-size:38px;font-weight:100;line-height:38px;margin-bottom:12px;padding:0" class="m_9089412924928323771h1Header"> Your account has been created or modified..</h1></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td><td width="600" align="left" valign="top" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:16px;padding:0 0 30px"><p> The following contains temporary password.</p><p> Please note:</p><ul><li>Temporary passwords are valid for 90 days</li></ul><p> <strong>User Name: </strong> <a href="${result[0].eml_tx}" target="_blank">${result[0].usr_nm}</a> <br> <strong>Temporary Password: </strong> <a style="color:#000;text-decoration:none">${new_password}</a></p><p> Once you have successfully signed in with your temporary password, you can create new password by following the instructions on the sign in page.</p><p> Go to the sign-in page, <a href="http://localhost:4901/login#/" style="color:#0044cc" target="_blank" data-saferedirecturl="http://localhost:4901/login#/">http://localhost:4901/login#/</a></p><p> Thank you for using Smart Cards.</p><p> Sincerely, <br>The Smart Card Support Team</p></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td></tr></tbody></table>`;
                    mailUtls.sendMail(mailOptions, function (err, response) {
                        if (err) {
                            return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        }

                        // Model gets called Here
                        authMdl.change_pwdMdl({ usr_id: result[0].mrcht_usr_id, nw_pswrd: new_password }, 1)
                            .then(function (results) {
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    })

                } else {
                    //var message = `Hi, \r\n Your request for reset password has been accepted. Here is your temporary password to change.\r\n User Name: ${result[0].usr_nm}\r\n Temporary Password: ${new_password}\r\n Thank you.\r\n The Smart Card Support Team`;
					var message = `Your+OTP+for+Password+reset+is+${new_password}+-Team+APSFL`;
                    mailUtls.sendDSMS(data.mobile, message, '1107161838506775395', function (err, response) {
                        if (err) {
                            return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        }
                        // Model gets called Here
                        authMdl.change_pwdMdl({ usr_id: result[0].mrcht_usr_id, nw_pswrd: new_password }, 1)
                            .then(function (results) {
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    })
                }

                //******************************************************************************//
            } else
                df.formatSucessRes(req, res, false, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : sbscrbd_app_forget_pwd
* Parameters     : None
* Description    : To change password
* Change History :
* 23/07/2021    - Ramesh - Initial Function
*
***************************************************************************************/
exports.sbscrbd_app_forget_pwd = function (req, res) {
    var fnm = "sbscrbd_app_forget_pwd";
    log.info(`In ${fnm}`, 0, cntxtDtls);
	var genPwd = getPassword() ;
    //var genPwd = secConfig.pwdComplexity.auto_generated_pwd();
    var data = req.body;

    // Model gets called Here
    authMdl.check_sbscrbd_app_usrMdl(data)
        .then(function (result) {
			console.log("result",result);
			console.log("length",result.length);
			
			if(result.length == 1){
				console.log("came in if");
				console.log(result[0]['actve_in'] != 0);
				console.log(result[0]['spnd_in'] != 0);
				if(result[0]['actve_in'] != 0 && result[0]['spnd_in'] != 0 ) {
					console.log("terminated");
					let error = {};
					df.formatAppErrorRes(req, res, error, cntxtDtls, fnm, {});
				}
				var message = `Your+OTP+for+Password+reset+is+${genPwd}+-Team+APSFL`;
				console.log("message", message);
				mailUtls.sendDSMS(result[0].mbl_nu, message, '1107161838506775395', function (err, response) {
					if (err) {
						return df.formatAppMoreMbleErrorRes(req, res, err, cntxtDtls, fnm, {});
					} else {
						authMdl.updpwd_sbscrbd_app_usrMdl(data, result[0], genPwd)
							.then(function (updpwd) {
								console.log("otp data", result[0]);
								 var datas ={};
								datas['otp']=genPwd;
								datas['mobile_no']=result[0].mbl_nu;
								datas['caf_id']=result[0].caf_id;
								df.formatSucessAppRes(req, res, datas, cntxtDtls, fnm, {});
							}).catch(function (error) {
								console.log("error");
								df.formatAppUpdtFailedErrorRes(req, res, error, cntxtDtls, fnm, {});
							})
					}
				})
				//return result;	
			} else if(result.length > 1) {
				let error = {};
				df.formatAppMoreMbleErrorRes(req, res, error, cntxtDtls, fnm, {});
			} else {
				let error = {};
				console.log("came first");
				df.formatAppMbleInvalidErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch(function (error) {
			console.log("came second");
            df.formatAppMbleInvalidErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

function getPassword() {
    /*var randPassword = Array(8).fill("abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789@").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');*/ //old password generation
	
	var chars = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz","0123456789", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"];
	var randPassword = [1,1,6].map(function(len, i) { return Array(len).fill(chars[i]).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('') }).concat().join('').split('').sort(function(){return 0.5-Math.random()}).join('');
	console.log("passwrod", randPassword); //new passwrod code for huawei format
	
    return randPassword;
}

/**************************************************************************************
* Controller     : change_pwd
* Parameters     : None
* Description    : To change password
* Change History :
* 27/06/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.change_pwd = function (req, res) {

    var fnm = "change_pwd";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // //console.log(req.body);

    // Model gets called Here
    authMdl.check_pwdMdl(req.body)
        .then(function (results) {
            if (results && results.length) {
                df.formatErrorRes(req, res, "Password already Used, try other password", cntxtDtls, fnm, {});
            }
            else {
                // Model gets called Here
                authMdl.change_pwdMdl(req.body, 0)
                    .then(function (results) {
                        authMdl.pwd_chnghistMdl(req.body)
                            .then(function (results) {
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : sbscrbd_app_change_pwd
* Parameters     : None
* Description    : To change password
* Change History :
* 22/07/2021    - Ramesh - Initial Function
*
***************************************************************************************/
exports.sbscrbd_app_change_pwd = function (req, res) {

    var fnm = "sbscrbd_app_change_pwd";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    //console.log(req.body);
	if(req.body.old_password != req.body.new_password){
		authMdl.check_sbscr_app_pwdMdl(req.body)
			.then(function (results) {
				console.log("result in pwd change", results.length)
				console.log("result in pwd change", results)
				if (results && results.length > 0) {
					authMdl.change_sbscr_app_pwdMdl(req.body)
						.then(function (results) {
							console.log("update results", results);
							console.log("message in change password sucess")
						}).catch(function (error) {
							df.formatAppFailedErrorRes(req, res, "Password Not Updated", cntxtDtls, fnm, {});
						});
					df.formatSucessAppRes(req, res, "Password Updated", cntxtDtls, fnm, {});
				}
				else {
					df.formatAppInvalidErrorRes(req, res, "Invalid Old Password.", cntxtDtls, fnm, {});
					console.log("check password");
				}
			}).catch(function (error) {
				df.formatAppInvalidErrorRes(req, res, error, cntxtDtls, fnm, {});
			});
	} else {
		
		df.formatAppSameInvalidErrorRes(req, res, "use different password", cntxtDtls, fnm, {});
	}
}

/**************************************************************************************
* Controller     : change_phnum
* Parameters     : None
* Description    : To change Phone number
* Change History :
* 27/06/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.change_phnum = function (req, res) {

    var fnm = "change_phnum";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    //console.log(req.body);

    // Model gets called Here
    authMdl.change_phnNumMdl(req.body)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : reset_pwd
* Parameters     : None
* Description    : To reset password
* Change History :
* 27/06/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.reset_pwd = function (req, res) {

    var fnm = "reset_pwd";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var new_password = secConfig.pwdComplexity.auto_generated_pwd();

    var data = req.body;

    // Model gets called Here
    authMdl.check_usrMdl(data)
        .then(function (result) {

            if (data.pwd) {
                var pwdRls, pwdRls_ = [];
                pwdRls = secConfig.pwdComplexity.pubusers;
                pwdRls.min_password_length <= data.pwd.length ? pwdRls_ : pwdRls_.push(false);
                pwdRls.max_password_length >= data.pwd.length ? pwdRls_ : pwdRls_.push(false);
                pwdRls.min_uppercase_required >= data.pwd.replace(/[a-z]/g, '').length ? pwdRls_ : pwdRls_.push(false);
                pwdRls.min_lowercase_required >= data.pwd.replace(/[A-Z]/g, '').length ? pwdRls_ : pwdRls_.push(false);
                pwdRls.digit_required >= data.pwd.replace(/[A-Za-z]/g, '').length ? pwdRls_ : pwdRls_.push(false);
                pwdRls.special_character_required >= data.pwd.replace(/[A-Za-z0-9]/g, '').length ? pwdRls_ : pwdRls_.push(false);
                if (pwdRls_.length)
                    return df.formatErrorRes(req, res, { err_msg: 'INVALID_PASSWORD' }, cntxtDtls, fnm, {});
                else
                    new_password = data.pwd;
            }
            if (data.eml_tx) result[0].eml_tx = data.eml_tx;

            if (result.length > 0) {
                if (!data.phno_in) {
                    //****************************Sending Mail*********************************//
                    const mailOptions = {
                        to: result[0].eml_tx, // list of receivers
                        subject: 'APSFL PASSWORD RECOVERY' // Subject line
                    };
                    // The user subscribed to the newsletter.
                    mailOptions.html = `<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" align="right" valign="middle" style="color:#3d3d3d;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:bold;padding:7px 0 12px;"><p> <span class="m_9089412924928323771mobileBlock"> <strong>Attention:</strong> Your account was created or modified. Retrieve your temporary password. </span> <span class="m_9089412924928323771mobileHidden">&nbsp;|&nbsp;</span> <span class="m_9089412924928323771mobileBlock"> <a style="color:#0044cc;text-decoration:underline" href="http://localhost:4900" title="View website." target="_blank" data-saferedirecturl="http://localhost:4900">View website. </a> </span></p></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td><h1 style="color:#000000;font-family:'Segoe UI Light','Segoe UI',Arial,sans-serif;font-size:38px;font-weight:100;line-height:38px;margin-bottom:12px;padding:0;text-align:center" class="m_9089412924928323771h1Header"> Your account has been created or modified..</h1></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td><td width="600" align="left" valign="top" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:16px;padding:0 0 30px"><p> The following contains temporary password.</p><p> Please note:</p><ul><li>Temporary passwords are valid for 90 days</li></ul><p> <strong>User Name: </strong> <a href="${result[0].eml_tx}" target="_blank">${result[0].usr_nm}</a> <br> <strong>Temporary Password: </strong> <a style="color:#000;text-decoration:none">${new_password}</a></p><p> Once you have successfully signed in with your temporary password, you can create new password by following the instructions on the sign in page.</p><p> Go to the sign-in page, <a href="http://localhost:4901/login#/" style="color:#0044cc" target="_blank" data-saferedirecturl="http://localhost:4901/login#/">http://localhost:4901/login#/</a></p><p> Thank you for using Smart Cards.</p><p> Sincerely, <br>The Smart Card Support Team</p></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td></tr></tbody></table>`;
                    mailUtls.sendMail(mailOptions, function (err, response) {
                        if (err) {
                            return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        }

                        // Model gets called Here
                        authMdl.change_pwdMdl({ usr_id: result[0].mrcht_usr_id, nw_pswrd: new_password }, 1)
                            .then(function (results) {
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    })

                } else {
                    //var message = `Hi, \r\n Your request for reset password has been accepted. Here is your temporary password to change.\r\n User Name: ${result[0].usr_nm}\r\n Temporary Password: ${new_password}\r\n Thank you.\r\n The Smart Card Support Team`;
					var message = `Your+OTP+for+Password+reset+is+${new_password}+-Team+APSFL`;
                    mailUtls.sendDSMS(req.body.mobile, message, '1107161838506775395', function (err, response) {
                        if (err) {
                            return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        }
                        // Model gets called Here
                        authMdl.change_pwdMdl({ usr_id: result[0].mrcht_usr_id, nw_pswrd: new_password }, 1)
                            .then(function (results) {
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            });
                    })
                }

                //******************************************************************************//
            } else
                df.formatSucessRes(req, res, false, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : sbscr_app_reset_pwd
* Parameters     : None
* Description    : To change Phone number
* Change History :
* 21/10/2021    - Ramesh - Initial Function
*
***************************************************************************************/
exports.sbscr_app_reset_pwd = function (req, res) {

    var fnm = "change_phnum";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    //console.log(req.body);
	authMdl.check_reset_pwd(req.body).then( function (data) {
		console.log("length in reset pass", data,data.length);
		if( data.length > 0 ) { 
		authMdl.change_reset_pwd(req.body)
			.then(function (results) {
				df.formatSucessAppRes(req, res, "password Updated", cntxtDtls, fnm, {});
			}).catch(function (error) {
				df.formatAppFailedErrorRes(req, res, error, cntxtDtls, fnm, {});
			});
		} else {
			let err = "please check OTP .";
			df.formatAppFailedErrorRes(req, res, err, cntxtDtls, fnm, {});
		}
	}).catch( function (err) {
		let error = "please enter valid OTP";
		df.formatAppFailedErrorRes(req, res, error, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : logout_sess
* Parameters     : None
* Description    : To destroy session when user logged out
* Change History :
* 02/05/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.logout_sess = function (req, res) {
    var fnm = "logout";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    /*if(req.user.mnu_prfle_id == 83 || req.user.mnu_prfle_id == 8 || req.user.mnu_prfle_id == 98  || req.user.mnu_prfle_id == 84 || req.user.mnu_prfle_id == 2000007){
        authMdl.logout_sessMdl(req.user)
        .then(function (results) {
            date = new Date();
            if (sessionStore)
                sessionStore.close();
            req.session.destroy();
            res.send({ status: 200, message: "Logged Out at " + date });
            return;
            //df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
    } else {*/
        date = new Date();
        if (sessionStore)
            sessionStore.close();
        req.session.destroy();
        res.send({ status: 200, message: "Logged Out at " + date });
        return;
    //}
}

/**************************************************************************************
* Controller     : getOrgnsLst
* Parameters     : None
* Description    : To get all tenants list
* Change History :
* 04/08/2017    - Srujana M - Initial Function
*
***************************************************************************************/
exports.getOrgnsLst = function (req, res) {
    var fnm = "getOrgnsLst";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    authMdl.get_allOrgnsLstMdl()
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : logout_sbscrbr_app_sess
* Parameters     : None
* Description    : To destroy session when user logged out
* Change History :
* 23/07/2021    - Ramesh - Initial Function
*
***************************************************************************************/
exports.logout_sbscrbr_app_sess = function (req, res) {
    var fnm = "logout_sbscrbr_app_sess";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    date = new Date();
    if (sessionStore)
        sessionStore.close();
    req.session.destroy();
    res.send({ status: 200, message: "Logged Out at " + date });
    return;
}

/**************************************************************************************
* Controller     : get_goToLgn
* Parameters     : None
* Description    : Goto login page
* Change History :
* 04/08/2017    - Srujana M - Initial Function
*
***************************************************************************************/
exports.get_goToLgn = function (req, res) {
    var fnm = "get_goToLgn";
    var tnt_id = req.params.tnt_id;
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    authMdl.get_goToLgnMdl(tnt_id)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : contactus
* Parameters     : None
* Description    : To change password
* Change History :
* 27/06/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.contactus = function (req, res) {
    var fnm = "contactus";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    var data = req.body;

    //****************************Sending Mail*********************************//
    const mailOptions = {
        from: data.email, // sender address
        to: 'office.glits@gmail.com', // list of receivers
        subject: 'APSFL SignUp Request' // Subject line
    };

    // The user subscribed to the newsletter.
    mailOptions.text = 'Message: ' + data.message;
    mailUtls.sendMail(mailOptions).then((info) => {
        df.formatSucessRes(req, res, info.response, cntxtDtls, fnm, {});
    }, (err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, fnm, {});
    });
}

/**************************************************************************************
* Controller     : validateOtp
* Parameters     : None
* Description    : To check if session with user details created or not
* Change History :
* 01/11/2018    - Ramya Machana - Initial Function
*
***************************************************************************************/
exports.validateOtp = function (req, res) {
    var fnm = "getOrgnsLst";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    if (req.body.data.phno && req.body.data.otp) {
        authMdl.validateOtpMdl(req.body.data, req.user, function (error, result) {
            //console.log(result);
            if (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                return;
            }
            if (result.length > 0) {
                return df.formatSucessRes(req, res, true, cntxtDtls, fnm, {});

            }
            else {
                return df.formatErrorRes(req, res, "Please Enter Valid OTP", cntxtDtls, fnm, {});

            }
        });
    } else {
        return df.formatSucessRes(req, res, 'required phone number and otp', {});
    }
}

/**************************************************************************************
* Controller     : sendOtp
* Parameters     : None
* Description    : Send OTP to user mobile number
* Change History :
* 01/11/2018    - Ramya Machana - Initial Function
*
***************************************************************************************/
exports.sendOtp = function (req, res) {
    var fnm = "getOrgnsLst";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    //console.log(req.body.data);
    // return
    // authMdl.check_agntMdl(req.body.data)
    //     .then((results) => {
    //         //console.log(results);
    //         if (results.length) {
    //             return df.formatSucessRes(req, res, { errorCode: 'UserExistError' }, cntxtDtls, fnm, {});
    //         }
            // else {
                var totpObj = new TOTP();
                var otp = totpObj.getOTP('onetimepassword');
                //var msg_tx = `Your OTP for New LMO Registration is ${otp} -Team APSFL `;
				var msg_tx = `Your+One+Time+Password+is+${otp}+Please+use+this+OTP+to+validate+your+login+-Team+APSFL`;

                authMdl.sendOtpMdl(req.user, req.body.data,msg_tx,'1107161746884722114',otp, function (error, result) {
					console.log("ERR",error)
					console.log("result",result)
                    if (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        return;
                    }
                    return df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                });
            // }
        // })
        // .catch(function (error) {
        //     //console.log(error);
        // });
}

/**************************************************************************************
* Controller     : sendOtp
* Parameters     : None
* Description    : Send OTP to user mobile number
* Change History :
* 01/11/2018    - Ramya Machana - Initial Function
*
***************************************************************************************/
exports.sendPhnVrctnOtp = function (req, res) {
    var fnm = "getOrgnsLst";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data);
    // return
    var totpObj = new TOTP();
                var otp = totpObj.getOTP('onetimepassword');
                //var msg_tx = `Your OTP for KYC is ${otp} -Team APSFL `;
				var msg_tx = `Your+OTP+for+KYC+is+${otp}+-Team+APSFL`;
    authMdl.sendOtpMdl(req.user, req.body.data,msg_tx,'1107161838508891541',otp, function (error, result) {
        if (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            return;
        }
        return df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    });
       
}


/**************************************************************************************
* Controller     : forget_pwd_sendOtp
* Parameters     : None
* Description    : Send OTP to user mobile number
* Change History :
* 01/11/2018    - Ramya Machana - Initial Function
*
***************************************************************************************/
exports.forget_pwd_sendOtp = function (req, res) {
    var fnm = "forget_pwd_sendOtp";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var mrcht_usr_id = 1
    authMdl.check_usrMdl({ mobile: req.body.phno,usr_nm:req.body.mrcht_usr_nm})
        .then((results) => {
            if (results && results.length > 0) {
                if ((req.body.phno == results[0].mbl_nu) && (req.body.mrcht_usr_nm == results[0].mrcht_usr_nm)) {
                    var totpObj = new TOTP();
                var otp = totpObj.getOTP('onetimepassword');
                //var msg_tx = `Your OTP for Password reset is ${otp} - Team APSFL`;
				var msg_tx = `Your+OTP+for+Password+reset+is+${otp}+-Team+APSFL`;
                    authMdl.sendOtpMdl(req.user, req.body,msg_tx,'1107161838506775395',otp, function (error, otp_result) {
						console.log("error, otp_result",error, otp_result);
                        if (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            return;
                        } else {
                            var data = {
                                mrcht_usr_id: results[0].mrcht_usr_id,
                                mrcht_usr_nm: results[0].mrcht_usr_nm,
                                code: otp_result.code,
                                mbl_nu: results[0].mbl_nu
                            }
                            return df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
                        }
                    });
                } else {
                    return df.formatSucessRes(req, res, { errorCode: 'notvadusrDtls' }, cntxtDtls, fnm, {});
                }

            }
            else {
                //return df.formatSucessRes(req, res, { errorCode: 'UserNotExistError' }, cntxtDtls, fnm, {});
                return df.formatErrorRes(req, res, 'UserNotExistError' , cntxtDtls, fnm, { error_status: "700", err_message: "User Not Exist ." });
            }
        })
        .catch(function (error) {
            //console.log(error);
        });
}

/**************************************************************************************
* Controller     : User Reset Password 
* Parameters     : None
* Description    : Reset User password
* Change History :
* 01/11/2018    - Ramya Machana - Initial Function
*
***************************************************************************************/
exports.userForgetpwd = function (req, res) {
    var fnm = "getOrgnsLst";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    authMdl.userForgetpwdMdl(req.user, req.body, function (error, result) {
        if (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            return;
        }
        else {
            return df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }
    });
}

/**************************************************************************************
* Controller     : matchOldNewPwd 
* Parameters     : None
* Description    : Match Old And NEw Password for change password
* Change History :
* 01/11/2019    - KOTESWARARAO BORIGARLA - Initial Function
*
***************************************************************************************/
exports.matchOldNewPwd = function (req, res) {
    var fnm = "matchOldNewPwd";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    authMdl.matchOldNewPwdMdl(req.user, req.body).then((results)=>{
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
    }).catch((error)=>{
        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    })
}


/**************************************************************************************
* Controller     : getUsrPrmsData 
* Parameters     : None
* Description    : Get permissions according to login
* Change History :
* 26/03/2020    - Srujana M - Initial Function
*
***************************************************************************************/
exports.getUsrPrmsDataCtrl = function (req, res) {
    var fnm = "getUsrPrmsDataCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    authMdl.getUsrPrmsDataMdl(req.user, req.params.prm_txt)
    .then(function (result) {
        return df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    }).catch(function (error) {
        //console.log(error);
    });
    // authMdl.getUsrPrmsDataMdl(req.user, req.params.prm_txt, function (error, result) {
    //     if (error) {
    //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //         return;
    //     }
    //     else {
    //         return df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //     }
    // });
}
/**************************************************************************************
* Controller     : getUsrPrmsData 
* Parameters     : None
* Description    : Get permissions according to login
* Change History :
* 26/03/2020    - Srujana M - Initial Function
*
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

/**************************************************************************************
* Controller     : generateCaptchaCntrl
* Parameters     : req,res()
* Description    : 
* Change History : chandra - Initial Function
*
***************************************************************************************/

var genSaltKey = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

exports.generateCaptchaCntrl = function (req, res) {
    var fnm = "generateCaptchaCntrl";
    var captcha = svgCaptcha.create(
        {
            Size: 4,
            Width: 100,
            Height: 50,
            Noise: 2,
            fontSize: 35,
            Color: false
        }
    );
    var salt_ky = genSaltKey(16);
    captchMdl.insrtCpatchaTxtMdl(captcha.text, salt_ky).then(function (results) {
        if (results && results['insertId']) {
            var img_src = `data:image/svg+xml;base64,` + Buffer.from(captcha.data).toString('base64');
            df.formatSucessRes(req, res, { data: img_src, cptch_id: results['insertId'], salt_ky: salt_ky }, cntxtDtls, fnm, {});
        }
        else {
            df.formatErrorRes(res, null, cntxtDtls, fnm, {});
        }
    }, function (error) {
        df.formatErrorRes(res, error, cntxtDtls, fnm, {});
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