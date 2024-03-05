const AppPrpryMdl = require(appRoot + '/server/api/modules/general/appstore/models/AppPrpryMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_AppPrpryCtrl
* Parameters     : req,res()
* Description    : get details of all Module properties
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppPrpryCtrl = function (req, res) {

    AppPrpryMdl.getAppPrpryMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_AppPrpryCtrl
* Parameters     : req,res()
* Description    : search details of all Module properties
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_AppPrpryCtrl = function (req, res) {

    AppPrpryMdl.srchAppPrpryMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_AppPrpryByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Module properties
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppPrpryByIdCtrl = function (req, res) {

    AppPrpryMdl.getAppPrpryByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_AppPrpryCtrl
* Parameters     : req,res()
* Description    : Add new  Module properties
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_AppPrpryCtrl = function (req, res) {

    AppPrpryMdl.insrtAppPrpryMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_AppPrpryCtrl
* Parameters     : req,res()
* Description    : Update existing  Module properties
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_AppPrpryCtrl = function (req, res) {

    AppPrpryMdl.updteAppPrpryMdl(req.body,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_AppPrpryCtrl
* Parameters     : req,res()
* Description    : Delete existing  Module properties
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_AppPrpryCtrl = function (req, res) {

    AppPrpryMdl.dlteAppPrpryMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_AppPrpryCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_AppPrpryCtrl', {});
        });
}