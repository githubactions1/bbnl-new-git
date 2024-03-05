const AgntPymntMdeMdl = require(appRoot + '/server/api/modules/billing/models/AgntPymntMdeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_AgntPymntMdeCtrl
* Parameters     : req,res()
* Description    : get details of all AgntPymntMode
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AgntPymntMdeCtrl = function (req, res) {

    AgntPymntMdeMdl.getAgntPymntMdeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_AgntPymntMdeCtrl
* Parameters     : req,res()
* Description    : search details of all AgntPymntMode
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_AgntPymntMdeCtrl = function (req, res) {

    AgntPymntMdeMdl.srchAgntPymntMdeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_AgntPymntMdeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  AgntPymntMode
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AgntPymntMdeByIdCtrl = function (req, res) {

    AgntPymntMdeMdl.getAgntPymntMdeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_AgntPymntMdeCtrl
* Parameters     : req,res()
* Description    : Add new  AgntPymntMode
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_AgntPymntMdeCtrl = function (req, res) {

    AgntPymntMdeMdl.insrtAgntPymntMdeMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_AgntPymntMdeCtrl
* Parameters     : req,res()
* Description    : Update existing  AgntPymntMode
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_AgntPymntMdeCtrl = function (req, res) {

    AgntPymntMdeMdl.updteAgntPymntMdeMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_AgntPymntMdeCtrl
* Parameters     : req,res()
* Description    : Delete existing  AgntPymntMode
* Change History :
* 18/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_AgntPymntMdeCtrl = function (req, res) {

    AgntPymntMdeMdl.dlteAgntPymntMdeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_AgntPymntMdeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_AgntPymntMdeCtrl', {});
        });
}