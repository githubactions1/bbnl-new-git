const ErpPrtnrsMdl = require(appRoot + '/server/api/modules/erp/models/ErpPrtnrsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_ErpPrtnrsCtrl
* Parameters     : req,res()
* Description    : get details of all erpprtnrslstt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_ErpPrtnrsCtrl = function (req, res) {

    ErpPrtnrsMdl.getErpPrtnrsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_ErpPrtnrsCtrl
* Parameters     : req,res()
* Description    : search details of all erpprtnrslstt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_ErpPrtnrsCtrl = function (req, res) {

    ErpPrtnrsMdl.srchErpPrtnrsMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_ErpPrtnrsByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  erpprtnrslstt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_ErpPrtnrsByIdCtrl = function (req, res) {

    ErpPrtnrsMdl.getErpPrtnrsByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_ErpPrtnrsCtrl
* Parameters     : req,res()
* Description    : Add new  erpprtnrslstt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_ErpPrtnrsCtrl = function (req, res) {

    ErpPrtnrsMdl.insrtErpPrtnrsMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_ErpPrtnrsCtrl
* Parameters     : req,res()
* Description    : Update existing  erpprtnrslstt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_ErpPrtnrsCtrl = function (req, res) {

    ErpPrtnrsMdl.updteErpPrtnrsMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_ErpPrtnrsCtrl
* Parameters     : req,res()
* Description    : Delete existing  erpprtnrslstt
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_ErpPrtnrsCtrl = function (req, res) {

    ErpPrtnrsMdl.dlteErpPrtnrsMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_ErpPrtnrsCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_ErpPrtnrsCtrl', {});
        });
}