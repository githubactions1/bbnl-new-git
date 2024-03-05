const CafStsMdl = require(appRoot + '/server/api/modules/caf/models/CafStsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_CafStsCtrl
* Parameters     : req,res()
* Description    : get details of all CafStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CafStsCtrl = function (req, res) {

    CafStsMdl.getCafStsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_CafStsCtrl
* Parameters     : req,res()
* Description    : search details of all CafStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_CafStsCtrl = function (req, res) {

    CafStsMdl.srchCafStsMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_CafStsByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  CafStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CafStsByIdCtrl = function (req, res) {

    CafStsMdl.getCafStsByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_CafStsCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_CafStsCtrl = function (req, res) {

    CafStsMdl.insrtCafStsMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_CafStsCtrl
* Parameters     : req,res()
* Description    : Update existing  CafStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_CafStsCtrl = function (req, res) {

    CafStsMdl.updteCafStsMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_CafStsCtrl
* Parameters     : req,res()
* Description    : Delete existing  CafStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_CafStsCtrl = function (req, res) {

    CafStsMdl.dlteCafStsMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_CafStsCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_CafStsCtrl', {});
        });
}