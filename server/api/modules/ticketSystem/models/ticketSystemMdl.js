var df = require(appRoot + '/utils/dflower.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var attachmentUtils = require(appRoot + '/utils/attachment.utils');
var dbutil = require(appRoot + '/utils/db.utils');
var moment = require('moment');
var dateFormat = require('dateformat');
var request = require('request');
var FCM = require('fcm-node');
/**************************************************************************************
* Function       : categoriesLstMdl
* Arguments      : callback function
***************************************************************************************/
exports.categoriesLstMdl = function (callback) {

    var QRY_TO_EXEC = `SELECT * FROM tkt_cat_lst_t ORDER BY cat_id`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            console.log(rows);
            connection.release();  // Release connection back to Pool
            if (err) { console.log("Error : " + err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : subCategoriesLstMdl
* Arguments      : callback function
***************************************************************************************/
exports.subCategoriesLstMdl = function (cat_id, callback) {
    if (cat_id == undefined) {
        catid = ``
    } else {
        catid = `WHERE cat_id = ${cat_id}`
    }
    var QRY_TO_EXEC = `SELECT * FROM tkt_sub_cat_lst_t ${catid} ORDER BY sub_cat_id `;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function     : requestEntryMdl
* Arguments      : callback function
***************************************************************************************/

exports.requestEntryMdl = function (req_data, asgnd_usr_id, usr_id, status_id, callback) {
    console.log(req_data.Date);
    var req_date = dateFormat(req_data.Date, "yyyy-mm-dd"); // Returns '02-8-16'
    if (asgnd_usr_id == 'undefined' || !asgnd_usr_id) {
        var asgnd_usr_id = ''
    } else {
        var asgnd_usr_id = asgnd_usr_id;
    }
    console.log(req_data.cat_id)
    console.log(req_data.sub_cat_id)
    var MAX_REQ_ID = `SELECT COUNT(req_entry_dt) as cnt from tkt_req_enrty_dtl_t WHERE DATE(req_entry_dt) = CURDATE();`;
    console.log(MAX_REQ_ID)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "MAX_REQ_ID :: " + MAX_REQ_ID); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(MAX_REQ_ID, function (err, rows) {
            if (rows) {
                var QRY_TO_EXEC = `INSERT INTO tkt_req_enrty_dtl_t (req_txt,req_entry_dt,req_qr_cd,asgnd_usr_id,req_usr_nm,req_usr_mbl,req_usr_adrs,city,shrt_desc,cat_id,sub_cat_id,usr_id,dprmnt_id,pn_cd,status_id,a_in,i_ts) VALUES ('${req_data.req_txt}', '${req_date}',CONCAT('RJY-', replace(CURDATE(), '-', ''),'-${rows[0].cnt + 1}'),'${asgnd_usr_id}','${req_data.req_usr_nm}','${req_data.req_usr_mbl}','${req_data.req_usr_adrs}','${req_data.city}','${req_data.shrt_desc}','${req_data.cat_id}','${req_data.subcat_id}','${usr_id}','${req_data.dprmnt_id}','${req_data.pn_cd}',${status_id},1,CURRENT_TIMESTAMP())`;
                console.log(QRY_TO_EXEC);
                sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
                    if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   
                    // Execute the query
                    connection.query(QRY_TO_EXEC, function (err, rows) {
                        connection.release();  // Release connection back to Pool
                        if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                        callback(false, rows);  // Send the results back       
                    });
                });
            } else {
                connection.release();  // Release connection back to Pool
                if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                callback(false, rows);  // Send the results back    
            }
        });
    });
};

/**************************************************************************************
* Function       : reqListMdl
* Arguments      : callback function
***************************************************************************************/
exports.reqListMdl = function (usr_id, callback) {

    var QRY_TO_EXEC1 = `SELECT t.* ,ts.stg_id,ts.asgnd_usr_id,ts.frwd_usr_id,tc.cat_nm,DATE_FORMAT(t.i_ts,'%d-%m-%Y') as dt,tsc.sub_cat_nm,tsl.status_id,tsl.status_nm,u.mrcht_usr_nm as asgnd_usr_nm,
    CASE WHEN max(ts.status_id) AND ts.u_ts is NOT NULL THEN 0 ELSE max(ts.status_id) END as status
FROM tkt_req_enrty_dtl_t t
LEFT JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id 
JOIN tkt_cat_lst_t tc ON tc.cat_id = t.cat_id
JOIN tkt_sub_cat_lst_t tsc ON tsc.sub_cat_id = t.sub_cat_id
JOIN tkt_sts_lst_t tsl ON tsl.status_id = ts.status_id
LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.asgnd_usr_id
WHERE t.a_in = 1 AND (ts.frwd_usr_id   =(select usr_nm from mrcht_usr_lst_t where mrcht_usr_id= `+ usr_id + `)  
        or t.usr_id = (select usr_nm from mrcht_usr_lst_t where mrcht_usr_id=`+ usr_id + `) )  
        GROUP BY t.req_entry_id
        HAVING status = 1
        ORDER BY req_entry_id`;

    var QRY_TO_EXEC2 = `SELECT t.* ,ts.stg_id,ts.asgnd_usr_id,ts.frwd_usr_id,tc.cat_nm,DATE_FORMAT(t.i_ts,'%d-%m-%Y') as dt,tsc.sub_cat_nm,tsl.status_id,tsl.status_nm,u.mrcht_usr_nm as asgnd_usr_nm,
    CASE WHEN max(ts.status_id) AND ts.u_ts is NOT NULL THEN 0 ELSE max(ts.status_id) END as status
FROM tkt_req_enrty_dtl_t t
LEFT JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id 
JOIN tkt_cat_lst_t tc ON tc.cat_id = t.cat_id
JOIN tkt_sub_cat_lst_t tsc ON tsc.sub_cat_id = t.sub_cat_id
JOIN tkt_sts_lst_t tsl ON tsl.status_id = ts.status_id
LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.asgnd_usr_id
WHERE t.a_in = 1 AND (ts.frwd_usr_id   =(select usr_nm from mrcht_usr_lst_t where mrcht_usr_id= `+ usr_id + `)  
        or t.usr_id = (select usr_nm from mrcht_usr_lst_t where mrcht_usr_id=`+ usr_id + `) )  
        GROUP BY t.req_entry_id
        HAVING status = 2
        ORDER BY req_entry_id`;
    var QRY_TO_EXEC = QRY_TO_EXEC1 + ';' + QRY_TO_EXEC2;


    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            console.log(QRY_TO_EXEC);
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : reqEntryListMdl
* Arguments      : callback function
***************************************************************************************/
exports.reqEntryListMdl = function (usr_id, cat_id, sub_cat_id, sts_id, frm_dt, to_dt, req_entry_id, assigned, opened, flte_txt, spr_admn_in, dprmnt_id, asngd_to_me, infrmd_id, app_in, stus_id, callback) {
    console.log(assigned);
    var ctgty_id;
    var sub_ctgty_id;
    var sts_id;
    var reqEntryId;
    var date;
    var usrid;
    var req_id;
    var asgn;
    var req_nm;
    var opnd;
    var dprtmnt;
    var asndtome;
    var infrmdid;
    var app_usrid;
    var date1;
    if (cat_id == undefined || cat_id == 'null' || cat_id == '') {
        ctgty_id = ``;
    } else {
        ctgty_id = `AND t.cat_id =` + cat_id
    }

    if (sub_cat_id == 'null' || sub_cat_id == '' || sub_cat_id == undefined) {
        sub_ctgty_id = ``;
    } else {
        sub_ctgty_id = `AND t.sub_cat_id =` + sub_cat_id;
    }

    if (sts_id == undefined || sts_id == '' || sts_id == 'null') {
        sts_id = ``;
    } else {
        sts_id = `AND ts.status_id = ${sts_id}`;
    }
    if (req_entry_id == 'undefined' || req_entry_id == '' || req_entry_id == 'null') {
        reqEntryId = ``;
    } else {
        reqEntryId = `AND t.req_entry_id = ${req_entry_id}`;
    }
    if (!frm_dt || frm_dt == undefined && !to_dt && to_dt == 'undefined') {
        date = ``
    } else {
        date = `AND DATE(a.req_entry_dt) BETWEEN '${frm_dt}' and '${to_dt}' `;
        date1 = `AND DATE(ts.i_ts) between '${frm_dt}' and '${to_dt}'`
    }


    if (dprmnt_id == 0 || dprmnt_id == undefined) {
        dprtmnt = ``;
    } else {
        dprtmnt = `AND t.dprmnt_id = ${dprmnt_id}`
    }

    if ((spr_admn_in == 1 || spr_admn_in == 0) && (req_entry_id == undefined || req_entry_id == '' || req_entry_id == 'null')) {
        req_id = ``
    } else {
        req_id = `WHERE ts.req_entry_id = ${req_entry_id} and ts.a_in = 1`
    }

    if (spr_admn_in == 1) {
        cntUsrid = ``
    } else {
        cntUsrid = `AND ((ts.asgnd_usr_id =  ${usr_id} && ts.asgnd_ind=1)  or (ts.frwd_usr_id = ${usr_id} && ts.frwd_ind=1) 
        or (ts.asgnd_ind = 0 && ts.frwd_ind = 0 && ts.status_id = 3 && ts.usr_id = ${usr_id})) `
    }


    if (spr_admn_in == 1) {
        asngdtome = ``
    } else if (spr_admn_in == 0) {
        console.log("Assign to me::::" + asngd_to_me)
        if (asngd_to_me == 0) {
            asngdtome = ``
        } else if (asngd_to_me == 1) {
            asngdtome = `AND ts.asgnd_ind = 1 AND ts.frwd_ind = 0 AND ts.asgnd_usr_id = ${usr_id}`;
        } else if (asngd_to_me == 2) {
            asngdtome = `AND ts.frwd_ind = 1 AND ts.asgnd_ind = 0 AND ts.frwd_usr_id = ${usr_id}`;
        } else if (asngd_to_me == 3) {
            asngdtome = `AND ts.asgnd_ind = 0 AND ts.frwd_ind = 0 AND ts.status_id = 3 AND ts.usr_id = ${usr_id}`;
        }
    }

    if (spr_admn_in == 1) {
        usrid = ``;
        asngdtome = ``;
        infrmdid = ``;
    } else {
        usrid = `AND (a.user_id = ${usr_id} or a.usr_id = ${usr_id}) `
    }

    if (spr_admn_in == 0 && (infrmd_id == '' || infrmd_id == null || infrmd_id == 0)) {
        infrmdid = ``;
    } else {
        if (infrmd_id == 1) {
            infrmdid = `AND ts.infrmd_to = ${usr_id}`
        } else if (infrmd_id == 2) {
            infrmdid = `AND ts.infrmd_to <> 0 and ts.usr_id = ${usr_id}`
        }

        ctgty_id = ``;
        sub_ctgty_id = ``;
        sts_id = ``;
        reqEntryId = ``;
        date = ``;
        usrid = ``;
        opnd = ``;
        req_nm = ``;
        dprtmnt = ``;
        date1 = ``;
        asngdtome = ``;
        asgn = ``;
    }

    if (assigned == undefined || assigned == '' || assigned == 'null' || assigned == 0) {
        asgn = ``;
    } else {
        console.log("assign Else")
        if (assigned == 1) {
            asgn = `AND ts.asgnd_ind= 1 AND ts.frwd_ind = 0 AND ts.asgnd_usr_id = ${usr_id}  AND ts.i_ts >= date_sub(now(),interval 1 month)`;
        } else if (assigned == 2) {
            asgn = `AND ts.asgnd_ind= 1 AND ts.frwd_ind = 0 AND ts.asgnd_usr_id = ${usr_id} AND ts.i_ts >= date_sub(now(),interval 2 month)`;
        } else if (assigned == 3) {
            asgn = `AND ts.asgnd_ind= 1 AND ts.frwd_ind = 0 AND ts.asgnd_usr_id = ${usr_id} AND  ts.i_ts >= date_sub(now(),interval 3 month)`;
        } else if (assigned == 4) {
            asgn = `AND ts.asgnd_ind= 1 AND ts.frwd_ind = 0 AND ts.asgnd_usr_id = ${usr_id} AND  ts.i_ts >= date_sub(now(),interval 4 month)`;
        } else if (assigned == 5) {
            asgn = `AND ts.asgnd_ind= 1 AND ts.frwd_ind = 0 AND ts.asgnd_usr_id = ${usr_id} AND  ts.i_ts >= date_sub(now(),interval 5 month)`;
        } else if (assigned == 6) {
            asgn = `AND ts.asgnd_ind= 1 AND ts.frwd_ind = 0 AND ts.asgnd_usr_id = ${usr_id} AND  ts.req_entry_dt >= date_sub(now(),interval 6 month)`;
        }

        ctgty_id = ``;
        sub_ctgty_id = ``;
        sts_id = ``;
        reqEntryId = ``;
        date = ``;
        usrid = ``;
        opnd = ``;
        req_nm = ``;
        dprtmnt = ``;
        date1 = ``;
        asngdtome = ``;
        infrmdid = ``;
    }

    if (flte_txt == undefined || flte_txt == '' || flte_txt == 'null') {
        req_nm = ``;
    } else if (flte_txt != null) {
        if (isNaN(flte_txt)) {
            req_nm = `AND req_usr_nm like '%${flte_txt}%'`
        } else {
            req_nm = `AND req_usr_mbl like '%${flte_txt}%'`
        }
        ctgty_id = ``;
        sub_ctgty_id = ``;
        sts_id = ``;
        reqEntryId = ``;
        date = ``;
        date1 = ``;
        usrid = ``;
        asgn = ``;
        opnd = ``;
        dprtmnt = ``;
        asngdtome = ``;
        infrmdid = ``;
    }

    if (spr_admn_in == 1) {
        where = ``
    } else {
        where = `where c1.usrs_id=${usr_id}`;
    }



    var QRY_TO_EXEC1 = `select a.* from (select case when ts.asgnd_usr_id=0&& ts.frwd_usr_id !=0 then ts.frwd_usr_id when ts.asgnd_usr_id!=0&& ts.frwd_usr_id =0 then ts.asgnd_usr_id else 0 end as user_id,
             t.*,c.cat_nm,s.sub_cat_nm,DATE_FORMAT(t.req_entry_dt, '%d-%m-%Y') as dt,td.dprt_nm as dprmnt_nm
        ,ts.frwd_usr_id,ts.status_id as sts_id,u3.fst_nm as frwd_usr_nm,u.fst_nm as asgnd_usr_nm,ts.stg_id
    ,CASE WHEN t.status_id = 0 THEN 'Not Assigned' WHEN t.status_id = 1 THEN 'open' WHEN t.status_id = 2  THEN 'open' WHEN t.status_id = 3 THEN 'completed' END as status_nm
    from tkt_req_enrty_dtl_t as t
    LEFT JOIN tkt_stg_dtl_t as ts on ts.req_entry_id = t.req_entry_id
    JOIN tkt_cat_lst_t c ON c.cat_id = t.cat_id
    JOIN tkt_sub_cat_lst_t s ON s.sub_cat_id = t.sub_cat_id
    LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = t.asgnd_usr_id
    LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.asgnd_usr_id
    LEFT JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = ts.usr_id
    LEFT JOIN mrcht_usr_lst_t u3 ON u3.mrcht_usr_id = ts.status_id
    LEFT JOIN mrcht_dprts_lst_t td ON td.dprt_id = t.dprmnt_id
    LEFT JOIN tkt_sts_lst_t tsl ON tsl.status_id = ts.status_id
    WHERE t.a_in = 1 ${asngdtome} ${ctgty_id} ${sub_ctgty_id} ${dprtmnt} ${infrmdid} ${asgn}) as a
    LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = a.user_id 
    where a.a_in = 1 ${date} ${usrid}
    GROUP BY a.req_entry_id
    ORDER BY a.req_entry_id DESC`;

    //  WHERE  ${usrid} ${date} ${reqEntryId} ${ctgty_id} ${sub_ctgty_id} ${sts_id} ${asgn} ${opnd} ${req_nm} ${dprtmnt} ${infrmdid} ${app_usrid}

    var QRY_TO_EXEC2 = `select a.*,b.* from ( SELECT ts.stg_id,t.req_entry_id,t.req_qr_cd,ts.usr_id,
        u.mrcht_usr_nm as asgnd_by_usr,ts.status_id
           ,CASE WHEN ts.asgnd_usr_id = 0 THEN ts.frwd_usr_id WHEN ts.frwd_usr_id = 0 THEN ts.asgnd_usr_id END as asgnd_usr_id
       ,CASE WHEN ts.asgnd_usr_id = 0 THEN u2.mrcht_usr_nm WHEN ts.frwd_usr_id = 0 THEN u1.mrcht_usr_nm END as asgnd_to_usr,tc.cmnt_tx,tc.cmnt_id
       ,DATE_FORMAT(ts.i_ts,'%Y-%m-%d %H:%i') as asgnd_dt,DATE_FORMAT(ts.i_ts,'%Y-%m-%d %H:%i') as frwd_dt
       FROM tkt_req_enrty_dtl_t t
       JOIN tkt_stg_dtl_t ts on ts.req_entry_id = t.req_entry_id
       JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.usr_id
       LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.asgnd_usr_id
       LEFT JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = ts.frwd_usr_id
         LEFT JOIN tkt_cmnt_dtl_t tc ON tc.req_entry_id = t.req_entry_id 
         ${req_id} and ts.status_id <> 3) a
            JOIN ( SELECT tc.cmnt_id,tc.cmnt_tx,ts.stg_id,ts.req_entry_id,u.mrcht_usr_nm as chat_usr,DATE_FORMAT(tc.i_ts,'%Y-%m-%d %H:%i') as cmntdt
                         FROM tkt_req_enrty_dtl_t t
                         JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id
                         LEFT JOIN tkt_cmnt_dtl_t tc on tc.stg_id = ts.stg_id
                         LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = tc.usr_id
                         ${req_id}
                        GROUP BY t.req_entry_id,ts.stg_id,tc.cmnt_id
                        ORDER BY t.req_entry_id,ts.stg_id,tc.cmnt_id ) as b ON b.stg_id = a.stg_id AND a.req_entry_id = b.req_entry_id
                     
                    ORDER BY a.stg_id`

    var QRY_TO_EXEC3 = `SELECT t.*, ts.status_id, DATE_FORMAT(ta.i_ts, '%d-%m-%Y %H:%i') as dt,ts.stg_id,ts.frwd_usr_id,
    u.mrcht_usr_nm as frwd_usr_nm,ta.atchmnt_id,u.mrcht_usr_nm as asgnd_usr_nm,ta.atchmnt_url_tx,ta.atchmnt_url_nm,ta.atchmnt_lbl_nm
     FROM tkt_req_enrty_dtl_t t
     LEFT JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id     
     LEFT JOIN tkt_atchmnt_dtl_t ta ON ta.req_entry_id = t.req_entry_id
     LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ta.usr_id
     WHERE  ta.atchmnt_url_tx is NOT NULL AND ta.a_in = 1 ${reqEntryId}
     GROUP BY t.req_entry_id,ta.atchmnt_id
     ORDER BY t.req_entry_id,ta.atchmnt_id `;

    if (spr_admn_in == 1) {
        var QRY_TO_EXEC4 = `   SELECT sum(CASE WHEN ts.asgnd_ind = 1 AND ts.frwd_ind = 0 THEN 1 ELSE 0 END ) as opened,
        sum(CASE WHEN ts.asgnd_ind = 0 && ts.frwd_ind = 1 THEN 1 ELSE 0 END ) as Forward,
        SUM(CASE WHEN ts.asgnd_ind = 0 && ts.frwd_ind = 0 && ts.status_id = 3 THEN 1 ELSE 0 END) as closed,
       (sum(CASE WHEN ts.asgnd_ind = 1 && ts.frwd_ind = 0 THEN 1 ELSE 0 END) + sum(CASE WHEN ts.asgnd_ind = 0 && ts.frwd_ind = 0 && ts.status_id = 3 THEN 1 ELSE 0 END)) as all_req
        FROM tkt_req_enrty_dtl_t t
        JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id ${ctgty_id} ${sub_ctgty_id} ${dprtmnt}`
    } else {

        var QRY_TO_EXEC4 = `
        SELECT req_entry_dt,req_qr_cd,u.mrcht_usr_nm,u.mrcht_usr_id,a.usrs_id,
	sum(case WHEN  a.asgnd_ind = 1 && a.frwd_ind = 0 THEN 1 ELSE 0 END) as opened,
	sum(case WHEN  a.asgnd_ind = 0 && a.frwd_ind = 1 THEN 1 ELSE 0 END) as Forward,
	sum(case WHEN a.asgnd_ind = 0 && a.frwd_ind = 0 && a.status_id = 3 THEN 1 ELSE 0 END) as closed,
	(sum(case WHEN a.asgnd_ind = 1 && a.frwd_ind = 0 THEN 1 ELSE 0 END) + sum(case WHEN a.asgnd_ind = 0 && a.frwd_ind = 0 && a.status_id = 3 THEN 1 ELSE 0 END)) as all_req
    FROM
    ( SELECT ts.*,case when ts.asgnd_ind = 1 && ts.frwd_ind = 0 then ts.asgnd_usr_id
    when ts.frwd_ind = 1 && ts.asgnd_ind = 0 then ts.frwd_usr_id
    WHEN ts.asgnd_ind = 0 && ts.frwd_ind = 0 && ts.status_id = 3 THEN ts.usr_id END as usrs_id
    FROM tkt_stg_dtl_t ts
      WHERE ts.a_in = 1 ${date1} ${cntUsrid}  ${infrmdid} ${asgn}) as a
      JOIN ( SELECT MAX(ts.stg_id) as stg_id FROM tkt_stg_dtl_t as ts WHERE ts.a_in = 1 ${date1} ${cntUsrid} ${infrmdid} ${asgn}GROUP BY ts.req_entry_id,ts.stg_id)  as b ON a.stg_id = b.stg_id
      JOIN tkt_req_enrty_dtl_t t ON t.req_entry_id = a.req_entry_id  ${ctgty_id} ${sub_ctgty_id} ${dprtmnt}
      JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = a.usrs_id `
    }



    //     select c1.*,u.mrcht_usr_nm from
    //     (select a.usrs_id,
    //     sum(case WHEN  a.asgnd_ind = 1 THEN 1 ELSE 0 END) as opened,
    //     sum(case WHEN  a.frwd_ind = 1 THEN 1 ELSE 0 END) as Forward,
    //     sum(case WHEN a.sts = 3 THEN 1 ELSE 0 END) as closed,
    //     (sum(case WHEN a.asgnd_ind = 1 THEN 1 ELSE 0 END) + sum(case WHEN a.sts = 3 THEN 1 ELSE 0 END)) as all_req
    //     from
    //     (select stg_id,t.*,ts.status_id as sts,ts.asgnd_usr_id as asgn_usr,ts.frwd_usr_id,ts.asgnd_ind,ts.frwd_ind,
    //         case when (ts.asgnd_ind = 1 && ts.asgnd_usr_id <> 0 && ts.status_id <> 3) then ts.asgnd_usr_id  
    //          when (ts.frwd_ind = 1 AND ts.frwd_usr_id <> 0 && ts.status_id <> 3) then ts.frwd_usr_id 
    //          WHEN (ts.asgnd_ind = 0 && ts.asgnd_usr_id = 0) AND (ts.frwd_ind = 0 && ts.frwd_usr_id = 0) AND ts.status_id = 3 THEN ts.usr_id END as usrs_id
    //     from tkt_stg_dtl_t as ts
    //     join tkt_req_enrty_dtl_t as t on t.req_entry_id=ts.req_entry_id
    //     where t.req_entry_dt between '${frm_dt}' and '${to_dt}' ${cntUsrid} ${ctgty_id} ${sub_ctgty_id} ${dprtmnt} ${infrmdid}
    //     -- and cat_id=2 and sub_cat_id=1 and dprmnt_id=2 and ts.status_id=1
    //    --  group by ts.req_entry_id
    //     order by ts.req_entry_id
    //     ) as a
    //     group by a.usrs_id) as c1
    //     JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id =c1.usrs_id
    //     ${where}


    if (req_entry_id == 'undefined' || req_entry_id == '' || req_entry_id == 'null') {
        var QRY_TO_EXEC = QRY_TO_EXEC1 + ';' + QRY_TO_EXEC4;
    } else {
        var QRY_TO_EXEC = QRY_TO_EXEC2 + ';' + QRY_TO_EXEC3
    }

    // var QRY_TO_EXEC = QRY_TO_EXEC1 + ';' + QRY_TO_EXEC2 + ';' + QRY_TO_EXEC3 + ';' + QRY_TO_EXEC4
    console.log("::::::::Request Entry list :::::::::::::::::");
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            // console.log(QRY_TO_EXEC);
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};


/**************************************************************************************
* Function       : dashboardEntryListMdl
* Arguments      : callback function
***************************************************************************************/
exports.dashboardEntryListMdl = function (data, callback) {
    console.log(data);
    var date;
    if (data.ind == 1) {
        date = `AND DATE(t.req_entry_dt) BETWEEN '${data.frm_dt}' and '${data.to_dt}'`;
    } else {
        date = ``
    }
    if (data.lstasg == undefined || data.lstasg == '' || data.lstasg == 'null') {
        asgn = ``;
    } else {
        if (data.lstasg == 1) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 1 month)`;
        } else if (data.lstasg == 2) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 2 month)`;
        } else if (data.lstasg == 3) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 3 month)`;
        } else if (data.lstasg == 4) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 4 month)`;
        } else if (data.lstasg == 5) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 5 month)`;
        } else if (data.lstasg == 6) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 6 month)`;
        }
    }
    var QRY_TO_EXEC = `select a.*,v.*,(a.opened+v.closed) as total from
    (SELECT 
        SUM(CASE WHEN t.status_id in (1,2)  THEN 1 ELSE 0 END) as opened
        FROM tkt_req_enrty_dtl_t t
        WHERE t.a_in = 1 ${date} ${asgn}) as a
    join 
    (select SUM(CASE WHEN tsg.status_id = 2 THEN 1 ELSE 0 END) as forward,
    SUM(CASE WHEN tsg.status_id = 3 THEN 1 ELSE 0 END) closed
     from tkt_stg_dtl_t as tsg) as v`;

    // var QRY_TO_EXEC = `SELECT 
    // SUM(CASE WHEN tsg.status_id = 1 or t.status_id = 1 THEN 1 ELSE 0 END) as opened
    // ,SUM(CASE WHEN tsg.status_id = 2 THEN 1 ELSE 0 END) as forward
    // ,SUM(CASE WHEN tsg.status_id = 3 THEN 1 ELSE 0 END) closed
    // , SUM(CASE WHEN tsg.status_id = 1 or t.status_id = 1 THEN 1 ELSE 0 END) + SUM(CASE WHEN tsg.status_id = 2 THEN 1 ELSE 0 END) + SUM(CASE WHEN tsg.status_id = 3 THEN 1 ELSE 0 END) all_req 
    // FROM tkt_req_enrty_dtl_t t
    // JOIN tkt_stg_dtl_t tsg ON tsg.req_entry_id = t.req_entry_id
    // WHERE t.a_in = 1 ${date} ${asgn}`;

    console.log("::::::::QRY_TO_EXEC:::::::::::::::::");
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            // console.log(QRY_TO_EXEC);
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};


/**************************************************************************************
* Function       : pendingListMdl
* Arguments      : callback function
***************************************************************************************/
exports.pendingListMdl = function (data, callback) {
    console.log(data);
    if (data.req_entry_id == '') {
        req_id = `ta.a_in = 1 and ta.atchmnt_url_tx is NOT NULL`
    } else {
        req_id = `ts.infrmd_to = 0 and ts.req_entry_id = ${data.req_entry_id}`
    }

    if (data.req_entry_id == '') {
        reqEntryid = `ta.a_in = 1 and ta.atchmnt_url_tx is NOT NULL`
    } else {
        reqEntryid = `ta.a_in = 1 and ts.req_entry_id = ${data.req_entry_id}`
    }

    var QRY_TO_EXEC1 = `SELECT b.* FROM (
        SELECT t.*,DATE_FORMAT(ts.isue_dt,'%d-%m-%Y') as dt,ts.frwd_usr_id,td.dprmnt_nm,tc.cat_nm,u.mrcht_usr_nm ,ts.infrmd_to,u3.frst_nm as infrmd_to_usr
        ,CASE WHEN ts.asgnd_ind = 1 THEN 'Assigned'
        WHEN ts.asgnd_ind = 0 && ts.frwd_ind = 1 && t.status_id = 2 THEN 'Open'
        WHEN ts.asgnd_ind = 0 && ts.frwd_ind = 0 && t.status_id = 3 THEN 'Closed' ELSE 'Not Assigned' end as status_nm,ts.stg_id
        ,CASE WHEN ts.asgnd_ind = 1 AND ts.frwd_ind = 0 THEN  1 
              WHEN ts.asgnd_ind = 0 AND ts.frwd_ind = 1 THEN 2
              WHEN ts.asgnd_ind = 0 AND ts.frwd_ind = 0 AND ts.status_id = 3 AND ts.usr_id = ${data.usr_id} THEN 3 END as sts_id
               
            FROM tkt_req_enrty_dtl_t t
            JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
            JOIN mrcht_dprts_lst_t td ON td.dprt_id = t.dprmnt_id
            JOIN tkt_sts_lst_t tsl ON tsl.status_id = ts.status_id
            JOIN tkt_cat_lst_t tc ON tc.cat_id = t.cat_id
            JOIN mrcht_usr_lst_t u on u.mrcht_usr_id = t.usr_id
            LEFT JOIN mrcht_usr_lst_t u3 ON u3.mrcht_usr_id = ts.infrmd_to
            WHERE ((ts.asgnd_usr_id = ${data.usr_id} && asgnd_ind = 1) or (ts.frwd_usr_id = ${data.usr_id} && frwd_ind = 1) or (ts.asgnd_ind = 0 && ts.frwd_ind = 0 && ts.usr_id = ${data.usr_id} && ts.status_id = 3))) b
        JOIN (SELECT max(stg_id) as stg_id FROM tkt_stg_dtl_t WHERE ((asgnd_usr_id = ${data.usr_id} && asgnd_ind = 1) or (frwd_usr_id = ${data.usr_id} && frwd_ind = 1) or (asgnd_ind = 0 && frwd_ind = 0 && usr_id = ${data.usr_id} && status_id = 3)) group by req_entry_id) as a on b.stg_id = a.stg_id`;

    var QRY_TO_EXEC2 = `select b.usr_id,b.stg_id
    ,sum(CASE WHEN b.asgnd_ind = 1 && b.frwd_ind = 0 THEN 1 ELSE 0 END) as 'assigned'
    ,sum(CASE WHEN b.asgnd_ind = 0 && b.frwd_ind = 1 THEN 1 ELSE 0 END) as 'forward'
    ,sum(CASE WHEN b.asgnd_ind = 0 && b.frwd_ind = 0 && b.status_id = 3 &&  b.usr_id = ${data.usr_id} THEN 1 ELSE 0 END) as 'closed'
    from
    (SELECT ts.*
    FROM tkt_req_enrty_dtl_t t
    LEFT JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id
    WHERE ((ts.asgnd_usr_id = ${data.usr_id} && asgnd_ind = 1) or (ts.frwd_usr_id = ${data.usr_id} && frwd_ind = 1) or (ts.asgnd_ind = 0 && ts.frwd_ind = 0 && ts.usr_id = ${data.usr_id} && ts.status_id = 3))) as b
    join
    (SELECT max(stg_id) as stg_id FROM tkt_stg_dtl_t 
WHERE ((asgnd_usr_id = ${data.usr_id} && asgnd_ind = 1) or (frwd_usr_id = ${data.usr_id} && frwd_ind = 1) or (asgnd_ind = 0 && frwd_ind = 0 && usr_id = ${data.usr_id} && status_id = 3)) group by req_entry_id) as a on b.stg_id=a.stg_id`

    var QRY_TO_EXEC3 = `select a.*,b.* from ( SELECT ts.stg_id,t.req_entry_id,t.req_qr_cd,ts.usr_id,
    u.mrcht_usr_nm as asgnd_by_usr,ts.status_id,ts.infrmd_to,u3.frst_nm as infrmd_to_usr
       ,CASE WHEN ts.asgnd_usr_id = 0 THEN ts.frwd_usr_id WHEN ts.frwd_usr_id = 0 THEN ts.asgnd_usr_id END as asgnd_usr_id
   ,CASE WHEN ts.asgnd_usr_id = 0 THEN u2.mrcht_usr_nm WHEN ts.frwd_usr_id = 0 THEN u1.mrcht_usr_nm END as asgnd_to_usr,tc.cmnt_tx,tc.cmnt_id
   ,DATE_FORMAT(ts.i_ts,'%Y-%m-%d %H:%i') as asgnd_dt,DATE_FORMAT(ts.i_ts,'%Y-%m-%d %H:%i') as frwd_dt
   FROM tkt_req_enrty_dtl_t t
   JOIN tkt_stg_dtl_t ts on ts.req_entry_id = t.req_entry_id
   JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.usr_id
   LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.asgnd_usr_id
   LEFT JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = ts.frwd_usr_id
     LEFT JOIN tkt_cmnt_dtl_t tc ON tc.req_entry_id = t.req_entry_id 
     LEFT JOIN mrcht_usr_lst_t u3 ON u3.mrcht_usr_id = ts.infrmd_to
     WHERE ${req_id}) a
        JOIN ( SELECT tc.cmnt_id,tc.cmnt_tx,ts.stg_id,ts.req_entry_id,u.mrcht_usr_nm as chat_usr,tc.usr_id as chat_usr_id,DATE_FORMAT(tc.i_ts,'%Y-%m-%d %H:%i') as cmntdt
                     FROM tkt_req_enrty_dtl_t t
                     JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id
                     LEFT JOIN tkt_cmnt_dtl_t tc on tc.stg_id = ts.stg_id
                     LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = tc.usr_id
                     WHERE ${req_id}
                    GROUP BY t.req_entry_id,ts.stg_id,tc.cmnt_id
                    ORDER BY t.req_entry_id,ts.stg_id,tc.cmnt_id ) as b ON b.stg_id = a.stg_id AND a.req_entry_id = b.req_entry_id
                 
                ORDER BY a.stg_id`
    var QRY_TO_EXEC4 = `SELECT t.*, ts.status_id, DATE_FORMAT(ta.i_ts, '%d-%m-%Y %H:%i') as dt,ts.stg_id,ts.frwd_usr_id,
                u.mrcht_usr_nm as frwd_usr_nm,ta.atchmnt_id,u1.mrcht_usr_nm as asgnd_usr_nm,lgu.mrcht_usr_nm as lgd_usr_nm,ta.atchmnt_url_tx,ta.atchmnt_url_nm,ta.atchmnt_lbl_nm
                 FROM tkt_req_enrty_dtl_t t
                 LEFT JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
                 LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.frwd_usr_id
                 LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.asgnd_usr_id
                 LEFT JOIN mrcht_usr_lst_t lgu ON lgu.mrcht_usr_id = t.usr_id
                 LEFT JOIN tkt_atchmnt_dtl_t ta ON ta.req_entry_id = t.req_entry_id
                 WHERE ${reqEntryid}   
                 GROUP BY t.req_entry_id,ta.atchmnt_id
                 ORDER BY t.req_entry_id,ta.atchmnt_id `;
    var REQ_CRTD_USR = `SELECT b.* FROM ( SELECT t.req_qr_cd,t.usr_id as req_crtd_usr_id,u.mrcht_usr_nm as req_crtd_usr_nm
        ,DATE_FORMAT(t.i_ts,'%d-%m-%Y %H:%i') as req_crtd_dt,t.req_txt,ts.stg_id
                  ,CASE WHEN ts.asgnd_ind = 0 AND ts.frwd_ind = 0 AND ts.status_id = 3 THEN DATE_FORMAT(ts.i_ts, '%d-%m-%Y %H:%i') END as req_clsd_dt
                  ,CASE WHEN ts.asgnd_ind = 1 && ts.frwd_ind = 0  THEN 'Open'
                        WHEN ts.frwd_ind = 1 && ts.asgnd_ind = 0 THEN 'Open' 
                        WHEN ts.asgnd_ind = 0 AND ts.frwd_ind = 0 AND t.status_id = 3 THEN 'Closed' END as req_sts
                        ,CASE WHEN ts.asgnd_ind = 0 AND ts.frwd_ind = 0 AND infrmd_to <> 0 THEN informusr.mrcht_usr_nm ELSE 0 END infrmd_to_usr
                  ,CASE WHEN  ts.asgnd_ind = 0 AND ts.frwd_ind = 0 AND ts.status_id = 3 THEN u1.mrcht_usr_nm END as req_clsd_usr_nm,u2.mrcht_usr_nm as req_crnt_usr_hav
                  FROM tkt_req_enrty_dtl_t t
                  JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
                  JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = t.usr_id
                  JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.usr_id
                  LEFT JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = t.asgnd_usr_id
                  LEFT JOIN mrcht_usr_lst_t informusr ON informusr.mrcht_usr_id = ts.infrmd_to
                  WHERE t.req_entry_id = ${data.req_entry_id} ) as b
                  JOIN (SELECT max(stg_id) as stg_id FROM tkt_stg_dtl_t WHERE req_entry_id = ${data.req_entry_id} group by req_entry_id) as a on b.stg_id = a.stg_id;
                 `
    console.log(data.req_entry_id)
    if (data.req_entry_id == '') {
        where = QRY_TO_EXEC1 + ';' + QRY_TO_EXEC2;
    } else {
        where = QRY_TO_EXEC1 + ';' + QRY_TO_EXEC2 + ';' + QRY_TO_EXEC3 + ';' + QRY_TO_EXEC4 + ';' + REQ_CRTD_USR
    }
    var QRY_TO_EXEC = where;
    console.log(":::::::::Pending QRY_TO_EXEC:::::::::::");
    console.log(where)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : pendingtimelineListMdl
* Arguments      : callback function
***************************************************************************************/
exports.pendingtimelineListMdl = function (usr_id, cat_id, sub_cat_id, sts_id, frm_dt, to_dt, req_entry_id, assigned, opened, flte_txt, spr_admn_in, dprmnt_id, asngd_to_me, infrmd_id, app_in, stus_id, callback) {
    console.log(usr_id, asngd_to_me, spr_admn_in);
    var ctgty_id;
    var sub_ctgty_id;
    var sts_id;
    var reqEntryId;
    var date;
    var usrid;
    var req_id;
    var asgn;
    var req_nm;
    var opnd;
    var dprtmnt;
    var asndtome;
    var infrmdid;
    var app_usrid;
    var infrm_req_entry;
    if (cat_id == undefined || cat_id == 'null' || cat_id == '') {
        ctgty_id = ``;
    } else {
        ctgty_id = `AND t.cat_id =` + cat_id
    }

    if (sub_cat_id == 'null' || sub_cat_id == '' || sub_cat_id == undefined) {
        sub_ctgty_id = ``;
    } else {
        sub_ctgty_id = `AND t.sub_cat_id =` + sub_cat_id;
    }

    if (sts_id == undefined || sts_id == '' || sts_id == 'null') {
        sts_id = ``;
    } else {
        sts_id = `AND tsg.status_id = ${sts_id}`;
    }
    if (req_entry_id == 'undefined' || req_entry_id == '' || req_entry_id == 'null') {
        reqEntryId = ``;
    } else {
        reqEntryId = `AND t.req_entry_id = ${req_entry_id}`;
    }
    if (!frm_dt || frm_dt == undefined && !to_dt && to_dt == 'undefined') {
        date = ``
    } else {
        date = `AND DATE(a.req_entry_dt) BETWEEN '${frm_dt}' and '${to_dt}' `
    }

    if (infrmd_id == '' || infrmd_id == null) {
        infrmdid = ``;
    } else if (infrmd_id == 1) {
        infrmdid = `AND infrmd_to = ${usr_id}`
    } else if (infrmd_id == 2) {
        infrmdid = `AND infrmd_to is not null and infrmd_to <> 0 and tsg.usr_id = ${usr_id}`
    } else {
        infrmdid = ``;
    }
    if (dprmnt_id == 0 || dprmnt_id == undefined) {
        dprtmnt = ``;
    } else {
        dprtmnt = `AND t.dprmnt_id = ${dprmnt_id}`
    }

    if ((spr_admn_in == 1 || spr_admn_in == 0) && (req_entry_id == undefined || req_entry_id == '' || req_entry_id == 'null')) {
        req_id = ``
    } else {
        req_id = `WHERE ts.req_entry_id = ${req_entry_id} and ts.a_in = 1 AND ts.infrmd_to = 0`
    }

    if ((spr_admn_in == 1 || spr_admn_in == 0) && (req_entry_id == undefined || req_entry_id == '' || req_entry_id == 'null')) {
        infrm_req_entry = ``
    } else {
        infrm_req_entry = `WHERE ts.req_entry_id = ${req_entry_id} and ts.a_in = 1 `
    }

    if (assigned == undefined || assigned == '' || assigned == 'null') {
        asgn = ``;
    } else {
        if (assigned == 1) {
            asgn = `AND tsg.status_id = 1 AND  req_entry_dt >= date_sub(now(),interval 1 month)`;
        } else if (assigned == 2) {
            asgn = `AND tsg.status_id = 1 AND  req_entry_dt >= date_sub(now(),interval 2 month)`;
        } else if (assigned == 3) {
            asgn = `AND tsg.status_id = 1 AND  req_entry_dt >= date_sub(now(),interval 3 month)`;
        } else if (assigned == 4) {
            asgn = `AND tsg.status_id = 1 AND  req_entry_dt >= date_sub(now(),interval 4 month)`;
        } else if (assigned == 5) {
            asgn = `AND tsg.status_id = 1 AND  req_entry_dt >= date_sub(now(),interval 5 month)`;
        } else if (assigned == 6) {
            asgn = `AND tsg.status_id = 1 AND  req_entry_dt >= date_sub(now(),interval 6 month)`;
        }

        ctgty_id = ``;
        sub_ctgty_id = ``;
        sts_id = ``;
        reqEntryId = ``;
        date = ``;
        usrid = ``;
        opnd = ``;
        req_nm = ``;
        dprtmnt = ``;
    }

    if (opened == undefined || opened == '' || opened == 'null') {
        opnd = ``;
    } else {
        if (opened == 1) {
            asgn = `AND tsg.status_id = 2 AND  req_entry_dt >= date_sub(now(),interval 1 month)`;
        } else if (opened == 2) {
            asgn = `AND tsg.status_id = 2 AND  req_entry_dt >= date_sub(now(),interval 2 month)`;
        } else if (opened == 3) {
            asgn = `AND tsg.status_id = 2 AND  req_entry_dt >= date_sub(now(),interval 3 month)`;
        } else if (opened == 4) {
            asgn = `AND tsg.status_id = 2 AND  req_entry_dt >= date_sub(now(),interval 4 month)`;
        } else if (opened == 5) {
            asgn = `AND tsg.status_id = 2 AND  req_entry_dt >= date_sub(now(),interval 5 month)`;
        } else if (opened == 6) {
            asgn = `AND tsg.status_id = 2 AND  req_entry_dt >= date_sub(now(),interval 6 month)`;
        }
        ctgty_id = ``;
        sub_ctgty_id = ``;
        sts_id = ``;
        reqEntryId = ``;
        date = ``;
        usrid = ``;
        req_nm = ``;
        asgn = ``;
        dprtmnt = ``;
    }

    if (flte_txt == undefined || flte_txt == '' || flte_txt == 'null') {
        req_nm = ``;
    } else if (flte_txt != null) {
        if (isNaN(flte_txt)) {
            req_nm = `AND req_usr_nm like '%${flte_txt}%'`
        } else {
            req_nm = `AND req_usr_mbl like '%${flte_txt}%'`
        }
        ctgty_id = ``;
        sub_ctgty_id = ``;
        sts_id = ``;
        reqEntryId = ``;
        date = ``;
        usrid = ``;
        asgn = ``;
        opnd = ``;
        dprtmnt = ``;
    }

    // AND (tsg.status_id = 1)
    if (app_in == 1 && (spr_admn_in == 0 || spr_admn_in == 1) && stus_id == 1) {

        app_usrid = `and tsg.status_id = 1 and tsg.asgnd_usr_id <> 0 ${reqEntryId}`
    } else if (app_in == 1 && (spr_admn_in == 0 || spr_admn_in == 1) && stus_id == 2) {

        app_usrid = `and tsg.status_id = 2  and tsg.frwd_usr_id <> 0 ${reqEntryId}`
    } else if (app_in == 1 && (spr_admn_in == 0 || spr_admn_in == 1) && stus_id == 3) {

        app_usrid = `and tsg.status_id = 3 ${reqEntryId}`
    } else {
        app_usrid = ``;
    }


    if (spr_admn_in == 1) {
        usrid = ``
    } else {
        usrid = `c1.usrs_id = ${usr_id}`
    }

    var QRY_TO_EXEC1 = `select a.* from
    (select case when tsg.asgnd_usr_id=0&& tsg.frwd_usr_id !=0 then tsg.frwd_usr_id when tsg.asgnd_usr_id!=0&& tsg.frwd_usr_id =0 then tsg.asgnd_usr_id else 0 end as user_id,
             t.*,c.cat_nm,s.sub_cat_nm,DATE_FORMAT(t.req_entry_dt, '%d-%m-%Y') as dt,td.dprmnt_nm
        ,tsg.frwd_usr_id,tsg.status_id as sts_id,u3.frst_nm as frwd_usr_nm,u.mrcht_usr_nm as asgnd_usr_nm
    ,CASE WHEN t.status_id = 0 THEN 'Not Assigned' WHEN t.status_id = 1 THEN 'open' WHEN t.status_id = 2  THEN 'forwarded' WHEN t.status_id = 3 THEN 'completed' END as status_nm
    from tkt_req_enrty_dtl_t as t
    join tkt_stg_dtl_t as tsg on tsg.req_entry_id = t.req_entry_id
    JOIN tkt_cat_lst_t c ON c.cat_id = t.cat_id
    JOIN tkt_sub_cat_lst_t s ON s.sub_cat_id = t.sub_cat_id
    LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = t.asgnd_usr_id
    LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = tsg.asgnd_usr_id
    LEFT JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = tsg.usr_id
    LEFT JOIN mrcht_usr_lst_t u3 ON u3.mrcht_usr_id = tsg.status_id
    LEFT JOIN mrcht_dprts_lst_t td ON dprt_id = t.dprmnt_id
    LEFT JOIN tkt_sts_lst_t tsl ON tsl.status_id = tsg.status_id
    where tsg.status_id = ${asngd_to_me}) as a
    JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = a.user_id and spr_admn_in = ${spr_admn_in}
    where a.user_id = ${usr_id} ${date}
    ORDER BY a.req_entry_id DESC`;

    //  WHERE  ${usrid} ${date} ${reqEntryId} ${ctgty_id} ${sub_ctgty_id} ${sts_id} ${asgn} ${opnd} ${req_nm} ${dprtmnt} ${infrmdid} ${app_usrid}

    var QRY_TO_EXEC2 = `select a.*,b.* from ( SELECT ts.stg_id,t.req_entry_id,t.req_qr_cd,ts.usr_id,
        u.mrcht_usr_nm as asgnd_by_usr,ts.status_id
           ,CASE WHEN ts.asgnd_usr_id = 0 THEN ts.frwd_usr_id WHEN ts.frwd_usr_id = 0 THEN ts.asgnd_usr_id END as asgnd_usr_id
       ,CASE WHEN ts.asgnd_usr_id = 0 THEN u2.mrcht_usr_nm WHEN ts.frwd_usr_id = 0 THEN u1.mrcht_usr_nm END as asgnd_to_usr,tc.cmnt_tx,tc.cmnt_id
       ,DATE_FORMAT(ts.i_ts,'%Y-%m-%d %H:%i') as asgnd_dt,DATE_FORMAT(ts.i_ts,'%Y-%m-%d %H:%i') as frwd_dt
       FROM tkt_req_enrty_dtl_t t
       JOIN tkt_stg_dtl_t ts on ts.req_entry_id = t.req_entry_id
       JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.usr_id
       LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.asgnd_usr_id
       LEFT JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = ts.frwd_usr_id
         LEFT JOIN tkt_cmnt_dtl_t tc ON tc.req_entry_id = t.req_entry_id 
         ${req_id} and ts.status_id <> 3) a
            JOIN ( SELECT tc.cmnt_id,tc.cmnt_tx,ts.stg_id,ts.req_entry_id,u.mrcht_usr_nm as chat_usr,DATE_FORMAT(tc.i_ts,'%Y-%m-%d %H:%i') as cmntdt
                         FROM tkt_req_enrty_dtl_t t
                         JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id
                         LEFT JOIN tkt_cmnt_dtl_t tc on tc.stg_id = ts.stg_id
                         LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = tc.usr_id
                         ${req_id}
                        GROUP BY t.req_entry_id,ts.stg_id,tc.cmnt_id
                        ORDER BY t.req_entry_id,ts.stg_id,tc.cmnt_id ) as b ON b.stg_id = a.stg_id AND a.req_entry_id = b.req_entry_id
                     
                    ORDER BY a.stg_id`

    var QRY_TO_EXEC3 = `SELECT t.*, ts.status_id, DATE_FORMAT(ta.i_ts, '%d-%m-%Y %H:%i') as dt,ts.stg_id,ts.frwd_usr_id,
    u.mrcht_usr_nm as frwd_usr_nm,ta.atchmnt_id,u.mrcht_usr_nm as asgnd_usr_nm,ta.atchmnt_url_tx,ta.atchmnt_url_nm,ta.atchmnt_lbl_nm
     FROM tkt_req_enrty_dtl_t t
     LEFT JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id     
     LEFT JOIN tkt_atchmnt_dtl_t ta ON ta.req_entry_id = t.req_entry_id
     LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ta.usr_id
     WHERE  ta.atchmnt_url_tx is NOT NULL AND ta.a_in = 1  ${reqEntryId}
     GROUP BY t.req_entry_id,ta.atchmnt_id
     ORDER BY t.req_entry_id,ta.atchmnt_id `;

    var QRY_TO_EXEC4 = `select c1.*,u.mrcht_usr_nm from
            (select a.usrs_id,
            sum(case WHEN a.sts = 1  AND a.asgnd_ind = 1 THEN 1 ELSE 0 END) as opened,
            sum(case WHEN a.sts = 2 AND a.frwd_ind = 1 THEN 1 ELSE 0 END) as Forward,
            sum(case WHEN a.sts = 3 THEN 1 ELSE 0 END) as closed,
            (sum(case WHEN a.sts = 1 AND a.asgnd_ind = 1 THEN 1 ELSE 0 END)+sum(case WHEN a.sts = 2 AND a.frwd_ind = 1 THEN 1 ELSE 0 END)+sum(case WHEN a.sts = 3 THEN 1 ELSE 0 END)) as all_req
            from
            (select stg_id,t.*,ts.status_id as sts,ts.asgnd_usr_id as asgn_usr,ts.frwd_usr_id,ts.asgnd_ind,ts.frwd_ind,
            case when ts.asgnd_usr_id=0&& frwd_usr_id !=0 then frwd_usr_id when ts.asgnd_usr_id!=0&& frwd_usr_id =0 then ts.asgnd_usr_id else 0 end as usrs_id
            from tkt_stg_dtl_t as ts
            join tkt_req_enrty_dtl_t as t on t.req_entry_id=ts.req_entry_id
            where t.req_entry_dt between '${frm_dt}' and '${to_dt}'
            -- and cat_id=2 and sub_cat_id=1 and dprmnt_id=2 and ts.status_id=1
            -- group by ts.req_entry_id,ts.stg_id
            order by ts.req_entry_id,ts.stg_id
            ) as a
            group by a.usrs_id) as c1
            JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id =c1.usrs_id
            where ${usrid}`

    var REQ_CRTD_USR = `SELECT t.req_qr_cd,t.usr_id as req_crtd_usr_id,u.mrcht_usr_nm as req_crtd_usr_nm,DATE_FORMAT(t.i_ts,'%d-%m-%Y %H:%i') as req_crtd_dt
            ,CASE WHEN t.status_id = 3 THEN DATE_FORMAT(ts.i_ts, '%d-%m-%Y %H:%i') END as req_clsd_dt,t.req_txt
            ,CASE WHEN (t.status_id = 1 or t.status_id = 2) THEN 'Open' WHEN t.status_id = 3 THEN 'Closed' END as req_sts,
            CASE WHEN  ts.status_id = 3  AND ts.asgnd_ind = 0 AND ts.frwd_ind = 0 THEN u1.mrcht_usr_nm END as req_clsd_usr_nm,u2.mrcht_usr_nm as req_crnt_usr_hav
            ,CASE WHEN ts.asgnd_ind = 0 AND ts.frwd_ind = 0 AND infrmd_to <> 0 THEN informusr.mrcht_usr_nm ELSE 0 END infrmd_to_usr
            FROM tkt_req_enrty_dtl_t t
            JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
            JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = t.usr_id
            JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.usr_id
            JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = t.asgnd_usr_id
            LEFT JOIN mrcht_usr_lst_t informusr ON informusr.mrcht_usr_id = ts.infrmd_to
            ${infrm_req_entry}
            GROUP BY t.req_entry_id`

    if (req_entry_id == 'undefined' || req_entry_id == '' || req_entry_id == 'null') {
        var QRY_TO_EXEC = QRY_TO_EXEC1 + ';' + QRY_TO_EXEC4;
    } else {
        var QRY_TO_EXEC = QRY_TO_EXEC2 + ';' + QRY_TO_EXEC3 + ';' + REQ_CRTD_USR
    }


    // var QRY_TO_EXEC = QRY_TO_EXEC1 + ';' + QRY_TO_EXEC2 + ';' + QRY_TO_EXEC3 + ';' + QRY_TO_EXEC4
    console.log("::::::::pendingtimelineListMdl Entry list :::::::::::::::::");
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            // console.log(QRY_TO_EXEC);
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : checkListMdl
* Arguments      : callback function
***************************************************************************************/
exports.checkListMdl = function (status, callback) {

    var QRY_TO_EXEC = `SELECT t.*, ts.status_id, DATE_FORMAT(ts.isue_dt, '%d-%m-%Y') as isue_dt, ts.frwd_usr_id
        FROM tkt_req_enrty_dtl_t t
        JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
        WHERE status_id = ${ status}
        ORDER BY req_entry_id`;

    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            console.log(QRY_TO_EXEC);
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};


/**************************************************************************************
* Function       : stageDetailsMdl
* Arguments      : callback function
***************************************************************************************/
exports.stageDetailsMdl = function (req_data, callback) {

    var QRY_TO_EXEC = `SELECT * FROM stg_dtl_t WHERE a_in = 1`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : forwardChckLstMdl
* Arguments      : callback function
***************************************************************************************/
exports.forwardChckLstMdl = function (frwd_data, asgnd_usr, lg_usr, infrmd_to, infrmd_in, callback) {
    console.log(":::::::::::frwd_data:::::::::::");
    console.log(frwd_data);
    console.log(infrmd_in);
    var issue_dt = dateFormat(frwd_data.req_entry_dt, 'yyyy-mm-dd');

    if (asgnd_usr == 'undefined') {
        var asgn_usr = '';
    } else {
        var asgn_usr = asgnd_usr
    }

    if (!frwd_data.frwd_usr_id || frwd_data.frwd_usr_id == 'undefined' || frwd_data.frwd_usr_id == 0) {
        var frwd_usr = 0;
    } else {
        var frwd_usr = frwd_data.frwd_usr_id
    }

    if (!frwd_data.status_id || frwd_data.status_id == 'undefined' || frwd_data.status_id == 0) {
        var status_id = 1;
    } else {
        var status_id = frwd_data.status_id
    }
    if (infrmd_to == 0) {
        var infrmd = ``
    } else {
        var infrmd = `${infrmd_to}`;
    }
    console.log("assign ind:::::" + frwd_data.asgnd_ind)
    if (frwd_data.asgnd_ind == 1) {
        var assignind = frwd_data.asgnd_ind;
    } else {
        var assignind = 1;
    }
    console.log("forward ind:::::" + frwd_data.frwd_in)
    if (frwd_data.frwd_in == 1) {
        var frwdin = frwd_data.frwd_in;
    } else {
        var frwdin = 0;
    }

    if (asgnd_usr == 0) {
        frwdData = frwd_data.frwd_usr_id;
    } else {
        frwdData = asgnd_usr;
    }
    var QRY_TO_EXEC = `INSERT INTO tkt_stg_dtl_t(req_entry_id, isue_dt, status_id, asgnd_ind,asgnd_usr_id, frwd_usr_id,usr_id,infrmd_to,frwd_ind,a_in, i_ts) VALUES(${frwd_data.req_entry_id},'${issue_dt}', '${status_id}', '${assignind}','${asgn_usr}', '0', '${lg_usr}' ,'${infrmd}',0,1, CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);

    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            if (infrmd_in == 1) {
                connection.release();  // Release connection back to Pool
                callback(false, rows);  // Send the results back 
            } else {
                if (rows) {
                    var QRY_TO_EXEC_UDT = `UPDATE tkt_req_enrty_dtl_t set asgnd_usr_id = ${frwdData}, status_id = ${frwd_data.status_id} WHERE req_entry_id = ${frwd_data.req_entry_id}`;
                    console.log(QRY_TO_EXEC_UDT)
                    connection.query(QRY_TO_EXEC_UDT, function (err, udtrows) {
                        if (udtrows) {
                            if (frwdin == 1) {
                                var UDT_STG_DATA = `UPDATE tkt_stg_dtl_t set asgnd_ind = 0,asgnd_usr_id = 0, frwd_ind = 1, frwd_usr_id = ${lg_usr} WHERE req_entry_id = ${frwd_data.req_entry_id} AND stg_id = ${frwd_data.stg_id}`;
                                console.log(UDT_STG_DATA)
                                connection.query(UDT_STG_DATA, function (err, udtrows) {
                                    connection.release();  // Release connection back to Pool
                                    if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                                    callback(false, udtrows);  // Send the results back  
                                })
                            } else {
                                connection.release();  // Release connection back to Pool
                                if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                                callback(false, udtrows);  // Send the results back
                            }
                        }

                    })
                }
            }

        });
    });
};

/**************************************************************************************
* Function       : closeRequestMdl
* Arguments      : callback function
***************************************************************************************/
exports.closeRequestMdl = function (clseReq, callback) {
    console.log(clseReq)
    var req_date = dateFormat(clseReq.dt, "yyyy-mm-dd"); // Returns '02-8-16'
    var QRY_TO_EXEC = `INSERT INTO tkt_stg_dtl_t(req_entry_id, isue_dt, status_id, asgnd_ind,asgnd_usr_id, frwd_usr_id,frwd_ind,usr_id,a_in, i_ts) VALUES(${clseReq.req_entry_id},'${req_date}',3, 0, 0,0,0, ${clseReq.usr_id} ,1, CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);

    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error  
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            if (rows) {
                // var SLCT_QRY_T0_EXEC = `SELECT max(status_id) as status FROM tkt_stg_dtl_t WHERE req_entry_id = ${clseReq.req_entry_id}
                // HAVING status = 3`
                // connection.query(SLCT_QRY_T0_EXEC, function (err, slctdrows) {
                //     if (rows && rows.length > 0) {
                //         connection.release();  // Release connection back to Pool
                //         if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                //         callback(false, 1);  // Send the results back  
                //     } else {
                var UDT_ENTRY = `UPDATE tkt_req_enrty_dtl_t set asgnd_usr_id = ${clseReq.usr_id}, status_id = 3 WHERE req_entry_id = ${clseReq.req_entry_id}`;

                var UDT_STG_DATA = `UPDATE tkt_stg_dtl_t set asgnd_ind = 0,asgnd_usr_id = 0, frwd_ind = 0, 0 WHERE req_entry_id = ${clseReq.req_entry_id} AND stg_id = ${clseReq.stg_id}`;

                var QRY_TO_EXEC_UDT = UDT_ENTRY + ';' + UDT_STG_DATA;
                connection.query(QRY_TO_EXEC_UDT, function (err, udtrows) {
                    connection.release();  // Release connection back to Pool
                    if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                    callback(false, 2);  // Send the results back  
                })
                // }
                // })
            }
        });
    });

};

/**************************************************************************************
* Function       : stgWseChatLst
* Arguments      : callback function
***************************************************************************************/
exports.stgWseChatLst = function (chat_data, callback) {
    console.log(chat_data);
    var QRY_TO_EXEC = `INSERT INTO tkt_cmnt_dtl_t(req_entry_id, stg_id, usr_id, cmnt_tx, a_in, i_ts) VALUES(${chat_data.req_entry_id}, ${chat_data.stg_id}, '${chat_data.usr_id}', '${chat_data.msg}', 1, CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            if (rows) {
                var QRY_TO_EXEC = `SELECT * FROM tkt_cmnt_dtl_t WHERE req_entry_id = ${chat_data.req_entry_id} and stg_id = ${chat_data.stg_id} ORDER BY i_ts`
                console.log("comments")
                console.log(QRY_TO_EXEC)
                connection.query(QRY_TO_EXEC, function (err, chatrows) {
                    connection.release();  // Release connection back to Pool
                    if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                    callback(false, chatrows);  // Send the results back    
                })
            }

        });
    });
};

/**************************************************************************************
* Function       : stgatchmntLstMdl
* Arguments      : callback function
***************************************************************************************/
exports.stgatchmntLstMdl = function (atchmnt_data, callback) {
    console.log(atchmnt_data);
    attachmentUtils.uploadToS3([atchmnt_data.img_bse_txt], 'wetrackon/image_upload', 'tkt_', (err, attChres) => {
        console.log(attChres);
        var QRY_TO_EXEC = `INSERT INTO tkt_atchmnt_dtl_t(stg_id, usr_id, atchmnt_url_tx, a_in, i_ts) VALUES(${atchmnt_data.stg_id}, '${atchmnt_data.usr_id}', '${atchmnt_data.msg}', 1, CURRENT_TIMESTAMP())`;
        console.log(QRY_TO_EXEC);
        // sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        //     if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        //     // Execute the query
        //     connection.query(QRY_TO_EXEC, function (err, rows) {
        //         connection.release();  // Release connection back to Pool
        //         if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
        //         callback(false, rows);  // Send the results back       
        //     });
        // });
    });
};

/**************************************************************************************
* Function       : usersLstMdl
* Arguments      : callback function
***************************************************************************************/
exports.usersLstMdl = function (callback) {
    var QRY_TO_EXEC = `SELECT mrcht_usr_id as usr_id, fst_nm as usr_nm, mbl_nu FROM mrcht_usr_lst_t WHERE a_in = 1  ORDER BY mrcht_usr_id limit 100`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};


/**************************************************************************************
* Function       : DepartmentLstMdl
* Arguments      : callback function
***************************************************************************************/
exports.DepartmentLstMdl = function (callback) {
    var QRY_TO_EXEC = `SELECT dprt_id as dprmnt_id,dprt_nm as dprmnt_nm from mrcht_dprts_lst_t WHERE a_in = 1`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};


/**************************************************************************************
* Function       : reqAttachments
* Arguments      : callback function
***************************************************************************************/
exports.reqAttachments = function (atchmnt_data, entry_id, stg_id, img_nm, upldBy, lbl_name, callback) {
    console.log(img_nm, upldBy, lbl_name)
    var values = '';
    for (i = 0; i < atchmnt_data.length; i++) {
        values += (values == '') ? `(${entry_id}, '${stg_id}', '${upldBy}', '${atchmnt_data[i].Location}', '${img_nm}','${lbl_name}', NULL, NULL,1, CURRENT_TIMESTAMP())` : `,(${entry_id}, '${stg_id}', '${upldBy}', '${atchmnt_data[i].Location}', '${img_nm}','${lbl_name}', NULL, NULL, 1, CURRENT_TIMESTAMP())`;
    }
    var QRY_TO_EXEC = `INSERT INTO rtms.tkt_atchmnt_dtl_t (req_entry_id, stg_id, usr_id, atchmnt_url_tx,atchmnt_url_nm,atchmnt_lbl_nm, lat, lng, a_in, i_ts) VALUES ${values}`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : reqAttachmentsMdl
* Arguments      : callback function
***************************************************************************************/
exports.reqAttachmentsMdl = function (atchmnt_data, entry_id, stg_id, usr_id, callback) {
    // console.log(atchmnt_data.length);
    console.log(entry_id, stg_id);
    // console.log(img_nm);
    var values = '';
    for (i = 0; i < atchmnt_data.length; i++) {
        values += (values == '') ? `(${entry_id}, 0, ${usr_id}, '${atchmnt_data[i].Location}',  NULL, NULL,1, CURRENT_TIMESTAMP())` : `,(${entry_id}, 0, '1', '${atchmnt_data[i].Location}',  NULL, NULL, 1, CURRENT_TIMESTAMP())`;
    }
    var QRY_TO_EXEC = `INSERT INTO rtms.tkt_atchmnt_dtl_t (req_entry_id, stg_id, usr_id, atchmnt_url_tx, lat, lng, a_in, i_ts) VALUES ${values}`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : qrCdLstMdl
* Arguments      : callback function
***************************************************************************************/
exports.qrCdLstMdl = function (qr_cd, callback) {
    console.log(qr_cd)
    var QRY_TO_EXEC = `SELECT t.*,tsl.status_nm FROM tkt_req_enrty_dtl_t t
    JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id
    LEFT JOIN tkt_sts_lst_t tsl ON tsl.status_id = ts.status_id WHERE t.a_in = 1 and t.req_qr_cd = '${qr_cd}' ORDER BY req_entry_id`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : statusLstMdl
* Arguments      : callback function
***************************************************************************************/
exports.statusLstMdl = function (callback) {
    var QRY_TO_EXEC = `SELECT * FROM tkt_sts_lst_t WHERE a_in = 1 ORDER BY status_id`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : clsdTktsMdl
* Arguments      : callback function
***************************************************************************************/
exports.clsdTktsMdl = function (usr_id, callback) {
    var QRY_TO_EXEC = `SELECT t.*,ts.status_id,DATE_FORMAT(ts.isue_dt,'%d-%m-%Y') as dt,ts.frwd_usr_id,tsl.status_nm
    FROM tkt_req_enrty_dtl_t t
    JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
    JOIN tkt_sts_lst_t tsl ON tsl.status_id = ts.status_id
    WHERE ts.status_id = 3 AND t.usr_id =  ${usr_id}
    GROUP BY t.req_entry_id
    ORDER BY req_entry_id`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : reqStgDtlsMdl
* Arguments      : callback function
***************************************************************************************/
exports.reqStgDtlsMdl = function (usr_id, req_id, callback) {
    var QRY_TO_EXEC1 = `SELECT t.*,c.cat_nm,s.sub_cat_nm,u.mrcht_usr_nm,DATE_FORMAT(t.req_entry_dt, '%d-%m-%Y') as dt
    FROM tkt_req_enrty_dtl_t t
    JOIN tkt_cat_lst_t c ON c.cat_id = t.cat_id
    JOIN tkt_sub_cat_lst_t s ON s.sub_cat_id = t.sub_cat_id
    JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = t.usr_id
     WHERE t.req_entry_id = ${req_id} AND t.usr_id = ${usr_id}`;
    var QRY_TO_EXEC2 = `select a.*,b.* FROM ( SELECT t.*,  DATE_FORMAT(ts.isue_dt, '%d-%m-%Y') as dt,ts.stg_id,ts.frwd_usr_id, 
    u.mrcht_usr_nm as frwd_usr_nm,ta.atchmnt_id,u1.usr_nm as asgnd_usr_nm,lgu.mrcht_usr_nm as lgd_usr_nm,ta.atchmnt_url_tx
     FROM tkt_req_enrty_dtl_t t
     JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
     LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.frwd_usr_id
     LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.asgnd_usr_id
             JOIN mrcht_usr_lst_t lgu ON lgu.mrcht_usr_id = t.usr_id
     LEFT JOIN tkt_atchmnt_dtl_t ta ON ta.stg_id = ts.stg_id
     WHERE t.req_entry_id = ${req_id} AND t.usr_id = ${usr_id}
     GROUP BY t.req_entry_id,ts.stg_id,ta.atchmnt_id
     ORDER BY t.req_entry_id,ts.stg_id,ta.atchmnt_id ) a 
     JOIN( SELECT t.*,  DATE_FORMAT(ts.isue_dt, '%d-%m-%Y') as dt, ts.frwd_usr_id, ts.stg_id, tc.cmnt_tx
     ,DATE_FORMAT(tc.i_ts, '%d-%m-%Y %H:%i:%s') as cmntdt, tc.cmnt_id, tc.usr_id as user_id
      ,u.mrcht_usr_nm as frwd_usr_nm,u1.usr_nm as asgnd_usr_nm,lgu.mrcht_usr_nm as chat_usr
      FROM tkt_req_enrty_dtl_t t
      JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
      LEFT JOIN tkt_cmnt_dtl_t tc on tc.stg_id = ts.stg_id
      LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.frwd_usr_id
      LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.asgnd_usr_id
     JOIN mrcht_usr_lst_t lgu ON lgu.mrcht_usr_id = t.usr_id
     WHERE t.req_entry_id =${req_id} AND t.usr_id = ${usr_id}
     GROUP BY t.req_entry_id,ts.stg_id,tc.cmnt_id
     ORDER BY t.req_entry_id,ts.stg_id,tc.cmnt_id ) as b ON b.stg_id = a.stg_id AND a.req_entry_id = b.req_entry_id
            GROUP BY a.req_entry_id,a.stg_id,a.atchmnt_id,b.cmnt_id`;
    var QRY_TO_EXEC3 = `SELECT t.*,ts.stg_id,ts.status_id
            FROM tkt_req_enrty_dtl_t t
            LEFT JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
            JOIN tkt_sts_lst_t tsl ON tsl.status_id = ts.status_id
            WHERE t.usr_id = ${usr_id}
            GROUP BY t.req_entry_dt`;
    var QRY_TO_EXEC4 = `SELECT t.*, ts.status_id, DATE_FORMAT(ts.isue_dt, '%d-%m-%Y') as dt,ts.stg_id,ts.frwd_usr_id,
            u.mrcht_usr_nm as frwd_usr_nm,ta.atchmnt_id,u1.mrcht_usr_nm as asgnd_usr_nm,lgu.mrcht_usr_nm as lgd_usr_nm,ta.atchmnt_url_tx
             FROM tkt_req_enrty_dtl_t t
             JOIN tkt_stg_dtl_t ts ON t.req_entry_id = ts.req_entry_id
             LEFT JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.frwd_usr_id
             LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = ts.asgnd_usr_id
             JOIN mrcht_usr_lst_t lgu ON lgu.mrcht_usr_id = t.usr_id
             JOIN tkt_atchmnt_dtl_t ta ON ta.stg_id = ts.stg_id
             WHERE t.usr_id = ${usr_id} and t.req_entry_id =${req_id} AND ta.a_in = 1
             GROUP BY t.req_entry_id,ta.atchmnt_id
             ORDER BY t.req_entry_id,ta.atchmnt_id `
    var QRY_TO_EXEC = QRY_TO_EXEC1 + ';' + QRY_TO_EXEC2 + ';' + QRY_TO_EXEC3 + ';' + QRY_TO_EXEC4;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};


/**************************************************************************************
* Function     : updtusrMdl
* Arguments      : callback function
***************************************************************************************/

exports.updtusrMdl = function (req_data, callback) {
    console.log(req_data);
    var req_date = dateFormat(req_data.Date, "yyyy-mm-dd"); // Returns '02-8-16'
    if (req_data.asgnd_usr_id == 'undefined' || !req_data.asgnd_usr_id) {
        var asgnd_usr_id = ''
    } else {
        var asgnd_usr_id = req_data.asgnd_usr_id;
    }
    console.log(req_data.cat_id)
    console.log(req_data.sub_cat_id)
    var MAX_REQ_ID = `SELECT COUNT(req_entry_dt) as cnt from tkt_req_enrty_dtl_t WHERE DATE(req_entry_dt) = CURDATE();`;
    console.log(MAX_REQ_ID)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "MAX_REQ_ID :: " + MAX_REQ_ID); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(MAX_REQ_ID, function (err, rows) {
            if (rows) {
                var QRY_TO_EXEC = `INSERT INTO tkt_req_enrty_dtl_t (req_txt,req_entry_dt,req_qr_cd,asgnd_usr_id,req_usr_nm,req_usr_mbl,req_usr_adrs,city,shrt_desc,cat_id,sub_cat_id,usr_id,a_in,i_ts) VALUES ('${req_data.req_txt}', '${req_date}',CONCAT('RJY-', replace(CURDATE(), '-', ''),'-${rows[0].cnt + 1}'),'${asgnd_usr_id}','${req_data.req_usr_nm}','${req_data.req_usr_mbl}','${req_data.req_usr_adrs}','${req_data.city}','${req_data.shrt_desc}','${req_data.cat_id}','${req_data.subcat_id}',1000010,1,CURRENT_TIMESTAMP())`;
                console.log(QRY_TO_EXEC);
                sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
                    if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   
                    // Execute the query
                    connection.query(QRY_TO_EXEC, function (err, rows) {
                        connection.release();  // Release connection back to Pool
                        if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                        callback(false, rows);  // Send the results back       
                    });
                });
            } else {
                connection.release();  // Release connection back to Pool
                if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                callback(false, rows);  // Send the results back    
            }
        });
    });
};


/**************************************************************************************
* Function     : pdfOverviewLstMdl
* Arguments      : callback function
***************************************************************************************/

exports.pdfOverviewLstMdl = function (entry_id, callback) {
    console.log(entry_id)
    var QRY_TO_EXEC = `SELECT red.*,d.dprt_nm,c.cat_nm,s.sub_cat_nm,DATE_FORMAT(red.req_entry_dt,'%d-%m-%Y') as date
    from tkt_req_enrty_dtl_t red
    join mrcht_dprts_lst_t d on d.dprt_id = red.dprmnt_id
    join tkt_cat_lst_t c on c.cat_id = red.cat_id
    join tkt_sub_cat_lst_t s on s.sub_cat_id = red.sub_cat_id
    WHERE red.req_entry_id = ${entry_id}`;
    console.log(QRY_TO_EXEC)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back    
        });
    });
};

/**************************************************************************************
* Function       : archiveRequestMdl
* Arguments      : callback function
***************************************************************************************/

exports.archiveRequestMdl = function (arcData, callback) {

    var QRY_TO_EXEC = `UPDATE tkt_atchmnt_dtl_t SET a_in = 0 WHERE req_entry_id = ${arcData.req_entry_id} AND atchmnt_id = ${arcData.atchmnt_id}`
    console.log(QRY_TO_EXEC)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back    
        });
    });
};
/**************************************************************************************
* Function       : archiveRequestMdl
* Arguments      : callback function
***************************************************************************************/

exports.unarchiveRequestMdl = function (arcData, callback) {

    var QRY_TO_EXEC = `UPDATE tkt_atchmnt_dtl_t SET a_in = 1 WHERE req_entry_id = ${arcData.req_entry_id} AND atchmnt_id = ${arcData.atchmnt_id}`
    console.log(QRY_TO_EXEC)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back    
        });
    });
};
/**********************************************************otpmodal******************************************************** */
exports.otpRequestMdl = function (arcData, callback) {

    var QRY_TO_EXEC = `SELECT u.*,uct.clnt_id,uct.tnt_id from mrcht_usr_lst_t u
    JOIN usr_clnt_tnt_rel_t uct ON u.mrcht_usr_id = uct.usr_id
    where mbl_nu = '${arcData[0].mbno}'`
    console.log(QRY_TO_EXEC)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back    
        });
    });
};
/**********************************************************otpmodal******************************************************** */
exports.updateOtp = function (arcData, callback) {

    var QRY_TO_EXEC = `update  mrcht_usr_lst_t set otp='${arcData[0].otp}'  where mbl_nu='${arcData[0].mbno}'`
    console.log(QRY_TO_EXEC)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back    
        });
    });
};
/**************************************************************************************
* Function       : updateRequestInfoMdl
* Arguments      : callback function
***************************************************************************************/

exports.updateRequestInfoMdl = function (udtData, req_entry_id, callback) {

    var QRY_TO_EXEC = `UPDATE tkt_req_enrty_dtl_t SET req_usr_nm = '${udtData.req_usr_nm}',req_usr_mbl= '${udtData.req_usr_mbl}',req_usr_adrs= '${udtData.req_usr_adrs}',req_txt= '${udtData.req_txt}',city= '${udtData.city}',dprmnt_id= '${udtData.dprmnt_id}',cat_id= '${udtData.cat_id}',sub_cat_id= '${udtData.sub_cat_id}',shrt_desc= '${udtData.shrt_desc}',pn_cd = '${udtData.pincode}' WHERE req_entry_id = ${req_entry_id}`
    console.log(QRY_TO_EXEC)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back    
        });
    });
};
/**************************************************************************************
* Function       : reqEntryListPubMdl
* Arguments      : callback function
***************************************************************************************/
exports.reqEntryListPubMdl = function (data, callback) {
    console.log(data);
    var searchData;
    if (data.trackby == 'Filenumber') {
        searchData = `red.req_qr_cd = '${data.inpt}' `
    } else if (data.trackby == 'Filename') {
        searchData = `red.req_usr_nm  = '${data.inpt}' `
    } else if (data.trackby == 'Filephone') {
        searchData = `red.req_usr_mbl = '${data.inpt}' `
    }
   
    var QRY_TO_EXEC = `select red.req_entry_id,red.req_qr_cd,red.req_usr_nm,red.req_txt,d.dprmnt_id,red.status_id,red.i_ts,d.dprmnt_nm,c.cat_id,c.cat_nm,s.sub_cat_id,s.sub_cat_nm from tkt_req_enrty_dtl_t red
    join tkt_cat_lst_t c on c.cat_id=red.cat_id
    join tkt_sub_cat_lst_t s on s.sub_cat_id=red.sub_cat_id
    join mrcht_dprts_lst_t d on d.dprmnt_id = red.dprmnt_id where ${searchData} `;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};
/**************************************************************************************
* Function       : tktStgLstMdl
* Arguments      : callback function
***************************************************************************************/

exports.tktStgLstMdl = function (req_entry_id, callback) {
    var QRY_TO_EXEC_SLCT = `SELECT * FROM tkt_req_enrty_dtl_t WHERE req_entry_id = ${req_entry_id}`
    console.log(QRY_TO_EXEC_SLCT)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC_SLCT :: " + QRY_TO_EXEC_SLCT); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC_SLCT, function (err, rows) {
            console.log(rows)
            if (rows && rows.length > 0) {
                var req_date = dateFormat(rows[0].req_entry_dt, "yyyy-mm-dd"); // Returns '02-8-16'
                var QRY_TO_EXEC = `INSERT INTO tkt_stg_dtl_t(req_entry_id, isue_dt, status_id, asgnd_usr_id, asgnd_ind,frwd_usr_id,usr_id,a_in, i_ts) VALUES(${rows[0].req_entry_id},'${req_date}', 1, '${rows[0].asgnd_usr_id}',1, '0', ${rows[0].usr_id} ,1, CURRENT_TIMESTAMP())`;
                connection.query(QRY_TO_EXEC, function (err, rows) {
                    connection.release();  // Release connection back to Pool
                    if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
                    callback(false, rows);  // Send the results back  
                })
            }
        });
    });
};

/**************************************************************************************
* Function       : analysRequestMdl
* Arguments      : callback function
***************************************************************************************/

exports.analysRequestMdl = function (data, callback) {
    console.log("::::::::::::analysis report:::::::::::::")
    console.log(data);
    var usrid;
    var asngdtome;
    if (data.usr_id == 'undefined' || data.usr_id == '' || data.usr_id == 'null') {
        usrid = ``
    } else if (data.spr_admn_in == 0) {
        usrid = `AND ((ts.asgnd_usr_id =  ${data.usr_id} && ts.asgnd_ind=1)  or (ts.frwd_usr_id = ${data.usr_id} && ts.frwd_ind=1) 
        or (ts.asgnd_ind = 0 && ts.frwd_ind = 0 && ts.status_id = 3 && ts.usr_id = ${data.usr_id}))`
    } else if (data.spr_admn_in == 1) {
        usrid = ``;
    }

    if (data.frm_dt == undefined && data.to_dt == 'undefined') {
        date = ``
    } else if (data.spr_admn_in == 0) {
        date = `AND DATE(ts.i_ts) BETWEEN '${data.frm_dt}' and '${data.to_dt}' `
    } else if (data.spr_admn_in == 1) {
        date = ``
    }

    if (data.cat_id == undefined || data.cat_id == 'null' || data.cat_id == '' || data.cat_id == 0) {
        ctgty_id = ``;
    } else {
        ctgty_id = `and t.cat_id = ${data.cat_id}`
    }

    if (data.sub_cat_id == 'null' || data.sub_cat_id == '' || data.sub_cat_id == undefined || data.sub_cat_id == 0) {
        sub_ctgty_id = ``;
    } else {
        sub_ctgty_id = `AND t.sub_cat_id = ${data.sub_cat_id}`;
    }

    if (data.dprmnt_id == 0 || data.dprmnt_id == undefined || data.dprmnt_id == 0) {
        dprtmnt = ``;
    } else {
        dprtmnt = `AND t.dprmnt_id = ${data.dprmnt_id}`
    }

    if (data.spr_admn_in == 1) {
        fltr_data = `AND (a.sts_id = 1 && a.frwd_ind <> 0 `
    } else if (data.spr_admn_in == 0) {
        fltr_data = `AND (a.sts_id = 1 && a.frwd_ind <> 0`
    }

    if (data.spr_admn_in == 1) {
        asngdtome = ``
    } else if (data.spr_admn_in == 0) {
        if (data.asngd_to_me == 0) {
            asngdtome = ``
        } else if (data.asngd_to_me == 1) {
            asngdtome = `AND a.asgnd_ind = 1 AND a.frwd_ind = 0 AND a.asgnd_usr_id = ${data.usr_id}`;
        } else if (data.asngd_to_me == 2) {
            asngdtome = `AND a.frwd_ind = 1 AND a.asgnd_ind = 0 AND a.frwd_usr_id = ${data.usr_id}`;
        } else if (data.asngd_to_me == 3) {
            asngdtome = `AND a.asgnd_ind = 0 AND a.frwd_ind = 0 AND a.status_id = 3 AND a.usr_id = ${data.usr_id}`;
        }
    }

    if (data.spr_admn_in == 0 && (data.infrmd_id == '' || data.infrmd_id == null || data.infrmd_id == 0)) {
        infrmdid = ``;
    } else {
        if (data.infrmd_id == 1) {
            infrmdid = `AND ts.infrmd_to = ${data.usr_id}`
        } else if (data.infrmd_id == 2) {
            infrmdid = `AND (ts.infrmd_to is not null || ts.infrmd_to <> 0) and ts.usr_id = ${data.usr_id}`
        }

        ctgty_id = ``;
        sub_ctgty_id = ``;
        sts_id = ``;
        reqEntryId = ``;
        date = ``;
        usrid = ``;
        opnd = ``;
        req_nm = ``;
        dprtmnt = ``;
        asngdtome = ``;
        asgn = ``;
    }

    if (data.spr_admn_in == 1) {
        var QRY_TO_EXEC_SLCT = `SELECT 
        sum(CASE WHEN datediff(current_date,date(ts.i_ts)) BETWEEN 0 AND 5 AND (ts.asgnd_ind = 1 && ts.frwd_ind = 0) THEN 1 else 0 END) as one_to_five
        ,sum(CASE WHEN datediff(current_date,date(ts.i_ts)) BETWEEN 6 AND 15 AND (ts.asgnd_ind = 1 && ts.frwd_ind = 0) THEN 1 else 0 END) as six_to_fiftn
        ,sum(CASE WHEN datediff(current_date,date(ts.i_ts)) BETWEEN 16 AND 45 AND (ts.asgnd_ind = 1 && ts.frwd_ind = 0) THEN 1 else 0 END) as sxtn_to_frtfv
        ,sum(CASE WHEN datediff(current_date,date(ts.i_ts)) BETWEEN 46 AND 90 AND (ts.asgnd_ind = 1 && ts.frwd_ind = 0) THEN 1 else 0 END) as frtsx_to_nty
        ,sum(CASE WHEN datediff(current_date,date(ts.i_ts)) > 90 AND (ts.asgnd_ind = 1 && ts.frwd_ind = 0) THEN 1 else 0 END) as abve_nty 
        FROM tkt_req_enrty_dtl_t t 
            JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id ${ctgty_id} ${sub_ctgty_id} ${dprtmnt}`
    } else {
        var QRY_TO_EXEC_SLCT = `SELECT req_entry_dt,req_qr_cd,u.mrcht_usr_nm,u.mrcht_usr_id
        --  a.one_to_five,a.six_to_fiftn,a.sxtn_to_frtfv,a.frtsx_to_nty,a.abve_nty
            ,sum(CASE WHEN datediff(current_date,date(a.i_ts)) BETWEEN 0 AND 5 AND (a.asgnd_ind = 1 && a.frwd_ind = 0) THEN 1 else 0 END) as one_to_five
            ,sum(CASE WHEN datediff(current_date,date(a.i_ts)) BETWEEN 6 AND 15 AND (a.asgnd_ind = 1 && a.frwd_ind = 0) THEN 1 else 0 END) as six_to_fiftn
            ,sum(CASE WHEN datediff(current_date,date(a.i_ts)) BETWEEN 16 AND 45 AND (a.asgnd_ind = 1 && a.frwd_ind = 0) THEN 1 else 0 END) as sxtn_to_frtfv
            ,sum(CASE WHEN datediff(current_date,date(a.i_ts)) BETWEEN 46 AND 90 AND (a.asgnd_ind = 1 && a.frwd_ind = 0) THEN 1 else 0 END) as frtsx_to_nty
            ,sum(CASE WHEN datediff(current_date,date(a.i_ts)) > 90 AND (a.asgnd_ind = 1 && a.frwd_ind = 0) THEN 1 else 0 END) as abve_nty
            FROM
            ( SELECT ts.*
           
            ,case when ts.asgnd_ind = 1 && ts.frwd_ind = 0 then ts.asgnd_usr_id
            when ts.frwd_ind = 1 && ts.asgnd_ind = 0 then ts.frwd_usr_id
            WHEN ts.asgnd_ind = 0 && ts.frwd_ind = 0 && ts.status_id = 3 THEN ts.usr_id END as usrs_id
            FROM tkt_stg_dtl_t ts
      WHERE ts.a_in = 1 ${usrid} ${date}  ${infrmdid}) as a
      JOIN ( SELECT MAX(ts.stg_id) as stg_id FROM tkt_stg_dtl_t as ts WHERE ts.a_in = 1 ${usrid} ${date} ${infrmdid} GROUP BY ts.req_entry_id)  as b ON a.stg_id = b.stg_id
      JOIN tkt_req_enrty_dtl_t t ON t.req_entry_id = a.req_entry_id
      JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = a.usrs_id ${ctgty_id} ${sub_ctgty_id} ${dprtmnt} `;
    }



    console.log(QRY_TO_EXEC_SLCT)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC_SLCT :: " + QRY_TO_EXEC_SLCT); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC_SLCT, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back  
        });
    });
};

/**************************************************************************************
* Function       : archiveRequestLstMdl
* Arguments      : callback function
***************************************************************************************/

exports.archiveRequestLstMdl = function (req_entry_id, ind, callback) {
    if (ind == 0) {
        all_ain_rcrds = `AND (ta.a_in = 1 or ta.a_in = 0)`
    } else if (ind == 1) {
        all_ain_rcrds = `AND ta.a_in = 1`;
    }
    var QRY_TO_EXEC_SLCT = `SELECT ta.*,u.mrcht_usr_nm,u.mrcht_usr_nm as asgnd_usr_nm,DATE_FORMAT(t.i_ts,'%d-%m-%Y %H:%i') as date,t.req_qr_cd,ta.i_ts as dt
    FROM tkt_req_enrty_dtl_t  t
    JOIN tkt_atchmnt_dtl_t ta ON ta.req_entry_id = t.req_entry_id
    JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ta.usr_id WHERE ta.req_entry_id = ${req_entry_id} ${all_ain_rcrds}`
    console.log(QRY_TO_EXEC_SLCT)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC_SLCT :: " + QRY_TO_EXEC_SLCT); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC_SLCT, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back  
        });
    });
};

/**************************************************************************************
* Function       : ofcrWseRqstmntrMdl
* Arguments      : callback function
***************************************************************************************/

exports.ofcrWseRqstmntrMdl = function (ofcrRqst, usr_id, callback) {
    console.log(ofcrRqst, usr_id)
    var ofcrLst;
    var usrid;

    if (usr_id == 0) {
        usrid = ``
    } else {
        usrid = `AND t.asgnd_usr_id = ${usr_id}`;
    }

    if (ofcrRqst == "one_to_five") {
        ofcrLst = `datediff(current_date,date(t.req_entry_dt)) BETWEEN 0 AND 5`
    } else if (ofcrRqst == "six_to_fiftn") {
        ofcrLst = `datediff(current_date,date(t.req_entry_dt)) BETWEEN 6 AND 15`
    } else if (ofcrRqst == "sxtn_to_frtfv") {
        ofcrLst = `datediff(current_date,date(t.req_entry_dt)) BETWEEN 16 AND 45`
    } else if (ofcrRqst == "frtsx_to_nty") {
        ofcrLst = `datediff(current_date,date(t.req_entry_dt)) BETWEEN 46 AND 90`
    } else if (ofcrRqst == "abve_nty") {
        ofcrLst = `datediff(current_date,date(t.req_entry_dt)) > 90`
    } else if (ofcrRqst == "completed") {
        ofcrLst = `t.status_id = 3`
    } else {
        ofcrLst = ``
    }
    var QRY_TO_EXEC_SLCT = `SELECT t.*,DATE_FORMAT(t.req_entry_dt,'%d-%m-%Y') as date,td.dprmnt_nm,tc.cat_nm,t.status_id,u.mrcht_usr_id
    FROM tkt_req_enrty_dtl_t t 
    JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id
    JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.usr_id
    JOIN tkt_cat_lst_t tc ON tc.cat_id = t.cat_id
	JOIN mrcht_dprts_lst_t td ON dprt_id = t.dprmnt_id
    WHERE ${ofcrLst} ${usrid} 
    group by t.req_entry_id
    ORDER BY t.req_entry_id`;
    console.log("::::::::::::::officer wise dash board request list form::::::::::::::::::::")
    console.log(QRY_TO_EXEC_SLCT)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC_SLCT :: " + QRY_TO_EXEC_SLCT); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC_SLCT, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back  
        });
    });
};

/**************************************************************************************
* Function       : dprtWseRqstmntrMdl
* Arguments      : callback function
***************************************************************************************/

exports.dprtWseRqstmntrMdl = function (ofcrRqst, dprtmnt_id, callback) {
    console.log(ofcrRqst, dprtmnt_id)
    var ofcrLst;
    var dprtmntid;

    if (dprtmnt_id == 0) {
        dprtmntid = ``;
    } else {
        dprtmntid = `AND dprt_id = ${dprtmnt_id}`;
    }

    if (ofcrRqst == "one_to_five") {
        ofcrLst = `datediff(current_date,date(req_entry_dt)) BETWEEN 0 AND 5 and (t.status_id=1 || t.status_id=2)`
    } else if (ofcrRqst == "six_to_fiftn") {
        ofcrLst = `datediff(current_date,date(req_entry_dt)) BETWEEN 6 AND 15 and (t.status_id=1 || t.status_id=2)`
    } else if (ofcrRqst == "sxtn_to_frtfv") {
        ofcrLst = `datediff(current_date,date(req_entry_dt)) BETWEEN 16 AND 45 and (t.status_id=1 || t.status_id=2)`
    } else if (ofcrRqst == "frtsx_to_nty") {
        ofcrLst = `datediff(current_date,date(req_entry_dt)) BETWEEN 46 AND 90 and (t.status_id=1 || t.status_id=2)`
    } else if (ofcrRqst == "abve_nty") {
        ofcrLst = `datediff(current_date,date(req_entry_dt)) > 90 and (t.status_id=1 || t.status_id=2)`
    } else if (ofcrRqst == "completed") {
        ofcrLst = `ts.status_id = 3`
    }
    var QRY_TO_EXEC_SLCT = `SELECT t.*,DATE_FORMAT(t.req_entry_dt,'%d-%m-%Y') as date,td.dprmnt_nm,tc.cat_nm
    FROM tkt_req_enrty_dtl_t t 
    JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id
    JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.usr_id
    JOIN tkt_cat_lst_t tc ON tc.cat_id - t.cat_id
	JOIN mrcht_dprts_lst_t td ON dprt_id = t.dprmnt_id
    WHERE  ${ofcrLst} ${dprtmntid}
    GROUP BY t.req_entry_id
    ORDER BY t.req_entry_id`
    console.log(QRY_TO_EXEC_SLCT)
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC_SLCT :: " + QRY_TO_EXEC_SLCT); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC_SLCT, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back  
        });
    });
};
/**************************************************************************************
* Function       : departmentreportMdl
* Arguments      : callback function
***************************************************************************************/
exports.departmentreportMdl = function (data, callback) {
    console.log(data);
    var date;
    if (data.ind == 1) {
        date = `WHERE DATE(t.req_entry_dt) BETWEEN '${data.frm_dt}' and '${data.to_dt}'`;
    } else {
        date = ``
    }
    if (data.lstasg == undefined || data.lstasg == '' || data.lstasg == 'null') {
        asgn = ``;
    } else {
        if (data.lstasg == 1) {
            asgn = `AND t.status_id in (1,2,3) AND  req_entry_dt >= date_sub(now(),interval 1 month)`;
        } else if (data.lstasg == 2) {
            asgn = `AND t.status_id in (1,2,3) AND  req_entry_dt >= date_sub(now(),interval 2 month)`;
        } else if (data.lstasg == 3) {
            asgn = `AND t.status_id in (1,2,3) AND  req_entry_dt >= date_sub(now(),interval 3 month)`;
        } else if (data.lstasg == 4) {
            asgn = `AND t.status_id in (1,2,3) AND  req_entry_dt >= date_sub(now(),interval 4 month)`;
        } else if (data.lstasg == 5) {
            asgn = `AND t.status_id in (1,2,3) AND  req_entry_dt >= date_sub(now(),interval 5 month)`;
        } else if (data.lstasg == 6) {
            asgn = `AND t.status_id in (1,2,3) AND  req_entry_dt >= date_sub(now(),interval 6 month)`;
        }
    }
    var QRY_TO_EXEC = `SELECT d.dprmnt_nm,t.dprmnt_id
        ,sum(CASE WHEN datediff(current_date,date(req_entry_dt))  BETWEEN 0 AND 5 && status_id in (1,2) THEN 1 else 0 END) as one_to_five
        ,sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 6 AND 15 && status_id in (1,2) THEN 1 else 0 END) as six_to_fiftn
        ,sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 16 AND 45 && status_id in (1,2) THEN 1 else 0 END) as sxtn_to_frtfv
        ,sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 46 AND 90 && status_id in (1,2) THEN 1 else 0 END) as frtsx_to_nty
        ,sum(CASE WHEN datediff(current_date,date(req_entry_dt)) > 90 && status_id in (1,2) THEN 1 else 0 END) as abve_nty,
        (sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 0 AND 5 && status_id in (1,2) THEN 1 else 0 END)+sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN
        6 AND 15 && status_id in (1,2) THEN 1 else 0 END)
        +sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 16 AND 45 && status_id in (1,2) THEN 1 else 0 END)+sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 46 AND 90 && status_id in (1,2) THEN 1 else 0 END)+
        sum(CASE WHEN datediff(current_date,date(req_entry_dt)) > 90 && status_id in (1,2) THEN 1 else 0 END)+sum(case WHEN status_id = 3 THEN 1 ELSE 0 END))as total
        ,sum(case WHEN status_id = 3 THEN 1 ELSE 0 END) as completed
        FROM tkt_req_enrty_dtl_t t
        JOIN mrcht_dprts_lst_t d ON d.dprmnt_id = t.dprmnt_id ${date} ${asgn}
        GROUP BY t.dprmnt_id`;
    // console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        connection.query(QRY_TO_EXEC, function (err, rows) {
            console.log(QRY_TO_EXEC);
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};


/**************************************************************************************
* Function       : userreportMdl
* Arguments      : callback function
***************************************************************************************/
exports.userreportMdl = function (data, callback) {
    console.log("::::::::::::::userreportMdl ovrall dashboard:::::::::::::::::")
    console.log(data);
    var date;
    if (data.ind == 1) {
        date = `WHERE DATE(c.i_ts) BETWEEN '${data.frm_dt}' and '${data.to_dt}'`;
    } else {
        date = ``
    }
    if (data.lstasg == undefined || data.lstasg == '' || data.lstasg == 'null') {
        asgn = ``;
    } else {
        if (data.lstasg == 1) {
            asgn = `AND (b.status_id = 1 or b.status_id =2) AND  i_ts >= date_sub(now(),interval 1 month)`;
        } else if (data.lstasg == 2) {
            asgn = `AND (b.status_id = 1 or b.status_id =2) AND  i_ts >= date_sub(now(),interval 1 month)`;
        } else if (data.lstasg == 3) {
            asgn = `AND (b.status_id = 1 or b.status_id =2) AND  i_ts >= date_sub(now(),interval 1 month)`;
        } else if (data.lstasg == 4) {
            asgn = `AND (b.status_id = 1 or b.status_id =2) AND  i_ts >= date_sub(now(),interval 1 month)`;
        } else if (data.lstasg == 5) {
            asgn = `AND (b.status_id = 1 or b.status_id =2) AND  i_ts >= date_sub(now(),interval 1 month)`;
        } else if (data.lstasg == 6) {
            asgn = `AND (b.status_id = 1 or b.status_id =2) AND  i_ts >= date_sub(now(),interval 1 month)`;
        }
    }
    // case when c.asgnd_usr_id=0&& c.frwd_usr_id !=0 then c.frwd_usr_id when c.asgnd_usr_id!=0&& c.frwd_usr_id =0 then c.asgnd_usr_id else 0 end as usr_id,

    var QRY_TO_EXEC = `select c1.*,u.mrcht_usr_nm from
    (select c.stg_id,user_id,
        
       sum(CASE WHEN datediff(current_date,date(c.i_ts)) BETWEEN 0 AND 5 && status_id in (1,2) THEN 1 else 0 END) as one_to_five
        ,sum(CASE WHEN datediff(current_date,date(c.i_ts)) BETWEEN 6 AND 15 && status_id in (1,2) THEN 1 else 0 END) as six_to_fiftn
        ,sum(CASE WHEN datediff(current_date,date(c.i_ts)) BETWEEN 16 AND 45 && status_id in (1,2) THEN 1 else 0 END) as sxtn_to_frtfv
        ,sum(CASE WHEN datediff(current_date,date(c.i_ts)) BETWEEN 46 AND 90 && status_id in (1,2) THEN 1 else 0 END) as frtsx_to_nty
        ,sum(CASE WHEN datediff(current_date,date(c.i_ts)) > 90 && status_id in (1,2) THEN 1 else 0 END) as abve_nty ,
        (sum(CASE WHEN datediff(current_date,date(c.i_ts)) BETWEEN 0 AND 5 && status_id in (1,2) THEN 1 else 0 END)+sum(CASE WHEN datediff(current_date,date(c.i_ts)) BETWEEN 6 AND 15 && status_id in (1,2) THEN 1 else 0 END)
        +sum(CASE WHEN datediff(current_date,date(c.i_ts)) BETWEEN 16 AND 45 THEN 1 else 0 END)+sum(CASE WHEN datediff(current_date,date(c.i_ts)) BETWEEN 46 AND 90 THEN 1 else 0 END)+
        sum(CASE WHEN datediff(current_date,date(c.i_ts)) > 90 && status_id in (1,2) THEN 1 else 0 END)+sum(case WHEN c.status_id = 3 THEN 1 ELSE 0 END))as total
        ,sum(case WHEN c.status_id = 3 THEN 1 ELSE 0 END) as completed
     from 
    (select b.stg_id,asgnd_usr_id,frwd_usr_id,usr_id,b.i_ts,b.status_id,asgnd_ind,frwd_ind,
        case 
       when asgnd_ind = 0 && frwd_ind = 1 then frwd_usr_id 
       when asgnd_ind = 1 && frwd_ind = 0 then asgnd_usr_id 
       WHEN asgnd_ind = 0 && frwd_ind = 0 AND infrmd_to <> 0 THEN infrmd_to
	 WHEN asgnd_ind = 0 && frwd_ind = 0 AND status_id = 3 THEN usr_id end as user_id
        
        from
    (select Max(stg_id)as stge_id
     from tkt_stg_dtl_t  as ts
    group by req_entry_id) as a
    join tkt_stg_dtl_t as b  on a.stge_id=b.stg_id ${asgn}) as c
    ${date}
    group by user_id) as c1
    JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id =c1.user_id`;

    // var QRY_TO_EXEC = `SELECT req_entry_dt,req_qr_cd,u.mrcht_usr_nm,u.mrcht_usr_id
    // ,sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 1 AND 5 THEN 1 else 0 END) as one_to_five
    // ,sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 6 AND 15 THEN 1 else 0 END) as six_to_fiftn
    // ,sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 16 AND 45 THEN 1 else 0 END) as sxtn_to_frtfv
    // ,sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 46 AND 90 THEN 1 else 0 END) as frtsx_to_nty
    // ,sum(CASE WHEN datediff(current_date,date(req_entry_dt)) > 90 THEN 1 else 0 END) as abve_nty ,
    // (sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 1 AND 5 THEN 1 else 0 END)+sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 6 AND 15 THEN 1 else 0 END)
    // +sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 16 AND 45 THEN 1 else 0 END)+sum(CASE WHEN datediff(current_date,date(req_entry_dt)) BETWEEN 46 AND 90 THEN 1 else 0 END)+
    // sum(CASE WHEN datediff(current_date,date(req_entry_dt)) > 90 THEN 1 else 0 END)+sum(case WHEN ts.status_id = 3 THEN 1 ELSE 0 END))as total
    // ,sum(case WHEN ts.status_id = 3 THEN 1 ELSE 0 END) as completed
    // FROM tkt_req_enrty_dtl_t t 
    // JOIN tkt_stg_dtl_t ts ON ts.req_entry_id = t.req_entry_id
    // JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = ts.usr_id ${date} ${asgn}
    // GROUP BY ts.usr_id;`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        connection.query(QRY_TO_EXEC, function (err, rows) {
            console.log(QRY_TO_EXEC);
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};


/**************************************************************************************
* Function       : usrDshbrdrngMdl
* Arguments      : callback function
***************************************************************************************/
exports.usrDshbrdrngMdl = function (dshbrdData, callback) {
    console.log(dshbrdData)
    var date;
    var usrid;
    var opened;
    if (dshbrdData.frm_dt == undefined && dshbrdData.to_dt == 'undefined') {
        date = ``
    } else if (dshbrdData.spr_admn_in == 0) {
        date = `AND DATE(tsg.isue_dt) BETWEEN '${dshbrdData.frm_dt}' and '${dshbrdData.to_dt}' `
    } else if (dshbrdData.spr_admn_in == 1) {
        date = ``
    }

    if (dshbrdData.usr_id == '' || dshbrdData.usr_id == 'undefined') {
        usrid = ``;
    } else if (dshbrdData.spr_admn_in == 0) {
        usrid = `AND (tsg.asgnd_usr_id = ${dshbrdData.usr_id} or tsg.frwd_usr_id = ${dshbrdData.usr_id})`;
    } else if (dshbrdData.spr_admn_in == 1) {
        usrid = ``;
    }

    if (dshbrdData.dshbrdcnt == 1) {
        opened = `and datediff(current_date,date(t.req_entry_dt)) BETWEEN 0 AND 5 AND (tsg.asgnd_ind = 1)`
    } else if (dshbrdData.dshbrdcnt == 2) {
        opened = `and datediff(current_date,date(t.req_entry_dt)) BETWEEN 6 AND 15 AND (tsg.asgnd_ind = 1)`
    } else if (dshbrdData.dshbrdcnt == 3) {
        opened = `and datediff(current_date,date(t.req_entry_dt)) BETWEEN 16 AND 55 AND (tsg.asgnd_ind = 1)`
    } else if (dshbrdData.dshbrdcnt == 4) {
        opened = `and datediff(current_date,date(t.req_entry_dt)) BETWEEN 66 AND 90 AND (tsg.asgnd_ind = 1)`
    } else if (dshbrdData.dshbrdcnt == 5) {
        opened = `and datediff(current_date,date(t.req_entry_dt)) > 90 AND (tsg.asgnd_ind = 1)`
    }
    if (dshbrdData.cat_id == undefined || dshbrdData.cat_id == 'null' || dshbrdData.cat_id == '' || dshbrdData.cat_id == 0) {
        ctgty_id = ``;
    } else {
        ctgty_id = `AND t.cat_id = ${dshbrdData.cat_id}`
    }

    if (dshbrdData.sub_cat_id == 'null' || dshbrdData.sub_cat_id == '' || dshbrdData.sub_cat_id == undefined || dshbrdData.sub_cat_id == 0) {
        sub_ctgty_id = ``;
    } else {
        sub_ctgty_id = `AND t.sub_cat_id = ${dshbrdData.sub_cat_id}`;
    }

    if (dshbrdData.dprmnt_id == 0 || dshbrdData.dprmnt_id == undefined || dshbrdData.dprmnt_id == 0) {
        dprtmnt = ``;
    } else {
        dprtmnt = `AND t.dprmnt_id = ${dshbrdData.dprmnt_id}`
    }

    var QRY_TO_EXEC = `SELECT t.*,c.cat_nm,s.sub_cat_nm,DATE_FORMAT(t.req_entry_dt, '%d-%m-%Y') as dt,td.dprmnt_nm,dprt_id
    ,tsg.asgnd_usr_id,tsg.frwd_usr_id,tsg.status_id as sts_id,u3.frst_nm as frwd_usr_nm,u3.frst_nm as asgnd_usr_nm
    ,CASE WHEN t.status_id = 0 THEN 'Not Assigned' WHEN (t.status_id = 1 or t.status_id = 2) THEN 'open' WHEN t.status_id = 3 THEN 'completed' END as status_nm,tsg.stg_id

    FROM tkt_req_enrty_dtl_t t
    LEFT JOIN tkt_stg_dtl_t tsg ON tsg.req_entry_id = t.req_entry_id
    JOIN tkt_cat_lst_t c ON c.cat_id = t.cat_id
    JOIN tkt_sub_cat_lst_t s ON s.sub_cat_id = t.sub_cat_id
    JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = t.usr_id
    LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = tsg.asgnd_usr_id 
    LEFT JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = tsg.usr_id
    LEFT JOIN mrcht_usr_lst_t u3 ON u3.mrcht_usr_id = t.asgnd_usr_id
	LEFT JOIN mrcht_dprts_lst_t td ON dprt_id = t.dprmnt_id
	LEFT JOIN tkt_sts_lst_t tsl ON tsl.status_id = tsg.status_id
     WHERE t.a_in = 1 ${date} ${usrid} ${opened} ${ctgty_id} ${sub_ctgty_id} ${dprtmnt}
     GROUP BY tsg.req_entry_id
     ORDER BY t.req_entry_id DESC`;
    console.log(":::::::::::::Dash Board QRY_TO_EXEC:::::::::::");
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : usrDshbrdListMdl
* Arguments      : callback function
***************************************************************************************/
exports.usrDshbrdListMdl = function (dshbrdData, callback) {
    console.log(dshbrdData);
    var date;
    var usrid;
    var opened;
    var asngdtome;

    if (dshbrdData.frm_dt == undefined && dshbrdData.to_dt == 'undefined') {
        date = ``
    } else {
        date = `AND DATE(tsg.isue_dt) BETWEEN '${dshbrdData.frm_dt}' and '${dshbrdData.to_dt}' `
    }

    if (dshbrdData.usr_id == '' || dshbrdData.usr_id == 'undefined') {
        usrid = ``;
    } else if (dshbrdData.spr_admn_in == 0) {
        if (dshbrdData.crntOpn == 1) {
            // opened = `and tsg.status_id = 1 AND tsg.frwd_usr_id = 0 AND tsg.asgnd_usr_id <> 0 `
            opened = `and (tsg.asgnd_usr_id = ${dshbrdData.usr_id}) and (tsg.asgnd_ind = 1 && tsg.frwd_ind = 0)`
        } else if (dshbrdData.crntOpn == 2) {
            opened = `and tsg.frwd_usr_id = ${dshbrdData.usr_id} and (tsg.asgnd_ind = 0 && tsg.frwd_ind = 1)`
        } else if (dshbrdData.crntOpn == 3) {
            opened = `and (tsg.usr_id = ${dshbrdData.usr_id})  and (tsg.asgnd_ind = 0 && tsg.frwd_ind = 1 &&tsg.status_id = 3)`
        } else {
            opened = `and ((tsg.asgnd_ind = 1 and tsg.asgnd_usr_id = ${dshbrdData.usr_id}) or (tsg.usr_id =${dshbrdData.usr_id} and tsg.status_id = 3 and tsg.asgnd_ind=0 and tsg.frwd_ind=0))`
            // opened = ``
        }
        // usrid = `AND tsg.usr_id = ${dshbrdData.usr_id}`;
    } else if (dshbrdData.spr_admn_in == 1) {
        usrid = ``;
        date = ``;
        if (dshbrdData.crntOpn == 1) {
            // opened = `and tsg.status_id = 1 AND tsg.frwd_usr_id = 0 AND tsg.asgnd_usr_id <> 0 `
            opened = `and (tsg.status_id = 1)`
        } else if (dshbrdData.crntOpn == 2) {
            opened = `and tsg.frwd_ind  = 1`
        } else if (dshbrdData.crntOpn == 3) {
            opened = `and tsg.status_id = 3`
        } else {
            opened = `AND (tsg.frwd_ind = 0 or tsg.frwd_ind  = 1) and (tsg.status_id = 1 or tsg.status_id = 3)`
            // opened = ``
        }
    }

    if (dshbrdData.usr_id == '' || dshbrdData.usr_id == null) {
        usrid = ``
    } else {
        usrid = `and tsg.asgnd_usr_id = ${dshbrdData.usr_id} or tsg.frwd_usr_id = ${dshbrdData.usr_id}`
    }
    if (dshbrdData.cat_id == undefined || dshbrdData.cat_id == 'null' || dshbrdData.cat_id == '' || dshbrdData.cat_id == 0) {
        ctgty_id = ``;
    } else {
        ctgty_id = `AND t.cat_id = ${dshbrdData.cat_id}`
    }

    if (dshbrdData.sub_cat_id == 'null' || dshbrdData.sub_cat_id == '' || dshbrdData.sub_cat_id == undefined || dshbrdData.sub_cat_id == 0) {
        sub_ctgty_id = ``;
    } else {
        sub_ctgty_id = `AND t.sub_cat_id = ${dshbrdData.sub_cat_id}`;
    }

    if (dshbrdData.dprmnt_id == 0 || dshbrdData.dprmnt_id == undefined || dshbrdData.dprmnt_id == 0) {
        dprtmnt = ``;
    } else {
        dprtmnt = `AND t.dprmnt_id = ${dshbrdData.dprmnt_id}`
    }

    if (dshbrdData.spr_admn_in == 1) {
        asngdtome = ``
    } else if (dshbrdData.spr_admn_in == 0) {
        if (dshbrdData.asngd_to_me == 0) {
            asngdtome = ``
        } else if (dshbrdData.asngd_to_me == 1) {
            asngdtome = `AND tsg.asgnd_ind = 1 AND tsg.frwd_ind = 0 AND tsg.asgnd_usr_id = ${dshbrdData.usr_id}`;
        } else if (dshbrdData.asngd_to_me == 2) {
            asngdtome = `AND tsg.frwd_ind = 1 AND tsg.asgnd_ind = 0 AND tsg.frwd_usr_id = ${dshbrdData.usr_id}`;
        } else if (dshbrdData.asngd_to_me == 3) {
            asngdtome = `AND tsg.asgnd_ind = 0 AND tsg.frwd_ind = 0 AND tsg.status_id = 3 AND tsg.usr_id = ${dshbrdData.usr_id}`;
        }        
    }

    var QRY_TO_EXEC = `SELECT t.*,c.cat_nm,s.sub_cat_nm,DATE_FORMAT(t.req_entry_dt, '%d-%m-%Y') as dt,td.dprmnt_nm
    ,tsg.frwd_usr_id,tsg.status_id ,tsl.status_nm,u3.frst_nm as frwd_usr_nm,
    u1.mrcht_usr_nm as asgnd_usr_nm
                ,CASE WHEN t.status_id = 0 THEN 'Not Assigned' WHEN t.status_id = 1 THEN 'open' WHEN t.status_id = 2 THEN 'open' WHEN t.status_id = 3 THEN 'completed' END as status_nm,tsg.stg_id
    FROM tkt_req_enrty_dtl_t t
    LEFT JOIN tkt_stg_dtl_t tsg ON tsg.req_entry_id = t.req_entry_id
    JOIN tkt_cat_lst_t c ON c.cat_id = t.cat_id
    JOIN tkt_sub_cat_lst_t s ON s.sub_cat_id = t.sub_cat_id
    JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = t.usr_id
    LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = t.asgnd_usr_id
    LEFT JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = tsg.usr_id
    LEFT JOIN mrcht_usr_lst_t u3 ON u3.mrcht_usr_id = tsg.frwd_usr_id
        LEFT JOIN mrcht_dprts_lst_t td ON dprt_id = t.dprmnt_id
        LEFT JOIN tkt_sts_lst_t tsl ON tsl.status_id = tsg.status_id
     WHERE t.a_in = 1 ${date} ${opened} ${ctgty_id} ${sub_ctgty_id} ${dprtmnt} 
     GROUP BY t.req_entry_id
     ORDER BY t.req_entry_id DESC`;
    console.log(":::::::::::::User Dash Board QRY_TO_EXEC:::::::::::");
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};



/**************************************************************************************
* Function       : overallDshbrdListMdl
* Arguments      : callback function
***************************************************************************************/
exports.overallDshbrdListMdl = function (dshbrdData, callback) {
    var date;
    var opened;
    console.log(dshbrdData);

    if (dshbrdData.ind == 1) {
        date = `AND DATE(tsg.isue_dt) BETWEEN '${dshbrdData.frm_dt}' and '${dshbrdData.to_dt}'`;
    } else {
        date = ``
    }
    if (dshbrdData.lstasg == undefined || dshbrdData.lstasg == '' || dshbrdData.lstasg == 'null') {
        asgn = ``;
    } else {
        if (dshbrdData.lstasg == 1) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 1 month)`;
        } else if (dshbrdData.lstasg == 2) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 2 month)`;
        } else if (dshbrdData.lstasg == 3) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 3 month)`;
        } else if (dshbrdData.lstasg == 4) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 4 month)`;
        } else if (dshbrdData.lstasg == 5) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 5 month)`;
        } else if (dshbrdData.lstasg == 6) {
            asgn = `AND  req_entry_dt >= date_sub(now(),interval 6 month)`;
        }
    }

    // if (dshbrdData.frm_dt == undefined && dshbrdData.to_dt == 'undefined') {
    //     date = ``
    // } else {
    //     date = `AND DATE(tsg.isue_dt) BETWEEN '${dshbrdData.frm_dt}' and '${dshbrdData.to_dt}' `
    // }

    // if (dshbrdData.usr_id == '') {
    //     usrid = ``;
    // } else {
    //     usrid = `AND tsg.usr_id = ${dshbrdData.usr_id}`;
    // }

    if (dshbrdData.crntOpn == 1) {
        opened = `and t.status_id = 1 OR t.status_id = 2 GROUP BY tsg.req_entry_id`
    } else if (dshbrdData.crntOpn == 2) {
        opened = `and tsg.status_id = 2 `
    } else if (dshbrdData.crntOpn == 3) {
        opened = `and tsg.status_id = 3 `
    } else {
        opened = `and t.status_id = 1 OR t.status_id = 2 or tsg.status_id = 3 group by t.req_entry_id`
    }
    var QRY_TO_EXEC = `SELECT t.*,c.cat_nm,s.sub_cat_nm,DATE_FORMAT(t.req_entry_dt, '%d-%m-%Y') as dt,td.dprmnt_nm
    ,tsg.frwd_usr_id,tsg.status_id as sts_id,tsl.status_nm,u3.frst_nm as frwd_usr_nm,
                CASE WHEN tsg.frwd_ind = 1 THEN u3.frst_nm WHEN tsg.status_id = 3 THEN u2.mrcht_usr_nm ELSE u1.mrcht_usr_nm END as asgnd_usr_nm
    FROM tkt_req_enrty_dtl_t t
    LEFT JOIN tkt_stg_dtl_t tsg ON tsg.req_entry_id = t.req_entry_id
    JOIN tkt_cat_lst_t c ON c.cat_id = t.cat_id
    JOIN tkt_sub_cat_lst_t s ON s.sub_cat_id = t.sub_cat_id
    JOIN mrcht_usr_lst_t u ON u.mrcht_usr_id = t.usr_id
    LEFT JOIN mrcht_usr_lst_t u1 ON u1.mrcht_usr_id = tsg.asgnd_usr_id  
    LEFT JOIN mrcht_usr_lst_t u2 ON u2.mrcht_usr_id = tsg.usr_id
    LEFT JOIN mrcht_usr_lst_t u3 ON u3.mrcht_usr_id = tsg.frwd_usr_id
        LEFT JOIN mrcht_dprts_lst_t td ON dprt_id = t.dprmnt_id
        LEFT JOIN tkt_sts_lst_t tsl ON tsl.status_id = tsg.status_id
     WHERE t.a_in = 1 ${date} ${opened} ${asgn}
     ORDER BY t.req_entry_id DESC`;
    console.log(":::::::::::::over all Dash Board QRY_TO_EXEC:::::::::::");
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error   

        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : searchfile
* Arguments      : callback function
***************************************************************************************/
exports.searchfilenumberMdl = function (file_nu, callback) {
    var QRY_TO_EXEC = `select red.req_entry_id,red.req_qr_cd,red.req_usr_nm,red.req_txt,d.dprmnt_id,red.status_id,red.i_ts,d.dprmnt_nm,c.cat_id,c.cat_nm,s.sub_cat_id,s.sub_cat_nm from tkt_req_enrty_dtl_t red
    join tkt_cat_lst_t c on c.cat_id=red.cat_id
    join tkt_sub_cat_lst_t s on s.sub_cat_id=red.sub_cat_id
    join mrcht_dprts_lst_t d on d.dprmnt_id = red.dprmnt_id where red.req_qr_cd= '${file_nu}'`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error           
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};
/****************************************************fcmmodel************************************************************** */
exports.fcmRequestMdl = function (data, callback) {

    var QRY_TO_EXEC = `UPDATE mrcht_usr_lst_t set fcm_tkn='${data.fcmtk}' where usr_id= ${data.usrid}`
    console.log(QRY_TO_EXEC, 'qureyfcm')
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};


/****************************************************fcmmodel************************************************************** */
exports.sendPushNotificationMdl = function (data, callback) {
    var serverKey = 'AAAASYCTxbM:APA91bGSUiYOwcuzyInzeezcdL3KHKy_PHPphdDhOUh_U-YOuTmIZg9BqpXyUmkb48GQJmj4rv3vx2hRTFjJIGK0uBqXuOo3HwpkkcmboeyNhJAtkofdIKz3aqp_7RB6d3mH_6nju3Ix';
    var fcm = new FCM(serverKey);
    var QRY_TO_EXEC = `select fcm_tkn from mrcht_usr_lst_t  where mrcht_usr_id= ${data.usr_id}`
    console.log(QRY_TO_EXEC, 'qureyfcm')
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            let fcm_token = rows[0].fcm_tkn
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: fcm_token
                // collapse_key: 'your_collapse_key',
                ,
                notification: {
                    title: 'Ticket Recieved',
                    body: data.message
                },

                data: {  //you can send only notification or only data(or include both)
                    my_key: 'my value',
                    my_another_key: 'my another value'
                }
            };
            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!");
                    console.log(err)
                    callback(true, err); return;
                } else {
                    console.log("Successfully sent with response: ", response);
                    connection.release();  // Release connection back to Pool
                    callback(false, []);
                }
            });
        });
    });
}

/**************************************************************************************
* Function       : menuProfileLstMdl
* Arguments      : callback function
***************************************************************************************/
exports.menuProfileLstMdl = function (clnt_id, tnt_id, usr_id, callback) {
    var QRY_TO_EXEC = `select dsble_in,a.app_nm,mi.app_id,mi.mnu_itm_id,mi.mnu_itm_nm,mi.mnu_itm_icn_tx, mi.mnu_itm_url_tx,mpi.prnt_mnu_itm_id,pmi.mnu_itm_nm as prnt_mnu_itm_nm
    ,pmi.mnu_itm_icn_tx as prnt_mnu_icn_tx,mpi.c_in, mpi.r_in, mpi.u_in, mpi.d_in, mi.hdr_in, mpi.sqnce_id
        from mnu_prfle_lst_t mp
        join mnu_prfle_itm_rel_t mpi on mp.mnu_prfle_id=mpi.mnu_prfle_id and mpi.a_in =1
        join mnu_itm_lst_t mi on mpi.mnu_itm_id=mi.mnu_itm_id
        join usr_mnu_prfle_rel_t um on um.mnu_prfle_id = mp.mnu_prfle_id
        left join mnu_itm_lst_t pmi on mpi.prnt_mnu_itm_id=pmi.mnu_itm_id
        left join app_lst_t a on a.app_id=mi.app_id and um.app_id=mp.app_id
         where um.usr_id=${usr_id}  and um.clnt_id = ${clnt_id} and um.tnt_id = ${tnt_id} and mi.a_in =1 and mi.cmpnt_id=2 order by mpi.sqnce_id;`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error     
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};

/**************************************************************************************
* Function       : infrmdToUsrMdl
* Arguments      : callback function
***************************************************************************************/
exports.infrmdToUsrMdl = function (InfrmData, callback) {
    console.log(InfrmData)
    var issue_dt = dateFormat(InfrmData.dt, 'yyyy-mm-dd');
    var QRY_TO_EXEC = `INSERT INTO tkt_stg_dtl_t(req_entry_id, isue_dt, status_id, asgnd_ind,asgnd_usr_id, frwd_usr_id,usr_id,infrmd_to,frwd_ind,a_in, i_ts) VALUES(${InfrmData.req_entry_id},'${issue_dt}', '${InfrmData.status_id}', '0','0', '0', '${InfrmData.usr_id}' ,'${InfrmData.infrmd_to}',0,1, CURRENT_TIMESTAMP())`;
    console.log(QRY_TO_EXEC);
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; }          // Handle Error     
        connection.query(QRY_TO_EXEC, function (err, rows) {
            connection.release();  // Release connection back to Pool
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            callback(false, rows);  // Send the results back       
        });
    });
};
