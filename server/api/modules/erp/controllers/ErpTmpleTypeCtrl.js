const ErpTmpleTypeMdl = require(appRoot + '/server/api/modules/erp/models/ErpTmpleTypeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_ErpTmpleTypeCtrl
* Parameters     : req,res()
* Description    : get details of all erpTmpltTyp
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_ErpTmpleTypeCtrl = function (req, res) {

    ErpTmpleTypeMdl.getErpTmpleTypeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_ErpTmpleTypeCtrl
* Parameters     : req,res()
* Description    : search details of all erpTmpltTyp
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_ErpTmpleTypeCtrl = function (req, res) {

    ErpTmpleTypeMdl.srchErpTmpleTypeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_ErpTmpleTypeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  erpTmpltTyp
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_ErpTmpleTypeByIdCtrl = function (req, res) {

    ErpTmpleTypeMdl.getErpTmpleTypeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_ErpTmpleTypeCtrl
* Parameters     : req,res()
* Description    : Add new  erpTmpltTyp
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_ErpTmpleTypeCtrl = function (req, res) {

    ErpTmpleTypeMdl.insrtErpTmpleTypeMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_ErpTmpleTypeCtrl
* Parameters     : req,res()
* Description    : Update existing  erpTmpltTyp
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_ErpTmpleTypeCtrl = function (req, res) {

    ErpTmpleTypeMdl.updteErpTmpleTypeMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_ErpTmpleTypeCtrl
* Parameters     : req,res()
* Description    : Delete existing  erpTmpltTyp
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_ErpTmpleTypeCtrl = function (req, res) {

    ErpTmpleTypeMdl.dlteErpTmpleTypeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_ErpTmpleTypeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_ErpTmpleTypeCtrl', {});
        });
}