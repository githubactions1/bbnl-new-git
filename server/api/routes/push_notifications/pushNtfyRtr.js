
var pushNtfyRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');
var pushNtfyCntrl = require(appRoot + '/server/api/modules/push_notifications/controllers/pushNtfyCntrl');

pushNtfyRtr.post('/appPushNotifications',  pushNtfyCntrl.appPushNotifications)
module.exports = pushNtfyRtr;
