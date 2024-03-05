const SprtSrvceMdl = require(appRoot + '/server/api/modules/support/models/SprtSrvceMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtSrvceCtrl
* Parameters     : req,res()
* Description    : get details of all support services
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtSrvceCtrl = function (req, res) {

    SprtSrvceMdl.getSprtSrvceMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtSrvceCtrl
* Parameters     : req,res()
* Description    : search details of all support services
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtSrvceCtrl = function (req, res) {

    SprtSrvceMdl.srchSprtSrvceMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtSrvceByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  support services
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtSrvceByIdCtrl = function (req, res) {

    SprtSrvceMdl.getSprtSrvceByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtSrvceCtrl
* Parameters     : req,res()
* Description    : Add new  support services
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtSrvceCtrl = function (req, res) {

    SprtSrvceMdl.insrtSprtSrvceMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtSrvceCtrl
* Parameters     : req,res()
* Description    : Update existing  support services
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtSrvceCtrl = function (req, res) {

    SprtSrvceMdl.updteSprtSrvceMdl(req.body,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtSrvceCtrl
* Parameters     : req,res()
* Description    : Delete existing  support services
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtSrvceCtrl = function (req, res) {

    SprtSrvceMdl.dlteSprtSrvceMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, 'dlte_SprtSrvceCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, 'dlte_SprtSrvceCtrl', {});
        });
}