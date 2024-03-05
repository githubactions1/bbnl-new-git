// Standard Inclusions
var log    = require(appRoot+'/utils/logmessages');
var std    = require(appRoot+'/utils/standardMessages');
// Model Inclusions
//var tripmdl = require('../../../models/trip/alertsMdl');
/********************************************************************************************
---------------------------------------------------------------------------------------------
CONTROLLER        : 
Description       : 
---------------------------------------------------------------------------------------------
********************************************************************************************/
/**************************************************************************************
* Controller     : oprsHomeRpt_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.oprsHomeRpt_get = function(req, res) {
    var dep_id = req.params.dep_id;
    var rpt_dt = req.params.date;
    appmdl.getHomeReportData(dep_id,rpt_dt,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":std.message.MODEL_ERR.code,"message":std.message.MODEL_ERR.message,"data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}
// router.get('/alerts/alertcatalog',admappCtrl.alertCatalog_get);
// router.get('/alerts/:userId/subscription',admappCtrl.alertSubsription_get);

// router.post('/alerts/:userId/notifications',admappCtrl.oprsScheduleChange_post);

// router.post('/alerts/:userId/notifications/:notifyid',admappCtrl.oprsScheduleChange_post);
// router.post('/alerts/:userId/notifications/:notifyid/acknoledge',admappCtrl.oprsScheduleChange_post);


/**************************************************************************************
* Controller     : alertCatalog_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.alertCatalog_get = function(req, res) {

    appmdl.getAlertCatalog(function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":std.message.MODEL_ERR.code,"message":std.message.MODEL_ERR.message,"data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}
/**************************************************************************************
* Controller     : alertSubsription_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.alertSubsription_get = function(req, res) {
    var userId = req.params.userId;
    appmdl.getAlertSubscription(userId,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":std.message.MODEL_ERR.code,"message":std.message.MODEL_ERR.message,"data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}
/**************************************************************************************
* Controller     : oprsHomeRpt_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.oprsHomeRpt_get = function(req, res) {
    var dep_id = req.params.dep_id;
    var rpt_dt = req.params.date;
    appmdl.getHomeReportData(dep_id,rpt_dt,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":std.message.MODEL_ERR.code,"message":std.message.MODEL_ERR.message,"data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}