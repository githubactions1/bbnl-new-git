const fngMdl = require(appRoot + '/server/api/modules/caf/models/FngrMdl');
var df = require(appRoot + '/utils/dflower.utils');
// var evntCtrl = require(appRoot + '/server/api/modules/events/controllers/evntsCtrl');
// var kysCtrl = require(appRoot + '/server/api/modules/general/keys/controllers/kysCtrl');
// var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/apiMaster/controllers/apiMstrCtrl');
// var indCstmrMdl = require(appRoot + '/server/api/modules/caf/models/CustomerMdl');
// var entCstmrMdl = require(appRoot + '/server/api/modules/caf/models/EntCustomerMdl');
// var mrchntMdl = require(appRoot + '/server/api/modules/merchant/models/merchantsMdl');
// var creSrvMdl = require(appRoot + '/server/api/modules/package/models/CreSrvceMdl');
// var umMdl = require(appRoot + '/server/api/modules/general/um/models/userMgtMdl');
// var apCnst = require(appRoot + '/utils/appConstants');
var jsonUtils = require(appRoot + '/utils/json.utils');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var log = require(appRoot + '/utils/logmessages')
var cafBO = require(appRoot + '/server/api/modules/caf/cafBO/cafBo');

/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getfngrcafdt = function (req, res) {
    console.log(req.body)

    var query = require('url').parse(req.url, true).query;

    let filter = []
    //console.log(JSON.parse(query.filter)[1])
    if (query.filter) {
        for (let i = 0; i < JSON.parse(query.filter).length; i++) {
            if (typeof JSON.parse(query.filter)[i] == 'object') {
                filter.push({
                    key: JSON.parse(query.filter)[i][0],
                    opr: JSON.parse(query.filter)[i][1],
                    value: JSON.parse(query.filter)[i][2],
                }
                )
            }
        }
        console.log(filter, "----------------------------------------")
        fngMdl.gtCafSrchMdl(filter, req.user).then(function (results) {

            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});

        })


    } else if (query.take && query.skip) {
        var take = query.take;
        var skip = query.skip;
        console.log(skip, take)

        fngMdl.getfngrcafdtMdl(skip, take, filter, req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });

    } else {
        fngMdl.getSelcttMdl(skip, take, filter, req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }


}
/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.gtmsgStsCtrl = function (req, res) {

    fngMdl.gtmsgStsMdl(req.body.data, req.user)
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


    fngMdl.gtFntMdl(req.params, req.user)
        .then(function (results) {

            fngMdl.gtclrMdl(req.params, req.user).then(function (result1) {



                fngMdl.gtmsgTypMdl(req.params, req.user).then(function (result2) {

                    fngMdl.gtmsgCtgryMdl(req.params, req.user).then(function (result3) {



                        var temp = {
                            fntData: results,
                            clrData: result1,
                            msgTyp: result2,
                            msctgry: result3,

                        }

                        df.formatSucessRes(req, res, temp, cntxtDtls, '', {});




                    }).catch(function (error) {

                    })


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
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.sndMsgCtrl = function (req, res) {
    var cfMsgRelPromises = []
    var agntMsgRelPromises = []
    var cafIds = req.body.data.cafid
    var data = req.body.data
    //  console.log(req.body.data)




    if (data.GlobalMsg == 'GrpMsg') {
        if (data.franchisecds) {
            console.log("LMOS")
            fngMdl.sndMsgMdl(req.body.data, req.user).then((result) => {
                console.log("LENGHT---------------------------------------------" + data.franchisecds.length)

                fngMdl.insrtAgntRelMdl(result.insertId, data.franchisecds, req.user).then((results) => {
                    console.log("IN THEN  L" + data.franchisecds.length)
                    try {
                        req.body.data["expiryDate"] = req.body.data["expiryDate"].replace(/-/g, '')
                        if (data.franchisecds.length > 50) {

                            let ttlBatches = jsonUtils.chunkArray(data.franchisecds, 500);
                            console.log("IN THEN BATCHES" + ttlBatches.length)
                            let sendOsdBatch = function (index, data) {
                                req.body.data["franchisecds"] = ttlBatches[index];
                                var cfMsginpt = cafBO.Sendmsg(data, req.user)
                                setTimeout(() => {
                                    extApiCtrl.callApi("LMO FingerPrint", 7, 7, result.insertId, cfMsginpt, req.user).then((result) => {
                                        console.log("Done" + result)

                                    }).catch((err) => {
                                        console.log("Failed" + JSON.stringify(err))


                                    })
                                    if (index == ttlBatches.length - 1) {

                                    } else {
                                        sendOsdBatch(index + 1, req.body.data)
                                    }
                                }, 10000)

                            }
                            sendOsdBatch(0, req.body.data)



                        } else {
                            var cfMsginpt = cafBO.Sendmsg(req.body.data, req.user)
                            extApiCtrl.callApi("LMO FingerPrint", 7, 7, result.insertId, cfMsginpt, req.user).then((result) => {
                                console.log("Done" + result)
                                //  df.formatSucessRes(req, res, result, cntxtDtls, '', req.user);
                            }).catch((err) => {
                                console.log("Failed" + JSON.stringify(err))
                                //df.formatErrorRes(req, res, err, cntxtDtls, '', {});

                            })
                        }


                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    } catch (err) {
                        console.log(err)
                    }
                }).catch((err) => {
                    console.log("IN CATCH" + err)
                    df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                })

            }).catch((err) => {
                df.formatErrorRes(req, res, err, cntxtDtls, '', {});
            })
        } else {
            console.log("SUBSCRIBERS")
            fngMdl.getMsgLmoMdl(data).then(function (Lmocds) {
                console.log(Lmocds)
                fngMdl.sndMsgMdl(req.body.data, req.user).then((result) => {
                    for (let i = 0; i < Lmocds.length; i++) {
                        cfMsgRelPromises.push(fngMdl.insrtagntRelMdl(result.insertId, Lmocds[i].agnt_id, req.user))
                    }
                    Promise.all(cfMsgRelPromises).then((results) => {
                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                        req.body.data["expiryDate"] = req.body.data["expiryDate"].replace(/-/g, '')
                        var cfMsginpt = cafBO.Sendmsg(req.body.data, req.user)
                        console.log(JSON.stringify(cfMsginpt))
                        console.log(JSON.stringify(req.body.data))
                        extApiCtrl.callApi("GROUP FingerPrint", 7, 7, result.insertId, cfMsginpt, req.user).then((result) => {
                            console.log("Done" + result)
                            df.formatSucessRes(req, res, result, cntxtDtls, '', req.user);
                        }).catch((err) => {
                            console.log("Failed" + JSON.stringify(err))
                            df.formatErrorRes(req, res, err, cntxtDtls, '', {});

                        })

                    }).catch((err) => {
                        df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                    })

                }).catch((err) => {
                    df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                })
            })
        }

    } if (data.GlobalMsg == 'invdufng') {
        console.log("INDIVIDUAL")
        fngMdl.sndMsgMdl(req.body.data, req.user).then((result) => {
            console.log(result)
            try {
                for (let i = 0; i < cafIds.length; i++) {
                    cfMsgRelPromises.push(fngMdl.insrtCafRelMdl(result.insertId, cafIds[i], req.user))
                }
            } catch (err) {
                console.log("Err" + err)
            }


            Promise.all(cfMsgRelPromises).then((results) => {

                // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                req.body.data["expiryDate"] = req.body.data["expiryDate"].replace(/-/g, '')
                var cfMsginpt = cafBO.Sendmsg(req.body.data, req.user)
                console.log(JSON.stringify(cfMsginpt))
                console.log(JSON.stringify(req.body.data))

                try {
                    extApiCtrl.callApi("INDIVIDUAL FingerPrint", 7, 7, result.insertId, cfMsginpt, req.user).then((result) => {
                        console.log("Done" + result)
                        // df.formatSucessRes(req, res, result, cntxtDtls, '', req.user);
                    }).catch((err) => {
                        console.log("Failed" + JSON.stringify(err))
                        //  df.formatErrorRes(req, res, err, cntxtDtls, '', {});

                    })
                } catch (err) {
                    console.log(err)
                }
                df.formatSucessRes(req, res, result, cntxtDtls, '', req.user);

            }).catch((err) => {
                df.formatErrorRes(req, res, err, cntxtDtls, '', {});
            })
        })
    }




}
/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getGrpFngrcafdt = function (req, res) {

    console.log(req.body.data)

    fngMdl.getGrpFngrcafdtMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.gtCafct = function (req, res) {

    console.log(req.body.data)

    fngMdl.gtCafctMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getMsgDtls = function (req, res) {

    console.log(req.body.data)

    fngMdl.getMsgDtlsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_cafdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getmsgbyid = function (req, res) {

    console.log(req.body.data)

    fngMdl.getmsgbyidMdl(req.params.msgid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : cnclmsgCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.cnclmsgCtrl = function (req, res) {

    console.log(req.body.data)

    fngMdl.cnclmsgMdl(req.body.data, req.user)
        .then(function (results) {
            var msgcncl = cafBO.cnclmsg(req.body.data, req.user)
            console.log(msgcncl)
            extApiCtrl.callApi("GROUP FingerPrint", 7, 7, result.insertId, cfMsginpt, req.user).then((result) => {
                console.log("Done" + result)
                df.formatSucessRes(req, res, result, cntxtDtls, '', req.user);
            }).catch((err) => {
                console.log("Failed" + JSON.stringify(err))
                df.formatErrorRes(req, res, err, cntxtDtls, '', {});

            })
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}