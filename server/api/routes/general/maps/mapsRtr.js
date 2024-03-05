
var mapsRtr = require('express').Router();
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');
var mapsCtrl = require(appRoot +'/server/api/modules/general/maps/Controllers/mapsCtrl');

mapsRtr.get('/groups', checkUser.hasToken, mapsCtrl.get_groupsCtrl);
mapsRtr.get('/category', checkUser.hasToken, mapsCtrl.get_categoryCtrl);
mapsRtr.get('/status', checkUser.hasToken, mapsCtrl.get_statusCtrl);
mapsRtr.get('/type', checkUser.hasToken, mapsCtrl.get_typeCtrl);
mapsRtr.get('/olts', checkUser.hasToken, mapsCtrl.get_oltCtrl);
mapsRtr.get('/olts/:grpId/:ctgId/:dstId/:typId/:mndlId', checkUser.hasToken, mapsCtrl.get_olt_grpCtgCtrl);
mapsRtr.get('/olts/:stsId', checkUser.hasToken, mapsCtrl.get_olt_stsCtrl);
mapsRtr.get('/olts/latlngs/:lat/:lng', checkUser.hasToken, mapsCtrl.get_olt_latlngCtrl);







module.exports = mapsRtr; 
