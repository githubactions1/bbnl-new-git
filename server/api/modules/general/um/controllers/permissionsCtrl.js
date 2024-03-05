// Standard Inclusions
var log = require(appRoot + '/utils/logmessages');
var df = require(appRoot + '/utils/dflower.utils');
var permissionsMdl = require('../models/permissionsMdl');
let ejs = require('ejs');
var genlib = require(appRoot + '/generators/lib/gen.utils');

var phonePe = require(appRoot + '/utils/upiIntegration');

var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : getPermissionsCntrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getPermissionsCntrl = function (req, res, hndlr) {
    var fnm = "getPermissionsCntrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    actntsMdl.getMrchntAccntMdl(req.params.id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getPermissionsCntrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getRolesCtrl = function (req, res, hndlr) {
    var fnm = "getRolesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    permissionsMdl.getRolesMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getRolesPermByIdCtrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getRolesPermByIdCtrl = function (req, res, hndlr) {
    var fnm = "getRolesPermByIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    permissionsMdl.getRolesPermByIdMdl(req.user, req.params.id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getRolesPermByIdCtrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.instRolesPermByIdCtrl = function (req, res, hndlr) {
    var fnm = "instRolesPermByIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body)
    let permdata = req.body.data[0].standard
    console.log(permdata)
    permissionsMdl.instRolesPermByIdMdl(req.user, permdata)
        .then(function (results) {
            if (results) {
                let spcldata = req.body.data[0].special
                permissionsMdl.instRolesPclPermByIdMdl(req.user, spcldata)
                    .then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function (error) {
                        log.info(error, 0, cntxtDtls);
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    })
            }
        }).catch(function (error) {
            log.info(error, 0, cntxtDtls);
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : instRolesCtrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.instRolesCtrl = function (req, res, hndlr) {
    var fnm = "instRolesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let data = req.body.data
    permissionsMdl.instRolesMdll(req.user, data)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : UpdtRolesCtrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.UpdtRolesCtrl = function (req, res, hndlr) {
    var fnm = "UpdtRolesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let data = req.body.data
    permissionsMdl.UpdtRolesMdl(req.user, req.params.id, data)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : DeletRolesCtrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.DeletRolesCtrl = function (req, res, hndlr) {
    var fnm = "DeletRolesCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    permissionsMdl.DeletRolesMdl(req.user, req.params.id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getRolesSpclPermByIdCtrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getRolesSpclPermByIdCtrl = function (req, res, hndlr) {
    var fnm = "getRolesSpclPermByIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    permissionsMdl.getRolesSpclPermByIdMdl(req.user, req.params.id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

// exports.checkPymntActivity = function () {
//     phonePe.checkPhonepeActivity()
// }


exports.checkPymntActivity = function (req,res){
    phonePe.checkPhonepeActivity(req.body)
    .then(function (results) {
        console.log(results)
        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    }).catch(function (error) {
        console.log(error)
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}


exports.checkPymntRdrctActivity = function (req,res){
    phonePe.checkPhonepeRdrctActivity(req.body)
    .then(function (results) {
        console.log(results)
        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    }).catch(function (error) {
        console.log(error)
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}


exports.checkPymntRefund = function (req,res){
    phonePe.checkPymntRefund(req.body)
    .then(function (results) {
        console.log(results)
        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    }).catch(function (error) {
        console.log(error)
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}

exports.checkWeb = function (req,res){
    phonePe.checkWeb(req.body)
    .then(function (results) {
        console.log(results)
        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    }).catch(function (error) {
        console.log(error)
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}



exports.getPymntTransactionStatus = function (req,res){
    phonePe.getTransactionStatus()
    .then(function (results) {
        console.log(results)
        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    }).catch(function (error) {
        console.log(error)
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}
