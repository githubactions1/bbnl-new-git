const SprtTcktSbCtgryMdl = require(appRoot + '/server/api/modules/support/models/SprtTcktSbCtgryMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtTcktSbCtgryCtrl
* Parameters     : req,res()
* Description    : get details of all Sub-Category
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtTcktSbCtgryCtrl = function (req, res) {

    SprtTcktSbCtgryMdl.getSprtTcktSbCtgryMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtTcktSbCtgryCtrl
* Parameters     : req,res()
* Description    : search details of all Sub-Category
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtTcktSbCtgryCtrl = function (req, res) {

    SprtTcktSbCtgryMdl.srchSprtTcktSbCtgryMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtTcktSbCtgryByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Sub-Category
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtTcktSbCtgryByIdCtrl = function (req, res) {

    SprtTcktSbCtgryMdl.getSprtTcktSbCtgryByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtTcktSbCtgryCtrl
* Parameters     : req,res()
* Description    : Add new  Sub-Category
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtTcktSbCtgryCtrl = function (req, res) {

    SprtTcktSbCtgryMdl.insrtSprtTcktSbCtgryMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtTcktSbCtgryCtrl
* Parameters     : req,res()
* Description    : Update existing  Sub-Category
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtTcktSbCtgryCtrl = function (req, res) {

    SprtTcktSbCtgryMdl.updteSprtTcktSbCtgryMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtTcktSbCtgryCtrl
* Parameters     : req,res()
* Description    : Delete existing  Sub-Category
* Change History :
* 28/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtTcktSbCtgryCtrl = function (req, res) {

    SprtTcktSbCtgryMdl.dlteSprtTcktSbCtgryMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SprtTcktSbCtgryCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SprtTcktSbCtgryCtrl', {});
        });
}