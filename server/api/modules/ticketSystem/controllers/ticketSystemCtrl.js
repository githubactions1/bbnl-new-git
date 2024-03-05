var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var ticketSystemMdl = require('../models/ticketSystemMdl');
var attUtil = require(appRoot + '/utils/attachment.utils');
var _ = require('lodash');
var smsUtils = require(appRoot + '/utils/sms.utils');

/**************************************************************************************
* Controller     : categoriesLst 
* Parameters     : 
* Description    : To get Categories details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.Ap_login_get = function (req, res) {
    var data = req.params;
    data.mble_nu = req.body.mble_nu;
    data.otp = req.body.otp;
    console.log(data);
    apAgroMdl.ApLoginMdl(data, function (err, results) {
        apAgroMdl.auditLogin(results, function () {
            smsUtils.sendSMS(results.mble_nu, `Your APAGRO Mobile App OTP is: ${results.otpDt}`, function (err, sresults) {
                if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
                res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
            })

        })
    })
}
/**************************************************************************************
* Controller     : categoriesLst
* Parameters     : 
* Description    : To get Categories details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.categoriesLst = function (req, res) {

    ticketSystemMdl.categoriesLstMdl(function (err, results) {
        console.log(results)
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}
/**************************************************************************************
* Controller     : DepartmentLst
* Parameters     : 
* Description    : To get Departments details
* 08/08/2019     - Rohit Nalla
***************************************************************************************/
exports.DepartmentLst = function (req, res) {

    ticketSystemMdl.DepartmentLstMdl(function (err, results) {
        console.log(results)
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : subCategoriesLst
* Parameters     : 
* Description    : To get Sub Categories details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.subCategoriesLst = function (req, res) {

    ticketSystemMdl.subCategoriesLstMdl(req.params.cat_id, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    })
}

/**************************************************************************************
* Controller     : requestEntry
* Parameters     : 
* Description    : To insert requesrt entry details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.requestEntry = function (req, res) {

    var req_enrty = req.body.data.form_data;
    var images = req.body.data.image;
    var asgnd_usr_id = req.body.data.asgnd_usr_id;
    var usr_id = req.body.data.usr_id;
    var status_id = req.body.data.status_id
    var stg_id = 0;
    var cnt = 0;
    var x = 0;
    ticketSystemMdl.requestEntryMdl(req_enrty, asgnd_usr_id, usr_id, status_id, function (err, entryresults) {
        var entry_id = entryresults.insertId
        var runQry = (data, runCalbk) => {

            if (data && data.base64 && data.base64 != null && data.base64.substring(0, 4) == 'data' && data.base64 != 'undefined') {
                attUtil.uploadToS3([data.base64], 'wetrackon/ticket_attachmnets', 'tkt_', function (err, attResults) {
                    ticketSystemMdl.reqAttachments(attResults, entry_id, stg_id, data.filenm, data.upldBy, data.lbl_name, function (err, attUrlRes) {
                        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
                        if (err) {
                            runCalbk(err, []);
                        } else {
                            runCalbk('', data)
                        }
                    })
                })
            } else {
                runCalbk('', []);
                console.log(asgnd_usr_id);
                if (asgnd_usr_id == undefined) {
                    ticketSystemMdl.pdfOverviewLstMdl(entryresults.insertId, function (err, finalResults) {
                        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": finalResults });
                    })
                } else {
                    ticketSystemMdl.tktStgLstMdl(entryresults.insertId, function (err, stgResults) {
                        if (stgResults) {
                            ticketSystemMdl.pdfOverviewLstMdl(entryresults.insertId, function (err, finalResults) {
                                res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": finalResults });
                            })
                        }
                    })
                }
            }
        }

        var loopArray = function (arr, fnlCalbk) {

            runQry(arr[x], function (err, result) {
                x++;
                if (x < arr.length) {
                    loopArray(arr, fnlCalbk);
                }
                else if (x == arr.length) {
                    fnlCalbk(err, arr)
                }
            });
        }

        return new Promise((reslove, reject) => {
            loopArray(images, (err, result) => {
                console.log("list completed........", x);
                console.log(asgnd_usr_id);
                if (asgnd_usr_id == undefined) {
                    ticketSystemMdl.pdfOverviewLstMdl(entryresults.insertId, function (err, finalResults) {
                        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": finalResults });
                    })
                } else {
                    ticketSystemMdl.tktStgLstMdl(entryresults.insertId, function (err, stgResults) {
                        if (stgResults) {
                            ticketSystemMdl.pdfOverviewLstMdl(entryresults.insertId, function (err, finalResults) {
                                res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": finalResults });
                            })
                        }
                    })
                }
                if (err) {
                    reject([]);
                }
                else {
                    reslove(result);
                }
            });
        })
    })
}

/**************************************************************************************
* Controller     : reqList
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.reqList = function (req, res) {
    var usr_id = req.params.usr_id;
    ticketSystemMdl.reqListMdl(usr_id, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

var atchmntLst = (atchmntLst) => {
    var imgatchmnt = {};
    imgAtchmntarray = atchmntLst.filter(function (currentObject) {
        if (currentObject.atchmnt_id in imgatchmnt) {
            return false;
        } else {
            imgatchmnt[currentObject.atchmnt_id] = true;
            return true;
        }
    });
    return imgAtchmntarray;
}

var cmntsLst = (cmntsLst) => {
    var cmntTxt = {};
    cmntAarray = cmntsLst.filter(function (currentObject) {
        if (currentObject.cmnt_id in cmntTxt) {
            return false;
        } else {
            cmntTxt[currentObject.cmnt_id] = true;
            return true;
        }
    });
    return cmntAarray;
}

var timeLine = (cmntsLst) => {
    var tmlneTxt = {};
    tmlneAarray = cmntsLst.filter(function (currentObject) {
        if (currentObject.stg_id in tmlneTxt) {
            return false;
        } else {
            tmlneTxt[currentObject.stg_id] = true;
            return true;
        }
    });
    return tmlneAarray;
}


/**************************************************************************************
* Controller     : reqEntryList
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.reqEntryList = function (req, res) {

    var usr_id = req.body.data.usr_id;
    var cat_id = req.body.data.cat_id;
    var sub_cat_id = req.body.data.sub_cat_id;
    var sts_id = req.body.data.sts_id;
    var frm_dt = req.body.data.frm_dt;
    var to_dt = req.body.data.to_dt;
    var req_entry_id = req.body.data.req_entry_id;
    var assigned = req.body.data.assigned;
    var opened = req.body.data.opened;
    var fltr_txt = req.body.data.flte_txt;
    var spr_admn_in = req.body.data.admn_in;
    var dprmnt_id = req.body.data.dprmnt_id;
    var asngd_to_me = req.body.data.asngd_to_me;
    var infrmd_id = req.body.data.infrmd_id;
    var app_in = req.body.data.app_in;
    var stus_id = req.body.data.status_id;

    ticketSystemMdl.reqEntryListMdl(usr_id, cat_id, sub_cat_id, sts_id, frm_dt, to_dt, req_entry_id, assigned, opened, fltr_txt, spr_admn_in, dprmnt_id, asngd_to_me, infrmd_id, app_in, stus_id, function (err, results) {
        var data = [];
        var req_data = [];
        // var stg_dtls = [];
        // _.forIn(_.groupBy(results[1], 'stg_id'), (value, k) => {
        //     stg_dtls.push({
        //         stg_id: value[0].stg_id,
        //         req_entry_id: value[0].req_entry_id,
        //         req_qr_cd: value[0].req_qr_cd,
        //         status_id: value[0].status_id,
        //         status_nm: value[0].status_nm,
        //         asgnd_usr_id: value[0].asgnd_usr_id,
        //         asgnd_by_usr: value[0].asgnd_by_usr,
        //         asgnd_to_usr: value[0].asgnd_to_usr,
        //         frwd_usr_nm: value[0].frwd_usr_nm,
        //         usr_id: value[0].usr_id,
        //         lgd_usr_nm: value[0].lgd_usr_nm,
        //         asgnd_dt: value[0].asgnd_dt,
        //         a_in: value[0].a_in,
        //         frwd_dt: value[0].frwd_dt,
        //         cmnt: cmntsLst(value),
        //     })
        // })

        req_data.push({
            enrty_dtls: results[0],
            // stg_dtls: stg_dtls,
            // attachments: results[2],
            cardCnt: results[1]
        })

        if (req_data.enrty_dtls != 'undefined') {
            if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
            res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": req_data });
        } else {
            res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] });
        }


    });
}



/**************************************************************************************
* Controller     : dashboardEntryList
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.dashboardEntryList = function (req, res) {
    var data = req.body.data;
    ticketSystemMdl.dashboardEntryListMdl(data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : pendingList
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.pendingList = function (req, res) {

    ticketSystemMdl.pendingListMdl(req.body.data, function (err, results) {
        var req_data = [];
        var stg_dtls = [];
        _.forIn(_.groupBy(results[2], 'stg_id'), (value, k) => {
            stg_dtls.push({
                stg_id: value[0].stg_id,
                req_entry_id: value[0].req_entry_id,
                req_qr_cd: value[0].req_qr_cd,
                status_id: value[0].status_id,
                status_nm: value[0].status_nm,
                asgnd_usr_id: value[0].asgnd_usr_id,
                asgnd_by_usr: value[0].asgnd_by_usr,
                asgnd_to_usr: value[0].asgnd_to_usr,
                frwd_usr_nm: value[0].frwd_usr_nm,
                usr_id: value[0].usr_id,
                lgd_usr_nm: value[0].lgd_usr_nm,
                asgnd_dt: value[0].asgnd_dt,
                a_in: value[0].a_in,
                frwd_dt: value[0].frwd_dt,
                infrmd_to: value[0].infrmd_to,
                infrmd_to_usr: value[0].infrmd_to_usr,
                cmnt: cmntsLst(value),
            })
        })

        req_data.push({
            enrty_dtls: results[0],
            stg_dtls: stg_dtls,
            attachments: results[3],
            cardCnt: results[1],
            status_dtls : results[4]
        })

        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": req_data });
    });
}

/**************************************************************************************
* Controller     : pendingtimelineList
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.pendingtimelineList = function (req, res) {


    var usr_id = req.body.data.usr_id;
    var cat_id = req.body.data.cat_id;
    var sub_cat_id = req.body.data.sub_cat_id;
    var sts_id = req.body.data.sts_id;
    var frm_dt = req.body.data.frm_dt;
    var to_dt = req.body.data.to_dt;
    var req_entry_id = req.body.data.req_entry_id;
    var assigned = req.body.data.assigned;
    var opened = req.body.data.opened;
    var fltr_txt = req.body.data.flte_txt;
    var spr_admn_in = req.body.data.admn_in;
    var dprmnt_id = req.body.data.dprmnt_id;
    var asngd_to_me = req.body.data.asngd_to_me;
    var infrmd_id = req.body.data.infrmd_id;
    var app_in = req.body.data.app_in;
    var stus_id = req.body.data.status_id;

    ticketSystemMdl.pendingtimelineListMdl(usr_id, cat_id, sub_cat_id, sts_id, frm_dt, to_dt, req_entry_id, assigned, opened, fltr_txt, spr_admn_in, dprmnt_id, asngd_to_me, infrmd_id, app_in, stus_id, function (err, results) {
        var data = [];
        var req_data = [];
        var stg_dtls = [];
        _.forIn(_.groupBy(results[0], 'stg_id'), (value, k) => {
            stg_dtls.push({
                stg_id: value[0].stg_id,
                req_entry_id: value[0].req_entry_id,
                req_qr_cd: value[0].req_qr_cd,
                status_id: value[0].status_id,
                status_nm: value[0].status_nm,
                asgnd_usr_id: value[0].asgnd_usr_id,
                asgnd_by_usr: value[0].asgnd_by_usr,
                asgnd_to_usr: value[0].asgnd_to_usr,
                frwd_usr_nm: value[0].frwd_usr_nm,
                usr_id: value[0].usr_id,
                lgd_usr_nm: value[0].lgd_usr_nm,
                asgnd_dt: value[0].asgnd_dt,
                a_in: value[0].a_in,
                frwd_dt: value[0].frwd_dt,
                cmnt: cmntsLst(value),
            })
        })

        req_data.push({
            // enrty_dtls: results[0],
            stg_dtls: stg_dtls,
            attachments: results[1],
            status_dtls : results[2]
            // cardCnt: results[1]
        })

        if (req_data.enrty_dtls != 'undefined') {
            if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
            res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": req_data });
        } else {
            res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] });
        }


    });
}


/**************************************************************************************
* Controller     : checkList
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.checkList = function (req, res) {
    var status = req.params.status;
    ticketSystemMdl.checkListMdl(status, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : stageDetails
* Parameters     : 
* Description    : To get stage details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.stageDetails = function (req, res) {

    ticketSystemMdl.stageDetailsMdl(function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : forwardChckLst
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
// exports.forwardChckLst = function (req, res) {
//     console.log(req.body);
//     console.log(":::::::req.body::::::::::::");
//     var cnt = 0;
//     // if (req.body.app_in == 0) {
//     var chckData = req.body.data;
//     var asgnd_usr = req.body.data.asgnd_usr_id;
//     var lg_usr = req.body.data.usr_id;
//     for (var i = 0; i < chckData.length; i++) {
//         ticketSystemMdl.forwardChckLstMdl(chckData[i], asgnd_usr, lg_usr, function (err, results) {
//             if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
//             cnt++;
//             if (cnt == chckData.length) {
//                 res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
//             }
//         });
//     }
//     // } else {
//     //     console.log("Else ::::::::::::")
//     //     var asgnd_usr = req.body.asgnd_usr_id;
//     //     var lg_usr = req.body.usr_id;
//     //     ticketSystemMdl.forwardChckLstMdl(req.body, asgnd_usr, lg_usr, function (err, results) {
//     //         if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
//     //         res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
//     //     });
//     // }
// }

exports.forwardChckLst = function (req, res) {
    console.log(req.body.data);
    var cnt = 0;
    if (!req.body.data.chckd || req.body.data.chckd != 'undefined') {
        var chckData = req.body.data.chckd;
        var asgnd_usr = req.body.data.asgnd_usr_id;
        var lg_usr = req.body.data.usr_id;
        var infrmd_to = req.body.data.infrmd_to;
        var infrmd_in = req.body.data.infrmd_in;
        // console.log(chckData.length)
        for (var i = 0; i < chckData.length; i++) {
            ticketSystemMdl.forwardChckLstMdl(chckData[i], asgnd_usr, lg_usr, infrmd_to, infrmd_in, function (err, results) {
                if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
                cnt++;
                if (cnt == chckData.length) {
                    res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
                }
            });
        }
    } else {
        ticketSystemMdl.forwardChckLstMdl(req.body, asgnd_usr, lg_usr, infrmd_to, function (err, results) {
            if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
            cnt++;
            if (cnt == chckData.length) {
                res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
            }
        });
    }
}

/**************************************************************************************
* Controller     : stageDetails
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.closeRequest = function (req, res) {
    ticketSystemMdl.closeRequestMdl(req.body.data, function (err, results) {
        console.log(results);

        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": results }); return; }
    });
}


/**************************************************************************************
* Controller     : stgWseChat
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.stgWseChat = function (req, res) {
    ticketSystemMdl.stgWseChatLst(req.body.data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : stgatchmntLst
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.stgatchmntLst = function (req, res) {
    var Data = req.body.data.upldData;
    var stg_id = req.body.stg_id;
    var req_entry_id = req.body.req_entry_id;
    // console.log(Data)
    // if (Data.length > 0) {
    attUtil.uploadToS3([Data[0]], 'wetrackon/ticket_attachmnets', 'tkt_', function (err, attResults) {
        ticketSystemMdl.reqAttachments(attResults, req_entry_id, stg_id, img, function (err, results) {
            if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
            res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
        });
    })
    // } 
}

/**************************************************************************************
* Controller     : atchmntLst
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.atchmntLst = function (req, res) {
    var x = 0;
    console.log(req.body)
    var images = req.body.data.image;
    var entry_id = req.body.data.req_entry_id
    var stg_id = 0;
    // console.log(Data)
    // if (Data.length > 0) {
    // attUtil.uploadToS3([Data[0]], 'wetrackon/ticket_attachmnets', 'tkt_', function (err, attResults) {
    //     ticketSystemMdl.reqAttachmentsMdl(attResults, req_entry_id, stg_id, function (err, results) {
    //         if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
    //         res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    //     });
    // })
    // } 
    var runQry = (data, runCalbk) => {

        if (data && data.base64 && data.base64 != null && data.base64.substring(0, 4) == 'data' && data.base64 != 'undefined') {
            attUtil.uploadToS3([data.base64], 'wetrackon/ticket_attachmnets', 'tkt_', function (err, attResults) {
                console.log(entry_id, req.body.data.req_entry_id)
                ticketSystemMdl.reqAttachments(attResults, entry_id, stg_id, data.filenm, data.upldBy, data.lbl_name, function (err, attUrlRes) {
                    if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
                    if (err) {
                        runCalbk(err, []);
                    } else {
                        runCalbk('', data)
                    }
                })
            })
        } else {
            runCalbk('', []);
        }
    }

    var loopArray = function (arr, fnlCalbk) {

        runQry(arr[x], function (err, result) {
            x++;
            if (x < arr.length) {
                loopArray(arr, fnlCalbk);
            }
            else if (x == arr.length) {
                fnlCalbk(err, arr)
            }
        });
    }

    return new Promise((reslove, reject) => {
        loopArray(images, (err, result) => {
            console.log("list completed........", x);
            res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": [x] });
            if (err) {
                reject([]);
            }
            else {
                reslove(result);
            }
        });
    })
}

/**************************************************************************************
* Controller     : usersLst
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.usersLst = function (req, res) {
    ticketSystemMdl.usersLstMdl(function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}


/**************************************************************************************
* Controller     : qrCdLst
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.qrCdLst = function (req, res) {
    var qr_cd = req.params.qr_cd
    ticketSystemMdl.qrCdLstMdl(qr_cd, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : statusLst
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.statusLst = function (req, res) {
    ticketSystemMdl.statusLstMdl(function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : clsdTkts
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.clsdTkts = function (req, res) {
    var usr_id = req.params.usr_id;
    ticketSystemMdl.clsdTktsMdl(usr_id, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : updateRequestInfo
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.updateRequestInfo = function (req, res) {

    ticketSystemMdl.updateRequestInfoMdl(req.body.data.form_data, req.body.data.req_entry_id, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}



/**************************************************************************************
* Controller     : reqStgDtls
* Parameters     : 
* Description    : To Insert Check List Data
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.reqStgDtls = function (req, res) {
    var usr_id = req.params.usr_id;
    var req_id = req.params.req_entry_id;
    ticketSystemMdl.reqStgDtlsMdl(usr_id, req_id, function (err, results) {
        var data = [];
        var req_data = [];
        var req_dtls = {
            req_entry_id: results[0][0].req_entry_id,
            req_txt: results[0][0].req_txt,
            req_usr_nm: results[0][0].req_usr_nm,
            req_usr_mbl: results[0][0].req_usr_mbl,
            req_usr_adrs: results[0][0].req_usr_adrs,
            city: results[0][0].city,
            shrt_desc: results[0][0].shrt_desc,
            cat_id: results[0][0].cat_id,
            sub_cat_id: results[0][0].sub_cat_id,
            usr_id: results[0][0].usr_id,
            a_in: results[0][0].a_in,
            i_ts: results[0][0].i_ts,
            dt: results[0][0].dt,
            isue_dt: results[0][0].dt
        }
        var stg_dtls = [];
        _.forIn(_.groupBy(results[1], 'stg_id'), (value, k) => {
            stg_dtls.push({
                stg_id: value[0].stg_id,
                req_entry_id: value[0].req_entry_id,
                status_id: value[0].status_id,
                status_nm: value[0].status_nm,
                asgnd_usr_id: value[0].asgnd_usr_id,
                asgnd_usr_nm: value[0].asgnd_usr_nm,
                frwd_usr_id: value[0].frwd_usr_id,
                frwd_usr_nm: value[0].frwd_usr_nm,
                usr_id: value[0].usr_id,
                lgd_usr_nm: value[0].lgd_usr_nm,
                dt: value[0].date,
                a_in: value[0].a_in,
                isue_dt: value[0].dt,
                fileid: value[0].req_qr_cd,
                atchmnt: atchmntLst(value),
                cmnt: cmntsLst(value),
            })
        })

        req_data.push({
            entry_lst: results[2],
            req_dtls: req_dtls,
            stg_dtls: stg_dtls,
            attachments: results[3]
        })
        // console.log(req_data)
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": req_data });

    });
}


/*****************************************************************************
* Function      : updtusr
* Description   : Update user 
* Arguments     : request,response objects
* Hisotry
 08/11/2019     *  Koti
******************************************************************************/
exports.updtusrCtrl = function (req, res) {
    // console.log(req.params.dcmtid);
    ticketSystemMdl.updtusrMdl(usr_id, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : reqEntryListPublic
* Parameters     : 
* Description    : To get reqEntryListPublic details
* 22/08/2019     - Rohit Nalla
***************************************************************************************/
exports.reqEntryListPub = function (req, res) {
    // console.log(req.body)
    ticketSystemMdl.reqEntryListPubMdl(req.body.data, function (err, results) {
        // console.log(results)
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}
/*****************************************************************************
* Function      : archiveRequest
* Description   : Archive Request 
* Arguments     : request,response objects
* Hisotry
 08/11/2019     *  KOTESWRARARAO BORIGARLA - Initial Function
******************************************************************************/
exports.archiveRequest = function (req, res) {

    ticketSystemMdl.archiveRequestMdl(req.body.data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}
/*****************************************************************************
* Function      : archiveRequest
* Description   : Archive Request 
* Arguments     : request,response objects
* Hisotry
 08/11/2019     *  KOTESWRARARAO BORIGARLA - Initial Function
******************************************************************************/


exports.otpRequest = function (req, res) {
    var data = req.body
    var mbno = req.body[0].mbno;
    var otp = req.body[0].otp
    ticketSystemMdl.otpRequestMdl(data, function (err, results) {

        // results.otp_nu = req.body[0].otp;
        console.log(results);
        if (results.length > 0) {
            ticketSystemMdl.updateOtp(data, function (err, otpresults) {
                smsUtils.sendSMS(results[0].mbl_nu, `Your REQUEST Mobile App OTP is: ${otp}`, function (err, sresults) {
                    if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
                    res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": { "data": results, "otp": req.body[0].otp } });
                })

            })
        } else {
            res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": { "data": results, "otp": req.body[0].otp } }
            );

        }

    })
}
exports.unarchiveRequest = function (req, res) {
    ticketSystemMdl.unarchiveRequestMdl(req.body.data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/*****************************************************************************
* Function      : analysRequest
* Description   : Archive Request 
* Arguments     : request,response objects
* Hisotry
 08/11/2019     *  KOTESWRARARAO BORIGARLA - Initial Function
******************************************************************************/
exports.analysRequest = function (req, res) {

    ticketSystemMdl.analysRequestMdl(req.body.data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/*****************************************************************************
* Function      : archiveRequestLst
* Description   : Archive Request 
* Arguments     : request,response objects
* Hisotry
 08/11/2019     *  KOTESWRARARAO BORIGARLA - Initial Function
******************************************************************************/
exports.archiveRequestLst = function (req, res) {

    ticketSystemMdl.archiveRequestLstMdl(req.params.req_entry_id, req.params.ind, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/*****************************************************************************
* Function      : ofcrWseRqstmntr
* Description   : Archive Request 
* Arguments     : request,response objects
* Hisotry
 08/11/2019     *  KOTESWRARARAO BORIGARLA - Initial Function
******************************************************************************/
exports.ofcrWseRqstmntr = function (req, res) {
    console.log(req.body)
    var ofcrInfo = req.params.field;
    var usr_id = req.params.usr_id;
    ticketSystemMdl.ofcrWseRqstmntrMdl(ofcrInfo, usr_id, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/*****************************************************************************
* Function      : dprtWseRqstmntr
* Description   : Archive Request 
* Arguments     : request,response objects
* Hisotry
 08/11/2019     *  KOTESWRARARAO BORIGARLA - Initial Function
******************************************************************************/
exports.dprtWseRqstmntr = function (req, res) {
    console.log(req.body)
    var ofcrInfo = req.params.field;
    // var usr_id = req.params.usr_id;
    var dprtmnt_id = req.params.dprtmnt_id;
    ticketSystemMdl.dprtWseRqstmntrMdl(ofcrInfo, dprtmnt_id, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : departmentreport
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
// exports.departmentreport = function (req, res) {
//     ticketSystemMdl.departmentreportMdl(req.body.data, function (err, results) {
//         if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
//         res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
//     });
// }
exports.departmentreport = function (req, res) {
    var data = req.body.data;
    ticketSystemMdl.departmentreportMdl(data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : userreport
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
// exports.userreport = function (req, res) {
//     ticketSystemMdl.userreportMdl(req.body.data, function (err, results) {
//         if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
//         res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
//     });
// }
exports.userreport = function (req, res) {
    var data = req.body.data;
    ticketSystemMdl.userreportMdl(data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : usrDshbrdrng
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.usrDshbrdrng = function (req, res) {
    ticketSystemMdl.usrDshbrdrngMdl(req.body.data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}
/**************************************************************************************
* Controller     : usrDshbrdList 
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.usrDshbrdList = function (req, res) {
    ticketSystemMdl.usrDshbrdListMdl(req.body.data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : overallDshbrdList 
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.overallDshbrdList = function (req, res) {
    ticketSystemMdl.overallDshbrdListMdl(req.body.data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}
/**************************************************************************************
* Controller     : serachFile
* Parameters     : 
* Description    : search fileList Data
* 
***************************************************************************************/
exports.searchfilenumber = function (req, res) {
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    var file_nu = req.params.file_nu;
    ticketSystemMdl.searchfilenumberMdl(file_nu, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}
/******************************************************fcmtoken**************************************************************** */
exports.fcmRequest = function (req, res) {
    console.log(req.body, '---------------------------fck')
    ticketSystemMdl.fcmRequestMdl(req.body, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/******************************************************fcmtoken**************************************************************** */
exports.sendPushNotificationCtrl = function (req, res) {
    console.log(req.body, '---------------------------fck')
    ticketSystemMdl.sendPushNotificationMdl(req.body, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}   

/**************************************************************************************
* Controller     : menuProfileLst 
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.menuProfileLst = function (req, res) {
    ticketSystemMdl.menuProfileLstMdl(req.params.clnt_id,req.params.tnt_id,req.params.usr_id, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}

/**************************************************************************************
* Controller     : infrmdToUsr 
* Parameters     : 
* Description    : To get request check list details
* 26/07/2019     - KOTESWRARARAO BORIGARLA - Initial Function
***************************************************************************************/
exports.infrmdToUsr = function (req, res) {
    ticketSystemMdl.infrmdToUsrMdl(req.body.data, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
}
