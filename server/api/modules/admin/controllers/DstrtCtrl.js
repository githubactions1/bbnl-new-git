const DstrtMdl = require(appRoot + '/server/api/modules/admin/models/DstrtMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_DstrtCtrl
* Parameters     : req,res()
* Description    : get details of all districts
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_DstrtCtrl = function (req, res) {

    DstrtMdl.getDstrtMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_DstrtCtrl
* Parameters     : req,res()
* Description    : search details of all districts
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_DstrtCtrl = function (req, res) {

    DstrtMdl.srchDstrtMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_DstrtByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  districts
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_DstrtByIdCtrl = function (req, res) {

    DstrtMdl.getDstrtByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_DstrtBySteIdCtrl
* Parameters     : req,res()
* Description    : get details of   districts by state ID
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_DstrtBySteIdCtrl = function (req, res) {

    DstrtMdl.get_DstrtBySteIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_DstbySteCtrl
* Parameters     : req,res()
* Description    : get details of single  districts
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_DstbySteCtrl = function (req, res) {

    DstrtMdl.getDstbySteMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrt_DstrtCtrl
* Parameters     : req,res()
* Description    : Add new  districts
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_DstrtCtrl = function (req, res) {

    DstrtMdl.insrtDstrtMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_DstrtCtrl
* Parameters     : req,res()
* Description    : Update existing  districts
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_DstrtCtrl = function (req, res) {

    DstrtMdl.updteDstrtMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_DstrtCtrl
* Parameters     : req,res()
* Description    : Delete existing  districts
* Change History :
* 06/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_DstrtCtrl = function (req, res) {

    DstrtMdl.dlteDstrtMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_DstrtCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_DstrtCtrl', {});
        });
}