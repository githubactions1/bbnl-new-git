const MndlMdl = require(appRoot + '/server/api/modules/admin/models/MndlMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_MndlCtrl
* Parameters     : req,res()
* Description    : get details of all mandals
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_MndlCtrl = function (req, res) {

    MndlMdl.getMndlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_MndlCtrl
* Parameters     : req,res()
* Description    : search details of all mandals
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_MndlCtrl = function (req, res) {

    MndlMdl.srchMndlMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_MndlByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  mandals
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_MndlByIdCtrl = function (req, res) {

    MndlMdl.getMndlByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_MndlBydstIdCtrl
* Parameters     : req,res()
* Description    : get details of single  mandals
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_MndlBydstIdCtrl = function (req, res) {

    MndlMdl.get_MndlByDstIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_MndlbyDstCtrl
* Parameters     : req,res()
* Description    : get details of single  mandals
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_MndlbyDstCtrl = function (req, res) {

    MndlMdl.getMndlbyDstMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrt_MndlCtrl
* Parameters     : req,res()
* Description    : Add new  mandals
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_MndlCtrl = function (req, res) {

    MndlMdl.insrtMndlMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_MndlCtrl
* Parameters     : req,res()
* Description    : Update existing  mandals
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_MndlCtrl = function (req, res) {

    MndlMdl.updteMndlMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_MndlCtrl
* Parameters     : req,res()
* Description    : Delete existing  mandals
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_MndlCtrl = function (req, res) {

    MndlMdl.dlteMndlMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_MndlCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_MndlCtrl', {});
        });
}