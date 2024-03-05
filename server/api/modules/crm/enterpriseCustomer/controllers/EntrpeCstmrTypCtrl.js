const EntrpeCstmrTypMdl = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/models/EntrpeCstmrTypMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : get details of all enterprise Customer Type
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.getEntrpeCstmrTypMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : search details of all enterprise Customer Type
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.srchEntrpeCstmrTypMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_EntrpeCstmrTypByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  enterprise Customer Type
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_EntrpeCstmrTypByIdCtrl = function (req, res) {

    EntrpeCstmrTypMdl.getEntrpeCstmrTypByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : Add new  enterprise Customer Type
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.insrtEntrpeCstmrTypMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : Update existing  enterprise Customer Type
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.updteEntrpeCstmrTypMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : Delete existing  enterprise Customer Type
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.dlteEntrpeCstmrTypMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_EntrpeCstmrTypCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_EntrpeCstmrTypCtrl', {});
        });
}