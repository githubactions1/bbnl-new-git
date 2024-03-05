const EntrpeCstmrSubTypMdl = require(appRoot + '/server/api/modules/caf/models/EntrpeCstmrSubTypMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_EntrpeCstmrSubTypCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrSubTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_EntrpeCstmrSubTypCtrl = function (req, res) {

    EntrpeCstmrSubTypMdl.getEntrpeCstmrSubTypMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_EntrpeCstmrSubTypCtrl
* Parameters     : req,res()
* Description    : search details of all EntrpeCstmrSubTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_EntrpeCstmrSubTypCtrl = function (req, res) {

    EntrpeCstmrSubTypMdl.srchEntrpeCstmrSubTypMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_EntrpeCstmrSubTypByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  EntrpeCstmrSubTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_EntrpeCstmrSubTypByIdCtrl = function (req, res) {

    EntrpeCstmrSubTypMdl.getEntrpeCstmrSubTypByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_EntrpeCstmrSubTypByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  EntrpeCstmrSubTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_EntCstmrSubTypByIdCtrl = function (req, res) {

    EntrpeCstmrSubTypMdl.get_EntCstmrSubTypByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_EntrpeCstmrSubTypCtrl
* Parameters     : req,res()
* Description    : Add new  EntrpeCstmrSubTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_EntrpeCstmrSubTypCtrl = function (req, res) {

    EntrpeCstmrSubTypMdl.insrtEntrpeCstmrSubTypMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_EntrpeCstmrSubTypCtrl
* Parameters     : req,res()
* Description    : Update existing  EntrpeCstmrSubTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_EntrpeCstmrSubTypCtrl = function (req, res) {

    EntrpeCstmrSubTypMdl.updteEntrpeCstmrSubTypMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_EntrpeCstmrSubTypCtrl
* Parameters     : req,res()
* Description    : Delete existing  EntrpeCstmrSubTyp
* Change History :
* 17/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_EntrpeCstmrSubTypCtrl = function (req, res) {

    EntrpeCstmrSubTypMdl.dlteEntrpeCstmrSubTypMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_EntrpeCstmrSubTypCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_EntrpeCstmrSubTypCtrl', {});
        });
}