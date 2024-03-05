var express = require('express');
var cmsRtr = express.Router();

var modRoot = appRoot + '/server/api/modules/cms/'
const cmsCtrl = require(modRoot + 'controllers/cmsCtrl');

cmsRtr.get('/verifyLMO', cmsCtrl.get_verfyCtrl);
cmsRtr.post('/creditLmoWallet', cmsCtrl.post_crdtLmoValet);


module.exports = cmsRtr;