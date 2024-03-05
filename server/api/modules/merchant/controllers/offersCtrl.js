const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')



/**************************************************************************************
* Controller     : getMrchntOffrsCtrl
* Parameters     : req,res()
* Description    : get all Offers of merchant/Organization
* Change History :
* 06/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.getMrchntOffrsCtrl = function (req, res) {
    console.log("getMrchntOffrsCtrl")
    merchantMdl.getMrchntOffrsMdl(req.params.mrchntID, req.params.mnu_itm_id, req.user).then(function (results) {
        let offers = []
        let aprvls = []
        let aprvlCnt = 0;
        try {
            _.forIn(_.groupBy(results, 'ofr_id'), (value, key) => {

                _.forIn(value, (values, key) => {
                    aprvls.push({
                        mrcht_usr_id: values['mrcht_usr_id'],
                        aprvl_in: values['arvl_in']
                    })
                    if(values['arvl_in'] == 1){
                        aprvlCnt++;
                    }
                })
                offers.push({
                    ofr_id: value[0].ofr_id,
                    ofr_nm: value[0].ofr_nm,
                    ofr_ctgry_id: value[0].ofr_ctgry_id,
                    drft_in: value[0].drft_in,
                    aprve_in: value[0].aprve_in,
                    pblsh_in: value[0].pblsh_in,
                    ofr_dscn_tx: value[0].ofr_dscn_tx,
                    ofr_imge_url_tx: value[0].ofr_imge_url_tx,
                    usg_lmt: value[0].usg_lmt,
                    efcte_dt: value[0].efcte_dt,
                    expry_dt: value[0].expry_dt,
                    vldty_ct: value[0].vldty_ct,
                    trms_cndn_tx: value[0].trms_cndn_tx,
                    tmplt_id: value[0].tmplt_id,
                    mnu_itm_id: value[0].mnu_itm_id,
                    type: value[0].type,
                    min_aprve_cnt: value[0].min_aprve_cnt,
                    aprvls: aprvls,
                    aprvlCnt:aprvlCnt


                })
                aprvls = []
                aprvlCnt = 0;
            })
        }
        catch (e) {
            console.log("Error", e)
        }
        df.formatSucessRes(req, res, offers, cntxtDtls, '', {});
    }).catch(function (error) {
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
}


/**************************************************************************************
* Controller     : getMrchntOffrsCntrl
* Parameters     : req,res()
* Description    : get merchant offers details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntOffrsCntrl = function (req, res) {
    console.log("getMrchntOffrsCntrl")
    merchantMdl.getMrchntOffrsMdl(req.params.id,null, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : insrtMrchntOffrsCtrl
* Parameters     : req,res()
* Description    : insert offers details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntOffrsCtrl = function (req, res) {
    console.log("insrtMrchntOffrsCtrl")
    merchantMdl.insrtMrchntOffrsMdl(req.body.data, req.user, (err, result) => {
        console.log(result);
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {
            merchantMdl.insrtMrchntOffrRelMdl(req.body.data.mrchntId, result.insertId, req.user).then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
        }
    })

}




/**************************************************************************************
* Controller     : updateMrchntOffrsCtrl
* Parameters     : req,res()
* Description    : update offers details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntOffrsCtrl = function (req, res) {
    console.log("updateMrchntOffrsCtrl")
    merchantMdl.updateMrchntOffrsMdl(req.body.data, req.user, (err, result) => {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {

            merchantMdl.getApprovalCntMdl(req.body.data, req.user, (err, result) => {
                if (err) {
                    df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                }
                else {
                    if (result[0].aprvl_cnt == req.body.data.min_aprve_cnt) {
                        merchantMdl.approveOfferMdl(req.body.data, req.user, (err, result) => {
                            if (err) {
                                df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                            }
                            else {
                                df.formatSucessRes(req, res, result, cntxtDtls, '', {});
                            }
                        })

                    } else {
                        df.formatSucessRes(req, res, result, cntxtDtls, '', {});
                    }

                }
            })
        }
    })
}




/**************************************************************************************
* Controller     : deltMrchntOffrsCtrl
* Parameters     : req,res()
* Description    : delete offers details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntOffrsCtrl = function (req, res) {
    console.log("deltMrchntOffrsCtrl")
    // merchantMdl.deltMrchntOffrsMdl(req.params.id,req.params.mrchntID)
    // .then(function (results) {
    //     df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    // }).catch(function (error) {
    //     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    // });
    merchantMdl.deltMrchntOffrsMdl(req.params.id, req.params.mrchntID, req.user, (err, result) => {
        if (err) {

            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {
            df.formatSucessRes(req, res, result, cntxtDtls, '', {});
        }
    })
}