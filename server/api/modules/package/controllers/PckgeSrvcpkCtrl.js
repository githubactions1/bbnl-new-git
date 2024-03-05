const PckgeSrvcpkMdl = require(appRoot + '/server/api/modules/package/models/PckgeSrvcpkMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var pckgeBo = require(appRoot + '/server/api/modules/package/packageBo/packageBo');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');

/**************************************************************************************
* Controller     : get_PckgeSrvcpkCtrl
* Parameters     : req,res()
* Description    : get details of all packageServiceLst
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeSrvcpkCtrl = function (req, res) {

    PckgeSrvcpkMdl.getPckgeSrvcpkMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_PckgeSrvcpkCtrl
* Parameters     : req,res()
* Description    : search details of all packageServiceLst
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_PckgeSrvcpkCtrl = function (req, res) {

    PckgeSrvcpkMdl.srchPckgeSrvcpkMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_PckgeSrvcpkByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  packageServiceLst
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeSrvcpkByIdCtrl = function (req, res) {

    PckgeSrvcpkMdl.getPckgeSrvcpkByIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : insrt_PckgeSrvcpkCtrl
* Parameters     : req,res()
* Description    : Add new  packageServiceLst
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_PckgeSrvcpkCtrl = function (req, res) {
    var maindata = req.body.data
    let insertdata = [];
    var data1 = [];
    console.log(maindata)
    PckgeSrvcpkMdl.insrtPckgeSrvcpkMdl(req.body.data, req.user)
        .then(function (results) {
            if (results) {
                var insrtdSrvcPckId = results.insertId
                if (req.body.data.cre_srvce_id == 1) {
                    for (var i = 0; i < maindata.hsiPrptyvlues.length; i++) {
                        if (maindata.hsiPrptyvlues[i]['vlu_txt'] != '') {
                            insertdata.push(
                                {
                                    hsi_prpty_id: maindata.hsiPrptyvlues[i].hsi_prpty_id,
                                    vlu_txt: maindata.hsiPrptyvlues[i].vlu_txt
                                }

                            )
                        }
                    }
                    PckgeSrvcpkMdl.insHsiPrprySrvcpkRel(insrtdSrvcPckId, insertdata,req.user)
                        .then(function (results) {
                            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                }

                else if (req.body.data.cre_srvce_id == 2) {
                     data1 = [];
                    for (var i = 0; i < maindata.selectedsrvcpcks.length; i++) {
                        if (maindata.selectedsrvcpcks[i]['isActive'] == true && maindata.selectedsrvcpcks[i]['isNew'] == true) {
                            data1.push(
                                {
                                    chnle_id: maindata.selectedsrvcpcks[i].chnle_id,
                                    chnle_cd: maindata.selectedsrvcpcks[i].chnle_cd,
                                    chnle_nm: maindata.selectedsrvcpcks[i].chnle_nm
                                }
                            )
                        }
                    }
                    
                    PckgeSrvcpkMdl.insrtSrvcpkChnlRelMdl(insrtdSrvcPckId, data1,req.user)
                        .then(function (results) {
                            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                }
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : updte_PckgeSrvcpkCtrl
* Parameters     : req,res()
* Description    : Update existing  packageServiceLst
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_PckgeSrvcpkCtrl = function (req, res) {

    var data = req.body.data;
    var newdata = [];
    var removeData = [];
    var hsiData = [];
    var nwchnlcds = [];
    var rmvchnlcds = [];
    var srvcpcktyp = '';
    var reqArray = [];
    var srvctyp = '';
    var chnl_arr = [];
    if (data.selectedsrvcpcks && data.selectedsrvcpcks.length > 0) {
        srvctyp = 'LTV'
        for (var i = 0; i < data.selectedsrvcpcks.length; i++) {

            if (data.selectedsrvcpcks[i]['isNew'] == true && data.selectedsrvcpcks[i]['isActive'] == true) {
                newdata.push({
                    chnle_id: data.selectedsrvcpcks[i].chnle_id
                });
            }
            else if (data.selectedsrvcpcks[i]['isActive'] == false) {
                removeData.push({
                    chnle_id: data.selectedsrvcpcks[i].chnle_id
                })
            }
        }

    }
    else if (data.hsiPrptyvlues && data.hsiPrptyvlues.length > 0) {
        for (var j = 0; j < data.hsiPrptyvlues.length > 0; j++) {
            hsiData.push(
                {
                    hsi_prpty_id: data.hsiPrptyvlues[j].hsi_prpty_id,
                    vlu_txt: data.hsiPrptyvlues[j].vlu_txt
                }
            )
        }
    }
    PckgeSrvcpkMdl.updtePckgeSrvcpkMdl(data, req.params.id, req.user)
        .then(function (results) {
            if (results) {
                var srvc_pck_id = data.srvc_pck_id
                if (data.selectedsrvcpcks && data.selectedsrvcpcks.length > 0) {
                    if (newdata && newdata.length > 0 ) {
                        PckgeSrvcpkMdl.insrtSrvcpkChnlRelMdl(srvc_pck_id, newdata,req.user)
                            .then(function (results) {
                                if (newdata.length > 0 && removeData.length>0) {
                                    updtSrvcpck_chnlerel(removeData,srvc_pck_id)
                                }
                                else if(newdata.length>0)
                                {
                                    extnlapi()
                                } 
                                else {
                                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                }

                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    } else {
                        if (removeData && removeData.length > 0) {
                            updtSrvcpck_chnlerel(removeData, srvc_pck_id)
                        }
                        else {
                            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                        }
                    }
                }

                else if (data.hsiPrptyvlues && data.hsiPrptyvlues.length > 0) {
                    if (hsiData && hsiData.length > 0) {
                        // console.log("hsidata")
                        hsiprprysrvcpkrel(hsiData, srvc_pck_id)
                    }

                    else {
                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }
                }

                function updtSrvcpck_chnlerel(data, srvc_pck_id) {
                    // console.log(data)
                    let rmvPromises = [];
                    for (let i = 0; i < data.length; i++) {
                        rmvPromises.push(PckgeSrvcpkMdl.updtSrvcpck_chnlerelMdl(removeData[i], srvc_pck_id,req.user))
                    }
                    Promise.all(rmvPromises).then((results) => {
                        extnlapi()
                    }).catch((error) => {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    })
                }
                function extnlapi()
                        {
                            var chnl_arr = []
                            if (data.srvcpk_type_id == 1) {
                                srvcpcktyp = 'BASE_PACK'
                            }
                            else if (data.srvcpk_type_id == 2) {
                                srvcpcktyp = 'ALACARETE_PACK'
                            }
                            for (var i = 0; i < newdata.length; i++) {
                                chnl_arr.push(
                                    newdata[i].chnle_id
                                )
                            }
                            for (var j = 0; j < removeData.length; j++) {
                                chnl_arr.push(
                                    removeData[j].chnle_id
                                )
                            }
    
                            PckgeSrvcpkMdl.getchnlcds_Mdl(chnl_arr, req.user)
                                .then(function (results) {
                                    for (var i = 0; i < results.length; i++) {
                                        for (var j = 0; j < newdata.length; j++) {
                                            if (results[i].chnle_id == newdata[j].chnle_id) {
                                                nwchnlcds.push(
                                                    results[i].chnle_cd
                                                )
                                            }
                                        }
                                        for (var l = 0; l < removeData.length; l++) {
                                            if (results[i].chnle_id == removeData[l].chnle_id) {
                                                rmvchnlcds.push(
                                                    results[i].chnle_cd
                                                )
                                            }
                                        }
                                    }
                                    PckgeSrvcpkMdl.getpkcgeDtlsbySrvcpckId(req.body.data.srvc_pck_id, req.user)
                                        .then(function (pckgeresults) {
                                            for (var i = 0; i < pckgeresults.length; i++) {
                                                if (pckgeresults[i].glbl_in == 1) {
                                                    var isgbl = true
                                                }
                                                else if (pckgeresults[i].glbl_in == 0) {
                                                    var isgbl = false
                                                }
                                                reqArray.push(
                                                    {
                                                        packageCode: pckgeresults[i].pckge_nm,
                                                        serviceType: srvctyp,
                                                        ltvIdsAdd: nwchnlcds,
                                                        ltvIdsRemove: rmvchnlcds,
                                                        gst: pckgeresults[i].gst_at,
                                                        packagePrice: pckgeresults[i].chrge_at,
                                                        packageSubscriptionType: srvcpcktyp,
                                                        isGlobal: isgbl,
                                                        devicePlatForm: []
                                                    }
                                                )
                                            }
                                            let apicalls = pckgeBo.mdfySrvcpck(reqArray)
                                            console.log(apicalls)
                                            extApiCtrl.callApi("Service Pack Modify", 3, 9, req.body.data.srvc_pck_id, apicalls,req.user).then(() => {
                                            })
                                            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                           
                                        })
                                })
                        }

                function hsiprprysrvcpkrel(data, srvc_pck_id) {
                    let hsiPromises = [];
                    for (let i = 0; i < data.length; i++) {
                        hsiPromises.push(PckgeSrvcpkMdl.hsiprprysrvcpkrelMdl(hsiData[i], srvc_pck_id))
                    }
                    Promise.all(hsiPromises).then((results) => {
                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch((error) => {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    })
                }
            }
        })
}
/**************************************************************************************
* Controller     : dlte_PckgeSrvcpkCtrl
* Parameters     : req,res()
* Description    : Delete existing  packageServiceLst
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_PckgeSrvcpkCtrl = function (req, res) {

    PckgeSrvcpkMdl.dltePckgeSrvcpkMdl(req.params.id, req.user)
        .then(function (srvpckresults) {
            PckgeSrvcpkMdl.dltePckgeSrvcpkChnlRelMdl(req.params.id, req.user)
                .then(function (srvpckrelresults) {
                    df.formatSucessRes(req, res, srvpckrelresults, cntxtDtls, 'dlte_PckgeSrvcpkCtrl', {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, 'dlte_PckgeSrvcpkCtrl', {});
                });
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, 'dlte_PckgeSrvcpkCtrl', {});
        });
}

/**************************************************************************************
* Controller     : get_chnlsCtrl
* Parameters     : req,res()
* Description    : Get all Channles List
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_chnlsCtrl = function (req, res) {

    PckgeSrvcpkMdl.get_chnlsMdl(req.user)
        .then(function (results) {
            var common_feilds = ['lnge_id', 'grp_nm'];
            var arrFeilds = ['chnle_id', 'chnle_cd', 'opt_nm'];
            var arrName = 'opts';
            var groupBy = 'lnge_id';
            var sortKey = 'lnge_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            //console.log(groupres)
            df.formatSucessRes(req, res, groupres, cntxtDtls, 'get_chnlsCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, 'get_chnlsCtrl', {});
        });
}

/**************************************************************************************
* Controller     : get_HsiPrptyCtrl
* Parameters     : req,res()
* Description    : Get HSI Properties 
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_HsiPrptyCtrl = function (req, res) {

    PckgeSrvcpkMdl.get_HsiPrptyMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, 'get_HsiPrptsCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, 'get_HsiPrptyCtrl', {});
        });
}

/**************************************************************************************
* Controller     : get_srvpckDtls
* Parameters     : req,res()
* Description    : Get HSI Properties 
* Change History :
* 12/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_srvpckDtls = function (req, res) {
    var bodyData=req.body.data
    PckgeSrvcpkMdl.get_srvpckDtlsMdl(bodyData,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, 'get_HsiPrptsCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, 'get_HsiPrptyCtrl', {});
        });
}





