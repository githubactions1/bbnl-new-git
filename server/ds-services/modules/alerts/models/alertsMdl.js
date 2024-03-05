
async = require("async");
var smsUtil = require(appRoot+'/utils/sms.utils');


var std         = require(appRoot+'/utils/standardMessages');
var df          = require(appRoot+'/utils/dflower.utils');
var sqldb       = require(appRoot+'/config/db.config');
var cntxtDtls   = df.getModuleMetaData(__dirname,__filename);

var dbutil      = require(appRoot+'/utils/db.utils');


var mod_name = "SMS_ALERTS"
/**********************************************************************************************
* Function      : sendAlerts
* Arguments     : callback function
* History   
* 09/19/2016    ** Raju Dasari  ** Initial Code
***********************************************************************************************/
exports.sendAlerts = function (callback) {
	var fnm = "sendAlerts";
  console.log("in send alers")
  //Getting Available alerts
  var QRY_TO_EXEC = `SELECT adt.alert_id,adt.alert_cat_id,acl.alert_cat_nm,usr.mrcht_usr_nm,usr.mrcht_usr_id,adt.mrchnt_id,adt.alert_tx,acl.alert_cat_nm,usr.mbl_nu,DATE_FORMAT(adt.alert_ts,'%Y-%m-%d %H:%i:%s') AS alert_ts FROM alert_dtl_t AS adt JOIN alert_cat_lst_t AS acl ON acl.alert_cat_id = adt.alert_cat_id JOIN alert_subscn_dtl_t AS asl ON asl.mrchnt_id = adt.mrchnt_id AND asl.alert_cat_id = acl.alert_cat_id JOIN mrcht_usr_lst_t AS usr ON usr.mrcht_usr_id = asl.user_id WHERE adt.alert_tx IS NOT NULL AND DATE(adt.alert_ts) = CURDATE() AND asl.a_in = 1 AND asl.sms_alert_in = 1 AND adt.alert_ts > CURRENT_TIMESTAMP () - INTERVAL 1 HOUR AND adt.alert_id NOT IN ( SELECT alert_id FROM alert_notify_dtl_t WHERE  DATE(i_ts) = CURDATE() ) ORDER BY mrcht_usr_nm, adt.mrchnt_id;`;

  dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, {}, fnm, function (err, rows) {
    if (rows.length > 0) {
      // Insert sent Alerts into Notifications Table
      log.message("INFO", mod_name, 0, "Processing " + rows.length + " alerts...");
      for (var i in rows) {
        insertToNotification(rows[i]);
      }
    }
    else {
      //If No alerts Found
      callback(false, rows);
    }
  });
}
/*************************************************************************************
* Function      : insertToNotification
* Arguments     : single record of Alert
* History   
* 09/20/2016    ** Raju Dasari  ** Initial Code
**************************************************************************************/
var insertToNotification = function (alertRow) {
	var fnm = "insertToNotification";
  var INSERT_NOTIF = "INSERT INTO alert_notify_dtl_t(user_id,alert_cat_id,mrchnt_id,alert_id,alert_ts,i_ts) VALUES(" + alertRow.mrcht_usr_id + "," + alertRow.alert_cat_id + "," + alertRow.mrchnt_id + "," + alertRow.alert_id + ",'" + alertRow.alert_ts + "',CURRENT_TIMESTAMP())";
  dbutil.execQuery(sqldb.MySQLConPool, INSERT_NOTIF, cntxtDtls, {}, fnm, function (err, result) {
    if (err) { log.message("ERROR", mod_name, 0, "ERR_EXECUTING_QUERY :: " + INSERT_NOTIF); return err; }
    sendAlertSms(alertRow, result.insertId);
  })

}


/*****************************************************************************
* Function      : sendAlertSms
* Arguments     : single record of Alert,notification ID
* History   
* 09/20/2016    ** Raju Dasari  ** Initial Code
******************************************************************************/
var sendAlertSms = function (alertRow, notifyID) {
  var alert_tx = '*' + alertRow.alert_cat_nm + ' ALERT* \n\n' + alertRow.alert_tx + ' \n\n -Thankyou';
  smsUtil.sendSMS(alertRow.mobile_ph, alert_tx, function (err, results) {
    if (err) { console.log("SMS SENDING FAILED " + notifyID); log.message("ERROR", mod_name, 0, "SMS SENDING FAILED"); return; }
    else {
      //calling audit function
      notifyAuditInsert(notifyID, results.uuid);
    }
  });
}

/*****************************************************************************
* Function      : notifyAuditInsert
* Arguments     : notificationID,uuid(got responce from SMS API)
* History   
* 09/20/2016    ** Raju Dasari  ** Initial Code
******************************************************************************/
var notifyAuditInsert = function (notifyID, uuid) {
	var fnm = "notifyAuditInsert";
    var UPDATE_NOTIF = "UPDATE alert_notify_dtl_t SET sms_ct=sms_ct+1,u_ts=CURRENT_TIMESTAMP() WHERE notif_id=" + notifyID;  //Query to inceerment smsBit 
    var INSER_AUDIT = "INSERT INTO alert_notify_audit_t(notif_id,notif_cat_id,sent_ts,uuid_tx) VALUES(" + notifyID + ",1,CURRENT_TIMESTAMP(),'" + uuid + "');"; //uuery to insert Audit record
    dbutil.execQuery(sqldb.MySQLConPool, UPDATE_NOTIF + ";" + INSER_AUDIT, cntxtDtls, {}, fnm, function (err, result) {
      if (err) { log.message("ERROR", mod_name, 0, "Error Executing Audit Query:" + err); return err; }     // Handle Query Errors   
    });
}

