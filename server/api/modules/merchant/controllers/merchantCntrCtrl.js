const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')




/**************************************************************************************
* Controller     : getMrchntCntrCntrl
* Parameters     : req,res()
* Description    : get counter details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntCntrCntrl = function (req, res) {
    console.log("getMrchntCntrCntrl")
    merchantMdl.getMrchntCntrMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtMrchntCntrCtrl
* Parameters     : req,res()
* Description    : insert counter details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntCntrCtrl = function (req, res) {
    console.log("insrtMrchntCntrCtrl")
    merchantMdl.insrtMrchntCntrMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : updateMrchntCntrCtrl
* Parameters     : req,res()
* Description    : update counter details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntCntrCtrl = function (req, res) {
    console.log("updateMrchntCntrCtrl")
    merchantMdl.updateMrchntCntrMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : deltMrchntCntrCtrl
* Parameters     : req,res()
* Description    : delete counter details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntCntrCtrl = function (req, res) {
    console.log("deltMrchntCntrCtrl")
    merchantMdl.deltMrchntCntrMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

