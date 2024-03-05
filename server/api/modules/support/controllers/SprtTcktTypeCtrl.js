const SprtTcktTypeMdl = require(appRoot + '/server/api/modules/support/models/SprtTcktTypeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtTcktTypeCtrl
* Parameters     : req,res()
* Description    : get details of all Ticket-Type
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtTcktTypeCtrl = function (req, res) {

    SprtTcktTypeMdl.getSprtTcktTypeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtTcktTypeCtrl
* Parameters     : req,res()
* Description    : search details of all Ticket-Type
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtTcktTypeCtrl = function (req, res) {

    SprtTcktTypeMdl.srchSprtTcktTypeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtTcktTypeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Ticket-Type
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtTcktTypeByIdCtrl = function (req, res) {

    SprtTcktTypeMdl.getSprtTcktTypeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtTcktTypeCtrl
* Parameters     : req,res()
* Description    : Add new  Ticket-Type
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtTcktTypeCtrl = function (req, res) {

    SprtTcktTypeMdl.insrtSprtTcktTypeMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtTcktTypeCtrl
* Parameters     : req,res()
* Description    : Update existing  Ticket-Type
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtTcktTypeCtrl = function (req, res) {

    SprtTcktTypeMdl.updteSprtTcktTypeMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtTcktTypeCtrl
* Parameters     : req,res()
* Description    : Delete existing  Ticket-Type
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtTcktTypeCtrl = function (req, res) {

    SprtTcktTypeMdl.dlteSprtTcktTypeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SprtTcktTypeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SprtTcktTypeCtrl', {});
        });
}