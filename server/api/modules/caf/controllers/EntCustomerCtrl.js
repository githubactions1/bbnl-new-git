const EntCustMdl = require(appRoot + '/server/api/modules/caf/models/EntCustomerMdl');
var df = require(appRoot + '/utils/dflower.utils');
var apiMstrCtrl = require(appRoot + '/server/api/modules/externalApis/controllers/apiMstrCtrl');
var cstmrMdl = require(appRoot + '/server/api/modules/crm/customers/models/CstmrMdl');
var mrchntMdl = require(appRoot + '/server/api/modules/merchant/models/merchantsMdl');
var dbutil = require(appRoot + '/utils/db.utils');
var CafMdl = require(appRoot + '/server/api/modules/caf/models/CafMdl');
var apCnst = require(appRoot + '/utils/appConstants');
var umMdl = require(appRoot + '/server/api/modules/general/um/models/userMgtMdl');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var AWS = require('aws-sdk');
// var awsS3 = 'config/aws-s3.config.json';
var awsS3 = path.join(appRoot, '/config/aws-s3.config.json')
var base64 = require('base-64');


/**************************************************************************************
* Controller     : getorgtyp
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getorgtyp = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getorgtypMdl(req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getsuborgtyp
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getsuborgtyp = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getsuborgtypMdl(req.params, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrt_indCafCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.insrt_entcustCtrl = function (req, res) {
    //Inserting Data to Caf Stagging Table
    CafMdl.insrtCafStgMdl(req.body.data, req.user).then((insrtCafStgRes) => {
        // inserting into marchent table
        mrchntMdl.insrtMrcntMdl(req.body.data, req.user).then((insrtentcustRes) => {
            //Generate ctmr_id
            // console.log(insrtentcustRes)
            dbutil.getNxtKey('ctmr_id').then(function (nextId) {
                // console.log(nextId)
                let ctmr_id = nextId;
                //Inserting individual customer
                EntCustMdl.insrtentCstmrMdl(req.body.data, ctmr_id, req.user).then((insCstrres) => {

                    event.record('CUSTOMER', ctmr_id, 'CUSTOMER_ADDED', "New Customer Added", req.user);
                    //Generating CAF id
                    // kysCtrl.get_keyValCtrl('caf_id', (error, keyValRes) => {
                    //     let caf_id = keyValRes[0].RESULT;
                    //     // console.log(caf_id)
                    //     //Inserting CAF
                    //     CafMdl.insrtCafMdl(req.body.data, caf_id, req.user).then((cafInsRes) => {
                    //         //Creating User
                    //         // umMdl.createUsers_p(req.body.data, req.user).then((usrInsRes) => {
                    //         //     event.record('CAF',caf_id,'INSTALLED',"CAF New installation",req.user);
                    //         //     bLogic.provision('CAF',caf_id,"PROVISIONING"); 

                    //         //     df.formatSucessRes(req, res, usrInsRes, cntxtDtls, '', req.user);
                    //         // })
                    //         event.record('CAF',caf_id,'INSTALLED',"CAF New installation",req.user);
                    //         bLogic.provision('CAF',caf_id,"PROVISIONING"); 

                    //         df.formatSucessRes(req, res, cafInsRes, cntxtDtls, '', req.user);
                    //     })
                    // })
                    umMdl.insrtusrMdl(req.body.data, req.user, insrtentcustRes.insertId)
                        .then(function (results) {
                            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                }).catch(() => {

                })
            }).catch(function (error) {
                // console.log(error)
            });
        })
    })
}
/**************************************************************************************
* Controller     : insrt_indCafCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Seetharam  - Initial Function
*
***************************************************************************************/
exports.insrt_entnodecustCtrl = function (req, res) {
    //Inserting Data to Caf Stagging Table
    CafMdl.insrtCafStgMdl(req.body.data, req.user).then((insrtCafStgRes) => {
        // inserting into marchent table
        mrchntMdl.insrtMrcntMdl(req.body.data, req.user).then((insrtentcustRes) => {
            //Generate ctmr_id
            // console.log(insrtentcustRes)
            dbutil.getNxtKey('ctmr_id').then(function (nextId) {
                // console.log(nextId)
                let ctmr_id = nextId;
                //Inserting individual customer
                EntCustMdl.insrtentCstmrnodeMdl(req.body.data, ctmr_id, req.user).then((insCstrres) => {

                    event.record('CUSTOMER', ctmr_id, 'CUSTOMER_ADDED', "New Customer Added", req.user);
                    //Generating CAF id
                    // kysCtrl.get_keyValCtrl('caf_id', (error, keyValRes) => {
                    //     let caf_id = keyValRes[0].RESULT;
                    //     // console.log(caf_id)
                    //     //Inserting CAF
                    //     CafMdl.insrtCafMdl(req.body.data, caf_id, req.user).then((cafInsRes) => {
                    //         //Creating User
                    //         // umMdl.createUsers_p(req.body.data, req.user).then((usrInsRes) => {
                    //         //     event.record('CAF',caf_id,'INSTALLED',"CAF New installation",req.user);
                    //         //     bLogic.provision('CAF',caf_id,"PROVISIONING"); 

                    //         //     df.formatSucessRes(req, res, usrInsRes, cntxtDtls, '', req.user);
                    //         // })
                    //         event.record('CAF',caf_id,'INSTALLED',"CAF New installation",req.user);
                    //         bLogic.provision('CAF',caf_id,"PROVISIONING"); 

                    //         df.formatSucessRes(req, res, cafInsRes, cntxtDtls, '', req.user);
                    //     })
                    // })
                    umMdl.insrtusrMdl(req.body.data, req.user, insrtentcustRes.insertId)
                        .then(function (results) {
                            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                }).catch(() => {

                })
            }).catch(function (error) {
                // console.log(error)
            });
        })
    })
}
/**************************************************************************************
* Controller     : getsuborgtyp
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
// exports.getentcstmrdt = function (req, res) {

//     // console.log(req.params)
//     EntCustMdl.getEntCstmrdtMdl(req.params, req.user)
//         .then(function (results) {
//             // console.log(results)
//             var common_feilds = ['prnt_cstmr_id', 'cstmr_id',  'cntct_mble1_nu', 'dstrt_nm', 'mndl_nm', 'loc_eml1_tx', 'billfreqlov', 'entrpe_type_id', 'entrpe_type_nm','frqncy_nm','cstmr_nm'];
//             var arrFeilds = ['caf_id', 'cstmr_id', 'tan_nu', 'gst_nu', 'custu_id', 'caf_type_id', 'prnt_cstmr_id', 'loc_eml1_tx', 'bsns_type_id', 'enttypelov', 'pan_nu','frqncy_nm','cstmr_nm',
//                 'tan_nu', 'adhr_nu', 'pymnt_lblty_in', 'cntct_nm', 'cntct_mble1_nu', 'cntct_mble2_nu', 'blng_addr1_tx', 'blng_addr2_tx', 'blng_lcly_tx',
//                 'blng_ara_tx', 'blng_mndl_id', 'blng_dstrct_id', 'blng_ste_id', 'blng_vlge_id', 'blng_pn_cd', 'blng_lmdle1_nu', 'blng_lmdle2_nu', 'blng_std_cd',
//                 'blng_eml1_tx',, 'blng_fax1_nu', 'blng_cntct_nm', 'blng_cntct_mble1_nu',
//                 'loc_addr1_tx','loc_lcly_tx','actvn_dt','regbal',
//                 'chargedbal', 'depbal', 'unbbal', 'dctvn_dt', 'bld_dt', 'fnl_bl_dt', 'spnd_dt', 'rsme_dt', 'lst_invce_mm', 'lst_invce_id',
//                 'lst_pymnt_id', 'nxt_due_dt', 'nxt_invce_at', 'status', 'blckd_in', 'crte_ip', 'updte_ip', 'dctvn_ts',
//                 'dctvn_usr_id', 'dctvn_ip', 'caf_mbl', 'caf_actvn_dt', 'caf_agnt_id', 'caf_blble_caf_in', 'caf_cstmr_id', 'caf_instl_addr1_tx',
//                  'caf_instl_ara_tx', 'dstrt_nm', 'mndl_nm', 'crnt_pln_id','agnt_nm'];
//             var arrName = 'subOrgs';
//             var groupBy = 'prnt_cstmr_id';
//             var sortKey = 'prnt_cstmr_id';
//             var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
//             // // console.log(groupres)
//             try {
//                 for (let i = 0; i < groupres.length; i++) {
//                     if (groupres[i].hasOwnProperty('subOrgs')) {
//                         groupres[i]["cafs"] = groupres[i].subOrgs.filter((i) => {
//                             if (i.caf_id != null) {
//                                 return i;
//                             }
//                         })
//                     } else {
//                         groupres[i]["cafs"] = []
//                     }

//                 }

//                 for (let i = 0; i < groupres.length; i++) {
//                     let prnt_cstmr_id = groupres[i].prnt_cstmr_id;
//                     if (groupres[i].hasOwnProperty('subOrgs')) {
//                         groupres[i]["nodes"] = groupres[i].subOrgs.filter((i) => {
//                             if (prnt_cstmr_id != i.cstmr_id) {
//                                 return i;
//                             }
//                         })
//                     } else {
//                         groupres[i]["nodes"] = []
//                     }

//                 }
//                 // console.log(groupres)
//                 df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
//             } catch (err) {
//                 // console.log(err)
//             }
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//         });
// }
/**************************************************************************************
* Controller     : getentcstmrdt
* Parameters     : req,res()
* Description    : Add new  CafStatus
*
***************************************************************************************/
exports.getentcstmrdt = function (req, res) {
    // console.log(req.user,'------------------------')
    if (req.user.usr_ctgry_id == 8) {
        EntCustMdl.getEntCstmrdtbylmoMdl(req.user)
            .then(function (results) {
                // // console.log(results)
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });

    } else {
        EntCustMdl.getEntCstmrdtMdl(req.user)
            .then(function (results) {
                // // console.log(results)
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }

}
/**************************************************************************************
* Controller     : getentcstmrcaflst
* Parameters     : req,res()
* Description    : Add new  CafStatus
*
***************************************************************************************/
exports.getentcstmrcaflst = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getentcstmrcaflstMdl(req.params.id, req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getentcstmrnodelst
* Parameters     : req,res()
* Description    : Add new  CafStatus
*
***************************************************************************************/
exports.getentcstmrnodelst = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getentcstmrnodelstMdl(req.params, req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getentcstmrnodelst
* Parameters     : req,res()
* Description    : Add new  CafStatus
*
***************************************************************************************/
exports.getentcstmrcnt = function (req, res) {

    EntCustMdl.getentcstmrcntMdl(req.params, req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getentcstmrnodecnt
* Parameters     : req,res()
* Description    : Add new  CafStatus
*getentcstmrcnt
***************************************************************************************/
exports.getentcstmrnodecnt = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getentcstmrnodecntMdl(req.params, req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getagnt_entcstmrdtls
* Parameters     : req,res()
* Description    : Add new  CafStatus
*
***************************************************************************************/
exports.getagnt_entcstmrdtls = function (req, res) {
    EntCustMdl.getagntcstmrdtlsMdl(req.params.id, req.user)
        .then(function (results) {
            // console.log(results)
            if (results && results.length == 0) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "400", err_message: 'No Enterprise Customers Available.' });
            }
            else {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "400", err_message: 'No Enterprise Customers Available.' });
        });
}

/**************************************************************************************
* Controller     : getentnodecustCtrl
* Parameters     : req,res()
* Description    : 
* Change History :
* 03/02/2020    -  Ganesh  - Initial Function
*
***************************************************************************************/
exports.getentnodecustCtrl = function (req, res) {
    // console.log(req.user,'------------------------')
    if (req.user.mrcht_usr_id == 101004190 ||req.user.mrcht_usr_id ==101076366) {
        EntCustMdl.getentnodeMdl(req.params.id, req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });

    } else {
        EntCustMdl.getentnodecustMdl(req.params.id, req.user)
            .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }

}

/**************************************************************************************
* Controller     : getEntCstmrsOprtnCrntMnthCtrl
* Parameters     : req,res()
* Description    : Get all operation details of current month
* 06-06-2020 : Srujana M
***************************************************************************************/
exports.getEntCstmrsOprtnCrntMnthCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getEntCstmrsOprtnCrntMnthMdl(req.params.id, req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getIllCafDtlsCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getIllCafDtlsCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getIllCafDtlsMdl(req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getPrfTypsCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getPrfTypsCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getPrfTypsMdl(req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : insrt_illentcustCtrl
* Parameters     : req,res()
* Description    : Add new  CafStatus
* Change History :
* 11/10/2020    -  sravani  - Initial Function
*
***************************************************************************************/
exports.insrt_illentcustCtrl = function (req, res) {
    CafMdl.insrtCafStgMdl(req.body.data, req.user).then((insrtCafStgRes) => {
        mrchntMdl.insrtMrcntMdl(req.body.data, req.user).then((insrtentcustRes) => {
            dbutil.getNxtKey('ctmr_id').then(function (nextId) {
                let ctmr_id = nextId;
                console.log(ctmr_id)
                EntCustMdl.illinsrtCstmrMdl(req.body.data, ctmr_id, req.user).then((insCstrres) => {
                    event.record('CUSTOMER', ctmr_id, 'CUSTOMER_ADDED', "New Customer Added", req.user);
                    EntCustMdl.insrtCstmrillAdtnlMdl(req.body.data.addtnl_dtls, ctmr_id, req.user).then((insCstrillres) => {
                        console.log(insCstrillres)
                        upload_img(req, req.body.data.attachments, (img_err, img_res) => {
                            if (img_err) {

                            }
                            else {
                                EntCustMdl.illCstmrAttchmntMdl(img_res, ctmr_id, req.user, (err, results) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    else {
                                        umMdl.insrtusrMdl(req.body.data, req.user, insrtentcustRes.insertId)
                                            .then(function (results) {
                                                let resDat = [{ cstmr_id: ctmr_id, pckge_id: insCstrillres.insertId }]
                                                df.formatSucessRes(req, res, resDat, cntxtDtls, '', {});
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                            });
                                    }
                                })
                            }
                        })
                    }).catch((err) => {
                        console.log("s catch")
                        console.log(err)

                    })

                }).catch(() => {
                    console.log("v catch")
                    console.log(err)

                })
            }).catch(function (error) {
                console.log("m catch")
                console.log(error)
            });
        })
    })
}
var upload_img = (req, payload, calbk) => {
    console.log(req.user)
    AWS.config.loadFromPath(awsS3);
    var s3 = new AWS.S3();
    var count = 0;
    for (var i = 0; i < payload.length; i++) {
        if (payload[i].cstInfoFileTyp == "image") {
            var imageData = payload[i].prf_idnty_url;
            var data = imageData.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer.from(data, 'base64');
            var name = `tresury_receipt_${Date.now()}` + 2;
            var imgNm = name + ".jpg";
        }
        else {
            var imageData = payload[i].prf_idnty_url;
            var data = imageData.match(/,(.*)$/)[1];
            var buf = new Buffer.from(data, 'base64');
            var name = `tresury_receipt_${Date.now()}` + 2;
            var imgNm = name + ".pdf";
        }

        var params = {
            Bucket: 'dswetrack/apMuncipalApp/image_upload',
            Key: imgNm,
            ACL: 'public-read',
            Body: buf
        };
        s3.upload(params, function (err, data) {
            if (err) {
                calbk(err, null);
            }
            else {
                payload[count].prf_idnty_url = data.Location;
                count++;
                if (count == payload.length) {
                    calbk(false, payload);
                }
            }
        });
    }
}

/**************************************************************************************
* Controller     : getIllApprovalPckgesCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getIllApprovalPckgesCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getIllApprovalPckgesMdl(req.user)
        .then(function (results) {
            console.log(results)
            //     var common_feilds = ['cstmr_id','cstmr_nm','cntct_nm','cntct_mble1_nu','loc_eml1_tx','frqncy_id','frqncy_nm','actvn_dt','entrpe_type_nm','vlge_nm','mndl_nm','dstrt_nm','ip_addrs_schme','ill_pckge_id','prt_spd','ill_pckge_nm','chrge_at','gst_at','apsfl_shre_at','lmo_shre_at','mso_shre_at','num_cnts','cntrct_prd_num','cntrct_prd_typ','blng_prdcty','lmo_agnt_id','lvl_1_apprv_in','lvl_1_apprv_usr_id','lvl_1_apprv_ts','lvl_1_apprv_rle_id'];
            //                 var arrFeilds = ['cstmr_id','prf_typ_nm','attchmnt_nm','attchmnt_url'];
            //                 var arrName = 'attchmnts';
            //                 var groupBy = 'cstmr_id';
            //                 var sortKey = ''
            //    var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : ApprovalPckgeslevlOneCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.ApprovalPckgeslevlOneCtrl = function (req, res) {

    console.log("ApprovalPckgeslevlOneCtrl")
    var count = 0;
    function leveloneappr(data) {
        EntCustMdl.ApprovalPckgeslevlOneMdl(data, req.user)
            .then(function (results) {
                count++;
                console.log(count)
                if (count < req.body.data.length) {
                    leveloneappr(req.body.data[count])
                }
                console.log(count, req.body.data.length)
                if (count == req.body.data.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    leveloneappr(req.body.data[count])
}
/**************************************************************************************
* Controller     : ApprovalPckgeslevlTwoCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.ApprovalPckgeslevlTwoCtrl = function (req, res) {

    // console.log(req.params)
    var count = 0;
    function leveloneappr(data) {
        EntCustMdl.ApprovalPckgeslevlTwoMdl(data, req.user)
            .then(function (results) {
                count++;
                console.log(count)
                if (count < req.body.data.length) {
                    leveloneappr(req.body.data[count])
                }
                console.log(count, req.body.data.length)
                if (count == req.body.data.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    leveloneappr(req.body.data[count])

}
/**************************************************************************************
* Controller     : illRjctPckgesCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.illRjctPckgesCtrl = function (req, res) {
    var count = 0;
    function rejectPckge(data) {

        // console.log(req.params)
        EntCustMdl.illRjctPckgesMdl(data, req.user)
            .then(function (results) {
                // console.log(results)
                count++;
                if (count < req.body.data.length) {
                    rejectPckge(req.body.data[count])
                }
                if (count == req.body.data.length) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
    }
    rejectPckge(req.body.data[count])
}
/**************************************************************************************
* Controller     : getIilCstmrDtls
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getIilCstmrDtlsCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getIilCstmrDtlsMdl(req.params.id, req.params.pckgeid, req.user)
        .then(function (results) {
            var common_feilds = ['cstmr_id', 'cstmr_nm', 'cntct_nm', 'gst_nu', 'pan_nu', 'loc_lcly_tx', 'loc_addr1_tx', 'loc_ara_tx', 'loc_lcly_tx', 'blng_addr1_tx', 'blng_lcly_tx', 'blng_ara_tx', 'blng_pn_cd', 'lcl_pn_cd', 'sm_as_blng_addrs_in', 'cntct_mble1_nu', 'loc_eml1_tx', 'frqncy_id', 'frqncy_nm', 'actvn_dt', 'entrpe_type_nm', 'vlge_nm', 'mndl_nm', 'blng_mndl_nm', 'blng_dstrt_nm', 'blng_vlge_nm', 'dstrt_nm', 'ip_addrs_schme', 'ill_pckge_id', 'prt_spd', 'ill_pckge_nm', 'chrge_at', 'gst_at', 'apsfl_shre_at', 'lmo_shre_at', 'mso_shre_at', 'num_cnts', 'cntrct_prd_num', 'cntrct_prd_typ', 'blng_prdcty', 'lmo_agnt_id', 'lvl_1_apprv_in', 'lvl_1_apprv_usr_id', 'lvl_1_apprv_ts', 'lvl_1_apprv_rle_id', 'agnt_nm', 'ofce_mbl_nu', 'cntct_prsn_nm', 'cntct_prsn_phne_num', 'cntct_prsn_eml', 'cre_srvc_id','cre_srvc_nm','pckge_pln_nm','one_tme_chrge_at','one_tme_apsfl_chrge_at','one_tme_lmo_chrge_at'];
            var arrFeilds = ['cstmr_id', 'prf_typ_nm', 'attchmnt_nm', 'attchmnt_url', 'prf_atchmnt_idnty', 'prf_atchmnt_bllng_addrs'];
            var arrName = 'attchmnts';
            var groupBy = 'cstmr_id';
            var sortKey = ''
            var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
            // console.log(results)
            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : addPckgeILLCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.addPckgeILLCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.insrtCstmrillAdtnlMdl(req.body.data, req.params.id, req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getIllApprovalPckgeslvl2Ctrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getIllApprovalPckgeslvl2Ctrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getIllApprovalPckgeslvl2Mdl(req.user)
        .then(function (results) {
            console.log(results)
            //     var common_feilds = ['cstmr_id','cstmr_nm','cntct_nm','cntct_mble1_nu','loc_eml1_tx','frqncy_id','frqncy_nm','actvn_dt','entrpe_type_nm','vlge_nm','mndl_nm','dstrt_nm','ip_addrs_schme','ill_pckge_id','prt_spd','ill_pckge_nm','chrge_at','gst_at','apsfl_shre_at','lmo_shre_at','mso_shre_at','num_cnts','cntrct_prd_num','cntrct_prd_typ','blng_prdcty','lmo_agnt_id','lvl_1_apprv_in','lvl_1_apprv_usr_id','lvl_1_apprv_ts','lvl_1_apprv_rle_id'];
            //                 var arrFeilds = ['cstmr_id','prf_typ_nm','attchmnt_nm','attchmnt_url'];
            //                 var arrName = 'attchmnts';
            //                 var groupBy = 'cstmr_id';
            //                 var sortKey = ''
            //    var groupres = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');

            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getMyApprovalPckgesCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getMyApprovalPckgesCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getMyApprovalPckgesMdl(req.params.lvl, req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getRcntApprovalPckgesCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getRcntApprovalPckgesCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getRcntApprovalPckgesMdl(req.params.lvl, req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getcreSrvcsCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getcreSrvcsCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getcreSrvcsMdl(req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : getuploadAgreemntCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getuploadAgreemntCtrl = function (req, res) {

    console.log("sravai")
    upload_img(req, req.body.data, (img_err, img_res) => {
        if (img_err) {

        }
        else {
            EntCustMdl.getuploadAgreemntMdl(req.body.data, req.user)
                .then(function (results) {
                    console.log(results)
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        }
    })
}
/**************************************************************************************
* Controller     : getCstmrDtlsCtrl
* Parameters     : req,res()
* Description    : Get all ill caf details
* 05-11-2020 : Sravani M
***************************************************************************************/
exports.getCstmrDtlsCtrl = function (req, res) {

    // console.log(req.params)
    EntCustMdl.getCstmrDtlsMdl(req.params.id, req.user)
        .then(function (results) {
            // console.log(results)
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


