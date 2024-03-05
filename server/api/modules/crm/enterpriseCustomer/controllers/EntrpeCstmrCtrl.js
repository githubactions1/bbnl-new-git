const EntrpeCstmrMdl = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/models/EntrpeCstmrMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_EntrpeCstmrCtrl
* Parameters     : req,res()
* Description    : get details of all enterprise Customer
* Change History :
* 27/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_EntrpeCstmrCtrl = function (req, res) {
    
    EntrpeCstmrMdl.getEntrpeCstmrMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_EntrpeCstmrCtrl
* Parameters     : req,res()
* Description    : search details of all enterprise Customer
* Change History :
* 27/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_EntrpeCstmrCtrl = function (req, res) {

    EntrpeCstmrMdl.srchEntrpeCstmrMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_EntrpeCstmrByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  enterprise Customer
* Change History :
* 27/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_EntrpeCstmrByIdCtrl = function (req, res) {

    EntrpeCstmrMdl.getEntrpeCstmrByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_EntrpeCstmrCtrl
* Parameters     : req,res()
* Description    : Add new  enterprise Customer
* Change History :
* 27/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_EntrpeCstmrCtrl = function (req, res) {

    EntrpeCstmrMdl.insrtEntrpeCstmrMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_EntrpeCstmrCtrl
* Parameters     : req,res()
* Description    : Update existing  enterprise Customer
* Change History :
* 27/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_EntrpeCstmrCtrl = function (req, res) {

    EntrpeCstmrMdl.updteEntrpeCstmrMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_EntrpeCstmrCtrl
* Parameters     : req,res()
* Description    : Delete existing  enterprise Customer
* Change History :
* 27/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_EntrpeCstmrCtrl = function (req, res) {

    EntrpeCstmrMdl.dlteEntrpeCstmrMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_EntrpeCstmrCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_EntrpeCstmrCtrl', {});
        });
}
