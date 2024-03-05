const AppMdleMdl = require(appRoot + '/server/api/modules/general/appstore/models/AppMdleMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_AppMdleCtrl
* Parameters     : req,res()
* Description    : get details of all Modules
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppMdleCtrl = function (req, res) {

    AppMdleMdl.getAppMdleMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_AppMdleCtrl
* Parameters     : req,res()
* Description    : search details of all Modules
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_AppMdleCtrl = function (req, res) {

    AppMdleMdl.srchAppMdleMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_AppMdleByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Modules
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppMdleByIdCtrl = function (req, res) {

    AppMdleMdl.getAppMdleByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_AppMdleCtrl
* Parameters     : req,res()
* Description    : Add new  Modules
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_AppMdleCtrl = function (req, res) {

    AppMdleMdl.insrtAppMdleMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_AppMdleCtrl
* Parameters     : req,res()
* Description    : Update existing  Modules
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_AppMdleCtrl = function (req, res) {

    AppMdleMdl.updteAppMdleMdl(req.body,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_AppMdleCtrl
* Parameters     : req,res()
* Description    : Delete existing  Modules
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_AppMdleCtrl = function (req, res) {

    AppMdleMdl.dlteAppMdleMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_AppMdleCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_AppMdleCtrl', {});
        });
}