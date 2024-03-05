const actntsMdl = require(appRoot + '/server/api/modules/merchant/models/accountsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')








/**************************************************************************************
* Controller     : getMrchntAccntCntrl
* Parameters     : req,res()
* Description    : get merchant accout list based on merchant id
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntAccntCntrl = function (req, res) {
    console.log("getMrchntAccntCntrl")
    actntsMdl.getMrchntAccntMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : insrtMrchntAccntCntrl
* Parameters     : req,res()
* Description    : insert merchant accout 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntAccntCntrl = function (req, res) {
    console.log("insrtMrchntAccntCntrl")
    actntsMdl.insrtMrchntAccntMdl(qryUtl.qryString(req.body.data), req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : updateMrchntAccntCntrl
* Parameters     : req,res()
* Description    : update merchant accout 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntAccntCntrl = function (req, res) {
    console.log("updateMrchntAccntCntrl")
    actntsMdl.updateMrchntAccntMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : deltMrchntAccntCntrl
* Parameters     : req,res()
* Description    : delete merchant accout 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntAccntCntrl = function (req, res) {
    console.log("deltMrchntAccntCntrl")
    actntsMdl.deltMrchntAccntMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


