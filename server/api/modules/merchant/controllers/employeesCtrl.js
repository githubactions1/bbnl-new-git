const merchantMdl = require(appRoot + '/server/api/modules/merchant/models/merchantMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash')





/**************************************************************************************
* Controller     : getMrchntEmplsLstCntrl
* Parameters     : req,res()
* Description    : get employes list based on merchant id
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/
var calc_lne_val = (data) => {
    let lne = {
        hra: 0,
        pf: 0,
        esi: 0,
        basic: 0,
    }
    data.filter((k) => {
        if (k.prl_lne_itm_cd == "HRA") {
            lne.hra = k.prsntg;
        }
        else if (k.prl_lne_itm_cd == "BASIC") {
            lne.basic = k.prsntg;
        }
        else if (k.prl_lne_itm_cd == "PF") {
            lne.pf = k.prsntg;
        }
        else if (k.prl_lne_itm_cd == "ESI") {
            lne.esi = k.prsntg;
        }
    })
    return lne;
}

exports.getMrchntEmplsLstCntrl = function (req, res) {
    console.log("getMrchntEmplsLstCntrl")
    merchantMdl.getMrchntEmplsLstMdl(req.params.id, req.user)
        .then(function (results) {
            let data = []
            _.forIn(_.groupBy(results, 'emple_id'), (value, key) => {
                data.push({
                    emple_id: value[0].emple_id,
                    emple_nu: value[0].emple_nu,
                    fst_nm: value[0].fst_nm,
                    lst_nm: value[0].lst_nm,
                    eml_tx: value[0].eml_tx,
                    wrk_eml_ts: value[0].wrk_eml_ts,
                    mble_ph: value[0].mble_ph,
                    wrk_ph: value[0].wrk_ph,
                    imge_url_tx: value[0].imge_url_tx,
                    jne_dt: value[0].jne_dt,
                    rlvng_dt: value[0].rlvng_dt,
                    pn_crd_nu: value[0].pn_crd_nu,
                    bnk_act_nu: value[0].bnk_act_nu,
                    bnk_ifsc_cd: value[0].bnk_ifsc_cd,
                    bnk_id: value[0].bnk_id,
                    esi_act_nu: value[0].esi_act_nu,
                    pf_act_nu: value[0].pf_act_nu,
                    emplt_ctry_id: value[0].emplt_ctry_id,
                    adhr_nu: value[0].adhr_nu,
                    addr1_tx: value[0].addr1_tx,
                    addr2_tx: value[0].addr2_tx,
                    crte_usr_id: value[0].crte_usr_id,
                    updte_usr_id: value[0].updte_usr_id,
                    a_in: value[0].a_in,
                    dsgn_id: value[0].dsgn_id,
                    dsgn_nm: value[0].dsgn_nm,
                    dprnt_nm: value[0].dprnt_nm,
                    mrcht_usr_id: value[0].mrcht_usr_id,
                    mrcht_usr_nm: value[0].mrcht_usr_nm,
                    rle_id: value[0].rle_id,
                    rle_nm: value[0].rle_nm,
                    lne_dtls: calc_lne_val(value),
                    bsc_slry: value[0].basic,
                    hra: value[0].hra,
                    esi: value[0].esi,
                    pf: value[0].pf,
                    ctc: value[0].ctc,
                    mnthly_grss: value[0].mnthly_grss,
                    day_wgs: value[0].dly_wgs,
                    slyCtgryId: value[0].slry_ctgry_id,
                    prmnt_in: value[0].is_prmnt_in,
                    otlt_id: value[0].otlt_id,
                    dprnt_id: value[0].dprnt_id,
                    slry_crdt_bnk_id: value[0].slry_crdt_bnk_id,
                })
            })
            df.formatSucessRes(req, res, data, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : setMrchntEmpCtrl
* Parameters     : req,res()
* Description    : set(insert) employes list based on merchant id
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntEmpCtrl = function (req, res) {
    console.log("insrtMrchntEmpCtrl")
    merchantMdl.insrtMrchntEmpMdl(req.body.data, req.user, function (err, results) {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {
            merchantMdl.insrtMrchntEmpRelMdl(results.insertId, req.body.data, req.user, function (err, ins_results) {
                if (err) {
                    df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                }
                else {
                    // merchantMdl.insrtEmpSlryBrkp(results.insertId, req.body.data, function (err, results) {
                    //     if (err) {
                    df.formatSucessRes(req, res, ins_results, cntxtDtls, '', {});
                    // }
                    // else {
                    //     df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    // }
                    // })

                }
            })


        }
    })
}



/**************************************************************************************
* Controller     : updateMrchntEmpCtrl
* Parameters     : req,res()
* Description    : update merchant employee
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntEmpCtrl = function (req, res) {
    console.log("updateMrchntEmpCtrl.................")
    merchantMdl.updateMrchntEmpMdl(req.body.data, req.user, (upd_err, results) => {
        if (upd_err) {
            console.log("------------------------5")
            df.formatErrorRes(req, res, upd_err, cntxtDtls, '', {});
        }
        else {
            merchantMdl.udtMrchntEmpRelMdl(req.body.data, req.user, function (emp_err, ins_results) {
                if (emp_err) {
                    console.log("------------------------4")
                    df.formatErrorRes(req, res, emp_err, cntxtDtls, '', {});
                }
                else {
                    if (req.body.data && req.body.data.sly_cmp_in == 1) {
                        merchantMdl.updtSlyCmpTable(req.body.data, req.user)
                            .then(function (results) {
                                console.log(results)
                                console.log("------------------------2")
                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                            }).catch(function (error) {
                                console.log(error)
                                console.log("------------------------3")
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    }
                    else {
                        console.log("------------------------1")
                        df.formatSucessRes(req, res, ins_results, cntxtDtls, '', {});
                    }
                }
            })
        }
    })
}



/**************************************************************************************
* Controller     : deltMrchntEmpCtrl
* Parameters     : req,res()
* Description    : delete merchant employee
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntEmpCtrl = function (req, res) {
    console.log("deltMrchntEmpCtrl")
    merchantMdl.deltMrchntEmpMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getMrchntEmpbyGrpsCtrl
* Parameters     : req,res()
* Description    : get employes groups based on merchant id
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntEmpbyGrpsCtrl = function (req, res) {
    console.log("getMrchntEmpbyGrpsCtrl")
    merchantMdl.getMrchntEmpbyGrpsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getMrchntEmpGrpsCtrl
* Parameters     : req,res()
* Description    : get employes groups based on merchant id
* Change History :
* 04/05/2019    -  Seetharam
*
***************************************************************************************/

exports.getMrchntEmpGrpsCtrl = function (req, res) {
    console.log("getMrchntEmpGrpsCtrl")
    merchantMdl.getMrchntEmpGrpsMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrtMrchntEmpGrpCtrl
* Parameters     : req,res()
* Description    : set(insert) employes group based on merchant id
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntEmpGrpCtrl = function (req, res) {
    console.log("insrtMrchntEmpGrpCtrl")
    merchantMdl.insrtMrchntEmpGrpMdl(req.body.data, req.user).then((results) => {
        merchantMdl.insrtMrchntEmpGrpRelMdl(results.insertId, req.body.data,req.user, function (err, ins_results) {
            if (err) {
                df.formatErrorRes(req, res, err, cntxtDtls, '', {});
            }
            else {

                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }
        })
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    })
}

/**************************************************************************************
* Controller     : updateMrchntEmpGrpCtrl
* Parameters     : req,res()
* Description    : update merchant employee group
* Change History :
* 04/05/2019    -  Seetharam  - Initial Function
*
***************************************************************************************/

exports.updateMrchntEmpGrpCtrl = function (req, res) {
    console.log("updateMrchntEmpGrpCtrl.................")
    merchantMdl.updateMrchntEmpGrpMdl(req.body.data, req.user, (upd_err, results) => {
        if (upd_err) {
            console.log("------------------------5")
            df.formatErrorRes(req, res, upd_err, cntxtDtls, '', {});
        }
        else {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }
    })
}
