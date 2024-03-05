const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')




/**************************************************************************************
* Controller     : insrt_membr_Ctrl
* Parameters     : req,res()
* Description    : insert members
* Change History :
* 22/05/2019    -  sravani M  - Initial Function
*
***************************************************************************************/

exports.insrt_membr_Ctrl = function (req, res) {
    console.log("insertmember")
    merchantMdl.insrt_membr_Mdl(req.body.data,req.user, (err, results) => {
        console.log(results)
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else if (results) {
            console.log(results)
            merchantMdl.usr_mem_rel_Mdl(results.insertId, req.body.data,req.user, (err, results) => {
                if (err) {
                    df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                }
                else if (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});

                }
            })
        }
    })

}

