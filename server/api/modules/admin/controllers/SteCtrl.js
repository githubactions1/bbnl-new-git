const SteMdl = require(appRoot + '/server/api/modules/admin/models/SteMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SteCtrl
* Parameters     : req,res()
* Description    : get details of all states
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SteCtrl = function (req, res) {

    SteMdl.getSteMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SteCtrl
* Parameters     : req,res()
* Description    : search details of all states
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SteCtrl = function (req, res) {

    SteMdl.srchSteMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SteByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  states
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SteByIdCtrl = function (req, res) {

    SteMdl.getSteByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SteCtrl
* Parameters     : req,res()
* Description    : Add new  states
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SteCtrl = function (req, res) {

    SteMdl.insrtSteMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SteCtrl
* Parameters     : req,res()
* Description    : Update existing  states
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SteCtrl = function (req, res) {

    SteMdl.updteSteMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SteCtrl
* Parameters     : req,res()
* Description    : Delete existing  states
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SteCtrl = function (req, res) {

    SteMdl.dlteSteMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SteCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SteCtrl', {});
        });
}