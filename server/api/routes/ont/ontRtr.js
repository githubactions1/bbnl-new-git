var oltRtr = require('express').Router();
var SnModRoot = appRoot + '/server/api/modules/general/auth/'
var modRoot = appRoot + '/server/api/modules/ont/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');
const ontCtrl = require(modRoot + 'controllers/ontCtrl');
//get_onuCtrl

oltRtr.get('/details/:caf_id',   ontCtrl.get_onuCtrl);



module.exports = oltRtr;