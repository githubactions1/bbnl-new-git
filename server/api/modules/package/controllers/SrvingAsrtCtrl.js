const SrvingAsrtMdl = require(appRoot + '/server/api/modules/package/models/SrvingAsrtMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : get_SrvingAsrtCtrl
* Parameters     : req,res()
* Description    : get details of all Srvngasrtlst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SrvingAsrtCtrl = function (req, res) {

    SrvingAsrtMdl.getSrvingAsrtMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_SrvingAsrtCtrl
* Parameters     : req,res()
* Description    : search details of all Srvngasrtlst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_SrvingAsrtCtrl = function (req, res) {

    SrvingAsrtMdl.srchSrvingAsrtMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_SrvingAsrtByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  Srvngasrtlst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_SrvingAsrtByIdCtrl = function (req, res) {

    SrvingAsrtMdl.getSrvingAsrtByIdMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_SrvingAsrtCtrl
* Parameters     : req,res()
* Description    : Add new  Srvngasrtlst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_SrvingAsrtCtrl = function (req, res) {

    SrvingAsrtMdl.insrtSrvingAsrtMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_SrvingAsrtCtrl
* Parameters     : req,res()
* Description    : Update existing  Srvngasrtlst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_SrvingAsrtCtrl = function (req, res) {

    SrvingAsrtMdl.updteSrvingAsrtMdl(req.body.data,req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : dlte_SrvingAsrtCtrl
* Parameters     : req,res()
* Description    : Delete existing  Srvngasrtlst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_SrvingAsrtCtrl = function (req, res) {

    SrvingAsrtMdl.dlteSrvingAsrtMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req,res, results, cntxtDtls, 'dlte_SrvingAsrtCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req,res, error, cntxtDtls, 'dlte_SrvingAsrtCtrl', {});
        });
}