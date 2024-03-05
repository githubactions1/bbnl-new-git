var batchMdl = require('../models/batchCoreMdl');
var sqlProcessMdl = require('../models/sqlProcessMdl');

/**************************************************************************************
* Controller     : sqlExecutor
* Parameters     : None
* Description    : SQL Job Executor
* Change History :
* 19/12/2019     - Raju Dasari - Initial Function
***************************************************************************************/
exports.sqlExecutor = function (task, prevTaskRes, callback) {
    sqlProcessMdl.getSqlDefinition(task)
        .then((taskRes) => {
            if (taskRes && taskRes.length > 0) {
                var taskDtl = taskRes[0];
                //Single Query (No recursive Queries)
                if (taskDtl.rqrce_in == 0 && taskDtl.rqrce_sql_id == 0) {
                    if (prevTaskRes && prevTaskRes.length > 0) {
                        async
                        var q_ct = 0;
                        function executeArrayOfQueries(qryTmpltObj) {
                            var qryToExec = prcs_tmplte(taskDtl.sql_tx, qryTmpltObj);
                            sqlProcessMdl.qryExecutor(qryToExec)
                                .then(function (results) {
                                    q_ct++;
                                    if (q_ct >= prevTaskRes.length) { callback(false, results) } else { executeArrayOfQueries(prevTaskRes[q_ct]); }
                                }, function (error) {
                                    q_ct++;
                                    if (q_ct >= prevTaskRes.length) { callback(false, null) } else { executeArrayOfQueries(prevTaskRes[q_ct]); }
                                });
                        }
                        executeArrayOfQueries(prevTaskRes[q_ct]);
                    } else {
                        sqlProcessMdl.qryExecutor(taskDtl.sql_tx)
                            .then(function (results) {
                                callback(false, results)
                            }, function (error) {
                                console.log(error);
                                callback(error, null)
                            });
                    }

                }

                //Query Genarates Array of queries 
                else if (taskDtl.rqrce_in == 1 && taskDtl.rqrce_sql_id == 0) {
                    sqlProcessMdl.qryExecutor(taskDtl.sql_tx)
                        .then(function (qryArr) {
                            //console.log("qryArr: " + qryArr.length);
                            let ct = 0;
                            //Recursive Function to exeute All queries in Array
                            function execQry(qry) {
                                sqlProcessMdl.qryExecutor(qry, function (err, res) {
                                    ct++;
                                    if (ct == qryArr.length) {
                                        callback(false, []);
                                        return;
                                    }
                                    else if (ct < qryArr.length) {
                                        execQry(qryArr[ct].qry)
                                    }
                                })
                            }
                            execQry(qryArr[ct].qry)
                        }, function (error) {
                            console.log(error);
                            callback(error, null)
                        });
                }

                //Query Genarates Array data which are again passed as input to another query
                else if (taskDtl.rqrce_in == 1 && taskDtl.rqrce_sql_id > 0) {
                    sqlProcessMdl.qryExecutor(taskDtl.sql_tx)
                        .then(function (qryArr) {
                            let ct = 0;
                            //Recursive Function to exeute All queries in Array
                            function execQry(parmsObj) {
                                let qry = prcs_tmplte(taskDtl.rqrce_sql_tx, parmsObj);
                                sqlProcessMdl.qryExecutor(qry, function (err, res) {
                                    ct++;
                                    if (ct == qryArr.length) {
                                        callback(false, []);
                                        return;
                                    }
                                    else if (ct < qryArr.length) {
                                        execQry(qryArr[ct].qry)
                                    }
                                })
                            }
                            execQry(qryArr[ct])
                        }, function (error) {
                            console.log(error);
                            callback(error, null)
                        });
                }
            } else {
                //No Task Details Found
                callback(false, [])
            }

        })
        .catch((error) => {
            console.log(error);
            callback(error, null)
        })

}





/**************************************************************************************
* Controller     : prcs_tmplte (UTILITY)
* Parameters     : req,res()
* Description    : Precise Query and replace $parametres with varibles
***************************************************************************************/
var prcs_tmplte = function (input_str, data) {
    if (tmpltOptns && Object.entries(data).length > 0) {
        Object.keys(data).forEach(function (k) {
            input_str = input_str.replace("$$" + k + "$$", data[k]);
        });
        return input_str;
    }
    else {
        return input_str;
    }
}