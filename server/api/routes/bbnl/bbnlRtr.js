var bbnlRtr = require('express').Router();

var inventoryCtrl = require(appRoot + '/server/api/modules/bbnl/controllers/inventoryCtrl');
var alertsCtrl = require(appRoot + '/server/api/modules/bbnl/controllers/alertsCtrl');
var bndwidthCtrl = require(appRoot + '/server/api/modules/bbnl/controllers/bndwidthCtrl');
var slaCtrl = require(appRoot + '/server/api/modules/bbnl/controllers/slaCtrl');
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

function checkKey(req, res, next) {
    var key = '047af4b3dc3da17433e4662d71477f2e';
    if (req.headers['access-key'] == key)
        return next();
    else
        return res.send({ status: 500, message: 'authentication failed' });
}
// inventory rts
bbnlRtr.post('/inventory',  checkKey, inventoryCtrl.get_inventoryDt);
bbnlRtr.post('/alarms',  checkKey, inventoryCtrl.get_alarmsDt);
bbnlRtr.post('/serviceInventory',  checkKey, inventoryCtrl.get_serviceInventoryDt);
bbnlRtr.post('/sla', checkKey , inventoryCtrl.get_slaDt);

bbnlRtr.get('/inventoryData', inventoryCtrl.getinvtryTbleDta);
bbnlRtr.get('/inventoryData/:dstrct_id', inventoryCtrl.getMndlWsInvntryTbleDta);
bbnlRtr.get('/inventoryData/:dstrct_id/:mndl_id', inventoryCtrl.getGPWsInvntryTbleDta);

bbnlRtr.post('/onuData', inventoryCtrl.getOnuTbleDta);
bbnlRtr.post('/oltData', inventoryCtrl.getOltTbleDta);

// Alerts rts
bbnlRtr.get('/alertCounts', alertsCtrl.get_AllalrtsCounts);
bbnlRtr.get('/todayAlerts', alertsCtrl.get_todayalrtsCounts);
bbnlRtr.get('/oltAlerts', alertsCtrl.get_AllOltCounts);
bbnlRtr.get('/onuAlerts', alertsCtrl.get_AllONUCounts);

bbnlRtr.get('/elementTypes', alertsCtrl.get_elementTypes);
bbnlRtr.get('/districts', alertsCtrl.get_districts);
bbnlRtr.get('/mandals/:dstrct_id', alertsCtrl.get_mandals);
bbnlRtr.get('/gramPanchayat/:dstrt_id/:mndl_id', alertsCtrl.get_gps);
bbnlRtr.get('/timeStampRanges', alertsCtrl.get_tmeStmpRange);
bbnlRtr.get('/alertStatus', alertsCtrl.get_alrtstatus);

bbnlRtr.post('/alertsData', alertsCtrl.getAlertsTbleDta);

bbnlRtr.post('/alerts', alertsCtrl.getSlctdAlrmsDtaCtrl);


// bandwidth rts
bbnlRtr.get('/bandwidthCounts', bndwidthCtrl.get_AllbndwdthCounts);
bbnlRtr.get('/bandwidthMnthCnt', bndwidthCtrl.get_HsiCrntMnthCntCtrl);
bbnlRtr.get('/bandwidthDayCnt', bndwidthCtrl.get_HsitdyprvsDayCntCtrl);
bbnlRtr.get('/bandwidthChart/:mnth/:year', bndwidthCtrl.bandWidthChartCtrl);
bbnlRtr.post('/bandwidthData', bndwidthCtrl.getbndwdthTbleDta);

//sla rts
bbnlRtr.get('/getHourlycounts', slaCtrl.get_hourlyCountsCtrl);
// bbnlRtr.get('/getHourlonucounts', checkUser.hasToken, slaCtrl.get_onuHourlCountsCtrl);
bbnlRtr.post('/getHourloltData', slaCtrl.get_OltHourlDataCtrl);
bbnlRtr.post('/getHourlonuData', slaCtrl.get_onuHourlDataCtrl);

module.exports = bbnlRtr;