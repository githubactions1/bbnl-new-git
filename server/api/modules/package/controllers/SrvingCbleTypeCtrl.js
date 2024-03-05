const SrvingCbleTypeMdl = require(appRoot + '/server/api/modules/package/models/SrvingCbleTypeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SrvingCbleTypeCtrl
* Parameters     : req,res()
* Description    : get details of all srvngcbltyplst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SrvingCbleTypeCtrl = function (req, res) {

    SrvingCbleTypeMdl.getSrvingCbleTypeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SrvingCbleTypeCtrl
* Parameters     : req,res()
* Description    : search details of all srvngcbltyplst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SrvingCbleTypeCtrl = function (req, res) {

    SrvingCbleTypeMdl.srchSrvingCbleTypeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SrvingCbleTypeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  srvngcbltyplst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SrvingCbleTypeByIdCtrl = function (req, res) {

    SrvingCbleTypeMdl.getSrvingCbleTypeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SrvingCbleTypeCtrl
* Parameters     : req,res()
* Description    : Add new  srvngcbltyplst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SrvingCbleTypeCtrl = function (req, res) {

    SrvingCbleTypeMdl.insrtSrvingCbleTypeMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SrvingCbleTypeCtrl
* Parameters     : req,res()
* Description    : Update existing  srvngcbltyplst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SrvingCbleTypeCtrl = function (req, res) {

    SrvingCbleTypeMdl.updteSrvingCbleTypeMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SrvingCbleTypeCtrl
* Parameters     : req,res()
* Description    : Delete existing  srvngcbltyplst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SrvingCbleTypeCtrl = function (req, res) {

    SrvingCbleTypeMdl.dlteSrvingCbleTypeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SrvingCbleTypeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SrvingCbleTypeCtrl', {});
        });
}