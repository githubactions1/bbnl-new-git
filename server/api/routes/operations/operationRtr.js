var oprtnRtr = require('express').Router();
var checkUser = require(appRoot + '/server/api/modules/general/auth/controllers/accessCtrl');
var operationCtrl = require(appRoot + '/server/api/modules/operations/controllers/operationCtrl');


oprtnRtr.post('/caf/termination', checkUser.hasToken , operationCtrl.postTrmndCafDirectCtrl)

// to get ONU status by CAF
oprtnRtr.get('/onu/status/:caf_id',checkUser.hasToken, operationCtrl.getSettopBoxOnuStsCtrl);
module.exports = oprtnRtr;