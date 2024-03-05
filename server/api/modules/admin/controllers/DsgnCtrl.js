const DsgnMdl = require(appRoot + '/server/api/modules/admin/models/DsgnMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_DsgnCtrl
* Parameters     : req,res()
* Description    : get details of all Designations
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_DsgnCtrl = function (req, res) {

    DsgnMdl.getDsgnMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_DsgnCtrl
* Parameters     : req,res()
* Description    : search details of all Designations
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_DsgnCtrl = function (req, res) {

    DsgnMdl.srchDsgnMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_DsgnByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Designations
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_DsgnByIdCtrl = function (req, res) {

    DsgnMdl.getDsgnByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_DsgnCtrl
* Parameters     : req,res()
* Description    : Add new  Designations
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_DsgnCtrl = function (req, res) {

    DsgnMdl.insrtDsgnMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_DsgnCtrl
* Parameters     : req,res()
* Description    : Update existing  Designations
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_DsgnCtrl = function (req, res) {

    DsgnMdl.updteDsgnMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_DsgnCtrl
* Parameters     : req,res()
* Description    : Delete existing  Designations
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_DsgnCtrl = function (req, res) {

    DsgnMdl.dlteDsgnMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_DsgnCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_DsgnCtrl', {});
        });
}