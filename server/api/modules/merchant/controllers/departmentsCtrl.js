const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')



/**************************************************************************************
* Controller     : getDprtmntLstCntrl
* Parameters     : req,res()
* Description    : get department list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getDprtmntLstCntrl = function (req, res) {
    console.log("getDprtmntLstCntrl")
    merchantMdl.getDprtmntLstMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : insrtDprtmntCtrl
* Parameters     : req,res()
* Description    : insert department list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtDprtmntCtrl = function (req, res) {
    console.log("insrtDprtmntCtrl")
    merchantMdl.insrtDprtmntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : updateDprtmntCtrl
* Parameters     : req,res()
* Description    : update department list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateDprtmntCtrl = function (req, res) {
    console.log("updateDprtmntCtrl")
    merchantMdl.updateDprtmntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : deltDprtmntCtrl
* Parameters     : req,res()
* Description    : update department list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltDprtmntCtrl = function (req, res) {
    console.log("deltDprtmntCtrl")
    merchantMdl.deltDprtmntMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : deltDprtmntCtrl
* Parameters     : req,res()
* Description    : get terminal list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getTrmnlLstCntrl = function (req, res) {
    console.log("getTrmnlLstCntrl")
    merchantMdl.getTrmnlLstMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


