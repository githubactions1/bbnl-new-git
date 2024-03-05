const CafEvntStsMdl = require(appRoot + '/server/api/modules/caf/models/CafEvntStsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_CafEvntStsCtrl
* Parameters     : req,res()
* Description    : get details of all CafEventStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CafEvntStsCtrl = function (req, res) {

    CafEvntStsMdl.getCafEvntStsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_CafEvntStsCtrl
* Parameters     : req,res()
* Description    : search details of all CafEventStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_CafEvntStsCtrl = function (req, res) {

    CafEvntStsMdl.srchCafEvntStsMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_CafEvntStsByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  CafEventStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_CafEvntStsByIdCtrl = function (req, res) {

    CafEvntStsMdl.getCafEvntStsByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_CafEvntStsCtrl
* Parameters     : req,res()
* Description    : Add new  CafEventStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_CafEvntStsCtrl = function (req, res) {

    CafEvntStsMdl.insrtCafEvntStsMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_CafEvntStsCtrl
* Parameters     : req,res()
* Description    : Update existing  CafEventStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_CafEvntStsCtrl = function (req, res) {

    CafEvntStsMdl.updteCafEvntStsMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_CafEvntStsCtrl
* Parameters     : req,res()
* Description    : Delete existing  CafEventStatus
* Change History :
* 03/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_CafEvntStsCtrl = function (req, res) {

    CafEvntStsMdl.dlteCafEvntStsMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_CafEvntStsCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_CafEvntStsCtrl', {});
        });
}