var sqldb = require(appRoot + '/config/db.config');
var dbutil = require(appRoot + '/utils/db.utils');
var df = require(appRoot + '/utils/dflower.utils');
let attachmentUtils = require(appRoot + '/utils/attachment.utils');
var attchMnts = require(appRoot + '/utils/attachment.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var fs = require('fs');


/*****************************************************************************
* Function      : getJobsList
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getJobsList = (user) => {
    var fnm = "getJobsList"
    // var QRY_TO_EXEC = `SELECT j.jb_id,j.jb_nm,jtr.sqnce_id, row_number() over(partition by j.jb_id order by j.jb_id,t.tsk_id) as Sno,t.tsk_id,t.tsk_nm as Task_Name,tc.tsk_ctgry_id,tc.tsk_ctgry_nm as Task_Cateogry_Name,t.tsk_srce_id,sc.schde_nm,schde_dscn_tx
    //                     FROM btch_jb_dtl_t as j
    //                     JOIN btch_jb_tsk_rel_t as jtr on jtr.jb_id=j.jb_id
    //                     JOIN btch_tsk_lst_t as t on t.tsk_id=jtr.tsk_id
    //                     JOIN btch_tsk_ctgry_lst_t as tc on tc.tsk_ctgry_id=t.tsk_ctgry_id
    //                     LEFT JOIN btch_jb_schdle_rel_t as jsr on jsr.jb_id=j.jb_id
    //                     LEFT JOIN btch_schde_lst_t as sc on sc.schde_id = jsr.schde_id
    //                     WHERE j.a_in=1
    //                     ORDER BY j.jb_id,jtr.sqnce_id;`;
    var QRY_TO_EXEC = `SELECT j.jb_id,j.jb_nm, row_number() over(partition by j.jb_id order by j.jb_id,sc.schde_id) as Sno,sc.schde_nm,schde_dscn_tx,mnths_tx,wkdys_tx,dts_tx,hrs_tx,mnts_tx,jsr.a_in,jsr.jb_id as job_id,jsr.schde_id
                    FROM btch_jb_dtl_t as j
                    LEFT JOIN btch_jb_schdle_rel_t as jsr on jsr.jb_id=j.jb_id and jsr.a_in =1
                    LEFT JOIN btch_schde_lst_t as sc on sc.schde_id = jsr.schde_id
                    WHERE j.a_in=1 
                    ORDER BY j.jb_id;`
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


/*****************************************************************************
* Function      : getJbHstryMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getJbHstryMdl = (jb_id, user) => {
    var fnm = "getJbHstryMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY ja.jb_id,jtr.sqnce_id,ta.tsk_strt_ts desc) sno,ja.jb_adt_id,ja.jb_id,j.jb_nm,jtr.sqnce_id,ta.tsk_id,t.tsk_nm,ta.tsk_strt_ts,ta.tsk_end_ts,CASE
                        WHEN ta.tsk_end_ts AND ta.tsk_strt_ts is not NULL THEN "Sucess"
                        WHEn ta.tsk_strt_ts is not NULL AND ta.tsk_end_ts is null then "Error"
                        END as status
                        FROM btch_jb_adt_t as ja
                        join btch_jb_tsk_adt_t as ta on ta.jb_adt_id=ja.jb_adt_id
                        JOIN btch_jb_tsk_rel_t as jtr on jtr.jb_id=ja.jb_id and jtr.tsk_id=ta.tsk_id 
                        JOIN btch_jb_dtl_t as j on j.jb_id=ja.jb_id
                        JOIN btch_tsk_lst_t as t on t.tsk_id=ta.tsk_id
                        WHERE ja.jb_id=${jb_id}
                        ORDER BY ja.jb_id,jtr.sqnce_id,ta.tsk_strt_ts desc
                        LIMIT 20;`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getJbScheduleLstMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getJbScheduleLstMdl = (jb_id, user) => {
    var fnm = "getJbScheduleLstMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY sc.schde_id) sno, sc.schde_id,schde_nm,schde_dscn_tx,mnths_tx,wkdys_tx,dts_tx,hrs_tx,mnts_tx,j.jb_id,j.jb_nm,
                        CONCAT (sc.mnths_tx,' ',',','  ',wkdys_tx,' ',',','  ',dts_tx,' ',',','  ',hrs_tx,' ',',','  ',mnts_tx ) as "cron_tab"
                        FROM btch_schde_lst_t as sc
                        JOIN btch_jb_schdle_rel_t as jsr on sc.schde_id = jsr.schde_id
                        JOIN btch_jb_dtl_t as j on j.jb_id = jsr.jb_id
                        WHERE sc.a_in=1 and jsr.a_in=1 and jsr.jb_id=${jb_id}
                        ORDER BY sc.schde_id;`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : delJbScheduleMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.delJbScheduleMdl = (sche_id, jb_id, user) => {
    var fnm = "delJbScheduleMdl"
    var QRY_TO_EXEC = `update btch_jb_schdle_rel_t SET a_in =0 , updte_usr_id =${user.mrcht_usr_id}, d_ts =CURRENT_TIMESTAMP() where schde_id =${sche_id} AND jb_id =${jb_id};`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getJobScheduleMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getJobScheduleMdl = (jb_id, sche_id, user) => {
    var fnm = "getJobScheduleMdl"
    var QRY_TO_EXEC = `SELECT b.*,bj.jb_id from btch_schde_lst_t b
                    JOIN btch_jb_schdle_rel_t as bj on bj.schde_id = b.schde_id
                    WHERE bj.jb_id=${jb_id} AND bj.schde_id =${sche_id};`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getJobTasksMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getJobTasksMdl = (jb_id, user) => {
    var fnm = "getJobTasksMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY t.tsk_id) sno,j.jb_id,j.jb_nm,t.tsk_nm,t.tsk_ctgry_id,t.tsk_desc_tx,tc.tsk_ctgry_nm,tc.tsk_ctgry_desc_tx FROM btch_jb_dtl_t j
                        JOIN btch_jb_tsk_rel_t as jtr on jtr.jb_id=j.jb_id
                        JOIN btch_tsk_lst_t as t on t.tsk_id=jtr.tsk_id
                        JOIN btch_tsk_ctgry_lst_t as tc on tc.tsk_ctgry_id=t.tsk_ctgry_id
                        WHERE j.jb_id=${jb_id};`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getjbScheduleMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getjbScheduleMdl = (data, user) => {
    var fnm = "getjbScheduleMdl"
    // console.log(data);
    var QRY_TO_EXEC = `SELECT * FROM btch_schde_lst_t WHERE mnths_tx='${data.mnths_tx}' AND wkdys_tx='${data.wkdys_tx}' AND dts_tx='${data.dts_tx}' AND hrs_tx='${data.hrs_tx}' AND mnts_tx='${data.mnts_tx}';`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insjbscheduleMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insjbscheduleMdl = (data, user) => {
    var fnm = "insjbscheduleMdl"
    // console.log(data);
    // console.log(user);
    var QRY_TO_EXEC = `INSERT INTO btch_schde_lst_t ( schde_nm, schde_dscn_tx, mnths_tx, wkdys_tx, dts_tx, hrs_tx, mnts_tx, crte_usr_id, a_in, i_ts) VALUES('${data.schde_nm}','${data.schde_dscn_tx}','${data.mnths_tx}','${data.wkdys_tx}','${data.dts_tx}','${data.hrs_tx}','${data.mnts_tx}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,user,fnm);
}

/*****************************************************************************
* Function      : insJbScheduleRelMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insJbScheduleRelMdl = (sch_id, data, user) => {
    var fnm = "insJbScheduleRelMdl"
    // console.log(sch_id);
    // console.log(user);
    var QRY_TO_EXEC = `INSERT INTO btch_jb_schdle_rel_t ( schde_id, jb_id, crte_usr_id, a_in, i_ts) VALUES('${sch_id}','${data.jb_id}','${user.mrcht_usr_id}',1,CURRENT_TIMESTAMP());`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getJbscheduleRelMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getJbscheduleRelMdl = (schd_id, data, user) => {
    var fnm = "getJbscheduleRelMdl"
    // console.log(data);
    var QRY_TO_EXEC = `SELECT * FROM btch_jb_schdle_rel_t WHERE schde_id='${schd_id}' AND jb_id=${data.jb_id};`;
    // console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : insJbScheduleRelainMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insJbScheduleRelainMdl = (sche_id, data, user) => {
    var fnm ="insJbScheduleRelainMdl"
    // console.log(sche_id);
    var QRY_TO_EXEC = `update btch_jb_schdle_rel_t SET a_in =1 ,updte_usr_id =${user.mrcht_usr_id}, u_ts =CURRENT_TIMESTAMP() where schde_id =${sche_id} AND jb_id =${data.jb_id};`;
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/*****************************************************************************
* Function      : getJbLogMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getJbLogMdl = (jb_adt_id) => {

    console.log(jb_adt_id)

    return new Promise((resolve, reject) => {
        fs.readFile(appRoot + "/log/" + jb_adt_id + '.txt', 'utf8', function (err, data) {
            //    console.log(appRoot + "/log/" + jb_adt_id + '.txt')
            //    console.log(data.replace(/\n/g, "#"));
            resolve(data)
        });

    })
    // return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function      : getJobHistoryMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.getJobHistoryMdl = (data, user) => {
    var fnm = "getJobHistoryMdl"
    var QRY_TO_EXEC = `SELECT ROW_NUMBER() OVER ( ORDER BY ja.jb_id,ja.jb_strt_ts desc) sno,ja.jb_adt_id,ja.jb_id,j.jb_nm,ja.jb_strt_ts,ja.jb_end_ts,CASE
                        WHEN ja.jb_end_ts AND ja.jb_strt_ts is not NULL THEN "Sucess"
                        WHEn ja.jb_strt_ts is not NULL AND ja.jb_end_ts is null then "Error"
                        END as status,TIMEDIFF( ja.jb_strt_ts ,  ja.jb_end_ts) as duration
                        FROM btch_jb_adt_t as ja
                        JOIN btch_jb_dtl_t as j on j.jb_id=ja.jb_id
                        WHERE DATE(ja.jb_strt_ts) BETWEEN '${data.frmdate}' and '${data.todate}'
                        ORDER BY ja.jb_id,ja.jb_strt_ts desc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
