const pushNtfyMdl = require(appRoot + '/server/api/modules/push_notifications/models/pushNtfyMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var _ = require('lodash');
var push_ntfy_json = require(appRoot + '/config/push.ntfy.json');
var request = require('request');



/**************************************************************************************
* Controller     : appPushNotifications
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/

var validate_recvr_type = (sender_type, calbk) => {
    let vldt_msg = {
        code: 0,
        msg: '',
    };
    if (sender_type['specific_users'] == 1) {
        vldt_msg.code = 202;
        vldt_msg.msg = 'OK';
    }
    else if (sender_type['all_users'] == 1) {
        vldt_msg.code = 220;
        vldt_msg.msg = 'OK';
    }
    else {
        vldt_msg.code = 400;
        vldt_msg.msg = 'Please check sender type.'
    }
    calbk(vldt_msg);
}


var send_fcm_notification = (fcm_body, calbk) => {
    console.log(fcm_body)
    request({
        headers: {
            'Authorization': push_ntfy_json['fcm']['headers']['Authorization'],
            'Content-Type': push_ntfy_json['fcm']['headers']['Content-Type']
        },
        uri: push_ntfy_json['fcm']['url'],
        body: fcm_body,
        method: 'POST',
        json: true
    }, function (err, fcm_res, body) {
        console.log(body)
        if (err) {
            calbk({ res_code: 700, res_msg: 'failed to send push notifications.', err: err });
        }
        else {
            calbk({ res_code: 200, res_msg: "Successfully send push notifications.", err: '' });
        }
    });
}

var get_fcm_body = (to, title, body, image, ntfctn_id, rcr_code) => {
    let fcm_body = {};
    if (rcr_code == 202) {
        fcm_body = {
            "registration_ids": to,
            "collapse_key": "type_a",
            "priority": "high",
            "restricted_package_name": "",
            "notification": {
                "body": body,
                "title": title,
                "sound": "default",
                "click_action": "FCM_PLUGIN_ACTIVITY",
                "icon": "fcm_push_icon",
                "image": image
            },
            "data": {
                "ntfctn_id": ntfctn_id
            }
        }
    }
    else if (rcr_code == 220) {
        fcm_body = {
            "to": "/topics/all",
            "collapse_key": "type_a",
            "priority": "high",
            "restricted_package_name": "",
            "notification": {
                "body": body,
                "title": title,
                "sound": "default",
                "click_action": "FCM_PLUGIN_ACTIVITY",
                "icon": "fcm_push_icon",
                "image": image
            },
            "data": {
                "ntfctn_id": ntfctn_id
            }
        }
    }

    return fcm_body;
}

var prepare_push_ntfctns = (ntfcn_lst, calbk) => {

    var list = ntfcn_lst;
    var x = 0;
    function sendMsg(fcm, callback) {
        send_fcm_notification(get_fcm_body(fcm['to'], fcm['title'], fcm['body'], fcm['image'], fcm['ntfy_id'], fcm['code']), (fcm_res) => {
            if (fcm_res['res_code'] == 200) {
                callback(200, fcm_res['res_msg'])
            }
            else {
                callback(fcm_res['res_code'], fcm_res['res_msg'])
            }
        })
    }

    var loopArray = function (arr, fnlCalbk) {
        sendMsg(arr[x], function (res_code, res_msg) {
            x++;
            if (x < arr.length) {
                loopArray(arr, fnlCalbk);
            }
            else if (x == arr.length) {
                fnlCalbk(res_code, res_msg)
            }
        });
    }

    loopArray(list, (res_code, res_msg) => {
        console.log("--------------")
        console.log("list completed........", x)
        calbk(res_code, res_msg)
    });
}

exports.appPushNotifications = function (req, res) {
    var fnm = "getCafCstmrDtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let req_body = req.body.push_config;
    if (req_body) {

        validate_recvr_type(req_body['sender'], (vldt_res) => {
            if (vldt_res.code != 400) {
                pushNtfyMdl.getPushNtfcnContent().then((results) => {
                    let fltr_json = [];

                    if (results.length > 0) {
                        var getRvcrTokens = (tokens) => {
                            let to = [];
                            tokens.filter((k) => {
                                to.push(k.app_psh_ntfy_tkn.toString())
                            })
                            return to;
                        }

                        _.forIn(_.groupBy(results, 'ntfy_id'), (value, key) => {
                            fltr_json.push({
                                ntfy_id: value[0]['ntfy_id'],
                                title: value[0]['ntfy_hdr'],
                                body: value[0]['ntfy_bdy_txt'],
                                image: value[0]['ntfy_img'],
                                to: getRvcrTokens(value),
                                code: vldt_res.code
                            })
                        })
                        prepare_push_ntfctns(fltr_json, (fcm_res, fcm_msg) => {
                            if (fcm_res == 200) {
                                pushNtfyMdl.updatePushNtfyUsrs().then((results) => {
                                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, { success_status: 200, success_msg: fcm_msg });
                                }).catch((err) => {
                                    df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: 500, err_message: "failed to update - > app_pshntfy_usr_rel_t" });
                                })
                            }
                            else {
                                df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: fcm_res, err_message: fcm_msg });
                            }
                        })
                    }
                    else {
                        df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "510", err_message: "(app_pshntfy_usr_rel_t) [] -> get empty results." });
                    }

                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "510", err_message: "(app_pshntfy_usr_rel_t) [] -> get empty results." });
                })
            }
            else {
                df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: vldt_res.code, err_message: vldt_res.msg });
            }
        })
    }
    else {
        df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "510", err_message: "invalid push notification json format." });
    }
}



