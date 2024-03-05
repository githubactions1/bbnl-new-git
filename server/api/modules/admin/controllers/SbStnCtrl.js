const SbstnMdl = require(appRoot + '/server/api/modules/admin/models/SbStnMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SbstnCtrl
* Parameters     : req,res()
* Description    : get details of all subStn
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SbstnCtrl = function (req, res) {

    SbstnMdl.getSbstnMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SbstnCtrl
* Parameters     : req,res()
* Description    : search details of all subStn
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SbstnCtrl = function (req, res) {

    SbstnMdl.srchSbstnMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SbstnByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  subStn
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SbstnByIdCtrl = function (req, res) {

    SbstnMdl.getSbstnByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SbstnCtrl
* Parameters     : req,res()
* Description    : Add new  subStn
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SbstnCtrl = function (req, res) {

    SbstnMdl.insrtSbstnMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SbstnCtrl
* Parameters     : req,res()
* Description    : Update existing  subStn
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SbstnCtrl = function (req, res) {

    SbstnMdl.updteSbstnMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SbstnCtrl
* Parameters     : req,res()
* Description    : Delete existing  subStn
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SbstnCtrl = function (req, res) {

    SbstnMdl.dlteSbstnMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SbstnCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SbstnCtrl', {});
        });
}