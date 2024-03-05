const { JSON } = require("sequelize");

const PckgePlnMdl = require(appRoot + '/server/api/modules/package/models/PckgePlnMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var pckgeBo = require(appRoot + '/server/api/modules/package/packageBo/packageBo');
var extApiCtrl = require(appRoot + '/server/extApiService/controllers/extApiCtrl.js');

/**************************************************************************************
* Controller     : get_PckgePlnCtrl
* Parameters     : req,res()
* Description    : get details of all packagePlan
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgePlnCtrl = function (req, res) {

    PckgePlnMdl.getPckgePlnMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_PckgesByIdCtrl
* Parameters     : req,res()
* Description    : Get Charge Type of Plans
* Change History :
* 17/02/2020    -  MADHURI.NUNE  - Initial Function
*
***************************************************************************************/
exports.get_PckgesByIdCtrl = function (req, res) {
    PckgePlnMdl.get_PckgesByIdMdl(req.params.id, req.user)
        .then(function (results) {
            var common_feilds = ['efcte_dt', 'pckge_id', 'expry_dt', 'pckge_nm'];
            var arrFeilds = ['srvcpk_id', 'srvcpk_nm', 'chrge_at', 'gst_at', 'cre_srvce_id'];
            var arrName = 'srvcs';
            var groupBy = 'pckge_id';
            var sortKey = 'pckge_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');


            for (var i = 0; i < groupres.length; i++) {
                var totchrg_at = 0;
                var totgst_at = 0;
                var tot_at = 0;
                for (j = 0; j < groupres[i].srvcs.length; j++) {
                    totchrg_at = totchrg_at + groupres[i].srvcs[j].chrge_at;
                    totgst_at = totgst_at + groupres[i].srvcs[j].gst_at;
                    tot_at = totchrg_at + totgst_at
                    groupres[i]["chrg_at"] = totchrg_at.toFixed(2);
                    groupres[i]["gst_at"] = totgst_at.toFixed(2);
                    groupres[i]["total"] = tot_at.toFixed(2);
                }
            }
            //console.log(groupres)
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_PckgesCtrl
* Parameters     : req,res()
* Description    : get details of all packagePlan
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgesCtrl = function (req, res) {

    PckgePlnMdl.get_PckgesMdl(req.user)
        .then(function (results) {
            // ////console.log(results)

            var common_feilds = ['pckge_id', 'pckge_nm', 'efcte_dt', 'expry_dt', 'total', 'caf_type_id', 'caf_type_nm', 'pckge_type_id', 'srvcpk_type_nm', 'date', 'date1', 'glbl_in', 'lckn_dys_ct'];
            var arrFeilds = ['srvcpk_id', 'srvcpk_nm', 'cre_srvce_id', 'cre_srvce_nm', 'chrge_at', 'gst_at', 'chrge_cde_id', 'chrgTyp', 'pckge_srvcpk_rel_id'];
            var arrName = 'srvcpcks';
            var groupBy = 'pckge_id';
            var sortKey = 'pckge_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            // //console.log(groupres)
            for (var i = 0; i < groupres.length; i++) {
                var totchrg_at = 0;
                var totgst_at = 0;
                var tot_at = 0;
                var chrge_at = 0;
                var gst_at = 0;
                var totamnt = 0;
                for (j = 0; j < groupres[i].srvcpcks.length; j++) {
                    totchrg_at = totchrg_at + groupres[i].srvcpcks[j].chrge_at;
                    totgst_at = totgst_at + groupres[i].srvcpcks[j].gst_at;
                    tot_at = totchrg_at + totgst_at
                    groupres[i]["chrg_at"] = totchrg_at.toFixed(2);
                    groupres[i]["gst_at"] = totgst_at.toFixed(2);
                    groupres[i]["total"] = tot_at.toFixed(2);
                }
            }
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_PckgesFrPdfIdCtrl
* Parameters     : req,res()
* Description    : search details of all packagePlan
* Change History :
* 08/11/2021    -  RAMESH  - Initial Function
*
***************************************************************************************/
exports.get_PckgesFrPdfIdCtrl = function (req, res) {

    PckgePlnMdl.PckgesFrPdfIdMdl( req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_PckgesFrcafIdPdfIdCtrl
* Parameters     : req,res()
* Description    : search details of all packagePlan
* Change History :
* 08/11/2021    -  RAMESH  - Initial Function
*
***************************************************************************************/
exports.get_PckgesFrcafIdPdfIdCtrl = function (req, res) {
    console.log("req", req.body)
    PckgePlnMdl.PckgesFrcafIdPdfIdMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : srch_PckgePlnCtrl
* Parameters     : req,res()
* Description    : search details of all packagePlan
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.srch_PckgePlnCtrl = function (req, res) {

    PckgePlnMdl.srchPckgePlnMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_PckgePlnByIdCtrl
* Parameters     : req,res()
* Description    : get details of single  packagePlan
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgePlnByIdCtrl = function (req, res) {

    PckgePlnMdl.getPckgePlnByIdMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : cancel_PckgeAgreementCtrl
* Parameters     : req,res()
* Description    : get details of all cancel_PckgeAgreementCtrl
* Change History :
* 04/06/2020    -  MADHURI  - Initial Function
*
***************************************************************************************/
exports.cancel_PckgeAgreementCtrl = function (req, res) {
    PckgePlnMdl.cancel_PckgeAgreementCtrl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });


}
/**************************************************************************************
* Controller     : insrt_PckgePlnCtrl
* Parameters     : req,res()
* Description    : Add new  packagePlan
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insrt_PckgePlnCtrl = function (req, res) {
    var data = req.body.data;
    var newdata = [];
    var x = 0;
    for (var i = 0; i < data.selectedsrvcpcks.length; i++) {

        if (data.selectedsrvcpcks[i]['isNew'] == true && data.selectedsrvcpcks[i]['isActive'] == true) {
            newdata.push({
                srvcpk_id: data.selectedsrvcpcks[i].srvcpk_id,
                cre_srvce_id: data.selectedsrvcpcks[i].cre_srvce_id,
                chrgTyp_id: data.selectedsrvcpcks[i].chrgTyp_id,
                amnt: data.selectedsrvcpcks[i].chrge_at,
                tx: data.selectedsrvcpcks[i].gst_at,
                insrt_id: ''
            });
        }

    }

    PckgePlnMdl.insrtPckgePlnMdl(req.body.data, req.user)
        .then(function (results) {

            if (results) {
                function myFirstrecursiveFnc(loopdata, data, id, user) {
                    PckgePlnMdl.insrtPckgesrvcrelMdl(loopdata, data, id, user)
                        .then(function (FirstResults) {
                            newdata[x].insrt_id = FirstResults.insertId
                            x++;
                            if (x < newdata.length) {
                                myFirstrecursiveFnc(newdata[x], data, results.insertId, req.user);
                            }
                            if (x == newdata.length) {
                                PckgePlnMdl.insrtPckgechrgMdl(newdata, data, req.user)
                                    .then(function (finalresults) {
                                        df.formatSucessRes(req, res, results.insertId, cntxtDtls, '', {});

                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });
                            }

                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                }
                myFirstrecursiveFnc(newdata[x], data, results.insertId, req.user);
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : iptvextnlcallCtrl
* Parameters     : req,res()
* Description    : get details of all get_recentapprovals
* Change History :
* 21/03/2020    -  sri vardhan balla
*
***************************************************************************************/
exports.iptvextnlcallCtrl = function (req, res) {
    var srvcpck_arr
    var srvctyp = ''
    var reqArray=[]
    console.log(req.body.data)
    var srvpckdata = req.body.data
    if (srvpckdata.pkgetypeid == 1) {
        srvcpcktyp = 'BASE_PACK'
    }
    else if (srvpckdata.pkgetypeid == 2) {
        srvcpcktyp = 'ALACARETE_PACK'
    }
    srvcpck_arr=srvpckdata.srvcpk_id
    //console.log(srvcpck_arr)
    srvctyp = 'LTV'
    PckgePlnMdl.get_Chnl_CdMdl(srvcpck_arr, req.user)
        .then(function (chnlcdresults) {
            var common_feilds = ['srvcpk_id'];
            var arrFeilds = ['chnle_id', 'chnle_cd', 'chnle_nm'];
            var arrName = 'chnls';
            var groupBy = 'srvcpk_id';
            var sortKey = 'srvcpk_id';
            var groupres = jsonUtils.groupJsonByKey(chnlcdresults, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

            for (var j = 0; j < groupres.length; j++) {
                if (srvpckdata.srvcpk_id == groupres[j].srvcpk_id) {
                    chnlcds = []
                    for (var k = 0; k < groupres[j].chnls.length; k++) {
                        chnlcds.push(
                            groupres[j].chnls[k].chnle_cd
                        )
                    }
                    reqArray.push(
                        {
                            packageCode: srvpckdata.pkgenm,
                            packageName: srvpckdata.pkgenm,
                            serviceType: srvctyp,
                            gst: srvpckdata.gst_at,
                            packagePrice: srvpckdata.chrge_at,
                            ltvIds: chnlcds,
                            serviceIds: chnlcds,
                            isGlobal: srvpckdata.glbl_in,
                            packageSubscriptionType: srvcpcktyp,
                            devicePlatForm: []
                        }
                    )
                }

            }

            var extrnlapicalls = pckgeBo.addNewpckge(reqArray);
            console.log(extrnlapicalls)
            if(srvpckdata.pkgedt == true)
            {
                extApiCtrl.callApi("Package Modification", 2000004, 13, srvpckdata.pckge_id, extrnlapicalls, req.user).then(() => {
                })
            }
            else
            {
                extApiCtrl.callApi("Package Creation", 11, 8, srvpckdata.pckge_id, extrnlapicalls, req.user).then(() => {
                })
            }
            
            df.formatSucessRes(req, res, chnlcdresults, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : updte_PckgePlnCtrl
* Parameters     : req,res()
* Description    : Update existing  packagePlan
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.updte_PckgePlnCtrl = function (req, res) {
    var data = req.body.data;
    var plan_id = req.params.id
    var newdata = [];
    var removeData = [];
    var x = 0;
    var y = 0;
    for (var i = 0; i < data.edtpcks.length; i++) {

        if (data.edtpcks[i]['isNew'] == true && data.edtpcks[i]['isActive'] == true) {
            newdata.push({
                srvcpk_id: data.edtpcks[i].srvcpk_id,
                cre_srvce_id: data.edtpcks[i].cre_srvce_id,
                chrgTyp_id: data.edtpcks[i].chrgTyp_id,
                amnt: data.edtpcks[i].chrge_at,
                tx: data.edtpcks[i].gst_at,
                insrt_id: ''

            });
        }
        else if (data.edtpcks[i]['isActive'] == false) {
            removeData.push({
                srvcpk_id: data.edtpcks[i].srvcpk_id,
                cre_srvce_id: data.edtpcks[i].cre_srvce_id,
                relid: data.edtpcks[i].pckge_srvcpk_rel_id
            })
        }
    }
    PckgePlnMdl.updtePckgePlnMdl(req.body.data, req.params.id, req.user)
        .then(function (results) {
            if (results) {
                var pckge_id = data.pckge_id
                if (newdata.length > 0) {
                    function myFirstrecursiveFnc(loopdata, data, id, user) {
                        PckgePlnMdl.insrtPckgesrvcrelMdl(loopdata, data, id, user)
                            .then(function (FirstResults) {
                                newdata[x].insrt_id = FirstResults.insertId
                                x++;
                                if (x < newdata.length) {
                                    myFirstrecursiveFnc(newdata[x], data, plan_id, req.user);
                                }
                                if (x == newdata.length) {
                                    PckgePlnMdl.insrtPckgechrgMdl(newdata, data, req.user)
                                        .then(function (finalresults) {
                                            if (removeData.length > 0) {
                                                updtpckgsrvcrel(removeData[y], req.user)
                                            }
                                            else {
                                                df.formatSucessRes(req, res, finalresults, cntxtDtls, '', {});
                                            }
                                        }).catch(function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                        });
                                }

                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    }
                    myFirstrecursiveFnc(newdata[x], data, pckge_id, req.user);
                }
                else if (removeData.length > 0) {
                    function updtpckgsrvcrel(rmData, user) {
                        PckgePlnMdl.updtpckgsrvcrelMdl(rmData, user)
                            .then(function (updtResults) {
                                y++;
                                if (y < removeData.length) {
                                    updtpckgsrvcrel(removeData[y], user)
                                   
                                } if(y == removeData.length) {
                                    df.formatSucessRes(req, res, updtResults, cntxtDtls, '', {});
                                }
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    }
                    updtpckgsrvcrel(removeData[y], req.user)
                }
                else {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }

            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}


/**************************************************************************************
* Controller     : dlte_PckgePlnCtrl
* Parameters     : req,res()
* Description    : Delete existing  packagePlan
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.dlte_PckgePlnCtrl = function (req, res) {

    PckgePlnMdl.dltePckgePlnMdl(req.params.id, req.user)
        .then(function (results) {
            if (results) {
                PckgePlnMdl.dltePckgesrvcMdl(req.params.id, req.user)
                    .then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : packagePlanLst
* Parameters     : req,res()
* Description    : get details of all packagePlanLst
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgePlnLstCtrl = function (req, res) {

    PckgePlnMdl.getPckgePlnLstMdl(req.user)
        .then(function (results) {
            // var common_feilds = ['sno', 'pckge_id', 'package_Name', 'Customer Type', 'Package Type'];
            // var arrFeilds = ['srvcpk_id', 'Service Name', 'Service Type', 'Package Charge', 'Tax Amount', 'Total Amount'];
            // var arrName = 'services';
            // var groupBy = 'pckge_id';
            // var sortKey = 'pckge_id';
            // var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}



/**************************************************************************************
* Controller     : get_PckgeservicesCtrl
* Parameters     : req,res()
* Description    : get details of all get_PckgeservicesCtrl
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeservicesCtrl = function (req, res) {

    PckgePlnMdl.get_PckgeservicesMdl(req.params.pckgeid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : get_srvcpcksCtrl
* Parameters     : req,res()
* Description    : get existing  service packs
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_srvcpcksCtrl = function (req, res) {

    PckgePlnMdl.get_srvcpcksMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, 'get_srvcpcksCtrl', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, 'get_srvcpcksCtrl', {});
        });
}



/**************************************************************************************
* Controller     : insert_PckgeAgreementCtrl
* Parameters     : req,res()
* Description    : get details of all insert_PckgeAgreementCtrl
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.insert_PckgeAgreementCtrl = function (req, res) {
    var data = req.body.data;
    PckgePlnMdl.insert_PckgeAgreementMdl(req.body.data, req.user)
        .then(function (resultsone) {
            PckgePlnMdl.insert_PckgeAgreementRelatnMdl(req.body.data, req.user, resultsone.insertId)
                .then(function (results) {
                    for (i = 0; i < data.length; i++) {
                        for (j = 0; j < data[i].tntAGntData.length; j++) {
                            if (i + 1 == data.length && j + 1 == data[i].tntAGntData.length) {
                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                            }
                            event.record('PACKAGE', data[i].pckge_id, 'PACKAGE_AGREEMENT', "Package Agreement PlanId", req.user);
                            event.record('TEMPLATE', data[i].tntAGntData[j].tmple_id, 'PACKAGE_AGREEMENT', "Package Agreement TmplateId", req.user);
                        }
                    }
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });

        })


}

/**************************************************************************************
* Controller     : get_PckgeAgreementCtrl
* Parameters     : req,res()
* Description    : get details of all get_PckgeAgreementCtrl
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_PckgeAgreementCtrl = function (req, res) {

    setTimeout(() => {
        PckgePlnMdl.get_PckgeAgreementCtrlMdl(req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }, 1000);
}

/**************************************************************************************
* Controller     : get_PckgeAgreementDtlsCtrl
* Parameters     : req,res()
* Description    : get details of all get_PckgeAgreementDtlsCtrl
* Change History :
* 7/03/2020    -  MADHURI.NUNE
*
***************************************************************************************/
exports.get_PckgeAgreementDtlsCtrl = function (req, res) {

    PckgePlnMdl.get_PckgeAgreementDtlsMdl(req.params.agreemntId, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_pckgeprtnrsCtrl
* Parameters     : req,res()
* Description    : get details of all get_pckgeprtnrsCtrl
* Change History :
* 7/03/2020    -  MADHURI.NUNE
*
***************************************************************************************/
exports.get_pckgeprtnrsCtrl = function (req, res) {

    PckgePlnMdl.get_pckgeprtnrsMdl(req.body.data, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : get_servicesPartnersCtrl
* Parameters     : req,res()
* Description    : get details of all get_servicesPartnersCtrl
* Change History :
* 17/02/2020    -  MADHURI NUNE
*
***************************************************************************************/
exports.get_servicesPartnersCtrl = function (req, res) {

    PckgePlnMdl.getservicesMdl(req.body.data, req.user)
        .then(function (services) {
            PckgePlnMdl.getpartnersMdl(req.body.data, req.user)
                .then(function (partners) {
                    df.formatSucessRes(req, res, [services, partners], cntxtDtls, '', {});
                })
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_PckgeAgreementAgentCtrl
* Parameters     : req,res()
* Description    : get details of all get_PckgeAgreementAgentCtrl
* Change History :
* 17/02/2020    -  MADHURI.NUNE  - Initial Function
*
***************************************************************************************/
exports.get_PckgeAgreementAgentCtrl = function (req, res) {

    PckgePlnMdl.get_PckgeAgreementAgentMdl(req.params.agntId, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_PlnChrgTypCtrl
* Parameters     : req,res()
* Description    : Get Charge Type of Plans
* Change History :
* 17/02/2020    -  MADHURI.NUNE  - Initial Function
*
***************************************************************************************/
exports.get_PlnChrgTypCtrl = function (req, res) {

    PckgePlnMdl.get_PlnChrgTypMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_PckgeDtlsByIdCtrl
* Parameters     : req,res()
* Description    : Get Charge Type of Plans
* Change History :
* 17/02/2020    -  MADHURI.NUNE  - Initial Function
*
***************************************************************************************/
exports.get_PckgeDtlsByIdCtrl = function (req, res) {
    PckgePlnMdl.get_PckgeDtlsByIdMdl(req.params.id, req.user)
        .then(function (results) {
            var common_feilds = ['pckge_id', 'pckge_nm', 'efcte_dt', 'expry_dt', 'total', 'caf_type_id', 'caf_type_nm', 'pckge_type_id', 'srvcpk_type_nm', 'date', 'date1', 'glbl_in', 'lckn_dys_ct'];
            var arrFeilds = ['srvcpk_id', 'srvcpk_nm', 'cre_srvce_id', 'cre_srvce_nm', 'chrge_at', 'gst_at', 'chrge_cde_id', 'chrgTyp', 'pckge_srvcpk_rel_id'];
            var arrName = 'srvcpcks';
            var groupBy = 'pckge_id';
            var sortKey = 'pckge_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            for (var i = 0; i < groupres.length; i++) {
                var totchrg_at = 0;
                var totgst_at = 0;
                var tot_at = 0;
                for (j = 0; j < groupres[i].srvcpcks.length; j++) {
                    totchrg_at = totchrg_at + groupres[i].srvcpcks[j].chrge_at;
                    totgst_at = totgst_at + groupres[i].srvcpcks[j].gst_at;
                    tot_at = totchrg_at + totgst_at
                    groupres[i]["chrg_at"] = totchrg_at.toFixed(2);
                    groupres[i]["gst_at"] = totgst_at.toFixed(2);
                    groupres[i]["total"] = tot_at.toFixed(2);
                }
            }
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_PckgesByAgntIdCtrl
* Parameters     : req,res()
* Description    : Get Charge Type of Plans
* Change History :
* 17/02/2020    -  MADHURI.NUNE  - Initial Function
*
***************************************************************************************/
exports.get_PckgesByAgntIdCtrl = function (req, res) {
    //console.log("package")
    //console.log(req.user.prt_in)
    //console.log("package")
    agnt_id = req.params.id
    if (req.user.prt_in == 2) {
        agnt_id = 101000008
    }
    PckgePlnMdl.get_PckgesByAgntIdMdl(agnt_id, req.params.caf_type_id, req.user)
        .then(function (results) {
            var common_feilds = ['agnt_id', 'agnt_nm','instal_charges', 'iptv_flag', 'efcte_dt', 'pckge_id', 'expry_dt', 'pckge_nm','pck_in_sts','bse_pck_price','lmo_share','apsfl_share','mso_share','cpe_rental',
        'tax','cpe_val','p_mode_amex','p_mode_wallet','p_mode_upi','p_mode_nb','p_mode_dc','p_mode_cc','cust_tax','Payment_gateway'];
            var arrFeilds = ['srvcpk_id', 'srvcpk_nm', 'chrge_at', 'gst_at', 'cre_srvce_id'];
            var arrName = 'srvcs';
            var groupBy = 'pckge_id';
            var sortKey = 'pckge_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');


            for (var i = 0; i < groupres.length; i++) {
                var totchrg_at = 0;
                var totgst_at = 0;
                var tot_at = 0;
                for (j = 0; j < groupres[i].srvcs.length; j++) {
                    totchrg_at = totchrg_at + groupres[i].srvcs[j].chrge_at;
                    totgst_at = totgst_at + groupres[i].srvcs[j].gst_at;
                    tot_at = totchrg_at + totgst_at
                    groupres[i]["chrg_at"] = totchrg_at.toFixed(2);
                    groupres[i]["gst_at"] = totgst_at.toFixed(2);
                    groupres[i]["total"] = tot_at.toFixed(2);
                }
            }
            //console.log(groupres)
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_entPckgesCtrl
* Parameters     : req,res()
* Description    : Get Charge Type of Plans
* Change History :
* 17/02/2020    -  MADHURI.NUNE  - Initial Function
*
***************************************************************************************/
exports.get_entPckgesCtrl = function (req, res) {
    PckgePlnMdl.get_EntPckgeMdl(req.params.id, req.params.caf_type_id, req.user)
        .then(function (results) {
            var common_feilds = ['efcte_dt', 'pckge_id', 'expry_dt', 'pckge_nm'];
            var arrFeilds = ['srvcpk_id', 'srvcpk_nm', 'chrge_at', 'gst_at', 'cre_srvce_id'];
            var arrName = 'srvcs';
            var groupBy = 'pckge_id';
            var sortKey = 'pckge_id';
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');


            for (var i = 0; i < groupres.length; i++) {
                var totchrg_at = 0;
                var totgst_at = 0;
                var tot_at = 0;
                for (j = 0; j < groupres[i].srvcs.length; j++) {
                    totchrg_at = totchrg_at + groupres[i].srvcs[j].chrge_at;
                    totgst_at = totgst_at + groupres[i].srvcs[j].gst_at;
                    tot_at = totchrg_at + totgst_at
                    groupres[i]["chrg_at"] = totchrg_at.toFixed(2);
                    groupres[i]["gst_at"] = totgst_at.toFixed(2);
                    groupres[i]["total"] = tot_at.toFixed(2);
                }
            }
            //console.log(groupres)
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : get_PckgeAgreementAprvalCtrl
* Parameters     : req,res()
* Description    : get details of all get_PckgeAgreementAprvalCtrl
* Change History :
* 21/03/2020    -  Madhuri.Nune
*
***************************************************************************************/
exports.get_PckgeAgreementAprvalCtrl = function (req, res) {

    PckgePlnMdl.get_PckgeAgreementAprvalMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}




/**************************************************************************************
* Controller     : get_agreementToAprvalCtrl
* Parameters     : req,res()
* Description    : get details of all get_agreementToAprvalCtrl
* Change History :
* 21/03/2020    -  Madhuri.Nune
*
***************************************************************************************/
exports.get_agreementToAprvalCtrl = function (req, res) {
    var ct = 0;
    function updateAprvl(PackagesData, user) {
        PckgePlnMdl.get_agreementToAprvalMdl(PackagesData, user)
            .then(function (results) {
                ct++;
                if (ct == req.body.data.packages.length) {
                    //console.log("backReesultttttttttttttttttttttttttttttttttttttttttt")
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                } else {
                    updateAprvl(req.body.data.packages[ct], req.user);
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    updateAprvl(req.body.data.packages[ct], req.user);

}



/**************************************************************************************
* Controller     : get_MyApprovals
* Parameters     : req,res()
* Description    : get details of all get_MyApprovals
* Change History :
* 21/03/2020    -  Madhuri.Nune
*
***************************************************************************************/
exports.get_MyApprovals = function (req, res) {

    PckgePlnMdl.get_MyApprovalsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}



/**************************************************************************************
* Controller     : get_recentapprovals
* Parameters     : req,res()
* Description    : get details of all get_recentapprovals
* Change History :
* 21/03/2020    -  Madhuri.Nune
*
***************************************************************************************/
exports.get_recentapprovals = function (req, res) {

    PckgePlnMdl.get_recentapprovalsMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : get_PckgeservicesCtrl
* Parameters     : req,res()
* Description    : get details of all get_PckgeservicesCtrl
* Change History :
* 05/02/2020    -  SCRIPT DENERATED  - Initial Function
*
***************************************************************************************/
exports.get_rpt_pckgCtrl = function (req, res) {

    PckgePlnMdl.get_rpt_pckgMdl(req.params.pckgeid, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
