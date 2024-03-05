
var alertsMdl = require('../models/alertsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var _ = require('lodash')




/**************************************************************************************
* Controller     : alerts subs
* Parameters     : req,res()
* Description    : To get all Organisational levels
* Change History :
*
***************************************************************************************/
exports.getUserSubscCtrl = function (req, res) {

    var fnm = "getUserSubscCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getUserSubscMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : alerts subs
* Parameters     : req,res()
* Description    : To get all Organisational levels
* Change History :
*
***************************************************************************************/
exports.getAlrtCtgryCtrl = function (req, res) {

    var fnm = "getAlrtCtgryCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getAlrtCtgryMdl(req.user, req.params.id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getMrchntsCtrl
* Parameters     : req,res()
* Description    : To get all Organisational levels
* Change History :
*
***************************************************************************************/
exports.getMrchntsCtrl = function (req, res) {

    var fnm = "getMrchntsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getMrchntsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}
/**************************************************************************************
* Controller     : instAlrtSubsCtrl
* Parameters     : req,res()
* Description    : To get all Organisational levels
* Change History :
*
***************************************************************************************/
exports.instAlrtSubsCtrl = function (req, res) {

    var fnm = "instAlrtSubsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    let subdata = req.body.data
    alertsMdl.instAlrtSubsMdl(req.user, subdata)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updtAlrtSubsCtrl
* Parameters     : req,res()
* Description    : To get all Organisational levels
* Change History :
*
***************************************************************************************/
exports.updtAlrtSubsCtrl = function (req, res) {

    var fnm = "updtAlrtSubsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    let subdata = req.body.data
    alertsMdl.updtAlrtSubsMdl(req.user, subdata)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Notification Type Icons
* Parameters     : req,res()
* Description    : To get all Notification Type Icons
* Change History :
*
***************************************************************************************/
exports.getNtfctnTypLstCtrl = function (req, res) {

    var fnm = "getNtfctnTypLstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getNtfctnTypLstMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

// /**************************************************************************************
// * Controller     : Notification Type Icons
// * Parameters     : req,res()
// * Description    : To get all Notification Type Icons
// * Change History :
// *
// ***************************************************************************************/
// exports.getctgryNtfctnLstCtrl = function (req, res) {
    
//         var fnm = "getctgryNtfctnLstCtrl";
//         log.info(`In ${fnm}`, 0, cntxtDtls);
//         // Model gets called Here 
//         alertsMdl.getctgryNtfctnLstMdl(req.user,req.params.id)
//             .then(function (results) {
//                 df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
//             }).catch(function (error) {
//                 df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//             });
//     }


/**************************************************************************************
* Controller     : Add New Notification
* Parameters     : req,res()
* Description    : Add New Notification
* Change History :
*
***************************************************************************************/
// exports.addNewNtfctnCtrl = function (req, res) {
//     var fnm = "addNewNtfctnCtrl";
//     log.info(`In ${fnm}`, 0, cntxtDtls);
//     // Model gets called Here
//     alertsMdl.addNewNtfctnMdl(req.body.data, req.user)
//         .then(function (result) {
//             df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//         });
// }


exports.addNewNtfctnCtrl = function (req, res) {
    var fnm = "addNewNtfctnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let gropusr = req.body.data
    let count = 0;
    console.log(req.user);
    alertsMdl.addNewNtfctnMdl(gropusr, req.user)
        .then(function (result) {
            if (result.insertId) {
                for (var i = 0; i < gropusr.grpControl.length; i++) {
                    let grpctgry = {
                        alrtId: result.insertId,
                        grpId: gropusr.grpControl[i]
                    }
                    alertsMdl.addNewntfctnGrpRelMdl(grpctgry, req.user)
                        .then(function (results) {
                            count++;
                            console.log(count, gropusr.grpControl.length)
                            if (count == gropusr.grpControl.length) {
                                console.log('in ad sucess ------------------------------------------------------------------')
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });

                }
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : User Notifications
* Parameters     : req,res()
* Description    : To get all User Notifications
* Change History :
*
***************************************************************************************/
exports.getUsrNtfctnCtrl = function (req, res) {

    var fnm = "getUsrNtfctnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getUsrNtfctnMdl(req.user, req.params.id)
        .then(function (results) {
             let data =[]
            _.forIn(_.groupBy(results, 'alert_id'), (value, key) => {
                data.push({
                    alert_id: value[0].alert_id,
                    read_sts: value[0].read_sts,
                    alert_tx: value[0].alert_tx,
                    alert_cat_nm: value[0].alert_cat_nm,
                    mrcht_usr_nm: value[0].mrcht_usr_nm,
                    grp_nm: value[0].grp_nm,
                    i_ts: value[0].i_ts,
                    alertGrps: value
                })
            })
            df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : User Recent Notifications
* Parameters     : req,res()
* Description    : To get all User Notifications
* Change History :
*
***************************************************************************************/
exports.getusrRcntNtfctnCtrl = function (req, res) {

    var fnm = "getusrRcntNtfctnCtrl";
    //log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getusrRcntNtfctnMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : User Created Notifications
* Parameters     : req,res()
* Description    : To get all User Notifications
* Change History :
*
***************************************************************************************/
exports.getusrCrtdNtfctnCtrl = function (req, res) {

    var fnm = "getusrCrtdNtfctnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getusrCrtdNtfctnMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : User Notification response
* Parameters     : req,res()
* Description    : User Notification response
* Change History :
*
***************************************************************************************/
exports.UpdtNtfctnRspnsCtrl = function (req, res) {
    var fnm = "UpdtNtfctnRspnsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    alertsMdl.UpdtNtfctnRspnsMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : User Group list
* Parameters     : req,res()
* Description    : To get all Notification Type Icons
* Change History :
*
***************************************************************************************/
exports.getUsrGrpLstCtrl = function (req, res) {

    var fnm = "getUsrGrpLstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getUsrGrpLstMdl(req.user)
        .then(function (results) {
            // let data =[]
            // _.forIn(_.groupBy(results, 'grp_id'), (value, key) => {
            //     data.push({
            //         grp_id: value[0].grp_id,
            //         grp_nm: value[0].grp_nm,
            //         grp_dsc: value[0].grp_dsc,
            //         grp_ctry_nm: value[0].grp_ctry_nm,
            //         mrcht_usr_nm: value[0].mrcht_usr_nm,
            //         i_ts: value[0].i_ts,
            //         catgrp: value
            //     })
            // })
        
             df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : User Group Category list
* Parameters     : req,res()
* Description    : To get all Notification Type Icons
* Change History :
*
***************************************************************************************/
exports.getUsrGrpCtgryLstCtrl = function (req, res) {

    var fnm = "getUsrGrpCtgryLstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getUsrGrpCtgryLstMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Add New Notification
* Parameters     : req,res()
* Description    : Add New Notification
* Change History :
*
***************************************************************************************/
exports.addnewGrpCtrl = function (req, res) {
    var fnm = "addnewGrpCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let gropusr = req.body.data
    let count = 0;
    console.log(req.user);
    alertsMdl.addnewGrpMdl(gropusr, req.user)
        .then(function (result) {
            if (result.insertId) {
                for (var i = 0; i < gropusr.grpCtgryControl.length; i++) {
                    let grpctgry = {
                        grpid: result.insertId,
                        ctgryid: gropusr.grpCtgryControl[i]
                    }
                    alertsMdl.addnewGrpCtgyrRelMdl(grpctgry, req.user)
                        .then(function (results) {
                            count++;
                            console.log(count, gropusr.grpCtgryControl.length)
                            if (count == gropusr.grpCtgryControl.length) {
                                console.log('in ad sucess ------------------------------------------------------------------')
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });

                }
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : User Group Category list
* Parameters     : req,res()
* Description    : To get all Notification Type Icons
* Change History :
*
***************************************************************************************/
exports.getasgnUsrCtrl = function (req, res) {

    var fnm = "getasgnUsrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    alertsMdl.getasgnUsrMdl(req.user, req.params.id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : User Group Category list
* Parameters     : req,res()
* Description    : To get all Notification Type Icons
* Change History :
*
***************************************************************************************/
exports.getunasgnUsrCtrl = function (req, res) {
    
        var fnm = "getunasgnUsrCtrl";
        log.info(`In ${fnm}`, 0, cntxtDtls);
        // Model gets called Here 
        alertsMdl.getunasgnUsrMdl(req.user, req.params.id)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }

/**************************************************************************************
* Controller     : Add New Notification
* Parameters     : req,res()
* Description    : Add New Notification
* Change History :
*
***************************************************************************************/
exports.asgnUsrCtrl = function (req, res) {
    var fnm = "asgnUsrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let usrAsgn = req.body.data;
    let count = 0;
    console.log(usrAsgn);
    for (var i = 0; i < usrAsgn.usrControl.length; i++) {
        let asgnUsrDtls = {
            grpId: usrAsgn.grp_id,
            usrId: usrAsgn.usrControl[i]
        }
        console.log(asgnUsrDtls)
        alertsMdl.asgnUsrMdl(asgnUsrDtls, req.user)
            .then(function (results) {
                console.log(results)
                count++;
                console.log(count, usrAsgn.usrControl.length)
                if (count == usrAsgn.usrControl.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });

    }
}

/**************************************************************************************
* Controller     : delGrpCtrl
* Parameters     : req,res()
* Description    : To get all Organisational levels
* Change History :
*
***************************************************************************************/
exports.delGrpCtrl = function (req, res) {

    var fnm = "delGrpCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here 
    let grpId = req.params.id
    alertsMdl.delGrpMdl(req.user, grpId)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Update Group
* Parameters     : req,res()
* Description    : Add New Notification
* Change History :
*
***************************************************************************************/
exports.updtGrpCtrl = function (req, res) {
    var fnm = "addnewGrpCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let gropusr = req.body.data
    let count = 0;
    console.log(req.user);
    console.log(gropusr);
   
    alertsMdl.updtGrpMdl(gropusr, req.user)
        .then(function (result) {
            alertsMdl.updtGrpCtgyrRelMdl(gropusr, req.user)
                .then(function (results) {
                    console.log(results);
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        // df.formatSucessRes(req, res, result, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Add New User
* Parameters     : req,res()
* Description    : Add New User
* Change History :
*
***************************************************************************************/
exports.addnewUsrCtrl = function (req, res) {
    var fnm = "addnewUsrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let users = req.body.data
    let count = 0;
    for (var i = 0; i < users.length; i++) {
        console.log(users[i]);
        let data = {
            cstm_grp_id: users[i].cstm_grp_id,
            mrcht_usr_id: users[i].mrcht_usr_id
        }
        console.log(data);
    alertsMdl.addnewUsrMdl(data, req.user)
                        .then(function (results) {
                            console.log('results ------------------------');
                            console.log(results);
                            count++;
                            console.log(count, users.length)
                            if (count == users.length) {
                                console.log('in ad sucess ------------------------------------------------------------------')
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });

                    }
   

    
}

/**************************************************************************************
* Controller     : Add New User
* Parameters     : req,res()
* Description    : Add New User
* Change History :
*
***************************************************************************************/
exports.rmvexstUsrCtrl = function (req, res) {
    var fnm = "rmvexstUsrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let users = req.body.data
    let count = 0;
    for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let data = {
            cstm_grp_id: users[i].cstm_grp_id,
            mrcht_usr_id: users[i].mrcht_usr_id
        }
        // console.log(data);
    alertsMdl.rmvexstUsrMdl(data, req.user)
                        .then(function (results) {
                            count++;
                            console.log(count, users.length)
                            if (count == users.length) {
                                console.log('in ad sucess ------------------------------------------------------------------')
                                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                            }
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                    }
}



/**************************************************************************************
* Controller     : User Snent Notifications
* Parameters     : req,res()
* Description    : To get all User Sent Notifications
* Change History :
*
***************************************************************************************/
exports.getsentNotificationsCtrl = function (req, res) {
    
        var fnm = "getsentNotificationsCtrl";
        log.info(`In ${fnm}`, 0, cntxtDtls);
        // Model gets called Here 
        alertsMdl.getsentNotificationsMdl(req.user, req.params.catgry_id)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }

    /**************************************************************************************
* Controller     : User Recieved Notifications
* Parameters     : req,res()
* Description    : To get all User Received Notifications
* Change History :
*
***************************************************************************************/
exports.getreceivedNotificationsCtrl = function (req, res) {
    
        var fnm = "getreceivedNotificationsCtrl";
        log.info(`In ${fnm}`, 0, cntxtDtls);
        // Model gets called Here 
        alertsMdl.getreceivedNotificationsMdl(req.user, req.params.catgry_id)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }