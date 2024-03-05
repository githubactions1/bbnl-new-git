var log = require(appRoot + '/utils/batchlog.utils');
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var schedule = require('node-schedule');

var sqlProcessCtrl = require('./sqlProcessCtrl');
var apiProcessCtrl = require('./apiProcessCtrl');
var bulkInsertCtrl = require('./bulkInsertCtrl');
var dataParserCtrl = require('./dataParserCtrl');

// Model Inclusions
var batchMdl = require('../models/batchCoreMdl');
var batchCtrl = require('./batchCoreCtrl');


/**************************************************************************************
* Controller     : executeJob
* Parameters     : job_id
* Description    : Execute Job with Job ID
* Change History :
* 03/JAN/2020     - Raju Dasari - Initial Function
***************************************************************************************/
exports.executeJob = (req, res) => {
    var fnm = "executeJob";
    console.log("In DS_SERVICE executeJob :" + req.body.data.job_id);
    batchMdl.getJobDetails(req.body.data.job_id, req.user)
        .then((jobRes) => {
            if (jobRes && jobRes.length > 0) {
                var jobDtls = jsonUtils.groupJsonByKey(jobRes,
                    ['jb_nm', 'jb_id'],
                    ['jb_nm', 'jb_id', 'tsk_id', 'sqnce_id', 'tsk_nm', 'tsk_ctgry_id', 'tsk_srce_id', 'tsk_ctgry_nm', 'sql_nm', 'sql_tx', 'rqrce_in', 'rqrce_sql_id', 'rqrce_sql_tx', 'nxt_sql_id', 'nxt_sql_tx'],
                    'tasks',
                    'jb_id',
                    'jb_id',
                    'asc');
                batchCtrl.jobExecutor(jobDtls[0], function (err, jresult) {
                    if (err) { console.log(err); callback(err, null); return; }
                    df.formatSucessRes(req, res, jresult, cntxtDtls, fnm, {});
                });
            } else {
                console.log("No Job Found :" + job_id);
                df.formatSucessRes(req, res, [], cntxtDtls, fnm, {});
            }

        })
        .catch((error) => {
            console.log(error);
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        })
}


/**************************************************************************************
* Controller     : loadSchedular_get
* Parameters     : None
* Description    : batch Tables and prepare schedule functions
* Change History :
* 18/12/2019     - Raju Dasari - Initial Function
*
***************************************************************************************/

exports.loadSchedular_get = function (callback) {
    var fnm = "loadSchedular_get";
    //log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    // Model gets called Here 
    batchMdl.getBatchSchedules()
        .then(function (results) {
            var fun_tmp = [];
            var resJobs = jsonUtils.groupJsonByKey(results,
                ['jb_nm', 'jb_id', 'schde_nm', 'schde_dscn_tx', 'mnths_tx', 'wkdys_tx', 'dts_tx', 'hrs_tx', 'mnts_tx'],
                ['jb_nm', 'jb_id', 'tsk_id', 'sqnce_id', 'tsk_nm', 'tsk_ctgry_id', 'tsk_ctgry_nm', 'tsk_srce_id', 'frst_wrkng_in', 'lst_wrkng_in'],
                'tasks',
                'jb_id',
                'jb_id',
                'asc');

            //Scheduling Each Job in loop
            for (i = 0; i < resJobs.length; i++) {
                fun_tmp[i] = getFun(resJobs[i]);
            }
            callback(false, resJobs);
        }, function (error) {
            log.message("ERROR", cntxtDtls, 100, error);
            callback(error, null);
        });
}

//Schedular Function Generation
function getFun(sch) {
    return schedule.scheduleJob(`${sch.mnts_tx} ${sch.hrs_tx} ${sch.dts_tx} ${sch.wkdys_tx} ${sch.mnths_tx}`, function () {
        batchCtrl.jobExecutor(sch, function (error, response) {
            if (error) { log.message("ERROR", cntxtDtls, 100, error); }
            else {
                console.log(response);
            }
        });
    });
}


/**************************************************************************************
* Controller     : jobExecutor
* Parameters     : None
* Description    : Sch Job Executor
* Change History :
* 19/12/2019     - Raju Dasari - Initial Function
***************************************************************************************/
exports.jobExecutor = function (jobDtls, callback) {
    var fnm = "jobExecutor";
    //Check Job Current Running Status
    batchMdl.jobCurrentStatusCheck(jobDtls.jb_id)
        .then(function (jbStatusRes) {
            if (jbStatusRes && jbStatusRes.length > 0) {  //same job is already Running and in process
                log.message("INFO", cntxtDtls, 100, `Job '${jobDtls.jb_nm}' is already Running.`);
               // console.log(jbStatusRes);
            }
            else { //Job is not running currently and can start job                
                //Open Job Audit
                batchMdl.openJobAudit(jobDtls.jb_id)
                    .then((jobAdtRes) => {
                        log.message("INFO", cntxtDtls, 100, `Starting Job '${jobDtls.jb_nm}'`,jobAdtRes.insertId);
                        return jobAdtRes;
                    })
                    .then((jobAdtRes) => {
                        // -------------------------------------------------- Executing Each Task in A Job-----------------------------------------------------//
                        var task_ct = 0;
                        function taskManager(task, prevTaskRes) {
                            task.jb_rn_id =  jobAdtRes.insertId;
                            //Check task status and open of not running
                            batchMdl.taskCurrentStatusCheck(task, jobAdtRes.insertId)
                                .then((taskStsRes) => {
                                    if (taskStsRes && taskStsRes.length > 0) {   //Task already open
                                        // task_ct++;
                                        // if (task_ct >= jobDtls.tasks.length) {
                                        //     log.message("INFO", cntxtDtls, 100, `Task Completed`);
                                        //     //  Close Job in Audit
                                        //     batchMdl.closeJobAudit(task.jb_id,  function (err, res) {
                                        //         log.message("INFO", cntxtDtls, 100, `Job '${task.jb_nm}' Ended`);
                                        //     });
                                        // }
                                        // else {
                                        //     taskManager(jobDtls.tasks[task_ct], taskRes);
                                        // }
                                    }
                                    else {
                                        //Task is not running or started
                                        batchMdl.openTaskAudit(task, jobAdtRes.insertId) //Open A task Audit Res
                                            .then((taskAdtRes) => {
                                                taskExecutor(task, prevTaskRes, function (err, taskRes) {  //Calling Task executor function to execute task and return back task results
                                                    task_ct++;

                                                    if (task_ct >= jobDtls.tasks.length) {
                                                        log.message("INFO", cntxtDtls, 100, `Task Completed-Updated Audit`,task.jb_rn_id);
                                                        //  Close task and Job in Audit
                                                        batchMdl.closeTaskAudit(taskAdtRes.insertId, function (err, res) {
                                                            batchMdl.closeJobAudit(task.jb_id,  function (err, res) {
                                                                log.message("INFO", cntxtDtls, 100, `Job Completed-Updated Audit`,task.jb_rn_id);
                                                                log.message("INFO", cntxtDtls, 100, `Job '${task.jb_nm}' Ended`,task.jb_rn_id);
                                                                callback(false, "Job Done");
                                                            });
                                                        });

                                                    }
                                                    else {
                                                        batchMdl.closeTaskAudit(taskAdtRes.insertId,  function (err, res) {
                                                            log.message("INFO", cntxtDtls, 100, `Task Completed-Updated Audit`,task.jb_rn_id);
                                                            taskManager(jobDtls.tasks[task_ct], (taskRes.data) ? taskRes.data : taskRes);
                                                        });

                                                    }
                                                })
                                            })
                                            .catch((error) => { log.message("ERROR", cntxtDtls, 100, error,task.jb_rn_id); })
                                    }
                                })
                                .catch((error) => { log.message("ERROR", cntxtDtls, 100, error,task.jb_rn_id); })
                        }

                        //Calling Function to execute first task in job
                        taskManager(jobDtls.tasks[task_ct], null);

                    })
                    .catch((error) => { log.message("ERROR", cntxtDtls, 100, error); })
            }
        })
     .catch((error) => { log.message("ERROR", cntxtDtls, 100, error); })

}




/**************************************************************************************
* Controller     : taskExecutor
* Parameters     : None
* Description    : Sch Job Executor
* Change History :
* 19/12/2019     - Raju Dasari - Initial Function
***************************************************************************************/
var taskExecutor = function (task, prevTaskRes, callback) {
    //--------------------Task Category 1 - SQL Execution-------------------//
    if (task.tsk_ctgry_id && task.tsk_ctgry_id == 1) {
        log.message("INFO", cntxtDtls, 100, `[Job-${task.jb_id} | Task-${task.sqnce_id}] Started [${task.tsk_ctgry_nm}] '${task.tsk_nm}' `,task.jb_rn_id);
        //Calling SQLEcecutor Function with callback and job details
        sqlProcessCtrl.sqlExecutor(task, prevTaskRes, function (err, taskRes) {
            if (err) { log.message("ERROR", cntxtDtls, 100, err); callback(err, null); return; }
            else {
                log.message("INFO", cntxtDtls, 100, `[Job-${task.jb_id} | Task-${task.sqnce_id}] Completed [${task.tsk_ctgry_nm}] '${task.tsk_nm}' `,task.jb_rn_id);
                callback(false, taskRes);
            }
        })
    }

    //--------------------Task Category 10 - Execute API CAll -------------------//
    else if (task.tsk_ctgry_id && task.tsk_ctgry_id == 10) {
        log.message("INFO", cntxtDtls, 100, `[Job-${task.jb_id} | Task-${task.sqnce_id}] Started [${task.tsk_ctgry_nm}] '${task.tsk_nm}' `,task.jb_rn_id);
        //Call API Process Function  with callback and job details
        apiProcessCtrl.apiExecutor(task, prevTaskRes, function (err, taskRes) {
            if (err) { log.message("ERROR", cntxtDtls, 100, err,task.jb_rn_id); callback(err, null); return; }
            else {
                log.message("INFO", cntxtDtls, 100, `[Job-${task.jb_id} | Task-${task.sqnce_id}] Completed [${task.tsk_ctgry_nm}] '${task.tsk_nm}' `,task.jb_rn_id);
                callback(false, taskRes);
            }
        })
    }

    //--------------------Task Category 11 - Bulk Data Insert to Table -------------------//
    else if (task.tsk_ctgry_id && task.tsk_ctgry_id == 11) {
        log.message("INFO", cntxtDtls, 100, `[Job-${task.jb_id} | Task-${task.sqnce_id}] Started [${task.tsk_ctgry_nm}] '${task.tsk_nm}' `,task.jb_rn_id);
        //Call Bulk Data Insert to Tabl Process Function  with callback and job details
        bulkInsertCtrl.insertDataIntoTable(task, prevTaskRes, function (err, taskRes) {
            if (err) { log.message("ERROR", cntxtDtls, 100, err,task.jb_rn_id); callback(err, null); return; }
            else {
                log.message("INFO", cntxtDtls, 100, `[Job-${task.jb_id} | Task-${task.sqnce_id}] Completed [${task.tsk_ctgry_nm}] '${task.tsk_nm}' `,task.jb_rn_id);
                callback(false, taskRes);
            }
        })
    }


    //--------------------Task Category 12 - DATA Parsing/Convert -------------------//
    else if (task.tsk_ctgry_id && task.tsk_ctgry_id == 12) {
        log.message("INFO", cntxtDtls, 100, `[Job-${task.jb_id} | Task-${task.sqnce_id}] Started [${task.tsk_ctgry_nm}] '${task.tsk_nm}' `,task.jb_rn_id);
        //Call Data Parser Function  with callback and job details
        dataParserCtrl.xml2json(task, prevTaskRes, function (err, taskRes) {
            if (err) { log.message("ERROR", cntxtDtls, 100, err,task.jb_rn_id); callback(err, null); return; }
            else {
                log.message("INFO", cntxtDtls, 100, `[Job-${task.jb_id} | Task-${task.sqnce_id}] Completed [${task.tsk_ctgry_nm}] '${task.tsk_nm}' `,task.jb_rn_id);
                callback(false, taskRes);
            }
        })
    }
}


//**************Test Controller Temp**************//
exports.testPost = (req, res) => {
    var fnm = 'testPost';
    console.log(req.body);
    df.formatSucessRes(req, res, [req.body], cntxtDtls, fnm, {});
}


exports.testPost2 = (req, res) => {
    var fnm = 'testPost';
    console.log(req.body);
    df.formatSucessRes(req, res, req.body, cntxtDtls, fnm, {});
}
