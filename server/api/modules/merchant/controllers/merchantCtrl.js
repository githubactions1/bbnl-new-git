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
    merchantMdl.merch_add_locM(req.body.data,req.user)
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
    merchantMdl.merch_updt_locM(req.body.data,req.user)
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
    merchantMdl.merch_del_locM(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}







/**************************************************************************************
* Controller     : getMrchntAccntCntrl
* Parameters     : req,res()
* Description    : get merchant accout list based on merchant id
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntAccntCntrl = function (req, res) {
    console.log("getMrchntAccntCntrl")
    merchantMdl.getMrchntAccntMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : insrtMrchntAccntCntrl
* Parameters     : req,res()
* Description    : insert merchant accout 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntAccntCntrl = function (req, res) {
    console.log("insrtMrchntAccntCntrl")
    merchantMdl.insrtMrchntAccntMdl(qryUtl.qryString(req.body.data),req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : updateMrchntAccntCntrl
* Parameters     : req,res()
* Description    : update merchant accout 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntAccntCntrl = function (req, res) {
    console.log("updateMrchntAccntCntrl")
    merchantMdl.updateMrchntAccntMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : deltMrchntAccntCntrl
* Parameters     : req,res()
* Description    : delete merchant accout 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntAccntCntrl = function (req, res) {
    console.log("deltMrchntAccntCntrl")
    merchantMdl.deltMrchntAccntMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : getOrgnztnCntrl
* Parameters     : req,res()
* Description    : get organization list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getOrgnztnCntrl = function (req, res) {
    console.log("getOrgnztnCntrl")
    merchantMdl.getOrgnztnCntrlMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtOrgnztnCntrl
* Parameters     : req,res()
* Description    : insert organization list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtOrgnztnCntrl = function (req, res) {
    console.log("insrtOrgnztnCntrl")
    console.log(req.body)
    merchantMdl.insrtOrgnztnMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            console.log("errrrrrrrrrrrrrrrrrrrrr")
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updateOrgnztnCntrl
* Parameters     : req,res()
* Description    : update organization list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateOrgnztnCntrl = function (req, res) {
    console.log("updateOrgnztnCntrl")
    merchantMdl.updateOrgnztnMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : deltOrgnztnCntrl
* Parameters     : req,res()
* Description    : delete organization list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltOrgnztnCntrl = function (req, res) {
    console.log("deltOrgnztnCntrl")
    merchantMdl.deltOrgnztnMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getOutltCntrl
* Parameters     : req,res()
* Description    : get outlet list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getOutltCntrl = function (req, res) {
    console.log("getOutltCntrl");
    merchantMdl.getOutltMdl(req.body,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : insrtOutltCntrl
* Parameters     : req,res()
* Description    : insert outlet list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtOutltCntrl = function (req, res) {
    console.log("insrtOutltCntrl")
    merchantMdl.insrtOutltMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : updateOutltCntrl
* Parameters     : req,res()
* Description    : get outlet list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateOutltCntrl = function (req, res) {
    console.log("updateOutltCntrl")
    merchantMdl.updateOutltMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : deltOutltCntrl
* Parameters     : req,res()
* Description    : get outlet list 
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltOutltCntrl = function (req, res) {
    console.log("deltOutltCntrl")
    merchantMdl.deltOutltMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




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
    merchantMdl.getMrchntEmplsLstMdl(req.params.id,req.user)
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
    merchantMdl.insrtMrchntEmpMdl(req.body.data,req.user, function (err, results) {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {
            merchantMdl.insrtMrchntEmpRelMdl(results.insertId, req.body.data,req.user, function (err, ins_results) {
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
    merchantMdl.updateMrchntEmpMdl(req.body.data,req.user, (upd_err, results) => {
        if (upd_err) {
            console.log("------------------------5")
            df.formatErrorRes(req, res, upd_err, cntxtDtls, '', {});
        }
        else {
            merchantMdl.udtMrchntEmpRelMdl(req.body.data,req.user, function (emp_err, ins_results) {
                if (emp_err) {
                    console.log("------------------------4")
                    df.formatErrorRes(req, res, emp_err, cntxtDtls, '', {});
                }
                else {
                    if (req.body.data && req.body.data.sly_cmp_in == 1) {
                        merchantMdl.updtSlyCmpTable(req.body.data,req.user)
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
    merchantMdl.deltMrchntEmpMdl(req.params.id,req.user)
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
    merchantMdl.getMrchntEmpbyGrpsMdl(req.params.id,req.user)
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
    merchantMdl.getMrchntEmpGrpsMdl(req.params.id,req.user)
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
    merchantMdl.insrtMrchntEmpGrpMdl(req.body.data,req.user).then((results) => {
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
    merchantMdl.updateMrchntEmpGrpMdl(req.body.data,req.user, (upd_err, results) => {
        if (upd_err) {
            console.log("------------------------5")
            df.formatErrorRes(req, res, upd_err, cntxtDtls, '', {});
        }
        else {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }
    })
}

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
    merchantMdl.getMrchntOffrsMdl(req.params.mrchntID, req.params.mnu_itm_id,req.user).then(function (results) {
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
* Controller     : getDprtmntLstCntrl
* Parameters     : req,res()
* Description    : get department list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getDprtmntLstCntrl = function (req, res) {
    console.log("getDprtmntLstCntrl")
    merchantMdl.getDprtmntLstMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getDsgntnCntrl
* Parameters     : req,res()
* Description    : get designation list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getDsgntnCntrl = function (req, res) {
    console.log("getDsgntnCntrl")
    merchantMdl.getDsgntnMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtDsgntnCntrl
* Parameters     : req,res()
* Description    : insert designation list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtDsgntnCntrl = function (req, res) {
    console.log("insrtDsgntnCntrl")
    merchantMdl.insrtDsgntnMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : updateDsgntnCntrl
* Parameters     : req,res()
* Description    : update designation list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateDsgntnCntrl = function (req, res) {
    console.log("updateDsgntnCntrl")
    merchantMdl.updateDsgntnMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : deltDsgntnCntrl
* Parameters     : req,res()
* Description    : delete designation list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltDsgntnCntrl = function (req, res) {
    console.log("deltDsgntnCntrl")
    merchantMdl.deltDsgntnMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : insrtDprtmntCtrl
* Parameters     : req,res()
* Description    : insert department list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtDprtmntCtrl = function (req, res) {
    console.log("insrtDprtmntCtrl")
    merchantMdl.insrtDprtmntMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : updateDprtmntCtrl
* Parameters     : req,res()
* Description    : update department list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateDprtmntCtrl = function (req, res) {
    console.log("updateDprtmntCtrl")
    merchantMdl.updateDprtmntMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : deltDprtmntCtrl
* Parameters     : req,res()
* Description    : update department list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltDprtmntCtrl = function (req, res) {
    console.log("deltDprtmntCtrl")
    merchantMdl.deltDprtmntMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : deltDprtmntCtrl
* Parameters     : req,res()
* Description    : get terminal list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getTrmnlLstCntrl = function (req, res) {
    console.log("getTrmnlLstCntrl")
    merchantMdl.getTrmnlLstMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtTrmnlCtrl
* Parameters     : req,res()
* Description    : get terminal list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtTrmnlCtrl = function (req, res) {
    console.log("insrtTrmnlCtrl")
    merchantMdl.insrtTrmnlMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : updateTrmnlCtrl
* Parameters     : req,res()
* Description    : get terminal list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateTrmnlCtrl = function (req, res) {
    console.log("updateTrmnlCtrl")
    merchantMdl.updateTrmnlMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : deltTrmnlCtrl
* Parameters     : req,res()
* Description    : get terminal list
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltTrmnlCtrl = function (req, res) {
    console.log("deltTrmnlCtrl")
    merchantMdl.deltTrmnlMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getMrchntTrnscCntrl
* Parameters     : req,res()
* Description    : get transaction data
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntTrnscCntrl = function (req, res) {
    console.log("getMrchntTrnscCntrl")
    merchantMdl.getMrchntTrnscMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getMrchntTrnscDtlsCntrl
* Parameters     : req,res()
* Description    : get transaction detials data
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntTrnscDtlsCntrl = function (req, res) {
    console.log("getMrchntTrnscDtlsCntrl")
    merchantMdl.getMrchntTrnscDtlsMdl(req.params.id, req.params.trnscId,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}





/**************************************************************************************
* Controller     : getMrchntTrnscDateFltrCntrl
* Parameters     : req,res()
* Description    : get transaction detials data wtih date filter
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntTrnscDateFltrCntrl = function (req, res) {
    console.log("getMrchntTrnscDateFltrCntrl")
    merchantMdl.getMrchntTrnscDateFltrMdl(req.params.id, req.params.frmdt, req.params.todt,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : getMrchntStmntCntrl
* Parameters     : req,res()
* Description    : get statement details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntStmntCntrl = function (req, res) {
    console.log("getMrchntStmntCntrl")
    merchantMdl.getMrchntStmntMdl(req.params.id, req.params.frmdt, req.params.todt,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




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
    merchantMdl.getMrchntDshbrdMdl(req.params.id,req.user)
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
    merchantMdl.getMrchntDshbrdDtlsMdl(req.params.id, req.params.otletId,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
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
    merchantMdl.getMrchntOffrsMdl(req.params.id,req.user)
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
    merchantMdl.insrtMrchntOffrsMdl(req.body.data,req.user, (err, result) => {
        console.log(result);
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {
            merchantMdl.insrtMrchntOffrRelMdl(req.body.data.mrchntId, result.insertId,req.user).then(function (results) {
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
    merchantMdl.updateMrchntOffrsMdl(req.body.data,req.user, (err, result) => {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {

            merchantMdl.getApprovalCntMdl(req.body.data,req.user, (err, result) => {
                if (err) {
                    df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                }
                else {
                    if (result[0].aprvl_cnt == req.body.data.min_aprve_cnt) {
                        merchantMdl.approveOfferMdl(req.body.data,req.user, (err, result) => {
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
    merchantMdl.deltMrchntOffrsMdl(req.params.id, req.params.mrchntID,req.user, (err, result) => {
        if (err) {

            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {
            df.formatSucessRes(req, res, result, cntxtDtls, '', {});
        }
    })
}


/**************************************************************************************
* Controller     : getMrchntLoadNPayCtrl
* Parameters     : req,res()
* Description    : get merchant load and pay details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.getMrchntLoadNPayCtrl = function (req, res) {
    console.log("getMrchntLoadNPayCtrl")
    merchantMdl.getMrchntLoadNPayMdl(req.params.mrchntID,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getMrchntLoadNPayCtrl
* Parameters     : req,res()
* Description    : get merchant load and pay details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.getMrchntLoadNPayDtlCtrl = function (req, res) {
    console.log("getMrchntLoadNPayDtlCtrl")
    merchantMdl.getMrchntLoadNPayDtlMdl(req.params.mrchntID, req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrtMrchntLoadNPayCtrl
* Parameters     : req,res()
* Description    : insert offers details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntLoadNPayCtrl = function (req, res) {
    console.log("insrtMrchntLoadNPayCtrl")
    console.log(req)
    merchantMdl.insrtMrchntLoadNPayMdl(req.body.data,req.user)
        .then(function (result) {
            merchantMdl.insrtMrchntLoadNPayUsrsMdl(req.body.data, result.insertId,req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

// /**************************************************************************************
// * Controller     : updateMrchntLoadNPayCtrl
// * Parameters     : req,res()
// * Description    : update Load And Pay details
// * Change History :
// * 04/05/2019    -  Seetharam Devisetty - Initial Function
// *
// ***************************************************************************************/

// exports.updateMrchntLoadNPayCtrl = function (req, res) {
//     console.log("updateMrchntLoadNPayCtrl")
//     merchantMdl.updateMrchntLoadNPayMdl(req.body.data, (err, result) => {
//         if (err) {
//             df.formatErrorRes(req, res, err, cntxtDtls, '', {});
//         }
//         else {
//             df.formatSucessRes(req, res, result, cntxtDtls, '', {});
//         }
//     })
// }

/**************************************************************************************
* Controller     : getMrchntLoadNCollectDtlCtrl
* Parameters     : req,res()
* Description    : get merchant load and pay details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.getMrchntLoadNCollectDtlCtrl = function (req, res) {
    console.log("getMrchntLoadNCollectDtlCtrl")
    merchantMdl.getMrchntLoadNCollectDtlMdl(req.params.mrchntID, req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getMrchntLoadNCollectCtrl
* Parameters     : req,res()
* Description    : get merchant load and pay details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.getMrchntLoadNCollectCtrl = function (req, res) {
    console.log("getMrchntLoadNCollectCtrl")
    merchantMdl.getMrchntLoadNCollectMdl(req.params.mrchntID,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrtMrchntLoadNCollectCtrl
* Parameters     : req,res()
* Description    : insert load and collect details
* Change History :
* 04/05/2019    -  Seetharam Devisetty  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntLoadNCollectCtrl = function (req, res) {
    console.log("insrtMrchntLoadNCollectCtrl")
    console.log(req)
    merchantMdl.insrtMrchntLoadNCollectMdl(req.body.data,req.user)
        .then(function (result) {
            merchantMdl.insrtMrchntLoadNCollectUsrsMdl(req.body.data, result.insertId,req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getMrchntCntrCntrl
* Parameters     : req,res()
* Description    : get counter details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntCntrCntrl = function (req, res) {
    console.log("getMrchntCntrCntrl")
    merchantMdl.getMrchntCntrMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtMrchntCntrCtrl
* Parameters     : req,res()
* Description    : insert counter details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntCntrCtrl = function (req, res) {
    console.log("insrtMrchntCntrCtrl")
    merchantMdl.insrtMrchntCntrMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : updateMrchntCntrCtrl
* Parameters     : req,res()
* Description    : update counter details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntCntrCtrl = function (req, res) {
    console.log("updateMrchntCntrCtrl")
    merchantMdl.updateMrchntCntrMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : deltMrchntCntrCtrl
* Parameters     : req,res()
* Description    : delete counter details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntCntrCtrl = function (req, res) {
    console.log("deltMrchntCntrCtrl")
    merchantMdl.deltMrchntCntrMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : getMrchntCntrl
* Parameters     : req,res()
* Description    : get merchant details
* Change History :
* 13/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntCntrl = function (req, res) {
    console.log("getMrchntCntrl")
    merchantMdl.getMrchntMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : insrtMrchntCtrl
* Parameters     : req,res()
* Description    : insert merchant details
* Change History :
* 13/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntCtrl = function (req, res) {
    console.log("insrtMrchntCtrl")
    merchantMdl.insrtMrchntMdl(req.body.data,req.user)
        .then(function (results) {
            if (results && results.insertId) {
                merchantMdl.updtMrchntQRCode(results.insertId,req.user)
                    .then((updtResult) => {
                        df.formatSucessRes(req, res, updtResult, cntxtDtls, '', {});
                    }).catch((err) => {

                        df.formatErrorRes(req, res, err, cntxtDtls, '', {});
                    })
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updateMrchntCtrl
* Parameters     : req,res()
* Description    : update merchant details
* Change History :
* 13/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntCtrl = function (req, res) {
    console.log("updateMrchntCtrl")
    merchantMdl.updateMrchntMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}




/**************************************************************************************
* Controller     : deltMrchntCtrl
* Parameters     : req,res()
* Description    : delete merchant details
* Change History :
* 13/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntCtrl = function (req, res) {
    console.log("deltMrchntCtrl")
    merchantMdl.deltMrchntMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getMrchntUsrCntrl
* Parameters     : req,res()
* Description    : get merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.getMrchntUsrCntrl = function (req, res) {
    console.log("getMrchntUsrCntrl")
    merchantMdl.getMrchntUsrMdl(req.params.id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}







/**************************************************************************************
* Controller     : insrtMrchntUsrCtrl
* Parameters     : req,res()
* Description    : insert merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.insrtMrchntUsrCtrl = function (req, res) {
    console.log("insrtMrchntUsrCtrl")
    merchantMdl.insrtMrchntUsrMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}







/**************************************************************************************
* Controller     : updateMrchntUsrCtrl
* Parameters     : req,res()
* Description    : update merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.updateMrchntUsrCtrl = function (req, res) {
    console.log("updateMrchntUsrCtrl")
    merchantMdl.updateMrchntUsrMdl(req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : deltMrchntUsrCtrl
* Parameters     : req,res()
* Description    : delete merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.deltMrchntUsrCtrl = function (req, res) {
    console.log("deltMrchntUsrCtrl")
    merchantMdl.deltMrchntUsrMdl(req.params.id, req.body.data,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}






/**************************************************************************************
* Controller     : upldMrchntDoc
* Parameters     : req,res()
* Description    : delete merchant user details
* Change History :
* 04/05/2019    -  Murali Krishna  - Initial Function
*
***************************************************************************************/

exports.upldMrchntDoc = function (req, res) {
    console.log("upldMrchntDoc")
    merchantMdl.upldMrchntDocMdl(req.body,req.user, (err, result) => {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else {
            df.formatSucessRes(req, res, result, cntxtDtls, '', {});
        }
    })

}


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
    merchantMdl.insrt_mrchnt_rolesM(req.body.data,req.user, (err, results) => {
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
                    merchantMdl.insrt_mrcht_usr_mnus(id, req.body.data,req.user, (err, results) => {
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
    merchantMdl.getTemplatesDtlsMdl(req.params.tmpltId,req.user).then(function (results) {
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
    merchantMdl.insrtTemplateDtlsMdl(req.body,req.user, (err, results) => {
        console.log(results)
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else if (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});

        }
    })
}

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
    merchantMdl.insrtMrchntApprvlMdl(req.body.data,req.user, (err, results) => {
        console.log(results)
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else if (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});

        }
    })
}

/**************************************************************************************
* Controller     : updateMrchntSetupCtrl
* Parameters     : req,res()
* Description    : To update setup
* Change History :
* 19/06/2019    - Seetharam - Initial Function
*
***************************************************************************************/
exports.updateMrchntSetupCtrl = function (req, res) {
    console.log("updateMrchntSetupCtrl")
    merchantMdl.updateMrchntSetupMdl(req.body.data, req.user,(err, results) => {
        if (err) {
            df.formatErrorRes(req, res, err, cntxtDtls, '', {});
        }
        else if (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }

    })
}
/***************************************************************************************/
exports.get_mrchntdetails = function (req, res) {
    console.log("getmerchant details Cntrl")
    merchantMdl.get_mrchntdetailsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/***************************************************************************************/
exports.get_userdetails = function (req, res) {
    console.log("user details Cntrl")
    merchantMdl.get_userdetailsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
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

/**************************************************************************************
* Controller     : getOutltCtgryCntrl
* Parameters     : req,res()
* Description    : To update setup
* Change History :
* 31/07/2019    - Srujana M - Initial Function
***************************************************************************************/

exports.getOutltCtgryCntrl = function (req, res) {
    console.log("getOutltCtgryCntrl")
    merchantMdl.get_outltCtgryMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}