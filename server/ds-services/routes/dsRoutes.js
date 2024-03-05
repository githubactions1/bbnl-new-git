var express = require('express');
var router  = express.Router();

var app_base = __dirname;
//Include Controller

// var adminCtrl     		= require('../modules/module1/controllers/moduleCtrl');


var alertsCtrl			= require('../modules/alerts/controllers/alertsCtrl');
// var auditCtrl			= require('../modules/audit/controllers/auditCtrl');
var authCtrl			= require('../modules/auth/controllers/authCtrl');
var coreCtrl			= require('../modules/core/controllers/coreCtrl');
var maintananceCtrl		= require('../modules/maintanance/controllers/maintananceCtrl');
var monitorCtrl			= require('../modules/monitor/controllers/monitorCtrl');
var verstionCtrl		= require('../modules/version/controllers/versionCtrl');




/****************************************************************
			  glits Services related Routess
*****************************************************************/


/* ds-auto-comment-start
   @url         : /
   @Method      : get
   @summary     : Default Router
   @description : Default Page to be displayed on the route url. This is not be be used from any appliccation
   @tags		: Auth
   @parameters  : 
   Parameter Type   | Parameter Name | Data Type | Format | Required | description
   query|version|string||no|Gives the version Number
   @parameters-end:
   @responses   :
   ds-auto-comment-end */			
router.get('/', function(req, res) {
     res.send("In Ds Services")
});

/****************************************************************
			 Alerts related Routess
*****************************************************************/


/****************************************************************
			 Auth related Routess
*****************************************************************/
router.get('/auth', function(req, res) {
     res.send("Auth Related Routes")
});

/* ds-auto-comment-start
   @url         : /auth/login
   @Method      : get
   @summary     : Default Router
   @description : Default Page to be displayed on the route url. This is not be be used from any appliccation
   @tags		: Auth
   @parameters  : 
   Parameter Type   | Parameter Name | Data Type | Format | Required | description
   query|version|string||no|Gives the version Number
   @parameters-end:
   @responses   :
   ds-auto-comment-end */	
router.get('/auth/login', function(req,res){res.send("Auth Related Routes")}   );
router.get('/auth/logout', function(req,res){res.send("Auth Related Routes")}   );
router.get('/auth/settings', function(req,res){res.send("Auth Related Routes")}   );
router.get('/auth/register', function(req,res){res.send("Auth Related Routes")}   );


router.get('/auth/profile', function(req,res){res.send("Auth Related Routes")}   );
router.get('/auth/permissions', function(req,res){res.send("Auth Related Routes")}   );
router.get('/auth/resetPassword', function(req,res){res.send("Auth Related Routes")}   );


router.get('/auth/users', function(req,res){res.send("Auth Related Routes")}   );
router.post('/auth/users', function(req,res){res.send("Auth Related Routes")}   );
router.put('/auth/users', function(req,res){res.send("Auth Related Routes")}   );
router.delete('/auth/users', function(req,res){res.send("Auth Related Routes")}   );

router.get('/auth/user/:id', function(req,res){res.send("Auth Related Routes")}   );
router.get('/auth/user/:id/permissions', function(req,res){res.send("Auth Related Routes")}   );
router.get('/auth/user/:id/resetPassword', function(req,res){res.send("Auth Related Routes")}   );
router.get('/auth/user/:id/groups', function(req,res){res.send("Auth Related Routes")}   );
router.get('/auth/user/:id/profile', function(req,res){res.send("Auth Related Routes")}   );

/****************************************************************
			 Core related Routess
*****************************************************************/

router.get('/core/appProfiles', function(req,res){res.send("Auth Related Routes")}   );
router.post('/core/appProfiles', function(req,res){res.send("Auth Related Routes")}   );
router.put('/core/appProfiles', function(req,res){res.send("Auth Related Routes")}   );
router.delete('/core/appProfiles', function(req,res){res.send("Auth Related Routes")}   );


router.get('/core/apps', function(req,res){res.send("Auth Related Routes")}   );
router.post('/core/apps', function(req,res){res.send("Auth Related Routes")}   );
router.put('/core/apps', function(req,res){res.send("Auth Related Routes")}   );
router.delete('/core/apps', function(req,res){res.send("Auth Related Routes")}   );


router.get('/core/app/:id', function(req,res){res.send("Auth Related Routes")}   );
router.get('/core/app/:id/settings', function(req,res){res.send("Auth Related Routes")}   );
router.get('/core/app/:id/menu', function(req,res){res.send("Auth Related Routes")}   );
router.get('/core/app/:id/menuProfile', function(req,res){res.send("Auth Related Routes")}   );

router.get('/core/app/:id/users', function(req,res){res.send("Auth Related Routes")}   );


router.get('/auth/user/:id/menuProfile', function(req,res){res.send("Auth Related Routes")}   );

/****************************************************************
			 Maintanace related Routess
*****************************************************************/
router.get('/core/maintanace', function(req,res){res.send("Auth Related Routes")}   );
router.get('/core/app/:id/maintanace', function(req,res){res.send("Auth Related Routes")}   );
router.get('/core/app/:id/version/:id/maintanace', function(req,res){res.send("Auth Related Routes")} );


/****************************************************************
			 Monitoring related Routess
*****************************************************************/
router.get('/core/app/:id/asserts', function(req,res){res.send("Auth Related Routes")}   );
router.get('/core/app/:id/assert/:id', function(req,res){res.send("Auth Related Routes")} );
router.get('/core/app/:id/assert/:id/settings', function(req,res){res.send("Auth Related Routes")} );
router.get('/core/app/:id/assert/:id/heartbeat', function(req,res){res.send("Auth Related Routes")} );


/****************************************************************
			 Versioning related Routess
*****************************************************************/

router.get('/core/version', function(req,res){res.send("Auth Related Routes")} );
router.get('/core/version/:id', function(req,res){res.send("Auth Related Routes")} );
router.get('/core/version/:id/log', function(req,res){res.send("Auth Related Routes")} );
router.get('/core/version/:id/settings', function(req,res){res.send("Auth Related Routes")} );

router.get('/core/version/:id/load', function(req,res){res.send("Auth Related Routes")} );
router.get('/core/version/:id/install', function(req,res){res.send("Auth Related Routes")} );


router.get('/core/app/:id/version', function(req,res){res.send("Auth Related Routes")}   );
router.get('/core/app/:id/version/:id', function(req,res){res.send("Auth Related Routes")} );
router.get('/core/app/:id/version/:id/log', function(req,res){res.send("Auth Related Routes")} );
router.get('/core/app/:id/version/:id/settings', function(req,res){res.send("Auth Related Routes")} );


router.get('/core/app/:id/version/:id/load', function(req,res){res.send("Auth Related Routes")} );
router.get('/core/app/:id/version/:id/install', function(req,res){res.send("Auth Related Routes")} );



router.get('/core/app/:id/menuProfile', function(req,res){res.send("Auth Related Routes")}   );


/****************************************************************
			 Customer Profiling related Routess
*****************************************************************/


module.exports = router
