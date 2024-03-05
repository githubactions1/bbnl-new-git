const PckgeSrvcpkTypeMdl = require(appRoot + '/server/api/modules/package/models/PckgeSrvcpkTypeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_PckgeSrvcpkTypeCtrl
* Parameters     : req,res()
* Description    : get details of all packageServicetype
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeSrvcpkTypeCtrl = function (req, res) {

    PckgeSrvcpkTypeMdl.getPckgeSrvcpkTypeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_PckgeSrvcpkTypeCtrl
* Parameters     : req,res()
* Description    : search details of all packageServicetype
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_PckgeSrvcpkTypeCtrl = function (req, res) {

    PckgeSrvcpkTypeMdl.srchPckgeSrvcpkTypeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_PckgeSrvcpkTypeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  packageServicetype
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeSrvcpkTypeByIdCtrl = function (req, res) {

    PckgeSrvcpkTypeMdl.getPckgeSrvcpkTypeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_PckgeSrvcpkTypeCtrl
* Parameters     : req,res()
* Description    : Add new  packageServicetype
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_PckgeSrvcpkTypeCtrl = function (req, res) {

    PckgeSrvcpkTypeMdl.insrtPckgeSrvcpkTypeMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_PckgeSrvcpkTypeCtrl
* Parameters     : req,res()
* Description    : Update existing  packageServicetype
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_PckgeSrvcpkTypeCtrl = function (req, res) {

    PckgeSrvcpkTypeMdl.updtePckgeSrvcpkTypeMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_PckgeSrvcpkTypeCtrl
* Parameters     : req,res()
* Description    : Delete existing  packageServicetype
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_PckgeSrvcpkTypeCtrl = function (req, res) {

    PckgeSrvcpkTypeMdl.dltePckgeSrvcpkTypeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_PckgeSrvcpkTypeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_PckgeSrvcpkTypeCtrl', {});
        });
}