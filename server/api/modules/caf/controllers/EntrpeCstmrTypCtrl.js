const EntrpeCstmrTypMdl = require(appRoot + '/server/api/modules/caf/models/EntrpeCstmrTypMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.getEntrpeCstmrTypMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getEntrpeCstmrillibbTypCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/11/2023    -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getEntrpeCstmrillibbTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.getEntrpeCstmrillibbTypMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : search details of all EntrpeCstmrTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.srchEntrpeCstmrTypMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_EntrpeCstmrTypByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  EntrpeCstmrTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_EntrpeCstmrTypByIdCtrl = function (req, res) {

    EntrpeCstmrTypMdl.getEntrpeCstmrTypByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : Add new  EntrpeCstmrTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.insrtEntrpeCstmrTypMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : Update existing  EntrpeCstmrTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.updteEntrpeCstmrTypMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_EntrpeCstmrTypCtrl
* Parameters     : req,res()
* Description    : Delete existing  EntrpeCstmrTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_EntrpeCstmrTypCtrl = function (req, res) {

    EntrpeCstmrTypMdl.dlteEntrpeCstmrTypMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_EntrpeCstmrTypCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_EntrpeCstmrTypCtrl', {});
        });
}