const AppCtgryMdl = require(appRoot + '/server/api/modules/general/appstore/models/AppCtgryMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_AppCtgryCtrl
* Parameters     : req,res()
* Description    : get details of all App Category(s)
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppCtgryCtrl = function (req, res) {

    AppCtgryMdl.getAppCtgryMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : srch_AppCtgryCtrl
* Parameters     : req,res()
* Description    : search details of all App Category(s)
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_AppCtgryCtrl = function (req, res) {

    AppCtgryMdl.srchAppCtgryMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_AppCtgryByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  App Category(s)
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppCtgryByIdCtrl = function (req, res) {

    AppCtgryMdl.getAppCtgryByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_AppCtgryCtrl
* Parameters     : req,res()
* Description    : Add new  App Category(s)
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_AppCtgryCtrl = function (req, res) {

    AppCtgryMdl.insrtAppCtgryMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_AppCtgryCtrl
* Parameters     : req,res()
* Description    : Update existing  App Category(s)
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_AppCtgryCtrl = function (req, res) {

    AppCtgryMdl.updteAppCtgryMdl(req.body,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_AppCtgryCtrl
* Parameters     : req,res()
* Description    : Delete existing  App Category(s)
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_AppCtgryCtrl = function (req, res) {

    AppCtgryMdl.dlteAppCtgryMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_AppCtgryCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_AppCtgryCtrl', {});
        });
}