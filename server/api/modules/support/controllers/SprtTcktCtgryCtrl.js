const SprtTcktCtgryMdl = require(appRoot + '/server/api/modules/support/models/SprtTcktCtgryMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SprtTcktCtgryCtrl
* Parameters     : req,res()
* Description    : get details of all Category
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtTcktCtgryCtrl = function (req, res) {

    SprtTcktCtgryMdl.getSprtTcktCtgryMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SprtTcktCtgryCtrl
* Parameters     : req,res()
* Description    : search details of all Category
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SprtTcktCtgryCtrl = function (req, res) {

    SprtTcktCtgryMdl.srchSprtTcktCtgryMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SprtTcktCtgryByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Category
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SprtTcktCtgryByIdCtrl = function (req, res) {

    SprtTcktCtgryMdl.getSprtTcktCtgryByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SprtTcktCtgryCtrl
* Parameters     : req,res()
* Description    : Add new  Category
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SprtTcktCtgryCtrl = function (req, res) {

    SprtTcktCtgryMdl.insrtSprtTcktCtgryMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SprtTcktCtgryCtrl
* Parameters     : req,res()
* Description    : Update existing  Category
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SprtTcktCtgryCtrl = function (req, res) {

    SprtTcktCtgryMdl.updteSprtTcktCtgryMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SprtTcktCtgryCtrl
* Parameters     : req,res()
* Description    : Delete existing  Category
* Change History :
* 27/04/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SprtTcktCtgryCtrl = function (req, res) {

    SprtTcktCtgryMdl.dlteSprtTcktCtgryMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SprtTcktCtgryCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SprtTcktCtgryCtrl', {});
        });
}