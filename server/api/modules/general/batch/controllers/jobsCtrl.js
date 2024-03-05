var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsonUtils = require(appRoot + '/utils/json.utils');
var qryUtl = require(appRoot + '/utils/stringvalidator')
var _ = require('lodash');
var dateFormat = require('dateformat');

var jobsMdl = require('../models/jobsMdl');

/**************************************************************************************
* Controller     : getJbsLtstLstCntrl
* Parameters     : req,res()
* Description    : get latest Jobs list
* Change History :
* 18/01/2020    -  Raju Dasari  - Initial Function
***************************************************************************************/
exports.getJbsLtstLstCntrl = function (req, res) {
    console.log("getJbsLtstLstCntrl")
    jobsMdl.getJobsList(req.user)
        .then(function (results) {
            var resJobs = jsonUtils.groupJsonByKey(results,
                ['jb_nm', 'jb_id', 'schde_nm', 'schde_dscn_tx'],
                ['Sno', 'schde_nm', 'schde_dscn_tx', 'mnths_tx', 'wkdys_tx', 'dts_tx', 'hrs_tx','mnts_tx','job_id','schde_id'],
                'schedule',
                'jb_id',
                'jb_id',
                'asc');
            df.formatSucessRes(req, res, resJobs, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}


/**************************************************************************************
* Controller     : getJbHstryCntrl
* Parameters     : req,res()
* Description    : Get historical run details for a job
* Change History :
* 18/01/2020    -  Raju Dasari  - Initial Function
*
***************************************************************************************/
exports.getJbHstryCntrl = function (req, res) {
    console.log("getJbHstryCntrl")
    jobsMdl.getJbHstryMdl(req.params.jb_id,req.user)
        .then(function (results) {
            // console.log("results");
            for (var i = 0; i < results.length; i++) {
                results[i].tsk_strt_ts = dateFormat(results[i].tsk_strt_ts, "dd-mm-yyyy h:MM:ss");
                results[i].tsk_end_ts = dateFormat(results[i].tsk_end_ts, "dd-mm-yyyy h:MM:ss");
            }
            // console.log("results");
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getJbScheduleLstCntrl
* Parameters     : req,res()
* Description    : Get Job Schedule details for a job
* Change History :
* 18/01/2020    -  Raju Dasari  - Initial Function
*
***************************************************************************************/
exports.getJbScheduleLstCntrl = function (req, res) {
    console.log("getJbScheduleLstCntrl")
    jobsMdl.getJbScheduleLstMdl(req.params.jb_id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : delJbScheduleCntrl
* Parameters     : req,res()
* Description    : Delete Job Schedule details for a job
* Change History :
* 18/01/2020    -  Raju Dasari  - Initial Function
*
***************************************************************************************/
exports.delJbScheduleCntrl = function (req, res) {
    console.log("delJbScheduleCntrl")
    jobsMdl.delJbScheduleMdl(req.params.sche_id, req.params.jb_id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getJobScheduleCntrl
* Parameters     : req,res()
* Description    : Get Job Schedule details for a job
* Change History :
* 17/03/2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getJobScheduleCntrl = function (req, res) {
    console.log("getJobScheduleCntrl")
    jobsMdl.getJobScheduleMdl(req.params.jb_id, req.params.sche_id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getJobTasksCntrl
* Parameters     : req,res()
* Description    : Get Job Tasks details for a job
* Change History :
* 17/03/2020    -  Koti Machana  - Initial Function
*
***************************************************************************************/
exports.getJobTasksCntrl = function (req, res) {
    console.log("getJobTasksCntrl")
    jobsMdl.getJobTasksMdl(req.params.jb_id,req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getJbScheduleCntrl
* Parameters     : req,res()
* Description    : Insert Job Schedule 
* Change History :
*
***************************************************************************************/
exports.getJbScheduleCntrl = function (req, res) {
    var fnm = "getJbScheduleCntrl";
    log.info(`In ${fnm}`, 0, cntxtDtls);
    console.log(req.body.data);
    // Model gets called Here
    jobsMdl.getjbScheduleMdl(req.body.data, req.user)
        .then(function (jbresult) {

            if (jbresult && jbresult.length > 0) {
                // df.formatSucessRes(req, res, 'Already Profile Exit', cntxtDtls, fnm, {});
                console.log(jbresult[0].schde_id);
                console.log("Update");
                jobsMdl.getJbscheduleRelMdl(jbresult[0].schde_id, req.body.data,req.user)
                    .then(function (jbschresult) {
                        if (jbschresult && jbschresult.length > 0) {
                            console.log("relation there")
                            jobsMdl.insJbScheduleRelainMdl(jbresult[0].schde_id, req.body.data, req.user)
                                .then(function (result) {
                                    df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        } else {
                            console.log("relation not there")
                            jobsMdl.insJbScheduleRelMdl(jbresult[0].schde_id, req.body.data, req.user)
                                .then(function (result) {
                                    df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        }
                        // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });

            } else {
                console.log("Insert");
                jobsMdl.insjbscheduleMdl(req.body.data, req.user)
                    .then(function (result) {
                        if (result) {
                            var insertedid = result.insertId;
                            jobsMdl.insJbScheduleRelMdl(insertedid, req.body.data, req.user)
                                .then(function (result) {
                                    df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                                });
                        } else {
                            df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
                        }
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        });
}


/**************************************************************************************
* Controller     : getJbLogCntrl
* Parameters     : req,res()
* Description    : Get Job Log 
* Change History :
*
***************************************************************************************/
exports.getJbLogCntrl = function (req, res) {
    console.log("getJbLogCntrl")
    jobsMdl.getJbLogMdl(req.params.jb_adt_id,req.user)
        .then(function (results) {
            // console.log("results");
            // console.log(results);
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}

/**************************************************************************************
* Controller     : getJobHistoryCntrl
* Parameters     : req,res()
* Description    : Get Job History 
* Change History :
*
***************************************************************************************/
exports.getJobHistoryCntrl = function (req, res) {
    console.log("getJobHistoryCntrl")
    // console.log(req.body.data);
    jobsMdl.getJobHistoryMdl(req.body.data,req.user)
        .then(function (results) {
            for (var i = 0; i < results.length; i++) {
                results[i].jb_strt_ts = dateFormat(results[i].jb_strt_ts, "dd-mm-yyyy h:MM:ss");
                results[i].jb_end_ts = dateFormat(results[i].jb_end_ts, "dd-mm-yyyy h:MM:ss");
            }
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}