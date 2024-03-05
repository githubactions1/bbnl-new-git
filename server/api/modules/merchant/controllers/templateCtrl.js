const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')



/**************************************************************************************
* Controller     : getTemplatesCtrl
* Parameters     : req,res()
* Description    : get all templates of merchant/Organization
* Change History :
* 13/06/2019    -  Ramya Machana  - Initial Function
*
***************************************************************************************/

exports.getTemplatesCtrl = function (req, res) {
    console.log("getTemplatesCtrl")
    merchantMdl.getTemplatesMdl(req.user).then(function (results) {
        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    }).catch(function (error) {
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}
/**************************************************************************************
* Controller     : getTemplateDtlsCtrl
* Parameters     : req,res()
* Description    : get template detals by template id
* Change History :
* 13/06/2019    -  Ramya Machana  - Initial Function
*
***************************************************************************************/

exports.getTemplateDtlsCtrl = function (req, res) {
    console.log("getTemplateDtlsCtrl")
    merchantMdl.getTemplatesDtlsMdl(req.params.tmpltId, req.user).then(function (results) {
        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    }).catch(function (error) {
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}


/**************************************************************************************
* Controller     : insrtTemplateDtlsCtrl
* Parameters     : req,res()
* Description    : insert template details
* Change History :
* 15/06/2019    -  Ramya Machana  - Initial Function
*
***************************************************************************************/

exports.insrtTemplateDtlsCtrl = function (req, res) {
    console.log("insrtTemplateDtlsCtrl")
    merchantMdl.insrtTemplateDtlsMdl(req.body, req.user, (err, results) => {
        console.log(results)
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else if (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});

        }
    })
}
