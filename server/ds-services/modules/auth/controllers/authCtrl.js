// Standard Inclusions
var log    = require(appRoot+'/utils/logmessages');
var std    = require(appRoot+'/utils/standardMessages');
// Model Inclusions
//var authmdl = require('../../../models/auth/authMdl');
/********************************************************************************************
---------------------------------------------------------------------------------------------
CONTROLLER        : 
Description       : 
---------------------------------------------------------------------------------------------
********************************************************************************************/
/**************************************************************************************
* Controller     : appLogin_post
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.appLogin_post = function(req, res) {
	var appId = req.params.appid;
    var userNm = req.body.user_nm;
    var passwd = req.body.passwd_tx;
    if( req.body.user_nm == undefined || req.body.passwd_tx == undefined || trim(req.body.passwd_tx) == ''|| trip(req.body.user_nm) == '') {
    	 res.send({"status":401,"message":"Username and Password need to be Provided","data":[]});
    }
    appmdl.getHomeReportData(appId,userNm,passwd,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}

/**************************************************************************************
* Controller     : appLogout
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.appLogout_get = function(req, res) {
	var appId = req.params.appid;
    var userNm = req.body.user_nm;
    var passwd = req.body.passwd_tx;
    if( req.body.user_nm == undefined || req.body.passwd_tx == undefined || trim(req.body.passwd_tx) == ''|| trip(req.body.user_nm) == '') {
    	 res.send({"status":401,"message":"Username and Password need to be Provided","data":[]});
    }
    appmdl.getHomeReportData(appId,userNm,passwd,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}


/**************************************************************************************
* Controller     : myProfile_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.myProfile_get = function(req, res) {
	var appId = req.params.appid;

    // get usr id from session
    appmdl.getHomeReportData(appId,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}


/**************************************************************************************
* Controller     : resetPassword_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.resetPassword_get = function(req, res) {
	var appId = req.params.appid;

    // get usr id from session
    appmdl.getHomeReportData(appId,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}


/**************************************************************************************
* Controller     : userProfile_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.userProfile_get = function(req, res) {
	var appId = req.params.appid;

    // get usr id from session
    appmdl.getHomeReportData(appId,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}
/**************************************************************************************
* Controller     : AppUserLst_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.UserLst_get = function(req, res) {

    // get usr id from session
    appmdl.getHomeReportData(function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}

/**************************************************************************************
* Controller     : AppUserDtl_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.UserDtl_get = function(req, res) {

    var userId = req.params.userid;
    // get usr id from session
    appmdl.getHomeReportData(userId,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}

/**************************************************************************************
* Controller     : AppUserLst_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.AppUserLst_get = function(req, res) {
	var appId = req.params.appid;

    // get usr id from session
    appmdl.getHomeReportData(appId,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}

/**************************************************************************************
* Controller     : AppUserDtl_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.AppUserDtl_get = function(req, res) {
	var appId = req.params.appid;
    var userId = req.params.userid;
    // get usr id from session
    appmdl.getHomeReportData(appId,userId,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}

/**************************************************************************************
* Controller     : resetOthersPwd_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.resetOthersPwd_post = function(req, res) {
	var appId = req.params.appid;
    var userId = req.params.userid;
    // get usr id from session
    appmdl.getHomeReportData(appId,userId,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}

/**************************************************************************************
* Controller     : userProfileDtls_get
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 03/19/2016    - Sunil Mulagada - Initial Function
*
***************************************************************************************/
exports.userProfileDtls_get = function(req, res) {
    var userId = req.params.userid;
    // get usr id from session
    appmdl.getHomeReportData(appId,userId,function(err, results) {
         if (err) {  console.log("err " + err);   res.send({"status":500,"message":"Server Error","data":[]}); return;  }
        res.send({"status":std.message.SUCCESS.code,"message":std.message.SUCCESS.message,"data":results});
    });
}



