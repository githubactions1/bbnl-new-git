const BrdcrMdl = require(appRoot + '/server/api/modules/package/models/BrdcrMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_BrdcrCtrl
* Parameters     : req,res()
* Description    : get details of all Broadcasters
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_BrdcrCtrl = function (req, res) {

    BrdcrMdl.getBrdcrMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_BrdcrCtrl
* Parameters     : req,res()
* Description    : search details of all Broadcasters
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_BrdcrCtrl = function (req, res) {

    BrdcrMdl.srchBrdcrMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_BrdcrByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Broadcasters
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_BrdcrByIdCtrl = function (req, res) {

    BrdcrMdl.getBrdcrByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_BrdcrCtrl
* Parameters     : req,res()
* Description    : Add new  Broadcasters
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_BrdcrCtrl = function (req, res) {

    BrdcrMdl.insrtBrdcrMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_BrdcrCtrl
* Parameters     : req,res()
* Description    : Update existing  Broadcasters
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_BrdcrCtrl = function (req, res) {

    BrdcrMdl.updteBrdcrMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_BrdcrCtrl
* Parameters     : req,res()
* Description    : Delete existing  Broadcasters
* Change History :
* 04/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_BrdcrCtrl = function (req, res) {

    BrdcrMdl.dlteBrdcrMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_BrdcrCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_BrdcrCtrl', {});
        });
}