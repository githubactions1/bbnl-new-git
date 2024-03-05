const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')




/**************************************************************************************
* Controller     : insrtMrchntApprvlCtrl
* Parameters     : req,res()
* Description    : insert template details
* Change History :
* 15/06/2019    -  Seetharam - Initial Function
*
***************************************************************************************/

exports.insrtMrchntApprvlCtrl = function (req, res) {
    console.log("insrtMrchntApprvlCtrl")
    merchantMdl.insrtMrchntApprvlMdl(req.body.data, req.user, (err, results) => {
        console.log(results)
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else if (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});

        }
    })
}
