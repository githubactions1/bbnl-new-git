// import * as _ from 'lodash';
// var _ = require('lodash');
// var exec = require('child_process').exec;
// var log = require(appRoot + '/utils/logmessages');
// var std = require(appRoot + '/utils/standardMessages');
// var df = require(appRoot + '/utils/dflower.utils');
// var jsonUtils = require(appRoot + '/utils/json.utils');
// var attachmentUtils = require(appRoot + '/utils/attachment.utils');
// var jsonUtils = require(appRoot + '/utils/json.utils');

//var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

// Model Inclusions
var cafOperationsSchMdl = require(appRoot + '/server/api/modules/general/schedules/models/cafOperationsSchMdl');
/**************************************************************************************
* Controller     : sqlexecutioncount
* Parameters     : None
* Description    : TO get the query json list
* Change History :
* 29/11/2019     - Seetharam - Initial Function
*
***************************************************************************************/

exports.retryFailedPonCAlls = function (callback) {
    var fnm = "retryFailedPonCAlls";
    // log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    // Get Pending Activation CAFS 
    cafOperationsSchMdl.getPendingPonCAfs()
        .then(function (failedCafs) {
            if (failedCafs[0].ct > 0) {  //If cafs Available proceed for processing
                var pendingCafsArr = failedCafs[0].cafs.split(',');
                console.info("PENDING CAFS :: "+pendingCafsArr.length)
                var caf_ct = 0;

                //For each caf processing start
                function processCAF(caf_id) {
                    try{
                  
                    cafOperationsSchMdl.getPonCafReq(caf_id)   //Get caf API calls
                        .then((cafReqs) => {
                            cafOperationsSchMdl.getOldSpltMdl(caf_id).then((res) => {
                                if (res.length > 1) {
                                    cafOperationsSchMdl.getCafOldSpltMdl(res[1].splt_id).then((spltRes) => {
                                        //console.log(spltRes)
                                        if (!spltRes[0].caf_id) {
                                           
                                            console.log("NO CAF " + caf_id + " FOR SPLIT " + res[1].splt_id + "COUNT "+caf_ct)
                                            //Sending API of CAF to another function
                                            processRequest(cafReqs, function (status, subscribecd) {
                                               
                                                if (status == 1) {  //Status 1 = All API calls succeded
                                                    console.log('----------------------------------All calls Success---------------------------------------------');
                                                    // cafOperationsSchMdl.updateCafStatus(caf_id, subscribecd)  //Update status and middleware id in caf table after all calls succeded
                                                    //     .then((cafReqs) => {
                                                    //         if (caf_ct < pendingCafsArr.length) {
                                                    //             processCAF(pendingCafsArr[caf_ct])
                                                    //         }
                                                    //         else { //Status 0 = All API calls Not succeded
                                                    //             callback(failedCafs.length + ' Pending Provision CAFS Processing Done')
                                                    //         }
                                                    //     }, function (error) {
                                                    //         console.log(err);
                                                    //     })
                                                } else {
                                                    caf_ct++;
                                                    if (caf_ct < pendingCafsArr.length) {
                                                        processCAF(pendingCafsArr[caf_ct])
                                                    }
                                                    else {
                                                        callback(failedCafs.length + ' Pending Provision CAFS Processing Done')
                                                    }
                                                }
                                            })
                                        } else {
                                            console.log("CAF EXISTS " + caf_id + " FOR SPLIT " + res[1].splt_id + "COUNT "+caf_ct)
                                            caf_ct++;
                                            if (caf_ct < pendingCafsArr.length) {
                                                processCAF(pendingCafsArr[caf_ct])
                                            }
                                            else {
                                                callback(failedCafs.length + ' Pending Provision CAFS Processing Done')
                                            }
                                        }
                                    }).catch((error) =>{
                                           console.log(error);
                                           
                                    })
                                }
                            })


                        }, function (error) {
                            console.log(error)
                            //  df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                        })
                    }catch(err){
                        console.log(error);
                        
                    }
                }
                processCAF(pendingCafsArr[caf_ct])
            } else {
                // df.formatSucessRes(req, res, [], cntxtDtls, fnm, {});
            }

        }, function (error) {
            console.log(error)
            // df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}




// Function to process API calls
var processRequest = function (reqsArray, callback) {
    var r_ct = 0;
    var success_ct = 0;
    var subscriberid = '';
    var errchk = 0;

    //Recursive function to process each request
    function execEachRequest(reqe) {
        // console.log(reqe)
        // Building Curl URLs for each request based on their core service type/ sequene number/Method
        try{
        var url = '';
        if (reqe.extrl_aplcn_id == 4 && reqe.mthd_id == 1) {
            url = `curl -XPOST -H "Authorization: Basic YnNzOkJzc0AxMjM=" -H "Content-type: application/json" -d '${reqe.url_dta_tx}' "${reqe.url_tx}"`
        }
        else if (reqe.extrl_aplcn_id == 4 && reqe.mthd_id == 2) {
            url = `curl -XPUT -H "Authorization: Basic YnNzOkJzc0AxMjM=" -H "Content-type: application/json" -d '${reqe.url_dta_tx}' "${reqe.url_tx}"`
        }
        else if (reqe.extrl_aplcn_id == 4 && reqe.mthd_id == 4) {
            url = `curl -XDELETE -H "Authorization: Basic YnNzOkJzc0AxMjM=" -H "Content-type: application/json" -d '${reqe.url_dta_tx}' "${reqe.url_tx}"`
        }
        else if (reqe.extrl_aplcn_id == 1 && reqe.mthd_id == 3) {
            url = `curl -XGET -H "Content-type: application/json"  "${reqe.url_tx}"`
        }
        else if (reqe.extrl_aplcn_id == 3 && reqe.mthd_id == 1) {
            if (reqe.sqnce_nu == 4) {
                reqe.url_dta_tx = `{ "subscribercode": ${subscriberid}, "servicepacks": [{ "servicepack": "Free To Air", "expirydate": "29991231" }] }`
            }
            url = `curl -XPOST -H "username: teraadmin" -H "apikey: 6ed73c1a-7817-49ab-b185-981f97cf5fd8" -H "Content-type: application/json" -d  '${reqe.url_dta_tx}' "${reqe.url_tx}"`
        }
        else {
            url = 'XXXXXXXXXXXXXXXXXXXXX';
        }

        // Calling the curl command
        console.log(url);
        // exec(url, function (error, stdout, stderr) {
        //     if (error) { console.log(error);  }
        //     console.log(stdout);
        //     console.log(" ");
        r_ct++;
        //     //Agora Response Handeling
        //     if (reqe.extrl_aplcn_id == 4) {
        //         console.log("processing Agora Response");
        //         console.log("Checking 1st Call status");
        //         if (reqe.cre_srvce_id == 1 && reqe.sqnce_nu == 1) { //Checking first call,if it fails break loop of  remaining calls
        //             if (JSON.parse(stdout) && JSON.parse(stdout).id) {
        //                 console.log("First call success");
        //                 success_ct++;
        //                 updateResponse(reqe.rest_cl_id, stdout);
        //             }
        //             else {
        //                 console.log("First call Failed.Stoping Process");
        //                 errchk = 1;
        //             }
        //         }
        //         else if (reqe.cre_srvce_id == 2 && reqe.sqnce_nu == 1) {
        //             if (JSON.parse(stdout) && JSON.parse(stdout)[0] && JSON.parse(stdout)[0].id) {
        //                 success_ct++;
        //                 updateResponse(reqe.rest_cl_id, stdout);
        //             }
        //         }
        //         else {
        //             if (JSON.parse(stdout) && JSON.parse(stdout).id) {
        //                 success_ct++;
        //                 updateResponse(reqe.rest_cl_id, stdout);
        //             }
        //         }

        //     }

        //     //IPTV Response Handling
        //     if (reqe.extrl_aplcn_id == 3) {
        //         console.log("processing IPTV Response");
        //         if (reqe.sqnce_nu == 3 && JSON.parse(stdout) && JSON.parse(stdout).subscribercode) {  //Capturing IPTV subscriber ID
        //             subscriberid = JSON.parse(stdout).subscribercode;
        //             console.log("subscriberid:" + subscriberid);
        //             success_ct++;
        //             updateResponse(reqe.rest_cl_id, stdout);
        //         }
        //         if (reqe.sqnce_nu == 4 && JSON.parse(stdout) && JSON.parse(stdout).responseStatus && JSON.parse(stdout).responseStatus.statusCode == "202") {
        //             success_ct++;
        //             updateResponse(reqe.rest_cl_id, stdout);
        //             //cafOperationsSchMdl.updateResponse(reqe.rest_cl_id,stdout).then((u_respo)=>{ console.log(u_respo); });
        //         }
        //     }


        //Recursive function exit check
        if (r_ct < reqsArray.length && errchk == 0) {
            execEachRequest(reqsArray[r_ct]);
        } else {
            if (success_ct == reqsArray.length) {
                callback(1, subscriberid);
            } else {
                callback(0);
            }
        }
    }catch(err){
        console.log(err)
    }



        // });
    }
    execEachRequest(reqsArray[r_ct]);
}

//Function to update response of API calls
var updateResponse = function (rest_cl_id, stdout) {
    cafOperationsSchMdl.updateResponse(rest_cl_id, stdout).then((u_respo) => { })
}


// this.retryFailedPonCAlls((data) => {
//     console.log(data)
// })