const MrchtOtltMdl = require(appRoot + '/server/api/modules/admin/models/MrchtOtltMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_MrchtOtltCtrl
* Parameters     : req,res()
* Description    : get details of all branches
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_MrchtOtltCtrl = function (req, res) {

    MrchtOtltMdl.getMrchtOtltMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_MrchtOtltCtrl
* Parameters     : req,res()
* Description    : search details of all branches
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_MrchtOtltCtrl = function (req, res) {

    MrchtOtltMdl.srchMrchtOtltMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_MrchtOtltByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  branches
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_MrchtOtltByIdCtrl = function (req, res) {

    MrchtOtltMdl.getMrchtOtltByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_MrchtOtltCtrl
* Parameters     : req,res()
* Description    : Add new  branches
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_MrchtOtltCtrl = function (req, res) {

    MrchtOtltMdl.insrtMrchtOtltMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_MrchtOtltCtrl
* Parameters     : req,res()
* Description    : Update existing  branches
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_MrchtOtltCtrl = function (req, res) {

    MrchtOtltMdl.updteMrchtOtltMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_MrchtOtltCtrl
* Parameters     : req,res()
* Description    : Delete existing  branches
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_MrchtOtltCtrl = function (req, res) {

    MrchtOtltMdl.dlteMrchtOtltMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_MrchtOtltCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_MrchtOtltCtrl', {});
        });
}