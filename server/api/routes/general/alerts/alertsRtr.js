var alertRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');
const alertsCtrl = require(appRoot +'/server/api/modules/general/alerts/controllers/alertsCtrl');



alertRtr.get('/subscrtype', checkUser.hasToken, alertsCtrl.getUserSubscCtrl);
alertRtr.get('/alrtctgry/:id', checkUser.hasToken, alertsCtrl.getAlrtCtgryCtrl);
alertRtr.get('/mrchnts', checkUser.hasToken, alertsCtrl.getMrchntsCtrl);
alertRtr.post('/subscribe', checkUser.hasToken, alertsCtrl.instAlrtSubsCtrl);
alertRtr.put('/subscribe', checkUser.hasToken, alertsCtrl.updtAlrtSubsCtrl);






alertRtr.get('/ntfctnTypLst', checkUser.hasToken, alertsCtrl.getNtfctnTypLstCtrl)
alertRtr.post('/newNtfctn', checkUser.hasToken, alertsCtrl.addNewNtfctnCtrl);
alertRtr.get('/usrNtfctn/:id', checkUser.hasToken, alertsCtrl.getUsrNtfctnCtrl);
alertRtr.get('/usrRcntNtfctn', checkUser.hasToken, alertsCtrl.getusrRcntNtfctnCtrl);
alertRtr.get('/user/notifications', checkUser.hasToken, alertsCtrl.getusrCrtdNtfctnCtrl);
alertRtr.put('/ntfctnRspns', checkUser.hasToken, alertsCtrl.UpdtNtfctnRspnsCtrl);
// alertRtr.get('/ctgryNtfctnLst/:id', checkUser.hasToken, alertsCtrl.getctgryNtfctnLstCtrl)



alertRtr.get('/sentNotifications/:catgry_id', checkUser.hasToken, alertsCtrl.getsentNotificationsCtrl);
alertRtr.get('/receivedNotifications/:catgry_id', checkUser.hasToken, alertsCtrl.getreceivedNotificationsCtrl);



alertRtr.get('/usrGrpLst', checkUser.hasToken, alertsCtrl.getUsrGrpLstCtrl);
alertRtr.get('/usrGrpCtgryLst', checkUser.hasToken, alertsCtrl.getUsrGrpCtgryLstCtrl);
alertRtr.post('/addnewGrp', checkUser.hasToken, alertsCtrl.addnewGrpCtrl);
// alertRtr.get('/getUsrs', checkUser.hasToken, alertsCtrl.getUsrsCtrl);
alertRtr.get('/asgnUsrs/:id', checkUser.hasToken, alertsCtrl.getasgnUsrCtrl);
alertRtr.get('/unasgnUsrs/:id', checkUser.hasToken, alertsCtrl.getunasgnUsrCtrl);

alertRtr.post('/asgnUsr', checkUser.hasToken, alertsCtrl.asgnUsrCtrl);
alertRtr.post('/updtGrp', checkUser.hasToken, alertsCtrl.updtGrpCtrl);

alertRtr.post('/addnewUsr', checkUser.hasToken, alertsCtrl.addnewUsrCtrl);
alertRtr.post('/rmvexstUsr', checkUser.hasToken, alertsCtrl.rmvexstUsrCtrl);



alertRtr.delete('/delGrp/:id', checkUser.hasToken, alertsCtrl.delGrpCtrl);


module.exports = alertRtr;