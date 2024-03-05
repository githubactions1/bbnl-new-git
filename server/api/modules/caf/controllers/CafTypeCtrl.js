const CafTypeMdl = require(appRoot + '/server/api/modules/caf/models/CafTypeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_CafTypeCtrl
* Parameters     : req,res()
* Description    : get details of all CAFType
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CafTypeCtrl = function (req, res) {

    CafTypeMdl.getCafTypeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_CafTypeCtrl
* Parameters     : req,res()
* Description    : search details of all CAFType
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_CafTypeCtrl = function (req, res) {

    CafTypeMdl.srchCafTypeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_CafTypeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  CAFType
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CafTypeByIdCtrl = function (req, res) {

    CafTypeMdl.getCafTypeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_CafTypeCtrl
* Parameters     : req,res()
* Description    : Add new  CAFType
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_CafTypeCtrl = function (req, res) {

    CafTypeMdl.insrtCafTypeMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_CafTypeCtrl
* Parameters     : req,res()
* Description    : Update existing  CAFType
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_CafTypeCtrl = function (req, res) {

    CafTypeMdl.updteCafTypeMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_CafTypeCtrl
* Parameters     : req,res()
* Description    : Delete existing  CAFType
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_CafTypeCtrl = function (req, res) {

    CafTypeMdl.dlteCafTypeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_CafTypeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_CafTypeCtrl', {});
        });
}