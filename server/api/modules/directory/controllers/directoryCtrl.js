// Standard Inclusions
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var attUtil = require(appRoot + '/utils/attachment.utils');
var _ = require('lodash');
// Model Inclusions
var directoryMdl = require('../models/directoryMdl');

/**************************************************************************************
* Controller     : userDirectory_get
* Parameters     : None
* Description    : 
* Change History :
* 21/01/2020    - Srujana M - Initial Function
***************************************************************************************/

// exports.userDirectory_get =function (req, res) {
//     var fnm = "userDirectory_get";
//     log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
//     directoryMdl.getDirectoryUsersMdl(req.user)
//         .then(function (results) {
//             df.formatSucessRes(res, results, cntxtDtls, fnm, {});
//         }, function (error) {
//             df.formatErrorRes(res, error, cntxtDtls, fnm, {});
//         });
// }

exports.userDirectory_get = function (req, res) {
    var fnm = "userDirectory_get";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            df.forParamErrorRes(res, result, cntxtDtls, fnm, util.inspect(result.array()), {});
            return;
        } else {  // Model gets called Here 
            directoryMdl.getDirectoryUsersMdl(req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                });
        }
    });
}