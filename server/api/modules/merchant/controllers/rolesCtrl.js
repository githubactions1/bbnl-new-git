const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')




/**************************************************************************************
* Controller     : get_mrchnt_roles
* Parameters     : req,res()
* Description    : To get all merchant roles
* Change History :
* 03/05/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.get_mrchnt_roles = function (req, res) {
    merchantMdl.get_mrchnt_rolesM(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_mrchnt_roles
* Parameters     : req,res()
* Description    : To insert merchant roles
* Change History :
* 03/05/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.insrt_mrchnt_roles = function (req, res) {
    merchantMdl.insrt_mrchnt_rolesM(req.body.data, req.user,(err, results) => {
        if (err) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        }
        else if (results) {
            let id = results.insertId
            merchantMdl.insrt_mrchnt_usr_rel(id, req.body.data, req.user, (err, results) => {
                if (err) {
                    df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                }
                else if (results) {
                    merchantMdl.insrt_mrcht_usr_mnus(id, req.body.data, req.user,(err, results) => {
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
    })

}

/**************************************************************************************
* Controller     : updt_mrchnt_roles
* Parameters     : req,res()
* Description    : To update merchant roles
* Change History :
* 03/05/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.updt_mrchnt_roles = function (req, res) {
    merchantMdl.updt_mrchnt_rolesM(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

