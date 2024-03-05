const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')





/**************************************************************************************
* Controller     : getMrchntUsrCntrl
* Parameters     : req,res()
* Description    : get merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntUsrCntrl = function (req, res) {
    console.log("getMrchntUsrCntrl")
    merchantMdl.getMrchntUsrMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/***************************************************************************************/
exports.get_userdetails = function (req, res) {
    console.log("user details Cntrl")
    merchantMdl.get_userdetailsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : insrtMrchntUsrCtrl
* Parameters     : req,res()
* Description    : insert merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntUsrCtrl = function (req, res) {
    console.log("insrtMrchntUsrCtrl")
    merchantMdl.insrtMrchntUsrMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}







/**************************************************************************************
* Controller     : updateMrchntUsrCtrl
* Parameters     : req,res()
* Description    : update merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntUsrCtrl = function (req, res) {
    console.log("updateMrchntUsrCtrl")
    merchantMdl.updateMrchntUsrMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : deltMrchntUsrCtrl
* Parameters     : req,res()
* Description    : delete merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntUsrCtrl = function (req, res) {
    console.log("deltMrchntUsrCtrl")
    merchantMdl.deltMrchntUsrMdl(req.params.id, req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





