const BlngFrqncyMdl = require(appRoot + '/server/api/modules/crm/enterpriseCustomer/models/BlngFrqncyMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_BlngFrqncyCtrl
* Parameters     : req,res()
* Description    : get details of all billing Frequency
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_BlngFrqncyCtrl = function (req, res) {

    BlngFrqncyMdl.getBlngFrqncyMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_BlngFrqncyCtrl
* Parameters     : req,res()
* Description    : search details of all billing Frequency
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_BlngFrqncyCtrl = function (req, res) {

    BlngFrqncyMdl.srchBlngFrqncyMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_BlngFrqncyByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  billing Frequency
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_BlngFrqncyByIdCtrl = function (req, res) {

    BlngFrqncyMdl.getBlngFrqncyByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_BlngFrqncyCtrl
* Parameters     : req,res()
* Description    : Add new  billing Frequency
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_BlngFrqncyCtrl = function (req, res) {

    BlngFrqncyMdl.insrtBlngFrqncyMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_BlngFrqncyCtrl
* Parameters     : req,res()
* Description    : Update existing  billing Frequency
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_BlngFrqncyCtrl = function (req, res) {

    BlngFrqncyMdl.updteBlngFrqncyMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_BlngFrqncyCtrl
* Parameters     : req,res()
* Description    : Delete existing  billing Frequency
* Change History :
* 29/01/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_BlngFrqncyCtrl = function (req, res) {

    BlngFrqncyMdl.dlteBlngFrqncyMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_BlngFrqncyCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_BlngFrqncyCtrl', {});
        });
}

/**************************************************************************************
* Controller     : getDepartmentNamesCtrl
* Parameters     : req,res()
* Description    : get details of all billing Frequency
* Change History :
* 11/07/2023    -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getDepartmentNamesCtrl = function (req, res) {

    BlngFrqncyMdl.getDepartmentNamesMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}