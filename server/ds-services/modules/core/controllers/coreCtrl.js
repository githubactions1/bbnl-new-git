// Standard Inclusions
var log    = require(appRoot+'/utils/logmessages');
var std    = require(appRoot+'/utils/standardMessages');
// Model Inclusions
//var appmdl = require('../models/appMdl');

/********************************************************************************************
---------------------------------------------------------------------------------------------
CONTROLLER        : 
Description       : 
---------------------------------------------------------------------------------------------
********************************************************************************************/


/**************************************************************************************
* Controller     : appLst_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.appLst_get = function(req, res) {
    appmdl.getApps(function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":std.message.MODEL_ERR.code,"message":std.message.MODEL_ERR.message,"data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}

