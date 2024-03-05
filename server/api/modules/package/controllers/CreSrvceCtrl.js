const CreSrvceMdl = require(appRoot + '/server/api/modules/package/models/CreSrvceMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_CreSrvceCtrl
* Parameters     : req,res()
* Description    : get details of all CoreServices
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CreSrvceCtrl = function (req, res) {

    CreSrvceMdl.getCreSrvceMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_CreSrvceCtrl
* Parameters     : req,res()
* Description    : search details of all CoreServices
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_CreSrvceCtrl = function (req, res) {

    CreSrvceMdl.srchCreSrvceMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_CreSrvceByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  CoreServices
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CreSrvceByIdCtrl = function (req, res) {

    CreSrvceMdl.getCreSrvceByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_CreSrvceCtrl
* Parameters     : req,res()
* Description    : Add new  CoreServices
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_CreSrvceCtrl = function (req, res) {

    CreSrvceMdl.insrtCreSrvceMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_CreSrvceCtrl
* Parameters     : req,res()
* Description    : Update existing  CoreServices
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_CreSrvceCtrl = function (req, res) {

    CreSrvceMdl.updteCreSrvceMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_CreSrvceCtrl
* Parameters     : req,res()
* Description    : Delete existing  CoreServices
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_CreSrvceCtrl = function (req, res) {

    CreSrvceMdl.dlteCreSrvceMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_CreSrvceCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_CreSrvceCtrl', {});
        });
}