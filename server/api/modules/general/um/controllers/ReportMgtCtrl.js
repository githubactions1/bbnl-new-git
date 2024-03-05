// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

// Model Inclusions
var rtptMgtmdl = require('../models/reportMgtMdl');
/**************************************************************************************
* Controller     : rprtPrfle_get
* Parameters     : req,res()
* Description    : 
* Change History :
* 23/07/2019    - Bala - Initial Function
*
***************************************************************************************/
exports.rprtPrfle_get = function (req, res) {
    var fnm = "rprtPrfle_get";
    var stp_prfle_id = req.params.id;
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            rtptMgtmdl.getReportPrfle(stp_prfle_id, req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}