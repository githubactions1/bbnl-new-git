const MrchtOtltCtgryMdl = require(appRoot + '/server/api/modules/admin/models/MrchtOtltCtgryMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_MrchtOtltCtgryCtrl
* Parameters     : req,res()
* Description    : get details of all BranchCategory
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_MrchtOtltCtgryCtrl = function (req, res) {

    MrchtOtltCtgryMdl.getMrchtOtltCtgryMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_MrchtOtltCtgryCtrl
* Parameters     : req,res()
* Description    : search details of all BranchCategory
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_MrchtOtltCtgryCtrl = function (req, res) {

    MrchtOtltCtgryMdl.srchMrchtOtltCtgryMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_MrchtOtltCtgryByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  BranchCategory
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_MrchtOtltCtgryByIdCtrl = function (req, res) {

    MrchtOtltCtgryMdl.getMrchtOtltCtgryByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_MrchtOtltCtgryCtrl
* Parameters     : req,res()
* Description    : Add new  BranchCategory
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_MrchtOtltCtgryCtrl = function (req, res) {

    MrchtOtltCtgryMdl.insrtMrchtOtltCtgryMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_MrchtOtltCtgryCtrl
* Parameters     : req,res()
* Description    : Update existing  BranchCategory
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_MrchtOtltCtgryCtrl = function (req, res) {

    MrchtOtltCtgryMdl.updteMrchtOtltCtgryMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_MrchtOtltCtgryCtrl
* Parameters     : req,res()
* Description    : Delete existing  BranchCategory
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_MrchtOtltCtgryCtrl = function (req, res) {

    MrchtOtltCtgryMdl.dlteMrchtOtltCtgryMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_MrchtOtltCtgryCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_MrchtOtltCtgryCtrl', {});
        });
}