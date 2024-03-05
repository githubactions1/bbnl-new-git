const ErpTmplePrtnrsMdl = require(appRoot + '/server/api/modules/erp/models/ErpTmplePrtnrsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_ErpTmplePrtnrsCtrl
* Parameters     : req,res()
* Description    : get details of all erpTmpltprtnrs
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_ErpTmplePrtnrsCtrl = function (req, res) {

    ErpTmplePrtnrsMdl.getErpTmplePrtnrsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_ErpTmplePrtnrsCtrl
* Parameters     : req,res()
* Description    : search details of all erpTmpltprtnrs
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_ErpTmplePrtnrsCtrl = function (req, res) {

    ErpTmplePrtnrsMdl.srchErpTmplePrtnrsMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_ErpTmplePrtnrsByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  erpTmpltprtnrs
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_ErpTmplePrtnrsByIdCtrl = function (req, res) {

    ErpTmplePrtnrsMdl.getErpTmplePrtnrsByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_ErpTmplePrtnrsCtrl
* Parameters     : req,res()
* Description    : Add new  erpTmpltprtnrs
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_ErpTmplePrtnrsCtrl = function (req, res) {

    ErpTmplePrtnrsMdl.insrtErpTmplePrtnrsMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_ErpTmplePrtnrsCtrl
* Parameters     : req,res()
* Description    : Update existing  erpTmpltprtnrs
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_ErpTmplePrtnrsCtrl = function (req, res) {

    ErpTmplePrtnrsMdl.updteErpTmplePrtnrsMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_ErpTmplePrtnrsCtrl
* Parameters     : req,res()
* Description    : Delete existing  erpTmpltprtnrs
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_ErpTmplePrtnrsCtrl = function (req, res) {

    ErpTmplePrtnrsMdl.dlteErpTmplePrtnrsMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_ErpTmplePrtnrsCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_ErpTmplePrtnrsCtrl', {});
        });
}