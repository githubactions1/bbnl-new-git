const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')




/**************************************************************************************
* Controller     : getMrchntDshbrdCntrl
* Parameters     : req,res()
* Description    : get merchant dashboard counts
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntDshbrdCntrl = function (req, res) {
    console.log("getMrchntDshbrdCntrl")
    merchantMdl.getMrchntDshbrdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : getMrchntDshbrdDtlsCntrl
* Parameters     : req,res()
* Description    : get dashboard counts with outlet id
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntDshbrdDtlsCntrl = function (req, res) {
    console.log("getMrchntDshbrdDtlsCntrl")
    merchantMdl.getMrchntDshbrdDtlsMdl(req.params.id, req.params.otletId, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





