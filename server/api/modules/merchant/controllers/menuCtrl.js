const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')



/**************************************************************************************
* Controller     : get_mnuitms_Ctrl
* Parameters     : req,res()
* Description    : To get all merchant menu options
* Change History :
* 18/06/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.get_mnuitms_Ctrl = function (req, res) {
    console.log("get_mnuitms_Ctrl")
    merchantMdl.get_mnuitms_Mdl(req.user)
        .then(function (results) {
            var resdata = results;
            if (results && results.length) {

                var zeroParents = [];
                var temp = [];
                for (i = 0; i < resdata.length; i++) {
                    if (resdata[i].prnt_mnu_itm_id == 0) {
                        zeroParents.push(resdata[i]);
                    } else {
                        temp.push(resdata[i]);
                    }
                }

                var app_lst = jsonUtils.uniqueArr(temp, 'mnu_itm_id');
                var groupRes = jsonUtils.groupJsonByKey(app_lst, ['prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'prnt_mnu_icn_tx', 'hdr_in', 'sqnce_id'], ['prnt_mnu_itm_id', 'prnt_mnu_itm_nm', 'mnu_itm_id', 'mnu_itm_nm', 'mnu_itm_icn_tx', 'mnu_itm_url_tx', 'hdr_in', 'dsble_in', 'c_in', 'r_in', 'u_in', 'd_in', 'enble_in'], ["sub_mnus"], 'prnt_mnu_itm_id', 'sqnce_id', 'asc');
                resdata = jsonUtils.concateArr(zeroParents, groupRes);
                resdata = jsonUtils.sortArr(resdata, 'sqnce_id', 'asc');
            }
            return df.formatSucessRes(req, res, resdata, cntxtDtls, '', {});
        }).catch(function (error) {
            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : actve_mnuitm_Ctrl
* Parameters     : req,res()
* Description    : To activate merchant menu options
* Change History :
* 19/06/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.actve_mnuitm_Ctrl = function (req, res) {
    console.log("get_mnuitms_Ctrl")
    merchantMdl.check_mnu(req.user, req.body.data, (err, results, results1) => {
        console.log(results.length)
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else if (results.length == 0) {
            req.body.data.sqnce_id = results1.length + 1
            merchantMdl.insert_mnuitm_Mdl(req.user, req.body.data)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        }

        else if (results.length > 0) {
            merchantMdl.actve_mnuitm_Mdl(req.user, req.body.data)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        }

    })

}
/**************************************************************************************
* Controller     : actve_mnuitm_Ctrl
* Parameters     : req,res()
* Description    : To activate merchant menu options
* Change History :
* 19/06/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.inactve_mnuitm_Ctrl = function (req, res) {
    console.log("get_mnuitms_Ctrl")
    merchantMdl.inactve_mnuitm_Mdl(req.user, req.params.id)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : updt_sqnce_mnu
* Parameters     : req,res()
* Description    : To update sqnce merchant menu options
* Change History :
* 19/06/2019    - Sravani - Initial Function
*
***************************************************************************************/
exports.updt_sqnce_mnu = function (req, res) {
    console.log("get_mnuitms_Ctrl")
    merchantMdl.updt_sqnce_mnu_mdl(req.user, req.body.data, (err, results) => {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else if (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }

    })
}



/***************************************************************************************/
exports.get_profiles_Ctrl = function (req, res) {
    console.log("user profiles Cntrl")
    merchantMdl.get_profilesMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
