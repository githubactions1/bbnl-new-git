const VlgeMdl = require(appRoot + '/server/api/modules/admin/models/VlgeMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_VlgeCtrl
* Parameters     : req,res()
* Description    : get details of all villages
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_VlgeCtrl = function (req, res) {

    VlgeMdl.getVlgeMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_VlgeCtrl
* Parameters     : req,res()
* Description    : search details of all villages
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_VlgeCtrl = function (req, res) {

    VlgeMdl.srchVlgeMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_VlgeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  villages
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_VlgeByIdCtrl = function (req, res) {

    VlgeMdl.getVlgeByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_VlgeByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  villages
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_VlgeByMndlIdCtrl = function (req, res) {

    VlgeMdl.get_VlgeByMndlIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrt_VlgeCtrl
* Parameters     : req,res()
* Description    : Add new  villages
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_VlgeCtrl = function (req, res) {

    VlgeMdl.insrtVlgeMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_VlgeCtrl
* Parameters     : req,res()
* Description    : Update existing  villages
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_VlgeCtrl = function (req, res) {

    VlgeMdl.updteVlgeMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_VlgeCtrl
* Parameters     : req,res()
* Description    : Delete existing  villages
* Change History :
* 07/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_VlgeCtrl = function (req, res) {

    VlgeMdl.dlteVlgeMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_VlgeCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_VlgeCtrl', {});
        });
}