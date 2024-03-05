var sqldb = require('../config/dbconnect');
async = require("async");
var log = require('../utils/gen/logmessages');

var mod_name = "SMS_ALERTS_POPULATE"

exports.popSMSAlerts = function (callback) {
  //Departure Delay Alerts
  popDepDelayAlerts(function (err, row) {
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }
  });

  //UnAuthorised Stops Alerts
  popUnAutStopAlerts(function (err, row) {
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }
  });

  //Late Waybill Alerts
  popLateWaybillAlerts(function (err, row) {
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }
  });

  //TripNotStarted Alerts
  popTripNotStartedAlerts(function (err, row) {
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }
  });


}
/**********************************************************************************************
* Function      : call Populate Alerts Functions for every 10 min
* History   
* 12/30/2017    ** Raju Dasari ** Initial Code
***********************************************************************************************/
exports.popSMSAlertstoOperation = function (callback) {

  //Trip initiated but TripNotStarted Alerts
  trip_initiated_not_started(function (err, row) {
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }
  });

  //wrong assignment
  wrongassignment(function (err, row) {
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }
  });

  //closed with issue
  closingwithissue(function (err, row) {
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }
  });

}

/**********************************************************************************************
* Function      : popDepDelayAlerts
* Arguments     : callback function
* History   
* 09/21/2016    ** Raju Dasari  ** Initial Code
***********************************************************************************************/
var popDepDelayAlerts = function (callback) {
  //console.log("populating DepDelay ALerts");
  var QRY_TO_EXEC = "INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts) SELECT 1 as alert_cat_id,t.veh_id,t.trip_run_id,t.depot_id,CONCAT('Depature delay of ',d.depot_nm,' SER No.',t.srv_nu,' Veh No:',t.veh_reg_nu,', Sch Dep-',TIME_FORMAT(t.sch_start_tm,'%H:%i'),' Act Dep-',TIME_FORMAT(t.act_start_tm,'%H:%i'),', ',ROUND(TIME_TO_SEC(TIMEDIFF(CONCAT(t.act_start_dt,' ',t.act_start_tm),CONCAT(t.sch_start_dt,' ',t.sch_start_tm)))/60) ,'Min Delay') as alert_tx,CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as trip_start_ts,CURRENT_TIMESTAMP() FROM trip_run_dtl_t as t JOIN trip_run_stp_dtl_t as ts on ts.trip_run_id=t.trip_run_id and ts.stp_act_dep_dt is not null and ts.stp_seq_id=1  JOIN depot_lst_t as d on d.depot_id=t.depot_id WHERE ROUND(TIME_TO_SEC(TIMEDIFF(CONCAT(t.act_start_dt,' ',t.act_start_tm),CONCAT(t.sch_start_dt,' ',t.sch_start_tm)))/60) > (SELECT alert_threshold_ct FROM alert_cat_lst_t WHERE alert_cat_id=1) and sch_start_dt=CURDATE() and t.vclass_id not in (3) and t.trip_run_id not in (SELECT trip_run_id FROM alert_dtl_t WHERE alert_cat_id=1 and DATE(alert_ts)=CURDATE()) ORDER BY t.trip_run_id;";
  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }          // Handle Error  
    connection.query(QRY_TO_EXEC, function (err, rows) {
      connection.release();
      if (err) { log.message("ERROR", mod_name, 0, "ERR_EXECUTING_QUERY :: " + QRY_TO_EXEC); return; }     // Handle Query Errors                       
      // console.log("Populated "+rows.affectedRows+" Alerts");
      callback(false, rows);
    });
  });
}


/**********************************************************************************************
* Function      : popUnAutStopAlerts
* Arguments     : callback function
* History   
* 09/21/2016    ** Raju Dasari  ** Initial Code
***********************************************************************************************/
var popUnAutStopAlerts = function (callback) {
  //console.log("populating Unauthorized stop ALerts");
  // var QRY_TO_EXEC = "INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts) SELECT 9 as alert_cat_id,t.veh_id,u.trip_run_id,t.depot_id,concat('Unauthorised Stop of ',d.depot_nm,' Ser No.',t.srv_nu, ' VehNo.',t.veh_reg_nu,' , Between ',pb.bstp_nm,' & ',nb.bstp_nm,' From ',TIME_FORMAT(u.start_ts,'%H:%i'),' To ',TIME_FORMAT(u.end_ts,'%H:%i'),' for ',ROUND(TIME_TO_SEC(TIMEDIFF(u.end_ts,u.start_ts))/60),'Mins at http://maps.google.com/maps?q=',u.lat,',',u.lng) as alert_tx, CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as trip_start,CURRENT_TIMESTAMP() FROM unauthorised_stop_dtl_v as u JOIN trip_run_dtl_t as t on t.trip_run_id=u.trip_run_id JOIN depot_lst_t as d on d.depot_id=t.depot_id JOIN bstp_lst_t as pb on pb.bstp_id=u.prv_bstp_id JOIN bstp_lst_t as nb on nb.bstp_id=u.nxt_bstp_id WHERE DATE(u.start_ts) = CURDATE() and (TIME_TO_SEC(TIMEDIFF(u.end_ts,u.start_ts))/60)> (SELECT alert_threshold_ct FROM alert_cat_lst_t WHERE alert_cat_id=9) and u.start_ts > CONCAT(t.sch_start_dt,' ',t.sch_start_tm) and t.vclass_id not in (3) and t.trip_run_id not in (SELECT trip_run_id FROM alert_dtl_t WHERE alert_cat_id=9 and DATE(alert_ts)=CURDATE()) ORDER BY depot_nm;";    

  var QRY_TO_EXEC = `INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts)
                        SELECT 9 as alert_cat_id,t.veh_id,u.trip_run_id,t.depot_id,
                        concat('Unauthorised Stop of ',d.depot_nm,' SER No.',t.srv_nu, ' VEH No.',t.veh_reg_nu,case WHEN (bc.crew_ph is not null AND bc.crew_ph<>'' AND bc.crew_ph<>0 ) then concat(', Driver Ph.',bc.crew_ph) ELSE '' END ,' , Between ',pb.bstp_nm,' and ',nb.bstp_nm,' From ',TIME_FORMAT(u.start_ts,'%H:%i'),' To ',TIME_FORMAT(u.end_ts,'%H:%i'),' for ',ROUND(TIME_TO_SEC(TIMEDIFF(u.end_ts,u.start_ts))/60),'Mins at http://maps.google.com/maps?q%3D',u.lat,',',u.lng) as alert_tx, 
                        CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as trip_start,
                        CURRENT_TIMESTAMP() FROM unauthorised_stop_dtl_v as u JOIN trip_run_dtl_t as t on t.trip_run_id=u.trip_run_id JOIN depot_lst_t as d on d.depot_id=t.depot_id 
                        JOIN bstp_lst_t as pb on pb.bstp_id=u.prv_bstp_id 
                        JOIN bstp_lst_t as nb on nb.bstp_id=u.nxt_bstp_id
                        left outer JOIN buscrew_lst_t as bc on bc.crew_id = t.driver_id
                        WHERE DATE(u.start_ts) = CURDATE() 
                        and (TIME_TO_SEC(TIMEDIFF(u.end_ts,u.start_ts))/60)> (SELECT alert_threshold_ct FROM alert_cat_lst_t WHERE alert_cat_id=9) 
                        and u.start_ts > CONCAT(t.sch_start_dt,' ',t.sch_start_tm) 
                        and t.srv_nu is not null
                        and t.trip_run_id not in (SELECT trip_run_id FROM alert_dtl_t WHERE alert_cat_id=9 and DATE(alert_ts)=CURDATE()) ORDER BY depot_nm`;


  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }          // Handle Error  
    connection.query(QRY_TO_EXEC, function (err, rows) {
      connection.release();
      if (err) { log.message("ERROR", mod_name, 0, "ERR_EXECUTING_QUERY :: " + QRY_TO_EXEC); return; }     // Handle Query Errors                       
      // console.log("Populated "+rows.affectedRows+" Alerts");
      callback(false, rows);
    });
  });
}

/**********************************************************************************************
* Function      : popLateWaybillAlerts
* Arguments     : callback function
* History   
* 09/23/2016    ** Raju Dasari  ** Initial Code
***********************************************************************************************/
var popLateWaybillAlerts = function (callback) {
  //console.log("populating latewaybill ALerts");
  var QRY_TO_EXEC = "INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts) SELECT 19 as alert_cat_id,0 as veh_id,t.trip_run_id,t.depot_id,CONCAT('Waybill not issued for SrvNo.',t.srv_nu,' of ',d.depot_nm,', SchDep-',TIME_FORMAT(t.sch_start_tm,'%H:%i')) as alert_tx,CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as sch_start,CURRENT_TIMESTAMP() FROM trip_run_dtl_t as t JOIN depot_lst_t as d on d.depot_id=t.depot_id left OUTER JOIN oprs_api_assign_dtl_t as os on os.srv_nu=t.srv_nu and os.trip_dt=CURDATE() WHERE  t.srv_nu is not null and t.vclass_id<>3 and CONCAT(t.sch_start_dt,' ',t.sch_start_tm)<CURRENT_TIMESTAMP()-INTERVAL (SELECT alert_threshold_ct FROM alert_cat_lst_t WHERE alert_cat_id=19)  MINUTE and t.sch_start_dt=CURDATE() and cancelled_in<>1 and os.waybill_id is null and t.vclass_id not in (3) and t.trip_run_id not in (SELECT trip_run_id FROM alert_dtl_t WHERE  alert_cat_id=19 and DATE(alert_ts)=CURDATE()) ORDER BY CONCAT(t.sch_start_dt,' ',sch_start_tm) desc";
  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }          // Handle Error  
    connection.query(QRY_TO_EXEC, function (err, rows) {
      connection.release();
      if (err) { log.message("ERROR", mod_name, 0, "ERR_EXECUTING_QUERY :: " + QRY_TO_EXEC); return; }     // Handle Query Errors                       
      // console.log("Populated "+rows.affectedRows+" Alerts");
      callback(false, rows);
    });
  });
}


/**********************************************************************************************
* Function      : popTripNotStartedAlerts
* Arguments     : callback function
* History
* 10/18/2016    ** Raju Dasari  ** Initial Code
***********************************************************************************************/
var popTripNotStartedAlerts = function (callback) {
  //console.log("populating latewaybill ALerts");
  //    var QRY_TO_EXEC = "INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts) SELECT 2 as alert_cat_id,t.veh_id,t.trip_run_id,t.depot_id,CONCAT('Vehicle not departed from ',t.start_stp_nm,' of SER No-',t.srv_nu,', SCH DEP-',TIME_FORMAT(t.sch_start_tm,'%H:%i')) as alert_tx,CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as trip_start_ts,CURRENT_TIMESTAMP() FROM trip_run_dtl_t as t LEFT OUTER JOIN ltrack_dtl_t as l on l.trip_run_id=t.trip_run_id WHERE sch_start_dt=CURDATE() and act_start_tm is NULL and (TIME_TO_SEC(TIMEDIFF(CURRENT_TIMESTAMP(),CONCAT(t.sch_start_dt,' ',t.sch_start_tm)))/60)>(SELECT alert_threshold_ct FROM alert_cat_lst_t WHERE alert_cat_id=2) and t.veh_id is not NULL and t.cancelled_in<>1 and issue_in <> 1 and l.data_received_ts>CURRENT_TIMESTAMP()-INTERVAL 10 MINUTE and t.trip_run_id not in (SELECT trip_run_id FROM alert_dtl_t WHERE alert_cat_id=2 and DATE(alert_ts)=CURDATE()) ORDER BY trip_start_ts desc";

  var QRY_TO_EXEC = "INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts)  SELECT 2 as alert_cat_id,t.veh_id,t.trip_run_id,t.depot_id, CONCAT('Waybill issued but service not departed from ',t.start_stp_nm,CASE WHEN t.srv_nu is null then CONCAT(', DCP SER-',t.srv_cd) ELSE CONCAT(', OPRS SER-',t.srv_nu) END,', SCH DEP-',TIME_FORMAT(t.sch_start_tm,'%H:%i'),', Depot-',d.depot_nm,', VEH No-',t.veh_reg_nu,'.') as alert_tx,CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as trip_start_ts,CURRENT_TIMESTAMP()  FROM trip_run_dtl_t as t LEFT OUTER JOIN ltrack_dtl_t as l on l.trip_run_id=t.trip_run_id  JOIN depot_lst_t as d on d.depot_id=t.depot_id WHERE sch_start_dt=CURDATE()  and act_start_tm is NULL  and trp_start_in<>1 and (TIME_TO_SEC(TIMEDIFF(CURRENT_TIMESTAMP(),CONCAT(t.sch_start_dt,' ',t.sch_start_tm)))/60)>(SELECT alert_threshold_ct FROM alert_cat_lst_t WHERE alert_cat_id=2) and t.veh_id is not NULL and t.cancelled_in<>1 and issue_in <> 1 and l.data_received_ts>CURRENT_TIMESTAMP()-INTERVAL 10 MINUTE  and t.trip_run_id not in (SELECT trip_run_id FROM alert_dtl_t WHERE alert_cat_id=2 and DATE(alert_ts)=CURDATE())  ORDER BY trip_start_ts desc";

  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }          // Handle Error
    connection.query(QRY_TO_EXEC, function (err, rows) {
      connection.release();
      if (err) { log.message("ERROR", mod_name, 0, "ERR_EXECUTING_QUERY :: " + QRY_TO_EXEC); return; }     // Handle Query Errors
      // console.log("Populated "+rows.affectedRows+" Alerts");
      callback(false, rows);
    });
  });
}



/**********************************************************************************************
* Function      : trip initiated but not started  services sms alerts to operation team
* Arguments     : callback function
* History       
12/30/2017     Raju Dasari
***********************************************************************************************/
var trip_initiated_not_started = function (callback) {
  console.log("trip_initiated_not_started");

  var QRY_TO_EXEC = `INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts) SELECT 24 as alert_cat_id,t.veh_id,t.trip_run_id,t.depot_id,CONCAT(d.depot_nm ," Service ", t.srv_nu ," Assigned with ", t.veh_reg_nu , " But Not started", " Start_time : ",t.sch_start_tm," last data received time: ",data_received_ts) as alert_tx,CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as sch_start,CURRENT_TIMESTAMP() from trip_run_dtl_t t join ltrack_dtl_t l on l.veh_id=t.veh_id join depot_lst_t d on t.depot_id=d.depot_id join regions_lst_t r on r.region_id=d.region_id where (initiated_in=1 or initiated_in=0) and trp_start_in=0  and trp_close_in=0  and cancelled_in<>1 and t.veh_id is not null and t.srv_nu is not null and sch_start_dt=CURDATE() and  adddate(sch_start_dt, INTERVAL sch_start_tm hour_Second) + INTERVAL 60 MINUTE <CURRENT_TIMESTAMP() and  adddate(sch_end_dt, INTERVAL sch_end_tm hour_Second)>CURRENT_TIMESTAMP() and l.data_received_ts BETWEEN CURRENT_TIMESTAMP()  - INTERVAL 60 MINUTE  and CURRENT_TIMESTAMP() and t.trip_run_id not in (SELECT trip_run_id FROM alert_dtl_t WHERE  alert_cat_id=24 and DATE(alert_ts)=CURDATE()) ORDER BY CONCAT(t.sch_start_dt,' ',sch_start_tm) desc`;

  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }          // Handle Error  
    connection.query(QRY_TO_EXEC, function (err, rows) {
      connection.release();
      if (err) { console.log("trip_initiated_not_started::" + err); log.message("ERROR", mod_name, 0, "ERR_EXECUTING_QUERY :: " + QRY_TO_EXEC); return; }     // Handle Query Errors                       
      console.log("Populated " + rows.affectedRows + " Alerts");
      callback(false, rows);
    });
  });
}

/**********************************************************************************************
* Function      : vehicle not in source stop  sms alerts to operation team
* Arguments     : callback function
* History       
12/30/2017     Raju Dasari
***********************************************************************************************/
var wrongassignment = function (callback) {
  console.log("vehicle_not_in_source_stop");

  var QRY_TO_EXEC = `INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts) SELECT 25 as alert_cat_id,t.veh_id,t.trip_run_id,t.depot_id,CONCAT(d.depot_nm ," Service ", t.srv_nu ," Assigned with ", t.veh_reg_nu , " But The Vehicle not in source stop", " Start_time:",t.sch_start_tm," Please assign with correct vehicle ") as alert_tx,CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as sch_start,CURRENT_TIMESTAMP() from trip_run_dtl_t t join depot_lst_t d on t.depot_id=d.depot_id join regions_lst_t r on r.region_id=d.region_id where issue_type_id=9  and cancelled_in<>1 and t.veh_id is not null and t.srv_nu is not null and sch_start_dt=CURDATE() and  adddate(sch_end_dt, INTERVAL sch_end_tm hour_Second)>CURRENT_TIMESTAMP() and t.trip_run_id not in (SELECT trip_run_id FROM alert_dtl_t WHERE  alert_cat_id=25 and DATE(alert_ts)=CURDATE()) ORDER BY CONCAT(t.sch_start_dt,' ',sch_start_tm) desc`;

  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }          // Handle Error  
    connection.query(QRY_TO_EXEC, function (err, rows) {
      connection.release();
      if (err) { console.log("vehicle_not_in_source_stop::" + err); log.message("ERROR", mod_name, 0, "ERR_EXECUTING_QUERY :: " + QRY_TO_EXEC); return; }     // Handle Query Errors                       
      console.log("Populated " + rows.affectedRows + " Alerts");
      callback(false, rows);
    });
  });
}

/**********************************************************************************************
* Function      : service closed with issue  sms alerts to operation team
* Arguments     : callback function
* History       
12/30/2017     Raju Dasari
***********************************************************************************************/
var closingwithissue = function (callback) {
  console.log("service_closed_with_isse");

  var QRY_TO_EXEC = `INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts) SELECT 26 as alert_cat_id,t.veh_id,t.trip_run_id,t.depot_id,CONCAT(d.depot_nm ," Service ", t.srv_nu ," Assigned with ", t.veh_reg_nu , " But The Service is closed with an issue", " Start_time:",t.sch_start_tm, " End_time:",t.sch_end_tm) as alert_tx,CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as sch_start,CURRENT_TIMESTAMP() from trip_run_dtl_t t join ltrack_dtl_t l on l.veh_id=t.veh_id join depot_lst_t d on t.depot_id=d.depot_id join regions_lst_t r on r.region_id=d.region_id where issue_in=1  and cancelled_in<>1  and t.veh_id is not null and t.srv_nu is not null and (sch_start_dt=CURDATE() or sch_start_dt=CURDATE() - INTERVAL 1 day)and  adddate(sch_end_dt, INTERVAL sch_end_tm hour_Second) >CURRENT_TIMESTAMP() and l.data_received_ts BETWEEN CURRENT_TIMESTAMP()  - INTERVAL 60 MINUTE  and CURRENT_TIMESTAMP() and t.trip_run_id not in (SELECT trip_run_id FROM alert_dtl_t WHERE  alert_cat_id=26 and DATE(alert_ts)=CURDATE()) ORDER BY CONCAT(t.sch_start_dt,' ',sch_start_tm) desc`;

  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }          // Handle Error  
    connection.query(QRY_TO_EXEC, function (err, rows) {
      connection.release();
      if (err) { console.log("service_closed_with_isse::" + err); log.message("ERROR", mod_name, 0, "ERR_EXECUTING_QUERY :: " + QRY_TO_EXEC); return; }     // Handle Query Errors                       
      console.log("Populated " + rows.affectedRows + " Alerts");
      callback(false, rows);
    });
  });
}






/**********************************************************************************************
* Function      : not tracked services for depots
* Arguments     : callback function
* History       
09/03/2018    Raju Dasari  * Initial Code
***********************************************************************************************/
exports.nottrackedservices = function (callback) {
  console.log("NOt tracked service alert for depots");

  var QRY_TO_EXEC = `INSERT INTO alert_dtl_t(alert_cat_id,veh_id,trip_run_id,depot_id,alert_tx,trip_start_ts,alert_ts) SELECT 28 as alert_cat_id,t.veh_id,t.trip_run_id,t.depot_id,CONCAT(d.depot_nm ," Service Numbers ", GROUP_CONCAT(distinct(t.srv_nu)) ," Are closed with an issue In ", t.sch_start_dt) as alert_tx,CONCAT(t.sch_start_dt,' ',t.sch_start_tm) as sch_start,CURRENT_TIMESTAMP() from trip_run_dtl_t t join depot_lst_t d on t.depot_id=d.depot_id  where issue_in=1  and cancelled_in<>1  and t.veh_id is not null and trp_close_in=1 and t.srv_nu is not null and sch_start_dt=CURDATE()- INTERVAL 1 day GROUP BY t.depot_id`;

  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { log.message("ERROR", mod_name, 0, err); return err; }          // Handle Error  
    connection.query(QRY_TO_EXEC, function (err, rows) {
      //console.log("Populated "+rows.length+" FTP_Alerts");
      connection.release();
      if (err) { console.log("FTP_ALERTS_INSERT_ERR::" + err); log.message("ERROR", mod_name, 0, "ERR_EXECUTING_QUERY :: " + QRY_TO_EXEC); return; }     // Handle Query Errors                       
      console.log("Populated " + rows.affectedRows + " Alerts");
      callback(false, rows);
    });
  });
}