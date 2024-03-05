const SbstnTypeMdl = require(appRoot + '/server/api/modules/admin/models/SbstnTypeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SbstnTypeCtrl
* Parameters     : req,res()
* Description    : get details of all subStnTyp
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SbstnTypeCtrl = function (req, res) {

    SbstnTypeMdl.getSbstnTypeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SbstnTypeCtrl
* Parameters     : req,res()
* Description    : search details of all subStnTyp
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SbstnTypeCtrl = function (req, res) {

    SbstnTypeMdl.srchSbstnTypeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SbstnTypeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  subStnTyp
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SbstnTypeByIdCtrl = function (req, res) {

    SbstnTypeMdl.getSbstnTypeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SbstnTypeCtrl
* Parameters     : req,res()
* Description    : Add new  subStnTyp
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SbstnTypeCtrl = function (req, res) {

    SbstnTypeMdl.insrtSbstnTypeMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SbstnTypeCtrl
* Parameters     : req,res()
* Description    : Update existing  subStnTyp
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SbstnTypeCtrl = function (req, res) {

    SbstnTypeMdl.updteSbstnTypeMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SbstnTypeCtrl
* Parameters     : req,res()
* Description    : Delete existing  subStnTyp
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SbstnTypeCtrl = function (req, res) {

    SbstnTypeMdl.dlteSbstnTypeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SbstnTypeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SbstnTypeCtrl', {});
        });
}