const SprtEnvMdl = require(appRoot + '/server/api/modules/support/models/SprtEnvMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtEnvCtrl
* Parameters     : req,res()
* Description    : get details of all Environment
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtEnvCtrl = function (req, res) {

    SprtEnvMdl.getSprtEnvMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtEnvCtrl
* Parameters     : req,res()
* Description    : search details of all Environment
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtEnvCtrl = function (req, res) {

    SprtEnvMdl.srchSprtEnvMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtEnvByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Environment
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtEnvByIdCtrl = function (req, res) {

    SprtEnvMdl.getSprtEnvByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtEnvCtrl
* Parameters     : req,res()
* Description    : Add new  Environment
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtEnvCtrl = function (req, res) {

    SprtEnvMdl.insrtSprtEnvMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtEnvCtrl
* Parameters     : req,res()
* Description    : Update existing  Environment
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtEnvCtrl = function (req, res) {

    SprtEnvMdl.updteSprtEnvMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtEnvCtrl
* Parameters     : req,res()
* Description    : Delete existing  Environment
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtEnvCtrl = function (req, res) {

    SprtEnvMdl.dlteSprtEnvMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SprtEnvCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SprtEnvCtrl', {});
        });
}