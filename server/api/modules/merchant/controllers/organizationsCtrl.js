const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')






/**************************************************************************************
* Controller     : getOrgnztnCntrl
* Parameters     : req,res()
* Description    : get organization list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getOrgnztnCntrl = function (req, res) {
    console.log("getOrgnztnCntrl")
    merchantMdl.getOrgnztnCntrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtOrgnztnCntrl
* Parameters     : req,res()
* Description    : insert organization list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtOrgnztnCntrl = function (req, res) {
    console.log("insrtOrgnztnCntrl")
    console.log(req.body)
    merchantMdl.insrtOrgnztnMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            console.log("errrrrrrrrrrrrrrrrrrrrr")
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updateOrgnztnCntrl
* Parameters     : req,res()
* Description    : update organization list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateOrgnztnCntrl = function (req, res) {
    console.log("updateOrgnztnCntrl")
    merchantMdl.updateOrgnztnMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : deltOrgnztnCntrl
* Parameters     : req,res()
* Description    : delete organization list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltOrgnztnCntrl = function (req, res) {
    console.log("deltOrgnztnCntrl")
    merchantMdl.deltOrgnztnMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

