var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var usrmngtmdl = require('../models/usrProfileMgtMdl');
var attUtil = require(appRoot + '/utils/attachment.utils');
var _ = require('lodash');
var smsUtils = require(appRoot + '/utils/sms.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var usrmngtVld = require(appRoot + '/server/api/modules/general/um/validators/umVld');

/**************************************************************************************
* Controller     : getMyProfile
* Parameters     : None
* Description    : 
* Change History :
* 22/01/2018    - Sony Angel - Initial Function
*
***************************************************************************************/

exports.getMyProfile = function (req, res) {

    var fnm = "getMyProfile";
   // log.info(`In ${fnm}`, 0, cntxtDtls);

    usrmngtmdl.myProfileMdl(req.user)
        .then(function (results) {
           // console.log(results);
           // console.log('hi--------------------------------------------------')
           // log.info("INFO", cntxtDtls, 100, "local datbase insert success");
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            log.info("ERROR", cntxtDtls, 100, "local datbase insert failure");
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : umCtrl.UserProfile_update
* Parameters     : req,res()
* Description    : 
* Change History :
* 31/07/2019    - Bala - Initial Function
*
***************************************************************************************/
exports.UserProfile_update = function (req, res) {
    var fnm = "UserProfile_update";
    var data = req.body;
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // console.log(data.image);
    if (data.image && data.image != undefined) {
        attUtil.uploadToS3([data.image], 'wetrackon/image_upload', (err, attChres) => {
            if (!err) {
                console.log(attChres[0].Location)
                usrmngtmdl.updateProfile(data, attChres[0].Location, req.user)
                    .then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        })
    } else {
        usrmngtmdl.updateProfile(data, null, req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
}


/**************************************************************************************
* Controller     : umCtrl.userPrfles_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 26/07/2019    - Bala - Initial Function
*
***************************************************************************************/
exports.userPrfles_get = function (req, res) {
    var fnm = "userPrfles_get";
    var usr_id = req.params.id;
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.getUserPrfles(usr_id, req.user)
                .then(function (results) {
                    var data = jsonUtils.groupJsonByKey(results, ['mnu_prfle_id', 'mnu_prfle_nm'], ['mnu_itm_id', 'mnu_itm_nm', 'mnu_prfle_id', 'dsble_in'], ["mnu_itms"], 'mnu_prfle_id', 'asc');
                    df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}



/**************************************************************************************
* Controller     : umCtrl.userPrfle_update
* Parameters     : req,res()
* Description    : 
* Change History :
* 31/07/2019    - Bala - Initial Function
*
***************************************************************************************/
exports.userPrfle_update = function (req, res) {
    var fnm = "userPrfle_update";
    var data = req.body;
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.updateUsrPrfle(req.user, data)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/**************************************************************************************
* Controller     : userGrpPrflLst_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 22/05/2017    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.userGrpPrflLst_get = function (req, res) {
    var fnm = "userGrpPrflLst_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // console.log(req.user)
    var usrDt = {
        usrId: req.user.mrcht_usr_id,
        clnt_id: req.user.clnt_id,
        tnt_id: jsonUtils.processData(req.user.tnts, 'tnt_id'),
        usr_grp_id: jsonUtils.processData(req.user.tnts, 'usr_grp_id')
    }
    console.log(usrDt)
    var cmpnt_id = req.params.cmpnt_id;

    var resdata = {
        appData: [],
        mnuData: []
    }

    usrmngtmdl.userappsLst_getMdl(req.user, usrDt, cmpnt_id)
        .then(function (results) {
            var appData = results;
            var zeroParents = [];
            var temp = [];
            for (i = 0; i < appData.length; i++) {
                // console.log(resdata[i].cmpnt_id == cmpnt_id);
                // if (resdata.appData[i].cmpnt_id == cmpnt_id) {
                if (appData[i].prnt_app_id == 0) {
                    zeroParents.push(appData[i]);
                } else {
                    temp.push(appData[i]);
                }
                // }
            }
            // console.log(temp)
            var app_lst = jsonUtils.uniqueArr(temp, 'app_id');
            var groupRes = jsonUtils.groupJsonByKey(app_lst, ['prnt_app_id', 'app_lgo_tx', 'app_url_tx', 'hdr_in', 'stp_in'], ['app_id', 'app_lgo_tx', 'app_nm', 'app_url_tx', 'hdr_in', 'stp_in'], ["sub_apps"], 'prnt_app_id', 'prnt_app_id');
            resdata.appData = jsonUtils.concateArr(zeroParents, groupRes);
            // console.log(resdata);
            usrmngtmdl.usermenu_getMdl(req.user, usrDt, cmpnt_id)
                .then(function (results) {
                    resdata.mnuData = results;
                    var session_id = req.user.usr_id + '_' + req.user.app;
                    req.session.data = {
                        appData: appData,
                        mnuData: results
                    };
                    sessionStore.set(session_id, req.session.data);
                    df.formatSucessRes(req, res, resdata, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    resdata.mnuData = [];
                    var session_id = req.user.usr_id + '_' + req.user.app;
                    req.session.data = {
                        appData: appData,
                        mnuData: []
                    };
                    sessionStore.set(session_id, req.session.data);
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }).catch(function (error) {
            var session_id = req.user.usr_id + '_' + req.user.app;
            req.session.data = resdata;
            sessionStore.set(session_id, resdata);
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
