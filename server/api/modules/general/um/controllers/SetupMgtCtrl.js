// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var attUtil = require(appRoot + '/utils/attachment.utils');
var mailUtls = require(appRoot + '/utils/communication.utils');
var _ = require('lodash');
// Model Inclusions
var usrmngtmdl = require('../models/setupMgtMdl');
var dbutil = require(appRoot + '/utils/db.utils');
var operationsUtils = require(appRoot + '/utils/operations.utils');
/**************************************************************************************
* Controller     : umCtrl.userPrfl_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 23/07/2019    - Bala - Initial Function
*
***************************************************************************************/
exports.userStpPrfle_get = function (req, res) {
    var fnm = "userStpPrfle_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.getUserStpPrfle(req.user)
                .then(function (results) {
                    // console.log(results)
                    var common_feilds = ['stp_grp_id', 'sqnc_id', 'stp_grp_nm'];
                    var arrFeilds = ['stp_opt_id', 'stp_opt_nm', 'stp_opt_icn_tx', 'stp_opt_url_tx'];
                    var arrName = 'opts';
                    var groupBy = 'stp_grp_id';
                    var sortKey = 'sqnc_id';
                    var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
                    // console.log(groupres)
                    df.formatSucessRes(req, res, groupres, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}
/**************************************************************************************
* Controller     : chnageLogInd
* Parameters     : req,res()
* Description    : To change to log indicator for not showing lates changes for the second when click ok 
* Change History :
* 13/11/2019     -  KOTESWARARAO BORIGARLA - Initial Function
*
***************************************************************************************/
exports.chnageLogInd = function (req, res) {
    var fnm = "userStpPrfle_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.chnageLogIndMdl(req.body, req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/**************************************************************************************
* Controller     : ltstChngdLgData
* Parameters     : req,res()
* Description    : To get  latest log data 
* Change History :
* 13/11/2019     -  KOTESWARARAO BORIGARLA - Initial Function
*
***************************************************************************************/
exports.ltstChngdLgData = function (req, res) {
    var fnm = "ltstChngdLgData";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.ltstChngdLgDataMdl(req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/**************************************************************************************
* Controller     : allChngdLgTmlneDtaData
* Parameters     : req,res()
* Description    : To get  All log data 
* Change History :
* 13/11/2019     -  KOTESWARARAO BORIGARLA - Initial Function
*
***************************************************************************************/
exports.allChngdLgTmlneDtaData = function (req, res) {
    var fnm = "allChngdLgTmlneDtaData";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.allChngdLgDataMdl(req.params.slctdCmpntId, req.user)
                .then(function (results) {
                    // console.log("*************************")
                    // console.log(results)
                    // console.log("*************************")
                    let fltr = [];
                    // var chnglog = (chts) => {
                    //     let res = []
                    //     chts.filter((k) => {
                    //         res.push({
                    //             chng_lg_txt: k.chng_lg_txt,
                    //         })
                    //     })
                    //     return res;
                    // }
                    _.forIn(_.groupBy(results, 'chng_lg_dt'), (value, key) => {
                        console.log(value)
                        fltr.push({
                            chng_lg_dt: key,
                            chng_lg_txt: value,
                        })
                    });
                    // console.log('------------------------------hjh-------')
                    // console.log(JSON.stringify(fltr))
                    fltr.forEach((i) => {
                        let txts = [];
                        _.forIn(_.groupBy(i.chng_lg_txt, 'ctgry_id'), (value, key) => {

                            txts.push({
                                ctgry_id: key,
                                ctgry_nm: value[0].ctgry_nm,
                                vrsn_nu: value[0].vrsn_nu,
                                chng_lg_txt: value,
                            })
                        });
                        i.chng_lg_txt = txts;
                    })
                    // console.log(JSON.stringify(fltr))

                    df.formatSucessRes(req, res, fltr, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}

/**************************************************************************************
* Controller     : allChngdLgData
* Parameters     : req,res()
* Description    : To get  All log data 
* Change History :
* 13/11/2019     -  KOTESWARARAO BORIGARLA - Initial Function
*
***************************************************************************************/
exports.allChngdLgData = function (req, res) {
    var fnm = "allChngdLgData";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            usrmngtmdl.allChngdLgDataMdl(req.params.slctdCmpntId, req.user)
                .then(function (results) {
                    // console.log("*************************")
                    // console.log(results)
                    // console.log("*************************")
                    // let fltr = [];
                    // var chnglog = (chts) => {
                    //     let res = []
                    //     chts.filter((k) => {
                    //         res.push({
                    //             chng_lg_txt: k.chng_lg_txt,
                    //         })
                    //     })
                    //     return res;
                    // }
                    // _.forIn(_.groupBy(results, 'chng_lg_dt'), (value, key) => {
                    //     // console.log(value)
                    //     fltr.push({
                    //         chng_lg_dt: value[0].chng_lg_dt,
                    //         chng_lg_txt: chnglog(value),
                    //     })
                    // });
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}





/**************************************************************************************
* Controller     : chngeLgCtgryCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.chngeLgCtgryCtrl = function (req, res) {
    var fnm = "chngeLgCtgryCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.chngeLgCtgryMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : chngeLgCmpntCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.chngeLgCmpntCtrl = function (req, res) {
    var fnm = "chngeLgCmpntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.chngeLgCmpntMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : inschngelogCtrl
* Parameters     : req,res()
* Description    : Insert Change Log Data
* Change History :
*
***************************************************************************************/
exports.inschngelogCtrl = function (req, res) {
    var fnm = "inschngelogCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);


    usrmngtmdl.inschngelogMdl(req.body.data, req.user, function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": std.message.MODEL_ERR.code, "message": std.message.MODEL_ERR.message, "data": [] }); return; }
        res.send({ "status": std.message.SUCCESS.code, "message": std.message.SUCCESS.message, "data": results });
    });
    // // Model gets called Here
    // usrmngtmdl.inschngelogMdl(req.body.data)
    //     .then(function (result) {
    //         df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //     }).catch(function (error) {
    //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //     });
}


/**************************************************************************************
* Controller     : delchngelogCtrl
* Parameters     : req,res()
* Description    : Delete Change log
* Change History :
*
***************************************************************************************/
exports.delchngelogCtrl = function (req, res) {
    var fnm = "delchngelogCtrl";
    var chng_lg_id = req.params.chng_lg_id
    log.info("***********************************")
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.delchngeloglMdl(chng_lg_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updchngelogCtrl
* Parameters     : req,res()
* Description    : Update Chnge log Data
* Change History :
*
***************************************************************************************/
exports.updchngelogCtrl = function (req, res) {
    var fnm = "updchngelogCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.updchangelogMdl(req.body,req.user)
        .then(function (result) {
            // console.log("***************************************")
            // console.log(result)
            // console.log("***************************************")
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




/**************************************************************************************
* Controller     : insdeprtCtrl
* Parameters     : req,res()
* Description    : Insert Department Data
* Change History :
*
***************************************************************************************/
exports.insdeprtCtrl = function (req, res) {
    var fnm = "insdeprtCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.insdeprtMdl(req.body,req.user)
        .then(function (result) {
            // console.log(result)
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : upddepCtrl
* Parameters     : req,res()
* Description    : Update Department Data
* Change History :
*
***************************************************************************************/
exports.upddepCtrl = function (req, res) {
    var fnm = "upddepCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.upddepMdl(req.body,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : deldepCtrl
* Parameters     : req,res()
* Description    : Delete Department Data
* Change History :
*
***************************************************************************************/
exports.deldepCtrl = function (req, res) {
    var fnm = "deldepCtrl";
    // console.log(req.params);
    var dprnt_id = req.params.deprt_id;
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.deldepMdl(dprnt_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getdeprtCtrl
* Parameters     : req,res()
* Description    : Get Department Data
* Change History :
*
***************************************************************************************/
exports.getdeprtCtrl = function (req, res) {
    var fnm = "getdeprtCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getdeprtMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : insdesgnCtrl
* Parameters     : req,res()
* Description    : Insert Designation Data
* Change History :
*
***************************************************************************************/
exports.insdesgnCtrl = function (req, res) {
    var fnm = "insdesgnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.insdesgnMdl(req.body,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : upddesgnCtrl
* Parameters     : req,res()
* Description    : Update Designation Data
* Change History :
*
***************************************************************************************/
exports.upddesgnCtrl = function (req, res) {
    var fnm = "upddesgnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.upddesgnMdl(req.body,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : deldesgnCtrl
* Parameters     : req,res()
* Description    : Delete Designation
* Change History :
*
***************************************************************************************/
exports.deldesgnCtrl = function (req, res) {
    var fnm = "deldesgnCtrl";
    var desgn_id = req.params.dsgn_id
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.deldesgnMdl(desgn_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getdesgnCtrl
* Parameters     : req,res()
* Description    : get Designation Data
* Change History :
*
***************************************************************************************/
exports.getdesgnCtrl = function (req, res) {
    var fnm = "getdesgnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getdesgnMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : inslctnCtrl
* Parameters     : req,res()
* Description    : Insert Location Data
* Change History :
*
***************************************************************************************/
exports.inslctnCtrl = function (req, res) {
    var fnm = "inslctnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.inslctnMdl(req.body,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : updlctnCtrl
* Parameters     : req,res()
* Description    : Update Location Data
* Change History :
*
***************************************************************************************/
exports.updlctnCtrl = function (req, res) {
    var fnm = "updlctnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.updlctnMdl(req.body,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : dellctnCtrl
* Parameters     : req,res()
* Description    : Delete Location
* Change History :
*
***************************************************************************************/
exports.dellctnCtrl = function (req, res) {
    var fnm = "dellctnCtrl";
    var lctn_id = req.params.lctn_id
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.dellctnMdl(lctn_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getlctnCtrl
* Parameters     : req,res()
* Description    : Get Location Data
* Change History :
*
***************************************************************************************/
exports.getlctnCtrl = function (req, res) {
    var fnm = "getlctnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getlctnMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : insemplyCtrl
* Parameters     : req,res()
* Description    : Insert Employee Data
* Change History :
*
***************************************************************************************/
exports.insemplyCtrl = function (req, res) {
    var fnm = "insemplyCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    // console.log(req.user)
    usrmngtmdl.insemplyMdl(req.body, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updemplyCtrl
* Parameters     : req,res()
* Description    : Update Employee Data
* Change History :
*
***************************************************************************************/
exports.updemplyCtrl = function (req, res) {
    var fnm = "updemplyCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.updemplyMdl(req.body, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : delemplyCtrl
* Parameters     : req,res()
* Description    : Delete Employee
* Change History :
*
***************************************************************************************/
exports.delemplyCtrl = function (req, res) {
    var fnm = "delemplyCtrl";
    var emply_id = req.params.mrcht_emp_id
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.delemplyMdl(emply_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getemplyCtrl
* Parameters     : req,res()
* Description    : Get Employee Data
* Change History :
*
***************************************************************************************/
exports.getemplyCtrl = function (req, res) {
    var fnm = "getemplyCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getemplyMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : insorgnCtrl
* Parameters     : req,res()
* Description    : Insert Organisation Data
* Change History :
*
***************************************************************************************/
exports.insorgnCtrl = function (req, res) {
    var fnm = "insorgnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.insorgnMdl(req.body,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updorgnCtrl
* Parameters     : req,res()
* Description    : Update Organisation Data
* Change History :
*
***************************************************************************************/
exports.updorgnCtrl = function (req, res) {
    var fnm = "updorgnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // console.log(req.body)
    // Model gets called Here
    usrmngtmdl.updorgnMdl(req.body,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : delorgnCtrl
* Parameters     : req,res()
* Description    : Delete Organisation
* Change History :
*
***************************************************************************************/
exports.delorgnCtrl = function (req, res) {
    var fnm = "delorgnCtrl";
    var orgn_id = req.params.orgn_id
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.delorgnMdl(orgn_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getorgnCtrl
* Parameters     : req,res()
* Description    : Get Organisation Data
* Change History :
*
***************************************************************************************/
exports.getorgnCtrl = function (req, res) {
    var fnm = "getorgnCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getorgnMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getMyMrchtDtlsCtrl
* Parameters     : req,res()
* Description    : Get MyOrganisation Data
* Change History :
*
***************************************************************************************/
exports.getMyMrchtDtlsCtrl = function (req, res) {
    var fnm = "getMyMrchtDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getMyMrchtDtlsMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getoutletCtrl
* Parameters     : req,res()
* Description    : Get Outlet Data
* Change History :
*
***************************************************************************************/
exports.getoutletCtrl = function (req, res) {
    var fnm = "getoutletCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getoutletMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : insoutletCtrl
* Parameters     : req,res()
* Description    : Insert Outlet Data
* Change History :
*
***************************************************************************************/
exports.insoutletCtrl = function (req, res) {
    var fnm = "insoutletCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.insoutletMdl(req.body, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updoutletCtrl
* Parameters     : req,res()
* Description    : Update Outlet Data
* Change History :
*
***************************************************************************************/
exports.updoutletCtrl = function (req, res) {
    var fnm = "updoutletCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.updoutletMdl(req.body, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : deloutletCtrl
* Parameters     : req,res()
* Description    : Delete Outlet
* Change History :
*
***************************************************************************************/
exports.deloutletCtrl = function (req, res) {
    var fnm = "deloutletCtrl";
    var otlt_id = req.params.otlt_id
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.deloutletMdl(otlt_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getoutletcategoryCtrl
* Parameters     : req,res()
* Description    : Get OutletCatogery Data
* Change History :
*
***************************************************************************************/
exports.getoutletcategoryCtrl = function (req, res) {
    var fnm = "getoutletcategoryCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getoutletcategryMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : insoutletcategoryCtrl
* Parameters     : req,res()
* Description    : Insert OutletCatogery Data
* Change History :
*
***************************************************************************************/
exports.insoutletcategoryCtrl = function (req, res) {
    var fnm = "insoutletcategoryCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.insoutletcategoryMdl(req.body, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updoutletcategoryCtrl
* Parameters     : req,res()
* Description    : Update OutletCatogery Data
* Change History :
*
***************************************************************************************/
exports.updoutletcategoryCtrl = function (req, res) {
    var fnm = "updoutletcategoryCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.updoutletcategoryMdl(req.body, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : deloutletcategoryCtrl
* Parameters     : req,res()
* Description    : Update OutletCatogery Data
* Change History :
*
***************************************************************************************/
exports.deloutletcategoryCtrl = function (req, res) {
    var fnm = "deloutletcategoryCtrl";
    var otlt_ctgry_id = req.params.otlt_ctgry_id
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.deloutletcategoryMdl(otlt_ctgry_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : getgndrCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/
exports.getgndrCtrl = function (req, res) {
    var fnm = "getgndrCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getgndrMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getMandalLst
* Parameters     : req,res()
* Description    : 
* Change History :
*
***************************************************************************************/

exports.getMandalLst = function (req, res) {
    log.info("getMandalLst", 0, cntxtDtls);
    usrmngtmdl.getMandalLstMdl(req.params.dstrct_id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            log.info(error, 0, cntxtDtls);
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/********************************************************************************************************* */

exports.getSvmLst = function (req, res) {
    log.info("getsvmLst", 0, cntxtDtls);
    usrmngtmdl.getSvmLstMdl(req.params.mndl_id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            log.info(error, 0, cntxtDtls);
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getusrlstCtrl
* Parameters     : req,res()
* Description    : Select User Data
* Change History :
*
***************************************************************************************/
exports.getusrlstCtrl = function (req, res) {
    var fnm = "getusrlstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    // console.log(req.user)
    usrmngtmdl.getusrlstMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getCmpntCtrl
* Parameters     : req,res()
* Description    : Select Component Data
* Change History :
*
***************************************************************************************/
exports.getCmpntCtrl = function (req, res) {
    var fnm = "getCmpntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    // console.log(req.user)
    usrmngtmdl.getCmpntMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getprflstCtrl
* Parameters     : req,res()
* Description    : Select profile Data
* Change History :
*
***************************************************************************************/
exports.getprflstCtrl = function (req, res) {
    var fnm = "getprflstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    // console.log(req.user)
    usrmngtmdl.getprflstMdl(req.user)
        .then(function (result) {

            var common_feilds = ['mnu_prfle_id', 'mnu_prfle_nm', 'crtd_usr_nm', 'crtd_tmstmp', 'upd_usr_nm', 'upd_tmstmp', 'cmpnt_nm', 'cmpnt_id', 'prfle_dscrn_tx'];
            var arrFeilds = ['mnu_itm_id', 'mnu_itm_nm', 'mnu_itm_icn_tx', 'prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'a_in'];
            var arrName = 'menuItms';
            var groupByKey = 'mnu_prfle_id';
            var sortKey = 'mnu_prfle_id';
            var prfmnuitmrsults = jsonUtils.groupJsonByKey(result, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");

            var resData = []
            for (let i = 0; i < prfmnuitmrsults.length; i++) {
                resData[i] = {};
                resData[i].mnu_prfle_id = prfmnuitmrsults[i].mnu_prfle_id;
                resData[i].mnu_prfle_nm = prfmnuitmrsults[i].mnu_prfle_nm;
                resData[i].crtd_usr_nm = prfmnuitmrsults[i].crtd_usr_nm;
                resData[i].crtd_tmstmp = prfmnuitmrsults[i].crtd_tmstmp;
                resData[i].upd_usr_nm = prfmnuitmrsults[i].upd_usr_nm;
                resData[i].upd_tmstmp = prfmnuitmrsults[i].upd_tmstmp;
                resData[i].cmpnt_nm = prfmnuitmrsults[i].cmpnt_nm;
                resData[i].cmpnt_id = prfmnuitmrsults[i].cmpnt_id;
                resData[i].prfle_dscrn_tx = prfmnuitmrsults[i].prfle_dscrn_tx;
                resData[i].menuItms = jsonUtils.groupJsonByKey(prfmnuitmrsults[i].menuItms, ['prnt_mnu_itm_id', 'prnt_mnu_itm_nm'], ['mnu_itm_id', 'mnu_itm_nm', 'mnu_itm_icn_tx', 'a_in'], "mnuitemList", 'prnt_mnu_itm_id', 'prnt_mnu_itm_id', 'asc')
            }
            var prfmenuitems =
            {
                // result: result,
                // mnuitems: prfmnuitmrsults,
                mnuitems: resData,
                mnuresults: result
            };

            df.formatSucessRes(req, res, prfmenuitems, cntxtDtls, fnm, {});
        }).catch(function (error) {
            console.log(error)
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

// /**************************************************************************************
// * Controller     : getrptprflstCtrl
// * Parameters     : req,res()
// * Description    : Select Report profile Data
// * Change History :
// *
// ***************************************************************************************/
// exports.getrptprflstCtrl = function (req, res) {
//     var fnm = "getrptprflstCtrl";
//     log.info(`In ${fnm}`, 0, cntxtDtls);

//     // Model gets called Here
//     // console.log(req.user)

//     usrmngtmdl.getrptprflstMdl(req.user)
//         .then(function (results) {

//             var common_feilds = ['mnu_prfle_id', 'mnu_prfle_nm'];
//             var arrFeilds = ['rpt_grp_id', 'rpt_grp_nm', 'rpt_id', 'rpt_nm', 'a_in'];
//             var arrName = 'reportgrpItms';
//             var groupByKey = 'mnu_prfle_id';
//             var sortKey = 'mnu_prfle_id';
//             var reportgroupitems = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");

//             var resData = []
//             for (let i = 0; i < reportgroupitems.length; i++) {
//                 resData[i] = {};
//                 resData[i].mnu_prfle_id = reportgroupitems[i].mnu_prfle_id;
//                 resData[i].mnu_prfle_nm = reportgroupitems[i].mnu_prfle_nm;
//                 resData[i].reportops = jsonUtils.groupJsonByKey(reportgroupitems[i].reportgrpItms, ['rpt_grp_id', 'rpt_grp_nm'], ['rpt_id', 'rpt_nm', 'a_in'], "reportitemList", 'rpt_grp_id', 'rpt_grp_id', 'asc')
//             }
//             var prfmenusetupitems =
//             {
//                 // result: result,
//                 // mnuitems: prfmnuitmrsults,
//                 reportitems: resData,
//                 reportresults: results
//             };

//             // console.log(prfmenusetupitems)
//             df.formatSucessRes(req, res, prfmenusetupitems, cntxtDtls, fnm, {});
//         }).catch(function (error) {
//             console.log(error)
//             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});

//         });

// }


/**************************************************************************************
* Controller     : addNewUserCtrl
* Parameters     : req,res()
* Description    : Insert User Data
* Change History :
*
***************************************************************************************/
exports.addNewUserCtrl = function (req, res) {
    var fnm = "addNewUserCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // console.log(req.body.data.img_data.length)
    // console.log(req.body.data)
    // Model gets called Here
    let dta = []
    if (req.body.data.img_data != undefined) {
        dta.push(req.body.data.img_data)

        attUtil.uploadToS3(dta, 'wetrackon/image_upload', (err, attChres) => {
            if (!err) {
                // console.log(attChres[0].Location)
                let data = []
                data.push({
                    frntdata: req.body,
                    imgs3: attChres[0].Location,
                })
                var rolesdata = req.body.data.roles_data;
                // console.log("controller");
                // console.log(data);
                // console.log("controller");
                // console.log(frntdata);
                // return;
                usrmngtmdl.insusrMdl(data, req.user)
                    .then(function (result) {
                        if (result) {
                            if (data[0].frntdata.data.mnuPrfle != null) {
                                usrmngtmdl.asgnMnuPrfleMdl(data[0].frntdata.data.mnuPrfle, mrchtUsr, req.user)
                                    .then(function (result) {
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });

                            } if (data[0].frntdata.data.stpPrfle != null) {
                                // if (data[0].frntdata.data.stpPrfle != "") {
                                usrmngtmdl.asgnSetupPrfleMdl(data[0].frntdata.data.stpPrfle, mrchtUsr, req.user)
                                    .then(function (result) {
                                        // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });
                            } if (data[0].frntdata.data.rptPrfle != null) {
                                usrmngtmdl.asgnReportPrfleMdl(data[0].frntdata.data.rptPrfle, mrchtUsr, req.user)
                                    .then(function (result) {
                                        // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });
                            } if (req.body.data.roles_data.length > 0) {
                                console.log(mrchtUsr);
                                usrmngtmdl.asgnrleusrMdl(mrchtUsr, req.body.data, req.user)
                                    .then(function (result) {
                                        // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });
                            }


                        }
                        df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        })
    }
    else {
        let data = []
        data.push({
            frntdata: req.body,
            imgs3: "",
            chck_usr_in: 1
        })
        console.log(data);
        // return;
        var rolesdata = req.body.data.roles_data;
        var payload = req.body;
        var count = 0;
        // console.log("req.body.data.roles_data.length")
        // console.log(req.body.data.roles_data.length)
        // console.log("req.body")
        // console.log(req.body.data)
        // console.log("req.body")
        // var rolesdata = req.body.data.roles_data;
        // console.log(data)
        // console.log(data[0].frntdata)
        // console.log(data[0].frntdata.data.mnuPrfle)
        // console.log("data[0].frntdata.roles_data.length")
        // console.log(rolesdata)
        // console.log(rolesdata.length)
        // return;

        usrmngtmdl.getusrlistMdl(data, req.user)
            .then(function (result) {
                if (result.length) {
                    // console.log(result);
                    df.formatSucessRes(req, res, "Username Already Exists", cntxtDtls, fnm, {});
                } else {
                    if (data[0].frntdata.data.onbrd_in == 1) {
                        let pwdtxt = dbutil.makeRandomPassword()
                        data[0].frntdata.data.password = pwdtxt
                        // console.log(data[0].frntdata.data);
                    }
                    // return;
                    // console.log(result)
                    usrmngtmdl.insusrMdl(data, req.user)
                        .then(function (usrresult) {
                            console.log(usrresult.insertId);
                            if (usrresult) {
                                // return;
                                var insertedid = usrresult.insertId;
                                var mrchtUsr = [];
                                mrchtUsr['mrcht_usr_id'] = insertedid;
                                usrmngtmdl.usrMrchtRelMdl(insertedid, req.user)
                                    .then(function (result) {
                                        // console.log(result)
                                        if (result) {
                                            if (data[0].frntdata.data.onbrd_in == 1) {

                                                if (data[0].frntdata.data.agnt_Typ == 1) {
                                                    console.log("in lmo")
                                                    operationsUtils.record('lmo_cretn_ct') 
                                                } else {
                                                    console.log("in mso")
                                                    operationsUtils.record('mso_cretn_ct') 
                                                }
                                                // usrresult['username'] = data[0].frntdata.data.agnt_Cd;
                                                // usrresult['email'] = data[0].frntdata.data.officeAddress.ofce_email;
                                                const mailOptions = {
                                                    to: data[0].frntdata.data.officeAddress.ofce_email, // list of receivers
                                                    subject: 'APSFL UserName and Password' // Subject line
                                                };
                                                // console.log(mailOptions);
                                                // var count = 0;
                                                // The user subscribed to the newsletter.
                                                mailOptions.html = `<table cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td align="center" valign="top" width="640" class="m_9089412924928323771bodywrap"><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td><td width="600" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;text-align: center;padding: 20px 0 10px; border-bottom: 3px solid #3F51B5"> <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHqQ6I1ukGFqULN6f5m_GollEgpCExjqGumP9uXUkIejc_YsZ3' width="160" height="50" alt="APSFLs" border="0" class="CToWUd"></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" align="right" valign="middle" style="color:#3d3d3d;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;7px 0 12px;"><p> <span class="m_9089412924928323771mobileBlock"> <strong>Attention:</strong> Your account was created or modified. Retrieve your username and password. </span> </p></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><h3 style="color:#000000;font-family:'Segoe UI Light','Segoe UI',Arial,sans-serif;font-size:38px;font-weight:100;line-height:38px;margin-bottom:12px;padding:0" class="m_9089412924928323771h1Header"> Your account has been created or modified..</h3></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td><td width="600" align="left" valign="top" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:16px;padding:0 0 30px"><p> The following contains username and password.</p><p> Please note:</p><ul></ul><p> <strong>User Name: </strong> <a target="_blank">${data[0].frntdata.data.agnt_Cd}</a> <br> <strong>Password: </strong> <a style="color:#000;text-decoration:none">${data[0].frntdata.data.password}</a></p><p> Once you have successfully signed in with your username and password, you can change your password by following the instructions on the sign in page.</p><p> Go to the sign-in page, <a href="http://202.53.92.35" style="color:#0044cc" target="_blank" data-saferedirecturl="http://202.53.92.35">http://202.53.92.35</a></p><p> Thank you for using APSFL.</p><p> Sincerely, <br>The APSFL Support Team</p></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:20px 0"><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0">&nbsp;</td><td width="460" colspan="2" align="left" valign="bottom" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;line-height:16px;padding:0" class="m_9089412924928323771mobileBlock"><p> This message was sent from an unmonitored e-mail address. Please do not reply to this message.<a href="" title="" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl=""></a><br> <a href="" title="Privacy" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl="">Privacy</a> | <a href="" title="Legal" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl="">Legal</a></p></td><td width="40" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0" class="m_9089412924928323771mobileHidden">&nbsp;</td><td width="100" align="left" valign="bottom" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;line-height:16px;padding:0" class="m_9089412924928323771mobileBlock"><p> <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHqQ6I1ukGFqULN6f5m_GollEgpCExjqGumP9uXUkIejc_YsZ3' width="100" height="22" alt="Smart Cards" border="0" class="CToWUd"></p></td><td width="20" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>
`;
                                                // mailOptions.html = `<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" align="right" valign="middle" style="color:#3d3d3d;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;7px 0 12px;"><p> <span class="m_9089412924928323771mobileBlock"> <strong>Attention:</strong> Your account was created or modified. Retrieve your username and password. </span> </p></td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><h1 style="color:#000000;font-family:'Segoe UI Light','Segoe UI',Arial,sans-serif;font-size:38px;font-weight:100;line-height:38px;margin-bottom:12px;padding:0" class="m_9089412924928323771h1Header"> Your account has been created or modified..</h1></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td></tr></tbody></table><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td><td width="600" align="left" valign="top" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:16px;padding:0 0 30px"><p> The following contains username and password.</p><p> Please note:</p><ul></ul><p> <strong>User Name: </strong> <a target="_blank">${data[0].frntdata.data.agnt_Cd}</a> <br> <strong>Password: </strong> <a style="color:#000;text-decoration:none">${data[0].frntdata.data.officeAddress.ofce_mble_Nu}</a></p><p> Once you have successfully signed in with your username and password, you can change your password by following the instructions on the sign in page.</p><p> Go to the sign-in page, <a href="http://localhost:4901/login#/" style="color:#0044cc" target="_blank" data-saferedirecturl="http://localhost:4901/login#/">http://localhost:4901/login#/</a></p><p> Thank you for using APSFL.</p><p> Sincerely, <br>The APSFL Support Team</p></td><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0 0 30px">&nbsp;</td></tr></tbody></table>`;

                                                mailUtls.sendMail(mailOptions, function (err, response) {
                                                    count++;
                                                    if (count == payload.length) {
                                                        // console.log(response);
                                                        // return df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                                    }
                                                    // console.log('err');
                                                    // if (err) {
                                                    //     console.log(err);
                                                    // } else if (response) {
                                                    //     console.log(response);
                                                    //     return df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                                                    // }
                                                    // console.log('response');
                                                })
                                                // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                            } else {
                                                if (data[0].frntdata.data.mnuPrfle != null) {
                                                    usrmngtmdl.asgnMnuPrfleMdl(data[0].frntdata.data.mnuPrfle, mrchtUsr, req.user)
                                                        .then(function (result) {
                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                        });

                                                } if (data[0].frntdata.data.stpPrfle != null) {
                                                    // if (data[0].frntdata.data.stpPrfle != "") {
                                                    usrmngtmdl.asgnSetupPrfleMdl(data[0].frntdata.data.stpPrfle, mrchtUsr, req.user)
                                                        .then(function (result) {
                                                            // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                        });
                                                } if (data[0].frntdata.data.rptPrfle != null) {
                                                    usrmngtmdl.asgnReportPrfleMdl(data[0].frntdata.data.rptPrfle, mrchtUsr, req.user)
                                                        .then(function (result) {
                                                            // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                        });
                                                } if (req.body.data.roles_data.length > 0) {
                                                    console.log(mrchtUsr);
                                                    usrmngtmdl.asgnrleusrMdl(mrchtUsr, req.body.data, req.user)
                                                        .then(function (result) {
                                                            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                                        });
                                                }

                                            }
                                        }

                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });

                            }
                            df.formatSucessRes(req, res, usrresult, cntxtDtls, fnm, {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });

                }
            })
            .catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });


    }
}



/**************************************************************************************
* Controller     : getoptionsCtrl
* Parameters     : req,res()
* Description    : Get Menu Options Data
* Change History :
*
***************************************************************************************/
exports.getoptionsCtrl = function (req, res) {
    var fnm = "getoptionsCtrl";
    var cmpnt_id = req.params.cmpnt_id
    log.info(`In ${fnm}`, 0, cntxtDtls);
    usrmngtmdl.getoptionsMdl(cmpnt_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : insmnuprofileCtrl
* Parameters     : req,res()
* Description    : Insert Menu Profile and Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.insmnuprofileCtrl = function (req, res) {
    var fnm = "insmnuprofileCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getPrflMdl(req.body.data, 'MNP', req.user)
        .then(function (Prflresult) {
            if (Prflresult && Prflresult.length > 0) {
                df.formatSucessRes(req, res, 'Already Profile Exit', cntxtDtls, fnm, {});
            } else {
                usrmngtmdl.insmnuprofileMdl(req.body, req.user)
                    .then(function (result) {
                        if (result) {
                            if (req.body.data.mnuOpts.length >= 1) {
                                var insertedprfid = result.insertId
                                usrmngtmdl.insmnuprfitmMdl(insertedprfid, req.body.data, req.user)
                                    .then(function (result) {
                                        df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                    });
                            } else {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            }
                        }
                        // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        });
}

/**************************************************************************************
* Controller     : asgnMnuPrfleCtrl
* Parameters     : req,res()
* Description    : Insert User Menu Profile Relation Data
* Change History :
*
***************************************************************************************/
exports.asgnMnuPrfleCtrl = function (req, res) {
    var fnm = "asgnMnuPrfleCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // console.log("===========================");
    // console.log(req.body.data)
    // console.log("===========================");
    var ct = 0;

    function userPrfleAsgnFn(mnuPrfleData, usrData, user) {
        // console.log("(((((((((((((((((((((((((((((((((((((");
        // console.log(mnuPrfleData);
        // console.log(usrData);
        // console.log(user);
        // console.log(")))))))))))))))))))))))))))))))))))))))");

        usrmngtmdl.selectMnuuserMdl(usrData,user)
            .then(function (result) {
                // console.log("-----------------------------------------------");
                // console.log(result);
                // console.log(result.length);
                // console.log(usrData);
                // console.log("-----------------------------------------------");

                if (result.length == 1) {
                    usrmngtmdl.updMnuPrfleMdl(mnuPrfleData.mnu_prfle_id, usrData, user)
                        .then(function (result) {
                            // console.log(result);
                            // console.log(mnuPrfleData.usersLst.length);
                            ct++;
                            if (ct >= mnuPrfleData.usersLst.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                userPrfleAsgnFn(req.body.data, req.body.data.usersLst[ct], req.user);
                            }
                            // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                } else if (result.length == 0) {
                    // console.log("=======================");
                    // console.log(usrData);
                    // console.log("=======================");
                    usrmngtmdl.asgnMnuPrfleMdl(mnuPrfleData.mnu_prfle_id, usrData, user)
                        .then(function (result) {
                            // console.log("---------------------assigned res--------------------------");
                            // console.log(result);
                            // console.log(usrData.length);
                            // console.log("----------------------assigned res-------------------------");
                            ct++;
                            if (ct >= mnuPrfleData.usersLst.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                userPrfleAsgnFn(req.body.data, req.body.data.usersLst[ct], req.user);
                            }
                            // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }
            })
    }
    userPrfleAsgnFn(req.body.data, req.body.data.usersLst[ct], req.user);
}

/**************************************************************************************
* Controller     : inssetupprfCtrl
* Parameters     : req,res()
* Description    : Insert User Setup Profile Relation Data
* Change History :
*
***************************************************************************************/
exports.inssetupprfCtrl = function (req, res) {
    var fnm = "inssetupprfCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;

    function userPrfleAsgnFn(mnuPrfleData, usrData, user) {
        // console.log("(((((((((((((((((((((((((((((((((((((");
        // console.log(mnuPrfleData);
        // console.log(usrData);
        // console.log(user);
        // console.log(")))))))))))))))))))))))))))))))))))))))");

        usrmngtmdl.selectSetupserMdl(usrData,user)
            .then(function (result) {
                // console.log("-----------------------------------------------");
                // console.log(result);
                // console.log(result.length);
                // console.log(usrData);
                // console.log("-----------------------------------------------");

                if (result.length == 1) {
                    usrmngtmdl.updSetupPrfleMdl(mnuPrfleData.stp_prfle_id, usrData, user)
                        .then(function (result) {
                            // console.log(result);
                            // console.log(mnuPrfleData.usersLst.length);
                            ct++;
                            if (ct >= mnuPrfleData.usersLst.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                userPrfleAsgnFn(req.body.data, req.body.data.usersLst[ct], req.user);
                            }
                            // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                } else if (result.length == 0) {
                    // console.log("=======================");
                    // console.log(usrData);
                    // console.log("=======================");
                    usrmngtmdl.asgnSetupPrfleMdl(mnuPrfleData.stp_prfle_id, usrData, user)
                        .then(function (result) {
                            // console.log("---------------------assigned res--------------------------");
                            // console.log(result);
                            // console.log(usrData.length);
                            // console.log("----------------------assigned res-------------------------");
                            ct++;
                            if (ct >= mnuPrfleData.usersLst.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                userPrfleAsgnFn(req.body.data, req.body.data.usersLst[ct], req.user);
                            }
                            // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }
            })
    }
    userPrfleAsgnFn(req.body.data, req.body.data.usersLst[ct], req.user);

}

/**************************************************************************************
* Controller     : updusrprfCtrl
* Parameters     : req,res()
* Description    : Update User Profile Relation Data
* Change History :
*
***************************************************************************************/
exports.updusrprfCtrl = function (req, res) {
    var fnm = "updusrprfCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    usrmngtmdl.updusrprfMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updmnuprofileCtrl
* Parameters     : req,res()
* Description    : Update Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.updmnuprofileCtrl = function (req, res) {
    var fnm = "updmnuprofileCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    var menuOptionLength = req.body.data.mnuOpts

    // return;
    // var ct = 0;
    // var setupOptionLength = req.body.data.setupOpts

    function mnuPrfleAsgnFn(menuOption, mnuOptsData, user) {

        usrmngtmdl.selectProfileMdl(req.body.data, mnuOptsData,user)
            .then(function (result) {

                if (result.length == 1) {

                    usrmngtmdl.updmnuprofileMdl(mnuOptsData, user)
                        .then(function (result) {
                            ct++;
                            if (ct >= req.body.data.mnuOpts.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                mnuPrfleAsgnFn(menuOptionLength[ct], req.body.data.mnuOpts[ct], req.user);
                            }
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                } else if (result.length == 0) {

                    usrmngtmdl.insmnuprfitmMdl(req.body.data.mnu_prfle_id, mnuOptsData, user)
                        .then(function (result) {
                            ct++;
                            if (ct >= menuOption.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                mnuPrfleAsgnFn(menuOptionLength[ct], req.body.data.mnuOpts[ct], req.user);
                            }

                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }
                // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
            })
    }
    mnuPrfleAsgnFn(menuOptionLength[ct], req.body.data.mnuOpts[ct], req.user);

    // for (i = 0; i < req.body.data.mnuOpts.length; i++) {
    //     console.log(req.body.data.mnuOpts[i])
    //     var menuOptions = req.body.data.mnuOpts[i]

    //     usrmngtmdl.selectProfileMdl(req.body.data, req.body.data.mnuOpts[i])
    //         .then(function (result) {
    //             console.log(result.length)

    //             if (result.length > 0) {
    //                 // if (req.body.data.mnuOpts[i]) {
    //                 // console.log(menuOptions)
    //                 console.log("update")
    //                 // return;
    //                 usrmngtmdl.updmnuprofileMdl(menuOptions, req.user)
    //                     .then(function (result) {
    //                         df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //                     }).catch(function (error) {
    //                         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //                     });
    //                 // }
    //             } else {
    //                 console.log("Insert")
    //                 // console.log(req.body.data.mnuOpts[i])
    //                 // console.log(req.body.data)
    //                 // return;
    //                 // console.log(req.body.data)
    //                 usrmngtmdl.insmnuprfitmMdl(req.body.data.mnu_prfle_id, req.body.data, req.user)
    //                     .then(function (result) {
    //                         df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //                     }).catch(function (error) {
    //                         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //                     });
    //             }

    //             // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //         }).catch(function (error) {
    //             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //         });
    //     // return;

    //     // if (req.body.data.mnuOpts[i]) {
    //     //     // console.log(req.body.data.mnuOpts[i])
    //     //     usrmngtmdl.updmnuprofileMdl(req.body.data.mnuOpts[i], req.user)
    //     //         .then(function (result) {
    //     //             df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //     //         }).catch(function (error) {
    //     //             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //     //         });
    //     // }
    // }
}

/**************************************************************************************
* Controller     : delmnuprofileCtrl
* Parameters     : req,res()
* Description    : Delete Profile
* Change History :
*
***************************************************************************************/
exports.delmnuprofileCtrl = function (req, res) {
    var fnm = "delmnuprofileCtrl";
    var prfle_id = req.params.prfle_id
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.delmnuprofileMdl(prfle_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updsetupprofileCtrl
* Parameters     : req,res()
* Description    : Update Setup Item Relation Data
* Change History :
*
***************************************************************************************/
exports.updsetupprofileCtrl = function (req, res) {
    var fnm = "updsetupprofileCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ct = 0;
    var setupOptionLength = req.body.data.setupOpts
    // console.log(req.body)

    // for (i = 0; i < req.body.data.setupOpts.length; i++) {
    //     var setupOptions = req.body.data.setupOpts[i];
    //     usrmngtmdl.selectStpProfileMdl(req.body.data.setupOpts[i])
    //         .then(function (result) {
    //             if (result.length > 0) {
    //                 console.log("update")
    //                 // return;
    //                 // if (req.body.data.setupOpts[i]) {
    //                 usrmngtmdl.updsetupprofileMdl(setupOptions, req.user)
    //                     .then(function (result) {
    //                         df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //                     }).catch(function (error) {
    //                         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //                     });
    //             } else {
    //                 console.log(req.body.data);
    //                 console.log(setupOptions.stp_prfle_id)
    //                 console.log("Insert")
    //                 var setupInsert = {
    //                     set_optn_id: req.body.data
    //                 }
    //                 console.log(setupInsert)
    //                 // return;
    //                 usrmngtmdl.setMnuItmRlMdl(req.user, setupOptions.stp_prfle_id, setupInsert)
    //                     .then(function (itmResult) {
    //                         df.formatSucessRes(req, res, itmResult, cntxtDtls, fnm, {});
    //                     }).catch(function (error) {
    //                         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //                     });
    //             }
    //             // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //         }).catch(function (error) {
    //             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //         });
    //     // if (req.body.data.setupOpts[i]) {
    //     //     usrmngtmdl.updsetupprofileMdl(req.body.data.setupOpts[i], req.user)
    //     //         .then(function (result) {
    //     //             df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //     //         }).catch(function (error) {
    //     //             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //     //         });
    //     // }

    // }
    function stpPrfleAsgnFn(setupOption, stpOptsData, user) {
        // console.log(stpOptsData)

        // var setupOptions = req.body.data.setupOpts[i];
        usrmngtmdl.selectStpProfileMdl(stpOptsData,user)
            .then(function (result) {
                // console.log(stpOptsData.length)

                if (result.length == 1) {
                    // console.log("update")
                    // return;
                    // if (req.body.data.setupOpts[i]) {
                    usrmngtmdl.updsetupprofileMdl(stpOptsData, req.user)
                        .then(function (result) {
                            // console.log(req.body.data.setupOpts.length,ct);
                            ct++;
                            // console.log(ct);
                            if (ct >= req.body.data.setupOpts.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                stpPrfleAsgnFn(setupOptionLength[ct], req.body.data.setupOpts[ct], req.user);
                            }
                            // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                } else if (result.length == 0) {
                    // console.log(req.body.data);
                    // console.log(setupOptions.stp_prfle_id)
                    // console.log("Insert")
                    // var setupInsert = {
                    //     set_optn_id: mnuPrfleData
                    // }
                    // console.log(setupOption)
                    // return;
                    usrmngtmdl.setMnuItmRlMdl(req.user, stpOptsData.stp_prfle_id, setupOption)
                        .then(function (result) {
                            ct++;
                            if (ct >= setupOption.length) {
                                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                            } else {
                                stpPrfleAsgnFn(setupOptionLength[ct], req.body.data.setupOpts[ct], req.user);
                            }
                            // df.formatSucessRes(req, res, itmResult, cntxtDtls, fnm, {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                }
                // df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
            })
    }
    stpPrfleAsgnFn(setupOptionLength[ct], req.body.data.setupOpts[ct], req.user);
}


// /**************************************************************************************
// * Controller     : updreportprofileCtrl
// * Parameters     : req,res()
// * Description    : Update Report Profile Relation Data
// * Change History :
// *
// ***************************************************************************************/
// exports.updreportprofileCtrl = function (req, res) {
//     var fnm = "updreportprofileCtrl";
//     log.info(`In ${fnm}`, 0, cntxtDtls);
//     // console.log(req.body)
//     for (i = 0; i < req.body.data.rptOpts.length; i++) {
//         // console.log("==============================")
//         // console.log(req.body.data.rptOpts[i])
//         // console.log("==============================")
//         if (req.body.data.rptOpts[i]) {
//             // console.log(req.body.data.mnuOpts[i])
//             usrmngtmdl.updreportprofileMdl(req.body.data.rptOpts[i])
//                 .then(function (result) {
//                     df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
//                 }).catch(function (error) {
//                     df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//                 });
//         }
//     }
// }

/**************************************************************************************
* Controller     : insSteCtrl
* Parameters     : req,res()
* Description    : Update Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.insSteCtrl = function (req, res) {
    var fnm = "insSteCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    usrmngtmdl.getstatesMdl(req.body.data,req.user)
        .then(function (slctresult) {
            if (slctresult.length) {
                df.formatSucessRes(req, res, 'State Already Exit', cntxtDtls, fnm, {});
            } else {
                usrmngtmdl.insSteMdl(req.body.data, req.user)
                    .then(function (result) {
                        df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getstatesCtrl
* Parameters     : req,res()
* Description    : Update Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.getstatesCtrl = function (req, res) {
    var fnm = "getstatesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log('In States')
    // Model gets called Here
    usrmngtmdl.getstatesMdl(req.body.data,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : updateStateCtrl
* Parameters     : req,res()
* Description    : Update Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.updateStateCtrl = function (req, res) {
    var fnm = "updateStateCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log('In States')
    // Model gets called Here
    usrmngtmdl.updateStateMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : deleteStateCtrl
* Parameters     : req,res()
* Description    : Update Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.deleteStateCtrl = function (req, res) {
    var fnm = "deleteStateCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var ste_id = req.params.ste_id
    // console.log(req.user)
    // Model gets called Here
    usrmngtmdl.deleteStateMdl(ste_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getDstrctsCtrl
* Parameters     : req,res()
* Description    : Update Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.getDstrctsCtrl = function (req, res) {
    var fnm = "getDstrctsCtrl";
    // log.info(`In ${fnm}`, 0, cntxtDtls);
    var ste_id = req.params.ste_id;
    // Model gets called Here
    usrmngtmdl.getDstrctsMdl(ste_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : insDstrctsCtrl
* Parameters     : req,res()
* Description    : Update Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.insDstrctsCtrl = function (req, res) {
    var fnm = "insDstrctsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.insDstrctsMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updateDstrctsCtrl
* Parameters     : req,res()
* Description    : Update Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.updateDstrctsCtrl = function (req, res) {
    var fnm = "updateDstrctsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.updateDstrctsMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : delDstrctsCtrl
* Parameters     : req,res()
* Description    : Update Menu Item Relation Data
* Change History :
*
***************************************************************************************/
exports.delDstrctsCtrl = function (req, res) {
    var fnm = "delDstrctsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var dstrt_id = req.params.dstrt_id
    // Model gets called Here
    usrmngtmdl.delDstrctsMdl(dstrt_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : upduserCtrl
* Parameters     : req,res()
* Description    : Update User Data
* Change History :
*
***************************************************************************************/
exports.upduserCtrl = function (req, res) {
    var fnm = "upduserCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here

    if (req.body.data.image && req.body.data.image != undefined) {
        attUtil.uploadToS3([req.body.data.image], 'wetrackon/image_upload', (err, attChres) => {
            if (!err) {
                usrmngtmdl.upduserMdl(req.body.data, req.user, req.body.data.mrcht_usr_id, attChres[0].Location)
                    .then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        })
    } else {
        console.log("Else condition")
        usrmngtmdl.upduserMdl(req.body.data, req.user, req.body.data.mrcht_usr_id, null)
            .then(function (result) {
                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }
}


/**************************************************************************************
* Controller     : loginfoCtrl
* Parameters     : req,res()
* Description    : Get User Login Info
* Change History :
*
***************************************************************************************/
exports.loginfoCtrl = function (req, res) {
    var fnm = "loginfoCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.loginfoMdl(req.body.data, req.user)
        .then(function (results) {
            let res_data = [];
            getLgnCnt = (value) => {
                let cnt = 0;
                value.filter((k) => {
                    if (k.lst_lgn_ts) {
                        ++cnt;
                    }
                });
                return cnt;
            }

            getLstLgnTm = (value) => {
                let ts = value
                value.filter((k) => {
                    if (k.lst_lgn_ts) {
                        k.lgn_sts = 'Logged';
                    }
                    else {
                        k.lgn_sts = 'Not Logged In';
                    }
                })
                return ts[0].lst_lgn_ts != null ? ts[0].lst_lgn_ts : null
            }

            _.forIn(_.groupBy(results, 'mrcht_usr_id'), (value, key) => {
                res_data.push({

                    mrcht_usr_id: value[0].mrcht_usr_id,
                    sts_cd: value[0].sts_cd,
                    fst_nm: value[0].fst_nm,
                    mrcht_usr_nm: value[0].mrcht_usr_nm,
                    mbl_nu: value[0].mbl_nu,
                    app_typ: value[0].app_typ,
                    lgn_dtls: value,
                    lgn_cnt: getLgnCnt(value),
                    lst_lgn_ts: getLstLgnTm(value),
                    lgn_sts: getLgnCnt(value) == 0 ? 'Not Logged In' : 'Logged'
                })
            })

            df.formatSucessRes(req, res, res_data, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : deluserCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.deluserCtrl = function (req, res) {
    var fnm = "deluserCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var usr_id = req.params.usr_id
    // Model gets called Here
    usrmngtmdl.deluserMdl(usr_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : delprofileCtrl
* Parameters     : req,res()
* Description    : Delete profile Data
* Change History :
*
***************************************************************************************/
exports.delprofileCtrl = function (req, res) {
    var fnm = "delprofileCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var prf_id = req.params.prf_id
    // Model gets called Here
    usrmngtmdl.delprofileMdl(prf_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : insMndlsCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.insMndlsCtrl = function (req, res) {
    var fnm = "insMndlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.insMndlsMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getMndlsCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.getMndlsCtrl = function (req, res) {
    var fnm = "getMndlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var dstrct_id = req.params.dstrct_id
    // Model gets called Here
    usrmngtmdl.getMndlsMdl(dstrct_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : updateMndlsCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.updateMndlsCtrl = function (req, res) {
    var fnm = "updateMndlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.updateMndlsMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : delMndlsCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.delMndlsCtrl = function (req, res) {
    var fnm = "delMndlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var mndl_id = req.params.mndl_id
    // Model gets called Here
    usrmngtmdl.delMndlsMdl(mndl_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getvlgsCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.getvlgsCtrl = function (req, res) {
    var fnm = "getvlgsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // var mndl_id = req.params.mndl_id
    // Model gets called Here
    usrmngtmdl.getvlgsMdl(req.params.mndl_id , req.params.dstrct_id,req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : insvlgsCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.insvlgsCtrl = function (req, res) {
    var fnm = "insvlgsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // var mndl_id = req.params.mndl_id
    // Model gets called Here
    usrmngtmdl.insvlgsMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : updatevlgsCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.updatevlgsCtrl = function (req, res) {
    var fnm = "updatevlgsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // var mndl_id = req.params.mndl_id
    // Model gets called Here
    usrmngtmdl.updatevlgsMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : delvlgsCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.delvlgsCtrl = function (req, res) {
    var fnm = "delvlgsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var vlg_id = req.params.vlg_id
    // Model gets called Here
    usrmngtmdl.delvlgsMdl(vlg_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : getCitiesCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.getCitiesCtrl = function (req, res) {
    var fnm = "getCitiesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.getCitiesMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : insCityCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.insCityCtrl = function (req, res) {
    var fnm = "insCityCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.insCityMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}


/**************************************************************************************
* Controller     : UpdateCityCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.UpdateCityCtrl = function (req, res) {
    var fnm = "UpdateCityCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.UpdateCityMdl(req.body.data, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}



/**************************************************************************************
* Controller     : delCityCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.delCityCtrl = function (req, res) {
    var fnm = "delCityCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var cty_id = req.params.cty_id
    // Model gets called Here
    usrmngtmdl.delCityMdl(cty_id, req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : setupPrflCrteCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.setupPrflCrteCtrl = function (req, res) {
    var fnm = "setupPrflCrteCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // console.log(req.body.data)
    // return;
    usrmngtmdl.getPrflMdl(req.body.data, 'STP', req.user)
        .then(function (Prflresult) {
            if (Prflresult && Prflresult.length > 0) {
                df.formatSucessRes(req, res, 'Already Profile Exit', cntxtDtls, fnm, {});
            } else {
                usrmngtmdl.setupPrflCrteMdl(req.user, req.body.data)
                    .then(function (result) {
                        if (result) {
                            var ct = 0;
                            var instrdPrfleId = result.insertId;
                            // console.log(ct);
                            var setupOptionLength = req.body.data.set_optn_id.setupOpts

                            function stpPrfleAsgnFn(user, insert_id, mnuPrfleData) {
                                // var setupInsert = {
                                // set_optn_id: mnuPrfleData
                                // }
                                // console.log(insert_id)
                                // console.log(mnuPrfleData)
                                // console.log(setupOptionLength.length)
                                // console.log(ct);

                                // return;
                                usrmngtmdl.setMnuItmRlMdl(user, insert_id, mnuPrfleData)
                                    .then(function (stpOptsResult) {
                                        ct++;
                                        if (ct >= setupOptionLength.length) {
                                            df.formatSucessRes(req, res, stpOptsResult, cntxtDtls, fnm, {});
                                        } else {
                                            stpPrfleAsgnFn(req.user, instrdPrfleId, setupOptionLength[ct]);
                                        }
                                        // df.formatSucessRes(req, res, itmResult, cntxtDtls, fnm, {});
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                        // console.log(error);
                                    });
                            }
                            stpPrfleAsgnFn(req.user, instrdPrfleId, setupOptionLength[ct]);

                            // usrmngtmdl.setMnuItmRlMdl(req.user, result.insertId, req.body.data)
                            //     .then(function (itmResult) {
                            //         df.formatSucessRes(req, res, itmResult, cntxtDtls, fnm, {});
                            //     }).catch(function (error) {
                            //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                            //     });
                        } else {
                            // console.log("else")
                            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        })

}

/**************************************************************************************
* Controller : getsetupCtrl
* Parameters : req,res()
* Description : Select Setup profile Data
* Change History :
*
***************************************************************************************/
exports.getsetupCtrl = function (req, res) {
    var fnm = "getsetupCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    // console.log(req.user)

    usrmngtmdl.getsetupMdl(req.user)
        .then(function (results) {

            var common_feilds = ['stp_prfle_id', 'prfle_nm', 'crtd_usr_nm', 'crtd_tmstmp', 'upd_usr_nm', 'upd_tmstmp', 'prfle_dscrn_tx'];
            var arrFeilds = ['stp_grp_id', 'stp_grp_nm', 'stp_opt_id', 'stp_opt_nm', 'stp_opt_icn_tx', 'a_in'];
            var arrName = 'setupgrpItms';
            var groupByKey = 'stp_prfle_id';
            var sortKey = 'stp_opt_id';
            var setupgroupitems = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");

            var resData = []
            for (let i = 0; i < setupgroupitems.length; i++) {
                resData[i] = {};
                resData[i].stp_prfle_id = setupgroupitems[i].stp_prfle_id;
                resData[i].stp_prfle_nm = setupgroupitems[i].prfle_nm;
                resData[i].crtd_usr_nm = setupgroupitems[i].crtd_usr_nm;
                resData[i].crtd_tmstmp = setupgroupitems[i].crtd_tmstmp;
                resData[i].upd_usr_nm = setupgroupitems[i].upd_usr_nm;
                resData[i].upd_tmstmp = setupgroupitems[i].upd_tmstmp;
                resData[i].prfle_dscrn_tx = setupgroupitems[i].prfle_dscrn_tx;
                resData[i].setupgroupnames = jsonUtils.groupJsonByKey(setupgroupitems[i].setupgrpItms, ['stp_grp_id', 'stp_grp_nm'], ['stp_opt_id', 'stp_opt_nm', 'stp_opt_icn_tx', 'a_in'], "setupitemList", 'stp_grp_id', 'stp_grp_id', 'asc')
            }
            var prfmenusetupitems =
            {
                // result: result,
                // mnuitems: prfmnuitmrsults,
                setupitems: resData,
                setupresults: results
            };

            // console.log(prfmenusetupitems)
            df.formatSucessRes(req, res, prfmenusetupitems, cntxtDtls, fnm, {});
        }).catch(function (error) {
            console.log(error)
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});

        });

}

/**************************************************************************************
* Controller     : dltstpPrf
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
// exports.dltstpPrf = function (req, res) {
//     var fnm = "delvlgsCtrl";
//     log.info(`In ${fnm}`, 0, cntxtDtls);
//     // Model gets called Here
//     usrmngtmdl.dltstpMdl(req.params.id, req.user)
//         .then(function (result) {
//             df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
//         });
// }

/**************************************************************************************
* Controller     : stpPrflGrpsCtrl
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.stpPrflGrpsCtrl = function (req, res) {
    var fnm = "stpPrflGrpsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.stpPrflGrpsMdl(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getprfItmsLstCtrl
* Parameters     : req,res()
* Change History :
*
***************************************************************************************/
exports.getprfItmsLstCtrl = function (req, res) {
    var fnm = "getprfItmsLstCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    // Model gets called Here
    // console.log(req.user)
    usrmngtmdl.getprfItmsLstMdl(req.user)
        .then(function (result) {
            var common_feilds = ['mnu_prfle_id', 'mnu_prfle_nm', 'crtd_usr_nm', 'crtd_tmstmp', 'udt_usr_nm', 'upd_tmstmp'];
            var arrFeilds = ['mnu_itm_id', 'mnu_itm_nm', 'a_in'];
            var arrName = 'menuItms';
            var groupByKey = 'mnu_prfle_id';
            var sortKey = 'mnu_prfle_id';
            var prfmnuitmrsults = jsonUtils.groupJsonByKey(result, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");

            df.formatSucessRes(req, res, prfmnuitmrsults, cntxtDtls, fnm, {});
        }).catch(function (error) {
            console.log(error)
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : getSetupOptionsCtrl
* Parameters     : req,res()
* Description    : Get Setup Options Data
* Change History :
*
***************************************************************************************/
exports.getSetupOptionsCtrl = function (req, res) {
    var fnm = "getSetupOptionsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    usrmngtmdl.getSetupOptionsMdl(req.user)
        .then(function (result) {

            var common_feilds = ['stp_grp_id', 'stp_grp_nm'];
            var arrFeilds = ['stp_opt_id', 'stp_opt_nm', 'a_in', 'stp_opt_icn_tx', 'stp_grp_id', 'stp_grp_nm'];
            var arrName = 'setupitemList';
            var groupByKey = 'stp_grp_id';
            var sortKey = 'stp_grp_id';
            var reportgroupitems = jsonUtils.groupJsonByKey(result, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");

            df.formatSucessRes(req, res, reportgroupitems, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : updateMyMrchtDtlsCtrl
* Parameters     : req,res()
* Description    : Update Merachant Data
* Change History :
*
***************************************************************************************/
exports.updateMyMrchtDtlsCtrl = function (req, res) {
    var fnm = "updateMyMrchtDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);

    if (req.body.data.imageUrl && req.body.data.imageUrl != undefined) {
        attUtil.uploadToS3([req.body.data.imageUrl], 'wetrackon/image_upload', (err, attChres) => {
            if (!err) {
                usrmngtmdl.updateMyMrchtDtlsMdl(req.body.data, req.user, attChres[0].Location)
                    .then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        })
    } else {
        usrmngtmdl.updateMyMrchtDtlsMdl(req.body.data, req.user, null)
            .then(function (result) {
                df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });
    }

    // Model gets called Here
    // usrmngtmdl.updateMyMrchtDtlsMdl(req.body.data,req.user)
    //     .then(function (result) {
    //         df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
    //     }).catch(function (error) {
    //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
    //     });
}

/**************************************************************************************
* Controller     : bnk_acnt_typ_get
* Parameters     : req,res()
* Description    : Delete User Data
* Change History :
*
***************************************************************************************/
exports.bnk_acnt_typ_get = function (req, res) {
    var fnm = "stpPrflGrpsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    // Model gets called Here
    usrmngtmdl.bnk_acnt_typ_get(req.user)
        .then(function (result) {
            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}