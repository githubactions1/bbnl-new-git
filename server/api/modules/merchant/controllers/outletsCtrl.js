const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')




/**************************************************************************************
* Controller     : getOutltCntrl
* Parameters     : req,res()
* Description    : get outlet list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getOutltCntrl = function (req, res) {
    console.log("getOutltCntrl");
    merchantMdl.getOutltMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : insrtOutltCntrl
* Parameters     : req,res()
* Description    : insert outlet list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtOutltCntrl = function (req, res) {
    console.log("insrtOutltCntrl")
    merchantMdl.insrtOutltMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : updateOutltCntrl
* Parameters     : req,res()
* Description    : get outlet list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateOutltCntrl = function (req, res) {
    console.log("updateOutltCntrl")
    merchantMdl.updateOutltMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : deltOutltCntrl
* Parameters     : req,res()
* Description    : get outlet list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltOutltCntrl = function (req, res) {
    console.log("deltOutltCntrl")
    merchantMdl.deltOutltMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getOutltCtgryCntrl
* Parameters     : req,res()
* Description    : To update setup
* Change History :
* 31/07/2019    - Srujana M - Initial Function
***************************************************************************************/

exports.getOutltCtgryCntrl = function (req, res) {
    console.log("getOutltCtgryCntrl")
    merchantMdl.get_outltCtgryMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
