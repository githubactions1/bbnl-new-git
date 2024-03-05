var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var cmsmdl = require('../models/cmsMdl');
var crypto = require('crypto');


/**************************************************************************************
* Controller     : get_verfyCtrl
* Parameters     : req, res
* Description    : 
* Change History :
* 11/05/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_verfyCtrl = (req, res) => {
    var fnm = "get_verfyCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var jsonData;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    jsonData = JSON.stringify(req.query);
    console.log(jsonData);
    cmsmdl.insert_reqCtrl(req.query)
        .then((Insertresults) => {
            cmsmdl.get_verfyMdl(req.query, Insertresults.insertId, fullUrl, jsonData)
                .then((results) => {
                    console.log(results[1][0]);
                    console.log(results[0][0]);

                    let res_body = ''
                    if (results[0][0].count > 0) {
                        if (results[1][0].count == 0) {
                            var sts = 2;
                            res_body = { "responseStatus": { "statusCode": "403", "statusMessage": "Invalid Mobile Number" } };
                            cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                                .then((data) => {
                                    res_body = { "responseStatus": { "statusCode": "403", "statusMessage": "Invalid Mobile Number" } };
                                    res.send(res_body);
                                })
                        }
                        else if (results[1][0].count > 0) {
                            var sts = 3;
                            res_body = { "responseStatus": { "statusCode": "201", "StatusMessage": "Valid LMO" } };
                            cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                                .then((data) => {
                                    res_body = { "responseStatus": { "statusCode": "201", "StatusMessage": "Valid LMO" } };
                                    res.send(res_body);
                                })
                        }

                    }
                    else if (results[0][0].count == 0) {
                        var sts = 2;
                        res_body = { "responseStatus": { "statusCode": "401", "statusMessage": "LMO-ID Not Found" } };
                        cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                            .then((data) => {
                                res_body = { "responseStatus": { "statusCode": "401", "statusMessage": "LMO-ID Not Found" } };
                                res.send(res_body);
                            })
                    }


                }).catch((error) => {
                    var sts = 2;
                    res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } };
                    cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                        .then((data) => {
                            res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } });
                        })
                });
        })
        .catch((error) => {
            var sts = 2;
            res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } };
            cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                .then((data) => {
                    res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } });
                })
        });

}



/**************************************************************************************
* Controller     : post_crdtLmoValet
* Parameters     : None
* Description    : 
* Change History :
* 11/05/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.post_crdtLmoValet = (req, res) => {
    var fnm = "post_crdtLmoValet";
    var isLmoExists = false;
    var isValidPhone = false;
    var isValidDate = false;
    var jsonData;
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    jsonData = JSON.stringify(req.body);
    cmsmdl.insertApiReqCtrl(req.body)
        .then((Insertresults) => {
            cmsmdl.get_verfyMdl(req.body, Insertresults.insertId, fullUrl, jsonData)
                .then((results) => {
                    if (results[0][0].count > 0) { isLmoExists = true; }
                    if (results[1][0].count > 0) { isValidPhone = true; }
                    if (req.body.Dateofpayment && req.body.Dateofpayment != 'undefined' && req.body.Dateofpayment != 'null') { isValidDate = true; }

                    if (isLmoExists && isValidPhone && req.body.Amountpaid > 0 && req.body.Tranrefnumber && isValidDate) {
                        cmsmdl.get_verfyTransctnAndAmount(req.body,results[0][0])
                            .then(function (transactnVerfctn) {
                                if (transactnVerfctn[0][0].trns_ref_nu == req.body.Tranrefnumber) {
                                    if (transactnVerfctn[0][0].trnsn_at == req.body.Amountpaid) {
                                        var sts = 2;
                                        res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Already This Transaction Has been done" } };
                                        cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                                            .then((data) => {
                                                res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Already This Transaction Has been done" } };
                                                res.send(res_body);
                                            })
                                    }
                                    else if (transactnVerfctn[0][0].trnsn_at != req.body.Amountpaid) {
                                        cmsmdl.upDatePaymntDtlsMdl(req.body, results[0][0])
                                            .then(function (resultsOne) {
                                                var sts = 3;
                                                res_body = { "responseStatus": { "statusCode": "201", "statusMessage": "Successfullly Updated" } };
                                                cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                                                    .then((data) => {
                                                        res_body = { "responseStatus": { "statusCode": "201", "statusMessage": "Successfullly Updated" } };
                                                        res.send(res_body);
                                                    })
                                            })
                                    }
                                }
                                else {
                                     cmsmdl.insrtPaymntDtlsMdl(req.body, results[0][0], transactnVerfctn[1][0])
                                        .then(function (paymnts) {
                                      cmsmdl.updatePreviousPymnts(req.body, results[0][0])
                                        .then(function (resultsOne) {
                                            var sts = 3;
                                            res_body = { "responseStatus": { "statusCode": "201", "statusMessage": "Credited" } };
                                            cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                                                .then((data) => {
                                                    res_body = { "responseStatus": { "statusCode": "201", "statusMessage": "Credited" } };
                                                    res.send(res_body);
                                                })
                                        }).catch((error) => {
                                            var sts = 2;
                                            res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong With Previous Payments Updation" } };
                                            cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                                                .then((data) => {
                                                    res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong With Previous Payments Updation" } });
                                                })
                                        });

                                }).catch((error) => {
                                            var sts = 2;
                                            res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong With Payments Insertion" } };
                                            cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                                                .then((data) => {
                                                    res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong With Payments Insertion" } });
                                                })
                                        });
                                }

                            }).catch((error) => {
                                var sts = 2;
                                res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong With TransReference Number Verification" } };
                                cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                                    .then((data) => {
                                        res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong With TransReference Number Verification" } });
                                    })
                            });

                    }
                    else if (!isLmoExists) {
                        var sts = 2;
                        res_body = { "responseStatus": { "statusCode": "401", "statusMessage": "LMO-ID Not Found" } };
                        cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                            .then((data) => {
                                res_body = { "responseStatus": { "statusCode": "401", "statusMessage": "LMO-ID Not Found" } };
                                res.send(res_body);
                            })
                    }
                    else if (!isValidPhone) {
                        var sts = 2;
                        res_body = { "responseStatus": { "statusCode": "403", "statusMessage": "Invalid Mobile Number" } };
                        cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                            .then((data) => {
                                res_body = { "responseStatus": { "statusCode": "403", "statusMessage": "Invalid Mobile Number" } };
                                res.send(res_body);
                            })
                    }
                    else if (req.body.Amountpaid == 0) {
                        var sts = 2;
                        res_body = { "responseStatus": { "statusCode": "405", "statusMessage": "Invalid Amount" } };
                        cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                            .then((data) => {
                                res_body = { "responseStatus": { "statusCode": "405", "statusMessage": "Invalid Amount" } };
                                res.send(res_body);
                            })

                    }
                    else if (!req.body.Tranrefnumber) {
                        var sts = 2;
                        res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Tranrefnumber Not There" } };
                        cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                            .then((data) => {
                                res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Tranrefnumber Not There" } };
                                res.send(res_body);
                            })
                    }
                }).catch((error) => {
                    var sts = 2;
                    res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong With LMO and PhoneNumber verification" } };
                    cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                        .then((data) => {
                            res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong With LMO and PhoneNumber verification" } });
                            // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        })
                });
        }).catch((error) => {
            var sts = 2;
            res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } };
            cmsmdl.CallFailOrSuccess(Insertresults.insertId, sts, JSON.stringify(res_body))
                .then((data) => {
                    res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } });
                    // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                })
        });

}



// /**************************************************************************************
// * Controller     : post_KotalDtls
// * Parameters     : None
// * Description    : 
// * Change History :
// * 11/05/2020    - MADHURI NUNE - Initial Function
// ***************************************************************************************/
// exports.post_KotakTransDtls = (req, res) => {
//     var fnm = "post_KotalDtls";
//     var isLmoExists = false;
//     var isValidPhone = false;
//     var jsonData;
//     log.info(`In ${fnm}`, 0, cntxtDtls);
//     var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//     jsonData = JSON.stringify(req.body);
//     cmsmdl.insertApiReqCtrl(req.body)
//         .then((Insertresults) => {
//             cmsmdl.get_verfyMdl(req.body, Insertresults.insertId, fullUrl, jsonData)
//                 .then((results) => {
//                     if (results[0][0].count > 0) { isLmoExists = true; }
//                     if (results[1][0].count > 0) { isValidPhone = true; }

//                     if (isLmoExists && isValidPhone && req.body.Amountpaid > 0 && req.body.Tranrefnumber) {
//                         cmsmdl.insrtKotakPaymntDtlsMdl(req.body, results[0][0])
//                             .then(function (resultsOne) {
//                                 var sts = 3;
//                                 res_body = { "responseStatus": { "statusCode": "201", "statusMessage": "Credited" } };
//                                 cmsmdl.CallFailOrSuccess(Insertresults.insertId,sts,JSON.stringify(res_body))
//                                     .then((data) => {
//                                         res_body = { "responseStatus": { "statusCode": "201", "statusMessage": "Credited" } };
//                                         res.send(res_body);
//                                     })
//                             }).catch((error) => {
//                                 var sts = 2;
//                                 res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } };
//                                 cmsmdl.CallFailOrSuccess(Insertresults.insertId,sts,JSON.stringify(res_body))
//                                     .then((data) => {
//                                         res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } });
//                                     })
//                             });
//                     }
//                     else if (!isLmoExists) {
//                         var sts = 2;
//                         res_body = { "responseStatus": { "statusCode": "401", "statusMessage": "LMO-ID Not Found" } };
//                         cmsmdl.CallFailOrSuccess(Insertresults.insertId,sts,JSON.stringify(res_body))
//                             .then((data) => {
//                                 res_body = { "responseStatus": { "statusCode": "401", "statusMessage": "LMO-ID Not Found" } };
//                                 res.send(res_body);
//                             })
//                     }
//                     else if (!isValidPhone) {
//                         var sts = 2;
//                         res_body = { "responseStatus": { "statusCode": "402", "statusMessage": "Mobile Number does not exist" } };
//                         cmsmdl.CallFailOrSuccess(Insertresults.insertId,sts,JSON.stringify(res_body))
//                             .then((data) => {
//                                 res_body = { "responseStatus": { "statusCode": "402", "statusMessage": "Mobile Number does not exist" } };
//                                 res.send(res_body);
//                             })
//                     }
//                     else if (!isLmoExists && !isValidPhone) {
//                         var sts = 2;
//                         res_body = { "responseStatus": { "statusCode": "403", "statusMessage": "Invalid Mobile Number" } };
//                         cmsmdl.CallFailOrSuccess(Insertresults.insertId,sts,JSON.stringify(res_body))
//                             .then((data) => {
//                                 res_body = { "responseStatus": { "statusCode": "403", "statusMessage": "Invalid Mobile Number" } };
//                                 res.send(res_body);
//                             })
//                     }
//                     else if (req.body.Amountpaid == 0) {
//                         var sts = 2;
//                         res_body = { "responseStatus": { "statusCode": "405", "statusMessage": "Invalid Amount" } };
//                         cmsmdl.CallFailOrSuccess(Insertresults.insertId,sts,JSON.stringify(res_body))
//                             .then((data) => {
//                                 res_body = { "responseStatus": { "statusCode": "405", "statusMessage": "Invalid Amount" } };
//                                 res.send(res_body);
//                             })


//                     }
//                     else if (!req.body.Tranrefnumber) {
//                         var sts = 2;
//                         res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } };
//                         cmsmdl.CallFailOrSuccess(Insertresults.insertId,sts,JSON.stringify(res_body))
//                             .then((data) => {
//                                 res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Tranrefnumber Not There" } };
//                                 res.send(res_body);
//                             })
//                     }
//                 }).catch((error) => {
//                     var sts = 2;
//                     res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } };
//                     cmsmdl.CallFailOrSuccess(Insertresults.insertId,sts,JSON.stringify(res_body))
//                         .then((data) => {
//                             res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } });
//                         })
//                 });
//         }).catch((error) => {
//             var sts = 2;
//             res_body = { "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } };
//             cmsmdl.CallFailOrSuccess(Insertresults.insertId,sts,JSON.stringify(res_body))
//                 .then((data) => {
//                     res.send({ "responseStatus": { "statusCode": "501", "statusMessage": "Something Went Wrong, Please try again" } });
//                 })
//         });

// }
