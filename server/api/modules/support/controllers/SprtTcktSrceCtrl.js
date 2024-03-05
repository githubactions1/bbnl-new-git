const SprtTcktSrceMdl = require(appRoot + '/server/api/modules/support/models/SprtTcktSrceMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtTcktSrceCtrl
* Parameters     : req,res()
* Description    : get details of all Ticket-Source
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtTcktSrceCtrl = function (req, res) {

    SprtTcktSrceMdl.getSprtTcktSrceMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtTcktSrceCtrl
* Parameters     : req,res()
* Description    : search details of all Ticket-Source
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtTcktSrceCtrl = function (req, res) {

    SprtTcktSrceMdl.srchSprtTcktSrceMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtTcktSrceByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Ticket-Source
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtTcktSrceByIdCtrl = function (req, res) {

    SprtTcktSrceMdl.getSprtTcktSrceByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtTcktSrceCtrl
* Parameters     : req,res()
* Description    : Add new  Ticket-Source
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtTcktSrceCtrl = function (req, res) {

    SprtTcktSrceMdl.insrtSprtTcktSrceMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtTcktSrceCtrl
* Parameters     : req,res()
* Description    : Update existing  Ticket-Source
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtTcktSrceCtrl = function (req, res) {

    SprtTcktSrceMdl.updteSprtTcktSrceMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtTcktSrceCtrl
* Parameters     : req,res()
* Description    : Delete existing  Ticket-Source
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtTcktSrceCtrl = function (req, res) {

    SprtTcktSrceMdl.dlteSprtTcktSrceMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SprtTcktSrceCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SprtTcktSrceCtrl', {});
        });
}