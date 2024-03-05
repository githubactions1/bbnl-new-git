const SprtSvrtyMdl = require(appRoot + '/server/api/modules/support/models/SprtSvrtyMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtSvrtyCtrl
* Parameters     : req,res()
* Description    : get details of all Severity
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtSvrtyCtrl = function (req, res) {

    SprtSvrtyMdl.getSprtSvrtyMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtSvrtyCtrl
* Parameters     : req,res()
* Description    : search details of all Severity
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtSvrtyCtrl = function (req, res) {

    SprtSvrtyMdl.srchSprtSvrtyMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtSvrtyByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Severity
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtSvrtyByIdCtrl = function (req, res) {

    SprtSvrtyMdl.getSprtSvrtyByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtSvrtyCtrl
* Parameters     : req,res()
* Description    : Add new  Severity
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtSvrtyCtrl = function (req, res) {

    SprtSvrtyMdl.insrtSprtSvrtyMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtSvrtyCtrl
* Parameters     : req,res()
* Description    : Update existing  Severity
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtSvrtyCtrl = function (req, res) {

    SprtSvrtyMdl.updteSprtSvrtyMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtSvrtyCtrl
* Parameters     : req,res()
* Description    : Delete existing  Severity
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtSvrtyCtrl = function (req, res) {

    SprtSvrtyMdl.dlteSprtSvrtyMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SprtSvrtyCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SprtSvrtyCtrl', {});
        });
}