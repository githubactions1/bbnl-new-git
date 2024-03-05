const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')

/**************************************************************************************
* Controller     : merch_get_locC
* Parameters     : req,res()
* Description    : To get all merchant locations
* Change History :
* 03/05/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.merch_get_locC = function (req, res) {
    console.log("getloc")
    merchantMdl.merch_get_locM(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : merch_add_locC
* Parameters     : req,res()
* Description    : To insert merchant locations
* Change History :
* 03/05/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.merch_add_locC = function (req, res) {
    console.log("merch_add_locC")
    merchantMdl.merch_add_locM(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : merch_updt_locC
* Parameters     : req,res()
* Description    : To update merchant locations
* Change History :
* 03/05/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.merch_updt_locC = function (req, res) {
    console.log("merch_updt_loc")
    merchantMdl.merch_updt_locM(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : merch_del_locC
* Parameters     : req,res()
* Description    : To delete merchant locations
* Change History :
* 03/05/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.merch_del_locC = function (req, res) {
    console.log("merch_del_locC")
    merchantMdl.merch_del_locM(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




