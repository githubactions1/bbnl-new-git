const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')





/**************************************************************************************
* Controller     : getMrchntLoadNPayCtrl
* Parameters     : req,res()
* Description    : get merchant load and pay details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.getMrchntLoadNPayCtrl = function (req, res) {
    console.log("getMrchntLoadNPayCtrl")
    merchantMdl.getMrchntLoadNPayMdl(req.params.mrchntID, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getMrchntLoadNPayCtrl
* Parameters     : req,res()
* Description    : get merchant load and pay details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.getMrchntLoadNPayDtlCtrl = function (req, res) {
    console.log("getMrchntLoadNPayDtlCtrl")
    merchantMdl.getMrchntLoadNPayDtlMdl(req.params.mrchntID, req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrtMrchntLoadNPayCtrl
* Parameters     : req,res()
* Description    : insert offers details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntLoadNPayCtrl = function (req, res) {
    console.log("insrtMrchntLoadNPayCtrl")
    console.log(req)
    merchantMdl.insrtMrchntLoadNPayMdl(req.body.data, req.user)
        .then(function (result) {
            merchantMdl.insrtMrchntLoadNPayUsrsMdl(req.body.data, result.insertId, req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

// /**************************************************************************************
// * Controller     : updateMrchntLoadNPayCtrl
// * Parameters     : req,res()
// * Description    : update Load And Pay details
// * Change History :
// * 04/05/2019    -  Seetharam Devisetty - Initial Function
// *
// ***************************************************************************************/

// exports.updateMrchntLoadNPayCtrl = function (req, res) {
//     console.log("updateMrchntLoadNPayCtrl")
//     merchantMdl.updateMrchntLoadNPayMdl(req.body.data, (err, result) => {
//         if (err) {
//             df.formatErrorRes(req, res, err, cntxtDtls, '', {});
//         }
//         else {
//             df.formatSucessRes(req, res, result, cntxtDtls, '', {});
//         }
//     })
// }
