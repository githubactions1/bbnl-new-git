const inventoryMdl = require(appRoot + '/server/api/modules/inventory/models/inventoryMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : Get Inventory Product Details
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getInvetryPrdctLst = (req, res) => {
    var fnm = "getInvetryPrdctLst";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    ////console.log(req.user)
    inventoryMdl.getInvetryPrdctLstMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Inventory Product Models
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getPrdctModls = (req, res) => {
    var fnm = "getPrdctModls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    let prdctId = req.params.id
    inventoryMdl.getPrdctModlsMdl(prdctId,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Inventory Product Prefixes
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getSetupboxPrefix = (req, res) => {
    var fnm = "getSetupboxPrefix";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getSetupboxPrefixMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Upload setup boxes
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.uploadSetupBox = (req, res) => {
    var fnm = "uploadSetupBox";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var count = 0;
    var duplicate;
    var insertId
    var batchid=req.body.data[0].Batch_Id
    inventoryMdl.uploadSetupBoxMdl(req.body.data, req.user)
        .then((results) => {
            insertId = results.insertId;
            function insrtSetUpBox(data, user) {
                inventoryMdl.insertSetupBoxMdl(data, insertId, user)
                    .then((results) => {
                        count++
                        if (count < req.body.data.length) {
                            insrtSetUpBox(req.body.data[count], req.user)
                        }
                        if (count == req.body.data.length) {
                            inventoryMdl.selectSetupBoxMastMdl(batchid,req.user)
                                .then((results1) => {
                                    duplicate = results1
									var data_view = {
										url : "http://172.16.0.129/apiv2/ext/wrapper/inventoryUpladfromBbnlBss",
										method : "post",
										json : true,
										body : {
											"data" : req.body.data
										}
									}
									console.log("98",data_view)
									//request(data_view, function(err, resp, body ){ console.log("uploadSetupBox",err,body) })
                                    inventoryMdl.insertSetupBoxMastMdl(batchid,req.user)
                                        .then((results2) => {
                                            inventoryMdl.deleteSetboxStgMdl(batchid,req.user)
                                            df.formatSucessRes(req, res, { resbck: results2, dupli: duplicate }, cntxtDtls, fnm, {});
                                        }).catch((error) => {
                                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                        });
                                }).catch((error) => {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });

                        }
                    }).catch((error) => {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
            insrtSetUpBox(req.body.data[0], req.user)
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getAgentCpeStock = (req, res) => {
    var fnm = "getAgentCpeStock";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getAgentCpeStockMdl(req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get AGent Cpe Stock By Agent Category
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getAgentCpeStockByCtgry = (req, res) => {
    var fnm = "getAgentCpeStockByCtgry";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getAgentCpeStockByCtgryMdl(req.params.ctgryid,req.params.id,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 27/04/2020    - Koti Machina - Initial Function
***************************************************************************************/
exports.getAgentCpeStockPrdctIdCtrl = (req, res) => {
    var fnm = "getAgentCpeStockPrdctIdCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getAgentCpeStockPrdctIdMdl(req.params.id,req.params.prdctid,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getAgentCpeStockByPrdctId = (req, res) => {
    var fnm = "getAgentCpeStockByPrdctId";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getAgentCpeStockByPrdctIdMdl(req.params.id, req.params.prdctid, req.params.frm_date, req.params.to_date, req.params.srlnum,req.params.ctgryId,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getUploadCpeStock = (req, res) => {
    var fnm = "getUploadCpeStock";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getUploadCpeStockMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getRecntUploadCpeStock = (req, res) => {
    var fnm = "getRecntUploadCpeStock";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getRecntUploadCpeStockMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.insrtaddPrix = (req, res) => {
    var fnm = "insrtaddPrix";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.insrtaddPrixMdl(req.body.data, req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.updteTransfrCpe = (req, res) => {
    var fnm = "updteTransfrCpe";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var count = 0;
    var finalreslt = [];
    var notlmostbx = []
    inventoryMdl.insrtTransfrdtlsMdl(req.body.data, req.user)
        .then((results) => {
            var insertId = results.insertId;
            function recursiveInsrt(data, user, id) {
                // inventoryMdl.checkSrlnoMdl(data).then((results1)=>{
                //     if(results1.length){
                        // data['stpbx_id']=results1[0].stpbx_id
                        inventoryMdl.insrtTransfrRelMdl(data, user, id)
                        .then((results2) => {
                            // finalreslt.push(results2)
                            count++;
                            ////console.log(count,req.body.data.length)
                            if (count < req.body.data.length) {
                                recursiveInsrt(req.body.data[count], req.user, insertId)
                            }
                            if (count == req.body.data.length) {
                                ////console.log("in final")
                                df.formatSucessRes(req, res, results2, cntxtDtls, fnm, {});
                            }
                        }).catch((error) => {
                            ////console.log("sravani")
                            ////console.log("error")
                            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        });
                    // }
                    // else{
                    //     notlmostbx.push({'Cpe Serial No':data.Cpe_Serial_No})
                    //     if (count == req.body.data.length) {
                    //         df.formatSucessRes(req, res, {data:finalreslt,notinlmo:notlmostbx}, cntxtDtls, fnm, {});
                    //     }
                    // }


                // }).catch((error) => {
                //         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                //     });

            }
            recursiveInsrt(req.body.data[count], req.user, insertId)
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.deleteCpe = (req, res) => {
    var fnm = "deleteCpeToAgent";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    var count = 0;
    function deletecpe(data, user) {
        inventoryMdl.deleteCpeToAgentMdl(data, user)
            .then((results) => {
                count++;
                if (count < req.body.data.length) {
                    deletecpe(req.body.data[count], req.user)
                }
                if (count == req.body.data.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                }
            }).catch((error) => {
                df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
            });

    }
    deletecpe(req.body.data[count], req.user)


}

/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getTransferUploadCpeStock = (req, res) => {
    var fnm = "getTransferUploadCpeStock";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getTransferUploadCpeStockMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}
/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getTransferRecntUploadCpeStock = (req, res) => {
    var fnm = "getTransferRecntUploadCpeStock";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getTransferRecntUploadCpeStockMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : Get Inventory Suppliers Stock Count
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Ramya Machana - Initial Function
***************************************************************************************/
exports.getInvntrySplrsCntCtrl = (req, res) => {
    var fnm = "getInvntrySplrsCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getInvntrySplrsCntMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Get Inventory Total Stock Count
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Ramya Machana - Initial Function
***************************************************************************************/
exports.getInvntryTtlCntCtrl = (req, res) => {
    var fnm = "getInvntryTtlCntCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    inventoryMdl.getInvntryTtlCntMdl(req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : Get Gent Cpe Stock
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getCpeStockBySrlnumCtrl = (req, res) => {
    var fnm = "getCpeStockBySrlnumCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    ////console.log(req.body.data)
    inventoryMdl.getCpeStockBySrlnumMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}

/**************************************************************************************
* Controller     : getBoxDtlsCtrl
* Parameters     : None
* Description    : 
* Change History :
* 17/02/2020    - Sravani Machina - Initial Function
***************************************************************************************/
exports.getBoxDtlsCtrl = (req, res) => {
    var fnm = "getBoxDtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    ////console.log(req.body.data)
    inventoryMdl.getBoxDtlsMdl(req.body.data,req.user)
        .then((results) => {
            df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
        }).catch((error) => {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });

}


/**************************************************************************************
* Controller     : updtbxchngdtlsCtrl
* Parameters     : req,res
* Description    : 
* Change History : 19/06/2020    -  pradeep
*
***************************************************************************************/
exports.updtbxchngdtlsCtrl = function (req, res) {
    var data= req.body.data;
    // //console.log(data);
    if (data.box_chng_typ == 1) {
        inventoryMdl.getboxdtlsMdl(data.old_iptv_srl_nu,req.user)
            .then(function (results) {
                // //console.log(results)

                inventoryMdl.updtoldbxMdl(results[0],data.caf_id,req.user)
                    .then(function (results1) {
                        // //console.log(results1)

                        inventoryMdl.getboxdtlsMdl(data.new_iptv_srl_nu,req.user)
                            .then(function (results2) {
                                // //console.log(results2)
                                let type = 'iptv'
                                inventoryMdl.updtcafdtltblMdl(results2[0], type, data.caf_id,req.user)
                                    .then(function (results3) {
                                        // //console.log(results3)
                                        //inventoryMdl.insrtbxrelMdl(results2[0], data.caf_id,req.user)
                                            //.then(function (results4) {
                                                 inventoryMdl.updtnewbxMdl(results2[0], data.caf_id,req.user)
                                                .then(function (updtenewboxres) {
                                                    df.formatSucessRes(req, res, updtenewboxres, cntxtDtls, '', {});
                                                }).catch(function (error) {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                });
                                                
                                            /*}).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                            });*/
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    else if (data.box_chng_typ == 2) {
        inventoryMdl.getboxdtlsMdl(data.old_onu_srl_nu,req.user)
            .then(function (results) {
                //console.log(results)

                inventoryMdl.updtoldbxMdl(results[0],data.caf_id,req.user)
                    .then(function (results1) {
                        // //console.log(results1)

                        inventoryMdl.getboxdtlsMdl(data.new_onu_srl_nu,req.user)
                            .then(function (results2) {
                                // //console.log(results2)
                                let type = 'onu'
                                inventoryMdl.updtcafdtltblMdl(results2[0], type, data.caf_id,req.user)
                                    .then(function (results3) {
                                        // //console.log(results3)
                                        //inventoryMdl.insrtbxrelMdl(results2[0], data.caf_id,req.user)
                                            //.then(function (results4) {
                                                inventoryMdl.updtnewbxMdl(results2[0], data.caf_id,req.user)
                                                .then(function (updtenewboxres) {
                                                    df.formatSucessRes(req, res, updtenewboxres, cntxtDtls, '', {});
                                                }).catch(function (error) {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                });
                                                // df.formatSucessRes(req, res, results4, cntxtDtls, '', {});
                                            /*}).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                            });*/
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    else if (data.box_chng_typ == 3) {
        inventoryMdl.updtboxdtlsMdl(data,req.user)
            .then(function (results) {
                inventoryMdl.getboxdtlsMdl(data.new_onu_srl_nu,req.user)
                    .then(function (results2) {
                        // //console.log(results2)
                        let type = 'onu'
                        inventoryMdl.updtcafdtltblMdl(results2[0], type, data.caf_id,req.user)
                            .then(function (results3) {
                                // //console.log(results3)
                                //inventoryMdl.insrtbxrelMdl(results2[0], data.caf_id,req.user)
                                    //.then(function (results4) {
                                        inventoryMdl.getboxdtlsMdl(data.new_iptv_srl_nu,req.user)
                                            .then(function (results5) {
                                                ////console.log(results5)
                                                let type = 'iptv'
                                                inventoryMdl.updtcafdtltblMdl(results5[0], type, data.caf_id,req.user)
                                                    .then(function (results6) {
                                                        // //console.log(results6)
                                                        //inventoryMdl.insrtbxrelMdl(results5[0], data.caf_id,req.user)
                                                            //.then(function (results7) {
                                                                df.formatSucessRes(req, res, results7, cntxtDtls, '', {});
                                                            /*}).catch(function (error) {
                                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                            });*/
                                                    }).catch(function (error) {
                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                    });
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                            });
                                    /*}).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });*/
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    // inventoryMdl.getboxdtlsMdl(req.body)
    //     .then(function (results) {
    //         df.formatSucessRes(req, res, results, cntxtDtls, '', {});
    //     }).catch(function (error) {
    //         df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    //     });


}

/**************************************************************************************
* Controller     : update bbnl box invntry dtls
* Parameters     : None
* Description    : 
* Change History :
* 08/12/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.updatebbnlboxinvntrydtlsCtrl = (req, res) => {
    var fnm = "updatebbnlboxinvntrydtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    ////console.log(req.user)
    inventoryMdl.updatebbnlboxinvntrydtlsMdl(req.body.data, req.body.caf_id, req.body.user).then((results) => {
		//inventoryMdl.insrtbbnlboxinvntrydtlsMdl(req.body.data, req.body.caf_id, req.body.user).then((results) => {
			df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
		//}).catch((error) => {
			//df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
		//});
	}).catch((error) => {
		df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
	});

}

/**************************************************************************************
* Controller     : update bbnl box invntry dtls
* Parameters     : None
* Description    : 
* Change History :
* 30/12/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.updateterminatebbnlboxinvntrydtlsCtrl = (req, res) => {
    var fnm = "updateterminatebbnlboxinvntrydtlsCtrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    ////console.log(req.user)
    inventoryMdl.updateTrmndCafsInvntryStpBxMdl(req.body.data, req.body.user).then((cafInvntryStpBxresults) => {
		inventoryMdl.updateTrmndCafsStpBxDtlsMdl(req.body.data, req.body.user).then((cafStpBxresults) => {
			df.formatSucessRes(req, res, cafStpBxresults, cntxtDtls, fnm, {});
		}).catch((error) => {
			df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
	}).catch((error) => {
		df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
	});

}

/**************************************************************************************
* Controller     : update box change bbnl box invntry dtls
* Parameters     : None
* Description    : 
* Change History :
* 26/02/2024    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.updateBoxChangebbnlboxinvntrydtls = (req, res) => {
    var fnm = "updateBoxChangebbnlboxinvntrydtls";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    ////console.log(req.user)
    inventoryMdl.updateBoxchangebbnlboxinvntrydtlsMdl(req.body.data, req.body.user).then((results) => {
		inventoryMdl.insrtBoxchangebbnlboxinvntrydtlsMdl(req.body.data, req.body.user).then((results) => {
			df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
		}).catch((error) => {
			df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
		});
	}).catch((error) => {
		df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
	});

}