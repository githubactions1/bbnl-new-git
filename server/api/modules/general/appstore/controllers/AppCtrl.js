const AppMdl = require(appRoot + '/server/api/modules/general/appstore/models/AppMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_AppCtrl
* Parameters     : req,res()
* Description    : get details of all Apps
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppCtrl = function (req, res) {

    AppMdl.getAppMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_AppCtrl
* Parameters     : req,res()
* Description    : search details of all Apps
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_AppCtrl = function (req, res) {

    AppMdl.srchAppMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_AppByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Apps
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppByIdCtrl = function (req, res) {

    AppMdl.getAppByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_AppCtrl
* Parameters     : req,res()
* Description    : Add new  Apps
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_AppCtrl = function (req, res) {

    AppMdl.insrtAppMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_AppCtrl
* Parameters     : req,res()
* Description    : Update existing  Apps
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_AppCtrl = function (req, res) {

    AppMdl.updteAppMdl(req.body,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_AppCtrl
* Parameters     : req,res()
* Description    : Delete existing  Apps
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_AppCtrl = function (req, res) {

    AppMdl.dlteAppMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_AppCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_AppCtrl', {});
        });
}