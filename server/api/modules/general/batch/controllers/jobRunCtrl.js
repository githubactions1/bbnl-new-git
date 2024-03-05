const actntsMdl = require(appRoot + '/server/api/modules/jobs/models/jobsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')

/**************************************************************************************
* Controller     : getJbsLtstLstCntrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getJbsLtstLstCntrl = function (req, res) {
    console.log("getJbsLtstLstCntrl")
    actntsMdl.getMrchntAccntMdl(req.params.id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : getJbHstryCntrl
* Parameters     : req,res()
* Description    : Get historical run details for a job
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/

exports.getJbHstryCntrl = function (req, res) {
    console.log("getJbHstryCntrl")
    actntsMdl.insrtMrchntAccntMdl(qryUtl.qryString(req.body.data))
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getJbDtlsCntrl
* Parameters     : req,res()
* Description    : Get Task level details of a job
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getJbDtlsCntrl = function (req, res) {
    console.log("getJbHstryCntrl")
    actntsMdl.insrtMrchntAccntMdl(qryUtl.qryString(req.body.data))
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getTskHstryCntrl
* Parameters     : req,res()
* Description    : Get Task wise historical execution details
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getTskHstryCntrl = function (req, res) {
    console.log("getJbHstryCntrl")
    actntsMdl.insrtMrchntAccntMdl(qryUtl.qryString(req.body.data))
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getTskCnfgCntrl
* Parameters     : req,res()
* Description    : Get Task configurationdetails
* Change History :
* 02/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
exports.getTskCnfgCntrl = function (req, res) {
    console.log("getJbHstryCntrl")
    actntsMdl.insrtMrchntAccntMdl(qryUtl.qryString(req.body.data))
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}