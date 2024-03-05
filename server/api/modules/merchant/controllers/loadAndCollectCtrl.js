const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')




/**************************************************************************************
* Controller     : getMrchntLoadNCollectDtlCtrl
* Parameters     : req,res()
* Description    : get merchant load and pay details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.getMrchntLoadNCollectDtlCtrl = function (req, res) {
    console.log("getMrchntLoadNCollectDtlCtrl")
    merchantMdl.getMrchntLoadNCollectDtlMdl(req.params.mrchntID, req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getMrchntLoadNCollectCtrl
* Parameters     : req,res()
* Description    : get merchant load and pay details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.getMrchntLoadNCollectCtrl = function (req, res) {
    console.log("getMrchntLoadNCollectCtrl")
    merchantMdl.getMrchntLoadNCollectMdl(req.params.mrchntID, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrtMrchntLoadNCollectCtrl
* Parameters     : req,res()
* Description    : insert load and collect details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntLoadNCollectCtrl = function (req, res) {
    console.log("insrtMrchntLoadNCollectCtrl")
    console.log(req)
    merchantMdl.insrtMrchntLoadNCollectMdl(req.body.data, req.user)
        .then(function (result) {
            merchantMdl.insrtMrchntLoadNCollectUsrsMdl(req.body.data, result.insertId, req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
