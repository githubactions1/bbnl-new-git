
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
// Model Inclusions
var prpdWltMdl = require('../models/prepaidWalletMdl');
var dbutil = require(appRoot + '/utils/db.utils');
var request = require('request');

/**************************************************************************************
* Controller     : getCstWltBlnceCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
***************************************************************************************/
exports.getCstWltBlnceCtrl = function (req, res) {
    var fnm = "getWalletBalanceCtrl";

   console.log(req.user)

    var cstmr_id = (req.params.cstmr_id=== undefined) ? ( req.user.usr_ctgry_ky) :req.params.cstmr_id;
    log.info(`In ${fnm}`, 0, cntxtDtls);

    prpdWltMdl.getCstWltBlnceMdl(cstmr_id, req.user).then((results) => {
      if(results.length==0){ // No wallet record (Insert new record for customer wallet)
        prpdWltMdl.insCstWltNewMdl(cstmr_id, req.user).then((results) => {
                //return the new wallet id and balance as 0
                df.formatSucessRes(req, res, {"prpd_wlt_id":results.insertId,"prpd_wlt_at":0}, cntxtDtls, fnm, req.user);
              }).catch((err) => {
            df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
        })
      } else
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, req.user);
    }).catch((err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
    })
}

/**************************************************************************************
* Controller     : getCstWltTransHstCtrl
* Parameters     : req,res()
* Description    : Get customer Wallet transaction history (latest 50 records)
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
***************************************************************************************/
exports.getCstWltTransHstCtrl = function (req, res) {
    var fnm = "getCstWltTransHstCtrl";

    var cstmr_id = (req.params.cstmr_id=== undefined) ? ( req.user.usr_ctgry_ky) :req.params.cstmr_id;
    log.info(`In ${fnm}`, 0, cntxtDtls);

    prpdWltMdl.getCstWltBlnceMdl(cstmr_id, req.user).then((results) => {
      if(results.length==0){ // No wallet record (Insert new record for customer wallet)
        prpdWltMdl.insCstWltNewMdl(cstmr_id, req.user).then((results) => {
                //return the new wallet id and balance as 0
                df.formatSucessRes(req, res, {"balance":{"prpd_wlt_id":results,"prpd_wlt_at":0},"transactions":{}}, cntxtDtls, fnm, req.user);
              }).catch((err) => {
            df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
        })
      } else{ // customer already got wallet
            prpdWltMdl.getCstWltTransHstMdl(cstmr_id, req.user).then((Transresults) => { // get transaction history
                df.formatSucessRes(req, res, {"balance":results,"transactions":Transresults}, cntxtDtls, fnm, req.user);
            }).catch((err) => {
                df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
            })

      }
        
    }).catch((err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
    })

}



/**************************************************************************************
* Controller     : getLMOWltBlnceCtrl
* Parameters     : req,res()
* Description    : Get LMO Wallet Balance
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
***************************************************************************************/
exports.getLMOWltBlnceCtrl = function (req, res) {
    var fnm = "getLMOWltBlnceCtrl";

    var lmo_id = (req.params.lmo_id=== undefined) ? ( req.user.usr_ctgry_ky) :req.params.lmo_id;
    log.info(`In ${fnm}`, 0, cntxtDtls);

    prpdWltMdl.getLMOWltBlnceMdl(caf_id, req.user).then((results) => {
      if(results.length==0){ // No wallet record (Insert new record for customer wallet)
        prpdWltMdl.insLMOWltNewMdl(caf_id, req.user).then((results) => {
                //return the new wallet id and balance as 0
                df.formatSucessRes(req, res, {"prpd_wlt_id":results,"prpd_wlt_at":0}, cntxtDtls, fnm, req.user);
              }).catch((err) => {
            df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
        })
      } else
        df.formatSucessRes(req, res, results, cntxtDtls, fnm, req.user);
    }).catch((err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
    })
}

/**************************************************************************************
* Controller     : getLMOWltTransHstCtrl
* Parameters     : req,res()
* Description    : Get LMO Wallet transaction history (latest 50 records)
* Change History :
* 07/12/2020    -  Sunil Mulagada   - Initial Function
***************************************************************************************/
exports.getLMOWltTransHstCtrl = function (req, res) {
    var fnm = "getLMOWltTransHstCtrl";

    var lmo_id = (req.params.lmo_id=== undefined) ? ( req.user.usr_ctgry_ky) :req.params.lmo_id;
    log.info(`In ${fnm}`, 0, cntxtDtls);

    prpdWltMdl.getLMOWltBlnceMdl(lmo_id, req.user).then((results) => {
      if(results.length==0){ // No wallet record (Insert new record for customer wallet)
        prpdWltMdl.insLMOWltNewMdl(lmo_id, req.user).then((results) => {
                //return the new wallet id and balance as 0
                df.formatSucessRes(req, res, {"balance":{"prpd_wlt_id":results.insertId,"prpd_wlt_at":0},"transactions":{}}, cntxtDtls, fnm, req.user);
              }).catch((err) => {
            df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
        })
      } else{ // customer already got wallet
            prpdWltMdl.getLMOWltTransHstMdl(lmo_id, req.user).then((Transresults) => { // get transaction history
                df.formatSucessRes(req, res, {"balance":results,"transactions":Transresults}, cntxtDtls, fnm, req.user);
            }).catch((err) => {
                df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
            })

      }
        
    }).catch((err) => {
        df.formatErrorRes(req, res, err, cntxtDtls, fnm, req.user);
    })

}