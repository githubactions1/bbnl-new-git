var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var mnumngtmdl = require('../models/menuMgtMdl');
var attUtil = require(appRoot + '/utils/attachment.utils');
var _ = require('lodash');
var smsUtils = require(appRoot + '/utils/sms.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var jsonUtils = require(appRoot + '/utils/json.utils');

/**************************************************************************************
* Controller     : To create user menu profiles
* Parameters     : req.bodyusermenu_get
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 18/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.createMnu_post = function (req, res) {
    var fnm = "createMnu_post";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    data = req.body.menuitem;

    if (req.body.admn_in == 1) {
        mnumngtmdl.chckAdmnMnuPrfl(req.user, req.body)
            .then(function (results) {
                if (results.length > 0) {
                    df.formatSucessRes(req, res, { status: 1 }, cntxtDtls, fnm, {});
                } else {
                    newFunction();
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    } else {
        newFunction();
    }

    function newFunction() {
        mnumngtmdl.postCreateMnu(req.user, req.body)
            .then(function () {
                mnumngtmdl.getMnuPrflId(req.user, req.body.mnuPrflNM)
                    .then(function (results) {
                        if (results.length > 0) {
                            var count = 0;
                            for (var i = 0; i < data.length; i++) {
                                (function (j) {
                                    setTimeout(function () {
                                        data[j].sqnceId = j + 1;
                                        if (!data[j].submnu_itm_id) {
                                            data[j].submnu_itm_id = data[j].mnu_itm_id;
                                            data[j].mnu_itm_id = 0;
                                        }
                                        mnumngtmdl.itmsFornewMnu(req.user, results[0].mnu_prfle_id, data[j])
                                            .then(function (results) {
                                                count++;
                                                if (count == data.length)
                                                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                            });
                                    }, (j % data.length) * 2000);
                                })(i);
                            }
                        }
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }


}


/**************************************************************************************
* Controller     : Update menu profile
* Parameters     : req.body
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 25/01/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.updtMnuPrf = function (req, res) {
    var fnm = "updtMnuPrf";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    data = req.body.menuitem;

    if (req.body.admn_in == 1) {
        mnumngtmdl.chckAdmnMnuPrfl(req.user, req.body)
            .then(function (results) {
                if (results.length > 0) {
                    df.formatSucessRes(req, res, { status: 1 }, cntxtDtls, fnm, {});
                } else {
                    newFunction();
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    } else {
        newFunction();
    }
    function newFunction() {
        //Change App Profile Name
        mnumngtmdl.changeMnuPrfNm(req.user, req.body, req.body.admn_in)
            .then(function (results) {

                mnumngtmdl.dltItmsFrmMnuPrf(req.user, req.body.mnu_prfle_id)
                    .then(function (results) {
                        var count = 0;
                        for (var i = 0; i < data.length; i++) {
                            (function (j) {
                                setTimeout(function () {
                                    data[j].sqnceId = j + 1;
                                    if (!data[j].submnu_itm_id) {
                                        data[j].submnu_itm_id = data[j].mnu_itm_id;
                                        data[j].mnu_itm_id = 0;
                                    }
                                    mnumngtmdl.itmsFornewMnu(req.user, req.body.mnu_prfle_id, data[j])
                                        .then(function (results) {
                                            count++;
                                            if (count == data.length)
                                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                        }).catch(function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                        });
                                }, (j % data.length) * 2000);
                            })(i)
                        }
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
}

/**************************************************************************************
* Controller     : Delete Menu
* Parameters     : req.body
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 25/01/2018    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.dltMnuPrf = function (req, res) {
    var fnm = "dltMnuPrf";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    mnumngtmdl.dltMnuPrf(req.user, req.params.prfId)
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
* 22/01/2018    - Sekhar - Initial Function
*
***************************************************************************************/
exports.allDstPrfl_get = function (req, res) {
    var fnm = "allDstPrfl_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            mnumngtmdl.allDstPrfl_getMdl(req.user, req.params)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}

/**************************************************************************************
* Controller     : UserProfile_update
* Parameters     : None
* Description    : 
* Change History :
* 05/04/2017    - sekhar - Initial Function
*
***************************************************************************************/
exports.updatePrf_updt = function (req, res) {
    var fnm = "allDstPrfl_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            mnumngtmdl.updatePrf_ins_updt(req.user, req.body, function (error, results) {
                if (error) {
                    return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                }
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            });
        }
    });

}

/**************************************************************************************
* Controller     : menuitms_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 22/01/2018    - Sony - Initial Function
*
***************************************************************************************/
exports.menuitms_get = function (req, res) {
    var fnm = "menuitms_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            mnumngtmdl.getMnuItmsMdl(req.user, req.params)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });

}
/**************************************************************************************
* Controller     : updateMnuPrf_updt
* Parameters     : None
* Description    : 
* Change History :
* 05/04/2017    - sekhar - Initial Function
*
***************************************************************************************/
exports.updateMnuPrf_updt = function (req, res) {
    var fnm = "updateMnuPrf_updt";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            mnumngtmdl.updateMnuPrf_ins_updt(req.user, req.body, req.params, function (error, results) {
                if (error) {
                    return df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                }
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            });
        }
    });

}



/**************************************************************************************
* Controller     : Allmenus_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 22/01/2018    - Sekhar - Initial Function
*
***************************************************************************************/
exports.Allusrmenus_get = function (req, res) {
    var fnm = "Allusrmenus_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            mnumngtmdl.allusrMenu_getProfles(req.user, req.params)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}


/**************************************************************************************
* Controller     : umCtrl.menuItems_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 29/07/2019    - Bala - Initial Function
*
***************************************************************************************/
exports.menuItems_get = function (req, res) {
    var fnm = "menuItems_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.getMenuItems(req.user)
                .then(function (results) {
                    var resdata = results;
                    if (results && results.length) {
                        var zeroParents = [];
                        var temp = [];
                        for (i = 0; i < resdata.length; i++) {
                            if (resdata[i].prnt_mnu_itm_id == 0) {
                                zeroParents.push(resdata[i]);
                            } else {
                                temp.push(resdata[i]);
                            }
                        }
                        var app_lst = jsonUtils.uniqueArr(temp, 'mnu_itm_id');
                        var groupRes = jsonUtils.groupJsonByKey(app_lst, ['prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'prnt_mnu_icn_tx', 'hdr_in', 'sqnce_id', 'mnu_prfle_id'], ['prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'mnu_itm_id', 'mnu_itm_nm', 'mnu_itm_url_tx', 'hdr_in', 'dsble_in', 'c_in', 'r_in', 'u_in', 'd_in', 'id'], ["sub_mnus"], 'prnt_mnu_itm_id', 'sqnce_id', 'asc');
                        resdata = jsonUtils.concateArr(zeroParents, groupRes);
                        resdata = jsonUtils.sortArr(resdata, 'sqnce_id', 'asc');
                    }
                    // var data = jsonUtils.groupJsonByKey(results, ['mnu_prfle_id', 'mnu_prfle_nm'], ['mnu_itm_id', 'mnu_itm_nm','dsble_in','mnu_prfle_id'], ["mnu_itms"], 'mnu_prfle_id', 'asc');
                    df.formatSucessRes(req, res, resdata, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/**************************************************************************************
* Controller     : To get user menu profiles
* Parameters     : req.body
* Description    : To add a specific group to the requested user in cognito
* Change History :
* 18/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.usersMnuPrfl_get = function (req, res) {
    var fnm = "usersMnuPrfl_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    req.getValidationResult(req.body).then(function (result) {

        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {
            // Model gets called Here 
            mnumngtmdl.getMnPrflusrs(req.user, req.params)
                .then(function (results) {
                    console.log(results.length)
                    if (results && results.length > 0) {
                        var groupRes = jsonUtils.groupJsonByKey(results, ['mnu_prfle_id', 'mnu_prfle_nm', 'prfle_dshbd_url_tx'], ['mnu_prfle_itm_rel_id', 'mnu_itm_id', 'mnu_itm_nm', 'prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'sqnce_id', 'dsble_in', 'r_in', 'c_in', 'u_in', 'd_in', 'a_in'], ["mnus"], 'mnu_prfle_id', 'mnu_prfle_id');
                        groupRes.forEach(function (prfl) {
                            prfl.mnus = jsonUtils.groupJsonByKey(prfl.mnus, ['mnu_prfle_itm_rel_id', 'mnu_itm_id', 'mnu_itm_nm', 'prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'sqnce_id', 'dsble_in', 'r_in', 'c_in', 'u_in', 'd_in', 'a_in'], ['mnu_kywrds'], 'mnu_itm_id', 'mnu_itm_id');
                            var zeroParents = [];
                            var temp = [];
                            prfl.mnus.forEach(function (itm) {
                                delete itm[''];
                                if (itm.prnt_mnu_itm_id == 0) {
                                    zeroParents.push(itm);
                                } else {
                                    temp.push(itm)
                                }
                            })
                            var app_lst = jsonUtils.uniqueArr(temp, 'mnu_itm_id');
                            prfl.mnus = jsonUtils.groupJsonByKey(app_lst, ['prnt_mnu_itm_id', 'prnt_mnu_itm_nm'], ['mnu_prfle_itm_rel_id', 'mnu_itm_id', 'mnu_itm_nm', 'prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'sqnce_id', 'dsble_in', 'r_in', 'c_in', 'u_in', 'd_in', 'a_in', 'mnu_kywrds'], ['sub_mnus'], 'prnt_mnu_itm_id', 'prnt_mnu_itm_id');
                            prfl.mnus = jsonUtils.concateArr(zeroParents, prfl.mnus);
                        })
                        df.formatSucessRes(req, res, groupRes, cntxtDtls, fnm, {});
                    } else
                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    })
}


/**************************************************************************************
* Controller     : usermenu_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 12/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.usermenu_get = function (req, res) {
    var fnm = "usermenu_get";
    //log.info(`In ${fnm}`, 0, cntxtDtls);
    var usrData = {
        user: req.user
    }
    // Model gets called Here 
    mnumngtmdl.get_userMenuByPrfleID(req.user, usrData)
        .then(function (results) {

            var resdata = results;
            if (results && results.length) {
                userMenuDtls(resdata, req.user);
            } else {
                console.log("No menu profile");
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                // No menu profile
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

    function userMenuDtls(resdata, user) {
        var session_id = user.mrcht_usr_id + '_' + user.app;
        if (sessionStore) {
            sessionStore.get(session_id, (err, val) => {

                if (err) { console.log(err); return };
                if (!val || (val && typeof val) == 'string') {
                    val = {};

                }
                var user = val || {};
                user.mnuprfls = resdata;
                sessionStore.set(session_id, user);
            });
        }

        var zeroParents = [];
        var temp = [];
        //    console.log("resdata.length", resdata.length)
        for (i = 0; i < resdata.length; i++) {
            if (resdata[i].prnt_mnu_itm_id == 0) {
                zeroParents.push(resdata[i]);
            } else {
                temp.push(resdata[i]);
            }
        }
        var app_lst = jsonUtils.uniqueArr(temp, 'mnu_itm_id');
        var groupRes = jsonUtils.groupJsonByKey(app_lst, ['prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'prnt_mnu_icn_tx', 'hdr_in', 'sqnce_id', 'prfle_dshbd_url_tx'], ['prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'mnu_itm_id', 'mnu_itm_nm', 'stp_in', 'mnu_itm_url_tx', 'hdr_in', 'dsble_in', 'c_in', 'r_in', 'u_in', 'd_in', 'id'], ["children"], 'prnt_mnu_itm_id', 'sqnce_id', 'asc');
        resdata = jsonUtils.concateArr(zeroParents, groupRes);
        resdata = jsonUtils.sortArr(resdata, 'sqnce_id', 'asc');
        // console.log(resdata);
        df.formatSucessRes(req, res, resdata, cntxtDtls, fnm, {});
    }
}




/**************************************************************************************
* Controller     : getAgntAppLeftSideMenu
* Parameters     : req,res()
* Description    : Get Payment Details
* Change History :
* 29/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getAgntAppLeftSideMenu = function (req, res, hndlr) {
    var fnm = "getAgntAppLeftSideMenu";
    // let results = [{
    //     mnu_vw_in: 1,
    //     mnu_itm_icn_tx: 'home',
    //     mnu_itm_nm: 'Home',
    //     mnu_itm_url_tx: '/admin/home'
    // },
    // {
    //     mnu_vw_in: 1,
    //     mnu_itm_icn_tx: 'stats',
    //     mnu_itm_nm: 'Dashboard',
    //     mnu_itm_url_tx: '/admin/lmoDashboard'
    // },
    // {
    //     mnu_vw_in: 1,
    //     mnu_itm_icn_tx: 'people',
    //     mnu_itm_nm: 'Contacts',
    //     mnu_itm_url_tx: '/admin/contact'
    // },
    // {
    //     mnu_vw_in: 1,
    //     mnu_itm_icn_tx: 'notifications',
    //     mnu_itm_nm: 'Notifications',
    //     mnu_itm_url_tx: '/admin/push-notify'
    // },
    // {
    //     mnu_vw_in: 1,
    //     mnu_itm_icn_tx: 'information-circle',
    //     mnu_itm_nm: 'Help Desk',
    //     mnu_itm_url_tx: '/admin/helpDesk'
    // },
    // {
    //     mnu_vw_in: 1,
    //     mnu_itm_icn_tx: 'phone-portrait',
    //     mnu_itm_nm: 'Change Phone Number',
    //     mnu_itm_url_tx: '/admin/reset-phone'
    // },
    // {
    //     mnu_vw_in: 1,
    //     mnu_itm_icn_tx: 'key',
    //     mnu_itm_nm: 'Password reset',
    //     mnu_itm_url_tx: '/reset-password'
    // },
    // {
    //     mnu_vw_in: 1,
    //     mnu_itm_icn_tx: 'power',
    //     mnu_itm_nm: 'Logout',
    //     mnu_itm_url_tx: '/admin/login'
    // }
    //     // {
    //     //     mnu_vw_in: 1,
    //     //     mnu_itm_icn_tx: 'phone-portrait',
    //     //     mnu_itm_nm: 'Edit Profile',
    //     //     mnu_itm_url_tx: '/admin/reset-phone'
    //     // },
    //     // {
    //     //     mnu_vw_in: 1,
    //     //     mnu_itm_icn_tx: 'bookmarks',
    //     //     mnu_itm_nm: 'Ticketing',
    //     //     mnu_itm_url_tx: 'about'
    //     // }
    // ]

    mnumngtmdl.getAgntAppLeftSideMenuMdl(req.params.sde_mnu_prfl_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : updateAppLastRfrsh
* Parameters     : req,res()
* Description    : Get Payment Details
* Change History :
* 29/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.updateAppLastRfrsh = function (req, res, hndlr) {
    var fnm = "getTrnsnRefNo";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mnumngtmdl.updateAppLastRfrshMdl(req.body.data, req.user)
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
exports.getNotificationDetails = function (req, res, hndlr) {
    var fnm = "getTrnsnRefNo";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mnumngtmdl.getNotificationDetailsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getAllNotificationDetails
* Parameters     : req,res()
* Description    : Get Payment Details
* Change History :
* 29/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getAllNotificationDetails = function (req, res, hndlr) {
    var fnm = "getAllNotificationDetails";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mnumngtmdl.getAllNotificationDetailsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getYoutubeVdes
* Parameters     : req,res()
* Description    : Get Payment Details
* Change History :
* 29/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.getYoutubeVdes = function (req, res, hndlr) {
    var fnm = "getYoutubeVdes";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    mnumngtmdl.getYoutubeVdesMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}