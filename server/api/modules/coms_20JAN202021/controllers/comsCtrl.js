var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var comsmdl = require('../models/comsMdl');
var dataMigrationMdl = require('../../../modules/dataMigration/models/dataMigrationMdl')
var cafBO = require('../../../modules/caf/cafBO/cafBo')
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');
var operationsUtils = require(appRoot + '/utils/operations.utils');
var lmoMnthlyOperations = require(appRoot + '/utils/lmoMnthlyOperations.js');
var dbutil = require(appRoot + '/utils/db.utils');



/**************************************************************************************
* Controller     : get_CstmrPrviousDtls
* Parameters     : None
* Description    : 
* Change History :
* 11/05/2020    - MADHURI NUNE - Initial Function
***************************************************************************************/
exports.get_CstmrPrviousDtls = (req, res) => {
     var fnm = "get_verfyCtrl";
     log.info(`In ${fnm}`, 0, cntxtDtls);
     console.log("********reeeeeeeeeqqqqqqq*********");
     //  console.log(req.body);
     console.log("********reeeeeeeeeqqqqqqq*********");
     comsmdl.get_verfyCtrl(req.query)
          .then((results) => {
          })

}





/**************************************************************************************
* Controller     : activateAlaCartePackage
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.activateAlaCartePackage = function (req, res) {
     var fnm = "activateAlaCartePackage";
     log.info(`In ${fnm}`, 0, cntxtDtls);
     let req_body = req.body;
     comsmdl.stageAddonData(req_body, 1)
          .then((results) => {
               df.formatSucessRes(req, res, [], cntxtDtls, fnm, { success_status: "200", success_msg: "Successfully, inserted addon packages." });
               // if (req_body) {
               //      comsmdl.getPackageDetailsMdl(req_body['Package Codes'], req_body['Subscriber Code'])
               //           .then((results) => {
               //                if (results) {
               //                     if (results.packg_dtls.length > 0 && results.caf_dtls.length > 0) {
               //                          comsmdl.insrtAddonPckgeMdl(results.packg_dtls[0], results.caf_dtls[0],req_body['actdate'])
               //                               .then((insrt_rslts) => {
               //                                    df.formatSucessRes(req, res, [], cntxtDtls, fnm, { success_status: "200", success_msg: "Successfully, inserted addon packages." });
               //                               }).catch((err) => {
               //                                    df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "220", err_message: "failed to insert addon packages." });
               //                               })
               //                     }
               //                     else {
               //                          df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "221", err_message: "Sorry, unable to fetch package or caf details." });
               //                     }
               //                }
               //                else {
               //                     df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "223", err_message: "Sorry, unable to fetch package and caf details." });
               //                }
               //           }).catch((error) => {
               //                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
               //           });
               // }
               // else {
               //      df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "530", err_message: "invalid addon post json." });
               // }
          }).catch((error) => {
               df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
          });

     // fs.appendFile(`/glits/web/temp/activateAlaCartePackage_tmp.txt`, JSON.stringify(req_body) + "\n", function (err, result) {
     //      if (err) {
     //          console.log("if")
     //          console.log(err)
     //      } else {
     //          console.log("else");
     //          console.log(result)
     //      }
     //  })


}



/**************************************************************************************
* Controller     : deActivateAlaCartePackage
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 03/02/2020    -   - Initial Function
*
***************************************************************************************/
exports.deActivateAlaCartePackage = function (req, res) {
     var fnm = "deActivateAlaCartePackage";
     log.info(`In ${fnm}`, 0, cntxtDtls);
     let req_body = req.body;

     comsmdl.stageAddonData(req_body, 0)
          .then((results) => {
               df.formatSucessRes(req, res, [], cntxtDtls, fnm, { success_status: "200", success_msg: "Successfully, inserted Deactivate addon packages." });
               // if (req_body) {
               //      comsmdl.getPackageDetailsMdl(req_body['Package Codes'], req_body['Subscriber Code'])
               //           .then((results) => {
                              
               //                if (results) {
               //                     if (results.packg_dtls.length > 0 && results.caf_dtls.length > 0) {
               //                          comsmdl.updatePckgeMdl(results.packg_dtls[0], results.caf_dtls[0],req_body['deactdate'])
               //                               .then((insrt_rslts) => {
               //                                    df.formatSucessRes(req, res, [], cntxtDtls, fnm, { success_status: "200", success_msg: "Successfully, deactivated addon packages." });
               //                               }).catch((err) => {
               //                                    df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "220", err_message: "failed to deactivated addon packages." });
               //                               })
               //                     }
               //                     else {
               //                          df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "221", err_message: "Sorry, unable to fetch package or caf details." });
               //                     }
               //                }
               //                else {
               //                     df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "223", err_message: "Sorry, unable to fetch package and caf details." });
               //                }
               //           }).catch((error) => {
               //                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
               //           });
               // }
               // else {
               //      df.formatErrorRes(req, res, {}, cntxtDtls, fnm, { error_status: "530", err_message: "invalid addon post json." });
               // }
          }).catch((error) => {
               df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
          });

     // fs.appendFile(`/glits/web/temp/deActivateAlaCartePackage_tmp.txt`, JSON.stringify(req_body) + "\n", function (err, result) {
     //      if (err) {
     //           console.log("if")
     //           console.log(err)
     //      } else {
     //           console.log("else");
     //           console.log(result)
     //      }
     // });
}
