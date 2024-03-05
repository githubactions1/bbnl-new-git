const LngeMdl = require(appRoot + '/server/api/modules/package/models/LngeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_LngeCtrl
* Parameters     : req,res()
* Description    : get details of all Languages
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_LngeCtrl = function (req, res) {

    LngeMdl.getLngeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_LngeCtrl
* Parameters     : req,res()
* Description    : search details of all Languages
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_LngeCtrl = function (req, res) {

    LngeMdl.srchLngeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_LngeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Languages
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_LngeByIdCtrl = function (req, res) {

    LngeMdl.getLngeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_LngeCtrl
* Parameters     : req,res()
* Description    : Add new  Languages
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_LngeCtrl = function (req, res) {

    LngeMdl.insrtLngeMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_LngeCtrl
* Parameters     : req,res()
* Description    : Update existing  Languages
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_LngeCtrl = function (req, res) {

    LngeMdl.updteLngeMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_LngeCtrl
* Parameters     : req,res()
* Description    : Delete existing  Languages
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_LngeCtrl = function (req, res) {

    LngeMdl.dlteLngeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_LngeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_LngeCtrl', {});
        });
}