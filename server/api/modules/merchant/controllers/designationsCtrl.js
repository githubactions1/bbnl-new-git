const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')


/**************************************************************************************
* Controller     : getDsgntnCntrl
* Parameters     : req,res()
* Description    : get designation list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getDsgntnCntrl = function (req, res) {
    console.log("getDsgntnCntrl")
    merchantMdl.getDsgntnMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtDsgntnCntrl
* Parameters     : req,res()
* Description    : insert designation list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtDsgntnCntrl = function (req, res) {
    console.log("insrtDsgntnCntrl")
    merchantMdl.insrtDsgntnMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : updateDsgntnCntrl
* Parameters     : req,res()
* Description    : update designation list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateDsgntnCntrl = function (req, res) {
    console.log("updateDsgntnCntrl")
    merchantMdl.updateDsgntnMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : deltDsgntnCntrl
* Parameters     : req,res()
* Description    : delete designation list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltDsgntnCntrl = function (req, res) {
    console.log("deltDsgntnCntrl")
    merchantMdl.deltDsgntnMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

