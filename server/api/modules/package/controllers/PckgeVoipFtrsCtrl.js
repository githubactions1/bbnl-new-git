const PckgeVoipFtrsMdl = require(appRoot + '/server/api/modules/package/models/PckgeVoipFtrsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_PckgeVoipFtrsCtrl
* Parameters     : req,res()
* Description    : get details of all pckgevoipFeatures
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeVoipFtrsCtrl = function (req, res) {

    PckgeVoipFtrsMdl.getPckgeVoipFtrsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_PckgeVoipFtrsCtrl
* Parameters     : req,res()
* Description    : search details of all pckgevoipFeatures
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_PckgeVoipFtrsCtrl = function (req, res) {

    PckgeVoipFtrsMdl.srchPckgeVoipFtrsMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_PckgeVoipFtrsByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  pckgevoipFeatures
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeVoipFtrsByIdCtrl = function (req, res) {

    PckgeVoipFtrsMdl.getPckgeVoipFtrsByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_PckgeVoipFtrsCtrl
* Parameters     : req,res()
* Description    : Add new  pckgevoipFeatures
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_PckgeVoipFtrsCtrl = function (req, res) {

    PckgeVoipFtrsMdl.insrtPckgeVoipFtrsMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_PckgeVoipFtrsCtrl
* Parameters     : req,res()
* Description    : Update existing  pckgevoipFeatures
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_PckgeVoipFtrsCtrl = function (req, res) {

    PckgeVoipFtrsMdl.updtePckgeVoipFtrsMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_PckgeVoipFtrsCtrl
* Parameters     : req,res()
* Description    : Delete existing  pckgevoipFeatures
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_PckgeVoipFtrsCtrl = function (req, res) {

    PckgeVoipFtrsMdl.dltePckgeVoipFtrsMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_PckgeVoipFtrsCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_PckgeVoipFtrsCtrl', {});
        });
}