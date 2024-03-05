const AppDtypeMdl = require(appRoot + '/server/api/modules/general/appstore/models/AppDtypeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_AppDtypeCtrl
* Parameters     : req,res()
* Description    : get details of all Data Types
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppDtypeCtrl = function (req, res) {

    AppDtypeMdl.getAppDtypeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_AppDtypeCtrl
* Parameters     : req,res()
* Description    : search details of all Data Types
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_AppDtypeCtrl = function (req, res) {

    AppDtypeMdl.srchAppDtypeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_AppDtypeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Data Types
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_AppDtypeByIdCtrl = function (req, res) {

    AppDtypeMdl.getAppDtypeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_AppDtypeCtrl
* Parameters     : req,res()
* Description    : Add new  Data Types
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_AppDtypeCtrl = function (req, res) {

    AppDtypeMdl.insrtAppDtypeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_AppDtypeCtrl
* Parameters     : req,res()
* Description    : Update existing  Data Types
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_AppDtypeCtrl = function (req, res) {

    AppDtypeMdl.updteAppDtypeMdl(req.body,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_AppDtypeCtrl
* Parameters     : req,res()
* Description    : Delete existing  Data Types
* Change History :
* 17/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_AppDtypeCtrl = function (req, res) {

    AppDtypeMdl.dlteAppDtypeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_AppDtypeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_AppDtypeCtrl', {});
        });
}