const CstmrMdl = require(appRoot + '/server/api/modules/crm/customers/models/CstmrMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_CstmrCtrl
* Parameters     : req,res()
* Description    : get details of all Customer
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CstmrCtrl = function (req, res) {

    CstmrMdl.getCstmrMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_CstmrCtrl
* Parameters     : req,res()
* Description    : search details of all Customer
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_CstmrCtrl = function (req, res) {

    CstmrMdl.srchCstmrMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_CstmrByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Customer
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CstmrByIdCtrl = function (req, res) {

    CstmrMdl.getCstmrByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_CstmrCtrl
* Parameters     : req,res()
* Description    : Add new  Customer
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_CstmrCtrl = function (req, res) {
    console.log(req.body.data);

    CstmrMdl.insrtCstmrMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_CstmrCtrl
* Parameters     : req,res()
* Description    : Update existing  Customer
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_CstmrCtrl = function (req, res) {

    CstmrMdl.updteCstmrMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_CstmrCtrl
* Parameters     : req,res()
* Description    : Delete existing  Customer
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_CstmrCtrl = function (req, res) {

    CstmrMdl.dlteCstmrMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_CstmrCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_CstmrCtrl', {});
        });
}

/**************************************************************************************
* Controller     : get_CstmrTypeCtrl
* Parameters     : req,res()
* Description    : Delete existing  Customer
* Change History :
* 28/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CstmrTypeCtrl = function (req, res) {

    CstmrMdl.get_CstmrTypeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'get_CstmrTypeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'get_CstmrTypeCtrl', {});
        });
}





