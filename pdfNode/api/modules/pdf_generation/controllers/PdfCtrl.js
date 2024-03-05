const PdfMdl = require(appRoot + '/pdfNode/api/modules/pdf_generation/models/PdfMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var template = require(appRoot + '/utils/PdfGeneration');
var jsonUtils = require(appRoot + '/utils/json.utils');
const { RemoteCredentials } = require('aws-sdk');
var _ = require('lodash');
var sts_dt = {};

/**************************************************************************************
* Controller     : retryPdfsCtrl
* Parameters     : req,res()
* Description    : Generate PDF
* Change History :  Sravani M
*
***************************************************************************************/
exports.retryPdfsCtrl = function (req, res) {
    var count = 0;
    // var sts_dt = req.body.data;
    // var worker = cluster.fork();
    var cstmrInvoicArray;
    var total_cnt;
    PdfMdl.getgeneratePdfCstmrsMdl(req.body.data, req.body.user)
        .then(function (results) {
            // console.log(results);
            if (results.length) {
                if (req.body.data.caf_id && results[0].invce_pdf_url_tx != null) {
                    return df.formatSucessRes(req, res, { err: 'gen' }, cntxtDtls, '', {});
                }
                else {
                    PdfMdl.getcafvoipcalldtlsMdl(req.body.data, req.user)
                        .then(function (results1) {
                            PdfMdl.getcafvoipcallhistryMdl(req.body.data, req.user).then(function (results2) {
                                var common_feilds = ['customerid', 'entrpe_type_id', 'contactname', 'blng_addr1_tx', 'blng_addr2_tx', 'num', 'blng_pn_cd', 'cst_invoiceid', 'duedate', 'billdate',
                                    'billstart', 'billend', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'prvbal', 'crrnt_bill', 'pyble_at', 'balnce', 'ttl_tax', 'loc_addr2_tx', 'adjsd_at', 'blng_eml1_tx', 'hsi_total', 'hsi_pckge_nm', 'phne_nu'];
                                var arrFeilds = ['cafid', 'customerid', 'blng_eml1_tx', 'contactname', 'invce_at', 'srvc_at', 'chrge_cd', 'chrge_cde_id', 'chrge_at', 'pckge_id', 'pckge_nm', 'blng_addr1_tx', 'loc_addr2_tx', 'blng_addr2_tx', 'num', 'blng_pn_cd', 'cst_invoiceid', 'duedate', 'billdate', 'cgst_at', 'sgst_at', 'billstart', 'billend', 'entrpe_type_id', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'actvn_dt', 'voip_chrge_at', 'recring_chrge_at', 'value_add_srvce_at', 'hsi_chrge_at', 'add_on_chrge_at', 'inve_amnt', 'chrge_frm_dt', 'chrge_to_dt', 'plan_act', 'hsi_total', 'hsi_pckge_nm', 'phne_nu'];
                                var arrName = 'cafDtls';
                                var groupByKey = 'customerid';
                                var sortKey = ''
                                cstmrInvoicArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
                                cstmrInvoicArray.forEach(Element => {
                                    var common_feilds = ['sno', 'cafid', 'customerid', 'contactname', 'invce_at', 'srvc_at', 'chrge_cd', 'chrge_cde_id', 'chrge_at', 'pckge_id', 'pckge_nm', 'blng_addr1_tx', 'blng_addr2_tx', 'num', 'blng_pn_cd', 'cst_invoiceid', 'duedate', 'billdate', 'cgst_at', 'sgst_at',
                                        'billstart', 'billend', 'entrpe_type_id', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'actvn_dt', 'voip_chrge_at', 'recring_chrge_at', 'value_add_srvce_at', 'hsi_chrge_at', 'add_on_chrge_at', 'inve_amnt', 'loc_addr2_tx', 'blng_eml1_tx', 'hsi_total', 'hsi_pckge_nm', 'phne_nu'];
                                    var arrFeilds = ['chrge_cd', 'chrge_cde_id', 'chrge_at', 'pckge_id', 'pckge_nm', 'chrge_frm_dt', 'chrge_to_dt', 'plan_act'];
                                    var arrName = 'packages';
                                    var groupByKey = 'cafid';
                                    var sortKey = 'sno'
                                    Element.cafDtls = jsonUtils.groupJsonByKey(Element.cafDtls, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
                                })
                                for (let m = 0; m < cstmrInvoicArray.length; m++) {
                                    var currentbill = 0;
                                    for (let i = 0; i < cstmrInvoicArray[m].cafDtls.length; i++) {
                                        currentbill = currentbill + cstmrInvoicArray[m].cafDtls[i].inve_amnt;
                                        cstmrInvoicArray[m].ttl_tax = currentbill.toFixed(2);
                                        cstmrInvoicArray[m].crrnt_bill = currentbill.toFixed(2);

                                    }
                                }
                                for (let m = 0; m < cstmrInvoicArray.length; m++) {
                                    for (let i = 0; i < cstmrInvoicArray[m].cafDtls.length; i++) {
                                        cstmrInvoicArray[m].cafDtls[i]['voipDtls'] = [];
                                        for (let j = 0; j < results1.length; j++) {
                                            if (results1[j].caf_id == cstmrInvoicArray[m].cafDtls[i].cafid) {
                                                cstmrInvoicArray[m].cafDtls[i]['voipDtls'].push({ type: 'Local', count: results1[j].locl_calls, duration: results1[j].lcl_duration, charge: results1[j].lcl_chtge }, { type: 'STD', std_clls: results1[j].std_calls, duration: results1[j].std_duration, charge: results1[j].std_chtge }, { type: 'ISD', std_clls: results1[j].isd_calls, duration: results1[j].istd_duration, charge: results1[j].istd_chtge })
                                            }
                                        }
                                    }
                                }
                                for (let m = 0; m < cstmrInvoicArray.length; m++) {

                                    for (let i = 0; i < cstmrInvoicArray[m].cafDtls.length; i++) {
                                        cstmrInvoicArray[m].cafDtls[i]['localCalls'] = [];
                                        cstmrInvoicArray[m].cafDtls[i]['stdCalls'] = [];
                                        cstmrInvoicArray[m].cafDtls[i]['istdCalls'] = [];


                                        for (let j = 0; j < results2.length; j++) {
                                            if (results2[j].caf_nu == cstmrInvoicArray[m].cafDtls[i].cafid) {
                                                if (results2[j].lcl_cals_in == 1) {
                                                    cstmrInvoicArray[m].cafDtls[i]
                                                    ['localCalls'].push({ date: results2[j].date, time: results2[j].time, number: results2[j].cld_phne_nu, duration: results2[j].lcl_duration, count: results2[j].lcl_calls, charge: results2[j].lcl_chtge })
                                                }
                                                if (results2[j].std_cals_in == 1) {
                                                    cstmrInvoicArray[m].cafDtls[i]
                                                    ['stdCalls'].push({ date: results2[j].date, time: results2[j].time, number: results2[j].cld_phne_nu, duration: results2[j].std_duration, count: results2[j].std_calls, charge: results2[j].std_chtge })
                                                }
                                                if (results2[j].istd_cals_in == 1) {
                                                    cstmrInvoicArray[m].cafDtls[i]
                                                    ['istdCalls'].push({ date: results2[j].date, time: results2[j].time, number: results2[j].cld_phne_nu, duration: results2[j].istd_duration, count: results2[j].istd_calls, charge: results2[j].istd_chtge })
                                                }

                                            }
                                        }
                                    }
                                }

                                total_cnt = cstmrInvoicArray.length;
                                if (cstmrInvoicArray.length > 0) {
                                    var key = false;
                                    var key1 = false;
                                    var pdfcount = 0;
                                    recursivegenratePdf(cstmrInvoicArray[0])
                                    function recursivegenratePdf(invcedata) {
                                        console.log("mypdfcount", pdfcount)
                                        template.generatePdf(invcedata, req.body.data, function (err, results) {
                                            if (err) {
                                                console.log(err);
                                                key = true;
                                                let data = {
                                                    sts_id: req.body.data.sts_id
                                                }
                                                PdfMdl.updtpdfstsCntPartlMdl(data, req.user).then(function (results2) {
                                                    pdfcount++;
                                                    if (pdfcount < cstmrInvoicArray.length) {
                                                        recursivegenratePdf(cstmrInvoicArray[pdfcount])
                                                    }
                                                    console.log(cstmrInvoicArray.length, pdfcount)
                                                    if (cstmrInvoicArray.length == pdfcount) {
                                                        var stsdata;
                                                        if (key == true && key1 == true) {
                                                            stsdata = {
                                                                sts_tx: "partially completed",
                                                                sts_id: req.body.data.sts_id
                                                            }

                                                        }
                                                        else if (key == true && key1 == false) {
                                                            stsdata = {
                                                                sts_tx: "Failed",
                                                                sts_id: req.body.data.sts_id
                                                            }
                                                        }
                                                        else {
                                                            stsdata = {
                                                                sts_tx: "Completed",
                                                                sts_id: req.body.data.sts_id
                                                            }

                                                        }
                                                        PdfMdl.updtpdfstsMdl(stsdata, req.user).then(function (resultsfin) {
                                                            console.log("susess");
                                                            return df.formatSucessRes(req, res, resultsfin, cntxtDtls, '', {});
                                                        }).catch(function (error) {
                                                            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                        })
                                                    }
                                                }).catch(function (error) {
                                                    return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                })
                                            }
                                            else if (results) {
                                                key1 = true;
                                                PdfMdl.updatePdfUrl(results, req.body.user)
                                                    .then(function (results1) {
                                                        if (results1) {
                                                            let data = {
                                                                sts_id: req.body.data.sts_id
                                                            }
                                                            PdfMdl.updtpdfstsCntMdl(data, req.user).then(function (results2) {
                                                                pdfcount++;
                                                                if (pdfcount < cstmrInvoicArray.length) {
                                                                    recursivegenratePdf(cstmrInvoicArray[pdfcount])
                                                                }
                                                                console.log(cstmrInvoicArray.length, pdfcount)
                                                                if (cstmrInvoicArray.length == pdfcount) {
                                                                    var stsdata;
                                                                    if (key == true && key1 == true) {
                                                                        stsdata = {
                                                                            sts_tx: "partially completed",
                                                                            sts_id: req.body.data.sts_id
                                                                        }

                                                                    }
                                                                    else if (key == true && key1 == false) {
                                                                        stsdata = {
                                                                            sts_tx: "Failed",
                                                                            sts_id: req.body.data.sts_id
                                                                        }
                                                                    }
                                                                    else {
                                                                        stsdata = {
                                                                            sts_tx: "Completed",
                                                                            sts_id: req.body.data.sts_id
                                                                        }

                                                                    }
                                                                    PdfMdl.updtpdfstsMdl(stsdata, req.user).then(function (resultsfin) {
                                                                        console.log("susess")
                                                                        return df.formatSucessRes(req, res, resultsfin, cntxtDtls, '', {});
                                                                    }).catch(function (error) {
                                                                        return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                    })
                                                                }
                                                            }).catch(function (error) {
                                                                return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                            })
                                                        }
                                                    })
                                            }
                                        })

                                    }
                                }

                                else {

                                    return df.formatSucessRes(req, res, { err: 'gen' }, cntxtDtls, '', {});
                                }
                            }).catch(function (error) {

                                return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            })
                        }).catch(function (error) {
                            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        })
                }
            }
            else {

                return df.formatSucessRes(req, res, { err: 'gen' }, cntxtDtls, '', {});
            }
        }).catch(function (error) {

            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : generateCountPdf
* Parameters     : req,res()
* Description    : Generate PDF
* Change History :  Sravani M
*
***************************************************************************************/
exports.generateCountPdf = function (req, res) {
    if (req.body.data.caf_id) {
        PdfMdl.checkCstmrMdl(req.body.data)
            .then(function (results) {
                if (results.length) {
                    console.log("in check if")
                    req.body.data['cstmr_id'] = results[0].cstmr_id;
                    console.log(results.length)
                    PdfMdl.insertIntostsMdl(req.body.data,1, req.body.user).then(function (results3) {
                        let inertId = results3.insertId
                        sts_dt.sts_id = inertId;
                        PdfMdl.usrGnrtdPdfsMdl(req.body.user)
                            .then(function (results4) {
                                pdfGen(req, res,results4);
                                return df.formatSucessRes(req, res, { data: results4 }, cntxtDtls, '', {});
                            }).catch(function (error) {
                                return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    }).catch(function (error) {
    
                        return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
                    // pdfGen(req, res);
                } else {
                    return df.formatSucessRes(req, res, { err: 'nouser' }, cntxtDtls, '', {});
                }
            }).catch(function (error) {

                return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    } else {
        PdfMdl.getcstmrcntCstmrMdl(req.body.data)
            .then(function (results) {
                PdfMdl.insertIntostsMdl(req.body.data, results[0].count, req.body.user).then(function (results3) {
                    let inertId = results3.insertId
                    sts_dt.sts_id = inertId;
                    PdfMdl.usrGnrtdPdfsMdl(req.body.user)
                        .then(function (results4) {
                            pdfGen(req, res,results4);
                            return df.formatSucessRes(req, res, { data: results4 }, cntxtDtls, '', {});
                        }).catch(function (error) {
                            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                }).catch(function (error) {

                    return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });

            }).catch(function (error) {

                return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });

    }
}

function pdfGen(req, res,stsData) {
    PdfMdl.getgeneratePdfCstmrsMdl(req.body.data, req.body.user)
        .then(function (results) {
            //  console.log(results)
             console.log("results")
            if (results && results.length) {
                console.log(req.body.data.caf_id, results[0].invce_pdf_url_tx)
                // if (req.body.data.caf_id && results[0].invce_pdf_url_tx != null) {
                //     return df.formatSucessRes(req, res, { err: 'gen' }, cntxtDtls, '', {});
                // }
                // else {
                    PdfMdl.getcafvoipcalldtlsMdl(req.body.data, req.user)
                        .then(function (results1) {
                            PdfMdl.getcafvoipcallhistryMdl(req.body.data, req.user).then(function (results2) {
                                var common_feilds = ['customerid', 'entrpe_type_id', 'contactname', 'blng_addr1_tx', 'blng_addr2_tx', 'num', 'blng_pn_cd', 'cst_invoiceid', 'duedate', 'billdate',
                                    'billstart', 'billend', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'prvbal', 'crrnt_bill', 'pyble_at', 'balnce', 'ttl_tax', 'loc_addr2_tx', 'adjsd_at', 'blng_eml1_tx', 'hsi_total', 'hsi_pckge_nm', 'phne_nu','addrs_rbk_txt'];
                                var arrFeilds = ['cafid', 'customerid', 'blng_eml1_tx', 'contactname', 'invce_at', 'srvc_at', 'chrge_cd', 'chrge_cde_id', 'chrge_at', 'pckge_id', 'pckge_nm', 'blng_addr1_tx', 'loc_addr2_tx', 'blng_addr2_tx', 'num', 'blng_pn_cd', 'cst_invoiceid', 'duedate', 'billdate', 'cgst_at', 'sgst_at', 'billstart', 'billend', 'entrpe_type_id', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'actvn_dt', 'voip_chrge_at', 'recring_chrge_at', 'value_add_srvce_at', 'hsi_chrge_at', 'add_on_chrge_at', 'inve_amnt', 'chrge_frm_dt', 'chrge_to_dt', 'plan_act', 'hsi_total', 'hsi_pckge_nm', 'phne_nu','cgst1','sgst1'];
                                var arrName = 'cafDtls';
                                var groupByKey = 'customerid';
                                var sortKey = ''
                                cstmrInvoicArray = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
                                cstmrInvoicArray.forEach(Element => {
                                    var common_feilds = ['sno', 'cafid', 'customerid', 'contactname', 'invce_at', 'srvc_at', 'chrge_cd', 'chrge_cde_id', 'chrge_at', 'pckge_id', 'pckge_nm', 'blng_addr1_tx', 'blng_addr2_tx', 'num', 'blng_pn_cd', 'cst_invoiceid', 'duedate', 'billdate', 'cgst_at', 'sgst_at',
                                        'billstart', 'billend', 'entrpe_type_id', 'dstrt_nm', 'mndl_nm', 'vlge_nm', 'actvn_dt', 'voip_chrge_at', 'recring_chrge_at', 'value_add_srvce_at', 'hsi_chrge_at', 'add_on_chrge_at', 'inve_amnt', 'loc_addr2_tx', 'blng_eml1_tx', 'hsi_total', 'hsi_pckge_nm', 'phne_nu'];
                                    var arrFeilds = ['chrge_cd', 'chrge_cde_id', 'chrge_at', 'pckge_id', 'pckge_nm', 'chrge_frm_dt', 'chrge_to_dt', 'plan_act','cgst1','sgst1'];
                                    var arrName = 'packages';
                                    var groupByKey = 'cafid';
                                    var sortKey = 'sno'
                                    Element.cafDtls = jsonUtils.groupJsonByKey(Element.cafDtls, common_feilds, arrFeilds, arrName, groupByKey, sortKey, "asc");
                                })
                                console.log("sravani",cstmrInvoicArray.length)
                                for (let m = 0; m < cstmrInvoicArray.length; m++) {
                                    var currentbill = 0;
                                    
                                    // console.log("in for 1")
                                    // console.log(stsData)
                                    cstmrInvoicArray[m]['sts_id'] = stsData[0].sts_id
                                    for (let i = 0; i < cstmrInvoicArray[m].cafDtls.length; i++) {
                                        // console.log("in for 2")
                                        var totalbill = 0;
                                        var pckgesgst = 0;
                                        var pckgecgst = 0;
                                        cstmrInvoicArray[m].cafDtls[i].packages = _.uniqBy(cstmrInvoicArray[m].cafDtls[i].packages, 'pckge_id');
                                        for(let k = 0; k < cstmrInvoicArray[m].cafDtls[i].packages.length; k++){
                                            console.log(cstmrInvoicArray[m].cafDtls[i].packages[k].cgst1,cstmrInvoicArray[m].cafDtls[i].packages[k].sgst1,"sravani")
                                            totalbill = totalbill + cstmrInvoicArray[m].cafDtls[i].packages[k].chrge_at;
                                            pckgesgst = pckgesgst + cstmrInvoicArray[m].cafDtls[i].packages[k].sgst1;
                                            pckgecgst = pckgecgst + cstmrInvoicArray[m].cafDtls[i].packages[k].cgst1;
                                        }
                                        console.log(totalbill)
                                        currentbill = currentbill + cstmrInvoicArray[m].cafDtls[i].inve_amnt;
                                        cstmrInvoicArray[m].ttl_tax = currentbill.toFixed(2);
                                        cstmrInvoicArray[m].crrnt_bill = currentbill.toFixed(2);
                                        cstmrInvoicArray[m].cafDtls[i]['voipDtls'] = [];
                                        cstmrInvoicArray[m].cafDtls[i]['ttl_pckge_amnt'] = totalbill.toFixed(2);
                                        cstmrInvoicArray[m].cafDtls[i]['ttl_pckge_stax'] = pckgesgst.toFixed(2);
                                        cstmrInvoicArray[m].cafDtls[i]['ttl_pckge_ctax'] = pckgecgst.toFixed(2);
                                        for (let j = 0; j < results1.length; j++) {
                                            // console.log("in for 3")
                                            if (results1[j].caf_id == cstmrInvoicArray[m].cafDtls[i].cafid) {
                                                // console.log("in if")
                                                cstmrInvoicArray[m].cafDtls[i]['voipDtls'].push({ type: 'Local', count: results1[j].locl_calls, duration: results1[j].lcl_duration, charge: results1[j].lcl_chtge }, { type: 'STD', std_clls: results1[j].std_calls, duration: results1[j].std_duration, charge: results1[j].std_chtge }, { type: 'ISD', std_clls: results1[j].isd_calls, duration: results1[j].istd_duration, charge: results1[j].istd_chtge })
                                            }
                                        }
                                        cstmrInvoicArray[m].cafDtls[i]['localCalls'] = [];
                                        cstmrInvoicArray[m].cafDtls[i]['stdCalls'] = [];
                                        cstmrInvoicArray[m].cafDtls[i]['istdCalls'] = [];


                                        for (let j = 0; j < results2.length; j++) {
                                            // console.log("in for 1")
                                            if (results2[j].caf_nu == cstmrInvoicArray[m].cafDtls[i].cafid) {
                                                if (results2[j].lcl_cals_in == 1) {
                                                    cstmrInvoicArray[m].cafDtls[i]
                                                    ['localCalls'].push({ date: results2[j].date, time: results2[j].time, number: results2[j].cld_phne_nu, duration: results2[j].lcl_duration, count: results2[j].lcl_calls, charge: results2[j].lcl_chtge })
                                                }
                                                if (results2[j].std_cals_in == 1) {
                                                    cstmrInvoicArray[m].cafDtls[i]
                                                    ['stdCalls'].push({ date: results2[j].date, time: results2[j].time, number: results2[j].cld_phne_nu, duration: results2[j].std_duration, count: results2[j].std_calls, charge: results2[j].std_chtge })
                                                }
                                                if (results2[j].istd_cals_in == 1) {
                                                    cstmrInvoicArray[m].cafDtls[i]
                                                    ['istdCalls'].push({ date: results2[j].date, time: results2[j].time, number: results2[j].cld_phne_nu, duration: results2[j].istd_duration, count: results2[j].istd_calls, charge: results2[j].istd_chtge })
                                                }

                                            }
                                        }

                                    }
                                }
                                if (cstmrInvoicArray.length > 0) {
                                    getgeneratePdfCstmrs_Ctrl(req,res,cstmrInvoicArray)
                                }

                            }).catch(function (error) {
                            });
                        }).catch(function (error) {

                        });

                // }
            } else if (req.body.data.caf_id) {
                return df.formatSucessRes(req, res, { err: 'billnot' }, cntxtDtls, '', {});
            }
            else {
                return df.formatSucessRes(req, res, { err: 'gen' }, cntxtDtls, '', {});
            }
        }).catch(function (error) {
        });
}




/**************************************************************************************
* Controller     : generatePdf
* Parameters     : req,res()
* Description    : Generate PDF
* Change History :  Sravani M
*
***************************************************************************************/
let counter_pdf = 0;
function getgeneratePdfCstmrs_Ctrl (req, res,cstmrinvcedata) {
    console.log("sravani", ++counter_pdf);
    var key = false;
    var key1 = false;
    var pdfcount = 0;
    recursivegenratePdf(cstmrinvcedata[0])
    function recursivegenratePdf(invcedata) {
        console.log("mypdfcount", pdfcount)
        template.generatePdf(invcedata, req.body.data, function (err, results) {
            if (err) {
                console.log(err);
                key = true;
                let data = {
                    sts_id: cstmrinvcedata[0].sts_id
                }
                PdfMdl.updtpdfstsCntPartlMdl(data, req.user).then(function (results2) {
                    pdfcount++;
                    if (pdfcount < cstmrinvcedata.length) {
                        recursivegenratePdf(cstmrinvcedata[pdfcount])
                    }
                    console.log(cstmrinvcedata.length, pdfcount)
                    if (cstmrinvcedata.length == pdfcount) {
                        var stsdata;
                        if (key == true && key1 == false) {
                            stsdata = {
                                sts_tx: "partially completed",
                                sts_id: cstmrinvcedata[0].sts_id
                            }

                        }
                        else if (key == true && key1 == true) {
                            stsdata = {
                                sts_tx: "Failed",
                                sts_id: cstmrinvcedata[0].sts_id
                            }
                        }
                        else {
                            stsdata = {
                                sts_tx: "Completed",
                                sts_id: cstmrinvcedata[0].sts_id
                            }

                        }
                        PdfMdl.updtpdfstsMdl(stsdata, req.user).then(function (resultsfin) {
                            console.log("susess");
                        }).catch(function (error) {
                            // return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        })
                    }
                }).catch(function (error) {
                    // return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                })
            }
            else if (results) {
                key1 = true;
                PdfMdl.updatePdfUrl(results, req.body.user)
                    .then(function (results1) {
                        if (results1) {
                            let data = {
                                sts_id: cstmrinvcedata[0].sts_id
                            }
                            PdfMdl.updtpdfstsCntMdl(data, req.user).then(function (results2) {
                                pdfcount++;
                                if (pdfcount < cstmrinvcedata.length) {
                                    recursivegenratePdf(cstmrinvcedata[pdfcount])
                                }
                                console.log(cstmrinvcedata.length, pdfcount)
                                if (cstmrinvcedata.length == pdfcount) {
                                    var stsdata;
                                    if (key == true && key1 == true) {
                                        stsdata = {
                                            sts_tx: "partially completed",
                                            sts_id: cstmrinvcedata[0].sts_id
                                        }

                                    }
                                    else if (key == true && key1 == false) {
                                        stsdata = {
                                            sts_tx: "Failed",
                                            sts_id: cstmrinvcedata[0].sts_id
                                        }
                                    }
                                    else {
                                        stsdata = {
                                            sts_tx: "Completed",
                                            sts_id: cstmrinvcedata[0].sts_id
                                        }

                                    }
                                    PdfMdl.updtpdfstsMdl(stsdata, req.user).then(function (resultsfin) {
                                        console.log("susess")
                                        // return df.formatSucessRes(req, res, resultsfin, cntxtDtls, '', {});
                                    }).catch(function (error) {
                                        // return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    })
                                }
                            }).catch(function (error) {
                                // return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            })
                        }
                    })
            }
        })

    }

}
/**************************************************************************************
* Controller     : usrGnrtdPdfs
* Parameters     : req,res()
* Description    : Get payments of a agent
* Change History :
* 19/02/2020    -  Sony V  - Initial Function
*
***************************************************************************************/
exports.usrGnrtdPdfs = function (req, res) {
    var fnm = "usrGnrtdPdfsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    PdfMdl.usrGnrtdPdfsMdl(req.body.user)
        .then(function (results) {
            return df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : myGenrtPdfsCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 31/03//2020    -  Sravani M  - Initial Function
*
***************************************************************************************/
exports.myGenrtPdfsCtrl = function (req, res) {

    PdfMdl.myGenrtPdfsCtrlMdl(req.body.data, req.body.user)
        .then(function (results) {
            return df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : myRecntGenrtPdfsCtrl
* Parameters     : req,res()
* Description    :
* Change History :
* 31/03//2020    -  Sravani M  - Initial Function
*
***************************************************************************************/
exports.myRecntGenrtPdfsCtrl = function (req, res) {

    PdfMdl.myRecntGenrtPdfsCtrlMdl(req.body.data, req.body.user)
        .then(function (results) {
            return df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            return df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

