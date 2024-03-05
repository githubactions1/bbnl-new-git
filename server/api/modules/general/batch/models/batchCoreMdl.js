var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
async = require('async');


/*****************************************************************************
* Function      : getBatchSchedules
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getBatchSchedules = function ( callback) {
    var fnm ='getBatchSchedules'
    var QRY_TO_EXEC = `SELECT j.jb_nm,j.jb_id,t.tsk_id,jtr.sqnce_id,t.tsk_nm,t.tsk_srce_id,t.tsk_ctgry_id,tc.tsk_ctgry_nm,schde_nm,sch.schde_dscn_tx,mnths_tx,wkdys_tx,dts_tx,hrs_tx,mnts_tx,frst_wrkng_in,lst_wrkng_in
    from btch_jb_dtl_t as j
    JOIN btch_jb_schdle_rel_t as bjr on bjr.jb_id=j.jb_id
    JOIN btch_schde_lst_t as sch on sch.schde_id=bjr.schde_id
    JOIN btch_jb_tsk_rel_t as jtr on jtr.jb_id=j.jb_id
    JOIN btch_tsk_lst_t as t on t.tsk_id=jtr.tsk_id
    JOIN btch_tsk_ctgry_lst_t as tc on tc.tsk_ctgry_id=t.tsk_ctgry_id
    WHERE j.a_in=1 and sch.a_in=1
    ORDER BY j.jb_id,jtr.sqnce_id;`;
    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm,  function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function      : getJobDetails
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getJobDetails = function (jb_id,  callback) {
    var fnm ='getJobDetails'
    var QRY_TO_EXEC = `SELECT j.jb_nm,j.jb_id,t.tsk_id,jtr.sqnce_id,t.tsk_nm,t.tsk_srce_id,t.tsk_ctgry_id,tc.tsk_ctgry_nm,s.sql_nm,s.sql_tx,s.rqrce_in,s.rqrce_sql_id,rs.sql_tx as rqrce_sql_tx,s.nxt_sql_id,ns.sql_tx as nxt_sql_tx
                        from btch_jb_dtl_t as j
                        JOIN btch_jb_tsk_rel_t as jtr on jtr.jb_id=j.jb_id
                        JOIN btch_tsk_lst_t as t on t.tsk_id=jtr.tsk_id
                        left join btch_sql_lst_t as s on s.sql_id=t.tsk_srce_id
                        left join btch_sql_lst_t as rs on rs.sql_id=s.rqrce_sql_id
                        left join btch_sql_lst_t as ns on ns.sql_id=s.nxt_sql_id
                        JOIN btch_tsk_ctgry_lst_t as tc on tc.tsk_ctgry_id=t.tsk_ctgry_id
                        WHERE j.jb_id=${jb_id}
                        ORDER BY j.jb_id,jtr.sqnce_id;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm,  function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function      : qryExecutor
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.qryExecutor = function (qry_tx, callback) {
    var fnm ='qryExecutor'
    var QRY_TO_EXEC = qry_tx;
    // console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function") {
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,{},fnm);
};


/*****************************************************************************
* Function      : jobCurrentStatusCheck
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.jobCurrentStatusCheck = function (jb_id,  callback) {
    var fnm ='jobCurrentStatusCheck'
    var QRY_TO_EXEC = `SELECT * FROM btch_jb_adt_t WHERE jb_id=${jb_id} and jb_strt_ts is not null and jb_end_ts is null;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm,  function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function      : openJobAudit
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.openJobAudit = function (jb_id,  callback) {
    var fnm ='openJobAudit'
    var QRY_TO_EXEC = `INSERT INTO btch_jb_adt_t ( jb_id, jb_strt_ts,i_ts) VALUES (${jb_id}, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm,  function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function      : closeJobAudit
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.closeJobAudit = function (jb_id,  callback) {
    var fnm ='closeJobAudit'
    var QRY_TO_EXEC = `UPDATE btch_jb_adt_t set jb_end_ts=CURRENT_TIMESTAMP() where jb_id=${jb_id} and jb_end_ts is null ;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};




/*****************************************************************************
* Function      : jobCurrentStatusCheck
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.taskCurrentStatusCheck = function (task, jobAdtId,  callback) {
    var fnm ='taskCurrentStatusCheck'
    var QRY_TO_EXEC = `SELECT * FROM btch_jb_tsk_adt_t WHERE jb_adt_id=${jobAdtId} and tsk_id=${task.tsk_id} and  tsk_strt_ts is not null and tsk_end_ts is null;`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm,  function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function      : openTaskAudit
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.openTaskAudit = function (task, jobAdtId,  callback) {
    var fnm ='openTaskAudit'
    var QRY_TO_EXEC = `INSERT INTO btch_jb_tsk_adt_t ( jb_id,jb_adt_id,tsk_id,tsk_strt_ts,i_ts) VALUES (${task.jb_id},${jobAdtId},${task.tsk_id}, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm,  function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function      : closeTaskAudit
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.closeTaskAudit = function (taskAdtId,  callback) {
    var fnm ='closeTaskAudit'
    var QRY_TO_EXEC = `UPDATE btch_jb_tsk_adt_t set tsk_end_ts=CURRENT_TIMESTAMP() where tsk_adt_id=${taskAdtId};`;

    if (callback && typeof callback == "function")
        dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};







