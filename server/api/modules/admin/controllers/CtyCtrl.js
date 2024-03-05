const CtyMdl = require(appRoot + '/server/api/modules/admin/models/CtyMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_CtyCtrl
* Parameters     : req,res()
* Description    : get details of all cities
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CtyCtrl = function (req, res) {

    CtyMdl.getCtyMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_CtyCtrl
* Parameters     : req,res()
* Description    : search details of all cities
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_CtyCtrl = function (req, res) {

    CtyMdl.srchCtyMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_CtyByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  cities
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CtyByIdCtrl = function (req, res) {

    CtyMdl.getCtyByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_CtyCtrl
* Parameters     : req,res()
* Description    : Add new  cities
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_CtyCtrl = function (req, res) {

    CtyMdl.insrtCtyMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_CtyCtrl
* Parameters     : req,res()
* Description    : Update existing  cities
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_CtyCtrl = function (req, res) {

    CtyMdl.updteCtyMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_CtyCtrl
* Parameters     : req,res()
* Description    : Delete existing  cities
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_CtyCtrl = function (req, res) {

    CtyMdl.dlteCtyMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_CtyCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_CtyCtrl', {});
        });
}