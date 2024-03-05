const SprtStsMdl = require(appRoot + '/server/api/modules/support/models/SprtStsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtStsCtrl
* Parameters     : req,res()
* Description    : get details of all Ticket-Type
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtStsCtrl = function (req, res) {

    SprtStsMdl.getSprtStsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtStsCtrl
* Parameters     : req,res()
* Description    : search details of all Ticket-Type
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtStsCtrl = function (req, res) {

    SprtStsMdl.srchSprtStsMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtStsByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Ticket-Type
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtStsByIdCtrl = function (req, res) {

    SprtStsMdl.getSprtStsByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtStsCtrl
* Parameters     : req,res()
* Description    : Add new  Ticket-Type
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtStsCtrl = function (req, res) {

    SprtStsMdl.insrtSprtStsMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtStsCtrl
* Parameters     : req,res()
* Description    : Update existing  Ticket-Type
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtStsCtrl = function (req, res) {

    SprtStsMdl.updteSprtStsMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtStsCtrl
* Parameters     : req,res()
* Description    : Delete existing  Ticket-Type
* Change History :
* 01/09/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtStsCtrl = function (req, res) {

    SprtStsMdl.dlteSprtStsMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SprtStsCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SprtStsCtrl', {});
        });
}