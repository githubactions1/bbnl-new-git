const OrgnMdl = require(appRoot + '/server/api/modules/admin/models/OrgnMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_OrgnCtrl
* Parameters     : req,res()
* Description    : get details of all Organisations
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_OrgnCtrl = function (req, res) {

    OrgnMdl.getOrgnMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_OrgnCtrl
* Parameters     : req,res()
* Description    : search details of all Organisations
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_OrgnCtrl = function (req, res) {

    OrgnMdl.srchOrgnMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_OrgnByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Organisations
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_OrgnByIdCtrl = function (req, res) {

    OrgnMdl.getOrgnByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_OrgnCtrl
* Parameters     : req,res()
* Description    : Add new  Organisations
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_OrgnCtrl = function (req, res) {

    OrgnMdl.insrtOrgnMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_OrgnCtrl
* Parameters     : req,res()
* Description    : Update existing  Organisations
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_OrgnCtrl = function (req, res) {

    OrgnMdl.updteOrgnMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_OrgnCtrl
* Parameters     : req,res()
* Description    : Delete existing  Organisations
* Change History :
* 31/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_OrgnCtrl = function (req, res) {

    OrgnMdl.dlteOrgnMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_OrgnCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_OrgnCtrl', {});
        });
}