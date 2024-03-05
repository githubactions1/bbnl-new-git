const SprtPrtyMdl = require(appRoot + '/server/api/modules/support/models/SprtPrtyMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtPrtyCtrl
* Parameters     : req,res()
* Description    : get details of all Priority
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtPrtyCtrl = function (req, res) {

    SprtPrtyMdl.getSprtPrtyMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtPrtyCtrl
* Parameters     : req,res()
* Description    : search details of all Priority
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtPrtyCtrl = function (req, res) {

    SprtPrtyMdl.srchSprtPrtyMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtPrtyByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Priority
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtPrtyByIdCtrl = function (req, res) {

    SprtPrtyMdl.getSprtPrtyByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtPrtyCtrl
* Parameters     : req,res()
* Description    : Add new  Priority
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtPrtyCtrl = function (req, res) {

    SprtPrtyMdl.insrtSprtPrtyMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtPrtyCtrl
* Parameters     : req,res()
* Description    : Update existing  Priority
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtPrtyCtrl = function (req, res) {

    SprtPrtyMdl.updteSprtPrtyMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtPrtyCtrl
* Parameters     : req,res()
* Description    : Delete existing  Priority
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtPrtyCtrl = function (req, res) {

    SprtPrtyMdl.dlteSprtPrtyMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SprtPrtyCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SprtPrtyCtrl', {});
        });
}