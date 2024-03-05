const SprtCtlgeMdl = require(appRoot + '/server/api/modules/support/models/SprtCtlgeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtCtlgeCtrl
* Parameters     : req,res()
* Description    : get details of all Support ticket Catalogue
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtCtlgeCtrl = function (req, res) {

    SprtCtlgeMdl.getSprtCtlgeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtCtlgeCtrl
* Parameters     : req,res()
* Description    : search details of all Support ticket Catalogue
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtCtlgeCtrl = function (req, res) {

    SprtCtlgeMdl.srchSprtCtlgeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtCtlgeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Support ticket Catalogue
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtCtlgeByIdCtrl = function (req, res) {

    SprtCtlgeMdl.getSprtCtlgeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtCtlgeCtrl
* Parameters     : req,res()
* Description    : Add new  Support ticket Catalogue
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtCtlgeCtrl = function (req, res) {

    SprtCtlgeMdl.insrtSprtCtlgeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtCtlgeCtrl
* Parameters     : req,res()
* Description    : Update existing  Support ticket Catalogue
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtCtlgeCtrl = function (req, res) {

    SprtCtlgeMdl.updteSprtCtlgeMdl(req.body,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtCtlgeCtrl
* Parameters     : req,res()
* Description    : Delete existing  Support ticket Catalogue
* Change History :
* 08/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtCtlgeCtrl = function (req, res) {

    SprtCtlgeMdl.dlteSprtCtlgeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, 'dlte_SprtCtlgeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, 'dlte_SprtCtlgeCtrl', {});
        });
}